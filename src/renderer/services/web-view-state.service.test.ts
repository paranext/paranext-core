import { deserialize, serialize } from 'platform-bible-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const WEBVIEW_STATE_KEY = 'web-view-state';
/** Web view id as a materialization mints it — stable for the web view's whole life */
const MINTED_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const OTHER_MINTED_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';

/**
 * Import a fresh copy of the service. It holds the loaded state in module-level variables, so each
 * test needs its own copy to start from the storage it seeded.
 */
async function importWebViewStateService() {
  vi.resetModules();
  return import('@renderer/services/web-view-state.service');
}

/** Seed the state this window's storage starts the session with */
function seedStateForThisWindow(entries: [string, Record<string, unknown>][]): void {
  localStorage.setItem(`${globalThis.windowId}_${WEBVIEW_STATE_KEY}`, serialize(entries));
}

/** Read back what the service persisted for this window */
function readPersistedState(): [string, Record<string, unknown>][] {
  const serialized = localStorage.getItem(`${globalThis.windowId}_${WEBVIEW_STATE_KEY}`);
  return serialized ? deserialize(serialized) : [];
}

describe('web view state service', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.windowId = '1';
  });

  test('finds state saved under a web view’s id', async () => {
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(MINTED_ID)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('persists state under the id it was set with', async () => {
    const { setFullWebViewStateById, getFullWebViewStateById } = await importWebViewStateService();

    setFullWebViewStateById(MINTED_ID, { scrRef: 'JHN 3:16' });

    expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    expect(getFullWebViewStateById(MINTED_ID)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('deletes the record an id refers to', async () => {
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { deleteFullWebViewStateById } = await importWebViewStateService();
    deleteFullWebViewStateById(MINTED_ID);

    expect(readPersistedState()).toEqual([]);
  });

  test('returns a fresh state object for a web view that has none saved', async () => {
    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(MINTED_ID)).toEqual({});
  });

  describe('cleanupOldWebViewState', () => {
    test('keeps the state of a web view the layout still holds', async () => {
      seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(MINTED_ID);
      cleanupOldWebViewState();

      expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    });

    test('purges the state of a web view the layout no longer holds', async () => {
      seedStateForThisWindow([
        [MINTED_ID, { scrRef: 'JHN 3:16' }],
        [OTHER_MINTED_ID, { scrRef: 'MAT 1:1' }],
      ]);

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(MINTED_ID);
      cleanupOldWebViewState();

      expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    });

    test('leaves saved state alone when nothing was looked up', async () => {
      seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

      const { cleanupOldWebViewState } = await importWebViewStateService();
      cleanupOldWebViewState();

      expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    });
  });
});
