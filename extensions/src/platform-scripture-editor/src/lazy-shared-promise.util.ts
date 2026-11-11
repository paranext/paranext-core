/**
 * Creates a value on first request and shares that single creation with every caller that asks
 * while it is still in flight, so concurrent first requests cannot create it twice. A creation that
 * rejects is forgotten, so the next request tries again. `reset` forgets the value (call it when
 * disposing) and returns it if it had been created.
 *
 * A creation still in flight when `reset` runs is detached: its value is never cached, and is
 * handed to `disposeDetached` once it arrives, because nobody else holds it to dispose of later.
 * The callers already awaiting that creation then reject, because the value they would receive has
 * been disposed. The first `get` after such a `reset` waits for the detached creation and its
 * disposal to settle before it creates again, so two values are never alive at once (a value may be
 * a registration the other side rejects a second copy of).
 *
 * @param create Produces the value. Called at most once per successful creation.
 * @param disposeDetached Receives each value whose creation finished after a `reset` detached it,
 *   and may return a promise that settles when the disposal is done
 * @returns `get` to request the value, `peek` to read it without creating it, and `reset` to forget
 *   it
 */
export function createLazySharedPromise<T>(
  create: () => Promise<T>,
  disposeDetached?: (value: T) => Promise<void> | void,
): {
  /** Returns the value, creating it if needed; concurrent callers share one creation */
  get(): Promise<T>;
  /** Returns the value if it has been created, otherwise `undefined` */
  peek(): T | undefined;
  /** Forgets the value (and any creation in flight) and returns the value if it had been created */
  reset(): T | undefined;
} {
  let currentPromise: Promise<T> | undefined;
  let currentValue: T | undefined;
  let isCurrentCreated = false;
  /** Settles (never rejects) once every detached creation and its disposal are done */
  let detachedSettled: Promise<void> | undefined;

  return {
    get() {
      if (currentPromise) return currentPromise;

      const waitFor = detachedSettled;
      const promise: Promise<T> = (waitFor ? waitFor.then(create) : create()).then(
        async (value) => {
          if (currentPromise === promise) {
            currentValue = value;
            isCurrentCreated = true;
            return value;
          }
          await disposeDetached?.(value);
          throw new Error('Value was disposed before its creation finished');
        },
        (error) => {
          // A detached creation must not forget a newer creation that started after the reset
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
      if (currentPromise && !isCurrentCreated) {
        const settled = currentPromise.then(
          () => undefined,
          () => undefined,
        );
        const earlier = detachedSettled;
        const combined: Promise<void> = (
          earlier ? Promise.all([earlier, settled]) : settled
        ).finally(() => {
          if (detachedSettled === combined) detachedSettled = undefined;
        });
        detachedSettled = combined;
      }
      currentPromise = undefined;
      currentValue = undefined;
      isCurrentCreated = false;
      return previousValue;
    },
  };
}
