/**
 * Stylesheet for the verse-aligned grid, injected by `AlignedGrid`.
 *
 * In TypeScript rather than `.scss` because the row rules are generated, one pair per verse number,
 * and generating them here makes the mapping unit-testable.
 */

/** Class marking the grid root, which owns the row axis and is the single scroll port. */
export const ALIGNED_GRID_CLASS = 'scripture-text-grid-aligned';

/**
 * How many verse rows the grid root declares. Unoccupied rows collapse to zero height, so declaring
 * more than a chapter uses costs nothing and saves measuring the chapter first. 200 clears the
 * longest chapter Platform.Bible ships (Psalm 119, 176 verses). A verse numbered beyond this falls
 * into a per-column implicit row, which is not shared — so keep this above any real verse number
 * rather than tuning it down.
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
 * @param maxVerseRows Highest verse number to emit rules for.
 * @returns The generated CSS text.
 */
export function buildVerseRowRules(maxVerseRows: number): string {
  const rules: string[] = [];
  for (let verseNum = 1; verseNum <= maxVerseRows; verseNum++) {
    rules.push(
      `.${ALIGNED_GRID_CLASS} .verse-block[data-verse-start="${verseNum}"]{grid-row-start:${verseNum}}`,
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
/* Padding discarded by the two flattened wrappers above, re-applied where a box still exists. */
.${ALIGNED_GRID_CLASS} .verse-block{
  padding:0.25rem 0.5rem;
  min-width:0;
  /* Handing scrolling to the grid root removed this column's only clipping boundary, so a long
     unbreakable run (a transliteration, a URL, unspaced scripts) would otherwise cross into the
     next column. */
  overflow-wrap:anywhere;
}
/* Upstream removes both range attributes when a marker cannot be parsed into one — an imported
   reversed bridge like 3-1. Such a block matches no row rule, and an unplaced grid item is
   auto-placed into the first free row of the SHARED explicit grid, which silently misaligns the
   column from there down. Dropping it keeps the rest of the column aligned; the verse is still
   readable in Verse and Chapter view. */
.${ALIGNED_GRID_CLASS} .verse-block:not([data-verse-start]){
  display:none;
}
/* A cell with no editor to show — downloading, unavailable, or no verses to align — puts its
   message across the column rather than in the first verse's row. The minimum height is for the
   case where every column is in that state, leaving no row heights to borrow. */
.${ALIGNED_GRID_CLASS} [data-cell-placeholder]{
  grid-row:1/-1;
  min-height:6rem;
}
/* Section headings and other between-verse content are suppressed in v1: they are
   translation-specific, so they disagree across columns, and they have no row of their own. The
   model still carries them (upstream keeps them as ordinary paragraphs), so showing them later is a
   change to this rule alone. Gated on the editor having produced verse blocks at all: without that
   gate, an editor that never produced them would have every paragraph hidden and the column would
   render empty rather than merely unaligned. */
.${ALIGNED_GRID_CLASS} .editor-input:has(.verse-block) > *:not(.verse-block){
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
