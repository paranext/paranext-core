import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS,
  SEND_RECEIVE_UNKNOWN_GRACE_MS,
  useSendReceiveAvailability,
} from './use-send-receive-availability.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

/** Answers the availability command with `answers` in order, repeating the last one thereafter. */
function mockAvailabilityAnswers(...answers: (boolean | Error)[]) {
  let callIndex = -1;
  const implementation = async () => {
    callIndex = Math.min(callIndex + 1, answers.length - 1);
    const answer = answers[callIndex];
    if (answer instanceof Error) throw answer;
    return answer;
  };
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation(implementation as unknown as typeof sendCommand);
}

const countAvailabilityCalls = () => vi.mocked(sendCommand).mock.calls.length;

/** A promise plus the handle to settle it later, for holding a check in flight mid-test. */
function createDeferredAnswer(): { promise: Promise<boolean>; answer: (value: boolean) => void } {
  let answer: (value: boolean) => void = () => {};
  const promise = new Promise<boolean>((resolve) => {
    answer = resolve;
  });
  return { promise, answer };
}

/**
 * Captures the callback the hook subscribes to `platform.onDidReloadExtensions` with, so tests can
 * fire the event. The hook subscribes to exactly one network event, so the last capture is it.
 */
function captureReloadCallback(): () => (() => unknown) | undefined {
  let callback: (() => unknown) | undefined;
  const networkEventImpl = vi.fn((cb: () => unknown) => {
    callback = cb;
    return vi.fn();
  });
  // getNetworkEvent returns PlatformEvent, whose generic signature is incompatible with vi.fn
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  vi.mocked(getNetworkEvent).mockReturnValue(networkEventImpl as any);
  return () => callback;
}

describe('useSendReceiveAvailability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports available once the check says so', async () => {
    mockAvailabilityAnswers(true);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current).toBe(true);
  });

  it('stays unknown through an early "false" and reports available when it flips', async () => {
    // Send/receive activates after the extension that answers this check, so the first
    // answer can be a truthful-but-temporary `false`. Reporting it would hide send/receive UI and
    // bring it back seconds later, so the hook holds at unknown until the answer settles.
    mockAvailabilityAnswers(false, true);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current).toBeUndefined();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });
    expect(result.current).toBe(true);
  });

  it('reports unavailable once "false" outlives the grace period', async () => {
    mockAvailabilityAnswers(false);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS + 1000);
    });

    expect(result.current).toBe(false);
  });

  it('keeps re-checking past the grace period and recovers when send/receive arrives late', async () => {
    // The grace period only bounds how long "unknown" is reported. Re-checks run much longer,
    // because each extension activating ahead of send/receive can take up to the 5s activation
    // timeout — giving up at the grace period would hide it for the session on a slow startup.
    mockAvailabilityAnswers(false);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS + 1000);
    });
    expect(result.current).toBe(false);

    mockAvailabilityAnswers(true);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS / 2);
    });

    expect(result.current).toBe(true);
  });

  it('stops re-checking once the window closes', async () => {
    mockAvailabilityAnswers(false);
    renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS + 1000);
    });
    const callsAfterWindow = countAvailabilityCalls();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS * 3);
    });

    expect(countAvailabilityCalls()).toBe(callsAfterWindow);
  });

  it('never reports unavailable when the check only ever throws', async () => {
    // A throw means the extension host couldn't answer, which says nothing about whether the
    // extension is installed. Callers fail open on unknown, so this keeps send/receive UI visible.
    mockAvailabilityAnswers(new Error('extension host not ready'));
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS + 1000);
    });

    expect(result.current).toBeUndefined();
  });

  it('recovers from a throw when a later re-check answers', async () => {
    mockAvailabilityAnswers(new Error('extension host not ready'), true);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });

    expect(result.current).toBe(true);
  });

  it('restarts the clocks when extensions reload', async () => {
    // Installing send/receive mid-session fires this event, and the first answer after it lands in
    // the same activation gap as at startup. Both clocks are long expired by then, so the event has
    // to restart them — re-checking once would take that `false` as final.
    const getReloadCallback = captureReloadCallback();
    mockAvailabilityAnswers(false);
    const { result } = renderHook(() => useSendReceiveAvailability());

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS + 1000);
    });
    expect(result.current).toBe(false);

    // The extension is now installed, but still answers `false` until it finishes activating
    mockAvailabilityAnswers(false, true);
    const reloadCallback = getReloadCallback();
    if (!reloadCallback) throw new Error('reload callback was not captured');
    await act(async () => {
      reloadCallback();
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_UNKNOWN_GRACE_MS);
    });

    expect(result.current).toBe(true);
  });

  it('does not check at all when disabled', async () => {
    // Power mode has no send/receive UI to gate, so the answer would be pure network traffic.
    mockAvailabilityAnswers(true);
    const { result } = renderHook(() => useSendReceiveAvailability({ enabled: false }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS);
    });

    expect(countAvailabilityCalls()).toBe(0);
    expect(result.current).toBeUndefined();
  });

  it('starts checking when it becomes enabled', async () => {
    mockAvailabilityAnswers(true);
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useSendReceiveAvailability({ enabled }),
      { initialProps: { enabled: false } },
    );

    rerender({ enabled: true });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current).toBe(true);
  });

  it('abandons a check still in flight at unmount instead of re-arming the chain', async () => {
    // Without abandoning the run, the awaited call resolves after teardown, sees nothing has
    // superseded it, and schedules a fresh timer on a dead component — a chain that then re-arms
    // itself every few seconds for the rest of the window with nothing left to cancel it.
    const firstCheck = createDeferredAnswer();
    const implementation = async (): Promise<boolean> => firstCheck.promise;
    // See mockAvailabilityAnswers above for why this asserts through.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(sendCommand).mockImplementation(implementation as unknown as typeof sendCommand);

    const { unmount } = renderHook(() => useSendReceiveAvailability());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    unmount();
    const callsAtUnmount = countAvailabilityCalls();

    await act(async () => {
      firstCheck.answer(false);
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS);
    });

    expect(countAvailabilityCalls()).toBe(callsAtUnmount);
  });

  it('ignores an in-flight answer that resolves after a reload restarted checking', async () => {
    // The check can stay in flight for seconds while the network layer waits for the command to be
    // registered. Without a guard, that stale `false` would land after the reload's `true` and hide
    // send/receive UI that is actually available.
    const getReloadCallback = captureReloadCallback();
    const firstCheck = createDeferredAnswer();
    let callCount = 0;
    const implementation = async (): Promise<boolean> => {
      callCount += 1;
      return callCount === 1 ? firstCheck.promise : true;
    };
    // See mockAvailabilityAnswers above for why this asserts through.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(sendCommand).mockImplementation(implementation as unknown as typeof sendCommand);

    const { result } = renderHook(() => useSendReceiveAvailability());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    const reloadCallback = getReloadCallback();
    if (!reloadCallback) throw new Error('reload callback was not captured');
    await act(async () => {
      reloadCallback();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current).toBe(true);

    // Let the reopened window close while the first check is still in flight, so its stale answer
    // would be taken as final rather than merely triggering another re-check
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS + 1000);
    });

    // The abandoned first check now comes back with the stale answer
    await act(async () => {
      firstCheck.answer(false);
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current).toBe(true);
  });
});
