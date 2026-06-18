import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import { setWorkspaceUpdating } from '@renderer/services/workspace-updating-store';
import { initWorkspaceUpdatingService } from './workspace-updating-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

vi.mock('@renderer/services/workspace-updating-store', () => ({
  setWorkspaceUpdating: vi.fn(),
}));

describe('initWorkspaceUpdatingService', () => {
  let capturedWillHandler: (() => void) | undefined;
  let capturedDidHandler: (() => void) | undefined;
  let willUnsub: ReturnType<typeof vi.fn>;
  let didUnsub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedWillHandler = undefined;
    capturedDidHandler = undefined;
    willUnsub = vi.fn();
    didUnsub = vi.fn();

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'platformScriptureEditor.onWillSwitchProject')
          return (cb: () => void) => {
            capturedWillHandler = cb;
            return willUnsub;
          };
        if (eventName === 'platformScriptureEditor.onDidSwitchProject')
          return (cb: () => void) => {
            capturedDidHandler = cb;
            return didUnsub;
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
  });

  it('calls setWorkspaceUpdating(true) when the will-switch event fires', () => {
    initWorkspaceUpdatingService();
    expect(capturedWillHandler).toBeDefined();
    if (!capturedWillHandler) throw new Error('capturedWillHandler not set');
    capturedWillHandler();
    expect(vi.mocked(setWorkspaceUpdating)).toHaveBeenCalledWith(true);
  });

  it('calls setWorkspaceUpdating(false) when the did-switch event fires', () => {
    initWorkspaceUpdatingService();
    expect(capturedDidHandler).toBeDefined();
    if (!capturedDidHandler) throw new Error('capturedDidHandler not set');
    capturedDidHandler();
    expect(vi.mocked(setWorkspaceUpdating)).toHaveBeenCalledWith(false);
  });

  it('returns a cleanup function that unsubscribes both events', () => {
    const cleanup = initWorkspaceUpdatingService();
    cleanup();
    expect(willUnsub).toHaveBeenCalledTimes(1);
    expect(didUnsub).toHaveBeenCalledTimes(1);
  });
});
