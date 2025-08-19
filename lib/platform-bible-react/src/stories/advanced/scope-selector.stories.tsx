import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { Scope } from '@/components/utils/scripture.util';

// Mock book information - represents which books are available (all books available in this case)
const mockAvailableBookInfo = '1'.repeat(123);

const mockLocalizedBookNames = new Map([
  ['GEN', { localizedId: 'Gen', localizedName: 'Genesis' }],
  ['EXO', { localizedId: 'Exo', localizedName: 'Exodus' }],
  ['LEV', { localizedId: 'Lev', localizedName: 'Leviticus' }],
  ['NUM', { localizedId: 'Num', localizedName: 'Numbers' }],
  ['DEU', { localizedId: 'Deu', localizedName: 'Deuteronomy' }],
  ['MAT', { localizedId: 'Mat', localizedName: 'Matthew' }],
  ['MRK', { localizedId: 'Mrk', localizedName: 'Mark' }],
  ['LUK', { localizedId: 'Luk', localizedName: 'Luke' }],
  ['JHN', { localizedId: 'Jhn', localizedName: 'John' }],
  ['ROM', { localizedId: 'Rom', localizedName: 'Romans' }],
]);

const meta: Meta<typeof ScopeSelector> = {
  title: 'Advanced/Scope Selector',
  component: ScopeSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-md tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ScopeSelector>;

export const BookScope: Story = {
  render: () => {
    const [scope, setScope] = useState<Scope>('book');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to book scope with book selection capabilities.',
      },
    },
  },
};

export const ChapterScope: Story = {
  render: () => {
    const [scope, setScope] = useState<Scope>('chapter');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to chapter scope.',
      },
    },
  },
};

export const VerseScope: Story = {
  render: () => {
    const [scope, setScope] = useState<Scope>('verse');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector set to verse scope.',
      },
    },
  },
};

export const SelectedBooksScope: Story = {
  render: () => {
    const [scope, setScope] = useState<Scope>('selectedBooks');
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'EXO', 'MAT', 'JHN']);

    return (
      <ScopeSelector
        scope={scope}
        availableBookInfo={mockAvailableBookInfo}
        selectedBookIds={selectedBookIds}
        onScopeChange={(newScope: Scope) => {
          console.log('Scope changed to:', newScope);
          setScope(newScope);
        }}
        onSelectedBookIdsChange={(bookIds: string[]) => {
          console.log('Selected books:', bookIds);
          setSelectedBookIds(bookIds);
        }}
        localizedStrings={{
          '%webView_scope_selector_current_book%': 'Current book',
          '%webView_scope_selector_current_chapter%': 'Current chapter',
          '%webView_scope_selector_current_verse%': 'Current verse',
          '%webView_scope_selector_scope%': 'Scope',
          '%webView_scope_selector_choose_books%': 'Choose specific books',
          '%webView_book_selector_books_selected%': 'books selected',
          '%webView_book_selector_select_books%': 'Select books',
          '%webView_book_selector_search_books%': 'Search books',
          '%webView_book_selector_select_all%': 'Select all',
          '%webView_book_selector_clear_all%': 'Clear all',
        }}
        localizedBookNames={mockLocalizedBookNames}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scope selector with selected books scope showing book selection interface.',
      },
    },
  },
};
