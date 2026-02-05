/**
 * === NEW IN PT10 === Reason: React component - WebViews don't exist in PT9's WinForms architecture
 * Maps to: UI-PKG-001
 */

import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Label,
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
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { BooksTab } from './components/books-tab.component';
import {
  EncoderOption,
  GeneralTab,
  LanguageOption,
  ProjectReference,
} from './components/general-tab.component';
import {
  CANON_BOOKS,
  isDerivedType,
  LOCALIZED_STRINGS,
  ProjectType,
  requiresEncoder,
  requiresLanguage,
  validateFullName,
  validateShortName,
  VersificationType,
} from './project-properties.utils';

// ============================================================================
// STATE TYPES
// ============================================================================

interface ProjectPropertiesFormState {
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

  // UI state
  activeTab: string;
  isDirty: boolean;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
  tabsWithErrors: string[];

  // Options loaded from backend
  languages: LanguageOption[];
  baseProjects: ProjectReference[];
  encoders: EncoderOption[];
  isLoadingOptions: boolean;
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof ProjectPropertiesFormState; value: unknown }
  | { type: 'SET_PROJECT_TYPE'; projectType: ProjectType }
  | { type: 'SET_VALIDATION_ERRORS'; errors: Record<string, string> }
  | { type: 'SET_OPTIONS'; options: Partial<ProjectPropertiesFormState> }
  | { type: 'SET_ACTIVE_TAB'; tab: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: ProjectPropertiesFormState = {
  fullName: '',
  shortName: '',
  projectType: undefined,
  languageId: undefined,
  versification: 'English',
  baseProjectGuid: undefined,
  editable: true,
  encoderName: undefined,
  encoderReverseDirection: false,
  selectedBooks: CANON_BOOKS.map((b) => b.id), // All books selected by default
  fileNameForm: '41MAT{project}.SFM',
  activeTab: 'general',
  isDirty: false,
  isSubmitting: false,
  validationErrors: {},
  tabsWithErrors: [],
  languages: [],
  baseProjects: [],
  encoders: [],
  isLoadingOptions: true,
};

// ============================================================================
// REDUCER
// ============================================================================

function formReducer(
  state: ProjectPropertiesFormState,
  action: FormAction,
): ProjectPropertiesFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        isDirty: true,
      };

    case 'SET_PROJECT_TYPE': {
      // Handle cascading changes when project type changes (EXT-001 state machine)
      const newType = action.projectType;
      const showBaseProject = isDerivedType(newType);
      const needsEncoder = requiresEncoder(newType);

      return {
        ...state,
        projectType: newType,
        // Clear base project if not needed
        baseProjectGuid: showBaseProject ? state.baseProjectGuid : undefined,
        // Set editable to false for TransliterationWithEncoder
        editable: needsEncoder ? false : state.editable,
        // Clear encoder fields if not needed
        encoderName: needsEncoder ? state.encoderName : undefined,
        encoderReverseDirection: needsEncoder ? state.encoderReverseDirection : false,
        isDirty: true,
      };
    }

    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: action.errors,
        tabsWithErrors: Object.keys(action.errors).length > 0 ? ['general'] : [],
      };

    case 'SET_OPTIONS':
      return {
        ...state,
        ...action.options,
        isLoadingOptions: false,
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.tab,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// ============================================================================
// WEB VIEW COMPONENT
// ============================================================================

global.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Get mode from web view state
  const [mode] = useWebViewState<'create' | 'edit'>('mode', 'create');
  const isEditMode = mode === 'edit';

  // Track if we've attempted to submit (for validation display)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // ============================================================================
  // LOAD OPTIONS ON MOUNT
  // ============================================================================

  useEffect(() => {
    const loadOptions = async () => {
      try {
        // Try to call backend for options - if not available, use mock data
        let options: Partial<ProjectPropertiesFormState>;

        try {
          // Attempt real PAPI call (no arguments)
          const response = await papi.commands.sendCommand('platformProjects.getProjectOptions');
          options = {
            languages: response?.languages || [],
            baseProjects: response?.baseProjects || [],
            encoders: response?.encoders || [],
          };
        } catch {
          // Backend not available - use mock data for development
          logger.debug('Backend not available, using mock data for project options');
          options = {
            languages: [
              { id: 'eng', name: 'English', isRightToLeft: false },
              { id: 'spa', name: 'Spanish', isRightToLeft: false },
              { id: 'fra', name: 'French', isRightToLeft: false },
              { id: 'deu', name: 'German', isRightToLeft: false },
              { id: 'arb', name: 'Arabic', isRightToLeft: true },
              { id: 'zho', name: 'Chinese', isRightToLeft: false },
            ],
            baseProjects: [
              {
                guid: 'proj-1',
                shortName: 'NASB',
                fullName: 'New American Standard Bible',
                projectType: 'Standard',
              },
              {
                guid: 'proj-2',
                shortName: 'NIV',
                fullName: 'New International Version',
                projectType: 'Standard',
              },
            ],
            encoders: [
              { name: 'utf8', displayName: 'UTF-8', isBidirectional: false },
              { name: 'legacy', displayName: 'Legacy Encoding', isBidirectional: true },
            ],
          };
        }

        dispatch({ type: 'SET_OPTIONS', options });
      } catch (error) {
        logger.error('Failed to load project options:', error);
        dispatch({
          type: 'SET_OPTIONS',
          options: { languages: [], baseProjects: [], encoders: [] },
        });
      }
    };

    loadOptions();
  }, []);

  // ============================================================================
  // VALIDATION
  // ============================================================================

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    // VAL-001: Short name
    const shortNameResult = validateShortName(state.shortName);
    if (!shortNameResult.isValid && shortNameResult.error) {
      errors.shortName = shortNameResult.error;
    }

    // VAL-002: Full name
    const fullNameResult = validateFullName(state.fullName);
    if (!fullNameResult.isValid && fullNameResult.error) {
      errors.fullName = fullNameResult.error;
    }

    // VAL-003: Project type
    if (!state.projectType) {
      errors.projectType =
        localizedStrings['%webView_projectProperties_error_projectTypeRequired%'] ||
        'Project type must be selected';
    }

    // VAL-004: Versification
    if (!state.versification) {
      errors.versification =
        localizedStrings['%webView_projectProperties_error_versificationRequired%'] ||
        'Versification must be selected';
    }

    // VAL-005: Language (conditional)
    if (requiresLanguage(state.projectType) && !state.languageId) {
      errors.language =
        localizedStrings['%webView_projectProperties_error_languageRequired%'] ||
        'Language must be selected';
    }

    // VAL-007: Base project (conditional)
    if (isDerivedType(state.projectType) && !state.baseProjectGuid) {
      errors.baseProject =
        localizedStrings['%webView_projectProperties_error_baseProjectRequired%'] ||
        'No base project specified';
    }

    // VAL-008: Encoder (conditional)
    if (requiresEncoder(state.projectType) && !state.encoderName) {
      errors.encoder =
        localizedStrings['%webView_projectProperties_error_encoderRequired%'] ||
        'Encoding converter must be selected';
    }

    // VAL-009: Books
    if (state.selectedBooks.length === 0) {
      errors.books =
        localizedStrings['%webView_projectProperties_error_booksRequired%'] ||
        'Specify all the books which will be in this project';
    }

    dispatch({ type: 'SET_VALIDATION_ERRORS', errors });
    return Object.keys(errors).length === 0;
  }, [state, localizedStrings]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleFullNameChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FIELD', field: 'fullName', value });
  }, []);

  const handleProjectTypeChange = useCallback((value: ProjectType) => {
    dispatch({ type: 'SET_PROJECT_TYPE', projectType: value });
  }, []);

  const handleLanguageChange = useCallback((value: string | null) => {
    dispatch({ type: 'SET_FIELD', field: 'languageId', value });
  }, []);

  const handleVersificationChange = useCallback((value: VersificationType) => {
    dispatch({ type: 'SET_FIELD', field: 'versification', value });
  }, []);

  const handleBaseProjectChange = useCallback((value: string | null) => {
    dispatch({ type: 'SET_FIELD', field: 'baseProjectGuid', value });
  }, []);

  const handleEditableChange = useCallback((value: boolean) => {
    dispatch({ type: 'SET_FIELD', field: 'editable', value });
  }, []);

  const handleEncoderChange = useCallback((value: string | null) => {
    dispatch({ type: 'SET_FIELD', field: 'encoderName', value });
  }, []);

  const handleEncoderReverseDirectionChange = useCallback((value: boolean) => {
    dispatch({ type: 'SET_FIELD', field: 'encoderReverseDirection', value });
  }, []);

  const handleBooksChange = useCallback((books: string[]) => {
    dispatch({ type: 'SET_FIELD', field: 'selectedBooks', value: books });
  }, []);

  const handleEditNameClick = useCallback(() => {
    // This would open the ProjectNameForm sub-dialog (UI-PKG-002)
    // For now, just log - will be implemented in UI-PKG-002
    logger.info('Edit Name clicked - ProjectNameForm to be implemented in UI-PKG-002');
  }, []);

  const handleLanguageSettingsClick = useCallback(() => {
    // This would open the LanguageSettingsForm sub-dialog (UI-PKG-003)
    logger.info('Language Settings clicked - LanguageSettingsForm to be implemented in UI-PKG-003');
  }, []);

  const handleSubmit = useCallback(async () => {
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      // Switch to first tab with errors
      dispatch({ type: 'SET_ACTIVE_TAB', tab: 'general' });
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });

    try {
      // Build the request - validation ensures these are non-null
      if (!state.projectType || !state.versification) {
        logger.error('Missing required fields');
        return;
      }

      const createRequest = {
        shortName: state.shortName,
        fullName: state.fullName,
        projectType: state.projectType,
        languageId: state.languageId,
        versification: state.versification,
        baseProjectGuid: state.baseProjectGuid,
        editable: state.editable,
        encoderName: state.encoderName,
        encoderReverseDirection: state.encoderReverseDirection,
        booksPresent: state.selectedBooks,
        fileNameForm: state.fileNameForm,
      };

      // Call backend to create project
      try {
        await papi.commands.sendCommand('platformProjects.createProject', createRequest);
        logger.info('Project created successfully');
        // Close the dialog or show success message
      } catch (error) {
        logger.error('Failed to create project:', error);
        // Show error to user
      }
    } finally {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  }, [state, validateForm]);

  const handleCancel = useCallback(() => {
    logger.info('Cancel clicked');
    // Close the web view
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', tab });
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================

  // Loading state
  if (state.isLoadingOptions) {
    return (
      <div className="pr-twp tw-h-screen tw-box-border tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
        <Spinner />
        <Label>{localizedStrings['%webView_projectProperties_loading%'] || 'Loading...'}</Label>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Title */}
      <div className="tw-p-4 tw-border-b tw-border-border">
        <h1 className="tw-text-lg tw-font-semibold tw-text-foreground">
          {isEditMode
            ? localizedStrings['%webView_projectProperties_title_edit%'] || 'Edit Project'
            : localizedStrings['%webView_projectProperties_title_create%'] || 'Create New Project'}
        </h1>
      </div>

      {/* Error ribbon */}
      {hasAttemptedSubmit && state.tabsWithErrors.length > 0 && (
        <div className="tw-p-2 tw-bg-destructive/10 tw-border-b tw-border-destructive">
          <Label className="tw-text-sm tw-text-destructive">
            Incomplete tab(s): {state.tabsWithErrors.join(', ')}
          </Label>
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={state.activeTab}
        onValueChange={handleTabChange}
        className="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden"
      >
        <TabsList className="tw-w-full tw-justify-start tw-border-b tw-border-border tw-bg-background tw-rounded-none">
          <TabsTrigger value="general">
            {localizedStrings['%webView_projectProperties_tab_general%'] || 'General'}
          </TabsTrigger>
          <TabsTrigger value="books">
            {localizedStrings['%webView_projectProperties_tab_books%'] || 'Books'}
          </TabsTrigger>

          {/* Disabled tabs with tooltips */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger value="associations" disabled>
                    {localizedStrings['%webView_projectProperties_tab_associations%'] ||
                      'Associations'}
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%webView_projectProperties_tooltip_tabNotImplemented%'] ||
                  'This tab is not yet available'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger value="notes" disabled>
                    {localizedStrings['%webView_projectProperties_tab_notes%'] || 'Notes'}
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%webView_projectProperties_tooltip_tabNotImplemented%'] ||
                  'This tab is not yet available'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger value="advanced" disabled>
                    {localizedStrings['%webView_projectProperties_tab_advanced%'] || 'Advanced'}
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%webView_projectProperties_tooltip_tabNotImplemented%'] ||
                  'This tab is not yet available'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger value="additions" disabled>
                    {localizedStrings['%webView_projectProperties_tab_additions%'] || 'Additions'}
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%webView_projectProperties_tooltip_tabNotImplemented%'] ||
                  'This tab is not yet available'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>

        {/* Tab content */}
        <div className="tw-flex-1 tw-overflow-y-auto">
          <TabsContent value="general" className="tw-m-0">
            <GeneralTab
              fullName={state.fullName}
              shortName={state.shortName}
              projectType={state.projectType}
              languageId={state.languageId}
              versification={state.versification}
              baseProjectGuid={state.baseProjectGuid}
              editable={state.editable}
              encoderName={state.encoderName}
              encoderReverseDirection={state.encoderReverseDirection}
              languages={state.languages}
              baseProjects={state.baseProjects}
              encoders={state.encoders}
              validationErrors={hasAttemptedSubmit ? state.validationErrors : {}}
              onFullNameChange={handleFullNameChange}
              onProjectTypeChange={handleProjectTypeChange}
              onLanguageChange={handleLanguageChange}
              onVersificationChange={handleVersificationChange}
              onBaseProjectChange={handleBaseProjectChange}
              onEditableChange={handleEditableChange}
              onEncoderChange={handleEncoderChange}
              onEncoderReverseDirectionChange={handleEncoderReverseDirectionChange}
              onEditNameClick={handleEditNameClick}
              onLanguageSettingsClick={handleLanguageSettingsClick}
              localizedStrings={localizedStrings}
              isEditMode={isEditMode}
            />
          </TabsContent>

          <TabsContent value="books" className="tw-m-0">
            <BooksTab
              selectedBooks={state.selectedBooks}
              onSelectionChange={handleBooksChange}
              localizedStrings={localizedStrings}
              validationError={hasAttemptedSubmit ? state.validationErrors.books : undefined}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer with actions */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={state.isSubmitting}
        >
          {localizedStrings['%webView_projectProperties_button_cancel%'] || 'Cancel'}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={state.isSubmitting}>
          {state.isSubmitting ? <Spinner className="tw-mr-2 tw-h-4 tw-w-4" /> : undefined}
          {localizedStrings['%webView_projectProperties_button_ok%'] || 'OK'}
        </Button>
      </div>
    </div>
  );
};
