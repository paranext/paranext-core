import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FileComparisonGrid,
  FileComparisonGridProps,
  FileComparisonResult,
  FileComparisonState,
  getDefaultSelected,
  getTooltipForState,
} from './file-comparison-grid.component';

// =============================================================================
// UNIT TESTS FOR HELPER FUNCTIONS
// =============================================================================

describe('getTooltipForState', () => {
  it('should return correct tooltip for DestDoesNotExist', () => {
    expect(getTooltipForState('DestDoesNotExist')).toBe(
      'File in backup does not exist on hard disk',
    );
  });

  it('should return correct tooltip for SourceDoesNotExist', () => {
    expect(getTooltipForState('SourceDoesNotExist')).toBe('File on disk does not exist in backup');
  });

  it('should return correct tooltip for FilesAreSame', () => {
    expect(getTooltipForState('FilesAreSame')).toBe('These two files are identical');
  });

  it('should return correct tooltip for FilesAreDifferent', () => {
    expect(getTooltipForState('FilesAreDifferent')).toBe('Files have different content');
  });

  it('should return correct tooltip for DestNewer', () => {
    expect(getTooltipForState('DestNewer')).toBe('File on disk is newer than backup');
  });

  it('should return correct tooltip for SourceNewer', () => {
    expect(getTooltipForState('SourceNewer')).toBe('Backup file is newer than file on disk');
  });
});

describe('getDefaultSelected (BHV-208)', () => {
  it('should return true for DestDoesNotExist', () => {
    expect(getDefaultSelected('DestDoesNotExist')).toBe(true);
  });

  it('should return false for FilesAreSame', () => {
    expect(getDefaultSelected('FilesAreSame')).toBe(false);
  });

  it('should return true for FilesAreDifferent', () => {
    expect(getDefaultSelected('FilesAreDifferent')).toBe(true);
  });

  it('should return false for DestNewer', () => {
    expect(getDefaultSelected('DestNewer')).toBe(false);
  });

  it('should return true for SourceNewer', () => {
    expect(getDefaultSelected('SourceNewer')).toBe(true);
  });

  it('should return false for SourceDoesNotExist', () => {
    expect(getDefaultSelected('SourceDoesNotExist')).toBe(false);
  });
});

// =============================================================================
// COMPONENT TESTS
// =============================================================================

describe('FileComparisonGrid', () => {
  const createMockFile = (fileName: string, state: FileComparisonState): FileComparisonResult => ({
    fileName,
    backupInfo: `${fileName} (1 KB)`,
    diskInfo: state === 'DestDoesNotExist' ? '(not present)' : fileName,
    comparisonState: state,
    defaultSelected: getDefaultSelected(state),
    tooltip: getTooltipForState(state),
  });

  const mockFiles: FileComparisonResult[] = [
    createMockFile('file1.xml', 'DestDoesNotExist'),
    createMockFile('file2.xml', 'FilesAreSame'),
    createMockFile('file3.xml', 'FilesAreDifferent'),
    createMockFile('file4.xml', 'SourceNewer'),
    createMockFile('file5.xml', 'DestNewer'),
  ];

  const defaultProps: FileComparisonGridProps = {
    files: mockFiles,
    selectedFiles: new Set(['file1.xml', 'file3.xml', 'file4.xml']),
    onSelectionChange: vi.fn(),
    isLoading: false,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all files', () => {
    render(<FileComparisonGrid {...defaultProps} />);

    expect(screen.getByText('file1.xml (1 KB)')).toBeInTheDocument();
    expect(screen.getByText('file2.xml (1 KB)')).toBeInTheDocument();
    expect(screen.getByText('file3.xml (1 KB)')).toBeInTheDocument();
    expect(screen.getByText('file4.xml (1 KB)')).toBeInTheDocument();
    expect(screen.getByText('file5.xml (1 KB)')).toBeInTheDocument();
  });

  it('should render column headers', () => {
    render(<FileComparisonGrid {...defaultProps} />);

    expect(screen.getByText('Files in Backup')).toBeInTheDocument();
    expect(screen.getByText('Files on Disk')).toBeInTheDocument();
  });

  it('should display loading state', () => {
    render(<FileComparisonGrid {...defaultProps} isLoading />);

    expect(screen.getByText('Loading file comparison...')).toBeInTheDocument();
  });

  it('should display empty state when no files', () => {
    render(<FileComparisonGrid {...defaultProps} files={[]} />);

    expect(screen.getByText('No files to display')).toBeInTheDocument();
  });

  it('should show checkboxes as checked for selected files', () => {
    render(<FileComparisonGrid {...defaultProps} />);

    // Find checkboxes by their aria-label
    const file1Checkbox = screen.getByLabelText('Select file1.xml');
    const file2Checkbox = screen.getByLabelText('Select file2.xml');

    expect(file1Checkbox).toBeChecked();
    expect(file2Checkbox).not.toBeChecked();
  });

  it('should call onSelectionChange when file is toggled', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();

    render(<FileComparisonGrid {...defaultProps} onSelectionChange={onSelectionChange} />);

    // Click on an unselected file (file2)
    const file2Checkbox = screen.getByLabelText('Select file2.xml');
    await user.click(file2Checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith(
      new Set(['file1.xml', 'file3.xml', 'file4.xml', 'file2.xml']),
    );
  });

  it('should call onSelectionChange when row is clicked', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();

    render(<FileComparisonGrid {...defaultProps} onSelectionChange={onSelectionChange} />);

    // Click on the row containing file2
    const file2Row = screen.getByText('file2.xml (1 KB)').closest('tr');
    if (file2Row) {
      await user.click(file2Row);
    }

    expect(onSelectionChange).toHaveBeenCalledWith(
      new Set(['file1.xml', 'file3.xml', 'file4.xml', 'file2.xml']),
    );
  });

  it('should uncheck file when toggling selected file', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();

    render(<FileComparisonGrid {...defaultProps} onSelectionChange={onSelectionChange} />);

    // Click on a selected file (file1)
    const file1Checkbox = screen.getByLabelText('Select file1.xml');
    await user.click(file1Checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith(
      new Set(['file3.xml', 'file4.xml']), // file1 removed
    );
  });

  it('should select all when header checkbox is clicked and not all selected', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();

    render(<FileComparisonGrid {...defaultProps} onSelectionChange={onSelectionChange} />);

    // Click on header checkbox
    const headerCheckbox = screen.getByLabelText('Select all files');
    await user.click(headerCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith(
      new Set(['file1.xml', 'file2.xml', 'file3.xml', 'file4.xml', 'file5.xml']),
    );
  });

  it('should deselect all when header checkbox is clicked and all selected', async () => {
    const onSelectionChange = vi.fn();
    const allSelected = new Set(mockFiles.map((f) => f.fileName));
    const user = userEvent.setup();

    render(
      <FileComparisonGrid
        {...defaultProps}
        selectedFiles={allSelected}
        onSelectionChange={onSelectionChange}
      />,
    );

    // Click on header checkbox
    const headerCheckbox = screen.getByLabelText('Select all files');
    await user.click(headerCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith(new Set());
  });

  it('should disable checkboxes when disabled prop is true', () => {
    render(<FileComparisonGrid {...defaultProps} disabled />);

    const file1Checkbox = screen.getByLabelText('Select file1.xml');
    expect(file1Checkbox).toBeDisabled();
  });

  it('should not call onSelectionChange when disabled', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();

    render(<FileComparisonGrid {...defaultProps} disabled onSelectionChange={onSelectionChange} />);

    // Try to click a row
    const file2Row = screen.getByText('file2.xml (1 KB)').closest('tr');
    if (file2Row) {
      await user.click(file2Row);
    }

    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  describe('row styling', () => {
    it('should apply dimmed styling to FilesAreSame rows', () => {
      render(<FileComparisonGrid {...defaultProps} />);

      const file2Row = screen.getByText('file2.xml (1 KB)').closest('tr');
      expect(file2Row).toHaveClass('tw-opacity-50');
    });

    it('should apply warning styling to DestNewer rows', () => {
      render(<FileComparisonGrid {...defaultProps} />);

      const file5Row = screen.getByText('file5.xml (1 KB)').closest('tr');
      expect(file5Row).toHaveClass('tw-bg-muted');
    });
  });

  describe('disk info display', () => {
    it('should show "(not present)" for DestDoesNotExist', () => {
      render(<FileComparisonGrid {...defaultProps} />);

      // file1 has DestDoesNotExist state
      const file1Row = screen.getByText('file1.xml (1 KB)').closest('tr');
      expect(file1Row).toHaveTextContent('(not present)');
    });
  });

  describe('accessibility', () => {
    it('should have aria-selected on rows', () => {
      render(<FileComparisonGrid {...defaultProps} />);

      const file1Row = screen.getByText('file1.xml (1 KB)').closest('tr');
      const file2Row = screen.getByText('file2.xml (1 KB)').closest('tr');

      expect(file1Row).toHaveAttribute('aria-selected', 'true');
      expect(file2Row).toHaveAttribute('aria-selected', 'false');
    });

    it('should have aria-label on checkboxes', () => {
      render(<FileComparisonGrid {...defaultProps} />);

      expect(screen.getByLabelText('Select file1.xml')).toBeInTheDocument();
      expect(screen.getByLabelText('Select file2.xml')).toBeInTheDocument();
    });
  });
});
