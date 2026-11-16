/**
 * The Scripture editor's hamburger menu re-evaluates while it is open: when the project stops being
 * editable, Insert footnote disables in the same open menu, without closing and reopening it.
 * `makeSampleProjectReadOnly()` writes over PAPI rather than through the UI, so the menu can stay
 * open across the change.
 *
 * The sample WEB project ships `<Editable>F</Editable>`, and a tab opened on a read-only project
 * stays read-only for its life, so the project is made editable BEFORE the tab opens: the tab is an
 * editable editor, and its menu follows the project's live editable state. The tab-opened-read-only
 * case is in `insert-items-follow-editable-state.spec.ts`.
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
  makeSampleProjectReadOnly,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('Dynamic menu items', () => {
  test('an open editor menu disables Insert footnote when the project stops being editable', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates).
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
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

    // Enabled once the project's keys have arrived; this also proves the tab is not read-only.
    await expect(insertItem('Insert footnote')).toBeVisible({ timeout: 10_000 });
    await expect(insertItem('Insert footnote')).not.toHaveAttribute('aria-disabled', 'true', {
      timeout: 30_000,
    });

    // The menu stays open across the change.
    await makeSampleProjectReadOnly();

    await expect(insertItem('Insert footnote')).toHaveAttribute('aria-disabled', 'true', {
      timeout: 30_000,
    });
    // Still the same open menu.
    await expect(editorFrame.getByRole('menu').first()).toBeVisible();

    await mainPage.keyboard.press('Escape');
    await expect(editorFrame.getByRole('menu')).toHaveCount(0, { timeout: 5_000 });
  });
});
