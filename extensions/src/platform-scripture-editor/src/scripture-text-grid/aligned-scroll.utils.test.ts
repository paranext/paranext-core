// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  findVerseBlockForVerse,
  isBlockInPortView,
  scrollPortToBlock,
} from './aligned-scroll.utils';

/**
 * Builds a grid port holding one column per resource, each described as the verse ranges it
 * renders. `'4-5'` is a bridged verse: one block covering two rows.
 *
 * @param columns Verse markers each column renders, in order.
 * @returns The port element, not attached to the document (nothing here needs layout).
 */
function buildPort(columns: string[][]): HTMLElement {
  const port = document.createElement('div');
  columns.forEach((verseMarkers, columnIndex) => {
    const column = document.createElement('div');
    verseMarkers.forEach((marker) => {
      const [start, end = start] = marker.split('-');
      const block = document.createElement('div');
      block.className = 'verse-block';
      block.dataset.verseNumber = marker;
      block.dataset.verseStart = start;
      block.dataset.verseEnd = end;
      block.dataset.column = `${columnIndex}`;
      column.append(block);
    });
    port.append(column);
  });
  return port;
}

describe('findVerseBlockForVerse', () => {
  it('finds the block that starts at the verse', () => {
    const port = buildPort([['1', '2', '3']]);

    expect(findVerseBlockForVerse(port, 2)?.dataset.verseNumber).toBe('2');
  });

  it('finds the bridge covering a verse no block starts', () => {
    const port = buildPort([['1', '4-5', '6']]);

    expect(findVerseBlockForVerse(port, 5)?.dataset.verseNumber).toBe('4-5');
  });

  it('falls back to the nearest block above a verse missing from every resource', () => {
    // Verse 3 exists in no column (a versification gap), so the reference lands on verse 2's row.
    const port = buildPort([
      ['1', '2', '4'],
      ['1', '2', '4'],
    ]);

    expect(findVerseBlockForVerse(port, 3)?.dataset.verseNumber).toBe('2');
  });

  it('lands on the first block for a reference above the passage (verse 0)', () => {
    const port = buildPort([['1', '2']]);

    expect(findVerseBlockForVerse(port, 0)?.dataset.verseNumber).toBe('1');
  });

  it('lands on the lowest verse, not the first column, for verse 0 when columns start apart', () => {
    // A commentary covering only 10-12 sits left of a full text. Document order puts its verse 10
    // first, but the top of the passage is the full text's verse 1.
    const port = buildPort([
      ['10', '11', '12'],
      ['1', '2', '10'],
    ]);
    const found = findVerseBlockForVerse(port, 0);

    expect(found?.dataset.verseNumber).toBe('1');
    expect(found?.dataset.column).toBe('1');
  });

  it('lands on the lowest verse for a malformed (non-finite) reference', () => {
    const port = buildPort([['10'], ['1']]);

    expect(findVerseBlockForVerse(port, Number.NaN)?.dataset.verseNumber).toBe('1');
  });

  it('prefers an exact start in a later column over an earlier column`s nearer-but-lower block', () => {
    // Column 0 lacks verse 3; column 1 has it. The exact hit wins regardless of document order.
    const port = buildPort([
      ['1', '2'],
      ['1', '3'],
    ]);
    const found = findVerseBlockForVerse(port, 3);

    expect(found?.dataset.verseNumber).toBe('3');
    expect(found?.dataset.column).toBe('1');
  });

  it('reports nothing when no verse block has rendered yet', () => {
    // The caller uses this to tell "the chapter has not arrived" from "the verse is missing", and
    // leaves the pending scroll armed for when it does.
    expect(findVerseBlockForVerse(buildPort([]), 1)).toBeUndefined();
  });
});

/**
 * Builds a port and one block with fixed geometry. Jsdom measures nothing, so both rects are
 * stubbed; the sticky header is 20 tall and covers the top of the port.
 *
 * @param blockTop Viewport-relative top of the block.
 * @param blockHeight Height of the block.
 * @returns The port and the block, ready to pass to {@link isBlockInPortView}.
 */
function buildPortWithBlock(blockTop: number, blockHeight: number) {
  const port = document.createElement('div');
  const header = document.createElement('div');
  header.setAttribute('data-cell-header', '');
  const block = document.createElement('div');
  block.className = 'verse-block';
  port.append(header, block);

  const rect = (top: number, height: number) => new DOMRect(0, top, 0, height);
  port.getBoundingClientRect = () => rect(0, 300);
  header.getBoundingClientRect = () => rect(0, 20);
  block.getBoundingClientRect = () => rect(blockTop, blockHeight);
  return { port, block };
}

describe('isBlockInPortView', () => {
  it('counts a block in the middle of the port as showing', () => {
    const { port, block } = buildPortWithBlock(100, 40);

    expect(isBlockInPortView(port, block)).toBe(true);
  });

  it('counts a block scrolled past above as not showing', () => {
    const { port, block } = buildPortWithBlock(-80, 40);

    expect(isBlockInPortView(port, block)).toBe(false);
  });

  it('counts a block below the port as not showing', () => {
    const { port, block } = buildPortWithBlock(400, 40);

    expect(isBlockInPortView(port, block)).toBe(false);
  });

  it('counts a block hidden behind the sticky header as not showing', () => {
    // Its top is inside the port, but the header covers it, so a reader cannot see it.
    const { port, block } = buildPortWithBlock(-25, 40);

    expect(isBlockInPortView(port, block)).toBe(false);
  });

  it('counts a block taller than the port as showing while the reader is inside it', () => {
    // Scrolling this one back to the top would fight a reader who is part-way through a long verse.
    const { port, block } = buildPortWithBlock(-200, 900);

    expect(isBlockInPortView(port, block)).toBe(true);
  });
});

/**
 * Builds a port rendered under an ancestor's CSS `zoom`, with one block `layoutDistance` layout
 * pixels below the sticky header. Bounding rects report viewport pixels (scaled by `zoom`); the
 * port's `offsetHeight`, `clientTop` and `scrollTop` stay in its own layout pixels, as in a
 * browser.
 *
 * @param zoom The ancestor's zoom factor.
 * @param layoutDistance Layout pixels from the bottom of the header to the top of the block.
 * @param borderTop The port's top border, in layout pixels.
 * @returns The port and the block, ready to pass to {@link scrollPortToBlock}.
 */
function buildZoomedPortWithBlock(zoom: number, layoutDistance: number, borderTop = 0) {
  const layoutHeight = 300;
  const headerLayoutHeight = 20;
  const port = document.createElement('div');
  const header = document.createElement('div');
  header.setAttribute('data-cell-header', '');
  const block = document.createElement('div');
  block.className = 'verse-block';
  port.append(header, block);

  Object.defineProperty(port, 'offsetHeight', { value: layoutHeight });
  Object.defineProperty(port, 'clientTop', { value: borderTop });
  const rect = (top: number, height: number) => new DOMRect(0, top * zoom, 0, height * zoom);
  port.getBoundingClientRect = () => rect(0, layoutHeight);
  header.getBoundingClientRect = () => rect(borderTop, headerLayoutHeight);
  block.getBoundingClientRect = () => rect(borderTop + headerLayoutHeight + layoutDistance, 40);
  return { port, block };
}

describe('scrollPortToBlock', () => {
  it('scrolls the block to just below the sticky header', () => {
    const { port, block } = buildZoomedPortWithBlock(1, 500);

    scrollPortToBlock(port, block);

    expect(port.scrollTop).toBe(500);
  });

  it.each([1.5, 2, 3])(
    'scrolls by layout pixels, not viewport pixels, under a %d× zoom',
    (zoom) => {
      // Rects include the ancestor's zoom and `scrollTop` does not; an unconverted distance
      // overshoots by `zoom`×, and each retry overshoots back.
      const { port, block } = buildZoomedPortWithBlock(zoom, 500);

      scrollPortToBlock(port, block);

      expect(port.scrollTop).toBeCloseTo(500);
    },
  );

  it('scales the port border into viewport pixels under zoom', () => {
    const { port, block } = buildZoomedPortWithBlock(2, 500, 3);

    scrollPortToBlock(port, block);

    expect(port.scrollTop).toBeCloseTo(500);
  });
});
