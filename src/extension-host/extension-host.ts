import '@extension-host/global-this.model';
import { isClient } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import papi from '@shared/services/papi.service';
import { CommandHandler } from '@shared/utils/papi-util';
import * as ExtensionService from '@extension-host/services/extension.service';
import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';

// #region Test logs

logger.info('Starting extension-host');
logger.info(`Extension host is${isClient() ? '' : ' not'} client`);
logger.info(`Extension host process.type = ${process.type}`);
logger.info(`Extension host process.env.NODE_ENV = ${process.env.NODE_ENV}`);
logger.warn('Extension host example warning');

// #endregion

// #region Services setup

const commandHandlers: { [commandName: string]: CommandHandler } = {
  addMany: async (...nums: number[]) => {
    /* const start = performance.now(); */
    /* const result = await papi.commands.sendCommand('addThree', 1, 4, 9); */
    /* logger.info(
      `addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return nums.reduce((acc, current) => acc + current, 0);
  },
  throwErrorExtensionHost: async (message: string) => {
    throw new Error(`Test Error thrown in throwErrorExtensionHost command: ${message}`);
  },
  getResourcesPath: async () => globalThis.resourcesPath,
};

networkService
  .initialize()
  .then(() => {
    // Set up test handlers
    Object.entries(commandHandlers).forEach(([commandName, handler]) => {
      papi.commands.registerCommand(commandName, handler);
    });

    // TODO: Probably should return Promise.all of these registrations
    return undefined;
  })
  .catch(logger.error);

// Need to wait a bit to initialize extensions in production because the extension host launches faster than the renderer.
// TODO: Fix this so we can await renderer connecting event or something
setTimeout(
  () => {
    ExtensionService.initialize();
  },
  globalThis.isPackaged ? 3000 : 0,
);

// #endregion

// #region network object test

(async () => {
  let testMainInfo = await networkObjectService.get<{
    doStuff: (stuff: string) => Promise<string>;
  }>('test-main');
  if (testMainInfo) {
    const unsub = testMainInfo?.onDidDispose(async () => {
      logger.info('Disposed of test-main!');
      testMainInfo = undefined;
      unsub();

      const testEHInfo = await networkObjectService.set('test-extension-host', {
        getVerse: async () => {
          const verse = await fetch('https://bible-api.com/matthew+24:14');
          const verseJson = await verse.json();
          const results = `test-extension-host got verse: ${verseJson.text.replace(/\\n/g, '')}`;
          logger.info(results);
          return results;
        },
      });

      if (testEHInfo) {
        const unsub2 = testEHInfo.onDidDispose(() => {
          logger.info('Disposed of test-extension-host!');
          unsub2();
        });
      }

      setTimeout(testEHInfo.dispose, 10000);
    });
  }

  logger.info(`do stuff: ${await testMainInfo?.networkObject.doStuff('extension host things')}`);
})();

// #endregion
