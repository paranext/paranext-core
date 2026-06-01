import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import {
  setWorkspaceUpdating,
  resetWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { WorkspaceUpdatingOverlay } from './overlay-workspace-updating.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{ '%overlay_workspaceUpdating%': 'Updating workspace...' }]),
}));

vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
  Z_INDEX_MODAL: 500,
}));

describe('WorkspaceUpdatingOverlay', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
  });

  it('renders nothing when workspace is not updating', () => {
    const { container } = render(<WorkspaceUpdatingOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders spinner and localized text when workspace is updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      setWorkspaceUpdating(true);
    });
    expect(screen.getByText('Updating workspace...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('hides the overlay when workspace finishes updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      setWorkspaceUpdating(true);
    });
    act(() => {
      setWorkspaceUpdating(false);
    });
    expect(screen.queryByText('Updating workspace...')).not.toBeInTheDocument();
  });
});
