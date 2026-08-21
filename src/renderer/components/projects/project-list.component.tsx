import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { Check } from 'lucide-react';
import { Button, Label } from 'platform-bible-react';
import { ProjectInterfaces } from 'papi-shared-types';
import { PropsWithChildren, useCallback } from 'react';
import './project-list.component.scss';

/** Project metadata and some display information */
export type ProjectMetadataDisplay = ProjectMetadata & {
  /**
   * Name to display in the list for this project
   *
   * Generally this should come from the project setting `platform.name`
   */
  name: string;
};

export type Project = ProjectMetadataDisplay & {
  id: string;
  description: string;
  isDownloadable: boolean;
  isDownloaded: boolean;
};

/**
 * Get sample project data.
 *
 * This is mock data and will be replaced at some point. Probably by the following issues:
 *
 * [Projects: get list of project settings · Issue #368 ·
 * paranext/paranext-core](https://github.com/paranext/paranext-core/issues/368)
 *
 * [Projects: Support registering Downloadable Project Provider · Issue #372 ·
 * paranext/paranext-core](https://github.com/paranext/paranext-core/issues/372)
 *
 * @returns Downloadable (and downloaded) project information
 */
export function fetchProjects(): Project[] {
  // Hardcoded mock data uses string literals cast to branded `ProjectInterfaces` type until real data is wired in.
  /* eslint-disable no-type-assertion/no-type-assertion */
  return [
    {
      id: 'project-1',
      name: 'Project 1',
      description: 'Description of project 1',
      isDownloadable: true,
      isDownloaded: false,
      projectInterfaces: ['test' as ProjectInterfaces],
      pdpFactoryInfo: {
        'test-pdpf': {
          projectInterfaces: ['test' as ProjectInterfaces],
        },
      },
    },
    {
      id: 'project-2',
      name: 'Project 2',
      description: 'Description of project 2',
      isDownloadable: false,
      isDownloaded: true,
      projectInterfaces: ['test' as ProjectInterfaces],
      pdpFactoryInfo: {
        'test-pdpf': {
          projectInterfaces: ['test' as ProjectInterfaces],
        },
      },
    },
    {
      id: 'project-3',
      name: 'Project 3',
      description: 'Description of project 3',
      isDownloadable: true,
      isDownloaded: false,
      projectInterfaces: ['test' as ProjectInterfaces],
      pdpFactoryInfo: {
        'test-pdpf': {
          projectInterfaces: ['test' as ProjectInterfaces],
        },
      },
    },
    {
      id: 'project-4',
      name: 'Project 4',
      description: 'Description of project 4',
      isDownloadable: false,
      isDownloaded: false,
      projectInterfaces: ['test' as ProjectInterfaces],
      pdpFactoryInfo: {
        'test-pdpf': {
          projectInterfaces: ['test' as ProjectInterfaces],
        },
      },
    },
    {
      id: 'project-5',
      name: 'Project 5',
      description: 'Description of project 5',
      isDownloadable: false,
      isDownloaded: true,
      projectInterfaces: ['test' as ProjectInterfaces],
      pdpFactoryInfo: {
        'test-pdpf': {
          projectInterfaces: ['test' as ProjectInterfaces],
        },
      },
    },
  ];
  /* eslint-enable */
}

export type ProjectListProps = PropsWithChildren<{
  /** Projects to display in the list */
  projects: ProjectMetadataDisplay[];

  /** Handler to perform an action when the project is clicked */
  handleSelectProject: (projectId: string) => void;

  /** Optional flag to set the list to multiselect */
  isMultiselect?: boolean;

  /**
   * If multiselect is selected, then the array of selected project IDs is passed to control the
   * selected flag on ListItemButton
   */
  selectedProjectIds?: string[];

  /** Optional subheader */
  subheader?: string;

  /** Adds a checkbox to the end of each list item that reflects the selected state of each project */
  isCheckable?: boolean;
}>;

/**
 * Project List component that creates a list for a provided array of projects. Assumes there is
 * only one button per project.
 *
 * @param ProjectListProps And any children elements
 * @returns <ProjectList />
 */
export function ProjectList({
  projects,
  handleSelectProject,
  isMultiselect,
  selectedProjectIds,
  subheader,
  isCheckable,
  children,
}: ProjectListProps) {
  const isSelected = useCallback(
    (project: ProjectMetadataDisplay) => {
      if (isMultiselect && selectedProjectIds) {
        return selectedProjectIds.includes(project.id);
      }
      return undefined;
    },
    [isMultiselect, selectedProjectIds],
  );

  const createListItemContents = (project: ProjectMetadataDisplay) => {
    const selected = isSelected(project);
    // When checkable, the row itself is the checkbox (role + aria-checked) so the selected state
    // stays accessible. The visual indicator below is purely presentational (aria-hidden) - it must
    // not be an interactive control, because a <button> (e.g. a Radix Checkbox) cannot be a
    // descendant of this <button> (invalid DOM nesting). See PT-3924.
    return (
      <Button
        variant="ghost"
        onClick={() => handleSelectProject(project.id)}
        role={isCheckable ? 'checkbox' : undefined}
        aria-checked={isCheckable ? !!selected : undefined}
      >
        {isCheckable && (
          <span
            aria-hidden
            style={{ marginInlineEnd: '8px' }}
            className={`pr-twp tw:flex tw:size-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border ${
              selected
                ? 'tw:border-primary tw:bg-primary tw:text-primary-foreground'
                : 'tw:border-input'
            }`}
          >
            {selected && <Check className="tw:size-3.5" />}
          </span>
        )}
        {children}
        <Label>{project.name}</Label>
      </Button>
    );
  };

  return (
    <div className="project-list">
      <Label>{subheader}</Label>
      <ul className="list">
        {projects.map((project) => (
          <li key={project.id}>{createListItemContents(project)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
