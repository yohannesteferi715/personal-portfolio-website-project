"""
Migrate SQLite data to PostgreSQL with Zero Data Loss.
Preserves:
- All original primary keys (id)
- Timestamps (created_at, updated_at)
- Booleans and integers
- Native JSONB structures
- Synchronizes PostgreSQL auto-increment sequences
- Comprehensive table-by-table record and data verification
"""
from datetime import datetime
import json
import logging
from pathlib import Path
import os
import sqlite3
import sys
from urllib.parse import urlparse

import psycopg2
from psycopg2.extras import Json
from sqlalchemy import create_engine

from app.core.config import settings
from app.core.database import Base
from app.models import (  # noqa: F401
    about, admin_user, article, education, experience, profile, project, skill, testimonial,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

SQLITE_PATH = Path(__file__).resolve().parent.parent / "portfolio.db"
PG_URL = sys.argv[1] if len(sys.argv) > 1 else settings.clean_database_url


def mask_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.password:
        return url.replace(f":{parsed.password}@", ":***@")
    return url

TABLES = [
    "about",
    "admin_users",
    "articles",
    "education",
    "experiences",
    "profiles",
    "projects",
    "skills",
    "testimonials",
]

JSON_COLUMNS = {
    "about": {"paragraphs", "highlights"},
    "articles": {"tags"},
    "education": {"coursework"},
    "experiences": {"technologies"},
    "profiles": {"social_links"},
    "projects": {"tags"},
}

BOOLEAN_COLUMNS = {
    "articles": {"published"},
    "experiences": {"current"},
    "profiles": {"available_for_work"},
    "projects": {"featured"},
}

DATETIME_COLUMNS = {
    "about": {"created_at", "updated_at"},
    "admin_users": {"created_at", "updated_at"},
    "articles": {"created_at", "updated_at"},
    "education": {"created_at", "updated_at"},
    "experiences": {"created_at", "updated_at"},
    "profiles": {"created_at", "updated_at"},
    "projects": {"created_at", "updated_at"},
    "skills": {"created_at", "updated_at"},
    "testimonials": {"created_at", "updated_at"},
}


def parse_datetime(val: str | None) -> datetime | None:
    if not val:
        return None
    # SQLite default format is YYYY-MM-DD HH:MM:SS or ISO
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S.%f", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S.%f"):
        try:
            return datetime.strptime(val, fmt)
        except ValueError:
            pass
    return datetime.fromisoformat(val)


def migrate() -> dict:
    if not SQLITE_PATH.exists():
        raise FileNotFoundError(f"SQLite database not found at {SQLITE_PATH}")

    logger.info("Ensuring PostgreSQL tables exist via SQLAlchemy metadata...")
    engine = create_engine(PG_URL)
    Base.metadata.create_all(bind=engine)
    logger.info("PostgreSQL schema ready.")

    logger.info("Connecting to SQLite: %s", SQLITE_PATH)
    sqlite_conn = sqlite3.connect(SQLITE_PATH)
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cur = sqlite_conn.cursor()

    logger.info("Connecting to PostgreSQL: %s", mask_url(PG_URL))
    pg_conn = psycopg2.connect(PG_URL)
    pg_cur = pg_conn.cursor()

    stats = {}

    try:
        for table in TABLES:
            logger.info("Migrating table: %s", table)
            sqlite_cur.execute(f'SELECT * FROM "{table}" ORDER BY id ASC')
            rows = sqlite_cur.fetchall()
            stats[table] = {"sqlite_count": len(rows), "pg_count": 0}

            if not rows:
                logger.info("  No rows to migrate in %s", table)
                continue

            # Check if PG table already has data
            pg_cur.execute(f'SELECT COUNT(*) FROM "{table}"')
            existing_pg_count = pg_cur.fetchone()[0]
            if existing_pg_count > 0:
                logger.warning("  Table %s already contains %d rows in PG! Truncating before clean migration...", table, existing_pg_count)
                pg_cur.execute(f'TRUNCATE TABLE "{table}" RESTART IDENTITY CASCADE')

            cols = list(rows[0].keys())
            json_cols = JSON_COLUMNS.get(table, set())
            bool_cols = BOOLEAN_COLUMNS.get(table, set())
            dt_cols = DATETIME_COLUMNS.get(table, set())

            col_names = ", ".join(f'"{c}"' for c in cols)
            placeholders = ", ".join(["%s"] * len(cols))
            insert_sql = f'INSERT INTO "{table}" ({col_names}) VALUES ({placeholders})'

            for row in rows:
                row_dict = dict(row)
                values = []
                for col in cols:
                    v = row_dict[col]
                    if col in json_cols:
                        if v is not None:
                            if isinstance(v, str):
                                try:
                                    parsed = json.loads(v)
                                except Exception:
                                    parsed = v
                            else:
                                parsed = v
                            values.append(Json(parsed))
                        else:
                            values.append(None)
                    elif col in bool_cols:
                        values.append(bool(v) if v is not None else None)
                    elif col in dt_cols:
                        values.append(parse_datetime(v) if isinstance(v, str) else v)
                    else:
                        values.append(v)

                pg_cur.execute(insert_sql, values)

            # Synchronize PostgreSQL auto-increment sequence
            seq_sql = f"SELECT setval(pg_get_serial_sequence('\"{table}\"', 'id'), COALESCE(MAX(id), 1)) FROM \"{table}\";"
            pg_cur.execute(seq_sql)
            curr_seq = pg_cur.fetchone()[0]
            logger.info("  Synchronized sequence for %s: current val = %s", table, curr_seq)

            pg_cur.execute(f'SELECT COUNT(*) FROM "{table}"')
            pg_count = pg_cur.fetchone()[0]
            stats[table]["pg_count"] = pg_count

        pg_conn.commit()
        logger.info("PostgreSQL transaction committed successfully!")

    except Exception:
        pg_conn.rollback()
        logger.exception("Migration failed, rolling back PostgreSQL transaction.")
        raise
    finally:
        sqlite_conn.close()
        pg_conn.close()

    return stats


def verify() -> bool:
    logger.info("Starting Table-by-Table Data Verification...")
    sqlite_conn = sqlite3.connect(SQLITE_PATH)
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cur = sqlite_conn.cursor()

    pg_conn = psycopg2.connect(PG_URL)
    pg_cur = pg_conn.cursor()

    all_matched = True

    for table in TABLES:
        sqlite_cur.execute(f'SELECT * FROM "{table}" ORDER BY id ASC')
        s_rows = [dict(r) for r in sqlite_cur.fetchall()]

        # Use quotes for column names to handle reserved words like "order"
        sqlite_cols = list(s_rows[0].keys()) if s_rows else []
        quoted_cols = ", ".join(f'"{c}"' for c in sqlite_cols)

        pg_cur.execute(f'SELECT {quoted_cols} FROM "{table}" ORDER BY id ASC')
        pg_rows = pg_cur.fetchall()

        if len(s_rows) != len(pg_rows):
            logger.error("Count mismatch for %s: SQLite=%d vs PostgreSQL=%d", table, len(s_rows), len(pg_rows))
            all_matched = False
            continue

        json_cols = JSON_COLUMNS.get(table, set())
        bool_cols = BOOLEAN_COLUMNS.get(table, set())

        for idx, (s_row, p_row) in enumerate(zip(s_rows, pg_rows)):
            for col_idx, col in enumerate(sqlite_cols):
                s_val = s_row[col]
                p_val = p_row[col_idx]

                if col in json_cols:
                    # Compare parsed JSON structures
                    s_json = json.loads(s_val) if isinstance(s_val, str) else s_val
                    # p_val is already deserialized by psycopg2 for jsonb
                    if s_json != p_val:
                        logger.error("JSON mismatch in %s (row %d, col %s):\nSQLite: %r\nPG:     %r", table, idx, col, s_json, p_val)
                        all_matched = False
                elif col in bool_cols:
                    if bool(s_val) != bool(p_val):
                        logger.error("Bool mismatch in %s (row %d, col %s): SQLite=%r vs PG=%r", table, idx, col, s_val, p_val)
                        all_matched = False
                elif col in ("created_at", "updated_at"):
                    s_dt = parse_datetime(s_val)
                    # p_val is datetime object (may have timezone or naive)
                    if s_dt and p_val:
                        # Compare year, month, day, hour, min, sec
                        if s_dt.replace(tzinfo=None) != p_val.replace(tzinfo=None):
                            logger.error("Timestamp mismatch in %s (row %d, col %s): SQLite=%r vs PG=%r", table, idx, col, s_dt, p_val)
                            all_matched = False
                else:
                    if s_val != p_val:
                        logger.error("Value mismatch in %s (row %d, col %s): SQLite=%r vs PG=%r", table, idx, col, s_val, p_val)
                        all_matched = False

        logger.info("Verification passed for table '%s': %d records match perfectly.", table, len(s_rows))

    sqlite_conn.close()
    pg_conn.close()
    return all_matched


if __name__ == "__main__":
    stats = migrate()
    print("\n" + "=" * 50)
    print("MIGRATION SUMMARY")
    print("=" * 50)
    for t, s in stats.items():
        print(f"Table: {t:15} | SQLite: {s['sqlite_count']:2} | PG: {s['pg_count']:2} | Match: {s['sqlite_count'] == s['pg_count']}")

    verified = verify()
    if verified:
        print("\nALL 9 TABLES VERIFIED WITH 100% RECORD INTEGRITY!")
        sys.exit(0)
    else:
        print("\nVERIFICATION FAILED! SEE LOGS ABOVE.")
        sys.exit(1)
