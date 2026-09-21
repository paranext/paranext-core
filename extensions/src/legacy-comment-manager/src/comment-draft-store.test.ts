// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@papi/frontend';
import { loadDrafts, pruneDrafts, saveDraftChanges, saveDrafts } from './comment-draft-store';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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

  it('logs a warning when a write fails, instead of failing silently', () => {
    // Without a log, a `QuotaExceededError` is an undiagnosable support case: in-memory state and
    // "Unsaved comments" still show the draft, and it is simply gone on restart with no trace of
    // why. This is a write-path failure specifically -- `setItem`, not `getItem` -- so it must not
    // be confused with the separate "unreadable stored value" cases covered above.
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('drops drafts whose thread no longer exists', () => {
    // Otherwise a deleted thread leaves an entry that makes "Unsaved comments" claim a draft the
    // user can never reach.
    const pruned = pruneDrafts({ t1: { assignedUser: 'Ana' }, gone: {} }, [
      { id: 't1', commentIds: [] },
    ]);
    expect(pruned).toEqual({ t1: { assignedUser: 'Ana' } });
  });

  it('drops a commentEdits entry whose comment no longer exists, even though its thread survives', () => {
    // A commentEdits entry is keyed by COMMENT id, not thread id -- pruning by thread id alone
    // can never reach it. A stranded entry makes the thread permanently read-only (the component
    // reads a draft for a comment that no longer renders), so this must be pruned the same way a
    // whole-thread draft is.
    const pruned = pruneDrafts(
      {
        t1: {
          assignedUser: 'Ana',
          commentEdits: { 'c1-still-here': { edited: true }, 'c2-deleted': { edited: true } },
        },
      },
      [{ id: 't1', commentIds: ['c1-still-here'] }],
    );
    expect(pruned).toEqual({
      t1: { assignedUser: 'Ana', commentEdits: { 'c1-still-here': { edited: true } } },
    });
  });

  it('drops commentEdits entirely once every edited comment in it is gone', () => {
    const pruned = pruneDrafts({ t1: { commentEdits: { 'c1-deleted': { edited: true } } } }, [
      { id: 't1', commentIds: [] },
    ]);
    expect(pruned).toEqual({ t1: {} });
  });

  it("merges a change onto what's currently stored instead of replacing the whole map", () => {
    // Simulates the two-views-on-one-project race Finding 10 describes: the panel already wrote a
    // draft for thread B (via its OWN saveDraftChanges call, modeled here directly against storage
    // since this test only needs the end state) that this writer's `changes` never mentions at all.
    saveDrafts(PROJECT, { t2: { assignedUser: 'Bea' } });
    saveDraftChanges(PROJECT, new Map([['t1', { assignedUser: 'Ana' }]]));
    expect(loadDrafts(PROJECT)).toEqual({
      t1: { assignedUser: 'Ana' },
      t2: { assignedUser: 'Bea' },
    });
  });

  it('lets a writer delete an entry it explicitly cleared without resurrecting an untouched one', () => {
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' }, t2: { assignedUser: 'Bea' } });
    // t1's draft was cleared (e.g. the reply box was emptied); t2 is never mentioned.
    saveDraftChanges(PROJECT, new Map([['t1', undefined]]));
    expect(loadDrafts(PROJECT)).toEqual({ t2: { assignedUser: 'Bea' } });
  });

  it('lets an explicit deletion win even over a concurrent write to the same key', () => {
    // The deletion rule from saveDraftChanges' doc: an explicit removal in `changes` always wins
    // over whatever the fresh read just found for that SAME key, since that key IS in `changes`.
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    // Something else wrote a fresh value for t1 between this writer's own load and its save.
    saveDrafts(PROJECT, { t1: { assignedUser: 'Someone else, concurrently' } });
    saveDraftChanges(PROJECT, new Map([['t1', undefined]]));
    expect(loadDrafts(PROJECT)).toEqual({});
  });

  it('removes the storage key entirely when a merge leaves nothing behind', () => {
    saveDrafts(PROJECT, { t1: { assignedUser: 'Ana' } });
    saveDraftChanges(PROJECT, new Map([['t1', undefined]]));
    expect(localStorage.getItem(`legacyCommentManager.drafts.${PROJECT}`)).toBeNull();
  });

  it('writes nothing for an empty change set', () => {
    saveDraftChanges(PROJECT, new Map());
    expect(localStorage.getItem(`legacyCommentManager.drafts.${PROJECT}`)).toBeNull();
  });

  it('logs a warning when a merge write fails, instead of failing silently', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    saveDraftChanges(PROJECT, new Map([['t1', { assignedUser: 'Ana' }]]));
    expect(logger.warn).toHaveBeenCalled();
  });

  it('leaves commentEdits untouched for a thread with no known comment-id list', () => {
    // A caller that cannot vouch for a thread's current comment ids (incomplete or stale data)
    // must not prune commentEdits for it -- an incorrect prune here permanently discards a
    // user's in-progress edit. Only the thread-id-level prune is safe unconditionally, because a
    // thread simply absent from `existingThreads` really has been deleted.
    const pruned = pruneDrafts(
      { t1: { commentEdits: { 'c1-unknown-status': { edited: true } } } },
      [{ id: 't1' }],
    );
    expect(pruned).toEqual({
      t1: { commentEdits: { 'c1-unknown-status': { edited: true } } },
    });
  });
});
