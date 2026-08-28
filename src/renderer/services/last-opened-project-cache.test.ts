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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when id is empty string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '' }));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns undefined when id is not a string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 42 }));
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('returns { id } when id is a valid non-empty string', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'proj-1' }));
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1' });
    });

    it('swallows localStorage read errors and returns undefined', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('boom');
      });
      expect(getLastOpenedProject()).toBeUndefined();
    });

    it('ignores unrecognized keys left over from an older cache shape (e.g. isEditable, name)', () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ id: 'proj-1', isEditable: false, name: 'Some Name' }),
      );
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1' });
    });
  });

  describe('setLastOpenedProject', () => {
    it('writes id to storage under the expected key', () => {
      setLastOpenedProject({ id: 'proj-1' });
      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw ?? '{}')).toEqual({ id: 'proj-1' });
    });

    it('no-ops when id is empty', () => {
      setLastOpenedProject({ id: '' });
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('swallows localStorage write errors silently', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });
      expect(() => setLastOpenedProject({ id: 'proj-1' })).not.toThrow();
    });
  });

  describe('round-trip', () => {
    it('set → get returns the same shape', () => {
      setLastOpenedProject({ id: 'proj-1' });
      expect(getLastOpenedProject()).toEqual({ id: 'proj-1' });
    });
  });
});
