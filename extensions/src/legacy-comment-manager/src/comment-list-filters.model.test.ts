import { describe, expect, it } from 'vitest';
import type { CommentFilters, ScopeFilter } from './comment-list-filters.model';
import {
  areCommentFiltersAtDefault,
  applyFilterOverrides,
  buildCommentThreadSelector,
  DEFAULT_COMMENT_FILTERS,
  isAssignmentFilter,
  isReadFilter,
  isResolvedFilter,
  isScopeFilter,
  isTypeFilter,
  SCOPE_FILTER_CURRENT_CHAPTER,
  UNFILTERED,
} from './comment-list-filters.model';

const scrRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

function build(overrides: Partial<CommentFilters>, scopeFilter: ScopeFilter = UNFILTERED) {
  return buildCommentThreadSelector({
    filters: { ...DEFAULT_COMMENT_FILTERS, ...overrides },
    scopeFilter,
    scrRef,
    currentUserName: 'Donna',
  });
}

describe('buildCommentThreadSelector', () => {
  it('returns an empty selector when every axis is "all" and scope is unfiltered', () => {
    expect(build({})).toEqual({});
  });

  it('maps each axis to its own selector clause', () => {
    expect(build({ resolved: 'unresolved' })).toEqual({ isResolved: false });
    expect(build({ resolved: 'resolved' })).toEqual({ isResolved: true });
    expect(build({ read: 'unread' })).toEqual({ isRead: false });
    expect(build({ read: 'read' })).toEqual({ isRead: true });
    expect(build({ type: 'conflicts' })).toEqual({ type: 'Conflict' });
    expect(build({ type: 'comments' })).toEqual({ type: 'Normal' });
    expect(build({ assignment: 'assigned-to-me' })).toEqual({ assignedTo: 'Donna' });
    expect(build({ assignment: 'team' })).toEqual({ assignedTo: 'Team' });
    expect(build({ assignment: 'unassigned' })).toEqual({ assignedTo: '' });
  });

  it('holds the assigned-to-me filter until the current user name has loaded', () => {
    // While the name is still empty we must not emit assignedTo:'' — that now means UNASSIGNED_USER
    // ("unassigned"), so we'd query the wrong threads. The web view shows a loading state instead.
    const selector = buildCommentThreadSelector({
      filters: { ...DEFAULT_COMMENT_FILTERS, assignment: 'assigned-to-me' },
      scopeFilter: UNFILTERED,
      scrRef,
      currentUserName: '',
    });
    expect(selector).toEqual({});
  });

  it('ANDs axes together — the PT-4027 unresolved-conflicts view', () => {
    expect(build({ type: 'conflicts', resolved: 'unresolved' })).toEqual({
      type: 'Conflict',
      isResolved: false,
    });
  });

  it('reaches the old "unresolved assigned to me" preset by composition', () => {
    expect(build({ resolved: 'unresolved', assignment: 'assigned-to-me' })).toEqual({
      isResolved: false,
      assignedTo: 'Donna',
    });
  });

  it('composes filters with the current-chapter scope', () => {
    const selector = build({ resolved: 'unresolved' }, SCOPE_FILTER_CURRENT_CHAPTER);
    expect(selector.isResolved).toBe(false);
    expect(selector.scriptureRanges).toEqual([
      {
        granularity: 'chapter',
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      },
    ]);
  });
});

// Each axis type-guard should accept exactly its own label-key values and reject anything else. A
// typo in one of the `*ToLabelKey` maps would surface as a guard no longer accepting a known value.
const guardCases: [string, (value: string) => boolean, string[]][] = [
  ['isScopeFilter', isScopeFilter, ['current-chapter', 'unfiltered']],
  ['isResolvedFilter', isResolvedFilter, ['all', 'unresolved', 'resolved']],
  ['isReadFilter', isReadFilter, ['all', 'unread', 'read']],
  ['isTypeFilter', isTypeFilter, ['all', 'conflicts', 'comments']],
  ['isAssignmentFilter', isAssignmentFilter, ['all', 'assigned-to-me', 'team', 'unassigned']],
];

describe.each(guardCases)('%s', (_name, guard, validValues) => {
  it('accepts its known values', () => {
    validValues.forEach((value) => expect(guard(value)).toBe(true));
  });

  it('rejects unknown values', () => {
    expect(guard('bogus')).toBe(false);
    expect(guard('')).toBe(false);
  });
});

describe('areCommentFiltersAtDefault', () => {
  it('is true when every axis is at its "all" default', () => {
    expect(areCommentFiltersAtDefault(DEFAULT_COMMENT_FILTERS)).toBe(true);
  });

  it('is false when any axis is not "all"', () => {
    expect(areCommentFiltersAtDefault({ ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved' })).toBe(
      false,
    );
    expect(areCommentFiltersAtDefault({ ...DEFAULT_COMMENT_FILTERS, assignment: 'team' })).toBe(
      false,
    );
  });
});

describe('applyFilterOverrides', () => {
  it('returns the defaults when given no overrides', () => {
    expect(applyFilterOverrides()).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(applyFilterOverrides(undefined)).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(applyFilterOverrides({})).toEqual(DEFAULT_COMMENT_FILTERS);
  });

  it('applies the given axes over the defaults', () => {
    expect(applyFilterOverrides({ type: 'conflicts', resolved: 'unresolved' })).toEqual({
      resolved: 'unresolved',
      read: 'all',
      type: 'conflicts',
      assignment: 'all',
    });
  });

  it('resets unspecified axes to "all" rather than merging with a prior selection', () => {
    // The whole point: overrides are applied onto DEFAULT, not onto the caller's current filters,
    // so a programmatic open shows exactly the requested view.
    expect(applyFilterOverrides({ read: 'unread' })).toEqual({
      resolved: 'all',
      read: 'unread',
      type: 'all',
      assignment: 'all',
    });
  });

  it('does not mutate DEFAULT_COMMENT_FILTERS', () => {
    applyFilterOverrides({ type: 'conflicts' });
    expect(DEFAULT_COMMENT_FILTERS.type).toBe('all');
  });
});
