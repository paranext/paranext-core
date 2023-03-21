import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../renderer/components/papi-components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'MUI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};
export const Primary: Story = {
  args: { primary: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ErrorState: Story = {
  args: { error: true },
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

export const OnChange: Story = {
  args: {
    onChange(event) {
      console.log(event.target.checked);
    },
  },
};
