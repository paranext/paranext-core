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

export function describeMatcher(matcher: OwnerMatcher): string {
  if (matcher.kind === 'id') return `webview ${matcher.webViewId}`;
  return matcher.projectId === undefined
    ? `a ${matcher.webViewType} web view`
    : `a ${matcher.webViewType} web view showing project ${matcher.projectId}`;
}

/** A web view a move has taken out of one window and not yet put into another */
export type WebViewMoveInFlight = {
  /** Ids the view answers to for the length of the move: the one named, and the captured one */
  webViewIds: WebViewId[];
  webViewType: WebViewType;
  /** Project the captured view was showing, if any */
  projectId?: string;
  /**
   * The definition the capture returned, kept whole rather than split into the fields above:
   * {@link getAllOpenWebViewDefinitionsWithReachability} folds this into its merged read so a web
   * view mid-move is not invisible to a caller that selects by `state?.isReadOnly` alongside
   * `projectId` — a selection `webViewIds`/`webViewType`/`projectId` alone cannot answer.
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
 * answered right now — which is what {@link findOwner}'s `hadUnreachableWindows` already means — so
 * every caller keeps the weighing it already applies to that: a passive probe answers not-found,
 * and a caller that creates opens where the user is rather than refuse for the length of a move.
 */
export const webViewMovesInFlight = new Set<WebViewMoveInFlight>();

/** Whether a move in flight is holding the web view a search is looking for */
export function isMatchedByMoveInFlight(matcher: OwnerMatcher): boolean {
  return [...webViewMovesInFlight].some((move) =>
    matcher.kind === 'id'
      ? move.webViewIds.includes(matcher.webViewId)
      : move.webViewType === matcher.webViewType &&
        (matcher.projectId === undefined || move.projectId === matcher.projectId),
  );
}
