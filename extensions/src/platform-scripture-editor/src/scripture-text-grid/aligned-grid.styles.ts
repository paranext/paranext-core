/**
 * Stylesheet for the verse-aligned grid, injected by `AlignedGrid`.
 *
 * In TypeScript rather than `.scss` because the row rules are generated, one pair per verse number,
 * and generating them here makes the mapping unit-testable.
 */
import type { CSSProperties } from 'react';

/** Class marking the grid root, which owns the row axis and is the single scroll port. */
export const ALIGNED_GRID_CLASS = 'scripture-text-grid-aligned';

/**
 * Custom property carrying a column's zoom factor down to its verse blocks.
 *
 * Zoom cannot sit on the column's content wrapper here the way it does in the other views: that
 * wrapper is a `grid-template-rows: subgrid` box, and `zoom` scales the used value of the lengths
 * inside it — including the row tracks it inherits from the shared grid, so a zoomed column would
 * measure its rows against a different scale than its neighbours. Zooming the verse blocks instead
 * leaves the tracks alone and keeps the row model intact: a row is still as tall as its tallest
 * cell, that cell is simply zoomed.
 */
export const ALIGNED_ZOOM_PROPERTY = '--aligned-zoom';

/**
 * A `style` value that can carry {@link ALIGNED_ZOOM_PROPERTY}. React's `CSSProperties` has no index
 * signature, so a custom property has to be declared to be set without a type assertion.
 */
export type AlignedZoomStyle = CSSProperties & { [K in typeof ALIGNED_ZOOM_PROPERTY]?: number };

/**
 * How many verse rows the grid root declares. Unoccupied rows collapse to zero height, so declaring
 * more than a chapter uses costs nothing and saves measuring the chapter first. 200 clears the
 * longest chapter Platform.Bible ships (Psalm 119, 176 verses). A verse numbered beyond this gets
 * no row rule and so is not shown at all (see `CHAIN_RULES`) — keep this above any real verse
 * number rather than tuning it down.
 */
export const MAX_ALIGNED_VERSE_ROWS = 200;

/**
 * The row a verse block occupies, as CSS declarations.
 *
 * Grid line numbers inside a subgrid are LOCAL to the rows it spans, and the content subgrid starts
 * below the header, so verse N is local line N to N+1. Counting the header here would shift every
 * verse by one and push a chapter's last verse off the explicit grid.
 *
 * Start and end come from separate rules keyed on the block's own `data-verse-start`/`-end`, which
 * is what lets a bridge (`14-15`) span its two rows without a rule per pair.
 *
 * The start rule also un-hides the block. Verse blocks are hidden by default so placement is
 * opt-in: a block these rules cannot place — carrying no `data-verse-start`, or a start outside
 * 1..`maxVerseRows` — would otherwise be auto-placed into the first free row of the SHARED explicit
 * grid and silently misalign the column from there down. These rules out-specify that default
 * (`.class .class[attr]` beats `.class .class`), so every block they do place is shown.
 *
 * @param maxVerseRows Highest verse number to emit rules for.
 * @returns The generated CSS text.
 */
export function buildVerseRowRules(maxVerseRows: number): string {
  const rules: string[] = [];
  for (let verseNum = 1; verseNum <= maxVerseRows; verseNum++) {
    rules.push(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-start="${verseNum}"]{grid-row-start:${verseNum};display:block}`,
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-end="${verseNum}"]{grid-row-end:${verseNum + 1}}`,
    );
  }
  return rules.join('\n');
}

/**
 * The `display: contents` / `subgrid` chain from the grid root down to the verse blocks.
 *
 * Every level between the two must stop generating a box, or the blocks lay out against their own
 * cell instead of the grid's shared rows. Three of those levels belong to the editor
 * (`@eten-tech-foundation/platform-editor`), so this couples to a DOM this repo does not own;
 * `adr-aligned-grid-flattens-the-editor-dom` records why one editor per column left no alternative.
 * Flattening discards two wrappers' padding, re-applied on the verse blocks below.
 */
const CHAIN_RULES = `
.${ALIGNED_GRID_CLASS}{
  display:grid;
  /* grid-template-columns is set inline from the resource count. */
  grid-template-rows:auto repeat(${MAX_ALIGNED_VERSE_ROWS},auto);
  align-content:start;
  height:100%;
  min-height:0;
  overflow:auto;
  /* The reference scroll tells "the reader moved the port" from "we moved it" by comparing
     scrollTop, and scroll anchoring silently rewrites it exactly when a late column inserts blocks
     above the viewport — the case that scroll exists to handle. */
  overflow-anchor:none;
}
/* Column wrapper, cell root, and cell content each pass the root's rows through untouched. */
.${ALIGNED_GRID_CLASS} > [data-resource-id],
.${ALIGNED_GRID_CLASS} [data-cell-root]{
  display:grid;
  grid-template-rows:subgrid;
  grid-row:1/-1;
  min-width:0;
}
.${ALIGNED_GRID_CLASS} [data-cell-header]{
  grid-row:1;
  position:sticky;
  top:0;
  z-index:1;
  background:var(--background);
}
.${ALIGNED_GRID_CLASS} [data-cell-content]{
  display:grid;
  grid-template-rows:subgrid;
  grid-row:2/-1;
  min-width:0;
  /* Re-homed from .editor-input, which generates no box here: without a per-column scope every
     column continues the previous column's footnote caller sequence instead of restarting. */
  counter-reset:caller crossref;
}
.${ALIGNED_GRID_CLASS} [data-cell-pad],
.${ALIGNED_GRID_CLASS} .editor-container,
.${ALIGNED_GRID_CLASS} .editor-inner,
.${ALIGNED_GRID_CLASS} .editor-input{
  display:contents;
}
.${ALIGNED_GRID_CLASS} .verse-block{
  /* Hidden until a generated row rule places it. An unplaced grid item is auto-placed into the
     first free row of the SHARED explicit grid, which silently misaligns the column from there
     down, so a block this view cannot place is dropped instead — the verse stays readable in Verse
     and Chapter view. Two kinds land here: a marker upstream could not parse into a range (an
     imported reversed bridge like 3-1, for which it emits neither attribute), and a verse numbered
     outside 1..${MAX_ALIGNED_VERSE_ROWS}. Restoring display:block restores the default: upstream
     renders the block as a bare div and gives it no display of its own. */
  display:none;
  /* Padding discarded by the two flattened wrappers above, re-applied where a box still exists. */
  padding:0.25rem 0.5rem;
  min-width:0;
  /* Handing scrolling to the grid root removed this column's only clipping boundary, so a long
     unbreakable run (a transliteration, a URL, unspaced scripts) would otherwise cross into the
     next column. */
  overflow-wrap:anywhere;
  /* Per-resource zoom, applied here rather than to the subgrid box above. See
     ALIGNED_ZOOM_PROPERTY. */
  zoom:var(${ALIGNED_ZOOM_PROPERTY},1);
}
/* A cell with no editor to show — downloading, unavailable, or no verses to align — puts its
   message across the column rather than in the first verse's row. Stretched over a whole chapter's
   height a centred message would sit at that column's midpoint, so it would start off screen and
   one slow resource among several would read as a blank column; pin it to the top instead. The
   minimum height is for the case where every column is in that state, leaving no row heights to
   borrow. */
.${ALIGNED_GRID_CLASS} [data-cell-placeholder]{
  grid-row:1/-1;
  min-height:6rem;
  justify-content:flex-start;
  padding-top:0.75rem;
  zoom:var(${ALIGNED_ZOOM_PROPERTY},1);
}
/* Only verse blocks get rows, so everything the editor puts between them is suppressed in v1 —
   section headings, but equally chapter descriptions and any intro material inside the chapter.
   That content is translation-specific, so it disagrees across columns, and it has no row of its
   own. The model still carries it (upstream keeps it as ordinary paragraphs), so showing it later
   is a change to this rule alone.

   Unconditional, deliberately. An earlier form gated this on a :has(.verse-block) test so that a
   column whose editor produced no verse blocks — an editor without the block-verse view mode —
   would show its paragraphs instead of nothing. Measured in Chromium, that is the worse failure:
   those paragraphs are grid items of the SHARED subgrid with an auto grid-row, so they auto-place
   into rows 1, 2, 3… and their heights (one inline paragraph holds many verses) stretch those rows
   for every other column too. One misconfigured resource collapsed the whole grid rather than just
   its own column. An empty column is recoverable and points at the real cause, which
   upstream-editor-contract.test.ts names. */
.${ALIGNED_GRID_CLASS} .editor-input > *:not(.verse-block){
  display:none;
}
/* The editor's empty-state prompt invites editing, which this read-only view never allows; the
   cell's own placeholder states cover a resource with nothing to show. */
.${ALIGNED_GRID_CLASS} .editor-placeholder{
  display:none;
}
`;

/** The full stylesheet for the aligned grid. */
export const ALIGNED_GRID_STYLESHEET = `${CHAIN_RULES}\n${buildVerseRowRules(MAX_ALIGNED_VERSE_ROWS)}`;
