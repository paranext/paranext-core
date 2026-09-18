import type {
  CommentFilters,
  LegacyCommentFilters,
  LegacyScopeFilter,
  ScopeFilter,
} from 'legacy-comment-manager';
import { deepEqual } from 'platform-bible-utils';
import { applyFilterOverrides, resolveScopeFilter } from './comment-list-filters.model';

/** The filters/scope a comment list web view currently has applied. */
export type CurrentCommentListView = {
  filters: CommentFilters;
  scopeFilter: ScopeFilter;
};

/**
 * Resolves what a `setFilters` web view message should apply, and whether the preset and/or scope
 * actually change relative to the view's current state.
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
 *
 * `message.filters`/`message.scopeFilter` also accept the deprecated legacy shapes
 * ({@link LegacyCommentFilters}, {@link LegacyScopeFilter}) for backward compatibility with
 * out-of-repo senders; `applyFilterOverrides`/`resolveScopeFilter` map both onto the current model
 * and normalize anything unrecognized to its default, so this function never passes an invalid
 * preset or scope through to the caller.
 */
export function resolveSetFiltersMessage(
  message: {
    filters?: Partial<CommentFilters> | LegacyCommentFilters;
    scopeFilter?: ScopeFilter | LegacyScopeFilter;
  },
  current: CurrentCommentListView,
): {
  filters: CommentFilters;
  filtersChanged: boolean;
  scopeFilter: ScopeFilter;
  scopeFilterChanged: boolean;
} {
  const filters = applyFilterOverrides(message.filters);
  const scopeFilter = resolveScopeFilter(message.scopeFilter);
  return {
    filters,
    filtersChanged: !deepEqual(filters, current.filters),
    scopeFilter,
    scopeFilterChanged: scopeFilter !== current.scopeFilter,
  };
}
