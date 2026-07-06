import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getLastOpenedProject, setLastOpenedProject } from './last-opened-project-cache';

const STORAGE_KEY = 'platform-bible.lastOpenedProject';

describe('last-opened-project-cache', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getLastOpenedProject', () => {
    it('returns undefined when storage key is absent', () => {
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined for malformed JSON', () => {
      localStorage.setItem(STORAGE_KEY, '{not valid json');
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when parsed value is not an object', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify('just-a-string'));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when parsed value is null', () => {
      // The cache may legitimately encounter a literal `null` written by a previous version of the
      // app; disable the no-null lint just for this fixture.
      // eslint-disable-next-line no-null/no-null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(null));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when id is missing', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: 'Some Name' }));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when id is empty string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '', name: 'Some Name' }));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when id is not a string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 42, name: 'Some Name' }));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns { id, name } when both are valid non-empty strings', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'proj-1', name: 'My Project' }));
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: 'My Project' });
    });

    it('returns { id } (name undefined) when name is missing', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'proj-1' }));
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: undefined });
    });

    it('returns { id } (name undefined) when name is empty string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'proj-1', name: '' }));
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: undefined });
    });

    it('returns { id } (name undefined) when name is not a string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'proj-1', name: 123 }));
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: undefined });
    });

    it('swallows localStorage read errors and returns undefined', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('boom');
      });
      expect(getLastOpenedProject()).toBeUndefined();
    });
  });

  describe('setLastOpenedProject', () => {
    it('writes id+name to storage under the expected key', () => {
      setLastOpenedProject({ id: 'proj-1', name: 'My Project' });
      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw ?? '{}')).toEqual({ id: 'proj-1', name: 'My Project' });
    });

    it('writes id when name is omitted', () => {
      setLastOpenedProject({ id: 'proj-1' });
      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw ?? '{}')).toEqual({ id: 'proj-1' });
    });

    it('no-ops when id is empty', () => {
      setLastOpenedProject({ id: '', name: 'My Project' });
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('swallows localStorage write errors silently', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });
      expect(() => setLastOpenedProject({ id: 'proj-1', name: 'My Project' })).not.toThrow();
    });
  });

  describe('round-trip', () => {
    it('set → get returns the same shape (id + name)', () => {
      setLastOpenedProject({ id: 'proj-1', name: 'My Project' });
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: 'My Project' });
    });

    it('set with only id → get returns { id, name: undefined }', () => {
      setLastOpenedProject({ id: 'proj-1' });
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1', name: undefined });
    });
  });
});
