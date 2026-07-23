import { test, expect } from '../../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

/** Window Controls Overlay API isn't in TS's DOM lib yet. */
type NavigatorWithWindowControlsOverlay = Navigator & {
  windowControlsOverlay?: { getTitlebarAreaRect(): DOMRect };
};

test.describe('Title bar reserved space', () => {
  // titleBarOverlay (main.ts) — and navigator.windowControlsOverlay with it — is Windows-only.
  // Skip must be called at describe/test scope; the equivalent call inside beforeAll is a silent
  // Playwright no-op, so both tests would otherwise run (and fail) on macOS/Linux.
  test.skip(process.platform !== 'win32', 'titleBarOverlay only applies on win32 (see main.ts)');

  test('profile button stays clear of the OS-reserved title bar area', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    const overlayRight = await mainPage.evaluate(() => {
      // Widening navigator to the non-standard API above
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { windowControlsOverlay } = navigator as NavigatorWithWindowControlsOverlay;
      return windowControlsOverlay?.getTitlebarAreaRect().right;
    });
    expect(overlayRight).toBeDefined();

    const trigger = mainPage.locator('[data-testid="user-profile-popover-trigger"]');
    await expect(trigger).toBeVisible();
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();
    if (!triggerBox || overlayRight === undefined) return;

    // A plain visibility check would not have caught the original bug: the button was DOM-visible
    // the whole time, just painted over by the native (non-DOM) OS buttons on top of it.
    expect(triggerBox.x + triggerBox.width).toBeLessThanOrEqual(overlayRight);
  });

  test('clicking the profile button opens its popover', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    const trigger = mainPage.locator('[data-testid="user-profile-popover-trigger"]');
    await trigger.click();

    await expect(mainPage.locator('[data-testid="user-profile-name"]')).toBeVisible();
  });
});
