import { describe, it, expect } from 'vitest';
import { Canon } from '@sillsdev/scripture';
import {
  computeCompareState,
  computeImportCompareState,
  deleteConfirmVariant,
  fmtTemplate,
  resolveImportBookId,
} from './manage-books-dialog.utils';

/** Canonical book ids, built the same way the dialog builds its default `allBooks` list. */
const ALL_BOOKS: string[] = (() => {
  const ids: string[] = [];
  for (let n = 1; n <= 102; n += 1) {
    const id = Canon.bookNumberToId(n, '');
    if (id) ids.push(id);
  }
  return ids;
})();

/**
 * Paratext's book-number filename prefix, mirroring ParatextData
 * `ProjectSettings.BookFileNameDigits` (01-09, 10-39, then a +1 gap for 40-99 so Matthew is `41`,
 * and A0/B0/C0 letter codes for >=100). Used to build authentic import filenames for the sweep.
 */
const paratextBookFileDigits = (bookNum: number): string => {
  if (bookNum < 10) return `0${bookNum}`;
  if (bookNum < 40) return `${bookNum}`;
  if (bookNum < 100) return `${bookNum + 1}`;
  if (bookNum < 110) return `A${bookNum - 100}`;
  if (bookNum < 120) return `B${bookNum - 110}`;
  return `C${bookNum - 120}`;
};

describe('fmtTemplate', () => {
  it('substitutes positional placeholders in order', () => {
    expect(fmtTemplate('Delete books from {0}?', 'PRJ')).toBe('Delete books from PRJ?');
  });

  it('substitutes multiple placeholders', () => {
    expect(fmtTemplate('{0} of {1}', 5, 10)).toBe('5 of 10');
  });

  it('renders missing positional values as empty strings', () => {
    expect(fmtTemplate('a={0} b={1}', 'A')).toBe('a=A b=');
  });

  it('handles a number value via String coercion', () => {
    expect(fmtTemplate('count: {0}', 42)).toBe('count: 42');
  });

  it('returns the template unchanged when no placeholders are present', () => {
    expect(fmtTemplate('no placeholders here')).toBe('no placeholders here');
  });

  it('only matches numeric placeholders (ignores `{name}`)', () => {
    // Named placeholders are not substituted by this helper — they pass through.
    expect(fmtTemplate('value: {name}', 'ignored')).toBe('value: {name}');
  });

  it('repeats a value when the same index is used twice', () => {
    expect(fmtTemplate('{0} = {0}', 'x')).toBe('x = x');
  });
});

describe('computeCompareState', () => {
  it('returns "undetermined" when both dates are missing', () => {
    expect(computeCompareState(undefined, undefined)).toBe('undetermined');
  });

  it('returns "sourceDoesNotExist" when only the destination date is present', () => {
    expect(computeCompareState(undefined, '2026-05-04T10:00:00Z')).toBe('sourceDoesNotExist');
  });

  it('returns "destDoesNotExist" when only the source date is present', () => {
    expect(computeCompareState('2026-05-04T10:00:00Z', undefined)).toBe('destDoesNotExist');
  });

  it('returns "filesAreSame" for identical date strings', () => {
    const d = '2026-05-04T10:00:00Z';
    expect(computeCompareState(d, d)).toBe('filesAreSame');
  });

  it('returns "filesAreSame" when timestamps parse to the same instant despite different strings', () => {
    // Same instant expressed two ways — one with explicit 'Z', one with '+00:00' offset
    expect(computeCompareState('2026-05-04T10:00:00Z', '2026-05-04T10:00:00+00:00')).toBe(
      'filesAreSame',
    );
  });

  it('returns "sourceIsNewer" when source timestamp is greater', () => {
    expect(computeCompareState('2026-05-04T11:00:00Z', '2026-05-04T10:00:00Z')).toBe(
      'sourceIsNewer',
    );
  });

  it('returns "sourceIsOlder" when source timestamp is smaller', () => {
    expect(computeCompareState('2026-05-04T09:00:00Z', '2026-05-04T10:00:00Z')).toBe(
      'sourceIsOlder',
    );
  });

  it('parses non-ISO formats (RFC 2822) the same way Date.parse does', () => {
    // RFC 2822: "Mon, 4 May 2026 10:00:00 GMT" vs ISO "2026-05-04T11:00:00Z"
    expect(computeCompareState('Mon, 4 May 2026 10:00:00 GMT', '2026-05-04T11:00:00Z')).toBe(
      'sourceIsOlder',
    );
  });

  it('returns "undetermined" when one of the dates fails to parse', () => {
    expect(computeCompareState('not-a-date', '2026-05-04T10:00:00Z')).toBe('undetermined');
    expect(computeCompareState('2026-05-04T10:00:00Z', 'also-not-a-date')).toBe('undetermined');
  });
});

describe('computeImportCompareState (I9 — day granularity)', () => {
  it('treats a same-day import as filesAreSame despite a full-ISO dest timestamp', () => {
    // The picked file's date is day-precise (YYYY-MM-DD); the dest date is a full ISO timestamp.
    // Without day-normalization the dest's intra-day time would make the midnight-parsed pick look
    // "older". The import file existed at some point that day, so "same" is the right label.
    expect(computeImportCompareState('2026-06-15', '2026-06-15T10:14:22.5755943Z')).toBe(
      'filesAreSame',
    );
  });

  it('labels a later-day import as sourceIsNewer', () => {
    expect(computeImportCompareState('2026-06-16', '2026-06-15T10:14:22.5Z')).toBe('sourceIsNewer');
  });

  it('labels an earlier-day import as sourceIsOlder', () => {
    expect(computeImportCompareState('2026-06-14', '2026-06-15T10:14:22.5Z')).toBe('sourceIsOlder');
  });

  it('reports destDoesNotExist when the destination has no date (book absent)', () => {
    expect(computeImportCompareState('2026-06-15', undefined)).toBe('destDoesNotExist');
  });
});

describe('deleteConfirmVariant', () => {
  it('covers the full {all, partial} x {shared, not-shared} matrix', () => {
    expect(deleteConfirmVariant(true, true)).toBe('allShared');
    expect(deleteConfirmVariant(true, false)).toBe('all');
    expect(deleteConfirmVariant(false, true)).toBe('partialShared');
    expect(deleteConfirmVariant(false, false)).toBe('partial');
  });

  it('regression: the shared warning survives the all-books case', () => {
    // The original branch order checked allSelected before isShared, dropping the
    // shared-project Send/Receive warning exactly when EVERY book of a shared
    // project was about to be deleted — the highest-impact case.
    expect(deleteConfirmVariant(true, true)).not.toBe('all');
    expect(deleteConfirmVariant(true, true)).toBe('allShared');
  });
});

describe('resolveImportBookId', () => {
  it('prefers the \\id marker in SFM content over the filename', () => {
    // Even a misleading filename must yield the content's book id.
    expect(resolveImportBookId('38ZECCUNP89T.SFM', '\\id ZEC\n\\c 1\n', ALL_BOOKS)).toBe('ZEC');
    expect(resolveImportBookId('whatever.sfm', '  \\id MAT - World English\n', ALL_BOOKS)).toBe(
      'MAT',
    );
  });

  it('falls back to the filename when content carries no usable \\id marker', () => {
    expect(resolveImportBookId('ZEC.SFM', undefined, ALL_BOOKS)).toBe('ZEC');
    expect(resolveImportBookId('41MAT.usx', undefined, ALL_BOOKS)).toBe('MAT');
  });

  it('handles book ids that contain a leading digit (e.g. 1SA)', () => {
    expect(resolveImportBookId('091SACUNP.SFM', undefined, ALL_BOOKS)).toBe('1SA');
  });

  it('returns undefined when nothing matches', () => {
    expect(resolveImportBookId('123-456.txt', undefined, ALL_BOOKS)).toBeUndefined();
  });

  it('regression: picks the book id at the front of the name, not an earlier-canon substring', () => {
    // `38ZECCUNP89T` (Zechariah) contains "ECC" (Ecclesiastes, an earlier book) inside "ZEC...".
    // A canonical-order substring scan returned ECC and imported Zechariah into the wrong book.
    // USX/XML imports always hit this path because their content has no \id marker.
    expect(resolveImportBookId('38ZECCUNP89T.SFM', undefined, ALL_BOOKS)).toBe('ZEC');
    expect(resolveImportBookId('38ZECCUNP89T.usx', undefined, ALL_BOOKS)).toBe('ZEC');
  });

  it('regression: a digit-leading id earlier in the name does not win over the real book', () => {
    // Paratext prefixes NT files with bookNum+1, so Matthew is `41MAT`. A plain leftmost scan would
    // pick `1MA` (1 Maccabees) at index 1 over `MAT` at index 2 — the real book must win.
    expect(resolveImportBookId('41MAT.usx', undefined, ALL_BOOKS)).toBe('MAT');
    expect(resolveImportBookId('52COL.usx', undefined, ALL_BOOKS)).toBe('COL');
    expect(resolveImportBookId('84MAN.usx', undefined, ALL_BOOKS)).toBe('MAN');
  });

  it('regression: a digit-leading book whose letters + project initial form another book', () => {
    // `471COLXX` is 1 Corinthians (prefix 47 + `1CO`) from a project named `LXX...`. The id's
    // letters (`CO`) plus the project's first letter (`L`) spell `COL` (Colossians); reconstructing
    // the expected `<prefix><id>` stem keeps it `1CO`, not `COL`.
    expect(resolveImportBookId('471COLXX.usx', undefined, ALL_BOOKS)).toBe('1CO');
    expect(resolveImportBookId('551TITEV.SFM', undefined, ALL_BOOKS)).toBe('1TI'); // not Titus
    expect(resolveImportBookId('1COLXX.SFM', undefined, ALL_BOOKS)).toBe('1CO'); // MAT form
  });

  it('regression: a project short name containing a book code does not override the real book', () => {
    // Paratext names files <bookNumber><bookId><projectShortName>; a project short name that
    // happens to contain an earlier-canon code (e.g. "GEN") must not win over the leading id.
    expect(resolveImportBookId('40MATGEN.SFM', undefined, ALL_BOOKS)).toBe('MAT');
  });

  it('resolves every book from its authentic Paratext filename (digits + id + project)', () => {
    // Sweep all books through real Paratext filenames so a regression on any single book (e.g. the
    // +1 NT gap, digit-leading ids, or A0/B0/C0 apocrypha prefixes) is caught. Build the
    // (filename -> expected id) cases first so the assertions are not inside a conditional.
    const cases: Array<{ filename: string; expected: string }> = [];
    for (let n = 1; n <= 102; n += 1) {
      const id = Canon.bookNumberToId(n, '');
      if (id) {
        const prefix = paratextBookFileDigits(n);
        cases.push({ filename: `${prefix}${id}CUNP08.SFM`, expected: id });
        cases.push({ filename: `${prefix}${id}.usx`, expected: id });
        // FileNameForm === 'MAT' (bare id, no number prefix).
        cases.push({ filename: `${id}CUNP08.SFM`, expected: id });
      }
    }
    const resolved = cases.map((c) => ({
      ...c,
      actual: resolveImportBookId(c.filename, undefined, ALL_BOOKS),
    }));
    expect(resolved.filter((r) => r.actual !== r.expected)).toEqual([]);
  });
});
