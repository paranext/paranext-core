import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

export type LayoutDirection = 'ltr' | 'rtl';

/**
 * Storage key matches the one used by `lib/platform-bible-react`'s `dir-helper.util.ts`
 * (`readDirection()`), so flipping the value here flips the direction every component that calls
 * `readDirection()` will see on its next render — including those inside same-origin webview
 * iframes that share `localStorage` with the renderer.
 */
const STORAGE_KEY = 'layoutDirection';

export function readLayoutDirection(): LayoutDirection {
  return localStorage.getItem(STORAGE_KEY) === 'rtl' ? 'rtl' : 'ltr';
}

function applyDirectionToIframes(dir: LayoutDirection): void {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    iframe.setAttribute('dir', dir);
    try {
      const innerDoc = iframe.contentDocument;
      if (innerDoc?.documentElement) innerDoc.documentElement.setAttribute('dir', dir);
    } catch (e: unknown) {
      // Cross-origin iframes (WEB_VIEW_CONTENT_TYPE.URL) won't expose contentDocument — that's
      // expected, not a real failure. Only log at debug level.
      logger.debug(`layout-direction: could not set dir on iframe content: ${getErrorMessage(e)}`);
    }
  });
}

/**
 * Apply the given layout direction to the whole renderer document and to every webview iframe
 * currently in the DOM. Also persists it so future reads (including new webview mounts) pick up the
 * same value.
 */
export function applyLayoutDirection(dir: LayoutDirection): void {
  localStorage.setItem(STORAGE_KEY, dir);
  document.documentElement.setAttribute('dir', dir);
  applyDirectionToIframes(dir);
}
