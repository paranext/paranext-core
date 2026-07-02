// Ambient shim for `@papi/frontend/react`, a virtual module the host provides at
// runtime (used by the experimental `useEffectiveResourceReferenceList` hook).
// We can't reuse its real declaration in `lib/papi-dts/papi.d.ts` because that file
// imports from `platform-bible-react` (circular), so we declare the narrow surface
// the hook needs. It's externalized in `vite.config.ts`, so nothing here is bundled.
//
// Keep signatures in sync with `lib/papi-dts/papi.d.ts` MANUALLY. Unlike
// text-connection-settings-pdp.shim.d.ts, this shim cannot be checked at compile time: loading it
// alongside papi.d.ts would merge two ambient declarations of the same module (duplicate
// identifiers), and these signatures are intentionally simplified versions of the real generics,
// not exact copies.

declare module '@papi/frontend/react' {
  // Resolves via the tsconfig `paths` redirect to ./text-connection-settings-pdp.shim.d.ts — a
  // relative import is not allowed inside an ambient module declaration (TS2439).
  import type { PlatformError } from 'platform-bible-utils';
  import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';

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
