import { describe, it, expect } from 'vitest';
import {
  collapseUsfmMarkersForDisplay,
  isNoteMarker,
  isStructuralMarker,
} from './usfm-tokens.util';

describe('usfm-tokens.util', () => {
  describe('isStructuralMarker', () => {
    it('recognizes paragraph, verse, and chapter markers', () => {
      expect(isStructuralMarker('p')).toBe(true);
      expect(isStructuralMarker('q1')).toBe(true);
      expect(isStructuralMarker('s1')).toBe(true);
      expect(isStructuralMarker('v')).toBe(true);
      expect(isStructuralMarker('c')).toBe(true);
    });

    it('recognizes table rows and every cell spelling, which the usfmMarkers map omits', () => {
      expect(isStructuralMarker('tr')).toBe(true);
      expect(isStructuralMarker('tc1')).toBe(true);
      expect(isStructuralMarker('th1')).toBe(true);
      // The centred and right-aligned variants are what a hand-written `t[hc]r?\d+` pattern
      // misses; the repo's canonical 3.1 fixture contains `thc3`.
      expect(isStructuralMarker('thc3')).toBe(true);
      expect(isStructuralMarker('tcc2')).toBe(true);
      expect(isStructuralMarker('thr4')).toBe(true);
      expect(isStructuralMarker('tcr1')).toBe(true);
    });

    it('recognizes a cell marker carrying a column span', () => {
      expect(isStructuralMarker('thc3-4')).toBe(true);
      expect(isStructuralMarker('tc1-2')).toBe(true);
    });

    it('recognizes sidebar boundaries', () => {
      expect(isStructuralMarker('esb')).toBe(true);
      expect(isStructuralMarker('esbe')).toBe(true);
    });

    it('recognizes the paragraph markers the usfmMarkers list omits but the shared map types', () => {
      // The engine treats any `para` node as a block ancestor, so a boundary match across one of
      // these is real. Were they missed here, the deletion guard would report no removed markers
      // and the break would be deleted with Replace still enabled.
      expect(isStructuralMarker('ph')).toBe(true);
      expect(isStructuralMarker('ph1')).toBe(true);
      expect(isStructuralMarker('ph3')).toBe(true);
      expect(isStructuralMarker('p1')).toBe(true);
      expect(isStructuralMarker('p2')).toBe(true);
      expect(isStructuralMarker('k1')).toBe(true);
      expect(isStructuralMarker('k2')).toBe(true);
    });

    it('is false for character markers, notes, and unknown codes', () => {
      expect(isStructuralMarker('bd')).toBe(false);
      expect(isStructuralMarker('nd')).toBe(false);
      expect(isStructuralMarker('w')).toBe(false);
      expect(isStructuralMarker('f')).toBe(false);
      expect(isStructuralMarker('ft')).toBe(false);
      expect(isStructuralMarker('notamarker')).toBe(false);
      expect(isStructuralMarker('')).toBe(false);
    });
  });

  describe('isNoteMarker', () => {
    it('recognizes the note markers the shared map types as notes', () => {
      expect(isNoteMarker('f')).toBe(true);
      expect(isNoteMarker('fe')).toBe(true);
      expect(isNoteMarker('x')).toBe(true);
    });

    it('recognizes every extended study-Bible variant the map types as a note', () => {
      expect(isNoteMarker('ef')).toBe(true);
      expect(isNoteMarker('ex')).toBe(true);
      // `efe` is the one a hand-written `/^e[fx]$/` exception missed.
      expect(isNoteMarker('efe')).toBe(true);
    });

    it('is false for note content markers and for block markers', () => {
      // `ft`/`xt` are genuine character markers inside a note, not the note itself.
      expect(isNoteMarker('ft')).toBe(false);
      expect(isNoteMarker('xt')).toBe(false);
      expect(isNoteMarker('p')).toBe(false);
    });
  });

  describe('collapseUsfmMarkersForDisplay', () => {
    it('leaves text with no markers exactly as it is, spacing included', () => {
      expect(collapseUsfmMarkersForDisplay('plain text')).toBe('plain text');
      expect(collapseUsfmMarkersForDisplay('double  spaced  text')).toBe('double  spaced  text');
    });

    it('removes a verse marker together with its number', () => {
      // The flagship case: a match running from one paragraph into the next. Stripping the marker
      // token alone would leave the verse number behind as stray body text.
      expect(collapseUsfmMarkersForDisplay('of Abraham.\r\n\\p\r\n\\v 2 Abraham became')).toBe(
        'of Abraham. Abraham became',
      );
    });

    it('removes a chapter marker together with its number', () => {
      expect(collapseUsfmMarkersForDisplay('end.\r\n\\c 3\r\n\\p\r\n\\v 1 Start')).toBe(
        'end. Start',
      );
    });

    it('removes a whole note, including its caller and content', () => {
      expect(collapseUsfmMarkersForDisplay('earth.\\f + \\ft note\\f* Blessed')).toBe(
        'earth. Blessed',
      );
    });

    it('keeps a character marker’s text but drops its attributes', () => {
      expect(collapseUsfmMarkersForDisplay('by \\w grace|grace\\w* you')).toBe('by grace you');
    });

    it('removes a table cell marker, column span and all', () => {
      expect(collapseUsfmMarkersForDisplay('Abraham\\tc2 became')).toBe('Abraham became');
      expect(collapseUsfmMarkersForDisplay('Abraham\\thc3-4 became')).toBe('Abraham became');
    });

    it('handles a marker run at the very start of the span', () => {
      expect(collapseUsfmMarkersForDisplay('\\p\r\n\\v 4 Abraham')).toBe(' Abraham');
    });

    it('drops an orphan note closer without swallowing the text up to the next note', () => {
      // Every match inside a note has an orphan `\f*` at the start of its after-context. Treating
      // that closer as an opener made the lazy note scan run to the *following* note's closer and
      // delete the verses in between — from the card and from "Copy verse text" alike.
      expect(
        collapseUsfmMarkersForDisplay(
          ' here\\f*, and by grace, Mr. Smith said he asked.\r\n\\p\r\n\\v 2 Blessed is he\\f + \\ft second note\\f* who reads.',
        ),
      ).toBe(', and by grace, Mr. Smith said he asked. Blessed is he who reads.');
    });

    it('drops a note the slice cut in half, from either end', () => {
      // A before-context that runs into a note leaks its caller (`house + `); an after-context
      // that begins inside one leaks the tail of its content. Neither is verse text.
      expect(collapseUsfmMarkersForDisplay('the house\\f + \\ft a note')).toBe('the house');
      expect(collapseUsfmMarkersForDisplay('rest of the note\\f* and the house')).toBe(
        ' and the house',
      );
    });

    it('closes a note whose marker is a longer name than one it starts with', () => {
      // `fe` and `efe` have to be tried before `f` and `ef`, or the backreference looks for a
      // closer that is not there and the scan falls through to the marker pass.
      expect(collapseUsfmMarkersForDisplay('end\\fe + \\ft endnote\\fe* here')).toBe('end here');
      expect(collapseUsfmMarkersForDisplay('end\\efe + \\ft extended\\efe* here')).toBe('end here');
    });

    it('leaves no space where the editor shows none', () => {
      // A character marker is not a break: `\nd LORD\nd*’s` reads `LORD’s`, so collapsing the
      // marker to a space would insert punctuation spacing the editor never shows.
      expect(collapseUsfmMarkersForDisplay('The \\nd Lord\\nd*’s house')).toBe('The Lord’s house');
      expect(collapseUsfmMarkersForDisplay('house\\f + \\ft note\\f*, and')).toBe('house, and');
    });

    it('removes a milestone, its attributes, and its bare closer', () => {
      expect(collapseUsfmMarkersForDisplay('said \\qt-s |sid="q1" who="Pilate"\\*“Are you')).toBe(
        'said “Are you',
      );
      expect(collapseUsfmMarkersForDisplay('done\\qt-e |eid="q1"\\* and')).toBe('done and');
    });

    it('preserves authored non-breaking spaces in a span that also holds a marker', () => {
      // These are exactly the characters "show invisible characters" exists to display, so a
      // blanket `\s` collapse would erase the thing the user is looking at.
      expect(collapseUsfmMarkersForDisplay('a\u00A0b\r\n\\p\r\nc\u202Fd')).toBe(
        'a\u00A0b c\u202Fd',
      );
    });

    it('leaves the author’s own spacing alone outside a collapsed marker', () => {
      expect(collapseUsfmMarkersForDisplay('two  spaces \\nd here\\nd* and  two  more')).toBe(
        'two  spaces here and  two  more',
      );
    });
  });
});
