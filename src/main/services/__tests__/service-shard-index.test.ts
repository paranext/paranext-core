import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
// `vi.mock` calls are hoisted above these imports, so the index resolves against the stubs below
import { createServiceShardIndex } from '@main/services/service-shard-index';

const mocks = vi.hoisted(() => ({
  networkObjectGet: vi.fn(),
  onDidCreateNetworkObject: vi.fn(),
  onDidDisposeNetworkObject: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));

const SHARD_OBJECT_TYPE = 'testServiceShard';

/** An index over the shards of one service, resolving them the way a network object router does */
function createIndex(resolveShard = mocks.networkObjectGet) {
  return createServiceShardIndex<{ id: string }>({
    objectType: SHARD_OBJECT_TYPE,
    resolveShard,
  });
}

/** Announce a network object the way `network-object.service` does when one is registered */
function announceCreate(details: Partial<NetworkObjectDetails> & { id: string }) {
  mocks.onDidCreateNetworkObject.mock.calls.forEach(([listener]) => {
    listener({ objectType: 'object', functionNames: [], ...details });
  });
}

/** Announce that a network object went away, by the id it was registered under */
function announceDispose(networkObjectId: string) {
  mocks.onDidDisposeNetworkObject.mock.calls.forEach(([listener]) => {
    listener(networkObjectId);
  });
}

/** Announce a service shard of the type under test, registered by the given window */
function announceShard(windowId: number, networkObjectId = `TestService-${windowId}`) {
  announceCreate({
    id: networkObjectId,
    objectType: SHARD_OBJECT_TYPE,
    attributes: { windowId },
  });
}

describe('service shard index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.networkObjectGet.mockImplementation(async (id: string) => ({ id }));
  });

  test('resolves a window shard by the id that window announced, never by a built name', () => {
    const index = createIndex();
    // An id that has nothing to do with the window id, so a name built from the window id could
    // not possibly find it
    announceShard(1, 'some-unguessable-shard-id');

    return expect(index.getShard(1)).resolves.toEqual({ id: 'some-unguessable-shard-id' });
  });

  test('discovers a second window that registers after the index was created', async () => {
    const index = createIndex();
    announceShard(1);
    expect(await index.getShard(2)).toBeUndefined();

    announceShard(2);

    expect(await index.getShard(2)).toEqual({ id: 'TestService-2' });
  });

  test('forgets a shard once its network object announces that it is gone', async () => {
    // A window's shard dies with the window; the disposal announcement is the only thing that says
    // so, and a router that kept serving the dead shard would route calls into a closed window
    const index = createIndex();
    announceShard(1);
    announceShard(2);

    announceDispose('TestService-2');

    expect(await index.getShard(2)).toBeUndefined();
    expect(await index.getShard(1)).toEqual({ id: 'TestService-1' });
  });

  test('ignores network objects that are not this service`s shards', async () => {
    // Filtering on the exact object type is the point: every window registers several shards, and
    // resolving another service`s shard as this one would forward calls to the wrong object
    const index = createIndex();

    announceCreate({
      id: 'OtherService-1',
      objectType: 'otherServiceShard',
      attributes: { windowId: 1 },
    });
    announceCreate({ id: 'SomethingElse' });

    expect(await index.getShard(1)).toBeUndefined();
    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
  });

  test('ignores a shard that does not say which window it belongs to', async () => {
    // Nothing can be routed to a shard whose window is unknown, and guessing from its id is exactly
    // what typed discovery exists to stop
    const index = createIndex();

    announceCreate({ id: 'TestService-1', objectType: SHARD_OBJECT_TYPE });
    announceCreate({
      id: 'TestService-2',
      objectType: SHARD_OBJECT_TYPE,
      attributes: { windowId: 'two' },
    });

    expect(await index.getShard(1)).toBeUndefined();
    expect(await index.getShard(2)).toBeUndefined();
  });

  test('announces the window whose shard just registered', () => {
    // Startup wiring keys window readiness off this rather than off a network object id it parses
    const index = createIndex();
    const readyWindowIds: number[] = [];
    index.onDidAddShard((windowId) => readyWindowIds.push(windowId));

    announceShard(3);
    announceCreate({ id: 'Unrelated', objectType: 'somethingElse', attributes: { windowId: 4 } });

    expect(readyWindowIds).toEqual([3]);
  });

  test('serves the newest registration when a window`s renderer registers again', async () => {
    // A renderer that reloads registers a brand new shard under the same window-scoped id; the
    // index has to hand back the new one rather than the page that is gone
    const index = createIndex();
    announceShard(1, 'TestService-1');
    announceDispose('TestService-1');
    announceShard(1, 'TestService-1');

    expect(await index.getShard(1)).toEqual({ id: 'TestService-1' });
  });

  test('resolves through the given resolver, for shards that are data providers', async () => {
    // A data provider shard is a network object too, but it has to be resolved through the data
    // provider service so the caller gets the provider proxy rather than the raw object
    const resolveShard = vi.fn(async (id: string) => ({ resolvedBy: 'dataProviderService', id }));
    const index = createServiceShardIndex({ objectType: SHARD_OBJECT_TYPE, resolveShard });
    announceShard(1, 'TestService-1-data');

    expect(await index.getShard(1)).toEqual({
      resolvedBy: 'dataProviderService',
      id: 'TestService-1-data',
    });
    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
  });
});
