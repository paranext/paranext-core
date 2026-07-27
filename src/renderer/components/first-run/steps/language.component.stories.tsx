import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { type ComponentType } from 'react';
import type { LanguageInfo } from 'platform-bible-react';
import { LanguageStep } from './language.component';
// Deep relative (not aliased) so the story controls the webpack-aliased renderer-hooks mock without
// pulling it into tsc typecheck. Mirrors how extension stories reach `.storybook/*` helpers.
import {
  type FirstRunLanguageMock,
  FirstRunLanguageMockContext,
} from '../../../../../.storybook/mocks/first-run-language-mock-channel';

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

// Each story wraps its component in a FirstRunLanguageMockContext.Provider so stories rendered
// simultaneously on the autodocs page each read their own mock rather than a shared global.
// The resolved mock is created once (outside the render function) to keep the Provider value
// reference stable — avoids unnecessary re-renders of all context consumers.
function withFirstRunMock(mock: Partial<FirstRunLanguageMock>) {
  const resolvedMock: FirstRunLanguageMock = {
    interfaceLanguage: ['en'],
    setupLanguages: { en: { autonym: 'English' } },
    availableLanguages: { en: { autonym: 'English' } },
    isLoading: false,
    ...mock,
  };
  return function StoryDecorator(Story: ComponentType) {
    return (
      <FirstRunLanguageMockContext.Provider value={resolvedMock}>
        <Story />
      </FirstRunLanguageMockContext.Provider>
    );
  };
}

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
    withFirstRunMock({
      interfaceLanguage: ['en'],
      setupLanguages: { en: { autonym: 'English' }, es: { autonym: 'Español' } },
    }),
  ],
};

/** English plus four other qualifying languages, each shown by its in-script autonym. */
export const MultipleLanguages: Story = {
  decorators: [
    withFirstRunMock({
      interfaceLanguage: ['en'],
      setupLanguages: MULTIPLE_LANGUAGES,
      availableLanguages: MULTIPLE_LANGUAGES,
    }),
  ],
};

/** Only English qualifies, so the picker collapses to a single option and hides its search box. */
export const EnglishOnly: Story = {
  decorators: [
    withFirstRunMock({
      interfaceLanguage: ['en'],
      setupLanguages: ENGLISH_ONLY,
      availableLanguages: ENGLISH_ONLY,
    }),
  ],
};
