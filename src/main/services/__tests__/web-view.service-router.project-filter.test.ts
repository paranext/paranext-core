import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startWebViewServiceRouter } from '@main/services/web-view.service-router';
import {
  getRegisteredRouter,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';

/**
 * Pins the project filter an `existingId: '?'` reuse search can carry: which window a filtered
 * search lands in, that an unfiltered one is unchanged by the filter existing, that asking for a
 * filter without a `'?'` search to limit is refused before any window is asked, and that a filtered
 * search answers a window it could not ask exactly the way an unfiltered one does.
 *
 * Lives apart from the main router suite because every case here needs windows whose web views
 * carry projects, which is a different fixture from the id-and-type shards that suite is built on.
 */
const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions. Plain arrays rather than the subscribe
  // mocks' recorded calls, which `vi.clearAllMocks()` wipes between tests while the index — module
  // state that subscribes once at load — keeps listening.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getNotReadyWindowIds: vi.fn(),
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
  options?: { unreadyWindowIds?: number[] },
) {
  withWindowsServingShards(mocks, WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId, options);
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getNotReadyWindowIds: mocks.getNotReadyWindowIds,
  isWindowReady: mocks.isWindowReady,
  getFocusedWindowId: mocks.getFocusedWindowId,
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
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() },
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

/** A per-window WebView service shard holding the given web views */
function windowShard(definitions: SavedWebViewDefinition[] = []) {
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      definitions.find((definition) => definition.id === id),
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => definitions),
    dockContainsTab: vi.fn(async (tabOrTabGroupId: string) =>
      definitions.some((definition) => definition.id === tabOrTabGroupId),
    ),
    // Typed the way the real method is — it answers with nothing when the open did not happen
    openWebView: vi.fn<() => Promise<string | undefined>>(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
    openSettingsTab: vi.fn(async () => undefined),
  };
}

/** A comments web view with the given id, showing the given project */
function commentsFor(id: string, projectId: string): SavedWebViewDefinition {
  return { id, webViewType: 'comments', projectId };
}

describe("a '?' reuse search limited to a project", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getNotReadyWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.getFocusedWindowId.mockReturnValue(1);
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('routes to the window holding a web view of the type showing that project', async () => {
    // The filter narrows the candidates before the routing target gets to prefer among them, so a
    // match for the asked-for project wins even though the other window is the one this call is
    // already headed for — reusing the wrong project's list is worse than crossing a window
    const target = windowShard([commentsFor('wv-other-project', 'project-A')]);
    const holder = windowShard([commentsFor('wv-right-project', 'project-B')]);
    holder.openWebView.mockResolvedValue('wv-right-project');
    withWindows({ 1: target, 2: holder });
    const router = await getRouter();

    const result = await router.openWebView('comments', undefined, {
      existingId: '?',
      existingProjectId: 'project-B',
    });

    expect(result).toBe('wv-right-project');
    expect(holder.openWebView).toHaveBeenCalled();
    expect(target.openWebView).not.toHaveBeenCalled();
  });

  test('treats a web view of the type showing another project as no match at all', async () => {
    // Narrowing has to mean narrowing: falling back to any web view of the type would hand the
    // caller the very list it asked not to be given
    const focused = windowShard([]);
    const otherProject = windowShard([commentsFor('wv-other-project', 'project-A')]);
    withWindows({ 1: focused, 2: otherProject });
    const router = await getRouter();

    await router.openWebView('comments', undefined, {
      existingId: '?',
      existingProjectId: 'project-B',
    });

    // Nothing matched, so this is an ordinary create in the window the call was headed for
    expect(focused.openWebView).toHaveBeenCalled();
    expect(otherProject.openWebView).not.toHaveBeenCalled();
  });

  test('leaves an unfiltered search matching any project, as before', async () => {
    const older = windowShard([commentsFor('wv-old', 'project-A')]);
    const target = windowShard([commentsFor('wv-here', 'project-B')]);
    target.openWebView.mockResolvedValue('wv-here');
    withWindows({ 1: older, 2: target });
    mocks.getTargetWindowId.mockReturnValue(2);
    const router = await getRouter();

    const result = await router.openWebView('comments', undefined, { existingId: '?' });

    // Both windows match a type-only search, and the routing target still decides between them
    expect(result).toBe('wv-here');
    expect(older.openWebView).not.toHaveBeenCalled();
  });

  test('refuses a project filter alongside a concrete existingId without asking any window', async () => {
    // A concrete existingId already names one exact web view, so there is no search to limit —
    // and the caller cannot be told which of the two contradictory things it asked for was used
    const focused = windowShard([]);
    const owner = windowShard([commentsFor('wv-1', 'project-B')]);
    withWindows({ 1: focused, 2: owner });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, {
        existingId: 'wv-1',
        existingProjectId: 'project-B',
      }),
    ).rejects.toThrow(/already names an exact web view/);

    expect(owner.getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(owner.getAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(owner.openWebView).not.toHaveBeenCalled();
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('refuses a project filter with no existingId at all without asking any window', async () => {
    const focused = windowShard([]);
    const other = windowShard([commentsFor('wv-1', 'project-B')]);
    withWindows({ 1: focused, 2: other });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, { existingProjectId: 'project-B' }),
    ).rejects.toThrow(/existingProjectId requires existingId/);

    expect(other.getAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(other.openWebView).not.toHaveBeenCalled();
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('answers a filtered probe not-found when a window could not be asked, like an unfiltered one', async () => {
    // Per-caller reachability, unchanged by the filter: a probe creates nothing, so treating a
    // window it could not ask as not-found costs it nothing
    withWindows({ 1: windowShard([]), 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, {
        existingId: '?',
        existingProjectId: 'project-B',
        createNewIfNotFound: false,
      }),
    ).resolves.toBeUndefined();
  });

  test('fails a filtered open that would create when a window could not be asked, like an unfiltered one', async () => {
    // The window that could not be asked may be the one already showing this project, so creating
    // here risks a second copy of a view meant to be unique
    withWindows({ 1: windowShard([]), 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, {
        existingId: '?',
        existingProjectId: 'project-B',
        createNewIfNotFound: true,
      }),
    ).rejects.toThrow(/unreachable/i);
  });
});
