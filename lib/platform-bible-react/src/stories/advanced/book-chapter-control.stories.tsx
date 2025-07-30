import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within, screen, waitFor } from '@storybook/test';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';
import { ComponentProps, useCallback, useState } from 'react';
import { defaultScrRef } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button } from '@/components/shadcn-ui/button';
import { get } from 'http';

const previousElementText = 'previous Element';
const nextElementText = 'next Element';

type BookChapterControlWrapperProps = Omit<
  ComponentProps<typeof BookChapterControl>,
  'scrRef' | 'handleSubmit'
> & {
  scrRef: SerializedVerseRef;
  handleSubmit: (scrRef: SerializedVerseRef) => void;
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
        <Button>{previousElementText}</Button>
        <BookChapterControl {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
        <Button>{nextElementText}</Button>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof BookChapterControl> = {
  title: 'Advanced/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
  args: {
    scrRef: defaultScrRef,
    handleSubmit: (scrRef) => console.log('Scripture reference changed:', scrRef),
  },
  // Use the wrapper component to render stories
  render: (args) => <BookChapterControlWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof BookChapterControl>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default BookChapterControl component. Click on the input to open the dropdown menu and select books and chapters. You can also type to search for books or enter scripture references directly.',
      },
    },
  },
};

export const Genesis: Story = {
  args: {
    scrRef: {
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl starting with Genesis 1:1. Shows how the component displays different books.',
      },
    },
  },
};

export const NewTestament: Story = {
  args: {
    scrRef: {
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl starting with Matthew 5:3 (New Testament). Demonstrates navigation within the New Testament books.',
      },
    },
  },
};

export const Psalms: Story = {
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 23,
      verseNum: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl starting with Psalm 23:1. Shows how the component handles books with many chapters.',
      },
    },
  },
};

export const WithCustomBookList: Story = {
  args: {
    scrRef: {
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
    },
    getActiveBookIds: () => ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl with a custom list of active books. Only the specified books (Genesis through Deuteronomy and the four Gospels) will be available in the dropdown.',
      },
    },
  },
};

export const Revelation: Story = {
  args: {
    scrRef: {
      book: 'REV',
      chapterNum: 22,
      verseNum: 21,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'BookChapterControl starting with Revelation 22:21 (the last verse in the Bible). Demonstrates the component at the end of the scripture.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    scrRef: {
      book: 'ROM',
      chapterNum: 8,
      verseNum: 28,
    },
    getActiveBookIds: undefined, // Use all books
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive BookChapterControl playground starting with Romans 8:28. Try different interactions:\n' +
          '- Click the input to open the dropdown\n' +
          '- Type book names or abbreviations to filter (e.g., "gen", "genesis", "matt")\n' +
          '- Type scripture references directly (e.g., "John 3:16", "Psalm 23", "1 Cor 13:4")\n' +
          '- Use keyboard navigation (Arrow keys, Enter, Tab, Escape)\n' +
          '- Select books and chapters from the dropdown menu\n' +
          'Changes will be logged to the console and the component state will update.',
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
};

const matthewArgs = {
  scrRef: {
    book: 'MAT',
    chapterNum: 1,
    verseNum: 1,
  },
  handleSubmit: fn(),
};

const psalmsArgs = {
  scrRef: {
    book: 'PSA',
    chapterNum: 22,
    verseNum: 1,
  },
  handleSubmit: fn(),
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
  const dropdownContent = screen.getByRole('menu');
  await expect(dropdownContent).toBeVisible();
  const bookSections = await within(dropdownContent).findAllByRole('menuitem');
  expect(bookSections.length).toEqual(results.length); // Should match number of results
  results.forEach((result, index) => {
    expect(bookSections[index]).toHaveTextContent(result); // should contain the expected menu item
  });
}

function getDropdown() {
  return screen.getByRole('menu');
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

/* Interaction tests */

export const TestClickToOpen: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Verify input is present and visible
    await expect(input).toBeInTheDocument();
    await expect(input).toBeVisible();

    // Click the input to open the dropdown
    await userEvent.click(input);

    await expectDropdownToBeOpenAndVisible();
  },
};

export const TestClickOutsideToCancel: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Click the input to open the dropdown
    await userEvent.click(input);
    await expectDropdownToBeOpenAndVisible();

    userEvent.type(input, 'Ge');

    // Click outside the input to verify it does not close the dropdown
    const outsideElement = canvas.getByText(previousElementText);
    await userEvent.click(outsideElement);

    await expectClosedDropdownStateWithCleanInput(input);
    await expect(input).toHaveValue('Genesis 1:1'); // Input should reset to original value
  },
};

export const TestClickInsideDoesNotClose: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Click the input to open the dropdown
    await userEvent.click(input);

    await expectDropdownToBeOpenAndVisible();

    await userEvent.click(input);

    await expectDropdownToBeOpenAndVisible();
    await wait(1000);
    // Make sure dropdown is still open
    await expectDropdownToBeOpenAndVisible();
  },
};

export const TestKeyboardFocus: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const previousElement = canvas.getByText(previousElementText);

    previousElement.focus();
    await expect(previousElement).toHaveFocus();

    userEvent.type(previousElement, '{Tab}'); // Move focus to the input
    const input = canvas.getByRole('textbox');
    await waitFor(() => expect(input).toHaveFocus());

    await expectClosedDropdownStateWithCleanInput(input);

    await wait(1000);
    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();

    // Move focus to the next Element and verify it has focus
    userEvent.type(input, '{Tab}');
    const nextElement = canvas.getByText(nextElementText);
    await waitFor(() => expect(nextElement).toHaveFocus());

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
    const input = canvas.getByRole('textbox');
    await waitFor(() => expect(input).toHaveFocus());

    await expectClosedDropdownStateWithCleanInput(input);

    await wait(1000);
    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();

    // Move focus to the next Element and verify it has focus
    userEvent.type(input, '{Shift>}{Tab}{/Shift}');
    const previousElement = canvas.getByText(previousElementText);
    await waitFor(() => expect(previousElement).toHaveFocus());

    // Make sure dropdown is still closed
    await expectDropdownToBeClosed();
  },
};

export const TestSearchFilterUniqueResult: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Click to open dropdown
    await userEvent.click(input);

    // Type to search for books
    await userEvent.type(input, 'mat');

    await expectCheckmarkIconToExist(input);

    // Verify that only Matthew appears in the filtered results
    await expectResultsVisibleAndToBe(['MAT 1:1', 'Matthew']);
  },
};

export const TestSearchFilterMultiResult: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Click to open dropdown
    await userEvent.click(input);

    // Type to search for books
    await userEvent.type(input, 'john');

    await expectNoIconToExist(input);

    // Verify that only Matthew appears in the filtered results
    await expectResultsVisibleAndToBe(['John', '1 John', '2 John', '3 John']);
  },
};

export const TestScriptureReferenceInput: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Click and clear the input
    await userEvent.click(input);

    // Type a scripture reference
    await userEvent.type(input, 'John 3:16');

    await expectCheckmarkIconToExist(input);
    await expectResultsVisibleAndToBe(['JHN 3:16', 'John']);

    // Press Enter to submit
    await userEvent.keyboard('{Enter}');

    // Verify the handleSubmit was called
    await expect(args.handleSubmit).toHaveBeenCalled();

    await expect(input).toHaveValue('John 3:16');
    await expectClosedDropdownStateWithCleanInput(input);
  },
};

export const TestInitialStateWithGenesis: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

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
  },
};

export const TestInitialStateWithMatthew: Story = {
  args: matthewArgs,
  play: async ({ canvas, userEvent }) => {
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
  },
};

export const TestKeyboardChapterNavigation: Story = {
  args: matthewArgs,
  play: async ({ canvas, userEvent, step }) => {
    await step('Open dropdown with click', async () => {
      const input = canvas.getByRole('textbox');
      await userEvent.click(input);
      expect(input).toHaveFocus();

      await expectDropdownToBeOpenAndVisible();
    });

    await step('Navigate with keyboard', async () => {
      const dropdownContent = getDropdown();
      const matthew = await getBookMenuItem(dropdownContent, 'Matthew');

      // Use arrow keys to navigate
      await userEvent.keyboard('{ArrowDown}');
      expect(matthew).toHaveFocus();
      expect(await getChapter(matthew, 1)).toHaveAttribute('aria-current', 'true');

      await userEvent.keyboard('{ArrowDown}');
      expect(await getChapter(matthew, 1)).not.toHaveAttribute('aria-current', 'true');
      expect(await getChapter(matthew, 7)).toHaveAttribute('aria-current', 'true');

      // Press Enter to select
      await userEvent.keyboard('{Enter}');

      // Verify something was selected (dropdown should close)
      const input = canvas.getByRole('textbox');
      expectClosedDropdownStateWithCleanInput(input);
    });
  },
};

export const TestNoMatch: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await expectDropdownToBeOpenAndVisible();
    await userEvent.type(input, 'aaa');

    await expectDropdownToBeClosed();
    await expectNoMatchesIconToExist(input);
  },
};

export const TestCancel: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await userEvent.type(input, 'aaa');

    // Press Escape to close
    await userEvent.keyboard('{Escape}');

    await expect(input).toHaveValue('Genesis 1:1'); // Input should have reset to original value
    await expectDropdownToBeClosed();
  },
};

export const TestBookSelectionByClick: Story = {
  args: defaultArgs,
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Open the dropdown
    await userEvent.click(input);

    // Find and click on a specific book (Matthew)
    const matthewBook = canvas.getByText('Matthew');
    await expect(matthewBook).toBeInTheDocument();

    await userEvent.click(matthewBook);

    // Verify the handleSubmit was called when book was selected
    await expect(args.handleSubmit).toHaveBeenCalled();

    // Verify the input now shows a reference from Matthew
    const inputValue = input.getAttribute('value');
    expect(inputValue).toContain('MAT');
    expectClosedDropdownStateWithCleanInput(input);
  },
};

export const TestChapterSelectionByClick: Story = {
  args: psalmsArgs,
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');

    // Open the dropdown
    await userEvent.click(input);

    // The Psalms book should be expanded showing chapters
    // Look for a specific chapter button (chapter 23)
    const chapter23Button = canvas.getByRole('button', { name: '23' });
    await expect(chapter23Button).toBeInTheDocument();

    // Click on chapter 23
    await userEvent.click(chapter23Button);

    // Verify the handleSubmit was called
    await expect(args.handleSubmit).toHaveBeenCalled();

    // Verify the input now shows Psalm 23
    const inputValue = input.getAttribute('value');
    expect(inputValue).toContain('PSA 23');
    expectClosedDropdownStateWithCleanInput(input);
  },
};
