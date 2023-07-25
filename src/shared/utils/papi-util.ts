// There is a React version 'fast-deep-equal/react' that I think allows comparing refs
// (which have circular references in particular places that this library would ignore).
// Maybe we can change to that version sometime if needed.
import { ProcessType } from '@shared/global-this.model';
import equal from 'fast-deep-equal';
import { isString } from '@shared/utils/util';

// #region Unsubscriber stuff

/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;

/**
 * Returns an Unsubscriber function that combines all the unsubscribers passed in.
 * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
 * @returns function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscribers = (unsubscribers: Unsubscriber[]): Unsubscriber => {
  return (...args) => {
    // Run the unsubscriber for each handler
    const unsubs = unsubscribers.map((unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return unsubs.every((success) => success);
  };
};

/** Function to run to dispose of something that runs asynchronously. The promise resolves to true if successfully unsubscribed */
export type UnsubscriberAsync = () => Promise<boolean>;

/**
 * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
 * @param unsubscribers all unsubscribers to aggregate into one unsubscriber
 * @returns function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscriberAsyncs = (
  unsubscribers: UnsubscriberAsync[],
): UnsubscriberAsync => {
  return async (...args) => {
    // Run the unsubscriber for each handler
    const unsubPromises = unsubscribers.map((unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return (await Promise.all(unsubPromises)).every((success) => success);
  };
};

/**
 * Creates a safe version of a register function that returns a Promise<UnsubscriberAsync>.
 * @param unsafeRegisterFn function that does some kind of async registration and returns an unsubscriber and a promise that resolves when the registration is finished
 * @param isInitialized whether the service associated with this safe UnsubscriberAsync function is initialized
 * @param initialize promise that resolves when the service is finished initializing
 * @returns safe version of an unsafe function that returns a promise to an UnsubscriberAsync (meaning it will wait to register until the service is initialized)
 */
export const createSafeRegisterFn = <TParam extends Array<unknown>>(
  unsafeRegisterFn: (...args: TParam) => Promise<UnsubscriberAsync>,
  isInitialized: boolean,
  initialize: () => Promise<void>,
): ((...args: TParam) => Promise<UnsubscriberAsync>) => {
  return async (...args: TParam) => {
    if (!isInitialized) await initialize();
    return unsafeRegisterFn(...args);
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

/** Check that two objects are deeply equal, comparing members of each object and such */
export function deepEqual(a: unknown, b: unknown) {
  return equal(a, b);
}

/** Separator between parts of a serialized request */
const REQUEST_TYPE_SEPARATOR = ':';

/** Information about a request that tells us what to do with it */
export type RequestType = {
  /** the general category of request */
  category: string;
  /** specific identifier for this type of request */
  directive: string;
};

/**
 * String version of a request type that tells us what to do with a request.
 *
 * Consists of two strings concatenated by a colon
 */
export type SerializedRequestType = `${string}${typeof REQUEST_TYPE_SEPARATOR}${string}`;

/**
 * Create a request message requestType string from a category and a directive
 * @param category the general category of request
 * @param directive specific identifier for this type of request
 * @returns full requestType for use in network calls
 */
export function serializeRequestType(category: string, directive: string): SerializedRequestType {
  if (!category) throw new Error('serializeRequestType: "category" is not defined or empty.');
  if (!directive) throw new Error('serializeRequestType: "directive" is not defined or empty.');

  return `${category}${REQUEST_TYPE_SEPARATOR}${directive}`;
}

/** Split a request message requestType string into its parts */
export function deserializeRequestType(requestType: SerializedRequestType): RequestType {
  if (!requestType) throw new Error('deserializeRequestType: must be a non-empty string');

  const colonIndex = requestType.indexOf(REQUEST_TYPE_SEPARATOR);
  if (colonIndex <= 0 || colonIndex >= requestType.length - 1)
    throw new Error(
      `deserializeRequestType: Must have two parts divided by a ${REQUEST_TYPE_SEPARATOR}`,
    );
  const category = requestType.substring(0, colonIndex);
  const directive = requestType.substring(colonIndex + 1);
  return { category, directive };
}

/**
 * HTML Encodes the provided string.
 * Thanks to ChatGPT
 * @param str string to HTML encode
 * @returns HTML-encoded string
 */
export const htmlEncode = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

/**
 * Modules that someone might try to require in their extensions that we have similar apis for.
 * When an extension requires these modules, an error throws that lets them know about our similar api.
 */
export const MODULE_SIMILAR_APIS: Readonly<{
  [moduleName: string]: string | { [process in ProcessType | 'default']?: string } | undefined;
}> = Object.freeze({
  http: 'papi.fetch',
  https: 'papi.fetch',
  fs: {
    [ProcessType.Renderer]: 'the papi-extension: protocol',
    [ProcessType.ExtensionHost]: 'papi.storage',
  },
});

/**
 * Get a message that says the module import was rejected and to try a similar api if available.
 * @param moduleName name of `require`d module that was rejected
 * @returns string that says the import was rejected and a similar api to try
 */
export function getModuleSimilarApiMessage(moduleName: string) {
  const similarApi = MODULE_SIMILAR_APIS[moduleName] || MODULE_SIMILAR_APIS[`node:${moduleName}`];
  let similarApiName: string | undefined;
  if (similarApi)
    if (isString(similarApi)) {
      similarApiName = similarApi;
    } else {
      similarApiName = similarApi[globalThis.processType] || similarApi.default;
    }
  return `Rejected require('${moduleName}'). Try${
    similarApiName ? ` using ${similarApiName} or` : ''
  } bundling the module into your code with a build tool like Vite`;
}

/** JSDOC SOURCE papiUtil
 * papiUtil is a collection of functions, objects, and types that are used as helpers in other services.
 * Extensions should not use or rely on anything in papiUtil unless some other service requires it.
 */
export type moduleSummaryComments = {};
