import { BrowserWindow } from 'electron';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';

/**
 * Handler for `platform.pasteIntoFocusedWindow`: runs Chromium's own paste in the focused window,
 * into whatever has focus in it, exactly as a real Ctrl+V the page did not prevent would. Unlike
 * `navigator.clipboard.read()`, the `paste` event this fires carries every format on the clipboard,
 * including formats a page wrote for itself (such as a rich-text editor's own copy format).
 *
 * It hands the caller nothing from the clipboard: whatever is pasted goes only to the frame that
 * already has focus, which can read the clipboard itself.
 *
 * @returns `true` once the paste has been issued to the focused window; `false`, without pasting,
 *   when no window of this application has focus or the focused one is closing.
 */
export async function pasteIntoFocusedWindow(): Promise<boolean> {
  const window = BrowserWindow.getFocusedWindow();
  if (!window || window.isDestroyed() || !window.isFocused()) return false;
  const { webContents } = window;
  if (webContents.isDestroyed()) return false;
  webContents.paste();
  return true;
}

/** OpenRPC documentation for `platform.pasteIntoFocusedWindow`. */
export const PASTE_INTO_FOCUSED_WINDOW_DOCS: SingleMethodDocumentation = {
  method: {
    'x-experimental': true,
    summary:
      'Paste the clipboard into whatever has focus in the focused window, as the keyboard ' +
      'shortcut would. Returns false, without pasting, when no window has focus',
    params: [],
    result: {
      name: 'return value',
      summary: 'Whether the paste was issued',
      schema: { type: 'boolean' },
    },
  },
};
