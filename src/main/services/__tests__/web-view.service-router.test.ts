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
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
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
    getFocusedWindowId: vi.fn(),
    focusWindow: vi.fn(),
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    loggerWarn: vi.fn(),
    loggerDebug: vi.fn(),
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
  logger: { info: vi.fn(), warn: mocks.loggerWarn, debug: mocks.loggerDebug, error: vi.fn() },
}));

/** Capture the router object registered under the generic name */
async function getRouter() {
  return getRegisteredRouter<WebViewServiceType>(mocks.networkObjectSet, startWebViewServiceRouter);
}

/**
 * A per-window WebView service shard whose web views are the given ids, or full definitions for
 * tests that need more than an id — a type search reads `webViewType` off of what
 * `getAllOpenWebViewDefinitions` returns.
 *
 * @param openWebViews Web views this window has open
 * @param otherDockIds Ids this window's dock holds that are not web views — tab groups, and tabs of
 *   other kinds. A dock holds its web view tabs too, so those need not be repeated here.
 */
function windowShard(
  openWebViews: (string | SavedWebViewDefinition)[],
  otherDockIds: string[] = [],
) {
  const definitions = openWebViews.map((entry) =>
    typeof entry === 'string' ? { id: entry } : entry,
  );
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      definitions.find((definition) => definition.id === id),
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => definitions),
    dockContainsTab: vi.fn(
      async (tabOrTabGroupId: string) =>
        definitions.some((definition) => definition.id === tabOrTabGroupId) ||
        otherDockIds.includes(tabOrTabGroupId),
    ),
    // Typed the way the real method is — it answers with nothing when the open did not happen
    openWebView: vi.fn<() => Promise<string | undefined>>(async () => 'opened'),
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
    mocks.getFocusedWindowId.mockReturnValue(1);
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

  test('existingId "?" finds a matching web view in a window other than the routing target', async () => {
    const targetWindow = windowShard([]);
    const owner = windowShard([{ id: 'wv-2', webViewType: 'comments' }]);
    owner.openWebView.mockResolvedValue('wv-2');
    withWindows({ 1: targetWindow, 2: owner });
    const router = await getRouter();

    const result = await router.openWebView('comments', undefined, { existingId: '?' });

    expect(result).toBe('wv-2');
    expect(owner.openWebView).toHaveBeenCalled();
    expect(targetWindow.openWebView).not.toHaveBeenCalled();
  });

  test('two matching web views resolve to the routing target rather than the older window', async () => {
    // Two windows each having one open web view of a type is the ordinary simple-mode state, not a
    // violated invariant, but the router still has to pick the same one every time rather than
    // whichever window answered first
    const older = windowShard([{ id: 'wv-old', webViewType: 'comments' }]);
    const target = windowShard([{ id: 'wv-here', webViewType: 'comments' }]);
    older.openWebView.mockResolvedValue('wv-old');
    target.openWebView.mockResolvedValue('wv-here');
    withWindows({ 1: older, 2: target });
    mocks.getTargetWindowId.mockReturnValue(2);
    const router = await getRouter();

    const result = await router.openWebView('comments', undefined, { existingId: '?' });

    expect(result).toBe('wv-here');
    expect(mocks.loggerDebug).toHaveBeenCalledWith(expect.stringContaining('comments'));
    expect(mocks.loggerWarn).not.toHaveBeenCalled();
  });

  test('two windows both answering the same id search is a warned invariant violation', async () => {
    // Unlike a type search, an id search matching in more than one window means the per-window id
    // scoping that is supposed to make ids unique app-wide was bypassed somehow
    const older = windowShard(['dup-id']);
    const target = windowShard(['dup-id']);
    withWindows({ 1: older, 2: target });
    mocks.getTargetWindowId.mockReturnValue(2);
    const router = await getRouter();

    await router.reloadWebView('someType', 'dup-id');

    expect(mocks.loggerWarn).toHaveBeenCalledWith(expect.stringContaining('dup-id'));
    expect(mocks.loggerDebug).not.toHaveBeenCalled();
  });

  test('finds a `?` match even when a window that could not be asked sorts ahead of it', async () => {
    // getReadyWindowIds() lists window 1 before window 2, so an implementation that gave up as soon
    // as it hit a window it could not ask — instead of waiting for every ready window to answer
    // before deciding — would report this as unreachable without ever reaching window 2, where the
    // match actually is
    const owner = windowShard([{ id: 'wv-2', webViewType: 'comments' }]);
    withWindows({ 1: undefined, 2: owner });
    const router = await getRouter();

    await expect(router.openWebView('comments', undefined, { existingId: '?' })).resolves.toBe(
      'opened',
    );
    expect(owner.openWebView).toHaveBeenCalled();
  });

  test('a probe returns not-found rather than throwing when a window could not be asked', async () => {
    // Nothing claimed the web view, and window 2 could not be asked at all — a probe has nothing
    // to lose by treating that as not-found rather than failing the call
    withWindows({ 1: windowShard([]), 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, { existingId: '?', createNewIfNotFound: false }),
    ).resolves.toBeUndefined();
  });

  test('an open that would create refuses to guess when a window could not be asked', async () => {
    // The window that could not be asked may be the one already holding this web view, so
    // creating here risks minting a second copy of a view meant to be unique app-wide
    withWindows({ 1: windowShard([]), 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(
      router.openWebView('comments', undefined, { existingId: '?', createNewIfNotFound: true }),
    ).rejects.toThrow(/unreachable/i);
  });

  describe('a layout that names a tab to open next to', () => {
    // A layout naming a target tab names the window that tab is in just as surely as `existingId`
    // does, and the tab it names is routinely in a window other than the one the user is working in
    // — a comment panel opened beside an editor, a resource opened beside the tab it came from

    test('opens next to a panel layout`s target tab in the window that owns it', async () => {
      const focused = windowShard([]);
      const owner = windowShard(['target-tab']);
      withWindows({ 1: focused, 2: owner });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'panel', targetTabId: 'target-tab' });

      expect(owner.openWebView).toHaveBeenCalled();
      expect(focused.openWebView).not.toHaveBeenCalled();
    });

    test('opens over a replace-tab layout`s target tab in the window that owns it', async () => {
      const focused = windowShard([]);
      const owner = windowShard(['target-tab']);
      withWindows({ 1: focused, 2: owner });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'replace-tab', targetTabId: 'target-tab' });

      expect(owner.openWebView).toHaveBeenCalled();
      expect(focused.openWebView).not.toHaveBeenCalled();
    });

    test('opens in the window whose dock holds the tab group a tab layout names', async () => {
      // The dock's "+" button sends a command naming the tab group it was clicked in, and that
      // command comes back through the router from the extension host — by which point the window
      // it started in is no longer necessarily the one this call is headed for
      const focused = windowShard([]);
      const owner = windowShard([], ['tab-group-9']);
      withWindows({ 1: focused, 2: owner });
      const router = await getRouter();

      await router.openWebView('comments', { type: 'tab', parentTabGroupId: 'tab-group-9' });

      expect(owner.openWebView).toHaveBeenCalled();
      expect(focused.openWebView).not.toHaveBeenCalled();
    });

    test('opens in the window whose dock holds a target tab that is no web view', async () => {
      // A tab is not always a web view — settings tabs and dialogs are tabs too. Asking which
      // window has the web view with that id answers "none" for those, and the window it then falls
      // back to is the one window that is sure to reject the layout as naming a tab it does not have
      const focused = windowShard([]);
      const owner = windowShard([], ['settings-tab']);
      withWindows({ 1: focused, 2: owner });
      const router = await getRouter();

      await router.openWebView('comments', { type: 'panel', targetTabId: 'settings-tab' });

      expect(owner.openWebView).toHaveBeenCalled();
      expect(focused.openWebView).not.toHaveBeenCalled();
    });

    test('keeps a tab group id that several windows use in the window the call is headed for', async () => {
      // Tab group ids are minted per window, so two windows routinely hold the same one and the
      // window a call is already headed for is the only thing that tells them apart. Picking the
      // lowest window id instead would send every "+" click in a later window to an unrelated tab
      // group in the first one.
      const other = windowShard([], ['+1']);
      const target = windowShard([], ['+1']);
      withWindows({ 1: other, 2: target });
      mocks.getTargetWindowId.mockReturnValue(2);
      const router = await getRouter();

      await router.openWebView('comments', { type: 'tab', parentTabGroupId: '+1' });

      expect(target.openWebView).toHaveBeenCalled();
      expect(other.openWebView).not.toHaveBeenCalled();
    });

    test('lets an existing web view decide the window before the layout target does', async () => {
      // The window shard brings an existing web view to the front and returns before it ever looks
      // at the layout, so routing has to put the two in the same order the shard does
      const focused = windowShard([]);
      const existingOwner = windowShard(['existing-view']);
      const targetOwner = windowShard(['target-tab']);
      withWindows({ 1: focused, 2: existingOwner, 3: targetOwner });
      const router = await getRouter();

      await router.openWebView(
        'someType',
        { type: 'panel', targetTabId: 'target-tab' },
        { existingId: 'existing-view' },
      );

      expect(existingOwner.openWebView).toHaveBeenCalled();
      expect(targetOwner.openWebView).not.toHaveBeenCalled();
    });

    test('falls back to the focused window when no window owns the layout target', async () => {
      const focused = windowShard([]);
      withWindows({ 1: focused, 2: windowShard([]) });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'panel', targetTabId: 'tab-nobody-has' });

      expect(focused.openWebView).toHaveBeenCalled();
    });

    test('still opens when a window that could not be asked might have had the target', async () => {
      // The `existingId` search fails the call here, because guessing wrong there mints a second
      // copy of a web view meant to be unique. Guessing wrong about a layout target costs placement
      // and nothing else — and a window stays unaskable for as long as its renderer takes to start,
      // or forever if it crashed, so failing would take every tab-naming open down with it
      const focused = windowShard([]);
      const starting = windowShard(['target-tab']);
      withWindows({ 1: focused, 2: starting }, { unreadyWindowIds: [2] });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'panel', targetTabId: 'target-tab' });

      expect(focused.openWebView).toHaveBeenCalled();
    });

    test('does not go looking for an owner when the layout names nothing', async () => {
      // A layout that names neither a tab nor a tab group means "wherever the user is", so
      // searching the windows for one would be a cross-process fan-out per open that can only ever
      // come back empty
      const focused = windowShard([]);
      const other = windowShard([]);
      withWindows({ 1: focused, 2: other });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'tab' });

      expect(focused.openWebView).toHaveBeenCalled();
      expect(other.dockContainsTab).not.toHaveBeenCalled();
    });
  });

  describe('raising the window an open was routed to', () => {
    // Routing an open to another window puts the tab where it belongs, but the window it went to is
    // behind the one the user is looking at — so without raising it the whole operation is invisible

    test('raises the window that owns an existing web view', async () => {
      const owner = windowShard(['existing-view']);
      // A found-existing open resolves to the id it searched for, not a placeholder only a freshly
      // created web view would produce — pinning the raise to that returned value keeps this test
      // from passing against an implementation that raises only for a genuinely new id.
      owner.openWebView.mockResolvedValue('existing-view');
      withWindows({ 1: windowShard([]), 2: owner });
      const router = await getRouter();

      await router.openWebView('someType', undefined, { existingId: 'existing-view' });

      expect(mocks.focusWindow).toHaveBeenCalledWith(2);
    });

    test('raises the window that owns the layout`s target tab', async () => {
      withWindows({ 1: windowShard([]), 2: windowShard(['target-tab']) });
      const router = await getRouter();

      await router.openWebView('someType', { type: 'panel', targetTabId: 'target-tab' });

      expect(mocks.focusWindow).toHaveBeenCalledWith(2);
    });

    test('leaves the window the user is already working in alone', async () => {
      // Raising the window a call was already going to steals focus from whatever the user is
      // doing — a dialog they are typing in, another app — to show them a tab that is already there
      const focused = windowShard(['existing-view']);
      withWindows({ 1: focused, 2: windowShard([]) });
      const router = await getRouter();

      await router.openWebView('someType', undefined, { existingId: 'existing-view' });

      expect(focused.openWebView).toHaveBeenCalled();
      expect(mocks.focusWindow).not.toHaveBeenCalled();
    });

    test('does not raise a window for an open that did not happen', async () => {
      // Raising a window to show a tab that never appeared is worse than not raising it
      const owner = windowShard(['existing-view']);
      owner.openWebView.mockResolvedValue(undefined);
      withWindows({ 1: windowShard([]), 2: owner });
      const router = await getRouter();

      await router.openWebView('someType', undefined, { existingId: 'existing-view' });

      expect(mocks.focusWindow).not.toHaveBeenCalled();
    });

    test('does not take focus from another application', async () => {
      // An open routed here is not necessarily something the user just asked for — an extension can
      // re-open a web view by id at any moment — so with the app in the background, raising a
      // window would pull it in front of whatever the user is actually working in
      mocks.getFocusedWindowId.mockReturnValue(undefined);
      withWindows({ 1: windowShard([]), 2: windowShard(['existing-view']) });
      const router = await getRouter();

      await router.openWebView('someType', undefined, { existingId: 'existing-view' });

      expect(mocks.focusWindow).not.toHaveBeenCalled();
    });

    test('does not raise anything when the open went to the focused window by fallback', async () => {
      withWindows({ 1: windowShard([]), 2: windowShard([]) });
      const router = await getRouter();

      await router.openWebView('someType');

      expect(mocks.focusWindow).not.toHaveBeenCalled();
    });

    test('does not raise the owning window for a passive probe that opted out of bringToFront', async () => {
      // A probe that already declined to be brought to the front is not something the user is
      // watching for — raising a window at it would steal focus every time it happened to run
      const owner = windowShard([{ id: 'wv-2', webViewType: 'comments' }]);
      owner.openWebView.mockResolvedValue('wv-2');
      withWindows({ 1: windowShard([]), 2: owner });
      const router = await getRouter();

      await router.openWebView('comments', undefined, {
        existingId: '?',
        createNewIfNotFound: false,
        bringToFront: false,
      });

      expect(mocks.focusWindow).not.toHaveBeenCalled();
    });

    test('raises the owning window when the caller explicitly asks to be brought to front', async () => {
      const owner = windowShard([{ id: 'wv-2', webViewType: 'comments' }]);
      owner.openWebView.mockResolvedValue('wv-2');
      withWindows({ 1: windowShard([]), 2: owner });
      const router = await getRouter();

      await router.openWebView('comments', undefined, { existingId: '?', bringToFront: true });

      expect(mocks.focusWindow).toHaveBeenCalledWith(2);
    });
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

  test('answers with the definition when another window claims it despite a window that could not be asked', async () => {
    // Mirrors "still answers when another window claims the web view" below for reloadWebView — a
    // match found in one window short-circuits regardless of another window being unreachable
    const owner = windowShard(['owned-view']);
    withWindows({ 1: owner, 2: windowShard([]) }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await expect(router.getOpenWebViewDefinition('owned-view')).resolves.toEqual({
      id: 'owned-view',
    });
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
