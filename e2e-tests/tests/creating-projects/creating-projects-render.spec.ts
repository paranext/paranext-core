import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

/** Helper to wait for the Create Project web view to appear and load after it's been opened */
async function waitForCreateProjectDialogToLoad(
  mainPage: import('@playwright/test').Page,
  timeout = 60_000,
) {
  // Wait for the Create Project iframe to appear (second web view)
  const createIframe = mainPage.locator('iframe.web-view').nth(1);
  await expect(createIframe).toBeAttached({ timeout });

  // Get the frame content
  const iframeElement = await createIframe.elementHandle();
  const frame = await iframeElement?.contentFrame();
  if (!frame) throw new Error('Could not get Create Project frame');

  // Wait for the Loading spinner to disappear (content loaded)
  await frame.waitForSelector('text=Loading...', { state: 'hidden', timeout });

  return { frame };
}

/** Helper to open Create Project dialog via PAPI command */
async function openCreateProjectViaPAPI(
  papiClient: { sendCommand: <T>(cmd: string, ...args: unknown[]) => Promise<T> },
  mainPage: import('@playwright/test').Page,
  timeout = 60_000,
) {
  // Send command to open Create Project dialog
  await papiClient.sendCommand<string>('platformProjects.openCreateProject');
  return waitForCreateProjectDialogToLoad(mainPage, timeout);
}

test.describe('Creating Projects - Render Tests', () => {
  // Increase test timeout for slower WSL2/Xvfb environment
  test.setTimeout(180_000);

  test('should open Create Project dialog via menu', async ({ mainPage }) => {
    await waitForAppReady(mainPage);

    // Extra wait for services to stabilize
    await mainPage.waitForTimeout(5_000);

    // Click on Platform menu in the menu bar
    const platformMenu = mainPage.locator('button:has-text("Platform")');
    await platformMenu.click();

    // Wait for dropdown to appear and click "New Project"
    const newProjectItem = mainPage.getByRole('menuitem', { name: /New Project/i });
    await expect(newProjectItem).toBeVisible({ timeout: 5_000 });
    await newProjectItem.click();

    // Wait for dialog to load
    const { frame } = await waitForCreateProjectDialogToLoad(mainPage);

    // Verify the dialog opened with General tab content
    await expect(frame.locator('label:has-text("Short Name")')).toBeVisible({ timeout: 10_000 });
  });

  test('should open Create Project dialog via PAPI command', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Extra wait for services to stabilize
    await mainPage.waitForTimeout(5_000);

    const { frame } = await openCreateProjectViaPAPI(papiClient, mainPage);

    // Verify key elements render using labels (avoid strict mode violations)
    await expect(frame.locator('label:has-text("Short Name")')).toBeVisible({ timeout: 10_000 });
    await expect(frame.locator('label:has-text("Project Type")')).toBeVisible({ timeout: 10_000 });
    await expect(frame.locator('label:has-text("Language")')).toBeVisible({ timeout: 10_000 });
    await expect(frame.locator('label:has-text("Versification")')).toBeVisible({ timeout: 10_000 });
  });

  test('should navigate between tabs in Create Project dialog', async ({
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await mainPage.waitForTimeout(5_000);

    const { frame } = await openCreateProjectViaPAPI(papiClient, mainPage);

    // Click on Books tab
    await frame.locator('role=tab[name=/Books/i]').click();

    // Verify Books tab content - use exact match to avoid strict mode violation
    await expect(frame.getByRole('button', { name: 'Select All', exact: true })).toBeVisible({
      timeout: 10_000,
    });

    // Go back to General tab
    await frame.locator('role=tab[name=/General/i]').click();

    // Verify General tab content
    await expect(frame.locator('label:has-text("Short Name")')).toBeVisible({ timeout: 10_000 });
  });

  test('should display all expected tabs', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);
    await mainPage.waitForTimeout(5_000);

    const { frame } = await openCreateProjectViaPAPI(papiClient, mainPage);

    // Verify all tabs are visible
    await expect(frame.locator('role=tab[name=/General/i]')).toBeVisible();
    await expect(frame.locator('role=tab[name=/Books/i]')).toBeVisible();
    await expect(frame.locator('role=tab[name=/Associations/i]')).toBeVisible();
    await expect(frame.locator('role=tab[name=/Notes/i]')).toBeVisible();
    await expect(frame.locator('role=tab[name=/Advanced/i]')).toBeVisible();
    await expect(frame.locator('role=tab[name=/Additions/i]')).toBeVisible();
  });
});
