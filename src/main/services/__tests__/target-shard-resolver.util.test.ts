import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the resolver resolves against the stubs below
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import type { ServiceShardIndex } from '@main/services/service-shard-index';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  loggerWarn: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: mocks.loggerWarn, error: vi.fn() },
}));

/** A shard index over the given windows, resolving each window's shard with the given function */
function shardIndex(
  shardWindowIds: number[],
  getShard: (windowId: number) => Promise<unknown>,
): ServiceShardIndex<unknown> {
  return {
    onDidAddShard: vi.fn(),
    getShard: vi.fn(getShard),
    getShardWindowIds: vi.fn(() => shardWindowIds),
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

  test('says the renderer may still be starting when the window has registered no shard', async () => {
    const resolve = createTargetShardResolver(
      'TestService',
      shardIndex([], async () => undefined),
    );

    await expect(resolve()).rejects.toThrow(
      'TestService for window 1 is not available. The renderer may not have started yet.',
    );
    expect(mocks.loggerWarn).not.toHaveBeenCalled();
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
