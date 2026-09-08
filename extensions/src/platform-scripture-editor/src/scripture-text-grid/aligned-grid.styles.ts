/**
 * Stylesheet for the verse-aligned grid (`viewMode="aligned"`), injected with `useStylesheet` only
 * while that mode is active.
 *
 * It lives in TypeScript rather than a `.scss` file because the row rules are generated (one pair
 * per possible verse number) and because generating them here makes the mapping unit-testable — the
 * alignment rule is the load-bearing part of this view and nothing else can assert it in a DOM-less
 * test (jsdom does no layout).
 */

/** Class marking the grid root, which owns the row axis and is the single scroll port. */
export const ALIGNED_GRID_CLASS = 'stg-aligned';

/**
 * How many verse rows the grid root declares. Rows nothing occupies collapse to zero height, so
 * declaring more than a chapter uses costs nothing visually and removes any need to measure the
 * chapter first. 200 clears the longest chapter in any versification Platform.Bible ships (Psalm
 * 119, 176 verses) with room to spare. A verse numbered beyond this would fall outside the explicit
 * grid and be placed in an implicit row per column, which would not be shared — so this must stay
 * above any real verse number rather than being tuned down.
 */
export const MAX_ALIGNED_VERSE_ROWS = 200;

/**
 * The row a verse block occupies, as CSS declarations.
 *
 * Line numbers inside a subgrid are LOCAL to the span that subgrid covers, and the content subgrid
 * covers the root rows _after_ the header, so verse N is simply local line N to N+1 — counting the
 * header row here would shift every verse by one and silently push the last verse off the explicit
 * grid. `grid-row-start` and `grid-row-end` are set by separate rules keyed on the block's own
 * `data-verse-start` / `data-verse-end`, which is what lets a bridged verse (`14-15`, start 14, end
 * 15) span its rows without a rule per pair.
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
 * The `display: contents` / `subgrid` chain from the grid root down to the verse blocks, plus the
 * consequences of flattening it.
 *
 * Every level between the root and a verse block has to stop generating a box, or the blocks are
 * laid out against their own cell instead of the grid's shared row axis. That includes three
 * elements this repo does not own — `.editor-container`, `.editor-inner`, and `.editor-input` come
 * from `@eten-tech-foundation/platform-editor` — so this is a deliberate coupling to that DOM;
 * `adr-aligned-grid-flattens-the-editor-dom` records why one editor per column made it the only
 * option. Two things are discarded by the flattening and re-applied here: the cell's padding (it
 * lived on a wrapper that is now `display: contents`) and the editor input's own padding.
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
}
/* Section headings and other between-verse content are suppressed in v1: they are
   translation-specific, so they disagree across columns, and they have no row of their own. The
   model still carries them (upstream keeps them as ordinary paragraphs), so showing them later is a
   change to this rule alone. */
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
