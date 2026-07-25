import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';

const meta: Meta<typeof FirstRunShell> = {
  title: 'First run/FirstRunShell',
  component: FirstRunShell,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FirstRunShell>;

export const Language: Story = { args: { entryStep: 'language' } };
export const Identify: Story = { args: { entryStep: 'identify' } };
export const SyncConsent: Story = { args: { entryStep: 'syncConsent' } };
// Without injected event sources SyncProgressStep subscribes to live S/R network events, which have
// no PAPI backend in Storybook. This shell story focuses on the shell chrome (title, step indicator,
// footer), so it stubs the step rather than driving it; see sync-progress.component.stories.tsx for
// the step's own stories, which render its real states via the injectable event props.
export const SyncProgress: Story = {
  args: {
    entryStep: 'syncProgress',
    stepComponents: {
      ...DEFAULT_STEP_COMPONENTS,
      syncProgress: () => <p>Sync progress (no PAPI in Storybook — use the real app to preview)</p>,
    },
  },
};
