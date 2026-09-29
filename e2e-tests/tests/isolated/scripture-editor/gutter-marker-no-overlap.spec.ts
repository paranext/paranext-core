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
 * The sample WEB project lacks most of these markers, so the spec rewrites Obadiah 1 through PAPI
 * before opening it. Together they cover margins of 10–20vw and hanging indents from −7.5vw to
 * −15vw.
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { suppressOnboardingTour } from '../../../fixtures/onboarding-tour.page';
import {
  COLUMN_FLOOR_CEILING_PX,
  dragEditorColumnDividerLeft,
  getEditorColumnWidth,
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  rewriteSampleProjectChapterUsfm,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' is what selects the gutter (paragraph-structure) view and the fixed
// 3-column layout with a per-column minimum width, which is the geometry this spec is about.
// firstRunComplete: the first-run wizard would otherwise sit over the app on a fresh profile, and
// whether it does would depend on the developer's own app data.
// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/**
 * Markers under test. Each must appear at least once in the rewritten chapter. All five are
 * hanging-indent paragraphs, so each must set `--verse-text-start` as well as `--para-indent`.
 */
const MARKERS = ['li1', 'li2', 'q2', 'qm2', 'iq1'] as const;

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
  /** Rendered width of the glyph box; zero means the glyph is not shown at all. */
  glyphWidthPx: number;
  /**
   * Start of the first line (the verse number when there is one, else the text) minus glyph end, in
   * the writing direction; negative means they overlap.
   */
  gapPx: number;
  paraIndent: string;
  verseTextStart: string;
}

/** A CSS length with the given sign, e.g. `15vw`, `-7.5vw`, `2px`. `0` in any unit is neither. */
function isLengthWithSign(value: string, sign: 'positive' | 'negative'): boolean {
  const match = /^(-?)(\d*\.?\d+)[a-z%]+$/.exec(value.trim());
  if (!match) return false;
  const [, minus, magnitude] = match;
  if (Number(magnitude) === 0) return false;
  return sign === 'negative' ? minus === '-' : minus === '';
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
      let replaced = 0;
      const rewritten = usfm
        .replace(/^\\p\s*$/gm, () => {
          const replacement = paragraphMarkers[replaced] ?? '\\p';
          replaced += 1;
          return replacement;
        })
        .replace(/^(\\v 10 )/m, '\\q2\n$1')
        .replace(/^(\\v 12 )/m, '\\iq1\n$1');
      // Fail here, naming the cause, rather than 60s later as a locator timeout on a marker the
      // rewrite never produced.
      if (replaced < paragraphMarkers.length)
        throw new Error(`Expected at least 3 \\p paragraphs in Obadiah 1, found ${replaced}`);
      if (!/^\\q2\n\\v 10 /m.test(rewritten) || !/^\\iq1\n\\v 12 /m.test(rewritten))
        throw new Error(
          'Obadiah 1 has no "\\v 10 " or "\\v 12 " line to insert a paragraph before',
        );
      return rewritten;
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
    // The sample project is left-to-right, so the measurement below takes its LTR branch. Pinned so
    // a run that ever came up RTL fails here rather than switching to arithmetic no run has
    // exercised; the RTL branch stays for the follow-up that flips the project's text direction.
    await expect(editorRoot).toHaveCSS('direction', 'ltr');

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
              // First text node outside the marker and verse-number spans: the paragraph's text.
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
              // The line starts at the verse number when the paragraph opens with one; measuring
              // from the text after it would let a glyph painted over the number pass.
              const verseRect = para.querySelector('.verse')?.getBoundingClientRect();
              const lineStart = isRtl
                ? Math.max(textRect.right, verseRect?.right ?? -Infinity)
                : Math.min(textRect.left, verseRect?.left ?? Infinity);
              const glyphRect = glyph.getBoundingClientRect();
              const style = getComputedStyle(para);
              results.push({
                marker,
                glyphText: glyph.textContent?.trim() ?? '',
                glyphWidthPx: glyphRect.width,
                gapPx: isRtl ? glyphRect.left - lineStart : lineStart - glyphRect.right,
                paraIndent: style.getPropertyValue('--para-indent').trim(),
                verseTextStart: style.getPropertyValue('--verse-text-start').trim(),
              });
            });
        });
        return results;
      }, MARKERS);

    const paragraphsFor = (geometry: ParagraphGeometry[], marker: string) =>
      geometry.filter((entry) => entry.marker === marker);

    /** The outcome: at this width, every glyph is shown and ends before its line begins. */
    const assertNoOverlap = (widthPx: number, geometry: ParagraphGeometry[]) => {
      MARKERS.forEach((marker) => {
        const paragraphs = paragraphsFor(geometry, marker);
        // Non-vacuity: a marker that yielded nothing means the rewrite or the render did not take,
        // and the overlap assertions below would pass by having nothing to check.
        expect(
          paragraphs.length,
          `At ${widthPx}px no ${marker} paragraph with a glyph and text was measured`,
        ).toBeGreaterThan(0);
        paragraphs.forEach((entry) => {
          // A hidden glyph has an all-zero rect and a large positive gap, so it has to be ruled out
          // before the gap means anything.
          expect(
            entry.glyphWidthPx,
            `At ${widthPx}px the ${marker} glyph is not rendered`,
          ).toBeGreaterThan(0);
          expect(entry.glyphText, `At ${widthPx}px the ${marker} glyph shows the wrong text`).toBe(
            `\\${marker}`,
          );
          expect(
            entry.gapPx,
            `At ${widthPx}px the ${entry.glyphText} glyph overlaps its paragraph text by ${(-entry.gapPx).toFixed(1)}px`,
          ).toBeGreaterThanOrEqual(-ROUNDING_TOLERANCE_PX);
        });
      });
    };

    /**
     * The mechanism, which is what a stylesheet refactor drops. The two custom properties are `vw`
     * lengths that do not change with the column width, so they are checked once.
     */
    const assertCompensationProperties = (geometry: ParagraphGeometry[]) => {
      MARKERS.forEach((marker) => {
        paragraphsFor(geometry, marker).forEach((entry) => {
          expect(
            isLengthWithSign(entry.paraIndent, 'positive'),
            `The ${marker} paragraph has --para-indent "${entry.paraIndent}", not a positive length, so its glyph is not pulled back into the gutter`,
          ).toBe(true);
          expect(
            isLengthWithSign(entry.verseTextStart, 'negative'),
            `The hanging-indent ${marker} paragraph has --verse-text-start "${entry.verseTextStart}", not a negative length`,
          ).toBe(true);
        });
      });
    };

    // Measure at the opened width, then shrink the editor column one step at a time until the
    // dock clamps it at the floor, measuring after every step.
    let width = await getEditorColumnWidth(mainPage);
    const opened = await measure();
    assertNoOverlap(width, opened);
    assertCompensationProperties(opened);
    // Shrink until the width stops shrinking (the dock clamps at the floor). `maxSteps` bounds a
    // column that never clamps; a drag that never takes ends the sweep early and fails the floor
    // assertion below.
    const maxSteps = 12;
    const sweep = async (step: number, previousWidth: number): Promise<number> => {
      if (step >= maxSteps) return previousWidth;
      await dragEditorColumnDividerLeft(mainPage, DRAG_STEP_PX);
      const nextWidth = await getEditorColumnWidth(mainPage);
      assertNoOverlap(nextWidth, await measure());
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
