import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import { BookChapterCombobox } from '@/components/advanced/book-chapter-control/book-chapter-combobox.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

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
        <BookChapterCombobox {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
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

**Current Status:** Smart parsing + basic book selection
**TODO:** Chapter selection UI, advanced keyboard navigation

Try typing in the search: "John 3:16", "Romans 8", "PSA 23:1", or "1 Corinthians 13:4"
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
