import { describe, it, expect } from 'vitest';
import {
  MARKER_DELETION_ERROR,
  STRUCTURE_PROTECTED_ERROR,
  extractStructuralMarkers,
  usfmChangesStructure,
  usfmDeletesMarkers,
  replacementContainsStructuralMarker,
} from './structure-protection.util';

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
  });

  describe('usfmDeletesMarkers', () => {
    it('is false when nothing structural is removed', () => {
      expect(usfmDeletesMarkers('just words', 'other words')).toBe(false);
    });

    it('is false when the replacement puts the marker back', () => {
      expect(usfmDeletesMarkers('\\p one', '\\p two')).toBe(false);
    });

    it('is true when a paragraph marker is dropped', () => {
      expect(
        usfmDeletesMarkers('of Abraham.\\p Abraham became', 'of Abraham. Abraham became'),
      ).toBe(true);
    });

    it('is true when a table cell marker is dropped', () => {
      expect(usfmDeletesMarkers('Abraham\\tc2 became', 'Abraham became')).toBe(true);
    });

    it('is true when a footnote is dropped, though a footnote is not structural', () => {
      // A note does not begin a block, so extractStructuralMarkers ignores it — but a replacement
      // that swallows one destroys authored text with nothing on screen to show for it.
      expect(extractStructuralMarkers('\\f + \\ft note\\f*')).toEqual([]);
      expect(usfmDeletesMarkers('earth.\\f + \\ft note\\f* Blessed', 'earth. Blessed')).toBe(true);
    });

    it('is false when a marker is added rather than removed', () => {
      // Narrower than usfmChangesStructure on purpose: additions stay a matter of editorial policy
      // and are only refused by the opt-in Simple-mode protection.
      expect(usfmDeletesMarkers('one', '\\p one')).toBe(false);
      expect(usfmChangesStructure('one', '\\p one')).toBe(true);
    });

    it('counts duplicates, so dropping one of two identical markers is caught', () => {
      expect(usfmDeletesMarkers('\\p a\\p b', '\\p ab')).toBe(true);
    });
  });

  describe('MARKER_DELETION_ERROR', () => {
    it('is a distinct sentinel from STRUCTURE_PROTECTED_ERROR', () => {
      // The UI branches on these two separately to show different messages.
      expect(MARKER_DELETION_ERROR).not.toBe(STRUCTURE_PROTECTED_ERROR);
    });
  });

  // computeEffectiveStructureProtection moved to platform-bible-utils; its tests are in
  // lib/platform-bible-utils/src/structure-protection.util.test.ts.
});
