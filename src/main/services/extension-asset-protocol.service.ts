import { protocol } from 'electron';
import { StatusCodes } from 'http-status-codes';
import { extensionAssetService } from '@shared/services/extension-asset.service';
import { getErrorMessage, lastIndexOf, substring } from 'platform-bible-utils';
import { getAssetPathInfoFromExtensionUri } from '@shared/utils/extension-asset.utils';
import { logger } from '@shared/services/logger.service';

/** Here some of the most common MIME types that we expect to handle */
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// An example of a more complete list: https://www.freeformatter.com/mime-types-list.html
const knownMimeTypes = {
  '.bmp': 'image/bmp',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.gif': 'image/gif',
  '.htm': 'text/html',
  '.html': 'text/html',
  '.ico': 'image/vnd.microsoft.icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.mpeg': 'video/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.wav': 'audio/wav',
};

/** Lookup the MIME type to pass back to the renderer */
function getMimeTypeForFileName(fileName: string): string {
  const dotIndex = lastIndexOf(fileName, '.');
  if (dotIndex > 0) {
    const fileType: string = substring(fileName, dotIndex);
    // Assert key type confirmed in check.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (fileType in knownMimeTypes) return knownMimeTypes[fileType as keyof typeof knownMimeTypes];
  }

  // Default if we don't find something else
  return 'application/octet-stream';
}

/** Create an HTTP response to pass back to the renderer */
function errorResponse(url: string, httpErrorNumber: number): Response {
  return new Response(`Failed to load resource: ${url}`, {
    status: httpErrorNumber,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

const protocolName: string = 'papi-extension';

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Register the protocol handler for extension asset loading */
const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    protocol.handle(protocolName, async (request) => {
      // Ideas to consider:
      // 1) Check the referer for localhost to block arbitrary internet content from getting extension assets.
      // 2) Use request headers to pass along the extension name so extension code doesn't have to embed its name in URLs.

      try {
        const { extensionName, assetPath } = getAssetPathInfoFromExtensionUri(request.url);

        // Actually get the data
        const base64Data: string | undefined = await extensionAssetService.getExtensionAsset(
          extensionName,
          assetPath,
        );
        if (!base64Data) {
          return errorResponse(request.url, StatusCodes.NOT_FOUND);
        }

        try {
          // Pass back the data to the renderer
          return new Response(Buffer.from(base64Data, 'base64'), {
            status: StatusCodes.OK,
            headers: {
              'Content-Type': getMimeTypeForFileName(assetPath),
            },
          });
        } catch (e) {
          logger.warn(`Error creating response for ${request.url}: ${getErrorMessage(e)}`);
          return errorResponse(request.url, StatusCodes.INTERNAL_SERVER_ERROR);
        }
      } catch (e) {
        logger.warn(`Error handling request for ${request.url}: ${getErrorMessage(e)}`);
        return errorResponse(request.url, StatusCodes.BAD_REQUEST);
      }
    });
  })();

  return initializePromise;
};

/**
 * Initialize a handler for protocol strings like the following:
 *
 * - `papi-extension://extension-name/assets/asset.xyz` -> load "asset.xyz" from "assets" directory in
 *   "extension-name"
 * - `papi-extension://extension-name/assets/subdirectory/asset.xyz` -> load "asset.xyz" from
 *   "assets/subdirectory" directory in "extension-name"
 */
export const extensionAssetProtocolService = {
  initialize,
};

export default extensionAssetProtocolService;
