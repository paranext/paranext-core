import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useRetryablePromise } from 'platform-bible-react';
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
import { useCallback } from 'react';
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

  // Fetches all resources to pass into the resource picker
  const {
    data: resources,
    isLoading: isResourcesLoading,
    hasError,
    refetch,
  } = useRetryablePromise(
    useCallback(async () => sendCommand('platformGetResources.getCachedResources'), []),
  );

  // `getCachedResources` signals failure two ways: it rejects on one path and resolves `undefined`
  // on another. Reading only the rejection would leave the second one rendering as an empty
  // catalog, which is the state the user cannot act on.
  const hasResourcesError = hasError || (!isResourcesLoading && resources === undefined);

  return (
    <ResourcePickerDialog
      allResources={resources ?? []}
      isResourcesLoading={isResourcesLoading}
      hasResourcesError={hasResourcesError}
      onRetryResources={refetch}
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
