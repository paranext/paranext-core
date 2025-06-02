import type { Meta, StoryObj } from '@storybook/react';
import { ScopeSelector } from '@/components/advanced/scope-selector/scope-selector.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

const meta: Meta<typeof ScopeSelector> = {
  title: 'Advanced/ScopeSelector',
  component: ScopeSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    searchScope: 'currentChapter',
    selectedBooks: [],
    onSearchScopeChange: (scope) => console.log('Search scope changed:', scope),
    onSelectedBooksChange: (books) => console.log('Selected books changed:', books),
  },
};

export default meta;

type Story = StoryObj<typeof ScopeSelector>;

export const Default: Story = {};

export const CurrentChapter: Story = {
  args: {
    searchScope: 'currentChapter',
    selectedBooks: [],
  },
};

export const CurrentBook: Story = {
  args: {
    searchScope: 'currentBook',
    selectedBooks: [],
  },
};

export const SelectedBooks: Story = {
  args: {
    searchScope: 'selectedBooks',
    selectedBooks: ['GEN', 'EXO', 'LEV'],
  },
};

export const Playground: Story = {
  args: {
    searchScope: 'selectedBooks',
    selectedBooks: ['GEN', 'PSA', 'MAT', 'REV', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive ScopeSelector component for selecting search scope.',
      },
    },
  },
};
