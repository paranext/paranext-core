import {
  ScopeSelector,
  Scope,
} from '@/components/advanced/scope-selector/scope-selector.component';
import { useState } from 'react';

export function ScopeSelectorExample() {
  const [searchScope1, setSearchScope1] = useState<Scope>('book');
  const [searchScope2, setSearchScope2] = useState<Scope>('selectedBooks');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([
    'GEN',
    'PSA',
    'MAT',
    'REV',
    'JHN',
    'ACT',
    'ROM',
    '1CO',
    '2CO',
    'GAL',
    'ODA',
    'PSS',
  ]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-8">
      <ScopeSelector
        availableBookInfo="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000"
        availableScopes={['selectedText', 'chapter', 'book', 'selectedBooks']}
        scope={searchScope1}
        onSearchScopeChange={setSearchScope1}
        selectedBookIds={selectedBooks}
        onSelectedBookIdsChange={setSelectedBooks}
      />

      <ScopeSelector
        availableBookInfo="100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"
        availableScopes={['selectedText', 'verse', 'book', 'selectedBooks']}
        scope={searchScope2}
        onSearchScopeChange={setSearchScope2}
        selectedBookIds={selectedBooks}
        onSelectedBookIdsChange={setSelectedBooks}
      />
    </div>
  );
}

export default ScopeSelectorExample;
