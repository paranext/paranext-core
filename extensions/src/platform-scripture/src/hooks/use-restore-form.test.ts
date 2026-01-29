import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useRestoreForm,
  RestoreFormInput,
  BackupFileInfo,
  ProjectOption,
  createFileComparisonResult,
} from './use-restore-form';
import { getTooltipForState } from '../components/restore/file-comparison-grid.component';

// =============================================================================
// TEST DATA
// =============================================================================

const mockBackupFiles: BackupFileInfo[] = [
  { fileName: 'Settings.xml', fileSize: 2048, lastModified: new Date('2024-01-15') },
  { fileName: '42GEN.SFM', fileSize: 156789, lastModified: new Date('2024-01-20') },
  { fileName: '43EXO.SFM', fileSize: 189432, lastModified: new Date('2024-01-18') },
];

const mockProjects: ProjectOption[] = [
  { name: 'MYT', displayName: 'My Translation (MYT)' },
  { name: 'TEST', displayName: 'Test Project (TEST)' },
];

const defaultInput: RestoreFormInput = {
  backupFilePath: '/path/to/backup.zip',
  backupDescription: 'Test backup',
  backupFiles: mockBackupFiles,
  availableProjects: mockProjects,
};

// =============================================================================
// UNIT TESTS FOR HELPER FUNCTIONS
// =============================================================================

describe('createFileComparisonResult', () => {
  it('should create result with correct fileName', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'DestDoesNotExist');

    expect(result.fileName).toBe('Settings.xml');
  });

  it('should create result with formatted backupInfo', () => {
    const file = mockBackupFiles[0]; // 2048 bytes
    const result = createFileComparisonResult(file, 'DestDoesNotExist');

    expect(result.backupInfo).toBe('Settings.xml (2.0 KB)');
  });

  it('should create result with "(not present)" for DestDoesNotExist', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'DestDoesNotExist');

    expect(result.diskInfo).toBe('(not present)');
  });

  it('should create result with file name for FilesAreSame', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'FilesAreSame');

    expect(result.diskInfo).toBe('Settings.xml');
  });

  it('should create result with "(different)" for FilesAreDifferent', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'FilesAreDifferent');

    expect(result.diskInfo).toBe('Settings.xml (different)');
  });

  it('should create result with "(newer on disk)" for DestNewer', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'DestNewer');

    expect(result.diskInfo).toBe('Settings.xml (newer on disk)');
  });

  it('should create result with "(older on disk)" for SourceNewer', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'SourceNewer');

    expect(result.diskInfo).toBe('Settings.xml (older on disk)');
  });

  it('should set defaultSelected based on state', () => {
    const file = mockBackupFiles[0];

    expect(createFileComparisonResult(file, 'DestDoesNotExist').defaultSelected).toBe(true);
    expect(createFileComparisonResult(file, 'FilesAreSame').defaultSelected).toBe(false);
    expect(createFileComparisonResult(file, 'FilesAreDifferent').defaultSelected).toBe(true);
    expect(createFileComparisonResult(file, 'DestNewer').defaultSelected).toBe(false);
    expect(createFileComparisonResult(file, 'SourceNewer').defaultSelected).toBe(true);
  });

  it('should set tooltip based on state', () => {
    const file = mockBackupFiles[0];
    const result = createFileComparisonResult(file, 'DestDoesNotExist');

    expect(result.tooltip).toBe(getTooltipForState('DestDoesNotExist'));
  });
});

// =============================================================================
// HOOK TESTS
// =============================================================================

describe('useRestoreForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with input values', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.fromPath).toBe('/path/to/backup.zip');
      expect(result.current.description).toBe('Test backup');
      expect(result.current.availableProjects).toEqual(mockProjects);
    });

    it('should initialize with undefined destination when no preselection', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.selectedDestination).toBeUndefined();
    });

    it('should initialize with preSelectedProject when provided', () => {
      const inputWithPreselection: RestoreFormInput = {
        ...defaultInput,
        preSelectedProject: 'MYT',
      };

      const { result } = renderHook(() => useRestoreForm(inputWithPreselection));

      expect(result.current.selectedDestination).toBe('MYT');
    });

    it('should start with empty file comparison results', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.fileComparisonResults).toHaveLength(0);
    });

    it('should start with empty selected files', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.selectedFiles.size).toBe(0);
    });

    it('should start with hideSameFiles as false', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.hideSameFiles).toBe(false);
    });

    it('should start with isLoading as false', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.isLoading).toBe(false);
    });

    it('should start with isRestoring as false', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.isRestoring).toBe(false);
    });

    it('should start as invalid (no destination selected)', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.isValid).toBe(false);
    });
  });

  describe('handleDestinationChange', () => {
    it('should update selectedDestination', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      expect(result.current.selectedDestination).toBe('MYT');
    });

    it('should trigger file comparison loading', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      // After loading completes, should have comparison results
      await waitFor(() => {
        expect(result.current.fileComparisonResults.length).toBeGreaterThan(0);
      });
    });

    it('should clear results when destination is set to undefined', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // First select a destination
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.fileComparisonResults.length).toBeGreaterThan(0);
      });

      // Then clear it
      await act(async () => {
        result.current.handleDestinationChange(undefined);
      });

      expect(result.current.selectedDestination).toBeUndefined();
      expect(result.current.fileComparisonResults).toHaveLength(0);
      expect(result.current.selectedFiles.size).toBe(0);
    });
  });

  describe('handleFileSelectionChange', () => {
    it('should update selected files', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      act(() => {
        result.current.handleFileSelectionChange(new Set(['file1.xml', 'file2.xml']));
      });

      expect(result.current.selectedFiles).toEqual(new Set(['file1.xml', 'file2.xml']));
    });
  });

  describe('handleHideSameFilesChange', () => {
    it('should update hideSameFiles', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      act(() => {
        result.current.handleHideSameFilesChange(true);
      });

      expect(result.current.hideSameFiles).toBe(true);
    });
  });

  describe('handleSelectAll', () => {
    it('should select all visible files', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // First load file comparison
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.visibleFiles.length).toBeGreaterThan(0);
      });

      // Clear selection
      act(() => {
        result.current.handleFileSelectionChange(new Set());
      });

      // Select all
      act(() => {
        result.current.handleSelectAll();
      });

      // Should have all visible files selected
      expect(result.current.selectedFiles.size).toBe(result.current.visibleFiles.length);
    });
  });

  describe('handleDeselectAll', () => {
    it('should deselect all visible files', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // First load file comparison
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.visibleFiles.length).toBeGreaterThan(0);
      });

      // Deselect all
      act(() => {
        result.current.handleDeselectAll();
      });

      // Should have no visible files selected
      const visibleFileNames = new Set(result.current.visibleFiles.map((f) => f.fileName));
      const stillSelected = [...result.current.selectedFiles].filter((f) =>
        visibleFileNames.has(f),
      );
      expect(stillSelected.length).toBe(0);
    });
  });

  describe('handleNewProjectClick (EP-002)', () => {
    it('should return create-project action', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      const output = result.current.handleNewProjectClick();

      expect(output.action).toBe('create-project');
      expect(output.createProjectContext).toBeDefined();
      expect(output.createProjectContext?.mode).toBe('create');
      expect(output.createProjectContext?.returnToRestore).toBe(true);
    });
  });

  describe('handleNewProjectCreated', () => {
    it('should add new project to available projects', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleNewProjectCreated('NEWPROJ');
      });

      expect(result.current.availableProjects).toContainEqual({
        name: 'NEWPROJ',
        displayName: 'NEWPROJ',
      });
    });

    it('should select the new project', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleNewProjectCreated('NEWPROJ');
      });

      expect(result.current.selectedDestination).toBe('NEWPROJ');
    });
  });

  describe('handleSubmit', () => {
    it('should return cancel action when no destination selected', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      let output;
      act(() => {
        output = result.current.handleSubmit();
      });

      expect(output.action).toBe('cancel');
      // Validation errors are set in state
      expect(result.current.validationErrors.destination).toBe('Select a destination project');
    });

    it('should return cancel action when no files selected', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // Select destination
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.selectedDestination).toBe('MYT');
      });

      // Clear file selection
      act(() => {
        result.current.handleFileSelectionChange(new Set());
      });

      let output;
      act(() => {
        output = result.current.handleSubmit();
      });

      expect(output.action).toBe('cancel');
      expect(result.current.validationErrors.files).toBe('Select at least one file to restore');
    });

    it('should return restore action when valid', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // Select destination
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.selectedFiles.size).toBeGreaterThan(0);
      });

      let output;
      act(() => {
        output = result.current.handleSubmit();
      });

      expect(output.action).toBe('restore');
      expect(output.restoreData).toBeDefined();
      expect(output.restoreData?.destinationProject).toBe('MYT');
      expect(output.restoreData?.filesToRestore.length).toBeGreaterThan(0);
    });

    it('should set isRestoring when valid submission', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      // Select destination and files
      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.selectedFiles.size).toBeGreaterThan(0);
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(result.current.isRestoring).toBe(true);
    });
  });

  describe('handleCancel', () => {
    it('should return cancel action', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      const output = result.current.handleCancel();

      expect(output.action).toBe('cancel');
    });
  });

  describe('visibleFiles filtering', () => {
    it('should return all files when hideSameFiles is false', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.fileComparisonResults.length).toBeGreaterThan(0);
      });

      expect(result.current.visibleFiles.length).toBe(result.current.fileComparisonResults.length);
    });
  });

  describe('isValid computation', () => {
    it('should be false when no destination', () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      expect(result.current.isValid).toBe(false);
    });

    it('should be false when destination selected but no files', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        expect(result.current.selectedDestination).toBe('MYT');
      });

      // Clear file selection
      act(() => {
        result.current.handleFileSelectionChange(new Set());
      });

      expect(result.current.isValid).toBe(false);
    });

    it('should be true when destination and files selected', async () => {
      const { result } = renderHook(() => useRestoreForm(defaultInput));

      await act(async () => {
        result.current.handleDestinationChange('MYT');
      });

      await waitFor(() => {
        // Default selection should be applied automatically
        expect(result.current.selectedFiles.size).toBeGreaterThan(0);
      });

      expect(result.current.isValid).toBe(true);
    });
  });
});
