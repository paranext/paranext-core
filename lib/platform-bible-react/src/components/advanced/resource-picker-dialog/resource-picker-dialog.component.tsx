import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Spinner } from '@/components/basics/spinner.component';
import { DblResourceData, ResourceType } from 'platform-bible-utils';
import { useMemo } from 'react';
import { ResourcePicker } from '@/components/advanced/resource-picker/resource-picker';
import {
  RESOURCE_PICKER_STRING_KEYS,
  type ResourcePickerLocalizedStrings,
} from '@/components/advanced/resource-picker/resource-picker.strings';
import type {
  PickerAction,
  ResourceItem,
} from '@/components/advanced/resource-picker/resource-picker.types';

/**
 * Localization keys used by {@link ResourcePickerDialog}. The dialog forwards everything except the
 * title to the underlying {@link ResourcePicker}, so this is `%resourcePicker_title%` plus the
 * picker's full key set. Pass to `useLocalizedStrings` and forward the result as the
 * `localizedStrings` prop.
 */
export const RESOURCE_PICKER_DIALOG_STRING_KEYS = Object.freeze([
  '%resourcePicker_title%',
  ...RESOURCE_PICKER_STRING_KEYS,
] as const);

/**
 * Map of localized strings required by {@link ResourcePickerDialog}. Derived from
 * {@link RESOURCE_PICKER_DIALOG_STRING_KEYS}.
 */
export type ResourcePickerDialogLocalizedStrings = {
  [key in (typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
};

/** Props for {@link ResourcePickerDialog} */
export interface ResourcePickerDialogProps {
  /** Full list of DBL resources fetched by the caller via PAPI. */
  allResources: DblResourceData[];
  /** Whether `allResources` is still loading. When true, a spinner replaces the picker body. */
  isResourcesLoading?: boolean;
  /** If provided, only resources of this type are shown. */
  resourceType?: ResourceType;
  /** IDs of resources already selected (i.e. attached to the calling project). */
  selectedResourceIds?: string[];
  /** Localized strings — use `RESOURCE_PICKER_DIALOG_STRING_KEYS` with `useLocalizedStrings`. */
  localizedStrings: ResourcePickerDialogLocalizedStrings;
  /** Called when the user picks a resource to add to the calling project. */
  onSelect: (resource: DblResourceData) => void;
}

function toResourceItems(
  resources: DblResourceData[],
  selectedResourceIds: string[] | undefined,
): ResourceItem[] {
  const selected = new Set(selectedResourceIds ?? []);
  return resources.map((data) => {
    if (selected.has(data.dblEntryUid)) return { data, status: { kind: 'included' } };
    if (data.installed) return { data, status: { kind: 'installed' } };
    return { data, status: { kind: 'available' } };
  });
}

/**
 * Presentational dialog content for picking a DBL resource to add to a project. Renders a
 * {@link ResourcePicker} (the full library view) inside dialog chrome. Search, language filtering,
 * and the Included / On-your-computer / Available-to-download grouping all come from the underlying
 * picker.
 *
 * The dialog scopes the picker to "library" semantics:
 *
 * - **No remove affordance.** `allowRemove={false}` — the dialog's contract is "pick something to
 *   add"; remove is the calling surface's concern.
 * - **`onSelect` fires only on add.** The picker's `toggleDisplay` action (clicks on already-
 *   included rows) is ignored here, since included rows in this context exist for context only.
 *
 * Does not include an outer `Dialog` / `DialogContent`; the host (paranext-core dialog
 * infrastructure or a Storybook decorator) provides that.
 *
 * Obtain localized strings by passing {@link RESOURCE_PICKER_DIALOG_STRING_KEYS} to
 * `useLocalizedStrings` and forwarding the result.
 */
export default function ResourcePickerDialog({
  allResources,
  isResourcesLoading,
  resourceType,
  selectedResourceIds,
  localizedStrings,
  onSelect,
}: ResourcePickerDialogProps) {
  const items = useMemo(
    () => toResourceItems(allResources, selectedResourceIds),
    [allResources, selectedResourceIds],
  );

  const handleAction = (action: PickerAction) => {
    if (action.type === 'include') onSelect(action.item.data);
    // toggleDisplay and remove are not part of this dialog's contract.
  };

  const titleText = localizedStrings['%resourcePicker_title%'] ?? '%resourcePicker_title%';
  const pickerStrings: ResourcePickerLocalizedStrings = localizedStrings;
  const allowedResourceTypes = resourceType ? [resourceType] : undefined;

  return (
    <>
      <DialogHeader className="tw:px-4 tw:pt-4">
        <DialogTitle>{titleText}</DialogTitle>
      </DialogHeader>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden tw:px-4 tw:pb-4">
        {isResourcesLoading ? (
          <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:py-8">
            <Spinner />
          </div>
        ) : (
          <ResourcePicker
            items={items}
            displayedIds={selectedResourceIds}
            allowedResourceTypes={allowedResourceTypes}
            allowRemove={false}
            onAction={handleAction}
            localizedStrings={pickerStrings}
          />
        )}
      </div>
    </>
  );
}
