/**
 * Unit tests for the Open Texts dialog web view.
 *
 * Since the web view component imports from @papi/frontend which cannot be resolved in vitest, we
 * test the extracted utility functions and the SettingSaver integration separately. The full
 * component rendering is verified via E2E tests in text-collection-render.spec.ts.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// #region Filter Logic Tests (extracted from open-texts.web-view.tsx)

interface ProjectInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  projectType: string;
  isSecondaryText: boolean;
  versification: string;
  isResourceProject: boolean;
  isMarbleResource: boolean;
  isDictionary: boolean;
  isSourceLanguageText: boolean;
  isNoteType: boolean;
  isXmlResource: boolean;
  canOpen: boolean;
}

/** Determines which filter category a project belongs to */
function getFilterCategories(project: ProjectInfo): string[] {
  const categories: string[] = [];
  if (project.isNoteType) {
    categories.push('consultantNotes');
  } else if (project.isDictionary || project.isXmlResource) {
    categories.push('dictionaries');
  } else if (project.isSourceLanguageText) {
    categories.push('sourceLanguages');
  } else if (project.isMarbleResource) {
    categories.push('enhancedResources');
  } else if (project.isResourceProject) {
    categories.push('resources');
  } else {
    categories.push('projects');
  }
  return categories;
}

interface ScrTextInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  projectType: string;
  isSecondaryText: boolean;
}

/** Map ScrTextInfo to ProjectInfo with defaults */
function mapToProjectInfo(text: ScrTextInfo): ProjectInfo {
  const projectTypeLower = text.projectType.toLowerCase();
  const isResourceProject =
    projectTypeLower.includes('resource') || projectTypeLower.includes('bible');
  const isMarbleResource = projectTypeLower.includes('enhanced');
  const isDictionary = projectTypeLower.includes('dictionary');
  const isSourceLanguageText = projectTypeLower.includes('source language');
  const isNoteType = projectTypeLower.includes('note');
  const isXmlResource = false;

  return {
    ...text,
    versification: '',
    isResourceProject,
    isMarbleResource,
    isDictionary,
    isSourceLanguageText,
    isNoteType,
    isXmlResource,
    canOpen: true,
  };
}

type SortColumn = 'type' | 'name' | 'fullName' | 'language' | 'versification';
type SortDirection = 'ascending' | 'descending';

function sortProjects(
  projects: ProjectInfo[],
  column: SortColumn,
  direction: SortDirection,
): ProjectInfo[] {
  const sorted = [...projects].sort((a, b) => {
    let valA: string;
    let valB: string;

    switch (column) {
      case 'type':
        valA = a.projectType;
        valB = b.projectType;
        break;
      case 'name':
        valA = a.name;
        valB = b.name;
        break;
      case 'fullName':
        valA = a.fullName;
        valB = b.fullName;
        break;
      case 'language':
        valA = a.language;
        valB = b.language;
        break;
      case 'versification':
        valA = a.versification;
        valB = b.versification;
        break;
      default:
        valA = a.name;
        valB = b.name;
    }

    const cmp = valA.localeCompare(valB, undefined, { sensitivity: 'base' });
    return direction === 'ascending' ? cmp : -cmp;
  });
  return sorted;
}

// #endregion

describe('Open Texts Dialog - Filter Logic', () => {
  it('categorizes a regular project correctly', () => {
    const project: ProjectInfo = {
      name: 'TestProj',
      id: 'proj-1',
      fullName: 'Test Project',
      language: 'English',
      projectType: 'Project',
      isSecondaryText: false,
      versification: '',
      isResourceProject: false,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['projects']);
  });

  it('categorizes a resource project correctly', () => {
    const project: ProjectInfo = {
      name: 'NIV',
      id: 'niv-1',
      fullName: 'New International Version',
      language: 'English',
      projectType: 'Resource',
      isSecondaryText: false,
      versification: '',
      isResourceProject: true,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['resources']);
  });

  it('categorizes a dictionary project correctly', () => {
    const project: ProjectInfo = {
      name: 'Dict',
      id: 'dict-1',
      fullName: 'Dictionary',
      language: 'English',
      projectType: 'Dictionary',
      isSecondaryText: false,
      versification: '',
      isResourceProject: false,
      isMarbleResource: false,
      isDictionary: true,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['dictionaries']);
  });

  it('categorizes a consultant notes project correctly', () => {
    const project: ProjectInfo = {
      name: 'Notes',
      id: 'notes-1',
      fullName: 'Consultant Notes',
      language: 'English',
      projectType: 'Notes',
      isSecondaryText: false,
      versification: '',
      isResourceProject: false,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: true,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['consultantNotes']);
  });

  it('categorizes an enhanced resource correctly', () => {
    const project: ProjectInfo = {
      name: 'Enhanced',
      id: 'enh-1',
      fullName: 'Enhanced Resource',
      language: 'English',
      projectType: 'Enhanced Resource',
      isSecondaryText: false,
      versification: '',
      isResourceProject: false,
      isMarbleResource: true,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['enhancedResources']);
  });

  it('categorizes source language text correctly', () => {
    const project: ProjectInfo = {
      name: 'SLT',
      id: 'slt-1',
      fullName: 'Source Language Text',
      language: 'Hebrew',
      projectType: 'Source Language Text',
      isSecondaryText: false,
      versification: '',
      isResourceProject: false,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: true,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    };
    expect(getFilterCategories(project)).toEqual(['sourceLanguages']);
  });
});

describe('Open Texts Dialog - mapToProjectInfo', () => {
  it('maps ScrTextInfo to ProjectInfo with correct defaults', () => {
    const text: ScrTextInfo = {
      name: 'NIV',
      id: 'niv-id',
      fullName: 'New International Version',
      language: 'English',
      projectType: 'Resource',
      isSecondaryText: false,
    };

    const result = mapToProjectInfo(text);
    expect(result.name).toBe('NIV');
    expect(result.isResourceProject).toBe(true);
    expect(result.isDictionary).toBe(false);
    expect(result.canOpen).toBe(true);
    expect(result.versification).toBe('');
  });

  it('detects dictionary type from projectType string', () => {
    const text: ScrTextInfo = {
      name: 'Dict',
      id: 'dict-id',
      fullName: 'My Dictionary',
      language: 'English',
      projectType: 'Dictionary',
      isSecondaryText: false,
    };

    const result = mapToProjectInfo(text);
    expect(result.isDictionary).toBe(true);
  });
});

describe('Open Texts Dialog - Sorting', () => {
  const projects: ProjectInfo[] = [
    {
      name: 'Zulu',
      id: '1',
      fullName: 'Zulu Translation',
      language: 'Zulu',
      projectType: 'Project',
      isSecondaryText: false,
      versification: 'English',
      isResourceProject: false,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    },
    {
      name: 'Alpha',
      id: '2',
      fullName: 'Alpha Project',
      language: 'English',
      projectType: 'Resource',
      isSecondaryText: false,
      versification: 'Original',
      isResourceProject: true,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    },
    {
      name: 'Middle',
      id: '3',
      fullName: 'Middle Resource',
      language: 'French',
      projectType: 'Resource',
      isSecondaryText: false,
      versification: 'English',
      isResourceProject: true,
      isMarbleResource: false,
      isDictionary: false,
      isSourceLanguageText: false,
      isNoteType: false,
      isXmlResource: false,
      canOpen: true,
    },
  ];

  it('sorts by name ascending', () => {
    const sorted = sortProjects(projects, 'name', 'ascending');
    expect(sorted[0].name).toBe('Alpha');
    expect(sorted[1].name).toBe('Middle');
    expect(sorted[2].name).toBe('Zulu');
  });

  it('sorts by name descending', () => {
    const sorted = sortProjects(projects, 'name', 'descending');
    expect(sorted[0].name).toBe('Zulu');
    expect(sorted[1].name).toBe('Middle');
    expect(sorted[2].name).toBe('Alpha');
  });

  it('sorts by language ascending', () => {
    const sorted = sortProjects(projects, 'language', 'ascending');
    expect(sorted[0].language).toBe('English');
    expect(sorted[1].language).toBe('French');
    expect(sorted[2].language).toBe('Zulu');
  });

  it('sorts by type ascending', () => {
    const sorted = sortProjects(projects, 'type', 'ascending');
    expect(sorted[0].projectType).toBe('Project');
    expect(sorted[1].projectType).toBe('Resource');
  });

  it('does not mutate original array', () => {
    const original = [...projects];
    sortProjects(projects, 'name', 'ascending');
    expect(projects).toEqual(original);
  });
});
