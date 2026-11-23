/**
 * Shared constants for the Find web view, its provider, and its backing command handlers in
 * `main.ts`.
 *
 * `FIND_FOCUS_SEARCH_EVENT` is how `platformScripture.openFind` asks an ALREADY-MOUNTED Find web
 * view to put the caret in its search box. Bringing the tab to the front focuses the web view's
 * iframe but lands on its `body`, so without this the user arrives at Find unable to type.
 *
 * The event covers only the case where nothing remounts: `openFind` reuses an open Find whose
 * project, editor, and editability all still match, which is the common path now that the Column 3
 * re-point supplies all three at project-open time. When `openFind` instead reloads the web view,
 * the request travels as `FindWebViewOptions.shouldFocusSearch` and is read out of the fresh
 * mount's initial state — an event would race that mount's own subscription and usually lose it.
 *
 * Unlike the broadcast `CHECKLIST_OPEN_SETTINGS_EVENT`, this one is addressed: the payload names a
 * web view and each Find compares it against its own id. Power mode can hold more than one Find
 * panel, and only the one `openFind` resolved should take focus away from the user's current
 * caret.
 */
/**
 * Its payload type, `FindFocusSearchEvent`, is declared in `platform-scripture.d.ts` alongside the
 * `NetworkEvents` entry that types this channel, matching `CheckResultsInvalidated`.
 */
export const FIND_FOCUS_SEARCH_EVENT = 'platformScripture.focusFindSearch';
