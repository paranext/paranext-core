// @vitest-environment jsdom
/* eslint-disable no-null/no-null -- the wire may send null, which the guard must accept */
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SYNC_ACTIVITY_RECHECK_INTERVAL_MS } from 'platform-bible-utils/experimental';
import { useSyncActivity } from './use-sync-activity.hook';

const { mockSendCommand, emitter } = vi.hoisted(() => {
  const listeners = new Set<(payload: unknown) => void>();
  return {
    mockSendCommand: vi.fn(),
    emitter: {
      listeners,
      event: (listener: (payload: unknown) => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      emit: (payload: unknown) => listeners.forEach((listener) => listener(payload)),
    },
  };
});

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
    network: { getNetworkEvent: vi.fn(() => emitter.event) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe('useSyncActivity', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
    emitter.listeners.clear();
  });

  it('reports idle until the first answer', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useSyncActivity());
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], resourceIds: [] });
  });

  it('reports the seeded snapshot', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: ['RH3'], resourceIds: [] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() =>
      expect(result.current).toEqual({ isSyncing: true, projectIds: ['RH3'], resourceIds: [] }),
    );
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSyncActivity');
  });

  it('accepts null projectIds', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: null });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() =>
      expect(result.current).toEqual({ isSyncing: true, projectIds: [], resourceIds: [] }),
    );
  });

  it('treats a rejecting command as idle', async () => {
    mockSendCommand.mockRejectedValue(new Error('not registered'));
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], resourceIds: [] });
  });

  it('follows the change event', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: ['RH3'], resourceIds: [] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() => expect(result.current.isSyncing).toBe(true));
    act(() => emitter.emit({ isSyncing: false }));
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], resourceIds: [] });
  });

  it('stays busy when a malformed event follows a busy seed', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: ['RH3'], resourceIds: [] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() => expect(result.current.isSyncing).toBe(true));
    act(() => emitter.emit({ isSyncing: 'yes' }));
    expect(result.current).toEqual({ isSyncing: true, projectIds: ['RH3'], resourceIds: [] });
  });

  it('never marks projects busy for an idle snapshot that carries ids', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: false, projectIds: ['RH3'], resourceIds: [] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() =>
      expect(result.current).toEqual({ isSyncing: false, projectIds: [], resourceIds: [] }),
    );
  });

  describe('recheck while syncing', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('re-reads every 30 seconds until the backend answers idle', async () => {
      mockSendCommand.mockResolvedValue({ isSyncing: true });
      const { result } = renderHook(() => useSyncActivity());
      await act(async () => {});
      expect(result.current.isSyncing).toBe(true);
      expect(mockSendCommand).toHaveBeenCalledTimes(1);

      mockSendCommand.mockResolvedValue({ isSyncing: false });
      await act(async () => {
        await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
      });
      expect(mockSendCommand).toHaveBeenCalledTimes(2);
      expect(result.current.isSyncing).toBe(false);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
      });
      expect(mockSendCommand).toHaveBeenCalledTimes(2);
    });
  });
});
