import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  setWebViewWindowCreator,
  startWebViewServiceRouter,
  testingWebViewServiceRouter,
} from '@main/services/web-view.service-router';
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
  const getFocusedWindowId = vi.fn();
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    isWindowReady: vi.fn(),
    isWindowClosing: vi.fn(),
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
 * A per-window WebView service shard whose web views are the given ids, extended with the move
 * primitives `moveWebView` drives. `captureAndCloseWebView` answers a definition only for ids this
 * window holds, matching the real shard's "not mine" answer of `undefined`; `adoptWebView` answers
 * with the id of whatever definition it was handed, matching a provider that accepts every move.
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

describe('moveWebView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
    mocks.isWindowClosing.mockReturnValue(false);
    mocks.getFocusedWindowId.mockReturnValue(1);
    mocks.settingsGet.mockResolvedValue('power');
  });

  test('moves to an existing window: captures in the owner, adopts in the target, answers the id', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });

    const movedId = await moveWebView('view-1', 3);

    expect(owner.captureAndCloseWebView).toHaveBeenCalledWith('view-1');
    expect(target.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
    // Close-before-adopt, not merely both-happened: a one-instance web view cannot be opened in the
    // target while the source instance is alive, so capturing has to finish before the target adopts
    expect(owner.captureAndCloseWebView.mock.invocationCallOrder[0]).toBeLessThan(
      target.adoptWebView.mock.invocationCallOrder[0],
    );
    expect(movedId).toBe('view-1');
  });

  test('raises the target window after a successful move while the app holds focus', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.getFocusedWindowId.mockReturnValue(2);

    await moveWebView('view-1', 3);

    expect(mocks.focusWindow).toHaveBeenCalledWith(3);
  });

  test('does not raise any window when the app does not hold focus', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });
    mocks.getFocusedWindowId.mockReturnValue(undefined);

    await moveWebView('view-1', 3);

    expect(mocks.focusWindow).not.toHaveBeenCalled();
  });

  test('an unknown target window fails the move before anything closes', async () => {
    // resolveShardForWindow waits out the shard-announcement grace period for a window id it has
    // never indexed before giving up — same reasoning as the pre-existing suite's equivalent test.
    vi.useFakeTimers();
    try {
      const owner = windowShard(['view-1']);
      withWindows({ 2: owner });

      const moving = moveWebView('view-1', 99);
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
    mocks.isWindowClosing.mockImplementation((windowId: number) => windowId === 3);

    await expect(moveWebView('view-1', 3)).rejects.toThrow(/that window is closing/);

    // Adopting into a window on its way out would report success and then lose the view
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
    expect(target.adoptWebView).not.toHaveBeenCalled();
  });

  test('an unknown web view fails the move', async () => {
    withWindows({ 2: windowShard([]) });

    await expect(moveWebView('missing-view', 2)).rejects.toThrow('no window has it open');
  });

  test('a web view already in the target window is left alone', async () => {
    const owner = windowShard(['view-1']);
    withWindows({ 2: owner });

    const movedId = await moveWebView('view-1', 2);

    expect(movedId).toBe('view-1');
    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    expect(mocks.focusWindow).not.toHaveBeenCalled();
  });

  test('moving to a new window uses the pending-content scaffold', async () => {
    const owner = windowShard(['view-1']);
    const created = windowShard([]);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => 7), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    const movedId = await moveWebView('view-1', 'new');

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
    expect(mocks.clearWindowPendingContent).toHaveBeenCalledWith(7);
    expect(movedId).toBe('view-1');
  });

  test('move-to-new-window outside power mode leaves the view where it is', async () => {
    mocks.settingsGet.mockResolvedValue('simple');
    const owner = windowShard(['view-1']);
    withWindows({ 2: owner });

    const movedId = await moveWebView('view-1', 'new');

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

    await expect(moveWebView('view-1', 'new')).rejects.toThrow(/interface mode/);

    expect(owner.captureAndCloseWebView).not.toHaveBeenCalled();
  });

  test('a capture that comes back empty fails the move', async () => {
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockResolvedValue(undefined);
    withWindows({ 2: owner, 3: windowShard([]) });

    await expect(moveWebView('view-1', 3)).rejects.toThrow('no longer had it');
  });

  test('a capture that throws fails the move with the owner-search definition in the log', async () => {
    const owner = windowShard(['view-1']);
    owner.captureAndCloseWebView.mockRejectedValue(new Error('capture round trip lost'));
    const target = windowShard([]);
    withWindows({ 2: owner, 3: target });

    await expect(moveWebView('view-1', 3)).rejects.toThrow(
      /Could not move webview view-1 to window 3: capturing it failed/,
    );

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

  test('a failed target adopt reopens the view in the source window and still rejects', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    withWindows({ 2: owner, 3: target });

    await expect(moveWebView('view-1', 3)).rejects.toThrow(/window 2, where it came from/);

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
    mocks.isWindowClosing.mockImplementation((windowId: number) => windowId === 2);
    mocks.getTargetWindowId.mockReturnValue(1);

    await expect(moveWebView('view-1', 3)).rejects.toThrow(/the focused window/);

    expect(owner.adoptWebView).not.toHaveBeenCalled();
    expect(focused.adoptWebView).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
    );
  });

  test('a provider decline in a new window closes that window and enters recovery', async () => {
    const owner = windowShard(['view-1']);
    const created = windowShard([]);
    created.adoptWebView.mockResolvedValue(undefined);
    withWindows({ 2: owner, 7: created });
    const creator = { createPendingContentWindow: vi.fn(async () => 7), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    await expect(moveWebView('view-1', 'new')).rejects.toThrow();

    expect(creator.closeWindow).toHaveBeenCalledWith(7);
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

    await expect(moveWebView('view-1', 3)).rejects.toThrow('captured definition is in the log');

    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify({ id: 'view-1', webViewType: 'test.type' })),
    );
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

  test('the to-window command rejects a non-number target window id', async () => {
    const handler = await getCommandHandler('platform.moveWebViewToWindow');

    await expect(handler('view-1', 'not-a-number')).rejects.toThrow(/target window id/);
  });

  test('the commands are declared owner-routed with a first webViewId param', async () => {
    // `assertCommandRoutingMatchesDocs` runs synchronously inside `startWebViewServiceRouter` and
    // throws in dev mode on any mismatch between a command's routing and what its params document
    // — so a router that registers without throwing is one where the move commands' `webViewId`
    // first, owner-routed declarations agree with their docs.
    await expect(getCommandHandler('platform.moveWebViewToNewWindow')).resolves.toBeDefined();
  });
});
