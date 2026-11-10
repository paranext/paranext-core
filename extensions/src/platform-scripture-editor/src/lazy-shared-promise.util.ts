/**
 * Creates a value on first request and shares that single creation with every caller that asks
 * while it is still in flight, so concurrent first requests cannot create it twice. A creation that
 * rejects is forgotten, so the next request tries again. `reset` forgets the value (call it when
 * disposing) and returns it if it had been created.
 *
 * @param create Produces the value. Called at most once per successful creation.
 * @returns `get` to request the value, `peek` to read it without creating it, and `reset` to forget
 *   it
 */
export function createLazySharedPromise<T>(create: () => Promise<T>): {
  /** Returns the value, creating it if needed; concurrent callers share one creation */
  get(): Promise<T>;
  /** Returns the value if it has been created, otherwise `undefined` */
  peek(): T | undefined;
  /** Forgets the value (and any creation in flight) and returns the value if it had been created */
  reset(): T | undefined;
} {
  let currentPromise: Promise<T> | undefined;
  let currentValue: T | undefined;

  return {
    get() {
      if (currentPromise) return currentPromise;

      const promise = create().then(
        (value) => {
          // A reset while creating detaches this creation, so its value must not repopulate the cache
          if (currentPromise === promise) currentValue = value;
          return value;
        },
        (error) => {
          if (currentPromise === promise) currentPromise = undefined;
          throw error;
        },
      );
      currentPromise = promise;
      return promise;
    },

    peek() {
      return currentValue;
    },

    reset() {
      const previousValue = currentValue;
      currentPromise = undefined;
      currentValue = undefined;
      return previousValue;
    },
  };
}
