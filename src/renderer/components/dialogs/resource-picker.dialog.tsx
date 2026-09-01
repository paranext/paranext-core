import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { usePromise } from 'platform-bible-react';
import {
  ResourcePickerDialog,
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  RESOURCE_PICKER_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import {
  buildResourcePickerNotice,
  collectFetchedResources,
  RESOURCE_PICKER_NOTICE_STRING_KEYS,
  ResourceFetchResult,
  toResourceFetchResult,
} from '@renderer/components/dialogs/resource-picker.utils';
import { useCallback, useMemo } from 'react';
import { sendCommand } from '@shared/services/command.service';

const STRING_KEYS = [...RESOURCE_PICKER_DIALOG_STRING_KEYS, ...RESOURCE_PICKER_NOTICE_STRING_KEYS];

/** The commands this dialog draws its two independent resource lists from */
type ResourceFetchCommand =
  | 'platformGetResources.getCachedResources'
  | 'platformGetResources.getLocalNonDblResources';

/**
 * Runs one resource fetch, reporting both a rejection and a resolved `undefined` as a failed fetch
 * so the dialog can explain a short list rather than pass an outage off as an empty catalog.
 * Catching also keeps `usePromise` from hanging on `isLoading` forever, since it has no try/catch.
 *
 * @returns `[fetchResult, isLoading]`, where `fetchResult` is `undefined` until the fetch resolves
 */
function useResourceFetch(command: ResourceFetchCommand) {
  return usePromise<ResourceFetchResult | undefined>(
    useCallback(async (): Promise<ResourceFetchResult> => {
      try {
        return toResourceFetchResult(await sendCommand(command));
      } catch {
        return { didFetchSucceed: false };
      }
    }, [command]),
    undefined,
  );
}

/**
 * @experimental This dialog was recently added, and its shape may change as we learn how it is used.
 *   It is not yet a stable contract.
 */
function ResourcePickerDialogWrapper({
  resourceType,
  selectedResourceIds,
  notice,
  allowSelectingInstalled,
  submitDialog,
}: DialogTypes[typeof RESOURCE_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  const [dblCatalogFetch, isDblLoading] = useResourceFetch(
    'platformGetResources.getCachedResources',
  );
  // Locally-installed non-DBL resources (e.g. VULGP83, TNN, TND, HBK) that are not in the DBL
  // catalog. Each entry uses dblEntryUid === projectId as a synthetic marker.
  const [localResourceFetch, isLocalLoading] = useResourceFetch(
    'platformGetResources.getLocalNonDblResources',
  );

  const allResources = useMemo(
    () => collectFetchedResources(dblCatalogFetch, localResourceFetch),
    [dblCatalogFetch, localResourceFetch],
  );

  const combinedNotice = useMemo(
    () => buildResourcePickerNotice(dblCatalogFetch, localResourceFetch, localizedStrings, notice),
    [dblCatalogFetch, localResourceFetch, localizedStrings, notice],
  );

  return (
    <ResourcePickerDialog
      allResources={allResources}
      isResourcesLoading={isDblLoading || isLocalLoading}
      resourceType={resourceType}
      selectedResourceIds={selectedResourceIds}
      localizedStrings={localizedStrings}
      notice={combinedNotice}
      allowSelectingInstalled={allowSelectingInstalled}
      onSelect={submitDialog}
    />
  );
}

/**
 * @experimental This dialog was recently added, and its shape may change as we learn how it is used.
 *   It is not yet a stable contract.
 */
export const RESOURCE_PICKER_DIALOG: DialogDefinition<typeof RESOURCE_PICKER_DIALOG_TYPE> =
  Object.freeze({
    ...DIALOG_BASE,
    tabType: RESOURCE_PICKER_DIALOG_TYPE,
    defaultTitle: '%resourcePicker_title%',
    // Matches the get resources UI width so that there is no additional scroll bar on the bottom
    // for some resources that have long names
    initialSize: { width: 900, height: 650 },
    Component: ResourcePickerDialogWrapper,
  });

export default RESOURCE_PICKER_DIALOG;
