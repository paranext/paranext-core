import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useDeferredDockLayoutRead } from '@renderer/hooks/use-deferred-dock-layout-read.hook';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-shard';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { type ProjectMetadata } from '@shared/models/project-metadata.model';
import {
  PDP_FACTORY_OBJECT_TYPE,
  type ProjectMetadataFilterOptions,
} from '@shared/models/project-data-provider-factory.interface';
import { type NetworkObjectDetails } from '@shared/models/network-object.model';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { findFirstEditorWebViewDefinition } from '@shared/models/web-view.model';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';

/** How long to wait before retrying a failed metadata fetch. */
const METADATA_FETCH_RETRY_DELAY_MS = 5 * 1000;
/**
 * Maximum number of consecutive metadata fetch failures before the hook stops retrying. After this
 * many failures the picker stays empty until the next external refresh signal (e.g. an extension
 * reload or a PDPF registration).
 */
export const MAX_METADATA_FETCH_RETRIES = 3;
/** Debounce window that collapses rapid-fire PDPF registrations into a single metadata fan-out. */
const PDPF_REGISTRATION_DEBOUNCE_MS = 200;

/**
 * `projectInterface` a project must support to belong in the picker: it can be opened in the
 * scripture editor. This filter is applied service-side so the service's retry-until-non-empty
 * startup grace period keeps retrying until a factory that provides this interface has registered
 * (a bare unfiltered fetch settles as soon as any project - possibly a non-scripture one - appears,
 * before the layering PDPF that provides this interface registers). Published resources also carry
 * this interface via the Scripture Extender layering PDPF, so the current project and recent
 * projects (both always scripture or resource projects) resolve from the same filtered fetch.
 *
 * `src/main/startup-readiness.util.ts` deliberately keeps its own copy of this literal for its
 * startup readiness gate (see that file's rationale for why it isn't shared). If you change this
 * one, consider whether that one should change too.
 */
const PICKER_PROJECT_INTERFACE = 'platformScripture.USJ_Chapter';
const PICKER_METADATA_FILTER: ProjectMetadataFilterOptions = {
  includeProjectInterfaces: [PICKER_PROJECT_INTERFACE],
};

const EMPTY_RECENT_IDS: string[] = [];

/**
 * Resolves a project's language for display: the localized display name of the BCP-47 language tag
 * when it can be resolved, otherwise the raw language setting value for both fields. Returns
 * undefined when the project has no `language` setting, leaving the language column blank rather
 * than surfacing a `%project_language_missing%` placeholder. The guard is on `language`, NOT
 * `languageTag`: C# always populates a `languageTag` (coercing an unset writing system to 'en'), so
 * guarding on the tag would mislabel every language-less project as 'English'.
 */
function resolveLanguage(
  language: string,
  languageTag: string,
): { tag: string; displayName: string } | undefined {
  if (!language) return undefined;
  try {
    const displayName = new Intl.DisplayNames([navigator.language ?? 'en'], {
      type: 'language',
    }).of(languageTag);
    if (displayName) return { tag: languageTag, displayName };
  } catch {
    // fall through
  }
  return { tag: language, displayName: language };
}

/**
 * Converts cheap project metadata (already fetched via `projectLookupService`) into a `ProjectItem`
 * for display, without opening a project data provider. `fullName`/`name` are optional on
 * `ProjectMetadata`, so both fall back to the project id to guarantee defined display strings (and
 * a safe sort key for callers that sort by `fullName`). A present-but-empty value passes through
 * as-is - empty FullName is a real, deliberately-supported Paratext case.
 */
function metadataToProjectItem(m: ProjectMetadata): ProjectItem {
  const resolved = resolveLanguage(m.language ?? '', m.languageTag ?? '');
  return {
    id: m.id,
    fullName: m.fullName ?? m.name ?? m.id,
    shortName: m.name ?? m.id,
    language: resolved?.tag,
    languageDisplayName: resolved?.displayName,
  };
}

export type ProjectPickerData = {
  /**
   * The active Scripture editor's project. Named for Simple mode - where there is exactly one
   * project tab, so this unambiguously is "the current project" - because every consumer only reads
   * it in a Simple-mode context (the Power-mode toolbar hides the control that would show it). In
   * Power mode this still resolves (to whichever editor tab happens to be first), but that value is
   * not meaningful UI state there and MUST NOT be treated as a deliberate selection - see the
   * cache-writing effect below.
   */
  currentSimpleProject: ProjectItem | undefined;
  recentProjects: ProjectItem[];
  /** All projects, with recentProjects already excluded. */
  allProjects: ProjectItem[];
  /** Set when fetching details for the current project fails. */
  currentSimpleProjectError: string | undefined;
  isLoading: boolean;
};

/**
 * The three project lists the picker shows, plus the current project and its loading/error state.
 *
 * The flow, so the stages below can be checked against a whole: which project is ACTIVE comes from
 * a DEFERRED read of this window's dock layout, requested on every web view event (deferred because
 * a close event is emitted before the dock has adopted the new layout) and held in state as the
 * project id itself → the project METADATA comes from one service fan-out per refresh generation,
 * cached and shared by all three sections, invalidated only by events that can change which
 * projects exist → each section derives from those two, with its own failure handling, and the
 * current project falls back to a direct single-project lookup when it is absent from the shared
 * snapshot. Each stage has its own note where it is declared.
 */
export function useProjectPickerData(): ProjectPickerData {
  // Two independent invalidation signals, so cheap "which project is active?" updates don't drag in
  // the expensive project-metadata fan-out:
  // - metadataRefreshCounter is a GENERATION that invalidates the shared metadata fetch. Bumped
  //   only by events that can change the SET of available projects (extensions reloading, C#
  //   project-list changes), since "go refetch the list" has no value to compare against.
  // - activeEditorProjectId is the derived VALUE itself, re-read from the open web views on web
  //   view open/update/close - frequent during startup tab restoration - which costs only the
  //   cheap local web view enumeration and reuses the cached metadata.
  const [metadataRefreshCounter, setMetadataRefreshCounter] = useState(0);
  const readActiveEditorProjectId = useCallback((): string | undefined => {
    // THIS window's open web views, from the local dock layout — the same source
    // `navigation-target.util` resolves the main editor from. Deliberately not the `webViews`
    // network object, whose `getAllOpenWebViewDefinitions` fans out across every window: the
    // picker names the project of the editor in this window and feeds a toolbar that navigates
    // this window's target, so a background window's editor must never become this window's
    // current project.
    try {
      return findFirstEditorWebViewDefinition(getAllOpenWebViewDefinitionsSync())?.projectId;
    } catch (e) {
      // Loud rather than quiet: this read runs deferred, after the dock has adopted its new layout
      // (see `useDeferredDockLayoutRead`), so by this point this window's dock layout is
      // registered. A throw here means it never was, which is an anomaly worth finding in a log
      // rather than the ordinary timing of a first render. Both the enumeration and resolving the
      // editor from it are inside the try, so neither can escape a deferred callback and become an
      // unhandled error.
      logger.warn(
        `ProjectPicker: could not enumerate this window's web views: ${getErrorMessage(e)}`,
      );
      return undefined;
    }
  }, []);

  // Held as a VALUE rather than derived from a refresh counter. A web view event that leaves the
  // active editor's project unchanged produces the same string, and `useState` bails out on an
  // unchanged value — so the burst of web view events a project switch fires cannot re-render this
  // hook's consumer. A counter would re-render on every event by construction, because its value
  // changes even when the thing it stands in for did not. Those are network events, so every
  // window's web view activity re-reads it; the read above sees only THIS window's dock layout, so
  // another window's event resolves the same id and this update bails out.
  //
  // Starts undefined because there is no read during render: enumerating open web views
  // deliberately touches the WebViewState keep-alive set, which a discarded or double-invoked
  // render must not do, and a render-phase read could not see this window's dock layout on a first
  // render anyway. The deferred read below fills it in, one commit later at the outside.
  const [activeEditorProjectId, setActiveEditorProjectId] = useState<string | undefined>(undefined);
  const [currentSimpleProjectError, setCurrentSimpleProjectError] = useState<string | undefined>(
    undefined,
  );
  const refreshMetadata = useCallback(() => setMetadataRefreshCounter((n) => n + 1), []);
  const { requestRead: refreshActiveEditor } = useDeferredDockLayoutRead(
    useCallback(
      () => setActiveEditorProjectId(readActiveEditorProjectId()),
      [readActiveEditorProjectId],
    ),
  );

  // When getMetadataForAllProjects rejects (e.g. a PDPF's getAvailableProjects RPC times out
  // during startup), isRetryPending becomes true and the effect below schedules a re-fetch after
  // METADATA_FETCH_RETRY_DELAY_MS — by which time the extension host has typically drained its
  // queue and responds quickly. fetchRetryCountRef caps consecutive retries so a permanently
  // unavailable host does not loop forever.
  const [isRetryPending, setIsRetryPending] = useState(false);
  const fetchRetryCountRef = useRef(0);
  // A SECOND budget, for the current-project lookup, because that failure is independent of the
  // shared fan-out's. The two cannot share `fetchRetryCountRef`: the fan-out's success handler
  // resets it every generation, and it runs before this hook's own await, so a lookup that fails
  // while the fan-out succeeds would read a budget of 0 forever and retry for the life of the
  // window. Spent where the retry is armed rather than when the timer fires, since the shared
  // timer serves both budgets and cannot tell which one asked for it.
  const currentProjectRetryCountRef = useRef(0);

  const onDidOpenWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW), []);
  useEvent(onDidOpenWebView, refreshActiveEditor);
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refreshActiveEditor);
  const onDidCloseWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW), []);
  useEvent(onDidCloseWebView, refreshActiveEditor);
  // The first read. Declared AFTER the `useEvent` calls so it is requested once the subscriptions
  // are attached and an event fired in the gap cannot be missed.
  //
  // This is a fast path, not a synchronization point. It is what makes the picker name the current
  // project on the common startup, where the dock layout has registered and loaded its saved layout
  // by the time this deferred read runs; if the layout loads later than that, correctness comes from
  // the open event above, at the cost of the picker naming no current project for an extra render.
  useEffect(() => {
    refreshActiveEditor();
  }, [refreshActiveEditor]);
  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, refreshMetadata);
  // C#-emitted (LocalParatextProjects.PROJECTS_CHANGED_EVENT_TYPE) when the project SET changes
  // (added/removed via S/R, DBL, etc.) or a project's display metadata changes. This is the precise
  // signal that onDidReloadExtensions only approximated; invalidate the metadata cache on it so all
  // three sections refetch.
  const onDidChangeProjects = useMemo(() => getNetworkEvent('platform.onDidChangeProjects'), []);
  useEvent(onDidChangeProjects, refreshMetadata);
  // Heal the project list when a PDP factory registers after the startup grace window expires.
  // internalGetMetadataWithRetries only retries within 30 s of process start; if the
  // USJ-providing layering PDPF (Scripture Extender) arrives after that window AND neither
  // onDidReloadExtensions nor onDidChangeProjects fires, the picker stays empty until the user
  // triggers an unrelated refresh. Subscribing here ensures a late-arriving PDPF always heals
  // the list independent of the 30-second bound.
  const onDidCreateNetworkObject = useMemo(
    () => getNetworkEvent('object:onDidCreateNetworkObject'),
    [],
  );
  // Debounce to collapse N rapid-fire PDPF registrations (e.g. after extension reload) into a
  // single getMetadataForAllProjects fan-out. Without debouncing, each registration arrives as a
  // separate WebSocket message that React 18 cannot batch, producing N wasted fan-outs.
  const pdpfRefreshTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onPdpFactoryRegistered = useCallback(
    ({ objectType }: NetworkObjectDetails) => {
      if (objectType !== PDP_FACTORY_OBJECT_TYPE) return;
      clearTimeout(pdpfRefreshTimerRef.current);
      pdpfRefreshTimerRef.current = setTimeout(refreshMetadata, PDPF_REGISTRATION_DEBOUNCE_MS);
    },
    [refreshMetadata],
  );
  useEvent(onDidCreateNetworkObject, onPdpFactoryRegistered);
  // Cancel any pending debounced refresh on unmount to prevent state updates after teardown.
  useEffect(() => () => clearTimeout(pdpfRefreshTimerRef.current), []);
  // After a failed metadata fetch, wait METADATA_FETCH_RETRY_DELAY_MS before trying again.
  // The timer is cancelled if the hook unmounts before it fires, preventing state updates on an
  // unmounted component and avoiding spurious fan-outs when the user closes the picker quickly.
  useEffect(() => {
    if (!isRetryPending) return undefined;
    const timeout = setTimeout(() => {
      fetchRetryCountRef.current += 1;
      setIsRetryPending(false);
      refreshMetadata();
    }, METADATA_FETCH_RETRY_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [isRetryPending, refreshMetadata]);

  // Recent project IDs from the service — reactive, updates when user opens projects
  const [rawRecentIds, , isRecentIdsLoading] = useData(
    'platformScripture.recentlyOpenedProjects',
  ).RecentProjects(undefined, EMPTY_RECENT_IDS);

  const safeRecentIds = useMemo(
    () => (isPlatformError(rawRecentIds) ? [] : (rawRecentIds ?? [])),
    [rawRecentIds],
  );

  // All three data sections below derive from ONE service call per metadata refresh generation. The
  // call is filtered to the picker's `projectInterface` (see PICKER_METADATA_FILTER) so the
  // service's startup grace period retries until a matching factory registers. The promise is
  // created lazily inside whichever usePromise callback runs first and cached by generation, so the
  // others await the same in-flight fetch. A rejected fetch is dropped from the cache so a later
  // section (or refresh) issues a fresh call instead of awaiting the poisoned promise; each section
  // still catches its own errors, preserving the per-section failure behavior below.
  const metadataFetchRef = useRef<
    { counter: number; promise: Promise<ProjectMetadata[]> } | undefined
  >(undefined);
  const getAllMetadata = useCallback(() => {
    const cached = metadataFetchRef.current;
    if (cached?.counter === metadataRefreshCounter) return cached.promise;
    const entry = {
      counter: metadataRefreshCounter,
      promise: projectLookupService.getMetadataForAllProjects(PICKER_METADATA_FILTER),
    };
    // Attach success and failure handlers as the two arguments of .then() rather than as a
    // .then().catch() chain. In the chained form, the .catch() sees both fetch rejections AND
    // exceptions thrown by the success handler — silently mis-routing a future handler bug as a
    // fetch failure. The two-argument form keeps the handlers independent: an exception in
    // onFulfilled does not reach onRejected. The trailing .catch(() => undefined) satisfies the
    // ESLint promise/catch-or-return rule (the plugin does not recognise the two-argument form
    // as sufficient) and catches any exception from either handler; neither handler can throw in
    // practice (ref reads + setState), so this is purely a safety net.
    entry.promise
      .then(
        () => {
          // Guard: only reset retry state for the current generation so a stale in-flight promise
          // that resolves late cannot corrupt the retry budget or spuriously cancel the timer of
          // the generation currently in the cache.
          if (metadataFetchRef.current === entry) {
            fetchRetryCountRef.current = 0;
            // Cancels any pending retry timer: setIsRetryPending(false) triggers the useEffect
            // cleanup (clearTimeout) so the timer does not fire a redundant fan-out after healing.
            setIsRetryPending(false);
          }
          return undefined;
        },
        () => {
          if (metadataFetchRef.current === entry) {
            metadataFetchRef.current = undefined;
            if (fetchRetryCountRef.current < MAX_METADATA_FETCH_RETRIES) {
              setIsRetryPending(true);
            }
          }
          return undefined;
        },
      )
      .catch(() => undefined);
    metadataFetchRef.current = entry;
    return entry.promise;
  }, [metadataRefreshCounter]);

  const [currentSimpleProject, isCurrentSimpleProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      const currentProjectId = activeEditorProjectId;
      if (!currentProjectId) {
        setCurrentSimpleProjectError(undefined);
        return undefined;
      }
      try {
        // Fast path: the active editor's project is already in the picker's (USJ-filtered)
        // snapshot, so reuse it - no extra fetch.
        const metadata = await getAllMetadata();
        const key = normalizeProjectId(currentProjectId);
        const m = metadata.find((md) => normalizeProjectId(md.id) === key);
        if (m) {
          setCurrentSimpleProjectError(undefined);
          currentProjectRetryCountRef.current = 0;
          return metadataToProjectItem(m);
        }
        // Miss: the active editor references a project not in the USJ-filtered snapshot yet - e.g.
        // its USJ-providing layering PDPF has not registered. Resolve it directly by id
        // (unfiltered), which merges every registered PDPF's metadata for this id and waits for a
        // factory, so the current project still resolves during the startup window instead of
        // wedging on an error card. Display fields are identical either way - the interface filter
        // only decides list inclusion, not which fields a project carries.
        const single = await projectLookupService.getMetadataForProject(currentProjectId);
        setCurrentSimpleProjectError(undefined);
        currentProjectRetryCountRef.current = 0;
        return metadataToProjectItem(single);
      } catch (e) {
        logger.error(
          `ProjectPicker: could not fetch details for current project ${currentProjectId}: ${getErrorMessage(e)}`,
        );
        setCurrentSimpleProjectError('Unable to load current project details');
        // Arm the same bounded retry timer the shared metadata fetch uses. `usePromise` re-runs
        // only when its callback identity changes, and neither of this callback's inputs changes
        // while the same editor stays open — so without arming it here, a lookup that failed once
        // leaves the error card up for the life of the window. The retry bumps the metadata
        // generation, which is what changes the identity and re-runs this. Bounded by this lookup's
        // OWN budget, spent here, so a project that cannot be resolved at all stops after
        // MAX_METADATA_FETCH_RETRIES attempts; the budget is restored above whenever the project
        // does resolve, so a transient failure that heals does not permanently spend it.
        if (currentProjectRetryCountRef.current < MAX_METADATA_FETCH_RETRIES) {
          currentProjectRetryCountRef.current += 1;
          setIsRetryPending(true);
        }
        return {
          id: currentProjectId,
          fullName: 'Unable to load current project details',
          shortName: '???',
        };
      }
    }, [getAllMetadata, activeEditorProjectId]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      if (safeRecentIds.length === 0) return [];
      try {
        const metadata = await getAllMetadata();
        const metadataById = new Map<string, ProjectMetadata>(
          metadata.map((m) => [normalizeProjectId(m.id), m]),
        );
        // Preserve safeRecentIds' recency order; drop ids with no metadata (not found / errored)
        // and non-editable projects.
        // `isEditable` is optional on ProjectMetadata; a factory that omits it must be treated as
        // editable to match the registered contribution default (true) for `platform.isEditable`.
        return safeRecentIds
          .map((id: string) => metadataById.get(normalizeProjectId(id)))
          .filter(
            (m: ProjectMetadata | undefined): m is ProjectMetadata => !!m && m.isEditable !== false,
          )
          .map(metadataToProjectItem);
      } catch (e) {
        logger.warn(
          `ProjectPicker: could not fetch recent project metadata: ${getErrorMessage(e)}`,
        );
        return [];
      }
    }, [safeRecentIds, getAllMetadata]),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      try {
        const metadata = await getAllMetadata();
        return (
          metadata
            // The service already filtered to PICKER_PROJECT_INTERFACE, so only the editability
            // filter is left. Treat a missing `isEditable` as editable - the registered default is
            // true (see the recents filter above for the full reasoning).
            .filter((m) => m.isEditable !== false)
            .map(metadataToProjectItem)
        );
      } catch (e) {
        logger.warn(`ProjectPicker: could not fetch project metadata: ${getErrorMessage(e)}`);
        return [];
      }
    }, [getAllMetadata]),
    [],
  );

  const recentIdSet = useMemo(
    () => new Set(safeRecentIds.map((id: string) => normalizeProjectId(id))),
    [safeRecentIds],
  );
  const allProjects = useMemo(
    () =>
      allProjectsWithRecent
        .filter((p) => !recentIdSet.has(normalizeProjectId(p.id)))
        .sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [allProjectsWithRecent, recentIdSet],
  );

  return {
    currentSimpleProject,
    recentProjects,
    allProjects,
    currentSimpleProjectError,
    isLoading:
      isCurrentSimpleProjectLoading ||
      isRecentIdsLoading ||
      isRecentProjectsLoading ||
      isAllProjectsLoading,
  };
}

export default useProjectPickerData;
