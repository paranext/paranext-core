import { Dispose } from './disposal.model';
import { Unsubscriber, UnsubscriberAsync } from './unsubscriber';

/** Simple collection for UnsubscriberAsync objects that also provides an easy way to run them. */
export class UnsubscriberAsyncList {
  readonly unsubscribers = new Set<UnsubscriberAsync | Unsubscriber>();

  constructor(private name = 'Anonymous') {}

  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...unsubscribers: (UnsubscriberAsync | Unsubscriber | Dispose)[]) {
    unsubscribers.forEach((unsubscriber) => {
      if ('dispose' in unsubscriber)
        this.unsubscribers.add(unsubscriber.dispose.bind(unsubscriber));
      else this.unsubscribers.add(unsubscriber);
    });
  }

  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * An unsubscriber that throws (synchronously or asynchronously) does not make this method reject:
   * the error is caught and logged via `console.error`, the remaining unsubscribers still run, and
   * the thrower counts as a failure in the return value.
   *
   * @returns `true` if all unsubscribers succeeded, `false` if any returned `false` or threw.
   */
  async runAllUnsubscribers(): Promise<boolean> {
    // Each unsubscriber is invoked and awaited independently so one that throws — synchronously or
    // otherwise — cannot stop the rest from running. This list is what cleans up after a window
    // closes, which happens repeatedly once more than one window can be open rather than only once
    // at shutdown, so a single bad unsubscriber must not strand everything behind it.
    const results = await Promise.all(
      [...this.unsubscribers].map(async (unsubscriber) => {
        try {
          return await unsubscriber();
        } catch (error) {
          console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber threw! ${error}`);
          return false;
        }
      }),
    );
    this.unsubscribers.clear();
    return results.every((unsubscriberSucceeded, index) => {
      if (!unsubscriberSucceeded)
        console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${index} failed!`);

      return unsubscriberSucceeded;
    });
  }
}

export default UnsubscriberAsyncList;
