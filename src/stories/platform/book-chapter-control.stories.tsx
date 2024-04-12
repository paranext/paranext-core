import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { BookChapterControlProps, BookChapterControl } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { ReactElement } from 'react';

function BookChapterControlDecorator(
  Story: (update?: { args: Partial<BookChapterControlProps> }) => ReactElement,
) {
  const [args, updateArgs] = useArgs();

  const handleSubmit = (scrRef: ScriptureReference) => {
    updateArgs({ scrRef });
  };

  return (
    <Story
      args={{
        ...args,
        handleSubmit,
      }}
    />
  );
}

const meta: Meta<typeof BookChapterControl> = {
  title: 'Platform/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [BookChapterControlDecorator],
};
export default meta;

type Story = StoryObj<typeof BookChapterControl>;

const defaultScrRef: ScriptureReference = { bookNum: 5, chapterNum: 4, verseNum: 3 };

export const Default: Story = {
  args: {
    scrRef: defaultScrRef,
  },
};
