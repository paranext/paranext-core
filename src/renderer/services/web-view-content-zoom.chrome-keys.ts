import { ContentZoomAreaId, WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * The zoom actions and the modal-overlay query {@link registerContentZoomChromeKeys} calls, injected
 * so this module does not import the content-zoom service or the modal-overlay query directly.
 */
export type ContentZoomChromeKeysDeps = {
  adjustContentZoom: (
    webViewId: WebViewId | undefined,
    deltaSteps: number,
    areaId?: ContentZoomAreaId,
  ) => Promise<void>;
  resetContentZoom: (webViewId: WebViewId | undefined, areaId?: ContentZoomAreaId) => Promise<void>;
  isModalOverlayOpen: () => boolean;
  /** Whether a pane and an area resolve for a chord carrying no ids — see the service's own query. */
  canContentZoomAct: () => boolean;
};

/**
 * Ctrl (or ⌘) is required. Alt is excluded, because Ctrl+Alt chords carry their own meanings. Shift
 * is accepted for every zoom action: on AZERTY and Czech layouts the top-row `0` and `-` are
 * shifted keys, so rejecting Shift would put reset out of reach there entirely, and Chromium's own
 * zoom accepts it the same way.
 */
function isChordModifier(e: KeyboardEvent): boolean {
  return (e.ctrlKey || e.metaKey) && !e.altKey;
}

type ChordAction = 'in' | 'out' | 'reset';

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

/**
 * Keys exactly as the in-view bootstrap script's own keydown handler recognizes them (`onKeyDown`
 * inside `getContentZoomBootstrapScript` in `web-view-content-zoom.bootstrap-script.ts`). That
 * script is serialized to a string and cannot import this module, so the two copies are
 * independently maintained — change both together. `web-view-content-zoom.chord-parity.test.ts` is
 * the guard that keeps them in sync.
 */
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
 * No-ops while a modal overlay is open ({@link ContentZoomChromeKeysDeps.isModalOverlayOpen}): a
 * modal dialog or the command palette is what the user is working in, it is out of scope for
 * content zoom, and its own use of these keys, if any, must not be shadowed by this listener. A
 * non-modal docked dialog stops nothing — the user keeps working in the panes behind it.
 *
 * Consumes the keystroke only when the action will really happen
 * ({@link ContentZoomChromeKeysDeps.canContentZoomAct}): a pane that marks no zoom area cannot zoom,
 * and swallowing the chord there would take it from whoever else might want it while giving the
 * user nothing back.
 *
 * @param deps The zoom actions, the modal-overlay query and the can-act query to call.
 * @returns A function that removes the listener.
 */
export function registerContentZoomChromeKeys(deps: ContentZoomChromeKeysDeps): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!isChordModifier(e)) return;
    if (isInsideIframe(e.target)) return;
    const action = actionFor(e);
    if (!action) return;
    // A deliberate fast path, not duplication: `canContentZoomAct` below already answers false
    // behind a modal overlay (its resolver refuses a chord that carries no ids), but asking here
    // keeps this listener's overlay contract its own — checkable without a resolvable pane, and
    // unaffected by whatever the service decides to resolve next. Checked only after the action
    // filter above (not before), so the overlay-map scan runs for a genuine zoom chord and not for
    // every Ctrl/⌘ combination this capture-phase window listener sees.
    if (deps.isModalOverlayOpen()) return;
    if (!deps.canContentZoomAct()) return;
    e.preventDefault();
    const promise =
      action === 'reset'
        ? deps.resetContentZoom(undefined)
        : deps.adjustContentZoom(undefined, action === 'in' ? 1 : -1);
    promise.catch((err) =>
      logger.warn(`Content zoom: window-chrome chord failed. ${getErrorMessage(err)}`),
    );
  };
  // Capture phase, unlike the in-view bootstrap's own bubble-phase listener: parts of the window
  // chrome this listener exists for stop every keydown they see unconditionally — the reference
  // box's book/chapter picker and its recent-searches list both do — so a bubble-phase listener
  // never sees the chord on exactly the surfaces it was written for. Nothing else in the renderer
  // chrome claims these chords, so pre-empting the bubble phase costs no other handler its keys.
  window.addEventListener('keydown', onKeyDown, true);
  return () => window.removeEventListener('keydown', onKeyDown, true);
}
