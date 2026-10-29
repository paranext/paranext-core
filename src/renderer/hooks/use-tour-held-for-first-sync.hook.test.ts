import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FirstSyncState } from 'papi-shared-types';
import { sendCommand } from '@shared/services/command.service';
import { getFirstRunStatus, subscribeToFirstRun } from '@renderer/services/first-run-store';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { useTourHeldForFirstSync } from './use-tour-held-for-first-sync.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@renderer/hooks/papi-hooks', () => ({ useSetting: vi.fn() }));
vi.mock('@renderer/services/first-run-store', () => ({
  getFirstRunStatus: vi.fn(),
  subscribeToFirstRun: vi.fn(),
}));

/** The first-run store listeners the hook registered, so a test can move the status along. */
let firstRunListeners: Set<() => void>;

function setFirstRunStatus(kind: 'loading' | 'app') {
  vi.mocked(getFirstRunStatus).mockReturnValue({ kind });
  firstRunListeners.forEach((listener) => listener());
}

function setFirstSyncState(state: FirstSyncState, isLoading = false) {
  vi.mocked(useSetting).mockReturnValue([state, undefined, () => {}, isLoading]);
}

/** Answers the availability command with `answer`, or rejects when `answer` is an Error. */
function mockAvailability(answer: boolean | Error) {
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation((async () => {
    if (answer instanceof Error) throw answer;
    return answer;
  }) as unknown as typeof sendCommand);
}

describe('useTourHeldForFirstSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    firstRunListeners = new Set();
    vi.mocked(subscribeToFirstRun).mockImplementation((listener) => {
      firstRunListeners.add(listener);
      return () => firstRunListeners.delete(listener);
    });
    vi.mocked(getFirstRunStatus).mockReturnValue({ kind: 'loading' });
    setFirstSyncState('unknown');
    mockAvailability(true);
  });

  it('is held while Send/Receive is available and the first sync is pending', async () => {
    setFirstSyncState('pending');
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe(true);
  });

  it('stays held while availability is still loading', () => {
    setFirstSyncState('pending');
    vi.mocked(sendCommand).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    expect(result.current).toBe(true);
  });

  it('stays held while the setting is still loading', () => {
    setFirstSyncState('unknown', true);
    const { result } = renderHook(() => useTourHeldForFirstSync());
    expect(result.current).toBe(true);
  });

  it('is released when Send/Receive is not available', async () => {
    setFirstSyncState('pending');
    mockAvailability(false);
    const { result } = renderHook(() => useTourHeldForFirstSync());
    expect(result.current).toBe(true);
    await waitFor(() => expect(result.current).toBe(false));
  });

  it('stays held when the first availability check rejects before the app is up', async () => {
    setFirstSyncState('pending');
    mockAvailability(new Error('not registered'));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toBe(true);
  });

  it('stays held when a rejection is followed by an answer of true once the app is up', async () => {
    setFirstSyncState('pending');
    mockAvailability(new Error('not registered'));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await act(async () => {});
    expect(result.current).toBe(true);

    mockAvailability(true);
    act(() => setFirstRunStatus('app'));
    await act(async () => {});

    expect(sendCommand).toHaveBeenCalledTimes(2);
    expect(result.current).toBe(true);
  });

  it('is released when the check rejects again once the app is up', async () => {
    setFirstSyncState('pending');
    mockAvailability(new Error('not registered'));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await act(async () => {});
    expect(result.current).toBe(true);

    act(() => setFirstRunStatus('app'));
    await waitFor(() => expect(result.current).toBe(false));
  });

  it.each<FirstSyncState>(['unknown', 'synced'])(
    'is not held, and does not ask availability, when the state is %s',
    async (state) => {
      setFirstSyncState(state);
      const { result } = renderHook(() => useTourHeldForFirstSync());
      await act(async () => {});
      expect(result.current).toBe(false);
      expect(sendCommand).not.toHaveBeenCalled();
    },
  );

  it('releases as soon as the setting becomes synced', async () => {
    setFirstSyncState('pending');
    const { result, rerender } = renderHook(() => useTourHeldForFirstSync());
    await act(async () => {});
    expect(result.current).toBe(true);
    setFirstSyncState('synced');
    rerender();
    expect(result.current).toBe(false);
  });
});
