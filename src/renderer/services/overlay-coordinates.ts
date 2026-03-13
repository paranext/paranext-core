/**
 * Coordinate translation utilities for the overlay service. Translates iframe-relative coordinates
 * to document-relative coordinates, clamps positions to the viewport, and checks WebView
 * visibility.
 */

/**
 * Finds a WebView iframe element by its data-web-view-id attribute.
 *
 * @param webViewId The webViewId to search for
 * @returns The iframe element, or null if not found
 */
export function getWebViewIframe(webViewId: string): HTMLIFrameElement | null {
  return document.querySelector<HTMLIFrameElement>(`iframe[data-web-view-id="${webViewId}"]`);
}

/**
 * Translates iframe-relative coordinates to document-relative coordinates using
 * getBoundingClientRect of the WebView iframe.
 *
 * @param webViewId The webViewId of the iframe
 * @param position The iframe-relative position
 * @returns The document-relative position
 */
export function translateCoordinates(
  webViewId: string,
  position: { x: number; y: number },
): { x: number; y: number } {
  const iframe = getWebViewIframe(webViewId);
  if (!iframe) return position;

  const rect = iframe.getBoundingClientRect();
  return {
    x: position.x + rect.left,
    y: position.y + rect.top,
  };
}

/**
 * Clamps a position to the visible viewport with optional padding.
 *
 * @param position The position to clamp
 * @param padding Optional padding from the viewport edges (default 0)
 * @returns The clamped position
 */
export function clampToViewport(
  position: { x: number; y: number },
  padding: number = 0,
): { x: number; y: number } {
  return {
    x: Math.min(Math.max(position.x, padding), window.innerWidth - padding),
    y: Math.min(Math.max(position.y, padding), window.innerHeight - padding),
  };
}

/**
 * Checks whether a WebView iframe is currently visible in the viewport (i.e., it is in an active
 * tab and has non-zero dimensions).
 *
 * @param webViewId The webViewId to check
 * @returns True if the iframe is found and visible, false otherwise
 */
export function isWebViewVisible(webViewId: string): boolean {
  // The 'renderer' pseudo-webViewId is always visible (platform-internal usage)
  if (webViewId === 'renderer') return true;

  const iframe = getWebViewIframe(webViewId);
  if (!iframe) return false;

  const rect = iframe.getBoundingClientRect();
  // Iframe must have non-zero dimensions and overlap the viewport
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0;
}

/**
 * Checks whether a document-relative position is currently within the visible viewport. Used to
 * detect when a popover anchor has scrolled out of view.
 *
 * @param position The document-relative position to check
 * @param margin Extra margin outside the viewport to tolerate (default 50px)
 * @returns True if the position is within the viewport (plus margin)
 */
export function isPositionInViewport(
  position: { x: number; y: number },
  margin: number = 50,
): boolean {
  return (
    position.x >= -margin &&
    position.y >= -margin &&
    position.x <= window.innerWidth + margin &&
    position.y <= window.innerHeight + margin
  );
}
