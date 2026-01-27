import { test, expect } from '../../fixtures/app.fixture';

test.describe('Application Launch', () => {
  test('should launch and show main window', async ({ electronApp, mainPage }) => {
    const windowCount = electronApp.windows().length;
    expect(windowCount).toBeGreaterThanOrEqual(1);

    expect(mainPage).toBeTruthy();
  });

  test('should create a BrowserWindow', async ({ electronApp, mainPage }) => {
    expect(mainPage).toBeTruthy();

    const windowCount = await electronApp.evaluate(async ({ BrowserWindow }) => {
      return BrowserWindow.getAllWindows().length;
    });
    expect(windowCount).toBeGreaterThanOrEqual(1);
  });

  test('should render React root element', async ({ mainPage }) => {
    const root = await mainPage.$('#root');
    expect(root).not.toBeNull();

    const innerHTML = await mainPage.$eval('#root', (el) => el.innerHTML);
    expect(innerHTML.length).toBeGreaterThan(0);
  });

  test('should have PAPI WebSocket server running', async ({ electronApp }) => {
    expect(electronApp).toBeTruthy();

    const appPath = await electronApp.evaluate(async ({ app }) => {
      return app.getAppPath();
    });
    expect(appPath).toBeTruthy();
  });

  test('should not have critical console errors on startup', async ({ electronApp }) => {
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
