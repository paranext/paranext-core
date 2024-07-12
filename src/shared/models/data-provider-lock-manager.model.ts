import { AsyncVariable, Mutex } from 'platform-bible-utils';
import { DataProviderLock } from '@shared/models/data-provider.model';
import logger from '@shared/services/logger.service';

export default class DataProviderLockManager {
  private readonly dataProviderName: string;
  private readonly asyncVariableQueue: AsyncVariable<DataProviderLock>[] = [];
  private readonly mutex = new Mutex();
  private lastCompletedLockId: number = 0;
  private activeDataProviderLock: DataProviderLock | undefined;

  constructor(dataProviderName: string) {
    this.dataProviderName = dataProviderName;
  }

  /**
   * Get a promise to a lock. If another lock is active when this is called, the returned promise
   * will resolve when either the active lock is released or the timeout period elapses. Note that
   * successive calls to `obtainLock` will queue, so requests are handled FIFO.
   *
   * @param timeoutInMilliseconds Milliseconds to wait before rejecting the returned promise to a
   *   lock. Use -1 if you do not want a timeout at all.
   * @returns Promise to a {@link DataProviderLock} that will be the active lock. The lock must be
   *   released before another lock can be obtained.
   */
  async obtainLock(timeoutInMilliseconds: number): Promise<DataProviderLock> {
    const description = `dataProviderLock for ${this.dataProviderName}`;
    const retVal = new AsyncVariable<DataProviderLock>(description, timeoutInMilliseconds);
    this.asyncVariableQueue.push(retVal);
    // Using "catch" because I want to let this run in the background and not "await" here
    this.processQueue().catch((err) =>
      logger.error(`Error obtaining ${description}: ${JSON.stringify(err)}`),
    );
    return retVal.promise;
  }

  /**
   * Release a lock previously obtained by {@link obtainLock}
   *
   * @param lock Lock to be released
   * @returns True if the lock was recognized as the active lock and released. False if the lock was
   *   not recognized as the active lock.
   */
  releaseLock(lock: DataProviderLock): boolean {
    if (!this.activeDataProviderLock) {
      logger.warn(`Releasing lock for ${this.dataProviderName} when there was no active lock`);
      return false;
    }

    if (!this.isActiveLock(lock)) {
      logger.warn(
        `Releasing mismatched lock for ${this.dataProviderName}: active = ${JSON.stringify(this.activeDataProviderLock)}, mismatched = ${JSON.stringify(lock)}`,
      );
      return false;
    }

    this.lastCompletedLockId = this.activeDataProviderLock.id;
    this.activeDataProviderLock = undefined;

    // Using "catch" because I want to let this run in the background and not "await" here
    this.processQueue().catch((err) =>
      logger.error(`Error processing queue for ${this.dataProviderName}: ${JSON.stringify(err)}`),
    );
    return true;
  }

  /**
   * Gets the most recently released lock ID
   *
   * @returns ID of the most recent lock that was successfully released by {@link releaseLock}
   */
  mostRecentlyReleasedLockId(): number {
    return this.lastCompletedLockId;
  }

  /**
   * Indicates if the provided {@link DataProviderLock} is equal to the active lock
   *
   * @param lock Object to compare against the active lock
   * @returns True if @param lock is the active lock, false otherwise
   */
  isActiveLock(lock: DataProviderLock): boolean {
    return (
      !!this.activeDataProviderLock &&
      this.activeDataProviderLock.id === lock.id &&
      this.activeDataProviderLock.weakSecret === lock.weakSecret
    );
  }

  private async processQueue(): Promise<void> {
    return this.mutex.runExclusive(() => {
      // There is nothing to process if there is still an active lock. Wait for it to be released.
      if (this.activeDataProviderLock) return;

      while (this.asyncVariableQueue.length > 0) {
        const nextAsyncVariable = this.asyncVariableQueue.shift();
        if (!nextAsyncVariable) return;

        this.activeDataProviderLock = {
          id: this.lastCompletedLockId + 1,
          weakSecret: Math.random(),
        };
        try {
          nextAsyncVariable.resolveToValue(this.activeDataProviderLock, true);
          return;
        } catch (error) {
          // This async variable already timed out, so keep going through the queue
          this.activeDataProviderLock = undefined;
        }
      }
    });
  }
}
