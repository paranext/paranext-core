import type { Meta, StoryObj } from '@storybook/react';

import Button from '@renderer/components/papi-components/Button';

const meta: Meta<typeof Button> = {
  title: 'Basics/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    isPrimary: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    isPrimary: true,
    isDisabled: false,
    children: 'Primary Button',
  },
};

export const CustomJSXContents: Story = {
  args: {
    isDisabled: false,
    className: 'video',
    children: (
      <a href="https://www.youtube.com/watch?v=z_lgjFAxP6c">
        Funny Meeting Video
      </a>
    ),
  },
};

export const Paratext: Story = {
  args: {
    isDisabled: false,
    className: 'paratext',
    children: 'Paratext Button',
  },
};

export const ParatextBright: Story = {
  args: {
    isDisabled: false,
    className: 'paratext bright',
    children: 'Paratext Button',
  },
};
