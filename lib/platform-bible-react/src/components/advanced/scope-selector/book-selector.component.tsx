import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { Check, ChevronsUpDown } from 'lucide-react';
import { BookInfo, scrBookInfo, Section } from 'platform-bible-utils';
import { useCallback, useMemo, useRef, useState } from 'react';

const getBooksForSection = (books: BookInfo[], section: Section) =>
  books.filter((book) => book.section === section);

const isSectionFullySelected = (books: BookInfo[], section: Section, selectedBooks: string[]) =>
  getBooksForSection(books, section).every((book) => selectedBooks.includes(book.shortName));

function SectionButton({
  section,
  availableBooks: books,
  selectedBooks,
  onToggle,
}: {
  section: Section;
  availableBooks: BookInfo[];
  selectedBooks: string[];
  onToggle: (section: Section) => void;
}) {
  const sectionBooks = getBooksForSection(books, section);
  if (sectionBooks.length === 0) return undefined;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(section)}
      className={cn(
        isSectionFullySelected(books, section, selectedBooks) &&
          'tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90',
      )}
    >
      {section}
    </Button>
  );
}

type BookSelectorProps = {
  availableBookInfo: string;
  selectedBooks: string[];
  onChangeSelectedBooks: (books: string[]) => void;
};

export function BookSelector({
  availableBookInfo,
  selectedBooks,
  onChangeSelectedBooks,
}: BookSelectorProps) {
  const [isBookSelectOpen, setIsBookSelectOpen] = useState(false);
  const lastSelectedBookRef = useRef<string | null>(undefined);

  const availableBooks = useMemo(() => {
    const books = scrBookInfo.slice(1);
    if (books.length !== availableBookInfo.length) {
      console.warn('Length mismatch between scrBookInfo and availableBookInfo');
      return books;
    }
    return books.filter((_, index) => availableBookInfo[index] === '1');
  }, [availableBookInfo]);

  const toggleBook = useCallback(
    (bookShortname: string, shiftKey = false) => {
      if (!shiftKey || !lastSelectedBookRef.current) {
        onChangeSelectedBooks(
          selectedBooks.includes(bookShortname)
            ? selectedBooks.filter((shortname) => shortname !== bookShortname)
            : [...selectedBooks, bookShortname],
        );
        lastSelectedBookRef.current = bookShortname;
        return;
      }

      const lastIndex = availableBooks.findIndex(
        (book) => book.shortName === lastSelectedBookRef.current,
      );
      const currentIndex = availableBooks.findIndex((book) => book.shortName === bookShortname);

      if (lastIndex === -1 || currentIndex === -1) return;

      const [startIndex, endIndex] = [
        Math.min(lastIndex, currentIndex),
        Math.max(lastIndex, currentIndex),
      ];
      const booksInRange = availableBooks
        .slice(startIndex, endIndex + 1)
        .map((book) => book.shortName);

      onChangeSelectedBooks(
        selectedBooks.includes(bookShortname)
          ? selectedBooks.filter((shortname) => !booksInRange.includes(shortname))
          : [...new Set([...selectedBooks, ...booksInRange])],
      );
    },
    [selectedBooks, onChangeSelectedBooks, availableBooks],
  );

  const toggleSection = useCallback(
    (section: Section) => {
      const sectionBooks = getBooksForSection(availableBooks, section).map(
        (book) => book.shortName,
      );
      onChangeSelectedBooks(
        isSectionFullySelected(availableBooks, section, selectedBooks)
          ? selectedBooks.filter((shortname) => !sectionBooks.includes(shortname))
          : [...new Set([...selectedBooks, ...sectionBooks])],
      );
    },
    [selectedBooks, onChangeSelectedBooks, availableBooks],
  );

  const handleSelectAll = () => {
    onChangeSelectedBooks(availableBooks.map((book) => book.shortName));
  };

  const handleClearAll = () => {
    onChangeSelectedBooks([]);
  };

  return (
    <div className="tw-space-y-2">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <SectionButton
          section={Section.OT}
          availableBooks={availableBooks}
          selectedBooks={selectedBooks}
          onToggle={toggleSection}
        />
        <SectionButton
          section={Section.NT}
          availableBooks={availableBooks}
          selectedBooks={selectedBooks}
          onToggle={toggleSection}
        />
        <SectionButton
          section={Section.DC}
          availableBooks={availableBooks}
          selectedBooks={selectedBooks}
          onToggle={toggleSection}
        />
        <SectionButton
          section={Section.Extra}
          availableBooks={availableBooks}
          selectedBooks={selectedBooks}
          onToggle={toggleSection}
        />
      </div>

      <Popover open={isBookSelectOpen} onOpenChange={setIsBookSelectOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isBookSelectOpen}
            className="tw-w-full tw-justify-between"
          >
            {selectedBooks.length > 0
              ? `${selectedBooks.length} book${selectedBooks.length > 1 ? 's' : ''} selected`
              : 'Select books...'}
            <ChevronsUpDown className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="tw-w-full tw-p-0" align="start">
          <Command>
            <CommandInput placeholder="Search books..." />
            <div className="tw-flex tw-justify-between tw-border-b tw-p-2">
              <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClearAll}>
                Clear All
              </Button>
            </div>
            <CommandList>
              <CommandEmpty>No book found.</CommandEmpty>
              <CommandGroup className="tw-max-h-64 tw-overflow-auto">
                {availableBooks.map((book) => (
                  <CommandItem
                    key={book.shortName}
                    value={book.shortName}
                    className="tw-flex tw-items-center"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toggleBook(book.shortName, e.shiftKey);
                    }}
                  >
                    <Check
                      className={cn(
                        'tw-mr-2 tw-h-4 tw-w-4',
                        selectedBooks.includes(book.shortName) ? 'tw-opacity-100' : 'tw-opacity-0',
                      )}
                    />
                    <span className="tw-flex-1">{book.fullNames[0]}</span>
                    <span className="tw-ml-2 tw-text-xs tw-text-muted-foreground">
                      {book.section}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedBooks.length > 0 && (
        <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-1">
          {selectedBooks.slice(0, selectedBooks.length === 6 ? 6 : 5).map((bookShortname) => {
            const book = availableBooks.find(
              (availableBook) => availableBook.shortName === bookShortname,
            );
            return (
              <Badge key={bookShortname} variant="secondary">
                {book?.fullNames[0] || bookShortname}
              </Badge>
            );
          })}
          {selectedBooks.length > 6 && (
            <Badge variant="secondary">+{selectedBooks.length - 5} more</Badge>
          )}
        </div>
      )}
    </div>
  );
}
