import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getFocusedWindowId,
  getReadyWindowIds,
  getTargetWindowId,
  getWindows,
  isWindowReady,
  markWindowNotReady,
  markWindowReady,
  onDidChangeRoutingTarget,
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

  describe('focus', () => {
    test('answers which window is focused, even when routing goes elsewhere', () => {
      // Consumers that mean "the window the user is looking at" must not be handed the routing
      // target, which deliberately prefers a window that can answer over the focused one
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));

      setFocusedWindowId(2);

      expect(getFocusedWindowId()).toBe(2);
      expect(getTargetWindowId()).toBe(1);
    });

    test('reports no focused window when none has focus', () => {
      addWindow(fakeWindow(1));
      markWindowReady(1);

      expect(getFocusedWindowId()).toBeUndefined();
    });

    test('forgets the focused window when it closes', () => {
      const only = fakeWindow(1);
      addWindow(only);
      setFocusedWindowId(1);

      removeWindow(only);

      expect(getFocusedWindowId()).toBeUndefined();
    });
  });

  describe('routing target change event', () => {
    test('announces the window that took focus', () => {
      const heard: (number | undefined)[] = [];
      addWindow(fakeWindow(2));
      markWindowReady(2);
      addWindow(fakeWindow(3));
      markWindowReady(3);
      setFocusedWindowId(2);
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId(3);
      unsubscribe();

      expect(heard).toEqual([3]);
    });

    test('stays quiet when the same window is re-reported as focused', () => {
      // Electron re-fires `focus` in situations that do not change which window is focused; routing
      // proxies re-point their update relay on every emission, so a repeat is real work for nothing
      const heard: (number | undefined)[] = [];
      addWindow(fakeWindow(3));
      setFocusedWindowId(3);
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId(3);
      setFocusedWindowId(3);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('stays quiet when focus moves between windows that route to the same place', () => {
      // Two windows that are both unready while a third serves the calls: focus churn between them
      // does not change where anything is routed, so subscribers have nothing to re-resolve
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));
      addWindow(fakeWindow(3));
      setFocusedWindowId(2);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId(3);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('announces focus being cleared when the last window goes away', () => {
      const only = fakeWindow(3);
      addWindow(only);
      setFocusedWindowId(3);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      removeWindow(only);
      unsubscribe();

      expect(heard).toEqual([undefined]);
    });

    test('announces the re-point when the focused window closes', () => {
      // Routing has to leave the destroyed window on its own: a caller that has to notice the
      // target was the closing window and re-point focus itself is one ordering mistake away from
      // routing to a window that no longer exists
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowReady(1);
      addWindow(fakeWindow(2));
      markWindowReady(2);
      setFocusedWindowId(1);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      removeWindow(closing);
      unsubscribe();

      expect(getTargetWindowId()).toBe(2);
      expect(heard).toEqual([2]);
    });

    test('has already updated the target by the time listeners run', () => {
      // Listeners re-resolve through `getTargetWindowId()`; emitting before the assignment would
      // hand every one of them the window focus just left
      const targetsSeenByListener: (number | undefined)[] = [];
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setFocusedWindowId(1);
      const unsubscribe = onDidChangeRoutingTarget(() =>
        targetsSeenByListener.push(getTargetWindowId()),
      );

      setFocusedWindowId(2);
      unsubscribe();

      expect(targetsSeenByListener).toEqual([2]);
    });

    test('stops calling a listener that unsubscribed', () => {
      const heard: (number | undefined)[] = [];
      addWindow(fakeWindow(4));
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

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

    test('routes to the window the user was last working in, not the oldest one', () => {
      // Two windows the user has used and a third still starting: the answer is the one they were
      // just in, which creation order cannot tell you
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));
      markWindowReady(2);
      setFocusedWindowId(1);
      setFocusedWindowId(2);

      addWindow(fakeWindow(3));
      setFocusedWindowId(3);

      expect(getTargetWindowId()).toBe(2);
    });

    test('routes to a ready window the user has never focused', () => {
      // Focus history is empty at startup under a window manager that never reports focus, so the
      // tracked windows are still the fallback
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady(2);

      expect(getTargetWindowId()).toBe(2);
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
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady(2);
      unsubscribe();

      expect(heard).toEqual([2]);
    });

    test('stays quiet when a window becomes ready without taking the routing target', () => {
      addWindow(fakeWindow(1));
      markWindowReady(1);
      setFocusedWindowId(1);
      addWindow(fakeWindow(2));
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady(2);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('announces when an unready window that was holding the target starts serving', () => {
      // Startup with one window: nothing else can take the target, so the ID never changes — but
      // the calls that were failing now succeed, and anything that gave up has to try again
      addWindow(fakeWindow(1));
      setFocusedWindowId(1);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady(1);
      unsubscribe();

      expect(heard).toEqual([1]);
    });

    test('stays quiet when a window that is already ready is marked ready again', () => {
      addWindow(fakeWindow(1));
      setFocusedWindowId(1);
      markWindowReady(1);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady(1);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('stays quiet when a window that was never ready is marked not ready', () => {
      // The renderer lifecycle events that report a window as unable to serve requests also fire
      // during its first load, before it ever registered anything
      addWindow(fakeWindow(1));
      markWindowReady(1);
      setFocusedWindowId(1);
      addWindow(fakeWindow(2));
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowNotReady(2);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('routes elsewhere when a window stops serving requests', () => {
      // A crashed or reloading renderer keeps its BrowserWindow, but every call routed to it now
      // waits out the network service's registration retry against handlers that are gone
      addWindow(fakeWindow(1));
      markWindowReady(1);
      addWindow(fakeWindow(2));
      markWindowReady(2);
      setFocusedWindowId(1);

      markWindowNotReady(1);

      expect(getTargetWindowId()).toBe(2);
    });

    test('re-announces when a window recovers, so consumers drop the services that died with it', () => {
      // A reloaded renderer registers brand new scoped services under the same window ID. Consumers
      // compare what they hold by identity, so the recovery has to reach them even though the ID
      // they would route to never changed.
      addWindow(fakeWindow(1));
      markWindowReady(1);
      setFocusedWindowId(1);
      const heard: (number | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowNotReady(1);
      markWindowReady(1);
      unsubscribe();

      expect(heard).toEqual([1, 1]);
    });

    test('keeps a window that stopped serving requests tracked, since it is still a window', () => {
      addWindow(fakeWindow(1));
      markWindowReady(1);

      markWindowNotReady(1);

      expect(getWindows().map((w) => w.id)).toEqual([1]);
      expect(isWindowReady(1)).toBe(false);
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

    test('lists only the windows a fan-out can get an answer from', () => {
      // A window that has not registered its services cannot own a web view or be showing a
      // notification, so asking it costs a registration-retry wait and a warning to learn nothing
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      addWindow(fakeWindow(3));
      markWindowReady(1);
      markWindowReady(3);

      expect(getReadyWindowIds()).toEqual([1, 3]);
      expect(isWindowReady(2)).toBe(false);
    });

    test('drops a closed window from the fan-out list', () => {
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowReady(1);

      removeWindow(closing);

      expect(getReadyWindowIds()).toEqual([]);
    });
  });
});
