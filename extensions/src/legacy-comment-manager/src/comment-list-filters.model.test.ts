import { describe, expect, it } from 'vitest';
import type { CommentFilters, ScopeFilter } from './comment-list-filters.model';
import {
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

describe('isTypeFilter', () => {
  it('accepts known type values and rejects unknown ones', () => {
    expect(isTypeFilter('all')).toBe(true);
    expect(isTypeFilter('conflicts')).toBe(true);
    expect(isTypeFilter('comments')).toBe(true);
    expect(isTypeFilter('bogus')).toBe(false);
  });
});
