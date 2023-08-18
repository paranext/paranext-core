/**
 * Utilities useful for node processes
 */
import { URL } from 'url';
import path from 'path';
import os from 'os';
import { Uri } from '@shared/data/file-system.model';
import memoizeOne from 'memoize-one';

const APP_SCHEME = 'app';
const CACHE_SCHEME = 'cache';
const CACHE_DIR_NAME = CACHE_SCHEME;
const DATA_SCHEME = 'data';
const DATA_DIR_NAME = DATA_SCHEME;
const RESOURCES_SCHEME = 'resources';
const FILE_SCHEME = 'file';
const PROTOCOL_PART = '://';

export const FILE_PROTOCOL = `${FILE_SCHEME}${PROTOCOL_PART}`;
export const RESOURCES_PROTOCOL = `${RESOURCES_SCHEME}${PROTOCOL_PART}`;

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `${FILE_PROTOCOL}${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

/**
 * Gets the platform-specific user Platform.Bible folder for this application
 *
 * When running in development: `<repo_directory>/dev-appdata`
 *
 * When packaged: `<user_home_directory>/.platform.bible`
 */
export const getAppDir = memoizeOne((): string => {
  return globalThis.isPackaged
    ? path.join(os.homedir(), '/.platform.bible')
    : path.join(__dirname, '../../../dev-appdata');
});

/**
 * Get a mapping from scheme to the absolute path to that scheme.
 * TODO: this is currently lazy-loaded because globalThis doesn't get populated until after this file is imported.
 * Fix this to be a normal object after fixing globalThis import dependencies.
 */
const getSchemePaths = memoizeOne((): { [scheme: string]: string } => {
  const appDir = getAppDir();
  return {
    [APP_SCHEME]: appDir,
    [CACHE_SCHEME]: path.join(appDir, CACHE_DIR_NAME),
    [DATA_SCHEME]: path.join(appDir, DATA_DIR_NAME),
    [RESOURCES_SCHEME]: globalThis.resourcesPath,
    [FILE_SCHEME]: '',
  };
});

/**
 * Parse a URI from a string into its original parts.
 * TODO: Make URI an actual class. Will be challenging when passing through WebSocket
 */
function getPathInfoFromUri(uri: Uri): { scheme: string; uriPath: string } {
  // Add app scheme to the uri if it doesn't have one
  const fullUri = uri.includes(PROTOCOL_PART) ? uri : `${APP_SCHEME}${PROTOCOL_PART}${uri}`;

  const [scheme, uriPath] = fullUri.split(PROTOCOL_PART);
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
  return `${scheme}${PROTOCOL_PART}${path.join(uriPath, ...paths)}`;
}
