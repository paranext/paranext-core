/**
 * Storybook stub for `@renderer/hooks/papi-hooks`.
 *
 * Mirrors the hooks that renderer components import from this barrel. `useLocalizedStrings`
 * delegates to the Storybook localization helper so renderer-component stories render real English
 * text; the remaining hooks return inert defaults so components render without a live PAPI
 * connection.
 *
 * Webpack aliases `@renderer/hooks/papi-hooks` to this file in `.storybook/main.ts` (exact-match
 * `$` key). Submodule imports (e.g. `.../use-localized-strings-hook`) are not aliased and should
 * not be used directly in stories.
 */

import type { LocalizeKey } from 'platform-bible-utils';
import { getLocalizedStrings } from '../localization.utils';

/** Returns resolved English strings instead of the raw localization keys. */
export function useLocalizedStrings(keys: LocalizeKey[]): [Record<string, string>, boolean] {
  return [getLocalizedStrings(keys ?? []), false];
}

export const useData = (): unknown[] => [undefined, async () => undefined, false];

export const useDataProvider = (): unknown => undefined;

export const useScrollGroupScrRef = (): unknown[] => [undefined, async () => undefined, false];

export function useSetting<T>(
  _key: string,
  defaultState: T,
): [T, (newData: T) => Promise<undefined>, () => void, boolean] {
  return [defaultState, async () => undefined, () => {}, false];
}

/**
 * `useProjectData` is accessed as `useProjectData(type, id).<DataMethod>(selector, default)`. The
 * Proxy returns an inert `[data, setData, isLoading]` tuple for any data-method name.
 */
export const useProjectData = (): unknown =>
  new Proxy(
    {},
    {
      get: () => (): unknown[] => [undefined, async () => undefined, false],
    },
  );

export const useProjectDataProvider = (): unknown => undefined;

export const useProjectSetting = (): unknown[] => [undefined, async () => undefined];

export const useDialogCallback = (): unknown => () => {};

export const useDataProviderMulti = (): unknown[] => [];

export const useWebViewController = (): unknown => undefined;

export const useRecentScriptureRefs = (): unknown[] => [[], () => {}];
