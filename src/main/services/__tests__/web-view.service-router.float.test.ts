import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  setWebViewWindowCreator,
  startWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import {
  getRegisteredRouter,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';
import type { Layout } from '@shared/models/docking-framework.model';

/**
 * Pins that a `'float'` layout open is routed exactly the way a plain `'tab'` open is: no rung of
 * its own in `openWebView`. It never asks the window creator, never reaches the `'window'`-layout
 * branch, and its `floatSize`/`position` cross the router untouched — the same
 * focused/target-window routing rungs the rest of the router suite exercises for `'tab'`, just
 * re-asserted for a `'float'` layout so a future branch on `layout?.type === 'float'` cannot
 * silently change any of that.
 *
 * Deliberately does not touch the `existingId: '?'` reuse search (the owner search's `{ kind:
 * 'type' }` matcher) or the raise gate it feeds — that search is pinned by the router's own suites,
 * and re-asserting it here would only duplicate them. The concrete-`existingId` case below goes
 * through the `{ kind: 'id' }` matcher instead, which is a different code path.
 */
const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions. Plain arrays rather than the subscribe
  // mocks' recorded calls, which `vi.clearAllMocks()` wipes between tests while the index — module
  // state that subscribes once at load — keeps listening.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    isWindowReady: vi.fn(),
    getFocusedWindowId: vi.fn(),
    focusWindow: vi.fn(),
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    registerRequestHandler: vi.fn(),
    settingsGet: vi.fn(),
    clearWindowPendingContent: vi.fn(),
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
function withWindows(
  shardsByWindowId: Record<number, unknown>,
  options?: { startingWindowIds?: number[]; unreachableWindowIds?: number[] },
) {
  withWindowsServingShards(mocks, WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId, options);
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  isWindowReady: mocks.isWindowReady,
  // No test here names a closing window; the routed-open guard just needs an answer
  isWindowClosing: () => false,
  getFocusedWindowId: mocks.getFocusedWindowId,
  // No test here is about the cross-window raise; the app holding focus is what allows one
  isApplicationFocused: () => true,
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

/** Capture the router object registered under the generic name */
async function getRouter() {
  return getRegisteredRouter<WebViewServiceType>(mocks.networkObjectSet, startWebViewServiceRouter);
}

/** A per-window WebView service shard whose web views are the given ids */
function windowShard(openWebViewIds: string[] = []) {
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      openWebViewIds.includes(id) ? { id } : undefined,
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => openWebViewIds.map((id) => ({ id }))),
    // Typed the way the real method is — it answers with nothing when the open did not happen
    openWebView: vi.fn<() => Promise<string | undefined>>(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
    openSettingsTab: vi.fn(async () => undefined),
  };
}

/** A float layout with size and position set, so the tests can tell if either gets dropped */
const FLOAT_LAYOUT: Layout = {
  type: 'float',
  position: 'center',
  floatSize: { width: 480, height: 320 },
};

describe('float layouts are untouched by multi-window routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.getFocusedWindowId.mockReturnValue(1);
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('a float open with no target routes to the focused window like a tab open, floatSize and position untouched', async () => {
    const focused = windowShard([]);
    const other = windowShard([]);
    withWindows({ 1: focused, 2: other });
    const creator = { createPendingContentWindow: vi.fn(async () => 99), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);
    const router = await getRouter();

    await router.openWebView('someType', FLOAT_LAYOUT);

    // Same focused-window rung a bare 'tab' open uses — 'float' gets no rung of its own
    expect(focused.openWebView).toHaveBeenCalledWith('someType', FLOAT_LAYOUT, undefined);
    expect(other.openWebView).not.toHaveBeenCalled();
    // A float never creates a window: only the 'window'-layout rung ever calls this
    expect(creator.createPendingContentWindow).not.toHaveBeenCalled();
  });

  test('a float open with targetWindowId routes to the named window, never creating one', async () => {
    const focused = windowShard([]);
    const named = windowShard([]);
    withWindows({ 1: focused, 2: named });
    const creator = { createPendingContentWindow: vi.fn(async () => 99), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);
    const router = await getRouter();

    await router.openWebView('someType', FLOAT_LAYOUT, { targetWindowId: 2 });

    expect(named.openWebView).toHaveBeenCalledWith('someType', FLOAT_LAYOUT, {
      targetWindowId: 2,
    });
    expect(focused.openWebView).not.toHaveBeenCalled();
    expect(creator.createPendingContentWindow).not.toHaveBeenCalled();
  });

  test('a float open with a concrete existingId still routes by ownership, ignoring the layout entirely', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['existing-view']);
    withWindows({ 1: focused, 2: owner });
    const router = await getRouter();

    await router.openWebView('someType', FLOAT_LAYOUT, { existingId: 'existing-view' });

    expect(owner.openWebView).toHaveBeenCalledWith('someType', FLOAT_LAYOUT, {
      existingId: 'existing-view',
    });
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('a float open is never mistaken for a window-layout open: it degrades to nothing when only the window rung is wired up wrong', async () => {
    // No creator is wired here, but the one the tests above wired is module-level state that
    // outlives them, so it is still in place — a float open must not care either way. What this
    // pins is that the open takes the ordinary focused-window rung and answers with an id: only
    // openWebViewInNewWindow (the 'window'-layout rung) ever reads the creator, and a float open
    // never reaches that rung.
    const focused = windowShard([]);
    withWindows({ 1: focused });
    const router = await getRouter();

    await expect(router.openWebView('someType', FLOAT_LAYOUT)).resolves.toBe('opened');
    expect(focused.openWebView).toHaveBeenCalledWith('someType', FLOAT_LAYOUT, undefined);
  });
});
