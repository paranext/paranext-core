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
const RESTARTED_CONFIRMED = { phase: 'restarted', isConfirmed: true } as const;
const RESTARTED_UNCONFIRMED = { phase: 'restarted', isConfirmed: false } as const;

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

  // While restarting, main has already seen the old process exit and silences its own requested
  // stop, so a stop arriving now can only be the new process dying before it announced its start.
  it('a report while restarting brings the alarm back with the new reason', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();

    reportExtensionHostStopped({ reason: 'lost-connection' });

    expect(getExtensionHostNotice()).toEqual(STOPPED_LOST);
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('moves stopped → restarting → restarted, notifying each time', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });

    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });

    markExtensionHostRestarted();
    expect(getExtensionHostNotice()).toEqual(RESTARTED_CONFIRMED);
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
    expect(getExtensionHostNotice()).toEqual(RESTARTED_CONFIRMED);
    expect(listener).toHaveBeenCalledTimes(2);

    markExtensionHostRestarted();
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('records a restart without a start announcement as unconfirmed', () => {
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();

    markExtensionHostRestarted(false);

    expect(getExtensionHostNotice()).toEqual(RESTARTED_UNCONFIRMED);
  });

  it('a start announcement after an unconfirmed restart confirms it', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();
    markExtensionHostRestarted(false);

    markExtensionHostRestarted();

    expect(getExtensionHostNotice()).toEqual(RESTARTED_CONFIRMED);
    expect(listener).toHaveBeenCalledTimes(4);
  });

  it('an unconfirmed restart never downgrades a confirmed one', () => {
    const listener = vi.fn();
    subscribeToExtensionHostNotice(listener);
    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarted();

    markExtensionHostRestarted(false);

    expect(getExtensionHostNotice()).toEqual(RESTARTED_CONFIRMED);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('restarting is reachable only from stopped', () => {
    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toBeUndefined();

    reportExtensionHostStopped({ reason: 'crashed' });
    markExtensionHostRestarting();
    markExtensionHostRestarted();
    markExtensionHostRestarting();
    expect(getExtensionHostNotice()).toEqual(RESTARTED_CONFIRMED);
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
