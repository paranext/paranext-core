/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import windowStateKeeper from 'electron-window-state';
import dotnetDataProvider from '@main/services/dotnet-data-provider.service';
import logger from '@shared/util/logger';
import * as NetworkService from '@shared/services/NetworkService';
import papi from '@shared/services/papi';
import { CommandHandler } from '@shared/util/PapiUtil';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// #region ELECTRON SETUP

class AppUpdater {
  constructor() {
    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Keep a global reference of the window object. If you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

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
    .catch(logger.log);
};

/** The path to the app package directory */
const RESOURCES_PATH = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, '../../');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, 'assets', ...paths);
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
  new AppUpdater();
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    // TODO: cleanly stop the provider (close the ws or send command) - IJH 2022-02-23
    dotnetDataProvider.kill();
    app.quit();
  }
});

app.on('will-quit', () => {
  // TODO: cleanly stop the provider (close the ws or send command) - IJH 2022-02-23
  dotnetDataProvider.kill();
});

// #endregion

// #region IPC HANDLING SETUP

/** Map from ipc channel to handler function */
const ipcHandlers: {
  [ipcHandle: string]: (
    event: Electron.IpcMainInvokeEvent,
    // We don't know the exact parameter types since ipc handlers can be anything
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<unknown> | unknown;
} = {
  'electronAPI.env.getVar': (_event, name: string) => process.env[name],
  'electronAPI.env.test': (_event) => 'From main.ts: test',
};

app
  .whenReady()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    // Set up ipc handlers
    Object.keys(ipcHandlers).forEach((ipcHandle) =>
      ipcMain.handle(ipcHandle, ipcHandlers[ipcHandle]),
    );

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(logger.log);

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  echo: async (message: string) => {
    /* const start = performance.now(); */
    /* const result =  */ await papi.commands.sendCommand('addThree', 1, 4, 9);
    /* logger.log(
      `addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return message;
  },
  throwError: async (message: string) => {
    throw new Error(`Test Error thrown in throwError command: ${message}`);
  },
};

(async () => {
  await NetworkService.initialize();
  // Set up test handlers
  Object.entries(ipcHandlers).forEach(([ipcHandle, handler]) => {
    NetworkService.registerRequestHandler(
      ipcHandle,
      async (...args: unknown[]) =>
        handler({} as Electron.IpcMainInvokeEvent, ...args),
    );
  });
  Object.entries(commandHandlers).forEach(([commandName, handler]) => {
    papi.commands.registerCommand(commandName, handler);
  });

  // Start the dotnet data provider early so its ready when needed once the
  // WebSocket is up.
  dotnetDataProvider.start();
})().catch(logger.error);

// #endregion
