/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible web view Maps to: UI-PKG-006,
 * SCR-006, BHV-166, BHV-167, BHV-168, BHV-606, EXT-008
 *
 * EXPLANATION: This web view provides a dialog for copying books between projects. It includes:
 *
 * 1. Source project dropdown (From)
 * 2. Destination project dropdown (To) - filtered based on source project type
 * 3. Book comparison grid showing status in both projects
 * 4. Select All / Deselect All buttons
 * 5. OK / Cancel buttons
 *
 * Key behaviors:
 *
 * - EXT-008: Destination filtering based on project type compatibility
 * - BHV-606: StudyBible projects cannot create new project from this dialog
 * - BHV-168: Book status comparison between source and destination
 */

import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  ComboBox,
  ComboBoxLabelOption,
  Label,
  Spinner,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import type {
  BookCopyInfo,
  CopyBooksRequest,
  ProjectReference,
  ProjectType,
} from 'platform-projects';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookComparisonGrid } from './components/book-comparison-grid.component';

/** Localized string keys for the Copy Books dialog */
const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_copyBooks_title%',
  '%webView_copyBooks_fromProject_label%',
  '%webView_copyBooks_fromProject_placeholder%',
  '%webView_copyBooks_toProject_label%',
  '%webView_copyBooks_toProject_placeholder%',
  '%webView_copyBooks_selectProject%',
  '%webView_copyBooks_noCompatibleProjects%',
  '%webView_copyBooks_selectAll%',
  '%webView_copyBooks_deselectAll%',
  '%webView_copyBooks_selectAll_ariaLabel%',
  '%webView_copyBooks_select_ariaLabel%',
  '%webView_copyBooks_column_book%',
  '%webView_copyBooks_column_source%',
  '%webView_copyBooks_column_destination%',
  '%webView_copyBooks_status_Present%',
  '%webView_copyBooks_status_NotPresent%',
  '%webView_copyBooks_status_PresentOlder%',
  '%webView_copyBooks_status_PresentNewer%',
  '%webView_copyBooks_status_PresentSame%',
  '%webView_copyBooks_noBooks%',
  '%webView_copyBooks_selected%',
  '%webView_copyBooks_noneSelected%',
  '%webView_copyBooks_button_ok%',
  '%webView_copyBooks_button_cancel%',
  '%webView_copyBooks_copying%',
  '%webView_copyBooks_success%',
  '%webView_copyBooks_error%',
  '%webView_copyBooks_loadingProjects%',
  '%webView_copyBooks_loadingBooks%',
  '%webView_copyBooks_error_sameProject%',
  '%webView_copyBooks_error_selectBooks%',
];

/**
 * PLACEHOLDER: Mock projects for UI development. This will be replaced with real PAPI calls when
 * backend is ready.
 */
const MOCK_PROJECTS: ProjectReference[] = [
  {
    guid: 'proj-1-guid',
    shortName: 'TEST1',
    fullName: 'Test Project 1',
    projectType: 'Standard',
    booksPresent: ['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', 'JHN'],
    editable: true,
  },
  {
    guid: 'proj-2-guid',
    shortName: 'TEST2',
    fullName: 'Test Project 2',
    projectType: 'Standard',
    booksPresent: ['GEN', 'MAT', 'MRK'],
    editable: true,
  },
  {
    guid: 'proj-3-guid',
    shortName: 'BACK1',
    fullName: 'Back Translation 1',
    projectType: 'BackTranslation',
    booksPresent: ['MAT', 'MRK'],
    editable: true,
  },
  {
    guid: 'proj-4-guid',
    shortName: 'STUDY',
    fullName: 'Study Bible Project',
    projectType: 'StudyBibleAdditions',
    booksPresent: ['GEN', 'MAT'],
    editable: true,
  },
];

/**
 * PLACEHOLDER: Generate mock book comparison data. This will be replaced with real PAPI calls when
 * backend is ready.
 */
function generateMockBookComparison(
  fromProject: ProjectReference | undefined,
  toProject: ProjectReference | undefined,
): BookCopyInfo[] {
  if (!fromProject || !toProject) return [];

  const fromBooks = new Set(fromProject.booksPresent ?? []);
  const toBooks = new Set(toProject.booksPresent ?? []);

  // All 66 standard books
  const allBooks = [
    { id: 'GEN', name: 'Genesis' },
    { id: 'EXO', name: 'Exodus' },
    { id: 'LEV', name: 'Leviticus' },
    { id: 'NUM', name: 'Numbers' },
    { id: 'DEU', name: 'Deuteronomy' },
    { id: 'MAT', name: 'Matthew' },
    { id: 'MRK', name: 'Mark' },
    { id: 'LUK', name: 'Luke' },
    { id: 'JHN', name: 'John' },
    { id: 'ACT', name: 'Acts' },
    { id: 'ROM', name: 'Romans' },
  ];

  return allBooks
    .filter((book) => fromBooks.has(book.id)) // Only show books present in source
    .map((book) => ({
      bookId: book.id,
      bookName: book.name,
      sourceStatus: 'Present' as const,
      destStatus: toBooks.has(book.id) ? ('Present' as const) : ('NotPresent' as const),
      isCopyable: true,
    }));
}

/**
 * Filter destination projects based on source project type. Implements EXT-008 compatibility rules
 * and BHV-606 StudyBible restriction.
 */
function filterCompatibleDestinations(
  sourceProject: ProjectReference | undefined,
  allProjects: ProjectReference[],
): ProjectReference[] {
  if (!sourceProject) return [];

  return allProjects.filter((project) => {
    // Cannot copy to self
    if (project.guid === sourceProject.guid) return false;

    // Must be editable
    if (!project.editable) return false;

    // Type compatibility rules (EXT-008)
    const sourceType = sourceProject.projectType;
    const destType = project.projectType;

    switch (sourceType) {
      case 'Standard':
      case 'Daughter':
      case 'BackTranslation':
        // Can copy to Standard, Daughter, BackTranslation
        return ['Standard', 'Daughter', 'BackTranslation'].includes(destType);

      case 'StudyBibleAdditions':
        // StudyBible can only copy to same Study Bible base (BHV-606)
        // For now, only allow copying to other StudyBibleAdditions
        return destType === 'StudyBibleAdditions';

      case 'Auxiliary':
      case 'TransliterationManual':
        // Can copy to same type
        return destType === sourceType;

      case 'TransliterationWithEncoder':
        // Cannot copy from encoder-based transliteration
        return false;

      case 'ConsultantNotes':
        // Can copy to ConsultantNotes only
        return destType === 'ConsultantNotes';

      default:
        return false;
    }
  });
}

/** Check if a project type is a StudyBible type (BHV-606) */
function isStudyBibleType(projectType: ProjectType | undefined): boolean {
  return projectType === 'StudyBibleAdditions';
}

globalThis.webViewComponent = function CopyBooksWebView({ useWebViewState }: WebViewProps) {
  // State from web view initialization
  const [initialFromGuid] = useWebViewState<string | undefined>('fromProjectGuid', undefined);
  const [initialToGuid] = useWebViewState<string | undefined>('toProjectGuid', undefined);

  // Local state
  const [projects, setProjects] = useState<ProjectReference[]>([]);
  const [fromProjectGuid, setFromProjectGuid] = useState<string | undefined>(initialFromGuid);
  const [toProjectGuid, setToProjectGuid] = useState<string | undefined>(initialToGuid);
  const [books, setBooks] = useState<BookCopyInfo[]>([]);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  // Localization
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  // Derived state
  const fromProject = useMemo(
    () => projects.find((p) => p.guid === fromProjectGuid),
    [projects, fromProjectGuid],
  );

  const compatibleDestinations = useMemo(
    () => filterCompatibleDestinations(fromProject, projects),
    [fromProject, projects],
  );

  const toProject = useMemo(
    () => projects.find((p) => p.guid === toProjectGuid),
    [projects, toProjectGuid],
  );

  // Check if StudyBible source (affects "New project" option per BHV-606)
  const isStudyBibleSource = useMemo(
    () => isStudyBibleType(fromProject?.projectType),
    [fromProject],
  );

  // Validation
  const canSubmit = useMemo(() => {
    return (
      fromProjectGuid !== undefined &&
      toProjectGuid !== undefined &&
      fromProjectGuid !== toProjectGuid &&
      selectedBookIds.length > 0 &&
      !isSubmitting
    );
  }, [fromProjectGuid, toProjectGuid, selectedBookIds, isSubmitting]);

  // Load projects on mount
  useEffect(() => {
    async function loadProjects() {
      setIsLoadingProjects(true);
      setErrorMessage(undefined);

      try {
        // PLACEHOLDER: Use mock data until backend is ready
        // Real implementation would be:
        // const projectList = await papi.commands.sendCommand('platformProjects.getProjects');
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        }); // Simulate network delay
        setProjects(MOCK_PROJECTS);

        logger.debug('Loaded projects for Copy Books dialog');
      } catch (error) {
        logger.error('Failed to load projects:', error);
        setErrorMessage(localizedStrings['%webView_copyBooks_error%'] ?? 'Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    }

    loadProjects();
  }, [localizedStrings]);

  // Load book comparison when both projects are selected
  useEffect(() => {
    async function loadBooks() {
      if (!fromProjectGuid || !toProjectGuid) {
        setBooks([]);
        setSelectedBookIds([]);
        return;
      }

      if (fromProjectGuid === toProjectGuid) {
        setErrorMessage(localizedStrings['%webView_copyBooks_error_sameProject%']);
        setBooks([]);
        setSelectedBookIds([]);
        return;
      }

      setIsLoadingBooks(true);
      setErrorMessage(undefined);

      try {
        // PLACEHOLDER: Use mock data until backend is ready
        // Real implementation would be:
        // const bookComparison = await papi.commands.sendCommand(
        //   'platformProjects.compareBooks',
        //   fromProjectGuid,
        //   toProjectGuid
        // );
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 300);
        }); // Simulate network delay
        const bookComparison = generateMockBookComparison(fromProject, toProject);
        setBooks(bookComparison);
        setSelectedBookIds([]); // Reset selection when projects change

        logger.debug(`Loaded ${bookComparison.length} books for comparison`);
      } catch (error) {
        logger.error('Failed to load book comparison:', error);
        setErrorMessage(localizedStrings['%webView_copyBooks_error%'] ?? 'Failed to load books');
      } finally {
        setIsLoadingBooks(false);
      }
    }

    loadBooks();
  }, [fromProjectGuid, toProjectGuid, fromProject, toProject, localizedStrings]);

  // Create a map from label to GUID for reverse lookup
  const fromLabelToGuid = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => {
      map.set(`${p.shortName} - ${p.fullName}`, p.guid);
    });
    return map;
  }, [projects]);

  const toLabelToGuid = useMemo(() => {
    const map = new Map<string, string>();
    compatibleDestinations.forEach((p) => {
      map.set(`${p.shortName} - ${p.fullName}`, p.guid);
    });
    return map;
  }, [compatibleDestinations]);

  // Convert projects to ComboBox options (using label strings)
  const fromProjectOptions: ComboBoxLabelOption[] = useMemo(
    () =>
      projects.map((p) => ({
        label: `${p.shortName} - ${p.fullName}`,
      })),
    [projects],
  );

  const toProjectOptions: ComboBoxLabelOption[] = useMemo(
    () =>
      compatibleDestinations.map((p) => ({
        label: `${p.shortName} - ${p.fullName}`,
      })),
    [compatibleDestinations],
  );

  // Get the label for current selection
  const fromProjectLabel = useMemo(() => {
    if (!fromProjectGuid) return undefined;
    const project = projects.find((p) => p.guid === fromProjectGuid);
    return project ? { label: `${project.shortName} - ${project.fullName}` } : undefined;
  }, [fromProjectGuid, projects]);

  const toProjectLabel = useMemo(() => {
    if (!toProjectGuid) return undefined;
    const project = compatibleDestinations.find((p) => p.guid === toProjectGuid);
    return project ? { label: `${project.shortName} - ${project.fullName}` } : undefined;
  }, [toProjectGuid, compatibleDestinations]);

  // Compute placeholder text for destination dropdown (extracted to avoid nested ternary)
  const toProjectPlaceholder = useMemo(() => {
    if (!fromProjectGuid) {
      return localizedStrings['%webView_copyBooks_selectProject%'];
    }
    if (compatibleDestinations.length === 0) {
      return localizedStrings['%webView_copyBooks_noCompatibleProjects%'];
    }
    return localizedStrings['%webView_copyBooks_toProject_placeholder%'];
  }, [fromProjectGuid, compatibleDestinations.length, localizedStrings]);

  // Handle source project change
  const handleFromProjectChange = useCallback(
    (option: ComboBoxLabelOption) => {
      const guid = fromLabelToGuid.get(option.label);
      setFromProjectGuid(guid);
      // Clear destination if it's no longer compatible
      setToProjectGuid(undefined);
      setSuccessMessage(undefined);
    },
    [fromLabelToGuid],
  );

  // Handle destination project change
  const handleToProjectChange = useCallback(
    (option: ComboBoxLabelOption) => {
      const guid = toLabelToGuid.get(option.label);
      setToProjectGuid(guid);
      setSuccessMessage(undefined);
    },
    [toLabelToGuid],
  );

  // Handle copy submission
  const handleSubmit = useCallback(async () => {
    if (!canSubmit || !fromProjectGuid || !toProjectGuid) return;

    setIsSubmitting(true);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);

    try {
      const request: CopyBooksRequest = {
        fromProjectGuid,
        toProjectGuid,
        bookIds: selectedBookIds,
      };

      // PLACEHOLDER: Backend not yet implemented
      // Real implementation would be:
      // const result = await papi.commands.sendCommand('platformProjects.copyBooks', request);
      logger.info('Copy books request:', request);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      }); // Simulate operation

      // Simulate success
      setSuccessMessage(
        `${localizedStrings['%webView_copyBooks_success%']} (${selectedBookIds.length} books)`,
      );
      setSelectedBookIds([]);

      // Reload book comparison to reflect changes
      const bookComparison = generateMockBookComparison(fromProject, toProject);
      setBooks(bookComparison);
    } catch (error) {
      logger.error('Failed to copy books:', error);
      setErrorMessage(localizedStrings['%webView_copyBooks_error%'] ?? 'Failed to copy books');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    canSubmit,
    fromProjectGuid,
    toProjectGuid,
    selectedBookIds,
    localizedStrings,
    fromProject,
    toProject,
  ]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    // Close the web view
    // In Platform.Bible, this is typically handled by the parent or via PAPI
    logger.debug('Copy Books dialog cancelled');
  }, []);

  // Render loading state
  if (isLoadingProjects) {
    return (
      <div className="pr-twp tw-flex tw-items-center tw-justify-center tw-h-full tw-p-4">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
          <Spinner />
          <span className="tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_loadingProjects%']}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4">
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">
        {localizedStrings['%webView_copyBooks_title%']}
      </h2>

      {/* Project selection row */}
      <Card>
        <CardContent className="tw-p-4">
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            {/* From project */}
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label htmlFor="from-project">
                {localizedStrings['%webView_copyBooks_fromProject_label%']}
              </Label>
              <ComboBox
                id="from-project"
                options={fromProjectOptions}
                value={fromProjectLabel}
                onChange={handleFromProjectChange}
                buttonPlaceholder={localizedStrings['%webView_copyBooks_fromProject_placeholder%']}
                isDisabled={isSubmitting}
              />
            </div>

            {/* To project */}
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label htmlFor="to-project">
                {localizedStrings['%webView_copyBooks_toProject_label%']}
              </Label>
              <ComboBox
                id="to-project"
                options={toProjectOptions}
                value={toProjectLabel}
                onChange={handleToProjectChange}
                buttonPlaceholder={toProjectPlaceholder}
                isDisabled={isSubmitting || !fromProjectGuid || compatibleDestinations.length === 0}
              />
              {/* BHV-606: Note about StudyBible restriction */}
              {isStudyBibleSource && (
                <span className="tw-text-xs tw-text-muted-foreground tw-mt-1">
                  {/* StudyBible projects can only copy to compatible Study Bible projects */}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error/Success messages */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Book comparison grid */}
      <div className="tw-flex-1 tw-min-h-0 tw-overflow-hidden">
        {/* Loading state */}
        {isLoadingBooks && (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
              <Spinner />
              <span className="tw-text-muted-foreground">
                {localizedStrings['%webView_copyBooks_loadingBooks%']}
              </span>
            </div>
          </div>
        )}
        {/* Book grid - shown when both projects selected and not loading */}
        {!isLoadingBooks && fromProjectGuid && toProjectGuid && (
          <BookComparisonGrid
            books={books}
            selectedBookIds={selectedBookIds}
            onSelectionChange={setSelectedBookIds}
            localizedStrings={localizedStrings}
            disabled={isSubmitting}
          />
        )}
        {/* Empty state - prompts user to select projects */}
        {!isLoadingBooks && (!fromProjectGuid || !toProjectGuid) && (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
            {localizedStrings['%webView_copyBooks_selectProject%']}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-2 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          {localizedStrings['%webView_copyBooks_button_cancel%']}
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {isSubmitting ? (
            <>
              <Spinner className="tw-mr-2 tw-h-4 tw-w-4" />
              {localizedStrings['%webView_copyBooks_copying%']}
            </>
          ) : (
            localizedStrings['%webView_copyBooks_button_ok%']
          )}
        </Button>
      </div>
    </div>
  );
};
