import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import {
  setWorkspaceUpdating,
  resetWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import {
  resetProjectPickerOpen,
  setProjectPickerOpen,
} from '@renderer/services/project-picker-open-store';
import { WorkspaceUpdatingOverlay } from './overlay-workspace-updating.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%overlay_workspaceUpdating%': 'Updating workspace...',
      '%overlay_workspaceUpdating_loadingLayoutForProject%': 'Loading layout for {0}',
    },
  ]),
}));

vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
  Z_INDEX_MODAL: 500,
  cn: (...args: unknown[]) => args.filter((a) => typeof a === 'string' && a.length > 0).join(' '),
}));

describe('WorkspaceUpdatingOverlay', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
    resetProjectPickerOpen();
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

  it('renders "Loading layout for {project}" when a project name is supplied', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      setWorkspaceUpdating(true, 'My Project');
    });
    expect(screen.getByText('Loading layout for My Project')).toBeInTheDocument();
  });

  it('left-aligns when the project picker dropdown is open', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      setWorkspaceUpdating(true, 'My Project');
    });
    const status = screen.getByRole('status');
    expect(status.className).toContain('tw:items-center');
    act(() => {
      setProjectPickerOpen(true);
    });
    expect(status.className).toContain('tw:items-start');
    expect(status.className).not.toContain('tw:items-center');
  });
});
