import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
// `vi.mock` calls are hoisted above these imports, so the index resolves against the stubs below
import { createServiceShardIndex } from '@main/services/service-shard-index';

const mocks = vi.hoisted(() => ({
  networkObjectGet: vi.fn(),
  onDidCreateNetworkObject: vi.fn(),
  onDidDisposeNetworkObject: vi.fn(),
  loggerInfo: vi.fn(),
  loggerWarn: vi.fn(),
  loggerError: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: mocks.loggerInfo, warn: mocks.loggerWarn, error: mocks.loggerError },
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

  test('says which shard it dropped for not saying which window it belongs to', async () => {
    // Dropping it is right; dropping it in silence is not. Every call that shard's window should
    // have served now fails to find it, and this warning is the only record anywhere that a shard
    // existed at all.
    createIndex();

    announceCreate({
      id: 'TestService-2',
      objectType: SHARD_OBJECT_TYPE,
      attributes: { windowId: 'two' },
    });

    const [warning] = mocks.loggerWarn.mock.calls[0];
    expect(warning).toContain("'TestService-2'");
    expect(warning).toContain('"windowId":"two"');
  });

  test('reports the windows it has shards for, so a late subscriber can catch up', async () => {
    // `onDidAddShard` has no replay. Anything that reacts to shards appearing reconciles against
    // this when it subscribes, or it silently misses every window indexed before that moment.
    const index = createIndex();
    announceShard(1);
    announceShard(3);

    expect(index.getShardWindowIds()).toEqual([1, 3]);

    announceDispose('TestService-1');

    expect(index.getShardWindowIds()).toEqual([3]);
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

  test('announces the window whose shard went away, with the id it was announced under', () => {
    // The other half of onDidAddShard, for a router that did something outside itself when the
    // shard appeared. The id has to travel on the event: the registration is already gone by the
    // time subscribers hear about it, so it cannot be looked up afterwards.
    const index = createIndex();
    const departures: unknown[] = [];
    index.onDidRemoveShard((departure) => departures.push(departure));
    announceShard(3, 'TestService-3');

    announceDispose('TestService-3');

    expect(departures).toEqual([{ windowId: 3, networkObjectId: 'TestService-3' }]);
  });

  test('says nothing went away when a window replaced its shard rather than losing it', () => {
    // The shard the window is routed to did not go anywhere, so anything undone on this event —
    // a lifted request timeout, say — would be undone out from under a live registration
    const index = createIndex();
    const departures: unknown[] = [];
    index.onDidRemoveShard((departure) => departures.push(departure));
    announceShard(1, 'TestService-1');
    announceShard(1, 'TestService-1');

    announceDispose('TestService-1');

    expect(departures).toEqual([]);
  });

  test('tells the remaining subscribers about a departure even when an earlier one throws', () => {
    const index = createIndex();
    const laterSubscriberSaw: unknown[] = [];
    index.onDidRemoveShard(() => {
      throw new Error('this departure subscriber is broken');
    });
    index.onDidRemoveShard((departure) => laterSubscriberSaw.push(departure));
    announceShard(5, 'TestService-5');

    expect(() => announceDispose('TestService-5')).not.toThrow();

    expect(laterSubscriberSaw).toEqual([{ windowId: 5, networkObjectId: 'TestService-5' }]);
    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining('this departure subscriber is broken'),
    );
  });

  test('answers the id a window`s shard announced, so nothing has to rebuild it', () => {
    // A caller that has to name the shard's methods gets the id the shard actually registered
    // under, rather than a second spelling of the window-scoped name
    const index = createIndex();
    announceShard(2, 'some-shard-id-2');

    expect(index.getShardNetworkObjectId(2)).toBe('some-shard-id-2');
    expect(index.getShardNetworkObjectId(9)).toBeUndefined();
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

  test('keeps the live shard when the replaced one`s disposal arrives after the replacement', async () => {
    // Both registrations carry the same network object id — it is built from the window id — so the
    // announcement says nothing about WHICH of them went away. Evicting on the id alone would drop
    // a shard that is serving calls, and nothing re-announces a shard that is already registered,
    // so it would never come back.
    const index = createIndex();
    announceShard(1, 'TestService-1');
    announceShard(1, 'TestService-1');

    announceDispose('TestService-1');

    expect(await index.getShard(1)).toEqual({ id: 'TestService-1' });
    expect(index.getShardWindowIds()).toEqual([1]);

    // The replacement's own disposal still empties the entry, so nothing routes into a dead window
    announceDispose('TestService-1');

    expect(await index.getShard(1)).toBeUndefined();
  });

  test('records that a window`s shard went away, so a routing failure has a cause in the log', async () => {
    const index = createIndex();
    announceShard(1);

    announceDispose('TestService-1');

    expect(mocks.loggerInfo).toHaveBeenCalledWith(expect.stringContaining('TestService-1'));
    expect(await index.getShard(1)).toBeUndefined();
  });

  test('tells the remaining subscribers about a shard even when an earlier one throws', async () => {
    // The announcement happens once and is never repeated, and window readiness is keyed off it. A
    // subscriber that throws would otherwise leave every subscriber after it — and the window they
    // speak for — permanently unaware that the window can serve calls.
    const index = createIndex();
    const laterSubscriberSaw: number[] = [];
    index.onDidAddShard(() => {
      throw new Error('this subscriber is broken');
    });
    index.onDidAddShard((windowId) => laterSubscriberSaw.push(windowId));

    expect(() => announceShard(7)).not.toThrow();

    expect(laterSubscriberSaw).toEqual([7]);
    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining('this subscriber is broken'),
    );
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
