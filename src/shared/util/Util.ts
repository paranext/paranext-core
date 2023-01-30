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
 * @param o object to determine if it is a string
 * @returns true if the object is a string; false otherwise
 */
export function isString(o: unknown) {
  return typeof o === 'string' || o instanceof String;
}

/**
 * Evaluates if the value is truthy, false, or 0
 * @param val value to evaluate
 * @returns whether the value is truthy, false, or 0
 */
export function isValidValue(val: unknown): val is NonNullable<unknown> {
  return !!val || val === false || val === 0;
}

// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};
// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
// From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
/**
 * Function to get an error from the object (useful for getting an error in a catch block)
 * @param error error object whose message to get
 * @returns message of the error - if object has message, returns message. Otherwise tries to stringify
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
 * Function to get an error message from the object (useful for getting error message in a catch block)
 * @param error error object whose message to get
 * @returns message of the error - if object has message, returns message. Otherwise tries to stringify
 * @example
 *  try {...}
 *  catch (e) { console.log(getErrorMessage(e)) }
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

/**
 * Get a function that reduces calls to the function passed in
 * @param fun The function to debounce
 * @param delay How much delay before the most recent call to the debounced function to call the function
 * @returns function that, when called, only calls the function passed in at maximum every delay ms
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fun: T,
  delay = 300,
): T {
  if (isString(fun))
    throw new Error('Tried to debounce a string! Could be XSS');
  let timeout: NodeJS.Timeout;
  return ((...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fun(args), delay);
  }) as T;
}

/**
 * Groups each item in the array of items into a map according to the keySelector
 * @param items array of items to group by
 * @param keySelector function to run on each item to get the key for the group to which it belongs
 * @returns map of keys to groups of items
 */
export function groupBy<K, V>(
  items: V[],
  keySelector: (item: V) => K,
): Map<K, Array<V>> {
  const map = new Map();
  items.forEach((item) => {
    const key = keySelector(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  });
  return map;
}

/**
 * HTML Encodes the provided string.
 * Thanks to Pointy at https://stackoverflow.com/a/11561642/8535752
 * @param str string to HTML encode
 * @returns HTML-encoded string
 */
export const htmlEncode = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&#34;');

/** string[] of element tags that cannot have contents */
export const voidElements: string[] = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];
