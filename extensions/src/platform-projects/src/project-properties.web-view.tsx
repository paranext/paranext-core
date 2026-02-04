import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  usePromise,
} from 'platform-bible-react';
import { LocalizeKey, getErrorMessage } from 'platform-bible-utils';
import { useCallback, useMemo, useReducer, useRef, useState, useEffect } from 'react';
import type {
  ProjectOptionsResponse,
  ProjectPropertiesFormState,
  ProjectType,
  ProjectTypeRules,
  ProjectCreateRequest,
  ProjectCreateResult,
} from 'platform-projects';
import { GeneralTab } from './components/general-tab.component';
import { BooksTab } from './components/books-tab.component';
import { AssociationsTab } from './components/associations-tab.component';
import { NotesTab } from './components/notes-tab.component';
import { AdvancedTab } from './components/advanced-tab.component';
import { AdditionsTab } from './components/additions-tab.component';
import { StudyBibleTab } from './components/study-bible-tab.component';

// #region Localized Strings

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_title_create%',
  '%webView_projectProperties_title_edit%',
  '%webView_projectProperties_tab_general%',
  '%webView_projectProperties_tab_books%',
  '%webView_projectProperties_tab_associations%',
  '%webView_projectProperties_tab_notes%',
  '%webView_projectProperties_tab_advanced%',
  '%webView_projectProperties_tab_additions%',
  '%webView_projectProperties_tab_studyBible%',
  '%webView_projectProperties_button_create%',
  '%webView_projectProperties_button_save%',
  '%webView_projectProperties_button_cancel%',
  '%webView_projectProperties_error_ribbon%',
  '%webView_projectProperties_loading%',
  '%webView_projectProperties_error_load_options%',
];

// #endregion

// #region Helper Functions

/** Gets the default form state for a new project */
function getDefaultFormState(): ProjectPropertiesFormState {
  return {
    // General tab
    fullName: '',
    shortName: '',
    projectType: 'Standard',
    languageId: undefined,
    versification: 'English',
    baseProjectGuid: undefined,
    editable: true,
    encoderName: undefined,
    encoderReverseDirection: false,

    // Books tab
    selectedBooks: [],

    // Associations tab
    biblicalTermsListId: undefined,
    associatedLexicalProjectGuid: undefined,

    // Notes tab
    noteTags: [],

    // Advanced tab
    fileNameForm: '41MAT',
    normalization: 'NFC',

    // Study Bible tab
    studyBibleCategories: [],

    // UI state
    activeTab: 'general',
    isDirty: false,
    isSubmitting: false,
    validationErrors: {},
    tabsWithErrors: [],

    // Derived state
    showBaseProject: false,
    showEncoderFields: false,
    showStudyBibleTab: false,
    languageRequired: true,
    baseProjectRequired: false,
  };
}

// #endregion

// #region Reducer

type FormAction =
  | { type: 'SET_FIELD'; field: keyof ProjectPropertiesFormState; value: unknown }
  | { type: 'SET_PROJECT_TYPE'; projectType: ProjectType; rules: ProjectTypeRules }
  | { type: 'SET_VALIDATION_ERRORS'; errors: Record<string, string> }
  | { type: 'SET_TABS_WITH_ERRORS'; tabs: string[] }
  | { type: 'SET_ACTIVE_TAB'; tab: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

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
      const { projectType, rules } = action;
      return {
        ...state,
        projectType,
        showBaseProject: rules.showBasedOnDropdown,
        showEncoderFields: rules.showEncoderDropdown,
        languageRequired: !rules.inheritsLanguage && projectType !== 'StudyBibleAdditions',
        baseProjectRequired: rules.requiresBaseProject,
        editable: rules.defaultEditable,
        // Reset base project when changing type
        baseProjectGuid: undefined,
        // Reset encoder when changing type
        encoderName: undefined,
        encoderReverseDirection: false,
        isDirty: true,
      };
    }

    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: action.errors,
      };

    case 'SET_TABS_WITH_ERRORS':
      return {
        ...state,
        tabsWithErrors: action.tabs,
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
      return getDefaultFormState();

    default:
      return state;
  }
}

// #endregion

// #region API Functions

// Note: These commands will be registered by the backend
// These functions use sendCommand which is typed dynamically
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
const commands = papi.commands as any;

async function getProjectOptions(): Promise<ProjectOptionsResponse> {
  return commands.sendCommand('paratextProjectCreation.getProjectOptions');
}

async function getProjectTypeRules(projectType: ProjectType): Promise<ProjectTypeRules> {
  return commands.sendCommand('paratextProjectCreation.getProjectTypeRules', { projectType });
}

async function createProject(request: ProjectCreateRequest): Promise<ProjectCreateResult> {
  return commands.sendCommand('paratextProjectCreation.createProject', request);
}

// #endregion

globalThis.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Get mode from web view state
  const [mode] = useWebViewState<'create' | 'edit'>('mode', 'create');

  // Form state using reducer
  const [formState, dispatch] = useReducer(formReducer, getDefaultFormState());

  // Track if component is mounted
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Load project options
  const [optionsError, setOptionsError] = useState<Error | undefined>(undefined);
  const [projectOptions, isLoadingOptions] = usePromise(
    useCallback(async () => {
      try {
        setOptionsError(undefined);
        return await getProjectOptions();
      } catch (error) {
        logger.error(`Failed to load project options: ${getErrorMessage(error)}`);
        setOptionsError(error instanceof Error ? error : new Error(getErrorMessage(error)));
        // Return default value on error
        return {
          projectTypes: [],
          languages: [],
          versifications: [],
          baseProjects: [],
          encoders: [],
          biblicalTermsLists: [],
          lexicalProjects: [],
        };
      }
    }, []),
    useMemo(
      () => ({
        projectTypes: [],
        languages: [],
        versifications: [],
        baseProjects: [],
        encoders: [],
        biblicalTermsLists: [],
        lexicalProjects: [],
      }),
      [],
    ),
  );

  // Current project type rules state
  const [typeRules, setTypeRules] = useState<ProjectTypeRules | undefined>(undefined);

  // Handle project type change
  const handleProjectTypeChange = useCallback(async (projectType: ProjectType) => {
    try {
      const rules = await getProjectTypeRules(projectType);
      if (isMountedRef.current) {
        setTypeRules(rules);
        dispatch({ type: 'SET_PROJECT_TYPE', projectType, rules });
      }
    } catch (error) {
      logger.error(`Failed to get project type rules: ${getErrorMessage(error)}`);
    }
  }, []);

  // Initialize with Standard type rules on mount
  useEffect(() => {
    if (!isLoadingOptions && projectOptions.projectTypes.length > 0 && !typeRules) {
      handleProjectTypeChange('Standard');
    }
  }, [isLoadingOptions, projectOptions, typeRules, handleProjectTypeChange]);

  // Handle field changes
  const handleFieldChange = useCallback(
    (field: keyof ProjectPropertiesFormState, value: unknown) => {
      dispatch({ type: 'SET_FIELD', field, value });
    },
    [],
  );

  // Handle tab change
  const handleTabChange = useCallback((tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', tab });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });

    try {
      // Build the create request
      const request: ProjectCreateRequest = {
        shortName: formState.shortName,
        fullName: formState.fullName,
        projectType: formState.projectType ?? 'Standard',
        languageId: formState.languageId,
        versification: formState.versification ?? 'English',
        baseProjectGuid: formState.baseProjectGuid,
        editable: formState.editable,
        encoderName: formState.encoderName,
        encoderReverseDirection: formState.encoderReverseDirection,
        booksPresent: formState.selectedBooks,
        fileNameForm: formState.fileNameForm,
        normalization: formState.normalization,
        usfmVersion: 'Version3',
        noteTags: formState.noteTags,
        biblicalTermsListId: formState.biblicalTermsListId,
        associatedLexicalProjectGuid: formState.associatedLexicalProjectGuid,
        studyBibleCategories: formState.studyBibleCategories,
      };

      const result = await createProject(request);

      if (!isMountedRef.current) return;

      if (result.success) {
        logger.info(`Project created successfully: ${result.projectGuid}`);
        // Close the dialog or show success message
        // For now, just reset the form
        dispatch({ type: 'RESET' });
      } else {
        // Show error
        const errorField = result.error.field ?? 'general';
        dispatch({
          type: 'SET_VALIDATION_ERRORS',
          errors: { [errorField]: result.error.message },
        });

        // Determine which tab has the error
        if (
          errorField === 'shortName' ||
          errorField === 'fullName' ||
          errorField === 'projectType'
        ) {
          dispatch({ type: 'SET_TABS_WITH_ERRORS', tabs: ['general'] });
        }
      }
    } catch (error) {
      logger.error(`Failed to create project: ${getErrorMessage(error)}`);
      if (isMountedRef.current) {
        dispatch({
          type: 'SET_VALIDATION_ERRORS',
          errors: { general: getErrorMessage(error) },
        });
      }
    } finally {
      if (isMountedRef.current) {
        dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
      }
    }
  }, [formState]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Check if form is valid for submission
  const isFormValid = useMemo(() => {
    if (!formState.shortName || !formState.fullName || !formState.projectType) {
      return false;
    }
    if (formState.languageRequired && !formState.languageId) {
      return false;
    }
    if (formState.baseProjectRequired && !formState.baseProjectGuid) {
      return false;
    }
    if (formState.showEncoderFields && !formState.encoderName) {
      return false;
    }
    return Object.keys(formState.validationErrors).length === 0;
  }, [formState]);

  // Show loading state
  if (isLoadingOptions) {
    return (
      <div className="pr-twp tw-flex tw-h-full tw-items-center tw-justify-center">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
          <Spinner />
          <span className="tw-text-muted-foreground">
            {localizedStrings['%webView_projectProperties_loading%']}
          </span>
        </div>
      </div>
    );
  }

  // Show error state
  if (optionsError) {
    return (
      <div className="pr-twp tw-flex tw-h-full tw-items-center tw-justify-center">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2 tw-text-destructive">
          <span>{localizedStrings['%webView_projectProperties_error_load_options%']}</span>
          <span className="tw-text-sm tw-text-muted-foreground">
            {getErrorMessage(optionsError)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-flex tw-h-full tw-flex-col tw-gap-4 tw-p-4">
      {/* Error Ribbon */}
      {formState.tabsWithErrors.length > 0 && (
        <div className="tw-rounded-md tw-border tw-border-destructive tw-bg-destructive/10 tw-p-3 tw-text-sm tw-text-destructive">
          {localizedStrings['%webView_projectProperties_error_ribbon%']}:{' '}
          {formState.tabsWithErrors.join(', ')}
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={formState.activeTab}
        onValueChange={handleTabChange}
        className="tw-flex tw-flex-1 tw-flex-col"
      >
        <TabsList className="tw-w-full tw-justify-start">
          <TabsTrigger
            value="general"
            className={formState.tabsWithErrors.includes('general') ? 'tw-text-destructive' : ''}
          >
            {localizedStrings['%webView_projectProperties_tab_general%']}
          </TabsTrigger>
          <TabsTrigger
            value="books"
            className={formState.tabsWithErrors.includes('books') ? 'tw-text-destructive' : ''}
          >
            {localizedStrings['%webView_projectProperties_tab_books%']}
          </TabsTrigger>
          <TabsTrigger
            value="associations"
            className={
              formState.tabsWithErrors.includes('associations') ? 'tw-text-destructive' : ''
            }
          >
            {localizedStrings['%webView_projectProperties_tab_associations%']}
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className={formState.tabsWithErrors.includes('notes') ? 'tw-text-destructive' : ''}
          >
            {localizedStrings['%webView_projectProperties_tab_notes%']}
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className={formState.tabsWithErrors.includes('advanced') ? 'tw-text-destructive' : ''}
          >
            {localizedStrings['%webView_projectProperties_tab_advanced%']}
          </TabsTrigger>
          <TabsTrigger
            value="additions"
            className={formState.tabsWithErrors.includes('additions') ? 'tw-text-destructive' : ''}
          >
            {localizedStrings['%webView_projectProperties_tab_additions%']}
          </TabsTrigger>
          {formState.showStudyBibleTab && (
            <TabsTrigger
              value="studyBible"
              className={
                formState.tabsWithErrors.includes('studyBible') ? 'tw-text-destructive' : ''
              }
            >
              {localizedStrings['%webView_projectProperties_tab_studyBible%']}
            </TabsTrigger>
          )}
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="tw-flex-1 tw-overflow-auto">
          <GeneralTab
            formState={formState}
            projectOptions={projectOptions}
            onFieldChange={handleFieldChange}
            onProjectTypeChange={handleProjectTypeChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
            mode={mode}
          />
        </TabsContent>

        {/* Books Tab */}
        <TabsContent value="books" className="tw-flex-1 tw-overflow-auto">
          <BooksTab
            formState={formState}
            onFieldChange={handleFieldChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
          />
        </TabsContent>

        {/* Associations Tab */}
        <TabsContent value="associations" className="tw-flex-1 tw-overflow-auto">
          <AssociationsTab
            formState={formState}
            projectOptions={projectOptions}
            onFieldChange={handleFieldChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
          />
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="tw-flex-1 tw-overflow-auto">
          <NotesTab
            formState={formState}
            onFieldChange={handleFieldChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
          />
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="tw-flex-1 tw-overflow-auto">
          <AdvancedTab
            formState={formState}
            onFieldChange={handleFieldChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
          />
        </TabsContent>

        {/* Additions Tab */}
        <TabsContent value="additions" className="tw-flex-1 tw-overflow-auto">
          <AdditionsTab
            formState={formState}
            onFieldChange={handleFieldChange}
            validationErrors={formState.validationErrors}
            isDisabled={formState.isSubmitting}
          />
        </TabsContent>

        {/* Study Bible Tab */}
        {formState.showStudyBibleTab && (
          <TabsContent value="studyBible" className="tw-flex-1 tw-overflow-auto">
            <StudyBibleTab
              formState={formState}
              onFieldChange={handleFieldChange}
              validationErrors={formState.validationErrors}
              isDisabled={formState.isSubmitting}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-pt-4">
        <Button variant="outline" onClick={handleCancel} disabled={formState.isSubmitting}>
          {localizedStrings['%webView_projectProperties_button_cancel%']}
        </Button>
        <Button onClick={handleSubmit} disabled={formState.isSubmitting || !isFormValid}>
          {formState.isSubmitting && (
            <>
              <Spinner />
              <span className="tw-ml-2">
                {mode === 'create'
                  ? localizedStrings['%webView_projectProperties_button_create%']
                  : localizedStrings['%webView_projectProperties_button_save%']}
              </span>
            </>
          )}
          {!formState.isSubmitting && mode === 'create'
            ? localizedStrings['%webView_projectProperties_button_create%']
            : undefined}
          {!formState.isSubmitting && mode === 'edit'
            ? localizedStrings['%webView_projectProperties_button_save%']
            : undefined}
        </Button>
      </div>
    </div>
  );
};
