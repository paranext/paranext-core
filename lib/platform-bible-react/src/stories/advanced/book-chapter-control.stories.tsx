import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
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

const meta: Meta<typeof BookChapterControl> = {
  title: 'Advanced/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  args: {
    scrRef: defaultScrRef,
    handleSubmit: (scrRef) => console.log('Scripture reference changed:', scrRef),
  },
  render: (args) => <BookChapterControlWrapper {...args} />,
} satisfies Meta<typeof BookChapterControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'tw-text-white',
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
