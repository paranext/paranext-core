import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { WorkspaceUpdatingOverlayPresentational } from './overlay-workspace-updating.component';

/** Renders a fixed toolbar-height strip at the top so the story shows the overlay starting below it. */
function WithSimulatedApp(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <>
      <div className="pr-twp">
        <div
          aria-hidden="true"
          className="tw:fixed tw:inset-x-0 tw:top-0 tw:h-12 tw:border-b tw:border-border tw:bg-muted"
        />
      </div>
      <Story />
    </>
  );
}

const meta: Meta<typeof WorkspaceUpdatingOverlayPresentational> = {
  title: 'Advanced/OverlayWorkspaceUpdating',
  component: WorkspaceUpdatingOverlayPresentational,
  tags: ['autodocs'],
  decorators: [WithSimulatedApp],
  parameters: {
    docs: {
      description: {
        component:
          'A blocking overlay that appears while the active project is switching. Covers the content in the RC Dock client area (below the toolbar, inside the window borders) but leaves modals accessible during the transition.',
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
