/**
 * Type-through e2e for the live-typing ↔ PDP save/echo coordination (PT-4187 stabilization wave).
 *
 * The PDP round-trips every keystroke-driven save through USFM and echoes it back to the
 * actively-edited editor. This spec guards the invariants that keep that from losing a keystroke or
 * yanking the caret:
 *
 * - Typed text survives the save/echo round-trip (no eaten characters);
 * - A second burst typed AFTER the echo has returned lands CONTIGUOUS with the first (the caret was
 *   not nulled by an echo that replaced the editor);
 * - Text typed on one chapter is saved to THAT chapter when the user navigates away — it is still
 *   there on return, and never bleeds onto the chapter navigated to.
 *
 * Robust-by-construction rather than timing-racy: every assertion polls for a stable end state with
 * a generous timeout, so it does not depend on hitting the ~700ms debounce/echo window precisely.
 *
 * ONE test() per spec file on purpose (the isolated fixture is test-scoped and a second Electron
 * instance against the shared renderer dev server has a documented dock-tab failure mode — see
 * standard-default-power-mode.spec.ts). Sub-scenarios are test.step()s sharing the one instance.
 *
 * Runs against an isolated project root (the bundled sample WEB is installed into the empty root):
 * `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode so the editor opens in Standard view (marker-editable) — the surface these fixes
// target. DEV_NOISY=false keeps the normal Home layout (see standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

// Distinctive all-caps tokens that never appear in the WEB text, so a `toContainText` match is
// unambiguous and any dropped character makes the match fail.
const FIRST_BURST = 'TYPETHROUGHALPHA';
const SECOND_BURST = 'TYPETHROUGHBETA';

test.describe('scripture editor type-through', () => {
  test('preserves every character and the caret across the PDP save/echo round-trip', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, then several seconds of
    // deliberately-paced typing). Give it Playwright's 3x "slow" budget for headroom.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    const editorInput = editorFrame.locator('.editor-input.marker-editable');

    await test.step('typed text survives the save/echo round-trip', async () => {
      // Jonah (4 chapters) lets the same book cover the chapter-switch step below.
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toBeAttached({ timeout: 60_000 });

      // Focus the editor and park the caret at the end of a line so typing appends into real text.
      await editorInput.click();
      await editorInput.press('End');

      // Type slowly enough (≈800ms of keystrokes) that the 700ms debounced PDP save fires and its
      // USFM-normalized echo returns; every character must still be present afterward.
      await editorInput.pressSequentially(FIRST_BURST, { delay: 50 });
      await expect(editorInput).toContainText(FIRST_BURST, { timeout: 20_000 });
    });

    await test.step('a second burst typed after the echo lands contiguously (caret not reset)', async () => {
      // Deliberately do NOT re-click or move the caret. If an own-write echo had replaced the
      // editor and nulled the Lexical selection, this burst would land elsewhere (or be dropped)
      // and the contiguous match below would fail.
      await editorInput.pressSequentially(SECOND_BURST, { delay: 50 });
      await expect(editorInput).toContainText(`${FIRST_BURST}${SECOND_BURST}`, { timeout: 20_000 });
    });

    await test.step('content typed before a chapter switch is saved to the chapter it was typed in', async () => {
      // Navigating away flushes the pending save against Jonah 1. Jonah 2 must NOT inherit the
      // typed tokens (a stale cross-chapter write would put them there)...
      await navigateToolbarBcv(mainPage, 'Jonah 2:1');
      await expect(editorInput).not.toContainText(FIRST_BURST, { timeout: 20_000 });

      // ...and returning to Jonah 1 must still show the saved edits (the flush persisted them).
      await navigateToolbarBcv(mainPage, 'Jonah 1:1');
      await expect(editorInput).toContainText(`${FIRST_BURST}${SECOND_BURST}`, { timeout: 20_000 });
    });
  });
});
