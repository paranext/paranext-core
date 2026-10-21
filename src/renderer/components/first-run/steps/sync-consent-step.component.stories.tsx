import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, userEvent, within } from 'storybook/test';
import { SyncConsentStep } from './sync-consent-step.component';

const meta: Meta<typeof SyncConsentStep> = {
  title: 'First run/SyncConsentStep',
  component: SyncConsentStep,
  tags: ['autodocs'],
  args: {
    onNext: fn(),
    // Supplied by the wizard shell once the step asks for it, so present in every story.
    onDeclineSync: fn(),
    // Resolves immediately so the story shows the Sync button in its resting state.
    onSync: fn().mockResolvedValue(undefined),
  },
};
export default meta;

type Story = StoryObj<typeof SyncConsentStep>;

/** "Don't sync yet" beside the primary "Sync", as a user resuming after the Identify step sees it. */
export const Default: Story = {};

/** Reached by walking forward through the wizard, so Back is available too. */
export const WithBack: Story = {
  args: {
    onBack: fn(),
  },
};

/** "Sync" has been clicked: it shows a spinner and is disabled, and "Don't sync yet" is withdrawn. */
export const Syncing: Story = {
  args: {
    // Never resolves so the component stays in the syncing/busy state indefinitely.
    onSync: () => new Promise(() => {}),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /^sync$/i }));
  },
};

/** "Sync" failed: the error shows above the buttons, and "Don't sync yet" is offered again. */
export const SyncFailed: Story = {
  args: {
    onSync: () => Promise.reject(new Error('Sync could not reach the server.')),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /^sync$/i }));
  },
};
