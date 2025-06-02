import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';

export type Scope = 'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks';

const SCOPE_OPTIONS: Array<{ value: Scope; label: string; id: string }> = [
  { value: 'selectedText', label: 'Selected text', id: 'scope-selected-text' },
  { value: 'verse', label: 'Current verse', id: 'scope-verse' },
  { value: 'chapter', label: 'Current chapter', id: 'scope-chapter' },
  { value: 'book', label: 'Current book', id: 'scope-book' },
  { value: 'selectedBooks', label: 'Choose books', id: 'scope-selected' },
];

interface ScopeSelectorProps {
  scope: Scope;
  availableScopes?: Scope[];
  onSearchScopeChange: (scope: Scope) => void;
  availableBookInfo: string;
  selectedBookIds: string[];
  onSelectedBookIdsChange: (books: string[]) => void;
}

export function ScopeSelector({
  scope: searchScope,
  availableScopes,
  onSearchScopeChange,
  availableBookInfo,
  selectedBookIds,
  onSelectedBookIdsChange,
}: ScopeSelectorProps) {
  const displayedScopes = availableScopes
    ? SCOPE_OPTIONS.filter((option) => availableScopes.includes(option.value))
    : SCOPE_OPTIONS;

  return (
    <div className="tw-grid tw-gap-4">
      <div className="tw-grid tw-gap-2">
        <Label>Scope</Label>
        <RadioGroup
          value={searchScope}
          onValueChange={onSearchScopeChange}
          className="tw-flex tw-flex-col tw-space-y-1"
        >
          {displayedScopes.map(({ value, label, id }) => (
            <div key={id} className="tw-flex tw-items-center tw-space-x-2">
              <RadioGroupItem value={value} id={id} />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {searchScope === 'selectedBooks' && (
        <div className="tw-grid tw-gap-2">
          <Label>Select books</Label>
          <BookSelector
            availableBookInfo={availableBookInfo}
            selectedBookIds={selectedBookIds}
            onChangeSelectedBookIds={onSelectedBookIdsChange}
          />
        </div>
      )}
    </div>
  );
}
