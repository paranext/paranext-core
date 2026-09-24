import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startBookChapterControlServiceRouter } from '@main/services/book-chapter-control.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
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

/** A window's BookChapterControl shard */
function bookChapterControlShard() {
  return { open: vi.fn(async () => undefined) };
}

/** Wire windows, each serving its own BookChapterControl shard */
function withWindows(shardsByWindowId: Record<string, unknown>) {
  withWindowsServingShards(mocks, BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
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

describe('BookChapterControl service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue('2');
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    await startBookChapterControlServiceRouter();
  });

  test('claims exactly the openBookChapterControl command', () => {
    // The replacement for the deleted renderer-hosted registry's coverage check: nothing else
    // proves this name still gets registered
    expect([...registrations().keys()]).toEqual(['command:platform.openBookChapterControl']);
  });

  test('opens the control in the window the user is working in', async () => {
    const shards = { 2: bookChapterControlShard(), 3: bookChapterControlShard() };
    withWindows(shards);

    await registrations().get('command:platform.openBookChapterControl')?.handler();

    expect(shards[2].open).toHaveBeenCalled();
    expect(shards[3].open).not.toHaveBeenCalled();
  });

  test('leaves the choice of which control to open to the window', async () => {
    // The three-tier preference chain reads focus and the tracked last-selected web view, which are
    // renderer state — the router must ask for nothing but "open"
    const shard = bookChapterControlShard();
    withWindows({ 2: shard });

    await registrations().get('command:platform.openBookChapterControl')?.handler();

    expect(shard.open).toHaveBeenCalledWith();
  });

  test('follows focus, so the same key reaches a different window once focus moves', async () => {
    const shards = { 2: bookChapterControlShard(), 3: bookChapterControlShard() };
    withWindows(shards);
    const { handler } = registrations().get('command:platform.openBookChapterControl') ?? {};

    await handler?.();
    mocks.getTargetWindowId.mockReturnValue('3');
    await handler?.();

    expect(shards[2].open).toHaveBeenCalledTimes(1);
    expect(shards[3].open).toHaveBeenCalledTimes(1);
  });

  test('documents the generic name, which is the one consumers call', () => {
    expect(registrations().get('command:platform.openBookChapterControl')?.docs).toBeDefined();
  });

  test('keeps the command marked experimental on the wire, as it was before', () => {
    // It carried the mark before this router claimed it, and dropping one silently promotes an
    // unsettled command to something an extension may rely on
    const { docs } = registrations().get('command:platform.openBookChapterControl') ?? {};

    expect(Reflect.get(Reflect.get(Object(docs), 'method') ?? {}, 'x-experimental')).toBe(true);
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(
      registrations().get('command:platform.openBookChapterControl')?.handler(),
    ).rejects.toThrow('No windows available');
  });
});
