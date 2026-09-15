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

    it('recognizes the extended study-Bible variants the map omits', () => {
      expect(isNoteMarker('ef')).toBe(true);
      expect(isNoteMarker('ex')).toBe(true);
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
  });
});
