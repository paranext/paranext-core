import type { Meta as MetaBase, StoryObj } from '@storybook/react';
import { ComboBox } from 'platform-bible-react';

export const Meta: MetaBase<typeof ComboBox> = {
  title: 'Basics/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    buttonClassName: { control: 'text' },
  },
};
export default Meta;

type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
  args: {},
};

export const Placeholder: Story = {
  args: {
    options: ['Option 1', 'Option2', 'Option3'],
  },
};

export const Paratext: Story = {
  args: {
    buttonClassName: 'paratext',
  },
};

export const ParatextBright: Story = {
  args: {
    buttonClassName: 'paratext bright',
  },
};
