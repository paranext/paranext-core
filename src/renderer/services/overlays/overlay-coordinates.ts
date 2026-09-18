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
  // CSS.escape prevents selector injection if webViewId contains characters like " or ]
  return document.querySelector<HTMLIFrameElement>(
    `iframe[data-web-view-id="${CSS.escape(webViewId)}"]`,
  );
}

/**
 * Parses the CSS `zoom` inline on an iframe element. Anything that is not a positive finite number
 * — including the empty string written to clear the zoom, or no iframe at all — means unscaled.
 *
 * Exported so {@link getWebViewIframeZoom} and the content zoom service's own iframe-zoom fallback
 * (which reads its iframe through its own test-only seam, not {@link getWebViewIframe}) share one
 * parse instead of drifting apart.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function parseIframeZoom(iframe: HTMLIFrameElement | null | undefined): number {
  const zoom = Number(iframe?.style.zoom);
  return Number.isFinite(zoom) && zoom > 0 ? zoom : 1;
}

/**
 * Reads the CSS `zoom` the content zoom service has set on a WebView's host `<iframe>` element.
 *
 * A zoomed iframe's own `getBoundingClientRect()` is unchanged — only its inner viewport shrinks or
 * grows — and the inner document measures itself in unscaled inner pixels, so an inner point at `x`
 * renders `zoom * x` from the iframe's left edge.
 *
 * The platform is the only writer of this property, so the inline value is authoritative (and,
 * unlike computed style, is defined for this non-standard property in every environment the
 * renderer runs in).
 *
 * This does not cover per-area zoom — a pane that marks zoom areas carries no whole-iframe `zoom`
 * and this always answers `1` for it. For the scale a pane's content is actually drawn at, use
 * `getContentZoomScaleForWebView` in `web-view-content-zoom.service` instead.
 *
 * @param webViewId The webViewId of the iframe
 * @returns The scale factor the iframe's contents are rendered at
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getWebViewIframeZoom(webViewId: string): number {
  return parseIframeZoom(getWebViewIframe(webViewId));
}

/**
 * Translates iframe-relative coordinates to document-relative coordinates using
 * getBoundingClientRect of the WebView iframe and the CSS `zoom` applied to it.
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
  const zoom = getWebViewIframeZoom(webViewId);
  return {
    x: rect.left + position.x * zoom,
    y: rect.top + position.y * zoom,
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
  // Iframe must have non-zero dimensions and not be entirely outside the viewport on any side
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
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
