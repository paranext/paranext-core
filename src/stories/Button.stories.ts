import type { Meta, StoryObj } from '@storybook/react';
import path from 'path';

import Button from './Button';

const getAssetPath = (...paths: string[]): string => {
  return path.join('resources://', 'assets', ...paths);
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: 'Primary Button',
    disabled: false,
  },
};

export const ButtonWithStartingIcon: Story = {
  args: {
    primary: false,
    startIcon: getAssetPath('icon.png'),
    label: ' Button',
    disabled: false,
  },
};

export const ButtonWithEndingIcon: Story = {
  args: {
    primary: false,
    label: ' Button',
    endIcon: getAssetPath('icon.png'),
    disabled: false,
  },
};

export const Paratext: Story = {
  args: {
    startIcon: getAssetPath('icon.png'),
    label: 'Paratext Button',
    disabled: false,
    additionalCssClasses: 'paratext',
  },
};
