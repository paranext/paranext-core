import type { Meta, StoryObj } from '@storybook/react';
import Switch from '../renderer/components/papi-components/Switch';

const meta: Meta<typeof Switch> = {
  title: 'MUI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    isPrimary: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
  args: { isPrimary: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ErrorState: Story = {
  args: { hasError: true },
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
      // eslint-disable-next-line no-console
      console.log(event.target.checked);
    },
  },
};
