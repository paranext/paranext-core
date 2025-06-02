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
import { LanguageStrings } from 'platform-bible-utils';
import { useCallback, useMemo, useRef, useState } from 'react';
import BookItem from './book-item.component';
import {
  getBooksForSection,
  getSectionForBook,
  getSectionLongName,
  isSectionFullySelected,
  Section,
} from './scope-selector-utils';
import SectionButton from './section-button.component';

const VISIBLE_BADGES_COUNT = 5;
const MAX_VISIBLE_BADGES = 6;

type BookSelectorProps = {
  availableBookInfo: string;
  selectedBookIds: string[];
  onChangeSelectedBookIds: (books: string[]) => void;
  localizedStrings: LanguageStrings;
};

export function BookSelector({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
}: BookSelectorProps) {
  const booksSelectedText = localizedStrings['%webView_book_selector_books_selected%'];
  const selectBooksText = localizedStrings['%webView_book_selector_select_books%'];
  const searchBooksText = localizedStrings['%webView_book_selector_search_books%'];
  const selectAllText = localizedStrings['%webView_book_selector_select_all%'];
  const clearAllText = localizedStrings['%webView_book_selector_clear_all%'];
  const noBookFoundText = localizedStrings['%webView_book_selector_no_book_found%'];
  const moreText = localizedStrings['%webView_book_selector_more%'];

  const [isBooksSelectorOpen, setIsBooksSelectorOpen] = useState(false);
  const lastSelectedBookRef = useRef<string | undefined>(undefined);
  const lastKeyEventShiftKey = useRef(false);
  const isMouseClick = useRef(false);
  const mouseClickTimer = useRef<ReturnType<typeof setTimeout>>();

  if (availableBookInfo.length !== Canon.allBookIds.length) {
    throw new Error('availableBookInfo length must match Canon.allBookIds length');
  }

  const availableBooksIds = useMemo(() => {
    return Canon.allBookIds.filter(
      (bookId, index) =>
        availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
  }, [availableBookInfo]);

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
              section={section}
              availableBookIds={availableBooksIds}
              selectedBookIds={selectedBookIds}
              onToggle={toggleSection}
            />
          );
        })}
      </div>

      <Popover open={isBooksSelectorOpen} onOpenChange={setIsBooksSelectorOpen}>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Store shift state in a ref that will be used by onSelect
                lastKeyEventShiftKey.current = e.shiftKey;
              }
            }}
          >
            <CommandInput placeholder={searchBooksText} />
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
                const sectionBooks = availableBooksIds.filter(
                  (bookId) => getSectionForBook(bookId) === section,
                );

                if (sectionBooks.length === 0) return undefined;

                return (
                  <>
                    <CommandGroup key={section} heading={getSectionLongName(section)}>
                      {sectionBooks.map((bookId) => (
                        <BookItem
                          key={bookId}
                          bookId={bookId}
                          selectedBookIds={selectedBookIds}
                          toggleBook={toggleBook}
                          lastKeyEventShiftKey={lastKeyEventShiftKey}
                          isMouseClick={isMouseClick}
                          mouseClickTimer={mouseClickTimer}
                        />
                      ))}
                    </CommandGroup>
                    {index < Object.values(Section).length - 1 && <CommandSeparator />}
                  </>
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
              <Badge key={bookId} variant="secondary">
                {Canon.bookIdToEnglishName(bookId) || bookId}
              </Badge>
            ))}
          {selectedBookIds.length > MAX_VISIBLE_BADGES && (
            <Badge variant="secondary">{`+${selectedBookIds.length - VISIBLE_BADGES_COUNT} ${moreText}`}</Badge>
          )}
        </div>
      )}
    </div>
  );
}
