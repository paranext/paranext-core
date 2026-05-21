import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef, LanguageStrings } from 'platform-bible-utils';
import { expect, fireEvent, fn, screen, waitFor, within } from 'storybook/test';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { useRecentSearches } from '@/components/advanced/recent-searches.component';

type BookChapterControlWrapperProps = {
  scrRef: SerializedVerseRef;
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  className?: string;
  getActiveBookIds?: () => string[];
  getEndVerse?: (bookId: string, chapterNum: number) => number;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Sample verse-count table for stories. Real consumers will typically derive this from a
 * versification service. This is just enough data to demonstrate verse selection.
 */
const SAMPLE_VERSE_COUNTS: Record<string, Record<number, number>> = {
  GEN: { 1: 31, 2: 25, 3: 24 },
  PSA: { 23: 6, 117: 2, 119: 176, 135: 21 },
  MAT: { 1: 25, 5: 48, 15: 39 },
  JHN: { 3: 36 },
  ROM: { 8: 39, 12: 21 },
  '1CO': { 13: 13 },
  REV: { 22: 21 },
  OBA: { 1: 21 },
};

function sampleGetEndVerse(bookId: string, chapterNum: number): number {
  return SAMPLE_VERSE_COUNTS[bookId]?.[chapterNum] ?? 30;
}

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
    <div className="tw:p-4">
      <BookChapterControl {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
      <div className="tw:mt-4 tw:text-sm tw:text-gray-600">
        Current Reference: {JSON.stringify(scrRef, undefined, 2)}
      </div>
    </div>
  );
}

/* Helper functions for interaction tests */

const TRIGGER_ROLE = 'combobox';
const INPUT_ROLE = 'combobox';
const CHAPTER_BUTTON_ROLE = 'option';

async function expectPopoverToBeOpenAndVisible() {
  // Wait for the popover to appear and verify it's open
  const popoverContent = screen.getByRole('dialog');
  await waitFor(() => expect(popoverContent).toHaveStyle('opacity: 1'));
  await expect(popoverContent).toBeVisible();
  return popoverContent;
}

async function expectPopoverToBeClosed() {
  // Wait for the popover to close
  const popoverContent = screen.queryByRole('dialog');
  if (popoverContent) {
    await waitFor(() => expect(popoverContent).toHaveAttribute('data-state', 'closed'));
  } else {
    expect(popoverContent).not.toBeInTheDocument();
  }
}

function getDropdown() {
  return screen.getByRole('dialog');
}

/** Returns the trimmed text of the currently keyboard-highlighted (`data-selected`) list item. */
function getSelectedItemText(dropdownContent: HTMLElement): string {
  const selected = dropdownContent.querySelector('[data-selected="true"]');
  return selected?.textContent?.trim() ?? '';
}

/** Reads the caret position of the focused search input without a type assertion. */
function getInputCaret(input: HTMLElement): number {
  if (!(input instanceof HTMLInputElement)) throw new Error('Expected an <input> element');
  return input.selectionStart ?? -1;
}

const BACK_TO_BOOKS_LABEL = 'Back to books';
const MATTHEW_REF = { book: 'MAT', chapterNum: 15, verseNum: 1 };

/**
 * Presses Escape and waits briefly for the resulting state change to settle (Radix tooltip
 * dismissal and/or the chapter-view → book-view switch). Used by the chapter-view Escape test,
 * where each press depends on the previous one having fully applied.
 */
async function pressEscapeAndSettle(press: () => Promise<void>): Promise<void> {
  await press();
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 80);
  });
}

const meta: Meta<typeof BookChapterControl> = {
  title: 'Advanced/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  args: {
    scrRef: defaultScrRef,
    handleSubmit: fn((scrRef) => console.log('Scripture reference changed:', scrRef)),
    // Explicit spy so Storybook doesn't synthesize an implicit action arg for this `on*`
    // handler. The component invokes `onOpenChange` from an effect on open/close, which would
    // otherwise trip SB_PREVIEW_API_0002 (ImplicitActionsDuringRendering).
    onOpenChange: fn(),
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
    className: 'tw:w-64 tw:bg-blue-50 tw:rounded-xl tw:p-4',
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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
      const allChapterButtons = within(dropdownContent).getAllByRole(CHAPTER_BUTTON_ROLE);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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

      // Look for the top match suggestion in the dropdown (shows the long book name + reference)
      const topMatch = await within(dropdownContent).findByText('John 3:16');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called with correct reference
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 16,
      });
    });

    await step('Test book with chapter parsing: "Romans 8"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Roma 8');

      // Look for the top match in dropdown
      const topMatch = await within(dropdownContent).findByText('Romans 8:1');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ROM',
        chapterNum: 8,
        verseNum: 1,
      });
    });

    await step('Test book ID parsing: "1CO 13:4"', async () => {
      // Reopen the component
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, '1 co 13:4');

      // Look for the top match in dropdown
      const topMatch = await within(dropdownContent).findByText('1 Corinthians 13:4');
      await expect(topMatch).toBeInTheDocument();

      // Click the top match
      await userEvent.click(topMatch);

      // Verify the handleSubmit was called
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: '1CO',
        chapterNum: 13,
        verseNum: 4,
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Type search query for Psalms', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Psalms');
    });

    await step('Verify Psalms appears in search results', async () => {
      const dropdownContent = getDropdown();
      const psalmsItem = await within(dropdownContent).findByText('Psalms');
      await expect(psalmsItem).toBeInTheDocument();
    });

    await step('Click Psalms to navigate to chapter view', async () => {
      const dropdownContent = getDropdown();
      const psalmsItem = within(dropdownContent).getByText('Psalms');
      await userEvent.click(psalmsItem);
    });

    await step('Verify chapter grid shows many chapters for Psalms', async () => {
      const dropdownContent = getDropdown();
      const chapterButtons = within(dropdownContent).getAllByRole(CHAPTER_BUTTON_ROLE);
      await expect(chapterButtons.length).toBeGreaterThan(50);
    });

    await step('Select chapter 23', async () => {
      const dropdownContent = getDropdown();
      const chapter23 = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, { name: '23' });
      await userEvent.click(chapter23);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for Romans', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Ro');
    });

    await step('Click Romans to enter chapter view', async () => {
      const dropdownContent = getDropdown();
      const romansItem = await within(dropdownContent).findByText('Romans');
      await userEvent.click(romansItem);
    });

    await step('Click back button to return to book search', async () => {
      const dropdownContent = getDropdown();
      const backButton = await within(dropdownContent).findByRole('button');
      await userEvent.click(backButton);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for Odes', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Ode');
    });

    await step('Verify Odes smart parsing result appears', async () => {
      const dropdownContent = getDropdown();
      const odesItem = await within(dropdownContent).findByText('Odes 1:1');
      await expect(odesItem).toBeInTheDocument();
    });

    await step('Click Odes result to submit', async () => {
      const dropdownContent = getDropdown();
      const odesItem = within(dropdownContent).getByText('Odes 1:1');
      await userEvent.click(odesItem);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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

    await step('Test right arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowRight}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test down arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowDown}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test left arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test up arrow key navigation', async () => {
      await userEvent.keyboard('{ArrowUp}');
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test Enter key to select focused chapter', async () => {
      await userEvent.keyboard('{Enter}');
    });

    await step('Verify component closes after Enter key selection', async () => {
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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

export const TypingReturnsFocusToInput: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Move focus into the list/grid with ArrowDown', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      // ArrowDown hands focus from the input to the list as a unit (highlights the first item).
      await userEvent.keyboard('{ArrowDown}');
      // The list now owns focus and a list item is highlighted (data-selected).
      await waitFor(() =>
        expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
      );
    });

    await step('A routed letter immediately followed by Space must not submit', async () => {
      // Reproduce the focus race deterministically: dispatch the letter and the space
      // synchronously, with no event-loop turn between them, so the async `setTimeout` that
      // returns focus to the input cannot run in between. The letter is routed back into the
      // input; the very next Space must NOT be captured by the list's submit handler (which would
      // submit the highlighted single-match preview the user can still see). `fireEvent` (rather
      // than `userEvent`) is required here precisely because it does not yield to the event loop
      // between the two key presses.
      const focused = document.activeElement;
      if (!focused) throw new Error('Expected the list to own focus after ArrowDown');
      fireEvent.keyDown(focused, { key: 'r' });
      fireEvent.keyDown(focused, { key: ' ' });
      await expect(args.handleSubmit).not.toHaveBeenCalled();
      await expect(getDropdown()).toBeVisible();
    });

    await step('Focus settles back on the input', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await waitFor(() => expect(searchInput).toHaveFocus());
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Typing Returns Focus To Input** - Regression test for focus management while typing.

After the user moves focus into the list/grid with the arrow keys and then resumes typing, focus
must return to the search input and the input alone must own subsequent key presses. This guards
against a regression where a routed character left a stale "list focused" state, so the very next
Space/Enter submitted the single-match preview's highlighted item while the user believed they
were typing in the input.

This interactive test:
1. Opens the component
2. Presses ArrowDown to hand focus to the list/grid (highlighting an item)
3. Synchronously dispatches a letter then Space (reproducing the focus race)
4. Verifies the Space did not submit a list item (the popover stays open)
5. Verifies focus settles back on the input
        `,
      },
    },
  },
};

export const InputCursorKeysStayInInput: Story = {
  args: { scrRef: defaultScrRef },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component and type a query', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const searchInput = within(getDropdown()).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Genesis');
      await expect(searchInput).toHaveFocus();
      expect(getInputCaret(searchInput)).toBe('Genesis'.length);
    });

    await step('ArrowLeft / ArrowRight move the caret instead of navigating the list', async () => {
      const searchInput = within(getDropdown()).getByRole(INPUT_ROLE);
      await userEvent.keyboard('{ArrowLeft}');
      await expect(searchInput).toHaveFocus();
      expect(getInputCaret(searchInput)).toBe('Genesis'.length - 1);
      await userEvent.keyboard('{ArrowRight}');
      await expect(searchInput).toHaveFocus();
      expect(getInputCaret(searchInput)).toBe('Genesis'.length);
    });

    await step('Home / End perform native cursor movement (not cmdk jump-to-list)', async () => {
      const searchInput = within(getDropdown()).getByRole(INPUT_ROLE);
      await userEvent.keyboard('{Home}');
      await expect(searchInput).toHaveFocus();
      expect(getInputCaret(searchInput)).toBe(0);
      await userEvent.keyboard('{End}');
      await expect(searchInput).toHaveFocus();
      expect(getInputCaret(searchInput)).toBe('Genesis'.length);
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Verifies that ArrowLeft/ArrowRight and Home/End move the text caret within the search input and keep focus on the input, rather than being hijacked by cmdk to navigate or jump within the list.',
      },
    },
  },
};

export const InputArrowEntersListEdges: Story = {
  args: { scrRef: defaultScrRef, getActiveBookIds: () => ['GEN', 'EXO', 'MAT', 'REV'] },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('ArrowDown from the input highlights the FIRST list item', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toContain('Genesis'));
    });

    await step('Reopen, then ArrowUp from the input highlights the LAST list item', async () => {
      // Escape closes the popover in book view; reopen for a fresh input-focused state.
      await userEvent.keyboard('{Escape}');
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.keyboard('{ArrowUp}');
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toContain('Revelation'));
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'ArrowDown from the input hands focus to the list and seeds the FIRST item; ArrowUp seeds the LAST item. The list is the single tab/arrow target, entered as a unit from the input.',
      },
    },
  },
};

export const TabFromInputMovesToQuickNav: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Tab from the input lands on a quick-nav button, not the list', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.tab();
      // Natural tab order walks the quick-nav buttons before the list (Tab is intentionally not
      // intercepted by the input's keydown handler).
      const prevChapter = within(dropdownContent).getByRole('button', { name: 'Previous chapter' });
      await expect(prevChapter).toHaveFocus();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tab is intentionally NOT intercepted in the input: natural tab order moves focus to the quick-nav buttons first, not into the list.',
      },
    },
  },
};

export const ListTypingRoutesToInput: Story = {
  args: { scrRef: defaultScrRef },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and type a multi-result query', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const searchInput = within(getDropdown()).getByRole(INPUT_ROLE);
      // "Jo" matches several books, so no single top match — the book list is shown.
      await userEvent.type(searchInput, 'Jo');
    });

    await step('A letter typed while the list is focused is appended to the input', async () => {
      const dropdownContent = getDropdown();
      await userEvent.keyboard('{ArrowDown}'); // hand focus to the list
      await waitFor(() =>
        expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
      );
      await userEvent.keyboard('h');
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await waitFor(() => expect(searchInput).toHaveFocus());
      await expect(searchInput).toHaveValue('Joh');
    });

    await step(
      'Backspace while the list is focused removes the last char and refocuses the input',
      async () => {
        const dropdownContent = getDropdown();
        await userEvent.keyboard('{ArrowDown}'); // re-enter the list
        await waitFor(() =>
          expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
        );
        await userEvent.keyboard('{Backspace}');
        const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
        await waitFor(() => expect(searchInput).toHaveFocus());
        await expect(searchInput).toHaveValue('Jo');
      },
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'While the list/grid owns focus, typing a letter/digit is routed back into the input (appended), and Backspace removes the last character — both return focus to the input so editing resumes seamlessly.',
      },
    },
  },
};

export const SpaceInListSubmitsHighlighted: Story = {
  args: { scrRef: defaultScrRef },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open and parse a full reference', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      const searchInput = within(getDropdown()).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'John 3:16');
      await within(getDropdown()).findByText('John 3:16');
    });

    await step('Enter the list, then Space submits the highlighted top match', async () => {
      const dropdownContent = getDropdown();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toContain('John'));
      await userEvent.keyboard(' ');
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 16,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the list/grid owns focus, Space submits the currently highlighted item (matching Enter). Here it submits the parsed single-match preview "John 3:16".',
      },
    },
  },
};

export const ListLetterInChapterViewStartsNewSearch: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step('Move focus into the chapter grid', async () => {
      const dropdownContent = getDropdown();
      const backButton = within(dropdownContent).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
      await waitFor(() => expect(backButton).toHaveFocus());
      await userEvent.keyboard('{ArrowDown}'); // hand focus to the grid
      await waitFor(() =>
        expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
      );
    });

    await step('Typing a letter exits chapter view and starts a new book search', async () => {
      const dropdownContent = getDropdown();
      await userEvent.keyboard('j');
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await waitFor(() => expect(searchInput).toHaveFocus());
      await expect(searchInput).toHaveValue('j');
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'A letter typed while the chapter grid is focused exits chapter view and seeds a fresh search query (just that letter), returning focus to the input.',
      },
    },
  },
};

export const ListDigitInChapterViewPrefixesBook: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step('Move focus into the chapter grid', async () => {
      const dropdownContent = getDropdown();
      const backButton = within(dropdownContent).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
      await waitFor(() => expect(backButton).toHaveFocus());
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
      );
    });

    await step(
      'Typing a digit exits chapter view, prefixed with the current book name',
      async () => {
        const dropdownContent = getDropdown();
        await userEvent.keyboard('5');
        const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
        await waitFor(() => expect(searchInput).toHaveFocus());
        await expect(searchInput).toHaveValue('Matthew 5');
      },
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A digit typed while the chapter grid is focused exits chapter view and seeds the query with the current book name plus the digit (e.g. "Matthew 5"), so it reads as a book+chapter reference.',
      },
    },
  },
};

export const BackspaceInChapterViewReturnsToBooks: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step('The back button receives focus on entering chapter view', async () => {
      const backButton = within(getDropdown()).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
      await waitFor(() => expect(backButton).toHaveFocus());
    });

    await step('Backspace (from the back button) returns to the book list', async () => {
      await userEvent.keyboard('{Backspace}');
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await waitFor(() => expect(searchInput).toBeInTheDocument());
      await expect(searchInput).toHaveFocus();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Backspace in chapter view always returns to the book list regardless of which child holds focus (here it fires while the back button is focused) and restores focus to the search input.',
      },
    },
  },
};

export const BackButtonTabSeedsChapterOne: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step('Tab from the back button seeds chapter 1 and focuses the grid', async () => {
      const dropdownContent = getDropdown();
      const backButton = within(dropdownContent).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
      await waitFor(() => expect(backButton).toHaveFocus());
      await userEvent.tab();
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toBe('1'));
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tab from the back button seeds chapter 1 as the highlighted grid cell (rather than relying on whatever cmdk had selected) and moves focus into the grid.',
      },
    },
  },
};

export const BackButtonArrowEntersGrid: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step(
      'ArrowUp from the back button enters the grid at the first chapter of the last row',
      async () => {
        const dropdownContent = getDropdown();
        const backButton = within(dropdownContent).getByRole('button', {
          name: BACK_TO_BOOKS_LABEL,
        });
        await waitFor(() => expect(backButton).toHaveFocus());
        await userEvent.keyboard('{ArrowUp}');
        // Matthew has 28 chapters across 6 columns → ArrowUp entry point = firstChapterInLastRow = 25.
        await waitFor(() => expect(getSelectedItemText(dropdownContent)).toBe('25'));
      },
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An arrow key from the back button hands focus to the grid and selects the entry-point cell for that direction (ArrowUp → first chapter of the last row).',
      },
    },
  },
};

export const BackButtonEnterReturnsToBooks: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step(
      'Enter on the back button returns to books without submitting a chapter',
      async () => {
        const dropdownContent = getDropdown();
        const backButton = within(dropdownContent).getByRole('button', {
          name: BACK_TO_BOOKS_LABEL,
        });
        await waitFor(() => expect(backButton).toHaveFocus());
        await userEvent.keyboard('{Enter}');
        const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
        await waitFor(() => expect(searchInput).toBeInTheDocument());
        await expect(args.handleSubmit).not.toHaveBeenCalled();
      },
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enter/Space on the back button activates the button (back to the book list) and is prevented from bubbling to cmdk, so no chapter is submitted.',
      },
    },
  },
};

export const GridArrowNavigationAndEnterSubmits: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step('Seed the grid with Tab, then navigate with arrows', async () => {
      const dropdownContent = getDropdown();
      const backButton = within(dropdownContent).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
      await waitFor(() => expect(backButton).toHaveFocus());
      await userEvent.tab(); // seeds chapter 1, focuses the grid
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toBe('1'));
      await userEvent.keyboard('{ArrowRight}'); // 1 -> 2
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toBe('2'));
      await userEvent.keyboard('{ArrowDown}'); // 2 -> 8 (one row down, 6 columns)
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toBe('8'));
    });

    await step('Enter submits the highlighted chapter', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'MAT',
        chapterNum: 8,
        verseNum: 1,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          '2D chapter-grid navigation: ArrowRight moves one chapter, ArrowDown moves down one row (by the grid column count), and Enter submits the highlighted chapter.',
      },
    },
  },
};

export const QuickNavArrowEntersList: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('ArrowDown from a quick-nav button hands focus into the list', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.tab(); // focus the first quick-nav button
      const prevChapter = within(dropdownContent).getByRole('button', { name: 'Previous chapter' });
      await expect(prevChapter).toHaveFocus();
      await userEvent.keyboard('{ArrowDown}');
      // ArrowDown seeds the FIRST item of the (full) book list, which is Genesis.
      await waitFor(() => expect(getSelectedItemText(dropdownContent)).toContain('Genesis'));
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'ArrowUp/ArrowDown from a quick-nav button hands focus to the list and seeds the first/last item, mirroring the input arrow behavior.',
      },
    },
  },
};

export const QuickNavTypingRoutesToInput: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Typing a letter on a quick-nav button is routed into the input', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.tab();
      const prevChapter = within(dropdownContent).getByRole('button', { name: 'Previous chapter' });
      await expect(prevChapter).toHaveFocus();
      await userEvent.keyboard('p');
      await waitFor(() => expect(searchInput).toHaveFocus());
      await expect(searchInput).toHaveValue('p');
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Typing a letter/digit while a quick-nav button is focused appends it to the search input and moves focus there, so the user can start searching without first clicking the input.',
      },
    },
  },
};

export const QuickNavClickHidesListThenArrowReopens: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Clicking a quick-nav button hides the list', async () => {
      const dropdownContent = getDropdown();
      const nextVerse = within(dropdownContent).getByRole('button', { name: 'Next verse' });
      await userEvent.click(nextVerse);
      await waitFor(() => expect(within(getDropdown()).queryAllByRole('option')).toHaveLength(0));
    });

    await step('ArrowDown on the quick-nav button re-shows the list and enters it', async () => {
      const dropdownContent = getDropdown();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() =>
        expect(within(dropdownContent).queryAllByRole('option').length).toBeGreaterThan(0),
      );
      await waitFor(() =>
        expect(dropdownContent.querySelector('[data-selected="true"]')).toBeTruthy(),
      );
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clicking a quick-nav button hides the list (so the popover collapses to the header). Pressing an arrow on that button re-shows the list and hands focus into it.',
      },
    },
  },
};

export const EscapeInChapterViewReturnsToBookView: Story = {
  args: { scrRef: MATTHEW_REF },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open and enter Matthew chapter view', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
      await userEvent.click(within(getDropdown()).getByText('Matthew'));
    });

    await step(
      'Escape never closes the popover from chapter view and returns to books',
      async () => {
        const backButton = within(getDropdown()).getByRole('button', { name: BACK_TO_BOOKS_LABEL });
        await waitFor(() => expect(backButton).toHaveFocus());

        // The guarantee under test: from chapter view, Escape returns to the book list and the
        // popover never closes. The exact number of Escape presses is influenced by Radix's
        // tooltip dismissal (the auto-focused back button shows a tooltip that consumes one or more
        // Escapes before the popover's own onEscapeKeyDown handler runs), so we press until we reach
        // the book list — asserting on every press that the popover stayed open.
        let reachedBookView = false;
        for (let i = 0; i < 6 && !reachedBookView; i += 1) {
          // Escapes must be dispatched and settle one at a time: each press changes state (tooltip
          // dismissal, then the view switch) that the next press depends on, so they cannot run
          // concurrently.
          // eslint-disable-next-line no-await-in-loop
          await pressEscapeAndSettle(() => userEvent.keyboard('{Escape}'));
          const dialog = screen.queryByRole('dialog');
          // Must never close from chapter view.
          expect(dialog).toBeTruthy();
          if (dialog && within(dialog).queryAllByRole(INPUT_ROLE).length > 0)
            reachedBookView = true;
        }
        expect(reachedBookView).toBe(true);
        await expect(getDropdown()).toBeVisible();
      },
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'In chapter view, Escape returns to the book list and never closes the popover (so the user cannot accidentally lose their place by pressing Escape while choosing a chapter). The auto-focused back button shows a tooltip that may consume one or more Escapes before the popover handler runs, so the test presses Escape until it reaches the book list, asserting the popover stays open throughout.',
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
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

    await step(
      'Escape in chapter view is consumed by the focused back-button tooltip',
      async () => {
        // On entering chapter view the back button is auto-focused and shows its tooltip. Per the
        // default shadcn/Radix behavior an open tooltip consumes the first Escape, so the popover
        // stays open rather than closing.
        await userEvent.keyboard('{Escape}');
        const dropdownContent = getDropdown();
        await expect(dropdownContent).toBeVisible();
      },
    );

    await step('Back button returns to book view', async () => {
      const dropdownContent = getDropdown();
      const backButton = within(dropdownContent).getByRole('button', { name: 'Back to books' });
      await userEvent.click(backButton);
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await expect(searchInput).toBeInTheDocument();
    });

    await step('Escape in book view closes the component', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.keyboard('{Escape}');
      await expectPopoverToBeClosed();
    });

    await step('Verify trigger returns to original value', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toHaveTextContent('Genesis 1:1');
    });

    await step('Open component for rapid switching test', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for first book (Obadiah)', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'obad');
    });

    await step('Click Obadiah smart parsing result', async () => {
      const dropdownContent = getDropdown();
      const obadiahItem = await within(dropdownContent).findByText('Obadiah 1:1');
      await userEvent.click(obadiahItem);
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
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Search for second book with specific reference', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Rev 22:21');
    });

    await step('Click Revelation smart parsing result', async () => {
      const dropdownContent = getDropdown();
      const revMatch = await within(dropdownContent).findByText('Revelation 22:21');
      await userEvent.click(revMatch);
    });

    await step('Verify second book submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'REV',
        chapterNum: 22,
        verseNum: 21,
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
    <div className="tw:p-4">
      <BookChapterControl
        {...rest}
        scrRef={scrRef}
        handleSubmit={handleScrRef}
        recentSearches={recentSearches}
        onAddRecentSearch={handleAddRecentSearch}
      />
      <div className="tw:mt-4 tw:text-sm tw:text-gray-600">
        Current Reference: {JSON.stringify(scrRef, undefined, 2)}
      </div>
      <div className="tw:mt-2 tw:text-sm tw:text-gray-500">
        Recent Searches:{' '}
        {recentSearches.map((ref) => `${ref.book} ${ref.chapterNum}:${ref.verseNum}`).join(', ')}
      </div>
    </div>
  );
}

export const WithDisabledReferences: Story = {
  args: {
    scrRef: {
      book: 'REV',
      chapterNum: 22,
      verseNum: 21,
    },
    getEndVerse: sampleGetEndVerse,
    disableReferencesUpTo: {
      book: 'MAT',
      chapterNum: 5,
      verseNum: 10,
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Disabled References** - When \`disableReferencesUpTo\` is provided, any reference that comes
strictly before the given one is shown as disabled: books before MAT, chapters before MAT 5,
and verses before MAT 5:10. Useful for range pickers where the "end" selector should not allow
picking a reference before the "start".
        `,
      },
    },
  },
};

export const WithVerseSelection: Story = {
  args: {
    scrRef: {
      book: 'JHN',
      chapterNum: 3,
      verseNum: 16,
    },
    getEndVerse: sampleGetEndVerse,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Verse Selection** - When the \`getEndVerse\` prop is provided, the control enables verse
selection. After clicking a chapter in the chapter grid, the control transitions to a verse
selection sub-screen instead of submitting immediately. Additionally, typing a reference with a
chapter-verse separator (e.g. "John 3:" or "John 3:16") shows a verse grid below the top match.
        `,
      },
    },
  },
};

export const VerseSelectionByTyping: Story = {
  args: {
    scrRef: defaultScrRef,
    getEndVerse: sampleGetEndVerse,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open control and type reference with colon', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();

      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'John 3:');
    });

    await step('Click verse 16 from the verse grid', async () => {
      const dropdownContent = getDropdown();
      const verse16 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '16',
      });
      await userEvent.click(verse16);
    });

    await step('Verify submission with selected verse', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'JHN',
        chapterNum: 3,
        verseNum: 16,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Typing a reference with the chapter-verse separator present (e.g. "John 3:") shows the verse grid so the user can pick a verse.',
      },
    },
  },
};

export const VerseSelectionFromChapterGrid: Story = {
  args: {
    scrRef: defaultScrRef,
    getEndVerse: sampleGetEndVerse,
  },
  play: async ({ canvas, userEvent, step, args }) => {
    await step('Open control and click Matthew', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();

      const dropdownContent = getDropdown();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await userEvent.click(matthewItem);
    });

    await step('Click chapter 5 from chapter grid', async () => {
      const dropdownContent = getDropdown();
      const chapter5 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '5',
      });
      await userEvent.click(chapter5);
    });

    await step('Verify verse grid appears (did not submit yet)', async () => {
      await expect(args.handleSubmit).not.toHaveBeenCalled();
      const dropdownContent = getDropdown();
      const verse3 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '3',
      });
      await expect(verse3).toBeInTheDocument();
    });

    await step('Click verse 3 to submit', async () => {
      const dropdownContent = getDropdown();
      const verse3 = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, { name: '3' });
      await userEvent.click(verse3);
    });

    await step('Verify submission', async () => {
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'MAT',
        chapterNum: 5,
        verseNum: 3,
      });
      await expectPopoverToBeClosed();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'After selecting a chapter from the chapter grid, the control shows a verse grid instead of submitting immediately. The user then picks the verse to finalize the reference.',
      },
    },
  },
};

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

const RECENT_SEARCHES_BUTTON_LABEL = 'Show recent searches';

export const RecentSearchesClockKeyboard: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  render: (args) => <BookChapterControlWithRecentSearches {...args} />,
  play: async ({ canvas, userEvent, step }) => {
    await step('Open the component', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);
      await expectPopoverToBeOpenAndVisible();
    });

    await step('Typing a letter on the clock button is routed into the input', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.tab(); // Tab from the input lands on the clock (recent searches) button
      const clockButton = within(dropdownContent).getByRole('button', {
        name: RECENT_SEARCHES_BUTTON_LABEL,
      });
      await expect(clockButton).toHaveFocus();
      await userEvent.keyboard('m');
      await waitFor(() => expect(searchInput).toHaveFocus());
      await expect(searchInput).toHaveValue('m');
    });

    await step('ArrowDown on the clock button opens the recent-searches menu', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.click(searchInput);
      await userEvent.tab();
      const clockButton = within(dropdownContent).getByRole('button', {
        name: RECENT_SEARCHES_BUTTON_LABEL,
      });
      await expect(clockButton).toHaveFocus();
      // The arrow is NOT hijacked to enter the list (that is input-only); it falls through to the
      // Radix DropdownMenu trigger, which opens the recent-searches menu.
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(screen.queryByRole('menu')).toBeInTheDocument());
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard handling on the recent-searches (clock) button: typing a letter/digit routes it into the search input, while an arrow key falls through to the Radix DropdownMenu and opens the recent-searches menu (it does not enter the list).',
      },
    },
  },
};
