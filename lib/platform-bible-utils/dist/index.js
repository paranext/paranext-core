var te = Object.defineProperty;
var re = (t, e, r) => e in t ? te(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var p = (t, e, r) => (re(t, typeof e != "symbol" ? e + "" : e, r), r);
import { Mutex as se } from "async-mutex";
class nt {
  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(e, r = 1e4) {
    p(this, "variableName");
    p(this, "promiseToValue");
    p(this, "resolver");
    p(this, "rejecter");
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
function ot() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function ne(t) {
  return typeof t == "string" || t instanceof String;
}
function O(t) {
  return JSON.parse(JSON.stringify(t));
}
function at(t, e = 300) {
  if (ne(t))
    throw new Error("Tried to debounce a string! Could be XSS");
  let r;
  return (...s) => {
    clearTimeout(r), r = setTimeout(() => t(...s), e);
  };
}
function it(t, e, r) {
  const s = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const o = e(n), a = s.get(o), i = r ? r(n, o) : n;
    a ? a.push(i) : s.set(o, [i]);
  }), s;
}
function oe(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function ae(t) {
  if (oe(t))
    return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function ut(t) {
  return ae(t).message;
}
function ie(t) {
  return new Promise((e) => setTimeout(e, t));
}
function lt(t, e) {
  const r = ie(e).then(() => {
  });
  return Promise.any([r, t()]);
}
function ct(t, e = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((n) => {
    try {
      typeof t[n] == "function" && r.add(n);
    } catch (o) {
      console.debug(`Skipping ${n} on ${e} due to error: ${o}`);
    }
  });
  let s = Object.getPrototypeOf(t);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((n) => {
      try {
        typeof t[n] == "function" && r.add(n);
      } catch (o) {
        console.debug(`Skipping ${n} on ${e}'s prototype due to error: ${o}`);
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function ft(t, e = {}) {
  return new Proxy(e, {
    get(r, s) {
      return s in r ? r[s] : async (...n) => (await t())[s](...n);
    }
  });
}
class ht {
  /**
   * Create a DocumentCombinerEngine instance
   *
   * @param baseDocument This is the first document that will be used when composing the output
   * @param options Options used by this object when combining documents
   */
  constructor(e, r) {
    p(this, "baseDocument");
    p(this, "contributions", /* @__PURE__ */ new Map());
    p(this, "latestOutput");
    p(this, "options");
    this.baseDocument = e, this.options = r, this.updateBaseDocument(e);
  }
  /**
   * Update the starting document for composition process
   *
   * @param baseDocument Base JSON document/JS object that all other documents are added to
   * @returns Recalculated output document given the new starting state and existing other documents
   */
  updateBaseDocument(e) {
    return this.validateStartingDocument(e), this.baseDocument = this.options.copyDocuments ? O(e) : e, this.rebuild();
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
    const s = this.contributions.get(e), n = this.options.copyDocuments && r ? O(r) : r;
    this.contributions.set(e, n);
    try {
      return this.rebuild();
    } catch (o) {
      throw s ? this.contributions.set(e, s) : this.contributions.delete(e), new Error(`Error when setting the document named ${e}: ${o}`);
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
      let r = O(this.baseDocument);
      return r = this.transformFinalOutput(r), this.validateOutput(r), this.latestOutput = r, this.latestOutput;
    }
    let e = this.baseDocument;
    return this.contributions.forEach((r) => {
      e = U(
        e,
        r,
        this.options.ignoreDuplicateProperties
      ), this.validateOutput(e);
    }), e = this.transformFinalOutput(e), this.validateOutput(e), this.latestOutput = e, this.latestOutput;
  }
}
function ue(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || Array.isArray(r)) && (e = !1);
  }), e;
}
function le(...t) {
  let e = !0;
  return t.forEach((r) => {
    (!r || typeof r != "object" || !Array.isArray(r)) && (e = !1);
  }), e;
}
function U(t, e, r) {
  const s = O(t);
  return e && Object.keys(e).forEach((n) => {
    if (Object.hasOwn(t, n)) {
      if (ue(t[n], e[n]))
        s[n] = U(
          // We know these are objects from the `if` check
          /* eslint-disable no-type-assertion/no-type-assertion */
          t[n],
          e[n],
          r
          /* eslint-enable no-type-assertion/no-type-assertion */
        );
      else if (le(t[n], e[n]))
        s[n] = s[n].concat(e[n]);
      else if (!r)
        throw new Error(`Cannot merge objects: key "${n}" already exists in the target object`);
    } else
      s[n] = e[n];
  }), s;
}
class pt {
  constructor(e = "Anonymous") {
    p(this, "unsubscribers", /* @__PURE__ */ new Set());
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
class mt {
  constructor() {
    /**
     * Subscribes a function to run when this event is emitted.
     *
     * @param callback Function to run with the event when it is emitted
     * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
     *   emitted
     * @alias event
     */
    p(this, "subscribe", this.event);
    /** All callback functions that will run when this event is emitted. Lazy loaded */
    p(this, "subscriptions");
    /** Event for listeners to subscribe to. Lazy loaded */
    p(this, "lazyEvent");
    /** Whether this emitter has been disposed */
    p(this, "isDisposed", !1);
    /** Disposes of this event, preparing it to release from memory */
    p(this, "dispose", () => this.disposeFn());
    /**
     * Runs the subscriptions for the event
     *
     * @param event Event data to provide to subscribed callbacks
     */
    p(this, "emit", (e) => {
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
class ce extends se {
}
class dt {
  constructor() {
    p(this, "mutexesByID", /* @__PURE__ */ new Map());
  }
  get(e) {
    let r = this.mutexesByID.get(e);
    return r || (r = new ce(), this.mutexesByID.set(e, r), r);
  }
}
const k = [
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
], fe = 1, he = k.length - 1, pe = 1, me = 1, de = (t) => {
  var e;
  return ((e = k[t]) == null ? void 0 : e.chapters) ?? -1;
}, bt = (t, e) => ({
  bookNum: Math.max(fe, Math.min(t.bookNum + e, he)),
  chapterNum: 1,
  verseNum: 1
}), Nt = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(pe, t.chapterNum + e),
    de(t.bookNum)
  ),
  verseNum: 1
}), gt = (t, e) => ({
  ...t,
  verseNum: Math.max(me, t.verseNum + e)
}), vt = (t) => (...e) => t.map((s) => s(...e)).every((s) => s), yt = (t) => async (...e) => {
  const r = t.map(async (s) => s(...e));
  return (await Promise.all(r)).every((s) => s);
};
var T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, g = {}, be = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", s = "\\u20d0-\\u20ff", n = "\\u1ab0-\\u1aff", o = "\\u1dc0-\\u1dff", a = e + r + s + n + o, i = "\\ufe0e\\ufe0f", c = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", h = `[${t}]`, u = `[${a}]`, l = "\\ud83c[\\udffb-\\udfff]", f = `(?:${u}|${l})`, b = `[^${t}]`, m = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", y = "[\\ud800-\\udbff][\\udc00-\\udfff]", j = "\\u200d", Z = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", X = `[${c}]`, P = `${f}?`, D = `[${i}]?`, Q = `(?:${j}(?:${[b, m, y].join("|")})${D + P})*`, Y = D + P + Q, ee = `(?:${[`${b}${u}?`, u, m, y, h, X].join("|")})`;
  return new RegExp(`${Z}|${l}(?=${l})|${ee + Y}`, "g");
}, Ne = T && T.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(g, "__esModule", { value: !0 });
var A = Ne(be);
function M(t) {
  if (typeof t != "string")
    throw new Error("A string is expected as input");
  return t.match(A.default()) || [];
}
var ge = g.toArray = M;
function S(t) {
  if (typeof t != "string")
    throw new Error("Input must be a string");
  var e = t.match(A.default());
  return e === null ? 0 : e.length;
}
var ve = g.length = S;
function F(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  (typeof e != "number" || e < 0) && (e = 0), typeof r == "number" && r < 0 && (r = 0);
  var s = t.match(A.default());
  return s ? s.slice(e, r).join("") : "";
}
var ye = g.substring = F;
function we(t, e, r) {
  if (e === void 0 && (e = 0), typeof t != "string")
    throw new Error("Input must be a string");
  var s = S(t);
  if (typeof e != "number" && (e = parseInt(e, 10)), e >= s)
    return "";
  e < 0 && (e += s);
  var n;
  typeof r > "u" ? n = s : (typeof r != "number" && (r = parseInt(r, 10)), n = r >= 0 ? r + e : e);
  var o = t.match(A.default());
  return o ? o.slice(e, n).join("") : "";
}
var Ee = g.substr = we;
function Oe(t, e, r, s) {
  if (e === void 0 && (e = 16), r === void 0 && (r = "#"), s === void 0 && (s = "right"), typeof t != "string" || typeof e != "number")
    throw new Error("Invalid arguments specified");
  if (["left", "right"].indexOf(s) === -1)
    throw new Error("Pad position should be either left or right");
  typeof r != "string" && (r = String(r));
  var n = S(t);
  if (n > e)
    return F(t, 0, e);
  if (n < e) {
    var o = r.repeat(e - n);
    return s === "left" ? o + t : t + o;
  }
  return t;
}
var W = g.limit = Oe;
function $e(t, e, r) {
  if (r === void 0 && (r = 0), typeof t != "string")
    throw new Error("Input must be a string");
  if (t === "")
    return e === "" ? 0 : -1;
  r = Number(r), r = isNaN(r) ? 0 : r, e = String(e);
  var s = M(t);
  if (r >= s.length)
    return e === "" ? s.length : -1;
  if (e === "")
    return r;
  var n = M(e), o = !1, a;
  for (a = r; a < s.length; a += 1) {
    for (var i = 0; i < n.length && n[i] === s[a + i]; )
      i += 1;
    if (i === n.length && n[i - 1] === s[a + i - 1]) {
      o = !0;
      break;
    }
  }
  return o ? a : -1;
}
var Ae = g.indexOf = $e;
function wt(t, e) {
  if (!(e > d(t) || e < -d(t)))
    return q(t, e, 1);
}
function Et(t, e) {
  return e < 0 || e > d(t) - 1 ? "" : q(t, e, 1);
}
function Ot(t, e) {
  if (!(e < 0 || e > d(t) - 1))
    return q(t, e, 1).codePointAt(0);
}
function $t(t, e, r = d(t)) {
  const s = qe(t, e);
  return !(s === -1 || s + d(e) !== r);
}
function At(t, e, r = 0) {
  const s = $(t, r);
  return C(s, e) !== -1;
}
function C(t, e, r = 0) {
  return Ae(t, e, r);
}
function qe(t, e, r = 1 / 0) {
  let s = r;
  s < 0 ? s = 0 : s >= d(t) && (s = d(t) - 1);
  for (let n = s; n >= 0; n--)
    if (q(t, n, d(e)) === e)
      return n;
  return -1;
}
function d(t) {
  return ve(t);
}
function qt(t, e) {
  const r = e.toUpperCase();
  return r === "NONE" ? t : t.normalize(r);
}
function jt(t, e, r = " ") {
  return e <= d(t) ? t : W(t, e, r, "right");
}
function Mt(t, e, r = " ") {
  return e <= d(t) ? t : W(t, e, r, "left");
}
function R(t, e) {
  return e > t ? t : e < -t ? 0 : e < 0 ? e + t : e;
}
function St(t, e, r) {
  const s = d(t);
  if (e > s || r && (e > r && !(e > 0 && e < s && r < 0 && r > -s) || r < -s || e < 0 && e > -s && r > 0))
    return "";
  const n = R(s, e), o = r ? R(s, r) : void 0;
  return $(t, n, o);
}
function Ct(t, e, r) {
  const s = [];
  if (r !== void 0 && r <= 0)
    return [t];
  if (e === "")
    return je(t).slice(0, r);
  let n = e;
  (typeof e == "string" || e instanceof RegExp && !e.flags.includes("g")) && (n = new RegExp(e, "g"));
  const o = t.match(n);
  let a = 0;
  if (o) {
    for (let i = 0; i < (r ? r - 1 : o.length); i++) {
      const c = C(t, o[i], a), h = d(o[i]);
      if (s.push($(t, a, c)), a = c + h, r !== void 0 && s.length === r)
        break;
    }
    return s.push($(t, a)), s;
  }
}
function Pt(t, e, r = 0) {
  return C(t, e, r) === r;
}
function q(t, e = 0, r = d(t) - e) {
  return Ee(t, e, r);
}
function $(t, e, r = d(t)) {
  return ye(t, e, r);
}
function je(t) {
  return ge(t);
}
var Me = Object.getOwnPropertyNames, Se = Object.getOwnPropertySymbols, Ce = Object.prototype.hasOwnProperty;
function I(t, e) {
  return function(s, n, o) {
    return t(s, n, o) && e(s, n, o);
  };
}
function E(t) {
  return function(r, s, n) {
    if (!r || !s || typeof r != "object" || typeof s != "object")
      return t(r, s, n);
    var o = n.cache, a = o.get(r), i = o.get(s);
    if (a && i)
      return a === s && i === r;
    o.set(r, s), o.set(s, r);
    var c = t(r, s, n);
    return o.delete(r), o.delete(s), c;
  };
}
function x(t) {
  return Me(t).concat(Se(t));
}
var K = Object.hasOwn || function(t, e) {
  return Ce.call(t, e);
};
function v(t, e) {
  return t || e ? t === e : t === e || t !== t && e !== e;
}
var L = "_owner", z = Object.getOwnPropertyDescriptor, _ = Object.keys;
function Pe(t, e, r) {
  var s = t.length;
  if (e.length !== s)
    return !1;
  for (; s-- > 0; )
    if (!r.equals(t[s], e[s], s, s, t, e, r))
      return !1;
  return !0;
}
function De(t, e) {
  return v(t.getTime(), e.getTime());
}
function J(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.entries(), o = 0, a, i; (a = n.next()) && !a.done; ) {
    for (var c = e.entries(), h = !1, u = 0; (i = c.next()) && !i.done; ) {
      var l = a.value, f = l[0], b = l[1], m = i.value, y = m[0], j = m[1];
      !h && !s[u] && (h = r.equals(f, y, o, u, t, e, r) && r.equals(b, j, f, y, t, e, r)) && (s[u] = !0), u++;
    }
    if (!h)
      return !1;
    o++;
  }
  return !0;
}
function Te(t, e, r) {
  var s = _(t), n = s.length;
  if (_(e).length !== n)
    return !1;
  for (var o; n-- > 0; )
    if (o = s[n], o === L && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !K(e, o) || !r.equals(t[o], e[o], o, o, t, e, r))
      return !1;
  return !0;
}
function w(t, e, r) {
  var s = x(t), n = s.length;
  if (x(e).length !== n)
    return !1;
  for (var o, a, i; n-- > 0; )
    if (o = s[n], o === L && (t.$$typeof || e.$$typeof) && t.$$typeof !== e.$$typeof || !K(e, o) || !r.equals(t[o], e[o], o, o, t, e, r) || (a = z(t, o), i = z(e, o), (a || i) && (!a || !i || a.configurable !== i.configurable || a.enumerable !== i.enumerable || a.writable !== i.writable)))
      return !1;
  return !0;
}
function Re(t, e) {
  return v(t.valueOf(), e.valueOf());
}
function Ie(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function B(t, e, r) {
  if (t.size !== e.size)
    return !1;
  for (var s = {}, n = t.values(), o, a; (o = n.next()) && !o.done; ) {
    for (var i = e.values(), c = !1, h = 0; (a = i.next()) && !a.done; )
      !c && !s[h] && (c = r.equals(o.value, a.value, o.value, a.value, t, e, r)) && (s[h] = !0), h++;
    if (!c)
      return !1;
  }
  return !0;
}
function xe(t, e) {
  var r = t.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
var ze = "[object Arguments]", _e = "[object Boolean]", Je = "[object Date]", Be = "[object Map]", Ge = "[object Number]", Ve = "[object Object]", He = "[object RegExp]", Ue = "[object Set]", ke = "[object String]", Fe = Array.isArray, G = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, V = Object.assign, We = Object.prototype.toString.call.bind(Object.prototype.toString);
function Ke(t) {
  var e = t.areArraysEqual, r = t.areDatesEqual, s = t.areMapsEqual, n = t.areObjectsEqual, o = t.arePrimitiveWrappersEqual, a = t.areRegExpsEqual, i = t.areSetsEqual, c = t.areTypedArraysEqual;
  return function(u, l, f) {
    if (u === l)
      return !0;
    if (u == null || l == null || typeof u != "object" || typeof l != "object")
      return u !== u && l !== l;
    var b = u.constructor;
    if (b !== l.constructor)
      return !1;
    if (b === Object)
      return n(u, l, f);
    if (Fe(u))
      return e(u, l, f);
    if (G != null && G(u))
      return c(u, l, f);
    if (b === Date)
      return r(u, l, f);
    if (b === RegExp)
      return a(u, l, f);
    if (b === Map)
      return s(u, l, f);
    if (b === Set)
      return i(u, l, f);
    var m = We(u);
    return m === Je ? r(u, l, f) : m === He ? a(u, l, f) : m === Be ? s(u, l, f) : m === Ue ? i(u, l, f) : m === Ve ? typeof u.then != "function" && typeof l.then != "function" && n(u, l, f) : m === ze ? n(u, l, f) : m === _e || m === Ge || m === ke ? o(u, l, f) : !1;
  };
}
function Le(t) {
  var e = t.circular, r = t.createCustomConfig, s = t.strict, n = {
    areArraysEqual: s ? w : Pe,
    areDatesEqual: De,
    areMapsEqual: s ? I(J, w) : J,
    areObjectsEqual: s ? w : Te,
    arePrimitiveWrappersEqual: Re,
    areRegExpsEqual: Ie,
    areSetsEqual: s ? I(B, w) : B,
    areTypedArraysEqual: s ? w : xe
  };
  if (r && (n = V({}, n, r(n))), e) {
    var o = E(n.areArraysEqual), a = E(n.areMapsEqual), i = E(n.areObjectsEqual), c = E(n.areSetsEqual);
    n = V({}, n, {
      areArraysEqual: o,
      areMapsEqual: a,
      areObjectsEqual: i,
      areSetsEqual: c
    });
  }
  return n;
}
function Ze(t) {
  return function(e, r, s, n, o, a, i) {
    return t(e, r, i);
  };
}
function Xe(t) {
  var e = t.circular, r = t.comparator, s = t.createState, n = t.equals, o = t.strict;
  if (s)
    return function(c, h) {
      var u = s(), l = u.cache, f = l === void 0 ? e ? /* @__PURE__ */ new WeakMap() : void 0 : l, b = u.meta;
      return r(c, h, {
        cache: f,
        equals: n,
        meta: b,
        strict: o
      });
    };
  if (e)
    return function(c, h) {
      return r(c, h, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: o
      });
    };
  var a = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: o
  };
  return function(c, h) {
    return r(c, h, a);
  };
}
var Qe = N();
N({ strict: !0 });
N({ circular: !0 });
N({
  circular: !0,
  strict: !0
});
N({
  createInternalComparator: function() {
    return v;
  }
});
N({
  strict: !0,
  createInternalComparator: function() {
    return v;
  }
});
N({
  circular: !0,
  createInternalComparator: function() {
    return v;
  }
});
N({
  circular: !0,
  createInternalComparator: function() {
    return v;
  },
  strict: !0
});
function N(t) {
  t === void 0 && (t = {});
  var e = t.circular, r = e === void 0 ? !1 : e, s = t.createInternalComparator, n = t.createState, o = t.strict, a = o === void 0 ? !1 : o, i = Le(t), c = Ke(i), h = s ? s(c) : Ze(c);
  return Xe({ circular: r, comparator: c, createState: n, equals: h, strict: a });
}
function Dt(t, e) {
  return Qe(t, e);
}
function H(t, e, r) {
  return JSON.stringify(t, (n, o) => {
    let a = o;
    return e && (a = e(n, a)), a === void 0 && (a = null), a;
  }, r);
}
function Ye(t, e) {
  function r(n) {
    return Object.keys(n).forEach((o) => {
      n[o] === null ? n[o] = void 0 : typeof n[o] == "object" && (n[o] = r(n[o]));
    }), n;
  }
  const s = JSON.parse(t, e);
  if (s !== null)
    return typeof s == "object" ? r(s) : s;
}
function Tt(t) {
  try {
    const e = H(t);
    return e === H(Ye(e));
  } catch {
    return !1;
  }
}
const Rt = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;"), et = {
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
Object.freeze(et);
export {
  nt as AsyncVariable,
  ht as DocumentCombinerEngine,
  fe as FIRST_SCR_BOOK_NUM,
  pe as FIRST_SCR_CHAPTER_NUM,
  me as FIRST_SCR_VERSE_NUM,
  he as LAST_SCR_BOOK_NUM,
  ce as Mutex,
  dt as MutexMap,
  mt as PlatformEventEmitter,
  pt as UnsubscriberAsyncList,
  yt as aggregateUnsubscriberAsyncs,
  vt as aggregateUnsubscribers,
  wt as at,
  Et as charAt,
  Ot as codePointAt,
  ft as createSyncProxyForAsyncObject,
  at as debounce,
  O as deepClone,
  Dt as deepEqual,
  Ye as deserialize,
  $t as endsWith,
  ct as getAllObjectFunctionNames,
  de as getChaptersForBook,
  ut as getErrorMessage,
  it as groupBy,
  Rt as htmlEncode,
  At as includes,
  C as indexOf,
  Tt as isSerializable,
  ne as isString,
  qe as lastIndexOf,
  d as length,
  et as menuDocumentSchema,
  ot as newGuid,
  qt as normalize,
  bt as offsetBook,
  Nt as offsetChapter,
  gt as offsetVerse,
  jt as padEnd,
  Mt as padStart,
  H as serialize,
  St as slice,
  Ct as split,
  Pt as startsWith,
  $ as substring,
  je as toArray,
  ie as wait,
  lt as waitForDuration
};
//# sourceMappingURL=index.js.map
