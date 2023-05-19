import getAsset from '@extension-host/services/asset-retrieval.service';
import ExtensionAssetServiceCommon from '@shared/services/abstract/extension-asset.service';
import logger from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import * as extensionService from '@extension-host/services/extension.service';

export default class ExtensionAssetService extends ExtensionAssetServiceCommon {
  initializePromise: Promise<void> | undefined;

  /** Load an asset from the given extension's installation directory
   *  @param extensionName Name of the extension
   *  @param assetName Name of the asset including any path information
   *  @returns Base 64 encoded value of the asset if it exists, otherwise undefined
   */
  override async getExtensionAsset(
    extensionName: string,
    assetName: string,
  ): Promise<string | undefined> {
    await this.initialize();
    try {
      return (await getAsset(extensionName, assetName)).toString('base64');
    } catch (error) {
      logger.error(`Could not get asset "${assetName}" from "${extensionName}": ${error}`);
      return undefined;
    }
  }

  override initialize() {
    if (this.initializePromise) return this.initializePromise;

    this.initializePromise = (async (): Promise<void> => {
      if (this.isInitialized) return;
      await networkService.registerRequestHandler(
        'getExtensionAsset',
        this.getExtensionAsset.bind(this),
      ).promise;
      await extensionService.initialize();

      this.isInitialized = true;
    })();

    return this.initializePromise;
  }
}
