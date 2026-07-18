import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FirstRunGate } from './first-run-overlay.component';

const meta: Meta<typeof FirstRunGate> = {
  title: 'First run/FirstRunGate',
  component: FirstRunGate,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FirstRunGate>;

export const Loading: Story = { args: { status: { kind: 'loading' } } };
export const ErrorState: Story = { args: { status: { kind: 'error' } } };
export const WizardActive: Story = { args: { status: { kind: 'wizard', step: 'language' } } };
