import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { SYNC_SEED_RETRY_WINDOW_MS } from '@renderer/services/seed-with-retry.util';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { useUnsyncedChanges } from './use-unsynced-changes.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  // `network-object.service` reaches this module through a namespace import and subscribes at
  // module scope, so the factory has to carry this export even though no test here fires it.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const CHANGED_EVENT = 'paratextBibleSendReceive.onUnsyncedChangesChanged';

/**
 * Captures the callback the hook subscribes to the unsynced-changes event with, so a test can fire
 * it. Must be installed before `renderHook`.
 */
function captureEvent() {
  const callbacks = new Map<string, (payload: unknown) => void>();
  vi.mocked(getNetworkEvent).mockImplementation(
    (eventName: string) =>
      // getNetworkEvent returns PlatformEvent, whose generic signature (parameterized per event
      // name) is incompatible with a single vi.fn implementation shared across every event name.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      vi.fn((cb: (payload: unknown) => void) => {
        callbacks.set(eventName, cb);
        return vi.fn();
      }) as never,
  );
  return {
    emit: (payload: unknown) => {
      const cb = callbacks.get(CHANGED_EVENT);
      if (!cb) throw new Error('onUnsyncedChangesChanged callback was not captured');
      act(() => cb(payload));
    },
  };
}

/** Makes `getUnsyncedChanges` resolve with `answer` after `delayMs` of fake time. */
function mockSeed(answer: unknown, delayMs = 0) {
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation((async () => {
    if (delayMs > 0)
      await new Promise((resolve) => {
        setTimeout(resolve, delayMs);
      });
    return answer;
  }) as unknown as typeof sendCommand);
}

async function flush(ms = 0) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe('useUnsyncedChanges', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('seeds from getUnsyncedChanges', async () => {
    mockSeed({ projectIds: ['proj1'] });
    captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    expect(result.current).toBeUndefined();
    await flush();

    expect(sendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getUnsyncedChanges');
    expect(result.current).toEqual(['PROJ1']);
  });

  it('applies onUnsyncedChangesChanged events', async () => {
    mockSeed({ projectIds: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current).toEqual([]);

    emit({ projectIds: ['A', 'B'] });

    expect(result.current).toEqual(['A', 'B']);
  });

  it('event beats a late seed', async () => {
    mockSeed({ projectIds: ['STALE'] }, 5000);
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    emit({ projectIds: ['FRESH'] });
    await flush(6000);

    expect(result.current).toEqual(['FRESH']);
  });

  it('malformed payload is ignored', async () => {
    mockSeed({ projectIds: ['PROJ1'] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current).toEqual(['PROJ1']);

    emit({ projectIds: 'x' });

    expect(result.current).toEqual(['PROJ1']);
    expect(logger.warn).toHaveBeenCalled();
  });

  it('rejecting command past the retry window yields undefined', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('extension host not ready'));
    captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush(SYNC_SEED_RETRY_WINDOW_MS + 1000);

    expect(result.current).toBeUndefined();
    // More than the mount attempt: the seed kept retrying inside the window.
    expect(vi.mocked(sendCommand).mock.calls.length).toBeGreaterThan(1);
  });

  it('returns the same array instance when the set is unchanged', async () => {
    mockSeed({ projectIds: ['proj1', 'proj2'] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    const before = result.current;
    expect(before).toEqual(['PROJ1', 'PROJ2']);

    emit({ projectIds: ['PROJ2', 'proj1'] });

    expect(result.current).toBe(before);
  });
});
