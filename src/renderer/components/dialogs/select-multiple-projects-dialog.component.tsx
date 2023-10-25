import { ListItemIcon } from '@mui/material';
import { useMemo, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from 'papi-components';
import ProjectList from '@renderer/components/projects/project-list.component';
import './select-multiple-projects-dialog.component.scss';
import projectLookupService from '@shared/services/project-lookup.service';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import DIALOG_BASE, { DialogProps } from './dialog-base.data';
import { DialogDefinition, SELECT_MULTIPLE_PROJECTS_DIALOG_TYPE } from './dialog-definition.model';

type SelectMultipleProjectDialogProps = DialogProps<string[]>;

function SelectMultipleProjectsDialog({ prompt, submitDialog }: SelectMultipleProjectDialogProps) {
  const [downloadedProjects, isLoadingProjects] = usePromise(
    projectLookupService.getMetadataForAllProjects,
    useMemo(() => [], []),
  );

  const [selectedProjects, setSelectedProjects] = useState<ProjectMetadata[]>([]);

  const handleProjectToggle = (projectId: string) => {
    if (selectedProjects.some((project) => project.id === projectId)) {
      setSelectedProjects(selectedProjects.filter((project) => project.id !== projectId));
    } else {
      const selectedProject = downloadedProjects.find((project) => project.id === projectId);
      if (selectedProject) setSelectedProjects([...selectedProjects, selectedProject]);
    }
  };

  return (
    <div className="select-multiple-projects-dialog">
      <div>{prompt}</div>
      {isLoadingProjects ? (
        <div>Loading Projects</div>
      ) : (
        <ProjectList
          projects={downloadedProjects}
          handleSelectProject={handleProjectToggle}
          selectedProjects={selectedProjects}
          isMultiselect
          isCheckable
        >
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
        </ProjectList>
      )}
      <div className="select-multiple-projects-submit-button">
        <Button onClick={() => submitDialog(selectedProjects.map((p) => p.id))}>
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
