import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { webViews } from '@renderer/services/papi-frontend.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { EVENT_NAME_ON_DID_UPDATE_WEB_VIEW } from '@shared/services/web-view.service-model';
import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';

const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

type ProjectItem = { id: string; name: string };

async function fetchProjectName(projectId: string): Promise<string> {
  const pdp = await papiFrontendProjectDataProviderService.get(
    PROJECT_INTERFACE_PLATFORM_BASE,
    projectId,
  );
  return pdp.getSetting('platform.name');
}

export type ProjectPickerData = {
  currentProject: ProjectItem | undefined;
  recentProjects: ProjectItem[];
  allProjects: ProjectItem[];
  isLoading: boolean;
};

export function useProjectPickerData(): ProjectPickerData {
  // Incrementing this triggers a refresh of both usePromise calls
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refresh = useCallback(() => setRefreshCounter((n) => n + 1), []);

  // Subscribe to web view updates to keep current project in sync
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refresh);

  // Subscribe to extension reloads to refresh the project list
  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, refresh);

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = allDefs.find(
        (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && def.projectId,
      );
      if (!editorDef?.projectId) return undefined;
      try {
        const name = await fetchProjectName(editorDef.projectId);
        return { id: editorDef.projectId, name };
      } catch (e) {
        logger.warn(
          `ProjectPicker: could not fetch name for project ${editorDef.projectId}: ${getErrorMessage(e)}`,
        );
        return { id: editorDef.projectId, name: editorDef.projectId };
      }
      // refreshCounter must be in deps to trigger re-fetch on web view updates
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter]),
    undefined,
  );

  const [allProjects, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      const metadata = await projectLookupService.getMetadataForAllProjects();
      const projects = await Promise.all(
        metadata.map(async (m) => {
          try {
            const name = await fetchProjectName(m.id);
            return { id: m.id, name };
          } catch (e) {
            logger.warn(
              `ProjectPicker: could not fetch name for project ${m.id}: ${getErrorMessage(e)}`,
            );
            return { id: m.id, name: m.id };
          }
        }),
      );
      return projects;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter]),
    [],
  );

  // NOTE: Once the real "recent projects" implementation is merged (S/R-based recency via
  // `paratextBibleSendReceive.getSharedProjects`), replace `recentProjects` with that source and
  // uncomment the deduplication below to avoid projects appearing in both sections.
  // const recentProjectIds = new Set(recentProjects.map((p) => p.id));
  // const dedupedAllProjects = allProjects.filter((p) => !recentProjectIds.has(p.id));
  const recentProjects = allProjects; // stub: use all projects as recent until real source is ready

  return {
    currentProject,
    recentProjects,
    allProjects,
    isLoading: isCurrentProjectLoading || isAllProjectsLoading,
  };
}

export default useProjectPickerData;
