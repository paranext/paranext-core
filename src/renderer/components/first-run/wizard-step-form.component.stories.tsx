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

/** Back navigation available from a preceding step. */
export const WithBack: Story = {
  args: {
    backButton: <Button variant="outline">Back</Button>,
  },
};

/** Secondary "Skip" action alongside the primary button. */
export const WithSecondary: Story = {
  args: {
    secondaryButton: <Button variant="outline">Skip</Button>,
  },
};

/** Error string below the body content and above the button row. */
export const WithError: Story = {
  args: {
    error: 'Something went wrong. Please try again.',
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
    backButton: <Button variant="outline">Back</Button>,
    secondaryButton: <Button variant="outline">Skip</Button>,
    primaryButton: <Button>Sync</Button>,
  },
};
