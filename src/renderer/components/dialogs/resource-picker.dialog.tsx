import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  ResourcePickerDialog,
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
  usePromise,
} from 'platform-bible-react';
import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  RESOURCE_PICKER_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import { useCallback } from 'react';
import { commands } from '@renderer/services/papi-frontend.service';

const STRING_KEYS = [...RESOURCE_PICKER_DIALOG_STRING_KEYS];

function ResourcePickerDialogWrapper({
  resourceType,
  selectedResourceIds,
  submitDialog,
}: DialogTypes[typeof RESOURCE_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // Fetches all resources to pass into the resource picker
  const [resources, isResourcesLoading] = usePromise(
    useCallback(async () => commands.sendCommand('platformGetResources.getCachedResources'), []),
    undefined,
  );

  return (
    <ResourcePickerDialog
      allResources={resources ?? []}
      isResourcesLoading={isResourcesLoading}
      resourceType={resourceType}
      selectedResourceIds={selectedResourceIds}
      localizedStrings={localizedStrings}
      onSelect={submitDialog}
    />
  );
}

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
