import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  FileComparisonResult,
  FileComparisonState,
  getDefaultSelected,
  getTooltipForState,
} from '../components/restore/file-comparison-grid.component';

// =============================================================================
// TYPES
// =============================================================================

/** Project option for destination dropdown */
export interface ProjectOption {
  /** Project short name */
  name: string;
  /** Project GUID */
  guid?: string;
  /** Display name for dropdown */
  displayName: string;
}

/** Backup file information from the backup archive */
export interface BackupFileInfo {
  /** File name within the backup */
  fileName: string;
  /** File size in bytes */
  fileSize: number;
  /** Last modified date */
  lastModified: Date;
  /** Hash for comparison (optional) */
  backupHash?: string;
}

/** Input state for Restore form */
export interface RestoreFormInput {
  /** Path to the backup file */
  backupFilePath: string;
  /** Description from backup metadata */
  backupDescription: string;
  /** Files contained in the backup */
  backupFiles: BackupFileInfo[];
  /** Available projects for destination */
  availableProjects: ProjectOption[];
  /** Pre-selected project (optional) */
  preSelectedProject?: string;
}

/** Output state from Restore form */
export interface RestoreFormOutput {
  /** Action taken by user */
  action: 'restore' | 'cancel' | 'create-project';

  /** Data for restore action */
  restoreData?: {
    destinationProject: string;
    filesToRestore: string[];
  };

  /** Context for create-project action */
  createProjectContext?: {
    mode: 'create';
    returnToRestore: boolean;
    presetFromBackup?: {
      shortName?: string;
      fullName?: string;
    };
  };

  /** Name of newly created project (after returning from create) */
  newProjectCreated?: string;
}

/** Validation error representation */
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

// =============================================================================
// HELPERS
// =============================================================================

/** Format file size for display */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Create display info for backup file */
function createBackupInfo(file: BackupFileInfo): string {
  return `${file.fileName} (${formatFileSize(file.fileSize)})`;
}

/** Create display info for disk file based on comparison state */
function createDiskInfo(fileName: string, comparisonState: FileComparisonState): string {
  switch (comparisonState) {
    case 'DestDoesNotExist':
      return '(not present)';
    case 'FilesAreSame':
      return fileName;
    case 'FilesAreDifferent':
      return `${fileName} (different)`;
    case 'DestNewer':
      return `${fileName} (newer on disk)`;
    case 'SourceNewer':
      return `${fileName} (older on disk)`;
    case 'SourceDoesNotExist':
      return fileName;
    default:
      return fileName;
  }
}

/**
 * Mock function to determine file comparison state
 *
 * In real implementation, this would be replaced by backend comparison
 */
export function determineComparisonState(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _backupFile: BackupFileInfo,
): FileComparisonState {
  // For now, return a mock state - this will be replaced by actual backend call
  // In production, this comparison is done by the backend (CAP-018)
  return 'DestDoesNotExist';
}

/** Create FileComparisonResult from backup file and comparison state */
export function createFileComparisonResult(
  backupFile: BackupFileInfo,
  comparisonState: FileComparisonState,
): FileComparisonResult {
  return {
    fileName: backupFile.fileName,
    backupInfo: createBackupInfo(backupFile),
    diskInfo: createDiskInfo(backupFile.fileName, comparisonState),
    comparisonState,
    defaultSelected: getDefaultSelected(comparisonState),
    tooltip: getTooltipForState(comparisonState),
  };
}

// =============================================================================
// HOOK
// =============================================================================

export interface UseRestoreFormReturn {
  // Form values
  fromPath: string;
  description: string;
  selectedDestination: string | undefined;
  fileComparisonResults: FileComparisonResult[];
  selectedFiles: Set<string>;
  hideSameFiles: boolean;
  visibleFiles: FileComparisonResult[];

  // Available options
  availableProjects: ProjectOption[];

  // UI state
  isLoading: boolean;
  isRestoring: boolean;
  isValid: boolean;

  // Validation
  validationErrors: Record<string, string>;

  // Handlers
  handleDestinationChange: (destination: string | undefined) => void;
  handleFileSelectionChange: (selectedFiles: Set<string>) => void;
  handleHideSameFilesChange: (hide: boolean) => void;
  handleSelectAll: () => void;
  handleDeselectAll: () => void;
  handleNewProjectClick: () => RestoreFormOutput;
  handleNewProjectCreated: (projectName: string) => void;
  handleSubmit: () => RestoreFormOutput;
  handleCancel: () => RestoreFormOutput;

  // Data loading
  loadFileComparison: (destinationProject: string) => Promise<void>;
}

/**
 * Custom hook for managing Restore form state
 *
 * Implements behaviors:
 *
 * - BHV-208: Restore file selection default logic
 * - EP-002: "New Project" button triggers ProjectPropertiesDialog
 */
export function useRestoreForm(input: RestoreFormInput): UseRestoreFormReturn {
  // Form values
  const [selectedDestination, setSelectedDestination] = useState<string | undefined>(
    input.preSelectedProject || undefined,
  );
  const [fileComparisonResults, setFileComparisonResults] = useState<FileComparisonResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [hideSameFiles, setHideSameFiles] = useState(false);
  const [availableProjects, setAvailableProjects] = useState<ProjectOption[]>(
    input.availableProjects,
  );

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Computed: visible files (filtered by hideSameFiles)
  const visibleFiles = useMemo(() => {
    if (!hideSameFiles) return fileComparisonResults;
    return fileComparisonResults.filter((f) => f.comparisonState !== 'FilesAreSame');
  }, [fileComparisonResults, hideSameFiles]);

  // Computed: form validity
  const isValid = useMemo(() => {
    return selectedDestination !== undefined && selectedFiles.size > 0;
  }, [selectedDestination, selectedFiles]);

  // Load file comparison when destination changes
  const loadFileComparison = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_destinationProject: string) => {
      setIsLoading(true);
      setValidationErrors({});

      try {
        // In production, this would call the backend:
        // const results = await papi.commands.sendCommand(
        //   'platformScripture.determineRestoreEligibility',
        //   { backupFilePath: input.backupFilePath, destinationProject }
        // );

        // For now, create mock comparison results based on backup files
        const results: FileComparisonResult[] = input.backupFiles.map((file) => {
          // Mock comparison logic - in production this comes from backend
          const state = determineComparisonState(file);
          return createFileComparisonResult(file, state);
        });

        setFileComparisonResults(results);

        // Apply default selections (BHV-208)
        const defaultSelected = new Set(
          results.filter((r) => r.defaultSelected).map((r) => r.fileName),
        );
        setSelectedFiles(defaultSelected);
      } catch (error) {
        setValidationErrors({
          fileComparison: `Failed to compare files: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [input.backupFiles],
  );

  // Handle destination change
  const handleDestinationChange = useCallback(
    (destination: string | undefined) => {
      setSelectedDestination(destination);
      if (destination) {
        loadFileComparison(destination);
      } else {
        setFileComparisonResults([]);
        setSelectedFiles(new Set());
      }
    },
    [loadFileComparison],
  );

  // Handle file selection change
  const handleFileSelectionChange = useCallback((newSelectedFiles: Set<string>) => {
    setSelectedFiles(newSelectedFiles);
  }, []);

  // Handle hide same files toggle
  const handleHideSameFilesChange = useCallback((hide: boolean) => {
    setHideSameFiles(hide);
  }, []);

  // Handle select all (only visible files)
  const handleSelectAll = useCallback(() => {
    const allVisible = new Set(visibleFiles.map((f) => f.fileName));
    // Merge with currently selected (to preserve hidden selections)
    const merged = new Set([...selectedFiles, ...allVisible]);
    setSelectedFiles(merged);
  }, [visibleFiles, selectedFiles]);

  // Handle deselect all (only visible files)
  const handleDeselectAll = useCallback(() => {
    const visibleFileNames = new Set(visibleFiles.map((f) => f.fileName));
    // Remove only visible files from selection
    const remaining = new Set([...selectedFiles].filter((f) => !visibleFileNames.has(f)));
    setSelectedFiles(remaining);
  }, [visibleFiles, selectedFiles]);

  // Handle New Project click (EP-002)
  const handleNewProjectClick = useCallback((): RestoreFormOutput => {
    return {
      action: 'create-project',
      createProjectContext: {
        mode: 'create',
        returnToRestore: true,
        // Could extract preset from backup metadata if available
      },
    };
  }, []);

  // Handle new project created (after returning from ProjectPropertiesDialog)
  const handleNewProjectCreated = useCallback(
    (projectName: string) => {
      // Add new project to available projects
      const newProject: ProjectOption = {
        name: projectName,
        displayName: projectName,
      };
      setAvailableProjects((prev) => [...prev, newProject]);

      // Select the new project
      setSelectedDestination(projectName);

      // Trigger file comparison
      loadFileComparison(projectName);
    },
    [loadFileComparison],
  );

  // Handle submit
  const handleSubmit = useCallback((): RestoreFormOutput => {
    // Validate destination
    if (!selectedDestination) {
      setValidationErrors({ destination: 'Select a destination project' });
      return { action: 'cancel' };
    }

    // Validate file selection
    if (selectedFiles.size === 0) {
      setValidationErrors({ files: 'Select at least one file to restore' });
      return { action: 'cancel' };
    }

    setIsRestoring(true);

    return {
      action: 'restore',
      restoreData: {
        destinationProject: selectedDestination,
        filesToRestore: Array.from(selectedFiles),
      },
    };
  }, [selectedDestination, selectedFiles]);

  // Handle cancel
  const handleCancel = useCallback((): RestoreFormOutput => {
    return { action: 'cancel' };
  }, []);

  // Auto-load comparison if pre-selected project exists
  useEffect(() => {
    if (input.preSelectedProject) {
      loadFileComparison(input.preSelectedProject);
    }
    // Only run on mount with pre-selected project
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Form values
    fromPath: input.backupFilePath,
    description: input.backupDescription,
    selectedDestination,
    fileComparisonResults,
    selectedFiles,
    hideSameFiles,
    visibleFiles,

    // Available options
    availableProjects,

    // UI state
    isLoading,
    isRestoring,
    isValid,

    // Validation
    validationErrors,

    // Handlers
    handleDestinationChange,
    handleFileSelectionChange,
    handleHideSameFilesChange,
    handleSelectAll,
    handleDeselectAll,
    handleNewProjectClick,
    handleNewProjectCreated,
    handleSubmit,
    handleCancel,

    // Data loading
    loadFileComparison,
  };
}
