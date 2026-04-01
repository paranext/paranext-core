import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame, DEFAULT_PERSON_NAME } from './overlay-helpers';

test('overlay popover rendering and interaction', async ({ mainPage }) => {
  await waitForAppReady(mainPage);
  const frame = await findHelloRock3Frame(mainPage);

  // The greeting element has cursor: help style and triggers a popover on hover.
  // The hello-rock3 code uses a 400ms hover delay before showing the popover.
  const greetingEl = frame.locator('[style*="cursor"]');
  await expect(greetingEl).toBeVisible({ timeout: 10_000 });

  await test.step('hover on greeting shows markdown popover with expected content', async () => {
    // Hover to trigger the popover
    await greetingEl.hover();

    // Wait for the popover to appear in the parent document.
    // The hover delay is 400ms, plus render time, so we use a generous timeout.
    const popover = mainPage.locator('[data-overlay-popover]');
    await expect(popover).toBeVisible({ timeout: 5_000 });

    // Verify the popover content - a markdown type with person details.
    // Title is "About {name}" rendered as a markdown heading.
    await expect(popover).toContainText('About');
    await expect(popover).toContainText(DEFAULT_PERSON_NAME);

    // Markdown bold terms: Name, Greeting, Age
    await expect(popover).toContainText('Name');
    await expect(popover).toContainText('Greeting');
    await expect(popover).toContainText('Age');

    // Clean up: move mouse away to dismiss
    await frame.locator('.title').hover();
    await expect(popover).not.toBeVisible({ timeout: 5_000 });
  });

  await test.step('popover reappears after dismissal and re-hover', async () => {
    // Show the popover
    await greetingEl.hover();
    const popover = mainPage.locator('[data-overlay-popover]');
    await expect(popover).toBeVisible({ timeout: 10_000 });

    // Dismiss by moving away
    await frame.locator('.title').hover();
    await expect(popover).not.toBeVisible({ timeout: 5_000 });

    // Re-hover should show the popover again (verifies cleanup/re-trigger works)
    await greetingEl.hover();
    await expect(popover).toBeVisible({ timeout: 10_000 });

    // Clean up
    await frame.locator('.title').hover();
    await expect(popover).not.toBeVisible({ timeout: 5_000 });
  });
});
