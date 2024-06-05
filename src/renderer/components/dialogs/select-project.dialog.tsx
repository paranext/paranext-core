import { ListItemIcon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import '@renderer/components/dialogs/select-project.dialog.scss';
import { useCallback, useMemo } from 'react';
import ProjectList from '@renderer/components/projects/project-list.component';
import { usePromise } from 'platform-bible-react';
import projectLookupService, {
  filterProjectsMetadata,
} from '@shared/services/project-lookup.service';
import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  SELECT_PROJECT_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';

function SelectProjectDialog({
  prompt,
  submitDialog,
  excludeProjectIds,
  includeProjectIds,
  includeProjectInterfaces,
  excludeProjectInterfaces,
}: DialogTypes[typeof SELECT_PROJECT_DIALOG_TYPE]['props']) {
  const [projects, isLoadingProjects] = usePromise(
    useCallback(async () => {
      const allProjectsMetadata = await projectLookupService.getMetadataForAllProjects();
      return filterProjectsMetadata(allProjectsMetadata, {
        excludeProjectIds,
        includeProjectIds,
        includeProjectInterfaces,
        excludeProjectInterfaces,
      });
    }, [excludeProjectIds, includeProjectIds, includeProjectInterfaces, excludeProjectInterfaces]),
    useMemo(() => [], []),
  );

  return (
    <div className="select-project-dialog">
      <div className="prompt">{prompt}</div>
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

const SELECT_PROJECT_DIALOG: DialogDefinition<typeof SELECT_PROJECT_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: SELECT_PROJECT_DIALOG_TYPE,
  defaultTitle: 'Select Project',
  initialSize: {
    width: 500,
    height: 350,
  },
  Component: SelectProjectDialog,
});

export default SELECT_PROJECT_DIALOG;
