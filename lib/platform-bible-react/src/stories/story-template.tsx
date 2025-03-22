import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface ComponentProps {
  // Define your component props here
}

const ComponentName: React.FC<ComponentProps> = (props) => {
  // Your component implementation
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

// Add more stories as needed
