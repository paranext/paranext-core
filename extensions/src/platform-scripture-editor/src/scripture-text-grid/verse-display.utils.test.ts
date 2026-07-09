import { describe, it, expect } from 'vitest';
import { parseVerseRange, verseRangeIncludes, sliceUsjToVerse } from './verse-display.utils';
import { usxStringToUsj, Usj, MarkerObject } from '@eten-tech-foundation/scripture-utilities';

describe('parseVerseRange', () => {
  it('parses a single verse number', () => {
    expect(parseVerseRange('5')).toEqual({ start: 5, end: 5 });
  });
  it('parses a combined range', () => {
    expect(parseVerseRange('14-15')).toEqual({ start: 14, end: 15 });
  });
  it('strips partial-verse letters at the range end', () => {
    expect(parseVerseRange('1-3a')).toEqual({ start: 1, end: 3 });
  });
  it('strips a partial-verse letter on a single verse', () => {
    expect(parseVerseRange('3a')).toEqual({ start: 3, end: 3 });
  });
});

describe('verseRangeIncludes', () => {
  it('includes the exact verse', () => {
    expect(verseRangeIncludes('5', 5)).toBe(true);
  });
  it('includes a verse inside a combined range', () => {
    expect(verseRangeIncludes('14-15', 15)).toBe(true);
  });
  it('excludes a verse outside the range', () => {
    expect(verseRangeIncludes('14-15', 16)).toBe(false);
  });
  it('is false for a non-numeric marker', () => {
    expect(verseRangeIncludes('abc', 1)).toBe(false);
  });
});

// Test helper: flatten a USJ into [{ marker, text }] per top-level paragraph, for readable asserts.
function paragraphs(usj: Usj): { marker: string; text: string }[] {
  const textOf = (content: unknown): string => {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) return content.map(textOf).join('');
    if (content && typeof content === 'object') {
      const obj = content as Record<string, unknown>;
      if ('content' in obj) {
        return textOf((content as MarkerObject).content);
      }
      // Extract verse number from verse markers
      if (obj.type === 'verse' && obj.number) {
        return String(obj.number);
      }
    }
    return '';
  };
  return usj.content
    .filter((n): n is MarkerObject => typeof n === 'object' && n !== null && n.type === 'para')
    .map((p) => ({ marker: p.marker ?? '', text: textOf(p.content).replace(/\s+/g, ' ').trim() }));
}

// Prose chapter: three verses inside one <para style="p">, plus a leading book title + chapter.
const usxProse = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">Sample</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="1" style="v" sid="GEN 1:1" />In the beginning.<verse eid="GEN 1:1" /><verse number="2" style="v" sid="GEN 1:2" />And the earth.<verse eid="GEN 1:2" /><verse number="3" style="v" sid="GEN 1:3" />Let there be light.<verse eid="GEN 1:3" /></para>
</usx>
`;
const usjProse = usxStringToUsj(usxProse);

describe('sliceUsjToVerse — single prose verse', () => {
  it('keeps only the target verse text and drops book/chapter chrome', () => {
    const { usj, isEmpty } = sliceUsjToVerse(usjProse, 2);
    expect(isEmpty).toBe(false);
    expect(paragraphs(usj)).toEqual([{ marker: 'p', text: '2And the earth.' }]);
    // No book title / chapter number leaked in.
    expect(paragraphs(usj).some((p) => p.text.includes('Sample'))).toBe(false);
  });

  it('does not leak the next verse (stops at the next verse marker)', () => {
    const { usj } = sliceUsjToVerse(usjProse, 1);
    expect(paragraphs(usj)[0].text).toBe('1In the beginning.');
    expect(paragraphs(usj)[0].text).not.toContain('earth');
  });
});
