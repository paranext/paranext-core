/**
 * Interface scaling (`platform.zoomFactor`) must survive a resize after the renderer rewrites its
 * URL's query on a `file://` page, as the packaged app does
 * (`adr-interface-scaling-is-per-window-zoom`).
 *
 * Drives a bare Electron with the app's real preload and window options, since the dev app's
 * `http://localhost` page cannot show the failure. Each zoom case also runs a control window
 * without the preload, which must lose its zoom: proof that this setup still reproduces the
 * failure.
 */
import {
  _electron as electron,
  test as base,
  expect,
  type ElectronApplication,
} from '@playwright/test';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import {
  electronChildEnv,
  killProcessTree,
  removeUserDataDirBestEffort,
  sleep,
} from '../../fixtures/helpers';

const ROOT_DIR = path.resolve(__dirname, '../../..');
/** The preload the dev app loads; globalSetup builds it when it is missing or stale */
const PRELOAD_PATH = path.join(ROOT_DIR, '.erb', 'dll', 'preload.js');
const FIXTURE_DIR = path.join(__dirname, 'window-zoom');
const PAGE_URL = `${pathToFileURL(path.join(FIXTURE_DIR, 'page.html')).href}?state=1`;
/** Any query other than `PAGE_URL`'s, the way `refreshWindowCreationState` rewrites it */
const REWRITTEN_QUERY = '?state=2';

/**
 * `INTERFACE_SCALING_CHANNEL` in `src/shared/data/interface-scaling.model.ts`, which e2e code
 * cannot import. Keep the two in step.
 */
const INTERFACE_SCALING_CHANNEL = 'platform.interfaceScaling.setPageZoomFactor';

/** Interface scaling. Not 1, so a snap to 100 % is visible. */
const USER_ZOOM = 1.5;
/** How long a resize or a first frame may take on a loaded CI runner */
const WINDOW_TIMEOUT_MS = 15_000;
/** How long to let the app close on its own before ending it */
const CLOSE_TIMEOUT_MS = 5_000;
/** Rounding slack when comparing the page's width with the window's, in screen pixels */
const WIDTH_TOLERANCE_PX = 3;

const CONTROL_MESSAGE =
  'The control window (no preload) should lose its zoom. If this fails after an Electron upgrade, ' +
  'Chromium may no longer key file:// zoom by URL: re-check whether the preload zoom call is still ' +
  'needed rather than deleting the control.';

type WindowCase = 'app-preload' | 'no-preload';

/**
 * The options `createWindow` in `main.ts` gives every window that matter here: shown at creation
 * when someone asked for the window and hidden otherwise, its title bar style and overlay, and its
 * preload. Keep the two in step.
 */
function appWindowOptions(windowCase: WindowCase, show: boolean) {
  return {
    width: 700,
    height: 500,
    show,
    titleBarStyle: 'hidden' as const,
    ...(process.platform !== 'darwin'
      ? { titleBarOverlay: { height: 47, color: 'hsla(0, 0%, 100%, 0)' } }
      : {}),
    webPreferences: windowCase === 'app-preload' ? { preload: PRELOAD_PATH } : {},
  };
}

const test = base.extend<{ electronApp: ElectronApplication }>({
  // One Electron per test: the control window's zoom stays stored under its URL for the rest of the
  // session, where it would reach the next test's windows.
  // Playwright fixtures require a destructured parameter even when no dependencies are needed
  // eslint-disable-next-line no-empty-pattern
  electronApp: async ({}, use) => {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paranext-e2e-window-zoom-'));
    let electronApp: ElectronApplication;
    try {
      electronApp = await electron.launch({
        args: [`--user-data-dir=${userDataDir}`, path.join(FIXTURE_DIR, 'main.cjs')],
        env: electronChildEnv(),
      });
    } catch (error) {
      removeUserDataDirBestEffort(userDataDir);
      throw error;
    }
    // Read now: once the process has exited, Playwright disposes the handle and this throws
    const { pid } = electronApp.process();
    try {
      await use(electronApp);
    } finally {
      // The bare app has nothing to save, and a graceful close can take minutes on a loaded
      // machine, so wait briefly and then end the whole process tree
      await Promise.race([electronApp.close().catch(() => {}), sleep(CLOSE_TIMEOUT_MS)]);
      if (pid !== undefined) killProcessTree(pid, 'SIGKILL');
      removeUserDataDirBestEffort(userDataDir);
    }
  },
});

test.beforeAll(() => {
  // Gives a clearer failure than the zoom mismatch a missing preload would otherwise cause
  expect(fs.existsSync(PRELOAD_PATH), `${PRELOAD_PATH} should be built by globalSetup`).toBe(true);
});

/**
 * Open a window on the `file://` page, shown or hidden, and give it `USER_ZOOM` each time a
 * document loads once it has painted or is shown, then wait until it shows that zoom. Returns the
 * window's id.
 *
 * The app-preload window gets it the way `createInterfaceScaling` gives it to the app's windows:
 * sent to the page, which sets it on itself. The control gets it from main with
 * `webContents.setZoomFactor`, which Chromium keys by URL on a `file://` page. Nothing sets a zoom
 * on a hidden window before `ready-to-show`, since main reveals a window nobody asked for only
 * then. A shown window does not wait for it: one covered by other windows, as a window opened from
 * a test runner can be, does not paint until it is uncovered.
 */
async function openWindow(electronApp: ElectronApplication, windowCase: WindowCase, show: boolean) {
  const windowId = await electronApp.evaluate(
    async ({ BrowserWindow }, { url, options, zoom, channel, fromPage, timeoutMs }) => {
      const win = new BrowserWindow(options);
      let isZoomable = false;
      const applyZoom = () => {
        if (fromPage) win.webContents.send(channel, zoom);
        else win.webContents.setZoomFactor(zoom);
      };
      win.webContents.on('did-finish-load', () => {
        if (win.isVisible()) isZoomable = true;
        if (isZoomable) applyZoom();
      });
      const painted = new Promise<boolean>((resolve) => {
        win.once('ready-to-show', () => {
          if (!isZoomable) {
            isZoomable = true;
            applyZoom();
          }
          resolve(true);
        });
        setTimeout(() => resolve(false), timeoutMs);
      });
      await win.loadURL(url);
      if (!options.show && !(await painted))
        throw new Error(
          `window ${win.id} never emitted ready-to-show, so the app would never show it`,
        );
      return win.id;
    },
    {
      url: PAGE_URL,
      options: appWindowOptions(windowCase, show),
      zoom: USER_ZOOM,
      channel: INTERFACE_SCALING_CHANNEL,
      fromPage: windowCase === 'app-preload',
      timeoutMs: WINDOW_TIMEOUT_MS,
    },
  );
  await waitForZoom(electronApp, windowId);
  return windowId;
}

/** Wait until the window shows `USER_ZOOM`, which reaches it asynchronously */
async function waitForZoom(electronApp: ElectronApplication, windowId: number) {
  await expect
    .poll(() => zoomOnScreen(electronApp, windowId), {
      message: `window ${windowId} should take the zoom it was given`,
      timeout: WINDOW_TIMEOUT_MS,
    })
    .toBeCloseTo(USER_ZOOM, 2);
}

/** The page's width in screen pixels, which does not depend on zoom, and its window's */
async function widths(electronApp: ElectronApplication, windowId: number) {
  return electronApp.evaluate(async ({ BrowserWindow, screen }, id) => {
    const win = BrowserWindow.fromId(id);
    if (!win) throw new Error(`window ${id} is gone`);
    const cssWidthTimesRatio: number = await win.webContents.executeJavaScript(
      'window.innerWidth * window.devicePixelRatio',
    );
    return {
      page: cssWidthTimesRatio / screen.getDisplayMatching(win.getBounds()).scaleFactor,
      window: win.getContentSize()[0],
    };
  }, windowId);
}

/**
 * Rewrite the query the way `refreshWindowCreationState` does, then resize the way maximize and
 * restore do, and wait until this window's page has the new width. `setSize` works on a hidden
 * window and without a window manager (xvfb).
 */
async function rewriteAndResize(electronApp: ElectronApplication, windowId: number) {
  const widthBefore = (await widths(electronApp, windowId)).window;
  await electronApp.evaluate(
    async ({ BrowserWindow }, { id, query }) => {
      const win = BrowserWindow.fromId(id);
      if (!win) throw new Error(`window ${id} is gone`);
      await win.webContents.executeJavaScript(`history.replaceState({}, '', '${query}')`);
      win.setSize(900, 650);
    },
    { id: windowId, query: REWRITTEN_QUERY },
  );
  await expect
    .poll(
      async () => {
        const { page, window } = await widths(electronApp, windowId);
        return window !== widthBefore && Math.abs(page - window) <= WIDTH_TOLERANCE_PX;
      },
      {
        message: `window ${windowId}'s page should take its new width`,
        timeout: WINDOW_TIMEOUT_MS,
      },
    )
    .toBe(true);
}

/** Crash the renderer and reload, the way main's `render-process-gone` handler does */
async function crashAndReload(electronApp: ElectronApplication, windowId: number) {
  await electronApp.evaluate(async ({ BrowserWindow }, id) => {
    const contents = BrowserWindow.fromId(id)?.webContents;
    if (!contents) throw new Error(`window ${id} is gone`);
    const gone = new Promise<void>((resolve) => {
      contents.once('render-process-gone', () => resolve());
    });
    contents.forcefullyCrashRenderer();
    await gone;
    const loaded = new Promise<void>((resolve) => {
      contents.once('did-finish-load', () => resolve());
    });
    contents.reload();
    await loaded;
  }, windowId);
}

/** The zoom the page is actually painted at: its device pixel ratio over its display's scale */
async function zoomOnScreen(electronApp: ElectronApplication, windowId: number) {
  return electronApp.evaluate(async ({ BrowserWindow, screen }, id) => {
    const win = BrowserWindow.fromId(id);
    if (!win) throw new Error(`window ${id} is gone`);
    const devicePixelRatio: number = await win.webContents.executeJavaScript('devicePixelRatio');
    return devicePixelRatio / screen.getDisplayMatching(win.getBounds()).scaleFactor;
  }, windowId);
}

// Shown at creation as well as hidden: `createWindow` creates both, and a shown window takes its
// zoom on a different event
[false, true].forEach((show) => {
  test.describe(`Interface scaling on a file:// window whose URL the renderer rewrites, ${show ? 'shown' : 'hidden'} at creation`, () => {
    test('keeps its zoom through a resize', async ({ electronApp }) => {
      const withPreload = await openWindow(electronApp, 'app-preload', show);
      const control = await openWindow(electronApp, 'no-preload', show);
      await rewriteAndResize(electronApp, withPreload);
      await rewriteAndResize(electronApp, control);

      expect(await zoomOnScreen(electronApp, control), CONTROL_MESSAGE).toBeCloseTo(1, 2);
      expect(await zoomOnScreen(electronApp, withPreload)).toBeCloseTo(USER_ZOOM, 2);
    });

    test('keeps its zoom through a resize after a renderer crash and reload', async ({
      electronApp,
    }) => {
      // A crash, not a plain reload: a plain reload keeps the page's frame and its temporary zoom,
      // while a crash replaces the frame, so the fix only holds if the new document's page takes the
      // setting again.
      const withPreload = await openWindow(electronApp, 'app-preload', show);
      const control = await openWindow(electronApp, 'no-preload', show);
      await crashAndReload(electronApp, withPreload);
      await crashAndReload(electronApp, control);
      await waitForZoom(electronApp, withPreload);

      await rewriteAndResize(electronApp, withPreload);
      await rewriteAndResize(electronApp, control);

      expect(await zoomOnScreen(electronApp, control), CONTROL_MESSAGE).toBeCloseTo(1, 2);
      expect(await zoomOnScreen(electronApp, withPreload)).toBeCloseTo(USER_ZOOM, 2);
    });
  });
});
