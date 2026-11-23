import { describe, it, expect, vi } from 'vitest';
import {
  FindHistoryDataProviderEngine,
  FindHistoryUserStorage,
  MAX_FIND_HISTORY_ITEMS,
} from './find-history.data-provider';

/** Creates an engine backed by an in-memory store so tests exercise real read/write round trips */
function createTestEngine(initialData: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initialData));
  const storage: FindHistoryUserStorage = {
    readUserData: vi.fn(async (key: string) => store.get(key)),
    writeUserData: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
  };
  const engine = new FindHistoryDataProviderEngine(storage);
  return { engine, storage, store };
}

describe('FindHistoryDataProviderEngine', () => {
  describe('getHistory', () => {
    it('returns an empty array when nothing is stored', async () => {
      const { engine } = createTestEngine();

      expect(await engine.getHistory('proj1')).toEqual([]);
    });

    it('returns the stored history for a project', async () => {
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(['grace', 'faith']),
      });

      expect(await engine.getHistory('proj1')).toEqual(['grace', 'faith']);
    });

    it('keeps history for different projects separate', async () => {
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(['grace']),
        findRecentSearches_proj2: JSON.stringify(['love']),
      });

      expect(await engine.getHistory('proj1')).toEqual(['grace']);
      expect(await engine.getHistory('proj2')).toEqual(['love']);
    });

    it('uses a shared key when no project id is provided', async () => {
      const { engine } = createTestEngine({
        findRecentSearches: JSON.stringify(['shared']),
      });

      expect(await engine.getHistory(undefined)).toEqual(['shared']);
    });

    it('returns an empty array when stored data is invalid JSON', async () => {
      const { engine } = createTestEngine({ findRecentSearches_proj1: 'not json' });

      expect(await engine.getHistory('proj1')).toEqual([]);
    });

    it('returns an empty array when stored data is not an array of strings', async () => {
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify([1, 2, 3]),
      });

      expect(await engine.getHistory('proj1')).toEqual([]);
    });

    it('returns an empty array when reading storage throws', async () => {
      const { engine, storage } = createTestEngine();
      vi.mocked(storage.readUserData).mockRejectedValue(new Error('no data'));

      expect(await engine.getHistory('proj1')).toEqual([]);
    });
  });

  describe('setHistory', () => {
    it('writes the history and reports an update for the data type', async () => {
      const { engine, store } = createTestEngine();

      const updateInstructions = await engine.setHistory('proj1', ['grace']);

      expect(store.get('findRecentSearches_proj1')).toBe(JSON.stringify(['grace']));
      expect(updateInstructions).toBe(true);
    });
  });

  describe('addHistoryItem', () => {
    it('prepends a new item to the existing history', async () => {
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(['faith']),
      });

      await engine.addHistoryItem('grace', 'proj1');

      expect(await engine.getHistory('proj1')).toEqual(['grace', 'faith']);
    });

    it('moves an existing item to the top instead of duplicating it', async () => {
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(['faith', 'grace', 'love']),
      });

      await engine.addHistoryItem('grace', 'proj1');

      expect(await engine.getHistory('proj1')).toEqual(['grace', 'faith', 'love']);
    });

    it('caps the history at the maximum number of items', async () => {
      const oldItems = Array.from({ length: MAX_FIND_HISTORY_ITEMS }, (_, i) => `term${i}`);
      const { engine } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(oldItems),
      });

      await engine.addHistoryItem('newest', 'proj1');

      const history = await engine.getHistory('proj1');
      expect(history).toHaveLength(MAX_FIND_HISTORY_ITEMS);
      expect(history[0]).toBe('newest');
      // The oldest item fell off the end
      expect(history).not.toContain(`term${MAX_FIND_HISTORY_ITEMS - 1}`);
    });

    it('does nothing when the item is an empty string', async () => {
      const { engine, storage } = createTestEngine({
        findRecentSearches_proj1: JSON.stringify(['faith']),
      });

      await engine.addHistoryItem('', 'proj1');

      expect(storage.writeUserData).not.toHaveBeenCalled();
      expect(await engine.getHistory('proj1')).toEqual(['faith']);
    });
  });

  describe('getLastSearchTerm', () => {
    it('returns an empty string when nothing is stored', async () => {
      const { engine } = createTestEngine();

      expect(await engine.getLastSearchTerm('proj1')).toBe('');
    });

    it('returns the stored term for a project', async () => {
      const { engine } = createTestEngine({ findLastSearchTerm_proj1: 'grace' });

      expect(await engine.getLastSearchTerm('proj1')).toBe('grace');
    });

    it('returns an empty string when reading storage throws', async () => {
      const { engine, storage } = createTestEngine();
      vi.mocked(storage.readUserData).mockRejectedValue(new Error('no data'));

      expect(await engine.getLastSearchTerm('proj1')).toBe('');
    });
  });

  describe('setLastSearchTerm', () => {
    it('writes the term and reports an update for the data type', async () => {
      const { engine, store } = createTestEngine();

      const updateInstructions = await engine.setLastSearchTerm('proj1', 'grace');

      expect(store.get('findLastSearchTerm_proj1')).toBe('grace');
      expect(updateInstructions).toBe(true);
    });

    it('uses a shared key when no project id is provided', async () => {
      const { engine, store } = createTestEngine();

      await engine.setLastSearchTerm(undefined, 'grace');

      expect(store.get('findLastSearchTerm')).toBe('grace');
    });
  });
});
