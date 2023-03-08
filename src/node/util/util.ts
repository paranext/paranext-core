/**
 * Utilities useful for node processes
 */
import { URL } from 'url';
import path from 'path';
import { Uri } from '@shared/data/FileSystemTypes';
import memoizeOne from 'memoize-one';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

/**
 * Gets the platform-specific user appdata folder for this application
 * Thanks to Luke at https://stackoverflow.com/a/26227660
 */
export const getAppDir = memoizeOne((): string => {
  return globalThis.isPackaged
    ? path.join(
        process.env.APPDATA ||
          (process.platform === 'darwin'
            ? // Since APPDATA is not defined, we are on a unix-based OS. Therefore HOME will be available
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              path.join(process.env.HOME!, '/Library/Preferences')
            : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              path.join(process.env.HOME!, '/.local/share')),
        '/paranext-core',
      )
    : path.join(__dirname, '../../../dev-appdata');
});

const APP_SCHEME = 'app';
const RESOURCES_SCHEME = 'resources';

/**
 * Get a mapping from scheme to the absolute path to that scheme.
 * TODO: this is currently lazy-loaded because globalThis doesn't get populated until after this file is imported.
 * Fix this to be a normal object after fixing globalThis import dependencies.
 */
const getSchemePaths = memoizeOne((): { [scheme: string]: string } => ({
  [APP_SCHEME]: getAppDir(),
  [RESOURCES_SCHEME]: globalThis.resourcesPath,
}));

/**
 * Parse a URI from a string into its original parts.
 * TODO: Make URI an actual class. Will be challenging when passing through WebSocket
 */
function getPathInfoFromUri(uri: Uri): { scheme: string; uriPath: string } {
  // Add app scheme to the uri if it doesn't have one
  const fullUri = uri.includes('://') ? uri : `app://${uri}`;

  const [scheme, uriPath] = fullUri.split('://');
  return {
    scheme,
    uriPath,
  };
}

/**
 * Resolves the uri to a path
 * @param uri the uri to resolve
 * @returns real path to the uri supplied
 */
export function getPathFromUri(uri: Uri): string {
  const { scheme, uriPath } = getPathInfoFromUri(uri);
  return path.join(getSchemePaths()[scheme], uriPath);
}

/**
 * Combines the uri passed in with the paths passed in to make one uri
 * @param uri uri to start from
 * @param paths paths to combine into the uri
 * @returns one uri that combines the uri and the paths in left-to-right order
 */
export function joinUriPaths(uri: Uri, ...paths: string[]): Uri {
  const { scheme, uriPath } = getPathInfoFromUri(uri);
  return `${scheme}://${path.join(uriPath, ...paths)}`;
}
