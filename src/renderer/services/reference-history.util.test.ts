import { describe, expect, test } from 'vitest';
import {
  ReferenceHistory,
  ReferenceHistoryEntry,
} from '@shared/services/scroll-group.service-model';
import {
  createEmptyReferenceHistory,
  navigateHistory,
  recordNavigation,
  REFERENCE_HISTORY_MAX_DEPTH,
} from '@renderer/services/reference-history.util';

function entry(book: string, chapterNum: number, verseNum = 1): ReferenceHistoryEntry {
  return { scrRef: { book, chapterNum, verseNum } };
}

/** Build a history by recording a sequence of navigations in order */
function historyOf(...entries: ReferenceHistoryEntry[]): ReferenceHistory {
  const history = createEmptyReferenceHistory();
  entries.forEach((e) => recordNavigation(history, e));
  return history;
}

describe('recordNavigation', () => {
  test('first record seeds the back stack', () => {
    const history = createEmptyReferenceHistory();
    recordNavigation(history, entry('GEN', 1));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('new chapter pushes a new entry with previous location retained', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
  });

  test('same book and chapter replaces the top entry in place (verse-only move)', () => {
    const history = historyOf(entry('GEN', 1, 1), entry('GEN', 2, 1), entry('GEN', 2, 15));
    expect(history.back).toEqual([entry('GEN', 2, 15), entry('GEN', 1, 1)]);
  });

  test('same-chapter replace preserves the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // back to GEN 1; forward now has GEN 2
    recordNavigation(history, entry('GEN', 1, 20)); // verse move within GEN 1
    expect(history.forward).toEqual([entry('GEN', 2)]);
    expect(history.back[0]).toEqual(entry('GEN', 1, 20));
  });

  test('a genuinely new entry clears the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // forward = [GEN 2]
    recordNavigation(history, entry('EXO', 5));
    expect(history.forward).toEqual([]);
    expect(history.back).toEqual([entry('EXO', 5), entry('GEN', 1)]);
  });

  test('caps runs of the same book: with 4 same-book entries on top, index 3 is removed', () => {
    const history = historyOf(
      entry('MAT', 1),
      entry('MRK', 1),
      entry('MRK', 2),
      entry('MRK', 3),
      entry('MRK', 4),
    );
    // back = [MRK 4, MRK 3, MRK 2, MRK 1, MAT 1] — top 4 all MRK, incoming MRK
    recordNavigation(history, entry('MRK', 5));
    // MRK 1 (index 3 before insert) removed, then MRK 5 inserted
    expect(history.back).toEqual([
      entry('MRK', 5),
      entry('MRK', 4),
      entry('MRK', 3),
      entry('MRK', 2),
      entry('MAT', 1),
    ]);
  });

  test('back stack is trimmed to max depth', () => {
    const history = createEmptyReferenceHistory();
    // Alternate books so neither same-chapter replace nor same-book-run trim kicks in
    for (let i = 1; i <= REFERENCE_HISTORY_MAX_DEPTH + 5; i += 1) {
      recordNavigation(history, entry(i % 2 === 0 ? 'GEN' : 'EXO', i));
    }
    expect(history.back.length).toBe(REFERENCE_HISTORY_MAX_DEPTH);
  });
});

describe('navigateHistory', () => {
  test('back one step moves current to forward and returns the previous entry', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3));
    const destination = navigateHistory(history, -1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('EXO', 3)]);
  });

  test('multi-step back transfers intervening entries reversed so forward order is nearest-first', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    const destination = navigateHistory(history, -3);
    expect(destination).toEqual(entry('GEN', 1));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('GEN', 2), entry('EXO', 3), entry('LEV', 4)]);
  });

  test('forward one step is symmetric', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1);
    const destination = navigateHistory(history, 1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('multi-step forward lands on the target and re-stacks intervening entries', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    navigateHistory(history, -3); // back = [GEN 1], forward = [GEN 2, EXO 3, LEV 4]
    const destination = navigateHistory(history, 2);
    expect(destination).toEqual(entry('EXO', 3));
    expect(history.back).toEqual([entry('EXO', 3), entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('LEV', 4)]);
  });

  test('returns undefined and leaves history unchanged when out of range', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(navigateHistory(history, -2)).toBeUndefined(); // only 1 step of back available
    expect(navigateHistory(history, 1)).toBeUndefined(); // no forward
    expect(navigateHistory(history, 0)).toBeUndefined();
    expect(navigateHistory(history, 1.5)).toBeUndefined();
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('back requires at least 2 back entries (top is the current location)', () => {
    const history = historyOf(entry('GEN', 1));
    expect(navigateHistory(history, -1)).toBeUndefined();
  });
});
