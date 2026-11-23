import type { LanguageInfo } from 'platform-bible-react';
import { AsyncVariable } from 'platform-bible-utils';

/**
 * Display info for every interface language that has a locale file, keyed by the raw locale-file
 * tag (e.g. `zh-hans`). Filled by the localization service while it reads the locale files. Which
 * of these are offered to users is decided by `OFFERED_INTERFACE_LANGUAGES` in
 * `@shared/data/interface-languages.data`.
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

/**
 * Every interface language that has a locale file, offered or not. Waits until the locale files
 * have been read; rejects if reading them failed. Use this to decide whether a language can be
 * used, and the localization service's getters to decide what to offer.
 */
export async function getAllLoadedInterfaceLanguages(): Promise<Record<string, LanguageInfo>> {
  await loadedLocalesReady.promise;
  return loadedLocales;
}
