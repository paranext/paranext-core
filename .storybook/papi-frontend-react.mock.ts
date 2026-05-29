/**
 * Storybook stub for `@papi/frontend/react`.
 *
 * `@papi/frontend/react` is a webpack _external_ in the extension build
 * (`extensions/webpack/webpack.config.base.ts`) — it is provided by the extension host at runtime,
 * not bundled — and is aliased to a vitest mock in `extensions/vitest.config.ts`. Storybook extends
 * the _renderer_ webpack config, which has neither the external nor the vitest alias, so any
 * extension component that imports from `@papi/frontend/react` (e.g. the inventory wrappers'
 * `useLocalizedStrings` header-label hook) would otherwise fail to resolve during `npx storybook
 * build`.
 *
 * This stub mirrors the vitest-mock approach but stays vitest-free so it loads in the Storybook
 * webpack build. `useLocalizedStrings` resolves keys against the same English localization map the
 * `.storybook/localization.utils` helper uses, so cloned components render real header labels in
 * Storybook without any production wiring. Stories still own all sample data via their decorators.
 */

import { useMemo } from 'react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { getLocalizedStrings } from './localization.utils';

/**
 * Storybook stand-in for the PAPI `useLocalizedStrings` hook. Resolves the requested keys against
 * the bundled English localization map (falling back to the key itself when unknown), matching the
 * `[strings, isLoading]` tuple shape of the real hook.
 */
export function useLocalizedStrings(keys: LocalizeKey[]): [LanguageStrings, boolean] {
  const localizedStrings = useMemo<LanguageStrings>(() => {
    const resolved = getLocalizedStrings(keys);
    const result: LanguageStrings = {};
    keys.forEach((key) => {
      result[key] = resolved[key] ?? key;
    });
    return result;
  }, [keys]);
  return [localizedStrings, false];
}

/** Storybook stand-in for the PAPI `useProjectSetting` hook (not exercised by these stories). */
export function useProjectSetting() {
  return [undefined, () => {}, false] as const;
}

/** Storybook stand-in for the PAPI `useProjectDataProvider` hook (not exercised by these stories). */
export function useProjectDataProvider() {
  return undefined;
}
