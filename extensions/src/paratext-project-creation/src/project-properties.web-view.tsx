import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  AlertDescription,
  Spinner,
} from 'platform-bible-react';
import { LocalizeKey, formatReplacementString } from 'platform-bible-utils';
import { AlertCircle, X } from 'lucide-react';
import { ProjectCreationProvider, useProjectCreation } from './context/project-creation-context';
import { useProjectCreationCommands } from './hooks/use-project-creation';
import { GeneralTab } from './components/tabs/general-tab.component';
import { BooksTab } from './components/tabs/books-tab.component';
import { AssociationsTab } from './components/tabs/associations-tab.component';
import { NotesTab } from './components/tabs/notes-tab.component';
import { AdvancedTab } from './components/tabs/advanced-tab.component';
import { StudyBibleTab } from './components/tabs/study-bible-tab.component';
import { ProjectNameDialog } from './components/project-name-dialog.component';
import { LanguageSelectionDialog } from './components/language-selection-dialog.component';
import { EncodingDialog } from './components/encoding-dialog.component';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_title_new%',
  '%projectCreation_title_edit%',
  '%projectCreation_tab_general%',
  '%projectCreation_tab_books%',
  '%projectCreation_tab_associations%',
  '%projectCreation_tab_notes%',
  '%projectCreation_tab_advanced%',
  '%projectCreation_tab_studyBible%',
  '%general_ok%',
  '%general_cancel%',
  '%projectCreation_error_generic%',
  '%projectCreation_saving%',
  '%projectCreation_creating%',
  '%projectCreation_discardChanges_title%',
  '%projectCreation_discardChanges_description%',
  '%projectCreation_discardChanges_keep%',
  '%projectCreation_discardChanges_discard%',
  '%projectCreation_validation_ribbon%',
];

/** Props passed to the ProjectPropertiesForm web view via state. */
interface ProjectPropertiesWebViewState {
  mode?: 'new' | 'edit';
  projectGuid?: string;
}

/** Modal Overlay Component for displaying subdialogs */
function ModalOverlay({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center">
      {/* Backdrop */}
      <div
        className="tw-absolute tw-inset-0 tw-bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
      />
      {/* Dialog Content */}
      <div className="tw-relative tw-max-h-[90vh] tw-max-w-2xl tw-overflow-auto tw-rounded-lg tw-bg-background tw-shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-p-1 tw-opacity-70 hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring"
        >
          <X className="tw-h-4 tw-w-4" />
          <span className="tw-sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

/** Inner component that uses the context. */
function ProjectPropertiesFormInner(_props: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch, canSubmit, showBooksTab, showStudyBibleTab } = useProjectCreation();
  const {
    createProject,
    updateProject,
    cleanupProject,
    handleNameChange,
    handleLanguageChange,
    handleEncodingChange,
  } = useProjectCreationCommands();

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Discard confirmation dialog state
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Handle tab change
  const handleTabChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_ACTIVE_TAB', tab: value });
    },
    [dispatch],
  );

  // Handle OK button click
  const handleOk = useCallback(async () => {
    setError(null);

    if (state.mode === 'new') {
      const result = await createProject();
      if (!result.success) {
        setError(result.errorMessage || 'Failed to create project');
      }
      // Close the dialog/webview on success
      // The webview will be closed by the caller
    } else {
      // Edit mode - update existing project
      const result = await updateProject();
      if (!result.success) {
        setError(result.errorMessage || 'Failed to update project');
      }
      // Close the dialog/webview on success
      // The webview will be closed by the caller
    }
  }, [state.mode, createProject, updateProject]);

  // Handle Cancel button click
  const handleCancel = useCallback(async () => {
    // Check for unsaved changes in edit mode
    if (state.mode === 'edit' && state.dirtyFields.size > 0) {
      setShowDiscardDialog(true);
      return;
    }

    // If a new project was partially created, clean it up
    if (state.mode === 'new' && state.projectGuid) {
      await cleanupProject(state.projectGuid, state.registrationState?.status === 'Registered');
    }
    // Close the dialog/webview
  }, [state.mode, state.projectGuid, state.dirtyFields, state.registrationState, cleanupProject]);

  // Handle confirming discard of changes
  const handleConfirmDiscard = useCallback(() => {
    setShowDiscardDialog(false);
    // Close the dialog/webview without saving
    // The webview will be closed by the caller
  }, []);

  // Close name dialog
  const handleNameDialogClose = useCallback(() => {
    dispatch({ type: 'SHOW_NAME_DIALOG', show: false });
  }, [dispatch]);

  // Close language dialog
  const handleLanguageDialogClose = useCallback(() => {
    dispatch({ type: 'SHOW_LANGUAGE_DIALOG', show: false });
  }, [dispatch]);

  // Close encoding dialog
  const handleEncodingDialogClose = useCallback(() => {
    dispatch({ type: 'SHOW_ENCODING_DIALOG', show: false });
  }, [dispatch]);

  // Get dialog title
  const dialogTitle = useMemo(() => {
    if (state.mode === 'new') {
      return localizedStrings['%projectCreation_title_new%'] || 'New Project';
    }
    const editTitle =
      localizedStrings['%projectCreation_title_edit%'] || 'Project properties: {name}';
    return formatReplacementString(editTitle, { name: state.fullName || 'Project' });
  }, [state.mode, state.fullName, localizedStrings]);

  // Get action button text
  const actionButtonText = useMemo(() => {
    if (state.isSaving) {
      return state.mode === 'new'
        ? localizedStrings['%projectCreation_creating%'] || 'Creating...'
        : localizedStrings['%projectCreation_saving%'] || 'Saving...';
    }
    return localizedStrings['%general_ok%'] || 'OK';
  }, [state.isSaving, state.mode, localizedStrings]);

  // Default encoding for encoding dialog
  const defaultEncoding = useMemo(() => {
    return (
      state.selectedEncoding || { codePage: 65001, name: 'UTF-8', displayName: 'Unicode (UTF-8)' }
    );
  }, [state.selectedEncoding]);

  return (
    <div className="tw-flex tw-h-full tw-flex-col tw-bg-background">
      {/* Header */}
      <div className="tw-border-b tw-px-4 tw-py-3">
        <h1 className="tw-text-lg tw-font-semibold">{dialogTitle}</h1>
      </div>

      {/* Validation Ribbon */}
      {state.validationErrors.size > 0 && (
        <div className="tw-border-b tw-border-destructive tw-bg-destructive/15 tw-px-4 tw-py-2">
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-destructive">
            <AlertCircle className="tw-h-4 tw-w-4" />
            <span>
              {localizedStrings['%projectCreation_validation_ribbon%'] ||
                'Please correct the errors before saving.'}
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tw-flex-1 tw-overflow-auto">
        <Tabs value={state.activeTab} onValueChange={handleTabChange} className="tw-h-full">
          <div className="tw-border-b tw-px-4">
            <TabsList>
              <TabsTrigger value="general">
                {localizedStrings['%projectCreation_tab_general%'] || 'General'}
              </TabsTrigger>
              {showBooksTab && (
                <TabsTrigger value="books">
                  {localizedStrings['%projectCreation_tab_books%'] || 'Books'}
                </TabsTrigger>
              )}
              <TabsTrigger value="associations">
                {localizedStrings['%projectCreation_tab_associations%'] || 'Associations'}
              </TabsTrigger>
              <TabsTrigger value="notes">
                {localizedStrings['%projectCreation_tab_notes%'] || 'Notes'}
              </TabsTrigger>
              <TabsTrigger value="advanced">
                {localizedStrings['%projectCreation_tab_advanced%'] || 'Advanced'}
              </TabsTrigger>
              {showStudyBibleTab && (
                <TabsTrigger value="studyBible">
                  {localizedStrings['%projectCreation_tab_studyBible%'] || 'Study Bible'}
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="general" className="tw-mt-0 tw-h-full tw-overflow-auto">
            <GeneralTab />
          </TabsContent>

          {showBooksTab && (
            <TabsContent value="books" className="tw-mt-0 tw-h-full tw-overflow-auto">
              <BooksTab />
            </TabsContent>
          )}

          <TabsContent value="associations" className="tw-mt-0 tw-h-full tw-overflow-auto">
            <AssociationsTab />
          </TabsContent>

          <TabsContent value="notes" className="tw-mt-0 tw-h-full tw-overflow-auto">
            <NotesTab />
          </TabsContent>

          <TabsContent value="advanced" className="tw-mt-0 tw-h-full tw-overflow-auto">
            <AdvancedTab />
          </TabsContent>

          {showStudyBibleTab && (
            <TabsContent value="studyBible" className="tw-mt-0 tw-h-full tw-overflow-auto">
              <StudyBibleTab />
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Error Message */}
      {error && (
        <div className="tw-px-4 tw-py-2">
          <Alert variant="destructive">
            <AlertCircle className="tw-h-4 tw-w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Footer */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-px-4 tw-py-3">
        <Button variant="outline" onClick={handleCancel} disabled={state.isSaving}>
          {localizedStrings['%general_cancel%'] || 'Cancel'}
        </Button>
        <Button variant="default" onClick={handleOk} disabled={!canSubmit || state.isSaving}>
          {state.isSaving && <Spinner className="tw-mr-2" />}
          {actionButtonText}
        </Button>
      </div>

      {/* Project Name Dialog */}
      <ModalOverlay isOpen={state.showNameDialog} onClose={handleNameDialogClose}>
        <ProjectNameDialog
          fullName={state.fullName}
          shortName={state.shortName}
          copyright={state.copyright}
          isNewProject={state.mode === 'new'}
          isRegistered={state.registrationState?.status === 'Registered'}
          onConfirm={handleNameChange}
          onCancel={handleNameDialogClose}
        />
      </ModalOverlay>

      {/* Language Selection Dialog */}
      <ModalOverlay isOpen={state.showLanguageDialog} onClose={handleLanguageDialogClose}>
        <LanguageSelectionDialog
          currentLanguageId={state.languageId}
          projectName={state.fullName}
          isNewLanguage={false}
          isRegistered={state.registrationState?.status === 'Registered'}
          onConfirm={handleLanguageChange}
          onCancel={handleLanguageDialogClose}
        />
      </ModalOverlay>

      {/* Encoding Dialog */}
      <ModalOverlay isOpen={state.showEncodingDialog} onClose={handleEncodingDialogClose}>
        <EncodingDialog
          currentEncoding={defaultEncoding}
          onConfirm={handleEncodingChange}
          onCancel={handleEncodingDialogClose}
        />
      </ModalOverlay>

      {/* Discard Changes Confirmation Dialog */}
      <ModalOverlay isOpen={showDiscardDialog} onClose={() => setShowDiscardDialog(false)}>
        <div className="tw-flex tw-flex-col tw-gap-4 tw-p-6">
          <h2 className="tw-text-lg tw-font-semibold">
            {localizedStrings['%projectCreation_discardChanges_title%'] || 'Discard changes?'}
          </h2>
          <p className="tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%projectCreation_discardChanges_description%'] ||
              'You have unsaved changes. Are you sure you want to discard them?'}
          </p>
          <div className="tw-flex tw-justify-end tw-gap-2">
            <Button variant="outline" onClick={() => setShowDiscardDialog(false)}>
              {localizedStrings['%projectCreation_discardChanges_keep%'] || 'Keep editing'}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDiscard}>
              {localizedStrings['%projectCreation_discardChanges_discard%'] || 'Discard'}
            </Button>
          </div>
        </div>
      </ModalOverlay>
    </div>
  );
}

/**
 * Project Properties Form Web View (CAP-UI-001)
 *
 * The main dialog for creating new projects and editing existing project settings. It provides a
 * tabbed interface covering all configurable aspects of a Scripture translation project including
 * naming, language, versification, project type, registration, book selection, external
 * associations, note tags, and advanced technical settings.
 *
 * Entry points:
 *
 * - Menu: File > New Project (mode: 'new')
 * - Menu: Project > Project Properties (mode: 'edit', projectId)
 */
globalThis.webViewComponent = function ProjectPropertiesWebView(props: WebViewProps) {
  const { useWebViewState } = props;

  // Get initial state from web view props
  const [webViewState] = useWebViewState<ProjectPropertiesWebViewState>('webViewState', {
    mode: 'new',
  });

  return (
    <ProjectCreationProvider
      initialMode={webViewState?.mode || 'new'}
      projectGuid={webViewState?.projectGuid}
    >
      <ProjectPropertiesFormInner {...props} />
    </ProjectCreationProvider>
  );
};
