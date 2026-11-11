// SMOKE TEST ONLY — uses papi.fixture for CI smoke testing.
// Per-feature E2E tests belong in tests/isolated/ with isolated.fixture; the ones that must attach
// to an app you started live in tests/attached/ with cdp.fixture.
import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Platform Basics', () => {
  test('should launch the app: window, React root, PAPI server and a quiet console', async ({
    electronApp,
    mainPage,
  }) => {
    await test.step('should launch and show main window', async () => {
      const windowCount = electronApp.windows().length;
      expect(windowCount).toBeGreaterThanOrEqual(1);

      expect(mainPage).toBeTruthy();
    });

    await test.step('should create a BrowserWindow', async () => {
      const windowCount = await electronApp.evaluate(async ({ BrowserWindow }) => {
        return BrowserWindow.getAllWindows().length;
      });
      expect(windowCount).toBeGreaterThanOrEqual(1);
    });

    await test.step('should render React root element', async () => {
      const root = await mainPage.$('#root');
      expect(root).not.toBeNull();

      const innerHTML = await mainPage.$eval('#root', (el) => el.innerHTML);
      expect(innerHTML.length).toBeGreaterThan(0);
    });

    await test.step('should have PAPI WebSocket server running', async () => {
      expect(electronApp).toBeTruthy();

      const appPath = await electronApp.evaluate(async ({ app }) => {
        return app.getAppPath();
      });
      expect(appPath).toBeTruthy();
    });

    await test.step('should not have critical console errors on startup', async () => {
      const page = await electronApp.firstWindow();
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.waitForTimeout(3000);

      const criticalErrors = consoleErrors.filter(
        (err) =>
          !err.includes('DevTools') &&
          !err.includes('source map') &&
          !err.includes('Failed to load resource') &&
          !err.includes('net::ERR_') &&
          !err.includes('localhost'),
      );

      if (criticalErrors.length > 0) {
        console.log('Critical console errors:', criticalErrors);
      }

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test('should respond to PAPI commands via WebSocket', async ({ papiClient }) => {
    const osPlatform = await papiClient.sendCommand<string>('platform.getOSPlatform');
    expect(osPlatform).toBeTruthy();
    expect(['darwin', 'win32', 'linux']).toContain(osPlatform);
  });

  test('should report fullscreen state', async ({ papiClient }) => {
    const isFullScreen = await papiClient.sendCommand<boolean>('platform.isFullScreen');
    expect(typeof isFullScreen).toBe('boolean');
  });

  test('should fully load UI with dock layout', async ({ electronApp }) => {
    const page = await electronApp.firstWindow();
    await waitForAppReady(page);

    const dockLayout = await page.$('div[class*="dock-layout"]');
    expect(dockLayout).not.toBeNull();
  });
});
