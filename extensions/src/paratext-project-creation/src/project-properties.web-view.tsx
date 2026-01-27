import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  Alert,
  AlertDescription,
  Button,
  cn,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import type {
  CreateProjectRequest,
  CreateProjectResult,
  EncodingInfo,
  LanguageSelectionResult,
  ProjectNameFormResult,
  ProjectNormalization,
  ProjectReference,
  ProjectType,
  ProjectTypeConfiguration,
  RegistrationInfo,
  RegistrationState,
  VersificationType,
} from 'paratext-project-creation';
import { GeneralTab } from './components/general-tab.component';
import { BooksTab } from './components/books-tab.component';
import { AdvancedTab } from './components/advanced-tab.component';

// =====================================================
// State & Reducer
// =====================================================

export interface ValidationMessage {
  severity: 'error' | 'warning' | 'info';
  message: string;
}

interface FormState {
  // Mode
  mode: 'new' | 'edit';
  projectId: string | null;

  // Active tab
  activeTab: string;

  // General tab - Name
  fullName: string;
  shortName: string;
  copyright: string;

  // General tab - Language
  languageId: string;
  languageName: string;

  // General tab - Versification
  versification: VersificationType;
  hasCustomVersification: boolean;

  // General tab - Project type
  projectType: ProjectType;

  // General tab - Base project
  baseProjectGuid: string | null;
  availableBaseProjects: ProjectReference[];

  // General tab - Registration
  registrationState: RegistrationState | null;
  currentRegistration: RegistrationInfo | null;

  // General tab - Encoding
  encodingConverter: string | null;
  encoderReverseDirection: boolean;

  // General tab - Editable
  editable: boolean;

  // Books tab
  plannedBooks: number[];

  // Advanced tab
  normalization: ProjectNormalization;
  usfmVersion: number;

  // Type configuration
  typeConfig: ProjectTypeConfiguration | null;

  // UI state
  loading: boolean;
  error: string | null;
  validationMessages: ValidationMessage[];

  // Derived
  minParatextVersion: string;
}

type FormAction =
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectType }
  | { type: 'SET_TYPE_CONFIG'; payload: ProjectTypeConfiguration }
  | { type: 'SET_BASE_PROJECT'; payload: string | null }
  | { type: 'SET_BASE_PROJECTS'; payload: ProjectReference[] }
  | { type: 'SET_NAME_RESULT'; payload: ProjectNameFormResult }
  | { type: 'SET_LANGUAGE_RESULT'; payload: LanguageSelectionResult }
  | { type: 'SET_ENCODING'; payload: EncodingInfo | null }
  | { type: 'SET_ENCODER_REVERSE'; payload: boolean }
  | { type: 'SET_VERSIFICATION'; payload: VersificationType }
  | { type: 'SET_NORMALIZATION'; payload: ProjectNormalization }
  | { type: 'SET_USFM_VERSION'; payload: number }
  | { type: 'SET_EDITABLE'; payload: boolean }
  | { type: 'SET_PLANNED_BOOKS'; payload: number[] }
  | { type: 'SET_REGISTRATION_STATE'; payload: RegistrationState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string };

function createInitialState(mode: 'new' | 'edit', projectId: string | null): FormState {
  return {
    mode,
    projectId,
    activeTab: 'general',
    fullName: '',
    shortName: '',
    copyright: '',
    languageId: '',
    languageName: '',
    versification: 'English',
    hasCustomVersification: false,
    projectType: 'NotSelected',
    baseProjectGuid: null,
    availableBaseProjects: [],
    registrationState: null,
    currentRegistration: null,
    encodingConverter: null,
    encoderReverseDirection: false,
    editable: true,
    plannedBooks: [],
    normalization: 'NFC',
    usfmVersion: 3,
    typeConfig: null,
    loading: false,
    error: null,
    validationMessages: [],
    minParatextVersion: '',
  };
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_PROJECT_TYPE':
      return {
        ...state,
        projectType: action.payload,
        // Reset base project when type changes
        baseProjectGuid: null,
        availableBaseProjects: [],
      };
    case 'SET_TYPE_CONFIG':
      return {
        ...state,
        typeConfig: action.payload,
        editable: action.payload.editableDefault,
      };
    case 'SET_BASE_PROJECT':
      return { ...state, baseProjectGuid: action.payload };
    case 'SET_BASE_PROJECTS':
      return { ...state, availableBaseProjects: action.payload };
    case 'SET_NAME_RESULT':
      return {
        ...state,
        fullName: action.payload.fullName,
        shortName: action.payload.shortName,
        copyright: action.payload.copyright,
      };
    case 'SET_LANGUAGE_RESULT':
      return {
        ...state,
        languageId: action.payload.languageId,
        languageName: action.payload.languageName,
      };
    case 'SET_ENCODING':
      return {
        ...state,
        encodingConverter: action.payload?.name ?? null,
      };
    case 'SET_ENCODER_REVERSE':
      return { ...state, encoderReverseDirection: action.payload };
    case 'SET_VERSIFICATION':
      return { ...state, versification: action.payload };
    case 'SET_NORMALIZATION':
      return { ...state, normalization: action.payload };
    case 'SET_USFM_VERSION':
      return { ...state, usfmVersion: action.payload };
    case 'SET_EDITABLE':
      return { ...state, editable: action.payload };
    case 'SET_PLANNED_BOOKS':
      return { ...state, plannedBooks: action.payload };
    case 'SET_REGISTRATION_STATE':
      return { ...state, registrationState: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}

// =====================================================
// Helpers
// =====================================================

/** Project types for which the Books tab is hidden */
const BOOKS_TAB_HIDDEN_TYPES: ProjectType[] = [
  'ConsultantNotes',
  'Resource',
  'XmlResource',
  'MarbleResource',
  'EnhancedResource',
];

/** Check if a project type shows the Study Bible tab (edit mode only) */
function isStudyBibleType(projectType: ProjectType): boolean {
  return projectType === 'StudyBibleAdditions';
}

// =====================================================
// Web View Component
// =====================================================

globalThis.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  // Read mode and projectId from web view state
  const [mode] = useWebViewState<'new' | 'edit'>('mode', 'new');
  const [projectId] = useWebViewState<string | null>('projectId', null);

  const [state, dispatch] = useReducer(formReducer, null, () =>
    createInitialState(mode, projectId),
  );

  // ---- Side effects: fetch type configuration when project type changes ----
  useEffect(() => {
    if (state.projectType === 'NotSelected') return;

    let cancelled = false;
    (async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const config = await papi.commands.sendCommand(
          'paratextProjectCreation.getTypeConfiguration',
          state.projectType,
        );
        if (!cancelled) {
          dispatch({ type: 'SET_TYPE_CONFIG', payload: config });
        }
      } catch (e) {
        if (!cancelled) {
          logger.warn(`Failed to get type configuration: ${getErrorMessage(e)}`);
        }
      } finally {
        if (!cancelled) dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state.projectType]);

  // ---- Side effects: fetch valid base projects when type changes ----
  useEffect(() => {
    if (!state.typeConfig?.baseProjectRequired) return;

    let cancelled = false;
    (async () => {
      try {
        const projects = await papi.commands.sendCommand(
          'paratextProjectCreation.getValidBaseProjects',
          state.projectType,
        );
        if (!cancelled) {
          dispatch({ type: 'SET_BASE_PROJECTS', payload: projects });
        }
      } catch (e) {
        if (!cancelled) {
          logger.warn(`Failed to get base projects: ${getErrorMessage(e)}`);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state.projectType, state.typeConfig?.baseProjectRequired]);

  // ---- Side effects: fetch registration state ----
  useEffect(() => {
    if (state.projectType === 'NotSelected') return;

    let cancelled = false;
    (async () => {
      try {
        const regState = await papi.commands.sendCommand(
          'paratextProjectCreation.getRegistrationState',
          state.projectId ?? undefined,
          state.baseProjectGuid ?? undefined,
          state.projectType,
        );
        if (!cancelled) {
          dispatch({ type: 'SET_REGISTRATION_STATE', payload: regState });
        }
      } catch (e) {
        if (!cancelled) {
          logger.warn(`Failed to get registration state: ${getErrorMessage(e)}`);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state.projectType, state.baseProjectGuid, state.projectId]);

  // ---- Tab visibility ----
  const showBooksTab = useMemo(
    () =>
      state.typeConfig
        ? state.typeConfig.booksTabVisible
        : !BOOKS_TAB_HIDDEN_TYPES.includes(state.projectType),
    [state.typeConfig, state.projectType],
  );

  const showStudyBibleTab = useMemo(
    () => state.mode === 'edit' && isStudyBibleType(state.projectType),
    [state.mode, state.projectType],
  );

  // ---- Event handlers ----
  const handleProjectTypeChange = useCallback((value: string) => {
    dispatch({ type: 'SET_PROJECT_TYPE', payload: value as ProjectType });
  }, []);

  const handleBaseProjectChange = useCallback((guid: string | null) => {
    dispatch({ type: 'SET_BASE_PROJECT', payload: guid });
  }, []);

  const handleNameResult = useCallback((result: ProjectNameFormResult) => {
    dispatch({ type: 'SET_NAME_RESULT', payload: result });
  }, []);

  const handleLanguageResult = useCallback((result: LanguageSelectionResult) => {
    dispatch({ type: 'SET_LANGUAGE_RESULT', payload: result });
  }, []);

  const handleVersificationChange = useCallback((value: string) => {
    dispatch({ type: 'SET_VERSIFICATION', payload: value as VersificationType });
  }, []);

  const handleEncodingChange = useCallback((encoding: EncodingInfo | null) => {
    dispatch({ type: 'SET_ENCODING', payload: encoding });
  }, []);

  const handleEncoderReverseChange = useCallback((reverse: boolean) => {
    dispatch({ type: 'SET_ENCODER_REVERSE', payload: reverse });
  }, []);

  const handleEditableChange = useCallback((value: boolean) => {
    dispatch({ type: 'SET_EDITABLE', payload: value });
  }, []);

  const handlePlannedBooksChange = useCallback((books: number[]) => {
    dispatch({ type: 'SET_PLANNED_BOOKS', payload: books });
  }, []);

  const handleNormalizationChange = useCallback((value: ProjectNormalization) => {
    dispatch({ type: 'SET_NORMALIZATION', payload: value });
  }, []);

  const handleUsfmVersionChange = useCallback((value: number) => {
    dispatch({ type: 'SET_USFM_VERSION', payload: value });
  }, []);

  // ---- OK / Cancel ----
  const canSubmit = useMemo(() => {
    if (state.projectType === 'NotSelected') return false;
    if (!state.shortName) return false;
    if (!state.fullName) return false;
    // GAP-004: languageId must be set
    if (!state.languageId) return false;
    // GAP-001: base project required for derived types
    if (state.typeConfig?.baseProjectRequired && !state.baseProjectGuid) return false;
    // GAP-003: encoding converter required for TransliterationWithEncoder
    if (state.projectType === 'TransliterationWithEncoder' && !state.encodingConverter)
      return false;
    return true;
  }, [
    state.projectType,
    state.shortName,
    state.fullName,
    state.languageId,
    state.typeConfig,
    state.baseProjectGuid,
    state.encodingConverter,
  ]);

  const handleOk = useCallback(async () => {
    if (!canSubmit) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const request: CreateProjectRequest = {
        shortName: state.shortName,
        fullName: state.fullName,
        languageId: state.languageId,
        versification: state.versification,
        projectType: state.projectType,
        baseProjectGuid: state.baseProjectGuid ?? undefined,
        copyright: state.copyright || undefined,
        normalization: state.normalization,
        usfmVersion: state.usfmVersion,
        editable: state.editable,
        encodingConverter: state.encodingConverter ?? undefined,
        encoderReverseDirection: state.encoderReverseDirection || undefined,
      };

      let result: CreateProjectResult;
      if (state.mode === 'new') {
        result = await papi.commands.sendCommand('paratextProjectCreation.createProject', request);
      } else {
        // GAP-002: edit mode uses updateProject command
        result = await papi.commands.sendCommand('paratextProjectCreation.updateProject', {
          ...request,
          projectId: state.projectId,
        });
      }

      if (!result.success) {
        dispatch({ type: 'SET_ERROR', payload: result.errorMessage ?? 'Project creation failed' });
      }
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: getErrorMessage(e) });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [canSubmit, state]);

  const handleCancel = useCallback(async () => {
    // If a project was partially created in new mode, clean up
    if (state.mode === 'new' && state.projectId) {
      try {
        await papi.commands.sendCommand(
          'paratextProjectCreation.cleanupProject',
          state.projectId,
          false,
        );
      } catch (e) {
        logger.warn(`Failed to cleanup project: ${getErrorMessage(e)}`);
      }
    }
  }, [state.mode, state.projectId]);

  // ---- Validation messages (GAP-007) ----
  const validationMessages = useMemo(() => {
    const messages: ValidationMessage[] = [];
    if (state.error) {
      messages.push({ severity: 'error', message: state.error });
    }
    if (state.projectType === 'NotSelected') {
      messages.push({ severity: 'warning', message: 'Please select a project type.' });
    }
    if (!state.fullName) {
      messages.push({ severity: 'warning', message: 'Full name is required.' });
    }
    if (!state.shortName) {
      messages.push({ severity: 'warning', message: 'Short name is required.' });
    }
    if (!state.languageId) {
      messages.push({ severity: 'info', message: 'Language must be selected.' });
    }
    if (state.typeConfig?.baseProjectRequired && !state.baseProjectGuid) {
      messages.push({
        severity: 'warning',
        message: 'A base project must be selected for this project type.',
      });
    }
    if (state.projectType === 'TransliterationWithEncoder' && !state.encodingConverter) {
      messages.push({
        severity: 'warning',
        message: 'An encoding converter must be selected for transliteration projects.',
      });
    }
    return messages;
  }, [
    state.error,
    state.projectType,
    state.fullName,
    state.shortName,
    state.languageId,
    state.typeConfig,
    state.baseProjectGuid,
    state.encodingConverter,
  ]);

  // ---- Render ----
  const title = state.mode === 'new' ? 'New Project' : `Project properties: ${state.fullName}`;

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-h-screen')}>
      {/* Header */}
      <div className="tw-p-4 tw-pb-0">
        <h2 className="tw-text-lg tw-font-semibold">{title}</h2>
      </div>

      {/* Tabs */}
      <div className="tw-flex-1 tw-overflow-auto tw-p-4">
        <Tabs
          value={state.activeTab}
          onValueChange={(val) => dispatch({ type: 'SET_ACTIVE_TAB', payload: val })}
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            {showBooksTab && <TabsTrigger value="books">Books</TabsTrigger>}
            <TabsTrigger value="associations">Associations</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            {showStudyBibleTab && <TabsTrigger value="studybible">Study Bible</TabsTrigger>}
          </TabsList>

          <TabsContent value="general" className="tw-mt-4">
            <GeneralTab
              fullName={state.fullName}
              shortName={state.shortName}
              copyright={state.copyright}
              onNameResult={handleNameResult}
              languageId={state.languageId}
              languageName={state.languageName}
              onLanguageResult={handleLanguageResult}
              versification={state.versification}
              onVersificationChange={handleVersificationChange}
              hasCustomVersification={state.hasCustomVersification}
              projectType={state.projectType}
              onProjectTypeChange={handleProjectTypeChange}
              baseProjectGuid={state.baseProjectGuid}
              availableBaseProjects={state.availableBaseProjects}
              onBaseProjectChange={handleBaseProjectChange}
              typeConfig={state.typeConfig}
              registrationState={state.registrationState}
              registrationControlProps={{
                isNewProject: state.mode === 'new',
                projectGuid: state.projectId,
                currentRegistration: state.currentRegistration,
              }}
              encodingConverter={state.encodingConverter}
              encoderReverseDirection={state.encoderReverseDirection}
              onEncodingChange={handleEncodingChange}
              onEncoderReverseChange={handleEncoderReverseChange}
              editable={state.editable}
              onEditableChange={handleEditableChange}
              isNewProject={state.mode === 'new'}
              minParatextVersion={state.minParatextVersion}
            />
          </TabsContent>

          {showBooksTab && (
            <TabsContent value="books" className="tw-mt-4">
              <BooksTab
                plannedBooks={state.plannedBooks}
                onPlannedBooksChange={handlePlannedBooksChange}
                disabled={state.loading}
              />
            </TabsContent>
          )}

          <TabsContent value="associations" className="tw-mt-4">
            <p className="tw-text-muted-foreground">
              Associations settings will be available in a future update.
            </p>
          </TabsContent>

          <TabsContent value="notes" className="tw-mt-4">
            <p className="tw-text-muted-foreground">
              Notes settings will be available in a future update.
            </p>
          </TabsContent>

          <TabsContent value="advanced" className="tw-mt-4">
            <AdvancedTab
              normalization={state.normalization}
              onNormalizationChange={handleNormalizationChange}
              usfmVersion={state.usfmVersion}
              onUsfmVersionChange={handleUsfmVersionChange}
              isNewProject={state.mode === 'new'}
            />
          </TabsContent>

          {showStudyBibleTab && (
            <TabsContent value="studybible" className="tw-mt-4">
              <p className="tw-text-muted-foreground">
                Study Bible settings will be available in a future update.
              </p>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Validation ribbon (GAP-007) */}
      {validationMessages.length > 0 && (
        <div className="tw-px-4 tw-py-2 tw-flex tw-flex-col tw-gap-1">
          {validationMessages.map((msg) => (
            <Alert
              key={msg.message}
              variant={msg.severity === 'error' ? 'destructive' : 'default'}
              className="tw-py-1 tw-px-3"
            >
              <AlertDescription
                className={cn(
                  'tw-text-sm',
                  msg.severity === 'warning' && 'tw-text-yellow-700',
                  msg.severity === 'info' && 'tw-text-muted-foreground',
                )}
              >
                {msg.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel} disabled={state.loading}>
          Cancel
        </Button>
        <Button onClick={handleOk} disabled={!canSubmit || state.loading}>
          {state.loading ? 'Saving...' : 'OK'}
        </Button>
      </div>
    </div>
  );
};
