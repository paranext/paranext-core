import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { ListItemIcon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import './open-project-tab.component.scss';
import { useMemo } from 'react';
import { DialogOptions } from '@shared/models/dialog-options.model';
import ProjectList, { Project } from '@renderer/components/project-dialogs/project-list.component';
import { resolveDialogRequest } from '@renderer/services/dialog.service.host';

export function fetchProjects(): Project[] {
  return [
    {
      id: 'project-1',
      name: 'Project 1',
      description: 'Description of project 1',
      isDownloadable: true,
      isDownloaded: false,
    },
    {
      id: 'project-2',
      name: 'Project 2',
      description: 'Description of project 2',
      isDownloadable: false,
      isDownloaded: true,
    },
    {
      id: 'project-3',
      name: 'Project 3',
      description: 'Description of project 3',
      isDownloadable: true,
      isDownloaded: false,
    },
    {
      id: 'project-4',
      name: 'Project 4',
      description: 'Description of project 4',
      isDownloadable: false,
      isDownloaded: false,
    },
    {
      id: 'project-5',
      name: 'Project 5',
      description: 'Description of project 5',
      isDownloadable: false,
      isDownloaded: true,
    },
  ];
}

type SelectProjectTabProps = {
  /** The message to show the user in the dialog. */
  prompt?: string;
  handleSelectProject: (projectId: string) => void;
};

export default function SelectProjectTab({ prompt, handleSelectProject }: SelectProjectTabProps) {
  const projects = useMemo(() => fetchProjects().filter((project) => project.isDownloaded), []);

  return (
    <div className="select-project-dialog">
      <div>{prompt}</div>
      <ProjectList projects={projects} handleSelectProject={handleSelectProject}>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
      </ProjectList>
    </div>
  );
}

export const loadSelectProjectTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  const data = savedTabInfo.data as DialogOptions | undefined;
  return {
    ...savedTabInfo,
    tabIconUrl: data?.iconUrl,
    tabTitle: data?.title || 'Select Project',
    content: (
      <SelectProjectTab
        prompt={data?.prompt}
        handleSelectProject={(projectId) =>
          resolveDialogRequest<string>(savedTabInfo.id, projectId)
        }
      />
    ),
  };
};

export function saveSelectProjectTab(): SavedTabInfo | undefined {
  // TODO: preserve requests between refreshes - save the dialog info in such a way that it works
  // when loading again after refresh
  return undefined;
}
