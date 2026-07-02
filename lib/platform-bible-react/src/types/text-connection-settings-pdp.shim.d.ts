// Narrow shim of platform-scripture's `ITextConnectionSettingsProjectDataProvider`, declaring only
// the two subscribe methods the experimental `useEffectiveResourceReferenceList` hook calls. The
// real interface cannot be used here: it extends papi's `IProjectDataProvider`, and papi's type
// graph imports from platform-bible-react (circular). The resource-reference data types themselves
// live in platform-bible-utils (a real dependency), so this is the only platform-scripture surface
// that still needs a local declaration.
//
// Sync with the real interface (extensions/src/platform-scripture/src/types/platform-scripture.d.ts)
// is enforced at compile time by
// extensions/src/platform-scripture/src/platform-bible-react-type-shim-sync.ts.

import type { PlatformError, ResourceReferenceList, UnsubscriberAsync } from 'platform-bible-utils';

export type ITextConnectionSettingsProjectDataProvider = {
  subscribeUserModelTexts(
    selector: undefined,
    callback: (modelTexts: ResourceReferenceList | undefined | PlatformError) => void,
    options?: unknown,
  ): Promise<UnsubscriberAsync>;
  subscribeUserReferencedProjectsAndResources(
    selector: undefined,
    callback: (
      referencedProjectsAndResources: ResourceReferenceList | undefined | PlatformError,
    ) => void,
    options?: unknown,
  ): Promise<UnsubscriberAsync>;
};
