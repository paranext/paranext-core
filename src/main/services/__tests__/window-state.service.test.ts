import { beforeEach, describe, expect, test, vi } from 'vitest';
import { WINDOW_ID_SHAPE_PATTERN_SOURCE } from '@shared/utils/util';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  areAllWindowsClosing,
  doesNavigationReplaceRendererRegistrations,
  focusWindow,
  getAbandonedWindowIds,
  getFocusedWindowId,
  getReadyWindowIds,
  getTargetWindowId,
  getTrackedWindows,
  getWindowCreationRank,
  getUnreachableWindowIds,
  getWindowIdOf,
  getWindows,
  isWindowAbandoned,
  isWindowClosing,
  isWindowReady,
  isWindowTracked,
  markWindowAbandoned,
  markWindowClosing,
  markWindowNotReady,
  markWindowReady,
  onDidChangeRoutingTarget,
  removeWindow,
  resetForTesting,
  setFocusedWindowId,
  wasWindowEverReady,
} from '@main/services/window-state.service';

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime. `vi.mock` is hoisted above the
// imports above, so the static import resolves against this stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

const mocks = vi.hoisted(() => ({
  loggerError: vi.fn(),
  loggerWarn: vi.fn(),
  nextMintedId: { current: 1 },
  useRealRandomUuid: { current: false },
}));

// A real mint is a random GUID, which would make every test below that names a window by the id
// its `addWindow` call happens to return unreadable and order-dependent. Standing in for a
// sequence — reset alongside the rest of this module's state in `beforeEach` — keeps every test
// free to spell out the id it expects, the same way it could before ids were durable.
//
// `useRealRandomUuid` is the escape hatch for the one test that has to check the real shape
// instead ('mints a fresh GUID for every window, not a repeatable value') — it flips this on for
// just that test, and `beforeEach` flips it back off before the next one runs.
vi.mock('crypto', async (importOriginal) => {
  const actual = await importOriginal<typeof import('crypto')>();
  const randomUUID: typeof actual.randomUUID = () => {
    if (mocks.useRealRandomUuid.current) return actual.randomUUID();
    const id = mocks.nextMintedId.current;
    mocks.nextMintedId.current += 1;
    // A stand-in id, not a real GUID — callers of this mock never rely on the real shape (that
    // mocks.useRealRandomUuid.current branch above does)
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return String(id) as ReturnType<typeof actual.randomUUID>;
  };
  return { ...actual, randomUUID, default: { ...actual, randomUUID } };
});

// Stood in for so a swallowed subscriber throw can be asserted to have been reported rather than
// merely swallowed, and so the real logger's file/console transports stay out of the test run
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: mocks.loggerError, warn: mocks.loggerWarn, info: vi.fn(), debug: vi.fn() },
}));

/**
 * Stand-in for a BrowserWindow.
 *
 * `id` is Electron's and the service never reads it — it only tells these stand-ins apart in
 * assertions about which window objects are still tracked. A window's PLATFORM id is whatever
 * {@link addWindow} hands back, so any test naming a window to the service must use that and not
 * this number, which is free to disagree with it.
 */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; these are the only members the
  // service under test touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

/**
 * Stand-in for a BrowserWindow that can be raised, recording what {@link focusWindow} did to it in
 * the order it did it.
 *
 * @param id Window id
 * @param options.doesActivationSucceed What the OS does with a client-initiated activation:
 *   `focus()` makes `isFocused()` true when the OS honors it, and leaves it false when Windows
 *   refuses it
 * @param options.isMinimized Whether the window starts minimized
 */
function raisableWindow(
  id: number,
  options?: { doesActivationSucceed?: boolean; isMinimized?: boolean },
): { window: BrowserWindow; calls: string[] } {
  const doesActivationSucceed = options?.doesActivationSucceed ?? true;
  const calls: string[] = [];
  let isFocused = false;
  const window = {
    id,
    isDestroyed: () => false,
    isMinimized: () => options?.isMinimized ?? false,
    restore: () => calls.push('restore'),
    focus: () => {
      calls.push('focus');
      isFocused = doesActivationSucceed;
    },
    isFocused: () => isFocused,
    flashFrame: (flash: boolean) => calls.push(`flashFrame(${flash})`),
  };
  // Constructing a real BrowserWindow needs the Electron runtime; these are the members raising a
  // window touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { window: window as unknown as BrowserWindow, calls };
}

/**
 * Stand-in for a BrowserWindow that can be destroyed the way Electron destroys one: once
 * `destroyForTest` has run, every property access throws instead of answering — except
 * `isDestroyed`, which Electron keeps answerable precisely so a holder can find out.
 */
function destroyableWindow(id: number): { window: BrowserWindow; destroyForTest: () => void } {
  let isDestroyed = false;
  const window = new Proxy(
    { id, isDestroyed: () => isDestroyed },
    {
      get(target, key) {
        if (key === 'isDestroyed') return target.isDestroyed;
        if (isDestroyed) throw new TypeError('Object has been destroyed');
        // Indexing the stub by the proxied key, which is only ever `id` here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return target[key as keyof typeof target];
      },
    },
  );
  return {
    // Constructing a real BrowserWindow needs the Electron runtime; `id` is the only member the
    // service under test touches
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    window: window as BrowserWindow,
    destroyForTest: () => {
      isDestroyed = true;
    },
  };
}

describe('window state tracking', () => {
  beforeEach(() => {
    // The module holds process-wide state, so unwind it between tests. Unwound wholesale rather
    // than by removing each window: a test that destroys one leaves it tracked but out of
    // `getWindows()`, which is exactly the state this module exists to survive.
    resetForTesting();
    mocks.loggerError.mockClear();
    mocks.nextMintedId.current = 1;
    mocks.useRealRandomUuid.current = false;
  });

  test('targets the focused window when one is focused', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    setFocusedWindowId('2');

    expect(getTargetWindowId()).toBe('2');
  });

  test('falls back to the first window when nothing is focused', () => {
    const firstWindowId = addWindow(fakeWindow(7));
    addWindow(fakeWindow(8));

    expect(getTargetWindowId()).toBe(firstWindowId);
  });

  test('has no target when no windows are open', () => {
    expect(getTargetWindowId()).toBeUndefined();
  });

  describe('where a window falls in creation order', () => {
    // The router's two owner tie-breaks read this instead of comparing ids, because a GUID carries
    // no order. Both call sites fall back with `?? 0`, so "untracked answers undefined" is part of
    // the contract rather than an implementation detail.
    test('orders windows by when they were added, and forgets one that is removed', () => {
      const first = fakeWindow(1);
      const firstId = addWindow(first);
      const secondId = addWindow(fakeWindow(2));
      const thirdId = addWindow(fakeWindow(3));

      expect(getWindowCreationRank(firstId)).toBe(0);
      expect(getWindowCreationRank(secondId)).toBe(1);
      expect(getWindowCreationRank(thirdId)).toBe(2);

      // Relative order has to survive an earlier window going away: the tie-break asks which of two
      // live windows is older, and closing a third must not reverse that answer
      removeWindow(first, firstId);

      const secondRank = getWindowCreationRank(secondId);
      const thirdRank = getWindowCreationRank(thirdId);
      expect(secondRank).toBeDefined();
      expect(thirdRank).toBeDefined();
      expect(secondRank).toBeLessThan(thirdRank ?? -1);
      expect(getWindowCreationRank(firstId)).toBeUndefined();
    });

    test('answers undefined for an id nothing tracks', () => {
      addWindow(fakeWindow(1));

      expect(getWindowCreationRank('a-window-that-never-existed')).toBeUndefined();
    });
  });

  describe('minting window ids', () => {
    test('never hands out an id a closed window already had', () => {
      const first = fakeWindow(1);
      const second = fakeWindow(2);
      const firstId = addWindow(first);
      const secondId = addWindow(second);
      removeWindow(first, firstId);
      removeWindow(second, secondId);

      const thirdId = addWindow(fakeWindow(3));
      const fourthId = addWindow(fakeWindow(4));

      // Minted ids are random GUIDs, not a sequence, so uniqueness is what a reuse would break —
      // there is no order left to pin
      expect(new Set([firstId, secondId, thirdId, fourthId]).size).toBe(4);
    });

    test('mints a fresh GUID for every window, not a repeatable value', () => {
      // The one test in this file that needs the real generator instead of the sequence stand-in —
      // see the note above the `crypto` mock.
      mocks.useRealRandomUuid.current = true;
      const firstId = addWindow(fakeWindow(1));
      const secondId = addWindow(fakeWindow(2));

      expect(firstId).not.toBe(secondId);
      // Matched against the shared constant rather than a copy of it: every matcher that has to
      // recognize a window id reads that constant, so a mint it no longer matches would break
      // suffix stripping and the per-window storage prune while a hand-written regex here stayed
      // green
      expect(firstId).toMatch(new RegExp(`^${WINDOW_ID_SHAPE_PATTERN_SOURCE}$`, 'i'));
    });

    test('answers a window’s platform id from the window itself, never from Electron’s', () => {
      // The deep-link path holds a BrowserWindow that Electron handed it and has to name it to the
      // tracker. The fake's Electron `id` is chosen to disagree with the minted id, so a lookup that
      // fell back to `window.id` would be caught rather than pass by coincidence.
      const tracked = fakeWindow(42);
      const mintedId = addWindow(tracked);

      expect(mintedId).not.toBe(42);
      expect(getWindowIdOf(tracked)).toBe(mintedId);
      // A window this process never tracked has no platform id — the caller falls back rather than
      // being handed a number that names nothing
      expect(getWindowIdOf(fakeWindow(42))).toBeUndefined();

      removeWindow(tracked, mintedId);
      expect(getWindowIdOf(tracked)).toBeUndefined();
    });
  });

  describe('restoring a window’s durable id', () => {
    test('reuses the id it is given instead of minting a fresh one', () => {
      const restoredId = addWindow(fakeWindow(1), 'entry-durable-id');

      expect(restoredId).toBe('entry-durable-id');
      expect(isWindowTracked('entry-durable-id')).toBe(true);
    });

    test('a restored id and a fresh mint never collide', () => {
      const restoredId = addWindow(fakeWindow(1), 'entry-durable-id');
      const freshId = addWindow(fakeWindow(2));

      expect(freshId).not.toBe(restoredId);
    });
  });

  test('reports no target once the last window is removed, so callers fail loudly', () => {
    const only = fakeWindow(1);
    addWindow(only);
    setFocusedWindowId('1');

    removeWindow(only, '1');

    expect(getTargetWindowId()).toBeUndefined();
  });

  test('removing a window leaves the others tracked', () => {
    const first = fakeWindow(1);
    const second = fakeWindow(2);
    addWindow(first);
    addWindow(second);

    removeWindow(first, '1');

    expect(getWindows().map((w) => w.id)).toEqual([2]);
  });

  test('removing a window that was never tracked leaves the list untouched', () => {
    addWindow(fakeWindow(1));

    removeWindow(fakeWindow(99), '99');

    expect(getWindows().map((w) => w.id)).toEqual([1]);
  });

  test('removes a window whose properties can no longer be read', () => {
    // This runs from the `closed` handler, where Electron has already destroyed the window and
    // rejects every property access on it. A throw here escapes before the close is announced and
    // before the window leaves the tracked list, so no process ever hears the close and every later
    // count of open windows includes one that is gone.
    const closing = destroyableWindow(1);
    addWindow(closing.window);
    markWindowReady('1');
    setFocusedWindowId('1');
    addWindow(fakeWindow(2));
    markWindowReady('2');
    closing.destroyForTest();

    expect(() => removeWindow(closing.window, '1')).not.toThrow();

    expect(getWindows().map((window) => window.id)).toEqual([2]);
    expect(getReadyWindowIds()).toEqual(['2']);
    expect(getFocusedWindowId()).toBeUndefined();
  });

  test('answers with the windows tracked at the moment it is asked', () => {
    expect(getWindows().length).toBe(0);

    addWindow(fakeWindow(1));

    expect(getWindows().length).toBe(1);
  });

  test('leaves a window that was destroyed but not yet removed out of the window list', () => {
    // A window is destroyed a moment before its `closed` handler removes it from the list. Callers
    // that hold one of these act on it — restore it, focus it, count it as a reason not to open
    // another window — and acting on a destroyed window throws instead.
    const closing = destroyableWindow(1);
    addWindow(closing.window);
    addWindow(fakeWindow(2));

    closing.destroyForTest();

    expect(getWindows().map((window) => window.id)).toEqual([2]);
  });

  test('leaves a window that was destroyed but not yet removed out of getTrackedWindows', () => {
    // Callers of getTrackedWindows read properties off the window it hands back — e.g. `getTitle()`
    // to list open windows for the user to choose from — and every one of those throws on a window
    // Electron has already destroyed.
    const closing = destroyableWindow(1);
    addWindow(closing.window);
    addWindow(fakeWindow(2));

    closing.destroyForTest();

    expect(getTrackedWindows().map(({ window }) => window.id)).toEqual([2]);
  });

  test('answers routing questions without reading a destroyed window', () => {
    // Every read here happens on paths a closing window's own teardown is waiting on, so a throw
    // does not merely fail the question — it abandons the rest of the close.
    const closing = destroyableWindow(1);
    addWindow(closing.window);
    markWindowReady('1');
    addWindow(fakeWindow(2));
    markWindowReady('2');
    markWindowClosing('1');

    closing.destroyForTest();

    expect(() => getReadyWindowIds()).not.toThrow();
    expect(() => getTargetWindowId()).not.toThrow();
    expect(() => areAllWindowsClosing()).not.toThrow();
    expect(getReadyWindowIds()).toEqual(['1', '2']);
  });

  describe('focus', () => {
    test('answers which window is focused, even when routing goes elsewhere', () => {
      // Consumers that mean "the window the user is looking at" must not be handed the routing
      // target, which deliberately prefers a window that can answer over the focused one
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));

      setFocusedWindowId('2');

      expect(getFocusedWindowId()).toBe('2');
      expect(getTargetWindowId()).toBe('1');
    });

    test('reports no focused window when none has focus', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');

      expect(getFocusedWindowId()).toBeUndefined();
    });

    test('forgets the focused window when it closes', () => {
      const only = fakeWindow(1);
      addWindow(only);
      setFocusedWindowId('1');

      removeWindow(only, '1');

      expect(getFocusedWindowId()).toBeUndefined();
    });
  });

  describe('routing target change event', () => {
    test('announces the window that took focus', () => {
      const heard: (string | undefined)[] = [];
      const firstId = addWindow(fakeWindow(2));
      markWindowReady(firstId);
      const secondId = addWindow(fakeWindow(3));
      markWindowReady(secondId);
      setFocusedWindowId(firstId);
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId(secondId);
      unsubscribe();

      expect(heard).toEqual([secondId]);
    });

    test('stays quiet when the same window is re-reported as focused', () => {
      // Electron re-fires `focus` in situations that do not change which window is focused; service
      // routers re-point their update relay on every emission, so a repeat is real work for nothing
      const heard: (string | undefined)[] = [];
      const onlyId = addWindow(fakeWindow(3));
      setFocusedWindowId(onlyId);
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId(onlyId);
      setFocusedWindowId(onlyId);
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('stays quiet when focus moves between windows that route to the same place', () => {
      // Two windows that are both unready while a third serves the calls: focus churn between them
      // does not change where anything is routed, so subscribers have nothing to re-resolve
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      addWindow(fakeWindow(3));
      setFocusedWindowId('2');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      setFocusedWindowId('3');
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('announces focus being cleared when the last window goes away', () => {
      const only = fakeWindow(3);
      const onlyId = addWindow(only);
      setFocusedWindowId(onlyId);
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      removeWindow(only, onlyId);
      unsubscribe();

      expect(heard).toEqual([undefined]);
    });

    test('announces the re-point when the focused window closes', () => {
      // Routing has to leave the destroyed window on its own: a caller that has to notice the
      // target was the closing window and re-point focus itself is one ordering mistake away from
      // routing to a window that no longer exists
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      removeWindow(closing, '1');
      unsubscribe();

      expect(getTargetWindowId()).toBe('2');
      expect(heard).toEqual(['2']);
    });

    test('has already updated the target by the time listeners run', () => {
      // Listeners re-resolve through `getTargetWindowId()`; emitting before the assignment would
      // hand every one of them the window focus just left
      const targetsSeenByListener: (string | undefined)[] = [];
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setFocusedWindowId('1');
      const unsubscribe = onDidChangeRoutingTarget(() =>
        targetsSeenByListener.push(getTargetWindowId()),
      );

      setFocusedWindowId('2');
      unsubscribe();

      expect(targetsSeenByListener).toEqual(['2']);
    });

    test('a subscriber that throws does not take the close that announced with it', () => {
      // The announcement runs synchronously inside the mutation that triggered it, and the mutation
      // that records a window as closing runs at the top of that window's `close` handler — above
      // the point where the handler decides to suppress Electron's default close. A throw escaping
      // here lets the window close with none of its shutdown work having run, and an async
      // handler's throw is a rejected promise nothing ever reports.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      const unsubscribe = onDidChangeRoutingTarget(() => {
        throw new Error('subscriber blew up');
      });

      // `resetForTesting` unwinds window state but not subscriptions, so this one has to come off
      // even when the assertion fails — otherwise it fires in every test that follows
      try {
        expect(() => markWindowClosing('1')).not.toThrow();
      } finally {
        unsubscribe();
      }

      expect(mocks.loggerError).toHaveBeenCalledOnce();
    });

    test('a subscriber that throws does not take the rest of a closed window’s sweep with it', () => {
      // Removing the window is the first thing the `closed` handler does, and announcing that the
      // routing target moved is the last thing that removal does — the one signal the service
      // routers get that they must stop aiming at a window which no longer exists. A throw escaping
      // the removal skips the rest of the sweep, leaving routing pinned to a destroyed window.
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      const unsubscribe = onDidChangeRoutingTarget(() => {
        throw new Error('subscriber blew up');
      });

      // See the note on the sibling test: an escaping subscriber outlives `resetForTesting`
      try {
        expect(() => removeWindow(closing, '1')).not.toThrow();
      } finally {
        unsubscribe();
      }

      expect(getWindows().map((window) => window.id)).toEqual([2]);
      expect(mocks.loggerError).toHaveBeenCalledOnce();
    });

    test('tells the subscribers queued behind one that threw', () => {
      // Keeping the throw off the teardown path is only half of it: the announcement is the one time
      // subscribers hear that routing moved, and it is never repeated for that change. A subscriber
      // that throws must cost only itself the news, not everything subscribed after it.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      const targetsSeenAfterTheThrow: (string | undefined)[] = [];
      const unsubscribeThrower = onDidChangeRoutingTarget(() => {
        throw new Error('subscriber blew up');
      });
      const unsubscribeListener = onDidChangeRoutingTarget((windowId) => {
        targetsSeenAfterTheThrow.push(windowId);
      });

      // See the note on the sibling tests: an escaping subscriber outlives `resetForTesting`
      try {
        expect(() => markWindowClosing('1')).not.toThrow();
      } finally {
        unsubscribeThrower();
        unsubscribeListener();
      }

      expect(targetsSeenAfterTheThrow).toEqual(['2']);
      expect(mocks.loggerError).toHaveBeenCalledOnce();
    });

    test('stops calling a listener that unsubscribed', () => {
      const heard: (string | undefined)[] = [];
      const onlyId = addWindow(fakeWindow(4));
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      unsubscribe();
      setFocusedWindowId(onlyId);

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
      markWindowReady('1');
      setFocusedWindowId('1');

      addWindow(fakeWindow(2));
      setFocusedWindowId('2');

      expect(getTargetWindowId()).toBe('1');
    });

    test('routes to the window the user was last working in, not the oldest one', () => {
      // Two windows the user has used and a third still starting: the answer is the one they were
      // just in, which creation order cannot tell you
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      setFocusedWindowId('2');

      addWindow(fakeWindow(3));
      setFocusedWindowId('3');

      expect(getTargetWindowId()).toBe('2');
    });

    test('walks past the windows that cannot answer to the most recent one that can', () => {
      // Three windows deep in the focus history, with the one the user was in most recently gone
      // unready — a reload, a crashed renderer. The answer is the next one back that is serving
      // requests, not the front of the history and not the oldest window.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      addWindow(fakeWindow(3));
      markWindowReady('3');
      setFocusedWindowId('1');
      setFocusedWindowId('2');
      setFocusedWindowId('3');

      markWindowNotReady('3');

      expect(getTargetWindowId()).toBe('2');
    });

    test('routes to a ready window the user has never focused', () => {
      // Focus history is empty at startup under a window manager that never reports focus, so the
      // tracked windows are still the fallback
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('2');

      expect(getTargetWindowId()).toBe('2');
    });

    test('hands routing over once the new window is serving requests', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      setFocusedWindowId('2');

      markWindowReady('2');

      expect(getTargetWindowId()).toBe('2');
    });

    test('announces the handover so consumers re-resolve', () => {
      // Routing was deliberately answering with a different window, so anything holding that answer
      // has to be told the moment it stops being true
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      setFocusedWindowId('2');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady('2');
      unsubscribe();

      expect(heard).toEqual(['2']);
    });

    test('stays quiet when a window becomes ready without taking the routing target', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');
      addWindow(fakeWindow(2));
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady('2');
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('announces when an unready window that was holding the target starts serving', () => {
      // Startup with one window: nothing else can take the target, so the ID never changes — but
      // the calls that were failing now succeed, and anything that gave up has to try again
      addWindow(fakeWindow(1));
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady('1');
      unsubscribe();

      expect(heard).toEqual(['1']);
    });

    test('stays quiet when a window that is already ready is marked ready again', () => {
      addWindow(fakeWindow(1));
      setFocusedWindowId('1');
      markWindowReady('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowReady('1');
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('stays quiet when a window that was never ready is marked not ready', () => {
      // The renderer lifecycle events that report a window as unable to serve requests also fire
      // during its first load, before it ever registered anything
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');
      addWindow(fakeWindow(2));
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowNotReady('2');
      unsubscribe();

      expect(heard).toEqual([]);
    });

    test('routes elsewhere when a window stops serving requests', () => {
      // A crashed or reloading renderer keeps its BrowserWindow, but every call routed to it now
      // waits out the network service's registration retry against handlers that are gone
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');

      markWindowNotReady('1');

      expect(getTargetWindowId()).toBe('2');
    });

    test('re-announces when a window recovers, so consumers drop the services that died with it', () => {
      // A reloaded renderer registers brand new scoped services under the same window ID. Consumers
      // compare what they hold by identity, so the recovery has to reach them even though the ID
      // they would route to never changed.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowNotReady('1');
      markWindowReady('1');
      unsubscribe();

      expect(heard).toEqual(['1', '1']);
    });

    test('keeps a window that stopped serving requests tracked, since it is still a window', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');

      markWindowNotReady('1');

      expect(getWindows().map((w) => w.id)).toEqual([1]);
      expect(isWindowReady('1')).toBe(false);
    });

    test('falls back to the focused window before any window is ready', () => {
      // Ordinary startup: nothing can answer yet, so callers should get the honest "the renderer has
      // not started yet" error rather than routing somewhere misleading
      addWindow(fakeWindow(1));
      setFocusedWindowId('1');

      expect(getTargetWindowId()).toBe('1');
    });

    test('a closed window’s id stops answering as ready once it is gone', () => {
      // Ids are never reused, so no later window can inherit this one's readiness. The cleanup
      // still matters: anything that kept the closed id — a queued routing decision, a caller
      // mid-call — would otherwise be told the window is ready and route into nothing. Both
      // assertions below depend on it: `setFocusedWindowId` records whatever id it is handed,
      // tracked or not, so a stale readiness mark would make the routing target prefer the dead
      // focused id over the window that is actually serving.
      const closed = fakeWindow(1);
      const closedId = addWindow(closed);
      markWindowReady(closedId);
      removeWindow(closed, closedId);

      const serving = fakeWindow(2);
      const servingId = addWindow(serving);
      markWindowReady(servingId);
      setFocusedWindowId(closedId);

      expect(isWindowReady(closedId)).toBe(false);
      expect(getTargetWindowId()).toBe(servingId);
    });

    test('lists only the windows a fan-out can get an answer from', () => {
      // A window that has not registered its services cannot own a web view or be showing a
      // notification, so asking it costs a registration-retry wait and a warning to learn nothing
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      addWindow(fakeWindow(3));
      markWindowReady('1');
      markWindowReady('3');

      expect(getReadyWindowIds()).toEqual(['1', '3']);
      expect(isWindowReady('2')).toBe(false);
    });

    test('drops a closed window from the fan-out list', () => {
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowReady('1');

      removeWindow(closing, '1');

      expect(getReadyWindowIds()).toEqual([]);
    });
  });

  describe('telling a window that never started from one that stopped serving', () => {
    // Both are simply "not ready", and the routers have to treat them oppositely: the first has
    // never held a web view and can be passed over, while the second may be holding the very thing
    // a call just named and so has to fail the call rather than be answered for.

    test('does not count a window whose renderer has not registered yet', () => {
      // Every window is in this state for the seconds its renderer takes to start — every
      // `File > New Window`, and the whole of app startup. Counting it there would fail every
      // routed search in the app for the whole of it.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('1');

      expect(getUnreachableWindowIds()).toEqual([]);
    });

    test('counts a window that was serving requests and stopped', () => {
      // A crashed renderer, or a page being replaced. Its web views are still open in a window the
      // user can see, and only that window could ever list them.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('1');
      markWindowReady('2');

      markWindowNotReady('2');

      expect(getUnreachableWindowIds()).toEqual(['2']);
    });

    test('stops counting it once it is serving again', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');
      markWindowNotReady('1');

      markWindowReady('1');

      expect(getUnreachableWindowIds()).toEqual([]);
    });

    test('a closed window’s id is not remembered as one that served and died', () => {
      // A window that was serving and stopped is "unreachable" — a fan-out must account for it.
      // Once the window is actually gone that history must go with it: no later window can hold
      // the id, so keeping the mark would make the closed id count as an unreachable window
      // forever, failing every routed search in the app for the rest of the session.
      const closed = fakeWindow(1);
      const closedId = addWindow(closed);
      markWindowReady(closedId);
      removeWindow(closed, closedId);

      addWindow(fakeWindow(2));

      expect(wasWindowEverReady(closedId)).toBe(false);
      expect(getUnreachableWindowIds()).toEqual([]);
    });

    test('drops a window that stopped serving when it finally goes away', () => {
      const crashed = fakeWindow(1);
      addWindow(crashed);
      markWindowReady('1');
      markWindowNotReady('1');

      removeWindow(crashed, '1');

      expect(getUnreachableWindowIds()).toEqual([]);
    });
  });

  describe('windows nothing will ever run in again', () => {
    // "Unreachable" is a window the reload path is still working on: it stopped serving, but its
    // dock layout is held here and its tabs really do come back, so a fan-out has to refuse to
    // answer for it. Abandoned is the end of that road — the reloads ran out, no page will ever
    // register from this window again — and a state nothing can leave has to stop poisoning every
    // fan-out in the app for the rest of the session.

    test('stops counting a window as unreachable once the reload path gives up on it', () => {
      addWindow(fakeWindow(1));
      markWindowReady('1');
      markWindowNotReady('1');

      markWindowAbandoned('1');

      expect(getUnreachableWindowIds()).toEqual([]);
      expect(getAbandonedWindowIds()).toEqual(['1']);
      expect(isWindowAbandoned('1')).toBe(true);
    });

    test('records a window given up on before its renderer ever registered', () => {
      // A renderer that dies at load never reaches ready, so it was never unreachable either — but
      // it is still tracked, and it is just as dead as the one that had been serving
      addWindow(fakeWindow(1));

      markWindowAbandoned('1');

      expect(getUnreachableWindowIds()).toEqual([]);
      expect(getAbandonedWindowIds()).toEqual(['1']);
    });

    test('a closed window’s id is not remembered as abandoned', () => {
      // Abandonment is reported so callers stop waiting on the window. Once it is gone the mark
      // must go too: no later window can hold the id, so a kept mark would report an abandoned
      // window that does not exist for the rest of the session.
      const abandoned = fakeWindow(1);
      const abandonedId = addWindow(abandoned);
      markWindowReady(abandonedId);
      markWindowNotReady(abandonedId);
      markWindowAbandoned(abandonedId);

      removeWindow(abandoned, abandonedId);
      addWindow(fakeWindow(2));

      expect(isWindowAbandoned(abandonedId)).toBe(false);
      expect(getAbandonedWindowIds()).toEqual([]);
    });

    test('stops treating a window as abandoned once it is serving again', () => {
      // Nothing in the app is expected to revive a given-up window, but a renderer registering is
      // proof it did — a manual reload from the dev tools, an Electron recovery we did not ask for.
      // Whatever the route back, the window is a live window again, and a later crash has to make
      // it unreachable rather than land on a stale terminal mark.
      addWindow(fakeWindow(1));
      markWindowAbandoned('1');

      markWindowReady('1');

      expect(getAbandonedWindowIds()).toEqual([]);
      expect(isWindowAbandoned('1')).toBe(false);
      markWindowNotReady('1');
      expect(getUnreachableWindowIds()).toEqual(['1']);
    });
  });

  describe('raising a window', () => {
    test('takes the flash back down when the activation lands', () => {
      // The flash is for a raise the OS refused. Leaving it up after a successful one flashes the
      // taskbar at the user for a window that is already in front of them — which, hand-tested on
      // native Windows, is ~5 flashes on the ordinary cross-window open.
      const { window, calls } = raisableWindow(1, { isMinimized: true });
      addWindow(window);

      focusWindow('1');

      // Restored first, or a merely focused window stays minimized; flashed before focusing,
      // because Windows does not cancel a flash on activation and one started afterwards could not
      // be taken back down
      expect(calls).toEqual(['restore', 'flashFrame(true)', 'focus', 'flashFrame(false)']);
    });

    test('leaves the flash up when Windows refuses the activation', () => {
      // `focus()` reports neither the refusal nor the success, so `isFocused()` right after it is
      // the only thing that tells them apart. Where the raise was refused the flash is the whole
      // signal the user gets that something happened in another window.
      const { window, calls } = raisableWindow(1, { doesActivationSucceed: false });
      addWindow(window);

      focusWindow('1');

      expect(calls).toEqual(['flashFrame(true)', 'focus']);
    });

    test('does not fail the operation that asked for the raise', () => {
      // A window can be destroyed between the tracked-list lookup and any of these calls. Raising is
      // feedback about where something already happened, so it must not take the operation with it.
      const throwsOnFocus = {
        id: 1,
        isDestroyed: () => false,
        isMinimized: () => false,
        flashFrame: () => {},
        focus: () => {
          throw new TypeError('Object has been destroyed');
        },
      };
      // Constructing a real BrowserWindow needs the Electron runtime; these are the members raising
      // a window touches
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      addWindow(throwsOnFocus as unknown as BrowserWindow);

      expect(() => focusWindow('1')).not.toThrow();
    });

    test('does nothing for a window that is already gone', () => {
      const { window, destroyForTest } = destroyableWindow(1);
      addWindow(window);
      destroyForTest();

      // Every member but `isDestroyed` throws on a destroyed window, so reaching any of them here
      // would show up as a throw rather than as a silent misfire
      expect(() => focusWindow('1')).not.toThrow();
    });
  });

  describe('windows on their way out', () => {
    test('reports whether one specific window is on its way out', () => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));

      markWindowClosing('2');

      expect(isWindowClosing('1')).toBe(false);
      expect(isWindowClosing('2')).toBe(true);
    });

    test('stops reporting a window as closing once it is gone', () => {
      // The flag is this window's own state, keyed by its id, and nothing else takes it off. Left
      // behind it answers for a window that is not there for the rest of the process: anything
      // still holding that id is told it is on its way out, with no close behind that to make it
      // true.
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowClosing('1');

      removeWindow(closing, '1');

      expect(isWindowClosing('1')).toBe(false);
    });

    test('ignores a closing mark for a window that is no longer tracked', () => {
      // A window that has gone away can still have a report in flight — its dock emptying during
      // teardown is answered after it is gone. Recording that mark would add one nothing ever takes
      // off again: the removal that clears this window's marks has already run, so it would sit
      // there for the life of the process, answering 'closing' for a window that is not there and
      // never had a close scheduled for it.
      const gone = fakeWindow(1);
      addWindow(gone);
      removeWindow(gone, '1');

      markWindowClosing('1');

      expect(isWindowClosing('1')).toBe(false);
    });

    test('reports the app going down when the only window closes', () => {
      addWindow(fakeWindow(1));

      markWindowClosing('1');

      expect(areAllWindowsClosing()).toBe(true);
    });

    test('reports the app staying up while another window is not closing', () => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));

      markWindowClosing('1');

      expect(areAllWindowsClosing()).toBe(false);
    });

    test('reports the app going down once every window has begun closing', () => {
      // Two windows closed at the same moment: neither is removed from the tracked list until both
      // handlers are long finished, so counting windows alone makes each of them believe the other
      // one is staying and leave the shutdown tasks to it — and neither runs them
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));

      markWindowClosing('1');
      const isAppGoingDownForFirstWindow = areAllWindowsClosing();
      markWindowClosing('2');
      const isAppGoingDownForSecondWindow = areAllWindowsClosing();

      expect(isAppGoingDownForFirstWindow).toBe(false);
      expect(isAppGoingDownForSecondWindow).toBe(true);
    });

    test('forgets that a window was closing once it is gone', () => {
      // The mark is keyed by window id and nothing else takes it off, so one left behind answers
      // for a window that is not there for the rest of the process — here by making the app look
      // like it is going down while a window the user is working in is still open, so that window's
      // close would run the whole app's shutdown. Electron hands out each id at most once per
      // process, so handing the id to another window is a probe for the mark outliving its window
      // rather than a session that could happen.
      const closing = fakeWindow(1);
      addWindow(closing);
      markWindowClosing('1');
      removeWindow(closing, '1');

      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowClosing('2');

      expect(areAllWindowsClosing()).toBe(false);
    });

    test('routes new work to a window that is staying once one begins closing', () => {
      // A close runs the closing window's shutdown sync first, which is bounded by the sync's own
      // limit rather than by anything quick. For all of that time the window is still focused and
      // still serving, so notifications, dialogs, and newly opened web views land in the window the
      // user is watching disappear.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('1');
      markWindowReady('2');
      setFocusedWindowId('1');

      markWindowClosing('1');

      expect(getTargetWindowId()).toBe('2');
    });

    test('announces routing moving off a window that has begun closing', () => {
      // Routing proxies hold a resolved service for the target window; nothing else tells them the
      // target moved, so without this they go on forwarding into the closing window.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('1');
      markWindowReady('2');
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowClosing('1');
      unsubscribe();

      expect(heard).toEqual(['2']);
    });

    test('keeps routing to the closing window when every window is closing', () => {
      // The closing window's own shutdown work — Send/Receive progress, anything it needs to ask
      // the user — has nowhere else to go during a quit, and the window is alive until its
      // shutdown work finishes. Answering with no window at all would fail those calls outright.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');

      markWindowClosing('1');

      expect(getTargetWindowId()).toBe('1');
    });

    test('prefers a window that can still answer when every window is closing', () => {
      // The user opened a second window and quit before its renderer finished starting. The new
      // window takes OS focus the moment it is shown, so on the quit it is both the focused window
      // and the one window that cannot serve a call — while the first is closing but still serving
      // until its own teardown finishes. A quit reports its progress and asks its questions through
      // this target, so naming the window that cannot answer fails every one of them.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');
      addWindow(fakeWindow(2));
      setFocusedWindowId('2');

      markWindowClosing('1');
      markWindowClosing('2');

      expect(getTargetWindowId()).toBe('1');
    });

    test('announces once as a window goes from closing to no longer serving', () => {
      // A closing window runs both mutations in the same teardown: recorded as closing at the top of
      // its `close` handler, dropped from the routable set once that handler's shutdown work
      // finishes. Routing has already left it at the first of those, so the second must not announce
      // a move that already happened — every announcement makes routing proxies re-resolve and
      // re-notify their subscribers.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      addWindow(fakeWindow(2));
      markWindowReady('2');
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowClosing('1');
      markWindowNotReady('1');
      unsubscribe();

      expect(heard).toEqual(['2']);
    });

    test('announces once as the last window goes from closing to no longer serving', () => {
      // The same pair on a quit, where there is no other window to move to. Routing stays with the
      // closing window while it can still answer — that is where the quit's own progress reports
      // go — and moves exactly once, when it stops being able to.
      addWindow(fakeWindow(1));
      markWindowReady('1');
      setFocusedWindowId('1');
      const heard: (string | undefined)[] = [];
      const unsubscribe = onDidChangeRoutingTarget((windowId) => heard.push(windowId));

      markWindowClosing('1');
      markWindowNotReady('1');
      unsubscribe();

      expect(heard).toEqual(['1']);
    });

    test('keeps a closing window in the fan-out list while it is still there to answer', () => {
      // A window is the only thing that knows what it has open, and the shutdown sync selects the
      // projects it sends by asking every window in this list what editors it has. During a quit
      // every window is marked closing before that selection runs, so dropping them here would make
      // the shutdown sync of a whole quit select nothing and send nothing.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      markWindowReady('1');
      markWindowReady('2');

      markWindowClosing('1');
      markWindowClosing('2');

      expect(getReadyWindowIds()).toEqual(['1', '2']);
    });

    test('does not report the app going down when there is no window to be closing', () => {
      // `every` on an empty list answers `true`, which would report an app on its way down at
      // process start, at the moment the last window is removed, and on every macOS dock
      // reactivation — all of which are moments the app is coming UP with nothing closing at all.
      expect(getWindows().length).toBe(0);

      expect(areAllWindowsClosing()).toBe(false);
    });
  });
});

describe('navigations that end a window’s readiness', () => {
  test('a reload of the page takes the window out of the routable set', () => {
    expect(
      doesNavigationReplaceRendererRegistrations({ isMainFrame: true, isSameDocument: false }),
    ).toBe(true);
  });

  test('a web view loading leaves the window routable', () => {
    // Every web view in the app is an in-page iframe in the renderer's own page, so subframe
    // navigations happen for as long as the window is open and touch nothing it registered. Acting
    // on them takes a fully working window out of the routable set with nothing to put it back —
    // which is what a whole-tab load signal such as `did-start-loading` cannot tell apart.
    expect(
      doesNavigationReplaceRendererRegistrations({ isMainFrame: false, isSameDocument: false }),
    ).toBe(false);
  });

  test('an in-page navigation leaves the window routable', () => {
    // Fragment changes and pushState keep the document, and every script and registration in it
    expect(
      doesNavigationReplaceRendererRegistrations({ isMainFrame: true, isSameDocument: true }),
    ).toBe(false);
  });

  test('an in-page navigation inside a web view leaves the window routable', () => {
    expect(
      doesNavigationReplaceRendererRegistrations({ isMainFrame: false, isSameDocument: true }),
    ).toBe(false);
  });
});
