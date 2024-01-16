/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;

/**
 * Returns an Unsubscriber function that combines all the unsubscribers passed in.
 *
 * @param unsubscribers All unsubscribers to aggregate into one unsubscriber
 * @returns Function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscribers = (unsubscribers: Unsubscriber[]): Unsubscriber => {
  return (...args) => {
    // Run the unsubscriber for each handler
    const unsubs = unsubscribers.map((unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return unsubs.every((success) => success);
  };
};

/**
 * Function to run to dispose of something that runs asynchronously. The promise resolves to true if
 * successfully unsubscribed
 */
export type UnsubscriberAsync = () => Promise<boolean>;

/**
 * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
 *
 * @param unsubscribers - All unsubscribers to aggregate into one unsubscriber.
 * @returns Function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscriberAsyncs = (
  unsubscribers: (UnsubscriberAsync | Unsubscriber)[],
): UnsubscriberAsync => {
  return async (...args) => {
    // Run the unsubscriber for each handler
    const unsubPromises = unsubscribers.map(async (unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return (await Promise.all(unsubPromises)).every((success) => success);
  };
};
