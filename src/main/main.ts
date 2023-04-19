/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
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
import papi from '@shared/services/papi.service';
import { CommandHandler } from '@shared/utils/papi-util';
import { resolveHtmlPath } from '@node/utils/util';
import MenuBuilder from '@main/menu.model';
import extensionHostService from '@main/services/extension-host.service';
import networkObjectService from '@shared/services/network-object.service';
import { wait } from '@shared/utils/util';

const PROCESS_CLOSE_TIME_OUT = 2000;

let isClosing = false;

logger.info('Starting main');

// #region ELECTRON SETUP

// Removed until we have a release. See https://github.com/paranext/paranext-core/issues/83
/* class AppUpdater {
  constructor() {
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();
  }
} */

// Keep a global reference of the window object. If you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // eslint-disable-next-line global-require
  require('electron-debug')();
}

/** Install extensions into the Chromium renderer process */
const installExtensions = async () => {
  // eslint-disable-next-line global-require
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(logger.info);
};

const getAssetPath = (...paths: string[]): string => {
  return path.join(globalThis.resourcesPath, 'assets', ...paths);
};

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
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
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

app.on('will-quit', async (e) => {
  if (!isClosing) {
    // Prevent closing before graceful shutdown is complete.
    // Also, in the future, this should allow a "are you sure?" dialog to display.
    e.preventDefault();
    isClosing = true;

    networkService.shutdown();
    await Promise.all([
      dotnetDataProvider.wait(PROCESS_CLOSE_TIME_OUT),
      extensionHostService.wait(PROCESS_CLOSE_TIME_OUT),
    ]);

    // In development, the dotnet watcher was killed so we have to wait here.
    if (process.env.NODE_ENV !== 'production') await wait(500);

    app.quit();
  } else {
    dotnetDataProvider.kill();
    extensionHostService.kill();
  }
});

// #endregion

// #region IPC HANDLING SETUP

/** Map from ipc channel to handler function. Use with ipcRenderer.invoke */
const ipcHandlers: {
  [ipcChannel: string]: (
    event: IpcMainInvokeEvent,
    // We don't know the exact parameter types since ipc handlers can be anything
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<unknown> | unknown;
} = {
  'electronAPI.env.test': (_event, message: string) => `From main.ts: test ${message}`,
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
      if (mainWindow === null) createWindow();
    });

    return undefined;
  })
  .catch(logger.info);

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  echo: async (message: string) => {
    return message;
  },
  echoRenderer: async (message: string) => {
    /* const start = performance.now(); */
    /* const result =  */ await papi.commands.sendCommand('addThree', 1, 4, 9);
    /* logger.info(
      `addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return message;
  },
  echoExtensionHost: async (message: string) => {
    await papi.commands.sendCommand('addMany', 3, 5, 7, 1, 4);
    return message;
  },
  throwError: async (message: string) => {
    throw new Error(`Test Error thrown in throwError command: ${message}`);
  },
};

(async () => {
  await networkService.initialize();
  // Set up test handlers
  Object.entries(ipcHandlers).forEach(([ipcHandle, handler]) => {
    networkService.registerRequestHandler(ipcHandle, async (...args: unknown[]) =>
      handler({} as IpcMainInvokeEvent, ...args),
    );
  });
  Object.entries(commandHandlers).forEach(([commandName, handler]) => {
    papi.commands.registerCommand(commandName, handler);
  });

  // Start the dotnet data provider early so its ready when needed once the
  // WebSocket is up.
  dotnetDataProvider.start();

  // TODO: Probably should return Promise.all of these registrations
  return undefined;
})().catch(logger.error);

// #endregion

// #region Extension Host

extensionHostService.start();

setTimeout(async () => {
  logger.info(`Add Many (from EH): ${await papi.commands.sendCommand('addMany', 2, 5, 9, 7)}`);
}, 20000);

// #endregion

// #region network object test

(async () => {
  const testMain = {
    doStuff: (stuff: string) => {
      const result = `test-main did stuff: ${stuff}!`;
      logger.info(result);
      return result;
    },
    dispose: () => {
      logger.info('testMain.dispose() ran in test-main');
    },
  };

  const testMainDisposer = await networkObjectService.set('test-main', testMain);
  testMain.doStuff('main things');
  testMainDisposer.onDidDispose(() => {
    logger.info('test-main disposed in main message #1');
  });
  testMainDisposer.onDidDispose(() => {
    logger.info('test-main disposed in main message #2');
  });

  setTimeout(testMainDisposer.dispose, 10000);
})();

setTimeout(async () => {
  let testExtensionHost = await networkObjectService.get<{
    getVerse: () => Promise<string>;
  }>('test-extension-host');
  if (testExtensionHost) {
    logger.info(`get verse: ${await testExtensionHost.getVerse()}`);
    testExtensionHost.onDidDispose(() => {
      logger.info('test-extension-host disposed in main');
      testExtensionHost = undefined;
    });
  } else logger.error('Could not get test-extension-host from main');
}, 5000);

// #endregion
