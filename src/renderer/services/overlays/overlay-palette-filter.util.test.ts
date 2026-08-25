import { describe, it, expect } from 'vitest';
import { CommandPaletteItem } from './overlay.service-model';
import { filterPaletteItems } from './overlay-palette-filter.util';

describe('filterPaletteItems', () => {
  describe('passive mode (bare-marker prefix matching, exact match first)', () => {
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

    it('should rank the exact match first even when prefix-mates precede it in context order', () => {
      // The library's context-ordered offers put basic markers first, so the exact match can sit
      // deep in the prefix-filtered list (measured: note content offered [fk, fq, fr, ft, ...]
      // and `\f` + Space committed `fk`). Ranking is the editor palette's filterAndRankItems:
      // exact first, remaining matches keeping their context order.
      const noteContextItems: CommandPaletteItem[] = [
        { id: 'fk', label: 'fk' },
        { id: 'fq', label: 'fq' },
        { id: 'fr', label: 'fr' },
        { id: 'ft', label: 'ft' },
        { id: 'f', label: 'f' },
      ];
      expect(filterPaletteItems(noteContextItems, 'f', 'passive').map((i) => i.id)).toEqual([
        'f',
        'fk',
        'fq',
        'fr',
        'ft',
      ]);
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

  describe('active mode (label-only containment, exact match first)', () => {
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

    it('should rank an exact label match first, never buried under containment matches', () => {
      // The measured symptom: a marker palette's typed `w` ranked the exact `w` 9th because
      // description hits (qt, addpn, ...) filled the list in context order. Label-only matching
      // + exact-first ranking — identical to the editor palette — is the fix.
      const markerItems: CommandPaletteItem[] = [
        { id: 'qt', label: 'qt', description: 'Quoted text - Old Testament quotations' },
        { id: 'wj', label: 'wj', description: 'Words of Jesus' },
        { id: 'w', label: 'w', description: 'A wordlist entry' },
        { id: 'wa', label: 'wa', description: 'Aramaic word' },
      ];
      expect(filterPaletteItems(markerItems, 'w', 'active').map((i) => i.id)).toEqual([
        'w',
        'wj',
        'wa',
      ]);
    });

    it('should NOT match description text (label-only, editor-palette parity)', () => {
      // Owner-directed change: description containment is what buried exact marker matches (the
      // "w ranked 9th" report). Matching is label-only now, identical to the editor palette's
      // filterAndRankItems over the marker name.
      expect(filterPaletteItems(items, 'Normal', 'active')).toEqual([]);
      expect(filterPaletteItems(items, 'first level', 'active')).toEqual([]);
    });

    it('should NOT match badge text (label-only, editor-palette parity)', () => {
      expect(filterPaletteItems(items, 'deprecated', 'active')).toEqual([]);
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
