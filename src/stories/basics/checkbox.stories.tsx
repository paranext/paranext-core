import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from 'platform-bible-react';

export const meta: Meta<typeof Checkbox> = {
  title: 'Basics/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const OnChange: Story = {
  args: {
    onCheckedChange(value) {
      // eslint-disable-next-line no-console
      console.log(value);
    },
  },
};
