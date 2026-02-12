import { describe, it, expect, beforeEach } from 'vitest';
import { ReadWriteLock } from './read-write-lock';

/** Flush all pending microtasks so lock acquisitions settle */
const flushPromises = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

describe('ReadWriteLock', () => {
  let lock: ReadWriteLock;

  beforeEach(() => {
    lock = new ReadWriteLock();
  });

  // ── Basic acquisition ──

  it('should allow a single reader to acquire and release', async () => {
    const release = await lock.acquireRead();
    release();
  });

  it('should allow a single writer to acquire and release', async () => {
    const release = await lock.acquireWrite();
    release();
  });

  // ── Multiple concurrent readers ──

  it('should allow multiple concurrent readers', async () => {
    const release1 = await lock.acquireRead();
    const release2 = await lock.acquireRead();
    const release3 = await lock.acquireRead();

    // All three should have acquired without blocking
    release1();
    release2();
    release3();
  });

  // ── Writer exclusivity ──

  it('should block a second writer while the first is held', async () => {
    const release1 = await lock.acquireWrite();
    let secondAcquired = false;

    const secondWriter = lock.acquireWrite().then((release) => {
      secondAcquired = true;
      return release;
    });

    await flushPromises();
    expect(secondAcquired).toBe(false);

    release1();
    const release2 = await secondWriter;
    expect(secondAcquired).toBe(true);
    release2();
  });

  it('should block a reader while a writer is held', async () => {
    const releaseWriter = await lock.acquireWrite();
    let readerAcquired = false;

    const readerPromise = lock.acquireRead().then((release) => {
      readerAcquired = true;
      return release;
    });

    await flushPromises();
    expect(readerAcquired).toBe(false);

    releaseWriter();
    const releaseReader = await readerPromise;
    expect(readerAcquired).toBe(true);
    releaseReader();
  });

  it('should block a writer while readers are held', async () => {
    const releaseReader1 = await lock.acquireRead();
    const releaseReader2 = await lock.acquireRead();
    let writerAcquired = false;

    const writerPromise = lock.acquireWrite().then((release) => {
      writerAcquired = true;
      return release;
    });

    await flushPromises();
    expect(writerAcquired).toBe(false);

    // Release one reader — writer still can't proceed
    releaseReader1();
    await flushPromises();
    expect(writerAcquired).toBe(false);

    // Release last reader — writer should proceed
    releaseReader2();
    const releaseWriter = await writerPromise;
    expect(writerAcquired).toBe(true);
    releaseWriter();
  });

  // ── Writer priority / starvation prevention ──

  it('should give writers priority over new readers to prevent writer starvation', async () => {
    const releaseReader1 = await lock.acquireRead();
    const order: string[] = [];

    // Queue a writer
    const writerPromise = lock.acquireWrite().then((release) => {
      order.push('writer');
      return release;
    });

    await flushPromises();

    // Queue a reader AFTER the writer — should be served after the writer
    const readerPromise = lock.acquireRead().then((release) => {
      order.push('reader');
      return release;
    });

    await flushPromises();

    // Release the initial reader so the writer can proceed
    releaseReader1();
    const releaseWriter = await writerPromise;
    expect(order).toEqual(['writer']);

    // Release the writer so the queued reader can proceed
    releaseWriter();
    const releaseReader2 = await readerPromise;
    expect(order).toEqual(['writer', 'reader']);
    releaseReader2();
  });

  // ── Batch waking of readers ──

  it('should wake all consecutive queued readers at once after a writer releases', async () => {
    const releaseWriter = await lock.acquireWrite();
    const acquired: string[] = [];

    // Queue 3 readers while writer is held
    const p1 = lock.acquireRead().then((r) => {
      acquired.push('r1');
      return r;
    });
    const p2 = lock.acquireRead().then((r) => {
      acquired.push('r2');
      return r;
    });
    const p3 = lock.acquireRead().then((r) => {
      acquired.push('r3');
      return r;
    });

    await flushPromises();
    expect(acquired).toEqual([]);

    releaseWriter();
    const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
    expect(acquired).toEqual(['r1', 'r2', 'r3']);
    r1();
    r2();
    r3();
  });

  it('should wake readers only up to the next queued writer', async () => {
    const releaseWriter1 = await lock.acquireWrite();
    const order: string[] = [];

    const pR1 = lock.acquireRead().then((r) => {
      order.push('r1');
      return r;
    });
    const pW2 = lock.acquireWrite().then((r) => {
      order.push('w2');
      return r;
    });
    const pR2 = lock.acquireRead().then((r) => {
      order.push('r2');
      return r;
    });

    await flushPromises();
    expect(order).toEqual([]);

    // Release writer1 → r1 should proceed (it's before w2 in queue), but r2 is after w2
    releaseWriter1();
    const releaseR1 = await pR1;
    await flushPromises();
    expect(order).toEqual(['r1']);

    // Release r1 → w2 should proceed
    releaseR1();
    const releaseW2 = await pW2;
    await flushPromises();
    expect(order).toEqual(['r1', 'w2']);

    // Release w2 → r2 should proceed
    releaseW2();
    const releaseR2 = await pR2;
    expect(order).toEqual(['r1', 'w2', 'r2']);
    releaseR2();
  });

  // ── FIFO ordering among writers ──

  it('should serve multiple queued writers in FIFO order', async () => {
    const release1 = await lock.acquireWrite();
    const order: string[] = [];

    const p2 = lock.acquireWrite().then((r) => {
      order.push('w2');
      return r;
    });
    const p3 = lock.acquireWrite().then((r) => {
      order.push('w3');
      return r;
    });

    await flushPromises();
    expect(order).toEqual([]);

    release1();
    const r2 = await p2;
    expect(order).toEqual(['w2']);

    r2();
    const r3 = await p3;
    expect(order).toEqual(['w2', 'w3']);
    r3();
  });

  // ── Complex interleaving ──

  it('should handle reader-writer-reader-writer interleaving correctly', async () => {
    const order: string[] = [];

    // Start with a reader
    const rA = await lock.acquireRead();
    order.push('rA-acquired');

    // Queue: writer, reader, writer
    const pW1 = lock.acquireWrite().then((r) => {
      order.push('w1-acquired');
      return r;
    });
    const pR1 = lock.acquireRead().then((r) => {
      order.push('r1-acquired');
      return r;
    });
    const pW2 = lock.acquireWrite().then((r) => {
      order.push('w2-acquired');
      return r;
    });

    await flushPromises();
    expect(order).toEqual(['rA-acquired']);

    // Release initial reader → w1 should acquire
    rA();
    const rW1 = await pW1;
    expect(order).toEqual(['rA-acquired', 'w1-acquired']);

    // Release w1 → r1 should acquire (it's before w2)
    rW1();
    const rR1 = await pR1;
    await flushPromises();
    expect(order).toEqual(['rA-acquired', 'w1-acquired', 'r1-acquired']);

    // Release r1 → w2 should acquire
    rR1();
    const rW2 = await pW2;
    expect(order).toEqual(['rA-acquired', 'w1-acquired', 'r1-acquired', 'w2-acquired']);
    rW2();
  });

  // ── Release idempotency ──

  it('should not double-decrement readers on double-release', async () => {
    const release = await lock.acquireRead();
    release();
    release(); // No effect

    // Should still be able to acquire a writer (reader count is 0, not -1)
    const releaseW = await lock.acquireWrite();
    releaseW();
  });

  it('should not double-release writer flag on double-release', async () => {
    // Step 1: Acquire write lock
    const release1 = await lock.acquireWrite();

    // Step 2: Release it
    release1();

    // Step 3: Acquire a new write lock (should succeed immediately)
    const release2 = await lock.acquireWrite();

    // Step 4: Call the old release again — idempotent, must NOT free the second lock
    release1();

    // Step 5: Try to acquire another write lock — should wait because release2 is held
    let thirdAcquired = false;
    const promise3 = lock.acquireWrite().then((r) => {
      thirdAcquired = true;
      return r;
    });
    await flushPromises();
    // The stale release must not have freed the second lock
    expect(thirdAcquired).toBe(false);

    // Step 6: Release the second lock — this should unblock the third
    release2();
    const release3 = await promise3;
    expect(thirdAcquired).toBe(true);

    // Step 7: Release the final lock — lock should be fully free
    release3();
  });

  // ── Dispose ──

  it('should reject pending readers on dispose', async () => {
    const releaseWriter = await lock.acquireWrite();

    const readerPromise = lock.acquireRead();
    await flushPromises();

    lock.dispose();
    await expect(readerPromise).rejects.toThrow('disposed');

    releaseWriter();
  });

  it('should reject pending writers on dispose', async () => {
    const releaseReader = await lock.acquireRead();

    const writerPromise = lock.acquireWrite();
    await flushPromises();

    lock.dispose();
    await expect(writerPromise).rejects.toThrow('disposed');

    releaseReader();
  });

  it('should reject all pending waiters on dispose', async () => {
    const releaseWriter = await lock.acquireWrite();

    const p1 = lock.acquireRead();
    const p2 = lock.acquireWrite();
    const p3 = lock.acquireRead();
    await flushPromises();

    lock.dispose();

    await expect(p1).rejects.toThrow('disposed');
    await expect(p2).rejects.toThrow('disposed');
    await expect(p3).rejects.toThrow('disposed');

    releaseWriter();
  });

  it('should throw on acquireRead after dispose', async () => {
    lock.dispose();
    await expect(lock.acquireRead()).rejects.toThrow('disposed');
  });

  it('should throw on acquireWrite after dispose', async () => {
    lock.dispose();
    await expect(lock.acquireWrite()).rejects.toThrow('disposed');
  });

  it('should be idempotent on multiple dispose calls', async () => {
    lock.dispose();
    lock.dispose(); // No error
    expect(lock.isDisposed).toBe(true);
  });

  it('should allow releasing held locks after dispose', async () => {
    const releaseWriter = await lock.acquireWrite();
    lock.dispose();
    // Releasing after dispose should not throw
    releaseWriter();
  });

  // ── Stress / does not get stuck ──

  it('should not deadlock with alternating read-write-read-write pattern', async () => {
    const order: string[] = [];

    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      const release = await lock.acquireWrite();
      order.push(`w${i}`);
      release();

      // eslint-disable-next-line no-await-in-loop
      const releaseR = await lock.acquireRead();
      order.push(`r${i}`);
      releaseR();
    }

    expect(order).toHaveLength(20);
  });

  it('should not get stuck when many readers and writers queue concurrently', async () => {
    const acquired: string[] = [];
    const promises: Promise<void>[] = [];

    // Queue 5 reads and 5 writes in an alternating pattern
    for (let i = 0; i < 5; i++) {
      promises.push(
        lock.acquireRead().then((release) => {
          acquired.push(`r${i}`);
          release();
          return undefined;
        }),
      );
      promises.push(
        lock.acquireWrite().then((release) => {
          acquired.push(`w${i}`);
          release();
          return undefined;
        }),
      );
    }

    await Promise.all(promises);
    // All 10 operations should have completed
    expect(acquired).toHaveLength(10);
  });

  it('should complete all operations when readers hold locks for varying durations', async () => {
    const completed: string[] = [];

    const r1Promise = lock.acquireRead().then(async (release) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      completed.push('r1');
      release();
      return undefined;
    });

    const r2Promise = lock.acquireRead().then(async (release) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
      completed.push('r2');
      release();
      return undefined;
    });

    const wPromise = lock.acquireWrite().then(async (release) => {
      completed.push('w1');
      release();
      return undefined;
    });

    const r3Promise = lock.acquireRead().then(async (release) => {
      completed.push('r3');
      release();
      return undefined;
    });

    await Promise.all([r1Promise, r2Promise, wPromise, r3Promise]);
    expect(completed).toHaveLength(4);
    // Writer should come after both initial readers
    const wIndex = completed.indexOf('w1');
    expect(wIndex).toBeGreaterThan(completed.indexOf('r1'));
    expect(wIndex).toBeGreaterThan(completed.indexOf('r2'));
  });
});
