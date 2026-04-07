/**
 * Checks if a URL path is safe for redirection.
 * A safe path:
 * 1. Must start with a single '/'
 * 2. Must not start with '//' (which browsers might interpret as a protocol-relative URL)
 * 3. Must not contain a protocol (http:, https:, etc.)
 */
export function isSafeRedirect(path: string | undefined): boolean {
  if (!path) return false;
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false;

  // Check for protocol (e.g., "http://", "javascript:")
  const hasProtocol = /^[a-zA-Z]+:/.test(path);
  if (hasProtocol) return false;

  return true;
}
