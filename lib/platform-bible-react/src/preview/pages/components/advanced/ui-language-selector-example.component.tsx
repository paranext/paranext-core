import UiLanguageSelector, {
  LanguageInfo,
} from '@/components/advanced/ui-language-selector.component';
import { useState } from 'react';

const localizedStrings = {
  '%webView_uiLanguageSelector_selectFallbackLanguages%': 'Fallback languages',
};

const languages: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish', de: 'Spanisch' } },
  fr: { autonym: 'Français', uiNames: { en: 'French', de: 'Französisch', es: 'francés' } },
  de: { autonym: 'Deutsch', uiNames: { en: 'German', es: 'alemán', fr: 'Allemand' } },
  zh: { autonym: '中文', uiNames: { en: 'Chinese', es: 'chino' } },
  hi: { autonym: 'हिन्दी', uiNames: { en: 'Hindi', es: 'hindi' } },
  ar: { autonym: 'العربية', uiNames: { en: 'Arabic', es: 'árabe' } },
};

function UiLanguageSelectorExample() {
  const [primary, setPrimary] = useState('fr');
  const [fallback, setFallback] = useState<string[] | undefined>(undefined);

  return (
    <UiLanguageSelector
      knownUiLanguages={languages}
      primaryLanguage={primary}
      fallbackLanguages={fallback}
      handleLanguageChanges={(newUiLanguages: string[]) => {
        console.log(`Total count: ${newUiLanguages.length}`);
      }}
      handlePrimaryLanguageChange={(newPrimaryUiLanguageTag: string) => {
        setPrimary(newPrimaryUiLanguageTag);
        console.log(`New primary UI language : ${languages[newPrimaryUiLanguageTag].autonym}`);
      }}
      handleFallbackLanguagesChange={(newFallbacks) => {
        const fallbackList = newFallbacks.map((tag) => languages[tag].autonym);
        setFallback(newFallbacks);
        console.log(`New fallback UI languages:`, fallbackList);
      }}
      localizedStrings={localizedStrings}
    />
  );
}

export default UiLanguageSelectorExample;
