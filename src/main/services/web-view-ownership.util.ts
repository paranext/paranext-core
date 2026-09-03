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
   * The definition the capture returned, kept whole rather than split into the fields above:
   * `getAllOpenWebViewDefinitionsWithReachability` in `web-view.service-router.ts` folds this into
   * its merged read so a web view mid-move is not invisible to a caller that selects by
   * `state?.isReadOnly` alongside `projectId` — a selection `webViewType`/`projectId` alone cannot
   * answer. Its `id` is also what a search and the fold-in match on: the id a web view is minted
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
