import { VerseRef } from '@sillsdev/scripture';
import {
  aggregateProjectIdsByCheckId,
  aggregateRanges,
  isWithinRange,
} from './check-aggregator.utils';

describe('aggregateRanges', () => {
  it('should merge overlapping ranges', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1), projectId: 'proj1' },
            { start: new VerseRef(1, 5, 1), end: new VerseRef(1, 9, 1), projectId: 'proj1' },
          ],
          includeDeniedResults: false,
        },
      ],
      [
        'sub2',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 2, 1), end: new VerseRef(1, 8, 1), projectId: 'proj1' },
          ],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateRanges(subscriptions);
    // Using JSON.stringify here because the constructors for VerseRef set different internal fields
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify([
        { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 9, 1), projectId: 'proj1' },
      ]),
    );
  });

  it('should merge overlapping ranges that lack ends', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1), projectId: 'proj1' },
            { start: new VerseRef(1, 2, 1), projectId: 'proj1' },
          ],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateRanges(subscriptions);
    // Using JSON.stringify here because the constructors for VerseRef set different internal fields
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify([{ start: new VerseRef(1, 1, 1), projectId: 'proj1' }]),
    );
  });

  it('should not merge non-overlapping ranges', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 1, 1), projectId: 'proj1' },
            { start: new VerseRef(1, 2, 1), end: new VerseRef(1, 2, 1), projectId: 'proj1' },
          ],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateRanges(subscriptions);
    expect(result).toEqual([
      { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 1, 1), projectId: 'proj1' },
      { start: new VerseRef(1, 2, 1), end: new VerseRef(1, 2, 1), projectId: 'proj1' },
    ]);
  });

  it('should not merge different projects', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1), projectId: 'proj1' },
            { start: new VerseRef(1, 2, 1), end: new VerseRef(1, 4, 1), projectId: 'proj2' },
          ],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateRanges(subscriptions);
    expect(result).toEqual([
      { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1), projectId: 'proj1' },
      { start: new VerseRef(1, 2, 1), end: new VerseRef(1, 4, 1), projectId: 'proj2' },
    ]);
  });

  it('should handle empty subscriptions', () => {
    const subscriptions = new Map();

    const result = aggregateRanges(subscriptions);
    expect(result).toEqual([]);
  });

  it('should handle single range', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [
            { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 1, 1), projectId: 'proj1' },
          ],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateRanges(subscriptions);
    expect(result).toEqual([
      { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 1, 1), projectId: 'proj1' },
    ]);
  });
});

describe('isWithinRange', () => {
  it('should return true for verse within range', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1) };
    const verseRef = new VerseRef(1, 2, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1) };
    const verseRef = new VerseRef(1, 4, 1);
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse at the start of range', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1) };
    const verseRef = new VerseRef(1, 1, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse at the end of range', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 3, 1) };
    const verseRef = new VerseRef(1, 3, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse within range without end', () => {
    const range = { start: new VerseRef(1, 1, 1) };
    const verseRef = new VerseRef(1, 2, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range without end', () => {
    const range = { start: new VerseRef(1, 1, 1) };
    const verseRef = new VerseRef(2, 1, 1);
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different chapters', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 2, 1) };
    const verseRef = new VerseRef(1, 2, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different chapters', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(1, 2, 1) };
    const verseRef = new VerseRef(1, 3, 1);
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different books', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(2, 1, 1) };
    const verseRef = new VerseRef(2, 1, 1);
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different books', () => {
    const range = { start: new VerseRef(1, 1, 1), end: new VerseRef(2, 1, 1) };
    const verseRef = new VerseRef(3, 1, 1);
    expect(isWithinRange(range, verseRef)).toBe(false);
  });
});

describe('aggregateProjectIdsByCheckId', () => {
  it('should aggregate project IDs by check ID', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map([
            ['check1', new Set(['proj1', 'proj2'])],
            ['check2', new Set(['proj3'])],
          ]),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
      [
        'sub2',
        {
          enabledProjectsByCheckId: new Map([
            ['check1', new Set(['proj2', 'proj4'])],
            ['check3', new Set(['proj5'])],
          ]),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateProjectIdsByCheckId(subscriptions);
    expect(result).toEqual(
      new Map([
        ['check1', new Set(['proj1', 'proj2', 'proj4'])],
        ['check2', new Set(['proj3'])],
        ['check3', new Set(['proj5'])],
      ]),
    );
  });

  it('should handle empty subscriptions', () => {
    const subscriptions = new Map();

    const result = aggregateProjectIdsByCheckId(subscriptions);
    expect(result).toEqual(new Map());
  });

  it('should handle subscriptions with no enabled projects', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map(),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateProjectIdsByCheckId(subscriptions);
    expect(result).toEqual(new Map());
  });

  it('should handle single subscription with single check ID', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map([['check1', new Set(['proj1'])]]),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateProjectIdsByCheckId(subscriptions);
    expect(result).toEqual(new Map([['check1', new Set(['proj1'])]]));
  });

  it('should handle multiple subscriptions with overlapping check IDs', () => {
    const subscriptions = new Map([
      [
        'sub1',
        {
          enabledProjectsByCheckId: new Map([['check1', new Set(['proj1'])]]),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
      [
        'sub2',
        {
          enabledProjectsByCheckId: new Map([['check1', new Set(['proj2'])]]),
          ranges: [],
          includeDeniedResults: false,
        },
      ],
    ]);

    const result = aggregateProjectIdsByCheckId(subscriptions);
    expect(result).toEqual(new Map([['check1', new Set(['proj1', 'proj2'])]]));
  });
});
