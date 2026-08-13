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
import { JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX } from '@shared/data/rpc.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions — module state that outlives one test,
  // same reasoning as the pre-existing `web-view.service-router.test.ts`.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  const getFocusedWindowId = vi.fn();
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    isWindowReady: vi.fn(),
    isWindowClosing: vi.fn(),
    getFocusedWindowId,
    // The real answer is false only while no window holds OS focus, which in these suites is
    // exactly when getFocusedWindowId answers undefined — derive so the focus-driven tests keep
    // meaning what they say
    isApplicationFocused: vi.fn(() => getFocusedWindowId() !== undefined),
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

/** The rejection the network plumbing produces when a request expires with no answer */
function requestTimedOutError() {
  return new Error(
    `${JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX} object:WebViewService-3.adoptWebView []`,
  );
}

describe('moveWebView when the target adopt times out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.isWindowClosing.mockReturnValue(false);
    mocks.getFocusedWindowId.mockReturnValue(1);
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('an adopt that landed after its request expired completes the move without recovery', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(requestTimedOutError());
    // First asked during the ownership search (target does not hold it yet); asked again by the
    // probe after the timed-out adopt, by which time the adopt has landed in the target
    target.getOpenWebViewDefinition.mockResolvedValueOnce(undefined);
    target.getOpenWebViewDefinition.mockResolvedValue({ id: 'view-1' });
    withWindows({ 2: owner, 3: target });

    const movedId = await moveWebView('view-1', 3);

    expect(movedId).toBe('view-1');
    // The move succeeded late, so nothing may reopen the captured definition anywhere — that
    // would put the same web view id live in two windows
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    // Same raise rules as a normal success
    expect(mocks.focusWindow).toHaveBeenCalledWith(3);
  });

  test('an adopt whose target confirms absence runs the recovery ladder unchanged', async () => {
    vi.useFakeTimers();
    try {
      const owner = windowShard(['view-1']);
      const target = windowShard([]);
      target.adoptWebView.mockRejectedValue(requestTimedOutError());
      withWindows({ 2: owner, 3: target });

      const moving = moveWebView('view-1', 3);
      moving.catch(() => undefined);

      await vi.runAllTimersAsync();

      await expect(moving).rejects.toThrow(/window 2, where it came from/);
      expect(owner.adoptWebView).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
      );
      // The probe is bounded: the ownership search asked once, then each probe attempt once
      expect(target.getOpenWebViewDefinition.mock.calls.length).toBeGreaterThan(1);
      expect(target.getOpenWebViewDefinition.mock.calls.length).toBeLessThanOrEqual(5);
    } finally {
      vi.useRealTimers();
    }
  });

  test('a source readopt that timed out and landed ends the recovery ladder there', async () => {
    // The recovery adopts are adopts, and carry the same ambiguity the primary one does: the
    // request expired client-side while the source may still have been running it. Walking on to
    // the next rung without asking is what would put this web view id live in two windows.
    const focused = windowShard([]);
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    owner.adoptWebView.mockRejectedValue(requestTimedOutError());
    withWindows({ 1: focused, 2: owner, 3: target });

    await expect(moveWebView('view-1', 3)).rejects.toThrow(/window 2, where it came from/);

    expect(focused.adoptWebView).not.toHaveBeenCalled();
  });

  test('a focused-window readopt that timed out and landed is not reported as reopened nowhere', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    owner.adoptWebView.mockRejectedValue(new Error('source refused'));
    focused.adoptWebView.mockRejectedValue(requestTimedOutError());
    // Asked once by the ownership search, when the focused window does not hold it; asked again by
    // the probe after the timed-out readopt, by which time that readopt has landed
    focused.getOpenWebViewDefinition.mockResolvedValueOnce(undefined);
    focused.getOpenWebViewDefinition.mockResolvedValue({ id: 'view-1' });
    withWindows({ 1: focused, 2: owner, 3: target });

    // Telling the caller nothing could reopen it — while it is sitting in the focused window —
    // sends them looking for a definition in the log for a web view the user can see
    await expect(moveWebView('view-1', 3)).rejects.toThrow(/reopened in the focused window/);
  });

  test('a rejection the target itself produced enters recovery without probing', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    withWindows({ 2: owner, 3: target });

    await expect(moveWebView('view-1', 3)).rejects.toThrow(/window 2, where it came from/);

    // Only the ownership search asked the target: an answer the target produced itself means the
    // adopt definitively did not happen, so no probe may delay the recovery reopen
    expect(target.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
  });
});
