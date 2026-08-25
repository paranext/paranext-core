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
import { useCallback, useMemo } from 'react';
import { sendCommand } from '@shared/services/command.service';

const STRING_KEYS = [...RESOURCE_PICKER_DIALOG_STRING_KEYS];

/**
 * @experimental This dialog was recently added, and its shape may change as we learn how it is used.
 *   It is not yet a stable contract.
 */
function ResourcePickerDialogWrapper({
  resourceType,
  selectedResourceIds,
  submitDialog,
}: DialogTypes[typeof RESOURCE_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // Fetches DBL catalog resources. The try/catch prevents usePromise from hanging on isLoading=true
  // forever when the command rejects (e.g. if the extension hasn't registered yet).
  const [dblResources, isDblLoading] = usePromise(
    useCallback(async () => {
      try {
        return await sendCommand('platformGetResources.getCachedResources');
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Fetches locally-installed non-DBL resources (e.g. VULGP83, TNN, TND, HBK) that are not in
  // the DBL catalog. Each entry uses dblEntryUid === projectId as a synthetic marker.
  // Catch errors (e.g. command not yet registered) so usePromise always resolves — the hook has
  // no try/catch, so an unhandled rejection leaves isLoading=true forever.
  const [localNonDblResources, isLocalLoading] = usePromise(
    useCallback(async () => {
      try {
        return await sendCommand('platformGetResources.getLocalNonDblResources');
      } catch {
        return [];
      }
    }, []),
    [],
  );

  const allResources = useMemo(
    () => [...(dblResources ?? []), ...(localNonDblResources ?? [])],
    [dblResources, localNonDblResources],
  );

  return (
    <ResourcePickerDialog
      allResources={allResources}
      isResourcesLoading={isDblLoading || isLocalLoading}
      resourceType={resourceType}
      selectedResourceIds={selectedResourceIds}
      localizedStrings={localizedStrings}
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
