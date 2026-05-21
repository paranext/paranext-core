import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { SelectBooksPicker } from './select-books-picker.component';

// Mock book information - represents which books are available (all books available in this case)
const allBooksAvailable = '1'.repeat(Canon.allBookIds.length);

const localizedStrings = {
  '%webView_book_selector_books_selected%': 'Books selected',
  '%webView_book_selector_select_books%': 'Select books...',
  '%webView_book_selector_search_books%': 'Search books...',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found.',
  '%scripture_section_ot_long%': 'Old Testament',
  '%scripture_section_nt_long%': 'New Testament',
  '%scripture_section_dc_long%': 'Deuterocanonical',
  '%scripture_section_extra_long%': 'Extra material',
};

// Wrapper component to manage the selected books state
function SelectBooksPickerWrapper({
  selectedBookIds: initialSelectedBookIds,
  onChangeSelectedBookIds,
  ...rest
}: ComponentProps<typeof SelectBooksPicker>) {
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(initialSelectedBookIds);

  return (
    <ThemeProvider>
      <div className="tw:max-w-md tw:p-4">
        <SelectBooksPicker
          {...rest}
          selectedBookIds={selectedBookIds}
          onChangeSelectedBookIds={(books) => {
            setSelectedBookIds(books);
            onChangeSelectedBookIds(books);
          }}
        />
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof SelectBooksPicker> = {
  title: 'Advanced/Select Books Picker',
  component: SelectBooksPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The standalone searchable dropdown (combobox) used by SelectBooks. It offers a trigger ' +
          'button summarizing the selection, a searchable list of available books grouped by ' +
          'section, "Select all" / "Clear all" shortcuts, and shift-click range selection.',
      },
    },
  },
  args: {
    availableBookInfo: allBooksAvailable,
    selectedBookIds: ['GEN', 'EXO', 'MAT'],
    localizedStrings,
    onChangeSelectedBookIds: (books) => console.log('Selected books changed:', books),
  },
  render: (args) => <SelectBooksPickerWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof SelectBooksPicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Open the dropdown to search, select all/clear all, or shift-click to select a range.',
      },
    },
  },
};
