import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import type { LanguageInfo } from 'platform-bible-react';
import { LanguageStep } from './language.component';
// Deep relative (not aliased) so the story controls the webpack-aliased renderer-hooks mock without
// pulling it into tsc typecheck. Mirrors how extension stories reach `.storybook/*` helpers.
import {
  resetFirstRunLanguageMock,
  setFirstRunLanguageMock,
} from '../../../../../.storybook/mocks/first-run-language-mock-channel';

// English plus two non-English scripts, each with the setup-dialog localization keys, so all three
// qualify for the picker. Autonyms are shown in-script (the picker never renders the English names).
const MULTIPLE_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
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
  beforeEach: () => {
    setFirstRunLanguageMock({
      interfaceLanguage: ['en'],
      setupLanguages: { en: { autonym: 'English' }, es: { autonym: 'Español' } },
    });
    return resetFirstRunLanguageMock;
  },
};

/** English plus two other qualifying languages, each shown by its in-script autonym. */
export const MultipleLanguages: Story = {
  beforeEach: () => {
    setFirstRunLanguageMock({
      interfaceLanguage: ['en'],
      setupLanguages: MULTIPLE_LANGUAGES,
      availableLanguages: MULTIPLE_LANGUAGES,
    });
    return resetFirstRunLanguageMock;
  },
};

/** Only English qualifies, so the picker collapses to a single option and hides its search box. */
export const EnglishOnly: Story = {
  beforeEach: () => {
    setFirstRunLanguageMock({
      interfaceLanguage: ['en'],
      setupLanguages: ENGLISH_ONLY,
      availableLanguages: ENGLISH_ONLY,
    });
    return resetFirstRunLanguageMock;
  },
};
