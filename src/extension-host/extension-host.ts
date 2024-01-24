import '@extension-host/global-this.model';
import { isClient } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import * as extensionService from '@extension-host/services/extension.service';
import { fetch as papiFetch } from '@extension-host/services/papi-backend.service';
import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';
import dataProviderService from '@shared/services/data-provider.service';
import extensionAssetService from '@shared/services/extension-asset.service';
import { getErrorMessage } from 'platform-bible-utils';
import { CommandNames } from 'papi-shared-types';
import { startProjectLookupService } from '@extension-host/services/project-lookup.service-host';
import { registerCommand } from '@shared/services/command.service';
import { startMenuStoreService } from './services/menu-store.service-host';

// #region Test logs

logger.info('Starting extension-host');
logger.info(`Extension host is${isClient() ? '' : ' not'} client`);
logger.info(`Extension host process.env.NODE_ENV = ${process.env.NODE_ENV}`);
logger.warn('Extension host example warning');

// #endregion

// #region Services setup

// `extension-host.ts`'s command handler declarations are in `command.service.ts` so they can be
// picked up by papi-dts
// This map should allow any functions because commands can be any function type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commandHandlers: { [commandName: string]: (...args: any[]) => any } = {
  // Set up test handlers
  'test.addMany': async (...nums: number[]) => {
    /* const start = performance.now(); */
    /* const result = await papi.commands.sendCommand('test.addThree', 1, 4, 9); */
    /* logger.info(
      `test.addThree(...) = ${result} took ${performance.now() - start} ms`,
    ); */
    return nums.reduce((acc, current) => acc + current, 0);
  },
  'test.throwErrorExtensionHost': async (message: string) => {
    throw new Error(`Test Error thrown in throwErrorExtensionHost command: ${message}`);
  },
};

networkService
  .initialize()
  .then(async () => {
    // Set up network commands
    await Promise.all(
      Object.entries(commandHandlers).map(async ([commandName, handler]) => {
        // Re-assert type after passing through `map`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        await registerCommand(commandName as CommandNames, handler);
      }),
    );

    // The extension host is the only one that can initialize the extensionAssetService
    await extensionAssetService.initialize();

    // Make sure project lookups are available before extensions look for them on PAPI
    await startProjectLookupService();

    await startMenuStoreService();

    // The extension service locks down importing other modules, so be careful what runs after it
    await extensionService.initialize();

    // TODO: Probably should return Promise.all of these registrations
    return undefined;
  })
  .catch(logger.error);

// #endregion

// #region network object test

(async () => {
  const testEH = await networkObjectService.set('testExtensionHost', {
    getVerse: async () => {
      try {
        const exampleData = await (await papiFetch('https://www.example.com')).text();
        const results = `testExtensionHost got data: ${exampleData.substring(0, 100)}`;
        logger.debug(results);
        return results;
      } catch (e) {
        logger.error(`testExtensionHost.getVerse() threw ${e}`);
        return getErrorMessage(e);
      }
    },
  });

  if (testEH) {
    testEH.onDidDispose(() => {
      logger.info('testExtensionHost disposed in extension-host');
    });
  }

  setTimeout(testEH.dispose, 10000);
})();

setTimeout(async () => {
  let testMain = await networkObjectService.get<{
    doStuff: (stuff: string) => Promise<string>;
  }>('testMain');
  if (testMain) {
    testMain?.onDidDispose(async () => {
      logger.debug('testMain disposed in extension-host');
      testMain = undefined;
    });
  } else logger.error('Could not get testMain from extension host');

  logger.debug(`do stuff: ${await testMain?.doStuff('extension host things')}`);
}, 5000);

// This is just testing dispose on data providers
(async () => {
  const testDP = {
    set: () => {
      throw new Error('I am a bad data provider');
    },
    get: () => {
      throw new Error('I am a bad data provider');
    },
    dispose: async () => {
      logger.debug('Inside testDP dispose');
      return Promise.resolve(true);
    },
  };

  const realDP = await dataProviderService.registerEngine('testDP', testDP);
  realDP.onDidDispose(() => {
    logger.debug('testDP onDidDispose ran');
  });
  setTimeout(realDP.dispose, 3000);
})();

// #endregion
