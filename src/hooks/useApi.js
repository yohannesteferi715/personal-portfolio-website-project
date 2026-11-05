/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";

/**
 * Generic data-fetching hook.
 *
 * @param {string} url  - API path, e.g. "/api/projects"
 * @param {*} fallback  - value returned while loading or on error
 *
 * Returns { data, loading, error, refetch }
 */
export function useApi(url, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(`[useApi] Failed to fetch ${url}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
