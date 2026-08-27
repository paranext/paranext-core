import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the resolver resolves against the stubs below
import {
  createTargetShardResolver,
  createTargetWindowShardResolver,
} from '@main/services/target-shard-resolver.util';
import type { ServiceShardIndex } from '@main/services/service-shard-index';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  loggerWarn: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: mocks.loggerWarn, error: vi.fn() },
}));

/** A shard index over the given windows, resolving each window's shard with the given function */
function shardIndex(
  shardWindowIds: number[],
  getShard: (windowId: number) => Promise<unknown>,
): ServiceShardIndex<unknown> {
  return {
    onDidAddShard: vi.fn(() => () => true),
    onDidRemoveShard: vi.fn(() => () => true),
    getShard: vi.fn(getShard),
    getShardNetworkObjectId: vi.fn((windowId: number) =>
      shardWindowIds.includes(windowId) ? `shard-of-window-${windowId}` : undefined,
    ),
    getShardWindowIds: vi.fn(() => shardWindowIds),
  };
}

/**
 * A shard index no window has registered with yet, plus the lever a test pulls to announce one —
 * the state a window is in between becoming routable and its every shard being announced.
 */
function shardIndexAwaitingAnnouncement(getShard: (windowId: number) => Promise<unknown>) {
  const indexedWindowIds: number[] = [];
  const listeners: ((windowId: number) => void)[] = [];
  const index: ServiceShardIndex<unknown> = {
    onDidAddShard: vi.fn((listener: (windowId: number) => void) => {
      listeners.push(listener);
      return () => true;
    }),
    onDidRemoveShard: vi.fn(() => () => true),
    getShard: vi.fn(async (windowId: number) =>
      indexedWindowIds.includes(windowId) ? getShard(windowId) : undefined,
    ),
    getShardNetworkObjectId: vi.fn((windowId: number) =>
      indexedWindowIds.includes(windowId) ? `shard-of-window-${windowId}` : undefined,
    ),
    getShardWindowIds: vi.fn(() => [...indexedWindowIds]),
  };
  return {
    index,
    announceShard(windowId: number) {
      indexedWindowIds.push(windowId);
      listeners.forEach((listener) => listener(windowId));
    },
  };
}

describe('target shard resolver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('answers with the shard of the window calls currently route to', async () => {
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([1, 2], async (windowId) => ({ servedBy: windowId })),
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    expect(await resolve()).toEqual({ servedBy: 2 });
  });

  test('re-resolves per call rather than pinning the window it first answered with', async () => {
    // A router follows the user between windows; caching the first answer would pin every later
    // call to whichever window happened to be the target at startup
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([1, 2], async (windowId) => ({ servedBy: windowId })),
    );

    expect(await resolve()).toEqual({ servedBy: 1 });
    mocks.getTargetWindowId.mockReturnValue(2);
    expect(await resolve()).toEqual({ servedBy: 2 });
  });

  test('refuses to route rather than guessing when there is no window to route to', async () => {
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([], async () => undefined),
    );
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(resolve()).rejects.toThrow('No windows available to route TestService call');
  });

  test('waits for a shard that is moments behind rather than failing the window', async () => {
    // Routing picks a window as soon as it registers its WINDOW service, and a renderer starts all
    // of its shards together — so a call fired at a window in its first instants can arrive
    // between the two. Failing on first look makes that ordinary skew an error.
    const { index, announceShard } = shardIndexAwaitingAnnouncement(async (windowId) => ({
      servedBy: windowId,
    }));
    const resolve = createTargetShardResolver('TestService', index);

    const resolving = resolve();
    announceShard(1);

    expect(await resolving).toEqual({ servedBy: 1 });
  });

  test('says the renderer may still be starting when no shard is announced in time', async () => {
    vi.useFakeTimers();
    try {
      const resolve = createTargetShardResolver(
        'TestService',
        shardIndex([], async () => undefined),
      );

      const resolving = resolve();
      // Take hold of the rejection before advancing the clock. It happens while the timers run, and
      // a promise that rejects with nothing attached to it yet is an unhandled rejection — which
      // Vitest reports as an error against the whole file even though every test in it passed.
      resolving.catch(() => undefined);

      // The wait is bounded: a shard whose own start failed is never announced, and the call has to
      // fail visibly rather than hang on an announcement that is not coming
      await vi.runAllTimersAsync();

      await expect(resolving).rejects.toThrow(
        'TestService for window 1 is not available. The renderer may not have started yet.',
      );
      expect(mocks.loggerWarn).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  test('does not blame startup timing when the window registered a shard that would not resolve', async () => {
    // The lookup reports a genuinely absent object, a request that timed out, and a handler that
    // threw as the same `undefined`. Which one happened is not knowable here — but the window did
    // register, so "the renderer may not have started yet" is the one thing it cannot be, and
    // saying that is how an hour-old wedged window ends up looking like a normal startup race.
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([1], async () => undefined),
    );

    await expect(resolve()).rejects.toThrow(
      'TestService for window 1 is registered but could not be resolved.',
    );
    expect(mocks.loggerWarn).toHaveBeenCalledWith(expect.stringContaining('window 1'));
  });

  test('lets a failing lookup say what went wrong instead of flattening it into "not available"', async () => {
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([1], async () => {
        throw new Error('the websocket went away mid-lookup');
      }),
    );

    await expect(resolve()).rejects.toThrow('the websocket went away mid-lookup');
  });
});

describe('target shard resolver that reports which window answered', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('answers with the window alongside its shard', async () => {
    // A caller that acts on what one window answered has to come back to that same window, and the
    // routing target can move in between — so the window it resolved has to travel with the shard
    // rather than being derived a second time
    const resolve = createTargetWindowShardResolver(
      'TestService',
      shardIndex([1, 2], async (windowId) => ({ servedBy: windowId })),
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    expect(await resolve()).toEqual({ windowId: 2, shard: { servedBy: 2 } });
  });

  test('refuses to route rather than guessing when there is no window to route to', async () => {
    const resolve = createTargetWindowShardResolver(
      'TestService',
      shardIndex([], async () => undefined),
    );
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(resolve()).rejects.toThrow('No windows available to route TestService call');
  });
});
