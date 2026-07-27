import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, userEvent, within } from 'storybook/test';
import { SyncConsentStep } from './sync-consent-step.component';

const meta: Meta<typeof SyncConsentStep> = {
  title: 'First run/SyncConsentStep',
  component: SyncConsentStep,
  tags: ['autodocs'],
  args: {
    onNext: fn(),
    onSkip: fn(),
    // Default: resolves immediately so the story shows both buttons in their resting state.
    onSync: fn().mockResolvedValue(undefined),
  },
};
export default meta;

type Story = StoryObj<typeof SyncConsentStep>;

/** Both "Sync" (primary) and "Don't sync yet" (secondary) are visible. */
export const Default: Story = {};

/** "Sync" has been clicked; spinner is visible and "Don't sync yet" is hidden while sync runs. */
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

/** Back navigation is available when the user arrived from a preceding step. */
export const WithBack: Story = {
  args: {
    onBack: fn(),
  },
};
