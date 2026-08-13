import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getTargetWindowId,
  markWindowReady,
  resetForTesting,
  setFocusedWindowId,
  setWindowPendingContentPredicate,
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

describe('routing around pending-content windows', () => {
  beforeEach(() => {
    resetForTesting();
  });

  test('a focused pending-content window is passed over for the last real window', () => {
    addWindow(fakeWindow(1));
    markWindowReady(1);
    setFocusedWindowId(1);
    addWindow(fakeWindow(7));
    markWindowReady(7);
    setWindowPendingContentPredicate((windowId) => windowId === 7);
    // A window created for routed content is shown — and takes OS focus — before its content
    // arrives
    setFocusedWindowId(7);

    expect(getTargetWindowId()).toBe(1);
  });

  test('the window becomes the routing target once its content has arrived', () => {
    addWindow(fakeWindow(1));
    markWindowReady(1);
    setFocusedWindowId(1);
    addWindow(fakeWindow(7));
    markWindowReady(7);
    let isPending = true;
    setWindowPendingContentPredicate((windowId) => windowId === 7 && isPending);
    setFocusedWindowId(7);

    isPending = false;

    expect(getTargetWindowId()).toBe(7);
  });
});
