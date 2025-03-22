import type { Meta, StoryObj } from '@storybook/react';

const ComponentName = () => {
  return <div>Story Template</div>;
};

const meta: Meta<typeof ComponentName> = {
  title: 'ComponentCategory/ComponentName',
  component: ComponentName,
  argTypes: {
    // Define your argTypes here
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Define your default args here
  },
};
