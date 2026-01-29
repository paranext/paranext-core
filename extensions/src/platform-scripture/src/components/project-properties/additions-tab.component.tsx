/**
 * AdditionsTab - Study Bible Additions configuration tab Only visible for StudyBibleAdditions
 * project type
 */

import { Button, ComboBox, Input, Label, cn } from 'platform-bible-react';
import type { ProjectOption } from '../../types/project-properties.types';

/** ComboBox option type */
type ComboBoxItem = { label: string; value: string };

// =============================================================================
// PROPS
// =============================================================================

export interface AdditionsTabProps {
  /** Base text project GUID */
  baseTextProject: string | undefined;

  /** List of additions projects (display only) */
  additionsProjectsList: string;

  /** Available base text projects */
  availableBaseProjects: ProjectOption[];

  /** Callback when base text changes */
  onBaseTextChange: (value: string | undefined) => void;

  /** Callback to select additions projects */
  onSelectAdditionsProjects?: () => void;

  /** Callback to check connections */
  onCheckConnections?: () => void;

  /** Callback to merge study bible */
  onMerge?: () => void;

  /** Whether connections are valid (enables merge) */
  connectionsValid?: boolean;

  /** Optional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * AdditionsTab - Sixth tab in Project Properties dialog (SBA only)
 *
 * Configures Study Bible Additions base text and project connections.
 */
export function AdditionsTab({
  baseTextProject,
  additionsProjectsList,
  availableBaseProjects,
  onBaseTextChange,
  onSelectAdditionsProjects,
  onCheckConnections,
  onMerge,
  connectionsValid = false,
  className,
}: AdditionsTabProps) {
  // Convert project options to ComboBox format
  const baseTextItems: ComboBoxItem[] = availableBaseProjects.map((proj) => ({
    value: proj.guid,
    label: proj.displayName,
  }));

  // Find current selection as ComboBox option
  const selectedBaseTextOption = baseTextItems.find((item) => item.value === baseTextProject);

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Instructions */}
      <p className="tw-text-sm tw-text-muted-foreground">
        Configure the base text and additions projects for this Study Bible. The additions projects
        contain supplementary content that will be merged into the final study Bible.
      </p>

      {/* Base Text */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>
          Base Text <span className="tw-text-destructive">*</span>
        </Label>
        <ComboBox<ComboBoxItem>
          options={baseTextItems}
          value={selectedBaseTextOption}
          onChange={(option) => onBaseTextChange(option?.value)}
          getOptionLabel={(option) => option.label}
          textPlaceholder="Select base text project..."
          buttonPlaceholder="Select base text project..."
          buttonClassName="tw-w-full"
        />
        <p className="tw-text-sm tw-text-muted-foreground">
          The Scripture project that serves as the foundation for the study Bible.
        </p>
      </div>

      {/* Additions Projects */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>Additions Projects</Label>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Input
            value={additionsProjectsList}
            readOnly
            className="tw-flex-1 tw-bg-muted"
            placeholder="(none selected)"
          />
          <Button variant="outline" size="sm" onClick={onSelectAdditionsProjects}>
            Select Additions Projects
          </Button>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground">
          Projects containing study notes, introductions, and other supplementary content.
        </p>
      </div>

      {/* Connection Actions */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-border tw-pt-4">
        <Label className="tw-font-medium">Merge Operations</Label>

        <div className="tw-flex tw-gap-2">
          <Button variant="outline" onClick={onCheckConnections}>
            Check Connections
          </Button>
          <Button onClick={onMerge} disabled={!connectionsValid}>
            Merge
          </Button>
        </div>

        <p className="tw-text-sm tw-text-muted-foreground">
          Check connections validates that all additions projects properly reference the base text.
          Merge combines all content into the final study Bible output.
        </p>
      </div>
    </div>
  );
}

export default AdditionsTab;
