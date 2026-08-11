import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  countWindowsNotClosing,
  isWindowClosing,
  markWindowClosing,
  removeWindow,
  resetForTesting,
} from '@main/services/window-state.service';

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime. `vi.mock` is hoisted above the
// imports above, so the static import resolves against this stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

// Keeps the real logger's file/console transports (and their startup warnings) out of the test run
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Stand-in for a BrowserWindow — the service only reads `id` and `isDestroyed` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; these are the only members the
  // service under test touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

/**
 * Stand-in for a BrowserWindow that can be destroyed the way Electron destroys one: once
 * `destroyForTest` has run, `isDestroyed` answers `true` — the only property this module reads off
 * a window that may already be gone.
 */
function destroyableWindow(id: number): { window: BrowserWindow; destroyForTest: () => void } {
  let isDestroyed = false;
  return {
    // Constructing a real BrowserWindow needs the Electron runtime; `id` and `isDestroyed` are the
    // only members the service under test touches
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    window: { id, isDestroyed: () => isDestroyed } as BrowserWindow,
    destroyForTest: () => {
      isDestroyed = true;
    },
  };
}

describe('counting windows that are not already closing', () => {
  beforeEach(() => {
    resetForTesting();
  });

  test('counts tracked windows that are not closing', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    expect(countWindowsNotClosing()).toBe(2);
  });

  test('a window marked closing is not counted', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    markWindowClosing(1);

    expect(countWindowsNotClosing()).toBe(1);
  });

  test('a destroyed window is not counted', () => {
    const destroyable = destroyableWindow(1);
    addWindow(destroyable.window);
    addWindow(fakeWindow(2));

    destroyable.destroyForTest();

    expect(countWindowsNotClosing()).toBe(1);
  });

  test('a removed window no longer counts as closing', () => {
    const closing = fakeWindow(1);
    addWindow(closing);
    addWindow(fakeWindow(2));
    markWindowClosing(1);

    removeWindow(closing, 1);
    // Electron reuses window ids; a leftover mark would tell this new id-1 window it is already
    // on its way out before it has even finished opening
    addWindow(fakeWindow(1));

    expect(countWindowsNotClosing()).toBe(2);
  });

  test('isWindowClosing reflects marking and purging', () => {
    const closing = fakeWindow(1);
    addWindow(closing);

    expect(isWindowClosing(1)).toBe(false);

    markWindowClosing(1);

    expect(isWindowClosing(1)).toBe(true);

    removeWindow(closing, 1);

    expect(isWindowClosing(1)).toBe(false);
  });
});
