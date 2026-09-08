import { deserialize, serialize } from 'platform-bible-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const WEBVIEW_STATE_KEY = 'web-view-state';
/** Web view id as `openWebView` mints it — no window suffix */
const MINTED_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const OTHER_MINTED_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';

/** This window's own (durable) platform id — per-window storage is keyed by it directly */
const WINDOW_ID = '11111111-1111-4111-8111-111111111111';
/** A different window's id, for cases exercising a web view id scoped to another window */
const OTHER_WINDOW_ID = '22222222-2222-4222-8222-222222222222';

/**
 * Import a fresh copy of the service. It holds the loaded state in module-level variables, so each
 * test needs its own copy to start from the storage it seeded.
 */
async function importWebViewStateService() {
  vi.resetModules();
  // Resetting modules also re-instantiates the storage module the service imports, which forgets
  // the window id. The service must see it on the SAME storage instance it will read through, so
  // it is set on `globalThis` (which every module instance reads from) rather than through the
  // freshly imported one.
  const storage = await import('@renderer/services/local-storage.service');
  storage.testingLocalWindowStorage.resetForTesting();
  globalThis.windowId = WINDOW_ID;
  return import('@renderer/services/web-view-state.service');
}

/** Seed the state this window starts the session with */
function seedStateForThisWindow(entries: [string, Record<string, unknown>][]): void {
  localStorage.setItem(`${WINDOW_ID}_${WEBVIEW_STATE_KEY}`, serialize(entries));
}

/** Read back what the service persisted for this window */
function readPersistedState(): [string, Record<string, unknown>][] {
  const serialized = localStorage.getItem(`${WINDOW_ID}_${WEBVIEW_STATE_KEY}`);
  return serialized ? deserialize(serialized) : [];
}

describe('web view state service', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.windowId = WINDOW_ID;
  });

  test('finds state saved under the minted id when the layout brings that id back window-scoped', async () => {
    // A layout is re-scoped on load, so the same web view that saved its state as `<id>` is looked
    // up as `<id>-w<windowId>` on the next launch
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('stores state under the minted id, so a different window suffix cannot strand it', async () => {
    // A web view id can carry a different window's suffix than the one reading it back — a layout
    // scoped by one window and later re-scoped by another — so a window suffix baked into the
    // RECORD key would still lose the record even though the storage namespace survives
    const { setFullWebViewStateById, getFullWebViewStateById } = await importWebViewStateService();

    setFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`, { scrRef: 'JHN 3:16' });

    expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    expect(getFullWebViewStateById(`${MINTED_ID}-w${OTHER_WINDOW_ID}`)).toEqual({
      scrRef: 'JHN 3:16',
    });
  });

  test('deletes the record a window-scoped id refers to', async () => {
    seedStateForThisWindow([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);

    const { deleteFullWebViewStateById } = await importWebViewStateService();
    deleteFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`);

    expect(readPersistedState()).toEqual([]);
  });

  test('reads back a record left behind under a window-scoped id', async () => {
    seedStateForThisWindow([[`${MINTED_ID}-w${OTHER_WINDOW_ID}`, { scrRef: 'JHN 3:16' }]]);

    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`)).toEqual({ scrRef: 'JHN 3:16' });
  });

  test('returns a fresh state object for a web view that has none saved', async () => {
    const { getFullWebViewStateById } = await importWebViewStateService();

    expect(getFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`)).toEqual({});
  });

  describe('cleanupOldWebViewState', () => {
    test('keeps the state of a web view the layout still holds', async () => {
      // The upgrade launch: state saved before multi-window support arrives under the legacy
      // unprefixed key, is migrated into this window's storage, and is looked up through the
      // window-scoped ids the reloaded layout now carries
      localStorage.setItem(WEBVIEW_STATE_KEY, serialize([[MINTED_ID, { scrRef: 'JHN 3:16' }]]));

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`);
      cleanupOldWebViewState();

      expect(readPersistedState()).toEqual([[MINTED_ID, { scrRef: 'JHN 3:16' }]]);
    });

    test('purges the state of a web view the layout no longer holds', async () => {
      seedStateForThisWindow([
        [MINTED_ID, { scrRef: 'JHN 3:16' }],
        [OTHER_MINTED_ID, { scrRef: 'MAT 1:1' }],
      ]);

      const { getFullWebViewStateById, cleanupOldWebViewState } = await importWebViewStateService();
      getFullWebViewStateById(`${MINTED_ID}-w${WINDOW_ID}`);
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
