import { jsx as c, jsxs as G, Fragment as me } from 'react/jsx-runtime';
import {
  Button as fe,
  FormLabel as Ne,
  Checkbox as ke,
  Autocomplete as ve,
  TextField as L,
  Slider as ye,
  Switch as xe,
  Snackbar as we,
  MenuItem as Ce,
} from '@mui/material';
import { useMemo as $ } from 'react';
import Se, { SelectColumn as Ee } from 'react-data-grid';
function C({ isDisabled: e = !1, className: n, onClick: r, onContextMenu: o, children: t }) {
  return /* @__PURE__ */ c(fe, {
    disabled: e,
    className: `papi-button ${n ?? ''}`,
    onClick: r,
    onContextMenu: o,
    children: t,
  });
}
var S = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(S || {});
function Be({
  isChecked: e,
  labelText: n = '',
  labelPosition: r = S.After,
  isIndeterminate: o = !1,
  isDefaultChecked: t,
  isDisabled: l = !1,
  hasError: i = !1,
  className: h,
  onChange: d,
}) {
  const u = /* @__PURE__ */ c(ke, {
    checked: e,
    indeterminate: o,
    defaultChecked: t,
    disabled: l,
    className: `papi-checkbox ${i ? 'error' : ''} ${h ?? ''}`,
    onChange: d,
  });
  let b;
  if (n) {
    const N = r === S.Before || r === S.Above,
      k = /* @__PURE__ */ c('span', {
        className: `papi-checkbox-label ${i ? 'error' : ''} ${h ?? ''}`,
        children: n,
      }),
      w = r === S.Before || r === S.After,
      _ = w ? k : /* @__PURE__ */ c('div', { children: k }),
      T = w ? u : /* @__PURE__ */ c('div', { children: u });
    b = /* @__PURE__ */ G(Ne, {
      className: `papi-checkbox ${r.toString()}`,
      disabled: l,
      error: i,
      children: [N && _, T, !N && _],
    });
  } else b = u;
  return b;
}
function _e({
  title: e,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: t = !1,
  width: l,
  options: i = [],
  className: h,
  value: d,
  onChange: u,
  onFocus: b,
  onBlur: N,
}) {
  return /* @__PURE__ */ c(ve, {
    disablePortal: !0,
    disabled: n,
    disableClearable: !r,
    fullWidth: t,
    options: i,
    className: `papi-combo-box ${o ? 'error' : ''} ${h ?? ''}`,
    value: d,
    onChange: u,
    onFocus: b,
    onBlur: N,
    renderInput: (k) =>
      /* @__PURE__ */ c(L, {
        ...k,
        error: o,
        fullWidth: t,
        disabled: n,
        label: e,
        style: { width: l },
      }),
  });
}
var Te = Object.defineProperty,
  Me = (e, n, r) =>
    n in e ? Te(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r),
  s = (e, n, r) => (Me(e, typeof n != 'symbol' ? n + '' : n, r), r);
const x = [
    'GEN',
    'EXO',
    'LEV',
    'NUM',
    'DEU',
    'JOS',
    'JDG',
    'RUT',
    '1SA',
    '2SA',
    // 10
    '1KI',
    '2KI',
    '1CH',
    '2CH',
    'EZR',
    'NEH',
    'EST',
    'JOB',
    'PSA',
    'PRO',
    // 20
    'ECC',
    'SNG',
    'ISA',
    'JER',
    'LAM',
    'EZK',
    'DAN',
    'HOS',
    'JOL',
    'AMO',
    // 30
    'OBA',
    'JON',
    'MIC',
    'NAM',
    'HAB',
    'ZEP',
    'HAG',
    'ZEC',
    'MAL',
    'MAT',
    // 40
    'MRK',
    'LUK',
    'JHN',
    'ACT',
    'ROM',
    '1CO',
    '2CO',
    'GAL',
    'EPH',
    'PHP',
    // 50
    'COL',
    '1TH',
    '2TH',
    '1TI',
    '2TI',
    'TIT',
    'PHM',
    'HEB',
    'JAS',
    '1PE',
    // 60
    '2PE',
    '1JN',
    '2JN',
    '3JN',
    'JUD',
    'REV',
    'TOB',
    'JDT',
    'ESG',
    'WIS',
    // 70
    'SIR',
    'BAR',
    'LJE',
    'S3Y',
    'SUS',
    'BEL',
    '1MA',
    '2MA',
    '3MA',
    '4MA',
    // 80
    '1ES',
    '2ES',
    'MAN',
    'PS2',
    'ODA',
    'PSS',
    'JSA',
    // actual variant text for JOS, now in LXA text
    'JDB',
    // actual variant text for JDG, now in LXA text
    'TBS',
    // actual variant text for TOB, now in LXA text
    'SST',
    // actual variant text for SUS, now in LXA text // 90
    'DNT',
    // actual variant text for DAN, now in LXA text
    'BLT',
    // actual variant text for BEL, now in LXA text
    'XXA',
    'XXB',
    'XXC',
    'XXD',
    'XXE',
    'XXF',
    'XXG',
    'FRT',
    // 100
    'BAK',
    'OTH',
    '3ES',
    // Used previously but really should be 2ES
    'EZA',
    // Used to be called 4ES, but not actually in any known project
    '5EZ',
    // Used to be called 5ES, but not actually in any known project
    '6EZ',
    // Used to be called 6ES, but not actually in any known project
    'INT',
    'CNC',
    'GLO',
    'TDX',
    // 110
    'NDX',
    'DAG',
    'PS3',
    '2BA',
    'LBA',
    'JUB',
    'ENO',
    '1MQ',
    '2MQ',
    '3MQ',
    // 120
    'REP',
    '4BA',
    'LAO',
  ],
  V = [
    'XXA',
    'XXB',
    'XXC',
    'XXD',
    'XXE',
    'XXF',
    'XXG',
    'FRT',
    'BAK',
    'OTH',
    'INT',
    'CNC',
    'GLO',
    'TDX',
    'NDX',
  ],
  U = [
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy',
    'Joshua',
    'Judges',
    'Ruth',
    '1 Samuel',
    '2 Samuel',
    '1 Kings',
    '2 Kings',
    '1 Chronicles',
    '2 Chronicles',
    'Ezra',
    'Nehemiah',
    'Esther (Hebrew)',
    'Job',
    'Psalms',
    'Proverbs',
    'Ecclesiastes',
    'Song of Songs',
    'Isaiah',
    'Jeremiah',
    'Lamentations',
    'Ezekiel',
    'Daniel (Hebrew)',
    'Hosea',
    'Joel',
    'Amos',
    'Obadiah',
    'Jonah',
    'Micah',
    'Nahum',
    'Habakkuk',
    'Zephaniah',
    'Haggai',
    'Zechariah',
    'Malachi',
    'Matthew',
    'Mark',
    'Luke',
    'John',
    'Acts',
    'Romans',
    '1 Corinthians',
    '2 Corinthians',
    'Galatians',
    'Ephesians',
    'Philippians',
    'Colossians',
    '1 Thessalonians',
    '2 Thessalonians',
    '1 Timothy',
    '2 Timothy',
    'Titus',
    'Philemon',
    'Hebrews',
    'James',
    '1 Peter',
    '2 Peter',
    '1 John',
    '2 John',
    '3 John',
    'Jude',
    'Revelation',
    'Tobit',
    'Judith',
    'Esther Greek',
    'Wisdom of Solomon',
    'Sirach (Ecclesiasticus)',
    'Baruch',
    'Letter of Jeremiah',
    'Song of 3 Young Men',
    'Susanna',
    'Bel and the Dragon',
    '1 Maccabees',
    '2 Maccabees',
    '3 Maccabees',
    '4 Maccabees',
    '1 Esdras (Greek)',
    '2 Esdras (Latin)',
    'Prayer of Manasseh',
    'Psalm 151',
    'Odes',
    'Psalms of Solomon',
    // WARNING, if you change the spelling of the *obsolete* tag be sure to update
    // IsObsolete routine
    'Joshua A. *obsolete*',
    'Judges B. *obsolete*',
    'Tobit S. *obsolete*',
    'Susanna Th. *obsolete*',
    'Daniel Th. *obsolete*',
    'Bel Th. *obsolete*',
    'Extra A',
    'Extra B',
    'Extra C',
    'Extra D',
    'Extra E',
    'Extra F',
    'Extra G',
    'Front Matter',
    'Back Matter',
    'Other Matter',
    '3 Ezra *obsolete*',
    'Apocalypse of Ezra',
    '5 Ezra (Latin Prologue)',
    '6 Ezra (Latin Epilogue)',
    'Introduction',
    'Concordance ',
    'Glossary ',
    'Topical Index',
    'Names Index',
    'Daniel Greek',
    'Psalms 152-155',
    '2 Baruch (Apocalypse)',
    'Letter of Baruch',
    'Jubilees',
    'Enoch',
    '1 Meqabyan',
    '2 Meqabyan',
    '3 Meqabyan',
    'Reproof (Proverbs 25-31)',
    '4 Baruch (Rest of Baruch)',
    'Laodiceans',
  ],
  J = Xe();
function E(e, n = !0) {
  return n && (e = e.toUpperCase()), e in J ? J[e] : 0;
}
function O(e) {
  return E(e) > 0;
}
function Ae(e) {
  const n = typeof e == 'string' ? E(e) : e;
  return n >= 40 && n <= 66;
}
function Ve(e) {
  return (typeof e == 'string' ? E(e) : e) <= 39;
}
function q(e) {
  return e <= 66;
}
function Oe(e) {
  const n = typeof e == 'string' ? E(e) : e;
  return j(n) && !q(n);
}
function* Ie() {
  for (let e = 1; e <= x.length; e++) yield e;
}
const Re = 1,
  F = x.length;
function Je() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function I(e, n = '***') {
  const r = e - 1;
  return r < 0 || r >= x.length ? n : x[r];
}
function K(e) {
  return e <= 0 || e > F ? '******' : U[e - 1];
}
function ze(e) {
  return K(E(e));
}
function j(e) {
  const n = typeof e == 'number' ? I(e) : e;
  return O(n) && !V.includes(n);
}
function De(e) {
  const n = typeof e == 'number' ? I(e) : e;
  return O(n) && V.includes(n);
}
function He(e) {
  return U[e - 1].includes('*obsolete*');
}
function Xe() {
  const e = {};
  for (let n = 0; n < x.length; n++) e[x[n]] = n + 1;
  return e;
}
const f = {
  allBookIds: x,
  nonCanonicalIds: V,
  bookIdToNumber: E,
  isBookIdValid: O,
  isBookNT: Ae,
  isBookOT: Ve,
  isBookOTNT: q,
  isBookDC: Oe,
  allBookNumbers: Ie,
  firstBook: Re,
  lastBook: F,
  extraBooks: Je,
  bookNumberToId: I,
  bookNumberToEnglishName: K,
  bookIdToEnglishName: ze,
  isCanonical: j,
  isExtraMaterial: De,
  isObsolete: He,
};
var v = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(v || {});
const y = class {
  // private versInfo: Versification;
  constructor(e) {
    if (
      (s(this, 'name'),
      s(this, 'fullPath'),
      s(this, 'isPresent'),
      s(this, 'hasVerseSegments'),
      s(this, 'isCustomized'),
      s(this, 'baseVersification'),
      s(this, 'scriptureBooks'),
      s(this, '_type'),
      e != null)
    )
      typeof e == 'string' ? (this.name = e) : (this._type = e);
    else throw new Error('Argument null');
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
let p = y;
s(p, 'Original', new y(v.Original)),
  s(p, 'Septuagint', new y(v.Septuagint)),
  s(p, 'Vulgate', new y(v.Vulgate)),
  s(p, 'English', new y(v.English)),
  s(p, 'RussianProtestant', new y(v.RussianProtestant)),
  s(p, 'RussianOrthodox', new y(v.RussianOrthodox));
function z(e, n) {
  const r = n[0];
  for (let o = 1; o < n.length; o++) e = e.split(n[o]).join(r);
  return e.split(r);
}
var Z = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Z || {});
const a = class {
  constructor(e, n, r, o) {
    if (
      (s(this, 'firstChapter'),
      s(this, 'lastChapter'),
      s(this, 'lastVerse'),
      s(this, 'hasSegmentsDefined'),
      s(this, 'text'),
      s(this, 'BBBCCCVVVS'),
      s(this, 'longHashCode'),
      s(this, 'versification'),
      s(this, 'rtlMark', '‏'),
      s(this, '_bookNum', 0),
      s(this, '_chapterNum', 0),
      s(this, '_verseNum', 0),
      s(this, '_verse'),
      r == null && o == null)
    )
      if (e != null && typeof e == 'string') {
        const t = e,
          l = n != null && n instanceof p ? n : void 0;
        this.setEmpty(l), this.parse(t);
      } else if (e != null && typeof e == 'number') {
        const t = n != null && n instanceof p ? n : void 0;
        this.setEmpty(t),
          (this._verseNum = e % a.chapterDigitShifter),
          (this._chapterNum = Math.floor((e % a.bookDigitShifter) / a.chapterDigitShifter)),
          (this._bookNum = Math.floor(e / a.bookDigitShifter));
      } else if (n == null)
        if (e != null && e instanceof a) {
          const t = e;
          (this._bookNum = t.bookNum),
            (this._chapterNum = t.chapterNum),
            (this._verseNum = t.verseNum),
            (this._verse = t.verse),
            (this.versification = t.versification);
        } else {
          if (e == null) return;
          const t = e instanceof p ? e : a.defaultVersification;
          this.setEmpty(t);
        }
      else throw new Error('VerseRef constructor not supported.');
    else if (e != null && n != null && r != null)
      if (typeof e == 'string' && typeof n == 'string' && typeof r == 'string')
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == 'number' && typeof n == 'number' && typeof r == 'number')
        (this._bookNum = e),
          (this._chapterNum = n),
          (this._verseNum = r),
          (this.versification = o ?? a.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = a.defaultVersification) {
    const r = new a(n);
    return r.parse(e), r;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return (
      e.length > 0 &&
      '0123456789'.includes(e[0]) &&
      !e.endsWith(this.verseRangeSeparator) &&
      !e.endsWith(this.verseSequenceIndicator)
    );
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
      return (n = a.parse(e)), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof B) return (n = new a()), { success: !1, verseRef: n };
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
  static getBBBCCCVVV(e, n, r) {
    return (
      (e % a.bcvMaxValue) * a.bookDigitShifter +
      (n >= 0 ? (n % a.bcvMaxValue) * a.chapterDigitShifter : 0) +
      (r >= 0 ? r % a.bcvMaxValue : 0)
    );
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e) return (n = -1), { success: !0, vNum: n };
    n = 0;
    let r;
    for (let o = 0; o < e.length; o++) {
      if (((r = e[o]), r < '0' || r > '9')) return o === 0 && (n = -1), { success: !1, vNum: n };
      if (((n = n * 10 + +r - +'0'), n > a.bcvMaxValue)) return (n = -1), { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return (
      this.bookNum === 0 &&
      this.chapterNum === 0 &&
      this.verseNum === 0 &&
      this.versification == null
    );
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return (
      this._verse != null &&
      (this._verse.includes(a.verseRangeSeparator) ||
        this._verse.includes(a.verseSequenceIndicator))
    );
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return f.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = f.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
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
    return this._verse != null
      ? this._verse
      : this.isDefault || this._verseNum < 0
      ? ''
      : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: r } = a.tryGetVerseNum(e);
    (this._verse = n ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = r),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = a.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > f.lastBook)
      throw new B('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new p(e) : void 0;
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
    return this.validateVerse(a.verseRangeSeparators, a.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return a.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return a.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const t = e.split('/');
      if (((e = t[0]), t.length > 1))
        try {
          const l = +t[1].trim();
          this.versification = new p(v[l]);
        } catch {
          throw new B('Invalid reference : ' + e);
        }
    }
    const n = e.trim().split(' ');
    if (n.length !== 2) throw new B('Invalid reference : ' + e);
    const r = n[1].split(':'),
      o = +r[0];
    if (
      r.length !== 2 ||
      f.bookIdToNumber(n[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !a.isVerseParseable(r[1])
    )
      throw new B('Invalid reference : ' + e);
    this.updateInternal(n[0], r[0], r[1]);
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
    return new a(this);
  }
  toString() {
    const e = this.book;
    return e === '' ? '' : `${e} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return (
      e._bookNum === this._bookNum &&
      e._chapterNum === this._chapterNum &&
      e._verseNum === this._verseNum &&
      e._verse === this._verse &&
      e.versification != null &&
      this.versification != null &&
      e.versification.equals(this.versification)
    );
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
  allVerses(e = !1, n = a.verseRangeSeparators, r = a.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      t = z(this._verse, r);
    for (const l of t.map((i) => z(i, n))) {
      const i = this.clone();
      i.verse = l[0];
      const h = i.verseNum;
      if ((o.push(i), l.length > 1)) {
        const d = this.clone();
        if (((d.verse = l[1]), !e))
          for (let u = h + 1; u < d.verseNum; u++) {
            const b = new a(this._bookNum, this._chapterNum, u, this.versification);
            this.isExcluded || o.push(b);
          }
        o.push(d);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse) return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const t = o.internalValid;
      if (t !== 0) return t;
      const l = o.BBBCCCVVV;
      if (r > l) return 3;
      if (r === l) return 4;
      r = l;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > f.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = a.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, n, r) {
    (this.bookNum = f.bookIdToNumber(e)), (this.chapter = n), (this.verse = r);
  }
};
let m = a;
s(m, 'defaultVersification', p.English),
  s(m, 'verseRangeSeparator', '-'),
  s(m, 'verseSequenceIndicator', ','),
  s(m, 'verseRangeSeparators', [a.verseRangeSeparator]),
  s(m, 'verseSequenceIndicators', [a.verseSequenceIndicator]),
  s(m, 'chapterDigitShifter', 1e3),
  s(m, 'bookDigitShifter', a.chapterDigitShifter * a.chapterDigitShifter),
  s(m, 'bcvMaxValue', a.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  s(m, 'ValidStatusType', Z);
class B extends Error {}
const W = [
  { shortName: 'ERR', fullNames: ['ERROR'], chapters: -1 },
  { shortName: 'GEN', fullNames: ['Genesis'], chapters: 50 },
  { shortName: 'EXO', fullNames: ['Exodus'], chapters: 40 },
  { shortName: 'LEV', fullNames: ['Leviticus'], chapters: 27 },
  { shortName: 'NUM', fullNames: ['Numbers'], chapters: 36 },
  { shortName: 'DEU', fullNames: ['Deuteronomy'], chapters: 34 },
  { shortName: 'JOS', fullNames: ['Joshua'], chapters: 24 },
  { shortName: 'JDG', fullNames: ['Judges'], chapters: 21 },
  { shortName: 'RUT', fullNames: ['Ruth'], chapters: 4 },
  { shortName: '1SA', fullNames: ['1 Samuel'], chapters: 31 },
  { shortName: '2SA', fullNames: ['2 Samuel'], chapters: 24 },
  { shortName: '1KI', fullNames: ['1 Kings'], chapters: 22 },
  { shortName: '2KI', fullNames: ['2 Kings'], chapters: 25 },
  { shortName: '1CH', fullNames: ['1 Chronicles'], chapters: 29 },
  { shortName: '2CH', fullNames: ['2 Chronicles'], chapters: 36 },
  { shortName: 'EZR', fullNames: ['Ezra'], chapters: 10 },
  { shortName: 'NEH', fullNames: ['Nehemiah'], chapters: 13 },
  { shortName: 'EST', fullNames: ['Esther'], chapters: 10 },
  { shortName: 'JOB', fullNames: ['Job'], chapters: 42 },
  { shortName: 'PSA', fullNames: ['Psalm', 'Psalms'], chapters: 150 },
  { shortName: 'PRO', fullNames: ['Proverbs'], chapters: 31 },
  { shortName: 'ECC', fullNames: ['Ecclesiastes'], chapters: 12 },
  { shortName: 'SNG', fullNames: ['Song of Solomon', 'Song of Songs'], chapters: 8 },
  { shortName: 'ISA', fullNames: ['Isaiah'], chapters: 66 },
  { shortName: 'JER', fullNames: ['Jeremiah'], chapters: 52 },
  { shortName: 'LAM', fullNames: ['Lamentations'], chapters: 5 },
  { shortName: 'EZK', fullNames: ['Ezekiel'], chapters: 48 },
  { shortName: 'DAN', fullNames: ['Daniel'], chapters: 12 },
  { shortName: 'HOS', fullNames: ['Hosea'], chapters: 14 },
  { shortName: 'JOL', fullNames: ['Joel'], chapters: 3 },
  { shortName: 'AMO', fullNames: ['Amos'], chapters: 9 },
  { shortName: 'OBA', fullNames: ['Obadiah'], chapters: 1 },
  { shortName: 'JON', fullNames: ['Jonah'], chapters: 4 },
  { shortName: 'MIC', fullNames: ['Micah'], chapters: 7 },
  { shortName: 'NAM', fullNames: ['Nahum'], chapters: 3 },
  { shortName: 'HAB', fullNames: ['Habakkuk'], chapters: 3 },
  { shortName: 'ZEP', fullNames: ['Zephaniah'], chapters: 3 },
  { shortName: 'HAG', fullNames: ['Haggai'], chapters: 2 },
  { shortName: 'ZEC', fullNames: ['Zechariah'], chapters: 14 },
  { shortName: 'MAL', fullNames: ['Malachi'], chapters: 4 },
  { shortName: 'MAT', fullNames: ['Matthew'], chapters: 28 },
  { shortName: 'MRK', fullNames: ['Mark'], chapters: 16 },
  { shortName: 'LUK', fullNames: ['Luke'], chapters: 24 },
  { shortName: 'JHN', fullNames: ['John'], chapters: 21 },
  { shortName: 'ACT', fullNames: ['Acts'], chapters: 28 },
  { shortName: 'ROM', fullNames: ['Romans'], chapters: 16 },
  { shortName: '1CO', fullNames: ['1 Corinthians'], chapters: 16 },
  { shortName: '2CO', fullNames: ['2 Corinthians'], chapters: 13 },
  { shortName: 'GAL', fullNames: ['Galatians'], chapters: 6 },
  { shortName: 'EPH', fullNames: ['Ephesians'], chapters: 6 },
  { shortName: 'PHP', fullNames: ['Philippians'], chapters: 4 },
  { shortName: 'COL', fullNames: ['Colossians'], chapters: 4 },
  { shortName: '1TH', fullNames: ['1 Thessalonians'], chapters: 5 },
  { shortName: '2TH', fullNames: ['2 Thessalonians'], chapters: 3 },
  { shortName: '1TI', fullNames: ['1 Timothy'], chapters: 6 },
  { shortName: '2TI', fullNames: ['2 Timothy'], chapters: 4 },
  { shortName: 'TIT', fullNames: ['Titus'], chapters: 3 },
  { shortName: 'PHM', fullNames: ['Philemon'], chapters: 1 },
  { shortName: 'HEB', fullNames: ['Hebrews'], chapters: 13 },
  { shortName: 'JAS', fullNames: ['James'], chapters: 5 },
  { shortName: '1PE', fullNames: ['1 Peter'], chapters: 5 },
  { shortName: '2PE', fullNames: ['2 Peter'], chapters: 3 },
  { shortName: '1JN', fullNames: ['1 John'], chapters: 5 },
  { shortName: '2JN', fullNames: ['2 John'], chapters: 1 },
  { shortName: '3JN', fullNames: ['3 John'], chapters: 1 },
  { shortName: 'JUD', fullNames: ['Jude'], chapters: 1 },
  { shortName: 'REV', fullNames: ['Revelation'], chapters: 22 },
];
function Pe() {
  return f.allBookIds.map((e) => ({
    bookId: e,
    label: f.bookIdToEnglishName(e),
  }));
}
const Ge = (e) => {
    let n = null;
    return () => (n === null && (n = e()), n);
  },
  M = Ge(Pe),
  Q = 1,
  Le = W.length - 1,
  Y = 1,
  ee = 1,
  ne = (e) => {
    var n;
    return ((n = W[e]) == null ? void 0 : n.chapters) ?? -1;
  },
  D = (e, n) => ({
    bookNum: Math.max(Q, Math.min(e.bookNum + n, Le)),
    chapterNum: 1,
    verseNum: 1,
  }),
  H = (e, n) => ({
    ...e,
    chapterNum: Math.min(Math.max(Y, e.chapterNum + n), ne(e.bookNum)),
    verseNum: 1,
  }),
  X = (e, n) => ({
    ...e,
    verseNum: Math.max(ee, e.verseNum + n),
  });
function A({
  variant: e = 'outlined',
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: t,
  label: l,
  placeholder: i,
  isRequired: h = !1,
  className: d,
  defaultValue: u,
  value: b,
  onChange: N,
  onFocus: k,
  onBlur: w,
}) {
  return /* @__PURE__ */ c(L, {
    variant: e,
    disabled: n,
    error: r,
    fullWidth: o,
    helperText: t,
    label: l,
    placeholder: i,
    required: h,
    className: `papi-textfield ${d ?? ''}`,
    defaultValue: u,
    value: b,
    onChange: N,
    onFocus: k,
    onBlur: w,
  });
}
function We({ scrRef: e, handleSubmit: n }) {
  const r = (i) => {
      n(i);
    },
    o = (i, h) => {
      const u = { bookNum: f.bookIdToNumber(h.bookId), chapterNum: 1, verseNum: 1 };
      r(u);
    },
    t = (i) => {
      n({ ...e, chapterNum: +i.target.value });
    },
    l = (i) => {
      n({ ...e, verseNum: +i.target.value });
    };
  return /* @__PURE__ */ G(me, {
    children: [
      /* @__PURE__ */ c(_e, {
        title: 'Book',
        className: 'papi-ref-selector book',
        value: $(() => M()[e.bookNum - 1], [e.bookNum]),
        options: M(),
        onChange: o,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ c(C, {
        onClick: () => r(D(e, -1)),
        isDisabled: e.bookNum <= Q,
        children: '<',
      }),
      /* @__PURE__ */ c(C, {
        onClick: () => r(D(e, 1)),
        isDisabled: e.bookNum >= M().length,
        children: '>',
      }),
      /* @__PURE__ */ c(A, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: t,
      }),
      /* @__PURE__ */ c(C, {
        onClick: () => n(H(e, -1)),
        isDisabled: e.chapterNum <= Y,
        children: '<',
      }),
      /* @__PURE__ */ c(C, {
        onClick: () => n(H(e, 1)),
        isDisabled: e.chapterNum >= ne(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ c(A, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: l,
      }),
      /* @__PURE__ */ c(C, {
        onClick: () => n(X(e, -1)),
        isDisabled: e.verseNum <= ee,
        children: '<',
      }),
      /* @__PURE__ */ c(C, { onClick: () => n(X(e, 1)), children: '>' }),
    ],
  });
}
function Qe({
  isDisabled: e = !1,
  orientation: n = 'horizontal',
  min: r = 0,
  max: o = 100,
  step: t = 1,
  showMarks: l = !1,
  defaultValue: i,
  valueLabelDisplay: h = 'off',
  className: d,
  onChange: u,
  onChangeCommitted: b,
}) {
  return /* @__PURE__ */ c(ye, {
    disabled: e,
    orientation: n,
    min: r,
    max: o,
    step: t,
    marks: l,
    defaultValue: i,
    valueLabelDisplay: h,
    className: `papi-slider ${n} ${d ?? ''}`,
    onChange: u,
    onChangeCommitted: b,
  });
}
function Ye({ isChecked: e, isDisabled: n = !1, hasError: r = !1, className: o, onChange: t }) {
  return /* @__PURE__ */ c(xe, {
    checked: e,
    disabled: n,
    className: `papi-switch ${r ? 'error' : ''} ${o ?? ''}`,
    onChange: t,
  });
}
function en({
  autoHideDuration: e = null,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: t = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: l = {
    action: '',
    message: '',
    className: `papi-snackbar ${r ?? ''}`,
  },
  children: i,
}) {
  return /* @__PURE__ */ c(we, {
    autoHideDuration: e,
    className: `papi-snackbar ${r ?? ''}`,
    open: n,
    onClose: o,
    anchorOrigin: t,
    ContentProps: l,
    children: i,
  });
}
function nn({
  hasAutoFocus: e = !1,
  className: n,
  isDense: r = !1,
  hasDisabledGutters: o = !1,
  hasDivider: t = !1,
  focusVisibleClassName: l,
  onClick: i,
  children: h,
}) {
  return /* @__PURE__ */ c(Ce, {
    autoFocus: e,
    className: n,
    dense: r,
    disableGutters: o,
    divider: t,
    focusVisibleClassName: l,
    onClick: i,
    children: h,
  });
}
function P({ onRowChange: e, row: n, column: r }) {
  const o = (t) => {
    e({ ...n, [r.key]: t.target.value });
  };
  return /* @__PURE__ */ c(A, { defaultValue: n[r.key], onChange: o });
}
const $e = ({ onChange: e, disabled: n, checked: r, ...o }) => {
  function t(l) {
    e(l.target.checked, l.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ c(Be, {
    ...o,
    isChecked: r,
    isDisabled: n,
    onChange: t,
  });
};
function rn({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: o,
  defaultColumnWidth: t,
  defaultColumnMinWidth: l,
  defaultColumnMaxWidth: i,
  defaultColumnSortable: h = !0,
  defaultColumnResizable: d = !0,
  rows: u,
  enableSelectColumn: b,
  selectColumnWidth: N = 50,
  rowKeyGetter: k,
  rowHeight: w = 35,
  headerRowHeight: _ = 35,
  selectedRows: T,
  onSelectedRowsChange: re,
  onRowsChange: oe,
  onCellClick: te,
  onCellDoubleClick: ae,
  onCellContextMenu: se,
  onCellKeyDown: le,
  direction: ie = 'ltr',
  enableVirtualization: ce = !0,
  onCopy: he,
  onPaste: ue,
  onScroll: de,
  className: be,
}) {
  const pe = $(() => {
    const R = e.map((g) =>
      typeof g.editable == 'function'
        ? {
            ...g,
            editable: (ge) => !!g.editable(ge),
            renderEditCell: g.renderEditCell || P,
          }
        : g.editable && !g.renderEditCell
        ? { ...g, renderEditCell: P }
        : g.renderEditCell && !g.editable
        ? { ...g, editable: !1 }
        : g,
    );
    return b ? [{ ...Ee, minWidth: N }, ...R] : R;
  }, [b, e]);
  return /* @__PURE__ */ c(Se, {
    columns: pe,
    defaultColumnOptions: {
      width: t,
      minWidth: l,
      maxWidth: i,
      sortable: h,
      resizable: d,
    },
    sortColumns: n,
    onSortColumnsChange: r,
    onColumnResize: o,
    rows: u,
    rowKeyGetter: k,
    rowHeight: w,
    headerRowHeight: _,
    selectedRows: T,
    onSelectedRowsChange: re,
    onRowsChange: oe,
    onCellClick: te,
    onCellDoubleClick: ae,
    onCellContextMenu: se,
    onCellKeyDown: le,
    direction: ie,
    enableVirtualization: ce,
    onCopy: he,
    onPaste: ue,
    onScroll: de,
    renderers: { renderCheckbox: $e },
    className: `${be ?? 'rdg-light'}`,
  });
}
function Ue(e, n = 'top') {
  if (!e || typeof document > 'u') return;
  const r = document.head || document.querySelector('head'),
    o = r.querySelector(':first-child'),
    t = document.createElement('style');
  t.appendChild(document.createTextNode(e)),
    n === 'top' && o ? r.insertBefore(t, o) : r.appendChild(t);
}
Ue(
  `.papi-switch {
  background-color: transparent;
}

.papi-switch.primary {
  background-color: #1ea7fd;
}

.papi-switch.secondary {
  background-color: #6fc8ff;
}

.papi-switch.error {
  background-color: #f00;
}

.papi-switch.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-switch.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-slider {
  background-color: transparent;
  color: #1ea7fd;
}

.papi-slider.vertical {
  min-height: 200px;
}

.papi-slider.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-slider.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-checkbox {
  background-color: transparent;
}

.papi-checkbox.error {
  color: #f00;
}

.papi-checkbox.error:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.papi-checkbox.paratext {
  color: greenyellow;
}

.papi-checkbox-label.paratext {
  color: darkgreen;
}

.papi-checkbox.paratext:hover {
  background-color: rgba(0, 100, 0, 0.3);
}

.papi-checkbox.paratext.bright {
  color: darkgreen;
}

.papi-checkbox-label.paratext.bright {
  background-color: greenyellow;
}

.papi-checkbox.paratext.bright:hover {
  background-color: rgba(173, 255, 47, 0.3);
}

.papi-checkbox.below,
.papi-checkbox.above {
  text-align: center;
}
.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
  height: auto;
  line-height: auto;
}

.papi-snackbar.external {
  background-color: lightsteelblue;
  border-color: white;
  border-style: dotted;
  padding: 2%;
  width: 30%;
}

.papi-snackbar.secondary {
  background: transparent;
  color: #333;
}

.papi-snackbar.alert {
  background: lightcoral;
}

.papi-snackbar.paratext {
  background: darkgreen;
  color: greenyellow;
}

.papi-snackbar.bright {
  background: greenyellow;
  color: darkgreen;
}
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-menu-item {
  line-height: 0.8;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
  }

@layer rdg.FocusSink {
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}
  }

@layer rdg.Cell {

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg {
    @layer Defaults,
      FocusSink,
      CheckboxInput,
      CheckboxIcon,
      CheckboxLabel,
      Cell,
      HeaderCell,
      SummaryCell,
      EditCell,
      Row,
      HeaderRow,
      SummaryRow,
      GroupedRow,
      Root;

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
      contain: content;
      content-visibility: auto;
      block-size: 350px;
      border: 1px solid var(--rdg-border-color);
      box-sizing: border-box;
      overflow: auto;
      background-color: var(--rdg-background-color);
      color: var(--rdg-color);
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
}
`,
  'top',
);
export {
  C as Button,
  Be as Checkbox,
  _e as ComboBox,
  S as LabelPosition,
  nn as MenuItem,
  We as RefSelector,
  Qe as Slider,
  en as Snackbar,
  Ye as Switch,
  rn as Table,
  A as TextField,
};
//# sourceMappingURL=index.es.js.map
