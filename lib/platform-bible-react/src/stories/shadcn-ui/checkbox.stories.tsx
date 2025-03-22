import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../../components/shadcn-ui/checkbox';
import { ThemeProvider } from '../../preview/preview-components/theme-provider.component';
import React, { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Shadcn/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    checked: false,
  },
};
