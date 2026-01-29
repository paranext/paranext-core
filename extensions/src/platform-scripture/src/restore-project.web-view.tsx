import { WebViewProps } from '@papi/core';
import { useCallback, KeyboardEvent, useMemo } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  cn,
} from 'platform-bible-react';
import { AlertTriangle, FolderOpen, Plus } from 'lucide-react';
import { FileComparisonGrid } from './components/restore/file-comparison-grid.component';
import {
  useRestoreForm,
  RestoreFormInput,
  RestoreFormOutput,
  BackupFileInfo,
  ProjectOption,
} from './hooks/use-restore-form';

// =============================================================================
// TYPES (Re-export for external use)
// =============================================================================

export type { RestoreFormInput, RestoreFormOutput, BackupFileInfo, ProjectOption };

// =============================================================================
// PROPS
// =============================================================================

export interface RestoreProjectWebViewProps {
  /** Input configuration for the restore form */
  input: RestoreFormInput;

  /** Callback when user completes restore (or cancels) */
  onComplete: (output: RestoreFormOutput) => void;

  /** Callback when user clicks "New Project" */
  onNewProjectClick: (context: RestoreFormOutput['createProjectContext']) => void;
}

// =============================================================================
// MOCK DATA FOR DEVELOPMENT
// =============================================================================

const MOCK_BACKUP_FILES: BackupFileInfo[] = [
  { fileName: 'Settings.xml', fileSize: 2048, lastModified: new Date('2024-01-15') },
  { fileName: '42GEN.SFM', fileSize: 156789, lastModified: new Date('2024-01-20') },
  { fileName: '43EXO.SFM', fileSize: 189432, lastModified: new Date('2024-01-18') },
  { fileName: '44LEV.SFM', fileSize: 145678, lastModified: new Date('2024-01-10') },
  { fileName: 'custom.vrs', fileSize: 512, lastModified: new Date('2024-01-01') },
];

const MOCK_PROJECTS: ProjectOption[] = [
  { name: 'MYT', displayName: 'My Translation (MYT)' },
  { name: 'TEST', displayName: 'Test Project (TEST)' },
  { name: 'DEMO', displayName: 'Demo Translation (DEMO)' },
];

const MOCK_INPUT: RestoreFormInput = {
  backupFilePath: '/home/user/backups/MyProject_2024-01-20.zip',
  backupDescription: 'Backup created on January 20, 2024',
  backupFiles: MOCK_BACKUP_FILES,
  availableProjects: MOCK_PROJECTS,
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * RestoreProjectWebView - Main web view for restoring project from backup
 *
 * Features:
 *
 * - Displays backup source path and description
 * - Destination project selection dropdown
 * - "New Project" button to create new project as restore target
 * - File comparison grid with checkbox selection
 * - "Hide identical files" filter
 * - "Select All" / "Deselect All" buttons
 * - OK button disabled until destination and files selected
 * - Loading state during file comparison
 *
 * Implements:
 *
 * - BHV-208: File selection default logic
 * - EP-002: "New Project" triggers ProjectPropertiesDialog
 */
export function RestoreProjectWebView({
  input,
  onComplete,
  onNewProjectClick,
}: RestoreProjectWebViewProps) {
  const {
    // Form values
    fromPath,
    description,
    selectedDestination,
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
    handleSubmit,
    handleCancel,
  } = useRestoreForm(input);

  // Handle destination value change
  const handleDestinationValueChange = useCallback(
    (value: string) => {
      // Convert empty string (used for placeholder) to undefined
      handleDestinationChange(value || undefined);
    },
    [handleDestinationChange],
  );

  // Handle OK click
  const handleOkClick = useCallback(() => {
    const output = handleSubmit();
    if (output.action !== 'cancel') {
      onComplete(output);
    }
  }, [handleSubmit, onComplete]);

  // Handle Cancel click
  const handleCancelClick = useCallback(() => {
    const output = handleCancel();
    onComplete(output);
  }, [handleCancel, onComplete]);

  // Handle New Project click
  const handleNewProjectButtonClick = useCallback(() => {
    const output = handleNewProjectClick();
    if (output.createProjectContext) {
      onNewProjectClick(output.createProjectContext);
    }
  }, [handleNewProjectClick, onNewProjectClick]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancelClick();
      }
    },
    [handleCancelClick],
  );

  // Count selected files for display
  const selectedCount = selectedFiles.size;
  const visibleCount = visibleFiles.length;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background"
      onKeyDown={handleKeyDown}
    >
      {/* Header with source info */}
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4 tw-border-b tw-border-border">
        <div className="tw-flex tw-items-center tw-gap-2">
          <FolderOpen className="tw-h-6 tw-w-6 tw-text-muted-foreground" />
          <h1 className="tw-text-lg tw-font-semibold">Restore Project</h1>
        </div>

        {/* Source Path */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label className="tw-text-muted-foreground">From:</Label>
          <span className="tw-text-sm tw-font-mono tw-bg-muted tw-px-2 tw-py-1 tw-rounded">
            {fromPath}
          </span>
        </div>

        {/* Description */}
        {description && (
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label className="tw-text-muted-foreground">Description:</Label>
            <span className="tw-text-sm">{description}</span>
          </div>
        )}
      </div>

      {/* Destination Selection */}
      <div className="tw-flex tw-items-end tw-gap-3 tw-p-4 tw-border-b tw-border-border">
        <div className="tw-flex tw-flex-col tw-gap-1 tw-flex-1">
          <Label htmlFor="destination-project">
            Destination: <span className="tw-text-destructive">*</span>
          </Label>
          <Select
            value={selectedDestination ?? ''}
            onValueChange={handleDestinationValueChange}
            disabled={isRestoring}
          >
            <SelectTrigger
              id="destination-project"
              aria-required="true"
              aria-invalid={!!validationErrors.destination}
            >
              <SelectValue placeholder="Select destination project..." />
            </SelectTrigger>
            <SelectContent>
              {availableProjects.map((project) => (
                <SelectItem key={project.name} value={project.name}>
                  {project.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.destination && (
            <span className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.destination}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          onClick={handleNewProjectButtonClick}
          disabled={isRestoring}
          className="tw-flex tw-items-center tw-gap-1"
        >
          <Plus className="tw-h-4 tw-w-4" />
          New Project
        </Button>
      </div>

      {/* File Grid Section */}
      <div className="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden tw-p-4">
        {/* Validation Error Banner */}
        {validationErrors.fileComparison && (
          <Alert variant="destructive" className="tw-mb-4">
            <AlertTriangle className="tw-h-4 tw-w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{validationErrors.fileComparison}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-flex-1 tw-gap-3">
            <Spinner />
            <span className="tw-text-muted-foreground">Comparing files...</span>
          </div>
        )}

        {/* Empty State - No destination selected */}
        {!isLoading && !selectedDestination && (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-flex-1 tw-text-muted-foreground">
            <span>Select a destination project to compare files</span>
          </div>
        )}

        {/* File Comparison Grid - When destination is selected and not loading */}
        {!isLoading && selectedDestination && (
          <>
            {/* Filter Options */}
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <Checkbox
                  id="hide-same-files"
                  checked={hideSameFiles}
                  onCheckedChange={(checked) => handleHideSameFilesChange(Boolean(checked))}
                  disabled={isRestoring}
                />
                <Label htmlFor="hide-same-files" className="tw-cursor-pointer">
                  Hide identical files
                </Label>
              </div>

              <div className="tw-flex tw-items-center tw-gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={isRestoring || visibleFiles.length === 0}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAll}
                  disabled={isRestoring || selectedFiles.size === 0}
                >
                  Deselect All
                </Button>
              </div>
            </div>

            {/* File Grid */}
            <div className="tw-flex-1 tw-overflow-auto">
              <FileComparisonGrid
                files={visibleFiles}
                selectedFiles={selectedFiles}
                onSelectionChange={handleFileSelectionChange}
                isLoading={isLoading}
                disabled={isRestoring}
              />
            </div>

            {/* Selection Summary */}
            <div className="tw-mt-3 tw-text-sm tw-text-muted-foreground">
              {selectedCount} of {visibleCount} file{visibleCount !== 1 ? 's' : ''} selected
              {hideSameFiles && ' (identical files hidden)'}
            </div>

            {/* Files validation error */}
            {validationErrors.files && (
              <span className="tw-text-sm tw-text-destructive tw-mt-1" role="alert">
                {validationErrors.files}
              </span>
            )}
          </>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <div
        className={cn(
          'tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border',
          'tw-bg-background',
        )}
      >
        <Button variant="outline" onClick={handleCancelClick} disabled={isRestoring}>
          Cancel
        </Button>
        <Button onClick={handleOkClick} disabled={!isValid || isRestoring}>
          {isRestoring ? 'Restoring...' : 'OK'}
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// WEB VIEW ENTRY POINT
// =============================================================================

/**
 * Web view component registered with Platform.Bible
 *
 * Wraps RestoreProjectWebView with web view state and PAPI integration
 */
globalThis.webViewComponent = function RestoreProjectWebViewEntry({
  useWebViewState,
}: WebViewProps) {
  // Get state from web view
  const [backupFilePath] = useWebViewState<string>('backupFilePath', '');
  const [backupDescription] = useWebViewState<string>('backupDescription', '');

  // For now, use mock data for development
  // In production, this would come from web view state or PAPI commands
  const input: RestoreFormInput = useMemo(() => {
    if (backupFilePath) {
      return {
        backupFilePath,
        backupDescription,
        backupFiles: MOCK_BACKUP_FILES, // Would come from backend
        availableProjects: MOCK_PROJECTS, // Would come from backend
      };
    }
    return MOCK_INPUT;
  }, [backupFilePath, backupDescription]);

  // Handle completion - in production, this would send command or close view
  const handleComplete = useCallback((output: RestoreFormOutput) => {
    // eslint-disable-next-line no-console
    console.log('Restore complete:', output);
    // In production:
    // if (output.action === 'restore') {
    //   await papi.commands.sendCommand('platformScripture.restoreProject', output.restoreData);
    // }
  }, []);

  // Handle new project click - in production, this would open ProjectPropertiesDialog
  const handleNewProjectClick = useCallback(
    (context: RestoreFormOutput['createProjectContext']) => {
      // eslint-disable-next-line no-console
      console.log('New project requested:', context);
      // In production:
      // await papi.webViews.openWebView('platformScripture.projectProperties', { ... });
    },
    [],
  );

  return (
    <RestoreProjectWebView
      input={input}
      onComplete={handleComplete}
      onNewProjectClick={handleNewProjectClick}
    />
  );
};

export default RestoreProjectWebView;
