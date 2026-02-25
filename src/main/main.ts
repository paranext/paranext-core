/**
 * This module executes inside of electron's main process. You can start electron renderer process
 * from here and communicate with the other processes through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to `./src/main.js`
 * using webpack. This gives us some performance wins.
 */

import { app, BrowserWindow, ipcMain, RenderProcessGoneDetails, shell } from 'electron';
import os from 'os';
import path from 'path';
// Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
/* import { autoUpdater } from 'electron-updater'; */
import '@main/global-this.model';
import '@node/utils/log-archiver.util';
import { subscribeCurrentMacosMenubar } from '@main/platform-macos-menubar.util';
import {
  APP_NAME,
  APP_URI_SCHEME,
  APP_VERSION,
  startAppService,
} from '@main/services/app.service-host';
import { startCommandRoutingService } from '@main/services/command-routing.service';
import { startDataProtectionService } from '@main/services/data-protection.service-host';
import { dotnetDataProvider } from '@main/services/dotnet-data-provider.service';
import { extensionAssetProtocolService } from '@main/services/extension-asset-protocol.service';
import { extensionHostService } from '@main/services/extension-host.service';
import { startNetworkObjectStatusService } from '@main/services/network-object-status.service-host';
import { startProjectLookupService } from '@main/services/project-lookup.service-host';
import { startWebViewRoutingService } from '@main/services/web-view-routing.service';
import { startWindowAggregatorService } from '@main/services/window-aggregator.service-host';
import {
  addWindow,
  getWindows,
  removeWindow,
  setFocusedWindowId,
  getTargetWindowId,
} from '@main/services/window-state.service';
import { HANDLE_URI_REQUEST_TYPE } from '@node/services/extension.service-model';
import { resolveHtmlPath } from '@node/utils/util';
import {
  DEFAULT_ZOOM_FACTOR,
  DEV_MODE_QUERY_PARAMETER,
  LOG_LEVEL_QUERY_PARAMETER,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
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
import { SerializedRequestType } from '@shared/utils/util';
import windowStateKeeper from 'electron-window-state';
import { CommandNames } from 'papi-shared-types';
import {
  getErrorMessage,
  isPlatformError,
  serialize,
  UnsubscriberAsyncList,
  wait,
} from 'platform-bible-utils';
import { getByType as getDataProviderByType } from '@shared/services/data-provider.service';
import { themeService } from '@shared/services/theme.service';
import { IWindowService, windowServiceProviderName } from '@shared/services/window.service-model';

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

/** Increase the zoom factor of the app's main window by 0.1, up to a maximum of 3.0 */
const zoomIn = async () => {
  const currentZoom = await getZoomFactor();
  if (currentZoom < MAX_ZOOM_FACTOR) {
    const newZoom = currentZoom + 0.1;
    await setZoomFactor(newZoom);
  }
};

/** Decrease the zoom factor of the app's main window by 0.1, down to a minimum of 0.5 */
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

const PROCESS_CLOSE_TIME_OUT = 2000;

/** Height of the custom title bar buttons on Windows */
const TITLE_BAR_BUTTON_HEIGHT = 47;
/** Background color of the window buttons in the custom title bar on Windows */
const TITLE_BAR_BUTTON_BACKGROUND_COLOR = 'hsla(0, 0%, 100%, 0)'; // transparent button background until hovered

/**
 * If this is `true`, we will restart soon. Not just using `isAppQuitting` because we need to make
 * sure we only run `relaunch` once which has a slightly different use case than `isAppQuitting`
 */
let willRestart = false;

/**
 * Cached window service data providers keyed by window ID. Avoids repeated network lookups on every
 * input event while the data provider is already registered.
 */
const windowServiceCache = new Map<number, IWindowService>();

/** In-flight lookups so concurrent input events share one network request instead of each retrying */
const windowServicePending = new Map<number, Promise<IWindowService | undefined>>();

/**
 * Get the window service data provider for a specific window by its ID. Each renderer registers its
 * own scoped data provider (e.g. "platform.windowServiceDataProvider-1"). Results are cached to
 * avoid repeated network lookups on every input/mouse event. Concurrent lookups for the same window
 * share a single in-flight promise.
 */
async function getWindowServiceForWindow(winId: number): Promise<IWindowService | undefined> {
  const cached = windowServiceCache.get(winId);
  if (cached) return cached;

  // If a lookup is already in flight for this window, reuse it
  const pending = windowServicePending.get(winId);
  if (pending) return pending;

  const promise = (async () => {
    const svc = await getDataProviderByType<IWindowService>(
      `${windowServiceProviderName}-${winId}`,
    );
    if (svc) {
      windowServiceCache.set(winId, svc);
      svc.onDidDispose(() => windowServiceCache.delete(winId));
    }
    return svc;
  })();

  windowServicePending.set(winId, promise);
  try {
    return await promise;
  } finally {
    windowServicePending.delete(winId);
  }
}

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
  // The network service has to start first, and it uses the shared store after initialization
  await networkService.initialize();
  await initializeSharedStoreService(networkService);

  // The network object status service relies on seeing everything else start up later
  await startNetworkObjectStatusService();

  // The project lookup service relies on the network object status service
  await startProjectLookupService();

  // The window aggregator service relies on the network object status service
  await startWindowAggregatorService();

  // Register multi-window routing proxies before any windows are created. These claim generic names
  // (e.g. "WebViewService", "platform.openSettings") so renderers register under scoped names
  // (e.g. "WebViewService-1", "platform.openSettings-1") and the proxies route to the focused window.
  await startWebViewRoutingService();
  await startCommandRoutingService();

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
  await extensionHostService.start(PROCESS_CLOSE_TIME_OUT);

  // TODO (maybe): Wait for signal from the extension host process that it is ready (except 'getWebView')
  // We could then wait for the renderer to be ready and signal the extension host

  const windows = getWindows();

  // #region Set up the protocol client to receive navigation to this app's URI scheme

  // Launch the portable app if we're in it; otherwise use the normal path
  const launchPath = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const args = process.argv.slice(1);

  function handleUri(uri: string) {
    const focusWindow = BrowserWindow.getFocusedWindow() ?? windows[0];
    if (focusWindow) {
      if (focusWindow.isMinimized()) focusWindow.restore();
      focusWindow.focus();
    }
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
  const createWindow = async () => {
    // Load the previous state with fallback to defaults.
    // Only use windowStateKeeper for the first window; subsequent windows let the OS stagger them.
    const isFirstWindow = windows.length === 0;
    const mainWindowState = isFirstWindow
      ? windowStateKeeper({ defaultWidth: 1024, defaultHeight: 728 })
      : undefined;

    const newWindow = new BrowserWindow({
      show: true,
      ...(mainWindowState ? { x: mainWindowState.x, y: mainWindowState.y } : {}),
      width: mainWindowState?.width ?? 1024,
      height: mainWindowState?.height ?? 728,
      minWidth: 800, // TODO: Remove this temporary enforcement when https://paratextstudio.atlassian.net/browse/PT-2333 is implemented
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
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    // Capture the window ID before it can be destroyed (used in the `closed` handler)
    const windowId = newWindow.id;

    // Track this window immediately
    addWindow(newWindow);

    // Track which window is focused for multi-window command routing
    newWindow.on('focus', () => {
      setFocusedWindowId(windowId);
    });

    // Set our custom protocol handler to load assets from extensions
    extensionAssetProtocolService.initialize();

    // Register listeners on the window, so the state is updated automatically
    // (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    if (mainWindowState) mainWindowState.manage(newWindow);

    // Add several listeners to the window to log events
    newWindow.webContents.on('unresponsive', () => logger.warn(`Window ${windowId} unresponsive`));
    newWindow.webContents.on('responsive', () => logger.warn(`Window ${windowId} responsive`));
    newWindow.webContents.on('render-process-gone', (_, details: RenderProcessGoneDetails) =>
      logger.warn(`Window ${windowId} render process gone: ${JSON.stringify(details)}`),
    );
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
      const svc = await getWindowServiceForWindow(windowId);
      if (svc) await svc.setFocus(specifier);
      else logger.debug(`Window service for window ${windowId} not available yet`);
    };

    newWindow.webContents.on('before-input-event', async (_, event) => {
      // Key up seems not to change focus in Windows, so we will only change on keyDown
      if (event.type !== 'keyDown') return;

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
      if (process.env.START_MINIMIZED) {
        newWindow.minimize();
      } else {
        newWindow.show();
      }

      // Adjust the Window button colors based on the current theme
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      if (process.platform !== 'darwin' && process.platform !== 'linux') {
        try {
          windowCloseUnsubscribers.add(
            await themeService.subscribeCurrentTheme(undefined, (newTheme) => {
              if (isPlatformError(newTheme)) {
                logger.warn(
                  `Failed to set title bar window button colors: Failed to get new current theme: ${getErrorMessage(
                    newTheme,
                  )}`,
                );
                return;
              }
              if (!newTheme.cssVariables.primary) {
                logger.warn(
                  `Failed to set title bar window button colors: New theme primary color is falsy!`,
                );
                return;
              }

              // Need to put commas between the numbers for it to work here
              const newThemePrimaryString = newTheme.cssVariables.primary.split(' ').join(', ');

              newWindow.setTitleBarOverlay({
                color: TITLE_BAR_BUTTON_BACKGROUND_COLOR,
                symbolColor: `hsl(${newThemePrimaryString})`,
                height: TITLE_BAR_BUTTON_HEIGHT,
              });
            }),
          );
        } catch (e) {
          logger.warn(
            `Failed to subscribe to current theme to adjust window button colors: ${getErrorMessage(
              e,
            )}`,
          );
        }
      }
    });

    newWindow.on('closed', async () => {
      removeWindow(newWindow);
      windowServiceCache.delete(windowId);
      // If the focused window was closed, fall back to the first remaining window
      if (getTargetWindowId() === windowId) {
        setFocusedWindowId(windows[0]?.id);
      }
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
    // target="_blank". Please revise web-view.service-host.ts as necessary if you make changes here
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
        settingsService.subscribe('platform.zoomFactor', async (newZoomFactor) => {
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
  };

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  let isAppQuitting = false;
  app.on('will-quit', async (e) => {
    if (!isAppQuitting) {
      logger.info('Main process is quitting');

      // Prevent closing before graceful shutdown is complete.
      // Also, in the future, this should allow a "are you sure?" dialog to display.
      e.preventDefault();
      isAppQuitting = true;

      await Promise.all([
        dotnetDataProvider.waitForClose(PROCESS_CLOSE_TIME_OUT),
        extensionHostService.waitForClose(PROCESS_CLOSE_TIME_OUT),
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
    // eslint-disable-next-line promise/always-return
    .then(async () => {
      // Set up ipc handlers
      ipcMain.handle(
        'electronAPI:env.test',
        (_event, message: string) => `From main.ts: test ${message}`,
      );

      // Install Chromium devtools extensions once (not per-window)
      if (isDebug) {
        await installExtensions();
      }

      // Subscribe to macOS menubar once globally (not per-window)
      if (process.platform === 'darwin') {
        try {
          const unsubscribeMacosMenubar = await subscribeCurrentMacosMenubar();
          app.on('will-quit', () => unsubscribeMacosMenubar());
        } catch (error) {
          logger.info(`Failed to build the macOS menubar ${error}`);
        }
      }

      createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (windows.length === 0) createWindow();
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
      createWindow();
    },
    {
      method: {
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
      return getTargetWindowId();
    },
    {
      method: {
        summary: 'Get the ID of the currently focused window',
        params: [],
        result: {
          name: 'return value',
          schema: { type: 'number' },
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

  const liveDocsUrl =
    'https://playground.open-rpc.org/?transport=websocket&schemaUrl=ws%3A%2F%2Flocalhost%3A8876%0A&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false&uiSchema[appBar][ui:transports]=false&uiSchema[appBar][ui:darkMode]=true&uiSchema[appBar][ui:title]=PAPI';
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
        summary: 'Increase the zoom factor of the main window by 10%',
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
        summary: 'Decrease the zoom factor of the main window by 10%',
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
  await extensionHostService.restart(PROCESS_CLOSE_TIME_OUT);
}

(async () => {
  logger.info(`Starting ${APP_NAME} version ${APP_VERSION}`);
  await main();
})().catch(logger.error);
