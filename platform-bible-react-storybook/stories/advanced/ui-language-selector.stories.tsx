import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useCallback, useState } from 'react';
import {
  UiLanguageSelector,
  LanguageInfo,
} from '@/components/advanced/ui-language-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const mockKnownLanguages: Record<string, LanguageInfo> = {
  en: {
    autonym: 'English',
    uiNames: { es: 'Inglés', fr: 'Anglais', de: 'Englisch' },
  },
  es: {
    autonym: 'Español',
    uiNames: { en: 'Spanish', fr: 'Espagnol', de: 'Spanisch' },
  },
  fr: {
    autonym: 'Français',
    uiNames: { en: 'French', es: 'Francés', de: 'Französisch' },
  },
  de: {
    autonym: 'Deutsch',
    uiNames: { en: 'German', es: 'Alemán', fr: 'Allemand' },
  },
  pt: {
    autonym: 'Português',
    uiNames: { en: 'Portuguese', es: 'Portugués', fr: 'Portugais', de: 'Portugiesisch' },
  },
  'zh-hans': {
    autonym: '简体中文',
    uiNames: { en: 'Chinese (Simplified)', es: 'Chino (Simplificado)', fr: 'Chinois (Simplifié)' },
  },
  'zh-hant': {
    autonym: '繁體中文',
    uiNames: {
      en: 'Chinese (Traditional)',
      es: 'Chino (Tradicional)',
      fr: 'Chinois (Traditionnel)',
    },
  },
  ja: {
    autonym: '日本語',
    uiNames: { en: 'Japanese', es: 'Japonés', fr: 'Japonais', de: 'Japanisch' },
  },
  ko: {
    autonym: '한국어',
    uiNames: { en: 'Korean', es: 'Coreano', fr: 'Coréen', de: 'Koreanisch' },
  },
  ar: {
    autonym: 'العربية',
    uiNames: { en: 'Arabic', es: 'Árabe', fr: 'Arabe', de: 'Arabisch' },
  },
};

const handleLanguagesChange = (languages: string[]) => {
  console.log('Languages changed to:', languages);
};

// Reusable wrapper component with state management
function UiLanguageSelectorWithState({
  initialPrimaryLanguage = 'en',
  initialFallbackLanguages = [],
  ...props
}: {
  initialPrimaryLanguage?: string;
  initialFallbackLanguages?: string[];
} & Omit<
  ComponentProps<typeof UiLanguageSelector>,
  | 'primaryLanguage'
  | 'fallbackLanguages'
  | 'onLanguagesChange'
  | 'onPrimaryLanguageChange'
  | 'onFallbackLanguagesChange'
>) {
  const [primaryLanguage, setPrimaryLanguage] = useState(initialPrimaryLanguage);
  const [fallbackLanguages, setFallbackLanguages] = useState(initialFallbackLanguages);

  const handlePrimaryLanguageChange = useCallback((languageCode: string) => {
    setPrimaryLanguage(languageCode);
    console.log('Primary language changed to:', languageCode);
  }, []);

  const handleFallbackLanguagesChange = useCallback((fallbackLangs: string[]) => {
    setFallbackLanguages(fallbackLangs);
    console.log('Fallback languages changed to:', fallbackLangs);
  }, []);

  return (
    <UiLanguageSelector
      {...props}
      primaryLanguage={primaryLanguage}
      fallbackLanguages={fallbackLanguages}
      onLanguagesChange={handleLanguagesChange}
      onPrimaryLanguageChange={handlePrimaryLanguageChange}
      onFallbackLanguagesChange={handleFallbackLanguagesChange}
    />
  );
}

const meta: Meta<typeof UiLanguageSelector> = {
  title: 'Advanced/UI Language Selector',
  component: UiLanguageSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-md tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof UiLanguageSelector>;

export const Default: Story = {
  render: () => (
    <UiLanguageSelectorWithState
      knownUiLanguages={mockKnownLanguages}
      localizedStrings={{
        '%settings_uiLanguageSelector_fallbackLanguages%': 'Fallback languages',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A language selector component for changing the UI language.',
      },
    },
  },
};

export const WithFallbackLanguages: Story = {
  render: () => (
    <UiLanguageSelectorWithState
      knownUiLanguages={mockKnownLanguages}
      initialPrimaryLanguage="es"
      initialFallbackLanguages={['en', 'pt']}
      localizedStrings={{
        '%settings_uiLanguageSelector_fallbackLanguages%': 'Idiomas de respaldo de Interfaz',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Language selector with Spanish primary and English/Portuguese fallback languages.',
      },
    },
  },
};

export const LimitedLanguages: Story = {
  render: () => {
    const limitedLanguages = Object.fromEntries(Object.entries(mockKnownLanguages).slice(0, 4));

    return (
      <UiLanguageSelectorWithState
        knownUiLanguages={limitedLanguages}
        localizedStrings={{
          '%settings_uiLanguageSelector_fallbackLanguages%': 'Fallback Languages',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector with a limited set of available languages.',
      },
    },
  },
};

export const AsianLanguages: Story = {
  render: () => {
    const asianLanguages = {
      'zh-hans': mockKnownLanguages['zh-hans'],
      'zh-hant': mockKnownLanguages['zh-hant'],
      ja: mockKnownLanguages.ja,
      ko: mockKnownLanguages.ko,
      en: mockKnownLanguages.en,
    };

    return (
      <UiLanguageSelectorWithState
        knownUiLanguages={asianLanguages}
        initialPrimaryLanguage="zh-hans"
        initialFallbackLanguages={['en']}
        localizedStrings={{
          '%settings_uiLanguageSelector_fallbackLanguages%': '后备语言',
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selector focused on Asian languages with Chinese (Simplified) as primary.',
      },
    },
  },
};
