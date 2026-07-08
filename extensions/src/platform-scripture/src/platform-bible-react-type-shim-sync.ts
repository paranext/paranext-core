/**
 * Compile-time sync checks for the type shims platform-bible-react needs in order to host the
 * experimental `useEffectiveResourceReferenceList` hook. The library cannot resolve papi's real
 * type graph (papi.d.ts imports from platform-bible-react — circular), so it declares narrow
 * hand-written stand-ins; the assertions here live where both the real types and the shims are
 * visible and fail this extension's typecheck if they drift — see each assertion's own doc comment
 * for exactly what it does and doesn't catch. The resource-reference DATA types need no checking:
 * they live in platform-bible-utils and are re-exported by this extension, so there is a single
 * source of truth.
 *
 * Contains type-level assertions only; nothing here exists at runtime.
 */

import type { useProjectDataProvider, useProjectSetting } from '@papi/frontend/react';
import type { PlatformError, ResourceReferenceList } from 'platform-bible-utils';
import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';
import type * as PdpShim from 'platform-bible-react/src/types/text-connection-settings-pdp.shim';

/** Fails to compile when `T` is not `true` — the error points at the drifted assertion below */
type Expect<T extends true> = T;

/**
 * The shim declares just the narrow method surface the hook uses, so the real interface must remain
 * assignable to it. This check is directional, not proof of exact equivalence: it reliably catches
 * a method being renamed or removed, but because TypeScript compares method parameters bivariantly,
 * it will NOT catch the real interface's parameters (or a callback parameter) NARROWING — becoming
 * more restrictive — while the shim still declares the old, wider shape. That's exactly the
 * dangerous case: code written against the shim could call the real method with a value it no
 * longer accepts. (The safe direction — the real interface's parameters widening — is correctly
 * recognized as still compatible either way.) If this fails, update
 * `lib/platform-bible-react/src/types/text-connection-settings-pdp.shim.d.ts` to match the real
 * interface in `src/types/platform-scripture.d.ts`.
 */
export type TextConnectionSettingsPdpShimSyncCheck = [
  Expect<
    ITextConnectionSettingsProjectDataProvider extends PdpShim.ITextConnectionSettingsProjectDataProvider
      ? true
      : false
  >,
];

/**
 * The hook also depends on `useProjectSetting` / `useProjectDataProvider` from
 * `@papi/frontend/react`, which platform-bible-react declares in a second shim
 * (`experimental-papi-shim.d.ts`). That shim cannot be compared to the real declarations directly —
 * loading it here would merge two ambient declarations of the same module — so instead these
 * assertions pin the REAL papi hooks (from `papi.d.ts`) to the exact call shapes and return types
 * `useEffectiveResourceReferenceList` relies on. Without them, a papi signature change would
 * compile green everywhere (consumers build against platform-bible-react's already-emitted `.d.ts`)
 * and only surface at runtime. If one of these fails, update the hook and its papi shim in
 * platform-bible-react to match.
 */
export type PapiHookContractChecks = [
  // useProjectSetting called as the hook calls it: (projectId, settingKey, defaultList)
  Expect<
    typeof useProjectSetting extends (
      projectDataProviderSource: string | undefined,
      key: 'platformScripture.modelTexts',
      defaultValue: ResourceReferenceList,
    ) => [
      ResourceReferenceList | PlatformError,
      ((newSetting: ResourceReferenceList) => void) | undefined,
      (() => void) | undefined,
      boolean,
    ]
      ? true
      : false
  >,
  Expect<
    typeof useProjectSetting extends (
      projectDataProviderSource: string | undefined,
      key: 'platformScripture.referencedProjectsAndResources',
      defaultValue: ResourceReferenceList,
    ) => [
      ResourceReferenceList | PlatformError,
      ((newSetting: ResourceReferenceList) => void) | undefined,
      (() => void) | undefined,
      boolean,
    ]
      ? true
      : false
  >,
  // useProjectDataProvider called as the hook calls it: (projectInterface, projectId)
  Expect<
    typeof useProjectDataProvider extends (
      projectInterface: 'platformScripture.textConnectionSettings',
      projectDataProviderSource: string | undefined,
    ) => ITextConnectionSettingsProjectDataProvider | undefined
      ? true
      : false
  >,
];
