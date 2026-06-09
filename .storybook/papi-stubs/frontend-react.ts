/**
 * Storybook stub for `@papi/frontend/react`.
 *
 * Mirrors the runtime React hooks the extension host injects. `useLocalizedStrings` delegates to
 * the Storybook localization helper so web-view stories render real English text; the remaining
 * hooks return inert defaults so components bundle and render without a live PAPI connection.
 */

import { getLocalizedStrings } from '../localization.utils';

/** See `useLocalizedStrings` in papi.d.ts: returns `[localizedStrings, isLoading]`. */
export function useLocalizedStrings(localizationKeys: string[]): [Record<string, string>, boolean] {
  return [getLocalizedStrings(localizationKeys ?? []), false];
}

/** See `useSetting` in papi.d.ts: returns `[setting, setSetting, resetSetting, isLoading]`. */
export function useSetting<T>(
  key: string,
  defaultState: T,
): [T, (newData: T) => Promise<undefined>, () => void, boolean] {
  return [defaultState, async () => undefined, () => {}, false];
}

/**
 * Generic fallbacks for the remaining renderer hooks. Other extensions' stories may pull these in;
 * they return inert tuples so destructuring at the call site does not throw. Typed as `unknown[]`
 * to avoid `any` - consumers live in separate files and resolve against the real papi.d.ts.
 */
export const useProjectSetting = (): unknown[] => [undefined, async () => undefined];
export const useProjectDataProvider = (): unknown => undefined;
export const useData = (): unknown[] => [undefined, async () => undefined, false];
