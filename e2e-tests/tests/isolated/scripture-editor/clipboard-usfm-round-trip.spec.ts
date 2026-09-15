/**
 * E2E for the real OS-clipboard round trip of Standard-view USFM: copying editor content puts
 * byte-faithful USFM (including `\v` and `\p` marker bytes) on the operating-system clipboard;
 * pasting external USFM-looking text back in tokenizes it into the editor's marker spans; the paste
 * and the rebuild it triggers are a single undo step; and pasting a `\c` chapter marker cannot
 * corrupt the open chapter, because the engine strips `\c`/`\id` bytes on external paste.
 *
 * Run it with `npm run test:e2e:isolated scripture-editor/clipboard-usfm-round-trip`. It needs a
 * current editor build linked into the app (the clipboard behavior it asserts lives in the editor
 * engine, not in this repo), so a behavior failure here means that engine work regressed rather
 * than that this spec drifted — iterate on selectors/timing only.
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
// TYPETHROUGHALPHA/BETA). Scripture vocabulary cannot serve here: "Yahweh", for instance, occurs
// natively throughout Jonah 1 (vv. 1, 3, 4, 9, 10, 14 x3, 16 x2, 17 in the bundled WEB SFM), which
// would make the paste-landed assertion pass vacuously and the undo assertion unsatisfiable.
const PASTE_TOKEN = 'CLIPROUNDTRIPALPHA';
// A second such token, for the `\c` step below, which needs a payload the undo step above has not
// already removed from the document.
const CHAPTER_PASTE_TOKEN = 'CLIPROUNDTRIPBETA';
// Written to the OS clipboard before the copy step, so the poll that follows cannot be satisfied by
// USFM a previous run (or a previous retry attempt) left there — see that step's own comment.
const CLIPBOARD_SENTINEL = 'CLIPROUNDTRIPSENTINELNOTCOPIED';

// `Control+C`/`V`/`Z` and `Control+Home`/`End` are the OS's own editing chords, not app
// accelerators, so they must be spelled per-platform — macOS uses `Meta` for clipboard/undo and
// `Meta+Arrow` for document start/end. Same pattern as navigation-history.spec.ts.
const isMac = process.platform === 'darwin';
const COPY_KEY = isMac ? 'Meta+C' : 'Control+C';
const PASTE_KEY = isMac ? 'Meta+V' : 'Control+V';
const UNDO_KEY = isMac ? 'Meta+Z' : 'Control+Z';
const DOC_START_KEY = isMac ? 'Meta+ArrowUp' : 'Control+Home';
const DOC_END_KEY = isMac ? 'Meta+ArrowDown' : 'Control+End';
const SELECT_TO_DOC_END_KEY = isMac ? 'Shift+Meta+ArrowDown' : 'Shift+Control+End';

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
      // Overwrite whatever the OS clipboard already holds. Without this the poll below cannot tell
      // "this copy wrote USFM" from "USFM was already there": a retry attempt (1 locally, 2 in CI)
      // that got past the poll and then failed the one-shot `\p ` check leaves real copied USFM on
      // the clipboard, and the next attempt's first read would pass with the copy path broken.
      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );

      await editorInput.click();
      await editorInput.press(DOC_START_KEY);
      await editorInput.press(SELECT_TO_DOC_END_KEY);
      await editorInput.press(COPY_KEY);

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
      await editorInput.press(DOC_END_KEY);
      await editorInput.press(PASTE_KEY);
      await expect(editorInput).toContainText(PASTE_TOKEN, { timeout: 20_000 });

      // A fully-terminated paste (`\nd …\nd* `, both opener and closer present) rebuilds
      // synchronously at paste time — unlike a typed span mid-edit, there is no pending tier it
      // needs to depart to settle (contrast attribute-display-settle.spec.ts, where departure is
      // required because typing stops mid-span). This Home press is belt-and-braces only, not a
      // required step, in case caret position affects rendering some other way.
      await editorInput.press('Home');

      // Exact counts, not `.first()` — Jonah has zero `\nd` going in, so a doubled glyph (a real
      // failure mode the engine guards in its own unit tests) has to fail here rather than pass on
      // whichever span happened to come first.
      await expect(editorFrame.locator('span.opening[data-marker="nd"]')).toHaveCount(1, {
        timeout: 20_000,
      });
      await expect(editorFrame.locator('span.closing[data-marker="nd"]')).toHaveCount(1, {
        timeout: 20_000,
      });
    });

    await test.step('undoing the paste is a single step', async () => {
      await editorInput.press(UNDO_KEY);
      await expect(editorInput).not.toContainText(PASTE_TOKEN, { timeout: 20_000 });
      // Both halves of the span, not just the opener: a half-reverted span would otherwise pass.
      await expect(editorFrame.locator('span.opening[data-marker="nd"]')).toHaveCount(0, {
        timeout: 20_000,
      });
      await expect(editorFrame.locator('span.closing[data-marker="nd"]')).toHaveCount(0, {
        timeout: 20_000,
      });
      // Positive control. The three assertions above are all negative, and an editor that is empty
      // or mid-replacement satisfies every one of them — the PDP's debounced save echoes back by
      // replacing editor content wholesale (see type-through-save-echo.spec.ts), and Playwright's
      // negative matchers pass on the first poll that holds. Anchoring on text the undo must have
      // restored, rather than removed, is what makes this step measure the undo.
      await expect(editorInput).toContainText('Amittai', { timeout: 20_000 });
    });

    await test.step('pasting a `\\c` chapter marker cannot corrupt the open chapter', async () => {
      // Chapter markers render as a block-level `<p class="chapter usfm_c" data-marker="c">`
      // (ChapterNode.createDOM), not an inline `span.opening` — the loaded chapter has exactly one
      // going in, and a corrupted paste could either add a second one or replace/remove the
      // existing one, so pin the baseline before pasting.
      const chapterMarker = editorFrame.locator('p.chapter[data-marker="c"]');
      await expect(chapterMarker).toHaveCount(1);

      // The payload leads with a token so the paste has an observable trace. Every assertion below
      // is already true of the PRE-paste document, so without a positive signal that the paste
      // landed at all, this step would pass on its first (immediate) poll even if the strip had
      // regressed and a real `\c 99` had arrived. The token also puts the `\c` mid-line rather
      // than on a line of its own — the shape a start-of-line-anchored strip would miss — and the
      // engine keeps the leading text while eating the marker and its payload.
      await electronApp.evaluate(
        ({ clipboard }, token) => clipboard.writeText(`${token} \\c 99 `),
        CHAPTER_PASTE_TOKEN,
      );
      await editorInput.click();
      await editorInput.press(DOC_END_KEY);
      await editorInput.press(PASTE_KEY);
      await expect(editorInput).toContainText(CHAPTER_PASTE_TOKEN, { timeout: 20_000 });

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
