import {
  Monitor, Server, Lock, ShieldCheck, Code2,
  Database, ArrowLeftRight, Zap, Clock,
} from "lucide-react";

// ── Architecture nodes (left → right on desktop, top → bottom on mobile) ──────

export const NODES = [
  {
    id: "client",
    label: "React Frontend",
    icon: Monitor,
    color: "#61DAFB",
    responsibility: "User interaction and HTTP request initiation",
  },
  {
    id: "api",
    label: "API Router / DRF",
    icon: Server,
    color: "#20b2a6",
    responsibility: "URL routing, request parsing, view dispatch",
  },
  {
    id: "auth",
    label: "Authentication",
    icon: Lock,
    color: "#f5a623",
    responsibility: "Validate JWT token and identify the user",
  },
  {
    id: "perms",
    label: "Permissions",
    icon: ShieldCheck,
    color: "#a78bfa",
    responsibility: "Verify the user is allowed to perform this action",
  },
  {
    id: "service",
    label: "Business Logic",
    icon: Code2,
    color: "#34d399",
    responsibility: "Execute application rules and coordinate operations",
  },
  {
    id: "database",
    label: "PostgreSQL",
    icon: Database,
    color: "#4169E1",
    responsibility: "Persist and retrieve application data",
  },
  {
    id: "response",
    label: "Response",
    icon: ArrowLeftRight,
    color: "#20b2a6",
    responsibility: "Serialize result and return HTTP response",
  },
];

// Quick lookup: id → index
export const NODE_INDEX = Object.fromEntries(
  NODES.map((n, i) => [n.id, i]),
);
