import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentList } from '@/components/advanced/comment-list/comment-list.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { LanguageStrings } from 'platform-bible-utils';
import { sampleComments } from './comment-sample-data';

const commentListLocalizedStrings: LanguageStrings = {
  '%no_comments%': 'No comments yet',
  '%comment_thread_single_reply%': '1 reply',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_replyOrAssign%': 'Reply or assign with @',
};

const meta: Meta<typeof CommentList> = {
  title: 'Advanced/CommentList',
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
    threads: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CommentList>;

export const Default: Story = {
  args: {
    threads: sampleComments,
    localizedStrings: commentListLocalizedStrings,
  },
};

export const NoThreads: Story = {
  args: {
    threads: [],
    localizedStrings: commentListLocalizedStrings,
  },
};
