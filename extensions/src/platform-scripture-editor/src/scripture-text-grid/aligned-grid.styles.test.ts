import { describe, it, expect } from 'vitest';
import {
  ALIGNED_GRID_CLASS,
  ALIGNED_GRID_STYLESHEET,
  ALIGNED_ZOOM_PROPERTY,
  MAX_ALIGNED_VERSE_ROWS,
  buildVerseRowRules,
} from './aligned-grid.styles';
import { MAX_PLACEABLE_VERSE_FOR_EMPTY_STATE } from './verse-display.utils';

describe('buildVerseRowRules', () => {
  it('places verse N on row N, counting from the content subgrid rather than the header', () => {
    const rules = buildVerseRowRules(3);

    // Lines inside a subgrid are local to the rows it spans, and the content subgrid starts below
    // the header — so verse 1 is line 1. Counting the header here would shift every verse down one
    // and push the last verse of a chapter off the explicit grid, where columns stop sharing rows.
    expect(rules).toContain(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-start="1"]{grid-row-start:1;display:block}`,
    );
    expect(rules).toContain(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-end="1"]{grid-row-end:2}`,
    );
  });

  it('shows only the blocks it places, so an unplaceable one cannot take a shared row', () => {
    // A block carrying no parsable range, or a verse past the last row, matches no rule here. Left
    // visible it would be auto-placed into the first free row of the SHARED grid and misalign that
    // column from there down — so hidden is the default, and being placed is what reveals it.
    expect(ALIGNED_GRID_STYLESHEET).toMatch(
      new RegExp(`\\.${ALIGNED_GRID_CLASS} \\.verse-block\\{[^}]*display:none`),
    );
    expect(buildVerseRowRules(3)).toContain(';display:block}');
    expect(buildVerseRowRules(3)).not.toContain('[data-verse-start="4"]');
  });

  it('ends a verse one line past its last row, so a bridge spans every row it covers', () => {
    const rules = buildVerseRowRules(20);

    // A `14-15` block carries start 14 and end 15, which these two rules turn into rows 14 to 16.
    expect(rules).toContain(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-start="14"]{grid-row-start:14;display:block}`,
    );
    expect(rules).toContain(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-end="15"]{grid-row-end:16}`,
    );
  });
});

describe('ALIGNED_GRID_STYLESHEET', () => {
  it('declares as many rows as it emits verse rules, so no verse falls off the grid', () => {
    // A verse placed beyond the explicit grid lands in an implicit row created per column, and
    // implicit rows are not shared — that column silently stops aligning with the others.
    expect(ALIGNED_GRID_STYLESHEET).toContain(
      `grid-template-rows:auto repeat(${MAX_ALIGNED_VERSE_ROWS},auto)`,
    );
    expect(ALIGNED_GRID_STYLESHEET).toContain(
      `.verse-block[data-verse-start="${MAX_ALIGNED_VERSE_ROWS}"]{grid-row-start:${MAX_ALIGNED_VERSE_ROWS};display:block}`,
    );
  });

  it('agrees with the row ceiling the empty-state predicate uses', () => {
    // `verse-display.utils.ts` keeps its own copy so it stays free of this module (and so of
    // React). If they drift, a chapter whose verses the grid cannot place stops being reported as
    // empty and renders a blank column with no explanation.
    expect(MAX_PLACEABLE_VERSE_FOR_EMPTY_STATE).toBe(MAX_ALIGNED_VERSE_ROWS);
  });

  it('covers the longest chapter in any versification Platform.Bible ships', () => {
    // Psalm 119 has 176 verses; anything shorter would misalign that chapter's tail.
    expect(MAX_ALIGNED_VERSE_ROWS).toBeGreaterThanOrEqual(176);
  });

  it('flattens every level between the grid root and the verse blocks', () => {
    // Each of these still generating a box would stop the verse blocks participating in the root's
    // row axis, which is what aligns them across columns. The editor classes are upstream DOM
    // (@eten-tech-foundation/platform-editor) — a rename there breaks alignment silently.
    ['[data-cell-pad]', '.editor-container', '.editor-inner', '.editor-input'].forEach(
      (selector) => {
        expect(ALIGNED_GRID_STYLESHEET).toContain(`.${ALIGNED_GRID_CLASS} ${selector}`);
      },
    );
    expect(ALIGNED_GRID_STYLESHEET).toContain('display:contents');
  });

  it('re-applies the padding the flattened wrappers discarded', () => {
    expect(ALIGNED_GRID_STYLESHEET).toMatch(
      new RegExp(`\\.${ALIGNED_GRID_CLASS} \\.verse-block\\{[^}]*padding:`),
    );
  });

  it('zooms the verse blocks, not the subgrid box that carries the shared rows', () => {
    // `zoom` scales the used value of the lengths inside the element it sits on. On the content
    // wrapper — a `grid-template-rows: subgrid` box — that would take in the row tracks it inherits
    // from the shared grid, so a zoomed column would measure its rows against a different scale
    // than its neighbours. On the block it scales that cell alone, and the row still takes the
    // height of the tallest one.
    expect(ALIGNED_GRID_STYLESHEET).toMatch(
      new RegExp(
        `\\.${ALIGNED_GRID_CLASS} \\.verse-block\\{[^}]*zoom:var\\(${ALIGNED_ZOOM_PROPERTY},1\\)`,
      ),
    );
    expect(ALIGNED_GRID_STYLESHEET).not.toMatch(/\[data-cell-content\]\{[^}]*zoom:/);
  });

  it('pins a placeholder to the top of its column rather than the middle of the chapter', () => {
    // The placeholder spans every row, so a centred message would sit at the midpoint of a whole
    // chapter's height — off screen, which makes one slow resource read as a blank column.
    expect(ALIGNED_GRID_STYLESHEET).toMatch(
      new RegExp(
        `\\.${ALIGNED_GRID_CLASS} \\[data-cell-placeholder\\]\\{[^}]*justify-content:flex-start`,
      ),
    );
  });
});
