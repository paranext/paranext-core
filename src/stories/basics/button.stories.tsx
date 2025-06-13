﻿import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'platform-bible-react';

const meta: Meta<typeof Button> = {
  title: 'Basics/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: { string: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const CustomJSXContents: Story = {
  args: {
    className: 'video',
    children: <a href="https://www.youtube.com/watch?v=z_lgjFAxP6c">Funny Meeting Video</a>,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};
