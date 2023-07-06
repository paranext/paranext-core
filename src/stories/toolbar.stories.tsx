import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from 'papi-components';
import 'papi-components/dist/style.css';

const meta: Meta<typeof Toolbar> = {
  title: 'Basics/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {},
};
