var we = Object.defineProperty;
var Oe = (t, e, r) => e in t ? we(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var d = (t, e, r) => (Oe(t, typeof e != "symbol" ? e + "" : e, r), r);
import { Mutex as Se } from "async-mutex";
class Jt {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
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
   *   or rejected
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
   *   or rejected
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
function _t() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function Ae(t) {
  return typeof t == "string" || t instanceof String;
}
function B(t) {
  return JSON.parse(JSON.stringify(t));
}
function Gt(t, e = 300) {
  if (Ae(t))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => t(...s), e);
  };
}
function Xt(t, e, r) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const i = e(n), o = s.get(i), a = r ? r(n, i) : n;
    o ? o.push(a) : s.set(i, [a]);
  }), s;
}
function Ce(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function Me(t) {
  if (Ce(t))
    return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function zt(t) {
  return Me(t).message;
}
function $e(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Ht(t, e) {
  const r = $e(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function Lt(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((n) => {
    try {
      typeof t[n] == "function" && r.add(n);
    } catch (i) {
      console.debug(`Skipping ${n} on ${e} due to error: ${i}`);
    }
  });
  let s = Object.getPrototypeOf(t);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((n) => {
      try {
        typeof t[n] == "function" && r.add(n);
      } catch (i) {
        console.debug(`Skipping ${n} on ${e}'s prototype due to error: ${i}`);
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function Ut(t, e = {}) {
  return new Proxy(e, {
    get(r, s) {
      return s in r ? r[s] : async (...n) => (await t())[s](...n);
    }
  });
}
class Te {
  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    d(this, "baseDocument");
    d(this, "contributions", /* @__PURE__ */ new Map());
    d(this, "latestOutput");
    d(this, "options");
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateStartingDocument(e), this.baseDocument = this.options.copyDocuments ? B(e) : e, this.rebuild();
  }
  /**
   * Add or update one of the contribution documents for the composition process
   *
   * @param documentName Name of the contributed document to combine
   * @param document Content of the contributed document to combine
   * @returns Recalculated output document given the new or updated contribution and existing other
   *   documents
   */
  addOrUpdateContribution(e, r) {
    this.validateContribution(e, r);
    const s = this.contributions.get(e), n = this.options.copyDocuments && r ? B(r) : r;
    this.contributions.set(e, n);
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
      throw new Error("{documentKey} does not exist");
    this.contributions.delete(e);
    try {
      return this.rebuild();
    } catch (s) {
      throw this.contributions.set(e, r), new Error(`Error when deleting the document named ${e}: ${s}`);
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
      return r = this.transformFinalOutput(r), this.validateOutput(r), this.latestOutput = r, this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = ie(
        e,
        r,
        this.options.ignoreDuplicateProperties
      ), this.validateOutput(e);
    }), e = this.transformFinalOutput(e), this.validateOutput(e), this.latestOutput = e, this.latestOutput;
  }
}
function Pe(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function De(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function ie(t, e, r) {
  const s = B(t);
  return e && Object.keys(e).forEach((n) => {
    if (Object.hasOwn(t, n)) {
      if (Pe(t[n], e[n]))
        s[n] = ie(
          // We know these are objects from the `if` check
          /* eslint-disable no-type-assertion/no-type-assertion */
          t[n],
          e[n],
          r
          /* eslint-enable no-type-assertion/no-type-assertion */
        );
      else if (De(t[n], e[n]))
        s[n] = s[n].concat(e[n]);
      else if (!r)
        throw new Error(`Cannot merge objects: key "${n}" already exists in the target object`);
    } else
      s[n] = e[n];
  }), s;
}
class Kt extends Te {
  // Making the protected base constructor public
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e, r) {
    super(e, r);
  }
  get output() {
    return this.latestOutput;
  }
  // Intentionally not using `this`
  // eslint-disable-next-line class-methods-use-this
  transformFinalOutput(e) {
    return e;
  }
  // These abstract methods from the base class are intentionally left blank
  /* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
  validateStartingDocument(e) {
  }
  validateContribution(e, r) {
  }
  validateOutput(e) {
  }
  /* eslint-enable @typescript-eslint/no-unused-vars, class-methods-use-this */
}
class Ft {
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
class Wt {
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
    var r;
    this.assertNotDisposed(), (r = this.subscriptions) == null || r.forEach((s) => s(e));
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
class Re extends Se {
}
class Zt {
  constructor() {
    d(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new Re(), this.mutexesByID.set(e, r), r);
  }
}
var Be = Object.defineProperty, Ie = (t, e, r) => e in t ? Be(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, l = (t, e, r) => (Ie(t, typeof e != "symbol" ? e + "" : e, r), r);
const S = [
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
], x = [
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
], oe = [
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
], L = ze();
function M(t, e = !0) {
  return e && (t = t.toUpperCase()), t in L ? L[t] : 0;
}
function J(t) {
  return M(t) > 0;
}
function qe(t) {
  const e = typeof t == "string" ? M(t) : t;
  return e >= 40 && e <= 66;
}
function ke(t) {
  return (typeof t == "string" ? M(t) : t) <= 39;
}
function ae(t) {
  return t <= 66;
}
function Ve(t) {
  const e = typeof t == "string" ? M(t) : t;
  return ce(e) && !ae(e);
}
function* je() {
  for (let t = 1; t <= S.length; t++)
    yield t;
}
const xe = 1, ue = S.length;
function Je() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function _(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= S.length ? e : S[r];
}
function le(t) {
  return t <= 0 || t > ue ? "******" : oe[t - 1];
}
function _e(t) {
  return le(M(t));
}
function ce(t) {
  const e = typeof t == "number" ? _(t) : t;
  return J(e) && !x.includes(e);
}
function Ge(t) {
  const e = typeof t == "number" ? _(t) : t;
  return J(e) && x.includes(e);
}
function Xe(t) {
  return oe[t - 1].includes("*obsolete*");
}
function ze() {
  const t = {};
  for (let e = 0; e < S.length; e++)
    t[S[e]] = e + 1;
  return t;
}
const E = {
  allBookIds: S,
  nonCanonicalIds: x,
  bookIdToNumber: M,
  isBookIdValid: J,
  isBookNT: qe,
  isBookOT: ke,
  isBookOTNT: ae,
  isBookDC: Ve,
  allBookNumbers: je,
  firstBook: xe,
  lastBook: ue,
  extraBooks: Je,
  bookNumberToId: _,
  bookNumberToEnglishName: le,
  bookIdToEnglishName: _e,
  isCanonical: ce,
  isExtraMaterial: Ge,
  isObsolete: Xe
};
var w = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(w || {});
const y = class {
  // private versInfo: Versification;
  constructor(e) {
    if (l(this, "name"), l(this, "fullPath"), l(this, "isPresent"), l(this, "hasVerseSegments"), l(this, "isCustomized"), l(this, "baseVersification"), l(this, "scriptureBooks"), l(this, "_type"), e != null)
      typeof e == "string" ? this.name = e : this._type = e;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
l(y, "Original", new y(w.Original)), l(y, "Septuagint", new y(w.Septuagint)), l(y, "Vulgate", new y(w.Vulgate)), l(y, "English", new y(w.English)), l(y, "RussianProtestant", new y(w.RussianProtestant)), l(y, "RussianOrthodox", new y(w.RussianOrthodox));
let C = y;
function U(t, e) {
  const r = e[0];
  for (let s = 1; s < e.length; s++)
    t = t.split(e[s]).join(r);
  return t.split(r);
}
var fe = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(fe || {});
const v = class f {
  constructor(e, r, s, n) {
    if (l(this, "firstChapter"), l(this, "lastChapter"), l(this, "lastVerse"), l(this, "hasSegmentsDefined"), l(this, "text"), l(this, "BBBCCCVVVS"), l(this, "longHashCode"), l(this, "versification"), l(this, "rtlMark", "‏"), l(this, "_bookNum", 0), l(this, "_chapterNum", 0), l(this, "_verseNum", 0), l(this, "_verse"), s == null && n == null)
      if (e != null && typeof e == "string") {
        const i = e, o = r != null && r instanceof C ? r : void 0;
        this.setEmpty(o), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = r != null && r instanceof C ? r : void 0;
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
          const i = e instanceof C ? e : f.defaultVersification;
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
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, r = f.defaultVersification) {
    const s = new f(r);
    return s.parse(e), s;
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
      return r = f.parse(e), { success: !0, verseRef: r };
    } catch (s) {
      if (s instanceof P)
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
      if (r = r * 10 + +s - +"0", r > f.bcvMaxValue)
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
      throw new P(
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
    this.versification = this.versification != null ? new C(e) : void 0;
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
          this.versification = new C(w[o]);
        } catch {
          throw new P("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new P("Invalid reference : " + e);
    const s = r[1].split(":"), n = +s[0];
    if (s.length !== 2 || E.bookIdToNumber(r[0]) === 0 || !Number.isInteger(n) || n < 0 || !f.isVerseParseable(s[1]))
      throw new P("Invalid reference : " + e);
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
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return e instanceof f ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && e.versification != null && this.versification != null && e.versification.equals(this.versification) : !1;
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
    const n = [], i = U(this._verse, s);
    for (const o of i.map((a) => U(a, r))) {
      const a = this.clone();
      a.verse = o[0];
      const h = a.verseNum;
      if (n.push(a), o.length > 1) {
        const m = this.clone();
        if (m.verse = o[1], !e)
          for (let u = h + 1; u < m.verseNum; u++) {
            const c = new f(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || n.push(c);
          }
        n.push(m);
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
l(v, "defaultVersification", C.English), l(v, "verseRangeSeparator", "-"), l(v, "verseSequenceIndicator", ","), l(v, "verseRangeSeparators", [v.verseRangeSeparator]), l(v, "verseSequenceIndicators", [v.verseSequenceIndicator]), l(v, "chapterDigitShifter", 1e3), l(v, "bookDigitShifter", v.chapterDigitShifter * v.chapterDigitShifter), l(v, "bcvMaxValue", v.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
l(v, "ValidStatusType", fe);
class P extends Error {
}
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, A = {}, He = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", n = "\\u1ab0-\\u1aff", i = "\\u1dc0-\\u1dff", o = e + r + s + n + i, a = "\\ufe0e\\ufe0f", h = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", m = `[${t}]`, u = `[${o}]`, c = "\\ud83c[\\udffb-\\udfff]", p = `(?:${u}|${c})`, g = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", T = "[\\ud800-\\udbff][\\udc00-\\udfff]", V = "\\u200d", be = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", ve = `[${h}]`, z = `${p}?`, H = `[${a}]?`, ge = `(?:${V}(?:${[g, b, T].join("|")})${H + z})*`, ye = H + z + ge, Ee = `(?:${[`${g}${u}?`, u, b, T, m, ve].join("|")})`;
  return new RegExp(`${be}|${c}(?=${c})|${Ee + ye}`, "g");
}, Le = K && K.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(A, "__esModule", { value: !0 });
var q = Le(He);
function j(t) {
  if (typeof t != "string")
    throw new Error("A string is expected as input");
  return t.match(q.default()) || [];
}
var Ue = A.toArray = j;
function G(t) {
  if (typeof t != "string")
    throw new Error("Input must be a string");
  var e = t.match(q.default());
  return e === null ? 0 : e.length;
}
var Ke = A.length = G;
function he(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  (typeof e != "number" || e < 0) && (e = 0), typeof r == "number" && r < 0 && (r = 0);
  var s = t.match(q.default());
  return s ? s.slice(e, r).join("") : "";
}
var Fe = A.substring = he;
function We(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  var s = G(t);
  if (typeof e != "number" && (e = parseInt(e, 10)), e >= s)
    return "";
  e < 0 && (e += s);
  var n;
  typeof r > "u" ? n = s : (typeof r != "number" && (r = parseInt(r, 10)), n = r >= 0 ? r + e : e);
  var i = t.match(q.default());
  return i ? i.slice(e, n).join("") : "";
}
var Ze = A.substr = We;
function Qe(t, e, r, s) {
  if (e === void 0 && (e = 16), r === void 0 && (r = "#"), s === void 0 && (s = "right"), typeof t != "string" || typeof e != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(s) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var n = G(t);
  if (n > e)
    return he(t, 0, e);
  if (n < e) {
    var i = r.repeat(e - n);
    return s === "left" ? i + t : t + i;
  }
  return t;
}
var me = A.limit = Qe;
function Ye(t, e, r) {
  if (r === void 0 && (r = 0), typeof t != "string")
    throw new Error("Input must be a string");
  if (t === "")
    return e === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, e = String(e);
  var s = j(t);
  if (r >= s.length)
    return e === "" ? s.length : -1;
  if (e === "")
    return r;
  var n = j(e), i = !1, o;
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
var et = A.indexOf = Ye;
function Yt(t, e) {
  if (!(e > N(t) || e < -N(t)))
    return k(t, e, 1);
}
function er(t, e) {
  return e < 0 || e > N(t) - 1 ? "" : k(t, e, 1);
}
function tr(t, e) {
  if (!(e < 0 || e > N(t) - 1))
    return k(t, e, 1).codePointAt(0);
}
function rr(t, e, r = N(t)) {
  const s = rt(t, e);
  return !(s === -1 || s + N(e) !== r);
}
function tt(t, e, r = 0) {
  const s = I(t, r);
  return X(s, e) !== -1;
}
function X(t, e, r = 0) {
  return et(t, e, r);
}
function rt(t, e, r) {
  let s = r === void 0 ? N(t) : r;
  s < 0 ? s = 0 : s >= N(t) && (s = N(t) - 1);
  for (let n = s; n >= 0; n--)
    if (k(t, n, N(e)) === e)
      return n;
  return -1;
}
function N(t) {
  return Ke(t);
}
function sr(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function nr(t, e, r = " ") {
  return e <= N(t) ? t : me(t, e, r, "right");
}
function ir(t, e, r = " ") {
  return e <= N(t) ? t : me(t, e, r, "left");
}
function F(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function or(t, e, r) {
  const s = N(t);
  if (e > s || r && (e > r && !(e > 0 && e < s && r < 0 && r > -s) || r < -s || e < 0 && e > -s && r > 0))
    return "";
  const n = F(s, e), i = r ? F(s, r) : void 0;
  return I(t, n, i);
}
function ar(t, e, r) {
  const s = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "")
    return nt(t).slice(0, r);
  let n = e;
  (typeof e == "string" || e instanceof RegExp && !tt(e.flags, "g")) && (n = new RegExp(e, "g"));
  const i = t.match(n);
  let o = 0;
  if (!i)
    return [t];
  for (let a = 0; a < (r ? r - 1 : i.length); a++) {
    const h = X(t, i[a], o), m = N(i[a]);
    if (s.push(I(t, o, h)), o = h + m, r !== void 0 && s.length === r)
      break;
  }
  return s.push(I(t, o)), s;
}
function st(t, e, r = 0) {
  return X(t, e, r) === r;
}
function k(t, e = 0, r = N(t) - e) {
  return Ze(t, e, r);
}
function I(t, e, r = N(t)) {
  return Fe(t, e, r);
}
function nt(t) {
  return Ue(t);
}
const pe = [
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
], it = 1, ot = pe.length - 1, at = 1, ut = 1, lt = (t) => {
  var e;
  return ((e = pe[t]) == null ? void 0 : e.chapters) ?? -1;
}, ur = (t, e) => ({
  bookNum: Math.max(it, Math.min(t.bookNum + e, ot)),
  chapterNum: 1,
  verseNum: 1
}), lr = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(at, t.chapterNum + e),
    lt(t.bookNum)
  ),
  verseNum: 1
}), cr = (t, e) => ({
  ...t,
  verseNum: Math.max(ut, t.verseNum + e)
});
async function fr(t, e, r) {
  const s = E.bookNumberToId(t);
  return st(Intl.getCanonicalLocales(e)[0], "zh") ? `Book.${s}`.split("-")[0].split("ÿ08")[0].trim() : r({ localizeKey: `LocalizedId.${s}` });
}
const hr = (t) => (...e) => t.map((s) => s(...e)).every((s) => s), mr = (t) => async (...e) => {
  const r = t.map(async (s) => s(...e));
  return (await Promise.all(r)).every((s) => s);
};
var ct = Object.getOwnPropertyNames, ft = Object.getOwnPropertySymbols, ht = Object.prototype.hasOwnProperty;
function W(t, e) {
  return function(s, n, i) {
    return t(s, n, i) && e(s, n, i);
  };
}
function R(t) {
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
function Z(t) {
  return ct(t).concat(ft(t));
}
var de = Object.hasOwn || function(t, e) {
  return ht.call(t, e);
};
function $(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var Ne = "_owner", Q = Object.getOwnPropertyDescriptor, Y = Object.keys;
function mt(t, e, r) {
  var s = t.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(t[s], e[s], s, s, t, e, r))
      return !1;
  return !0;
}
function pt(t, e) {
  return $(t.getTime(), e.getTime());
}
function ee(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.entries(), i = 0, o, a; (o = n.next()) && !o.done; ) {
    for (var h = e.entries(), m = !1, u = 0; (a = h.next()) && !a.done; ) {
      var c = o.value, p = c[0], g = c[1], b = a.value, T = b[0], V = b[1];
      !m && !s[u] && (m = r.equals(p, T, i, u, t, e, r) && r.equals(g, V, p, T, t, e, r)) && (s[u] = !0), u++;
    }
    if (!m)
      return !1;
    i++;
  }
  return !0;
}
function dt(t, e, r) {
  var s = Y(t), n = s.length;
  if (Y(e).length !== n)
    return !1;
  for (var i; n-- > 0; )
    if (i = s[n], i === Ne && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !de(e, i) || !r.equals(t[i], e[i], i, i, t, e, r))
      return !1;
  return !0;
}
function D(t, e, r) {
  var s = Z(t), n = s.length;
  if (Z(e).length !== n)
    return !1;
  for (var i, o, a; n-- > 0; )
    if (i = s[n], i === Ne && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !de(e, i) || !r.equals(t[i], e[i], i, i, t, e, r) || (o = Q(t, i), a = Q(e, i), (o || a) && (!o || !a || o.configurable !== a.configurable || o.enumerable !== a.enumerable || o.writable !== a.writable)))
      return !1;
  return !0;
}
function Nt(t, e) {
  return $(t.valueOf(), e.valueOf());
}
function bt(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function te(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.values(), i, o; (i = n.next()) && !i.done; ) {
    for (var a = e.values(), h = !1, m = 0; (o = a.next()) && !o.done; )
      !h && !s[m] && (h = r.equals(i.value, o.value, i.value, o.value, t, e, r)) && (s[m] = !0), m++;
    if (!h)
      return !1;
  }
  return !0;
}
function vt(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var gt = "[object Arguments]", yt = "[object Boolean]", Et = "[object Date]", wt = "[object Map]", Ot = "[object Number]", St = "[object Object]", At = "[object RegExp]", Ct = "[object Set]", Mt = "[object String]", $t = Array.isArray, re = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, se = Object.assign, Tt = Object.prototype.toString.call.bind(Object.prototype.toString);
function Pt(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, s = t.areMapsEqual, n = t.areObjectsEqual, i = t.arePrimitiveWrappersEqual, o = t.areRegExpsEqual, a = t.areSetsEqual, h = t.areTypedArraysEqual;
  return function(u, c, p) {
    if (u === c)
      return !0;
    if (u == null || c == null || typeof u != "object" || typeof c != "object")
      return u !== u && c !== c;
    var g = u.constructor;
    if (g !== c.constructor)
      return !1;
    if (g === Object)
      return n(u, c, p);
    if ($t(u))
      return e(u, c, p);
    if (re != null && re(u))
      return h(u, c, p);
    if (g === Date)
      return r(u, c, p);
    if (g === RegExp)
      return o(u, c, p);
    if (g === Map)
      return s(u, c, p);
    if (g === Set)
      return a(u, c, p);
    var b = Tt(u);
    return b === Et ? r(u, c, p) : b === At ? o(u, c, p) : b === wt ? s(u, c, p) : b === Ct ? a(u, c, p) : b === St ? typeof u.then != "function" && typeof c.then != "function" && n(u, c, p) : b === gt ? n(u, c, p) : b === yt || b === Ot || b === Mt ? i(u, c, p) : !1;
  };
}
function Dt(t) {
  var e = t.circular, r = t.createCustomConfig, s = t.strict, n = {
    areArraysEqual: s ? D : mt,
    areDatesEqual: pt,
    areMapsEqual: s ? W(ee, D) : ee,
    areObjectsEqual: s ? D : dt,
    arePrimitiveWrappersEqual: Nt,
    areRegExpsEqual: bt,
    areSetsEqual: s ? W(te, D) : te,
    areTypedArraysEqual: s ? D : vt
  };
  if (r && (n = se({}, n, r(n))), e) {
    var i = R(n.areArraysEqual), o = R(n.areMapsEqual), a = R(n.areObjectsEqual), h = R(n.areSetsEqual);
    n = se({}, n, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: a,
      areSetsEqual: h
    });
  }
  return n;
}
function Rt(t) {
  return function(e, r, s, n, i, o, a) {
    return t(e, r, a);
  };
}
function Bt(t) {
  var e = t.circular, r = t.comparator, s = t.createState, n = t.equals, i = t.strict;
  if (s)
    return function(h, m) {
      var u = s(), c = u.cache, p = c === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : c, g = u.meta;
      return r(h, m, {
        cache: p,
        equals: n,
        meta: g,
        strict: i
      });
    };
  if (e)
    return function(h, m) {
      return r(h, m, {
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
  return function(h, m) {
    return r(h, m, o);
  };
}
var It = O();
O({ strict: !0 });
O({ circular: !0 });
O({
  circular: !0,
  strict: !0
});
O({
  createInternalComparator: function() {
    return $;
  }
});
O({
  strict: !0,
  createInternalComparator: function() {
    return $;
  }
});
O({
  circular: !0,
  createInternalComparator: function() {
    return $;
  }
});
O({
  circular: !0,
  createInternalComparator: function() {
    return $;
  },
  strict: !0
});
function O(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, s = t.createInternalComparator, n = t.createState, i = t.strict, o = i === void 0 ? !1 : i, a = Dt(t), h = Pt(a), m = s ? s(h) : Rt(h);
  return Bt({ circular: r, comparator: h, createState: n, equals: m, strict: o });
}
function pr(t, e) {
  return It(t, e);
}
function ne(t, e, r) {
  return JSON.stringify(t, (n, i) => {
    let o = i;
    return e && (o = e(n, o)), o === void 0 && (o = null), o;
  }, r);
}
function qt(t, e) {
  function r(n) {
    return Object.keys(n).forEach((i) => {
      n[i] === null ? n[i] = void 0 : typeof n[i] == "object" && (n[i] = r(n[i]));
    }), n;
  }
  const s = JSON.parse(t, e);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function dr(t) {
  try {
    const e = ne(t);
    return e === ne(qt(e));
  } catch {
    return !1;
  }
}
const Nr = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;"), kt = {
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
Object.freeze(kt);
export {
  Jt as AsyncVariable,
  Te as DocumentCombinerEngine,
  it as FIRST_SCR_BOOK_NUM,
  at as FIRST_SCR_CHAPTER_NUM,
  ut as FIRST_SCR_VERSE_NUM,
  ot as LAST_SCR_BOOK_NUM,
  Re as Mutex,
  Zt as MutexMap,
  Kt as NonValidatingDocumentCombiner,
  Wt as PlatformEventEmitter,
  Ft as UnsubscriberAsyncList,
  mr as aggregateUnsubscriberAsyncs,
  hr as aggregateUnsubscribers,
  Yt as at,
  er as charAt,
  tr as codePointAt,
  Ut as createSyncProxyForAsyncObject,
  Gt as debounce,
  B as deepClone,
  pr as deepEqual,
  qt as deserialize,
  rr as endsWith,
  Lt as getAllObjectFunctionNames,
  lt as getChaptersForBook,
  zt as getErrorMessage,
  fr as getLocalizedIdFromBookNumber,
  Xt as groupBy,
  Nr as htmlEncode,
  tt as includes,
  X as indexOf,
  dr as isSerializable,
  Ae as isString,
  rt as lastIndexOf,
  kt as menuDocumentSchema,
  _t as newGuid,
  sr as normalize,
  ur as offsetBook,
  lr as offsetChapter,
  cr as offsetVerse,
  nr as padEnd,
  ir as padStart,
  ne as serialize,
  or as slice,
  ar as split,
  st as startsWith,
  N as stringLength,
  I as substring,
  nt as toArray,
  $e as wait,
  Ht as waitForDuration
};
//# sourceMappingURL=index.js.map
