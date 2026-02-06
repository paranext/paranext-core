import { describe, it, expect } from 'vitest';
import {
  validateForm,
  validateShortName,
  generateShortName,
  formReducer,
  createInitialState,
  isDerivedType,
  buildCreateRequest,
  ProjectPropertiesFormState,
  FormAction,
  TAB_GENERAL,
  TAB_BOOKS,
  TAB_ADVANCED,
  ALL_BOOKS,
} from './project-properties.utils';

// ============================================================================
// isDerivedType
// ============================================================================

describe('isDerivedType', () => {
  it('should return false for Standard', () => {
    expect(isDerivedType('Standard')).toBe(false);
  });

  it('should return false for ConsultantNotes', () => {
    expect(isDerivedType('ConsultantNotes')).toBe(false);
  });

  it('should return true for BackTranslation', () => {
    expect(isDerivedType('BackTranslation')).toBe(true);
  });

  it('should return true for Daughter', () => {
    expect(isDerivedType('Daughter')).toBe(true);
  });

  it('should return true for Auxiliary', () => {
    expect(isDerivedType('Auxiliary')).toBe(true);
  });

  it('should return true for StudyBibleAdditions', () => {
    expect(isDerivedType('StudyBibleAdditions')).toBe(true);
  });

  it('should return true for TransliterationManual', () => {
    expect(isDerivedType('TransliterationManual')).toBe(true);
  });

  it('should return true for TransliterationWithEncoder', () => {
    expect(isDerivedType('TransliterationWithEncoder')).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isDerivedType(undefined)).toBe(false);
  });
});

// ============================================================================
// createInitialState
// ============================================================================

describe('createInitialState', () => {
  it('should return default state with Standard project type', () => {
    const state = createInitialState();
    expect(state.projectType).toBe('Standard');
    expect(state.versification).toBe('English');
    expect(state.normalization).toBe('NFC');
    expect(state.editable).toBe(true);
    expect(state.isDirty).toBe(false);
    expect(state.isSubmitting).toBe(false);
  });

  it('should select all books by default', () => {
    const state = createInitialState();
    expect(state.selectedBooks).toEqual(ALL_BOOKS);
    expect(state.selectedBooks.length).toBeGreaterThan(0);
  });

  it('should start on the general tab', () => {
    const state = createInitialState();
    expect(state.activeTab).toBe(TAB_GENERAL);
  });

  it('should have no validation errors initially', () => {
    const state = createInitialState();
    expect(state.validationErrors).toEqual({});
    expect(state.tabsWithErrors).toEqual([]);
  });

  it('should not show conditional fields for Standard type', () => {
    const state = createInitialState();
    expect(state.showBaseProject).toBe(false);
    expect(state.showEncoderFields).toBe(false);
    expect(state.showStudyBibleTab).toBe(false);
  });
});

// ============================================================================
// validateShortName
// ============================================================================

describe('validateShortName', () => {
  it('should return undefined for empty string (no error on-change for empty)', () => {
    expect(validateShortName('')).toBeUndefined();
  });

  it('should return undefined for valid short name', () => {
    expect(validateShortName('ABC')).toBeUndefined();
    expect(validateShortName('Test123')).toBeUndefined();
    expect(validateShortName('MY_PROJ')).toBeUndefined();
  });

  it('should return error for name shorter than 3 characters', () => {
    const result = validateShortName('AB');
    expect(result).toContain('3');
    expect(result).toContain('8');
  });

  it('should return error for name longer than 8 characters', () => {
    const result = validateShortName('ABCDEFGHI');
    expect(result).toContain('3');
    expect(result).toContain('8');
  });

  it('should return error for invalid characters', () => {
    const result = validateShortName('AB!C');
    expect(result).toContain('A-Z');
  });

  it('should return error for spaces', () => {
    const result = validateShortName('AB CD');
    expect(result).toBeDefined();
  });

  it('should accept underscores', () => {
    expect(validateShortName('A_B_C')).toBeUndefined();
  });

  it('should accept digits', () => {
    expect(validateShortName('ABC123')).toBeUndefined();
  });

  it('should accept mixed case', () => {
    expect(validateShortName('AbCdEf')).toBeUndefined();
  });

  it('should accept exactly 3 characters', () => {
    expect(validateShortName('ABC')).toBeUndefined();
  });

  it('should accept exactly 8 characters', () => {
    expect(validateShortName('ABCDEFGH')).toBeUndefined();
  });
});

// ============================================================================
// generateShortName
// ============================================================================

describe('generateShortName', () => {
  it('should return empty string for empty input', () => {
    expect(generateShortName('')).toBe('');
  });

  it('should uppercase single word and take first 8 chars', () => {
    expect(generateShortName('testproject')).toBe('TESTPROJ');
  });

  it('should take first letter of each word for multiple words', () => {
    expect(generateShortName('My Test Project')).toBe('MTP');
  });

  it('should handle hyphenated names', () => {
    // 'back-translation' splits into ['back', 'translation'], takes first letters 'BT' (2 chars),
    // then pads to 3 from first word: 'BAC'
    expect(generateShortName('back-translation')).toBe('BAC');
  });

  it('should handle underscore-separated names', () => {
    expect(generateShortName('my_test_project')).toBe('MTP');
  });

  it('should limit to 8 characters', () => {
    const result = generateShortName('A B C D E F G H I J');
    expect(result.length).toBeLessThanOrEqual(8);
  });

  it('should handle backslashes by converting to forward slashes', () => {
    const result = generateShortName('path\\to\\name');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should pad from first word when result is short', () => {
    // 'a b' splits into ['a', 'b'], takes first letters 'AB' (2 chars < 3),
    // padding replaces with first word substring: 'A' (only 1 char available)
    const result = generateShortName('a b');
    expect(result).toBe('A');
  });

  it('should only contain valid characters', () => {
    const result = generateShortName('Test Project 123');
    expect(/^[A-Za-z0-9_]*$/.test(result)).toBe(true);
  });
});

// ============================================================================
// validateForm
// ============================================================================

describe('validateForm', () => {
  function createValidState(): ProjectPropertiesFormState {
    return {
      ...createInitialState(),
      fullName: 'My Test Project',
      shortName: 'MTP',
      projectType: 'Standard',
      versification: 'English',
      languageId: 'eng',
      fileNameForm: '41MAT{project}.SFM',
    };
  }

  it('should pass validation for a valid state', () => {
    const result = validateForm(createValidState());
    expect(result.errors).toEqual({});
    expect(result.tabsWithErrors).toEqual([]);
  });

  it('should fail VAL-002: full name required', () => {
    const state = createValidState();
    state.fullName = '';
    const result = validateForm(state);
    expect(result.errors.fullName).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-001: short name required', () => {
    const state = createValidState();
    state.shortName = '';
    const result = validateForm(state);
    expect(result.errors.shortName).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-001: short name too short', () => {
    const state = createValidState();
    state.shortName = 'AB';
    const result = validateForm(state);
    expect(result.errors.shortName).toBeDefined();
  });

  it('should fail VAL-001: short name too long', () => {
    const state = createValidState();
    state.shortName = 'ABCDEFGHI';
    const result = validateForm(state);
    expect(result.errors.shortName).toBeDefined();
  });

  it('should fail VAL-001: short name invalid characters', () => {
    const state = createValidState();
    state.shortName = 'AB!C';
    const result = validateForm(state);
    expect(result.errors.shortName).toBeDefined();
  });

  it('should fail VAL-003: project type required', () => {
    const state = createValidState();
    state.projectType = undefined;
    const result = validateForm(state);
    expect(result.errors.projectType).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-004: versification required', () => {
    const state = createValidState();
    state.versification = undefined;
    const result = validateForm(state);
    expect(result.errors.versification).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-005: language required when languageRequired is true', () => {
    const state = createValidState();
    state.languageRequired = true;
    state.languageId = undefined;
    const result = validateForm(state);
    expect(result.errors.languageId).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should pass VAL-005: language not required for StudyBibleAdditions', () => {
    const state = createValidState();
    state.languageRequired = false;
    state.languageId = undefined;
    const result = validateForm(state);
    expect(result.errors.languageId).toBeUndefined();
  });

  it('should fail VAL-007: base project required for derived types', () => {
    const state = createValidState();
    state.baseProjectRequired = true;
    state.baseProjectGuid = undefined;
    const result = validateForm(state);
    expect(result.errors.baseProjectGuid).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-008: encoder required for TransliterationWithEncoder', () => {
    const state = createValidState();
    state.projectType = 'TransliterationWithEncoder';
    state.encoderName = undefined;
    const result = validateForm(state);
    expect(result.errors.encoderName).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
  });

  it('should fail VAL-009: at least one book selected', () => {
    const state = createValidState();
    state.selectedBooks = [];
    const result = validateForm(state);
    expect(result.errors.selectedBooks).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_BOOKS);
  });

  it('should fail VAL-006: file name pattern required', () => {
    const state = createValidState();
    state.fileNameForm = '';
    const result = validateForm(state);
    expect(result.errors.fileNameForm).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_ADVANCED);
  });

  it('should fail VAL-006: file name pattern cannot end with .ptx', () => {
    const state = createValidState();
    state.fileNameForm = 'test.ptx';
    const result = validateForm(state);
    expect(result.errors.fileNameForm).toBeDefined();
    expect(result.tabsWithErrors).toContain(TAB_ADVANCED);
  });

  it('should report multiple tabs with errors', () => {
    const state = createValidState();
    state.fullName = '';
    state.selectedBooks = [];
    state.fileNameForm = '';
    const result = validateForm(state);
    expect(result.tabsWithErrors).toContain(TAB_GENERAL);
    expect(result.tabsWithErrors).toContain(TAB_BOOKS);
    expect(result.tabsWithErrors).toContain(TAB_ADVANCED);
  });
});

// ============================================================================
// formReducer
// ============================================================================

describe('formReducer', () => {
  it('should handle SET_FIELD action', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_FIELD', field: 'fullName', value: 'Test' };
    const newState = formReducer(state, action);
    expect(newState.fullName).toBe('Test');
    expect(newState.isDirty).toBe(true);
  });

  it('should handle SET_PROJECT_TYPE for Standard', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_PROJECT_TYPE', projectType: 'Standard' };
    const newState = formReducer(state, action);
    expect(newState.projectType).toBe('Standard');
    expect(newState.showBaseProject).toBe(false);
    expect(newState.showEncoderFields).toBe(false);
    expect(newState.languageRequired).toBe(true);
    expect(newState.baseProjectRequired).toBe(false);
  });

  it('should handle SET_PROJECT_TYPE for BackTranslation', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_PROJECT_TYPE', projectType: 'BackTranslation' };
    const newState = formReducer(state, action);
    expect(newState.projectType).toBe('BackTranslation');
    expect(newState.showBaseProject).toBe(true);
    expect(newState.baseProjectRequired).toBe(true);
    expect(newState.languageRequired).toBe(true);
  });

  it('should handle SET_PROJECT_TYPE for StudyBibleAdditions (language not required)', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_PROJECT_TYPE', projectType: 'StudyBibleAdditions' };
    const newState = formReducer(state, action);
    expect(newState.languageRequired).toBe(false);
    expect(newState.showBaseProject).toBe(true);
    expect(newState.baseProjectRequired).toBe(true);
  });

  it('should handle SET_PROJECT_TYPE for TransliterationWithEncoder', () => {
    const state = createInitialState();
    const action: FormAction = {
      type: 'SET_PROJECT_TYPE',
      projectType: 'TransliterationWithEncoder',
    };
    const newState = formReducer(state, action);
    expect(newState.showEncoderFields).toBe(true);
    expect(newState.showBaseProject).toBe(true);
    expect(newState.editable).toBe(false);
  });

  it('should clear base project when changing project type', () => {
    const state = {
      ...createInitialState(),
      baseProjectGuid: 'some-guid',
    };
    const action: FormAction = { type: 'SET_PROJECT_TYPE', projectType: 'Standard' };
    const newState = formReducer(state, action);
    expect(newState.baseProjectGuid).toBeUndefined();
  });

  it('should handle SET_BASE_PROJECT action', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_BASE_PROJECT', baseProjectGuid: 'test-guid' };
    const newState = formReducer(state, action);
    expect(newState.baseProjectGuid).toBe('test-guid');
    expect(newState.isDirty).toBe(true);
  });

  it('should handle SET_BOOKS action', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_BOOKS', selectedBooks: ['GEN', 'EXO'] };
    const newState = formReducer(state, action);
    expect(newState.selectedBooks).toEqual(['GEN', 'EXO']);
    expect(newState.isDirty).toBe(true);
  });

  it('should handle SET_ACTIVE_TAB action', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_ACTIVE_TAB', tab: 'books' };
    const newState = formReducer(state, action);
    expect(newState.activeTab).toBe('books');
  });

  it('should handle SET_VALIDATION_ERRORS action', () => {
    const state = createInitialState();
    const errors = { fullName: 'Required' };
    const action: FormAction = {
      type: 'SET_VALIDATION_ERRORS',
      errors,
      tabsWithErrors: [TAB_GENERAL],
    };
    const newState = formReducer(state, action);
    expect(newState.validationErrors).toEqual(errors);
    expect(newState.tabsWithErrors).toEqual([TAB_GENERAL]);
  });

  it('should handle SET_SUBMITTING action', () => {
    const state = createInitialState();
    const action: FormAction = { type: 'SET_SUBMITTING', isSubmitting: true };
    const newState = formReducer(state, action);
    expect(newState.isSubmitting).toBe(true);
  });

  it('should handle RESET action', () => {
    const state = {
      ...createInitialState(),
      fullName: 'Modified',
      isDirty: true,
      isSubmitting: true,
    };
    const action: FormAction = { type: 'RESET' };
    const newState = formReducer(state, action);
    expect(newState.fullName).toBe('');
    expect(newState.isDirty).toBe(false);
    expect(newState.isSubmitting).toBe(false);
  });

  it('should return unchanged state for unknown action', () => {
    const state = createInitialState();
    // Force an unknown action type for testing default case
    const action = { type: 'UNKNOWN_ACTION' } as unknown as FormAction;
    const newState = formReducer(state, action);
    expect(newState).toBe(state);
  });
});

// ============================================================================
// buildCreateRequest
// ============================================================================

describe('buildCreateRequest', () => {
  it('should build a valid create request from form state', () => {
    const state: ProjectPropertiesFormState = {
      ...createInitialState(),
      fullName: 'My Test Project',
      shortName: 'MTP',
      projectType: 'Standard',
      languageId: 'eng',
      versification: 'English',
      editable: true,
      selectedBooks: ['GEN', 'EXO', 'MAT'],
      fileNameForm: '41MAT{project}.SFM',
      normalization: 'NFC',
    };

    const request = buildCreateRequest(state);
    expect(request.shortName).toBe('MTP');
    expect(request.fullName).toBe('My Test Project');
    expect(request.projectType).toBe('Standard');
    expect(request.languageId).toBe('eng');
    expect(request.versification).toBe('English');
    expect(request.editable).toBe(true);
    expect(request.booksPresent).toEqual(['GEN', 'EXO', 'MAT']);
    expect(request.fileNameForm).toBe('41MAT{project}.SFM');
    expect(request.normalization).toBe('NFC');
  });

  it('should default to Standard when projectType is undefined', () => {
    const state: ProjectPropertiesFormState = {
      ...createInitialState(),
      projectType: undefined,
    };
    const request = buildCreateRequest(state);
    expect(request.projectType).toBe('Standard');
  });

  it('should default to English when versification is undefined', () => {
    const state: ProjectPropertiesFormState = {
      ...createInitialState(),
      versification: undefined,
    };
    const request = buildCreateRequest(state);
    expect(request.versification).toBe('English');
  });

  it('should include encoder fields for TransliterationWithEncoder', () => {
    const state: ProjectPropertiesFormState = {
      ...createInitialState(),
      fullName: 'Encoder Project',
      shortName: 'ENC',
      projectType: 'TransliterationWithEncoder',
      encoderName: 'TestEncoder',
      encoderReverseDirection: true,
    };
    const request = buildCreateRequest(state);
    expect(request.encoderName).toBe('TestEncoder');
    expect(request.encoderReverseDirection).toBe(true);
  });
});
