import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
// `vi.mock` calls are hoisted above these imports, so the util resolves against the stub below
import { createWindowEmptinessHandler } from '@main/services/window-emptiness.util';
import {
  addWindow,
  countWindowsThatCouldBeTheLastOne,
  markWindowAbandoned,
  markWindowClosing as markWindowClosingInTracker,
  resetForTesting,
  setWindowPendingContentPredicate,
} from '@main/services/window-state.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime. `vi.mock` is hoisted above the
// imports above, so the static import resolves against this stub.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

/** Stand-in for a BrowserWindow — the tracker only reads `id` and `isDestroyed` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; these are the only members the
  // tracker touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

describe('marking a window closing at the moment its close is decided', () => {
  let countWindows: ReturnType<typeof vi.fn<() => number>>;
  let closeWindow: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  let markWindowClosing: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  let handler: ReturnType<typeof createWindowEmptinessHandler>;

  beforeEach(() => {
    vi.useRealTimers();
    countWindows = vi.fn();
    closeWindow = vi.fn();
    markWindowClosing = vi.fn();
    handler = createWindowEmptinessHandler({ countWindows, closeWindow, markWindowClosing });
  });

  test('an emptied-by-removal close marks the window closing at decision time', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);

    const response = await handler(1, 'emptied-by-removal');

    expect(response).toEqual({ action: 'closing' });
    // Marked synchronously with the decision — before the deferred close timer has even run — so
    // nobody's last-window arithmetic can still count this window in the gap
    expect(markWindowClosing).toHaveBeenCalledWith(1);
    expect(closeWindow).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledWith(1);
  });

  test('born-empty never marks', async () => {
    countWindows.mockReturnValue(3);

    await expect(handler(1, 'born-empty')).resolves.toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
  });

  test('invalid arguments never mark', async () => {
    countWindows.mockReturnValue(3);

    await expect(handler('not-a-number', 'emptied-by-removal')).resolves.toEqual({
      action: 'open-home',
    });
    await expect(handler(1, 'some-other-reason')).resolves.toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
  });

  test('a repeat report neither marks again nor schedules a second close', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(3);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

    expect(markWindowClosing).toHaveBeenCalledTimes(1);

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('the last window is answered open-home and never marked', async () => {
    countWindows.mockReturnValue(1);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
    expect(closeWindow).not.toHaveBeenCalled();
  });
});

describe('a pending-content window is not a reason to close the last real window', () => {
  beforeEach(() => {
    // The tracker holds process-wide state, and these suites drive the real one
    resetForTesting();
  });

  test('window A alone with a pending-content window is answered open-home, not closing', async () => {
    // Runs on the count main.ts wires, not a copy of it: a window whose content has not yet arrived
    // can never stand in as a second "real" window in this arithmetic.
    vi.useFakeTimers();
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));
    setWindowPendingContentPredicate((windowId) => windowId === 2);
    const closeWindow = vi.fn();
    const markWindowClosing = vi.fn(markWindowClosingInTracker);
    const handler = createWindowEmptinessHandler({
      countWindows: countWindowsThatCouldBeTheLastOne,
      closeWindow,
      markWindowClosing,
    });

    const response = await handler(1, 'emptied-by-removal');

    expect(response).toEqual({ action: 'open-home' });
    expect(markWindowClosing).not.toHaveBeenCalledWith(1);

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalled();
  });
});

describe('an abandoned window is not a reason to close the last working window', () => {
  beforeEach(() => {
    // The tracker holds process-wide state, and these suites drive the real one
    resetForTesting();
  });

  test('window A alone with an abandoned window is answered open-home, not closing', async () => {
    // Runs on the count main.ts wires, not a copy of it. A window whose renderer died and will
    // never be reloaded is still on screen and still tracked — deliberately, since closing it would
    // rewrite the persisted window layout without it — but nothing runs in it any more, so counting
    // it as a second real window would close the only window the user can still work in.
    vi.useFakeTimers();
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));
    markWindowAbandoned(2);
    const closeWindow = vi.fn();
    const markWindowClosing = vi.fn(markWindowClosingInTracker);
    const handler = createWindowEmptinessHandler({
      countWindows: countWindowsThatCouldBeTheLastOne,
      closeWindow,
      markWindowClosing,
    });

    const response = await handler(1, 'emptied-by-removal');

    expect(response).toEqual({ action: 'open-home' });
    expect(markWindowClosing).not.toHaveBeenCalledWith(1);

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalled();
  });
});
