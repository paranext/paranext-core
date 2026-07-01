import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRegisterEngine } = vi.hoisted(() => ({
  mockRegisterEngine: vi.fn(),
}));

// detectFocus() calls getDockLayout().getTabInfoByElement; stub the dock layout so the engine
// constructor's async initial-focus detection resolves without error. Don't clear this mock with
// vi.restoreAllMocks(): the constructor's #setDetectFocusInternal() floating promise can run after
// the test, and a cleared mock would resolve to undefined and throw.
vi.mock('@renderer/services/web-view.service-host', () => ({
  getDockLayout: vi.fn().mockResolvedValue({
    focusTab: vi.fn(),
    getTabInfoByDirectionFromTab: vi.fn().mockReturnValue(undefined),
    getTabInfoByElement: vi.fn().mockReturnValue(undefined),
    getTabInfoById: vi.fn().mockReturnValue(undefined),
  }),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: mockRegisterEngine },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

describe('window.service-host initialize', () => {
  beforeEach(() => {
    mockRegisterEngine.mockReset();
    vi.resetModules();
  });

  it('disposes the engine on registerEngine failure, removing window focus listeners', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    try {
      mockRegisterEngine.mockRejectedValueOnce(new Error('simulated failure'));

      const { initialize } = await import('@renderer/services/window.service-host');
      await expect(initialize()).rejects.toThrow('simulated failure');

      // The engine constructor adds focusin/focusout listeners; dispose() removes them
      expect(addSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });

  it('succeeds on retry after a failed attempt', async () => {
    mockRegisterEngine.mockRejectedValueOnce(new Error('first failure')).mockResolvedValueOnce({});

    const { initialize } = await import('@renderer/services/window.service-host');

    await expect(initialize()).rejects.toThrow('first failure');
    await initialize();

    expect(mockRegisterEngine).toHaveBeenCalledTimes(2);
  });
});
