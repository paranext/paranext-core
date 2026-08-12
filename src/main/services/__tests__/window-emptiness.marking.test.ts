import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the util resolves against the stub below
import { createWindowEmptinessHandler } from '@main/services/window-emptiness.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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

  test('an emptied-by-removal close marks the window closing at decision time', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(2);

    const response = handler(1, 'emptied-by-removal');

    expect(response).toEqual({ action: 'closing' });
    // Marked synchronously with the decision — before the deferred close timer has even run — so
    // nobody's last-window arithmetic can still count this window in the gap
    expect(markWindowClosing).toHaveBeenCalledWith(1);
    expect(closeWindow).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledWith(1);
  });

  test('born-empty never marks', () => {
    countWindows.mockReturnValue(3);

    expect(handler(1, 'born-empty')).toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
  });

  test('invalid arguments never mark', () => {
    countWindows.mockReturnValue(3);

    expect(handler('not-a-number', 'emptied-by-removal')).toEqual({ action: 'open-home' });
    expect(handler(1, 'some-other-reason')).toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
  });

  test('a repeat report neither marks again nor schedules a second close', () => {
    vi.useFakeTimers();
    countWindows.mockReturnValue(3);

    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });
    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'closing' });

    expect(markWindowClosing).toHaveBeenCalledTimes(1);

    vi.runAllTimers();

    expect(closeWindow).toHaveBeenCalledTimes(1);
  });

  test('the last window is answered open-home and never marked', () => {
    countWindows.mockReturnValue(1);

    expect(handler(1, 'emptied-by-removal')).toEqual({ action: 'open-home' });

    expect(markWindowClosing).not.toHaveBeenCalled();
    expect(closeWindow).not.toHaveBeenCalled();
  });
});

describe('a pending-content window is not a reason to close the last real window', () => {
  test('window A alone with a pending-content window is answered open-home, not closing', () => {
    // Mirrors the composition wired in main.ts: `countWindows` excludes both closing and
    // pending-content windows from the tracked set, so a window whose content has not yet arrived
    // can never stand in as a second "real" window in this arithmetic.
    vi.useFakeTimers();
    const trackedIds = [1, 2];
    const closingIds = new Set<number>();
    const pendingContentIds = new Set<number>([2]);
    const countWindows = vi.fn(
      () => trackedIds.filter((id) => !closingIds.has(id) && !pendingContentIds.has(id)).length,
    );
    const closeWindow = vi.fn();
    const markWindowClosing = vi.fn((windowId: number) => closingIds.add(windowId));
    const handler = createWindowEmptinessHandler({ countWindows, closeWindow, markWindowClosing });

    const response = handler(1, 'emptied-by-removal');

    expect(response).toEqual({ action: 'open-home' });
    expect(markWindowClosing).not.toHaveBeenCalledWith(1);

    vi.runAllTimers();
    expect(closeWindow).not.toHaveBeenCalled();
  });
});
