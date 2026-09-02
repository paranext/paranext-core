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

/**
 * The tab that was made active without being given document focus, waiting for the user to arrive.
 *
 * Only the latest is kept: several arrivals collapse into one catch-up, because focusing each in
 * turn on activation would end with the same tab focused anyway.
 */
let tabAwaitingDocumentFocus: string | undefined;

/**
 * Remember a tab that was activated without document focus, so it can be given focus when the user
 * arrives. Withholding focus while nobody is looking is only half the job — without this the user
 * activates the window, sees the tab rendered active, types, and the keystrokes go nowhere until
 * they click inside the web view, which is not a path a keyboard or screen-reader user takes.
 *
 * Called from wherever the withholding is actually honored rather than from the callers that ask
 * for it, so a door that reaches the dock without passing through the window service — a reused
 * view raised to the front, a reload, the Home tab a window falls back to — cannot withhold focus
 * without also arranging to give it back.
 */
export function noteTabAwaitingDocumentFocus(tabId: string): void {
  tabAwaitingDocumentFocus = tabId;
}

/**
 * Take the tab that is waiting for document focus, clearing it.
 *
 * @returns The waiting tab's id, or `undefined` if no tab is waiting
 */
export function takeTabAwaitingDocumentFocus(): string | undefined {
  const tabId = tabAwaitingDocumentFocus;
  tabAwaitingDocumentFocus = undefined;
  return tabId;
}

/** Only for tests: put the latch back to how a freshly created window finds it */
export function resetActivationLatchForTesting(): void {
  hasWindowBeenActivated = false;
  tabAwaitingDocumentFocus = undefined;
}
