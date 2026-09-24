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

    it('should not match description or badge text, whatever searchFields says', () => {
      const describedItems: CommandPaletteItem[] = [
        { id: 'ft', label: 'ft', description: 'Footnote text', badge: 'end' },
      ];
      // Default searchFields: passive stays label-prefix-only (PT9 marker-dropdown semantics)
      expect(filterPaletteItems(describedItems, 'Foot', 'passive')).toEqual([]);
      expect(filterPaletteItems(describedItems, 'end', 'passive')).toEqual([]);
      // An explicit searchFields does not change the passive contract either
      expect(
        filterPaletteItems(describedItems, 'Foot', 'passive', ['label', 'description', 'badge']),
      ).toEqual([]);
    });
  });

  describe('active mode (containment over searchFields, label matches ranked exact-first)', () => {
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

    it('should by default match description text (general command palettes search all visible text)', () => {
      // The default restores the pre-label-only union (label + description + badge): generic
      // command palettes rely on finding a command by a word from its description.
      expect(filterPaletteItems(items, 'Normal', 'active').map((i) => i.id)).toEqual(['p']);
      expect(filterPaletteItems(items, 'first level', 'active').map((i) => i.id)).toEqual(['q1']);
    });

    it('should by default match badge text', () => {
      expect(filterPaletteItems(items, 'deprecated', 'active').map((i) => i.id)).toEqual(['pro']);
    });

    it('should rank an exact label match first — description hits follow, never bury it', () => {
      // The measured symptom: a marker palette's typed `w` ranked the exact `w` 9th because
      // description hits (qt, addpn, ...) filled the list in context order. Even under the
      // default field union, LABEL matches come first (exact-first, the editor palette's
      // ranking); items matching only by description trail in their original order.
      const markerItems: CommandPaletteItem[] = [
        { id: 'qt', label: 'qt', description: 'Quotation with words of the prophets' },
        { id: 'wj', label: 'wj', description: 'Words of Jesus' },
        { id: 'w', label: 'w', description: 'A wordlist entry' },
        { id: 'wa', label: 'wa', description: 'Aramaic word' },
      ];
      expect(filterPaletteItems(markerItems, 'w', 'active').map((i) => i.id)).toEqual([
        'w',
        'wj',
        'wa',
        // description-only hit ("words of the prophets") trails the label matches
        'qt',
      ]);
    });

    it("should pin label-only matching for searchFields: ['label'] (marker palettes)", () => {
      // Marker palettes opt into label-only so an exact typed marker can never be buried under —
      // or even followed by — items whose descriptions contain the typed text.
      expect(filterPaletteItems(items, 'Normal', 'active', ['label'])).toEqual([]);
      expect(filterPaletteItems(items, 'first level', 'active', ['label'])).toEqual([]);
      expect(filterPaletteItems(items, 'deprecated', 'active', ['label'])).toEqual([]);
      const markerItems: CommandPaletteItem[] = [
        { id: 'qt', label: 'qt', description: 'Quotation with words of the prophets' },
        { id: 'wj', label: 'wj', description: 'Words of Jesus' },
        { id: 'w', label: 'w', description: 'A wordlist entry' },
      ];
      expect(filterPaletteItems(markerItems, 'w', 'active', ['label']).map((i) => i.id)).toEqual([
        'w',
        'wj',
      ]);
    });

    it("should not match labels when searchFields excludes 'label' — every leg is field-gated", () => {
      // 'Pronoun' hits only the pro item's LABEL; a request searching descriptions must not get it
      expect(filterPaletteItems(items, 'Pronoun', 'active', ['description'])).toEqual([]);
      expect(filterPaletteItems(items, 'Line', 'active', ['description', 'badge'])).toEqual([]);
      // The declared fields still match on the same request
      expect(
        filterPaletteItems(items, 'Normal', 'active', ['description']).map((i) => i.id),
      ).toEqual(['p']);
      // And the empty filter still returns everything, whatever the fields say
      expect(filterPaletteItems(items, '', 'active', ['description'])).toEqual(items);
    });

    it('should strip the + nesting prefix on the description/badge leg, like the label leg', () => {
      // The legs must match the same typed text: '+normal' names the same query as 'normal'
      expect(filterPaletteItems(items, '+normal', 'active').map((i) => i.id)).toEqual(['p']);
      expect(filterPaletteItems(items, '+deprecated', 'active').map((i) => i.id)).toEqual(['pro']);
    });

    it('should require containment, not fuzzy subsequence matching', () => {
      // cmdk's fuzzy scoring would match 'pgh' across 'ParaGrapH'; plain containment must not —
      // the host commit resolves from this same filter, so display and commit must agree
      expect(filterPaletteItems(items, 'pgh', 'active')).toEqual([]);
    });

    it('should match a multi-word query whose tokens span label and description', () => {
      // "insert foot" appears in no single field of "Insert footnote", but every token is
      // contained somewhere among the searched fields — the multi-word affordance general command
      // palettes rely on. Token matches trail whole-phrase matches.
      const commandItems: CommandPaletteItem[] = [
        { id: 'insert-footnote', label: 'Insert footnote', description: 'Adds a footnote' },
        { id: 'insert-xref', label: 'Insert cross reference', description: 'Adds a reference' },
        { id: 'find', label: 'Find', description: 'Search the text' },
      ];
      expect(filterPaletteItems(commandItems, 'insert foot', 'active').map((i) => i.id)).toEqual([
        'insert-footnote',
      ]);
      // Tokens may match DIFFERENT fields: 'search' is description-only, 'find' is label-only.
      expect(filterPaletteItems(commandItems, 'search find', 'active').map((i) => i.id)).toEqual([
        'find',
      ]);
      // Every token must match — one stray token refuses the item.
      expect(filterPaletteItems(commandItems, 'insert zzz', 'active')).toEqual([]);
    });

    it('should keep whole-phrase matches ahead of token-only matches', () => {
      const commandItems: CommandPaletteItem[] = [
        { id: 'token-only', label: 'Insert bold footnote', description: '' },
        { id: 'phrase', label: 'A insert foot pedal', description: '' },
      ];
      expect(filterPaletteItems(commandItems, 'insert foot', 'active').map((i) => i.id)).toEqual([
        'phrase',
        'token-only',
      ]);
    });

    it('should return no items when nothing matches', () => {
      expect(filterPaletteItems(items, 'zzz', 'active')).toEqual([]);
    });
  });
});
