/**
 * Whether this window has been activated since it was created. Latched on, never off: a window the
 * user has been in is an ordinary window from then on.
 */
let hasWindowBeenActivated = false;

/**
 * Whether content arriving in this window must be shown without taking document focus.
 *
 * True only for a window main created without activating, and only until the user activates it.
 * Read at the moment content asks to be focused rather than at creation, so a window the user has
 * since clicked into behaves like any other.
 *
 * Lives apart from the services that ask it so both the window service and the web view service can
 * read it: every door content can arrive through — a fresh open, a reused view brought to front, a
 * reload, the Home tab this window falls back to when its dock empties — has to give the same
 * answer, and a caller that says nothing gets this one.
 */
export function isWindowAwaitingFirstActivation(): boolean {
  return globalThis.wasWindowCreatedWithoutActivation === true && !hasWindowBeenActivated;
}

/**
 * Record that the user has arrived in this window, ending the withholding.
 *
 * @returns Whether this was the arrival — false if the window had already been activated, so a
 *   caller can tell a first gesture from every one after it
 */
export function noteWindowActivated(): boolean {
  const wasAwaitingActivation = !hasWindowBeenActivated;
  hasWindowBeenActivated = true;
  return wasAwaitingActivation;
}

/** Only for tests: put the latch back to how a freshly created window finds it */
export function resetActivationLatchForTesting(): void {
  hasWindowBeenActivated = false;
}
