import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';

export type SearchScope = 'currentChapter' | 'currentBook' | 'selectedBooks';

interface ScopeSelectorProps {
  searchScope: SearchScope;
  onSearchScopeChange: (scope: SearchScope) => void;
  availableBookInfo: string;
  selectedBooks: string[];
  onSelectedBooksChange: (books: string[]) => void;
}

export function ScopeSelector({
  searchScope,
  onSearchScopeChange,
  availableBookInfo,
  selectedBooks,
  onSelectedBooksChange,
}: ScopeSelectorProps) {
  return (
    <div className="tw-grid tw-gap-2">
      <Label>Scope:</Label>
      <RadioGroup
        value={searchScope}
        onValueChange={(value: SearchScope) => onSearchScopeChange(value)}
        className="tw-flex tw-flex-col tw-space-y-1"
      >
        <div className="tw-flex tw-items-center tw-space-x-2">
          <RadioGroupItem value="currentChapter" id="scope-chapter" />
          <Label htmlFor="scope-chapter">Current Chapter</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <RadioGroupItem value="currentBook" id="scope-book" />
          <Label htmlFor="scope-book">Current Book</Label>
        </div>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <RadioGroupItem value="selectedBooks" id="scope-selected" />
          <Label htmlFor="scope-selected">Choose Books</Label>
        </div>
      </RadioGroup>

      {searchScope === 'selectedBooks' && (
        <>
          <Label>Select Books:</Label>
          <BookSelector
            availableBookInfo={availableBookInfo}
            selectedBooks={selectedBooks}
            onChangeSelectedBooks={onSelectedBooksChange}
          />
        </>
      )}
    </div>
  );
}
