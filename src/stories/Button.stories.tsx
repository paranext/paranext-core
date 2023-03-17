import type { Meta, StoryObj } from '@storybook/react';

import Button from '@renderer/components/papi-components/Button';

const meta: Meta<typeof Button> = {
  title: 'MUI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    disabled: false,
    children: 'Primary Button',
  },
};

export const CustomJSXContents: Story = {
  args: {
    disabled: false,
    className: ['video'],
    children: (
      <a href="https://www.youtube.com/watch?v=z_lgjFAxP6c">
        Funny Meeting Video
      </a>
    ),
  },
};

export const Paratext: Story = {
  args: {
    disabled: false,
    className: ['paratext'],
    children: 'Paratext Button',
  },
};

export const ParatextBright: Story = {
  args: {
    disabled: false,
    className: ['paratext', 'bright'],
    children: 'Paratext Button',
  },
};
