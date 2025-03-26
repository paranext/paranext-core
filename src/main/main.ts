/**
 * This module executes inside of electron's main process. You can start electron renderer process
 * from here and communicate with the other processes through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to `./src/main.js`
 * using webpack. This gives us some performance wins.
 */

import os from 'os';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
// Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
/* import { autoUpdater } from 'electron-updater'; */
import windowStateKeeper from 'electron-window-state';
import '@main/global-this.model';
import { dotnetDataProvider } from '@main/services/dotnet-data-provider.service';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import * as commandService from '@shared/services/command.service';
import { resolveHtmlPath } from '@node/utils/util';
import { extensionHostService } from '@main/services/extension-host.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { extensionAssetProtocolService } from '@main/services/extension-asset-protocol.service';
import { wait, serialize } from 'platform-bible-utils';
import { CommandNames } from 'papi-shared-types';
import { SerializedRequestType } from '@shared/utils/util';
import { get } from '@shared/services/project-data-provider.service';
import { startNetworkObjectStatusService } from '@main/services/network-object-status.service-host';
import { APP_URI_SCHEME, DEV_MODE_RENDERER_INDICATOR } from '@shared/data/platform.data';
import { startProjectLookupService } from '@main/services/project-lookup.service-host';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { GET_METHODS } from '@shared/data/rpc.model';
import { HANDLE_URI_REQUEST_TYPE } from '@node/services/extension.service-model';
import { startDataProtectionService } from '@main/services/data-protection.service-host';
import { startAppService } from '@main/services/app.service-host';

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
/**
 * If this is `true`, we will restart soon. Not just using `isClosing` because we need to make sure
 * we only run `relaunch` once which has a slightly different use case than `isClosing`
 */
let willRestart = false;

/**
 * Open a link in the browser following the restrictions we put in place in Platform.Bible
 *
 * Make sure not to allow just any link. See
 * https://benjamin-altpeter.de/shell-openexternal-dangers/
 */
async function openExternal(url: string) {
  if (!url.startsWith('https://') && !url.startsWith(`${APP_URI_SCHEME}://`))
    throw new Error(`External URL must start with 'https://' or '${APP_URI_SCHEME}://: ${url}`);
  try {
    await shell.openExternal(url);
  } catch (e) {
    logger.warn(e);
    throw e;
  }

  return true;
}

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
  await extensionHostService.start();

  // TODO (maybe): Wait for signal from the extension host process that it is ready (except 'getWebView')
  // We could then wait for the renderer to be ready and signal the extension host

  // Keep a global reference of the window object. If you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow: BrowserWindow | undefined;

  // #region Set up the protocol client to receive navigation to this app's URI scheme

  // Launch the portable app if we're in it; otherwise use the normal path
  const launchPath = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const args = process.argv.slice(1);

  function handleUri(uri: string) {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
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
  app.setAsDefaultProtocolClient(APP_URI_SCHEME, launchPath, args);
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
      minWidth: 800, // TODO: Remove this temporary enforcement when https://paratextstudio.atlassian.net/browse/PT-2333 is implemented
      icon: getAssetPath('icon.png'),
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      ...(process.platform !== 'linux' ? { titleBarStyle: 'hidden' } : {}),
      // re-add window controls
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      ...(process.platform !== 'darwin' && process.platform !== 'linux'
        ? {
            titleBarOverlay: {
              height: 47,
              color: 'hsla(0, 0%, 100%, 0)', // transparent button background until hovered
            },
          }
        : {}),
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

    mainWindow.loadURL(
      `${resolveHtmlPath('index.html')}${globalThis.isNoisyDevModeEnabled ? DEV_MODE_RENDERER_INDICATOR : ''}`,
    );

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
    // Note that webviews can get to this handler with window.open and anchor tags with
    // target="_blank". Please revise web-view.service-host.ts as necessary if you make changes here
    mainWindow.webContents.setWindowOpenHandler((handlerDetails) => {
      // Only allow https urls
      (async () => {
        try {
          openExternal(handlerDetails.url);
        } catch (e) {
          logger.warn(
            `Main could not open external url ${handlerDetails.url} from windowOpenHandler. ${e}`,
          );
        }
      })();

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

  app
    .whenReady()
    // eslint-disable-next-line promise/always-return
    .then(() => {
      // Set up ipc handlers
      ipcMain.handle(
        'electronAPI:env.test',
        (_event, message: string) => `From main.ts: test ${message}`,
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
  logger.info('Starting main');
  await main();
  logger.info('Main is complete');
})().catch(logger.error);
