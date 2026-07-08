import { describe, expect, it } from 'vitest';
import type { CommentFilters, ScopeFilter } from './comment-list-filters.model';
import {
  applyFilterOverrides,
  buildCommentThreadSelector,
  DEFAULT_COMMENT_FILTERS,
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

describe('isTypeFilter', () => {
  it('accepts known type values and rejects unknown ones', () => {
    expect(isTypeFilter('all')).toBe(true);
    expect(isTypeFilter('conflicts')).toBe(true);
    expect(isTypeFilter('comments')).toBe(true);
    expect(isTypeFilter('bogus')).toBe(false);
  });
});
