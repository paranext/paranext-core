import { logger } from '@shared/services/logger.service';
import { persistDirection, type Direction } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Apply the given direction to a single iframe — both the iframe element's `dir` attribute and
 * (when same-origin) its inner `documentElement`. Cross-origin iframes
 * (`WEB_VIEW_CONTENT_TYPE.URL`) won't expose `contentDocument` — that's expected, not a real
 * failure, and is logged at `debug`.
 */
export function applyDirectionToIframeElement(iframe: HTMLIFrameElement, dir: Direction): void {
  iframe.setAttribute('dir', dir);
  try {
    const innerDoc = iframe.contentDocument;
    if (innerDoc?.documentElement) innerDoc.documentElement.setAttribute('dir', dir);
  } catch (e: unknown) {
    logger.debug(`layout-direction: could not set dir on iframe content: ${getErrorMessage(e)}`);
  }
}

function applyDirectionToIframes(dir: Direction): void {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => applyDirectionToIframeElement(iframe, dir));
}

/**
 * Apply the given layout direction to the whole renderer document and to every webview iframe
 * currently in the DOM. Also persists it (via `persistDirection` from `platform-bible-react`) so
 * future reads — including new webview mounts and any component that calls `readDirection()` — pick
 * up the same value.
 */
export function applyLayoutDirection(dir: Direction): void {
  persistDirection(dir);
  document.documentElement.setAttribute('dir', dir);
  applyDirectionToIframes(dir);
}
