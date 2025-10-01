import { Meta, StoryObj } from '@storybook/react-vite';
import { PersistedSplitPanels } from './persisted-split-panels.component';

const meta: Meta<typeof PersistedSplitPanels> = {
  title: 'Basics/PersistedSplitPanels',
  component: PersistedSplitPanels,
};
export default meta;

type Story = StoryObj<typeof PersistedSplitPanels>;

export const Horizontal: Story = {
  render: () => (
    <PersistedSplitPanels
      storageKey="storybook-horizontal-example"
      direction="horizontal"
      defaultSize={60}
      className="tw-h-[200px] tw-w-full tw-border"
    >
      <div className="tw-p-4">Left Panel</div>
      <div className="tw-p-4">Right Panel</div>
    </PersistedSplitPanels>
  ),
};

export const Vertical: Story = {
  render: () => (
    <PersistedSplitPanels
      storageKey="storybook-vertical-example"
      direction="vertical"
      defaultSize={25}
      className="tw-h-[200px] tw-w-full tw-border"
    >
      <div className="tw-p-4">Top Panel</div>
      <div className="tw-p-4">Bottom Panel</div>
    </PersistedSplitPanels>
  ),
};
