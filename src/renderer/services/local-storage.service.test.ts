import { beforeEach, describe, expect, test } from 'vitest';
import localWindowStorage from '@renderer/services/local-storage.service';

const KEY = 'some.storage.key';

describe('localWindowStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.windowId = '1';
  });

  test('reads back what it wrote, under a key namespaced by window', () => {
    localWindowStorage.setItem(KEY, 'value for window 1');

    expect(localWindowStorage.getItem(KEY)).toBe('value for window 1');
    expect(localStorage.getItem(`1_${KEY}`)).toBe('value for window 1');
  });

  test('keeps each window separate', () => {
    localWindowStorage.setItem(KEY, 'value for window 1');

    globalThis.windowId = '2';

    expect(localWindowStorage.getItem(KEY)).toBeNull();
    localWindowStorage.setItem(KEY, 'value for window 2');
    globalThis.windowId = '1';
    expect(localWindowStorage.getItem(KEY)).toBe('value for window 1');
  });

  test('returns null when neither the prefixed nor the legacy key exists', () => {
    expect(localWindowStorage.getItem(KEY)).toBeNull();
  });

  test('migrates a legacy unprefixed value written before multi-window support', () => {
    localStorage.setItem(KEY, 'value from before multi-window');

    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
    expect(localStorage.getItem(`1_${KEY}`)).toBe('value from before multi-window');
  });

  test('leaves the legacy key in place so a changed window ID cannot strand it', () => {
    // Electron's BrowserWindow.id is not guaranteed to be stable across restarts, so migrating must
    // not be destructive — a window that comes back with a different ID has to find the value again
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.getItem(KEY);

    expect(localStorage.getItem(KEY)).toBe('value from before multi-window');

    globalThis.windowId = '9';
    expect(localWindowStorage.getItem(KEY)).toBe('value from before multi-window');
  });

  test('prefers this window’s value over the legacy one once it has been written', () => {
    localStorage.setItem(KEY, 'value from before multi-window');
    localWindowStorage.setItem(KEY, 'value for window 1');

    expect(localWindowStorage.getItem(KEY)).toBe('value for window 1');
  });

  test('refuses to guess at a key when the window ID is missing', () => {
    globalThis.windowId = undefined;

    expect(() => localWindowStorage.getItem(KEY)).toThrow('windowId is not set');
    expect(() => localWindowStorage.setItem(KEY, 'value')).toThrow('windowId is not set');
  });
});
