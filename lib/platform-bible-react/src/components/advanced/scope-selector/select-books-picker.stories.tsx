import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { expect, within } from 'storybook/test';
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
  // The popover portals to `document.body`, so Radix measures collisions against the viewport —
  // a short wrapper element around the trigger would not constrain it. Only a short viewport
  // reproduces the web view this bug was reported in, hence the small-screen global plus a
  // full-bleed layout that lets the decorator own the whole of it.
  globals: { viewport: { value: 'shortWebView' } },
  decorators: [
    (Story) => (
      <div className="tw:flex tw:h-screen tw:w-full tw:flex-col tw:justify-end tw:p-2">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, userEvent, step }) => {
    const body = within(canvasElement.ownerDocument.body);

    await step(
      'Open the picker from a trigger pinned to the bottom of a short viewport',
      async () => {
        await userEvent.click(body.getByRole('combobox'));
      },
    );

    await step('The search input stays on screen even though the popover flipped', async () => {
      // The regression: at full height the popover overran the top of the viewport and took the
      // search input with it, leaving no way to filter the list.
      const searchInput = await body.findByPlaceholderText('Search books...');
      const inputTop = searchInput.getBoundingClientRect().top;
      await expect(inputTop).toBeGreaterThanOrEqual(0);
    });

    await step(
      'The book list absorbs the shortfall by scrolling instead of overflowing',
      async () => {
        const popover = await body.findByRole('dialog');
        const { height } = popover.getBoundingClientRect();
        await expect(height).toBeLessThanOrEqual(
          canvasElement.ownerDocument.documentElement.clientHeight,
        );
      },
    );
  },
  parameters: {
    layout: 'fullscreen',
    // A web view docked into a short panel — the shape this bug was reported in. Storybook's
    // stock viewports are all phone-portrait or taller, none short enough to reproduce it.
    viewport: {
      options: {
        shortWebView: { name: 'Short web view', styles: { width: '640px', height: '300px' } },
      },
    },
    docs: {
      description: {
        story:
          'Regression guard for the books picker overrunning a short viewport. The picker sits at ' +
          'the bottom of a short viewport, so opening it flips the popover upward. The play ' +
          'function asserts that the search input stays on screen and that the popover fits ' +
          'within the viewport; before the fix the full-height popover overran the top and ' +
          'clipped the search input away inside a web view.',
      },
    },
  },
};
