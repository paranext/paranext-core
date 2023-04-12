// There is a React version 'fast-deep-equal/react' that I think allows comparing refs
// (which have circular references in particular places that this library would ignore).
// Maybe we can change to that version sometime if needed.
import equal from 'fast-deep-equal';

// #region Unsubscriber stuff

/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;

/** Object containing both a function to run to dispose of something and a promise that resolves when that thing is done subscribing */
export type UnsubPromise<T = unknown> = {
  /** Promise that resolves when done registering */
  promise: Promise<T>;
  /** Unsubscriber function that unregisters */
  unsubscriber: Unsubscriber;
};

/**
 * Returns an Unsubscriber function that combines all the unsubscribers passed in.
 * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
 * @returns function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscribers = (unsubscribers: Unsubscriber[]): Unsubscriber => {
  return () => {
    // Run the unsubscriber for each handler
    const unsubs = unsubscribers.map((unsubscriber) => unsubscriber());

    // If any of the unsubscribers resolves to false, we did not succeed
    return !unsubs.includes(false);
  };
};

/** Function to run to dispose of something that runs asynchronously. The promise resolves to true if successfully unsubscribed */
export type UnsubscriberAsync = () => Promise<boolean>;

/** Object containing both a function to run to dispose of something and a promise that resolves when that thing is done subscribing */
export type UnsubPromiseAsync<T = unknown> = {
  /** Promise that resolves when done registering */
  promise: Promise<T>;
  /** Unsubscriber function that unregisters */
  unsubscriber: UnsubscriberAsync;
};

/**
 * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
 * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
 * @returns function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscriberAsyncs = (
  unsubscribers: UnsubscriberAsync[],
): UnsubscriberAsync => {
  return async () => {
    // Run the unsubscriber for each handler
    const unsubPromises = unsubscribers.map((unsubscriber) => unsubscriber());

    // If any of the unsubscribers resolves to false, we did not succeed
    // TODO: make a util function to tune up this Promise.all so they all resolve even if one throws
    return !(await Promise.all(unsubPromises)).includes(false);
  };
};

/**
 * Creates a safe version of a register function that returns an UnsubPromiseAsync.
 * This is a challenge because we want to provide an unsubscriber that functions
 * even before the UnsubPromise.promise resolves.
 * TODO: This isn't quite fully safe yet. See TODO below. Basically, if you run this
 * before initializing, the unsubscriber returned may not work if you call it
 * immediately, but it will also throw an exception (we can remove this if we
 * actually run into this case and it seems to work fine). You should wait to call the unsubscriber later
 * @param unsafeRegisterFn function that does some kind of async registration and returns an unsubscriber and a promise that resolves when the registration is finished
 * @param isInitialized whether the service associated with this safe unsubPromiseAsync function is initialized
 * @param initialize promise that resolves when the service is finished initializing
 * @param backupUnregisterFn a backup unsubscriber function that should attempt to unsubscribe whatever the unsafeRegisterFn is subscribing before unsafeRegisterFn finishes subscribing and resolves. Will be overwritten with the actual unsubscriber once the unsafeRegisterFn promise resolves. See TODO above for more info
 * @returns safe version of an unsafe function that returns an UnsubPromiseAsync (meaning it will wait to register until the service is initialized)
 */
export const createSafeRegisterFn = <TParam extends Array<unknown>, TReturn>(
  unsafeRegisterFn: (...args: TParam) => UnsubPromiseAsync<TReturn>,
  isInitialized: boolean,
  initialize: () => Promise<void>,
  backupUnregisterFn?: (...args: TParam) => Promise<boolean>,
): ((...args: TParam) => UnsubPromiseAsync<TReturn>) => {
  return (...args: TParam) => {
    // If we're already initialized, run registerRequestHandler almost like normal but with an initialize check in the unsubscriber
    if (isInitialized) {
      const { promise, unsubscriber: regUnsubscriber } = unsafeRegisterFn(...args);
      // Use the returned unsubPromise's unsubscriber to make a safe unregisterRequestHandler
      return {
        promise,
        unsubscriber: async () => {
          await initialize();
          return regUnsubscriber();
        },
      };
    }

    // Create an object with a stable unsubscriber reference that we can change when we get the real unsubscriber after awaiting intialize
    const unsubRef: { unsubscriber: UnsubscriberAsync } = {
      unsubscriber: async () => {
        // TODO: The unsubscriber we return might not actually do anything meaningful at first (it attempts to call a backup unsubscriber function, which is probably not what we want), so it throws an exception. Refactor this mess so we aren't giving a stunted unsubscriber at first and then subsequently empowering it after initialize is finished
        // TODO: Should the unsubscriber await initialize first, or should it just go ahead and run it? Also below
        const didUnregister = backupUnregisterFn ? await backupUnregisterFn(...args) : false;
        throw new Error(
          `unsubscribe run from safeRegisterFn before service finished initializing! unsubscribe was${
            didUnregister ? '' : ' not'
          } successful.`,
        );
      },
    };
    return {
      promise: initialize().then(() => {
        const newUnsubAndPromise = unsafeRegisterFn(...args);
        // Change the returned unsubAndPromise's unsubscriber to be a safe unregisterRequestHandler
        unsubRef.unsubscriber = async () => {
          // TODO: Should the unsubscriber await initialize first, or should it just go ahead and run it? Also above
          await initialize();
          return newUnsubAndPromise.unsubscriber();
        };
        return newUnsubAndPromise.promise;
      }),
      unsubscriber: () => unsubRef.unsubscriber(),
    };
  };
};

// #endregion

/**
 * Type of object passed to a complex request handler that provides information about the request.
 * This type is used as the public-facing interface for requests
 */
export type ComplexRequest<TParam = unknown> = {
  contents: TParam;
};

type ComplexResponseSuccess<TReturn = unknown> = {
  /** Whether the handler that created this response was successful in handling the request */
  success: true;
  /** Content with which to respond to the request. Must be provided unless the response failed or TReturn is undefined */
  contents: TReturn;
};

type ComplexResponseFailure = {
  /** Whether the handler that created this response was successful in handling the request */
  success: false;
  /**
   * Content with which to respond to the request. Must be provided unless the response failed or TReturn is undefined
   * Removed from failure so we do not change the type of contents for type safety. We could add errorContents one day if we really need it
   */
  /* contents?: TReturn; */
  /** Error explaining the problem that is only populated if success is false */
  errorMessage: string;
};

/**
 * Type of object to create when handling a complex request where you desire to provide additional information beyond the contents of the response
 * This type is used as the public-facing interface for responses
 */
export type ComplexResponse<TReturn = unknown> =
  | ComplexResponseSuccess<TReturn>
  | ComplexResponseFailure;

/** Type of request handler - indicates what type of parameters and what return type the handler has */
export enum RequestHandlerType {
  Args = 'args',
  Contents = 'contents',
  Complex = 'complex',
}

/**
 * Handler function for a command. Called when a command is executed.
 * The function should accept the command's parameters as its parameters.
 * The function should return a promise that resolves with the "return" value of the command.
 */
// Any is probably fine because we likely never know or care about the args or return
export type CommandHandler<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParam extends Array<unknown> = any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TReturn = any,
> = (...args: TParam) => Promise<TReturn>;

/** Information about a request that tells us what to do with it */
export type RequestType = {
  /** the general category of request */
  category: string;
  /** specific identifier for this type of request */
  directive: string;
};

/**
 * Create a request message requestType string from a category and a directive
 * @param category the general category of request
 * @param directive specific identifier for this type of request
 * @returns full requestType for use in network calls
 */
export const serializeRequestType = (category: string, directive: string): string =>
  `${category}:${directive}`;

/** Split a request message requestType string into its parts */
export const deserializeRequestType = (requestType: string): RequestType => {
  // TODO: fix this to split on one colon and leave all the rest. Right now, directive is anything between the first and second colons, which is probably bad
  const [category, directive] = requestType.split(':', 1);
  return { category, directive };
};

/** Check that two objects are deeply equal, comparing members of each object and such */
export function deepEqual(a: unknown, b: unknown) {
  return equal(a, b);
}
