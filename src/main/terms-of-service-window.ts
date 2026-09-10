import { BrowserWindow } from 'electron';
import path from 'path';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Name of the Terms of Service document `electron-builder.json5` lists in `extraResources`.
 *
 * `globalThis.resourcesPath` is the repository root in development and the install directory's
 * `resources` folder when packaged, so the same relative name finds the document in both.
 */
export const TERMS_OF_SERVICE_FILE_NAME = 'TERMS-OF-SERVICE.html';

/** Opens a link outside the window. The caller's policy decides which links qualify. */
export type OpenExternalLink = (url: string) => Promise<unknown>;

let termsOfServiceWindow: BrowserWindow | undefined;

/**
 * Show the Terms of Service document that ships beside the application, in a window of its own.
 *
 * The document is a self-contained HTML file, so it renders in a sandboxed window with no preload
 * and no Node access: it is a page the application shows, not part of the application's renderer.
 * Every link in it leaves through `openExternal`, whether it would open a new window
 * (`target="_blank"`, `window.open`) or navigate this one, so the window only ever shows the
 * document. One window at a time: a second request focuses the one already open.
 *
 * @param openExternal How a link leaves the window - main's `openExternal`, which lets only
 *   `https:` and `mailto:` links through. Its refusal is logged, not thrown: a link the user
 *   clicked in a legal document failing to open is not the caller's error.
 * @param parent The application window this was opened from. Electron closes a child window with
 *   its parent and, crucially, counts an unparented window in `window-all-closed` - so without this
 *   the application would not quit while a Terms of Service window was still open, leaving a
 *   resident process holding the single-instance lock with no way to get an application window
 *   back. A child window is also always shown above its parent, which is the right stacking for a
 *   document the user opened from it. Optional so the module stays testable, but every caller in
 *   the application passes one.
 * @throws When the document cannot be loaded. The caller is a dialog the user clicked a license
 *   link in; it needs to be able to say the document did not open.
 */
export async function openTermsOfServiceWindow(
  openExternal: OpenExternalLink,
  parent?: BrowserWindow,
): Promise<void> {
  if (termsOfServiceWindow && !termsOfServiceWindow.isDestroyed()) {
    // Restored before it is focused, for the reason `window-state.service.ts` gives at its own
    // raise: a minimized window that is merely focused stays minimized on Windows, so the user
    // would click the link, get a resolved command, and see nothing happen.
    if (termsOfServiceWindow.isMinimized()) termsOfServiceWindow.restore();
    termsOfServiceWindow.focus();
    return;
  }

  const termsOfServicePath = path.join(globalThis.resourcesPath, TERMS_OF_SERVICE_FILE_NAME);
  const newWindow = new BrowserWindow({
    // A destroyed parent is not a legal `parent`, and the window it came from can close between
    // the request and this line.
    parent: parent && !parent.isDestroyed() ? parent : undefined,
    width: 900,
    height: 800,
    minWidth: 480,
    autoHideMenuBar: true,
    icon: path.join(globalThis.resourcesPath, 'assets', 'icon.png'),
    // The document neither needs nor gets the application's preload and Node access
    webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false },
  });
  termsOfServiceWindow = newWindow;
  newWindow.on('closed', () => {
    if (termsOfServiceWindow === newWindow) termsOfServiceWindow = undefined;
  });
  newWindow.removeMenu();

  const leaveThroughBrowser = (url: string, how: string) => {
    openExternal(url).catch((e) => {
      logger.warn(
        `Terms of Service window could not open "${url}" in the browser (${how}). ${getErrorMessage(e)}`,
      );
    });
  };
  newWindow.webContents.setWindowOpenHandler(({ url }) => {
    leaveThroughBrowser(url, 'new window');
    return { action: 'deny' };
  });
  newWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    leaveThroughBrowser(url, 'navigation');
  });

  try {
    await newWindow.loadFile(termsOfServicePath);
  } catch (e) {
    newWindow.destroy();
    throw new Error(
      `Could not open the Terms of Service at ${termsOfServicePath}: ${getErrorMessage(e)}`,
    );
  }
}
