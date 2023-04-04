import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from '@renderer/components/papi-components/checkbox';

const meta: Meta<typeof CheckBox> = {
  title: 'Basics/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {},
};

export const DefaultChecked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const ErrorState: Story = {
  args: { hasError: true },
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

export const OnChange: Story = {
  args: {
    onChange(event) {
      // eslint-disable-next-line no-console
      console.log(event.target.checked);
    },
  },
};
