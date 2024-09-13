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
import networkObjectService from '@shared/services/network-object.service';
import extensionAssetProtocolService from '@main/services/extension-asset-protocol.service';
import { wait, serialize } from 'platform-bible-utils';
import { CommandNames } from 'papi-shared-types';
import { SerializedRequestType } from '@shared/utils/util';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { get } from '@shared/services/project-data-provider.service';
import { VerseRef } from '@sillsdev/scripture';
import { startNetworkObjectStatusService } from '@main/services/network-object-status.service-host';
import { DEV_MODE_RENDERER_INDICATOR, WINDOW_ID } from '@shared/data/platform.data';
import { startProjectLookupService } from '@main/services/project-lookup.service-host';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';

const PROCESS_CLOSE_TIME_OUT = 2000;

async function main() {
  // The network service relies on nothing else, and other things rely on it, so start it first
  await networkService.initialize();

  // The network object status service relies on seeing everything else start up later
  await startNetworkObjectStatusService();

  // The project lookup service relies on the network object status service
  await startProjectLookupService();

  // The .NET data provider relies on the network service and nothing else
  dotnetDataProvider.start();

  // TODO (maybe): Wait for signal from the .NET data provider process that it is ready

  // The extension host service relies on the network service.
  // Extensions inside the extension host might rely on the .NET data provider and each other
  // Some extensions inside the extension host rely on the renderer to accept 'getWebView' commands.
  // The renderer relies on the extension host, so something has to break the dependency loop.
  // For now, the dependency loop is broken by retrying 'getWebView' in a loop for a while.
  await extensionHostService.start();

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

  // Keep a global reference of the window objects. If you don't, the windows will
  // be closed automatically when the JavaScript objects are garbage collected.
  const windows: BrowserWindow[] = [];

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

  /** Sets up an electron BrowserWindow renderer process */
  const createWindow = async () => {
    if (isDebug) {
      await installExtensions();
    }

    let newWindow: BrowserWindow | undefined = new BrowserWindow({
      show: false,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    const newWindowState: windowStateKeeper.State = windowStateKeeper({
      file: `window-state-${newWindow.id}.json`,
      defaultWidth: 1024,
      defaultHeight: 728,
    });

    // Set our custom protocol handler to load assets from extensions
    extensionAssetProtocolService.initialize();

    // Register listeners on the window, so the state is updated automatically
    // (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    newWindowState.manage(newWindow);

    newWindow.loadURL(
      `${resolveHtmlPath('index.html')}${`?${WINDOW_ID}=${newWindow.id}`}${globalThis.isNoisyDevModeEnabled ? `&${DEV_MODE_RENDERER_INDICATOR}` : ''}`,
    );

    newWindow.on('ready-to-show', () => {
      if (!newWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        newWindow.minimize();
      } else {
        newWindow.show();
      }
    });

    newWindow.on('closed', () => {
      newWindow = undefined;
    });

    // 'null' to interact with external API
    // eslint-disable-next-line no-null/no-null
    newWindow.setMenu(null);

    // Open urls in the user's browser
    // Note that webviews can get to this handler with window.open and anchor tags with
    // target="_blank". Please revise web-view.service-host.ts as necessary if you make changes here
    newWindow.webContents.setWindowOpenHandler((handlerDetails) => {
      // Only allow https urls
      if (handlerDetails.url?.startsWith('https://')) shell.openExternal(handlerDetails.url);

      return { action: 'deny' };
    });

    windows.push(newWindow);

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
        if (!windows) createWindow();
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

  // #region Register commands

  // `main.ts`'s command handler declarations are in `command.service.ts` so they can be picked up
  // by papi-dts
  // This map should allow any functions because commands can be any function type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commandHandlers: { [commandName: string]: (...args: any[]) => any } = {
    'platform.restartExtensionHost': async () => {
      restartExtensionHost();
    },
    'platform.createWindow': async () => {
      createWindow();
    },
    'platform.quit': async () => {
      app.quit();
    },
  };

  Object.entries(commandHandlers).forEach(([commandName, handler]) => {
    // Re-assert type after passing through `forEach`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    commandService.registerCommand(commandName as CommandNames, handler);
  });

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
        `Available network objects after 30 seconds: ${serialize(
          await networkObjectStatusService.getAllNetworkObjectDetails(),
        )}`,
      );
    }, 30000);

    // Get a data provider and do something with it
    setTimeout(async () => {
      const usxPdp = await get(
        'platformScripture.USX_Chapter',
        '32664dc3288a28df2e2bb75ded887fc8f17a15fb',
      );
      const verse = await usxPdp.getChapterUSX(new VerseRef('JHN', '1', '1'));
      logger.info(`Got PDP data: ${verse}`);

      if (verse !== undefined) await usxPdp.setChapterUSX(new VerseRef('JHN', '1', '1'), verse);

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
  await extensionHostService.waitForClose(PROCESS_CLOSE_TIME_OUT);
  logger.debug('Extension host closed, restarting now');
  await extensionHostService.start();
}

(async () => {
  logger.info('Starting main');
  await main();
  logger.info('Main is complete');
})().catch(logger.error);
