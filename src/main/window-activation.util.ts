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
