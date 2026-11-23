/**
 * Finds a WebView's iframe element by its `data-web-view-id` attribute. Only an `iframe` counts:
 * other elements carry the same attribute (a WebView tab's header does, for tests to find it) and
 * can come first in the document.
 *
 * @param webViewId The webViewId to search for
 * @returns The iframe element, or null if not found
 */
export function getWebViewIframe(webViewId: string): HTMLIFrameElement | null {
  // Compared as a value rather than spliced into the selector, so no id can break or widen it.
  const iframe = Array.from(
    document.querySelectorAll<HTMLIFrameElement>('iframe[data-web-view-id]'),
  ).find((candidate) => candidate.dataset.webViewId === webViewId);
  // The DOM's own "not found" value, which every caller already checks for
  // eslint-disable-next-line no-null/no-null
  return iframe ?? null;
}
