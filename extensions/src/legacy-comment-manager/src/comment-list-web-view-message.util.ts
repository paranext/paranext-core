import type { CommentFilters, ScopeFilter } from 'legacy-comment-manager';
import { deepEqual } from 'platform-bible-utils';
import { applyFilterOverrides, UNFILTERED } from './comment-list-filters.model';

/** The filters/scope a comment list web view currently has applied. */
export type CurrentCommentListView = {
  filters: CommentFilters;
  scopeFilter: ScopeFilter;
};

/**
 * Resolves what a `setFilters` web view message should apply, and whether each axis actually
 * changes relative to the view's current state.
 *
 * A `setFilters` message is not always a real change: `openCommentList` (main.ts) sends one on
 * every open — including a reuse hit whose filters were already correct, either because nothing was
 * requested to change or because a freshly-created view's filters were already seeded via its
 * initial state. Web view messages are buffered and replayed on iframe load rather than dropped, so
 * this message always arrives; if the component applied it unconditionally, an equal-values re-send
 * would still mint a new-but-equal `CommentFilters` object, which invalidates the `CommentThreads`
 * selector's identity-based `useMemo` and forces an unnecessary PDP unsubscribe/resubscribe,
 * re-query, and skeleton flash. Reporting `filtersChanged`/`scopeFilterChanged` lets the caller
 * skip the `useState`/`useWebViewState` setter entirely when nothing changed, so no new object is
 * ever created.
 */
export function resolveSetFiltersMessage(
  message: { filters?: Partial<CommentFilters>; scopeFilter?: ScopeFilter },
  current: CurrentCommentListView,
): {
  filters: CommentFilters;
  filtersChanged: boolean;
  scopeFilter: ScopeFilter;
  scopeFilterChanged: boolean;
} {
  const filters = applyFilterOverrides(message.filters);
  const scopeFilter = message.scopeFilter ?? UNFILTERED;
  return {
    filters,
    filtersChanged: !deepEqual(filters, current.filters),
    scopeFilter,
    scopeFilterChanged: scopeFilter !== current.scopeFilter,
  };
}
