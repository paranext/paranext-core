/**
 * The Scripture editor's hamburger menu gates its Insert items declaratively on context keys: the
 * footnote, endnote and cross-reference items are disabled (not hidden) while the project is
 * read-only and enable, without reopening the tab, once it becomes editable. Insert comment stays
 * enabled throughout, since it depends on the comment permission rather than editability. "Show
 * footnotes" is a checkbox item whose checkmark follows the footnotes pane's visibility.
 *
 * The sample WEB project ships `<Editable>F</Editable>`, so the editor starts read-only. No e2e
 * fixture is a published resource, so the Comments item's resource gating is covered by the C# unit
 * tests rather than here.
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

/** Gated on the project being editable. */
const INSERT_NOTE_ITEM_NAMES = ['Insert footnote', 'Insert endnote', 'Insert cross-reference'];

/** Gated on the user's comment permission, not on the project being editable. */
const INSERT_COMMENT_ITEM_NAME = 'Insert comment';

test.describe('Dynamic menu items', () => {
  test('Insert items follow the project editable state and Show footnotes shows its checkmark', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several menu opens).
    test.slow();

    await waitForHomeTab(mainPage);
    // The fixture id is lower case while context keys use the canonical upper-case id, so opening
    // with it as-is also covers the menu's project id normalization.
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = await getEditorFrame(mainPage, editorId);
    await editorFrame.locator('.editor-container').first().waitFor({ timeout: 60_000 });

    const hamburger = editorFrame.locator(EDITOR_HAMBURGER_SELECTOR);
    const openMenu = async () => {
      await expect(hamburger).toBeVisible({ timeout: 15_000 });
      await hamburger.click();
      await expect(editorFrame.getByRole('menu').first()).toBeVisible({ timeout: 5_000 });
    };
    const closeMenu = async () => {
      await mainPage.keyboard.press('Escape');
      await expect(editorFrame.getByRole('menu')).toHaveCount(0, { timeout: 5_000 });
    };
    // The accessible name is the label followed by its keyboard shortcut hint, so match the start.
    const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const insertItem = (name: string) =>
      editorFrame.getByRole('menuitem', { name: new RegExp(`^${escapeRegExp(name)}(\\s|$)`) });

    await test.step('Insert items are disabled, not hidden, in a read-only project', async () => {
      await openMenu();
      // Comments stay available in a read-only project. This check retries until the C# process
      // has published `canCreateComments`, so it runs first: the disabled assertions below prove
      // nothing until the project's keys have arrived.
      await expect(insertItem(INSERT_COMMENT_ITEM_NAME)).toBeVisible({ timeout: 10_000 });
      await expect(insertItem(INSERT_COMMENT_ITEM_NAME)).not.toHaveAttribute(
        'aria-disabled',
        'true',
      );
      await Promise.all(
        INSERT_NOTE_ITEM_NAMES.map(async (name) => {
          await expect(insertItem(name)).toBeVisible({ timeout: 10_000 });
          await expect(insertItem(name)).toHaveAttribute('aria-disabled', 'true');
        }),
      );
      await closeMenu();
    });

    await test.step('Insert items enable once the project becomes editable, without reopening', async () => {
      await makeSampleProjectEditable();
      // The key change reaches the open tab through the shared store, so the menu re-evaluates.
      await expect
        .poll(
          async () => {
            try {
              await openMenu();
              const disabledFlags = await Promise.all(
                INSERT_NOTE_ITEM_NAMES.map((name) =>
                  insertItem(name).getAttribute('aria-disabled'),
                ),
              );
              return disabledFlags.every((flag) => flag !== 'true');
            } finally {
              await closeMenu();
            }
          },
          { timeout: 30_000 },
        )
        .toBe(true);
    });

    await test.step('Show footnotes flips its checkmark when toggled', async () => {
      const showFootnotes = () =>
        editorFrame.getByRole('menuitemcheckbox', { name: /Show footnotes/i });
      await openMenu();
      await expect(showFootnotes()).toBeVisible({ timeout: 10_000 });
      const before = await showFootnotes().getAttribute('aria-checked');
      expect(['true', 'false']).toContain(before);
      await showFootnotes().click();

      await expect
        .poll(
          async () => {
            try {
              await openMenu();
              return await showFootnotes().getAttribute('aria-checked');
            } finally {
              await closeMenu();
            }
          },
          { timeout: 20_000 },
        )
        .toBe(before === 'true' ? 'false' : 'true');
    });
  });
});
