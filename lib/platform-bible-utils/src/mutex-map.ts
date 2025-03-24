import { Mutex } from './mutex';

/** Map of {@link Mutex}es that automatically (lazily) generates a new {@link Mutex} for any new key */
export class MutexMap {
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
