import type { Meta, StoryObj } from '@storybook/react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { IconButton } from 'papi-components';

const meta: Meta<typeof IconButton> = {
  title: 'Basics/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    label: 'default',
    children: <DangerousIcon />,
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isTooltipSuppressed: { control: 'boolean' },
    label: { control: 'text' },
    tooltip: { control: 'text' },
    isFocusRippleDisabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    className: 'primary',
    label: 'primary',
    children: <ArrowCircleUp />,
  },
};

export const Secondary: Story = {
  args: {
    label: 'secondary',
    className: 'secondary',
    children: <ArrowCircleUp />,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'disabled',
  },
};

export const Paratext: Story = {
  args: {
    className: 'paratext',
    label: 'paratext',
  },
};

export const ParatextBright: Story = {
  args: {
    className: 'paratext bright',
    label: 'paratext bright',
  },
};

export const TooltipDifferentFromLabel: Story = {
  args: {
    tooltip: 'Tootlip not the same as label',
  },
};

export const NoTooltip: Story = {
  args: {
    isTooltipSuppressed: true,
  },
};
