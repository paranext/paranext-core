import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import { WizardStepForm } from './wizard-step-form.component';

const meta: Meta<typeof WizardStepForm> = {
  title: 'First run/WizardStepForm',
  component: WizardStepForm,
  tags: ['autodocs'],
  args: {
    heading: 'Enter your details',
    children: <p className="tw:text-sm tw:text-muted-foreground">Step body content goes here.</p>,
    primaryButton: <Button>Next</Button>,
  },
};
export default meta;

type Story = StoryObj<typeof WizardStepForm>;

/** Minimum configuration: heading, children, and a primary button. */
export const Default: Story = {};

/** Error alert below the body content and above the button row. */
export const WithError: Story = {
  args: {
    error: 'Something went wrong. Please try again.',
  },
};

/** Error alert with a description for additional context. */
export const WithErrorDescription: Story = {
  args: {
    error: 'Connection failed',
    errorDescription: 'Check your internet connection and try again.',
  },
};

/** All slots populated — demonstrates the full layout. */
export const AllSlots: Story = {
  args: {
    heading: 'Sync your projects',
    children: (
      <p className="tw:text-sm tw:text-muted-foreground">
        When working on shared projects, syncing updates your local copy and shares your changes
        with others.
      </p>
    ),
    error: 'Connection failed',
    errorDescription: 'Check your internet connection and try again.',
    primaryButton: <Button>Sync</Button>,
  },
};
