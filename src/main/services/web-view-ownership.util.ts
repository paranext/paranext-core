/**
 * The vocabulary an ownership search uses, and the register of moves that make one unanswerable.
 *
 * Kept apart from the router and from the move policy because both sides need it: a search asks
 * `isMatchedByMoveInFlight` before reporting nothing found, and the move path is what fills the
 * register. Nothing here imports either of them, which is what keeps that mutual need acyclic.
 */

import type { SavedWebViewDefinition, WebViewId, WebViewType } from '@shared/models/web-view.model';

/**
 * What a window is asked to look for. An id is answered by one lookup per window; a type needs the
 * window's whole list, which is why the two are distinct rather than one predicate — the id path is
 * on every routed call and must not start shipping every definition.
 */
export type OwnerMatcher =
  | { kind: 'id'; webViewId: WebViewId }
  | {
      kind: 'type';
      webViewType: WebViewType;
      /**
       * Narrows the search to web views showing this project. Left out, a type matches whatever
       * project it is showing.
       */
      projectId?: string;
    };

/**
 * How to name what an ownership search is looking for, in a log line or an error a user may read.
 * Kept beside {@link OwnerMatcher} so every module phrases the same search the same way.
 *
 * @param matcher What the search is looking for
 * @returns A noun phrase naming it
 */
export function describeMatcher(matcher: OwnerMatcher): string {
  if (matcher.kind === 'id') return `webview ${matcher.webViewId}`;
  return matcher.projectId === undefined
    ? `a ${matcher.webViewType} web view`
    : `a ${matcher.webViewType} web view showing project ${matcher.projectId}`;
}

/** A web view a move has taken out of one window and not yet put into another */
export type WebViewMoveInFlight = {
  /** Type of the captured view */
  webViewType: WebViewType;
  /** Project the captured view was showing, if any */
  projectId?: string;
  /**
   * The window a readopt is genuinely in flight into right now, or `undefined` when none is.
   *
   * The invariant this field holds: **it names a window if and only if this move has a readopt
   * actually running against that window at this instant** — not "the window this move is
   * ultimately trying to reach," and not "the last window it tried." It is never set "for a while"
   * or "until the next step updates it"; a value lasts exactly as long as the readopt that earned
   * it is running, and no longer.
   *
   * The primary adopt (`moveCapturedWebView` in `web-view-move.util.ts`) sets this as part of
   * constructing the record — before the record is ever added to the register below, and with
   * nothing but a synchronous `isWindowClosing` check between that and the adopt starting — so the
   * record is never visible here naming a window whose adopt is not about to run or already
   * running. A failed move's recovery (`recoverAfterFailedMove`) re-adopts elsewhere in turn — the
   * source window, then the focused window — and runs every one of those attempts through
   * `readoptWithDestination`, which sets this immediately before that attempt's own readopt starts
   * and clears it back to `undefined` immediately after that readopt settles, whichever way it
   * settles: success, a handled failure, or a throw. A rung that named a window and then went on to
   * `await` something else — resolving the next window to try, for instance — before clearing would
   * leave this pointing at a readopt that is no longer running; that is exactly what the invariant
   * rules out, by construction rather than by remembering to clear it at the right spot.
   *
   * What lets `getOpenWebViewDefinitionsForWindow` in `web-view.service-router.ts` attribute an
   * in-flight move to the one closing window it is headed toward, the same way `webViewType` and
   * `projectId` let a search attribute one to what it is looking for. `undefined` simply matches no
   * window's read, which is correct: between readopts, or once every readopt has failed, the move
   * belongs to nobody's enumeration.
   */
  destinationWindowId: string | undefined;
  /**
   * The definition the capture returned, kept whole rather than split into the fields above: both
   * `getAllOpenWebViewDefinitionsWithReachability` (the whole-app read) and
   * `getOpenWebViewDefinitionsForWindow` (one window's read), in `web-view.service-router.ts`, fold
   * this into their result so a web view mid-move is not invisible to a caller that selects by
   * `state?.isReadOnly` alongside `projectId` — a selection `webViewType`/`projectId` alone cannot
   * answer. Its `id` is also what a search and both fold-ins match on: the id a web view is minted
   * with never changes across a move (see `mint-web-view-ids.util.ts`), so this is the same id the
   * caller asked the move for and the same id the destination window reports once the adopt lands.
   */
  capturedDefinition: SavedWebViewDefinition;
};

/**
 * Moves that have closed a web view in its source window and not yet opened it in its target.
 *
 * For that gap the web view is open in no window at all, so every window answers an ownership
 * search truthfully and the search still comes back wrong: the view exists, and a caller that
 * creates on a miss mints a second copy of one the app means to have exactly one of.
 *
 * Deliberately nothing to wait on. A search that lands in the gap is told the question could not be
 * answered right now — which is what `findOwner`'s (`web-view-owner-resolution.util.ts`)
 * `hadUnreachableWindows` already means — so every caller keeps the weighing it already applies to
 * that: a passive probe answers not-found, and a caller that creates opens where the user is rather
 * than refuse for the length of a move.
 */
const webViewMovesInFlight = new Set<WebViewMoveInFlight>();

/**
 * Record that a move has taken a web view out of its window and not yet put it into another. Pair
 * with {@link deleteMoveInFlight} in a `finally`, so a move that throws still clears.
 */
export function addMoveInFlight(move: WebViewMoveInFlight): void {
  webViewMovesInFlight.add(move);
}

/** Forget a move's record, once the move has settled either way */
export function deleteMoveInFlight(move: WebViewMoveInFlight): void {
  webViewMovesInFlight.delete(move);
}

/** Visit every open move's record, each exactly once */
export function forEachMoveInFlight(visit: (move: WebViewMoveInFlight) => void): void {
  webViewMovesInFlight.forEach(visit);
}

/** Whether a move in flight is holding the web view a search is looking for */
export function isMatchedByMoveInFlight(matcher: OwnerMatcher): boolean {
  return [...webViewMovesInFlight].some((move) =>
    matcher.kind === 'id'
      ? move.capturedDefinition.id === matcher.webViewId
      : move.webViewType === matcher.webViewType &&
        (matcher.projectId === undefined || move.projectId === matcher.projectId),
  );
}
