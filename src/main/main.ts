/* eslint global-require: off, no-console: off, promise/always-return: off */

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
import { NetworkConnectorInfo } from '@shared/data/InternalConnectionTypes';
import * as NetworkService from '@shared/services/NetworkService';
import papi from '@shared/services/papi';
import { CommandHandler } from '@shared/util/PapiUtil';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

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
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

/** Install extensions into the Chromium renderer process */
const installExtensions = async () => {
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

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

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

// #region EDGE SETUP

const namespace = 'EdgeLibrary';

/** OS name for C# project build folder */
let buildFolderOS: string;
switch (process.platform) {
  case 'win32':
    buildFolderOS = 'win';
    break;
  case 'darwin':
    buildFolderOS = 'osx';
    break;
  case 'linux':
    buildFolderOS = 'linux';
    break;
  default:
    buildFolderOS = 'win';
    console.warn(
      `Edge Setup: Operating System ${process.platform} is apparently not supported. Trying win`,
    );
    break;
}
/** Architecture name for C# project build folder */
let buildFolderArch: string;
if (process.platform === 'darwin' && process.arch.startsWith('arm')) {
  if (process.arch !== 'arm64')
    console.warn(
      `Edge Setup: OS Architecture is ${process.arch}, but we only have x64 and arm64. Trying arm64.`,
    );
  buildFolderArch = 'arm64';
} else {
  if (process.arch !== 'x64')
    console.warn(
      `Edge Setup: Architecture is ${process.arch}, but we only have x64${
        process.platform === 'darwin' ? ' and arm64' : ''
      }. Trying x64.`,
    );
  buildFolderArch = 'x64';
}

const baseNetAppPath = path.join(
  RESOURCES_PATH,
  `/c-sharp/bin/${
    app.isPackaged
      ? `Release/net6.0/publish/${buildFolderOS}-${buildFolderArch}`
      : 'Debug/net6.0'
  }`,
);
process.env.EDGE_USE_CORECLR = '1';
process.env.EDGE_APP_ROOT = baseNetAppPath;
// TODO: try removing when we get production edge working. I don't think this is required
if (app.isPackaged)
  process.env.EDGE_BOOTSTRAP_DIR = path.join(
    RESOURCES_PATH,
    '/app.asar/node_modules/electron-edge-js/lib/bootstrap/obj/Release/netcoreapp1.1',
  );
let edge: typeof import('electron-edge-js');
const edgePromise = import('electron-edge-js').then((importedEdge) => {
  edge = importedEdge;
});

const baseDll = path.join(baseNetAppPath, `${namespace}.dll`);

/** Map of generated and wrapped edge functions to call on invoking edge functions */
const edgeFuncs = new Map<string, (args?: unknown) => Promise<unknown>>();

/**
 * Give edge error information including C# stack trace if there is one.
 * Note: Edge errors have the following keys: Message,TypeName,Data,InnerException,TargetSite,StackTrace,HelpLink,Source,HResult,message,name
 * TODO: Remove this before we get to production? This is a security violation. Not supposed to give stack traces to users. But maybe it doesn't matter since we're open source
 * @param e edge error about which to get information
 * @returns error information string
 */
const getEdgeErrorInfo = (e: Error & { StackTrace?: string }): string =>
  `${e.toString()}${e.StackTrace ? ` Stack Trace: ${e.StackTrace}.` : e}`;

/**
 * Creates an edge function that asynchronously calls C# and returns a promise
 * @param ns namespace for edge function
 * @param className class name for edge function
 * @param method method name for edge function
 * @returns promise that resolves with the results of the edge function call and rejects on exceptions
 */
async function createEdgeFunc<TParam, TReturn>(
  ns: string,
  className: string,
  method: string,
) {
  try {
    // Wait for the edge dynamic import
    await edgePromise;
    // Load up an edge function with the specs provided
    const edgeFunc = edge.func({
      assemblyFile: baseDll,
      typeName: `${ns}.${className}`,
      methodName: method,
    });
    // Wrap the edge function in a promise function
    return (args: TParam) =>
      new Promise<TReturn>((resolve, reject) => {
        try {
          edgeFunc(args, (error: Error, result: unknown) => {
            if (error) {
              console.error(
                'Error in callback! Under what conditions does this occur?',
                error,
              );
              reject(new Error(getEdgeErrorInfo(error)));
            }
            resolve(result as TReturn);
          });
        } catch (error) {
          // Exceptions thrown in the C# code are caught here
          reject(
            new Error(
              `edge.func failed to run! ${getEdgeErrorInfo(error as Error)}`,
            ),
          );
        }
      });
  } catch (error) {
    // Exceptions thrown while building the edge.func are caught here
    throw new Error(
      `edge.func failed to build! ${getEdgeErrorInfo(error as Error)}`,
    );
  }
}

/**
 * Invokes an edge method
 * @param classMethod Class name and method to call in dot notation like ClassName.Method
 * @param args arguments to pass into the method
 * @returns Promise that resolves with the return from the called method
 */
async function invoke(classMethod: string, args: unknown) {
  if (!classMethod) throw Error('No method provided');

  const addressParts = classMethod.split('.', 3);
  if (addressParts.length < 2)
    throw Error('Must provide class and method like Class.Method');

  // Namespace has a default, but the classMethod can provide one if desired
  let ns = namespace;
  let className = '';
  let method = '';
  // Namespace provided
  if (addressParts.length === 3) {
    [ns, className, method] = addressParts;
  } else {
    [className, method] = addressParts;
  }

  // fully specified namespace, class, and method
  const fullClassMethod = `${ns}.${className}.${method}`;

  // See if we can find an existing edgefunc for this Namespace.Class.Method
  let edgeFunc = edgeFuncs.get(fullClassMethod);

  if (!edgeFunc) {
    // Didn't find an edgeFunc, so create one
    edgeFunc = await createEdgeFunc(ns, className, method);
    edgeFuncs.set(fullClassMethod, edgeFunc);
  }

  return edgeFunc(args);
}

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
  'electronAPI.edge.invoke': (_event, classMethod: string, args: unknown) =>
    invoke(classMethod, args),
  'electronAPI.env.getVar': (_event, name: string) => process.env[name],
  'electronAPI.env.test': (_event) => 'From main.ts: test',
  'electronAPI.client.getConnectorInfo': (event) =>
    ({ clientId: event.sender.id } as NetworkConnectorInfo),
  /** Actions to perform when the client is finished connecting */
  'electronAPI.client.notifyClientConnected': (
    event,
    connectorInfo: NetworkConnectorInfo,
  ) => {
    if (event.sender.id !== connectorInfo.clientId) {
      throw new Error(
        'connectorInfo.clientId does not match id assigned by main process',
      );
    }
    console.log(`Client finished connecting: ${connectorInfo.clientId}`);
  },
};

app
  .whenReady()
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
  .catch(console.log);

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  echo: async (message: string) => {
    /* const start = performance.now(); */
    const result = await papi.commands.sendCommand('addThree', 1, 4, 9);
    /* console.log(
      `addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return message;
  },
};

NetworkService.initialize()
  .then(() => {
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
  })
  .catch((e) => console.error(e));

// #endregion
