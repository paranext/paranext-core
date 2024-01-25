import { ListItemIcon } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DoneIcon from '@mui/icons-material/Done';
import ProjectList from '@renderer/components/projects/project-list.component';
import './select-multiple-projects-dialog.component.scss';
import projectLookupService from '@shared/services/project-lookup.service';
import { Button, usePromise } from 'platform-bible-react';
import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';

function SelectMultipleProjectsDialog({
  prompt,
  submitDialog,
  excludeProjectIds,
  selectedProjectIds: initialSelectedProjectIds,
}: DialogTypes[typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE]['props']) {
  const [projects, isLoadingProjects] = usePromise(
    useCallback(async () => {
      const allProjectsMetadata = await projectLookupService.getMetadataForAllProjects();
      return !excludeProjectIds
        ? allProjectsMetadata
        : allProjectsMetadata.filter(
            (projectMetadata) => !excludeProjectIds.some((id) => projectMetadata.id === id),
          );
    }, [excludeProjectIds]),
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
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
        </ProjectList>
      )}
      <div className="select-multiple-projects-submit-button">
        <Button onClick={() => submitDialog(selectedProjectIds)}>
          <DoneIcon />
        </Button>
      </div>
    </div>
  );
}

const SELECT_MULTIPLE_PROJECTS_DIALOG: DialogDefinition<
  typeof SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE
> = Object.freeze({
  ...DIALOG_BASE,
  tabType: SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE,
  defaultTitle: 'Select Projects',
  initialSize: {
    width: 500,
    height: 350,
  },
  Component: SelectMultipleProjectsDialog,
});

export default SELECT_MULTIPLE_PROJECTS_DIALOG;
