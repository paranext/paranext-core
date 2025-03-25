import { useArgs } from '@storybook/preview-api';
import type { Meta as MetaBase, StoryObj } from '@storybook/react';
import { BookChapterControl, BookChapterControlProps } from 'platform-bible-react';
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

const Meta: MetaBase<typeof BookChapterControl> = {
  title: 'Platform/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [BookChapterControlDecorator],
};
export default Meta;

type Story = StoryObj<typeof BookChapterControl>;

const defaultScrRef: ScriptureReference = { bookNum: 5, chapterNum: 4, verseNum: 3 };

export const Default: Story = {
  args: {
    scrRef: defaultScrRef,
  },
};
