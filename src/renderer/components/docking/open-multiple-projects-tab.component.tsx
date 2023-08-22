import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo, useState } from 'react';
import logger from '@shared/services/logger.service';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DoneIcon from '@mui/icons-material/Done';
import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { Button } from 'papi-components';
import { fetchProjects, Project } from './open-project-tab.component';
import './open-multiple-projects-tab.component.scss';

export const TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG = 'open-multiple-projects-dialog';

export default function OpenMultipleProjectsTab() {
  const downloadedProjects = useMemo(
    () => fetchProjects().filter((project) => project.isDownloaded),
    [],
  );

  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  const handleProjectToggle = (projectId: Project) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleSubmit = () => {
    setSelectedProjects([]);
    logger.info(
      'Selected projects:',
      selectedProjects.map((proj) => proj.name),
    );
  };

  return (
    <div className="open-multiple-projects-dialog">
      <List>
        {downloadedProjects.map((project) => (
          <ListItem key={project.id} onClick={() => handleProjectToggle(project)}>
            <ListItemButton selected={selectedProjects.includes(project)}>
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className="open-multiple-projects-submit-button">
        <Button onClick={handleSubmit}>
          <DoneIcon />
        </Button>
      </div>
    </div>
  );
}

export const loadOpenMultipleProjectsTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Open Multiple Projects',
    content: <OpenMultipleProjectsTab />,
  };
};
