// CAP-016 (keyboard-switching) renderer-startup pins. The `platform.keyboard` DataProvider engine
// (CAP-015) is renderer-hosted and is only constructed/registered by `keyboard.service-host`'s
// `initialize()`; if startup never calls it, `papi.keyboard` resolves nothing anywhere. The
// verified pattern site is the service-setup IIFE in index.tsx.
//
// REGRESSION pins (macOS CI run 27387350089 — e2e "toggle theme via toolbar button"): keyboard
// init awaits the C# `platform.osKeyboard` provider, which can take many seconds to register.
// Keyboard switching is non-critical: its init must NOT delay or break the critical startup path —
// specifically the theme-update subscription that runs after the blocking service block. These
// tests pin that startup completes (theme subscription attaches) even when keyboard init never
// resolves, and that a keyboard init rejection degrades to a warning instead of killing startup.
//
// Traceability: strategic-plan-backend.md ### CAP-016 success criteria ("engine registers at
// renderer-process startup"); fix plan implementer-CAP-016-fix-startup-blocking.md.
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

/** The current (post-`vi.resetModules`) mocked theme service instance from the module registry. */
async function getMockedLocalThemeService() {
  const { localThemeService } = await import('@renderer/services/theme.service-host');
  return localThemeService;
}

describe('renderer startup (index.tsx) — keyboard service host (CAP-016)', () => {
  describe('while keyboard init is pending on the slow C# osKeyboard provider', () => {
    beforeAll(async () => {
      // Simulate the CI failure mode: the keyboard host awaits `platform.osKeyboard` registration
      // from the C# process, so its initialize() promise stays pending indefinitely
      mockKeyboardInitialize.mockImplementation(() => new Promise(() => {}));
      // Side-effect import: evaluating the entry module runs the startup IIFE
      await import('@renderer/index');
    });

    it('invokes the keyboard service-host initialize() exactly once during service setup', async () => {
      await vi.waitFor(() => {
        expect(mockKeyboardInitialize).toHaveBeenCalledTimes(1);
      });
    });

    it('REGRESSION: still attaches the theme subscription — keyboard init must not block startup', async () => {
      const localThemeService = await getMockedLocalThemeService();
      // The keyboard init promise above NEVER settles, so this only passes when startup does not
      // gate the critical path (theme subscription) on the keyboard service
      await vi.waitFor(() => {
        expect(localThemeService.subscribeCurrentTheme).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when keyboard init rejects', () => {
    beforeAll(async () => {
      // Fresh module registry so the entry module's IIFE runs again. Mock-factory results are
      // CACHED across resetModules (the same spy instances serve both evaluations), so clear the
      // shared spies this describe asserts on before re-importing
      vi.resetModules();
      document.body.innerHTML = '<div id="root"></div>';
      const localThemeService = await getMockedLocalThemeService();
      vi.mocked(localThemeService.subscribeCurrentTheme).mockClear();
      const { logger } = await import('@shared/services/logger.service');
      vi.mocked(logger.warn).mockClear();
      vi.mocked(logger.error).mockClear();
      mockKeyboardInitialize.mockReset();
      mockKeyboardInitialize.mockImplementation(async () => {
        throw new Error('osKeyboard provider unavailable');
      });
      await import('@renderer/index');
    });

    it('REGRESSION: startup completes and the failure degrades to a warning, not a startup error', async () => {
      const localThemeService = await getMockedLocalThemeService();
      const { logger } = await import('@shared/services/logger.service');

      // The critical path still completes: the theme subscription attaches despite the rejection
      await vi.waitFor(() => {
        expect(localThemeService.subscribeCurrentTheme).toHaveBeenCalledTimes(1);
      });

      // The keyboard failure is logged as a graceful-degradation warning naming the cause...
      await vi.waitFor(() => {
        expect(logger.warn).toHaveBeenCalledWith(
          expect.stringContaining('osKeyboard provider unavailable'),
        );
      });
      // ...and never as the IIFE's startup-killing "Service(s) failed to initialize!" error
      expect(logger.error).not.toHaveBeenCalledWith(
        expect.stringContaining('Service(s) failed to initialize'),
      );
    });
  });
});
