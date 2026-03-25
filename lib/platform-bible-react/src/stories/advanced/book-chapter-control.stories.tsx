import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef, LanguageStrings } from 'platform-bible-utils';
import { expect, fn, screen, waitFor, within } from 'storybook/test';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { useRecentSearches } from '@/components/advanced/recent-searches.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

type BookChapterControlWrapperProps = {
  scrRef: SerializedVerseRef;
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  className?: string;
  getActiveBookIds?: () => string[];
};

// Wrapper component to handle state
function BookChapterControlWrapper({
  scrRef: initialScrRef,
  handleSubmit,
  ...rest
}: BookChapterControlWrapperProps) {
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(initialScrRef);

  const handleSubmitWrapper = useCallback(
    (newScrRef: SerializedVerseRef) => {
      setScrRef(newScrRef);
      handleSubmit(newScrRef);
    },
    [handleSubmit],
  );

  return (
    <ThemeProvider>
      <div className="tw-p-4">
        <BookChapterControl {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
        <div className="tw-mt-4 tw-text-sm tw-text-gray-600">
          Current Reference: {JSON.stringify(scrRef, undefined, 2)}
        </div>
      </div>
    </ThemeProvider>
  );
}

/* Helper functions for interaction tests */

const TRIGGER_ROLE = 'combobox';
const INPUT_ROLE = 'combobox';
const CHAPTER_BUTTON_ROLE = 'button';

async function expectPopoverToBeOpenAndVisible() {
  // Wait for the popover to appear and verify it's open
  const popoverContent = screen.getByRole('dialog');
  await waitFor(() => expect(popoverContent).toHaveStyle('opacity: 1'));
  await expect(popoverContent).toBeVisible();
  return popoverContent;
}

async function expectPopoverToBeClosed() {
  // Wait for the dialog to be fully removed from DOM (not just data-state="closed")
  // This ensures close animations complete and pointer-events/aria-hidden are cleaned up
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
}

function getDropdown() {
  return screen.getByRole('dialog');
}

const meta: Meta<typeof BookChapterControl> = {
  title: 'Advanced/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn((scrRef) => console.log('Scripture reference changed:', scrRef)),
  },
  render: (args) => <BookChapterControlWrapper {...args} />,
} satisfies Meta<typeof BookChapterControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scrRef: defaultScrRef,
  },
};

export const WithSpecificBook: Story = {
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 135,
      verseNum: 10,
    },
  },
};

export const WithLimitedBooks: Story = {
  args: {
    scrRef: defaultScrRef,
    getActiveBookIds: () => ['GEN', 'EXO', 'MAT', 'JHN', 'ROM', 'REV'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a limited set of available books.',
      },
    },
  },
};

export const WithCustomTrigger: Story = {
  args: {
    scrRef: defaultScrRef,
    className: 'tw-w-64 tw-bg-blue-50 tw-rounded-xl tw-p-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom styling applied to the trigger button.',
      },
    },
  },
};

export const EmptyBookList: Story = {
  args: {
    scrRef: defaultScrRef,
    getActiveBookIds: () => [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with an empty list of available books.',
      },
    },
  },
};

export const ChapterSelectionDemo: Story = {
  args: {
    scrRef: {
      book: 'ROM',
      chapterNum: 8,
      verseNum: 1,
    },
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open the book chapter control', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await expect(trigger).toBeInTheDocument();
      await userEvent.click(trigger);
    });

    await step('Select Romans book', async () => {
      // Wait for the dropdown to appear
      const dropdownContent = await expectPopoverToBeOpenAndVisible();

      const romansItem = within(dropdownContent).getByText('Romans');
      await expect(romansItem).toBeInTheDocument();
      await userEvent.click(romansItem);
    });

    await step('Verify chapter grid is displayed for Romans', async () => {
      const dropdownContent = getDropdown();

      // Look for chapter 8 button in the dropdown (current chapter)
      const chapter8Button = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, { name: '8' });
      await expect(chapter8Button).toBeInTheDocument();
    });

    await step('Verify the correct number of chapters is shown for Romans', async () => {
      const dropdownContent = getDropdown();

      // Verify we have multiple chapter buttons (Romans has 16 chapters)
      const allChapterButtons = dropdownContent.querySelectorAll('[data-chapter-btn]');
      await expect(allChapterButtons.length).toBe(16);
    });

    await step('Select a different chapter', async () => {
      // Click on chapter 12
      const dropdownContent = getDropdown();
      const chapter12Button = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, {
        name: '12',
      });
      await userEvent.click(chapter12Button);
    });

    await step('Verify the different chapter number is selected', async () => {
      // Verify the popover closes and the trigger shows the new reference
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await expect(trigger).toHaveTextContent('Romans 12:1');
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ROM',
        chapterNum: 12,
        verseNum: 1,
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Chapter Selection Demo** - Interactive test that demonstrates chapter navigation.

This test:
1. Opens the component starting with Romans 8:1
2. Clicks the trigger to open the dropdown
3. Selects the Romans book from the dropdown
4. Verifies the chapter grid is displayed for Romans
5. Confirms all 16 chapters are shown in the grid
6. Selects chapter 12 from the grid
7. Verifies the selection updates to Romans 12:1 and the dropdown closes
        `,
      },
    },
  },
};

export const SmartParsingDemo: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open the component and test smart parsing', async () => {
      // Click to open the component
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);

      // Wait for the dropdown to appear
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Test complete reference parsing: "John 3:16"', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);

      // Clear any existing text and type the reference
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'John 3:16');

      // Verify the direct match banner shows (the ENTER badge only appears in the banner)
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();

      // Press Enter to select the top match (banner is not clickable)
      await userEvent.keyboard('{Enter}');

      // Verify the handleSubmit was called with correct reference
      // Note: CommandNavigator always submits with verseNum: 1
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });

    await step('Test book with chapter parsing: "Romans 8"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);

      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Roma 8');

      // Verify the direct match banner shows
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();

      // Press Enter to select the top match (banner is not clickable)
      await userEvent.keyboard('{Enter}');

      // Verify the handleSubmit was called
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ROM',
        chapterNum: 8,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });

    await step('Test book ID parsing: "1CO 13:4"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);

      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, '1 co 13:4');

      // Verify the direct match banner shows
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();

      // Press Enter to select the top match (banner is not clickable)
      await userEvent.keyboard('{Enter}');

      // Verify the handleSubmit was called
      // Note: CommandNavigator always submits with verseNum: 1
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: '1CO',
        chapterNum: 13,
        verseNum: 1,
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Smart Parsing Demo** - Interactive test that demonstrates intelligent scripture reference parsing.

This test verifies:
1. Opens the component and activates the search input
2. Tests complete reference parsing by typing "John 3:16" and verifying "JHN 3:16" appears as top match
3. Confirms selection submits correct reference (JHN 3:16)
4. Tests partial book name parsing by typing "Roma 8" and verifying "ROM 8:1" appears as top match
5. Confirms selection submits correct reference (ROM 8:1)
6. Tests book ID parsing by typing "1 co 13:4" and verifying "1CO 13:4" appears as top match
7. Confirms selection submits correct reference (1CO 13:4)
8. Validates that all selections properly call handleSubmit with the expected SerializedVerseRef objects
        `,
      },
    },
  },
};

export const BookSearchAndNavigation: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Type search query for Psalms with chapter', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Psalms 23');
    });

    await step('Verify direct match banner shows for Psalms 23', async () => {
      const dropdownContent = getDropdown();
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();
    });

    await step('Press Enter to select Psalms 23', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify submission and component closes', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'PSA',
        chapterNum: 23,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });

    await step('Reopen component for back navigation test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Type Romans to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Romans ');
    });

    await step('Verify chapter view is active and click back button', async () => {
      const dropdownContent = getDropdown();
      // Wait for a chapter button to confirm we're in chapter view
      await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, { name: '1' });
      // The back button is the first button without data-chapter-btn
      const allButtons = within(dropdownContent).getAllByRole('button');
      const backButton = allButtons.find((btn) => !btn.hasAttribute('data-chapter-btn'));
      await expect(backButton).toBeTruthy();
      await userEvent.click(backButton!);
    });

    await step('Verify back navigation returns to search mode', async () => {
      const dropdownContent = getDropdown();
      const searchInputAgain = within(dropdownContent).getByRole(INPUT_ROLE);
      await expect(searchInputAgain).toBeInTheDocument();
      await expect(searchInputAgain).toHaveFocus();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Book Search and Navigation** - Tests book search filtering and chapter navigation workflow.

This interactive test demonstrates:
1. Opening the component dropdown
2. Typing a search query to filter books
3. Verifying search results appear correctly
4. Navigating from book search to chapter view
5. Verifying chapter grid displays the correct number of chapters
6. Selecting a specific chapter
7. Confirming the selection submits and component closes
8. Reopening component for navigation testing
9. Searching for another book
10. Entering chapter view for the new book
11. Using back navigation to return to search mode
12. Verifying focus management during navigation
        `,
      },
    },
  },
};

export const SingleChapterBookDemo: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open component for Obadiah test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Verify Obadiah appears in book list', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = await within(dropdownContent).findByText('Obadiah');
      await expect(obadiahItem).toBeInTheDocument();
    });

    await step('Click Obadiah to select immediately', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = within(dropdownContent).getByText('Obadiah');
      await userEvent.click(obadiahItem);
    });

    await step('Verify Obadiah submits immediately without chapter grid', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });

    await step('Open component for Odes test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for Odes with chapter', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Ode 1');
    });

    await step('Verify Odes direct match banner appears', async () => {
      const dropdownContent = getDropdown();
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();
    });

    await step('Press Enter to submit Odes', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify Odes submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ODA',
        chapterNum: 1,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Single Chapter Book Demo** - Tests immediate selection behavior for books with only one chapter.

This interactive test demonstrates:
1. Opening the component for testing single-chapter books
2. Verifying single-chapter books appear in the book list
3. Clicking a single-chapter book (Obadiah)
4. Confirming immediate submission without showing chapter grid
5. Reopening component for additional testing
6. Using search to find another single-chapter book (Odes)
7. Verifying smart parsing results for single-chapter books
8. Clicking the smart parsing result
9. Confirming proper submission with correct book ID and chapter/verse
        `,
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  args: {
    scrRef: {
      book: 'MAT',
      chapterNum: 15,
      verseNum: 1,
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open component with Matthew reference', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Verify Matthew appears in book list', async () => {
      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await expect(matthewItem).toBeInTheDocument();
    });

    await step('Click Matthew to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await userEvent.click(matthewItem);
    });

    await step('Verify chapter 15 button exists in chapter grid', async () => {
      const dropdownContent = getDropdown();
      const chapter15 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '15',
      });
      await expect(chapter15).toBeInTheDocument();
    });

    await step('Focus the search input for keyboard navigation', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
    });

    await step('Test down arrow key to enter chapter grid from input', async () => {
      // ArrowDown from input enters the chapter grid (sets focusedChapter)
      await userEvent.keyboard('{ArrowDown}');
      // Verify a chapter button gets the focus ring
      await waitFor(() => {
        const focusedBtn = getDropdown().querySelector('[data-chapter-btn]');
        expect(focusedBtn).toBeTruthy();
      });
    });

    await step('Test arrow key navigation within grid', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowLeft}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test Enter key to select focused chapter', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify component closes after Enter key selection', async () => {
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await expect(trigger).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Keyboard Navigation** - Tests keyboard interactions within the chapter grid.

This interactive test demonstrates:
1. Opening the component with a multi-chapter book (Matthew)
2. Verifying the book appears in the dropdown
3. Clicking the book to enter chapter view
4. Confirming the current chapter button exists in the grid
5. Testing right arrow key navigation
6. Testing down arrow key navigation
7. Testing left arrow key navigation
8. Testing up arrow key navigation
9. Using Enter key to select the focused chapter
10. Verifying the component closes after keyboard selection
        `,
      },
    },
  },
};

export const ComprehensiveInteractionTest: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open component for filtering test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Type partial search term for John books', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'joh');
    });

    await step('Verify multiple John books appear in results', async () => {
      const dropdownContent = getDropdown();
      const johnItems = within(dropdownContent).getAllByText(/john/i);
      await expect(johnItems.length).toBe(4);
    });

    await step('Continue typing to select specific John book', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'n');
    });

    await step('Click John book to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const johnItems = within(dropdownContent).getByText('John');
      await expect(johnItems).toBeInTheDocument();
      await userEvent.click(johnItems);
    });

    await step('Test first Escape key press in chapter view', async () => {
      await userEvent.keyboard('{Escape}');
      const dropdownContent = getDropdown();
      expect(dropdownContent).toBeVisible();
    });

    await step('Test second Escape key press to close component', async () => {
      await userEvent.keyboard('{Escape}');
      await expectPopoverToBeClosed();
    });

    await step('Verify trigger returns to original value', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await expect(trigger).toHaveTextContent('Genesis 1:1');
    });

    await step('Open component for rapid switching test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for first book (Obadiah) with chapter', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'obad 1');
    });

    await step('Verify Obadiah direct match banner and press Enter', async () => {
      const dropdownContent = getDropdown();
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify first book submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });

    await step('Immediately open component for second book', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE, { hidden: true });
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for second book with specific reference', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Rev 22:21');
    });

    await step('Verify Revelation direct match banner and press Enter', async () => {
      const dropdownContent = getDropdown();
      const enterBadge = await within(dropdownContent).findByText('ENTER');
      await expect(enterBadge).toBeInTheDocument();
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify second book submission', async () => {
      // Note: CommandNavigator always submits with verseNum: 1
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'REV',
        chapterNum: 22,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Comprehensive Interaction Test** - Tests complex user workflows and edge cases.

This interactive test demonstrates:
1. Opening the component for filtering tests
2. Typing partial search terms to filter books
3. Verifying multiple matching books appear
4. Continuing to type to refine search results
5. Clicking a book to enter chapter view
6. Testing first Escape key press behavior in chapter view
7. Testing second Escape key press to close component
8. Verifying trigger text resets to original value
9. Reopening component for rapid book switching test
10. Searching for a single-chapter book using smart parsing
11. Clicking the smart parsing result for immediate selection
12. Verifying the first book submission
13. Immediately reopening for rapid switching
14. Searching for a different book with specific chapter and verse
15. Clicking the second smart parsing result
16. Verifying the second book submission and proper state management
        `,
      },
    },
  },
};

// Sample localized book names for Spanish
const spanishBookNames = new Map([
  ['GEN', { localizedId: 'GÉN', localizedName: 'Génesis' }],
  ['EXO', { localizedId: 'ÉXO', localizedName: 'Éxodo' }],
  ['LEV', { localizedId: 'LEV', localizedName: 'Levítico' }],
  ['NUM', { localizedId: 'NÚM', localizedName: 'Números' }],
  ['DEU', { localizedId: 'DEU', localizedName: 'Deuteronomio' }],
  ['JOS', { localizedId: 'JOS', localizedName: 'Josué' }],
  ['JDG', { localizedId: 'JUE', localizedName: 'Jueces' }],
  ['RUT', { localizedId: 'RUT', localizedName: 'Rut' }],
  ['1SA', { localizedId: '1SA', localizedName: '1 Samuel' }],
  ['2SA', { localizedId: '2SA', localizedName: '2 Samuel' }],
  ['1KI', { localizedId: '1RE', localizedName: '1 Reyes' }],
  ['2KI', { localizedId: '2RE', localizedName: '2 Reyes' }],
  ['1CH', { localizedId: '1CR', localizedName: '1 Crónicas' }],
  ['2CH', { localizedId: '2CR', localizedName: '2 Crónicas' }],
  ['EZR', { localizedId: 'ESD', localizedName: 'Esdras' }],
  ['NEH', { localizedId: 'NEH', localizedName: 'Nehemías' }],
  ['EST', { localizedId: 'EST', localizedName: 'Ester' }],
  ['JOB', { localizedId: 'JOB', localizedName: 'Job' }],
  ['PSA', { localizedId: 'SAL', localizedName: 'Salmos' }],
  ['PRO', { localizedId: 'PRO', localizedName: 'Proverbios' }],
  ['ECC', { localizedId: 'ECL', localizedName: 'Eclesiastés' }],
  ['SNG', { localizedId: 'CNT', localizedName: 'Cantares' }],
  ['ISA', { localizedId: 'ISA', localizedName: 'Isaías' }],
  ['JER', { localizedId: 'JER', localizedName: 'Jeremías' }],
  ['LAM', { localizedId: 'LAM', localizedName: 'Lamentaciones' }],
  ['EZK', { localizedId: 'EZE', localizedName: 'Ezequiel' }],
  ['DAN', { localizedId: 'DAN', localizedName: 'Daniel' }],
  ['HOS', { localizedId: 'OSE', localizedName: 'Oseas' }],
  ['JOL', { localizedId: 'JOE', localizedName: 'Joel' }],
  ['AMO', { localizedId: 'AMÓ', localizedName: 'Amós' }],
  ['OBA', { localizedId: 'ABD', localizedName: 'Abdías' }],
  ['JON', { localizedId: 'JON', localizedName: 'Jonás' }],
  ['MIC', { localizedId: 'MIQ', localizedName: 'Miqueas' }],
  ['NAM', { localizedId: 'NAH', localizedName: 'Nahúm' }],
  ['HAB', { localizedId: 'HAB', localizedName: 'Habacuc' }],
  ['ZEP', { localizedId: 'SOF', localizedName: 'Sofonías' }],
  ['HAG', { localizedId: 'HAG', localizedName: 'Hageo' }],
  ['ZEC', { localizedId: 'ZAC', localizedName: 'Zacarías' }],
  ['MAL', { localizedId: 'MAL', localizedName: 'Malaquías' }],
  ['MAT', { localizedId: 'MAT', localizedName: 'Mateo' }],
  ['MRK', { localizedId: 'MAR', localizedName: 'Marcos' }],
  ['LUK', { localizedId: 'LUC', localizedName: 'Lucas' }],
  ['JHN', { localizedId: 'JUA', localizedName: 'Juan' }],
  ['ACT', { localizedId: 'HEC', localizedName: 'Hechos' }],
  ['ROM', { localizedId: 'ROM', localizedName: 'Romanos' }],
  ['1CO', { localizedId: '1CO', localizedName: '1 Corintios' }],
  ['2CO', { localizedId: '2CO', localizedName: '2 Corintios' }],
  ['GAL', { localizedId: 'GÁL', localizedName: 'Gálatas' }],
  ['EPH', { localizedId: 'EFE', localizedName: 'Efesios' }],
  ['PHP', { localizedId: 'FIL', localizedName: 'Filipenses' }],
  ['COL', { localizedId: 'COL', localizedName: 'Colosenses' }],
  ['1TH', { localizedId: '1TE', localizedName: '1 Tesalonicenses' }],
  ['2TH', { localizedId: '2TE', localizedName: '2 Tesalonicenses' }],
  ['1TI', { localizedId: '1TI', localizedName: '1 Timoteo' }],
  ['2TI', { localizedId: '2TI', localizedName: '2 Timoteo' }],
  ['TIT', { localizedId: 'TIT', localizedName: 'Tito' }],
  ['PHM', { localizedId: 'FLM', localizedName: 'Filemón' }],
  ['HEB', { localizedId: 'HEB', localizedName: 'Hebreos' }],
  ['JAS', { localizedId: 'STG', localizedName: 'Santiago' }],
  ['1PE', { localizedId: '1PE', localizedName: '1 Pedro' }],
  ['2PE', { localizedId: '2PE', localizedName: '2 Pedro' }],
  ['1JN', { localizedId: '1JN', localizedName: '1 Juan' }],
  ['2JN', { localizedId: '2JN', localizedName: '2 Juan' }],
  ['3JN', { localizedId: '3JN', localizedName: '3 Juan' }],
  ['JUD', { localizedId: 'JUD', localizedName: 'Judas' }],
  ['REV', { localizedId: 'APO', localizedName: 'Apocalipsis' }],
]);

// Sample localized book names for French
const frenchBookNames = new Map([
  ['GEN', { localizedId: 'GEN', localizedName: 'Genèse' }],
  ['EXO', { localizedId: 'EXO', localizedName: 'Exode' }],
  ['LEV', { localizedId: 'LÉV', localizedName: 'Lévitique' }],
  ['NUM', { localizedId: 'NOM', localizedName: 'Nombres' }],
  ['DEU', { localizedId: 'DEU', localizedName: 'Deutéronome' }],
  ['MAT', { localizedId: 'MAT', localizedName: 'Matthieu' }],
  ['MRK', { localizedId: 'MAR', localizedName: 'Marc' }],
  ['LUK', { localizedId: 'LUC', localizedName: 'Luc' }],
  ['JHN', { localizedId: 'JEA', localizedName: 'Jean' }],
  ['ACT', { localizedId: 'ACT', localizedName: 'Actes' }],
  ['ROM', { localizedId: 'ROM', localizedName: 'Romains' }],
  ['1CO', { localizedId: '1CO', localizedName: '1 Corinthiens' }],
  ['2CO', { localizedId: '2CO', localizedName: '2 Corinthiens' }],
  ['GAL', { localizedId: 'GAL', localizedName: 'Galates' }],
  ['EPH', { localizedId: 'ÉPH', localizedName: 'Éphésiens' }],
  ['PHP', { localizedId: 'PHI', localizedName: 'Philippiens' }],
  ['REV', { localizedId: 'APO', localizedName: 'Apocalypse' }],
]);

export const WithLocalizedSpanishBookNames: Story = {
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: spanishBookNames,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (Spanish)** - Demonstrates the BookChapterControl with Spanish localized book names.

This example shows how the component displays localized book names in Spanish alongside the localized book IDs. When you open the book selector, you'll see:
- Spanish book names (e.g., "Génesis" instead of "Genesis")
- Spanish book IDs (e.g., "GÉN" instead of "GEN")
- Proper search functionality with both English and Spanish terms

The localization is provided through the \`localizedBookNames\` prop, which maps English book IDs to their localized equivalents.
        `,
      },
    },
  },
};

export const WithLocalizedFrenchBookNames: Story = {
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: frenchBookNames,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Book Names (French)** - Demonstrates the BookChapterControl with French localized book names.

This example shows how the component displays localized book names in French. Features include:
- French book names (e.g., "Matthieu" instead of "Matthew")
- French book IDs where different (e.g., "JEA" for John)
- Seamless integration with search and navigation

Note: This example includes a subset of books to demonstrate the localization feature. In practice, you would provide localized names for all available books.
        `,
      },
    },
  },
};

// Sample localized strings for Spanish (section names and other UI text)
const spanishLocalizedStrings: LanguageStrings = {
  '%scripture_section_ot_long%': 'Antiguo Testamento',
  '%scripture_section_nt_long%': 'Nuevo Testamento',
  '%scripture_section_dc_long%': 'Deuterocanónicos',
  '%scripture_section_extra_long%': 'Material Extra',
};

export const WithLocalizedSectionNames: Story = {
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn(),
    localizedBookNames: spanishBookNames,
    localizedStrings: spanishLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Localized Section Names** - Demonstrates the BookChapterControl with localized section names.

This example shows how the component displays localized section headers in Spanish. Features include:
- Spanish section names ("Antiguo Testamento" instead of "Old Testament")
- Spanish book names from the previous example
- Proper integration of both types of localization

This demonstrates the full localization capabilities of the component.
        `,
      },
    },
  },
};

// Wrapper component with recent searches functionality
function BookChapterControlWithRecentSearches({
  scrRef: initialScrRef,
  handleSubmit,
  ...rest
}: BookChapterControlWrapperProps) {
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(initialScrRef);
  const [recentSearches, setRecentSearches] = useState<SerializedVerseRef[]>([
    { book: 'GEN', chapterNum: 1, verseNum: 1 },
    { book: 'MAT', chapterNum: 5, verseNum: 3 },
    { book: 'JHN', chapterNum: 3, verseNum: 16 },
    { book: 'ROM', chapterNum: 8, verseNum: 28 },
  ]);

  // Note that you can also use the `useRecentScriptureRefs` hook from the `papi` (not available
  // here in `platform-bible-react`) if you want history for your BookChapterControl in your
  // extension
  const addRecentSearchItem = useRecentSearches(
    recentSearches,
    setRecentSearches,
    (a: SerializedVerseRef, b: SerializedVerseRef) =>
      a.book === b.book && a.chapterNum === b.chapterNum && a.verseNum === b.verseNum,
  );

  const handleScrRef = useCallback(
    (newScrRef: SerializedVerseRef) => {
      setScrRef(newScrRef);
      handleSubmit(newScrRef);
    },
    [handleSubmit],
  );

  const handleAddRecentSearch = useCallback(
    (newRef: SerializedVerseRef) => {
      addRecentSearchItem(newRef);
    },
    [addRecentSearchItem],
  );

  return (
    <ThemeProvider>
      <div className="tw-p-4">
        <BookChapterControl
          {...rest}
          scrRef={scrRef}
          handleSubmit={handleScrRef}
          recentSearches={recentSearches}
          onAddRecentSearch={handleAddRecentSearch}
        />
        <div className="tw-mt-4 tw-text-sm tw-text-gray-600">
          Current Reference: {JSON.stringify(scrRef, undefined, 2)}
        </div>
        <div className="tw-mt-2 tw-text-sm tw-text-gray-500">
          Recent Searches:{' '}
          {recentSearches.map((ref) => `${ref.book} ${ref.chapterNum}:${ref.verseNum}`).join(', ')}
        </div>
      </div>
    </ThemeProvider>
  );
}

export const WithRecentSearches: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  render: (args) => <BookChapterControlWithRecentSearches {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl with recent searches functionality. Click the clock icon in the search input to see recent scripture references.',
      },
    },
  },
};
