// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  findVerseBlockForVerse,
  findVerseMarkerForVerse,
  isBlockInPortView,
  isMarkerFullyInPortView,
  scrollPortToBlock,
} from './reference-scroll.utils';
import { parseVerseRange } from './verse-display.utils';

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

  // The aligned grid's rule is any-part-showing, so both cases below are SHOWING here and NOT
  // showing under the chapter cell's rule (see the `isMarkerFullyInPortView` block). Pinned as a
  // pair so the one difference between the two layouts' predicates stays visible.
  it('counts a block clipped by the port bottom edge as showing', () => {
    // 20px of a 40px block is on screen; the reader can see that verse.
    const { port, block } = buildPortWithBlock(280, 40);

    expect(isBlockInPortView(port, block)).toBe(true);
  });

  it('counts a block partly covered by the sticky header as showing', () => {
    // Its lower 30px are readable below the 20px header.
    const { port, block } = buildPortWithBlock(10, 40);

    expect(isBlockInPortView(port, block)).toBe(true);
  });

  it('counts a block taller than the port as showing while the reader is inside it', () => {
    // Scrolling this one back to the top would fight a reader who is part-way through a long verse.
    const { port, block } = buildPortWithBlock(-200, 900);

    expect(isBlockInPortView(port, block)).toBe(true);
  });
});

describe('scrollPortToBlock lead-in', () => {
  it('parks the target flush at the top when no lead-in is asked for', () => {
    // The aligned grid's default: its verse blocks carry their own padding, so the rect top is
    // already the padding edge and a further offset would double it.
    const { port, block } = buildPortWithBlock(120, 40);
    port.scrollTop = 0;

    scrollPortToBlock(port, block);

    expect(port.scrollTop).toBe(100); // 120 - the 20px header
  });

  it('leaves the asked-for room above the target', () => {
    // A chapter cell passes `VERSE_NUMBER_SCROLL_OFFSET` so the reader keeps a little of the
    // preceding verse, matching the editor and the reference panels.
    const { port, block } = buildPortWithBlock(120, 40);
    port.scrollTop = 0;

    scrollPortToBlock(port, block, 30);

    expect(port.scrollTop).toBe(70);
  });
});

describe('isMarkerFullyInPortView', () => {
  it('counts a marker fully inside the port as showing', () => {
    const { port, block } = buildPortWithBlock(100, 40);

    expect(isMarkerFullyInPortView(port, block)).toBe(true);
  });

  it('counts a marker clipped by the port bottom edge as NOT showing', () => {
    // The aligned rule calls this showing. A verse marker's text follows after it, so a clipped
    // marker means the reader sees a verse number and none of its verse.
    const { port, block } = buildPortWithBlock(280, 40);

    expect(isMarkerFullyInPortView(port, block)).toBe(false);
    expect(isBlockInPortView(port, block)).toBe(true);
  });

  it('counts a marker partly covered by the sticky header as NOT showing', () => {
    const { port, block } = buildPortWithBlock(10, 40);

    expect(isMarkerFullyInPortView(port, block)).toBe(false);
    expect(isBlockInPortView(port, block)).toBe(true);
  });

  it('counts a marker scrolled past above as not showing', () => {
    const { port, block } = buildPortWithBlock(-80, 40);

    expect(isMarkerFullyInPortView(port, block)).toBe(false);
  });

  it('falls back to any-part-showing for a target taller than the port', () => {
    // It can never fit, so demanding containment would call it hidden forever and scroll for it.
    const { port, block } = buildPortWithBlock(-200, 900);

    expect(isMarkerFullyInPortView(port, block)).toBe(true);
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
    // move would appear to do nothing. The aligned grid's whole verse block is the opposite case,
    // which is why that layout keeps `isBlockInPortView` — see the aligned tests above.
    const { port, marker } = buildChapterPortWithMarker(290, 20);

    expect(isMarkerFullyInPortView(port, marker)).toBe(false);
  });

  it('scrolls a marker to the top of the port with no header allowance', () => {
    const { port, marker } = buildChapterPortWithMarker(100, 40);

    scrollPortToBlock(port, marker);

    // The marker's own top, not the top less a header that is not in this port.
    expect(port.scrollTop).toBe(100);
  });
});

/**
 * The verse a finder's result stands for, however that layout spells it.
 *
 * @param element A verse block or a verse marker.
 * @returns The verse it starts at, or `undefined` when nothing was found.
 */
function resolvedVerse(element: HTMLElement | undefined): number | undefined {
  if (!element) return undefined;
  if (element.dataset.verseStart !== undefined) return Number(element.dataset.verseStart);
  return parseVerseRange(element.dataset.number ?? '').start;
}

// Grid and Chapter are two view modes of ONE web view, toggled against the same reference, so the
// two finders must never disagree about which verse a reference belongs to. They are written out
// separately (different selectors, different start extraction, and only the block layout has a row
// bound), and the `describe` blocks above test each in isolation — nothing there would catch the
// two drifting apart. This pins them against each other, the way `aligned-grid.styles.test.ts` pins
// the duplicated `MAX_ALIGNED_VERSE_ROWS`. If a rule changes in one finder, change both and update
// this table.
//
// Each case gives the SAME passage in both layouts' own spelling, because they do not spell a verse
// the same way. `data-verse-start` decides a grid row, so it is always an integer (the generated
// rules are `grid-row-start:N`, and `isPlacedBlock` drops anything else); the inline layout's
// `data-number` is the raw `\v` number, so it carries sub-verse letters and bridges verbatim.
//
// What this pins is which VERSE a reference resolves to, not which element wins — the layouts
// return different kinds of element, and a tie-break that picks `3b` over `3a` still answers
// "verse 3". Element choice is covered by each finder's own tests above.
describe('the two finders resolve a reference to the same verse', () => {
  const cases: {
    why: string;
    blocks: string[];
    markers: string[];
    verseNum: number;
    expected: number;
  }[] = [
    {
      why: 'a verse that starts a block',
      blocks: ['1', '2', '3'],
      markers: ['1', '2', '3'],
      verseNum: 2,
      expected: 2,
    },
    {
      why: 'the second half of a bridge',
      blocks: ['1', '4-5', '6'],
      markers: ['1', '4-5', '6'],
      verseNum: 5,
      expected: 4,
    },
    {
      why: 'a verse missing from this versification',
      blocks: ['1', '2', '4'],
      markers: ['1', '2', '4'],
      verseNum: 3,
      expected: 2,
    },
    {
      // Both sub-verses start at verse 3, so the block layout lands two blocks on one row — the
      // overlap tracked as PT-4559. Either way the REFERENCE still resolves to verse 3.
      why: 'a sub-verse, where the earlier one wins',
      blocks: ['2', '3', '3'],
      markers: ['2', '3a', '3b'],
      verseNum: 3,
      expected: 3,
    },
    {
      why: 'a reference above the first verse',
      blocks: ['1', '2', '3'],
      markers: ['1', '2', '3'],
      verseNum: 0,
      expected: 1,
    },
    {
      why: 'a reference past the last verse',
      blocks: ['1', '2', '3'],
      markers: ['1', '2', '3'],
      verseNum: 99,
      expected: 3,
    },
    {
      why: 'a malformed reference',
      blocks: ['1', '2', '3'],
      markers: ['1', '2', '3'],
      verseNum: Number.NaN,
      expected: 1,
    },
  ];

  cases.forEach(({ why, blocks, markers, verseNum, expected }) => {
    it(`agrees on ${why}`, () => {
      const fromBlocks = resolvedVerse(findVerseBlockForVerse(buildPort([blocks]), verseNum));
      const fromMarkers = resolvedVerse(
        findVerseMarkerForVerse(buildChapterPort(markers), verseNum),
      );

      expect(fromBlocks).toBe(expected);
      expect(fromMarkers).toBe(expected);
    });
  });
});
