import { Button, Checkbox, Label } from 'platform-bible-react';
import { useCallback } from 'react';
import { OT_BOOKS, NT_BOOKS, DC_BOOKS } from '../project-properties.utils';

export interface BookSelectorProps {
  selectedBooks: string[];
  onChange: (selectedBooks: string[]) => void;
  error?: string;
  selectAllLabel: string;
  deselectAllLabel: string;
  otSectionLabel: string;
  ntSectionLabel: string;
  dcSectionLabel: string;
}

function BookGroup({
  title,
  books,
  selectedBooks,
  onToggleBook,
}: {
  title: string;
  books: string[];
  selectedBooks: string[];
  onToggleBook: (bookId: string, checked: boolean) => void;
}) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      <Label className="tw-font-semibold tw-text-sm">{title}</Label>
      <div className="tw-grid tw-grid-cols-6 tw-gap-1">
        {books.map((bookId: string) => {
          const isSelected = selectedBooks.includes(bookId);
          return (
            <label
              key={bookId}
              className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-cursor-pointer"
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked: boolean) => onToggleBook(bookId, checked)}
                aria-label={bookId}
              />
              <span className="tw-select-none">{bookId}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function BookSelectorComponent({
  selectedBooks,
  onChange,
  error,
  selectAllLabel,
  deselectAllLabel,
  otSectionLabel,
  ntSectionLabel,
  dcSectionLabel,
}: BookSelectorProps) {
  const allBooks = [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS];

  const handleToggleBook = useCallback(
    (bookId: string, checked: boolean) => {
      if (checked) {
        onChange([...selectedBooks, bookId]);
      } else {
        onChange(selectedBooks.filter((b: string) => b !== bookId));
      }
    },
    [selectedBooks, onChange],
  );

  const handleSelectAll = useCallback(() => {
    onChange([...allBooks]);
  }, [allBooks, onChange]);

  const handleDeselectAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleSelectAll}>
          {selectAllLabel}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleDeselectAll}>
          {deselectAllLabel}
        </Button>
      </div>
      <div
        className="tw-flex tw-flex-col tw-gap-4 tw-overflow-y-auto tw-max-h-96 tw-p-2 tw-border tw-border-border tw-rounded"
        role="group"
        aria-label="Book selection"
      >
        <BookGroup
          title={otSectionLabel}
          books={OT_BOOKS}
          selectedBooks={selectedBooks}
          onToggleBook={handleToggleBook}
        />
        <BookGroup
          title={ntSectionLabel}
          books={NT_BOOKS}
          selectedBooks={selectedBooks}
          onToggleBook={handleToggleBook}
        />
        <BookGroup
          title={dcSectionLabel}
          books={DC_BOOKS}
          selectedBooks={selectedBooks}
          onToggleBook={handleToggleBook}
        />
      </div>
      {error ? (
        <Label className="tw-text-sm tw-text-destructive" role="alert">
          {error}
        </Label>
      ) : undefined}
    </div>
  );
}
