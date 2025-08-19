import type { Meta, StoryObj } from '@storybook/react-vite';
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
    <UiLanguageSelector
      knownUiLanguages={mockKnownLanguages}
      primaryLanguage="en"
      fallbackLanguages={[]}
      onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)}
      onPrimaryLanguageChange={(languageCode: string) =>
        console.log('Primary language changed to:', languageCode)
      }
      onFallbackLanguagesChange={(fallbackLanguages: string[]) =>
        console.log('Fallback languages changed to:', fallbackLanguages)
      }
      localizedStrings={{
        '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Select fallback languages',
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
    <UiLanguageSelector
      knownUiLanguages={mockKnownLanguages}
      primaryLanguage="es"
      fallbackLanguages={['en', 'pt']}
      onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)}
      onPrimaryLanguageChange={(languageCode: string) =>
        console.log('Primary language changed to:', languageCode)
      }
      onFallbackLanguagesChange={(fallbackLanguages: string[]) =>
        console.log('Fallback languages changed to:', fallbackLanguages)
      }
      localizedStrings={{
        '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Seleccionar idiomas de respaldo',
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
      <UiLanguageSelector
        knownUiLanguages={limitedLanguages}
        primaryLanguage="en"
        fallbackLanguages={[]}
        onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)}
        onPrimaryLanguageChange={(languageCode: string) =>
          console.log('Primary language changed to:', languageCode)
        }
        onFallbackLanguagesChange={(fallbackLanguages: string[]) =>
          console.log('Fallback languages changed to:', fallbackLanguages)
        }
        localizedStrings={{
          '%settings_uiLanguageSelector_selectFallbackLanguages%': 'Select fallback languages',
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
      <UiLanguageSelector
        knownUiLanguages={asianLanguages}
        primaryLanguage="zh-hans"
        fallbackLanguages={['en']}
        onLanguagesChange={(languages: string[]) => console.log('Languages changed to:', languages)}
        onPrimaryLanguageChange={(languageCode: string) =>
          console.log('Primary language changed to:', languageCode)
        }
        onFallbackLanguagesChange={(fallbackLanguages: string[]) =>
          console.log('Fallback languages changed to:', fallbackLanguages)
        }
        localizedStrings={{
          '%settings_uiLanguageSelector_selectFallbackLanguages%': '选择后备语言',
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
