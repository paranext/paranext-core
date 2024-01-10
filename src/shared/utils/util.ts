import { ProcessType } from '@shared/global-this.model';
import { UnsubscriberAsync, isString } from 'platform-bible-utils';

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
export default function newNonce(): string {
  let nonce = '';
  for (let i = 0; i < 32; i++)
    nonce += NONCE_CHARS.charAt(Math.floor(Math.random() * NONCE_CHARS_LENGTH));
  return nonce;
}

// #region Unsubscriber stuff

/**
 * Creates a safe version of a register function that returns a Promise<UnsubscriberAsync>.
 *
 * @param unsafeRegisterFn Function that does some kind of async registration and returns an
 *   unsubscriber and a promise that resolves when the registration is finished
 * @param isInitialized Whether the service associated with this safe UnsubscriberAsync function is
 *   initialized
 * @param initialize Promise that resolves when the service is finished initializing
 * @returns Safe version of an unsafe function that returns a promise to an UnsubscriberAsync
 *   (meaning it will wait to register until the service is initialized)
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

// #region Request/Response types

/**
 * Type of object passed to a complex request handler that provides information about the request.
 * This type is used as the public-facing interface for requests
 */
export type ComplexRequest<TParam = unknown> = {
  /** The one who sent the request */
  senderId: number;
  contents: TParam;
};

type ComplexResponseSuccess<TReturn = unknown> = {
  /** Whether the handler that created this response was successful in handling the request */
  success: true;
  /**
   * Content with which to respond to the request. Must be provided unless the response failed or
   * TReturn is undefined
   */
  contents: TReturn;
};

type ComplexResponseFailure = {
  /** Whether the handler that created this response was successful in handling the request */
  success: false;
  /**
   * Content with which to respond to the request. Must be provided unless the response failed or
   * TReturn is undefined Removed from failure so we do not change the type of contents for type
   * safety. We could add errorContents one day if we really need it
   */
  /* contents?: TReturn; */
  /** Error explaining the problem that is only populated if success is false */
  errorMessage: string;
};

/**
 * Type of object to create when handling a complex request where you desire to provide additional
 * information beyond the contents of the response This type is used as the public-facing interface
 * for responses
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

// #endregion

// #region Module loading

/**
 * Modules that someone might try to require in their extensions that we have similar apis for. When
 * an extension requires these modules, an error throws that lets them know about our similar api.
 */
export const MODULE_SIMILAR_APIS: Readonly<{
  [moduleName: string]: string | { [process in ProcessType | 'default']?: string } | undefined;
}> = Object.freeze({
  http: 'fetch',
  https: 'fetch',
  fs: {
    [ProcessType.Renderer]: 'the papi-extension: protocol',
    [ProcessType.ExtensionHost]: 'papi.storage',
  },
});

/**
 * Get a message that says the module import was rejected and to try a similar api if available.
 *
 * @param moduleName Name of `require`d module that was rejected
 * @returns String that says the import was rejected and a similar api to try
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
  } bundling the module into your code with a build tool like webpack`;
}

// #endregion

// #region Serialization, deserialization, encoding, and decoding functions

/** Separator between parts of a serialized request */
const REQUEST_TYPE_SEPARATOR = ':';

/** Information about a request that tells us what to do with it */
export type RequestType = {
  /** The general category of request */
  category: string;
  /** Specific identifier for this type of request */
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
 *
 * @param category The general category of request
 * @param directive Specific identifier for this type of request
 * @returns Full requestType for use in network calls
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
      `deserializeRequestType: Must have two parts divided by a ${REQUEST_TYPE_SEPARATOR} (${requestType})`,
    );
  const category = requestType.substring(0, colonIndex);
  const directive = requestType.substring(colonIndex + 1);
  return { category, directive };
}

// #endregion
