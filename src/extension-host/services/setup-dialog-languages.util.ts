import { LanguageInfo } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';

/** Fraction of the English setup-dialog baseline keys a language must have to appear in the picker. */
export const SETUP_DIALOG_LOCALIZATION_THRESHOLD = 0.9;

/** Localize keys in this namespace make up the setup dialog. */
export const SETUP_DIALOG_KEY_PREFIX = '%firstRun_';

/**
 * Throwaway per-step placeholder keys are excluded from the baseline (they get removed as steps
 * ship).
 */
const SETUP_DIALOG_PLACEHOLDER_PATTERN = /^%firstRun_step_.*_placeholder%$/;

/** The English-baseline setup-dialog keys (namespace-scoped, placeholders excluded). */
function getBaselineKeys(englishData: LanguageStrings | undefined): string[] {
  return Object.keys(englishData ?? {}).filter(
    (key) => key.startsWith(SETUP_DIALOG_KEY_PREFIX) && !SETUP_DIALOG_PLACEHOLDER_PATTERN.test(key),
  );
}

/**
 * Count how many of `keys` are present in `data`. Uses `hasOwnProperty` so we can index the
 * `LocalizeKey`-typed `LanguageStrings` map with plain string keys without a type assertion.
 */
function countPresentKeys(data: LanguageStrings, keys: string[]): number {
  return keys.filter((key) => Object.prototype.hasOwnProperty.call(data, key)).length;
}

/**
 * Computes the interface languages that qualify for the setup dialog: those with at least
 * {@link SETUP_DIALOG_LOCALIZATION_THRESHOLD} of the English setup-dialog baseline keys localized.
 * English always qualifies (it is the ultimate fallback). Keys of the returned map are the raw
 * locale tags from `loadedLocales`.
 *
 * Note: params are typed `LanguageStrings` (the combiner's return type), NOT
 * `Record<string,string>` — `LanguageStrings` is keyed by the `%${string}%` `LocalizeKey`, which is
 * not assignable to a `string`-keyed record, so the host's `getLocalizedStringData` result would
 * not typecheck otherwise.
 */
export function computeSetupDialogLanguages(
  englishData: LanguageStrings | undefined,
  getLangData: (tag: string) => LanguageStrings | undefined,
  loadedLocales: Record<string, LanguageInfo>,
  threshold: number = SETUP_DIALOG_LOCALIZATION_THRESHOLD,
): Record<string, LanguageInfo> {
  const baselineKeys = getBaselineKeys(englishData);
  const qualifying: Record<string, LanguageInfo> = {};

  Object.entries(loadedLocales).forEach(([tag, info]) => {
    if (tag === 'en') {
      qualifying[tag] = info;
      return;
    }
    if (baselineKeys.length === 0) return;
    const langData = getLangData(tag);
    if (!langData) return;
    const count = countPresentKeys(langData, baselineKeys);
    if (count / baselineKeys.length >= threshold) qualifying[tag] = info;
  });

  return qualifying;
}

export default computeSetupDialogLanguages;
