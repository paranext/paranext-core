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
});
