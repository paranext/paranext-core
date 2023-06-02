import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from 'papi-components';

const meta: Meta<typeof Switch> = {
  title: 'Basics/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: { className: 'primary' },
};

export const Secondary: Story = {
  args: { className: 'secondary' },
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
