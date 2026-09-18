// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadDrafts, pruneDrafts, saveDrafts } from './comment-draft-store';

const PROJECT = 'proj-1';

beforeEach(() => localStorage.clear());
// The "storage is unavailable" case below mocks Storage.prototype.getItem; without this, that mock
// would leak into every later test in the file and make them exercise the error path instead of
// their own.
afterEach(() => vi.restoreAllMocks());

describe('comment draft store', () => {
  it('round-trips drafts for a project', () => {
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    expect(loadDrafts(PROJECT)).toEqual({ t1: { assignedUser: 'Ana' } });
  });

  it('keeps projects independent', () => {
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    saveDrafts('proj-2', { t9: { assignedUser: 'Ian' } });
    expect(loadDrafts(PROJECT)).toEqual({ t1: { assignedUser: 'Ana' } });
  });

  it('returns no drafts rather than throwing when storage is unavailable', () => {
    // localStorage throws outright in a sandboxed context; the panel must still render.
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it('returns no drafts rather than throwing on malformed stored data', () => {
    localStorage.setItem(`legacyCommentManager.drafts.${PROJECT}`, 'not json');
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it.each([
    ['null', 'null'],
    ['a number', '5'],
    ['an array', '[1,2]'],
    ['a string', '"hello"'],
  ])('returns no drafts when the stored value is %s rather than a map', (_label, stored) => {
    // Valid JSON that is not a map of drafts. `null` is the dangerous one: it parses cleanly and
    // every caller iterates the result, so handing it back crashes the panel on open, and the bad
    // value stays in storage to crash it again next time.
    localStorage.setItem(`legacyCommentManager.drafts.${PROJECT}`, stored);
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it('removes the storage key entirely when saving an empty map, rather than writing "{}"', () => {
    // Pins the deliberate `removeItem` branch in saveDrafts: asserting `loadDrafts` returns `{}`
    // would pass just as well for a stray `setItem(key, '{}')`, since loading a literal "{}" also
    // parses back to an empty object. Checking the key's absence is the only way to tell them apart.
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    saveDrafts(PROJECT, {});
    expect(localStorage.getItem(`legacyCommentManager.drafts.${PROJECT}`)).toBeNull();
  });

  it('drops drafts whose thread no longer exists', () => {
    // Otherwise a deleted thread leaves an entry that makes "Unsaved comments" claim a draft the
    // user can never reach.
    const pruned = pruneDrafts({ t1: { assignedUser: 'Ana' }, gone: {} }, ['t1']);
    expect(pruned).toEqual({ t1: { assignedUser: 'Ana' } });
  });
});
