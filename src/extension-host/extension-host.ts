import '@extension-host/global-this.model';
import { isClient } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import * as extensionService from '@extension-host/services/extension.service';
import logger from '@shared/services/logger.service';
import extensionAssetService from '@shared/services/extension-asset.service';
import { startProjectLookupService } from '@extension-host/services/project-lookup.service-host';
import { initialize as initializeMenuData } from './services/menu-data.service-host';

// #region Test logs

logger.info('Starting extension-host');
logger.info(`Extension host is${isClient() ? '' : ' not'} client`);
logger.info(`Extension host process.env.NODE_ENV = ${process.env.NODE_ENV}`);
logger.warn('Extension host example warning');

// #endregion

// #region Services setup

networkService
  .initialize()
  .then(async () => {
    // The extension host is the only one that can initialize the extensionAssetService
    await extensionAssetService.initialize();

    // Make sure project lookups are available before extensions look for them on PAPI
    await startProjectLookupService();

    await initializeMenuData();

    // The extension service locks down importing other modules, so be careful what runs after it
    await extensionService.initialize();

    // TODO: Probably should return Promise.all of these registrations
    return undefined;
  })
  .catch(logger.error);

// #endregion
