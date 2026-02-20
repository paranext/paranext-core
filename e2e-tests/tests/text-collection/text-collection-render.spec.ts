import { test, expect } from '../../fixtures/papi.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('select-texts render', () => {
  test('should open SelectTexts web view via PAPI command', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open the SelectTexts web view via the registered command
    const result = await papiClient.sendCommand<string | undefined>(
      'platformScripture.openSelectTexts',
    );

    // The command should return a web view ID (string) on success
    expect(result).toBeTruthy();

    // Wait for the web view to render in the DOM
    await mainPage.waitForTimeout(3000);

    // Verify the select-texts-dialog element is present in any frame
    const frames = mainPage.frames();
    let found = false;
    for (const frame of frames) {
      try {
        const dialog = await frame.$('[data-testid="select-texts-dialog"]');
        if (dialog) {
          found = true;
          break;
        }
      } catch {
        // Frame may have been detached; continue
      }
    }

    expect(found).toBe(true);
  });
});

test.describe('text-collection render', () => {
  test('should open TextCollection web view via menu', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open the TextCollection web view via the registered command
    const result = await papiClient.sendCommand<string | undefined>(
      'platformScripture.openTextCollection',
    );

    // The command should return a web view ID (string) on success
    expect(result).toBeTruthy();

    // Wait for the web view to render in the DOM
    await mainPage.waitForTimeout(3000);

    // Verify the text-collection-main element is present in any frame
    const frames = mainPage.frames();
    let found = false;
    for (const frame of frames) {
      try {
        const element = await frame.$('[data-testid="text-collection-main"]');
        if (element) {
          found = true;
          break;
        }
      } catch {
        // Frame may have been detached; continue
      }
    }

    expect(found).toBe(true);
  });
});

test.describe('open-texts render', () => {
  test('should open OpenTexts web view via menu', async ({ papiClient, mainPage }) => {
    await waitForAppReady(mainPage);

    // Open the OpenTexts dialog via the registered command
    const result = await papiClient.sendCommand<string | undefined>(
      'platformScripture.openOpenTextsDialog',
    );

    // The command should return a web view ID (string) on success
    expect(result).toBeTruthy();

    // Wait for the web view to render in the DOM
    await mainPage.waitForTimeout(3000);

    // Verify the open-texts-dialog element is present in any frame
    const frames = mainPage.frames();
    let found = false;
    for (const frame of frames) {
      try {
        const element = await frame.$('[data-testid="open-texts-dialog"]');
        if (element) {
          found = true;
          break;
        }
      } catch {
        // Frame may have been detached; continue
      }
    }

    expect(found).toBe(true);
  });
});
