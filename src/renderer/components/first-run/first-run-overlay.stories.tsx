import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { LanguageInfo } from 'platform-bible-react';
import { FirstRunGate } from './first-run-overlay.component';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock: the gate
// renders real English chrome, and the WizardActive story's embedded LanguageStep shows a realistic
// multi-language picker instead of the raw-key / English-only Storybook fallback.
import {
  resetFirstRunLanguageMock,
  setFirstRunLanguageMock,
} from '../../../../.storybook/mocks/first-run-language-mock-channel';

const SETUP_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
};

const meta: Meta<typeof FirstRunGate> = {
  title: 'First run/FirstRunGate',
  component: FirstRunGate,
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

type Story = StoryObj<typeof FirstRunGate>;

export const Loading: Story = { args: { status: { kind: 'loading' } } };
// slowRevealMs: 0 reveals the "taking longer" escape immediately so the slow-loading state is
// visible in Storybook without waiting out the real ~15s threshold.
export const SlowLoading: Story = { args: { status: { kind: 'loading' }, slowRevealMs: 0 } };
export const ErrorState: Story = { args: { status: { kind: 'error' } } };
export const WizardActive: Story = { args: { status: { kind: 'wizard', step: 'language' } } };
