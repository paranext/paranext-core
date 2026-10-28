// @vitest-environment jsdom
/* eslint-disable no-null/no-null -- the wire may send null, which the guard must accept */
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isSyncActivitySnapshot, useSyncActivity } from './use-sync-activity.hook';

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

describe('isSyncActivitySnapshot', () => {
  it.each([
    [{ isSyncing: true }, true],
    [{ isSyncing: false, projectIds: ['A'] }, true],
    [{ isSyncing: true, projectIds: null }, true],
    [{ isSyncing: true, projectIds: [1] }, false],
    [{ isSyncing: true, projectIds: 'A' }, false],
    [{ isSyncing: 'yes' }, false],
    [{}, false],
    [null, false],
    ['text', false],
  ])('judges %j as %s', (value, expected) => {
    expect(isSyncActivitySnapshot(value)).toBe(expected);
  });
});

describe('useSyncActivity', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
    emitter.listeners.clear();
  });

  it('reports idle until the first answer', () => {
    mockSendCommand.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useSyncActivity());
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], isKnown: false });
  });

  it('reports the seeded snapshot', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() =>
      expect(result.current).toEqual({ isSyncing: true, projectIds: ['RH3'], isKnown: true }),
    );
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSyncActivity');
  });

  it('accepts null projectIds', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: null });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() =>
      expect(result.current).toEqual({ isSyncing: true, projectIds: [], isKnown: true }),
    );
  });

  it('treats a rejecting command as idle', async () => {
    mockSendCommand.mockRejectedValue(new Error('not registered'));
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() => expect(mockSendCommand).toHaveBeenCalled());
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], isKnown: false });
  });

  it('follows the change event', async () => {
    mockSendCommand.mockResolvedValue({ isSyncing: true, projectIds: ['RH3'] });
    const { result } = renderHook(() => useSyncActivity());
    await waitFor(() => expect(result.current.isSyncing).toBe(true));
    act(() => emitter.emit({ isSyncing: false }));
    expect(result.current).toEqual({ isSyncing: false, projectIds: [], isKnown: true });
  });
});
