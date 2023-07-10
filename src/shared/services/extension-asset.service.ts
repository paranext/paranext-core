import { isExtensionHost } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import logger from '@shared/services/logger.service';
import type { GetAsset } from '@extension-host/services/asset-retrieval.service';
import { serializeRequestType } from '@shared/utils/papi-util';

let getAsset: GetAsset;
let isInitialized: boolean = false;
let initializePromise: Promise<void>;

/** Prefix on requests that indicates that the request is on the extension asset service */
export const CATEGORY_EXTENSION_ASSET = 'extensionAsset';
/** Name for request to get an extension asset */
const GET_EXTENSION_ASSET_REQUEST = 'getExtensionAsset';

/** Load an asset from the given extension's installation directory
 *  @param extensionName Name of the extension
 *  @param assetName Name of the asset including any path information
 *  @returns Base 64 encoded value of the asset if it exists, otherwise undefined
 */
const getExtensionAsset = async (
  extensionName: string,
  assetName: string,
): Promise<string | undefined> => {
  if (isExtensionHost()) {
    try {
      return (await getAsset(extensionName, assetName)).toString('base64');
    } catch (error) {
      logger.error(`Could not get asset "${assetName}" from "${extensionName}": ${error}`);
      return undefined;
    }
  } else {
    return networkService.request(
      serializeRequestType(CATEGORY_EXTENSION_ASSET, GET_EXTENSION_ASSET_REQUEST),
      extensionName,
      assetName,
    );
  }
};

/** This should only be called by the extension host. */
const initialize = async () => {
  if (initializePromise) return initializePromise;
  if (!isExtensionHost()) return undefined;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;
    getAsset = (await import('@extension-host/services/asset-retrieval.service')).default;
    await networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_EXTENSION_ASSET, GET_EXTENSION_ASSET_REQUEST),
      async (extensionName: string, assetName: string) => {
        return getExtensionAsset(extensionName, assetName);
      },
    );

    isInitialized = true;
  })();

  return initializePromise;
};

const extensionAssetService = {
  initialize,
  getExtensionAsset,
};

export default extensionAssetService;
