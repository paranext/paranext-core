import type { Meta, StoryObj } from '@storybook/react';
import Slider from '../renderer/components/papi-components/Slider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Slider> = {
  title: 'MUI/Slider',
  component: Slider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    disabled: { control: 'boolean' },
    orientation: {
      options: [0, 1], // iterator
      mapping: ['horizontal', 'vertical'], // values
      control: {
        type: 'select',
        labels: ['Horizontal', 'Vertical'],
      },
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    marks: { control: 'boolean' },
    defaultValue: { control: 'number' },
    valueLabelDisplay: {
      options: [0, 1, 2], // iterator
      mapping: ['on', 'auto', 'off'], // values
      control: {
        type: 'select',
        labels: ['On', 'Auto', 'Off'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Basic: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DiscreteValues: Story = {
  args: {
    min: -10,
    max: 10,
    step: 2,
    marks: true,
    defaultValue: 0,
    valueLabelDisplay: 'on',
  },
};

export const Paratext: Story = {
  args: { className: ['paratext'], min: 0, max: 10 },
};

export const ParatextBright: Story = {
  args: { className: ['paratext', 'bright'], orientation: 'vertical' },
};
