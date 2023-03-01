import { isClient } from '@shared/util/InternalUtil';
import * as NetworkService from '@shared/services/NetworkService';
import papi from '@shared/services/papi';
import { CommandHandler } from '@shared/util/PapiUtil';
import { ProcessType } from '@shared/globalThis';
import polyfillLocalStorage from '@node/polyfill/LocalStorage';
import * as ExtensionService from '@extension-host/services/ExtensionService';
import logger from '@shared/util/logger';

// #region command-line arguments

const isPackaged = process.argv.includes('--packaged');
const resourcesPathIndex = process.argv.indexOf('--resourcesPath');
const resourcesPath =
  resourcesPathIndex >= 0 && process.argv.length > resourcesPathIndex + 1
    ? process.argv[resourcesPathIndex + 1]
    : 'resources://';

// #endregion

// #region globalThis setup

globalThis.processType = ProcessType.ExtensionHost;
globalThis.isPackaged = isPackaged;
globalThis.resourcesPath = resourcesPath;

// #endregion

// #region polyfills

polyfillLocalStorage();

// #endregion

// #region Test logs

logger.log('Hello from the extension host!');
logger.log(`Extension host is${isClient() ? '' : ' not'} client`);
logger.log(`Extension host process.type = ${process.type}`);
logger.log(`Extension host process.env.NODE_ENV = ${process.env.NODE_ENV}`);
logger.warn('Extension host example warning');

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  addMany: async (...nums: number[]) => {
    /* const start = performance.now(); */
    /* const result = await papi.commands.sendCommand('addThree', 1, 4, 9); */
    /* logger.log(
      `addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return nums.reduce((acc, current) => acc + current, 0);
  },
  throwErrorExtensionHost: async (message: string) => {
    throw new Error(
      `Test Error thrown in throwErrorExtensionHost command: ${message}`,
    );
  },
  getResourcesPath: async () => globalThis.resourcesPath,
};

NetworkService.initialize()
  .then(() => {
    // Set up test handlers
    Object.entries(commandHandlers).forEach(([commandName, handler]) => {
      papi.commands.registerCommand(commandName, handler);
    });

    // TODO: Probably should return Promise.all of these registrations
    return undefined;
  })
  .catch((e) => logger.error(e));

// Need to wait a bit to initialize extensions in production because the extension host launches faster than the renderer.
// TODO: Fix this so we can await renderer connecting event or something
setTimeout(
  () => {
    ExtensionService.initialize();
  },
  globalThis.isPackaged ? 3000 : 0,
);

// #endregion
