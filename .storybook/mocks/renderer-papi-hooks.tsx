/**
 * Storybook mock for the renderer PAPI hooks barrel (`@renderer/hooks/papi-hooks`).
 *
 * `.storybook/main.ts` rewrites the exact barrel request `@renderer/hooks/papi-hooks` to this file
 * via a `NormalModuleReplacementPlugin` (a `resolve.alias` is silently overridden by the renderer
 * config's `TsconfigPathsPlugin`). The regex is anchored, so a component that imports a specific
 * `*.hook` sub-path — and this file's own re-export from the real barrel — still resolve normally.
 * The three hooks the first-run language step needs are replaced with inert, backend-free
 * implementations (mirroring `.storybook/papi-stubs/frontend-react.ts`): the real hooks reach the
 * settings/PAPI services, which are absent in Storybook and throw. Every OTHER hook is re-exported
 * unchanged from the real barrel.
 *
 * By default the inert hooks return their caller's default value (the same thing the real hooks
 * yield with no backend), so stories that don't opt in are unaffected. First-run stories opt in
 * with `setFirstRunLanguageMock(...)` (see `first-run-language-mock-channel.ts`) to drive the
 * language step's data — qualifying setup languages, available-language autonyms, the current
 * interface language (interactive), the loading flag — and to render real English strings.
 */
import { useState } from 'react';
import type { LanguageInfo } from 'platform-bible-react';
import type { LocalizeKey } from 'platform-bible-utils';
import { getLocalizedStrings } from '../localization.utils';
import { getFirstRunLanguageMock } from './first-run-language-mock-channel';

// Pass every other renderer hook straight through to the real implementation (explicit re-export,
// not `export *`, so it never collides with the three replaced exports below). Keep in sync if the
// barrel gains a hook that a renderer story relies on.
export {
  useDataProvider,
  useScrollGroupScrRef,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useDialogCallback,
  useDataProviderMulti,
  useWebViewController,
  useRecentScriptureRefs,
} from '../../src/renderer/hooks/papi-hooks';

/** Render real English strings; when opted in this is what makes first-run chrome legible. */
export function useLocalizedStrings(keys: LocalizeKey[]): [Record<string, string>, boolean] {
  return [getLocalizedStrings(keys ?? []), false];
}

/**
 * Inert setting. When opted in, seeds from the mock and updates locally on write so choosing a
 * language moves the selection live; otherwise just echoes the caller's default. Never touches the
 * real settings service (absent in Storybook).
 */
export function useSetting(
  _key: string,
  defaultState: string[],
): [string[], (newData: string[]) => Promise<undefined>, () => void, boolean] {
  const mock = getFirstRunLanguageMock();
  const initial = mock?.interfaceLanguage ?? defaultState;
  const [value, setValue] = useState<string[]>(initial);
  return [
    value,
    async (newData: string[]) => {
      setValue(newData);
      return undefined;
    },
    () => setValue(initial),
    false,
  ];
}

type LanguageDataTuple = [Record<string, LanguageInfo>, undefined, boolean];

/**
 * Inert data hook shaped like `useData(source).<DataType>(selector, defaultValue)`. When opted in,
 * the first-run language data types return the mock's languages; any other data type (and all data
 * types when not opted in) echoes the caller's default value — the same thing the real hook yields
 * with no backend.
 */
export function useData(): unknown {
  const mock = getFirstRunLanguageMock();
  return new Proxy(
    {},
    {
      get: (_target, dataType) => {
        if (mock && dataType === 'SetupDialogLanguages')
          return (_selector: undefined, def: Record<string, LanguageInfo>): LanguageDataTuple => [
            mock.setupLanguages ?? def,
            undefined,
            mock.isLoading,
          ];
        if (mock && dataType === 'AvailableInterfaceLanguages')
          return (_selector: undefined, def: Record<string, LanguageInfo>): LanguageDataTuple => [
            mock.availableLanguages ?? def,
            undefined,
            false,
          ];
        return (_selector: unknown, def: unknown): [unknown, undefined, boolean] => [
          def,
          undefined,
          false,
        ];
      },
    },
  );
}
