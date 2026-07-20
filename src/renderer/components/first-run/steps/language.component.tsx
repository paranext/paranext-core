import { useData, useLocalizedStrings, useSetting } from '@renderer/hooks/papi-hooks';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { InterfaceLanguagePicker, type LanguageInfo } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect } from 'react';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_language_title%',
  '%firstRun_language_instruction%',
  '%firstRun_language_search_placeholder%',
  '%firstRun_language_noResults%',
  '%firstRun_language_selected%',
];

const DEFAULT_AVAILABLE_LANGUAGES: Record<string, LanguageInfo> = { en: { autonym: 'English' } };

/**
 * First-run wizard step: choose the interface language. Offers the languages that have setup-dialog
 * localizations (plus the current selection, always), applies the choice immediately (which
 * re-renders the wizard in that language), and lets the shell's Next button advance.
 */
export function LanguageStep({ setCanProceed }: FirstRunStepProps) {
  const [strings] = useLocalizedStrings(KEYS);

  const [interfaceLanguage, setInterfaceLanguage] = useSetting('platform.interfaceLanguage', [
    'en',
  ]);
  const safeInterfaceLanguage =
    isPlatformError(interfaceLanguage) || interfaceLanguage.length === 0
      ? ['en']
      : interfaceLanguage;
  const primaryLanguage = safeInterfaceLanguage[0] ?? 'en';

  const [setupLanguagesPossiblyError, , isLoading] = useData(
    localizationService.dataProviderName,
  ).SetupDialogLanguages(undefined, DEFAULT_AVAILABLE_LANGUAGES);
  const setupLanguages: Record<string, LanguageInfo> = isPlatformError(setupLanguagesPossiblyError)
    ? DEFAULT_AVAILABLE_LANGUAGES
    : setupLanguagesPossiblyError;

  // Always keep the current selection in the list so it shows as selected even if it doesn't meet
  // the setup-dialog threshold (mirrors setting.component.tsx). Falls back to the raw tag as autonym.
  const languages: Record<string, LanguageInfo> = { ...setupLanguages };
  if (!languages[primaryLanguage]) languages[primaryLanguage] = { autonym: primaryLanguage };

  // Don't let the user advance before languages load (avoids advancing on a premature default).
  useEffect(() => {
    setCanProceed?.(!isLoading);
  }, [isLoading, setCanProceed]);

  const handleChange = (tag: string) => {
    if (tag === primaryLanguage) return;
    try {
      setInterfaceLanguage([tag, ...safeInterfaceLanguage.filter((l) => l !== tag)]);
    } catch (e: unknown) {
      logger.warn(`LanguageStep: failed to set interface language: ${getErrorMessage(e)}`);
    }
  };

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h2 className="tw:text-base tw:font-medium">{strings['%firstRun_language_title%']}</h2>
        <p className="tw:text-xs tw:text-muted-foreground">
          {strings['%firstRun_language_instruction%']}
        </p>
      </div>
      <InterfaceLanguagePicker
        languages={languages}
        value={primaryLanguage}
        onChange={handleChange}
        localizedStrings={{
          '%firstRun_language_search_placeholder%':
            strings['%firstRun_language_search_placeholder%'],
          '%firstRun_language_noResults%': strings['%firstRun_language_noResults%'],
          '%firstRun_language_selected%': strings['%firstRun_language_selected%'],
        }}
      />
    </div>
  );
}

export default LanguageStep;
