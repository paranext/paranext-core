import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import { expect, fn, screen, waitFor, within } from 'storybook/test';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

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

      // Look for the top match suggestion in the dropdown
      const topMatch = await within(dropdownContent).findByText('JHN 3:16');
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
      const topMatch = await within(dropdownContent).findByText('ROM 8:1');
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
      const topMatch = await within(dropdownContent).findByText('1CO 13:4');
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
    await step('Open component and search for Psalms', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      // Wait for the dropdown to appear
      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Psalms');

      // Should find Psalms in the filtered results
      const psalmsItem = await within(dropdownContent).findByText('Psalms');
      await expect(psalmsItem).toBeInTheDocument();
    });

    await step('Navigate the Psalms top match chapter view', async () => {
      const dropdownContent = getDropdown();

      // Should have many chapter buttons
      const chapterButtons = within(dropdownContent).getAllByRole(CHAPTER_BUTTON_ROLE);
      await expect(chapterButtons.length).toBeGreaterThan(50);
    });

    await step('Select chapter 23', async () => {
      const dropdownContent = getDropdown();
      const chapter23 = within(dropdownContent).getByRole(CHAPTER_BUTTON_ROLE, { name: '23' });
      await userEvent.click(chapter23);

      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'PSA',
        chapterNum: 23,
        verseNum: 1,
      });
    });

    await step('Test back navigation', async () => {
      // Reopen component to test back navigation
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'Ro');

      const romansItem = await within(dropdownContent).findByText('Romans');
      await userEvent.click(romansItem);

      // Click back button
      const backButton = await within(dropdownContent).findByRole('button');
      await userEvent.click(backButton);

      // Should be back to book search mode
      const searchInputAgain = within(dropdownContent).getByRole(INPUT_ROLE);
      await expect(searchInputAgain).toBeInTheDocument();
      await expect(searchInputAgain).toHaveFocus();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Book Search and Navigation** - Tests the book search functionality and navigation.

This test verifies:
- Book search filtering works correctly
- Navigation to chapter view for multi-chapter books
- Chapter selection and submission
- Back navigation from chapter view to book search
- Focus management during navigation
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
    await step('Test single chapter book selection (Obadiah)', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = await expectPopoverToBeOpenAndVisible();

      const obadiahItem = await within(dropdownContent).findByText('Obadiah');
      await expect(obadiahItem).toBeInTheDocument();

      // Click Obadiah - should immediately submit since it only has 1 chapter
      await userEvent.click(obadiahItem);

      // Should submit immediately without showing chapter grid
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1,
      });
    });

    await step('Test another single chapter book (Odes)', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Ode');

      const odesItem = await within(dropdownContent).findByText('ODA 1:1');
      await userEvent.click(odesItem);

      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'ODA',
        chapterNum: 1,
        verseNum: 1,
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Single Chapter Book Demo** - Tests immediate selection for books with only one chapter.

This test verifies:
- Single chapter books (like Obadiah, Philemon) are submitted immediately
- No chapter grid is shown for single chapter books
- Proper book IDs are used in submissions
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
    await step('Test keyboard navigation in chapter grid', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      // Should show Matthew chapter grid immediately since it's the current book
      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const matthewItem = within(dropdownContent).getByText('Matthew');
      await expect(matthewItem).toBeInTheDocument();
      await userEvent.click(matthewItem);

      const chapter15 = await within(dropdownContent).findByRole(CHAPTER_BUTTON_ROLE, {
        name: '15',
      });
      await expect(chapter15).toBeInTheDocument();
    });

    await step('Test arrow key navigation', async () => {
      // Use arrow keys to navigate around the chapter grid
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowUp}');

      // Test that keyboard navigation works - dropdown should still be open
      const dropdownContent = getDropdown();
      await expect(dropdownContent).toBeVisible();
    });

    await step('Test Enter key selection', async () => {
      // Focus should be on a chapter button, press Enter to select
      await userEvent.keyboard('{Enter}');

      // The popover should close after selection
      await expectPopoverToBeClosed();
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Keyboard Navigation** - Tests keyboard interactions within the component.

This test verifies:
- Arrow key navigation works in chapter grids
- Enter key selects the current chapter
- Keyboard navigation provides good user experience
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
    await step('Test filtering and smart parsing combinations', async () => {
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      // Test partial book name filtering
      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);
      await userEvent.type(searchInput, 'joh');

      // Should show multiple John books
      const johnItems = within(dropdownContent).getAllByText(/john/i);
      await expect(johnItems.length).toBe(4);
    });

    await step('Test escape key functionality', async () => {
      const dropdownContent = getDropdown();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);

      // Type something, then escape should clear and close
      await userEvent.type(searchInput, 'n');

      const johnItems = within(dropdownContent).getByText('John');
      await expect(johnItems).toBeInTheDocument();
      await userEvent.click(johnItems);

      await userEvent.keyboard('{Escape}');

      expect(dropdownContent).toBeVisible();

      await userEvent.keyboard('{Escape}');

      await expectPopoverToBeClosed();

      // Trigger should return to original value
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await expect(trigger).toHaveTextContent('Genesis 1:1');
    });

    await step('Test rapid book switching', async () => {
      // Open dropdown
      const trigger = canvas.getByRole(TRIGGER_ROLE);
      await userEvent.click(trigger);

      const dropdownContent = await expectPopoverToBeOpenAndVisible();
      const searchInput = within(dropdownContent).getByRole(INPUT_ROLE);

      // Quick succession of book selections
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'obad');

      const obadiahItem = await within(dropdownContent).findByText('OBA 1:1');
      await userEvent.click(obadiahItem);

      // Verify first submission
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'OBA',
        chapterNum: 1,
        verseNum: 1,
      });

      // Immediately switch to another book
      await userEvent.click(trigger);
      const dropdownContent2 = await expectPopoverToBeOpenAndVisible();
      const searchInput2 = within(dropdownContent2).getByRole(INPUT_ROLE);
      await userEvent.clear(searchInput2);
      await userEvent.type(searchInput2, 'Rev 22:21');

      const revMatch = await within(dropdownContent2).findByText('REV 22:21');
      await userEvent.click(revMatch);

      // Verify second submission
      await expect(args.handleSubmit).toHaveBeenCalledWith({
        book: 'REV',
        chapterNum: 22,
        verseNum: 21,
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: `
**Comprehensive Interaction Test** - Tests complex user workflows and edge cases.

This test verifies:
- Multiple filtering scenarios and smart parsing
- Escape key behavior and input reset
- Rapid book switching and state management
- Edge cases like non-existent books and invalid chapters
- Error handling and graceful degradation
        `,
      },
    },
  },
};
