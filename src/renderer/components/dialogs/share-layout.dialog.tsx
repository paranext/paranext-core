import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
} from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { isPlatformError } from 'platform-bible-utils';
import { Spinner, usePromise, useRetryablePromise } from 'platform-bible-react';
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

  const allResources = catalog?.status === 'available' ? catalog.resources : undefined;

  // `notReady` is transient — the DBL provider registers in the background — so it earns the
  // retryable error state the embedded pickers render. `notConfigured` is permanent for this
  // installation, so it gets its own message and no retry. Neither replaces the dialog: the tab and
  // model-text settings have nothing to do with DBL, and on a build with no DBL credentials
  // `notConfigured` is the normal state, so a dialog that refuses to open on it would never open.
  const isCatalogNotReady = catalog?.status === 'unavailable' && catalog.reason === 'notReady';
  const areDownloadsUnavailable =
    catalog?.status === 'unavailable' && catalog.reason === 'notConfigured';
  const hasRetryableCatalogError = hasResourcesError || isCatalogNotReady;

  // Latches on the FIRST settle and never re-opens. The gate below exists to stop the content
  // mounting before there is a catalog to snapshot from; a refetch driven from inside the mounted
  // dialog is a different thing entirely, and unmounting for it would throw away the tab,
  // model-text and resource edits the admin has made since.
  const hasCatalogSettledOnceRef = useRef(false);
  if (hasResourcesSettled) hasCatalogSettledOnceRef.current = true;
  const hasCatalogSettledOnce = hasCatalogSettledOnceRef.current;

  const [projectResourcesSetting, setProjectResources, , isProjectResourcesLoading] =
    useProjectSetting(
      projectId,
      'platformScripture.referencedProjectsAndResources',
      EMPTY_RESOURCE_LIST,
    );
  const [projectModelTextsSetting, setProjectModelTexts, , isProjectModelTextsLoading] =
    useProjectSetting(projectId, 'platformScripture.modelTexts', EMPTY_RESOURCE_LIST);
  const [projectActiveTabSetting, setProjectActiveTab, , isProjectActiveTabLoading] =
    useProjectSetting(projectId, 'platformScripture.sharedLayoutDefaultTab', '');

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

  const [personalResources, isPersonalResourcesLoading] = usePromise(
    useCallback(
      async () => textConnectionsProvider?.getUserReferencedProjectsAndResources(),
      [textConnectionsProvider],
    ),
    undefined,
  );
  const [personalModelTexts, isPersonalModelTextsLoading] = usePromise(
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

  // Saved DBL references the dialog cannot show, because without a catalog it cannot tell a Bible
  // text from a commentary. Confirm round-trips them unchanged, but silently: without this count the
  // admin reads an empty Bible-texts row under a heading promising a review of what is about to be
  // shared. Counted only when there is no catalog at all — an id missing from a delivered catalog is
  // a different story, and not one a retry or a credential would change.
  const hiddenResourceCount = useMemo(
    () => (allResources ? 0 : otherResources.filter((item) => item.type === 'dblResource').length),
    [allResources, otherResources],
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

  // Defense-in-depth admin gate: menu items in this codebase have no declarative
  // visibility/condition mechanism, so a non-admin can still trigger the command that opens this
  // dialog. Reject here instead. This check must run after all hooks above (Rules of Hooks
  // forbids an early return between hook calls), so it sits just before the render branch — and
  // ahead of every other branch, so a user who may not write here is never handed a control that
  // acts on the project.
  if (isCanWriteLoading) {
    return (
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8">
        <Spinner />
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

  // `ShareLayoutDialogContent` snapshots every list it edits into `useState` at mount, and Confirm
  // writes that snapshot back over the project settings. So the body must not mount until each
  // input to the snapshot has actually been DELIVERED — none of them can be recognised as absent
  // once it is in hand:
  //
  // - the project settings resolve to `EMPTY_RESOURCE_LIST` while loading, byte-identical to a
  //   genuinely empty shared list, so mounting early seeds `[]` and a Confirm erases the list;
  // - the personal lists are `undefined` in flight, and `seedResourceList` falls back to them, so
  //   mounting between the two arriving can share the personal selection to the whole team;
  // - the catalog is what `splitResourcesByTab` classifies saved dblResource references with.
  //
  // The window is the normal case rather than a narrow race: mounting needs only `canWrite` (one
  // method round-trip), while a project setting needs a second PDP plus a subscribe plus its first
  // delivery.
  if (
    !hasCatalogSettledOnce ||
    isProjectResourcesLoading ||
    isProjectModelTextsLoading ||
    isProjectActiveTabLoading ||
    isPersonalResourcesLoading ||
    isPersonalModelTextsLoading
  ) {
    return (
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <ShareLayoutDialogContent
      initialModelText={seededModelText}
      initialActiveTab={seededActiveTab}
      initialScriptureResources={scriptureResources}
      initialCommentaryResources={commentaryResources}
      allResources={allResources ?? []}
      // `!hasResourcesSettled` counts as loading, as it does in the other two picker hosts. The
      // mount gate above consumed only the FIRST settle; a refetch driven from inside the mounted
      // dialog has not started during the render between the click and `usePromise`'s effect, and
      // reading `isLoading` alone there paints a settled picker body over a fetch that has not run.
      isResourcesLoading={isResourcesLoading || !hasResourcesSettled}
      hasResourcesError={hasRetryableCatalogError}
      onRetryResources={onRetryResources}
      areDownloadsUnavailable={areDownloadsUnavailable}
      hiddenResourceCount={hiddenResourceCount}
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
