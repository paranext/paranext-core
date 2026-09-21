import { vi } from 'vitest';
import { createCachedInitializer } from './cached-initializer';

describe('createCachedInitializer', () => {
  it('should run the initializer only once across sequential calls', async () => {
    const initializer = vi.fn(async () => 'initialized');
    const initialize = createCachedInitializer(initializer);

    await expect(initialize()).resolves.toBe('initialized');
    await expect(initialize()).resolves.toBe('initialized');
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('should share one in-flight attempt across concurrent calls', async () => {
    let resolveInitializer = () => {};
    const initializer = vi.fn(
      async () =>
        new Promise<void>((resolve) => {
          resolveInitializer = resolve;
        }),
    );
    const initialize = createCachedInitializer(initializer);

    const firstCall = initialize();
    const secondCall = initialize();
    resolveInitializer();
    await Promise.all([firstCall, secondCall]);
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('should reject the failing call with the initializer error and retry on the next call', async () => {
    const initializer = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('transient failure'))
      .mockResolvedValue('initialized');
    const initialize = createCachedInitializer(initializer);

    await expect(initialize()).rejects.toThrow('transient failure');
    await expect(initialize()).resolves.toBe('initialized');
    expect(initializer).toHaveBeenCalledTimes(2);
  });

  it('should reject instead of throwing when the initializer throws synchronously', async () => {
    const initialize = createCachedInitializer(() => {
      throw new Error('synchronous failure');
    });

    await expect(initialize()).rejects.toThrow('synchronous failure');
  });

  it('should not retry after a successful initialization', async () => {
    const initializer = vi
      .fn<() => Promise<string>>()
      .mockResolvedValueOnce('first')
      .mockResolvedValue('second');
    const initialize = createCachedInitializer(initializer);

    await expect(initialize()).resolves.toBe('first');
    await expect(initialize()).resolves.toBe('first');
    expect(initializer).toHaveBeenCalledTimes(1);
  });
});
