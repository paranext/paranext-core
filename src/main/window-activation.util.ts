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
 * Whether content docking in this window must not take document focus.
 *
 * True only for a window created without activation that the user has not activated since. Read at
 * the moment content is sent, not when the window was created: a window the user has since clicked
 * into is an ordinary window, and its next web view should land focused like any other.
 */
export function shouldContentAvoidDocumentFocus(windowId: number): boolean {
  return windowIdsAwaitingFirstActivation.has(windowId);
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
 * @param failure The `did-fail-load` report: whether it was this window's own page, and why it
 *   failed
 */
export function shouldRevealAfterLoadFailure(
  plan: WindowActivationPlan,
  failure: { isMainFrame: boolean; errorCode: number },
): boolean {
  if (!plan.revealAfterLoadFailure) return false;
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
 */
export function shouldRevealAfterRendererGone(plan: WindowActivationPlan): boolean {
  return plan.revealAfterLoadFailure !== undefined;
}
