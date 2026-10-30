import { BrowserWindow } from 'electron';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  PASTE_INTO_FOCUSED_WINDOW_DOCS,
  pasteIntoFocusedWindow,
} from './paste-into-focused-window.command';

vi.mock('electron', () => ({ BrowserWindow: { getFocusedWindow: vi.fn() } }));

/** A window as far as the paste looks at one, with a spy for the paste itself. */
function fakeWindow({
  isFocused = true,
  isDestroyed = false,
  isContentsDestroyed = false,
}: { isFocused?: boolean; isDestroyed?: boolean; isContentsDestroyed?: boolean } = {}) {
  const paste = vi.fn();
  const window = {
    isFocused: () => isFocused,
    isDestroyed: () => isDestroyed,
    webContents: { paste, isDestroyed: () => isContentsDestroyed },
  };
  // The handler reads only the members faked above; a real BrowserWindow can't be built in a test.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(BrowserWindow.getFocusedWindow).mockReturnValue(window as unknown as BrowserWindow);
  return { paste };
}

describe('platform.pasteIntoFocusedWindow', () => {
  beforeEach(() => {
    vi.mocked(BrowserWindow.getFocusedWindow).mockReset();
  });

  it('pastes into the focused window and answers true', async () => {
    const { paste } = fakeWindow();
    await expect(pasteIntoFocusedWindow()).resolves.toBe(true);
    expect(paste).toHaveBeenCalledTimes(1);
  });

  it('answers false when no window has focus', async () => {
    // `null` is what Electron returns when no window has focus
    // eslint-disable-next-line no-null/no-null
    vi.mocked(BrowserWindow.getFocusedWindow).mockReturnValue(null);
    await expect(pasteIntoFocusedWindow()).resolves.toBe(false);
  });

  it('answers false, without pasting, when the window it gets does not have focus', async () => {
    const { paste } = fakeWindow({ isFocused: false });
    await expect(pasteIntoFocusedWindow()).resolves.toBe(false);
    expect(paste).not.toHaveBeenCalled();
  });

  it('answers false, without pasting, when the window or its contents are gone', async () => {
    const closedWindow = fakeWindow({ isDestroyed: true });
    await expect(pasteIntoFocusedWindow()).resolves.toBe(false);
    expect(closedWindow.paste).not.toHaveBeenCalled();

    const crashedContents = fakeWindow({ isContentsDestroyed: true });
    await expect(pasteIntoFocusedWindow()).resolves.toBe(false);
    expect(crashedContents.paste).not.toHaveBeenCalled();
  });

  it('is documented as experimental, with a boolean result', () => {
    expect(PASTE_INTO_FOCUSED_WINDOW_DOCS.method?.['x-experimental']).toBe(true);
    expect(PASTE_INTO_FOCUSED_WINDOW_DOCS.method?.result).toMatchObject({
      schema: { type: 'boolean' },
    });
  });
});
