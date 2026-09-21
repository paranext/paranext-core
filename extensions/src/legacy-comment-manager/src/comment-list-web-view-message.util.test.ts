import { describe, expect, it, vi } from 'vitest';
import type {
  CommentPreset,
  LegacyCommentFilters,
  ScopeFilter,
} from './comment-list-filters.model';
import { DEFAULT_COMMENT_FILTERS, DEFAULT_SCOPE_FILTER } from './comment-list-filters.model';
import { resolveSetFiltersMessage } from './comment-list-web-view-message.util';

// comment-list-filters.model.ts (imported transitively via resolveSetFiltersMessage) logs a warning
// when a legacy combination has no matching preset -- see presetFromLegacyAxes.
vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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

describe('resolveSetFiltersMessage — legacy shapes', () => {
  const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

  // Each row is the exact legacy-axes-to-preset mapping documented on LegacyCommentFilters (the
  // type declaration) and presetFromLegacyAxes (the implementation). Driven through
  // resolveSetFiltersMessage — the real `setFilters` web view message boundary — rather than by
  // calling the mapper directly.
  describe.each<[string, LegacyCommentFilters, CommentPreset]>([
    ['all axes all (out-of-repo caller sends the old "no filter" shape)', {}, 'all'],
    ['type: conflicts', { type: 'conflicts' }, 'conflict'],
    ['resolved: unresolved', { resolved: 'unresolved' }, 'unresolved'],
    ['read: unread', { read: 'unread' }, 'unread'],
    [
      'resolved: unresolved + read: unread',
      { resolved: 'unresolved', read: 'unread' },
      'unread-and-unresolved',
    ],
    ['resolved: resolved', { resolved: 'resolved' }, 'resolved'],
    [
      'resolved: unresolved + assignment: assigned-to-me',
      { resolved: 'unresolved', assignment: 'assigned-to-me' },
      'unresolved-assigned-to-me',
    ],
    [
      'read: unread + assignment: assigned-to-me',
      { read: 'unread', assignment: 'assigned-to-me' },
      'unread-assigned-to-me',
    ],
  ])('%s', (_description, legacyFilters, expectedPreset) => {
    it(`maps to the '${expectedPreset}' preset`, () => {
      const resolved = resolveSetFiltersMessage({ filters: legacyFilters }, current);
      expect(resolved.filters).toEqual({ preset: expectedPreset });
    });
  });

  // Combinations the new preset set dropped entirely, or that mix axes into a shape no preset
  // represents — each must fall back to 'all' rather than guess which axis to drop.
  describe.each<[string, LegacyCommentFilters]>([
    ["assignment: 'team' (dropped entirely by the new model)", { assignment: 'team' }],
    ["assignment: 'unassigned' (dropped entirely by the new model)", { assignment: 'unassigned' }],
    ["type: 'comments' (no preset excludes conflicts)", { type: 'comments' }],
    ['read: read (no preset for "only read")', { read: 'read' }],
    [
      'resolved: resolved + assignment: assigned-to-me (no two-way preset for this pair)',
      { resolved: 'resolved', assignment: 'assigned-to-me' },
    ],
    [
      'a three-way combination (unresolved + unread + assigned-to-me)',
      { resolved: 'unresolved', read: 'unread', assignment: 'assigned-to-me' },
    ],
  ])('%s', (_description, legacyFilters) => {
    it("falls back to the 'all' preset", () => {
      const resolved = resolveSetFiltersMessage({ filters: legacyFilters }, current);
      expect(resolved.filters).toEqual({ preset: 'all' });
    });
  });

  it("maps the legacy 'unfiltered' scope onto 'all-books', its exact replacement", () => {
    const resolved = resolveSetFiltersMessage({ scopeFilter: 'unfiltered' }, current);
    expect(resolved.scopeFilter).toBe('all-books');
  });

  it('still handles the new shape unchanged alongside a legacy filters payload', () => {
    // A legacy scope arriving with a current-model preset (a mixed but plausible real caller) must
    // resolve each independently rather than one axis contaminating the other.
    const resolved = resolveSetFiltersMessage(
      { filters: { preset: 'resolved' }, scopeFilter: 'unfiltered' },
      current,
    );
    expect(resolved.filters).toEqual({ preset: 'resolved' });
    expect(resolved.scopeFilter).toBe('all-books');
  });
});

describe('resolveSetFiltersMessage — unrecognized values', () => {
  const current = { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };

  it('resolves an unrecognized preset to the default instead of passing it through', () => {
    // Guards buildCommentThreadSelector's exhaustiveness check downstream, which throws
    // `Unhandled comment preset` on anything not in the CommentPreset union (see
    // comment-list.web-view.burst.test.tsx for the reproduction of that actual throw).
    const resolved = resolveSetFiltersMessage(
      // Simulating a malformed value crossing the message bus, which real callers aren't
      // restricted to the current union.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { filters: { preset: 'assigned-to-team' as CommentPreset } },
      current,
    );
    expect(resolved.filters).toEqual({ preset: 'all' });
  });

  it('resolves an unrecognized scope to the default instead of passing it through', () => {
    // Guards scopeFieldsUsed[scopeFilter] downstream, which throws a TypeError reading `.book` off
    // `undefined` for any key outside the ScopeFilter union (see comment-list.web-view.burst.test.tsx
    // for the reproduction of that actual throw).
    const resolved = resolveSetFiltersMessage(
      // Simulating a malformed value crossing the message bus, which real callers aren't
      // restricted to the current union.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { scopeFilter: 'not-a-real-scope' as ScopeFilter },
      current,
    );
    expect(resolved.scopeFilter).toBe('all-books');
  });
});
