import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  getWorkspaceUpdating,
  resetWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { initWorkspaceUpdatingService } from './workspace-updating-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

/**
 * Integration tests: real workspace-updating store driven through the service by simulated switch
 * events, under fake timers. These pin the identity pairing between a switch's leash and its own
 * finish — the two regression traces from the #2571 review (findings 1 and 2).
 */
describe('workspace updating service + store integration', () => {
  let willHandler: ((event: { switchId: string }) => void) | undefined;
  let didHandler: ((event: { switchId: string }) => void) | undefined;
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    resetWorkspaceUpdating();
    willHandler = undefined;
    didHandler = undefined;

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'platformScriptureEditor.onWillSwitchProject')
          return (cb: (event: { switchId: string }) => void) => {
            willHandler = cb;
            return vi.fn();
          };
        if (eventName === 'platformScriptureEditor.onDidSwitchProject')
          return (cb: (event: { switchId: string }) => void) => {
            didHandler = cb;
            return vi.fn();
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    cleanup = initWorkspaceUpdatingService();
  });

  afterEach(() => {
    cleanup?.();
    resetWorkspaceUpdating();
    vi.useRealTimers();
  });

  function startSwitch(switchId: string): void {
    if (!willHandler) throw new Error('will-switch handler not subscribed');
    willHandler({ switchId });
  }

  function finishSwitch(switchId: string): void {
    if (!didHandler) throw new Error('did-switch handler not subscribed');
    didHandler({ switchId });
  }

  it('keeps a live switch blocked when an older switch finishes late, after its own leash fired (review finding 1 trace)', () => {
    // A starts at t=0; B starts at t=29s.
    startSwitch('a');
    vi.advanceTimersByTime(29_000);
    startSwitch('b');

    // t=30s: A's leash fires. A is released; B is still switching.
    vi.advanceTimersByTime(1_000);
    expect(getWorkspaceUpdating()).toBe(true);

    // t=30.5s: A's real finish arrives late. It must pair with A (already released — a no-op),
    // never with B: B is still switching, so the overlay must stay up.
    vi.advanceTimersByTime(500);
    finishSwitch('a');
    expect(getWorkspaceUpdating()).toBe(true);

    // t=59s: B's own leash fires (B never finished) — now everything is released.
    vi.advanceTimersByTime(28_500);
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('releases an abandoned switch by its own leash despite ongoing switch traffic (review finding 2 trace)', () => {
    // X starts at t=0 and is abandoned — its finish never arrives.
    startSwitch('x');

    // Ordinary switches keep happening faster than the leash interval: one every 20s, each
    // finishing after 5s. Their finishes must pair with their own switch, never cancel X's leash
    // — so X's leash still fires at t=30s and the overlay is not stuck for the rest of the
    // session. (With oldest-first pairing every finish cancels the leash nearest to firing, so
    // the abandoned switch inherits an ever-newer leash and the overlay never comes down.)
    for (let i = 0; i < 30; i += 1) {
      startSwitch(`y${i}`);
      vi.advanceTimersByTime(5_000);
      finishSwitch(`y${i}`);
      vi.advanceTimersByTime(15_000);
    }

    // ~10 minutes in, nothing is switching: X was released by its own leash at t=30s and every
    // ordinary switch by its own finish.
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('pairs out-of-order finishes with their own switch', () => {
    // A starts, then B; B finishes first. Both must end up released exactly once, and the
    // overlay must stay up until A (still switching) is done.
    startSwitch('a');
    vi.advanceTimersByTime(1_000);
    startSwitch('b');
    vi.advanceTimersByTime(1_000);
    finishSwitch('b');
    expect(getWorkspaceUpdating()).toBe(true);
    finishSwitch('a');
    expect(getWorkspaceUpdating()).toBe(false);
  });

  it('ignores a finish for a switch it never saw start', () => {
    startSwitch('a');
    // A finish from before this service subscribed (or a duplicate) must not release anything.
    finishSwitch('unknown');
    expect(getWorkspaceUpdating()).toBe(true);
    finishSwitch('a');
    expect(getWorkspaceUpdating()).toBe(false);
  });
});
