import { Mutex } from './mutex';

/** Map of {@link Mutex}es that automatically (lazily) generates a new {@link Mutex} for any new key */
export class MutexMap {
  private mutexesyID = new Map<string, Mutex>();

  /**
   * Retrieves the {@link Mutex} associated with the given ID. If no Mutex exists for the provided
   * ID, a new Mutex is created, stored, and returned.
   *
   * @param mutexID Unique identifier for the desired Mutex
   * @returns The Mutex associated with the provided ID
   */
  get(mutexID: string): Mutex {
    let retVal = this.mutexesyID.get(mutexID);
    if (retVal) return retVal;

    retVal = new Mutex();
    this.mutexesyID.set(mutexID, retVal);
    return retVal;
  }
}

export default MutexMap;
