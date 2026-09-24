import { useData, useLocalizedStrings, useSetting } from '@renderer/hooks/papi-hooks';
import { includeCurrentLanguages } from '@renderer/services/include-current-languages';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { InterfaceLanguagePicker, type LanguageInfo } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_language_title%',
  '%firstRun_language_instruction%',
  '%firstRun_language_search_placeholder%',
  '%firstRun_language_noResults%',
  '%firstRun_language_selected%',
  '%firstRun_language_setFailed%',
];

const ENGLISH_FALLBACK_LANGUAGES: Record<string, LanguageInfo> = { en: { autonym: 'English' } };

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
  ).SetupDialogLanguages(undefined, ENGLISH_FALLBACK_LANGUAGES);
  const setupLanguages: Record<string, LanguageInfo> = isPlatformError(setupLanguagesPossiblyError)
    ? ENGLISH_FALLBACK_LANGUAGES
    : setupLanguagesPossiblyError;

  // Always keep the current selection in the list so it shows as selected even when it is not
  // offered or doesn't meet the setup-dialog threshold. Memoized so the picker's own sort memo
  // (keyed on this object) isn't defeated each render.
  const languages = useMemo(
    () => includeCurrentLanguages(setupLanguages, [primaryLanguage]),
    [setupLanguages, primaryLanguage],
  );

  // Don't let the user advance before languages load (avoids advancing on a premature default).
  useEffect(() => {
    setCanProceed?.(!isLoading);
  }, [isLoading, setCanProceed]);

  const handleChange = (tag: string) => {
    if (tag === primaryLanguage) return;
    // A missing setter is a real runtime state, not a type formality — `useSetting` has no setter
    // while the subscription is throttled — and this step gates first-run progress, so surface it
    // the same way a rejected write is surfaced rather than leaving the picker silently inert.
    if (!setInterfaceLanguage) {
      logger.warn('LanguageStep: cannot set interface language; the setting is unavailable');
      toast.error(strings['%firstRun_language_setFailed%']);
      return;
    }
    setInterfaceLanguage([tag, ...safeInterfaceLanguage.filter((l) => l !== tag)]).catch(
      (e: unknown) => {
        logger.warn(`LanguageStep: failed to set interface language: ${getErrorMessage(e)}`);
        toast.error(strings['%firstRun_language_setFailed%']);
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
