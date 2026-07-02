/**
 * Compile-time sync check for the narrow project-data-provider shim platform-bible-react needs in
 * order to host the experimental `useEffectiveResourceReferenceList` hook. The library cannot
 * resolve papi's real type graph (papi.d.ts imports from platform-bible-react — circular), so it
 * declares a narrow hand-written stand-in; this assertion lives here — where both the real
 * interface and the shim are visible — and fails this extension's typecheck if the two drift apart.
 * The resource-reference DATA types need no checking: they live in platform-bible-utils and are
 * re-exported by this extension, so there is a single source of truth.
 *
 * Contains type-level assertions only; nothing here exists at runtime.
 */

import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';
import type * as PdpShim from 'platform-bible-react/src/types/text-connection-settings-pdp.shim';

/** Fails to compile when `T` is not `true` — the error points at the drifted assertion below */
type Expect<T extends true> = T;

/**
 * The shim declares just the narrow method surface the hook uses, so the real interface must remain
 * assignable to it. If this fails, update
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
