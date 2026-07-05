import { describe, it, expect } from 'vitest';
import { CommandPaletteItem, filterPaletteItems } from './overlay.service-model';

describe('filterPaletteItems', () => {
  const items: CommandPaletteItem[] = [
    { id: 'ft', label: 'ft' },
    { id: 'fig', label: 'fig' },
    { id: 'xt', label: 'xt' },
    { id: 'plus-w', label: '+w' },
  ];

  it('should return all items for undefined or empty filter text', () => {
    expect(filterPaletteItems(items, undefined)).toEqual(items);
    expect(filterPaletteItems(items, '')).toEqual(items);
  });

  it('should prefix-match labels', () => {
    expect(filterPaletteItems(items, 'f').map((i) => i.id)).toEqual(['ft', 'fig']);
    expect(filterPaletteItems(items, 'fi').map((i) => i.id)).toEqual(['fig']);
    expect(filterPaletteItems(items, 'zzz')).toEqual([]);
  });

  it('should match ordinally (case-sensitive), like PT9 StringComparison.Ordinal', () => {
    // "F" must NOT match label "ft" — PT9's MarkerDropdownControl filters with ordinal comparison
    expect(filterPaletteItems(items, 'F')).toEqual([]);
  });

  it('should strip a leading + from the filter text before matching', () => {
    expect(filterPaletteItems(items, '+f').map((i) => i.id)).toEqual(['ft', 'fig']);
  });
});
