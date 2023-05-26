import type { Meta, StoryObj } from '@storybook/react';
import { ComboBox } from '@lib/papi-components';

const meta: Meta<typeof ComboBox> = {
  title: 'Basics/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isDisabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    isFullWidth: { control: 'boolean' },
    options: { control: 'object' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const ErrorState: Story = {
  args: { hasError: true },
};

export const FullWidth: Story = {
  args: { isFullWidth: true },
};

export const Title: Story = {
  args: { title: 'Combo box' },
};

export const Placeholder: Story = {
  args: {
    options: ['Option 1', 'Option2', 'Option3'],
  },
};

export const Paratext: Story = {
  args: {
    className: 'paratext',
  },
};

export const ParatextBright: Story = {
  args: {
    className: 'paratext bright',
  },
};
