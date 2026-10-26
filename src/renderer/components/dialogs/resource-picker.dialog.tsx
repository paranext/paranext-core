import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { usePromise, useRetryablePromise } from 'platform-bible-react';
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
  toDblFetchResult,
  toLocalFetchResult,
} from '@renderer/components/dialogs/resource-picker.utils';
import {
  getRestrictedModelTextReason,
  RESTRICTED_MODEL_TEXT_STRING_KEYS,
} from '@renderer/components/dialogs/restricted-model-text.utils';
import { useModelTextRestrictionsCatchUp } from '@renderer/hooks/use-model-text-restrictions-catch-up.hook';
import { DblResourceData } from 'platform-bible-utils';
import type { DblResourceCatalog } from 'platform-get-resources';
import { useCallback, useMemo } from 'react';
import { sendCommand } from '@shared/services/command.service';

const STRING_KEYS = [
  ...RESOURCE_PICKER_DIALOG_STRING_KEYS,
  ...RESOURCE_PICKER_NOTICE_STRING_KEYS,
  ...RESTRICTED_MODEL_TEXT_STRING_KEYS,
];

/** The rows of an available catalog, or `undefined` when there are none */
function getCatalogRows(catalog: DblResourceCatalog | undefined): DblResourceData[] | undefined {
  return catalog?.status === 'available' ? catalog.resources : undefined;
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
  disableRestrictedModelTexts,
  submitDialog,
}: DialogTypes[typeof RESOURCE_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // The DBL catalog is the retryable half: it distinguishes its own outcomes and rejects on a real
  // failure, so a retry here can genuinely change the answer.
  const {
    data: catalog,
    isLoading: isDblLoading,
    hasError: hasDblFetchError,
    hasSettled: hasDblSettled,
    refetch: refetchDblCatalog,
  } = useRetryablePromise(
    // Deliberately not refreshed before this read. The flags can be one refresh behind, and acting
    // on a stale one now costs a redundant install that succeeds as a no-op and corrects itself —
    // where awaiting the refresh would hold the dialog's first paint on a backend call, which is
    // the blocking `getCachedResources` was written to avoid.
    useCallback(
      async () =>
        sendCommand('platformGetResources.getCachedResources', !!disableRestrictedModelTexts),
      [disableRestrictedModelTexts],
    ),
  );

  // Locally-installed non-DBL resources (e.g. VULGP83, TNN, TND, HBK) that are not in the DBL
  // catalog. Each entry uses dblEntryUid === projectId as a synthetic marker. Supplementary: losing
  // it degrades the list rather than emptying it, so it stays on plain `usePromise`.
  const [localResources, isLocalLoading] = usePromise<ResourceFetchResult | undefined>(
    useCallback(async (): Promise<ResourceFetchResult> => {
      try {
        return toLocalFetchResult(
          await sendCommand(
            'platformGetResources.getLocalNonDblResources',
            !!disableRestrictedModelTexts,
          ),
        );
      } catch {
        return { didFetchSucceed: false };
      }
    }, [disableRestrictedModelTexts]),
    undefined,
  );

  // Rows read before the backend says which texts are restricted are disabled as still being
  // checked; these bring them up to date while the dialog stays open
  const checkedCatalogRows = useModelTextRestrictionsCatchUp(
    getCatalogRows(catalog),
    useCallback(
      async () =>
        getCatalogRows(await sendCommand('platformGetResources.getCachedResources', true)),
      [],
    ),
    !!disableRestrictedModelTexts,
  );
  const checkedLocalRows = useModelTextRestrictionsCatchUp(
    localResources?.didFetchSucceed ? localResources.resources : undefined,
    useCallback(async () => sendCommand('platformGetResources.getLocalNonDblResources', true), []),
    !!disableRestrictedModelTexts,
  );

  // `!hasDblSettled` counts as loading, not just `isLoading`. A retry clears the error
  // synchronously while `usePromise` only raises its loading flag in an effect, so the render in
  // between would otherwise report "no results" on the very click meant to disprove it.
  const isResourcesLoading = isDblLoading || !hasDblSettled || isLocalLoading;

  const dblCatalogFetch = useMemo((): ResourceFetchResult | undefined => {
    if (hasDblFetchError) return { didFetchSucceed: false };
    if (checkedCatalogRows) return { didFetchSucceed: true, resources: checkedCatalogRows };
    return catalog ? toDblFetchResult(catalog) : undefined;
  }, [catalog, checkedCatalogRows, hasDblFetchError]);

  const localFetch = useMemo(
    (): ResourceFetchResult | undefined =>
      checkedLocalRows ? { didFetchSucceed: true, resources: checkedLocalRows } : localResources,
    [checkedLocalRows, localResources],
  );

  const allResources = useMemo(
    () => collectFetchedResources(dblCatalogFetch, localFetch),
    [dblCatalogFetch, localFetch],
  );

  const combinedNotice = useMemo(
    () => buildResourcePickerNotice(dblCatalogFetch, localFetch, localizedStrings, notice),
    [dblCatalogFetch, localFetch, localizedStrings, notice],
  );

  const getDisabledReason = useMemo(
    () =>
      disableRestrictedModelTexts
        ? (resource: DblResourceData) => getRestrictedModelTextReason(resource, localizedStrings)
        : undefined,
    [disableRestrictedModelTexts, localizedStrings],
  );

  // These two describe having NOTHING to show; the notice above describes an incomplete list. A
  // permanent answer earns its own message and no retry, because no retry could change it.
  const hasFailedRecoverably =
    !!dblCatalogFetch && !dblCatalogFetch.didFetchSucceed && !dblCatalogFetch.isPermanent;
  const areDownloadsUnavailable =
    !!dblCatalogFetch && !dblCatalogFetch.didFetchSucceed && !!dblCatalogFetch.isPermanent;

  return (
    <ResourcePickerDialog
      allResources={allResources}
      isResourcesLoading={isResourcesLoading}
      hasResourcesError={hasFailedRecoverably}
      onRetryResources={refetchDblCatalog}
      areDownloadsUnavailable={areDownloadsUnavailable}
      resourceType={resourceType}
      selectedResourceIds={selectedResourceIds}
      localizedStrings={localizedStrings}
      notice={combinedNotice}
      allowSelectingInstalled={allowSelectingInstalled}
      getDisabledReason={getDisabledReason}
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
    // `ResourcePickerDialog` renders its own `DialogTitle` and `DialogDescription`, both localized
    // and both specific to this list. Without this the modal shell adds a second, generic pair
    // under the same Radix ids, and a screen reader announces the shell's text instead.
    providesOwnTitle: true,
    providesOwnDescription: true,
    Component: ResourcePickerDialogWrapper,
  });

export default RESOURCE_PICKER_DIALOG;
