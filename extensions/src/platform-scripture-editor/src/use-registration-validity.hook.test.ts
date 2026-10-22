// @vitest-environment jsdom

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import {
  MAX_REGISTRATION_CHECK_RETRIES,
  REGISTRATION_CHECK_RETRY_DELAY_MS,
  REGISTRATION_CHECK_TIMEOUT_MS,
  useRegistrationValidity,
} from './use-registration-validity.hook';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn() } },
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

const sendCommand = vi.mocked(papi.commands.sendCommand);

/** Runs every retry: one act per delay, since each retry is scheduled only once the last settles. */
async function runAllRetries() {
  await Array.from({ length: MAX_REGISTRATION_CHECK_RETRIES }).reduce<Promise<void>>(
    async (previous) => {
      await previous;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(REGISTRATION_CHECK_RETRY_DELAY_MS);
      });
    },
    Promise.resolve(),
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useRegistrationValidity', () => {
  it.each([
    [true, 'valid'],
    [false, 'invalid'],
  ] as const)('answers %s from the registration command as %s', async (isValid, expected) => {
    sendCommand.mockResolvedValue(isValid);

    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));

    await waitFor(() => expect(result.current).toBe(expected));
    expect(sendCommand).toHaveBeenCalledWith('paratextRegistration.doesUserHaveValidRegistration');
  });

  it('is undefined until the command answers', () => {
    sendCommand.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));

    expect(result.current).toBeUndefined();
  });

  it('retries a failed check before settling on unknown, not invalid', async () => {
    vi.useFakeTimers();
    sendCommand.mockRejectedValue(new Error('not registered yet'));
    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));
    await act(async () => {});
    expect(result.current).toBeUndefined();

    await runAllRetries();

    expect(sendCommand).toHaveBeenCalledTimes(1 + MAX_REGISTRATION_CHECK_RETRIES);
    expect(result.current).toBe('unknown');
  });

  it('treats a non-boolean answer as unknown', async () => {
    vi.useFakeTimers();
    sendCommand.mockResolvedValue(undefined);
    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));
    await act(async () => {});

    await runAllRetries();

    expect(result.current).toBe('unknown');
  });

  it('answers from a retry that succeeds', async () => {
    vi.useFakeTimers();
    sendCommand.mockRejectedValueOnce(new Error('not registered yet'));
    sendCommand.mockResolvedValue(true);
    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));
    await act(async () => {});

    await act(async () => {
      await vi.advanceTimersByTimeAsync(REGISTRATION_CHECK_RETRY_DELAY_MS);
    });

    expect(result.current).toBe('valid');
  });

  it('gives up on a check that never answers', async () => {
    vi.useFakeTimers();
    sendCommand.mockReturnValueOnce(new Promise(() => {}));
    sendCommand.mockResolvedValue(false);
    const { result } = renderHook(() => useRegistrationValidity({ enabled: true }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(
        REGISTRATION_CHECK_TIMEOUT_MS + REGISTRATION_CHECK_RETRY_DELAY_MS,
      );
    });

    expect(sendCommand).toHaveBeenCalledTimes(2);
    expect(result.current).toBe('invalid');
  });

  it('makes no request while disabled', async () => {
    const { result } = renderHook(() => useRegistrationValidity({ enabled: false }));
    await act(async () => {});

    expect(sendCommand).not.toHaveBeenCalled();
    expect(result.current).toBeUndefined();
  });

  it('keeps a definitive answer instead of asking again when re-enabled', async () => {
    sendCommand.mockResolvedValue(true);
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useRegistrationValidity({ enabled }),
      { initialProps: { enabled: true } },
    );
    await waitFor(() => expect(result.current).toBe('valid'));

    rerender({ enabled: false });
    rerender({ enabled: true });
    await act(async () => {});

    expect(sendCommand).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('valid');
  });

  it('asks afresh after an unknown answer, reporting undefined until it has', async () => {
    vi.useFakeTimers();
    sendCommand.mockRejectedValue(new Error('not registered yet'));
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useRegistrationValidity({ enabled }),
      { initialProps: { enabled: true } },
    );
    await act(async () => {});
    await runAllRetries();
    expect(result.current).toBe('unknown');

    let resolveFreshCheck: (value: boolean) => void = () => {};
    sendCommand.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFreshCheck = resolve;
      }),
    );
    rerender({ enabled: false });
    rerender({ enabled: true });
    expect(result.current).toBeUndefined();

    await act(async () => resolveFreshCheck(true));
    expect(result.current).toBe('valid');
  });

  it('ignores an answer that arrives after it was disabled', async () => {
    let resolveStale: (value: boolean) => void = () => {};
    sendCommand.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveStale = resolve;
      }),
    );
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useRegistrationValidity({ enabled }),
      { initialProps: { enabled: true } },
    );

    rerender({ enabled: false });
    await act(async () => resolveStale(true));

    expect(result.current).toBeUndefined();
  });
});
