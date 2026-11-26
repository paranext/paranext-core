/**
 * Clicking the application logo at the start of the main toolbar opens the app menu (the menu
 * headed by the product name), as the application icon does in Paratext 9; clicking it again closes
 * the menu, and clicking it while another menu is open switches to the app menu.
 *
 * The unit tests drive these through jsdom's simulated events; this drives real pointer events
 * through Electron's no-drag toolbar area, so a change in Radix's event handling or in the
 * toolbar's drag region that stops the logo working in the app fails here.
 *
 * In Electron the second click closes the menu even if the logo's own click handler would reopen
 * it, because Radix's outside-press dismissal closes it too, so the close step pins what users get
 * rather than the toolbar's pointer-down snapshot. `toolbar.component.test.tsx` covers the
 * snapshot.
 */
import { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';

const APP_LOGO = 'img[alt="Application Logo"]';
const OPEN_MENU = '[role=menu][data-state=open]';
// Localized labels of the main menu's app and Help columns in the development build
const APP_MENU_LABEL = 'Platform';
const HELP_MENU_LABEL = 'Help';

// The Simple-mode bar is what users see first; firstRunComplete keeps the wizard from covering it
test.use({
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
});

/** The menubar trigger with the given label; its `data-state` says whether its menu is open */
function menuTrigger(mainPage: Page, label: string) {
  return mainPage.getByRole('menuitem', { name: label, exact: true }).first();
}

test('the toolbar logo opens and closes the app menu', async ({ mainPage }) => {
  await waitForAppReady(mainPage);
  const logo = mainPage.locator(APP_LOGO).first();
  const appMenuTrigger = menuTrigger(mainPage, APP_MENU_LABEL);
  const helpMenuTrigger = menuTrigger(mainPage, HELP_MENU_LABEL);
  // The labels resolve once the localization data provider answers, after the app is ready
  await expect(appMenuTrigger).toBeVisible({ timeout: 30_000 });
  await expect(helpMenuTrigger).toBeVisible();
  await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);

  await test.step('a click on the logo opens the app menu', async () => {
    await logo.click();
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
    await expect(appMenuTrigger).toHaveAttribute('data-state', 'open');
  });

  await test.step('a second click on the logo closes it', async () => {
    await logo.click();
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(0);
    await expect(appMenuTrigger).toHaveAttribute('data-state', 'closed');
  });

  await test.step('a click on the logo while another menu is open switches to the app menu', async () => {
    await helpMenuTrigger.click();
    await expect(helpMenuTrigger).toHaveAttribute('data-state', 'open');

    await logo.click();
    await expect(appMenuTrigger).toHaveAttribute('data-state', 'open');
    await expect(helpMenuTrigger).toHaveAttribute('data-state', 'closed');
    await expect(mainPage.locator(OPEN_MENU)).toHaveCount(1);
  });
});
