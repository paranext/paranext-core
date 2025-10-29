const defaultPromise = Promise.resolve();

/**
 * Class that allows you to chain promises for a given key. This is useful when:
 *
 * 1. You need to run promises from synchronous code and don't need to look at the results.
 * 2. The promises to run, or at least precisely when to run them, are not known in advance.
 * 3. The promises need to be run sequentially, waiting for the previous one to finish.
 *
 * An example of when this can be helpful is inside of React components. Component code is mostly
 * synchronous, but you may need to run some asynchronous code. You can't use `await` inside of
 * React component code in many situations, so you can use this class to chain promises together.
 *
 * When promises are added to the map with a key, they will run in the order they were added to the
 * map for that key. If a promise rejects, a warning will be logged and the chain will continue. If
 * a promise is added while another promise in the map for that key is running, the new promise will
 * be chained to the existing one.
 */
export class PromiseChainingMap<TKey = string> {
  private readonly map = new Map<TKey, Promise<unknown>>();
  private readonly logger: { warn: (message: string) => void };

  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(logger: { warn: (message: string) => void } = console) {
    this.logger = logger;
  }

  /**
   * Adds a promise function to the map for a given key. If a promise is already running for the
   * key, the new promise will be chained to the existing one. Once all promises for a key have
   * settled, the map will be cleared for that key.
   *
   * @param key Unique key to identify a distinct promise chain
   * @param promiseFunction Function that returns a promise to add to the chain
   */
  addPromiseFunction(key: TKey, promiseFunction: () => Promise<unknown>): void {
    const currentPromise = this.map.get(key);
    this.map.set(key, currentPromise ? currentPromise.then(promiseFunction) : promiseFunction());
    this.cleanupPromiseChain(key);
  }

  /**
   * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
   * you should just call {@link addPromiseFunction} and let the map handle the rest.
   *
   * @param key Unique key to identify a distinct promise chain
   * @returns The current promise chain for the key
   */
  get(key: TKey): Promise<unknown> | undefined {
    return this.map.get(key);
  }

  /**
   * Configures a promise chain to be removed from the map for the given key after all the promises
   * have settled
   *
   * @param key Unique key to identify a distinct promise chain
   */
  private cleanupPromiseChain(key: TKey): void {
    const currentPromise = this.map.get(key);
    if (!currentPromise) return;

    const promiseHolder: { promise: Promise<unknown> } = { promise: defaultPromise };
    const newPromise = currentPromise
      .catch((e) => this.logger.warn(`Error in promise for ${key}: ${e.message}`))
      .finally(() => {
        if (this.map.get(key) === promiseHolder.promise) this.map.delete(key);
      });
    promiseHolder.promise = newPromise;
    this.map.set(key, newPromise);
  }
}

export default PromiseChainingMap;
