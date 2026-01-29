import { useCallback, useMemo } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';

// =============================================================================
// TYPES
// =============================================================================

/**
 * File comparison state from backend analysis (BHV-208)
 *
 * Determines default selection behavior and row styling
 */
export type FileComparisonState =
  | 'DestDoesNotExist' // File in backup doesn't exist on disk -> default selected
  | 'SourceDoesNotExist' // File on disk doesn't exist in backup (rare)
  | 'FilesAreSame' // Files are identical -> default NOT selected
  | 'FilesAreDifferent' // Files differ -> default selected
  | 'DestNewer' // Disk file is newer -> default NOT selected
  | 'SourceNewer'; // Backup file is newer -> default selected

/** Result of comparing a single file between backup and disk */
export interface FileComparisonResult {
  /** File name (e.g., "42GEN.SFM") */
  fileName: string;
  /** Display info about backup file (e.g., "42GEN.SFM (1.2 KB)") */
  backupInfo: string;
  /** Display info about disk file (e.g., "42GEN.SFM (older)" or "(not present)") */
  diskInfo: string;
  /** Comparison state for styling and default selection */
  comparisonState: FileComparisonState;
  /** Whether this file should be selected by default */
  defaultSelected: boolean;
  /** Tooltip explaining the comparison state */
  tooltip: string;
}

// =============================================================================
// PROPS
// =============================================================================

export interface FileComparisonGridProps {
  /** Files to display in the grid */
  files: FileComparisonResult[];

  /** Set of selected file names */
  selectedFiles: Set<string>;

  /** Callback when selection changes */
  onSelectionChange: (selectedFiles: Set<string>) => void;

  /** Whether the grid is loading */
  isLoading?: boolean;

  /** Whether the grid is disabled */
  disabled?: boolean;
}

// =============================================================================
// HELPERS
// =============================================================================

/** Get tooltip text for a comparison state (BHV-208) */
export function getTooltipForState(state: FileComparisonState): string {
  switch (state) {
    case 'DestDoesNotExist':
      return 'File in backup does not exist on hard disk';
    case 'SourceDoesNotExist':
      return 'File on disk does not exist in backup';
    case 'FilesAreSame':
      return 'These two files are identical';
    case 'FilesAreDifferent':
      return 'Files have different content';
    case 'DestNewer':
      return 'File on disk is newer than backup';
    case 'SourceNewer':
      return 'Backup file is newer than file on disk';
    default:
      return '';
  }
}

/** Determine if a file should be selected by default (BHV-208) */
export function getDefaultSelected(state: FileComparisonState): boolean {
  switch (state) {
    case 'DestDoesNotExist':
      return true;
    case 'FilesAreSame':
      return false;
    case 'FilesAreDifferent':
      return true;
    case 'DestNewer':
      return false;
    case 'SourceNewer':
      return true;
    case 'SourceDoesNotExist':
      return false;
    default:
      return false;
  }
}

/** Get row styling class based on comparison state */
function getRowClassName(state: FileComparisonState): string {
  switch (state) {
    case 'FilesAreSame':
      return 'tw-opacity-50'; // Dimmed
    case 'DestNewer':
      return 'tw-bg-muted'; // Warning styling
    default:
      return '';
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * FileComparisonGrid - Displays files for restore with selection checkboxes
 *
 * Features:
 *
 * - Checkbox column for file selection
 * - "Files in Backup" column showing backup file info
 * - "Files on Disk" column showing current disk file status
 * - Row styling based on comparison state (dimmed for same, warning for newer)
 * - Tooltips explaining each file's comparison state
 * - Keyboard accessible (Space to toggle checkbox)
 *
 * Implements BHV-208 (DetermineRestoreEligibilityZip)
 */
export function FileComparisonGrid({
  files,
  selectedFiles,
  onSelectionChange,
  isLoading = false,
  disabled = false,
}: FileComparisonGridProps) {
  // Handle individual file toggle
  const handleFileToggle = useCallback(
    (fileName: string, checked: boolean) => {
      const newSelection = new Set(selectedFiles);
      if (checked) {
        newSelection.add(fileName);
      } else {
        newSelection.delete(fileName);
      }
      onSelectionChange(newSelection);
    },
    [selectedFiles, onSelectionChange],
  );

  // Determine if all files are selected
  const allSelected = useMemo(() => {
    return files.length > 0 && files.every((f) => selectedFiles.has(f.fileName));
  }, [files, selectedFiles]);

  // Handle header checkbox toggle (select/deselect all)
  const handleHeaderToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        // Select all visible files
        const newSelection = new Set(files.map((f) => f.fileName));
        onSelectionChange(newSelection);
      } else {
        // Deselect all
        onSelectionChange(new Set());
      }
    },
    [files, onSelectionChange],
  );

  if (isLoading) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-py-8">
        <span className="tw-text-muted-foreground">Loading file comparison...</span>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-py-8">
        <span className="tw-text-muted-foreground">No files to display</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="tw-border tw-border-border tw-rounded-md tw-overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tw-w-[60px]">
                <div className="tw-flex tw-items-center tw-justify-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleHeaderToggle}
                    disabled={disabled}
                    aria-label="Select all files"
                  />
                </div>
              </TableHead>
              <TableHead>Files in Backup</TableHead>
              <TableHead>Files on Disk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <Tooltip key={file.fileName}>
                <TooltipTrigger asChild>
                  <TableRow
                    className={cn(
                      getRowClassName(file.comparisonState),
                      'tw-cursor-pointer hover:tw-bg-muted/50',
                    )}
                    onClick={() =>
                      !disabled &&
                      handleFileToggle(file.fileName, !selectedFiles.has(file.fileName))
                    }
                    role="row"
                    aria-selected={selectedFiles.has(file.fileName)}
                  >
                    <TableCell>
                      <div className="tw-flex tw-items-center tw-justify-center">
                        <Checkbox
                          checked={selectedFiles.has(file.fileName)}
                          onCheckedChange={(checked) =>
                            handleFileToggle(file.fileName, Boolean(checked))
                          }
                          disabled={disabled}
                          aria-label={`Select ${file.fileName}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="tw-font-medium">{file.backupInfo}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          file.comparisonState === 'DestDoesNotExist' &&
                            'tw-text-muted-foreground tw-italic',
                          file.comparisonState === 'DestNewer' && 'tw-text-foreground',
                          file.comparisonState === 'SourceNewer' && 'tw-text-foreground',
                        )}
                      >
                        {file.diskInfo}
                      </span>
                    </TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{file.tooltip || getTooltipForState(file.comparisonState)}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}

export default FileComparisonGrid;
