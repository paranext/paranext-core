import type { LanguageInfo } from '../ui-language-selector.component';
import type { InterfaceLanguagePickerLocalizedStrings } from './interface-language-picker.component';

/** Sample localized strings shared by the InterfaceLanguagePicker stories and tests. */
export const SAMPLE_LOCALIZED_STRINGS: InterfaceLanguagePickerLocalizedStrings = {
  '%firstRun_language_search_placeholder%': 'Search languages',
  '%firstRun_language_noResults%': 'No matching languages',
  '%firstRun_language_selected%': 'Selected',
};

/**
 * Sample languages shared by the InterfaceLanguagePicker stories and tests. Includes an entry with
 * `uiNames` (searchable by an English name) and one with `otherNames` (searchable, never
 * displayed).
 */
export const SAMPLE_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  'zh-hans': { autonym: '中文（简体）', uiNames: { en: 'Chinese (Simplified)' } },
  tpi: { autonym: 'Tok Pisin', otherNames: ['Pidgin'] },
};
