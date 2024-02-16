import { Mutex } from 'async-mutex';

/** Map of {@link Mutex}es that automatically generates a new {@link Mutex} for any new key */
class MutexMap {
  private mutexesByID = new Map<string, Mutex>();

  get(mutexID: string): Mutex {
    let retVal = this.mutexesByID.get(mutexID);
    if (retVal) return retVal;

    retVal = new Mutex();
    this.mutexesByID.set(mutexID, retVal);
    return retVal;
  }
}

export default MutexMap;
