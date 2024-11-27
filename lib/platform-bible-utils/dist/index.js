var Wn = Object.defineProperty;
var Qn = (e, t, r) => t in e ? Wn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var S = (e, t, r) => Qn(e, typeof t != "symbol" ? t + "" : t, r);
import { Mutex as Zn } from "async-mutex";
import { JSONPath as lr } from "jsonpath-plus";
class ha {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(t, r = 1e4) {
    S(this, "variableName");
    S(this, "promiseToValue");
    S(this, "resolver");
    S(this, "rejecter");
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
class da {
  constructor(t, r) {
    S(this, "collator");
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
class eu {
  constructor(t, r) {
    S(this, "dateTimeFormatter");
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
class tu {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    S(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    S(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    S(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    S(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    S(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    S(this, "emit", (t) => {
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
function ma() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function Dt(e) {
  return typeof e == "string" || e instanceof String;
}
function Je(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ea(e, t = 300) {
  if (Dt(e)) throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...n) => {
    clearTimeout(r), r = setTimeout(() => e(...n), t);
  };
}
function ga(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((u) => {
    const i = t(u), a = n.get(i), o = r ? r(u, i) : u;
    a ? a.push(o) : n.set(i, [o]);
  }), n;
}
function ru(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function nu(e) {
  if (ru(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function Da(e) {
  return nu(e).message;
}
function uu(e) {
  return new Promise((t) => setTimeout(t, e));
}
function va(e, t) {
  const r = uu(t).then(() => {
  });
  return Promise.any([r, e()]);
}
function Aa(e, t = "obj") {
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
function Na(e, t = {}) {
  return new Proxy(t, {
    get(r, n) {
      return n in r ? r[n] : async (...u) => (await e())[n](...u);
    }
  });
}
class iu {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(t, r) {
    S(this, "baseDocument");
    S(this, "contributions", /* @__PURE__ */ new Map());
    S(this, "latestOutput");
    S(this, "options");
    S(this, "onDidRebuildEmitter", new tu());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    S(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = t, this.options = r, this.updateBaseDocument(t);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(t) {
    return this.validateBaseDocument(t), this.baseDocument = this.options.copyDocuments ? Je(t) : t, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * Note: the order in which contribution documents are added can be considered to be indeterminate
   * as it is currently ordered by however `Map.forEach` provides the contributions. The order
   * matters when merging two arrays into one. Also, when `options.ignoreDuplicateProperties` is
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
    let u = this.options.copyDocuments && r ? Je(r) : r;
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
      let r = Je(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let t = this.baseDocument;
    return this.contributions.forEach((r) => {
      t = ou(
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
function fr(...e) {
  let t = !0;
  return e.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (t = !1);
  }), t;
}
function pr(...e) {
  let t = !0;
  return e.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (t = !1);
  }), t;
}
function ou(e, t, r) {
  const n = Je(e);
  return t ? Yr(n, Je(t), r) : n;
}
function Yr(e, t, r) {
  if (!t) return e;
  if (fr(e, t)) {
    const n = e, u = t;
    Object.keys(u).forEach((i) => {
      if (Object.hasOwn(n, i)) {
        if (fr(n[i], u[i]))
          n[i] = Yr(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            n[i],
            u[i],
            r
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (pr(n[i], u[i]))
          n[i] = n[i].concat(
            u[i]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${i}" already exists in the target object`);
      } else
        n[i] = u[i];
    });
  } else pr(e, t) && e.push(...t);
  return e;
}
class au extends Zn {
}
class ba {
  constructor() {
    S(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(t) {
    let r = this.mutexesByID.get(t);
    return r || (r = new au(), this.mutexesByID.set(t, r), r);
  }
}
class ya extends iu {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(t, r) {
    super(t, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class su {
  constructor(t, r) {
    S(this, "numberFormatter");
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
class Ca {
  constructor(t = "Anonymous") {
    S(this, "unsubscribers", /* @__PURE__ */ new Set());
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
var cu = Object.defineProperty, lu = (e, t, r) => t in e ? cu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, D = (e, t, r) => lu(e, typeof t != "symbol" ? t + "" : t, r);
const de = [
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
], Ht = [
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
], Kr = [
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
], hr = Au();
function Re(e, t = !0) {
  return t && (e = e.toUpperCase()), e in hr ? hr[e] : 0;
}
function Gt(e) {
  return Re(e) > 0;
}
function fu(e) {
  const t = typeof e == "string" ? Re(e) : e;
  return t >= 40 && t <= 66;
}
function pu(e) {
  return (typeof e == "string" ? Re(e) : e) <= 39;
}
function Wr(e) {
  return e <= 66;
}
function hu(e) {
  const t = typeof e == "string" ? Re(e) : e;
  return en(t) && !Wr(t);
}
function* du() {
  for (let e = 1; e <= de.length; e++) yield e;
}
const mu = 1, Qr = de.length;
function Eu() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function zt(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= de.length ? t : de[r];
}
function Zr(e) {
  return e <= 0 || e > Qr ? "******" : Kr[e - 1];
}
function gu(e) {
  return Zr(Re(e));
}
function en(e) {
  const t = typeof e == "number" ? zt(e) : e;
  return Gt(t) && !Ht.includes(t);
}
function Du(e) {
  const t = typeof e == "number" ? zt(e) : e;
  return Gt(t) && Ht.includes(t);
}
function vu(e) {
  return Kr[e - 1].includes("*obsolete*");
}
function Au() {
  const e = {};
  for (let t = 0; t < de.length; t++)
    e[de[t]] = t + 1;
  return e;
}
const W = {
  allBookIds: de,
  nonCanonicalIds: Ht,
  bookIdToNumber: Re,
  isBookIdValid: Gt,
  isBookNT: fu,
  isBookOT: pu,
  isBookOTNT: Wr,
  isBookDC: hu,
  allBookNumbers: du,
  firstBook: mu,
  lastBook: Qr,
  extraBooks: Eu,
  bookNumberToId: zt,
  bookNumberToEnglishName: Zr,
  bookIdToEnglishName: gu,
  isCanonical: en,
  isExtraMaterial: Du,
  isObsolete: vu
};
var Z = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Z || {});
const G = class {
  // private versInfo: Versification;
  constructor(t) {
    if (D(this, "name"), D(this, "fullPath"), D(this, "isPresent"), D(this, "hasVerseSegments"), D(this, "isCustomized"), D(this, "baseVersification"), D(this, "scriptureBooks"), D(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Z[t]) : (this._type = t, this.name = Z[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
D(G, "Original", new G(Z.Original)), D(G, "Septuagint", new G(Z.Septuagint)), D(G, "Vulgate", new G(Z.Vulgate)), D(G, "English", new G(Z.English)), D(G, "RussianProtestant", new G(Z.RussianProtestant)), D(G, "RussianOrthodox", new G(Z.RussianOrthodox));
let oe = G;
function dr(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var tn = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(tn || {});
const k = class N {
  constructor(t, r, n, u) {
    if (D(this, "firstChapter"), D(this, "lastChapter"), D(this, "lastVerse"), D(this, "hasSegmentsDefined"), D(this, "text"), D(this, "BBBCCCVVVS"), D(this, "longHashCode"), D(this, "versification"), D(this, "rtlMark", "‏"), D(this, "_bookNum", 0), D(this, "_chapterNum", 0), D(this, "_verseNum", 0), D(this, "_verse"), n == null && u == null)
      if (t != null && typeof t == "string") {
        const i = t, a = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(i), this._verseNum = t % N.chapterDigitShifter, this._chapterNum = Math.floor(
          t % N.bookDigitShifter / N.chapterDigitShifter
        ), this._bookNum = Math.floor(t / N.bookDigitShifter);
      } else if (r == null)
        if (t != null && t instanceof N) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null) return;
          const i = t instanceof oe ? t : N.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && r != null && n != null)
      if (typeof t == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(u), this.updateInternal(t, r, n);
      else if (typeof t == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = t, this._chapterNum = r, this._verseNum = n, this.versification = u ?? N.defaultVersification;
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
      return r = new N(t), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof je)
        return r = new N(), { success: !1, verseRef: r };
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
    return t % N.bcvMaxValue * N.bookDigitShifter + (r >= 0 ? r % N.bcvMaxValue * N.chapterDigitShifter : 0) + (n >= 0 ? n % N.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: r, chapterNum: n, verseNum: u, verse: i, versificationStr: a } = t, o = i || u.toString();
    let s;
    return a && (s = new oe(a)), r ? new N(r, n.toString(), o, s) : new N();
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
      if (r = r * 10 + +n - 0, r > N.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(N.verseRangeSeparator) || this._verse.includes(N.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return W.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = W.bookIdToNumber(t);
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
    const { success: r, vNum: n } = N.tryGetVerseNum(t);
    this._verse = r ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = N.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > W.lastBook)
      throw new je(
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
    return this.validateVerse(N.verseRangeSeparators, N.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return N.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return N.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new oe(Z[a]);
        } catch {
          throw new je("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new je("Invalid reference : " + t);
    const n = r[1].split(":"), u = +n[0];
    if (n.length !== 2 || W.bookIdToNumber(r[0]) === 0 || !Number.isInteger(u) || u < 0 || !N.isVerseParseable(n[1]))
      throw new je("Invalid reference : " + t);
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
    return new N(this);
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
    return t instanceof N ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, r = N.verseRangeSeparators, n = N.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const u = [], i = dr(this._verse, n);
    for (const a of i.map((o) => dr(o, r))) {
      const o = this.clone();
      o.verse = a[0];
      const s = o.verseNum;
      if (u.push(o), a.length > 1) {
        const c = this.clone();
        if (c.verse = a[1], !t)
          for (let l = s + 1; l < c.verseNum; l++) {
            const f = new N(
              this._bookNum,
              this._chapterNum,
              l,
              this.versification
            );
            this.isExcluded || u.push(f);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > W.lastBook ? 2 : (W.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = N.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = W.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
D(k, "defaultVersification", oe.English), D(k, "verseRangeSeparator", "-"), D(k, "verseSequenceIndicator", ","), D(k, "verseRangeSeparators", [k.verseRangeSeparator]), D(k, "verseSequenceIndicators", [k.verseSequenceIndicator]), D(k, "chapterDigitShifter", 1e3), D(k, "bookDigitShifter", k.chapterDigitShifter * k.chapterDigitShifter), D(k, "bcvMaxValue", k.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
D(k, "ValidStatusType", tn);
let Jt = k;
class je extends Error {
}
var mr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, De = {}, Nu = () => {
  const e = "\\ud800-\\udfff", a = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", o = "\\ufe0e\\ufe0f", s = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", c = `[${e}]`, l = `[${a}]`, f = "\\ud83c[\\udffb-\\udfff]", p = `(?:${l}|${f})`, m = `[^${e}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", T = "[\\ud800-\\udbff][\\udc00-\\udfff]", w = "\\u200d", I = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", re = `[${s}]`, B = `${p}?`, K = `[${o}]?`, U = `(?:${w}(?:${[m, b, T].join("|")})${K + B})*`, qe = K + B + U, Mt = `(?:${[`${m}${l}?`, l, b, T, c, re].join("|")})`;
  return new RegExp(`${I}|${f}(?=${f})|${Mt + qe}`, "g");
}, bu = mr && mr.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(De, "__esModule", { value: !0 });
var Nt = bu(Nu);
function jt(e) {
  if (typeof e != "string")
    throw new Error("A string is expected as input");
  return e.match(Nt.default()) || [];
}
var yu = De.toArray = jt;
function Xt(e) {
  if (typeof e != "string")
    throw new Error("Input must be a string");
  var t = e.match(Nt.default());
  return t === null ? 0 : t.length;
}
var Cu = De.length = Xt;
function rn(e, t, r) {
  if (t === void 0 && (t = 0), typeof e != "string")
    throw new Error("Input must be a string");
  (typeof t != "number" || t < 0) && (t = 0), typeof r == "number" && r < 0 && (r = 0);
  var n = e.match(Nt.default());
  return n ? n.slice(t, r).join("") : "";
}
var Tu = De.substring = rn;
function wu(e, t, r) {
  if (t === void 0 && (t = 0), typeof e != "string")
    throw new Error("Input must be a string");
  var n = Xt(e);
  if (typeof t != "number" && (t = parseInt(t, 10)), t >= n)
    return "";
  t < 0 && (t += n);
  var u;
  typeof r > "u" ? u = n : (typeof r != "number" && (r = parseInt(r, 10)), u = r >= 0 ? r + t : t);
  var i = e.match(Nt.default());
  return i ? i.slice(t, u).join("") : "";
}
var Su = De.substr = wu;
function Ou(e, t, r, n) {
  if (t === void 0 && (t = 16), r === void 0 && (r = "#"), n === void 0 && (n = "right"), typeof e != "string" || typeof t != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(n) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var u = Xt(e);
  if (u > t)
    return rn(e, 0, t);
  if (u < t) {
    var i = r.repeat(t - u);
    return n === "left" ? i + e : e + i;
  }
  return e;
}
var nn = De.limit = Ou;
function Iu(e, t, r) {
  if (r === void 0 && (r = 0), typeof e != "string")
    throw new Error("Input must be a string");
  if (e === "")
    return t === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, t = String(t);
  var n = jt(e);
  if (r >= n.length)
    return t === "" ? n.length : -1;
  if (t === "")
    return r;
  var u = jt(t), i = !1, a;
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
var Bu = De.indexOf = Iu;
function un(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function wa(e, t) {
  if (!(t > F(e) || t < -F(e)))
    return bt(e, t, 1);
}
function Se(e, t) {
  return t < 0 || t > F(e) - 1 ? "" : bt(e, t, 1);
}
function Sa(e, t) {
  if (!(t < 0 || t > F(e) - 1))
    return bt(e, t, 1).codePointAt(0);
}
function xu(e, t, r = F(e)) {
  const n = Fu(e, t);
  return !(n === -1 || n + F(t) !== r);
}
function Ru(e, t, r) {
  if (t < 0) return -1;
  if (r) {
    if (Se(e, t) === "}" && Se(e, t - 1) === "\\") return t;
    const i = Ye(e, "\\}", t);
    return i >= 0 ? i + 1 : i;
  }
  let n = t;
  const u = F(e);
  for (; n < u && (n = Ye(e, "}", n), !(n === -1 || Se(e, n - 1) !== "\\")); )
    n += 1;
  return n >= u ? -1 : n;
}
function Mu(e, t) {
  const r = [];
  let n = 0, u = 0;
  function i(o, s, c) {
    const l = pe(e, u, s), f = r.length > 0 && Dt(r[r.length - 1]) ? `${r.pop()}${l}` : l;
    Dt(o) ? r.push(`${f}${o}`) : (f && r.push(f), r.push(o)), u = s + c;
  }
  const a = F(e);
  for (; n < a; ) {
    switch (Se(e, n)) {
      case "{":
        if (Se(e, n - 1) !== "\\") {
          const o = Ru(e, n, !1);
          if (o >= 0) {
            const s = pe(e, n + 1, o), c = s in t ? (
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
        Se(e, n - 1) !== "\\" || i("}", n - 1, 2);
        break;
    }
    n += 1;
  }
  if (u < a) {
    const o = pe(e, u);
    r.push(
      r.length > 0 && Dt(r[r.length - 1]) ? `${r.pop()}${o}` : o
    );
  }
  return r;
}
function Oa(e, t) {
  return Mu(e, t).map((r) => `${r}`).join("");
}
function _u(e, t, r = 0) {
  const n = pe(e, r);
  return Ye(n, t) !== -1;
}
function Ye(e, t, r = 0) {
  return Bu(e, t, r);
}
function Fu(e, t, r) {
  let n = r === void 0 ? F(e) : r;
  n < 0 ? n = 0 : n >= F(e) && (n = F(e) - 1);
  for (let u = n; u >= 0; u--)
    if (bt(e, u, F(t)) === t)
      return u;
  return -1;
}
function F(e) {
  return Cu(e);
}
function Ia(e, t) {
  const r = t.toUpperCase();
  return r === "NONE" ? e : e.normalize(r);
}
function Ba(e, t, r) {
  return e.localeCompare(t, "en", r);
}
function xa(e, t, r = " ") {
  return t <= F(e) ? e : nn(e, t, r, "right");
}
function Ra(e, t, r = " ") {
  return t <= F(e) ? e : nn(e, t, r, "left");
}
function Er(e, t) {
  return t > e ? e : t < -e ? 0 : t < 0 ? t + e : t;
}
function Ma(e, t, r) {
  const n = F(e);
  if (t > n || r && (t > r && !(t >= 0 && t < n && r < 0 && r > -n) || r < -n))
    return "";
  const u = Er(n, t), i = r ? Er(n, r) : void 0;
  return pe(e, u, i);
}
function gr(e, t, r) {
  const n = [];
  if (r !== void 0 && r <= 0)
    return [e];
  if (t === "") return Lu(e).slice(0, r);
  let u = t;
  (typeof t == "string" || t instanceof RegExp && !_u(t.flags, "g")) && (u = new RegExp(t, "g"));
  const i = e.match(u);
  let a = 0;
  if (!i) return [e];
  for (let o = 0; o < (r ? r - 1 : i.length); o++) {
    const s = Ye(e, i[o], a), c = F(i[o]);
    if (n.push(pe(e, a, s)), a = s + c, r !== void 0 && n.length === r)
      break;
  }
  return n.push(pe(e, a)), n;
}
function on(e, t, r = 0) {
  return Ye(e, t, r) === r;
}
function bt(e, t = 0, r = F(e) - t) {
  return Su(e, t, r);
}
function pe(e, t, r = F(e)) {
  return Tu(e, t, r);
}
function Lu(e) {
  return yu(e);
}
function _a(e) {
  return on(e, "%") && xu(e, "%");
}
function Fa(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function La(e) {
  return e ? un(e).map(
    (n) => Array.isArray(n) ? n.map((u) => new RegExp(u)) : new RegExp(n)
  ) : [];
}
function ka(e) {
  return e ? un(e).map((n) => new RegExp(n)) : [];
}
const an = [
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
], ku = 1, Pu = an.length - 1, qu = 1, $u = 1, Pa = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1
}, ju = (e) => {
  var t;
  return ((t = an[e]) == null ? void 0 : t.chapters) ?? -1;
}, qa = (e, t) => ({
  bookNum: Math.max(ku, Math.min(e.bookNum + t, Pu)),
  chapterNum: 1,
  verseNum: 1
}), $a = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(qu, e.chapterNum + t),
    ju(e.bookNum)
  ),
  verseNum: 1
}), ja = (e, t) => ({
  ...e,
  verseNum: Math.max($u, e.verseNum + t)
});
async function Ua(e, t, r) {
  const n = W.bookNumberToId(e);
  if (!on(Intl.getCanonicalLocales(t)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${n}`,
      languagesToSearch: [t]
    });
  const u = await r({
    localizeKey: `Book.${n}`,
    languagesToSearch: [t]
  }), i = gr(u, "-");
  return gr(i[0], "ÿ08")[0].trim();
}
function Dr(e) {
  return new Jt(e.bookNum, e.chapterNum, e.verseNum).BBBCCCVVV;
}
function Va(e, t) {
  return Dr(e) - Dr(t);
}
function Uu(e) {
  return `%scrollGroup_${e}%`;
}
function Ha(e) {
  return e.map((t) => Uu(t));
}
function Ga(e, t, r, n) {
  let u;
  switch (t ?? "id") {
    case "English":
      u = W.bookNumberToEnglishName(e.bookNum);
      break;
    case "id":
      u = W.bookNumberToId(e.bookNum);
      break;
    default:
      u = t ?? "";
      break;
  }
  return `${u}${n ?? " "}${e.chapterNum}${r ?? ":"}${e.verseNum}`;
}
const za = (e) => (...t) => e.map((n) => n(...t)).every((n) => n), Ja = (e) => async (...t) => {
  const r = e.map(async (n) => n(...t));
  return (await Promise.all(r)).every((n) => n);
}, pt = "chapter", ht = "verse";
var Vu = Object.getOwnPropertyNames, Hu = Object.getOwnPropertySymbols, Gu = Object.prototype.hasOwnProperty;
function vr(e, t) {
  return function(n, u, i) {
    return e(n, u, i) && t(n, u, i);
  };
}
function dt(e) {
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
function Ar(e) {
  return Vu(e).concat(Hu(e));
}
var sn = Object.hasOwn || function(e, t) {
  return Gu.call(e, t);
};
function Me(e, t) {
  return e || t ? e === t : e === t || e !== e && t !== t;
}
var cn = "_owner", Nr = Object.getOwnPropertyDescriptor, br = Object.keys;
function zu(e, t, r) {
  var n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function Ju(e, t) {
  return Me(e.getTime(), t.getTime());
}
function yr(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var n = {}, u = e.entries(), i = 0, a, o; (a = u.next()) && !a.done; ) {
    for (var s = t.entries(), c = !1, l = 0; (o = s.next()) && !o.done; ) {
      var f = a.value, p = f[0], m = f[1], b = o.value, T = b[0], w = b[1];
      !c && !n[l] && (c = r.equals(p, T, i, l, e, t, r) && r.equals(m, w, p, T, e, t, r)) && (n[l] = !0), l++;
    }
    if (!c)
      return !1;
    i++;
  }
  return !0;
}
function Xu(e, t, r) {
  var n = br(e), u = n.length;
  if (br(t).length !== u)
    return !1;
  for (var i; u-- > 0; )
    if (i = n[u], i === cn && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !sn(t, i) || !r.equals(e[i], t[i], i, i, e, t, r))
      return !1;
  return !0;
}
function Ue(e, t, r) {
  var n = Ar(e), u = n.length;
  if (Ar(t).length !== u)
    return !1;
  for (var i, a, o; u-- > 0; )
    if (i = n[u], i === cn && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !sn(t, i) || !r.equals(e[i], t[i], i, i, e, t, r) || (a = Nr(e, i), o = Nr(t, i), (a || o) && (!a || !o || a.configurable !== o.configurable || a.enumerable !== o.enumerable || a.writable !== o.writable)))
      return !1;
  return !0;
}
function Yu(e, t) {
  return Me(e.valueOf(), t.valueOf());
}
function Ku(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function Cr(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var n = {}, u = e.values(), i, a; (i = u.next()) && !i.done; ) {
    for (var o = t.values(), s = !1, c = 0; (a = o.next()) && !a.done; )
      !s && !n[c] && (s = r.equals(i.value, a.value, i.value, a.value, e, t, r)) && (n[c] = !0), c++;
    if (!s)
      return !1;
  }
  return !0;
}
function Wu(e, t) {
  var r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Qu = "[object Arguments]", Zu = "[object Boolean]", ei = "[object Date]", ti = "[object Map]", ri = "[object Number]", ni = "[object Object]", ui = "[object RegExp]", ii = "[object Set]", oi = "[object String]", ai = Array.isArray, Tr = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, wr = Object.assign, si = Object.prototype.toString.call.bind(Object.prototype.toString);
function ci(e) {
  var t = e.areArraysEqual, r = e.areDatesEqual, n = e.areMapsEqual, u = e.areObjectsEqual, i = e.arePrimitiveWrappersEqual, a = e.areRegExpsEqual, o = e.areSetsEqual, s = e.areTypedArraysEqual;
  return function(l, f, p) {
    if (l === f)
      return !0;
    if (l == null || f == null || typeof l != "object" || typeof f != "object")
      return l !== l && f !== f;
    var m = l.constructor;
    if (m !== f.constructor)
      return !1;
    if (m === Object)
      return u(l, f, p);
    if (ai(l))
      return t(l, f, p);
    if (Tr != null && Tr(l))
      return s(l, f, p);
    if (m === Date)
      return r(l, f, p);
    if (m === RegExp)
      return a(l, f, p);
    if (m === Map)
      return n(l, f, p);
    if (m === Set)
      return o(l, f, p);
    var b = si(l);
    return b === ei ? r(l, f, p) : b === ui ? a(l, f, p) : b === ti ? n(l, f, p) : b === ii ? o(l, f, p) : b === ni ? typeof l.then != "function" && typeof f.then != "function" && u(l, f, p) : b === Qu ? u(l, f, p) : b === Zu || b === ri || b === oi ? i(l, f, p) : !1;
  };
}
function li(e) {
  var t = e.circular, r = e.createCustomConfig, n = e.strict, u = {
    areArraysEqual: n ? Ue : zu,
    areDatesEqual: Ju,
    areMapsEqual: n ? vr(yr, Ue) : yr,
    areObjectsEqual: n ? Ue : Xu,
    arePrimitiveWrappersEqual: Yu,
    areRegExpsEqual: Ku,
    areSetsEqual: n ? vr(Cr, Ue) : Cr,
    areTypedArraysEqual: n ? Ue : Wu
  };
  if (r && (u = wr({}, u, r(u))), t) {
    var i = dt(u.areArraysEqual), a = dt(u.areMapsEqual), o = dt(u.areObjectsEqual), s = dt(u.areSetsEqual);
    u = wr({}, u, {
      areArraysEqual: i,
      areMapsEqual: a,
      areObjectsEqual: o,
      areSetsEqual: s
    });
  }
  return u;
}
function fi(e) {
  return function(t, r, n, u, i, a, o) {
    return e(t, r, o);
  };
}
function pi(e) {
  var t = e.circular, r = e.comparator, n = e.createState, u = e.equals, i = e.strict;
  if (n)
    return function(s, c) {
      var l = n(), f = l.cache, p = f === void 0 ? t ? /* @__PURE__ */ new WeakMap() : void 0 : f, m = l.meta;
      return r(s, c, {
        cache: p,
        equals: u,
        meta: m,
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
var hi = fe();
fe({ strict: !0 });
fe({ circular: !0 });
fe({
  circular: !0,
  strict: !0
});
fe({
  createInternalComparator: function() {
    return Me;
  }
});
fe({
  strict: !0,
  createInternalComparator: function() {
    return Me;
  }
});
fe({
  circular: !0,
  createInternalComparator: function() {
    return Me;
  }
});
fe({
  circular: !0,
  createInternalComparator: function() {
    return Me;
  },
  strict: !0
});
function fe(e) {
  e === void 0 && (e = {});
  var t = e.circular, r = t === void 0 ? !1 : t, n = e.createInternalComparator, u = e.createState, i = e.strict, a = i === void 0 ? !1 : i, o = li(e), s = ci(o), c = n ? n(s) : fi(s);
  return pi({ circular: r, comparator: s, createState: u, equals: c, strict: a });
}
function di(e, t) {
  return hi(e, t);
}
function mi(e, t) {
  if (typeof e != typeof t) return !1;
  if (!e && !t) return !0;
  if (Array.isArray(e)) {
    const i = t, a = e;
    return i.length === 0 ? !0 : i.every((o) => a.includes(o));
  }
  if (typeof e != "object")
    return di(e, t);
  const r = t, n = e;
  let u = !0;
  return Object.keys(r).forEach((i) => {
    u && (Object.hasOwn(n, i) && mi(n[i], r[i]) || (u = !1));
  }), u;
}
function Sr(e, t, r) {
  return JSON.stringify(e, (u, i) => {
    let a = i;
    return t && (a = t(u, a)), a === void 0 && (a = null), a;
  }, r);
}
function Ei(e, t) {
  function r(a) {
    return Object.keys(a).forEach((o) => {
      a[o] === null ? a[o] = void 0 : typeof a[o] == "object" && (a[o] = r(a[o]));
    }), a;
  }
  function n(a, o) {
    if (o && typeof o == "object" && "book" in o && typeof o.book == "string" && "chapterNum" in o && typeof o.chapterNum == "number" && "verseNum" in o && typeof o.verseNum == "number" && Object.keys(o).every(
      (s) => ["book", "chapterNum", "verseNum", "verse", "versificationStr"].includes(s)
    )) {
      const s = o.chapterNum.toString(10), c = "verse" in o && typeof o.verse == "string" ? o.verse : o.verseNum.toString(10), l = "versificationStr" in o && typeof o.versificationStr == "string" ? new oe(o.versificationStr) : void 0;
      return new Jt(o.book, s, c, l);
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
function Xa(e) {
  try {
    const t = Sr(e);
    return t === Sr(Ei(t));
  } catch {
    return !1;
  }
}
const Ya = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Ka() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new eu().resolvedOptions().locale;
}
function Wa(e, t = 2) {
  if (e === 0) return "0 Bytes";
  const r = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], n = Math.floor(Math.log(e) / Math.log(1024)), u = r[n];
  return `${new su("en", {
    style: "decimal",
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  }).format(e / 1024 ** n)} ${u}`;
}
const Yt = {
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
function Kt(e) {
  e && Object.values(e).forEach((t) => {
    if (t.type) {
      if ("tsType" in t && delete t.tsType, t.type === "any") {
        delete t.type;
        return;
      }
      t.type === "object" && Kt(t.properties);
    }
  });
}
Kt(Yt);
const gi = {
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
  $defs: Yt
};
Object.freeze(gi);
const Di = {
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
  $defs: Yt
};
Object.freeze(Di);
const ln = {
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
Kt(ln);
const vi = {
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
  $defs: ln
};
Object.freeze(vi);
const Ai = {
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
Object.freeze(Ai);
var x = {};
function Ni(e, t, r) {
  if (r === void 0 && (r = Array.prototype), e && typeof r.find == "function")
    return r.find.call(e, t);
  for (var n = 0; n < e.length; n++)
    if (ve(e, n)) {
      var u = e[n];
      if (t.call(void 0, u, n, e))
        return u;
    }
}
function _e(e, t) {
  return t === void 0 && (t = Object), t && typeof t.getOwnPropertyDescriptors == "function" && (e = t.create(null, t.getOwnPropertyDescriptors(e))), t && typeof t.freeze == "function" ? t.freeze(e) : e;
}
function ve(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function bi(e, t) {
  if (e === null || typeof e != "object")
    throw new TypeError("target is not an object");
  for (var r in t)
    ve(t, r) && (e[r] = t[r]);
  return e;
}
var fn = _e({
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
function yi(e) {
  return ve(fn, e.toLowerCase());
}
var pn = _e({
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
function Ci(e) {
  return ve(pn, e.toLowerCase());
}
var Ke = _e({
  script: !1,
  style: !1,
  textarea: !0,
  title: !0
});
function Ti(e) {
  var t = e.toLowerCase();
  return ve(Ke, t) && !Ke[t];
}
function wi(e) {
  var t = e.toLowerCase();
  return ve(Ke, t) && Ke[t];
}
function hn(e) {
  return e === We.HTML;
}
function Si(e) {
  return hn(e) || e === We.XML_XHTML_APPLICATION;
}
var We = _e({
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
}), Oi = Object.keys(We).map(function(e) {
  return We[e];
});
function Ii(e) {
  return Oi.indexOf(e) > -1;
}
var Bi = _e({
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
x.assign = bi;
x.find = Ni;
x.freeze = _e;
x.HTML_BOOLEAN_ATTRIBUTES = fn;
x.HTML_RAW_TEXT_ELEMENTS = Ke;
x.HTML_VOID_ELEMENTS = pn;
x.hasDefaultHTMLNamespace = Si;
x.hasOwn = ve;
x.isHTMLBooleanAttribute = yi;
x.isHTMLRawTextElement = Ti;
x.isHTMLEscapableRawTextElement = wi;
x.isHTMLMimeType = hn;
x.isHTMLVoidElement = Ci;
x.isValidMimeType = Ii;
x.MIME_TYPE = We;
x.NAMESPACE = Bi;
var Ae = {}, xi = x;
function dn(e, t) {
  e.prototype = Object.create(Error.prototype, {
    constructor: { value: e },
    name: { value: e.name, enumerable: !0, writable: t }
  });
}
var Qe = xi.freeze({
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
}), mn = Object.keys(Qe);
function En(e) {
  return typeof e == "number" && e >= 1 && e <= 25;
}
function Ri(e) {
  return typeof e == "string" && e.substring(e.length - Qe.Error.length) === Qe.Error;
}
function it(e, t) {
  En(e) ? (this.name = mn[e], this.message = t || "") : (this.message = e, this.name = Ri(t) ? t : Qe.Error), Error.captureStackTrace && Error.captureStackTrace(this, it);
}
dn(it, !0);
Object.defineProperties(it.prototype, {
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
}, Pt = Object.entries(gn);
for (var mt = 0; mt < Pt.length; mt++) {
  var Mi = Pt[mt][0];
  it[Mi] = Pt[mt][1];
}
function Wt(e, t) {
  this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, Wt);
}
dn(Wt);
Ae.DOMException = it;
Ae.DOMExceptionName = Qe;
Ae.ExceptionCode = gn;
Ae.ParseError = Wt;
var R = {}, E = {};
function Dn(e) {
  try {
    typeof e != "function" && (e = RegExp);
    var t = new e("𝌆", "u").exec("𝌆");
    return !!t && t[0].length === 2;
  } catch {
  }
  return !1;
}
var ot = Dn();
function me(e) {
  if (e.source[0] !== "[")
    throw new Error(e + " can not be used with chars");
  return e.source.slice(1, e.source.lastIndexOf("]"));
}
function Oe(e, t) {
  if (e.source[0] !== "[")
    throw new Error("/" + e.source + "/ can not be used with chars_without");
  if (!t || typeof t != "string")
    throw new Error(JSON.stringify(t) + " is not a valid search");
  if (e.source.indexOf(t) === -1)
    throw new Error('"' + t + '" is not is /' + e.source + "/");
  if (t === "-" && e.source.indexOf(t) !== 1)
    throw new Error('"' + t + '" is not at the first postion of /' + e.source + "/");
  return new RegExp(e.source.replace(t, ""), ot ? "u" : "");
}
function g(e) {
  var t = this;
  return new RegExp(
    Array.prototype.slice.call(arguments).map(function(r) {
      var n = typeof r == "string";
      if (n && t === void 0 && r === "|")
        throw new Error("use regg instead of reg to wrap expressions with `|`!");
      return n ? r : r.source;
    }).join(""),
    ot ? "mu" : "m"
  );
}
function d(e) {
  if (arguments.length === 0)
    throw new Error("no parameters provided");
  return g.apply(d, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
}
var _i = "�", Ee = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
ot && (Ee = g("[", me(Ee), "\\u{10000}-\\u{10FFFF}", "]"));
var Qt = /[\x20\x09\x0D\x0A]/, Fi = me(Qt), C = g(Qt, "+"), O = g(Qt, "*"), Ze = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
ot && (Ze = g("[", me(Ze), "\\u{10000}-\\u{10FFFF}", "]"));
var Li = me(Ze), Zt = g("[", Li, me(/[-.0-9\xB7]/), me(/[\u0300-\u036F\u203F-\u2040]/), "]"), X = g(Ze, Zt, "*"), Or = g(Zt, "+"), ki = g("&", X, ";"), Pi = d(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), et = d(ki, "|", Pi), tt = g("%", X, ";"), er = d(
  g('"', d(/[^%&"]/, "|", tt, "|", et), "*", '"'),
  "|",
  g("'", d(/[^%&']/, "|", tt, "|", et), "*", "'")
), qi = d('"', d(/[^<&"]/, "|", et), "*", '"', "|", "'", d(/[^<&']/, "|", et), "*", "'"), $i = Oe(Ze, ":"), ji = Oe(Zt, ":"), Ir = g($i, ji, "*"), at = g(Ir, d(":", Ir), "?"), Ui = g("^", at, "$"), Vi = g("(", at, ")"), rt = d(/"[^"]*"|'[^']*'/), Hi = g(/^<\?/, "(", X, ")", d(C, "(", Ee, "*?)"), "?", /\?>/), Br = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, yt = d('"', Br, '*"', "|", "'", Oe(Br, "'"), "*'"), vn = "<!--", An = "-->", Gi = g(vn, d(Oe(Ee, "-"), "|", g("-", Oe(Ee, "-"))), "*", An), xr = "#PCDATA", zi = d(
  g(/\(/, O, xr, d(O, /\|/, O, at), "*", O, /\)\*/),
  "|",
  g(/\(/, O, xr, O, /\)/)
), Ji = /[?*+]?/, Xi = g(
  /\([^>]+\)/,
  Ji
  /*regg(choice, '|', seq), _children_quantity*/
), Yi = d("EMPTY", "|", "ANY", "|", zi, "|", Xi), Ki = "<!ELEMENT", Wi = g(Ki, C, d(at, "|", tt), C, d(Yi, "|", tt), O, ">"), Qi = g("NOTATION", C, /\(/, O, X, d(O, /\|/, O, X), "*", O, /\)/), Zi = g(/\(/, O, Or, d(O, /\|/, O, Or), "*", O, /\)/), eo = d(Qi, "|", Zi), to = d(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", eo), ro = d(/#REQUIRED|#IMPLIED/, "|", d(d("#FIXED", C), "?", qi)), no = d(C, X, C, to, C, ro), uo = "<!ATTLIST", io = g(uo, C, X, no, "*", O, ">"), tr = "SYSTEM", Ct = "PUBLIC", Tt = d(d(tr, C, rt), "|", d(Ct, C, yt, C, rt)), oo = g(
  "^",
  d(
    d(tr, C, "(?<SystemLiteralOnly>", rt, ")"),
    "|",
    d(Ct, C, "(?<PubidLiteral>", yt, ")", C, "(?<SystemLiteral>", rt, ")")
  )
), ao = d(C, "NDATA", C, X), so = d(er, "|", d(Tt, ao, "?")), Nn = "<!ENTITY", co = g(Nn, C, X, C, so, O, ">"), lo = d(er, "|", Tt), fo = g(Nn, C, "%", C, X, C, lo, O, ">"), po = d(co, "|", fo), ho = g(Ct, C, yt), mo = g("<!NOTATION", C, X, C, d(Tt, "|", ho), O, ">"), rr = g(O, "=", O), Rr = /1[.]\d+/, Eo = g(C, "version", rr, d("'", Rr, "'", "|", '"', Rr, '"')), Mr = /[A-Za-z][-A-Za-z0-9._]*/, go = d(C, "encoding", rr, d('"', Mr, '"', "|", "'", Mr, "'")), Do = d(C, "standalone", rr, d("'", d("yes", "|", "no"), "'", "|", '"', d("yes", "|", "no"), '"')), vo = g(/^<\?xml/, Eo, go, "?", Do, "?", O, /\?>/), Ao = "<!DOCTYPE", No = "<![CDATA[", bo = "]]>", yo = /<!\[CDATA\[/, Co = /\]\]>/, To = g(Ee, "*?", Co), wo = g(yo, To);
E.chars = me;
E.chars_without = Oe;
E.detectUnicodeSupport = Dn;
E.reg = g;
E.regg = d;
E.AttlistDecl = io;
E.CDATA_START = No;
E.CDATA_END = bo;
E.CDSect = wo;
E.Char = Ee;
E.Comment = Gi;
E.COMMENT_START = vn;
E.COMMENT_END = An;
E.DOCTYPE_DECL_START = Ao;
E.elementdecl = Wi;
E.EntityDecl = po;
E.EntityValue = er;
E.ExternalID = Tt;
E.ExternalID_match = oo;
E.Name = X;
E.NotationDecl = mo;
E.Reference = et;
E.PEReference = tt;
E.PI = Hi;
E.PUBLIC = Ct;
E.PubidLiteral = yt;
E.QName = at;
E.QName_exact = Ui;
E.QName_group = Vi;
E.S = C;
E.SChar_s = Fi;
E.S_OPT = O;
E.SYSTEM = tr;
E.SystemLiteral = rt;
E.UNICODE_REPLACEMENT_CHARACTER = _i;
E.UNICODE_SUPPORT = ot;
E.XMLDecl = vo;
var J = x, ee = J.find, So = J.hasDefaultHTMLNamespace, Ie = J.hasOwn, Oo = J.isHTMLMimeType, Io = J.isHTMLRawTextElement, Bo = J.isHTMLVoidElement, ze = J.MIME_TYPE, te = J.NAMESPACE, P = Symbol(), bn = Ae, h = bn.DOMException, xo = bn.DOMExceptionName, Q = E;
function q(e) {
  if (e !== P)
    throw new TypeError("Illegal constructor");
}
function Ro(e) {
  return e !== "";
}
function Mo(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(Ro) : [];
}
function _o(e, t) {
  return Ie(e, t) || (e[t] = !0), e;
}
function _r(e) {
  if (!e) return [];
  var t = Mo(e);
  return Object.keys(t.reduce(_o, {}));
}
function Fo(e) {
  return function(t) {
    return e && e.indexOf(t) !== -1;
  };
}
function yn(e) {
  if (!Q.QName_exact.test(e))
    throw new h(h.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + e + '"');
}
function Ut(e, t) {
  yn(t), e = e || null;
  var r = null, n = t;
  if (t.indexOf(":") >= 0) {
    var u = t.split(":");
    r = u[0], n = u[1];
  }
  if (r !== null && e === null)
    throw new h(h.NAMESPACE_ERR, "prefix is non-null and namespace is null");
  if (r === "xml" && e !== J.NAMESPACE.XML)
    throw new h(h.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
  if ((r === "xmlns" || t === "xmlns") && e !== J.NAMESPACE.XMLNS)
    throw new h(
      h.NAMESPACE_ERR,
      'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
    );
  if (e === J.NAMESPACE.XMLNS && r !== "xmlns" && t !== "xmlns")
    throw new h(
      h.NAMESPACE_ERR,
      'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
    );
  return [e, r, n];
}
function Fe(e, t) {
  for (var r in e)
    Ie(e, r) && (t[r] = e[r]);
}
function $(e, t) {
  var r = e.prototype;
  if (!(r instanceof t)) {
    let n = function() {
    };
    n.prototype = t.prototype, n = new n(), Fe(r, n), e.prototype = r = n;
  }
  r.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), r.constructor = e);
}
var j = {}, Y = j.ELEMENT_NODE = 1, Be = j.ATTRIBUTE_NODE = 2, vt = j.TEXT_NODE = 3, Cn = j.CDATA_SECTION_NODE = 4, Tn = j.ENTITY_REFERENCE_NODE = 5, Lo = j.ENTITY_NODE = 6, wn = j.PROCESSING_INSTRUCTION_NODE = 7, Sn = j.COMMENT_NODE = 8, nt = j.DOCUMENT_NODE = 9, On = j.DOCUMENT_TYPE_NODE = 10, ae = j.DOCUMENT_FRAGMENT_NODE = 11, ko = j.NOTATION_NODE = 12, _ = J.freeze({
  DOCUMENT_POSITION_DISCONNECTED: 1,
  DOCUMENT_POSITION_PRECEDING: 2,
  DOCUMENT_POSITION_FOLLOWING: 4,
  DOCUMENT_POSITION_CONTAINS: 8,
  DOCUMENT_POSITION_CONTAINED_BY: 16,
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
});
function Fr(e) {
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
function Lr(e) {
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
      we(this[r], t, e);
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
        Ie(e, n) && delete e[n];
    Fe(r, e), e._inc = t;
  }
}
he.prototype.item = function(e) {
  return wt(this), this[e] || null;
};
$(he, M);
function xe() {
}
function Bn(e, t) {
  for (var r = 0; r < e.length; ) {
    if (e[r] === t)
      return r;
    r++;
  }
}
function Po(e, t, r, n) {
  if (n ? t[Bn(t, n)] = r : (t[t.length] = r, t.length++), e) {
    r.ownerElement = e;
    var u = e.ownerDocument;
    u && (n && Mn(u, e, n), qo(u, e, r));
  }
}
function kr(e, t, r) {
  var n = Bn(t, r);
  if (n >= 0) {
    for (var u = t.length - 1; n <= u; )
      t[n] = t[++n];
    if (t.length = u, e) {
      var i = e.ownerDocument;
      i && Mn(i, e, r), r.ownerElement = null;
    }
  }
}
xe.prototype = {
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
      throw new h(h.INUSE_ATTRIBUTE_ERR);
    var r = this.getNamedItemNS(e.namespaceURI, e.localName);
    return r === e ? e : (Po(this._ownerElement, this, e, r), r);
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
      throw new h(h.NOT_FOUND_ERR, e);
    return kr(this._ownerElement, this, t), t;
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
      throw new h(h.NOT_FOUND_ERR, e ? e + " : " + t : t);
    return kr(this._ownerElement, this, r), r;
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
xe.prototype[Symbol.iterator] = function() {
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
function xn() {
}
xn.prototype = {
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
    var n = ze.XML_APPLICATION;
    e === te.HTML ? n = ze.XML_XHTML_APPLICATION : e === te.SVG && (n = ze.XML_SVG_IMAGE);
    var u = new se(P, { contentType: n });
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
    var u = new It(P);
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
    var t = new se(P, { contentType: ze.HTML });
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
function A(e) {
  q(e);
}
A.prototype = {
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
    return At(this, e, t);
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
    At(this, e, t, kn), t && this.removeChild(t);
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
    return Fn(this, e);
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
    return Vt(this.ownerDocument || this, this, e);
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
      t && t.nodeType == vt && e.nodeType == vt ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
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
          if (Ie(r, n) && r[n] === e)
            return n;
      }
      t = t.nodeType == Be ? t.ownerDocument : t.parentNode;
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
      if (r && Ie(r, e))
        return r[e];
      t = t.nodeType == Be ? t.ownerDocument : t.parentNode;
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
    if (t instanceof ge && (n = t, t = n.ownerElement), r instanceof ge && (u = r, r = u.ownerElement, n && t && r === t))
      for (var i = 0, a; a = r.attributes[i]; i++) {
        if (a === n)
          return _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + _.DOCUMENT_POSITION_PRECEDING;
        if (a === u)
          return _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + _.DOCUMENT_POSITION_FOLLOWING;
      }
    if (!t || !r || r.ownerDocument !== t.ownerDocument)
      return _.DOCUMENT_POSITION_DISCONNECTED + _.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (Lr(r.ownerDocument) > Lr(t.ownerDocument) ? _.DOCUMENT_POSITION_FOLLOWING : _.DOCUMENT_POSITION_PRECEDING);
    var o = Fr(t), s = Fr(r);
    if (!n && s.indexOf(t) >= 0 || u && t === r)
      return _.DOCUMENT_POSITION_CONTAINS + _.DOCUMENT_POSITION_PRECEDING;
    if (!u && o.indexOf(r) >= 0 || n && t === r)
      return _.DOCUMENT_POSITION_CONTAINED_BY + _.DOCUMENT_POSITION_FOLLOWING;
    var c = In(s, o);
    for (var l in c.childNodes) {
      var f = c.childNodes[l];
      if (f === r) return _.DOCUMENT_POSITION_FOLLOWING;
      if (f === t) return _.DOCUMENT_POSITION_PRECEDING;
      if (s.indexOf(f) >= 0) return _.DOCUMENT_POSITION_FOLLOWING;
      if (o.indexOf(f) >= 0) return _.DOCUMENT_POSITION_PRECEDING;
    }
    return 0;
  }
};
function Rn(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
Fe(j, A);
Fe(j, A.prototype);
Fe(_, A);
Fe(_, A.prototype);
function Xe(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (Xe(e, t))
        return !0;
    while (e = e.nextSibling);
}
function se(e, t) {
  q(e);
  var r = t || {};
  this.ownerDocument = this, this.contentType = r.contentType || ze.XML_APPLICATION, this.type = Oo(this.contentType) ? "html" : "xml";
}
function qo(e, t, r) {
  e && e._inc++;
  var n = r.namespaceURI;
  n === te.XMLNS && (t._nsMap[r.prefix ? r.localName : ""] = r.value);
}
function Mn(e, t, r, n) {
  e && e._inc++;
  var u = r.namespaceURI;
  u === te.XMLNS && delete t._nsMap[r.prefix ? r.localName : ""];
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
function Fn(e, t) {
  if (e !== t.parentNode)
    throw new h(h.NOT_FOUND_ERR, "child's parent is not parent");
  var r = t.previousSibling, n = t.nextSibling;
  return r ? r.nextSibling = n : e.firstChild = n, n ? n.previousSibling = r : e.lastChild = r, _n(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
}
function $o(e) {
  return e && (e.nodeType === A.DOCUMENT_NODE || e.nodeType === A.DOCUMENT_FRAGMENT_NODE || e.nodeType === A.ELEMENT_NODE);
}
function jo(e) {
  return e && (e.nodeType === A.CDATA_SECTION_NODE || e.nodeType === A.COMMENT_NODE || e.nodeType === A.DOCUMENT_FRAGMENT_NODE || e.nodeType === A.DOCUMENT_TYPE_NODE || e.nodeType === A.ELEMENT_NODE || e.nodeType === A.PROCESSING_INSTRUCTION_NODE || e.nodeType === A.TEXT_NODE);
}
function ce(e) {
  return e && e.nodeType === A.DOCUMENT_TYPE_NODE;
}
function ue(e) {
  return e && e.nodeType === A.ELEMENT_NODE;
}
function Ln(e) {
  return e && e.nodeType === A.TEXT_NODE;
}
function Pr(e, t) {
  var r = e.childNodes || [];
  if (ee(r, ue) || ce(t))
    return !1;
  var n = ee(r, ce);
  return !(t && n && r.indexOf(n) > r.indexOf(t));
}
function qr(e, t) {
  var r = e.childNodes || [];
  function n(i) {
    return ue(i) && i !== t;
  }
  if (ee(r, n))
    return !1;
  var u = ee(r, ce);
  return !(t && u && r.indexOf(u) > r.indexOf(t));
}
function Uo(e, t, r) {
  if (!$o(e))
    throw new h(h.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
  if (r && r.parentNode !== e)
    throw new h(h.NOT_FOUND_ERR, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !jo(t) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    ce(t) && e.nodeType !== A.DOCUMENT_NODE
  )
    throw new h(
      h.HIERARCHY_REQUEST_ERR,
      "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
    );
}
function Vo(e, t, r) {
  var n = e.childNodes || [], u = t.childNodes || [];
  if (t.nodeType === A.DOCUMENT_FRAGMENT_NODE) {
    var i = u.filter(ue);
    if (i.length > 1 || ee(u, Ln))
      throw new h(h.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (i.length === 1 && !Pr(e, r))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (ue(t) && !Pr(e, r))
    throw new h(h.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (ce(t)) {
    if (ee(n, ce))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var a = ee(n, ue);
    if (r && n.indexOf(a) < n.indexOf(r))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    if (!r && a)
      throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
  }
}
function kn(e, t, r) {
  var n = e.childNodes || [], u = t.childNodes || [];
  if (t.nodeType === A.DOCUMENT_FRAGMENT_NODE) {
    var i = u.filter(ue);
    if (i.length > 1 || ee(u, Ln))
      throw new h(h.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    if (i.length === 1 && !qr(e, r))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
  }
  if (ue(t) && !qr(e, r))
    throw new h(h.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
  if (ce(t)) {
    if (ee(n, function(s) {
      return ce(s) && s !== r;
    }))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    var a = ee(n, ue);
    if (r && n.indexOf(a) < n.indexOf(r))
      throw new h(h.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
  }
}
function At(e, t, r, n) {
  Uo(e, t, r), e.nodeType === A.DOCUMENT_NODE && (n || Vo)(e, t, r);
  var u = t.parentNode;
  if (u && u.removeChild(t), t.nodeType === ae) {
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
  return _n(e.ownerDocument || e, e, t), t.nodeType == ae && (t.firstChild = t.lastChild = null), t;
}
se.prototype = {
  /**
   * The implementation that created this document.
   *
   * @type DOMImplementation
   * @readonly
   */
  implementation: null,
  nodeName: "#document",
  nodeType: nt,
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
    if (e.nodeType === ae) {
      for (var r = e.firstChild; r; ) {
        var n = r.nextSibling;
        this.insertBefore(r, t), r = n;
      }
      return e;
    }
    return At(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === Y && (this.documentElement = e), e;
  },
  removeChild: function(e) {
    var t = Fn(this, e);
    return t === this.documentElement && (this.documentElement = null), t;
  },
  replaceChild: function(e, t) {
    At(this, e, t, kn), e.ownerDocument = this, t && this.removeChild(t), ue(e) && (this.documentElement = e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return $n(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return Xe(this.documentElement, function(r) {
      if (r.nodeType == Y && r.getAttribute("id") == e)
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
    var t = new le(P);
    t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), So(this.contentType) && (t.namespaceURI = te.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new M();
    var r = t.attributes = new xe();
    return r._ownerElement = t, t;
  },
  /**
   * @returns {DocumentFragment}
   */
  createDocumentFragment: function() {
    var e = new ct(P);
    return e.ownerDocument = this, e.childNodes = new M(), e;
  },
  /**
   * @param {string} data
   * @returns {Text}
   */
  createTextNode: function(e) {
    var t = new st(P);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} data
   * @returns {Comment}
   */
  createComment: function(e) {
    var t = new St(P);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} data
   * @returns {CDATASection}
   */
  createCDATASection: function(e) {
    var t = new Ot(P);
    return t.ownerDocument = this, t.childNodes = new M(), t.appendData(e), t;
  },
  /**
   * @param {string} target
   * @param {string} data
   * @returns {ProcessingInstruction}
   */
  createProcessingInstruction: function(e, t) {
    var r = new xt(P);
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
    if (!Q.QName_exact.test(e))
      throw new h(h.INVALID_CHARACTER_ERR, 'invalid character in name "' + e + '"');
    return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
  },
  _createAttribute: function(e) {
    var t = new ge(P);
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
    if (!Q.Name.test(e))
      throw new h(h.INVALID_CHARACTER_ERR, 'not a valid xml name "' + e + '"');
    if (this.type === "html")
      throw new h("document is an html document", xo.NotSupportedError);
    var t = new Bt(P);
    return t.ownerDocument = this, t.childNodes = new M(), t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Element}
   */
  createElementNS: function(e, t) {
    var r = Ut(e, t), n = new le(P), u = n.attributes = new xe();
    return n.childNodes = new M(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], u._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  /**
   * @param {string} namespaceURI
   * @param {string} qualifiedName
   * @returns {Attr}
   */
  createAttributeNS: function(e, t) {
    var r = Ut(e, t), n = new ge(P);
    return n.ownerDocument = this, n.childNodes = new M(), n.nodeName = t, n.name = t, n.specified = !0, n.namespaceURI = r[0], n.prefix = r[1], n.localName = r[2], n;
  }
};
$(se, A);
function le(e) {
  q(e), this._nsMap = /* @__PURE__ */ Object.create(null);
}
le.prototype = {
  nodeType: Y,
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
    return this.ownerDocument.type === "html" && this.namespaceURI === te.HTML;
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
    var n = Ut(e, t), u = n[2], i = this.getAttributeNodeNS(e, u);
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
    var t = _r(e);
    return new he(this, function(r) {
      var n = [];
      return t.length > 0 && Xe(r, function(u) {
        if (u !== r && u.nodeType === Y) {
          var i = u.getAttribute("class");
          if (i) {
            var a = e === i;
            if (!a) {
              var o = _r(i);
              a = t.every(Fo(o));
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
    var t = (this.nodeType === nt ? this : this.ownerDocument).type === "html", r = e.toLowerCase();
    return new he(this, function(n) {
      var u = [];
      return Xe(n, function(i) {
        if (!(i === n || i.nodeType !== Y))
          if (e === "*")
            u.push(i);
          else {
            var a = i.getQualifiedName(), o = t && i.namespaceURI === te.HTML ? r : e;
            a === o && u.push(i);
          }
      }), u;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new he(this, function(r) {
      var n = [];
      return Xe(r, function(u) {
        u !== r && u.nodeType === Y && (e === "*" || u.namespaceURI === e) && (t === "*" || u.localName == t) && n.push(u);
      }), n;
    });
  }
};
se.prototype.getElementsByClassName = le.prototype.getElementsByClassName;
se.prototype.getElementsByTagName = le.prototype.getElementsByTagName;
se.prototype.getElementsByTagNameNS = le.prototype.getElementsByTagNameNS;
$(le, A);
function ge(e) {
  q(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
}
ge.prototype.nodeType = Be;
$(ge, A);
function Le(e) {
  q(e);
}
Le.prototype = {
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
$(Le, A);
function st(e) {
  q(e);
}
st.prototype = {
  nodeName: "#text",
  nodeType: vt,
  splitText: function(e) {
    var t = this.data, r = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var n = this.ownerDocument.createTextNode(r);
    return this.parentNode && this.parentNode.insertBefore(n, this.nextSibling), n;
  }
};
$(st, Le);
function St(e) {
  q(e);
}
St.prototype = {
  nodeName: "#comment",
  nodeType: Sn
};
$(St, Le);
function Ot(e) {
  q(e);
}
Ot.prototype = {
  nodeName: "#cdata-section",
  nodeType: Cn
};
$(Ot, st);
function It(e) {
  q(e);
}
It.prototype.nodeType = On;
$(It, A);
function nr(e) {
  q(e);
}
nr.prototype.nodeType = ko;
$(nr, A);
function ur(e) {
  q(e);
}
ur.prototype.nodeType = Lo;
$(ur, A);
function Bt(e) {
  q(e);
}
Bt.prototype.nodeType = Tn;
$(Bt, A);
function ct(e) {
  q(e);
}
ct.prototype.nodeName = "#document-fragment";
ct.prototype.nodeType = ae;
$(ct, A);
function xt(e) {
  q(e);
}
xt.prototype.nodeType = wn;
$(xt, Le);
function Pn() {
}
Pn.prototype.serializeToString = function(e, t) {
  return qn.call(e, t);
};
A.prototype.toString = qn;
function qn(e) {
  var t = [], r = this.nodeType === nt && this.documentElement || this, n = r.prefix, u = r.namespaceURI;
  if (u && n == null) {
    var n = r.lookupPrefix(u);
    if (n == null)
      var i = [
        { namespace: u, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return we(this, t, e, i), t.join("");
}
function $r(e, t, r) {
  var n = e.prefix || "", u = e.namespaceURI;
  if (!u || n === "xml" && u === te.XML || u === te.XMLNS)
    return !1;
  for (var i = r.length; i--; ) {
    var a = r[i];
    if (a.prefix === n)
      return a.namespace !== u;
  }
  return !0;
}
function qt(e, t, r) {
  e.push(" ", t, '="', r.replace(/[<>&"\t\n\r]/g, Rn), '"');
}
function we(e, t, r, n) {
  n || (n = []);
  var u = e.nodeType === nt ? e : e.ownerDocument, i = u.type === "html";
  if (r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case Y:
      var a = e.attributes, o = a.length, B = e.firstChild, s = e.tagName, c = s;
      if (!i && !e.prefix && e.namespaceURI) {
        for (var l, f = 0; f < a.length; f++)
          if (a.item(f).name === "xmlns") {
            l = a.item(f).value;
            break;
          }
        if (!l)
          for (var p = n.length - 1; p >= 0; p--) {
            var m = n[p];
            if (m.prefix === "" && m.namespace === e.namespaceURI) {
              l = m.namespace;
              break;
            }
          }
        if (l !== e.namespaceURI)
          for (var p = n.length - 1; p >= 0; p--) {
            var m = n[p];
            if (m.namespace === e.namespaceURI) {
              m.prefix && (c = m.prefix + ":" + s);
              break;
            }
          }
      }
      t.push("<", c);
      for (var b = 0; b < o; b++) {
        var T = a.item(b);
        T.prefix == "xmlns" ? n.push({
          prefix: T.localName,
          namespace: T.value
        }) : T.nodeName == "xmlns" && n.push({ prefix: "", namespace: T.value });
      }
      for (var b = 0; b < o; b++) {
        var T = a.item(b);
        if ($r(T, i, n)) {
          var w = T.prefix || "", I = T.namespaceURI;
          qt(t, w ? "xmlns:" + w : "xmlns", I), n.push({ prefix: w, namespace: I });
        }
        we(T, t, r, n);
      }
      if (s === c && $r(e, i, n)) {
        var w = e.prefix || "", I = e.namespaceURI;
        qt(t, w ? "xmlns:" + w : "xmlns", I), n.push({ prefix: w, namespace: I });
      }
      var re = !B;
      if (re && (i || e.namespaceURI === te.HTML) && (re = Bo(s)), re)
        t.push("/>");
      else {
        if (t.push(">"), i && Io(s))
          for (; B; )
            B.data ? t.push(B.data) : we(B, t, r, n.slice()), B = B.nextSibling;
        else
          for (; B; )
            we(B, t, r, n.slice()), B = B.nextSibling;
        t.push("</", c, ">");
      }
      return;
    case nt:
    case ae:
      for (var B = e.firstChild; B; )
        we(B, t, r, n.slice()), B = B.nextSibling;
      return;
    case Be:
      return qt(t, e.name, e.value);
    case vt:
      return t.push(e.data.replace(/[<&>]/g, Rn));
    case Cn:
      return t.push(Q.CDATA_START, e.data, Q.CDATA_END);
    case Sn:
      return t.push(Q.COMMENT_START, e.data, Q.COMMENT_END);
    case On:
      var K = e.publicId, U = e.systemId;
      t.push(Q.DOCTYPE_DECL_START, " ", e.name), K ? (t.push(" ", Q.PUBLIC, " ", K), U && U !== "." && t.push(" ", U)) : U && U !== "." && t.push(" ", Q.SYSTEM, " ", U), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">");
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
    case Y:
      n = t.cloneNode(!1), n.ownerDocument = e;
    case ae:
      break;
    case Be:
      r = !0;
      break;
  }
  if (n || (n = t.cloneNode(!1)), n.ownerDocument = e, n.parentNode = null, r)
    for (var u = t.firstChild; u; )
      n.appendChild($n(e, u, r)), u = u.nextSibling;
  return n;
}
function Vt(e, t, r) {
  var n = new t.constructor(P);
  for (var u in t)
    if (Ie(t, u)) {
      var i = t[u];
      typeof i != "object" && i != n[u] && (n[u] = i);
    }
  switch (t.childNodes && (n.childNodes = new M()), n.ownerDocument = e, n.nodeType) {
    case Y:
      var a = t.attributes, o = n.attributes = new xe(), s = a.length;
      o._ownerElement = n;
      for (var c = 0; c < s; c++)
        n.setAttributeNode(Vt(e, a.item(c), !0));
      break;
    case Be:
      r = !0;
  }
  if (r)
    for (var l = t.firstChild; l; )
      n.appendChild(Vt(e, l, r)), l = l.nextSibling;
  return n;
}
function jn(e, t, r) {
  e[t] = r;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case Y:
        case ae:
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
    }), Object.defineProperty(A.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case Y:
          case ae:
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
R._updateLiveList = wt;
R.Attr = ge;
R.CDATASection = Ot;
R.CharacterData = Le;
R.Comment = St;
R.Document = se;
R.DocumentFragment = ct;
R.DocumentType = It;
R.DOMImplementation = xn;
R.Element = le;
R.Entity = ur;
R.EntityReference = Bt;
R.LiveNodeList = he;
R.NamedNodeMap = xe;
R.Node = A;
R.NodeList = M;
R.Notation = nr;
R.Text = st;
R.ProcessingInstruction = xt;
R.XMLSerializer = Pn;
var Un = {};
(function(e) {
  var t = x.freeze;
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
var Rt = {}, ke = x, v = E, Vn = Ae, Ho = ke.isHTMLEscapableRawTextElement, Go = ke.isHTMLMimeType, zo = ke.isHTMLRawTextElement, ut = ke.hasOwn, jr = ke.NAMESPACE, Ur = Vn.ParseError, Jo = Vn.DOMException, Ve = 0, ie = 1, be = 2, He = 3, ye = 4, Ce = 5, Ge = 6, Et = 7;
function Hn() {
}
Hn.prototype = {
  parse: function(e, t, r) {
    var n = this.domBuilder;
    n.startDocument(), Gn(t, t = /* @__PURE__ */ Object.create(null)), Xo(e, t, r, n, this.errorHandler), n.endDocument();
  }
};
var ir = /&#?\w+;?/g;
function Xo(e, t, r, n, u) {
  var i = Go(n.mimeType);
  if (e.indexOf(v.UNICODE_REPLACEMENT_CHARACTER) >= 0)
    return u.fatalError("Unicode replacement character detected, source encoding issues?");
  function a(y) {
    if (y > 65535) {
      y -= 65536;
      var z = 55296 + (y >> 10), lt = 56320 + (y & 1023);
      return String.fromCharCode(z, lt);
    } else
      return String.fromCharCode(y);
  }
  function o(y) {
    var z = y[y.length - 1] === ";" ? y : y + ";";
    if (!i && z !== y)
      return u.error("EntityRef: expecting ;"), y;
    var lt = v.Reference.exec(z);
    if (!lt || lt[0].length !== z.length)
      return u.error("entity not matching Reference production: " + y), y;
    var ft = z.slice(1, -1);
    return ut(r, ft) ? r[ft] : ft.charAt(0) === "#" ? a(parseInt(ft.substr(1).replace("x", "0x"))) : (u.error("entity not found:" + y), y);
  }
  function s(y) {
    if (y > w) {
      var z = e.substring(w, y).replace(ir, o);
      m && c(w), n.characters(z, 0, y - w), w = y;
    }
  }
  function c(y, z) {
    for (; y >= f && (z = p.exec(e)); )
      l = z.index, f = l + z[0].length, m.lineNumber++;
    m.columnNumber = y - l + 1;
  }
  for (var l = 0, f = 0, p = /.*(?:\r\n?|\n)|.*$/g, m = n.locator, b = [{ currentNSMap: t }], T = [], w = 0; ; ) {
    try {
      var I = e.indexOf("<", w);
      if (I < 0) {
        if (!i && T.length > 0)
          return u.fatalError("unclosed xml tag(s): " + T.join(", "));
        if (!e.substring(w).match(/^\s*$/)) {
          var re = n.doc, B = re.createTextNode(e.substr(w));
          if (re.documentElement)
            return u.error("Extra content at the end of the document");
          re.appendChild(B), n.currentElement = B;
        }
        return;
      }
      if (I > w) {
        var K = e.substring(w, I);
        !i && T.length === 0 && (K = K.replace(new RegExp(v.S_OPT.source, "g"), ""), K && u.error("Unexpected content outside root element: '" + K + "'")), s(I);
      }
      switch (e.charAt(I + 1)) {
        case "/":
          var H = e.indexOf(">", I + 2), U = e.substring(I + 2, H > 0 ? H : void 0);
          if (!U)
            return u.fatalError("end tag name missing");
          var qe = H > 0 && v.reg("^", v.QName_group, v.S_OPT, "$").exec(U);
          if (!qe)
            return u.fatalError('end tag name contains invalid characters: "' + U + '"');
          if (!n.currentElement && !n.doc.documentElement)
            return;
          var $e = T[T.length - 1] || n.currentElement.tagName || n.doc.documentElement.tagName || "";
          if ($e !== qe[1]) {
            var Mt = qe[1].toLowerCase();
            if (!i || $e.toLowerCase() !== Mt)
              return u.fatalError('Opening and ending tag mismatch: "' + $e + '" != "' + U + '"');
          }
          var _t = b.pop();
          T.pop();
          var Ft = _t.localNSMap;
          if (n.endElement(_t.uri, _t.localName, $e), Ft)
            for (var ar in Ft)
              ut(Ft, ar) && n.endPrefixMapping(ar);
          H++;
          break;
        case "?":
          m && c(I), H = Qo(e, I, n, u);
          break;
        case "!":
          m && c(I), H = Jn(e, I, n, u, i);
          break;
        default:
          m && c(I);
          var V = new Xn(), Lt = b[b.length - 1].currentNSMap, H = Yo(e, I, V, Lt, o, u, i), sr = V.length;
          if (V.closed || (i && ke.isHTMLVoidElement(V.tagName) ? V.closed = !0 : T.push(V.tagName)), m && sr) {
            for (var Kn = Vr(m, {}), kt = 0; kt < sr; kt++) {
              var cr = V[kt];
              c(cr.offset), cr.locator = Vr(m, {});
            }
            n.locator = Kn, Hr(V, n, Lt) && b.push(V), n.locator = m;
          } else
            Hr(V, n, Lt) && b.push(V);
          i && !V.closed ? H = Ko(e, H, V.tagName, o, n) : H++;
      }
    } catch (y) {
      if (y instanceof Ur)
        throw y;
      if (y instanceof Jo)
        throw new Ur(y.name + ": " + y.message, n.locator, y);
      u.error("element parse error: " + y), H = -1;
    }
    H > w ? w = H : s(Math.max(I, w) + 1);
  }
}
function Vr(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function Yo(e, t, r, n, u, i, a) {
  function o(m, b, T) {
    if (ut(r.attributeNames, m))
      return i.fatalError("Attribute " + m + " redefined");
    if (!a && b.indexOf("<") >= 0)
      return i.fatalError("Unescaped '<' not allowed in attributes values");
    r.addValue(
      m,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      b.replace(/[\t\n\r]/g, " ").replace(ir, u),
      T
    );
  }
  for (var s, c, l = ++t, f = Ve; ; ) {
    var p = e.charAt(l);
    switch (p) {
      case "=":
        if (f === ie)
          s = e.slice(t, l), f = He;
        else if (f === be)
          f = He;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (f === He || f === ie)
          if (f === ie && (i.warning('attribute value must after "="'), s = e.slice(t, l)), t = l + 1, l = e.indexOf(p, t), l > 0)
            c = e.slice(t, l), o(s, c, t - 1), f = Ce;
          else
            throw new Error("attribute value no end '" + p + "' match");
        else if (f == ye)
          c = e.slice(t, l), o(s, c, t), i.warning('attribute "' + s + '" missed start quot(' + p + ")!!"), t = l + 1, f = Ce;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (f) {
          case Ve:
            r.setTagName(e.slice(t, l));
          case Ce:
          case Ge:
          case Et:
            f = Et, r.closed = !0;
          case ye:
          case ie:
            break;
          case be:
            r.closed = !0;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return i.error("unexpected end of input"), f == Ve && r.setTagName(e.slice(t, l)), l;
      case ">":
        switch (f) {
          case Ve:
            r.setTagName(e.slice(t, l));
          case Ce:
          case Ge:
          case Et:
            break;
          case ye:
          case ie:
            c = e.slice(t, l), c.slice(-1) === "/" && (r.closed = !0, c = c.slice(0, -1));
          case be:
            f === be && (c = s), f == ye ? (i.warning('attribute "' + c + '" missed quot(")!'), o(s, c, t)) : (a || i.warning('attribute "' + c + '" missed value!! "' + c + '" instead!!'), o(c, c, t));
            break;
          case He:
            if (!a)
              return i.fatalError(`AttValue: ' or " expected`);
        }
        return l;
      case "":
        p = " ";
      default:
        if (p <= " ")
          switch (f) {
            case Ve:
              r.setTagName(e.slice(t, l)), f = Ge;
              break;
            case ie:
              s = e.slice(t, l), f = be;
              break;
            case ye:
              var c = e.slice(t, l);
              i.warning('attribute "' + c + '" missed quot(")!!'), o(s, c, t);
            case Ce:
              f = Ge;
              break;
          }
        else
          switch (f) {
            case be:
              a || i.warning('attribute "' + s + '" missed value!! "' + s + '" instead2!!'), o(s, s, t), t = l, f = ie;
              break;
            case Ce:
              i.warning('attribute space is required"' + s + '"!!');
            case Ge:
              f = ie, t = l;
              break;
            case He:
              f = ye, t = l;
              break;
            case Et:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    l++;
  }
}
function Hr(e, t, r) {
  for (var n = e.tagName, u = null, f = e.length; f--; ) {
    var i = e[f], a = i.qName, o = i.value, p = a.indexOf(":");
    if (p > 0)
      var s = i.prefix = a.slice(0, p), c = a.slice(p + 1), l = s === "xmlns" && c;
    else
      c = a, s = null, l = a === "xmlns" && "";
    i.localName = c, l !== !1 && (u == null && (u = /* @__PURE__ */ Object.create(null), Gn(r, r = /* @__PURE__ */ Object.create(null))), r[l] = u[l] = o, i.uri = jr.XMLNS, t.startPrefixMapping(l, o));
  }
  for (var f = e.length; f--; )
    i = e[f], i.prefix && (i.prefix === "xml" && (i.uri = jr.XML), i.prefix !== "xmlns" && (i.uri = r[i.prefix]));
  var p = n.indexOf(":");
  p > 0 ? (s = e.prefix = n.slice(0, p), c = e.localName = n.slice(p + 1)) : (s = null, c = e.localName = n);
  var m = e.uri = r[s || ""];
  if (t.startElement(m, c, n, e), e.closed) {
    if (t.endElement(m, c, n), u)
      for (s in u)
        ut(u, s) && t.endPrefixMapping(s);
  } else
    return e.currentNSMap = r, e.localNSMap = u, !0;
}
function Ko(e, t, r, n, u) {
  var i = Ho(r);
  if (i || zo(r)) {
    var a = e.indexOf("</" + r + ">", t), o = e.substring(t + 1, a);
    return i && (o = o.replace(ir, n)), u.characters(o, 0, o.length), a;
  }
  return t + 1;
}
function Gn(e, t) {
  for (var r in e)
    ut(e, r) && (t[r] = e[r]);
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
      var l = n();
      if (l !== " " && l !== `
` && l !== "	" && l !== "\r")
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
    var l = v.reg("^", c), f = l.exec(a());
    return f ? (u(f[0].length), f[0]) : null;
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
function Wo(e, t) {
  function r(o, s) {
    var c = v.PI.exec(o.substringFromIndex());
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
            e.char(3) === "L" ? a = e.getMatch(v.elementdecl) : e.char(3) === "N" && (a = e.getMatch(v.EntityDecl));
            break;
          case "A":
            a = e.getMatch(v.AttlistDecl);
            break;
          case "N":
            a = e.getMatch(v.NotationDecl);
            break;
          case "-":
            a = e.getMatch(v.Comment);
            break;
        }
      else if (e.char() === "<" && e.char(1) === "?")
        a = r(e, t);
      else if (e.char() === "%")
        a = e.getMatch(v.PEReference);
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
      var a = i.getMatch(v.Comment);
      return a ? (r.comment(a, v.COMMENT_START.length, a.length - v.COMMENT_START.length - v.COMMENT_END.length), i.getIndex()) : n.fatalError("comment is not well-formed at position " + i.getIndex());
    case "[":
      var o = i.getMatch(v.CDSect);
      return o ? !u && !r.currentElement ? n.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(o, v.CDATA_START.length, o.length - v.CDATA_START.length - v.CDATA_END.length), r.endCDATA(), i.getIndex()) : n.fatalError("Invalid CDATA starting at position " + t);
    case "D": {
      if (r.doc && r.doc.documentElement)
        return n.fatalError("Doctype not allowed inside or after documentElement at position " + i.getIndex());
      if (!i.substringStartsWith(v.DOCTYPE_DECL_START))
        return n.fatalError("Expected " + v.DOCTYPE_DECL_START + " at position " + i.getIndex());
      if (i.skip(v.DOCTYPE_DECL_START.length), i.skipBlanks() < 1)
        return n.fatalError("Expected whitespace after " + v.DOCTYPE_DECL_START + " at position " + i.getIndex());
      var s = {
        name: void 0,
        publicId: void 0,
        systemId: void 0,
        internalSubset: void 0
      };
      if (s.name = i.getMatch(v.Name), !s.name)
        return n.fatalError("doctype name missing or contains unexpected characters at position " + i.getIndex());
      if (i.skipBlanks(), i.substringStartsWith(v.PUBLIC) || i.substringStartsWith(v.SYSTEM)) {
        var c = v.ExternalID_match.exec(i.substringFromIndex());
        if (!c)
          return n.fatalError("doctype external id is not well-formed at position " + i.getIndex());
        c.groups.SystemLiteralOnly !== void 0 ? s.systemId = c.groups.SystemLiteralOnly : (s.systemId = c.groups.SystemLiteral, s.publicId = c.groups.PubidLiteral), i.skip(c[0].length);
      }
      return i.skipBlanks(), s.internalSubset = Wo(i, n), i.skipBlanks(), i.char() !== ">" ? n.fatalError("doctype not terminated with > at position " + i.getIndex()) : (i.skip(1), r.startDTD(s.name, s.publicId, s.systemId, s.internalSubset), r.endDTD(), i.getIndex());
    }
    default:
      return n.fatalError('Not well-formed XML starting with "<!" at position ' + t);
  }
}
function Qo(e, t, r, n) {
  var u = e.substring(t).match(v.PI);
  if (!u)
    return n.fatalError("Invalid processing instruction starting at position " + t);
  if (u[1].toLowerCase() === "xml") {
    if (t > 0)
      return n.fatalError(
        "processing instruction at position " + t + " is an xml declaration which is only at the start of the document"
      );
    if (!v.XMLDecl.test(e.substring(t)))
      return n.fatalError("xml declaration is not well-formed");
  }
  return r.processingInstruction(u[1], u[2]), t + u[0].length;
}
function Xn() {
  this.attributeNames = /* @__PURE__ */ Object.create(null);
}
Xn.prototype = {
  setTagName: function(e) {
    if (!v.QName_exact.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, r) {
    if (!v.QName_exact.test(e))
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
Rt.XMLReader = Hn;
Rt.parseUtils = zn;
Rt.parseDoctypeCommentOrCData = Jn;
var Ne = x, Zo = R, ea = Ae, Gr = Un, ta = Rt, ra = Zo.DOMImplementation, na = Ne.hasDefaultHTMLNamespace, ua = Ne.isHTMLMimeType, ia = Ne.isValidMimeType, Yn = Ne.MIME_TYPE, $t = Ne.NAMESPACE, zr = ea.ParseError, oa = ta.XMLReader;
function aa(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function sa(e) {
  if (e = e || { locator: !0 }, this.assign = e.assign || Ne.assign, this.domHandler = e.domHandler || or, this.onError = e.onError || e.errorHandler, e.errorHandler && typeof e.errorHandler != "function")
    throw new TypeError("errorHandler object is no longer supported, switch to onError!");
  e.errorHandler && e.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = e.normalizeLineEndings || aa, this.locator = !!e.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), e.xmlns);
}
sa.prototype.parseFromString = function(e, t) {
  if (!ia(t))
    throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + t + '" is not valid.');
  var r = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), n = Gr.XML_ENTITIES, u = r[""] || null;
  na(t) ? (n = Gr.HTML_ENTITIES, u = $t.HTML) : t === Yn.XML_SVG_IMAGE && (u = $t.SVG), r[""] = u, r.xml = r.xml || $t.XML;
  var i = new this.domHandler({
    mimeType: t,
    defaultNamespace: u,
    onError: this.onError
  }), a = this.locator ? {} : void 0;
  this.locator && i.setDocumentLocator(a);
  var o = new oa();
  o.errorHandler = i, o.domBuilder = i;
  var s = !Ne.isHTMLMimeType(t);
  return s && typeof e != "string" && o.errorHandler.fatalError("source is not a string"), o.parse(this.normalizeLineEndings(String(e)), r, n), i.doc.documentElement || o.errorHandler.fatalError("missing root element"), i.doc;
};
function or(e) {
  var t = e || {};
  this.mimeType = t.mimeType || Yn.XML_APPLICATION, this.defaultNamespace = t.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = t.onError;
}
function Te(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
or.prototype = {
  /**
   * Either creates an XML or an HTML document and stores it under `this.doc`.
   * If it is an XML document, `this.defaultNamespace` is used to create it,
   * and it will not contain any `childNodes`.
   * If it is an HTML document, it will be created without any `childNodes`.
   *
   * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
   */
  startDocument: function() {
    var e = new ra();
    this.doc = ua(this.mimeType) ? e.createHTMLDocument(!1) : e.createDocument(this.defaultNamespace, "");
  },
  startElement: function(e, t, r, n) {
    var u = this.doc, i = u.createElementNS(e, r || t), a = n.length;
    gt(this, i), this.currentElement = i, this.locator && Te(this.locator, i);
    for (var o = 0; o < a; o++) {
      var e = n.getURI(o), s = n.getValue(o), r = n.getQName(o), c = u.createAttributeNS(e, r);
      this.locator && Te(n.getLocator(o), c), c.value = c.nodeValue = s, i.setAttributeNode(c);
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
    this.locator && Te(this.locator, r), gt(this, r);
  },
  ignorableWhitespace: function(e, t, r) {
  },
  characters: function(e, t, r) {
    if (e = Jr.apply(this, arguments), e) {
      if (this.cdata)
        var n = this.doc.createCDATASection(e);
      else
        var n = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(n) : /^\s*$/.test(e) && this.doc.appendChild(n), this.locator && Te(this.locator, n);
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
    e = Jr.apply(this, arguments);
    var n = this.doc.createComment(e);
    this.locator && Te(this.locator, n), gt(this, n);
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
      this.locator && Te(this.locator, i), gt(this, i), this.doc.doctype = i;
    }
  },
  reportError: function(e, t) {
    if (typeof this.onError == "function")
      try {
        this.onError(e, t, this);
      } catch (r) {
        throw new zr("Reporting " + e + ' "' + t + '" caused ' + r, this.locator);
      }
    else
      console.error("[xmldom " + e + "]	" + t, ca(this.locator));
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
    throw this.reportError("fatalError", e), new zr(e, this.locator);
  }
};
function ca(e) {
  if (e)
    return `
@#[line:` + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function Jr(e, t, r) {
  return typeof e == "string" ? e.substr(t, r) : e.length >= t + r || t ? new java.lang.String(e, t, r) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
  /\w+/g,
  function(e) {
    or.prototype[e] = function() {
      return null;
    };
  }
);
function gt(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
var Pe = x;
Pe.assign;
Pe.hasDefaultHTMLNamespace;
Pe.isHTMLMimeType;
Pe.isValidMimeType;
Pe.MIME_TYPE;
Pe.NAMESPACE;
const Xr = "USJ", ne = ["figure", "note", "sidebar", "table"];
Object.freeze(ne);
class L {
  constructor(t) {
    S(this, "usj");
    S(this, "parentMapInternal");
    this.usj = t;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(t) {
    const r = lr({ path: t, json: this.usj, wrap: !0 });
    if (r === void 0 || r.length === 0) return;
    if (!Array.isArray(r[0])) return r[0];
    const n = lr({ path: t, json: this.usj, wrap: !1 });
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
      typeof i == "object" && L.createParentMapInternal(i, t, n);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const t = /* @__PURE__ */ new Map();
    return this.usj.content && t.set(this.usj.content, this.usj), this.usj.content.forEach((r) => {
      typeof r == "object" && L.createParentMapInternal(r, this.usj, t);
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
      if (i.type === Xr) break;
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
    return L.findNextMatchingNodeUsingWorkingStack(
      t,
      u,
      r,
      n
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(t) {
    return L.convertWorkingStackToJsonPath(this.createWorkingStack(t));
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
      if (t.type === pt)
        return n.chapterNum = s, n.verseNum = n.verseNum ?? 0, n.startingContentNode = n.startingContentNode ?? t, n;
      t.type === ht && !n.verseNum && (n.verseNum = s, n.startingContentNode = t);
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
      if (r.type === Xr)
        return n.chapterNum === void 0 && (n.chapterNum = 1, n.verseNum = 0, n.startingContentNode = void 0), n;
      const s = r, c = this.parentMap.get(s);
      if (!c) throw new Error(`No parent found for ${JSON.stringify(r)}`);
      return this.findVerseRefForNode(s, c, n);
    }
    const a = r.content[i], o = L.findRightMostDescendantMarkerObject(
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
    const a = new Jt(
      t,
      i.chapterNum.toString(),
      i.verseNum ? i.verseNum.toString() : "0"
    );
    let o = 0;
    return i.startingContentNode !== void 0 && this.findNextMatchingNode(i.startingContentNode, [], (s, c) => {
      var l, f;
      return s === r ? !0 : c.find((p) => ne.includes(p.parent.type)) ? !1 : typeof s == "string" ? (o += s.length, !1) : s.type === pt && s.number !== ((l = i.chapterNum) == null ? void 0 : l.toString()) || s.type === ht && s.number !== ((f = i.verseNum) == null ? void 0 : f.toString()) ? (o = 0, !0) : !1;
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
      (p, m) => p === u ? t.verseNum === 0 ? (a = L.convertWorkingStackToJsonPath(m), !0) : !1 : typeof p != "object" ? !1 : p.type === pt ? (i = !0, !0) : p.type === ht && p.number !== void 0 && p.number === o ? (a = L.convertWorkingStackToJsonPath(m), !0) : !1
    );
    if (i || s === void 0 || typeof s == "string")
      throw new Error(`Verse ${o} not found in ${n} ${t.chapterNum}`);
    if (r === 0) return { node: s, offset: 0, jsonPath: a };
    let c = 0, l = 0, f;
    return this.findNextMatchingNode(
      s,
      ne,
      (p, m) => {
        if (p === s) return !1;
        if (typeof p == "string") {
          if (c += p.length, c > r)
            return a = L.convertWorkingStackToJsonPath(m), l = r - c + p.length, f = p, !0;
        } else if (p.type === pt || p.type === ht) return !0;
        return !1;
      }
    ), { node: f ?? s, offset: l, jsonPath: a };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(t, r, n = 1e3) {
    let u = "", i = 0, a = 0, o = 0;
    if (L.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (f) => {
        if (typeof f != "string") return !1;
        i += f.length, u = `${u}${f}`;
        const p = u.indexOf(r);
        return p < 0 ? (a += u.length, u.length > r.length && (u = u.substring(u.length - r.length)), a -= u.length, i > n) : (o = a + p, !0);
      }
    ), o <= 0) return;
    i = 0;
    let s = 0, c = [];
    const l = L.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (f, p) => typeof f != "string" || (i += f.length, i < o + 1) ? !1 : (s = o - i + f.length, c = p, !0)
    );
    if (!l) throw new Error("Internal error: inconsistent search results");
    return {
      node: l,
      offset: s,
      jsonPath: L.convertWorkingStackToJsonPath(c)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(t, r) {
    let n = "", u = t.offset, i = 0;
    return L.findNextMatchingNodeUsingWorkingStack(
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
    return L.findNextMatchingNodeUsingWorkingStack(
      t.node,
      this.convertJsonPathToWorkingStack(t.jsonPath),
      ne,
      (i, a) => i === r.node && (typeof i == "object" || r.jsonPath === L.convertWorkingStackToJsonPath(a)) ? !0 : typeof i != "string" ? !1 : (u = `${u}${i}`, u.length > n && (u = u.substring(0, n)), u.length >= n)
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
    const r = L.removeContentNodesFromArray(this.usj.content, t);
    return this.usjChanged(), r;
  }
  // #endregion
}
export {
  ha as AsyncVariable,
  pt as CHAPTER_TYPE,
  da as Collator,
  eu as DateTimeFormat,
  iu as DocumentCombiner,
  ku as FIRST_SCR_BOOK_NUM,
  qu as FIRST_SCR_CHAPTER_NUM,
  $u as FIRST_SCR_VERSE_NUM,
  Pu as LAST_SCR_BOOK_NUM,
  au as Mutex,
  ba as MutexMap,
  ya as NonValidatingDocumentCombiner,
  su as NumberFormat,
  tu as PlatformEventEmitter,
  Ca as UnsubscriberAsyncList,
  L as UsjReaderWriter,
  ht as VERSE_TYPE,
  Ja as aggregateUnsubscriberAsyncs,
  za as aggregateUnsubscribers,
  wa as at,
  Se as charAt,
  Sa as codePointAt,
  Va as compareScrRefs,
  Na as createSyncProxyForAsyncObject,
  Ea as debounce,
  Je as deepClone,
  di as deepEqual,
  Pa as defaultScrRef,
  Ei as deserialize,
  xu as endsWith,
  un as ensureArray,
  Fa as escapeStringRegexp,
  Wa as formatBytes,
  Oa as formatReplacementString,
  Mu as formatReplacementStringToArray,
  Ga as formatScrRef,
  Aa as getAllObjectFunctionNames,
  ju as getChaptersForBook,
  Ka as getCurrentLocale,
  Da as getErrorMessage,
  Uu as getLocalizeKeyForScrollGroupId,
  Ha as getLocalizeKeysForScrollGroupIds,
  Ua as getLocalizedIdFromBookNumber,
  ga as groupBy,
  Ya as htmlEncode,
  _u as includes,
  Ye as indexOf,
  _a as isLocalizeKey,
  Xa as isSerializable,
  Dt as isString,
  mi as isSubset,
  Fu as lastIndexOf,
  vi as localizedStringsDocumentSchema,
  Ai as menuDocumentSchema,
  ma as newGuid,
  Ia as normalize,
  qa as offsetBook,
  $a as offsetChapter,
  ja as offsetVerse,
  Ba as ordinalCompare,
  xa as padEnd,
  Ra as padStart,
  gi as projectSettingsDocumentSchema,
  Dr as scrRefToBBBCCCVVV,
  Sr as serialize,
  Di as settingsDocumentSchema,
  Ma as slice,
  gr as split,
  on as startsWith,
  F as stringLength,
  pe as substring,
  Lu as toArray,
  ka as transformAndEnsureRegExpArray,
  La as transformAndEnsureRegExpRegExpArray,
  uu as wait,
  va as waitForDuration
};
//# sourceMappingURL=index.js.map
