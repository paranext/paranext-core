import { afterEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  setWebViewWindowCreator,
  testingWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions — module state that outlives one test,
  // same reasoning as the pre-existing `web-view.service-router.test.ts`.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    wasWindowEverReady: vi.fn(),
    isWindowClosing: vi.fn(),
    isApplicationFocused: vi.fn(),
    focusWindow: vi.fn(),
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    registerRequestHandler: vi.fn(),
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

/** A per-window WebView service shard with nothing open in it */
function emptyWindowShard() {
  return {
    getOpenWebViewDefinition: vi.fn(async () => undefined),
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
    openWebView: vi.fn<() => Promise<string | undefined>>(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
    openSettingsTab: vi.fn(async () => undefined),
    hasContentArrivedSinceEmptyReport: vi.fn(async () => false),
  };
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
  wasWindowEverReady: mocks.wasWindowEverReady,
  isWindowClosing: mocks.isWindowClosing,
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
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: mocks.loggerWarn, debug: vi.fn(), error: mocks.loggerError },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet },
}));
vi.mock('@main/services/window-layout-persistence.service', () => ({
  clearWindowPendingContent: mocks.clearWindowPendingContent,
}));

const { createFreshWindow, resetWindowCreatorForTesting, WINDOW_CREATOR_WIRING_TIMEOUT_MS } =
  testingWebViewServiceRouter;

afterEach(() => {
  vi.useRealTimers();
});

describe('web-view window creator wiring', () => {
  test('a call reaching createFreshWindow before the creator is wired resolves once wiring happens, rather than throwing', async () => {
    // Puts the window creator and its wiring latch back to their unwired startup state — otherwise
    // a creator an earlier test wired would still be in force here.
    resetWindowCreatorForTesting();
    // The window the creator will report as created, already announced as ready so the router does
    // not need to wait on anything but the creator wiring this test is exercising.
    withWindows({ 7: emptyWindowShard() });
    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };

    const freshWindowPromise = createFreshWindow('someType');

    // Let pending microtasks run: with nothing wired yet, the call should still be waiting on the
    // wiring latch rather than having thrown or otherwise settled.
    await Promise.resolve();
    await Promise.resolve();
    expect(creator.createPendingContentWindow).not.toHaveBeenCalled();

    setWebViewWindowCreator(creator);

    const freshWindow = await freshWindowPromise;

    expect(creator.createPendingContentWindow).toHaveBeenCalledTimes(1);
    expect(freshWindow.discard).toBeTypeOf('function');
  });

  test('the bounded wait rejects, naming the wiring, once the wiring bound is exceeded', async () => {
    // Fake timers first: the latch's own timeout is scheduled the moment it is (re)constructed, so
    // it has to be constructed under the fake clock for `advanceTimersByTimeAsync` below to reach it.
    vi.useFakeTimers();
    resetWindowCreatorForTesting();

    const opening = createFreshWindow('someType');
    // Take hold of the rejection before advancing the clock, the same way the router suite's own
    // "shard never appears" timeout test does: an unattached rejection during the timer run is
    // reported as an unhandled rejection against the whole file.
    opening.catch(() => undefined);

    await vi.advanceTimersByTimeAsync(WINDOW_CREATOR_WIRING_TIMEOUT_MS);

    await expect(opening).rejects.toThrow(
      new RegExp(`window creator was never wired up within ${WINDOW_CREATOR_WIRING_TIMEOUT_MS} ms`),
    );
  });

  test('a call arriving after an earlier wait timed out waits its own bound, not the spent one', async () => {
    // The bound is meant to say "wiring did not arrive while this call waited". A latch shared with
    // a call that already spent it says something else — that wiring was late for someone else,
    // once, earlier — and answers instantly on a boot where wiring is still moments away.
    vi.useFakeTimers();
    resetWindowCreatorForTesting();
    withWindows({ 7: emptyWindowShard() });

    const spentTheBound = createFreshWindow('someType');
    // Attached before the clock runs, as the test above does and for the same reason.
    spentTheBound.catch(() => undefined);
    await vi.advanceTimersByTimeAsync(WINDOW_CREATOR_WIRING_TIMEOUT_MS);
    await expect(spentTheBound).rejects.toThrow();

    // Real time from here: this call's own bound is the subject and is never reached, because
    // wiring lands immediately after it starts waiting.
    vi.useRealTimers();

    const waitingAgain = createFreshWindow('someType');
    waitingAgain.catch(() => undefined);
    await Promise.resolve();
    await Promise.resolve();

    const creator = { createPendingContentWindow: vi.fn(async () => '7'), closeWindow: vi.fn() };
    setWebViewWindowCreator(creator);

    const freshWindow = await waitingAgain;

    expect(creator.createPendingContentWindow).toHaveBeenCalledTimes(1);
    expect(freshWindow.discard).toBeTypeOf('function');
  });
});
