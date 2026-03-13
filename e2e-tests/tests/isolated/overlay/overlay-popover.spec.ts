import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import { findHelloRock3Frame, DEFAULT_PERSON_NAME } from './overlay-helpers';

test.describe('Overlay Popover', () => {
  test('hover on greeting shows description popover with expected content', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    const frame = await findHelloRock3Frame(mainPage);

    // The greeting element has cursor: help style and triggers a popover on hover.
    // The hello-rock3 code uses a 400ms hover delay before showing the popover.
    const greetingEl = frame.locator('[style*="cursor"]');
    await expect(greetingEl).toBeVisible({ timeout: 10_000 });

    // Hover to trigger the popover
    await greetingEl.hover();

    // Wait for the popover to appear in the parent document.
    // The hover delay is 400ms, plus render time, so we use a generous timeout.
    const popover = mainPage.locator('[data-overlay-popover]');
    await expect(popover).toBeVisible({ timeout: 5_000 });

    // Verify the popover content — a description type with person details.
    // Title is "About {name}" where name defaults to the contributed setting default.
    await expect(popover).toContainText('About');
    await expect(popover).toContainText(DEFAULT_PERSON_NAME);

    // Description entries: Name, Greeting, Age
    await expect(popover).toContainText('Name');
    await expect(popover).toContainText('Greeting');
    await expect(popover).toContainText('Age');

    // Clean up: move mouse away to dismiss
    await frame.locator('.title').hover();
    await expect(popover).not.toBeVisible({ timeout: 5_000 });
  });

  test('popover dismissed on mouse leave', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const frame = await findHelloRock3Frame(mainPage);

    const greetingEl = frame.locator('[style*="cursor"]');
    await expect(greetingEl).toBeVisible({ timeout: 10_000 });

    // Move mouse away first to ensure a clean mouseenter event on hover
    await frame.locator('.title').hover();

    // Show the popover
    await greetingEl.hover();
    const popover = mainPage.locator('[data-overlay-popover]');
    await expect(popover).toBeVisible({ timeout: 10_000 });

    // Move mouse to a different element in the frame (triggers mouseleave on greeting)
    await frame.locator('.title').hover();

    // Popover should be dismissed via the handleGreetingMouseLeave handler
    await expect(popover).not.toBeVisible({ timeout: 5_000 });
  });
});
