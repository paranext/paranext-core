var _r = Object.defineProperty;
var Lr = (t, e, r) => e in t ? _r(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var E = (t, e, r) => Lr(t, typeof e != "symbol" ? e + "" : e, r);
import { Mutex as Vr } from "async-mutex";
import { JSONPath as gt } from "jsonpath-plus";
class Un {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(e, r = 1e4) {
    E(this, "variableName");
    E(this, "promiseToValue");
    E(this, "resolver");
    E(this, "rejecter");
    this.variableName = e, this.promiseToValue = new Promise((u, n) => {
      this.resolver = u, this.rejecter = n;
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
  rejectWithReason(e, r = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(e), this.complete();
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
class zn {
  constructor(e, r) {
    E(this, "collator");
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
class Ur {
  constructor(e, r) {
    E(this, "dateTimeFormatter");
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
class zr {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    E(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    E(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    E(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    E(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    E(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    E(this, "emit", (e) => {
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
    this.assertNotDisposed(), [...this.subscriptions ?? []].forEach((u) => u(e));
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
function Gn() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function Gr(t) {
  return typeof t == "string" || t instanceof String;
}
function Ee(t) {
  return JSON.parse(JSON.stringify(t));
}
function Jn(t, e = 300) {
  if (Gr(t)) throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...u) => {
    clearTimeout(r), r = setTimeout(() => t(...u), e);
  };
}
function Hn(t, e, r) {
  const u = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const i = e(n), o = u.get(i), a = r ? r(n, i) : n;
    o ? o.push(a) : u.set(i, [a]);
  }), u;
}
function Jr(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Hr(t) {
  if (Jr(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function Xn(t) {
  return Hr(t).message;
}
function Xr(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Kn(t, e) {
  const r = Xr(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function Wn(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((n) => {
    try {
      typeof t[n] == "function" && r.add(n);
    } catch {
    }
  });
  let u = Object.getPrototypeOf(t);
  for (; u && Object.getPrototypeOf(u); )
    Object.getOwnPropertyNames(u).forEach((n) => {
      try {
        typeof t[n] == "function" && r.add(n);
      } catch {
      }
    }), u = Object.getPrototypeOf(u);
  return r;
}
function Yn(t, e = {}) {
  return new Proxy(e, {
    get(r, u) {
      return u in r ? r[u] : async (...n) => (await t())[u](...n);
    }
  });
}
class Kr {
  /**
   * Create a DocumentCombiner instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    E(this, "baseDocument");
    E(this, "contributions", /* @__PURE__ */ new Map());
    E(this, "latestOutput");
    E(this, "options");
    E(this, "onDidRebuildEmitter", new zr());
    /** Event that emits to announce that the document has been rebuilt and the output has been updated */
    // Need `onDidRebuildEmitter` to be instantiated before this line
    // eslint-disable-next-line @typescript-eslint/member-ordering
    E(this, "onDidRebuild", this.onDidRebuildEmitter.subscribe);
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateBaseDocument(e), this.baseDocument = this.options.copyDocuments ? Ee(e) : e, this.baseDocument = this.transformBaseDocumentAfterValidation(this.baseDocument), this.rebuild();
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
    const u = this.contributions.get(e);
    let n = this.options.copyDocuments && r ? Ee(r) : r;
    n = this.transformContributionAfterValidation(e, n), this.contributions.set(e, n);
    try {
      return this.rebuild();
    } catch (i) {
      throw u ? this.contributions.set(e, u) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${i}`);
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
    if (!r) throw new Error(`${e} does not exist`);
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (u) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${u}`);
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
    e.forEach(([r]) => this.contributions.delete(r));
    try {
      return this.rebuild();
    } catch (r) {
      throw e.forEach(
        ([u, n]) => this.contributions.set(u, n)
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
      let r = Ee(this.baseDocument);
      return r = this.transformFinalOutputBeforeValidation(r), this.validateOutput(r), this.latestOutput = r, this.onDidRebuildEmitter.emit(void 0), this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = Wr(
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
function Dt(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function vt(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function Wr(t, e, r) {
  const u = Ee(t);
  return e ? Kt(u, Ee(e), r) : u;
}
function Kt(t, e, r) {
  if (!e) return t;
  if (Dt(t, e)) {
    const u = t, n = e;
    Object.keys(n).forEach((i) => {
      if (Object.hasOwn(u, i)) {
        if (Dt(u[i], n[i]))
          u[i] = Kt(
            // We know these are objects from the `if` check
            /* eslint-disable no-type-assertion/no-type-assertion */
            u[i],
            n[i],
            r
            /* eslint-enable no-type-assertion/no-type-assertion */
          );
        else if (vt(u[i], n[i]))
          u[i] = u[i].concat(
            n[i]
          );
        else if (!r)
          throw new Error(`Cannot merge objects: key "${i}" already exists in the target object`);
      } else
        u[i] = n[i];
    });
  } else vt(t, e) && t.push(...e);
  return t;
}
class Yr extends Vr {
}
class Zn {
  constructor() {
    E(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new Yr(), this.mutexesByID.set(e, r), r);
  }
}
class Qn extends Kr {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, r) {
    super(e, r);
  }
  get output() {
    return this.latestOutput;
  }
}
class Zr {
  constructor(e, r) {
    E(this, "numberFormatter");
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
class ei {
  constructor(e = "Anonymous") {
    E(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    const e = [...this.unsubscribers].map((u) => u()), r = await Promise.all(e);
    return this.unsubscribers.clear(), r.every((u, n) => (u || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${n} failed!`), u));
  }
}
var Qr = Object.defineProperty, eu = (t, e, r) => e in t ? Qr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, d = (t, e, r) => eu(t, typeof e != "symbol" ? e + "" : e, r);
const ee = [
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
], Ye = [
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
], Wt = [
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
], bt = lu();
function pe(t, e = !0) {
  return e && (t = t.toUpperCase()), t in bt ? bt[t] : 0;
}
function Ze(t) {
  return pe(t) > 0;
}
function tu(t) {
  const e = typeof t == "string" ? pe(t) : t;
  return e >= 40 && e <= 66;
}
function ru(t) {
  return (typeof t == "string" ? pe(t) : t) <= 39;
}
function Yt(t) {
  return t <= 66;
}
function uu(t) {
  const e = typeof t == "string" ? pe(t) : t;
  return er(e) && !Yt(e);
}
function* nu() {
  for (let t = 1; t <= ee.length; t++) yield t;
}
const iu = 1, Zt = ee.length;
function ou() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Qe(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= ee.length ? e : ee[r];
}
function Qt(t) {
  return t <= 0 || t > Zt ? "******" : Wt[t - 1];
}
function au(t) {
  return Qt(pe(t));
}
function er(t) {
  const e = typeof t == "number" ? Qe(t) : t;
  return Ze(e) && !Ye.includes(e);
}
function su(t) {
  const e = typeof t == "number" ? Qe(t) : t;
  return Ze(e) && Ye.includes(e);
}
function cu(t) {
  return Wt[t - 1].includes("*obsolete*");
}
function lu() {
  const t = {};
  for (let e = 0; e < ee.length; e++)
    t[ee[e]] = e + 1;
  return t;
}
const _ = {
  allBookIds: ee,
  nonCanonicalIds: Ye,
  bookIdToNumber: pe,
  isBookIdValid: Ze,
  isBookNT: tu,
  isBookOT: ru,
  isBookOTNT: Yt,
  isBookDC: uu,
  allBookNumbers: nu,
  firstBook: iu,
  lastBook: Zt,
  extraBooks: ou,
  bookNumberToId: Qe,
  bookNumberToEnglishName: Qt,
  bookIdToEnglishName: au,
  isCanonical: er,
  isExtraMaterial: su,
  isObsolete: cu
};
var L = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(L || {});
const $ = class {
  // private versInfo: Versification;
  constructor(e) {
    if (d(this, "name"), d(this, "fullPath"), d(this, "isPresent"), d(this, "hasVerseSegments"), d(this, "isCustomized"), d(this, "baseVersification"), d(this, "scriptureBooks"), d(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = L[e]) : (this._type = e, this.name = L[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
d($, "Original", new $(L.Original)), d($, "Septuagint", new $(L.Septuagint)), d($, "Vulgate", new $(L.Vulgate)), d($, "English", new $(L.English)), d($, "RussianProtestant", new $(L.RussianProtestant)), d($, "RussianOrthodox", new $(L.RussianOrthodox));
let Q = $;
function Et(t, e) {
  const r = e[0];
  for (let u = 1; u < e.length; u++)
    t = t.split(e[u]).join(r);
  return t.split(r);
}
var tr = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(tr || {});
const I = class m {
  constructor(e, r, u, n) {
    if (d(this, "firstChapter"), d(this, "lastChapter"), d(this, "lastVerse"), d(this, "hasSegmentsDefined"), d(this, "text"), d(this, "BBBCCCVVVS"), d(this, "longHashCode"), d(this, "versification"), d(this, "rtlMark", "‏"), d(this, "_bookNum", 0), d(this, "_chapterNum", 0), d(this, "_verseNum", 0), d(this, "_verse"), u == null && n == null)
      if (e != null && typeof e == "string") {
        const i = e, o = r != null && r instanceof Q ? r : void 0;
        this.setEmpty(o), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = r != null && r instanceof Q ? r : void 0;
        this.setEmpty(i), this._verseNum = e % m.chapterDigitShifter, this._chapterNum = Math.floor(
          e % m.bookDigitShifter / m.chapterDigitShifter
        ), this._bookNum = Math.floor(e / m.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof m) {
          const i = e;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (e == null) return;
          const i = e instanceof Q ? e : m.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && u != null)
      if (typeof e == "string" && typeof r == "string" && typeof u == "string")
        this.setEmpty(n), this.updateInternal(e, r, u);
      else if (typeof e == "number" && typeof r == "number" && typeof u == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = u, this.versification = n ?? m.defaultVersification;
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
      return r = new m(e), { success: !0, verseRef: r };
    } catch (u) {
      if (u instanceof me)
        return r = new m(), { success: !1, verseRef: r };
      throw u;
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
  static getBBBCCCVVV(e, r, u) {
    return e % m.bcvMaxValue * m.bookDigitShifter + (r >= 0 ? r % m.bcvMaxValue * m.chapterDigitShifter : 0) + (u >= 0 ? u % m.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: r, chapterNum: u, verseNum: n, verse: i, versificationStr: o } = e, a = i || n.toString();
    let s;
    return o && (s = new Q(o)), r ? new m(r, u.toString(), a, s) : new m();
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
    let u;
    for (let n = 0; n < e.length; n++) {
      if (u = e[n], u < "0" || u > "9")
        return n === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +u - 0, r > m.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(m.verseRangeSeparator) || this._verse.includes(m.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return _.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = _.bookIdToNumber(e);
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
    const { success: r, vNum: u } = m.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = u, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = m.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > _.lastBook)
      throw new me(
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
    this.versification = this.versification != null ? new Q(e) : void 0;
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
    return this.validateVerse(m.verseRangeSeparators, m.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return m.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return m.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Q(L[o]);
        } catch {
          throw new me("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new me("Invalid reference : " + e);
    const u = r[1].split(":"), n = +u[0];
    if (u.length !== 2 || _.bookIdToNumber(r[0]) === 0 || !Number.isInteger(n) || n < 0 || !m.isVerseParseable(u[1]))
      throw new me("Invalid reference : " + e);
    this.updateInternal(r[0], u[0], u[1]);
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
    return new m(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete r.verse, r;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof m ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, r = m.verseRangeSeparators, u = m.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const n = [], i = Et(this._verse, u);
    for (const o of i.map((a) => Et(a, r))) {
      const a = this.clone();
      a.verse = o[0];
      const s = a.verseNum;
      if (n.push(a), o.length > 1) {
        const l = this.clone();
        if (l.verse = o[1], !e)
          for (let c = s + 1; c < l.verseNum; c++) {
            const p = new m(
              this._bookNum,
              this._chapterNum,
              c,
              this.versification
            );
            this.isExcluded || n.push(p);
          }
        n.push(l);
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
    let u = 0;
    for (const n of this.allVerses(!0, e, r)) {
      const i = n.internalValid;
      if (i !== 0)
        return i;
      const o = n.BBBCCCVVV;
      if (u > o)
        return 3;
      if (u === o)
        return 4;
      u = o;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > _.lastBook ? 2 : (_.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = m.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, u) {
    this.bookNum = _.bookIdToNumber(e), this.chapter = r, this.verse = u;
  }
};
d(I, "defaultVersification", Q.English), d(I, "verseRangeSeparator", "-"), d(I, "verseSequenceIndicator", ","), d(I, "verseRangeSeparators", [I.verseRangeSeparator]), d(I, "verseSequenceIndicators", [I.verseSequenceIndicator]), d(I, "chapterDigitShifter", 1e3), d(I, "bookDigitShifter", I.chapterDigitShifter * I.chapterDigitShifter), d(I, "bcvMaxValue", I.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
d(I, "ValidStatusType", tr);
let rr = I;
class me extends Error {
}
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, re = {}, fu = () => {
  const t = "\\ud800-\\udfff", o = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", a = "\\ufe0e\\ufe0f", s = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", l = `[${t}]`, c = `[${o}]`, p = "\\ud83c[\\udffb-\\udfff]", f = `(?:${c}|${p})`, h = `[^${t}]`, g = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", v = "[\\ud800-\\udbff][\\udc00-\\udfff]", b = "\\u200d", y = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", Z = `[${s}]`, A = `${f}?`, O = `[${a}]?`, de = `(?:${b}(?:${[h, g, v].join("|")})${O + A})*`, Se = O + A + de, Oe = `(?:${[`${h}${c}?`, c, g, v, l, Z].join("|")})`;
  return new RegExp(`${y}|${p}(?=${p})|${Oe + Se}`, "g");
}, pu = At && At.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(re, "__esModule", { value: !0 });
var je = pu(fu);
function He(t) {
  if (typeof t != "string")
    throw new Error("A string is expected as input");
  return t.match(je.default()) || [];
}
var hu = re.toArray = He;
function et(t) {
  if (typeof t != "string")
    throw new Error("Input must be a string");
  var e = t.match(je.default());
  return e === null ? 0 : e.length;
}
var du = re.length = et;
function ur(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  (typeof e != "number" || e < 0) && (e = 0), typeof r == "number" && r < 0 && (r = 0);
  var u = t.match(je.default());
  return u ? u.slice(e, r).join("") : "";
}
var mu = re.substring = ur;
function gu(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  var u = et(t);
  if (typeof e != "number" && (e = parseInt(e, 10)), e >= u)
    return "";
  e < 0 && (e += u);
  var n;
  typeof r > "u" ? n = u : (typeof r != "number" && (r = parseInt(r, 10)), n = r >= 0 ? r + e : e);
  var i = t.match(je.default());
  return i ? i.slice(e, n).join("") : "";
}
var Du = re.substr = gu;
function vu(t, e, r, u) {
  if (e === void 0 && (e = 16), r === void 0 && (r = "#"), u === void 0 && (u = "right"), typeof t != "string" || typeof e != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(u) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var n = et(t);
  if (n > e)
    return ur(t, 0, e);
  if (n < e) {
    var i = r.repeat(e - n);
    return u === "left" ? i + t : t + i;
  }
  return t;
}
var nr = re.limit = vu;
function bu(t, e, r) {
  if (r === void 0 && (r = 0), typeof t != "string")
    throw new Error("Input must be a string");
  if (t === "")
    return e === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, e = String(e);
  var u = He(t);
  if (r >= u.length)
    return e === "" ? u.length : -1;
  if (e === "")
    return r;
  var n = He(e), i = !1, o;
  for (o = r; o < u.length; o += 1) {
    for (var a = 0; a < n.length && n[a] === u[o + a]; )
      a += 1;
    if (a === n.length && n[a - 1] === u[o + a - 1]) {
      i = !0;
      break;
    }
  }
  return i ? o : -1;
}
var Eu = re.indexOf = bu;
function ir(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function ri(t, e) {
  if (!(e > C(t) || e < -C(t)))
    return _e(t, e, 1);
}
function se(t, e) {
  return e < 0 || e > C(t) - 1 ? "" : _e(t, e, 1);
}
function ui(t, e) {
  if (!(e < 0 || e > C(t) - 1))
    return _e(t, e, 1).codePointAt(0);
}
function Au(t, e, r = C(t)) {
  const u = wu(t, e);
  return !(u === -1 || u + C(e) !== r);
}
function yu(t, e, r) {
  if (e < 0) return -1;
  if (r) {
    if (se(t, e) === "}" && se(t, e - 1) === "\\") return e;
    const i = Ae(t, "\\}", e);
    return i >= 0 ? i + 1 : i;
  }
  let u = e;
  const n = C(t);
  for (; u < n && (u = Ae(t, "}", u), !(u === -1 || se(t, u - 1) !== "\\")); )
    u += 1;
  return u >= n ? -1 : u;
}
function ni(t, e) {
  let r = t, u = 0;
  for (; u < C(r); ) {
    switch (se(r, u)) {
      case "{":
        if (se(r, u - 1) !== "\\") {
          const n = yu(r, u, !1);
          if (n >= 0) {
            const i = P(r, u + 1, n), o = i in e ? (
              // We're getting a value.toString() with any type from an object with any keys
              // here. TypeScript doesn't need to carefully and precisely track the exact type.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              `${e[i]}`
            ) : i;
            r = `${P(r, 0, u)}${o}${P(r, n + 1)}`, u = n + C(o) - C(i) - 2;
          }
        } else
          r = `${P(r, 0, u - 1)}${P(r, u)}`, u -= 1;
        break;
      case "}":
        se(r, u - 1) !== "\\" || (r = `${P(r, 0, u - 1)}${P(r, u)}`, u -= 1);
        break;
    }
    u += 1;
  }
  return r;
}
function Nu(t, e, r = 0) {
  const u = P(t, r);
  return Ae(u, e) !== -1;
}
function Ae(t, e, r = 0) {
  return Eu(t, e, r);
}
function wu(t, e, r) {
  let u = r === void 0 ? C(t) : r;
  u < 0 ? u = 0 : u >= C(t) && (u = C(t) - 1);
  for (let n = u; n >= 0; n--)
    if (_e(t, n, C(e)) === e)
      return n;
  return -1;
}
function C(t) {
  return du(t);
}
function ii(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function oi(t, e, r) {
  return t.localeCompare(e, "en", r);
}
function ai(t, e, r = " ") {
  return e <= C(t) ? t : nr(t, e, r, "right");
}
function si(t, e, r = " ") {
  return e <= C(t) ? t : nr(t, e, r, "left");
}
function yt(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function ci(t, e, r) {
  const u = C(t);
  if (e > u || r && (e > r && !(e >= 0 && e < u && r < 0 && r > -u) || r < -u))
    return "";
  const n = yt(u, e), i = r ? yt(u, r) : void 0;
  return P(t, n, i);
}
function Nt(t, e, r) {
  const u = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "") return Cu(t).slice(0, r);
  let n = e;
  (typeof e == "string" || e instanceof RegExp && !Nu(e.flags, "g")) && (n = new RegExp(e, "g"));
  const i = t.match(n);
  let o = 0;
  if (!i) return [t];
  for (let a = 0; a < (r ? r - 1 : i.length); a++) {
    const s = Ae(t, i[a], o), l = C(i[a]);
    if (u.push(P(t, o, s)), o = s + l, r !== void 0 && u.length === r)
      break;
  }
  return u.push(P(t, o)), u;
}
function or(t, e, r = 0) {
  return Ae(t, e, r) === r;
}
function _e(t, e = 0, r = C(t) - e) {
  return Du(t, e, r);
}
function P(t, e, r = C(t)) {
  return mu(t, e, r);
}
function Cu(t) {
  return hu(t);
}
function li(t) {
  return or(t, "%") && Au(t, "%");
}
function fi(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function pi(t) {
  return t ? ir(t).map(
    (u) => Array.isArray(u) ? u.map((n) => new RegExp(n)) : new RegExp(u)
  ) : [];
}
function hi(t) {
  return t ? ir(t).map((u) => new RegExp(u)) : [];
}
const ar = [
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
], Bu = 1, Tu = ar.length - 1, Su = 1, Ou = 1, di = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1
}, xu = (t) => {
  var e;
  return ((e = ar[t]) == null ? void 0 : e.chapters) ?? -1;
}, mi = (t, e) => ({
  bookNum: Math.max(Bu, Math.min(t.bookNum + e, Tu)),
  chapterNum: 1,
  verseNum: 1
}), gi = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(Su, t.chapterNum + e),
    xu(t.bookNum)
  ),
  verseNum: 1
}), Di = (t, e) => ({
  ...t,
  verseNum: Math.max(Ou, t.verseNum + e)
});
async function vi(t, e, r) {
  const u = _.bookNumberToId(t);
  if (!or(Intl.getCanonicalLocales(e)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${u}`,
      languagesToSearch: [e]
    });
  const n = await r({
    localizeKey: `Book.${u}`,
    languagesToSearch: [e]
  }), i = Nt(n, "-");
  return Nt(i[0], "ÿ08")[0].trim();
}
function wt(t) {
  return new rr(t.bookNum, t.chapterNum, t.verseNum).BBBCCCVVV;
}
function bi(t, e) {
  return wt(t) - wt(e);
}
function Iu(t) {
  return `%scrollGroup_${t}%`;
}
function Ei(t) {
  return t.map((e) => Iu(e));
}
function Ai(t, e, r, u) {
  let n;
  switch (e ?? "id") {
    case "English":
      n = _.bookNumberToEnglishName(t.bookNum);
      break;
    case "id":
      n = _.bookNumberToId(t.bookNum);
      break;
    default:
      n = e ?? "";
      break;
  }
  return `${n}${u ?? " "}${t.chapterNum}${r ?? ":"}${t.verseNum}`;
}
const yi = (t) => (...e) => t.map((u) => u(...e)).every((u) => u), Ni = (t) => async (...e) => {
  const r = t.map(async (u) => u(...e));
  return (await Promise.all(r)).every((u) => u);
}, xe = "chapter", Ie = "verse";
var Fu = Object.getOwnPropertyNames, ku = Object.getOwnPropertySymbols, qu = Object.prototype.hasOwnProperty;
function Ct(t, e) {
  return function(u, n, i) {
    return t(u, n, i) && e(u, n, i);
  };
}
function Fe(t) {
  return function(r, u, n) {
    if (!r || !u || typeof r != "object" || typeof u != "object")
      return t(r, u, n);
    var i = n.cache, o = i.get(r), a = i.get(u);
    if (o && a)
      return o === u && a === r;
    i.set(r, u), i.set(u, r);
    var s = t(r, u, n);
    return i.delete(r), i.delete(u), s;
  };
}
function Bt(t) {
  return Fu(t).concat(ku(t));
}
var sr = Object.hasOwn || function(t, e) {
  return qu.call(t, e);
};
function he(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var cr = "_owner", Tt = Object.getOwnPropertyDescriptor, St = Object.keys;
function Ru(t, e, r) {
  var u = t.length;
  if (e.length !== u)
    return !1;
  for (; u-- > 0; )
    if (!r.equals(t[u], e[u], u, u, t, e, r))
      return !1;
  return !0;
}
function $u(t, e) {
  return he(t.getTime(), e.getTime());
}
function Ot(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var u = {}, n = t.entries(), i = 0, o, a; (o = n.next()) && !o.done; ) {
    for (var s = e.entries(), l = !1, c = 0; (a = s.next()) && !a.done; ) {
      var p = o.value, f = p[0], h = p[1], g = a.value, v = g[0], b = g[1];
      !l && !u[c] && (l = r.equals(f, v, i, c, t, e, r) && r.equals(h, b, f, v, t, e, r)) && (u[c] = !0), c++;
    }
    if (!l)
      return !1;
    i++;
  }
  return !0;
}
function Mu(t, e, r) {
  var u = St(t), n = u.length;
  if (St(e).length !== n)
    return !1;
  for (var i; n-- > 0; )
    if (i = u[n], i === cr && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !sr(e, i) || !r.equals(t[i], e[i], i, i, t, e, r))
      return !1;
  return !0;
}
function ge(t, e, r) {
  var u = Bt(t), n = u.length;
  if (Bt(e).length !== n)
    return !1;
  for (var i, o, a; n-- > 0; )
    if (i = u[n], i === cr && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !sr(e, i) || !r.equals(t[i], e[i], i, i, t, e, r) || (o = Tt(t, i), a = Tt(e, i), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function Pu(t, e) {
  return he(t.valueOf(), e.valueOf());
}
function ju(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function xt(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var u = {}, n = t.values(), i, o; (i = n.next()) && !i.done; ) {
    for (var a = e.values(), s = !1, l = 0; (o = a.next()) && !o.done; )
      !s && !u[l] && (s = r.equals(i.value, o.value, i.value, o.value, t, e, r)) && (u[l] = !0), l++;
    if (!s)
      return !1;
  }
  return !0;
}
function _u(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var Lu = "[object Arguments]", Vu = "[object Boolean]", Uu = "[object Date]", zu = "[object Map]", Gu = "[object Number]", Ju = "[object Object]", Hu = "[object RegExp]", Xu = "[object Set]", Ku = "[object String]", Wu = Array.isArray, It = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, Ft = Object.assign, Yu = Object.prototype.toString.call.bind(Object.prototype.toString);
function Zu(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, u = t.areMapsEqual, n = t.areObjectsEqual, i = t.arePrimitiveWrappersEqual, o = t.areRegExpsEqual, a = t.areSetsEqual, s = t.areTypedArraysEqual;
  return function(c, p, f) {
    if (c === p)
      return !0;
    if (c == null || p == null || typeof c != "object" || typeof p != "object")
      return c !== c && p !== p;
    var h = c.constructor;
    if (h !== p.constructor)
      return !1;
    if (h === Object)
      return n(c, p, f);
    if (Wu(c))
      return e(c, p, f);
    if (It != null && It(c))
      return s(c, p, f);
    if (h === Date)
      return r(c, p, f);
    if (h === RegExp)
      return o(c, p, f);
    if (h === Map)
      return u(c, p, f);
    if (h === Set)
      return a(c, p, f);
    var g = Yu(c);
    return g === Uu ? r(c, p, f) : g === Hu ? o(c, p, f) : g === zu ? u(c, p, f) : g === Xu ? a(c, p, f) : g === Ju ? typeof c.then != "function" && typeof p.then != "function" && n(c, p, f) : g === Lu ? n(c, p, f) : g === Vu || g === Gu || g === Ku ? i(c, p, f) : !1;
  };
}
function Qu(t) {
  var e = t.circular, r = t.createCustomConfig, u = t.strict, n = {
    areArraysEqual: u ? ge : Ru,
    areDatesEqual: $u,
    areMapsEqual: u ? Ct(Ot, ge) : Ot,
    areObjectsEqual: u ? ge : Mu,
    arePrimitiveWrappersEqual: Pu,
    areRegExpsEqual: ju,
    areSetsEqual: u ? Ct(xt, ge) : xt,
    areTypedArraysEqual: u ? ge : _u
  };
  if (r && (n = Ft({}, n, r(n))), e) {
    var i = Fe(n.areArraysEqual), o = Fe(n.areMapsEqual), a = Fe(n.areObjectsEqual), s = Fe(n.areSetsEqual);
    n = Ft({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: s
    });
  }
  return n;
}
function en(t) {
  return function(e, r, u, n, i, o, a) {
    return t(e, r, a);
  };
}
function tn(t) {
  var e = t.circular, r = t.comparator, u = t.createState, n = t.equals, i = t.strict;
  if (u)
    return function(s, l) {
      var c = u(), p = c.cache, f = p === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : p, h = c.meta;
      return r(s, l, {
        cache: f,
        equals: n,
        meta: h,
        strict: i
      });
    };
  if (e)
    return function(s, l) {
      return r(s, l, {
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
  return function(s, l) {
    return r(s, l, o);
  };
}
var rn = W();
W({ strict: !0 });
W({ circular: !0 });
W({
  circular: !0,
  strict: !0
});
W({
  createInternalComparator: function() {
    return he;
  }
});
W({
  strict: !0,
  createInternalComparator: function() {
    return he;
  }
});
W({
  circular: !0,
  createInternalComparator: function() {
    return he;
  }
});
W({
  circular: !0,
  createInternalComparator: function() {
    return he;
  },
  strict: !0
});
function W(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, u = t.createInternalComparator, n = t.createState, i = t.strict, o = i === void 0 ? !1 : i, a = Qu(t), s = Zu(a), l = u ? u(s) : en(s);
  return tn({ circular: r, comparator: s, createState: n, equals: l, strict: o });
}
function un(t, e) {
  return rn(t, e);
}
function nn(t, e) {
  if (typeof t != typeof e) return !1;
  if (!t && !e) return !0;
  if (Array.isArray(t)) {
    const i = e, o = t;
    return i.length === 0 ? !0 : i.every((a) => o.includes(a));
  }
  if (typeof t != "object")
    return un(t, e);
  const r = e, u = t;
  let n = !0;
  return Object.keys(r).forEach((i) => {
    n && (Object.hasOwn(u, i) && nn(u[i], r[i]) || (n = !1));
  }), n;
}
function kt(t, e, r) {
  return JSON.stringify(t, (n, i) => {
    let o = i;
    return e && (o = e(n, o)), o === void 0 && (o = null), o;
  }, r);
}
function on(t, e) {
  function r(n) {
    return Object.keys(n).forEach((i) => {
      n[i] === null ? n[i] = void 0 : typeof n[i] == "object" && (n[i] = r(n[i]));
    }), n;
  }
  const u = JSON.parse(t, e);
  if (u !== null)
    return typeof u == "object" ? r(u) : u;
}
function wi(t) {
  try {
    const e = kt(t);
    return e === kt(on(e));
  } catch {
    return !1;
  }
}
const Ci = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function Bi() {
  return typeof navigator < "u" && navigator.languages ? navigator.languages[0] : new Ur().resolvedOptions().locale;
}
function Ti(t, e = 2) {
  if (t === 0) return "0 Bytes";
  const r = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], u = Math.floor(Math.log(t) / Math.log(1024)), n = r[u];
  return `${new Zr("en", {
    style: "decimal",
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  }).format(t / 1024 ** u)} ${n}`;
}
const tt = {
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
function rt(t) {
  t && Object.values(t).forEach((e) => {
    if (e.type) {
      if ("tsType" in e && delete e.tsType, e.type === "any") {
        delete e.type;
        return;
      }
      e.type === "object" && rt(e.properties);
    }
  });
}
rt(tt);
const an = {
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
  $defs: tt
};
Object.freeze(an);
const sn = {
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
  $defs: tt
};
Object.freeze(sn);
const lr = {
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
rt(lr);
const cn = {
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
  $defs: lr
};
Object.freeze(cn);
const ln = {
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
Object.freeze(ln);
var Y = {}, X = {};
function fn(t, e, r) {
  if (r === void 0 && (r = Array.prototype), t && typeof r.find == "function")
    return r.find.call(t, e);
  for (var u = 0; u < t.length; u++)
    if (Object.prototype.hasOwnProperty.call(t, u)) {
      var n = t[u];
      if (e.call(void 0, n, u, t))
        return n;
    }
}
function ut(t, e) {
  return e === void 0 && (e = Object), e && typeof e.freeze == "function" ? e.freeze(t) : t;
}
function pn(t, e) {
  if (t === null || typeof t != "object")
    throw new TypeError("target is not an object");
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
  return t;
}
var fr = ut({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see DOMParser.SupportedType.isHTML
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * Helper method to check a mime type if it indicates an HTML document
   *
   * @param {string} [value]
   * @returns {boolean}
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
  isHTML: function(t) {
    return t === fr.HTML;
  },
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
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
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
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
}), pr = ut({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * Checks if `uri` equals `NAMESPACE.HTML`.
   *
   * @param {string} [uri]
   *
   * @see NAMESPACE.HTML
   */
  isHTML: function(t) {
    return t === pr.HTML;
  },
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
   * The `xmlns:` namespace
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
X.assign = pn;
X.find = fn;
X.freeze = ut;
X.MIME_TYPE = fr;
X.NAMESPACE = pr;
var hr = X, V = hr.find, ye = hr.NAMESPACE;
function hn(t) {
  return t !== "";
}
function dn(t) {
  return t ? t.split(/[\t\n\f\r ]+/).filter(hn) : [];
}
function mn(t, e) {
  return t.hasOwnProperty(e) || (t[e] = !0), t;
}
function qt(t) {
  if (!t) return [];
  var e = dn(t);
  return Object.keys(e.reduce(mn, {}));
}
function gn(t) {
  return function(e) {
    return t && t.indexOf(e) !== -1;
  };
}
function Ce(t, e) {
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
}
function k(t, e) {
  var r = t.prototype;
  if (!(r instanceof e)) {
    let u = function() {
    };
    u.prototype = e.prototype, u = new u(), Ce(r, u), t.prototype = r = u;
  }
  r.constructor != t && (typeof t != "function" && console.error("unknown Class:" + t), r.constructor = t);
}
var q = {}, j = q.ELEMENT_NODE = 1, ce = q.ATTRIBUTE_NODE = 2, Re = q.TEXT_NODE = 3, dr = q.CDATA_SECTION_NODE = 4, mr = q.ENTITY_REFERENCE_NODE = 5, Dn = q.ENTITY_NODE = 6, gr = q.PROCESSING_INSTRUCTION_NODE = 7, Dr = q.COMMENT_NODE = 8, vr = q.DOCUMENT_NODE = 9, br = q.DOCUMENT_TYPE_NODE = 10, J = q.DOCUMENT_FRAGMENT_NODE = 11, vn = q.NOTATION_NODE = 12, S = {}, B = {};
S.INDEX_SIZE_ERR = (B[1] = "Index size error", 1);
S.DOMSTRING_SIZE_ERR = (B[2] = "DOMString size error", 2);
var F = S.HIERARCHY_REQUEST_ERR = (B[3] = "Hierarchy request error", 3);
S.WRONG_DOCUMENT_ERR = (B[4] = "Wrong document", 4);
S.INVALID_CHARACTER_ERR = (B[5] = "Invalid character", 5);
S.NO_DATA_ALLOWED_ERR = (B[6] = "No data allowed", 6);
S.NO_MODIFICATION_ALLOWED_ERR = (B[7] = "No modification allowed", 7);
var Er = S.NOT_FOUND_ERR = (B[8] = "Not found", 8);
S.NOT_SUPPORTED_ERR = (B[9] = "Not supported", 9);
var Rt = S.INUSE_ATTRIBUTE_ERR = (B[10] = "Attribute in use", 10);
S.INVALID_STATE_ERR = (B[11] = "Invalid state", 11);
S.SYNTAX_ERR = (B[12] = "Syntax error", 12);
S.INVALID_MODIFICATION_ERR = (B[13] = "Invalid modification", 13);
S.NAMESPACE_ERR = (B[14] = "Invalid namespace", 14);
S.INVALID_ACCESS_ERR = (B[15] = "Invalid access", 15);
function w(t, e) {
  if (e instanceof Error)
    var r = e;
  else
    r = this, Error.call(this, B[t]), this.message = B[t], Error.captureStackTrace && Error.captureStackTrace(this, w);
  return r.code = t, e && (this.message = this.message + ": " + e), r;
}
w.prototype = Error.prototype;
Ce(S, w);
function G() {
}
G.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item: function(t) {
    return t >= 0 && t < this.length ? this[t] : null;
  },
  toString: function(t, e) {
    for (var r = [], u = 0; u < this.length; u++)
      ae(this[u], r, t, e);
    return r.join("");
  },
  /**
   * @private
   * @param {function (Node):boolean} predicate
   * @returns {Node[]}
   */
  filter: function(t) {
    return Array.prototype.filter.call(this, t);
  },
  /**
   * @private
   * @param {Node} item
   * @returns {number}
   */
  indexOf: function(t) {
    return Array.prototype.indexOf.call(this, t);
  }
};
function le(t, e) {
  this._node = t, this._refresh = e, nt(this);
}
function nt(t) {
  var e = t._node._inc || t._node.ownerDocument._inc;
  if (t._inc !== e) {
    var r = t._refresh(t._node);
    if (Fr(t, "length", r.length), !t.$$length || r.length < t.$$length)
      for (var u = r.length; u in t; u++)
        Object.prototype.hasOwnProperty.call(t, u) && delete t[u];
    Ce(r, t), t._inc = e;
  }
}
le.prototype.item = function(t) {
  return nt(this), this[t] || null;
};
k(le, G);
function $e() {
}
function Ar(t, e) {
  for (var r = t.length; r--; )
    if (t[r] === e)
      return r;
}
function $t(t, e, r, u) {
  if (u ? e[Ar(e, u)] = r : e[e.length++] = r, t) {
    r.ownerElement = t;
    var n = t.ownerDocument;
    n && (u && wr(n, t, u), bn(n, t, r));
  }
}
function Mt(t, e, r) {
  var u = Ar(e, r);
  if (u >= 0) {
    for (var n = e.length - 1; u < n; )
      e[u] = e[++u];
    if (e.length = n, t) {
      var i = t.ownerDocument;
      i && (wr(i, t, r), r.ownerElement = null);
    }
  } else
    throw new w(Er, new Error(t.tagName + "@" + r));
}
$e.prototype = {
  length: 0,
  item: G.prototype.item,
  getNamedItem: function(t) {
    for (var e = this.length; e--; ) {
      var r = this[e];
      if (r.nodeName == t)
        return r;
    }
  },
  setNamedItem: function(t) {
    var e = t.ownerElement;
    if (e && e != this._ownerElement)
      throw new w(Rt);
    var r = this.getNamedItem(t.nodeName);
    return $t(this._ownerElement, this, t, r), r;
  },
  /* returns Node */
  setNamedItemNS: function(t) {
    var e = t.ownerElement, r;
    if (e && e != this._ownerElement)
      throw new w(Rt);
    return r = this.getNamedItemNS(t.namespaceURI, t.localName), $t(this._ownerElement, this, t, r), r;
  },
  /* returns Node */
  removeNamedItem: function(t) {
    var e = this.getNamedItem(t);
    return Mt(this._ownerElement, this, e), e;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(t, e) {
    var r = this.getNamedItemNS(t, e);
    return Mt(this._ownerElement, this, r), r;
  },
  getNamedItemNS: function(t, e) {
    for (var r = this.length; r--; ) {
      var u = this[r];
      if (u.localName == e && u.namespaceURI == t)
        return u;
    }
    return null;
  }
};
function yr() {
}
yr.prototype = {
  /**
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
   * The different implementations fairly diverged in what kind of features were reported.
   * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
   *
   * @deprecated It is deprecated and modern browsers return true in all cases.
   *
   * @param {string} feature
   * @param {string} [version]
   * @returns {boolean} always true
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   */
  hasFeature: function(t, e) {
    return !0;
  },
  /**
   * Creates an XML Document object of the specified type with its document element.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
   * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string|null} namespaceURI
   * @param {string} qualifiedName
   * @param {DocumentType=null} doctype
   * @returns {Document}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocument: function(t, e, r) {
    var u = new Be();
    if (u.implementation = this, u.childNodes = new G(), u.doctype = r || null, r && u.appendChild(r), e) {
      var n = u.createElementNS(t, e);
      u.appendChild(n);
    }
    return u;
  },
  /**
   * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
   *
   * __This behavior is slightly different from the in the specs__:
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string} qualifiedName
   * @param {string} [publicId]
   * @param {string} [systemId]
   * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
   * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocumentType: function(t, e, r) {
    var u = new Le();
    return u.name = t, u.nodeName = t, u.publicId = e || "", u.systemId = r || "", u;
  }
};
function D() {
}
D.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(t, e) {
    return Me(this, t, e);
  },
  replaceChild: function(t, e) {
    Me(this, t, e, Br), e && this.removeChild(e);
  },
  removeChild: function(t) {
    return Cr(this, t);
  },
  appendChild: function(t) {
    return this.insertBefore(t, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(t) {
    return Xe(this.ownerDocument || this, this, t);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    for (var t = this.firstChild; t; ) {
      var e = t.nextSibling;
      e && e.nodeType == Re && t.nodeType == Re ? (this.removeChild(e), t.appendData(e.data)) : (t.normalize(), t = e);
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(t, e) {
    return this.ownerDocument.implementation.hasFeature(t, e);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
   *
   * @param {string | null} namespaceURI
   * @returns {string | null}
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   */
  lookupPrefix: function(t) {
    for (var e = this; e; ) {
      var r = e._nsMap;
      if (r) {
        for (var u in r)
          if (Object.prototype.hasOwnProperty.call(r, u) && r[u] === t)
            return u;
      }
      e = e.nodeType == ce ? e.ownerDocument : e.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(t) {
    for (var e = this; e; ) {
      var r = e._nsMap;
      if (r && Object.prototype.hasOwnProperty.call(r, t))
        return r[t];
      e = e.nodeType == ce ? e.ownerDocument : e.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(t) {
    var e = this.lookupPrefix(t);
    return e == null;
  }
};
function Nr(t) {
  return t == "<" && "&lt;" || t == ">" && "&gt;" || t == "&" && "&amp;" || t == '"' && "&quot;" || "&#" + t.charCodeAt() + ";";
}
Ce(q, D);
Ce(q, D.prototype);
function Ne(t, e) {
  if (e(t))
    return !0;
  if (t = t.firstChild)
    do
      if (Ne(t, e))
        return !0;
    while (t = t.nextSibling);
}
function Be() {
  this.ownerDocument = this;
}
function bn(t, e, r) {
  t && t._inc++;
  var u = r.namespaceURI;
  u === ye.XMLNS && (e._nsMap[r.prefix ? r.localName : ""] = r.value);
}
function wr(t, e, r, u) {
  t && t._inc++;
  var n = r.namespaceURI;
  n === ye.XMLNS && delete e._nsMap[r.prefix ? r.localName : ""];
}
function it(t, e, r) {
  if (t && t._inc) {
    t._inc++;
    var u = e.childNodes;
    if (r)
      u[u.length++] = r;
    else {
      for (var n = e.firstChild, i = 0; n; )
        u[i++] = n, n = n.nextSibling;
      u.length = i, delete u[u.length];
    }
  }
}
function Cr(t, e) {
  var r = e.previousSibling, u = e.nextSibling;
  return r ? r.nextSibling = u : t.firstChild = u, u ? u.previousSibling = r : t.lastChild = r, e.parentNode = null, e.previousSibling = null, e.nextSibling = null, it(t.ownerDocument, t), e;
}
function En(t) {
  return t && (t.nodeType === D.DOCUMENT_NODE || t.nodeType === D.DOCUMENT_FRAGMENT_NODE || t.nodeType === D.ELEMENT_NODE);
}
function An(t) {
  return t && (U(t) || ot(t) || H(t) || t.nodeType === D.DOCUMENT_FRAGMENT_NODE || t.nodeType === D.COMMENT_NODE || t.nodeType === D.PROCESSING_INSTRUCTION_NODE);
}
function H(t) {
  return t && t.nodeType === D.DOCUMENT_TYPE_NODE;
}
function U(t) {
  return t && t.nodeType === D.ELEMENT_NODE;
}
function ot(t) {
  return t && t.nodeType === D.TEXT_NODE;
}
function Pt(t, e) {
  var r = t.childNodes || [];
  if (V(r, U) || H(e))
    return !1;
  var u = V(r, H);
  return !(e && u && r.indexOf(u) > r.indexOf(e));
}
function jt(t, e) {
  var r = t.childNodes || [];
  function u(i) {
    return U(i) && i !== e;
  }
  if (V(r, u))
    return !1;
  var n = V(r, H);
  return !(e && n && r.indexOf(n) > r.indexOf(e));
}
function yn(t, e, r) {
  if (!En(t))
    throw new w(F, "Unexpected parent node type " + t.nodeType);
  if (r && r.parentNode !== t)
    throw new w(Er, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !An(e) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    H(e) && t.nodeType !== D.DOCUMENT_NODE
  )
    throw new w(
      F,
      "Unexpected node type " + e.nodeType + " for parent node type " + t.nodeType
    );
}
function Nn(t, e, r) {
  var u = t.childNodes || [], n = e.childNodes || [];
  if (e.nodeType === D.DOCUMENT_FRAGMENT_NODE) {
    var i = n.filter(U);
    if (i.length > 1 || V(n, ot))
      throw new w(F, "More than one element or text in fragment");
    if (i.length === 1 && !Pt(t, r))
      throw new w(F, "Element in fragment can not be inserted before doctype");
  }
  if (U(e) && !Pt(t, r))
    throw new w(F, "Only one element can be added and only after doctype");
  if (H(e)) {
    if (V(u, H))
      throw new w(F, "Only one doctype is allowed");
    var o = V(u, U);
    if (r && u.indexOf(o) < u.indexOf(r))
      throw new w(F, "Doctype can only be inserted before an element");
    if (!r && o)
      throw new w(F, "Doctype can not be appended since element is present");
  }
}
function Br(t, e, r) {
  var u = t.childNodes || [], n = e.childNodes || [];
  if (e.nodeType === D.DOCUMENT_FRAGMENT_NODE) {
    var i = n.filter(U);
    if (i.length > 1 || V(n, ot))
      throw new w(F, "More than one element or text in fragment");
    if (i.length === 1 && !jt(t, r))
      throw new w(F, "Element in fragment can not be inserted before doctype");
  }
  if (U(e) && !jt(t, r))
    throw new w(F, "Only one element can be added and only after doctype");
  if (H(e)) {
    if (V(u, function(s) {
      return H(s) && s !== r;
    }))
      throw new w(F, "Only one doctype is allowed");
    var o = V(u, U);
    if (r && u.indexOf(o) < u.indexOf(r))
      throw new w(F, "Doctype can only be inserted before an element");
  }
}
function Me(t, e, r, u) {
  yn(t, e, r), t.nodeType === D.DOCUMENT_NODE && (u || Nn)(t, e, r);
  var n = e.parentNode;
  if (n && n.removeChild(e), e.nodeType === J) {
    var i = e.firstChild;
    if (i == null)
      return e;
    var o = e.lastChild;
  } else
    i = o = e;
  var a = r ? r.previousSibling : t.lastChild;
  i.previousSibling = a, o.nextSibling = r, a ? a.nextSibling = i : t.firstChild = i, r == null ? t.lastChild = o : r.previousSibling = o;
  do
    i.parentNode = t;
  while (i !== o && (i = i.nextSibling));
  return it(t.ownerDocument || t, t), e.nodeType == J && (e.firstChild = e.lastChild = null), e;
}
function wn(t, e) {
  return e.parentNode && e.parentNode.removeChild(e), e.parentNode = t, e.previousSibling = t.lastChild, e.nextSibling = null, e.previousSibling ? e.previousSibling.nextSibling = e : t.firstChild = e, t.lastChild = e, it(t.ownerDocument, t, e), e;
}
Be.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: vr,
  /**
   * The DocumentType node of the document.
   *
   * @readonly
   * @type DocumentType
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(t, e) {
    if (t.nodeType == J) {
      for (var r = t.firstChild; r; ) {
        var u = r.nextSibling;
        this.insertBefore(r, e), r = u;
      }
      return t;
    }
    return Me(this, t, e), t.ownerDocument = this, this.documentElement === null && t.nodeType === j && (this.documentElement = t), t;
  },
  removeChild: function(t) {
    return this.documentElement == t && (this.documentElement = null), Cr(this, t);
  },
  replaceChild: function(t, e) {
    Me(this, t, e, Br), t.ownerDocument = this, e && this.removeChild(e), U(t) && (this.documentElement = t);
  },
  // Introduced in DOM Level 2:
  importNode: function(t, e) {
    return Ir(this, t, e);
  },
  // Introduced in DOM Level 2:
  getElementById: function(t) {
    var e = null;
    return Ne(this.documentElement, function(r) {
      if (r.nodeType == j && r.getAttribute("id") == t)
        return e = r, !0;
    }), e;
  },
  /**
   * The `getElementsByClassName` method of `Document` interface returns an array-like object
   * of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
   *
   *
   * Warning: This is a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(t) {
    var e = qt(t);
    return new le(this, function(r) {
      var u = [];
      return e.length > 0 && Ne(r.documentElement, function(n) {
        if (n !== r && n.nodeType === j) {
          var i = n.getAttribute("class");
          if (i) {
            var o = t === i;
            if (!o) {
              var a = qt(i);
              o = e.every(gn(a));
            }
            o && u.push(n);
          }
        }
      }), u;
    });
  },
  //document factory method:
  createElement: function(t) {
    var e = new te();
    e.ownerDocument = this, e.nodeName = t, e.tagName = t, e.localName = t, e.childNodes = new G();
    var r = e.attributes = new $e();
    return r._ownerElement = e, e;
  },
  createDocumentFragment: function() {
    var t = new Ve();
    return t.ownerDocument = this, t.childNodes = new G(), t;
  },
  createTextNode: function(t) {
    var e = new at();
    return e.ownerDocument = this, e.appendData(t), e;
  },
  createComment: function(t) {
    var e = new st();
    return e.ownerDocument = this, e.appendData(t), e;
  },
  createCDATASection: function(t) {
    var e = new ct();
    return e.ownerDocument = this, e.appendData(t), e;
  },
  createProcessingInstruction: function(t, e) {
    var r = new ft();
    return r.ownerDocument = this, r.tagName = r.nodeName = r.target = t, r.nodeValue = r.data = e, r;
  },
  createAttribute: function(t) {
    var e = new Pe();
    return e.ownerDocument = this, e.name = t, e.nodeName = t, e.localName = t, e.specified = !0, e;
  },
  createEntityReference: function(t) {
    var e = new lt();
    return e.ownerDocument = this, e.nodeName = t, e;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(t, e) {
    var r = new te(), u = e.split(":"), n = r.attributes = new $e();
    return r.childNodes = new G(), r.ownerDocument = this, r.nodeName = e, r.tagName = e, r.namespaceURI = t, u.length == 2 ? (r.prefix = u[0], r.localName = u[1]) : r.localName = e, n._ownerElement = r, r;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(t, e) {
    var r = new Pe(), u = e.split(":");
    return r.ownerDocument = this, r.nodeName = e, r.name = e, r.namespaceURI = t, r.specified = !0, u.length == 2 ? (r.prefix = u[0], r.localName = u[1]) : r.localName = e, r;
  }
};
k(Be, D);
function te() {
  this._nsMap = {};
}
te.prototype = {
  nodeType: j,
  hasAttribute: function(t) {
    return this.getAttributeNode(t) != null;
  },
  getAttribute: function(t) {
    var e = this.getAttributeNode(t);
    return e && e.value || "";
  },
  getAttributeNode: function(t) {
    return this.attributes.getNamedItem(t);
  },
  setAttribute: function(t, e) {
    var r = this.ownerDocument.createAttribute(t);
    r.value = r.nodeValue = "" + e, this.setAttributeNode(r);
  },
  removeAttribute: function(t) {
    var e = this.getAttributeNode(t);
    e && this.removeAttributeNode(e);
  },
  //four real opeartion method
  appendChild: function(t) {
    return t.nodeType === J ? this.insertBefore(t, null) : wn(this, t);
  },
  setAttributeNode: function(t) {
    return this.attributes.setNamedItem(t);
  },
  setAttributeNodeNS: function(t) {
    return this.attributes.setNamedItemNS(t);
  },
  removeAttributeNode: function(t) {
    return this.attributes.removeNamedItem(t.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(t, e) {
    var r = this.getAttributeNodeNS(t, e);
    r && this.removeAttributeNode(r);
  },
  hasAttributeNS: function(t, e) {
    return this.getAttributeNodeNS(t, e) != null;
  },
  getAttributeNS: function(t, e) {
    var r = this.getAttributeNodeNS(t, e);
    return r && r.value || "";
  },
  setAttributeNS: function(t, e, r) {
    var u = this.ownerDocument.createAttributeNS(t, e);
    u.value = u.nodeValue = "" + r, this.setAttributeNode(u);
  },
  getAttributeNodeNS: function(t, e) {
    return this.attributes.getNamedItemNS(t, e);
  },
  getElementsByTagName: function(t) {
    return new le(this, function(e) {
      var r = [];
      return Ne(e, function(u) {
        u !== e && u.nodeType == j && (t === "*" || u.tagName == t) && r.push(u);
      }), r;
    });
  },
  getElementsByTagNameNS: function(t, e) {
    return new le(this, function(r) {
      var u = [];
      return Ne(r, function(n) {
        n !== r && n.nodeType === j && (t === "*" || n.namespaceURI === t) && (e === "*" || n.localName == e) && u.push(n);
      }), u;
    });
  }
};
Be.prototype.getElementsByTagName = te.prototype.getElementsByTagName;
Be.prototype.getElementsByTagNameNS = te.prototype.getElementsByTagNameNS;
k(te, D);
function Pe() {
}
Pe.prototype.nodeType = ce;
k(Pe, D);
function Te() {
}
Te.prototype = {
  data: "",
  substringData: function(t, e) {
    return this.data.substring(t, t + e);
  },
  appendData: function(t) {
    t = this.data + t, this.nodeValue = this.data = t, this.length = t.length;
  },
  insertData: function(t, e) {
    this.replaceData(t, 0, e);
  },
  appendChild: function(t) {
    throw new Error(B[F]);
  },
  deleteData: function(t, e) {
    this.replaceData(t, e, "");
  },
  replaceData: function(t, e, r) {
    var u = this.data.substring(0, t), n = this.data.substring(t + e);
    r = u + r + n, this.nodeValue = this.data = r, this.length = r.length;
  }
};
k(Te, D);
function at() {
}
at.prototype = {
  nodeName: "#text",
  nodeType: Re,
  splitText: function(t) {
    var e = this.data, r = e.substring(t);
    e = e.substring(0, t), this.data = this.nodeValue = e, this.length = e.length;
    var u = this.ownerDocument.createTextNode(r);
    return this.parentNode && this.parentNode.insertBefore(u, this.nextSibling), u;
  }
};
k(at, Te);
function st() {
}
st.prototype = {
  nodeName: "#comment",
  nodeType: Dr
};
k(st, Te);
function ct() {
}
ct.prototype = {
  nodeName: "#cdata-section",
  nodeType: dr
};
k(ct, Te);
function Le() {
}
Le.prototype.nodeType = br;
k(Le, D);
function Tr() {
}
Tr.prototype.nodeType = vn;
k(Tr, D);
function Sr() {
}
Sr.prototype.nodeType = Dn;
k(Sr, D);
function lt() {
}
lt.prototype.nodeType = mr;
k(lt, D);
function Ve() {
}
Ve.prototype.nodeName = "#document-fragment";
Ve.prototype.nodeType = J;
k(Ve, D);
function ft() {
}
ft.prototype.nodeType = gr;
k(ft, D);
function Or() {
}
Or.prototype.serializeToString = function(t, e, r) {
  return xr.call(t, e, r);
};
D.prototype.toString = xr;
function xr(t, e) {
  var r = [], u = this.nodeType == 9 && this.documentElement || this, n = u.prefix, i = u.namespaceURI;
  if (i && n == null) {
    var n = u.lookupPrefix(i);
    if (n == null)
      var o = [
        { namespace: i, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return ae(this, r, t, e, o), r.join("");
}
function _t(t, e, r) {
  var u = t.prefix || "", n = t.namespaceURI;
  if (!n || u === "xml" && n === ye.XML || n === ye.XMLNS)
    return !1;
  for (var i = r.length; i--; ) {
    var o = r[i];
    if (o.prefix === u)
      return o.namespace !== n;
  }
  return !0;
}
function Je(t, e, r) {
  t.push(" ", e, '="', r.replace(/[<>&"\t\n\r]/g, Nr), '"');
}
function ae(t, e, r, u, n) {
  if (n || (n = []), u)
    if (t = u(t), t) {
      if (typeof t == "string") {
        e.push(t);
        return;
      }
    } else
      return;
  switch (t.nodeType) {
    case j:
      var i = t.attributes, o = i.length, y = t.firstChild, a = t.tagName;
      r = ye.isHTML(t.namespaceURI) || r;
      var s = a;
      if (!r && !t.prefix && t.namespaceURI) {
        for (var l, c = 0; c < i.length; c++)
          if (i.item(c).name === "xmlns") {
            l = i.item(c).value;
            break;
          }
        if (!l)
          for (var p = n.length - 1; p >= 0; p--) {
            var f = n[p];
            if (f.prefix === "" && f.namespace === t.namespaceURI) {
              l = f.namespace;
              break;
            }
          }
        if (l !== t.namespaceURI)
          for (var p = n.length - 1; p >= 0; p--) {
            var f = n[p];
            if (f.namespace === t.namespaceURI) {
              f.prefix && (s = f.prefix + ":" + a);
              break;
            }
          }
      }
      e.push("<", s);
      for (var h = 0; h < o; h++) {
        var g = i.item(h);
        g.prefix == "xmlns" ? n.push({ prefix: g.localName, namespace: g.value }) : g.nodeName == "xmlns" && n.push({ prefix: "", namespace: g.value });
      }
      for (var h = 0; h < o; h++) {
        var g = i.item(h);
        if (_t(g, r, n)) {
          var v = g.prefix || "", b = g.namespaceURI;
          Je(e, v ? "xmlns:" + v : "xmlns", b), n.push({ prefix: v, namespace: b });
        }
        ae(g, e, r, u, n);
      }
      if (a === s && _t(t, r, n)) {
        var v = t.prefix || "", b = t.namespaceURI;
        Je(e, v ? "xmlns:" + v : "xmlns", b), n.push({ prefix: v, namespace: b });
      }
      if (y || r && !/^(?:meta|link|img|br|hr|input)$/i.test(a)) {
        if (e.push(">"), r && /^script$/i.test(a))
          for (; y; )
            y.data ? e.push(y.data) : ae(y, e, r, u, n.slice()), y = y.nextSibling;
        else
          for (; y; )
            ae(y, e, r, u, n.slice()), y = y.nextSibling;
        e.push("</", s, ">");
      } else
        e.push("/>");
      return;
    case vr:
    case J:
      for (var y = t.firstChild; y; )
        ae(y, e, r, u, n.slice()), y = y.nextSibling;
      return;
    case ce:
      return Je(e, t.name, t.value);
    case Re:
      return e.push(
        t.data.replace(/[<&>]/g, Nr)
      );
    case dr:
      return e.push("<![CDATA[", t.data, "]]>");
    case Dr:
      return e.push("<!--", t.data, "-->");
    case br:
      var Z = t.publicId, A = t.systemId;
      if (e.push("<!DOCTYPE ", t.name), Z)
        e.push(" PUBLIC ", Z), A && A != "." && e.push(" ", A), e.push(">");
      else if (A && A != ".")
        e.push(" SYSTEM ", A, ">");
      else {
        var O = t.internalSubset;
        O && e.push(" [", O, "]"), e.push(">");
      }
      return;
    case gr:
      return e.push("<?", t.target, " ", t.data, "?>");
    case mr:
      return e.push("&", t.nodeName, ";");
    default:
      e.push("??", t.nodeName);
  }
}
function Ir(t, e, r) {
  var u;
  switch (e.nodeType) {
    case j:
      u = e.cloneNode(!1), u.ownerDocument = t;
    case J:
      break;
    case ce:
      r = !0;
      break;
  }
  if (u || (u = e.cloneNode(!1)), u.ownerDocument = t, u.parentNode = null, r)
    for (var n = e.firstChild; n; )
      u.appendChild(Ir(t, n, r)), n = n.nextSibling;
  return u;
}
function Xe(t, e, r) {
  var u = new e.constructor();
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var i = e[n];
      typeof i != "object" && i != u[n] && (u[n] = i);
    }
  switch (e.childNodes && (u.childNodes = new G()), u.ownerDocument = t, u.nodeType) {
    case j:
      var o = e.attributes, a = u.attributes = new $e(), s = o.length;
      a._ownerElement = u;
      for (var l = 0; l < s; l++)
        u.setAttributeNode(Xe(t, o.item(l), !0));
      break;
    case ce:
      r = !0;
  }
  if (r)
    for (var c = e.firstChild; c; )
      u.appendChild(Xe(t, c, r)), c = c.nextSibling;
  return u;
}
function Fr(t, e, r) {
  t[e] = r;
}
try {
  if (Object.defineProperty) {
    let t = function(e) {
      switch (e.nodeType) {
        case j:
        case J:
          var r = [];
          for (e = e.firstChild; e; )
            e.nodeType !== 7 && e.nodeType !== 8 && r.push(t(e)), e = e.nextSibling;
          return r.join("");
        default:
          return e.nodeValue;
      }
    };
    Object.defineProperty(le.prototype, "length", {
      get: function() {
        return nt(this), this.$$length;
      }
    }), Object.defineProperty(D.prototype, "textContent", {
      get: function() {
        return t(this);
      },
      set: function(e) {
        switch (this.nodeType) {
          case j:
          case J:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
            break;
          default:
            this.data = e, this.value = e, this.nodeValue = e;
        }
      }
    }), Fr = function(e, r, u) {
      e["$$" + r] = u;
    };
  }
} catch {
}
Y.DocumentType = Le;
Y.DOMException = w;
Y.DOMImplementation = yr;
Y.Element = te;
Y.Node = D;
Y.NodeList = G;
Y.XMLSerializer = Or;
var kr = {};
(function(t) {
  var e = X.freeze;
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
})(kr);
var pt = {}, we = X.NAMESPACE, Ke = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Lt = new RegExp("[\\-\\.0-9" + Ke.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), Vt = new RegExp("^" + Ke.source + Lt.source + "*(?::" + Ke.source + Lt.source + "*)?$"), De = 0, K = 1, ue = 2, ve = 3, ne = 4, ie = 5, be = 6, ke = 7;
function fe(t, e) {
  this.message = t, this.locator = e, Error.captureStackTrace && Error.captureStackTrace(this, fe);
}
fe.prototype = new Error();
fe.prototype.name = fe.name;
function qr() {
}
qr.prototype = {
  parse: function(t, e, r) {
    var u = this.domBuilder;
    u.startDocument(), Rr(e, e = {}), Cn(
      t,
      e,
      r,
      u,
      this.errorHandler
    ), u.endDocument();
  }
};
function Cn(t, e, r, u, n) {
  function i(N) {
    if (N > 65535) {
      N -= 65536;
      var M = 55296 + (N >> 10), jr = 56320 + (N & 1023);
      return String.fromCharCode(M, jr);
    } else
      return String.fromCharCode(N);
  }
  function o(N) {
    var M = N.slice(1, -1);
    return Object.hasOwnProperty.call(r, M) ? r[M] : M.charAt(0) === "#" ? i(parseInt(M.substr(1).replace("x", "0x"))) : (n.error("entity not found:" + N), N);
  }
  function a(N) {
    if (N > v) {
      var M = t.substring(v, N).replace(/&#?\w+;/g, o);
      f && s(v), u.characters(M, 0, N - v), v = N;
    }
  }
  function s(N, M) {
    for (; N >= c && (M = p.exec(t)); )
      l = M.index, c = l + M[0].length, f.lineNumber++;
    f.columnNumber = N - l + 1;
  }
  for (var l = 0, c = 0, p = /.*(?:\r\n?|\n)|.*$/g, f = u.locator, h = [{ currentNSMap: e }], g = {}, v = 0; ; ) {
    try {
      var b = t.indexOf("<", v);
      if (b < 0) {
        if (!t.substr(v).match(/^\s*$/)) {
          var y = u.doc, Z = y.createTextNode(t.substr(v));
          y.appendChild(Z), u.currentElement = Z;
        }
        return;
      }
      switch (b > v && a(b), t.charAt(b + 1)) {
        case "/":
          var x = t.indexOf(">", b + 3), A = t.substring(b + 2, x).replace(/[ \t\n\r]+$/g, ""), O = h.pop();
          x < 0 ? (A = t.substring(b + 2).replace(/[\s<].*/, ""), n.error("end tag name: " + A + " is not complete:" + O.tagName), x = b + 1 + A.length) : A.match(/\s</) && (A = A.replace(/[\s<].*/, ""), n.error("end tag name: " + A + " maybe not complete"), x = b + 1 + A.length);
          var de = O.localNSMap, Se = O.tagName == A, ht = Se || O.tagName && O.tagName.toLowerCase() == A.toLowerCase();
          if (ht) {
            if (u.endElement(O.uri, O.localName, A), de)
              for (var Oe in de)
                Object.prototype.hasOwnProperty.call(de, Oe) && u.endPrefixMapping(Oe);
            Se || n.fatalError("end tag name: " + A + " is not match the current start tagName:" + O.tagName);
          } else
            h.push(O);
          x++;
          break;
        case "?":
          f && s(b), x = xn(t, b, u);
          break;
        case "!":
          f && s(b), x = On(t, b, u, n);
          break;
        default:
          f && s(b);
          var R = new $r(), ze = h[h.length - 1].currentNSMap, x = Bn(t, b, R, ze, o, n), dt = R.length;
          if (!R.closed && Sn(t, x, R.tagName, g) && (R.closed = !0, r.nbsp || n.warning("unclosed xml attribute")), f && dt) {
            for (var Pr = Ut(f, {}), Ge = 0; Ge < dt; Ge++) {
              var mt = R[Ge];
              s(mt.offset), mt.locator = Ut(f, {});
            }
            u.locator = Pr, zt(R, u, ze) && h.push(R), u.locator = f;
          } else
            zt(R, u, ze) && h.push(R);
          we.isHTML(R.uri) && !R.closed ? x = Tn(t, x, R.tagName, o, u) : x++;
      }
    } catch (N) {
      if (N instanceof fe)
        throw N;
      n.error("element parse error: " + N), x = -1;
    }
    x > v ? v = x : a(Math.max(b, v) + 1);
  }
}
function Ut(t, e) {
  return e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber, e;
}
function Bn(t, e, r, u, n, i) {
  function o(f, h, g) {
    r.attributeNames.hasOwnProperty(f) && i.fatalError("Attribute " + f + " redefined"), r.addValue(
      f,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      h.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, n),
      g
    );
  }
  for (var a, s, l = ++e, c = De; ; ) {
    var p = t.charAt(l);
    switch (p) {
      case "=":
        if (c === K)
          a = t.slice(e, l), c = ve;
        else if (c === ue)
          c = ve;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (c === ve || c === K)
          if (c === K && (i.warning('attribute value must after "="'), a = t.slice(e, l)), e = l + 1, l = t.indexOf(p, e), l > 0)
            s = t.slice(e, l), o(a, s, e - 1), c = ie;
          else
            throw new Error("attribute value no end '" + p + "' match");
        else if (c == ne)
          s = t.slice(e, l), o(a, s, e), i.warning('attribute "' + a + '" missed start quot(' + p + ")!!"), e = l + 1, c = ie;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (c) {
          case De:
            r.setTagName(t.slice(e, l));
          case ie:
          case be:
          case ke:
            c = ke, r.closed = !0;
          case ne:
          case K:
            break;
          case ue:
            r.closed = !0;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return i.error("unexpected end of input"), c == De && r.setTagName(t.slice(e, l)), l;
      case ">":
        switch (c) {
          case De:
            r.setTagName(t.slice(e, l));
          case ie:
          case be:
          case ke:
            break;
          case ne:
          case K:
            s = t.slice(e, l), s.slice(-1) === "/" && (r.closed = !0, s = s.slice(0, -1));
          case ue:
            c === ue && (s = a), c == ne ? (i.warning('attribute "' + s + '" missed quot(")!'), o(a, s, e)) : ((!we.isHTML(u[""]) || !s.match(/^(?:disabled|checked|selected)$/i)) && i.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), o(s, s, e));
            break;
          case ve:
            throw new Error("attribute value missed!!");
        }
        return l;
      case "":
        p = " ";
      default:
        if (p <= " ")
          switch (c) {
            case De:
              r.setTagName(t.slice(e, l)), c = be;
              break;
            case K:
              a = t.slice(e, l), c = ue;
              break;
            case ne:
              var s = t.slice(e, l);
              i.warning('attribute "' + s + '" missed quot(")!!'), o(a, s, e);
            case ie:
              c = be;
              break;
          }
        else
          switch (c) {
            case ue:
              r.tagName, (!we.isHTML(u[""]) || !a.match(/^(?:disabled|checked|selected)$/i)) && i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), o(a, a, e), e = l, c = K;
              break;
            case ie:
              i.warning('attribute space is required"' + a + '"!!');
            case be:
              c = K, e = l;
              break;
            case ve:
              c = ne, e = l;
              break;
            case ke:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    l++;
  }
}
function zt(t, e, r) {
  for (var u = t.tagName, n = null, p = t.length; p--; ) {
    var i = t[p], o = i.qName, a = i.value, f = o.indexOf(":");
    if (f > 0)
      var s = i.prefix = o.slice(0, f), l = o.slice(f + 1), c = s === "xmlns" && l;
    else
      l = o, s = null, c = o === "xmlns" && "";
    i.localName = l, c !== !1 && (n == null && (n = {}, Rr(r, r = {})), r[c] = n[c] = a, i.uri = we.XMLNS, e.startPrefixMapping(c, a));
  }
  for (var p = t.length; p--; ) {
    i = t[p];
    var s = i.prefix;
    s && (s === "xml" && (i.uri = we.XML), s !== "xmlns" && (i.uri = r[s || ""]));
  }
  var f = u.indexOf(":");
  f > 0 ? (s = t.prefix = u.slice(0, f), l = t.localName = u.slice(f + 1)) : (s = null, l = t.localName = u);
  var h = t.uri = r[s || ""];
  if (e.startElement(h, l, u, t), t.closed) {
    if (e.endElement(h, l, u), n)
      for (s in n)
        Object.prototype.hasOwnProperty.call(n, s) && e.endPrefixMapping(s);
  } else
    return t.currentNSMap = r, t.localNSMap = n, !0;
}
function Tn(t, e, r, u, n) {
  if (/^(?:script|textarea)$/i.test(r)) {
    var i = t.indexOf("</" + r + ">", e), o = t.substring(e + 1, i);
    if (/[&<]/.test(o))
      return /^script$/i.test(r) ? (n.characters(o, 0, o.length), i) : (o = o.replace(/&#?\w+;/g, u), n.characters(o, 0, o.length), i);
  }
  return e + 1;
}
function Sn(t, e, r, u) {
  var n = u[r];
  return n == null && (n = t.lastIndexOf("</" + r + ">"), n < e && (n = t.lastIndexOf("</" + r)), u[r] = n), n < e;
}
function Rr(t, e) {
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
}
function On(t, e, r, u) {
  var n = t.charAt(e + 2);
  switch (n) {
    case "-":
      if (t.charAt(e + 3) === "-") {
        var i = t.indexOf("-->", e + 4);
        return i > e ? (r.comment(t, e + 4, i - e - 4), i + 3) : (u.error("Unclosed comment"), -1);
      } else
        return -1;
    default:
      if (t.substr(e + 3, 6) == "CDATA[") {
        var i = t.indexOf("]]>", e + 9);
        return r.startCDATA(), r.characters(t, e + 9, i - e - 9), r.endCDATA(), i + 3;
      }
      var o = In(t, e), a = o.length;
      if (a > 1 && /!doctype/i.test(o[0][0])) {
        var s = o[1][0], l = !1, c = !1;
        a > 3 && (/^public$/i.test(o[2][0]) ? (l = o[3][0], c = a > 4 && o[4][0]) : /^system$/i.test(o[2][0]) && (c = o[3][0]));
        var p = o[a - 1];
        return r.startDTD(s, l, c), r.endDTD(), p.index + p[0].length;
      }
  }
  return -1;
}
function xn(t, e, r) {
  var u = t.indexOf("?>", e);
  if (u) {
    var n = t.substring(e, u).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return n ? (n[0].length, r.processingInstruction(n[1], n[2]), u + 2) : -1;
  }
  return -1;
}
function $r() {
  this.attributeNames = {};
}
$r.prototype = {
  setTagName: function(t) {
    if (!Vt.test(t))
      throw new Error("invalid tagName:" + t);
    this.tagName = t;
  },
  addValue: function(t, e, r) {
    if (!Vt.test(t))
      throw new Error("invalid attribute:" + t);
    this.attributeNames[t] = this.length, this[this.length++] = { qName: t, value: e, offset: r };
  },
  length: 0,
  getLocalName: function(t) {
    return this[t].localName;
  },
  getLocator: function(t) {
    return this[t].locator;
  },
  getQName: function(t) {
    return this[t].qName;
  },
  getURI: function(t) {
    return this[t].uri;
  },
  getValue: function(t) {
    return this[t].value;
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
function In(t, e) {
  var r, u = [], n = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (n.lastIndex = e, n.exec(t); r = n.exec(t); )
    if (u.push(r), r[1]) return u;
}
pt.XMLReader = qr;
pt.ParseError = fe;
var Fn = X, kn = Y, Gt = kr, Mr = pt, qn = kn.DOMImplementation, Jt = Fn.NAMESPACE, Rn = Mr.ParseError, $n = Mr.XMLReader;
function Mn(t) {
  return t.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function Pn(t) {
  this.options = t || { locator: {} };
}
Pn.prototype.parseFromString = function(t, e) {
  var r = this.options, u = new $n(), n = r.domBuilder || new Ue(), i = r.errorHandler, o = r.locator, a = r.xmlns || {}, s = /\/x?html?$/.test(e), l = s ? Gt.HTML_ENTITIES : Gt.XML_ENTITIES;
  o && n.setDocumentLocator(o), u.errorHandler = jn(i, n, o), u.domBuilder = r.domBuilder || n, s && (a[""] = Jt.HTML), a.xml = a.xml || Jt.XML;
  var c = r.normalizeLineEndings || Mn;
  return t && typeof t == "string" ? u.parse(
    c(t),
    a,
    l
  ) : u.errorHandler.error("invalid doc source"), n.doc;
};
function jn(t, e, r) {
  if (!t) {
    if (e instanceof Ue)
      return e;
    t = e;
  }
  var u = {}, n = t instanceof Function;
  r = r || {};
  function i(o) {
    var a = t[o];
    !a && n && (a = t.length == 2 ? function(s) {
      t(o, s);
    } : t), u[o] = a && function(s) {
      a("[xmldom " + o + "]	" + s + We(r));
    } || function() {
    };
  }
  return i("warning"), i("error"), i("fatalError"), u;
}
function Ue() {
  this.cdata = !1;
}
function oe(t, e) {
  e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber;
}
Ue.prototype = {
  startDocument: function() {
    this.doc = new qn().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
  },
  startElement: function(t, e, r, u) {
    var n = this.doc, i = n.createElementNS(t, r || e), o = u.length;
    qe(this, i), this.currentElement = i, this.locator && oe(this.locator, i);
    for (var a = 0; a < o; a++) {
      var t = u.getURI(a), s = u.getValue(a), r = u.getQName(a), l = n.createAttributeNS(t, r);
      this.locator && oe(u.getLocator(a), l), l.value = l.nodeValue = s, i.setAttributeNode(l);
    }
  },
  endElement: function(t, e, r) {
    var u = this.currentElement;
    u.tagName, this.currentElement = u.parentNode;
  },
  startPrefixMapping: function(t, e) {
  },
  endPrefixMapping: function(t) {
  },
  processingInstruction: function(t, e) {
    var r = this.doc.createProcessingInstruction(t, e);
    this.locator && oe(this.locator, r), qe(this, r);
  },
  ignorableWhitespace: function(t, e, r) {
  },
  characters: function(t, e, r) {
    if (t = Ht.apply(this, arguments), t) {
      if (this.cdata)
        var u = this.doc.createCDATASection(t);
      else
        var u = this.doc.createTextNode(t);
      this.currentElement ? this.currentElement.appendChild(u) : /^\s*$/.test(t) && this.doc.appendChild(u), this.locator && oe(this.locator, u);
    }
  },
  skippedEntity: function(t) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(t) {
    (this.locator = t) && (t.lineNumber = 0);
  },
  //LexicalHandler
  comment: function(t, e, r) {
    t = Ht.apply(this, arguments);
    var u = this.doc.createComment(t);
    this.locator && oe(this.locator, u), qe(this, u);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(t, e, r) {
    var u = this.doc.implementation;
    if (u && u.createDocumentType) {
      var n = u.createDocumentType(t, e, r);
      this.locator && oe(this.locator, n), qe(this, n), this.doc.doctype = n;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(t) {
    console.warn("[xmldom warning]	" + t, We(this.locator));
  },
  error: function(t) {
    console.error("[xmldom error]	" + t, We(this.locator));
  },
  fatalError: function(t) {
    throw new Rn(t, this.locator);
  }
};
function We(t) {
  if (t)
    return `
@` + (t.systemId || "") + "#[line:" + t.lineNumber + ",col:" + t.columnNumber + "]";
}
function Ht(t, e, r) {
  return typeof t == "string" ? t.substr(e, r) : t.length >= e + r || e ? new java.lang.String(t, e, r) + "" : t;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(t) {
  Ue.prototype[t] = function() {
    return null;
  };
});
function qe(t, e) {
  t.currentElement ? t.currentElement.appendChild(e) : t.doc.appendChild(e);
}
const Xt = "USJ", z = ["figure", "note", "sidebar", "table"];
Object.freeze(z);
class T {
  constructor(e) {
    E(this, "usj");
    E(this, "parentMapInternal");
    this.usj = e;
  }
  // If new variables are created to speed up queries, they should be reset here
  usjChanged() {
    this.parentMapInternal = void 0;
  }
  // #region Directly using the JSONPath package to perform JSONPath query -> USJ node
  findSingleValue(e) {
    const r = gt({ path: e, json: this.usj, wrap: !0 });
    if (r === void 0 || r.length === 0) return;
    if (!Array.isArray(r[0])) return r[0];
    const u = gt({ path: e, json: this.usj, wrap: !1 });
    return u.length === 1 && Array.isArray(u[0]) ? u[0] : u;
  }
  findParent(e) {
    return this.findSingleValue(`${e}^`);
  }
  findBookId() {
    return this.findSingleValue('$.content[?(@.type=="book" && @.marker=="id")].code');
  }
  findChapterNode(e) {
    const r = `$..content[?(@.type=="chapter" && @.number=="${e}")]`;
    return this.findSingleValue(r);
  }
  // #endregion
  // #region Parent Maps
  static createParentMapInternal(e, r, u) {
    var n;
    u.set(e, r), e.content && u.set(e.content, e), (n = e.content) == null || n.forEach((i) => {
      typeof i == "object" && T.createParentMapInternal(i, e, u);
    });
  }
  /** Viewing a Usj object as a tree, build a map to walk up the tree */
  createUsjParentMap() {
    const e = /* @__PURE__ */ new Map();
    return this.usj.content && e.set(this.usj.content, this.usj), this.usj.content.forEach((r) => {
      typeof r == "object" && T.createParentMapInternal(r, this.usj, e);
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
    const r = [], { parentMap: u } = this;
    let n = e, i = u.get(n);
    for (; i !== void 0; ) {
      if (!i.content)
        throw new Error("Invalid parentMap: all parents should have content");
      if (
        // Referencing tempNode and tempParent is OK in the loop since 'let' is used instead of 'var'
        // eslint-disable-next-line no-loop-func
        !i.content.find((o, a) => {
          if (o !== n) return !1;
          if (!i) throw new Error('undefined "tempParent" should not be possible');
          return r.unshift({ parent: i, index: a }), !0;
        })
      )
        throw new Error(`Unable to find correct parent node of ${JSON.stringify(n)}`);
      if (i.type === Xt) break;
      n = i, i = u.get(i);
    }
    return r;
  }
  static convertWorkingStackToJsonPath(e) {
    let r = "$";
    return e.forEach((u) => {
      r = `${r}.content[${u.index}]`;
    }), r;
  }
  convertJsonPathToWorkingStack(e) {
    const r = [], u = e.match(/content\[(\d+)\]/g);
    if (!u) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
    let n = this.usj;
    return u.forEach((i, o) => {
      const a = /(\d+)/.exec(i);
      if (!a) throw new Error(`Malformed or unexpected jsonPath: ${e}`);
      const s = parseInt(a[0], 10);
      if (r.push({ parent: n, index: s }), o + 1 < u.length) {
        if (typeof n == "string" || !n.content)
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(n)}`);
        const l = n.content[s];
        if (typeof l == "string")
          throw new Error(`jsonPath points to node without children: ${JSON.stringify(l)}`);
        n = l;
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
  static findRightMostDescendantMarkerObject(e, r, u = []) {
    if (!e.content) return { node: e, parent: r };
    for (let n = e.content.length - 1; n >= 0; n--) {
      const i = e.content[n];
      if (typeof i == "object" && !u.includes(i.type))
        return i.content ? this.findRightMostDescendantMarkerObject(i, e, u) : { node: i, parent: e };
    }
    return { node: e, parent: r };
  }
  static findNextMatchingNodeUsingWorkingStack(e, r, u, n) {
    var o;
    let i = e;
    for (; i !== void 0; ) {
      const a = typeof i == "object" && u.includes(i.type);
      if (!a && n(i, r)) return i;
      if (!a && typeof i == "object" && (((o = i.content) == null ? void 0 : o.length) ?? 0) > 0)
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
  findNextMatchingNode(e, r, u) {
    const n = this.createWorkingStack(e);
    return T.findNextMatchingNodeUsingWorkingStack(
      e,
      n,
      r,
      u
    );
  }
  // #endregion
  // #region Node -> JSONPath
  nodeToJsonPath(e) {
    return T.convertWorkingStackToJsonPath(this.createWorkingStack(e));
  }
  // #endregion
  // #region USJ + node -> VerseRef + offset
  /** Find the chapter and verse that apply to a given USJ node */
  findVerseRefForNode(e, r, u = {
    chapterNum: void 0,
    verseNum: void 0,
    startingContentNode: void 0
  }) {
    if (u.verseNum !== void 0 && u.chapterNum !== void 0) return u;
    if (typeof e == "object" && e.number !== void 0) {
      const s = Number.parseInt(e.number, 10);
      if (e.type === xe)
        return u.chapterNum = s, u.verseNum = u.verseNum ?? 0, u.startingContentNode = u.startingContentNode ?? e, u;
      e.type === Ie && !u.verseNum && (u.verseNum = s, u.startingContentNode = e);
    }
    if (!r.content)
      throw new Error(`"content" array not found: ${JSON.stringify(r)}`);
    let n = 0;
    for (let s = 0; s < r.content.length; s++)
      if (r.content[s] === e) {
        n = s;
        break;
      }
    let i = n - 1;
    for (; i >= 0 && typeof r.content[i] != "object"; )
      i -= 1;
    if (i < 0) {
      if (r.type === Xt)
        return u.chapterNum === void 0 && (u.chapterNum = 1, u.verseNum = 0, u.startingContentNode = void 0), u;
      const s = r, l = this.parentMap.get(s);
      if (!l) throw new Error(`No parent found for ${JSON.stringify(r)}`);
      return this.findVerseRefForNode(s, l, u);
    }
    const o = r.content[i], a = T.findRightMostDescendantMarkerObject(
      o,
      r,
      z
    );
    return this.findVerseRefForNode(a.node, a.parent, u);
  }
  nodeToVerseRefAndOffset(e, r, u) {
    if (typeof r == "string" && u === void 0)
      throw new Error('If "node" is a string, then "nodeParent" cannot be undefined');
    let n;
    if (u === void 0 ? n = this.parentMap.get(r) : n = Array.isArray(u) ? this.parentMap.get(u) : u, n === void 0)
      throw new Error(`Cannot find parent for ${JSON.stringify(u)}`);
    const i = this.findVerseRefForNode(r, n);
    if (!i) return;
    if (!i.chapterNum)
      throw new Error(`Could not determine chapter number for ${JSON.stringify(r)}`);
    const o = new rr(
      e,
      i.chapterNum.toString(),
      i.verseNum ? i.verseNum.toString() : "0"
    );
    let a = 0;
    return i.startingContentNode !== void 0 && this.findNextMatchingNode(i.startingContentNode, [], (s, l) => {
      var c, p;
      return s === r ? !0 : l.find((f) => z.includes(f.parent.type)) ? !1 : typeof s == "string" ? (a += s.length, !1) : s.type === xe && s.number !== ((c = i.chapterNum) == null ? void 0 : c.toString()) || s.type === Ie && s.number !== ((p = i.verseNum) == null ? void 0 : p.toString()) ? (a = 0, !0) : !1;
    }), { verseRef: o, offset: a };
  }
  // #endregion
  // #region JSONPath -> VerseRef + offset
  jsonPathToVerseRefAndOffset(e, r) {
    const u = r ?? this.findBookId();
    if (!u) throw new Error("Not able to determine the book ID");
    const n = this.findSingleValue(e);
    if (!n) throw new Error(`No result found for JSONPath query: ${e}`);
    const i = this.findParent(e);
    if (!i) throw new Error(`Could not determine parent for ${e}`);
    const o = this.nodeToVerseRefAndOffset(u, n, i);
    if (!o)
      throw new Error(`Could not determine VerseRef that corresponds to ${e}`);
    return o;
  }
  // #endregion
  // #region VerseRef + offset -> Node + JSONPath + offset
  verseRefToUsjContentLocation(e, r = 0) {
    if (r < 0) throw new Error("offset must be >= 0");
    const u = this.findBookId() ?? e.book;
    if (!u) throw new Error("Not able to determine the book ID");
    if (u !== e.book)
      throw new Error(`Book IDs don't match: USJ=${u}, VerseRef=${e.book}`);
    const n = this.findChapterNode(e.chapterNum);
    if (n === void 0)
      throw new Error(`Could not find ${u} chapter ${e.chapterNum}`);
    let i = !1, o = "";
    const a = e.verse, s = this.findNextMatchingNode(
      n,
      z,
      (f, h) => f === n ? e.verseNum === 0 ? (o = T.convertWorkingStackToJsonPath(h), !0) : !1 : typeof f != "object" ? !1 : f.type === xe ? (i = !0, !0) : f.type === Ie && f.number !== void 0 && f.number === a ? (o = T.convertWorkingStackToJsonPath(h), !0) : !1
    );
    if (i || s === void 0 || typeof s == "string")
      throw new Error(`Verse ${a} not found in ${u} ${e.chapterNum}`);
    if (r === 0) return { node: s, offset: 0, jsonPath: o };
    let l = 0, c = 0, p;
    return this.findNextMatchingNode(
      s,
      z,
      (f, h) => {
        if (f === s) return !1;
        if (typeof f == "string") {
          if (l += f.length, l > r)
            return o = T.convertWorkingStackToJsonPath(h), c = r - l + f.length, p = f, !0;
        } else if (f.type === xe || f.type === Ie) return !0;
        return !1;
      }
    ), { node: p ?? s, offset: c, jsonPath: o };
  }
  // #endregion
  // #region Search for text from a node + JSONPath + offset
  findNextLocationOfMatchingText(e, r, u = 1e3) {
    let n = "", i = 0, o = 0, a = 0;
    if (T.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      z,
      (p) => {
        if (typeof p != "string") return !1;
        i += p.length, n = `${n}${p}`;
        const f = n.indexOf(r);
        return f < 0 ? (o += n.length, n.length > r.length && (n = n.substring(n.length - r.length)), o -= n.length, i > u) : (a = o + f, !0);
      }
    ), a <= 0) return;
    i = 0;
    let s = 0, l = [];
    const c = T.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      z,
      (p, f) => typeof p != "string" || (i += p.length, i < a + 1) ? !1 : (s = a - i + p.length, l = f, !0)
    );
    if (!c) throw new Error("Internal error: inconsistent search results");
    return {
      node: c,
      offset: s,
      jsonPath: T.convertWorkingStackToJsonPath(l)
    };
  }
  // #endregion
  // #region Extract text from a node + JSONPath + offset
  extractText(e, r) {
    let u = "", n = e.offset, i = 0;
    return T.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      z,
      (o) => {
        if (typeof o != "string") return !1;
        if (n >= o.length)
          return n -= o.length, !1;
        let a = o;
        if (n > 0 && (a = a.substring(n), n = 0), i + a.length < r)
          return i += a.length, u = `${u}${a}`, !1;
        const s = r - i;
        return u = `${u}${a.substring(0, s - 1)}`, !0;
      }
    ), u;
  }
  extractTextBetweenPoints(e, r, u = 100) {
    let n = "";
    return T.findNextMatchingNodeUsingWorkingStack(
      e.node,
      this.convertJsonPathToWorkingStack(e.jsonPath),
      z,
      (i, o) => i === r.node && (typeof i == "object" || r.jsonPath === T.convertWorkingStackToJsonPath(o)) ? !0 : typeof i != "string" ? !1 : (n = `${n}${i}`, n.length > u && (n = n.substring(0, u)), n.length >= u)
    ), n;
  }
  // #endregion
  // #region Edit this USJ data
  static removeContentNodesFromArray(e, r) {
    let u = 0;
    for (let n = e.length - 1; n >= 0; n--) {
      const i = e[n];
      r(i) ? (e.splice(n, 1), u += 1) : typeof i != "string" && i.content && (u += this.removeContentNodesFromArray(i.content, r));
    }
    return u;
  }
  removeContentNodes(e) {
    const r = T.removeContentNodesFromArray(this.usj.content, e);
    return this.usjChanged(), r;
  }
  // #endregion
}
export {
  Un as AsyncVariable,
  xe as CHAPTER_TYPE,
  zn as Collator,
  Ur as DateTimeFormat,
  Kr as DocumentCombiner,
  Bu as FIRST_SCR_BOOK_NUM,
  Su as FIRST_SCR_CHAPTER_NUM,
  Ou as FIRST_SCR_VERSE_NUM,
  Tu as LAST_SCR_BOOK_NUM,
  Yr as Mutex,
  Zn as MutexMap,
  Qn as NonValidatingDocumentCombiner,
  Zr as NumberFormat,
  zr as PlatformEventEmitter,
  ei as UnsubscriberAsyncList,
  T as UsjReaderWriter,
  Ie as VERSE_TYPE,
  Ni as aggregateUnsubscriberAsyncs,
  yi as aggregateUnsubscribers,
  ri as at,
  se as charAt,
  ui as codePointAt,
  bi as compareScrRefs,
  Yn as createSyncProxyForAsyncObject,
  Jn as debounce,
  Ee as deepClone,
  un as deepEqual,
  di as defaultScrRef,
  on as deserialize,
  Au as endsWith,
  ir as ensureArray,
  fi as escapeStringRegexp,
  Ti as formatBytes,
  ni as formatReplacementString,
  Ai as formatScrRef,
  Wn as getAllObjectFunctionNames,
  xu as getChaptersForBook,
  Bi as getCurrentLocale,
  Xn as getErrorMessage,
  Iu as getLocalizeKeyForScrollGroupId,
  Ei as getLocalizeKeysForScrollGroupIds,
  vi as getLocalizedIdFromBookNumber,
  Hn as groupBy,
  Ci as htmlEncode,
  Nu as includes,
  Ae as indexOf,
  li as isLocalizeKey,
  wi as isSerializable,
  Gr as isString,
  nn as isSubset,
  wu as lastIndexOf,
  cn as localizedStringsDocumentSchema,
  ln as menuDocumentSchema,
  Gn as newGuid,
  ii as normalize,
  mi as offsetBook,
  gi as offsetChapter,
  Di as offsetVerse,
  oi as ordinalCompare,
  ai as padEnd,
  si as padStart,
  an as projectSettingsDocumentSchema,
  wt as scrRefToBBBCCCVVV,
  kt as serialize,
  sn as settingsDocumentSchema,
  ci as slice,
  Nt as split,
  or as startsWith,
  C as stringLength,
  P as substring,
  Cu as toArray,
  hi as transformAndEnsureRegExpArray,
  pi as transformAndEnsureRegExpRegExpArray,
  Xr as wait,
  Kn as waitForDuration
};
//# sourceMappingURL=index.js.map
