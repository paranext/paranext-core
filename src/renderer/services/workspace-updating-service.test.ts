import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import { startWorkspaceUpdate } from '@renderer/services/workspace-updating-store';
import { initWorkspaceUpdatingService } from './workspace-updating-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

vi.mock('@renderer/services/workspace-updating-store', () => ({
  startWorkspaceUpdate: vi.fn(),
}));

describe('initWorkspaceUpdatingService', () => {
  let capturedWillHandler: ((event: { switchId: string }) => void) | undefined;
  let capturedDidHandler: ((event: { switchId: string }) => void) | undefined;
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
          return (cb: (event: { switchId: string }) => void) => {
            capturedWillHandler = cb;
            return willUnsub;
          };
        if (eventName === 'platformScriptureEditor.onDidSwitchProject')
          return (cb: (event: { switchId: string }) => void) => {
            capturedDidHandler = cb;
            return didUnsub;
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
  });

  it('starts a workspace update when the will-switch event fires', () => {
    vi.mocked(startWorkspaceUpdate).mockReturnValue(vi.fn());
    initWorkspaceUpdatingService();
    expect(capturedWillHandler).toBeDefined();
    if (!capturedWillHandler) throw new Error('capturedWillHandler not set');
    capturedWillHandler({ switchId: 'switch-1' });
    expect(vi.mocked(startWorkspaceUpdate)).toHaveBeenCalledTimes(1);
  });

  it('releases exactly the switch named by the did-switch event', () => {
    const release1 = vi.fn();
    const release2 = vi.fn();
    vi.mocked(startWorkspaceUpdate).mockReturnValueOnce(release1).mockReturnValueOnce(release2);
    initWorkspaceUpdatingService();
    if (!capturedWillHandler || !capturedDidHandler) throw new Error('handlers not set');
    capturedWillHandler({ switchId: 'switch-1' });
    capturedWillHandler({ switchId: 'switch-2' });
    capturedDidHandler({ switchId: 'switch-2' });
    expect(release2).toHaveBeenCalledTimes(1);
    expect(release1).not.toHaveBeenCalled();
    capturedDidHandler({ switchId: 'switch-1' });
    expect(release1).toHaveBeenCalledTimes(1);
  });

  it('ignores a did-switch event for a switch it never saw start', () => {
    const release = vi.fn();
    vi.mocked(startWorkspaceUpdate).mockReturnValue(release);
    initWorkspaceUpdatingService();
    if (!capturedWillHandler || !capturedDidHandler) throw new Error('handlers not set');
    capturedWillHandler({ switchId: 'switch-1' });
    capturedDidHandler({ switchId: 'not-a-switch' });
    expect(release).not.toHaveBeenCalled();
  });

  it('drops its release entry when the store reports the switch released, so a reused id starts fresh', () => {
    const release = vi.fn();
    let onReleased: (() => void) | undefined;
    vi.mocked(startWorkspaceUpdate).mockImplementation((onReleasedArg) => {
      onReleased = onReleasedArg;
      return release;
    });
    initWorkspaceUpdatingService();
    if (!capturedWillHandler || !capturedDidHandler) throw new Error('handlers not set');
    capturedWillHandler({ switchId: 'switch-1' });
    // The store releases the switch (e.g. its safety leash fired) and notifies the service…
    onReleased?.();
    // …so a later did-finish for it finds no entry (release itself would be a no-op anyway).
    capturedDidHandler({ switchId: 'switch-1' });
    expect(release).not.toHaveBeenCalled();
  });

  it('returns a cleanup function that unsubscribes both events', () => {
    const cleanup = initWorkspaceUpdatingService();
    cleanup();
    expect(willUnsub).toHaveBeenCalledTimes(1);
    expect(didUnsub).toHaveBeenCalledTimes(1);
  });
});
