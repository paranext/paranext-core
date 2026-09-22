import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { LanguageInfo } from 'platform-bible-react';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock: the shell
// embeds the real LanguageStep, whose PAPI hooks would otherwise return raw keys / English-only in
// Storybook. Opting in renders real English chrome and a realistic multi-language picker.
import { withFirstRunLanguage } from '../../../../.storybook/mocks/first-run-language-mock-channel';
import {
  DEFAULT_INTERNET_SETTINGS,
  InternetSettingsMockContext,
} from '../../../../.storybook/mocks/internet-settings-mock-channel';

const SETUP_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
};

const meta: Meta<typeof FirstRunShell> = {
  title: 'First run/FirstRunShell',
  component: FirstRunShell,
  tags: ['autodocs', 'test'],
  decorators: [
    withFirstRunLanguage({
      interfaceLanguage: ['en'],
      setupLanguages: SETUP_LANGUAGES,
      availableLanguages: SETUP_LANGUAGES,
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof FirstRunShell>;

export const Language: Story = { args: { entryStep: 'language' } };
// The step reads a data provider that has no PAPI backend in Storybook, so without standing one in
// it shows its "provider hasn't registered yet" spinner and Next never enables. The step's own
// states live in `steps/internet-settings-step.stories.tsx`; the shell needs it to render at all.
export const InternetSettings: Story = {
  args: { entryStep: 'internetSettings' },
  decorators: [
    (Story) => (
      <InternetSettingsMockContext.Provider
        value={{ isProviderRegistered: true, value: DEFAULT_INTERNET_SETTINGS, isLoading: false }}
      >
        <Story />
      </InternetSettingsMockContext.Provider>
    ),
  ],
};
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

/**
 * Full-viewport story that verifies the shell is vertically + horizontally centered in the modal.
 * Use this story to confirm centering holds across all steps.
 */
export const CenteredInModal: Story = {
  args: { entryStep: 'language' },
  parameters: { layout: 'fullscreen' },
};
