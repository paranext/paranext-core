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
import type { DblResourceData } from 'platform-bible-utils';
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

// Module scope so the "no catalog" case is one stable reference rather than a fresh array each
// render — `TeamLayoutDialogContent` memoizes an index of this by identity.
const NO_RESOURCES: DblResourceData[] = [];

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
  const [localizedStrings, areStringsLoading] = useLocalizedStrings(TEAM_LAYOUT_STRING_KEYS);
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

  // `canUserWriteProjectTextConnectionSettings` resolves to C#'s `IsUserProjectAdministrator()` —
  // the project-admin check, which is the right authority for the project-level settings this
  // dialog writes, including the team structure lock. The coupling is implicit: narrowing that
  // method to a connection-specific permission would change this gate's meaning with no
  // compile-time signal. `use-structure-protection-state.hook.ts` carries the same note for the
  // read side.
  //
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

  // The same reasoning for the two resource lists, which fail differently and worse. A failed read
  // maps to `undefined`, and `seedResourceList` falls back to the admin's PERSONAL list on
  // `undefined` — so an error delivery (which clears `isLoading` exactly like a real value, so the
  // mount gate passes) seeds the body from the admin's own selections and a Save publishes them to
  // the team. The per-field change detection in `handleConfirm` does NOT close this: it compares the
  // result against the same personal-list seed, so an untouched field compares equal and an EDITED
  // one writes the personal list plus the edit. Skip those writes entirely instead.
  const isProjectResourcesUnknown = isPlatformError(projectResourcesSetting);
  const isProjectModelTextsUnknown = isPlatformError(projectModelTextsSetting);

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

  // Of the references the dialog cannot display, how many are in the team's text collection. They
  // survive Confirm untouched, so the hint's count has to include them or it under-reports what the
  // team will see.
  const hiddenInTextCollectionCount = useMemo(
    () => otherResources.filter((item) => item.isInTextCollection).length,
    [otherResources],
  );

  const seededModelTextItems = useMemo(
    () => seedResourceList(projectModelTexts, personalModelTexts),
    [projectModelTexts, personalModelTexts],
  );
  const seededModelText: ResourceReference | undefined = seededModelTextItems[0];

  // `seedScalar` returns the plain `string | undefined` of the persisted setting, so narrow it with
  // the type guard to ensure only known tab values are trusted.
  const seededActiveTabRaw = seedScalar(projectActiveTab, undefined);
  const seededActiveTab =
    seededActiveTabRaw && isTeamLayoutActiveTab(seededActiveTabRaw)
      ? seededActiveTabRaw
      : undefined;

  // Whether every input the mounted body snapshots from is in hand RIGHT NOW. See the gate below
  // for why each one is required.
  //
  // `!textConnectionsProvider` is the load-bearing term for the two personal lists, not a
  // belt-and-braces addition: their promises are bare optional-chained calls on that provider, so
  // while it is unresolved they settle IMMEDIATELY with `undefined` and both loading flags read
  // `false` for the entire window they appear to guard. Without this term the gate would let the
  // body mount and seed an empty personal list, which is the "share an untimely-empty list with the
  // whole team" failure the gate exists to prevent.
  const areAllGateInputsReady =
    hasResourcesSettled &&
    !isProjectResourcesLoading &&
    !isProjectModelTextsLoading &&
    !isProjectActiveTabLoading &&
    !isProjectStructureProtectedLoading &&
    !!textConnectionsProvider &&
    !isPersonalResourcesLoading &&
    !isPersonalModelTextsLoading;

  // Latches on the first render where they are ALL ready at once, and never re-closes.
  //
  // Latched because `useProjectSetting` flips its `isLoading` back to `true` whenever its data
  // provider's identity changes, and installing, updating or removing ANY extension reloads them all
  // and churns those network objects — an ordinary operation, not a host restart. Without the latch
  // that reopens the gate, unmounts the body, and destroys every `useState` snapshot the admin has
  // edited. A retry driven from inside the mounted dialog is the same story.
  //
  // Latched on the inputs TOGETHER rather than one latch each: a per-input latch opens the gate once
  // each input has settled at some point, which is satisfiable even when an earlier one has since
  // gone back to loading and is reporting its `defaultValue` again — exactly the erasure this gate
  // exists to prevent.
  //
  // Written in an effect, not during render: a render React starts and throws away (a StrictMode
  // double-invoke, an interrupted concurrent render) must not be able to latch the gate open from
  // state the committed tree never saw. Same discipline as `use-deferred-dock-layout-read.hook.ts`,
  // and as `useRetryablePromise` documents for itself.
  const [haveGateInputsEverBeenReady, setHaveGateInputsEverBeenReady] = useState(false);
  useEffect(() => {
    if (areAllGateInputsReady) setHaveGateInputsEverBeenReady(true);
  }, [areAllGateInputsReady]);

  // The seed the mounted body was handed, captured at the same commit the gate first opens.
  //
  // All four are partitions or elements of ONE `seededItems`, and Confirm both concatenates them
  // and reference-compares the body's result against them, so they must come from the same
  // `seededItems` the body was mounted with. They cannot be read live at Confirm time: their memos
  // take `allResources` as a dep, and a catalog retry driven from inside the open dialog
  // (`onRetryResources`, reachable from the retry button and from both embedded pickers) hands
  // every one of them a fresh identity. Live, that would re-partition `otherResources` underneath
  // the mounted body AND make every untouched field fail its `!==` test, writing lists the admin
  // never saw — including, on a project that has never shared a layout, the admin's own personal
  // selections.
  //
  // Captured together in one effect, for the same reason the gate latches its inputs together: a
  // per-value latch could mix values from different `seededItems`.
  const mountedSeedRef = useRef<
    | {
        scriptureResources: ResourceReference[];
        commentaryResources: ResourceReference[];
        otherResources: ResourceReference[];
        modelText: ResourceReference | undefined;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    if (areAllGateInputsReady && mountedSeedRef.current === undefined)
      mountedSeedRef.current = {
        scriptureResources,
        commentaryResources,
        otherResources,
        modelText: seededModelText,
      };
  }, [
    areAllGateInputsReady,
    scriptureResources,
    commentaryResources,
    otherResources,
    seededModelText,
  ]);

  const handleConfirm = useCallback(
    async (result: TeamLayoutResult) => {
      // The seed the body was mounted with. Absent only if Confirm somehow ran before the gate
      // opened, which cannot happen — the body is not rendered until then — but treat it as a
      // failure rather than silently comparing against nothing.
      // Cleared at the start of every attempt, so the destructive alert always describes the
      // attempt the admin is looking at rather than staying pinned over a screen they have since
      // edited.
      setHasSaveError(false);

      const seed = mountedSeedRef.current;
      if (!seed) {
        setHasSaveError(true);
        return;
      }

      // Each setter runs only if its own field actually changed. The lock is now the only control
      // in this dialog for a setting that has no other UI, so an admin opening it purely to flip the
      // lock is an ordinary path — and on a project that has never shared a layout, `seedResourceList`
      // seeds the resource lists from the admin's PERSONAL selections. Writing those unconditionally
      // would publish one person's resource list to the whole team as a side effect of an action
      // that has nothing to do with resources.
      //
      // Reference equality is the right test, and it is compared against `mountedSeedRef` rather
      // than the live memos: the body snapshots its `initial*` props at mount and never mutates
      // them, so an untouched field comes back as the identical array the seed holds — while the
      // live memos take a fresh identity on any catalog retry, which would fail the test for a
      // field nobody touched.
      const writes: Promise<unknown>[] = [];
      // A field this Confirm intends to write whose setter is `undefined`. `useProjectSetting`
      // returns no setter for as long as its data provider is unresolved, and the gate is
      // deliberately latched open across exactly that window (see the latch comment above), so the
      // body can be live and interactive while a setter is missing. Skipping it silently would
      // close the dialog reporting a save that never reached the project.
      let hasUnavailableSetter = false;
      const queueWrite = (setter: unknown, run: () => Promise<unknown> | undefined) => {
        // Only the setter's ABSENCE counts as unavailable. A setter that returns something other
        // than a promise is still a setter that ran; there is just nothing to await.
        if (!setter) {
          hasUnavailableSetter = true;
          return;
        }
        const promise = run();
        if (promise) writes.push(promise);
      };

      if (
        !isProjectResourcesUnknown &&
        (result.scriptureResources !== seed.scriptureResources ||
          result.commentaryResources !== seed.commentaryResources)
      ) {
        queueWrite(setProjectResources, () =>
          setProjectResources?.({
            dataVersion: projectResources?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
            items: [
              ...result.scriptureResources,
              ...result.commentaryResources,
              ...seed.otherResources,
            ],
          }),
        );
      }
      if (!isProjectModelTextsUnknown && result.modelText !== seed.modelText) {
        queueWrite(setProjectModelTexts, () =>
          setProjectModelTexts?.({
            dataVersion: projectModelTexts?.dataVersion ?? EMPTY_RESOURCE_LIST.dataVersion,
            items: result.modelText ? [result.modelText] : [],
          }),
        );
      }
      if (result.activeTab !== seededActiveTab)
        queueWrite(setProjectActiveTab, () => setProjectActiveTab?.(result.activeTab ?? ''));
      // Written unconditionally when its value is known, rather than compared against the seed like
      // the settings above: this dialog is the lock's only control, so "Save writes the state you
      // see" is what an admin expects of it. Skipped entirely when the current value could NOT be
      // read — see `isTeamLockUnknown`.
      //
      // Structure protection is a Simple-mode feature throughout: it is unenforced in Power mode
      // (`useStructureProtectionState`'s `isProtectionActive`), and the only opener of this dialog
      // is itself Simple-mode-gated, so there is no mode in which this write is reachable but
      // inert.
      if (!isTeamLockUnknown)
        queueWrite(setProjectStructureProtected, () =>
          setProjectStructureProtected?.(result.isStructureProtectedForTeam),
        );

      // A project-setting write can be REFUSED — the Send/Receive write gate rejects during an
      // automatic sync — so the dialog must not report success until every write has landed.
      // Closing optimistically would tell the admin the team lock was saved when nothing was, and
      // this dialog is the lock's only UI, so there is no second place to notice.
      //
      // `allSettled`, not `all`: the four writes are independent and non-atomic, so `all` would
      // report the first rejection while its siblings were still in flight and free to commit.
      // Settling them all means the failure message describes a finished state. It is still a
      // PARTIAL state — the message says so, and says the dialog's values are the intended end
      // state, because a retry from here is idempotent.
      const outcomes = await Promise.allSettled(writes);
      if (hasUnavailableSetter || outcomes.some((outcome) => outcome.status === 'rejected')) {
        setHasSaveError(true);
        return;
      }
      submitDialog(true);
    },
    [
      projectResources,
      projectModelTexts,
      seededActiveTab,
      isTeamLockUnknown,
      isProjectResourcesUnknown,
      isProjectModelTextsUnknown,
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
  // `undefined` is "not decided yet", NOT "denied". `usePromise` starts `isLoading` at `true`, so
  // the reason `undefined` persists is not a late effect: the factory optional-chains a project data
  // provider that is `undefined` until it resolves, so it SETTLES IMMEDIATELY with `undefined`.
  // Gating on `isCanWriteLoading` alone therefore falls through to the render-nothing branch below
  // for the whole permission round-trip, collapsing the modal to a sliver showing only its close
  // button. Only an explicit `false` denies.
  if (isCanWriteLoading || canWrite === undefined) {
    return (
      <TeamLayoutDialogSkeleton
        localizedStrings={localizedStrings}
        areStringsLoading={areStringsLoading}
      />
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
  if (!haveGateInputsEverBeenReady) {
    return (
      <TeamLayoutDialogSkeleton
        localizedStrings={localizedStrings}
        areStringsLoading={areStringsLoading}
      />
    );
  }

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
      allResources={allResources ?? NO_RESOURCES}
      // `!hasResourcesSettled` counts as loading, as it does in the other two picker hosts. The
      // mount gate above consumed only the FIRST settle; a refetch driven from inside the mounted
      // dialog has not started during the render between the click and `usePromise`'s effect, and
      // reading `isLoading` alone there paints a settled picker body over a fetch that has not run.
      isResourcesLoading={isResourcesLoading || !hasResourcesSettled}
      hasResourcesError={hasRetryableCatalogError}
      onRetryResources={onRetryResources}
      areDownloadsUnavailable={areDownloadsUnavailable}
      hiddenResourceCount={hiddenResourceCount}
      hiddenInTextCollectionCount={hiddenInTextCollectionCount}
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
