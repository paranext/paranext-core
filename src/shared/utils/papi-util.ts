import { ProcessType } from '@shared/global-this.model';
// There is a circular version https://www.npmjs.com/package/fast-equals#circulardeepequal that I
// think allows comparing React refs (which have circular references in particular places that this
// library would ignore). Maybe we can change to that version sometime if needed.
import { deepEqual as isEqualDeep } from 'fast-equals';
import { isString } from '@shared/utils/util';

// #region Unsubscriber stuff

/** Function to run to dispose of something. Returns true if successfully unsubscribed */
export type Unsubscriber = () => boolean;

/**
 * Returns an Unsubscriber function that combines all the unsubscribers passed in.
 *
 * @param unsubscribers All unsubscribers to aggregate into one unsubscriber
 * @returns Function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscribers = (unsubscribers: Unsubscriber[]): Unsubscriber => {
  return (...args) => {
    // Run the unsubscriber for each handler
    const unsubs = unsubscribers.map((unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return unsubs.every((success) => success);
  };
};

/**
 * Function to run to dispose of something that runs asynchronously. The promise resolves to true if
 * successfully unsubscribed
 */
export type UnsubscriberAsync = () => Promise<boolean>;

/**
 * Returns an UnsubscriberAsync function that combines all the unsubscribers passed in.
 *
 * @param unsubscribers - All unsubscribers to aggregate into one unsubscriber.
 * @returns Function that unsubscribes from all passed in unsubscribers when run
 */
export const aggregateUnsubscriberAsyncs = (
  unsubscribers: (UnsubscriberAsync | Unsubscriber)[],
): UnsubscriberAsync => {
  return async (...args) => {
    // Run the unsubscriber for each handler
    const unsubPromises = unsubscribers.map(async (unsubscriber) => unsubscriber(...args));

    // If all the unsubscribers resolve to truthiness, we succeed
    return (await Promise.all(unsubPromises)).every((success) => success);
  };
};

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

// #region Equality checking functions

/**
 * Check that two objects are deeply equal, comparing members of each object and such
 *
 * @param a The first object to compare
 * @param b The second object to compare
 *
 *   WARNING: Objects like arrays from different iframes have different constructor function
 *   references even if they do the same thing, so this deep equality comparison fails objects that
 *   look the same but have different constructors because different constructors could produce
 *   false positives in [a few specific
 *   situations](https://github.com/planttheidea/fast-equals/blob/a41afc0a240ad5a472e47b53791e9be017f52281/src/comparator.ts#L96).
 *   This means that two objects like arrays from different iframes that look the same will fail
 *   this check. Please use some other means to check deep equality in those situations.
 *
 *   Note: This deep equality check considers `undefined` values on keys of objects NOT to be equal to
 *   not specifying the key at all. For example, `{ stuff: 3, things: undefined }` and `{ stuff: 3
 *   }` are not considered equal in this case
 *
 *   - For more information and examples, see [this
 *       CodeSandbox](https://codesandbox.io/s/deepequallibrarycomparison-4g4kk4?file=/src/index.mjs).
 *
 * @returns True if a and b are deeply equal; false otherwise
 */
export function deepEqual(a: unknown, b: unknown) {
  return isEqualDeep(a, b);
}

// #endregion

// #region Serialization, deserialization, encoding, and decoding functions

/**
 * Converts a JavaScript value to a JSON string, changing `undefined` properties to `null`
 * properties in the JSON string.
 *
 * WARNING: `null` and `undefined` values are treated as the same thing by this function and will be
 * dropped when passed to {@link deserialize}. For example, `{ a: 1, b: undefined, c: null }` will
 * become `{ a: 1 }` after passing through {@link serialize} then {@link deserialize}. If you are
 * passing around user data that needs to retain `null` and/or `undefined` values, you should wrap
 * them yourself in a string before using this function. Alternatively, you can write your own
 * replacer that will preserve `null` and `undefined` values in a way that a custom reviver will
 * understand when deserializing.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results. Note that all `null` and `undefined`
 *   values returned by the replacer will be further transformed into a moniker that deserializes
 *   into `undefined`.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON
 *   text to make it easier to read. See the `space` parameter of `JSON.stringify` for more
 *   details.
 */
export function serialize(
  value: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
): string {
  const undefinedReplacer = (replacerKey: string, replacerValue: unknown) => {
    let newValue = replacerValue;
    if (replacer) newValue = replacer(replacerKey, newValue);
    // All `undefined` values become `null` on the way from JS objects into JSON strings
    // eslint-disable-next-line no-null/no-null
    if (newValue === undefined) newValue = null;
    return newValue;
  };
  return JSON.stringify(value, undefinedReplacer, space);
}

/**
 * Converts a JSON string into a value.
 *
 * WARNING: `null` and `undefined` values that were serialized by {@link serialize} will both be made
 * into `undefined` values by this function. If those values are properties of objects, those
 * properties will simply be dropped. For example, `{ a: 1, b: undefined, c: null }` will become `{
 * a: 1 }` after passing through {@link serialize} then {@link deserialize}. If you are passing around
 * user data that needs to retain `null` and/or `undefined` values, you should wrap them yourself in
 * a string before using this function. Alternatively, you can write your own reviver that will
 * preserve `null` and `undefined` values in a way that a custom replacer will encode when
 * serializing.
 *
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of
 *   the object. If a member contains nested objects, the nested objects are transformed before the
 *   parent object is.
 */
export function deserialize(
  value: string,
  reviver?: (this: unknown, key: string, value: unknown) => unknown,
  // Need to use `any` instead of `unknown` here to match the signature of JSON.parse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const undefinedReviver = (replacerKey: string, replacerValue: unknown) => {
    let newValue = replacerValue;
    // All `null` values become `undefined` on the way from JSON strings into JS objects
    // eslint-disable-next-line no-null/no-null
    if (newValue === null) newValue = undefined;
    if (reviver) newValue = reviver(replacerKey, newValue);
    return newValue;
  };
  // TODO: Do something like drop our custom reviver and crawl the object tree to replace all null
  // properties with undefined properties so that undefined properties don't disappear.
  return JSON.parse(value, undefinedReviver);
}

/**
 * Check to see if the value is serializable without losing information
 *
 * @param value Value to test
 * @returns True if serializable; false otherwise
 *
 *   Note: the values `undefined` and `null` are serializable (on their own or in an array), but
 *   `undefined` and `null` properties of objects are dropped when serializing/deserializing. That
 *   means `undefined` and `null` properties on a value passed in will cause it to fail.
 *
 *   WARNING: This is inefficient right now as it stringifies, parses, stringifies, and === the value.
 *   Please only use this if you need to
 *
 *   DISCLAIMER: this does not successfully detect that values are not serializable in some cases:
 *
 *   - Losses of removed properties like functions and `Map`s
 *   - Class instances (not deserializable into class instances without special code)
 *
 *   We intend to improve this in the future if it becomes important to do so. See [`JSON.stringify`
 *   documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
 *   for more information.
 */
export function isSerializable(value: unknown): boolean {
  try {
    const serializedValue = serialize(value);
    return serializedValue === serialize(deserialize(serializedValue));
  } catch (e) {
    return false;
  }
}

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
      `deserializeRequestType: Must have two parts divided by a ${REQUEST_TYPE_SEPARATOR}`,
    );
  const category = requestType.substring(0, colonIndex);
  const directive = requestType.substring(colonIndex + 1);
  return { category, directive };
}

/**
 * HTML Encodes the provided string. Thanks to ChatGPT
 *
 * @param str String to HTML encode
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

/**
 * JSDOC SOURCE papiUtil
 *
 * PapiUtil is a collection of functions, objects, and types that are used as helpers in other
 * services. Extensions should not use or rely on anything in papiUtil unless some other service
 * requires it.
 */
export type moduleSummaryComments = {};
