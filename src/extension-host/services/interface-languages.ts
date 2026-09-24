import type { LanguageInfo } from 'platform-bible-react';
import { AsyncVariable } from 'platform-bible-utils';

/**
 * The interface languages offered to users: in the interface-language pickers (Settings, the
 * profile popover, the first-run wizard) and to the first-run default taken from the OS locale.
 * Every other locale file still ships and still renders when `platform.interfaceLanguage` names it
 * explicitly; it is only not offered. Offering another language is a one-line change here.
 *
 * PT-4457 is expected to replace this list with a rule based on translation coverage. That rule
 * must measure coverage across the whole app, not only the setup dialog's `%firstRun_` keys: a
 * locale can have the whole setup dialog translated and almost nothing else.
 */
export const OFFERED_INTERFACE_LANGUAGES: readonly string[] = ['en', 'es'];

/**
 * Display info for every interface language that has a locale file, keyed by the raw locale-file
 * tag (e.g. `zh-hans`). Filled by the localization service while it reads the locale files.
 */
export const loadedLocales: Record<string, LanguageInfo> = {};

// No timeout: a validator waiting here must get the real answer however long startup takes.
const loadedLocalesReady = new AsyncVariable<void>('loadedInterfaceLanguages', -1);
// A load failure that nothing is waiting on yet must not surface as an unhandled rejection; callers
// awaiting `loadedLocalesReady.promise` still see the rejection.
loadedLocalesReady.promise.catch(() => undefined);

/** Signals that `loadedLocales` is complete. Called by the localization service after loading. */
export function markLoadedLocalesReady(): void {
  loadedLocalesReady.resolveToValue(undefined);
}

/** Signals that the locale files could not be loaded, so waiting callers fail instead of hanging. */
export function markLoadedLocalesFailed(reason: string): void {
  loadedLocalesReady.rejectWithReason(reason);
}

/** Returns a new record holding only the entries of `locales` that are offered to users. */
export function filterToOffered(
  locales: Record<string, LanguageInfo>,
): Record<string, LanguageInfo> {
  return Object.fromEntries(
    Object.entries(locales).filter(([tag]) => OFFERED_INTERFACE_LANGUAGES.includes(tag)),
  );
}

/**
 * Every interface language that has a locale file, offered or not. Waits until the locale files
 * have been read; rejects if reading them failed. Use this to decide whether a language can be
 * used, and the localization service's getters to decide what to offer.
 */
export async function getAllLoadedInterfaceLanguages(): Promise<Record<string, LanguageInfo>> {
  await loadedLocalesReady.promise;
  return loadedLocales;
}
