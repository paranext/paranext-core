import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { PropsWithChildren, useCallback } from 'react';

export type Project = {
  id: string;
  name: string;
  description: string;
  isDownloadable: boolean;
  isDownloaded: boolean;
};

export type ProjectListProps = PropsWithChildren<{
  /**
   * Projects to display in the list
   */
  projects: Project[];

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
  selectedProjects?: Project[] | undefined;

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
    (project: Project) => {
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
