/**
 * In Simple's gutter view the paragraph marker glyph must never overlap the paragraph's text,
 * whatever the column width.
 *
 * Each `.para` glyph is absolutely positioned at `left: calc(-(gutter width) + 0.5em -
 * var(--para-indent))`, so it only clears the text when `--para-indent` equals the paragraph's own
 * text-spacing margin; hanging-indent paragraphs additionally start their first line at a negative
 * `text-indent`, which `--verse-text-start` mirrors for the focus box. Both indents are `vw`-based
 * while the gutter is `em`-based, so the gap between glyph and text shrinks as the column narrows —
 * which is why this sweeps the column from its opened width down to the Simple column floor rather
 * than measuring once. The stylesheet-level guard for the same mechanism is
 * `usj-nodes-scss-coverage.test.ts` in the extension; this spec is the rendered half, and is what
 * catches a regression that comes from anywhere other than those two custom properties (a gutter
 * width change, a padding change in `_simple-mode.scss`, an engine DOM change).
 *
 * The sample WEB project carries `\li1` and `\q2` but none of the other markers under test, so the
 * spec rewrites Obadiah 1 through PAPI before opening it: three existing `\p` paragraphs become
 * `\li1`, `\li2` and `\qm2`, and `\q2` and `\iq1` paragraphs are inserted before two verses. `li1`
 * and `li2` are the markers of the original report; `q2`, `qm2` and `iq1` cover the 15vw and 20vw
 * hanging indents, `qm2` and `iq1` being two of the markers that had no compensation at all.
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { suppressOnboardingTour } from '../../../fixtures/onboarding-tour.page';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  rewriteSampleProjectChapterUsfm,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' is what selects the gutter (paragraph-structure) view and the fixed
// 3-column layout with a per-column minimum width, which is the geometry this spec is about.
// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** Markers under test. Each must appear at least once in the rewritten chapter. */
const MARKERS = ['li1', 'li2', 'q2', 'qm2', 'iq1'] as const;

/** Markers whose text-spacing rule has a negative text-indent, so `--verse-text-start` must be set. */
const HANGING_MARKERS: ReadonlySet<string> = new Set(MARKERS);

/**
 * `SIMPLE_COLUMN_MIN_WIDTH_PX` from `simple-layout.data.ts`, plus room for the rounding the dock's
 * flex weights introduce. Asserted as an upper bound on the final column width, so the test states
 * that the sweep really did reach the floor rather than stopping somewhere comfortable.
 */
const COLUMN_FLOOR_CEILING_PX = 310;

/** How far each drag step moves the editor/resources divider. */
const DRAG_STEP_PX = 120;

/**
 * Sub-pixel layout rounding can put a glyph's right edge a fraction of a pixel past the text's left
 * edge without any visible overlap.
 */
const ROUNDING_TOLERANCE_PX = 1;

/** One paragraph's glyph and first-line geometry, read inside the editor iframe. */
interface ParagraphGeometry {
  marker: string;
  glyphText: string;
  /** Text start minus glyph end in the writing direction; negative means they overlap. */
  gapPx: number;
  paraIndent: string;
  verseTextStart: string;
}

test.describe('gutter marker glyphs versus paragraph text', () => {
  test('no glyph overlaps its paragraph text at any column width down to the floor', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    // No `waitForHomeTab`: simple mode loads the static simpleLayout, which has no Home tab.
    await makeSampleProjectEditable();

    // Obadiah 1 has three `\p` paragraphs (before verses 1, 8 and 19). Retarget them and add two
    // more so every marker under test heads a real verse. Done BEFORE the editor opens so the
    // first render already carries them.
    await rewriteSampleProjectChapterUsfm({ book: 'OBA', chapterNum: 1, verseNum: 1 }, (usfm) => {
      const paragraphMarkers = ['\\li1', '\\li2', '\\qm2'];
      let index = 0;
      return usfm
        .replace(/^\\p\s*$/gm, () => {
          const replacement = paragraphMarkers[index] ?? '\\p';
          index += 1;
          return replacement;
        })
        .replace(/^(\\v 10 )/m, '\\q2\n$1')
        .replace(/^(\\v 12 )/m, '\\iq1\n$1');
    });

    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    const editorRoot = editorFrame.locator('.editor-input');
    await editorRoot.waitFor({ timeout: 60_000 });

    // Simple mode opens the onboarding tour on a fresh profile, asynchronously, once the project
    // panel exists; its full-screen overlay intercepts every pointer event, including the toolbar
    // click below and the divider drags later.
    await suppressOnboardingTour(mainPage);

    await navigateToolbarBcv(mainPage, 'Obadiah 1:8');

    // Positive controls. The rewritten paragraphs must be on screen, and the root must carry the
    // two classes the gutter compensation rules are scoped by; otherwise every geometry assertion
    // below would pass vacuously against a plain paragraph view.
    await Promise.all(
      MARKERS.map((marker) =>
        editorFrame.locator(`.para.usfm_${marker}`).first().waitFor({ timeout: 60_000 }),
      ),
    );
    await expect(editorRoot).toHaveClass(/\bpsc-gutter-markers\b/);
    await expect(editorRoot).toHaveClass(/\btext-spacing\b/);

    const editorColumn = mainPage.locator('.dock-panel').nth(1);
    const columnWidth = async () =>
      editorColumn.evaluate((el) => Math.round(el.getBoundingClientRect().width));

    /** Reads glyph and first-line geometry for the first two paragraphs of each marker. */
    const measure = () =>
      editorRoot.evaluate((root, markers: readonly string[]): ParagraphGeometry[] => {
        const isRtl = (root.getAttribute('dir') ?? getComputedStyle(root).direction) === 'rtl';
        const results: ParagraphGeometry[] = [];
        markers.forEach((marker) => {
          Array.from(root.querySelectorAll(`.para.usfm_${marker}`))
            .slice(0, 2)
            .forEach((para) => {
              const glyph = para.querySelector(':scope > .marker');
              // First text node outside the marker and verse-number spans: the paragraph's own text.
              const walker = document.createTreeWalker(para, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                  if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
                  let element = node.parentElement;
                  while (element && element !== para) {
                    if (element.classList.contains('marker') || element.classList.contains('verse'))
                      return NodeFilter.FILTER_REJECT;
                    element = element.parentElement;
                  }
                  return NodeFilter.FILTER_ACCEPT;
                },
              });
              const textNode = walker.nextNode();
              if (!glyph || !textNode) return;
              const range = document.createRange();
              range.setStart(textNode, 0);
              range.setEnd(textNode, Math.min(textNode.textContent?.length ?? 0, 12));
              const textRect = range.getClientRects()[0];
              if (!textRect) return;
              const glyphRect = glyph.getBoundingClientRect();
              const style = getComputedStyle(para);
              results.push({
                marker,
                glyphText: glyph.textContent?.trim() ?? '',
                gapPx: isRtl ? glyphRect.left - textRect.right : textRect.left - glyphRect.right,
                paraIndent: style.getPropertyValue('--para-indent').trim(),
                verseTextStart: style.getPropertyValue('--verse-text-start').trim(),
              });
            });
        });
        return results;
      }, MARKERS);

    /** Drags the editor/resources divider left by `DRAG_STEP_PX`, in steps rc-dock will track. */
    const dragDividerLeft = async () => {
      // The second divider is the one between the editor column and the resources column.
      const divider = mainPage.locator('.dock-divider').nth(1);
      const dividerBox = await divider.boundingBox();
      expect(dividerBox).not.toBeNull();
      if (!dividerBox) return;
      const startX = dividerBox.x + dividerBox.width / 2;
      const y = dividerBox.y + dividerBox.height / 2;
      await mainPage.mouse.move(startX, y);
      await mainPage.mouse.down();
      // Stepped, and with a small first nudge: rc-dock's drag manager starts tracking on the first
      // move that differs from where the press landed, so a single jump to the target does nothing.
      const dragPath = [startX - 5];
      for (let x = startX - 5; x > startX - DRAG_STEP_PX; x -= 40)
        dragPath.push(Math.max(x - 40, startX - DRAG_STEP_PX));
      // Sequenced through a promise chain rather than an await-in-loop: the moves have to arrive in
      // order (same pattern as paragraph-style-trigger-column-floor.spec.ts).
      await dragPath.reduce(
        (previous, x) => previous.then(() => mainPage.mouse.move(x, y)),
        Promise.resolve(),
      );
      await mainPage.mouse.up();
    };

    const assertGeometry = (widthPx: number, geometry: ParagraphGeometry[]) => {
      MARKERS.forEach((marker) => {
        const paragraphs = geometry.filter((entry) => entry.marker === marker);
        // Non-vacuity: a marker that yielded nothing means the rewrite or the render did not take,
        // and the overlap assertions below would pass by having nothing to check.
        expect(
          paragraphs.length,
          `At ${widthPx}px no ${marker} paragraph with a glyph and text was measured`,
        ).toBeGreaterThan(0);
        paragraphs.forEach((entry) => {
          // The outcome first, so a failure reads as the defect a user would see: the glyph box
          // must end before the first line of text begins.
          expect(
            entry.gapPx,
            `At ${widthPx}px the ${entry.glyphText} glyph overlaps its paragraph text by ${(-entry.gapPx).toFixed(1)}px`,
          ).toBeGreaterThanOrEqual(-ROUNDING_TOLERANCE_PX);
          // Then the mechanism, which is what a stylesheet refactor drops.
          expect(
            entry.paraIndent,
            `At ${widthPx}px the ${marker} paragraph has no --para-indent, so its glyph is not pulled back into the gutter`,
          ).toMatch(/^[1-9][0-9.]*vw$/);
          if (HANGING_MARKERS.has(marker))
            expect(
              entry.verseTextStart,
              `At ${widthPx}px the hanging-indent ${marker} paragraph has no negative --verse-text-start`,
            ).toMatch(/^-[0-9.]+vw$/);
        });
      });
    };

    // Sweep: measure at the opened width, then shrink the editor column one step at a time until
    // the dock clamps it at the floor, measuring after every step.
    let width = await columnWidth();
    assertGeometry(width, await measure());
    // A bounded loop rather than `while`: the dock clamps at the floor, so the width stops
    // changing; the cap only guards against a drag that never takes.
    const maxSteps = 12;
    const sweep = async (step: number, previousWidth: number): Promise<number> => {
      if (step >= maxSteps) return previousWidth;
      await dragDividerLeft();
      const nextWidth = await columnWidth();
      assertGeometry(nextWidth, await measure());
      if (nextWidth >= previousWidth) return nextWidth;
      return sweep(step + 1, nextWidth);
    };
    width = await sweep(0, width);

    expect(
      width,
      'The sweep did not reach the column floor, so the narrow-column assertions above prove nothing',
    ).toBeLessThanOrEqual(COLUMN_FLOOR_CEILING_PX);
  });
});
