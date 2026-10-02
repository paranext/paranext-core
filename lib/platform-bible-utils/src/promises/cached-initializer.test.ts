import { vi } from 'vitest';
import { createCachedInitializer } from './cached-initializer';

describe('createCachedInitializer', () => {
  it('should share one in-flight attempt across concurrent calls, resolving both callers with the same value', async () => {
    let resolveInitializer: (service: object) => void = () => {};
    const initializer = vi.fn(
      async () =>
        new Promise<object>((resolve) => {
          resolveInitializer = resolve;
        }),
    );
    const initialize = createCachedInitializer(initializer);

    const firstCall = initialize();
    const secondCall = initialize();
    const service = {};
    resolveInitializer(service);
    const [firstResult, secondResult] = await Promise.all([firstCall, secondCall]);
    expect(firstResult).toBe(service);
    expect(secondResult).toBe(service);
    expect(initializer).toHaveBeenCalledTimes(1);
  });

  it('should reject all callers awaiting a failed attempt with the same error, and retry only after it settles', async () => {
    let rejectInitializer: (error: Error) => void = () => {};
    const initializer = vi
      .fn<() => Promise<string>>()
      .mockImplementationOnce(
        () =>
          new Promise<string>((_resolve, reject) => {
            rejectInitializer = reject;
          }),
      )
      .mockResolvedValue('initialized');
    const initialize = createCachedInitializer(initializer);

    const firstCall = initialize();
    const secondCall = initialize();
    const error = new Error('transient failure');
    rejectInitializer(error);
    await expect(firstCall).rejects.toBe(error);
    await expect(secondCall).rejects.toBe(error);
    expect(initializer).toHaveBeenCalledTimes(1);

    await expect(initialize()).resolves.toBe('initialized');
    expect(initializer).toHaveBeenCalledTimes(2);
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

  it('should reject instead of throwing when the initializer throws synchronously, and retry on the next call', async () => {
    const initializer = vi
      .fn<() => Promise<string>>()
      .mockImplementationOnce(() => {
        throw new Error('synchronous failure');
      })
      .mockResolvedValue('initialized');
    const initialize = createCachedInitializer(initializer);

    await expect(initialize()).rejects.toThrow('synchronous failure');
    await expect(initialize()).resolves.toBe('initialized');
    expect(initializer).toHaveBeenCalledTimes(2);
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
