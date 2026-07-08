// Ambient shim for `@papi/frontend/react`, a virtual module the host provides at
// runtime (used by the experimental `useEffectiveResourceReferenceList` hook).
// We can't reuse its real declaration in `lib/papi-dts/papi.d.ts` because that file
// imports from `platform-bible-react` (circular), so we declare the narrow surface
// the hook needs. It's externalized in `vite.config.ts`, so nothing here is bundled.
//
// These signatures are intentionally simplified versions of the real generics, not exact copies,
// and this shim cannot be diffed against papi.d.ts at compile time (loading both would merge two
// ambient declarations of the same module). Instead, the call shapes and return types the hook
// relies on are pinned against the REAL papi hooks by the `PapiHookContractChecks` assertions in
// extensions/src/platform-scripture/src/platform-bible-react-type-shim-sync.ts — if papi changes
// these hooks incompatibly, that file fails to compile. Keep the simplified signatures here in
// sync with `lib/papi-dts/papi.d.ts` when that happens.

declare module '@papi/frontend/react' {
  // Resolves via the tsconfig `paths` alias to ./text-connection-settings-pdp.shim.d.ts — a
  // relative import is not allowed inside an ambient module declaration (TS2439).
  import type { ITextConnectionSettingsProjectDataProvider } from '@shims/text-connection-settings-pdp';
  import type { PlatformError } from 'platform-bible-utils';

  export const useProjectSetting: <T>(
    projectDataProviderSource: string | undefined,
    key: string,
    defaultValue: T,
    subscriberOptions?: unknown,
  ) => [
    setting: T | PlatformError,
    setSetting: ((newSetting: T) => void) | undefined,
    resetSetting: (() => void) | undefined,
    isLoading: boolean,
  ];

  // Overload: the specific interface id the hook uses maps to its PDP type so the
  // hook body compiles verbatim; the generic fallback keeps the shim honest for
  // any other caller.
  export function useProjectDataProvider(
    projectInterface: 'platformScripture.textConnectionSettings',
    projectDataProviderSource: string | undefined,
    pdpFactoryId?: string,
  ): ITextConnectionSettingsProjectDataProvider | undefined;
  export function useProjectDataProvider<T>(
    projectInterface: string,
    projectDataProviderSource: string | undefined,
    pdpFactoryId?: string,
  ): T | undefined;
}
