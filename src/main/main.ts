/**
 * This module executes inside of electron's main process. You can start electron renderer process
 * from here and communicate with the other processes through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to `./src/main.js`
 * using webpack. This gives us some performance wins.
 */

import {
  app,
  BrowserWindow,
  ipcMain,
  RenderProcessGoneDetails,
  screen,
  session,
  shell,
} from 'electron';
import os from 'os';
import path from 'path';
// Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
/* import { autoUpdater } from 'electron-updater'; */
import '@main/global-this.model';
import '@node/utils/log-archiver.util';
import { announceAppWindowInput, startAppWindowInputEvent } from '@main/app-window-input.util';
import { subscribeCurrentMacosMenubar } from '@main/platform-macos-menubar.util';
import { getVerseNavigationCommand } from '@main/verse-navigation-shortcuts.util';
import { getPhysicalHistoryNavigationDirection } from '@main/reference-history-keyboard.util';
import chroma from 'chroma-js';
import {
  APP_NAME,
  APP_URI_SCHEME,
  APP_VERSION,
  startAppService,
} from '@main/services/app.service-host';
import { startDialogServiceRouter } from '@main/services/dialog.service-router';
import { startUsersnapServiceRouter } from '@main/services/usersnap.service-router';
import { startBookChapterControlServiceRouter } from '@main/services/book-chapter-control.service-router';
import { startScrollGroupNavigationCommands } from '@main/services/scroll-group-navigation.commands';
import { startDataProtectionService } from '@main/services/data-protection.service-host';
import { dotnetDataProvider } from '@main/services/dotnet-data-provider.service';
import { enhancedResourceProtocolService } from '@main/services/enhanced-resource-protocol.service';
import { extensionAssetProtocolService } from '@main/services/extension-asset-protocol.service';
import { extensionHostService } from '@main/services/extension-host.service';
import { startNetworkObjectStatusService } from '@main/services/network-object-status.service-host';
import { startProjectLookupService } from '@main/services/project-lookup.service-host';
import { performShutdownTasks, performWindowCloseTasks } from '@main/shutdown-tasks';
import { performStartupTasks } from '@main/startup-tasks';
import { startNotificationServiceRouter } from '@main/services/notification.service-router';
import {
  flushPersistedScrollGroupState,
  getScrollGroupStateForNewWindow,
  startScrollGroupServiceHost,
} from '@main/services/scroll-group.service-host';
import {
  flushPersistedThemeState,
  getCurrentThemeForNewWindow,
  getCurrentThemeSync,
  onDidChangeCurrentTheme,
  startThemeServiceHost,
} from '@main/services/theme.service-host';
import {
  getWindowIdsWithServiceShard,
  getWindowServiceShard,
  onDidRegisterWindowServiceShard,
  startWindowServiceRouter,
} from '@main/services/window.service-router';
import {
  isAppQuitRequested,
  isAppShuttingDown,
  markQuitRequested,
  resetShutdownLatchesForNewSession,
  runShutdownTasksOnce,
} from '@main/services/shutdown-latch.service';
import {
  getWebViewShard,
  setWebViewWindowCreator,
  startWebViewServiceRouter,
} from '@main/services/web-view.service-router';
import {
  addWindow,
  announceRoutingTargetChange,
  countWindowsThatCouldBeTheLastOne,
  doesNavigationReplaceRendererRegistrations,
  focusWindow,
  getFocusedWindowId,
  getTargetWindowId,
  getWindows,
  handleWindowBlurred,
  isWindowAbandoned,
  isWindowClosing as isWindowMarkedClosing,
  isWindowTracked,
  isWindowReady,
  markWindowAbandoned,
  markWindowClosing,
  markWindowNotReady,
  markWindowReady,
  removeWindow,
  setFocusedWindowId,
  setWindowPendingContentPredicate,
} from '@main/services/window-state.service';
import {
  assignEntryToWindow,
  getMainWindowId,
  handleWindowRemoved,
  initializeWindowLayoutPersistence,
  isWindowPendingContent,
  loadWindowLayouts,
  markWindowPendingContent,
  setMainWindowId,
  setPendingContentChangeListener,
  trackLegacyWindow,
  trackNewWindow,
  updateWindowBounds,
  writeNow,
} from '@main/services/window-layout-persistence.service';
import { createWindowEmptinessHandler } from '@main/services/window-emptiness.util';
import { summarizeWindows } from '@main/window-summary.util';
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  ensureBoundsVisibleOnSomeDisplay,
} from '@main/window-bounds.util';
import {
  decideRendererCrashReload,
  MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS,
  NO_RENDERER_CRASH_RELOADS_YET,
} from '@main/renderer-crash-reload-budget.util';
import {
  WINDOW_EMPTIED_REQUEST_TYPE,
  type WindowBoundsState,
  type WindowLayoutEntry,
} from '@shared/data/window-layout-persistence.model';
import { HANDLE_URI_REQUEST_TYPE } from '@node/services/extension.service-model';
import {
  CommandLineArgs,
  getCommandLineArgument,
  getCommandLineSwitch,
} from '@node/utils/command-line.util';
import { resolveHtmlPath } from '@node/utils/util';
import {
  DEFAULT_ZOOM_FACTOR,
  DEV_MODE_QUERY_PARAMETER,
  LOG_LEVEL_QUERY_PARAMETER,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
  SCROLL_GROUP_STATE_QUERY_PARAMETER,
  STARTUP_MARK_PROCESS_START,
  STARTUP_MARKS_QUERY_PARAMETER,
  THEME_STATE_QUERY_PARAMETER,
  WINDOW_ID,
} from '@shared/data/platform.data';
import { GET_METHODS } from '@shared/data/rpc.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { readFile } from 'fs/promises';
import { networkObjectService } from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import { get } from '@shared/services/project-data-provider.service';
import { settingsService } from '@shared/services/settings.service';
import { initialize as initializeSharedStoreService } from '@shared/services/shared-store.service';
import { markStartup, markStartupOnce } from '@shared/utils/startup-timing.util';
import { SerializedRequestType } from '@shared/utils/util';
import { CommandNames, SettingTypes } from 'papi-shared-types';
import {
  getErrorMessage,
  isPlatformError,
  serialize,
  ThemeDefinitionExpanded,
  UnsubscriberAsyncList,
  wait,
  waitForDuration,
} from 'platform-bible-utils';

// #region Helper functions

/**
 * Get the zoom factor from settings or return the default value
 *
 * @returns The stored zoom factor or the default value
 */
const getZoomFactor = async (): Promise<number> => {
  try {
    return await settingsService.get('platform.zoomFactor');
  } catch (e) {
    logger.warn(`Failed to get zoom factor from settings: ${getErrorMessage(e)}`);
    return DEFAULT_ZOOM_FACTOR;
  }
};

/**
 * Save the zoom factor to settings
 *
 * @param factor The zoom factor to save
 */
const setZoomFactor = async (factor: number): Promise<void> => {
  try {
    await settingsService.set('platform.zoomFactor', factor);
  } catch (e) {
    logger.warn(`Failed to save zoom factor to settings: ${getErrorMessage(e)}`);
  }
};

/** Reset the zoom factor of the app to 1.0 (100%) */
const resetZoomFactor = async () => {
  try {
    return await settingsService.reset('platform.zoomFactor');
  } catch (e) {
    logger.warn(`Failed to reset zoom factor from settings: ${getErrorMessage(e)}`);
    return DEFAULT_ZOOM_FACTOR;
  }
};

/** Increase the zoom factor of all application windows by 0.1, up to a maximum of 3.0 */
const zoomIn = async () => {
  const currentZoom = await getZoomFactor();
  if (currentZoom < MAX_ZOOM_FACTOR) {
    const newZoom = currentZoom + 0.1;
    await setZoomFactor(newZoom);
  }
};

/** Decrease the zoom factor of all application windows by 0.1, down to a minimum of 0.5 */
const zoomOut = async () => {
  const currentZoom = await getZoomFactor();
  if (currentZoom > MIN_ZOOM_FACTOR) {
    const newZoom = currentZoom - 0.1;
    await setZoomFactor(newZoom);
  }
};

// #endregion

// #region Prevent multiple instances of the app. This needs to stay at the top of the app!

// Prevent multiple instances because an instance launched after the first is likely a URL redirect
// to our protocol client. We handle URI redirects below in `second-instance`

/** Whether this is the first instance of this application. */
const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  logger.info(
    `Application launched but not first instance. Exiting. This probably means the application just handled a URL. process.argv: ${process.argv}`,
  );
  app.exit();
}

// #endregion

const PROCESS_CLOSE_TIME_OUT_MS = 2000;

/**
 * How long a window gets to finish closing on its own before it is destroyed outright.
 *
 * Generous next to the page teardown it is waiting for — pruning this window's stored web view
 * state — because the only cost of waiting is a window that is already on its way out staying on
 * screen a moment longer.
 */
const WINDOW_CLOSE_TIME_OUT_MS = 10000;

/** How long to coalesce a window's resize/move events before capturing its bounds */
const BOUNDS_CAPTURE_DEBOUNCE_MS = 100;

/**
 * How a window being created relates to the persisted window-layouts structure: it restores a saved
 * entry, it is the single window of a legacy startup (no structure — its renderer falls back to the
 * pre-multi-window saved layout, placed at the previous bounds keeper's state), or — when omitted —
 * it is a new mid-session window that starts empty.
 */
type WindowRestoreInfo =
  | { kind: 'entry'; entryIndex: number; entry: WindowLayoutEntry }
  | { kind: 'legacy'; boundsState?: WindowBoundsState };

/** Height of the custom title bar buttons on Windows */
const TITLE_BAR_BUTTON_HEIGHT = 47;
/** Background color of the window buttons in the custom title bar on Windows */
const TITLE_BAR_BUTTON_BACKGROUND_COLOR = 'hsla(0, 0%, 100%, 0)'; // transparent button background until hovered

/**
 * If this is `true`, we will restart soon. Not just using `isAppQuitting` because we need to make
 * sure we only run `relaunch` once which has a slightly different use case than `isAppQuitting`
 */
let willRestart = false;

// Add unhandled exception and rejection handlers
process.on('uncaughtException', (error) => {
  logger.error(`Unhandled exception in main process: ${getErrorMessage(error)}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled promise rejection in main process, reason: ${getErrorMessage(reason)}`);
});

/**
 * Open a link in the browser following the restrictions we put in place in Platform.Bible
 *
 * Make sure not to allow just any link. See
 * https://benjamin-altpeter.de/shell-openexternal-dangers/
 */
async function openExternal(url: string) {
  if (
    !url.startsWith('https://') &&
    !url.startsWith('mailto:') &&
    !url.startsWith(`${APP_URI_SCHEME}://`)
  )
    throw new Error(
      `External URL must start with 'https://', 'mailto:' or '${APP_URI_SCHEME}://: ${url}`,
    );
  try {
    await shell.openExternal(url);
  } catch (e) {
    logger.warn(getErrorMessage(e));
    throw e;
  }

  return true;
}

async function main() {
  // This is the run boundary the startup-waterfall parser keys on (main + process-start).
  markStartup(STARTUP_MARK_PROCESS_START);

  // The network service has to start first, and it uses the shared store after initialization
  await networkService.initialize();
  markStartup('network-service-up');
  await initializeSharedStoreService(networkService);

  // Register the app-window input event so the window's mouse/keyboard hooks below can announce
  // the gestures that dismiss transient overlays
  await startAppWindowInputEvent();

  // The network object status service relies on seeing everything else start up later
  await startNetworkObjectStatusService();

  // The project lookup service relies on the network object status service
  await startProjectLookupService();

  // Claim every app-global network name before any window is created, so a renderer never has to
  // race for one. The service routers claim generic names (e.g. "WebViewService",
  // "platform.openSettings") that renderers answer for behind window-scoped shards; the scroll group
  // and theme service hosts claim names they answer for themselves, since a scroll group and the
  // theme are app-global rather than per window.
  // Started together rather than one after another: each claims its own set of names and none reads
  // anything another one registers, so serializing them only adds their round trips together on the
  // startup path every window is waiting behind.
  // Settled rather than raced to the first rejection: they run together, so `Promise.all` would
  // report whichever failed first and discard what the others went on to say. Startup still stops
  // here — a name that never registered is one nothing answers for the rest of the session — it just
  // stops naming everything that went wrong instead of one thing.
  const globalServiceStarts = [
    { name: 'WebView service router', started: startWebViewServiceRouter() },
    { name: 'dialog service router', started: startDialogServiceRouter() },
    { name: 'Usersnap service router', started: startUsersnapServiceRouter() },
    {
      name: 'BookChapterControl service router',
      started: startBookChapterControlServiceRouter(),
    },
    { name: 'scripture navigation commands', started: startScrollGroupNavigationCommands() },
    { name: 'notification service router', started: startNotificationServiceRouter() },
    { name: 'window service router', started: startWindowServiceRouter() },
    { name: 'scroll group service host', started: startScrollGroupServiceHost() },
    { name: 'theme service host', started: startThemeServiceHost() },
  ];
  const globalServiceOutcomes = await Promise.allSettled(
    globalServiceStarts.map(({ started }) => started),
  );
  const failedGlobalServiceNames = globalServiceOutcomes
    .map((outcome, index) => {
      if (outcome.status === 'fulfilled') return undefined;
      const { name } = globalServiceStarts[index];
      logger.error(`Failed to start the ${name}: ${getErrorMessage(outcome.reason)}`);
      return name;
    })
    .filter((name) => name !== undefined);
  if (failedGlobalServiceNames.length > 0)
    throw new Error(
      `Could not start the app-global services in main: ${failedGlobalServiceNames.join(', ')}. Each failure is logged above.`,
    );

  // Window layout persistence must register its request handlers before any window exists so a
  // renderer's layout load can never race the registration
  await initializeWindowLayoutPersistence();

  // The routing target passes over a window that is still waiting for its routed content the same
  // way it passes over one whose close has begun: the window takes OS focus the moment it is
  // shown, and anything focus-routed into it before its content arrives is destroyed if the
  // operation that created it fails and closes it. Injected because the pending-content mark lives
  // with window-layout persistence, which the window-state tracker does not import.
  setWindowPendingContentPredicate(isWindowPendingContent);
  // The other half of that injection: the tracker reads the mark but has nothing to tell it the
  // mark changed, so a window gaining or losing one moves the routing target with no event —
  // leaving the routers that hold a resolved shard pointed at the window routing just left.
  setPendingContentChangeListener(announceRoutingTargetChange);

  // Same reasoning as above: a window can report itself empty as soon as it exists, so the handler
  // that decides what happens next must already be registered
  const handleWindowEmptied = createWindowEmptinessHandler({
    // Which windows may stand in as another window's reason to close is the window-state tracker's
    // rule, whole — see `countWindowsThatCouldBeTheLastOne` for what it leaves out and why
    countWindows: countWindowsThatCouldBeTheLastOne,
    closeWindow: (windowId) => BrowserWindow.fromId(windowId)?.close(),
    // A report names its own subject and arrives over the network, so the id is the caller's word.
    // The tracker is what knows whether that word describes a window this process has.
    isWindowTracked,
    markWindowClosing,
    // The shared registry, not only this handler's own decisions: a window the user is closing can
    // report empty mid-teardown, and it must get the same "closing" answer instead of a second close
    isWindowClosing: isWindowMarkedClosing,
    // The reporting window's own reading, asked only when a close is otherwise about to be decided
    hasContentArrivedSinceEmptyReport: async (windowId) => {
      // A window that is not serving requests cannot be asked, and waiting on one that will never
      // answer would hold up every window's decision behind it. `false` is what the handler reads
      // as "could not tell", which closes the window — the report was its own word about its own
      // dock.
      if (!isWindowReady(windowId)) return false;
      const shard = await getWebViewShard(windowId);
      if (!shard) return false;
      return shard.hasContentArrivedSinceEmptyReport();
    },
  });
  await networkService.registerRequestHandler(
    WINDOW_EMPTIED_REQUEST_TYPE,
    async (...args) => handleWindowEmptied(args[0], args[1]),
    {
      method: {
        'x-experimental': true,
        summary: "Report a window's dock empty and learn whether it closes or docks Home",
        params: [
          {
            name: 'windowId',
            required: true,
            summary: 'Electron BrowserWindow ID of the window reporting itself empty',
            schema: { type: 'number' },
          },
          {
            name: 'reason',
            required: true,
            summary: 'Why the window is empty',
            schema: { type: 'string', enum: ['emptied-by-removal', 'born-empty'] },
          },
        ],
        result: {
          name: 'return value',
          summary:
            'Whether the window should dock Home, that it is being closed, or that it should stay as it is because content reached it after it reported',
          schema: { type: 'object' },
        },
      },
    },
  );

  // A window is tracked and takes OS focus the moment it is shown, but it cannot serve a routed
  // call until its renderer has registered. Its window service shard appearing is that signal, and
  // routing waits for it rather than following focus alone — see `getTargetWindowId`.
  onDidRegisterWindowServiceShard((readyWindowId) => markWindowReady(readyWindowId));
  // The index has been listening since its module was evaluated, which is well before this line,
  // and the announcement it heard is never repeated. Reconciling here is what makes the two
  // orderings equivalent, so a window that registered in the meantime is not left unroutable for
  // the rest of the session.
  getWindowIdsWithServiceShard().forEach((readyWindowId) => markWindowReady(readyWindowId));

  // The .NET data provider relies on the network service and nothing else
  dotnetDataProvider.start();

  // TODO (maybe): Wait for signal from the .NET data provider process that it is ready

  // Need to start the data protection service before starting the extension host because extensions
  // use it
  await startDataProtectionService();

  // Need to start the app service before starting the extension host because extensions use it
  await startAppService();

  // The extension host service relies on the network service.
  // Extensions inside the extension host might rely on the .NET data provider and each other
  // Some extensions inside the extension host rely on the renderer to accept 'getWebView' commands.
  // The renderer relies on the extension host, so something has to break the dependency loop.
  // For now, the dependency loop is broken by retrying 'getWebView' in a loop for a while.
  await extensionHostService.start(PROCESS_CLOSE_TIME_OUT_MS);
  markStartup('extension-host-forked');

  // TODO (maybe): Wait for signal from the extension host process that it is ready (except 'getWebView')
  // We could then wait for the renderer to be ready and signal the extension host

  // Signals for the fire-and-forget startup tasks: an abort controller so the Power-mode boot-race
  // retry loop stops the moment the app begins quitting (wired below), and a window-interactive
  // clock so a startup sync that only registers late isn't fired onto an editor the user is already
  // using (see performStartupTasks / STARTUP_SYNC_FRESHNESS_WINDOW_MS).
  const startupTasksAbort = new AbortController();
  let mainWindowInteractiveAt: number | undefined;

  /**
   * Whether this process has already created a window. Latched for the life of the process, not per
   * session: the command-line and environment flags that describe how to show a window belong to
   * the launch that set them, and nothing that happens afterwards is that launch again.
   */
  let hasCreatedWindowThisProcess = false;

  // Fire-and-forget startup tasks (initial S/R). Must not block window creation. In Simple mode the
  // S/R command is served by the .NET data provider and is driven through the retrying
  // `commandService.sendCommand`. In Power mode the trigger is `runScheduledSessionSync`, which the
  // send-receive extension registers in the extension host (not the .NET data provider) and which
  // performStartupTasks drives via `requestNoRetry` inside its own bounded 120 s boot-race loop —
  // deliberately NOT sendCommand's retry semantics. Either way failures are swallowed internally.
  // Wrapped in an async IIFE per code-style preference for try/catch over `.catch()` chains.
  (async () => {
    try {
      await performStartupTasks({
        abortSignal: startupTasksAbort.signal,
        getWindowInteractiveElapsedMs: () =>
          mainWindowInteractiveAt === undefined
            ? undefined
            : performance.now() - mainWindowInteractiveAt,
      });
    } catch (e) {
      logger.warn(`performStartupTasks threw unexpectedly: ${getErrorMessage(e)}`);
    }
  })();

  // `before-quit` fires ahead of every window's `close`, so recording it here is what lets a
  // window's close handler tell a whole-app quit from a single window closing. Both this and the
  // shared shutdown-task run live in `shutdown-latch.service` because they are per session rather
  // than per process — see `resetShutdownLatchesForNewSession`, called from `createWindow`.
  //
  // Distinct from the `isAppQuitting` guard on `will-quit` further below, which tracks whether that
  // handler's graceful shutdown has already started.
  app.on('before-quit', () => {
    markQuitRequested();
  });

  // #region Set up the protocol client to receive navigation to this app's URI scheme

  // Launch the portable app if we're in it; otherwise use the normal path
  const launchPath = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const args = process.argv.slice(1);

  function handleUri(uri: string) {
    // A deep link normally arrives while the app is in the background — that is the point of one —
    // so no window has OS focus and the fallback below is the ordinary path, not the edge case. It
    // asks where routed calls go, which is the window the user was last working in; the oldest
    // tracked window would be an arbitrary choice that also repoints routing there by focusing it.
    const windowIdToRaise = BrowserWindow.getFocusedWindow()?.id ?? getTargetWindowId();
    // Deliberately NOT gated on `isApplicationFocused()` the way the in-app raises are. That gate
    // exists to stop us pulling the app in front of whatever the user is working in; this path
    // runs precisely when the app does not own the foreground, so the gate would suppress every
    // raise it exists to perform — the user asked for this window by following the link. Raising
    // through the service rather than the `BrowserWindow` directly is what earns the rest: it is a
    // no-op instead of a throw on a window that has closed, so a raise can never drop the URI
    // before it is dispatched below, and an activation the OS refuses leaves the taskbar flashing,
    // which on this path is the whole signal the user gets that the link landed.
    if (windowIdToRaise !== undefined) focusWindow(windowIdToRaise);
    logger.debug(`Main is handling uri ${uri}`);
    // need to use `new URL` instead of `URL.parse` because Node<22.1.0 doesn't have it. Can change
    // when we get there
    let url: URL;
    try {
      url = new URL(uri);
    } catch (e) {
      logger.debug(
        `Main received uri ${uri} but could not parse it. If this does not look like a uri, that probably means the user tried to open the application again. This is likely not a problem. ${e}`,
      );
      return;
    }
    if (url.protocol !== `${APP_URI_SCHEME}:`) {
      logger.warn(`Main received uri ${uri} but protocol does not match ${APP_URI_SCHEME}`);
      return;
    }

    (async () => {
      try {
        await networkService.request(HANDLE_URI_REQUEST_TYPE, uri);
      } catch (e) {
        logger.warn(
          `Main sent request for extension service to handle uri ${uri}, but it threw. ${e}`,
        );
      }
    })();
  }
  // Resolve the path to this file if we're running the electron app itself and passing in this file
  // Note that this condition (`process.defaultApp`) is not quite the same as whether we're
  // packaged, so we're not using `globalThis.isPackaged` here.
  if (process.defaultApp && args.length > 2) args[2] = path.resolve(args[2]);
  const uriSchemeHandlerWasSet = app.setAsDefaultProtocolClient(APP_URI_SCHEME, launchPath, args);
  if (!uriSchemeHandlerWasSet) {
    logger.error(
      `Failed to set myself (${launchPath} with arguments ${args}) as handler for ${APP_URI_SCHEME}://... URIs, reason unknown`,
    );
  }
  if (process.platform === 'darwin') {
    // Use OSX's event to handle navigation
    app.on('open-url', (_event, url) => handleUri(url));
  } else {
    // Non-OSX attempts to launch a second instance to handle navigation; detect and handle
    // accordingly
    app.on('second-instance', (_event, commandLine) => {
      // Handle the URL
      const uri = commandLine[commandLine.length - 1];
      handleUri(uri);
    });
  }

  // #endregion

  // #region Start the renderer

  // Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
  /* class AppUpdater {
  constructor() {
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();
  }
} */

  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = await import('source-map-support');
    sourceMapSupport.install();
  }

  const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

  if (isDebug) {
    const electronDebug = await import('electron-debug');
    electronDebug.default();
  }

  /** Install extensions into the Chromium renderer process */
  async function installExtensions() {
    const installer = await import('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    // Not installing React dev tools since they don't work (as of Aug 2025) and may leak memory
    return installer.default([], forceDownload).catch(logger.info);
  }

  function getAssetPath(...paths: string[]): string {
    return path.join(globalThis.resourcesPath, 'assets', ...paths);
  }

  /** Sets up the electron BrowserWindow renderer process */
  const createWindow = async (
    restoreInfo?: WindowRestoreInfo,
    creationOptions?: { pendingContent?: boolean },
  ): Promise<BrowserWindow> => {
    // The menu and the `platform.createWindow` command stay live through a quit, because every
    // window sits in `preventDefault()` waiting on the shared shutdown run for as long as that run
    // takes. Opening a window in that gap would start a session the app is in no position to serve:
    // the latch reset below would clear the shared run mid-flight, so a window closing afterwards
    // would start a second one and the windows still waiting would stop waiting for anything.
    // Thrown rather than returned quietly: `platform.createWindow` and the menu item both await
    // this, and resolving with nothing would report a window that does not exist as created.
    // Asked of both routes the app takes down, not just a quit: closing the last window with the X
    // button never sets the quit flag, and that gap is precisely as long as the shared run this
    // guard exists to protect.
    if (isAppShuttingDown())
      throw new Error('Cannot create a window while the application is quitting');

    // A window is being created, so the app is alive and whatever brought the last one down is
    // finished. On macOS that is not the same as process start: closing the final window runs the
    // shutdown tasks and leaves the app resident, and reactivating from the dock lands here — so
    // without this the second and every later session would come down without syncing.
    resetShutdownLatchesForNewSession();

    const isFirstWindow = getWindows().length === 0;

    // The flags the process was launched with describe how to show the window that launch is
    // producing, and nothing after it. "No windows tracked" is not that window: on macOS the app
    // stays resident after its last window closes, so a dock click — a window the USER asked for —
    // arrives with nothing tracked and would be minimized or maximized by a flag from a launch that
    // is long over.
    const isFirstWindowOfProcess = !hasCreatedWindowThisProcess;
    hasCreatedWindowThisProcess = true;

    // This window's saved placement — its entry's, or the previous single-window keeper's for a
    // legacy startup — validated against the displays connected right now so a window can never
    // come back on a monitor that is gone. A window with no saved placement gets defaults.
    const savedBoundsState =
      restoreInfo?.kind === 'entry' ? restoreInfo.entry : restoreInfo?.boundsState;
    const boundsState = savedBoundsState
      ? ensureBoundsVisibleOnSomeDisplay(
          savedBoundsState,
          screen.getAllDisplays(),
          screen.getPrimaryDisplay(),
        )
      : undefined;

    // If --window-size (or --windowSize) is specified, use those dimensions instead of the saved
    // window state. Useful for automation/headless runs on Windows where xvfb is unavailable.
    const windowSizeArg = getCommandLineArgument(CommandLineArgs.WindowSize);
    let windowWidth = boundsState?.bounds?.width ?? DEFAULT_WINDOW_WIDTH;
    let windowHeight = boundsState?.bounds?.height ?? DEFAULT_WINDOW_HEIGHT;
    let sizeMatch: RegExpExecArray | undefined;
    if (windowSizeArg) {
      sizeMatch = /^([1-9]\d*)[x,]([1-9]\d*)$/i.exec(windowSizeArg) ?? undefined;
      if (sizeMatch) {
        windowWidth = Number.parseInt(sizeMatch[1], 10);
        windowHeight = Number.parseInt(sizeMatch[2], 10);
      } else {
        logger.warn(
          `Invalid --window-size value "${windowSizeArg}". Expected format: WIDTHxHEIGHT (e.g. 1920x1080)`,
        );
      }
    }

    const newWindow = new BrowserWindow({
      show: true,
      ...(boundsState?.bounds ? { x: boundsState.bounds.x, y: boundsState.bounds.y } : {}),
      width: windowWidth,
      height: windowHeight,
      // Floor set by UX (2026-08-18): 2025 analytics show 99.83% of 11,587 users on a screen 900px
      // or wider, so nothing narrower has to be supported. It buys Simple mode three ~300px columns
      // that fit without a horizontal scrollbar — SIMPLE_COLUMN_MIN_WIDTH_PX in
      // simple-layout.data.ts is derived from this number. That file cannot import this one (main.ts
      // pulls in Electron), so simple-layout.data.test.ts mirrors the 900 as a local constant:
      // lowering the number here will NOT fail that test by itself. Change both together.
      // TODO: Remove this temporary enforcement when https://paratextstudio.atlassian.net/browse/PT-2333 is implemented
      minWidth: 900,
      icon: getAssetPath('icon.png'),
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      ...(process.platform !== 'linux' ? { titleBarStyle: 'hidden' } : {}),
      // re-add window controls
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      ...(process.platform !== 'darwin' && process.platform !== 'linux'
        ? {
            titleBarOverlay: {
              height: TITLE_BAR_BUTTON_HEIGHT,
              color: TITLE_BAR_BUTTON_BACKGROUND_COLOR,
            },
          }
        : {}),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(globalThis.resourcesPath, '.erb/dll/preload.js'),
      },
    });
    // createWindow re-runs mid-session on macOS (app.on('activate') after the window was closed),
    // so once-guard this so a second window-created mark can't land in the latest run and inflate
    // the waterfall's Total span.
    markStartupOnce('window-created');

    // Capture the window ID before it can be destroyed (used in the `closed` handler)
    const windowId = newWindow.id;

    // Track this window immediately
    addWindow(newWindow);

    // Tie the window to its persisted identity so layout persistence can serve and save it
    if (restoreInfo?.kind === 'entry') assignEntryToWindow(windowId, restoreInfo.entryIndex);
    else if (restoreInfo?.kind === 'legacy') trackLegacyWindow(windowId);
    else trackNewWindow(windowId);

    if (creationOptions?.pendingContent) markWindowPendingContent(windowId);

    // Track which window is focused for multi-window command routing
    newWindow.on('focus', () => {
      setFocusedWindowId(windowId);
    });
    // The other half of focus tracking: a blur with no focus following it is the whole application
    // going to the background, which is what isApplicationFocused answers from
    newWindow.on('blur', () => {
      handleWindowBlurred(windowId);
    });

    // Set our custom protocol handler to load assets from extensions
    extensionAssetProtocolService.initialize();

    // Set our custom protocol handler to load Enhanced Resources binary assets (papi-er://)
    enhancedResourceProtocolService.initialize();

    // Restore the saved maximized/full-screen state — unless a valid --window-size was given,
    // which takes precedence and means "exactly this size, in the normal state"
    if (!(windowSizeArg && sizeMatch)) {
      if (boundsState?.isFullScreen) newWindow.setFullScreen(true);
      else if (boundsState?.isMaximized) newWindow.maximize();
    }

    /**
     * This window's current placement for persistence. Mirrors the previous window-state keeper:
     * the normal bounds (and the display they are on) are captured only while the window is in its
     * normal state, so maximizing/minimizing/full-screening cannot overwrite the last normal
     * placement — only flip the flags.
     */
    const captureWindowBoundsState = (): WindowBoundsState => {
      const isMaximized = newWindow.isMaximized();
      const isFullScreen = newWindow.isFullScreen();
      const capturedState: WindowBoundsState = { isMaximized, isFullScreen };
      if (!isMaximized && !isFullScreen && !newWindow.isMinimized()) {
        const { x, y, width, height } = newWindow.getBounds();
        capturedState.bounds = { x, y, width, height };
        capturedState.displayBounds = { ...screen.getDisplayMatching(capturedState.bounds).bounds };
      }
      return capturedState;
    };

    // Feed this window's placement to layout persistence as it changes, debounced since
    // resize/move fire continuously during a drag
    let boundsCaptureTimeout: ReturnType<typeof setTimeout> | undefined;
    const cancelPendingBoundsCapture = () => {
      if (boundsCaptureTimeout) {
        clearTimeout(boundsCaptureTimeout);
        boundsCaptureTimeout = undefined;
      }
    };
    const captureBoundsSoon = () => {
      cancelPendingBoundsCapture();
      boundsCaptureTimeout = setTimeout(() => {
        boundsCaptureTimeout = undefined;
        if (newWindow.isDestroyed()) return;
        updateWindowBounds(windowId, captureWindowBoundsState());
      }, BOUNDS_CAPTURE_DEBOUNCE_MS);
    };
    newWindow.on('resize', captureBoundsSoon);
    newWindow.on('move', captureBoundsSoon);

    // Add several listeners to the window to log events
    newWindow.webContents.on('unresponsive', () => logger.warn(`Window ${windowId} unresponsive`));
    newWindow.webContents.on('responsive', () => logger.warn(`Window ${windowId} responsive`));
    // What this window has spent of its crash-reload budget. Per window, because a crash loop is
    // one window's page failing rather than the app's.
    let crashReloadBudget = NO_RENDERER_CRASH_RELOADS_YET;
    newWindow.webContents.on('render-process-gone', (_, details: RenderProcessGoneDetails) => {
      logger.warn(`Window ${windowId} render process gone: ${JSON.stringify(details)}`);
      // Everything this window registered died with its renderer, so routing has to move to a window
      // that can answer rather than spending the network service's registration retry on handlers
      // that no longer exist.
      markWindowNotReady(windowId);

      // Nothing else brings a dead renderer back: Electron leaves the window there with no page in
      // it, and the `onDidRegisterWindowServiceShard` subscription that would mark this window ready
      // again only ever hears from a page that is running. Without the reload below the window stays
      // out of the routable set for the rest of the session — a window still on screen, still
      // holding its tabs' worth of the user's work, that every fan-out reports as unreachable and
      // every routed call refuses to go to.
      //
      // A clean exit is the renderer going away on purpose, which is what a window being taken down
      // looks like from here, so it gets no reload — and neither does a window whose close has
      // already begun, which is on its way out with its shutdown work in flight.
      if (
        details.reason === 'clean-exit' ||
        newWindow.isDestroyed() ||
        isWindowMarkedClosing(windowId) ||
        isAppShuttingDown()
      )
        return;

      // A renderer that came back and ran for a while recovered, so its next crash starts the budget
      // over; one that dies again straight away is looping, and stops after the cap.
      const reloadDecision = decideRendererCrashReload(crashReloadBudget, Date.now());
      if (!reloadDecision.shouldReload) {
        logger.error(
          `Window ${windowId} renderer died ${reloadDecision.reloadsAlreadySpent} times in a row despite being reloaded each time, so it is being left down. Close the window and open a new one.`,
        );
        // The reload was the only thing that would ever have put this window back in the app, so
        // the window has to stop being treated as one that is coming back. `markWindowNotReady`
        // above leaves it looking like a window that is mid-recovery, and every fan-out in the app
        // refuses to answer while one of those exists — for a window that is never recovering, that
        // is the rest of the session.
        //
        // Marked whatever the window had managed to do before it died. A renderer that never got as
        // far as registering leaves nothing behind for the fan-outs to refuse over, but it is the
        // same window in the same state, and one flag recorded on both paths is what keeps this
        // from needing a second mechanism for the case that is harder to see.
        //
        // The window is deliberately left open and tracked. It is still on screen with the user's
        // tabs' worth of layout behind it, and closing it here would rewrite the persisted window
        // layout without it — taking away the one recovery they have left, which is to quit and
        // relaunch.
        markWindowAbandoned(windowId);
        return;
      }
      crashReloadBudget = reloadDecision.budget;
      logger.warn(
        `Reloading window ${windowId} after its renderer died (attempt ${reloadDecision.attempt} of ${MAX_CONSECUTIVE_RENDERER_CRASH_RELOADS}); it becomes routable again when its window service shard reappears`,
      );
      newWindow.webContents.reload();
    });
    // A reload replaces the page and everything it registered, the same as a crash does. This also
    // fires for the very first load, before the window was ever ready, which changes nothing.
    //
    // Deliberately NOT `did-start-loading`: that is a whole-tab signal with no frame information,
    // and every web view in the app is an in-page iframe in this page, so it fires again every time
    // the user opens a tab — which would strip a fully working window of its readiness with nothing
    // to restore it. See `doesNavigationReplaceRendererRegistrations` for which navigations count.
    newWindow.webContents.on('did-start-navigation', (details) => {
      if (doesNavigationReplaceRendererRegistrations(details)) markWindowNotReady(windowId);
    });
    newWindow.webContents.on(
      // @ts-expect-error - TS seems confused, as this matches the d.ts file and the docs
      'did-fail-load',
      (
        _event: Event,
        errorCode: number,
        errorDescription: string,
        validatedURL: string,
        isMainFrame: boolean,
      ) => {
        logger.warn(
          `Window ${windowId} failed to load "${validatedURL}" with error "${errorDescription}" (${errorCode}). isMainFrame: ${isMainFrame}`,
        );
      },
    );

    /** Helper to call setFocus on this specific window's service data provider */
    const setWindowFocus = async (
      specifier: import('@shared/services/window.service-model').SetFocusSpecifier,
    ) => {
      const windowService = await getWindowServiceShard(windowId);
      if (windowService) await windowService.setFocus(specifier);
      else logger.debug(`Window service for window ${windowId} not available yet`);
    };

    newWindow.webContents.on('before-input-event', async (_, event) => {
      // Key up seems not to change focus in Windows, so we will only change on keyDown
      if (event.type !== 'keyDown') return;

      // Announce Escape so overlays rendered in the parent document dismiss no matter which frame
      // has focus. Deliberately no preventDefault — the focused frame still gets the key and may
      // act on it too (e.g. the scripture editor closes its marker palette), and dismissing an
      // already-dismissed overlay is a no-op.
      announceAppWindowInput(event);

      // Announce a possible focus change
      try {
        await setWindowFocus('detect');
      } catch (e) {
        logger.warn(
          `Failed to instruct window service to detect focus on ${event.type} ${event.key}: ${getErrorMessage(e)}`,
        );
      }
    });

    newWindow.webContents.on('before-mouse-event', async (_, event) => {
      // Mouse up and other events seem not to change focus in Windows, so we will only change on mouseDown
      if (event.type !== 'mouseDown') return;

      // Announce the click so overlays rendered in the parent document dismiss even when it lands
      // inside a WebView iframe, whose events never reach the parent document
      announceAppWindowInput(event);

      // Announce a possible focus change
      try {
        await setWindowFocus('detect');
      } catch (e) {
        logger.warn(
          `Failed to instruct window service to detect focus on ${event.type} ${event.button}: ${getErrorMessage(e)}`,
        );
      }
    });

    /**
     * Unsubscribers to run when the window closes. The app doesn't shut down when the window closes
     * on Mac, so we need to unsubscribe some things
     */
    const windowCloseUnsubscribers = new UnsubscriberAsyncList('Window close unsubscribers');

    newWindow.on('ready-to-show', async () => {
      logger.info(`Window ${windowId} is ready to show`);
      // Anchor the startup-sync freshness clock to when the first window becomes interactive (see
      // the startup-tasks signals above): a late-registering startup sync is only fired if the user
      // hasn't yet had the window long enough to be editing. Windows the user opens later are not
      // part of startup, so they must not move this clock.
      if (isFirstWindow) {
        mainWindowInteractiveAt ??= performance.now();
      }
      // Startup flags only apply to the first window, not windows opened later by the user
      if (isFirstWindowOfProcess && process.env.START_MINIMIZED) {
        logger.info(`Window ${windowId} is starting minimized due to START_MINIMIZED env variable`);
        newWindow.minimize();
      } else {
        newWindow.show();
        // Once-guarded like window-created above: ready-to-show fires again for a re-created window.
        markStartupOnce('window-shown');
        if (isFirstWindowOfProcess && getCommandLineSwitch(CommandLineArgs.Maximize)) {
          logger.info(
            `Window ${windowId} is starting maximized due to --maximize command-line switch`,
          );
          newWindow.maximize();
        }
      }

      // Adjust the Window button colors based on the current theme
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      if (process.platform !== 'darwin' && process.platform !== 'linux') {
        const paintTitleBarForTheme = (newTheme: ThemeDefinitionExpanded) => {
          if (!newTheme.cssVariables.primary) {
            logger.warn(
              `Failed to set title bar window button colors: New theme primary color is falsy!`,
            );
            return;
          }

          // Convert oklch color to hex format for Electron compatibility
          let symbolColorHex: string;
          try {
            symbolColorHex = chroma(newTheme.cssVariables.primary).hex();
          } catch (e) {
            logger.warn(
              `Failed to set title bar window button colors: Could not convert primary color '${newTheme.cssVariables.primary}' to hex: ${getErrorMessage(e)}`,
            );
            return;
          }

          // A destroyed window has no title bar left to color. The unsubscribe that runs when
          // this window closes normally gets here first, but a theme change in flight at that
          // moment can still arrive afterwards — and painting it would otherwise be reported as
          // a color conversion problem, which is the one thing it is not.
          if (newWindow.isDestroyed()) return;

          try {
            newWindow.setTitleBarOverlay({
              color: TITLE_BAR_BUTTON_BACKGROUND_COLOR,
              symbolColor: symbolColorHex,
              height: TITLE_BAR_BUTTON_HEIGHT,
            });
          } catch (e) {
            logger.warn(
              `Failed to set title bar window button colors on window ${windowId}: ${getErrorMessage(e)}`,
            );
          }
        };

        // Read and subscribed locally, not through the theme data provider: the provider is
        // registered by this very process, so going through it would put a JSON-RPC round trip
        // between the theme changing and the object in the next module that already knows.
        //
        // Guarded because this runs inside an `async` handler, where a throw is an unhandled
        // rejection at window creation rather than a caught error. Colouring caption buttons is not
        // worth that, and the subscription below is isolated for the same reason.
        try {
          paintTitleBarForTheme(getCurrentThemeSync());
        } catch (e) {
          logger.warn(
            `Failed to set title bar window button colors on window ${windowId}: ${getErrorMessage(e)}`,
          );
        }
        windowCloseUnsubscribers.add(onDidChangeCurrentTheme(paintTitleBarForTheme));
      }
    });

    // NOTE: the macOS menubar is NOT subscribed here. `Menu.setApplicationMenu` is process-global,
    // so one subscription serves every window; subscribing per window would rebuild and re-set the
    // same application menu once per open window on every change. It is subscribed once at startup
    // instead — see the `darwin` block next to `createWindow()`'s first call.

    // The reason this code is here and not in the `app.on('will-quit')` code is that the
    // `will-quit` event only gets triggered after all windows have been closed (including this
    // one). According to the documentation the event sequence goes
    // app:`before-quit` -> window:`close` -> app:`will-quit` -> app:`quit`
    // Also, the reason why this is in the window:`close` event and not in app:`before-quit` is that
    // when you click on the close button for the main window, it immediately fires the `close`
    // event, superseding the app:`before-quit` event and this process needs to be able to hang
    // the window until the sync completes.
    let isCloseInProgress = false;
    /**
     * Whether this window's close is the app going down, decided on the first pass through the
     * close handler below.
     *
     * Read again in the `closed` handler, which has to tell a deliberate close — rewrite the
     * persisted window-layouts structure without this window — from a quit, where the structure was
     * already flushed with this window still in it and must not be rewritten smaller. It cannot
     * decide that for itself: by then the window is out of the tracked list, so the quit test below
     * would no longer give the same answer.
     */
    let isAppGoingDown = false;
    newWindow.on('close', async (event) => {
      // A second close click while the first close is still working falls through to Electron's
      // default close on purpose: with the sync's request timeout disabled by the extension, the
      // bounded wait below can hold the window up to AUTO_SYNC_MAX_DURATION_MS with no feedback,
      // and this fall-through is the user's only escape hatch until a real feedback/cancel UX
      // exists (PT-4001 tracks the missing shutdown-sync feedback). It abandons the in-flight sync
      // mid-flight — same risk profile as force-quitting the app.
      if (isCloseInProgress) return;

      // Prevents the window from initially closing. First, and ahead of every decision this handler
      // makes: Electron reads `defaultPrevented` when this synchronous stretch returns, so anything
      // that throws above this line lets the window close with none of the shutdown work below ever
      // running — and an async listener's throw becomes a rejected promise Electron never sees.
      // Below the `isCloseInProgress` guard, though: the second close click has to reach Electron's
      // default close, which is the user's only escape from the wait this handler is about to start.
      event.preventDefault();
      isCloseInProgress = true;

      // Everything from here down is inside the guard: the window is now prevented from closing and
      // latched as closing, so a throw that escaped would strand it exactly there — visible, inert,
      // and (from an async listener) reported only as a rejection Electron never sees.
      try {
        // Recorded before the decision below, and read by every window's handler, so that windows
        // closing at the same moment agree on what is happening rather than each leaving the
        // shutdown tasks to the other. Announces to arbitrary subscribers as it goes, which is the
        // other reason it sits below `preventDefault()`.
        markWindowClosing(windowId);

        // Shutdown tasks belong to the app going down, not to a window going away. Two ways the app
        // goes down, and both have to be caught here: every remaining window closing at once, and a
        // quit (Cmd+Q, menu Quit, OS logout) — which does NOT show up as a last-window close, since
        // Electron closes every window and `isAppQuitRequested` is set from `before-quit`, which
        // fires ahead of any `close`.
        isAppGoingDown = isAppShuttingDown();

        if (isAppGoingDown) {
          // The app is on its way down: stop the startup boot-race retry loop so it can't fire a
          // startup sync after this shutdown sync, or reach a network connection that is about to
          // be torn down.
          startupTasksAbort.abort();

          // Flush the window-layouts structure so this window's entry holds what it had open when
          // the app went down. Capture its placement first so the flush holds its freshest bounds.
          //
          // On a multi-window quit every window flushes, and the flushes queue behind one another
          // while the windows go down around them. A flush writes the structure as it stands when
          // it reaches the front of the queue — so the LAST flush, the one that survives on disk,
          // is only complete because a window going down with the app keeps its entry (see
          // `handleWindowRemoved`'s disposition below).
          //
          // Only on this path: a window closing while the app stays up is leaving the structure,
          // and its `closed` handler below rewrites the structure without it.
          try {
            cancelPendingBoundsCapture();
            updateWindowBounds(windowId, captureWindowBoundsState());
            await writeNow();
          } catch (e) {
            // Losing the structure costs the user their window arrangement. Skipping the shutdown
            // tasks below would cost them their unsynced edits, which nothing can write back once
            // the app is gone — so a persistence failure is logged and the shutdown continues.
            logger.warn(`Could not persist window layouts during shutdown: ${getErrorMessage(e)}`);
          }

          // On a multi-window quit every window reaches this line, so the tasks are shared rather
          // than run once per window — each window waits on the same run before destroying itself.
          await runShutdownTasksOnce(performShutdownTasks);
        } else {
          // The app stays up, but this window's editors go with it. Only this window can say what
          // it had open, so a sync that runs after it is gone can never cover it — the fan-out asks
          // the windows that are still there. Held open for the sync for the same reason the app
          // shutdown is: there is nothing left to write the edits back later.
          await performWindowCloseTasks(windowId);
        }
      } catch (e) {
        // The window still goes down via the `finally` below; what this adds is the report, which a
        // rejected promise out of an async listener would not give us.
        logger.warn(`Window ${windowId} close handling failed: ${getErrorMessage(e)}`);
      } finally {
        // Out of the routable set before the renderer goes. `closed` is what removes the window from
        // the tracked list, and until that fires a fan-out would still ask a window that cannot
        // answer — and report the coverage of whatever it was doing as incomplete because of it.
        markWindowNotReady(windowId);
        // The escape hatch above takes the window down on a second close click, which can happen
        // any time during the wait this handler just came out of
        if (newWindow.isDestroyed()) {
          logger.debug(
            `Window ${windowId} was already destroyed by the time its shutdown work finished`,
          );
        } else if (isAppGoingDown) {
          // `event.preventDefault()` above suppresses Electron's default close; destroy() here
          // triggers the 'closed' event and allows the app to quit.
          newWindow.destroy();
        } else {
          // Closed rather than destroyed, because the app is staying up and the page still has
          // teardown of its own to run — `destroy()` skips `beforeunload`, which is what prunes
          // this window's stored web view state. The second pass through this handler stops at
          // the `isCloseInProgress` guard above, leaving Electron's default close to run.
          newWindow.close();
          // A renderer that never finishes that teardown would otherwise leave the window on screen
          // and in limbo for the rest of the session: it is out of the routable set and recorded as
          // closing, and only the window actually going away puts either back — so every fan-out
          // skips it silently and the app treats the next window close as the last one. Bounded so
          // the close always completes; losing the page teardown is the smaller loss.
          const forceCloseTimeout = setTimeout(() => {
            if (newWindow.isDestroyed()) return;
            logger.warn(
              `Window ${windowId} did not finish closing within ${WINDOW_CLOSE_TIME_OUT_MS} ms; destroying it`,
            );
            newWindow.destroy();
          }, WINDOW_CLOSE_TIME_OUT_MS);
          newWindow.once('closed', () => clearTimeout(forceCloseTimeout));
        }
      }
    });

    newWindow.on('closed', async () => {
      // Everything here is keyed off the ID captured while the window was alive. The BrowserWindow
      // is destroyed by now, and reading a property off it can throw — which would abandon the rest
      // of this teardown, leaving the window tracked forever and the app never told it closed.
      removeWindow(newWindow, windowId);

      // What this window's disappearance means for its entry. A deliberate close — the app stays up
      // — takes the entry with it, and the structure is rewritten without it below so the window
      // does not come back next session. A window going down with the app is NOT leaving the
      // structure: it has to be there next session, so its entry stays — including in every flush
      // still queued behind this moment.
      // After the announcement above, which is synchronous and must not wait on a disk write, and
      // before the unsubscribers below, which spend the network service's whole registration retry
      // failing against a renderer that is already gone.
      cancelPendingBoundsCapture();
      handleWindowRemoved(windowId, isAppGoingDown ? 'entry-stays' : 'entry-goes-with-it');
      // A window told to close counts as gone from the moment it is told, and stops counting for
      // real only here — its close runs the async work above, and it is open and counted for all of
      // it. Told or not, every window passes through here, and untracked ids are ignored.
      handleWindowEmptied.handleWindowGone(windowId);
      if (!isAppGoingDown) await writeNow();

      try {
        await windowCloseUnsubscribers.runAllUnsubscribers();
      } catch (e) {
        logger.warn(`Window ${windowId} close unsubscribers failed: ${getErrorMessage(e)}`);
      }
    });

    // This sets the menu on Windows and Linux
    // 'null' to interact with external API
    // eslint-disable-next-line no-null/no-null
    newWindow.setMenu(null);

    // Open urls in the user's browser
    // Note that webviews can get to this handler with window.open and anchor tags with
    // target="_blank". Please revise web-view.service-shard.ts as necessary if you make changes here
    newWindow.webContents.setWindowOpenHandler((handlerDetails) => {
      // Only allow https urls
      (async () => {
        try {
          openExternal(handlerDetails.url);
        } catch (e) {
          logger.warn(
            `Window ${windowId} could not open external url "${handlerDetails.url}" from windowOpenHandler. ${e}`,
          );
        }
      })();

      return { action: 'deny' };
    });

    // Built URL search parameters for use in `src/renderer/global-this.model.ts`
    const searchParamsObject: Record<string, string> = {
      [LOG_LEVEL_QUERY_PARAMETER]: globalThis.logLevel,
      [WINDOW_ID]: `${windowId}`,
    };

    if (globalThis.isNoisyDevModeEnabled) searchParamsObject[DEV_MODE_QUERY_PARAMETER] = '';
    if (globalThis.startupMarks) searchParamsObject[STARTUP_MARKS_QUERY_PARAMETER] = '';

    // The scroll group state travels with the window rather than being asked for after it loads, so
    // the toolbar and every scroll-group-following web view render the reference the app is actually
    // on instead of the default reference followed by a jump. Omitted when this process has none
    // yet, which is the case the renderer's own fallback covers.
    const scrollGroupStateForWindow = getScrollGroupStateForNewWindow();
    if (scrollGroupStateForWindow)
      searchParamsObject[SCROLL_GROUP_STATE_QUERY_PARAMETER] = serialize(scrollGroupStateForWindow);

    // The current theme travels with the window for the same reason, and matters even earlier: the
    // window's own stylesheet and the one baked into every web view it restores are read during the
    // first render, so a window that had to ask for the theme would paint the default and flash.
    // Omitted when this process has none yet, which is the case the renderer's own fallback covers.
    const currentThemeForWindow = getCurrentThemeForNewWindow();
    if (currentThemeForWindow)
      searchParamsObject[THEME_STATE_QUERY_PARAMETER] = serialize(currentThemeForWindow);

    // If the URL doesn't load, we might need to show something to the user
    const urlToLoad = `${resolveHtmlPath('index.html')}?${new URLSearchParams(searchParamsObject)}`;
    newWindow.loadURL(urlToLoad).catch((e) => {
      logger.error(`Window ${windowId} could not load URL "${urlToLoad}". ${getErrorMessage(e)}`);
    });

    // Register zoom keyboard shortcuts. MacOS already supports this natively
    newWindow.webContents.on('before-input-event', (event, input) => {
      // Just act on keyDown and ignore keyUp. Could cause trouble if we need to preventDefault on keyUp
      if (input.type === 'keyUp') return;

      // F12: Open dev tools in both development and production
      if (input.key === 'F12') {
        event.preventDefault();
        if (newWindow.webContents.isDevToolsOpened()) {
          newWindow.webContents.closeDevTools();
        } else {
          newWindow.webContents.openDevTools();
        }
        return;
      }

      // keyboard tab navigation - Ctrl+Tab and Ctrl+Shift+Tab
      if (input.control && input.key === 'Tab') {
        event.preventDefault();
        if (input.shift) setWindowFocus('previousTab');
        else setWindowFocus('nextTab');
        return;
      }

      // PT9 verse navigation shortcuts: F8/Ctrl+F8 chapter, F9/Ctrl+F9 book,
      // Ctrl+Up/Ctrl+Down verse, Ctrl+B open Book Chapter Control (PT-4033).
      // On macOS the modified shortcuts use Command instead of Control
      //
      // TODO (PT-4143): this claims the matching chords app-wide with no focus/modal awareness —
      // `before-input-event` fires before any renderer frame (including web view iframes and text
      // fields) sees the key, so e.g. Ctrl/Cmd+B never reaches an editor as "bold" and Cmd+Up/Down
      // no longer move the caret on macOS. Make the claim focus-aware (skip when a text-editing
      // surface has focus or a modal is open).
      const verseNavigationCommand = getVerseNavigationCommand(
        input,
        process.platform === 'darwin',
      );
      if (verseNavigationCommand) {
        event.preventDefault();
        commandService.sendCommand(verseNavigationCommand).catch((e) => {
          logger.warn(
            `Failed to send ${verseNavigationCommand} for keyboard shortcut: ${getErrorMessage(e)}`,
          );
        });
        return;
      }

      // Reference history navigation (PT-4033). Key detection lives in
      // reference-history-keyboard.util.ts (unit tested there); the physical→logical RTL swap is
      // resolved in the renderer (resolveReferenceHistoryDirection in platform-bible-utils). This
      // handler only maps the physical key to a left/right command — it never needs the UI
      // direction. Synthesized CDP input cannot reach this handler; see the skipped keyboard test in
      // e2e-tests/tests/isolated/navigation-history/navigation-history.spec.ts.
      const physicalHistoryDirection = getPhysicalHistoryNavigationDirection(
        input,
        process.platform,
      );
      if (physicalHistoryDirection) {
        // NOTE (PT-4143): this preventDefault is global and focus-blind — it fires for any focus
        // context, including inside WebView iframes, and even when there is no history to navigate
        // to. No shipping keybinding is shadowed today (the Lexical editor indents with Tab), but a
        // future editor/extension binding ⌘[ / ⌘] or Alt+Arrow would be silently swallowed here.
        // Tracked in PT-4143.
        event.preventDefault();
        // Dispatch the PHYSICAL direction (left/right) and nothing else. The renderer resolves it to
        // a logical back/forward for the current UI layout direction (RTL swaps the pair — see
        // resolveReferenceHistoryDirection in platform-bible-utils, shared with the toolbar's hint
        // display) AND resolves which scroll group to act on — the active one the top toolbar follows
        // — so the main process stays agnostic of both the UI direction and the active scroll group.
        // Auto-repeat is intentional: holding the key steps through history entry-by-entry, matching
        // Paratext 9.
        (async () => {
          try {
            await commandService.sendCommand(
              physicalHistoryDirection === 'left'
                ? 'platform.navigateLeftInReferenceHistory'
                : 'platform.navigateRightInReferenceHistory',
            );
          } catch (e) {
            logger.warn(`Reference history keyboard navigation failed. ${getErrorMessage(e)}`);
          }
        })();
        return;
      }

      if (process.platform !== 'darwin') {
        // Non-Mac shortcuts

        // Zoom shortcuts - Mac's zoom shortcuts already work because of the menu items
        // Zoom in: Ctrl++ or Ctrl+=
        if (input.control && (input.key === '=' || input.key === '+')) {
          event.preventDefault();
          zoomIn();
          return;
        }
        // Zoom out: Ctrl+-
        if (input.control && input.key === '-') {
          event.preventDefault();
          zoomOut();
          return;
        }
        // Reset zoom: Ctrl+0
        if (input.control && input.key === '0') {
          event.preventDefault();
          resetZoomFactor();
          return;
        }

        // keyboard tab group navigation - Ctrl+PgUp and Ctrl+PgDown
        if (input.control && (input.key === 'PageUp' || input.key === 'PageDown')) {
          event.preventDefault();
          if (input.key === 'PageUp') setWindowFocus('previousTabGroup');
          else setWindowFocus('nextTabGroup');
          return;
        }

        return;
      }

      // Mac-only shortcuts

      // More keyboard tab navigation - Cmd+Shift+[]
      if (input.meta && input.shift && (input.key === '[' || input.key === ']')) {
        event.preventDefault();
        if (input.key === '[') setWindowFocus('previousTab');
        else setWindowFocus('nextTab');
        return;
      }

      // keyboard tab group navigation - Cmd+Option+Up and Cmd+Option+Down
      if (input.meta && input.alt && (input.key === 'ArrowUp' || input.key === 'ArrowDown')) {
        event.preventDefault();
        if (input.key === 'ArrowUp') setWindowFocus('previousTabGroup');
        else setWindowFocus('nextTabGroup');
      }
    });

    // Set initial zoom factor from settings
    newWindow.webContents.on('did-finish-load', async () => {
      try {
        const zoom = await getZoomFactor();
        newWindow.webContents.setZoomFactor(zoom);
      } catch (e) {
        logger.error(`Failed to set initial zoom factor: ${getErrorMessage(e)}`);
      }
    });

    // Update zoom factor when the setting changes (per-window subscription with cleanup)
    try {
      windowCloseUnsubscribers.add(
        await settingsService.subscribe('platform.zoomFactor', async (newZoomFactor) => {
          const zoomFactor = isPlatformError(newZoomFactor)
            ? (() => {
                logger.error(`Error getting new zoom factor: ${getErrorMessage(newZoomFactor)}`);
                return DEFAULT_ZOOM_FACTOR;
              })()
            : newZoomFactor;
          try {
            newWindow.webContents.setZoomFactor(zoomFactor);
          } catch (e) {
            logger.error(`Failed to update zoom factor: ${getErrorMessage(e)}`);
          }
        }),
      );
    } catch (e) {
      logger.warn(`Failed to subscribe to zoom factor changes: ${getErrorMessage(e)}`);
    }

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    // Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
    // new AppUpdater();

    return newWindow;
  };

  // The router that serves `openWebView` starts before this closure exists, so it is handed the
  // window facilities once they are real. A caller that reaches the router first (e.g. an extension
  // opening a window from `activate()`) waits, bounded, for this call rather than failing outright —
  // so this must stay wired without first waiting for extension-host readiness: a wait here for an
  // extension-host ready signal would deadlock against that wait.
  setWebViewWindowCreator({
    createPendingContentWindow: async () =>
      (await createWindow(undefined, { pendingContent: true })).id,
    closeWindow: (windowId) => BrowserWindow.fromId(windowId)?.close(),
  });

  /**
   * Create the app's windows from the persisted window-layouts structure: one window per saved
   * entry, in entry order — except in simple interface mode, which is single-window, so only the
   * main entry's window is created and the other entries stay preserved in the structure. With no
   * usable structure (first run, or an upgrade from the single-window keeper), one legacy window is
   * created whose renderer falls back to the pre-multi-window saved layout.
   *
   * Runs at startup and again on macOS re-activation after the last window closed (the quit-like
   * close path flushed the structure when that window went down).
   */
  const restoreWindows = async () => {
    const plan = await loadWindowLayouts();
    if (plan.kind === 'legacy') {
      const legacyWindow = await createWindow({ kind: 'legacy', boundsState: plan.boundsState });
      setMainWindowId(legacyWindow.id);
      return;
    }

    // The main entry's window is created first — before the interface-mode read below, which can
    // block on the extension host early in startup — so the first window never waits on it. The
    // saved structure keeps entry order regardless of window creation order.
    const { entries, mainEntryIndex } = plan;
    const mainWindow = await createWindow({
      kind: 'entry',
      entryIndex: mainEntryIndex,
      entry: entries[mainEntryIndex],
    });
    setMainWindowId(mainWindow.id);
    if (entries.length <= 1) return;

    // Simple mode is single-window: restore only the main window no matter how many entries the
    // structure holds. Same when the mode cannot be read — restoring too few is recoverable
    // because an entry not assigned to a window this session is preserved in the structure, while
    // restoring too many would put a Power user's secondary windows on a Simple user's screen.
    let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
    try {
      interfaceMode = await settingsService.get('platform.interfaceMode');
    } catch (e) {
      logger.warn(
        `Could not read platform.interfaceMode; restoring only the main window: ${getErrorMessage(e)}`,
      );
    }
    if (interfaceMode !== 'power') return;

    for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
      if (entryIndex !== mainEntryIndex) {
        // Sequential on purpose: creating windows one at a time keeps the tracked window order
        // (and so the focus fallback and save order) deterministic
        // eslint-disable-next-line no-await-in-loop
        await createWindow({ kind: 'entry', entryIndex, entry: entries[entryIndex] });
      }
    }
  };

  app.on('window-all-closed', () => {
    // The macOS convention of keeping the application resident after its last window closes only
    // applies when no quit is in flight. Every window's `close` handler calls `preventDefault()`
    // to run its shutdown work, and that cancels a requested quit — so a quit that closed the
    // windows must be re-issued here, or the app stays resident with zero windows and `will-quit`
    // never runs.
    if (process.platform !== 'darwin' || isAppQuitRequested()) {
      app.quit();
    }
  });

  /**
   * Ends the one process-global macOS menubar subscription. Undefined off macOS, before the
   * subscription is made, and once it has been run — the quit teardown below runs it exactly once.
   */
  let unsubscribeMacosMenubar: (() => Promise<boolean>) | undefined;

  let isAppQuitting = false;
  app.on('will-quit', async (e) => {
    if (!isAppQuitting) {
      logger.info('Main process is quitting');
      // Before anything that can fail or wait: the scroll group and theme hosts let their stores lag
      // memory so a held-down navigation key does not fsync per verse and a dragged colour picker
      // does not fsync per frame, and this is the last moment that lag can be closed. Synchronous
      // and unconditional, so quitting right after navigating or changing the theme still opens on
      // the right reference, in the right theme, next time.
      flushPersistedScrollGroupState();
      flushPersistedThemeState();
      // Stop the startup boot-race retry loop before networkService.shutdown() tears down the
      // connection, so a late retry can't resurrect it (a no-op if the window close already aborted).
      startupTasksAbort.abort();

      // Prevent closing before graceful shutdown is complete.
      // Also, in the future, this should allow a "are you sure?" dialog to display.
      e.preventDefault();
      isAppQuitting = true;

      // Cleared before it is run so a second pass through here cannot run it again
      const unsubscribeMenubar = unsubscribeMacosMenubar;
      unsubscribeMacosMenubar = undefined;
      if (unsubscribeMenubar) {
        // Bounded like every other wait on this path. The unsubscribe is an RPC to the extension
        // host, which is still up at this point and should answer at once — but an extension host
        // that has stopped answering would otherwise hold the whole quit for the request timeout,
        // and a subscription left behind in a process that is about to exit costs nothing.
        const didFinishUnsubscribing = await waitForDuration(async () => {
          try {
            await unsubscribeMenubar();
          } catch (error) {
            logger.warn(`Failed to unsubscribe the macOS menubar: ${getErrorMessage(error)}`);
          }
          return true;
        }, PROCESS_CLOSE_TIME_OUT_MS);
        if (!didFinishUnsubscribing)
          logger.warn(
            `The macOS menubar did not unsubscribe within ${PROCESS_CLOSE_TIME_OUT_MS} ms; quitting anyway`,
          );
      }

      await Promise.all([
        dotnetDataProvider.waitForClose(PROCESS_CLOSE_TIME_OUT_MS),
        extensionHostService.waitForClose(PROCESS_CLOSE_TIME_OUT_MS),
      ]);
      await networkService.shutdown();

      // In development, the dotnet watcher was killed so we have to wait here.
      if (process.env.NODE_ENV !== 'production') await wait(500);

      app.quit();
    } else {
      dotnetDataProvider.kill();
      extensionHostService.kill();
    }
  });

  app
    .whenReady()
    .then(async () => {
      // Set up ipc handlers
      ipcMain.handle(
        'electronAPI:env.test',
        (_event, message: string) => `From main.ts: test ${message}`,
      );

      // When packaged, the app loads from file:// which has an opaque (null) origin and sends no
      // Referer header. YouTube embeds require a non-null HTTP/HTTPS Referer and show Error 153
      // when none is present. Intercept YouTube requests and add a Referer so embedded YouTube
      // iframes work in the packaged app. See more about this requirement at
      // https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity
      session.defaultSession.webRequest.onBeforeSendHeaders(
        { urls: ['https://*.youtube.com/*', 'https://*.youtube-nocookie.com/*'] },
        (details, respond) => {
          const { requestHeaders } = details;
          if (!requestHeaders.Referer)
            // Made up URL that communicates the general idea that the request is coming from our app
            requestHeaders.Referer = 'https://app.platform.paratext.org/';
          respond({ requestHeaders });
        },
      );

      // Install Chromium devtools extensions once (not per-window)
      if (isDebug) {
        await installExtensions();
      }

      // Subscribe to macOS menubar once globally (not per-window). Its unsubscribe is handed to the
      // ordered teardown in `will-quit` rather than registered as a second listener there: a second
      // listener runs on the FIRST emission, while that teardown has only begun, and `will-quit` is
      // emitted again after the teardown re-quits, so it would run twice as well as too early.
      if (process.platform === 'darwin') {
        try {
          unsubscribeMacosMenubar = await subscribeCurrentMacosMenubar();
        } catch (error) {
          logger.info(`Failed to build the macOS menubar ${error}`);
        }
      }

      // Caught here rather than left to reject this chain: `createWindow` refuses outright during a
      // quit and the restore reads from disk, so this can fail — and a rejection would skip the
      // `activate` registration below, which is the only thing that brings windows back on macOS
      // after the last one closes.
      try {
        await restoreWindows();
      } catch (e) {
        logger.error(`Failed to restore windows at startup: ${getErrorMessage(e)}`);
      }

      // Collapse overlapping restores: 'activate' can fire again (rapid dock clicks) while a
      // previous restore is still creating windows — and before the first window exists, the
      // no-windows guard below does not catch that. A second concurrent restoreWindows run would
      // reset the layout persistence tracking mid-restore and create duplicate windows, so late
      // callers await the in-flight run instead of starting their own.
      let restoreWindowsInFlight: Promise<void> | undefined;
      app.on('activate', async () => {
        // On macOS it's common to re-create windows in the app when the
        // dock icon is clicked and there are no other windows open.
        //
        // Asking whether the app is on its way down as well as counting windows, because for the
        // moment between a window being destroyed and its `closed` handler stopping tracking it,
        // the two disagree: the window is out of the count already but is still recorded as
        // closing. `createWindow` refuses in that state, correctly — reporting the refusal as a
        // failure to restore windows is what this avoids.
        if (getWindows().length !== 0 || isAppShuttingDown()) return;
        try {
          if (!restoreWindowsInFlight)
            restoreWindowsInFlight = restoreWindows().finally(() => {
              restoreWindowsInFlight = undefined;
            });
          await restoreWindowsInFlight;
        } catch (e) {
          logger.error(`Failed to restore windows on activate: ${getErrorMessage(e)}`);
        }
      });

      return undefined;
    })
    .catch((e) => logger.error(`Error in app.whenReady: ${getErrorMessage(e)}`));

  // #endregion

  // #region Ensure the request timeout has been set

  // settingsService updates the request timeout during initialization, so using the service in any
  // way ensures the timeout is set
  try {
    logger.debug(`Request timeout is ${await settingsService.get('platform.requestTimeout')} sec`);
  } catch (e) {
    logger.warn(`Failed to get request timeout from settings: ${getErrorMessage(e)}`);
  }

  // #endregion

  // #region Register commands

  // `main.ts`'s command handler declarations are in `papi-shared-types.ts` so papi-dts sees them

  commandService.registerCommand('platform.restartExtensionHost', restartExtensionHost, {
    method: {
      summary: 'Restart the extension host which reloads and reinitializes TS/JS extensions',
      params: [],
      result: {
        name: 'return value',
        schema: { type: 'null' },
      },
    },
  });

  commandService.registerCommand(
    'platform.getLogFileContent',
    async () => {
      try {
        const logFile = logger.transports.file.getFile();
        const logFilePath = logFile.toString();

        const logContent = await readFile(logFilePath, 'utf8');

        return logContent;
      } catch (error) {
        return `Error reading log file: ${error instanceof Error ? error.message : String(error)}`;
      }
    },
    {
      method: {
        summary: 'Get the current log file content for debugging purposes',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'string' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.createWindow',
    async () => {
      await createWindow();
    },
    {
      method: {
        'x-experimental': true,
        summary: 'Create a new application window',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.getFocusedWindowId',
    async () => {
      // The honest answer about focus, not the window calls are routed to. Those differ while a
      // newly opened window has OS focus but has not finished starting, and callers of this command
      // are asking about the window the user is looking at.
      return getFocusedWindowId();
    },
    {
      method: {
        'x-experimental': true,
        summary: 'Get the ID of the currently focused window',
        params: [],
        result: {
          name: 'return value',
          schema: { oneOf: [{ type: 'number' }, { type: 'null' }] },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.getWindows',
    async () => {
      // Read on call rather than pushed on change: callers want this at the moment they offer the
      // user a choice of windows and never again, so there is nothing to keep in sync.
      //
      // Offered windows are ones that can still take the work: a window whose close has begun is
      // on its way out, and one whose renderer is dead with no reload coming can never receive
      // anything. Picking either sends the user's action nowhere. A window that has not finished
      // starting is deliberately still offered — it is on screen, the user can see it, and work
      // sent to it lands once it is ready.
      const availableWindows = getWindows().filter(
        (window) => !isWindowMarkedClosing(window.id) && !isWindowAbandoned(window.id),
      );
      return summarizeWindows(availableWindows, getMainWindowId());
    },
    {
      method: {
        'x-experimental': true,
        summary:
          'List every open window with the title it is currently showing, for offering the user ' +
          'a choice of window. Titles follow each window’s own content, so they can repeat',
        params: [],
        result: {
          name: 'return value',
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                windowId: { type: 'number' },
                label: { type: 'string' },
                isMain: { type: 'boolean' },
              },
              required: ['windowId', 'label', 'isMain'],
            },
          },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.quit',
    async () => {
      app.quit();
    },
    {
      method: {
        summary: 'Close the platform, including all processes started by it',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.restart',
    async () => {
      // Only set up to restart once. This could accidentally be called twice if `app.quit` is
      // canceled or if someone requested to restart multiple times in the few seconds it takes
      // `app.quit` to run because of the `will-quit` event
      if (!willRestart) {
        willRestart = true;

        app.relaunch({
          // If in portable app, relaunch properly. If not, take default action. Thanks to Araxeus at
          // https://github.com/electron-userland/electron-builder/issues/4110#issuecomment-1050149429
          execPath: process.env.PORTABLE_EXECUTABLE_FILE,
        });
      }
      app.quit();
    },
    {
      method: {
        summary: 'Restart the platform, including all processes started by it',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.getOSPlatform',
    async () => {
      return os.platform();
    },
    {
      method: {
        summary: 'Get the os platform ("win32", "darwin", "linux")',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.isFullScreen',
    async () => {
      return false; // TODO implement;
    },
    {
      method: {
        summary: 'If platform runs in full screen mode',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  const liveDocsUrl = `https://playground.open-rpc.org/?transport=websocket&schemaUrl=${encodeURIComponent('ws://localhost:8876\n')}&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false&uiSchema[appBar][ui:transports]=false&uiSchema[appBar][ui:darkMode]=true&uiSchema[appBar][ui:title]=PAPI`;
  commandService.registerCommand(
    'platform.openDeveloperDocumentationUrl',
    async () => {
      await openExternal(liveDocsUrl);
    },
    {
      method: {
        summary: 'Open the OpenRPC documentation in a browser',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.openWindow',
    async (url) => {
      logger.debug(`Main opening window with url from command: ${url}`);
      await openExternal(url);
    },
    {
      method: {
        summary: "Open a link in the user's default browser",
        params: [
          {
            name: 'url',
            required: true,
            summary: 'The url to open',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.zoomIn',
    async () => {
      await zoomIn();
    },
    {
      method: {
        summary: 'Increase the zoom factor of all application windows by 10%',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  commandService.registerCommand(
    'platform.zoomOut',
    async () => {
      await zoomOut();
    },
    {
      method: {
        summary: 'Decrease the zoom factor of all application windows by 10%',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  // #endregion

  // #region Noisy dev tests

  if (globalThis.isNoisyDevModeEnabled) {
    // Register commands only for testing purposes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testCommandHandlers: { [commandName: string]: (...args: any[]) => any } = {
      'test.echo': async (message: string) => {
        return message;
      },
      'test.echoExtensionHost': async (message: string) => {
        await commandService.sendCommand('test.addMany', 3, 5, 7, 1, 4);
        return message;
      },
      'test.throwError': async (message: string) => {
        throw new Error(`Test Error thrown in throwError command: ${message}`);
      },
    };

    Object.entries(testCommandHandlers).forEach(([commandName, handler]) => {
      // Re-assert type after passing through `forEach`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      commandService.registerCommand(commandName as CommandNames, handler);
    });

    // Call a test command registered elsewhere
    setTimeout(async () => {
      logger.debug(
        `Add Many (from EH): ${await commandService.sendCommand('test.addMany', 2, 5, 9, 7)}`,
      );
    }, 20000);

    // Register a test network object
    const testMain = {
      doStuff: (stuff: string) => {
        const result = `testMain did stuff: ${stuff}!`;
        logger.debug(result);
        return result;
      },
      dispose: () => {
        logger.debug('testMain.dispose() ran in testMain');
        return Promise.resolve(true);
      },
    };

    const testMainDisposer = await networkObjectService.set('testMain', testMain);
    testMain.doStuff('main things');
    testMainDisposer.onDidDispose(() => {
      logger.debug('testMain disposed in main message #1');
    });
    testMainDisposer.onDidDispose(() => {
      logger.debug('testMain disposed in main message #2');
    });

    setTimeout(testMainDisposer.dispose, 20000);

    // Create a test network object registered elsewhere
    setTimeout(async () => {
      let testExtensionHost = await networkObjectService.get<{
        getVerse: () => Promise<string>;
      }>('testExtensionHost');
      if (testExtensionHost) {
        logger.debug(`get verse: ${await testExtensionHost.getVerse()}`);
        testExtensionHost.onDidDispose(() => {
          logger.debug('testExtensionHost disposed in main');
          testExtensionHost = undefined;
        });
      } else logger.error('Could not get testExtensionHost from main');
    }, 5000);

    // Dump all the network objects after things have settled a bit
    setTimeout(async () => {
      logger.info(
        `Available network request types after 30 seconds: ${serialize(
          // `GET_METHODS` is required by OpenRPC to get the list of available methods
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          await networkService.request(GET_METHODS as SerializedRequestType, {}),
        )}`,
      );
    }, 30000);

    // Get a data provider and do something with it
    setTimeout(async () => {
      const usxPdp = await get(
        'platformScripture.USX_Chapter',
        '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
      );
      const verse = await usxPdp.getChapterUSX({ book: 'JHN', chapterNum: 1, verseNum: 1 });
      logger.info(`Got PDP data: ${verse}`);

      if (verse !== undefined)
        await usxPdp.setChapterUSX({ book: 'JHN', chapterNum: 1, verseNum: 1 }, verse);

      const basePdp = await get(
        PROJECT_INTERFACE_PLATFORM_BASE,
        '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
      );
      basePdp.setExtensionData(
        { extensionName: 'foo', dataQualifier: 'fooData' },
        'This is the data from extension foo',
      );
    }, 20000);
  }

  // #endregion
}

async function restartExtensionHost() {
  logger.info('Restarting extension host');
  await extensionHostService.restart(PROCESS_CLOSE_TIME_OUT_MS);
}

(async () => {
  logger.info(`Starting ${APP_NAME} version ${APP_VERSION}`);
  await main();
})().catch(logger.error);
