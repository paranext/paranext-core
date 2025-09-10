import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from '@/components/advanced/comment-list/comment-list.component';
import { CommentData } from '@/components/advanced/comment-list/comment-list.types';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof CommentList> = {
  title: 'Components/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-2xl tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    comments: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CommentList>;

// Stub data
const sampleComments: CommentData[] = [
  {
    assignedUser: 'Carol',
    id: '1',
    user: 'Alice',
    date: new Date(2023, 9, 1, 10, 30),
    contents: 'This is a **top-level** comment.',
    deleted: false,
    thread: 't1',
    verseRef: 'Gen 1:1',
    replies: [
      {
        id: '1-1',
        user: 'Carol',
        date: new Date(),
        contents: 'Hey, Alice, I can fix this!',
        thread: 't1',
        verseRef: 'Gen 1:1',
      },
    ],
  },
  {
    id: '2',
    user: 'Bob',
    date: new Date(),
    contents: 'This is another comment with a [link](https://example.com).',
    deleted: false,
    thread: 't2',
    verseRef: 'Gen 1:2',
    replies: [
      {
        id: '2-1',
        user: 'Dave',
        date: new Date(),
        contents: 'First reply to Bob',
        thread: 't2',
        verseRef: 'Gen 1:2',
      },
      {
        id: '2-2',
        user: 'Eve',
        date: new Date(),
        contents: 'Second reply to Bob',
        thread: 't2',
        verseRef: 'Gen 1:2',
      },
    ],
  },
  {
    id: '3',
    user: 'Carol',
    date: new Date(),
    contents: 'Reply to Alice\n\n- Bullet point 1\n- Bullet point 2',
    deleted: false,
    thread: 't1',
    verseRef: 'Gen 1:1',
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
  },
};
