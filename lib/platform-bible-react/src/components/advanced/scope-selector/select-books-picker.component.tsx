import { BookItem } from '@/components/shared/book-item.component';
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
import { ChevronsUpDown } from 'lucide-react';
import { getSectionForBook, Section } from 'platform-bible-utils';
import { getSectionLongName, doesBookMatchQuery } from '@/components/shared/book.utils';
import { Fragment, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { generateCommandValue } from '@/components/shared/book-item.utils';
import { getAvailableBookIds } from './scope-selector.utils';
import { SelectBooksLocalizedStrings } from './select-books.types';

type SelectBooksPickerProps = {
  /**
   * Information about available books, formatted as a 123 character long string as defined in a
   * projects BooksPresent setting
   */
  availableBookInfo: string;
  /** Array of currently selected book IDs */
  selectedBookIds: string[];
  /** Callback function that is executed when the book selection changes */
  onChangeSelectedBookIds: (books: string[]) => void;
  /**
   * Object containing the localized strings for the component. The picker uses a subset of
   * {@link SelectBooksLocalizedStrings} (the badge and section-button keys are not used here)
   */
  localizedStrings: SelectBooksLocalizedStrings;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
};

/**
 * A searchable dropdown (combobox) for picking multiple books from the Bible canon. It provides:
 *
 * - A trigger button summarizing how many books are selected
 * - A searchable list of all available books, grouped by section
 * - "Select all" / "Clear all" shortcuts
 * - Support for shift-click and shift-Enter range selection
 *
 * This is the standalone picker used by {@link SelectBooks}, which additionally renders section
 * quick-select buttons and badges for the current selection.
 */
export function SelectBooksPicker({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
}: SelectBooksPickerProps) {
  const booksSelectedText = localizedStrings['%webView_book_selector_books_selected%'];
  const selectBooksText = localizedStrings['%webView_book_selector_select_books%'];
  const searchBooksText = localizedStrings['%webView_book_selector_search_books%'];
  const selectAllText = localizedStrings['%webView_book_selector_select_all%'];
  const clearAllText = localizedStrings['%webView_book_selector_clear_all%'];
  const noBookFoundText = localizedStrings['%webView_book_selector_no_book_found%'];

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

  const availableBookIds = useMemo(
    () => getAvailableBookIds(availableBookInfo),
    [availableBookInfo],
  );

  const filteredBooksBySection = useMemo(() => {
    if (!inputValue.trim()) {
      const allBooks: Record<Section, string[]> = {
        [Section.OT]: [],
        [Section.NT]: [],
        [Section.DC]: [],
        [Section.Extra]: [],
      };

      availableBookIds.forEach((bookId) => {
        const section = getSectionForBook(bookId);
        allBooks[section].push(bookId);
      });

      return allBooks;
    }

    const filteredBooks = availableBookIds.filter((bookId) =>
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
  }, [availableBookIds, inputValue, localizedBookNames]);

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

      const lastIndex = availableBookIds.findIndex((id) => id === lastSelectedBookRef.current);
      const currentIndex = availableBookIds.findIndex((id) => id === bookId);

      if (lastIndex === -1 || currentIndex === -1) return;

      const [startIndex, endIndex] = [
        Math.min(lastIndex, currentIndex),
        Math.max(lastIndex, currentIndex),
      ];
      const booksInRange = availableBookIds.slice(startIndex, endIndex + 1).map((id) => id);

      onChangeSelectedBookIds(
        selectedBookIds.includes(bookId)
          ? selectedBookIds.filter((shortname) => !booksInRange.includes(shortname))
          : [...new Set([...selectedBookIds, ...booksInRange])],
      );
    },
    [selectedBookIds, onChangeSelectedBookIds, availableBookIds],
  );

  const handleKeyboardSelect = (bookId: string) => {
    toggleBook(bookId, lastKeyEventShiftKey.current);
    lastKeyEventShiftKey.current = false;
  };

  const handleMouseDown = (event: MouseEvent, bookId: string) => {
    event.preventDefault();
    toggleBook(bookId, event.shiftKey);
  };

  const handleSelectAll = () => {
    onChangeSelectedBookIds(availableBookIds.map((bookId) => bookId));
  };

  const handleClearAll = () => {
    onChangeSelectedBookIds([]);
  };

  return (
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
          className="tw:max-w-64 tw:justify-between"
        >
          {selectedBookIds.length > 0
            ? `${booksSelectedText}: ${selectedBookIds.length}`
            : selectBooksText}
          <ChevronsUpDown className="tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw:w-full tw:p-0" align="start">
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
          <div className="tw:flex tw:justify-between tw:border-b tw:p-2">
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
                        className="tw:flex tw:items-center"
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
  );
}
