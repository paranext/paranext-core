/**
 * Storybook stub for the renderer PAPI-hooks barrel (`@renderer/hooks/papi-hooks`).
 *
 * Renderer app components (e.g. the first-run / startup-wizard shell and steps) import
 * `useLocalizedStrings` from this barrel. The real hook subscribes to the localization data
 * provider, which calls `networkService.initialize()` → opens a PAPI WebSocket. There is no PAPI
 * backend in Storybook, so that connection never settles and rejects unhandled after ~10 s with
 * "Timeout reached when waiting for websocket connected to settle", surfacing as the webpack error
 * overlay on every startup-wizard story.
 *
 * This stub is aliased in over the barrel (see `.storybook/main.ts`). It re-exports every real hook
 * unchanged and overrides ONLY `useLocalizedStrings` to resolve strings synchronously from the
 * Storybook localization helper (real English text, no network). Other hooks stay real: they are
 * inert unless actually called, so aliasing the barrel does not change any story that does not use
 * them. This mirrors the `useLocalizedStrings` override already in `papi-stubs/frontend-react.ts`
 * for the `@papi/frontend/react` web-view barrel.
 */

import type { LocalizeKey } from 'platform-bible-utils';
import type { DataProviderSubscriberOptions } from '@shared/models/data-provider.model';
import type { LocalizationData } from '@shared/services/localization.service-model';
import { getLocalizedStrings } from '../localization.utils';

// Re-export every real hook except useLocalizedStrings (overridden below). These remain the genuine
// implementations; they only touch the network when invoked, which startup-wizard stories do not.
export { default as useDataProvider } from '@renderer/hooks/papi-hooks/use-data-provider.hook';
export { default as useData } from '@renderer/hooks/papi-hooks/use-data.hook';
export { default as useScrollGroupScrRef } from '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook';
export { default as useSetting } from '@renderer/hooks/papi-hooks/use-setting.hook';
export { default as useProjectData } from '@renderer/hooks/papi-hooks/use-project-data.hook';
export { default as useProjectDataProvider } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
export { default as useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
export { default as useDialogCallback } from '@renderer/hooks/papi-hooks/use-dialog-callback.hook';
export { default as useDataProviderMulti } from '@renderer/hooks/papi-hooks/use-data-provider-multi.hook';
export { default as useWebViewController } from '@renderer/hooks/papi-hooks/use-web-view-controller.hook';
export { default as useRecentScriptureRefs } from '@renderer/hooks/papi-hooks/use-recent-scripture-refs.hook';

/**
 * Storybook override of the real `useLocalizedStrings`. Resolves the requested keys to English
 * strings synchronously (never loading, never networked). Signature matches the real hook so
 * consumers destructure `[localizedStrings, isLoading]` exactly as they do at runtime.
 */
export function useLocalizedStrings(
  localizationKeys: LocalizeKey[],
  // Unused in this stub; required to match the real hook's signature for drop-in compatibility.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  localizationLocales?: string[],
  // Unused in this stub; required to match the real hook's signature for drop-in compatibility.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscriberOptions?: DataProviderSubscriberOptions,
): [localizedStrings: LocalizationData, isLoading: boolean] {
  return [getLocalizedStrings(localizationKeys ?? []), false];
}
