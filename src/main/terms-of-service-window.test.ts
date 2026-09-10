import path from 'path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { FakeBrowserWindow, instances } = vi.hoisted(() => {
  type Listener = (...args: unknown[]) => unknown;
  type WindowOptions = { webPreferences?: Record<string, unknown> } & Record<string, unknown>;
  const created: FakeWindow[] = [];

  /** Stand-in for a BrowserWindow: records what the module asks of it and lets a test drive it */
  class FakeWindow {
    static loadFailure: Error | undefined;

    options: WindowOptions;

    destroyed = false;

    focusCalls = 0;

    menuRemoved = false;

    loadedPaths: string[] = [];

    windowOpenHandler: ((details: { url: string }) => { action: string }) | undefined;

    webContents = {
      setWindowOpenHandler: (handler: (details: { url: string }) => { action: string }) => {
        this.windowOpenHandler = handler;
      },
      on: (event: string, listener: Listener) => {
        this.contentsListeners.set(event, listener);
      },
    };

    private windowListeners = new Map<string, Listener>();

    private contentsListeners = new Map<string, Listener>();

    constructor(options: WindowOptions) {
      this.options = options;
      created.push(this);
    }

    on(event: string, listener: Listener) {
      this.windowListeners.set(event, listener);
    }

    removeMenu() {
      this.menuRemoved = true;
    }

    focus() {
      this.focusCalls += 1;
    }

    isDestroyed() {
      return this.destroyed;
    }

    destroy() {
      this.close();
    }

    async loadFile(file: string) {
      this.loadedPaths.push(file);
      if (FakeWindow.loadFailure) throw FakeWindow.loadFailure;
    }

    /** What the user closing the window does */
    close() {
      this.destroyed = true;
      this.windowListeners.get('closed')?.();
    }

    /** What a link in the page navigating the window does */
    navigate(url: string) {
      const event = { preventDefault: vi.fn() };
      this.contentsListeners.get('will-navigate')?.(event, url);
      return event;
    }
  }

  return { FakeBrowserWindow: FakeWindow, instances: created };
});

// `vi.mock` is hoisted above the imports, so the module under test resolves `electron` - which is
// unavailable outside the Electron runtime - against this stub.
vi.mock('electron', () => ({ BrowserWindow: FakeBrowserWindow }));

// Keeps the real logger's file/console transports out of the test run
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const TERMS_PATH = path.join('/res', 'TERMS-OF-SERVICE.html');

describe('openTermsOfServiceWindow', () => {
  const openExternal = vi.fn(async () => true);

  beforeEach(() => {
    // The module remembers the open window; a fresh copy per test starts with none
    vi.resetModules();
    instances.length = 0;
    FakeBrowserWindow.loadFailure = undefined;
    openExternal.mockReset();
    openExternal.mockResolvedValue(true);
    globalThis.resourcesPath = '/res';
  });

  /** Opens the window through the module and answers the window it created or focused */
  async function open() {
    const { openTermsOfServiceWindow } = await import('@main/terms-of-service-window');
    await openTermsOfServiceWindow(openExternal);
    return instances[instances.length - 1];
  }

  it('loads the document that ships beside the application into a sandboxed page window', async () => {
    const win = await open();

    expect(win.loadedPaths).toEqual([TERMS_PATH]);
    expect(win.options.webPreferences).toEqual(
      expect.objectContaining({ sandbox: true, contextIsolation: true, nodeIntegration: false }),
    );
    expect(win.options.webPreferences).not.toHaveProperty('preload');
    expect(win.menuRemoved).toBe(true);
  });

  it('sends a link that would open a new window to the browser and denies the window', async () => {
    const win = await open();

    const result = win.windowOpenHandler?.({ url: 'https://paratext.org/terms' });

    expect(result).toEqual({ action: 'deny' });
    expect(openExternal).toHaveBeenCalledWith('https://paratext.org/terms');
  });

  it('sends a link that would navigate the window to the browser and keeps the document', async () => {
    const win = await open();

    const event = win.navigate('https://paratext.org/privacy-policy');

    expect(event.preventDefault).toHaveBeenCalled();
    expect(openExternal).toHaveBeenCalledWith('https://paratext.org/privacy-policy');
  });

  it('logs rather than throws when the browser refuses a link', async () => {
    const win = await open();
    openExternal.mockRejectedValueOnce(new Error('External URL must start with https://'));
    const { logger } = await import('@shared/services/logger.service');

    expect(() => win.windowOpenHandler?.({ url: 'http://paratext.org' })).not.toThrow();

    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalled());
  });

  it('focuses the window that is already open rather than opening a second', async () => {
    const first = await open();
    const second = await open();

    expect(instances).toHaveLength(1);
    expect(second).toBe(first);
    expect(first.focusCalls).toBe(1);
  });

  it('opens a new window once the previous one was closed', async () => {
    const first = await open();
    first.close();
    const second = await open();

    expect(instances).toHaveLength(2);
    expect(second).not.toBe(first);
  });

  it('rejects with the document path when the load fails, and closes the empty window', async () => {
    FakeBrowserWindow.loadFailure = new Error('ENOENT');

    await expect(open()).rejects.toThrow(TERMS_PATH);
    expect(instances[0].destroyed).toBe(true);
  });
});
