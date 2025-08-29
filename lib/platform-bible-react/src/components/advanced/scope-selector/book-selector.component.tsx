import { BookItem } from '@/components/shared/book-item.component';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Canon } from '@sillsdev/scripture';
import { ChevronsUpDown } from 'lucide-react';
import { getSectionForBook, LanguageStrings, Section } from 'platform-bible-utils';
import {
  getSectionLongName,
  getLocalizedBookName,
  doesBookMatchQuery,
} from '@/components/shared/book.utils';
import { Fragment, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { generateCommandValue } from '@/components/shared/book-item.utils';
import { getBooksForSection, isSectionFullySelected } from './scope-selector.utils';
import SectionButton from './section-button.component';

/** Maximum number of badges to show before collapsing into a "+X more" badge */
const VISIBLE_BADGES_COUNT = 5;
/** Maximum number of badges that can be shown without triggering the collapse */
const MAX_VISIBLE_BADGES = 6;

type BookSelectorProps = {
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
  localizedStrings: LanguageStrings;
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
 * - A searchable dropdown with all available books
 * - Support for shift-click range selection
 * - Visual feedback with badges showing selected books
 */
export function BookSelector({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
}: BookSelectorProps) {
  const booksSelectedText = localizedStrings['%webView_book_selector_books_selected%'];
  const selectBooksText = localizedStrings['%webView_book_selector_select_books%'];
  const searchBooksText = localizedStrings['%webView_book_selector_search_books%'];
  const selectAllText = localizedStrings['%webView_book_selector_select_all%'];
  const clearAllText = localizedStrings['%webView_book_selector_clear_all%'];
  const noBookFoundText = localizedStrings['%webView_book_selector_no_book_found%'];
  const moreText = localizedStrings['%webView_book_selector_more%'];

  const { otLong, ntLong, dcLong, extraLong } = {
    otLong: localizedStrings?.['%scripture_section_ot_long%'],
    ntLong: localizedStrings?.['%scripture_section_nt_long%'],
    dcLong: localizedStrings?.['%scripture_section_dc_long%'],
    extraLong: localizedStrings?.['%scripture_section_extra_long%'],
  };

  const [isBooksSelectorOpen, setIsBooksSelectorOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const lastSelectedBookRef = useRef<string | undefined>(undefined);
  const lastKeyEventShiftKey = useRef(false);

  if (availableBookInfo.length !== Canon.allBookIds.length) {
    throw new Error('availableBookInfo length must match Canon.allBookIds length');
  }

  const availableBooksIds = useMemo(() => {
    return Canon.allBookIds.filter(
      (bookId, index) =>
        availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
  }, [availableBookInfo]);

  const filteredBooksBySection = useMemo(() => {
    if (!inputValue.trim()) {
      const allBooks: Record<Section, string[]> = {
        [Section.OT]: [],
        [Section.NT]: [],
        [Section.DC]: [],
        [Section.Extra]: [],
      };

      availableBooksIds.forEach((bookId) => {
        const section = getSectionForBook(bookId);
        allBooks[section].push(bookId);
      });

      return allBooks;
    }

    const filteredBooks = availableBooksIds.filter((bookId) =>
      doesBookMatchQuery(bookId, inputValue, localizedBookNames),
    );

    const matchingBooks: Record<Section, string[]> = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: [],
    };

    filteredBooks.forEach((bookId) => {
      const section = getSectionForBook(bookId);
      matchingBooks[section].push(bookId);
    });

    return matchingBooks;
  }, [availableBooksIds, inputValue, localizedBookNames]);

  const toggleBook = useCallback(
    (bookId: string, shiftKey = false) => {
      if (!shiftKey || !lastSelectedBookRef.current) {
        onChangeSelectedBookIds(
          selectedBookIds.includes(bookId)
            ? selectedBookIds.filter((id) => id !== bookId)
            : [...selectedBookIds, bookId],
        );
        lastSelectedBookRef.current = bookId;
        return;
      }

      const lastIndex = availableBooksIds.findIndex((id) => id === lastSelectedBookRef.current);
      const currentIndex = availableBooksIds.findIndex((id) => id === bookId);

      if (lastIndex === -1 || currentIndex === -1) return;

      const [startIndex, endIndex] = [
        Math.min(lastIndex, currentIndex),
        Math.max(lastIndex, currentIndex),
      ];
      const booksInRange = availableBooksIds.slice(startIndex, endIndex + 1).map((id) => id);

      onChangeSelectedBookIds(
        selectedBookIds.includes(bookId)
          ? selectedBookIds.filter((shortname) => !booksInRange.includes(shortname))
          : [...new Set([...selectedBookIds, ...booksInRange])],
      );
    },
    [selectedBookIds, onChangeSelectedBookIds, availableBooksIds],
  );

  const handleKeyboardSelect = (bookId: string) => {
    toggleBook(bookId, lastKeyEventShiftKey.current);
    lastKeyEventShiftKey.current = false;
  };

  const handleMouseDown = (event: MouseEvent, bookId: string) => {
    event.preventDefault();
    toggleBook(bookId, event.shiftKey);
  };

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

  const handleSelectAll = () => {
    onChangeSelectedBookIds(availableBooksIds.map((bookId) => bookId));
  };

  const handleClearAll = () => {
    onChangeSelectedBookIds([]);
  };

  return (
    <div className="tw-space-y-2">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
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

      <Popover
        open={isBooksSelectorOpen}
        onOpenChange={(open) => {
          setIsBooksSelectorOpen(open);
          if (!open) {
            setInputValue(''); // Reset search when closing
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isBooksSelectorOpen}
            className="tw-max-w-64 tw-justify-between"
          >
            {selectedBookIds.length > 0
              ? `${booksSelectedText}: ${selectedBookIds.length}`
              : selectBooksText}
            <ChevronsUpDown className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="tw-w-full tw-p-0" align="start">
          <Command
            shouldFilter={false}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Store shift state in a ref that will be used by onSelect
                lastKeyEventShiftKey.current = e.shiftKey;
              }
            }}
          >
            <CommandInput
              placeholder={searchBooksText}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <div className="tw-flex tw-justify-between tw-border-b tw-p-2">
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                {selectAllText}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClearAll}>
                {clearAllText}
              </Button>
            </div>
            <CommandList>
              <CommandEmpty>{noBookFoundText}</CommandEmpty>
              {Object.values(Section).map((section, index) => {
                const sectionBooks = filteredBooksBySection[section];

                if (sectionBooks.length === 0) return undefined;

                return (
                  <Fragment key={section}>
                    <CommandGroup
                      heading={getSectionLongName(section, otLong, ntLong, dcLong, extraLong)}
                    >
                      {sectionBooks.map((bookId) => (
                        <BookItem
                          key={bookId}
                          bookId={bookId}
                          isSelected={selectedBookIds.includes(bookId)}
                          onSelect={() => handleKeyboardSelect(bookId)}
                          onMouseDown={(event) => handleMouseDown(event, bookId)}
                          section={getSectionForBook(bookId)}
                          showCheck
                          localizedBookNames={localizedBookNames}
                          commandValue={generateCommandValue(bookId, localizedBookNames)}
                          className="tw-flex tw-items-center"
                        />
                      ))}
                    </CommandGroup>
                    {index < Object.values(Section).length - 1 && <CommandSeparator />}
                  </Fragment>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedBookIds.length > 0 && (
        <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-1">
          {selectedBookIds
            .slice(
              0,
              selectedBookIds.length === MAX_VISIBLE_BADGES
                ? MAX_VISIBLE_BADGES
                : VISIBLE_BADGES_COUNT,
            )
            .map((bookId) => (
              <Badge className="hover:tw-bg-secondary" key={bookId} variant="secondary">
                {getLocalizedBookName(bookId, localizedBookNames)}
              </Badge>
            ))}
          {selectedBookIds.length > MAX_VISIBLE_BADGES && (
            <Badge
              className="hover:tw-bg-secondary"
              variant="secondary"
            >{`+${selectedBookIds.length - VISIBLE_BADGES_COUNT} ${moreText}`}</Badge>
          )}
        </div>
      )}
    </div>
  );
}
