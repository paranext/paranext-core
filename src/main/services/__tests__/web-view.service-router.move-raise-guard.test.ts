import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { testingWebViewServiceRouter } from '@main/services/web-view.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import type { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import type { InternalRequestHandler } from '@shared/data/rpc.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions — module state that outlives one test,
  // same reasoning as the pre-existing `web-view.service-router.test.ts`.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    isWindowReady: vi.fn(),
    isWindowClosing: vi.fn(),
    // Independent of getFocusedWindowId here, unlike the derived mock the other move suites use:
    // these tests pin the one situation where the two diverge — a window was focused once (the id
    // stays set) while no window holds OS focus now
    getFocusedWindowId: vi.fn(),
    isApplicationFocused: vi.fn(),
    focusWindow: vi.fn(),
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    registerRequestHandler:
      vi.fn<
        (requestType: string, handler: InternalRequestHandler, ...rest: unknown[]) => unknown
      >(),
    settingsGet: vi.fn(),
    clearWindowPendingContent: vi.fn(),
    loggerWarn: vi.fn(),
    loggerError: vi.fn(),
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

/** Wire windows whose WebView service shards are the given objects */
function withWindows(shardsByWindowId: Record<number, unknown>) {
  withWindowsServingShards(mocks, WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
  isWindowReady: mocks.isWindowReady,
  isWindowClosing: mocks.isWindowClosing,
  getFocusedWindowId: mocks.getFocusedWindowId,
  isApplicationFocused: mocks.isApplicationFocused,
  focusWindow: mocks.focusWindow,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: () => vi.fn(),
  registerRequestHandler: mocks.registerRequestHandler,
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet },
}));
vi.mock('@main/services/window-layout-persistence.service', () => ({
  clearWindowPendingContent: mocks.clearWindowPendingContent,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: mocks.loggerWarn, error: mocks.loggerError, info: vi.fn(), debug: vi.fn() },
}));

const { moveWebView } = testingWebViewServiceRouter;

/**
 * A per-window WebView service shard whose web views are the given ids, extended with the move
 * primitives `moveWebView` drives — same stand-in shape as the pre-existing
 * `web-view.service-router.move.test.ts`.
 */
function windowShard(openWebViewIds: string[]) {
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      openWebViewIds.includes(id) ? { id } : undefined,
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => openWebViewIds.map((id) => ({ id }))),
    openWebView: vi.fn<() => Promise<string | undefined>>(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
    openSettingsTab: vi.fn(async () => undefined),
    captureAndCloseWebView: vi.fn<
      (webViewId: WebViewId) => Promise<SavedWebViewDefinition | undefined>
    >(async (id) => (openWebViewIds.includes(id) ? { id, webViewType: 'test.type' } : undefined)),
    adoptWebView: vi.fn<
      (savedWebViewDefinition: SavedWebViewDefinition) => Promise<WebViewId | undefined>
    >(async (savedWebViewDefinition) => savedWebViewDefinition.id),
  };
}

describe('the cross-application focus guard on a move', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.isWindowClosing.mockReturnValue(false);
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('a move while the user is in another application does not raise the target', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    // A window held focus at some point, so its id is still on record — but no window of this app
    // holds OS focus now
    mocks.getFocusedWindowId.mockReturnValue(2);
    mocks.isApplicationFocused.mockReturnValue(false);

    const movedId = await moveWebView('view-1', 3);

    expect(movedId).toBe('view-1');
    expect(mocks.focusWindow).not.toHaveBeenCalled();
  });

  test('a move while this app holds focus raises the target as before', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.getFocusedWindowId.mockReturnValue(2);
    mocks.isApplicationFocused.mockReturnValue(true);

    await moveWebView('view-1', 3);

    expect(mocks.focusWindow).toHaveBeenCalledWith(3);
  });
});
