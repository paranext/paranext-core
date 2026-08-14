import { describe, expect, it } from 'vitest';
import { DEFAULT_COMMENT_FILTERS, UNFILTERED } from './comment-list-filters.model';
import { resolveSetFiltersMessage } from './comment-list-web-view-message.util';

describe('resolveSetFiltersMessage', () => {
  it('reports no change when the incoming message already matches the current view', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: UNFILTERED };

    const resolved = resolveSetFiltersMessage({}, current);

    // This is the observable that drives the churn: an equal-values message must not be treated as
    // a change, so a caller gating its setState calls on these flags never mints a new filters
    // object — the CommentThreads selector's identity-based useMemo stays stable.
    expect(resolved.filtersChanged).toBe(false);
    expect(resolved.scopeFilterChanged).toBe(false);
    // The resolved values are still the correct ones to have (an unchanged-but-passed value is not
    // the same claim as the caller being allowed to skip using it), just flagged as unchanged.
    expect(resolved.filters).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(resolved.scopeFilter).toBe(UNFILTERED);
  });

  it('reports no change for an explicit re-send of the exact current axes', () => {
    const current = {
      filters: { ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved' as const },
      scopeFilter: UNFILTERED,
    };

    const resolved = resolveSetFiltersMessage(
      { filters: { resolved: 'unresolved' }, scopeFilter: UNFILTERED },
      current,
    );

    expect(resolved.filtersChanged).toBe(false);
    expect(resolved.scopeFilterChanged).toBe(false);
  });

  it('reports a filters change when an axis actually differs', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: UNFILTERED };

    const resolved = resolveSetFiltersMessage({ filters: { resolved: 'resolved' } }, current);

    expect(resolved.filtersChanged).toBe(true);
    expect(resolved.filters).toEqual({ ...DEFAULT_COMMENT_FILTERS, resolved: 'resolved' });
  });

  it('reports a scope change when the scope actually differs', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: UNFILTERED };

    const resolved = resolveSetFiltersMessage({ scopeFilter: 'current-chapter' }, current);

    expect(resolved.scopeFilterChanged).toBe(true);
    expect(resolved.scopeFilter).toBe('current-chapter');
  });

  it('treats an omitted scope as UNFILTERED for comparison, not as "unchanged"', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: 'current-chapter' as const };

    const resolved = resolveSetFiltersMessage({}, current);

    // An omitted scope resets to UNFILTERED (matching applyFilterOverrides/setFilters' documented
    // "sets the ENTIRE view deterministically" contract) — since that differs from the view's
    // current 'current-chapter', this IS a real change, not a no-op.
    expect(resolved.scopeFilterChanged).toBe(true);
    expect(resolved.scopeFilter).toBe(UNFILTERED);
  });
});
