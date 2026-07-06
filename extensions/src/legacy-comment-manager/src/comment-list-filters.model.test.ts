import { describe, expect, it } from 'vitest';
import {
  buildCommentThreadSelector,
  FILTER_CONFLICTS,
  FILTER_UNREAD_ASSIGNED,
  FILTER_UNRESOLVED_ASSIGNED,
  FILTER_UNRESOLVED_CONFLICTS,
  isCommentFilter,
  SCOPE_FILTER_CURRENT_CHAPTER,
  UNFILTERED,
} from './comment-list-filters.model';

const scrRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

describe('buildCommentThreadSelector', () => {
  it('returns an empty selector when unfiltered', () => {
    expect(
      buildCommentThreadSelector({
        commentFilter: UNFILTERED,
        scopeFilter: UNFILTERED,
        scrRef,
        currentUserName: 'Donna',
      }),
    ).toEqual({});
  });

  it('maps conflicts to a conflict-type query, any status', () => {
    expect(
      buildCommentThreadSelector({
        commentFilter: FILTER_CONFLICTS,
        scopeFilter: UNFILTERED,
        scrRef,
        currentUserName: 'Donna',
      }),
    ).toEqual({ type: 'Conflict' });
  });

  it('maps unresolved-conflicts to a conflict-type, not-resolved query', () => {
    expect(
      buildCommentThreadSelector({
        commentFilter: FILTER_UNRESOLVED_CONFLICTS,
        scopeFilter: UNFILTERED,
        scrRef,
        currentUserName: 'Donna',
      }),
    ).toEqual({ type: 'Conflict', isResolved: false });
  });

  it('composes unresolved-conflicts with the current-chapter scope', () => {
    const selector = buildCommentThreadSelector({
      commentFilter: FILTER_UNRESOLVED_CONFLICTS,
      scopeFilter: SCOPE_FILTER_CURRENT_CHAPTER,
      scrRef,
      currentUserName: 'Donna',
    });
    expect(selector.type).toBe('Conflict');
    expect(selector.isResolved).toBe(false);
    expect(selector.scriptureRanges).toEqual([
      {
        granularity: 'chapter',
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      },
    ]);
  });

  it('keeps the existing assigned-to-me mappings unchanged', () => {
    expect(
      buildCommentThreadSelector({
        commentFilter: FILTER_UNRESOLVED_ASSIGNED,
        scopeFilter: UNFILTERED,
        scrRef,
        currentUserName: 'Donna',
      }),
    ).toEqual({ status: 'Todo', assignedTo: 'Donna' });
    expect(
      buildCommentThreadSelector({
        commentFilter: FILTER_UNREAD_ASSIGNED,
        scopeFilter: UNFILTERED,
        scrRef,
        currentUserName: 'Donna',
      }),
    ).toEqual({ isRead: false, assignedTo: 'Donna' });
  });
});

describe('isCommentFilter', () => {
  it('accepts the conflict filter values', () => {
    expect(isCommentFilter(FILTER_CONFLICTS)).toBe(true);
    expect(isCommentFilter(FILTER_UNRESOLVED_CONFLICTS)).toBe(true);
  });

  it('rejects unknown values', () => {
    expect(isCommentFilter('bogus')).toBe(false);
  });
});
