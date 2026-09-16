import { describe, expect, it } from 'vitest';
import { DEFAULT_COMMENT_FILTERS, DEFAULT_SCOPE_FILTER } from './comment-list-filters.model';
import { resolveSetFiltersMessage } from './comment-list-web-view-message.util';

describe('resolveSetFiltersMessage', () => {
  it('reports no change when the incoming message already matches the current view', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

    const resolved = resolveSetFiltersMessage({}, current);

    // This is the observable that drives the churn: an equal-values message must not be treated as
    // a change, so a caller gating its setState calls on these flags never mints a new filters
    // object — the CommentThreads selector's identity-based useMemo stays stable.
    expect(resolved.filtersChanged).toBe(false);
    expect(resolved.scopeFilterChanged).toBe(false);
    // The resolved values are still the correct ones to have (an unchanged-but-passed value is not
    // the same claim as the caller being allowed to skip using it), just flagged as unchanged.
    expect(resolved.filters).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(resolved.scopeFilter).toBe(DEFAULT_SCOPE_FILTER);
  });

  it('reports no change for an explicit re-send of the exact current preset', () => {
    const current = {
      filters: { preset: 'unresolved' as const },
      scopeFilter: DEFAULT_SCOPE_FILTER,
    };

    const resolved = resolveSetFiltersMessage(
      { filters: { preset: 'unresolved' }, scopeFilter: DEFAULT_SCOPE_FILTER },
      current,
    );

    expect(resolved.filtersChanged).toBe(false);
    expect(resolved.scopeFilterChanged).toBe(false);
  });

  it('reports a filters change when the preset actually differs', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

    const resolved = resolveSetFiltersMessage({ filters: { preset: 'resolved' } }, current);

    expect(resolved.filtersChanged).toBe(true);
    expect(resolved.filters).toEqual({ preset: 'resolved' });
    // The scope wasn't touched by this message, so its computation must stay independent.
    expect(resolved.scopeFilterChanged).toBe(false);
  });

  it('reports a scope change when the scope actually differs', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

    const resolved = resolveSetFiltersMessage({ scopeFilter: 'current-chapter' }, current);

    expect(resolved.scopeFilterChanged).toBe(true);
    expect(resolved.scopeFilter).toBe('current-chapter');
    // The preset wasn't touched by this message, so its computation must stay independent.
    expect(resolved.filtersChanged).toBe(false);
  });

  it('treats an omitted scope as the default for comparison, not as "unchanged"', () => {
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: 'current-chapter' as const };

    const resolved = resolveSetFiltersMessage({}, current);

    // An omitted scope resets to the default (matching applyFilterOverrides/setFilters' documented
    // "sets the ENTIRE view deterministically" contract) — since that differs from the view's
    // current 'current-chapter', this IS a real change, not a no-op.
    expect(resolved.scopeFilterChanged).toBe(true);
    expect(resolved.scopeFilter).toBe(DEFAULT_SCOPE_FILTER);
  });

  it('treats an omitted preset as the default for comparison, not as "unchanged"', () => {
    const current = {
      filters: { preset: 'unresolved' as const },
      scopeFilter: DEFAULT_SCOPE_FILTER,
    };

    const resolved = resolveSetFiltersMessage({}, current);

    // Mirrors the scope case above: an omitted `filters` resets to the default preset via
    // applyFilterOverrides rather than leaving the view's current preset alone, so this is a real
    // change when the view is on a non-default preset.
    expect(resolved.filtersChanged).toBe(true);
    expect(resolved.filters).toEqual(DEFAULT_COMMENT_FILTERS);
  });

  it('resolves an omitted scope to the all-books default, never undefined, when only the preset is set', () => {
    // Pins the crash this function guards against: a setFilters message that narrows only the
    // preset (e.g. a Send/Receive conflict link) must still leave the view on a valid scope. The
    // 'conflict' preset is representative of that real caller but has no bearing on the scope
    // computation itself — any preset would exercise the same path.
    const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

    const resolved = resolveSetFiltersMessage({ filters: { preset: 'conflict' } }, current);

    expect(resolved.scopeFilter).toBe('all-books');
  });
});
