var re = Object.defineProperty;
var se = (e, t, r) => t in e ? re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var v = (e, t, r) => (se(e, typeof t != "symbol" ? t + "" : t, r), r);
class Ye {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(t, r = 1e4) {
    v(this, "variableName");
    v(this, "promiseToValue");
    v(this, "resolver");
    v(this, "rejecter");
    this.variableName = t, this.promiseToValue = new Promise((s, a) => {
      this.resolver = s, this.rejecter = a;
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
  resolveToValue(t, r = !1) {
    if (this.resolver)
      console.debug(`${this.variableName} is being resolved now`), this.resolver(t), this.complete();
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
  rejectWithReason(t, r = !1) {
    if (this.rejecter)
      console.debug(`${this.variableName} is being rejected now`), this.rejecter(t), this.complete();
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
class et {
  constructor(t = "Anonymous") {
    v(this, "unsubscribers", /* @__PURE__ */ new Set());
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
    const t = [...this.unsubscribers].map((s) => s()), r = await Promise.all(t);
    return this.unsubscribers.clear(), r.every((s, a) => (s || console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${a} failed!`), s));
  }
}
class tt {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    v(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    v(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    v(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    v(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    v(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    v(this, "emit", (t) => {
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
        if (!this.subscriptions)
          return !1;
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
    var r;
    this.assertNotDisposed(), (r = this.subscriptions) == null || r.forEach((s) => s(t));
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
var ae = Object.defineProperty, ie = (e, t, r) => t in e ? ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, u = (e, t, r) => (ie(e, typeof t != "symbol" ? t + "" : t, r), r);
const A = [
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
], M = [
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
], U = [
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
], _ = Ne();
function T(e, t = !0) {
  return t && (e = e.toUpperCase()), e in _ ? _[e] : 0;
}
function P(e) {
  return T(e) > 0;
}
function ne(e) {
  const t = typeof e == "string" ? T(e) : e;
  return t >= 40 && t <= 66;
}
function oe(e) {
  return (typeof e == "string" ? T(e) : e) <= 39;
}
function z(e) {
  return e <= 66;
}
function ue(e) {
  const t = typeof e == "string" ? T(e) : e;
  return Z(t) && !z(t);
}
function* le() {
  for (let e = 1; e <= A.length; e++)
    yield e;
}
const ce = 1, F = A.length;
function he() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function R(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= A.length ? t : A[r];
}
function K(e) {
  return e <= 0 || e > F ? "******" : U[e - 1];
}
function fe(e) {
  return K(T(e));
}
function Z(e) {
  const t = typeof e == "number" ? R(e) : e;
  return P(t) && !M.includes(t);
}
function me(e) {
  const t = typeof e == "number" ? R(e) : e;
  return P(t) && M.includes(t);
}
function pe(e) {
  return U[e - 1].includes("*obsolete*");
}
function Ne() {
  const e = {};
  for (let t = 0; t < A.length; t++)
    e[A[t]] = t + 1;
  return e;
}
const b = {
  allBookIds: A,
  nonCanonicalIds: M,
  bookIdToNumber: T,
  isBookIdValid: P,
  isBookNT: ne,
  isBookOT: oe,
  isBookOTNT: z,
  isBookDC: ue,
  allBookNumbers: le,
  firstBook: ce,
  lastBook: F,
  extraBooks: he,
  bookNumberToId: R,
  bookNumberToEnglishName: K,
  bookIdToEnglishName: fe,
  isCanonical: Z,
  isExtraMaterial: me,
  isObsolete: pe
};
var y = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(y || {});
const O = class {
  // private versInfo: Versification;
  constructor(e) {
    if (u(this, "name"), u(this, "fullPath"), u(this, "isPresent"), u(this, "hasVerseSegments"), u(this, "isCustomized"), u(this, "baseVersification"), u(this, "scriptureBooks"), u(this, "_type"), e != null)
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
let d = O;
u(d, "Original", new O(y.Original)), u(d, "Septuagint", new O(y.Septuagint)), u(d, "Vulgate", new O(y.Vulgate)), u(d, "English", new O(y.English)), u(d, "RussianProtestant", new O(y.RussianProtestant)), u(d, "RussianOrthodox", new O(y.RussianOrthodox));
function D(e, t) {
  const r = t[0];
  for (let s = 1; s < t.length; s++)
    e = e.split(t[s]).join(r);
  return e.split(r);
}
var W = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(W || {});
const o = class {
  constructor(e, t, r, s) {
    if (u(this, "firstChapter"), u(this, "lastChapter"), u(this, "lastVerse"), u(this, "hasSegmentsDefined"), u(this, "text"), u(this, "BBBCCCVVVS"), u(this, "longHashCode"), u(this, "versification"), u(this, "rtlMark", "‏"), u(this, "_bookNum", 0), u(this, "_chapterNum", 0), u(this, "_verseNum", 0), u(this, "_verse"), r == null && s == null)
      if (e != null && typeof e == "string") {
        const a = e, i = t != null && t instanceof d ? t : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = t != null && t instanceof d ? t : void 0;
        this.setEmpty(a), this._verseNum = e % o.chapterDigitShifter, this._chapterNum = Math.floor(
          e % o.bookDigitShifter / o.chapterDigitShifter
        ), this._bookNum = Math.floor(e / o.bookDigitShifter);
      } else if (t == null)
        if (e != null && e instanceof o) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof d ? e : o.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && t != null && r != null)
      if (typeof e == "string" && typeof t == "string" && typeof r == "string")
        this.setEmpty(s), this.updateInternal(e, t, r);
      else if (typeof e == "number" && typeof t == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = t, this._verseNum = r, this.versification = s ?? o.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, t = o.defaultVersification) {
    const r = new o(t);
    return r.parse(e), r;
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
    let t;
    try {
      return t = o.parse(e), { success: !0, verseRef: t };
    } catch (r) {
      if (r instanceof w)
        return t = new o(), { success: !1, verseRef: t };
      throw r;
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
  static getBBBCCCVVV(e, t, r) {
    return e % o.bcvMaxValue * o.bookDigitShifter + (t >= 0 ? t % o.bcvMaxValue * o.chapterDigitShifter : 0) + (r >= 0 ? r % o.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let t;
    if (!e)
      return t = -1, { success: !0, vNum: t };
    t = 0;
    let r;
    for (let s = 0; s < e.length; s++) {
      if (r = e[s], r < "0" || r > "9")
        return s === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +r - +"0", t > o.bcvMaxValue)
        return t = -1, { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
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
    return this._verse != null && (this._verse.includes(o.verseRangeSeparator) || this._verse.includes(o.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return b.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = b.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const t = +e;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: t, vNum: r } = o.tryGetVerseNum(e);
    this._verse = t ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = o.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > b.lastBook)
      throw new w(
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
    this.versification = this.versification != null ? new d(e) : void 0;
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
    return this.validateVerse(o.verseRangeSeparators, o.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return o.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return o.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const i = +a[1].trim();
          this.versification = new d(y[i]);
        } catch {
          throw new w("Invalid reference : " + e);
        }
    }
    const t = e.trim().split(" ");
    if (t.length !== 2)
      throw new w("Invalid reference : " + e);
    const r = t[1].split(":"), s = +r[0];
    if (r.length !== 2 || b.bookIdToNumber(t[0]) === 0 || !Number.isInteger(s) || s < 0 || !o.isVerseParseable(r[1]))
      throw new w("Invalid reference : " + e);
    this.updateInternal(t[0], r[0], r[1]);
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
    return new o(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e._verse === this._verse && e.versification != null && this.versification != null && e.versification.equals(this.versification);
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
  allVerses(e = !1, t = o.verseRangeSeparators, r = o.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const s = [], a = D(this._verse, r);
    for (const i of a.map((n) => D(n, t))) {
      const n = this.clone();
      n.verse = i[0];
      const c = n.verseNum;
      if (s.push(n), i.length > 1) {
        const f = this.clone();
        if (f.verse = i[1], !e)
          for (let m = c + 1; m < f.verseNum; m++) {
            const l = new o(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || s.push(l);
          }
        s.push(f);
      }
    }
    return s;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, t) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const s of this.allVerses(!0, e, t)) {
      const a = s.internalValid;
      if (a !== 0)
        return a;
      const i = s.BBBCCCVVV;
      if (r > i)
        return 3;
      if (r === i)
        return 4;
      r = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > b.lastBook ? 2 : 0;
  }
  setEmpty(e = o.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, t, r) {
    this.bookNum = b.bookIdToNumber(e), this.chapter = t, this.verse = r;
  }
};
let E = o;
u(E, "defaultVersification", d.English), u(E, "verseRangeSeparator", "-"), u(E, "verseSequenceIndicator", ","), u(E, "verseRangeSeparators", [o.verseRangeSeparator]), u(E, "verseSequenceIndicators", [o.verseSequenceIndicator]), u(E, "chapterDigitShifter", 1e3), u(E, "bookDigitShifter", o.chapterDigitShifter * o.chapterDigitShifter), u(E, "bcvMaxValue", o.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
u(E, "ValidStatusType", W);
class w extends Error {
}
const Q = [
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
];
let q;
const rt = () => (q || (q = b.allBookIds.map((e) => ({
  bookId: e,
  label: b.bookIdToEnglishName(e)
}))), q), ve = 1, de = Q.length - 1, ge = 1, Ee = 1, be = (e) => {
  var t;
  return ((t = Q[e]) == null ? void 0 : t.chapters) ?? -1;
}, st = (e, t) => ({
  bookNum: Math.max(ve, Math.min(e.bookNum + t, de)),
  chapterNum: 1,
  verseNum: 1
}), at = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(ge, e.chapterNum + t),
    be(e.bookNum)
  ),
  verseNum: 1
}), it = (e, t) => ({
  ...e,
  verseNum: Math.max(Ee, e.verseNum + t)
}), nt = (e) => (...t) => e.map((s) => s(...t)).every((s) => s), ot = (e) => async (...t) => {
  const r = e.map(async (s) => s(...t));
  return (await Promise.all(r)).every((s) => s);
};
function ut() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function ye(e) {
  return typeof e == "string" || e instanceof String;
}
function lt(e, t = 300) {
  if (ye(e))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => e(...s), t);
  };
}
function ct(e, t, r) {
  const s = /* @__PURE__ */ new Map();
  return e.forEach((a) => {
    const i = t(a), n = s.get(i), c = r ? r(a, i) : a;
    n ? n.push(c) : s.set(i, [c]);
  }), s;
}
function Se(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function Oe(e) {
  if (Se(e))
    return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function ht(e) {
  return Oe(e).message;
}
function Ae(e) {
  return new Promise((t) => setTimeout(t, e));
}
function ft(e, t) {
  const r = Ae(t).then(() => {
  });
  return Promise.any([r, e()]);
}
function mt(e, t = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((a) => {
    try {
      typeof e[a] == "function" && r.add(a);
    } catch (i) {
      console.debug(`Skipping ${a} on ${t} due to error: ${i}`);
    }
  });
  let s = Object.getPrototypeOf(e);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((a) => {
      try {
        typeof e[a] == "function" && r.add(a);
      } catch (i) {
        console.debug(`Skipping ${a} on ${t}'s prototype due to error: ${i}`);
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
var Te = Object.getOwnPropertyNames, Ce = Object.getOwnPropertySymbols, we = Object.prototype.hasOwnProperty;
function J(e, t) {
  return function(s, a, i) {
    return e(s, a, i) && t(s, a, i);
  };
}
function B(e) {
  return function(r, s, a) {
    if (!r || !s || typeof r != "object" || typeof s != "object")
      return e(r, s, a);
    var i = a.cache, n = i.get(r), c = i.get(s);
    if (n && c)
      return n === s && c === r;
    i.set(r, s), i.set(s, r);
    var f = e(r, s, a);
    return i.delete(r), i.delete(s), f;
  };
}
function I(e) {
  return Te(e).concat(Ce(e));
}
var Y = Object.hasOwn || function(e, t) {
  return we.call(e, t);
};
function C(e, t) {
  return e || t ? e === t : e === t || e !== e && t !== t;
}
var ee = "_owner", X = Object.getOwnPropertyDescriptor, j = Object.keys;
function ke(e, t, r) {
  var s = e.length;
  if (t.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(e[s], t[s], s, s, e, t, r))
      return !1;
  return !0;
}
function Be(e, t) {
  return C(e.getTime(), t.getTime());
}
function x(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var s = {}, a = e.entries(), i = 0, n, c; (n = a.next()) && !n.done; ) {
    for (var f = t.entries(), m = !1, l = 0; (c = f.next()) && !c.done; ) {
      var h = n.value, p = h[0], g = h[1], N = c.value, V = N[0], te = N[1];
      !m && !s[l] && (m = r.equals(p, V, i, l, e, t, r) && r.equals(g, te, p, V, e, t, r)) && (s[l] = !0), l++;
    }
    if (!m)
      return !1;
    i++;
  }
  return !0;
}
function qe(e, t, r) {
  var s = j(e), a = s.length;
  if (j(t).length !== a)
    return !1;
  for (var i; a-- > 0; )
    if (i = s[a], i === ee && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !Y(t, i) || !r.equals(e[i], t[i], i, i, e, t, r))
      return !1;
  return !0;
}
function k(e, t, r) {
  var s = I(e), a = s.length;
  if (I(t).length !== a)
    return !1;
  for (var i, n, c; a-- > 0; )
    if (i = s[a], i === ee && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !Y(t, i) || !r.equals(e[i], t[i], i, i, e, t, r) || (n = X(e, i), c = X(t, i), (n || c) && (!n || !c || n.configurable !== c.configurable || n.enumerable !== c.enumerable || n.writable !== c.writable)))
      return !1;
  return !0;
}
function Me(e, t) {
  return C(e.valueOf(), t.valueOf());
}
function Pe(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function G(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var s = {}, a = e.values(), i, n; (i = a.next()) && !i.done; ) {
    for (var c = t.values(), f = !1, m = 0; (n = c.next()) && !n.done; )
      !f && !s[m] && (f = r.equals(i.value, n.value, i.value, n.value, e, t, r)) && (s[m] = !0), m++;
    if (!f)
      return !1;
  }
  return !0;
}
function Re(e, t) {
  var r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var Ve = "[object Arguments]", _e = "[object Boolean]", De = "[object Date]", Je = "[object Map]", Ie = "[object Number]", Xe = "[object Object]", je = "[object RegExp]", xe = "[object Set]", Ge = "[object String]", He = Array.isArray, H = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, L = Object.assign, Le = Object.prototype.toString.call.bind(Object.prototype.toString);
function $e(e) {
  var t = e.areArraysEqual, r = e.areDatesEqual, s = e.areMapsEqual, a = e.areObjectsEqual, i = e.arePrimitiveWrappersEqual, n = e.areRegExpsEqual, c = e.areSetsEqual, f = e.areTypedArraysEqual;
  return function(l, h, p) {
    if (l === h)
      return !0;
    if (l == null || h == null || typeof l != "object" || typeof h != "object")
      return l !== l && h !== h;
    var g = l.constructor;
    if (g !== h.constructor)
      return !1;
    if (g === Object)
      return a(l, h, p);
    if (He(l))
      return t(l, h, p);
    if (H != null && H(l))
      return f(l, h, p);
    if (g === Date)
      return r(l, h, p);
    if (g === RegExp)
      return n(l, h, p);
    if (g === Map)
      return s(l, h, p);
    if (g === Set)
      return c(l, h, p);
    var N = Le(l);
    return N === De ? r(l, h, p) : N === je ? n(l, h, p) : N === Je ? s(l, h, p) : N === xe ? c(l, h, p) : N === Xe ? typeof l.then != "function" && typeof h.then != "function" && a(l, h, p) : N === Ve ? a(l, h, p) : N === _e || N === Ie || N === Ge ? i(l, h, p) : !1;
  };
}
function Ue(e) {
  var t = e.circular, r = e.createCustomConfig, s = e.strict, a = {
    areArraysEqual: s ? k : ke,
    areDatesEqual: Be,
    areMapsEqual: s ? J(x, k) : x,
    areObjectsEqual: s ? k : qe,
    arePrimitiveWrappersEqual: Me,
    areRegExpsEqual: Pe,
    areSetsEqual: s ? J(G, k) : G,
    areTypedArraysEqual: s ? k : Re
  };
  if (r && (a = L({}, a, r(a))), t) {
    var i = B(a.areArraysEqual), n = B(a.areMapsEqual), c = B(a.areObjectsEqual), f = B(a.areSetsEqual);
    a = L({}, a, {
      areArraysEqual: i,
      areMapsEqual: n,
      areObjectsEqual: c,
      areSetsEqual: f
    });
  }
  return a;
}
function ze(e) {
  return function(t, r, s, a, i, n, c) {
    return e(t, r, c);
  };
}
function Fe(e) {
  var t = e.circular, r = e.comparator, s = e.createState, a = e.equals, i = e.strict;
  if (s)
    return function(f, m) {
      var l = s(), h = l.cache, p = h === void 0 ? t ? /* @__PURE__ */ new WeakMap() : void 0 : h, g = l.meta;
      return r(f, m, {
        cache: p,
        equals: a,
        meta: g,
        strict: i
      });
    };
  if (t)
    return function(f, m) {
      return r(f, m, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: a,
        meta: void 0,
        strict: i
      });
    };
  var n = {
    cache: void 0,
    equals: a,
    meta: void 0,
    strict: i
  };
  return function(f, m) {
    return r(f, m, n);
  };
}
var Ke = S();
S({ strict: !0 });
S({ circular: !0 });
S({
  circular: !0,
  strict: !0
});
S({
  createInternalComparator: function() {
    return C;
  }
});
S({
  strict: !0,
  createInternalComparator: function() {
    return C;
  }
});
S({
  circular: !0,
  createInternalComparator: function() {
    return C;
  }
});
S({
  circular: !0,
  createInternalComparator: function() {
    return C;
  },
  strict: !0
});
function S(e) {
  e === void 0 && (e = {});
  var t = e.circular, r = t === void 0 ? !1 : t, s = e.createInternalComparator, a = e.createState, i = e.strict, n = i === void 0 ? !1 : i, c = Ue(e), f = $e(c), m = s ? s(f) : ze(f);
  return Fe({ circular: r, comparator: f, createState: a, equals: m, strict: n });
}
function pt(e, t) {
  return Ke(e, t);
}
function $(e, t, r) {
  return JSON.stringify(e, (a, i) => {
    let n = i;
    return t && (n = t(a, n)), n === void 0 && (n = null), n;
  }, r);
}
function Ze(e, t) {
  function r(a) {
    return Object.keys(a).forEach((i) => {
      a[i] === null ? a[i] = void 0 : typeof a[i] == "object" && (a[i] = r(a[i]));
    }), a;
  }
  const s = JSON.parse(e, t);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function Nt(e) {
  try {
    const t = $(e);
    return t === $(Ze(t));
  } catch {
    return !1;
  }
}
const vt = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
function We(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), s = r.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && s ? r.insertBefore(a, s) : r.appendChild(a);
}
We("", "top");
export {
  Ye as AsyncVariable,
  ve as FIRST_SCR_BOOK_NUM,
  ge as FIRST_SCR_CHAPTER_NUM,
  Ee as FIRST_SCR_VERSE_NUM,
  de as LAST_SCR_BOOK_NUM,
  tt as PlatformEventEmitter,
  et as UnsubscriberAsyncList,
  ot as aggregateUnsubscriberAsyncs,
  nt as aggregateUnsubscribers,
  lt as debounce,
  pt as deepEqual,
  Ze as deserialize,
  mt as getAllObjectFunctionNames,
  rt as getBookNameOptions,
  be as getChaptersForBook,
  ht as getErrorMessage,
  ct as groupBy,
  vt as htmlEncode,
  Nt as isSerializable,
  ye as isString,
  ut as newGuid,
  st as offsetBook,
  at as offsetChapter,
  it as offsetVerse,
  $ as serialize,
  Ae as wait,
  ft as waitForDuration
};
//# sourceMappingURL=index.es.js.map
