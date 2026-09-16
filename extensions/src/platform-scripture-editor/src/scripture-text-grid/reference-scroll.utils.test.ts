// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  findVerseBlockForVerse,
  findVerseMarkerForVerse,
  isBlockInPortView,
  scrollPortToBlock,
} from './reference-scroll.utils';

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
 * Builds a chapter cell's content box holding the inline layout's verse markers. `'14-15'` is a
 * bridged verse: one marker covering two verses, and `'3a'` a sub-verse marker.
 *
 * @param markers `data-number` values the cell renders, in document order.
 * @returns The port element, not attached to the document (nothing here needs layout).
 */
function buildChapterPort(markers: string[]): HTMLElement {
  const port = document.createElement('div');
  markers.forEach((number) => {
    const marker = document.createElement('span');
    marker.dataset.marker = 'v';
    marker.dataset.number = number;
    port.append(marker);
  });
  return port;
}

describe('findVerseMarkerForVerse', () => {
  it('finds the marker that starts at the verse', () => {
    expect(findVerseMarkerForVerse(buildChapterPort(['1', '2', '3']), 2)?.dataset.number).toBe('2');
  });

  it('finds the bridge covering a verse no marker starts', () => {
    // `\v 14-15` emits no `[data-number="15"]`, so an exact match alone never resolves verse 15 and
    // the reference would sit unresolved until the scroll gave up.
    const port = buildChapterPort(['1', '14-15', '16']);

    expect(findVerseMarkerForVerse(port, 15)?.dataset.number).toBe('14-15');
  });

  it('falls back to the nearest marker above a verse the chapter skips', () => {
    // Verse 3 is absent (a versification gap), so the reference lands on verse 2.
    const port = buildChapterPort(['1', '2', '4']);

    expect(findVerseMarkerForVerse(port, 3)?.dataset.number).toBe('2');
  });

  it('lands on the first marker for a reference above the chapter (verse 0)', () => {
    // Verse 0 is front matter, which carries no verse marker of its own.
    expect(findVerseMarkerForVerse(buildChapterPort(['1', '2']), 0)?.dataset.number).toBe('1');
  });

  it('lands on the last marker for a reference past the end of the chapter', () => {
    expect(findVerseMarkerForVerse(buildChapterPort(['1', '2']), 99)?.dataset.number).toBe('2');
  });

  it('reports nothing when no verse marker has rendered yet', () => {
    // The caller uses this to tell "the chapter has not arrived" from "the verse is missing", and
    // leaves the pending scroll armed for when it does.
    expect(findVerseMarkerForVerse(buildChapterPort([]), 1)).toBeUndefined();
  });

  it('takes the first of two sub-verse markers sharing a verse', () => {
    // `\v 3a` and `\v 3b` both parse to start 3, so document order decides — which puts the reader
    // at the beginning of verse 3 rather than midway through it.
    expect(findVerseMarkerForVerse(buildChapterPort(['3a', '3b']), 3)?.dataset.number).toBe('3a');
  });

  it('lands on the top of the chapter for a malformed reference', () => {
    // Nothing is "nearest" to a non-finite verse, so there is no defensible answer but the top.
    // Unreachable through the scroll group, which carries integers — this pins the guard that keeps
    // a bad reference from scrolling somewhere arbitrary if one ever arrives.
    const port = buildChapterPort(['1', '2', '3']);

    expect(findVerseMarkerForVerse(port, Number.NaN)?.dataset.number).toBe('1');
  });

  it('skips a marker whose verse number does not parse', () => {
    // `parseVerseRange('')` is NaN, and an unparseable start compared against the running best would
    // otherwise be able to win the scan and send the reader to a marker with no verse at all.
    const port = buildChapterPort(['1', '', '3']);

    expect(findVerseMarkerForVerse(port, 2)?.dataset.number).toBe('1');
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
 * Builds a chapter cell: a content box that scrolls itself, with the resource-name header as its
 * SIBLING rather than a descendant.
 *
 * That adjacency is load-bearing, which is why it is pinned here rather than left as a comment.
 * `getFirstVisibleY` looks the header up INSIDE the port, so a chapter cell contributes no header
 * offset, while the aligned grid's sticky headers — descendants of its port — do. It is what lets
 * one set of port math serve both layouts with no branch, so moving the header inside the content
 * box would silently offset every chapter-mode scroll by the header's height.
 *
 * @param markerTop Viewport-relative top of the verse marker.
 * @param markerHeight Height of the verse marker.
 * @returns The port and the marker.
 */
function buildChapterPortWithMarker(markerTop: number, markerHeight: number) {
  const cell = document.createElement('div');
  const header = document.createElement('div');
  header.setAttribute('data-cell-header', '');
  const port = document.createElement('div');
  port.setAttribute('data-cell-content', '');
  const marker = document.createElement('span');
  marker.dataset.marker = 'v';
  marker.dataset.number = '5';
  port.append(marker);
  cell.append(header, port);

  const rect = (top: number, height: number) => new DOMRect(0, top, 0, height);
  port.getBoundingClientRect = () => rect(0, 300);
  header.getBoundingClientRect = () => rect(-20, 20);
  marker.getBoundingClientRect = () => rect(markerTop, markerHeight);
  return { port, marker };
}

describe('port math with a chapter cell, whose header is outside the port', () => {
  it('counts a marker the aligned grid would call header-covered as showing', () => {
    // A marker in the port's top 25px. In the aligned grid a 20-tall sticky header sits INSIDE the
    // port, so the same geometry starts behind it and reads as covered; here the header is a
    // sibling and contributes nothing, so the marker is genuinely visible. Header placement is the
    // only difference between the two answers, which is the adjacency this pins.
    const { port, marker } = buildChapterPortWithMarker(5, 20);

    expect(isBlockInPortView(port, marker)).toBe(true);
  });

  it('does not count a marker clipped by the bottom edge as showing', () => {
    // A verse marker is one line and its verse text follows AFTER it, so a marker hanging off the
    // bottom edge means the reader can see a verse number and none of its verse. Counting that as
    // showing would make the leave-a-visible-verse-alone rule decline to scroll, and the reference
    // move would appear to do nothing. A whole verse BLOCK taller than the port is the opposite
    // case and is still counted as showing — see the aligned tests above.
    const { port, marker } = buildChapterPortWithMarker(290, 20);

    expect(isBlockInPortView(port, marker)).toBe(false);
  });

  it('scrolls a marker to the top of the port with no header allowance', () => {
    const { port, marker } = buildChapterPortWithMarker(100, 40);

    scrollPortToBlock(port, marker);

    // The marker's own top, not the top less a header that is not in this port.
    expect(port.scrollTop).toBe(100);
  });
});
