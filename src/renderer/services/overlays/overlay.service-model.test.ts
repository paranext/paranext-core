import { describe, it, expect } from 'vitest';
import { CommandPaletteItem, filterPaletteItems } from './overlay.service-model';

describe('filterPaletteItems', () => {
  describe('passive mode (bare-marker prefix matching)', () => {
    const items: CommandPaletteItem[] = [
      { id: 'ft', label: 'ft' },
      { id: 'fig', label: 'fig' },
      { id: 'xt', label: 'xt' },
      { id: 'plus-w', label: '+w' },
    ];

    it('should return all items for undefined or empty filter text', () => {
      expect(filterPaletteItems(items, undefined, 'passive')).toEqual(items);
      expect(filterPaletteItems(items, '', 'passive')).toEqual(items);
    });

    it('should prefix-match labels', () => {
      expect(filterPaletteItems(items, 'f', 'passive').map((i) => i.id)).toEqual(['ft', 'fig']);
      expect(filterPaletteItems(items, 'fi', 'passive').map((i) => i.id)).toEqual(['fig']);
      expect(filterPaletteItems(items, 'zzz', 'passive')).toEqual([]);
    });

    it('should not match label substrings that are not prefixes', () => {
      // 't' appears inside 'ft' and 'xt' but starts neither — prefix semantics, not containment
      expect(filterPaletteItems(items, 't', 'passive')).toEqual([]);
    });

    it('should match case-insensitively (custom markers may be capitalized)', () => {
      expect(filterPaletteItems(items, 'F', 'passive').map((i) => i.id)).toEqual(['ft', 'fig']);
      const capitalizedItems: CommandPaletteItem[] = [{ id: 'zPa', label: 'zPa' }];
      expect(filterPaletteItems(capitalizedItems, 'zpa', 'passive').map((i) => i.id)).toEqual([
        'zPa',
      ]);
    });

    it('should strip a leading + from the filter text before matching', () => {
      expect(filterPaletteItems(items, '+f', 'passive').map((i) => i.id)).toEqual(['ft', 'fig']);
    });

    it('should not match description or badge text', () => {
      const describedItems: CommandPaletteItem[] = [
        { id: 'ft', label: 'ft', description: 'Footnote text', badge: 'end' },
      ];
      expect(filterPaletteItems(describedItems, 'Foot', 'passive')).toEqual([]);
      expect(filterPaletteItems(describedItems, 'end', 'passive')).toEqual([]);
    });
  });

  describe('active mode (case-insensitive containment over label, description, and badge)', () => {
    const items: CommandPaletteItem[] = [
      { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
      { id: 'q1', label: 'Poetry Line 1 (q1)', description: 'First level poetry' },
      { id: 'pro', label: 'Pronoun (pro)', badge: 'Deprecated' },
    ];

    it('should return all items for undefined or empty filter text', () => {
      expect(filterPaletteItems(items, undefined, 'active')).toEqual(items);
      expect(filterPaletteItems(items, '', 'active')).toEqual(items);
    });

    it('should match anywhere in the label, case-insensitively', () => {
      expect(filterPaletteItems(items, 'paragraph', 'active').map((i) => i.id)).toEqual(['p']);
      expect(filterPaletteItems(items, 'Line 1', 'active').map((i) => i.id)).toEqual(['q1']);
    });

    it('should match description text', () => {
      expect(filterPaletteItems(items, 'Normal', 'active').map((i) => i.id)).toEqual(['p']);
      expect(filterPaletteItems(items, 'first level', 'active').map((i) => i.id)).toEqual(['q1']);
    });

    it('should match badge text', () => {
      expect(filterPaletteItems(items, 'deprecated', 'active').map((i) => i.id)).toEqual(['pro']);
    });

    it('should require containment, not fuzzy subsequence matching', () => {
      // cmdk's fuzzy scoring would match 'pgh' across 'ParaGrapH'; plain containment must not —
      // the host commit resolves from this same filter, so display and commit must agree
      expect(filterPaletteItems(items, 'pgh', 'active')).toEqual([]);
    });

    it('should return no items when nothing matches', () => {
      expect(filterPaletteItems(items, 'zzz', 'active')).toEqual([]);
    });
  });
});
