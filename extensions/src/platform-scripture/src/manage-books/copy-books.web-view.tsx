/**
 * === NEW IN PT10 === Reason: React component pattern - CopyBooks dialog for copying scripture
 * books between projects Maps to: UI-PKG-005 (CAP-UI-002)
 *
 * Behaviors implemented:
 *
 * - BHV-303: From/To project dropdowns with type filtering
 * - BHV-304: Preselection for Auxiliary and Daughter project types
 * - BHV-305: Select all / Deselect all buttons
 * - BHV-306: OK button enabled state
 * - BHV-T009, EXT-008: Newer books shown in bold
 * - INV-007, INV-008: Project type filtering enforced
 * - SUBFLOW-001: View differences context menu disabled (deferred)
 * - SUBFLOW-002: New project option removed (deferred)
 *
 * @see ui-spec-copy-books.md for full specification
 */
import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  ComboBox,
  Label,
  Separator,
  Spinner,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type BookComparison,
  type BookComparisonResult,
  type BookOperationResult,
  type CopyBooksInput,
  type CopyBooksOutput,
  type CopyProjectOption,
  COPY_BOOKS_LOCALIZED_STRINGS,
  filterCompatibleTargets,
  getPreselection,
  initializeSelectedBooks,
  toBookComparison,
} from './copy-books.utils';

/** Default input for development/testing */
const DEFAULT_INPUT: CopyBooksInput = {
  currentProjectId: '',
  currentProjectType: 'Standard',
  fromProjects: [],
};

/**
 * CopyBooks web view component for copying scripture books between projects
 *
 * Features:
 *
 * - From/To project searchable dropdowns with project type filtering
 * - Book comparison grid with checkbox selection, bold for newer books
 * - Select All / Deselect All buttons
 * - Preselection logic for Auxiliary and Daughter project types
 * - PAPI integration for comparison and copy operations
 */
global.webViewComponent = function CopyBooksWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // ========================================================================
  // Localization
  // ========================================================================

  const [localizedStrings] = useLocalizedStrings(useMemo(() => COPY_BOOKS_LOCALIZED_STRINGS, []));

  // ========================================================================
  // Input State
  // ========================================================================

  const [inputState] = useWebViewState<CopyBooksInput>('input', DEFAULT_INPUT);
  const { currentProjectType, fromProjects, baseProjectId } = inputState;

  // ========================================================================
  // Preselection (BHV-304)
  // ========================================================================

  const preselection = useMemo(() => getPreselection(inputState), [inputState]);

  // ========================================================================
  // Form State
  // ========================================================================

  const [fromProjectId, setFromProjectId] = useState<string | null>(preselection.fromProjectId);
  const [toProjectId, setToProjectId] = useState<string | null>(preselection.toProjectId);
  const [bookComparisons, setBookComparisons] = useState<BookComparison[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyErrors, setCopyErrors] = useState<Array<{ bookNum: number; error: string }>>([]);

  // ========================================================================
  // Output State
  // ========================================================================

  const [, setOutput] = useWebViewState<CopyBooksOutput | undefined>('output', undefined);

  // ========================================================================
  // Derived State
  // ========================================================================

  /** Get the selected From project object */
  const fromProject = useMemo(
    () => fromProjects.find((p) => p.id === fromProjectId) || null,
    [fromProjects, fromProjectId],
  );

  /** Filter To projects based on From project type (INV-007, INV-008) */
  const filteredToProjects = useMemo(() => {
    if (!fromProject) return [];
    return filterCompatibleTargets(fromProject.id, fromProject.projectType, fromProjects);
  }, [fromProject, fromProjects]);

  /** Show warning when either project is not selected */
  const showWarning = !fromProjectId || !toProjectId;

  /** OK button is disabled when projects not selected or submitting */
  const isOkDisabled = !fromProjectId || !toProjectId || isSubmitting;

  /** Count of currently selected books */
  const selectedCount = useMemo(
    () => Object.values(selectedBooks).filter(Boolean).length,
    [selectedBooks],
  );

  /** Whether grid has any enabled rows */
  const hasEnabledRows = useMemo(() => bookComparisons.some((c) => c.isEnabled), [bookComparisons]);

  // ========================================================================
  // Load Comparison Data (ScrTextSelected)
  // ========================================================================

  useEffect(() => {
    if (!fromProjectId || !toProjectId) {
      setBookComparisons([]);
      setSelectedBooks({});
      return;
    }

    let cancelled = false;

    async function loadComparison(): Promise<void> {
      setIsLoading(true);
      setCopyErrors([]);

      try {
        const result = await papi.commands.sendCommand<BookComparisonResult>(
          'platformScripture.compareBooks',
          {
            sourceProjectId: fromProjectId,
            destProjectId: toProjectId,
          },
        );

        if (cancelled) return;

        if (result && result.books) {
          const comparisons = result.books.map(toBookComparison);
          setBookComparisons(comparisons);
          setSelectedBooks(initializeSelectedBooks(comparisons));
        } else {
          setBookComparisons([]);
          setSelectedBooks({});
        }
      } catch (error) {
        if (cancelled) return;
        console.error('CopyBooksWebView: Error loading comparison:', error);
        setBookComparisons([]);
        setSelectedBooks({});
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadComparison();

    return () => {
      cancelled = true;
    };
  }, [fromProjectId, toProjectId]);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  /** Handle From project change */
  const handleFromProjectChange = useCallback(
    (project: CopyProjectOption) => {
      setFromProjectId(project.id);

      // If current To selection is no longer compatible, clear it
      const newFiltered = filterCompatibleTargets(project.id, project.projectType, fromProjects);
      if (toProjectId && !newFiltered.some((p) => p.id === toProjectId)) {
        setToProjectId(null);
      }
    },
    [fromProjects, toProjectId],
  );

  /** Handle To project change */
  const handleToProjectChange = useCallback((project: CopyProjectOption) => {
    setToProjectId(project.id);
  }, []);

  /** Handle individual book checkbox toggle */
  const handleBookToggle = useCallback((bookNum: number, checked: boolean) => {
    setSelectedBooks((prev) => ({
      ...prev,
      [bookNum]: checked,
    }));
  }, []);

  /** Select all enabled books (BHV-305) */
  const handleSelectAll = useCallback(() => {
    setSelectedBooks((prev) => {
      const next = { ...prev };
      for (const comparison of bookComparisons) {
        if (comparison.isEnabled) {
          next[comparison.bookNum] = true;
        }
      }
      return next;
    });
  }, [bookComparisons]);

  /** Deselect all books (BHV-305) */
  const handleDeselectAll = useCallback(() => {
    setSelectedBooks((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[Number(key)] = false;
      }
      return next;
    });
  }, []);

  /** Handle OK / submit (copy books) */
  const handleOk = useCallback(async () => {
    if (!fromProjectId || !toProjectId) return;

    const booksToProcess = Object.entries(selectedBooks)
      .filter(([, selected]) => selected)
      .map(([bookNum]) => Number(bookNum));

    if (booksToProcess.length === 0) return;

    setIsSubmitting(true);
    setCopyErrors([]);

    try {
      const result = await papi.commands.sendCommand<BookOperationResult>(
        'platformScripture.copyBooks',
        {
          sourceProjectId: fromProjectId,
          destProjectId: toProjectId,
          bookNumbers: booksToProcess,
        },
      );

      if (result) {
        const errors = result.errors?.map((e) => ({ bookNum: e.bookNum, error: e.message })) || [];

        if (errors.length > 0) {
          setCopyErrors(errors);
        }

        setOutput({
          action: 'submit',
          copiedBooks: result.processedBooks,
          lastCopiedBookNum: result.lastBookNum,
          errors: errors.length > 0 ? errors : undefined,
        });
      }
    } catch (error) {
      console.error('CopyBooksWebView: Error copying books:', error);
      setCopyErrors([
        {
          bookNum: 0,
          error: error instanceof Error ? error.message : 'Unknown error during copy',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [fromProjectId, toProjectId, selectedBooks, setOutput]);

  /** Handle Cancel */
  const handleCancel = useCallback(() => {
    setOutput({ action: 'cancel' });
  }, [setOutput]);

  /** Keyboard handler for Escape and Enter */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter' && !isOkDisabled && selectedCount > 0 && !isSubmitting) {
        handleOk();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleOk, isOkDisabled, selectedCount, isSubmitting]);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4"
      data-testid="CopyBooksForm"
    >
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
        {localizedStrings['%webView_copyBooks_title%'] || 'Copy Books'}
      </h2>

      {/* Project Selection Zone */}
      <div className="tw-flex tw-flex-col tw-gap-3">
        {/* From Project Dropdown (BHV-303) */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Label htmlFor="from-project" className="tw-font-medium tw-min-w-[100px]">
            {localizedStrings['%webView_copyBooks_fromProjectLabel%'] || 'From project'}
          </Label>
          <div className="tw-flex-1">
            <ComboBox<CopyProjectOption>
              options={fromProjects}
              value={fromProject || undefined}
              onChange={handleFromProjectChange}
              getOptionLabel={(option) => option.name}
              isDisabled={isSubmitting}
              buttonPlaceholder={
                localizedStrings['%webView_copyBooks_fromProjectPlaceholder%'] ||
                'Select source project...'
              }
              ariaLabel={
                localizedStrings['%webView_copyBooks_fromDropdown_ariaLabel%'] || 'From project'
              }
            />
          </div>
        </div>

        {/* To Project Dropdown (BHV-303) */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Label htmlFor="to-project" className="tw-font-medium tw-min-w-[100px]">
            {localizedStrings['%webView_copyBooks_toProjectLabel%'] || 'To project'}
          </Label>
          <div className="tw-flex-1">
            <ComboBox<CopyProjectOption>
              options={filteredToProjects}
              value={filteredToProjects.find((p) => p.id === toProjectId) || undefined}
              onChange={handleToProjectChange}
              getOptionLabel={(option) => option.name}
              isDisabled={!fromProjectId || isSubmitting}
              buttonPlaceholder={
                localizedStrings['%webView_copyBooks_toProjectPlaceholder%'] ||
                'Select destination project...'
              }
              ariaLabel={
                localizedStrings['%webView_copyBooks_toDropdown_ariaLabel%'] || 'To project'
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Warning Zone (conditional) */}
      {showWarning && (
        <Alert variant="default" role="alert">
          <AlertDescription>
            {localizedStrings['%webView_copyBooks_warningMessage%'] ||
              'Select "From project" and "To project" above'}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div
          className="tw-flex tw-items-center tw-justify-center tw-py-4"
          role="status"
          aria-label={
            localizedStrings['%webView_copyBooks_loadingComparison%'] || 'Loading book comparison'
          }
        >
          <Spinner />
          <span className="tw-ml-2 tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_loadingComparison%'] ||
              'Loading book comparison...'}
          </span>
        </div>
      )}

      {/* Book Comparison Grid (EXT-007, EXT-008) */}
      {!showWarning && !isLoading && bookComparisons.length > 0 && (
        <div
          className="tw-flex-1 tw-overflow-auto tw-border tw-rounded"
          role="table"
          aria-label={
            localizedStrings['%webView_copyBooks_grid_ariaLabel%'] || 'Book comparison grid'
          }
        >
          {/* Grid Header */}
          <div
            className="tw-flex tw-items-center tw-bg-muted tw-border-b tw-sticky tw-top-0 tw-z-10"
            role="row"
          >
            <div
              className="tw-w-10 tw-flex-shrink-0 tw-px-2 tw-py-2"
              role="columnheader"
              aria-label="Select"
            />
            <div
              className="tw-flex-1 tw-px-3 tw-py-2 tw-font-medium tw-text-sm"
              role="columnheader"
            >
              {localizedStrings['%webView_copyBooks_fromBooksHeader%'] || '"From" books'}
            </div>
            <div
              className="tw-flex-1 tw-px-3 tw-py-2 tw-font-medium tw-text-sm"
              role="columnheader"
            >
              {localizedStrings['%webView_copyBooks_toBooksHeader%'] || '"To" books'}
            </div>
          </div>

          {/* Grid Rows */}
          {bookComparisons.map((comparison) => (
            <div
              key={comparison.bookNum}
              className="tw-flex tw-items-center tw-border-b last:tw-border-b-0 hover:tw-bg-accent/50"
              role="row"
            >
              {/* Checkbox Column */}
              <div
                className="tw-w-10 tw-flex-shrink-0 tw-px-2 tw-py-1.5 tw-flex tw-justify-center"
                role="cell"
              >
                <Checkbox
                  checked={selectedBooks[comparison.bookNum] || false}
                  onCheckedChange={(checked) =>
                    handleBookToggle(comparison.bookNum, checked === true)
                  }
                  disabled={!comparison.isEnabled || isSubmitting}
                  aria-label={`Select ${comparison.bookName}`}
                />
              </div>

              {/* Source Book Column (BHV-T009, EXT-008 - bold if newer) */}
              <div
                className={`tw-flex-1 tw-px-3 tw-py-1.5 tw-text-sm ${
                  comparison.comparisonState === 'source-newer' ? 'tw-font-bold' : ''
                }`}
                role="cell"
              >
                {comparison.source?.displayText || ''}
              </div>

              {/* Destination Book Column (EXT-008 - bold if newer) */}
              <div
                className={`tw-flex-1 tw-px-3 tw-py-1.5 tw-text-sm ${
                  comparison.comparisonState === 'dest-newer' ? 'tw-font-bold' : ''
                }`}
                role="cell"
              >
                {comparison.dest?.displayText || ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid Actions: Select All / Deselect All (BHV-305) */}
      {!showWarning && !isLoading && bookComparisons.length > 0 && (
        <div className="tw-flex tw-gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            disabled={!hasEnabledRows || isSubmitting}
          >
            {localizedStrings['%webView_copyBooks_selectAllButton%'] || 'Select all files'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            disabled={!hasEnabledRows || isSubmitting}
          >
            {localizedStrings['%webView_copyBooks_deselectAllButton%'] || 'Deselect all files'}
          </Button>
        </div>
      )}

      {/* Copy Errors */}
      {copyErrors.length > 0 && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>
            {copyErrors.map((err) => (
              <div key={err.bookNum}>
                {err.bookNum > 0 ? `Book ${err.bookNum}: ${err.error}` : err.error}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Help Text */}
      <div className="tw-text-sm tw-text-muted-foreground tw-p-3 tw-bg-muted tw-rounded">
        {localizedStrings['%webView_copyBooks_helpText%'] ||
          'Copy the content of book(s) from one project to another. Select the source and destination projects, then choose which books to copy.'}
      </div>

      <div className="tw-flex-1" />

      <Separator />

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          {localizedStrings['%general_cancel%'] || 'Cancel'}
        </Button>
        <span
          title={
            isOkDisabled && !isSubmitting
              ? localizedStrings['%webView_copyBooks_warningMessage%'] ||
                'Select "From project" and "To project" above'
              : undefined
          }
        >
          <Button
            type="button"
            onClick={handleOk}
            disabled={isOkDisabled || selectedCount === 0}
            aria-label={localizedStrings['%general_ok%'] || 'OK'}
          >
            {isSubmitting
              ? localizedStrings['%webView_copyBooks_copying%'] || 'Copying...'
              : localizedStrings['%general_ok%'] || 'OK'}
          </Button>
        </span>
      </div>
    </div>
  );
};
