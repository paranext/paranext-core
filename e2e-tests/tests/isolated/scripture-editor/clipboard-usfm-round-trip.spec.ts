/**
 * E2E for the real OS-clipboard round trip of Standard-view USFM: copying editor content puts
 * byte-faithful USFM (including `\v` and `\p` marker bytes) on the operating-system clipboard;
 * pasting external USFM-looking text back in tokenizes it into the editor's marker spans; the paste
 * and the rebuild it triggers are a single undo step; and pasting a `\c` chapter marker cannot
 * corrupt the open chapter, because the engine strips `\c`/`\id` bytes on external paste.
 *
 * It then covers the same round trip where the SELECTION and the FLAVOURS are what decide the
 * bytes: a real mouse drag that starts or ends inside a read-only construct's glyphs copies those
 * glyphs whole (a `\fig`'s opener, and its `|src="…"` attribute run); a copy's `text/html` flavour
 * carries the same USFM bytes as its `text/plain`, so no consumer can receive a different document
 * by preferring one flavour over the other; and a Paratext 9 clipboard — whose `text/plain` reduces
 * a footnote to the single caller glyph it displays — pastes as a real note, decoded from the
 * `<!--usfm:…-->` comment only its `text/html` carries.
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
import { type Locator, type Page } from '@playwright/test';
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

// The figure steps' caption, the read-only attribute run the engine renders after it, and a token
// pasted after the figure for the mouse to aim at. `avnt016.jpg` with `size="span"` is the corpus
// figure's own attribute list, so these are the bytes a real `\fig` line carries rather than an
// invented shape. The `|…` run displays as its own `.attribute` span, separate from the `\fig*`
// closer glyph, which is what makes "the whole attribute run" an observable unit at all
// (unknownUsfm.utils.ts's `figure` case, rendered by `createUnknown` in usj-editor.adaptor.ts).
const FIGURE_CAPTION_TOKEN = 'CLIPROUNDTRIPFIG';
const FIGURE_TAIL_TOKEN = 'CLIPROUNDTRIPTAIL';
const FIGURE_ATTRIBUTE_BYTES = '|src="avnt016.jpg" size="span"';
const FIGURE_USFM = `\\fig ${FIGURE_CAPTION_TOKEN}${FIGURE_ATTRIBUTE_BYTES}\\fig*`;

// The footnote the flavour step copies. Jonah 1 ships four notes of its own (vv. 1, 6 x2, 9 in the
// bundled WEB SFM) whose bytes the same whole-document copy also carries, so the assertions below
// match on the whole byte run including this token rather than on `\f ` alone.
const NOTE_TOKEN = 'CLIPROUNDTRIPNOTE';
const NOTE_USFM = `\\f + \\fr 1:1 \\ft ${NOTE_TOKEN}\\f*`;

// The Paratext 9 paste step's payload. P9's clipboard is HTML-FIRST: a collapsed note renders as its
// caller glyph alone inside a `class="… exclude …"` span, and the note's real bytes ride the
// fragment as an escaped `<!--usfm:…-->` comment — so P9's own `text/plain` for this copy is the
// paragraph text with a bare `a` where the note is, carrying no `\f` at all. That difference is the
// whole point of the step: only a paste that reads the html can produce a note.
const PARATEXT_9_NOTE_TOKEN = 'E2ENOTEBODY';
const PARATEXT_9_NOTE_USFM = `\\f + \\fr 1.1 \\ft ${PARATEXT_9_NOTE_TOKEN}\\f*`;
const PARATEXT_9_CLIPBOARD_TEXT = '\\p In the beginning a God';

/**
 * Paratext 9's html-comment escaping: every character outside `a-zA-Z` becomes `%` plus four
 * uppercase hex digits, so `\` travels as `%005C`, a space as `%0020` and `+` as `%002B`. The
 * escape exists because an html comment may contain neither `--` nor `>`, which is what lets a note
 * body carry any byte at all.
 *
 * Computed rather than written out: the escape of the note below is ~150 characters of hex in which
 * a drift from the USFM it is supposed to encode would be invisible.
 */
function escapeForParatext9Comment(usfm: string): string {
  return usfm.replace(
    /[^a-zA-Z]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
  );
}

/**
 * A Paratext 9 Standard-view copy of one `\p` paragraph whose text carries a footnote — the
 * fragment shape P9 writes to the html clipboard flavour. Its markers ride as literal `.marker`
 * text, because that is how P9's Standard view renders them; the note rides as the caller-glyph
 * span, whose `exclude` class suppresses the span's own text (the displayed `a`) while its comments
 * still contribute — which is what turns the glyph back into the note's bytes.
 */
const PARATEXT_9_CLIPBOARD_HTML =
  '<div class="usfm_p"><span class="marker">\\p </span>In the beginning' +
  '<span class="caller caller_big exclude showtooltip" id="caller_x" attachmentId="" ' +
  `contenteditable="false"><!--note--><!--f--><!--%002B--><!--usfm:${escapeForParatext9Comment(
    PARATEXT_9_NOTE_USFM,
  )}-->a</span> God</div>`;

/** An on-screen box in the coordinate space `Page.mouse` works in. */
interface ElementBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The on-screen box of `locator`, failing with `description` instead of handing back a null box —
 * or a box whose CENTRE falls outside the browser window.
 *
 * `boundingBox()` reports MAIN-FRAME coordinates even for an element inside an iframe — the very
 * space `mainPage.mouse` works in — so a drag between two elements of the editor's web view needs
 * no iframe-offset arithmetic of its own. It also reports real coordinates for an element that is
 * merely scrolled off-screen, so a caller relying on the null check alone would silently aim a drag
 * at a point nothing can receive and only learn about it from a 15s clipboard-poll timeout that
 * names the clipboard rather than the cause. The check is on the box's centre, not its full extent,
 * so a box only partly clipped by the viewport edge — still a valid drag target — passes.
 */
async function requireElementBox(locator: Locator, description: string): Promise<ElementBox> {
  const box = await locator.boundingBox();
  if (!box) throw new Error(`${description} has no box on screen, so a drag cannot aim at it`);
  // `locator.page()` resolves to the top-level Page even when `locator` is inside a frame, so this
  // reads the main window's viewport — the same coordinate space `boundingBox()` reports in.
  const viewport = await locator
    .page()
    .evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const centreX = box.x + box.width / 2;
  const centreY = box.y + box.height / 2;
  if (centreX < 0 || centreX > viewport.width || centreY < 0 || centreY > viewport.height) {
    throw new Error(`${description} is off-screen, so a drag cannot aim at it`);
  }
  return box;
}

/**
 * Press at (`fromX`, `fromY`), drag to (`toX`, `toY`), release — one real mouse selection.
 *
 * Stepped rather than a single jump: a selection drag is driven by the `mousemove`s the browser
 * actually receives, so a lone move to the far end can leave the selection where the press landed.
 */
async function dragSelect(
  page: Page,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): Promise<void> {
  await page.mouse.move(fromX, fromY);
  await page.mouse.down();
  await page.mouse.move(toX, toY, { steps: 10 });
  await page.mouse.up();
}

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
    // trips each awaiting a settle/save), with an explicit ceiling rather than the 3x `test.slow()`
    // budget other isolated specs use (see standard-default-power-mode.spec.ts): eight steps no
    // longer fit that budget's worst case, because a cold launch spends ~85s of it before the first
    // step and each step then waits on a paste or a clipboard poll with its own 15-20s allowance,
    // which adds up past the 360s `slow()` grants. No step is individually slower than before —
    // there are simply enough of them that one genuinely slow paste would turn a real pass into a
    // timeout. `setTimeout` REPLACES the budget rather than scaling it, so this is the whole
    // allowance and adding `test.slow()` alongside it would change nothing.
    test.setTimeout(480_000);

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Jonah 1 (same book used by type-through-save-echo.spec.ts) — a small single chapter that
    // opens with a `\p` paragraph marker immediately followed by `\v 1`.
    await navigateToolbarBcv(mainPage, 'Jonah 1:1');
    // `.first()`: a pasted footnote opens the note popover, whose own editor also matches
    // `.editor-input.marker-editable`; the document editor is the first in DOM order and is the one
    // every step reads and types into.
    const editorInput = editorFrame.locator('.editor-input.marker-editable').first();
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
      // Positive control, checked BEFORE the negative assertions below: Playwright's negative
      // matchers (`not.toContainText`, `toHaveCount(0)`) return success on the first poll that
      // holds, and an editor that is momentarily empty or mid-replacement — the PDP's debounced save
      // echoes back by replacing editor content wholesale, see type-through-save-echo.spec.ts —
      // satisfies all three vacuously. Anchoring on text the undo must have restored, rather than
      // removed, before the negatives run is what makes this step measure the undo rather than a
      // transient empty window.
      await expect(editorInput).toContainText('Amittai', { timeout: 20_000 });
      await expect(editorInput).not.toContainText(PASTE_TOKEN, { timeout: 20_000 });
      // Both halves of the span, not just the opener: a half-reverted span would otherwise pass.
      await expect(editorFrame.locator('span.opening[data-marker="nd"]')).toHaveCount(0, {
        timeout: 20_000,
      });
      await expect(editorFrame.locator('span.closing[data-marker="nd"]')).toHaveCount(0, {
        timeout: 20_000,
      });
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

    // The figure the two drag steps below share. Standard view does not model `\fig` as a node of its
    // own: it round-trips through an UnknownNode, rendered as a read-only
    // `contenteditable="false"` block (UnknownNode.createDOM) whose own USFM bytes are immutable
    // `.marker`/`.attribute` spans flanking the caption. Those glyphs are the read-only boundaries a
    // selection has to snap around, and `[data-tag="figure"]` addresses the block whatever element
    // name it renders as.
    const figure = editorFrame.locator('[data-tag="figure"]');
    // The opener is the FIRST `.marker` span inside the figure and the `\fig*` closer the last; the
    // `|src="…"` run between them is `.attribute`, not `.marker` (`createUnknown` pushes them in that
    // order), so `.first()` is the opener rather than whichever glyph happened to come first.
    const figureOpenerGlyph = figure.locator('span[data-text-type="marker"]').first();
    const figureAttributeRun = figure.locator('span[data-text-type="attribute"]');
    // The `\nd*` closer pasted after the figure: the drag target past the figure in the first drag
    // step, and the neutral click target that collapses that step's selection in the second.
    const figureTailGlyph = editorFrame.locator('span.closing[data-marker="nd"]');

    await test.step('copying a selection that starts on a figure’s `\\fig` glyph copies the whole figure', async () => {
      // The tail token rides the same payload purely so the drag has an ELEMENT to aim at past the
      // figure. Playwright cannot locate a bare text node, while a `\nd` char span renders real
      // `span.opening`/`span.closing` glyphs (MarkerNode.createDOM) whose `boundingBox()` is already
      // in the coordinate space the mouse works in. It is NOT expected in the copied bytes: Chromium
      // clamps a drag that begins inside a `contenteditable="false"` island to that island
      // (EditingBoundaryAdjuster moves a focus outside the anchor's root boundary element back to
      // that element's edge), so releasing past the figure selects up to the figure's end — the
      // whole figure, which is what this step measures.
      await electronApp.evaluate(
        ({ clipboard }, payload) => clipboard.writeText(payload),
        `${FIGURE_USFM} \\nd ${FIGURE_TAIL_TOKEN}\\nd* `,
      );
      await editorInput.click();
      await editorInput.press(DOC_END_KEY);
      await editorInput.press(PASTE_KEY);
      await expect(figure).toHaveCount(1, { timeout: 20_000 });
      await expect(editorInput).toContainText(FIGURE_CAPTION_TOKEN, { timeout: 20_000 });
      await expect(editorInput).toContainText(FIGURE_TAIL_TOKEN, { timeout: 20_000 });

      // The sentinel matters more here than anywhere else in this spec: the paste just above put
      // these very bytes on the clipboard, so without overwriting them first the poll below would
      // pass on the paste's own payload with the copy path completely broken.
      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );

      // Centre the figure before measuring: the boxes have to be on screen for the mouse to land on
      // them, and `scrollIntoViewIfNeeded` centres an element that is not already visible, which
      // leaves the tail glyph just below it comfortably in view too.
      await figure.scrollIntoViewIfNeeded();
      const openerBox = await requireElementBox(figureOpenerGlyph, 'the figure’s `\\fig` opener');
      const tailBox = await requireElementBox(
        figureTailGlyph,
        'the `\\nd*` glyph after the figure',
      );

      // Press a few pixels inside the opener glyph's LEFT edge rather than at its centre, so the
      // native selection starts at the glyph's first characters: the copied bytes can then only
      // begin with `\fig ` if the engine expanded the boundary out over the whole read-only glyph.
      await dragSelect(
        mainPage,
        openerBox.x + 3,
        openerBox.y + openerBox.height / 2,
        tailBox.x + tailBox.width / 2,
        tailBox.y + tailBox.height / 2,
      );
      // Pressed on the editor, not the page: keystrokes sent to the parent document never reach the
      // web view. The drag left the editor focused, so this cannot disturb the selection it made.
      await editorInput.press(COPY_KEY);

      let clipboardText = '';
      await expect
        .poll(
          async () => {
            clipboardText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
            return clipboardText;
          },
          { timeout: 15_000 },
        )
        .toContain(FIGURE_USFM);
      // The press landed a few pixels INTO the opener glyph, so the copied bytes can only begin with
      // the glyph's first byte if the engine grew the selection out over the whole read-only glyph
      // rather than starting mid-glyph — the poll above proves the run is complete, this proves
      // where it starts.
      expect(clipboardText.slice(0, '\\fig '.length)).toBe('\\fig ');
    });

    await test.step('a selection ending inside a figure’s attribute run copies the whole run', async () => {
      await electronApp.evaluate(
        ({ clipboard }, sentinel) => clipboard.writeText(sentinel),
        CLIPBOARD_SENTINEL,
      );

      await expect(figureAttributeRun).toHaveCount(1);
      await figure.scrollIntoViewIfNeeded();
      // Collapse the previous step's selection BEFORE measuring, not after: `click()` runs
      // Playwright's actionability checks, which scroll the target into view, and a scroll after the
      // boxes are read leaves the drag aiming at whatever text moved into those coordinates. The
      // press itself has to happen at all because the previous step left the whole figure selected —
      // its drag was clamped to the block and then materialized — and a press INSIDE an existing
      // selection is, to Chromium, the start of a text drag-and-drop rather than a new selection.
      // Collapsing somewhere outside the figure first is exactly what a user would do before
      // dragging afresh.
      await figureTailGlyph.click();
      const openerBox = await requireElementBox(figureOpenerGlyph, 'the figure’s `\\fig` opener');

      // The release point comes from the run's OWN client rects, not `boundingBox()`:
      // `boundingBox()` resolves through the box model's UNION of an inline element's per-line
      // rects, so a run that wraps onto a second line (the 30-byte attribute list can, depending on
      // where the figure falls on its line) reports a box whose vertical centre sits on the seam
      // between the two lines — on neither line's glyphs. Reading the rects directly and releasing on the LAST one keeps the
      // point on real text. `getClientRects()` returns IFRAME-relative coordinates, unlike
      // `boundingBox()`, so the editor iframe's own box supplies the offset into `mainPage.mouse`'s
      // main-frame coordinate space.
      const attributeRunRects = await figureAttributeRun.evaluate((element) =>
        Array.from(element.getClientRects()).map((rect) => ({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        })),
      );
      const lastAttributeRunRect = attributeRunRects.at(-1);
      if (!lastAttributeRunRect) {
        throw new Error('the figure’s `|src="…"` attribute run has no client rects to drag onto');
      }
      const editorFrameBox = await requireElementBox(editorFrame.owner(), 'the editor’s iframe');

      // Start a few pixels past the opener glyph's RIGHT edge — the caption's first character, which
      // is ordinary editable text, so nothing about the start of this selection needs expanding.
      // Derived from the opener's box because the caption is a bare text node with no box of its
      // own; deriving it that way also survives the figure's bytes wrapping onto a second line,
      // where a point interpolated toward the attribute run would land on the wrong line entirely.
      // A keyboard selection cannot stand in for this: the mouse path through a read-only glyph is
      // what the behaviour is about.
      await dragSelect(
        mainPage,
        openerBox.x + openerBox.width + 3,
        openerBox.y + openerBox.height / 2,
        editorFrameBox.x + lastAttributeRunRect.x + lastAttributeRunRect.width / 2,
        editorFrameBox.y + lastAttributeRunRect.y + lastAttributeRunRect.height / 2,
      );
      await editorInput.press(COPY_KEY);

      let clipboardText = '';
      await expect
        .poll(
          async () => {
            clipboardText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
            return clipboardText;
          },
          { timeout: 15_000 },
        )
        .toContain(FIGURE_ATTRIBUTE_BYTES);
      // The whole attribute run, with nothing after it. The drag released INSIDE the run, so the
      // copied bytes can only end on the run's last byte if the selection expanded over the whole
      // read-only glyph — and comparing the tail slice rather than asserting `endsWith` reports what
      // the bytes actually were when it does not.
      expect(clipboardText.slice(-FIGURE_ATTRIBUTE_BYTES.length)).toBe(FIGURE_ATTRIBUTE_BYTES);
      // Nor did it over-expand past the run to the `\fig*` closer, which sits immediately after it.
      expect(clipboardText).not.toContain('\\fig*');
      // The caption side must be a genuine SUFFIX of the caption, longer than one character: the
      // attribute run is pinned intact at its end above and the caption is ordinary editable text at
      // its start, so any imprecision in the drag's start point can only truncate the caption from
      // the FRONT, never the back. A one-character copy would still satisfy a bare non-empty check,
      // so the length floor is what actually rules out an under-selected drag.
      const copiedCaption = clipboardText.slice(0, -FIGURE_ATTRIBUTE_BYTES.length);
      expect(copiedCaption).toBe(FIGURE_CAPTION_TOKEN.slice(-copiedCaption.length));
      expect(copiedCaption.length).toBeGreaterThan(1);
    });

    await test.step('copying a footnote carries its USFM bytes in the `text/html` flavour too', async () => {
      await electronApp.evaluate(
        ({ clipboard }, usfm) => clipboard.writeText(`${usfm} `),
        NOTE_USFM,
      );
      // Leave the figure first. The previous step's selection ends inside the figure's
      // `contenteditable="false"` block, and from there Ctrl+End does not carry the caret out of the
      // island — so the paste would land on a selection still inside the read-only block, which the
      // opaque-block guard refuses. A click on the tail glyph is a caret in ordinary text; a fresh
      // click on `.editor-input` is not used because its centre can be the figure block itself.
      await figureTailGlyph.click();
      await editorInput.press(DOC_END_KEY);
      await editorInput.press(PASTE_KEY);
      // `toContainText` reads textContent, so a collapsed note's CSS-hidden body still matches it —
      // which is what makes the pasted note's own bytes observable without expanding the note.
      await expect(editorInput).toContainText(NOTE_TOKEN, { timeout: 20_000 });

      // A sentinel in BOTH flavours. The html is what this step measures, and `writeText` alone would
      // leave whatever html a previous run or retry attempt wrote still sitting on the clipboard —
      // exactly the stale payload the poll below must not be allowed to pass on.
      await electronApp.evaluate(
        ({ clipboard }, sentinel) =>
          clipboard.write({ text: sentinel, html: `<p>${sentinel}</p>` }),
        CLIPBOARD_SENTINEL,
      );

      await editorInput.press(DOC_START_KEY);
      await editorInput.press(SELECT_TO_DOC_END_KEY);
      await editorInput.press(COPY_KEY);

      let clipboardHtml = '';
      await expect
        .poll(
          async () => {
            clipboardHtml = await electronApp.evaluate(({ clipboard }) => clipboard.readHTML());
            // Compared with NBSP normalized away: the marker bytes are what this measures, and a
            // display-NBSP or an `&nbsp;` a clipboard intermediary re-serialized would otherwise
            // fail the match on the serialization rather than on the content. None of `\`, `+`, `:`
            // or `*` needs html escaping, so the bytes themselves travel literally.
            return clipboardHtml.replaceAll('&nbsp;', ' ').replaceAll('\u00a0', ' ');
          },
          { timeout: 15_000 },
        )
        .toContain(NOTE_USFM);
      // The html is the USFM bytes, not an export of the editor's own DOM. Every DOM export of a note
      // caller carries `data-caller` (ImmutableNoteCallerNode.exportDOM), so its absence is what
      // separates the two — and it is the one attribute that cannot survive a bytes-only flavour.
      expect(clipboardHtml).not.toContain('data-caller');
      // Both flavours say the same thing, so a consumer's flavour preference cannot change the
      // document it receives. Read raw, unlike the html poll above: the editor's copy handler builds
      // `text/plain` via an unconditional display-NBSP-to-space replace (`$selectionToUsfmText`,
      // scripture-editors' `whitespaceDisplay.plugin.utils.ts`), so this flavour can never carry an
      // NBSP in the first place — normalizing it here would hide a regression if that replace ever
      // stopped running.
      const clipboardText = await electronApp.evaluate(({ clipboard }) => clipboard.readText());
      expect(clipboardText).toContain(NOTE_USFM);
    });

    await test.step('pasting Paratext 9 clipboard html decodes the footnote from its `usfm:` comment', async () => {
      // Counted rather than assumed: Jonah 1 ships four notes of its own and the step above pasted a
      // fifth, so only the DELTA can show that this paste produced a note.
      // Scoped to the document editor: an open note popover renders its own copy of a note.
      const noteCallers = editorInput.locator('span.immutable-note-caller');
      const callerCountBeforePaste = await noteCallers.count();

      await electronApp.evaluate(({ clipboard }, payload) => clipboard.write(payload), {
        text: PARATEXT_9_CLIPBOARD_TEXT,
        html: PARATEXT_9_CLIPBOARD_HTML,
      });
      // Same reason as the step above for not re-clicking first: the copy above left the caret in the
      // editor, and a click could land on the figure's read-only block.
      await editorInput.press(DOC_END_KEY);
      await editorInput.press(PASTE_KEY);

      // The discriminator. This clipboard's `text/plain` carries no `\f` at all, so a note can only
      // appear if the paste decoded the html's `usfm:` comment instead of preferring the plain text.
      await expect(noteCallers).toHaveCount(callerCountBeforePaste + 1, { timeout: 20_000 });
      await expect(editorInput).toContainText(PARATEXT_9_NOTE_TOKEN, { timeout: 20_000 });
      // Positive control for the negative below: an editor that dropped the paste on the floor
      // satisfies "no literal caller glyph" vacuously, so anchor on text the paste must have landed.
      await expect(editorInput).toContainText('In the beginning', { timeout: 20_000 });
      // The caller glyph is P9's DISPLAY text, not document data, so it must not reach the document —
      // which is exactly what the `text/plain` fallback would have typed in. Matched on `a God`
      // rather than the longer `beginning a God` so it still fires if the glyph lands somewhere other
      // than where the plain text would have put it; the phrase occurs nowhere in Jonah 1's WEB text.
      await expect(editorInput).not.toContainText('a God');
    });
  });
});
