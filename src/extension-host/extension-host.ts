import '@extension-host/global-this.model';
import { isClient } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import * as extensionService from '@extension-host/services/extension.service';
import { fetch as papiFetch } from '@extension-host/services/papi-backend.service';
import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';
import dataProviderService from '@shared/services/data-provider.service';
import extensionAssetService from '@shared/services/extension-asset.service';
import { getErrorMessage, isString, substring } from 'platform-bible-utils';
import { CommandNames } from 'papi-shared-types';
import { registerCommand } from '@shared/services/command.service';
import { initialize as initializeMenuData } from '@extension-host/services/menu-data.service-host';
import { initialize as initializeSettingsService } from '@extension-host/services/settings.service-host';
import { startProjectSettingsService } from '@extension-host/services/project-settings.service-host';
import { initialize as initializeLocalizationService } from '@extension-host/services/localization.service-host';
import { gracefulShutdownMessage } from '@node/models/interprocess-messages.model';
import { killChildProcessesFromExtensions } from './services/create-process.service';

logger.info(
  `Starting extension-host${globalThis.isNoisyDevModeEnabled ? ' in noisy dev mode' : ''}`,
);
logger.info(`Extension host process.env.NODE_ENV = ${process.env.NODE_ENV}`);

// Make a graceful way to tear down the process since Windows and POSIX operating systems handle it differently
process.on('message', (message) => {
  if (isString(message) && message === gracefulShutdownMessage) {
    logger.info('Shutting down process due to graceful shutdown message');
    process.exit();
  }
});

// Try to kill child processes that extensions created
process.on('exit', () => {
  killChildProcessesFromExtensions();
});

// #region Services setup

(async () => {
  try {
    // The network service has to be running before anything else
    await networkService.initialize();

    // Prepare all services that need to be running because extensions might rely on them
    await Promise.all([
      extensionAssetService.initialize(),
      initializeLocalizationService(),
      initializeMenuData(),
      initializeSettingsService(),
      startProjectSettingsService(),
    ]);

    // The extension service locks down importing other modules, so be careful what runs after it
    await extensionService.initialize();
  } catch (error) {
    logger.error(error);
  }
})();

// #endregion

// #region Noisy dev tests

if (globalThis.isNoisyDevModeEnabled) {
  logger.info(`Extension host is${isClient() ? '' : ' not'} client`);
  logger.warn('Extension host example warning');

  // `extension-host.ts`'s command handler declarations are in `command.service.ts` so they can be
  // picked up by papi-dts
  // This map should allow any functions because commands can be any function type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commandHandlers: { [commandName: string]: (...args: any[]) => any } = {
    // Set up test handlers
    'test.addMany': async (...nums: number[]) => {
      return nums.reduce((acc, current) => acc + current, 0);
    },
    'test.throwErrorExtensionHost': async (message: string) => {
      throw new Error(`Test Error thrown in throwErrorExtensionHost command: ${message}`);
    },
  };

  (async () => {
    await Promise.all(
      Object.entries(commandHandlers).map(async ([commandName, handler]) => {
        // Re-assert type after passing through `map`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        await registerCommand(commandName as CommandNames, handler);
      }),
    );
  })();

  (async () => {
    const testEH = await networkObjectService.set('testExtensionHost', {
      getVerse: async () => {
        try {
          const exampleData = await (await papiFetch('https://www.example.com')).text();
          const results = `testExtensionHost got data: ${substring(exampleData, 0, 100)}`;
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
      setPlaceholder: () => {
        throw new Error('I am a bad data provider');
      },
      getPlaceholder: () => {
        throw new Error('I am a bad data provider');
      },
      dispose: async () => {
        logger.debug('Inside testDP dispose');
        return Promise.resolve(true);
      },
    };

    const realDP = await dataProviderService.registerEngine('platform.placeholder', testDP);
    realDP.onDidDispose(() => {
      logger.debug('testDP onDidDispose ran');
    });
    setTimeout(realDP.dispose, 3000);
  })();
}

// #endregion
