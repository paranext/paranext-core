import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRegisterEngine } = vi.hoisted(() => ({
  mockRegisterEngine: vi.fn(),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: mockRegisterEngine },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

// Call handler synchronously so the engine's AsyncVariable settles before a later dispose() (in
// initialize()'s catch) can call rejectWithReason, avoiding unhandled rejections in tests.
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: {
    subscribeAllThemes: vi
      .fn()
      .mockImplementation(
        (_selector: unknown, handler: (data: Record<string, unknown>) => void) => {
          handler({});
          return Promise.resolve(() => true);
        },
      ),
  },
}));

/** Creates a minimal MediaQueryList stand-in with jest-spy addEventListener/removeEventListener */
function makeFakeMediaQuery() {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: '(prefers-color-scheme: dark)',
    onchange: undefined,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  };
}

describe('theme.service-host', () => {
  beforeEach(() => {
    // mockReset clears call history AND queued once-implementations on the shared mock
    mockRegisterEngine.mockReset();
    vi.resetModules();
    // jsdom does not implement matchMedia; stub it before the module loads (module-level code
    // calls getSystemDarkThemeMediaQuery().matches to seed the initial engine)
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation(() => makeFakeMediaQuery()),
      writable: true,
    });
  });

  it('getCurrentThemeSync returns a theme before initialize is called', async () => {
    const { localThemeService } = await import('@renderer/services/theme.service-host');

    const theme = localThemeService.getCurrentThemeSync();

    expect(theme).toBeDefined();
    expect(typeof theme).toBe('object');
  });

  describe('initialize', () => {
    it('registers the engine exactly once on the first successful call', async () => {
      mockRegisterEngine.mockResolvedValueOnce({ onDidDispose: vi.fn() });

      const { initialize } = await import('@renderer/services/theme.service-host');
      await initialize();

      expect(mockRegisterEngine).toHaveBeenCalledOnce();
    });

    it('registers a different engine instance on each attempt (fresh-engine-per-attempt invariant)', async () => {
      const registeredEngines: object[] = [];
      mockRegisterEngine
        .mockImplementationOnce(async (_name: unknown, engine: object) => {
          registeredEngines.push(engine);
          throw new Error('simulated first failure');
        })
        .mockImplementationOnce(async (_name: unknown, engine: object) => {
          registeredEngines.push(engine);
          return { onDidDispose: vi.fn() };
        });

      const { initialize } = await import('@renderer/services/theme.service-host');

      await expect(initialize()).rejects.toThrow('simulated first failure');
      await initialize();

      expect(registeredEngines).toHaveLength(2);
      expect(registeredEngines[0]).not.toBe(registeredEngines[1]);
    });

    it('disposes the engine when registerEngine fails', async () => {
      let disposeSpy: ReturnType<typeof vi.spyOn> | undefined;
      mockRegisterEngine.mockImplementationOnce(async (_name: unknown, engine: object) => {
        // Spy on dispose while we have a reference to the engine; the catch block calls
        // themeServiceEngine.dispose() (same object) after registerEngine rejects
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        disposeSpy = vi.spyOn(engine as { dispose(): Promise<boolean> }, 'dispose');
        throw new Error('simulated failure');
      });
      mockRegisterEngine.mockResolvedValue({ onDidDispose: vi.fn() });

      const { initialize } = await import('@renderer/services/theme.service-host');
      await expect(initialize()).rejects.toThrow('simulated failure');

      expect(disposeSpy).toBeDefined();
      expect(disposeSpy).toHaveBeenCalledOnce();
    });

    it('removes the system-theme change listener when registerEngine fails', async () => {
      // Use a single shared MediaQueryList so calls from both createThemeServiceEngine (module
      // load) and listenToSystemThemeChanges (inside initialize) hit the same spy object
      const fakeMediaQuery = makeFakeMediaQuery();
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: vi.fn().mockReturnValue(fakeMediaQuery),
        writable: true,
      });

      mockRegisterEngine.mockRejectedValueOnce(new Error('fail'));
      mockRegisterEngine.mockResolvedValue({ onDidDispose: vi.fn() });

      const { initialize } = await import('@renderer/services/theme.service-host');
      await expect(initialize()).rejects.toThrow('fail');

      // listenToSystemThemeChanges adds a 'change' listener; the catch block's unsubscribe removes it
      expect(fakeMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
      expect(fakeMediaQuery.removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });
  });
});
