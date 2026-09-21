import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useLocalizedStrings,
  useProjectDataProvider,
  useProjectSetting,
} from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { isPlatformError } from 'platform-bible-utils';
import { usePromise, useRetryablePromise } from 'platform-bible-react';
import { RESOURCE_PICKER_DIALOG_STRING_KEYS } from 'platform-bible-react/experimental';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DIALOG_BASE, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  ShareLayoutDialogOptions,
  SHARE_LAYOUT_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import {
  TeamLayoutDialogContent,
  TeamLayoutDialogSkeleton,
  TeamLayoutResult,
  TEAM_LAYOUT_DIALOG_STRING_KEYS,
  isTeamLayoutActiveTab,
} from '@renderer/components/dialogs/team-layout.component';
import {
  seedResourceList,
  seedScalar,
  splitResourcesByTab,
} from '@renderer/components/dialogs/team-layout.utils';

const EMPTY_RESOURCE_LIST: ResourceReferenceList = { dataVersion: '1.0.0', items: [] };

// `useLocalizedStrings`'s `localizationKeys` param must be a stable reference (see its JSDoc) —
// spreading a frozen array into a new array literal on every render breaks that contract and
// causes an infinite update loop. Hoist to module scope so the array identity never changes.
const TEAM_LAYOUT_STRING_KEYS = [...TEAM_LAYOUT_DIALOG_STRING_KEYS];
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
function TeamLayoutDialogWrapper({
  projectId,
  submitDialog,
  cancelDialog,
}: DialogProps<boolean> &
  Omit<ShareLayoutDialogOptions, 'projectId'> & {
    projectId?: ShareLayoutDialogOptions['projectId'];
  }) {
  const [localizedStrings] = useLocalizedStrings(TEAM_LAYOUT_STRING_KEYS);
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

  // Same latch, for the same reason, for every other input to the mount gate. `useProjectSetting`
  // flips its `isLoading` back to `true` whenever its data provider's identity changes, and
  // installing, updating or removing ANY extension reloads them all and churns those network
  // objects — an ordinary operation, not a host restart. Without a latch, that reopens the gate,
  // unmounts the body, and destroys every `useState` snapshot the admin has edited.
  const settledOnceRef = useRef<Record<string, boolean>>({});
  const hasSettledOnce = (key: string, isLoading: boolean, isReady = true) => {
    if (isReady && !isLoading) settledOnceRef.current[key] = true;
    return settledOnceRef.current[key] === true;
  };

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
  const [
    projectStructureProtectedSetting,
    setProjectStructureProtected,
    ,
    isProjectStructureProtectedLoading,
  ] = useProjectSetting(projectId, 'platformScripture.structureProtected', false);

  // Headed by the project this layout is for, in the `shortName - fullName` format whose source of
  // truth is `ProjectSelector`'s `triggerLabelFormat="shortNameAndFullName"` branch
  // (`lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx`).
  // No shared formatter exists for it; the separator AND the skip-when-equal rule below must stay in
  // agreement with that branch, or the same project reads two different ways in two places.
  const [projectShortNameSetting] = useProjectSetting(projectId, 'platform.name', '');
  const [projectFullNameSetting] = useProjectSetting(projectId, 'platform.fullName', '');

  const textConnectionsProvider = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  // `useRetryablePromise` rather than `usePromise` for its `hasError`: `usePromise` reports a
  // REJECTION as `isLoading: false` with the value left at its `undefined` default, which is
  // indistinguishable from "not decided yet" — so the gate below would hold the dialog on a
  // convincing skeleton forever, with no cancel path, whenever this one call fails.
  const {
    data: canWrite,
    isLoading: isCanWriteLoading,
    hasError: hasCanWriteError,
  } = useRetryablePromise(
    useCallback(
      async () => textConnectionsProvider?.canUserWriteProjectTextConnectionSettings(),
      [textConnectionsProvider],
    ),
  );

  // An explicit denial or a genuine rejection closes the dialog. Deliberately NOT keyed on a
  // settled flag: while the project data provider is unresolved the optional-chained call above
  // resolves immediately to `undefined`, so a settled-flag check would close the dialog on open —
  // and the flag's reset lags a render behind the provider arriving, so the race is not
  // theoretical. `canWrite === undefined` is "not decided yet" and never denies.
  useEffect(() => {
    if (canWrite === false || hasCanWriteError) cancelDialog();
  }, [canWrite, hasCanWriteError, cancelDialog]);

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

  const mountedOtherResourcesRef = useRef<ResourceReference[] | undefined>(undefined);
  const [hasSaveError, setHasSaveError] = useState(false);

  const projectResources = isPlatformError(projectResourcesSetting)
    ? undefined
    : projectResourcesSetting;
  const projectModelTexts = isPlatformError(projectModelTextsSetting)
    ? undefined
    : projectModelTextsSetting;
  const projectActiveTab = isPlatformError(projectActiveTabSetting)
    ? undefined
    : projectActiveTabSetting;
  // A failed read falls back to "not locked" only so the switch has something to render. It must
  // never be SAVED: writing that fallback back would silently unlock USFM structure for every
  // translator on the project, which is the same team-wide erasure the mount gate below exists to
  // prevent, reached through the error path instead of the loading path. So the dialog disables the
  // control and skips its write instead, following `useStructureProtectionState`'s `adminSettingError`.
  const isTeamLockUnknown = isPlatformError(projectStructureProtectedSetting);
  const isStructureProtectedForTeam = isTeamLockUnknown ? false : projectStructureProtectedSetting;

  const projectName = useMemo(() => {
    const shortName = isPlatformError(projectShortNameSetting) ? '' : projectShortNameSetting;
    const fullName = isPlatformError(projectFullNameSetting) ? '' : projectFullNameSetting;
    if (!shortName) return fullName || undefined;
    if (!fullName || fullName === shortName) return shortName;
    return `${shortName} - ${fullName}`;
  }, [projectShortNameSetting, projectFullNameSetting]);

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
    seededActiveTabRaw && isTeamLayoutActiveTab(seededActiveTabRaw)
      ? seededActiveTabRaw
      : undefined;

  const handleConfirm = useCallback(
    async (result: TeamLayoutResult) => {
      // Each setter runs only if its own field actually changed. The lock is now the only control
      // in this dialog for a setting that has no other UI, so an admin opening it purely to flip the
      // lock is an ordinary path — and on a project that has never shared a layout, `seedResourceList`
      // seeds the resource lists from the admin's PERSONAL selections. Writing those unconditionally
      // would publish one person's resource list to the whole team as a side effect of an action
      // that has nothing to do with resources.
      //
      // Reference equality is the right test: the wrapper passes its own memoized values as the
      // `initial*` props and the mounted body never mutates them, so an untouched field comes back
      // as the identical array.
      const writes: (Promise<unknown> | undefined)[] = [];
      if (
        result.scriptureResources !== scriptureResources ||
        result.commentaryResources !== commentaryResources
      ) {
        writes.push(
          setProjectResources?.({
            dataVersion: projectResources?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
            items: [
              ...result.scriptureResources,
              ...result.commentaryResources,
              ...(mountedOtherResourcesRef.current ?? otherResources),
            ],
          }),
        );
      }
      if (result.modelText !== seededModelText) {
        writes.push(
          setProjectModelTexts?.({
            dataVersion: projectModelTexts?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
            items: result.modelText ? [result.modelText] : [],
          }),
        );
      }
      if (result.activeTab !== seededActiveTab)
        writes.push(setProjectActiveTab?.(result.activeTab ?? ''));
      // Written whatever mode the app is in. The lock is a team-wide project setting an admin is
      // explicitly here to set, so this dialog is the one place it can be changed regardless of the
      // admin's own mode; enforcing the lock in the editor remains Simple-mode only. Skipped
      // entirely when the current value could not be read — see `isTeamLockUnknown`.
      if (!isTeamLockUnknown)
        writes.push(setProjectStructureProtected?.(result.isStructureProtectedForTeam));

      // A project-setting write can be REFUSED — the Send/Receive write gate rejects during an
      // automatic sync — so the dialog must not report success until every write has landed.
      // Closing optimistically would tell the admin the team lock was saved when nothing was, and
      // this dialog is the lock's only UI, so there is no second place to notice.
      try {
        await Promise.all(writes);
      } catch {
        setHasSaveError(true);
        return;
      }
      setHasSaveError(false);
      submitDialog(true);
    },
    [
      projectResources,
      projectModelTexts,
      otherResources,
      scriptureResources,
      commentaryResources,
      seededModelText,
      seededActiveTab,
      isTeamLockUnknown,
      setProjectResources,
      setProjectModelTexts,
      setProjectActiveTab,
      setProjectStructureProtected,
      submitDialog,
    ],
  );

  // Defense-in-depth admin gate: menu items in this codebase have no declarative
  // visibility/condition mechanism, so a non-admin can still trigger the command that opens this
  // dialog. Reject here instead. This check must run after all hooks above (Rules of Hooks
  // forbids an early return between hook calls), so it sits just before the render branch — and
  // ahead of every other branch, so a user who may not write here is never handed a control that
  // acts on the project.
  // `undefined` is "not decided yet", NOT "denied": `usePromise` reports `isLoading: false` on its
  // first renders, before its effect has even started the call. Gating on `isCanWriteLoading` alone
  // therefore falls through to the render-nothing branch below for the whole permission round-trip,
  // collapsing the modal to a sliver showing only its close button. Only an explicit `false`
  // denies.
  if (isCanWriteLoading || canWrite === undefined) {
    return <TeamLayoutDialogSkeleton localizedStrings={localizedStrings} />;
  }

  if (canWrite !== true) {
    // `DialogDefinitionBase['Component']` requires a `ReactElement` return, not `ReactElement |
    // null` — widening that shared type would affect every dialog in the codebase, so an empty
    // fragment is the narrowest way to render nothing here. The dialog is cancelled a moment later
    // by the effect above, so this only shows briefly.
    // eslint-disable-next-line react/jsx-no-useless-fragment -- see comment above
    return <></>;
  }

  // `TeamLayoutDialogContent` snapshots every list it edits into `useState` at mount, and Confirm
  // writes that snapshot back over the project settings. So the body must not mount until each
  // input to the snapshot has actually been DELIVERED — none of them can be recognised as absent
  // once it is in hand:
  //
  // - the project settings resolve to `EMPTY_RESOURCE_LIST` while loading, byte-identical to a
  //   genuinely empty shared list, so mounting early seeds `[]` and a Confirm erases the list;
  // - the personal lists are `undefined` in flight, and `seedResourceList` falls back to them, so
  //   mounting between the two arriving can share the personal selection to the whole team;
  // - the catalog is what `splitResourcesByTab` classifies saved dblResource references with;
  // - the team structure lock resolves to `false` while loading, indistinguishable from a project
  //   that is genuinely unlocked, so mounting early and confirming would unlock it for everyone.
  //
  // The project name is deliberately NOT gated on: it is rendered straight from the setting rather
  // than snapshotted, so a late arrival just fills the heading in.
  //
  // The window is the normal case rather than a narrow race: mounting needs only `canWrite` (one
  // method round-trip), while a project setting needs a second PDP plus a subscribe plus its first
  // delivery.
  // Each flag is consumed through its settled-once latch rather than read raw — see `hasSettledOnce`.
  // The two personal lists additionally require `textConnectionsProvider`: their promises are bare
  // optional-chained calls that resolve to `undefined` immediately while the provider is
  // unresolved, so latching on the flag alone would mark an EMPTY personal list settled and
  // reintroduce the "share an untimely-empty list with the whole team" failure this gate exists to
  // prevent.
  if (
    !hasCatalogSettledOnce ||
    !hasSettledOnce('projectResources', isProjectResourcesLoading) ||
    !hasSettledOnce('projectModelTexts', isProjectModelTextsLoading) ||
    !hasSettledOnce('projectActiveTab', isProjectActiveTabLoading) ||
    !hasSettledOnce('projectStructureProtected', isProjectStructureProtectedLoading) ||
    !hasSettledOnce('personalResources', isPersonalResourcesLoading, !!textConnectionsProvider) ||
    !hasSettledOnce('personalModelTexts', isPersonalModelTextsLoading, !!textConnectionsProvider)
  ) {
    return <TeamLayoutDialogSkeleton localizedStrings={localizedStrings} />;
  }

  // Latched at the same render the gate first lets the body through, NOT earlier: `otherResources`
  // is a partition of `seededItems`, and latching before the gate would capture a partition of a
  // list the mounted body was never seeded from. The body snapshots its two visible lists at mount
  // and never re-seeds; Confirm concatenates all three, so they must all come from that one
  // `seededItems`. Without this, retrying a failed catalog fetch from inside the open dialog
  // re-partitions `otherResources` underneath the mounted body and a save erases the difference.
  if (mountedOtherResourcesRef.current === undefined)
    mountedOtherResourcesRef.current = otherResources;

  return (
    <TeamLayoutDialogContent
      initialModelText={seededModelText}
      initialActiveTab={seededActiveTab}
      initialScriptureResources={scriptureResources}
      initialCommentaryResources={commentaryResources}
      initialIsStructureProtectedForTeam={isStructureProtectedForTeam}
      isTeamLockUnknown={isTeamLockUnknown}
      hasSaveError={hasSaveError}
      projectName={projectName}
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

export const TEAM_LAYOUT_DIALOG: DialogDefinition<typeof SHARE_LAYOUT_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: SHARE_LAYOUT_DIALOG_TYPE,
  defaultTitle: '%shareLayoutDialog_teamLayout_title%',
  // A cap, not a fixed width: the modal host applies this as `maxWidth` over a `w-full`
  // DialogContent, so the dialog takes the available app width and stops here. Sized so each of
  // the three equal columns clears ~400px — the third carries tabs, a resource list, a select and
  // a wrapping hint, and below that it truncates resource names it should be showing in full.
  initialSize: { width: 1240, height: 720 },
  Component: TeamLayoutDialogWrapper,
});

export default TEAM_LAYOUT_DIALOG;
