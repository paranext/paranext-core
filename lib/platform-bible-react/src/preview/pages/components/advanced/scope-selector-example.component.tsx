import {
  ScopeSelector,
  SearchScope,
} from '@/components/advanced/scope-selector/scope-selector.component';
import { useState } from 'react';

export function ScopeSelectorExample() {
  const [searchScope, setSearchScope] = useState<SearchScope>('currentChapter');
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
  ]);

  return (
    <ScopeSelector
      availableBookInfo="100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000"
      searchScope={searchScope}
      onSearchScopeChange={setSearchScope}
      selectedBooks={selectedBooks}
      onSelectedBooksChange={setSelectedBooks}
    />
  );
}

export default ScopeSelectorExample;
