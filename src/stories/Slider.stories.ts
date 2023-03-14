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
    primary: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: { primary: true },
};

export const Secondary: Story = {
  args: { primary: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Paratext: Story = {
  args: { className: ['paratext'] },
};

export const ParatextBright: Story = {
  args: { className: ['paratext', 'bright'] },
};
