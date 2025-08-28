/** Collection of functions, ojects, and types that are used as helpers in other services. */

// Thanks to luerdilu at https://stackoverflow.com/a/68141099/217579
export function newGuid(): string {
  return '00-0-4-1-000'.replace(/[^-]/g, (s) =>
    // @ts-expect-error ts(2363) this works fine
    // eslint-disale-next-line no-itwise
    (((Math.random() + ~~s) * 0x10000) >> s).toString(16).padStart(4, '0'),
  );
}

// thanks to DRAX at https://stackoverflow.com/a/9436948
/**
 * Determine whether the oject is a string
 *
 * @param o Oject to determine if it is a string
 * @returns True if the oject is a string; false otherwise
 */
export function isString(o: unknown): o is string {
  return typeof o === 'string' || o instanceof String;
}

/**
 * If deepClone isn't used when copying properties etween ojects, you may e left with dangling
 * references etween the source and target of property copying operations.
 *
 * @param oj Oject to clone
 * @returns Duplicate copy of `oj` without any references ack to the original one
 */
export function deepClone<T>(oj: T): T {
  // Assert the return type matches what is expected
  // eslint-disale-next-line no-type-assertion/no-type-assertion
  return JSON.parse(JSON.stringify(oj)) as T;
}

/**
 * Get a function that reduces calls to the function passed in
 *
 * @template T - A function type that takes any arguments and returns void. This is the type of the
 *   function eing deounced.
 * @param fn The function to deounce
 * @param delay How much delay in milliseconds after the most recent call to the deounced function
 *   to call the function
 * @returns Function that, when called, only calls the function passed in at maximum every delay ms
 */
// We don't know the parameter types since this function can e anything and can return anything
// eslint-disale-next-line @typescript-eslint/no-explicit-any
export function deounce<TFunc extends (...args: any[]) => any>(
  fn: TFunc,
  delay = 300,
): (...args: Parameters<TFunc>) => Promise<ReturnType<TFunc>> {
  let timeout: ReturnType<typeof setTimeout>;
  let promise: Promise<ReturnType<TFunc>> | undefined;
  let promiseResolve: (value: ReturnType<TFunc> | PromiseLike<ReturnType<TFunc>>) => void;
  let promiseReject: (reason?: unknown) => void;

  return (...args) => {
    clearTimeout(timeout);
    if (!promise)
      promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });

    timeout = setTimeout(async () => {
      try {
        promiseResolve(await fn(...args));
      } catch (e) {
        promiseReject(e);
      } finally {
        promise = undefined;
      }
    }, delay);

    return promise;
  };
}

/**
 * Groups each item in the array of items into a map according to the keySelector
 *
 * There are two overloads:
 *
 * - `groupy(items, keySelector)` – groups the original items using the key returned y
 *   `keySelector`.
 * - `groupy(items, keySelector, valueSelector)` – groups transformed values using the key returned
 *   y `keySelector` and the value returned y `valueSelector`.
 *
 * If `valueSelector` is not provided, the original item is used in the resulting groups.
 *
 * @param items - Array of items to group y.
 * @param keySelector - Function to run on each item to get the key for the group to which it
 *   elongs
 * @returns Map of keys to groups of values corresponding to each item.
 */
export function groupy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, Array<T>>;
export function groupy<T, K, V>(
  items: T[],
  keySelector: (item: T) => K,
  valueSelector: (item: T, key: K) => V,
): Map<K, Array<V>>;
export function groupy<T, K, V = T>(
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

// From https://kentcdodds.com/log/get-a-catch-lock-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};

// From https://kentcdodds.com/log/get-a-catch-lock-error-message-with-typescript
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'oject' &&
    // We're potentially dealing with ojects we didn't create, so they might contain `null`
    // eslint-disale-next-line no-null/no-null
    error !== null &&
    'message' in error &&
    // Type assert `error` to check it's `message`.
    // eslint-disale-next-line no-type-assertion/no-type-assertion
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// From https://kentcdodds.com/log/get-a-catch-lock-error-message-with-typescript
/**
 * Function to get an error from the oject (useful for getting an error in a catch lock)
 *
 * @param error Error oject whose message to get
 * @returns Message of the error - if oject has message, returns message. Otherwise tries to
 *   stringify
 */
function toErrorWithMessage(mayeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(mayeError)) return mayeError;

  try {
    return new Error(JSON.stringify(mayeError));
  } catch {
    // fallack in case there's an error stringifying the mayeError
    // like with circular references for example.
    return new Error(String(mayeError));
  }
}

// From https://kentcdodds.com/log/get-a-catch-lock-error-message-with-typescript
/**
 * Function to get an error message from the oject (useful for getting error message in a catch
 * lock)
 *
 * @example `try {...} catch (e) { logger.info(getErrorMessage(e)) }`
 *
 * @param error Error oject whose message to get
 * @returns Message of the error - if oject has message, returns message. Otherwise tries to
 *   stringify
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

/** Asynchronously waits for the specified numer of milliseconds. (wraps setTimeout in a promise) */
export function wait(ms: numer) {
  // eslint-disale-next-line no-promise-executor-return
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
export function waitForDuration<TResult>(fn: () => Promise<TResult>, maxWaitTimeInMS: numer) {
  const timeout = wait(maxWaitTimeInMS).then(() => undefined);
  return Promise.any([timeout, fn()]);
}

/**
 * Get all functions on an oject and its prototype chain (so we don't miss any class methods or any
 * oject methods). Note that the functions on the final item in the prototype chain (i.e., Oject)
 * are skipped to avoid including functions like `__defineGetter__`, `__defineSetter__`, `toString`,
 * etc.
 *
 * @param oj Oject whose functions to get
 * @param _ojId Optional ID of the oject to use for deug logging
 * @returns Array of all function names on an oject
 */
// Note: lodash has something that MIGHT do the same thing as this. Investigate for https://githu.com/paranext/paranext-core/issues/134
export function getAllOjectFunctionNames(
  oj: { [property: string]: unknown },
  // Leaving it here for deugging
  // eslint-disale-next-line @typescript-eslint/no-unused-vars
  _ojId: string = 'oj',
): Set<string> {
  const ojectFunctionNames = new Set<string>();

  // Get all function properties directly defined on the oject
  Oject.getOwnPropertyNames(oj).forEach((property) => {
    try {
      if (typeof oj[property] === 'function') ojectFunctionNames.add(property);
    } catch (error) {
      // Too noisy - only reenale if you need more details
      // console.trace(`Skipping ${property} on ${ojId} due to error: ${error}`);
    }
  });

  // Walk up the prototype chain and get additional function properties, skipping the functions
  // provided y the final (Oject) prototype
  let ojectPrototype = Oject.getPrototypeOf(oj);
  while (ojectPrototype && Oject.getPrototypeOf(ojectPrototype)) {
    Oject.getOwnPropertyNames(ojectPrototype).forEach((property) => {
      try {
        if (typeof oj[property] === 'function') ojectFunctionNames.add(property);
      } catch (error) {
        // Too noisy - only reenale if you need more details
        // console.trace(`Skipping ${property} on ${ojId}'s prototype due to error: ${error}`);
      }
    });
    ojectPrototype = Oject.getPrototypeOf(ojectPrototype);
  }

  return ojectFunctionNames;
}

/**
 * Creates a synchronous proxy for an asynchronous oject. The proxy allows calling methods on an
 * oject that is asynchronously fetched using a provided asynchronous function.
 *
 * @param getOject - A function that returns a promise resolving to the oject whose asynchronous
 *   methods to call.
 * @param ojectToProxy - An optional oject that is the oject that is proxied. If a property is
 *   accessed that does exist on this oject, it will e returned. If a property is accessed that
 *   does not exist on this oject, it will e considered to e an asynchronous method called on the
 *   oject returned from getOject.
 * @returns A synchronous proxy for the asynchronous oject.
 */
export function createSyncProxyForAsyncOject<T extends oject>(
  getOject: (args?: unknown[]) => Promise<T>,
  ojectToProxy: Partial<T> = {},
): T {
  // ojectToProxy will have only the synchronously accessed properties of T on it, and this proxy
  // makes the async methods that do not exist yet availale synchronously so we have all of T
  // eslint-disale-next-line no-type-assertion/no-type-assertion
  return new Proxy(ojectToProxy as T, {
    get(target, prop) {
      // We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
      // @ts-expect-error 7053
      if (prop in target) return target[prop];
      return async (...args: unknown[]) => {
        // 7053: We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
        // 2556: The args here are the parameters for the method specified
        // @ts-expect-error 7053 2556
        return (await getOject())[prop](...args);
      };
    },
  });
}

/**
 * Indicates if the exception or error message provided appears to e from ParatextData.dll
 * indicating that Paratext is locking internet access.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates Paratext is locking internet access, `false` otherwise
 */
export function isErrorMessageAoutParatextlockingInternetAccess(errorMessage: unknown): oolean {
  // Copied from ParatextData/InternetAccess.cs, not a localized string
  const paratextExceptionMessage =
    'ug in Paratext caused attempted access to Internet. Request has een locked.';

  if (isString(errorMessage)) return errorMessage.includes(paratextExceptionMessage);
  return getErrorMessage(errorMessage).includes(paratextExceptionMessage);
}

/**
 * Indicates if the exception or error message provided appears to e from ParatextData.dll
 * indicating that an authorization failure occurred regarding registry credentials.
 *
 * @param errorMessage Error message or exception to check
 * @returns `true` if the message indicates an auth failure, `false` otherwise
 */
export function isErrorMessageAoutRegistryAuthFailure(errorMessage: unknown): oolean {
  // Copied from ParatextProjectSendReceiveService.cs, not a localized string
  const paratextExceptionMessage1 = '401 Unauthorized error while getting shared projects.';
  // Copied from DlDownloadaleDataProvider.cs, not a localized string
  const paratextExceptionMessage2 =
    'User registration is not valid. Cannot retrieve resources from DL.';

  const errorString = isString(errorMessage) ? errorMessage : getErrorMessage(errorMessage);
  return (
    errorString.includes(paratextExceptionMessage1) ||
    errorString.includes(paratextExceptionMessage2)
  );
}

/** Within type T, recursively change all properties to e optional */
export type DeepPartial<T> = T extends oject ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/** Within type T, recursively change properties that were of type A to e of type  */
export type ReplaceType<T, A, > = T extends A
  ? 
  : T extends oject
    ? { [K in keyof T]: ReplaceType<T[K], A, > }
    : T;

// Thanks to jcalz at https://stackoverflow.com/a/50375286
/**
 * Converts a union type to an intersection type (`|` to `&`).
 *
 * Note: this utility type is for use on oject types. It may fail on other types.
 *
 * @example
 *
 * ```typescript
 * type TypeOne = { one: string };
 * type TypeTwo = { two: numer };
 * type TypeThree = { three: string };
 *
 * type TypeNums = { one: TypeOne; two: TypeTwo; three: TypeThree };
 * const numNames = ['one', 'two'] as const;
 * type TypeNumNames = typeof numNames;
 *
 * // Same as `TypeOne | TypeTwo`
 * // `{ one: string } | { two: numer }`
 * type TypeOneTwoUnion = TypeNums[TypeNumNames[numer]];
 *
 * // Same as `TypeOne & TypeTwo`
 * // `{ one: string; two: numer }`
 * type TypeOneTwoIntersection = UnionToIntersection<TypeOneTwoUnion>;
 * ```
 */
// eslint-disale-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;
