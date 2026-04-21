import { useMemo, type CSSProperties } from 'react';
import { ComboBox, ComboBoxGroup } from '@/components/basics/combo-box.component';
import { ButtonProps } from '@/components/shadcn-ui/button';

/** A single project entry rendered in the {@link ProjectSelector}. */
export type ProjectSelectorProject = {
  /** Unique project identifier. */
  id: string;
  /** Short project name, shown as the primary label on the trigger and in the list. */
  shortName: string;
  /** Full project name, shown as a secondary label next to the short name. */
  fullName: string;
};

export type ProjectSelectorProps = {
  /** Projects to choose from. Rendered in the order provided. */
  projects: readonly ProjectSelectorProject[];
  /** The id of the currently selected project, if any. */
  selectedProjectId?: string;
  /** Called with the newly selected project's id. */
  onChangeProject: (projectId: string) => void;
  /** If provided, the options are rendered under a group with this heading. */
  groupHeading?: string;
  /** Text shown on the trigger when no project is selected. */
  buttonPlaceholder?: string;
  /** Message shown when the user's search yields no matching projects. */
  commandEmptyMessage?: string;
  /** Accessible label for the trigger button. */
  ariaLabel?: string;
  /** Variant of the trigger button. Defaults to `outline`. */
  buttonVariant?: ButtonProps['variant'];
  /** Additional css classes for the trigger button. */
  buttonClassName?: string;
  /** Additional css classes for the popover content. */
  popoverContentClassName?: string;
  /** Inline styles for the popover content (useful for z-index overrides). */
  popoverContentStyle?: CSSProperties;
  /** Popover alignment. Defaults to `start`. */
  alignDropDown?: 'start' | 'center' | 'end';
  /** If true, the trigger is disabled. */
  isDisabled?: boolean;
};

type ProjectEntry = {
  id: string;
  label: string;
  secondaryLabel: string;
};

/**
 * A combo-box project picker. Displays each project as `shortName · fullName` and calls
 * `onChangeProject` with the selected project's id.
 *
 * Thin wrapper around {@link ComboBox} — use it directly when you need a grouped or flat list of
 * `{ id, shortName, fullName }` projects.
 */
export function ProjectSelector({
  projects,
  selectedProjectId,
  onChangeProject,
  groupHeading,
  buttonPlaceholder,
  commandEmptyMessage,
  ariaLabel,
  buttonVariant = 'outline',
  buttonClassName,
  popoverContentClassName,
  popoverContentStyle,
  alignDropDown = 'start',
  isDisabled = false,
}: ProjectSelectorProps) {
  const entries = useMemo<ProjectEntry[]>(
    () =>
      projects.map((project) => ({
        id: project.id,
        label: project.shortName,
        secondaryLabel: project.fullName,
      })),
    [projects],
  );

  const options = useMemo<readonly ProjectEntry[] | readonly ComboBoxGroup<ProjectEntry>[]>(
    () => (groupHeading ? [{ groupHeading, options: entries }] : entries),
    [entries, groupHeading],
  );

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedProjectId),
    [entries, selectedProjectId],
  );

  return (
    <ComboBox<ProjectEntry>
      options={options}
      value={selectedEntry}
      onChange={(entry) => onChangeProject(entry.id)}
      getButtonLabel={(entry) => entry.label}
      buttonPlaceholder={buttonPlaceholder}
      commandEmptyMessage={commandEmptyMessage}
      ariaLabel={ariaLabel}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
      popoverContentClassName={popoverContentClassName}
      popoverContentStyle={popoverContentStyle}
      alignDropDown={alignDropDown}
      isDisabled={isDisabled}
    />
  );
}

export default ProjectSelector;
