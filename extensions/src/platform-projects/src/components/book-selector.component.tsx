import { Canon } from '@sillsdev/scripture';
import { Button, Checklist, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useMemo, useCallback } from 'react';

/** Canonical book IDs for the OT, NT, and Deuterocanon sections */
const OT_BOOKS = Canon.allBookIds.filter((bookId) => {
  const bookNum = Canon.bookIdToNumber(bookId);
  return bookNum >= 1 && bookNum <= 39;
});

const NT_BOOKS = Canon.allBookIds.filter((bookId) => {
  const bookNum = Canon.bookIdToNumber(bookId);
  return bookNum >= 40 && bookNum <= 66;
});

const DC_BOOKS = Canon.allBookIds.filter((bookId) => {
  const bookNum = Canon.bookIdToNumber(bookId);
  return bookNum > 66;
});

export interface BookSelectorGridProps {
  selectedBooks: string[];
  onSelectedBooksChange: (books: string[]) => void;
  localizedStrings: LanguageStrings;
  disabled?: boolean;
}

export default function BookSelectorGrid({
  selectedBooks,
  onSelectedBooksChange,
  localizedStrings,
  disabled = false,
}: BookSelectorGridProps) {
  const allBooks = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);

  const handleSelectAll = useCallback(() => {
    onSelectedBooksChange(allBooks);
  }, [allBooks, onSelectedBooksChange]);

  const handleDeselectAll = useCallback(() => {
    onSelectedBooksChange([]);
  }, [onSelectedBooksChange]);

  const handleSelectListItem = useCallback(
    (item: string, selected: boolean) => {
      if (disabled) return;
      if (selected) {
        onSelectedBooksChange([...selectedBooks, item]);
      } else {
        onSelectedBooksChange(selectedBooks.filter((b) => b !== item));
      }
    },
    [disabled, selectedBooks, onSelectedBooksChange],
  );

  const createBookLabel = useCallback((bookId: string) => {
    return Canon.bookIdToEnglishName(bookId);
  }, []);

  const getStr = (key: LocalizeKey, fallback: string): string => {
    const val = localizedStrings[key];
    return typeof val === 'string' ? val : fallback;
  };

  const otLabel = getStr('%platformProjects_books_oldTestament%', 'Old Testament');
  const ntLabel = getStr('%platformProjects_books_newTestament%', 'New Testament');
  const dcLabel = getStr('%platformProjects_books_deuterocanon%', 'Deuterocanon');
  const selectAllLabel = getStr('%platformProjects_books_selectAll%', 'Select All');
  const deselectAllLabel = getStr('%platformProjects_books_deselectAll%', 'Deselect All');

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-gap-2">
        <Button type="button" variant="outline" onClick={handleSelectAll} disabled={disabled}>
          {selectAllLabel}
        </Button>
        <Button type="button" variant="outline" onClick={handleDeselectAll} disabled={disabled}>
          {deselectAllLabel}
        </Button>
      </div>

      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-max-h-96 tw-overflow-y-auto">
        <div>
          <Label className="tw-font-semibold tw-text-sm tw-mb-2">{otLabel}</Label>
          <Checklist
            className="tw-flex tw-flex-col"
            listItems={OT_BOOKS}
            selectedListItems={selectedBooks}
            handleSelectListItem={handleSelectListItem}
            createLabel={createBookLabel}
          />
        </div>

        <div>
          <Label className="tw-font-semibold tw-text-sm tw-mb-2">{ntLabel}</Label>
          <Checklist
            className="tw-flex tw-flex-col"
            listItems={NT_BOOKS}
            selectedListItems={selectedBooks}
            handleSelectListItem={handleSelectListItem}
            createLabel={createBookLabel}
          />
        </div>

        <div>
          <Label className="tw-font-semibold tw-text-sm tw-mb-2">{dcLabel}</Label>
          <Checklist
            className="tw-flex tw-flex-col"
            listItems={DC_BOOKS}
            selectedListItems={selectedBooks}
            handleSelectListItem={handleSelectListItem}
            createLabel={createBookLabel}
          />
        </div>
      </div>
    </div>
  );
}
