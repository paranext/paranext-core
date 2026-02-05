/**
 * === NEW IN PT10 === Reason: React component - WebViews don't exist in PT9's WinForms architecture
 * Maps to: UI-PKG-006
 */

import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  ComboBox,
  Label,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookComparisonGrid,
  BookComparisonInfo,
  BookStatus,
} from './components/book-comparison-grid.component';
import { CANON_BOOKS, ProjectType } from './project-properties.utils';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRINGS: LocalizeKey[] = [
  // Dialog
  '%webView_copyBooks_title%',
  // Labels
  '%webView_copyBooks_label_from%',
  '%webView_copyBooks_label_to%',
  // Warning messages
  '%webView_copyBooks_warning_selectProject%',
  '%webView_copyBooks_warning_sameProject%',
  '%webView_copyBooks_warning_noCompatible%',
  '%webView_copyBooks_warning_sourceNoBooks%',
  // Grid headers
  '%webView_copyBooks_grid_book%',
  '%webView_copyBooks_grid_sourceStatus%',
  '%webView_copyBooks_grid_destStatus%',
  '%webView_copyBooks_grid_select%',
  '%webView_copyBooks_grid_selected%',
  '%webView_copyBooks_grid_empty%',
  // Status values
  '%webView_copyBooks_status_present%',
  '%webView_copyBooks_status_notPresent%',
  '%webView_copyBooks_status_presentOlder%',
  '%webView_copyBooks_status_presentNewer%',
  '%webView_copyBooks_status_presentSame%',
  // Buttons
  '%webView_copyBooks_button_selectAll%',
  '%webView_copyBooks_button_deselectAll%',
  '%webView_copyBooks_button_ok%',
  '%webView_copyBooks_button_cancel%',
  // Tooltips
  '%webView_copyBooks_tooltip_selectBooks%',
  '%webView_copyBooks_tooltip_copyNotAvailable%',
  // Loading states
  '%webView_copyBooks_loading%',
  '%webView_copyBooks_copying%',
  // Errors
  '%webView_copyBooks_error_copyFailed%',
  // Aria labels
  '%webView_copyBooks_ariaLabel_fromSelect%',
  '%webView_copyBooks_ariaLabel_toSelect%',
  '%webView_copyBooks_ariaLabel_bookGrid%',
  '%webView_copyBooks_ariaLabel_gridHeader%',
  '%webView_copyBooks_ariaLabel_selectBook%',
  // Placeholders
  '%webView_copyBooks_placeholder_selectProject%',
];

// ============================================================================
// INTERFACES
// ============================================================================

/** Project reference for copy books form */
interface CopyBooksProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  projectType: ProjectType;
  booksPresent: string[];
  editable: boolean;
}

// ============================================================================
// DESTINATION FILTERING (EXT-008)
// ============================================================================

/**
 * Filter compatible destination projects based on source project type. PT9 Source:
 * CopyBooksForm.cs:533-610 LoadToComboboxOptions()
 */
function filterDestinationProjects(
  fromProject: CopyBooksProjectReference,
  allProjects: CopyBooksProjectReference[],
): CopyBooksProjectReference[] {
  return allProjects.filter((project) => {
    // Cannot copy to self
    if (project.guid === fromProject.guid) return false;

    // Must be editable
    if (!project.editable) return false;

    // Type compatibility rules
    switch (fromProject.projectType) {
      case 'Standard':
      case 'Daughter':
      case 'BackTranslation':
        // Can copy to Standard, Daughter, BackTranslation
        return ['Standard', 'Daughter', 'BackTranslation'].includes(project.projectType);

      case 'StudyBibleAdditions':
        // Cannot create new project from Study Bible (BHV-606)
        return false;

      case 'Auxiliary':
      case 'TransliterationManual':
        // Can copy to same type
        return project.projectType === fromProject.projectType;

      case 'TransliterationWithEncoder':
        // Cannot copy from encoder-based transliteration
        return false;

      case 'ConsultantNotes':
        // Can copy to ConsultantNotes only
        return project.projectType === 'ConsultantNotes';

      default:
        return false;
    }
  });
}

/** Build book comparison data for the grid */
function buildBookComparison(
  sourceProject: CopyBooksProjectReference,
  destProject: CopyBooksProjectReference,
): BookComparisonInfo[] {
  const sourceBooks = new Set(sourceProject.booksPresent);
  const destBooks = new Set(destProject.booksPresent);

  // Only show books that exist in source project
  return CANON_BOOKS.filter((book) => sourceBooks.has(book.id)).map((book) => {
    const inSource = sourceBooks.has(book.id);
    const inDest = destBooks.has(book.id);

    // Determine destination status
    // Note: Full version comparison would require additional backend support
    // For now, simplified to Present/NotPresent
    let destStatus: BookStatus = 'NotPresent';
    if (inDest) {
      destStatus = 'Present';
    }

    const result: BookComparisonInfo = {
      bookId: book.id,
      bookName: book.name,
      sourceStatus: inSource ? 'Present' : 'NotPresent',
      destStatus,
      isCopyable: inSource, // Can copy if exists in source
    };
    return result;
  });
}

// ============================================================================
// WEB VIEW COMPONENT
// ============================================================================

global.webViewComponent = function CopyBooksWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  // Get state from web view
  const [availableProjects] = useWebViewState<CopyBooksProjectReference[]>('availableProjects', []);
  const [preSelectedFromProject] = useWebViewState<string | undefined>(
    'preSelectedFromProject',
    undefined,
  );
  const [preSelectedToProject] = useWebViewState<string | undefined>(
    'preSelectedToProject',
    undefined,
  );

  // Form state
  const [fromProjectGuid, setFromProjectGuid] = useState<string | undefined>(
    preSelectedFromProject,
  );
  const [toProjectGuid, setToProjectGuid] = useState<string | undefined>(preSelectedToProject);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  // UI state
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // Derived state
  const fromProject = useMemo(
    () => availableProjects.find((p) => p.guid === fromProjectGuid),
    [availableProjects, fromProjectGuid],
  );

  const compatibleDestinations = useMemo(() => {
    if (!fromProject) return [];
    return filterDestinationProjects(fromProject, availableProjects);
  }, [fromProject, availableProjects]);

  const toProject = useMemo(
    () => compatibleDestinations.find((p) => p.guid === toProjectGuid),
    [compatibleDestinations, toProjectGuid],
  );

  const books = useMemo(() => {
    if (!fromProject || !toProject) return [];
    return buildBookComparison(fromProject, toProject);
  }, [fromProject, toProject]);

  const copyableBooks = useMemo(() => books.filter((b) => b.isCopyable), [books]);

  // Determine warning message
  const warningMessage = useMemo(() => {
    if (!fromProjectGuid) {
      return (
        localizedStrings['%webView_copyBooks_warning_selectProject%'] ||
        'Select a source project to see available books'
      );
    }
    if (fromProject && fromProject.booksPresent.length === 0) {
      return (
        localizedStrings['%webView_copyBooks_warning_sourceNoBooks%'] ||
        'Source project has no books'
      );
    }
    if (!toProjectGuid) {
      return (
        localizedStrings['%webView_copyBooks_warning_selectProject%'] ||
        'Select a destination project'
      );
    }
    if (compatibleDestinations.length === 0 && fromProjectGuid) {
      return (
        localizedStrings['%webView_copyBooks_warning_noCompatible%'] ||
        'No compatible destination projects available'
      );
    }
    return undefined;
  }, [
    fromProjectGuid,
    toProjectGuid,
    fromProject,
    compatibleDestinations.length,
    localizedStrings,
  ]);

  // Options for ComboBox - use display strings and map back to guids
  const fromProjectOptions = useMemo(
    () => availableProjects.map((p) => `${p.shortName} - ${p.fullName}`),
    [availableProjects],
  );

  const toProjectOptions = useMemo(
    () => compatibleDestinations.map((p) => `${p.shortName} - ${p.fullName}`),
    [compatibleDestinations],
  );

  // Helper to convert display string to guid
  const getGuidFromDisplayString = useCallback(
    (display: string | undefined, projects: CopyBooksProjectReference[]): string | undefined => {
      if (!display) return undefined;
      const project = projects.find((p) => `${p.shortName} - ${p.fullName}` === display);
      return project?.guid;
    },
    [],
  );

  // Helper to get display string from guid
  const getDisplayStringFromGuid = useCallback(
    (guid: string | undefined, projects: CopyBooksProjectReference[]): string | undefined => {
      if (!guid) return undefined;
      const project = projects.find((p) => p.guid === guid);
      return project ? `${project.shortName} - ${project.fullName}` : undefined;
    },
    [],
  );

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleFromProjectChange = useCallback(
    (value: string) => {
      const guid = getGuidFromDisplayString(value || undefined, availableProjects);
      setFromProjectGuid(guid);
      // Reset destination when source changes
      setToProjectGuid(undefined);
      setSelectedBookIds([]);
      setErrorMessage(undefined);
    },
    [availableProjects, getGuidFromDisplayString],
  );

  const handleToProjectChange = useCallback(
    (value: string) => {
      const guid = getGuidFromDisplayString(value || undefined, compatibleDestinations);
      setToProjectGuid(guid);
      setSelectedBookIds([]);
      setErrorMessage(undefined);
    },
    [compatibleDestinations, getGuidFromDisplayString],
  );

  const handleSelectAll = useCallback(() => {
    const allCopyableIds = copyableBooks.map((b) => b.bookId);
    setSelectedBookIds(allCopyableIds);
  }, [copyableBooks]);

  const handleDeselectAll = useCallback(() => {
    setSelectedBookIds([]);
  }, []);

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedBookIds(ids);
    setErrorMessage(undefined);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!fromProjectGuid || !toProjectGuid || selectedBookIds.length === 0) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      // Call backend to copy books (CAP-009)
      const result = await papi.commands.sendCommand('platformProjects.copyBooks', {
        fromProjectGuid,
        toProjectGuid,
        bookIds: selectedBookIds,
      });

      if (result && result.success) {
        logger.info(
          `Successfully copied ${selectedBookIds.length} books from ${fromProjectGuid} to ${toProjectGuid}`,
        );
        // Dialog would close on success
      } else {
        const errorMsg =
          result?.error ||
          localizedStrings['%webView_copyBooks_error_copyFailed%'] ||
          'Failed to copy books';
        setErrorMessage(errorMsg);
        logger.error('Copy books failed:', errorMsg);
      }
    } catch (error) {
      const errorMsg =
        localizedStrings['%webView_copyBooks_error_copyFailed%'] || 'Failed to copy books';
      setErrorMessage(errorMsg);
      logger.error('Copy books error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [fromProjectGuid, toProjectGuid, selectedBookIds, localizedStrings]);

  const handleCancel = useCallback(() => {
    logger.info('Copy books dialog cancelled');
    // Close the web view
  }, []);

  // Reset to-project if it's no longer compatible
  useEffect(() => {
    if (toProjectGuid && !compatibleDestinations.find((p) => p.guid === toProjectGuid)) {
      setToProjectGuid(undefined);
    }
  }, [toProjectGuid, compatibleDestinations]);

  // ============================================================================
  // RENDER
  // ============================================================================

  const isSubmitDisabled =
    isSubmitting || !fromProjectGuid || !toProjectGuid || selectedBookIds.length === 0;

  const submitButtonTooltip = useMemo(() => {
    if (isSubmitting) return undefined;
    if (!fromProjectGuid || !toProjectGuid) {
      return (
        localizedStrings['%webView_copyBooks_warning_selectProject%'] || 'Select both projects'
      );
    }
    if (selectedBookIds.length === 0) {
      return (
        localizedStrings['%webView_copyBooks_tooltip_selectBooks%'] ||
        'Select at least one book to copy'
      );
    }
    return undefined;
  }, [isSubmitting, fromProjectGuid, toProjectGuid, selectedBookIds.length, localizedStrings]);

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Project Selection Zone */}
      <div className="tw-p-4 tw-border-b tw-border-border">
        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          {/* From Project */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="from-project">
              {localizedStrings['%webView_copyBooks_label_from%'] || 'From:'}
            </Label>
            <ComboBox
              options={fromProjectOptions}
              value={getDisplayStringFromGuid(fromProjectGuid, availableProjects)}
              onChange={handleFromProjectChange}
              buttonPlaceholder={
                localizedStrings['%webView_copyBooks_placeholder_selectProject%'] ||
                'Select project...'
              }
              textPlaceholder={
                localizedStrings['%webView_copyBooks_placeholder_selectProject%'] ||
                'Search projects...'
              }
              isDisabled={isSubmitting || isLoading}
              aria-label={
                localizedStrings['%webView_copyBooks_ariaLabel_fromSelect%'] ||
                'Select source project'
              }
            />
          </div>

          {/* To Project */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="to-project">
              {localizedStrings['%webView_copyBooks_label_to%'] || 'To:'}
            </Label>
            <ComboBox
              options={toProjectOptions}
              value={getDisplayStringFromGuid(toProjectGuid, compatibleDestinations)}
              onChange={handleToProjectChange}
              buttonPlaceholder={
                localizedStrings['%webView_copyBooks_placeholder_selectProject%'] ||
                'Select project...'
              }
              textPlaceholder={
                localizedStrings['%webView_copyBooks_placeholder_selectProject%'] ||
                'Search projects...'
              }
              isDisabled={isSubmitting || isLoading || !fromProjectGuid}
              aria-label={
                localizedStrings['%webView_copyBooks_ariaLabel_toSelect%'] ||
                'Select destination project'
              }
            />
          </div>
        </div>
      </div>

      {/* Warning/Info Zone */}
      {warningMessage && (
        <div className="tw-p-3 tw-bg-muted tw-border-b tw-border-border">
          <p className="tw-text-sm tw-text-muted-foreground">{warningMessage}</p>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="tw-p-3 tw-bg-destructive/10 tw-border-b tw-border-destructive">
          <p className="tw-text-sm tw-text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* Book Selection Grid Zone */}
      <div className="tw-flex-1 tw-overflow-hidden tw-p-4">
        {isLoading && (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
            <Spinner className="tw-mr-2" />
            <span className="tw-text-muted-foreground">
              {localizedStrings['%webView_copyBooks_loading%'] || 'Loading...'}
            </span>
          </div>
        )}
        {!isLoading && fromProject && toProject && (
          <BookComparisonGrid
            books={books}
            selectedBookIds={selectedBookIds}
            onSelectionChange={handleSelectionChange}
            localizedStrings={localizedStrings}
            disabled={isSubmitting}
          />
        )}
        {!isLoading && !(fromProject && toProject) && (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_warning_selectProject%'] ||
              'Select source and destination projects'}
          </div>
        )}
      </div>

      {/* Selection Actions Zone */}
      {fromProject && toProject && copyableBooks.length > 0 && (
        <div className="tw-flex tw-gap-2 tw-px-4 tw-pb-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            disabled={isSubmitting || copyableBooks.length === 0}
          >
            {localizedStrings['%webView_copyBooks_button_selectAll%'] || 'Select All'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            disabled={isSubmitting || selectedBookIds.length === 0}
          >
            {localizedStrings['%webView_copyBooks_button_deselectAll%'] || 'Deselect All'}
          </Button>
        </div>
      )}

      {/* Dialog Actions Zone */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          {localizedStrings['%webView_copyBooks_button_cancel%'] || 'Cancel'}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitDisabled}>
                  {isSubmitting ? (
                    <>
                      <Spinner className="tw-mr-2 tw-h-4 tw-w-4" />
                      {localizedStrings['%webView_copyBooks_copying%'] || 'Copying...'}
                    </>
                  ) : (
                    localizedStrings['%webView_copyBooks_button_ok%'] || 'OK'
                  )}
                </Button>
              </span>
            </TooltipTrigger>
            {submitButtonTooltip && !isSubmitting && (
              <TooltipContent>{submitButtonTooltip}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
