import { protocol } from 'electron';
import httpStatusCode from '@shared/utils/http-status-codes';
import * as commandService from '@shared/services/command.service';

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

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Register the protocol handler for extension asset loading */
const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    protocol.registerBufferProtocol('paranextension', async (request, callback) => {
      // TO CONSIDER: Check the referer for localhost? This would block arbitrary internet content
      // from getting extension assets.

      // "paranextension://" is 17 characters long
      const uri: string = request.url.substring(17);

      // There have to be at least 2 parts to the URI divided by a slash
      if (!uri.includes('/')) {
        callback(errorObject(request.url, httpStatusCode.BAD_REQUEST));
        return;
      }

      const slash = uri.indexOf('/');
      let extension = uri.substring(0, slash);
      let asset = uri.substring(slash + 1);
      if (!extension || !asset) {
        callback(errorObject(request.url, httpStatusCode.BAD_REQUEST));
        return;
      }

      // It's possible the extension and/or asset were encoded because they have characters not
      // allowed in URLs. So let's decode both of them before passing them to the extension host.
      extension = decodeURIComponent(extension);
      asset = decodeURIComponent(asset);
      if (extension.length > 100 || asset.length > 100) {
        callback(errorObject(request.url, httpStatusCode.BAD_REQUEST));
        return;
      }

      // Actually get the data
      const base64Data: string = await commandService.sendCommand(
        'getExtensionAsset',
        extension,
        asset,
      );
      if (!base64Data) {
        callback(errorObject(request.url, httpStatusCode.NOT_FOUND, netErrors.FILE_NOT_FOUND));
        return;
      }

      // Pass back the data to the renderer
      callback({
        statusCode: httpStatusCode.OK,
        mimeType: getMimeTypeForFileName(asset),
        data: Buffer.from(base64Data, 'base64'),
      });
    });
  })();

  return initializePromise;
};

/** Initialize a handler for protocol strings like the following:
 *  paranextension://extension-name/asset.xyz -> load "asset.xyz" from "assets" directory in "extension-name"
 *  paranextension://extension-name/subdirectory/asset.xyz -> load "asset.xyz" from "assets/subdirectory" directory in "extension-name"
 */
const extensionAssetProtocolService = {
  initialize,
};

export default extensionAssetProtocolService;
