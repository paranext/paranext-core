import { Mock, vi } from 'vitest';
import { PromiseChainingMap } from './promise-chaining-map';

describe('PromiseChainingMap', () => {
  let logger: { warn: Mock };

  beforeEach(() => {
    logger = { warn: vi.fn() };
  });

  it('should handle multiple keys independently', async () => {
    const map = new PromiseChainingMap<string>(logger);
    const results: { [key: string]: number[] } = { key1: [], key2: [] };

    map.addPromiseFunction('key1', async () => {
      results.key1.push(1);
    });
    map.addPromiseFunction('key2', async () => {
      results.key2.push(2);
    });
    map.addPromiseFunction('key1', async () => {
      results.key1.push(3);
    });
    map.addPromiseFunction('key2', async () => {
      results.key2.push(4);
    });

    await Promise.all([map.get('key1'), map.get('key2')]);

    expect(results.key1).toEqual([1, 3]);
    expect(results.key2).toEqual([2, 4]);
  });

  it('should log a warning and continue chain if a promise rejects', async () => {
    const map = new PromiseChainingMap<string>(logger);
    const results: number[] = [];

    map.addPromiseFunction('key1', async () => {
      results.push(1);
    });
    map.addPromiseFunction('key1', async () => {
      throw new Error('Test error');
    });
    map.addPromiseFunction('key1', async () => {
      results.push(2);
    });

    await map.get('key1');

    expect(results).toEqual([1, 2]);
    expect(logger.warn).toHaveBeenCalledWith('Error in promise for key1: Test error');
  });

  it('should clear the map for a key after all promises have settled', async () => {
    const map = new PromiseChainingMap<string>(logger);

    map.addPromiseFunction('key1', async () => {});
    map.addPromiseFunction('key1', async () => {});

    await map.get('key1');

    expect(map.get('key1')).toBe(undefined);
  });
});
