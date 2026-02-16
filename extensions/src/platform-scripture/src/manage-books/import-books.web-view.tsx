/**
 * === NEW IN PT10 === Reason: React component pattern - ImportBooks dialog for importing scripture
 * files Maps to: UI-PKG-006 (CAP-UI-005)
 *
 * Behaviors implemented:
 *
 * - BHV-311: File browser auto-opens on dialog load
 * - BHV-312: Select all / Deselect all buttons
 * - BHV-313: Clear List button
 * - BHV-108: ImportBooks API called on submit
 * - BHV-109: ReadAndParseFilesIntoBooks parses selected files
 * - BHV-110: ExtractBooks splits multi-book files
 * - BHV-118: SetDefaultEligibility sets comparison state
 * - EXT-008: Newer books shown in bold
 * - EXT-011: Import orchestration in submit handler
 * - EXT-012: USX import handling with confirmation
 * - VAL-007: Duplicate book detection
 * - SUBFLOW-001: View differences context menu disabled (deferred)
 *
 * @see ui-spec-import-books.md for full specification
 */
import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Label,
  Separator,
  Spinner,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type BookOperationResult,
  type DuplicateError,
  type ImportBooksInput,
  type ImportBooksOutput,
  type ImportError,
  type ImportFileInfo,
  type ImportValidationResult,
  IMPORT_BOOKS_LOCALIZED_STRINGS,
  buildImportRequest,
  formatDuplicateError,
  initializeSelectedFiles,
  overlappingFilesFound,
  toImportFileInfo,
} from './import-books.utils';

/** Default input for development/testing */
const DEFAULT_INPUT: ImportBooksInput = {
  projectId: '',
  projectName: '',
  projectEncoding: 'UTF-8',
};

/**
 * ImportBooks web view component for importing scripture files into a project
 *
 * Features:
 *
 * - File browser auto-opens on load (BHV-311)
 * - File comparison grid with checkbox selection (EXT-008 - bold for newer)
 * - Select All / Deselect All / Clear List / Add Files buttons
 * - Duplicate book detection (VAL-007)
 * - Replace entire book(s) checkbox
 * - PAPI integration for validation and import operations
 */
global.webViewComponent = function ImportBooksWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // ========================================================================
  // Localization
  // ========================================================================

  const [localizedStrings] = useLocalizedStrings(useMemo(() => IMPORT_BOOKS_LOCALIZED_STRINGS, []));

  // ========================================================================
  // Input State
  // ========================================================================

  const [inputState] = useWebViewState<ImportBooksInput>('input', DEFAULT_INPUT);
  const { projectId, projectName } = inputState;

  // ========================================================================
  // Form State
  // ========================================================================

  const [importFiles, setImportFiles] = useState<ImportFileInfo[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Record<number, boolean>>({});
  const [replaceEntireBooks, setReplaceEntireBooks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [duplicateError, setDuplicateError] = useState<DuplicateError | null>(null);
  const [hasInitialBrowse, setHasInitialBrowse] = useState(false);

  // ========================================================================
  // Output State
  // ========================================================================

  const [, setOutput] = useWebViewState<ImportBooksOutput | undefined>('output', undefined);

  // ========================================================================
  // Derived State
  // ========================================================================

  /** Count of currently selected files */
  const selectedCount = useMemo(
    () => Object.values(selectedFiles).filter(Boolean).length,
    [selectedFiles],
  );

  /** Whether grid has any enabled rows */
  const hasEnabledRows = useMemo(() => importFiles.some((f) => f.isEnabled), [importFiles]);

  /** Whether grid has any files at all */
  const hasFiles = importFiles.length > 0;

  /** OK button is disabled when no files selected or submitting */
  const isOkDisabled = selectedCount === 0 || isSubmitting;

  // ========================================================================
  // File Browse and Validation
  // ========================================================================

  /**
   * Browse and add files to the import list. Uses PAPI validateImportFiles to parse and validate
   * selected files. BHV-311: File browser interaction
   */
  const browseAndAddFiles = useCallback(async () => {
    if (!projectId) return;

    setIsLoading(true);
    setDuplicateError(null);

    try {
      // Call PAPI to open file browser and validate selected files
      const validationResult = await papi.commands.sendCommand<ImportValidationResult>(
        'platformScripture.validateImportFiles',
        projectId,
        [],
      );

      if (!validationResult || !validationResult.files || validationResult.files.length === 0) {
        // User cancelled file browser or no valid files
        // BHV-311: If no prior files, close dialog
        if (!hasFiles && !hasInitialBrowse) {
          setOutput({ action: 'cancel' });
        }
        return;
      }

      // Convert validated files to ImportFileInfo
      const startIndex = importFiles.length;
      const newFiles = validationResult.files.map((vf, i) => toImportFileInfo(vf, startIndex + i));

      // Merge with existing files
      const allFiles = [...importFiles, ...newFiles];
      setImportFiles(allFiles);

      // Initialize selection for new files
      const newSelected = { ...selectedFiles };
      for (const file of newFiles) {
        if (file.isEnabled) {
          newSelected[file.index] = file.defaultInclude;
        }
      }
      setSelectedFiles(newSelected);

      // Check for duplicates (VAL-007)
      const duplicate = overlappingFilesFound(allFiles, newSelected);
      if (duplicate) {
        setDuplicateError(duplicate);
      }
    } catch (error) {
      console.error('ImportBooksWebView: Error browsing files:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, importFiles, selectedFiles, hasFiles, hasInitialBrowse, setOutput]);

  // ========================================================================
  // Auto-browse on mount (BHV-311)
  // ========================================================================

  useEffect(() => {
    if (hasInitialBrowse || !projectId) return;
    setHasInitialBrowse(true);
    browseAndAddFiles();
    // Only run on mount when projectId is available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  /** Handle individual file checkbox toggle */
  const handleFileToggle = useCallback(
    (fileIndex: number, checked: boolean) => {
      const newSelected = { ...selectedFiles, [fileIndex]: checked };
      setSelectedFiles(newSelected);

      // Re-check duplicates (VAL-007)
      const duplicate = overlappingFilesFound(importFiles, newSelected);
      setDuplicateError(duplicate);
    },
    [importFiles, selectedFiles],
  );

  /** Select all enabled files (BHV-312) */
  const handleSelectAll = useCallback(() => {
    setSelectedFiles((prev) => {
      const next = { ...prev };
      for (const file of importFiles) {
        if (file.isEnabled) {
          next[file.index] = true;
        }
      }
      // Re-check duplicates
      const duplicate = overlappingFilesFound(importFiles, next);
      setDuplicateError(duplicate);
      return next;
    });
  }, [importFiles]);

  /** Deselect all files (BHV-312) */
  const handleDeselectAll = useCallback(() => {
    setSelectedFiles((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[Number(key)] = false;
      }
      return next;
    });
    setDuplicateError(null);
  }, []);

  /** Clear all files from the list (BHV-313) */
  const handleClearList = useCallback(() => {
    setImportFiles([]);
    setSelectedFiles({});
    setDuplicateError(null);
    setImportErrors([]);
  }, []);

  /** Add more files to the list (cmdBrowse) */
  const handleAddFiles = useCallback(() => {
    browseAndAddFiles();
  }, [browseAndAddFiles]);

  /** Handle replace entire books checkbox toggle */
  const handleReplaceToggle = useCallback((checked: boolean) => {
    setReplaceEntireBooks(checked === true);
  }, []);

  /** Handle OK / submit (import books) - EXT-011 */
  const handleOk = useCallback(async () => {
    if (!projectId || selectedCount === 0) return;

    // Check for duplicate books (VAL-007)
    const duplicate = overlappingFilesFound(importFiles, selectedFiles);
    if (duplicate) {
      setDuplicateError(duplicate);
      return;
    }

    setIsSubmitting(true);
    setImportErrors([]);

    try {
      const request = buildImportRequest(projectId, importFiles, selectedFiles, replaceEntireBooks);

      const result = await papi.commands.sendCommand<BookOperationResult>(
        'platformScripture.importBooks',
        request,
      );

      if (result) {
        const errors: ImportError[] =
          result.errors?.map((e) => ({
            fileIndex: 0,
            fileName: `Book ${e.bookNum}`,
            error: e.message,
          })) || [];

        if (errors.length > 0) {
          setImportErrors(errors);
        }

        setOutput({
          action: 'submit',
          importedBooks: result.processedBooks,
          errors: errors.length > 0 ? errors : undefined,
        });
      }
    } catch (error) {
      console.error('ImportBooksWebView: Error importing books:', error);
      setImportErrors([
        {
          fileIndex: 0,
          fileName: '',
          error: error instanceof Error ? error.message : 'Unknown error during import',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [projectId, importFiles, selectedFiles, selectedCount, replaceEntireBooks, setOutput]);

  /** Handle Cancel */
  const handleCancel = useCallback(() => {
    setOutput({ action: 'cancel' });
  }, [setOutput]);

  /** Keyboard handler for Escape and Enter (GAP-008) */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter' && !isOkDisabled && !duplicateError) {
        handleOk();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleOk, isOkDisabled, duplicateError]);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4"
      data-testid="ImportBooksForm"
    >
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
        {`${localizedStrings['%webView_importBooks_title%'] || 'Import Book(s)'}: ${projectName}`}
      </h2>

      {/* File Comparison Grid (dgvFiles) */}
      {hasFiles && (
        <div
          className="tw-flex-1 tw-overflow-auto tw-border tw-rounded"
          role="table"
          aria-label={
            localizedStrings['%webView_importBooks_grid_ariaLabel%'] || 'File comparison grid'
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
              {localizedStrings['%webView_importBooks_booksToImportHeader%'] || 'Books to Import'}
            </div>
            <div
              className="tw-flex-1 tw-px-3 tw-py-2 tw-font-medium tw-text-sm"
              role="columnheader"
            >
              {localizedStrings['%webView_importBooks_booksInProjectHeader%'] || 'Books In Project'}
            </div>
          </div>

          {/* Grid Rows */}
          {importFiles.map((file) => (
            <div
              key={file.index}
              className="tw-flex tw-items-center tw-border-b last:tw-border-b-0 hover:tw-bg-accent/50"
              role="row"
            >
              {/* Checkbox Column */}
              <div
                className="tw-w-10 tw-flex-shrink-0 tw-px-2 tw-py-1.5 tw-flex tw-justify-center"
                role="cell"
              >
                <Checkbox
                  checked={selectedFiles[file.index] || false}
                  onCheckedChange={(checked) => handleFileToggle(file.index, checked === true)}
                  disabled={!file.isEnabled || isSubmitting}
                  aria-label={`Select ${file.bookName} (${file.fileName})`}
                />
              </div>

              {/* Source File Column (EXT-008 - bold if import is newer) */}
              <div
                className={`tw-flex-1 tw-px-3 tw-py-1.5 tw-text-sm ${
                  file.comparisonState === 'import-newer' ? 'tw-font-bold' : ''
                }`}
                role="cell"
              >
                {file.sourceDisplayText}
              </div>

              {/* Existing Book Column (EXT-008 - bold if existing is newer) */}
              <div
                className={`tw-flex-1 tw-px-3 tw-py-1.5 tw-text-sm ${
                  file.comparisonState === 'existing-newer' ? 'tw-font-bold' : ''
                }`}
                role="cell"
              >
                {file.existingBook?.displayText || ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!hasFiles && !isLoading && (
        <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-text-muted-foreground">
          <Label>
            {localizedStrings['%webView_importBooks_noFiles%'] ||
              'No files selected. Click "Add Files To List" to browse for Scripture files.'}
          </Label>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div
          className="tw-flex tw-items-center tw-justify-center tw-py-4"
          role="status"
          aria-label={
            localizedStrings['%webView_importBooks_validating%'] || 'Validating import files'
          }
        >
          <Spinner />
          <span className="tw-ml-2 tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%webView_importBooks_validating%'] || 'Validating import files...'}
          </span>
        </div>
      )}

      {/* Grid Actions: Select All / Deselect All (BHV-312) */}
      {hasFiles && (
        <div className="tw-flex tw-gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            disabled={!hasEnabledRows || isSubmitting}
          >
            {localizedStrings['%webView_importBooks_selectAllButton%'] || 'Select All Files'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            disabled={!hasEnabledRows || isSubmitting}
          >
            {localizedStrings['%webView_importBooks_deselectAllButton%'] || 'Deselect All Files'}
          </Button>
        </div>
      )}

      {/* Duplicate Error (VAL-007) */}
      {duplicateError && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{formatDuplicateError(duplicateError)}</AlertDescription>
        </Alert>
      )}

      {/* Import Errors */}
      {importErrors.length > 0 && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>
            {importErrors.map((err, i) => (
              <div key={`error-${String(i)}`}>
                {err.fileName ? `${err.fileName}: ${err.error}` : err.error}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Help Text (helpBoxControl1) */}
      <div className="tw-text-sm tw-text-muted-foreground tw-p-3 tw-bg-muted tw-rounded">
        {localizedStrings['%webView_importBooks_helpText%'] ||
          'This dialog allows you to import text into your project from external USFM, SFM, or USX files. Select the files to import, choose which books to include, and click OK to import.'}
      </div>

      <Separator />

      {/* Options and Actions Zone */}
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
        {/* Replace Entire Books Checkbox (chkReplaceEntireBooks) */}
        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            checked={replaceEntireBooks}
            onCheckedChange={handleReplaceToggle}
            disabled={isSubmitting}
            aria-label={
              localizedStrings['%webView_importBooks_replaceEntireBooksLabel%'] ||
              'Replace entire book(s)'
            }
          />
          <Label className="tw-text-sm">
            {localizedStrings['%webView_importBooks_replaceEntireBooksLabel%'] ||
              'Replace entire book(s)'}
          </Label>
        </div>

        {/* Action Buttons */}
        <div className="tw-flex tw-gap-2">
          {/* Add Files Button (cmdBrowse) */}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddFiles}
            disabled={isSubmitting || isLoading}
            aria-label={
              localizedStrings['%webView_importBooks_browseFiles_ariaLabel%'] ||
              'Add files to import list'
            }
          >
            {localizedStrings['%webView_importBooks_addFilesButton%'] || 'Add Files To List'}
          </Button>

          {/* Clear List Button (cmdClearList / BHV-313) */}
          <Button type="button" variant="outline" onClick={handleClearList} disabled={isSubmitting}>
            {localizedStrings['%webView_importBooks_clearListButton%'] || 'Clear List'}
          </Button>

          {/* OK Button (cmdOK) */}
          <span
            title={
              isOkDisabled && !isSubmitting
                ? localizedStrings['%webView_importBooks_noFiles%'] ||
                  'No files selected for import'
                : undefined
            }
          >
            <Button
              type="button"
              onClick={handleOk}
              disabled={isOkDisabled || !!duplicateError}
              aria-label={localizedStrings['%general_ok%'] || 'OK'}
            >
              {isSubmitting
                ? localizedStrings['%webView_importBooks_importing%'] || 'Importing...'
                : localizedStrings['%general_ok%'] || 'OK'}
            </Button>
          </span>

          {/* Cancel Button (cmdCancel) */}
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            {localizedStrings['%general_cancel%'] || 'Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
};
