/**
 * ProjectPropertiesWebView - Main web view for Project Properties dialog
 *
 * Features:
 *
 * - 7 tabs: General, Books, Associations, Notes, Advanced, Additions (SBA), Study Bible (SBA)
 * - Conditional tab visibility based on project type
 * - Warning ribbon for errors on non-active tabs
 * - Embeds RegistrationStatusControl and ProjectNameDialog
 * - Complex form state via useReducer
 */

import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from 'platform-bible-react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';

import { useProjectPropertiesForm } from './hooks/use-project-properties-form';
import type {
  ProjectPropertiesInput,
  ProjectPropertiesOutput,
} from './types/project-properties.types';
import { TAB_INDICES, TAB_NAMES, getVisibleTabs } from './types/project-properties.types';

import { GeneralTab } from './components/project-properties/general-tab.component';
import { BooksTab } from './components/project-properties/books-tab.component';
import { AssociationsTab } from './components/project-properties/associations-tab.component';
import { NotesTab } from './components/project-properties/notes-tab.component';
import { AdvancedTab } from './components/project-properties/advanced-tab.component';
import { AdditionsTab } from './components/project-properties/additions-tab.component';
import { StudyBibleTab } from './components/project-properties/study-bible-tab.component';

// =============================================================================
// FALLBACK DEFAULTS (safety net if provider data is incomplete)
// =============================================================================

/**
 * Minimal fallback defaults used only if the provider fails to supply data. In normal operation,
 * the web view provider fetches real data from PAPI. These exist to prevent crashes if data is
 * missing.
 */
const FALLBACK_OPTIONS: ProjectPropertiesInput['options'] = {
  languages: [{ id: 'en:Latn::', code: 'en', displayName: 'English', isRTL: false }],
  versifications: [{ id: 'English', displayName: 'English', isCustomized: false }],
  projectTypes: [{ value: 'Standard', label: 'Standard Translation' }],
  availableBaseProjects: [],
  biblicalTermsLists: [],
  encodingConverters: [],
  encodings: [],
  normalizations: [],
  flexUsageModes: [],
};

const FALLBACK_USER_CONTEXT: ProjectPropertiesInput['userContext'] = {
  isRegistered: false,
  canRegisterProjects: false,
  isOnline: false,
};

// =============================================================================
// WEB VIEW COMPONENT
// =============================================================================

/**
 * ProjectPropertiesWebView - Main component for creating/editing projects
 *
 * Accessed from: Paratext > New Project, or project context menu
 *
 * Implements behaviors:
 *
 * - BHV-100: Project type enumeration
 * - BHV-101: Derived type classification
 * - BHV-102: Registration by type
 * - BHV-107: Versification inheritance
 * - BHV-114: Books present tracking
 * - BHV-200-210: Name and registration handling
 * - BHV-204: Tab navigation
 */
/* =============================================================================
   HELP TEXT MAP (GAP-003: Help box context) - DISABLED
   The help panel is hidden until field focus handlers are wired.
   To enable: uncomment this block and the help panel JSX below, then wire
   updateHelpText to onFocus handlers in child components.
   =============================================================================

const HELP_TEXT: Record<string, string> = {
  fullName:
    'The full name of the project. This appears in project selection dialogs and reports. Use a descriptive name that identifies the translation.',
  shortName:
    'A short identifier (3-8 characters) for the project. Used in file names and as a compact reference. Must be unique and contain only letters and numbers.',
  copyright:
    'Copyright information for the translation. This text appears in published materials and exports.',
  language:
    'The target language for this translation project. Choose the language that best represents your target audience.',
  versification:
    'The versification scheme determines how chapter and verse numbers are organized. Most projects use the English versification. For derived projects, this inherits from the base project.',
  projectType:
    'The type of project determines its relationship to other projects and available features. Standard translations are independent. Derived types (Back Translation, Daughter, etc.) are based on another project.',
  baseProject:
    'The source project that this derived project is based on. The base project provides the versification and may provide other inherited settings.',
  biblicalTerms:
    'Select which biblical terms list to use for key term consistency checking. The default list covers major terms used in Bible translation.',
  matchStems:
    'When enabled, term matching considers word stems rather than exact forms. This improves matching for languages with complex morphology.',
  encodingConverter:
    'Select the encoding converter for transliteration projects. The converter transforms text between different writing systems.',
  registration:
    'Shows the registration status with the Paratext Registry. Registered projects can be shared and synchronized with team members.',
  books:
    'Select which books are included in this project. You can add or remove books later as needed.',
  associations: 'Configure links to associated lexical projects for enhanced term management.',
  flexUsage:
    'Configure how this project interacts with FieldWorks Language Explorer (FLEx) for lexical data.',
  commentTags:
    'Define custom tags for organizing project notes and comments. Tags help categorize feedback and issues.',
  usfmVersion:
    'The USFM format version for exported files. USFM 3 is recommended for new projects and supports enhanced markup.',
  normalization:
    'Unicode normalization form for text storage. NFC (composed) is recommended for most projects.',
  editable:
    'When enabled, the project text can be modified. Disable for reference projects that should not be edited.',
  sharing:
    'Permission settings for sharing this project with other users and organizations via the Paratext Registry.',
  default: 'Click on a field to see detailed help information here.',
};
*/

globalThis.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  // Get input data from web view state
  // The provider fetches real data from PAPI and passes it here
  const [inputDataRaw] = useWebViewState<Partial<ProjectPropertiesInput> | undefined>(
    'inputData',
    undefined,
  );

  // Build input data with fallbacks for any missing fields
  // In normal operation, the provider supplies complete data from PAPI
  // Fallbacks only used if provider data is incomplete (shouldn't happen)
  const inputData: ProjectPropertiesInput = {
    mode: inputDataRaw?.mode ?? 'create',
    interlinearContext: inputDataRaw?.interlinearContext,
    existingProject: inputDataRaw?.existingProject,
    options: {
      languages: inputDataRaw?.options?.languages ?? FALLBACK_OPTIONS.languages,
      versifications: inputDataRaw?.options?.versifications ?? FALLBACK_OPTIONS.versifications,
      projectTypes: inputDataRaw?.options?.projectTypes ?? FALLBACK_OPTIONS.projectTypes,
      availableBaseProjects:
        inputDataRaw?.options?.availableBaseProjects ?? FALLBACK_OPTIONS.availableBaseProjects,
      biblicalTermsLists:
        inputDataRaw?.options?.biblicalTermsLists ?? FALLBACK_OPTIONS.biblicalTermsLists,
      encodingConverters:
        inputDataRaw?.options?.encodingConverters ?? FALLBACK_OPTIONS.encodingConverters,
      encodings: inputDataRaw?.options?.encodings ?? FALLBACK_OPTIONS.encodings,
      normalizations: inputDataRaw?.options?.normalizations ?? FALLBACK_OPTIONS.normalizations,
      flexUsageModes: inputDataRaw?.options?.flexUsageModes ?? FALLBACK_OPTIONS.flexUsageModes,
    },
    userContext: {
      isRegistered: inputDataRaw?.userContext?.isRegistered ?? FALLBACK_USER_CONTEXT.isRegistered,
      canRegisterProjects:
        inputDataRaw?.userContext?.canRegisterProjects ?? FALLBACK_USER_CONTEXT.canRegisterProjects,
      isOnline: inputDataRaw?.userContext?.isOnline ?? FALLBACK_USER_CONTEXT.isOnline,
    },
  };

  // Initialize form hook
  const form = useProjectPropertiesForm(inputData);
  const { state, options, mode } = form;

  // Submit status for user feedback
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // Get visible tabs based on project type
  const visibleTabs = useMemo(
    () => getVisibleTabs(state.selectedProjectType),
    [state.selectedProjectType],
  );

  // Check if there are errors on non-active tabs
  const errorsOnOtherTabs = useMemo(
    () => state.tabsWithErrors.filter((tab) => tab !== state.activeTab),
    [state.tabsWithErrors, state.activeTab],
  );

  // Handle tab change
  const handleTabChange = useCallback(
    (value: string) => {
      const tabIndex = parseInt(value, 10);
      form.setActiveTab(tabIndex);
    },
    [form],
  );

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    const output: ProjectPropertiesOutput = form.handleSubmit();
    if (output.action !== 'submit' || !output.projectData) {
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError(undefined);

    try {
      // Map TypeScript ProjectData to C# ProjectCreationRequest format
      // Type assertions needed because ProjectData uses string types but
      // ProjectCreationRequest uses stricter union types from platform-scripture
      const request = {
        shortName: output.projectData.shortName,
        fullName: output.projectData.fullName,
        copyright: output.projectData.copyright || undefined,
        languageId: output.projectData.languageId,
        // ProjectType in ProjectData is string, but API expects specific union
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        projectType: output.projectData.projectType as
          | 'Standard'
          | 'BackTranslation'
          | 'Daughter'
          | 'Auxiliary'
          | 'StudyBibleAdditions'
          | 'TransliterationManual'
          | 'TransliterationWithEncoder'
          | 'ConsultantNotes',
        baseProjectName: output.projectData.baseProjectName,
        baseProjectGuid: output.projectData.baseProjectGuid,
        versification: output.projectData.versification,
        booksPresent: output.projectData.booksPresentSet,
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        usfmVersion: (output.projectData.usfmVersion === '3' ? 'Version3' : 'Version2') as
          | 'Version2'
          | 'Version3',
        editable: output.projectData.editable,
        encoding: 65001, // UTF-8
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        normalizationForm: (output.projectData.normalizationForm || 'NFC') as
          | 'NFC'
          | 'NFD'
          | 'None',
      };

      logger.info(`Creating project: ${JSON.stringify(request)}`);

      // Call PAPI command to create the project
      const result = await papi.commands.sendCommand('platformScripture.createProject', request);

      if (result.success) {
        logger.info(`Project created successfully: ${JSON.stringify(result)}`);
        setSubmitStatus('success');
      } else {
        const errorMsg = result.error?.message || 'Project creation failed for unknown reason';
        logger.error(`Project creation failed: ${errorMsg}`);
        setSubmitError(errorMsg);
        setSubmitStatus('error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      logger.error(`Project creation error: ${errorMsg}`);
      setSubmitError(errorMsg);
      setSubmitStatus('error');
    }
  }, [form]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    const output: ProjectPropertiesOutput = form.handleCancel();
    logger.info(`Project properties cancelled: ${output.action}`);
    // TODO: Close web view
  }, [form]);

  // GAP-003: Help text functionality is disabled until field focus handlers are wired
  // The HELP_TEXT map and updateHelpText handler are defined but the help panel is hidden.
  // To enable: uncomment the help panel in the JSX below and wire updateHelpText to
  // onFocus handlers in child components (GeneralTab, etc.)

  // Track previous active tab to detect tab changes for GAP-005
  const previousActiveTab = useRef<number>(state.activeTab);

  // GAP-005: Auto-focus first error field when switching to a tab with errors
  useEffect(() => {
    if (previousActiveTab.current !== state.activeTab) {
      previousActiveTab.current = state.activeTab;

      // If the new tab has errors, focus the first error field
      if (state.tabsWithErrors.includes(state.activeTab)) {
        // Small delay to ensure the tab content has rendered
        setTimeout(() => {
          const errorElement = document.querySelector('[role="alert"]');
          if (errorElement) {
            // Find the nearest input or button before the error
            const container = errorElement.parentElement;
            const focusableElement = container?.querySelector(
              'input, select, button, [tabindex="0"]',
            );
            if (focusableElement instanceof HTMLElement) {
              focusableElement.focus();
            }
          }
        }, 100);
      }
    }
  }, [state.activeTab, state.tabsWithErrors]);

  // GAP-006: Handle Enter key to submit form
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        // Don't submit if inside a textarea or multi-line input
        const { target } = event;
        if (!(target instanceof HTMLElement)) return;
        if (target.tagName === 'TEXTAREA') return;
        if (target.getAttribute('role') === 'combobox') return;

        // Only submit if Enter is pressed on an input or button
        if (['INPUT', 'BUTTON'].includes(target.tagName)) {
          event.preventDefault();
          handleSubmit();
        }
      }
    },
    [handleSubmit],
  );

  // Title based on mode
  const title = mode === 'create' ? 'New Project' : `Project Properties - ${state.shortName}`;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-gap-2 tw-p-4" onKeyDown={handleKeyDown}>
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">{title}</h2>

      {/* Warning Ribbon for errors on other tabs */}
      {errorsOnOtherTabs.length > 0 && (
        <Alert variant="destructive" className="tw-py-2">
          <AlertTriangle className="tw-h-4 tw-w-4" />
          <AlertTitle className="tw-text-sm">Validation Errors</AlertTitle>
          <AlertDescription className="tw-text-sm">
            There are errors on the following tabs:{' '}
            {errorsOnOtherTabs.map((tab) => TAB_NAMES[tab]).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Success message after submission */}
      {submitStatus === 'success' && (
        <Alert className="tw-py-2 tw-border-green-500 tw-bg-green-50 dark:tw-bg-green-950">
          <CheckCircle2 className="tw-h-4 tw-w-4 tw-text-green-600" />
          <AlertTitle className="tw-text-sm tw-text-green-800 dark:tw-text-green-200">
            Project Created Successfully
          </AlertTitle>
          <AlertDescription className="tw-text-sm tw-text-green-700 dark:tw-text-green-300">
            Your project has been created. You may close this dialog.
          </AlertDescription>
        </Alert>
      )}

      {/* Error message if submission failed */}
      {submitStatus === 'error' && submitError && (
        <Alert variant="destructive" className="tw-py-2">
          <AlertTriangle className="tw-h-4 tw-w-4" />
          <AlertTitle className="tw-text-sm">Project Creation Failed</AlertTitle>
          <AlertDescription className="tw-text-sm">{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs
        value={state.activeTab.toString()}
        onValueChange={handleTabChange}
        className="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden"
      >
        {/* Tab List */}
        <TabsList className="tw-w-full tw-justify-start tw-h-auto tw-flex-wrap">
          {visibleTabs.map((tabIndex) => {
            const hasError = state.tabsWithErrors.includes(tabIndex);
            return (
              <TabsTrigger
                key={tabIndex}
                value={tabIndex.toString()}
                className={cn('tw-gap-1', hasError && 'tw-text-destructive')}
              >
                {TAB_NAMES[tabIndex]}
                {hasError && (
                  <Badge variant="destructive" className="tw-h-4 tw-w-4 tw-p-0 tw-text-[10px]">
                    !
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="tw-flex-1 tw-overflow-auto tw-mt-4">
          {/* General Tab */}
          <TabsContent value={TAB_INDICES.GENERAL.toString()} className="tw-mt-0">
            <GeneralTab
              state={state}
              options={options}
              mode={mode}
              userContext={inputData.userContext}
              onFullNameChange={form.setFullName}
              onShortNameChange={form.setShortName}
              onCopyrightChange={form.setCopyright}
              onLanguageChange={form.setLanguage}
              onVersificationChange={form.setVersification}
              onProjectTypeChange={form.setProjectType}
              onBaseProjectChange={form.setBaseProject}
              onBiblicalTermsListChange={form.setBiblicalTermsList}
              onMatchBasedOnStemsChange={form.setMatchBasedOnStems}
              onEncodingConverterChange={form.setEncodingConverter}
              onEncoderReverseDirectionChange={form.setEncoderReverseDirection}
              onRegisterClick={() => logger.info('Register clicked')}
              onManageClick={() => logger.info('Manage clicked')}
            />
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value={TAB_INDICES.BOOKS.toString()} className="tw-mt-0">
            <BooksTab
              selectedBooks={state.selectedBooks}
              onSelectedBooksChange={form.setSelectedBooks}
              onToggleBook={form.toggleBook}
              isDerivedType={state.isDerivedType}
            />
          </TabsContent>

          {/* Associations Tab */}
          <TabsContent value={TAB_INDICES.ASSOCIATIONS.toString()} className="tw-mt-0">
            <AssociationsTab
              associatedLexicalProject={state.associatedLexicalProject}
              flexUsage={state.flexUsage}
              flexUsageOptions={options.flexUsageModes}
              onFlexUsageChange={form.setFlexUsage}
              onAssociateClick={() => logger.info('Associate clicked')}
            />
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value={TAB_INDICES.NOTES.toString()} className="tw-mt-0">
            <NotesTab
              commentTags={state.commentTags}
              onAddTag={form.addCommentTag}
              onUpdateTag={form.updateCommentTag}
              onRemoveTag={form.removeCommentTag}
            />
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value={TAB_INDICES.ADVANCED.toString()} className="tw-mt-0">
            <AdvancedTab
              fileNamePattern={state.fileNamePattern}
              usfmVersion={state.usfmVersion}
              normalization={state.normalization}
              silEncoding={state.silEncoding}
              editable={state.editable}
              allowWhitespaceAndInvisible={state.allowWhitespaceAndInvisible}
              sharingPermission={state.sharingPermission}
              shareWithSldr={state.shareWithSldr}
              allowDerivedProjectRegistration={state.allowDerivedProjectRegistration}
              normalizationOptions={options.normalizations}
              encodingOptions={options.encodings}
              onUsfmVersionChange={form.setUsfmVersion}
              onNormalizationChange={form.setNormalization}
              onSilEncodingChange={form.setSilEncoding}
              onEditableChange={form.setEditable}
              onAllowWhitespaceChange={form.setAllowWhitespace}
              onSharingPermissionChange={form.setSharingPermission}
              onShareWithSldrChange={form.setShareWithSldr}
              onAllowDerivedRegistrationChange={form.setAllowDerivedRegistration}
              onEditFilingPattern={() => logger.info('Edit filing pattern clicked')}
              onChooseEncoding={() => logger.info('Choose encoding clicked')}
              onWhyShareClick={() => logger.info('Why share clicked')}
            />
          </TabsContent>

          {/* Additions Tab (SBA only) */}
          {state.showAdditionsTab && (
            <TabsContent value={TAB_INDICES.ADDITIONS.toString()} className="tw-mt-0">
              <AdditionsTab
                baseTextProject={state.selectedBaseProject}
                additionsProjectsList=""
                availableBaseProjects={options.availableBaseProjects}
                onBaseTextChange={form.setBaseProject}
                onSelectAdditionsProjects={() => logger.info('Select additions clicked')}
                onCheckConnections={() => logger.info('Check connections clicked')}
                onMerge={() => logger.info('Merge clicked')}
              />
            </TabsContent>
          )}

          {/* Study Bible Tab (SBA only) */}
          {state.showStudyBibleTab && (
            <TabsContent value={TAB_INDICES.STUDY_BIBLE.toString()} className="tw-mt-0">
              <StudyBibleTab
                categories={state.studyBibleCategories}
                allowHidingBaseNotes={state.allowHidingBaseNotes}
                placeCallersOnLeft={state.placeCallersOnLeft}
                onAddCategory={form.addStudyBibleCategory}
                onUpdateCategory={form.updateStudyBibleCategory}
                onRemoveCategory={form.removeStudyBibleCategory}
                onAllowHidingChange={form.setAllowHidingBaseNotes}
                onPlaceCallersChange={form.setPlaceCallersOnLeft}
              />
            </TabsContent>
          )}
        </div>
      </Tabs>

      {/* GAP-003: Help Panel - HIDDEN until field focus handlers are wired
          The updateHelpText function and HELP_TEXT map exist but aren't connected to field onFocus.
          Hiding the panel avoids showing a non-functional UI element.
          To enable: wire updateHelpText to onFocus handlers in child components (GeneralTab, etc.)
      <Card className="tw-bg-muted/30 tw-border-muted">
        <CardContent className="tw-p-3 tw-flex tw-items-start tw-gap-2">
          <HelpCircle className="tw-h-4 tw-w-4 tw-text-muted-foreground tw-mt-0.5 tw-flex-shrink-0" />
          <p className="tw-text-sm tw-text-muted-foreground">{helpText}</p>
        </CardContent>
      </Card>
      */}

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-border-border">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={submitStatus === 'submitting' || submitStatus === 'success'}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitStatus === 'submitting' || submitStatus === 'success'}
        >
          {submitStatus === 'submitting' ? 'Creating Project...' : 'OK'}
        </Button>
      </div>
    </div>
  );
};
