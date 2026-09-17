import { CONTENT_ZOOM_CHORDS, ContentZoomChord } from '@shared/models/content-zoom.model';
import { ContentZoomAreaId, WebViewId } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * The zoom actions and the window-input-blocked query {@link registerContentZoomChromeKeys} calls,
 * injected so this module does not import the content-zoom service or the window-input-blocked
 * query directly.
 */
export type ContentZoomChromeKeysDeps = {
  adjustContentZoom: (
    webViewId: WebViewId | undefined,
    deltaSteps: number,
    areaId?: ContentZoomAreaId,
  ) => Promise<void>;
  resetContentZoom: (webViewId: WebViewId | undefined, areaId?: ContentZoomAreaId) => Promise<void>;
  isWindowInputBlocked: () => boolean;
  /** Whether a pane and an area resolve for a chord carrying no ids — see the service's own query. */
  canContentZoomAct: () => boolean;
};

/**
 * Ctrl (or ⌘) is required. Alt is excluded, because Ctrl+Alt chords carry their own meanings. Shift
 * is accepted for every zoom action — see {@link CONTENT_ZOOM_CHORDS} for why. This is the one chord
 * rule stated in each handler rather than carried by the shared table, because it is two booleans
 * and no table entry could say it more clearly.
 */
function isChordModifier(e: KeyboardEvent): boolean {
  return (e.ctrlKey || e.metaKey) && !e.altKey;
}

type ChordAction = ContentZoomChord['action'];

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
 * The action a keystroke names, read from {@link CONTENT_ZOOM_CHORDS} — the same table the in-view
 * bootstrap script serializes into the source it injects, so both key handlers are projections of
 * one declaration. `web-view-content-zoom.chord-parity.test.ts` checks both against a rule stated
 * by hand, so the table is under test rather than checking itself.
 */
function actionFor(e: KeyboardEvent): ChordAction | undefined {
  return CONTENT_ZOOM_CHORDS.find(
    (chord) =>
      chord.keys.includes(e.key) ||
      chord.codes.some(
        (entry) => entry.code === e.code && (!entry.requiredKey || entry.requiredKey === e.key),
      ),
  )?.action;
}

/**
 * Registers the window-chrome Ctrl/⌘+`+`/`-`/`0` content-zoom chords. The in-view bootstrap script
 * (`web-view-content-zoom.bootstrap-script.ts`) only sees these keys while focus is inside a web
 * view's iframe, so with keyboard focus on the window's own UI instead — a tab header just clicked,
 * the reference box, a renderer toolbar button — nothing would otherwise zoom the active pane.
 * Calls the injected actions with no web view id and no area id, so the content-zoom service
 * resolves the window's active tab and that tab's active area on its own.
 *
 * No-ops while this window's input is blocked
 * ({@link ContentZoomChromeKeysDeps.isWindowInputBlocked}): a modal dialog, the command palette, or
 * one of the full-screen overlays is what the user is working in (or is dimmed/hidden behind), and
 * its own use of these keys, if any, must not be shadowed by this listener. A non-modal docked
 * dialog stops nothing — the user keeps working in the panes behind it.
 *
 * Consumes the keystroke only when the action will really happen
 * ({@link ContentZoomChromeKeysDeps.canContentZoomAct}): a pane that marks no zoom area cannot zoom,
 * and swallowing the chord there would take it from whoever else might want it while giving the
 * user nothing back.
 *
 * @param deps The zoom actions, the window-input-blocked query and the can-act query to call.
 * @returns A function that removes the listener.
 */
export function registerContentZoomChromeKeys(deps: ContentZoomChromeKeysDeps): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!isChordModifier(e)) return;
    if (isInsideIframe(e.target)) return;
    const action = actionFor(e);
    if (!action) return;
    // A deliberate fast path, not duplication: `canContentZoomAct` below already answers false
    // while the window's input is blocked (its resolver refuses a chord that carries no ids), but
    // asking here keeps this listener's overlay contract its own — checkable without a resolvable
    // pane, and unaffected by whatever the service decides to resolve next. Checked only after the
    // action filter above (not before), so the blocked-window check runs for a genuine zoom chord and
    // not for every Ctrl/⌘ combination this capture-phase window listener sees.
    if (deps.isWindowInputBlocked()) return;
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
