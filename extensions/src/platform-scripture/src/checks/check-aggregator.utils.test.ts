import { describe, it, expect } from 'vitest';
import { CheckJobStatusReport } from 'platform-scripture';
import { addCheckError, isWithinRange, mergeCheckErrors } from './check-aggregator.utils';

describe('isWithinRange', () => {
  it('should return true for verse within range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 4, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse at the start of range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse at the end of range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 3, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse within range without end', () => {
    const range = { start: { book: 'GEN', chapterNum: 1, verseNum: 1 } };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range without end', () => {
    const range = { start: { book: 'GEN', chapterNum: 1, verseNum: 1 } };
    const verseRef = { book: 'EXO', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different chapters', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 2, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different chapters', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 2, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 3, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different books', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'EXO', chapterNum: 1, verseNum: 1 },
    };

    const verseRef = { book: 'EXO', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different books', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'EXO', chapterNum: 1, verseNum: 1 },
    };
    const verseRef = { book: 'LEV', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });
});

function report(overrides: Partial<CheckJobStatusReport> = {}): CheckJobStatusReport {
  return {
    jobId: 'job',
    status: 'completed',
    percentComplete: 100,
    totalResultsCount: 0,
    totalExecutionTimeMs: 0,
    ...overrides,
  };
}

describe('addCheckError', () => {
  it('records the same check and message once', () => {
    const errors = [{ checkId: 'Quotation', message: 'bad rules' }];
    addCheckError(errors, { checkId: 'Quotation', message: 'bad rules' });
    expect(errors).toEqual([{ checkId: 'Quotation', message: 'bad rules' }]);
  });

  it('records a different message for the same check', () => {
    const errors = [{ checkId: 'Quotation', message: 'bad rules' }];
    addCheckError(errors, { checkId: 'Quotation', message: 'other' });
    expect(errors).toHaveLength(2);
  });
});

describe('mergeCheckErrors', () => {
  it('returns undefined when no runner reported check errors', () => {
    expect(mergeCheckErrors([report(), report({ checkErrors: [] })])).toBeUndefined();
  });

  it('combines every runner’s check errors in runner order', () => {
    expect(
      mergeCheckErrors([
        report({ checkErrors: [{ checkId: 'Quotation', message: 'a' }] }),
        report(),
        report({ checkErrors: [{ checkId: 'registered-x', message: 'b' }] }),
      ]),
    ).toEqual([
      { checkId: 'Quotation', message: 'a' },
      { checkId: 'registered-x', message: 'b' },
    ]);
  });
});
