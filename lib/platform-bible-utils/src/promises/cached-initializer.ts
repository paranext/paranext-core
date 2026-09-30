/**
 * Creates a function that runs an asynchronous initializer at most once, caching the promise so
 * concurrent and subsequent calls share the same initialization attempt. If the initializer fails,
 * the cached promise is cleared so the next call starts a fresh attempt instead of failing forever
 * with the same error. This is useful for initializing access to a resource that may not be
 * available yet, like a network object owned by a process that is still starting up.
 *
 * Note that calls that awaited the failed attempt all reject with its error; only calls arriving
 * after the rejection settles retry. The initializer must therefore be safe to run again after a
 * failure, e.g. it should not leave partial registrations behind.
 *
 * @example
 *
 * ```typescript
 * const getEntryService = createCachedInitializer(async () => {
 *   await papi.networkObjectStatus.waitForNetworkObject(
 *     { id: 'lexicon.entryService' },
 *     10_000,
 *   );
 *   const service = await papi.networkObjects.get<LexiconEntryService>('lexicon.entryService');
 *   // Throw rather than return `undefined`: a resolved value is cached, a rejection is retried
 *   if (!service) throw new Error('lexicon.entryService is not available');
 *   return service;
 * });
 *
 * // One wait and one fetch, however many callers arrive while it is still in flight
 * const [service, sameService] = await Promise.all([getEntryService(), getEntryService()]);
 * ```
 *
 * @param initializer Asynchronous function that performs the initialization
 * @returns Function that returns the cached initialization promise, starting a new initialization
 *   attempt if there is no cached promise
 */
export function createCachedInitializer<T = void>(initializer: () => Promise<T>): () => Promise<T> {
  let cachedPromise: Promise<T> | undefined;
  return () => {
    // Wrap in an async IIFE so this always returns a promise: a synchronous throw from the
    // initializer becomes a rejected promise instead of throwing at the call site.
    cachedPromise ??= (async () => initializer())().catch((error) => {
      cachedPromise = undefined;
      throw error;
    });
    return cachedPromise;
  };
}
