import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the factory resolves against the stubs below
import {
  createTargetShardResolver,
  registerServiceRouter,
} from '@main/services/service-router.factory';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.networkObjectSet },
}));

/** A service with one method a router can plainly forward and one it has to implement itself */
interface TestService {
  onDidSomething: (callback: () => void) => () => void;
  greet(name: string): Promise<string>;
  broadcast(message: string): Promise<void>;
}

/** A window's shard of {@link TestService} */
function shardGreeting(greeting: string): TestService {
  return {
    onDidSomething: () => () => {},
    greet: vi.fn(async (name: string) => `${greeting} ${name}`),
    broadcast: vi.fn(async () => {}),
  };
}

/**
 * Register a router for {@link TestService} and hand back what it published.
 *
 * `broadcast` stands in for a method whose behaviour is not a plain forward, and `onDidSomething`
 * for an event — the two shapes that stay the router's own.
 */
async function registerTestRouter(resolveTargetShard: () => Promise<TestService>) {
  const onDidSomething = vi.fn(() => () => {});
  const broadcast = vi.fn(async () => {});
  await registerServiceRouter({
    genericName: 'TestService',
    forwardedMethodNames: ['greet'],
    resolveTargetShard,
    overrides: { onDidSomething, broadcast },
  });
  // The registered object is whatever the factory handed the network object service; the mock is
  // untyped, so naming its type here is the only way to call the router the way a consumer would
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const router = mocks.networkObjectSet.mock.calls[0][1] as TestService;
  return { router, onDidSomething, broadcast };
}

describe('service router factory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.networkObjectSet.mockResolvedValue(undefined);
  });

  test('claims the generic name, which is the one consumers call', async () => {
    await registerTestRouter(async () => shardGreeting('hello'));

    expect(mocks.networkObjectSet.mock.calls[0][0]).toBe('TestService');
  });

  test('forwards a declared method to the target shard and answers with what it said', async () => {
    const shard = shardGreeting('hello');
    const { router } = await registerTestRouter(async () => shard);

    await expect(router.greet('world')).resolves.toBe('hello world');
    expect(shard.greet).toHaveBeenCalledWith('world');
  });

  test('re-resolves the target on every call, so routing follows focus', async () => {
    // The router holds no cached shard: the window a call should run in can change between two
    // calls without anything telling the router about it
    let target = shardGreeting('from window 1');
    const { router } = await registerTestRouter(async () => target);
    await router.greet('a');

    target = shardGreeting('from window 2');

    await expect(router.greet('b')).resolves.toBe('from window 2 b');
  });

  test('publishes the overrides as given, so events and fan-outs stay the router’s own', async () => {
    const { router, onDidSomething, broadcast } = await registerTestRouter(async () =>
      shardGreeting('hello'),
    );

    await router.broadcast('to everyone');

    expect(broadcast).toHaveBeenCalledWith('to everyone');
    expect(router.onDidSomething).toBe(onDidSomething);
  });

  test('publishes every member of the service, since the network object registers what it finds', async () => {
    // `networkObjectService.set` enumerates the object's real function names to register
    // `object:{id}.{fn}` for each; a member missing here is a method consumers cannot call
    const { router } = await registerTestRouter(async () => shardGreeting('hello'));

    expect(Object.keys(router).sort()).toEqual(['broadcast', 'greet', 'onDidSomething']);
  });

  test('passes the documentation on, since the generic name is the documented one', async () => {
    const docs = { summary: 'The test service' };

    await registerServiceRouter({
      genericName: 'TestService',
      forwardedMethodNames: ['greet'],
      resolveTargetShard: async () => shardGreeting('hello'),
      overrides: { onDidSomething: vi.fn(), broadcast: vi.fn(async () => {}) },
      docs,
    });

    expect(mocks.networkObjectSet.mock.calls[0][4]).toBe(docs);
  });

  describe('resolving the target shard', () => {
    test('resolves the shard of the window calls should currently run in', async () => {
      const shard = shardGreeting('hello');
      const resolve = createTargetShardResolver('TestService', async (windowId) =>
        windowId === 1 ? shard : undefined,
      );

      await expect(resolve()).resolves.toBe(shard);
    });

    test('refuses to route rather than guessing when there is no window', async () => {
      mocks.getTargetWindowId.mockReturnValue(undefined);
      const resolve = createTargetShardResolver('TestService', async () => undefined);

      await expect(resolve()).rejects.toThrow('No windows available to route TestService call');
    });

    test('says which window could not answer when its renderer has not registered yet', async () => {
      // The window is there and is where calls should go; it just has not finished starting, and a
      // caller that hears so can tell it apart from there being no window at all
      const resolve = createTargetShardResolver('TestService', async () => undefined);

      await expect(resolve()).rejects.toThrow(
        'TestService for window 1 is not available. The renderer may not have started yet.',
      );
    });
  });
});
