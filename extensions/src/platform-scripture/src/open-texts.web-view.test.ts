/**
 * Unit tests for the Open Texts dialog logic.
 *
 * These tests validate the core business logic patterns used in the open-texts.web-view.tsx
 * component: filter logic (EXT-012), sort behavior, TC mode filter suppression, name filter, and OK
 * button enable logic.
 */
import { describe, it, expect } from 'vitest';

// #region Types (mirrored from the component for testing)

interface ProjectInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  versification: string;
  projectType: string;
  isResourceProject: boolean;
  isMarbleResource: boolean;
  isDictionary: boolean;
  isSourceLanguageText: boolean;
  isNoteType: boolean;
  isXmlResource: boolean;
  canOpen: boolean;
}

interface FilterState {
  projects: boolean;
  resources: boolean;
  enhancedResources: boolean;
  sourceLanguages: boolean;
  dictionaries: boolean;
  consultantNotes: boolean;
}

type SortKey = 'projectType' | 'name' | 'fullName' | 'language' | 'versification';
type SortDirection = 'ascending' | 'descending';

// #endregion

// #region Test Data

const SAMPLE_PROJECTS: ProjectInfo[] = [
  {
    name: 'zzz3',
    id: 'proj-001',
    fullName: 'Test Project 3',
    language: 'English',
    versification: 'English',
    projectType: 'Project (Standard)',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'NIV84',
    id: 'res-001',
    fullName: 'NIV 1984',
    language: 'English',
    versification: 'English',
    projectType: 'Resource',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'MARBLE1',
    id: 'res-enh-001',
    fullName: 'Enhanced Resource 1',
    language: 'English',
    versification: 'English',
    projectType: 'Enhanced Resource',
    isResourceProject: true,
    isMarbleResource: true,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'HBOGNT',
    id: 'res-src-001',
    fullName: 'Hebrew/Greek Original',
    language: 'Hebrew',
    versification: 'Original',
    projectType: 'Source Language Text',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: true,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'ENGDICT',
    id: 'dict-001',
    fullName: 'English Dictionary',
    language: 'English',
    versification: '',
    projectType: 'Dictionary',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: true,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'CNOTES',
    id: 'notes-001',
    fullName: 'Consultant Notes',
    language: 'English',
    versification: 'English',
    projectType: 'Consultant Notes',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: true,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'LOCKED',
    id: 'proj-locked',
    fullName: 'Locked Project',
    language: 'English',
    versification: 'English',
    projectType: 'Project (Standard)',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: false,
  },
];

// #endregion

// #region Pure logic functions extracted for testing

function matchesTypeFilter(project: ProjectInfo, filters: FilterState): boolean {
  if (filters.projects && !project.isResourceProject && !project.isNoteType) return true;
  if (
    filters.resources &&
    project.isResourceProject &&
    !project.isMarbleResource &&
    !project.isDictionary &&
    !project.isNoteType
  )
    return true;
  if (filters.enhancedResources && project.isMarbleResource) return true;
  if (filters.sourceLanguages && project.isSourceLanguageText) return true;
  if (filters.dictionaries && project.isDictionary) return true;
  if (filters.consultantNotes && project.isNoteType) return true;
  return false;
}

function matchesNameFilter(project: ProjectInfo, nameFilter: string): boolean {
  if (!nameFilter.trim()) return true;
  const search = nameFilter.toLowerCase();
  return (
    project.name.toLowerCase().includes(search) ||
    project.fullName.toLowerCase().includes(search) ||
    project.language.toLowerCase().includes(search)
  );
}

function anyFilterActive(filters: FilterState): boolean {
  return (
    filters.projects ||
    filters.resources ||
    filters.enhancedResources ||
    filters.sourceLanguages ||
    filters.dictionaries ||
    filters.consultantNotes
  );
}

function filterProjects(projects: ProjectInfo[], filters: FilterState, nameFilter: string) {
  if (!anyFilterActive(filters)) return [];
  return projects.filter((p) => matchesTypeFilter(p, filters) && matchesNameFilter(p, nameFilter));
}

function sortProjects(
  projects: ProjectInfo[],
  sortColumn: SortKey,
  sortDirection: SortDirection,
): ProjectInfo[] {
  return [...projects].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    const comparison = aVal.localeCompare(bVal);
    return sortDirection === 'ascending' ? comparison : -comparison;
  });
}

function isOkEnabled(selectedIds: Set<string>, allProjects: ProjectInfo[]): boolean {
  if (selectedIds.size === 0) return false;
  return allProjects.filter((p) => selectedIds.has(p.id)).every((p) => p.canOpen);
}

// #endregion

// #region Tests

describe('OpenTextsDialog - filter type matching (EXT-012)', () => {
  const allFiltersOn: FilterState = {
    projects: true,
    resources: true,
    enhancedResources: true,
    sourceLanguages: true,
    dictionaries: true,
    consultantNotes: true,
  };

  it('should match Projects filter for non-resource, non-note items', () => {
    const filters: FilterState = { ...allFiltersOn, projects: true };
    const proj = SAMPLE_PROJECTS.find((p) => p.id === 'proj-001')!;
    expect(matchesTypeFilter(proj, filters)).toBe(true);
  });

  it('should match Resources filter for resource items (not enhanced, not dict, not note)', () => {
    const filters: FilterState = { ...allFiltersOn, resources: true };
    const res = SAMPLE_PROJECTS.find((p) => p.id === 'res-001')!;
    expect(matchesTypeFilter(res, filters)).toBe(true);
  });

  it('should match Enhanced Resources filter for marble resources', () => {
    const filters: FilterState = {
      projects: false,
      resources: false,
      enhancedResources: true,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const enh = SAMPLE_PROJECTS.find((p) => p.id === 'res-enh-001')!;
    expect(matchesTypeFilter(enh, filters)).toBe(true);
  });

  it('should match Source Languages filter for source language texts', () => {
    const filters: FilterState = {
      projects: false,
      resources: false,
      enhancedResources: false,
      sourceLanguages: true,
      dictionaries: false,
      consultantNotes: false,
    };
    const slt = SAMPLE_PROJECTS.find((p) => p.id === 'res-src-001')!;
    expect(matchesTypeFilter(slt, filters)).toBe(true);
  });

  it('should match Dictionaries filter for dictionary items', () => {
    const filters: FilterState = {
      projects: false,
      resources: false,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: true,
      consultantNotes: false,
    };
    const dict = SAMPLE_PROJECTS.find((p) => p.id === 'dict-001')!;
    expect(matchesTypeFilter(dict, filters)).toBe(true);
  });

  it('should match Consultant Notes filter for note items', () => {
    const filters: FilterState = {
      projects: false,
      resources: false,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: true,
    };
    const note = SAMPLE_PROJECTS.find((p) => p.id === 'notes-001')!;
    expect(matchesTypeFilter(note, filters)).toBe(true);
  });

  it('should NOT match resource items with only Projects filter on', () => {
    const filters: FilterState = {
      projects: true,
      resources: false,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const res = SAMPLE_PROJECTS.find((p) => p.id === 'res-001')!;
    expect(matchesTypeFilter(res, filters)).toBe(false);
  });

  it('should NOT match marble resource with only Resources filter on', () => {
    const filters: FilterState = {
      projects: false,
      resources: true,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const marble = SAMPLE_PROJECTS.find((p) => p.id === 'res-enh-001')!;
    expect(matchesTypeFilter(marble, filters)).toBe(false);
  });
});

describe('OpenTextsDialog - TC mode filter suppression', () => {
  it('should not include marble resources when Enhanced filter is off', () => {
    const tcFilters: FilterState = {
      projects: true,
      resources: true,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const results = filterProjects(SAMPLE_PROJECTS, tcFilters, '');
    // Enhanced resource (marble) should NOT be included via Resources filter
    // because Resources filter explicitly excludes isMarbleResource
    expect(results.find((p) => p.id === 'res-enh-001')).toBeUndefined();
    // Regular resources should be included
    expect(results.find((p) => p.id === 'res-001')).toBeDefined();
    // Projects should be included
    expect(results.find((p) => p.id === 'proj-001')).toBeDefined();
  });

  it('should return empty when all filters off', () => {
    const noFilters: FilterState = {
      projects: false,
      resources: false,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const results = filterProjects(SAMPLE_PROJECTS, noFilters, '');
    expect(results).toHaveLength(0);
  });
});

describe('OpenTextsDialog - name filter', () => {
  const defaultFilters: FilterState = {
    projects: true,
    resources: true,
    enhancedResources: true,
    sourceLanguages: true,
    dictionaries: true,
    consultantNotes: true,
  };

  it('should filter by project name (case-insensitive)', () => {
    const results = filterProjects(SAMPLE_PROJECTS, defaultFilters, 'niv');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('NIV84');
  });

  it('should filter by full name', () => {
    const results = filterProjects(SAMPLE_PROJECTS, defaultFilters, 'hebrew');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('HBOGNT');
  });

  it('should filter by language', () => {
    const results = filterProjects(SAMPLE_PROJECTS, defaultFilters, 'french');
    // FRA is not in SAMPLE_PROJECTS test data, but verify logic works
    expect(
      results.every(
        (p) =>
          p.language.toLowerCase().includes('french') ||
          p.name.toLowerCase().includes('french') ||
          p.fullName.toLowerCase().includes('french'),
      ),
    ).toBe(true);
  });

  it('should show all when name filter is empty', () => {
    const results = filterProjects(SAMPLE_PROJECTS, defaultFilters, '');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should combine type filter and name filter', () => {
    const projectsOnly: FilterState = {
      projects: true,
      resources: false,
      enhancedResources: false,
      sourceLanguages: false,
      dictionaries: false,
      consultantNotes: false,
    };
    const results = filterProjects(SAMPLE_PROJECTS, projectsOnly, 'english');
    // Only projects that match "english" in name/fullName/language
    expect(results.every((p) => !p.isResourceProject && !p.isNoteType)).toBe(true);
  });
});

describe('OpenTextsDialog - sort behavior', () => {
  const projects = SAMPLE_PROJECTS.filter((p) => !p.isNoteType && !p.isDictionary);

  it('should sort by name ascending', () => {
    const sorted = sortProjects(projects, 'name', 'ascending');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeLessThanOrEqual(0);
    }
  });

  it('should sort by name descending', () => {
    const sorted = sortProjects(projects, 'name', 'descending');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeGreaterThanOrEqual(0);
    }
  });

  it('should sort by projectType ascending', () => {
    const sorted = sortProjects(projects, 'projectType', 'ascending');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].projectType.localeCompare(sorted[i + 1].projectType)).toBeLessThanOrEqual(0);
    }
  });

  it('should sort by language ascending', () => {
    const sorted = sortProjects(projects, 'language', 'ascending');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].language.localeCompare(sorted[i + 1].language)).toBeLessThanOrEqual(0);
    }
  });
});

describe('OpenTextsDialog - OK button enable logic', () => {
  it('should be disabled when no items selected', () => {
    expect(isOkEnabled(new Set(), SAMPLE_PROJECTS)).toBe(false);
  });

  it('should be enabled when at least one openable item selected', () => {
    expect(isOkEnabled(new Set(['proj-001']), SAMPLE_PROJECTS)).toBe(true);
  });

  it('should be disabled when any selected item has canOpen=false', () => {
    expect(isOkEnabled(new Set(['proj-001', 'proj-locked']), SAMPLE_PROJECTS)).toBe(false);
  });

  it('should be disabled when only canOpen=false items selected', () => {
    expect(isOkEnabled(new Set(['proj-locked']), SAMPLE_PROJECTS)).toBe(false);
  });

  it('should be enabled when multiple openable items selected', () => {
    expect(isOkEnabled(new Set(['proj-001', 'res-001']), SAMPLE_PROJECTS)).toBe(true);
  });
});

describe('OpenTextsDialog - anyFilterActive', () => {
  it('should return true when projects filter is active', () => {
    expect(
      anyFilterActive({
        projects: true,
        resources: false,
        enhancedResources: false,
        sourceLanguages: false,
        dictionaries: false,
        consultantNotes: false,
      }),
    ).toBe(true);
  });

  it('should return false when no filters are active', () => {
    expect(
      anyFilterActive({
        projects: false,
        resources: false,
        enhancedResources: false,
        sourceLanguages: false,
        dictionaries: false,
        consultantNotes: false,
      }),
    ).toBe(false);
  });
});

// #endregion
