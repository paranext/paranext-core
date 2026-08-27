import { beforeEach, describe, expect, test } from 'vitest';
import localWindowStorage, {
  setWindowSlotId,
  testingLocalWindowStorage,
} from '@renderer/services/local-storage.service';

const KEY = 'some.storage.key';
const SLOT_A = 'slot-a';
const SLOT_B = 'slot-b';

describe('localWindowStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    testingLocalWindowStorage.resetForTesting();
    setWindowSlotId(SLOT_A);
  });

  test('reads back what it wrote, under a key namespaced by slot', () => {
    localWindowStorage.setItem(KEY, 'value for slot a');

    expect(localWindowStorage.getItem(KEY)).toBe('value for slot a');
    expect(localStorage.getItem(`${SLOT_A}_${KEY}`)).toBe('value for slot a');
  });

  test('keeps each slot separate', () => {
    localWindowStorage.setItem(KEY, 'value for slot a');

    setWindowSlotId(SLOT_B);

    expect(localWindowStorage.getItem(KEY)).toBeNull();
    localWindowStorage.setItem(KEY, 'value for slot b');
    setWindowSlotId(SLOT_A);
    expect(localWindowStorage.getItem(KEY)).toBe('value for slot a');
  });

  test('a restored window finds its slot’s state whatever window id it was given', () => {
    // The whole reason storage is keyed by slot: across a relaunch the slot is the same and the
    // window id is not. A relaunch here is a new window id with the same slot.
    globalThis.windowId = 1;
    localWindowStorage.setItem(KEY, 'saved last session');

    testingLocalWindowStorage.resetForTesting();
    globalThis.windowId = 2;
    setWindowSlotId(SLOT_A);

    expect(localWindowStorage.getItem(KEY)).toBe('saved last session');
  });

  test('returns null when neither the slot key nor the legacy key exists', () => {
    expect(localWindowStorage.getItem(KEY)).toBeNull();
  });

  test('migrates a legacy unprefixed value written before multi-window support', () => {
    localStorage.setItem(KEY, 'value from before multi-window');

    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
    expect(localStorage.getItem(`${SLOT_A}_${KEY}`)).toBe('value from before multi-window');
  });

  test('leaves the legacy key in place so a second window can migrate from it too', () => {
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.getItem(KEY);

    expect(localStorage.getItem(KEY)).toBe('value from before multi-window');

    setWindowSlotId(SLOT_B);
    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
  });

  test('prefers this slot’s value over the legacy one once it has been written', () => {
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.setItem(KEY, 'value for slot a');

    expect(localWindowStorage.getItem(KEY)).toBe('value for slot a');
  });

  test('an access made before the slot is known destroys nothing', () => {
    // The old-key sweep is a one-time upgrade step with a side effect on disk. An access that is
    // going to throw because the slot is not yet known must throw BEFORE that sweep runs, or the
    // throwing call would have quietly removed every old blob on its way out.
    testingLocalWindowStorage.resetForTesting();
    localStorage.setItem(`3_${KEY}`, 'stale, keyed by window id 3');

    expect(() => localWindowStorage.getItem(KEY)).toThrow(/does not yet know its slot/);
    expect(() => localWindowStorage.setItem(KEY, 'x')).toThrow(/does not yet know its slot/);

    expect(localStorage.getItem(`3_${KEY}`)).toBe('stale, keyed by window id 3');
  });

  test('refuses to guess at a key before main has said which slot this window is', () => {
    testingLocalWindowStorage.resetForTesting();

    expect(() => localWindowStorage.getItem(KEY)).toThrow(/does not yet know its slot/);
    expect(() => localWindowStorage.setItem(KEY, 'x')).toThrow(/does not yet know its slot/);
  });

  describe('state keyed by the old window-id scheme', () => {
    test('is removed on first use rather than left orphaned, and does not resurrect', () => {
      // Written by a build that keyed per-window state by window id. No restored window can ever
      // read it, since none gets that id again, so it is dropped rather than migrated.
      localStorage.setItem(`3_${KEY}`, 'stale, keyed by window id 3');
      localStorage.setItem('12_web-view-state', 'stale, keyed by window id 12');
      // Keys that merely start with digits but are not the old scheme are left alone
      localStorage.setItem('2024-notes', 'not a window-id key');
      localStorage.setItem(KEY, 'legacy unprefixed, kept');

      expect(localWindowStorage.getItem(KEY)).toBe('legacy unprefixed, kept');

      expect(localStorage.getItem(`3_${KEY}`)).toBeNull();
      expect(localStorage.getItem('12_web-view-state')).toBeNull();
      expect(localStorage.getItem('2024-notes')).toBe('not a window-id key');
      // The slot-keyed copy the read just made must not itself look like an old key
      expect(localStorage.getItem(`${SLOT_A}_${KEY}`)).toBe('legacy unprefixed, kept');
    });

    test('is swept once per process, not on every access', () => {
      localStorage.setItem(`3_${KEY}`, 'stale');
      localWindowStorage.getItem(KEY);
      expect(localStorage.getItem(`3_${KEY}`)).toBeNull();

      // A key of the old shape appearing after the sweep is not this process's concern — the
      // sweep is a one-time upgrade step, and re-running it on every read would turn a cheap
      // prefix check into a full storage scan on the hot path
      localStorage.setItem(`3_${KEY}`, 'written after the sweep');
      localWindowStorage.getItem(KEY);
      expect(localStorage.getItem(`3_${KEY}`)).toBe('written after the sweep');
    });
  });
});
