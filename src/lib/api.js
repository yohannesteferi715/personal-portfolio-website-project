/**
 * API configuration and URL builder.
 * Resolves API paths against VITE_API_BASE_URL (for production deployments like Vercel/Netlify),
 * or falls back to VITE_API_PROXY_TARGET / relative paths (for Vite dev proxy).
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_PROXY_TARGET ||
  ""
).replace(/\/+$/, "");

/**
 * Build a full or proxied API URL.
 * - If path is already absolute (http:// or https://), returns it unchanged.
 * - If API_BASE_URL is configured, prepends it to relative paths.
 * - Otherwise returns the relative path (handled by Vite dev proxy).
 *
 * @param {string} path - e.g. "/api/v1/profile"
 * @returns {string}
 */
export function apiUrl(path = "") {
  if (!path) return API_BASE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanPath}` : cleanPath;
}
