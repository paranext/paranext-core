import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '@renderer/components/papi-components/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Basics/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean' },
    isDefaultChecked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    hasError: { control: 'boolean' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const DefaultChecked: Story = {
  args: { isDefaultChecked: true, labelText: 'Initially checked' },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    labelText:
      'Clicking this does nothing. It would need isIndeterminate to be programmatically set to false.',
  },
};

export const Disabled: Story = {
  args: { isDisabled: true, labelText: 'This is disabled' },
};

export const ErrorState: Story = {
  args: { hasError: true, labelText: 'Bad!' },
};

export const Paratext: Story = {
  args: {
    labelText: 'Paratext',
    className: 'paratext',
  },
};

export const ParatextBright: Story = {
  args: {
    labelText: 'Paratext Bright',
    className: 'paratext bright',
  },
};

export const OnChange: Story = {
  args: {
    onChange(event) {
      // eslint-disable-next-line no-console
      console.log(event.target.checked);
    },
  },
};
