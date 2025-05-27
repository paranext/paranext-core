import { isExtensionHost } from '@shared/utils/internal-util';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import type { GetAsset } from '@extension-host/services/asset-retrieval.service';
import { serializeRequestType } from '@shared/utils/util';

let getAsset: GetAsset;
let isInitialized: boolean = false;
let initializePromise: Promise<void>;

/** Prefix on requests that indicates that the request is on the extension asset service */
export const CATEGORY_EXTENSION_ASSET = 'extensionAsset';
/** Name for request to get an extension asset */
const GET_EXTENSION_ASSET_REQUEST = 'getExtensionAsset';

/**
 * Load an asset from the given extension's installation directory
 *
 * @param extensionName Name of the extension
 * @param assetPath Path to the asset relative to the extension's assets directory
 * @returns Base 64 encoded value of the asset if it exists, otherwise undefined
 */
const getExtensionAsset = async (
  extensionName: string,
  assetPath: string,
): Promise<string | undefined> => {
  if (isExtensionHost()) {
    try {
      return (await getAsset(extensionName, assetPath)).toString('base64');
    } catch (error) {
      logger.error(`Could not get asset "${assetPath}" from "${extensionName}": ${error}`);
      return undefined;
    }
  } else {
    return networkService.request(
      serializeRequestType(CATEGORY_EXTENSION_ASSET, GET_EXTENSION_ASSET_REQUEST),
      extensionName,
      assetPath,
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
    const requestType = serializeRequestType(CATEGORY_EXTENSION_ASSET, GET_EXTENSION_ASSET_REQUEST);
    await networkService.registerRequestHandler(
      requestType,
      async (extensionName: string, assetName: string) => {
        return getExtensionAsset(extensionName, assetName);
      },
      {
        method: {
          summary: 'Get an asset from an extension',
          params: [
            {
              name: 'extensionName',
              required: true,
              summary: 'Name of the extension to get the asset from',
              schema: { type: 'string' },
            },
            {
              name: 'assetPath',
              required: true,
              summary: "Path to the asset relative to the extension's assets directory",
              schema: { type: 'string' },
            },
          ],
          result: {
            name: 'return value',
            summary: 'Base64 encoded asset if it exists',
            schema: { oneOf: [{ type: 'string' }, { type: 'null' }] },
          },
        },
      },
    );

    isInitialized = true;
  })();

  return initializePromise;
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface ExtensionAssetService {
  initialize: typeof initialize;
  getExtensionAsset: typeof getExtensionAsset;
}

export const extensionAssetService: ExtensionAssetService = {
  initialize,
  getExtensionAsset,
};

export default extensionAssetService;
