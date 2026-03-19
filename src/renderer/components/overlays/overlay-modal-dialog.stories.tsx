import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { OverlayModalDialogPresentational } from './overlay-modal-dialog.component';

const meta: Meta<typeof OverlayModalDialogPresentational> = {
  title: 'Advanced/OverlayModalDialog',
  component: OverlayModalDialogPresentational,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog component supporting alert and confirm dialog types with appropriate UI elements and accessibility.',
      },
    },
  },
  args: {
    onResolve: (result) => console.log('Resolved:', result),
    onDismiss: () => console.log('Dismissed'),
  },
};

export default meta;
type Story = StoryObj<typeof OverlayModalDialogPresentational>;

export const AlertBasic: Story = {
  args: {
    dialogType: 'alert',
    options: {
      message: 'The operation completed successfully.',
    },
  },
};

export const AlertCustomTitle: Story = {
  args: {
    dialogType: 'alert',
    options: {
      title: 'Success',
      message: 'Your changes have been saved.',
      okLabel: 'Got it',
    },
  },
};

export const ConfirmBasic: Story = {
  args: {
    dialogType: 'confirm',
    options: {
      message: 'Are you sure you want to continue?',
    },
  },
};

export const ConfirmDestructive: Story = {
  args: {
    dialogType: 'confirm',
    options: {
      title: 'Delete Project',
      message:
        'This will permanently delete the project and all its data. This action cannot be undone.',
      okLabel: 'Delete',
      cancelLabel: 'Keep',
      destructive: true,
    },
  },
};
