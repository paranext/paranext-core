import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { SelectBooks } from './select-books.component';

// Mock book information - represents which books are available (all books available in this case)
const allBooksAvailable = '1'.repeat(Canon.allBookIds.length);

// Mock book information with only a subset of books available
const someBooksAvailable =
  '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000';

const localizedStrings = {
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

const spanishBookNames = new Map([
  ['GEN', { localizedId: 'GÉN', localizedName: 'Génesis' }],
  ['EXO', { localizedId: 'ÉXO', localizedName: 'Éxodo' }],
  ['LEV', { localizedId: 'LEV', localizedName: 'Levítico' }],
  ['PSA', { localizedId: 'SAL', localizedName: 'Salmos' }],
  ['MAT', { localizedId: 'MAT', localizedName: 'Mateo' }],
  ['MRK', { localizedId: 'MAR', localizedName: 'Marcos' }],
  ['LUK', { localizedId: 'LUC', localizedName: 'Lucas' }],
  ['JHN', { localizedId: 'JUA', localizedName: 'Juan' }],
  ['ROM', { localizedId: 'ROM', localizedName: 'Romanos' }],
  ['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }],
]);

// Wrapper component to manage the selected books state
function SelectBooksWrapper({
  selectedBookIds: initialSelectedBookIds,
  onChangeSelectedBookIds,
  ...rest
}: ComponentProps<typeof SelectBooks>) {
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(initialSelectedBookIds);

  return (
    <div className="tw:max-w-md tw:p-4">
      <SelectBooks
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

const meta: Meta<typeof SelectBooks> = {
  title: 'Advanced/Select Books',
  component: SelectBooks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A component for selecting multiple books from the Bible canon. It offers quick section ' +
          'buttons (OT, NT, DC, Extra), a searchable dropdown of the available books, shift-click ' +
          'range selection, and badges summarizing the current selection.',
      },
    },
  },
  args: {
    availableBookInfo: allBooksAvailable,
    selectedBookIds: [],
    localizedStrings,
    onChangeSelectedBookIds: (books) => console.log('Selected books changed:', books),
  },
  render: (args) => <SelectBooksWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof SelectBooks>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All books available with no initial selection.',
      },
    },
  },
};

export const WithSelectedBooks: Story = {
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'MAT', 'JHN'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Some books pre-selected, showing the summary badges.',
      },
    },
  },
};

export const ManySelectedBooks: Story = {
  args: {
    selectedBookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK'],
  },
  parameters: {
    docs: {
      description: {
        story: 'When more than the visible limit of books is selected, a "+X more" badge appears.',
      },
    },
  },
};

export const LimitedAvailableBooks: Story = {
  args: {
    availableBookInfo: someBooksAvailable,
    selectedBookIds: ['GEN'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Only a subset of books is available, so section buttons for empty sections are disabled.',
      },
    },
  },
};

export const WithLocalizedBookNames: Story = {
  args: {
    selectedBookIds: ['GEN', 'PSA', 'MAT', 'JHN', 'REV'],
    localizedBookNames: spanishBookNames,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays localized (Spanish) book names. Search works against both English and ' +
          'localized names and IDs.',
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
          'When no localized strings are provided the component falls back to displaying the raw ' +
          'localization keys.',
      },
    },
  },
};
