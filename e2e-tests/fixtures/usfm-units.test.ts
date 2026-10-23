import { describe, expect, it } from 'vitest';
import { compareUsfmUnits, describeChangesOutside, splitUsfmUnits } from './usfm-units';

const BOOK = [
  '\\id JON',
  '\\h Jonah',
  '\\c 1',
  '\\p',
  '\\v 1 Now\\f + \\fr 1:1 \\ft a note\\f* word came,',
  '\\v 2 Arise.',
  '\\p',
  '\\v 3 But Jonah rose.',
  '\\c 2',
  '\\p',
  '\\v 1 Then Jonah prayed.',
  '',
].join('\r\n');

describe('splitUsfmUnits', () => {
  it('labels the header, chapter lines and verses, and joins back to the input', () => {
    const units = splitUsfmUnits(BOOK);
    expect(units.map((unit) => unit.label)).toEqual([
      'header',
      'c 1',
      '1:1',
      '1:2',
      '1:3',
      'c 2',
      '2:1',
    ]);
    expect(units.map((unit) => unit.text).join('')).toBe(BOOK);
  });

  it('gives a verse the paragraph markers that follow it', () => {
    expect(splitUsfmUnits(BOOK).find((unit) => unit.label === '1:2')?.text).toBe(
      '\\v 2 Arise.\r\n\\p\r\n',
    );
  });

  it('starts units mid-line and ignores markers that only look like verse references', () => {
    const units = splitUsfmUnits('\\c 3 \\p \\v 1 a \\va 2\\va* \\fr 3:4 \\v 2 b');
    expect(units.map((unit) => unit.label)).toEqual(['c 3', '3:1', '3:2']);
  });

  it('keeps repeated labels distinct', () => {
    expect(splitUsfmUnits('\\c 1\n\\v 1 a\n\\v 1 b\n').map((unit) => unit.label)).toEqual([
      'c 1',
      '1:1',
      '1:1#2',
    ]);
  });
});

describe('compareUsfmUnits', () => {
  it('reports changed, removed and added units', () => {
    const after = BOOK.replace('Arise.', 'Arise!')
      .replace('\\v 3 But Jonah rose.\r\n', '')
      .concat('\\v 2 Added.');
    expect(compareUsfmUnits(BOOK, after)).toEqual({
      changed: ['1:2'],
      removed: ['1:3'],
      added: ['2:2'],
    });
  });
});

describe('describeChangesOutside', () => {
  it('is empty when only the allowed unit changed', () => {
    expect(describeChangesOutside(BOOK, BOOK.replace('Arise.', 'Arise now.'), ['1:2'])).toBe('');
  });

  it('names a stray unit with both texts spelled out', () => {
    const after = BOOK.replace('Arise.', 'Arise now.').replace('\\p\r\n\\v 3', '\\v 3');
    const description = describeChangesOutside(BOOK, after, ['1:3']);
    expect(description).toContain('units changed: [1:2]; expected only: [1:3]');
    expect(description).toContain('1:2 before: "\\\\v 2 Arise.\\r\\n\\\\p\\r\\n"');
    expect(description).toContain('1:2 after:  "\\\\v 2 Arise now.\\r\\n"');
  });

  it('reports a change to the book header', () => {
    expect(describeChangesOutside(BOOK, BOOK.replace('\\h Jonah', '\\h Jonah '), ['1:1'])).toMatch(
      /^units changed: \[header\]/,
    );
  });
});
