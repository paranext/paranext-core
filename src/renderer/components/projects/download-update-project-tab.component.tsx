import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
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
import ProjectList, {
  fetchProjects,
  Project,
} from '@renderer/components/projects/project-list.component';
import './download-update-project-tab.component.scss';

export const TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG = 'download-update-project-dialog';

function downloadProject(projectId: string) {
  logger.info(`Downloading Project ${projectId}`);
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
        <ProjectList
          projects={downloadableProjects}
          subheader="Downloadable Projects"
          handleSelectProject={downloadProject}
        >
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
        </ProjectList>
      </nav>

      <nav aria-label="downloaded projects">
        <List>
          <ListSubheader>Downloaded Projects</ListSubheader>
          {downloadedProjects.map((project) => (
            <ListItem key={project.id}>
              <ListItemButton onClick={() => updateProject(project)}>
                <ListItemIcon>
                  <UpdateIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
              <ListItemButton onClick={() => deleteProject(project)}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
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
