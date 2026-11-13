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
 * The second test covers the paragraph-style trigger at the same Simple column floor: it must keep
 * its marker whole when the editor COLUMN is dragged to its minimum width, however wide the window
 * is. This is the half `paragraph-style-trigger-narrow.spec.ts` cannot reach. That spec shrinks the
 * WINDOW, which bottoms out at `WINDOW_MIN_WIDTH_PX`; a splitter drag takes the editor column down
 * to `SIMPLE_COLUMN_MIN_WIDTH_PX` (297) inside a full-screen window, which is narrower than any
 * window resize can make it. At that width the toolbar's start zone has less room than its controls
 * need, and the trigger — the only item there that shrinks — absorbed the whole deficit by cutting
 * into the marker, the one field with no shorter form. A one-character `p` loses a pixel, which is
 * why a window sweep missed it; a `q2` or `toc1` loses most of itself against the chevron.
 *
 * Three measurements, because each is blind to a failure the others catch. The marker's own
 * `scrollWidth`/`clientWidth` catches it being truncated — the trigger is capped at its wrapper and
 * so reports no overflow of its own while a field inside it is clipped. The marker's box against
 * the trigger's catches the opposite shape: a field with a width floor does not truncate when the
 * box around it is squeezed, it spills out and is painted over the trigger's border. And the
 * overrun check from the window spec is kept because the floor that keeps the marker whole must not
 * push the trigger back out past the zone edge it was clipped by before.
 *
 * Each test() starts its own Electron instance: both drag the column divider to the floor and
 * nothing drags it back, so the second would not start from an opened column on the first's app.
 * Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
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
 * edge, or a trigger's right edge past its zone's, without any visible overlap.
 */
const ROUNDING_TOLERANCE_PX = 1;

/** A block whose marker is more than one character, so a clipped marker is measurable. */
const MULTI_CHARACTER_MARKER = 'q2';

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

test.describe('paragraph-style trigger at the editor column floor', () => {
  test('keeps the marker whole when the column is dragged to its minimum width', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    // This is a Simple-mode spec, so the onboarding tour opens on its own; suppress it before its
    // full-screen overlay can intercept the BCV trigger click below.
    await waitForAppReady(mainPage);
    // No `waitForHomeTab`: simple mode loads the static simpleLayout, which has no Home tab.
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Genesis 3 is poetry from verse 14 on, so it carries `\q2` blocks.
    await navigateToolbarBcv(mainPage, 'Genesis 3:14');
    const poetryBlock = editorFrame.locator(`[data-marker="${MULTI_CHARACTER_MARKER}"]`).first();
    await poetryBlock.waitFor({ timeout: 60_000 });
    await poetryBlock.click();

    const trigger = editorFrame.locator('[aria-label="Paragraph style"]');
    await expect(trigger).toBeVisible({ timeout: 60_000 });
    // Positive control: everything below is vacuous if the caret never landed in a multi-character
    // marker, because a one-character marker cannot overflow by more than the rounding tolerance.
    await expect(trigger).toContainText(MULTI_CHARACTER_MARKER);

    await test.step('drag the editor/resources splitter to the column floor', async () => {
      // The target is far past the floor on purpose — the dock clamps at the floor, which is
      // exactly the state under test.
      await dragEditorColumnDividerLeft(mainPage, Number.POSITIVE_INFINITY);
      expect(
        await getEditorColumnWidth(mainPage),
        'The drag did not reach the column floor, so the assertions below prove nothing',
      ).toBeLessThanOrEqual(COLUMN_FLOOR_CEILING_PX);
    });

    const geometry = await trigger.evaluate((el) => {
      // The marker sits in a monospace span inside the label's primary field; the field is what
      // clips, so measure the field.
      const primary = el.querySelectorAll('span')[1];
      // The zone is the trigger's grandparent: the button sits inside the disabled-action tooltip
      // wrapper, which is the zone's own flex item.
      const zone = el.parentElement?.parentElement;
      return {
        label: el.textContent,
        markerShownPx: primary?.clientWidth ?? Number.NaN,
        markerNeededPx: primary?.scrollWidth ?? Number.NaN,
        // How far the marker's own box escapes the button's. A floored field does not report
        // clipping when the box around it is squeezed — it keeps its width and spills out of the
        // button instead, painting over the border and then being cut by the zone. That reads
        // exactly like the reported bug and is invisible to both of the other measurements.
        markerSpillPx: primary
          ? Math.round(primary.getBoundingClientRect().right - el.getBoundingClientRect().right)
          : Number.NaN,
        overrunPx: zone
          ? Math.round(el.getBoundingClientRect().right - zone.getBoundingClientRect().right)
          : Number.NaN,
        hasChevron: !!el.querySelector('svg'),
      };
    });

    expect(
      geometry.markerShownPx,
      `At the column floor the marker "${geometry.label}" has ${geometry.markerShownPx}px of the ${geometry.markerNeededPx}px it needs, so it is sliced against the trigger's trailing edge`,
    ).toBeGreaterThanOrEqual(geometry.markerNeededPx);

    expect(
      geometry.markerSpillPx,
      `At the column floor the marker "${geometry.label}" extends ${geometry.markerSpillPx}px past the trigger's own box, so it is painted over the trigger's trailing border and cut by the toolbar zone`,
    ).toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);

    expect(
      geometry.overrunPx,
      `At the column floor the trigger overruns its toolbar zone by ${geometry.overrunPx}px, so its trailing border is clipped instead`,
    ).toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);

    // The room for the whole marker comes from dropping the chevron at this step. If it is back,
    // the trigger is only fitting because the marker happens to be short.
    expect(
      geometry.hasChevron,
      'The chevron is still rendered at the column floor, which is the width it gives way at',
    ).toBe(false);
  });
});
