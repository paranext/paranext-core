import { StrictMode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as resolver from '@renderer/services/resolve-registration-validity';
import {
  publishRegistrationValidity,
  resetRegistrationValidityStore,
} from '@renderer/services/registration-validity-store';
import { useRegistrationValidity } from './use-registration-validity.hook';

// The real store is exercised here on purpose — the point of this hook is the wiring between React
// and that store. Only the resolver (the external boundary) is mocked, so its 3x15s retry machinery
// never runs in the suite.
vi.mock('@renderer/services/resolve-registration-validity', () => ({
  resolveRegistrationValidity: vi.fn(),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockResolveReg = vi.mocked(resolver.resolveRegistrationValidity);

beforeEach(() => {
  vi.clearAllMocks();
  resetRegistrationValidityStore();
});

describe('useRegistrationValidity', () => {
  it('resolves the validity on mount and returns it', async () => {
    mockResolveReg.mockResolvedValue('invalid');

    const { result } = renderHook(() => useRegistrationValidity());

    expect(result.current.validity).toBe('unknown');
    await waitFor(() => expect(result.current.validity).toBe('invalid'));
  });

  it('re-renders when a validity is published from elsewhere (the first-run gate)', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    const { result } = renderHook(() => useRegistrationValidity());
    await waitFor(() => expect(result.current.validity).toBe('invalid'));

    act(() => publishRegistrationValidity('valid'));

    expect(result.current.validity).toBe('valid');
  });

  it('probes only once even under StrictMode double-invoked effects', async () => {
    mockResolveReg.mockResolvedValue('valid');

    const { result } = renderHook(() => useRegistrationValidity(), { wrapper: StrictMode });

    await waitFor(() => expect(result.current.validity).toBe('valid'));
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });

  it('does not probe again when a validity has already been resolved', async () => {
    mockResolveReg.mockResolvedValue('valid');
    const first = renderHook(() => useRegistrationValidity());
    await waitFor(() => expect(first.result.current.validity).toBe('valid'));

    const second = renderHook(() => useRegistrationValidity());

    expect(second.result.current.validity).toBe('valid');
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });

  it('swallows a rejected probe rather than leaving an unhandled rejection', async () => {
    mockResolveReg.mockRejectedValue(new Error('boom'));
    const onUnhandled = vi.fn();
    process.on('unhandledRejection', onUnhandled);

    try {
      const { result } = renderHook(() => useRegistrationValidity());
      await waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
      // Give any unhandled rejection a turn of the event loop to surface.
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(result.current.validity).toBe('unknown');
      expect(onUnhandled).not.toHaveBeenCalled();
    } finally {
      process.off('unhandledRejection', onUnhandled);
    }
  });
});

describe('useRegistrationValidity in demo mode', () => {
  // Demo mode's contract is that it never touches the real registration backend, so the reminder
  // has to opt out of probing rather than quietly breaking that promise.
  beforeEach(() => localStorage.setItem('platform-bible.firstRunDemoMode', 'true'));
  afterEach(() => localStorage.clear());

  it('does not probe on mount', async () => {
    mockResolveReg.mockResolvedValue('invalid');

    const { result } = renderHook(() => useRegistrationValidity());
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(mockResolveReg).not.toHaveBeenCalled();
    expect(result.current.validity).toBe('unknown');
  });

  it('does not probe when a caller asks for a forced refresh', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    const { result } = renderHook(() => useRegistrationValidity());

    act(() => result.current.refresh());
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(mockResolveReg).not.toHaveBeenCalled();
  });
});

describe('useRegistrationValidity refresh', () => {
  it('forces a re-probe past the session cache', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    const { result } = renderHook(() => useRegistrationValidity());
    await waitFor(() => expect(result.current.validity).toBe('invalid'));
    mockResolveReg.mockResolvedValue('valid');

    act(() => result.current.refresh());

    await waitFor(() => expect(result.current.validity).toBe('valid'));
    expect(mockResolveReg).toHaveBeenCalledTimes(2);
  });
});
