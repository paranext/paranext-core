import { beforeEach, describe, expect, test, vi } from 'vitest';

// The theme service host reads the OS dark-mode preference at module load, which jsdom does not
// implement, so stub it before the module under test is imported.
const mocks = vi.hoisted(() => ({
  registerEngine: vi.fn(),
  get: vi.fn(),
  subscribeAllThemes: vi.fn(async () => async () => true),
}));

vi.stubGlobal(
  'matchMedia',
  vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
);

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: mocks.registerEngine, get: mocks.get },
}));
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: { subscribeAllThemes: mocks.subscribeAllThemes },
}));

/** Minimal stand-in for a registered/consumed theme data provider */
function makeProvider() {
  const disposeCallbacks: (() => void)[] = [];
  return {
    provider: {
      onDidDispose: (callback: () => void) => {
        disposeCallbacks.push(callback);
        return () => true;
      },
    },
    /** Simulate the hosting window closing, which disposes the provider the other windows consumed */
    dispose: () => disposeCallbacks.forEach((callback) => callback()),
  };
}

// The theme is app-global — one current theme for the whole app — so exactly one renderer hosts the
// engine no matter how many windows are open. These tests cover which window ends up hosting it.
describe('theme service host across multiple windows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('the first window to start hosts the engine', async () => {
    const { provider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);
    expect(mocks.get).not.toHaveBeenCalled();
  });

  test('a later window attaches to the engine the first window already hosts', async () => {
    mocks.registerEngine.mockRejectedValue(
      new Error('Network object with id platform.themeServiceDataProvider is already registered'),
    );
    const { provider } = makeProvider();
    mocks.get.mockResolvedValue(provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    expect(mocks.get).toHaveBeenCalledTimes(1);
  });

  test('a later window takes the engine over when the hosting window closes', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    // The hosting window closes, taking its engine with it
    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);
    hosted.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));
  });

  test('surfaces the failure when there is no engine to host or attach to', async () => {
    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    mocks.get.mockResolvedValue(undefined);

    const { initialize } = await import('@renderer/services/theme.service-host');

    await expect(initialize()).rejects.toThrow('Theme service undefined');
  });
});
