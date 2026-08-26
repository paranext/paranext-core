import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProcessType } from '@shared/global-this.model';
import type {
  Layout,
  LayoutInfo,
  PapiDockLayout,
  SavedTabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import type { SavedWebViewDefinition, WebViewDefinition } from '@shared/models/web-view.model';

// The service shards log through the shared logger, which warns on every call when it cannot tell
// which process it is running in
globalThis.processType = ProcessType.Renderer;

// Mock dock layouts and the published shard objects both cross the shared model's opaque
// `LayoutInfo`/`PapiDockLayout` boundary, and the shards are read back off an untyped
// `networkObjectService.set` — the same reason `web-view.service-shard.test.ts` disables this rule
// file-wide rather than per cast.
/* eslint-disable no-type-assertion/no-type-assertion */

const mocks = vi.hoisted(() => ({
  settingsGet: vi.fn(),
  settingsSubscribe: vi.fn<
    (
      key: string,
      callback: (newSetting: unknown) => Promise<void>,
    ) => Promise<() => Promise<boolean>>
  >(async () => async () => true),
  networkRequest: vi.fn(),
  publishedShards: [] as Record<string, unknown>[],
}));

// This file drives the REAL web view service shard and the REAL dialog service shard together —
// everything a routed dialog has to answer for lives on the web view shard: the load in flight it
// waits out, the decided close it is refused for, and the emptiness report it may land inside of.
// Mocking either shard out would leave the interaction under test unexercised. That means standing
// up both dependency graphs: the web view shard's mock set is the one from
// `web-view.service-shard.initial-load.test.ts`, and the dialog-only mocks below it are the ones
// from `dialog.service-shard.test.ts`.
vi.mock('@renderer/components/docking/default-layout-supplement.json', () => ({
  default: { tabs: [] },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: mocks.settingsGet, subscribe: mocks.settingsSubscribe },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('@shared/services/network.service', () => ({
  createBufferedNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
  getNetworkEvent: () => vi.fn(),
  request: mocks.networkRequest,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    set: vi.fn(async (_name: string, objectToShare: Record<string, unknown>) => {
      mocks.publishedShards.push(objectToShare);
      return { dispose: vi.fn().mockResolvedValue(true) };
    }),
  },
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

// Dialog shard dependencies
vi.mock('@renderer/services/overlays/overlay.service-host', () => ({
  showModalDialogOverlay: vi.fn(),
}));
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  resolveAndRemoveOverlay: vi.fn(),
  rejectAndRemoveOverlay: vi.fn(),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedStrings: vi.fn().mockResolvedValue({}) },
}));
vi.mock('@renderer/components/dialogs/dialog-base.data', () => ({ hookUpDialogService: vi.fn() }));
vi.mock('@renderer/components/dialogs/about-dialog.component', () => ({
  ABOUT_DIALOG: { tabType: 'platform.about' },
}));
vi.mock('@renderer/components/dialogs/select-project.dialog', () => ({
  SELECT_PROJECT_DIALOG: { tabType: 'platform.selectProject' },
}));
const mockDialogs = {
  'platform.alert': { tabType: 'platform.alert', dialogRole: 'alertdialog', Component: vi.fn() },
};
vi.mock('@renderer/components/dialogs/index', () => ({
  DIALOGS: mockDialogs,
  default: mockDialogs,
}));

/** Layout with no tab anywhere */
const EMPTY_LAYOUT = { dockbox: { mode: 'horizontal', children: [] } } as unknown as LayoutInfo;

/** The dialog type these tests open, and the tab type it lands in the dock under */
const ALERT_DIALOG_TYPE = 'platform.alert';

/** Narrow view of the published web view shard covering only what these tests drive */
type WebViewShard = {
  adoptWebView(savedWebViewDefinition: SavedWebViewDefinition): Promise<string | undefined>;
  hasContentArrivedSinceEmptyReport(): Promise<boolean>;
};

/** Narrow view of the published dialog shard covering only what these tests drive */
type DialogShard = {
  showDialog(dialogType: string, options?: Record<string, unknown>): Promise<unknown>;
};

/**
 * Dock layout stand-in whose contents are live, matching the one in
 * `web-view.service-shard.initial-load.test.ts`: web views added through `addWebViewToDock` show up
 * in `getAllWebViewDefinitions`, and non-web-view tabs go in through `addTabToDock` and are
 * recorded separately — the dock's own split, and the whole reason a dialog tab is invisible to a
 * load's diffing.
 */
function makeLiveDockLayout() {
  const loadedLayouts: LayoutInfo[] = [];
  const dockedWebViews: WebViewDefinition[] = [];
  const dockedTabs: SavedTabInfo[] = [];
  const dockLayout = {
    onLayoutChangeRef: { current: undefined },
    loadLayout: (layout: LayoutInfo) => {
      loadedLayouts.push(layout);
    },
    getAllWebViewDefinitions: () => [...dockedWebViews],
    getWebViewDefinition: (webViewId: string) =>
      dockedWebViews.find((webView) => webView.id === webViewId),
    addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => {
      dockedWebViews.push(webView);
      return layout;
    },
    addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) => {
      dockedTabs.push(savedTabInfo);
      return layout;
    },
    removeTabFromDock: (tabId: string) => {
      const index = dockedTabs.findIndex((tab) => tab.id === tabId);
      if (index < 0) return false;
      dockedTabs.splice(index, 1);
      return true;
    },
    simpleLayout: EMPTY_LAYOUT,
    testLayout: EMPTY_LAYOUT,
  } as unknown as PapiDockLayout;
  return { dockLayout, loadedLayouts, dockedWebViews, dockedTabs };
}

/** Stub the web view provider (and the theme it needs) so `adoptWebView`'s open path can run */
async function primeProvider() {
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  const { localThemeService } = await import('@renderer/services/theme.service');
  // `webViewProviderService` and `localThemeService` are mocked as `{}` (file-level mocks above);
  // attaching stub methods needs a type assertion because the plain-object mock type doesn't model
  // them — same reasoning as the equivalent stubs in `web-view.service-shard.initial-load.test.ts`.
  (webViewProviderService as { getWebViewProvider?: unknown }).getWebViewProvider = vi.fn(
    async () => ({
      getWebView: async (saved: SavedWebViewDefinition) => ({
        id: saved.id,
        webViewType: saved.webViewType,
        contentType: 'html',
        content: '<p>moved</p>',
      }),
    }),
  );
  (localThemeService as { getCurrentThemeSync?: unknown }).getCurrentThemeSync = vi.fn(() => ({
    cssVariables: {},
  }));
}

/** Pick a published shard back out by a method only that shard answers for */
function findPublishedShard<T>(methodName: string): T {
  const shard = mocks.publishedShards.find(
    (published) => typeof published[methodName] === 'function',
  );
  if (!shard) throw new Error(`no published shard answers for ${methodName}`);
  return shard as unknown as T;
}

// Starting the web view shard deletes `globalThis.open` so web views cannot make popups. That is a
// one-way change to the real `window`, which these tests share across every re-import.
const openWindow = globalThis.open;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.publishedShards.length = 0;
  globalThis.open = openWindow;
  localStorage.clear();
  globalThis.windowId = 7;
  mocks.settingsGet.mockImplementation(async (key: string) =>
    key === 'platform.interfaceMode' ? 'power' : false,
  );
  // The dialog shard registers a `beforeunload` listener when it starts; these tests re-import it
  // per test against the one real `window`
  vi.spyOn(window, 'addEventListener').mockImplementation(() => {});
});

describe('a dialog racing a layout load in flight', () => {
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
   * Stand a window up holding one web view, then leave it reloading with its saved-layout request
   * hanging — the stretch anything arriving in this window has to wait out. Same shape as
   * `windowReloadingWithSavedLayoutHanging` in `web-view.service-shard.initial-load.test.ts`, with
   * the dialog shard started over the same window so a dialog can be asked for mid-load.
   *
   * The empty-dock checkpoints cannot help a reload like this one: the window already has content,
   * so the load cannot tell what arrived during it from what it is replacing. It would apply its
   * pre-arrival answer over the dialog tab that just landed — and with nothing reported anywhere,
   * since a dialog tab is not a web view and so appears in none of the lists a load diffs.
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

    const webViewModule = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts, dockedWebViews, dockedTabs } = makeLiveDockLayout();
    webViewModule.registerDockLayout(dockLayout);
    await webViewModule.startWebViewServiceShard();
    await primeProvider();
    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));

    const dialogModule = await import('./dialog.service-shard');
    await dialogModule.startDialogServiceShard();

    const webViewShard = findPublishedShard<WebViewShard>('adoptWebView');
    const dialogShard = findPublishedShard<DialogShard>('showDialog');
    // Content in the dock is what makes the reload below one with something to lose
    await webViewShard.adoptWebView({ id: 'settled-view', webViewType: 'test.type' });

    // The user switches interface mode, and the reload hangs on the saved-layout request
    if (!interfaceModeCallback) throw new Error('interface mode subscription never registered');
    interfaceMode = 'simple';
    await interfaceModeCallback('simple');
    interfaceMode = 'power';
    doesLayoutGetHang = true;
    const reloading = interfaceModeCallback('power');
    await settle();

    return {
      dialogModule,
      dialogShard,
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
        await webViewModule.handleDockEmptiedByRemoval(EMPTY_LAYOUT);
      },
    };
  }

  test('a dialog waits for the load instead of landing in a dock about to be replaced', async () => {
    // A dialog is routed here the same way a settings tab is, and the load in flight is just as
    // fatal to it: a dialog tab is in no web view list, so the load's wholesale replacement takes it
    // with nothing reported anywhere — the requestor is left awaiting an answer from a dialog the
    // user was never shown.
    const { dialogModule, dialogShard, dockedTabs, reloading, releaseLayoutGet } =
      await windowReloadingWithSavedLayoutHanging();

    const showing = dialogShard.showDialog(ALERT_DIALOG_TYPE, { prompt: 'Alert message' });
    let showRejection: unknown;
    showing.catch((error: unknown) => {
      showRejection = error;
    });
    await settle();

    expect(dockedTabs.map((tab) => tab.tabType)).not.toContain(ALERT_DIALOG_TYPE);

    releaseLayoutGet({ kind: 'empty' });
    await reloading;
    await settle();

    expect(showRejection).toBeUndefined();
    expect(dockedTabs.map((tab) => tab.tabType)).toContain(ALERT_DIALOG_TYPE);

    // The dialog is really live in this window, not just a tab shape in a list: answering it
    // resolves the promise the requestor is holding
    const dialogTab = dockedTabs.find((tab) => tab.tabType === ALERT_DIALOG_TYPE);
    if (!dialogTab) throw new Error('the dialog tab was not docked');
    dialogModule.resolveDialogRequest(dialogTab.id, 'answered');
    await expect(showing).resolves.toBe('answered');
  });

  test('a dialog parked on the load is refused once this window is told it is closing', async () => {
    // The refusal matters as much here as for a settings tab: a dialog that lands in a window whose
    // close is decided goes with it reported nowhere at all, and its requestor waits forever
    const {
      dialogShard,
      dockedTabs,
      reloading,
      releaseLayoutGet,
      emptyTheDockAndBeToldItIsClosing,
    } = await windowReloadingWithSavedLayoutHanging();

    const showing = dialogShard.showDialog(ALERT_DIALOG_TYPE, { prompt: 'Alert message' });
    // Marked handled from the start: the refusal lands while the release below is being awaited,
    // and an unhandled rejection in that gap would fail the run for the wrong reason
    showing.catch(() => {});
    await settle();

    // The user closes this window's last tab while the dialog is parked, and main decides the close
    await emptyTheDockAndBeToldItIsClosing();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;
    // The parked request resumes on the load settling, a turn or more after the reload itself
    await settle();

    // Asserted before the rejection because a dialog that docked anyway never settles its promise
    // at all — the rejection assertion would report a timeout where this one names what went wrong
    expect(dockedTabs.map((tab) => tab.tabType)).not.toContain(ALERT_DIALOG_TYPE);
    await expect(showing).rejects.toThrow(/closing/);
  });

  test('a modal dialog is refused as well, without waiting the load out to be told so', async () => {
    // The refusal is a statement about the window, not about the dock, so it reaches a modal too —
    // and a modal has the least to fall back on of anything routed here. Its promise lives in the
    // overlay, never in `dialogRequests`, so the unload rejection that catches docked dialogs does
    // not reach it; the router lifts the request timeout for `showDialog`; and the window it was
    // shown into is destroyed before anyone can answer it. Nothing would ever settle it.
    const { showModalDialogOverlay } = await import(
      '@renderer/services/overlays/overlay.service-host'
    );
    const { dialogShard, reloading, releaseLayoutGet, emptyTheDockAndBeToldItIsClosing } =
      await windowReloadingWithSavedLayoutHanging();

    await emptyTheDockAndBeToldItIsClosing();

    // Refused with the load still hanging: a modal is not in the dock, so the load has nothing of
    // its to replace and it must not park on one
    await expect(
      dialogShard.showDialog(ALERT_DIALOG_TYPE, { prompt: 'Alert message', isModal: true }),
    ).rejects.toThrow(/closing/);
    expect(showModalDialogOverlay).not.toHaveBeenCalled();

    releaseLayoutGet({ kind: 'empty' });
    await reloading;
  });
});

describe('a dialog arriving while this window has an emptiness report in flight', () => {
  /**
   * Stand a window up that loaded an empty layout — so it reported itself born-empty on the spot —
   * and leave that report hanging, unanswered. That is the gap the main process asks about: the
   * report describes a moment that has already passed by the time it is answered, so before acting
   * on it the main process asks this window whether anything has landed since.
   */
  async function windowWithAnEmptinessReportInFlight() {
    let releaseEmptiedReport: (response: unknown) => void = () => {};
    mocks.networkRequest.mockImplementation(async (requestType: string) => {
      if (requestType === 'windowLayout:get') return { kind: 'empty' };
      if (requestType !== 'windowLayout:emptied') return undefined;
      // Held open, because the flag has to answer at the moment the main process reads it: while
      // the report it is deciding about is still in flight
      return new Promise((resolve) => {
        releaseEmptiedReport = resolve;
      });
    });

    const webViewModule = await import('@renderer/services/web-view.service-shard');
    const { dockLayout, loadedLayouts, dockedTabs } = makeLiveDockLayout();
    webViewModule.registerDockLayout(dockLayout);
    await webViewModule.startWebViewServiceShard();
    await primeProvider();
    await vi.waitFor(() => expect(loadedLayouts.length).toBe(1));
    await vi.waitFor(() =>
      expect(mocks.networkRequest).toHaveBeenCalledWith(
        'windowLayout:emptied',
        expect.anything(),
        'born-empty',
      ),
    );

    const dialogModule = await import('./dialog.service-shard');
    await dialogModule.startDialogServiceShard();

    return {
      dialogShard: findPublishedShard<DialogShard>('showDialog'),
      webViewShard: findPublishedShard<WebViewShard>('hasContentArrivedSinceEmptyReport'),
      dockedTabs,
      releaseEmptiedReport: (response: unknown) => releaseEmptiedReport(response),
    };
  }

  test('counts as content arriving, so the report the main process holds reads as out of date', async () => {
    // The close is not decided yet when a dialog lands in this gap, so the refusal has nothing to
    // say about it — this flag is the only thing standing between the dialog and a window the main
    // process is a moment away from closing. Uncounted, the main process answers `closing`, the
    // dialog goes with the window, and its requestor is handed a shutdown error for a dialog the
    // user was shown for an instant.
    const { dialogShard, webViewShard, dockedTabs, releaseEmptiedReport } =
      await windowWithAnEmptinessReportInFlight();
    await expect(webViewShard.hasContentArrivedSinceEmptyReport()).resolves.toBe(false);

    const showing = dialogShard.showDialog(ALERT_DIALOG_TYPE, { prompt: 'Alert message' });
    // A dialog nobody answers stays open for the rest of the test; marked handled so a rejection
    // from teardown cannot fail the run for the wrong reason
    showing.catch(() => {});
    await vi.waitFor(() =>
      expect(dockedTabs.map((tab) => tab.tabType)).toContain(ALERT_DIALOG_TYPE),
    );

    await expect(webViewShard.hasContentArrivedSinceEmptyReport()).resolves.toBe(true);

    releaseEmptiedReport({ action: 'stay' });
  });
});
