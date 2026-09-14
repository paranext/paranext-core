import { describe, expect, it } from 'vitest';
import {
  compareProjectsByName,
  formatProjectName,
  hasDistinctFullName,
  normalizeProjectId,
} from './project-util';

describe('normalizeProjectId', () => {
  it('uppercases an id to its canonical case-insensitive key', () => {
    expect(normalizeProjectId('abc123def')).toBe('ABC123DEF');
  });

  it('leaves an already-canonical (uppercase) id unchanged (idempotent)', () => {
    expect(normalizeProjectId('ABC123DEF')).toBe('ABC123DEF');
  });

  it('maps mixed-case variants of the same id to one key', () => {
    expect(normalizeProjectId('aBcDeF')).toBe(normalizeProjectId('ABCDEF'));
  });
});

describe('hasDistinctFullName', () => {
  it('is true when the full name differs from the short name', () => {
    expect(hasDistinctFullName({ shortName: 'arb', fullName: 'True Meaning Arabic' })).toBe(true);
  });

  it('is false when there is no full name', () => {
    expect(hasDistinctFullName({ shortName: 'arb' })).toBe(false);
  });

  it('is false when the full name is an empty string', () => {
    expect(hasDistinctFullName({ shortName: 'arb', fullName: '' })).toBe(false);
  });

  it('is false when the two names are identical', () => {
    expect(hasDistinctFullName({ shortName: 'WEB', fullName: 'WEB' })).toBe(false);
  });

  it('is TRUE when the names differ only by case, because the rule is exact', () => {
    // Deliberate: the comparison is case-sensitive `!==`. Widening it to a case-insensitive
    // match would silently suppress a full name that a project genuinely carries.
    expect(hasDistinctFullName({ shortName: 'web', fullName: 'WEB' })).toBe(true);
  });
});

describe('formatProjectName', () => {
  it('joins the short name and full name with " - ", short name first', () => {
    expect(formatProjectName({ shortName: 'arb', fullName: 'True Meaning Arabic' })).toBe(
      'arb - True Meaning Arabic',
    );
  });

  it('returns the short name alone when the full name adds nothing', () => {
    expect(formatProjectName({ shortName: 'WEB', fullName: 'WEB' })).toBe('WEB');
    expect(formatProjectName({ shortName: 'WEB', fullName: '' })).toBe('WEB');
    expect(formatProjectName({ shortName: 'WEB' })).toBe('WEB');
  });
});

describe('compareProjectsByName', () => {
  it('orders by short name, not full name', () => {
    const arb = { shortName: 'arb', fullName: 'Zulu Last Alphabetically' };
    const web = { shortName: 'WEB', fullName: 'Alpha First Alphabetically' };
    expect(compareProjectsByName(arb, web)).toBeLessThan(0);
  });

  it('ignores case, so "arb" and "ARB" are equal for ordering', () => {
    expect(compareProjectsByName({ shortName: 'arb' }, { shortName: 'ARB' })).toBe(0);
  });

  it('sorts a list into short-name order regardless of full names', () => {
    const projects = [
      { shortName: 'WEB', fullName: 'World English Bible' },
      { shortName: 'arb', fullName: 'True Meaning Arabic' },
      { shortName: 'ESVUS16', fullName: 'English Standard Version' },
    ];
    expect([...projects].sort(compareProjectsByName).map((p) => p.shortName)).toEqual([
      'arb',
      'ESVUS16',
      'WEB',
    ]);
  });
});
