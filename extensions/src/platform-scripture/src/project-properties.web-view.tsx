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
import { logger } from '@papi/frontend';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from 'platform-bible-react';
import { AlertTriangle, HelpCircle } from 'lucide-react';
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
// MOCK DATA (for development)
// =============================================================================

const MOCK_INPUT: ProjectPropertiesInput = {
  mode: 'create',
  options: {
    languages: [
      { id: 'en:Latn:US:', code: 'en', displayName: 'English (United States)', isRTL: false },
      { id: 'es:Latn:ES:', code: 'es', displayName: 'Spanish (Spain)', isRTL: false },
      { id: 'fr:Latn:FR:', code: 'fr', displayName: 'French (France)', isRTL: false },
      { id: 'ar:Arab:SA:', code: 'ar', displayName: 'Arabic (Saudi Arabia)', isRTL: true },
      { id: 'zh:Hans:CN:', code: 'zh', displayName: 'Chinese (Simplified)', isRTL: false },
    ],
    versifications: [
      { id: 'English', displayName: 'English', isCustomized: false },
      { id: 'Original', displayName: 'Original', isCustomized: false },
      { id: 'Septuagint', displayName: 'Septuagint', isCustomized: false },
      { id: 'Vulgate', displayName: 'Vulgate', isCustomized: false },
      { id: 'RussianOrthodox', displayName: 'Russian Orthodox', isCustomized: false },
      { id: 'RussianProtestant', displayName: 'Russian Protestant', isCustomized: false },
    ],
    projectTypes: [
      { value: 'Standard', label: 'Standard Translation' },
      { value: 'BackTranslation', label: 'Back Translation' },
      { value: 'Daughter', label: 'Daughter Translation' },
      { value: 'Auxiliary', label: 'Auxiliary Project' },
      { value: 'StudyBibleAdditions', label: 'Study Bible Additions' },
      { value: 'TransliterationManual', label: 'Transliteration (Manual)' },
      { value: 'TransliterationWithEncoder', label: 'Transliteration (With Encoder)' },
      { value: 'ConsultantNotes', label: 'Consultant Notes' },
    ],
    availableBaseProjects: [
      { name: 'ENG', guid: 'eng-guid-123', displayName: 'English Reference (ENG)' },
      { name: 'SPA', guid: 'spa-guid-456', displayName: 'Spanish Reference (SPA)' },
      { name: 'FRA', guid: 'fra-guid-789', displayName: 'French Reference (FRA)' },
    ],
    biblicalTermsLists: [
      { id: 'default', displayName: 'Major Biblical Terms (UBS/SIL)' },
      { id: 'all', displayName: 'All Biblical Terms' },
    ],
    encodingConverters: [
      { id: 'unicode-to-legacy', displayName: 'Unicode to Legacy' },
      { id: 'legacy-to-unicode', displayName: 'Legacy to Unicode' },
    ],
    encodings: [
      { id: 'UTF-8', displayName: 'UTF-8 (Unicode)' },
      { id: 'UTF-16', displayName: 'UTF-16 (Unicode)' },
    ],
    normalizations: [
      { id: 'NFC', displayName: 'NFC (Composed)' },
      { id: 'NFD', displayName: 'NFD (Decomposed)' },
      { id: 'None', displayName: 'None' },
    ],
    flexUsageModes: [
      { id: 'import', displayName: 'Import from FLEx' },
      { id: 'export', displayName: 'Export to FLEx' },
      { id: 'bidirectional', displayName: 'Bidirectional Sync' },
    ],
  },
  userContext: {
    isRegistered: true,
    canRegisterProjects: true,
    isOnline: true,
  },
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
// =============================================================================
// HELP TEXT MAP (GAP-003: Help box context)
// =============================================================================

/** Help text for each field - displayed in help panel when field is focused */
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

globalThis.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  // Get input data from web view state (with mock fallback for development)
  const [inputDataRaw] = useWebViewState<ProjectPropertiesInput | undefined>(
    'inputData',
    undefined,
  );
  const inputData = inputDataRaw ?? MOCK_INPUT;

  // Initialize form hook
  const form = useProjectPropertiesForm(inputData);
  const { state, options, mode } = form;

  // GAP-003: Help text state - updates based on focused field
  const [helpText, setHelpText] = useState<string>(HELP_TEXT.default);

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
  const handleSubmit = useCallback(() => {
    const output: ProjectPropertiesOutput = form.handleSubmit();
    if (output.action === 'submit') {
      logger.info(`Project properties submitted: ${JSON.stringify(output.projectData)}`);
      // TODO: Send via PAPI command
    }
  }, [form]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    const output: ProjectPropertiesOutput = form.handleCancel();
    logger.info(`Project properties cancelled: ${output.action}`);
    // TODO: Close web view
  }, [form]);

  // GAP-003: Handler for updating help text based on focused field
  // Passed to child components (GeneralTab, etc.) to update help when fields are focused
  // TODO: Wire this to child component onFocus handlers for full help integration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateHelpText = useCallback((fieldKey: string) => {
    setHelpText(HELP_TEXT[fieldKey] || HELP_TEXT.default);
  }, []);

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

      {/* GAP-003: Help Panel - displays context-sensitive help based on focused field */}
      <Card className="tw-bg-muted/30 tw-border-muted">
        <CardContent className="tw-p-3 tw-flex tw-items-start tw-gap-2">
          <HelpCircle className="tw-h-4 tw-w-4 tw-text-muted-foreground tw-mt-0.5 tw-flex-shrink-0" />
          <p className="tw-text-sm tw-text-muted-foreground">{helpText}</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel} disabled={state.isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={state.isSubmitting}>
          {state.isSubmitting ? 'Saving...' : 'OK'}
        </Button>
      </div>
    </div>
  );
};
