import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FirstSyncState } from 'papi-shared-types';
import { sendCommand } from '@shared/services/command.service';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { useTourHeldForFirstSync } from './use-tour-held-for-first-sync.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@renderer/hooks/papi-hooks', () => ({ useSetting: vi.fn() }));

function setFirstSyncState(state: FirstSyncState) {
  vi.mocked(useSetting).mockReturnValue([state, undefined, () => {}, false]);
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
    setFirstSyncState('unknown');
    mockAvailability(true);
  });

  it('is true while Send/Receive is available and the first sync is pending', async () => {
    setFirstSyncState('pending');
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(result.current).toBe(true));
  });

  it('is false while availability is still loading', () => {
    setFirstSyncState('pending');
    vi.mocked(sendCommand).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    expect(result.current).toBe(false);
  });

  it('is false when Send/Receive is not available', async () => {
    setFirstSyncState('pending');
    mockAvailability(false);
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    expect(result.current).toBe(false);
  });

  it('is false when the availability check rejects', async () => {
    setFirstSyncState('pending');
    mockAvailability(new Error('not registered'));
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(sendCommand).toHaveBeenCalled());
    expect(result.current).toBe(false);
  });

  it.each<FirstSyncState>(['unknown', 'synced'])('is false when the state is %s', async (state) => {
    setFirstSyncState(state);
    const { result } = renderHook(() => useTourHeldForFirstSync());
    await Promise.resolve();
    expect(result.current).toBe(false);
  });

  it('releases as soon as the setting becomes synced', async () => {
    setFirstSyncState('pending');
    const { result, rerender } = renderHook(() => useTourHeldForFirstSync());
    await waitFor(() => expect(result.current).toBe(true));
    setFirstSyncState('synced');
    rerender();
    expect(result.current).toBe(false);
  });
});
