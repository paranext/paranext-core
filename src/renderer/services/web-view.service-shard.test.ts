import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type {
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
} from '@shared/models/docking-framework.model';
import { serialize } from 'platform-bible-utils';

// The service shard logs through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

const ANCHOR_WEB_VIEW_TYPE = 'test.anchor';
const SUPPLEMENT_TAB_ID = 'supplement-tab';

const mocks = vi.hoisted(() => ({
  settingsGet: vi.fn(),
  settingsSubscribe: vi.fn<
    (
      key: string,
      callback: (newSetting: unknown) => Promise<void>,
    ) => Promise<() => Promise<boolean>>
  >(async () => async () => true),
  networkRequest: vi.fn(),
}));

// The supplement is product-specific data; supply our own so these tests describe the merge
// behavior rather than whichever tabs the shipped file happens to contain.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: {
    tabs: [
      {
        anchorWebViewType: ANCHOR_WEB_VIEW_TYPE,
        tab: {
          id: SUPPLEMENT_TAB_ID,
          tabType: TAB_TYPE_WEBVIEW,
          data: {
            webViewType: 'test.supplement',
            id: SUPPLEMENT_TAB_ID,
            contentType: 'react',
            state: {},
          },
        },
      },
    ],
  },
}));

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet, subscribe: mocks.settingsSubscribe },
}));

// Everything below is module-load or startup machinery the layout path does not exercise; stub it
// so importing the service shard in a test does not stand up the whole renderer service graph.
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
  getNetworkEvent: () => vi.fn(),
  request: mocks.networkRequest,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));
vi.mock('@shared/services/web-view-provider.service', () => ({ webViewProviderService: {} }));
vi.mock('@renderer/services/theme.service-host', () => ({ localThemeService: {} }));
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

// `LayoutInfo` is deliberately opaque in the shared model, so building a layout fixture and reading
// tab ids back out of one both have to cross that boundary.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Layout with one panel holding a web view of the type the supplement entry anchors to */
function layoutWithAnchor(extraTabs: SavedTabInfo[] = []): LayoutInfo {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            {
              id: 'anchor-tab',
              tabType: TAB_TYPE_WEBVIEW,
              data: { id: 'anchor-tab', webViewType: ANCHOR_WEB_VIEW_TYPE, state: {} },
            },
            ...extraTabs,
          ],
        },
      ],
    },
  } as unknown as LayoutInfo;
}

/** Layout with one panel holding one web view tab with the given id */
function layoutWithTab(tabId: string): LayoutInfo {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            {
              id: tabId,
              tabType: TAB_TYPE_WEBVIEW,
              data: { id: tabId, webViewType: 'test.type', state: {} },
            },
          ],
        },
      ],
    },
  } as unknown as LayoutInfo;
}

/** Every tab id anywhere in a layout, in order */
function tabIdsIn(layout: LayoutInfo): string[] {
  const ids: string[] = [];
  const walk = (box: { tabs?: { id?: string }[]; children?: unknown[] }) => {
    box.tabs?.forEach((tab) => tab.id && ids.push(tab.id));
    box.children?.forEach((child) => {
      if (child && typeof child === 'object')
        walk(child as { tabs?: { id?: string }[]; children?: unknown[] });
    });
  };
  walk((layout as unknown as { dockbox: { tabs?: []; children?: [] } }).dockbox);
  return ids;
}

/**
 * Minimal stand-in for the registered dock layout. Only the pieces `loadLayout` touches are real;
 * `loadLayout` records the layout it is handed so tests can assert on the final ids.
 */
function makeDockLayout(simpleLayout: LayoutInfo) {
  const loadedLayouts: LayoutInfo[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [],
    simpleLayout,
    testLayout: simpleLayout,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts };
}

/** Register a dock layout and wait for the fire-and-forget initial `loadLayout` to land */
async function registerWindow(simpleLayout: LayoutInfo) {
  const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
  const { dockLayout, loadedLayouts } = makeDockLayout(simpleLayout);
  registerDockLayout(dockLayout);
  await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));
  return { dockLayout, loadedLayouts };
}

/** Register a dock layout and return the layout the initial load landed on */
async function loadLayoutInWindow(simpleLayout: LayoutInfo) {
  const { loadedLayouts } = await registerWindow(simpleLayout);
  return loadedLayouts[loadedLayouts.length - 1];
}

/** Answer `windowLayout:get` with the given response; every other request resolves undefined */
function respondToGetLayout(response: unknown) {
  mocks.networkRequest.mockImplementation(async (requestType: string) =>
    requestType === 'windowLayout:get' ? response : undefined,
  );
}

/**
 * Hold every `windowLayout:get` open the way a slow main process would, so a test can act while a
 * load is mid-flight. Returns a function that answers the request made so far.
 */
function holdGetLayout() {
  let answer: ((response: unknown) => void) | undefined;
  mocks.networkRequest.mockImplementation(async (requestType: string) => {
    if (requestType !== 'windowLayout:get') return undefined;
    return new Promise((resolve) => {
      answer = resolve;
    });
  });
  return {
    hasRequest: () => answer !== undefined,
    answerWith: (response: unknown) => {
      if (!answer) throw new Error('the saved-layout request was never made');
      answer(response);
    },
  };
}

/** All `windowLayout:save` pushes made so far, as [windowId, layout] pairs */
function layoutPushes() {
  return mocks.networkRequest.mock.calls
    .filter(([requestType]) => requestType === 'windowLayout:save')
    .map(([, windowId, layout]) => [windowId, layout]);
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  localStorage.clear();
  globalThis.windowId = '2';
  respondToGetLayout({ kind: 'empty' });
});

describe('loadLayout scopes web view ids to this window', () => {
  beforeEach(() => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : true,
    );
  });

  test('scopes the ids that come from the shared layout', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toContain('anchor-tab-w2');
  });

  test('scopes supplement tab ids, which are merged in after the layout is scoped', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    // Unscoped, this id is identical in every window, so both windows' web views would register
    // their message handlers under the same name
    expect(tabIdsIn(loaded)).toContain(`${SUPPLEMENT_TAB_ID}-w2`);
    expect(tabIdsIn(loaded)).not.toContain(SUPPLEMENT_TAB_ID);
  });

  test('gives two windows different supplement tab ids', async () => {
    const sharedLayout = layoutWithAnchor();

    globalThis.windowId = '1';
    const inWindow1 = tabIdsIn(await loadLayoutInWindow(sharedLayout));
    vi.resetModules();
    globalThis.windowId = '2';
    const inWindow2 = tabIdsIn(await loadLayoutInWindow(sharedLayout));

    expect(inWindow1).not.toContain(`${SUPPLEMENT_TAB_ID}-w2`);
    expect(inWindow2).toContain(`${SUPPLEMENT_TAB_ID}-w2`);
  });

  test('keeps a supplement tab’s id and its data id in agreement', async () => {
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    const { dockbox } = loaded as unknown as { dockbox: { children: { tabs: SavedTabInfo[] }[] } };
    const supplementTab = dockbox.children[0].tabs.find(
      (tab) => tab.id === `${SUPPLEMENT_TAB_ID}-w2`,
    );
    expect((supplementTab?.data as { id: string }).id).toBe(`${SUPPLEMENT_TAB_ID}-w2`);
  });

  test('re-scopes a restored supplement tab instead of adding a second copy', async () => {
    // Power mode restores the merged layout, so the next load restores a supplement tab that is
    // already scoped — to another window's id, since window ids are not stable across restarts
    const savedSupplementTab: SavedTabInfo = {
      id: `${SUPPLEMENT_TAB_ID}-w1`,
      tabType: TAB_TYPE_WEBVIEW,
      data: { id: `${SUPPLEMENT_TAB_ID}-w1`, webViewType: 'test.supplement', state: {} },
    } as unknown as SavedTabInfo;
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : true,
    );
    respondToGetLayout({ kind: 'entry', layout: layoutWithAnchor([savedSupplementTab]) });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded).filter((id) => id.startsWith(SUPPLEMENT_TAB_ID))).toEqual([
      `${SUPPLEMENT_TAB_ID}-w2`,
    ]);
  });
});

describe('loadLayout restores this window’s layout from the main process', () => {
  beforeEach(() => {
    // Power mode with the supplement flag off, so these tests see exactly the restored layout
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
  });

  test('a window assigned an entry loads it, ids scoped to this window', async () => {
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab-w1') });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(mocks.networkRequest).toHaveBeenCalledWith('windowLayout:get', 2);
    expect(tabIdsIn(loaded)).toEqual(['saved-tab-w2']);
  });

  test('a legacy window loads the unprefixed legacy layout from localStorage', async () => {
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['legacy-tab-w2']);
  });

  test('a legacy window prefers a window-prefixed legacy key over the stale unprefixed one', async () => {
    // Builds that scoped localStorage per window (before layouts moved into the main process's
    // structure) wrote the dock layout only under prefixed keys, so when one exists the unprefixed
    // key is the older layout
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('stale-tab')));
    localStorage.setItem('1_dock-saved-layout', serialize(layoutWithTab('prefixed-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['prefixed-tab-w2']);
  });

  test('with several window-prefixed legacy keys, the lowest window id wins', async () => {
    // The lowest id was the earliest-created (main) window of the session that wrote the keys —
    // and notably NOT this window's own id (this harness runs as window 2)
    localStorage.setItem('3_dock-saved-layout', serialize(layoutWithTab('higher-tab')));
    localStorage.setItem('1_dock-saved-layout', serialize(layoutWithTab('lowest-tab')));
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual(['lowest-tab-w2']);
  });

  test('a second window never receives the legacy layout — the clone fallback is gone', async () => {
    // The legacy layout is present, but main says this window has no entry: it must start empty
    // instead of cloning window 1's legacy layout
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
    respondToGetLayout({ kind: 'empty' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
  });

  test('a window with no entry loads an empty layout — neither testLayout nor simpleLayout', async () => {
    respondToGetLayout({ kind: 'empty' });

    // The harness's simpleLayout and testLayout both hold the anchor tab, so any tab at all would
    // mean one of them leaked in
    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    expect(tabIdsIn(loaded)).toEqual([]);
  });

  test('falls back to testLayout only when legacy storage is empty too', async () => {
    respondToGetLayout({ kind: 'legacy' });

    const loaded = await loadLayoutInWindow(layoutWithAnchor());

    // The dev-fresh-profile behavior: no saved entry and no legacy layout loads testLayout (which
    // here holds the anchor tab; the supplement then merges onto that anchor as usual)
    expect(tabIdsIn(loaded)).toContain('anchor-tab-w2');
  });
});

describe('loadLayout when the saved-layout request fails', () => {
  beforeEach(() => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
    // A legacy layout is present throughout: a request FAILURE must never read it — only a
    // main-process 'legacy' answer may (otherwise the shared legacy layout would be cloned into
    // whichever window hit the failure)
    localStorage.setItem('dock-saved-layout', serialize(layoutWithTab('legacy-tab')));
  });

  /** Register a dock layout under fake timers and drive the retry delays until the load lands */
  async function registerWindowThroughRetries(simpleLayout: LayoutInfo) {
    vi.useFakeTimers();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts } = makeDockLayout(simpleLayout);
    registerDockLayout(dockLayout);
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(loadedLayouts.length).toBeGreaterThan(0);
    return { dockLayout, loadedLayouts };
  }

  test('retries a failed request and uses the answer a later attempt brings', async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      if (getLayoutCalls < 3) throw new Error('transport not up yet');
      return { kind: 'entry', layout: layoutWithTab('saved-tab') };
    });

    const { dockLayout, loadedLayouts } = await registerWindowThroughRetries(layoutWithAnchor());

    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual(['saved-tab-w2']);
    expect(getItemSpy).not.toHaveBeenCalledWith('dock-saved-layout');
    // Pushes work normally — the load succeeded, just not on the first attempt
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('changed'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('when every attempt fails, the window starts empty and layout pushes are held', async () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });

    const { dockLayout, loadedLayouts } = await registerWindowThroughRetries(layoutWithAnchor());

    // Empty — not the legacy layout and not the harness's testLayout (which holds the anchor tab)
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual([]);
    expect(getItemSpy).not.toHaveBeenCalledWith('dock-saved-layout');

    // A layout change must NOT be pushed: what the dock holds is a fallback, and pushing it would
    // overwrite the user's real saved entry in the main process's structure
    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('fallback-era'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);
  });

  test('a later successful load lifts the push hold', async () => {
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') throw new Error('transport is down');
      return undefined;
    });

    const { dockLayout } = await registerWindowThroughRetries(layoutWithAnchor());
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('held'), undefined, undefined);
    expect(layoutPushes()).toEqual([]);

    // The transport recovers, and an interface-mode round trip reloads the layout
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab') });
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('simple');
    await interfaceModeCallback('power');

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('after-recovery'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toHaveLength(1);
  });
});

describe('loadLayout discards a load a newer one has superseded', () => {
  /**
   * Let every already-scheduled continuation run. A superseded load produces no observable call, so
   * there is nothing to wait FOR — drain the queue instead and then assert nothing arrived. Several
   * turns because the tail of a load awaits the saved-layout request and then the supplement
   * flags.
   */
  async function settle() {
    for (let turn = 0; turn < 5; turn += 1)
      // Draining is inherently sequential
      // eslint-disable-next-line no-await-in-loop
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });
  }

  test('a slow initial load must not replace the layout of the mode the user switched to', async () => {
    let interfaceMode = 'power';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // Hold the initial load's saved-layout request open, the way a slow (or retrying) main process
    // would: it takes seconds, and the user can act during them
    let answerFirstGet: ((response: unknown) => void) | undefined;
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      if (getLayoutCalls > 1) return { kind: 'empty' };
      return new Promise((resolve) => {
        answerFirstGet = resolve;
      });
    });

    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(getLayoutCalls).toBe(1));

    // The user switches to simple mode while the initial load is still waiting on main. That load
    // completes and swaps in the static simple layout.
    interfaceMode = 'simple';
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('simple');
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toContain('anchor-tab-w2');
    const loadsBeforeTheLateAnswer = loadedLayouts.length;

    // Main finally answers the first request — with the power layout the user has already left
    if (!answerFirstGet) throw new Error('the saved-layout request was never made');
    answerFirstGet({ kind: 'entry', layout: layoutWithTab('stale-power-tab') });
    await settle();

    // The stale answer must not reach the dock: loading it would replace the whole layout, wiping
    // whatever the user has done since the switch
    expect(loadedLayouts).toHaveLength(loadsBeforeTheLateAnswer);
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).not.toContain('stale-power-tab-w2');

    // Keep the dangling dock-layout registration from leaking into the next test
    dockLayout.onLayoutChangeRef.current = undefined;
  });

  test('a superseded load leaves the interface-mode cache on the newer load’s reading', async () => {
    // The cache decides whether `saveLayout` pushes at all, so a stale writer turns a power-mode
    // session's layout changes into silent no-ops
    let interfaceMode = 'simple';
    let releaseFirstModeRead: (() => void) | undefined;
    let modeReads = 0;
    mocks.settingsGet.mockImplementation(async (key: string) => {
      if (key !== 'platform.interfaceMode') return false;
      modeReads += 1;
      if (modeReads > 1) return interfaceMode;
      // Park the initial load on its very first read, before it can seed the cache
      await new Promise<void>((resolve) => {
        releaseFirstModeRead = resolve;
      });
      return 'simple';
    });
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    respondToGetLayout({ kind: 'empty' });

    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(releaseFirstModeRead).toBeDefined());

    // The user switches to power mode; that load runs to completion and leaves the cache on 'power'
    interfaceMode = 'power';
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    await interfaceModeCallback('power');

    // Only now does the initial load's mode read come back — with 'simple', the stale reading
    if (!releaseFirstModeRead) throw new Error('the initial mode read never happened');
    releaseFirstModeRead();
    await settle();

    // Power-mode layout changes must still be pushed
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a superseded load must not declare the window fallback-bound after a newer load succeeded', async () => {
    // The initial load's saved-layout request retries for seconds, which is exactly long enough for
    // a mode round-trip to start and finish inside it. If the initial load's eventual failure still
    // latched the fallback flag, it would hold every layout push for the rest of the session — on
    // behalf of a load whose answer was already thrown away.
    let interfaceMode = 'power';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    let failLastAttempt: ((reason: Error) => void) | undefined;
    let getLayoutCalls = 0;
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType !== 'windowLayout:get') return undefined;
      getLayoutCalls += 1;
      // The initial load's first two attempts fail outright; its third hangs until this test fails
      // it, so the load that supersedes it (call 4) can finish first
      if (getLayoutCalls <= 2) throw new Error('transport is down');
      if (getLayoutCalls === 3)
        return new Promise((_resolve, reject) => {
          failLastAttempt = reject;
        });
      return { kind: 'entry', layout: layoutWithTab('saved-tab') };
    });

    vi.useFakeTimers();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-shard');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    // Drive the two retry delays so the initial load reaches its final, hanging attempt
    await vi.advanceTimersByTimeAsync(60_000);
    vi.useRealTimers();
    expect(getLayoutCalls).toBe(3);

    // The user round-trips through simple mode and back while that attempt hangs. The load that
    // brings them back to power gets a real answer, so this window is NOT on a fallback layout.
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    await interfaceModeCallback('power');
    expect(getLayoutCalls).toBe(4);

    // Only now does the superseded load give up
    if (!failLastAttempt) throw new Error('the final attempt was never made');
    failLastAttempt(new Error('transport is down'));
    await settle();

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });
});

describe('saveLayout pushes this window’s layout to the main process', () => {
  beforeEach(() => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'power' : false,
    );
  });

  test('a power-mode layout change pushes the reconciled layout with this window’s id', async () => {
    const { dockLayout } = await registerWindow(layoutWithAnchor());

    // A duplicated tab proves the layout is reconciled on the way out
    const changedLayout = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] },
          { tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] },
        ],
      },
    } as unknown as LayoutInfo;
    await dockLayout.onLayoutChangeRef.current?.(changedLayout, undefined, undefined);

    expect(layoutPushes()).toEqual([
      [
        2,
        {
          dockbox: {
            mode: 'horizontal',
            children: [{ tabs: [{ id: 'kept', tabType: TAB_TYPE_WEBVIEW }] }],
          },
        },
      ],
    ]);
  });

  test('a simple-mode layout change pushes nothing', async () => {
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? 'simple' : false,
    );
    const { dockLayout } = await registerWindow(layoutWithAnchor());

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('ephemeral'), undefined, undefined);

    expect(layoutPushes()).toEqual([]);
  });

  test('a layout change before the initial load lands pushes nothing', async () => {
    // Until the initial load lands, the dock holds rc-dock's empty default rather than anything of
    // this window's. Pushing that would replace the saved entry with an empty layout — and an entry
    // that HAS a layout is no longer eligible for the legacy fallback, so the window would start
    // empty from then on.
    const heldGet = holdGetLayout();

    const { registerDockLayout } = await import('@renderer/services/web-view.service-host');
    const { dockLayout, loadedLayouts } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(heldGet.hasRequest()).toBe(true));

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('rc-dock-default'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);

    // Once the saved layout lands, pushes resume from there
    heldGet.answerWith({ kind: 'entry', layout: layoutWithTab('saved-tab') });
    await vi.waitFor(() => expect(loadedLayouts.length).toBeGreaterThan(0));

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a layout change while the switch to power is still loading pushes nothing', async () => {
    // The switch to power flips the mode cache before the saved power layout can reach the dock, so
    // for the length of that load the dock still holds the SIMPLE layout while pushes are armed. A
    // web view writing state or focus moving in that window (both run through the dock's
    // onLayoutChange) would push the simple layout as this window's power layout, destroying the
    // saved one for good.
    let interfaceMode = 'simple';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // Hold the power-mode load's saved-layout request open the way a slow main process would
    const heldGet = holdGetLayout();

    const { dockLayout, loadedLayouts } = await registerWindow(layoutWithAnchor());
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');

    interfaceMode = 'power';
    const switchToPower = interfaceModeCallback('power');
    await vi.waitFor(() => expect(heldGet.hasRequest()).toBe(true));

    // The dock still holds the simple layout at this point
    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('still-the-simple-layout'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);

    // Once the saved power layout lands, it is what the dock gets — and pushes resume from there
    heldGet.answerWith({ kind: 'entry', layout: layoutWithTab('saved-power-tab') });
    await switchToPower;
    expect(tabIdsIn(loadedLayouts[loadedLayouts.length - 1])).toEqual(['saved-power-tab-w2']);

    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);
  });

  test('a layout change after a load throws pushes nothing', async () => {
    // A load that throws leaves the dock exactly where the hold exists to protect it: holding the
    // old mode's layout, with pushes armed under the new mode. Releasing on the way out — the
    // obvious way to keep a failure from wedging persistence for the session — would resume pushes
    // into precisely that state, so the marker stays behind instead and the next load that reaches
    // the dock is what lifts the hold.
    // Switching TO power, so the push that follows is one simple mode would not have blocked anyway
    let failModeRead = false;
    mocks.settingsGet.mockImplementation(async (key: string) => {
      if (key !== 'platform.interfaceMode') return false;
      if (failModeRead) throw new Error('settings service is down');
      return 'simple';
    });
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-tab') });

    const { dockLayout } = await registerWindow(layoutWithAnchor());
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');

    // The switch's own load cannot even read the mode, so it never reaches the dock — but the mode
    // cache is already on 'power', so `saveLayout` is armed
    failModeRead = true;
    await interfaceModeCallback('power');

    await dockLayout.onLayoutChangeRef.current?.(
      layoutWithTab('after-throw'),
      undefined,
      undefined,
    );
    expect(layoutPushes()).toEqual([]);
  });

  test('an abandoned load must not hold pushes once a newer load has reached the dock', async () => {
    // The hold tracks which load's layout is IN the dock, not how many loads are running. A load
    // that is superseded can sit in its saved-layout request for a long time (it retries, and the
    // request itself may never settle), and it ends without ever writing the dock — so once a newer
    // load HAS written the dock, the abandoned one must not keep layout changes from being saved.
    // Counting loads in flight instead would silently stop persisting for the rest of the session.
    let interfaceMode = 'power';
    mocks.settingsGet.mockImplementation(async (key: string) =>
      key === 'platform.interfaceMode' ? interfaceMode : false,
    );
    let interfaceModeCallback: ((newMode: unknown) => Promise<void>) | undefined;
    mocks.settingsSubscribe.mockImplementation(
      async (_key: string, callback: (newMode: unknown) => Promise<void>) => {
        interfaceModeCallback = callback;
        return async () => true;
      },
    );
    // The initial power load parks on a saved-layout request that never comes back
    const abandonedGet = holdGetLayout();
    const { registerDockLayout } = await import('@renderer/services/web-view.service-host');
    const { dockLayout } = makeDockLayout(layoutWithAnchor());
    registerDockLayout(dockLayout);
    await vi.waitFor(() => expect(abandonedGet.hasRequest()).toBe(true));

    // The user round-trips through simple and back; this time the power load gets an answer and
    // reaches the dock, superseding the parked one
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    respondToGetLayout({ kind: 'entry', layout: layoutWithTab('saved-power-tab') });
    await interfaceModeCallback('power');

    // The abandoned load is still parked, but the dock holds this window's layout — pushes must work
    await dockLayout.onLayoutChangeRef.current?.(layoutWithTab('after'), undefined, undefined);
    expect(layoutPushes()).toHaveLength(1);

    // Keep the dangling dock-layout registration from leaking into the next test
    dockLayout.onLayoutChangeRef.current = undefined;
  });
});
