import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, userEvent, within } from 'storybook/test';
import { SyncConsentStep } from './sync-consent-step.component';

const meta: Meta<typeof SyncConsentStep> = {
  title: 'First run/SyncConsentStep',
  component: SyncConsentStep,
  tags: ['autodocs'],
  args: {
    onNext: fn(),
    // Resolves immediately so the story shows the Sync button in its resting state.
    onSync: fn().mockResolvedValue(undefined),
  },
};
export default meta;

type Story = StoryObj<typeof SyncConsentStep>;

/**
 * The step's own content and its primary "Sync" action. The "Don't sync yet" button is rendered by
 * the wizard shell's footer, not by this step — see [First run/FirstRunShell →
 * SyncConsent](?path=/story/first-run-firstrunshell--sync-consent) for the step as the user
 * actually sees it.
 */
export const Default: Story = {};

/** "Sync" has been clicked; the button shows a spinner and is disabled while the sync runs. */
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
