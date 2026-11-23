var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Canon, VerseRef } from "@sillsdev/scripture";
import { USJ_TYPE } from "@eten-tech-foundation/scripture-utilities";
import { splitGraphemes } from "unicode-segmenter/grapheme";
function newGuid() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (s) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~s) * 65536 >> s).toString(16).padStart(4, "0")
    )
  );
}
function isString(o) {
  return typeof o === "string" || o instanceof String;
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
const DEBOUNCE_CANCELED_ERROR_MESSAGE = "Debounced function invocation was canceled";
function debounce(fn, delay = 300) {
  let timeout;
  let promise;
  let promiseResolve;
  let promiseReject;
  let pendingArgs;
  const pendingPromise = () => {
    if (!promise)
      promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });
    return promise;
  };
  const runInvocation = async (args) => {
    const resolveInvocation = promiseResolve;
    const rejectInvocation = promiseReject;
    promise = void 0;
    try {
      resolveInvocation(await fn(...args));
    } catch (e) {
      rejectInvocation(e);
    }
  };
  const debouncedFn = (...args) => {
    clearTimeout(timeout);
    const callPromise = pendingPromise();
    pendingArgs = args;
    timeout = setTimeout(() => {
      const argsToRun = pendingArgs;
      pendingArgs = void 0;
      if (argsToRun) runInvocation(argsToRun);
    }, delay);
    return callPromise;
  };
  debouncedFn.cancel = () => {
    clearTimeout(timeout);
    pendingArgs = void 0;
    if (promise) {
      promiseReject(new Error(DEBOUNCE_CANCELED_ERROR_MESSAGE));
      promise = void 0;
    }
  };
  debouncedFn.flush = () => {
    if (pendingArgs === void 0) return void 0;
    clearTimeout(timeout);
    const argsToRun = pendingArgs;
    pendingArgs = void 0;
    const flushedPromise = pendingPromise();
    runInvocation(argsToRun);
    return flushedPromise;
  };
  return debouncedFn;
}
function groupBy(items, keySelector, valueSelector) {
  const map = /* @__PURE__ */ new Map();
  items.forEach((item, index) => {
    const key = keySelector(item, index);
    const group = map.get(key);
    const value = valueSelector ? valueSelector(item, key, index) : item;
    if (group) group.push(value);
    else map.set(key, [value]);
  });
  return map;
}
function isErrorWithMessage(error) {
  return typeof error === "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  error !== null && "message" in error && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof error.message === "string";
}
function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}
function getErrorMessage(error) {
  return toErrorWithMessage(error).message;
}
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitForDuration(fn, maxWaitTimeInMS) {
  const timeout = wait(maxWaitTimeInMS).then(() => void 0);
  return Promise.any([timeout, fn()]);
}
async function retryUntil(attempt, isDone, options) {
  const maxAttempts = Math.max(1, (options == null ? void 0 : options.maxAttempts) ?? 3);
  const delayMs = (options == null ? void 0 : options.delayMs) ?? 0;
  let attemptNumber = 1;
  for (; ; ) {
    const result = await attempt(attemptNumber);
    if (isDone(result) || attemptNumber >= maxAttempts) return result;
    attemptNumber += 1;
    await wait(delayMs);
  }
}
function getAllObjectFunctionNames(obj, _objId = "obj") {
  const objectFunctionNames = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(obj).forEach((property) => {
    try {
      if (typeof obj[property] === "function") objectFunctionNames.add(property);
    } catch {
    }
  });
  let objectPrototype = Object.getPrototypeOf(obj);
  while (objectPrototype && Object.getPrototypeOf(objectPrototype)) {
    Object.getOwnPropertyNames(objectPrototype).forEach((property) => {
      try {
        if (typeof obj[property] === "function") objectFunctionNames.add(property);
      } catch {
      }
    });
    objectPrototype = Object.getPrototypeOf(objectPrototype);
  }
  return objectFunctionNames;
}
function createSyncProxyForAsyncObject(getObject, objectToProxy = {}) {
  return new Proxy(objectToProxy, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return async (...args) => {
        return (await getObject())[prop](...args);
      };
    }
  });
}
function getErrorText(errorMessage) {
  return isString(errorMessage) ? errorMessage : getErrorMessage(errorMessage);
}
function isErrorMessageAboutParatextBlockingInternetAccess(errorMessage) {
  const paratextExceptionMessage = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  const internetServicesBlockedSentinel = "(INTERNET_SERVICES_BLOCKED)";
  const errorText = getErrorText(errorMessage);
  return errorText.includes(paratextExceptionMessage) || errorText.includes(internetServicesBlockedSentinel);
}
function isErrorMessageAboutRegistryAuthFailure(errorMessage) {
  const paratextExceptionMessage1 = "401 Unauthorized error while getting shared projects.";
  const paratextExceptionMessage2 = "User registration is not valid. Cannot retrieve resources from DBL.";
  const errorText = getErrorText(errorMessage);
  return errorText.includes(paratextExceptionMessage1) || errorText.includes(paratextExceptionMessage2);
}
const MAX_UINT32 = 2 ** 32 - 1;
const MAX_PADDING_LENGTH = 2 ** 20;
function toIntegerOrInfinity(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  if (number === Infinity || number === -Infinity) return number;
  return Math.trunc(number);
}
function relativeIndex(index, length) {
  const integer = toIntegerOrInfinity(index);
  if (integer < 0) return Math.max(length + integer, 0);
  return Math.min(integer, length);
}
function clampIndex(index, length) {
  const integer = toIntegerOrInfinity(index);
  if (integer <= 0) return 0;
  return Math.min(integer, length);
}
function toLength(value) {
  const integer = toIntegerOrInfinity(value);
  if (integer <= 0) return 0;
  return Math.min(integer, Number.MAX_SAFE_INTEGER);
}
function toUint32(value) {
  return value >>> 0;
}
const offsetsByInstance = /* @__PURE__ */ new WeakMap();
class GraphemeString {
  /**
   * Segment `string` into grapheme clusters once, up front. Every operation on the result reuses
   * that work rather than re-segmenting.
   *
   * @param string The raw string.
   */
  constructor(string) {
    /**
     * The raw string. Used for `toString`, the native scans behind search, and regex split. Not
     * `readonly` only because {@link fromSegmented} assigns it; treat it as immutable after
     * construction, since the cached offsets behind {@link offsets} are derived from it.
     */
    __publicField(this, "str");
    /**
     * Grapheme clusters — source of truth for indexing. Not `readonly` only because
     * {@link fromSegmented} assigns it; treat it as immutable after construction. Must always satisfy
     * `graphemes.join('') === str`, or every index, offset, and search result disagrees with the
     * text.
     */
    __publicField(this, "graphemes");
    this.str = string;
    this.graphemes = string === "" ? [] : Array.from(splitGraphemes(string));
  }
  /**
   * Number of grapheme clusters. Mirrors `String.prototype.length` in graphemes.
   *
   * @returns Count of grapheme clusters. 0 for the empty string.
   */
  get length() {
    return this.graphemes.length;
  }
  /**
   * Build an instance from text plus its already-computed segmentation, skipping the segmenter
   * entirely. This is how derived instances avoid re-parsing.
   *
   * Private on purpose: the two arguments carry an invariant that nothing validates —
   * `graphemes.join('') === string`. A mismatched pair yields an instance whose `length`, offsets,
   * and search results all silently disagree with its own text. Validating would cost an O(n) join
   * on every derive, which is exactly the work this class exists to avoid, so the invariant is
   * enforced by keeping the door shut instead.
   */
  static fromSegmented(string, graphemes) {
    const segmented = new GraphemeString("");
    segmented.str = string;
    segmented.graphemes = graphemes;
    return segmented;
  }
  /**
   * The original raw string. Named `toString` rather than exposed as a property so an instance
   * drops straight into a template literal or `String(...)` without an accessor.
   *
   * @returns The raw string this instance was built from, unchanged.
   */
  toString() {
    return this.str;
  }
  /**
   * The text, for `JSON.stringify`. Without this an instance would serialize its internals — the
   * raw string and the grapheme array beside it — at roughly twice the size of the text, and the
   * result would not read back as anything useful.
   *
   * Note that this makes serialization one-way: what comes off the wire is a plain string, not a
   * `GraphemeString`. The class is a local segmentation cache rather than a transferable value, so
   * a receiver that wants one constructs it from the text.
   *
   * @returns The raw string this instance was built from, unchanged.
   */
  toJSON() {
    return this.str;
  }
  /**
   * The grapheme clusters as an array. Returns a fresh copy, so mutating it cannot corrupt this
   * instance. Equivalent to spreading this instance, and to spreading a native string except that
   * native yields code points rather than clusters.
   *
   * @returns A new array of the grapheme clusters, in order. Empty for the empty string.
   */
  toArray() {
    return [...this.graphemes];
  }
  /**
   * Iterate the grapheme clusters, so `Array.from(...)` and spreading behave the way they do on a
   * native string — with clusters as the unit. Without this an instance would read as array-like,
   * and `Array.from` would silently produce a run of `undefined` instead of failing.
   *
   * @returns An iterator over the grapheme clusters, in order.
   */
  *[Symbol.iterator]() {
    yield* this.graphemes;
  }
  /**
   * Replace each `{key}` in this string with `replacers[key]` and unescape `\{`/`\}`. An unknown
   * key is replaced by the key text itself. Adjacent strings are concatenated, so a replacer that
   * is not a string stays its own entry — which is how a React element survives being substituted
   * in.
   *
   * No native counterpart, but it walks the string character by character, so it belongs here
   * rather than beside the plain string helpers: an instance built once from a template can be
   * formatted repeatedly without re-segmenting it.
   *
   * @example
   *
   * ```tsx
   * new GraphemeString('Hi, {name}! I like \\{curly braces\\}!').formatReplacementToArray({
   *   name: <b>Alice</b>,
   * });
   * // ['Hi, ', <b>Alice</b>, '! I like {curly braces}!']
   * ```
   *
   * @param replacers Map from key text to its replacement. A key absent from the map is replaced by
   *   the key text itself rather than treated as an error.
   * @returns The formatted parts in order. Adjacent strings are merged into one entry, so a
   *   non-string replacer is always its own entry. A template with no placeholders yields a single
   *   string entry; only the empty string yields an empty array.
   */
  formatReplacementToArray(replacers) {
    return buildReplacementParts(this, replacers);
  }
  /**
   * {@link formatReplacementToArray} with every part coerced to a string and joined.
   *
   * @example
   *
   * ```ts
   * new GraphemeString('a{n}b').formatReplacement({ n: 9000 }); // 'a9000b'
   * ```
   *
   * A replacer that cannot be converted to a string degrades to a placeholder rather than throwing,
   * because the template is a localized string and the replacers are caller-supplied values — one
   * bad value must not take down the whole call. Use {@link formatReplacementToArray} to keep a
   * non-string replacer intact instead of coerced.
   *
   * @param replacers Map from key text to its replacement. A key absent from the map is replaced by
   *   the key text itself.
   * @returns The formatted string. `''` if this string is empty. A replacer that cannot be
   *   converted becomes `[object Object]`, or `[object Unknown]` if even that inspection throws.
   */
  formatReplacement(replacers) {
    return this.formatReplacementToArray(replacers).map(coerceReplacement).join("");
  }
  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   *
   * @param index Grapheme index. Negative counts back from the end; fractional truncates toward
   *   zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `undefined` when out of bounds.
   */
  at(index) {
    const integer = toIntegerOrInfinity(index);
    const position = integer < 0 ? integer + this.graphemes.length : integer;
    if (position < 0 || position >= this.graphemes.length) return void 0;
    return this.graphemes[position];
  }
  /**
   * Mirrors `String.prototype.charAt`. The grapheme at `index`, or `''` if out of bounds. Like
   * native — and unlike {@link at} — a negative index is out of bounds rather than counted from the
   * end.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `''` when out of bounds.
   */
  charAt(index) {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return "";
    return this.graphemes[position];
  }
  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The first code point of the grapheme at `index`, or `undefined` when out of bounds.
   */
  codePointAt(index) {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return void 0;
    return this.graphemes[position].codePointAt(0);
  }
  /**
   * Mirrors `String.prototype.slice`. Negative indexes count back from the end and a backwards
   * range yields an empty result.
   *
   * @param indexStart First grapheme to include. Defaults to 0; negative counts back from the end.
   * @param indexEnd First grapheme to exclude. Defaults to the end; negative counts back from the
   *   end.
   * @returns A new instance over `[indexStart, indexEnd)`, reusing this instance's segmentation.
   *   Empty when the range is backwards or empty.
   */
  slice(indexStart, indexEnd) {
    const { length } = this.graphemes;
    const from = indexStart === void 0 ? 0 : relativeIndex(indexStart, length);
    const to = indexEnd === void 0 ? length : relativeIndex(indexEnd, length);
    return this.derive(from, to);
  }
  /**
   * Mirrors `String.prototype.substring`. Negative indexes clamp to 0 rather than counting from the
   * end, and — as in native — the arguments are swapped when `begin` is greater than `end`.
   *
   * @param begin First grapheme to include. Defaults to 0; negative clamps to 0.
   * @param end First grapheme to exclude. Defaults to the end; negative clamps to 0.
   * @returns A new instance over the range, reusing this instance's segmentation. Empty when
   *   `begin` and `end` resolve to the same index.
   */
  substring(begin, end) {
    const { length } = this.graphemes;
    const first = begin === void 0 ? 0 : clampIndex(begin, length);
    const second = end === void 0 ? length : clampIndex(end, length);
    return this.derive(Math.min(first, second), Math.max(first, second));
  }
  /**
   * Mirrors `String.prototype.padStart`, choosing whole graphemes as filler so the result is
   * `targetLength` graphemes long — where native fills UTF-16 slots and can leave a broken half of
   * a cluster at the seam. Throws `RangeError` above {@link MAX_PADDING_LENGTH}, a lower ceiling
   * than native's and the class's one deliberate departure from native behavior.
   *
   * Returns text rather than a `GraphemeString`, unlike the range methods. Those only ever remove
   * clusters, so a range of an honest segmentation is still honest and can be carried into the
   * result for free. Padding adds text at a seam, and added text can fuse with what is already
   * there — a filler ending in a combining mark joins the character it lands against — so there is
   * no segmentation to carry. Constructing one here would mean either re-segmenting on every call
   * or handing back an instance whose cluster array disagrees with its own text.
   *
   * @param targetLength Desired length in graphemes. No padding is added when it is at or below the
   *   current length.
   * @param padString Text to repeat, truncated at a grapheme boundary. Defaults to a single space;
   *   an empty string adds no padding.
   * @returns The padded text, or this instance's text unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added. An empty `padString` never pads, so it never throws.
   */
  padStart(targetLength, padString) {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this.str;
    return padding.join("") + this.str;
  }
  /**
   * Mirrors `String.prototype.padEnd`. See {@link padStart}, including the `RangeError` ceiling and
   * why this returns text rather than a `GraphemeString`.
   *
   * @param targetLength Desired length in graphemes.
   * @param padString Text to repeat. Defaults to a single space.
   * @returns The padded text, or this instance's text unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added.
   */
  padEnd(targetLength, padString) {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this.str;
    return this.str + padding.join("");
  }
  /**
   * Mirrors `String.prototype.indexOf`: the first grapheme index at or after `position` where
   * `searchString` occurs, or -1. A negative `position` clamps to 0, and an empty needle reports
   * the clamped `position` itself. Only a hit that begins and ends on a grapheme boundary counts,
   * so searching for a single emoji that forms part of a larger cluster reports -1 rather than
   * matching inside it.
   *
   * Accepts a raw string or a GraphemeString; the needle is used raw and is never segmented.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns The grapheme index of the first match, or `-1` if there is none. An empty needle
   *   returns the clamped `position`.
   */
  indexOf(searchString, position) {
    const needle = rawNeedle(searchString);
    const start = clampIndex(position ?? 0, this.graphemes.length);
    if (needle === "") return start;
    return this.searchOnBoundaries(needle, this.offsetAt(start), 1);
  }
  /**
   * Mirrors `String.prototype.lastIndexOf`: the last grapheme index at or before `position` where
   * `searchString` occurs, or -1. As in native, an omitted or `NaN` position searches the whole
   * string while a negative one clamps to 0. See {@link indexOf} for the boundary rule.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to search at or before. Omitted or `NaN` searches the whole
   *   string; negative clamps to 0.
   * @returns The grapheme index of the last match, or `-1` if there is none. An empty needle
   *   returns the clamped `position`.
   */
  lastIndexOf(searchString, position) {
    const needle = rawNeedle(searchString);
    const { length } = this.graphemes;
    const numeric = position === void 0 ? NaN : Number(position);
    const start = Number.isNaN(numeric) ? length : clampIndex(numeric, length);
    if (needle === "") return start;
    return this.searchOnBoundaries(needle, this.offsetAt(start), -1);
  }
  /**
   * Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` occurs on grapheme boundaries at or after `position`. An
   *   empty needle returns `true`.
   */
  includes(searchString, position) {
    return this.indexOf(searchString, position) !== -1;
  }
  /**
   * Mirrors `String.prototype.startsWith`: whether an occurrence of `searchString` begins at
   * `position`. A negative `position` clamps to 0 and an empty needle returns `true`. The match
   * must end on a grapheme boundary, so a prefix ending mid-cluster is rejected.
   *
   * @param searchString Needle to look for. Used raw and never segmented.
   * @param position Grapheme index the match must begin at. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` begins at `position` and ends on a grapheme boundary. An
   *   empty needle returns `true`.
   */
  startsWith(searchString, position) {
    const needle = rawNeedle(searchString);
    if (needle === "") return true;
    const from = this.offsetAt(clampIndex(position ?? 0, this.graphemes.length));
    if (!this.str.startsWith(needle, from)) return false;
    return this.isBoundary(from + needle.length);
  }
  /**
   * Mirrors `String.prototype.endsWith`: whether an occurrence of `searchString` ends exactly at
   * `endPosition` (default: the end of the string). A negative `endPosition` clamps to 0 and an
   * empty needle returns `true`. The match must begin on a grapheme boundary.
   *
   * @param searchString Needle to look for. Used raw and never segmented.
   * @param endPosition Grapheme index the match must end at. Defaults to the end of the string;
   *   negative clamps to 0.
   * @returns `true` if `searchString` ends exactly at `endPosition` and begins on a grapheme
   *   boundary. An empty needle returns `true`.
   */
  endsWith(searchString, endPosition) {
    const needle = rawNeedle(searchString);
    if (needle === "") return true;
    const { length } = this.graphemes;
    const end = this.offsetAt(endPosition === void 0 ? length : clampIndex(endPosition, length));
    if (!this.str.endsWith(needle, end)) return false;
    return this.isBoundary(end - needle.length);
  }
  split(separator, splitLimit) {
    const limit = splitLimit === void 0 ? MAX_UINT32 : toUint32(splitLimit);
    if (limit === 0) return [];
    if (separator === void 0) return [this];
    if (isRegExp(separator)) return this.splitOnRegExp(separator, limit);
    return this.splitOnString(rawNeedle(separator), limit);
  }
  /**
   * The scan behind {@link indexOf} and {@link lastIndexOf}.
   *
   * PERF: native `String.indexOf`/`lastIndexOf` do the scanning (C++); this only validates that a
   * hit begins AND ends on grapheme boundaries, and steps one UTF-16 unit past a rejected hit to
   * resume. That rejection is what keeps a needle matching inside a cluster from counting.
   *
   * @param needle Raw, already-unwrapped needle. Never empty — both callers handle that first.
   * @param startOffset UTF-16 offset to begin scanning from.
   * @param direction `1` to scan forward, `-1` to scan backward.
   * @returns The grapheme index of the first hit on boundaries, or `-1`.
   */
  searchOnBoundaries(needle, startOffset, direction) {
    let from = startOffset;
    for (; ; ) {
      const index = direction === 1 ? this.str.indexOf(needle, from) : this.str.lastIndexOf(needle, from);
      if (index < 0) return -1;
      const graphemeIndex = this.graphemeIndexAtOffset(index);
      if (graphemeIndex >= 0 && this.isBoundary(index + needle.length)) return graphemeIndex;
      if (direction === -1 && index === 0) return -1;
      from = index + direction;
    }
  }
  /** Split on a literal separator, in grapheme space. See {@link split}. */
  splitOnString(separator, limit) {
    const { length } = this.graphemes;
    if (separator === "") {
      return this.graphemes.slice(0, Math.min(limit, length)).map((grapheme) => GraphemeString.fromSegmented(grapheme, [grapheme]));
    }
    if (length === 0) return [this];
    const result = [];
    let pieceStart = 0;
    let searchFrom = 0;
    while (searchFrom < length) {
      const matchIndex = this.indexOf(separator, searchFrom);
      if (matchIndex < 0) break;
      result.push(this.derive(pieceStart, matchIndex));
      if (result.length === limit) return result;
      pieceStart = matchIndex + this.graphemeSpan(matchIndex, separator);
      searchFrom = pieceStart;
    }
    result.push(this.derive(pieceStart, length));
    return result;
  }
  /**
   * Split on a regular expression, in grapheme space. Follows the same shape as the spec's
   * `RegExp.prototype[@@split]`, with two changes: positions advance by whole graphemes, and a
   * match that does not begin and end on grapheme boundaries is skipped as if it had not matched.
   */
  splitOnRegExp(separator, limit) {
    const { length } = this.graphemes;
    const flags = separator.flags.replace("y", "");
    const scanner = new RegExp(separator.source, flags.includes("g") ? flags : `${flags}g`);
    if (length === 0) return scanner.test(this.str) ? [] : [this];
    const result = [];
    let pieceStart = 0;
    let searchOffset = 0;
    while (searchOffset < this.str.length) {
      scanner.lastIndex = searchOffset;
      const match = scanner.exec(this.str);
      if (!match) break;
      const matchEndOffset = match.index + match[0].length;
      const matchStart = this.graphemeIndexAtOffset(match.index);
      const minimumNextOffset = searchOffset + 1;
      if (matchStart < 0 || !this.isBoundary(matchEndOffset)) {
        searchOffset = Math.max(match.index + 1, minimumNextOffset);
      } else {
        const matchEnd = matchEndOffset >= this.str.length ? length : this.graphemeIndexAtOffset(matchEndOffset);
        if (matchEnd === pieceStart) {
          if (matchStart + 1 >= length) break;
          searchOffset = Math.max(this.offsets()[matchStart + 1], minimumNextOffset);
        } else {
          result.push(this.derive(pieceStart, matchStart));
          if (result.length === limit) return result;
          for (let group = 1; group < match.length; group++) {
            const capture = match[group];
            result.push(capture === void 0 ? void 0 : new GraphemeString(capture));
            if (result.length === limit) return result;
          }
          pieceStart = matchEnd;
          searchOffset = Math.max(matchEndOffset, minimumNextOffset);
        }
      }
    }
    result.push(this.derive(pieceStart, length));
    return result;
  }
  /**
   * UTF-16 start offset of each grapheme, where `offsets.length === graphemes.length`.
   *
   * PERF: built on first use rather than in the constructor. Only the search and range methods need
   * it; `length`, the point accessors, and the padding methods do not, and those are both the
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing. That
   * matters most for derived instances: `split` alone produces one per piece, and most are never
   * indexed into. Cached in {@link offsetsByInstance} rather than on the instance.
   */
  offsets() {
    const cached = offsetsByInstance.get(this);
    if (cached) return cached;
    const offsets = new Array(this.graphemes.length);
    let offset = 0;
    for (let i = 0; i < this.graphemes.length; i++) {
      offsets[i] = offset;
      offset += this.graphemes[i].length;
    }
    offsetsByInstance.set(this, offsets);
    return offsets;
  }
  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  buildPadding(targetLength, padString) {
    const maxLength = toLength(targetLength);
    if (maxLength <= this.graphemes.length) return [];
    const filler = padString === void 0 ? " " : `${padString}`;
    const fillGraphemes = Array.from(splitGraphemes(filler));
    if (fillGraphemes.length === 0) return [];
    if (maxLength > MAX_PADDING_LENGTH)
      throw new RangeError(
        `Invalid string length: padding to ${maxLength} graphemes exceeds the limit of ${MAX_PADDING_LENGTH}`
      );
    const count = maxLength - this.graphemes.length;
    const padding = new Array(count);
    for (let i = 0; i < count; i++) padding[i] = fillGraphemes[i % fillGraphemes.length];
    return padding;
  }
  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  offsetAt(index) {
    if (index <= 0) return 0;
    if (index >= this.graphemes.length) return this.str.length;
    return this.offsets()[index];
  }
  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  graphemeSpan(index, needle) {
    const endOffset = this.offsets()[index] + needle.length;
    if (endOffset >= this.str.length) return this.graphemes.length - index;
    return this.graphemeIndexAtOffset(endOffset) - index;
  }
  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  derive(begin, end) {
    if (begin >= end) return new GraphemeString("");
    return GraphemeString.fromSegmented(
      this.str.substring(this.offsetAt(begin), this.offsetAt(end)),
      this.graphemes.slice(begin, end)
    );
  }
  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  graphemeIndexAtOffset(utf16Offset) {
    const offsets = this.offsets();
    let lo = 0;
    let hi = offsets.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const value = offsets[mid];
      if (value === utf16Offset) return mid;
      if (value < utf16Offset) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }
  /** Whether a UTF-16 offset falls on a grapheme boundary (or the very end of the string). */
  isBoundary(utf16Offset) {
    return utf16Offset === this.str.length || this.graphemeIndexAtOffset(utf16Offset) >= 0;
  }
}
function coerceReplacement(content) {
  try {
    return String(content);
  } catch {
    try {
      return Object.prototype.toString.call(content);
    } catch {
      return "[object Unknown]";
    }
  }
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
function rawNeedle(searchString) {
  return typeof searchString === "string" ? searchString : `${searchString}`;
}
function indexOfClosestClosingCurlyBrace(graphemeString, index) {
  if (index < 0) return -1;
  let i = index;
  const len = graphemeString.length;
  while (i < len) {
    i = graphemeString.indexOf("}", i);
    if (i === -1 || graphemeString.charAt(i - 1) !== "\\") break;
    i += 1;
  }
  return i >= len ? -1 : i;
}
function buildReplacementParts(graphemeString, replacers) {
  const contents = [];
  let i = 0;
  let nextIntermediateStartIndex = 0;
  function addToContents(newContent, newContentIndex, newContentLength) {
    const intermediateContent = graphemeString.slice(nextIntermediateStartIndex, newContentIndex).toString();
    const baseSubstring = contents.length > 0 && isString(contents[contents.length - 1]) ? `${contents.pop()}${intermediateContent}` : intermediateContent;
    if (isString(newContent)) {
      contents.push(`${baseSubstring}${newContent}`);
    } else {
      if (baseSubstring) contents.push(baseSubstring);
      contents.push(newContent);
    }
    nextIntermediateStartIndex = newContentIndex + newContentLength;
  }
  const strLength = graphemeString.length;
  while (i < strLength) {
    const prev = graphemeString.charAt(i - 1);
    switch (graphemeString.charAt(i)) {
      case "{":
        if (prev !== "\\") {
          const closeCurlyBraceIndex = indexOfClosestClosingCurlyBrace(graphemeString, i);
          if (closeCurlyBraceIndex >= 0) {
            const replacerKey = graphemeString.slice(i + 1, closeCurlyBraceIndex).toString();
            const replacerContent = Object.hasOwn(replacers, replacerKey) ? (
              // `Object.hasOwn` is a narrowing check; the cast is sound.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              replacers[replacerKey]
            ) : replacerKey;
            addToContents(replacerContent, i, closeCurlyBraceIndex + 1 - i);
            i = closeCurlyBraceIndex;
          }
        } else {
          addToContents("{", i - 1, 2);
        }
        break;
      case "}":
        if (prev === "\\") addToContents("}", i - 1, 2);
        break;
    }
    i += 1;
  }
  if (nextIntermediateStartIndex < strLength) {
    const endContent = graphemeString.slice(nextIntermediateStartIndex).toString();
    contents.push(
      contents.length > 0 && isString(contents[contents.length - 1]) ? `${contents.pop()}${endContent}` : endContent
    );
  }
  return contents;
}
function ensureArray(maybeArray) {
  if (!maybeArray) return [];
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
function at(string, index) {
  return new GraphemeString(string).at(index);
}
function charAt(string, index) {
  return new GraphemeString(string).charAt(index);
}
function codePointAt(string, index) {
  return new GraphemeString(string).codePointAt(index);
}
function endsWith(string, searchString, endPosition) {
  return new GraphemeString(string).endsWith(searchString, endPosition);
}
function includes(string, searchString, position) {
  return new GraphemeString(string).includes(searchString, position);
}
function indexOf(string, searchString, position) {
  return new GraphemeString(string).indexOf(searchString, position);
}
function lastIndexOf(string, searchString, position) {
  return new GraphemeString(string).lastIndexOf(searchString, position);
}
function stringLength(string) {
  return new GraphemeString(string).length;
}
function normalize(string, form) {
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === "NONE") {
    return string;
  }
  return string.normalize(upperCaseForm);
}
function ordinalCompare(string1, string2, options) {
  return string1.localeCompare(string2, "en", options);
}
function padEnd(string, targetLength, padString) {
  return new GraphemeString(string).padEnd(targetLength, padString);
}
function padStart(string, targetLength, padString) {
  return new GraphemeString(string).padStart(targetLength, padString);
}
function slice(string, indexStart, indexEnd) {
  return new GraphemeString(string).slice(indexStart, indexEnd).toString();
}
function split(string, separator, splitLimit) {
  const graphemeString = new GraphemeString(string);
  if (separator === "") {
    const parts = graphemeString.toArray();
    return splitLimit === void 0 ? parts : parts.slice(0, toUint32(splitLimit));
  }
  if (typeof separator === "string")
    return graphemeString.split(separator, splitLimit).map((part) => part.toString());
  return graphemeString.split(separator, splitLimit).map((part) => (part == null ? void 0 : part.toString()) ?? "");
}
function startsWith(string, searchString, position) {
  return new GraphemeString(string).startsWith(searchString, position);
}
function substring(string, begin, end) {
  return new GraphemeString(string).substring(begin, end).toString();
}
function toArray(string) {
  return new GraphemeString(string).toArray();
}
function formatReplacementStringToArray(str, replacers) {
  return new GraphemeString(str).formatReplacementToArray(replacers);
}
function formatReplacementString(str, replacers) {
  return new GraphemeString(str).formatReplacement(replacers);
}
function isLocalizeKey(str) {
  const graphemeString = new GraphemeString(str);
  return graphemeString.startsWith("%") && graphemeString.endsWith("%");
}
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function transformAndEnsureRegExpRegExpArray(stringStringMaybeArray) {
  if (!stringStringMaybeArray) return [];
  const stringStringArray = ensureArray(stringStringMaybeArray);
  const regExpRegExpArray = stringStringArray.map(
    (stringMaybeStringArray) => Array.isArray(stringMaybeStringArray) ? stringMaybeStringArray.map((str) => new RegExp(str)) : new RegExp(stringMaybeStringArray)
  );
  return regExpRegExpArray;
}
function transformAndEnsureRegExpArray(stringMaybeArray) {
  if (!stringMaybeArray) return [];
  const stringArray = ensureArray(stringMaybeArray);
  const regExpArray = stringArray.map((str) => new RegExp(str));
  return regExpArray;
}
const whiteSpaceRegex = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function isWhiteSpace(ch) {
  return whiteSpaceRegex.test(ch);
}
function toKebabCase(input) {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
    if (isUpper) {
      if (i > 0) {
        const prevChar = input[i - 1];
        const isPrevUpper = prevChar === prevChar.toUpperCase() && prevChar !== prevChar.toLowerCase();
        if (!isPrevUpper) {
          result += "-";
        } else if (i + 1 < input.length) {
          const nextChar = input[i + 1];
          const isNextLower = nextChar === nextChar.toLowerCase() && nextChar !== nextChar.toUpperCase();
          if (isNextLower) {
            result += "-";
          }
        }
      }
      result += char.toLowerCase();
    } else {
      result += char;
    }
  }
  return result;
}
function collapseMiddleWords(text, numberOfTokensToKeepBeforeAndAfter) {
  const tokens = text.split(/\s+/);
  if (tokens.length <= numberOfTokensToKeepBeforeAndAfter * 2 || numberOfTokensToKeepBeforeAndAfter < 1) {
    return text;
  }
  const startTokens = tokens.slice(0, numberOfTokensToKeepBeforeAndAfter);
  const endTokens = tokens.slice(-numberOfTokensToKeepBeforeAndAfter);
  return [...startTokens, `[...]`, ...endTokens].join(" ");
}
const FIRST_STRONG_ISOLATE = "⁨";
const POP_DIRECTIONAL_ISOLATE = "⁩";
function isolateBidi(text) {
  return `${FIRST_STRONG_ISOLATE}${text}${POP_DIRECTIONAL_ISOLATE}`;
}
const BLOCK_MARKER_TYPES = ["chapter", "book", "para", "row", "sidebar", USJ_TYPE];
const ZWSP = "​";
const NBSP = " ";
const DIRECTION_MARKS_REGEX = /[\u200E\u200F]/g;
const scrBookData = [
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: "TOB", fullNames: ["Tobit"], chapters: 14 },
  { shortName: "JDT", fullNames: ["Judith"], chapters: 16 },
  { shortName: "ESG", fullNames: ["Esther Greek"], chapters: 11 },
  { shortName: "WIS", fullNames: ["Wisdom of Solomon"], chapters: 19 },
  { shortName: "SIR", fullNames: ["Sirach (Ecclesiasticus)"], chapters: 52 },
  { shortName: "BAR", fullNames: ["Baruch"], chapters: 6 },
  { shortName: "LJE", fullNames: ["Letter of Jeremiah"], chapters: 1 },
  { shortName: "S3Y", fullNames: ["Song of 3 Young Men"], chapters: 1 },
  { shortName: "SUS", fullNames: ["Susanna"], chapters: 1 },
  { shortName: "BEL", fullNames: ["Bel and the Dragon"], chapters: 1 },
  { shortName: "1MA", fullNames: ["1 Maccabees"], chapters: 16 },
  { shortName: "2MA", fullNames: ["2 Maccabees"], chapters: 15 },
  { shortName: "3MA", fullNames: ["3 Maccabees"], chapters: 7 },
  { shortName: "4MA", fullNames: ["4 Maccabees"], chapters: 18 },
  { shortName: "1ES", fullNames: ["1 Esdras (Greek)"], chapters: 9 },
  { shortName: "2ES", fullNames: ["2 Esdras (Latin)"], chapters: 16 },
  { shortName: "MAN", fullNames: ["Prayer of Manasseh"], chapters: 1 },
  { shortName: "PS2", fullNames: ["Psalm 151"], chapters: 1 },
  { shortName: "ODA", fullNames: ["Odes"], chapters: 14 },
  { shortName: "PSS", fullNames: ["Psalms of Solomon"], chapters: 18 },
  { shortName: "JSA", fullNames: ["Joshua A. *obsolete*"], chapters: 24 },
  { shortName: "JDB", fullNames: ["Judges B. *obsolete*"], chapters: 21 },
  { shortName: "TBS", fullNames: ["Tobit S. *obsolete*"], chapters: 14 },
  { shortName: "SST", fullNames: ["Susanna Th. *obsolete*"], chapters: 1 },
  { shortName: "DNT", fullNames: ["Daniel Th. *obsolete*"], chapters: 12 },
  { shortName: "BLT", fullNames: ["Bel Th. *obsolete*"], chapters: 1 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 1 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 1 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 1 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 1 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 1 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 1 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 1 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 1 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 1 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 1 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "INT", fullNames: ["Introduction"], chapters: 1 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 1 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 1 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 1 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "DAG", fullNames: ["Daniel Greek"], chapters: 14 },
  { shortName: "PS3", fullNames: ["Psalms 152-155"], chapters: 4 },
  { shortName: "2BA", fullNames: ["2 Baruch (Apocalypse)"], chapters: 77 },
  { shortName: "LBA", fullNames: ["Letter of Baruch"], chapters: 86 },
  { shortName: "JUB", fullNames: ["Jubilees"], chapters: 34 },
  { shortName: "ENO", fullNames: ["Enoch"], chapters: 42 },
  { shortName: "1MQ", fullNames: ["1 Meqabyan"], chapters: 36 },
  { shortName: "2MQ", fullNames: ["2 Meqabyan"], chapters: 20 },
  { shortName: "3MQ", fullNames: ["3 Meqabyan"], chapters: 10 },
  { shortName: "REP", fullNames: ["Reproof (Proverbs 25-31)"], chapters: 6 },
  { shortName: "4BA", fullNames: ["4 Baruch (Rest of Baruch)"], chapters: 5 },
  { shortName: "LAO", fullNames: ["Laodiceans"], chapters: 1 }
];
const FIRST_SCR_BOOK_NUM = 1;
const LAST_SCR_BOOK_NUM = scrBookData.length - 1;
const FIRST_SCR_CHAPTER_NUM = 1;
const FIRST_SCR_VERSE_NUM = 1;
const defaultScrRef = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
};
const getChaptersForBook = (bookNum) => {
  var _a;
  return ((_a = scrBookData[bookNum]) == null ? void 0 : _a.chapters) ?? -1;
};
const BOOKS_PRESENT_DEFAULT = "";
const ALL_BOOK_IDS = Canon.allBookIds.filter(
  (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId))
);
function getBookIdsFromBooksPresent(booksPresent) {
  const ids = [];
  const bookCount = Math.min(booksPresent.length, Canon.allBookIds.length);
  for (let index = 0; index < bookCount; index += 1) {
    if (booksPresent[index] === "1") ids.push(Canon.bookNumberToId(index + 1));
  }
  return ids;
}
const offsetBook = (scrRef, offset) => ({
  book: Canon.bookNumberToId(
    Math.max(
      FIRST_SCR_BOOK_NUM,
      Math.min(Canon.bookIdToNumber(scrRef.book) + offset, LAST_SCR_BOOK_NUM)
    )
  ),
  chapterNum: 1,
  verseNum: 1
});
const offsetChapter = (scrRef, offset) => ({
  ...scrRef,
  chapterNum: Math.min(
    Math.max(FIRST_SCR_CHAPTER_NUM, scrRef.chapterNum + offset),
    getChaptersForBook(Canon.bookIdToNumber(scrRef.book))
  ),
  verseNum: 1
});
const offsetVerse = (scrRef, offset) => ({
  ...scrRef,
  verseNum: Math.max(FIRST_SCR_VERSE_NUM, scrRef.verseNum + offset)
});
async function getLocalizedIdFromBookNumber(bookNumber, localizationLanguage, getLocalizedString) {
  const id = Canon.bookNumberToId(bookNumber);
  if (!Intl.getCanonicalLocales(localizationLanguage)[0].startsWith("zh"))
    return getLocalizedString({
      localizeKey: `LocalizedId.${id}`,
      languagesToSearch: [localizationLanguage]
    });
  const bookName = await getLocalizedString({
    localizeKey: `Book.${id}`,
    languagesToSearch: [localizationLanguage]
  });
  const graphemeName = new GraphemeString(bookName);
  const beforeParenthesis = graphemeName.split("-")[0].split("（")[0];
  return beforeParenthesis.toString().trim();
}
function scrRefToBBBCCC(scrRef) {
  return new VerseRef(Canon.bookIdToNumber(scrRef.book), scrRef.chapterNum, scrRef.verseNum).BBBCCC;
}
function scrRefToBBBCCCVVV(scrRef) {
  return new VerseRef(Canon.bookIdToNumber(scrRef.book), scrRef.chapterNum, scrRef.verseNum).BBBCCCVVV;
}
function compareScrRefs(scrRef1, scrRef2) {
  return scrRefToBBBCCCVVV(scrRef1) - scrRefToBBBCCCVVV(scrRef2);
}
function getLocalizeKeyForScrollGroupId(scrollGroupId) {
  return `%scrollGroup_${scrollGroupId}%`;
}
const DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS = {
  [getLocalizeKeyForScrollGroupId("undefined")]: "Ø",
  [getLocalizeKeyForScrollGroupId(0)]: "A",
  [getLocalizeKeyForScrollGroupId(1)]: "B",
  [getLocalizeKeyForScrollGroupId(2)]: "C",
  [getLocalizeKeyForScrollGroupId(3)]: "D",
  [getLocalizeKeyForScrollGroupId(4)]: "E",
  [getLocalizeKeyForScrollGroupId(5)]: "F",
  [getLocalizeKeyForScrollGroupId(6)]: "G",
  [getLocalizeKeyForScrollGroupId(7)]: "H",
  [getLocalizeKeyForScrollGroupId(8)]: "I",
  [getLocalizeKeyForScrollGroupId(9)]: "J",
  [getLocalizeKeyForScrollGroupId(10)]: "K",
  [getLocalizeKeyForScrollGroupId(11)]: "L",
  [getLocalizeKeyForScrollGroupId(12)]: "M",
  [getLocalizeKeyForScrollGroupId(13)]: "N",
  [getLocalizeKeyForScrollGroupId(14)]: "O",
  [getLocalizeKeyForScrollGroupId(15)]: "P",
  [getLocalizeKeyForScrollGroupId(16)]: "Q",
  [getLocalizeKeyForScrollGroupId(17)]: "R",
  [getLocalizeKeyForScrollGroupId(18)]: "S",
  [getLocalizeKeyForScrollGroupId(19)]: "T",
  [getLocalizeKeyForScrollGroupId(20)]: "U",
  [getLocalizeKeyForScrollGroupId(21)]: "V",
  [getLocalizeKeyForScrollGroupId(22)]: "W",
  [getLocalizeKeyForScrollGroupId(23)]: "X",
  [getLocalizeKeyForScrollGroupId(24)]: "Y",
  [getLocalizeKeyForScrollGroupId(25)]: "Z"
};
function getLocalizeKeysForScrollGroupIds(scrollGroupIds) {
  return scrollGroupIds.map((scrollGroupId) => getLocalizeKeyForScrollGroupId(scrollGroupId));
}
function getBookNameFromVerseRef(scrRef, optionOrLocalizedBookName) {
  switch (optionOrLocalizedBookName) {
    case "English":
      return Canon.bookIdToEnglishName(scrRef.book);
    case "id":
    case void 0:
      return scrRef.book;
    default:
      return optionOrLocalizedBookName;
  }
}
function formatScrRefWithOptions(scrRef, formatScrRefOptions) {
  const bookName = getBookNameFromVerseRef(scrRef, formatScrRefOptions == null ? void 0 : formatScrRefOptions.optionOrLocalizedBookName);
  const bookChapterSeparator = (formatScrRefOptions == null ? void 0 : formatScrRefOptions.bookChapterSeparator) ?? " ";
  const chapterVerseSeparator = (formatScrRefOptions == null ? void 0 : formatScrRefOptions.chapterVerseSeparator) ?? ":";
  return `${bookName}${bookChapterSeparator}${scrRef.chapterNum}${chapterVerseSeparator}${scrRef.verseNum}`;
}
function formatScrRef(scrRef, optionOrLocalizedBookName, chapterVerseSeparator, bookChapterSeparator) {
  return formatScrRefWithOptions(scrRef, {
    optionOrLocalizedBookName,
    chapterVerseSeparator,
    bookChapterSeparator
  });
}
function formatChapterAndVerseWithOptionalParts(scrRef, chapterVerseSeparator) {
  const formattedVerse = scrRef.verseNum < 0 ? "" : `${chapterVerseSeparator ?? ":"}${scrRef.verseNum}`;
  return scrRef.chapterNum < 0 ? "" : `${scrRef.chapterNum}${formattedVerse}`;
}
function formatScrRefWithOptionalParts(scrRef, options) {
  const book = getBookNameFromVerseRef(scrRef, options == null ? void 0 : options.optionOrLocalizedBookName);
  const chapterAndVerse = formatChapterAndVerseWithOptionalParts(
    scrRef,
    options == null ? void 0 : options.chapterVerseSeparator
  );
  return `${book}${book && chapterAndVerse ? (options == null ? void 0 : options.bookChapterSeparator) ?? " " : ""}${chapterAndVerse}`;
}
function formatScrRefRange(startScrRef, endScrRef, options) {
  const formattedStartRef = formatScrRefWithOptionalParts(startScrRef, options);
  if (compareScrRefs(startScrRef, endScrRef) === 0) return formattedStartRef;
  const endRefBookName = startScrRef.book === endScrRef.book && !(options == null ? void 0 : options.repeatBookName) ? "" : (options == null ? void 0 : options.endRefOptionOrLocalizedBookName) ?? (options == null ? void 0 : options.optionOrLocalizedBookName);
  const formattedEndRef = formatScrRefWithOptionalParts(endScrRef, {
    ...options,
    optionOrLocalizedBookName: endRefBookName
  });
  return `${formattedStartRef}${(options == null ? void 0 : options.rangeSeparator) ?? " - "}${formattedEndRef}`;
}
var Section = /* @__PURE__ */ ((Section2) => {
  Section2["OT"] = "OT";
  Section2["NT"] = "NT";
  Section2["DC"] = "DC";
  Section2["Extra"] = "Extra";
  return Section2;
})(Section || {});
const getSectionForBook = (bookId) => {
  if (Canon.isBookOT(bookId)) return "OT";
  if (Canon.isBookNT(bookId)) return "NT";
  if (Canon.isBookDC(bookId)) return "DC";
  if (Canon.isExtraMaterial(bookId)) return "Extra";
  throw new Error(`Unknown section for book: ${bookId}`);
};
const nonSemanticWhiteSpaceRegex = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function isNonSemanticWhiteSpace(ch) {
  return nonSemanticWhiteSpaceRegex.test(ch);
}
const SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS = "‍       　​‌⁠‎‏";
const invisibleCharOrWhiteSpaceRegex = new RegExp(
  `^[${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]+$`,
  "u"
);
function isSelectableInvisibleCharOrWhiteSpace(ch) {
  return invisibleCharOrWhiteSpaceRegex.test(ch);
}
function normalizeScriptureSpaces(str) {
  let result = "";
  let lastCharWasSpace = false;
  let prevCh = "\0";
  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    if (ch.charCodeAt(0) < 32) {
      if (!lastCharWasSpace) result += " ";
      lastCharWasSpace = true;
    } else if (!lastCharWasSpace && ch === ZWSP && i + 1 < str.length && isNonSemanticWhiteSpace(str[i + 1])) ;
    else if (isNonSemanticWhiteSpace(ch)) {
      if (!lastCharWasSpace) result += ch;
      lastCharWasSpace = true;
    } else if (isSelectableInvisibleCharOrWhiteSpace(ch) && prevCh === ch) ;
    else {
      result += ch;
      lastCharWasSpace = false;
    }
    prevCh = ch;
  }
  return result;
}
function isUsjContentEmpty(content) {
  if (!content) return true;
  if (content.length === 0) return true;
  return content.length === 1 && (content[0] === void 0 || content[0] === "");
}
function trimEndOfGraphemes(graphemeString) {
  const { length } = graphemeString;
  let end = length;
  while (end > 0 && isWhiteSpace(graphemeString.charAt(end - 1))) end -= 1;
  if (end === length) return graphemeString.toString();
  return graphemeString.slice(0, end).toString();
}
function isAtEndOfBlockMarker(contentObject, parent) {
  if (!parent) return false;
  if (!BLOCK_MARKER_TYPES.includes(parent.type)) return false;
  if (!parent.content)
    throw new Error(
      `Parent ${JSON.stringify(parent)} of ${JSON.stringify(contentObject)} does not have a content array! This should not happen!`
    );
  if (contentObject !== parent.content[parent.content.length - 1]) return false;
  return true;
}
function normalizeScriptureSpacesTreatingNbspAsContent(str) {
  return str.split(NBSP).map(normalizeScriptureSpaces).join(NBSP);
}
function areUsjContentsEqualExceptWhitespaceInternal(a, aParent, b, bParent, ignoreDirectionMarks) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  const aIsString = isString(a);
  const bIsString = isString(b);
  if (aIsString && bIsString) {
    const aNormalized = normalizeScriptureSpacesTreatingNbspAsContent(
      ignoreDirectionMarks ? a.replace(DIRECTION_MARKS_REGEX, "") : a
    );
    const bNormalized = normalizeScriptureSpacesTreatingNbspAsContent(
      ignoreDirectionMarks ? b.replace(DIRECTION_MARKS_REGEX, "") : b
    );
    if (aNormalized !== bNormalized) {
      const aGraphemes = new GraphemeString(aNormalized);
      let bGraphemesCache;
      const bGraphemes = () => {
        bGraphemesCache ?? (bGraphemesCache = new GraphemeString(bNormalized));
        return bGraphemesCache;
      };
      if (!isWhiteSpace(aGraphemes.at(-1) ?? "") && !isWhiteSpace(bGraphemes().at(-1) ?? ""))
        return false;
      if (!isAtEndOfBlockMarker(a, aParent)) return false;
      if (!isAtEndOfBlockMarker(b, bParent)) return false;
      if (trimEndOfGraphemes(aGraphemes) !== trimEndOfGraphemes(bGraphemes())) return false;
    }
  } else if (!aIsString && !bIsString) {
    const aObject = a;
    const bObject = b;
    const aKeys = Object.keys(aObject).filter(
      (key) => key !== "content"
    );
    if (aKeys.length !== Object.keys(bObject).filter((key) => key !== "content").length)
      return false;
    if (aKeys.some((key) => !(key in bObject) || aObject[key] !== bObject[key])) return false;
    const isAContentEmpty = isUsjContentEmpty(aObject.content);
    const isBContentEmpty = isUsjContentEmpty(bObject.content);
    if (isAContentEmpty !== isBContentEmpty) return false;
    if (!isAContentEmpty && !isBContentEmpty) {
      let aContent = aObject.content;
      let bContent = bObject.content;
      const aLast = aContent[aContent.length - 1];
      if (BLOCK_MARKER_TYPES.includes(aObject.type) && isString(aLast) && isWhiteSpace(aLast))
        aContent = aContent.slice(0, -1);
      const bLast = bContent[bContent.length - 1];
      if (BLOCK_MARKER_TYPES.includes(bObject.type) && isString(bLast) && isWhiteSpace(bLast))
        bContent = bContent.slice(0, -1);
      if (aContent.length !== bContent.length) return false;
      for (let i = 0; i < aContent.length; i += 1) {
        if (!areUsjContentsEqualExceptWhitespaceInternal(
          aContent[i],
          aObject,
          bContent[i],
          bObject,
          ignoreDirectionMarks
        ))
          return false;
      }
    }
  } else {
    return false;
  }
  return true;
}
function areUsjContentsEqualExceptWhitespace(a, b, options) {
  return areUsjContentsEqualExceptWhitespaceInternal(
    a,
    void 0,
    b,
    void 0,
    (options == null ? void 0 : options.ignoreDirectionMarks) ?? false
  );
}
function collectUsjMarkers(usj) {
  const markers = [];
  const seen = /* @__PURE__ */ new Set();
  const visit = (content) => {
    if (!content) return;
    content.forEach((node) => {
      if (isString(node)) return;
      const { marker } = node;
      if (marker && !marker.startsWith("z") && !seen.has(marker)) {
        seen.add(marker);
        markers.push(marker);
      }
      visit(node.content);
    });
  };
  visit(usj == null ? void 0 : usj.content);
  return markers;
}
export {
  padStart as $,
  getLocalizeKeyForScrollGroupId as A,
  getLocalizeKeysForScrollGroupIds as B,
  getLocalizedIdFromBookNumber as C,
  DEBOUNCE_CANCELED_ERROR_MESSAGE as D,
  getSectionForBook as E,
  FIRST_SCR_BOOK_NUM as F,
  GraphemeString as G,
  groupBy as H,
  includes as I,
  indexOf as J,
  isErrorMessageAboutParatextBlockingInternetAccess as K,
  LAST_SCR_BOOK_NUM as L,
  MAX_PADDING_LENGTH as M,
  isErrorMessageAboutRegistryAuthFailure as N,
  isSelectableInvisibleCharOrWhiteSpace as O,
  isWhiteSpace as P,
  isolateBidi as Q,
  lastIndexOf as R,
  SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS as S,
  newGuid as T,
  normalize as U,
  normalizeScriptureSpaces as V,
  offsetBook as W,
  offsetChapter as X,
  offsetVerse as Y,
  ordinalCompare as Z,
  padEnd as _,
  isLocalizeKey as a,
  retryUntil as a0,
  scrRefToBBBCCC as a1,
  scrRefToBBBCCCVVV as a2,
  slice as a3,
  split as a4,
  startsWith as a5,
  stringLength as a6,
  substring as a7,
  toArray as a8,
  toKebabCase as a9,
  transformAndEnsureRegExpArray as aa,
  transformAndEnsureRegExpRegExpArray as ab,
  wait as ac,
  waitForDuration as ad,
  ALL_BOOK_IDS as ae,
  BOOKS_PRESENT_DEFAULT as af,
  DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS as ag,
  getBookIdsFromBooksPresent as ah,
  FIRST_SCR_CHAPTER_NUM as b,
  FIRST_SCR_VERSE_NUM as c,
  deepClone as d,
  Section as e,
  formatReplacementString as f,
  getErrorMessage as g,
  areUsjContentsEqualExceptWhitespace as h,
  isString as i,
  at as j,
  charAt as k,
  codePointAt as l,
  collapseMiddleWords as m,
  collectUsjMarkers as n,
  compareScrRefs as o,
  createSyncProxyForAsyncObject as p,
  debounce as q,
  defaultScrRef as r,
  endsWith as s,
  ensureArray as t,
  escapeStringRegexp as u,
  formatReplacementStringToArray as v,
  formatScrRef as w,
  formatScrRefRange as x,
  getAllObjectFunctionNames as y,
  getChaptersForBook as z
};
//# sourceMappingURL=scripture-util.js.map
