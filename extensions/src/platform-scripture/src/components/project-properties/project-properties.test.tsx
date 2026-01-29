/**
 * Unit tests for Project Properties components
 *
 * Tests:
 *
 * - State management via useProjectPropertiesForm hook
 * - Conditional visibility logic
 * - Validation rules
 * - Tab error tracking
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useProjectPropertiesForm } from '../../hooks/use-project-properties-form';
import type { ProjectPropertiesInput } from '../../types/project-properties.types';
import {
  isDerivedProjectType,
  showsEncodingConverter,
  showsStudyBibleTabs,
  getVisibleTabs,
  validateShortName,
  generateShortName,
  TAB_INDICES,
} from '../../types/project-properties.types';
import { BookChooser } from '../book-chooser.component';

// =============================================================================
// MOCK INPUT
// =============================================================================

const createMockInput = (
  overrides: Partial<ProjectPropertiesInput> = {},
): ProjectPropertiesInput => ({
  mode: 'create',
  options: {
    languages: [
      { id: 'en:Latn:US:', code: 'en', displayName: 'English (US)', isRTL: false },
      { id: 'es:Latn:ES:', code: 'es', displayName: 'Spanish', isRTL: false },
    ],
    versifications: [
      { id: 'English', displayName: 'English', isCustomized: false },
      { id: 'Septuagint', displayName: 'Septuagint', isCustomized: false },
    ],
    projectTypes: [
      { value: 'Standard', label: 'Standard' },
      { value: 'BackTranslation', label: 'Back Translation' },
      { value: 'Daughter', label: 'Daughter' },
      { value: 'Auxiliary', label: 'Auxiliary' },
      { value: 'StudyBibleAdditions', label: 'Study Bible Additions' },
      { value: 'TransliterationManual', label: 'Transliteration (Manual)' },
      { value: 'TransliterationWithEncoder', label: 'Transliteration (With Encoder)' },
      { value: 'ConsultantNotes', label: 'Consultant Notes' },
    ],
    availableBaseProjects: [{ name: 'ENG', guid: 'eng-guid', displayName: 'English Reference' }],
    biblicalTermsLists: [{ id: 'default', displayName: 'Default' }],
    encodingConverters: [{ id: 'enc1', displayName: 'Encoder 1' }],
    encodings: [{ id: 'UTF-8', displayName: 'UTF-8' }],
    normalizations: [{ id: 'NFC', displayName: 'NFC' }],
    flexUsageModes: [{ id: 'import', displayName: 'Import' }],
  },
  userContext: {
    isRegistered: true,
    canRegisterProjects: true,
    isOnline: true,
  },
  ...overrides,
});

// =============================================================================
// TYPE HELPER TESTS
// =============================================================================

describe('Type Helper Functions', () => {
  describe('isDerivedProjectType', () => {
    it('returns false for undefined', () => {
      expect(isDerivedProjectType(undefined)).toBe(false);
    });

    it('returns false for Standard', () => {
      expect(isDerivedProjectType('Standard')).toBe(false);
    });

    it('returns false for ConsultantNotes', () => {
      expect(isDerivedProjectType('ConsultantNotes')).toBe(false);
    });

    it('returns true for BackTranslation', () => {
      expect(isDerivedProjectType('BackTranslation')).toBe(true);
    });

    it('returns true for Daughter', () => {
      expect(isDerivedProjectType('Daughter')).toBe(true);
    });

    it('returns true for Auxiliary', () => {
      expect(isDerivedProjectType('Auxiliary')).toBe(true);
    });

    it('returns true for StudyBibleAdditions', () => {
      expect(isDerivedProjectType('StudyBibleAdditions')).toBe(true);
    });

    it('returns true for TransliterationManual', () => {
      expect(isDerivedProjectType('TransliterationManual')).toBe(true);
    });

    it('returns true for TransliterationWithEncoder', () => {
      expect(isDerivedProjectType('TransliterationWithEncoder')).toBe(true);
    });
  });

  describe('showsEncodingConverter', () => {
    it('returns true only for TransliterationWithEncoder', () => {
      expect(showsEncodingConverter('TransliterationWithEncoder')).toBe(true);
      expect(showsEncodingConverter('TransliterationManual')).toBe(false);
      expect(showsEncodingConverter('Standard')).toBe(false);
      expect(showsEncodingConverter(undefined)).toBe(false);
    });
  });

  describe('showsStudyBibleTabs', () => {
    it('returns true only for StudyBibleAdditions', () => {
      expect(showsStudyBibleTabs('StudyBibleAdditions')).toBe(true);
      expect(showsStudyBibleTabs('Standard')).toBe(false);
      expect(showsStudyBibleTabs(undefined)).toBe(false);
    });
  });

  describe('getVisibleTabs', () => {
    it('returns base 5 tabs for Standard', () => {
      const tabs = getVisibleTabs('Standard');
      expect(tabs).toHaveLength(5);
      expect(tabs).toEqual([
        TAB_INDICES.GENERAL,
        TAB_INDICES.BOOKS,
        TAB_INDICES.ASSOCIATIONS,
        TAB_INDICES.NOTES,
        TAB_INDICES.ADVANCED,
      ]);
    });

    it('returns 7 tabs for StudyBibleAdditions', () => {
      const tabs = getVisibleTabs('StudyBibleAdditions');
      expect(tabs).toHaveLength(7);
      expect(tabs).toContain(TAB_INDICES.ADDITIONS);
      expect(tabs).toContain(TAB_INDICES.STUDY_BIBLE);
    });
  });
});

// =============================================================================
// VALIDATION TESTS
// =============================================================================

describe('Validation Functions', () => {
  describe('validateShortName', () => {
    it('rejects empty string', () => {
      const result = validateShortName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Short name is required');
    });

    it('rejects names shorter than 3 characters', () => {
      const result = validateShortName('AB');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('3-8');
    });

    it('rejects names longer than 8 characters', () => {
      const result = validateShortName('ABCDEFGHI');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('3-8');
    });

    it('rejects names with spaces', () => {
      const result = validateShortName('AB CD');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('letters and numbers');
    });

    it('rejects names with special characters', () => {
      const result = validateShortName('ABC!');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('letters and numbers');
    });

    it('rejects reserved Windows names', () => {
      const result = validateShortName('CON');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('reserved');
    });

    it('accepts valid short names', () => {
      expect(validateShortName('ABC').isValid).toBe(true);
      expect(validateShortName('Test123').isValid).toBe(true);
      expect(validateShortName('MyProj').isValid).toBe(true);
    });
  });

  describe('generateShortName', () => {
    it('returns empty string for empty input', () => {
      expect(generateShortName('')).toBe('');
    });

    it('generates initials from words', () => {
      expect(generateShortName('My Test Project')).toBe('MTP');
    });

    it('handles short input', () => {
      // Single word 'Hi' generates just 'H' since there's only one word
      const result = generateShortName('Hi');
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('truncates long abbreviations', () => {
      expect(generateShortName('A B C D E F G H I J').length).toBeLessThanOrEqual(8);
    });

    it('preserves trailing digits', () => {
      expect(generateShortName('Project 01')).toContain('01');
    });
  });
});

// =============================================================================
// HOOK TESTS
// =============================================================================

describe('useProjectPropertiesForm Hook', () => {
  describe('Initial State', () => {
    it('initializes with create mode defaults', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.mode).toBe('create');
      expect(result.current.state.selectedProjectType).toBe('Standard');
      expect(result.current.state.selectedVersification).toBe('English');
      expect(result.current.state.isDirty).toBe(false);
    });

    it('initializes with interlinear context', () => {
      const input = createMockInput({
        interlinearContext: {
          sourceProjectName: 'Source',
          sourceProjectGuid: 'source-guid',
          taskType: 'BackTranslation',
          presetProjectType: 'BackTranslation',
          lockBasedOn: true,
        },
      });

      const { result } = renderHook(() => useProjectPropertiesForm(input));

      expect(result.current.state.selectedProjectType).toBe('BackTranslation');
      expect(result.current.state.selectedBaseProject).toBe('source-guid');
      expect(result.current.state.isBasedOnLocked).toBe(true);
    });
  });

  describe('Project Type Changes', () => {
    it('updates derived state when project type changes', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.isDerivedType).toBe(false);
      expect(result.current.state.isVersificationLocked).toBe(false);

      act(() => {
        result.current.setProjectType('BackTranslation');
      });

      expect(result.current.state.isDerivedType).toBe(true);
      expect(result.current.state.isVersificationLocked).toBe(true);
    });

    it('shows encoding converter for TransliterationWithEncoder', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.showEncodingConverter).toBe(false);

      act(() => {
        result.current.setProjectType('TransliterationWithEncoder');
      });

      expect(result.current.state.showEncodingConverter).toBe(true);
    });

    it('shows Study Bible tabs for StudyBibleAdditions', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.showAdditionsTab).toBe(false);
      expect(result.current.state.showStudyBibleTab).toBe(false);

      act(() => {
        result.current.setProjectType('StudyBibleAdditions');
      });

      expect(result.current.state.showAdditionsTab).toBe(true);
      expect(result.current.state.showStudyBibleTab).toBe(true);
    });

    it('clears base project when switching to non-derived type', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      // Set to derived type and select base project
      act(() => {
        result.current.setProjectType('BackTranslation');
        result.current.setBaseProject('eng-guid');
      });

      expect(result.current.state.selectedBaseProject).toBe('eng-guid');

      // Switch to non-derived type
      act(() => {
        result.current.setProjectType('Standard');
      });

      expect(result.current.state.selectedBaseProject).toBeUndefined();
    });
  });

  describe('Validation', () => {
    it('validates required fields for create mode', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      act(() => {
        result.current.validate();
      });

      // Should have errors for missing fullName and shortName
      expect(result.current.state.validationErrors.fullName).toBeDefined();
      expect(result.current.state.validationErrors.shortName).toBeDefined();
    });

    it('requires base project for derived types', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      // Set fields in sequence to allow state to update
      act(() => {
        result.current.setProjectType('BackTranslation');
      });

      act(() => {
        result.current.setFullName('Test Project');
        result.current.setShortName('TEST');
      });

      // Verify derived state is set correctly
      expect(result.current.state.isDerivedType).toBe(true);

      act(() => {
        result.current.validate();
      });

      expect(result.current.state.validationErrors.selectedBaseProject).toBeDefined();
    });

    it('requires encoding converter for TransliterationWithEncoder', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      act(() => {
        result.current.setProjectType('TransliterationWithEncoder');
      });

      act(() => {
        result.current.setFullName('Test Project');
        result.current.setShortName('TEST');
        result.current.setBaseProject('eng-guid');
      });

      // Verify derived state is set correctly
      expect(result.current.state.showEncodingConverter).toBe(true);

      act(() => {
        result.current.validate();
      });

      expect(result.current.state.validationErrors.encodingConverter).toBeDefined();
    });

    it('tracks which tabs have errors', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      act(() => {
        result.current.validate();
      });

      // General tab should have errors (missing name fields)
      expect(result.current.state.tabsWithErrors).toContain(TAB_INDICES.GENERAL);
    });

    it('passes validation with all required fields', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      act(() => {
        result.current.setFullName('Test Project');
        result.current.setShortName('TEST');
        result.current.setLanguage('en:Latn:US:');
        result.current.setVersification('English');
      });

      let isValid = false;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(true);
      expect(Object.keys(result.current.state.validationErrors)).toHaveLength(0);
    });
  });

  describe('Form Submission', () => {
    it('returns cancel action when validation fails', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      let output: ReturnType<typeof result.current.handleSubmit> | undefined;
      act(() => {
        output = result.current.handleSubmit();
      });

      expect(output?.action).toBe('cancel');
    });

    it('returns submit action with project data when valid', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      act(() => {
        result.current.setFullName('Test Project');
        result.current.setShortName('TEST');
        result.current.setLanguage('en:Latn:US:');
        result.current.setVersification('English');
      });

      let output: ReturnType<typeof result.current.handleSubmit> | undefined;
      act(() => {
        output = result.current.handleSubmit();
      });

      expect(output?.action).toBe('submit');
      expect(output?.projectData).toBeDefined();
      expect(output?.projectData?.shortName).toBe('TEST');
      expect(output?.projectData?.fullName).toBe('Test Project');
    });
  });

  describe('Dirty State', () => {
    it('marks form as dirty when fields change', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.isDirty).toBe(false);

      act(() => {
        result.current.setFullName('Test');
      });

      expect(result.current.state.isDirty).toBe(true);
    });
  });

  describe('Books Tab', () => {
    it('toggles book selection', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.selectedBooks).toHaveLength(0);

      act(() => {
        result.current.toggleBook('GEN');
      });

      expect(result.current.state.selectedBooks).toContain('GEN');

      act(() => {
        result.current.toggleBook('GEN');
      });

      expect(result.current.state.selectedBooks).not.toContain('GEN');
    });
  });

  describe('Comment Tags', () => {
    it('adds and removes comment tags', () => {
      const { result } = renderHook(() => useProjectPropertiesForm(createMockInput()));

      expect(result.current.state.commentTags).toHaveLength(0);

      const newTag = { icon: 'test', name: 'Test Tag', creatorResolve: false, template: '' };

      act(() => {
        result.current.addCommentTag(newTag);
      });

      expect(result.current.state.commentTags).toHaveLength(1);
      expect(result.current.state.commentTags[0].name).toBe('Test Tag');

      act(() => {
        result.current.removeCommentTag(0);
      });

      expect(result.current.state.commentTags).toHaveLength(0);
    });
  });
});

// =============================================================================
// BOOK CHOOSER TESTS
// =============================================================================

describe('BookChooser Component', () => {
  it('renders book sections', () => {
    render(
      <BookChooser selectedBooks={[]} onSelectedBooksChange={vi.fn()} onToggleBook={vi.fn()} />,
    );

    expect(screen.getByText(/Old Testament/)).toBeInTheDocument();
    expect(screen.getByText(/New Testament/)).toBeInTheDocument();
    expect(screen.getByText(/Deuterocanonical/)).toBeInTheDocument();
  });

  it('shows selected book count', () => {
    render(
      <BookChooser
        selectedBooks={['GEN', 'EXO', 'MAT']}
        onSelectedBooksChange={vi.fn()}
        onToggleBook={vi.fn()}
      />,
    );

    expect(screen.getByText(/3 books selected/)).toBeInTheDocument();
  });

  it('calls onToggleBook when book is clicked', () => {
    const mockToggle = vi.fn();

    render(
      <BookChooser selectedBooks={[]} onSelectedBooksChange={vi.fn()} onToggleBook={mockToggle} />,
    );

    // Find and click the Genesis checkbox/row
    const genCheckbox = screen.getByLabelText('Gen');
    fireEvent.click(genCheckbox);

    expect(mockToggle).toHaveBeenCalledWith('GEN');
  });

  it('hides DC section when showDeuterocanonical is false', () => {
    render(
      <BookChooser
        selectedBooks={[]}
        onSelectedBooksChange={vi.fn()}
        onToggleBook={vi.fn()}
        showDeuterocanonical={false}
      />,
    );

    expect(screen.queryByText(/Deuterocanonical/)).not.toBeInTheDocument();
  });
});
