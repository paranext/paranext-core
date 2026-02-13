import { Mutex } from './mutex';

/** Map of {@link Mutex}es that automatically (lazily) generates a new {@link Mutex} for any new key */
export class MutexMap {
  private mutexesByID = new Map<string, Mutex>();

  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(mutexID: string): Mutex {
    let retVal = this.mutexesByID.get(mutexID);
    if (retVal) return retVal;

    retVal = new Mutex();
    this.mutexesByID.set(mutexID, retVal);
    return retVal;
  }

  /**
   * Disposes of this MutexMap by canceling all pending operations on all mutexes and clearing the
   * map. After disposal, the MutexMap should not be used.
   */
  dispose(): void {
    // Cancel all pending operations on all mutexes
    this.mutexesByID.forEach((mutex) => {
      mutex.cancel();
    });

    // Clear the map
    this.mutexesByID.clear();
  }
}

export default MutexMap;
