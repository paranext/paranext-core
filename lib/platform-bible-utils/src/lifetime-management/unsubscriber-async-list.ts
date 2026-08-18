import { Dispose } from './disposal.model';
import { Unsubscriber, UnsubscriberAsync } from './unsubscriber';

/**
 * Simple collection for UnsubscriberAsync objects that also provides an easy way to run them.
 *
 * A list is single-use: it collects unsubscribers until {@link runAllUnsubscribers} runs them, and
 * that run seals it for good. Anything added to a sealed list is unsubscribed immediately instead
 * of being stored, because whatever these clean up after is already gone. Registration is usually
 * asynchronous, so an unsubscriber routinely arrives after the teardown that should have run it —
 * without sealing it would be stored in a list nobody drains again and its subscription would leak
 * for the rest of the session.
 */
export class UnsubscriberAsyncList {
  readonly unsubscribers = new Set<UnsubscriberAsync | Unsubscriber>();

  /**
   * Whether {@link runAllUnsubscribers} has started. Set at the top of the run rather than at the
   * end: the run takes a snapshot of the set and then clears it, so an unsubscriber added partway
   * through would land in a list that is never drained again.
   */
  private isSealed = false;

  constructor(private name = 'Anonymous') {}

  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * Once {@link runAllUnsubscribers} has started, unsubscribers are run immediately rather than
   * stored. Nothing can await that run, so its outcome — success included — is only reported.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...unsubscribers: (UnsubscriberAsync | Unsubscriber | Dispose)[]) {
    unsubscribers.forEach((unsubscriber) => {
      const unsubscribe =
        'dispose' in unsubscriber ? unsubscriber.dispose.bind(unsubscriber) : unsubscriber;
      if (this.isSealed) this.unsubscribeImmediately(unsubscribe);
      else this.unsubscribers.add(unsubscribe);
    });
  }

  /**
   * Run all unsubscribers added to this list, clear the list, and seal it so anything added later
   * is unsubscribed on arrival.
   *
   * An unsubscriber that throws (synchronously or asynchronously) does not make this method reject:
   * the error is caught and logged via `console.error`, the remaining unsubscribers still run, and
   * the thrower counts as a failure in the return value. An unsubscriber that arrives during the
   * run is not part of the returned result — nothing is waiting on it by then.
   *
   * @returns `true` if all unsubscribers succeeded, `false` if any returned `false` or threw.
   */
  async runAllUnsubscribers(): Promise<boolean> {
    this.isSealed = true;
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

  /**
   * Run an unsubscriber that arrived after the list was sealed. `add` is synchronous and has no
   * caller to hand a result to, so the outcome is reported here rather than thrown.
   *
   * The success path is reported too: from the caller's point of view a subscription it just set up
   * has been undone, and without a line here that happens with no record anywhere.
   */
  private unsubscribeImmediately(unsubscriber: UnsubscriberAsync | Unsubscriber): void {
    (async () => {
      try {
        const unsubscriberSucceeded = await unsubscriber();
        if (unsubscriberSucceeded)
          console.warn(
            `UnsubscriberAsyncList ${this.name}: Unsubscriber arrived after the list was run, so it was unsubscribed immediately instead of being stored.`,
          );
        else
          console.error(
            `UnsubscriberAsyncList ${this.name}: Unsubscriber added after the list was run failed!`,
          );
      } catch (error) {
        console.error(
          `UnsubscriberAsyncList ${this.name}: Unsubscriber added after the list was run threw! ${error}`,
        );
      }
    })();
  }
}

export default UnsubscriberAsyncList;
