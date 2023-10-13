import { ListItemIcon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import './select-project.dialog.scss';
import { useMemo } from 'react';
import ProjectList from '@renderer/components/project-components/project-list.component';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import projectLookupService from '@shared/services/project-lookup.service';
import { DialogProps } from '@renderer/components/dialogs/dialog-base.data';

type SelectProjectTabProps = DialogProps<string>;

export default function SelectProjectTab({ prompt, submitDialog }: SelectProjectTabProps) {
  const [projects, isLoadingProjects] = usePromise(
    projectLookupService.getMetadataForAllProjects,
    useMemo(() => [], []),
  );

  return (
    <div className="select-project-dialog">
      <div>{prompt}</div>
      {isLoadingProjects ? (
        <div>Loading Projects</div>
      ) : (
        <ProjectList projects={projects} handleSelectProject={submitDialog}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
        </ProjectList>
      )}
    </div>
  );
}
