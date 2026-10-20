import { describe, it, expect, vi } from 'vitest';
import { CheckJobStatusReport } from 'platform-scripture';
import {
  addCheckError,
  isWithinRange,
  lookUpCheckSetupStatusWithFallback,
  mergeCheckErrors,
} from './check-aggregator.utils';

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
    const added = addCheckError(errors, { checkId: 'Quotation', message: 'bad rules' });
    expect(added).toBe(false);
    expect(errors).toEqual([{ checkId: 'Quotation', message: 'bad rules' }]);
  });

  it('records a different message for the same check', () => {
    const errors = [{ checkId: 'Quotation', message: 'bad rules' }];
    const added = addCheckError(errors, { checkId: 'Quotation', message: 'other' });
    expect(added).toBe(true);
    expect(errors).toHaveLength(2);
  });
});

describe('lookUpCheckSetupStatusWithFallback', () => {
  it('returns the runner’s own answer when the lookup succeeds', async () => {
    const runner = {
      lookUpCheckSetupStatus: vi.fn(async () => ({
        status: 'notApplicable' as const,
        reason: '%reason%' as const,
      })),
      isCheckSetupForProject: vi.fn(async () => false),
    };
    await expect(lookUpCheckSetupStatusWithFallback(runner, 'Quotation', 'P1')).resolves.toEqual({
      status: 'notApplicable',
      reason: '%reason%',
    });
    expect(runner.isCheckSetupForProject).not.toHaveBeenCalled();
  });

  it('falls back to ready when the lookup rejects and the check is set up', async () => {
    const runner = {
      lookUpCheckSetupStatus: vi.fn(async () => {
        throw new Error('not implemented');
      }),
      isCheckSetupForProject: vi.fn(async () => true),
    };
    await expect(lookUpCheckSetupStatusWithFallback(runner, 'c', 'P1')).resolves.toEqual({
      status: 'ready',
    });
    expect(runner.isCheckSetupForProject).toHaveBeenCalledWith('c', 'P1');
  });

  it('falls back to setupRequired when the lookup rejects and the check is not set up', async () => {
    const runner = {
      lookUpCheckSetupStatus: vi.fn(async () => {
        throw new Error('not implemented');
      }),
      isCheckSetupForProject: vi.fn(async () => false),
    };
    await expect(lookUpCheckSetupStatusWithFallback(runner, 'c', 'P1')).resolves.toEqual({
      status: 'setupRequired',
    });
  });

  it('rethrows the original lookup error when the fallback also rejects', async () => {
    const original = new Error('lookup failed');
    const runner = {
      lookUpCheckSetupStatus: vi.fn(async () => {
        throw original;
      }),
      isCheckSetupForProject: vi.fn(async () => {
        throw new Error('fallback failed');
      }),
    };
    await expect(lookUpCheckSetupStatusWithFallback(runner, 'c', 'P1')).rejects.toBe(original);
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
