import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('Creating Projects - Render Tests', () => {
  test('should open Create Project dialog via menu', async ({ electronApp, mainPage }) => {
    await waitForAppReady(mainPage);

    // Click the main menu (Platform.Bible)
    const mainMenu = mainPage.getByRole('menuitem', { name: /Platform\.Bible/i });
    await mainMenu.click();

    // Look for the New Project menu item
    const newProjectItem = mainPage.getByRole('menuitem', { name: /New Project/i });
    await newProjectItem.click();

    // Wait for the Create Project dialog to appear as a floating web view
    const createProjectDialog = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(createProjectDialog).toBeVisible({ timeout: 15_000 });

    // Verify the General tab is active and contains key form fields
    const generalTab = mainPage.locator('[data-state="active"]', { hasText: /General/i });
    await expect(generalTab).toBeVisible({ timeout: 5_000 });
  });

  test('should open Create Project dialog via PAPI command', async ({
    electronApp,
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Open the Create Project dialog using the PAPI command
    await papiClient.sendCommand('platformProjects.openCreateProject');

    // Wait for the dialog to appear
    const createProjectDialog = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(createProjectDialog).toBeVisible({ timeout: 15_000 });

    // Verify key elements render - Short Name field
    const shortNameLabel = mainPage.locator('label', { hasText: /Short Name/i });
    await expect(shortNameLabel).toBeVisible({ timeout: 5_000 });

    // Verify Project Type field exists
    const projectTypeLabel = mainPage.locator('label', { hasText: /Project Type/i });
    await expect(projectTypeLabel).toBeVisible({ timeout: 5_000 });
  });

  test('should display validation errors when submitting empty form', async ({
    electronApp,
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Open Create Project dialog
    await papiClient.sendCommand('platformProjects.openCreateProject');

    // Wait for dialog
    const createProjectDialog = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(createProjectDialog).toBeVisible({ timeout: 15_000 });

    // Try to click OK without filling required fields
    const okButton = mainPage.getByRole('button', { name: /OK/i });
    await okButton.click();

    // Expect validation error to appear (Short name required)
    const validationError = mainPage.locator('[role="alert"]');
    await expect(validationError.first()).toBeVisible({ timeout: 5_000 });
  });

  test('should navigate between tabs in Create Project dialog', async ({
    electronApp,
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Open Create Project dialog
    await papiClient.sendCommand('platformProjects.openCreateProject');

    // Wait for dialog
    const createProjectDialog = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(createProjectDialog).toBeVisible({ timeout: 15_000 });

    // Click on Books tab
    const booksTab = mainPage.getByRole('tab', { name: /Books/i });
    await booksTab.click();

    // Verify Books tab content is visible (Select All button)
    const selectAllButton = mainPage.getByRole('button', { name: /Select All/i });
    await expect(selectAllButton).toBeVisible({ timeout: 5_000 });

    // Go back to General tab
    const generalTab = mainPage.getByRole('tab', { name: /General/i });
    await generalTab.click();

    // Verify General tab content reappears
    const shortNameLabel = mainPage.locator('label', { hasText: /Short Name/i });
    await expect(shortNameLabel).toBeVisible({ timeout: 5_000 });
  });

  test('should auto-generate short name from full name', async ({
    electronApp,
    papiClient,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Open Create Project dialog
    await papiClient.sendCommand('platformProjects.openCreateProject');

    // Wait for dialog
    const createProjectDialog = mainPage.locator('.dock-tab', { hasText: /Create New Project/i });
    await expect(createProjectDialog).toBeVisible({ timeout: 15_000 });

    // Type a full name in the Full Name field
    const fullNameInput = mainPage.locator('input[aria-label*="Full name"]').first();
    await fullNameInput.fill('Test Project Name');

    // Wait for auto-generation to update short name
    // The short name should update based on the full name
    const shortNameInput = mainPage.locator('input[aria-label*="Short name"]').first();
    await expect(shortNameInput).toHaveValue(/\w+/, { timeout: 5_000 });
  });
});
