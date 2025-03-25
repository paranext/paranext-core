import type { Meta as MetaBase, StoryObj } from '@storybook/react';
import { Slider } from 'platform-bible-react';

const Meta: MetaBase<typeof Slider> = {
  title: 'Basics/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
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
    className: { control: 'text' },
  },
};
export default Meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {},
};

export const DiscreteValues: Story = {
  args: {
    min: -10,
    max: 10,
    step: 2,
    defaultValue: [0],
  },
};

export const Paratext: Story = {
  args: { className: 'paratext', min: 0, max: 10 },
};

export const ParatextBright: Story = {
  args: { className: 'paratext bright', orientation: 'vertical' },
};
