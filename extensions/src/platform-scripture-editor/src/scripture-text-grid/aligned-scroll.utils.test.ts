// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { findVerseBlockForVerse } from './aligned-scroll.utils';

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
