import type { Meta, StoryObj } from '@storybook/react';
import Textfield from '../renderer/components/papi-components/Textfield';

const meta: Meta<typeof Textfield> = {
  title: 'MUI/Textfield',
  component: Textfield,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [0, 1],
      mapping: ['outlined', 'filled'],
      control: {
        type: 'select',
        labels: ['Outlined', 'Filled'],
      },
    },
    helperText: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ErrorState: Story = {
  args: { error: true, helperText: 'Something is wrong with your input' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const HelperText: Story = {
  args: { helperText: 'This is helper text' },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'This is placeholder text',
  },
};

export const Label: Story = {
  args: { label: 'This is a label' },
};

export const Required: Story = {
  args: {
    label: 'This field is required',
    required: true,
  },
};

export const Events: Story = {
  args: {
    onChange() {
      console.log('Changed');
    },
    onBlur() {
      console.log('Lost focus');
    },
    onFocus() {
      console.log('Got focus');
    },
  },
};
