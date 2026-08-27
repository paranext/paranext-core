import { describe, expect, it } from 'vitest';
import { filterAndRankPaletteItems } from './marker-palette-filter.util';

// Fixtures mirror the library's real context-ordered offers (basic markers first), where the
// exact match is deliberately NOT first — the shape that produced the wrong-marker commits
// (`\f` + Space resolving `fk` in note content) and the buried exact match (`w` ranked 9th).
const noteContextItems = [
  { id: 'fk', label: 'fk' },
  { id: 'fq', label: 'fq' },
  { id: 'fr', label: 'fr' },
  { id: 'ft', label: 'ft' },
  { id: 'nd', label: 'nd' },
  { id: 'f', label: 'f' },
  { id: 'fdc', label: 'fdc' },
];

const characterItems = [
  { id: 'qt', label: 'qt', description: 'Quoted text - Old Testament quotations' },
  { id: 'addpn', label: 'addpn', description: 'Chinese words to be dot underlined and underlined' },
  { id: 'w', label: 'w', description: 'A wordlist entry' },
  { id: 'wa', label: 'wa', description: 'Aramaic word' },
  { id: 'wj', label: 'wj', description: 'Words of Jesus' },
  { id: 'nd', label: 'nd', description: 'Name of God' },
];

describe('filterAndRankPaletteItems', () => {
  it('returns the items in their original (context) order for an empty or undefined filter', () => {
    // The unfiltered offer keeps the library's PT9-derived basic-first order — ranking must not
    // alphabetize a list nobody has filtered.
    expect(filterAndRankPaletteItems(noteContextItems, undefined, 'passive')).toEqual(
      noteContextItems,
    );
    expect(filterAndRankPaletteItems(noteContextItems, '', 'active')).toEqual(noteContextItems);
  });

  describe('passive mode (bare-marker prefix matching, exact first)', () => {
    it('ranks the exact match first even when prefix-mates precede it in context order', () => {
      // The `\f` + Space flow resolves index 0 of this list — before ranking it was `fk`. The
      // remaining prefix-mates keep their PT9-derived context order (stable sort).
      const filtered = filterAndRankPaletteItems(noteContextItems, 'f', 'passive');
      expect(filtered[0]?.label).toBe('f');
      expect(filtered.map((item) => item.label)).toEqual(['f', 'fk', 'fq', 'fr', 'ft', 'fdc']);
    });

    it('still prefix-matches only (no containment, no description matching)', () => {
      const filtered = filterAndRankPaletteItems(noteContextItems, 'd', 'passive');
      expect(filtered).toEqual([]);
    });

    it('strips a leading + from the filter text before matching', () => {
      const filtered = filterAndRankPaletteItems(characterItems, '+w', 'passive');
      expect(filtered.map((item) => item.label)).toEqual(['w', 'wa', 'wj']);
    });

    it('strips a leading + from item LABELS too — nested close-tag entries stay in the list', () => {
      // The editor package's closeTagItems emits `+wj*` for every open char span except the
      // outermost, so close-tag labels DO carry the nesting prefix. A `w` (or `+w`) query must
      // keep them; ranking on the raw label keeps the plain markers ahead of the closer.
      const nestedItems = [
        { id: 'close-wj', label: '+wj*' },
        { id: 'w', label: 'w' },
        { id: 'wj', label: 'wj' },
      ];
      expect(filterAndRankPaletteItems(nestedItems, 'w', 'passive').map((i) => i.label)).toEqual([
        'w',
        'wj',
        '+wj*',
      ]);
      expect(filterAndRankPaletteItems(nestedItems, '+w', 'passive').map((i) => i.label)).toEqual([
        'w',
        'wj',
        '+wj*',
      ]);
    });

    it('matches case-insensitively (custom markers may be capitalized)', () => {
      const capitalized = [
        { id: 'Fig', label: 'Fig' },
        { id: 'f', label: 'f' },
      ];
      const filtered = filterAndRankPaletteItems(capitalized, 'fi', 'passive');
      expect(filtered.map((item) => item.label)).toEqual(['Fig']);
    });
  });

  describe('active mode (label-only containment, exact > startsWith > contains)', () => {
    it('ranks the exact match first — never buried behind description matches', () => {
      // The measured symptom: typing `w` surfaced qt/addpn/... via DESCRIPTION containment and
      // ranked the exact `w` 9th. Matching is label-only now, identical to the editor palette
      // (`NodeSelectionMenu` filters on the marker name).
      const filtered = filterAndRankPaletteItems(characterItems, 'w', 'active');
      expect(filtered[0]?.label).toBe('w');
      // Prefix matches follow the exact match; description-only matches are gone entirely.
      expect(filtered.map((item) => item.label)).toEqual(['w', 'wa', 'wj']);
    });

    it('does not match description text (label-only, editor-palette parity)', () => {
      const filtered = filterAndRankPaletteItems(characterItems, 'jesus', 'active');
      expect(filtered).toEqual([]);
    });

    it('ranks containment matches after prefix matches', () => {
      const filtered = filterAndRankPaletteItems(noteContextItems, 'd', 'active');
      // No label starts with 'd'; the two containment matches ('nd', 'fdc', both at position 1)
      // tie on match position and keep their context order (stable sort).
      expect(filtered.map((item) => item.label)).toEqual(['nd', 'fdc']);
    });

    it('matches case-insensitively', () => {
      const filtered = filterAndRankPaletteItems(characterItems, 'W', 'active');
      expect(filtered[0]?.label).toBe('w');
    });

    it('strips a leading + from the filter and item labels — a `+w` query matches a `+wj*` closer', () => {
      const nestedItems = [
        { id: 'close-wj', label: '+wj*' },
        { id: 'w', label: 'w' },
        { id: 'nd', label: 'nd' },
      ];
      expect(filterAndRankPaletteItems(nestedItems, '+w', 'active').map((i) => i.label)).toEqual([
        'w',
        '+wj*',
      ]);
      expect(filterAndRankPaletteItems(nestedItems, 'w', 'active').map((i) => i.label)).toEqual([
        'w',
        '+wj*',
      ]);
    });
  });
});
