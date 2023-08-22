import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import logger from '@shared/services/logger.service';
import { useMemo } from 'react';
import { Project, fetchProjects } from './open-project-tab.component';
import './download-update-project-tab.component.scss';

export const TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG = 'download-update-project-dialog';

function downloadProject(project: Project) {
  logger.info(`Downloading Project ${project.name}`);
}

function updateProject(project: Project) {
  logger.info(`Updating Project ${project.name}`);
}

function deleteProject(project: Project) {
  logger.info(`Deleting Project ${project.name}`);
}

export default function DownloadUpdateProjectTab() {
  const [downloadableProjects, downloadedProjects] = useMemo(() => {
    const projects = fetchProjects();
    return [
      projects.filter((project) => project.isDownloadable && !project.isDownloaded),
      projects.filter((project) => project.isDownloaded),
    ];
  }, []);

  return (
    <div className="download-update-project-dialog">
      <nav aria-label="downloadable projects">
        <List>
          <ListSubheader>Downloadable Projects</ListSubheader>
          {downloadableProjects.map((project) => (
            <ListItem key={project.id}>
              <ListItemButton onClick={() => downloadProject(project)}>
                <ListItemIcon>
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <nav aria-label="downloaded projects">
        <List>
          <ListSubheader>Downloaded Projects</ListSubheader>
          {downloadedProjects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText primary={project.name} />
              <ListItemButton onClick={() => updateProject(project)}>
                <ListItemIcon>
                  <UpdateIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => deleteProject(project)}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </div>
  );
}

export const loadDownloadUpdateProjectTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Download/Update Project',
    content: <DownloadUpdateProjectTab />,
  };
};
