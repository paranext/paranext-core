import type { Meta as MetaBase, StoryObj } from '@storybook/react';
import { Switch } from 'platform-bible-react';

export const Meta: MetaBase<typeof Switch> = {
  title: 'Basics/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};
export default Meta;

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
      // There is likely a better way to do this without using `as`.
      // eslint-disable-next-line no-console, no-type-assertion/no-type-assertion
      console.log((event.target as HTMLInputElement).checked);
    },
  },
};
