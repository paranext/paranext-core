import { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox, Label, cn } from 'platform-bible-react';
import { Canon } from '@sillsdev/scripture';
import { Section, getSectionForBook } from 'platform-bible-utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

// =====================================================
// INTERFACES
// =====================================================

/**
 * Information about a single book for display in the book chooser. Maps to USFM book codes and
 * provides display metadata.
 */
export interface BookInfo {
  /** Standard USFM book code (e.g., 'GEN', 'MAT', 'REV') */
  bookCode: string;
  /** Localized display name for the book */
  bookName: string;
  /** Section/group this book belongs to */
  group: Section;
}

/**
 * Localized strings for the BookChooserControl component. Pass these via useLocalizedStrings hook
 * from the extension.
 */
export interface BookChooserLocalizedStrings {
  /** Header for Old Testament section */
  '%book_chooser_ot%'?: string;
  /** Header for New Testament section */
  '%book_chooser_nt%'?: string;
  /** Header for Deuterocanonical section */
  '%book_chooser_dc%'?: string;
  /** Header for Non-Canonical/Extra section */
  '%book_chooser_extra%'?: string;
  /** Select all button text */
  '%book_chooser_select_all%'?: string;
  /** Clear all button text */
  '%book_chooser_clear_all%'?: string;
  /** Message shown when books are not needed (e.g., for ConsultantNotes) */
  '%book_chooser_not_needed%'?: string;
  /** Count of selected books template (e.g., "{count} selected") */
  '%book_chooser_selected_count%'?: string;
}

/** Keys for localizing book chooser components. */
export const BOOK_CHOOSER_STRING_KEYS = Object.freeze([
  '%book_chooser_ot%',
  '%book_chooser_nt%',
  '%book_chooser_dc%',
  '%book_chooser_extra%',
  '%book_chooser_select_all%',
  '%book_chooser_clear_all%',
  '%book_chooser_not_needed%',
  '%book_chooser_selected_count%',
] as const);

/**
 * Props for the BookChooserControl component. Based on ui-state-contracts.md and acceptance
 * criteria from strategic-plan-ui.md.
 */
export interface BookChooserProps {
  /** Array of currently selected book codes (e.g., ['GEN', 'EXO', 'MAT']) */
  selectedBooks: string[];
  /** Callback when selection changes */
  onChange: (selectedBooks: string[]) => void;
  /** Whether the control is disabled (e.g., during loading) */
  disabled?: boolean;
  /**
   * When true, shows "Books are not needed" message instead of book selection. Used for
   * ConsultantNotes projects.
   */
  showMessage?: boolean;
  /**
   * Optional array of available book codes. If not provided, all canonical books are available.
   * This can be used to filter available books based on project type or base project.
   */
  availableBooks?: string[];
  /** Optional localized strings for the component */
  localizedStrings?: BookChooserLocalizedStrings;
  /**
   * Optional map of localized book names. Key is the book code (e.g., 'GEN'), value contains
   * localized display name.
   */
  localizedBookNames?: Map<string, string>;
  /** Optional CSS class name for styling */
  className?: string;
}

// =====================================================
// CONSTANTS
// =====================================================

/** Default section display names */
const DEFAULT_SECTION_NAMES: Record<Section, string> = {
  [Section.OT]: 'Old Testament',
  [Section.NT]: 'New Testament',
  [Section.DC]: 'Deuterocanonical',
  [Section.Extra]: 'Non-Canonical',
};

/** Localization key map for section names */
const SECTION_LOCALIZATION_KEYS: Record<Section, keyof BookChooserLocalizedStrings> = {
  [Section.OT]: '%book_chooser_ot%',
  [Section.NT]: '%book_chooser_nt%',
  [Section.DC]: '%book_chooser_dc%',
  [Section.Extra]: '%book_chooser_extra%',
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Gets all canonical book IDs from the scripture library. Excludes obsolete books.
 *
 * @returns Array of book codes in canonical order
 */
function getAllCanonicalBooks(): string[] {
  return Canon.allBookIds.filter((bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)));
}

/**
 * Groups book codes by their section (OT, NT, DC, Extra).
 *
 * @param bookCodes - Array of book codes to group
 * @returns Record mapping Section to array of book codes
 */
function groupBooksBySection(bookCodes: string[]): Record<Section, string[]> {
  const groups: Record<Section, string[]> = {
    [Section.OT]: [],
    [Section.NT]: [],
    [Section.DC]: [],
    [Section.Extra]: [],
  };

  bookCodes.forEach((bookCode) => {
    try {
      const section = getSectionForBook(bookCode);
      groups[section].push(bookCode);
    } catch {
      // If book section can't be determined, skip it
    }
  });

  return groups;
}

/**
 * Gets the localized display name for a book.
 *
 * @param bookCode - The book code (e.g., 'GEN')
 * @param localizedNames - Optional map of localized names
 * @returns The localized name or English name if not available
 */
function getBookDisplayName(bookCode: string, localizedNames?: Map<string, string>): string {
  if (localizedNames?.has(bookCode)) {
    return localizedNames.get(bookCode) ?? Canon.bookIdToEnglishName(bookCode);
  }
  return Canon.bookIdToEnglishName(bookCode);
}

/**
 * Gets the localized section name.
 *
 * @param section - The section
 * @param localizedStrings - Optional localized strings
 * @returns The localized section name
 */
function getSectionDisplayName(
  section: Section,
  localizedStrings?: BookChooserLocalizedStrings,
): string {
  const key = SECTION_LOCALIZATION_KEYS[section];
  return localizedStrings?.[key] ?? DEFAULT_SECTION_NAMES[section];
}

// =====================================================
// SECTION GROUP COMPONENT
// =====================================================

interface BookSectionGroupProps {
  section: Section;
  books: string[];
  selectedBooks: string[];
  onToggleBook: (bookCode: string, selected: boolean) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  disabled?: boolean;
  localizedStrings?: BookChooserLocalizedStrings;
  localizedBookNames?: Map<string, string>;
  defaultExpanded?: boolean;
}

/**
 * A collapsible section group displaying books from a single section (OT, NT, DC, or Extra). Shows
 * a header with expand/collapse toggle and Select All / Clear All buttons.
 */
function BookSectionGroup({
  section,
  books,
  selectedBooks,
  onToggleBook,
  onSelectAll,
  onClearAll,
  disabled = false,
  localizedStrings,
  localizedBookNames,
  defaultExpanded = true,
}: BookSectionGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Count selected books in this section
  const selectedCount = useMemo(
    () => books.filter((book) => selectedBooks.includes(book)).length,
    [books, selectedBooks],
  );

  const sectionName = getSectionDisplayName(section, localizedStrings);
  const selectAllText = localizedStrings?.['%book_chooser_select_all%'] ?? 'Select All';
  const clearAllText = localizedStrings?.['%book_chooser_clear_all%'] ?? 'Clear All';

  // Don't render empty sections
  if (books.length === 0) {
    return undefined;
  }

  const isAllSelected = selectedCount === books.length;
  const isSomeSelected = selectedCount > 0 && selectedCount < books.length;

  return (
    <div className="tw-border tw-rounded-md tw-mb-2">
      {/* Section Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-p-2 tw-bg-muted/50">
        <button
          type="button"
          className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-font-semibold hover:tw-underline focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 tw-rounded"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`book-section-${section}`}
          disabled={disabled}
        >
          {isExpanded ? (
            <ChevronDown className="tw-h-4 tw-w-4" />
          ) : (
            <ChevronRight className="tw-h-4 tw-w-4" />
          )}
          <span>
            {sectionName} ({selectedCount}/{books.length})
          </span>
        </button>

        <div className="tw-flex tw-gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            disabled={disabled || isAllSelected}
            className="tw-h-7 tw-px-2 tw-text-xs"
          >
            {selectAllText}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            disabled={disabled || selectedCount === 0}
            className="tw-h-7 tw-px-2 tw-text-xs"
          >
            {clearAllText}
          </Button>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div
          id={`book-section-${section}`}
          className="tw-p-2 tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5 tw-gap-1"
          role="group"
          aria-label={sectionName}
        >
          {books.map((bookCode) => {
            const bookName = getBookDisplayName(bookCode, localizedBookNames);
            const isSelected = selectedBooks.includes(bookCode);
            const bookId = `book-checkbox-${bookCode}`;

            return (
              <div key={bookCode} className="tw-flex tw-items-center tw-gap-1.5 tw-py-0.5">
                <Checkbox
                  id={bookId}
                  checked={isSelected}
                  onCheckedChange={(checked) => onToggleBook(bookCode, checked === true)}
                  disabled={disabled}
                  aria-label={bookName}
                />
                <Label
                  htmlFor={bookId}
                  className={cn(
                    'tw-text-sm tw-cursor-pointer tw-truncate',
                    disabled && 'tw-opacity-50 tw-cursor-not-allowed',
                  )}
                  title={bookName}
                >
                  {bookName}
                </Label>
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsed state indicator */}
      {!isExpanded && isSomeSelected && (
        <div className="tw-px-2 tw-pb-2 tw-text-xs tw-text-muted-foreground">
          {selectedCount} book{selectedCount !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

/**
 * BookChooserControl component for selecting books in a project. Displays books grouped by section
 * (OT, NT, DC, Non-Canonical) with collapsible groups and Select All / Clear All functionality per
 * group.
 *
 * @remarks
 * This component is embedded in the Books tab of the ProjectPropertiesForm. It provides:
 *
 * - Multi-select control for 66+ canonical books
 * - Books grouped by OT/NT/DC/Non-Canonical sections
 * - Select all / clear all per group
 * - Visual indication of selected books via checkboxes
 * - "Books are not needed" message for ConsultantNotes projects
 *
 * @example
 *
 * ```tsx
 * const [selectedBooks, setSelectedBooks] = useState<string[]>(['GEN', 'EXO']);
 *
 * <BookChooserControl
 *   selectedBooks={selectedBooks}
 *   onChange={setSelectedBooks}
 *   disabled={false}
 *   showMessage={false}
 * />;
 * ```
 */
export function BookChooserControl({
  selectedBooks,
  onChange,
  disabled = false,
  showMessage = false,
  availableBooks,
  localizedStrings,
  localizedBookNames,
  className,
}: BookChooserProps) {
  // Get available books, defaulting to all canonical books
  const books = useMemo(() => {
    if (availableBooks && availableBooks.length > 0) {
      return availableBooks;
    }
    return getAllCanonicalBooks();
  }, [availableBooks]);

  // Group books by section
  const booksBySection = useMemo(() => groupBooksBySection(books), [books]);

  // Count total selected
  const totalSelected = useMemo(
    () => selectedBooks.filter((book) => books.includes(book)).length,
    [selectedBooks, books],
  );

  // Handle toggling a single book
  const handleToggleBook = useCallback(
    (bookCode: string, selected: boolean) => {
      if (selected) {
        onChange([...selectedBooks, bookCode]);
      } else {
        onChange(selectedBooks.filter((b) => b !== bookCode));
      }
    },
    [selectedBooks, onChange],
  );

  // Create section handlers
  const createSectionSelectAll = useCallback(
    (section: Section) => () => {
      const sectionBooks = booksBySection[section];
      const newSelection = [...new Set([...selectedBooks, ...sectionBooks])];
      onChange(newSelection);
    },
    [booksBySection, selectedBooks, onChange],
  );

  const createSectionClearAll = useCallback(
    (section: Section) => () => {
      const sectionBooks = new Set(booksBySection[section]);
      const newSelection = selectedBooks.filter((book) => !sectionBooks.has(book));
      onChange(newSelection);
    },
    [booksBySection, selectedBooks, onChange],
  );

  // Handle select all / clear all for entire control
  const handleSelectAllBooks = useCallback(() => {
    onChange([...books]);
  }, [books, onChange]);

  const handleClearAllBooks = useCallback(() => {
    onChange([]);
  }, [onChange]);

  // If showMessage is true, display the "not needed" message
  if (showMessage) {
    const notNeededMessage =
      localizedStrings?.['%book_chooser_not_needed%'] ??
      'Books are not needed for this project type.';

    return (
      <div className={cn('tw-p-4 tw-text-center tw-text-muted-foreground', className)}>
        <Label>{notNeededMessage}</Label>
      </div>
    );
  }

  // Get localized text
  const selectAllText = localizedStrings?.['%book_chooser_select_all%'] ?? 'Select All';
  const clearAllText = localizedStrings?.['%book_chooser_clear_all%'] ?? 'Clear All';
  const selectedCountTemplate =
    localizedStrings?.['%book_chooser_selected_count%'] ?? '{count} of {total} books selected';
  const selectedCountText = selectedCountTemplate
    .replace('{count}', String(totalSelected))
    .replace('{total}', String(books.length));

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      {/* Global controls header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-pb-2 tw-border-b">
        <span className="tw-text-sm tw-text-muted-foreground">{selectedCountText}</span>
        <div className="tw-flex tw-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAllBooks}
            disabled={disabled || totalSelected === books.length}
          >
            {selectAllText}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAllBooks}
            disabled={disabled || totalSelected === 0}
          >
            {clearAllText}
          </Button>
        </div>
      </div>

      {/* Book sections */}
      <div className="tw-space-y-2">
        {Object.values(Section).map((section) => (
          <BookSectionGroup
            key={section}
            section={section}
            books={booksBySection[section]}
            selectedBooks={selectedBooks}
            onToggleBook={handleToggleBook}
            onSelectAll={createSectionSelectAll(section)}
            onClearAll={createSectionClearAll(section)}
            disabled={disabled}
            localizedStrings={localizedStrings}
            localizedBookNames={localizedBookNames}
            defaultExpanded={section === Section.OT || section === Section.NT}
          />
        ))}
      </div>
    </div>
  );
}

export default BookChooserControl;
