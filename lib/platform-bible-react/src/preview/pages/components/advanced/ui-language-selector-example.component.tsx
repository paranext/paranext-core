import UiLanguageSelector, {
  LanguageInfo,
} from '@/components/advanced/ui-language-selector.component';
import { useState } from 'react';

const localizedStrings = {
  '%webView_uiLanguageSelector_selectFallbackLanguages%': 'Fallback languages',
};

const languages: LanguageInfo[] = [
  { tag: 'en', autonym: 'English' },
  { tag: 'es', autonym: 'Español', uiNames: { en: 'Spanish', de: 'Spanisch' } },
  { tag: 'fr', autonym: 'Français', uiNames: { en: 'French', de: 'Französisch', es: 'francés' } },
  { tag: 'de', autonym: 'Deutsch', uiNames: { en: 'German', es: 'alemán', fr: 'Allemand' } },
  { tag: 'zh', autonym: '中文', uiNames: { en: 'Chinese', es: 'chino' } },
  { tag: 'hi', autonym: 'हिन्दी', uiNames: { en: 'Hindi', es: 'hindi' } },
  { tag: 'ar', autonym: 'العربية', uiNames: { en: 'Arabic', es: 'árabe' } },
];

function UiLanguageSelectorExample() {
  const [primary, setPrimary] = useState(languages[3]);
  const [fallback, setFallback] = useState<LanguageInfo[] | undefined>(undefined);

  return (
    <UiLanguageSelector
      knownUiLanguages={languages}
      primaryLanguage={primary}
      fallbackLanguages={fallback}
      handlePrimaryLanguageChange={(newPrimaryUiLanguageTag) => {
        const uiLang = languages.find((l) => l.tag === newPrimaryUiLanguageTag);
        if (uiLang) {
          setPrimary(uiLang);
          console.log(`New primary UI language : ${uiLang}`);
        }
      }}
      handleFallbackLanguagesChange={(newFallbacks) => {
        const fallbackList = newFallbacks
          .map((tag) => languages.find((l) => l.tag === tag))
          .filter((lang): lang is LanguageInfo => !!lang); // Ensure all items are defined

        setFallback(fallbackList);
        console.log(`New fallback UI languages:`, fallbackList);
      }}
      localizedStrings={localizedStrings}
    />
  );
}

export default UiLanguageSelectorExample;
