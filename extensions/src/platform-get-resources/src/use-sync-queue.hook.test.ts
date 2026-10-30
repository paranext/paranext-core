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

describe('useSyncQueue', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
    mockGetNetworkEvent.mockReset();
    mockGetNetworkEvent.mockReturnValue(emitter.event);
    emitter.listeners.clear();
  });

  it('reports an empty queue until the first answer', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useSyncQueue());
    expect(result.current).toEqual({ waitingProjectIds: [] });
  });

  it('reports the seeded snapshot', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3', 'ABC'] });
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(result.current).toEqual({ waitingProjectIds: ['RH3', 'ABC'] }));
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSyncQueue');
  });

  it('accepts null waitingProjectIds as an empty queue', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: null });
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual({ waitingProjectIds: [] });
  });

  it('treats a rejecting command as an empty queue', async () => {
    mockSendCommand.mockRejectedValue(new Error('not registered'));
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual({ waitingProjectIds: [] });
  });

  it('follows the change event', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(result.current.waitingProjectIds).toEqual(['RH3']));
    expect(mockGetNetworkEvent).toHaveBeenCalledWith('paratextBibleSendReceive.onSyncQueueChanged');
    act(() => emitter.emit({ waitingProjectIds: ['XYZ'] }));
    expect(result.current).toEqual({ waitingProjectIds: ['XYZ'] });
    act(() => emitter.emit({ waitingProjectIds: [] }));
    expect(result.current).toEqual({ waitingProjectIds: [] });
  });

  it('ignores a malformed event and keeps the last known queue', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(result.current.waitingProjectIds).toEqual(['RH3']));
    act(() => emitter.emit({ waitingProjectIds: 'RH3' }));
    expect(result.current).toEqual({ waitingProjectIds: ['RH3'] });
  });

  it('reports an empty queue when the only answer is malformed', async () => {
    mockSendCommand.mockResolvedValue({ waitingProjectIds: [42] });
    const { result } = renderHook(() => useSyncQueue());
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    await act(async () => {});
    expect(result.current).toEqual({ waitingProjectIds: [] });
  });
});
