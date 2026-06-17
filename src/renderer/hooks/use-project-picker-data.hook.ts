import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { webViews } from '@renderer/services/papi-frontend.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';

const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';
const EMPTY_RECENT_IDS: string[] = [];

/**
 * Resolves a BCP-47 language tag to its localized display name. Returns undefined when the language
 * setting is unset (default placeholder value) or when the tag can't be resolved.
 */
function resolveLanguage(
  language: string,
  languageTag: string,
): { tag: string; displayName: string } | undefined {
  if (language.startsWith('%')) return undefined;
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

async function fetchProjectDetails(projectId: string): Promise<{
  fullName: string;
  shortName: string;
  language?: string;
  languageDisplayName?: string;
  isEditable: boolean;
}> {
  const pdp = await papiFrontendProjectDataProviderService.get(
    PROJECT_INTERFACE_PLATFORM_BASE,
    projectId,
  );
  const [fullName, shortName, language, languageTag, isEditable] = await Promise.all([
    pdp.getSetting('platform.fullName'),
    pdp.getSetting('platform.name'),
    pdp.getSetting('platform.language'),
    pdp.getSetting('platform.languageTag'),
    pdp.getSetting('platform.isEditable'),
  ]);
  const resolved = resolveLanguage(language, languageTag);
  return {
    fullName,
    shortName,
    language: resolved?.tag,
    languageDisplayName: resolved?.displayName,
    isEditable: !!isEditable,
  };
}

/**
 * The `platform.*` settings each "all projects" picker row needs. Requested as a batch via
 * `getMetadataForAllProjects({ includeSettings })` so they arrive on each project's
 * `settingsSnapshot` in one call instead of a per-project `getSetting` fan-out.
 */
const PROJECT_PICKER_SETTING_KEYS = [
  'platform.fullName',
  'platform.name',
  'platform.language',
  'platform.languageTag',
  'platform.isEditable',
] as const;

/** Read a snapshot value as a string, treating any non-string (or absent) value as empty. */
function snapshotString(snapshot: { [settingName: string]: unknown }, settingName: string): string {
  const value = snapshot[settingName];
  return typeof value === 'string' ? value : '';
}

/**
 * Build an "all projects" {@link ProjectItem} from project metadata.
 *
 * Fast path: read the row straight off `settingsSnapshot` — but only when it carries every needed
 * setting AND the display strings (`fullName`, `language`) are actually set. An unset string comes
 * back empty from the snapshot, which the snapshot deliberately does not invent a value for; for
 * those we defer to {@link fetchProjectDetails} (fallback) so the row matches what the per-project /
 * pre-batch path returned — same displayed name and same alphabetical sort position.
 *
 * Fallback: a provider that does not support the `includeSettings` hint, or a project with an unset
 * display setting.
 *
 * Returns undefined for non-editable projects, which the picker filters out.
 */
async function resolveProjectItemFromMetadata(
  metadata: ProjectMetadata,
): Promise<ProjectItem | undefined> {
  const snapshot = metadata.settingsSnapshot;
  if (
    snapshot &&
    PROJECT_PICKER_SETTING_KEYS.every((key) => key in snapshot) &&
    snapshotString(snapshot, 'platform.fullName').length > 0 &&
    snapshotString(snapshot, 'platform.language').length > 0
  ) {
    if (snapshot['platform.isEditable'] !== true) return undefined;
    const resolved = resolveLanguage(
      snapshotString(snapshot, 'platform.language'),
      snapshotString(snapshot, 'platform.languageTag'),
    );
    return {
      id: metadata.id,
      fullName: snapshotString(snapshot, 'platform.fullName'),
      shortName: snapshotString(snapshot, 'platform.name'),
      language: resolved?.tag,
      languageDisplayName: resolved?.displayName,
    };
  }

  const { isEditable, ...details } = await fetchProjectDetails(metadata.id);
  if (!isEditable) return undefined;
  return { id: metadata.id, ...details };
}

export type ProjectPickerData = {
  currentProject: ProjectItem | undefined;
  recentProjects: ProjectItem[];
  /** All projects, with recentProjects already excluded. */
  allProjects: ProjectItem[];
  /** Set when fetching details for the current project fails. */
  currentProjectError: string | undefined;
  isLoading: boolean;
};

export function useProjectPickerData(): ProjectPickerData {
  // Incrementing this triggers a refresh of usePromise calls
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [currentProjectError, setCurrentProjectError] = useState<string | undefined>(undefined);
  const refresh = useCallback(() => setRefreshCounter((n) => n + 1), []);

  const onDidOpenWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW), []);
  useEvent(onDidOpenWebView, refresh);
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refresh);
  const onDidCloseWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW), []);
  useEvent(onDidCloseWebView, refresh);
  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, refresh);

  // Recent project IDs from the service — reactive, updates when user opens projects
  const [rawRecentIds, , isRecentIdsLoading] = useData(
    'platformScripture.recentlyOpenedProjects',
  ).RecentProjects(undefined, EMPTY_RECENT_IDS);

  const safeRecentIds = useMemo(
    () => (isPlatformError(rawRecentIds) ? [] : (rawRecentIds ?? [])),
    [rawRecentIds],
  );

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = allDefs.find(
        (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && def.projectId,
      );
      if (!editorDef?.projectId) return undefined;
      try {
        const { fullName, shortName, language, languageDisplayName } = await fetchProjectDetails(
          editorDef.projectId,
        );
        setCurrentProjectError(undefined);
        return { id: editorDef.projectId, fullName, shortName, language, languageDisplayName };
      } catch (e) {
        logger.error(
          `ProjectPicker: could not fetch details for current project ${editorDef.projectId}: ${getErrorMessage(e)}`,
        );
        setCurrentProjectError('Unable to load current project details');
        return {
          id: editorDef.projectId,
          fullName: 'Unable to load current project details',
          shortName: '???',
        };
      }
    }, [refreshCounter]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      const results = await Promise.all(
        safeRecentIds.map(async (id: string): Promise<ProjectItem | undefined> => {
          try {
            const { isEditable, ...details } = await fetchProjectDetails(id);
            if (!isEditable) return undefined;
            return { id, ...details };
          } catch (e) {
            logger.warn(
              `ProjectPicker: could not fetch name for project ${id}: ${getErrorMessage(e)}`,
            );
            return undefined;
          }
        }),
      );
      return results.filter((p: ProjectItem | undefined): p is ProjectItem => p !== undefined);
    }, [safeRecentIds, refreshCounter]),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      // Request the per-row settings as a batch so they arrive on each project's `settingsSnapshot`
      // in this single call, instead of a per-project `get` + `getSetting` fan-out that scaled
      // linearly with project count.
      const metadata = await projectLookupService.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        includeSettings: [...PROJECT_PICKER_SETTING_KEYS],
      });
      const settled = await Promise.all(
        metadata.map(async (m) => {
          try {
            return await resolveProjectItemFromMetadata(m);
          } catch (e) {
            logger.warn(
              `ProjectPicker: could not fetch details for project ${m.id}: ${getErrorMessage(e)}`,
            );
            return undefined;
          }
        }),
      );
      return settled.flatMap((p) => (p !== undefined ? [p] : []));
    }, [refreshCounter]),
    [],
  );

  const recentIdSet = useMemo(() => new Set(safeRecentIds), [safeRecentIds]);
  const allProjects = useMemo(
    () =>
      allProjectsWithRecent
        .filter((p) => !recentIdSet.has(p.id))
        .sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [allProjectsWithRecent, recentIdSet],
  );

  return {
    currentProject,
    recentProjects,
    allProjects,
    currentProjectError,
    isLoading:
      isCurrentProjectLoading ||
      isRecentIdsLoading ||
      isRecentProjectsLoading ||
      isAllProjectsLoading,
  };
}

export default useProjectPickerData;
