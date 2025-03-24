import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';

// import { Download, ArrowDownFromLine, Delete } from 'lucide-react';
import { logger } from '@shared/services/logger.service';
import { useMemo } from 'react';
import {
  fetchProjects,
  // Project,
} from '@renderer/components/projects/project-list.component';
import './download-update-project-tab.component.scss';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';

export const TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG = 'download-update-project-dialog';

function downloadProject(projectId: string) {
  logger.info(`Downloading Project ${projectId}`);
}

// function updateProject(project: Project) {
//   logger.info(`Updating Project ${project.name}`);
// }

// function deleteProject(project: Project) {
//   logger.info(`Deleting Project ${project.name}`);
// }

export function DownloadUpdateProjectTab() {
  const downloadableProjectsAriaKey = '%downloadUpdateProjectTab_aria_downloadable%';
  const downloadableProjectsHeaderKey = '%downloadUpdateProjectTab_listHeader_downloadable%';
  const downloadedProjectsAriaKey = '%downloadUpdateProjectTab_aria_downloaded%';
  const downloadedProjectsHeaderKey = '%downloadUpdateProjectTab_listHeader_downloaded%';
  const deleteListItemKey = '%downloadUpdateProjectTab_button_delete%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        downloadableProjectsAriaKey,
        downloadableProjectsHeaderKey,
        downloadedProjectsAriaKey,
        downloadedProjectsHeaderKey,
        deleteListItemKey,
      ],
      [],
    ),
  );
  const localizedDownloadableProjectsAria = localizedStrings[downloadableProjectsAriaKey];
  const localizedDownloadableProjectsHeader = localizedStrings[downloadableProjectsHeaderKey];
  const localizedDownloadedProjectsAria = localizedStrings[downloadedProjectsAriaKey];
  // const localizedDownloadedProjectsHeader = localizedStrings[downloadedProjectsHeaderKey];
  // const localizedDeleteListItem = localizedStrings[deleteListItemKey];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [downloadableProjects, _downloadedProjects] = useMemo(() => {
    const projects = fetchProjects();
    return [
      projects.filter((project) => project.isDownloadable && !project.isDownloaded),
      projects.filter((project) => project.isDownloaded),
    ];
  }, []);

  // Can we remove this component? We're not using it.

  return (
    <div className="download-update-project-dialog">
      <nav aria-label={localizedDownloadableProjectsAria}>
        <ProjectList
          projects={downloadableProjects}
          subheader={localizedDownloadableProjectsHeader}
          handleSelectProject={downloadProject}
        >
          {/* <ListItemIcon>
            <Download />
          </ListItemIcon> */}
        </ProjectList>
      </nav>

      <nav aria-label={localizedDownloadedProjectsAria}>
        {/* <List>
          <ListSubheader>{localizedDownloadedProjectsHeader}</ListSubheader>
          {downloadedProjects.map((project) => (
            <ListItem key={project.id}>
              <ListItemButton onClick={() => updateProject(project)}>
                <ListItemIcon>
                  <ArrowDownFromLine />
                </ListItemIcon>
                <ListItemText primary={project.name} />
              </ListItemButton>
              <ListItemButton onClick={() => deleteProject(project)}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary={localizedDeleteListItem} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </nav>
    </div>
  );
}

export const loadDownloadUpdateProjectTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: '%downloadUpdateProjectTab_title_downloadUpdate%',
    content: <DownloadUpdateProjectTab />,
  };
};

export default DownloadUpdateProjectTab;
