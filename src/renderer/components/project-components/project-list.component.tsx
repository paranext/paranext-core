import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { PropsWithChildren, useCallback } from 'react';

export type Project = ProjectMetadata & {
  id: string;
  name: string;
  description: string;
  isDownloadable: boolean;
  isDownloaded: boolean;
};

/**
 * Get sample project data.
 *
 * This is mock data and will be replaced at some point. Probably by the following issues:
 *
 * [Projects: get list of project settings · Issue #368 · paranext/paranext-core](https://github.com/paranext/paranext-core/issues/368)
 *
 * [Projects: Support registering Downloadable Project Provider · Issue #372 · paranext/paranext-core](https://github.com/paranext/paranext-core/issues/372)
 *
 * @returns downloadable (and downloaded) project information
 */
export function fetchProjects(): Project[] {
  return [
    {
      id: 'project-1',
      name: 'Project 1',
      description: 'Description of project 1',
      isDownloadable: true,
      isDownloaded: false,
      storageType: 'test',
      projectType: 'test',
    },
    {
      id: 'project-2',
      name: 'Project 2',
      description: 'Description of project 2',
      isDownloadable: false,
      isDownloaded: true,
      storageType: 'test',
      projectType: 'test',
    },
    {
      id: 'project-3',
      name: 'Project 3',
      description: 'Description of project 3',
      isDownloadable: true,
      isDownloaded: false,
      storageType: 'test',
      projectType: 'test',
    },
    {
      id: 'project-4',
      name: 'Project 4',
      description: 'Description of project 4',
      isDownloadable: false,
      isDownloaded: false,
      storageType: 'test',
      projectType: 'test',
    },
    {
      id: 'project-5',
      name: 'Project 5',
      description: 'Description of project 5',
      isDownloadable: false,
      isDownloaded: true,
      storageType: 'test',
      projectType: 'test',
    },
  ];
}

export type ProjectListProps = PropsWithChildren<{
  /**
   * Projects to display in the list
   */
  projects: ProjectMetadata[];

  /**
   * Handler to perform an action when the project is clicked
   */
  handleSelectProject: (projectId: string) => void;

  /**
   * Optional flag to set the list to multiselect
   */
  isMultiselect?: boolean;

  /**
   * If multiple is selected, then the array of selected projects is passed to control the selected flag on ListItemButton
   */
  selectedProjects?: ProjectMetadata[] | undefined;

  /**
   * Optional subheader
   */
  subheader?: string;
}>;

/**
 * Project List component that creates a list for a provided array of projects. Assumes there is only one button per project.
 * @param ProjectListProps and any children elements
 * @returns <ProjectList />
 */
export default function ProjectList({
  projects,
  handleSelectProject,
  isMultiselect,
  selectedProjects,
  subheader,
  children,
}: ProjectListProps) {
  const isSelected = useCallback(
    (project: ProjectMetadata) => {
      if (isMultiselect && selectedProjects) {
        return selectedProjects.includes(project);
      }
      return undefined;
    },
    [isMultiselect, selectedProjects],
  );

  return (
    <div className="project-list">
      <List>
        <ListSubheader>{subheader}</ListSubheader>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <ListItemButton
              selected={isSelected(project)}
              onClick={() => handleSelectProject(project.id)}
            >
              {children}
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
