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
 * When {@link tabAwaitingDocumentFocus} was last set, so a bounded consumer (see
 * {@link takeTabAwaitingDocumentFocusIfFresh}) can tell a note this window is still catching up on
 * from one so old that whatever raised the window has long since been refused or abandoned.
 */
let tabAwaitingDocumentFocusNotedAt: number | undefined;

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
  tabAwaitingDocumentFocusNotedAt = Date.now();
}

/**
 * Take the tab that is waiting for document focus, clearing it.
 *
 * Unbounded by design: the gesture-gated catch-up this feeds (a `pointerdown`/`keydown` inside a
 * window still awaiting its first activation) may run long after the note was made — the user can
 * take as long as they like before first clicking into a background window — and that wait is not a
 * reason to drop the tab that was waiting for them.
 *
 * @returns The waiting tab's id, or `undefined` if no tab is waiting
 */
export function takeTabAwaitingDocumentFocus(): string | undefined {
  const tabId = tabAwaitingDocumentFocus;
  tabAwaitingDocumentFocus = undefined;
  tabAwaitingDocumentFocusNotedAt = undefined;
  return tabId;
}

/**
 * Take the tab that is waiting for document focus, but only if the note is no older than
 * `maxAgeMs`; otherwise leaves it in place and returns `undefined`.
 *
 * For the focus-driven catch-up (an already-activated window regaining OS focus, not a gesture
 * inside it): that trigger can fire long after the raise it is meant to catch up on — an unrelated
 * later alt-tab back into this window, once the window has moved on to something else entirely —
 * and consuming a stale note then would focus a tab the user never asked to see. The gesture-gated
 * catch-up has no such spurious trigger (a click IS the arrival it is catching up on), which is why
 * only this bounded read exists for it.
 *
 * @param maxAgeMs How old the note may be and still count as fresh
 * @returns The waiting tab's id if the note is fresh, `undefined` otherwise (leaving it in place)
 */
export function takeTabAwaitingDocumentFocusIfFresh(maxAgeMs: number): string | undefined {
  if (tabAwaitingDocumentFocus === undefined || tabAwaitingDocumentFocusNotedAt === undefined)
    return undefined;
  if (Date.now() - tabAwaitingDocumentFocusNotedAt > maxAgeMs) return undefined;
  return takeTabAwaitingDocumentFocus();
}

/** Only for tests: put the latch back to how a freshly created window finds it */
export function resetActivationLatchForTesting(): void {
  hasWindowBeenActivated = false;
  tabAwaitingDocumentFocus = undefined;
  tabAwaitingDocumentFocusNotedAt = undefined;
}

/**
 * How long a tab left waiting for document focus by a cross-window raise stays eligible for the
 * OS-focus-driven catch-up (see {@link takeTabAwaitingDocumentFocusIfFresh}).
 *
 * A raise Windows refuses to honor leaves the note behind with nothing to clear it, so an unbounded
 * read would let a much-later, unrelated OS focus change into this window steal focus into a tab
 * from a raise the user never saw happen. Generous relative to how long a raise takes to land —
 * cheap window and OS work, not a network round trip — because the cost of being too short is the
 * defect this exists to fix coming back, while the cost of being too long is a stale catch-up
 * firing on an activation the user was going to make anyway.
 */
export const CROSS_WINDOW_RAISE_FOCUS_CATCH_UP_BOUND_MS = 5000;
