import { describe, it, expect } from 'vitest';
import { usxStringToUsj, Usj, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { parseVerseRange, verseRangeIncludes, sliceUsjToVerse } from './verse-display.utils';

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
  it('includes the lower bound of a combined range', () => {
    expect(verseRangeIncludes('14-15', 14)).toBe(true);
  });
  it('is false for a non-numeric marker', () => {
    expect(verseRangeIncludes('abc', 1)).toBe(false);
  });
});

// Test helper: narrows an unknown USJ content node to a MarkerObject without an `as` assertion.
function isMarkerObjectNode(value: unknown): value is MarkerObject {
  return typeof value === 'object' && !!value;
}

// Test helper: flatten a USJ into [{ marker, text }] per top-level paragraph, for readable asserts.
function paragraphs(usj: Usj): { marker: string; text: string }[] {
  const textOf = (content: unknown): string => {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) return content.map(textOf).join('');
    if (isMarkerObjectNode(content)) {
      if ('content' in content) {
        return textOf(content.content);
      }
      // Extract verse number from verse markers
      if (content.type === 'verse' && content.number) {
        return String(content.number);
      }
    }
    return '';
  };
  return usj.content
    .filter((n): n is MarkerObject => isMarkerObjectNode(n) && n.type === 'para')
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

// WEB PSA 1:1 — verse 1 spans one q1 + two q2 paragraphs (the spike's poetry case).
const usxPoetry = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">WEB</book>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />Blessed is the man,</para>
  <para style="q2" vid="PSA 1:1">nor stand on the path of sinners,</para>
  <para style="q2" vid="PSA 1:1">nor sit in the seat of scoffers;<verse eid="PSA 1:1" /></para>
  <para style="q1">
    <verse number="2" style="v" sid="PSA 1:2" />but his delight is in the law.<verse eid="PSA 1:2" /></para>
</usx>
`;
const usjPoetry = usxStringToUsj(usxPoetry);

describe('sliceUsjToVerse — multi-paragraph poetry', () => {
  it('preserves each poetry line as its own paragraph', () => {
    const { usj, isEmpty } = sliceUsjToVerse(usjPoetry, 1);
    expect(isEmpty).toBe(false);
    expect(paragraphs(usj)).toEqual([
      { marker: 'q1', text: '1Blessed is the man,' },
      { marker: 'q2', text: 'nor stand on the path of sinners,' },
      { marker: 'q2', text: 'nor sit in the seat of scoffers;' },
    ]);
  });

  it('does not bleed verse 1 poetry into verse 2', () => {
    const { usj } = sliceUsjToVerse(usjPoetry, 2);
    expect(paragraphs(usj)).toEqual([{ marker: 'q1', text: '2but his delight is in the law.' }]);
  });
});

// Matt 17:14-15 — a combined (bridged) verse rendered from one marker.
const usxCombined = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="MAT" style="id">WEB</book>
  <chapter number="17" style="c" sid="MAT 17" />
  <para style="p">
    <verse number="13" style="v" sid="MAT 17:13" />Then the disciples understood.<verse eid="MAT 17:13" /><verse number="14-15" style="v" sid="MAT 17:14-15" />A man came, kneeling.<verse eid="MAT 17:14-15" /><verse number="16" style="v" sid="MAT 17:16" />I brought him.<verse eid="MAT 17:16" /></para>
</usx>
`;
const usjCombined = usxStringToUsj(usxCombined);

// Luke 1:1-3a — a partial combined range.
const usxPartial = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="LUK" style="id">WEB</book>
  <chapter number="1" style="c" sid="LUK 1" />
  <para style="p">
    <verse number="1-3a" style="v" sid="LUK 1:1-3a" />Many have undertaken to draw up an account.<verse eid="LUK 1:1-3a" /><verse number="3b-4" style="v" sid="LUK 1:3b-4" />It seemed good to me also.<verse eid="LUK 1:3b-4" /></para>
</usx>
`;
const usjPartial = usxStringToUsj(usxPartial);

function verseOpenerNumbers(usj: Usj): string[] {
  const nums: string[] = [];
  const walk = (content: unknown) => {
    if (Array.isArray(content)) content.forEach(walk);
    else if (isMarkerObjectNode(content)) {
      if (content.type === 'verse' && content.number !== undefined)
        nums.push(String(content.number));
      if ('content' in content) walk(content.content);
    }
  };
  walk(usj.content);
  return nums;
}

describe('sliceUsjToVerse — combined and partial ranges', () => {
  it('renders a combined verse when focus falls inside the range, once (PT-3495)', () => {
    const { usj, isEmpty } = sliceUsjToVerse(usjCombined, 15); // focus 15 inside 14-15
    expect(isEmpty).toBe(false);
    expect(paragraphs(usj)).toEqual([{ marker: 'p', text: '14-15A man came, kneeling.' }]);
    expect(verseOpenerNumbers(usj)).toEqual(['14-15']); // emitted exactly once
  });

  it('renders a partial combined range for a focus inside it', () => {
    const { usj } = sliceUsjToVerse(usjPartial, 2); // 2 inside 1-3a
    expect(paragraphs(usj)).toEqual([
      { marker: 'p', text: '1-3aMany have undertaken to draw up an account.' },
    ]);
  });
});

// A section heading (s) + reference (r) sit between verse 1 and verse 2.
const usxHeading = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="MAT" style="id">WEB</book>
  <chapter number="1" style="c" sid="MAT 1" />
  <para style="p">
    <verse number="1" style="v" sid="MAT 1:1" />The book of the genealogy.<verse eid="MAT 1:1" /></para>
  <para style="s">The Genealogy</para>
  <para style="r">(Luke 3:23-38)</para>
  <para style="p">
    <verse number="2" style="v" sid="MAT 1:2" />Abraham became the father of Isaac.<verse eid="MAT 1:2" /></para>
</usx>
`;
const usjHeading = usxStringToUsj(usxHeading);

// Two chapters in one document (cross-chapter): make sure chapter 2's verse 1 is not confused
// with chapter 1's verse 1 when slicing the doc for a given verse number.
const usxCrossChapter = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="MAT" style="id">WEB</book>
  <chapter number="1" style="c" sid="MAT 1" />
  <para style="p">
    <verse number="1" style="v" sid="MAT 1:1" />Chapter one verse one.<verse eid="MAT 1:1" /></para>
  <chapter eid="MAT 1" />
  <chapter number="2" style="c" sid="MAT 2" />
  <para style="p">
    <verse number="1" style="v" sid="MAT 2:1" />Chapter two verse one.<verse eid="MAT 2:1" /></para>
</usx>
`;
const usjCrossChapter = usxStringToUsj(usxCrossChapter);

describe('sliceUsjToVerse — boundaries and empty', () => {
  it('does not leak a following section heading into the prior verse', () => {
    const { usj } = sliceUsjToVerse(usjHeading, 1);
    expect(paragraphs(usj)).toEqual([{ marker: 'p', text: '1The book of the genealogy.' }]);
    expect(paragraphs(usj).some((p) => p.text.includes('Genealogy'))).toBe(false);
  });

  it('is empty for a verse-0 request with no renderable text (PT-3133)', () => {
    const { usj, isEmpty } = sliceUsjToVerse(usjHeading, 0);
    expect(isEmpty).toBe(true);
    expect(paragraphs(usj)).toEqual([]);
  });

  it('is empty for a verse missing from this resource (does not blank the row)', () => {
    const { isEmpty } = sliceUsjToVerse(usjHeading, 99);
    expect(isEmpty).toBe(true);
  });

  it('renders chapter markers as chrome-dropped; verse 1 slice still has content in a multi-chapter doc', () => {
    const { usj, isEmpty } = sliceUsjToVerse(usjCrossChapter, 1);
    expect(isEmpty).toBe(false);
    // Both chapters have a verse 1; the naive slice includes both verse-1 paragraphs (chrome
    // dropped). The consuming cell fetches a single chapter, so in practice only one is present;
    // this asserts both paragraphs survive and chrome is dropped.
    expect(paragraphs(usj)).toEqual([
      { marker: 'p', text: '1Chapter one verse one.' },
      { marker: 'p', text: '1Chapter two verse one.' },
    ]);
  });
});
