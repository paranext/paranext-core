import { describe, expect, it } from 'vitest';
import {
  compareProjectsByName,
  formatProjectName,
  hasDistinctFullName,
  normalizeFullName,
  normalizeProjectId,
  PROJECT_NAME_SEPARATOR,
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

  it('is false when the full name is only whitespace', () => {
    // A blank name is present but invisible, so calling it distinct renders a dangling separator.
    // Applied here rather than left to each caller: `fullName` reaches this through public props an
    // external consumer fills, so the un-normalized path is reachable from outside the repo.
    expect(hasDistinctFullName({ shortName: 'arb', fullName: '   ' })).toBe(false);
    expect(hasDistinctFullName({ shortName: 'arb', fullName: '\t\n' })).toBe(false);
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

  it('emits no dangling separator for a raw whitespace-only full name', () => {
    expect(formatProjectName({ shortName: 'ABC', fullName: '  ' })).toBe('ABC');
  });

  it('keeps space inside a real full name, which is the project\u2019s own data', () => {
    // `normalizeFullName` narrows rather than edits, so the pair is only dropped when it is blank
    // throughout \u2014 never trimmed down to a shorter name than the project actually carries.
    expect(formatProjectName({ shortName: 'WEB', fullName: ' World English Bible ' })).toBe(
      'WEB -  World English Bible ',
    );
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

describe('normalizeFullName', () => {
  it('keeps a real full name', () => {
    expect(normalizeFullName('World English Bible')).toBe('World English Bible');
  });

  it.each([
    ['undefined', undefined],
    // A project data provider really does yield `null` for a setting that was never written, so the
    // helper has to be exercised against it; asserting only `undefined` would leave the shape this
    // guard mainly exists for uncovered.
    // eslint-disable-next-line no-null/no-null
    ['null', null],
    ['an empty string', ''],
    // A name of spaces is present but invisible, so passing it through would join a full name the
    // user cannot see and leave `formatProjectName` emitting a dangling separator.
    ['a whitespace-only string', '   '],
  ])('treats %s as absent', (_label, value) => {
    // The three shapes a project data provider actually yields for a setting that was never
    // written, plus the empty string legacy projects carry.
    expect(normalizeFullName(value)).toBeUndefined();
  });

  it('keeps a real name that merely carries surrounding space', () => {
    // Blank is absent, but space around a real name is the project's own data — this narrows what
    // counts as a name, it does not edit the name it returns.
    expect(normalizeFullName(' World English Bible ')).toBe(' World English Bible ');
  });

  it('treats a non-string setting value as absent rather than passing it through', () => {
    // `platform.fullName` is typed `string`, so a number here can only arrive from bad data — but
    // returning it would put a non-string into a `string | undefined` slot and break the caller
    // further downstream than the guard.
    expect(normalizeFullName(42)).toBeUndefined();
  });

  it('agrees with hasDistinctFullName about what counts as absent', () => {
    // Both own a piece of the same rule, so a change to one that is not mirrored in the other
    // silently reintroduces the per-consumer drift they exist to prevent.
    expect(hasDistinctFullName({ shortName: 'WEB', fullName: normalizeFullName('') })).toBe(false);
    expect(hasDistinctFullName({ shortName: 'WEB', fullName: '' })).toBe(false);
    expect(hasDistinctFullName({ shortName: 'WEB', fullName: normalizeFullName('   ') })).toBe(
      false,
    );
    expect(hasDistinctFullName({ shortName: 'WEB', fullName: '   ' })).toBe(false);
  });
});

describe('PROJECT_NAME_SEPARATOR', () => {
  it('is the separator formatProjectName actually joins with', () => {
    // A consumer that draws the separator in its own element (the toolbar's compound label) reads
    // this constant. If the two drift, the visible label and its tooltip disagree — and no test of
    // either one alone would notice.
    expect(formatProjectName({ shortName: 'WEB', fullName: 'World English Bible' })).toBe(
      `WEB${PROJECT_NAME_SEPARATOR}World English Bible`,
    );
  });
});
