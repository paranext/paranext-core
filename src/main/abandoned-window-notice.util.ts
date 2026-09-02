/**
 * Whether, and where, to tell the user that a window has been given up on.
 *
 * Pure — the caller passes in what it knows — so the decision is unit-testable without Electron.
 */

/** Where the notice should be parented */
export type AbandonedWindowNoticeParent = 'abandoned-window' | 'primary-window';

/** What to do about a window whose renderer has been given up on */
export type AbandonedWindowNoticeDecision =
  | { kind: 'stay-silent' }
  | { kind: 'ask'; parent: AbandonedWindowNoticeParent };

/** What the caller knows about the window and the application when a window is abandoned */
export type AbandonedWindowNoticeInput = {
  /** Whether the application is on its way down by either route */
  isAppShuttingDown: boolean;
  /** Whether this window's close has already begun */
  isWindowClosing: boolean;
  /** Whether this window has already been asked about */
  hasAlreadyAsked: boolean;
  /** Whether the abandoned window is on screen right now — not minimized, not hidden */
  isAbandonedWindowVisible: boolean;
};

/**
 * Whether to tell the user a window has been given up on, and which window to ask on.
 *
 * Three states say nothing, and each is a question with no answer left to give: the application is
 * going down, so every window is leaving anyway and a whole-application crash would otherwise put
 * one of these on screen per window; this window's close has already begun; or the user has already
 * been asked about it, which `render-process-gone` firing twice for one window would otherwise do.
 *
 * Otherwise the question goes on the abandoned window, because it is the window the message is
 * about and one shown over a different window reads as being about that one. The exception is a
 * window the user cannot see: a modal parented to a minimized or hidden window is a question nobody
 * is shown, so that goes to the primary instead.
 *
 * @param input What the caller knows right now
 * @returns Whether to ask, and where to parent the question
 */
export function decideAbandonedWindowNotice(
  input: AbandonedWindowNoticeInput,
): AbandonedWindowNoticeDecision {
  if (input.isAppShuttingDown) return { kind: 'stay-silent' };
  if (input.isWindowClosing) return { kind: 'stay-silent' };
  if (input.hasAlreadyAsked) return { kind: 'stay-silent' };
  return {
    kind: 'ask',
    parent: input.isAbandonedWindowVisible ? 'abandoned-window' : 'primary-window',
  };
}
