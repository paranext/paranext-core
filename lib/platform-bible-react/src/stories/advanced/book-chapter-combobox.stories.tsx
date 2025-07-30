import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within, screen, waitFor } from '@storybook/test';
import { Canvas } from 'storybook/internal/csf';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import { BookChapterCombobox } from '@/components/advanced/book-chapter-control/book-chapter-combobox.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';
import { Button } from '@/components/shadcn-ui/button';
import { get } from 'http';

const previousElementText = 'previous Element';
const nextElementText = 'next Element';

type BookChapterComboboxWrapperProps = {
  scrRef: SerializedVerseRef;
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  className?: string;
  getActiveBookIds?: () => string[];
};

// Wrapper component to handle state
function BookChapterComboboxWrapper({
  scrRef: initialScrRef,
  handleSubmit,
  ...rest
}: BookChapterComboboxWrapperProps) {
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
        <Button>{previousElementText}</Button>

        <BookChapterCombobox {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
        <Button>{nextElementText}</Button>
        <div className="tw-mt-4 tw-text-sm tw-text-gray-600">
          Current Reference: {JSON.stringify(scrRef, undefined, 2)}
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof BookChapterCombobox> = {
  title: 'Advanced/BookChapterCombobox',
  component: BookChapterCombobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
BookChapterCombobox is an alternative implementation of BookChapterControl using Popover+Command instead of DropdownMenu.

**Smart Parsing Features:**
- Type complete references: "John 3:16", "1 Cor 13:4", "Psalms 23"
- Recognizes book names: "John", "First Corinthians", "Psalms"
- Recognizes book IDs: "JHN", "1CO", "PSA"
- Shows "top match" suggestions for parsed references
- Press Enter on top match for immediate navigation

**Chapter Selection Features:**
- Click a book to see its chapters (if it has multiple chapters)
- Integrated ChapterSelect component with grid layout
- Back navigation with arrow button
- Books with 1 chapter (like Obadiah) navigate immediately

**Current Status:** Smart parsing + chapter selection
**TODO:** Advanced keyboard navigation, topMatchChapters filtering

Try typing: "John 3:16", "Romans 8", or click "Romans" to see chapter selection!
        `,
      },
    },
  },
  args: {
    scrRef: defaultScrRef,
    handleSubmit: (scrRef) => console.log('Scripture reference changed:', scrRef),
  },
  render: (args) => <BookChapterComboboxWrapper {...args} />,
} satisfies Meta<typeof BookChapterCombobox>;

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
      book: 'ROM',
      chapterNum: 3,
      verseNum: 16,
    },
  },
};

export const WithOldTestamentBook: Story = {
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 23,
      verseNum: 1,
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

export const WithCustomClassName: Story = {
  args: {
    scrRef: defaultScrRef,
    className: 'tw-w-64 tw-bg-blue-50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom styling applied.',
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
  parameters: {
    docs: {
      description: {
        story: `
**Chapter Selection Demo** - Starting with Romans 8:1 selected.

1. Click to open the component
2. Search for books like "Psalms", "John", or "Romans"
3. Click a book with multiple chapters to see the chapter grid
4. Use the back arrow to return to book selection
5. Try books with single chapters like "Obadiah" or "Philemon" - they navigate immediately!

The chapter grid shows the current chapter highlighted and allows easy selection.
        `,
      },
    },
  },
};

export const SmartParsingDemo: Story = {
  args: {
    scrRef: defaultScrRef,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Smart Parsing Demo** - Click to open and try typing these examples:

- \`John 3:16\` - Complete reference with book, chapter, and verse
- \`Romans 8\` - Book with chapter only
- \`Psalms 23:1\` - Using full book name
- \`1CO 13:4\` - Using book ID instead of name
- \`2 Tim 3\` - Book with number prefix

The component will show a "top match" suggestion that you can select immediately!
        `,
      },
    },
  },
};

/* Interaction test helpers */

const defaultArgs = {
  scrRef: {
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
  },
  handleSubmit: fn(),
  className: 'tw-w-64 tw-bg-blue-50',
};

const matthewArgs = {
  scrRef: {
    book: 'MAT',
    chapterNum: 1,
    verseNum: 1,
  },
  handleSubmit: fn(),
  className: 'tw-w-64 tw-bg-blue-50',
};

const psalmsArgs = {
  scrRef: {
    book: 'PSA',
    chapterNum: 22,
    verseNum: 1,
  },
  handleSubmit: fn(),
  className: 'tw-w-64 tw-bg-blue-50',
};

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function expectDropdownToBeOpenAndVisible() {
  // Wait for the dropdown to appear and verify it's open
  const dropdownContent = getDropdown();
  await waitFor(() => expect(dropdownContent).toHaveStyle('opacity: 1'));
  await expect(dropdownContent).toBeVisible();
  return dropdownContent;
}

async function expectDropdownToBeClosed() {
  // Wait for the dropdown to appear and verify it's open
  const dropdownContent = screen.queryByRole('menu');
  if (dropdownContent) {
    await waitFor(() => expect(dropdownContent).toHaveAttribute('data-state', 'closed'));
  } else {
    expect(dropdownContent).not.toBeInTheDocument();
  }
}

async function expectClosedDropdownStateWithCleanInput(input: HTMLElement) {
  // Verify the dropdown is closed and no menu items are visible
  await expect(input).toHaveFocus();
  await expect(input).toHaveClass('focus-visible:tw-ring-ring'); // Standard focus ring class
  await expectNoIconToExist(input);
  await expectDropdownToBeClosed();
}

async function expectCheckmarkIconToExist(input: HTMLElement) {
  // Check if a green checkmark icon appears next to the input
  const checkmarkIcon = input.nextSibling;
  expect(checkmarkIcon).toHaveClass('lucide');
  expect(checkmarkIcon).toHaveClass('lucide-check');
  expect(checkmarkIcon).toHaveAttribute('aria-label', 'Green checkmark indicating a match found');
}

async function expectNoMatchesIconToExist(input: HTMLElement) {
  // Check if a green checkmark icon appears next to the input
  const checkmarkIcon = input.nextSibling;
  expect(checkmarkIcon).toHaveClass('lucide');
  expect(checkmarkIcon).toHaveClass('lucide-circle-slash');
  expect(checkmarkIcon).toHaveAttribute(
    'aria-label',
    'Red circle slash indicating no matches found',
  );
}

async function expectNoIconToExist(input: HTMLElement) {
  const checkmarkIcon = input.nextSibling;
  expect(checkmarkIcon).toBeNull();
}

async function expectResultsVisibleAndToBe(results: string[]) {
  // Verify that expected menu items appears in the filtered dropdown results
  const dropdownContent = screen.getByRole('dialog');
  await expect(dropdownContent).toBeVisible();
  const bookSections = await within(dropdownContent).findAllByRole('option');
  expect(bookSections.length).toEqual(results.length); // Should match number of results
  results.forEach((result, index) => {
    expect(bookSections[index]).toHaveTextContent(result); // should contain the expected menu item
  });
}

function getDropdown() {
  return screen.getByRole('dialog');
}

async function getBookMenuItem(dropdownContent: HTMLElement, bookName: string) {
  // parentElement of the menu item for the book should always be an HTMLElement
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return within(dropdownContent).getByText(bookName).parentElement as HTMLElement;
}

async function getChapters(bookWithExpandedChapters: HTMLElement) {
  return within(bookWithExpandedChapters).queryAllByRole('button');
}

async function getChapter(bookWithExpandedChapters: HTMLElement, chapterNumber: number) {
  return within(bookWithExpandedChapters).getByRole('button', {
    name: chapterNumber.toString(),
  });
}

// type is hard to import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function reset(canvas: Canvas, userEvent: any) {
  // clear input
  const input = canvas.getByRole('textbox');
  await userEvent.clear(input);
}

/* Interaction tests */

export const TestClickToOpen: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const bcvBtn = canvas.getByRole('combobox');

    // Verify input is present and visible
    await expect(bcvBtn).toBeInTheDocument();
    await expect(bcvBtn).toBeVisible();

    // Click the input to open the dropdown
    await userEvent.click(bcvBtn);

    await expectDropdownToBeOpenAndVisible();
  },
};

export const TestClickOutsideToCancel: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');

    // Click the input to open the dropdown
    await userEvent.click(bcvBtn);
    const dropdownContent = await expectDropdownToBeOpenAndVisible();

    const input = within(dropdownContent).getByTestId('book-search');
    userEvent.type(input, 'Ge');

    // Click outside the input to cancel & close the dropdown
    const outsideElement = canvas.getByText(previousElementText);
    await userEvent.click(outsideElement);

    await expectDropdownToBeClosed();
    await expect(bcvBtn).toHaveTextContent('Genesis 1:1'); // Input should stay at original value
  },
};

export const TestCancel: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);
    const input = screen.getByTestId('book-search');

    await userEvent.type(input, 'aaa');

    // Press Escape to close
    await userEvent.keyboard('{Escape}');

    await expect(bcvBtn).toHaveTextContent('Genesis 1:1'); // Input should have reset to original value
    await expectDropdownToBeClosed();
  },
};

export const TestKeyboardFocus: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const previousElement = canvas.getByText(previousElementText);

    previousElement.focus();
    await expect(previousElement).toHaveFocus();

    userEvent.type(previousElement, '{Tab}'); // Move focus to the input
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await waitFor(() => expect(bcvBtn).toHaveFocus());

    await expectDropdownToBeClosed();

    await wait(300);
    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();

    // Move focus to the next Element and verify it has focus
    await userEvent.tab();
    const nextElement = canvas.getByText(nextElementText);
    expect(nextElement).toHaveFocus();

    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();
  },
};

export const TestReverseOrderKeyboardFocus: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const nextElement = canvas.getByText(nextElementText);

    nextElement.focus();
    await expect(nextElement).toHaveFocus();

    userEvent.type(nextElement, '{Shift>}{Tab}{/Shift}'); // Move focus to the input
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await waitFor(() => expect(bcvBtn).toHaveFocus());

    await expectDropdownToBeClosed();

    await wait(300);
    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();

    // Move focus to the next Element and verify it has focus
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    const previousElement = canvas.getByText(previousElementText);
    expect(previousElement).toHaveFocus();

    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();
  },
};

export const TestSearchFilterUniqueResult: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);
    const input = screen.getByTestId('book-search');

    // Type to search for books
    await userEvent.type(input, 'mat');

    // TODO: comment in if available
    // await expectCheckmarkIconToExist(input);

    // Verify that only Matthew appears in the filtered results
    await expectResultsVisibleAndToBe(['MAT 1:1']);

    await userEvent.keyboard('{Enter}'); // Press Enter to submit

    // Verify the handleSubmit was called
    await expect(args.handleSubmit).toHaveBeenCalled();

    await expectDropdownToBeClosed();
  },
};

export const TestSearchFilterMultiResult: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);
    const input = screen.getByTestId('book-search');

    // Type to search for books
    await userEvent.type(input, 'john');

    await expectNoIconToExist(input);

    // Verify that only multiple results appear
    await expectResultsVisibleAndToBe(['John', '1 John', '2 John', '3 John']);
  },
};

export const TestScriptureReferenceInput: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);
    const input = screen.getByTestId('book-search');

    // Type a scripture reference
    await userEvent.type(input, 'John 3:16');

    // TODO: comment in if available
    // await expectCheckmarkIconToExist(input);
    await expectResultsVisibleAndToBe(['JHN 3:16', 'John']);

    // Press Enter to submit
    await userEvent.keyboard('{Enter}');

    // Verify the handleSubmit was called
    await expect(args.handleSubmit).toHaveBeenCalled();

    await expect(input).toHaveValue('John 3:16');
    await expectClosedDropdownStateWithCleanInput(input);
  },
};

// TODO: initial state expectation is unclear: show chapters of the current book or not?
export const TestInitialStateWithGenesis: Story = {
  args: defaultArgs,
  play: async () => {
    expect(true).toBe(false);
    /*
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);
    await expect(input).toHaveClass('focus-visible:tw-ring-ring'); // Standard focus ring class

    const dropdownContent = await expectDropdownToBeOpenAndVisible();

    // Verify we can see the OT headline in the dropdown
    const oldTestamentLabel = within(dropdownContent).getByText('Old Testament');
    await expect(oldTestamentLabel).toBeVisible();

    // Verify the dropdown contains book sections
    const bookSections = await within(dropdownContent).findAllByRole('menuitem');
    expect(bookSections.length).toBeGreaterThan(0);

    expect(bookSections[0]).toHaveTextContent('Genesis');
    expect(bookSections[0]).toBeVisible();
    // Verify that Chapters for Genesis are visible
    const chapters = within(bookSections[0]).getAllByRole('button');
    expect(chapters.length).toEqual(50); // Genesis has 50 chapters
    */
  },
};

// TODO: initial state expectation is unclear: show chapters of the current book or not?
export const TestInitialStateWithMatthew: Story = {
  args: matthewArgs,
  play: async () => {
    expect(true).toBe(false);
    /*
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    const dropdownContent = await expectDropdownToBeOpenAndVisible();

    // Verify we can see the OT headline in the dropdown
    const oldTestamentLabel = within(dropdownContent).getByText('New Testament');
    await expect(oldTestamentLabel).toBeVisible();

    // Verify the dropdown contains book sections
    const bookSections = await within(dropdownContent).findAllByRole('menuitem');
    expect(bookSections.length).toBeGreaterThan(0);

    expect(bookSections[0]).toHaveTextContent('Genesis');
    // TODO: it looks like elements scrolled out of view are still considered visible
    // expect(bookSections[0]).not.toBeVisible();
    const chaptersVisibleForGenesis = await getChapters(bookSections[0]);
    expect(chaptersVisibleForGenesis.length).toEqual(0); // no chapters visible for Genesis

    const matthew = await getBookMenuItem(dropdownContent, 'Matthew');
    expect(matthew).toBeVisible();
    const chapters = await getChapters(matthew);
    expect(chapters.length).toEqual(28);
    expect(chapters[0]).toBeVisible();
    */
  },
};

export const TestKeyboardChapterNavigation: Story = {
  args: matthewArgs,
  play: async ({ canvas, userEvent, step }) => {
    await step('Initial dropdown navigation', async () => {
      const bcvBtn = canvas.getByTestId('bcv-btn');
      await userEvent.click(bcvBtn);
      const input = screen.getByTestId('book-search');

      const dropdownContent = getDropdown();
      const matthew = await getBookMenuItem(dropdownContent, 'Matthew');

      // Initial down arrow should focus Matthew (expanded book)
      await userEvent.keyboard('{ArrowDown}');
      expect(matthew).toHaveFocus();
      expect(await getChapter(matthew, 1)).toHaveAttribute('aria-current', 'true');

      // Arrow up should return to input
      await userEvent.keyboard('{ArrowUp}');
      expect(input).toHaveFocus();
      await expectDropdownToBeOpenAndVisible();
    });

    await step('Chapter navigation within expanded book', async () => {
      const dropdownContent = getDropdown();
      const matthew = await getBookMenuItem(dropdownContent, 'Matthew');

      // Navigate to chapter area
      await userEvent.keyboard('{ArrowDown}');
      expect(matthew).toHaveFocus();

      // Test left/right navigation
      await userEvent.keyboard('{ArrowRight}');
      expect(await getChapter(matthew, 2)).toHaveAttribute('aria-current', 'true');

      await userEvent.keyboard('{ArrowLeft}');
      expect(await getChapter(matthew, 1)).toHaveAttribute('aria-current', 'true');

      // Test up/down navigation (chapters are in rows of 6)
      await userEvent.keyboard('{ArrowDown}');
      expect(await getChapter(matthew, 7)).toHaveAttribute('aria-current', 'true');

      await userEvent.keyboard('{ArrowUp}');
      expect(await getChapter(matthew, 1)).toHaveAttribute('aria-current', 'true');
    });

    await step('Single match navigation', async () => {
      const bcvBtn = canvas.getByTestId('bcv-btn');
      await userEvent.click(bcvBtn);
      const input = screen.getByTestId('book-search');

      // Type to get single match
      await userEvent.keyboard('mat');
      await expectCheckmarkIconToExist(input);
      await expectResultsVisibleAndToBe(['MAT 1:1']);

      // Down arrow should focus preview
      await userEvent.keyboard('{ArrowDown}');
      const preview = screen.getByText('MAT 1:1');
      expect(preview).toHaveFocus();

      // Down arrow should focus Matthew
      await userEvent.keyboard('{ArrowDown}');
      const matthew = await getBookMenuItem(getDropdown(), 'Matthew');
      expect(matthew).toHaveFocus();

      // Up arrow should return to preview
      await userEvent.keyboard('{ArrowUp}');
      expect(preview).toHaveFocus();

      // Up arrow should return to input
      await userEvent.keyboard('{ArrowUp}');
      expect(input).toHaveFocus();
    });

    await step('Multiple matches navigation', async () => {
      // Type to get multiple matches
      await userEvent.keyboard('john');
      await expectResultsVisibleAndToBe(['John', '1 John', '2 John', '3 John']);

      // Navigate through matches
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByText('John')).toHaveFocus();

      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByText('1 John')).toHaveFocus();

      // Test navigation to end of list
      await userEvent.keyboard('{ArrowDown>3}{/ArrowDown}');
      expect(screen.getByText('3 John')).toHaveFocus(); // Should stay on last item
    });

    /* TODO: not relevant for current implementation
    await step('Test closing expanded chapters', async () => {
      const input = canvas.getByRole('textbox');
      await userEvent.keyboard('{Control>}a{/Control}');
      await userEvent.click(input);

      const dropdownContent = getDropdown();
      const matthew = await getBookMenuItem(dropdownContent, 'Matthew');

      // Click Matthew to expand chapters
      await userEvent.click(matthew);
      expect(await getChapters(matthew)).toHaveLength(28);

      // Click again to collapse
      await userEvent.click(matthew);
      expect(await getChapters(matthew)).toHaveLength(0);

      // Navigate should still work
      await userEvent.keyboard('{ArrowDown}');
      expect(matthew).toHaveFocus();

      // Expanding with Enter key
      await userEvent.keyboard('{Enter}');
      expect(await getChapters(matthew)).toHaveLength(28);
    });
    */
  },
};

export const TestNoMatch: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);
    const input = screen.getByTestId('book-search');

    // Type a non-matching reference
    await userEvent.type(input, 'aaa');

    // TODO: test not yet working
    const placeholder = await within(getDropdown()).findByRole('presentation');
    expect(placeholder).toContain('No books found');
  },
};

export const TestBookAndChapterSelectionByClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    const bcvBtn = canvas.getByTestId('bcv-btn');
    await userEvent.click(bcvBtn);

    const dropdownContent = await expectDropdownToBeOpenAndVisible();

    // Find and click on a specific book (Matthew)
    const psalmsBook = within(dropdownContent).getByText('Psalms');
    await expect(psalmsBook).toBeInTheDocument();

    await userEvent.click(psalmsBook);

    const chapter23Button = within(dropdownContent).getByRole('button', { name: '23' });
    await expect(chapter23Button).toBeInTheDocument();

    // Click on chapter 23
    await userEvent.click(chapter23Button);

    // Verify the handleSubmit was called
    await expect(args.handleSubmit).toHaveBeenCalled();

    // Verify the input now shows Psalm 23
    expect(bcvBtn).toHaveTextContent('Psalms 23:1');
  },
};

// TODO: unreviewd down here - may need adjustment for bcv combobox implementation

export const TestCursorPositioning: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    await userEvent.click(input);
    expect(input).toHaveFocus();

    // Use pointer events to simulate clicks at specific positions
    // First, store the initial text and get its measurements
    const text = input.value;
    const textWidth = input.offsetWidth;
    const charWidth = textWidth / text.length;

    // Click near the start (25% of the way in)
    const startClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: input.getBoundingClientRect().left + charWidth * 2,
    });
    input.dispatchEvent(startClick);
    expect(input.selectionStart).toBeLessThan(text.length / 2);

    // Click near the middle
    const middleClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: input.getBoundingClientRect().left + textWidth / 2,
    });
    input.dispatchEvent(middleClick);
    expect(input.selectionStart).toBeGreaterThan(2);
    expect(input.selectionStart).toBeLessThan(text.length - 2);

    // Click near the end
    const endClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: input.getBoundingClientRect().right - charWidth * 2,
    });
    input.dispatchEvent(endClick);
    expect(input.selectionStart).toBeGreaterThan(text.length / 2);

    // Verify the cursor can be moved with arrow keys from any position
    await userEvent.keyboard('{ArrowLeft}');
    const originalPos = input.selectionStart;
    await userEvent.keyboard('{ArrowRight}');
    expect(input.selectionStart).toBe((originalPos || 0) + 1);
  },
};

export const TestAdvancedTextSelection: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    await userEvent.click(input);

    // Test SHIFT+click selection
    // First click to position cursor
    const startClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: input.getBoundingClientRect().left + 10,
    });
    input.dispatchEvent(startClick);

    // Then SHIFT+click to select
    const endClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: input.getBoundingClientRect().right - 10,
      shiftKey: true,
    });
    input.dispatchEvent(endClick);

    expect(input.selectionStart ?? 0).toBeLessThan(input.selectionEnd ?? 0);
    expect(input.selectionEnd ?? 0).toBeGreaterThan(input.selectionStart ?? 0);

    // Test typing replaces selection
    await userEvent.keyboard('john');
    expect(input.value.toLowerCase()).toBe('john');
    expect(input.selectionStart).toBe(4);
    expect(input.selectionEnd).toBe(4);

    // Test selection is preserved when dropdown opens/closes
    await userEvent.keyboard('{Control>}a{/Control}');
    await expectDropdownToBeOpenAndVisible();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);

    await userEvent.keyboard('{Escape}');
    await expectDropdownToBeClosed();
    // Selection should be maintained after closing
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  },
};

export const TestNoKeystrokeLoss: Story = {
  args: defaultArgs,
  async beforeEach({ canvas, userEvent }) {
    reset(canvas, userEvent);
    console.warn('');
  },
  play: async ({ canvas, userEvent, step }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    await step('Test typing when dropdown is closed', async () => {
      // Click to focus without opening dropdown
      await userEvent.tab();
      await userEvent.tab();
      expect(input).toHaveFocus();
      await expectDropdownToBeClosed();

      // Type quickly a matching book name
      const text = 'mat';
      await userEvent.keyboard(text);
      expect(input.value.toLowerCase()).toContain(text);
      await expectDropdownToBeOpenAndVisible();
    });

    await step('Test typing non-matching text', async () => {
      reset(canvas, userEvent);

      await userEvent.keyboard('xyz');
      expect(input.value).toBe('xyz');
      await expectDropdownToBeClosed();
      await expectNoMatchesIconToExist(input);
    });

    await step('Test backspace usage', async () => {
      reset(canvas, userEvent);

      await userEvent.keyboard('genesis');
      expect(input.value.toLowerCase()).toBe('genesis');
      await expectCheckmarkIconToExist(input);

      // Delete three characters
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}');
      expect(input.value.toLowerCase()).toBe('gene');
      await expectDropdownToBeOpenAndVisible();
    });

    await step('Test backspace with known problem', async () => {
      reset(canvas, userEvent);

      await userEvent.keyboard('aa');
      await userEvent.keyboard('{Backspace}{Backspace}');
      expect(input.value.toLowerCase()).toBe('');
    });

    await step('Test typing with dropdown already open', async () => {
      reset(canvas, userEvent);

      await userEvent.click(input);
      await expectDropdownToBeOpenAndVisible();
      await userEvent.keyboard('john');
      expect(input.value.toLowerCase()).toBe('john');
      await expectNoIconToExist(input);
      await expectResultsVisibleAndToBe(['John', '1 John', '2 John', '3 John']);
    });

    await step('Test opening dropdown by typing', async () => {
      // Close dropdown first
      await userEvent.keyboard('{Escape}');
      await expectDropdownToBeClosed();

      // Type single character to open dropdown
      await userEvent.keyboard('m');
      await expectDropdownToBeOpenAndVisible();
      expect(input.value.toLowerCase()).toBe('m');

      // Continue typing to filter
      await userEvent.keyboard('at');
      expect(input.value.toLowerCase()).toBe('mat');
      await expectCheckmarkIconToExist(input);

      await userEvent.keyboard('{Backspace}');
      expect(input.value.toLowerCase()).toBe('ma');

      await userEvent.keyboard('{Backspace}');
      expect(input.value.toLowerCase()).toBe('m');

      await userEvent.keyboard('{Backspace}');
      expect(input.value.toLowerCase()).toBe('');
    });
  },
};

export const TestRegularInputBehavior: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);

    // Test arrow key navigation
    await userEvent.keyboard('{ArrowLeft}');
    expect(input.selectionStart).toBe(input.value.length - 1);

    await userEvent.keyboard('{ArrowRight}');
    expect(input.selectionStart).toBe(input.value.length);

    // Test Home/End
    await userEvent.keyboard('{Home}');
    expect(input.selectionStart).toBe(0);

    await userEvent.keyboard('{End}');
    expect(input.selectionStart).toBe(input.value.length);

    // Test text selection with shift + arrow
    await userEvent.keyboard('{Home}');
    await userEvent.keyboard('{Shift>}{ArrowRight}{ArrowRight}{/Shift}');
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(2);

    // Test Ctrl+A
    await userEvent.keyboard('{Control>}a{/Control}');
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  },
};

export const TestCopyPaste: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);

    // Select all text
    await userEvent.keyboard('{Control>}a{/Control}');

    // Copy and paste (implementation note: this test is limited since clipboard
    // operations aren't fully supported in the test environment)
    await userEvent.keyboard('{Control>}c{/Control}');

    // Move cursor to start and paste
    await userEvent.keyboard('{Home}');
    await userEvent.keyboard('{Control>}v{/Control}');

    // Verify the input still contains valid content
    expect(input.value).toMatch(/^[A-Z1-3]{3}\s\d+:\d+$/);
  },
};

export const TestTextSelection: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    // Test double click (selects word)
    await userEvent.dblClick(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.indexOf(' '));

    // Test triple click (selects all)
    await userEvent.tripleClick(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  },
};

export const TestNoGroupHeadingNavigation: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);

    const dropdownContent = await expectDropdownToBeOpenAndVisible();

    // Verify group headings are not interactive
    const groupHeadings = within(dropdownContent).getAllByText(/(Old|New) Testament/);
    groupHeadings.forEach((heading) => {
      expect(heading.closest('button, [role="menuitem"]')).toBeNull();
      expect(heading).not.toHaveAttribute('tabindex');
    });
  },
};

export const TestChapterNumberDimming: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.keyboard('genesis 2');

    // Get expanded Genesis chapters
    const dropdownContent = await expectDropdownToBeOpenAndVisible();
    const genesis = await getBookMenuItem(dropdownContent, 'Genesis');
    const chapters = await getChapters(genesis);

    // Chapter 2 and 20-29 should not be dimmed
    const matchingChapters = [2, ...Array.from({ length: 10 }, (_, i) => i + 20)];
    chapters.forEach((chapter) => {
      const num = parseInt(chapter.textContent || '0', 10);
      if (matchingChapters.includes(num)) {
        expect(chapter).not.toHaveClass('tw-text-muted-foreground');
      } else {
        expect(chapter).toHaveClass('tw-text-muted-foreground');
      }
    });
  },
};

export const TestProjectTabBookFiltering: Story = {
  args: {
    scrRef: defaultArgs.scrRef,
    handleSubmit: defaultArgs.handleSubmit,
    // Only include a few books to simulate project filtering
    getActiveBookIds: () => ['GEN', 'EXO', 'MAT'],
  },
  play: async ({ canvas, userEvent, step }) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    await step('Test partially typing non-existing book', async () => {
      await reset(canvas, userEvent);

      await userEvent.type(input, 'jo');
      await expectDropdownToBeClosed();
      await expectNoMatchesIconToExist(input);
    });

    await step('Test fully typing non-existing book', async () => {
      await reset(canvas, userEvent);

      await userEvent.type(input, '1 john');

      // Should show a green checkmark, once fully typed-in
      await expectDropdownToBeClosed();
      await expectCheckmarkIconToExist(input);
    });

    await step('Test typing existing book', async () => {
      await reset(canvas, userEvent);

      await userEvent.type(input, 'mat');
      await expectCheckmarkIconToExist(input);
      await expectResultsVisibleAndToBe(['MAT 1:1', 'Matthew']);
    });

    await step('Test initial state shows only project books', async () => {
      await reset(canvas, userEvent);

      await userEvent.click(input);
      const dropdownContent = await expectDropdownToBeOpenAndVisible();
      const bookSections = await within(dropdownContent).findAllByRole('menuitem');

      // Should only show Genesis, Exodus, and Matthew
      expect(bookSections).toHaveLength(3);
      expect(bookSections[0]).toHaveTextContent('Genesis');
      expect(bookSections[1]).toHaveTextContent('Exodus');
      expect(bookSections[2]).toHaveTextContent('Matthew');
    });
  },
};
