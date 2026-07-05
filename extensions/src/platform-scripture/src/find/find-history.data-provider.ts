import { DataProviderEngine } from '@papi/backend';
import type { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import type { FindHistoryDataTypes } from 'platform-scripture';

/** Maximum number of items retained in the find search history */
export const MAX_FIND_HISTORY_ITEMS = 15;

// Storage keys are shared with the pre-data-provider implementation so existing user data carries
// over. A project-specific entry appends `_${projectId}` to the base key.
const FIND_HISTORY_STORAGE_KEY = 'findRecentSearches';
const FIND_LAST_SEARCH_TERM_STORAGE_KEY = 'findLastSearchTerm';

/**
 * The subset of `papi.storage` user data functions the find history data provider engine needs.
 * Injected so the engine does not have to hold an `ExecutionToken` and can be unit tested.
 */
export type FindHistoryUserStorage = {
  /** Reads the stored value for `key`. May return `undefined` or throw if there is no data. */
  readUserData(key: string): Promise<string | undefined>;
  /** Writes `value` for `key` */
  writeUserData(key: string, value: string): Promise<void>;
};

function getStorageKey(baseKey: string, projectId: string | undefined): string {
  return baseKey + (projectId ? `_${projectId}` : '');
}

/**
 * Data provider engine for the user's find search history and last search term, backed by user data
 * storage. See `IFindHistoryDataProvider` in `platform-scripture.d.ts` for the provider API.
 */
export class FindHistoryDataProviderEngine
  extends DataProviderEngine<FindHistoryDataTypes>
  implements IDataProviderEngine<FindHistoryDataTypes>
{
  #storage: FindHistoryUserStorage;

  constructor(storage: FindHistoryUserStorage) {
    super();
    this.#storage = storage;
  }

  /**
   * Gets the find search history for a project (most recent first). Returns an empty array if
   * nothing is stored or the stored data is unreadable.
   */
  async getHistory(projectId: string | undefined): Promise<string[]> {
    try {
      const stored = await this.#storage.readUserData(
        getStorageKey(FIND_HISTORY_STORAGE_KEY, projectId),
      );
      if (!stored) return [];
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) return parsed;
    } catch {
      // Fall through to return an empty history on any read or parse error
    }
    return [];
  }

  /**
   * Replaces the find search history for a project. Prefer `addHistoryItem` so ordering and
   * deduplication are managed consistently here in the data provider.
   */
  async setHistory(
    projectId: string | undefined,
    history: string[],
  ): Promise<DataProviderUpdateInstructions<FindHistoryDataTypes>> {
    await this.#storage.writeUserData(
      getStorageKey(FIND_HISTORY_STORAGE_KEY, projectId),
      JSON.stringify(history),
    );
    return true;
  }

  /**
   * Adds one item to the top of the find search history for a project. If the item is already in
   * the history, it moves to the top instead of being duplicated. The history is capped at
   * {@link MAX_FIND_HISTORY_ITEMS}, dropping the oldest. Empty items are ignored.
   */
  async addHistoryItem(item: string, projectId?: string): Promise<void> {
    if (!item) return;
    const history = await this.getHistory(projectId);
    const historyWithoutItem = history.filter((existingItem) => existingItem !== item);
    // papi layers over `set<data_type>` methods, so this also notifies History subscribers
    await this.setHistory(projectId, [
      item,
      ...historyWithoutItem.slice(0, MAX_FIND_HISTORY_ITEMS - 1),
    ]);
  }

  /**
   * Gets the last find search term used for a project. Returns an empty string if nothing is stored
   * or the stored data is unreadable.
   */
  async getLastSearchTerm(projectId: string | undefined): Promise<string> {
    try {
      const stored = await this.#storage.readUserData(
        getStorageKey(FIND_LAST_SEARCH_TERM_STORAGE_KEY, projectId),
      );
      return stored ?? '';
    } catch {
      return '';
    }
  }

  /** Sets the last find search term used for a project */
  async setLastSearchTerm(
    projectId: string | undefined,
    term: string,
  ): Promise<DataProviderUpdateInstructions<FindHistoryDataTypes>> {
    await this.#storage.writeUserData(
      getStorageKey(FIND_LAST_SEARCH_TERM_STORAGE_KEY, projectId),
      term,
    );
    return true;
  }
}
