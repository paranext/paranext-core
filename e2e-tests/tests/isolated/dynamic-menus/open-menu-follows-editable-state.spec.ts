/**
 * An editor tab's hamburger menu keeps Insert footnote disabled after the project becomes editable:
 * the tab's read-only state is fixed when the tab opens (the editor itself stays read-only until
 * the tab is reopened), so the menu must not offer an item that would do nothing.
 * `makeSampleProjectEditable()` writes over PAPI rather than through the UI, so the menu stays open
 * across the change.
 *
 * The sample WEB project ships `<Editable>F</Editable>`, so the tab opens read-only. The
 * "re-evaluates while open" behavior for items that follow live state is covered by the unit tests
 * over the real menu expressions; no menu item in this tab both follows live state and can be
 * flipped from PAPI here.
 *
 * ONE test() per spec file (isolated-fixture constraint — see
 * scripture-editor/standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated
 * tests/isolated/dynamic-menus/`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  EDITOR_HAMBURGER_SELECTOR,
  getEditorFrame,
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('Dynamic menu items', () => {
  test('an open editor menu keeps Insert footnote disabled in a tab opened read-only when the project becomes editable', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates).
    test.slow();

    await waitForHomeTab(mainPage);
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').first().waitFor({ timeout: 60_000 });

    const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
    // The accessible name is the label followed by its keyboard shortcut hint, so match the start.
    const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const insertItem = (name: string) =>
      editorFrame.getByRole('menuitem', { name: new RegExp(`^${escapeRegExp(name)}(\\s|$)`) });

    await expect(hamburger).toBeVisible({ timeout: 15_000 });
    await hamburger.click();
    await expect(editorFrame.getByRole('menu').first()).toBeVisible({ timeout: 5_000 });

    // Positive control: Insert comment depends on the comment permission, not editability. It runs
    // first because the disabled assertion below proves nothing until the project's keys arrived.
    await expect(insertItem('Insert comment')).toBeVisible({ timeout: 10_000 });
    await expect(insertItem('Insert comment')).not.toHaveAttribute('aria-disabled', 'true');
    await expect(insertItem('Insert footnote')).toHaveAttribute('aria-disabled', 'true');

    // The menu stays open across the change.
    await makeSampleProjectEditable();

    // Give the project-editable key time to reach the open menu; the tab's own read-only state
    // still wins, so the item stays disabled.
    await mainPage.waitForTimeout(5_000);
    await expect(insertItem('Insert footnote')).toBeVisible();
    await expect(insertItem('Insert footnote')).toHaveAttribute('aria-disabled', 'true');
    // Still the same open menu.
    await expect(editorFrame.getByRole('menu').first()).toBeVisible();

    await mainPage.keyboard.press('Escape');
    await expect(editorFrame.getByRole('menu')).toHaveCount(0, { timeout: 5_000 });
  });
});
