import type { Meta, StoryObj } from '@storybook/react';
import ComboBox from '../renderer/components/papi-components/ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'MUI/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    options: { control: 'text' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ErrorState: Story = {
  args: { hasError: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
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
    className: ['paratext'],
  },
};

export const ParatextBright: Story = {
  args: {
    className: ['paratext', 'bright'],
  },
};
