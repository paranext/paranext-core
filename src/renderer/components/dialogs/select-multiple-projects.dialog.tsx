import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import '@renderer/components/dialogs/select-multiple-projects.dialog.scss';
import ProjectList, {
  ProjectMetadataDisplay,
} from '@renderer/components/projects/project-list.component';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import projectLookupService from '@shared/services/project-lookup.service';
import { Check, FolderOpenIcon } from 'lucide-react';
import { Button, usePromise } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

function SelectMultipleProjectsDialog({
  prompt,
  submitDialog,
  excludeProjectIds,
  includeProjectIds,
  includeProjectInterfaces,
  excludeProjectInterfaces,
  includePdpFactoryIds,
  excludePdpFactoryIds,
  selectedProjectIds: initialSelectedProjectIds,
}: DialogTypes[typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]['props']) {
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

  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>(
    initialSelectedProjectIds || [],
  );

  const handleProjectToggle = (toggledProjectId: string) => {
    if (selectedProjectIds.includes(toggledProjectId)) {
      setSelectedProjectIds(
        selectedProjectIds.filter((projectId) => projectId !== toggledProjectId),
      );
    } else setSelectedProjectIds([...selectedProjectIds, toggledProjectId]);
  };

  return (
    <div className="select-multiple-projects-dialog">
      <div>{prompt}</div>
      {isLoadingProjects ? (
        <div>Loading Projects</div>
      ) : (
        <ProjectList
          projects={projects}
          handleSelectProject={handleProjectToggle}
          selectedProjectIds={selectedProjectIds}
          isMultiselect
          isCheckable
        >
          <FolderOpenIcon className="select-multiple-projects-folder-icon" />
        </ProjectList>
      )}
      <div className="select-multiple-projects-submit-button">
        <Button onClick={() => submitDialog(selectedProjectIds)}>
          <Check />
        </Button>
      </div>
    </div>
  );
}

const localizeSelectProjectsKey: LocalizeKey = '%selectMultipleProjects_title_selectProjects%';

const SELECT_MULTIPLE_PROJECTS_DIALOG: DialogDefinition<
  typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE
> = Object.freeze({
  ...DIALOG_BASE,
  tabType: SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE,
  defaultTitle: localizeSelectProjectsKey,
  initialSize: {
    width: 500,
    height: 350,
  },
  Component: SelectMultipleProjectsDialog,
});

export default SELECT_MULTIPLE_PROJECTS_DIALOG;
