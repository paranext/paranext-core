import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as resolver from './resolve-registration-validity';
import { RegistrationValidity } from './first-run.model';
import {
  getRegistrationValidity,
  publishRegistrationValidity,
  refreshRegistrationValidity,
  resetRegistrationValidityStore,
  subscribeToRegistrationValidity,
} from './registration-validity-store';

// Mock the resolver, never the command service: resolveRegistrationValidity retries 3 times with a
// 15s per-attempt timeout, so a real resolver would hang the suite on every 'unknown'.
vi.mock('./resolve-registration-validity', () => ({
  resolveRegistrationValidity: vi.fn(),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockResolveReg = vi.mocked(resolver.resolveRegistrationValidity);

/** A promise plus the handle to settle it, for pinning a probe in flight mid-test. */
function deferred<T>() {
  let resolvePromise: (value: T) => void = () => {};
  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });
  return { promise, resolve: resolvePromise };
}

beforeEach(() => {
  vi.clearAllMocks();
  resetRegistrationValidityStore();
});

describe('getRegistrationValidity', () => {
  it("starts at 'unknown' before anything has resolved", () => {
    expect(getRegistrationValidity()).toBe('unknown');
  });
});

describe('refreshRegistrationValidity', () => {
  it('publishes the resolved value and notifies subscribers', async () => {
    const listener = vi.fn();
    subscribeToRegistrationValidity(listener);
    mockResolveReg.mockResolvedValue('invalid');

    await expect(refreshRegistrationValidity()).resolves.toBe('invalid');

    expect(getRegistrationValidity()).toBe('invalid');
    expect(listener).toHaveBeenCalled();
  });

  it('shares one probe among concurrent callers', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);

    const first = refreshRegistrationValidity();
    const second = refreshRegistrationValidity();
    probe.resolve('valid');

    await expect(Promise.all([first, second])).resolves.toEqual(['valid', 'valid']);
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });

  it('joins an in-flight probe even when forced, rather than starting a second one', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);

    const unforced = refreshRegistrationValidity();
    const forced = refreshRegistrationValidity({ force: true });
    probe.resolve('invalid');

    await expect(Promise.all([unforced, forced])).resolves.toEqual(['invalid', 'invalid']);
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });

  it('reuses a settled definitive value without re-probing', async () => {
    mockResolveReg.mockResolvedValue('valid');
    await refreshRegistrationValidity();

    await expect(refreshRegistrationValidity()).resolves.toBe('valid');

    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });

  it('re-probes a settled definitive value when forced', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    await refreshRegistrationValidity();
    mockResolveReg.mockResolvedValue('valid');

    await expect(refreshRegistrationValidity({ force: true })).resolves.toBe('valid');

    expect(mockResolveReg).toHaveBeenCalledTimes(2);
    expect(getRegistrationValidity()).toBe('valid');
  });

  it("never caches 'unknown' — the next refresh probes again", async () => {
    mockResolveReg.mockResolvedValue('unknown');
    await refreshRegistrationValidity();
    mockResolveReg.mockResolvedValue('valid');

    await expect(refreshRegistrationValidity()).resolves.toBe('valid');

    expect(mockResolveReg).toHaveBeenCalledTimes(2);
  });

  it('propagates a rejection, publishes nothing, and still frees the in-flight slot', async () => {
    const listener = vi.fn();
    subscribeToRegistrationValidity(listener);
    mockResolveReg.mockRejectedValue(new Error('boom'));

    await expect(refreshRegistrationValidity()).rejects.toThrow('boom');
    expect(getRegistrationValidity()).toBe('unknown');
    expect(listener).not.toHaveBeenCalled();

    // The failed probe must not wedge the store: a later refresh probes again and succeeds.
    mockResolveReg.mockResolvedValue('valid');
    await expect(refreshRegistrationValidity()).resolves.toBe('valid');
    expect(mockResolveReg).toHaveBeenCalledTimes(2);
  });
});

describe('publishRegistrationValidity', () => {
  it('sets the value and notifies without probing', () => {
    const listener = vi.fn();
    subscribeToRegistrationValidity(listener);

    publishRegistrationValidity('invalid');

    expect(getRegistrationValidity()).toBe('invalid');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(mockResolveReg).not.toHaveBeenCalled();
  });

  it('overrides a probe result, so the first-run gate can apply its just-registered suppression', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    await refreshRegistrationValidity();

    publishRegistrationValidity('valid');

    expect(getRegistrationValidity()).toBe('valid');
    // The override is now the cached value, so an unforced refresh does not undo it.
    await expect(refreshRegistrationValidity()).resolves.toBe('valid');
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
  });
});

describe('subscribeToRegistrationValidity', () => {
  it('stops notifying after unsubscribe', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToRegistrationValidity(listener);

    publishRegistrationValidity('invalid');
    unsubscribe();
    publishRegistrationValidity('valid');

    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('resetRegistrationValidityStore', () => {
  it('stops a probe that was already running from publishing into the reset store', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);
    const stalePromise = refreshRegistrationValidity();

    // A test or story moving on resets the store while the previous probe is still in flight.
    resetRegistrationValidityStore();
    const listener = vi.fn();
    subscribeToRegistrationValidity(listener);
    probe.resolve('invalid');
    await stalePromise;

    // The orphaned answer must not leak into the fresh store, or one case would silently inherit
    // the previous case's registration state.
    expect(getRegistrationValidity()).toBe('unknown');
    expect(listener).not.toHaveBeenCalled();
  });

  it('leaves the store able to probe again after a reset mid-flight', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);
    const stalePromise = refreshRegistrationValidity();
    resetRegistrationValidityStore();
    probe.resolve('invalid');
    await stalePromise;

    mockResolveReg.mockResolvedValue('valid');
    await expect(refreshRegistrationValidity()).resolves.toBe('valid');
    expect(getRegistrationValidity()).toBe('valid');
  });
});

describe('a probe that cannot complete', () => {
  it("does not let 'unknown' erase a definitive answer", async () => {
    mockResolveReg.mockResolvedValue('invalid');
    await refreshRegistrationValidity();
    mockResolveReg.mockResolvedValue('unknown');

    // The caller still learns the probe failed...
    await expect(refreshRegistrationValidity({ force: true })).resolves.toBe('unknown');
    // ...but the reminder must not vanish because one re-check could not reach the provider.
    expect(getRegistrationValidity()).toBe('invalid');
  });

  it("still publishes 'unknown' when nothing definitive is known yet", async () => {
    mockResolveReg.mockResolvedValue('unknown');
    await refreshRegistrationValidity();
    expect(getRegistrationValidity()).toBe('unknown');
  });

  it('lets a later definitive answer replace the retained one', async () => {
    mockResolveReg.mockResolvedValue('invalid');
    await refreshRegistrationValidity();
    mockResolveReg.mockResolvedValue('unknown');
    await refreshRegistrationValidity({ force: true });
    mockResolveReg.mockResolvedValue('valid');

    await expect(refreshRegistrationValidity({ force: true })).resolves.toBe('valid');
    expect(getRegistrationValidity()).toBe('valid');
  });
});

describe('listener isolation', () => {
  it('does not reject the shared probe when a subscriber throws', async () => {
    // Unsubscribed at the end: reset deliberately keeps subscribers, so a throwing one left behind
    // would fire on every later notify in this file.
    const unsubscribe = subscribeToRegistrationValidity(() => {
      throw new Error('subscriber blew up');
    });
    mockResolveReg.mockResolvedValue('invalid');

    // The first-run gate awaits this promise; a throwing dot listener must not strand it on the
    // error screen.
    await expect(refreshRegistrationValidity()).resolves.toBe('invalid');
    expect(getRegistrationValidity()).toBe('invalid');
    unsubscribe();
  });

  it('still notifies the remaining subscribers after one throws', async () => {
    const laterListener = vi.fn();
    const unsubscribeThrower = subscribeToRegistrationValidity(() => {
      throw new Error('subscriber blew up');
    });
    const unsubscribeLater = subscribeToRegistrationValidity(laterListener);
    mockResolveReg.mockResolvedValue('valid');

    await refreshRegistrationValidity();

    expect(laterListener).toHaveBeenCalled();
    unsubscribeThrower();
    unsubscribeLater();
  });

  it('keeps subscribers across a reset so a mounted consumer is not detached', () => {
    const listener = vi.fn();
    subscribeToRegistrationValidity(listener);

    resetRegistrationValidityStore();

    expect(listener).toHaveBeenCalled();
    listener.mockClear();
    publishRegistrationValidity('invalid');
    expect(listener).toHaveBeenCalled();
  });
});

describe('a publish that lands while a probe is in flight', () => {
  it('wins over the older probe, so a just-registered decision is not undone', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);
    const pending = refreshRegistrationValidity({ force: true });

    // IdentifyStep saves successfully and publishes while the probe is still running.
    publishRegistrationValidity('valid');
    probe.resolve('invalid');
    await pending;

    // The probe started before the registration was saved, so its answer is stale by definition.
    expect(getRegistrationValidity()).toBe('valid');
  });

  it('still frees the in-flight slot, so the store keeps working afterwards', async () => {
    const probe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(probe.promise);
    const pending = refreshRegistrationValidity({ force: true });
    publishRegistrationValidity('valid');
    probe.resolve('invalid');
    await pending;

    // Guarding the cleanup on the generation instead of the slot would wedge this forever.
    mockResolveReg.mockResolvedValue('invalid');
    await expect(refreshRegistrationValidity({ force: true })).resolves.toBe('invalid');
    expect(getRegistrationValidity()).toBe('invalid');
  });

  it('does not make a forced re-check join the probe the publish disowned', async () => {
    const staleProbe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(staleProbe.promise);
    const stale = refreshRegistrationValidity();

    // The gate publishes its suppressed answer while the toolbar's mount probe is still running.
    publishRegistrationValidity('valid');

    // Opening the profile popover forces a re-check before the disowned probe has settled. Joining
    // that probe would hand back an answer the generation check then discards, so the re-check
    // would publish nothing at all — silently doing nothing.
    const freshProbe = deferred<RegistrationValidity>();
    mockResolveReg.mockReturnValue(freshProbe.promise);
    const fresh = refreshRegistrationValidity({ force: true });
    expect(mockResolveReg).toHaveBeenCalledTimes(2);

    freshProbe.resolve('invalid');
    await expect(fresh).resolves.toBe('invalid');
    expect(getRegistrationValidity()).toBe('invalid');

    // The disowned probe settling late still must not publish over the re-check's answer.
    staleProbe.resolve('valid');
    await stale;
    expect(getRegistrationValidity()).toBe('invalid');
  });
});
