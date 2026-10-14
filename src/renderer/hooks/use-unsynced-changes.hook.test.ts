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

  it('seeds from getUnsyncedChanges, normalizing both sets', async () => {
    mockSeed({ toSend: ['a'], toReceive: ['B', 'b'] });
    captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    expect(result.current).toBeUndefined();
    await flush();

    expect(sendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getUnsyncedChanges');
    expect(result.current).toEqual({ toSend: ['A'], toReceive: ['B'], isRechecking: false });
  });

  it('applies onUnsyncedChangesChanged events', async () => {
    mockSeed({ toSend: [], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current).toEqual({ toSend: [], toReceive: [], isRechecking: false });

    emit({ toSend: ['B', 'A'], toReceive: ['C'] });

    expect(result.current).toEqual({ toSend: ['A', 'B'], toReceive: ['C'], isRechecking: false });
  });

  it('event beats a late seed', async () => {
    mockSeed({ toSend: ['STALE'], toReceive: ['STALE'] }, 5000);
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    emit({ toSend: ['FRESH'], toReceive: [] });
    await flush(6000);

    expect(result.current).toEqual({ toSend: ['FRESH'], toReceive: [], isRechecking: false });
  });

  it('malformed payload is ignored', async () => {
    mockSeed({ toSend: ['PROJ1'], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current).toEqual({ toSend: ['PROJ1'], toReceive: [], isRechecking: false });

    emit({ toSend: ['PROJ2'], toReceive: 'x' });

    expect(result.current).toEqual({ toSend: ['PROJ1'], toReceive: [], isRechecking: false });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('a payload whose list holds a non-string id is ignored', async () => {
    mockSeed({ toSend: ['PROJ1'], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();

    emit({ toSend: ['PROJ2', 7], toReceive: [] });

    expect(result.current).toEqual({ toSend: ['PROJ1'], toReceive: [], isRechecking: false });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('a payload carrying only a single project list is treated as malformed', async () => {
    mockSeed({ projectIds: ['A'] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current).toBeUndefined();
    expect(logger.warn).toHaveBeenCalledTimes(1);

    emit({ projectIds: ['A'] });

    expect(result.current).toBeUndefined();
    expect(logger.warn).toHaveBeenCalledTimes(2);
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

  it('returns the same instance when both sets are unchanged', async () => {
    mockSeed({ toSend: ['proj1', 'proj2'], toReceive: ['proj3'] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    const before = result.current;
    expect(before).toEqual({
      toSend: ['PROJ1', 'PROJ2'],
      toReceive: ['PROJ3'],
      isRechecking: false,
    });

    emit({ toSend: ['PROJ2', 'proj1'], toReceive: ['PROJ3', 'proj3'] });

    expect(result.current).toBe(before);
  });

  it('returns a new instance when only one set changes', async () => {
    mockSeed({ toSend: ['PROJ1'], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    const before = result.current;

    emit({ toSend: ['PROJ1'], toReceive: ['PROJ2'] });

    expect(result.current).not.toBe(before);
    expect(result.current).toEqual({
      toSend: ['PROJ1'],
      toReceive: ['PROJ2'],
      isRechecking: false,
    });
  });

  it('reports isRechecking from events: true, then false', async () => {
    // U1
    mockSeed({ toSend: [], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    expect(result.current?.isRechecking).toBe(false);

    emit({ toSend: ['PROJ1'], toReceive: [], isRechecking: true });
    expect(result.current?.isRechecking).toBe(true);

    emit({ toSend: ['PROJ1'], toReceive: [], isRechecking: false });
    expect(result.current?.isRechecking).toBe(false);
  });

  it('reads an absent or non-boolean isRechecking as false and still applies the lists', async () => {
    // U2
    mockSeed({ toSend: [], toReceive: [] });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    emit({ toSend: ['PROJ1'], toReceive: [], isRechecking: true });
    expect(result.current?.isRechecking).toBe(true);

    emit({ toSend: ['PROJ2'], toReceive: [] });
    expect(result.current).toEqual({ toSend: ['PROJ2'], toReceive: [], isRechecking: false });

    emit({ toSend: ['PROJ3'], toReceive: [], isRechecking: true });
    emit({ toSend: ['PROJ4'], toReceive: [], isRechecking: 'yes' });
    expect(result.current).toEqual({ toSend: ['PROJ4'], toReceive: [], isRechecking: false });
  });

  it('keeps the list arrays when only isRechecking changes', async () => {
    // U3
    mockSeed({ toSend: ['PROJ1'], toReceive: ['PROJ2'], isRechecking: true });
    const { emit } = captureEvent();

    const { result } = renderHook(() => useUnsyncedChanges());
    await flush();
    const before = result.current;

    emit({ toSend: ['proj1'], toReceive: ['proj2'], isRechecking: false });

    expect(result.current).not.toBe(before);
    expect(result.current?.isRechecking).toBe(false);
    expect(result.current?.toSend).toBe(before?.toSend);
    expect(result.current?.toReceive).toBe(before?.toReceive);
  });
});
