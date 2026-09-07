/**
 * Whether, and where, to tell the user that a window has been given up on.
 *
 * Pure — the caller passes in what it knows — so the decision is unit-testable without Electron.
 */

/** Where the notice should be parented */
export type AbandonedWindowNoticeParent = 'abandoned-window' | 'another-window';

/** A live window the notice could be shown on */
export type NoticeParentCandidate = {
  /** The window's id */
  windowId: string;
  /** Whether this window holds the primary role right now */
  isPrimary: boolean;
};

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
  /**
   * Whether the abandoned window is still waiting for the content it was created to receive, so its
   * persisted entry holds nothing.
   */
  isAbandonedWindowPendingContent: boolean;
};

/**
 * Whether to tell the user a window has been given up on, and which window to ask on.
 *
 * Four states say nothing. Three are a question with no answer left to give: the application is
 * going down, so every window is leaving anyway and a whole-application crash would otherwise put
 * one of these on screen per window; this window's close has already begun; or the user has already
 * been asked about it, which `render-process-gone` firing twice for one window would otherwise do.
 *
 * The fourth is a question not worth asking. A window still waiting for the content it was created
 * to receive holds nothing, so its entry is not kept when it closes — the offer's promise that the
 * window comes back would be false, and there would be nothing to bring back either.
 *
 * Otherwise the question goes on the abandoned window, because it is the window the message is
 * about and one shown over a different window reads as being about that one. The exception is a
 * window the user cannot see: a modal parented to a minimized or hidden window is a question nobody
 * is shown, so that goes to another window instead — see {@link chooseNoticeParentWindowId}.
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
  if (input.isAbandonedWindowPendingContent) return { kind: 'stay-silent' };
  return {
    kind: 'ask',
    parent: input.isAbandonedWindowVisible ? 'abandoned-window' : 'another-window',
  };
}

/**
 * Which live window carries a notice the abandoned window itself cannot.
 *
 * The abandoned window is never the answer, and saying so is the point: this choice is only reached
 * because that window is off screen, and the primary role can be sitting on it — the role is read
 * from the persisted entry, and a window given up on keeps its entry. Answering with it would put
 * the question back on the window nobody is shown, which is what this exists to avoid.
 *
 * Among the rest the primary is preferred, as the window the user is most likely to be looking at.
 * When none of them holds the role, any of them still beats a window off screen. When there is no
 * other window at all, nothing is the answer: the caller shows the box with no parent, which the
 * platform still puts on screen.
 *
 * @param abandonedWindowId The window the notice is about
 * @param candidates Every live window, in tracking order
 * @returns The window to parent the question to, or `undefined` to show it unparented
 */
export function chooseNoticeParentWindowId(
  abandonedWindowId: string,
  candidates: readonly NoticeParentCandidate[],
): string | undefined {
  const otherWindows = candidates.filter((candidate) => candidate.windowId !== abandonedWindowId);
  return (otherWindows.find((candidate) => candidate.isPrimary) ?? otherWindows[0])?.windowId;
}

/** A live window being considered as a parent, with what decides whether it can carry the notice */
export type NoticeParentEligibilityInput = {
  /** The window's id */
  windowId: string;
  /** Whether this window holds the primary role right now */
  isPrimary: boolean;
  /** Whether this window's own close has already begun */
  isClosing: boolean;
  /** Whether this window has itself been given up on */
  isAbandoned: boolean;
  /** Whether this window is on screen right now — not minimized, not hidden */
  isVisible: boolean;
};

/**
 * Narrows the live window set down to the ones {@link chooseNoticeParentWindowId} may choose among.
 *
 * A window whose close has begun is on its way out, so a question parented to it would go down with
 * it. One that has itself been given up on is a dead page, not a place to ask a question about a
 * different dead page. And one that is minimized or hidden would carry the question off screen with
 * it, exactly the reason {@link decideAbandonedWindowNotice} avoids the abandoned window itself when
 * it is not visible.
 *
 * @param windows Every live window, in tracking order
 * @returns The subset eligible to carry the notice
 */
export function eligibleNoticeParentCandidates(
  windows: readonly NoticeParentEligibilityInput[],
): NoticeParentCandidate[] {
  return windows
    .filter((window) => !window.isClosing && !window.isAbandoned && window.isVisible)
    .map(({ windowId, isPrimary }) => ({ windowId, isPrimary }));
}

/**
 * Whether an abandoned window a notice was offered for is still there to close once the user
 * answers it.
 *
 * The dialog can sit open for as long as the user takes to answer — long enough for the window to
 * have been destroyed outright, or for some other close to have already started on it since the
 * notice went up. Closing it again in either case would call the window's own close a second time:
 * on a destroyed window that throws, and on one already mid-close it skips past that close's own
 * shutdown work rather than letting it run.
 *
 * @param isWindowDestroyed Whether the window has already been destroyed
 * @param isWindowClosing Whether the window's own close has already begun
 * @returns Whether the window is still there, and not already on its way out, to close
 */
export function shouldStillCloseAbandonedWindow(
  isWindowDestroyed: boolean,
  isWindowClosing: boolean,
): boolean {
  return !isWindowDestroyed && !isWindowClosing;
}
