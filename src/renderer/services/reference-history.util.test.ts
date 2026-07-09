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
  test('first record becomes the current location with empty stacks', () => {
    const history = createEmptyReferenceHistory();
    recordNavigation(history, entry('GEN', 1));
    expect(history.current).toEqual(entry('GEN', 1));
    expect(history.back).toEqual([]);
    expect(history.forward).toEqual([]);
  });

  test('new chapter pushes the previous location onto the back stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(history.current).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 1)]);
  });

  test('same book and chapter replaces the current entry in place (verse-only move)', () => {
    const history = historyOf(entry('GEN', 1, 1), entry('GEN', 2, 1), entry('GEN', 2, 15));
    expect(history.current).toEqual(entry('GEN', 2, 15));
    expect(history.back).toEqual([entry('GEN', 1, 1)]);
  });

  test('same-chapter replace preserves the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // back to GEN 1; forward now has GEN 2
    recordNavigation(history, entry('GEN', 1, 20)); // verse move within GEN 1
    expect(history.forward).toEqual([entry('GEN', 2)]);
    expect(history.current).toEqual(entry('GEN', 1, 20));
  });

  test('a genuinely new entry clears the forward stack', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1); // current GEN 1, forward = [GEN 2]
    recordNavigation(history, entry('EXO', 5));
    expect(history.forward).toEqual([]);
    expect(history.current).toEqual(entry('EXO', 5));
    expect(history.back).toEqual([entry('GEN', 1)]);
  });

  test('caps runs of the same book: with 4 same-book entries at the top, the oldest is removed', () => {
    const history = historyOf(
      entry('MAT', 1),
      entry('MRK', 1),
      entry('MRK', 2),
      entry('MRK', 3),
      entry('MRK', 4),
    );
    // current = MRK 4, back = [MRK 3, MRK 2, MRK 1, MAT 1] — current + top 3 back all MRK, incoming MRK
    recordNavigation(history, entry('MRK', 5));
    // MRK 4 becomes back[0]; the run MRK 4..MRK 1 exceeds the cap, so MRK 1 is dropped
    expect(history.current).toEqual(entry('MRK', 5));
    expect(history.back).toEqual([
      entry('MRK', 4),
      entry('MRK', 3),
      entry('MRK', 2),
      entry('MAT', 1),
    ]);
  });

  test('back stack is trimmed so the total stays within max depth', () => {
    const history = createEmptyReferenceHistory();
    // Alternate books so neither same-chapter replace nor same-book-run trim kicks in
    for (let i = 1; i <= REFERENCE_HISTORY_MAX_DEPTH + 5; i += 1) {
      recordNavigation(history, entry(i % 2 === 0 ? 'GEN' : 'EXO', i));
    }
    // The current location plus the back stack must not exceed REFERENCE_HISTORY_MAX_DEPTH total.
    expect(history.current).toEqual(entry('EXO', REFERENCE_HISTORY_MAX_DEPTH + 5));
    expect(history.back.length).toBe(REFERENCE_HISTORY_MAX_DEPTH - 1);
    expect(history.back[0]).toEqual(entry('GEN', REFERENCE_HISTORY_MAX_DEPTH + 4));
    expect(history.back[REFERENCE_HISTORY_MAX_DEPTH - 2]).toEqual(entry('GEN', 6));
  });
});

describe('navigateHistory', () => {
  test('back one step moves the current onto forward and returns the previous entry', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3));
    const destination = navigateHistory(history, -1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.current).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('EXO', 3)]);
  });

  test('multi-step back transfers intervening entries reversed so forward order is nearest-first', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    const destination = navigateHistory(history, -3);
    expect(destination).toEqual(entry('GEN', 1));
    expect(history.current).toEqual(entry('GEN', 1));
    expect(history.back).toEqual([]);
    expect(history.forward).toEqual([entry('GEN', 2), entry('EXO', 3), entry('LEV', 4)]);
  });

  test('forward one step is symmetric', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    navigateHistory(history, -1);
    const destination = navigateHistory(history, 1);
    expect(destination).toEqual(entry('GEN', 2));
    expect(history.current).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('multi-step forward lands on the target and re-stacks intervening entries', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2), entry('EXO', 3), entry('LEV', 4));
    navigateHistory(history, -3); // current GEN 1, back = [], forward = [GEN 2, EXO 3, LEV 4]
    const destination = navigateHistory(history, 2);
    expect(destination).toEqual(entry('EXO', 3));
    expect(history.current).toEqual(entry('EXO', 3));
    expect(history.back).toEqual([entry('GEN', 2), entry('GEN', 1)]);
    expect(history.forward).toEqual([entry('LEV', 4)]);
  });

  test('returns undefined and leaves history unchanged when out of range', () => {
    const history = historyOf(entry('GEN', 1), entry('GEN', 2));
    expect(navigateHistory(history, -2)).toBeUndefined(); // only 1 step of back available
    expect(navigateHistory(history, 1)).toBeUndefined(); // no forward
    expect(navigateHistory(history, 0)).toBeUndefined();
    expect(navigateHistory(history, 1.5)).toBeUndefined();
    expect(history.current).toEqual(entry('GEN', 2));
    expect(history.back).toEqual([entry('GEN', 1)]);
    expect(history.forward).toEqual([]);
  });

  test('back requires at least one back entry', () => {
    const history = historyOf(entry('GEN', 1));
    expect(navigateHistory(history, -1)).toBeUndefined();
  });

  test('navigating an empty (unseeded) history returns undefined', () => {
    const history = createEmptyReferenceHistory();
    expect(navigateHistory(history, -1)).toBeUndefined();
    expect(navigateHistory(history, 1)).toBeUndefined();
  });

  test('sourceProjectId survives a back/forward round trip', () => {
    const history = createEmptyReferenceHistory();
    recordNavigation(history, {
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      sourceProjectId: 'project-a',
    });
    recordNavigation(history, {
      scrRef: { book: 'MRK', chapterNum: 4, verseNum: 1 },
      sourceProjectId: 'project-b',
    });
    expect(navigateHistory(history, -1)?.sourceProjectId).toBe('project-a');
    expect(navigateHistory(history, 1)?.sourceProjectId).toBe('project-b');
  });
});
