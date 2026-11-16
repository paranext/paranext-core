import { describe, it, expect } from 'vitest';
import { markupToPlainText, parseDefinitionMarkup } from './definition-markup.utils';

describe('parseDefinitionMarkup', () => {
  it('parses a link', () => {
    expect(parseDefinitionMarkup('from {L:Bethlehem<SDBH:בֵּית לֶחֶם>};')).toEqual([
      { kind: 'text', text: 'from ' },
      {
        kind: 'entryLink',
        text: 'Bethlehem',
        dictionaryId: 'SDBH',
        targetLemma: 'בֵּית לֶחֶם',
      },
      { kind: 'text', text: ';' },
    ]);
  });

  it('parses several links', () => {
    const segments = parseDefinitionMarkup(
      '= man; ◄ from {L:Bethlehem<SDBH:בֵּית לֶחֶם>}; ► husband of {L:Naomi<SDBH:נָעֳמִי>}; father of {L:Mahlon<SDBH:מַחְלֹון>} and {L:Chilion<SDBH:כִּלְיֹון>}; time of the Judges',
    );
    expect(segments.filter((segment) => segment.kind === 'entryLink')).toHaveLength(4);
  });

  it('decodes escaped brackets', () => {
    expect(parseDefinitionMarkup('{L:Israel&lt;SDBH:יִשְׂרָאֵל&gt;}')).toEqual([
      { kind: 'entryLink', text: 'Israel', dictionaryId: 'SDBH', targetLemma: 'יִשְׂרָאֵל' },
    ]);
  });

  it('removes a numeric target suffix', () => {
    expect(parseDefinitionMarkup('{L:Βηθζαθά<SDBG:Βηθζαθά:000000>}')).toEqual([
      { kind: 'entryLink', text: 'Βηθζαθά', dictionaryId: 'SDBG', targetLemma: 'Βηθζαθά' },
    ]);
  });

  it('accepts hyphenated dictionary IDs', () => {
    expect(parseDefinitionMarkup('{L:moth<BT-OT:עָשׁ>}')).toEqual([
      { kind: 'entryLink', text: 'moth', dictionaryId: 'BT-OT', targetLemma: 'עָשׁ' },
    ]);
  });

  it('shows the text of an abbreviation', () => {
    expect(parseDefinitionMarkup('see {A:ABD} here')).toEqual([
      { kind: 'text', text: 'see ' },
      { kind: 'text', text: 'ABD' },
      { kind: 'text', text: ' here' },
    ]);
  });

  it('removes a note marker', () => {
    expect(parseDefinitionMarkup('a word{N:001} here')).toEqual([
      { kind: 'text', text: 'a word' },
      { kind: 'text', text: ' here' },
    ]);
  });

  it('leaves unknown markers literal', () => {
    expect(parseDefinitionMarkup('({X:123})')).toEqual([{ kind: 'text', text: '({X:123})' }]);
  });

  it('parses a Bible reference', () => {
    expect(parseDefinitionMarkup('({S:04200600300000}, apparatus)')).toEqual([
      { kind: 'text', text: '(' },
      {
        kind: 'scriptureLink',
        text: 'Luke 6:3',
        verseRef: { book: 'LUK', chapterNum: 6, verseNum: 3 },
      },
      { kind: 'text', text: ', apparatus)' },
    ]);
  });

  it('parses several Bible references in one marker', () => {
    expect(parseDefinitionMarkup('{S:04000202300032 04201803700014}')).toEqual([
      {
        kind: 'scriptureLink',
        text: 'Matthew 2:23',
        verseRef: { book: 'MAT', chapterNum: 2, verseNum: 23 },
      },
      { kind: 'text', text: '; ' },
      {
        kind: 'scriptureLink',
        text: 'Luke 18:37',
        verseRef: { book: 'LUK', chapterNum: 18, verseNum: 37 },
      },
    ]);
  });

  it('parses a range of Bible references', () => {
    expect(parseDefinitionMarkup('{S:00401503700000-00401504100000}')).toEqual([
      {
        kind: 'scriptureLink',
        text: 'Numbers 15:37',
        verseRef: { book: 'NUM', chapterNum: 15, verseNum: 37 },
      },
      { kind: 'text', text: '–' },
      {
        kind: 'scriptureLink',
        text: 'Numbers 15:41',
        verseRef: { book: 'NUM', chapterNum: 15, verseNum: 41 },
      },
    ]);
  });

  it('leaves a malformed Bible reference literal', () => {
    expect(parseDefinitionMarkup('{S:01300301900000000}')).toEqual([
      { kind: 'text', text: '{S:01300301900000000}' },
    ]);
  });

  it('leaves a Bible reference to an unknown book literal', () => {
    expect(parseDefinitionMarkup('{S:99900600300000}')).toEqual([
      { kind: 'text', text: '{S:99900600300000}' },
    ]);
  });

  it.each([
    ['i', 'italic'],
    ['u', 'underline'],
    ['b', 'bold'],
  ])('parses |%s styled text', (marker, style) => {
    expect(parseDefinitionMarkup(`one of the varieties of |${marker}Quercus|${marker}*;`)).toEqual([
      { kind: 'text', text: 'one of the varieties of ' },
      { kind: 'text', text: 'Quercus', style },
      { kind: 'text', text: ';' },
    ]);
  });

  it('leaves an unclosed style marker literal', () => {
    expect(parseDefinitionMarkup('|iQuercus')).toEqual([{ kind: 'text', text: '|iQuercus' }]);
  });

  it('shows the code of a domain', () => {
    expect(parseDefinitionMarkup('Galilee, {D:93.444})')).toEqual([
      { kind: 'text', text: 'Galilee, ' },
      { kind: 'text', text: '93.444' },
      { kind: 'text', text: ')' },
    ]);
  });

  it('reads a run of bars as one line break', () => {
    expect(parseDefinitionMarkup('majesty || honor')).toEqual([
      { kind: 'text', text: 'majesty' },
      { kind: 'lineBreak' },
      { kind: 'text', text: 'honor' },
    ]);
  });

  it('leaves malformed markup literal', () => {
    expect(parseDefinitionMarkup('{L:broken')).toEqual([{ kind: 'text', text: '{L:broken' }]);
  });

  it('returns nothing for an empty string', () => {
    expect(parseDefinitionMarkup('')).toEqual([]);
  });
});

describe('markupToPlainText', () => {
  it('reduces markup to its readable text', () => {
    expect(
      markupToPlainText(
        '(where the {L:ocean waters<SDBH:תְּהוֹם>} are{N:001}) |iQuercus|i* {S:04200600300000}',
      ),
    ).toBe('(where the ocean waters are) Quercus Luke 6:3');
  });

  it('shows a line break as a slash', () => {
    expect(markupToPlainText('majesty || honor')).toBe('majesty / honor');
  });
});
