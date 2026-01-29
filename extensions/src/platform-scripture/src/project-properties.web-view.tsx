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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from 'platform-bible-react';
import { AlertTriangle } from 'lucide-react';
import { useCallback, useMemo } from 'react';

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

  // Title based on mode
  const title = mode === 'create' ? 'New Project' : `Project Properties - ${state.shortName}`;

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-gap-2 tw-p-4">
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
