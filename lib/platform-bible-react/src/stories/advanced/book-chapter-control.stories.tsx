import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';
import { ComponentProps, useCallback, useState } from 'react';
import { defaultScrRef } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';

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
        <BookChapterControl {...rest} scrRef={scrRef} handleSubmit={handleSubmitWrapper} />
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
