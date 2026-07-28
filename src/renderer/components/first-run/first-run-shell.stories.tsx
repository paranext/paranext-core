import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { LanguageInfo } from 'platform-bible-react';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock: the shell
// embeds the real LanguageStep, whose PAPI hooks would otherwise return raw keys / English-only in
// Storybook. Opting in renders real English chrome and a realistic multi-language picker.
import {
  resetFirstRunLanguageMock,
  setFirstRunLanguageMock,
} from '../../../../.storybook/mocks/first-run-language-mock-channel';

const SETUP_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
};

const meta: Meta<typeof FirstRunShell> = {
  title: 'First run/FirstRunShell',
  component: FirstRunShell,
  tags: ['autodocs'],
  beforeEach: () => {
    setFirstRunLanguageMock({
      interfaceLanguage: ['en'],
      setupLanguages: SETUP_LANGUAGES,
      availableLanguages: SETUP_LANGUAGES,
    });
    return resetFirstRunLanguageMock;
  },
};
export default meta;

type Story = StoryObj<typeof FirstRunShell>;

export const Language: Story = { args: { entryStep: 'language' } };
export const InternetSettings: Story = { args: { entryStep: 'internetSettings' } };
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
