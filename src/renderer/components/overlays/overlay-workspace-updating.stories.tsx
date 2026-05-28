import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { WorkspaceUpdatingOverlayPresentational } from './overlay-workspace-updating.component';

const meta: Meta<typeof WorkspaceUpdatingOverlayPresentational> = {
  title: 'Advanced/OverlayWorkspaceUpdating',
  component: WorkspaceUpdatingOverlayPresentational,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A full-screen blocking overlay that appears while the active project is switching. Covers all surfaces except modals, which remain accessible during the transition.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkspaceUpdatingOverlayPresentational>;

export const Default: Story = {
  args: {
    label: 'Updating workspace',
  },
};
