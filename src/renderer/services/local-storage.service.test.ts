import { beforeEach, describe, expect, test } from 'vitest';
import localWindowStorage, {
  getWindowIdsWithStoredState,
  removeStateOfWindows,
  testingLocalWindowStorage,
  WEB_VIEW_STATE_KEY,
} from '@renderer/services/local-storage.service';

const KEY = 'some.storage.key';
const WINDOW_A = '11111111-1111-4111-8111-111111111111';
const WINDOW_B = '22222222-2222-4222-8222-222222222222';

describe('localWindowStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    testingLocalWindowStorage.resetForTesting();
    globalThis.windowId = WINDOW_A;
  });

  test('reads back what it wrote, under a key namespaced by window id', () => {
    localWindowStorage.setItem(KEY, 'value for window a');

    expect(localWindowStorage.getItem(KEY)).toBe('value for window a');
    expect(localStorage.getItem(`${WINDOW_A}_${KEY}`)).toBe('value for window a');
  });

  test('keeps each window’s storage separate', () => {
    localWindowStorage.setItem(KEY, 'value for window a');

    globalThis.windowId = WINDOW_B;

    expect(localWindowStorage.getItem(KEY)).toBeNull();
    localWindowStorage.setItem(KEY, 'value for window b');
    globalThis.windowId = WINDOW_A;
    expect(localWindowStorage.getItem(KEY)).toBe('value for window a');
  });

  test('a restored window finds its own state, since its id is durable across a restart', () => {
    // The whole reason storage is keyed by the window's own id: it is durable now, so a restored
    // window is handed the same id its persisted entry already carried rather than a fresh one.
    globalThis.windowId = WINDOW_A;
    localWindowStorage.setItem(KEY, 'saved last session');

    testingLocalWindowStorage.resetForTesting();
    globalThis.windowId = WINDOW_A;

    expect(localWindowStorage.getItem(KEY)).toBe('saved last session');
  });

  test('returns null when neither this window’s key nor the legacy key exists', () => {
    expect(localWindowStorage.getItem(KEY)).toBeNull();
  });

  test('migrates a legacy unprefixed value written before multi-window support', () => {
    localStorage.setItem(KEY, 'value from before multi-window');

    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
    expect(localStorage.getItem(`${WINDOW_A}_${KEY}`)).toBe('value from before multi-window');
  });

  test('leaves the legacy key in place so a second window can migrate from it too', () => {
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.getItem(KEY);

    expect(localStorage.getItem(KEY)).toBe('value from before multi-window');

    globalThis.windowId = WINDOW_B;
    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
  });

  test('prefers this window’s value over the legacy one once it has been written', () => {
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.setItem(KEY, 'value for window a');

    expect(localWindowStorage.getItem(KEY)).toBe('value for window a');
  });

  test('an access made before the window id is known destroys nothing', () => {
    // The old-key sweep is a one-time upgrade step with a side effect on disk. An access that is
    // going to throw because the window id is not yet known must throw BEFORE that sweep runs, or
    // the throwing call would have quietly removed every old blob on its way out.
    testingLocalWindowStorage.resetForTesting();
    globalThis.windowId = undefined;
    localStorage.setItem('3_web-view-state', 'stale, keyed by window id 3');

    expect(() => localWindowStorage.getItem(KEY)).toThrow(/does not know its id/);
    expect(() => localWindowStorage.setItem(KEY, 'x')).toThrow(/does not know its id/);

    expect(localStorage.getItem('3_web-view-state')).toBe('stale, keyed by window id 3');
  });

  test('refuses to guess at a key when this window was not told its id', () => {
    testingLocalWindowStorage.resetForTesting();
    globalThis.windowId = undefined;

    expect(() => localWindowStorage.getItem(KEY)).toThrow(/does not know its id/);
    expect(() => localWindowStorage.setItem(KEY, 'x')).toThrow(/does not know its id/);
  });

  describe('windows that no longer exist', () => {
    test('are the ones this profile stores state for, minus the pre-durable-id scheme’s', () => {
      localStorage.setItem(`${WINDOW_A}_${WEB_VIEW_STATE_KEY}`, 'a');
      localStorage.setItem(`${WINDOW_B}_${WEB_VIEW_STATE_KEY}`, 'b');
      // The old scheme's keys belong to the one-time sweep, which spares the legacy dock layout
      // stored under the same kind of prefix — a prune must not reach either
      localStorage.setItem(`3_${WEB_VIEW_STATE_KEY}`, 'old scheme');
      localStorage.setItem('3_dock-saved-layout', 'still read by the layout load');
      localStorage.setItem(WEB_VIEW_STATE_KEY, 'legacy unprefixed');
      // An extension's own key in this shared storage, which happens to end the same way a stored
      // window's key does — its prefix is not window-id-shaped, so it must not be swept up
      localStorage.setItem(`myext_${WEB_VIEW_STATE_KEY}`, 'an extension’s own key');

      expect(getWindowIdsWithStoredState().sort()).toEqual([WINDOW_A, WINDOW_B].sort());
    });

    test('have their state removed, and only theirs', () => {
      localStorage.setItem(`${WINDOW_A}_${WEB_VIEW_STATE_KEY}`, 'a');
      localStorage.setItem(`${WINDOW_B}_${WEB_VIEW_STATE_KEY}`, 'b');

      removeStateOfWindows([WINDOW_A]);

      expect(localStorage.getItem(`${WINDOW_A}_${WEB_VIEW_STATE_KEY}`)).toBeNull();
      expect(localStorage.getItem(`${WINDOW_B}_${WEB_VIEW_STATE_KEY}`)).toBe('b');
    });

    test('ignores a non-window-id prefix such as an extension’s own key', () => {
      localStorage.setItem(`myext_${WEB_VIEW_STATE_KEY}`, 'an extension’s own key');

      expect(getWindowIdsWithStoredState()).toEqual([]);
    });
  });

  describe('state keyed by the old window-id scheme', () => {
    test('is removed on first use rather than left orphaned, and does not resurrect', () => {
      // Written by a build that keyed per-window state by a transient, counter-minted window id. No
      // restored window can ever read it, since none gets that id again, so it is dropped rather
      // than migrated.
      localStorage.setItem('3_web-view-state', 'stale, keyed by window id 3');
      localStorage.setItem('12_web-view-state', 'stale, keyed by window id 12');
      // Keys that merely start with digits but are not the old scheme are left alone: the layout
      // load still reads the pre-multi-window dock layout from its window-id-prefixed key, and this
      // storage is shared with every web view iframe, whose own keys can start with digits too
      localStorage.setItem('3_dock-saved-layout', 'still read by the layout load');
      localStorage.setItem('2024_dismissed', 'an extension’s own key');
      localStorage.setItem('2024-notes', 'not a window-id key');
      localStorage.setItem(KEY, 'legacy unprefixed, kept');

      expect(localWindowStorage.getItem(KEY)).toBe('legacy unprefixed, kept');

      expect(localStorage.getItem('3_web-view-state')).toBeNull();
      expect(localStorage.getItem('12_web-view-state')).toBeNull();
      expect(localStorage.getItem('3_dock-saved-layout')).toBe('still read by the layout load');
      expect(localStorage.getItem('2024_dismissed')).toBe('an extension’s own key');
      expect(localStorage.getItem('2024-notes')).toBe('not a window-id key');
      // The window-keyed copy the read just made must not itself look like an old key
      expect(localStorage.getItem(`${WINDOW_A}_${KEY}`)).toBe('legacy unprefixed, kept');
    });

    test('takes the older unprefixed blob with it rather than leaving it to be restored', () => {
      // An upgraded profile holds both: the unprefixed blob from before multi-window, which the
      // window-id scheme copied and deliberately left in place, and the window-id-keyed blob that
      // scheme then kept up to date. Sweeping only the newer one would leave the legacy migration
      // below to answer this window with state older than the state just dropped — a silent
      // rollback to pre-multi-window state, where a reset is what this upgrade promises.
      localStorage.setItem(`1_${WEB_VIEW_STATE_KEY}`, 'current, from the window-id build');
      localStorage.setItem(WEB_VIEW_STATE_KEY, 'ancient, from before multi-window');

      expect(localWindowStorage.getItem(WEB_VIEW_STATE_KEY)).toBeNull();

      expect(localStorage.getItem(`1_${WEB_VIEW_STATE_KEY}`)).toBeNull();
      expect(localStorage.getItem(WEB_VIEW_STATE_KEY)).toBeNull();
      // Nor was the ancient blob copied to this window's key on its way out
      expect(localStorage.getItem(`${WINDOW_A}_${WEB_VIEW_STATE_KEY}`)).toBeNull();
    });

    test('is swept once per process, not on every access', () => {
      localStorage.setItem('3_web-view-state', 'stale');
      localWindowStorage.getItem(KEY);
      expect(localStorage.getItem('3_web-view-state')).toBeNull();

      // A key of the old shape appearing after the sweep is not this process's concern — the
      // sweep is a one-time upgrade step, and re-running it on every read would turn a cheap
      // prefix check into a full storage scan on the hot path
      localStorage.setItem('3_web-view-state', 'written after the sweep');
      localWindowStorage.getItem(KEY);
      expect(localStorage.getItem('3_web-view-state')).toBe('written after the sweep');
    });
  });
});
