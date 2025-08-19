import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { ComponentProps, useCallback, useState } from 'react';
import { Scope } from '@/components/utils/scripture.util';

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
  '%scripture_section_ot_long%': 'Old Testament',
  '%scripture_section_ot_short%': 'OT',
  '%scripture_section_nt_long%': 'New Testament',
  '%scripture_section_nt_short%': 'NT',
  '%scripture_section_dc_long%': 'Deuterocanonical',
  '%scripture_section_dc_short%': 'DC',
  '%scripture_section_extra_long%': 'Extra material',
  '%scripture_section_extra_short%': 'Extra',
};

type ScopeSelectorWrapperProps = Omit<
  ComponentProps<typeof ScopeSelector>,
  'scope' | 'selectedBookIds' | 'onScopeChange' | 'onSelectedBookIdsChange'
> & {
  scope: Scope;
  selectedBookIds: string[];
  onScopeChange: (scope: Scope) => void;
  onSelectedBookIdsChange: (books: string[]) => void;
};

// Wrapper component to handle state
function ScopeSelectorWrapper({
  scope: initialScope,
  selectedBookIds: initialSelectedBooks,
  onScopeChange,
  onSelectedBookIdsChange,
  ...rest
}: ScopeSelectorWrapperProps) {
  const [scope, setScope] = useState<Scope>(initialScope);
  const [selectedBooks, setSelectedBooks] = useState<string[]>(initialSelectedBooks);

  const handleScopeChange = useCallback(
    (newScope: Scope) => {
      setScope(newScope);
      onScopeChange(newScope);
    },
    [onScopeChange],
  );

  const handleSelectedBooksChange = useCallback(
    (books: string[]) => {
      setSelectedBooks(books);
      onSelectedBookIdsChange(books);
    },
    [onSelectedBookIdsChange],
  );

  return (
    <ThemeProvider>
      <ScopeSelector
        {...rest}
        scope={scope}
        selectedBookIds={selectedBooks}
        onScopeChange={handleScopeChange}
        onSelectedBookIdsChange={handleSelectedBooksChange}
      />
    </ThemeProvider>
  );
}

const meta: Meta<typeof ScopeSelector> = {
  title: 'Advanced/ScopeSelector',
  component: ScopeSelector,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  args: {
    scope: 'chapter',
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    selectedBookIds: [],
    localizedStrings,
    onScopeChange: (scope) => console.log('Search scope changed:', scope),
    onSelectedBookIdsChange: (books) => console.log('Selected books changed:', books),
  },
  // Use the wrapper component to render stories
  render: (args) => <ScopeSelectorWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof ScopeSelector>;

export const Default: Story = {};

export const Chapter: Story = {
  args: {
    scope: 'chapter',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in chapter scope. You can change the scope and select books - the state will be managed automatically.',
      },
    },
  },
};

export const Book: Story = {
  args: {
    scope: 'book',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in book scope. You can change the scope and select books - the state will be managed automatically.',
      },
    },
  },
};

export const Verse: Story = {
  args: {
    scope: 'verse',
    selectedBookIds: [],
    availableScopes: ['selectedText', 'verse', 'book', 'selectedBooks'],
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000111000000000000000000000000000000000000',
  },
};

export const SelectedBooks: Story = {
  args: {
    scope: 'selectedBooks',
    selectedBookIds: ['GEN', 'EXO', 'LEV'],
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'ScopeSelector in selectedBooks mode with some initial book selections. The selected books state will be preserved as you interact with the component.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    scope: 'selectedBooks',
    availableBookInfo:
      '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000',
    availableScopes: ['selectedText', 'chapter', 'book', 'selectedBooks'],
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'REV', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive ScopeSelector component with state management. The component maintains its own state for selected scope and books, while still calling the provided callbacks. You can:\n' +
          ' - Switch between different scopes (selectedText, chapter, book, selectedBooks)\n' +
          ' - Select and deselect books when in selectedBooks mode\n' +
          ' - See the state changes logged to the console\n' +
          'The availableBookInfo string represents which books are available in the current project.',
      },
    },
  },
};
