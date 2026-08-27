import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  setWebViewWindowCreator,
  testingWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import { getWebViewMoveFailureDisposition } from '@shared/models/web-view-move.model';
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

/**
 * Wire windows whose WebView service shards are the given objects, telling each stand-in which
 * window serves it — the ids a shard answers with are scoped to its own window (see
 * {@link windowShard}), so a shard that does not know which window it is cannot answer as one.
 */
function withWindows(shardsByWindowId: Record<string, WindowShard>) {
  Object.entries(shardsByWindowId).forEach(([windowId, shard]) => shard.setWindowId(windowId));
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
    // A window holds a web view under its own scoping of the id, so the answer to an adopt is not
    // the id it was handed — echoing it back would make a move's answer indistinguishable from its
    // caller's own id, and every assertion about which one the move reports unfalsifiable
    adoptWebView: vi.fn<
      (savedWebViewDefinition: SavedWebViewDefinition) => Promise<WebViewId | undefined>
    >(async (savedWebViewDefinition) => `${savedWebViewDefinition.id}-window-${windowId}`),
    // A window with nothing docked in it since its last emptiness report, which is what a window
    // created to receive a moved web view is until the adopt lands
    hasContentArrivedSinceEmptyReport: vi.fn(async () => false),
  };
}

/** A window's WebView service shard stand-in, as {@link windowShard} builds it */
type WindowShard = ReturnType<typeof windowShard>;

/** The rejection the network plumbing produces when a request expires with no answer */
function requestTimedOutError() {
  return new Error(
    `${JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX} object:WebViewService-3.adoptWebView []`,
  );
}

describe('moveWebView when the target adopt does not come back a success', () => {
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

  test('an adopt that landed after its request expired completes the move without recovery', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(requestTimedOutError());
    // First asked during the ownership search (target does not hold it yet); asked again by the
    // probe after the timed-out adopt, by which time the adopt has landed in the target — under the
    // target's own scoping of the id, which is what the probe finds it as
    target.getOpenWebViewDefinition.mockResolvedValueOnce(undefined);
    target.getOpenWebViewDefinition.mockResolvedValue({ id: 'view-1-window-3' });
    withWindows({ 2: owner, 3: target });

    const movedId = await moveWebView('view-1', { kind: 'window', windowId: '3' });

    // What the target says it holds the view under, not the id the move was given: a late-landed
    // adopt is still an adopt, and the caller has to use the target's id for anything after it
    expect(movedId).toBe('view-1-window-3');
    // The move succeeded late, so nothing may reopen the captured definition anywhere — that
    // would put the same web view id live in two windows
    expect(owner.adoptWebView).not.toHaveBeenCalled();
    // Same raise rules as a normal success
    expect(mocks.focusWindow).toHaveBeenCalledWith('3');
  });

  test('an adopt whose target confirms absence runs the recovery ladder unchanged', async () => {
    vi.useFakeTimers();
    try {
      const owner = windowShard(['view-1']);
      const target = windowShard([]);
      target.adoptWebView.mockRejectedValue(requestTimedOutError());
      withWindows({ 2: owner, 3: target });

      const moving = moveWebView('view-1', { kind: 'window', windowId: '3' });
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

    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /window 2, where it came from/,
    );

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
    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /reopened in the focused window/,
    );
  });

  test('a rejection the target itself produced enters recovery without probing', async () => {
    const owner = windowShard(['view-1']);
    const target = windowShard([]);
    target.adoptWebView.mockRejectedValue(new Error('provider exploded'));
    withWindows({ 2: owner, 3: target });

    await expect(moveWebView('view-1', { kind: 'window', windowId: '3' })).rejects.toThrow(
      /window 2, where it came from/,
    );

    // Only the ownership search asked the target: an answer the target produced itself means the
    // adopt definitively did not happen, so no probe may delay the recovery reopen
    expect(target.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
  });

  describe('moving to a window created for the move', () => {
    /** The window facilities the new-window path runs through, creating window 7 for the move */
    function withWindowCreator() {
      const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
      setWebViewWindowCreator(creator);
      return creator;
    }

    test('an adopt that landed after its request expired completes the move without recovery', async () => {
      const owner = windowShard(['view-1']);
      const created = windowShard([]);
      created.adoptWebView.mockRejectedValue(requestTimedOutError());
      // The dock took the tab, which is what an adopt that landed after its request expired looks
      // like from outside — so the window created for the move keeps standing
      created.hasContentArrivedSinceEmptyReport.mockResolvedValue(true);
      // Asked during the ownership search, before the window was created for this move; asked
      // again by the probe, by which time the adopt has landed under the window's own scoping
      created.getOpenWebViewDefinition.mockResolvedValueOnce(undefined);
      created.getOpenWebViewDefinition.mockResolvedValue({ id: 'view-1-window-7' });
      withWindows({ 2: owner, 7: created });
      const creator = withWindowCreator();

      const movedId = await moveWebView('view-1', { kind: 'new' });

      // What the created window says it holds the view under, exactly as a move into an existing
      // window answers with the target's id
      expect(movedId).toBe('view-1-window-7');
      // The move succeeded late, so nothing may reopen the captured definition anywhere — that
      // would put the same web view id live in two windows
      expect(owner.adoptWebView).not.toHaveBeenCalled();
      expect(creator.closeWindow).not.toHaveBeenCalled();
      // The window is holding content now, so it must stop restoring as one still waiting for it
      expect(mocks.clearWindowPendingContent).toHaveBeenCalledWith('7');
    });

    test('a probe that finds nothing in a window left standing rejects rather than reopening', async () => {
      vi.useFakeTimers();
      try {
        const focused = windowShard([]);
        const owner = windowShard(['view-1']);
        const created = windowShard([]);
        created.adoptWebView.mockRejectedValue(requestTimedOutError());
        created.hasContentArrivedSinceEmptyReport.mockResolvedValue(true);
        withWindows({ 1: focused, 2: owner, 7: created });
        const creator = withWindowCreator();

        const moving = moveWebView('view-1', { kind: 'new' });
        moving.catch(() => undefined);

        await vi.runAllTimersAsync();

        const failure = await moving.then(
          () => undefined,
          (e: unknown) => e,
        );

        // Content reached the window, so the adopt may yet land there — reopening the captured
        // definition anywhere else is what would put the same id live in two windows
        expect(failure).toBeDefined();
        expect(owner.adoptWebView).not.toHaveBeenCalled();
        expect(focused.adoptWebView).not.toHaveBeenCalled();
        // The window holds content the user can see, whoever put it there
        expect(creator.closeWindow).not.toHaveBeenCalled();
        // The caller has to be able to tell the user their tab could not be reopened, without
        // reading a sentence written for the log
        expect(getWebViewMoveFailureDisposition(failure)).toBe('not-reopened');
      } finally {
        vi.useRealTimers();
      }
    });

    test('a rejection that is not a timeout refuses to reopen while the window stands too', async () => {
      const focused = windowShard([]);
      const owner = windowShard(['view-1']);
      const created = windowShard([]);
      // Thrown after the dock already took the tab — anything raised past that point in the open,
      // or a failure on the answer's way back. The window is holding the web view exactly as it is
      // after a timed-out adopt, and the error class it came back as says nothing about that
      created.adoptWebView.mockRejectedValue(new Error('the answer never made it back'));
      created.hasContentArrivedSinceEmptyReport.mockResolvedValue(true);
      withWindows({ 1: focused, 2: owner, 7: created });
      const creator = withWindowCreator();

      const failure = await moveWebView('view-1', { kind: 'new' }).then(
        () => undefined,
        (e: unknown) => e,
      );

      // Reopening the captured definition anywhere would put the same web view id live in two
      // windows, whatever kind of error said the adopt did not succeed
      expect(failure).toBeDefined();
      expect(owner.adoptWebView).not.toHaveBeenCalled();
      expect(focused.adoptWebView).not.toHaveBeenCalled();
      // The window holds content the user can see, whoever put it there
      expect(creator.closeWindow).not.toHaveBeenCalled();
      expect(getWebViewMoveFailureDisposition(failure)).toBe('not-reopened');
      // Only the ownership search asked: an adopt that came back an answer of its own is not one
      // that could still be running, so no probe may delay the recovery the user is waiting on
      expect(created.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
    });

    test('an adopt whose window closed with it runs the recovery ladder without probing', async () => {
      const owner = windowShard(['view-1']);
      const created = windowShard([]);
      created.adoptWebView.mockRejectedValue(requestTimedOutError());
      // Nothing reached the window, so it closed — there is no window left to ask
      created.hasContentArrivedSinceEmptyReport.mockResolvedValue(false);
      withWindows({ 2: owner, 7: created });
      const creator = withWindowCreator();

      const failure = await moveWebView('view-1', { kind: 'new' }).then(
        () => undefined,
        (e: unknown) => e,
      );

      expect(creator.closeWindow).toHaveBeenCalledWith('7');
      expect(owner.adoptWebView).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'view-1', webViewType: 'test.type' }),
      );
      expect(getWebViewMoveFailureDisposition(failure)).toBe('reopened-in-source-window');
      // Only the ownership search asked: a window that is definitively gone cannot have taken the
      // adopt, so no probe may delay the recovery the user is waiting on
      expect(created.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
    });
  });
});
