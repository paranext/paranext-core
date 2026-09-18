// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadFilterSelection, saveFilterSelection } from './comment-filter-store';
import { DEFAULT_COMMENT_FILTERS, DEFAULT_SCOPE_FILTER } from './comment-list-filters.model';

const PROJECT = 'proj-1';
const DEFAULTS = { preset: DEFAULT_COMMENT_FILTERS.preset, scopeFilter: DEFAULT_SCOPE_FILTER };

beforeEach(() => localStorage.clear());
// The "storage is unavailable" case below mocks Storage.prototype.getItem; without this, that mock
// would leak into every later test in the file and make them exercise the error path instead of
// their own.
afterEach(() => vi.restoreAllMocks());

describe('comment filter store', () => {
  it('round-trips a selection for a project', () => {
    saveFilterSelection(PROJECT, { preset: 'unread', scopeFilter: 'current-book' });
    expect(loadFilterSelection(PROJECT)).toEqual({ preset: 'unread', scopeFilter: 'current-book' });
  });

  it('keeps projects independent', () => {
    saveFilterSelection(PROJECT, { preset: 'unread', scopeFilter: 'current-book' });
    saveFilterSelection('proj-2', { preset: 'resolved', scopeFilter: 'current-verse' });
    expect(loadFilterSelection(PROJECT)).toEqual({ preset: 'unread', scopeFilter: 'current-book' });
  });

  it('returns the default view when nothing has been saved', () => {
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('returns the default view rather than throwing when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('returns the default view rather than throwing on malformed stored data', () => {
    localStorage.setItem(`legacyCommentManager.filters.${PROJECT}`, 'not json');
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('resolves a stored value this build does not recognize to the default view', () => {
    // A selection written by a newer build, or hand-edited. The panel must open on something
    // valid rather than carrying an unknown preset into the query.
    localStorage.setItem(
      `legacyCommentManager.filters.${PROJECT}`,
      JSON.stringify({ preset: 'from-a-newer-build', scopeFilter: 'also-unknown' }),
    );
    expect(loadFilterSelection(PROJECT)).toEqual(DEFAULTS);
  });

  it('keeps a recognized half of a partly-unrecognized selection', () => {
    localStorage.setItem(
      `legacyCommentManager.filters.${PROJECT}`,
      JSON.stringify({ preset: 'unread', scopeFilter: 'nonsense' }),
    );
    expect(loadFilterSelection(PROJECT)).toEqual({
      preset: 'unread',
      scopeFilter: DEFAULT_SCOPE_FILTER,
    });
  });
});
