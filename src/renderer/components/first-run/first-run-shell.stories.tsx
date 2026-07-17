import type { Meta, StoryObj } from '@storybook/react';
import { FirstRunShell } from './first-run-shell.component';

const meta: Meta<typeof FirstRunShell> = {
  title: 'First run/FirstRunShell',
  component: FirstRunShell,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FirstRunShell>;

export const Language: Story = { args: { entryStep: 'language' } };
export const SyncConsent: Story = { args: { entryStep: 'syncConsent' } };
export const SyncProgress: Story = { args: { entryStep: 'syncProgress' } };
