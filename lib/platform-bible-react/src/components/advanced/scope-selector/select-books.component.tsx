import { Badge } from '@/components/shadcn-ui/badge';
import { Section } from 'platform-bible-utils';
import { getLocalizedBookName } from '@/components/shared/book.utils';
import { useCallback, useMemo } from 'react';
import {
  getAvailableBookIds,
  getBooksForSection,
  isSectionFullySelected,
} from './scope-selector.utils';
import { SelectBooksLocalizedStrings } from './select-books.types';
import { SelectBooksPicker } from './select-books-picker.component';
import SectionButton from './section-button.component';

/** Maximum number of badges to show before collapsing into a "+X more" badge */
const VISIBLE_BADGES_COUNT = 5;
/** Maximum number of badges that can be shown without triggering the collapse */
const MAX_VISIBLE_BADGES = 6;

type SelectBooksProps = {
  /**
   * Information about available books, formatted as a 123 character long string as defined in a
   * projects BooksPresent setting
   */
  availableBookInfo: string;
  /** Array of currently selected book IDs */
  selectedBookIds: string[];
  /** Callback function that is executed when the book selection changes */
  onChangeSelectedBookIds: (books: string[]) => void;
  /** Object containing the localized strings for the component */
  localizedStrings: SelectBooksLocalizedStrings;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
};

/**
 * A component for selecting multiple books from the Bible canon. It provides:
 *
 * - Quick selection buttons for major sections (OT, NT, DC, Extra)
 * - A searchable dropdown with all available books (see {@link SelectBooksPicker})
 * - Support for shift-click range selection
 * - Visual feedback with badges showing selected books
 */
export function SelectBooks({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
}: SelectBooksProps) {
  const moreText = localizedStrings['%webView_book_selector_more%'];

  const availableBooksIds = useMemo(
    () => getAvailableBookIds(availableBookInfo),
    [availableBookInfo],
  );

  const toggleSection = useCallback(
    (section: Section) => {
      const sectionBooks = getBooksForSection(availableBooksIds, section).map((bookId) => bookId);
      onChangeSelectedBookIds(
        isSectionFullySelected(availableBooksIds, section, selectedBookIds)
          ? selectedBookIds.filter((shortname) => !sectionBooks.includes(shortname))
          : [...new Set([...selectedBookIds, ...sectionBooks])],
      );
    },
    [selectedBookIds, onChangeSelectedBookIds, availableBooksIds],
  );

  return (
    <div className="tw:space-y-2">
      <div className="tw:flex tw:flex-wrap tw:gap-2">
        {Object.values(Section).map((section) => {
          return (
            <SectionButton
              key={section}
              section={section}
              availableBookIds={availableBooksIds}
              selectedBookIds={selectedBookIds}
              onToggle={toggleSection}
              localizedStrings={localizedStrings}
            />
          );
        })}
      </div>

      <SelectBooksPicker
        availableBookInfo={availableBookInfo}
        selectedBookIds={selectedBookIds}
        onChangeSelectedBookIds={onChangeSelectedBookIds}
        localizedStrings={localizedStrings}
        localizedBookNames={localizedBookNames}
      />

      {selectedBookIds.length > 0 && (
        <div className="tw:mt-2 tw:flex tw:flex-wrap tw:gap-1">
          {selectedBookIds
            .slice(
              0,
              selectedBookIds.length === MAX_VISIBLE_BADGES
                ? MAX_VISIBLE_BADGES
                : VISIBLE_BADGES_COUNT,
            )
            .map((bookId) => (
              <Badge className="tw:hover:bg-secondary" key={bookId} variant="secondary">
                {getLocalizedBookName(bookId, localizedBookNames)}
              </Badge>
            ))}
          {selectedBookIds.length > MAX_VISIBLE_BADGES && (
            <Badge
              className="tw:hover:bg-secondary"
              variant="secondary"
            >{`+${selectedBookIds.length - VISIBLE_BADGES_COUNT} ${moreText}`}</Badge>
          )}
        </div>
      )}
    </div>
  );
}
