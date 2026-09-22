import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@papi/frontend';
import type { CommentFilters, CommentPreset, ScopeFilter } from './comment-list-filters.model';
import {
  applyFilterOverrides,
  buildCommentThreadSelector,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
  isShowingAllThreads,
  presetNeedsFrozenReadMembership,
  presetRequiresCurrentUser,
  presetToLabelKey,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const scrRef = { book: 'GEN', chapterNum: 3, verseNum: 5 };

function build(preset: CommentPreset, scopeFilter: ScopeFilter = DEFAULT_SCOPE_FILTER) {
  return buildCommentThreadSelector({
    filters: { preset },
    scopeFilter,
    scrRef,
    currentUserName: 'Donna',
  });
}

describe('presets', () => {
  it('contributes nothing at its default', () => {
    expect(DEFAULT_COMMENT_FILTERS).toEqual({ preset: 'all' });
    expect(build('all')).toEqual({});
  });

  describe.each<[CommentPreset, ReturnType<typeof build>]>([
    ['unresolved', { isResolved: false }],
    ['resolved', { isResolved: true }],
    ['unread-and-unresolved', { isResolved: false }],
    ['conflict', { type: 'Conflict' }],
    ['unresolved-assigned-to-me', { isResolved: false, assignedTo: 'Donna' }],
    ['unread-assigned-to-me', { assignedTo: 'Donna' }],
  ])('%s', (preset, expected) => {
    it(`maps to ${JSON.stringify(expected)}`, () => {
      expect(build(preset)).toEqual(expected);
    });
  });

  it('contributes no selector clause for the unsaved preset', () => {
    // A draft is client-side state; the provider cannot filter on it. The query must therefore be
    // unnarrowed by the preset, leaving the caller to apply the draft rule itself.
    expect(build('unsaved')).toEqual({});
  });

  it('never sends isRead to the provider, for any preset', () => {
    // A thread marked read (the auto-read timer, ~5 seconds after selection) must not leave the
    // query result mid-visit -- every unread-family preset narrows by read state client-side
    // instead (see presetNeedsFrozenReadMembership), so isRead must never reach the selector.
    Object.keys(presetToLabelKey)
      .filter(isCommentPreset)
      .forEach((preset) => {
        expect(build(preset)).not.toHaveProperty('isRead');
      });
  });

  it('maps every preset in the label map, with only all, unread and unsaved unnarrowed', () => {
    // Iterates the union rather than a hand-listed set, so a preset added later is exercised here
    // without anyone remembering to add a case.
    const unnarrowed = Object.keys(presetToLabelKey)
      .filter(isCommentPreset)
      .filter((preset) => Object.keys(build(preset)).length === 0);

    expect(unnarrowed.sort()).toEqual(['all', 'unread', 'unsaved']);
  });

  it('omits assignedTo until the current user name has loaded', () => {
    // An empty assignedTo means "unassigned" to the provider, so filtering on a blank name would
    // silently show the wrong threads rather than none.
    const selector = buildCommentThreadSelector({
      filters: { preset: 'unresolved-assigned-to-me' },
      scopeFilter: DEFAULT_SCOPE_FILTER,
      scrRef,
      currentUserName: '',
    });
    expect(selector).toEqual({ isResolved: false });
  });

  it('has a label key for every preset and rejects anything else', () => {
    expect(Object.keys(presetToLabelKey).every(isCommentPreset)).toBe(true);
    expect(isCommentPreset('unread')).toBe(true);
    expect(isCommentPreset('assigned-to-team')).toBe(false);
  });
});

describe('applyFilterOverrides — legacy axis mapping', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('narrows type: conflicts + another active axis onto conflict, not all', () => {
    // The Send/Receive "unresolved conflicts" view: falling back to 'all' would drop the conflict
    // constraint entirely and show the complete unfiltered list, the opposite of what was asked.
    expect(applyFilterOverrides({ type: 'conflicts', resolved: 'unresolved' })).toEqual({
      preset: 'conflict',
    });
  });

  it('logs a warning naming the combination when narrowing an unmatched conflicts combination', () => {
    applyFilterOverrides({ type: 'conflicts', resolved: 'unresolved' });
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('unresolved|all|conflicts|all'),
    );
  });

  it('still maps the exact all|all|conflicts|all row onto conflict without logging', () => {
    expect(applyFilterOverrides({ type: 'conflicts' })).toEqual({ preset: 'conflict' });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('logs a warning naming the combination when a legacy combination widens to all', () => {
    // 'team' assignment has no counterpart in the new preset model at all.
    applyFilterOverrides({ assignment: 'team' });
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('all|all|all|team'));
  });

  it('does not log for an exactly-matched legacy combination', () => {
    applyFilterOverrides({ resolved: 'unresolved' });
    expect(logger.warn).not.toHaveBeenCalled();
  });
});

describe('presetRequiresCurrentUser', () => {
  it('has an entry for every preset, and flags only the two assigned-to-me presets', () => {
    const flagged = Object.entries(presetRequiresCurrentUser)
      .filter(([, requiresUser]) => requiresUser)
      .map(([preset]) => preset)
      .sort();
    expect(flagged).toEqual(['unread-assigned-to-me', 'unresolved-assigned-to-me']);
  });
});

describe('presetNeedsFrozenReadMembership', () => {
  it('has an entry for every preset, and flags exactly the three unread presets', () => {
    const flagged = Object.entries(presetNeedsFrozenReadMembership)
      .filter(([, needsFrozenMembership]) => needsFrozenMembership)
      .map(([preset]) => preset)
      .sort();
    expect(flagged).toEqual(['unread', 'unread-and-unresolved', 'unread-assigned-to-me']);
  });
});

describe('applyFilterOverrides', () => {
  it.each<[string, unknown]>([
    ['a string', 'unresolved'],
    ['a number', 5],
  ])(
    'falls back to the default instead of throwing when overrides is a truthy non-object primitive (%s)',
    (_description, malformed) => {
      // Malformed input can cross the command/message bus as any truthy primitive, not just an
      // object shape. `'preset' in overrides` throws a TypeError on a string or number operand, so
      // this is exactly the input the function exists to absorb.
      // JSON.parse-derived bus input is typed `any`; asserting it onto the parameter's declared
      // shape here so the reproduction case can be expressed at all.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const overrides = malformed as Partial<CommentFilters>;
      expect(() => applyFilterOverrides(overrides)).not.toThrow();
      expect(applyFilterOverrides(overrides)).toEqual(DEFAULT_COMMENT_FILTERS);
    },
  );
});

describe('scope', () => {
  it('contributes nothing at its default', () => {
    expect(DEFAULT_SCOPE_FILTER).toBe('all-books');
    expect(build('all', 'all-books')).toEqual({});
  });

  it('maps each scope to a range at the matching granularity', () => {
    const at = (scope: ScopeFilter) => build('all', scope).scriptureRanges?.[0];
    expect(at('current-book')).toEqual({
      granularity: 'book',
      start: scrRef,
      end: scrRef,
    });
    expect(at('current-chapter')?.granularity).toBe('chapter');
    expect(at('current-verse')?.granularity).toBe('verse');
  });

  it('combines independently with a preset', () => {
    expect(build('unresolved', 'current-verse')).toEqual({
      isResolved: false,
      scriptureRanges: [{ granularity: 'verse', start: scrRef, end: scrRef }],
    });
  });

  it('has a label key for every scope and rejects anything else', () => {
    expect(Object.keys(scopeFilterToLabelKey).every(isScopeFilter)).toBe(true);
    expect(isScopeFilter('current-verse')).toBe(true);
    expect(isScopeFilter('unfiltered')).toBe(false);
  });
});

describe('isShowingAllThreads', () => {
  it('is true only when both the preset and the scope are at their defaults', () => {
    expect(
      isShowingAllThreads({ filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER }),
    ).toBe(true);
  });

  it('is false when the preset narrows the view, even at the default scope', () => {
    expect(
      isShowingAllThreads({
        filters: { preset: 'unresolved' },
        scopeFilter: DEFAULT_SCOPE_FILTER,
      }),
    ).toBe(false);
  });

  it('is false when the scope narrows the view, even at the default preset', () => {
    expect(
      isShowingAllThreads({ filters: DEFAULT_COMMENT_FILTERS, scopeFilter: 'current-chapter' }),
    ).toBe(false);
  });

  it('is false when both axes narrow the view', () => {
    expect(
      isShowingAllThreads({ filters: { preset: 'resolved' }, scopeFilter: 'current-verse' }),
    ).toBe(false);
  });
});
