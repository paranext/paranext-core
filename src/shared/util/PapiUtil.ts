/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;

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

type ComplexResponseFailure<TReturn = unknown> = {
  /** Whether the handler that created this response was successful in handling the request */
  success: false;
  /** Content with which to respond to the request. Must be provided unless the response failed or TReturn is undefined */
  contents?: TReturn;
  /** Error explaining the problem that is only populated if success is false */
  errorMessage: string;
};

/**
 * Type of object to create when handling a complex request where you desire to provide additional information beyond the contents of the response
 * This type is used as the public-facing interface for responses
 */
export type ComplexResponse<TReturn = unknown> =
  | ComplexResponseSuccess<TReturn>
  | ComplexResponseFailure<TReturn>;

/** Type of request handler - indicates what type of parameters and what return type the handler has */
export enum RequestHandlerType {
  Args = 'args',
  Contents = 'contents',
  Complex = 'complex',
}

/** Handler function for a command. Called when a command is executed */
// Any is probably fine because we likely never know or care about the args or return
export type CommandHandler<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParam extends Array<unknown> = any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TReturn = any,
> = (...args: TParam) => TReturn;

/** Prefix on requests that indicates that the request is a command */
export const CATEGORY_COMMAND = 'command';
/** Prefix on requests that indicates that the request is an internal epm operation */
export const CATEGORY_EPM = 'epm';

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
 * @param directive specific idenitifer for this type of request
 * @returns full requestType for use in network calls
 */
export const serializeRequestType = (
  category: string,
  directive: string,
): string => `${category}:${directive}`;

/** Split a request message requestType string into its parts */
export const deserializeRequestType = (requestType: string): RequestType => {
  // TODO: fix this to split on one colon and leave all the rest. Right now, directive is anything between the first and second colons, which is probably bad
  const [category, directive] = requestType.split(':', 1);
  return { category, directive };
};

/* Following is a failed attempt at inheriting promises to attach an unsubscriber.
 * Inheriting promise doesn't work with async/await as it sometimes wraps the return in a Promise.
 * Maybe it would be worth it just to try using UnsubPromise on registerCommands in the future, but let's abandon for now
 */
/*
/** Promise that has an unsubscriber attached to it. Returned when registering a command. Contains response from registering and an unsubscriber * /
export class UnsubPromise<T> extends Promise<T> {
    /** Function used to unsubscribe from the subscription this promise represents * /
    private unsubscriber: Unsubscriber;

    /**
     * Creates a new promise with an unsubscriber attached
     * @param executor A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used to resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error.
     * @param unsubscriber A function used to unsubscribe from the subscription this promise represents
     * /
    constructor(
        executor: (
            resolve: (value: T | PromiseLike<T>) => void,
            reject: (reason?: any) => void,
        ) => void,
    ) {
        super(executor);
        //this.unsubscriber = unsubscriber;
    }

    public unsubscribe() {
        this.unsubscriber();
    }
}

/* export interface UnsubPromise<T> = Promise<T> & {
    unsubscribe: Unsubscriber;
}; * /

/**
 * Attaches an unsubscriber to a promise object.
 * WARNING: THIS DOES MODIFY THE PROMISE PASSED IN. But probably best not to use the original promise as the unsubPromise in case we need to make it immutable
 * @param promise Promise to make into an UnsubPromise
 * @param unsubscribe function to make the unsubscribe function - should unsubscribe from whatever the promise is subscribing to
 * @returns UnsubPromise made of the promise with the unsubscribe function set to promise.unsubscribe
 * /
export const createUnsubPromise = <T>(
    promise: Promise<T>,
    unsubscribe: Unsubscriber,
) => {
    const unsubPromise: UnsubPromise<T> = promise as UnsubPromise<T>;
    unsubPromise.unsubscribe = unsubscribe;
    return unsubPromise;
}; */
