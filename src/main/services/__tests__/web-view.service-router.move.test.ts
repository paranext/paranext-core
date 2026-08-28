import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  getAllOpenWebViewDefinitionsWithReachability,
  setWebViewWindowCreator,
  startWebViewServiceRouter,
  testingWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import {
  getRegisteredRouter,
  settle,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import type { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import { getWebViewMoveFailureDisposition } from '@shared/models/web-view-move.model';
import { getErrorMessage } from 'platform-bible-utils';
import type { InternalRequestHandler } from '@shared/data/rpc.model';

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
    isWindowTracked: vi.fn<(windowId: string) => boolean>(() => true),
    getFocusedWindowId,
    // The real answer is false only while no window holds OS focus, which in this suite is exactly
    // when getFocusedWindowId answers undefined — derived so the focus-driven tests keep meaning
    // what they say
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
    loggerDebug: vi.fn(),
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

/**
 * Wire windows whose WebView service shards are the given objects, telling each stand-in which
 * window serves it — the ids a shard answers with are scoped to its own window (see
 * {@link windowShard}), so a shard that does not know which window it is cannot answer as one.
 */
function withWindows(
  shardsByWindowId: Record<string, WindowShard>,
  options?: { startingWindowIds?: string[]; unreachableWindowIds?: string[] },
) {
  Object.entries(shardsByWindowId).forEach(([windowId, shard]) => shard.setWindowId(windowId));
  withWindowsServingShards(mocks, WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId, options);
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
  isWindowReady: mocks.isWindowReady,
  isWindowClosing: mocks.isWindowClosing,
  isWindowTracked: mocks.isWindowTracked,
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
  logger: {
    warn: mocks.loggerWarn,
    error: mocks.loggerError,
    info: vi.fn(),
    debug: mocks.loggerDebug,
  },
}));

const { moveWebView } = testingWebViewServiceRouter;

/** Start the router and hand back the object it registered under the generic name */
async function getRouter() {
  return getRegisteredRouter<WebViewServiceType>(mocks.networkObjectSet, startWebViewServiceRouter);
}

/** Start the router and hand back the handler registered for the given command name */
async function getCommandHandler(commandName: string): Promise<InternalRequestHandler> {
  mocks.networkObjectSet.mockResolvedValue(undefined);
  mocks.registerRequestHandler.mockResolvedValue(vi.fn());
  await startWebViewServiceRouter();
  const call = mocks.registerRequestHandler.mock.calls.find(
    ([requestType]) => requestType === `command:${commandName}`,
  );
  if (!call) throw new Error(`${commandName} was not registered`);
  return call[1];
}

/**
 * The id a window holds a web view under. A window scopes the ids of the web views it holds, which
 * is the whole reason a move answers with the target's id rather than the one it was given — a
 * stand-in that echoed the caller's id back would make the two indistinguishable and every
 * assertion about which one a move reports unfalsifiable.
 */
function scopeWebViewIdToWindow(webViewId: WebViewId, windowId: string): WebViewId {
  return `${webViewId}-window-${windowId}`;
}

/**
 * A per-window WebView service shard whose web views are the given ids, extended with the move
 * primitives `moveWebView` drives. `captureAndCloseWebView` answers a definition only for ids this
 * window holds, matching the real shard's "not mine" answer of `undefined`; `adoptWebView` accepts
 * every move and answers with the id the definition is now open under HERE, which is this window's
 * scoping of it (see {@link scopeWebViewIdToWindow}) and not the id it was handed.
 */
function windowShard(openWebViewIds: string[]) {
  /** Set by `withWindows` from the id the shard is wired under */
  let windowId = '';
  return {
    setWindowId: (id: string) => {
      windowId = id;
    },
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
    >(async (savedWebViewDefinition) =>
      scopeWebViewIdToWindow(savedWebViewDefinition.id, windowId),
    ),
    // A window with nothing docked in it since its last emptiness report, which is what a window
    // created to receive a moved web view is until the adopt lands. A stand-in without this answers
    // every re-check with a TypeError, and the closes below would all reach the window through the
    // "could not ask" branch instead of the "nothing arrived, so close it" one they describe.
    hasContentArrivedSinceEmptyReport: vi.fn(async () => false),
  };
}

/** A window's WebView service shard stand-in, as {@link windowShard} builds it */
type WindowShard = ReturnType<typeof windowShard>;

/**
 * Run a move that must fail and hand back what it rejected with. A failed move's answer is not only
 * its prose: it names where the web view ended up as a disposition, which is what a caller telling
 * the user about the failure acts on.
 */
async function failedMove(moving: Promise<WebViewId>): Promise<unknown> {
  return moving.then(
    (movedWebViewId) => {
      throw new Error(`Expected the move to fail; it answered ${movedWebViewId}`);
    },
    (error: unknown) => error,
  );
}

/**
 * When a window's shard was resolved, on the same clock `vi`'s `invocationCallOrder` counts on — so
 * an ordering assertion can name a step that is not a call on any one window's stand-in. A shard is
 * resolved by asking the network object service for it by id, which is the only place that
 * happens.
 */
function resolvedShardOfWindowAt(windowId: string): number {
  const resolutionIndex = mocks.networkObjectGet.mock.calls.findIndex(
    (call: unknown[]) => call[0] === `shard-of-window-${windowId}`,
  );
  if (resolutionIndex < 0) throw new Error(`Window ${windowId}'s shard was never resolved`);
  return mocks.networkObjectGet.mock.invocationCallOrder[resolutionIndex];
}

describe('moveWebView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue('1');
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.isWindowClosing.mockReturnValue(false);
    mocks.getFocusedWindowId.mockReturnValue('1');
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('moves to an existing window: captures in the owner, adopts in the target, answers the id', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });

    const movedId = await moveWebView('view-1', { kind: 'window', windowId: '3' });

    expect(owner.captureAndCloseWebView).toHaveBeenCalledWith('view-1');
    expect(target.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
    // Close-before-adopt, not merely both-happened: a one-instance web view cannot be opened in the
    // target while the source instance is alive, so capturing has to finish before the target adopts
    expect(owner.captureAndCloseWebView.mock.invocationCallOrder[0]).toBeLessThan(
      target.adoptWebView.mock.invocationCallOrder[0],
    );
    // The target's answer, not the caller's id: window 3 holds it under its own scoping of the id,
    // and that is what anything after the move has to use
    expect(movedId).toBe('view-1-window-3');
  });

  test('raises the target window after a successful move while the app holds focus', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.getFocusedWindowId.mockReturnValue('2');

    await moveWebView('view-1', { kind: 'window', windowId: '3' });

    expect(mocks.focusWindow).toHaveBeenCalledWith('3');
  });

  test('does not raise any window when the app does not hold focus', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.getFocusedWindowId.mockReturnValue(undefined);

    await moveWebView('view-1', { kind: 'window', windowId: '3' });

    expect(mocks.focusWindow).not.toHaveBeenCalled();
  });

  test('an unknown target window fails the move before anything closes', async () => {
    // resolveShardForWindow waits out the shard-announcement grace period for a window id it has
    // never indexed before giving up — same reasoning as the pre-existing suite's equivalent test.
    vi.useFakeTimers();
    try {
      const owner = windowShard(['view-1']);
      withWindows({ 2: owner });

      const moving = moveWebView('view-1', { kind: 'window', windowId: '99' });
      moving.catch(() => undefined);

      await vi.runAllTimersAsync();

      await expect(moving).rejects.toThrow();
      expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  test('a target window whose close is already decided fails the move before anything closes', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.isWindowClosing.mockImplementation((windowId: string) => windowId === '3');

    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /that window is closing/,
    );

    // Adopting into a window on its way out would report success and then lose the view
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
    expect(target.adoptWebView).not.toHaveBeenCalled();
  });

  test('an unknown web view fails the move', async () => {
    withWindows({ 2: windowShard([]) });

    await expect(moveWebView('missing-view', { kind: 'window', windowId: '2' })).rejects.toThrow(
      'no window has it open',
    );
  });

  test('a web view already in the target window is left alone', async () => {
    const owner = windowShard(['view-1']);
    withWindows({ 2: owner });

    const movedId = await moveWebView('view-1', { kind: 'window', windowId: '2' });

    // Unchanged, because no window adopted it: an adopt would have answered with the adopting
    // window's own scoping of the id
    expect(movedId).toBe('view-1');
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    expect(mocks.focusWindow).not.toHaveBeenCalled();
  });

  test('moving to a new window uses the pending-content scaffold', async () => {
    const owner = windowShard(['view-1']);
    const created = windowShard([]);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    const movedId = await moveWebView('view-1', { kind: 'new' });

    expect(creator.createPendingContentWindow).toHaveBeenCalled();
    expect(owner.captureAndCloseWebView).toHaveBeenCalledWith('view-1');
    expect(created.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
    // Close-before-adopt holds for the fresh window too: the capture has to finish before the
    // window created for the view adopts it
    expect(owner.captureAndCloseWebView.mock.invocationCallOrder[0]).toBeLessThan(
      created.adoptWebView.mock.invocationCallOrder[0],
    );
    expect(mocks.clearWindowPendingContent).toHaveBeenCalledWith('7');
    // The window created for it answers with its own scoping of the id, same as any other target
    expect(movedId).toBe('view-1-window-7');
  });

  test('a move to a new window waits for that window to be reachable before the source tab closes', async () => {
    // A window created for a move is a cold renderer start: bundle, network service, shard
    // registration. Waiting that out while the web view is open in no window is what puts the
    // user's tab at the mercy of a start that may be slow or may never finish, so the wait belongs
    // before the capture, while the tab is still where the user left it.
    const owner = windowShard(['view-1']);
    const created = windowShard([]);
    // Window 7 has not announced a shard: its renderer is still starting, so nothing can be routed
    // to it yet
    withWindows({ 2: owner });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    const moving = moveWebView('view-1', { kind: 'new' });
    await settle();

    expect(creator.createPendingContentWindow).toHaveBeenCalled();
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();

    // The new window's renderer finishes starting and registers its shard
    withWindows({ 2: owner, 7: created });

    await expect(moving).resolves.toBe('view-1-window-7');
    expect(owner.captureAndCloseWebView).toHaveBeenCalledWith('view-1');
    // Resolve-before-capture, not merely both-happened: the ordering is the whole protection, and
    // an implementation that captured first would still pass every other assertion here
    expect(resolvedShardOfWindowAt('7')).toBeLessThan(
      owner.captureAndCloseWebView.mock.invocationCallOrder[0],
    );
  });

  test('a new window that never becomes reachable fails the move with the web view untouched', async () => {
    // resolveShardForWindow waits out the shard-announcement grace period before giving up — same
    // reasoning as the unknown-target-window test above.
    vi.useFakeTimers();
    try {
      const owner = windowShard(['view-1']);
      // Nothing ever announces a shard for window 7, so the window the move created never becomes
      // somewhere the web view can go
      withWindows({ 2: owner });
      const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
      setWebViewWindowCreator(creator);

      const moving = moveWebView('view-1', { kind: 'new' });
      moving.catch(() => undefined);

      await vi.runAllTimersAsync();

      const failure = await failedMove(moving);

      // Nothing took the web view out of its window, so there is nothing to recover: the user's tab
      // is still where it was, and the failure is a delay and an error rather than a tab in limbo
      expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
      expect(owner.adoptWebView).not.toHaveBeenCalled();
      // Which is what a caller must be able to read off the rejection: no disposition means nothing
      // about where the web view lives changed
      expect(getWebViewMoveFailureDisposition(failure)).toBeUndefined();
      // The window it created is an empty shell the user never asked to manage
      expect(creator.closeWindow).toHaveBeenCalledWith('7');
    } finally {
      vi.useRealTimers();
    }
  });

  test('move-to-new-window outside power mode leaves the view where it is', async () => {
    mocks.settingsGet.mockResolvedValue('simple');
    const owner = windowShard(['view-1']);
    withWindows({ 2: owner });

    const movedId = await moveWebView('view-1', { kind: 'new' });

    expect(movedId).toBe('view-1');
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
  });

  test('an unreadable interface mode fails the move rather than reporting it done', async () => {
    // Only Simple mode means "there is nowhere else to move to, so leave it alone". A mode that
    // could not be read is not that answer: treating it as one resolves the move successfully
    // having moved nothing, so the caller — and the tab-title notification it drives — tells the
    // user the web view is in a new window while it sits exactly where it was.
    mocks.settingsGet.mockRejectedValue(new Error('settings service is down'));
    const owner = windowShard(['view-1']);
    withWindows({ 2: owner });

    await expect(moveWebView('view-1', { kind: 'new' })).rejects.toThrow(/interface mode/);

    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
  });

  test('a capture that comes back empty fails the move, saying the tab may be gone', async () => {
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockResolvedValue(undefined);
    withWindows({ 2: owner, 3: windowShard([]) });

    const failure = await failedMove(moveWebView('view-1', { kind: 'window', windowId: '3' }));

    expect(getErrorMessage(failure)).toContain('no longer had it');
    // The window that held it a moment ago says it does not: the tab is not where the user left
    // it, and a caller told only that the move failed would report an action that did nothing
    expect(getWebViewMoveFailureDisposition(failure)).toBe('possibly-closed');
    // That disposition sends the user to the log for what became of their tab, so the owner
    // search's definition has to be there — an empty capture says nothing itself, so without this
    // the log holds only that the window did not have it
    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify({ id: 'view-1' })),
    );
  });

  test('a capture that comes back empty closes the window the move created to receive the view', async () => {
    // The other way a move to a new window ends holding a window nothing will ever fill: the owner
    // answers that it does not have the web view, rather than failing to hand it over. The window is
    // just as empty either way.
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockResolvedValue(undefined);
    const created = windowShard([]);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    await expect(moveWebView('view-1', { kind: 'new' })).rejects.toThrow(/no longer had it/);

    expect(created.adoptWebView).not.toHaveBeenCalled();
    expect(creator.closeWindow).toHaveBeenCalledWith('7');
    // Closed because the window answered that nothing reached it, not because it could not be
    // asked: a stand-in the re-check cannot run against closes every window in this file through
    // the "could not ask" branch, which makes every close assertion here pass for a reason none of
    // them describe
    expect(created.hasContentArrivedSinceEmptyReport).toHaveBeenCalled();
    expect(mocks.loggerWarn).not.toHaveBeenCalledWith(
      expect.stringContaining('whether content reached it'),
    );
  });

  test('a capture that throws fails the move with the owner-search definition in the log', async () => {
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockRejectedValue(new Error('capture round trip lost'));
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });

    const failure = await failedMove(moveWebView('view-1', { kind: 'window', windowId: '3' }));

    expect(getErrorMessage(failure)).toMatch(
      /Could not move webview view-1 to window 3: capturing it failed/,
    );
    // A capture that failed across processes can have closed the tab without delivering anything,
    // so where the web view is cannot be told from here. Reporting it as a failure that changed
    // nothing tells the user their action did nothing while the tab may be gone from the screen.
    expect(getWebViewMoveFailureDisposition(failure)).toBe('possibly-closed');
    // The owner search's own answer is what gets logged — the only definition still in hand once
    // the capture itself is the thing that failed
    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify({ id: 'view-1' })),
    );
    // No recovery attempt: re-adopting from the owner search's definition could duplicate a view
    // whose tab never actually closed
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    expect(target.adoptWebView).not.toHaveBeenCalled();
  });

  test('a capture that throws closes the window the move created to receive the view', async () => {
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockRejectedValue(new Error('capture round trip lost'));
    const created = windowShard([]);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    await expect(moveWebView('view-1', { kind: 'new' })).rejects.toThrow(/capturing it failed/);

    // The window is ready and nothing is ever coming to fill it, so it must not outlive the move
    // that created it: an empty window is a shell the user never asked to manage
    expect(created.adoptWebView).not.toHaveBeenCalled();
    expect(creator.closeWindow).toHaveBeenCalledWith('7');
  });

  test('a failed target adopt reopens the view in the source window and still rejects', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    withWindows({ 2: owner, 3: target });

    const failure = await failedMove(moveWebView('view-1', { kind: 'window', windowId: '3' }));

    expect(getErrorMessage(failure)).toMatch(/window 2, where it came from/);
    // Nothing about where the view lives changed, and the rejection has to say so in the one form a
    // caller can act on — the prose is for the log
    expect(getWebViewMoveFailureDisposition(failure)).toBe('reopened-in-source-window');
    expect(owner.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
  });

  test('a closing source window is skipped and the view reopens in the focused window', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    const focused = windowShard([]);
    withWindows({ 1: focused, 2: owner, 3: target });
    mocks.isWindowClosing.mockImplementation((windowId: string) => windowId === '2');
    mocks.getTargetWindowId.mockReturnValue('1');

    const failure = await failedMove(moveWebView('view-1', { kind: 'window', windowId: '3' }));

    expect(getErrorMessage(failure)).toMatch(/the focused window/);
    // The view DID move, just not where the caller asked — an outcome a caller must be able to tell
    // apart from the one where nothing happened
    expect(getWebViewMoveFailureDisposition(failure)).toBe('reopened-in-focused-window');
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    expect(focused.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
  });

  test('a source window that began closing while it readopted does not count as recovered', async () => {
    // Capturing out of the source is what emptied it, so its close can be decided at any moment —
    // including while the readopt that is putting the web view back is in flight. Reporting that as
    // where the view ended up would name a window that is on its way out.
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    const focused = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    let hasSourceCloseBeenDecided = false;
    owner.adoptWebView.mockImplementation(async (savedWebViewDefinition) => {
      hasSourceCloseBeenDecided = true;
      return savedWebViewDefinition.id;
    });
    withWindows({ 1: focused, 2: owner, 3: target });
    mocks.isWindowClosing.mockImplementation(
      (windowId: string) => windowId === '2' && hasSourceCloseBeenDecided,
    );
    mocks.getTargetWindowId.mockReturnValue('1');

    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /the focused window/,
    );

    expect(owner.adoptWebView).toHaveBeenCalled();
    expect(focused.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
  });

  test('a provider decline in a new window closes that window and enters recovery', async () => {
    const owner = windowShard(['view-1']);
    const created = windowShard([]);
    created.adoptWebView.mockResolvedValue(undefined);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    await expect(moveWebView('view-1', { kind: 'new' })).rejects.toThrow();

    expect(creator.closeWindow).toHaveBeenCalledWith('7');
    // Recovery entered: the source window is offered the definition back
    expect(owner.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
  });

  test('when nothing can reopen the view, the move rejects and the definition is in the log', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    owner.adoptWebView.mockRejectedValue(new Error('source is gone too'));
    const focused = windowShard([]);
    focused.adoptWebView.mockRejectedValue(new Error('focused window is gone too'));
    withWindows({ 1: focused, 2: owner, 3: target });

    const failure = await failedMove(moveWebView('view-1', { kind: 'window', windowId: '3' }));

    expect(getErrorMessage(failure)).toContain('captured definition is in the log');
    // The web view is open in no window at all. A caller told only that the move failed would
    // report an action that did nothing, while the user's tab is gone from the screen.
    expect(getWebViewMoveFailureDisposition(failure)).toBe('not-reopened');
    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify({ id: 'view-1', webViewType: 'test.type' })),
    );
  });
});

describe('a web view that is between windows on a move', () => {
  /** A move whose target adopt hangs until the test releases it, holding the capture→adopt gap open */
  /**
   * A source window whose capture really closes the tab, the way the real shard's does. The shared
   * stand-in above leaves its list alone, which no window does — and the whole point of the gap is
   * that the source stops answering for the web view before the target starts.
   */
  function sourceWindowShard(
    webViewId: WebViewId,
    capturedWebViewId: WebViewId = webViewId,
    extraCapturedFields: Partial<SavedWebViewDefinition> = {},
  ) {
    const shard = windowShard([webViewId]);
    shard.captureAndCloseWebView.mockImplementation(async (id) => {
      if (id !== webViewId) return undefined;
      shard.getOpenWebViewDefinition.mockResolvedValue(undefined);
      shard.getAllOpenWebViewDefinitions.mockResolvedValue([]);
      return { id: capturedWebViewId, webViewType: 'test.type', ...extraCapturedFields };
    });
    return shard;
  }

  async function moveWithHangingAdopt() {
    const owner = sourceWindowShard('view-1');
    const target = windowShard([]);
    let releaseAdopt: (webViewId: WebViewId) => void = () => {};
    target.adoptWebView.mockImplementation(
      async () =>
        new Promise<WebViewId>((resolve) => {
          releaseAdopt = resolve;
        }),
    );
    withWindows({ 2: owner, 3: target });
    const router = await getRouter();

    const moving = moveWebView('view-1', { kind: 'window', windowId: '3' });
    await settle();
    return { router, moving, releaseAdopt: (webViewId: WebViewId) => releaseAdopt(webViewId) };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue('1');
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.isWindowClosing.mockReturnValue(false);
    mocks.getFocusedWindowId.mockReturnValue('1');
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('a search landing in the capture-to-adopt gap is told the question could not be answered', async () => {
    // The source tab closes before the target opens it, so for that gap the web view is open in NO
    // window: every window answers the search truthfully and the search still comes back wrong. A
    // caller that creates on a miss would mint a second copy of a view meant to be unique.
    const { router, moving, releaseAdopt } = await moveWithHangingAdopt();

    await expect(router.getOpenWebViewDefinition('view-1')).rejects.toThrow(/unreachable/);

    releaseAdopt('view-1');
    await moving;
  });

  test('a search for the id the capture stripped the window scope from is refused too', async () => {
    // A web view restored from a persisted layout is named by a window-scoped id, and the capture
    // strips that scope rather than carry one window's scope into another — so for the gap the view
    // has two names, and a search under either has to be told the question could not be answered.
    // Refusing only for the name the caller used sends a search for the captured id away with
    // "nobody has it", which is what mints a second copy of a view meant to be unique.
    const owner = sourceWindowShard('view-1-window-2', 'view-1');
    const target = windowShard([]);
    let releaseAdopt: (webViewId: WebViewId) => void = () => {};
    target.adoptWebView.mockImplementation(
      async () =>
        new Promise<WebViewId>((resolve) => {
          releaseAdopt = resolve;
        }),
    );
    withWindows({ 2: owner, 3: target });
    const router = await getRouter();

    const moving = moveWebView('view-1-window-2', { kind: 'window', windowId: '3' });
    await settle();

    await expect(router.getOpenWebViewDefinition('view-1')).rejects.toThrow(/unreachable/);

    // Ending the gap here rather than leaving the adopt hanging: the in-flight registry is module
    // state, so a move left open would keep refusing searches in every test after this one
    releaseAdopt('view-1-window-3');
    await moving;
  });

  test('a completed move stops answering that way', async () => {
    const { router, moving, releaseAdopt } = await moveWithHangingAdopt();

    releaseAdopt('view-1');
    await moving;

    // The gap is over, so searches answer for themselves again. Left standing, the entry would
    // make every later search for this id refuse for the rest of the session
    await expect(router.getOpenWebViewDefinition('view-1')).resolves.toBeUndefined();
  });

  test('a move that failed and recovered stops answering that way', async () => {
    // Recovery reopens the web view somewhere and then rejects, so the gap is over on that exit
    // too — as it is on every other one
    const owner = sourceWindowShard('view-1');
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    withWindows({ 2: owner, 3: target });
    const router = await getRouter();

    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /where it came from/,
    );

    await expect(router.getOpenWebViewDefinition('view-1')).resolves.toBeUndefined();
  });

  test('the fan-out folds in a web view captured mid-move, with its project and state intact', async () => {
    // Both windows answer the fan-out truthfully — the source closed the tab on capture, and the
    // target has not adopted yet — so without folding in the move record a writable Scripture
    // editor mid-move would be missing from a shutdown sync's project selection even though both
    // windows are healthy and nothing looks unreachable.
    const owner = sourceWindowShard('view-1', 'view-1', {
      projectId: 'project-1',
      state: { isReadOnly: false },
    });
    const target = windowShard([]);
    let releaseAdopt: (webViewId: WebViewId) => void = () => {};
    target.adoptWebView.mockImplementation(
      async () =>
        new Promise<WebViewId>((resolve) => {
          releaseAdopt = resolve;
        }),
    );
    withWindows({ 2: owner, 3: target });

    const moving = moveWebView('view-1', { kind: 'window', windowId: '3' });
    await settle();

    const { definitions } = await getAllOpenWebViewDefinitionsWithReachability();

    expect(definitions).toContainEqual(
      expect.objectContaining({
        id: 'view-1',
        projectId: 'project-1',
        state: { isReadOnly: false },
      }),
    );
    // The fold-in is invisible in the result — a folded-in definition looks exactly like one a
    // window reported — so the log line is the only way anyone reading a log can tell this read
    // covered a gap rather than finding nothing to cover.
    expect(mocks.loggerDebug).toHaveBeenCalledWith(
      expect.stringContaining('view-1 are between windows on a move'),
    );

    releaseAdopt('view-1');
    await moving;
  });

  test('does not double-count a web view the target already reports while the move record is still open', async () => {
    // A late-landing adopt (the router's own request timed out, but the target's state already has
    // it) clears the move record only once its own probe confirms — so for a stretch the target
    // already reports the definition AND the move record is still in the set. Folding in the move
    // record unconditionally would count the same web view twice.
    const owner = sourceWindowShard('view-1', 'view-1', { projectId: 'project-1' });
    const target = windowShard([]);
    let releaseAdopt: (webViewId: WebViewId) => void = () => {};
    target.adoptWebView.mockImplementation(
      async () =>
        new Promise<WebViewId>((resolve) => {
          releaseAdopt = resolve;
        }),
    );
    withWindows({ 2: owner, 3: target });

    const moving = moveWebView('view-1', { kind: 'window', windowId: '3' });
    await settle();

    const alreadyAdoptedDefinition: SavedWebViewDefinition = {
      id: 'view-1',
      webViewType: 'test.type',
      projectId: 'project-1',
    };
    target.getAllOpenWebViewDefinitions.mockResolvedValue([alreadyAdoptedDefinition]);

    const { definitions } = await getAllOpenWebViewDefinitionsWithReachability();

    expect(definitions.filter((definition) => definition.id === 'view-1')).toHaveLength(1);
    // Nothing was folded in, so nothing says it was. The sibling test above shows this same call
    // does log when a fold-in really happens, so silence here is the dedupe working rather than the
    // assertion having nothing to catch.
    expect(mocks.loggerDebug).not.toHaveBeenCalledWith(
      expect.stringContaining('are between windows on a move'),
    );

    releaseAdopt('view-1');
    await moving;
  });
});

describe('the move commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('the new-window command rejects a non-string web view id', async () => {
    const handler = await getCommandHandler('platform.moveWebViewToNewWindow');

    await expect(handler(42)).rejects.toThrow(/web view id/);
  });

  test('the to-window command rejects a non-string web view id', async () => {
    const handler = await getCommandHandler('platform.moveWebViewToWindow');

    await expect(handler(42, 3)).rejects.toThrow(/web view id/);
  });

  test('the to-window command rejects a non-string target window id', async () => {
    const handler = await getCommandHandler('platform.moveWebViewToWindow');

    await expect(handler('view-1', 42)).rejects.toThrow(/target window id/);
  });

  test('the to-window command rejects a window id no open window has, before asking a shard', async () => {
    // A window id is the caller's word for something only main can confirm: fabricated, or real
    // until the window closed while the caller was deciding. Refused here rather than at shard
    // resolution, which would spend its announcement grace period first and then fail as though a
    // real window had been slow to answer.
    // Set up through the window fixture rather than by overriding the mock here: this suite's
    // `beforeEach` runs `vi.clearAllMocks()`, which forgets recorded calls but keeps
    // implementations, so a hand-set one would outlive this test and reject window ids in every
    // later test that never re-drives the fixture.
    withWindows({ 1: windowShard([]) });
    const handler = await getCommandHandler('platform.moveWebViewToWindow');

    await expect(handler('view-1', '999')).rejects.toThrow(
      /window id 999, which no open window has/,
    );
    expect(mocks.networkObjectGet).not.toHaveBeenCalled();
  });

  test('the commands are declared owner-routed with a first webViewId param', async () => {
    // `assertCommandRoutingMatchesDocs` runs synchronously inside `startWebViewServiceRouter` and
    // throws in dev mode on any mismatch between a command's routing and what its params document
    // — so a router that registers without throwing is one where the move commands' `webViewId`
    // first, owner-routed declarations agree with their docs.
    await expect(getCommandHandler('platform.moveWebViewToNewWindow')).resolves.toBeDefined();
  });
});
