import { useCallback, useMemo, useRef } from 'react';
import { useProjectDataProvider, useSetting } from '@papi/frontend/react';
import { isPlatformError } from 'platform-bible-utils';
import type { EffectiveResourceReference, ResourceReferenceList } from 'platform-scripture';
import {
  mergeResourceReferenceLists,
  useEffectiveResourceReferenceList,
  type EffectiveResourceReferenceListState,
} from './use-effective-resource-reference-list.hook';
import {
  CURRENT_DATA_VERSION,
  DEFAULT_RESOURCE_REFERENCE_LIST,
} from './resource-reference-list.const';
import { filterFreeReferences } from './free-resources.utils';

/** The two project settings whose reference lists a reading panel can be driven by. */
export type ReferenceListSettingName =
  | 'platformScripture.modelTexts'
  | 'platformScripture.referencedProjectsAndResources';

/**
 * Where a reading panel's chosen resources come from, and how to read and write them.
 *
 * The shape is deliberately identical whether the source is a project or the app: `state` is the
 * same discriminated union the panels already branch on, and the two callbacks are what
 * `selectTextConnection` expects. A panel therefore needs one branch — which source — and no second
 * copy of its readiness/install/render state machine.
 */
export type ResourceReferenceSource = {
  /**
   * Readiness of the effective list. See {@link EffectiveResourceReferenceListState}: `ready` may
   * carry zero items, and that is the only state in which a panel may render its empty prompt.
   */
  state: EffectiveResourceReferenceListState;
  /** Reads the raw user-level list, for the read-modify-write in `selectTextConnection`. */
  getUserList: () => Promise<ResourceReferenceList | undefined>;
  /** Writes the user-level list. */
  setUserList: (list: ResourceReferenceList) => Promise<unknown>;
  /** Whether the app-scoped (no-project) source is in use. */
  isNoProject: boolean;
};

/** The app-scoped setting that stands in for each project setting when no project is open. */
const NO_PROJECT_SETTING_NAMES = {
  'platformScripture.modelTexts': 'platformScriptureEditor.noProjectModelTexts',
  'platformScripture.referencedProjectsAndResources':
    'platformScriptureEditor.noProjectReferencedResources',
} as const;

/** An empty item list, for the branches that have nothing to show. */
const EMPTY_ITEMS: EffectiveResourceReference[] = [];

/**
 * Resolves the reference list a reading panel should show: from the project when one is open, and
 * from an app-scoped setting when none is.
 *
 * ## Why the no-project list is not a project setting
 *
 * The project path persists user picks in the `platformScripture.textConnectionSettings` project
 * data provider, which does not exist without a project. `useWebViewState` is not a substitute:
 * Simple mode never persists its layout, so a pick would be lost on every restart — for exactly the
 * user this exists to help. The app-scoped settings named in {@link NO_PROJECT_SETTING_NAMES} carry
 * the same `ResourceReferenceList` shape, so everything downstream of this hook is unchanged.
 *
 * The two lists never migrate into a project. Opening one reloads both panels with a real
 * `projectId` and the project source takes over; the no-project list stays where it is and comes
 * back if the user is ever project-less again. Copying it into the project would write into a
 * setting that is shared and admin-visible.
 *
 * ## Free-resource filtering
 *
 * The no-project branch filters its items through `filterFreeReferences` on the way OUT — when the
 * list is READ — and not on the way in. A UID stored while the allowlist was wider, or edited into
 * the setting by hand, must not keep rendering; but nor should it be destroyed, since the curated
 * list is expected to widen. Refusing newly ADDED non-free references is
 * `noProjectReferenceListValidator`'s job, at the layer every writer passes through.
 *
 * Every underlying hook is called unconditionally and the result is selected afterwards, so hook
 * order is stable whether or not a project is open. `useEffectiveResourceReferenceList(undefined,
 * …)` reports `loading` forever, which is why its value is ignored rather than trusted in the
 * no-project branch.
 *
 * @param projectId The panel's container project, or `undefined` when no project is open.
 * @param settingName Which reference list this panel reads.
 * @returns See {@link ResourceReferenceSource}.
 */
export function useResourceReferenceSource(
  projectId: string | undefined,
  settingName: ReferenceListSettingName,
): ResourceReferenceSource {
  const isModelTexts = settingName === 'platformScripture.modelTexts';

  // #region Project-backed source

  const projectState = useEffectiveResourceReferenceList(projectId, settingName);
  const textConnectionsPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  // #endregion

  // #region App-scoped source

  // One subscription, for the setting this panel actually reads. Both keys are declared
  // `ResourceReferenceList`, so indexing by the caller's setting name keeps a concrete type — an
  // earlier version read both unconditionally on the belief that it would not, which cost every
  // panel instance a second live PAPI subscription and a second `get()` round trip on every
  // app-wide settings write. Simple mode mounts three of these panels, so that was six
  // subscriptions where three do, and all six are waste whenever a project is open.
  const [storedList, setStoredList, , isLoadingStored] = useSetting(
    NO_PROJECT_SETTING_NAMES[settingName],
    DEFAULT_RESOURCE_REFERENCE_LIST,
  );

  // Latest RENDERED stored value, for the async callbacks below. It keeps them at a stable identity
  // while still seeing setting updates, which a render closure would not.
  //
  // Note this is weaker than the project branch's `getUserList`, which does an authoritative read
  // through the data provider: a write's own subscription echo has to land in a committed render
  // before it shows up here. Two picks inside that window would read the same snapshot and the
  // second would drop the first. Not reachable from the UI — a pick goes through a modal — so this
  // is a known asymmetry between the two branches rather than a live bug.
  const storedListRef = useRef(storedList);
  storedListRef.current = storedList;

  const noProjectState = useMemo<EffectiveResourceReferenceListState>(() => {
    if (isLoadingStored) return { status: 'loading' };
    if (isPlatformError(storedList)) return { status: 'error' };

    // Nothing validates this value on READ — the registered validator runs on write only, and the
    // contributed `default` is not substituted for a key that is present but corrupt. So the stored
    // JSON can be anything the declared type does not admit, `null` included, which
    // `isPlatformError` does not catch either. Optional chaining matters: hooks cannot be
    // conditional, so this memo runs even when a project is open, and a throw here would take the
    // panel down for a user who never touched the no-project feature.
    const items = Array.isArray(storedList?.items) ? storedList.items : EMPTY_ITEMS;

    // Reuses the project path's merge rather than re-normalizing here, so dedup, unknown-type
    // filtering, and `source` tagging have exactly one implementation. The admin layer is empty
    // because there is no project to carry one.
    return {
      status: 'ready',
      list: mergeResourceReferenceLists(DEFAULT_RESOURCE_REFERENCE_LIST, {
        dataVersion: CURRENT_DATA_VERSION,
        items: filterFreeReferences(items),
      }),
    };
  }, [isLoadingStored, storedList]);

  const getNoProjectList = useCallback(async () => {
    const { current } = storedListRef;
    return isPlatformError(current) ? undefined : current;
  }, []);

  const setNoProjectList = useCallback(
    async (list: ResourceReferenceList) => {
      // `useSetting`'s setter is `undefined` until the settings data provider resolves (see
      // `create-use-data-hook.util.ts`), so a pick made in that window has nowhere to go. Resolving
      // to `undefined` mirrors the project branch, which does the same before its PDP arrives —
      // and beats the TypeError that calling through would raise mid-write.
      if (!setStoredList) return undefined;
      return setStoredList({
        ...list,
        // Written fresh rather than echoed back from storage. `selectTextConnection` round-trips
        // whatever `dataVersion` it read, so a stored value the validator rejects would fail every
        // future pick — permanently, and invisibly, since the read path relabels it for display and
        // this setting is hidden with no repair UI.
        dataVersion: CURRENT_DATA_VERSION,
        // Written through unfiltered, deliberately. Filtering here destroyed any stored entry the
        // allowlist did not currently cover: `selectTextConnection` round-trips the whole list, so
        // one unrelated pick permanently dropped a resource that a later, wider allowlist would
        // have restored. The exclusion guarantee does not need this — the picker is restricted, the
        // read path filters what is shown, and `noProjectReferenceListValidator` refuses newly
        // ADDED non-free references while letting stored ones survive.
        items: Array.isArray(list.items) ? list.items : [],
      });
    },
    [setStoredList],
  );

  // #endregion

  const getProjectList = useCallback(async () => {
    if (!textConnectionsPdp) return undefined;
    return isModelTexts
      ? textConnectionsPdp.getUserModelTexts()
      : textConnectionsPdp.getUserReferencedProjectsAndResources();
  }, [textConnectionsPdp, isModelTexts]);

  const setProjectList = useCallback(
    async (list: ResourceReferenceList) => {
      if (!textConnectionsPdp) return undefined;
      return isModelTexts
        ? textConnectionsPdp.setUserModelTexts(list)
        : textConnectionsPdp.setUserReferencedProjectsAndResources(list);
    },
    [textConnectionsPdp, isModelTexts],
  );

  const isNoProject = projectId === undefined;

  return useMemo(
    () =>
      isNoProject
        ? {
            state: noProjectState,
            getUserList: getNoProjectList,
            setUserList: setNoProjectList,
            isNoProject: true,
          }
        : {
            state: projectState,
            getUserList: getProjectList,
            setUserList: setProjectList,
            isNoProject: false,
          },
    [
      isNoProject,
      noProjectState,
      getNoProjectList,
      setNoProjectList,
      projectState,
      getProjectList,
      setProjectList,
    ],
  );
}

export default useResourceReferenceSource;
