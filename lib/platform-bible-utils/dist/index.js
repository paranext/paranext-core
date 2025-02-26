var au = Object.defineProperty;
var su = (e, t, r) => t in e ? au(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var I = (e, t, r) => su(e, typeof t != "symbol" ? t + "" : t, r);
import { Mutex as cu } from "async-mutex";
import { JSONPath as dr } from "jsonpath-plus";
class ja {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(t, r = 1e4) {
    I(this, "variableName");
    I(this, "promiseToValue");
    I(this, "resolver");
    I(this, "rejecter");
    this.variableName = t, this.promiseToValue = new Promise((n, u) => {
      this.resolver = n, this.rejecter = u;
    }), r > 0 && setTimeout(() => {
      this.rejecter && (this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`), this.complete());
    }, r), Object.seal(this);
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
  resolveToValue(t, r = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(t), this.complete();
    else {
      if (r) throw Error(`${this.variableName} was already settled`);
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
  rejectWithReason(t, r = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(t), this.complete();
    else {
      if (r) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
class Ua {
  constructor(t, r) {
    I(this, "collator");
    this.collator = new Intl.Collator(t, r);
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
  compare(t, r) {
    return this.collator.compare(t, r);
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
class lu {
  constructor(t, r) {
    I(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(t, r);
  }
  /**
   * Formats a date according to the locale and formatting option for this DateTimeFormat object
   *
   * @param date The date to format
   * @returns String representing the given date formatted according to the locale and formatting
   *   options of this DateTimeFormat object
   */
  format(t) {
    return this.dateTimeFormatter.format(t);
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
  formatRange(t, r) {
    return this.dateTimeFormatter.formatRange(t, r);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(t, r) {
    return this.dateTimeFormatter.formatRangeToParts(t, r);
  }
  /**
   * Allows locale-aware formatting of strings produced by this DateTimeFormat object
   *
   * @param date The date to format
   * @returns Array of DateTimeFormatPart objects
   */
  formatToParts(t) {
    return this.dateTimeFormatter.formatToParts(t);
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
class fu {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    I(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    I(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    I(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    I(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    I(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    I(this, "emit", (t) => {
      this.emitFn(t);
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
    return this.assertNotDisposed(), this.lazyEvent || (this.lazyEvent = (t) => {
      if (!t || typeof t != "function")
        throw new Error("Event handler callback must be a function!");
      return this.subscriptions || (this.subscriptions = []), this.subscriptions.push(t), () => {
        if (!this.subscriptions) return !1;
        const r = this.subscriptions.indexOf(t);
        return r < 0 ? !1 : (this.subscriptions.splice(r, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(t) {
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((n) => n(t));
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
function Va() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function ae(e) {
  return typeof e == "string" || e instanceof String;
}
function Ye(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ha(e, t = 300) {
  if (ae(e)) throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...n) => {
    clearTimeout(r), r = setTimeout(() => e(...n), t);
  };
}
function Ga(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((u) => {
    const i = t(u), a = n.get(i), o = r ? r(u, i) : u;
    a ? a.push(o) : n.set(i, [o]);
  }), n;
}
function pu(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function hu(e) {
  if (pu(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function za(e) {
  return hu(e).message;
}
function du(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Ja(e, t) {
  const r = du(t).then(() => {
  });
  return Promise.any([r, e()]);
}
function Xa(e, t = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((u) => {
    try {
      typeof e[u] == "function" && r.add(u);
    } catch {
    }
  });
  let n = Object.getPrototypeOf(e);
  for (; n && Object.getPrototypeOf(n); )
    Object.getOwnPropertyNames(n).forEach((u) => {
      try {
        typeof e[u] == "function" && r.add(u);
      } catch {
      }
    }), n = Object.getPrototypeOf(n);
  return r;
}
function Ya(e, t = {}) {
  return new Proxy(t, {
    get(r, n) {
      return n in r ? r[n] : async (...u) => (await e())[n](...u);
    }
  });
}
class mu {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(t, r) {
    I(this, "baseDocument");
    I(this, "contributions", /* @__PURE__ */ new Map());
    I(this, "latestOutput");
    I(this, "options");
    I(this, "onDidRebuildEmitter", new fu());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    I(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = t, this.options = r, this.updateBaseDocument(t);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(t) {
    return this.validateBaseDocument(t), this.baseDocument = this.options.copyDocuments ? Ye(t) : t, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
  addOrUpdateContribution(t, r) {
    this.validateContribution(t, r);
    const n = this.contributions.get(t);
    let u = this.options.copyDocuments && r ? Ye(r) : r;
    u = this.transformContributionAfterValidation(t, u), this.contributions.set(t, u);
    try {
      return this.rebuild();
    } catch (i) {
      throw n ? this.contributions.set(t, n) : this.contributions.delete(t), new Error(`Error when setting the document named ${t}: ${i}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(t) {
    const r = this.contributions.get(t);
    if (!r) throw new Error(`${t} does not exist`);
    this.contributions.delete(t);
    try {
      return this.rebuild();
    } catch (n) {
      throw this.contributions.set(t, r), new Error(`Error when deleting the document named ${t}: ${n}`);
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
    const t = [...this.contributions.entries()];
    t.forEach(([r]) => this.contributions.delete(r));
    try {
      return this.rebuild();
    } catch (r) {
      throw t.forEach(
        ([n, u]) => this.contributions.set(n, u)
      ), new Error(`Error when deleting all contributions: ${r}`);
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
      let r = Ye(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let t = this.baseDocument;
    return this.contributions.forEach((r) => {
      t = Eu(
        t,
        r,
        this.options.ignoreDuplicateProperties
      ), this.validateOutput(t);
    }), t = this.transformFinalOutputBeforeValidation(t), this.validateOutput(t), this.latestOutput = t, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
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
  transformBaseDocumentAfterValidation(t) {
    return t;
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
  transformContributionAfterValidation(t, r) {
    return r;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateBaseDocument(t) {
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
  validateContribution(t, r) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
  validateOutput(t) {
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
  transformFinalOutputBeforeValidation(t) {
    return t;
  }
}
function mr(...e) {
  let t = !0;
  return e.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (t = !1);
  }), t;
}
function Er(...e) {
  let t = !0;
  return e.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (t = !1);
  }), t;
}
function Eu(e, t, r) {
  const n = Ye(e);
  return t ? nn(n, Ye(t), r) : n;
}
function nn(e, t, r) {
  if (!t) return e;
  if (mr(e, t)) {
    const n = e, u = t;
    Object.keys(u).forEach((i) => {
      if (Object.hasOwn(n, i)) {
        if (mr(n[i], u[i]))
          n[i] = nn(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[i],
            u[i],
            r
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (Er(n[i], u[i]))
          n[i] = n[i].concat(
            u[i]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${i}" already exists in the target object`);
      } else
        n[i] = u[i];
    });
  } else Er(e, t) && e.push(...t);
  return e;
}
class gu extends cu {
}
class Ka {
  constructor() {
    I(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(t) {
    let r = this.mutexesByID.get(t);
    return r || (r = new gu(), this.mutexesByID.set(t, r), r);
  }
}
class Wa extends mu {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t, r) {
    super(t, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class Du {
  constructor(t, r) {
    I(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(t, r);
  }
  /**
   * Formats a number according to the locale and formatting options of this NumberFormat object
   *
   * @param value Number or BigInt to format
   * @returns String representing the given number formatted according to the locale and formatting
   *   options of this NumberFormat object
   */
  format(t) {
    return this.numberFormatter.format(t);
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
  formatRange(t, r) {
    return this.numberFormatter.formatRange(t, r);
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
  formatRangeToParts(t, r) {
    return this.numberFormatter.formatRangeToParts(t, r);
  }
  /**
   * Allows locale-aware formatting of strings produced by this NumberFormat object
   *
   * @param value Number or bigint to format
   * @returns Array of NumberFormatPart objects containing the formatted number in parts
   */
  formatToParts(t) {
    return this.numberFormatter.formatToParts(t);
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
const vu = Promise.resolve();
class Qa {
  /**
   * Creates a new PromiseChainingMap
   *
   * @param logger Object with a `warn` method that will be called when a promise rejects. This
   *   defaults to `console`.
   */
  constructor(t = console) {
    I(this, "map", /* @__PURE__ */ new Map());
    I(this, "logger");
    this.logger = t;
  }
  /**
   * Adds a promise function to the map for a given key. If a promise is already running for the
   * key, the new promise will be chained to the existing one. Once all promises for a key have
   * settled, the map will be cleared for that key.
   *
   * @param key Unique key to identify a distinct promise chain
   * @param promiseFunction Function that returns a promise to add to the chain
   */
  addPromiseFunction(t, r) {
    const n = this.map.get(t);
    this.map.set(t, n ? n.then(r) : r()), this.cleanupPromiseChain(t);
  }
  /**
   * Gets the current promise chain for the given key. This is mostly useful for testing. Normally
   * you should just call {@link addPromiseFunction} and let the map handle the rest.
   *
   * @param key Unique key to identify a distinct promise chain
   * @returns The current promise chain for the key
   */
  get(t) {
    return this.map.get(t);
  }
  /**
   * Configures a promise chain to be removed from the map for the given key after all the promises
   * have settled
   *
   * @param key Unique key to identify a distinct promise chain
   */
  cleanupPromiseChain(t) {
    const r = this.map.get(t);
    if (!r) return;
    const n = { promise: vu }, u = r.catch((i) => this.logger.warn(`Error in promise for ${t}: ${i.message}`)).finally(() => {
      this.map.get(t) === n.promise && this.map.delete(t);
    });
    n.promise = u, this.map.set(t, u);
  }
}
class Za {
  constructor(t = "Anonymous") {
    I(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = t;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...t) {
    t.forEach((r) => {
      "dispose" in r ? this.unsubscribers.add(r.dispose) : this.unsubscribers.add(r);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const t = [...this.unsubscribers].map((n) => n()), r = await Promise.all(t);
    return this.unsubscribers.clear(), r.every((n, u) => (n || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${u} failed!`), n));
  }
}
var Au = Object.defineProperty, Nu = (e, t, r) => t in e ? Au(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, N = (e, t, r) => Nu(e, typeof t != "symbol" ? t + "" : t, r);
const me = [
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
], Xt = [
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
], un = [
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
], gr = Bu();
function Pe(e, t = !0) {
  return t && (e = e.toUpperCase()), e in gr ? gr[e] : 0;
}
function Yt(e) {
  return Pe(e) > 0;
}
function bu(e) {
  const t = typeof e == "string" ? Pe(e) : e;
  return t >= 40 && t <= 66;
}
function yu(e) {
  return (typeof e == "string" ? Pe(e) : e) <= 39;
}
function on(e) {
  return e <= 66;
}
function Cu(e) {
  const t = typeof e == "string" ? Pe(e) : e;
  return cn(t) && !on(t);
}
function* Tu() {
  for (let e = 1; e <= me.length; e++) yield e;
}
const wu = 1, an = me.length;
function Su() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Kt(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= me.length ? t : me[r];
}
function sn(e) {
  return e <= 0 || e > an ? "******" : un[e - 1];
}
function Ou(e) {
  return sn(Pe(e));
}
function cn(e) {
  const t = typeof e == "number" ? Kt(e) : e;
  return Yt(t) && !Xt.includes(t);
}
function Iu(e) {
  const t = typeof e == "number" ? Kt(e) : e;
  return Yt(t) && Xt.includes(t);
}
function Ru(e) {
  return un[e - 1].includes("*obsolete*");
}
function Bu() {
  const e = {};
  for (let t = 0; t < me.length; t++)
    e[me[t]] = t + 1;
  return e;
}
const Q = {
  allBookIds: me,
  nonCanonicalIds: Xt,
  bookIdToNumber: Pe,
  isBookIdValid: Yt,
  isBookNT: bu,
  isBookOT: yu,
  isBookOTNT: on,
  isBookDC: Cu,
  allBookNumbers: Tu,
  firstBook: wu,
  lastBook: an,
  extraBooks: Su,
  bookNumberToId: Kt,
  bookNumberToEnglishName: sn,
  bookIdToEnglishName: Ou,
  isCanonical: cn,
  isExtraMaterial: Iu,
  isObsolete: Ru
};
var ee = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ee || {});
const z = class {
  // private versInfo: Versification;
  constructor(t) {
    if (N(this, "name"), N(this, "fullPath"), N(this, "isPresent"), N(this, "hasVerseSegments"), N(this, "isCustomized"), N(this, "baseVersification"), N(this, "scriptureBooks"), N(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = ee[t]) : (this._type = t, this.name = ee[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
N(z, "Original", new z(ee.Original)), N(z, "Septuagint", new z(ee.Septuagint)), N(z, "Vulgate", new z(ee.Vulgate)), N(z, "English", new z(ee.English)), N(z, "RussianProtestant", new z(ee.RussianProtestant)), N(z, "RussianOrthodox", new z(ee.RussianOrthodox));
let oe = z;
function Dr(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var ln = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(ln || {});
const k = class T {
  constructor(t, r, n, u) {
    if (N(this, "firstChapter"), N(this, "lastChapter"), N(this, "lastVerse"), N(this, "hasSegmentsDefined"), N(this, "text"), N(this, "BBBCCCVVVS"), N(this, "longHashCode"), N(this, "versification"), N(this, "rtlMark", "‏"), N(this, "_bookNum", 0), N(this, "_chapterNum", 0), N(this, "_verseNum", 0), N(this, "_verse"), n == null && u == null)
      if (t != null && typeof t == "string") {
        const i = t, a = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(i), this._verseNum = t % T.chapterDigitShifter, this._chapterNum = Math.floor(
          t % T.bookDigitShifter / T.chapterDigitShifter
        ), this._bookNum = Math.floor(t / T.bookDigitShifter);
      } else if (r == null)
        if (t != null && t instanceof T) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null) return;
          const i = t instanceof oe ? t : T.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && r != null && n != null)
      if (typeof t == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(u), this.updateInternal(t, r, n);
      else if (typeof t == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = t, this._chapterNum = r, this._verseNum = n, this.versification = u ?? T.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(t) {
    return t.length > 0 && "0123456789".includes(t[0]) && !t.endsWith(this.verseRangeSeparator) && !t.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(t) {
    let r;
    try {
      return r = new T(t), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof Ve)
        return r = new T(), { success: !1, verseRef: r };
      throw n;
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
  static getBBBCCCVVV(t, r, n) {
    return t % T.bcvMaxValue * T.bookDigitShifter + (r >= 0 ? r % T.bcvMaxValue * T.chapterDigitShifter : 0) + (n >= 0 ? n % T.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: r, chapterNum: n, verseNum: u, verse: i, versificationStr: a } = t, o = i || u.toString();
    let s;
    return a && (s = new oe(a)), r ? new T(r, n.toString(), o, s) : new T();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(t) {
    let r;
    if (!t)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let n;
    for (let u = 0; u < t.length; u++) {
      if (n = t[u], n < "0" || n > "9")
        return u === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +n - 0, r > T.bcvMaxValue)
        return r = -1, { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
    return this._verse != null && (this._verse.includes(T.verseRangeSeparator) || this._verse.includes(T.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Q.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = Q.bookIdToNumber(t);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(t) {
    const r = +t;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(t) {
    const { success: r, vNum: n } = T.tryGetVerseNum(t);
    this._verse = r ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = T.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > Q.lastBook)
      throw new Ve(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = t;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(t) {
    this.chapterNum = t;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(t) {
    this._verseNum = t;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var t;
    return (t = this.versification) == null ? void 0 : t.name;
  }
  set versificationStr(t) {
    this.versification = this.versification != null ? new oe(t) : void 0;
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
    return this.validateVerse(T.verseRangeSeparators, T.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return T.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return T.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(t) {
    if (t = t.replace(this.rtlMark, ""), t.includes("/")) {
      const i = t.split("/");
      if (t = i[0], i.length > 1)
        try {
          const a = +i[1].trim();
          this.versification = new oe(ee[a]);
        } catch {
          throw new Ve("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new Ve("Invalid reference : " + t);
    const n = r[1].split(":"), u = +n[0];
    if (n.length !== 2 || Q.bookIdToNumber(r[0]) === 0 || !Number.isInteger(u) || u < 0 || !T.isVerseParseable(n[1]))
      throw new Ve("Invalid reference : " + t);
    this.updateInternal(r[0], n[0], n[1]);
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
    return new T(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let t = this.verse;
    (t === "" || t === this.verseNum.toString()) && (t = void 0);
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
    return t || delete r.verse, r;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(t) {
    return t instanceof T ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, r = T.verseRangeSeparators, n = T.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const u = [], i = Dr(this._verse, n);
    for (const a of i.map((o) => Dr(o, r))) {
      const o = this.clone();
      o.verse = a[0];
      const s = o.verseNum;
      if (u.push(o), a.length > 1) {
        const c = this.clone();
        if (c.verse = a[1], !t)
          for (let f = s + 1; f < c.verseNum; f++) {
            const l = new T(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || u.push(l);
          }
        u.push(c);
      }
    }
    return u;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(t, r) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const u of this.allVerses(!0, t, r)) {
      const i = u.internalValid;
      if (i !== 0)
        return i;
      const a = u.BBBCCCVVV;
      if (n > a)
        return 3;
      if (n === a)
        return 4;
      n = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Q.lastBook ? 2 : (Q.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = T.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = Q.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
N(k, "defaultVersification", oe.English), N(k, "verseRangeSeparator", "-"), N(k, "verseSequenceIndicator", ","), N(k, "verseRangeSeparators", [k.verseRangeSeparator]), N(k, "verseSequenceIndicators", [k.verseSequenceIndicator]), N(k, "chapterDigitShifter", 1e3), N(k, "bookDigitShifter", k.chapterDigitShifter * k.chapterDigitShifter), N(k, "bcvMaxValue", k.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
N(k, "ValidStatusType", ln);
let Wt = k;
class Ve extends Error {
}
var vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, B = {};
function xu(e, t, r) {
  if (r === void 0 && (r = Array.prototype), e && typeof r.find == "function")
    return r.find.call(e, t);
  for (var n = 0; n < e.length; n++)
    if (ve(e, n)) {
      var u = e[n];
      if (t.call(void 0, u, n, e))
        return u;
    }
}
function Le(e, t) {
  return t === void 0 && (t = Object), t && typeof t.getOwnPropertyDescriptors == "function" && (e = t.create(null, t.getOwnPropertyDescriptors(e))), t && typeof t.freeze == "function" ? t.freeze(e) : e;
}
function ve(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Mu(e, t) {
  if (e === null || typeof e != "object")
    throw new TypeError("target is not an object");
  for (var r in t)
    ve(t, r) && (e[r] = t[r]);
  return e;
}
var fn = Le({
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
function _u(e) {
  return ve(fn, e.toLowerCase());
}
var pn = Le({
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
function Pu(e) {
  return ve(pn, e.toLowerCase());
}
var We = Le({
  script: !1,
  style: !1,
  textarea: !0,
  title: !0
});
function Lu(e) {
  var t = e.toLowerCase();
  return ve(We, t) && !We[t];
}
function Fu(e) {
  var t = e.toLowerCase();
  return ve(We, t) && We[t];
}
function hn(e) {
  return e === Qe.HTML;
}
function ku(e) {
  return hn(e) || e === Qe.XML_XHTML_APPLICATION;
}
var Qe = Le({
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
}), qu = Object.keys(Qe).map(function(e) {
  return Qe[e];
});
function $u(e) {
  return qu.indexOf(e) > -1;
}
var ju = Le({
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
B.assign = Mu;
B.find = xu;
B.freeze = Le;
B.HTML_BOOLEAN_ATTRIBUTES = fn;
B.HTML_RAW_TEXT_ELEMENTS = We;
B.HTML_VOID_ELEMENTS = pn;
B.hasDefaultHTMLNamespace = ku;
B.hasOwn = ve;
B.isHTMLBooleanAttribute = _u;
B.isHTMLRawTextElement = Lu;
B.isHTMLEscapableRawTextElement = Fu;
B.isHTMLMimeType = hn;
B.isHTMLVoidElement = Pu;
B.isValidMimeType = $u;
B.MIME_TYPE = Qe;
B.NAMESPACE = ju;
var Ae = {}, Uu = B;
function dn(e, t) {
  e.prototype = Object.create(Error.prototype, {
    constructor: { value: e },
    name: { value: e.name, enumerable: !0, writable: t }
  });
}
var Ze = Uu.freeze({
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
}), mn = Object.keys(Ze);
function En(e) {
  return typeof e == "number" && e >= 1 && e <= 25;
}
function Vu(e) {
  return typeof e == "string" && e.substring(e.length - Ze.Error.length) === Ze.Error;
}
function at(e, t) {
  En(e) ? (this.name = mn[e], this.message = t || "") : (this.message = e, this.name = Vu(t) ? t : Ze.Error), Error.captureStackTrace && Error.captureStackTrace(this, at);
}
dn(at, !0);
Object.defineProperties(at.prototype, {
  code: {
    enumerable: !0,
    get: function() {
      var e = mn.indexOf(this.name);
      return En(e) ? e : 0;
    }
  }
});
var gn = {
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
}, $t = Object.entries(gn);
for (var dt = 0; dt < $t.length; dt++) {
  var Hu = $t[dt][0];
  at[Hu] = $t[dt][1];
}
function Qt(e, t) {
  this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, Qt);
}
dn(Qt);
Ae.DOMException = at;
Ae.DOMExceptionName = Ze;
Ae.ExceptionCode = gn;
Ae.ParseError = Qt;
var x = {}, v = {};
function Dn(e) {
  try {
    typeof e != "function" && (e = RegExp);
    var t = new e("𝌆", "u").exec("𝌆");
    return !!t && t[0].length === 2;
  } catch {
  }
  return !1;
}
var st = Dn();
function Ee(e) {
  if (e.source[0] !== "[")
    throw new Error(e + " can not be used with chars");
  return e.source.slice(1, e.source.lastIndexOf("]"));
}
function Be(e, t) {
  if (e.source[0] !== "[")
    throw new Error("/" + e.source + "/ can not be used with chars_without");
  if (!t || typeof t != "string")
    throw new Error(JSON.stringify(t) + " is not a valid search");
  if (e.source.indexOf(t) === -1)
    throw new Error('"' + t + '" is not is /' + e.source + "/");
  if (t === "-" && e.source.indexOf(t) !== 1)
    throw new Error('"' + t + '" is not at the first postion of /' + e.source + "/");
  return new RegExp(e.source.replace(t, ""), st ? "u" : "");
}
function A(e) {
  var t = this;
  return new RegExp(
    Array.prototype.slice.call(arguments).map(function(r) {
      var n = typeof r == "string";
      if (n && t === void 0 && r === "|")
        throw new Error("use regg instead of reg to wrap expressions with `|`!");
      return n ? r : r.source;
    }).join(""),
    st ? "mu" : "m"
  );
}
function E(e) {
  if (arguments.length === 0)
    throw new Error("no parameters provided");
  return A.apply(E, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
}
var Gu = "�", ge = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
st && (ge = A("[", Ee(ge), "\\u{10000}-\\u{10FFFF}", "]"));
var Zt = /[\x20\x09\x0D\x0A]/, zu = Ee(Zt), S = A(Zt, "+"), R = A(Zt, "*"), et = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
st && (et = A("[", Ee(et), "\\u{10000}-\\u{10FFFF}", "]"));
var Ju = Ee(et), er = A("[", Ju, Ee(/[-.0-9\xB7]/), Ee(/[\u0300-\u036F\u203F-\u2040]/), "]"), Y = A(et, er, "*"), Ar = A(er, "+"), Xu = A("&", Y, ";"), Yu = E(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), tt = E(Xu, "|", Yu), rt = A("%", Y, ";"), tr = E(
  A('"', E(/[^%&"]/, "|", rt, "|", tt), "*", '"'),
  "|",
  A("'", E(/[^%&']/, "|", rt, "|", tt), "*", "'")
), Ku = E('"', E(/[^<&"]/, "|", tt), "*", '"', "|", "'", E(/[^<&']/, "|", tt), "*", "'"), Wu = Be(et, ":"), Qu = Be(er, ":"), Nr = A(Wu, Qu, "*"), ct = A(Nr, E(":", Nr), "?"), Zu = A("^", ct, "$"), ei = A("(", ct, ")"), nt = E(/"[^"]*"|'[^']*'/), ti = A(/^<\?/, "(", Y, ")", E(S, "(", ge, "*?)"), "?", /\?>/), br = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, yt = E('"', br, '*"', "|", "'", Be(br, "'"), "*'"), vn = "<!--", An = "-->", ri = A(vn, E(Be(ge, "-"), "|", A("-", Be(ge, "-"))), "*", An), yr = "#PCDATA", ni = E(
  A(/\(/, R, yr, E(R, /\|/, R, ct), "*", R, /\)\*/),
  "|",
  A(/\(/, R, yr, R, /\)/)
), ui = /[?*+]?/, ii = A(
  /\([^>]+\)/,
  ui
  /*regg(choice, '|', seq), _children_quantity*/
), oi = E("EMPTY", "|", "ANY", "|", ni, "|", ii), ai = "<!ELEMENT", si = A(ai, S, E(ct, "|", rt), S, E(oi, "|", rt), R, ">"), ci = A("NOTATION", S, /\(/, R, Y, E(R, /\|/, R, Y), "*", R, /\)/), li = A(/\(/, R, Ar, E(R, /\|/, R, Ar), "*", R, /\)/), fi = E(ci, "|", li), pi = E(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", fi), hi = E(/#REQUIRED|#IMPLIED/, "|", E(E("#FIXED", S), "?", Ku)), di = E(S, Y, S, pi, S, hi), mi = "<!ATTLIST", Ei = A(mi, S, Y, di, "*", R, ">"), rr = "SYSTEM", Ct = "PUBLIC", Tt = E(E(rr, S, nt), "|", E(Ct, S, yt, S, nt)), gi = A(
  "^",
  E(
    E(rr, S, "(?<SystemLiteralOnly>", nt, ")"),
    "|",
    E(Ct, S, "(?<PubidLiteral>", yt, ")", S, "(?<SystemLiteral>", nt, ")")
  )
), Di = E(S, "NDATA", S, Y), vi = E(tr, "|", E(Tt, Di, "?")), Nn = "<!ENTITY", Ai = A(Nn, S, Y, S, vi, R, ">"), Ni = E(tr, "|", Tt), bi = A(Nn, S, "%", S, Y, S, Ni, R, ">"), yi = E(Ai, "|", bi), Ci = A(Ct, S, yt), Ti = A("<!NOTATION", S, Y, S, E(Tt, "|", Ci), R, ">"), nr = A(R, "=", R), Cr = /1[.]\d+/, wi = A(S, "version", nr, E("'", Cr, "'", "|", '"', Cr, '"')), Tr = /[A-Za-z][-A-Za-z0-9._]*/, Si = E(S, "encoding", nr, E('"', Tr, '"', "|", "'", Tr, "'")), Oi = E(S, "standalone", nr, E("'", E("yes", "|", "no"), "'", "|", '"', E("yes", "|", "no"), '"')), Ii = A(/^<\?xml/, wi, Si, "?", Oi, "?", R, /\?>/), Ri = "<!DOCTYPE", Bi = "<![CDATA[", xi = "]]>", Mi = /<!\[CDATA\[/, _i = /\]\]>/, Pi = A(ge, "*?", _i), Li = A(Mi, Pi);
v.chars = Ee;
v.chars_without = Be;
v.detectUnicodeSupport = Dn;
v.reg = A;
v.regg = E;
v.AttlistDecl = Ei;
v.CDATA_START = Bi;
v.CDATA_END = xi;
v.CDSect = Li;
v.Char = ge;
v.Comment = ri;
v.COMMENT_START = vn;
v.COMMENT_END = An;
v.DOCTYPE_DECL_START = Ri;
v.elementdecl = si;
v.EntityDecl = yi;
v.EntityValue = tr;
v.ExternalID = Tt;
v.ExternalID_match = gi;
v.Name = Y;
v.NotationDecl = Ti;
v.Reference = tt;
v.PEReference = rt;
v.PI = ti;
v.PUBLIC = Ct;
v.PubidLiteral = yt;
v.QName = ct;
v.QName_exact = Zu;
v.QName_group = ei;
v.S = S;
v.SChar_s = zu;
v.S_OPT = R;
v.SYSTEM = rr;
v.SystemLiteral = nt;
v.UNICODE_REPLACEMENT_CHARACTER = Gu;
v.UNICODE_SUPPORT = st;
v.XMLDecl = Ii;
var X = B, te = X.find, Fi = X.hasDefaultHTMLNamespace, xe = X.hasOwn, ki = X.isHTMLMimeType, qi = X.isHTMLRawTextElement, $i = X.isHTMLVoidElement, Xe = X.MIME_TYPE, re = X.NAMESPACE, q = Symbol(), bn = Ae, d = bn.DOMException, ji = bn.DOMExceptionName, Z = v;
function $(e) {
  if (e !== q)
    throw new TypeError("Illegal constructor");
}
function Ui(e) {
  return e !== "";
}
function Vi(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(Ui) : [];
}
function Hi(e, t) {
  return xe(e, t) || (e[t] = !0), e;
}
function wr(e) {
  if (!e) return [];
  var t = Vi(e);
  return Object.keys(t.reduce(Hi, {}));
}
function Gi(e) {
  return function(t) {
    return e && e.indexOf(t) !== -1;
  };
}
function yn(e) {
  if (!Z.QName_exact.test(e))
    throw new d(d.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + e + '"');
}
function Vt(e, t) {
  yn(t), e = e || null;
  var r = null, n = t;
  if (t.indexOf(":") >= 0) {
    var u = t.split(":");
    r = u[0], n = u[1];
  }
  if (r !== null && e === null)
    throw new d(d.NAMESPACE_ERR, "prefix is non-null and namespace is null");
  if (r === "xml" && e !== X.NAMESPACE.XML)
    throw new d(d.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
  if ((r === "xmlns" || t === "xmlns") && e !== X.NAMESPACE.XMLNS)
    throw new d(
      d.NAMESPACE_ERR,
      'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
    );
  if (e === X.NAMESPACE.XMLNS && r !== "xmlns" && t !== "xmlns")
    throw new d(
      d.NAMESPACE_ERR,
      'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
    );
  return [e, r, n];
}
function Fe(e, t) {
  for (var r in e)
    xe(e, r) && (t[r] = e[r]);
}
function j(e, t) {
  var r = e.prototype;
  if (!(r instanceof t)) {
    let n = function() {
    };
    n.prototype = t.prototype, n = new n(), Fe(r, n), e.prototype = r = n;
  }
  r.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), r.constructor = e);
}
var U = {}, K = U.ELEMENT_NODE = 1, Me = U.ATTRIBUTE_NODE = 2, Nt = U.TEXT_NODE = 3, Cn = U.CDATA_SECTION_NODE = 4, Tn = U.ENTITY_REFERENCE_NODE = 5, zi = U.ENTITY_NODE = 6, wn = U.PROCESSING_INSTRUCTION_NODE = 7, Sn = U.COMMENT_NODE = 8, ut = U.DOCUMENT_NODE = 9, On = U.DOCUMENT_TYPE_NODE = 10, se = U.DOCUMENT_FRAGMENT_NODE = 11, Ji = U.NOTATION_NODE = 12, _ = X.freeze({
  DOCUMENT_POSITION_DISCONNECTED: 1,
  DOCUMENT_POSITION_PRECEDING: 2,
  DOCUMENT_POSITION_FOLLOWING: 4,
  DOCUMENT_POSITION_CONTAINS: 8,
  DOCUMENT_POSITION_CONTAINED_BY: 16,
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
});
function Sr(e) {
  for (var t = []; e.parentNode || e.ownerElement; )
    e = e.parentNode || e.ownerElement, t.unshift(e);
  return t;
}
function In(e, t) {
  if (t.length < e.length) return In(t, e);
  var r = null;
  for (var n in e) {
    if (e[n] !== t[n]) return r;
    r = e[n];
  }
  return r;
}
function Or(e) {
  return e.guid || (e.guid = Math.random()), e.guid;
}
function M() {
}
M.prototype = {
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
  item: function(e) {
    return e >= 0 && e < this.length ? this[e] : null;
  },
  /**
   * Returns a string representation of the NodeList.
   *
   * @param {unknown} nodeFilter
   * __A filter function? Not implemented according to the spec?__.
   * @returns {string}
   * A string representation of the NodeList.
   */
  toString: function(e) {
    for (var t = [], r = 0; r < this.length; r++)
      Ie(this[r], t, e);
    return t.join("");
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
  filter: function(e) {
    return Array.prototype.filter.call(this, e);
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
  indexOf: function(e) {
    return Array.prototype.indexOf.call(this, e);
  }
};
M.prototype[Symbol.iterator] = function() {
  var e = this, t = 0;
  return {
    next: function() {
      return t < e.length ? {
        value: e[t++],
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
function he(e, t) {
  this._node = e, this._refresh = t, wt(this);
}
function wt(e) {
  var t = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc !== t) {
    var r = e._refresh(e._node);
    if (jn(e, "length", r.length), !e.$$length || r.length < e.$$length)
      for (var n = r.length; n in e; n++)
        xe(e, n) && delete e[n];
    Fe(r, e), e._inc = t;
  }
}
he.prototype.item = function(e) {
  return wt(this), this[e] || null;
};
j(he, M);
function _e() {
}
function Rn(e, t) {
  for (var r = 0; r < e.length; ) {
    if (e[r] === t)
      return r;
    r++;
  }
}
function Xi(e, t, r, n) {
  if (n ? t[Rn(t, n)] = r : (t[t.length] = r, t.length++), e) {
    r.ownerElement = e;
    var u = e.ownerDocument;
    u && (n && Mn(u, e, n), Yi(u, e, r));
  }
}
function Ir(e, t, r) {
  var n = Rn(t, r);
  if (n >= 0) {
    for (var u = t.length - 1; n <= u; )
      t[n] = t[++n];
    if (t.length = u, e) {
      var i = e.ownerDocument;
      i && Mn(i, e, r), r.ownerElement = null;
    }
  }
}
_e.prototype = {
  length: 0,
  item: M.prototype.item,
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
  getNamedItem: function(e) {
    this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
    for (var t = 0; t < this.length; ) {
      var r = this[t];
      if (r.nodeName === e)
        return r;
      t++;
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
  setNamedItem: function(e) {
    var t = e.ownerElement;
    if (t && t !== this._ownerElement)
      throw new d(d.INUSE_ATTRIBUTE_ERR);
    var r = this.getNamedItemNS(e.namespaceURI, e.localName);
    return r === e ? e : (Xi(this._ownerElement, this, e, r), r);
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
  setNamedItemNS: function(e) {
    return this.setNamedItem(e);
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
  removeNamedItem: function(e) {
    var t = this.getNamedItem(e);
    if (!t)
      throw new d(d.NOT_FOUND_ERR, e);
    return Ir(this._ownerElement, this, t), t;
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
  removeNamedItemNS: function(e, t) {
    var r = this.getNamedItemNS(e, t);
    if (!r)
      throw new d(d.NOT_FOUND_ERR, e ? e + " : " + t : t);
    return Ir(this._ownerElement, this, r), r;
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
  getNamedItemNS: function(e, t) {
    e || (e = null);
    for (var r = 0; r < this.length; ) {
      var n = this[r];
      if (n.localName === t && n.namespaceURI === e)
        return n;
      r++;
    }
    return null;
  }
};
_e.prototype[Symbol.iterator] = function() {
  var e = this, t = 0;
  return {
    next: function() {
      return t < e.length ? {
        value: e[t++],
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
function Bn() {
}
Bn.prototype = {
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
  hasFeature: function(e, t) {
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
  createDocument: function(e, t, r) {
    var n = Xe.XML_APPLICATION;
    e === re.HTML ? n = Xe.XML_XHTML_APPLICATION : e === re.SVG && (n = Xe.XML_SVG_IMAGE);
    var u = new ce(q, { contentType: n });
    if (u.implementation = this, u.childNodes = new M(), u.doctype = r || null, r && u.appendChild(r), t) {
      var i = u.createElementNS(e, t);
      u.appendChild(i);
    }
    return u;
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
  createDocumentType: function(e, t, r, n) {
    yn(e);
    var u = new It(q);
    return u.name = e, u.nodeName = e, u.publicId = t || "", u.systemId = r || "", u.internalSubset = n || "", u.childNodes = new M(), u;
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
  createHTMLDocument: function(e) {
    var t = new ce(q, { contentType: Xe.HTML });
    if (t.implementation = this, t.childNodes = new M(), e !== !1) {
      t.doctype = this.createDocumentType("html"), t.doctype.ownerDocument = t, t.appendChild(t.doctype);
      var r = t.createElement("html");
      t.appendChild(r);
      var n = t.createElement("head");
      if (r.appendChild(n), typeof e == "string") {
        var u = t.createElement("title");
        u.appendChild(t.createTextNode(e)), n.appendChild(u);
      }
      r.appendChild(t.createElement("body"));
    }
    return t;
  }
};
function C(e) {
  $(e);
}
C.prototype = {
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
    var e = this.getRootNode();
    return e && e.nodeType === e.DOCUMENT_NODE;
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
  contains: function(e) {
    if (!e) return !1;
    var t = e;
    do {
      if (this === t) return !0;
      t = e.parentNode;
    } while (t);
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
  getRootNode: function(e) {
    var t = this;
    do {
      if (!t.parentNode)
        return t;
      t = t.parentNode;
    } while (t);
  },
  /**
   * Checks whether the given node is equal to this node.
   *
   * @param {Node} [otherNode]
   * @see https://dom.spec.whatwg.org/#concept-node-equals
   */
  isEqualNode: function(e) {
    if (!e || this.nodeType !== e.nodeType) return !1;
    switch (this.nodeType) {
      case this.DOCUMENT_TYPE_NODE:
        if (this.name !== e.name || this.publicId !== e.publicId || this.systemId !== e.systemId) return !1;
        break;
      case this.ELEMENT_NODE:
        if (this.namespaceURI !== e.namespaceURI || this.prefix !== e.prefix || this.localName !== e.localName || this.attributes.length !== e.attributes.length) return !1;
        for (var t = 0; t < this.attributes.length; t++) {
          var r = this.attributes.item(t);
          if (!r.isEqualNode(e.getAttributeNodeNS(r.namespaceURI, r.localName)))
            return !1;
        }
        break;
      case this.ATTRIBUTE_NODE:
        if (this.namespaceURI !== e.namespaceURI || this.localName !== e.localName || this.value !== e.value) return !1;
        break;
      case this.PROCESSING_INSTRUCTION_NODE:
        if (this.target !== e.target || this.data !== e.data)
          return !1;
        break;
      case this.TEXT_NODE:
      case this.COMMENT_NODE:
        if (this.data !== e.data) return !1;
        break;
    }
    if (this.childNodes.length !== e.childNodes.length)
      return !1;
    for (var t = 0; t < this.childNodes.length; t++)
      if (!this.childNodes[t].isEqualNode(e.childNodes[t]))
        return !1;
    return !0;
  },
  /**
   * Checks whether or not the given node is this node.
   *
   * @param {Node} [otherNode]
   */
  isSameNode: function(e) {
    return this === e;
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
  insertBefore: function(e, t) {
    return bt(this, e, t);
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
  replaceChild: function(e, t) {
    bt(this, e, t, Fn), t && this.removeChild(t);
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
  removeChild: function(e) {
    return Pn(this, e);
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
  appendChild: function(e) {
    return this.insertBefore(e, null);
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
  cloneNode: function(e) {
    return Ht(this.ownerDocument || this, this, e);
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
    for (var e = this.firstChild; e; ) {
      var t = e.nextSibling;
      t && t.nodeType == Nt && e.nodeType == Nt ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
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
  isSupported: function(e, t) {
    return this.ownerDocument.implementation.hasFeature(e, t);
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
  lookupPrefix: function(e) {
    for (var t = this; t; ) {
      var r = t._nsMap;
      if (r) {
        for (var n in r)
          if (xe(r, n) && r[n] === e)
            return n;
      }
      t = t.nodeType == Me ? t.ownerDocument : t.parentNode;
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
  lookupNamespaceURI: function(e) {
    for (var t = this; t; ) {
      var r = t._nsMap;
      if (r && xe(r, e))
        return r[e];
      t = t.nodeType == Me ? t.ownerDocument : t.parentNode;
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
  isDefaultNamespace: function(e) {
    var t = this.lookupPrefix(e);
    return t == null;
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
  compareDocumentPosition: function(e) {
    if (this === e) return 0;
    var t = e, r = this, n = null, u = null;
    if (t instanceof De && (n = t, t = n.ownerElement), r instanceof De && (u = r, r = u.ownerElement, n && t && r === t))
      for (var i = 0, a; a = r.attributes[i]; i++) {
        if (a === n)
          return _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + _.DOCUMENT_POSITION_PRECEDING;
        if (a === u)
          return _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + _.DOCUMENT_POSITION_FOLLOWING;
      }
    if (!t || !r || r.ownerDocument !== t.ownerDocument)
      return _.DOCUMENT_POSITION_DISCONNECTED + _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (Or(r.ownerDocument) > Or(t.ownerDocument) ? _.DOCUMENT_POSITION_FOLLOWING : _.DOCUMENT_POSITION_PRECEDING);
    var o = Sr(t), s = Sr(r);
    if (!n && s.indexOf(t) >= 0 || u && t === r)
      return _.DOCUMENT_POSITION_CONTAINS + _.DOCUMENT_POSITION_PRECEDING;
    if (!u && o.indexOf(r) >= 0 || n && t === r)
      return _.DOCUMENT_POSITION_CONTAINED_BY + _.DOCUMENT_POSITION_FOLLOWING;
    var c = In(s, o);
    for (var f in c.childNodes) {
      var l = c.childNodes[f];
      if (l === r) return _.DOCUMENT_POSITION_FOLLOWING;
      if (l === t) return _.DOCUMENT_POSITION_PRECEDING;
      if (s.indexOf(l) >= 0) return _.DOCUMENT_POSITION_FOLLOWING;
      if (o.indexOf(l) >= 0) return _.DOCUMENT_POSITION_PRECEDING;
    }
    return 0;
  }
};
function xn(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
Fe(U, C);
Fe(U, C.prototype);
Fe(_, C);
Fe(_, C.prototype);
function Ke(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (Ke(e, t))
        return !0;
    while (e = e.nextSibling);
}
function ce(e, t) {
  $(e);
  var r = t || {};
  this.ownerDocument = this, this.contentType = r.contentType || Xe.XML_APPLICATION, this.type = ki(this.contentType) ? "html" : "xml";
}
function Yi(e, t, r) {
  e && e._inc++;
  var n = r.namespaceURI;
  n === re.XMLNS && (t._nsMap[r.prefix ? r.localName : ""] = r.value);
}
function Mn(e, t, r, n) {
  e && e._inc++;
  var u = r.namespaceURI;
  u === re.XMLNS && delete t._nsMap[r.prefix ? r.localName : ""];
}
function _n(e, t, r) {
  if (e && e._inc) {
    e._inc++;
    var n = t.childNodes;
    if (r && !r.nextSibling)
      n[n.length++] = r;
    else {
      for (var u = t.firstChild, i = 0; u; )
        n[i++] = u, u = u.nextSibling;
      n.length = i, delete n[n.length];
    }
  }
}
function Pn(e, t) {
  if (e !== t.parentNode)
    throw new d(d.NOT_FOUND_ERR, "child's parent is not parent");
  var r = t.previousSibling, n = t.nextSibling;
  return r ? r.nextSibling = n : e.firstChild = n, n ? n.previousSibling = r : e.lastChild = r, _n(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
}
function Ki(e) {
  return e && (e.nodeType === C.DOCUMENT_NODE || e.nodeType === C.DOCUMENT_FRAGMENT_NODE || e.nodeType === C.ELEMENT_NODE);
}
function Wi(e) {
  return e && (e.nodeType === C.CDATA_SECTION_NODE || e.nodeType === C.COMMENT_NODE || e.nodeType === C.DOCUMENT_FRAGMENT_NODE || e.nodeType === C.DOCUMENT_TYPE_NODE || e.nodeType === C.ELEMENT_NODE || e.nodeType === C.PROCESSING_INSTRUCTION_NODE || e.nodeType === C.TEXT_NODE);
}
function le(e) {
  return e && e.nodeType === C.DOCUMENT_TYPE_NODE;
}
function ue(e) {
  return e && e.nodeType === C.ELEMENT_NODE;
}
function Ln(e) {
  return e && e.nodeType === C.TEXT_NODE;
}
function Rr(e, t) {
  var r = e.childNodes || [];
  if (te(r, ue) || le(t))
    return !1;
  var n = te(r, le);
  return !(t && n && r.indexOf(n) > r.indexOf(t));
}
function Br(e, t) {
  var r = e.childNodes || [];
  function n(i) {
    return ue(i) && i !== t;
  }
  if (te(r, n))
    return !1;
  var u = te(r, le);
  return !(t && u && r.indexOf(u) > r.indexOf(t));
}
function Qi(e, t, r) {
  if (!Ki(e))
    throw new d(d.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
  if (r && r.parentNode !== e)
    throw new d(d.NOT_FOUND_ERR, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !Wi(t) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    le(t) && e.nodeType !== C.DOCUMENT_NODE
  )
    throw new d(
      d.HIERARCHY_REQUEST_ERR,
      "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
    );
}
function Zi(e, t, r) {
  var n = e.childNodes || [], u = t.childNodes || [];
  if (t.nodeType === C.DOCUMENT_FRAGMENT_NODE) {
    var i = u.filter(ue);
    if (i.length > 1 || te(u, Ln))
      throw new d(d.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (i.length === 1 && !Rr(e, r))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (ue(t) && !Rr(e, r))
    throw new d(d.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (le(t)) {
    if (te(n, le))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var a = te(n, ue);
    if (r && n.indexOf(a) < n.indexOf(r))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    if (!r && a)
      throw new d(d.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
  }
}
function Fn(e, t, r) {
  var n = e.childNodes || [], u = t.childNodes || [];
  if (t.nodeType === C.DOCUMENT_FRAGMENT_NODE) {
    var i = u.filter(ue);
    if (i.length > 1 || te(u, Ln))
      throw new d(d.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (i.length === 1 && !Br(e, r))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (ue(t) && !Br(e, r))
    throw new d(d.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (le(t)) {
    if (te(n, function(s) {
      return le(s) && s !== r;
    }))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var a = te(n, ue);
    if (r && n.indexOf(a) < n.indexOf(r))
      throw new d(d.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
  }
}
function bt(e, t, r, n) {
  Qi(e, t, r), e.nodeType === C.DOCUMENT_NODE && (n || Zi)(e, t, r);
  var u = t.parentNode;
  if (u && u.removeChild(t), t.nodeType === se) {
    var i = t.firstChild;
    if (i == null)
      return t;
    var a = t.lastChild;
  } else
    i = a = t;
  var o = r ? r.previousSibling : e.lastChild;
  i.previousSibling = o, a.nextSibling = r, o ? o.nextSibling = i : e.firstChild = i, r == null ? e.lastChild = a : r.previousSibling = a;
  do
    i.parentNode = e;
  while (i !== a && (i = i.nextSibling));
  return _n(e.ownerDocument || e, e, t), t.nodeType == se && (t.firstChild = t.lastChild = null), t;
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
  nodeType: ut,
  /**
   * The DocumentType node of the document.
   *
   * @type DocumentType
   * @readonly
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(e, t) {
    if (e.nodeType === se) {
      for (var r = e.firstChild; r; ) {
        var n = r.nextSibling;
        this.insertBefore(r, t), r = n;
      }
      return e;
    }
    return bt(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === K && (this.documentElement = e), e;
  },
  removeChild: function(e) {
    var t = Pn(this, e);
    return t === this.documentElement && (this.documentElement = null), t;
  },
  replaceChild: function(e, t) {
    bt(this, e, t, Fn), e.ownerDocument = this, t && this.removeChild(t), ue(e) && (this.documentElement = e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return $n(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return Ke(this.documentElement, function(r) {
      if (r.nodeType == K && r.getAttribute("id") == e)
        return t = r, !0;
    }), t;
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
  createElement: function(e) {
    var t = new fe(q);
    t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), Fi(this.contentType) && (t.namespaceURI = re.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new M();
    var r = t.attributes = new _e();
    return r._ownerElement = t, t;
  },
  /**
   * @returns {DocumentFragment}
   */
  createDocumentFragment: function() {
    var e = new ft(q);
    return e.ownerDocument = this, e.childNodes = new M(), e;
  },
  /**
   * @param {string} data
   * @returns {Text}
   */
  createTextNode: function(e) {
    var t = new lt(q);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} data
   * @returns {Comment}
   */
  createComment: function(e) {
    var t = new St(q);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} data
   * @returns {CDATASection}
   */
  createCDATASection: function(e) {
    var t = new Ot(q);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} target
   * @param {string} data
   * @returns {ProcessingInstruction}
   */
  createProcessingInstruction: function(e, t) {
    var r = new Bt(q);
    return r.ownerDocument = this, r.childNodes = new M(), r.nodeName = r.target = e, r.nodeValue = r.data = t, r;
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
  createAttribute: function(e) {
    if (!Z.QName_exact.test(e))
      throw new d(d.INVALID_CHARACTER_ERR, 'invalid character in name "' + e + '"');
    return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
  },
  _createAttribute: function(e) {
    var t = new De(q);
    return t.ownerDocument = this, t.childNodes = new M(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
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
  createEntityReference: function(e) {
    if (!Z.Name.test(e))
      throw new d(d.INVALID_CHARACTER_ERR, 'not a valid xml name "' + e + '"');
    if (this.type === "html")
      throw new d("document is an html document", ji.NotSupportedError);
    var t = new Rt(q);
    return t.ownerDocument = this, t.childNodes = new M(), t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Element}
   */
  createElementNS: function(e, t) {
    var r = Vt(e, t), n = new fe(q), u = n.attributes = new _e();
    return n.childNodes = new M(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], u._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Attr}
   */
  createAttributeNS: function(e, t) {
    var r = Vt(e, t), n = new De(q);
    return n.ownerDocument = this, n.childNodes = new M(), n.nodeName = t, n.name = t, n.specified = !0, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], n;
  }
};
j(ce, C);
function fe(e) {
  $(e), this._nsMap = /* @__PURE__ */ Object.create(null);
}
fe.prototype = {
  nodeType: K,
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
    return this.ownerDocument.type === "html" && this.namespaceURI === re.HTML;
  },
  hasAttribute: function(e) {
    return !!this.getAttributeNode(e);
  },
  /**
   * Returns element’s first attribute whose qualified name is `name`, and `null`
   * if there is no such attribute.
   *
   * @param {string} name
   * @returns {string | null}
   */
  getAttribute: function(e) {
    var t = this.getAttributeNode(e);
    return t ? t.value : null;
  },
  getAttributeNode: function(e) {
    return this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase()), this.attributes.getNamedItem(e);
  },
  /**
   * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
   *
   * @param {string} name
   * @param {string} value
   */
  setAttribute: function(e, t) {
    this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
    var r = this.getAttributeNode(e);
    r ? r.value = r.nodeValue = "" + t : (r = this.ownerDocument._createAttribute(e), r.value = r.nodeValue = "" + t, this.setAttributeNode(r));
  },
  removeAttribute: function(e) {
    var t = this.getAttributeNode(e);
    t && this.removeAttributeNode(t);
  },
  setAttributeNode: function(e) {
    return this.attributes.setNamedItem(e);
  },
  setAttributeNodeNS: function(e) {
    return this.attributes.setNamedItemNS(e);
  },
  removeAttributeNode: function(e) {
    return this.attributes.removeNamedItem(e.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(e, t) {
    var r = this.getAttributeNodeNS(e, t);
    r && this.removeAttributeNode(r);
  },
  hasAttributeNS: function(e, t) {
    return this.getAttributeNodeNS(e, t) != null;
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
  getAttributeNS: function(e, t) {
    var r = this.getAttributeNodeNS(e, t);
    return r ? r.value : null;
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
  setAttributeNS: function(e, t, r) {
    var n = Vt(e, t), u = n[2], i = this.getAttributeNodeNS(e, u);
    i ? i.value = i.nodeValue = "" + r : (i = this.ownerDocument.createAttributeNS(e, t), i.value = i.nodeValue = "" + r, this.setAttributeNode(i));
  },
  getAttributeNodeNS: function(e, t) {
    return this.attributes.getNamedItemNS(e, t);
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
  getElementsByClassName: function(e) {
    var t = wr(e);
    return new he(this, function(r) {
      var n = [];
      return t.length > 0 && Ke(r, function(u) {
        if (u !== r && u.nodeType === K) {
          var i = u.getAttribute("class");
          if (i) {
            var a = e === i;
            if (!a) {
              var o = wr(i);
              a = t.every(Gi(o));
            }
            a && n.push(u);
          }
        }
      }), n;
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
  getElementsByTagName: function(e) {
    var t = (this.nodeType === ut ? this : this.ownerDocument).type === "html", r = e.toLowerCase();
    return new he(this, function(n) {
      var u = [];
      return Ke(n, function(i) {
        if (!(i === n || i.nodeType !== K))
          if (e === "*")
            u.push(i);
          else {
            var a = i.getQualifiedName(), o = t && i.namespaceURI === re.HTML ? r : e;
            a === o && u.push(i);
          }
      }), u;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new he(this, function(r) {
      var n = [];
      return Ke(r, function(u) {
        u !== r && u.nodeType === K && (e === "*" || u.namespaceURI === e) && (t === "*" || u.localName == t) && n.push(u);
      }), n;
    });
  }
};
ce.prototype.getElementsByClassName = fe.prototype.getElementsByClassName;
ce.prototype.getElementsByTagName = fe.prototype.getElementsByTagName;
ce.prototype.getElementsByTagNameNS = fe.prototype.getElementsByTagNameNS;
j(fe, C);
function De(e) {
  $(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
}
De.prototype.nodeType = Me;
j(De, C);
function ke(e) {
  $(e);
}
ke.prototype = {
  data: "",
  substringData: function(e, t) {
    return this.data.substring(e, e + t);
  },
  appendData: function(e) {
    e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
  },
  insertData: function(e, t) {
    this.replaceData(e, 0, t);
  },
  deleteData: function(e, t) {
    this.replaceData(e, t, "");
  },
  replaceData: function(e, t, r) {
    var n = this.data.substring(0, e), u = this.data.substring(e + t);
    r = n + r + u, this.nodeValue = this.data = r, this.length = r.length;
  }
};
j(ke, C);
function lt(e) {
  $(e);
}
lt.prototype = {
  nodeName: "#text",
  nodeType: Nt,
  splitText: function(e) {
    var t = this.data, r = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var n = this.ownerDocument.createTextNode(r);
    return this.parentNode && this.parentNode.insertBefore(n, this.nextSibling), n;
  }
};
j(lt, ke);
function St(e) {
  $(e);
}
St.prototype = {
  nodeName: "#comment",
  nodeType: Sn
};
j(St, ke);
function Ot(e) {
  $(e);
}
Ot.prototype = {
  nodeName: "#cdata-section",
  nodeType: Cn
};
j(Ot, lt);
function It(e) {
  $(e);
}
It.prototype.nodeType = On;
j(It, C);
function ur(e) {
  $(e);
}
ur.prototype.nodeType = Ji;
j(ur, C);
function ir(e) {
  $(e);
}
ir.prototype.nodeType = zi;
j(ir, C);
function Rt(e) {
  $(e);
}
Rt.prototype.nodeType = Tn;
j(Rt, C);
function ft(e) {
  $(e);
}
ft.prototype.nodeName = "#document-fragment";
ft.prototype.nodeType = se;
j(ft, C);
function Bt(e) {
  $(e);
}
Bt.prototype.nodeType = wn;
j(Bt, ke);
function kn() {
}
kn.prototype.serializeToString = function(e, t) {
  return qn.call(e, t);
};
C.prototype.toString = qn;
function qn(e) {
  var t = [], r = this.nodeType === ut && this.documentElement || this, n = r.prefix, u = r.namespaceURI;
  if (u && n == null) {
    var n = r.lookupPrefix(u);
    if (n == null)
      var i = [
        { namespace: u, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return Ie(this, t, e, i), t.join("");
}
function xr(e, t, r) {
  var n = e.prefix || "", u = e.namespaceURI;
  if (!u || n === "xml" && u === re.XML || u === re.XMLNS)
    return !1;
  for (var i = r.length; i--; ) {
    var a = r[i];
    if (a.prefix === n)
      return a.namespace !== u;
  }
  return !0;
}
function jt(e, t, r) {
  e.push(" ", t, '="', r.replace(/[<>&"\t\n\r]/g, xn), '"');
}
function Ie(e, t, r, n) {
  n || (n = []);
  var u = e.nodeType === ut ? e : e.ownerDocument, i = u.type === "html";
  if (r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case K:
      var a = e.attributes, o = a.length, b = e.firstChild, s = e.tagName, c = s;
      if (!i && !e.prefix && e.namespaceURI) {
        for (var f, l = 0; l < a.length; l++)
          if (a.item(l).name === "xmlns") {
            f = a.item(l).value;
            break;
          }
        if (!f)
          for (var p = n.length - 1; p >= 0; p--) {
            var g = n[p];
            if (g.prefix === "" && g.namespace === e.namespaceURI) {
              f = g.namespace;
              break;
            }
          }
        if (f !== e.namespaceURI)
          for (var p = n.length - 1; p >= 0; p--) {
            var g = n[p];
            if (g.namespace === e.namespaceURI) {
              g.prefix && (c = g.prefix + ":" + s);
              break;
            }
          }
      }
      t.push("<", c);
      for (var m = 0; m < o; m++) {
        var h = a.item(m);
        h.prefix == "xmlns" ? n.push({
          prefix: h.localName,
          namespace: h.value
        }) : h.nodeName == "xmlns" && n.push({ prefix: "", namespace: h.value });
      }
      for (var m = 0; m < o; m++) {
        var h = a.item(m);
        if (xr(h, i, n)) {
          var D = h.prefix || "", O = h.namespaceURI;
          jt(t, D ? "xmlns:" + D : "xmlns", O), n.push({ prefix: D, namespace: O });
        }
        Ie(h, t, r, n);
      }
      if (s === c && xr(e, i, n)) {
        var D = e.prefix || "", O = e.namespaceURI;
        jt(t, D ? "xmlns:" + D : "xmlns", O), n.push({ prefix: D, namespace: O });
      }
      var L = !b;
      if (L && (i || e.namespaceURI === re.HTML) && (L = $i(s)), L)
        t.push("/>");
      else {
        if (t.push(">"), i && qi(s))
          for (; b; )
            b.data ? t.push(b.data) : Ie(b, t, r, n.slice()), b = b.nextSibling;
        else
          for (; b; )
            Ie(b, t, r, n.slice()), b = b.nextSibling;
        t.push("</", c, ">");
      }
      return;
    case ut:
    case se:
      for (var b = e.firstChild; b; )
        Ie(b, t, r, n.slice()), b = b.nextSibling;
      return;
    case Me:
      return jt(t, e.name, e.value);
    case Nt:
      return t.push(e.data.replace(/[<&>]/g, xn));
    case Cn:
      return t.push(Z.CDATA_START, e.data, Z.CDATA_END);
    case Sn:
      return t.push(Z.COMMENT_START, e.data, Z.COMMENT_END);
    case On:
      var W = e.publicId, V = e.systemId;
      t.push(Z.DOCTYPE_DECL_START, " ", e.name), W ? (t.push(" ", Z.PUBLIC, " ", W), V && V !== "." && t.push(" ", V)) : V && V !== "." && t.push(" ", Z.SYSTEM, " ", V), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">");
      return;
    case wn:
      return t.push("<?", e.target, " ", e.data, "?>");
    case Tn:
      return t.push("&", e.nodeName, ";");
    default:
      t.push("??", e.nodeName);
  }
}
function $n(e, t, r) {
  var n;
  switch (t.nodeType) {
    case K:
      n = t.cloneNode(!1), n.ownerDocument = e;
    case se:
      break;
    case Me:
      r = !0;
      break;
  }
  if (n || (n = t.cloneNode(!1)), n.ownerDocument = e, n.parentNode = null, r)
    for (var u = t.firstChild; u; )
      n.appendChild($n(e, u, r)), u = u.nextSibling;
  return n;
}
function Ht(e, t, r) {
  var n = new t.constructor(q);
  for (var u in t)
    if (xe(t, u)) {
      var i = t[u];
      typeof i != "object" && i != n[u] && (n[u] = i);
    }
  switch (t.childNodes && (n.childNodes = new M()), n.ownerDocument = e, n.nodeType) {
    case K:
      var a = t.attributes, o = n.attributes = new _e(), s = a.length;
      o._ownerElement = n;
      for (var c = 0; c < s; c++)
        n.setAttributeNode(Ht(e, a.item(c), !0));
      break;
    case Me:
      r = !0;
  }
  if (r)
    for (var f = t.firstChild; f; )
      n.appendChild(Ht(e, f, r)), f = f.nextSibling;
  return n;
}
function jn(e, t, r) {
  e[t] = r;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case K:
        case se:
          var r = [];
          for (t = t.firstChild; t; )
            t.nodeType !== 7 && t.nodeType !== 8 && r.push(e(t)), t = t.nextSibling;
          return r.join("");
        default:
          return t.nodeValue;
      }
    };
    Object.defineProperty(he.prototype, "length", {
      get: function() {
        return wt(this), this.$$length;
      }
    }), Object.defineProperty(C.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case K:
          case se:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (t || String(t)) && this.appendChild(this.ownerDocument.createTextNode(t));
            break;
          default:
            this.data = t, this.value = t, this.nodeValue = t;
        }
      }
    }), jn = function(t, r, n) {
      t["$$" + r] = n;
    };
  }
} catch {
}
x._updateLiveList = wt;
x.Attr = De;
x.CDATASection = Ot;
x.CharacterData = ke;
x.Comment = St;
x.Document = ce;
x.DocumentFragment = ft;
x.DocumentType = It;
x.DOMImplementation = Bn;
x.Element = fe;
x.Entity = ir;
x.EntityReference = Rt;
x.LiveNodeList = he;
x.NamedNodeMap = _e;
x.Node = C;
x.NodeList = M;
x.Notation = ur;
x.Text = lt;
x.ProcessingInstruction = Bt;
x.XMLSerializer = kn;
var Un = {};
(function(e) {
  var t = B.freeze;
  e.XML_ENTITIES = t({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  }), e.HTML_ENTITIES = t({
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
  }), e.entityMap = e.HTML_ENTITIES;
})(Un);
var xt = {}, qe = B, y = v, Vn = Ae, eo = qe.isHTMLEscapableRawTextElement, to = qe.isHTMLMimeType, ro = qe.isHTMLRawTextElement, it = qe.hasOwn, Mr = qe.NAMESPACE, _r = Vn.ParseError, no = Vn.DOMException, He = 0, ie = 1, Ce = 2, Ge = 3, Te = 4, we = 5, ze = 6, mt = 7;
function Hn() {
}
Hn.prototype = {
  parse: function(e, t, r) {
    var n = this.domBuilder;
    n.startDocument(), Gn(t, t = /* @__PURE__ */ Object.create(null)), uo(e, t, r, n, this.errorHandler), n.endDocument();
  }
};
var or = /&#?\w+;?/g;
function uo(e, t, r, n, u) {
  var i = to(n.mimeType);
  e.indexOf(y.UNICODE_REPLACEMENT_CHARACTER) >= 0 && u.warning("Unicode replacement character detected, source encoding issues?");
  function a(w) {
    if (w > 65535) {
      w -= 65536;
      var J = 55296 + (w >> 10), pt = 56320 + (w & 1023);
      return String.fromCharCode(J, pt);
    } else
      return String.fromCharCode(w);
  }
  function o(w) {
    var J = w[w.length - 1] === ";" ? w : w + ";";
    if (!i && J !== w)
      return u.error("EntityRef: expecting ;"), w;
    var pt = y.Reference.exec(J);
    if (!pt || pt[0].length !== J.length)
      return u.error("entity not matching Reference production: " + w), w;
    var ht = J.slice(1, -1);
    return it(r, ht) ? r[ht] : ht.charAt(0) === "#" ? a(parseInt(ht.substr(1).replace("x", "0x"))) : (u.error("entity not found:" + w), w);
  }
  function s(w) {
    if (w > D) {
      var J = e.substring(D, w).replace(or, o);
      g && c(D), n.characters(J, 0, w - D), D = w;
    }
  }
  function c(w, J) {
    for (; w >= l && (J = p.exec(e)); )
      f = J.index, l = f + J[0].length, g.lineNumber++;
    g.columnNumber = w - f + 1;
  }
  for (var f = 0, l = 0, p = /.*(?:\r\n?|\n)|.*$/g, g = n.locator, m = [{ currentNSMap: t }], h = [], D = 0; ; ) {
    try {
      var O = e.indexOf("<", D);
      if (O < 0) {
        if (!i && h.length > 0)
          return u.fatalError("unclosed xml tag(s): " + h.join(", "));
        if (!e.substring(D).match(/^\s*$/)) {
          var L = n.doc, b = L.createTextNode(e.substr(D));
          if (L.documentElement)
            return u.error("Extra content at the end of the document");
          L.appendChild(b), n.currentElement = b;
        }
        return;
      }
      if (O > D) {
        var W = e.substring(D, O);
        !i && h.length === 0 && (W = W.replace(new RegExp(y.S_OPT.source, "g"), ""), W && u.error("Unexpected content outside root element: '" + W + "'")), s(O);
      }
      switch (e.charAt(O + 1)) {
        case "/":
          var G = e.indexOf(">", O + 2), V = e.substring(O + 2, G > 0 ? G : void 0);
          if (!V)
            return u.fatalError("end tag name missing");
          var je = G > 0 && y.reg("^", y.QName_group, y.S_OPT, "$").exec(V);
          if (!je)
            return u.fatalError('end tag name contains invalid characters: "' + V + '"');
          if (!n.currentElement && !n.doc.documentElement)
            return;
          var Ue = h[h.length - 1] || n.currentElement.tagName || n.doc.documentElement.tagName || "";
          if (Ue !== je[1]) {
            var Pt = je[1].toLowerCase();
            if (!i || Ue.toLowerCase() !== Pt)
              return u.fatalError('Opening and ending tag mismatch: "' + Ue + '" != "' + V + '"');
          }
          var Lt = m.pop();
          h.pop();
          var Ft = Lt.localNSMap;
          if (n.endElement(Lt.uri, Lt.localName, Ue), Ft)
            for (var fr in Ft)
              it(Ft, fr) && n.endPrefixMapping(fr);
          G++;
          break;
        case "?":
          g && c(O), G = so(e, O, n, u);
          break;
        case "!":
          g && c(O), G = Jn(e, O, n, u, i);
          break;
        default:
          g && c(O);
          var H = new Xn(), kt = m[m.length - 1].currentNSMap, G = io(e, O, H, kt, o, u, i), pr = H.length;
          if (H.closed || (i && qe.isHTMLVoidElement(H.tagName) ? H.closed = !0 : h.push(H.tagName)), g && pr) {
            for (var ou = Pr(g, {}), qt = 0; qt < pr; qt++) {
              var hr = H[qt];
              c(hr.offset), hr.locator = Pr(g, {});
            }
            n.locator = ou, Lr(H, n, kt) && m.push(H), n.locator = g;
          } else
            Lr(H, n, kt) && m.push(H);
          i && !H.closed ? G = oo(e, G, H.tagName, o, n) : G++;
      }
    } catch (w) {
      if (w instanceof _r)
        throw w;
      if (w instanceof no)
        throw new _r(w.name + ": " + w.message, n.locator, w);
      u.error("element parse error: " + w), G = -1;
    }
    G > D ? D = G : s(Math.max(O, D) + 1);
  }
}
function Pr(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function io(e, t, r, n, u, i, a) {
  function o(g, m, h) {
    if (it(r.attributeNames, g))
      return i.fatalError("Attribute " + g + " redefined");
    if (!a && m.indexOf("<") >= 0)
      return i.fatalError("Unescaped '<' not allowed in attributes values");
    r.addValue(
      g,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      m.replace(/[\t\n\r]/g, " ").replace(or, u),
      h
    );
  }
  for (var s, c, f = ++t, l = He; ; ) {
    var p = e.charAt(f);
    switch (p) {
      case "=":
        if (l === ie)
          s = e.slice(t, f), l = Ge;
        else if (l === Ce)
          l = Ge;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (l === Ge || l === ie)
          if (l === ie && (i.warning('attribute value must after "="'), s = e.slice(t, f)), t = f + 1, f = e.indexOf(p, t), f > 0)
            c = e.slice(t, f), o(s, c, t - 1), l = we;
          else
            throw new Error("attribute value no end '" + p + "' match");
        else if (l == Te)
          c = e.slice(t, f), o(s, c, t), i.warning('attribute "' + s + '" missed start quot(' + p + ")!!"), t = f + 1, l = we;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (l) {
          case He:
            r.setTagName(e.slice(t, f));
          case we:
          case ze:
          case mt:
            l = mt, r.closed = !0;
          case Te:
          case ie:
            break;
          case Ce:
            r.closed = !0;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return i.error("unexpected end of input"), l == He && r.setTagName(e.slice(t, f)), f;
      case ">":
        switch (l) {
          case He:
            r.setTagName(e.slice(t, f));
          case we:
          case ze:
          case mt:
            break;
          case Te:
          case ie:
            c = e.slice(t, f), c.slice(-1) === "/" && (r.closed = !0, c = c.slice(0, -1));
          case Ce:
            l === Ce && (c = s), l == Te ? (i.warning('attribute "' + c + '" missed quot(")!'), o(s, c, t)) : (a || i.warning('attribute "' + c + '" missed value!! "' + c + '" instead!!'), o(c, c, t));
            break;
          case Ge:
            if (!a)
              return i.fatalError(`AttValue: ' or " expected`);
        }
        return f;
      case "":
        p = " ";
      default:
        if (p <= " ")
          switch (l) {
            case He:
              r.setTagName(e.slice(t, f)), l = ze;
              break;
            case ie:
              s = e.slice(t, f), l = Ce;
              break;
            case Te:
              var c = e.slice(t, f);
              i.warning('attribute "' + c + '" missed quot(")!!'), o(s, c, t);
            case we:
              l = ze;
              break;
          }
        else
          switch (l) {
            case Ce:
              a || i.warning('attribute "' + s + '" missed value!! "' + s + '" instead2!!'), o(s, s, t), t = f, l = ie;
              break;
            case we:
              i.warning('attribute space is required"' + s + '"!!');
            case ze:
              l = ie, t = f;
              break;
            case Ge:
              l = Te, t = f;
              break;
            case mt:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    f++;
  }
}
function Lr(e, t, r) {
  for (var n = e.tagName, u = null, l = e.length; l--; ) {
    var i = e[l], a = i.qName, o = i.value, p = a.indexOf(":");
    if (p > 0)
      var s = i.prefix = a.slice(0, p), c = a.slice(p + 1), f = s === "xmlns" && c;
    else
      c = a, s = null, f = a === "xmlns" && "";
    i.localName = c, f !== !1 && (u == null && (u = /* @__PURE__ */ Object.create(null), Gn(r, r = /* @__PURE__ */ Object.create(null))), r[f] = u[f] = o, i.uri = Mr.XMLNS, t.startPrefixMapping(f, o));
  }
  for (var l = e.length; l--; )
    i = e[l], i.prefix && (i.prefix === "xml" && (i.uri = Mr.XML), i.prefix !== "xmlns" && (i.uri = r[i.prefix]));
  var p = n.indexOf(":");
  p > 0 ? (s = e.prefix = n.slice(0, p), c = e.localName = n.slice(p + 1)) : (s = null, c = e.localName = n);
  var g = e.uri = r[s || ""];
  if (t.startElement(g, c, n, e), e.closed) {
    if (t.endElement(g, c, n), u)
      for (s in u)
        it(u, s) && t.endPrefixMapping(s);
  } else
    return e.currentNSMap = r, e.localNSMap = u, !0;
}
function oo(e, t, r, n, u) {
  var i = eo(r);
  if (i || ro(r)) {
    var a = e.indexOf("</" + r + ">", t), o = e.substring(t + 1, a);
    return i && (o = o.replace(or, n)), u.characters(o, 0, o.length), a;
  }
  return t + 1;
}
function Gn(e, t) {
  for (var r in e)
    it(e, r) && (t[r] = e[r]);
}
function zn(e, t) {
  var r = t;
  function n(c) {
    return c = c || 0, e.charAt(r + c);
  }
  function u(c) {
    c = c || 1, r += c;
  }
  function i() {
    for (var c = 0; r < e.length; ) {
      var f = n();
      if (f !== " " && f !== `
` && f !== "	" && f !== "\r")
        return c;
      c++, u();
    }
    return -1;
  }
  function a() {
    return e.substring(r);
  }
  function o(c) {
    return e.substring(r, r + c.length) === c;
  }
  function s(c) {
    var f = y.reg("^", c), l = f.exec(a());
    return l ? (u(l[0].length), l[0]) : null;
  }
  return {
    char: n,
    getIndex: function() {
      return r;
    },
    getMatch: s,
    getSource: function() {
      return e;
    },
    skip: u,
    skipBlanks: i,
    substringFromIndex: a,
    substringStartsWith: o
  };
}
function ao(e, t) {
  function r(o, s) {
    var c = y.PI.exec(o.substringFromIndex());
    return c ? c[1].toLowerCase() === "xml" ? s.fatalError(
      "xml declaration is only allowed at the start of the document, but found at position " + o.getIndex()
    ) : (o.skip(c[0].length), c[0]) : s.fatalError("processing instruction is not well-formed at position " + o.getIndex());
  }
  var n = e.getSource();
  if (e.char() === "[") {
    e.skip(1);
    for (var u = e.getIndex(); e.getIndex() < n.length; ) {
      if (e.skipBlanks(), e.char() === "]") {
        var i = n.substring(u, e.getIndex());
        return e.skip(1), i;
      }
      var a = null;
      if (e.char() === "<" && e.char(1) === "!")
        switch (e.char(2)) {
          case "E":
            e.char(3) === "L" ? a = e.getMatch(y.elementdecl) : e.char(3) === "N" && (a = e.getMatch(y.EntityDecl));
            break;
          case "A":
            a = e.getMatch(y.AttlistDecl);
            break;
          case "N":
            a = e.getMatch(y.NotationDecl);
            break;
          case "-":
            a = e.getMatch(y.Comment);
            break;
        }
      else if (e.char() === "<" && e.char(1) === "?")
        a = r(e, t);
      else if (e.char() === "%")
        a = e.getMatch(y.PEReference);
      else
        return t.fatalError("Error detected in Markup declaration");
      if (!a)
        return t.fatalError("Error in internal subset at position " + e.getIndex());
    }
    return t.fatalError("doctype internal subset is not well-formed, missing ]");
  }
}
function Jn(e, t, r, n, u) {
  var i = zn(e, t);
  switch (i.char(2)) {
    case "-":
      var a = i.getMatch(y.Comment);
      return a ? (r.comment(a, y.COMMENT_START.length, a.length - y.COMMENT_START.length - y.COMMENT_END.length), i.getIndex()) : n.fatalError("comment is not well-formed at position " + i.getIndex());
    case "[":
      var o = i.getMatch(y.CDSect);
      return o ? !u && !r.currentElement ? n.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(o, y.CDATA_START.length, o.length - y.CDATA_START.length - y.CDATA_END.length), r.endCDATA(), i.getIndex()) : n.fatalError("Invalid CDATA starting at position " + t);
    case "D": {
      if (r.doc && r.doc.documentElement)
        return n.fatalError("Doctype not allowed inside or after documentElement at position " + i.getIndex());
      if (!i.substringStartsWith(y.DOCTYPE_DECL_START))
        return n.fatalError("Expected " + y.DOCTYPE_DECL_START + " at position " + i.getIndex());
      if (i.skip(y.DOCTYPE_DECL_START.length), i.skipBlanks() < 1)
        return n.fatalError("Expected whitespace after " + y.DOCTYPE_DECL_START + " at position " + i.getIndex());
      var s = {
        name: void 0,
        publicId: void 0,
        systemId: void 0,
        internalSubset: void 0
      };
      if (s.name = i.getMatch(y.Name), !s.name)
        return n.fatalError("doctype name missing or contains unexpected characters at position " + i.getIndex());
      if (i.skipBlanks(), i.substringStartsWith(y.PUBLIC) || i.substringStartsWith(y.SYSTEM)) {
        var c = y.ExternalID_match.exec(i.substringFromIndex());
        if (!c)
          return n.fatalError("doctype external id is not well-formed at position " + i.getIndex());
        c.groups.SystemLiteralOnly !== void 0 ? s.systemId = c.groups.SystemLiteralOnly : (s.systemId = c.groups.SystemLiteral, s.publicId = c.groups.PubidLiteral), i.skip(c[0].length);
      }
      return i.skipBlanks(), s.internalSubset = ao(i, n), i.skipBlanks(), i.char() !== ">" ? n.fatalError("doctype not terminated with > at position " + i.getIndex()) : (i.skip(1), r.startDTD(s.name, s.publicId, s.systemId, s.internalSubset), r.endDTD(), i.getIndex());
    }
    default:
      return n.fatalError('Not well-formed XML starting with "<!" at position ' + t);
  }
}
function so(e, t, r, n) {
  var u = e.substring(t).match(y.PI);
  if (!u)
    return n.fatalError("Invalid processing instruction starting at position " + t);
  if (u[1].toLowerCase() === "xml") {
    if (t > 0)
      return n.fatalError(
        "processing instruction at position " + t + " is an xml declaration which is only at the start of the document"
      );
    if (!y.XMLDecl.test(e.substring(t)))
      return n.fatalError("xml declaration is not well-formed");
  }
  return r.processingInstruction(u[1], u[2]), t + u[0].length;
}
function Xn() {
  this.attributeNames = /* @__PURE__ */ Object.create(null);
}
Xn.prototype = {
  setTagName: function(e) {
    if (!y.QName_exact.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, r) {
    if (!y.QName_exact.test(e))
      throw new Error("invalid attribute:" + e);
    this.attributeNames[e] = this.length, this[this.length++] = { qName: e, value: t, offset: r };
  },
  length: 0,
  getLocalName: function(e) {
    return this[e].localName;
  },
  getLocator: function(e) {
    return this[e].locator;
  },
  getQName: function(e) {
    return this[e].qName;
  },
  getURI: function(e) {
    return this[e].uri;
  },
  getValue: function(e) {
    return this[e].value;
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
};
xt.XMLReader = Hn;
xt.parseUtils = zn;
xt.parseDoctypeCommentOrCData = Jn;
var Ne = B, co = x, lo = Ae, Fr = Un, fo = xt, po = co.DOMImplementation, ho = Ne.hasDefaultHTMLNamespace, mo = Ne.isHTMLMimeType, Eo = Ne.isValidMimeType, Yn = Ne.MIME_TYPE, Ut = Ne.NAMESPACE, kr = lo.ParseError, go = fo.XMLReader;
function Do(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function vo(e) {
  if (e = e || { locator: !0 }, this.assign = e.assign || Ne.assign, this.domHandler = e.domHandler || ar, this.onError = e.onError || e.errorHandler, e.errorHandler && typeof e.errorHandler != "function")
    throw new TypeError("errorHandler object is no longer supported, switch to onError!");
  e.errorHandler && e.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = e.normalizeLineEndings || Do, this.locator = !!e.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), e.xmlns);
}
vo.prototype.parseFromString = function(e, t) {
  if (!Eo(t))
    throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + t + '" is not valid.');
  var r = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), n = Fr.XML_ENTITIES, u = r[""] || null;
  ho(t) ? (n = Fr.HTML_ENTITIES, u = Ut.HTML) : t === Yn.XML_SVG_IMAGE && (u = Ut.SVG), r[""] = u, r.xml = r.xml || Ut.XML;
  var i = new this.domHandler({
    mimeType: t,
    defaultNamespace: u,
    onError: this.onError
  }), a = this.locator ? {} : void 0;
  this.locator && i.setDocumentLocator(a);
  var o = new go();
  o.errorHandler = i, o.domBuilder = i;
  var s = !Ne.isHTMLMimeType(t);
  return s && typeof e != "string" && o.errorHandler.fatalError("source is not a string"), o.parse(this.normalizeLineEndings(String(e)), r, n), i.doc.documentElement || o.errorHandler.fatalError("missing root element"), i.doc;
};
function ar(e) {
  var t = e || {};
  this.mimeType = t.mimeType || Yn.XML_APPLICATION, this.defaultNamespace = t.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = t.onError;
}
function Se(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
ar.prototype = {
  /**
   * Either creates an XML or an HTML document and stores it under `this.doc`.
   * If it is an XML document, `this.defaultNamespace` is used to create it,
   * and it will not contain any `childNodes`.
   * If it is an HTML document, it will be created without any `childNodes`.
   *
   * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
   */
  startDocument: function() {
    var e = new po();
    this.doc = mo(this.mimeType) ? e.createHTMLDocument(!1) : e.createDocument(this.defaultNamespace, "");
  },
  startElement: function(e, t, r, n) {
    var u = this.doc, i = u.createElementNS(e, r || t), a = n.length;
    Et(this, i), this.currentElement = i, this.locator && Se(this.locator, i);
    for (var o = 0; o < a; o++) {
      var e = n.getURI(o), s = n.getValue(o), r = n.getQName(o), c = u.createAttributeNS(e, r);
      this.locator && Se(n.getLocator(o), c), c.value = c.nodeValue = s, i.setAttributeNode(c);
    }
  },
  endElement: function(e, t, r) {
    this.currentElement = this.currentElement.parentNode;
  },
  startPrefixMapping: function(e, t) {
  },
  endPrefixMapping: function(e) {
  },
  processingInstruction: function(e, t) {
    var r = this.doc.createProcessingInstruction(e, t);
    this.locator && Se(this.locator, r), Et(this, r);
  },
  ignorableWhitespace: function(e, t, r) {
  },
  characters: function(e, t, r) {
    if (e = qr.apply(this, arguments), e) {
      if (this.cdata)
        var n = this.doc.createCDATASection(e);
      else
        var n = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(n) : /^\s*$/.test(e) && this.doc.appendChild(n), this.locator && Se(this.locator, n);
    }
  },
  skippedEntity: function(e) {
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
  setDocumentLocator: function(e) {
    e && (e.lineNumber = 0), this.locator = e;
  },
  //LexicalHandler
  comment: function(e, t, r) {
    e = qr.apply(this, arguments);
    var n = this.doc.createComment(e);
    this.locator && Se(this.locator, n), Et(this, n);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(e, t, r, n) {
    var u = this.doc.implementation;
    if (u && u.createDocumentType) {
      var i = u.createDocumentType(e, t, r, n);
      this.locator && Se(this.locator, i), Et(this, i), this.doc.doctype = i;
    }
  },
  reportError: function(e, t) {
    if (typeof this.onError == "function")
      try {
        this.onError(e, t, this);
      } catch (r) {
        throw new kr("Reporting " + e + ' "' + t + '" caused ' + r, this.locator);
      }
    else
      console.error("[xmldom " + e + "]	" + t, Ao(this.locator));
  },
  /**
   * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(e) {
    this.reportError("warning", e);
  },
  error: function(e) {
    this.reportError("error", e);
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
  fatalError: function(e) {
    throw this.reportError("fatalError", e), new kr(e, this.locator);
  }
};
function Ao(e) {
  if (e)
    return `
@#[line:` + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function qr(e, t, r) {
  return typeof e == "string" ? e.substr(t, r) : e.length >= t + r || t ? new java.lang.String(e, t, r) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
  /\w+/g,
  function(e) {
    ar.prototype[e] = function() {
      return null;
    };
  }
);
function Et(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
var $e = B;
$e.assign;
$e.hasDefaultHTMLNamespace;
$e.isHTMLMimeType;
$e.isValidMimeType;
$e.MIME_TYPE;
$e.NAMESPACE;
const Gt = "USJ";
var be = {}, No = () => {
  const e = "\\ud800-\\udfff", a = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", o = "\\ufe0e\\ufe0f", s = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", c = `[${e}]`, f = `[${a}]`, l = "\\ud83c[\\udffb-\\udfff]", p = `(?:${f}|${l})`, g = `[^${e}]`, m = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", D = "\\u200d", O = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", L = `[${s}]`, b = `${p}?`, W = `[${o}]?`, V = `(?:${D}(?:${[g, m, h].join("|")})${W + b})*`, je = W + b + V, Pt = `(?:${[`${g}${f}?`, f, m, h, c, L].join("|")})`;
  return new RegExp(`${O}|${l}(?=${l})|${Pt + je}`, "g");
}, bo = vr && vr.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(be, "__esModule", { value: !0 });
var Mt = bo(No);
function zt(e) {
  if (typeof e != "string")
    throw new Error("A string is expected as input");
  return e.match(Mt.default()) || [];
}
var yo = be.toArray = zt;
function sr(e) {
  if (typeof e != "string")
    throw new Error("Input must be a string");
  var t = e.match(Mt.default());
  return t === null ? 0 : t.length;
}
var Co = be.length = sr;
function Kn(e, t, r) {
  if (t === void 0 && (t = 0), typeof e != "string")
    throw new Error("Input must be a string");
  (typeof t != "number" || t < 0) && (t = 0), typeof r == "number" && r < 0 && (r = 0);
  var n = e.match(Mt.default());
  return n ? n.slice(t, r).join("") : "";
}
var To = be.substring = Kn;
function wo(e, t, r) {
  if (t === void 0 && (t = 0), typeof e != "string")
    throw new Error("Input must be a string");
  var n = sr(e);
  if (typeof t != "number" && (t = parseInt(t, 10)), t >= n)
    return "";
  t < 0 && (t += n);
  var u;
  typeof r > "u" ? u = n : (typeof r != "number" && (r = parseInt(r, 10)), u = r >= 0 ? r + t : t);
  var i = e.match(Mt.default());
  return i ? i.slice(t, u).join("") : "";
}
var So = be.substr = wo;
function Oo(e, t, r, n) {
  if (t === void 0 && (t = 16), r === void 0 && (r = "#"), n === void 0 && (n = "right"), typeof e != "string" || typeof t != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(n) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var u = sr(e);
  if (u > t)
    return Kn(e, 0, t);
  if (u < t) {
    var i = r.repeat(t - u);
    return n === "left" ? i + e : e + i;
  }
  return e;
}
var Wn = be.limit = Oo;
function Io(e, t, r) {
  if (r === void 0 && (r = 0), typeof e != "string")
    throw new Error("Input must be a string");
  if (e === "")
    return t === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, t = String(t);
  var n = zt(e);
  if (r >= n.length)
    return t === "" ? n.length : -1;
  if (t === "")
    return r;
  var u = zt(t), i = !1, a;
  for (a = r; a < n.length; a += 1) {
    for (var o = 0; o < u.length && u[o] === n[a + o]; )
      o += 1;
    if (o === u.length && u[o - 1] === n[a + o - 1]) {
      i = !0;
      break;
    }
  }
  return i ? a : -1;
}
var Ro = be.indexOf = Io;
function Qn(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function gt(e, t) {
  if (!(t > P(e) || t < -P(e)))
    return _t(e, t, 1);
}
function Re(e, t) {
  return t < 0 || t > P(e) - 1 ? "" : _t(e, t, 1);
}
function ts(e, t) {
  if (!(t < 0 || t > P(e) - 1))
    return _t(e, t, 1).codePointAt(0);
}
function Bo(e, t, r = P(e)) {
  const n = Po(e, t);
  return !(n === -1 || n + P(t) !== r);
}
function xo(e, t, r) {
  if (t < 0) return -1;
  if (r) {
    if (Re(e, t) === "}" && Re(e, t - 1) === "\\") return t;
    const i = ot(e, "\\}", t);
    return i >= 0 ? i + 1 : i;
  }
  let n = t;
  const u = P(e);
  for (; n < u && (n = ot(e, "}", n), !(n === -1 || Re(e, n - 1) !== "\\")); )
    n += 1;
  return n >= u ? -1 : n;
}
function Mo(e, t) {
  const r = [];
  let n = 0, u = 0;
  function i(o, s, c) {
    const f = de(e, u, s), l = r.length > 0 && ae(r[r.length - 1]) ? `${r.pop()}${f}` : f;
    ae(o) ? r.push(`${l}${o}`) : (l && r.push(l), r.push(o)), u = s + c;
  }
  const a = P(e);
  for (; n < a; ) {
    switch (Re(e, n)) {
      case "{":
        if (Re(e, n - 1) !== "\\") {
          const o = xo(e, n, !1);
          if (o >= 0) {
            const s = de(e, n + 1, o), c = s in t ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[s]
            ) : s;
            i(c, n, o + 1 - n), n = o, u = o + 1;
          }
        } else
          i("{", n - 1, 2);
        break;
      case "}":
        Re(e, n - 1) !== "\\" || i("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (u < a) {
    const o = de(e, u);
    r.push(
      r.length > 0 && ae(r[r.length - 1]) ? `${r.pop()}${o}` : o
    );
  }
  return r;
}
function rs(e, t) {
  return Mo(e, t).map((r) => `${r}`).join("");
}
function _o(e, t, r = 0) {
  const n = de(e, r);
  return ot(n, t) !== -1;
}
function ot(e, t, r = 0) {
  return Ro(e, t, r);
}
function Po(e, t, r) {
  let n = r === void 0 ? P(e) : r;
  n < 0 ? n = 0 : n >= P(e) && (n = P(e) - 1);
  for (let u = n; u >= 0; u--)
    if (_t(e, u, P(t)) === t)
      return u;
  return -1;
}
function P(e) {
  return Co(e);
}
function ns(e, t) {
  const r = t.toUpperCase();
  return r === "NONE" ? e : e.normalize(r);
}
function us(e, t, r) {
  return e.localeCompare(t, "en", r);
}
function is(e, t, r = " ") {
  return t <= P(e) ? e : Wn(e, t, r, "right");
}
function os(e, t, r = " ") {
  return t <= P(e) ? e : Wn(e, t, r, "left");
}
function $r(e, t) {
  return t > e ? e : t < -e ? 0 : t < 0 ? t + e : t;
}
function jr(e, t, r) {
  const n = P(e);
  if (t > n || r && (t > r && !(t >= 0 && t < n && r < 0 && r > -n) || r < -n))
    return "";
  const u = $r(n, t), i = r ? $r(n, r) : void 0;
  return de(e, u, i);
}
function Ur(e, t, r) {
  const n = [];
  if (r !== void 0 && r <= 0)
    return [e];
  if (t === "") return Lo(e).slice(0, r);
  let u = t;
  (typeof t == "string" || t instanceof RegExp && !_o(t.flags, "g")) && (u = new RegExp(t, "g"));
  const i = e.match(u);
  let a = 0;
  if (!i) return [e];
  for (let o = 0; o < (r ? r - 1 : i.length); o++) {
    const s = ot(e, i[o], a), c = P(i[o]);
    if (n.push(de(e, a, s)), a = s + c, r !== void 0 && n.length === r)
      break;
  }
  return n.push(de(e, a)), n;
}
function Zn(e, t, r = 0) {
  return ot(e, t, r) === r;
}
function _t(e, t = 0, r = P(e) - t) {
  return So(e, t, r);
}
function de(e, t, r = P(e)) {
  return To(e, t, r);
}
function Lo(e) {
  return yo(e);
}
function as(e) {
  return Zn(e, "%") && Bo(e, "%");
}
function ss(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function cs(e) {
  return e ? Qn(e).map(
    (n) => Array.isArray(n) ? n.map((u) => new RegExp(u)) : new RegExp(n)
  ) : [];
}
function ls(e) {
  return e ? Qn(e).map((n) => new RegExp(n)) : [];
}
const Fo = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function Oe(e) {
  return Fo.test(e);
}
const Jt = ["chapter", "book", "para", "row", "sidebar", Gt], ko = "​", eu = [
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
], qo = 1, $o = eu.length - 1, jo = 1, Uo = 1, fs = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1
}, Vo = (e) => {
  var t;
  return ((t = eu[e]) == null ? void 0 : t.chapters) ?? -1;
}, ps = (e, t) => ({
  bookNum: Math.max(qo, Math.min(e.bookNum + t, $o)),
  chapterNum: 1,
  verseNum: 1
}), hs = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(jo, e.chapterNum + t),
    Vo(e.bookNum)
  ),
  verseNum: 1
}), ds = (e, t) => ({
  ...e,
  verseNum: Math.max(Uo, e.verseNum + t)
});
async function ms(e, t, r) {
  const n = Q.bookNumberToId(e);
  if (!Zn(Intl.getCanonicalLocales(t)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [t]
    });
  const u = await r({
    localizeKey: `Book.${n}`,
    languagesToSearch: [t]
  }), i = Ur(u, "-");
  return Ur(i[0], "ÿ08")[0].trim();
}
function Vr(e) {
  return new Wt(e.bookNum, e.chapterNum, e.verseNum).BBBCCCVVV;
}
function Es(e, t) {
  return Vr(e) - Vr(t);
}
function Ho(e) {
  return `%scrollGroup_${e}%`;
}
function gs(e) {
  return e.map((t) => Ho(t));
}
function Ds(e, t, r, n) {
  let u;
  switch (t ?? "id") {
    case "English":
      u = Q.bookNumberToEnglishName(e.bookNum);
      break;
    case "id":
      u = Q.bookNumberToId(e.bookNum);
      break;
    default:
      u = t ?? "";
      break;
  }
  return `${u}${n ?? " "}${e.chapterNum}${r ?? ":"}${e.verseNum}`;
}
const Go = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function Hr(e) {
  return Go.test(e);
}
const zo = /^[\u200d\u2003\u2002\u0020\u00a0\u202f\u2009\u200a\u3000\u200b\u200c\u2060\u200e\u200f]+$/;
function Jo(e) {
  return zo.test(e);
}
function Gr(e) {
  let t = "", r = !1, n = "\0";
  for (let u = 0; u < e.length; u += 1) {
    const i = e[u];
    i.charCodeAt(0) < 32 ? (r || (t += " "), r = !0) : !r && i === ko && u + 1 < e.length && Hr(e[u + 1]) || (Hr(i) ? (r || (t += i), r = !0) : Jo(i) && n === i || (t += i, r = !1)), n = i;
  }
  return t;
}
function zr(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function Jr(e, t) {
  if (!t || !Jt.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function tu(e, t, r, n) {
  if (!e && !r) return !0;
  if (!e || !r) return !1;
  const u = ae(e), i = ae(r);
  if (u && i) {
    const a = Gr(e), o = Gr(r);
    if (a !== o) {
      if (!Oe(gt(a, -1) ?? "") && !Oe(gt(o, -1) ?? "") || !Jr(e, t) || !Jr(r, n)) return !1;
      let s = a;
      for (; Oe(gt(s, -1) ?? ""); ) s = jr(s, 0, -1);
      let c = o;
      for (; Oe(gt(c, -1) ?? ""); ) c = jr(c, 0, -1);
      if (s !== c) return !1;
    }
  } else if (!u && !i) {
    const a = e, o = r, s = Object.keys(a).filter(
      (l) => l !== "content"
    );
    if (s.length !== Object.keys(o).filter((l) => l !== "content").length || s.some((l) => !(l in o) || a[l] !== o[l])) return !1;
    const c = zr(a.content), f = zr(o.content);
    if (c !== f) return !1;
    if (!c && !f) {
      let l = a.content, p = o.content;
      const g = l[l.length - 1];
      Jt.includes(a.type) && ae(g) && Oe(g) && (l = l.slice(0, -1));
      const m = p[p.length - 1];
      if (Jt.includes(o.type) && ae(m) && Oe(m) && (p = p.slice(0, -1)), l.length !== p.length) return !1;
      for (let h = 0; h < l.length; h += 1)
        if (!tu(l[h], a, p[h], o))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function vs(e, t) {
  return tu(e, void 0, t, void 0);
}
const As = (e) => (...t) => e.map((n) => n(...t)).every((n) => n), Ns = (e) => async (...t) => {
  const r = e.map(async (n) => n(...t));
  return (await Promise.all(r)).every((n) => n);
}, Dt = "chapter", vt = "verse";
var Xo = Object.getOwnPropertyNames, Yo = Object.getOwnPropertySymbols, Ko = Object.prototype.hasOwnProperty;
function Xr(e, t) {
  return function(n, u, i) {
    return e(n, u, i) && t(n, u, i);
  };
}
function At(e) {
  return function(r, n, u) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, u);
    var i = u.cache, a = i.get(r), o = i.get(n);
    if (a && o)
      return a === n && o === r;
    i.set(r, n), i.set(n, r);
    var s = e(r, n, u);
    return i.delete(r), i.delete(n), s;
  };
}
function Yr(e) {
  return Xo(e).concat(Yo(e));
}
var Wo = Object.hasOwn || function(e, t) {
  return Ko.call(e, t);
};
function ye(e, t) {
  return e === t || !e && !t && e !== e && t !== t;
}
var Qo = "__v", Zo = "__o", ea = "_owner", Kr = Object.getOwnPropertyDescriptor, Wr = Object.keys;
function ta(e, t, r) {
  var n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function ra(e, t) {
  return ye(e.getTime(), t.getTime());
}
function na(e, t) {
  return e.name === t.name && e.message === t.message && e.cause === t.cause && e.stack === t.stack;
}
function ua(e, t) {
  return e === t;
}
function Qr(e, t, r) {
  var n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  for (var u = new Array(n), i = e.entries(), a, o, s = 0; (a = i.next()) && !a.done; ) {
    for (var c = t.entries(), f = !1, l = 0; (o = c.next()) && !o.done; ) {
      if (u[l]) {
        l++;
        continue;
      }
      var p = a.value, g = o.value;
      if (r.equals(p[0], g[0], s, l, e, t, r) && r.equals(p[1], g[1], p[0], g[0], e, t, r)) {
        f = u[l] = !0;
        break;
      }
      l++;
    }
    if (!f)
      return !1;
    s++;
  }
  return !0;
}
var ia = ye;
function oa(e, t, r) {
  var n = Wr(e), u = n.length;
  if (Wr(t).length !== u)
    return !1;
  for (; u-- > 0; )
    if (!ru(e, t, r, n[u]))
      return !1;
  return !0;
}
function Je(e, t, r) {
  var n = Yr(e), u = n.length;
  if (Yr(t).length !== u)
    return !1;
  for (var i, a, o; u-- > 0; )
    if (i = n[u], !ru(e, t, r, i) || (a = Kr(e, i), o = Kr(t, i), (a || o) && (!a || !o || a.configurable !== o.configurable || a.enumerable !== o.enumerable || a.writable !== o.writable)))
      return !1;
  return !0;
}
function aa(e, t) {
  return ye(e.valueOf(), t.valueOf());
}
function sa(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Zr(e, t, r) {
  var n = e.size;
  if (n !== t.size)
    return !1;
  if (!n)
    return !0;
  for (var u = new Array(n), i = e.values(), a, o; (a = i.next()) && !a.done; ) {
    for (var s = t.values(), c = !1, f = 0; (o = s.next()) && !o.done; ) {
      if (!u[f] && r.equals(a.value, o.value, a.value, o.value, e, t, r)) {
        c = u[f] = !0;
        break;
      }
      f++;
    }
    if (!c)
      return !1;
  }
  return !0;
}
function ca(e, t) {
  var r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function la(e, t) {
  return e.hostname === t.hostname && e.pathname === t.pathname && e.protocol === t.protocol && e.port === t.port && e.hash === t.hash && e.username === t.username && e.password === t.password;
}
function ru(e, t, r, n) {
  return (n === ea || n === Zo || n === Qo) && (e.$$typeof || t.$$typeof) ? !0 : Wo(t, n) && r.equals(e[n], t[n], n, n, e, t, r);
}
var fa = "[object Arguments]", pa = "[object Boolean]", ha = "[object Date]", da = "[object Error]", ma = "[object Map]", Ea = "[object Number]", ga = "[object Object]", Da = "[object RegExp]", va = "[object Set]", Aa = "[object String]", Na = "[object URL]", ba = Array.isArray, en = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, tn = Object.assign, ya = Object.prototype.toString.call.bind(Object.prototype.toString);
function Ca(e) {
  var t = e.areArraysEqual, r = e.areDatesEqual, n = e.areErrorsEqual, u = e.areFunctionsEqual, i = e.areMapsEqual, a = e.areNumbersEqual, o = e.areObjectsEqual, s = e.arePrimitiveWrappersEqual, c = e.areRegExpsEqual, f = e.areSetsEqual, l = e.areTypedArraysEqual, p = e.areUrlsEqual;
  return function(m, h, D) {
    if (m === h)
      return !0;
    if (m == null || h == null)
      return !1;
    var O = typeof m;
    if (O !== typeof h)
      return !1;
    if (O !== "object")
      return O === "number" ? a(m, h, D) : O === "function" ? u(m, h, D) : !1;
    var L = m.constructor;
    if (L !== h.constructor)
      return !1;
    if (L === Object)
      return o(m, h, D);
    if (ba(m))
      return t(m, h, D);
    if (en != null && en(m))
      return l(m, h, D);
    if (L === Date)
      return r(m, h, D);
    if (L === RegExp)
      return c(m, h, D);
    if (L === Map)
      return i(m, h, D);
    if (L === Set)
      return f(m, h, D);
    var b = ya(m);
    return b === ha ? r(m, h, D) : b === Da ? c(m, h, D) : b === ma ? i(m, h, D) : b === va ? f(m, h, D) : b === ga ? typeof m.then != "function" && typeof h.then != "function" && o(m, h, D) : b === Na ? p(m, h, D) : b === da ? n(m, h, D) : b === fa ? o(m, h, D) : b === pa || b === Ea || b === Aa ? s(m, h, D) : !1;
  };
}
function Ta(e) {
  var t = e.circular, r = e.createCustomConfig, n = e.strict, u = {
    areArraysEqual: n ? Je : ta,
    areDatesEqual: ra,
    areErrorsEqual: na,
    areFunctionsEqual: ua,
    areMapsEqual: n ? Xr(Qr, Je) : Qr,
    areNumbersEqual: ia,
    areObjectsEqual: n ? Je : oa,
    arePrimitiveWrappersEqual: aa,
    areRegExpsEqual: sa,
    areSetsEqual: n ? Xr(Zr, Je) : Zr,
    areTypedArraysEqual: n ? Je : ca,
    areUrlsEqual: la
  };
  if (r && (u = tn({}, u, r(u))), t) {
    var i = At(u.areArraysEqual), a = At(u.areMapsEqual), o = At(u.areObjectsEqual), s = At(u.areSetsEqual);
    u = tn({}, u, {
      areArraysEqual: i,
      areMapsEqual: a,
      areObjectsEqual: o,
      areSetsEqual: s
    });
  }
  return u;
}
function wa(e) {
  return function(t, r, n, u, i, a, o) {
    return e(t, r, o);
  };
}
function Sa(e) {
  var t = e.circular, r = e.comparator, n = e.createState, u = e.equals, i = e.strict;
  if (n)
    return function(s, c) {
      var f = n(), l = f.cache, p = l === void 0 ? t ? /* @__PURE__ */ new WeakMap() : void 0 : l, g = f.meta;
      return r(s, c, {
        cache: p,
        equals: u,
        meta: g,
        strict: i
      });
    };
  if (t)
    return function(s, c) {
      return r(s, c, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: u,
        meta: void 0,
        strict: i
      });
    };
  var a = {
    cache: void 0,
    equals: u,
    meta: void 0,
    strict: i
  };
  return function(s, c) {
    return r(s, c, a);
  };
}
var Oa = pe();
pe({ strict: !0 });
pe({ circular: !0 });
pe({
  circular: !0,
  strict: !0
});
pe({
  createInternalComparator: function() {
    return ye;
  }
});
pe({
  strict: !0,
  createInternalComparator: function() {
    return ye;
  }
});
pe({
  circular: !0,
  createInternalComparator: function() {
    return ye;
  }
});
pe({
  circular: !0,
  createInternalComparator: function() {
    return ye;
  },
  strict: !0
});
function pe(e) {
  e === void 0 && (e = {});
  var t = e.circular, r = t === void 0 ? !1 : t, n = e.createInternalComparator, u = e.createState, i = e.strict, a = i === void 0 ? !1 : i, o = Ta(e), s = Ca(o), c = n ? n(s) : wa(s);
  return Sa({ circular: r, comparator: s, createState: u, equals: c, strict: a });
}
function Ia(e, t) {
  return Oa(e, t);
}
function Ra(e, t) {
  if (typeof e != typeof t) return !1;
  if (!e && !t) return !0;
  if (Array.isArray(e)) {
    const i = t, a = e;
    return i.length === 0 ? !0 : i.every((o) => a.includes(o));
  }
  if (typeof e != "object")
    return Ia(e, t);
  const r = t, n = e;
  let u = !0;
  return Object.keys(r).forEach((i) => {
    u && (Object.hasOwn(n, i) && Ra(n[i], r[i]) || (u = !1));
  }), u;
}
function rn(e, t, r) {
  return JSON.stringify(e, (u, i) => {
    let a = i;
    return t && (a = t(u, a)), a === void 0 && (a = null), a;
  }, r);
}
function Ba(e, t) {
  function r(a) {
    return Object.keys(a).forEach((o) => {
      a[o] === null ? a[o] = void 0 : typeof a[o] == "object" && (a[o] = r(a[o]));
    }), a;
  }
  function n(a, o) {
    if (o && typeof o == "object" && "book" in o && typeof o.book == "string" && "chapterNum" in o && typeof o.chapterNum == "number" && "verseNum" in o && typeof o.verseNum == "number" && Object.keys(o).every(
      (s) => ["book", "chapterNum", "verseNum", "verse", "versificationStr"].includes(s)
    )) {
      const s = o.chapterNum.toString(10), c = "verse" in o && typeof o.verse == "string" ? o.verse : o.verseNum.toString(10), f = "versificationStr" in o && typeof o.versificationStr == "string" ? new oe(o.versificationStr) : void 0;
      return new Wt(o.book, s, c, f);
    }
    return o;
  }
  function u(a, o) {
    return n(
      a,
      t ? t.call(this, a, o) : o
    );
  }
  const i = JSON.parse(e, u);
  if (i !== null)
    return typeof i == "object" ? r(i) : i;
}
function bs(e) {
  try {
    const t = rn(e);
    return t === rn(Ba(t));
  } catch {
    return !1;
  }
}
const ys = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Cs() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new lu().resolvedOptions().locale;
}
function Ts(e, t = 2) {
  if (e === 0) return "0 Bytes";
  const r = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(e) / Math.log(1024)), u = r[n];
  return `${new Du("en", {
    style: "decimal",
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  }).format(e / 1024 ** n)} ${u}`;
}
const xa = 1e3, nu = 60, uu = nu * 60, Ma = uu * 24;
function ws(e, t, r = /* @__PURE__ */ new Date()) {
  const n = Math.floor((t.getTime() - r.getTime()) / xa), u = Math.round(n / Ma);
  if (Math.abs(u) >= 1) return e.format(u, "day");
  const i = Math.round(n / uu);
  if (Math.abs(i) >= 1) return e.format(i, "hour");
  const a = Math.round(n / nu);
  return Math.abs(a) >= 1 ? e.format(a, "minute") : e.format(n, "second");
}
const cr = {
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
function lr(e) {
  e && Object.values(e).forEach((t) => {
    if (t.type) {
      if ("tsType" in t && delete t.tsType, t.type === "any") {
        delete t.type;
        return;
      }
      t.type === "object" && lr(t.properties);
    }
  });
}
lr(cr);
const _a = {
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
  $defs: cr
};
Object.freeze(_a);
const Pa = {
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
  $defs: cr
};
Object.freeze(Pa);
const iu = {
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
lr(iu);
const La = {
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
  $defs: iu
};
Object.freeze(La);
const Fa = {
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
Object.freeze(Fa);
const ne = ["figure", "note", "sidebar", "table"];
Object.freeze(ne);
class F {
  constructor(t) {
    I(this, "usj");
    I(this, "parentMapInternal");
    this.usj = t;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(t) {
    const r = dr({ path: t, json: this.usj, wrap: !0 });
    if (r === void 0 || r.length === 0) return;
    if (!Array.isArray(r[0])) return r[0];
    const n = dr({ path: t, json: this.usj, wrap: !1 });
    return n.length === 1 && Array.isArray(n[0]) ? n[0] : n;
  }
  findParent(t) {
    return this.findSingleValue(`${t}^`);
  }
  findBookId() {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }
  findChapterNode(t) {
    const r = `$..content[?(@.type=="chapter" && @.number=="${t}")]`;
    return this.findSingleValue(r);
  }
  // #endregion
  // #region Parent Maps
  static createParentMapInternal(t, r, n) {
    var u;
    n.set(t, r), t.content && n.set(t.content, t), (u = t.content) == null || u.forEach((i) => {
      typeof i == "object" && F.createParentMapInternal(i, t, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const t = /* @__PURE__ */ new Map();
    return this.usj.content && t.set(this.usj.content, this.usj), this.usj.content.forEach((r) => {
      typeof r == "object" && F.createParentMapInternal(r, this.usj, t);
    }), t;
  }
  /** Create the parent map if it doesn't already exist and return it */
  get parentMap() {
    return this.parentMapInternal ? this.parentMapInternal : (this.parentMapInternal = this.createUsjParentMap(), this.parentMapInternal);
  }
  // #endregion
  // #region Working Stacks
  /** Return the working stack applicable to the given node */
  createWorkingStack(t) {
    const r = [], { parentMap: n } = this;
    let u = t, i = n.get(u);
    for (; i !== void 0; ) {
      if (!i.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !i.content.find((a, o) => {
          if (a !== u) return !1;
          if (!i) throw new Error('undefined "tempParent" should not be possible');
          return r.unshift({ parent: i, index: o }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(u)}`);
      if (i.type === Gt) break;
      u = i, i = n.get(i);
    }
    return r;
  }
  static convertWorkingStackToJsonPath(t) {
    let r = "$";
    return t.forEach((n) => {
      r = `${r}.content[${n.index}]`;
    }), r;
  }
  convertJsonPathToWorkingStack(t) {
    const r = [], n = t.match(/content\[(\d+)\]/g);
    if (!n) throw new Error(`Malformed or unexpected jsonPath: ${t}`);
    let u = this.usj;
    return n.forEach((i, a) => {
      const o = /(\d+)/.exec(i);
      if (!o) throw new Error(`Malformed or unexpected jsonPath: ${t}`);
      const s = parseInt(o[0], 10);
      if (r.push({ parent: u, index: s }), a + 1 < n.length) {
        if (typeof u == "string" || !u.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(u)}`);
        const c = u.content[s];
        if (typeof c == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(c)}`);
        u = c;
      }
    }), r;
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
  static findRightMostDescendantMarkerObject(t, r, n = []) {
    if (!t.content) return { node: t, parent: r };
    for (let u = t.content.length - 1; u >= 0; u--) {
      const i = t.content[u];
      if (typeof i == "object" && !n.includes(i.type))
        return i.content ? this.findRightMostDescendantMarkerObject(i, t, n) : { node: i, parent: t };
    }
    return { node: t, parent: r };
  }
  static findNextMatchingNodeUsingWorkingStack(t, r, n, u) {
    var a;
    let i = t;
    for (; i !== void 0; ) {
      const o = typeof i == "object" && n.includes(i.type);
      if (!o && u(i, r)) return i;
      if (!o && typeof i == "object" && (((a = i.content) == null ? void 0 : a.length) ?? 0) > 0)
        r.push({ parent: i, index: 0 }), [i] = i.content;
      else
        for (i = void 0; r.length > 0; ) {
          const s = r.pop();
          if (s && s.index + 1 < s.parent.content.length) {
            s.index += 1, r.push(s), i = s.parent.content[s.index];
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
  findNextMatchingNode(t, r, n) {
    const u = this.createWorkingStack(t);
    return F.findNextMatchingNodeUsingWorkingStack(
      t,
      u,
      r,
      n
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(t) {
    return F.convertWorkingStackToJsonPath(this.createWorkingStack(t));
  }
  // #endregion
  // #region USJ + node -> VerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(t, r, n = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (n.verseNum !== void 0 && n.chapterNum !== void 0) return n;
    if (typeof t == "object" && t.number !== void 0) {
      const s = Number.parseInt(t.number, 10);
      if (t.type === Dt)
        return n.chapterNum = s, n.verseNum = n.verseNum ?? 0, n.startingContentNode = n.startingContentNode ?? t, n;
      t.type === vt && !n.verseNum && (n.verseNum = s, n.startingContentNode = t);
    }
    if (!r.content)
      throw new Error(`"content" array not found: ${JSON.stringify(r)}`);
    let u = 0;
    for (let s = 0; s < r.content.length; s++)
      if (r.content[s] === t) {
        u = s;
        break;
      }
    let i = u - 1;
    for (; i >= 0 && typeof r.content[i] != "object"; )
      i -= 1;
    if (i < 0) {
      if (r.type === Gt)
        return n.chapterNum === void 0 && (n.chapterNum = 1, n.verseNum = 0, n.startingContentNode = void 0), n;
      const s = r, c = this.parentMap.get(s);
      if (!c) throw new Error(`No parent found for ${JSON.stringify(r)}`);
      return this.findVerseRefForNode(s, c, n);
    }
    const a = r.content[i], o = F.findRightMostDescendantMarkerObject(
      a,
      r,
      ne
    );
    return this.findVerseRefForNode(o.node, o.parent, n);
  }
  nodeToVerseRefAndOffset(t, r, n) {
    if (typeof r == "string" && n === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let u;
    if (n === void 0 ? u = this.parentMap.get(r) : u = Array.isArray(n) ? this.parentMap.get(n) : n, u === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(n)}`);
    const i = this.findVerseRefForNode(r, u);
    if (!i) return;
    if (!i.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(r)}`);
    const a = new Wt(
      t,
      i.chapterNum.toString(),
      i.verseNum ? i.verseNum.toString() : "0"
    );
    let o = 0;
    return i.startingContentNode !== void 0 && this.findNextMatchingNode(i.startingContentNode, [], (s, c) => {
      var f, l;
      return s === r ? !0 : c.find((p) => ne.includes(p.parent.type)) ? !1 : typeof s == "string" ? (o += s.length, !1) : s.type === Dt && s.number !== ((f = i.chapterNum) == null ? void 0 : f.toString()) || s.type === vt && s.number !== ((l = i.verseNum) == null ? void 0 : l.toString()) ? (o = 0, !0) : !1;
    }), { verseRef: a, offset: o };
  }
  // #endregion
  // #region JSONPath -> VerseRef + offset
  jsonPathToVerseRefAndOffset(t, r) {
    const n = r ?? this.findBookId();
    if (!n) throw new Error("Not able to determine the book ID");
    const u = this.findSingleValue(t);
    if (!u) throw new Error(`No result found for JSONPath query: ${t}`);
    const i = this.findParent(t);
    if (!i) throw new Error(`Could not determine parent for ${t}`);
    const a = this.nodeToVerseRefAndOffset(n, u, i);
    if (!a)
      throw new Error(`Could not determine VerseRef that corresponds to ${t}`);
    return a;
  }
  // #endregion
  // #region VerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(t, r = 0) {
    if (r < 0) throw new Error("offset must be >= 0");
    const n = this.findBookId() ?? t.book;
    if (!n) throw new Error("Not able to determine the book ID");
    if (n !== t.book)
      throw new Error(`Book IDs don't match: USJ=${n}, VerseRef=${t.book}`);
    const u = this.findChapterNode(t.chapterNum);
    if (u === void 0)
      throw new Error(`Could not find ${n} chapter ${t.chapterNum}`);
    let i = !1, a = "";
    const o = t.verse, s = this.findNextMatchingNode(
      u,
      ne,
      (p, g) => p === u ? t.verseNum === 0 ? (a = F.convertWorkingStackToJsonPath(g), !0) : !1 : typeof p != "object" ? !1 : p.type === Dt ? (i = !0, !0) : p.type === vt && p.number !== void 0 && p.number === o ? (a = F.convertWorkingStackToJsonPath(g), !0) : !1
    );
    if (i || s === void 0 || typeof s == "string")
      throw new Error(`Verse ${o} not found in ${n} ${t.chapterNum}`);
    if (r === 0) return { node: s, offset: 0, jsonPath: a };
    let c = 0, f = 0, l;
    return this.findNextMatchingNode(
      s,
      ne,
      (p, g) => {
        if (p === s) return !1;
        if (typeof p == "string") {
          if (c += p.length, c > r)
            return a = F.convertWorkingStackToJsonPath(g), f = r - c + p.length, l = p, !0;
        } else if (p.type === Dt || p.type === vt) return !0;
        return !1;
      }
    ), { node: l ?? s, offset: f, jsonPath: a };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(t, r, n = 1e3) {
    let u = "", i = 0, a = 0, o = 0;
    if (F.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (l) => {
        if (typeof l != "string") return !1;
        i += l.length, u = `${u}${l}`;
        const p = u.indexOf(r);
        return p < 0 ? (a += u.length, u.length > r.length && (u = u.substring(u.length - r.length)), a -= u.length, i > n) : (o = a + p, !0);
      }
    ), o <= 0) return;
    i = 0;
    let s = 0, c = [];
    const f = F.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (l, p) => typeof l != "string" || (i += l.length, i < o + 1) ? !1 : (s = o - i + l.length, c = p, !0)
    );
    if (!f) throw new Error("Internal error: inconsistent search results");
    return {
      node: f,
      offset: s,
      jsonPath: F.convertWorkingStackToJsonPath(c)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(t, r) {
    let n = "", u = t.offset, i = 0;
    return F.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (a) => {
        if (typeof a != "string") return !1;
        if (u >= a.length)
          return u -= a.length, !1;
        let o = a;
        if (u > 0 && (o = o.substring(u), u = 0), i + o.length < r)
          return i += o.length, n = `${n}${o}`, !1;
        const s = r - i;
        return n = `${n}${o.substring(0, s - 1)}`, !0;
      }
    ), n;
  }
  extractTextBetweenPoints(t, r, n = 100) {
    let u = "";
    return F.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (i, a) => i === r.node && (typeof i == "object" || r.jsonPath === F.convertWorkingStackToJsonPath(a)) ? !0 : typeof i != "string" ? !1 : (u = `${u}${i}`, u.length > n && (u = u.substring(0, n)), u.length >= n)
    ), u;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(t, r) {
    let n = 0;
    for (let u = t.length - 1; u >= 0; u--) {
      const i = t[u];
      r(i) ? (t.splice(u, 1), n += 1) : typeof i != "string" && i.content && (n += this.removeContentNodesFromArray(i.content, r));
    }
    return n;
  }
  removeContentNodes(t) {
    const r = F.removeContentNodesFromArray(this.usj.content, t);
    return this.usjChanged(), r;
  }
  // #endregion
}
export {
  ja as AsyncVariable,
  Dt as CHAPTER_TYPE,
  Ua as Collator,
  lu as DateTimeFormat,
  mu as DocumentCombiner,
  qo as FIRST_SCR_BOOK_NUM,
  jo as FIRST_SCR_CHAPTER_NUM,
  Uo as FIRST_SCR_VERSE_NUM,
  $o as LAST_SCR_BOOK_NUM,
  gu as Mutex,
  Ka as MutexMap,
  Wa as NonValidatingDocumentCombiner,
  Du as NumberFormat,
  fu as PlatformEventEmitter,
  Qa as PromiseChainingMap,
  Za as UnsubscriberAsyncList,
  F as UsjReaderWriter,
  vt as VERSE_TYPE,
  Ns as aggregateUnsubscriberAsyncs,
  As as aggregateUnsubscribers,
  vs as areUsjContentsEqualExceptWhitespace,
  gt as at,
  Re as charAt,
  ts as codePointAt,
  Es as compareScrRefs,
  Ya as createSyncProxyForAsyncObject,
  Ha as debounce,
  Ye as deepClone,
  Ia as deepEqual,
  fs as defaultScrRef,
  Ba as deserialize,
  Bo as endsWith,
  Qn as ensureArray,
  ss as escapeStringRegexp,
  Ts as formatBytes,
  rs as formatReplacementString,
  Mo as formatReplacementStringToArray,
  Ds as formatScrRef,
  ws as formatTimeSpan,
  Xa as getAllObjectFunctionNames,
  Vo as getChaptersForBook,
  Cs as getCurrentLocale,
  za as getErrorMessage,
  Ho as getLocalizeKeyForScrollGroupId,
  gs as getLocalizeKeysForScrollGroupIds,
  ms as getLocalizedIdFromBookNumber,
  Ga as groupBy,
  ys as htmlEncode,
  _o as includes,
  ot as indexOf,
  as as isLocalizeKey,
  bs as isSerializable,
  ae as isString,
  Ra as isSubset,
  Oe as isWhiteSpace,
  Po as lastIndexOf,
  La as localizedStringsDocumentSchema,
  Fa as menuDocumentSchema,
  Va as newGuid,
  ns as normalize,
  Gr as normalizeScriptureSpaces,
  ps as offsetBook,
  hs as offsetChapter,
  ds as offsetVerse,
  us as ordinalCompare,
  is as padEnd,
  os as padStart,
  _a as projectSettingsDocumentSchema,
  Vr as scrRefToBBBCCCVVV,
  rn as serialize,
  Pa as settingsDocumentSchema,
  jr as slice,
  Ur as split,
  Zn as startsWith,
  P as stringLength,
  de as substring,
  Lo as toArray,
  ls as transformAndEnsureRegExpArray,
  cs as transformAndEnsureRegExpRegExpArray,
  du as wait,
  Ja as waitForDuration
};
//# sourceMappingURL=index.js.map
