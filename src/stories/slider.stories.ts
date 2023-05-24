import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from 'papi-components';

const meta: Meta<typeof Slider> = {
  title: 'Basics/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    orientation: {
      options: [0, 1],
      mapping: ['horizontal', 'vertical'],
      control: {
        type: 'select',
        labels: ['Horizontal', 'Vertical'],
      },
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showMarks: { control: 'boolean' },
    defaultValue: { control: 'number' },
    valueLabelDisplay: {
      options: [0, 1, 2],
      mapping: ['on', 'auto', 'off'],
      control: {
        type: 'select',
        labels: ['On', 'Auto', 'Off'],
      },
    },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const DiscreteValues: Story = {
  args: {
    min: -10,
    max: 10,
    step: 2,
    showMarks: true,
    defaultValue: 0,
    valueLabelDisplay: 'on',
  },
};

export const Paratext: Story = {
  args: { className: 'paratext', min: 0, max: 10 },
};

export const ParatextBright: Story = {
  args: { className: 'paratext bright', orientation: 'vertical' },
};
