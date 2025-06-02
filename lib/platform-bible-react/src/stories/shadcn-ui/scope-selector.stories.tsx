import type { Meta, StoryObj } from '@storybook/react';
import {
  ScopeSelector,
  Scope,
} from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';
import { useCallback, useState } from 'react';

// Wrapper component to handle state
const ScopeSelectorWrapper = (args: React.ComponentProps<typeof ScopeSelector>) => {
  const [scope, setScope] = useState<Scope>(args.scope);
  const [selectedBooks, setSelectedBooks] = useState<string[]>(args.selectedBookIds);

  const handleScopeChange = useCallback(
    (newScope: Scope) => {
      setScope(newScope);
      args.onSearchScopeChange?.(newScope);
    },
    [args],
  );

  const handleSelectedBooksChange = useCallback(
    (books: string[]) => {
      setSelectedBooks(books);
      args.onSelectedBookIdsChange?.(books);
    },
    [args],
  );

  return (
    <ThemeProvider>
      <ScopeSelector
        {...args}
        scope={scope}
        selectedBookIds={selectedBooks}
        onSearchScopeChange={handleScopeChange}
        onSelectedBookIdsChange={handleSelectedBooksChange}
      />
    </ThemeProvider>
  );
};

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
    onSearchScopeChange: (scope) => console.log('Search scope changed:', scope),
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
