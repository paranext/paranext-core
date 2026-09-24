import { LanguageInfo } from 'platform-bible-react';

/**
 * Hardcoded display metadata (autonym + names in other UI languages) for known interface languages,
 * keyed by the raw locale-file tag (e.g. `zh-hans`).
 *
 * ENHANCE: source this from SLDR/langtags instead of hardcoding so new locales get an in-script
 * autonym automatically (see the SLDR note in the PT-4176 design spec). Until then, adding a locale
 * file requires adding an entry here — enforced by `language-details.data.test.ts`.
 */
export const languageDetails: Record<string, LanguageInfo> = {
  en: {
    autonym: 'English',
    uiNames: { es: 'inglés', de: 'Englisch', fr: 'Anglais', km: 'ភាសាអង់គ្លេស' },
  },
  es: { autonym: 'Español', uiNames: { en: 'Spanish', de: 'Spanisch' } },
  fr: { autonym: 'Français', uiNames: { en: 'French', de: 'Französisch', es: 'francés' } },
  de: { autonym: 'Deutsch', uiNames: { en: 'German', es: 'alemán', fr: 'Allemand' } },
  km: { autonym: 'ខ្មែរ', uiNames: { en: 'Khmer', es: 'jemer', de: 'Khmer', fr: 'Khmer' } },
  zh: { autonym: '中文', uiNames: { en: 'Chinese', es: 'chino' } },
  'zh-hans': {
    autonym: '中文（简体）',
    uiNames: { en: 'Chinese (Simplified)', es: 'chino (simplificado)' },
  },
  'zh-hant': {
    autonym: '中文（繁體）',
    uiNames: { en: 'Chinese (Traditional)', es: 'chino (tradicional)' },
  },
  hi: { autonym: 'हिन्दी', uiNames: { en: 'Hindi', es: 'hindi' } },
  ar: { autonym: 'العربية', uiNames: { en: 'Arabic', es: 'árabe' } },
};

export default languageDetails;
