import {
  ComboBox,
  type ComboBoxGroup,
  type ComboBoxLabelOption,
} from '@/components/basics/combo-box.component';

export type ProjectOption = {
  id: string;
  name: string;
};

export type ProjectPickerLocalizedStrings = {
  recentProjectsHeading?: string;
  allProjectsHeading?: string;
  loadingPlaceholder?: string;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  noResultsMessage?: string;
};

export type ProjectPickerComboBoxProps = {
  currentProject: ProjectOption | undefined;
  recentProjects: ProjectOption[];
  allProjects: ProjectOption[];
  /** Callback invoked with the selected project's ID when the user picks a project */
  onSelect: (projectId: string) => void;
  isLoading?: boolean;
  localizedStrings?: ProjectPickerLocalizedStrings;
  /** Accessible label for the trigger button */
  ariaLabel?: string;
  className?: string;
};

type ProjectComboOption = ComboBoxLabelOption & { projectId: string };

const toOption = (project: ProjectOption): ProjectComboOption => ({
  label: project.name,
  projectId: project.id,
});

/** Combo box for selecting a project from recent and all-projects lists */
export function ProjectPickerComboBox({
  currentProject,
  recentProjects,
  allProjects,
  onSelect,
  isLoading = false,
  localizedStrings = {},
  ariaLabel,
  className,
}: ProjectPickerComboBoxProps) {
  const groups: ComboBoxGroup<ProjectComboOption>[] = [];

  if (recentProjects.length > 0) {
    groups.push({
      groupHeading: localizedStrings.recentProjectsHeading ?? 'Recent',
      options: recentProjects.map(toOption),
    });
  }

  if (allProjects.length > 0) {
    groups.push({
      groupHeading: localizedStrings.allProjectsHeading ?? 'All projects',
      options: allProjects.map(toOption),
    });
  }

  const currentOption = currentProject ? toOption(currentProject) : undefined;

  return (
    <ComboBox<ProjectComboOption>
      options={groups}
      value={currentOption}
      onChange={(option) => onSelect(option.projectId)}
      getOptionLabel={(option) => option.label}
      buttonPlaceholder={
        isLoading
          ? (localizedStrings.loadingPlaceholder ?? '...')
          : (localizedStrings.selectPlaceholder ?? 'Select project')
      }
      textPlaceholder={localizedStrings.searchPlaceholder ?? 'Search projects...'}
      commandEmptyMessage={localizedStrings.noResultsMessage ?? 'No projects found'}
      buttonClassName={className}
      ariaLabel={ariaLabel}
      isDisabled={isLoading}
    />
  );
}
