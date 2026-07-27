import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getTargetWindowId,
  getWindows,
  removeWindow,
  setFocusedWindowId,
} from '@main/services/window-state.service';

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime. `vi.mock` is hoisted above the
// imports above, so the static import resolves against this stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

/** Stand-in for a BrowserWindow — the service only ever reads `id` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; `id` is the only member the
  // service under test touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id } as BrowserWindow;
}

describe('window state tracking', () => {
  beforeEach(() => {
    // The module holds process-wide state, so unwind it between tests
    [...getWindows()].forEach(removeWindow);
    setFocusedWindowId(undefined);
  });

  test('targets the focused window when one is focused', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    setFocusedWindowId(2);

    expect(getTargetWindowId()).toBe(2);
  });

  test('falls back to the first window when nothing is focused', () => {
    addWindow(fakeWindow(7));
    addWindow(fakeWindow(8));

    expect(getTargetWindowId()).toBe(7);
  });

  test('has no target when no windows are open', () => {
    expect(getTargetWindowId()).toBeUndefined();
  });

  test('reports no target once the last window is removed, so callers fail loudly', () => {
    const only = fakeWindow(1);
    addWindow(only);
    setFocusedWindowId(1);

    removeWindow(only);
    setFocusedWindowId(undefined);

    expect(getTargetWindowId()).toBeUndefined();
  });

  test('removing a window leaves the others tracked', () => {
    const first = fakeWindow(1);
    const second = fakeWindow(2);
    addWindow(first);
    addWindow(second);

    removeWindow(first);

    expect(getWindows().map((w) => w.id)).toEqual([2]);
  });

  test('removing a window that was never tracked leaves the list untouched', () => {
    addWindow(fakeWindow(1));

    removeWindow(fakeWindow(99));

    expect(getWindows().map((w) => w.id)).toEqual([1]);
  });

  test('exposes the live window list, which the close handler relies on to count windows', () => {
    const live = getWindows();

    addWindow(fakeWindow(1));

    expect(live.length).toBe(1);
  });
});
