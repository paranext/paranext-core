import { useData, useLocalizedStrings, useSetting } from '@renderer/hooks/papi-hooks';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { InterfaceLanguagePicker, type LanguageInfo } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo } from 'react';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_language_title%',
  '%firstRun_language_instruction%',
  '%firstRun_language_search_placeholder%',
  '%firstRun_language_noResults%',
  '%firstRun_language_selected%',
];

const DEFAULT_SETUP_LANGUAGES: Record<string, LanguageInfo> = { en: { autonym: 'English' } };

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
  ).SetupDialogLanguages(undefined, DEFAULT_SETUP_LANGUAGES);
  const setupLanguages: Record<string, LanguageInfo> = isPlatformError(setupLanguagesPossiblyError)
    ? DEFAULT_SETUP_LANGUAGES
    : setupLanguagesPossiblyError;

  // All known interface languages (with real in-script autonyms) — used only to render the current
  // selection with its proper autonym when it doesn't meet the setup-dialog threshold.
  const [availableLanguagesPossiblyError] = useData(
    localizationService.dataProviderName,
  ).AvailableInterfaceLanguages(undefined, DEFAULT_SETUP_LANGUAGES);
  const availableLanguages = isPlatformError(availableLanguagesPossiblyError)
    ? DEFAULT_SETUP_LANGUAGES
    : availableLanguagesPossiblyError;

  // Always keep the current selection in the list so it shows as selected even if it doesn't meet
  // the setup-dialog threshold; prefer its real autonym, falling back to the raw tag if unknown.
  // Memoized so the picker's own sort memo (keyed on this object) isn't defeated each render.
  const languages = useMemo<Record<string, LanguageInfo>>(() => {
    const merged = { ...setupLanguages };
    if (!merged[primaryLanguage])
      merged[primaryLanguage] = availableLanguages[primaryLanguage] ?? { autonym: primaryLanguage };
    return merged;
  }, [setupLanguages, availableLanguages, primaryLanguage]);

  // Don't let the user advance before languages load (avoids advancing on a premature default).
  useEffect(() => {
    setCanProceed?.(!isLoading);
  }, [isLoading, setCanProceed]);

  const handleChange = (tag: string) => {
    if (tag === primaryLanguage) return;
    // setInterfaceLanguage is async; catch the rejection so a failed write is logged, not swallowed.
    setInterfaceLanguage([tag, ...safeInterfaceLanguage.filter((l) => l !== tag)]).catch(
      (e: unknown) => {
        logger.warn(`LanguageStep: failed to set interface language: ${getErrorMessage(e)}`);
      },
    );
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
        // `strings` is a superset of the picker's keys; it reads only the ones it needs.
        localizedStrings={strings}
      />
    </div>
  );
}

export default LanguageStep;
