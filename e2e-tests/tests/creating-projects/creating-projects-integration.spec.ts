import { test, expect, type Page } from '../../fixtures/papi.fixture';
import type { PapiClient } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';
import type { FrameLocator } from '@playwright/test';

/**
 * E2E integration tests for the creating-projects feature.
 *
 * These tests verify that PAPI commands are registered and callable, the happy-path project
 * creation flow works end-to-end, and error handling returns structured validation results.
 *
 * Command prefix: paratextProjectCreation Data contracts:
 * .context/features/creating-projects/data-contracts.md
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Open the New Project dialog and return a FrameLocator for the web view content. Follows the same
 * pattern as smoke tests (ui-interaction.spec.ts).
 */
async function openNewProjectDialog(papiClient: PapiClient, mainPage: Page): Promise<FrameLocator> {
  await waitForAppReady(mainPage);

  // Open the dialog via PAPI command (registered in extension main.ts).
  // Retry the command because the extension may still be loading when the first attempt fires.
  let opened = false;
  for (let attempt = 0; attempt < 3 && !opened; attempt++) {
    try {
      await papiClient.sendCommand('paratextProjectCreation.showNewProject');
      opened = true;
    } catch {
      // Command not yet registered — wait and retry
      await mainPage.waitForTimeout(2000);
    }
  }

  // Wait for the dock tab to appear (same pattern as smoke tests for About/Settings)
  const newProjectTab = mainPage.locator('.dock-tab', { hasText: /New Project/i });
  await expect(newProjectTab).toBeVisible({ timeout: 15_000 });

  // The web view content is inside an iframe within the dock panel.
  // Find the iframe that contains the project creation form.
  // We look for an iframe that has the Cancel/OK buttons to ensure we have the right one.
  const allFrames = mainPage.frames();
  let webViewFrame = mainPage.frameLocator('iframe').last();

  // Wait for the form content to render inside the iframe.
  // The Cancel button is always visible regardless of scroll position.
  await expect(webViewFrame.getByRole('button', { name: /Cancel/i })).toBeVisible({
    timeout: 10_000,
  });

  return webViewFrame;
}

// ---------------------------------------------------------------------------
// 1. PAPI Command Registration
// ---------------------------------------------------------------------------

test.describe('Creating Projects - PAPI Command Registration', () => {
  test('should respond to getTypeConfiguration command', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      baseProjectRequired: boolean;
      editableDefault: boolean;
      isDerivedType: boolean;
      isScripture: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'Standard');

    expect(config).toBeDefined();
    expect(config.projectType).toBe('Standard');
    expect(config.baseProjectRequired).toBe(false);
    expect(config.editableDefault).toBe(true);
    expect(config.isDerivedType).toBe(false);
    expect(config.isScripture).toBe(true);
  });

  test('should respond to getValidBaseProjects command', async ({ papiClient }) => {
    const projects = await papiClient.sendCommand<unknown[]>(
      'paratextProjectCreation.getValidBaseProjects',
      'BackTranslation',
    );
    expect(projects).toBeDefined();
  });

  test('should respond to validateShortName command', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode?: string;
    }>('paratextProjectCreation.validateShortName', 'MPP', true);

    expect(result).toBeDefined();
    expect(typeof result.isValid).toBe('boolean');
  });

  test('should respond to getRegistrationState command', async ({ papiClient }) => {
    const state = await papiClient.sendCommand<{
      status: string;
      canRegisterOnline: boolean;
      registryServerAvailable: boolean;
    }>('paratextProjectCreation.getRegistrationState', '', '', 'Standard');

    expect(state).toBeDefined();
    expect(typeof state.status).toBe('string');
    expect(typeof state.canRegisterOnline).toBe('boolean');
  });

  test('should respond to getAvailableLanguages command', async ({ papiClient }) => {
    const languages = await papiClient.sendCommand<unknown[]>(
      'paratextProjectCreation.getAvailableLanguages',
      '',
    );
    expect(languages).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// 2. Happy Path: UI-Backend Integration
// ---------------------------------------------------------------------------

test.describe('Creating Projects - Happy Path UI', () => {
  test('should open New Project dialog and see General tab', async ({ papiClient, mainPage }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // General tab should be active by default
    const generalTab = frame.getByRole('tab', { name: /General/i });
    await expect(generalTab).toBeVisible();

    // Verify key form sections are present
    await expect(frame.locator('legend', { hasText: /Project Name/i })).toBeVisible();
    await expect(frame.locator('legend', { hasText: /Language/i })).toBeVisible();
    await expect(frame.getByLabel(/Type of Project/i)).toBeVisible();

    await mainPage.screenshot({
      path: 'e2e-tests/test-results/creating-projects-general-tab.png',
    });
  });

  test('should show all expected tabs for Standard project', async ({ papiClient, mainPage }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // Select Standard project type via the select trigger
    const typeSelect = frame.locator('#project-type');
    await typeSelect.click();
    await frame.getByRole('option', { name: /Standard Translation/i }).click();

    // Wait for type configuration to load
    await mainPage.waitForTimeout(1000);

    // Verify tabs: General, Books, Associations, Notes, Advanced
    for (const tabName of ['General', 'Books', 'Associations', 'Notes', 'Advanced']) {
      await expect(frame.getByRole('tab', { name: new RegExp(tabName, 'i') })).toBeVisible();
    }
  });

  test('should navigate between tabs without errors', async ({ papiClient, mainPage }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // Select Standard to make Books tab visible
    const typeSelect = frame.locator('#project-type');
    await typeSelect.click();
    await frame.getByRole('option', { name: /Standard Translation/i }).click();
    await mainPage.waitForTimeout(1000);

    // Click through each tab. Use dispatchEvent because tabs near the top of the
    // iframe may be outside the viewport in the small floating dialog window.
    for (const tabName of ['Books', 'Advanced', 'Associations', 'Notes', 'General']) {
      await frame.getByRole('tab', { name: new RegExp(tabName, 'i') }).dispatchEvent('click');
      await mainPage.waitForTimeout(300);
    }

    await mainPage.screenshot({
      path: 'e2e-tests/test-results/creating-projects-after-tab-navigation.png',
    });
  });

  test('should show "Based on" dropdown when BackTranslation type selected', async ({
    papiClient,
    mainPage,
  }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // Select BackTranslation type
    const typeSelect = frame.locator('#project-type');
    await typeSelect.click();
    await frame.getByRole('option', { name: /Back Translation/i }).click();

    // Wait for type config to load (base project is required for derived types)
    await mainPage.waitForTimeout(1500);

    // The "Based on:" select should now be visible
    await expect(frame.locator('#base-project')).toBeVisible({ timeout: 5_000 });

    await mainPage.screenshot({
      path: 'e2e-tests/test-results/creating-projects-back-translation.png',
    });
  });

  test('should show "Based on" dropdown when Daughter type selected', async ({
    papiClient,
    mainPage,
  }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    const typeSelect = frame.locator('#project-type');
    await typeSelect.click();
    await frame.getByRole('option', { name: /Daughter Translation/i }).click();

    await mainPage.waitForTimeout(1500);

    // Daughter is also a derived type — "Based on" should appear
    await expect(frame.locator('#base-project')).toBeVisible({ timeout: 5_000 });
  });

  test('should hide Books tab for ConsultantNotes type', async ({ papiClient, mainPage }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    const typeSelect = frame.locator('#project-type');
    await typeSelect.click();
    await frame.getByRole('option', { name: /Consultant Notes/i }).click();

    await mainPage.waitForTimeout(1000);

    // Books tab should NOT be visible for ConsultantNotes
    await expect(frame.getByRole('tab', { name: /Books/i })).not.toBeVisible();
  });

  test('should disable OK button when no project type selected', async ({
    papiClient,
    mainPage,
  }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // OK button should be disabled with default state (NotSelected type, empty name)
    const okButton = frame.getByRole('button', { name: /^OK$/i });
    await expect(okButton).toBeDisabled();
  });

  test('should show validation messages when required fields missing', async ({
    papiClient,
    mainPage,
  }) => {
    const frame = await openNewProjectDialog(papiClient, mainPage);

    // With no fields filled, validation messages should appear
    // GAP-007: "Please select a project type", "Full name is required", etc.
    await expect(frame.getByText(/Please select a project type/i)).toBeVisible();
    await expect(frame.getByText(/Full name is required/i)).toBeVisible();
    await expect(frame.getByText(/Short name is required/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 3. Happy Path: PAPI Command-Level
// ---------------------------------------------------------------------------

test.describe('Creating Projects - Happy Path PAPI', () => {
  test('should validate project name and return valid for good name', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode?: string;
    }>('paratextProjectCreation.validateShortName', 'MPP', true);

    expect(result.isValid).toBe(true);
    expect(result.errorCode).toBeFalsy();
  });

  test('should get type configuration for Standard project', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      baseProjectRequired: boolean;
      registrationRequired: boolean;
      booksTabVisible: boolean;
      isScripture: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'Standard');

    expect(config.projectType).toBe('Standard');
    expect(config.baseProjectRequired).toBe(false);
    expect(config.registrationRequired).toBe(true);
    expect(config.booksTabVisible).toBe(true);
    expect(config.isScripture).toBe(true);
  });

  test('should get type configuration for BackTranslation (derived type)', async ({
    papiClient,
  }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      baseProjectRequired: boolean;
      isDerivedType: boolean;
      sharesParentRegistration: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'BackTranslation');

    expect(config.projectType).toBe('BackTranslation');
    expect(config.baseProjectRequired).toBe(true);
    expect(config.isDerivedType).toBe(true);
    expect(config.sharesParentRegistration).toBe(true);
  });

  test('should get type configuration for Daughter (derived type)', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      baseProjectRequired: boolean;
      isDerivedType: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'Daughter');

    expect(config.projectType).toBe('Daughter');
    expect(config.baseProjectRequired).toBe(true);
    expect(config.isDerivedType).toBe(true);
  });

  test('should get type configuration for Auxiliary (non-scripture)', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      isScripture: boolean;
      booksTabVisible: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'Auxiliary');

    expect(config.projectType).toBe('Auxiliary');
    expect(config.isScripture).toBe(false);
  });

  test('should get type configuration for ConsultantNotes', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      booksTabVisible: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'ConsultantNotes');

    expect(config.projectType).toBe('ConsultantNotes');
    expect(config.booksTabVisible).toBe(false);
  });

  test('should create a Standard project via PAPI and clean up', async ({ papiClient }) => {
    // Create a project with all required fields
    const result = await papiClient.sendCommand<{
      success: boolean;
      projectGuid?: string;
      errorCode?: string;
      errorMessage?: string;
    }>('paratextProjectCreation.createProject', {
      shortName: 'E2E',
      fullName: 'E2E Test Project',
      languageId: 'en',
      versification: 'English',
      projectType: 'Standard',
    });

    try {
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.projectGuid).toBeTruthy();
    } finally {
      // Always clean up the created project, even if assertions fail
      if (result?.projectGuid) {
        await papiClient.sendCommand(
          'paratextProjectCreation.cleanupProject',
          result.projectGuid,
          false,
        );
      }
    }
  });

  test('should get type configuration for StudyBibleAdditions', async ({ papiClient }) => {
    const config = await papiClient.sendCommand<{
      projectType: string;
      baseProjectRequired: boolean;
    }>('paratextProjectCreation.getTypeConfiguration', 'StudyBibleAdditions');

    expect(config.projectType).toBe('StudyBibleAdditions');
    expect(config.baseProjectRequired).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 4. Error Handling
// ---------------------------------------------------------------------------

test.describe('Creating Projects - Error Handling', () => {
  test('should reject short name that is too short (< 3 chars)', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode: string;
    }>('paratextProjectCreation.validateShortName', 'AB', true);

    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('SHORTNAME_TOO_SHORT');
  });

  test('should reject short name that is too long (> 8 chars)', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode: string;
    }>('paratextProjectCreation.validateShortName', 'ABCDEFGHI', true);

    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('SHORTNAME_TOO_LONG');
  });

  test('should reject short name with invalid characters', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode: string;
    }>('paratextProjectCreation.validateShortName', 'AB@D', true);

    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('SHORTNAME_INVALID_CHARS');
  });

  test('should reject short name with whitespace', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
    }>('paratextProjectCreation.validateShortName', 'AB CD', true);

    expect(result.isValid).toBe(false);
  });

  test('should reject Windows reserved name', async ({ papiClient }) => {
    const result = await papiClient.sendCommand<{
      isValid: boolean;
      errorCode: string;
    }>('paratextProjectCreation.validateShortName', 'CON', true);

    expect(result.isValid).toBe(false);
    expect(result.errorCode).toBe('SHORTNAME_RESERVED');
  });

  test('should return NotSelected registration status when no type selected', async ({
    papiClient,
  }) => {
    const state = await papiClient.sendCommand<{
      status: string;
      canRegisterOnline: boolean;
    }>('paratextProjectCreation.getRegistrationState', '', '', 'NotSelected');

    expect(state.status).toBe('NotSelected');
    expect(state.canRegisterOnline).toBe(false);
  });
});
