import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { ListItemIcon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import logger from '@shared/services/logger.service';
import './open-project-tab.component.scss';
import { useMemo } from 'react';
import ProjectList, { Project } from './project-list.component';

export const TAB_TYPE_OPEN_PROJECT_DIALOG = 'open-project-dialog';

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

function openProject(project: Project) {
  logger.info(`Opening Project ${project.name}`);
}

export default function OpenProjectTab() {
  const projects = useMemo(() => fetchProjects().filter((project) => project.isDownloaded), []);

  return (
    <div className="open-project-dialog">
      <ProjectList projects={projects} projectClickHandler={openProject}>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
      </ProjectList>
    </div>
  );
}

export const loadOpenProjectTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Open Project',
    content: <OpenProjectTab />,
  };
};
