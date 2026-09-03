import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startUsersnapServiceRouter } from '@main/services/usersnap.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { USERSNAP_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions. Plain arrays rather than the subscribe
  // mocks' recorded calls, which `vi.clearAllMocks()` wipes between tests while the index — module
  // state that subscribes once at load — keeps listening.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    registerRequestHandler: vi.fn(),
    networkObjectGet: vi.fn(),
    shardAnnouncementListeners,
    onDidCreateNetworkObject: vi.fn((listener: (details: NetworkObjectDetails) => void) => {
      shardAnnouncementListeners.create.push(listener);
      return () => {};
    }),
    onDidDisposeNetworkObject: vi.fn((listener: (networkObjectId: string) => void) => {
      shardAnnouncementListeners.dispose.push(listener);
      return () => {};
    }),
  };
});

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  // Pulled in transitively by the network object service; unused by the service routers
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));

/** A window's Usersnap service shard, recording what the router asked it to do */
function usersnapShard(isFormOpen = false) {
  return {
    submitIdea: vi.fn(async () => undefined),
    reportIssue: vi.fn(async () => undefined),
    isFormCurrentlyOpen: vi.fn(async () => isFormOpen),
    closeOpenForm: vi.fn(async () => undefined),
  };
}

/** Wire windows, each serving its own Usersnap service shard */
function withWindows(shardsByWindowId: Record<number, unknown>) {
  withWindowsServingShards(mocks, USERSNAP_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
}

/** Registrations the router made, keyed by the generic request type it claimed */
function registrations() {
  return new Map<string, { handler: Function; docs: unknown }>(
    mocks.registerRequestHandler.mock.calls.map(([requestType, handler, docs]) => [
      requestType,
      { handler, docs },
    ]),
  );
}

describe('Usersnap service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    await startUsersnapServiceRouter();
  });

  test('claims exactly the four Usersnap commands', () => {
    // The replacement for the deleted renderer-hosted registry's coverage check: nothing else
    // proves a name this router is responsible for still gets registered
    expect([...registrations().keys()].sort()).toEqual(
      [
        'command:platform.closeOpenUsersnapForm',
        'command:platform.isUsersnapFormCurrentlyOpen',
        'command:platform.usersnapReportIssue',
        'command:platform.usersnapSubmitIdea',
      ].sort(),
    );
  });

  test('opens the feedback form in the window the user is working in', async () => {
    const shards = { 2: usersnapShard(), 3: usersnapShard() };
    withWindows(shards);

    await registrations().get('command:platform.usersnapSubmitIdea')?.handler();

    expect(shards[2].submitIdea).toHaveBeenCalled();
    expect(shards[3].submitIdea).not.toHaveBeenCalled();
  });

  test('keeps the two forms apart, so reporting an issue is not submitting an idea', async () => {
    const shard = usersnapShard();
    withWindows({ 2: shard });

    await registrations().get('command:platform.usersnapReportIssue')?.handler();

    expect(shard.reportIssue).toHaveBeenCalled();
    expect(shard.submitIdea).not.toHaveBeenCalled();
  });

  test('answers the open-form question with the focused window’s boolean', async () => {
    // An external consumer reads this; the exact boolean has to survive the round trip rather than
    // becoming a truthy object
    withWindows({ 2: usersnapShard(true), 3: usersnapShard(false) });

    await expect(
      registrations().get('command:platform.isUsersnapFormCurrentlyOpen')?.handler(),
    ).resolves.toBe(true);
  });

  test('closes the form in the focused window', async () => {
    const shards = { 2: usersnapShard(), 3: usersnapShard() };
    withWindows(shards);

    await registrations().get('command:platform.closeOpenUsersnapForm')?.handler();

    expect(shards[2].closeOpenForm).toHaveBeenCalled();
    expect(shards[3].closeOpenForm).not.toHaveBeenCalled();
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const shards = { 2: usersnapShard(), 3: usersnapShard() };
    withWindows(shards);
    const { handler } = registrations().get('command:platform.usersnapSubmitIdea') ?? {};

    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(shards[2].submitIdea).toHaveBeenCalledTimes(1);
    expect(shards[3].submitIdea).toHaveBeenCalledTimes(1);
  });

  test('documents the generic names, which are the ones consumers call', () => {
    expect(registrations().get('command:platform.usersnapSubmitIdea')?.docs).toBeDefined();
  });

  test('leaves the four commands unmarked, exactly as they were before this router claimed them', () => {
    // None of these carried the experimental mark. Adding one is as much a change to the published
    // surface as dropping one.
    registrations().forEach(({ docs }) =>
      expect(
        Reflect.get(Reflect.get(Object(docs), 'method') ?? {}, 'x-experimental'),
      ).toBeUndefined(),
    );
  });

  test.each([
    'command:platform.usersnapSubmitIdea',
    'command:platform.usersnapReportIssue',
    'command:platform.isUsersnapFormCurrentlyOpen',
    'command:platform.closeOpenUsersnapForm',
  ])('%s refuses to route rather than guessing when no window is available', async (name) => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(registrations().get(name)?.handler()).rejects.toThrow('No windows available');
  });
});
