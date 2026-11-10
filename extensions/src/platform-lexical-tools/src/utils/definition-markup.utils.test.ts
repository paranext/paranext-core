import { describe, it, expect } from 'vitest';
import { parseDefinitionMarkup, toVavHolamOrder } from './definition-markup.utils';

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

  it('leaves other markers literal', () => {
    expect(parseDefinitionMarkup('({S:04300102800006})')).toEqual([
      { kind: 'text', text: '({S:04300102800006})' },
    ]);
  });

  it('leaves malformed markup literal', () => {
    expect(parseDefinitionMarkup('{L:broken')).toEqual([{ kind: 'text', text: '{L:broken' }]);
  });

  it('returns nothing for an empty string', () => {
    expect(parseDefinitionMarkup('')).toEqual([]);
  });
});

describe('toVavHolamOrder', () => {
  // Moab, spelled with the holam before the vav and then after it
  const HOLAM_FIRST = '\u05DE\u05B9\u05D5\u05D0\u05B8\u05D1';
  const VAV_FIRST = '\u05DE\u05D5\u05B9\u05D0\u05B8\u05D1';

  it('moves a holam written before its vav to after it', () => {
    expect(toVavHolamOrder(HOLAM_FIRST)).toBe(VAV_FIRST);
  });

  it('leaves a lemma already in vav-then-holam order unchanged', () => {
    expect(toVavHolamOrder(VAV_FIRST)).toBe(VAV_FIRST);
  });
});
