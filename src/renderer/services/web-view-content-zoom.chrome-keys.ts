import { ContentZoomAreaId, WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * The zoom actions and dialog-open query {@link registerContentZoomChromeKeys} calls, injected so
 * this module does not import the content-zoom service or the dialog-open query directly.
 */
export type ContentZoomChromeKeysDeps = {
  adjustContentZoom: (
    webViewId: WebViewId | undefined,
    deltaSteps: number,
    areaId?: ContentZoomAreaId,
  ) => Promise<void>;
  resetContentZoom: (webViewId: WebViewId | undefined, areaId?: ContentZoomAreaId) => Promise<void>;
  isAnyDialogOpen: () => boolean;
};

/** Ctrl (or ⌘) is required. Alt is excluded, because Ctrl+Alt chords carry their own meanings. */
function isChordModifier(e: KeyboardEvent): boolean {
  return (e.ctrlKey || e.metaKey) && !e.altKey;
}

type ChordAction = 'in' | 'out' | 'reset';

/**
 * Whether Shift may accompany the given action. Shift is accepted only for zoom-in, since
 * `Ctrl+Shift+=` is how many keyboards type `Ctrl++`; a held Shift on the zoom-out or reset keys is
 * rejected so `Ctrl+Shift+-` and `Ctrl+Shift+0` stay free for other handlers.
 */
function isAllowedShiftState(e: KeyboardEvent, action: ChordAction): boolean {
  return !e.shiftKey || action === 'in';
}

/**
 * Keystrokes inside a web view's iframe belong to the in-view bootstrap. They do not bubble into
 * this document, so this is insurance against an iframe element itself (or a same-document node
 * under one) being the target.
 */
function isInsideIframe(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target instanceof HTMLIFrameElement) return true;
  return !!target.closest('iframe');
}

/** Keys exactly as the in-view bootstrap recognizes them. */
function actionFor(e: KeyboardEvent): ChordAction | undefined {
  if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd') return 'in';
  if (e.key === '-' || e.code === 'NumpadSubtract') return 'out';
  if (e.key === '0' || e.code === 'Numpad0') return 'reset';
  return undefined;
}

/**
 * Registers the window-chrome Ctrl/⌘+`+`/`-`/`0` content-zoom chords. The in-view bootstrap script
 * (`web-view-content-zoom.bootstrap-script.ts`) only sees these keys while focus is inside a web
 * view's iframe, so with keyboard focus on the window's own UI instead — a tab header just clicked,
 * the reference box, a renderer toolbar button — nothing would otherwise zoom the active pane.
 * Calls the injected actions with no web view id and no area id, so the content-zoom service
 * resolves the window's active tab and that tab's active area on its own.
 *
 * No-ops while a dialog is open ({@link ContentZoomChromeKeysDeps.isAnyDialogOpen}): dialogs are out
 * of scope for content zoom, and a dialog's own use of these keys, if any, must not be shadowed by
 * this listener.
 *
 * @param deps The zoom actions and dialog-open query to call.
 * @returns A function that removes the listener.
 */
export function registerContentZoomChromeKeys(deps: ContentZoomChromeKeysDeps): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!isChordModifier(e)) return;
    if (deps.isAnyDialogOpen()) return;
    if (isInsideIframe(e.target)) return;
    const action = actionFor(e);
    if (!action) return;
    if (!isAllowedShiftState(e, action)) return;
    e.preventDefault();
    const promise =
      action === 'reset'
        ? deps.resetContentZoom(undefined)
        : deps.adjustContentZoom(undefined, action === 'in' ? 1 : -1);
    promise.catch((err) =>
      logger.warn(`Content zoom: window-chrome chord failed. ${getErrorMessage(err)}`),
    );
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
