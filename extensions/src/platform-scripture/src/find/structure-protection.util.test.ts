import { describe, it, expect } from 'vitest';
import {
  STRUCTURE_PROTECTED_ERROR,
  isStructuralMarker,
  extractStructuralMarkers,
  usfmChangesStructure,
  replacementContainsStructuralMarker,
  computeEffectiveStructureProtection,
} from './structure-protection.util';

describe('structure-protection.util', () => {
  describe('STRUCTURE_PROTECTED_ERROR', () => {
    it('is a stable non-empty sentinel string', () => {
      expect(typeof STRUCTURE_PROTECTED_ERROR).toBe('string');
      expect(STRUCTURE_PROTECTED_ERROR.length).toBeGreaterThan(0);
      expect(STRUCTURE_PROTECTED_ERROR).toBe('platformScripture.replace.structureProtected');
    });
  });

  describe('isStructuralMarker', () => {
    it('treats paragraph markers as structural', () => {
      expect(isStructuralMarker('p')).toBe(true);
      expect(isStructuralMarker('q1')).toBe(true);
      expect(isStructuralMarker('s1')).toBe(true);
    });
    it('treats verse and chapter markers as structural', () => {
      expect(isStructuralMarker('v')).toBe(true);
      expect(isStructuralMarker('c')).toBe(true);
    });
    it('does not treat inline/character markers as structural', () => {
      expect(isStructuralMarker('add')).toBe(false);
      expect(isStructuralMarker('w')).toBe(false);
      expect(isStructuralMarker('nd')).toBe(false);
    });
    it('returns false for unknown markers', () => {
      expect(isStructuralMarker('definitelyNotAMarker')).toBe(false);
    });
  });

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

  describe('computeEffectiveStructureProtection', () => {
    // Parity with use-structure-protection-state.hook.ts truth table.
    it('is inactive (false) in power mode regardless of other inputs', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: 'power',
          isAdminProtected: true,
          canAdminToggle: false,
          userSetting: true,
        }),
      ).toBe(false);
    });
    it('is inactive (false) when interfaceMode is undefined', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: undefined,
          isAdminProtected: true,
          canAdminToggle: false,
          userSetting: undefined,
        }),
      ).toBe(false);
    });
    it('defaults to protected in simple mode when user setting is absent', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: 'simple',
          isAdminProtected: false,
          canAdminToggle: false,
          userSetting: undefined,
        }),
      ).toBe(true);
    });
    it('admin lock forces protection for a non-admin user', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: 'simple',
          isAdminProtected: true,
          canAdminToggle: false,
          userSetting: false,
        }),
      ).toBe(true);
    });
    it('admin who can toggle is governed by their own user setting, not the project lock', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: 'simple',
          isAdminProtected: true,
          canAdminToggle: true,
          userSetting: false,
        }),
      ).toBe(false);
    });
    it('follows the user setting when the project allows changes', () => {
      expect(
        computeEffectiveStructureProtection({
          interfaceMode: 'simple',
          isAdminProtected: false,
          canAdminToggle: false,
          userSetting: false,
        }),
      ).toBe(false);
    });
  });
});
