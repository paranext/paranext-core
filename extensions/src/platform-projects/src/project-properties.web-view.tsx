import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useReducer } from 'react';
import GeneralTab, {
  LanguageOption,
  ProjectReference,
  VersificationType,
} from './components/general-tab.component';
import BooksTab from './components/books-tab.component';
import {
  ProjectType,
  ProjectTypeRules,
  getProjectTypeRules,
} from './components/project-type-selector.component';

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  // Title
  '%platformProjects_projectProperties_title%',
  // Tab labels
  '%platformProjects_tab_general%',
  '%platformProjects_tab_books%',
  '%platformProjects_tab_associations%',
  '%platformProjects_tab_notes%',
  '%platformProjects_tab_advanced%',
  '%platformProjects_tab_additions%',
  '%platformProjects_tab_studyBible%',
  // Buttons
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
  '%platformProjects_button_editName%',
  // Labels
  '%platformProjects_label_fullName%',
  '%platformProjects_label_shortName%',
  '%platformProjects_label_projectType%',
  '%platformProjects_label_language%',
  '%platformProjects_label_versification%',
  '%platformProjects_label_basedOn%',
  '%platformProjects_label_editable%',
  '%platformProjects_label_fileNamePattern%',
  '%platformProjects_label_normalization%',
  // Placeholders
  '%platformProjects_selectProjectType%',
  '%platformProjects_selectLanguage%',
  '%platformProjects_selectVersification%',
  '%platformProjects_selectBaseProject%',
  // Project types
  '%platformProjects_projectType_standard%',
  '%platformProjects_projectType_backTranslation%',
  '%platformProjects_projectType_daughter%',
  '%platformProjects_projectType_auxiliary%',
  '%platformProjects_projectType_studyBibleAdditions%',
  '%platformProjects_projectType_transliterationManual%',
  '%platformProjects_projectType_transliterationWithEncoder%',
  '%platformProjects_projectType_consultantNotes%',
  // Versifications
  '%platformProjects_versification_english%',
  '%platformProjects_versification_septuagint%',
  '%platformProjects_versification_original%',
  '%platformProjects_versification_vulgate%',
  '%platformProjects_versification_russianOrthodox%',
  '%platformProjects_versification_russianProtestant%',
  // Books tab
  '%platformProjects_books_oldTestament%',
  '%platformProjects_books_newTestament%',
  '%platformProjects_books_deuterocanon%',
  '%platformProjects_books_selectAll%',
  '%platformProjects_books_deselectAll%',
  '%platformProjects_books_selectedCount%',
  // Error ribbon
  '%platformProjects_errorRibbon_incompleteTabs%',
  // Validation
  '%platformProjects_validation_fullNameRequired%',
  '%platformProjects_validation_shortNameRequired%',
  '%platformProjects_validation_shortNameLength%',
  '%platformProjects_validation_shortNameChars%',
  '%platformProjects_validation_shortNameDuplicate%',
  '%platformProjects_validation_projectTypeRequired%',
  '%platformProjects_validation_versificationRequired%',
  '%platformProjects_validation_languageRequired%',
  '%platformProjects_validation_baseProjectRequired%',
  '%platformProjects_validation_booksRequired%',
  '%platformProjects_validation_fileNameRequired%',
  '%platformProjects_validation_fileNameNoPtx%',
  // Disabled tab tooltip
  '%platformProjects_comingSoon%',
  // Normalization
  '%platformProjects_normalization_undefined%',
  '%platformProjects_normalization_nfd%',
  '%platformProjects_normalization_nfc%',
];

// ============================================================================
// State types and reducer
// ============================================================================

type NormalizationType = 'Undefined' | 'NFD' | 'NFC';

interface ProjectFormState {
  // General tab
  fullName: string;
  shortName: string;
  projectType: ProjectType | undefined;
  languageId: string | undefined;
  versification: VersificationType | undefined;
  baseProjectGuid: string | undefined;
  editable: boolean;
  encoderName: string | undefined;
  encoderReverseDirection: boolean;

  // Books tab
  selectedBooks: string[];

  // Advanced tab
  fileNameForm: string;
  normalization: NormalizationType;

  // UI state
  activeTab: string;
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
  tabsWithErrors: string[];

  // Derived state (from project type)
  typeRules: ProjectTypeRules;
}

type ProjectFormAction =
  | { type: 'SET_FULL_NAME'; payload: string }
  | { type: 'SET_SHORT_NAME'; payload: string }
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectType }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_VERSIFICATION'; payload: VersificationType }
  | { type: 'SET_BASE_PROJECT'; payload: string }
  | { type: 'SET_EDITABLE'; payload: boolean }
  | { type: 'SET_SELECTED_BOOKS'; payload: string[] }
  | { type: 'SET_FILE_NAME_FORM'; payload: string }
  | { type: 'SET_NORMALIZATION'; payload: NormalizationType }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | {
      type: 'SET_VALIDATION_ERRORS';
      payload: { errors: Record<string, string>; tabsWithErrors: string[] };
    };

/** Get all canonical book IDs for default selection */
function getAllBookIds(): string[] {
  return Canon.allBookIds;
}

function createInitialState(): ProjectFormState {
  return {
    fullName: '',
    shortName: '',
    projectType: undefined,
    languageId: undefined,
    versification: 'English',
    baseProjectGuid: undefined,
    editable: true,
    encoderName: undefined,
    encoderReverseDirection: false,
    selectedBooks: getAllBookIds(),
    fileNameForm: '41MAT{project}.SFM',
    normalization: 'NFC',
    activeTab: 'general',
    isDirty: false,
    isSubmitting: false,
    validationErrors: {},
    tabsWithErrors: [],
    typeRules: getProjectTypeRules(undefined),
  };
}

function projectFormReducer(state: ProjectFormState, action: ProjectFormAction): ProjectFormState {
  switch (action.type) {
    case 'SET_FULL_NAME':
      return { ...state, fullName: action.payload, isDirty: true };

    case 'SET_SHORT_NAME':
      return { ...state, shortName: action.payload, isDirty: true };

    case 'SET_PROJECT_TYPE': {
      const newRules = getProjectTypeRules(action.payload);
      return {
        ...state,
        projectType: action.payload,
        typeRules: newRules,
        // Clear base project if not needed
        baseProjectGuid: newRules.showBaseProject ? state.baseProjectGuid : undefined,
        // Clear encoder if not needed
        encoderName: newRules.showEncoderFields ? state.encoderName : undefined,
        encoderReverseDirection: newRules.showEncoderFields ? state.encoderReverseDirection : false,
        // Update editable default
        editable: newRules.editableDefault,
        isDirty: true,
      };
    }

    case 'SET_LANGUAGE':
      return { ...state, languageId: action.payload, isDirty: true };

    case 'SET_VERSIFICATION':
      return { ...state, versification: action.payload, isDirty: true };

    case 'SET_BASE_PROJECT':
      return { ...state, baseProjectGuid: action.payload, isDirty: true };

    case 'SET_EDITABLE':
      return { ...state, editable: action.payload, isDirty: true };

    case 'SET_SELECTED_BOOKS':
      return { ...state, selectedBooks: action.payload, isDirty: true };

    case 'SET_FILE_NAME_FORM':
      return { ...state, fileNameForm: action.payload, isDirty: true };

    case 'SET_NORMALIZATION':
      return { ...state, normalization: action.payload, isDirty: true };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: action.payload.errors,
        tabsWithErrors: action.payload.tabsWithErrors,
      };

    default:
      return state;
  }
}

// ============================================================================
// Validation
// ============================================================================

/** Get a localized string value or return fallback */
function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

// TODO: Replace with real PAPI integration to fetch existing project short names
// (e.g., via a command like platformProjects.getExistingShortNames)
const EXISTING_PROJECT_SHORT_NAMES: string[] = ['PROJ1', 'TEST', 'DEMO', 'SAMPLE'];

function validateForm(
  state: ProjectFormState,
  localizedStrings: LanguageStrings,
): { errors: Record<string, string>; tabsWithErrors: string[] } {
  const errors: Record<string, string> = {};
  const tabsWithErrors: string[] = [];

  const lv = (key: LocalizeKey, fallback: string) =>
    getLocalizedValue(localizedStrings, key, fallback);

  // VAL-002: Full Name required
  if (!state.fullName || state.fullName.trim().length === 0) {
    errors.fullName = lv(
      '%platformProjects_validation_fullNameRequired%',
      'You must enter a full name',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  }

  // VAL-001: Short Name validation
  if (!state.shortName || state.shortName.trim().length === 0) {
    errors.shortName = lv(
      '%platformProjects_validation_shortNameRequired%',
      'Project name must be specified',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  } else {
    if (state.shortName.length < 3 || state.shortName.length > 8) {
      errors.shortName = lv(
        '%platformProjects_validation_shortNameLength%',
        'Short name must not be less than 3 or more than 8 characters in length',
      );
      if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
    }
    if (!/^[A-Za-z0-9_]+$/.test(state.shortName)) {
      errors.shortName = lv(
        '%platformProjects_validation_shortNameChars%',
        'Short name can only contain letters A-Z, digits 0-9, and underscores.',
      );
      if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
    }
    // VAL-001.6: Short Name uniqueness (only check if no format errors already)
    if (
      !errors.shortName &&
      EXISTING_PROJECT_SHORT_NAMES.some(
        (existing) => existing.toUpperCase() === state.shortName.toUpperCase(),
      )
    ) {
      errors.shortName = lv(
        '%platformProjects_validation_shortNameDuplicate%',
        'A project with this name already exists.',
      );
      if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
    }
  }

  // VAL-003: Project Type required
  if (!state.projectType) {
    errors.projectType = lv(
      '%platformProjects_validation_projectTypeRequired%',
      'Project type must be selected',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  }

  // VAL-004: Versification required
  if (!state.versification) {
    errors.versification = lv(
      '%platformProjects_validation_versificationRequired%',
      'Versification must be selected',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  }

  // VAL-005: Language required (conditional)
  if (state.typeRules.languageRequired && !state.languageId) {
    errors.language = lv(
      '%platformProjects_validation_languageRequired%',
      'Language must be selected',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  }

  // VAL-007: Base Project required (conditional)
  if (state.typeRules.baseProjectRequired && !state.baseProjectGuid) {
    errors.baseProject = lv(
      '%platformProjects_validation_baseProjectRequired%',
      'No base project specified',
    );
    if (!tabsWithErrors.includes('general')) tabsWithErrors.push('general');
  }

  // VAL-009: Book selection
  if (state.selectedBooks.length === 0) {
    errors.books = lv(
      '%platformProjects_validation_booksRequired%',
      'Specify all the books which will be in this project',
    );
    if (!tabsWithErrors.includes('books')) tabsWithErrors.push('books');
  }

  // VAL-006: File Name Pattern
  if (!state.fileNameForm || state.fileNameForm.trim().length === 0) {
    errors.fileNameForm = lv(
      '%platformProjects_validation_fileNameRequired%',
      'File naming convention must be specified',
    );
    if (!tabsWithErrors.includes('advanced')) tabsWithErrors.push('advanced');
  } else if (state.fileNameForm.toLowerCase().endsWith('.ptx')) {
    errors.fileNameForm = lv(
      '%platformProjects_validation_fileNameNoPtx%',
      'File naming convention cannot end with .ptx',
    );
    if (!tabsWithErrors.includes('advanced')) tabsWithErrors.push('advanced');
  }

  return { errors, tabsWithErrors };
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function ProjectPropertiesWebView(_webViewProps: WebViewProps) {
  const [state, dispatch] = useReducer(projectFormReducer, undefined, createInitialState);
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Helper for localized strings using type-safe LocalizeKey
  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Placeholder data for languages and base projects
  // In production, these would come from PAPI commands
  const languages: LanguageOption[] = useMemo(
    () => [
      { id: 'eng', name: 'English' },
      { id: 'fra', name: 'French' },
      { id: 'spa', name: 'Spanish' },
      { id: 'deu', name: 'German' },
      { id: 'por', name: 'Portuguese' },
      { id: 'zho', name: 'Chinese' },
      { id: 'arb', name: 'Arabic' },
      { id: 'hin', name: 'Hindi' },
    ],
    [],
  );

  const baseProjects: ProjectReference[] = useMemo(() => [], []);

  // Handlers
  const handleFullNameChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FULL_NAME', payload: value });
  }, []);

  const handleProjectTypeChange = useCallback((type: ProjectType) => {
    dispatch({ type: 'SET_PROJECT_TYPE', payload: type });
  }, []);

  const handleLanguageChange = useCallback((languageId: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: languageId });
  }, []);

  const handleVersificationChange = useCallback((versification: VersificationType) => {
    dispatch({ type: 'SET_VERSIFICATION', payload: versification });
  }, []);

  const handleBaseProjectChange = useCallback((guid: string) => {
    dispatch({ type: 'SET_BASE_PROJECT', payload: guid });
  }, []);

  const handleEditableChange = useCallback((checked: boolean) => {
    dispatch({ type: 'SET_EDITABLE', payload: checked });
  }, []);

  const handleSelectedBooksChange = useCallback((books: string[]) => {
    dispatch({ type: 'SET_SELECTED_BOOKS', payload: books });
  }, []);

  const handleFileNameFormChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FILE_NAME_FORM', payload: value });
  }, []);

  const handleNormalizationChange = useCallback((value: NormalizationType) => {
    dispatch({ type: 'SET_NORMALIZATION', payload: value });
  }, []);

  const handleEditNameClick = useCallback(() => {
    // Will open ProjectNameForm sub-dialog in future integration
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  const handleSubmit = useCallback(() => {
    const { errors, tabsWithErrors } = validateForm(state, localizedStrings);
    dispatch({
      type: 'SET_VALIDATION_ERRORS',
      payload: { errors, tabsWithErrors },
    });

    if (Object.keys(errors).length > 0) {
      // Switch to first tab with errors
      if (tabsWithErrors.length > 0) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: tabsWithErrors[0] });
      }
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    // In production: call platformProjects.createProject via PAPI
    // For now, just log and reset submitting
    setTimeout(() => {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }, 1000);
  }, [state, localizedStrings]);

  const handleCancel = useCallback(() => {
    // In production: close the dialog
  }, []);

  // Error ribbon
  const errorRibbonText = useMemo(() => {
    if (state.tabsWithErrors.length === 0) return undefined;
    const tabNames = state.tabsWithErrors
      .map((tab) => {
        switch (tab) {
          case 'general':
            return l('%platformProjects_tab_general%', 'General');
          case 'books':
            return l('%platformProjects_tab_books%', 'Books');
          case 'advanced':
            return l('%platformProjects_tab_advanced%', 'Advanced');
          default:
            return tab;
        }
      })
      .join(', ');

    const template = l('%platformProjects_errorRibbon_incompleteTabs%', 'Incomplete tab(s): {0}');
    return template.replace('{0}', tabNames);
  }, [state.tabsWithErrors, l]);

  const comingSoonText = l('%platformProjects_comingSoon%', 'Coming soon - not yet implemented');

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_projectProperties_title%', 'Create New Project')}
        </h2>

        {/* Error Ribbon */}
        {errorRibbonText && (
          <div className="tw-bg-destructive/10 tw-border tw-border-destructive tw-rounded tw-p-2 tw-text-destructive tw-text-sm">
            {errorRibbonText}
          </div>
        )}

        {/* Tabs */}
        <Tabs value={state.activeTab} onValueChange={handleTabChange} defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">
              {l('%platformProjects_tab_general%', 'General')}
            </TabsTrigger>
            <TabsTrigger value="books">{l('%platformProjects_tab_books%', 'Books')}</TabsTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value="associations" disabled>
                      {l('%platformProjects_tab_associations%', 'Associations')}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{comingSoonText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value="notes" disabled>
                      {l('%platformProjects_tab_notes%', 'Notes')}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{comingSoonText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TabsTrigger value="advanced">
              {l('%platformProjects_tab_advanced%', 'Advanced')}
            </TabsTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value="additions" disabled>
                      {l('%platformProjects_tab_additions%', 'Additions')}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{comingSoonText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>

          {/* General Tab Content */}
          <TabsContent value="general">
            <GeneralTab
              fullName={state.fullName}
              shortName={state.shortName}
              projectType={state.projectType}
              languageId={state.languageId}
              versification={state.versification}
              baseProjectGuid={state.baseProjectGuid}
              editable={state.editable}
              typeRules={state.typeRules}
              languages={languages}
              filteredBaseProjects={baseProjects}
              validationErrors={state.validationErrors}
              localizedStrings={localizedStrings}
              onFullNameChange={handleFullNameChange}
              onProjectTypeChange={handleProjectTypeChange}
              onLanguageChange={handleLanguageChange}
              onVersificationChange={handleVersificationChange}
              onBaseProjectChange={handleBaseProjectChange}
              onEditableChange={handleEditableChange}
              onEditNameClick={handleEditNameClick}
            />
          </TabsContent>

          {/* Books Tab Content */}
          <TabsContent value="books">
            <BooksTab
              selectedBooks={state.selectedBooks}
              onSelectedBooksChange={handleSelectedBooksChange}
              localizedStrings={localizedStrings}
              validationError={state.validationErrors.books}
            />
          </TabsContent>

          {/* Associations Tab Content (placeholder) */}
          <TabsContent value="associations">
            <div className="tw-p-4 tw-text-muted-foreground">{comingSoonText}</div>
          </TabsContent>

          {/* Notes Tab Content (placeholder) */}
          <TabsContent value="notes">
            <div className="tw-p-4 tw-text-muted-foreground">{comingSoonText}</div>
          </TabsContent>

          {/* Advanced Tab Content */}
          <TabsContent value="advanced">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
              {/* File Name Pattern */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="fileNameForm">
                  {l('%platformProjects_label_fileNamePattern%', 'Book Filename Pattern:')}
                </Label>
                <Input
                  id="fileNameForm"
                  value={state.fileNameForm}
                  onChange={(e) => handleFileNameFormChange(e.target.value)}
                  aria-label={l(
                    '%platformProjects_label_fileNamePattern%',
                    'Book Filename Pattern',
                  )}
                />
                {state.validationErrors.fileNameForm && (
                  <span className="tw-text-sm tw-text-destructive">
                    {state.validationErrors.fileNameForm}
                  </span>
                )}
              </div>

              {/* Normalization */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label>{l('%platformProjects_label_normalization%', 'Normalization:')}</Label>
                <Select
                  value={state.normalization}
                  onValueChange={(val: string) => {
                    if (val === 'Undefined' || val === 'NFD' || val === 'NFC') {
                      handleNormalizationChange(val);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undefined">
                      {l('%platformProjects_normalization_undefined%', 'Undefined')}
                    </SelectItem>
                    <SelectItem value="NFD">
                      {l('%platformProjects_normalization_nfd%', 'NFD')}
                    </SelectItem>
                    <SelectItem value="NFC">
                      {l('%platformProjects_normalization_nfc%', 'NFC')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Additions Tab Content (placeholder) */}
          <TabsContent value="additions">
            <div className="tw-p-4 tw-text-muted-foreground">{comingSoonText}</div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={state.isSubmitting}
          >
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={state.isSubmitting}>
            {state.isSubmitting ? <Spinner /> : l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
