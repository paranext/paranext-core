import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as firstRunStore from '@renderer/services/first-run-store';

vi.mock('@renderer/services/first-run-store', async (importActual) => {
  const actual = await importActual<typeof firstRunStore>();
  return { ...actual, resolveFirstRunState: vi.fn().mockResolvedValue(undefined) };
});
// Stub heavy children so the test isolates the first-run wiring.
vi.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  PlatformDockLayout: () => null,
}));
vi.mock('./components/platform-bible-toolbar', () => ({ PlatformBibleToolbar: () => null }));
vi.mock('./components/notification-display', () => ({ NotificationDisplay: () => null }));
vi.mock('./components/overlay-host.component', () => ({ OverlayHost: () => null }));
vi.mock('./components/overlays/overlay-workspace-updating.component', () => ({
  WorkspaceUpdatingOverlay: () => null,
}));
vi.mock('./components/first-run/first-run-overlay.component', () => ({
  FirstRunOverlay: () => null,
}));
vi.mock('./services/workspace-updating-service', () => ({
  initWorkspaceUpdatingService: () => () => {},
}));

// eslint-disable-next-line import/first
import App from './app.component';

describe('App first-run wiring', () => {
  it('kicks off first-run resolution on mount', () => {
    render(<App />);
    expect(firstRunStore.resolveFirstRunState).toHaveBeenCalled();
  });
});
