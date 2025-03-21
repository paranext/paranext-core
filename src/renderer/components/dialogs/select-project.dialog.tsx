import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  SELECT_PROJECT_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import '@renderer/components/dialogs/select-project.dialog.scss';
import {
  ProjectList,
  ProjectMetadataDisplay,
} from '@renderer/components/projects/project-list.component';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { FolderOpenIcon } from 'lucide-react';
import { usePromise } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';

function SelectProjectDialog({
  prompt,
  submitDialog,
  excludeProjectIds,
  includeProjectIds,
  includeProjectInterfaces,
  excludeProjectInterfaces,
  includePdpFactoryIds,
  excludePdpFactoryIds,
}: DialogTypes[typeof SELECT_PROJECT_DIALOG_TYPE]['props']) {
  const [projects, isLoadingProjects] = usePromise(
    useCallback(async () => {
      const projectsMetadata = await projectLookupService.getMetadataForAllProjects({
        excludeProjectIds,
        includeProjectIds,
        includeProjectInterfaces,
        excludeProjectInterfaces,
        includePdpFactoryIds,
        excludePdpFactoryIds,
      });

      // Get project names
      const projectsMetadataDisplay: ProjectMetadataDisplay[] = await Promise.all(
        projectsMetadata.map(async (projectMetadata) => {
          const pdp = await papiFrontendProjectDataProviderService.get(
            PROJECT_INTERFACE_PLATFORM_BASE,
            projectMetadata.id,
          );

          const name = await pdp.getSetting('platform.name');

          return { ...projectMetadata, name };
        }),
      );
      return projectsMetadataDisplay;
    }, [
      excludeProjectIds,
      includeProjectIds,
      includeProjectInterfaces,
      excludeProjectInterfaces,
      includePdpFactoryIds,
      excludePdpFactoryIds,
    ]),
    useMemo(() => [], []),
  );

  return (
    <div className="select-project-dialog">
      <div className="prompt">{prompt}</div>
      {isLoadingProjects ? (
        <div>Loading Projects</div>
      ) : (
        <ProjectList projects={projects} handleSelectProject={submitDialog}>
          <FolderOpenIcon className="select-project-folder-icon" />
        </ProjectList>
      )}
    </div>
  );
}

const localizeSelectProject: LocalizeKey = '%selectProject_title%';

export const SELECT_PROJECT_DIALOG: DialogDefinition<typeof SELECT_PROJECT_DIALOG_TYPE> =
  Object.freeze({
    ...DIALOG_BASE,
    tabType: SELECT_PROJECT_DIALOG_TYPE,
    defaultTitle: localizeSelectProject,
    initialSize: {
      width: 500,
      height: 350,
    },
    Component: SelectProjectDialog,
  });

export default SELECT_PROJECT_DIALOG;
