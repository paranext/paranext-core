var zr = Object.defineProperty;
var Jr = (t, e, n) => e in t ? zr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var W = (t, e, n) => Jr(t, typeof e != "symbol" ? e + "" : e, n);
import { Mutex as Xr } from "async-mutex";
import { JSONPath as Wt } from "jsonpath-plus";
class Pu {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, n = 1e4) {
    W(this, "variableName");
    W(this, "promiseToValue");
    W(this, "resolver");
    W(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((i, o) => {
      this.resolver = i, this.rejecter = o;
    }), n > 0 && setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.complete());
    }, n), Object.seal(this);
  }
  /**
   * Get this variable's promise to a value. This always returns the same promise even after the
   * value has been resolved or rejected.
   *
   * @returns The promise for the value to be set
   */
  get promise() {
    return this.promiseToValue;
  }
  /**
   * A simple way to see if this variable's promise was resolved or rejected already
   *
   * @returns Whether the variable was already resolved or rejected
   */
  get hasSettled() {
    return Object.isFrozen(this);
  }
  /**
   * Resolve this variable's promise to the given value
   *
   * @param value This variable's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  resolveToValue(e, n = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (n) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent resolution of ${this.variableName}`);
    }
  }
  /**
   * Reject this variable's promise for the value with the given reason
   *
   * @param reason This variable's promise will be rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected. Defaults to `false`
   */
  rejectWithReason(e, n = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
    else {
      if (n) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
class Lu {
  constructor(e, n) {
    W(this, "collator");
    this.collator = new Intl.Collator(e, n);
  }
  /**
   * Compares two strings according to the sort order of this Collator object
   *
   * @param string1 String to compare
   * @param string2 String to compare
   * @returns A number indicating how string1 and string2 compare to each other according to the
   *   sort order of this Collator object. Negative value if string1 comes before string2. Positive
   *   value if string1 comes after string2. 0 if they are considered equal.
   */
  compare(e, n) {
    return this.collator.compare(e, n);
  }
  /**
   * Returns a new object with properties reflecting the locale and collation options computed
   * during initialization of this collator object.
   *
   * @returns ResolvedCollatorOptions object
   */
  resolvedOptions() {
    return this.collator.resolvedOptions();
  }
}
class Yr {
  constructor(e, n) {
    W(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(e, n);
  }
  /**
   * Formats a date according to the locale and formatting option for this DateTimeFormat object
   *
   * @param date The date to format
   * @returns String representing the given date formatted according to the locale and formatting
   *   options of this DateTimeFormat object
   */
  format(e) {
    return this.dateTimeFormatter.format(e);
  }
  /**
   * Formats a date range in the most concise way based on the locales and options provided when
   * instantiating this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns String representing the given date range formatted according to the locale and
   *   formatting options of this DateTimeFormat object
   */
  formatRange(e, n) {
    return this.dateTimeFormatter.formatRange(e, n);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(e, n) {
    return this.dateTimeFormatter.formatRangeToParts(e, n);
  }
  /**
   * Allows locale-aware formatting of strings produced by this DateTimeFormat object
   *
   * @param date The date to format
   * @returns Array of DateTimeFormatPart objects
   */
  formatToParts(e) {
    return this.dateTimeFormatter.formatToParts(e);
  }
  /**
   * Returns a new object with properties reflecting the locale and date and time formatting options
   * computed during initialization of this DateTimeFormat object
   *
   * @returns ResolvedDateTimeFormatOptions object
   */
  resolvedOptions() {
    return this.dateTimeFormatter.resolvedOptions();
  }
}
class Kr {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    W(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    W(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    W(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    W(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    W(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    W(this, "emit", (e) => {
      this.emitFn(e);
    });
  }
  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   *
   * @param callback Function to run with the event when it is emitted
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  get event() {
    return this.assertNotDisposed(), this.lazyEvent || (this.lazyEvent = (e) => {
      if (!e || typeof e != "function")
        throw new Error("Event handler callback must be a function!");
      return this.subscriptions || (this.subscriptions = []), this.subscriptions.push(e), () => {
        if (!this.subscriptions) return !1;
        const n = this.subscriptions.indexOf(e);
        return n < 0 ? !1 : (this.subscriptions.splice(n, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(e) {
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((i) => i(e));
  }
  /** Check to make sure this emitter is not disposed. Throw if it is */
  assertNotDisposed() {
    if (this.isDisposed) throw new Error("Emitter is disposed");
  }
  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  disposeFn() {
    return this.assertNotDisposed(), this.isDisposed = !0, this.subscriptions = void 0, this.lazyEvent = void 0, Promise.resolve(!0);
  }
}
function Fu() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function qe(t) {
  return typeof t == "string" || t instanceof String;
}
function wt(t) {
  return JSON.parse(JSON.stringify(t));
}
function ku(t, e = 300) {
  if (qe(t)) throw new Error("Tried to debounce a string! Could be XSS");
  let n;
  return (...i) => {
    clearTimeout(n), n = setTimeout(() => t(...i), e);
  };
}
function qu(t, e, n) {
  const i = /* @__PURE__ */ new Map();
  return t.forEach((o) => {
    const a = e(o), h = i.get(a), f = n ? n(o, a) : o;
    h ? h.push(f) : i.set(a, [f]);
  }), i;
}
function Wr(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Qr(t) {
  if (Wr(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function Zr(t) {
  return Qr(t).message;
}
function en(t) {
  return new Promise((e) => setTimeout(e, t));
}
function $u(t, e) {
  const n = en(e).then(() => {
  });
  return Promise.any([n, t()]);
}
function ju(t, e = "obj") {
  const n = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((o) => {
    try {
      typeof t[o] == "function" && n.add(o);
    } catch {
    }
  });
  let i = Object.getPrototypeOf(t);
  for (; i && Object.getPrototypeOf(i); )
    Object.getOwnPropertyNames(i).forEach((o) => {
      try {
        typeof t[o] == "function" && n.add(o);
      } catch {
      }
    }), i = Object.getPrototypeOf(i);
  return n;
}
function Uu(t, e = {}) {
  return new Proxy(e, {
    get(n, i) {
      return i in n ? n[i] : async (...o) => (await t())[i](...o);
    }
  });
}
function Vu(t) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return qe(t) ? t.includes(e) : Zr(t).includes(e);
}
class tn {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, n) {
    W(this, "baseDocument");
    W(this, "contributions", /* @__PURE__ */ new Map());
    W(this, "latestOutput");
    W(this, "options");
    W(this, "onDidRebuildEmitter", new Kr());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    W(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = n, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? wt(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered indeterminate as it
   * depends on the order in which `Map.forEach` iterates over the contributions. However, the order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is is
   * `true`, the order also matters when adding the same property to an object that is already
   * provided previously. Please let us know if you have trouble because of indeterminate
   * contribution ordering.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, n) {
    this.validateContribution(e, n);
    const i = this.contributions.get(e);
    let o = this.options.copyDocuments && n ? wt(n) : n;
    o = this.transformContributionAfterValidation(e, o), this.contributions.set(e, o);
    try {
      return this.rebuild();
    } catch (a) {
      throw i ? this.contributions.set(e, i) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${a}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(e) {
    const n = this.contributions.get(e);
    if (!n) throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (i) {
      throw this.contributions.set(e, n), new Error(`Error when deleting the document named ${e}: ${i}`);
    }
  }
  /**
   * Delete all present contribution documents for the composition process and return to the base
   * document
   *
   * @returns Recalculated output document consisting only of the base document
   */
  deleteAllContributions() {
    if (this.contributions.size <= 0) return this.latestOutput;
    const e = [...this.contributions.entries()];
    e.forEach(([n]) => this.contributions.delete(n));
    try {
      return this.rebuild();
    } catch (n) {
      throw e.forEach(
        ([i, o]) => this.contributions.set(i, o)
      ), new Error(`Error when deleting all contributions: ${n}`);
    }
  }
  /**
   * Run the document composition process given the starting document and all contributions. Throws
   * if the output document fails to validate properly.
   *
   * @returns Recalculated output document given the starting and contributed documents
   */
  rebuild() {
    if (this.contributions.size === 0) {
      let n = wt(this.baseDocument);
      return n = this.transformFinalOutputBeforeValidation(n), this.validateOutput(n), this.latestOutput = n, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((n) => {
      e = rn(
        e,
        n,
        this.options.ignoreDuplicateProperties
      ), this.validateOutput(e);
    }), e = this.transformFinalOutputBeforeValidation(e), this.validateOutput(e), this.latestOutput = e, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
  }
  /**
   * Transform the starting document that is given to the combiner. This transformation occurs after
   * validating the base document and before combining any contributions.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the `baseDocument` passed in.
   *
   * @param baseDocument Initial input document. Already validated via `validateBaseDocument`
   * @returns Transformed base document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformBaseDocumentAfterValidation(e) {
    return e;
  }
  /**
   * Transform the contributed document associated with `documentName`. This transformation occurs
   * after validating the contributed document and before combining with other documents.
   *
   * WARNING: If you do not create the combiner with option `copyDocuments: true` or clone inside
   * this method, this method will directly modify the contributed `document` passed in.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine. Already validated via
   *   `validateContribution`
   * @returns Transformed contributed document
   */
  // We just don't need `this` here. This is basically a no-op function that is available to child
  // classes to override
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformContributionAfterValidation(e, n) {
    return n;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateBaseDocument(e) {
  }
  /**
   * Throw an error if the provided document is not a valid contribution document.
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateContribution(e, n) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateOutput(e) {
  }
  /**
   * Transform the document that is the composition of the base document and all contribution
   * documents. This is the last step that will be run prior to validation via `validateOutput`
   * before `this.latestOutput` is updated to the new output.
   *
   * @param finalOutput Final output document that could potentially be returned to callers. "Final"
   *   means no further contribution documents will be merged.
   */
  // no-op intended to be overridden by child classes. Can't be static
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  transformFinalOutputBeforeValidation(e) {
    return e;
  }
}
function Qt(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || Array.isArray(n)) && (e = !1);
  }), e;
}
function Zt(...t) {
  let e = !0;
  return t.forEach((n) => {
    (!n || typeof n != "object" || !Array.isArray(n)) && (e = !1);
  }), e;
}
function rn(t, e, n) {
  const i = wt(t);
  return e ? Ir(i, wt(e), n) : i;
}
function Ir(t, e, n) {
  if (!e) return t;
  if (Qt(t, e)) {
    const i = t, o = e;
    Object.keys(o).forEach((a) => {
      if (Object.hasOwn(i, a)) {
        if (Qt(i[a], o[a]))
          i[a] = Ir(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            i[a],
            o[a],
            n
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (Zt(i[a], o[a]))
          i[a] = i[a].concat(
            o[a]
          );
        else if (!n)
          throw new Error(`Cannot merge objects: key "${a}" already exists in the target object`);
      } else
        i[a] = o[a];
    });
  } else Zt(t, e) && t.push(...e);
  return t;
}
class nn extends Xr {
}
class Hu {
  constructor() {
    W(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let n = this.mutexesByID.get(e);
    return n || (n = new nn(), this.mutexesByID.set(e, n), n);
  }
}
class Gu extends tn {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, n) {
    super(e, n);
  }
  get output() {
    return this.latestOutput;
  }
}
class un {
  constructor(e, n) {
    W(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(e, n);
  }
  /**
   * Formats a number according to the locale and formatting options of this NumberFormat object
   *
   * @param value Number or BigInt to format
   * @returns String representing the given number formatted according to the locale and formatting
   *   options of this NumberFormat object
   */
  format(e) {
    return this.numberFormatter.format(e);
  }
  /**
   * Formats a range of numbers according to the locale and formatting options of this NumberFormat
   * object
   *
   * @param startRange Number or bigint representing the start of the range
   * @param endRange Number or bigint representing the end of the range
   * @returns String representing the given range of numbers formatted according to the locale and
   *   formatting options of this NumberFormat object
   */
  formatRange(e, n) {
    return this.numberFormatter.formatRange(e, n);
  }
  /**
   * Returns an array of objects containing the locale-specific tokens from which it is possible to
   * build custom strings while preserving the locale-specific parts.
   *
   * @param startRange Number or bigint representing start of the range
   * @param endRange Number or bigint representing end of the range
   * @returns Array of NumberRangeFormatPart objects containing the formatted range of numbers in
   *   parts
   */
  formatRangeToParts(e, n) {
    return this.numberFormatter.formatRangeToParts(e, n);
  }
  /**
   * Allows locale-aware formatting of strings produced by this NumberFormat object
   *
   * @param value Number or bigint to format
   * @returns Array of NumberFormatPart objects containing the formatted number in parts
   */
  formatToParts(e) {
    return this.numberFormatter.formatToParts(e);
  }
  /**
   * Returns a new object with properties reflecting the locale and number formatting options
   * computed during initialization of this NumberFormat object
   *
   * @returns ResolvedNumberFormatOptions object
   */
  resolvedOptions() {
    return this.numberFormatter.resolvedOptions();
  }
}
const on = Promise.resolve();
class zu {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(e = console) {
    W(this, "map", /* @__PURE__ */ new Map());
    W(this, "logger");
    this.logger = e;
  }
  /**
   * Adds a promise function to the map for a given key. If a promise is already running for the
   * key, the new promise will be chained to the existing one. Once all promises for a key have
   * settled, the map will be cleared for that key.
   *
   * @param key Unique key to identify a distinct promise chain
   * @param promiseFunction Function that returns a promise to add to the chain
   */
  addPromiseFunction(e, n) {
    const i = this.map.get(e);
    this.map.set(e, i ? i.then(n) : n()), this.cleanupPromiseChain(e);
  }
  /**
   * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
   * you should just call {@link addPromiseFunction} and let the map handle the rest.
   *
   * @param key Unique key to identify a distinct promise chain
   * @returns The current promise chain for the key
   */
  get(e) {
    return this.map.get(e);
  }
  /**
   * Configures a promise chain to be removed from the map for the given key after all the promises
   * have settled
   *
   * @param key Unique key to identify a distinct promise chain
   */
  cleanupPromiseChain(e) {
    const n = this.map.get(e);
    if (!n) return;
    const i = { promise: on }, o = n.catch((a) => this.logger.warn(`Error in promise for ${e}: ${a.message}`)).finally(() => {
      this.map.get(e) === i.promise && this.map.delete(e);
    });
    i.promise = o, this.map.set(e, o);
  }
}
class Ju {
  constructor(e = "Anonymous") {
    W(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((n) => {
      "dispose" in n ? this.unsubscribers.add(n.dispose) : this.unsubscribers.add(n);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((i) => i()), n = await Promise.all(e);
    return this.unsubscribers.clear(), n.every((i, o) => (i || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${o} failed!`), i));
  }
}
var an = Object.defineProperty, sn = (t, e, n) => e in t ? an(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, H = (t, e, n) => sn(t, typeof e != "symbol" ? e + "" : e, n);
const rt = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  // 10
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  // 20
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  // 30
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  // 40
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  // 50
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  // 60
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  // 70
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  // 80
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "JSA",
  // actual variant text for JOS, now in LXA text
  "JDB",
  // actual variant text for JDG, now in LXA text
  "TBS",
  // actual variant text for TOB, now in LXA text
  "SST",
  // actual variant text for SUS, now in LXA text // 90
  "DNT",
  // actual variant text for DAN, now in LXA text
  "BLT",
  // actual variant text for BEL, now in LXA text
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  // 100
  "BAK",
  "OTH",
  "3ES",
  // Used previously but really should be 2ES
  "EZA",
  // Used to be called 4ES, but not actually in any known project
  "5EZ",
  // Used to be called 5ES, but not actually in any known project
  "6EZ",
  // Used to be called 6ES, but not actually in any known project
  "INT",
  "CNC",
  "GLO",
  "TDX",
  // 110
  "NDX",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  // 120
  "REP",
  "4BA",
  "LAO"
], jt = [
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX"
], Rr = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther (Hebrew)",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel (Hebrew)",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
  "Tobit",
  "Judith",
  "Esther Greek",
  "Wisdom of Solomon",
  "Sirach (Ecclesiasticus)",
  "Baruch",
  "Letter of Jeremiah",
  "Song of 3 Young Men",
  "Susanna",
  "Bel and the Dragon",
  "1 Maccabees",
  "2 Maccabees",
  "3 Maccabees",
  "4 Maccabees",
  "1 Esdras (Greek)",
  "2 Esdras (Latin)",
  "Prayer of Manasseh",
  "Psalm 151",
  "Odes",
  "Psalms of Solomon",
  // WARNING, if you change the spelling of the *obsolete* tag be sure to update
  // IsObsolete routine
  "Joshua A. *obsolete*",
  "Judges B. *obsolete*",
  "Tobit S. *obsolete*",
  "Susanna Th. *obsolete*",
  "Daniel Th. *obsolete*",
  "Bel Th. *obsolete*",
  "Extra A",
  "Extra B",
  "Extra C",
  "Extra D",
  "Extra E",
  "Extra F",
  "Extra G",
  "Front Matter",
  "Back Matter",
  "Other Matter",
  "3 Ezra *obsolete*",
  "Apocalypse of Ezra",
  "5 Ezra (Latin Prologue)",
  "6 Ezra (Latin Epilogue)",
  "Introduction",
  "Concordance ",
  "Glossary ",
  "Topical Index",
  "Names Index",
  "Daniel Greek",
  "Psalms 152-155",
  "2 Baruch (Apocalypse)",
  "Letter of Baruch",
  "Jubilees",
  "Enoch",
  "1 Meqabyan",
  "2 Meqabyan",
  "3 Meqabyan",
  "Reproof (Proverbs 25-31)",
  "4 Baruch (Rest of Baruch)",
  "Laodiceans"
], er = Dn();
function gt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in er ? er[t] : 0;
}
function Ut(t) {
  return gt(t) > 0;
}
function cn(t) {
  const e = typeof t == "string" ? gt(t) : t;
  return e >= 40 && e <= 66;
}
function ln(t) {
  return (typeof t == "string" ? gt(t) : t) <= 39;
}
function xr(t) {
  return t <= 66;
}
function fn(t) {
  const e = typeof t == "string" ? gt(t) : t;
  return _r(e) && !xr(e);
}
function* pn() {
  for (let t = 1; t <= rt.length; t++) yield t;
}
const hn = 1, Mr = rt.length;
function dn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Vt(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= rt.length ? e : rt[n];
}
function Br(t) {
  return t <= 0 || t > Mr ? "******" : Rr[t - 1];
}
function mn(t) {
  return Br(gt(t));
}
function _r(t) {
  const e = typeof t == "number" ? Vt(t) : t;
  return Ut(e) && !jt.includes(e);
}
function En(t) {
  const e = typeof t == "number" ? Vt(t) : t;
  return Ut(e) && jt.includes(e);
}
function gn(t) {
  return Rr[t - 1].includes("*obsolete*");
}
function Dn() {
  const t = {};
  for (let e = 0; e < rt.length; e++)
    t[rt[e]] = e + 1;
  return t;
}
const Be = {
  allBookIds: rt,
  nonCanonicalIds: jt,
  bookIdToNumber: gt,
  isBookIdValid: Ut,
  isBookNT: cn,
  isBookOT: ln,
  isBookOTNT: xr,
  isBookDC: fn,
  allBookNumbers: pn,
  firstBook: hn,
  lastBook: Mr,
  extraBooks: dn,
  bookNumberToId: Vt,
  bookNumberToEnglishName: Br,
  bookIdToEnglishName: mn,
  isCanonical: _r,
  isExtraMaterial: En,
  isObsolete: gn
};
var _e = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(_e || {});
const Te = class {
  // private versInfo: Versification;
  constructor(e) {
    if (H(this, "name"), H(this, "fullPath"), H(this, "isPresent"), H(this, "hasVerseSegments"), H(this, "isCustomized"), H(this, "baseVersification"), H(this, "scriptureBooks"), H(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = _e[e]) : (this._type = e, this.name = _e[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
H(Te, "Original", new Te(_e.Original)), H(Te, "Septuagint", new Te(_e.Septuagint)), H(Te, "Vulgate", new Te(_e.Vulgate)), H(Te, "English", new Te(_e.English)), H(Te, "RussianProtestant", new Te(_e.RussianProtestant)), H(Te, "RussianOrthodox", new Te(_e.RussianOrthodox));
let He = Te;
function tr(t, e) {
  const n = e[0];
  for (let i = 1; i < e.length; i++)
    t = t.split(e[i]).join(n);
  return t.split(n);
}
var Pr = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Pr || {});
const ve = class X {
  constructor(e, n, i, o) {
    if (H(this, "firstChapter"), H(this, "lastChapter"), H(this, "lastVerse"), H(this, "hasSegmentsDefined"), H(this, "text"), H(this, "BBBCCCVVVS"), H(this, "longHashCode"), H(this, "versification"), H(this, "rtlMark", "‏"), H(this, "_bookNum", 0), H(this, "_chapterNum", 0), H(this, "_verseNum", 0), H(this, "_verse"), i == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, h = n != null && n instanceof He ? n : void 0;
        this.setEmpty(h), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof He ? n : void 0;
        this.setEmpty(a), this._verseNum = e % X.chapterDigitShifter, this._chapterNum = Math.floor(
          e % X.bookDigitShifter / X.chapterDigitShifter
        ), this._bookNum = Math.floor(e / X.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof X) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof He ? e : X.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && i != null)
      if (typeof e == "string" && typeof n == "string" && typeof i == "string")
        this.setEmpty(o), this.updateInternal(e, n, i);
      else if (typeof e == "number" && typeof n == "number" && typeof i == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = i, this.versification = o ?? X.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let n;
    try {
      return n = new X(e), { success: !0, verseRef: n };
    } catch (i) {
      if (i instanceof Ct)
        return n = new X(), { success: !1, verseRef: n };
      throw i;
    }
  }
  /**
   * Gets the reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   * @param bookNum - Book number (this is 1-based, not an index).
   * @param chapterNum - Chapter number.
   * @param verseNum - Verse number.
   * @returns The reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   */
  static getBBBCCCVVV(e, n, i) {
    return e % X.bcvMaxValue * X.bookDigitShifter + (n >= 0 ? n % X.bcvMaxValue * X.chapterDigitShifter : 0) + (i >= 0 ? i % X.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: i, verseNum: o, verse: a, versificationStr: h } = e, f = a || o.toString();
    let p;
    return h && (p = new He(h)), n ? new X(n, i.toString(), f, p) : new X();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let i;
    for (let o = 0; o < e.length; o++) {
      if (i = e[o], i < "0" || i > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +i - 0, n > X.bcvMaxValue)
        return n = -1, { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return this.bookNum === 0 && this.chapterNum === 0 && this.verseNum === 0 && this.versification == null;
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return this._verse != null && (this._verse.includes(X.verseRangeSeparator) || this._verse.includes(X.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Be.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Be.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: i } = X.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = i, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = X.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Be.lastBook)
      throw new Ct(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = e;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new He(e) : void 0;
  }
  /**
   * Determines if the reference is valid.
   */
  get valid() {
    return this.validStatus === 0;
  }
  /**
   * Get the valid status for this reference.
   */
  get validStatus() {
    return this.validateVerse(X.verseRangeSeparators, X.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return X.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return X.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  /**
   * Gets whether the verse is defined as an excluded verse in the versification.
   * Does not handle verse ranges.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isExcluded() {
    return !1;
  }
  /**
   * Parses the reference in the specified string.
   * Optionally versification can follow reference as in GEN 3:11/4
   * Throw an exception if
   * - invalid book name
   * - chapter number is missing or not a number
   * - verse number is missing or does not start with a number
   * - versification is invalid
   * @param verseStr - string to parse e.g. 'MAT 3:11'
   */
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const a = e.split("/");
      if (e = a[0], a.length > 1)
        try {
          const h = +a[1].trim();
          this.versification = new He(_e[h]);
        } catch {
          throw new Ct("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ct("Invalid reference : " + e);
    const i = n[1].split(":"), o = +i[0];
    if (i.length !== 2 || Be.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !X.isVerseParseable(i[1]))
      throw new Ct("Invalid reference : " + e);
    this.updateInternal(n[0], i[0], i[1]);
  }
  /**
   * Simplifies this verse ref so that it has no bridging of verses or
   * verse segments like `'1a'`.
   */
  simplify() {
    this._verse = void 0;
  }
  /**
   * Makes a clone of the reference.
   *
   * @returns The cloned VerseRef.
   */
  clone() {
    return new X(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof X ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
  }
  /**
   * Enumerate all individual verses contained in a VerseRef.
   * Verse ranges are indicated by "-" and consecutive verses by ","s.
   * Examples:
   * GEN 1:2 returns GEN 1:2
   * GEN 1:1a-3b,5 returns GEN 1:1a, GEN 1:2, GEN 1:3b, GEN 1:5
   * GEN 1:2a-2c returns //! ??????
   *
   * @param specifiedVersesOnly - if set to <c>true</c> return only verses that are
   * explicitly specified only, not verses within a range. Defaults to `false`.
   * @param verseRangeSeparators - Verse range separators.
   * Defaults to `VerseRef.verseRangeSeparators`.
   * @param verseSequenceSeparators - Verse sequence separators.
   * Defaults to `VerseRef.verseSequenceIndicators`.
   * @returns An array of all single verse references in this VerseRef.
   */
  allVerses(e = !1, n = X.verseRangeSeparators, i = X.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = tr(this._verse, i);
    for (const h of a.map((f) => tr(f, n))) {
      const f = this.clone();
      f.verse = h[0];
      const p = f.verseNum;
      if (o.push(f), h.length > 1) {
        const m = this.clone();
        if (m.verse = h[1], !e)
          for (let E = p + 1; E < m.verseNum; E++) {
            const l = new X(
              this._bookNum,
              this._chapterNum,
              E,
              this.versification
            );
            this.isExcluded || o.push(l);
          }
        o.push(m);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let i = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const h = o.BBBCCCVVV;
      if (i > h)
        return 3;
      if (i === h)
        return 4;
      i = h;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Be.lastBook ? 2 : (Be.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = X.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, i) {
    this.bookNum = Be.bookIdToNumber(e), this.chapter = n, this.verse = i;
  }
};
H(ve, "defaultVersification", He.English), H(ve, "verseRangeSeparator", "-"), H(ve, "verseSequenceIndicator", ","), H(ve, "verseRangeSeparators", [ve.verseRangeSeparator]), H(ve, "verseSequenceIndicators", [ve.verseSequenceIndicator]), H(ve, "chapterDigitShifter", 1e3), H(ve, "bookDigitShifter", ve.chapterDigitShifter * ve.chapterDigitShifter), H(ve, "bcvMaxValue", ve.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
H(ve, "ValidStatusType", Pr);
let Ht = ve;
class Ct extends Error {
}
var z = {}, fe = {}, rr;
function Dt() {
  if (rr) return fe;
  rr = 1;
  function t(x, F, q) {
    if (q === void 0 && (q = Array.prototype), x && typeof q.find == "function")
      return q.find.call(x, F);
    for (var ue = 0; ue < x.length; ue++)
      if (n(x, ue)) {
        var he = x[ue];
        if (F.call(void 0, he, ue, x))
          return he;
      }
  }
  function e(x, F) {
    return F === void 0 && (F = Object), F && typeof F.getOwnPropertyDescriptors == "function" && (x = F.create(null, F.getOwnPropertyDescriptors(x))), F && typeof F.freeze == "function" ? F.freeze(x) : x;
  }
  function n(x, F) {
    return Object.prototype.hasOwnProperty.call(x, F);
  }
  function i(x, F) {
    if (x === null || typeof x != "object")
      throw new TypeError("target is not an object");
    for (var q in F)
      n(F, q) && (x[q] = F[q]);
    return x;
  }
  var o = e({
    allowfullscreen: !0,
    async: !0,
    autofocus: !0,
    autoplay: !0,
    checked: !0,
    controls: !0,
    default: !0,
    defer: !0,
    disabled: !0,
    formnovalidate: !0,
    hidden: !0,
    ismap: !0,
    itemscope: !0,
    loop: !0,
    multiple: !0,
    muted: !0,
    nomodule: !0,
    novalidate: !0,
    open: !0,
    playsinline: !0,
    readonly: !0,
    required: !0,
    reversed: !0,
    selected: !0
  });
  function a(x) {
    return n(o, x.toLowerCase());
  }
  var h = e({
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });
  function f(x) {
    return n(h, x.toLowerCase());
  }
  var p = e({
    script: !1,
    style: !1,
    textarea: !0,
    title: !0
  });
  function m(x) {
    var F = x.toLowerCase();
    return n(p, F) && !p[F];
  }
  function E(x) {
    var F = x.toLowerCase();
    return n(p, F) && p[F];
  }
  function l(x) {
    return x === w.HTML;
  }
  function v(x) {
    return l(x) || x === w.XML_XHTML_APPLICATION;
  }
  var w = e({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
     *      WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
     *      registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/html`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
     *      registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  }), b = Object.keys(w).map(function(x) {
    return w[x];
  });
  function C(x) {
    return b.indexOf(x) > -1;
  }
  var k = e({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace.
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  return fe.assign = i, fe.find = t, fe.freeze = e, fe.HTML_BOOLEAN_ATTRIBUTES = o, fe.HTML_RAW_TEXT_ELEMENTS = p, fe.HTML_VOID_ELEMENTS = h, fe.hasDefaultHTMLNamespace = v, fe.hasOwn = n, fe.isHTMLBooleanAttribute = a, fe.isHTMLRawTextElement = m, fe.isHTMLEscapableRawTextElement = E, fe.isHTMLMimeType = l, fe.isHTMLVoidElement = f, fe.isValidMimeType = C, fe.MIME_TYPE = w, fe.NAMESPACE = k, fe;
}
var dt = {}, nr;
function Mt() {
  if (nr) return dt;
  nr = 1;
  var t = Dt();
  function e(v, w) {
    v.prototype = Object.create(Error.prototype, {
      constructor: { value: v },
      name: { value: v.name, enumerable: !0, writable: w }
    });
  }
  var n = t.freeze({
    /**
     * the default value as defined by the spec
     */
    Error: "Error",
    /**
     * @deprecated
     * Use RangeError instead.
     */
    IndexSizeError: "IndexSizeError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    /**
     * @deprecated
     * Use TypeError for invalid arguments,
     * "NotSupportedError" DOMException for unsupported operations,
     * and "NotAllowedError" DOMException for denied requests instead.
     */
    InvalidAccessError: "InvalidAccessError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    ValidationError: "ValidationError",
    /**
     * @deprecated
     * Use TypeError instead.
     */
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  }), i = Object.keys(n);
  function o(v) {
    return typeof v == "number" && v >= 1 && v <= 25;
  }
  function a(v) {
    return typeof v == "string" && v.substring(v.length - n.Error.length) === n.Error;
  }
  function h(v, w) {
    o(v) ? (this.name = i[v], this.message = w || "") : (this.message = v, this.name = a(w) ? w : n.Error), Error.captureStackTrace && Error.captureStackTrace(this, h);
  }
  e(h, !0), Object.defineProperties(h.prototype, {
    code: {
      enumerable: !0,
      get: function() {
        var v = i.indexOf(this.name);
        return o(v) ? v : 0;
      }
    }
  });
  for (var f = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  }, p = Object.entries(f), m = 0; m < p.length; m++) {
    var E = p[m][0];
    h[E] = p[m][1];
  }
  function l(v, w) {
    this.message = v, this.locator = w, Error.captureStackTrace && Error.captureStackTrace(this, l);
  }
  return e(l), dt.DOMException = h, dt.DOMExceptionName = n, dt.ExceptionCode = f, dt.ParseError = l, dt;
}
var ne = {}, j = {}, ur;
function Lr() {
  if (ur) return j;
  ur = 1;
  function t(Z) {
    try {
      typeof Z != "function" && (Z = RegExp);
      var ae = new Z("𝌆", "u").exec("𝌆");
      return !!ae && ae[0].length === 2;
    } catch {
    }
    return !1;
  }
  var e = t();
  function n(Z) {
    if (Z.source[0] !== "[")
      throw new Error(Z + " can not be used with chars");
    return Z.source.slice(1, Z.source.lastIndexOf("]"));
  }
  function i(Z, ae) {
    if (Z.source[0] !== "[")
      throw new Error("/" + Z.source + "/ can not be used with chars_without");
    if (!ae || typeof ae != "string")
      throw new Error(JSON.stringify(ae) + " is not a valid search");
    if (Z.source.indexOf(ae) === -1)
      throw new Error('"' + ae + '" is not is /' + Z.source + "/");
    if (ae === "-" && Z.source.indexOf(ae) !== 1)
      throw new Error('"' + ae + '" is not at the first postion of /' + Z.source + "/");
    return new RegExp(Z.source.replace(ae, ""), e ? "u" : "");
  }
  function o(Z) {
    var ae = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(Ve) {
        var Nt = typeof Ve == "string";
        if (Nt && ae === void 0 && Ve === "|")
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        return Nt ? Ve : Ve.source;
      }).join(""),
      e ? "mu" : "m"
    );
  }
  function a(Z) {
    if (arguments.length === 0)
      throw new Error("no parameters provided");
    return o.apply(a, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var h = "�", f = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  e && (f = o("[", n(f), "\\u{10000}-\\u{10FFFF}", "]"));
  var p = /[\x20\x09\x0D\x0A]/, m = n(p), E = o(p, "+"), l = o(p, "*"), v = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  e && (v = o("[", n(v), "\\u{10000}-\\u{10FFFF}", "]"));
  var w = n(v), b = o("[", w, n(/[-.0-9\xB7]/), n(/[\u0300-\u036F\u203F-\u2040]/), "]"), C = o(v, b, "*"), k = o(b, "+"), x = o("&", C, ";"), F = a(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), q = a(x, "|", F), ue = o("%", C, ";"), he = a(
    o('"', a(/[^%&"]/, "|", ue, "|", q), "*", '"'),
    "|",
    o("'", a(/[^%&']/, "|", ue, "|", q), "*", "'")
  ), D = a('"', a(/[^<&"]/, "|", q), "*", '"', "|", "'", a(/[^<&']/, "|", q), "*", "'"), R = i(v, ":"), L = i(b, ":"), V = o(R, L, "*"), Y = o(V, a(":", V), "?"), ee = o("^", Y, "$"), we = o("(", Y, ")"), te = a(/"[^"]*"|'[^']*'/), Re = o(/^<\?/, "(", C, ")", a(E, "(", f, "*?)"), "?", /\?>/), d = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, A = a('"', d, '*"', "|", "'", i(d, "'"), "*'"), S = "<!--", O = "-->", B = o(S, a(i(f, "-"), "|", o("-", i(f, "-"))), "*", O), N = "#PCDATA", M = a(
    o(/\(/, l, N, a(l, /\|/, l, Y), "*", l, /\)\*/),
    "|",
    o(/\(/, l, N, l, /\)/)
  ), G = /[?*+]?/, _ = o(
    /\([^>]+\)/,
    G
    /*regg(choice, '|', seq), _children_quantity*/
  ), y = a("EMPTY", "|", "ANY", "|", M, "|", _), I = "<!ELEMENT", P = o(I, E, a(Y, "|", ue), E, a(y, "|", ue), l, ">"), re = o("NOTATION", E, /\(/, l, C, a(l, /\|/, l, C), "*", l, /\)/), K = o(/\(/, l, k, a(l, /\|/, l, k), "*", l, /\)/), Ce = a(re, "|", K), ye = a(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", Ce), se = a(/#REQUIRED|#IMPLIED/, "|", a(a("#FIXED", E), "?", D)), oe = a(E, C, E, ye, E, se), $ = "<!ATTLIST", ze = o($, E, C, oe, "*", l, ">"), Ae = "SYSTEM", ce = "PUBLIC", xe = a(a(Ae, E, te), "|", a(ce, E, A, E, te)), Pe = o(
    "^",
    a(
      a(Ae, E, "(?<SystemLiteralOnly>", te, ")"),
      "|",
      a(ce, E, "(?<PubidLiteral>", A, ")", E, "(?<SystemLiteral>", te, ")")
    )
  ), it = a(E, "NDATA", E, C), $e = a(he, "|", a(xe, it, "?")), je = "<!ENTITY", ot = o(je, E, C, E, $e, l, ">"), Q = a(he, "|", xe), ge = o(je, E, "%", E, C, E, Q, l, ">"), le = a(ot, "|", ge), Je = o(ce, E, A), at = o("<!NOTATION", E, C, E, a(xe, "|", Je), l, ">"), Le = o(l, "=", l), Xe = /1[.]\d+/, U = o(E, "version", Le, a("'", Xe, "'", "|", '"', Xe, '"')), ie = /[A-Za-z][-A-Za-z0-9._]*/, De = a(E, "encoding", Le, a('"', ie, '"', "|", "'", ie, "'")), Ne = a(E, "standalone", Le, a("'", a("yes", "|", "no"), "'", "|", '"', a("yes", "|", "no"), '"')), Ue = o(/^<\?xml/, U, De, "?", Ne, "?", l, /\?>/), Ye = "<!DOCTYPE", st = "<![CDATA[", ct = "]]>", lt = /<!\[CDATA\[/, vt = /\]\]>/, At = o(f, "*?", vt), ft = o(lt, At);
  return j.chars = n, j.chars_without = i, j.detectUnicodeSupport = t, j.reg = o, j.regg = a, j.AttlistDecl = ze, j.CDATA_START = st, j.CDATA_END = ct, j.CDSect = ft, j.Char = f, j.Comment = B, j.COMMENT_START = S, j.COMMENT_END = O, j.DOCTYPE_DECL_START = Ye, j.elementdecl = P, j.EntityDecl = le, j.EntityValue = he, j.ExternalID = xe, j.ExternalID_match = Pe, j.Name = C, j.NotationDecl = at, j.Reference = q, j.PEReference = ue, j.PI = Re, j.PUBLIC = ce, j.PubidLiteral = A, j.QName = Y, j.QName_exact = ee, j.QName_group = we, j.S = E, j.SChar_s = m, j.S_OPT = l, j.SYSTEM = Ae, j.SystemLiteral = te, j.UNICODE_REPLACEMENT_CHARACTER = h, j.UNICODE_SUPPORT = e, j.XMLDecl = Ue, j;
}
var ir;
function Fr() {
  if (ir) return ne;
  ir = 1;
  var t = Dt(), e = t.find, n = t.hasDefaultHTMLNamespace, i = t.hasOwn, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, h = t.isHTMLVoidElement, f = t.MIME_TYPE, p = t.NAMESPACE, m = Symbol(), E = Mt(), l = E.DOMException, v = E.DOMExceptionName, w = Lr();
  function b(r) {
    if (r !== m)
      throw new TypeError("Illegal constructor");
  }
  function C(r) {
    return r !== "";
  }
  function k(r) {
    return r ? r.split(/[\t\n\f\r ]+/).filter(C) : [];
  }
  function x(r, u) {
    return i(r, u) || (r[u] = !0), r;
  }
  function F(r) {
    if (!r) return [];
    var u = k(r);
    return Object.keys(u.reduce(x, {}));
  }
  function q(r) {
    return function(u) {
      return r && r.indexOf(u) !== -1;
    };
  }
  function ue(r) {
    if (!w.QName_exact.test(r))
      throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + r + '"');
  }
  function he(r, u) {
    ue(u), r = r || null;
    var s = null, c = u;
    if (u.indexOf(":") >= 0) {
      var g = u.split(":");
      s = g[0], c = g[1];
    }
    if (s !== null && r === null)
      throw new l(l.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    if (s === "xml" && r !== t.NAMESPACE.XML)
      throw new l(l.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    if ((s === "xmlns" || u === "xmlns") && r !== t.NAMESPACE.XMLNS)
      throw new l(
        l.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    if (r === t.NAMESPACE.XMLNS && s !== "xmlns" && u !== "xmlns")
      throw new l(
        l.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    return [r, s, c];
  }
  function D(r, u) {
    for (var s in r)
      i(r, s) && (u[s] = r[s]);
  }
  function R(r, u) {
    var s = r.prototype;
    if (!(s instanceof u)) {
      let c = function() {
      };
      c.prototype = u.prototype, c = new c(), D(s, c), r.prototype = s = c;
    }
    s.constructor != r && (typeof r != "function" && console.error("unknown Class:" + r), s.constructor = r);
  }
  var L = {}, V = L.ELEMENT_NODE = 1, Y = L.ATTRIBUTE_NODE = 2, ee = L.TEXT_NODE = 3, we = L.CDATA_SECTION_NODE = 4, te = L.ENTITY_REFERENCE_NODE = 5, Re = L.ENTITY_NODE = 6, d = L.PROCESSING_INSTRUCTION_NODE = 7, A = L.COMMENT_NODE = 8, S = L.DOCUMENT_NODE = 9, O = L.DOCUMENT_TYPE_NODE = 10, B = L.DOCUMENT_FRAGMENT_NODE = 11, N = L.NOTATION_NODE = 12, M = t.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function G(r) {
    for (var u = []; r.parentNode || r.ownerElement; )
      r = r.parentNode || r.ownerElement, u.unshift(r);
    return u;
  }
  function _(r, u) {
    if (u.length < r.length) return _(u, r);
    var s = null;
    for (var c in r) {
      if (r[c] !== u[c]) return s;
      s = r[c];
    }
    return s;
  }
  function y(r) {
    return r.guid || (r.guid = Math.random()), r.guid;
  }
  function I() {
  }
  I.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1
     * inclusive.
     *
     * @type {number}
     */
    length: 0,
    /**
     * Returns the item at `index`. If index is greater than or equal to the number of nodes in
     * the list, this returns null.
     *
     * @param index
     * Unsigned long Index into the collection.
     * @returns {Node | null}
     * The node at position `index` in the NodeList,
     * or null if that is not a valid index.
     */
    item: function(r) {
      return r >= 0 && r < this.length ? this[r] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(r) {
      for (var u = [], s = 0; s < this.length; s++)
        pt(this[s], u, r);
      return u.join("");
    },
    /**
     * Filters the NodeList based on a predicate.
     *
     * @param {function(Node): boolean} predicate
     * - A predicate function to filter the NodeList.
     * @returns {Node[]}
     * An array of nodes that satisfy the predicate.
     * @private
     */
    filter: function(r) {
      return Array.prototype.filter.call(this, r);
    },
    /**
     * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
     * not present.
     *
     * @param {Node} item
     * - The Node item to locate in the NodeList.
     * @returns {number}
     * The first index of the node in the NodeList; -1 if not found.
     * @private
     */
    indexOf: function(r) {
      return Array.prototype.indexOf.call(this, r);
    }
  }, I.prototype[Symbol.iterator] = function() {
    var r = this, u = 0;
    return {
      next: function() {
        return u < r.length ? {
          value: r[u++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function P(r, u) {
    this._node = r, this._refresh = u, re(this);
  }
  function re(r) {
    var u = r._node._inc || r._node.ownerDocument._inc;
    if (r._inc !== u) {
      var s = r._refresh(r._node);
      if (Yt(r, "length", s.length), !r.$$length || s.length < r.$$length)
        for (var c = s.length; c in r; c++)
          i(r, c) && delete r[c];
      D(s, r), r._inc = u;
    }
  }
  P.prototype.item = function(r) {
    return re(this), this[r] || null;
  }, R(P, I);
  function K() {
  }
  function Ce(r, u) {
    for (var s = 0; s < r.length; ) {
      if (r[s] === u)
        return s;
      s++;
    }
  }
  function ye(r, u, s, c) {
    if (c ? u[Ce(u, c)] = s : (u[u.length] = s, u.length++), r) {
      s.ownerElement = r;
      var g = r.ownerDocument;
      g && (c && Pe(g, r, c), xe(g, r, s));
    }
  }
  function se(r, u, s) {
    var c = Ce(u, s);
    if (c >= 0) {
      for (var g = u.length - 1; c <= g; )
        u[c] = u[++c];
      if (u.length = g, r) {
        var T = r.ownerDocument;
        T && Pe(T, r, s), s.ownerElement = null;
      }
    }
  }
  K.prototype = {
    length: 0,
    item: I.prototype.item,
    /**
     * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
     * document.
     *
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given local name, or null if no such attribute exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
     */
    getNamedItem: function(r) {
      this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase());
      for (var u = 0; u < this.length; ) {
        var s = this[u];
        if (s.nodeName === r)
          return s;
        u++;
      }
      return null;
    },
    /**
     * Set an attribute.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * With code:
     * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
     * element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItem: function(r) {
      var u = r.ownerElement;
      if (u && u !== this._ownerElement)
        throw new l(l.INUSE_ATTRIBUTE_ERR);
      var s = this.getNamedItemNS(r.namespaceURI, r.localName);
      return s === r ? r : (ye(this._ownerElement, this, r, s), s);
    },
    /**
     * Set an attribute, replacing an existing attribute with the same local name and namespace
     * URI if one exists.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
     * attribute of another element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItemNS: function(r) {
      return this.setNamedItem(r);
    },
    /**
     * Removes an attribute specified by the local name.
     *
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
     */
    removeNamedItem: function(r) {
      var u = this.getNamedItem(r);
      if (!u)
        throw new l(l.NOT_FOUND_ERR, r);
      return se(this._ownerElement, this, u), u;
    },
    /**
     * Removes an attribute specified by the namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute to be removed.
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
     * name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
     */
    removeNamedItemNS: function(r, u) {
      var s = this.getNamedItemNS(r, u);
      if (!s)
        throw new l(l.NOT_FOUND_ERR, r ? r + " : " + u : u);
      return se(this._ownerElement, this, s), s;
    },
    /**
     * Get an attribute by namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute.
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given namespace URI and local name, or null if no such attribute
     * exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
     */
    getNamedItemNS: function(r, u) {
      r || (r = null);
      for (var s = 0; s < this.length; ) {
        var c = this[s];
        if (c.localName === u && c.namespaceURI === r)
          return c;
        s++;
      }
      return null;
    }
  }, K.prototype[Symbol.iterator] = function() {
    var r = this, u = 0;
    return {
      next: function() {
        return u < r.length ? {
          value: r[u++],
          done: !1
        } : {
          done: !0
        };
      },
      return: function() {
        return {
          done: !0
        };
      }
    };
  };
  function oe() {
  }
  oe.prototype = {
    /**
     * Test if the DOM implementation implements a specific feature and version, as specified in
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
     *
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
     * feature is supported. The different implementations fairly diverged in what kind of
     * features were reported. The latest version of the spec settled to force this method to
     * always return true, where the functionality was accurate and in use.
     *
     * @deprecated
     * It is deprecated and modern browsers return true in all cases.
     * @function DOMImplementation#hasFeature
     * @param {string} feature
     * The name of the feature to test.
     * @param {string} [version]
     * This is the version number of the feature to test.
     * @returns {boolean}
     * Always returns true.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
     */
    hasFeature: function(r, u) {
      return !0;
    },
    /**
     * Creates a DOM Document object of the specified type with its document element. Note that
     * based on the {@link DocumentType}
     * given to create the document, the implementation may instantiate specialized
     * {@link Document} objects that support additional features than the "Core", such as "HTML"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
     * On the other hand, setting the {@link DocumentType} after the document was created makes
     * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
     * such as createHTMLDocument
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
     * can be used to obtain specific types of {@link Document} objects.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document`
     * instance (with it's `type` set to `'xml'`).
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @function DOMImplementation.createDocument
     * @param {string | null} namespaceURI
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
     * of the document element to create or null.
     * @param {string | null} qualifiedName
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
     * of the document element to be created or null.
     * @param {DocumentType | null} [doctype=null]
     * The type of document to be created or null. When doctype is not null, its
     * {@link Node#ownerDocument} attribute is set to the document being created. Default is
     * `null`
     * @returns {Document}
     * A new {@link Document} object with its document element. If the NamespaceURI,
     * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
     * document element.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
     * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
     * is different from null, or if the qualifiedName has a prefix that is "xml" and the
     * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
     * or if the DOM implementation does not support the "XML" feature but a non-null namespace
     * URI was provided, since namespaces were defined by XML.
     * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
     * or was created from a different implementation.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see {@link #createHTMLDocument}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 2 Core (initial)
     */
    createDocument: function(r, u, s) {
      var c = f.XML_APPLICATION;
      r === p.HTML ? c = f.XML_XHTML_APPLICATION : r === p.SVG && (c = f.XML_SVG_IMAGE);
      var g = new ce(m, { contentType: c });
      if (g.implementation = this, g.childNodes = new I(), g.doctype = s || null, s && g.appendChild(s), u) {
        var T = g.createElementNS(r, u);
        g.appendChild(T);
      }
      return g;
    },
    /**
     * Creates an empty DocumentType node. Entity declarations and notations are not made
     * available. Entity reference expansions and default attribute additions do not occur.
     *
     * **This behavior is slightly different from the one in the specs**:
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - `publicId` and `systemId` contain the raw data including any possible quotes,
     *   so they can always be serialized back to the original value
     * - `internalSubset` contains the raw string between `[` and `]` if present,
     *   but is not parsed or validated in any form.
     *
     * @function DOMImplementation#createDocumentType
     * @param {string} qualifiedName
     * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
     * name} of the document type to be created.
     * @param {string} [publicId]
     * The external subset public identifier.
     * @param {string} [systemId]
     * The external subset system identifier.
     * @param {string} [internalSubset]
     * the internal subset or an empty string if it is not present
     * @returns {DocumentType}
     * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
     *      MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
     *      Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
     *      Level 2 Core
     * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
     * @prettierignore
     */
    createDocumentType: function(r, u, s, c) {
      ue(r);
      var g = new lt(m);
      return g.name = r, g.nodeName = r, g.publicId = u || "", g.systemId = s || "", g.internalSubset = c || "", g.childNodes = new I(), g;
    },
    /**
     * Returns an HTML document, that might already have a basic DOM structure.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
     * omitted)
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @param {string | false} [title]
     * A string containing the title to give the new HTML document.
     * @returns {Document}
     * The HTML document.
     * @since WHATWG Living Standard.
     * @see {@link #createDocument}
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
     * @see https://dom.spec.whatwg.org/#html-document
     */
    createHTMLDocument: function(r) {
      var u = new ce(m, { contentType: f.HTML });
      if (u.implementation = this, u.childNodes = new I(), r !== !1) {
        u.doctype = this.createDocumentType("html"), u.doctype.ownerDocument = u, u.appendChild(u.doctype);
        var s = u.createElement("html");
        u.appendChild(s);
        var c = u.createElement("head");
        if (s.appendChild(c), typeof r == "string") {
          var g = u.createElement("title");
          g.appendChild(u.createTextNode(r)), c.appendChild(g);
        }
        s.appendChild(u.createElement("body"));
      }
      return u;
    }
  };
  function $(r) {
    b(r);
  }
  $.prototype = {
    /**
     * The first child of this node.
     *
     * @type {Node | null}
     */
    firstChild: null,
    /**
     * The last child of this node.
     *
     * @type {Node | null}
     */
    lastChild: null,
    /**
     * The previous sibling of this node.
     *
     * @type {Node | null}
     */
    previousSibling: null,
    /**
     * The next sibling of this node.
     *
     * @type {Node | null}
     */
    nextSibling: null,
    /**
     * The parent node of this node.
     *
     * @type {Node | null}
     */
    parentNode: null,
    /**
     * The parent element of this node.
     *
     * @type {Element | null}
     */
    get parentElement() {
      return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
    },
    /**
     * The child nodes of this node.
     *
     * @type {NodeList}
     */
    childNodes: null,
    /**
     * The document object associated with this node.
     *
     * @type {Document | null}
     */
    ownerDocument: null,
    /**
     * The value of this node.
     *
     * @type {string | null}
     */
    nodeValue: null,
    /**
     * The namespace URI of this node.
     *
     * @type {string | null}
     */
    namespaceURI: null,
    /**
     * The prefix of the namespace for this node.
     *
     * @type {string | null}
     */
    prefix: null,
    /**
     * The local part of the qualified name of this node.
     *
     * @type {string | null}
     */
    localName: null,
    /**
     * The baseURI is currently always `about:blank`,
     * since that's what happens when you create a document from scratch.
     *
     * @type {'about:blank'}
     */
    baseURI: "about:blank",
    /**
     * Is true if this node is part of a document.
     *
     * @type {boolean}
     */
    get isConnected() {
      var r = this.getRootNode();
      return r && r.nodeType === r.DOCUMENT_NODE;
    },
    /**
     * Checks whether `other` is an inclusive descendant of this node.
     *
     * @param {Node | null | undefined} other
     * The node to check.
     * @returns {boolean}
     * True if `other` is an inclusive descendant of this node; false otherwise.
     * @see https://dom.spec.whatwg.org/#dom-node-contains
     */
    contains: function(r) {
      if (!r) return !1;
      var u = r;
      do {
        if (this === u) return !0;
        u = r.parentNode;
      } while (u);
      return !1;
    },
    /**
     * @typedef GetRootNodeOptions
     * @property {boolean} [composed=false]
     */
    /**
     * Searches for the root node of this node.
     *
     * **This behavior is slightly different from the in the specs**:
     * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
     *
     * @param {GetRootNodeOptions} [options]
     * @returns {Node}
     * Root node.
     * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
     * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
     */
    getRootNode: function(r) {
      var u = this;
      do {
        if (!u.parentNode)
          return u;
        u = u.parentNode;
      } while (u);
    },
    /**
     * Checks whether the given node is equal to this node.
     *
     * @param {Node} [otherNode]
     * @see https://dom.spec.whatwg.org/#concept-node-equals
     */
    isEqualNode: function(r) {
      if (!r || this.nodeType !== r.nodeType) return !1;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== r.name || this.publicId !== r.publicId || this.systemId !== r.systemId) return !1;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== r.namespaceURI || this.prefix !== r.prefix || this.localName !== r.localName || this.attributes.length !== r.attributes.length) return !1;
          for (var u = 0; u < this.attributes.length; u++) {
            var s = this.attributes.item(u);
            if (!s.isEqualNode(r.getAttributeNodeNS(s.namespaceURI, s.localName)))
              return !1;
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== r.namespaceURI || this.localName !== r.localName || this.value !== r.value) return !1;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== r.target || this.data !== r.data)
            return !1;
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== r.data) return !1;
          break;
      }
      if (this.childNodes.length !== r.childNodes.length)
        return !1;
      for (var u = 0; u < this.childNodes.length; u++)
        if (!this.childNodes[u].isEqualNode(r.childNodes[u]))
          return !1;
      return !0;
    },
    /**
     * Checks whether or not the given node is this node.
     *
     * @param {Node} [otherNode]
     */
    isSameNode: function(r) {
      return this === r;
    },
    /**
     * Inserts a node before a reference node as a child of this node.
     *
     * @param {Node} newChild
     * The new child node to be inserted.
     * @param {Node | null} refChild
     * The reference node before which newChild will be inserted.
     * @returns {Node}
     * The new child node successfully inserted.
     * @throws {DOMException}
     * Throws a DOMException if inserting the node would result in a DOM tree that is not
     * well-formed, or if `child` is provided but is not a child of `parent`.
     * See {@link _insertBefore} for more details.
     * @since Modified in DOM L2
     */
    insertBefore: function(r, u) {
      return ie(this, r, u);
    },
    /**
     * Replaces an old child node with a new child node within this node.
     *
     * @param {Node} newChild
     * The new node that is to replace the old node.
     * If it already exists in the DOM, it is removed from its original position.
     * @param {Node} oldChild
     * The existing child node to be replaced.
     * @returns {Node}
     * Returns the replaced child node.
     * @throws {DOMException}
     * Throws a DOMException if replacing the node would result in a DOM tree that is not
     * well-formed, or if `oldChild` is not a child of `this`.
     * This can also occur if the pre-replacement validity assertion fails.
     * See {@link _insertBefore}, {@link Node.removeChild}, and
     * {@link assertPreReplacementValidityInDocument} for more details.
     * @see https://dom.spec.whatwg.org/#concept-node-replace
     */
    replaceChild: function(r, u) {
      ie(this, r, u, U), u && this.removeChild(u);
    },
    /**
     * Removes an existing child node from this node.
     *
     * @param {Node} oldChild
     * The child node to be removed.
     * @returns {Node}
     * Returns the removed child node.
     * @throws {DOMException}
     * Throws a DOMException if `oldChild` is not a child of `this`.
     * See {@link _removeChild} for more details.
     */
    removeChild: function(r) {
      return $e(this, r);
    },
    /**
     * Appends a child node to this node.
     *
     * @param {Node} newChild
     * The child node to be appended to this node.
     * If it already exists in the DOM, it is removed from its original position.
     * @returns {Node}
     * Returns the appended child node.
     * @throws {DOMException}
     * Throws a DOMException if appending the node would result in a DOM tree that is not
     * well-formed, or if `newChild` is not a valid Node.
     * See {@link insertBefore} for more details.
     */
    appendChild: function(r) {
      return this.insertBefore(r, null);
    },
    /**
     * Determines whether this node has any child nodes.
     *
     * @returns {boolean}
     * Returns true if this node has any child nodes, and false otherwise.
     */
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    /**
     * Creates a copy of the calling node.
     *
     * @param {boolean} deep
     * If true, the contents of the node are recursively copied.
     * If false, only the node itself (and its attributes, if it is an element) are copied.
     * @returns {Node}
     * Returns the newly created copy of the node.
     * @throws {DOMException}
     * May throw a DOMException if operations within {@link Element#setAttributeNode} or
     * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
     * specific constraints.
     * @see {@link cloneNode}
     */
    cloneNode: function(r) {
      return Pt(this.ownerDocument || this, this, r);
    },
    /**
     * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
     * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
     *
     * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
     * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
     * nodes.
     *
     * This method operates recursively, so it also normalizes any and all descendent nodes within
     * the subtree.
     *
     * @throws {DOMException}
     * May throw a DOMException if operations within removeChild or appendData (which are
     * potentially invoked in this method) do not meet their specific constraints.
     * @since Modified in DOM Level 2
     * @see {@link Node.removeChild}
     * @see {@link CharacterData.appendData}
     */
    normalize: function() {
      for (var r = this.firstChild; r; ) {
        var u = r.nextSibling;
        u && u.nodeType == ee && r.nodeType == ee ? (this.removeChild(u), r.appendData(u.data)) : (r.normalize(), r = u);
      }
    },
    /**
     * Checks whether the DOM implementation implements a specific feature and its version.
     *
     * @deprecated
     * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
     * @param {string} feature
     * The package name of the feature to test. This is the same name that can be passed to the
     * method `hasFeature` on `DOMImplementation`.
     * @param {string} version
     * This is the version number of the package name to test.
     * @returns {boolean}
     * Returns true in all cases in the current implementation.
     * @since Introduced in DOM Level 2
     * @see {@link DOMImplementation.hasFeature}
     */
    isSupported: function(r, u) {
      return this.ownerDocument.implementation.hasFeature(r, u);
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI for which to find the associated prefix.
     * @returns {string | null}
     * The associated prefix, if found; otherwise, null.
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     * @prettierignore
     */
    lookupPrefix: function(r) {
      for (var u = this; u; ) {
        var s = u._nsMap;
        if (s) {
          for (var c in s)
            if (i(s, c) && s[c] === r)
              return c;
        }
        u = u.nodeType == Y ? u.ownerDocument : u.parentNode;
      }
      return null;
    },
    /**
     * This function is used to look up the namespace URI associated with the given prefix,
     * starting from this node.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} prefix
     * The prefix for which to find the associated namespace URI.
     * @returns {string | null}
     * The associated namespace URI, if found; otherwise, null.
     * @since DOM Level 3
     * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
     * @prettierignore
     */
    lookupNamespaceURI: function(r) {
      for (var u = this; u; ) {
        var s = u._nsMap;
        if (s && i(s, r))
          return s[r];
        u = u.nodeType == Y ? u.ownerDocument : u.parentNode;
      }
      return null;
    },
    /**
     * Determines whether the given namespace URI is the default namespace.
     *
     * The function works by looking up the prefix associated with the given namespace URI. If no
     * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
     * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
     * the default.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI to be checked.
     * @returns {boolean}
     * Returns true if the given namespace URI is the default namespace, false otherwise.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
     * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
     * @prettierignore
     */
    isDefaultNamespace: function(r) {
      var u = this.lookupPrefix(r);
      return u == null;
    },
    /**
     * Compares the reference node with a node with regard to their position in the document and
     * according to the document order.
     *
     * @param {Node} other
     * The node to compare the reference node to.
     * @returns {number}
     * Returns how the node is positioned relatively to the reference node according to the
     * bitmask. 0 if reference node and given node are the same.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
     * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
     */
    compareDocumentPosition: function(r) {
      if (this === r) return 0;
      var u = r, s = this, c = null, g = null;
      if (u instanceof Ne && (c = u, u = c.ownerElement), s instanceof Ne && (g = s, s = g.ownerElement, c && u && s === u))
        for (var T = 0, J; J = s.attributes[T]; T++) {
          if (J === c)
            return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_PRECEDING;
          if (J === g)
            return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_FOLLOWING;
        }
      if (!u || !s || s.ownerDocument !== u.ownerDocument)
        return M.DOCUMENT_POSITION_DISCONNECTED + M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (y(s.ownerDocument) > y(u.ownerDocument) ? M.DOCUMENT_POSITION_FOLLOWING : M.DOCUMENT_POSITION_PRECEDING);
      var de = G(u), be = G(s);
      if (!c && be.indexOf(u) >= 0 || g && u === s)
        return M.DOCUMENT_POSITION_CONTAINS + M.DOCUMENT_POSITION_PRECEDING;
      if (!g && de.indexOf(s) >= 0 || c && u === s)
        return M.DOCUMENT_POSITION_CONTAINED_BY + M.DOCUMENT_POSITION_FOLLOWING;
      var Se = _(be, de);
      for (var Oe in Se.childNodes) {
        var Fe = Se.childNodes[Oe];
        if (Fe === s) return M.DOCUMENT_POSITION_FOLLOWING;
        if (Fe === u) return M.DOCUMENT_POSITION_PRECEDING;
        if (be.indexOf(Fe) >= 0) return M.DOCUMENT_POSITION_FOLLOWING;
        if (de.indexOf(Fe) >= 0) return M.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function ze(r) {
    return r == "<" && "&lt;" || r == ">" && "&gt;" || r == "&" && "&amp;" || r == '"' && "&quot;" || "&#" + r.charCodeAt() + ";";
  }
  D(L, $), D(L, $.prototype), D(M, $), D(M, $.prototype);
  function Ae(r, u) {
    if (u(r))
      return !0;
    if (r = r.firstChild)
      do
        if (Ae(r, u))
          return !0;
      while (r = r.nextSibling);
  }
  function ce(r, u) {
    b(r);
    var s = u || {};
    this.ownerDocument = this, this.contentType = s.contentType || f.XML_APPLICATION, this.type = o(this.contentType) ? "html" : "xml";
  }
  function xe(r, u, s) {
    r && r._inc++;
    var c = s.namespaceURI;
    c === p.XMLNS && (u._nsMap[s.prefix ? s.localName : ""] = s.value);
  }
  function Pe(r, u, s, c) {
    r && r._inc++;
    var g = s.namespaceURI;
    g === p.XMLNS && delete u._nsMap[s.prefix ? s.localName : ""];
  }
  function it(r, u, s) {
    if (r && r._inc) {
      r._inc++;
      var c = u.childNodes;
      if (s && !s.nextSibling)
        c[c.length++] = s;
      else {
        for (var g = u.firstChild, T = 0; g; )
          c[T++] = g, g = g.nextSibling;
        c.length = T, delete c[c.length];
      }
    }
  }
  function $e(r, u) {
    if (r !== u.parentNode)
      throw new l(l.NOT_FOUND_ERR, "child's parent is not parent");
    var s = u.previousSibling, c = u.nextSibling;
    return s ? s.nextSibling = c : r.firstChild = c, c ? c.previousSibling = s : r.lastChild = s, it(r.ownerDocument, r), u.parentNode = null, u.previousSibling = null, u.nextSibling = null, u;
  }
  function je(r) {
    return r && (r.nodeType === $.DOCUMENT_NODE || r.nodeType === $.DOCUMENT_FRAGMENT_NODE || r.nodeType === $.ELEMENT_NODE);
  }
  function ot(r) {
    return r && (r.nodeType === $.CDATA_SECTION_NODE || r.nodeType === $.COMMENT_NODE || r.nodeType === $.DOCUMENT_FRAGMENT_NODE || r.nodeType === $.DOCUMENT_TYPE_NODE || r.nodeType === $.ELEMENT_NODE || r.nodeType === $.PROCESSING_INSTRUCTION_NODE || r.nodeType === $.TEXT_NODE);
  }
  function Q(r) {
    return r && r.nodeType === $.DOCUMENT_TYPE_NODE;
  }
  function ge(r) {
    return r && r.nodeType === $.ELEMENT_NODE;
  }
  function le(r) {
    return r && r.nodeType === $.TEXT_NODE;
  }
  function Je(r, u) {
    var s = r.childNodes || [];
    if (e(s, ge) || Q(u))
      return !1;
    var c = e(s, Q);
    return !(u && c && s.indexOf(c) > s.indexOf(u));
  }
  function at(r, u) {
    var s = r.childNodes || [];
    function c(T) {
      return ge(T) && T !== u;
    }
    if (e(s, c))
      return !1;
    var g = e(s, Q);
    return !(u && g && s.indexOf(g) > s.indexOf(u));
  }
  function Le(r, u, s) {
    if (!je(r))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + r.nodeType);
    if (s && s.parentNode !== r)
      throw new l(l.NOT_FOUND_ERR, "child not in parent");
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !ot(u) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      Q(u) && r.nodeType !== $.DOCUMENT_NODE
    )
      throw new l(
        l.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + u.nodeType + " for parent node type " + r.nodeType
      );
  }
  function Xe(r, u, s) {
    var c = r.childNodes || [], g = u.childNodes || [];
    if (u.nodeType === $.DOCUMENT_FRAGMENT_NODE) {
      var T = g.filter(ge);
      if (T.length > 1 || e(g, le))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (T.length === 1 && !Je(r, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ge(u) && !Je(r, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Q(u)) {
      if (e(c, Q))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var J = e(c, ge);
      if (s && c.indexOf(J) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      if (!s && J)
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
  function U(r, u, s) {
    var c = r.childNodes || [], g = u.childNodes || [];
    if (u.nodeType === $.DOCUMENT_FRAGMENT_NODE) {
      var T = g.filter(ge);
      if (T.length > 1 || e(g, le))
        throw new l(l.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      if (T.length === 1 && !at(r, s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
    if (ge(u) && !at(r, s))
      throw new l(l.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    if (Q(u)) {
      if (e(c, function(be) {
        return Q(be) && be !== s;
      }))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      var J = e(c, ge);
      if (s && c.indexOf(J) < c.indexOf(s))
        throw new l(l.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
  function ie(r, u, s, c) {
    Le(r, u, s), r.nodeType === $.DOCUMENT_NODE && (c || Xe)(r, u, s);
    var g = u.parentNode;
    if (g && g.removeChild(u), u.nodeType === B) {
      var T = u.firstChild;
      if (T == null)
        return u;
      var J = u.lastChild;
    } else
      T = J = u;
    var de = s ? s.previousSibling : r.lastChild;
    T.previousSibling = de, J.nextSibling = s, de ? de.nextSibling = T : r.firstChild = T, s == null ? r.lastChild = J : s.previousSibling = J;
    do
      T.parentNode = r;
    while (T !== J && (T = T.nextSibling));
    return it(r.ownerDocument || r, r, u), u.nodeType == B && (u.firstChild = u.lastChild = null), u;
  }
  ce.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: S,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(r, u) {
      if (r.nodeType === B) {
        for (var s = r.firstChild; s; ) {
          var c = s.nextSibling;
          this.insertBefore(s, u), s = c;
        }
        return r;
      }
      return ie(this, r, u), r.ownerDocument = this, this.documentElement === null && r.nodeType === V && (this.documentElement = r), r;
    },
    removeChild: function(r) {
      var u = $e(this, r);
      return u === this.documentElement && (this.documentElement = null), u;
    },
    replaceChild: function(r, u) {
      ie(this, r, u, U), r.ownerDocument = this, u && this.removeChild(u), ge(r) && (this.documentElement = r);
    },
    // Introduced in DOM Level 2:
    importNode: function(r, u) {
      return Xt(this, r, u);
    },
    // Introduced in DOM Level 2:
    getElementById: function(r) {
      var u = null;
      return Ae(this.documentElement, function(s) {
        if (s.nodeType == V && s.getAttribute("id") == r)
          return u = s, !0;
      }), u;
    },
    /**
     * Creates a new `Element` that is owned by this `Document`.
     * In HTML Documents `localName` is the lower cased `tagName`,
     * otherwise no transformation is being applied.
     * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     * - There is no interface `HTMLElement`, it is always an `Element`.
     * - There is no support for a second argument to indicate using custom elements.
     *
     * @param {string} tagName
     * @returns {Element}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
     * @see https://dom.spec.whatwg.org/#dom-document-createelement
     * @see https://dom.spec.whatwg.org/#concept-create-element
     */
    createElement: function(r) {
      var u = new De(m);
      u.ownerDocument = this, this.type === "html" && (r = r.toLowerCase()), n(this.contentType) && (u.namespaceURI = p.HTML), u.nodeName = r, u.tagName = r, u.localName = r, u.childNodes = new I();
      var s = u.attributes = new K();
      return s._ownerElement = u, u;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var r = new Z(m);
      return r.ownerDocument = this, r.childNodes = new I(), r;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(r) {
      var u = new Ye(m);
      return u.ownerDocument = this, u.childNodes = new I(), u.appendData(r), u;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(r) {
      var u = new st(m);
      return u.ownerDocument = this, u.childNodes = new I(), u.appendData(r), u;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(r) {
      var u = new ct(m);
      return u.ownerDocument = this, u.childNodes = new I(), u.appendData(r), u;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(r, u) {
      var s = new ae(m);
      return s.ownerDocument = this, s.childNodes = new I(), s.nodeName = s.target = r, s.nodeValue = s.data = u, s;
    },
    /**
     * Creates an `Attr` node that is owned by this document.
     * In HTML Documents `localName` is the lower cased `name`,
     * otherwise no transformation is being applied.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     *
     * @param {string} name
     * @returns {Attr}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
     * @see https://dom.spec.whatwg.org/#dom-document-createattribute
     */
    createAttribute: function(r) {
      if (!w.QName_exact.test(r))
        throw new l(l.INVALID_CHARACTER_ERR, 'invalid character in name "' + r + '"');
      return this.type === "html" && (r = r.toLowerCase()), this._createAttribute(r);
    },
    _createAttribute: function(r) {
      var u = new Ne(m);
      return u.ownerDocument = this, u.childNodes = new I(), u.name = r, u.nodeName = r, u.localName = r, u.specified = !0, u;
    },
    /**
     * Creates an EntityReference object.
     * The current implementation does not fill the `childNodes` with those of the corresponding
     * `Entity`
     *
     * @deprecated
     * In DOM Level 4.
     * @param {string} name
     * The name of the entity to reference. No namespace well-formedness checks are performed.
     * @returns {EntityReference}
     * @throws {DOMException}
     * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
     * @throws {DOMException}
     * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
     */
    createEntityReference: function(r) {
      if (!w.Name.test(r))
        throw new l(l.INVALID_CHARACTER_ERR, 'not a valid xml name "' + r + '"');
      if (this.type === "html")
        throw new l("document is an html document", v.NotSupportedError);
      var u = new ft(m);
      return u.ownerDocument = this, u.childNodes = new I(), u.nodeName = r, u;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(r, u) {
      var s = he(r, u), c = new De(m), g = c.attributes = new K();
      return c.childNodes = new I(), c.ownerDocument = this, c.nodeName = u, c.tagName = u, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], g._ownerElement = c, c;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(r, u) {
      var s = he(r, u), c = new Ne(m);
      return c.ownerDocument = this, c.childNodes = new I(), c.nodeName = u, c.name = u, c.specified = !0, c.namespaceURI = s[0], c.prefix = s[1], c.localName = s[2], c;
    }
  }, R(ce, $);
  function De(r) {
    b(r), this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  De.prototype = {
    nodeType: V,
    /**
     * The attributes of this element.
     *
     * @type {NamedNodeMap | null}
     */
    attributes: null,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === p.HTML;
    },
    hasAttribute: function(r) {
      return !!this.getAttributeNode(r);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(r) {
      var u = this.getAttributeNode(r);
      return u ? u.value : null;
    },
    getAttributeNode: function(r) {
      return this._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase()), this.attributes.getNamedItem(r);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(r, u) {
      this._isInHTMLDocumentAndNamespace() && (r = r.toLowerCase());
      var s = this.getAttributeNode(r);
      s ? s.value = s.nodeValue = "" + u : (s = this.ownerDocument._createAttribute(r), s.value = s.nodeValue = "" + u, this.setAttributeNode(s));
    },
    removeAttribute: function(r) {
      var u = this.getAttributeNode(r);
      u && this.removeAttributeNode(u);
    },
    setAttributeNode: function(r) {
      return this.attributes.setNamedItem(r);
    },
    setAttributeNodeNS: function(r) {
      return this.attributes.setNamedItemNS(r);
    },
    removeAttributeNode: function(r) {
      return this.attributes.removeNamedItem(r.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(r, u) {
      var s = this.getAttributeNodeNS(r, u);
      s && this.removeAttributeNode(s);
    },
    hasAttributeNS: function(r, u) {
      return this.getAttributeNodeNS(r, u) != null;
    },
    /**
     * Returns element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName`,
     * or `null` if there is no such attribute.
     *
     * @param {string} namespaceURI
     * @param {string} localName
     * @returns {string | null}
     */
    getAttributeNS: function(r, u) {
      var s = this.getAttributeNodeNS(r, u);
      return s ? s.value : null;
    },
    /**
     * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName` to value.
     *
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @param {string} value
     * @see https://dom.spec.whatwg.org/#dom-element-setattributens
     */
    setAttributeNS: function(r, u, s) {
      var c = he(r, u), g = c[2], T = this.getAttributeNodeNS(r, g);
      T ? T.value = T.nodeValue = "" + s : (T = this.ownerDocument.createAttributeNS(r, u), T.value = T.nodeValue = "" + s, this.setAttributeNode(T));
    },
    getAttributeNodeNS: function(r, u) {
      return this.attributes.getNamedItemNS(r, u);
    },
    /**
     * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classNames` is an empty string or only contains HTML white space
     * characters.
     *
     * Warning: This returns a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames
     * Is a string representing the class name(s) to match; multiple class names are separated by
     * (ASCII-)whitespace.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(r) {
      var u = F(r);
      return new P(this, function(s) {
        var c = [];
        return u.length > 0 && Ae(s, function(g) {
          if (g !== s && g.nodeType === V) {
            var T = g.getAttribute("class");
            if (T) {
              var J = r === T;
              if (!J) {
                var de = F(T);
                J = u.every(q(de));
              }
              J && c.push(g);
            }
          }
        }), c;
      });
    },
    /**
     * Returns a LiveNodeList of elements with the given qualifiedName.
     * Searching for all descendants can be done by passing `*` as `qualifiedName`.
     *
     * All descendants of the specified element are searched, but not the element itself.
     * The returned list is live, which means it updates itself with the DOM tree automatically.
     * Therefore, there is no need to call `Element.getElementsByTagName()`
     * with the same element and arguments repeatedly if the DOM changes in between calls.
     *
     * When called on an HTML element in an HTML document,
     * `getElementsByTagName` lower-cases the argument before searching for it.
     * This is undesirable when trying to match camel-cased SVG elements (such as
     * `<linearGradient>`) in an HTML document.
     * Instead, use `Element.getElementsByTagNameNS()`,
     * which preserves the capitalization of the tag name.
     *
     * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
     * except that it only searches for elements that are descendants of the specified element.
     *
     * @param {string} qualifiedName
     * @returns {LiveNodeList}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
     */
    getElementsByTagName: function(r) {
      var u = (this.nodeType === S ? this : this.ownerDocument).type === "html", s = r.toLowerCase();
      return new P(this, function(c) {
        var g = [];
        return Ae(c, function(T) {
          if (!(T === c || T.nodeType !== V))
            if (r === "*")
              g.push(T);
            else {
              var J = T.getQualifiedName(), de = u && T.namespaceURI === p.HTML ? s : r;
              J === de && g.push(T);
            }
        }), g;
      });
    },
    getElementsByTagNameNS: function(r, u) {
      return new P(this, function(s) {
        var c = [];
        return Ae(s, function(g) {
          g !== s && g.nodeType === V && (r === "*" || g.namespaceURI === r) && (u === "*" || g.localName == u) && c.push(g);
        }), c;
      });
    }
  }, ce.prototype.getElementsByClassName = De.prototype.getElementsByClassName, ce.prototype.getElementsByTagName = De.prototype.getElementsByTagName, ce.prototype.getElementsByTagNameNS = De.prototype.getElementsByTagNameNS, R(De, $);
  function Ne(r) {
    b(r), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
  }
  Ne.prototype.nodeType = Y, R(Ne, $);
  function Ue(r) {
    b(r);
  }
  Ue.prototype = {
    data: "",
    substringData: function(r, u) {
      return this.data.substring(r, r + u);
    },
    appendData: function(r) {
      r = this.data + r, this.nodeValue = this.data = r, this.length = r.length;
    },
    insertData: function(r, u) {
      this.replaceData(r, 0, u);
    },
    deleteData: function(r, u) {
      this.replaceData(r, u, "");
    },
    replaceData: function(r, u, s) {
      var c = this.data.substring(0, r), g = this.data.substring(r + u);
      s = c + s + g, this.nodeValue = this.data = s, this.length = s.length;
    }
  }, R(Ue, $);
  function Ye(r) {
    b(r);
  }
  Ye.prototype = {
    nodeName: "#text",
    nodeType: ee,
    splitText: function(r) {
      var u = this.data, s = u.substring(r);
      u = u.substring(0, r), this.data = this.nodeValue = u, this.length = u.length;
      var c = this.ownerDocument.createTextNode(s);
      return this.parentNode && this.parentNode.insertBefore(c, this.nextSibling), c;
    }
  }, R(Ye, Ue);
  function st(r) {
    b(r);
  }
  st.prototype = {
    nodeName: "#comment",
    nodeType: A
  }, R(st, Ue);
  function ct(r) {
    b(r);
  }
  ct.prototype = {
    nodeName: "#cdata-section",
    nodeType: we
  }, R(ct, Ye);
  function lt(r) {
    b(r);
  }
  lt.prototype.nodeType = O, R(lt, $);
  function vt(r) {
    b(r);
  }
  vt.prototype.nodeType = N, R(vt, $);
  function At(r) {
    b(r);
  }
  At.prototype.nodeType = Re, R(At, $);
  function ft(r) {
    b(r);
  }
  ft.prototype.nodeType = te, R(ft, $);
  function Z(r) {
    b(r);
  }
  Z.prototype.nodeName = "#document-fragment", Z.prototype.nodeType = B, R(Z, $);
  function ae(r) {
    b(r);
  }
  ae.prototype.nodeType = d, R(ae, Ue);
  function Ve() {
  }
  Ve.prototype.serializeToString = function(r, u) {
    return Nt.call(r, u);
  }, $.prototype.toString = Nt;
  function Nt(r) {
    var u = [], s = this.nodeType === S && this.documentElement || this, c = s.prefix, g = s.namespaceURI;
    if (g && c == null) {
      var c = s.lookupPrefix(g);
      if (c == null)
        var T = [
          { namespace: g, prefix: null }
          //{namespace:uri,prefix:''}
        ];
    }
    return pt(this, u, r, T), u.join("");
  }
  function Jt(r, u, s) {
    var c = r.prefix || "", g = r.namespaceURI;
    if (!g || c === "xml" && g === p.XML || g === p.XMLNS)
      return !1;
    for (var T = s.length; T--; ) {
      var J = s[T];
      if (J.prefix === c)
        return J.namespace !== g;
    }
    return !0;
  }
  function _t(r, u, s) {
    r.push(" ", u, '="', s.replace(/[<>&"\t\n\r]/g, ze), '"');
  }
  function pt(r, u, s, c) {
    c || (c = []);
    var g = r.nodeType === S ? r : r.ownerDocument, T = g.type === "html";
    if (s)
      if (r = s(r), r) {
        if (typeof r == "string") {
          u.push(r);
          return;
        }
      } else
        return;
    switch (r.nodeType) {
      case V:
        var J = r.attributes, de = J.length, me = r.firstChild, be = r.tagName, Se = be;
        if (!T && !r.prefix && r.namespaceURI) {
          for (var Oe, Fe = 0; Fe < J.length; Fe++)
            if (J.item(Fe).name === "xmlns") {
              Oe = J.item(Fe).value;
              break;
            }
          if (!Oe)
            for (var Ke = c.length - 1; Ke >= 0; Ke--) {
              var We = c[Ke];
              if (We.prefix === "" && We.namespace === r.namespaceURI) {
                Oe = We.namespace;
                break;
              }
            }
          if (Oe !== r.namespaceURI)
            for (var Ke = c.length - 1; Ke >= 0; Ke--) {
              var We = c[Ke];
              if (We.namespace === r.namespaceURI) {
                We.prefix && (Se = We.prefix + ":" + be);
                break;
              }
            }
        }
        u.push("<", Se);
        for (var Qe = 0; Qe < de; Qe++) {
          var Me = J.item(Qe);
          Me.prefix == "xmlns" ? c.push({
            prefix: Me.localName,
            namespace: Me.value
          }) : Me.nodeName == "xmlns" && c.push({ prefix: "", namespace: Me.value });
        }
        for (var Qe = 0; Qe < de; Qe++) {
          var Me = J.item(Qe);
          if (Jt(Me, T, c)) {
            var Ze = Me.prefix || "", bt = Me.namespaceURI;
            _t(u, Ze ? "xmlns:" + Ze : "xmlns", bt), c.push({ prefix: Ze, namespace: bt });
          }
          pt(Me, u, s, c);
        }
        if (be === Se && Jt(r, T, c)) {
          var Ze = r.prefix || "", bt = r.namespaceURI;
          _t(u, Ze ? "xmlns:" + Ze : "xmlns", bt), c.push({ prefix: Ze, namespace: bt });
        }
        var Lt = !me;
        if (Lt && (T || r.namespaceURI === p.HTML) && (Lt = h(be)), Lt)
          u.push("/>");
        else {
          if (u.push(">"), T && a(be))
            for (; me; )
              me.data ? u.push(me.data) : pt(me, u, s, c.slice()), me = me.nextSibling;
          else
            for (; me; )
              pt(me, u, s, c.slice()), me = me.nextSibling;
          u.push("</", Se, ">");
        }
        return;
      case S:
      case B:
        for (var me = r.firstChild; me; )
          pt(me, u, s, c.slice()), me = me.nextSibling;
        return;
      case Y:
        return _t(u, r.name, r.value);
      case ee:
        return u.push(r.data.replace(/[<&>]/g, ze));
      case we:
        return u.push(w.CDATA_START, r.data, w.CDATA_END);
      case A:
        return u.push(w.COMMENT_START, r.data, w.COMMENT_END);
      case O:
        var Kt = r.publicId, ht = r.systemId;
        u.push(w.DOCTYPE_DECL_START, " ", r.name), Kt ? (u.push(" ", w.PUBLIC, " ", Kt), ht && ht !== "." && u.push(" ", ht)) : ht && ht !== "." && u.push(" ", w.SYSTEM, " ", ht), r.internalSubset && u.push(" [", r.internalSubset, "]"), u.push(">");
        return;
      case d:
        return u.push("<?", r.target, " ", r.data, "?>");
      case te:
        return u.push("&", r.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        u.push("??", r.nodeName);
    }
  }
  function Xt(r, u, s) {
    var c;
    switch (u.nodeType) {
      case V:
        c = u.cloneNode(!1), c.ownerDocument = r;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case B:
        break;
      case Y:
        s = !0;
        break;
    }
    if (c || (c = u.cloneNode(!1)), c.ownerDocument = r, c.parentNode = null, s)
      for (var g = u.firstChild; g; )
        c.appendChild(Xt(r, g, s)), g = g.nextSibling;
    return c;
  }
  function Pt(r, u, s) {
    var c = new u.constructor(m);
    for (var g in u)
      if (i(u, g)) {
        var T = u[g];
        typeof T != "object" && T != c[g] && (c[g] = T);
      }
    switch (u.childNodes && (c.childNodes = new I()), c.ownerDocument = r, c.nodeType) {
      case V:
        var J = u.attributes, de = c.attributes = new K(), be = J.length;
        de._ownerElement = c;
        for (var Se = 0; Se < be; Se++)
          c.setAttributeNode(Pt(r, J.item(Se), !0));
        break;
      case Y:
        s = !0;
    }
    if (s)
      for (var Oe = u.firstChild; Oe; )
        c.appendChild(Pt(r, Oe, s)), Oe = Oe.nextSibling;
    return c;
  }
  function Yt(r, u, s) {
    r[u] = s;
  }
  try {
    if (Object.defineProperty) {
      let r = function(u) {
        switch (u.nodeType) {
          case V:
          case B:
            var s = [];
            for (u = u.firstChild; u; )
              u.nodeType !== 7 && u.nodeType !== 8 && s.push(r(u)), u = u.nextSibling;
            return s.join("");
          default:
            return u.nodeValue;
        }
      };
      Object.defineProperty(P.prototype, "length", {
        get: function() {
          return re(this), this.$$length;
        }
      }), Object.defineProperty($.prototype, "textContent", {
        get: function() {
          return r(this);
        },
        set: function(u) {
          switch (this.nodeType) {
            case V:
            case B:
              for (; this.firstChild; )
                this.removeChild(this.firstChild);
              (u || String(u)) && this.appendChild(this.ownerDocument.createTextNode(u));
              break;
            default:
              this.data = u, this.value = u, this.nodeValue = u;
          }
        }
      }), Yt = function(u, s, c) {
        u["$$" + s] = c;
      };
    }
  } catch {
  }
  return ne._updateLiveList = re, ne.Attr = Ne, ne.CDATASection = ct, ne.CharacterData = Ue, ne.Comment = st, ne.Document = ce, ne.DocumentFragment = Z, ne.DocumentType = lt, ne.DOMImplementation = oe, ne.Element = De, ne.Entity = At, ne.EntityReference = ft, ne.LiveNodeList = P, ne.NamedNodeMap = K, ne.Node = $, ne.NodeList = I, ne.Notation = vt, ne.Text = Ye, ne.ProcessingInstruction = ae, ne.XMLSerializer = Ve, ne;
}
var et = {}, Ft = {}, or;
function vn() {
  return or || (or = 1, function(t) {
    var e = Dt().freeze;
    t.XML_ENTITIES = e({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }), t.HTML_ENTITIES = e({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: `
`,
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    }), t.entityMap = t.HTML_ENTITIES;
  }(Ft)), Ft;
}
var yt = {}, ar;
function An() {
  if (ar) return yt;
  ar = 1;
  var t = Dt(), e = Lr(), n = Mt(), i = t.isHTMLEscapableRawTextElement, o = t.isHTMLMimeType, a = t.isHTMLRawTextElement, h = t.hasOwn, f = t.NAMESPACE, p = n.ParseError, m = n.DOMException, E = 0, l = 1, v = 2, w = 3, b = 4, C = 5, k = 6, x = 7;
  function F() {
  }
  F.prototype = {
    parse: function(d, A, S) {
      var O = this.domBuilder;
      O.startDocument(), V(A, A = /* @__PURE__ */ Object.create(null)), ue(d, A, S, O, this.errorHandler), O.endDocument();
    }
  };
  var q = /&#?\w+;?/g;
  function ue(d, A, S, O, B) {
    var N = o(O.mimeType);
    d.indexOf(e.UNICODE_REPLACEMENT_CHARACTER) >= 0 && B.warning("Unicode replacement character detected, source encoding issues?");
    function M(U) {
      if (U > 65535) {
        U -= 65536;
        var ie = 55296 + (U >> 10), De = 56320 + (U & 1023);
        return String.fromCharCode(ie, De);
      } else
        return String.fromCharCode(U);
    }
    function G(U) {
      var ie = U[U.length - 1] === ";" ? U : U + ";";
      if (!N && ie !== U)
        return B.error("EntityRef: expecting ;"), U;
      var De = e.Reference.exec(ie);
      if (!De || De[0].length !== ie.length)
        return B.error("entity not matching Reference production: " + U), U;
      var Ne = ie.slice(1, -1);
      return h(S, Ne) ? S[Ne] : Ne.charAt(0) === "#" ? M(parseInt(Ne.substr(1).replace("x", "0x"))) : (B.error("entity not found:" + U), U);
    }
    function _(U) {
      if (U > se) {
        var ie = d.substring(se, U).replace(q, G);
        K && y(se), O.characters(ie, 0, U - se), se = U;
      }
    }
    function y(U, ie) {
      for (; U >= P && (ie = re.exec(d)); )
        I = ie.index, P = I + ie[0].length, K.lineNumber++;
      K.columnNumber = U - I + 1;
    }
    for (var I = 0, P = 0, re = /.*(?:\r\n?|\n)|.*$/g, K = O.locator, Ce = [{ currentNSMap: A }], ye = [], se = 0; ; ) {
      try {
        var oe = d.indexOf("<", se);
        if (oe < 0) {
          if (!N && ye.length > 0)
            return B.fatalError("unclosed xml tag(s): " + ye.join(", "));
          if (!d.substring(se).match(/^\s*$/)) {
            var $ = O.doc, ze = $.createTextNode(d.substr(se));
            if ($.documentElement)
              return B.error("Extra content at the end of the document");
            $.appendChild(ze), O.currentElement = ze;
          }
          return;
        }
        if (oe > se) {
          var Ae = d.substring(se, oe);
          !N && ye.length === 0 && (Ae = Ae.replace(new RegExp(e.S_OPT.source, "g"), ""), Ae && B.error("Unexpected content outside root element: '" + Ae + "'")), _(oe);
        }
        switch (d.charAt(oe + 1)) {
          case "/":
            var le = d.indexOf(">", oe + 2), ce = d.substring(oe + 2, le > 0 ? le : void 0);
            if (!ce)
              return B.fatalError("end tag name missing");
            var xe = le > 0 && e.reg("^", e.QName_group, e.S_OPT, "$").exec(ce);
            if (!xe)
              return B.fatalError('end tag name contains invalid characters: "' + ce + '"');
            if (!O.currentElement && !O.doc.documentElement)
              return;
            var Pe = ye[ye.length - 1] || O.currentElement.tagName || O.doc.documentElement.tagName || "";
            if (Pe !== xe[1]) {
              var it = xe[1].toLowerCase();
              if (!N || Pe.toLowerCase() !== it)
                return B.fatalError('Opening and ending tag mismatch: "' + Pe + '" != "' + ce + '"');
            }
            var $e = Ce.pop();
            ye.pop();
            var je = $e.localNSMap;
            if (O.endElement($e.uri, $e.localName, Pe), je)
              for (var ot in je)
                h(je, ot) && O.endPrefixMapping(ot);
            le++;
            break;
          // end element
          case "?":
            K && y(oe), le = te(d, oe, O, B);
            break;
          case "!":
            K && y(oe), le = we(d, oe, O, B, N);
            break;
          default:
            K && y(oe);
            var Q = new Re(), ge = Ce[Ce.length - 1].currentNSMap, le = D(d, oe, Q, ge, G, B, N), Je = Q.length;
            if (Q.closed || (N && t.isHTMLVoidElement(Q.tagName) ? Q.closed = !0 : ye.push(Q.tagName)), K && Je) {
              for (var at = he(K, {}), Le = 0; Le < Je; Le++) {
                var Xe = Q[Le];
                y(Xe.offset), Xe.locator = he(K, {});
              }
              O.locator = at, R(Q, O, ge) && Ce.push(Q), O.locator = K;
            } else
              R(Q, O, ge) && Ce.push(Q);
            N && !Q.closed ? le = L(d, le, Q.tagName, G, O) : le++;
        }
      } catch (U) {
        if (U instanceof p)
          throw U;
        if (U instanceof m)
          throw new p(U.name + ": " + U.message, O.locator, U);
        B.error("element parse error: " + U), le = -1;
      }
      le > se ? se = le : _(Math.max(oe, se) + 1);
    }
  }
  function he(d, A) {
    return A.lineNumber = d.lineNumber, A.columnNumber = d.columnNumber, A;
  }
  function D(d, A, S, O, B, N, M) {
    function G(K, Ce, ye) {
      if (h(S.attributeNames, K))
        return N.fatalError("Attribute " + K + " redefined");
      if (!M && Ce.indexOf("<") >= 0)
        return N.fatalError("Unescaped '<' not allowed in attributes values");
      S.addValue(
        K,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        Ce.replace(/[\t\n\r]/g, " ").replace(q, B),
        ye
      );
    }
    for (var _, y, I = ++A, P = E; ; ) {
      var re = d.charAt(I);
      switch (re) {
        case "=":
          if (P === l)
            _ = d.slice(A, I), P = w;
          else if (P === v)
            P = w;
          else
            throw new Error("attribute equal must after attrName");
          break;
        case "'":
        case '"':
          if (P === w || P === l)
            if (P === l && (N.warning('attribute value must after "="'), _ = d.slice(A, I)), A = I + 1, I = d.indexOf(re, A), I > 0)
              y = d.slice(A, I), G(_, y, A - 1), P = C;
            else
              throw new Error("attribute value no end '" + re + "' match");
          else if (P == b)
            y = d.slice(A, I), G(_, y, A), N.warning('attribute "' + _ + '" missed start quot(' + re + ")!!"), A = I + 1, P = C;
          else
            throw new Error('attribute value must after "="');
          break;
        case "/":
          switch (P) {
            case E:
              S.setTagName(d.slice(A, I));
            case C:
            case k:
            case x:
              P = x, S.closed = !0;
            case b:
            case l:
              break;
            case v:
              S.closed = !0;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          return N.error("unexpected end of input"), P == E && S.setTagName(d.slice(A, I)), I;
        case ">":
          switch (P) {
            case E:
              S.setTagName(d.slice(A, I));
            case C:
            case k:
            case x:
              break;
            //normal
            case b:
            //Compatible state
            case l:
              y = d.slice(A, I), y.slice(-1) === "/" && (S.closed = !0, y = y.slice(0, -1));
            case v:
              P === v && (y = _), P == b ? (N.warning('attribute "' + y + '" missed quot(")!'), G(_, y, A)) : (M || N.warning('attribute "' + y + '" missed value!! "' + y + '" instead!!'), G(y, y, A));
              break;
            case w:
              if (!M)
                return N.fatalError(`AttValue: ' or " expected`);
          }
          return I;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          re = " ";
        default:
          if (re <= " ")
            switch (P) {
              case E:
                S.setTagName(d.slice(A, I)), P = k;
                break;
              case l:
                _ = d.slice(A, I), P = v;
                break;
              case b:
                var y = d.slice(A, I);
                N.warning('attribute "' + y + '" missed quot(")!!'), G(_, y, A);
              case C:
                P = k;
                break;
            }
          else
            switch (P) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case v:
                M || N.warning('attribute "' + _ + '" missed value!! "' + _ + '" instead2!!'), G(_, _, A), A = I, P = l;
                break;
              case C:
                N.warning('attribute space is required"' + _ + '"!!');
              case k:
                P = l, A = I;
                break;
              case w:
                P = b, A = I;
                break;
              case x:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
      }
      I++;
    }
  }
  function R(d, A, S) {
    for (var O = d.tagName, B = null, P = d.length; P--; ) {
      var N = d[P], M = N.qName, G = N.value, re = M.indexOf(":");
      if (re > 0)
        var _ = N.prefix = M.slice(0, re), y = M.slice(re + 1), I = _ === "xmlns" && y;
      else
        y = M, _ = null, I = M === "xmlns" && "";
      N.localName = y, I !== !1 && (B == null && (B = /* @__PURE__ */ Object.create(null), V(S, S = /* @__PURE__ */ Object.create(null))), S[I] = B[I] = G, N.uri = f.XMLNS, A.startPrefixMapping(I, G));
    }
    for (var P = d.length; P--; )
      N = d[P], N.prefix && (N.prefix === "xml" && (N.uri = f.XML), N.prefix !== "xmlns" && (N.uri = S[N.prefix]));
    var re = O.indexOf(":");
    re > 0 ? (_ = d.prefix = O.slice(0, re), y = d.localName = O.slice(re + 1)) : (_ = null, y = d.localName = O);
    var K = d.uri = S[_ || ""];
    if (A.startElement(K, y, O, d), d.closed) {
      if (A.endElement(K, y, O), B)
        for (_ in B)
          h(B, _) && A.endPrefixMapping(_);
    } else
      return d.currentNSMap = S, d.localNSMap = B, !0;
  }
  function L(d, A, S, O, B) {
    var N = i(S);
    if (N || a(S)) {
      var M = d.indexOf("</" + S + ">", A), G = d.substring(A + 1, M);
      return N && (G = G.replace(q, O)), B.characters(G, 0, G.length), M;
    }
    return A + 1;
  }
  function V(d, A) {
    for (var S in d)
      h(d, S) && (A[S] = d[S]);
  }
  function Y(d, A) {
    var S = A;
    function O(y) {
      return y = y || 0, d.charAt(S + y);
    }
    function B(y) {
      y = y || 1, S += y;
    }
    function N() {
      for (var y = 0; S < d.length; ) {
        var I = O();
        if (I !== " " && I !== `
` && I !== "	" && I !== "\r")
          return y;
        y++, B();
      }
      return -1;
    }
    function M() {
      return d.substring(S);
    }
    function G(y) {
      return d.substring(S, S + y.length) === y;
    }
    function _(y) {
      var I = e.reg("^", y), P = I.exec(M());
      return P ? (B(P[0].length), P[0]) : null;
    }
    return {
      char: O,
      getIndex: function() {
        return S;
      },
      getMatch: _,
      getSource: function() {
        return d;
      },
      skip: B,
      skipBlanks: N,
      substringFromIndex: M,
      substringStartsWith: G
    };
  }
  function ee(d, A) {
    function S(G, _) {
      var y = e.PI.exec(G.substringFromIndex());
      return y ? y[1].toLowerCase() === "xml" ? _.fatalError(
        "xml declaration is only allowed at the start of the document, but found at position " + G.getIndex()
      ) : (G.skip(y[0].length), y[0]) : _.fatalError("processing instruction is not well-formed at position " + G.getIndex());
    }
    var O = d.getSource();
    if (d.char() === "[") {
      d.skip(1);
      for (var B = d.getIndex(); d.getIndex() < O.length; ) {
        if (d.skipBlanks(), d.char() === "]") {
          var N = O.substring(B, d.getIndex());
          return d.skip(1), N;
        }
        var M = null;
        if (d.char() === "<" && d.char(1) === "!")
          switch (d.char(2)) {
            case "E":
              d.char(3) === "L" ? M = d.getMatch(e.elementdecl) : d.char(3) === "N" && (M = d.getMatch(e.EntityDecl));
              break;
            case "A":
              M = d.getMatch(e.AttlistDecl);
              break;
            case "N":
              M = d.getMatch(e.NotationDecl);
              break;
            case "-":
              M = d.getMatch(e.Comment);
              break;
          }
        else if (d.char() === "<" && d.char(1) === "?")
          M = S(d, A);
        else if (d.char() === "%")
          M = d.getMatch(e.PEReference);
        else
          return A.fatalError("Error detected in Markup declaration");
        if (!M)
          return A.fatalError("Error in internal subset at position " + d.getIndex());
      }
      return A.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function we(d, A, S, O, B) {
    var N = Y(d, A);
    switch (N.char(2)) {
      case "-":
        var M = N.getMatch(e.Comment);
        return M ? (S.comment(M, e.COMMENT_START.length, M.length - e.COMMENT_START.length - e.COMMENT_END.length), N.getIndex()) : O.fatalError("comment is not well-formed at position " + N.getIndex());
      case "[":
        var G = N.getMatch(e.CDSect);
        return G ? !B && !S.currentElement ? O.fatalError("CDATA outside of element") : (S.startCDATA(), S.characters(G, e.CDATA_START.length, G.length - e.CDATA_START.length - e.CDATA_END.length), S.endCDATA(), N.getIndex()) : O.fatalError("Invalid CDATA starting at position " + A);
      case "D": {
        if (S.doc && S.doc.documentElement)
          return O.fatalError("Doctype not allowed inside or after documentElement at position " + N.getIndex());
        if (!N.substringStartsWith(e.DOCTYPE_DECL_START))
          return O.fatalError("Expected " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        if (N.skip(e.DOCTYPE_DECL_START.length), N.skipBlanks() < 1)
          return O.fatalError("Expected whitespace after " + e.DOCTYPE_DECL_START + " at position " + N.getIndex());
        var _ = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        if (_.name = N.getMatch(e.Name), !_.name)
          return O.fatalError("doctype name missing or contains unexpected characters at position " + N.getIndex());
        if (N.skipBlanks(), N.substringStartsWith(e.PUBLIC) || N.substringStartsWith(e.SYSTEM)) {
          var y = e.ExternalID_match.exec(N.substringFromIndex());
          if (!y)
            return O.fatalError("doctype external id is not well-formed at position " + N.getIndex());
          y.groups.SystemLiteralOnly !== void 0 ? _.systemId = y.groups.SystemLiteralOnly : (_.systemId = y.groups.SystemLiteral, _.publicId = y.groups.PubidLiteral), N.skip(y[0].length);
        }
        return N.skipBlanks(), _.internalSubset = ee(N, O), N.skipBlanks(), N.char() !== ">" ? O.fatalError("doctype not terminated with > at position " + N.getIndex()) : (N.skip(1), S.startDTD(_.name, _.publicId, _.systemId, _.internalSubset), S.endDTD(), N.getIndex());
      }
      default:
        return O.fatalError('Not well-formed XML starting with "<!" at position ' + A);
    }
  }
  function te(d, A, S, O) {
    var B = d.substring(A).match(e.PI);
    if (!B)
      return O.fatalError("Invalid processing instruction starting at position " + A);
    if (B[1].toLowerCase() === "xml") {
      if (A > 0)
        return O.fatalError(
          "processing instruction at position " + A + " is an xml declaration which is only at the start of the document"
        );
      if (!e.XMLDecl.test(d.substring(A)))
        return O.fatalError("xml declaration is not well-formed");
    }
    return S.processingInstruction(B[1], B[2]), A + B[0].length;
  }
  function Re() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  return Re.prototype = {
    setTagName: function(d) {
      if (!e.QName_exact.test(d))
        throw new Error("invalid tagName:" + d);
      this.tagName = d;
    },
    addValue: function(d, A, S) {
      if (!e.QName_exact.test(d))
        throw new Error("invalid attribute:" + d);
      this.attributeNames[d] = this.length, this[this.length++] = { qName: d, value: A, offset: S };
    },
    length: 0,
    getLocalName: function(d) {
      return this[d].localName;
    },
    getLocator: function(d) {
      return this[d].locator;
    },
    getQName: function(d) {
      return this[d].qName;
    },
    getURI: function(d) {
      return this[d].uri;
    },
    getValue: function(d) {
      return this[d].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  }, yt.XMLReader = F, yt.parseUtils = Y, yt.parseDoctypeCommentOrCData = we, yt;
}
var sr;
function Nn() {
  if (sr) return et;
  sr = 1;
  var t = Dt(), e = Fr(), n = Mt(), i = vn(), o = An(), a = e.DOMImplementation, h = t.hasDefaultHTMLNamespace, f = t.isHTMLMimeType, p = t.isValidMimeType, m = t.MIME_TYPE, E = t.NAMESPACE, l = n.ParseError, v = o.XMLReader;
  function w(D) {
    return D.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
  }
  function b(D) {
    if (D = D || { locator: !0 }, this.assign = D.assign || t.assign, this.domHandler = D.domHandler || C, this.onError = D.onError || D.errorHandler, D.errorHandler && typeof D.errorHandler != "function")
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    D.errorHandler && D.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = D.normalizeLineEndings || w, this.locator = !!D.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), D.xmlns);
  }
  b.prototype.parseFromString = function(D, R) {
    if (!p(R))
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + R + '" is not valid.');
    var L = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), V = i.XML_ENTITIES, Y = L[""] || null;
    h(R) ? (V = i.HTML_ENTITIES, Y = E.HTML) : R === m.XML_SVG_IMAGE && (Y = E.SVG), L[""] = Y, L.xml = L.xml || E.XML;
    var ee = new this.domHandler({
      mimeType: R,
      defaultNamespace: Y,
      onError: this.onError
    }), we = this.locator ? {} : void 0;
    this.locator && ee.setDocumentLocator(we);
    var te = new v();
    te.errorHandler = ee, te.domBuilder = ee;
    var Re = !t.isHTMLMimeType(R);
    return Re && typeof D != "string" && te.errorHandler.fatalError("source is not a string"), te.parse(this.normalizeLineEndings(String(D)), L, V), ee.doc.documentElement || te.errorHandler.fatalError("missing root element"), ee.doc;
  };
  function C(D) {
    var R = D || {};
    this.mimeType = R.mimeType || m.XML_APPLICATION, this.defaultNamespace = R.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = R.onError;
  }
  function k(D, R) {
    R.lineNumber = D.lineNumber, R.columnNumber = D.columnNumber;
  }
  C.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var D = new a();
      this.doc = f(this.mimeType) ? D.createHTMLDocument(!1) : D.createDocument(this.defaultNamespace, "");
    },
    startElement: function(D, R, L, V) {
      var Y = this.doc, ee = Y.createElementNS(D, L || R), we = V.length;
      q(this, ee), this.currentElement = ee, this.locator && k(this.locator, ee);
      for (var te = 0; te < we; te++) {
        var D = V.getURI(te), Re = V.getValue(te), L = V.getQName(te), d = Y.createAttributeNS(D, L);
        this.locator && k(V.getLocator(te), d), d.value = d.nodeValue = Re, ee.setAttributeNode(d);
      }
    },
    endElement: function(D, R, L) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(D, R) {
    },
    endPrefixMapping: function(D) {
    },
    processingInstruction: function(D, R) {
      var L = this.doc.createProcessingInstruction(D, R);
      this.locator && k(this.locator, L), q(this, L);
    },
    ignorableWhitespace: function(D, R, L) {
    },
    characters: function(D, R, L) {
      if (D = F.apply(this, arguments), D) {
        if (this.cdata)
          var V = this.doc.createCDATASection(D);
        else
          var V = this.doc.createTextNode(D);
        this.currentElement ? this.currentElement.appendChild(V) : /^\s*$/.test(D) && this.doc.appendChild(V), this.locator && k(this.locator, V);
      }
    },
    skippedEntity: function(D) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    /**
     * Stores the locator to be able to set the `columnNumber` and `lineNumber`
     * on the created DOM nodes.
     *
     * @param {Locator} locator
     */
    setDocumentLocator: function(D) {
      D && (D.lineNumber = 0), this.locator = D;
    },
    //LexicalHandler
    comment: function(D, R, L) {
      D = F.apply(this, arguments);
      var V = this.doc.createComment(D);
      this.locator && k(this.locator, V), q(this, V);
    },
    startCDATA: function() {
      this.cdata = !0;
    },
    endCDATA: function() {
      this.cdata = !1;
    },
    startDTD: function(D, R, L, V) {
      var Y = this.doc.implementation;
      if (Y && Y.createDocumentType) {
        var ee = Y.createDocumentType(D, R, L, V);
        this.locator && k(this.locator, ee), q(this, ee), this.doc.doctype = ee;
      }
    },
    reportError: function(D, R) {
      if (typeof this.onError == "function")
        try {
          this.onError(D, R, this);
        } catch (L) {
          throw new l("Reporting " + D + ' "' + R + '" caused ' + L, this.locator);
        }
      else
        console.error("[xmldom " + D + "]	" + R, x(this.locator));
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(D) {
      this.reportError("warning", D);
    },
    error: function(D) {
      this.reportError("error", D);
    },
    /**
     * This function reports a fatal error and throws a ParseError.
     *
     * @param {string} message
     * - The message to be used for reporting and throwing the error.
     * @returns {never}
     * This function always throws an error and never returns a value.
     * @throws {ParseError}
     * Always throws a ParseError with the provided message.
     */
    fatalError: function(D) {
      throw this.reportError("fatalError", D), new l(D, this.locator);
    }
  };
  function x(D) {
    if (D)
      return `
@#[line:` + D.lineNumber + ",col:" + D.columnNumber + "]";
  }
  function F(D, R, L) {
    return typeof D == "string" ? D.substr(R, L) : D.length >= R + L || R ? new java.lang.String(D, R, L) + "" : D;
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(D) {
      C.prototype[D] = function() {
        return null;
      };
    }
  );
  function q(D, R) {
    D.currentElement ? D.currentElement.appendChild(R) : D.doc.appendChild(R);
  }
  function ue(D) {
    if (D === "error") throw "onErrorStopParsing";
  }
  function he() {
    throw "onWarningStopParsing";
  }
  return et.__DOMHandler = C, et.DOMParser = b, et.normalizeLineEndings = w, et.onErrorStopParsing = ue, et.onWarningStopParsing = he, et;
}
var cr;
function bn() {
  if (cr) return z;
  cr = 1;
  var t = Dt();
  z.assign = t.assign, z.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, z.isHTMLMimeType = t.isHTMLMimeType, z.isValidMimeType = t.isValidMimeType, z.MIME_TYPE = t.MIME_TYPE, z.NAMESPACE = t.NAMESPACE;
  var e = Mt();
  z.DOMException = e.DOMException, z.DOMExceptionName = e.DOMExceptionName, z.ExceptionCode = e.ExceptionCode, z.ParseError = e.ParseError;
  var n = Fr();
  z.Attr = n.Attr, z.CDATASection = n.CDATASection, z.CharacterData = n.CharacterData, z.Comment = n.Comment, z.Document = n.Document, z.DocumentFragment = n.DocumentFragment, z.DocumentType = n.DocumentType, z.DOMImplementation = n.DOMImplementation, z.Element = n.Element, z.Entity = n.Entity, z.EntityReference = n.EntityReference, z.LiveNodeList = n.LiveNodeList, z.NamedNodeMap = n.NamedNodeMap, z.Node = n.Node, z.NodeList = n.NodeList, z.Notation = n.Notation, z.ProcessingInstruction = n.ProcessingInstruction, z.Text = n.Text, z.XMLSerializer = n.XMLSerializer;
  var i = Nn();
  return z.DOMParser = i.DOMParser, z.onErrorStopParsing = i.onErrorStopParsing, z.onWarningStopParsing = i.onWarningStopParsing, z;
}
bn();
const qt = "USJ";
var Ie = {}, kt, lr;
function Cn() {
  return lr || (lr = 1, kt = () => {
    const t = "\\ud800-\\udfff", h = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", f = "\\ufe0e\\ufe0f", p = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", m = `[${t}]`, E = `[${h}]`, l = "\\ud83c[\\udffb-\\udfff]", v = `(?:${E}|${l})`, w = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", C = "[\\ud800-\\udbff][\\udc00-\\udfff]", k = "\\u200d", x = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", F = `[${p}]`, q = `${v}?`, ue = `[${f}]?`, he = `(?:${k}(?:${[w, b, C].join("|")})${ue + q})*`, D = ue + q + he, L = `(?:${[`${w}${E}?`, E, b, C, m, F].join("|")})`;
    return new RegExp(`${x}|${l}(?=${l})|${L + D}`, "g");
  }), kt;
}
var fr;
function yn() {
  if (fr) return Ie;
  fr = 1;
  var t = Ie && Ie.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(Ie, "__esModule", { value: !0 });
  var e = t(Cn());
  function n(p) {
    if (typeof p != "string")
      throw new Error("A string is expected as input");
    return p.match(e.default()) || [];
  }
  Ie.toArray = n;
  function i(p) {
    if (typeof p != "string")
      throw new Error("Input must be a string");
    var m = p.match(e.default());
    return m === null ? 0 : m.length;
  }
  Ie.length = i;
  function o(p, m, E) {
    if (m === void 0 && (m = 0), typeof p != "string")
      throw new Error("Input must be a string");
    (typeof m != "number" || m < 0) && (m = 0), typeof E == "number" && E < 0 && (E = 0);
    var l = p.match(e.default());
    return l ? l.slice(m, E).join("") : "";
  }
  Ie.substring = o;
  function a(p, m, E) {
    if (m === void 0 && (m = 0), typeof p != "string")
      throw new Error("Input must be a string");
    var l = i(p);
    if (typeof m != "number" && (m = parseInt(m, 10)), m >= l)
      return "";
    m < 0 && (m += l);
    var v;
    typeof E > "u" ? v = l : (typeof E != "number" && (E = parseInt(E, 10)), v = E >= 0 ? E + m : m);
    var w = p.match(e.default());
    return w ? w.slice(m, v).join("") : "";
  }
  Ie.substr = a;
  function h(p, m, E, l) {
    if (m === void 0 && (m = 16), E === void 0 && (E = "#"), l === void 0 && (l = "right"), typeof p != "string" || typeof m != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(l) === -1)
      throw new Error("Pad position should be either left or right");
    typeof E != "string" && (E = String(E));
    var v = i(p);
    if (v > m)
      return o(p, 0, m);
    if (v < m) {
      var w = E.repeat(m - v);
      return l === "left" ? w + p : p + w;
    }
    return p;
  }
  Ie.limit = h;
  function f(p, m, E) {
    if (E === void 0 && (E = 0), typeof p != "string")
      throw new Error("Input must be a string");
    if (p === "")
      return m === "" ? 0 : -1;
    E = Number(E), E = isNaN(E) ? 0 : E, m = String(m);
    var l = n(p);
    if (E >= l.length)
      return m === "" ? l.length : -1;
    if (m === "")
      return E;
    var v = n(m), w = !1, b;
    for (b = E; b < l.length; b += 1) {
      for (var C = 0; C < v.length && v[C] === l[b + C]; )
        C += 1;
      if (C === v.length && v[C - 1] === l[b + C - 1]) {
        w = !0;
        break;
      }
    }
    return w ? b : -1;
  }
  return Ie.indexOf = f, Ie;
}
var nt = yn();
function kr(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function Ot(t, e) {
  if (!(e > pe(t) || e < -pe(t)))
    return Bt(t, e, 1);
}
function Et(t, e) {
  return e < 0 || e > pe(t) - 1 ? "" : Bt(t, e, 1);
}
function Yu(t, e) {
  if (!(e < 0 || e > pe(t) - 1))
    return Bt(t, e, 1).codePointAt(0);
}
function Tn(t, e, n = pe(t)) {
  const i = In(t, e);
  return !(i === -1 || i + pe(e) !== n);
}
function wn(t, e, n) {
  if (e < 0) return -1;
  if (n) {
    if (Et(t, e) === "}" && Et(t, e - 1) === "\\") return e;
    const a = St(t, "\\}", e);
    return a >= 0 ? a + 1 : a;
  }
  let i = e;
  const o = pe(t);
  for (; i < o && (i = St(t, "}", i), !(i === -1 || Et(t, i - 1) !== "\\")); )
    i += 1;
  return i >= o ? -1 : i;
}
function Sn(t, e) {
  const n = [];
  let i = 0, o = 0;
  function a(f, p, m) {
    const E = tt(t, o, p), l = n.length > 0 && qe(n[n.length - 1]) ? `${n.pop()}${E}` : E;
    qe(f) ? n.push(`${l}${f}`) : (l && n.push(l), n.push(f)), o = p + m;
  }
  const h = pe(t);
  for (; i < h; ) {
    switch (Et(t, i)) {
      case "{":
        if (Et(t, i - 1) !== "\\") {
          const f = wn(t, i, !1);
          if (f >= 0) {
            const p = tt(t, i + 1, f), m = p in e ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[p]
            ) : p;
            a(m, i, f + 1 - i), i = f, o = f + 1;
          }
        } else
          a("{", i - 1, 2);
        break;
      case "}":
        Et(t, i - 1) !== "\\" || a("}", i - 1, 2);
        break;
    }
    i += 1;
  }
  if (o < h) {
    const f = tt(t, o);
    n.push(
      n.length > 0 && qe(n[n.length - 1]) ? `${n.pop()}${f}` : f
    );
  }
  return n;
}
function Ku(t, e) {
  return Sn(t, e).map((n) => `${n}`).join("");
}
function On(t, e, n = 0) {
  const i = tt(t, n);
  return St(i, e) !== -1;
}
function St(t, e, n = 0) {
  return nt.indexOf(t, e, n);
}
function In(t, e, n) {
  let i = n === void 0 ? pe(t) : n;
  i < 0 ? i = 0 : i >= pe(t) && (i = pe(t) - 1);
  for (let o = i; o >= 0; o--)
    if (Bt(t, o, pe(e)) === e)
      return o;
  return -1;
}
function pe(t) {
  return nt.length(t);
}
function Wu(t, e) {
  const n = e.toUpperCase();
  return n === "NONE" ? t : t.normalize(n);
}
function Qu(t, e, n) {
  return t.localeCompare(e, "en", n);
}
function Zu(t, e, n = " ") {
  return e <= pe(t) ? t : nt.limit(t, e, n, "right");
}
function ei(t, e, n = " ") {
  return e <= pe(t) ? t : nt.limit(t, e, n, "left");
}
function pr(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function hr(t, e, n) {
  const i = pe(t);
  if (e > i || n && (e > n && !(e >= 0 && e < i && n < 0 && n > -i) || n < -i))
    return "";
  const o = pr(i, e), a = n ? pr(i, n) : void 0;
  return tt(t, o, a);
}
function dr(t, e, n) {
  const i = [];
  if (n !== void 0 && n <= 0)
    return [t];
  if (e === "") return Rn(t).slice(0, n);
  let o = e;
  (typeof e == "string" || e instanceof RegExp && !On(e.flags, "g")) && (o = new RegExp(e, "g"));
  const a = t.match(o);
  let h = 0;
  if (!a) return [t];
  for (let f = 0; f < (n ? n - 1 : a.length); f++) {
    const p = St(t, a[f], h), m = pe(a[f]);
    if (i.push(tt(t, h, p)), h = p + m, n !== void 0 && i.length === n)
      break;
  }
  return i.push(tt(t, h)), i;
}
function qr(t, e, n = 0) {
  return St(t, e, n) === n;
}
function Bt(t, e = 0, n = pe(t) - e) {
  return nt.substr(t, e, n);
}
function tt(t, e, n = pe(t)) {
  return nt.substring(t, e, n);
}
function Rn(t) {
  return nt.toArray(t);
}
function ti(t) {
  return qr(t, "%") && Tn(t, "%");
}
function ri(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function ni(t) {
  return t ? kr(t).map(
    (i) => Array.isArray(i) ? i.map((o) => new RegExp(o)) : new RegExp(i)
  ) : [];
}
function ui(t) {
  return t ? kr(t).map((i) => new RegExp(i)) : [];
}
const xn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function mt(t) {
  return xn.test(t);
}
const $t = ["chapter", "book", "para", "row", "sidebar", qt], Mn = "​", $r = [
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
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 }
], Bn = 1, _n = $r.length - 1, Pn = 1, Ln = 1, ii = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1
}, Fn = (t) => {
  var e;
  return ((e = $r[t]) == null ? void 0 : e.chapters) ?? -1;
}, oi = (t, e) => ({
  bookNum: Math.max(Bn, Math.min(t.bookNum + e, _n)),
  chapterNum: 1,
  verseNum: 1
}), ai = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(Pn, t.chapterNum + e),
    Fn(t.bookNum)
  ),
  verseNum: 1
}), si = (t, e) => ({
  ...t,
  verseNum: Math.max(Ln, t.verseNum + e)
});
async function ci(t, e, n) {
  const i = Be.bookNumberToId(t);
  if (!qr(Intl.getCanonicalLocales(e)[0], "zh"))
    return n({
      localizeKey: `LocalizedId.${i}`,
      languagesToSearch: [e]
    });
  const o = await n({
    localizeKey: `Book.${i}`,
    languagesToSearch: [e]
  }), a = dr(o, "-");
  return dr(a[0], "ÿ08")[0].trim();
}
function mr(t) {
  return new Ht(t.bookNum, t.chapterNum, t.verseNum).BBBCCCVVV;
}
function li(t, e) {
  return mr(t) - mr(e);
}
function kn(t) {
  return `%scrollGroup_${t}%`;
}
function fi(t) {
  return t.map((e) => kn(e));
}
function pi(t, e, n, i) {
  let o;
  switch (e ?? "id") {
    case "English":
      o = Be.bookNumberToEnglishName(t.bookNum);
      break;
    case "id":
      o = Be.bookNumberToId(t.bookNum);
      break;
    default:
      o = e ?? "";
      break;
  }
  return `${o}${i ?? " "}${t.chapterNum}${n ?? ":"}${t.verseNum}`;
}
const qn = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Er(t) {
  return qn.test(t);
}
const $n = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function jn(t) {
  return $n.test(t);
}
function gr(t) {
  let e = "", n = !1, i = "\0";
  for (let o = 0; o < t.length; o += 1) {
    const a = t[o];
    a.charCodeAt(0) < 32 ? (n || (e += " "), n = !0) : !n && a === Mn && o + 1 < t.length && Er(t[o + 1]) || (Er(a) ? (n || (e += a), n = !0) : jn(a) && i === a || (e += a, n = !1)), i = a;
  }
  return e;
}
function Dr(t) {
  return !t || t.length === 0 ? !0 : t.length === 1 && (t[0] === void 0 || t[0] === "");
}
function vr(t, e) {
  if (!e || !$t.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(t)} does not have a content array! This should not happen!`
    );
  return t === e.content[e.content.length - 1];
}
function jr(t, e, n, i) {
  if (!t && !n) return !0;
  if (!t || !n) return !1;
  const o = qe(t), a = qe(n);
  if (o && a) {
    const h = gr(t), f = gr(n);
    if (h !== f) {
      if (!mt(Ot(h, -1) ?? "") && !mt(Ot(f, -1) ?? "") || !vr(t, e) || !vr(n, i)) return !1;
      let p = h;
      for (; mt(Ot(p, -1) ?? ""); ) p = hr(p, 0, -1);
      let m = f;
      for (; mt(Ot(m, -1) ?? ""); ) m = hr(m, 0, -1);
      if (p !== m) return !1;
    }
  } else if (!o && !a) {
    const h = t, f = n, p = Object.keys(h).filter(
      (l) => l !== "content"
    );
    if (p.length !== Object.keys(f).filter((l) => l !== "content").length || p.some((l) => !(l in f) || h[l] !== f[l])) return !1;
    const m = Dr(h.content), E = Dr(f.content);
    if (m !== E) return !1;
    if (!m && !E) {
      let l = h.content, v = f.content;
      const w = l[l.length - 1];
      $t.includes(h.type) && qe(w) && mt(w) && (l = l.slice(0, -1));
      const b = v[v.length - 1];
      if ($t.includes(f.type) && qe(b) && mt(b) && (v = v.slice(0, -1)), l.length !== v.length) return !1;
      for (let C = 0; C < l.length; C += 1)
        if (!jr(l[C], h, v[C], f))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function hi(t, e) {
  return jr(t, void 0, e, void 0);
}
const di = (t) => (...e) => t.map((i) => i(...e)).every((i) => i), mi = (t) => async (...e) => {
  const n = t.map(async (i) => i(...e));
  return (await Promise.all(n)).every((i) => i);
}, It = "chapter", Rt = "verse";
var Un = Object.getOwnPropertyNames, Vn = Object.getOwnPropertySymbols, Hn = Object.prototype.hasOwnProperty;
function Ar(t, e) {
  return function(i, o, a) {
    return t(i, o, a) && e(i, o, a);
  };
}
function xt(t) {
  return function(n, i, o) {
    if (!n || !i || typeof n != "object" || typeof i != "object")
      return t(n, i, o);
    var a = o.cache, h = a.get(n), f = a.get(i);
    if (h && f)
      return h === i && f === n;
    a.set(n, i), a.set(i, n);
    var p = t(n, i, o);
    return a.delete(n), a.delete(i), p;
  };
}
function Nr(t) {
  return Un(t).concat(Vn(t));
}
var Gn = Object.hasOwn || function(t, e) {
  return Hn.call(t, e);
};
function ut(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
var zn = "__v", Jn = "__o", Xn = "_owner", br = Object.getOwnPropertyDescriptor, Cr = Object.keys;
function Yn(t, e, n) {
  var i = t.length;
  if (e.length !== i)
    return !1;
  for (; i-- > 0; )
    if (!n.equals(t[i], e[i], i, i, t, e, n))
      return !1;
  return !0;
}
function Kn(t, e) {
  return ut(t.getTime(), e.getTime());
}
function Wn(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function Qn(t, e) {
  return t === e;
}
function yr(t, e, n) {
  var i = t.size;
  if (i !== e.size)
    return !1;
  if (!i)
    return !0;
  for (var o = new Array(i), a = t.entries(), h, f, p = 0; (h = a.next()) && !h.done; ) {
    for (var m = e.entries(), E = !1, l = 0; (f = m.next()) && !f.done; ) {
      if (o[l]) {
        l++;
        continue;
      }
      var v = h.value, w = f.value;
      if (n.equals(v[0], w[0], p, l, t, e, n) && n.equals(v[1], w[1], v[0], w[0], t, e, n)) {
        E = o[l] = !0;
        break;
      }
      l++;
    }
    if (!E)
      return !1;
    p++;
  }
  return !0;
}
var Zn = ut;
function eu(t, e, n) {
  var i = Cr(t), o = i.length;
  if (Cr(e).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!Ur(t, e, n, i[o]))
      return !1;
  return !0;
}
function Tt(t, e, n) {
  var i = Nr(t), o = i.length;
  if (Nr(e).length !== o)
    return !1;
  for (var a, h, f; o-- > 0; )
    if (a = i[o], !Ur(t, e, n, a) || (h = br(t, a), f = br(e, a), (h || f) && (!h || !f || h.configurable !== f.configurable || h.enumerable !== f.enumerable || h.writable !== f.writable)))
      return !1;
  return !0;
}
function tu(t, e) {
  return ut(t.valueOf(), e.valueOf());
}
function ru(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function Tr(t, e, n) {
  var i = t.size;
  if (i !== e.size)
    return !1;
  if (!i)
    return !0;
  for (var o = new Array(i), a = t.values(), h, f; (h = a.next()) && !h.done; ) {
    for (var p = e.values(), m = !1, E = 0; (f = p.next()) && !f.done; ) {
      if (!o[E] && n.equals(h.value, f.value, h.value, f.value, t, e, n)) {
        m = o[E] = !0;
        break;
      }
      E++;
    }
    if (!m)
      return !1;
  }
  return !0;
}
function nu(t, e) {
  var n = t.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (t[n] !== e[n])
      return !1;
  return !0;
}
function uu(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function Ur(t, e, n, i) {
  return (i === Xn || i === Jn || i === zn) && (t.$$typeof || e.$$typeof) ? !0 : Gn(e, i) && n.equals(t[i], e[i], i, i, t, e, n);
}
var iu = "[object Arguments]", ou = "[object Boolean]", au = "[object Date]", su = "[object Error]", cu = "[object Map]", lu = "[object Number]", fu = "[object Object]", pu = "[object RegExp]", hu = "[object Set]", du = "[object String]", mu = "[object URL]", Eu = Array.isArray, wr = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Sr = Object.assign, gu = Object.prototype.toString.call.bind(Object.prototype.toString);
function Du(t) {
  var e = t.areArraysEqual, n = t.areDatesEqual, i = t.areErrorsEqual, o = t.areFunctionsEqual, a = t.areMapsEqual, h = t.areNumbersEqual, f = t.areObjectsEqual, p = t.arePrimitiveWrappersEqual, m = t.areRegExpsEqual, E = t.areSetsEqual, l = t.areTypedArraysEqual, v = t.areUrlsEqual;
  return function(b, C, k) {
    if (b === C)
      return !0;
    if (b == null || C == null)
      return !1;
    var x = typeof b;
    if (x !== typeof C)
      return !1;
    if (x !== "object")
      return x === "number" ? h(b, C, k) : x === "function" ? o(b, C, k) : !1;
    var F = b.constructor;
    if (F !== C.constructor)
      return !1;
    if (F === Object)
      return f(b, C, k);
    if (Eu(b))
      return e(b, C, k);
    if (wr != null && wr(b))
      return l(b, C, k);
    if (F === Date)
      return n(b, C, k);
    if (F === RegExp)
      return m(b, C, k);
    if (F === Map)
      return a(b, C, k);
    if (F === Set)
      return E(b, C, k);
    var q = gu(b);
    return q === au ? n(b, C, k) : q === pu ? m(b, C, k) : q === cu ? a(b, C, k) : q === hu ? E(b, C, k) : q === fu ? typeof b.then != "function" && typeof C.then != "function" && f(b, C, k) : q === mu ? v(b, C, k) : q === su ? i(b, C, k) : q === iu ? f(b, C, k) : q === ou || q === lu || q === du ? p(b, C, k) : !1;
  };
}
function vu(t) {
  var e = t.circular, n = t.createCustomConfig, i = t.strict, o = {
    areArraysEqual: i ? Tt : Yn,
    areDatesEqual: Kn,
    areErrorsEqual: Wn,
    areFunctionsEqual: Qn,
    areMapsEqual: i ? Ar(yr, Tt) : yr,
    areNumbersEqual: Zn,
    areObjectsEqual: i ? Tt : eu,
    arePrimitiveWrappersEqual: tu,
    areRegExpsEqual: ru,
    areSetsEqual: i ? Ar(Tr, Tt) : Tr,
    areTypedArraysEqual: i ? Tt : nu,
    areUrlsEqual: uu
  };
  if (n && (o = Sr({}, o, n(o))), e) {
    var a = xt(o.areArraysEqual), h = xt(o.areMapsEqual), f = xt(o.areObjectsEqual), p = xt(o.areSetsEqual);
    o = Sr({}, o, {
      areArraysEqual: a,
      areMapsEqual: h,
      areObjectsEqual: f,
      areSetsEqual: p
    });
  }
  return o;
}
function Au(t) {
  return function(e, n, i, o, a, h, f) {
    return t(e, n, f);
  };
}
function Nu(t) {
  var e = t.circular, n = t.comparator, i = t.createState, o = t.equals, a = t.strict;
  if (i)
    return function(p, m) {
      var E = i(), l = E.cache, v = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, w = E.meta;
      return n(p, m, {
        cache: v,
        equals: o,
        meta: w,
        strict: a
      });
    };
  if (e)
    return function(p, m) {
      return n(p, m, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: o,
        meta: void 0,
        strict: a
      });
    };
  var h = {
    cache: void 0,
    equals: o,
    meta: void 0,
    strict: a
  };
  return function(p, m) {
    return n(p, m, h);
  };
}
var bu = Ge();
Ge({ strict: !0 });
Ge({ circular: !0 });
Ge({
  circular: !0,
  strict: !0
});
Ge({
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  strict: !0,
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  }
});
Ge({
  circular: !0,
  createInternalComparator: function() {
    return ut;
  },
  strict: !0
});
function Ge(t) {
  t === void 0 && (t = {});
  var e = t.circular, n = e === void 0 ? !1 : e, i = t.createInternalComparator, o = t.createState, a = t.strict, h = a === void 0 ? !1 : a, f = vu(t), p = Du(f), m = i ? i(p) : Au(p);
  return Nu({ circular: n, comparator: p, createState: o, equals: m, strict: h });
}
function Cu(t, e) {
  return bu(t, e);
}
function yu(t, e) {
  if (typeof t != typeof e) return !1;
  if (!t && !e) return !0;
  if (Array.isArray(t)) {
    const a = e, h = t;
    return a.length === 0 ? !0 : a.every((f) => h.includes(f));
  }
  if (typeof t != "object")
    return Cu(t, e);
  const n = e, i = t;
  let o = !0;
  return Object.keys(n).forEach((a) => {
    o && (Object.hasOwn(i, a) && yu(i[a], n[a]) || (o = !1));
  }), o;
}
function Or(t, e, n) {
  return JSON.stringify(t, (o, a) => {
    let h = a;
    return e && (h = e(o, h)), h === void 0 && (h = null), h;
  }, n);
}
function Tu(t, e) {
  function n(h) {
    return Object.keys(h).forEach((f) => {
      h[f] === null ? h[f] = void 0 : typeof h[f] == "object" && (h[f] = n(h[f]));
    }), h;
  }
  function i(h, f) {
    if (f && typeof f == "object" && "book" in f && typeof f.book == "string" && "chapterNum" in f && typeof f.chapterNum == "number" && "verseNum" in f && typeof f.verseNum == "number" && Object.keys(f).every(
      (p) => ["book", "chapterNum", "verseNum", "verse", "versificationStr"].includes(p)
    )) {
      const p = f.chapterNum.toString(10), m = "verse" in f && typeof f.verse == "string" ? f.verse : f.verseNum.toString(10), E = "versificationStr" in f && typeof f.versificationStr == "string" ? new He(f.versificationStr) : void 0;
      return new Ht(f.book, p, m, E);
    }
    return f;
  }
  function o(h, f) {
    return i(
      h,
      e ? e.call(this, h, f) : f
    );
  }
  const a = JSON.parse(t, o);
  if (a !== null)
    return typeof a == "object" ? n(a) : a;
}
function Ei(t) {
  try {
    const e = Or(t);
    return e === Or(Tu(e));
  } catch {
    return !1;
  }
}
const gi = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Di() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new Yr().resolvedOptions().locale;
}
function vi(t, e = 2) {
  if (t === 0) return "0 Bytes";
  const n = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(t) / Math.log(1024)), o = n[i];
  return `${new un("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(t / 1024 ** i)} ${o}`;
}
const wu = 1e3, Vr = 60, Hr = Vr * 60, Su = Hr * 24;
function Ai(t, e, n = /* @__PURE__ */ new Date()) {
  const i = Math.floor((e.getTime() - n.getTime()) / wu), o = Math.round(i / Su);
  if (Math.abs(o) >= 1) return t.format(o, "day");
  const a = Math.round(i / Hr);
  if (Math.abs(a) >= 1) return t.format(a, "hour");
  const h = Math.round(i / Vr);
  return Math.abs(h) >= 1 ? t.format(h, "minute") : t.format(i, "second");
}
const Gt = {
  projectSettingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/projectSettingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/projectSettingsGroup"
        }
      }
    ]
  },
  projectSettingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the project settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the project settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/projectSettingProperties"
      }
    },
    required: ["label", "properties"]
  },
  projectSettingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/projectSetting"
      }
    },
    additionalProperties: !1
  },
  projectSetting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledProjectSetting"
      }
    ]
  },
  extensionControlledProjectSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/projectSettingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  projectSettingBase: {
    description: "Base information needed to describe a project setting entry",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierProject"
      }
    ]
  },
  modifierProject: {
    description: "Modifies setting type to be project setting",
    type: "object",
    properties: {
      includeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should be included.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to pass):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to all {@link ProjectInterfaces}, so all projects that do not match `excludeProjectInterfaces` will be included\n\n@example\n\n```typescript\nincludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed on projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      excludeProjectInterfaces: {
        description: "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to exclude the project):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition and exclude the project\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition and exclude the project\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to no {@link ProjectInterfaces}, so all projects that match `includeProjectInterfaces` will be included\n\n@example\n\n```typescript\nexcludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed and exclude projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "string"
                },
                {
                  type: "array",
                  items: { type: "string" }
                }
              ]
            }
          }
        ]
      },
      includePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should be included.\n\nDefaults to all Project Data Provider Factory Ids, so all projects that do not match `excludePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
          }
        ]
      },
      excludePdpFactoryIds: {
        description: "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nDefaults to none, so all projects that match `includePdpFactoryIds` will be included",
        anyOf: [
          {
            type: "null"
          },
          {
            type: "string"
          },
          {
            type: "array",
            items: { type: "string" }
          }
        ]
      }
    }
  },
  settingsContribution: {
    description: "The data an extension provides to inform Platform.Bible of the settings it provides",
    anyOf: [
      {
        $ref: "#/$defs/settingsGroup"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/settingsGroup"
        }
      }
    ]
  },
  settingsGroup: {
    description: "Group of related settings definitions",
    type: "object",
    properties: {
      label: {
        description: "localizeKey that displays in the settings dialog as the group name",
        $ref: "#/$defs/localizeKey"
      },
      description: {
        description: "localizeKey that displays in the settings dialog to describe the group",
        $ref: "#/$defs/localizeKey"
      },
      properties: {
        $ref: "#/$defs/settingProperties"
      }
    },
    required: ["label", "properties"]
  },
  settingProperties: {
    description: "Object whose keys are setting IDs and whose values are settings objects",
    type: "object",
    patternProperties: {
      "^[\\w-]+\\.[\\w-]+$": {
        $ref: "#/$defs/setting"
      }
    },
    additionalProperties: !1
  },
  setting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledSetting"
      }
    ]
  },
  extensionControlledSetting: {
    description: "Setting definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/settingBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  settingBase: {
    description: "Base information needed to describe a setting entry",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        type: "object",
        properties: {
          label: {
            description: "localizeKey that displays in the settings dialog as the setting name",
            $ref: "#/$defs/localizeKey"
          },
          description: {
            description: "localizeKey that displays in the settings dialog to describe the setting",
            $ref: "#/$defs/localizeKey"
          }
        },
        required: ["label"]
      }
    ]
  },
  projectStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the project state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateContribution: {
    description: "The data an extension provides to inform Platform.Bible of the user state it provides",
    $ref: "#/$defs/userStateProperties"
  },
  userStateProperties: {
    description: "Object whose keys are state IDs and whose values are state objects",
    type: "object",
    patternProperties: {
      "^[\\w\\-]+\\.[\\w\\-]+$": {
        $ref: "#/$defs/userState"
      }
    },
    additionalProperties: !1
  },
  userState: {
    description: "A description of an extension's user state entry",
    anyOf: [
      {
        $ref: "#/$defs/extensionControlledState"
      }
    ]
  },
  extensionControlledState: {
    description: "State definition that is validated by the extension.",
    allOf: [
      {
        $ref: "#/$defs/stateBase"
      },
      {
        $ref: "#/$defs/modifierExtensionControlled"
      }
    ]
  },
  modifierExtensionControlled: {
    description: 'Modifies state/setting type to be extension-controlled. "Extension-controlled" means the extension provides the component and the validator for the state/setting, so the state/setting is controlled by the extension.',
    not: {
      anyOf: [
        {
          type: "object",
          required: ["platformType"]
        },
        {
          type: "object",
          required: ["type"]
        }
      ]
    }
  },
  stateBase: {
    description: "Base information needed to describe a state entry",
    type: "object",
    properties: {
      default: {
        description: "default value for the state/setting",
        type: "any"
      },
      derivesFrom: {
        description: "a state/setting ID whose value to set to this state/setting's starting value the first time this state/setting is loaded",
        $ref: "#/$defs/id"
      }
    },
    required: ["default"]
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  },
  id: {
    description: "",
    type: "string",
    pattern: "^[\\w\\-]+\\.[\\w\\-]+$",
    tsType: "Id"
  }
};
function zt(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && zt(e.properties);
    }
  });
}
zt(Gt);
const Ou = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Project Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the project settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/projectSettingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/projectSettingsGroup"
      }
    }
  ],
  $defs: Gt
};
Object.freeze(Ou);
const Iu = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Settings Contribution",
  description: "The data an extension provides to inform Platform.Bible of the settings it provides",
  anyOf: [
    {
      $ref: "#/$defs/settingsGroup"
    },
    {
      type: "array",
      items: {
        $ref: "#/$defs/settingsGroup"
      }
    }
  ],
  $defs: Gt
};
Object.freeze(Iu);
const Gr = {
  languageStrings: {
    description: "Map whose keys are localized string keys and whose values provide information about how to localize strings for the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/localizedStringValue"
      }
    },
    additionalProperties: !1
  },
  localizedStringValue: {
    description: "Localized string value associated with this key",
    type: "string"
  },
  stringsMetadata: {
    description: "Map whose keys are localized string keys and whose values provide additional non-locale-specific information about the localized string key",
    type: "object",
    patternProperties: {
      "^%[\\w\\-\\.]+%$": {
        $ref: "#/$defs/stringMetadata"
      }
    },
    additionalProperties: !1
  },
  stringMetadata: {
    description: "Additional non-locale-specific information about a localized string key",
    type: "object",
    properties: {
      fallbackKey: {
        description: "Localized string key from which to get this value if one does not exist in the specified language. If a new key/value pair needs to be made to replace an existing one, this could help smooth over the transition if the meanings are close enough.\nYou can use Paratext 9 Localized String Keys here. Be sure to escape any % signs with a backslash `\\`.",
        type: "string",
        pattern: "^%[\\w\\-\\.;&,' (){}#:/\\\\?%⋮|[\\]“”‘’!~* +=•`…​↑↓]+%$",
        tsType: "LocalizeKey"
      },
      notes: {
        description: "Additional information provided by developers in English to help the translator to know how to translate this localized string accurately",
        type: "string"
      }
    }
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: "string",
    pattern: "^%[\\w\\-\\.]+%$",
    tsType: "LocalizeKey"
  }
};
zt(Gr);
const Ru = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Localized String Data Contribution",
  description: "The data an extension provides to inform Platform.Bible of the localized strings it provides.",
  type: "object",
  properties: {
    metadata: {
      $ref: "#/$defs/stringsMetadata"
    },
    localizedStrings: {
      type: "object",
      additionalProperties: {
        $ref: "#/$defs/languageStrings"
      }
    }
  },
  $defs: Gr
};
Object.freeze(Ru);
const xu = {
  title: "Platform.Bible menus",
  type: "object",
  properties: {
    mainMenu: {
      description: "Top level menu for the application",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewTopMenu: {
      description: "Default top menu for web views that don't specify their own",
      $ref: "#/$defs/multiColumnMenu"
    },
    defaultWebViewContextMenu: {
      description: "Default context menu for web views that don't specify their own",
      $ref: "#/$defs/singleColumnMenu"
    },
    webViewMenus: {
      description: "Menus that apply per web view in the application",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          $ref: "#/$defs/menusForOneWebView"
        }
      },
      additionalProperties: !1
    }
  },
  required: ["mainMenu", "defaultWebViewTopMenu", "defaultWebViewContextMenu", "webViewMenus"],
  additionalProperties: !1,
  $defs: {
    localizeKey: {
      description: "Identifier for a string that will be localized in a menu based on the user's UI language",
      type: "string",
      pattern: "^%[\\w\\-\\.]+%$"
    },
    referencedItem: {
      description: "Name of some UI element (i.e., tab, column, group, menu item) or some PAPI object (i.e., command)",
      type: "string",
      pattern: "^[\\w\\-]+\\.[\\w\\-]+$"
    },
    columnsWithHeaders: {
      description: "Group of columns that can be combined with other columns to form a multi-column menu",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single column with a header string",
          type: "object",
          properties: {
            label: {
              description: "Header text for this this column in the UI",
              $ref: "#/$defs/localizeKey"
            },
            localizeNotes: {
              description: "Additional information provided by developers to help people who perform localization",
              type: "string"
            },
            order: {
              description: "Relative order of this column compared to other columns (sorted ascending)",
              type: "number"
            },
            isExtensible: {
              description: "Defines whether contributions are allowed to add menu groups to this column",
              type: "boolean"
            }
          },
          required: ["label", "order"],
          additionalProperties: !1
        }
      },
      properties: {
        isExtensible: {
          description: "Defines whether contributions are allowed to add columns to this multi-column menu",
          type: "boolean"
        }
      }
    },
    menuGroups: {
      description: "Group of menu items that can be combined with other groups to form a single menu/submenu. Groups are separated using a line within the menu/submenu.",
      type: "object",
      patternProperties: {
        "^[\\w\\-]+\\.[\\w\\-]+$": {
          description: "Single group that contains menu items",
          type: "object",
          oneOf: [
            {
              properties: {
                column: {
                  description: "Column where this group belongs, not required for single column menus",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                }
              },
              required: ["order"],
              additionalProperties: !1
            },
            {
              properties: {
                menuItem: {
                  description: "Menu item that anchors the submenu where this group belongs",
                  $ref: "#/$defs/referencedItem"
                },
                order: {
                  description: "Relative order of this group compared to other groups in the same column or submenu (sorted ascending)",
                  type: "number"
                },
                isExtensible: {
                  description: "Defines whether contributions are allowed to add menu items to this menu group",
                  type: "boolean"
                }
              },
              required: ["menuItem", "order"],
              additionalProperties: !1
            }
          ]
        }
      },
      additionalProperties: !1
    },
    menuItem: {
      description: "Single item in a menu that can be clicked on to take an action or can be the parent of a submenu",
      type: "object",
      oneOf: [
        {
          properties: {
            id: {
              description: "ID for this menu item that holds a submenu",
              $ref: "#/$defs/referencedItem"
            }
          },
          required: ["id"]
        },
        {
          properties: {
            command: {
              description: "Name of the PAPI command to run when this menu item is selected.",
              $ref: "#/$defs/referencedItem"
            },
            iconPathBefore: {
              description: "Uri path to the icon to display before the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`",
              type: "string"
            },
            iconPathAfter: {
              description: "Uri path to the icon to display after the menu text. Ex: `papi-extension://helloWorld/assets/icon.png`",
              type: "string"
            }
          },
          required: ["command"]
        }
      ],
      properties: {
        label: {
          description: "Key that represents the text of this menu item to display",
          $ref: "#/$defs/localizeKey"
        },
        tooltip: {
          description: "Key that represents the text to display if a mouse pointer hovers over the menu item",
          $ref: "#/$defs/localizeKey"
        },
        searchTerms: {
          description: "Key that represents additional words the platform should reference when users are searching for menu items",
          $ref: "#/$defs/localizeKey"
        },
        localizeNotes: {
          description: "Additional information provided by developers to help people who perform localization",
          type: "string"
        },
        group: {
          description: "Group to which this menu item belongs",
          $ref: "#/$defs/referencedItem"
        },
        order: {
          description: "Relative order of this menu item compared to other menu items in the same group (sorted ascending)",
          type: "number"
        }
      },
      required: ["label", "group", "order"],
      unevaluatedProperties: !1
    },
    groupsAndItems: {
      description: "Core schema for a column",
      type: "object",
      properties: {
        groups: {
          description: "Groups that belong in this menu",
          $ref: "#/$defs/menuGroups"
        },
        items: {
          description: "List of menu items that belong in this menu",
          type: "array",
          items: { $ref: "#/$defs/menuItem" },
          uniqueItems: !0
        }
      },
      required: ["groups", "items"]
    },
    singleColumnMenu: {
      description: "Menu that contains a column without a header",
      type: "object",
      allOf: [{ $ref: "#/$defs/groupsAndItems" }],
      unevaluatedProperties: !1
    },
    multiColumnMenu: {
      description: "Menu that can contain multiple columns with headers",
      type: "object",
      allOf: [
        { $ref: "#/$defs/groupsAndItems" },
        {
          properties: {
            columns: {
              description: "Columns that belong in this menu",
              $ref: "#/$defs/columnsWithHeaders"
            }
          },
          required: ["columns"]
        }
      ],
      unevaluatedProperties: !1
    },
    menusForOneWebView: {
      description: "Set of menus that are associated with a single tab",
      type: "object",
      properties: {
        includeDefaults: {
          description: "Indicates whether the platform default menus should be included for this webview",
          type: "boolean"
        },
        topMenu: {
          description: "Menu that opens when you click on the top left corner of a tab",
          $ref: "#/$defs/multiColumnMenu"
        },
        contextMenu: {
          description: "Menu that opens when you right click on the main body/area of a tab",
          $ref: "#/$defs/singleColumnMenu"
        }
      },
      additionalProperties: !1
    }
  }
};
Object.freeze(xu);
const ke = ["figure", "note", "sidebar", "table"];
Object.freeze(ke);
class Ee {
  constructor(e) {
    W(this, "usj");
    W(this, "parentMapInternal");
    this.usj = e;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const n = Wt({ path: e, json: this.usj, wrap: !0 });
    if (n === void 0 || n.length === 0) return;
    if (!Array.isArray(n[0])) return n[0];
    const i = Wt({ path: e, json: this.usj, wrap: !1 });
    return i.length === 1 && Array.isArray(i[0]) ? i[0] : i;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  findBookId() {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }
  findChapterNode(e) {
    const n = `$..content[?(@.type=="chapter" && @.number=="${e}")]`;
    return this.findSingleValue(n);
  }
  // #endregion
  // #region Parent Maps
  static createParentMapInternal(e, n, i) {
    var o;
    i.set(e, n), e.content && i.set(e.content, e), (o = e.content) == null || o.forEach((a) => {
      typeof a == "object" && Ee.createParentMapInternal(a, e, i);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((n) => {
      typeof n == "object" && Ee.createParentMapInternal(n, this.usj, e);
    }), e;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    return this.parentMapInternal ? this.parentMapInternal : (this.parentMapInternal = this.createUsjParentMap(), this.parentMapInternal);
  }
  // #endregion
  // #region Working Stacks
  /** Return the working stack applicable to the given node */
  createWorkingStack(e) {
    const n = [], { parentMap: i } = this;
    let o = e, a = i.get(o);
    for (; a !== void 0; ) {
      if (!a.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !a.content.find((h, f) => {
          if (h !== o) return !1;
          if (!a) throw new Error('undefined "tempParent" should not be possible');
          return n.unshift({ parent: a, index: f }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(o)}`);
      if (a.type === qt) break;
      o = a, a = i.get(a);
    }
    return n;
  }
  static convertWorkingStackToJsonPath(e) {
    let n = "$";
    return e.forEach((i) => {
      n = `${n}.content[${i.index}]`;
    }), n;
  }
  convertJsonPathToWorkingStack(e) {
    const n = [], i = e.match(/content\[(\d+)\]/g);
    if (!i) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let o = this.usj;
    return i.forEach((a, h) => {
      const f = /(\d+)/.exec(a);
      if (!f) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const p = parseInt(f[0], 10);
      if (n.push({ parent: o, index: p }), h + 1 < i.length) {
        if (typeof o == "string" || !o.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(o)}`);
        const m = o.content[p];
        if (typeof m == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(m)}`);
        o = m;
      }
    }), n;
  }
  // #endregion
  // #region Walk the node tree
  /**
   * Given the starting point of a tree to consider (`node`), find the rightmost MarkerObject from
   * the array of `content`. In the following example, this would be "J".
   *
   *         A        <- Consider "A" to be `node`
   *     / / | \ \
   *     B C D E F    <- Consider these to be MarkerObjects inside the `content` array owned by "A"
   *     |  / \  |
   *     G H   I J    <- Consider these to be MarkerObjects inside their parents `content` arrays
   *
   * If "F" did not exist in this example, then "E" would be returned. If "E" and "F" didn't exist,
   * then "I" would be returned.
   *
   * The general idea here is that we are looking for the MarkerObject in Usj that is immediately
   * adjacent to whatever `node`'s next sibling is in `parent`'s `content` array.
   */
  static findRightMostDescendantMarkerObject(e, n, i = []) {
    if (!e.content) return { node: e, parent: n };
    for (let o = e.content.length - 1; o >= 0; o--) {
      const a = e.content[o];
      if (typeof a == "object" && !i.includes(a.type))
        return a.content ? this.findRightMostDescendantMarkerObject(a, e, i) : { node: a, parent: e };
    }
    return { node: e, parent: n };
  }
  static findNextMatchingNodeUsingWorkingStack(e, n, i, o) {
    var h;
    let a = e;
    for (; a !== void 0; ) {
      const f = typeof a == "object" && i.includes(a.type);
      if (!f && o(a, n)) return a;
      if (!f && typeof a == "object" && (((h = a.content) == null ? void 0 : h.length) ?? 0) > 0)
        n.push({ parent: a, index: 0 }), [a] = a.content;
      else
        for (a = void 0; n.length > 0; ) {
          const p = n.pop();
          if (p && p.index + 1 < p.parent.content.length) {
            p.index += 1, n.push(p), a = p.parent.content[p.index];
            break;
          }
        }
    }
  }
  /**
   * Walk through a USJ node tree depth-first, left-to-right to find the first node that matches
   * criteria specified by `searchFunction` (i.e., the first node where `searchFunction` returns
   * `true`)
   */
  findNextMatchingNode(e, n, i) {
    const o = this.createWorkingStack(e);
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e,
      o,
      n,
      i
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return Ee.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion
  // #region USJ + node -> VerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(e, n, i = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (i.verseNum !== void 0 && i.chapterNum !== void 0) return i;
    if (typeof e == "object" && e.number !== void 0) {
      const p = Number.parseInt(e.number, 10);
      if (e.type === It)
        return i.chapterNum = p, i.verseNum = i.verseNum ?? 0, i.startingContentNode = i.startingContentNode ?? e, i;
      e.type === Rt && !i.verseNum && (i.verseNum = p, i.startingContentNode = e);
    }
    if (!n.content)
      throw new Error(`"content" array not found: ${JSON.stringify(n)}`);
    let o = 0;
    for (let p = 0; p < n.content.length; p++)
      if (n.content[p] === e) {
        o = p;
        break;
      }
    let a = o - 1;
    for (; a >= 0 && typeof n.content[a] != "object"; )
      a -= 1;
    if (a < 0) {
      if (n.type === qt)
        return i.chapterNum === void 0 && (i.chapterNum = 1, i.verseNum = 0, i.startingContentNode = void 0), i;
      const p = n, m = this.parentMap.get(p);
      if (!m) throw new Error(`No parent found for ${JSON.stringify(n)}`);
      return this.findVerseRefForNode(p, m, i);
    }
    const h = n.content[a], f = Ee.findRightMostDescendantMarkerObject(
      h,
      n,
      ke
    );
    return this.findVerseRefForNode(f.node, f.parent, i);
  }
  nodeToVerseRefAndOffset(e, n, i) {
    if (typeof n == "string" && i === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let o;
    if (i === void 0 ? o = this.parentMap.get(n) : o = Array.isArray(i) ? this.parentMap.get(i) : i, o === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(i)}`);
    const a = this.findVerseRefForNode(n, o);
    if (!a) return;
    if (!a.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(n)}`);
    const h = new Ht(
      e,
      a.chapterNum.toString(),
      a.verseNum ? a.verseNum.toString() : "0"
    );
    let f = 0;
    return a.startingContentNode !== void 0 && this.findNextMatchingNode(a.startingContentNode, [], (p, m) => {
      var E, l;
      return p === n ? !0 : m.find((v) => ke.includes(v.parent.type)) ? !1 : typeof p == "string" ? (f += p.length, !1) : p.type === It && p.number !== ((E = a.chapterNum) == null ? void 0 : E.toString()) || p.type === Rt && p.number !== ((l = a.verseNum) == null ? void 0 : l.toString()) ? (f = 0, !0) : !1;
    }), { verseRef: h, offset: f };
  }
  // #endregion
  // #region JSONPath -> VerseRef + offset
  jsonPathToVerseRefAndOffset(e, n) {
    const i = n ?? this.findBookId();
    if (!i) throw new Error("Not able to determine the book ID");
    const o = this.findSingleValue(e);
    if (!o) throw new Error(`No result found for JSONPath query: ${e}`);
    const a = this.findParent(e);
    if (!a) throw new Error(`Could not determine parent for ${e}`);
    const h = this.nodeToVerseRefAndOffset(i, o, a);
    if (!h)
      throw new Error(`Could not determine VerseRef that corresponds to ${e}`);
    return h;
  }
  // #endregion
  // #region VerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(e, n = 0) {
    if (n < 0) throw new Error("offset must be >= 0");
    const i = this.findBookId() ?? e.book;
    if (!i) throw new Error("Not able to determine the book ID");
    if (i !== e.book)
      throw new Error(`Book IDs don't match: USJ=${i}, VerseRef=${e.book}`);
    const o = this.findChapterNode(e.chapterNum);
    if (o === void 0)
      throw new Error(`Could not find ${i} chapter ${e.chapterNum}`);
    let a = !1, h = "";
    const f = e.verse, p = this.findNextMatchingNode(
      o,
      ke,
      (v, w) => v === o ? e.verseNum === 0 ? (h = Ee.convertWorkingStackToJsonPath(w), !0) : !1 : typeof v != "object" ? !1 : v.type === It ? (a = !0, !0) : v.type === Rt && v.number !== void 0 && v.number === f ? (h = Ee.convertWorkingStackToJsonPath(w), !0) : !1
    );
    if (a || p === void 0 || typeof p == "string")
      throw new Error(`Verse ${f} not found in ${i} ${e.chapterNum}`);
    if (n === 0) return { node: p, offset: 0, jsonPath: h };
    let m = 0, E = 0, l;
    return this.findNextMatchingNode(
      p,
      ke,
      (v, w) => {
        if (v === p) return !1;
        if (typeof v == "string") {
          if (m += v.length, m > n)
            return h = Ee.convertWorkingStackToJsonPath(w), E = n - m + v.length, l = v, !0;
        } else if (v.type === It || v.type === Rt) return !0;
        return !1;
      }
    ), { node: l ?? p, offset: E, jsonPath: h };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(e, n, i = 1e3) {
    let o = "", a = 0, h = 0, f = 0;
    if (Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      ke,
      (l) => {
        if (typeof l != "string") return !1;
        a += l.length, o = `${o}${l}`;
        const v = o.indexOf(n);
        return v < 0 ? (h += o.length, o.length > n.length && (o = o.substring(o.length - n.length)), h -= o.length, a > i) : (f = h + v, !0);
      }
    ), f <= 0) return;
    a = 0;
    let p = 0, m = [];
    const E = Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      ke,
      (l, v) => typeof l != "string" || (a += l.length, a < f + 1) ? !1 : (p = f - a + l.length, m = v, !0)
    );
    if (!E) throw new Error("Internal error: inconsistent search results");
    return {
      node: E,
      offset: p,
      jsonPath: Ee.convertWorkingStackToJsonPath(m)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(e, n) {
    let i = "", o = e.offset, a = 0;
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      ke,
      (h) => {
        if (typeof h != "string") return !1;
        if (o >= h.length)
          return o -= h.length, !1;
        let f = h;
        if (o > 0 && (f = f.substring(o), o = 0), a + f.length < n)
          return a += f.length, i = `${i}${f}`, !1;
        const p = n - a;
        return i = `${i}${f.substring(0, p - 1)}`, !0;
      }
    ), i;
  }
  extractTextBetweenPoints(e, n, i = 100) {
    let o = "";
    return Ee.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      ke,
      (a, h) => a === n.node && (typeof a == "object" || n.jsonPath === Ee.convertWorkingStackToJsonPath(h)) ? !0 : typeof a != "string" ? !1 : (o = `${o}${a}`, o.length > i && (o = o.substring(0, i)), o.length >= i)
    ), o;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, n) {
    let i = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      n(a) ? (e.splice(o, 1), i += 1) : typeof a != "string" && a.content && (i += this.removeContentNodesFromArray(a.content, n));
    }
    return i;
  }
  removeContentNodes(e) {
    const n = Ee.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), n;
  }
  // #endregion
}
export {
  Pu as AsyncVariable,
  It as CHAPTER_TYPE,
  Lu as Collator,
  Yr as DateTimeFormat,
  tn as DocumentCombiner,
  Bn as FIRST_SCR_BOOK_NUM,
  Pn as FIRST_SCR_CHAPTER_NUM,
  Ln as FIRST_SCR_VERSE_NUM,
  _n as LAST_SCR_BOOK_NUM,
  nn as Mutex,
  Hu as MutexMap,
  Gu as NonValidatingDocumentCombiner,
  un as NumberFormat,
  Kr as PlatformEventEmitter,
  zu as PromiseChainingMap,
  Ju as UnsubscriberAsyncList,
  Ee as UsjReaderWriter,
  Rt as VERSE_TYPE,
  mi as aggregateUnsubscriberAsyncs,
  di as aggregateUnsubscribers,
  hi as areUsjContentsEqualExceptWhitespace,
  Ot as at,
  Et as charAt,
  Yu as codePointAt,
  li as compareScrRefs,
  Uu as createSyncProxyForAsyncObject,
  ku as debounce,
  wt as deepClone,
  Cu as deepEqual,
  ii as defaultScrRef,
  Tu as deserialize,
  Tn as endsWith,
  kr as ensureArray,
  ri as escapeStringRegexp,
  vi as formatBytes,
  Ku as formatReplacementString,
  Sn as formatReplacementStringToArray,
  pi as formatScrRef,
  Ai as formatTimeSpan,
  ju as getAllObjectFunctionNames,
  Fn as getChaptersForBook,
  Di as getCurrentLocale,
  Zr as getErrorMessage,
  kn as getLocalizeKeyForScrollGroupId,
  fi as getLocalizeKeysForScrollGroupIds,
  ci as getLocalizedIdFromBookNumber,
  qu as groupBy,
  gi as htmlEncode,
  On as includes,
  St as indexOf,
  Vu as isErrorMessageAboutParatextBlockingInternetAccess,
  ti as isLocalizeKey,
  Ei as isSerializable,
  qe as isString,
  yu as isSubset,
  mt as isWhiteSpace,
  In as lastIndexOf,
  Ru as localizedStringsDocumentSchema,
  xu as menuDocumentSchema,
  Fu as newGuid,
  Wu as normalize,
  gr as normalizeScriptureSpaces,
  oi as offsetBook,
  ai as offsetChapter,
  si as offsetVerse,
  Qu as ordinalCompare,
  Zu as padEnd,
  ei as padStart,
  Ou as projectSettingsDocumentSchema,
  mr as scrRefToBBBCCCVVV,
  Or as serialize,
  Iu as settingsDocumentSchema,
  hr as slice,
  dr as split,
  qr as startsWith,
  pe as stringLength,
  tt as substring,
  Rn as toArray,
  ui as transformAndEnsureRegExpArray,
  ni as transformAndEnsureRegExpRegExpArray,
  en as wait,
  $u as waitForDuration
};
//# sourceMappingURL=index.js.map
