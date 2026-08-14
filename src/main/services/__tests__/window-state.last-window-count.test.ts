import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  countWindowsThatCouldBeTheLastOne,
  markWindowAbandoned,
  markWindowClosing,
  removeWindow,
  resetForTesting,
  setWindowPendingContentPredicate,
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
 * `destroyForTest` has run, `isDestroyed` answers `true` — the only property this count reads off a
 * window that may already be gone.
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

describe('counting the windows that could be the last one', () => {
  beforeEach(() => {
    // The module holds process-wide state — the tracked list, the closing and abandoned marks, and
    // the injected pending-content predicate — so unwind all of it between tests
    resetForTesting();
  });

  test('a tracked window counts', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    expect(countWindowsThatCouldBeTheLastOne()).toBe(2);
  });

  test('a window whose close has begun does not count', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    markWindowClosing(2);

    expect(countWindowsThatCouldBeTheLastOne()).toBe(1);
  });

  test('a window still waiting for the content it was created for does not count', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    setWindowPendingContentPredicate((windowId) => windowId === 2);

    expect(countWindowsThatCouldBeTheLastOne()).toBe(1);
  });

  test('a window nothing will ever run in again does not count', () => {
    // One window the user can work in alongside an abandoned one is one window, which is what
    // makes a window emptied in that state dock Home instead of closing: the abandoned one is
    // still on screen, but its renderer is dead and no reload is coming
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    markWindowAbandoned(2);

    expect(countWindowsThatCouldBeTheLastOne()).toBe(1);
  });

  test('one window the user can work in among every kind that cannot be the last one counts as one', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));
    addWindow(fakeWindow(3));
    addWindow(fakeWindow(4));

    markWindowClosing(2);
    setWindowPendingContentPredicate((windowId) => windowId === 3);
    markWindowAbandoned(4);

    expect(countWindowsThatCouldBeTheLastOne()).toBe(1);
  });

  test('a destroyed window does not count', () => {
    const destroyable = destroyableWindow(1);
    addWindow(destroyable.window);
    addWindow(fakeWindow(2));

    destroyable.destroyForTest();

    expect(countWindowsThatCouldBeTheLastOne()).toBe(1);
  });

  test('a window that has gone away takes its marks with it', () => {
    // The marks are this window's state, keyed by its id, and nothing else ever takes them off:
    // left behind they go on answering for a window that is not there and pile up for the life of
    // the process. Electron hands out each id at most once per process, so handing the id to
    // another window is a probe for marks outliving their window rather than a session that could
    // happen — a mark left behind counts a window out of the arithmetic that should be in it.
    const closing = fakeWindow(1);
    addWindow(closing);
    addWindow(fakeWindow(2));
    markWindowClosing(1);
    markWindowAbandoned(1);

    removeWindow(closing, 1);
    addWindow(fakeWindow(1));

    expect(countWindowsThatCouldBeTheLastOne()).toBe(2);
  });
});
