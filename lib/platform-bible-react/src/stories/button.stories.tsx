import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/shadcn-ui/button';

interface ComponentProps {
  // Define your component props here
}

const ComponentName: React.FC<ComponentProps> = (props) => {
  // Your component implementation
};

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

// Add more stories for different variants and sizes
