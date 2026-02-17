import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, ComboBox, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import BookComparisonGrid, {
  BookCopyInfo,
  BookStatus,
} from './components/book-comparison-grid.component';

// ============================================================================
// Types
// ============================================================================

type ProjectType =
  | 'Standard'
  | 'Daughter'
  | 'BackTranslation'
  | 'StudyBible'
  | 'StudyBibleAdditions'
  | 'Auxiliary'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'ConsultantNotes';

interface ProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  projectType: ProjectType;
  booksPresent: string[];
  editable: boolean;
}

// ============================================================================
// Mock data (Phase 3 - replaced by PAPI calls in Integration phase)
// ============================================================================

const MOCK_PROJECTS: ProjectReference[] = [
  {
    guid: 'proj-001',
    shortName: 'NASB',
    fullName: 'New American Standard Bible',
    projectType: 'Standard',
    booksPresent: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM'],
    editable: true,
  },
  {
    guid: 'proj-002',
    shortName: 'NIV',
    fullName: 'New International Version',
    projectType: 'Standard',
    booksPresent: ['GEN', 'EXO', 'MAT', 'MRK', 'LUK'],
    editable: true,
  },
  {
    guid: 'proj-003',
    shortName: 'ESV',
    fullName: 'English Standard Version',
    projectType: 'Standard',
    booksPresent: ['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', 'JHN'],
    editable: true,
  },
  {
    guid: 'proj-004',
    shortName: 'BTNAS',
    fullName: 'Back Translation of NASB',
    projectType: 'BackTranslation',
    booksPresent: ['GEN', 'MAT'],
    editable: true,
  },
  {
    guid: 'proj-005',
    shortName: 'AUX01',
    fullName: 'Auxiliary Project 1',
    projectType: 'Auxiliary',
    booksPresent: ['GEN', 'EXO'],
    editable: true,
  },
  {
    guid: 'proj-006',
    shortName: 'STUDY',
    fullName: 'Study Bible Project',
    projectType: 'StudyBible',
    booksPresent: ['GEN', 'EXO', 'MAT'],
    editable: false,
  },
];

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformProjects_copyBooks_title%',
  '%platformProjects_copyBooks_fromLabel%',
  '%platformProjects_copyBooks_toLabel%',
  '%platformProjects_copyBooks_selectProject%',
  '%platformProjects_copyBooks_warningSelectProjects%',
  '%platformProjects_copyBooks_warningNoBooks%',
  '%platformProjects_copyBooks_warningSameProject%',
  '%platformProjects_copyBooks_columnBook%',
  '%platformProjects_copyBooks_columnSourceStatus%',
  '%platformProjects_copyBooks_columnDestStatus%',
  '%platformProjects_copyBooks_selectColumn%',
  '%platformProjects_copyBooks_selectBook%',
  '%platformProjects_copyBooks_statusPresent%',
  '%platformProjects_copyBooks_statusNotPresent%',
  '%platformProjects_copyBooks_statusPresentOlder%',
  '%platformProjects_copyBooks_statusPresentNewer%',
  '%platformProjects_copyBooks_statusPresentSame%',
  '%platformProjects_books_selectAll%',
  '%platformProjects_books_deselectAll%',
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
];

// ============================================================================
// Helpers
// ============================================================================

function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

/**
 * Filter compatible destination projects per EXT-008. PT9 Source: CopyBooksForm.cs:533-610
 * LoadToComboboxOptions()
 */
function filterDestinationProjects(
  fromProject: ProjectReference,
  allProjects: ProjectReference[],
): ProjectReference[] {
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
        return ['Standard', 'Daughter', 'BackTranslation'].includes(project.projectType);

      case 'StudyBible':
      case 'StudyBibleAdditions':
        // BHV-606: Cannot create new project from Study Bible
        return false;

      case 'Auxiliary':
      case 'TransliterationManual':
        return project.projectType === fromProject.projectType;

      case 'TransliterationWithEncoder':
        return false;

      case 'ConsultantNotes':
        return project.projectType === 'ConsultantNotes';

      default:
        return false;
    }
  });
}

/** Build book comparison data for selected source and destination projects. */
function buildBookComparisonData(
  sourceProject: ProjectReference,
  destProject: ProjectReference,
): BookCopyInfo[] {
  const allBookIds = new Set([...sourceProject.booksPresent, ...destProject.booksPresent]);
  const sortedBookIds = Array.from(allBookIds).sort();

  return sortedBookIds.map((bookId) => {
    const inSource = sourceProject.booksPresent.includes(bookId);
    const inDest = destProject.booksPresent.includes(bookId);

    let sourceStatus: BookStatus;
    let destStatus: BookStatus;

    if (inSource) {
      sourceStatus = 'Present';
    } else {
      sourceStatus = 'NotPresent';
    }

    if (inDest) {
      destStatus = 'Present';
    } else {
      destStatus = 'NotPresent';
    }

    // A book is copyable if it exists in the source project
    const isCopyable = inSource;

    return {
      bookId,
      bookName: bookId,
      sourceStatus,
      destStatus,
      isCopyable,
    };
  });
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function CopyBooksWebView(_webViewProps: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Form state
  const [fromProjectGuid, setFromProjectGuid] = useState<string | undefined>(undefined);
  const [toProjectGuid, setToProjectGuid] = useState<string | undefined>(undefined);
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Derived state
  const fromProject = useMemo(
    () => MOCK_PROJECTS.find((p) => p.guid === fromProjectGuid),
    [fromProjectGuid],
  );

  const compatibleDestinations = useMemo(() => {
    if (!fromProject) return [];
    return filterDestinationProjects(fromProject, MOCK_PROJECTS);
  }, [fromProject]);

  const toProject = useMemo(
    () => MOCK_PROJECTS.find((p) => p.guid === toProjectGuid),
    [toProjectGuid],
  );

  const books = useMemo(() => {
    if (!fromProject || !toProject) return [];
    return buildBookComparisonData(fromProject, toProject);
  }, [fromProject, toProject]);

  // Warning message logic
  const warningMessage = useMemo(() => {
    if (!fromProjectGuid || !toProjectGuid) {
      return l(
        '%platformProjects_copyBooks_warningSelectProjects%',
        'Select source and destination projects to compare books',
      );
    }
    if (fromProjectGuid === toProjectGuid) {
      return l(
        '%platformProjects_copyBooks_warningSameProject%',
        'Cannot copy to the same project',
      );
    }
    if (fromProject && fromProject.booksPresent.length === 0) {
      return l('%platformProjects_copyBooks_warningNoBooks%', 'Source project has no books');
    }
    return undefined;
  }, [fromProjectGuid, toProjectGuid, fromProject, l]);

  const showGrid = fromProject && toProject && fromProjectGuid !== toProjectGuid;

  // ComboBox options for From project
  const fromProjectOptions = useMemo(
    () => MOCK_PROJECTS.map((p) => ({ label: `${p.shortName} - ${p.fullName}` })),
    [],
  );

  // ComboBox options for To project
  const toProjectOptions = useMemo(
    () => compatibleDestinations.map((p) => ({ label: `${p.shortName} - ${p.fullName}` })),
    [compatibleDestinations],
  );

  // Map display labels back to GUIDs
  const fromDisplayToGuid = useMemo(() => {
    const map = new Map<string, string>();
    MOCK_PROJECTS.forEach((p) => {
      map.set(`${p.shortName} - ${p.fullName}`, p.guid);
    });
    return map;
  }, []);

  const toDisplayToGuid = useMemo(() => {
    const map = new Map<string, string>();
    compatibleDestinations.forEach((p) => {
      map.set(`${p.shortName} - ${p.fullName}`, p.guid);
    });
    return map;
  }, [compatibleDestinations]);

  // Selected ComboBox values
  const fromComboValue = useMemo(() => {
    if (!fromProject) return undefined;
    return { label: `${fromProject.shortName} - ${fromProject.fullName}` };
  }, [fromProject]);

  const toComboValue = useMemo(() => {
    if (!toProject) return undefined;
    return { label: `${toProject.shortName} - ${toProject.fullName}` };
  }, [toProject]);

  // Handlers
  const handleFromProjectChange = useCallback(
    (newValue: { label: string }) => {
      const guid = fromDisplayToGuid.get(newValue.label);
      setFromProjectGuid(guid);
      // Reset To project and selection when From changes
      setToProjectGuid(undefined);
      setSelectedBookIds([]);
    },
    [fromDisplayToGuid],
  );

  const handleToProjectChange = useCallback(
    (newValue: { label: string }) => {
      const guid = toDisplayToGuid.get(newValue.label);
      setToProjectGuid(guid);
      setSelectedBookIds([]);
    },
    [toDisplayToGuid],
  );

  const handleSubmit = useCallback(() => {
    if (!fromProjectGuid || !toProjectGuid || selectedBookIds.length === 0) return;

    setIsSubmitting(true);
    // Phase 3 mock: simulate copy operation
    // In production: call platformProjects.copyBooks via PAPI
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }, [fromProjectGuid, toProjectGuid, selectedBookIds]);

  const handleCancel = useCallback(() => {
    // In production: close the web view
  }, []);

  const isOkDisabled = isSubmitting || selectedBookIds.length === 0;

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_copyBooks_title%', 'Copy Books')}
        </h2>

        {/* Project Selection Zone */}
        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          {/* From Project */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="from-project-combobox">
              {l('%platformProjects_copyBooks_fromLabel%', 'From:')}
            </Label>
            <ComboBox
              id="from-project-combobox"
              options={fromProjectOptions}
              value={fromComboValue}
              onChange={handleFromProjectChange}
              buttonPlaceholder={l(
                '%platformProjects_copyBooks_selectProject%',
                'Select project...',
              )}
              ariaLabel={l('%platformProjects_copyBooks_fromLabel%', 'From')}
              isDisabled={isSubmitting}
            />
          </div>

          {/* To Project */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="to-project-combobox">
              {l('%platformProjects_copyBooks_toLabel%', 'To:')}
            </Label>
            <ComboBox
              id="to-project-combobox"
              options={toProjectOptions}
              value={toComboValue}
              onChange={handleToProjectChange}
              buttonPlaceholder={l(
                '%platformProjects_copyBooks_selectProject%',
                'Select project...',
              )}
              ariaLabel={l('%platformProjects_copyBooks_toLabel%', 'To')}
              isDisabled={isSubmitting || !fromProjectGuid}
            />
          </div>
        </div>

        {/* Warning / Info Zone */}
        {warningMessage ? (
          <div className="tw-text-sm tw-text-muted-foreground tw-py-2">{warningMessage}</div>
        ) : undefined}

        {/* Book Comparison Grid Zone */}
        {showGrid ? (
          <div className="tw-flex-1 tw-min-h-0">
            <BookComparisonGrid
              books={books}
              selectedBookIds={selectedBookIds}
              onSelectedBookIdsChange={setSelectedBookIds}
              localizedStrings={localizedStrings}
              disabled={isSubmitting}
            />
          </div>
        ) : undefined}

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-mt-auto">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isOkDisabled}>
            {l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
