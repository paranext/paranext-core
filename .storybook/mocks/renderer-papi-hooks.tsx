/**
 * Storybook mock for the renderer PAPI hooks barrel (`@renderer/hooks/papi-hooks`).
 *
 * `.storybook/main.ts` rewrites the exact barrel request `@renderer/hooks/papi-hooks` to this file
 * via a `NormalModuleReplacementPlugin` (a `resolve.alias` is silently overridden by the renderer
 * config's `TsconfigPathsPlugin`). The regex is anchored, so a component that imports a specific
 * `*.hook` sub-path — and this file's own re-export from the real barrel — still resolve normally.
 * The four hooks the first-run steps need are replaced with inert, backend-free implementations
 * (mirroring `.storybook/papi-stubs/frontend-react.ts`): the real hooks reach the settings/PAPI
 * services, which are absent in Storybook and throw, or wait forever on a provider that never
 * registers. Every OTHER hook is re-exported unchanged from the real barrel.
 *
 * Replaced here rather than spied on per story, because these are ES module exports: a
 * `spyOn(papiHooks, …)` throws `Cannot spy on export "…". Module namespace is not configurable in
 * ESM`, which renders Storybook's error overlay in place of the story.
 *
 * By default the inert hooks return their caller's default value (the same thing the real hooks
 * yield with no backend), so stories that don't opt in are unaffected. First-run stories opt in
 * through a mock channel per step: `first-run-language-mock-channel.ts` drives the language step's
 * data — qualifying setup languages, available-language autonyms, the current interface language
 * (interactive), the loading flag — and `internet-settings-mock-channel.ts` stands in the internet
 * settings provider and its settings. Real English strings are rendered either way.
 */
import { useContext, useState } from 'react';
import type { LanguageInfo } from 'platform-bible-react';
import type { LocalizeKey } from 'platform-bible-utils';
import { getLocalizedStrings } from '../localization.utils';
import { FirstRunLanguageMockContext } from './first-run-language-mock-channel';
import { InternetSettingsMockContext } from './internet-settings-mock-channel';

// Pass every other renderer hook straight through to the real implementation (explicit re-export,
// not `export *`, so it never collides with the four replaced exports below). Keep in sync if the
// barrel gains a hook that a renderer story relies on.
export {
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
  const mock = useContext(FirstRunLanguageMockContext);
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

/** Stands in for a resolved data provider. `useData` below is inert too and ignores the value. */
const PROVIDER_STAND_IN = { __brand: 'storybookDataProvider' };

/**
 * Inert provider lookup. The real hook resolves a provider over PAPI, which has no backend in
 * Storybook, so it never resolves — and a component gated on it (the first-run internet-settings
 * step) sits on its "provider hasn't registered yet" spinner forever. A story opts in through
 * `InternetSettingsMockContext`; without one this answers `undefined`, which is what the real hook
 * yields here anyway.
 */
export function useDataProvider(): unknown {
  const internetSettings = useContext(InternetSettingsMockContext);
  return internetSettings?.isProviderRegistered ? PROVIDER_STAND_IN : undefined;
}

type LanguageDataTuple = [Record<string, LanguageInfo>, undefined, boolean];
type InternetSettingsDataTuple = [unknown, () => Promise<undefined>, boolean];

/**
 * Inert data hook shaped like `useData(source).<DataType>(selector, defaultValue)`. When opted in,
 * the first-run language and internet-settings data types return the mock's data; any other data
 * type (and all data types when not opted in) echoes the caller's default value — the same thing
 * the real hook yields with no backend.
 */
export function useData(): unknown {
  const language = useContext(FirstRunLanguageMockContext);
  const internetSettings = useContext(InternetSettingsMockContext);
  return new Proxy(
    {},
    {
      get: (_target, dataType) => {
        if (language && dataType === 'SetupDialogLanguages')
          return (_selector: undefined, def: Record<string, LanguageInfo>): LanguageDataTuple => [
            language.setupLanguages ?? def,
            undefined,
            language.isLoading,
          ];
        if (language && dataType === 'AvailableInterfaceLanguages')
          return (_selector: undefined, def: Record<string, LanguageInfo>): LanguageDataTuple => [
            language.availableLanguages ?? def,
            undefined,
            false,
          ];
        if (internetSettings && dataType === 'InternetSettings')
          return (_selector: unknown, def: unknown): InternetSettingsDataTuple => [
            internetSettings.value ?? def,
            // Saving is a no-op here: these stories are about what each state looks like, and the
            // step reads its selection back from this same value.
            async () => undefined,
            internetSettings.isLoading,
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
