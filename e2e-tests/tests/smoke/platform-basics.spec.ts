import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Platform Basics', () => {
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
