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
    ? `${
        process.env.APPDATA ||
        (process.platform === 'darwin'
          ? `${process.env.HOME}/Library/Preferences`
          : `${process.env.HOME}/.local/share`)
      }/paranext-core`
    : path.join(__dirname, '../../../dev-appdata');
});

export const getDir = memoizeOne((): string => {
  return globalThis.isPackaged
})

/**
 * Resolves the uri to a path
 * @param uri the uri to resolve
 * @returns real path to the uri supplied
 */
export function getPathFromUri(uri: Uri): string {
  return path.join(getAppDir(), uri);
}

/**
 * Combines the uri passed in with the paths passed in to make one uri
 * @param uri uri to start from
 * @param paths paths to combine into the uri
 * @returns one uri that combines the uri and the paths in left-to-right order
 */
export function joinUriPaths(uri: Uri, ...paths: string[]): Uri {
  return path.join(uri, ...paths);
}
