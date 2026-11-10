import { describe, expect, it, vi } from 'vitest';
import { createLazySharedPromise } from './lazy-shared-promise.util';

/** Minimal deferred promise so a test can settle a creation at a moment of its choosing */
function deferred<T>() {
  let resolveDeferred!: (value: T) => void;
  let rejectDeferred!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, resolve: resolveDeferred, reject: rejectDeferred };
}

describe('createLazySharedPromise', () => {
  it('creates once for concurrent get() calls and gives them the same value', async () => {
    const pending = deferred<{ id: number }>();
    const create = vi.fn(() => pending.promise);
    const lazy = createLazySharedPromise(create);

    const first = lazy.get();
    const second = lazy.get();
    const value = { id: 1 };
    pending.resolve(value);

    expect(await first).toBe(value);
    expect(await second).toBe(value);
    expect(create).toHaveBeenCalledTimes(1);
    expect(await lazy.get()).toBe(value);
    expect(create).toHaveBeenCalledTimes(1);
  });

  it('propagates a rejection to all waiting callers and retries on the next get()', async () => {
    const pending = deferred<string>();
    const create = vi.fn().mockReturnValueOnce(pending.promise).mockResolvedValueOnce('ok');
    const lazy = createLazySharedPromise<string>(create);

    const first = lazy.get();
    const second = lazy.get();
    pending.reject(new Error('boom'));

    await expect(first).rejects.toThrow('boom');
    await expect(second).rejects.toThrow('boom');
    expect(lazy.peek()).toBeUndefined();

    expect(await lazy.get()).toBe('ok');
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('peek() is undefined before creation and the value after', async () => {
    const lazy = createLazySharedPromise(async () => 'value');
    expect(lazy.peek()).toBeUndefined();
    await lazy.get();
    expect(lazy.peek()).toBe('value');
  });

  it('reset() returns the value and makes the next get() create again', async () => {
    const create = vi.fn().mockResolvedValueOnce('one').mockResolvedValueOnce('two');
    const lazy = createLazySharedPromise<string>(create);
    await lazy.get();

    expect(lazy.reset()).toBe('one');
    expect(lazy.peek()).toBeUndefined();
    expect(await lazy.get()).toBe('two');
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('reset() returns undefined when nothing has been created', () => {
    const lazy = createLazySharedPromise(async () => 'value');
    expect(lazy.reset()).toBeUndefined();
  });

  it('does not repopulate peek() when a creation resolves after reset()', async () => {
    const pending = deferred<string>();
    const lazy = createLazySharedPromise(() => pending.promise);

    const inFlight = lazy.get();
    expect(lazy.reset()).toBeUndefined();
    pending.resolve('late');
    await inFlight;

    expect(lazy.peek()).toBeUndefined();
  });

  it('hands a value whose creation finished after reset() to disposeDetached, and still to its caller', async () => {
    const pending = deferred<string>();
    const disposeDetached = vi.fn();
    const lazy = createLazySharedPromise(() => pending.promise, disposeDetached);

    const inFlight = lazy.get();
    lazy.reset();
    pending.resolve('late');

    expect(await inFlight).toBe('late');
    expect(disposeDetached).toHaveBeenCalledExactlyOnceWith('late');
  });

  it('does not call disposeDetached for a value it keeps', async () => {
    const disposeDetached = vi.fn();
    const lazy = createLazySharedPromise(async () => 'kept', disposeDetached);

    await lazy.get();
    await lazy.get();

    expect(lazy.peek()).toBe('kept');
    expect(disposeDetached).not.toHaveBeenCalled();
  });

  it('a creation rejecting after reset() does not forget the creation started since', async () => {
    const detached = deferred<string>();
    const current = deferred<string>();
    const create = vi
      .fn()
      .mockReturnValueOnce(detached.promise)
      .mockReturnValueOnce(current.promise);
    const lazy = createLazySharedPromise<string>(create);

    const first = lazy.get();
    lazy.reset();
    const second = lazy.get();
    detached.reject(new Error('stale'));
    await expect(first).rejects.toThrow('stale');

    const third = lazy.get();
    current.resolve('current');
    expect(await second).toBe('current');
    expect(await third).toBe('current');
    expect(create).toHaveBeenCalledTimes(2);
  });
});
