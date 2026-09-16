import { describe, expect, it } from 'vitest';
import type { CommentPreset, ScopeFilter } from './comment-list-filters.model';
import {
  buildCommentThreadSelector,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
  presetToLabelKey,
  scopeFilterToLabelKey,
} from './comment-list-filters.model';

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

  it('maps each preset to its selector clauses', () => {
    expect(build('unresolved')).toEqual({ isResolved: false });
    expect(build('resolved')).toEqual({ isResolved: true });
    expect(build('unread')).toEqual({ isRead: false });
    expect(build('unread-and-unresolved')).toEqual({ isRead: false, isResolved: false });
    expect(build('conflict')).toEqual({ type: 'Conflict' });
    expect(build('unresolved-assigned-to-me')).toEqual({
      isResolved: false,
      assignedTo: 'Donna',
    });
    expect(build('unread-assigned-to-me')).toEqual({ isRead: false, assignedTo: 'Donna' });
  });

  it('contributes no selector clause for the unsaved preset', () => {
    // A draft is client-side state; the provider cannot filter on it. The query must therefore be
    // unnarrowed by the preset, leaving the caller to apply the draft rule itself.
    expect(build('unsaved')).toEqual({});
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
