/**
 * The Standard-view keyboard triggers — the `\`/Enter marker palettes and Ctrl+T / Ctrl+Shift+T
 * footnote/cross-reference shortcuts — must fire only when the MAIN editor holds focus. That focus
 * gate is now `editorRef.current.isFocused()`, replacing a global
 * `document.querySelector('.editor-input')` + `activeElement` check that a footnote-editor
 * popover's own `.editor-input` could confuse and that went stale across an editor remount.
 *
 * This spec is the behavioral regression guard for that migration: the `\` trigger still opens the
 * marker palette when the main editor is focused. Passing both before and after the migration
 * proves the common path was preserved; `isFocused()`'s per-instance correctness is unit-tested
 * separately (Editor.test.tsx and use-editor-pdp-sync.hook.test.ts).
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor marker-palette trigger', () => {
  test('the backslash trigger opens the marker palette when the main editor holds focus', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');

    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });

    // The marker palette renders in the renderer (parent doc), not the editor iframe.
    const palette = mainPage.locator('[data-overlay-command-palette]').first();

    await test.step('a selection + backslash opens the focused marker palette', async () => {
      // Focus the main editor and select the line so the `\` opens the focused (non-passive) palette.
      await editorInput.click();
      await editorInput.press('Home');
      await editorInput.press('Shift+End');
      await editorInput.press('\\');
      await expect(palette).toBeAttached({ timeout: 15_000 });
    });

    await test.step('Escape dismisses the palette', async () => {
      await mainPage.keyboard.press('Escape');
      await expect(palette).not.toBeAttached({ timeout: 10_000 });
    });
  });
});
