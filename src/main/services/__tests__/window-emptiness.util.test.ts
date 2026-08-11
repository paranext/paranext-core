import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the util resolves against the stub below
import { createWindowEmptinessHandler } from '@main/services/window-emptiness.util';

const mocks = vi.hoisted(() => ({ loggerWarn: vi.fn() }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: mocks.loggerWarn, error: vi.fn() },
}));

describe('deciding what happens to a window that reports its dock empty', () => {
  let countWindows: ReturnType<typeof vi.fn<() => number>>;
  let closeWindow: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  let markWindowClosing: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  // Ids the handler has marked closing through `markWindowClosing`, so a scenario that needs
  // `countWindows` to honor a decision made earlier in the same test can read them back
  let markedIds: Set<number>;
  let handler: ReturnType<typeof createWindowEmptinessHandler>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    countWindows = vi.fn();
    closeWindow = vi.fn();
    markedIds = new Set();
    markWindowClosing = vi.fn((windowId: number) => markedIds.add(windowId));
    handler = createWindowEmptinessHandler({ countWindows, closeWindow, markWindowClosing });
  });

  test('a window born empty docks Home rather than closing, even as the only window', () => {
    countWindows.mockReturnValue(1);

    expect(handler(1, 'born-empty')).toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('a window born empty docks Home even when other windows are open', () => {
    countWindows.mockReturnValue(3);

    expect(handler(1, 'born-empty')).toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('a window emptied by removal is told closing, and its close is deferred until after the response goes out', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);

    expect(handler(7, 'emptied-by-removal')).toEqual({ action: 'closing' });
    // Not yet: the response must reach the renderer before the window tears down
    expect(closeWindow).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledWith(7);
  });

  test('the last window emptied by removal docks Home instead of closing, since closing it would exit the app', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(1);

    expect(handler(7, 'emptied-by-removal')).toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('two windows emptying back-to-back are never both told to close', () => {
    // `countWindows` still reports both windows live for the whole exchange — neither has actually
    // closed yet — so the handler must count the first window's own answer to keep the second from
    // also being told to close, which would auto-close the app's last two windows at once.
    vi.useFakeTimers();
    const total = 2;
    countWindows.mockImplementation(() => total - markedIds.size);

    const firstResponse = handler(1, 'emptied-by-removal');
    const secondResponse = handler(2, 'emptied-by-removal');

    expect(firstResponse).toEqual({ action: 'closing' });
    expect(secondResponse).toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(1);
    expect(closeWindow).not.toHaveBeenCalledWith(2);
    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('a window emptying while an earlier one is still closing is not also told to close', () => {
    // Closing a window runs an intercepted close whose async close tasks can take seconds, and the
    // window is open — and counted — for all of that. Forgetting it the moment its close is handed
    // out would tell the second window it is one of two, closing the app's last two windows at once.
    vi.useFakeTimers();
    const total = 2;
    countWindows.mockImplementation(() => total - markedIds.size);

    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });
    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(1);

    expect(handler(2, 'emptied-by-removal')).toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalledWith(2);
  });

  test('a window reporting again while it closes is told closing without a second close', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(3);

    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });
    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });

    vi.runAllTimers();
    // A second close on a window already closing trips main's force-close escape hatch, abandoning
    // the close-time work the first close started
    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('once a closing window is really gone, the window left behind docks Home', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });
    vi.runAllTimers();

    handler.handleWindowGone(1);
    countWindows.mockReturnValue(1);

    expect(handler(2, 'emptied-by-removal')).toEqual({ action: 'open-home' });
    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalledWith(2);
  });

  test('a window that has gone away stops counting against the windows that are left', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });
    vi.runAllTimers();

    handler.handleWindowGone(1);
    // Window 1 is gone and window 3 has opened since, so there are two windows open again
    countWindows.mockReturnValue(2);

    expect(handler(3, 'emptied-by-removal')).toEqual({ action: 'closing' });
    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(3);
  });

  test('a close that throws is warned about rather than left to escape the deferred callback', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    closeWindow.mockImplementation(() => {
      throw new Error('the window was already destroyed');
    });

    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });

    expect(() => vi.runAllTimers()).not.toThrow();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });

  test('a non-number window id answers open-home and logs a warning, never closing', () => {
    countWindows.mockReturnValue(2);

    expect(handler('not-a-number', 'emptied-by-removal')).toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });

  test('an unrecognized reason answers open-home and logs a warning, never closing', () => {
    countWindows.mockReturnValue(2);

    expect(handler(1, 'some-other-reason')).toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });
});
