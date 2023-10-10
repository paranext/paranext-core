import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { ListItemIcon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import './select-project-tab.component.scss';
import { useMemo } from 'react';
import { DialogData } from '@shared/models/dialog-options.model';
import ProjectList from '@renderer/components/project-dialogs/project-list.component';
import { rejectDialogRequest, resolveDialogRequest } from '@renderer/services/dialog.service.host';
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

export const loadSelectProjectTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  const data = savedTabInfo.data as DialogData | undefined;
  return {
    ...savedTabInfo,
    tabIconUrl: data?.iconUrl,
    tabTitle: data?.title || 'Select Project',
    content: (
      <SelectProjectTab
        {...data}
        isDialog
        submitDialog={(projectId) => resolveDialogRequest<string>(savedTabInfo.id, projectId)}
        cancelDialog={(errorMessage) => rejectDialogRequest(savedTabInfo.id, errorMessage)}
      />
    ),
  };
};

export function saveSelectProjectTab(): SavedTabInfo | undefined {
  // TODO: preserve requests between refreshes - save the dialog info in such a way that it works
  // when loading again after refresh
  return undefined;
}
