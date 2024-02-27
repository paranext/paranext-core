/**
 * This module executes inside of electron's main process. You can start electron renderer process
 * from here and communicate with the other processes through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to `./src/main.js`
 * using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, IpcMainInvokeEvent } from 'electron';
// Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
/* import { autoUpdater } from 'electron-updater'; */
import windowStateKeeper from 'electron-window-state';
import '@main/global-this.model';
import dotnetDataProvider from '@main/services/dotnet-data-provider.service';
import logger from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import { resolveHtmlPath } from '@node/utils/util';
import extensionHostService from '@main/services/extension-host.service';
import extensionAssetProtocolService from '@main/services/extension-asset-protocol.service';
import { wait } from 'platform-bible-utils';
import { CommandNames } from 'papi-shared-types';
import { SerializedRequestType } from '@shared/utils/util';
import { startNetworkObjectStatusService } from '@main/services/network-object-status.service-host';
import { startLocalizationService } from '@main/services/localization.service-host';
import { initialize as initializeSettingsService } from '@main/services/settings.service-host';
import { startProjectSettingsService } from '@main/services/project-settings.service-host';

const PROCESS_CLOSE_TIME_OUT = 2000;

// `main.ts`'s command handler declarations are in `command.service.ts` so they can be picked up
// by papi-dts
// This map should allow any functions because commands can be any function type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commandHandlers: { [commandName: string]: (...args: any[]) => any } = {
  'platform.restartExtensionHost': async () => {
    restartExtensionHost();
  },
  'platform.quit': async () => {
    app.quit();
  },
};

async function main() {
  // The network service relies on nothing else, and other things rely on it, so start it first
  await networkService.initialize();

  // The network object status service relies on seeing everything else start up later
  await startNetworkObjectStatusService();

  // The .NET data provider relies on the network service and nothing else
  dotnetDataProvider.start();

  // TODO (maybe): Wait for signal from the .NET data provider process that it is ready

  // The extension host service relies on the network service.
  // Extensions inside the extension host might rely on the .NET data provider and each other
  // Some extensions inside the extension host rely on the renderer to accept 'getWebView' commands.
  // The renderer relies on the extension host, so something has to break the dependency loop.
  // For now, the dependency loop is broken by retrying 'getWebView' in a loop for a while.
  await extensionHostService.start();

  await startLocalizationService();

  await initializeSettingsService();

  await startProjectSettingsService();

  // TODO (maybe): Wait for signal from the extension host process that it is ready (except 'getWebView')
  // We could then wait for the renderer to be ready and signal the extension host

  // #region Start the renderer

  // Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
  /* class AppUpdater {
  constructor() {
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();
  }
} */

  // Keep a global reference of the window object. If you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow: BrowserWindow | undefined;

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
    const extensions = [installer.REACT_DEVELOPER_TOOLS];
    return installer.default(extensions, forceDownload).catch(logger.info);
  }

  function getAssetPath(...paths: string[]): string {
    return path.join(globalThis.resourcesPath, 'assets', ...paths);
  }

  /** Sets up the electron BrowserWindow renderer process */
  const createWindow = async () => {
    if (isDebug) {
      await installExtensions();
    }

    // Load the previous state with fallback to defaults
    const mainWindowState = windowStateKeeper({
      defaultWidth: 1024,
      defaultHeight: 728,
    });

    mainWindow = new BrowserWindow({
      show: false,
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    // Set our custom protocol handler to load assets from extensions
    extensionAssetProtocolService.initialize();

    // Register listeners on the window, so the state is updated automatically
    // (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(mainWindow);

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = undefined;
    });

    // 'null' to interact with external API
    // eslint-disable-next-line no-null/no-null
    mainWindow.setMenu(null);

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((handlerDetails) => {
      shell.openExternal(handlerDetails.url);
      return { action: 'deny' };
    });

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

  let isClosing = false;
  app.on('will-quit', async (e) => {
    if (!isClosing) {
      // Prevent closing before graceful shutdown is complete.
      // Also, in the future, this should allow a "are you sure?" dialog to display.
      e.preventDefault();
      isClosing = true;

      networkService.shutdown();
      await Promise.all([
        dotnetDataProvider.waitForClose(PROCESS_CLOSE_TIME_OUT),
        extensionHostService.waitForClose(PROCESS_CLOSE_TIME_OUT),
      ]);

      // In development, the dotnet watcher was killed so we have to wait here.
      if (process.env.NODE_ENV !== 'production') await wait(500);

      app.quit();
    } else {
      dotnetDataProvider.kill();
      extensionHostService.kill();
    }
  });

  /** Map from ipc channel to handler function. Use with ipcRenderer.invoke */
  const ipcHandlers: {
    [ipcChannel: SerializedRequestType]: (
      event: IpcMainInvokeEvent,
      // We don't know the exact parameter types since ipc handlers can be anything
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => Promise<unknown> | unknown;
  } = {
    'electronAPI:env.test': (_event, message: string) => `From main.ts: test ${message}`,
  };

  app
    .whenReady()
    // eslint-disable-next-line promise/always-return
    .then(() => {
      // Set up ipc handlers
      Object.entries(ipcHandlers).forEach(([ipcChannel, ipcHandler]) =>
        ipcMain.handle(ipcChannel, ipcHandler),
      );

      createWindow();
      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (!mainWindow) createWindow();
      });

      return undefined;
    })
    .catch(logger.info);

  Object.entries(ipcHandlers).forEach(([ipcHandle, handler]) => {
    networkService.registerRequestHandler(
      // Re-assert type after passing through `forEach`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ipcHandle as SerializedRequestType,
      // Handle with an empty event.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      async (...args: unknown[]) => handler({} as IpcMainInvokeEvent, ...args),
    );
  });

  // #endregion

  // #region Register command handlers

  Object.entries(commandHandlers).forEach(([commandName, handler]) => {
    // Re-assert type after passing through `forEach`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    commandService.registerCommand(commandName as CommandNames, handler);
  });

  // #endregion
}

async function restartExtensionHost() {
  await extensionHostService.waitForClose(PROCESS_CLOSE_TIME_OUT);
  await extensionHostService.start();
}

(async () => {
  logger.info('Starting main');
  await main();
  logger.info('Main is complete');
})().catch(logger.error);
