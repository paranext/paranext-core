import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firstRunStore from '@renderer/services/first-run-store';

vi.mock('@renderer/services/first-run-store', async (importActual) => {
  const actual = await importActual<typeof firstRunStore>();
  return { ...actual, resolveFirstRunState: vi.fn().mockResolvedValue(undefined) };
});
// Stub heavy children so the test isolates the first-run wiring.
vi.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  PlatformDockLayout: () => undefined,
}));
vi.mock('./components/platform-bible-toolbar', () => ({ PlatformBibleToolbar: () => undefined }));
vi.mock('./components/notification-display', () => ({ NotificationDisplay: () => undefined }));
vi.mock('./components/overlay-host.component', () => ({ OverlayHost: () => undefined }));
vi.mock('./components/overlays/overlay-workspace-updating.component', () => ({
  WorkspaceUpdatingOverlay: () => undefined,
}));
vi.mock('./components/first-run/first-run-overlay.component', () => ({
  FirstRunOverlay: () => <div data-testid="first-run-overlay" />,
}));
vi.mock('./services/workspace-updating-service', () => ({
  initWorkspaceUpdatingService: () => () => {},
}));

// Import App after mocks are set up so vi.mock hoisting works correctly
// eslint-disable-next-line import/first
import { App } from './app.component';

describe('App first-run wiring', () => {
  it('kicks off first-run resolution on mount', () => {
    render(<App />);
    expect(firstRunStore.resolveFirstRunState).toHaveBeenCalled();
  });

  it('renders the first-run overlay so fresh users are gated', () => {
    // Guards the actual wiring: resolveFirstRunState runs in its own effect, so asserting it was
    // called does not prove <FirstRunOverlay /> is in Main's JSX. Removing the overlay must fail.
    render(<App />);
    expect(screen.getByTestId('first-run-overlay')).toBeInTheDocument();
  });
});
