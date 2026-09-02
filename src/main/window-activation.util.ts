/**
 * How a new window becomes visible, decided from whether a person asked for it.
 *
 * The question is _"did someone in this app ask for this window?"_, which only the caller knows.
 * Focus state cannot answer it: it reports whether this app holds the foreground, which coincides
 * with the question for the common cases and diverges for exactly the ones that matter — a window
 * restored by a dock click has no focused window to read, and reads identically to an extension
 * opening one while the user works elsewhere. See
 * `adr-window-activation-is-declared-not-inferred`.
 */

/** What a window should do to become visible */
export type WindowActivationPlan = {
  /**
   * Whether the `BrowserWindow` constructor shows the window itself. False leaves it hidden until
   * something reveals it, which is what makes {@link revealAfterLoadFailure} necessary.
   */
  showOnCreate: boolean;
  /** How to reveal the window once it can paint: taking the foreground, or without disturbing it */
  revealWhenReady: 'activate' | 'inactive';
  /**
   * How to reveal a window whose page failed to load, or `undefined` when the constructor already
   * showed it and there is nothing left to do.
   *
   * A window held back from the constructor is revealed by `ready-to-show`, which a page that fails
   * to load never reaches — the failure handler only logs. Without this the window would exist,
   * tracked and routable, and never appear: worse than the badly-timed foreground the withholding
   * exists to avoid.
   */
  revealAfterLoadFailure?: 'inactive';
};

/**
 * Decide how a new window becomes visible.
 *
 * @param isUserRequested Whether a person in this app asked for this window — a menu item, the
 *   `platform.createWindow` command, a dock-click or startup restore. False for a window an
 *   extension's web-view open or a cross-window move brought into being.
 * @returns What the window should do to become visible
 */
export function planWindowActivation(isUserRequested: boolean): WindowActivationPlan {
  if (isUserRequested) return { showOnCreate: true, revealWhenReady: 'activate' };
  // Held back from the constructor so it cannot flash into the foreground before anything can act
  // on it, revealed inactive when it can paint, and revealed anyway if its page never gets there.
  return {
    showOnCreate: false,
    revealWhenReady: 'inactive',
    revealAfterLoadFailure: 'inactive',
  };
}

/**
 * Windows created without activation that the user has not activated since.
 *
 * Held in the process that creates windows because that is the only one that knows both halves: it
 * decided not to activate the window, and it sees the window's `focus` event. A window drops out on
 * its first activation, so content arriving later focuses normally — which is why the renderer
 * needs no state of its own to remember how its window was opened.
 */
const windowIdsAwaitingFirstActivation = new Set<number>();

/** Record that a window was created without being activated. See {@link planWindowActivation} */
export function noteWindowWithheldFromActivation(windowId: number): void {
  windowIdsAwaitingFirstActivation.add(windowId);
}

/**
 * Stop withholding focus from content arriving in a window.
 *
 * Called from the window's `focus` handler, which is the event that makes it an ordinary window,
 * and from its teardown, which is what keeps the set from growing for the life of the process.
 */
export function forgetWindowWithholding(windowId: number): void {
  windowIdsAwaitingFirstActivation.delete(windowId);
}

/**
 * Whether this window was created without activation and has not been activated since.
 *
 * The single fact behind both rules below: what content may do to focus, and whether a window that
 * failed still needs revealing.
 */
export function isWindowAwaitingFirstActivation(windowId: number): boolean {
  return windowIdsAwaitingFirstActivation.has(windowId);
}

/**
 * Whether content docking in this window must not take document focus.
 *
 * True only for a window created without activation that the user has not activated since. Read at
 * the moment content is sent, not when the window was created: a window the user has since clicked
 * into is an ordinary window, and its next web view should land focused like any other.
 */
export function shouldContentAvoidDocumentFocus(windowId: number): boolean {
  return isWindowAwaitingFirstActivation(windowId);
}

/**
 * Error code Chromium reports when a navigation was superseded or cancelled rather than failing to
 * arrive — `ERR_ABORTED`. A page that is still coming reports this on its way.
 */
const NAVIGATION_ABORTED_ERROR_CODE = -3;

/**
 * Whether a window that could not load should be revealed anyway.
 *
 * The reveal exists for a page that never reaches `ready-to-show`, which is what would otherwise
 * leave a withheld window tracked, routable and permanently invisible. It is deliberately narrow,
 * because revealing early shows a window before it can paint — the thing withholding `show` exists
 * to prevent.
 *
 * @param plan What the window was told to do to become visible
 * @param failure The `did-fail-load` report — whether it was this window's own page and why it
 *   failed — together with whether this window is still waiting to be seen for the first time
 */
export function shouldRevealAfterLoadFailure(
  plan: WindowActivationPlan,
  failure: { isMainFrame: boolean; errorCode: number; isAwaitingFirstActivation: boolean },
): boolean {
  if (!plan.revealAfterLoadFailure) return false;
  // The window has been on screen and the user has been in it since; bringing it back because its
  // page failed to load would undo where they left it. The reveal is for a window never yet seen.
  if (!failure.isAwaitingFirstActivation) return false;
  // Every web view in the app is an in-page iframe of the window's page, so a sub-frame failure is
  // one web view not loading — the window itself is still on its way to `ready-to-show`.
  if (!failure.isMainFrame) return false;
  // Nothing failed to arrive: the navigation was replaced or cancelled, and a page is still coming.
  if (failure.errorCode === NAVIGATION_ABORTED_ERROR_CODE) return false;
  return true;
}

/**
 * Whether a window whose renderer died should be revealed anyway.
 *
 * A renderer that dies before the window can paint emits `render-process-gone` rather than
 * `did-fail-load`, so without this the window would never be revealed by anything.
 *
 * @param plan What the window was told to do to become visible
 * @param isAwaitingFirstActivation Whether this window has yet to be seen — see
 *   {@link isWindowAwaitingFirstActivation}
 */
export function shouldRevealAfterRendererGone(
  plan: WindowActivationPlan,
  isAwaitingFirstActivation: boolean,
): boolean {
  return plan.revealAfterLoadFailure !== undefined && isAwaitingFirstActivation;
}

/**
 * Whether revealing a window should flash its frame to draw attention to it.
 *
 * `showInactive()` puts a withheld window on screen without pulling focus, so the flash is the only
 * visible signal the user gets that it exists at all. A window revealed with the foreground already
 * has the user's attention and needs no signal.
 *
 * @param plan What the window was told to do to become visible
 */
export function shouldFlashOnReveal(plan: WindowActivationPlan): boolean {
  return plan.revealWhenReady === 'inactive';
}

/** Withheld windows whose focus has already been handed back once. See {@link shouldBounceFocusBack} */
const windowIdsAlreadyBouncedBack = new Set<number>();

/** Record that a window's focus has been handed back, so it is never done to that window again */
export function noteWindowBouncedFocusBack(windowId: number): void {
  windowIdsAlreadyBouncedBack.add(windowId);
}

/** Whether this window's focus has already been handed back once */
export function hasWindowBouncedFocusBack(windowId: number): boolean {
  return windowIdsAlreadyBouncedBack.has(windowId);
}

/** Forget a window's bounce record, for a window that has gone away */
export function forgetWindowBounce(windowId: number): void {
  windowIdsAlreadyBouncedBack.delete(windowId);
}

/**
 * Whether to hand focus straight back to the window the user was in.
 *
 * A window held back from the foreground takes focus anyway the moment its page first paints, with
 * no call from either process to stop — so it cannot be prevented, only undone. This is what undoes
 * it.
 *
 * Bounded to ONE bounce per window, because the alternative is a window nobody can get into: a rule
 * that fired every time would throw the user out on each attempt to reach it. After the first, the
 * window keeps whatever focus it is given.
 *
 * @param state Whether the window is still waiting to be seen for the first time — a user gesture
 *   in it ends that — whether its focus has already been handed back once, whether there is another
 *   window to hand it back to, and whether the focus arrived inside the short window after first
 *   paint in which the page takes focus for itself. The third is not always true: a withheld window
 *   can be the first this process tracks, and routing then answers with the window itself. The
 *   fourth is what keeps a user's own click from being undone: on a compositor that does not
 *   self-focus, the FIRST focus event this window ever sees is the user clicking it, and an
 *   unbounded arm would snap them straight back out
 */
export function shouldBounceFocusBack(state: {
  isAwaitingFirstActivation: boolean;
  hasAlreadyBouncedFocusBack: boolean;
  canReturnFocusElsewhere: boolean;
  isWithinSelfFocusWindow: boolean;
}): boolean {
  return (
    state.isAwaitingFirstActivation &&
    !state.hasAlreadyBouncedFocusBack &&
    state.canReturnFocusElsewhere &&
    state.isWithinSelfFocusWindow
  );
}

/**
 * How long after a window first paints the page may still take focus for itself.
 *
 * The self-focus arrives in the same breath as the first paint. Anything later is a person, and a
 * person's click must not be undone — so the hand-back is armed only for this long. Generous
 * relative to the event it is waiting for, because the cost of being too short is the defect coming
 * back, while the cost of being too long is one undone click in a window nobody asked for.
 */
export const SELF_FOCUS_WINDOW_MS = 2000;

/**
 * Forget every window this module is tracking.
 *
 * The two sets here are process state that no `vi.clearAllMocks()` touches, and a test that marks a
 * window and then fails leaves that mark for every test after it — which changes what they exercise
 * without failing them.
 */
export function resetWindowActivationForTesting(): void {
  windowIdsAwaitingFirstActivation.clear();
  windowIdsAlreadyBouncedBack.clear();
}
