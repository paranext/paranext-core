/** Collection of functions, objects, and types that are used as helpers in other services. */

// Thanks to blubberdiblub at https://stackoverflow.com/a/68141099/217579
export function newGuid(): string {
  return '00-0-4-1-000'.replace(/[^-]/g, (s) =>
    // @ts-expect-error ts(2363) this works fine
    // eslint-disable-next-line no-bitwise
    (((Math.random() + ~~s) * 0x10000) >> s).toString(16).padStart(4, '0'),
  );
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
 * If deepClone isn't used when copying properties between objects, you may be left with dangling
 * references between the source and target of property copying operations.
 *
 * @param obj Object to clone
 * @returns Duplicate copy of `obj` without any references back to the original one
 */
export function deepClone<T>(obj: T): T {
  // Assert the return type matches what is expected
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return JSON.parse(JSON.stringify(obj)) as T;
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
 * @param _objId Optional ID of the object to use for debug logging
 * @returns Array of all function names on an object
 */
// Note: lodash has something that MIGHT do the same thing as this. Investigate for https://github.com/paranext/paranext-core/issues/134
export function getAllObjectFunctionNames(
  obj: { [property: string]: unknown },
  // Leaving it here for debugging
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _objId: string = 'obj',
): Set<string> {
  const objectFunctionNames = new Set<string>();

  // Get all function properties directly defined on the object
  Object.getOwnPropertyNames(obj).forEach((property) => {
    try {
      if (typeof obj[property] === 'function') objectFunctionNames.add(property);
    } catch (error) {
      // Too noisy - only reenable if you need more details
      // console.trace(`Skipping ${property} on ${objId} due to error: ${error}`);
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
        // Too noisy - only reenable if you need more details
        // console.trace(`Skipping ${property} on ${objId}'s prototype due to error: ${error}`);
      }
    });
    objectPrototype = Object.getPrototypeOf(objectPrototype);
  }

  return objectFunctionNames;
}

/**
 * Creates a synchronous proxy for an asynchronous object. The proxy allows calling methods on an
 * object that is asynchronously fetched using a provided asynchronous function.
 *
 * @param getObject - A function that returns a promise resolving to the object whose asynchronous
 *   methods to call.
 * @param objectToProxy - An optional object that is the object that is proxied. If a property is
 *   accessed that does exist on this object, it will be returned. If a property is accessed that
 *   does not exist on this object, it will be considered to be an asynchronous method called on the
 *   object returned from getObject.
 * @returns A synchronous proxy for the asynchronous object.
 */
export function createSyncProxyForAsyncObject<T extends object>(
  getObject: (args?: unknown[]) => Promise<T>,
  objectToProxy: Partial<T> = {},
): T {
  // objectToProxy will have only the synchronously accessed properties of T on it, and this proxy
  // makes the async methods that do not exist yet available synchronously so we have all of T
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return new Proxy(objectToProxy as T, {
    get(target, prop) {
      // We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
      // @ts-expect-error 7053
      if (prop in target) return target[prop];
      return async (...args: unknown[]) => {
        // 7053: We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
        // 2556: The args here are the parameters for the method specified
        // @ts-expect-error 7053 2556
        return (await getObject())[prop](...args);
      };
    },
  });
}

/**
 * Indicates if the exception or error message provided appears to be from ParatextData.dll
 * indicating that Paratext is blocking internet access.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates Paratext is blocking internet access, `false` otherwise
 */
export function isErrorMessageAboutParatextBlockingInternetAccess(errorMessage: unknown): boolean {
  // Copied from ParatextData/InternetAccess.cs, not a localized string
  const paratextExceptionMessage =
    'Bug in Paratext caused attempted access to Internet. Request has been blocked.';

  if (isString(errorMessage)) return errorMessage.includes(paratextExceptionMessage);
  return getErrorMessage(errorMessage).includes(paratextExceptionMessage);
}

/**
 * Indicates if the exception or error message provided appears to be from ParatextData.dll
 * indicating that an authorization failure occurred regarding registry credentials.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates an auth failure, `false` otherwise
 */
export function isErrorMessageAboutRegistryAuthFailure(errorMessage: unknown): boolean {
  // Copied from ParatextProjectSendReceiveService.cs, not a localized string
  const paratextExceptionMessage1 = '401 Unauthorized error while getting shared projects.';
  // Copied from DblDownloadableDataProvider.cs, not a localized string
  const paratextExceptionMessage2 =
    'User registration is not valid. Cannot retrieve resources from DBL.';

  const errorString = isString(errorMessage) ? errorMessage : getErrorMessage(errorMessage);
  return (
    errorString.includes(paratextExceptionMessage1) ||
    errorString.includes(paratextExceptionMessage2)
  );
}

/** Within type T, recursively change all properties to be optional */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/** Within type T, recursively change properties that were of type A to be of type B */
export type ReplaceType<T, A, B> = T extends A
  ? B
  : T extends object
    ? { [K in keyof T]: ReplaceType<T[K], A, B> }
    : T;

// Thanks to jcalz at https://stackoverflow.com/a/50375286
/**
 * Converts a union type to an intersection type (`|` to `&`).
 *
 * Note: this utility type is for use on object types. It may fail on other types.
 *
 * @example
 *
 * ```typescript
 * type TypeOne = { one: string };
 * type TypeTwo = { two: number };
 * type TypeThree = { three: string };
 *
 * type TypeNums = { one: TypeOne; two: TypeTwo; three: TypeThree };
 * const numNames = ['one', 'two'] as const;
 * type TypeNumNames = typeof numNames;
 *
 * // Same as `TypeOne | TypeTwo`
 * // `{ one: string } | { two: number }`
 * type TypeOneTwoUnion = TypeNums[TypeNumNames[number]];
 *
 * // Same as `TypeOne & TypeTwo`
 * // `{ one: string; two: number }`
 * type TypeOneTwoIntersection = UnionToIntersection<TypeOneTwoUnion>;
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;
