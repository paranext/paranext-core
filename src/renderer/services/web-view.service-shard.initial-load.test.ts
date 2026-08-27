import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type {
  Layout,
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import type {
  SavedWebViewDefinition,
  WebViewDefinition,
  WebViewId,
} from '@shared/models/web-view.model';

// The service shard logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

const mocks = vi.hoisted(() => ({
  settingsGet: vi.fn(),
  settingsSubscribe: vi.fn<
    (
      key: string,
      callback: (newSetting: unknown) => Promise<void>,
    ) => Promise<() => Promise<boolean>>
  >(async () => async () => true),
  networkRequest: vi.fn(),
  bufferedEmitters: new Map<string, { emit: ReturnType<typeof vi.fn> }>(),
  loggerDebug: vi.fn(),
  loggerWarn: vi.fn(),
  loggerError: vi.fn(),
}));

// Same file-level mock set as `web-view.service-shard.test.ts` — this file imports the same
// module, which still needs its whole dependency graph stubbed to import cleanly, even though
// these tests never exercise most of it.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: { tabs: [] },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet, subscribe: mocks.settingsSubscribe },
}));
// Factory rather than the repo's automock (whose methods are plain functions): these tests assert
// on the debug line the skipped load leaves behind, and on which level a refused dock write is
// reported at, both of which need spies
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    debug: mocks.loggerDebug,
    info: vi.fn(),
    warn: mocks.loggerWarn,
    error: mocks.loggerError,
  },
}));
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: (eventName: string) => {
    const emitter = { emit: vi.fn(), dispose: vi.fn() };
    mocks.bufferedEmitters.set(eventName, emitter);
    return emitter;
  },
  getNetworkEvent: () => vi.fn(),
  request: mocks.networkRequest,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));
vi.mock('@shared/services/web-view-provider.service', () => ({ webViewProviderService: {} }));
vi.mock('@renderer/services/theme.service', () => ({ localThemeService: {} }));
vi.mock('@renderer/services/web-view-state.service', () => ({
  deleteFullWebViewStateById: vi.fn(),
  getFullWebViewStateById: vi.fn(),
  setFullWebViewStateById: vi.fn(),
}));
vi.mock('@renderer/components/settings-tabs/settings-tab.component', () => ({
  TAB_TYPE_SETTINGS_TAB: 'settings-tab',
}));
vi.mock('@renderer/services/usersnap.service', () => ({
  closeOpenUsersnapForm: vi.fn(),
  isUsersnapFormCurrentlyOpen: vi.fn(),
  openUsersnapForm: vi.fn(),
  USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: '',
  USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: '',
}));

// Mock dock layouts and the published shard object both cross the shared model's opaque
// `LayoutInfo`/`PapiDockLayout` boundary, the same reason `web-view.service-shard.test.ts` disables
// this rule file-wide rather than per cast.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Layout with no tab anywhere */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** Narrow view of the published shard covering only the routed methods these tests drive */
type RoutedShard = {
  adoptWebView(savedWebViewDefinition: SavedWebViewDefinition): Promise<WebViewId | undefined>;
  openSettingsTab(projectIdToLimitSettings?: string): Promise<Layout | undefined>;
};

/**
 * Dock layout stand-in whose web view list is live: web views added through `addWebViewToDock` show
 * up in `getAllWebViewDefinitions`, the way the real dock's do, so the initial load's view of the
 * dock changes when an adopt lands mid-load. Whole-layout loads are recorded rather than
 * interpreted — a recorded load IS the dock being replaced, which is what these tests assert on.
 *
 * Non-web-view tabs go in through `addTabToDock` and are recorded separately, matching the dock's
 * own split: a settings tab is not a web view, so it is in none of the web view lists a load
 * reads.
 *
 * @param doesLoadReplaceTheDock Whether a whole-layout load also empties what is docked, the way
 *   the real dock's wholesale replacement does. Off by default: the tests that stand a window up by
 *   loading empty layouts need what they docked to outlive them, or the reload they are about to
 *   race would begin against an empty dock and be tracked by nothing. On for the tests that assert
 *   a web view is GONE, where the load has to actually take it — every layout loaded in this file
 *   carries no tabs, so replacing the dock's contents with one is emptying the dock.
 */
function makeLiveDockLayout({ doesLoadReplaceTheDock = false } = {}) {
  const loadedLayouts: LayoutInfo[] = [];
  const dockedWebViews: WebViewDefinition[] = [];
  const dockedTabs: SavedTabInfo[] = [];
  let addFailure: Error | undefined;
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
      if (doesLoadReplaceTheDock) {
        dockedWebViews.length = 0;
        dockedTabs.length = 0;
      }
    },
    getAllWebViewDefinitions: () => [...dockedWebViews],
    getWebViewDefinition: (webViewId: string) =>
      dockedWebViews.find((webView) => webView.id === webViewId),
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      if (addFailure) throw addFailure;
      dockedWebViews.push(webView);
      return layout;
    },
    addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) => {
      dockedTabs.push(savedTabInfo);
      return layout;
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  return {
    dockLayout,
    loadedLayouts,
    dockedWebViews,
    dockedTabs,
    /**
     * Make every web view add from here on throw — what the dock does with a definition its tab
     * loader turns down, the other way a dock write fails with the named web view's own tab still
     * docked
     */
    makeAddsFail: (error: Error) => {
      addFailure = error;
    },
  };
}

/**
 * Stub the web view provider (and the theme it needs) so `adoptWebView`'s open path can run.
 *
 * The handle this returns can park `getWebView` until the test lets it answer. Nothing else in
 * these tests can hold that stretch open, and it is the one stretch of the open path with no bound
 * on it at all: `getWebView` is a round trip into the extension host running extension code.
 */
async function primeProvider(webViewState?: Record<string, unknown>) {
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  let doesGetWebViewPark = false;
  let parkedWebViewRequests: (() => void)[] = [];
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them — same reasoning as the equivalent stubs in `web-view.service-shard.test.ts`.
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({
      getWebView: async (saved: SavedWebViewDefinition) => {
        if (doesGetWebViewPark)
          await new Promise<void>((resolve) => {
            parkedWebViewRequests.push(resolve);
          });
        return {
          id: saved.id,
          webViewType: saved.webViewType,
          contentType: 'html',
          content: '<p>moved</p>',
          state: webViewState,
        };
      },
    }),
  );
  (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
    cssVariables: {},
  }));
  return {
    /** Park every `getWebView` from here on until {@link releaseTheProvider} */
    makeTheProviderThink: () => {
      doesGetWebViewPark = true;
    },
    /** Resolves once a `getWebView` call is parked — the open has reached the provider */
    waitForTheProviderToBeAsked: () =>
      vi.waitFor(() => expect(parkedWebViewRequests.length).toBeGreaterThan(0)),
    /** Let every parked `getWebView` answer */
    releaseTheProvider: () => {
      const parked = parkedWebViewRequests;
      parkedWebViewRequests = [];
      parked.forEach((answer) => answer());
    },
  };
}

/**
 * Register the shard over a live dock layout while `windowLayout:get` hangs until the test releases
 * it — the retrying initial load in flight, exactly the window an adopt can land in.
 */
async function registerWithHangingLayoutGet() {
  let releaseLayoutGet: (response: unknown) => void = () => {};
  mocks.networkRequest.mockImplementation(
    async (requestType: string) =>
      new Promise((resolve) => {
        if (requestType === 'windowLayout:get') releaseLayoutGet = resolve;
        else resolve(undefined);
      }),
  );

  const module = await import('@renderer/services/web-view.service-shard');
  const { networkObjectService } = await import('@shared/services/network-object.service');
  const { dockLayout, loadedLayouts, dockedWebViews } = makeLiveDockLayout();
  module.registerDockLayout(dockLayout);
  await module.startWebViewServiceShard();
  await primeProvider();
  // The initial load has to have asked for the saved layout before the test releases the answer
  await vi.waitFor(() =>
    expect(
      mocks.networkRequest.mock.calls.some(([requestType]) => requestType === 'windowLayout:get'),
    ).toBe(true),
  );

  const [, shard] = vi.mocked(networkObjectService.set).mock.calls[0];
  return {
    shard: shard as unknown as RoutedShard,
    loadedLayouts,
    dockedWebViews,
    releaseLayoutGet: (response: unknown) => releaseLayoutGet(response),
  };
}

/** The buffered close-event emitter the shard created, for asserting nothing was closed */
function getCloseEmitter() {
  const closeEmitter = [...mocks.bufferedEmitters.entries()].find(([name]) =>
    /close/i.test(name),
  )?.[1];
  if (!closeEmitter) throw new Error('close emitter was never created');
  return closeEmitter;
}

/** The ids of the web views a close event has been emitted for */
function getClosedWebViewIds(): string[] {
  const closeEvents = getCloseEmitter().emit.mock.calls as [{ webView: { id: string } }][];
  return closeEvents.map(([event]) => event.webView.id);
}

/** Let every already-scheduled continuation run, so a negative can be asserted */
async function settle() {
  for (let turn = 0; turn < 3; turn += 1)
    // Draining is inherently sequential
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
}

/**
 * Boot the renderer's globals from a window URL shaped the way main builds one — window id and slot
 * included — so per-window storage is keyed the way it is in a real window. Must run before
 * anything reads that storage, which is the order the renderer's entry point guarantees.
 */
async function bootFromWindowUrl(search: string) {
  window.history.replaceState({}, '', `/${search}`);
  vi.stubGlobal('webpackRenderer', { isPackaged: false });
  await import('@renderer/global-this.model');
}

/** The web view state blob this window's slot holds, as the real state service persists it */
function persistedWebViewState(slotId: string): string | null {
  return localStorage.getItem(`${slotId}_web-view-state`);
}

// Starting the shard deletes `globalThis.open` so web views cannot make popups. That is a one-way
// change to the real `window`, which these tests share across every re-import.
const openWindow = globalThis.open;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.bufferedEmitters.clear();
  globalThis.open = openWindow;
  localStorage.clear();
  globalThis.windowId = 7;
  mocks.settingsGet.mockImplementation(async (key: string) =>
    key === 'platform.interfaceMode' ? 'power' : false,
  );
});

describe('web view state under every way the initial load can go', () => {
  // These tests prove state survives the load paths, which takes the real state service and the
  // real per-window storage under it. The file-level mock is lifted for the imports each test
  // makes (the outer `resetModules` makes them re-resolve) and put back afterwards, since a mock
  // factory's result is cached across `resetModules` and would otherwise leak either way.
  beforeEach(() => {
    vi.doUnmock('@renderer/services/web-view-state.service');
  });

  afterEach(() => {
    vi.doMock('@renderer/services/web-view-state.service', () => ({
      deleteFullWebViewStateById: vi.fn(),
      getFullWebViewStateById: vi.fn(),
      setFullWebViewStateById: vi.fn(),
    }));
    vi.unstubAllGlobals();
  });

  test('in simple mode, a web view with state opens and its state lands in this window’s slot', async () => {
    // Simple mode loads the static layout and never asks main for a saved one, so nothing that
    // happens during the load can tell this window which slot it is. The slot has to come from the
    // window's URL, read at boot — or every state read in the app's default mode throws.
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : false,
    );
    await bootFromWindowUrl('?windowId=7&windowSlotId=slot-seven');
    const module = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, dockedWebViews } = makeLiveDockLayout();
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();
    await primeProvider({ carried: 'through the open' });

    await expect(module.openWebView('test.opened')).resolves.toEqual(expect.any(String));

    expect(dockedWebViews.map((webView) => webView.webViewType)).toContain('test.opened');
    expect(persistedWebViewState('slot-seven')).toContain('through the open');
    expect(
      mocks.networkRequest.mock.calls.some(([requestType]) => requestType === 'windowLayout:get'),
    ).toBe(false);
  });

  test('a move into a window whose layout request has not been answered still seeds its state', async () => {
    // A routed move lands in a brand-new window while that window's own startup load is still
    // waiting on main. The adopt seeds the moved view's state before opening it, so the slot must
    // be known before main has said anything — which only the URL can guarantee.
    await bootFromWindowUrl('?windowId=7&windowSlotId=slot-seven');
    const { shard, dockedWebViews, releaseLayoutGet } = await registerWithHangingLayoutGet();

    const adoptedId = await shard.adoptWebView({
      id: 'moved-view',
      webViewType: 'test.type',
      state: { carried: 'through the move' },
    });

    expect(adoptedId).toBe('moved-view');
    expect(dockedWebViews.map((webView) => webView.id)).toContain('moved-view');
    expect(persistedWebViewState('slot-seven')).toContain('through the move');
    releaseLayoutGet({ kind: 'pending-content' });
  });

  test('still lets web views keep state when main never answers the layout request', async () => {
    // Every attempt to ask main for the saved layout fails, so the window falls back to starting
    // empty. It must still be able to open and run web views — the slot came with the URL, so the
    // answer that never arrived was not carrying anything storage needed.
    vi.useFakeTimers();
    try {
      mocks.networkRequest.mockImplementation(async (requestType: string) => {
        if (requestType === 'windowLayout:get') throw new Error('main is not answering');
        return undefined;
      });
      await bootFromWindowUrl('?windowId=7&windowSlotId=slot-seven');
      const module = await import('@renderer/services/web-view.service-shard');
      const { dockLayout } = makeLiveDockLayout();
      module.registerDockLayout(dockLayout);
      await module.startWebViewServiceShard();
      await primeProvider({ carried: 'after the fallback' });
      // The load retries with a delay between attempts; run them all out
      await vi.runAllTimersAsync();
      await vi.waitFor(() =>
        expect(mocks.loggerWarn).toHaveBeenCalledWith(
          expect.stringMatching(/starting empty and holding layout pushes/i),
        ),
      );

      const opening = module.openWebView('test.opened');
      await vi.runAllTimersAsync();
      await expect(opening).resolves.toEqual(expect.any(String));

      expect(persistedWebViewState('slot-seven')).toContain('after the fallback');
    } finally {
      vi.useRealTimers();
    }
  });
  test('drops the stored state of slots the main process says are gone', async () => {
    // Slot ids are never reissued, so state under a slot whose entry has gone can never be read
    // again and nothing else removes it. Which ones are gone is main's answer about the ids this
    // window actually holds state for, so a window created while the question was in flight cannot
    // have its state deleted by it.
    localStorage.setItem('slot-seven_web-view-state', 'this window, still live');
    localStorage.setItem('slot-from-a-closed-window_web-view-state', 'nothing can reach this');
    let askedWith: unknown;
    mocks.networkRequest.mockImplementation(async (requestType: string, payload: unknown) => {
      if (requestType === 'windowLayout:filterDeadSlots') {
        askedWith = payload;
        return ['slot-from-a-closed-window'];
      }
      return requestType === 'windowLayout:get' ? { kind: 'empty' } : undefined;
    });
    await bootFromWindowUrl('?windowId=7&windowSlotId=slot-seven');
    const module = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeLiveDockLayout();
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();

    await vi.waitFor(() =>
      expect(localStorage.getItem('slot-from-a-closed-window_web-view-state')).toBeNull(),
    );
    expect(localStorage.getItem('slot-seven_web-view-state')).toBe('this window, still live');
    expect(askedWith).toEqual(expect.arrayContaining(['slot-seven', 'slot-from-a-closed-window']));
  });

  test('keeps every stored blob when the main process cannot be asked which slots are gone', async () => {
    // A failed answer is not "everything is dead" — deleting on no information would take the
    // state of every window in the profile
    localStorage.setItem(
      'slot-from-a-closed-window_web-view-state',
      'kept: nothing said otherwise',
    );
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:filterDeadSlots') throw new Error('main is not answering');
      return requestType === 'windowLayout:get' ? { kind: 'empty' } : undefined;
    });
    await bootFromWindowUrl('?windowId=7&windowSlotId=slot-seven');
    const module = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeLiveDockLayout();
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();

    await vi.waitFor(() =>
      expect(mocks.loggerWarn).toHaveBeenCalledWith(
        expect.stringMatching(/stored state of window slots that are gone/i),
      ),
    );
    expect(localStorage.getItem('slot-from-a-closed-window_web-view-state')).toBe(
      'kept: nothing said otherwise',
    );
  });
});

describe('the initial layout load against a dock that gained content mid-load', () => {
  test('a late initial answer does not wipe an adopted web view or emit close events', async () => {
    const { shard, loadedLayouts, dockedWebViews, releaseLayoutGet } =
      await registerWithHangingLayoutGet();

    const adoptedId = await shard.adoptWebView({ id: 'moved-view', webViewType: 'test.type' });
    expect(adoptedId).toBe('moved-view');

    // The initial load's (late, possibly retried) answer lands only now, after the adopt
    releaseLayoutGet({ kind: 'pending-content' });

    await vi.waitFor(() =>
      expect(mocks.loggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(/dropping a layout load/i),
      ),
    );
    // The stale answer was never applied: the dock was not replaced, the adopted web view is still
    // there, and no close event fired for it
    expect(loadedLayouts).toEqual([]);
    expect(dockedWebViews.map((webView) => webView.id)).toEqual(['moved-view']);
    expect(getCloseEmitter().emit).not.toHaveBeenCalled();
  });

  test('the initial answer still applies when nothing arrived while it was in flight', async () => {
    const { loadedLayouts, releaseLayoutGet } = await registerWithHangingLayoutGet();

    releaseLayoutGet({ kind: 'pending-content' });

    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));
    expect(getCloseEmitter().emit).not.toHaveBeenCalled();
  });
});

describe('a mid-session layout load racing content arriving', () => {
  /**
   * Stand a window up holding one web view, then leave it reloading with its saved-layout request
   * hanging — the stretch anything arriving in this window has to wait out.
   *
   * The empty-dock checkpoints cannot help a reload like this one: the window already has content,
   * so the load cannot tell what arrived during it from what it is replacing. It would apply its
   * pre-arrival answer over the web view that just landed — and silently, since the close events it
   * emits are diffed against that same pre-arrival reading, leaving the controller, nonce and state
   * that web view registered with nothing to dispose them.
   */
  async function windowReloadingWithSavedLayoutHanging() {
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // A load reads the mode for itself, so the notification and the read have to agree — otherwise
    // the load lands on the mode the user just left and the next notification looks like a no-op
    let interfaceMode = 'power';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let releaseLayoutGet: (response: unknown) => void = () => {};
    let doesLayoutGetHang = false;
    // `stay` until a test says otherwise: this window loads an empty layout, so it reports itself
    // born-empty, and the two answers that act — docking Home, latching the close — would both
    // arrive unasked in tests that are about neither
    let emptiedResponse: unknown = { action: 'stay' };
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:emptied') return emptiedResponse;
      if (requestType !== 'windowLayout:get') return undefined;
      if (!doesLayoutGetHang) return { kind: 'empty' };
      return new Promise((resolve) => {
        releaseLayoutGet = resolve;
      });
    });

    const module = await import('@renderer/services/web-view.service-shard');
    const { networkObjectService } = await import('@shared/services/network-object.service');
    const { dockLayout, loadedLayouts, dockedWebViews, dockedTabs } = makeLiveDockLayout();
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();
    await primeProvider();
    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));
    const [, publishedShard] = vi.mocked(networkObjectService.set).mock.calls[0];
    const shard = publishedShard as unknown as RoutedShard;
    // Content in the dock is what makes the reload below one with something to lose
    await shard.adoptWebView({ id: 'settled-view', webViewType: 'test.type' });

    // The user switches interface mode, and the reload hangs on the saved-layout request
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    doesLayoutGetHang = true;
    const reloading = interfaceModeCallback('power');
    await settle();

    return {
      module,
      shard,
      dockedWebViews,
      dockedTabs,
      reloading,
      releaseLayoutGet: (response: unknown) => releaseLayoutGet(response),
      /**
       * Empty this window's dock and have the main process answer that it is closing — the one
       * moment `isWindowToldToClose` is latched, and one that can come at any time, including while
       * something is parked waiting for the load
       */
      emptyTheDockAndBeToldItIsClosing: async () => {
        emptiedResponse = { action: 'closing' };
        await module.handleDockEmptiedByRemoval(EMPTY_LAYOUT);
      },
    };
  }

  test('an adopt waits for the load instead of docking into a dock about to be replaced', async () => {
    const { shard, dockedWebViews, reloading, releaseLayoutGet } =
      await windowReloadingWithSavedLayoutHanging();

    // A move lands in this window while that reload is in flight
    const adopting = shard.adoptWebView({ id: 'moved-view', webViewType: 'test.type' });
    await settle();

    expect(dockedWebViews.map((webView) => webView.id)).not.toContain('moved-view');

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(adopting).resolves.toBe('moved-view');
    expect(dockedWebViews.map((webView) => webView.id)).toContain('moved-view');
  });

  test('an open waits for the load instead of docking into a dock about to be replaced', async () => {
    // An open reaches this window the same way a move does — the router picks the window, and a
    // routed open lands here whenever a command asks for a web view. The load in flight is just as
    // fatal to it: the tab is wiped with no close event, so nothing disposes the controller, the
    // nonce and the state the open has already registered.
    const { module, dockedWebViews, reloading, releaseLayoutGet } =
      await windowReloadingWithSavedLayoutHanging();

    const opening = module.openWebView('test.opened');
    await settle();

    expect(dockedWebViews.map((webView) => webView.webViewType)).not.toContain('test.opened');

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(opening).resolves.toEqual(expect.any(String));
    expect(dockedWebViews.map((webView) => webView.webViewType)).toContain('test.opened');
  });

  test('a settings tab waits for the load instead of landing in a dock about to be replaced', async () => {
    // A settings tab is routed here the same way an open is, and the load in flight is worse for it
    // than for a web view: a settings tab is in no web view list, so the load's wholesale replacement
    // takes it with nothing reported anywhere — the user's Settings command answers with a layout
    // for a tab that is not there.
    const { shard, dockedTabs, reloading, releaseLayoutGet } =
      await windowReloadingWithSavedLayoutHanging();

    const openingSettings = shard.openSettingsTab();
    await settle();

    expect(dockedTabs.map((tab) => tab.tabType)).not.toContain('settings-tab');

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(openingSettings).resolves.toBeDefined();
    expect(dockedTabs.map((tab) => tab.tabType)).toContain('settings-tab');
  });

  test('an open parked on the load is refused once this window is told it is closing', async () => {
    const {
      module,
      dockedWebViews,
      reloading,
      releaseLayoutGet,
      emptyTheDockAndBeToldItIsClosing,
    } = await windowReloadingWithSavedLayoutHanging();

    const opening = module.openWebView('test.opened');
    // Marked handled from the start: the refusal lands while the release below is being awaited,
    // and an unhandled rejection in that gap would fail the run for the wrong reason
    opening.catch(() => {});
    await settle();

    // The user closes this window's last tab while the open is parked, and main decides the close
    await emptyTheDockAndBeToldItIsClosing();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(opening).rejects.toThrow(/closing/);
    expect(dockedWebViews.map((webView) => webView.webViewType)).not.toContain('test.opened');
  });

  test('an adopt parked on the load is refused once this window is told it is closing', async () => {
    const { shard, dockedWebViews, reloading, releaseLayoutGet, emptyTheDockAndBeToldItIsClosing } =
      await windowReloadingWithSavedLayoutHanging();

    const adopting = shard.adoptWebView({ id: 'moved-view', webViewType: 'test.type' });
    // Marked handled from the start (see the open above)
    adopting.catch(() => {});
    await settle();

    await emptyTheDockAndBeToldItIsClosing();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    // Refusing sends the move back up the router's recovery ladder, which puts it in a window that
    // will still be there; docking it here loses it with this window
    await expect(adopting).rejects.toThrow(/closing/);
    expect(dockedWebViews.map((webView) => webView.id)).not.toContain('moved-view');
  });

  test('a settings tab parked on the load is refused once this window is told it is closing', async () => {
    // The refusal matters most here: a settings tab is in none of the lists a close diffs, so one
    // that lands in a window whose close is decided goes with it reported nowhere at all
    const { shard, dockedTabs, reloading, releaseLayoutGet, emptyTheDockAndBeToldItIsClosing } =
      await windowReloadingWithSavedLayoutHanging();

    const openingSettings = shard.openSettingsTab();
    // Marked handled from the start (see the open above)
    openingSettings.catch(() => {});
    await settle();

    await emptyTheDockAndBeToldItIsClosing();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(openingSettings).rejects.toThrow(/closing/);
    expect(dockedTabs.map((tab) => tab.tabType)).not.toContain('settings-tab');
  });
});

describe('content admitted to the dock after the entry point had its say', () => {
  /**
   * Stand a window up holding one web view with NOTHING loading — which is what an entry point's
   * wait finds when it runs — and hand back the levers this stretch needs: a provider the test can
   * leave thinking, and a reload the test starts and releases itself.
   *
   * Everything here happens after an entry point's guard and wait have already answered for the
   * moment the request arrived. What follows them is a round trip into the extension host running
   * extension code, of no bounded duration, and a load that starts inside it is one that nothing
   * between there and the dock write has been told about.
   *
   * @param doesLoadReplaceTheDock Whether the loads these tests start also empty what is docked —
   *   see {@link makeLiveDockLayout}. On by default, since every layout loaded in this file carries
   *   no tabs and the point is usually a load that takes what is docked; off for the tests about a
   *   load that leaves the dock's contents alone.
   */
  async function windowHoldingOneWebViewWithNothingLoading({ doesLoadReplaceTheDock = true } = {}) {
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // A load reads the mode for itself, so the notification and the read have to agree
    let interfaceMode = 'power';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let releaseLayoutGet: (response: unknown) => void = () => {};
    let doesLayoutGetHang = false;
    let layoutGetRequestCount = 0;
    // `stay` until a test says otherwise — see the same answer in the describe above
    let emptiedResponse: unknown = { action: 'stay' };
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:emptied') return emptiedResponse;
      if (requestType !== 'windowLayout:get') return undefined;
      layoutGetRequestCount += 1;
      if (!doesLayoutGetHang) return { kind: 'empty' };
      return new Promise((resolve) => {
        releaseLayoutGet = resolve;
      });
    });

    const module = await import('@renderer/services/web-view.service-shard');
    const { networkObjectService } = await import('@shared/services/network-object.service');
    const { dockLayout, loadedLayouts, dockedWebViews, dockedTabs, makeAddsFail } =
      makeLiveDockLayout({
        doesLoadReplaceTheDock,
      });
    module.registerDockLayout(dockLayout);
    await module.startWebViewServiceShard();
    const provider = await primeProvider();
    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));
    const [, publishedShard] = vi.mocked(networkObjectService.set).mock.calls[0];
    const shard = publishedShard as unknown as RoutedShard;
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    const notifyInterfaceMode = interfaceModeCallback;
    // The mode has to be somewhere else before a switch back to power reloads anything — the
    // subscription ignores a notification that leaves the mode where it was. Only the power reload
    // can be made to hang: simple mode loads a static layout with no request behind it.
    interfaceMode = 'simple';
    await notifyInterfaceMode('simple');
    // Docked after that first switch, so this window holds content by the time the reload below
    // begins: a load that began against an EMPTY dock is tracked by nothing and waited for by
    // nobody, which would leave these tests racing a load that is not there
    await shard.adoptWebView({ id: 'settled-view', webViewType: 'test.type' });

    return {
      module,
      shard,
      dockedWebViews,
      dockedTabs,
      provider,
      makeAddsFail,
      /**
       * Start the load this window's incoming content has to survive, hanging on its saved-layout
       * request until {@link releaseLayoutGet}. Answers once the load is actually in flight.
       */
      startReloadWithSavedLayoutHanging: async () => {
        const requestsBeforeReload = layoutGetRequestCount;
        interfaceMode = 'power';
        doesLayoutGetHang = true;
        const reloading = notifyInterfaceMode('power');
        // A load is only something to wait for once it has begun; it has begun once it has asked
        await vi.waitFor(() => expect(layoutGetRequestCount).toBeGreaterThan(requestsBeforeReload));
        // Wrapped, because this returns while the load it started is still in flight: an async
        // function's own promise adopts a promise it returns bare, so awaiting the start would be
        // awaiting the load
        return { reloading };
      },
      releaseLayoutGet: (response: unknown) => releaseLayoutGet(response),
      /**
       * Empty this window's dock and have the main process answer that it is closing — the one
       * moment `isWindowToldToClose` latches, and one that can come at any time, including while a
       * web view provider is still thinking
       */
      emptyTheDockAndBeToldItIsClosing: async () => {
        emptiedResponse = { action: 'closing' };
        await module.handleDockEmptiedByRemoval(EMPTY_LAYOUT);
      },
    };
  }

  test('a web view waits for a load that started while its provider was thinking', async () => {
    // The stretch this covers is the one an entry point cannot answer for: the open's own wait had
    // nothing to wait for when it ran, and the load began while the provider was still thinking.
    // Docking into that load's dock loses the web view — and silently, since the close events the
    // load emits are diffed against a reading taken before this web view existed, leaving the
    // controller, the nonce and the state it registered with nothing to dispose them.
    const {
      module,
      dockedWebViews,
      provider,
      startReloadWithSavedLayoutHanging,
      releaseLayoutGet,
    } = await windowHoldingOneWebViewWithNothingLoading();

    provider.makeTheProviderThink();
    const opening = module.openWebView('test.opened');
    await provider.waitForTheProviderToBeAsked();

    const { reloading } = await startReloadWithSavedLayoutHanging();

    provider.releaseTheProvider();
    await settle();

    expect(dockedWebViews.map((webView) => webView.webViewType)).not.toContain('test.opened');

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    const openedId = await opening;
    expect(dockedWebViews.map((webView) => webView.webViewType)).toContain('test.opened');
    expect(getClosedWebViewIds()).not.toContain(openedId);
  });

  test('a web view is refused once this window is told it is closing while its provider thinks', async () => {
    // The other half of the same stretch: nothing about a decided close is announced ahead of time,
    // so the answer that latches it can land at any moment — including while the provider is
    // running. A web view docked after that is destroyed with the window moments later, and
    // refusing is what sends it back up the router's recovery ladder instead.
    const { module, dockedWebViews, provider, emptyTheDockAndBeToldItIsClosing } =
      await windowHoldingOneWebViewWithNothingLoading();

    provider.makeTheProviderThink();
    const opening = module.openWebView('test.opened');
    // Marked handled from the start: the refusal lands while the release below is being awaited,
    // and an unhandled rejection in that gap would fail the run for the wrong reason
    opening.catch(() => {});
    await provider.waitForTheProviderToBeAsked();

    await emptyTheDockAndBeToldItIsClosing();

    provider.releaseTheProvider();

    await expect(opening).rejects.toThrow(/closing/);
    expect(dockedWebViews.map((webView) => webView.webViewType)).not.toContain('test.opened');
  });

  test('a web view refused after its provider answered leaves nothing of it behind', async () => {
    // A refusal this late is not a request that was turned away at the door: the provider has run,
    // so the extension host holds a controller for this web view and the state is persisted under
    // an id this window's scope is stripped from — both outlive the window that refused. Nothing
    // else will ever emit a close event for a tab that never joined the dock, so the refusal has
    // to land where the failed-add cleanup catches it.
    const { shard, dockedWebViews, provider, emptyTheDockAndBeToldItIsClosing } =
      await windowHoldingOneWebViewWithNothingLoading();
    const { deleteFullWebViewStateById } = await import(
      '@renderer/services/web-view-state.service'
    );

    provider.makeTheProviderThink();
    // A move carries the state it was captured with, which this window persists before the
    // provider runs — the residue a refusal leaves is real state, not a hypothetical
    const adopting = shard.adoptWebView({
      id: 'moved-view',
      webViewType: 'test.type',
      state: { scrollPosition: 12 },
    });
    // Marked handled from the start (see the open above)
    adopting.catch(() => {});
    await provider.waitForTheProviderToBeAsked();

    await emptyTheDockAndBeToldItIsClosing();

    provider.releaseTheProvider();

    await expect(adopting).rejects.toThrow(/closing/);
    expect(dockedWebViews.map((webView) => webView.id)).not.toContain('moved-view');
    // The close event is what disposes the controller and the nonce; the state is evicted directly
    expect(getClosedWebViewIds()).toContain('moved-view');
    expect(deleteFullWebViewStateById).toHaveBeenCalledWith('moved-view');
  });

  test('a reload refused while its own tab is still docked leaves that tab standing', async () => {
    // The complement of the test above, and what the failed-add cleanup asks the dock about this
    // web view for: a refusal aimed at a reload names a web view whose tab is already here. The
    // close event disposes the controller and the nonce, and the eviction takes the state, so
    // running that cleanup would gut a view the user is still looking at. The refusal is the whole
    // of what happens — and it is what an ordinary window close looks like from here, so it is
    // reported as such rather than as a failure to update the dock.
    const { module, dockedWebViews, emptyTheDockAndBeToldItIsClosing } =
      await windowHoldingOneWebViewWithNothingLoading();
    const { deleteFullWebViewStateById } = await import(
      '@renderer/services/web-view-state.service'
    );

    await emptyTheDockAndBeToldItIsClosing();

    await expect(module.reloadWebView('test.type', 'settled-view')).rejects.toThrow(/closing/);

    expect(dockedWebViews.map((webView) => webView.id)).toContain('settled-view');
    expect(getClosedWebViewIds()).not.toContain('settled-view');
    expect(deleteFullWebViewStateById).not.toHaveBeenCalledWith('settled-view');
    expect(mocks.loggerError).not.toHaveBeenCalledWith(expect.stringMatching(/settled-view/));
    expect(mocks.loggerDebug).toHaveBeenCalledWith(expect.stringMatching(/settled-view.*closing/));
  });

  test('a reload the dock itself turns down is reported as the failure it is', async () => {
    // The control for the level the test above asserts is not used: the same catch and the same tab
    // still docked, reached by the other throw the try covers. A definition the dock's tab loader
    // refuses leaves the user with a view that answered a reload by not changing and no account of
    // why, which is a failure and stays an error.
    const { module, dockedWebViews, makeAddsFail } =
      await windowHoldingOneWebViewWithNothingLoading();

    makeAddsFail(new Error('the tab loader refused this definition'));

    await expect(module.reloadWebView('test.type', 'settled-view')).rejects.toThrow(/refused/);

    expect(mocks.loggerError).toHaveBeenCalledWith(
      expect.stringMatching(/settled-view.*existing tab is unchanged/),
    );
    expect(dockedWebViews.map((webView) => webView.id)).toContain('settled-view');
  });

  test('a reload does not re-add a web view the load it waited out removed', async () => {
    // The reload's reading of the dock is taken before the wait, so it speaks for a dock the load
    // is about to replace — a switch to `simpleLayout` while a restored tab was still fetching its
    // content is exactly that. The load closed this web view and disposed what backed it, so
    // adding it back would hand the user a tab the load removed with nothing behind it.
    const { module, dockedWebViews, startReloadWithSavedLayoutHanging, releaseLayoutGet } =
      await windowHoldingOneWebViewWithNothingLoading();

    const { reloading } = await startReloadWithSavedLayoutHanging();

    const reloadingWebView = module.reloadWebView('test.type', 'settled-view');
    await settle();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(reloadingWebView).resolves.toBeUndefined();
    expect(dockedWebViews.map((webView) => webView.id)).not.toContain('settled-view');
    // The load is what closed it, and it did so while the reload was parked on that same load
    expect(getClosedWebViewIds()).toContain('settled-view');
  });

  test('a reload waits for a load in flight', async () => {
    // A reload reaches the dock with none of an entry point's protections behind it — it goes
    // straight to the open path. A restored tab fetching its content and every extension reload
    // both come this way, so a layout load is exactly the company it keeps, and the load is as
    // fatal to what it brings as to any other arrival.
    //
    // The load here keeps what is docked, which is the load a reload survives: the web view it
    // names is still there when it resumes, so it is still a reload of something.
    const { module, dockedWebViews, startReloadWithSavedLayoutHanging, releaseLayoutGet } =
      await windowHoldingOneWebViewWithNothingLoading({ doesLoadReplaceTheDock: false });

    const { reloading } = await startReloadWithSavedLayoutHanging();

    let hasReloadAnswered = false;
    const reloadingWebView = module.reloadWebView('test.type', 'settled-view').then((id) => {
      hasReloadAnswered = true;
      return id;
    });
    await settle();

    // Parked on the load rather than writing into the dock behind it
    expect(hasReloadAnswered).toBe(false);

    releaseLayoutGet({ kind: 'empty' });
    await reloading;

    await expect(reloadingWebView).resolves.toBe('settled-view');
    expect(dockedWebViews.map((webView) => webView.id)).toContain('settled-view');
  });

  test('a tab waits for a load in flight', async () => {
    // Driven straight at the dock write, because that is the whole of what the check there is for:
    // every caller's own wait speaks for the moment its request arrived, and this one speaks for
    // the moment the tab actually reaches the dock.
    const { module, dockedTabs, startReloadWithSavedLayoutHanging, releaseLayoutGet } =
      await windowHoldingOneWebViewWithNothingLoading();

    const { reloading } = await startReloadWithSavedLayoutHanging();

    const addingTab = module.addTab(
      { id: 'late-tab', tabType: 'settings-tab' },
      { type: 'float', position: 'center' },
    );
    await settle();

    expect(dockedTabs.map((tab) => tab.id)).not.toContain('late-tab');

    releaseLayoutGet({ kind: 'empty' });
    await reloading;
    await addingTab;

    expect(dockedTabs.map((tab) => tab.id)).toContain('late-tab');
  });

  test('a tab is refused once this window is told it is closing', async () => {
    const { module, dockedTabs, emptyTheDockAndBeToldItIsClosing } =
      await windowHoldingOneWebViewWithNothingLoading();

    await emptyTheDockAndBeToldItIsClosing();

    const addingTab = module.addTab(
      { id: 'late-tab', tabType: 'settings-tab' },
      { type: 'float', position: 'center' },
    );

    await expect(addingTab).rejects.toThrow(/closing/);
    expect(dockedTabs.map((tab) => tab.id)).not.toContain('late-tab');
  });
});
