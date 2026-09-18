// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadDrafts, pruneDrafts, saveDrafts } from './comment-draft-store';

const PROJECT = 'proj-1';

beforeEach(() => localStorage.clear());

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

  it('drops drafts whose thread no longer exists', () => {
    // Otherwise a deleted thread leaves an entry that makes "Unsaved comments" claim a draft the
    // user can never reach.
    const pruned = pruneDrafts({ t1: { assignedUser: 'Ana' }, gone: {} }, ['t1']);
    expect(pruned).toEqual({ t1: { assignedUser: 'Ana' } });
  });
});
