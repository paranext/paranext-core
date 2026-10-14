import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  dismissExtensionHostNotice,
  getExtensionHostNotice,
  markExtensionHostRestarted,
  markExtensionHostRestarting,
  reportExtensionHostStopped,
  resetExtensionHostStopped,
  revertExtensionHostRestart,
  subscribeToExtensionHostNotice,
} from '@renderer/services/extension-host-stopped-store';

const STOPPED_CRASHED = { phase: 'stopped', reason: 'crashed' } as const;
const STOPPED_LOST = { phase: 'stopped', reason: 'lost-connection' } as const;

describe('extension-host-stopped store', () => {
  beforeEach(() => {
    resetExtensionHostStopped();
  });

  it('starts empty', () => {
    expect(getExtensionHostNotice()).toBeUndefined();
  });

  it('remembers the reported stop and notifies subscribers', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);

    reportExtensionHostStopped({ reason: 'lost-connection' });

    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('a second report while already stopped is ignored', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'lost-connection' });

    reportExtensionHostStopped({ reason: 'crashed' });

    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('a report while restarting is ignored (the restart in flight will settle it)', () => {
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();

    reportExtensionHostStopped({ reason: 'lost-connection' });

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });
  });

  it('moves stopped → restarting → restarted, notifying each time', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });

    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });

    markExtensionHostRestarted();
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted' });
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('restarted is reachable from stopped or restarting, not from empty', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);

    markExtensionHostRestarted();
    expect(getExtensionHostNotice()).toBeUndefined();
    expect(listener).not.toHaveBeenCalled();

    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarted();
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted' });
    expect(listener).toHaveBeenCalledTimes(2);

    markExtensionHostRestarted();
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('restarting is reachable only from stopped', () => {
    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toBeUndefined();

    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();
    markExtensionHostRestarted();
    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted' });
  });

  it('a reverted restart goes back to stopped with the same reason', () => {
    reportExtensionHostStopped({ reason: 'lost-connection' });
    markExtensionHostRestarting();

    revertExtensionHostRestart();

    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
  });

  it('revert is a no-op unless restarting', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    revertExtensionHostRestart();
    reportExtensionHostStopped({ reason: 'crashed' });
    revertExtensionHostRestart();
    expect(getExtensionHostNotice()).toEqual(STOPPED_CRASHED);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  // The alarm must come back if the fresh extension host dies too.
  it('a new stop after a restart replaces the restarted state', () => {
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();
    markExtensionHostRestarted();

    reportExtensionHostStopped({ reason: 'lost-connection' });

    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
  });

  it('dismiss clears any state and notifies, and accepts a new report afterwards', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();
    markExtensionHostRestarted();

    dismissExtensionHostNotice();
    expect(getExtensionHostNotice()).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(4);

    reportExtensionHostStopped({ reason: 'lost-connection' });
    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
  });

  it('dismissing when already empty notifies nobody', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);

    dismissExtensionHostNotice();

    expect(listener).not.toHaveBeenCalled();
  });

  it('stops notifying after unsubscribe', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToExtensionHostNotice(listener);
    unsubscribe();

    reportExtensionHostStopped({ reason: 'crashed' });

    expect(listener).not.toHaveBeenCalled();
  });

  it('reset leaves subscriptions alone', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });
    resetExtensionHostStopped();

    reportExtensionHostStopped({ reason: 'crashed' });

    expect(listener).toHaveBeenCalledTimes(2);
  });
});
