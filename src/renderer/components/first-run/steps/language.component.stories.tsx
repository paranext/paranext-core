import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import type { LanguageInfo } from 'platform-bible-react';
import { LanguageStep } from './language.component';
// Deep relative (not aliased) so the story controls the webpack-aliased renderer-hooks mock without
// pulling it into tsc typecheck. Mirrors how extension stories reach `.storybook/*` helpers.
import { withFirstRunLanguage } from '../../../../../.storybook/mocks/first-run-language-mock-channel';

// English plus four non-English scripts, each with the setup-dialog localization keys, so all five
// qualify for the picker. Autonyms are shown in-script (the picker never renders the English names).
const MULTIPLE_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  fr: { autonym: 'Français', uiNames: { en: 'French' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
  'zh-hant': { autonym: '中文（繁體）', uiNames: { en: 'Chinese (Traditional)' } },
};

const ENGLISH_ONLY: Record<string, LanguageInfo> = { en: { autonym: 'English' } };

const meta: Meta<typeof LanguageStep> = {
  title: 'First run/LanguageStep',
  component: LanguageStep,
  tags: ['autodocs'],
  // The shell owns the footer; the step reports whether Next may be enabled and requests advance.
  args: { onNext: fn(), setCanProceed: fn() },
};
export default meta;

type Story = StoryObj<typeof LanguageStep>;

/** Language list with English pre-selected (the first-run default). */
export const Default: Story = {
  decorators: [
    withFirstRunLanguage({
      interfaceLanguage: ['en'],
      setupLanguages: { en: { autonym: 'English' }, es: { autonym: 'Español' } },
    }),
  ],
};

/** English plus four other qualifying languages, each shown by its in-script autonym. */
export const MultipleLanguages: Story = {
  decorators: [
    withFirstRunLanguage({
      interfaceLanguage: ['en'],
      setupLanguages: MULTIPLE_LANGUAGES,
      availableLanguages: MULTIPLE_LANGUAGES,
    }),
  ],
};

/** Only English qualifies, so the picker collapses to a single option and hides its search box. */
export const EnglishOnly: Story = {
  decorators: [
    withFirstRunLanguage({
      interfaceLanguage: ['en'],
      setupLanguages: ENGLISH_ONLY,
      availableLanguages: ENGLISH_ONLY,
    }),
  ],
};
