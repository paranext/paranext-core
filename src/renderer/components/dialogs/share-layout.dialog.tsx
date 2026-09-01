import { useCallback, useEffect, useMemo } from 'react';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
} from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { isPlatformError } from 'platform-bible-utils';
import { Button, Spinner, usePromise, useRetryablePromise } from 'platform-bible-react';
import { RESOURCE_PICKER_DIALOG_STRING_KEYS } from 'platform-bible-react/experimental';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DIALOG_BASE, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  ShareLayoutDialogOptions,
  SHARE_LAYOUT_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import {
  ShareLayoutDialogContent,
  ShareLayoutResult,
  SHARE_LAYOUT_DIALOG_STRING_KEYS,
  isShareLayoutActiveTab,
} from '@renderer/components/dialogs/share-layout.component';
import {
  seedResourceList,
  seedScalar,
  splitResourcesByTab,
} from '@renderer/components/dialogs/share-layout.utils';

const EMPTY_RESOURCE_LIST: ResourceReferenceList = { dataVersion: '1.0.0', items: [] };

// `useLocalizedStrings`'s `localizationKeys` param must be a stable reference (see its JSDoc) —
// spreading a frozen array into a new array literal on every render breaks that contract and
// causes an infinite update loop. Hoist to module scope so the array identity never changes.
const SHARE_LAYOUT_STRING_KEYS = [...SHARE_LAYOUT_DIALOG_STRING_KEYS];
const RESOURCE_PICKER_STRING_KEYS = [...RESOURCE_PICKER_DIALOG_STRING_KEYS];

/**
 * `projectId` is required on `ShareLayoutDialogOptions`, but `DialogDefinitionBase['Component']`'s
 * generic base signature is `(props: DialogProps<unknown>) => ReactElement` — a required field on
 * the options type breaks assignability to that generic signature. Mirror the same workaround
 * `AlertDialog` uses in `alert-dialog.component.tsx` for its required `prompt` field: omit
 * `projectId` from the intersected options type and re-add it as optional here. `projectId` will
 * always actually be provided at runtime by the command handler that opens this dialog; the PAPI
 * hooks below already tolerate `projectId: string | undefined`, matching their normal usage
 * elsewhere in the codebase.
 */
function ShareLayoutDialogWrapper({
  projectId,
  submitDialog,
  cancelDialog,
}: DialogProps<boolean> &
  Omit<ShareLayoutDialogOptions, 'projectId'> & {
    projectId?: ShareLayoutDialogOptions['projectId'];
  }) {
  const [localizedStrings] = useLocalizedStrings(SHARE_LAYOUT_STRING_KEYS);
  const [resourcePickerLocalizedStrings] = useLocalizedStrings(RESOURCE_PICKER_STRING_KEYS);

  const {
    data: catalog,
    isLoading: isResourcesLoading,
    hasError: hasResourcesError,
    hasSettled: hasResourcesSettled,
    refetch: onRetryResources,
  } = useRetryablePromise(
    useCallback(async () => sendCommand('platformGetResources.getCachedResources'), []),
  );

  // An `unavailable` catalog is not an error — this build simply cannot download DBL resources.
  const allResources = catalog?.status === 'available' ? catalog.resources : undefined;

  const [projectResourcesSetting, setProjectResources] = useProjectSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    EMPTY_RESOURCE_LIST,
  );
  const [projectModelTextsSetting, setProjectModelTexts] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    EMPTY_RESOURCE_LIST,
  );
  const [projectActiveTabSetting, setProjectActiveTab] = useProjectSetting(
    projectId,
    'platformScripture.sharedLayoutDefaultTab',
    '',
  );

  const textConnectionsProvider = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const [canWrite, isCanWriteLoading] = usePromise(
    useCallback(
      async () => textConnectionsProvider?.canUserWriteProjectTextConnectionSettings(),
      [textConnectionsProvider],
    ),
    undefined,
  );

  useEffect(() => {
    if (!isCanWriteLoading && canWrite === false) cancelDialog();
  }, [isCanWriteLoading, canWrite, cancelDialog]);

  const [personalResources] = usePromise(
    useCallback(
      async () => textConnectionsProvider?.getUserReferencedProjectsAndResources(),
      [textConnectionsProvider],
    ),
    undefined,
  );
  const [personalModelTexts] = usePromise(
    useCallback(
      async () => textConnectionsProvider?.getUserModelTexts(),
      [textConnectionsProvider],
    ),
    undefined,
  );

  const projectResources = isPlatformError(projectResourcesSetting)
    ? undefined
    : projectResourcesSetting;
  const projectModelTexts = isPlatformError(projectModelTextsSetting)
    ? undefined
    : projectModelTextsSetting;
  const projectActiveTab = isPlatformError(projectActiveTabSetting)
    ? undefined
    : projectActiveTabSetting;

  const seededItems = useMemo(
    () => seedResourceList(projectResources, personalResources),
    [projectResources, personalResources],
  );
  const { scriptureResources, commentaryResources, otherResources } = useMemo(
    () => splitResourcesByTab(seededItems, allResources ?? []),
    [seededItems, allResources],
  );

  const seededModelTextItems = useMemo(
    () => seedResourceList(projectModelTexts, personalModelTexts),
    [projectModelTexts, personalModelTexts],
  );
  const seededModelText: ResourceReference | undefined = seededModelTextItems[0];

  // `seedScalar` is generic over `string | ResourceReference | undefined`, so it returns the plain
  // `string | undefined` type of the persisted setting. Narrow it using the type guard to ensure
  // only known tab values are trusted.
  const seededActiveTabRaw = seedScalar(projectActiveTab, undefined);
  const seededActiveTab =
    seededActiveTabRaw && isShareLayoutActiveTab(seededActiveTabRaw)
      ? seededActiveTabRaw
      : undefined;

  const handleConfirm = useCallback(
    (result: ShareLayoutResult) => {
      setProjectResources?.({
        dataVersion: projectResources?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
        items: [...result.scriptureResources, ...result.commentaryResources, ...otherResources],
      });
      setProjectModelTexts?.({
        dataVersion: projectModelTexts?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
        items: result.modelText ? [result.modelText] : [],
      });
      setProjectActiveTab?.(result.activeTab ?? '');
      submitDialog(true);
    },
    [
      projectResources,
      projectModelTexts,
      otherResources,
      setProjectResources,
      setProjectModelTexts,
      setProjectActiveTab,
      submitDialog,
    ],
  );

  //
  // Defense-in-depth admin gate: menu items in this codebase have no declarative
  // visibility/condition mechanism, so a non-admin can still trigger the command that opens this
  // dialog. Reject here instead. This check must run after all hooks above (Rules of Hooks
  // forbids an early return between hook calls), so it sits just before the render branch.
  // Also gated on the catalog: `ShareLayoutDialogContent` snapshots its initial resource lists in
  // `useState` at mount, and `splitResourcesByTab` cannot classify a saved dblResource reference
  // without the catalog — every one of them lands in `otherResources` instead. Mounting before the
  // catalog settles therefore seeds the content with empty lists while the memo below later
  // recomputes `otherResources` to empty too, so a Confirm from that mount writes an EMPTY
  // referenced-resources list and erases the project's shared selection.
  // Also gated on the catalog: `ShareLayoutDialogContent` snapshots its initial resource lists in
  // `useState` at mount, and `splitResourcesByTab` cannot classify a saved dblResource reference
  // without the catalog — every one of them lands in `otherResources` instead. Mounting before the
  // catalog settles therefore seeds the content with empty lists while the memo above later
  // recomputes `otherResources` to empty too, so a Confirm from that mount writes an EMPTY
  // referenced-resources list and erases the project's shared selection.
  if (isCanWriteLoading || !hasResourcesSettled) {
    return (
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8">
        <Spinner />
      </div>
    );
  }

  // The failure is reported HERE rather than only inside the embedded pickers. Letting the dialog
  // body render against an empty catalog would show "nothing is shared" beside a popover saying the
  // catalog failed — two adjacent surfaces disagreeing — over a Confirm that writes the misleading
  // state back. A retry that lands after the body mounted cannot fix the snapshot it took, so the
  // body must not mount until there is a catalog to take it from.
  if (hasResourcesError) {
    return (
      <div className="tw:flex tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-8">
        <p className="tw:text-center tw:text-muted-foreground">
          {resourcePickerLocalizedStrings['%resourcePicker_load_error%'] ??
            '%resourcePicker_load_error%'}
        </p>
        <Button variant="outline" size="sm" onClick={onRetryResources}>
          {resourcePickerLocalizedStrings['%resourcePicker_retry%'] ?? '%resourcePicker_retry%'}
        </Button>
      </div>
    );
  }

  if (canWrite !== true) {
    // `DialogDefinitionBase['Component']` requires a `ReactElement` return, not `ReactElement |
    // null` — widening that shared type would affect every dialog in the codebase, so an empty
    // fragment is the narrowest way to render nothing here. The dialog is cancelled a moment later
    // by the effect above, so this only shows briefly.
    // eslint-disable-next-line react/jsx-no-useless-fragment -- see comment above
    return <></>;
  }

  return (
    <ShareLayoutDialogContent
      initialModelText={seededModelText}
      initialActiveTab={seededActiveTab}
      initialScriptureResources={scriptureResources}
      initialCommentaryResources={commentaryResources}
      allResources={allResources ?? []}
      isResourcesLoading={isResourcesLoading}
      hasResourcesError={hasResourcesError}
      onRetryResources={onRetryResources}
      resourcePickerLocalizedStrings={resourcePickerLocalizedStrings}
      localizedStrings={localizedStrings}
      onConfirm={handleConfirm}
      onCancel={cancelDialog}
    />
  );
}

export const SHARE_LAYOUT_DIALOG: DialogDefinition<typeof SHARE_LAYOUT_DIALOG_TYPE> = Object.freeze(
  {
    ...DIALOG_BASE,
    tabType: SHARE_LAYOUT_DIALOG_TYPE,
    defaultTitle: '%shareLayoutDialog_title%',
    initialSize: { width: 640, height: 720 },
    Component: ShareLayoutDialogWrapper,
  },
);

export default SHARE_LAYOUT_DIALOG;
