import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import {
  startWorkspaceUpdate,
  resetWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { WorkspaceUpdatingOverlay } from './overlay-workspace-updating.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{ '%overlay_workspaceUpdating%': 'Updating workspace...' }]),
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
  Z_INDEX_MODAL: 500,
}));

describe('WorkspaceUpdatingOverlay', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
  });

  it('renders nothing when workspace is not updating', () => {
    const { container } = render(<WorkspaceUpdatingOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders spinner and localized text when workspace is updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(screen.getByText('Updating workspace...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('hides the overlay when workspace finishes updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    act(() => {
      release?.();
    });
    expect(screen.queryByText('Updating workspace...')).not.toBeInTheDocument();
  });

  it('insets 48px from the top in power mode, matching the tw:h-12 toolbar', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(screen.getByRole('status')).toHaveStyle({ top: '48px' });
  });

  it('insets 56px from the top in simple mode, matching the tw:h-14 toolbar', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(screen.getByRole('status')).toHaveStyle({ top: '56px' });
  });
});
