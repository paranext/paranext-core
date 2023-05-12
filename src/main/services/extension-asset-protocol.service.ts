import { protocol } from 'electron';
import { StatusCodes } from 'http-status-codes';
import extensionAssetService from '@shared/services/extension-asset.service';

/** The real list of Chromium error codes is really big.  We're just using a small subset. */
// https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h
const netErrors = {
  FAILED: -2,
  FILE_NOT_FOUND: -6,
};

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
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex > 0) {
    const fileType: string = fileName.substring(dotIndex);
    if (fileType in knownMimeTypes) return knownMimeTypes[fileType as keyof typeof knownMimeTypes];
  }

  // Default if we don't find something else
  return 'application/octet-stream';
}

/** Create an HTTP response to pass back to the renderer */
function errorObject(
  url: string,
  httpErrorNumber: number,
  netErrorNumber: number = netErrors.FAILED,
) {
  return {
    error: netErrorNumber,
    statusCode: httpErrorNumber,
    mimeType: 'text/plain',
    data: `Failed to load resource: ${url}`,
  };
}

const protocolName: string = 'papi-extension';

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Register the protocol handler for extension asset loading */
const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    protocol.registerBufferProtocol(protocolName, async (request, callback) => {
      // Ideas to consider:
      // 1) Check the referer for localhost to block arbitrary internet content from getting extension assets.
      // 2) Use request headers to pass along the extension name so extension code doesn't have to embed its name in URLs.

      // Remove "papi-extension://" from the front of the URL
      const uri: string = request.url.substring(`${protocolName}://`.length);

      // There have to be at least 2 parts to the URI divided by a slash
      if (!uri.includes('/')) {
        callback(errorObject(request.url, StatusCodes.BAD_REQUEST));
        return;
      }

      const slash = uri.indexOf('/');
      let extension = uri.substring(0, slash);
      let asset = uri.substring(slash + 1);
      if (!extension || !asset) {
        callback(errorObject(request.url, StatusCodes.BAD_REQUEST));
        return;
      }

      // It's possible the extension and/or asset were encoded because they have characters not
      // allowed in URLs. So let's decode both of them before passing them to the extension host.
      extension = decodeURIComponent(extension);
      asset = decodeURIComponent(asset);
      if (extension.length > 100 || asset.length > 100) {
        callback(errorObject(request.url, StatusCodes.BAD_REQUEST));
        return;
      }

      // Actually get the data
      const base64Data: string | undefined = await extensionAssetService.getExtensionAsset(
        extension,
        asset,
      );
      if (!base64Data) {
        callback(errorObject(request.url, StatusCodes.NOT_FOUND, netErrors.FILE_NOT_FOUND));
        return;
      }

      // Pass back the data to the renderer
      callback({
        statusCode: StatusCodes.OK,
        mimeType: getMimeTypeForFileName(asset),
        data: Buffer.from(base64Data, 'base64'),
      });
    });
  })();

  return initializePromise;
};

/** Initialize a handler for protocol strings like the following:
 *  papi-extension://extension-name/asset.xyz -> load "asset.xyz" from "assets" directory in "extension-name"
 *  papi-extension://extension-name/subdirectory/asset.xyz -> load "asset.xyz" from "assets/subdirectory" directory in "extension-name"
 */
const extensionAssetProtocolService = {
  initialize,
};

export default extensionAssetProtocolService;
