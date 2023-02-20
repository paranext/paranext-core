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
import log from 'electron-log';
import * as NetworkService from '@shared/services/NetworkService';
import papi from '@shared/services/papi';
import { CommandHandler } from '@shared/util/PapiUtil';
import windowStateKeeper from 'electron-window-state';
import { fork, spawn } from 'child_process';
import { ProcessType } from '@shared/globalThis';
import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import { resolveHtmlPath } from '@node/util/util';
import MenuBuilder from './menu';

// #region globalThis setup

globalThis.processType = ProcessType.Main;
globalThis.isPackaged = app.isPackaged;

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion

// #region ELECTRON SETUP

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
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
    .catch(console.log);
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
    app.quit();
  }
});

// #endregion

// #region IPC HANDLING SETUP

/** Map from ipc channel to handler function. Use with ipcRenderer.invoke */
const ipcHandlers: {
  [ipcChannel: string]: (
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
  .catch(console.log);

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  echo: async (message: string) => {
    return message;
  },
  echoRenderer: async (message: string) => {
    /* const start = performance.now(); */
    /* const result =  */ await papi.commands.sendCommand('addThree', 1, 4, 9);
    /* console.log(
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

NetworkService.initialize()
  .then(() => {
    // Set up test handlers
    Object.entries(ipcHandlers).forEach(([ipcChannel, handler]) => {
      NetworkService.registerRequestHandler(
        ipcChannel,
        async (...args: unknown[]) =>
          handler({} as Electron.IpcMainInvokeEvent, ...args),
      );
    });
    Object.entries(commandHandlers).forEach(([commandName, handler]) => {
      papi.commands.registerCommand(commandName, handler);
    });

    // TODO: Probably should return Promise.all of these registrations
    return undefined;
  })
  .catch((e) => console.error(e));

// #endregion

// #region Extension Host

const formatExtensionHostLog = (message: string, tag = '') => {
  const messageNoEndLine = message.trimEnd();
  const openTag = `{eh${tag ? ' ' : ''}${tag}}`;
  const closeTag = `{/eh${tag ? ' ' : ''}${tag}}`;
  if (messageNoEndLine.includes('\n'))
    // Multi-line
    return `${openTag}\n${messageNoEndLine}\n${closeTag}`;
  return `${openTag} ${messageNoEndLine} ${closeTag}`;
};

// In production, fork a new process for the extension host
// In development, spawn nodemon to watch the extension-host
const extensionHost = app.isPackaged
  ? fork(
      path.join(__dirname, '../extension-host/extension-host.js'),
      ['--packaged'],
      {
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      },
    )
  : spawn(
      process.platform.includes('win') ? 'npm.cmd' : 'npm',
      ['run', 'start:extension-host'],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );

if (!extensionHost.stderr || !extensionHost.stdout)
  console.error(
    "Could not connect to extension host's stderr or stdout! You will not see extension host console logs here.",
  );
else if (process.env.IN_VSCODE !== 'true') {
  // When launched from VSCode, don't re-print the console stuff because it somehow shows it already
  extensionHost.stderr.on('data', (data) =>
    console.error(formatExtensionHostLog(data.toString(), 'err')),
  );
  extensionHost.stdout.on('data', (data) =>
    console.log(formatExtensionHostLog(data.toString())),
  );
}

extensionHost.on('exit', () => console.warn('extensionHost just exited!'));

setTimeout(async () => {
  console.log(
    `Add Many (from EH): ${await papi.commands.sendCommand(
      'addMany',
      2,
      5,
      9,
      7,
    )}`,
  );
}, 3000);

// #endregion
