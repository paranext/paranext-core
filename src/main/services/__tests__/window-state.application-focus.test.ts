import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getFocusedWindowId,
  handleWindowBlurred,
  isApplicationFocused,
  removeWindow,
  resetForTesting,
  setFocusedWindowId,
} from '@main/services/window-state.service';

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime. `vi.mock` is hoisted above the
// imports above, so the static import resolves against this stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

// Keeps the real logger's file/console transports out of the test run
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

describe('isApplicationFocused', () => {
  beforeEach(() => {
    resetForTesting();
  });

  test('answers false before any window has reported focus', () => {
    expect(isApplicationFocused()).toBe(false);
  });

  test('answers true while a window holds focus', () => {
    setFocusedWindowId('1');

    expect(isApplicationFocused()).toBe(true);
  });

  test('a blur of the focused window unfocuses the app but keeps the last-focused answer', () => {
    setFocusedWindowId('1');

    handleWindowBlurred('1');

    expect(isApplicationFocused()).toBe(false);
    // The last-focused answer survives the app going to the background: routing fallbacks and the
    // focused-window command still need "the window the user was last working in"
    expect(getFocusedWindowId()).toBe('1');
  });

  test('a blur from a window that already handed focus over changes nothing', () => {
    // Electron delivers the loser's blur and the winner's focus as separate events, and the pair
    // can arrive with the focus first
    setFocusedWindowId('2');

    handleWindowBlurred('1');

    expect(isApplicationFocused()).toBe(true);
    expect(getFocusedWindowId()).toBe('2');
  });

  test('focus coming back after a blur refocuses the app', () => {
    setFocusedWindowId('1');
    handleWindowBlurred('1');

    setFocusedWindowId('1');

    expect(isApplicationFocused()).toBe(true);
  });

  test('removing the focused window unfocuses the app', () => {
    const window = fakeWindow(1);
    addWindow(window);
    setFocusedWindowId('1');

    removeWindow(window, '1');

    expect(isApplicationFocused()).toBe(false);
  });
});
