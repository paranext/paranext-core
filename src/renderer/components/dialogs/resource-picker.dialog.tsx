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
import type { DblResourceData } from 'platform-bible-utils';
import { sendCommand } from '@shared/services/command.service';

const STRING_KEYS = [...RESOURCE_PICKER_DIALOG_STRING_KEYS];

// Stable identity so an unavailable catalog does not hand the picker a new array every render.
const EMPTY_RESOURCES: DblResourceData[] = [];

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
    data: catalog,
    isLoading: isResourcesLoading,
    hasError,
    refetch,
  } = useRetryablePromise(
    useCallback(async () => sendCommand('platformGetResources.getCachedResources'), []),
  );

  // An `unavailable` catalog is deliberately NOT an error: this build simply cannot download DBL
  // resources, and offering a retry would attach a control to something no retry can change. Only a
  // rejection — a fetch that broke and might not next time — earns the error state.
  const allResources = catalog?.status === 'available' ? catalog.resources : EMPTY_RESOURCES;

  return (
    <ResourcePickerDialog
      allResources={allResources}
      isResourcesLoading={isResourcesLoading}
      hasResourcesError={hasError}
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
