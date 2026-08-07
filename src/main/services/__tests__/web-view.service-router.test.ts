import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  getAllOpenWebViewDefinitionsWithReachability,
  getOpenWebViewDefinitionsForWindow,
  startWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import {
  getRegisteredRouter,
  withoutWindowShard,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';

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
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    registerRequestHandler: vi.fn(),
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

/** Capture the router object registered under the generic name */
async function getRouter() {
  return getRegisteredRouter<WebViewServiceType>(mocks.networkObjectSet, startWebViewServiceRouter);
}

/** A per-window WebView service shard whose web views are the given ids */
function windowShard(openWebViewIds: string[]) {
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      openWebViewIds.includes(id) ? { id } : undefined,
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => openWebViewIds.map((id) => ({ id }))),
    openWebView: vi.fn(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
    openSettingsTab: vi.fn(async () => undefined),
  };
}

/** A per-window shard whose web views carry the given projects, keyed by web view id */
function windowShardWithProjects(projectIdsByWebViewId: Record<string, string | undefined>) {
  return {
    ...windowShard(Object.keys(projectIdsByWebViewId)),
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      id in projectIdsByWebViewId ? { id, projectId: projectIdsByWebViewId[id] } : undefined,
    ),
  };
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

/** Start the router and hand back the settings command handler for the given name */
async function getCommandHandler(commandName: string) {
  mocks.networkObjectSet.mockResolvedValue(undefined);
  mocks.registerRequestHandler.mockResolvedValue(vi.fn());
  await startWebViewServiceRouter();
  const registration = registrations().get(`command:${commandName}`);
  if (!registration) throw new Error(`${commandName} was not registered`);
  return registration.handler;
}

describe('web view service router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getNotReadyWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
  });

  describe('finding a window`s shard', () => {
    test('asks the shard by the id its window announced, not by a name built from the window id', async () => {
      // The router never spells a window-scoped name: it resolves whatever id the shard announced
      // itself under, which is why the ids the shards register here look nothing like the generic
      // service name plus a window id
      withWindows({ 1: windowShard(['a']) });
      const router = await getRouter();

      await router.getAllOpenWebViewDefinitions();

      expect(mocks.networkObjectGet).toHaveBeenCalledWith('shard-of-window-1');
    });

    test('routes to a window that registered its shard after the router started', async () => {
      // Routers start before any window exists, so every window they ever route to is one that
      // announced itself later
      withWindows({ 1: windowShard(['a']) });
      const router = await getRouter();
      expect((await router.getAllOpenWebViewDefinitions()).map(({ id }) => id)).toEqual(['a']);

      withWindows({ 1: windowShard(['a']), 2: windowShard(['b']) });

      expect((await router.getAllOpenWebViewDefinitions()).map(({ id }) => id).sort()).toEqual([
        'a',
        'b',
      ]);
    });

    test('stops asking a window once its shard has announced that it is gone', async () => {
      // A window's shard dies with the window, and the disposal announcement is the only thing that
      // says so. Asking it anyway routes a call into a window that is no longer there.
      const closing = windowShard(['owned-view']);
      withWindows({ 1: windowShard([]), 2: closing });
      const router = await getRouter();

      withoutWindowShard(mocks, 2);

      // Still a ready window as far as window state is concerned, so it counts as one that could
      // not be asked rather than one that answered that it does not own the web view
      await expect(router.reloadWebView('someType', 'owned-view')).rejects.toThrow('unreachable');
      expect(closing.getOpenWebViewDefinition).not.toHaveBeenCalled();
    });
  });

  test('gathers open web views from every window, not just the focused one', async () => {
    withWindows({ 1: windowShard(['a']), 2: windowShard(['b', 'c']) });
    const router = await getRouter();

    const all = await router.getAllOpenWebViewDefinitions();

    expect(all.map((definition) => definition.id).sort()).toEqual(['a', 'b', 'c']);
  });

  test('does not ask a window that has not registered its services yet, but says it could not', async () => {
    // A window is tracked from the moment it is shown; asking it before its renderer registers
    // stalls the whole fan-out for the network service's registration retry to learn nothing. Not
    // asking it is not the same as it answering "nothing open" — a window also leaves the ready set
    // by crashing or reloading, and that one may have had editors with unsaved work in it.
    const serving = windowShard(['a']);
    const starting = windowShard([]);
    withWindows({ 1: serving, 2: starting }, { unreadyWindowIds: [2] });

    const { definitions, unreachableWindowIds } =
      await getAllOpenWebViewDefinitionsWithReachability();

    expect(starting.getAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(definitions.map((definition) => definition.id)).toEqual(['a']);
    expect(unreachableWindowIds).toEqual([2]);
  });

  test('refuses to answer with a list that leaves out a window that has not registered yet', async () => {
    // The merged read is treated as the whole picture, and a window that could not be asked is
    // indistinguishable in it from a window with nothing open
    withWindows({ 1: windowShard(['a']), 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(router.getAllOpenWebViewDefinitions()).rejects.toThrow('unreachable');
  });

  test('refuses to answer with a partial list when a ready window could not be asked', async () => {
    // Callers treat this as the whole picture. A window that failed to answer is indistinguishable
    // from one with nothing open, so quietly dropping it makes them act on tabs that do exist.
    const healthy = windowShard(['a']);
    const broken = windowShard([]);
    broken.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window went away'));
    withWindows({ 1: healthy, 2: broken });
    const router = await getRouter();

    await expect(router.getAllOpenWebViewDefinitions()).rejects.toThrow('unreachable');
  });

  test('reports which windows did not answer to callers that can act on a partial list', async () => {
    // Shutdown has one shot at this and no event stream to correct it later, so it takes what it
    // can get — but it has to know the answer is incomplete rather than reading it as "nothing open"
    const healthy = windowShard(['a']);
    const broken = windowShard([]);
    broken.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window went away'));
    withWindows({ 1: healthy, 2: broken });

    const { definitions, unreachableWindowIds } =
      await getAllOpenWebViewDefinitionsWithReachability();

    expect(definitions.map((definition) => definition.id)).toEqual(['a']);
    expect(unreachableWindowIds).toEqual([2]);
  });

  test('reloads a web view in the window that actually owns it, not the focused one', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['owned-view']);
    withWindows({ 1: focused, 2: owner });
    const router = await getRouter();

    await router.reloadWebView('someType', 'owned-view');

    expect(owner.reloadWebView).toHaveBeenCalled();
    expect(focused.reloadWebView).not.toHaveBeenCalled();
  });

  test('falls back to the focused window when no window owns the web view', async () => {
    const focused = windowShard([]);
    withWindows({ 1: focused, 2: windowShard([]) });
    const router = await getRouter();

    await router.reloadWebView('someType', 'unknown-view');

    expect(focused.reloadWebView).toHaveBeenCalled();
  });

  test('opens an existing web view in its owning window when given an existingId', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['existing-view']);
    withWindows({ 1: focused, 2: owner });
    const router = await getRouter();

    await router.openWebView('someType', undefined, { existingId: 'existing-view' });

    expect(owner.openWebView).toHaveBeenCalled();
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('opens a brand new web view in the focused window', async () => {
    const focused = windowShard([]);
    const other = windowShard([]);
    withWindows({ 1: focused, 2: other });
    const router = await getRouter();

    await router.openWebView('someType');

    expect(focused.openWebView).toHaveBeenCalled();
    expect(other.openWebView).not.toHaveBeenCalled();
  });

  test('asks the owning window for a definition once, and answers with what it already fetched', async () => {
    // Finding the owner means fetching the definition, so fetching it again to return it is a
    // second cross-process round trip for an answer already in hand — and the two can disagree
    const owner = windowShard(['owned-view']);
    withWindows({ 1: windowShard([]), 2: owner });
    const router = await getRouter();

    const definition = await router.getOpenWebViewDefinition('owned-view');

    expect(definition?.id).toBe('owned-view');
    expect(owner.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
  });

  test('does not ask a window that has not registered its services yet who owns a web view, and will not fall back to focus', async () => {
    // The window that could not be asked is the one holding the web view here, which is exactly why
    // falling back to focus is wrong: it would reload whatever the focused window is showing
    const focused = windowShard([]);
    const starting = windowShard(['owned-view']);
    withWindows({ 1: focused, 2: starting }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(router.reloadWebView('someType', 'owned-view')).rejects.toThrow('unreachable');
    expect(starting.getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(focused.reloadWebView).not.toHaveBeenCalled();
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    withWindows({});
    const router = await getRouter();

    await expect(router.openWebView('someType')).rejects.toThrow('No windows available');
  });

  describe('a ready window whose WebView service has not registered yet', () => {
    // Readiness is keyed on the WINDOW service. A renderer starts its window, web view, notification
    // and dialog services concurrently, so a window can be ready while its WebView service is still
    // moments away — a window that cannot be asked, which is not a window that answered "nothing".

    test('refuses to answer with a list that leaves it out', async () => {
      withWindows({ 1: windowShard(['a']), 2: undefined });
      const router = await getRouter();

      await expect(router.getAllOpenWebViewDefinitions()).rejects.toThrow('unreachable');
    });

    test('reports it as unreachable to callers that can act on a partial list', async () => {
      withWindows({ 1: windowShard(['a']), 2: undefined });

      const { definitions, unreachableWindowIds } =
        await getAllOpenWebViewDefinitionsWithReachability();

      expect(definitions.map((definition) => definition.id)).toEqual(['a']);
      expect(unreachableWindowIds).toEqual([2]);
    });

    test('refuses to route an operation to the focused window as if nobody owned the web view', async () => {
      // Falling back would reload whatever the focused window happens to be showing instead of the
      // web view the caller named — which may well be in the window that could not be asked
      withWindows({ 1: windowShard([]), 2: undefined });
      const router = await getRouter();

      await expect(router.reloadWebView('someType', 'owned-view')).rejects.toThrow('unreachable');
    });

    test('still answers when another window claims the web view', async () => {
      // A window that could not be asked only matters when nobody claimed the id
      const owner = windowShard(['owned-view']);
      withWindows({ 1: owner, 2: undefined });
      const router = await getRouter();

      await expect(router.reloadWebView('someType', 'owned-view')).resolves.toBe('reloaded');
    });
  });

  describe('asking one specific window what it has open', () => {
    test('answers with what that window has open', async () => {
      withWindows({ 1: windowShard(['a', 'b']) });

      const definitions = await getOpenWebViewDefinitionsForWindow(1);

      expect(definitions.map((definition) => definition.id)).toEqual(['a', 'b']);
    });

    test('refuses to answer "nothing open" for a window that was serving requests', async () => {
      // This is the read a closing window's sync depends on, and that window's own service is the
      // only thing that could ever list its editors. An empty answer here is indistinguishable from
      // the truth, so its unsynced work would be dropped with nothing to correct it later.
      withWindows({ 1: undefined });
      mocks.isWindowReady.mockReturnValue(true);

      await expect(getOpenWebViewDefinitionsForWindow(1)).rejects.toThrow('could not be read');
    });

    test('answers nothing open for a window whose renderer never registered', async () => {
      // A window that was never ready never had a web view in it, so there is nothing to warn about
      withWindows({ 1: undefined });
      mocks.isWindowReady.mockReturnValue(false);

      await expect(getOpenWebViewDefinitionsForWindow(1)).resolves.toEqual([]);
    });
  });

  describe('the settings commands', () => {
    test('claims all three settings command names', async () => {
      await getCommandHandler('platform.openSettings');

      expect([...registrations().keys()].sort()).toEqual(
        [
          'command:platform.openProjectSettings',
          'command:platform.openSettings',
          'command:platform.openUserSettings',
        ].sort(),
      );
    });

    test('opens the settings for a named web view in the window that owns it', async () => {
      // Focus is on window 1, but window 2 is showing this web view — its settings must open there,
      // where the web view (and so its project) actually is
      const shards = {
        1: windowShardWithProjects({}),
        2: windowShardWithProjects({ 'owned-view': 'project-2' }),
      };
      withWindows(shards);
      const openSettings = await getCommandHandler('platform.openSettings');

      await openSettings('owned-view');

      expect(shards[2].openSettingsTab).toHaveBeenCalledWith('project-2');
      expect(shards[1].openSettingsTab).not.toHaveBeenCalled();
    });

    test('passes the project the ownership search already read, without asking again', async () => {
      // The owner lookup returns the definition it fetched; a second read would be another
      // cross-process round trip that can come back with something different
      const shard = windowShardWithProjects({ 'owned-view': 'project-2' });
      withWindows({ 2: shard });
      const openSettings = await getCommandHandler('platform.openSettings');

      await openSettings('owned-view');

      expect(shard.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
      expect(shard.openSettingsTab).toHaveBeenCalledWith('project-2');
    });

    test('routes the deprecated openProjectSettings by ownership too', async () => {
      const shards = {
        1: windowShardWithProjects({}),
        2: windowShardWithProjects({ 'owned-view': 'project-2' }),
      };
      withWindows(shards);
      const openProjectSettings = await getCommandHandler('platform.openProjectSettings');

      await openProjectSettings('owned-view');

      expect(shards[2].openSettingsTab).toHaveBeenCalledWith('project-2');
    });

    test('follows focus for openUserSettings, which names no web view', async () => {
      // `platform.openUserSettings` opens the same tab but is declared to take no arguments, so it
      // has no owner to route by and belongs to the window the user is in. Losing this distinction
      // would send it to whichever window happens to own some web view.
      const shards = {
        1: windowShardWithProjects({}),
        2: windowShardWithProjects({ 'owned-view': 'project-2' }),
      };
      withWindows(shards);
      const openUserSettings = await getCommandHandler('platform.openUserSettings');

      await openUserSettings();

      expect(shards[1].openSettingsTab).toHaveBeenCalledWith(undefined);
      expect(shards[2].openSettingsTab).not.toHaveBeenCalled();
      // No ownership fan-out at all for a command that names nothing
      expect(shards[2].getOpenWebViewDefinition).not.toHaveBeenCalled();
    });

    test('opens unlimited settings in the focused window when openSettings names no web view', async () => {
      const shards = {
        1: windowShardWithProjects({}),
        2: windowShardWithProjects({ 'owned-view': 'project-2' }),
      };
      withWindows(shards);
      const openSettings = await getCommandHandler('platform.openSettings');

      await openSettings();

      expect(shards[1].openSettingsTab).toHaveBeenCalledWith(undefined);
      expect(shards[2].getOpenWebViewDefinition).not.toHaveBeenCalled();
    });

    test('falls back to the focused window when no window owns the named web view', async () => {
      const shards = { 1: windowShardWithProjects({}), 2: windowShardWithProjects({}) };
      withWindows(shards);
      const openSettings = await getCommandHandler('platform.openSettings');

      await openSettings('gone-view');

      expect(shards[1].openSettingsTab).toHaveBeenCalledWith(undefined);
    });

    test('fails the call rather than running it in the wrong window when a window cannot be asked', async () => {
      // Falling back to focus here opens the settings for a web view in a window that does not have
      // it, against whichever project that window happens to be showing
      const shards = {
        1: windowShardWithProjects({}),
        2: windowShardWithProjects({ 'owned-view': 'project-2' }),
      };
      withWindows(shards, { unreadyWindowIds: [2] });
      const openSettings = await getCommandHandler('platform.openSettings');

      await expect(openSettings('owned-view')).rejects.toThrow('unreachable');
      expect(shards[1].openSettingsTab).not.toHaveBeenCalled();
    });
  });
});
