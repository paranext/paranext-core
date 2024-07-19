var Ae = Object.defineProperty;
var De = (t, e, r) => e in t ? Ae(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var d = (t, e, r) => (De(t, typeof e != "symbol" ? e + "" : e, r), r);
import { Mutex as Me } from "async-mutex";
class sr {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, r = 1e4) {
    d(this, "variableName");
    d(this, "promiseToValue");
    d(this, "resolver");
    d(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((s, n) => {
      this.resolver = s, this.rejecter = n;
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
  resolveToValue(e, r = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(e), this.complete();
    else {
      if (r)
        throw Error(`${this.variableName} was already settled`);
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
  rejectWithReason(e, r = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
    else {
      if (r)
        throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }
  /** Prevent any further updates to this variable */
  complete() {
    this.resolver = void 0, this.rejecter = void 0, Object.freeze(this);
  }
}
class nr {
  constructor(e, r) {
    d(this, "collator");
    this.collator = new Intl.Collator(e, r);
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
  compare(e, r) {
    return this.collator.compare(e, r);
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
class Be {
  constructor(e, r) {
    d(this, "dateTimeFormatter");
    this.dateTimeFormatter = new Intl.DateTimeFormat(e, r);
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
  formatRange(e, r) {
    return this.dateTimeFormatter.formatRange(e, r);
  }
  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(e, r) {
    return this.dateTimeFormatter.formatRangeToParts(e, r);
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
class Re {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    d(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    d(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    d(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    d(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    d(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    d(this, "emit", (e) => {
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
        if (!this.subscriptions)
          return !1;
        const r = this.subscriptions.indexOf(e);
        return r < 0 ? !1 : (this.subscriptions.splice(r, 1), !0);
      };
    }), this.lazyEvent;
  }
  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  emitFn(e) {
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((s) => s(e));
  }
  /** Check to make sure this emitter is not disposed. Throw if it is */
  assertNotDisposed() {
    if (this.isDisposed)
      throw new Error("Emitter is disposed");
  }
  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  disposeFn() {
    return this.assertNotDisposed(), this.isDisposed = !0, this.subscriptions = void 0, this.lazyEvent = void 0, Promise.resolve(!0);
  }
}
function ir() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function ke(t) {
  return typeof t == "string" || t instanceof String;
}
function B(t) {
  return JSON.parse(JSON.stringify(t));
}
function or(t, e = 300) {
  if (ke(t))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => t(...s), e);
  };
}
function ar(t, e, r) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const i = e(n), o = s.get(i), a = r ? r(n, i) : n;
    o ? o.push(a) : s.set(i, [a]);
  }), s;
}
function xe(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Ve(t) {
  if (xe(t))
    return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function ur(t) {
  return Ve(t).message;
}
function qe(t) {
  return new Promise((e) => setTimeout(e, t));
}
function lr(t, e) {
  const r = qe(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function cr(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((n) => {
    try {
      typeof t[n] == "function" && r.add(n);
    } catch {
    }
  });
  let s = Object.getPrototypeOf(t);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((n) => {
      try {
        typeof t[n] == "function" && r.add(n);
      } catch {
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function fr(t, e = {}) {
  return new Proxy(e, {
    get(r, s) {
      return s in r ? r[s] : async (...n) => (await t())[s](...n);
    }
  });
}
class ze {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    d(this, "baseDocument");
    d(this, "contributions", /* @__PURE__ */ new Map());
    d(this, "latestOutput");
    d(this, "options");
    d(this, "onDidRebuildEmitter", new Re());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    d(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? B(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
  addOrUpdateContribution(e, r) {
    this.validateContribution(e, r);
    const s = this.contributions.get(e);
    let n = this.options.copyDocuments && r ? B(r) : r;
    n = this.transformContributionAfterValidation(e, n), this.contributions.set(e, n);
    try {
      return this.rebuild();
    } catch (i) {
      throw s ? this.contributions.set(e, s) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${i}`);
    }
  }
  /**
   * Delete one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to delete
   * @returns Recalculated output document given the remaining other documents
   */
  deleteContribution(e) {
    const r = this.contributions.get(e);
    if (!r)
      throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (s) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${s}`);
    }
  }
  /**
   * Delete all present contribution documents for the composition process and return to the base
   * document
   *
   * @returns Recalculated output document consisting only of the base document
   */
  deleteAllContributions() {
    if (this.contributions.size <= 0)
      return this.latestOutput;
    const e = [...this.contributions.entries()];
    e.forEach(([r]) => this.contributions.delete(r));
    try {
      return this.rebuild();
    } catch (r) {
      throw e.forEach(
        ([s, n]) => this.contributions.set(s, n)
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
      let r = B(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = Je(
        e,
        r,
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
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
  transformContributionAfterValidation(e, r) {
    return r;
  }
  /**
   * Throw an error if the provided document is not a valid starting document.
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  validateContribution(e, r) {
  }
  /**
   * Throw an error if the provided output is not valid.
   *
   * @param output Output document that could potentially be returned to callers
   */
  // no-op intended to be overridden by child classes. Can't be static
  // @ts-expect-error ts(6133) parameter doesn't need to be used but still needs the right name
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line class-methods-use-this
  transformFinalOutputBeforeValidation(e) {
    return e;
  }
}
function U(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function W(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function Je(t, e, r) {
  const s = B(t);
  return e ? he(s, B(e), r) : s;
}
function he(t, e, r) {
  if (!e)
    return t;
  if (U(t, e)) {
    const s = t, n = e;
    Object.keys(n).forEach((i) => {
      if (Object.hasOwn(s, i)) {
        if (U(s[i], n[i]))
          s[i] = he(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            s[i],
            n[i],
            r
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (W(s[i], n[i]))
          s[i] = s[i].concat(
            n[i]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${i}" already exists in the target object`);
      } else
        s[i] = n[i];
    });
  } else
    W(t, e) && t.push(...e);
  return t;
}
class Ge extends Me {
}
class hr {
  constructor() {
    d(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new Ge(), this.mutexesByID.set(e, r), r);
  }
}
class pr extends ze {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, r) {
    super(e, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class dr {
  constructor(e, r) {
    d(this, "numberFormatter");
    this.numberFormatter = new Intl.NumberFormat(e, r);
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
  formatRange(e, r) {
    return this.numberFormatter.formatRange(e, r);
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
  formatRangeToParts(e, r) {
    return this.numberFormatter.formatRangeToParts(e, r);
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
class mr {
  constructor(e = "Anonymous") {
    d(this, "unsubscribers", /* @__PURE__ */ new Set());
    this.name = e;
  }
  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...e) {
    e.forEach((r) => {
      "dispose" in r ? this.unsubscribers.add(r.dispose) : this.unsubscribers.add(r);
    });
  }
  /**
   * Run all unsubscribers added to this list and then clear the list.
   *
   * @returns `true` if all unsubscribers succeeded, `false` otherwise.
   */
  async runAllUnsubscribers() {
    const e = [...this.unsubscribers].map((s) => s()), r = await Promise.all(e);
    return this.unsubscribers.clear(), r.every((s, n) => (s || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${n} failed!`), s));
  }
}
var _e = Object.defineProperty, Fe = (t, e, r) => e in t ? _e(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, l = (t, e, r) => Fe(t, typeof e != "symbol" ? e + "" : e, r);
const j = [
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
], J = [
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
], pe = [
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
], Z = et();
function T(t, e = !0) {
  return e && (t = t.toUpperCase()), t in Z ? Z[t] : 0;
}
function G(t) {
  return T(t) > 0;
}
function Xe(t) {
  const e = typeof t == "string" ? T(t) : t;
  return e >= 40 && e <= 66;
}
function Ke(t) {
  return (typeof t == "string" ? T(t) : t) <= 39;
}
function de(t) {
  return t <= 66;
}
function He(t) {
  const e = typeof t == "string" ? T(t) : t;
  return be(e) && !de(e);
}
function* Le() {
  for (let t = 1; t <= j.length; t++)
    yield t;
}
const Ue = 1, me = j.length;
function We() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function _(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= j.length ? e : j[r];
}
function ge(t) {
  return t <= 0 || t > me ? "******" : pe[t - 1];
}
function Ze(t) {
  return ge(T(t));
}
function be(t) {
  const e = typeof t == "number" ? _(t) : t;
  return G(e) && !J.includes(e);
}
function Qe(t) {
  const e = typeof t == "number" ? _(t) : t;
  return G(e) && J.includes(e);
}
function Ye(t) {
  return pe[t - 1].includes("*obsolete*");
}
function et() {
  const t = {};
  for (let e = 0; e < j.length; e++)
    t[j[e]] = e + 1;
  return t;
}
const E = {
  allBookIds: j,
  nonCanonicalIds: J,
  bookIdToNumber: T,
  isBookIdValid: G,
  isBookNT: Xe,
  isBookOT: Ke,
  isBookOTNT: de,
  isBookDC: He,
  allBookNumbers: Le,
  firstBook: Ue,
  lastBook: me,
  extraBooks: We,
  bookNumberToId: _,
  bookNumberToEnglishName: ge,
  bookIdToEnglishName: Ze,
  isCanonical: be,
  isExtraMaterial: Qe,
  isObsolete: Ye
};
var S = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(S || {});
const N = class {
  // private versInfo: Versification;
  constructor(e) {
    if (l(this, "name"), l(this, "fullPath"), l(this, "isPresent"), l(this, "hasVerseSegments"), l(this, "isCustomized"), l(this, "baseVersification"), l(this, "scriptureBooks"), l(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = S[e]) : (this._type = e, this.name = S[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
l(N, "Original", new N(S.Original)), l(N, "Septuagint", new N(S.Septuagint)), l(N, "Vulgate", new N(S.Vulgate)), l(N, "English", new N(S.English)), l(N, "RussianProtestant", new N(S.RussianProtestant)), l(N, "RussianOrthodox", new N(S.RussianOrthodox));
let $ = N;
function Q(t, e) {
  const r = e[0];
  for (let s = 1; s < e.length; s++)
    t = t.split(e[s]).join(r);
  return t.split(r);
}
var ye = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(ye || {});
const y = class f {
  constructor(e, r, s, n) {
    if (l(this, "firstChapter"), l(this, "lastChapter"), l(this, "lastVerse"), l(this, "hasSegmentsDefined"), l(this, "text"), l(this, "BBBCCCVVVS"), l(this, "longHashCode"), l(this, "versification"), l(this, "rtlMark", "‏"), l(this, "_bookNum", 0), l(this, "_chapterNum", 0), l(this, "_verseNum", 0), l(this, "_verse"), s == null && n == null)
      if (e != null && typeof e == "string") {
        const i = e, o = r != null && r instanceof $ ? r : void 0;
        this.setEmpty(o), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = r != null && r instanceof $ ? r : void 0;
        this.setEmpty(i), this._verseNum = e % f.chapterDigitShifter, this._chapterNum = Math.floor(
          e % f.bookDigitShifter / f.chapterDigitShifter
        ), this._bookNum = Math.floor(e / f.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof f) {
          const i = e;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (e == null)
            return;
          const i = e instanceof $ ? e : f.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && s != null)
      if (typeof e == "string" && typeof r == "string" && typeof s == "string")
        this.setEmpty(n), this.updateInternal(e, r, s);
      else if (typeof e == "number" && typeof r == "number" && typeof s == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = s, this.versification = n ?? f.defaultVersification;
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
    let r;
    try {
      return r = new f(e), { success: !0, verseRef: r };
    } catch (s) {
      if (s instanceof D)
        return r = new f(), { success: !1, verseRef: r };
      throw s;
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
  static getBBBCCCVVV(e, r, s) {
    return e % f.bcvMaxValue * f.bookDigitShifter + (r >= 0 ? r % f.bcvMaxValue * f.chapterDigitShifter : 0) + (s >= 0 ? s % f.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: r, chapterNum: s, verseNum: n, verse: i, versificationStr: o } = e, a = i || n.toString();
    let h;
    return o && (h = new $(o)), r ? new f(r, s.toString(), a, h) : new f();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let r;
    if (!e)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let s;
    for (let n = 0; n < e.length; n++) {
      if (s = e[n], s < "0" || s > "9")
        return n === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +s - 0, r > f.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(f.verseRangeSeparator) || this._verse.includes(f.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return E.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = E.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const r = +e;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: r, vNum: s } = f.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = s, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = f.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > E.lastBook)
      throw new D(
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
    this.versification = this.versification != null ? new $(e) : void 0;
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
    return this.validateVerse(f.verseRangeSeparators, f.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return f.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return f.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const i = e.split("/");
      if (e = i[0], i.length > 1)
        try {
          const o = +i[1].trim();
          this.versification = new $(S[o]);
        } catch {
          throw new D("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new D("Invalid reference : " + e);
    const s = r[1].split(":"), n = +s[0];
    if (s.length !== 2 || E.bookIdToNumber(r[0]) === 0 || !Number.isInteger(n) || n < 0 || !f.isVerseParseable(s[1]))
      throw new D("Invalid reference : " + e);
    this.updateInternal(r[0], s[0], s[1]);
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
    return new f(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    return (e === "" || e === this.verseNum.toString()) && (e = void 0), {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof f ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, r = f.verseRangeSeparators, s = f.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const n = [], i = Q(this._verse, s);
    for (const o of i.map((a) => Q(a, r))) {
      const a = this.clone();
      a.verse = o[0];
      const h = a.verseNum;
      if (n.push(a), o.length > 1) {
        const p = this.clone();
        if (p.verse = o[1], !e)
          for (let u = h + 1; u < p.verseNum; u++) {
            const c = new f(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || n.push(c);
          }
        n.push(p);
      }
    }
    return n;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, r) {
    if (!this.verse)
      return this.internalValid;
    let s = 0;
    for (const n of this.allVerses(!0, e, r)) {
      const i = n.internalValid;
      if (i !== 0)
        return i;
      const o = n.BBBCCCVVV;
      if (s > o)
        return 3;
      if (s === o)
        return 4;
      s = o;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > E.lastBook ? 2 : (E.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = f.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, s) {
    this.bookNum = E.bookIdToNumber(e), this.chapter = r, this.verse = s;
  }
};
l(y, "defaultVersification", $.English), l(y, "verseRangeSeparator", "-"), l(y, "verseSequenceIndicator", ","), l(y, "verseRangeSeparators", [y.verseRangeSeparator]), l(y, "verseSequenceIndicators", [y.verseSequenceIndicator]), l(y, "chapterDigitShifter", 1e3), l(y, "bookDigitShifter", y.chapterDigitShifter * y.chapterDigitShifter), l(y, "bcvMaxValue", y.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
l(y, "ValidStatusType", ye);
let tt = y;
class D extends Error {
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, C = {}, rt = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", n = "\\u1ab0-\\u1aff", i = "\\u1dc0-\\u1dff", o = e + r + s + n + i, a = "\\ufe0e\\ufe0f", h = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", p = `[${t}]`, u = `[${o}]`, c = "\\ud83c[\\udffb-\\udfff]", m = `(?:${u}|${c})`, v = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", A = "[\\ud800-\\udbff][\\udc00-\\udfff]", q = "\\u200d", je = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", Ce = `[${h}]`, H = `${m}?`, L = `[${a}]?`, Ie = `(?:${q}(?:${[v, b, A].join("|")})${L + H})*`, Te = L + H + Ie, Pe = `(?:${[`${v}${u}?`, u, b, A, p, Ce].join("|")})`;
  return new RegExp(`${je}|${c}(?=${c})|${Pe + Te}`, "g");
}, st = Y && Y.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(C, "__esModule", { value: !0 });
var x = st(rt);
function z(t) {
  if (typeof t != "string")
    throw new Error("A string is expected as input");
  return t.match(x.default()) || [];
}
var nt = C.toArray = z;
function F(t) {
  if (typeof t != "string")
    throw new Error("Input must be a string");
  var e = t.match(x.default());
  return e === null ? 0 : e.length;
}
var it = C.length = F;
function ve(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  (typeof e != "number" || e < 0) && (e = 0), typeof r == "number" && r < 0 && (r = 0);
  var s = t.match(x.default());
  return s ? s.slice(e, r).join("") : "";
}
var ot = C.substring = ve;
function at(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  var s = F(t);
  if (typeof e != "number" && (e = parseInt(e, 10)), e >= s)
    return "";
  e < 0 && (e += s);
  var n;
  typeof r > "u" ? n = s : (typeof r != "number" && (r = parseInt(r, 10)), n = r >= 0 ? r + e : e);
  var i = t.match(x.default());
  return i ? i.slice(e, n).join("") : "";
}
var ut = C.substr = at;
function lt(t, e, r, s) {
  if (e === void 0 && (e = 16), r === void 0 && (r = "#"), s === void 0 && (s = "right"), typeof t != "string" || typeof e != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(s) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var n = F(t);
  if (n > e)
    return ve(t, 0, e);
  if (n < e) {
    var i = r.repeat(e - n);
    return s === "left" ? i + t : t + i;
  }
  return t;
}
var Ne = C.limit = lt;
function ct(t, e, r) {
  if (r === void 0 && (r = 0), typeof t != "string")
    throw new Error("Input must be a string");
  if (t === "")
    return e === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, e = String(e);
  var s = z(t);
  if (r >= s.length)
    return e === "" ? s.length : -1;
  if (e === "")
    return r;
  var n = z(e), i = !1, o;
  for (o = r; o < s.length; o += 1) {
    for (var a = 0; a < n.length && n[a] === s[o + a]; )
      a += 1;
    if (a === n.length && n[a - 1] === s[o + a - 1]) {
      i = !0;
      break;
    }
  }
  return i ? o : -1;
}
var ft = C.indexOf = ct;
function br(t, e) {
  if (!(e > g(t) || e < -g(t)))
    return V(t, e, 1);
}
function I(t, e) {
  return e < 0 || e > g(t) - 1 ? "" : V(t, e, 1);
}
function yr(t, e) {
  if (!(e < 0 || e > g(t) - 1))
    return V(t, e, 1).codePointAt(0);
}
function ht(t, e, r = g(t)) {
  const s = mt(t, e);
  return !(s === -1 || s + g(e) !== r);
}
function pt(t, e, r) {
  if (e < 0)
    return -1;
  if (r) {
    if (I(t, e) === "}" && I(t, e - 1) === "\\")
      return e;
    const i = R(t, "\\}", e);
    return i >= 0 ? i + 1 : i;
  }
  let s = e;
  const n = g(t);
  for (; s < n && (s = R(t, "}", s), !(s === -1 || I(t, s - 1) !== "\\")); )
    s += 1;
  return s >= n ? -1 : s;
}
function vr(t, e) {
  let r = t, s = 0;
  for (; s < g(r); ) {
    switch (I(r, s)) {
      case "{":
        if (I(r, s - 1) !== "\\") {
          const n = pt(r, s, !1);
          if (n >= 0) {
            const i = w(r, s + 1, n), o = i in e ? e[i] : i;
            r = `${w(r, 0, s)}${o}${w(r, n + 1)}`, s = n + g(o) - g(i) - 2;
          }
        } else
          r = `${w(r, 0, s - 1)}${w(r, s)}`, s -= 1;
        break;
      case "}":
        I(r, s - 1) !== "\\" || (r = `${w(r, 0, s - 1)}${w(r, s)}`, s -= 1);
        break;
    }
    s += 1;
  }
  return r;
}
function dt(t, e, r = 0) {
  const s = w(t, r);
  return R(s, e) !== -1;
}
function R(t, e, r = 0) {
  return ft(t, e, r);
}
function mt(t, e, r) {
  let s = r === void 0 ? g(t) : r;
  s < 0 ? s = 0 : s >= g(t) && (s = g(t) - 1);
  for (let n = s; n >= 0; n--)
    if (V(t, n, g(e)) === e)
      return n;
  return -1;
}
function g(t) {
  return it(t);
}
function Nr(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function wr(t, e, r) {
  return t.localeCompare(e, "en", r);
}
function Er(t, e, r = " ") {
  return e <= g(t) ? t : Ne(t, e, r, "right");
}
function Sr(t, e, r = " ") {
  return e <= g(t) ? t : Ne(t, e, r, "left");
}
function ee(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function Or(t, e, r) {
  const s = g(t);
  if (e > s || r && (e > r && !(e >= 0 && e < s && r < 0 && r > -s) || r < -s))
    return "";
  const n = ee(s, e), i = r ? ee(s, r) : void 0;
  return w(t, n, i);
}
function te(t, e, r) {
  const s = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "")
    return gt(t).slice(0, r);
  let n = e;
  (typeof e == "string" || e instanceof RegExp && !dt(e.flags, "g")) && (n = new RegExp(e, "g"));
  const i = t.match(n);
  let o = 0;
  if (!i)
    return [t];
  for (let a = 0; a < (r ? r - 1 : i.length); a++) {
    const h = R(t, i[a], o), p = g(i[a]);
    if (s.push(w(t, o, h)), o = h + p, r !== void 0 && s.length === r)
      break;
  }
  return s.push(w(t, o)), s;
}
function we(t, e, r = 0) {
  return R(t, e, r) === r;
}
function V(t, e = 0, r = g(t) - e) {
  return ut(t, e, r);
}
function w(t, e, r = g(t)) {
  return ot(t, e, r);
}
function gt(t) {
  return nt(t);
}
function $r(t) {
  return we(t, "%") && ht(t, "%");
}
function jr(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
const Ee = [
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
], bt = 1, yt = Ee.length - 1, vt = 1, Nt = 1, wt = (t) => {
  var e;
  return ((e = Ee[t]) == null ? void 0 : e.chapters) ?? -1;
}, Cr = (t, e) => ({
  bookNum: Math.max(bt, Math.min(t.bookNum + e, yt)),
  chapterNum: 1,
  verseNum: 1
}), Ir = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(vt, t.chapterNum + e),
    wt(t.bookNum)
  ),
  verseNum: 1
}), Tr = (t, e) => ({
  ...t,
  verseNum: Math.max(Nt, t.verseNum + e)
});
async function Pr(t, e, r) {
  const s = E.bookNumberToId(t);
  if (!we(Intl.getCanonicalLocales(e)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${s}`,
      languagesToSearch: [e]
    });
  const n = await r({
    localizeKey: `Book.${s}`,
    languagesToSearch: [e]
  }), i = te(n, "-");
  return te(i[0], "ÿ08")[0].trim();
}
function re(t) {
  return new tt(t.bookNum, t.chapterNum, t.verseNum).BBBCCCVVV;
}
function Ar(t, e) {
  return re(t) - re(e);
}
function Dr(t, e, r, s) {
  let n;
  switch (e ?? "id") {
    case "English":
      n = E.bookNumberToEnglishName(t.bookNum);
      break;
    case "id":
      n = E.bookNumberToId(t.bookNum);
      break;
    default:
      n = e ?? "";
      break;
  }
  return `${n}${s ?? " "}${t.chapterNum}${r ?? ":"}${t.verseNum}`;
}
const Mr = (t) => (...e) => t.map((s) => s(...e)).every((s) => s), Br = (t) => async (...e) => {
  const r = t.map(async (s) => s(...e));
  return (await Promise.all(r)).every((s) => s);
};
var Et = Object.getOwnPropertyNames, St = Object.getOwnPropertySymbols, Ot = Object.prototype.hasOwnProperty;
function se(t, e) {
  return function(s, n, i) {
    return t(s, n, i) && e(s, n, i);
  };
}
function k(t) {
  return function(r, s, n) {
    if (!r || !s || typeof r != "object" || typeof s != "object")
      return t(r, s, n);
    var i = n.cache, o = i.get(r), a = i.get(s);
    if (o && a)
      return o === s && a === r;
    i.set(r, s), i.set(s, r);
    var h = t(r, s, n);
    return i.delete(r), i.delete(s), h;
  };
}
function ne(t) {
  return Et(t).concat(St(t));
}
var Se = Object.hasOwn || function(t, e) {
  return Ot.call(t, e);
};
function P(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var Oe = "_owner", ie = Object.getOwnPropertyDescriptor, oe = Object.keys;
function $t(t, e, r) {
  var s = t.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(t[s], e[s], s, s, t, e, r))
      return !1;
  return !0;
}
function jt(t, e) {
  return P(t.getTime(), e.getTime());
}
function ae(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.entries(), i = 0, o, a; (o = n.next()) && !o.done; ) {
    for (var h = e.entries(), p = !1, u = 0; (a = h.next()) && !a.done; ) {
      var c = o.value, m = c[0], v = c[1], b = a.value, A = b[0], q = b[1];
      !p && !s[u] && (p = r.equals(m, A, i, u, t, e, r) && r.equals(v, q, m, A, t, e, r)) && (s[u] = !0), u++;
    }
    if (!p)
      return !1;
    i++;
  }
  return !0;
}
function Ct(t, e, r) {
  var s = oe(t), n = s.length;
  if (oe(e).length !== n)
    return !1;
  for (var i; n-- > 0; )
    if (i = s[n], i === Oe && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !Se(e, i) || !r.equals(t[i], e[i], i, i, t, e, r))
      return !1;
  return !0;
}
function M(t, e, r) {
  var s = ne(t), n = s.length;
  if (ne(e).length !== n)
    return !1;
  for (var i, o, a; n-- > 0; )
    if (i = s[n], i === Oe && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !Se(e, i) || !r.equals(t[i], e[i], i, i, t, e, r) || (o = ie(t, i), a = ie(e, i), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function It(t, e) {
  return P(t.valueOf(), e.valueOf());
}
function Tt(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function ue(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.values(), i, o; (i = n.next()) && !i.done; ) {
    for (var a = e.values(), h = !1, p = 0; (o = a.next()) && !o.done; )
      !h && !s[p] && (h = r.equals(i.value, o.value, i.value, o.value, t, e, r)) && (s[p] = !0), p++;
    if (!h)
      return !1;
  }
  return !0;
}
function Pt(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var At = "[object Arguments]", Dt = "[object Boolean]", Mt = "[object Date]", Bt = "[object Map]", Rt = "[object Number]", kt = "[object Object]", xt = "[object RegExp]", Vt = "[object Set]", qt = "[object String]", zt = Array.isArray, le = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, ce = Object.assign, Jt = Object.prototype.toString.call.bind(Object.prototype.toString);
function Gt(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, s = t.areMapsEqual, n = t.areObjectsEqual, i = t.arePrimitiveWrappersEqual, o = t.areRegExpsEqual, a = t.areSetsEqual, h = t.areTypedArraysEqual;
  return function(u, c, m) {
    if (u === c)
      return !0;
    if (u == null || c == null || typeof u != "object" || typeof c != "object")
      return u !== u && c !== c;
    var v = u.constructor;
    if (v !== c.constructor)
      return !1;
    if (v === Object)
      return n(u, c, m);
    if (zt(u))
      return e(u, c, m);
    if (le != null && le(u))
      return h(u, c, m);
    if (v === Date)
      return r(u, c, m);
    if (v === RegExp)
      return o(u, c, m);
    if (v === Map)
      return s(u, c, m);
    if (v === Set)
      return a(u, c, m);
    var b = Jt(u);
    return b === Mt ? r(u, c, m) : b === xt ? o(u, c, m) : b === Bt ? s(u, c, m) : b === Vt ? a(u, c, m) : b === kt ? typeof u.then != "function" && typeof c.then != "function" && n(u, c, m) : b === At ? n(u, c, m) : b === Dt || b === Rt || b === qt ? i(u, c, m) : !1;
  };
}
function _t(t) {
  var e = t.circular, r = t.createCustomConfig, s = t.strict, n = {
    areArraysEqual: s ? M : $t,
    areDatesEqual: jt,
    areMapsEqual: s ? se(ae, M) : ae,
    areObjectsEqual: s ? M : Ct,
    arePrimitiveWrappersEqual: It,
    areRegExpsEqual: Tt,
    areSetsEqual: s ? se(ue, M) : ue,
    areTypedArraysEqual: s ? M : Pt
  };
  if (r && (n = ce({}, n, r(n))), e) {
    var i = k(n.areArraysEqual), o = k(n.areMapsEqual), a = k(n.areObjectsEqual), h = k(n.areSetsEqual);
    n = ce({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: h
    });
  }
  return n;
}
function Ft(t) {
  return function(e, r, s, n, i, o, a) {
    return t(e, r, a);
  };
}
function Xt(t) {
  var e = t.circular, r = t.comparator, s = t.createState, n = t.equals, i = t.strict;
  if (s)
    return function(h, p) {
      var u = s(), c = u.cache, m = c === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : c, v = u.meta;
      return r(h, p, {
        cache: m,
        equals: n,
        meta: v,
        strict: i
      });
    };
  if (e)
    return function(h, p) {
      return r(h, p, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: i
      });
    };
  var o = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: i
  };
  return function(h, p) {
    return r(h, p, o);
  };
}
var Kt = O();
O({ strict: !0 });
O({ circular: !0 });
O({
  circular: !0,
  strict: !0
});
O({
  createInternalComparator: function() {
    return P;
  }
});
O({
  strict: !0,
  createInternalComparator: function() {
    return P;
  }
});
O({
  circular: !0,
  createInternalComparator: function() {
    return P;
  }
});
O({
  circular: !0,
  createInternalComparator: function() {
    return P;
  },
  strict: !0
});
function O(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, s = t.createInternalComparator, n = t.createState, i = t.strict, o = i === void 0 ? !1 : i, a = _t(t), h = Gt(a), p = s ? s(h) : Ft(h);
  return Xt({ circular: r, comparator: h, createState: n, equals: p, strict: o });
}
function Ht(t, e) {
  return Kt(t, e);
}
function Lt(t, e) {
  if (typeof t != typeof e)
    return !1;
  if (!t && !e)
    return !0;
  if (Array.isArray(t)) {
    const i = e, o = t;
    return i.length === 0 ? !0 : i.every((a) => o.includes(a));
  }
  if (typeof t != "object")
    return Ht(t, e);
  const r = e, s = t;
  let n = !0;
  return Object.keys(r).forEach((i) => {
    n && (Object.hasOwn(s, i) && Lt(s[i], r[i]) || (n = !1));
  }), n;
}
function fe(t, e, r) {
  return JSON.stringify(t, (n, i) => {
    let o = i;
    return e && (o = e(n, o)), o === void 0 && (o = null), o;
  }, r);
}
function Ut(t, e) {
  function r(n) {
    return Object.keys(n).forEach((i) => {
      n[i] === null ? n[i] = void 0 : typeof n[i] == "object" && (n[i] = r(n[i]));
    }), n;
  }
  const s = JSON.parse(t, e);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function Rr(t) {
  try {
    const e = fe(t);
    return e === fe(Ut(e));
  } catch {
    return !1;
  }
}
const kr = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function xr() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new Be().resolvedOptions().locale;
}
const X = {
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
function K(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && K(e.properties);
    }
  });
}
K(X);
const Wt = {
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
  $defs: X
};
Object.freeze(Wt);
const Zt = {
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
  $defs: X
};
Object.freeze(Zt);
const $e = {
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
        description: "Localized string key from which to get this value if one does not exist in the specified language. If a new key/value pair needs to be made to replace an existing one, this could help smooth over the transition if the meanings are close enough",
        $ref: "#/$defs/localizeKey"
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
K($e);
const Qt = {
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
  $defs: $e
};
Object.freeze(Qt);
const Yt = {
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
              description: "Path to the icon to display before the menu text",
              type: "string"
            },
            iconPathAfter: {
              description: "Path to the icon to display after the menu text",
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
Object.freeze(Yt);
export {
  sr as AsyncVariable,
  nr as Collator,
  Be as DateTimeFormat,
  ze as DocumentCombiner,
  bt as FIRST_SCR_BOOK_NUM,
  vt as FIRST_SCR_CHAPTER_NUM,
  Nt as FIRST_SCR_VERSE_NUM,
  yt as LAST_SCR_BOOK_NUM,
  Ge as Mutex,
  hr as MutexMap,
  pr as NonValidatingDocumentCombiner,
  dr as NumberFormat,
  Re as PlatformEventEmitter,
  mr as UnsubscriberAsyncList,
  Br as aggregateUnsubscriberAsyncs,
  Mr as aggregateUnsubscribers,
  br as at,
  I as charAt,
  yr as codePointAt,
  Ar as compareScrRefs,
  fr as createSyncProxyForAsyncObject,
  or as debounce,
  B as deepClone,
  Ht as deepEqual,
  Ut as deserialize,
  ht as endsWith,
  jr as escapeStringRegexp,
  vr as formatReplacementString,
  Dr as formatScrRef,
  cr as getAllObjectFunctionNames,
  wt as getChaptersForBook,
  xr as getCurrentLocale,
  ur as getErrorMessage,
  Pr as getLocalizedIdFromBookNumber,
  ar as groupBy,
  kr as htmlEncode,
  dt as includes,
  R as indexOf,
  $r as isLocalizeKey,
  Rr as isSerializable,
  ke as isString,
  Lt as isSubset,
  mt as lastIndexOf,
  Qt as localizedStringsDocumentSchema,
  Yt as menuDocumentSchema,
  ir as newGuid,
  Nr as normalize,
  Cr as offsetBook,
  Ir as offsetChapter,
  Tr as offsetVerse,
  wr as ordinalCompare,
  Er as padEnd,
  Sr as padStart,
  Wt as projectSettingsDocumentSchema,
  re as scrRefToBBBCCCVVV,
  fe as serialize,
  Zt as settingsDocumentSchema,
  Or as slice,
  te as split,
  we as startsWith,
  g as stringLength,
  w as substring,
  gt as toArray,
  qe as wait,
  lr as waitForDuration
};
//# sourceMappingURL=index.js.map
