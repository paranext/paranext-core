import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookChapterControl } from 'platform-bible-react';

const handleSubmit = (scrRef: SerializedVerseRef) => {
  console.log(scrRef); // This should be replaced with the intended action
};

const meta: Meta<typeof BookChapterControl> = {
  title: 'Platform/BookChapterControl',
  component: BookChapterControl,
  tags: ['autodocs'],
  argTypes: {
    scrRef: { action: 'handleSubmit' },
  },
};
export default meta;

type Story = StoryObj<typeof BookChapterControl>;

const defaultScrRef: SerializedVerseRef = { book: 'GEN', chapterNum: 4, verseNum: 3 };

export const Default: Story = {
  args: {
    scrRef: defaultScrRef,
    handleSubmit,
  },
};
