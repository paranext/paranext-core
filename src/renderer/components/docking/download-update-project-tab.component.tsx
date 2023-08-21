import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import logger from '@shared/services/logger.service';
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

function fetchDownloadableProjects() {
  const projects = fetchProjects();
  const downloadableProjects: Project[] = [];
  const downloadedProjects: Project[] = [];

  projects.forEach((project) => {
    if (project.isDownloadable && !project.isDownloaded) downloadableProjects.push(project);
    else if (project.isDownloaded) downloadedProjects.push(project);
  });

  return [downloadableProjects, downloadedProjects];
}

export default function DownloadUpdateProjectTab() {
  const projects = fetchDownloadableProjects();
  const downloadableProjects = projects[0];
  const downloadedProjects = projects[1];

  return (
    <div className="download-update-project-dialog">
      <nav aria-label="downloadable projects">
        <List>
          <ListSubheader>Downloadable Projects</ListSubheader>
          {downloadableProjects.map((project, index) => (
            <ListItem
              // Currently projects will not be reordered
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <ListItemButton onClick={() => downloadProject(project)}>
                <DownloadIcon />
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <nav aria-label="downloaded projects">
        <List>
          <ListSubheader>Downloaded Projects</ListSubheader>
          {downloadedProjects.map((project, index) => (
            <ListItem
              // Currently projects will not be reordered
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <ListItemText primary={project.name} />
              <ListItemButton onClick={() => updateProject(project)}>
                <UpdateIcon />
              </ListItemButton>
              <ListItemButton onClick={() => deleteProject(project)}>
                <DeleteIcon />
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
