import { ThemeProvider } from '@/storybook/theme-provider.component';
import { Canon } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { BookSelector, BookSelectionMode } from './book-selector.component';

const meta: Meta<typeof BookSelector> = {
  title: 'Advanced/BookSelector',
  component: BookSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
> **Deprecated** (Jul 18 2025) — This component is no longer supported or tested and will be removed in a later version. To let users select books, use the \`SelectBooks\` component instead (or \`ScopeSelector\` to combine scope and book selection).

A UI for selecting books and chapter ranges. The user can either use the current book (with a start/end chapter range) or choose multiple books from a picker.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw:max-w-2xl tw:p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    currentBookName: 'Genesis',
    chapterCount: 50,
    startChapter: 1,
    endChapter: 50,
    selectedBookIds: ['GEN'],
    localizedStrings: {
      '%webView_bookSelector_currentBook%': 'Current Book',
      '%webView_bookSelector_choose%': 'Choose',
      '%webView_bookSelector_chooseBooks%': 'Choose Books',
    },
    handleBookSelectionModeChange: fn(),
    onSelectBooks: fn(),
    handleSelectStartChapter: fn(),
    handleSelectEndChapter: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default state with the current book selected and a full chapter range.',
      },
    },
  },
};

export const MultipleSelectedBooks: Story = {
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple books already selected in the "Choose Books" list.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [startChapter, setStartChapter] = useState(1);
    const [endChapter, setEndChapter] = useState(50);
    const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN']);
    const [mode, setMode] = useState<BookSelectionMode>(BookSelectionMode.CurrentBook);

    const handleOnSelectBooks = () => {
      // Simulate picking a couple of extra books
      const nextBooks = ['GEN', 'EXO', 'MAT'];
      setSelectedBookIds(nextBooks);
    };

    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        <BookSelector
          {...args}
          startChapter={startChapter}
          endChapter={endChapter}
          selectedBookIds={selectedBookIds}
          handleSelectStartChapter={setStartChapter}
          handleSelectEndChapter={setEndChapter}
          handleBookSelectionModeChange={setMode}
          onSelectBooks={handleOnSelectBooks}
        />
        <p className="tw:text-sm tw:text-muted-foreground">
          Mode: <strong>{mode}</strong> &nbsp;|&nbsp; Chapters: <strong>{startChapter}</strong>–
          <strong>{endChapter}</strong> &nbsp;|&nbsp; Books:{' '}
          <strong>{selectedBookIds.map((id) => Canon.bookIdToEnglishName(id)).join(', ')}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive story. Toggle between modes, adjust chapter range, or simulate book selection.',
      },
    },
  },
};

export const MissingLocalizedStrings: Story = {
  args: {
    localizedStrings: {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'When no localized strings are provided the component falls back to displaying the raw localization keys.',
      },
    },
  },
};
