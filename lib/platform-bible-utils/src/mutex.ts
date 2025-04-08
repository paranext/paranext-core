import { Mutex as AsyncMutex } from 'async-mutex';

// Extending Mutex from async-mutex so we can add JSDoc

/**
 * Class that allows calling asynchronous functions multiple times at once while only running one at
 * a time.
 *
 * @example
 *
 * ```typescript
 * const mutex = new Mutex();
 *
 * mutex.runExclusive(async () => {
 *   // Do some asynchronous stuff
 *   console.log('These run one-at-a-time');
 * });
 *
 * mutex.runExclusive(async () => {
 *   // Do some asynchronous stuff
 *   console.log('These run one-at-a-time');
 * });
 * ```
 *
 * See [`async-mutex`](https://www.npmjs.com/package/async-mutex) for more information.
 */
export class Mutex extends AsyncMutex {}

export default Mutex;
