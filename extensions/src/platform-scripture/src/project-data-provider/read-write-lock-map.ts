import { ReadWriteLock } from './read-write-lock';

/**
 * Lazily creates and caches {@link ReadWriteLock} instances by string ID, similar to
 * {@link import('platform-bible-utils').MutexMap}.
 *
 * Call {@link dispose} when the map is no longer needed to dispose all managed locks.
 */
export class ReadWriteLockMap {
  #locks = new Map<string, ReadWriteLock>();
  #disposed = false;

  /** Whether this map has been disposed. */
  get isDisposed(): boolean {
    return this.#disposed;
  }

  /** Retrieves (or lazily creates) the {@link ReadWriteLock} for the given ID. */
  get(id: string): ReadWriteLock {
    if (this.#disposed) throw new Error('ReadWriteLockMap is disposed');

    let lock = this.#locks.get(id);
    if (!lock) {
      lock = new ReadWriteLock();
      this.#locks.set(id, lock);
    }
    return lock;
  }

  /** Disposes all managed locks, rejecting any pending waiters, and prevents further use. */
  dispose(): void {
    if (this.#disposed) return;
    this.#disposed = true;

    for (const lock of this.#locks.values()) {
      lock.dispose();
    }
    this.#locks.clear();
  }
}
