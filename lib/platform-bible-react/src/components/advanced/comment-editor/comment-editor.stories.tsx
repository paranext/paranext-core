import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import CommentEditor from './comment-editor.component';
import { CommentEditorLocalizedStrings } from './comment-editor.types';

const commentEditorLocalizedStrings: CommentEditorLocalizedStrings = {
  '%commentEditor_placeholder%': 'Type your comment here...',
  '%commentEditor_saveButton_tooltip%': 'Save comment',
  '%commentEditor_cancelButton_tooltip%': 'Cancel',
  '%commentEditor_assignTo_label%': 'Assign to',
  '%commentEditor_unassigned%': 'Unassigned',
  '%commentEditor_team%': 'Team',
};

const mockAssignableUsers: string[] = ['', 'Team', 'Alice', 'Bob', 'Charlie'];

const meta: Meta<typeof CommentEditor> = {
  title: 'Advanced/CommentEditor',
  component: CommentEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-w-80">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    assignableUsers: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof CommentEditor>;

export const Default: Story = {
  args: {
    assignableUsers: mockAssignableUsers,
    localizedStrings: commentEditorLocalizedStrings,
    onSave: (contents, assignedUser) => {
      console.log('Comment saved:', { contents, assignedUser });
    },
    onClose: () => {
      console.log('Editor closed');
    },
  },
};

/** Story demonstrating the editor when no users are available for assignment */
export const NoAssignableUsers: Story = {
  args: {
    assignableUsers: [],
    localizedStrings: commentEditorLocalizedStrings,
    onSave: (contents, assignedUser) => {
      console.log('Comment saved:', { contents, assignedUser });
    },
    onClose: () => {
      console.log('Editor closed');
    },
  },
};
