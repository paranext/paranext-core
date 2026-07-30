import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getTargetWindowId,
  getWindows,
  markWindowReady,
  onDidChangeFocusedWindowId,
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

  describe('focus change event', () => {
    test('announces the window that took focus', () => {
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      setFocusedWindowId(3);
      unsubscribe();

      expect(heard).toEqual([3]);
    });

    test('stays quiet when the same window is re-reported as focused', () => {
      // Electron re-fires `focus` in situations that do not change which window is focused; routing
      // proxies re-point their update relay on every emission, so a repeat is real work for nothing
      const heard: (number | undefined)[] = [];
      setFocusedWindowId(3);
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      setFocusedWindowId(3);
      setFocusedWindowId(3);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('announces focus being cleared when the last window goes away', () => {
      const heard: (number | undefined)[] = [];
      setFocusedWindowId(3);
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      setFocusedWindowId(undefined);
      unsubscribe();

      expect(heard).toEqual([undefined]);
    });

    test('has already updated the target by the time listeners run', () => {
      // Listeners re-resolve through `getTargetWindowId()`; emitting before the assignment would
      // hand every one of them the window focus just left
      const targetsSeenByListener: (number | undefined)[] = [];
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setFocusedWindowId(1);
      const unsubscribe = onDidChangeFocusedWindowId(() =>
        targetsSeenByListener.push(getTargetWindowId()),
      );

      setFocusedWindowId(2);
      unsubscribe();

      expect(targetsSeenByListener).toEqual([2]);
    });

    test('stops calling a listener that unsubscribed', () => {
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      unsubscribe();
      setFocusedWindowId(4);

      expect(heard).toEqual([]);
    });
  });

  describe('routing readiness', () => {
    test('keeps routing to a window that can answer while a new one is still starting', () => {
      // A window is tracked and takes OS focus as soon as it is shown, long before its renderer has
      // registered anything. Handing it the routing target on focus alone makes every routed call in
      // the app fail for as long as the new window takes to start.
      const first = fakeWindow(1);
      addWindow(first);
      markWindowReady(1);
      setFocusedWindowId(1);

      addWindow(fakeWindow(2));
      setFocusedWindowId(2);

      expect(getTargetWindowId()).toBe(1);
    });

    test('hands routing over once the new window is serving requests', () => {
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));
      setFocusedWindowId(2);

      markWindowReady(2);

      expect(getTargetWindowId()).toBe(2);
    });

    test('announces the handover so consumers re-resolve', () => {
      // Routing was deliberately answering with a different window, so anything holding that answer
      // has to be told the moment it stops being true
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));
      setFocusedWindowId(2);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      markWindowReady(2);
      unsubscribe();

      expect(heard).toEqual([2]);
    });

    test('stays quiet when a window that is not focused becomes ready', () => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setFocusedWindowId(1);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeFocusedWindowId((windowId) => heard.push(windowId));

      markWindowReady(2);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('falls back to the focused window before any window is ready', () => {
      // Ordinary startup: nothing can answer yet, so callers should get the honest "the renderer has
      // not started yet" error rather than routing somewhere misleading
      addWindow(fakeWindow(1));
      setFocusedWindowId(1);

      expect(getTargetWindowId()).toBe(1);
    });

    test('does not let a recycled window id inherit the closed window’s readiness', () => {
      // Electron reuses BrowserWindow ids, so a new window can arrive with a closed one's id. It has
      // its own renderer to start, and routing to it before that would fail every call.
      const closed = fakeWindow(1);
      addWindow(closed);
      markWindowReady(1);
      removeWindow(closed);

      addWindow(fakeWindow(1));
      const serving = fakeWindow(2);
      addWindow(serving);
      markWindowReady(2);
      setFocusedWindowId(1);

      expect(getTargetWindowId()).toBe(2);
    });
  });
});
