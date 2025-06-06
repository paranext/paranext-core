import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { Scope } from '@/components/utils/scripture.util';
import { useState } from 'react';

const localizedStrings = {
  '%webView_scope_selector_selected_text%': 'Selected text',
  '%webView_scope_selector_current_verse%': 'Current verse',
  '%webView_scope_selector_current_chapter%': 'Current chapter',
  '%webView_scope_selector_current_book%': 'Current book',
  '%webView_scope_selector_choose_books%': 'Choose books',
  '%webView_scope_selector_scope%': 'Scope',
  '%webView_scope_selector_select_books%': 'Select books',
  '%webView_book_selector_books_selected%': 'Books selected',
  '%webView_book_selector_select_books%': 'Select books...',
  '%webView_book_selector_search_books%': 'Search books...',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found.',
  '%webView_book_selector_more%': 'more',
};

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
        onScopeChange={setSearchScope1}
        selectedBookIds={selectedBooks}
        onSelectedBookIdsChange={setSelectedBooks}
        localizedStrings={localizedStrings}
      />

      <ScopeSelector
        availableBookInfo="100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000"
        availableScopes={['selectedText', 'verse', 'book', 'selectedBooks']}
        scope={searchScope2}
        onScopeChange={setSearchScope2}
        selectedBookIds={selectedBooks}
        onSelectedBookIdsChange={setSelectedBooks}
        localizedStrings={localizedStrings}
      />
    </div>
  );
}

export default ScopeSelectorExample;
