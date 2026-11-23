import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { USFM_MARKERS_MAP_PARATEXT_3_0, UsjReaderWriter } from 'platform-bible-utils';
import { describe, it, expect } from 'vitest';
import {
  MARKER_DELETION_ERROR,
  ONE_ENDED_MARKER_ERROR,
  STRUCTURE_PROTECTED_ERROR,
  extractGuardedMarkers,
  extractStructuralMarkers,
  getMarkerReplaceAction,
  markersDeletedBy,
  usfmChangesStructure,
  replacementContainsStructuralMarker,
} from './structure-protection.util';

/** True when replacing the span `removed` with `inserted` deletes a marker. */
const deletesMarkers = (removed: string, inserted: string) =>
  markersDeletedBy(extractGuardedMarkers(removed), inserted);

describe('structure-protection.util', () => {
  describe('STRUCTURE_PROTECTED_ERROR', () => {
    it('is a stable non-empty sentinel string', () => {
      expect(typeof STRUCTURE_PROTECTED_ERROR).toBe('string');
      expect(STRUCTURE_PROTECTED_ERROR.length).toBeGreaterThan(0);
      expect(STRUCTURE_PROTECTED_ERROR).toBe('platformScripture.replace.structureProtected');
    });
  });

  // Marker classification (formerly isStructuralMarker here) now lives in platform-bible-utils as
  // isBlockMarker; its tests are in lib/platform-bible-utils/src/markers/usfm-markers.test.ts.

  describe('extractStructuralMarkers', () => {
    it('returns an empty array for plain text', () => {
      expect(extractStructuralMarkers('just some plain words')).toEqual([]);
    });
    it('captures paragraph markers in document order', () => {
      expect(extractStructuralMarkers('\\p hello \\q1 world')).toEqual(['p', 'q1']);
    });
    it('captures verse markers with their number', () => {
      expect(extractStructuralMarkers('\\v 4 text \\v 5 more')).toEqual(['v:4', 'v:5']);
    });
    it('captures verse ranges', () => {
      expect(extractStructuralMarkers('\\v 4-5 text')).toEqual(['v:4-5']);
    });
    it('captures chapter markers with their number', () => {
      expect(extractStructuralMarkers('\\c 1 text')).toEqual(['c:1']);
    });
    it('ignores inline/character markers', () => {
      expect(extractStructuralMarkers('text \\add inserted\\add* more')).toEqual([]);
    });
    it('mixes paragraph and verse markers in order', () => {
      expect(extractStructuralMarkers('\\p \\v 1 a \\v 2 b')).toEqual(['p', 'v:1', 'v:2']);
    });
  });

  describe('usfmChangesStructure', () => {
    it('is false for plain-text to plain-text', () => {
      expect(usfmChangesStructure('Abraham', 'Sarah')).toBe(false);
    });
    it('is false when identical structural markers are preserved', () => {
      expect(usfmChangesStructure('\\v 1 old text', '\\v 1 new text')).toBe(false);
    });
    it('is true when a paragraph marker is added', () => {
      expect(usfmChangesStructure('plain text', '\\p plain text')).toBe(true);
    });
    it('is true when a verse marker is removed', () => {
      expect(usfmChangesStructure('\\v 2 text', 'text')).toBe(true);
    });
    it('is true when a paragraph marker style changes', () => {
      expect(usfmChangesStructure('\\q1 line', '\\p line')).toBe(true);
    });
    it('is true when a verse number changes', () => {
      expect(usfmChangesStructure('\\v 1 text', '\\v 2 text')).toBe(true);
    });
    it('is true when a chapter number changes', () => {
      expect(usfmChangesStructure('\\c 1 text', '\\c 2 text')).toBe(true);
    });
    it('is false when an identical chapter marker is preserved', () => {
      expect(usfmChangesStructure('\\c 1 old text', '\\c 1 new text')).toBe(false);
    });
    it('is true when a sub-verse letter changes', () => {
      expect(usfmChangesStructure('\\v 4a text', '\\v 4b text')).toBe(true);
    });
    it('is true when a verse range changes', () => {
      expect(usfmChangesStructure('\\v 4-5 text', '\\v 4-6 text')).toBe(true);
    });
    it('is true when structural markers are reordered', () => {
      expect(usfmChangesStructure('\\p \\v 1 a', '\\v 1 \\p a')).toBe(true);
    });
  });

  describe('replacementContainsStructuralMarker', () => {
    it('is false for plain replacement text', () => {
      expect(replacementContainsStructuralMarker('just words')).toBe(false);
    });
    it('is false for inline-marker-only replacement', () => {
      expect(replacementContainsStructuralMarker('\\add x\\add*')).toBe(false);
    });
    it('is true when the replacement adds a paragraph marker', () => {
      expect(replacementContainsStructuralMarker('\\p new para')).toBe(true);
    });
    it('is true when the replacement adds a verse marker', () => {
      expect(replacementContainsStructuralMarker('\\v 6 new verse')).toBe(true);
    });
  });

  describe('table markers', () => {
    it('extracts row and cell markers, which isBlockMarker does not recognize', () => {
      // `tr`/`tc#`/`th#` are absent from the shared marker map, so isBlockMarker reports false for
      // them. A table row and cell each begin their own block, so losing one loses structure.
      expect(extractStructuralMarkers('\\tr \\tc1 Abraham \\tc2 became')).toEqual([
        'tr',
        'tc1',
        'tc2',
      ]);
    });

    it('sees a replacement that swallows a cell marker as a structural change', () => {
      expect(usfmChangesStructure('Abraham\\tc2 became', 'Abraham became')).toBe(true);
    });

    it('recognizes the centred and right-aligned cell spellings, including a column span', () => {
      // Driven off the shared markers map rather than a hand-written pattern, so `thc#`/`tcc#`
      // are covered alongside `tc#`/`th#`. The repo's own canonical 3.1 fixture contains `thc3`.
      expect(extractStructuralMarkers('\\thc3 a \\tcc2 b \\thr4 c \\tcr1 d')).toEqual([
        'thc3',
        'tcc2',
        'thr4',
        'tcr1',
      ]);
      expect(extractStructuralMarkers('\\thc3-4 spans two columns')).toEqual(['thc3-4']);
      expect(deletesMarkers('Header\\thc3 centred', 'Header centred')).toBe(true);
    });

    it('recognizes sidebar boundaries', () => {
      // `esb`/`esbe` open and close a block; swallowing one half orphans the other.
      expect(extractStructuralMarkers('\\esb side matter \\esbe')).toEqual(['esb', 'esbe']);
      expect(deletesMarkers('text\\esbe after', 'text after')).toBe(true);
    });
  });

  describe('markersDeletedBy, from a span', () => {
    it('is false when nothing structural is removed', () => {
      expect(deletesMarkers('just words', 'other words')).toBe(false);
    });

    it('is false when the replacement puts the marker back', () => {
      expect(deletesMarkers('\\p one', '\\p two')).toBe(false);
    });

    it('is true when a paragraph marker is dropped', () => {
      expect(deletesMarkers('of Abraham.\\p Abraham became', 'of Abraham. Abraham became')).toBe(
        true,
      );
    });

    it('is true when a table cell marker is dropped', () => {
      expect(deletesMarkers('Abraham\\tc2 became', 'Abraham became')).toBe(true);
    });

    it('is true when a footnote is dropped, though a footnote is not structural', () => {
      // A note does not begin a block, so extractStructuralMarkers ignores it — but a replacement
      // that swallows one destroys authored text with nothing on screen to show for it.
      expect(extractStructuralMarkers('\\f + \\ft note\\f*')).toEqual([]);
      expect(deletesMarkers('earth.\\f + \\ft note\\f* Blessed', 'earth. Blessed')).toBe(true);
    });

    it('counts the extended study-Bible note markers, which the shared map omits', () => {
      expect(deletesMarkers('text\\ef + \\ft note\\ef* after', 'text after')).toBe(true);
      expect(deletesMarkers('text\\ex + \\xt ref\\ex* after', 'text after')).toBe(true);
    });

    it('is false when a marker is added rather than removed', () => {
      // Narrower than usfmChangesStructure on purpose: additions stay a matter of editorial policy
      // and are only refused by the opt-in Simple-mode protection.
      expect(deletesMarkers('one', '\\p one')).toBe(false);
      expect(usfmChangesStructure('one', '\\p one')).toBe(true);
    });

    it('counts duplicates, so dropping one of two identical markers is caught', () => {
      expect(deletesMarkers('\\p a\\p b', '\\p ab')).toBe(true);
    });
  });

  describe('MARKER_DELETION_ERROR', () => {
    it('is a stable sentinel that does not collide with the structure-protection one', () => {
      // Both are substring-matched out of an error message by the Find web view, so neither may
      // contain the other — that, not mere inequality, is what would break the UI's branching.
      expect(MARKER_DELETION_ERROR).toBe('platformScripture.replace.markerDeletion');
      expect(MARKER_DELETION_ERROR.includes(STRUCTURE_PROTECTED_ERROR)).toBe(false);
      expect(STRUCTURE_PROTECTED_ERROR.includes(MARKER_DELETION_ERROR)).toBe(false);
    });
  });

  describe('ONE_ENDED_MARKER_ERROR', () => {
    it('is a stable sentinel that does not collide with the other two', () => {
      // All three are substring-matched out of an error message by the Find web view.
      expect(ONE_ENDED_MARKER_ERROR).toBe('platformScripture.replace.oneEndedMarker');
      [MARKER_DELETION_ERROR, STRUCTURE_PROTECTED_ERROR].forEach((other) => {
        expect(ONE_ENDED_MARKER_ERROR.includes(other)).toBe(false);
        expect(other.includes(ONE_ENDED_MARKER_ERROR)).toBe(false);
      });
    });
  });

  describe('extractGuardedMarkers', () => {
    it.each([
      ['a closing marker, which keeps its star', 'Lord\\nd* God', ['nd*']],
      ['a whole character span', 'the \\nd Lord\\nd* God', ['nd', 'nd*']],
      ['a nested character span, without its plus', 'a \\+nd b\\+nd* c', ['nd', 'nd*']],
      ['a character span with an attribute', 'and \\w bread|pan\\w* and', ['w', 'w*']],
      ['a note and the markers inside it', 'a\\f + \\fr 1:3 \\ft b\\f* c', ['f', 'fr', 'ft', 'f*']],
      ['paired milestones', '\\qt-s |x\\*q\\qt-e\\*', ['qt-s', 'qt-e']],
      ['a milestone that closes itself', 'a\\zms |x\\*b', ['zms\\*']],
      ['a milestone that closes itself at once', 'a\\zms\\*b', ['zms\\*']],
      ['verse and chapter markers, with their numbers', '\\c 2\\p\\v 1 a', ['c:2', 'p', 'v:1']],
      ['a mixed-case custom marker', '\\zAbc word\\zAbc*', ['zAbc', 'zAbc*']],
      ['an optional line break', 'Lord //said', ['//']],
      // USFM separates a marker from its number with ordinary whitespace only. A no-break space is
      // authored text, so what follows it is not the verse number.
      ['a verse marker followed by a no-break space', '\\v\u00a03 text', ['v:']],
      [
        'an optional line break after a literal bar',
        'Lord | God //said \\nd x\\nd*',
        ['nd', 'nd*', '//'],
      ],
      [
        'a slash pair in an attribute as nothing',
        '\\jmp a|href="https://b"\\jmp*',
        ['jmp', 'jmp*'],
      ],
      ['no marker at all', 'just words', []],
    ])('reports %s', (_description, usfm, expected) => {
      expect(extractGuardedMarkers(usfm)).toEqual(expected);
    });
  });

  describe('markersDeletedBy', () => {
    it('counts a verse put back under another number as deleted', () => {
      expect(markersDeletedBy(['v:3'], 'X\\v 9 Y')).toBe(true);
      expect(markersDeletedBy(['v:3'], 'X\\v 3 Y')).toBe(false);
    });
  });

  describe('getMarkerReplaceAction', () => {
    const classify = (matchedUsfm: string, replacement: string, isStructureProtected = false) =>
      getMarkerReplaceAction(
        { matchedUsfm, removedMarkers: extractGuardedMarkers(matchedUsfm) },
        replacement,
        isStructureProtected,
      );

    it.each([
      ['a match with no marker', 'plain words', 'X', 'replace'],
      ['a paragraph break', 'b\n\\p And', 'X', 'confirm'],
      ['a verse', 'c\n\\v 3 Dverse', 'X', 'confirm'],
      ['a whole character span', 'the \\nd Lord\\nd* God', 'X', 'confirm'],
      ['a whole note', 'a\\f + \\ft b\\f* c', 'X', 'confirm'],
      ['a whole custom span', 'a \\zx word\\zx* b', 'X', 'confirm'],
      ['a verse put back under another number', 'c\n\\v 3 Dverse', 'X\\v 9 Y', 'confirm'],
      ['the end of a character style', 'Lord\\nd* God', 'X', 'oneEndedMarker'],
      ['the start of a footnote', 'word\\f + \\fr 1:3', 'X', 'oneEndedMarker'],
      ['the end of a footnote', 'text\\f* in', 'X', 'oneEndedMarker'],
      ['the end of a custom span', 'word\\zx* after', 'X', 'oneEndedMarker'],
      [
        'the start of a custom span its replacement closes',
        'before \\zx word',
        'X\\zx*',
        'oneEndedMarker',
      ],
      ['the start of a cross reference target', '1:1 \\xt Gen', 'X', 'oneEndedMarker'],
      ['the start of a sidebar', 'text\\esb side', 'X', 'oneEndedMarker'],
      ['the end of a sidebar', 'text\\esbe after', 'X', 'oneEndedMarker'],
      ['a whole sidebar', 'a\\esb side\\esbe b', 'X', 'confirm'],
      ['an optional line break', 'Lord //said', 'X', 'confirm'],
      ['the end kept of a whole pair', '\\nd Lord\\nd* God', 'X\\nd*', 'oneEndedMarker'],
      ['the start kept of a whole pair', '\\nd Lord\\nd* God', '\\nd X', 'oneEndedMarker'],
      ['a chapter', 'first\n\\c 2\n\\p\n\\v 1 Next', 'X', 'chapterMarker'],
      ['every marker put back', 'b\n\\p And', 'X\n\\p Y', 'replace'],
      ['the missing end put back', 'Lord\\nd* God', 'X\\nd* Y', 'replace'],
      ['a milestone that closes itself', 'a\\zms |x\\*b', 'X', 'confirm'],
      ['a whole milestone pair', 'a \\qt-s |sid="q1"\\*b\\qt-e |eid="q1"\\* c', 'X', 'confirm'],
      ['the start of a milestone pair', 'a \\qt-s |sid="q1"\\*b', 'X', 'oneEndedMarker'],
      ['the end of a custom milestone pair', 'b\\zaln-e\\* c', 'X', 'oneEndedMarker'],
      ['a marker it does not know', 'a \\unknownmarker b', 'X', 'confirm'],
      ['a whole cross reference', 'a\\x - \\xo 1:1 \\xt Gen\\x* b', 'X', 'confirm'],
      ['a whole extended footnote', 'a\\efe + \\ft x\\efe* b', 'X', 'confirm'],
      [
        'the end of one span and the start of another of the same style',
        'LORD\\nd* said to my \\nd Lord',
        'X',
        'oneEndedMarker',
      ],
      [
        'the end of one word and the start of another',
        'bread|pan\\w* and \\w peace',
        'X',
        'oneEndedMarker',
      ],
      [
        'the end of one footnote and the start of another',
        'one\\f* body \\f + two',
        'X',
        'oneEndedMarker',
      ],
      [
        'a whole pair replaced by a closer and an opener',
        'the \\nd Lord\\nd* God',
        '\\nd* X \\nd',
        'oneEndedMarker',
      ],
      [
        'the end of one span and the start of another, both put back',
        'LORD\\nd* said to my \\nd Lord',
        'X\\nd* Y \\nd Z',
        'replace',
      ],
      [
        'a whole milestone pair whose end has its id as the default attribute',
        'a \\qt-s |sid="q1" who="Pilate"\\*b\\qt-e |q1\\* c',
        'X',
        'confirm',
      ],
      [
        'the end of one chunk and the start of the next',
        '\\ts-e |t1\\*\\ts-s |t2\\*',
        'X',
        'oneEndedMarker',
      ],
      [
        'a whole milestone pair whose start names the speaker as its default attribute',
        'a \\qt-s |Pilate\\*b\\qt-e\\* c',
        'X',
        'confirm',
      ],
    ])('classifies %s', (_description, matchedUsfm, replacement, expected) => {
      expect(classify(matchedUsfm, replacement)).toBe(expected);
    });

    it('pairs a milestone end with its start as the USFM writer spells them', () => {
      const usx = `<usx version="3.1"><book code="MAT" style="id"/><chapter number="1" style="c" sid="MAT 1"/><para style="p"><verse number="1" style="v" sid="MAT 1:1"/>He said <ms style="qt-s" sid="q1" who="Pilate"/>What is truth<ms style="qt-e" eid="q1"/> and left.<verse eid="MAT 1:1"/></para><chapter eid="MAT 1"/></usx>`;
      const usfm = new UsjReaderWriter(usxStringToUsj(usx), {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      }).toUsfm();
      const matchedUsfm = usfm.slice(usfm.indexOf('said'), usfm.indexOf(' left'));
      // The end's id is written bare, as its default attribute.
      expect(matchedUsfm).toContain('\\qt-e |q1\\*');
      expect(classify(matchedUsfm, 'X')).toBe('confirm');
    });

    it('classifies a character span crossing the end of a milestone as one-ended', () => {
      // The `\nd*` is after the match. Ending the quotation does not end the `\nd` opened inside
      // it, so replacing the match would leave that `\nd*` with no opener.
      expect(classify('\\qt-s |sid="q1"\\*Lord \\nd God\\qt-e |eid="q1"\\*', 'X')).toBe(
        'oneEndedMarker',
      );
    });

    it('pairs milestones by id, not just by name', () => {
      // The start of one quotation and the end of another, overlapping it.
      expect(classify('a \\qt-s |sid="q2"\\*b\\qt-e |eid="q1"\\* c', 'X')).toBe('oneEndedMarker');
    });

    it('classifies a replacement that keeps an inner closer of a deleted note as one-ended', () => {
      // Deleting the note and writing `X\fq*` would leave an `\fq*` with no opener.
      expect(classify('a\\f + \\fq quote\\fq* b\\f* c', 'X\\fq*')).toBe('oneEndedMarker');
      expect(classify('a\\f + \\fq quote\\fq* b\\f* c', 'X')).toBe('confirm');
    });

    it.each(['fs', 'wr', 'xtSee', 'xtSeeAlso'])(
      'knows \\%s is paired, though the markers map does not',
      (marker) => {
        expect(classify(`before \\${marker} word`, 'X')).toBe('oneEndedMarker');
        expect(classify(`before \\${marker} word\\${marker}* after`, 'X')).toBe('confirm');
      },
    );

    it('treats a custom marker with no closer in sight as having no other end', () => {
      // Deliberate: see the fallback in `mustMarkerBeClosed`.
      expect(classify('before \\zx word', 'X')).toBe('confirm');
    });

    it('does not refuse a replacement for adding a marker the match did not hold', () => {
      expect(classify('plain words', 'X\\nd*')).toBe('replace');
    });

    it('classifies a structural marker under structure protection as blocked', () => {
      expect(classify('b\n\\p And', 'X', true)).toBe('structureProtected');
      expect(classify('c\n\\v 3 Dverse', 'X', true)).toBe('structureProtected');
    });

    it('still classifies an inline marker under structure protection by what it is', () => {
      expect(classify('Lord\\nd* God', 'X', true)).toBe('oneEndedMarker');
      expect(classify('the \\nd Lord\\nd* God', 'X', true)).toBe('confirm');
    });

    it('treats a result with no reported markers as an ordinary replace', () => {
      expect(getMarkerReplaceAction({ matchedUsfm: 'plain' }, 'X', true)).toBe('replace');
    });
  });

  // computeEffectiveStructureProtection moved to platform-bible-utils; its tests are in
  // lib/platform-bible-utils/src/structure-protection.util.test.ts.
});
