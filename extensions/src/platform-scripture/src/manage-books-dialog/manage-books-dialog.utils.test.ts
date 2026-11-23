import { describe, it, expect } from 'vitest';
import {
  computeCompareState,
  computeImportCompareState,
  deleteConfirmVariant,
  fmtTemplate,
} from './manage-books-dialog.utils';

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
