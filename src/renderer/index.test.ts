// CAP-016 (keyboard-switching) RED-phase test — renderer startup must initialize the keyboard
// service host. The `platform.keyboard` DataProvider engine (CAP-015) is renderer-hosted and is
// only constructed/registered by `keyboard.service-host`'s `initialize()`; if startup never calls
// it, `papi.keyboard` resolves nothing anywhere. The verified pattern site is the service-setup
// IIFE in index.tsx (precedent: `initializeThemeService()` / `initializeWindowService()` inside
// `runPromisesAndThrowIfRejected`).
//
// Traceability: strategic-plan-backend.md ### CAP-016 success criteria ("engine registers at
// renderer-process startup"); CAP-015 carried-over scope per the orchestrator brief.
//
// The renderer entry module is a composition root: every collaborator it starts is an external
// boundary from this test's perspective, so the whole started-service surface is mocked (plan D3
// documents the mock-count exception). The two global-this side-effect modules are mocked because
// they depend on webpack DefinePlugin globals (`webpackRenderer`) absent under vitest.

import { beforeAll, describe, expect, it, vi } from 'vitest';

const { mockKeyboardInitialize } = vi.hoisted(() => {
  // index.tsx requires a #root element before it sets up the React UI
  document.body.innerHTML = '<div id="root"></div>';
  return { mockKeyboardInitialize: vi.fn(async () => {}) };
});

vi.mock('@renderer/global-this-web-view.model', () => ({}));
vi.mock('@renderer/global-this.model', () => ({}));
vi.mock('@renderer/app.component', () => ({
  App: () => undefined,
}));
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render: vi.fn(), unmount: vi.fn() })),
}));
vi.mock('@renderer/services/dialog.service-host', () => ({
  startDialogService: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/notification.service-host', () => ({
  startNotificationService: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/overlays/overlay.service-host', () => ({
  startOverlayService: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/renderer-web-socket.service', () => ({
  blockWebSocketsToPapiNetwork: vi.fn(),
}));
vi.mock('@renderer/services/scroll-group.service-host', () => ({
  startScrollGroupService: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/theme.service-host', () => ({
  initialize: vi.fn(async () => {}),
  localThemeService: {
    subscribeCurrentTheme: vi.fn(async () => vi.fn(async () => true)),
    // applyThemeSafe try/catches, so an undefined theme stub only logs a warning
    getCurrentThemeSync: vi.fn(() => undefined),
  },
}));
vi.mock('@renderer/services/usersnap.service', () => ({
  initializeUsersnapApi: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/web-view-state.service', () => ({
  cleanupOldWebViewState: vi.fn(),
}));
vi.mock('@renderer/services/web-view.service-host', () => ({
  startWebViewService: vi.fn(async () => {}),
}));
vi.mock('@renderer/services/window.service-host', () => ({
  initialize: vi.fn(async () => {}),
}));
vi.mock('@shared/services/logger.service', () => {
  const logger = { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() };
  return { logger, default: logger };
});
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(async () => {}),
}));
vi.mock('@shared/services/shared-store.service', () => ({
  initialize: vi.fn(async () => {}),
}));
vi.mock('@shared/services/web-view-provider.service', () => ({
  webViewProviderService: { initialize: vi.fn(async () => {}) },
}));
// The pin under test: renderer startup must run the keyboard host's initialize() so the
// `platform.keyboard` engine registers at renderer-process startup
vi.mock('@renderer/services/keyboard.service-host', () => ({
  initialize: mockKeyboardInitialize,
}));

describe('renderer startup (index.tsx) — keyboard service host (CAP-016)', () => {
  beforeAll(async () => {
    // Side-effect import: evaluating the entry module runs the startup IIFE
    await import('@renderer/index');
  });

  it('invokes the keyboard service-host initialize() exactly once during service setup', async () => {
    await vi.waitFor(() => {
      expect(mockKeyboardInitialize).toHaveBeenCalledTimes(1);
    });
  });
});
