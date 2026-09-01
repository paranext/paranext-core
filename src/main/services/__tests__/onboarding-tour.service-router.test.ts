import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startOnboardingTourServiceRouter } from '@main/services/onboarding-tour.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
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

/** A window's onboarding tour service shard, recording what the router asked it to do */
function onboardingTourShard() {
  return { show: vi.fn(async () => undefined) };
}

/** Wire windows, each serving its own onboarding tour service shard */
function withWindows(shardsByWindowId: Record<number, unknown>) {
  withWindowsServingShards(mocks, ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
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

describe('Onboarding tour service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(2);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    await startOnboardingTourServiceRouter();
  });

  test('claims exactly the one onboarding tour command', () => {
    // Nothing else proves a name this router is responsible for still gets registered
    expect([...registrations().keys()]).toEqual(['command:platform.showOnboardingTour']);
  });

  test('shows the tour in the window the user is working in', async () => {
    const shards = { 2: onboardingTourShard(), 3: onboardingTourShard() };
    withWindows(shards);

    await registrations().get('command:platform.showOnboardingTour')?.handler();

    expect(shards[2].show).toHaveBeenCalled();
    expect(shards[3].show).not.toHaveBeenCalled();
  });

  test('follows focus, so the same call reaches a different window once focus moves', async () => {
    const shards = { 2: onboardingTourShard(), 3: onboardingTourShard() };
    withWindows(shards);
    const { handler } = registrations().get('command:platform.showOnboardingTour') ?? {};

    await handler?.();
    mocks.getTargetWindowId.mockReturnValue(3);
    await handler?.();

    expect(shards[2].show).toHaveBeenCalledTimes(1);
    expect(shards[3].show).toHaveBeenCalledTimes(1);
  });

  test('documents the generic name, which is the one consumers call', () => {
    expect(registrations().get('command:platform.showOnboardingTour')?.docs).toBeDefined();
  });

  test('publishes the command as experimental', () => {
    // The command ships alongside the tour itself and is expected to change with it; dropping the
    // mark is as much a change to the published surface as adding one.
    const { docs } = registrations().get('command:platform.showOnboardingTour') ?? {};
    expect(Reflect.get(Reflect.get(Object(docs), 'method') ?? {}, 'x-experimental')).toBe(true);
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(
      registrations().get('command:platform.showOnboardingTour')?.handler(),
    ).rejects.toThrow('No windows available');
  });
});
