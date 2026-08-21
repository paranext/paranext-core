import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
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

export const ConstrainedHeightFlipsUpward: Story = {
  args: {
    selectedBookIds: [
      'GEN',
      'EXO',
      'LEV',
      'NUM',
      'DEU',
      'JOS',
      'JDG',
      'RUT',
      '1SA',
      '2SA',
      'MAT',
      'MRK',
      'LUK',
      'JHN',
      'ACT',
    ],
  },
  decorators: [
    (Story) => (
      // Deliberately short, bordered container with the trigger pushed to the bottom so Radix's
      // collision detection flips the popover upward. The border makes it obvious whether the
      // popover overruns the container. (PT-4092)
      <div className="tw:flex tw:h-[320px] tw:w-full tw:flex-col tw:justify-end tw:border">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Regression guard for PT-4092. The fix is CSS-only, so jsdom cannot verify it — check ' +
          'this story visually. The picker sits at the bottom of a short (320px) bordered ' +
          'container, so opening it should flip the popover *upward*. Verify that the search ' +
          'input stays visible and reachable at the top of the popover, and that the book list ' +
          'scrolls internally instead of the popover growing past the top of the bordered ' +
          'container. Before the fix, the full-height popover overran the container and clipped ' +
          'the search input off-screen inside a web view.',
      },
    },
  },
};
