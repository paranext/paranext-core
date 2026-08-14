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

  test('a window born empty docks Home rather than closing, even as the only window', async () => {
    countWindows.mockReturnValue(1);

    await expect(handler(1, 'born-empty')).resolves.toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('a window born empty docks Home even when other windows are open', async () => {
    countWindows.mockReturnValue(3);

    await expect(handler(1, 'born-empty')).resolves.toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('a window emptied by removal is told closing, and its close is deferred until after the response goes out', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);

    await expect(handler(7, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    // Not yet: the response must reach the renderer before the window tears down
    expect(closeWindow).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledWith(7);
  });

  test('the last window emptied by removal docks Home instead of closing, since closing it would exit the app', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(1);

    await expect(handler(7, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('two windows emptying back-to-back are never both told to close', async () => {
    // `countWindows` still reports both windows live for the whole exchange — neither has actually
    // closed yet — so the handler must count the first window's own answer to keep the second from
    // also being told to close, which would auto-close the app's last two windows at once.
    vi.useFakeTimers();
    const total = 2;
    countWindows.mockImplementation(() => total - markedIds.size);

    const firstResponse = handler(1, 'emptied-by-removal');
    const secondResponse = handler(2, 'emptied-by-removal');

    await expect(firstResponse).resolves.toEqual({ action: 'closing' });
    await expect(secondResponse).resolves.toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(1);
    expect(closeWindow).not.toHaveBeenCalledWith(2);
    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('a window emptying while an earlier one is still closing is not also told to close', async () => {
    // Closing a window runs an intercepted close whose async close tasks can take seconds, and the
    // window is open — and counted — for all of that. Forgetting it the moment its close is handed
    // out would tell the second window it is one of two, closing the app's last two windows at once.
    vi.useFakeTimers();
    const total = 2;
    countWindows.mockImplementation(() => total - markedIds.size);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(1);

    await expect(handler(2, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalledWith(2);
  });

  test('a window reporting again while it closes is told closing without a second close', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(3);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

    vi.runAllTimers();
    // A second close on a window already closing trips main's force-close escape hatch, abandoning
    // the close-time work the first close started
    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('once a closing window is really gone, the window left behind docks Home', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    vi.runAllTimers();

    handler.handleWindowGone(1);
    countWindows.mockReturnValue(1);

    await expect(handler(2, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });
    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalledWith(2);
  });

  test('a window that has gone away stops counting against the windows that are left', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    vi.runAllTimers();

    handler.handleWindowGone(1);
    // Window 1 is gone and window 3 has opened since, so there are two windows open again
    countWindows.mockReturnValue(2);

    await expect(handler(3, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
    vi.runAllTimers();
    expect(closeWindow).toHaveBeenCalledWith(3);
  });

  test('a close that throws is warned about rather than left to escape the deferred callback', async () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);
    closeWindow.mockImplementation(() => {
      throw new Error('the window was already destroyed');
    });

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

    expect(() => vi.runAllTimers()).not.toThrow();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });

  test('a non-number window id answers open-home and logs a warning, never closing', async () => {
    countWindows.mockReturnValue(2);

    await expect(handler('not-a-number', 'emptied-by-removal')).resolves.toEqual({
      action: 'open-home',
    });
    expect(closeWindow).not.toHaveBeenCalled();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });

  test('an unrecognized reason answers open-home and logs a warning, never closing', async () => {
    countWindows.mockReturnValue(2);

    await expect(handler(1, 'some-other-reason')).resolves.toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalled();
    expect(mocks.loggerWarn).toHaveBeenCalled();
  });
});

describe('re-checking whether a window is still empty before closing it', () => {
  let countWindows: ReturnType<typeof vi.fn<() => number>>;
  let closeWindow: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  let markWindowClosing: ReturnType<typeof vi.fn<(windowId: number) => void>>;
  let markedIds: Set<number>;
  let hasContentArrivedSinceEmptyReport: ReturnType<
    typeof vi.fn<(windowId: number) => Promise<boolean>>
  >;

  /** Build a handler over the mocks above, with the given number of windows open */
  function handlerOverWindows(windowCount: number) {
    countWindows.mockImplementation(() => windowCount - markedIds.size);
    return createWindowEmptinessHandler({
      countWindows,
      closeWindow,
      markWindowClosing,
      hasContentArrivedSinceEmptyReport,
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    countWindows = vi.fn();
    closeWindow = vi.fn();
    markedIds = new Set();
    markWindowClosing = vi.fn((windowId: number) => markedIds.add(windowId));
    hasContentArrivedSinceEmptyReport = vi.fn(async () => false);
  });

  test('a window that gained content after reporting is told to stay, untouched', async () => {
    // The report is a snapshot of a moment that has already passed by the time it is answered: an
    // adopt or an open can land in the window while the report is in flight, and closing it then
    // takes content the user is looking at with it.
    hasContentArrivedSinceEmptyReport.mockResolvedValue(true);
    const handler = handlerOverWindows(2);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'stay' });

    expect(markWindowClosing).not.toHaveBeenCalled();
    expect(closeWindow).not.toHaveBeenCalled();
  });

  test('a window that is still empty is closed, and is marked only after the re-check', async () => {
    const handler = handlerOverWindows(2);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

    expect(hasContentArrivedSinceEmptyReport).toHaveBeenCalledWith(1);
    expect(markWindowClosing).toHaveBeenCalledWith(1);
  });

  test('the mark is never written before the re-check answers, since nothing may unmark it', async () => {
    // `markWindowClosing` writes the shared registry the user's own close handler also writes, so
    // a mark made before the answer could not be taken back if the answer turned out to be "stay"
    let markedBeforeRecheck = false;
    hasContentArrivedSinceEmptyReport.mockImplementation(async () => {
      markedBeforeRecheck = markWindowClosing.mock.calls.length > 0;
      return true;
    });
    const handler = handlerOverWindows(2);

    await handler(1, 'emptied-by-removal');

    expect(markedBeforeRecheck).toBe(false);
  });

  test('the last window standing answers open-home without spending a re-check on it', async () => {
    const handler = handlerOverWindows(1);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });

    expect(hasContentArrivedSinceEmptyReport).not.toHaveBeenCalled();
  });

  test('a window whose last sibling starts closing during the re-check docks Home', async () => {
    // Decisions from this handler are serialized against each other, but a window the user closes
    // with its own X button marks itself closing on a path that serialization does not cover. So
    // the window count can drop while a re-check is in flight, and a close decided on the count
    // from before it closes the only window that would have been left — which takes the
    // application down, the very outcome the last-window branch exists to prevent.
    hasContentArrivedSinceEmptyReport.mockImplementation(async () => {
      markedIds.add(2);
      return false;
    });
    const handler = handlerOverWindows(2);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'open-home' });

    expect(closeWindow).not.toHaveBeenCalled();
    expect(markWindowClosing).not.toHaveBeenCalled();
  });

  test('a re-check that throws proceeds with the close', async () => {
    // The report was the renderer's own word about its own dock; a re-check that could not be made
    // is no reason to leave an empty window standing
    hasContentArrivedSinceEmptyReport.mockRejectedValue(new Error('the window is unreachable'));
    const handler = handlerOverWindows(2);

    await expect(handler(1, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

    expect(markWindowClosing).toHaveBeenCalledWith(1);
  });

  test('a re-check that never answers proceeds with the close once its bound elapses', async () => {
    vi.useFakeTimers();
    try {
      hasContentArrivedSinceEmptyReport.mockImplementation(
        () =>
          new Promise<boolean>(() => {
            // A window that never answers at all is what the bound exists for
          }),
      );
      const handler = handlerOverWindows(2);

      const decision = handler(1, 'emptied-by-removal');
      await vi.runAllTimersAsync();

      await expect(decision).resolves.toEqual({ action: 'closing' });
      expect(closeWindow).toHaveBeenCalledWith(1);
    } finally {
      vi.useRealTimers();
    }
  });

  test('two windows reporting empty at once are never both told to close', async () => {
    // The zero-window bug this whole re-check could otherwise create: both windows read "2 windows
    // exist" while neither has closed yet, and both are told to close. One decision at a time is
    // what makes the second read the first one's mark.
    let releaseFirstRecheck: (hasContentArrived: boolean) => void = () => {};
    hasContentArrivedSinceEmptyReport.mockImplementation(
      async (windowId: number) =>
        new Promise<boolean>((resolve) => {
          if (windowId === 1) releaseFirstRecheck = resolve;
          else resolve(false);
        }),
    );
    const handler = handlerOverWindows(2);

    const firstDecision = handler(1, 'emptied-by-removal');
    const secondDecision = handler(2, 'emptied-by-removal');
    await vi.waitFor(() => expect(hasContentArrivedSinceEmptyReport).toHaveBeenCalledWith(1));
    // The second window's decision has not begun: it may not read the window count until the first
    // decision has finished writing its answer into it
    expect(hasContentArrivedSinceEmptyReport).not.toHaveBeenCalledWith(2);
    releaseFirstRecheck(false);

    await expect(firstDecision).resolves.toEqual({ action: 'closing' });
    await expect(secondDecision).resolves.toEqual({ action: 'open-home' });
    expect(closeWindow).not.toHaveBeenCalledWith(2);
  });

  test('a decision that fails leaves the next one able to run', async () => {
    // Every decision links off the one before it, so a rejection left on that chain would reject
    // every report for the rest of the session
    countWindows.mockImplementationOnce(() => {
      throw new Error('the window list could not be read');
    });
    const handler = handlerOverWindows(2);

    await expect(handler(1, 'emptied-by-removal')).rejects.toThrow('could not be read');

    await expect(handler(2, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });
  });
});

describe('a close decided outside this handler', () => {
  test('a window already closing by another path is answered closing without a second close', async () => {
    // The user closed the window with its close button; the close path marked it closing in the
    // shared registry, not through this handler. Its dock empties during the close-time teardown
    // and reports in — a fresh close scheduled here would be a second close on a closing window,
    // which trips main's force-close escape hatch and abandons the close-time work (the shutdown
    // sync) the first close started.
    vi.useFakeTimers();
    try {
      const closingIds = new Set<number>([7]);
      const countWindows = vi.fn(() => 2);
      const closeWindow = vi.fn();
      const markWindowClosing = vi.fn((windowId: number) => closingIds.add(windowId));
      const handler = createWindowEmptinessHandler({
        countWindows,
        closeWindow,
        markWindowClosing,
        isWindowClosing: (windowId: number) => closingIds.has(windowId),
      });

      await expect(handler(7, 'emptied-by-removal')).resolves.toEqual({ action: 'closing' });

      vi.runAllTimers();
      expect(closeWindow).not.toHaveBeenCalled();
      expect(markWindowClosing).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  test('a window closing by another path is told closing even when it reports born-empty', async () => {
    // A close in flight reloads nothing and docks nothing: telling a window mid-teardown to open
    // Home puts a tab — and a web view provider's side effects with it — into a window that is on
    // its way out. Which reason the report carries says nothing about that; the close does.
    const closingIds = new Set<number>([7]);
    const closeWindow = vi.fn();
    const markWindowClosing = vi.fn((windowId: number) => closingIds.add(windowId));
    const handler = createWindowEmptinessHandler({
      countWindows: () => 2,
      closeWindow,
      markWindowClosing,
      isWindowClosing: (windowId: number) => closingIds.has(windowId),
    });

    await expect(handler(7, 'born-empty')).resolves.toEqual({ action: 'closing' });

    expect(closeWindow).not.toHaveBeenCalled();
    expect(markWindowClosing).not.toHaveBeenCalled();
  });
});
