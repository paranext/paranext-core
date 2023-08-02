import { jsx as C, jsxs as Fe, Fragment as In } from 'react/jsx-runtime';
import {
  Button as Bn,
  FormLabel as Dn,
  Checkbox as jn,
  Autocomplete as zn,
  TextField as ln,
  Slider as Vn,
  Switch as Ln,
  Snackbar as Fn,
  MenuItem as Hn,
  Grid as un,
  AppBar as Un,
  Toolbar as Jn,
  IconButton as Gn,
  Drawer as Kn,
} from '@mui/material';
import * as Ve from 'react';
import {
  useState as Ke,
  useMemo as qn,
  useCallback as _r,
  useRef as or,
  useEffect as Wn,
} from 'react';
import Xn, { SelectColumn as Yn } from 'react-data-grid';
import { ThemeContext as Zn } from '@emotion/react';
import Qn from '@emotion/styled';
function Ee({ isDisabled: e = !1, className: r, onClick: n, onContextMenu: t, children: o }) {
  return /* @__PURE__ */ C(Bn, {
    disabled: e,
    className: `papi-button ${r ?? ''}`,
    onClick: n,
    onContextMenu: t,
    children: o,
  });
}
var $e = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))($e || {});
function et({
  isChecked: e,
  labelText: r = '',
  labelPosition: n = $e.After,
  isIndeterminate: t = !1,
  isDefaultChecked: o,
  isDisabled: a = !1,
  hasError: s = !1,
  className: i,
  onChange: c,
}) {
  const l = /* @__PURE__ */ C(jn, {
    checked: e,
    indeterminate: t,
    defaultChecked: o,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${i ?? ''}`,
    onChange: c,
  });
  let f;
  if (r) {
    const p = n === $e.Before || n === $e.Above,
      u = /* @__PURE__ */ C('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${i ?? ''}`,
        children: r,
      }),
      b = n === $e.Before || n === $e.After,
      y = b ? u : /* @__PURE__ */ C('div', { children: u }),
      h = b ? l : /* @__PURE__ */ C('div', { children: l });
    f = /* @__PURE__ */ Fe(Dn, {
      className: `papi-checkbox ${n.toString()}`,
      disabled: a,
      error: s,
      children: [p && y, h, !p && y],
    });
  } else f = l;
  return f;
}
function rt({
  title: e,
  isDisabled: r = !1,
  isClearable: n = !0,
  hasError: t = !1,
  isFullWidth: o = !1,
  width: a,
  options: s = [],
  className: i,
  value: c,
  onChange: l,
  onFocus: f,
  onBlur: p,
  checkIsOptionEqualToValue: u,
}) {
  return /* @__PURE__ */ C(zn, {
    disablePortal: !0,
    disabled: r,
    disableClearable: !n,
    fullWidth: o,
    options: s,
    className: `papi-combo-box ${t ? 'error' : ''} ${i ?? ''}`,
    value: c,
    onChange: l,
    onFocus: f,
    onBlur: p,
    isOptionEqualToValue: u,
    renderInput: (b) =>
      /* @__PURE__ */ C(ln, {
        ...b,
        error: t,
        fullWidth: o,
        disabled: r,
        label: e,
        style: { width: a },
      }),
  });
}
var nt = Object.defineProperty,
  tt = (e, r, n) =>
    r in e ? nt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[r] = n),
  $ = (e, r, n) => (tt(e, typeof r != 'symbol' ? r + '' : r, n), n);
const xe = [
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
  mr = [
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
  dn = [
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
  Or = pt();
function Ie(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Or ? Or[e] : 0;
}
function gr(e) {
  return Ie(e) > 0;
}
function ot(e) {
  const r = typeof e == 'string' ? Ie(e) : e;
  return r >= 40 && r <= 66;
}
function at(e) {
  return (typeof e == 'string' ? Ie(e) : e) <= 39;
}
function fn(e) {
  return e <= 66;
}
function st(e) {
  const r = typeof e == 'string' ? Ie(e) : e;
  return mn(r) && !fn(r);
}
function* it() {
  for (let e = 1; e <= xe.length; e++) yield e;
}
const ct = 1,
  pn = xe.length;
function lt() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function br(e, r = '***') {
  const n = e - 1;
  return n < 0 || n >= xe.length ? r : xe[n];
}
function hn(e) {
  return e <= 0 || e > pn ? '******' : dn[e - 1];
}
function ut(e) {
  return hn(Ie(e));
}
function mn(e) {
  const r = typeof e == 'number' ? br(e) : e;
  return gr(r) && !mr.includes(r);
}
function dt(e) {
  const r = typeof e == 'number' ? br(e) : e;
  return gr(r) && mr.includes(r);
}
function ft(e) {
  return dn[e - 1].includes('*obsolete*');
}
function pt() {
  const e = {};
  for (let r = 0; r < xe.length; r++) e[xe[r]] = r + 1;
  return e;
}
const se = {
  allBookIds: xe,
  nonCanonicalIds: mr,
  bookIdToNumber: Ie,
  isBookIdValid: gr,
  isBookNT: ot,
  isBookOT: at,
  isBookOTNT: fn,
  isBookDC: st,
  allBookNumbers: it,
  firstBook: ct,
  lastBook: pn,
  extraBooks: lt,
  bookNumberToId: br,
  bookNumberToEnglishName: hn,
  bookIdToEnglishName: ut,
  isCanonical: mn,
  isExtraMaterial: dt,
  isObsolete: ft,
};
var be = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(be || {});
const ke = class {
  // private versInfo: Versification;
  constructor(e) {
    if (
      ($(this, 'name'),
      $(this, 'fullPath'),
      $(this, 'isPresent'),
      $(this, 'hasVerseSegments'),
      $(this, 'isCustomized'),
      $(this, 'baseVersification'),
      $(this, 'scriptureBooks'),
      $(this, '_type'),
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
let te = ke;
$(te, 'Original', new ke(be.Original)),
  $(te, 'Septuagint', new ke(be.Septuagint)),
  $(te, 'Vulgate', new ke(be.Vulgate)),
  $(te, 'English', new ke(be.English)),
  $(te, 'RussianProtestant', new ke(be.RussianProtestant)),
  $(te, 'RussianOrthodox', new ke(be.RussianOrthodox));
function $r(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++) e = e.split(r[t]).join(n);
  return e.split(n);
}
var gn = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(gn || {});
const O = class {
  constructor(r, n, t, o) {
    if (
      ($(this, 'firstChapter'),
      $(this, 'lastChapter'),
      $(this, 'lastVerse'),
      $(this, 'hasSegmentsDefined'),
      $(this, 'text'),
      $(this, 'BBBCCCVVVS'),
      $(this, 'longHashCode'),
      $(this, 'versification'),
      $(this, 'rtlMark', '‏'),
      $(this, '_bookNum', 0),
      $(this, '_chapterNum', 0),
      $(this, '_verseNum', 0),
      $(this, '_verse'),
      t == null && o == null)
    )
      if (r != null && typeof r == 'string') {
        const a = r,
          s = n != null && n instanceof te ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == 'number') {
        const a = n != null && n instanceof te ? n : void 0;
        this.setEmpty(a),
          (this._verseNum = r % O.chapterDigitShifter),
          (this._chapterNum = Math.floor((r % O.bookDigitShifter) / O.chapterDigitShifter)),
          (this._bookNum = Math.floor(r / O.bookDigitShifter));
      } else if (n == null)
        if (r != null && r instanceof O) {
          const a = r;
          (this._bookNum = a.bookNum),
            (this._chapterNum = a.chapterNum),
            (this._verseNum = a.verseNum),
            (this._verse = a.verse),
            (this.versification = a.versification);
        } else {
          if (r == null) return;
          const a = r instanceof te ? r : O.defaultVersification;
          this.setEmpty(a);
        }
      else throw new Error('VerseRef constructor not supported.');
    else if (r != null && n != null && t != null)
      if (typeof r == 'string' && typeof n == 'string' && typeof t == 'string')
        this.setEmpty(o), this.updateInternal(r, n, t);
      else if (typeof r == 'number' && typeof n == 'number' && typeof t == 'number')
        (this._bookNum = r),
          (this._chapterNum = n),
          (this._verseNum = t),
          (this.versification = o ?? O.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(r, n = O.defaultVersification) {
    const t = new O(n);
    return t.parse(r), t;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(r) {
    return (
      r.length > 0 &&
      '0123456789'.includes(r[0]) &&
      !r.endsWith(this.verseRangeSeparator) &&
      !r.endsWith(this.verseSequenceIndicator)
    );
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(r) {
    let n;
    try {
      return (n = O.parse(r)), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof Be) return (n = new O()), { success: !1, verseRef: n };
      throw t;
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
  static getBBBCCCVVV(r, n, t) {
    return (
      (r % O.bcvMaxValue) * O.bookDigitShifter +
      (n >= 0 ? (n % O.bcvMaxValue) * O.chapterDigitShifter : 0) +
      (t >= 0 ? t % O.bcvMaxValue : 0)
    );
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(r) {
    let n;
    if (!r) return (n = -1), { success: !0, vNum: n };
    n = 0;
    let t;
    for (let o = 0; o < r.length; o++) {
      if (((t = r[o]), t < '0' || t > '9')) return o === 0 && (n = -1), { success: !1, vNum: n };
      if (((n = n * 10 + +t - +'0'), n > O.bcvMaxValue)) return (n = -1), { success: !1, vNum: n };
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
      (this._verse.includes(O.verseRangeSeparator) ||
        this._verse.includes(O.verseSequenceIndicator))
    );
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return se.bookNumberToId(this.bookNum, '');
  }
  set book(r) {
    this.bookNum = se.bookIdToNumber(r);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(r) {
    const n = +r;
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
  set verse(r) {
    const { success: n, vNum: t } = O.tryGetVerseNum(r);
    (this._verse = n ? void 0 : r.replace(this.rtlMark, '')),
      (this._verseNum = t),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = O.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(r) {
    if (r <= 0 || r > se.lastBook)
      throw new Be('BookNum must be greater than zero and less than or equal to last book');
    this._bookNum = r;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(r) {
    this.chapterNum = r;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(r) {
    this._verseNum = r;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var r;
    return (r = this.versification) == null ? void 0 : r.name;
  }
  set versificationStr(r) {
    this.versification = this.versification != null ? new te(r) : void 0;
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
    return this.validateVerse(O.verseRangeSeparators, O.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(r) {
    if (((r = r.replace(this.rtlMark, '')), r.includes('/'))) {
      const a = r.split('/');
      if (((r = a[0]), a.length > 1))
        try {
          const s = +a[1].trim();
          this.versification = new te(be[s]);
        } catch {
          throw new Be('Invalid reference : ' + r);
        }
    }
    const n = r.trim().split(' ');
    if (n.length !== 2) throw new Be('Invalid reference : ' + r);
    const t = n[1].split(':'),
      o = +t[0];
    if (
      t.length !== 2 ||
      se.bookIdToNumber(n[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !O.isVerseParseable(t[1])
    )
      throw new Be('Invalid reference : ' + r);
    this.updateInternal(n[0], t[0], t[1]);
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
    return new O(this);
  }
  toString() {
    const r = this.book;
    return r === '' ? '' : `${r} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(r) {
    return (
      r._bookNum === this._bookNum &&
      r._chapterNum === this._chapterNum &&
      r._verseNum === this._verseNum &&
      r._verse === this._verse &&
      r.versification != null &&
      this.versification != null &&
      r.versification.equals(this.versification)
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
  allVerses(r = !1, n = O.verseRangeSeparators, t = O.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      a = $r(this._verse, t);
    for (const s of a.map((i) => $r(i, n))) {
      const i = this.clone();
      i.verse = s[0];
      const c = i.verseNum;
      if ((o.push(i), s.length > 1)) {
        const l = this.clone();
        if (((l.verse = s[1]), !r))
          for (let f = c + 1; f < l.verseNum; f++) {
            const p = new O(this._bookNum, this._chapterNum, f, this.versification);
            this.isExcluded || o.push(p);
          }
        o.push(l);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(r, n) {
    if (!this.verse) return this.internalValid;
    let t = 0;
    for (const o of this.allVerses(!0, r, n)) {
      const a = o.internalValid;
      if (a !== 0) return a;
      const s = o.BBBCCCVVV;
      if (t > s) return 3;
      if (t === s) return 4;
      t = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > se.lastBook
      ? 2
      : 0;
  }
  setEmpty(r = O.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = r);
  }
  updateInternal(r, n, t) {
    (this.bookNum = se.bookIdToNumber(r)), (this.chapter = n), (this.verse = t);
  }
};
let fe = O;
$(fe, 'defaultVersification', te.English),
  $(fe, 'verseRangeSeparator', '-'),
  $(fe, 'verseSequenceIndicator', ','),
  $(fe, 'verseRangeSeparators', [O.verseRangeSeparator]),
  $(fe, 'verseSequenceIndicators', [O.verseSequenceIndicator]),
  $(fe, 'chapterDigitShifter', 1e3),
  $(fe, 'bookDigitShifter', O.chapterDigitShifter * O.chapterDigitShifter),
  $(fe, 'bcvMaxValue', O.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  $(fe, 'ValidStatusType', gn);
class Be extends Error {}
const bn = [
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
function Rr() {
  return se.allBookIds.map((e) => ({
    bookId: e,
    label: se.bookIdToEnglishName(e),
  }));
}
function Ar(e) {
  return {
    bookId: se.bookNumberToId(e),
    label: se.bookNumberToEnglishName(e),
  };
}
const yn = 1,
  ht = bn.length - 1,
  vn = 1,
  kn = 1,
  xn = (e) => {
    var r;
    return ((r = bn[e]) == null ? void 0 : r.chapters) ?? -1;
  },
  Pr = (e, r) => ({
    bookNum: Math.max(yn, Math.min(e.bookNum + r, ht)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Mr = (e, r) => ({
    ...e,
    chapterNum: Math.min(Math.max(vn, e.chapterNum + r), xn(e.bookNum)),
    verseNum: 1,
  }),
  Ir = (e, r) => ({
    ...e,
    verseNum: Math.max(kn, e.verseNum + r),
  });
function fr({
  variant: e = 'outlined',
  isDisabled: r = !1,
  hasError: n = !1,
  isFullWidth: t = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: i = !1,
  className: c,
  defaultValue: l,
  value: f,
  onChange: p,
  onFocus: u,
  onBlur: b,
}) {
  return /* @__PURE__ */ C(ln, {
    variant: e,
    disabled: r,
    error: n,
    fullWidth: t,
    helperText: o,
    label: a,
    placeholder: s,
    required: i,
    className: `papi-textfield ${c ?? ''}`,
    defaultValue: l,
    value: f,
    onChange: p,
    onFocus: u,
    onBlur: b,
  });
}
function mt(e, r) {
  return e.bookId === r.bookId && e.label === r.label;
}
function ss({ scrRef: e, handleSubmit: r }) {
  const [n, t] = Ke(Ar(e.bookNum)),
    o = (c) => {
      t(Ar(c.bookNum)), r(c);
    },
    a = (c, l) => {
      const p = { bookNum: se.bookIdToNumber(l.bookId), chapterNum: 1, verseNum: 1 };
      o(p);
    },
    s = (c) => {
      r({ ...e, chapterNum: +c.target.value });
    },
    i = (c) => {
      r({ ...e, verseNum: +c.target.value });
    };
  return /* @__PURE__ */ Fe(In, {
    children: [
      /* @__PURE__ */ C(rt, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Rr(),
        onChange: a,
        value: n,
        isClearable: !1,
        width: 200,
        checkIsOptionEqualToValue: mt,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => o(Pr(e, -1)),
        isDisabled: e.bookNum <= yn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => o(Pr(e, 1)),
        isDisabled: e.bookNum >= Rr().length,
        children: '>',
      }),
      /* @__PURE__ */ C(fr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Mr(e, -1)),
        isDisabled: e.chapterNum <= vn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Mr(e, 1)),
        isDisabled: e.chapterNum >= xn(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ C(fr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: i,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Ir(e, -1)),
        isDisabled: e.verseNum <= kn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, { onClick: () => r(Ir(e, 1)), children: '>' }),
    ],
  });
}
function is({
  isDisabled: e = !1,
  orientation: r = 'horizontal',
  min: n = 0,
  max: t = 100,
  step: o = 1,
  showMarks: a = !1,
  defaultValue: s,
  valueLabelDisplay: i = 'off',
  className: c,
  onChange: l,
  onChangeCommitted: f,
}) {
  return /* @__PURE__ */ C(Vn, {
    disabled: e,
    orientation: r,
    min: n,
    max: t,
    step: o,
    marks: a,
    defaultValue: s,
    valueLabelDisplay: i,
    className: `papi-slider ${r} ${c ?? ''}`,
    onChange: l,
    onChangeCommitted: f,
  });
}
function cs({ isChecked: e, isDisabled: r = !1, hasError: n = !1, className: t, onChange: o }) {
  return /* @__PURE__ */ C(Ln, {
    checked: e,
    disabled: r,
    className: `papi-switch ${n ? 'error' : ''} ${t ?? ''}`,
    onChange: o,
  });
}
function ls({
  autoHideDuration: e = null,
  isOpen: r = !1,
  className: n,
  onClose: t,
  anchorOrigin: o = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: a = {
    action: '',
    message: '',
    className: `papi-snackbar ${n ?? ''}`,
  },
  children: s,
}) {
  return /* @__PURE__ */ C(Fn, {
    autoHideDuration: e,
    className: `papi-snackbar ${n ?? ''}`,
    open: r,
    onClose: t,
    anchorOrigin: o,
    ContentProps: a,
    children: s,
  });
}
function gt(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: i = !1,
    focusVisibleClassName: c,
  } = e;
  return /* @__PURE__ */ C(Hn, {
    autoFocus: t,
    className: o,
    dense: a,
    disableGutters: s,
    divider: i,
    focusVisibleClassName: c,
    onClick: r,
    children: n,
  });
}
function Br({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ C(fr, { defaultValue: r[n.key], onChange: t });
}
const bt = ({ onChange: e, disabled: r, checked: n, ...t }) => {
  function o(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return /* @__PURE__ */ C(et, {
    ...t,
    isChecked: n,
    isDisabled: r,
    onChange: o,
  });
};
function us({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: n,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: i = !0,
  defaultColumnResizable: c = !0,
  rows: l,
  enableSelectColumn: f,
  selectColumnWidth: p = 50,
  rowKeyGetter: u,
  rowHeight: b = 35,
  headerRowHeight: y = 35,
  selectedRows: h,
  onSelectedRowsChange: d,
  onRowsChange: N,
  onCellClick: W,
  onCellDoubleClick: H,
  onCellContextMenu: R,
  onCellKeyDown: m,
  direction: X = 'ltr',
  enableVirtualization: re = !0,
  onCopy: ie,
  onPaste: oe,
  onScroll: B,
  className: Y,
}) {
  const ce = qn(() => {
    const ae = e.map((G) =>
      typeof G.editable == 'function'
        ? {
            ...G,
            editable: (Q) => !!G.editable(Q),
            renderEditCell: G.renderEditCell || Br,
          }
        : G.editable && !G.renderEditCell
        ? { ...G, renderEditCell: Br }
        : G.renderEditCell && !G.editable
        ? { ...G, editable: !1 }
        : G,
    );
    return f ? [{ ...Yn, minWidth: p }, ...ae] : ae;
  }, [f, e]);
  return /* @__PURE__ */ C(Xn, {
    columns: ce,
    defaultColumnOptions: {
      width: o,
      minWidth: a,
      maxWidth: s,
      sortable: i,
      resizable: c,
    },
    sortColumns: r,
    onSortColumnsChange: n,
    onColumnResize: t,
    rows: l,
    rowKeyGetter: u,
    rowHeight: b,
    headerRowHeight: y,
    selectedRows: h,
    onSelectedRowsChange: d,
    onRowsChange: N,
    onCellClick: W,
    onCellDoubleClick: H,
    onCellContextMenu: R,
    onCellKeyDown: m,
    direction: X,
    enableVirtualization: re,
    onCopy: ie,
    onPaste: oe,
    onScroll: B,
    renderers: { renderCheckbox: bt },
    className: `${Y ?? 'rdg-light'}`,
  });
}
function yt({ commandHandler: e, name: r, className: n, items: t }) {
  return /* @__PURE__ */ Fe(un, {
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${n ?? ''}`,
    children: [
      /* @__PURE__ */ C('h3', { className: `papi-menu ${n ?? ''}`, children: r }),
      t.map((o, a) =>
        /* @__PURE__ */ C(
          gt,
          {
            className: `papi-menu-item ${o.className}`,
            onClick: () => {
              e(o);
            },
            ...o,
          },
          a,
        ),
      ),
    ],
  });
}
function vt({ commandHandler: e, className: r, columns: n }) {
  return /* @__PURE__ */ C(un, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${r ?? ''}`,
    columns: n.length,
    children: n.map((t) =>
      /* @__PURE__ */ C(yt, {
        commandHandler: e,
        name: t.name,
        className: r,
        items: t.items,
      }),
    ),
  });
}
function A() {
  return (
    (A = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
          }
          return e;
        }),
    A.apply(this, arguments)
  );
}
function Re(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Sn(e) {
  if (!Re(e)) return e;
  const r = {};
  return (
    Object.keys(e).forEach((n) => {
      r[n] = Sn(e[n]);
    }),
    r
  );
}
function pe(
  e,
  r,
  n = {
    clone: !0,
  },
) {
  const t = n.clone ? A({}, e) : e;
  return (
    Re(e) &&
      Re(r) &&
      Object.keys(r).forEach((o) => {
        o !== '__proto__' &&
          (Re(r[o]) && o in e && Re(e[o])
            ? (t[o] = pe(e[o], r[o], n))
            : n.clone
            ? (t[o] = Re(r[o]) ? Sn(r[o]) : r[o])
            : (t[o] = r[o]));
      }),
    t
  );
}
function kt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var pr = { exports: {} },
  Ge = { exports: {} },
  j = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dr;
function xt() {
  if (Dr) return j;
  Dr = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    r = e ? Symbol.for('react.element') : 60103,
    n = e ? Symbol.for('react.portal') : 60106,
    t = e ? Symbol.for('react.fragment') : 60107,
    o = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    i = e ? Symbol.for('react.context') : 60110,
    c = e ? Symbol.for('react.async_mode') : 60111,
    l = e ? Symbol.for('react.concurrent_mode') : 60111,
    f = e ? Symbol.for('react.forward_ref') : 60112,
    p = e ? Symbol.for('react.suspense') : 60113,
    u = e ? Symbol.for('react.suspense_list') : 60120,
    b = e ? Symbol.for('react.memo') : 60115,
    y = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    d = e ? Symbol.for('react.fundamental') : 60117,
    N = e ? Symbol.for('react.responder') : 60118,
    W = e ? Symbol.for('react.scope') : 60119;
  function H(m) {
    if (typeof m == 'object' && m !== null) {
      var X = m.$$typeof;
      switch (X) {
        case r:
          switch (((m = m.type), m)) {
            case c:
            case l:
            case t:
            case a:
            case o:
            case p:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case i:
                case f:
                case y:
                case b:
                case s:
                  return m;
                default:
                  return X;
              }
          }
        case n:
          return X;
      }
    }
  }
  function R(m) {
    return H(m) === l;
  }
  return (
    (j.AsyncMode = c),
    (j.ConcurrentMode = l),
    (j.ContextConsumer = i),
    (j.ContextProvider = s),
    (j.Element = r),
    (j.ForwardRef = f),
    (j.Fragment = t),
    (j.Lazy = y),
    (j.Memo = b),
    (j.Portal = n),
    (j.Profiler = a),
    (j.StrictMode = o),
    (j.Suspense = p),
    (j.isAsyncMode = function (m) {
      return R(m) || H(m) === c;
    }),
    (j.isConcurrentMode = R),
    (j.isContextConsumer = function (m) {
      return H(m) === i;
    }),
    (j.isContextProvider = function (m) {
      return H(m) === s;
    }),
    (j.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === r;
    }),
    (j.isForwardRef = function (m) {
      return H(m) === f;
    }),
    (j.isFragment = function (m) {
      return H(m) === t;
    }),
    (j.isLazy = function (m) {
      return H(m) === y;
    }),
    (j.isMemo = function (m) {
      return H(m) === b;
    }),
    (j.isPortal = function (m) {
      return H(m) === n;
    }),
    (j.isProfiler = function (m) {
      return H(m) === a;
    }),
    (j.isStrictMode = function (m) {
      return H(m) === o;
    }),
    (j.isSuspense = function (m) {
      return H(m) === p;
    }),
    (j.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === t ||
        m === l ||
        m === a ||
        m === o ||
        m === p ||
        m === u ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === y ||
            m.$$typeof === b ||
            m.$$typeof === s ||
            m.$$typeof === i ||
            m.$$typeof === f ||
            m.$$typeof === d ||
            m.$$typeof === N ||
            m.$$typeof === W ||
            m.$$typeof === h))
      );
    }),
    (j.typeOf = H),
    j
  );
}
var z = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jr;
function St() {
  return (
    jr ||
      ((jr = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            r = e ? Symbol.for('react.element') : 60103,
            n = e ? Symbol.for('react.portal') : 60106,
            t = e ? Symbol.for('react.fragment') : 60107,
            o = e ? Symbol.for('react.strict_mode') : 60108,
            a = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            i = e ? Symbol.for('react.context') : 60110,
            c = e ? Symbol.for('react.async_mode') : 60111,
            l = e ? Symbol.for('react.concurrent_mode') : 60111,
            f = e ? Symbol.for('react.forward_ref') : 60112,
            p = e ? Symbol.for('react.suspense') : 60113,
            u = e ? Symbol.for('react.suspense_list') : 60120,
            b = e ? Symbol.for('react.memo') : 60115,
            y = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            d = e ? Symbol.for('react.fundamental') : 60117,
            N = e ? Symbol.for('react.responder') : 60118,
            W = e ? Symbol.for('react.scope') : 60119;
          function H(v) {
            return (
              typeof v == 'string' ||
              typeof v == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              v === t ||
              v === l ||
              v === a ||
              v === o ||
              v === p ||
              v === u ||
              (typeof v == 'object' &&
                v !== null &&
                (v.$$typeof === y ||
                  v.$$typeof === b ||
                  v.$$typeof === s ||
                  v.$$typeof === i ||
                  v.$$typeof === f ||
                  v.$$typeof === d ||
                  v.$$typeof === N ||
                  v.$$typeof === W ||
                  v.$$typeof === h))
            );
          }
          function R(v) {
            if (typeof v == 'object' && v !== null) {
              var ne = v.$$typeof;
              switch (ne) {
                case r:
                  var x = v.type;
                  switch (x) {
                    case c:
                    case l:
                    case t:
                    case a:
                    case o:
                    case p:
                      return x;
                    default:
                      var Ne = x && x.$$typeof;
                      switch (Ne) {
                        case i:
                        case f:
                        case y:
                        case b:
                        case s:
                          return Ne;
                        default:
                          return ne;
                      }
                  }
                case n:
                  return ne;
              }
            }
          }
          var m = c,
            X = l,
            re = i,
            ie = s,
            oe = r,
            B = f,
            Y = t,
            ce = y,
            ae = b,
            G = n,
            le = a,
            Q = o,
            de = p,
            ve = !1;
          function Se(v) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              g(v) || R(v) === c
            );
          }
          function g(v) {
            return R(v) === l;
          }
          function k(v) {
            return R(v) === i;
          }
          function _(v) {
            return R(v) === s;
          }
          function w(v) {
            return typeof v == 'object' && v !== null && v.$$typeof === r;
          }
          function S(v) {
            return R(v) === f;
          }
          function P(v) {
            return R(v) === t;
          }
          function E(v) {
            return R(v) === y;
          }
          function T(v) {
            return R(v) === b;
          }
          function M(v) {
            return R(v) === n;
          }
          function D(v) {
            return R(v) === a;
          }
          function I(v) {
            return R(v) === o;
          }
          function Z(v) {
            return R(v) === p;
          }
          (z.AsyncMode = m),
            (z.ConcurrentMode = X),
            (z.ContextConsumer = re),
            (z.ContextProvider = ie),
            (z.Element = oe),
            (z.ForwardRef = B),
            (z.Fragment = Y),
            (z.Lazy = ce),
            (z.Memo = ae),
            (z.Portal = G),
            (z.Profiler = le),
            (z.StrictMode = Q),
            (z.Suspense = de),
            (z.isAsyncMode = Se),
            (z.isConcurrentMode = g),
            (z.isContextConsumer = k),
            (z.isContextProvider = _),
            (z.isElement = w),
            (z.isForwardRef = S),
            (z.isFragment = P),
            (z.isLazy = E),
            (z.isMemo = T),
            (z.isPortal = M),
            (z.isProfiler = D),
            (z.isStrictMode = I),
            (z.isSuspense = Z),
            (z.isValidElementType = H),
            (z.typeOf = R);
        })()),
    z
  );
}
var zr;
function Nn() {
  return (
    zr ||
      ((zr = 1), process.env.NODE_ENV === 'production' ? (Ge.exports = xt()) : (Ge.exports = St())),
    Ge.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ar, Vr;
function Nt() {
  if (Vr) return ar;
  Vr = 1;
  var e = Object.getOwnPropertySymbols,
    r = Object.prototype.hasOwnProperty,
    n = Object.prototype.propertyIsEnumerable;
  function t(a) {
    if (a == null) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(a);
  }
  function o() {
    try {
      if (!Object.assign) return !1;
      var a = new String('abc');
      if (((a[5] = 'de'), Object.getOwnPropertyNames(a)[0] === '5')) return !1;
      for (var s = {}, i = 0; i < 10; i++) s['_' + String.fromCharCode(i)] = i;
      var c = Object.getOwnPropertyNames(s).map(function (f) {
        return s[f];
      });
      if (c.join('') !== '0123456789') return !1;
      var l = {};
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (f) {
          l[f] = f;
        }),
        Object.keys(Object.assign({}, l)).join('') === 'abcdefghijklmnopqrst'
      );
    } catch {
      return !1;
    }
  }
  return (
    (ar = o()
      ? Object.assign
      : function (a, s) {
          for (var i, c = t(a), l, f = 1; f < arguments.length; f++) {
            i = Object(arguments[f]);
            for (var p in i) r.call(i, p) && (c[p] = i[p]);
            if (e) {
              l = e(i);
              for (var u = 0; u < l.length; u++) n.call(i, l[u]) && (c[l[u]] = i[l[u]]);
            }
          }
          return c;
        }),
    ar
  );
}
var sr, Lr;
function yr() {
  if (Lr) return sr;
  Lr = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (sr = e), sr;
}
var ir, Fr;
function En() {
  return Fr || ((Fr = 1), (ir = Function.call.bind(Object.prototype.hasOwnProperty))), ir;
}
var cr, Hr;
function Et() {
  if (Hr) return cr;
  Hr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var r = yr(),
      n = {},
      t = En();
    e = function (a) {
      var s = 'Warning: ' + a;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function o(a, s, i, c, l) {
    if (process.env.NODE_ENV !== 'production') {
      for (var f in a)
        if (t(a, f)) {
          var p;
          try {
            if (typeof a[f] != 'function') {
              var u = Error(
                (c || 'React class') +
                  ': ' +
                  i +
                  ' type `' +
                  f +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[f] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((u.name = 'Invariant Violation'), u);
            }
            p = a[f](s, f, c, i, null, r);
          } catch (y) {
            p = y;
          }
          if (
            (p &&
              !(p instanceof Error) &&
              e(
                (c || 'React class') +
                  ': type specification of ' +
                  i +
                  ' `' +
                  f +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof p +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            p instanceof Error && !(p.message in n))
          ) {
            n[p.message] = !0;
            var b = l ? l() : '';
            e('Failed ' + i + ' type: ' + p.message + (b ?? ''));
          }
        }
    }
  }
  return (
    (o.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (n = {});
    }),
    (cr = o),
    cr
  );
}
var lr, Ur;
function wt() {
  if (Ur) return lr;
  Ur = 1;
  var e = Nn(),
    r = Nt(),
    n = yr(),
    t = En(),
    o = Et(),
    a = function () {};
  process.env.NODE_ENV !== 'production' &&
    (a = function (i) {
      var c = 'Warning: ' + i;
      typeof console < 'u' && console.error(c);
      try {
        throw new Error(c);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (lr = function (i, c) {
      var l = typeof Symbol == 'function' && Symbol.iterator,
        f = '@@iterator';
      function p(g) {
        var k = g && ((l && g[l]) || g[f]);
        if (typeof k == 'function') return k;
      }
      var u = '<<anonymous>>',
        b = {
          array: N('array'),
          bigint: N('bigint'),
          bool: N('boolean'),
          func: N('function'),
          number: N('number'),
          object: N('object'),
          string: N('string'),
          symbol: N('symbol'),
          any: W(),
          arrayOf: H,
          element: R(),
          elementType: m(),
          instanceOf: X,
          node: B(),
          objectOf: ie,
          oneOf: re,
          oneOfType: oe,
          shape: ce,
          exact: ae,
        };
      function y(g, k) {
        return g === k ? g !== 0 || 1 / g === 1 / k : g !== g && k !== k;
      }
      function h(g, k) {
        (this.message = g), (this.data = k && typeof k == 'object' ? k : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function d(g) {
        if (process.env.NODE_ENV !== 'production')
          var k = {},
            _ = 0;
        function w(P, E, T, M, D, I, Z) {
          if (((M = M || u), (I = I || T), Z !== n)) {
            if (c) {
              var v = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((v.name = 'Invariant Violation'), v);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var ne = M + ':' + T;
              !k[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
                _ < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    I +
                    '` prop on `' +
                    M +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (k[ne] = !0),
                _++);
            }
          }
          return E[T] == null
            ? P
              ? E[T] === null
                ? new h(
                    'The ' +
                      D +
                      ' `' +
                      I +
                      '` is marked as required ' +
                      ('in `' + M + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      D +
                      ' `' +
                      I +
                      '` is marked as required in ' +
                      ('`' + M + '`, but its value is `undefined`.'),
                  )
              : null
            : g(E, T, M, D, I);
        }
        var S = w.bind(null, !1);
        return (S.isRequired = w.bind(null, !0)), S;
      }
      function N(g) {
        function k(_, w, S, P, E, T) {
          var M = _[w],
            D = Q(M);
          if (D !== g) {
            var I = de(M);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type ' +
                ('`' + I + '` supplied to `' + S + '`, expected ') +
                ('`' + g + '`.'),
              { expectedType: g },
            );
          }
          return null;
        }
        return d(k);
      }
      function W() {
        return d(s);
      }
      function H(g) {
        function k(_, w, S, P, E) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                E +
                '` of component `' +
                S +
                '` has invalid PropType notation inside arrayOf.',
            );
          var T = _[w];
          if (!Array.isArray(T)) {
            var M = Q(T);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type ' +
                ('`' + M + '` supplied to `' + S + '`, expected an array.'),
            );
          }
          for (var D = 0; D < T.length; D++) {
            var I = g(T, D, S, P, E + '[' + D + ']', n);
            if (I instanceof Error) return I;
          }
          return null;
        }
        return d(k);
      }
      function R() {
        function g(k, _, w, S, P) {
          var E = k[_];
          if (!i(E)) {
            var T = Q(E);
            return new h(
              'Invalid ' +
                S +
                ' `' +
                P +
                '` of type ' +
                ('`' + T + '` supplied to `' + w + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return d(g);
      }
      function m() {
        function g(k, _, w, S, P) {
          var E = k[_];
          if (!e.isValidElementType(E)) {
            var T = Q(E);
            return new h(
              'Invalid ' +
                S +
                ' `' +
                P +
                '` of type ' +
                ('`' + T + '` supplied to `' + w + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return d(g);
      }
      function X(g) {
        function k(_, w, S, P, E) {
          if (!(_[w] instanceof g)) {
            var T = g.name || u,
              M = Se(_[w]);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type ' +
                ('`' + M + '` supplied to `' + S + '`, expected ') +
                ('instance of `' + T + '`.'),
            );
          }
          return null;
        }
        return d(k);
      }
      function re(g) {
        if (!Array.isArray(g))
          return (
            process.env.NODE_ENV !== 'production' &&
              (arguments.length > 1
                ? a(
                    'Invalid arguments supplied to oneOf, expected an array, got ' +
                      arguments.length +
                      ' arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).',
                  )
                : a('Invalid argument supplied to oneOf, expected an array.')),
            s
          );
        function k(_, w, S, P, E) {
          for (var T = _[w], M = 0; M < g.length; M++) if (y(T, g[M])) return null;
          var D = JSON.stringify(g, function (Z, v) {
            var ne = de(v);
            return ne === 'symbol' ? String(v) : v;
          });
          return new h(
            'Invalid ' +
              P +
              ' `' +
              E +
              '` of value `' +
              String(T) +
              '` ' +
              ('supplied to `' + S + '`, expected one of ' + D + '.'),
          );
        }
        return d(k);
      }
      function ie(g) {
        function k(_, w, S, P, E) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                E +
                '` of component `' +
                S +
                '` has invalid PropType notation inside objectOf.',
            );
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type ' +
                ('`' + M + '` supplied to `' + S + '`, expected an object.'),
            );
          for (var D in T)
            if (t(T, D)) {
              var I = g(T, D, S, P, E + '.' + D, n);
              if (I instanceof Error) return I;
            }
          return null;
        }
        return d(k);
      }
      function oe(g) {
        if (!Array.isArray(g))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var k = 0; k < g.length; k++) {
          var _ = g[k];
          if (typeof _ != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ve(_) +
                  ' at index ' +
                  k +
                  '.',
              ),
              s
            );
        }
        function w(S, P, E, T, M) {
          for (var D = [], I = 0; I < g.length; I++) {
            var Z = g[I],
              v = Z(S, P, E, T, M, n);
            if (v == null) return null;
            v.data && t(v.data, 'expectedType') && D.push(v.data.expectedType);
          }
          var ne = D.length > 0 ? ', expected one of type [' + D.join(', ') + ']' : '';
          return new h('Invalid ' + T + ' `' + M + '` supplied to ' + ('`' + E + '`' + ne + '.'));
        }
        return d(w);
      }
      function B() {
        function g(k, _, w, S, P) {
          return G(k[_])
            ? null
            : new h(
                'Invalid ' +
                  S +
                  ' `' +
                  P +
                  '` supplied to ' +
                  ('`' + w + '`, expected a ReactNode.'),
              );
        }
        return d(g);
      }
      function Y(g, k, _, w, S) {
        return new h(
          (g || 'React class') +
            ': ' +
            k +
            ' type `' +
            _ +
            '.' +
            w +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            S +
            '`.',
        );
      }
      function ce(g) {
        function k(_, w, S, P, E) {
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type `' +
                M +
                '` ' +
                ('supplied to `' + S + '`, expected `object`.'),
            );
          for (var D in g) {
            var I = g[D];
            if (typeof I != 'function') return Y(S, P, E, D, de(I));
            var Z = I(T, D, S, P, E + '.' + D, n);
            if (Z) return Z;
          }
          return null;
        }
        return d(k);
      }
      function ae(g) {
        function k(_, w, S, P, E) {
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                E +
                '` of type `' +
                M +
                '` ' +
                ('supplied to `' + S + '`, expected `object`.'),
            );
          var D = r({}, _[w], g);
          for (var I in D) {
            var Z = g[I];
            if (t(g, I) && typeof Z != 'function') return Y(S, P, E, I, de(Z));
            if (!Z)
              return new h(
                'Invalid ' +
                  P +
                  ' `' +
                  E +
                  '` key `' +
                  I +
                  '` supplied to `' +
                  S +
                  '`.\nBad object: ' +
                  JSON.stringify(_[w], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(g), null, '  '),
              );
            var v = Z(T, I, S, P, E + '.' + I, n);
            if (v) return v;
          }
          return null;
        }
        return d(k);
      }
      function G(g) {
        switch (typeof g) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !g;
          case 'object':
            if (Array.isArray(g)) return g.every(G);
            if (g === null || i(g)) return !0;
            var k = p(g);
            if (k) {
              var _ = k.call(g),
                w;
              if (k !== g.entries) {
                for (; !(w = _.next()).done; ) if (!G(w.value)) return !1;
              } else
                for (; !(w = _.next()).done; ) {
                  var S = w.value;
                  if (S && !G(S[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function le(g, k) {
        return g === 'symbol'
          ? !0
          : k
          ? k['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && k instanceof Symbol)
          : !1;
      }
      function Q(g) {
        var k = typeof g;
        return Array.isArray(g)
          ? 'array'
          : g instanceof RegExp
          ? 'object'
          : le(k, g)
          ? 'symbol'
          : k;
      }
      function de(g) {
        if (typeof g > 'u' || g === null) return '' + g;
        var k = Q(g);
        if (k === 'object') {
          if (g instanceof Date) return 'date';
          if (g instanceof RegExp) return 'regexp';
        }
        return k;
      }
      function ve(g) {
        var k = de(g);
        switch (k) {
          case 'array':
          case 'object':
            return 'an ' + k;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + k;
          default:
            return k;
        }
      }
      function Se(g) {
        return !g.constructor || !g.constructor.name ? u : g.constructor.name;
      }
      return (
        (b.checkPropTypes = o), (b.resetWarningCache = o.resetWarningCache), (b.PropTypes = b), b
      );
    }),
    lr
  );
}
var ur, Jr;
function Tt() {
  if (Jr) return ur;
  Jr = 1;
  var e = yr();
  function r() {}
  function n() {}
  return (
    (n.resetWarningCache = r),
    (ur = function () {
      function t(s, i, c, l, f, p) {
        if (p !== e) {
          var u = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((u.name = 'Invariant Violation'), u);
        }
      }
      t.isRequired = t;
      function o() {
        return t;
      }
      var a = {
        array: t,
        bigint: t,
        bool: t,
        func: t,
        number: t,
        object: t,
        string: t,
        symbol: t,
        any: t,
        arrayOf: o,
        element: t,
        elementType: t,
        instanceOf: o,
        node: t,
        objectOf: o,
        oneOf: o,
        oneOfType: o,
        shape: o,
        exact: o,
        checkPropTypes: n,
        resetWarningCache: r,
      };
      return (a.PropTypes = a), a;
    }),
    ur
  );
}
if (process.env.NODE_ENV !== 'production') {
  var Ct = Nn(),
    _t = !0;
  pr.exports = wt()(Ct.isElement, _t);
} else pr.exports = Tt()();
var Ot = pr.exports;
const U = /* @__PURE__ */ kt(Ot);
function Pe(e) {
  let r = 'https://mui.com/production-error/?code=' + e;
  for (let n = 1; n < arguments.length; n += 1) r += '&args[]=' + encodeURIComponent(arguments[n]);
  return 'Minified MUI error #' + e + '; visit ' + r + ' for the full message.';
}
var hr = { exports: {} },
  V = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gr;
function $t() {
  if (Gr) return V;
  Gr = 1;
  var e = Symbol.for('react.element'),
    r = Symbol.for('react.portal'),
    n = Symbol.for('react.fragment'),
    t = Symbol.for('react.strict_mode'),
    o = Symbol.for('react.profiler'),
    a = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    i = Symbol.for('react.server_context'),
    c = Symbol.for('react.forward_ref'),
    l = Symbol.for('react.suspense'),
    f = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    u = Symbol.for('react.lazy'),
    b = Symbol.for('react.offscreen'),
    y;
  y = Symbol.for('react.module.reference');
  function h(d) {
    if (typeof d == 'object' && d !== null) {
      var N = d.$$typeof;
      switch (N) {
        case e:
          switch (((d = d.type), d)) {
            case n:
            case o:
            case t:
            case l:
            case f:
              return d;
            default:
              switch (((d = d && d.$$typeof), d)) {
                case i:
                case s:
                case c:
                case u:
                case p:
                case a:
                  return d;
                default:
                  return N;
              }
          }
        case r:
          return N;
      }
    }
  }
  return (
    (V.ContextConsumer = s),
    (V.ContextProvider = a),
    (V.Element = e),
    (V.ForwardRef = c),
    (V.Fragment = n),
    (V.Lazy = u),
    (V.Memo = p),
    (V.Portal = r),
    (V.Profiler = o),
    (V.StrictMode = t),
    (V.Suspense = l),
    (V.SuspenseList = f),
    (V.isAsyncMode = function () {
      return !1;
    }),
    (V.isConcurrentMode = function () {
      return !1;
    }),
    (V.isContextConsumer = function (d) {
      return h(d) === s;
    }),
    (V.isContextProvider = function (d) {
      return h(d) === a;
    }),
    (V.isElement = function (d) {
      return typeof d == 'object' && d !== null && d.$$typeof === e;
    }),
    (V.isForwardRef = function (d) {
      return h(d) === c;
    }),
    (V.isFragment = function (d) {
      return h(d) === n;
    }),
    (V.isLazy = function (d) {
      return h(d) === u;
    }),
    (V.isMemo = function (d) {
      return h(d) === p;
    }),
    (V.isPortal = function (d) {
      return h(d) === r;
    }),
    (V.isProfiler = function (d) {
      return h(d) === o;
    }),
    (V.isStrictMode = function (d) {
      return h(d) === t;
    }),
    (V.isSuspense = function (d) {
      return h(d) === l;
    }),
    (V.isSuspenseList = function (d) {
      return h(d) === f;
    }),
    (V.isValidElementType = function (d) {
      return (
        typeof d == 'string' ||
        typeof d == 'function' ||
        d === n ||
        d === o ||
        d === t ||
        d === l ||
        d === f ||
        d === b ||
        (typeof d == 'object' &&
          d !== null &&
          (d.$$typeof === u ||
            d.$$typeof === p ||
            d.$$typeof === a ||
            d.$$typeof === s ||
            d.$$typeof === c ||
            d.$$typeof === y ||
            d.getModuleId !== void 0))
      );
    }),
    (V.typeOf = h),
    V
  );
}
var L = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kr;
function Rt() {
  return (
    Kr ||
      ((Kr = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            r = Symbol.for('react.portal'),
            n = Symbol.for('react.fragment'),
            t = Symbol.for('react.strict_mode'),
            o = Symbol.for('react.profiler'),
            a = Symbol.for('react.provider'),
            s = Symbol.for('react.context'),
            i = Symbol.for('react.server_context'),
            c = Symbol.for('react.forward_ref'),
            l = Symbol.for('react.suspense'),
            f = Symbol.for('react.suspense_list'),
            p = Symbol.for('react.memo'),
            u = Symbol.for('react.lazy'),
            b = Symbol.for('react.offscreen'),
            y = !1,
            h = !1,
            d = !1,
            N = !1,
            W = !1,
            H;
          H = Symbol.for('react.module.reference');
          function R(x) {
            return !!(
              typeof x == 'string' ||
              typeof x == 'function' ||
              x === n ||
              x === o ||
              W ||
              x === t ||
              x === l ||
              x === f ||
              N ||
              x === b ||
              y ||
              h ||
              d ||
              (typeof x == 'object' &&
                x !== null &&
                (x.$$typeof === u ||
                  x.$$typeof === p ||
                  x.$$typeof === a ||
                  x.$$typeof === s ||
                  x.$$typeof === c || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  x.$$typeof === H ||
                  x.getModuleId !== void 0))
            );
          }
          function m(x) {
            if (typeof x == 'object' && x !== null) {
              var Ne = x.$$typeof;
              switch (Ne) {
                case e:
                  var Je = x.type;
                  switch (Je) {
                    case n:
                    case o:
                    case t:
                    case l:
                    case f:
                      return Je;
                    default:
                      var Cr = Je && Je.$$typeof;
                      switch (Cr) {
                        case i:
                        case s:
                        case c:
                        case u:
                        case p:
                        case a:
                          return Cr;
                        default:
                          return Ne;
                      }
                  }
                case r:
                  return Ne;
              }
            }
          }
          var X = s,
            re = a,
            ie = e,
            oe = c,
            B = n,
            Y = u,
            ce = p,
            ae = r,
            G = o,
            le = t,
            Q = l,
            de = f,
            ve = !1,
            Se = !1;
          function g(x) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function k(x) {
            return (
              Se ||
                ((Se = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function _(x) {
            return m(x) === s;
          }
          function w(x) {
            return m(x) === a;
          }
          function S(x) {
            return typeof x == 'object' && x !== null && x.$$typeof === e;
          }
          function P(x) {
            return m(x) === c;
          }
          function E(x) {
            return m(x) === n;
          }
          function T(x) {
            return m(x) === u;
          }
          function M(x) {
            return m(x) === p;
          }
          function D(x) {
            return m(x) === r;
          }
          function I(x) {
            return m(x) === o;
          }
          function Z(x) {
            return m(x) === t;
          }
          function v(x) {
            return m(x) === l;
          }
          function ne(x) {
            return m(x) === f;
          }
          (L.ContextConsumer = X),
            (L.ContextProvider = re),
            (L.Element = ie),
            (L.ForwardRef = oe),
            (L.Fragment = B),
            (L.Lazy = Y),
            (L.Memo = ce),
            (L.Portal = ae),
            (L.Profiler = G),
            (L.StrictMode = le),
            (L.Suspense = Q),
            (L.SuspenseList = de),
            (L.isAsyncMode = g),
            (L.isConcurrentMode = k),
            (L.isContextConsumer = _),
            (L.isContextProvider = w),
            (L.isElement = S),
            (L.isForwardRef = P),
            (L.isFragment = E),
            (L.isLazy = T),
            (L.isMemo = M),
            (L.isPortal = D),
            (L.isProfiler = I),
            (L.isStrictMode = Z),
            (L.isSuspense = v),
            (L.isSuspenseList = ne),
            (L.isValidElementType = R),
            (L.typeOf = m);
        })()),
    L
  );
}
process.env.NODE_ENV === 'production' ? (hr.exports = $t()) : (hr.exports = Rt());
var qr = hr.exports;
const At = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Pt(e) {
  const r = `${e}`.match(At);
  return (r && r[1]) || '';
}
function wn(e, r = '') {
  return e.displayName || e.name || Pt(e) || r;
}
function Wr(e, r, n) {
  const t = wn(r);
  return e.displayName || (t !== '' ? `${n}(${t})` : n);
}
function Mt(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return wn(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case qr.ForwardRef:
          return Wr(e, e.render, 'ForwardRef');
        case qr.Memo:
          return Wr(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function he(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Pe(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Tn(e, r) {
  const n = A({}, r);
  return (
    Object.keys(e).forEach((t) => {
      if (t.toString().match(/^(components|slots)$/)) n[t] = A({}, e[t], n[t]);
      else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
        const o = e[t] || {},
          a = r[t];
        (n[t] = {}),
          !a || !Object.keys(a)
            ? (n[t] = o)
            : !o || !Object.keys(o)
            ? (n[t] = a)
            : ((n[t] = A({}, a)),
              Object.keys(o).forEach((s) => {
                n[t][s] = Tn(o[s], a[s]);
              }));
      } else n[t] === void 0 && (n[t] = e[t]);
    }),
    n
  );
}
function It(e, r, n = void 0) {
  const t = {};
  return (
    Object.keys(e).forEach(
      // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
      // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
      (o) => {
        t[o] = e[o]
          .reduce((a, s) => {
            if (s) {
              const i = r(s);
              i !== '' && a.push(i), n && n[s] && a.push(n[s]);
            }
            return a;
          }, [])
          .join(' ');
      },
    ),
    t
  );
}
const Xr = (e) => e,
  Bt = () => {
    let e = Xr;
    return {
      configure(r) {
        e = r;
      },
      generate(r) {
        return e(r);
      },
      reset() {
        e = Xr;
      },
    };
  },
  Dt = Bt(),
  jt = Dt,
  zt = {
    active: 'active',
    checked: 'checked',
    completed: 'completed',
    disabled: 'disabled',
    readOnly: 'readOnly',
    error: 'error',
    expanded: 'expanded',
    focused: 'focused',
    focusVisible: 'focusVisible',
    required: 'required',
    selected: 'selected',
  };
function vr(e, r, n = 'Mui') {
  const t = zt[r];
  return t ? `${n}-${t}` : `${jt.generate(e)}-${r}`;
}
function Vt(e, r, n = 'Mui') {
  const t = {};
  return (
    r.forEach((o) => {
      t[o] = vr(e, o, n);
    }),
    t
  );
}
function ge(e, r) {
  if (e == null) return {};
  var n = {},
    t = Object.keys(e),
    o,
    a;
  for (a = 0; a < t.length; a++) (o = t[a]), !(r.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Cn(e) {
  var r,
    n,
    t = '';
  if (typeof e == 'string' || typeof e == 'number') t += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++) e[r] && (n = Cn(e[r])) && (t && (t += ' '), (t += n));
    else for (r in e) e[r] && (t && (t += ' '), (t += r));
  return t;
}
function Lt() {
  for (var e, r, n = 0, t = ''; n < arguments.length; )
    (e = arguments[n++]) && (r = Cn(e)) && (t && (t += ' '), (t += r));
  return t;
}
/**
 * @mui/styled-engine v5.13.2
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Ft(e, r) {
  const n = Qn(e, r);
  return process.env.NODE_ENV !== 'production'
    ? (...t) => {
        const o = typeof e == 'string' ? `"${e}"` : 'component';
        return (
          t.length === 0
            ? console.error(
                [
                  `MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`,
                  'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
                ].join(`
`),
              )
            : t.some((a) => a === void 0) &&
              console.error(
                `MUI: the styled(${o})(...args) API requires all its args to be defined.`,
              ),
          n(...t)
        );
      }
    : n;
}
const Ht = (e, r) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = r(e.__emotion_styles));
  },
  Ut = ['values', 'unit', 'step'],
  Jt = (e) => {
    const r =
      Object.keys(e).map((n) => ({
        key: n,
        val: e[n],
      })) || [];
    return (
      r.sort((n, t) => n.val - t.val),
      r.reduce(
        (n, t) =>
          A({}, n, {
            [t.key]: t.val,
          }),
        {},
      )
    );
  };
function Gt(e) {
  const {
      // The breakpoint **start** at this value.
      // For instance with the first breakpoint xs: [xs, sm).
      values: r = {
        xs: 0,
        // phone
        sm: 600,
        // tablet
        md: 900,
        // small laptop
        lg: 1200,
        // desktop
        xl: 1536,
        // large screen
      },
      unit: n = 'px',
      step: t = 5,
    } = e,
    o = ge(e, Ut),
    a = Jt(r),
    s = Object.keys(a);
  function i(u) {
    return `@media (min-width:${typeof r[u] == 'number' ? r[u] : u}${n})`;
  }
  function c(u) {
    return `@media (max-width:${(typeof r[u] == 'number' ? r[u] : u) - t / 100}${n})`;
  }
  function l(u, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof r[u] == 'number' ? r[u] : u}${n}) and (max-width:${
      (y !== -1 && typeof r[s[y]] == 'number' ? r[s[y]] : b) - t / 100
    }${n})`;
  }
  function f(u) {
    return s.indexOf(u) + 1 < s.length ? l(u, s[s.indexOf(u) + 1]) : i(u);
  }
  function p(u) {
    const b = s.indexOf(u);
    return b === 0
      ? i(s[1])
      : b === s.length - 1
      ? c(s[b])
      : l(u, s[s.indexOf(u) + 1]).replace('@media', '@media not all and');
  }
  return A(
    {
      keys: s,
      values: a,
      up: i,
      down: c,
      between: l,
      only: f,
      not: p,
      unit: n,
    },
    o,
  );
}
const Kt = {
    borderRadius: 4,
  },
  qt = Kt,
  Wt =
    process.env.NODE_ENV !== 'production'
      ? U.oneOfType([U.number, U.string, U.object, U.array])
      : {},
  ye = Wt;
function ze(e, r) {
  return r
    ? pe(e, r, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const kr = {
    xs: 0,
    // phone
    sm: 600,
    // tablet
    md: 900,
    // small laptop
    lg: 1200,
    // desktop
    xl: 1536,
    // large screen
  },
  Yr = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${kr[e]}px)`,
  };
function me(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || Yr;
    return r.reduce((s, i, c) => ((s[a.up(a.keys[c])] = n(r[c])), s), {});
  }
  if (typeof r == 'object') {
    const a = t.breakpoints || Yr;
    return Object.keys(r).reduce((s, i) => {
      if (Object.keys(a.values || kr).indexOf(i) !== -1) {
        const c = a.up(i);
        s[c] = n(r[i], i);
      } else {
        const c = i;
        s[c] = r[c];
      }
      return s;
    }, {});
  }
  return n(r);
}
function Xt(e = {}) {
  var r;
  return (
    ((r = e.keys) == null
      ? void 0
      : r.reduce((t, o) => {
          const a = e.up(o);
          return (t[a] = {}), t;
        }, {})) || {}
  );
}
function Yt(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function Xe(e, r, n = !0) {
  if (!r || typeof r != 'string') return null;
  if (e && e.vars && n) {
    const t = `vars.${r}`.split('.').reduce((o, a) => (o && o[a] ? o[a] : null), e);
    if (t != null) return t;
  }
  return r.split('.').reduce((t, o) => (t && t[o] != null ? t[o] : null), e);
}
function We(e, r, n, t = n) {
  let o;
  return (
    typeof e == 'function' ? (o = e(n)) : Array.isArray(e) ? (o = e[n] || t) : (o = Xe(e, n) || t),
    r && (o = r(o, t, e)),
    o
  );
}
function F(e) {
  const { prop: r, cssProperty: n = e.prop, themeKey: t, transform: o } = e,
    a = (s) => {
      if (s[r] == null) return null;
      const i = s[r],
        c = s.theme,
        l = Xe(c, t) || {};
      return me(s, i, (p) => {
        let u = We(l, o, p);
        return (
          p === u &&
            typeof p == 'string' &&
            (u = We(l, o, `${r}${p === 'default' ? '' : he(p)}`, p)),
          n === !1
            ? u
            : {
                [n]: u,
              }
        );
      });
    };
  return (
    (a.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [r]: ye,
          }
        : {}),
    (a.filterProps = [r]),
    a
  );
}
function Zt(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const Qt = {
    m: 'margin',
    p: 'padding',
  },
  eo = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  Zr = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  ro = Zt((e) => {
    if (e.length > 2)
      if (Zr[e]) e = Zr[e];
      else return [e];
    const [r, n] = e.split(''),
      t = Qt[r],
      o = eo[n] || '';
    return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
  }),
  Ye = [
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'marginInline',
    'marginInlineStart',
    'marginInlineEnd',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
  ],
  Ze = [
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlock',
    'paddingBlockStart',
    'paddingBlockEnd',
  ],
  no = [...Ye, ...Ze];
function He(e, r, n, t) {
  var o;
  const a = (o = Xe(e, r, !1)) != null ? o : n;
  return typeof a == 'number'
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              typeof s != 'number' &&
              console.error(`MUI: Expected ${t} argument to be a number or a string, got ${s}.`),
            a * s)
    : Array.isArray(a)
    ? (s) =>
        typeof s == 'string'
          ? s
          : (process.env.NODE_ENV !== 'production' &&
              (Number.isInteger(s)
                ? s > a.length - 1 &&
                  console.error(
                    [
                      `MUI: The value provided (${s}) overflows.`,
                      `The supported values are: ${JSON.stringify(a)}.`,
                      `${s} > ${a.length - 1}, you need to add the missing values.`,
                    ].join(`
`),
                  )
                : console.error(
                    [
                      `MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`,
                    ].join(`
`),
                  )),
            a[s])
    : typeof a == 'function'
    ? a
    : (process.env.NODE_ENV !== 'production' &&
        console.error(
          [
            `MUI: The \`theme.${r}\` value (${a}) is invalid.`,
            'It should be a number, an array or a function.',
          ].join(`
`),
        ),
      () => {});
}
function _n(e) {
  return He(e, 'spacing', 8, 'spacing');
}
function Ue(e, r) {
  if (typeof r == 'string' || r == null) return r;
  const n = Math.abs(r),
    t = e(n);
  return r >= 0 ? t : typeof t == 'number' ? -t : `-${t}`;
}
function to(e, r) {
  return (n) => e.reduce((t, o) => ((t[o] = Ue(r, n)), t), {});
}
function oo(e, r, n, t) {
  if (r.indexOf(n) === -1) return null;
  const o = ro(n),
    a = to(o, t),
    s = e[n];
  return me(e, s, a);
}
function On(e, r) {
  const n = _n(e.theme);
  return Object.keys(e)
    .map((t) => oo(e, r, t, n))
    .reduce(ze, {});
}
function K(e) {
  return On(e, Ye);
}
K.propTypes =
  process.env.NODE_ENV !== 'production' ? Ye.reduce((e, r) => ((e[r] = ye), e), {}) : {};
K.filterProps = Ye;
function q(e) {
  return On(e, Ze);
}
q.propTypes =
  process.env.NODE_ENV !== 'production' ? Ze.reduce((e, r) => ((e[r] = ye), e), {}) : {};
q.filterProps = Ze;
process.env.NODE_ENV !== 'production' && no.reduce((e, r) => ((e[r] = ye), e), {});
function ao(e = 8) {
  if (e.mui) return e;
  const r = _n({
      spacing: e,
    }),
    n = (...t) => (
      process.env.NODE_ENV !== 'production' &&
        (t.length <= 4 ||
          console.error(
            `MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`,
          )),
      (t.length === 0 ? [1] : t)
        .map((a) => {
          const s = r(a);
          return typeof s == 'number' ? `${s}px` : s;
        })
        .join(' ')
    );
  return (n.mui = !0), n;
}
function Qe(...e) {
  const r = e.reduce(
      (t, o) => (
        o.filterProps.forEach((a) => {
          t[a] = o;
        }),
        t
      ),
      {},
    ),
    n = (t) => Object.keys(t).reduce((o, a) => (r[a] ? ze(o, r[a](t)) : o), {});
  return (
    (n.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((t, o) => Object.assign(t, o.propTypes), {})
        : {}),
    (n.filterProps = e.reduce((t, o) => t.concat(o.filterProps), [])),
    n
  );
}
function ue(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const so = F({
    prop: 'border',
    themeKey: 'borders',
    transform: ue,
  }),
  io = F({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: ue,
  }),
  co = F({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: ue,
  }),
  lo = F({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: ue,
  }),
  uo = F({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: ue,
  }),
  fo = F({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  po = F({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  ho = F({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  mo = F({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  go = F({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  er = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const r = He(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        n = (t) => ({
          borderRadius: Ue(r, t),
        });
      return me(e, e.borderRadius, n);
    }
    return null;
  };
er.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: ye,
      }
    : {};
er.filterProps = ['borderRadius'];
Qe(so, io, co, lo, uo, fo, po, ho, mo, go, er);
const rr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = He(e.theme, 'spacing', 8, 'gap'),
      n = (t) => ({
        gap: Ue(r, t),
      });
    return me(e, e.gap, n);
  }
  return null;
};
rr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: ye,
      }
    : {};
rr.filterProps = ['gap'];
const nr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = He(e.theme, 'spacing', 8, 'columnGap'),
      n = (t) => ({
        columnGap: Ue(r, t),
      });
    return me(e, e.columnGap, n);
  }
  return null;
};
nr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: ye,
      }
    : {};
nr.filterProps = ['columnGap'];
const tr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = He(e.theme, 'spacing', 8, 'rowGap'),
      n = (t) => ({
        rowGap: Ue(r, t),
      });
    return me(e, e.rowGap, n);
  }
  return null;
};
tr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: ye,
      }
    : {};
tr.filterProps = ['rowGap'];
const bo = F({
    prop: 'gridColumn',
  }),
  yo = F({
    prop: 'gridRow',
  }),
  vo = F({
    prop: 'gridAutoFlow',
  }),
  ko = F({
    prop: 'gridAutoColumns',
  }),
  xo = F({
    prop: 'gridAutoRows',
  }),
  So = F({
    prop: 'gridTemplateColumns',
  }),
  No = F({
    prop: 'gridTemplateRows',
  }),
  Eo = F({
    prop: 'gridTemplateAreas',
  }),
  wo = F({
    prop: 'gridArea',
  });
Qe(rr, nr, tr, bo, yo, vo, ko, xo, So, No, Eo, wo);
function Ae(e, r) {
  return r === 'grey' ? r : e;
}
const To = F({
    prop: 'color',
    themeKey: 'palette',
    transform: Ae,
  }),
  Co = F({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  }),
  _o = F({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  });
Qe(To, Co, _o);
function ee(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Oo = F({
    prop: 'width',
    transform: ee,
  }),
  xr = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const r = (n) => {
        var t;
        return {
          maxWidth:
            ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null
              ? void 0
              : t[n]) ||
            kr[n] ||
            ee(n),
        };
      };
      return me(e, e.maxWidth, r);
    }
    return null;
  };
xr.filterProps = ['maxWidth'];
const $o = F({
    prop: 'minWidth',
    transform: ee,
  }),
  Ro = F({
    prop: 'height',
    transform: ee,
  }),
  Ao = F({
    prop: 'maxHeight',
    transform: ee,
  }),
  Po = F({
    prop: 'minHeight',
    transform: ee,
  });
F({
  prop: 'size',
  cssProperty: 'width',
  transform: ee,
});
F({
  prop: 'size',
  cssProperty: 'height',
  transform: ee,
});
const Mo = F({
  prop: 'boxSizing',
});
Qe(Oo, xr, $o, Ro, Ao, Po, Mo);
const Io = {
    // borders
    border: {
      themeKey: 'borders',
      transform: ue,
    },
    borderTop: {
      themeKey: 'borders',
      transform: ue,
    },
    borderRight: {
      themeKey: 'borders',
      transform: ue,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: ue,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: ue,
    },
    borderColor: {
      themeKey: 'palette',
    },
    borderTopColor: {
      themeKey: 'palette',
    },
    borderRightColor: {
      themeKey: 'palette',
    },
    borderBottomColor: {
      themeKey: 'palette',
    },
    borderLeftColor: {
      themeKey: 'palette',
    },
    borderRadius: {
      themeKey: 'shape.borderRadius',
      style: er,
    },
    // palette
    color: {
      themeKey: 'palette',
      transform: Ae,
    },
    bgcolor: {
      themeKey: 'palette',
      cssProperty: 'backgroundColor',
      transform: Ae,
    },
    backgroundColor: {
      themeKey: 'palette',
      transform: Ae,
    },
    // spacing
    p: {
      style: q,
    },
    pt: {
      style: q,
    },
    pr: {
      style: q,
    },
    pb: {
      style: q,
    },
    pl: {
      style: q,
    },
    px: {
      style: q,
    },
    py: {
      style: q,
    },
    padding: {
      style: q,
    },
    paddingTop: {
      style: q,
    },
    paddingRight: {
      style: q,
    },
    paddingBottom: {
      style: q,
    },
    paddingLeft: {
      style: q,
    },
    paddingX: {
      style: q,
    },
    paddingY: {
      style: q,
    },
    paddingInline: {
      style: q,
    },
    paddingInlineStart: {
      style: q,
    },
    paddingInlineEnd: {
      style: q,
    },
    paddingBlock: {
      style: q,
    },
    paddingBlockStart: {
      style: q,
    },
    paddingBlockEnd: {
      style: q,
    },
    m: {
      style: K,
    },
    mt: {
      style: K,
    },
    mr: {
      style: K,
    },
    mb: {
      style: K,
    },
    ml: {
      style: K,
    },
    mx: {
      style: K,
    },
    my: {
      style: K,
    },
    margin: {
      style: K,
    },
    marginTop: {
      style: K,
    },
    marginRight: {
      style: K,
    },
    marginBottom: {
      style: K,
    },
    marginLeft: {
      style: K,
    },
    marginX: {
      style: K,
    },
    marginY: {
      style: K,
    },
    marginInline: {
      style: K,
    },
    marginInlineStart: {
      style: K,
    },
    marginInlineEnd: {
      style: K,
    },
    marginBlock: {
      style: K,
    },
    marginBlockStart: {
      style: K,
    },
    marginBlockEnd: {
      style: K,
    },
    // display
    displayPrint: {
      cssProperty: !1,
      transform: (e) => ({
        '@media print': {
          display: e,
        },
      }),
    },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    // flexbox
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    // grid
    gap: {
      style: rr,
    },
    rowGap: {
      style: tr,
    },
    columnGap: {
      style: nr,
    },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    // positions
    position: {},
    zIndex: {
      themeKey: 'zIndex',
    },
    top: {},
    right: {},
    bottom: {},
    left: {},
    // shadows
    boxShadow: {
      themeKey: 'shadows',
    },
    // sizing
    width: {
      transform: ee,
    },
    maxWidth: {
      style: xr,
    },
    minWidth: {
      transform: ee,
    },
    height: {
      transform: ee,
    },
    maxHeight: {
      transform: ee,
    },
    minHeight: {
      transform: ee,
    },
    boxSizing: {},
    // typography
    fontFamily: {
      themeKey: 'typography',
    },
    fontSize: {
      themeKey: 'typography',
    },
    fontStyle: {
      themeKey: 'typography',
    },
    fontWeight: {
      themeKey: 'typography',
    },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: {
      cssProperty: !1,
      themeKey: 'typography',
    },
  },
  Sr = Io;
function Bo(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []),
    n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function Do(e, r) {
  return typeof e == 'function' ? e(r) : e;
}
function jo() {
  function e(n, t, o, a) {
    const s = {
        [n]: t,
        theme: o,
      },
      i = a[n];
    if (!i)
      return {
        [n]: t,
      };
    const { cssProperty: c = n, themeKey: l, transform: f, style: p } = i;
    if (t == null) return null;
    if (l === 'typography' && t === 'inherit')
      return {
        [n]: t,
      };
    const u = Xe(o, l) || {};
    return p
      ? p(s)
      : me(s, t, (y) => {
          let h = We(u, f, y);
          return (
            y === h &&
              typeof y == 'string' &&
              (h = We(u, f, `${n}${y === 'default' ? '' : he(y)}`, y)),
            c === !1
              ? h
              : {
                  [c]: h,
                }
          );
        });
  }
  function r(n) {
    var t;
    const { sx: o, theme: a = {} } = n || {};
    if (!o) return null;
    const s = (t = a.unstable_sxConfig) != null ? t : Sr;
    function i(c) {
      let l = c;
      if (typeof c == 'function') l = c(a);
      else if (typeof c != 'object') return c;
      if (!l) return null;
      const f = Xt(a.breakpoints),
        p = Object.keys(f);
      let u = f;
      return (
        Object.keys(l).forEach((b) => {
          const y = Do(l[b], a);
          if (y != null)
            if (typeof y == 'object')
              if (s[b]) u = ze(u, e(b, y, a, s));
              else {
                const h = me(
                  {
                    theme: a,
                  },
                  y,
                  (d) => ({
                    [b]: d,
                  }),
                );
                Bo(h, y)
                  ? (u[b] = r({
                      sx: y,
                      theme: a,
                    }))
                  : (u = ze(u, h));
              }
            else u = ze(u, e(b, y, a, s));
        }),
        Yt(p, u)
      );
    }
    return Array.isArray(o) ? o.map(i) : i(o);
  }
  return r;
}
const $n = jo();
$n.filterProps = ['sx'];
const Nr = $n,
  zo = ['breakpoints', 'palette', 'spacing', 'shape'];
function Er(e = {}, ...r) {
  const { breakpoints: n = {}, palette: t = {}, spacing: o, shape: a = {} } = e,
    s = ge(e, zo),
    i = Gt(n),
    c = ao(o);
  let l = pe(
    {
      breakpoints: i,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: A(
        {
          mode: 'light',
        },
        t,
      ),
      spacing: c,
      shape: A({}, qt, a),
    },
    s,
  );
  return (
    (l = r.reduce((f, p) => pe(f, p), l)),
    (l.unstable_sxConfig = A({}, Sr, s == null ? void 0 : s.unstable_sxConfig)),
    (l.unstable_sx = function (p) {
      return Nr({
        sx: p,
        theme: this,
      });
    }),
    l
  );
}
function Vo(e) {
  return Object.keys(e).length === 0;
}
function Lo(e = null) {
  const r = Ve.useContext(Zn);
  return !r || Vo(r) ? e : r;
}
const Fo = Er();
function Ho(e = Fo) {
  return Lo(e);
}
const Uo = ['variant'];
function Qr(e) {
  return e.length === 0;
}
function Rn(e) {
  const { variant: r } = e,
    n = ge(e, Uo);
  let t = r || '';
  return (
    Object.keys(n)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (t += Qr(t) ? e[o] : he(e[o]))
          : (t += `${Qr(t) ? o : he(o)}${he(e[o].toString())}`);
      }),
    t
  );
}
const Jo = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function Go(e) {
  return Object.keys(e).length === 0;
}
function Ko(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const qo = (e, r) =>
    r.components && r.components[e] && r.components[e].styleOverrides
      ? r.components[e].styleOverrides
      : null,
  Wo = (e, r) => {
    let n = [];
    r &&
      r.components &&
      r.components[e] &&
      r.components[e].variants &&
      (n = r.components[e].variants);
    const t = {};
    return (
      n.forEach((o) => {
        const a = Rn(o.props);
        t[a] = o.style;
      }),
      t
    );
  },
  Xo = (e, r, n, t) => {
    var o;
    const { ownerState: a = {} } = e,
      s = [],
      i = n == null || (o = n.components) == null || (o = o[t]) == null ? void 0 : o.variants;
    return (
      i &&
        i.forEach((c) => {
          let l = !0;
          Object.keys(c.props).forEach((f) => {
            a[f] !== c.props[f] && e[f] !== c.props[f] && (l = !1);
          }),
            l && s.push(r[Rn(c.props)]);
        }),
      s
    );
  };
function qe(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Yo = Er(),
  Zo = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function De({ defaultTheme: e, theme: r, themeId: n }) {
  return Go(r) ? e : r[n] || r;
}
function Qo(e = {}) {
  const {
      themeId: r,
      defaultTheme: n = Yo,
      rootShouldForwardProp: t = qe,
      slotShouldForwardProp: o = qe,
    } = e,
    a = (s) =>
      Nr(
        A({}, s, {
          theme: De(
            A({}, s, {
              defaultTheme: n,
              themeId: r,
            }),
          ),
        }),
      );
  return (
    (a.__mui_systemSx = !0),
    (s, i = {}) => {
      Ht(s, (R) => R.filter((m) => !(m != null && m.__mui_systemSx)));
      const { name: c, slot: l, skipVariantsResolver: f, skipSx: p, overridesResolver: u } = i,
        b = ge(i, Jo),
        y = f !== void 0 ? f : (l && l !== 'Root') || !1,
        h = p || !1;
      let d;
      process.env.NODE_ENV !== 'production' && c && (d = `${c}-${Zo(l || 'Root')}`);
      let N = qe;
      l === 'Root' ? (N = t) : l ? (N = o) : Ko(s) && (N = void 0);
      const W = Ft(
          s,
          A(
            {
              shouldForwardProp: N,
              label: d,
            },
            b,
          ),
        ),
        H = (R, ...m) => {
          const X = m
            ? m.map((B) =>
                typeof B == 'function' && B.__emotion_real !== B
                  ? (Y) =>
                      B(
                        A({}, Y, {
                          theme: De(
                            A({}, Y, {
                              defaultTheme: n,
                              themeId: r,
                            }),
                          ),
                        }),
                      )
                  : B,
              )
            : [];
          let re = R;
          c &&
            u &&
            X.push((B) => {
              const Y = De(
                  A({}, B, {
                    defaultTheme: n,
                    themeId: r,
                  }),
                ),
                ce = qo(c, Y);
              if (ce) {
                const ae = {};
                return (
                  Object.entries(ce).forEach(([G, le]) => {
                    ae[G] =
                      typeof le == 'function'
                        ? le(
                            A({}, B, {
                              theme: Y,
                            }),
                          )
                        : le;
                  }),
                  u(B, ae)
                );
              }
              return null;
            }),
            c &&
              !y &&
              X.push((B) => {
                const Y = De(
                  A({}, B, {
                    defaultTheme: n,
                    themeId: r,
                  }),
                );
                return Xo(B, Wo(c, Y), Y, c);
              }),
            h || X.push(a);
          const ie = X.length - m.length;
          if (Array.isArray(R) && ie > 0) {
            const B = new Array(ie).fill('');
            (re = [...R, ...B]), (re.raw = [...R.raw, ...B]);
          } else
            typeof R == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              R.__emotion_real !== R &&
              (re = (B) =>
                R(
                  A({}, B, {
                    theme: De(
                      A({}, B, {
                        defaultTheme: n,
                        themeId: r,
                      }),
                    ),
                  }),
                ));
          const oe = W(re, ...X);
          if (process.env.NODE_ENV !== 'production') {
            let B;
            c && (B = `${c}${l || ''}`),
              B === void 0 && (B = `Styled(${Mt(s)})`),
              (oe.displayName = B);
          }
          return s.muiName && (oe.muiName = s.muiName), oe;
        };
      return W.withConfig && (H.withConfig = W.withConfig), H;
    }
  );
}
function ea(e) {
  const { theme: r, name: n, props: t } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps
    ? t
    : Tn(r.components[n].defaultProps, t);
}
function ra({ props: e, name: r, defaultTheme: n, themeId: t }) {
  let o = Ho(n);
  return (
    t && (o = o[t] || o),
    ea({
      theme: o,
      name: r,
      props: e,
    })
  );
}
function An(e, r = 0, n = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < r || e > n) &&
      console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`),
    Math.min(Math.max(r, e), n)
  );
}
function na(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, 'g');
  let n = e.match(r);
  return (
    n && n[0].length === 1 && (n = n.map((t) => t + t)),
    n
      ? `rgb${n.length === 4 ? 'a' : ''}(${n
          .map((t, o) =>
            o < 3 ? parseInt(t, 16) : Math.round((parseInt(t, 16) / 255) * 1e3) / 1e3,
          )
          .join(', ')})`
      : ''
  );
}
function Me(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Me(na(e));
  const r = e.indexOf('('),
    n = e.substring(0, r);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(n) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Pe(9, e),
    );
  let t = e.substring(r + 1, e.length - 1),
    o;
  if (n === 'color') {
    if (
      ((t = t.split(' ')),
      (o = t.shift()),
      t.length === 4 && t[3].charAt(0) === '/' && (t[3] = t[3].slice(1)),
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(o) === -1)
    )
      throw new Error(
        process.env.NODE_ENV !== 'production'
          ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
          : Pe(10, o),
      );
  } else t = t.split(',');
  return (
    (t = t.map((a) => parseFloat(a))),
    {
      type: n,
      values: t,
      colorSpace: o,
    }
  );
}
function wr(e) {
  const { type: r, colorSpace: n } = e;
  let { values: t } = e;
  return (
    r.indexOf('rgb') !== -1
      ? (t = t.map((o, a) => (a < 3 ? parseInt(o, 10) : o)))
      : r.indexOf('hsl') !== -1 && ((t[1] = `${t[1]}%`), (t[2] = `${t[2]}%`)),
    r.indexOf('color') !== -1 ? (t = `${n} ${t.join(' ')}`) : (t = `${t.join(', ')}`),
    `${r}(${t})`
  );
}
function ta(e) {
  e = Me(e);
  const { values: r } = e,
    n = r[0],
    t = r[1] / 100,
    o = r[2] / 100,
    a = t * Math.min(o, 1 - o),
    s = (l, f = (l + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let i = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return (
    e.type === 'hsla' && ((i += 'a'), c.push(r[3])),
    wr({
      type: i,
      values: c,
    })
  );
}
function en(e) {
  e = Me(e);
  let r = e.type === 'hsl' || e.type === 'hsla' ? Me(ta(e)).values : e.values;
  return (
    (r = r.map(
      (n) => (
        e.type !== 'color' && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3))
  );
}
function rn(e, r) {
  const n = en(e),
    t = en(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function oa(e, r) {
  if (((e = Me(e)), (r = An(r)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - r;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - r;
  return wr(e);
}
function aa(e, r) {
  if (((e = Me(e)), (r = An(r)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf('rgb') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * r;
  return wr(e);
}
function sa(e, r) {
  return A(
    {
      toolbar: {
        minHeight: 56,
        [e.up('xs')]: {
          '@media (orientation: landscape)': {
            minHeight: 48,
          },
        },
        [e.up('sm')]: {
          minHeight: 64,
        },
      },
    },
    r,
  );
}
const ia = {
    black: '#000',
    white: '#fff',
  },
  Le = ia,
  ca = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
  la = ca,
  ua = {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    A100: '#ea80fc',
    A200: '#e040fb',
    A400: '#d500f9',
    A700: '#aa00ff',
  },
  we = ua,
  da = {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    A100: '#ff8a80',
    A200: '#ff5252',
    A400: '#ff1744',
    A700: '#d50000',
  },
  Te = da,
  fa = {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    A100: '#ffd180',
    A200: '#ffab40',
    A400: '#ff9100',
    A700: '#ff6d00',
  },
  je = fa,
  pa = {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff',
  },
  Ce = pa,
  ha = {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    A100: '#80d8ff',
    A200: '#40c4ff',
    A400: '#00b0ff',
    A700: '#0091ea',
  },
  _e = ha,
  ma = {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    A100: '#b9f6ca',
    A200: '#69f0ae',
    A400: '#00e676',
    A700: '#00c853',
  },
  Oe = ma,
  ga = ['mode', 'contrastThreshold', 'tonalOffset'],
  nn = {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: 'rgba(0, 0, 0, 0.87)',
      // Secondary text.
      secondary: 'rgba(0, 0, 0, 0.6)',
      // Disabled text have even lower visual prominence.
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    // The color used to divide different elements.
    divider: 'rgba(0, 0, 0, 0.12)',
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: Le.white,
      default: Le.white,
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: 'rgba(0, 0, 0, 0.54)',
      // The color of an hovered action.
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: 'rgba(0, 0, 0, 0.26)',
      // The background color of a disabled action.
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  dr = {
    text: {
      primary: Le.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#121212',
      default: '#121212',
    },
    action: {
      active: Le.white,
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  };
function tn(e, r, n, t) {
  const o = t.light || t,
    a = t.dark || t * 1.5;
  e[r] ||
    (e.hasOwnProperty(n)
      ? (e[r] = e[n])
      : r === 'light'
      ? (e.light = aa(e.main, o))
      : r === 'dark' && (e.dark = oa(e.main, a)));
}
function ba(e = 'light') {
  return e === 'dark'
    ? {
        main: Ce[200],
        light: Ce[50],
        dark: Ce[400],
      }
    : {
        main: Ce[700],
        light: Ce[400],
        dark: Ce[800],
      };
}
function ya(e = 'light') {
  return e === 'dark'
    ? {
        main: we[200],
        light: we[50],
        dark: we[400],
      }
    : {
        main: we[500],
        light: we[300],
        dark: we[700],
      };
}
function va(e = 'light') {
  return e === 'dark'
    ? {
        main: Te[500],
        light: Te[300],
        dark: Te[700],
      }
    : {
        main: Te[700],
        light: Te[400],
        dark: Te[800],
      };
}
function ka(e = 'light') {
  return e === 'dark'
    ? {
        main: _e[400],
        light: _e[300],
        dark: _e[700],
      }
    : {
        main: _e[700],
        light: _e[500],
        dark: _e[900],
      };
}
function xa(e = 'light') {
  return e === 'dark'
    ? {
        main: Oe[400],
        light: Oe[300],
        dark: Oe[700],
      }
    : {
        main: Oe[800],
        light: Oe[500],
        dark: Oe[900],
      };
}
function Sa(e = 'light') {
  return e === 'dark'
    ? {
        main: je[400],
        light: je[300],
        dark: je[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: je[500],
        dark: je[900],
      };
}
function Na(e) {
  const { mode: r = 'light', contrastThreshold: n = 3, tonalOffset: t = 0.2 } = e,
    o = ge(e, ga),
    a = e.primary || ba(r),
    s = e.secondary || ya(r),
    i = e.error || va(r),
    c = e.info || ka(r),
    l = e.success || xa(r),
    f = e.warning || Sa(r);
  function p(h) {
    const d = rn(h, dr.text.primary) >= n ? dr.text.primary : nn.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const N = rn(h, d);
      N < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${N}:1 for ${d} on ${h}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return d;
  }
  const u = ({
      color: h,
      name: d,
      mainShade: N = 500,
      lightShade: W = 300,
      darkShade: H = 700,
    }) => {
      if (((h = A({}, h)), !h.main && h[N] && (h.main = h[N]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`
            : Pe(11, d ? ` (${d})` : '', N),
        );
      if (typeof h.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Pe(12, d ? ` (${d})` : '', JSON.stringify(h.main)),
        );
      return (
        tn(h, 'light', W, t), tn(h, 'dark', H, t), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    b = {
      dark: dr,
      light: nn,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (b[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)),
    pe(
      A(
        {
          // A collection of common colors.
          common: A({}, Le),
          // prevent mutable object.
          // The palette mode, can be light or dark.
          mode: r,
          // The colors used to represent primary interface elements for a user.
          primary: u({
            color: a,
            name: 'primary',
          }),
          // The colors used to represent secondary interface elements for a user.
          secondary: u({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          // The colors used to represent interface elements that the user should be made aware of.
          error: u({
            color: i,
            name: 'error',
          }),
          // The colors used to represent potentially dangerous actions or important messages.
          warning: u({
            color: f,
            name: 'warning',
          }),
          // The colors used to present information to the user that is neutral and not necessarily important.
          info: u({
            color: c,
            name: 'info',
          }),
          // The colors used to indicate the successful completion of an action that user triggered.
          success: u({
            color: l,
            name: 'success',
          }),
          // The grey colors.
          grey: la,
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: n,
          // Takes a background color and returns the text color that maximizes the contrast.
          getContrastText: p,
          // Generate a rich color object.
          augmentColor: u,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: t,
        },
        b[r],
      ),
      o,
    )
  );
}
const Ea = [
  'fontFamily',
  'fontSize',
  'fontWeightLight',
  'fontWeightRegular',
  'fontWeightMedium',
  'fontWeightBold',
  'htmlFontSize',
  'allVariants',
  'pxToRem',
];
function wa(e) {
  return Math.round(e * 1e5) / 1e5;
}
const on = {
    textTransform: 'uppercase',
  },
  an = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ta(e, r) {
  const n = typeof r == 'function' ? r(e) : r,
    {
      fontFamily: t = an,
      // The default font size of the Material Specification.
      fontSize: o = 14,
      // px
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: i = 500,
      fontWeightBold: c = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize: l = 16,
      // Apply the CSS properties to all the variants.
      allVariants: f,
      pxToRem: p,
    } = n,
    u = ge(n, Ea);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof l != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const b = o / 14,
    y = p || ((N) => `${(N / l) * b}rem`),
    h = (N, W, H, R, m) =>
      A(
        {
          fontFamily: t,
          fontWeight: N,
          fontSize: y(W),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: H,
        },
        t === an
          ? {
              letterSpacing: `${wa(R / W)}em`,
            }
          : {},
        m,
        f,
      ),
    d = {
      h1: h(a, 96, 1.167, -1.5),
      h2: h(a, 60, 1.2, -0.5),
      h3: h(s, 48, 1.167, 0),
      h4: h(s, 34, 1.235, 0.25),
      h5: h(s, 24, 1.334, 0),
      h6: h(i, 20, 1.6, 0.15),
      subtitle1: h(s, 16, 1.75, 0.15),
      subtitle2: h(i, 14, 1.57, 0.1),
      body1: h(s, 16, 1.5, 0.15),
      body2: h(s, 14, 1.43, 0.15),
      button: h(i, 14, 1.75, 0.4, on),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, on),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return pe(
    A(
      {
        htmlFontSize: l,
        pxToRem: y,
        fontFamily: t,
        fontSize: o,
        fontWeightLight: a,
        fontWeightRegular: s,
        fontWeightMedium: i,
        fontWeightBold: c,
      },
      d,
    ),
    u,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const Ca = 0.2,
  _a = 0.14,
  Oa = 0.12;
function J(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ca})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_a})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Oa})`,
  ].join(',');
}
const $a = [
    'none',
    J(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    J(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    J(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    J(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    J(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    J(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    J(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    J(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    J(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    J(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    J(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    J(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    J(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    J(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    J(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    J(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    J(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    J(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    J(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    J(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    J(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    J(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    J(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    J(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  Ra = $a,
  Aa = ['duration', 'easing', 'delay'],
  Pa = {
    // This is the most common easing curve.
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  Ma = {
    shortest: 150,
    shorter: 200,
    short: 250,
    // most basic recommended timing
    standard: 300,
    // this is to be used in complex animations
    complex: 375,
    // recommended when something is entering screen
    enteringScreen: 225,
    // recommended when something is leaving screen
    leavingScreen: 195,
  };
function sn(e) {
  return `${Math.round(e)}ms`;
}
function Ia(e) {
  if (!e) return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Ba(e) {
  const r = A({}, Pa, e.easing),
    n = A({}, Ma, e.duration);
  return A(
    {
      getAutoHeightDuration: Ia,
      create: (o = ['all'], a = {}) => {
        const { duration: s = n.standard, easing: i = r.easeInOut, delay: c = 0 } = a,
          l = ge(a, Aa);
        if (process.env.NODE_ENV !== 'production') {
          const f = (u) => typeof u == 'string',
            p = (u) => !isNaN(parseFloat(u));
          !f(o) &&
            !Array.isArray(o) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !p(s) &&
              !f(s) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${s}.`,
              ),
            f(i) || console.error('MUI: Argument "easing" must be a string.'),
            !p(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'),
            typeof a != 'object' &&
              console.error(
                [
                  'MUI: Secong argument of transition.create must be an object.',
                  "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`",
                ].join(`
`),
              ),
            Object.keys(l).length !== 0 &&
              console.error(`MUI: Unrecognized argument(s) [${Object.keys(l).join(',')}].`);
        }
        return (Array.isArray(o) ? o : [o])
          .map(
            (f) =>
              `${f} ${typeof s == 'string' ? s : sn(s)} ${i} ${typeof c == 'string' ? c : sn(c)}`,
          )
          .join(',');
      },
    },
    e,
    {
      easing: r,
      duration: n,
    },
  );
}
const Da = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  ja = Da,
  za = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Va(e = {}, ...r) {
  const { mixins: n = {}, palette: t = {}, transitions: o = {}, typography: a = {} } = e,
    s = ge(e, za);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Pe(18),
    );
  const i = Na(t),
    c = Er(e);
  let l = pe(c, {
    mixins: sa(c.breakpoints, n),
    palette: i,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ra.slice(),
    typography: Ta(i, a),
    transitions: Ba(o),
    zIndex: A({}, ja),
  });
  if (
    ((l = pe(l, s)), (l = r.reduce((f, p) => pe(f, p), l)), process.env.NODE_ENV !== 'production')
  ) {
    const f = [
        'active',
        'checked',
        'completed',
        'disabled',
        'error',
        'expanded',
        'focused',
        'focusVisible',
        'required',
        'selected',
      ],
      p = (u, b) => {
        let y;
        for (y in u) {
          const h = u[y];
          if (f.indexOf(y) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const d = vr('', y);
              console.error(
                [
                  `MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(u, null, 2),
                  '',
                  `Instead, you need to use the '&.${d}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${d}`]: h,
                      },
                    },
                    null,
                    2,
                  ),
                  '',
                  'https://mui.com/r/state-classes-guide',
                ].join(`
`),
              );
            }
            u[y] = {};
          }
        }
      };
    Object.keys(l.components).forEach((u) => {
      const b = l.components[u].styleOverrides;
      b && u.indexOf('Mui') === 0 && p(b, u);
    });
  }
  return (
    (l.unstable_sxConfig = A({}, Sr, s == null ? void 0 : s.unstable_sxConfig)),
    (l.unstable_sx = function (p) {
      return Nr({
        sx: p,
        theme: this,
      });
    }),
    l
  );
}
const La = Va(),
  Pn = La,
  Mn = '$$material';
function Fa({ props: e, name: r }) {
  return ra({
    props: e,
    name: r,
    defaultTheme: Pn,
    themeId: Mn,
  });
}
const Ha = (e) => qe(e) && e !== 'classes',
  Ua = Qo({
    themeId: Mn,
    defaultTheme: Pn,
    rootShouldForwardProp: Ha,
  }),
  Ja = Ua;
function Ga(e) {
  return vr('MuiSvgIcon', e);
}
Vt('MuiSvgIcon', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
]);
const Ka = [
    'children',
    'className',
    'color',
    'component',
    'fontSize',
    'htmlColor',
    'inheritViewBox',
    'titleAccess',
    'viewBox',
  ],
  qa = (e) => {
    const { color: r, fontSize: n, classes: t } = e,
      o = {
        root: ['root', r !== 'inherit' && `color${he(r)}`, `fontSize${he(n)}`],
      };
    return It(o, Ga, t);
  },
  Wa = Ja('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, r) => {
      const { ownerState: n } = e;
      return [
        r.root,
        n.color !== 'inherit' && r[`color${he(n.color)}`],
        r[`fontSize${he(n.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: r }) => {
    var n, t, o, a, s, i, c, l, f, p, u, b, y;
    return {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      // the <svg> will define the property that has `currentColor`
      // e.g. heroicons uses fill="none" and stroke="currentColor"
      fill: r.hasSvgAsChild ? void 0 : 'currentColor',
      flexShrink: 0,
      transition:
        (n = e.transitions) == null || (t = n.create) == null
          ? void 0
          : t.call(n, 'fill', {
              duration:
                (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter,
            }),
      fontSize: {
        inherit: 'inherit',
        small:
          ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) ||
          '1.25rem',
        medium:
          ((i = e.typography) == null || (c = i.pxToRem) == null ? void 0 : c.call(i, 24)) ||
          '1.5rem',
        large:
          ((l = e.typography) == null || (f = l.pxToRem) == null ? void 0 : f.call(l, 35)) ||
          '2.1875rem',
      }[r.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (p = (u = (e.vars || e).palette) == null || (u = u[r.color]) == null ? void 0 : u.main) !=
        null
          ? p
          : {
              action:
                (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
              disabled:
                (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
              inherit: void 0,
            }[r.color],
    };
  }),
  Tr = /* @__PURE__ */ Ve.forwardRef(function (r, n) {
    const t = Fa({
        props: r,
        name: 'MuiSvgIcon',
      }),
      {
        children: o,
        className: a,
        color: s = 'inherit',
        component: i = 'svg',
        fontSize: c = 'medium',
        htmlColor: l,
        inheritViewBox: f = !1,
        titleAccess: p,
        viewBox: u = '0 0 24 24',
      } = t,
      b = ge(t, Ka),
      y = /* @__PURE__ */ Ve.isValidElement(o) && o.type === 'svg',
      h = A({}, t, {
        color: s,
        component: i,
        fontSize: c,
        instanceFontSize: r.fontSize,
        inheritViewBox: f,
        viewBox: u,
        hasSvgAsChild: y,
      }),
      d = {};
    f || (d.viewBox = u);
    const N = qa(h);
    return /* @__PURE__ */ Fe(
      Wa,
      A(
        {
          as: i,
          className: Lt(N.root, a),
          focusable: 'false',
          color: l,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: n,
        },
        d,
        b,
        y && o.props,
        {
          ownerState: h,
          children: [
            y ? o.props.children : o,
            p
              ? /* @__PURE__ */ C('title', {
                  children: p,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Tr.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * Node passed into the SVG element.
     */
    children: U.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: U.object,
    /**
     * @ignore
     */
    className: U.string,
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     * @default 'inherit'
     */
    color: U.oneOfType([
      U.oneOf([
        'inherit',
        'action',
        'disabled',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ]),
      U.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: U.elementType,
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     * @default 'medium'
     */
    fontSize: U.oneOfType([U.oneOf(['inherit', 'large', 'medium', 'small']), U.string]),
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor: U.string,
    /**
     * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
     * prop will be ignored.
     * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
     * `component`'s viewBox to the root node.
     * @default false
     */
    inheritViewBox: U.bool,
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering: U.string,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: U.oneOfType([U.arrayOf(U.oneOfType([U.func, U.object, U.bool])), U.func, U.object]),
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess: U.string,
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox: U.string,
  });
Tr.muiName = 'SvgIcon';
const cn = Tr;
function Xa(e, r) {
  function n(t, o) {
    return /* @__PURE__ */ C(
      cn,
      A(
        {
          'data-testid': `${r}Icon`,
          ref: o,
        },
        t,
        {
          children: e,
        },
      ),
    );
  }
  return (
    process.env.NODE_ENV !== 'production' && (n.displayName = `${r}Icon`),
    (n.muiName = cn.muiName),
    /* @__PURE__ */ Ve.memo(/* @__PURE__ */ Ve.forwardRef(n))
  );
}
const Ya = Xa(
  /* @__PURE__ */ C('path', {
    d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  }),
  'Menu',
);
function ds(e) {
  const [r, n] = Ke(!1),
    [t, o] = Ke(!1),
    a = _r(() => {
      r && n(!1), o(!1);
    }, [r, n]),
    s = _r(
      (y) => {
        y.stopPropagation(),
          n((h) => {
            const d = !h;
            return d && y.shiftKey && o(!0), d;
          });
      },
      [n, o],
    ),
    i = or(null),
    c = or(null),
    l = or(null),
    [f, p] = Ke(0);
  Wn(() => {
    var y;
    r && i.current && p((y = i.current) == null ? void 0 : y.clientHeight);
  }, [r, i.current]);
  function u(y) {
    return a(), e.commandHandler(y);
  }
  let b = e.menu;
  return (
    !b && e.dataHandler && (b = e.dataHandler(t)),
    /* @__PURE__ */ C('div', {
      ref: i,
      style: { position: 'relative' },
      children: /* @__PURE__ */ C(Un, {
        position: 'static',
        children: /* @__PURE__ */ Fe(Jn, {
          className: `papi-toolbar ${e.className ?? ''}`,
          ref: c,
          variant: 'dense',
          children: [
            b
              ? /* @__PURE__ */ C(Gn, {
                  edge: 'start',
                  className: `papi-menuButton ${e.className ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: s,
                  children: /* @__PURE__ */ C(Ya, {}),
                })
              : null,
            e.children
              ? /* @__PURE__ */ C('div', { ref: l, style: { padding: 10 }, children: e.children })
              : null,
            b
              ? /* @__PURE__ */ C(Kn, {
                  className: `papi-menu-drawer ${e.className ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: r,
                  onClose: a,
                  PaperProps: {
                    style: {
                      top: f,
                      height: 'fit-content',
                    },
                  },
                  children: /* @__PURE__ */ C(vt, { commandHandler: u, columns: b.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
function Za(e, r = 'top') {
  if (!e || typeof document > 'u') return;
  const n = document.head || document.querySelector('head'),
    t = n.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    r === 'top' && t ? n.insertBefore(o, t) : n.appendChild(o);
}
Za(
  `.papi-button {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-switch {
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
.papi-menu-item {
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-multi-column-menu {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
}
.papi-toolbar {
  background-color: rgb(245, 245, 245);
  color: black;
}

.papi-toolbar.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-toolbar.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-menu-drawer {
  position: absolute;
  width: 100%;
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

`,
  'top',
);
export {
  Ee as Button,
  et as Checkbox,
  rt as ComboBox,
  vt as GridMenu,
  $e as LabelPosition,
  gt as MenuItem,
  ss as RefSelector,
  is as Slider,
  ls as Snackbar,
  cs as Switch,
  us as Table,
  fr as TextField,
  ds as Toolbar,
};
//# sourceMappingURL=index.es.js.map
