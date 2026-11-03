// @vitest-environment jsdom
/* eslint-disable no-null/no-null -- the wire may send null, which the guard must accept */
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSyncQueue } from './use-sync-queue.hook';

const { mockSendCommand, mockGetNetworkEvent, emitter } = vi.hoisted(() => {
  const listeners = new Set<(payload: unknown) => void>();
  return {
    mockSendCommand: vi.fn(),
    mockGetNetworkEvent: vi.fn(),
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
    network: { getNetworkEvent: mockGetNetworkEvent },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const IDLE = { waitingProjectIds: [], runningProjectIds: [] };

describe('useSyncQueue', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
    mockGetNetworkEvent.mockReset();
    mockGetNetworkEvent.mockReturnValue(emitter.event);
    emitter.listeners.clear();
  });

  it('reports an empty queue until the first answer', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useSyncQueue(true));
    expect(result.current).toEqual(IDLE);
  });

  it('reports the seeded snapshot', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3', 'ABC'] });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() =>
      expect(result.current).toEqual({ waitingProjectIds: ['RH3', 'ABC'], runningProjectIds: [] }),
    );
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSyncQueue');
  });

  it('accepts null waitingProjectIds as an empty queue', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: null });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual(IDLE);
  });

  it('treats a rejecting command as an empty queue', async () => {
    mockSendCommand.mockRejectedValue(new Error('not registered'));
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual(IDLE);
  });

  it('follows the change event', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(result.current.waitingProjectIds).toEqual(['RH3']));
    expect(mockGetNetworkEvent).toHaveBeenCalledWith('paratextBibleSendReceive.onSyncQueueChanged');
    act(() => emitter.emit({ waitingProjectIds: ['XYZ'] }));
    expect(result.current).toEqual({ waitingProjectIds: ['XYZ'], runningProjectIds: [] });
    act(() => emitter.emit({ waitingProjectIds: [] }));
    expect(result.current).toEqual(IDLE);
  });

  it('ignores a malformed event and keeps the last known queue', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(result.current.waitingProjectIds).toEqual(['RH3']));
    act(() => emitter.emit({ waitingProjectIds: 'RH3' }));
    expect(result.current).toEqual({ waitingProjectIds: ['RH3'], runningProjectIds: [] });
  });

  it('reports an empty queue when the only answer is malformed', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: [42] });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual(IDLE);
  });

  it.each([false, undefined])(
    'issues no read and reports idle when availability is %s',
    async (availability) => {
      mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
      const { result } = renderHook(() => useSyncQueue(availability));
      await act(async () => {});
      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(result.current).toEqual(IDLE);
    },
  );

  it('reads once availability becomes true', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
    const { result, rerender } = renderHook(({ available }) => useSyncQueue(available), {
      initialProps: { available: undefined as boolean | undefined },
    });
    await act(async () => {});
    expect(mockSendCommand).not.toHaveBeenCalled();
    rerender({ available: true });
    await waitFor(() => expect(result.current.waitingProjectIds).toEqual(['RH3']));
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSyncQueue');
  });

  it('exposes the running ids', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: [], runningProjectIds: ['RH9'] });
    const { result } = renderHook(() => useSyncQueue(true));
    await waitFor(() => expect(result.current.runningProjectIds).toEqual(['RH9']));
  });
});
