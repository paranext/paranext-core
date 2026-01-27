import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AdvancedTab, AdvancedTabProps } from './advanced-tab.component';

// Mock @papi/frontend
vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: vi.fn() },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// Mock @papi/frontend/react
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

const defaultProps: AdvancedTabProps = {
  normalization: 'NFC',
  onNormalizationChange: vi.fn(),
  usfmVersion: 3,
  onUsfmVersionChange: vi.fn(),
  isNewProject: true,
};

function renderAdvancedTab(overrides: Partial<AdvancedTabProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  return { ...render(<AdvancedTab {...props} />), props };
}

describe('AdvancedTab', () => {
  it('renders normalization radio group', () => {
    renderAdvancedTab();
    expect(screen.getByLabelText(/off/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/composed characters \(nfc\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/decomposed characters \(nfd\)/i)).toBeInTheDocument();
  });

  it('has NFC selected by default', () => {
    renderAdvancedTab();
    const nfcRadio = screen.getByLabelText(/composed characters \(nfc\)/i);
    expect(nfcRadio).toBeInTheDocument();
  });

  it('renders USFM version select', () => {
    renderAdvancedTab();
    expect(screen.getByLabelText(/usfm version/i)).toBeInTheDocument();
  });

  it('calls onNormalizationChange when radio is clicked', () => {
    const onNormalizationChange = vi.fn();
    renderAdvancedTab({ onNormalizationChange });
    fireEvent.click(screen.getByLabelText(/off/i));
    expect(onNormalizationChange).toHaveBeenCalledWith('Undefined');
  });

  it('shows read-only message in edit mode', () => {
    renderAdvancedTab({ isNewProject: false });
    expect(
      screen.getByText(/normalization cannot be changed for existing projects/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/usfm version cannot be changed for existing projects/i),
    ).toBeInTheDocument();
  });

  it('does not show read-only message in new mode', () => {
    renderAdvancedTab({ isNewProject: true });
    expect(
      screen.queryByText(/normalization cannot be changed for existing projects/i),
    ).not.toBeInTheDocument();
  });

  // GAP-005: USFM version upgrade warning
  it('shows upgrade warning when USFM version changes from 2 to 3 in edit mode', () => {
    const onUsfmVersionChange = vi.fn();
    const { rerender } = render(
      <AdvancedTab
        {...defaultProps}
        isNewProject={false}
        usfmVersion={2}
        onUsfmVersionChange={onUsfmVersionChange}
      />,
    );

    // Initially no warning (still on version 2)
    expect(screen.queryByText(/upgrading to usfm 3 is a one-way change/i)).not.toBeInTheDocument();

    // Simulate parent changing usfmVersion to 3
    rerender(
      <AdvancedTab
        {...defaultProps}
        isNewProject={false}
        usfmVersion={3}
        onUsfmVersionChange={onUsfmVersionChange}
      />,
    );

    expect(screen.getByText(/upgrading to usfm 3 is a one-way change/i)).toBeInTheDocument();
  });

  it('does not show upgrade warning in new project mode', () => {
    renderAdvancedTab({ isNewProject: true, usfmVersion: 3 });
    expect(screen.queryByText(/upgrading to usfm 3 is a one-way change/i)).not.toBeInTheDocument();
  });

  // GAP-006: Read-only display fields
  it('shows read-only display fields in edit mode', () => {
    renderAdvancedTab({
      isNewProject: false,
      typicalFileName: '41MATproject.SFM',
      stylesheetName: 'usfm.sty',
      textEncodingName: 'UTF-8',
    });

    expect(screen.getByText('File Name Form')).toBeInTheDocument();
    expect(screen.getByText('41MATproject.SFM')).toBeInTheDocument();
    expect(screen.getByText('Stylesheet Name')).toBeInTheDocument();
    expect(screen.getByText('usfm.sty')).toBeInTheDocument();
    expect(screen.getByText('Text Encoding')).toBeInTheDocument();
    expect(screen.getByText('UTF-8')).toBeInTheDocument();
  });

  it('does not show display fields in new project mode', () => {
    renderAdvancedTab({
      isNewProject: true,
      typicalFileName: '41MATproject.SFM',
      stylesheetName: 'usfm.sty',
      textEncodingName: 'UTF-8',
    });

    expect(screen.queryByText('File Name Form')).not.toBeInTheDocument();
    expect(screen.queryByText('Stylesheet Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Text Encoding')).not.toBeInTheDocument();
  });
});
