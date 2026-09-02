/**
 * Whether a closing window's persisted entry stays in the structure or leaves with it.
 *
 * Pure — the caller passes in what it knows — so the rule is unit-testable without Electron. It
 * lived inline in the close handler, where nothing could reach it.
 */

/** What the close handler knows about the window and the application as the window goes */
export type WindowEntryDispositionInput = {
  /** Whether the application is on its way down by either route */
  isAppGoingDown: boolean;
  /** Whether this window's renderer was given up on after crash-looping */
  isAbandoned: boolean;
  /** Whether this window is closing because the interface mode changed */
  isClosingForModeSwitch: boolean;
  /** Whether this window is still waiting for the content it was created to receive */
  isPendingContent: boolean;
};

/**
 * Whether a closing window's entry stays in the persisted structure.
 *
 * An ordinary close is the window leaving: the user closed it and does not expect it back, so its
 * entry goes with it. Three closes are not that.
 *
 * A window going down with the application has to be there next session holding whatever it held,
 * which is what makes a multi-window quit restore the arrangement rather than one window of it.
 *
 * A window closing because the interface mode changed is meant to come back on the way to power,
 * and its entry is what a later reopen creates it from.
 *
 * A window whose renderer was given up on after crash-looping keeps its entry too, and that is what
 * makes offering to close it safe: the window is dead either way, so the only question is whether
 * the user also loses its tabs. Without this, closing it would rewrite the structure without it and
 * the layout would be gone — which is why such a window used to be left open with no way out but a
 * relaunch.
 *
 * The exception, for the last two but deliberately NOT for a quit: a window still waiting for the
 * content it was created to receive has nothing in its entry, so keeping it would resurrect a blank
 * window on every later switch or launch rather than restoring anything. A quit keeps every entry
 * as it always has — narrowing it here would change what a quit persists, which is a different
 * decision from this one.
 *
 * @param input What the close handler knows right now
 * @returns Whether the window's entry stays in the persisted structure
 */
export function keepsItsEntryOnClose(input: WindowEntryDispositionInput): boolean {
  if (input.isAppGoingDown) return true;
  if (input.isPendingContent) return false;
  return input.isAbandoned || input.isClosingForModeSwitch;
}
