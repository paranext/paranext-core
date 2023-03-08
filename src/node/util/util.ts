/**
 * Utilities useful for node processes
 */
import { URL } from 'url';
import path from 'path';

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
 * Gets the platform-specific user folder for this application
 * Thanks to Luke at https://stackoverflow.com/a/26227660
 */
export function getUserDir(): string {
  return path.join(
    process.env.APPDATA ||
      (process.platform === 'darwin'
        ? // Since APPDATA is not defined, we are on a unix-based OS. Therefore HOME will be available
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          path.join(process.env.HOME!, '/Library/Preferences')
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          path.join(process.env.HOME!, '/.local/share')),
    '/paranext-core',
  );
}
