/**
 * A simple async read-write lock for single-threaded JS (microtask-based concurrency).
 *
 * Multiple "readers" can hold the lock concurrently, but a "writer" requires exclusive access.
 * Writers are given priority: when a writer is waiting, new readers queue behind it to prevent
 * writer starvation.
 *
 * Call {@link dispose} when the lock is no longer needed to reject any pending waiters.
 */
export class ReadWriteLock {
  #readers = 0;
  #writer = false;
  #disposed = false;
  #waitQueue: Array<{
    resolve: () => void;
    reject: (reason: Error) => void;
    type: 'read' | 'write';
  }> = [];

  /** Whether this lock has been disposed. */
  get isDisposed(): boolean {
    return this.#disposed;
  }

  /** Acquire a shared read lock. Multiple readers can hold the lock concurrently. */
  async acquireRead(): Promise<() => void> {
    if (this.#disposed) throw new Error('ReadWriteLock is disposed');

    // Can proceed immediately if no writer is active and no writer is waiting in the queue
    if (!this.#writer && !this.#waitQueue.some((w) => w.type === 'write')) {
      this.#readers += 1;
    } else {
      // Must wait — a writer is active or a writer is queued ahead of us
      await new Promise<void>((resolve, reject) => {
        this.#waitQueue.push({ resolve, reject, type: 'read' });
      });
      // When resolved, #readers was already incremented by #processQueue
    }

    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.#readers -= 1;
      this.#processQueue();
    };
  }

  /** Acquire an exclusive write lock. Only one writer can hold the lock, and no readers. */
  async acquireWrite(): Promise<() => void> {
    if (this.#disposed) throw new Error('ReadWriteLock is disposed');

    if (!this.#writer && this.#readers === 0) {
      this.#writer = true;
    } else {
      await new Promise<void>((resolve, reject) => {
        this.#waitQueue.push({ resolve, reject, type: 'write' });
      });
      // When resolved, #writer was already set to true by #processQueue
    }

    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.#writer = false;
      this.#processQueue();
    };
  }

  /**
   * Disposes the lock, rejecting all pending waiters with an error. Any currently held locks can
   * still be released, but no new acquisitions are allowed.
   */
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;

    const error = new Error('ReadWriteLock was disposed while waiting to acquire');
    const queue = this.#waitQueue.splice(0);
    queue.forEach((waiter) => {
      waiter.reject(error);
    });
  }

  /** Wake up the next eligible waiter(s) from the queue. */
  #processQueue(): void {
    if (this.#waitQueue.length === 0 || this.#disposed) return;

    const next = this.#waitQueue[0];
    if (next.type === 'write') {
      // A writer can proceed only when no readers and no other writer are active
      if (this.#readers === 0 && !this.#writer) {
        this.#waitQueue.shift();
        this.#writer = true;
        next.resolve();
      }
    } else if (!this.#writer) {
      // Wake up all consecutive readers at the front of the queue (stop at the next writer)
      while (this.#waitQueue.length > 0 && this.#waitQueue[0].type === 'read') {
        // We checked that the queue is non-empty and the first element is a reader
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const reader = this.#waitQueue.shift()!;
        this.#readers += 1;
        reader.resolve();
      }
    }
  }
}
