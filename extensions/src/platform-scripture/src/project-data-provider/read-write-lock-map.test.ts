import { describe, it, expect, beforeEach } from 'vitest';
import { ReadWriteLockMap } from './read-write-lock-map';

describe('ReadWriteLockMap', () => {
  let map: ReadWriteLockMap;

  beforeEach(() => {
    map = new ReadWriteLockMap();
  });

  it('should return a ReadWriteLock for a new key', () => {
    const lock = map.get('a');
    expect(lock).toBeDefined();
  });

  it('should return the same lock instance for the same key', () => {
    const lock1 = map.get('a');
    const lock2 = map.get('a');
    expect(lock1).toBe(lock2);
  });

  it('should return different lock instances for different keys', () => {
    const lock1 = map.get('a');
    const lock2 = map.get('b');
    expect(lock1).not.toBe(lock2);
  });

  it('should allow independent locking across different keys', async () => {
    const releaseA = await map.get('a').acquireWrite();
    // Should not block — different key
    const releaseB = await map.get('b').acquireWrite();

    releaseA();
    releaseB();
  });

  it('should throw on get after dispose', () => {
    map.dispose();
    expect(() => map.get('x')).toThrow('disposed');
  });

  it('should dispose all managed locks', async () => {
    const lockA = map.get('a');
    const lockB = map.get('b');

    map.dispose();

    expect(lockA.isDisposed).toBe(true);
    expect(lockB.isDisposed).toBe(true);
  });

  it('should reject pending waiters inside managed locks on dispose', async () => {
    const lock = map.get('a');
    const releaseWriter = await lock.acquireWrite();

    const readerPromise = lock.acquireRead();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    map.dispose();
    await expect(readerPromise).rejects.toThrow('disposed');

    releaseWriter();
  });

  it('should be idempotent on multiple dispose calls', () => {
    map.dispose();
    map.dispose(); // No error
    expect(map.isDisposed).toBe(true);
  });
});
