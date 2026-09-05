/**
 * E2E for the real OS-clipboard round trip of Standard-view USFM: copying editor content puts
 * byte-faithful USFM (including `\v` and `\p` marker bytes) on the operating-system clipboard;
 * pasting external USFM-looking text back in tokenizes it into the editor's marker spans; the paste
 * and the rebuild it triggers are a single undo step; and pasting a `\c` chapter marker cannot
 * corrupt the open chapter, because the engine strips `\c`/`\id` bytes on external paste.
 *
 * THIS SPEC IS WRITTEN BUT HAS NOT BEEN RUN. The Electron app instance and the ports it needs
 * (1212, 8876, 9223) were held by a separate session, and the editor build this spec exercises had
 * not yet been linked into the running app, at the time this file was written. It is verified by
 * `tsc --noEmit` and `eslint` only — no attempt was made to launch the app or execute the test.
 * Tracked as PT-4201; run with `npm run test:e2e:isolated
 * scripture-editor/clipboard-usfm-round-trip` once the app/ports are free and the editor build is
 * current, then iterate on selectors/timing only — a behavior failure at this layer means the
 * underlying engine work regressed, not this spec.
 *
 * The "external application" side of the round trip is Electron's main-process `clipboard` module,
 * reached via `electronApp.evaluate(({ clipboard }) => ...)`. That reads and writes the real OS
 * clipboard from OUTSIDE the renderer entirely — bypassing `navigator.clipboard` and its renderer
 * permission surface — which is exactly the external round trip this spec needs to exercise.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). Sub-scenarios are test.step()s
 * sharing the one instance, in sequence, so each step's assertions run against the state the prior
 * step left behind (the undo step, in particular, depends on the paste step having landed).
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// Power mode so the editor opens in Standard view (marker-editable) — the surface this feature
// targets. DEV_NOISY=false keeps the normal Home layout (see standard-default-power-mode.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

// A fabricated all-caps token that cannot occur in the bundled WEB text, so `toContainText` /
// `not.toContainText` are unambiguous (same rationale as type-through-save-echo.spec.ts's
// TYPETHROUGHALPHA/BETA). "Yahweh" — the word used in earlier drafts of this spec — actually
// occurs natively throughout Jonah 1 (vv. 1, 3, 4, 9, 10, 14 x3, 16 x2, 17 in the bundled WEB SFM),
// which would make the paste-landed assertion pass vacuously and the undo assertion unsatisfiable.
const PASTE_TOKEN = 'CLIPROUNDTRIPALPHA';

test.describe('scripture editor clipboard USFM round trip', () => {
  test('Standard view copy/paste round-trips byte-faithful USFM through the real OS clipboard', async ({
    mainPage,
    electronApp,
  }) => {
    // Heavy isolated test (own Electron instance, backend-readiness gates, several clipboard round
    // trips each awaiting a settle/save). 3x "slow" budget — see standard-default-power-mode.spec.ts.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Jonah 1 (same book used by type-through-save-echo.spec.ts) — a small single chapter that
    // opens with a `\p` paragraph marker immediately followed by `\v 1`.
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    const editorInput = editorFrame.locator('.editor-input.marker-editable');
    await expect(editorInput).toBeAttached({ timeout: 60_000 });
    await expect(editorInput).toContainText('Amittai', { timeout: 60_000 });

    // The active reference, read from the main toolbar — used below as an independent signal (not
    // derived from the editor DOM at all) that a paste never changed the open chapter.
    const bcvTrigger = mainPage.locator('button[aria-label="book-chapter-trigger"]').first();

    await test.step('copying a selection puts byte-faithful USFM on the OS clipboard', async () => {
      await editorInput.click();
      await editorInput.press('Control+Home');
      await editorInput.press('Shift+Control+End');
      await editorInput.press('Control+C');

      // The renderer's copy handler may forward to the OS clipboard asynchronously, so poll rather
      // than reading once — a single premature read could observe a stale/empty clipboard.
      let clipboardText = '';
      await expect
        .poll(
          async () => {
            clipboardText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
            return clipboardText;
          },
          { timeout: 15_000 },
        )
        .toMatch(/\\v 1 /);
      // Paragraph-marker bytes survived to the OS clipboard too, not just the verse marker.
      expect(clipboardText).toMatch(/\\p /);
    });

    await test.step('pasting external USFM-looking text tokenizes into editor marker spans', async () => {
      await electronApp.evaluate(
        ({ clipboard }, token) => clipboard.writeText(`\\nd ${token}\\nd* `),
        PASTE_TOKEN,
      );
      await editorInput.click();
      await editorInput.press('Control+End');
      await editorInput.press('Control+V');
      await expect(editorInput).toContainText(PASTE_TOKEN, { timeout: 20_000 });

      // A fully-terminated paste (`\nd …\nd* `, both opener and closer present) rebuilds
      // synchronously at paste time — unlike a typed span mid-edit, there is no pending tier it
      // needs to depart to settle (contrast attribute-display-settle.spec.ts, where departure is
      // required because typing stops mid-span). This Home press is belt-and-braces only, not a
      // required step, in case caret position affects rendering some other way.
      await editorInput.press('Home');

      await expect(editorFrame.locator('span.opening[data-marker="nd"]').first()).toBeAttached({
        timeout: 20_000,
      });
      await expect(editorFrame.locator('span.closing[data-marker="nd"]').first()).toBeAttached({
        timeout: 20_000,
      });
    });

    await test.step('undoing the paste is a single step', async () => {
      await editorInput.press('Control+Z');
      await expect(editorInput).not.toContainText(PASTE_TOKEN, { timeout: 20_000 });
      await expect(editorFrame.locator('span.opening[data-marker="nd"]')).toHaveCount(0, {
        timeout: 20_000,
      });
    });

    await test.step('pasting a `\\c` chapter marker cannot corrupt the open chapter', async () => {
      // Chapter markers render as a block-level `<p class="chapter-marker usfm_c"
      // data-marker="c">` (ChapterNode.createDOM), not an inline `span.opening` — the loaded
      // chapter has exactly one going in, and a corrupted paste could either add a second one or
      // replace/remove the existing one, so pin the baseline before pasting.
      const chapterMarker = editorFrame.locator('p.chapter-marker[data-marker="c"]');
      await expect(chapterMarker).toHaveCount(1);

      await electronApp.evaluate(({ clipboard }) => clipboard.writeText('\\c 99 '));
      await editorInput.click();
      await editorInput.press('Control+End');
      await editorInput.press('Control+V');

      // Assert the engine's strip guarantee three independent ways: the chapter-marker block
      // count is unchanged (no second one added, the existing one not corrupted away), no literal
      // `\c 99` bytes landed as text either, and the toolbar's active reference — read entirely
      // outside the editor DOM — is still Jonah 1. Any of the three would fail if a stray
      // "\c 99" were (mis)tokenized as a real chapter marker.
      await expect(chapterMarker).toHaveCount(1, { timeout: 20_000 });
      await expect(editorInput).not.toContainText('\\c 99');
      await expect(bcvTrigger).toContainText('Jonah 1', { timeout: 10_000 });
    });
  });
});
