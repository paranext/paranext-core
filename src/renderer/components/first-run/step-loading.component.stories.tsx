import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { StepLoading } from './step-loading.component';

const meta: Meta<typeof StepLoading> = {
  title: 'First Run/StepLoading',
  component: StepLoading,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof StepLoading>;

/** Spinner only — used while a step is briefly loading and no explanation is needed yet. */
export const SpinnerOnly: Story = {};

/** Spinner with a status line — shown once a step's load is slow enough to warrant a message. */
export const WithMessage: Story = {
  args: { message: 'Setting things up for the first time. This can take a moment…' },
};
