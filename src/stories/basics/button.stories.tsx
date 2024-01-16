import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'platform-bible-react';

const meta: Meta<typeof Button> = {
  title: 'Basics/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    className: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    className: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Button',
  },
};

export const CustomJSXContents: Story = {
  args: {
    className: 'video',
    children: <a href="https://www.youtube.com/watch?v=z_lgjFAxP6c">Funny Meeting Video</a>,
  },
};

export const Paratext: Story = {
  args: {
    className: 'paratext',
    children: 'Paratext Button',
  },
};

export const ParatextBright: Story = {
  args: {
    className: 'paratext bright',
    children: 'Paratext Button',
  },
};
