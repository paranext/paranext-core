import { deserialize, serialize } from 'platform-bible-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const WEBVIEW_STATE_KEY = 'web-view-state';
/** Web view id as `openWebView` mints it — no window suffix */
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
    globalThis.windowId = 1;
  });

  test('finds state saved under the minted id when the layout brings that id back window-scoped', async () => {
    // A layout is re-scoped on load, so the same web view that saved its state as `<id>` is looked
    // up as `<id>-w1` on the next launch
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w1`)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('stores state under the minted id, so a window id that changes cannot strand it', async () => {
    // A restored window always carries a new id, since ids are never reused, so a suffix baked into
    // the storage key would lose the record on every restart
    const { setFullWebViewStateById, getFullWebViewStateById } = await importWebViewStateService();

    setFullWebViewStateById(`${MINTED_ID}-w1`, { scrRef: 'JHN 3:16' });

    expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    expect(getFullWebViewStateById(`${MINTED_ID}-w7`)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('deletes the record a window-scoped id refers to', async () => {
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { deleteFullWebViewStateById } = await importWebViewStateService();
    deleteFullWebViewStateById(`${MINTED_ID}-w1`);

    expect(readPersistedState()).toEqual([]);
  });

  test('reads back a record left behind under a window-scoped id', async () => {
    seedStateForThisWindow([[`${MINTED_ID}-w3`, { scrRef: 'JHN 3:16' }]]);

    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w1`)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('returns a fresh state object for a web view that has none saved', async () => {
    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w1`)).toEqual({});
  });

  describe('cleanupOldWebViewState', () => {
    test('keeps the state of a web view the layout still holds', async () => {
      // The upgrade launch: state saved before multi-window support arrives under the legacy
      // unprefixed key, is migrated into this window's storage, and is looked up through the
      // window-scoped ids the reloaded layout now carries
      localStorage.setItem(WEBVIEW_STATE_KEY, serialize([[MINTED_ID, { scrRef: 'JHN 3:16' }]]));

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(`${MINTED_ID}-w1`);
      cleanupOldWebViewState();

      expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    });

    test('purges the state of a web view the layout no longer holds', async () => {
      seedStateForThisWindow([
        [MINTED_ID, { scrRef: 'JHN 3:16' }],
        [OTHER_MINTED_ID, { scrRef: 'MAT 1:1' }],
      ]);

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(`${MINTED_ID}-w1`);
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
