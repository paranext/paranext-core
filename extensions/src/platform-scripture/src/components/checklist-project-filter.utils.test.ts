import { describe, it, expect } from 'vitest';
import type { ProjectSelectorProject } from 'platform-bible-react';
import { filterComparativeProjects, filterPrimaryProjects } from './checklist-project-filter.utils';

const proj = (id: string): ProjectSelectorProject => ({
  id,
  shortName: id,
  fullName: id,
  language: undefined,
});

describe('filterComparativeProjects', () => {
  it('excludes the primary project from the comparative list', () => {
    const all = [proj('A'), proj('B'), proj('C')];
    const result = filterComparativeProjects(all, 'B');
    expect(result.map((p) => p.id)).toEqual(['A', 'C']);
  });

  it('returns all projects when no primary is selected', () => {
    const all = [proj('A'), proj('B')];
    const result = filterComparativeProjects(all, undefined);
    expect(result.map((p) => p.id)).toEqual(['A', 'B']);
  });

  it('returns the full list when the primary id is unknown', () => {
    const all = [proj('A'), proj('B')];
    const result = filterComparativeProjects(all, 'ZZ');
    expect(result.map((p) => p.id)).toEqual(['A', 'B']);
  });
});

describe('filterPrimaryProjects', () => {
  it('excludes every selected comparative from the primary list', () => {
    const all = [proj('A'), proj('B'), proj('C'), proj('D')];
    const result = filterPrimaryProjects(all, ['B', 'D']);
    expect(result.map((p) => p.id)).toEqual(['A', 'C']);
  });

  it('returns the full list when no comparatives are selected', () => {
    const all = [proj('A'), proj('B')];
    const result = filterPrimaryProjects(all, []);
    expect(result.map((p) => p.id)).toEqual(['A', 'B']);
  });

  it('treats an unknown comparative id as a no-op', () => {
    const all = [proj('A'), proj('B')];
    const result = filterPrimaryProjects(all, ['ZZ']);
    expect(result.map((p) => p.id)).toEqual(['A', 'B']);
  });

  it('handles duplicate comparative ids without crashing', () => {
    const all = [proj('A'), proj('B')];
    const result = filterPrimaryProjects(all, ['A', 'A']);
    expect(result.map((p) => p.id)).toEqual(['B']);
  });
});
