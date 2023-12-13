import logger from '@shared/services/logger.service';

// Thanks to blubberdiblub at https://stackoverflow.com/a/68141099/217579
export function newGuid(): string {
  return '00-0-4-1-000'.replace(/[^-]/g, (s) =>
    // @ts-expect-error ts(2363) this works fine
    // eslint-disable-next-line no-bitwise
    (((Math.random() + ~~s) * 0x10000) >> s).toString(16).padStart(4, '0'),
  );
}

const NONCE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const NONCE_CHARS_LENGTH = NONCE_CHARS.length;
/**
 * Create a nonce that is at least 128 bits long and should be (is not currently) cryptographically
 * random. See nonce spec at https://w3c.github.io/webappsec-csp/#security-nonces
 *
 * WARNING: THIS IS NOT CURRENTLY CRYPTOGRAPHICALLY SECURE! TODO: Make this cryptographically
 * random! Use some polymorphic library that works in all contexts?
 * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues only works in browser
 */
export function newNonce(): string {
  let nonce = '';
  for (let i = 0; i < 32; i++)
    nonce += NONCE_CHARS.charAt(Math.floor(Math.random() * NONCE_CHARS_LENGTH));
  return nonce;
}

// thanks to DRAX at https://stackoverflow.com/a/9436948
/**
 * Determine whether the object is a string
 *
 * @param o Object to determine if it is a string
 * @returns True if the object is a string; false otherwise
 */
export function isString(o: unknown): o is string {
  return typeof o === 'string' || o instanceof String;
}

/**
 * Get a function that reduces calls to the function passed in
 *
 * @param fn The function to debounce
 * @param delay How much delay in milliseconds after the most recent call to the debounced function
 *   to call the function
 * @returns Function that, when called, only calls the function passed in at maximum every delay ms
 */
// We don't know the parameter types since this function can be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300): T {
  if (isString(fn)) throw new Error('Tried to debounce a string! Could be XSS');
  let timeout: ReturnType<typeof setTimeout>;
  // Ensure the right return type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return ((...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  }) as T;
}

/**
 * Groups each item in the array of items into a map according to the keySelector
 *
 * @param items Array of items to group by
 * @param keySelector Function to run on each item to get the key for the group to which it belongs
 * @param valueSelector Function to run on each item to get the value it should have in the group
 *   (like map function). If not provided, uses the item itself
 * @returns Map of keys to groups of values corresponding to each item
 */
export function groupBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, Array<T>>;
export function groupBy<T, K, V>(
  items: T[],
  keySelector: (item: T) => K,
  valueSelector: (item: T, key: K) => V,
): Map<K, Array<V>>;
export function groupBy<T, K, V = T>(
  items: T[],
  keySelector: (item: T) => K,
  valueSelector?: (item: T, key: K) => V,
): Map<K, Array<V | T>> {
  const map = new Map<K, Array<V | T>>();
  items.forEach((item) => {
    const key = keySelector(item);
    const group = map.get(key);
    const value = valueSelector ? valueSelector(item, key) : item;
    if (group) group.push(value);
    else map.set(key, [value]);
  });
  return map;
}

// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};
// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    // We're potentially dealing with objects we didn't create, so they might contain `null`
    // eslint-disable-next-line no-null/no-null
    error !== null &&
    'message' in error &&
    // Type assert `error` to check it's `message`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
/**
 * Function to get an error from the object (useful for getting an error in a catch block)
 *
 * @param error Error object whose message to get
 * @returns Message of the error - if object has message, returns message. Otherwise tries to
 *   stringify
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
/**
 * Function to get an error message from the object (useful for getting error message in a catch
 * block)
 *
 * @example `try {...} catch (e) { logger.info(getErrorMessage(e)) }`
 *
 * @param error Error object whose message to get
 * @returns Message of the error - if object has message, returns message. Otherwise tries to
 *   stringify
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

/** Asynchronously waits for the specified number of milliseconds. (wraps setTimeout in a promise) */
export function wait(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs the specified function and will timeout if it takes longer than the specified wait time
 *
 * @param fn The function to run
 * @param maxWaitTimeInMS The maximum amount of time to wait for the function to resolve
 * @returns Promise that resolves to the resolved value of the function or undefined if it ran
 *   longer than the specified wait time
 */
export function waitForDuration<TResult>(fn: () => Promise<TResult>, maxWaitTimeInMS: number) {
  const timeout = wait(maxWaitTimeInMS).then(() => undefined);
  return Promise.any([timeout, fn()]);
}

/**
 * Get all functions on an object and its prototype chain (so we don't miss any class methods or any
 * object methods). Note that the functions on the final item in the prototype chain (i.e., Object)
 * are skipped to avoid including functions like `__defineGetter__`, `__defineSetter__`, `toString`,
 * etc.
 *
 * @param obj Object whose functions to get
 * @param objId Optional ID of the object to use for debug logging
 * @returns Array of all function names on an object
 */
// Note: lodash has something that MIGHT do the same thing as this. Investigate for https://github.com/paranext/paranext-core/issues/134
export function getAllObjectFunctionNames(
  obj: { [property: string]: unknown },
  objId: string = 'obj',
): Set<string> {
  const objectFunctionNames = new Set<string>();

  // Get all function properties directly defined on the object
  Object.getOwnPropertyNames(obj).forEach((property) => {
    try {
      if (typeof obj[property] === 'function') objectFunctionNames.add(property);
    } catch (error) {
      logger.debug(`Skipping ${property} on ${objId} due to error: ${error}`);
    }
  });

  // Walk up the prototype chain and get additional function properties, skipping the functions
  // provided by the final (Object) prototype
  let objectPrototype = Object.getPrototypeOf(obj);
  while (objectPrototype && Object.getPrototypeOf(objectPrototype)) {
    Object.getOwnPropertyNames(objectPrototype).forEach((property) => {
      try {
        if (typeof obj[property] === 'function') objectFunctionNames.add(property);
      } catch (error) {
        logger.debug(`Skipping ${property} on ${objId}'s prototype due to error: ${error}`);
      }
    });
    objectPrototype = Object.getPrototypeOf(objectPrototype);
  }

  return objectFunctionNames;
}

/**
 * Run an array of promises, and either return an array of the outcomes if them all were fulfilled
 * or throw if at least one of them was rejected
 *
 * @param promises Array of promises to resolve
 * @returns Array of `PromiseSettledResult` values from each promise if all promises were fulfilled.
 *   Otherwise an exception will be thrown.
 */
export async function runPromisesAndThrowIfRejected(...promises: Promise<unknown>[]) {
  const resolutions = await Promise.allSettled(promises);
  const rejections = resolutions.filter((resolution) => resolution.status === 'rejected');
  if (rejections.length > 0) {
    const reasons = rejections.map((rejection, index) => {
      if (rejection.status !== 'rejected') return "Why doesn't TS know we already checked this?";
      return `[${index}]: ${rejection.reason}`;
    });
    throw new Error(`${reasons}`);
  }
  return resolutions;
}
