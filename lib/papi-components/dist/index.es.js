import { jsx as C, jsxs as Fe, Fragment as Mn } from 'react/jsx-runtime';
import {
  Button as In,
  FormLabel as Bn,
  Checkbox as Dn,
  Autocomplete as jn,
  TextField as sn,
  MenuItem as zn,
  Grid as cn,
  Slider as Vn,
  Snackbar as Ln,
  Switch as Fn,
  AppBar as Hn,
  Toolbar as Un,
  IconButton as Jn,
  Drawer as Gn,
} from '@mui/material';
import * as Ve from 'react';
import {
  useMemo as ln,
  useState as tr,
  useCallback as or,
  useRef as Kn,
  useEffect as Wn,
} from 'react';
import qn, { SelectColumn as Xn } from 'react-data-grid';
import Yn, { ThemeContext as Zn, internal_processStyles as Qn } from '@mui/styled-engine';
function Ee({ isDisabled: e = !1, className: r, onClick: n, onContextMenu: t, children: o }) {
  return /* @__PURE__ */ C(In, {
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
  className: c,
  onChange: u,
}) {
  const i = /* @__PURE__ */ C(Dn, {
    checked: e,
    indeterminate: t,
    defaultChecked: o,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${c ?? ''}`,
    onChange: u,
  });
  let f;
  if (r) {
    const h = n === $e.Before || n === $e.Above,
      l = /* @__PURE__ */ C('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${c ?? ''}`,
        children: r,
      }),
      y = n === $e.Before || n === $e.After,
      v = y ? l : /* @__PURE__ */ C('div', { children: l }),
      p = y ? i : /* @__PURE__ */ C('div', { children: i });
    f = /* @__PURE__ */ Fe(Bn, {
      className: `papi-checkbox ${n.toString()}`,
      disabled: a,
      error: s,
      children: [h && v, p, !h && v],
    });
  } else f = i;
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
  className: c,
  value: u,
  onChange: i,
  onFocus: f,
  onBlur: h,
}) {
  return /* @__PURE__ */ C(jn, {
    disablePortal: !0,
    disabled: r,
    disableClearable: !n,
    fullWidth: o,
    options: s,
    className: `papi-combo-box ${t ? 'error' : ''} ${c ?? ''}`,
    value: u,
    onChange: i,
    onFocus: f,
    onBlur: h,
    renderInput: (l) =>
      /* @__PURE__ */ C(sn, {
        ...l,
        error: t,
        fullWidth: o,
        disabled: r,
        label: e,
        style: { width: a },
      }),
  });
}
function nt(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: c = !1,
    focusVisibleClassName: u,
  } = e;
  return /* @__PURE__ */ C(zn, {
    autoFocus: t,
    className: o,
    dense: a,
    disableGutters: s,
    divider: c,
    focusVisibleClassName: u,
    onClick: r,
    children: n,
  });
}
function tt({ commandHandler: e, name: r, className: n, items: t }) {
  return /* @__PURE__ */ Fe(cn, {
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${n ?? ''}`,
    children: [
      /* @__PURE__ */ C('h3', { className: `papi-menu ${n ?? ''}`, children: r }),
      t.map((o, a) =>
        /* @__PURE__ */ C(
          nt,
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
function ot({ commandHandler: e, className: r, columns: n }) {
  return /* @__PURE__ */ C(cn, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${r ?? ''}`,
    columns: n.length,
    children: n.map((t) =>
      /* @__PURE__ */ C(tt, {
        commandHandler: e,
        name: t.name,
        className: r,
        items: t.items,
      }),
    ),
  });
}
var at = Object.defineProperty,
  st = (e, r, n) =>
    r in e ? at(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[r] = n),
  $ = (e, r, n) => (st(e, typeof r != 'symbol' ? r + '' : r, n), n);
const ke = [
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
  gr = [
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
  un = [
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
  Or = gt();
function Ie(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Or ? Or[e] : 0;
}
function br(e) {
  return Ie(e) > 0;
}
function it(e) {
  const r = typeof e == 'string' ? Ie(e) : e;
  return r >= 40 && r <= 66;
}
function ct(e) {
  return (typeof e == 'string' ? Ie(e) : e) <= 39;
}
function dn(e) {
  return e <= 66;
}
function lt(e) {
  const r = typeof e == 'string' ? Ie(e) : e;
  return hn(r) && !dn(r);
}
function* ut() {
  for (let e = 1; e <= ke.length; e++) yield e;
}
const dt = 1,
  fn = ke.length;
function ft() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function yr(e, r = '***') {
  const n = e - 1;
  return n < 0 || n >= ke.length ? r : ke[n];
}
function pn(e) {
  return e <= 0 || e > fn ? '******' : un[e - 1];
}
function pt(e) {
  return pn(Ie(e));
}
function hn(e) {
  const r = typeof e == 'number' ? yr(e) : e;
  return br(r) && !gr.includes(r);
}
function ht(e) {
  const r = typeof e == 'number' ? yr(e) : e;
  return br(r) && gr.includes(r);
}
function mt(e) {
  return un[e - 1].includes('*obsolete*');
}
function gt() {
  const e = {};
  for (let r = 0; r < ke.length; r++) e[ke[r]] = r + 1;
  return e;
}
const fe = {
  allBookIds: ke,
  nonCanonicalIds: gr,
  bookIdToNumber: Ie,
  isBookIdValid: br,
  isBookNT: it,
  isBookOT: ct,
  isBookOTNT: dn,
  isBookDC: lt,
  allBookNumbers: ut,
  firstBook: dt,
  lastBook: fn,
  extraBooks: ft,
  bookNumberToId: yr,
  bookNumberToEnglishName: pn,
  bookIdToEnglishName: pt,
  isCanonical: hn,
  isExtraMaterial: ht,
  isObsolete: mt,
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
const xe = class {
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
let te = xe;
$(te, 'Original', new xe(be.Original)),
  $(te, 'Septuagint', new xe(be.Septuagint)),
  $(te, 'Vulgate', new xe(be.Vulgate)),
  $(te, 'English', new xe(be.English)),
  $(te, 'RussianProtestant', new xe(be.RussianProtestant)),
  $(te, 'RussianOrthodox', new xe(be.RussianOrthodox));
function $r(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++) e = e.split(r[t]).join(n);
  return e.split(n);
}
var mn = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(mn || {});
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
    return fe.bookNumberToId(this.bookNum, '');
  }
  set book(r) {
    this.bookNum = fe.bookIdToNumber(r);
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
    if (r <= 0 || r > fe.lastBook)
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
      fe.bookIdToNumber(n[0]) === 0 ||
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
    for (const s of a.map((c) => $r(c, n))) {
      const c = this.clone();
      c.verse = s[0];
      const u = c.verseNum;
      if ((o.push(c), s.length > 1)) {
        const i = this.clone();
        if (((i.verse = s[1]), !r))
          for (let f = u + 1; f < i.verseNum; f++) {
            const h = new O(this._bookNum, this._chapterNum, f, this.versification);
            this.isExcluded || o.push(h);
          }
        o.push(i);
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
      : this._bookNum <= 0 || this._bookNum > fe.lastBook
      ? 2
      : 0;
  }
  setEmpty(r = O.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = r);
  }
  updateInternal(r, n, t) {
    (this.bookNum = fe.bookIdToNumber(r)), (this.chapter = n), (this.verse = t);
  }
};
let de = O;
$(de, 'defaultVersification', te.English),
  $(de, 'verseRangeSeparator', '-'),
  $(de, 'verseSequenceIndicator', ','),
  $(de, 'verseRangeSeparators', [O.verseRangeSeparator]),
  $(de, 'verseSequenceIndicators', [O.verseSequenceIndicator]),
  $(de, 'chapterDigitShifter', 1e3),
  $(de, 'bookDigitShifter', O.chapterDigitShifter * O.chapterDigitShifter),
  $(de, 'bcvMaxValue', O.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  $(de, 'ValidStatusType', mn);
class Be extends Error {}
const gn = [
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
function bt() {
  return fe.allBookIds.map((e) => ({
    bookId: e,
    label: fe.bookIdToEnglishName(e),
  }));
}
const yt = (e) => {
    let r = null;
    return () => (r === null && (r = e()), r);
  },
  ar = yt(bt),
  bn = 1,
  vt = gn.length - 1,
  yn = 1,
  vn = 1,
  xn = (e) => {
    var r;
    return ((r = gn[e]) == null ? void 0 : r.chapters) ?? -1;
  },
  Rr = (e, r) => ({
    bookNum: Math.max(bn, Math.min(e.bookNum + r, vt)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Ar = (e, r) => ({
    ...e,
    chapterNum: Math.min(Math.max(yn, e.chapterNum + r), xn(e.bookNum)),
    verseNum: 1,
  }),
  Pr = (e, r) => ({
    ...e,
    verseNum: Math.max(vn, e.verseNum + r),
  });
function pr({
  variant: e = 'outlined',
  isDisabled: r = !1,
  hasError: n = !1,
  isFullWidth: t = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: c = !1,
  className: u,
  defaultValue: i,
  value: f,
  onChange: h,
  onFocus: l,
  onBlur: y,
}) {
  return /* @__PURE__ */ C(sn, {
    variant: e,
    disabled: r,
    error: n,
    fullWidth: t,
    helperText: o,
    label: a,
    placeholder: s,
    required: c,
    className: `papi-textfield ${u ?? ''}`,
    defaultValue: i,
    value: f,
    onChange: h,
    onFocus: l,
    onBlur: y,
  });
}
function os({ scrRef: e, handleSubmit: r }) {
  const n = (s) => {
      r(s);
    },
    t = (s, c) => {
      const i = { bookNum: fe.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
      n(i);
    },
    o = (s) => {
      r({ ...e, chapterNum: +s.target.value });
    },
    a = (s) => {
      r({ ...e, verseNum: +s.target.value });
    };
  return /* @__PURE__ */ Fe(Mn, {
    children: [
      /* @__PURE__ */ C(rt, {
        title: 'Book',
        className: 'papi-ref-selector book',
        value: ln(() => ar()[e.bookNum - 1], [e.bookNum]),
        options: ar(),
        onChange: t,
        isClearable: !1,
        width: 200,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => n(Rr(e, -1)),
        isDisabled: e.bookNum <= bn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => n(Rr(e, 1)),
        isDisabled: e.bookNum >= ar().length,
        children: '>',
      }),
      /* @__PURE__ */ C(pr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: o,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Ar(e, -1)),
        isDisabled: e.chapterNum <= yn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Ar(e, 1)),
        isDisabled: e.chapterNum >= xn(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ C(pr, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: a,
      }),
      /* @__PURE__ */ C(Ee, {
        onClick: () => r(Pr(e, -1)),
        isDisabled: e.verseNum <= vn,
        children: '<',
      }),
      /* @__PURE__ */ C(Ee, { onClick: () => r(Pr(e, 1)), children: '>' }),
    ],
  });
}
function as({
  isDisabled: e = !1,
  orientation: r = 'horizontal',
  min: n = 0,
  max: t = 100,
  step: o = 1,
  showMarks: a = !1,
  defaultValue: s,
  valueLabelDisplay: c = 'off',
  className: u,
  onChange: i,
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
    valueLabelDisplay: c,
    className: `papi-slider ${r} ${u ?? ''}`,
    onChange: i,
    onChangeCommitted: f,
  });
}
function ss({
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
  return /* @__PURE__ */ C(Ln, {
    autoHideDuration: e,
    className: `papi-snackbar ${n ?? ''}`,
    open: r,
    onClose: t,
    anchorOrigin: o,
    ContentProps: a,
    children: s,
  });
}
function is({ isChecked: e, isDisabled: r = !1, hasError: n = !1, className: t, onChange: o }) {
  return /* @__PURE__ */ C(Fn, {
    checked: e,
    disabled: r,
    className: `papi-switch ${n ? 'error' : ''} ${t ?? ''}`,
    onChange: o,
  });
}
function Mr({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ C(pr, { defaultValue: r[n.key], onChange: t });
}
const xt = ({ onChange: e, disabled: r, checked: n, ...t }) => {
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
function cs({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: n,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: c = !0,
  defaultColumnResizable: u = !0,
  rows: i,
  enableSelectColumn: f,
  selectColumnWidth: h = 50,
  rowKeyGetter: l,
  rowHeight: y = 35,
  headerRowHeight: v = 35,
  selectedRows: p,
  onSelectedRowsChange: d,
  onRowsChange: N,
  onCellClick: q,
  onCellDoubleClick: H,
  onCellContextMenu: R,
  onCellKeyDown: m,
  direction: X = 'ltr',
  enableVirtualization: re = !0,
  onCopy: se,
  onPaste: oe,
  onScroll: B,
  className: Y,
}) {
  const ie = ln(() => {
    const ae = e.map((G) =>
      typeof G.editable == 'function'
        ? {
            ...G,
            editable: (Q) => !!G.editable(Q),
            renderEditCell: G.renderEditCell || Mr,
          }
        : G.editable && !G.renderEditCell
        ? { ...G, renderEditCell: Mr }
        : G.renderEditCell && !G.editable
        ? { ...G, editable: !1 }
        : G,
    );
    return f ? [{ ...Xn, minWidth: h }, ...ae] : ae;
  }, [f, e]);
  return /* @__PURE__ */ C(qn, {
    columns: ie,
    defaultColumnOptions: {
      width: o,
      minWidth: a,
      maxWidth: s,
      sortable: c,
      resizable: u,
    },
    sortColumns: r,
    onSortColumnsChange: n,
    onColumnResize: t,
    rows: i,
    rowKeyGetter: l,
    rowHeight: y,
    headerRowHeight: v,
    selectedRows: p,
    onSelectedRowsChange: d,
    onRowsChange: N,
    onCellClick: q,
    onCellDoubleClick: H,
    onCellContextMenu: R,
    onCellKeyDown: m,
    direction: X,
    enableVirtualization: re,
    onCopy: se,
    onPaste: oe,
    onScroll: B,
    renderers: { renderCheckbox: xt },
    className: `${Y ?? 'rdg-light'}`,
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
function kn(e) {
  if (!Re(e)) return e;
  const r = {};
  return (
    Object.keys(e).forEach((n) => {
      r[n] = kn(e[n]);
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
            ? (t[o] = Re(r[o]) ? kn(r[o]) : r[o])
            : (t[o] = r[o]));
      }),
    t
  );
}
function kt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var hr = { exports: {} },
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
var Ir;
function St() {
  if (Ir) return j;
  Ir = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    r = e ? Symbol.for('react.element') : 60103,
    n = e ? Symbol.for('react.portal') : 60106,
    t = e ? Symbol.for('react.fragment') : 60107,
    o = e ? Symbol.for('react.strict_mode') : 60108,
    a = e ? Symbol.for('react.profiler') : 60114,
    s = e ? Symbol.for('react.provider') : 60109,
    c = e ? Symbol.for('react.context') : 60110,
    u = e ? Symbol.for('react.async_mode') : 60111,
    i = e ? Symbol.for('react.concurrent_mode') : 60111,
    f = e ? Symbol.for('react.forward_ref') : 60112,
    h = e ? Symbol.for('react.suspense') : 60113,
    l = e ? Symbol.for('react.suspense_list') : 60120,
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    p = e ? Symbol.for('react.block') : 60121,
    d = e ? Symbol.for('react.fundamental') : 60117,
    N = e ? Symbol.for('react.responder') : 60118,
    q = e ? Symbol.for('react.scope') : 60119;
  function H(m) {
    if (typeof m == 'object' && m !== null) {
      var X = m.$$typeof;
      switch (X) {
        case r:
          switch (((m = m.type), m)) {
            case u:
            case i:
            case t:
            case a:
            case o:
            case h:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case c:
                case f:
                case v:
                case y:
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
    return H(m) === i;
  }
  return (
    (j.AsyncMode = u),
    (j.ConcurrentMode = i),
    (j.ContextConsumer = c),
    (j.ContextProvider = s),
    (j.Element = r),
    (j.ForwardRef = f),
    (j.Fragment = t),
    (j.Lazy = v),
    (j.Memo = y),
    (j.Portal = n),
    (j.Profiler = a),
    (j.StrictMode = o),
    (j.Suspense = h),
    (j.isAsyncMode = function (m) {
      return R(m) || H(m) === u;
    }),
    (j.isConcurrentMode = R),
    (j.isContextConsumer = function (m) {
      return H(m) === c;
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
      return H(m) === v;
    }),
    (j.isMemo = function (m) {
      return H(m) === y;
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
      return H(m) === h;
    }),
    (j.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === t ||
        m === i ||
        m === a ||
        m === o ||
        m === h ||
        m === l ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === v ||
            m.$$typeof === y ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === f ||
            m.$$typeof === d ||
            m.$$typeof === N ||
            m.$$typeof === q ||
            m.$$typeof === p))
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
var Br;
function Nt() {
  return (
    Br ||
      ((Br = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            r = e ? Symbol.for('react.element') : 60103,
            n = e ? Symbol.for('react.portal') : 60106,
            t = e ? Symbol.for('react.fragment') : 60107,
            o = e ? Symbol.for('react.strict_mode') : 60108,
            a = e ? Symbol.for('react.profiler') : 60114,
            s = e ? Symbol.for('react.provider') : 60109,
            c = e ? Symbol.for('react.context') : 60110,
            u = e ? Symbol.for('react.async_mode') : 60111,
            i = e ? Symbol.for('react.concurrent_mode') : 60111,
            f = e ? Symbol.for('react.forward_ref') : 60112,
            h = e ? Symbol.for('react.suspense') : 60113,
            l = e ? Symbol.for('react.suspense_list') : 60120,
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            p = e ? Symbol.for('react.block') : 60121,
            d = e ? Symbol.for('react.fundamental') : 60117,
            N = e ? Symbol.for('react.responder') : 60118,
            q = e ? Symbol.for('react.scope') : 60119;
          function H(b) {
            return (
              typeof b == 'string' ||
              typeof b == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              b === t ||
              b === i ||
              b === a ||
              b === o ||
              b === h ||
              b === l ||
              (typeof b == 'object' &&
                b !== null &&
                (b.$$typeof === v ||
                  b.$$typeof === y ||
                  b.$$typeof === s ||
                  b.$$typeof === c ||
                  b.$$typeof === f ||
                  b.$$typeof === d ||
                  b.$$typeof === N ||
                  b.$$typeof === q ||
                  b.$$typeof === p))
            );
          }
          function R(b) {
            if (typeof b == 'object' && b !== null) {
              var ne = b.$$typeof;
              switch (ne) {
                case r:
                  var k = b.type;
                  switch (k) {
                    case u:
                    case i:
                    case t:
                    case a:
                    case o:
                    case h:
                      return k;
                    default:
                      var Ne = k && k.$$typeof;
                      switch (Ne) {
                        case c:
                        case f:
                        case v:
                        case y:
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
          var m = u,
            X = i,
            re = c,
            se = s,
            oe = r,
            B = f,
            Y = t,
            ie = v,
            ae = y,
            G = n,
            ce = a,
            Q = o,
            ue = h,
            ve = !1;
          function Se(b) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              g(b) || R(b) === u
            );
          }
          function g(b) {
            return R(b) === i;
          }
          function x(b) {
            return R(b) === c;
          }
          function _(b) {
            return R(b) === s;
          }
          function w(b) {
            return typeof b == 'object' && b !== null && b.$$typeof === r;
          }
          function S(b) {
            return R(b) === f;
          }
          function P(b) {
            return R(b) === t;
          }
          function E(b) {
            return R(b) === v;
          }
          function T(b) {
            return R(b) === y;
          }
          function M(b) {
            return R(b) === n;
          }
          function D(b) {
            return R(b) === a;
          }
          function I(b) {
            return R(b) === o;
          }
          function Z(b) {
            return R(b) === h;
          }
          (z.AsyncMode = m),
            (z.ConcurrentMode = X),
            (z.ContextConsumer = re),
            (z.ContextProvider = se),
            (z.Element = oe),
            (z.ForwardRef = B),
            (z.Fragment = Y),
            (z.Lazy = ie),
            (z.Memo = ae),
            (z.Portal = G),
            (z.Profiler = ce),
            (z.StrictMode = Q),
            (z.Suspense = ue),
            (z.isAsyncMode = Se),
            (z.isConcurrentMode = g),
            (z.isContextConsumer = x),
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
var Dr;
function Sn() {
  return (
    Dr ||
      ((Dr = 1), process.env.NODE_ENV === 'production' ? (Ge.exports = St()) : (Ge.exports = Nt())),
    Ge.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var sr, jr;
function Et() {
  if (jr) return sr;
  jr = 1;
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
      for (var s = {}, c = 0; c < 10; c++) s['_' + String.fromCharCode(c)] = c;
      var u = Object.getOwnPropertyNames(s).map(function (f) {
        return s[f];
      });
      if (u.join('') !== '0123456789') return !1;
      var i = {};
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (f) {
          i[f] = f;
        }),
        Object.keys(Object.assign({}, i)).join('') === 'abcdefghijklmnopqrst'
      );
    } catch {
      return !1;
    }
  }
  return (
    (sr = o()
      ? Object.assign
      : function (a, s) {
          for (var c, u = t(a), i, f = 1; f < arguments.length; f++) {
            c = Object(arguments[f]);
            for (var h in c) r.call(c, h) && (u[h] = c[h]);
            if (e) {
              i = e(c);
              for (var l = 0; l < i.length; l++) n.call(c, i[l]) && (u[i[l]] = c[i[l]]);
            }
          }
          return u;
        }),
    sr
  );
}
var ir, zr;
function vr() {
  if (zr) return ir;
  zr = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (ir = e), ir;
}
var cr, Vr;
function Nn() {
  return Vr || ((Vr = 1), (cr = Function.call.bind(Object.prototype.hasOwnProperty))), cr;
}
var lr, Lr;
function wt() {
  if (Lr) return lr;
  Lr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var r = vr(),
      n = {},
      t = Nn();
    e = function (a) {
      var s = 'Warning: ' + a;
      typeof console < 'u' && console.error(s);
      try {
        throw new Error(s);
      } catch {}
    };
  }
  function o(a, s, c, u, i) {
    if (process.env.NODE_ENV !== 'production') {
      for (var f in a)
        if (t(a, f)) {
          var h;
          try {
            if (typeof a[f] != 'function') {
              var l = Error(
                (u || 'React class') +
                  ': ' +
                  c +
                  ' type `' +
                  f +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof a[f] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((l.name = 'Invariant Violation'), l);
            }
            h = a[f](s, f, u, c, null, r);
          } catch (v) {
            h = v;
          }
          if (
            (h &&
              !(h instanceof Error) &&
              e(
                (u || 'React class') +
                  ': type specification of ' +
                  c +
                  ' `' +
                  f +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof h +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            h instanceof Error && !(h.message in n))
          ) {
            n[h.message] = !0;
            var y = i ? i() : '';
            e('Failed ' + c + ' type: ' + h.message + (y ?? ''));
          }
        }
    }
  }
  return (
    (o.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (n = {});
    }),
    (lr = o),
    lr
  );
}
var ur, Fr;
function Tt() {
  if (Fr) return ur;
  Fr = 1;
  var e = Sn(),
    r = Et(),
    n = vr(),
    t = Nn(),
    o = wt(),
    a = function () {};
  process.env.NODE_ENV !== 'production' &&
    (a = function (c) {
      var u = 'Warning: ' + c;
      typeof console < 'u' && console.error(u);
      try {
        throw new Error(u);
      } catch {}
    });
  function s() {
    return null;
  }
  return (
    (ur = function (c, u) {
      var i = typeof Symbol == 'function' && Symbol.iterator,
        f = '@@iterator';
      function h(g) {
        var x = g && ((i && g[i]) || g[f]);
        if (typeof x == 'function') return x;
      }
      var l = '<<anonymous>>',
        y = {
          array: N('array'),
          bigint: N('bigint'),
          bool: N('boolean'),
          func: N('function'),
          number: N('number'),
          object: N('object'),
          string: N('string'),
          symbol: N('symbol'),
          any: q(),
          arrayOf: H,
          element: R(),
          elementType: m(),
          instanceOf: X,
          node: B(),
          objectOf: se,
          oneOf: re,
          oneOfType: oe,
          shape: ie,
          exact: ae,
        };
      function v(g, x) {
        return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
      }
      function p(g, x) {
        (this.message = g), (this.data = x && typeof x == 'object' ? x : {}), (this.stack = '');
      }
      p.prototype = Error.prototype;
      function d(g) {
        if (process.env.NODE_ENV !== 'production')
          var x = {},
            _ = 0;
        function w(P, E, T, M, D, I, Z) {
          if (((M = M || l), (I = I || T), Z !== n)) {
            if (u) {
              var b = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((b.name = 'Invariant Violation'), b);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var ne = M + ':' + T;
              !x[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
                _ < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    I +
                    '` prop on `' +
                    M +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (x[ne] = !0),
                _++);
            }
          }
          return E[T] == null
            ? P
              ? E[T] === null
                ? new p(
                    'The ' +
                      D +
                      ' `' +
                      I +
                      '` is marked as required ' +
                      ('in `' + M + '`, but its value is `null`.'),
                  )
                : new p(
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
        function x(_, w, S, P, E, T) {
          var M = _[w],
            D = Q(M);
          if (D !== g) {
            var I = ue(M);
            return new p(
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
        return d(x);
      }
      function q() {
        return d(s);
      }
      function H(g) {
        function x(_, w, S, P, E) {
          if (typeof g != 'function')
            return new p(
              'Property `' +
                E +
                '` of component `' +
                S +
                '` has invalid PropType notation inside arrayOf.',
            );
          var T = _[w];
          if (!Array.isArray(T)) {
            var M = Q(T);
            return new p(
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
        return d(x);
      }
      function R() {
        function g(x, _, w, S, P) {
          var E = x[_];
          if (!c(E)) {
            var T = Q(E);
            return new p(
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
        function g(x, _, w, S, P) {
          var E = x[_];
          if (!e.isValidElementType(E)) {
            var T = Q(E);
            return new p(
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
        function x(_, w, S, P, E) {
          if (!(_[w] instanceof g)) {
            var T = g.name || l,
              M = Se(_[w]);
            return new p(
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
        return d(x);
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
        function x(_, w, S, P, E) {
          for (var T = _[w], M = 0; M < g.length; M++) if (v(T, g[M])) return null;
          var D = JSON.stringify(g, function (Z, b) {
            var ne = ue(b);
            return ne === 'symbol' ? String(b) : b;
          });
          return new p(
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
        return d(x);
      }
      function se(g) {
        function x(_, w, S, P, E) {
          if (typeof g != 'function')
            return new p(
              'Property `' +
                E +
                '` of component `' +
                S +
                '` has invalid PropType notation inside objectOf.',
            );
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new p(
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
        return d(x);
      }
      function oe(g) {
        if (!Array.isArray(g))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var x = 0; x < g.length; x++) {
          var _ = g[x];
          if (typeof _ != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ve(_) +
                  ' at index ' +
                  x +
                  '.',
              ),
              s
            );
        }
        function w(S, P, E, T, M) {
          for (var D = [], I = 0; I < g.length; I++) {
            var Z = g[I],
              b = Z(S, P, E, T, M, n);
            if (b == null) return null;
            b.data && t(b.data, 'expectedType') && D.push(b.data.expectedType);
          }
          var ne = D.length > 0 ? ', expected one of type [' + D.join(', ') + ']' : '';
          return new p('Invalid ' + T + ' `' + M + '` supplied to ' + ('`' + E + '`' + ne + '.'));
        }
        return d(w);
      }
      function B() {
        function g(x, _, w, S, P) {
          return G(x[_])
            ? null
            : new p(
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
      function Y(g, x, _, w, S) {
        return new p(
          (g || 'React class') +
            ': ' +
            x +
            ' type `' +
            _ +
            '.' +
            w +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            S +
            '`.',
        );
      }
      function ie(g) {
        function x(_, w, S, P, E) {
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new p(
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
            if (typeof I != 'function') return Y(S, P, E, D, ue(I));
            var Z = I(T, D, S, P, E + '.' + D, n);
            if (Z) return Z;
          }
          return null;
        }
        return d(x);
      }
      function ae(g) {
        function x(_, w, S, P, E) {
          var T = _[w],
            M = Q(T);
          if (M !== 'object')
            return new p(
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
            if (t(g, I) && typeof Z != 'function') return Y(S, P, E, I, ue(Z));
            if (!Z)
              return new p(
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
            var b = Z(T, I, S, P, E + '.' + I, n);
            if (b) return b;
          }
          return null;
        }
        return d(x);
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
            if (g === null || c(g)) return !0;
            var x = h(g);
            if (x) {
              var _ = x.call(g),
                w;
              if (x !== g.entries) {
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
      function ce(g, x) {
        return g === 'symbol'
          ? !0
          : x
          ? x['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && x instanceof Symbol)
          : !1;
      }
      function Q(g) {
        var x = typeof g;
        return Array.isArray(g)
          ? 'array'
          : g instanceof RegExp
          ? 'object'
          : ce(x, g)
          ? 'symbol'
          : x;
      }
      function ue(g) {
        if (typeof g > 'u' || g === null) return '' + g;
        var x = Q(g);
        if (x === 'object') {
          if (g instanceof Date) return 'date';
          if (g instanceof RegExp) return 'regexp';
        }
        return x;
      }
      function ve(g) {
        var x = ue(g);
        switch (x) {
          case 'array':
          case 'object':
            return 'an ' + x;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + x;
          default:
            return x;
        }
      }
      function Se(g) {
        return !g.constructor || !g.constructor.name ? l : g.constructor.name;
      }
      return (
        (y.checkPropTypes = o), (y.resetWarningCache = o.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    ur
  );
}
var dr, Hr;
function Ct() {
  if (Hr) return dr;
  Hr = 1;
  var e = vr();
  function r() {}
  function n() {}
  return (
    (n.resetWarningCache = r),
    (dr = function () {
      function t(s, c, u, i, f, h) {
        if (h !== e) {
          var l = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((l.name = 'Invariant Violation'), l);
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
    dr
  );
}
if (process.env.NODE_ENV !== 'production') {
  var _t = Sn(),
    Ot = !0;
  hr.exports = Tt()(_t.isElement, Ot);
} else hr.exports = Ct()();
var $t = hr.exports;
const U = /* @__PURE__ */ kt($t);
function Pe(e) {
  let r = 'https://mui.com/production-error/?code=' + e;
  for (let n = 1; n < arguments.length; n += 1) r += '&args[]=' + encodeURIComponent(arguments[n]);
  return 'Minified MUI error #' + e + '; visit ' + r + ' for the full message.';
}
var mr = { exports: {} },
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
var Ur;
function Rt() {
  if (Ur) return V;
  Ur = 1;
  var e = Symbol.for('react.element'),
    r = Symbol.for('react.portal'),
    n = Symbol.for('react.fragment'),
    t = Symbol.for('react.strict_mode'),
    o = Symbol.for('react.profiler'),
    a = Symbol.for('react.provider'),
    s = Symbol.for('react.context'),
    c = Symbol.for('react.server_context'),
    u = Symbol.for('react.forward_ref'),
    i = Symbol.for('react.suspense'),
    f = Symbol.for('react.suspense_list'),
    h = Symbol.for('react.memo'),
    l = Symbol.for('react.lazy'),
    y = Symbol.for('react.offscreen'),
    v;
  v = Symbol.for('react.module.reference');
  function p(d) {
    if (typeof d == 'object' && d !== null) {
      var N = d.$$typeof;
      switch (N) {
        case e:
          switch (((d = d.type), d)) {
            case n:
            case o:
            case t:
            case i:
            case f:
              return d;
            default:
              switch (((d = d && d.$$typeof), d)) {
                case c:
                case s:
                case u:
                case l:
                case h:
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
    (V.ForwardRef = u),
    (V.Fragment = n),
    (V.Lazy = l),
    (V.Memo = h),
    (V.Portal = r),
    (V.Profiler = o),
    (V.StrictMode = t),
    (V.Suspense = i),
    (V.SuspenseList = f),
    (V.isAsyncMode = function () {
      return !1;
    }),
    (V.isConcurrentMode = function () {
      return !1;
    }),
    (V.isContextConsumer = function (d) {
      return p(d) === s;
    }),
    (V.isContextProvider = function (d) {
      return p(d) === a;
    }),
    (V.isElement = function (d) {
      return typeof d == 'object' && d !== null && d.$$typeof === e;
    }),
    (V.isForwardRef = function (d) {
      return p(d) === u;
    }),
    (V.isFragment = function (d) {
      return p(d) === n;
    }),
    (V.isLazy = function (d) {
      return p(d) === l;
    }),
    (V.isMemo = function (d) {
      return p(d) === h;
    }),
    (V.isPortal = function (d) {
      return p(d) === r;
    }),
    (V.isProfiler = function (d) {
      return p(d) === o;
    }),
    (V.isStrictMode = function (d) {
      return p(d) === t;
    }),
    (V.isSuspense = function (d) {
      return p(d) === i;
    }),
    (V.isSuspenseList = function (d) {
      return p(d) === f;
    }),
    (V.isValidElementType = function (d) {
      return (
        typeof d == 'string' ||
        typeof d == 'function' ||
        d === n ||
        d === o ||
        d === t ||
        d === i ||
        d === f ||
        d === y ||
        (typeof d == 'object' &&
          d !== null &&
          (d.$$typeof === l ||
            d.$$typeof === h ||
            d.$$typeof === a ||
            d.$$typeof === s ||
            d.$$typeof === u ||
            d.$$typeof === v ||
            d.getModuleId !== void 0))
      );
    }),
    (V.typeOf = p),
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
var Jr;
function At() {
  return (
    Jr ||
      ((Jr = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            r = Symbol.for('react.portal'),
            n = Symbol.for('react.fragment'),
            t = Symbol.for('react.strict_mode'),
            o = Symbol.for('react.profiler'),
            a = Symbol.for('react.provider'),
            s = Symbol.for('react.context'),
            c = Symbol.for('react.server_context'),
            u = Symbol.for('react.forward_ref'),
            i = Symbol.for('react.suspense'),
            f = Symbol.for('react.suspense_list'),
            h = Symbol.for('react.memo'),
            l = Symbol.for('react.lazy'),
            y = Symbol.for('react.offscreen'),
            v = !1,
            p = !1,
            d = !1,
            N = !1,
            q = !1,
            H;
          H = Symbol.for('react.module.reference');
          function R(k) {
            return !!(
              typeof k == 'string' ||
              typeof k == 'function' ||
              k === n ||
              k === o ||
              q ||
              k === t ||
              k === i ||
              k === f ||
              N ||
              k === y ||
              v ||
              p ||
              d ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === l ||
                  k.$$typeof === h ||
                  k.$$typeof === a ||
                  k.$$typeof === s ||
                  k.$$typeof === u || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  k.$$typeof === H ||
                  k.getModuleId !== void 0))
            );
          }
          function m(k) {
            if (typeof k == 'object' && k !== null) {
              var Ne = k.$$typeof;
              switch (Ne) {
                case e:
                  var Je = k.type;
                  switch (Je) {
                    case n:
                    case o:
                    case t:
                    case i:
                    case f:
                      return Je;
                    default:
                      var _r = Je && Je.$$typeof;
                      switch (_r) {
                        case c:
                        case s:
                        case u:
                        case l:
                        case h:
                        case a:
                          return _r;
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
            se = e,
            oe = u,
            B = n,
            Y = l,
            ie = h,
            ae = r,
            G = o,
            ce = t,
            Q = i,
            ue = f,
            ve = !1,
            Se = !1;
          function g(k) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function x(k) {
            return (
              Se ||
                ((Se = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function _(k) {
            return m(k) === s;
          }
          function w(k) {
            return m(k) === a;
          }
          function S(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === e;
          }
          function P(k) {
            return m(k) === u;
          }
          function E(k) {
            return m(k) === n;
          }
          function T(k) {
            return m(k) === l;
          }
          function M(k) {
            return m(k) === h;
          }
          function D(k) {
            return m(k) === r;
          }
          function I(k) {
            return m(k) === o;
          }
          function Z(k) {
            return m(k) === t;
          }
          function b(k) {
            return m(k) === i;
          }
          function ne(k) {
            return m(k) === f;
          }
          (L.ContextConsumer = X),
            (L.ContextProvider = re),
            (L.Element = se),
            (L.ForwardRef = oe),
            (L.Fragment = B),
            (L.Lazy = Y),
            (L.Memo = ie),
            (L.Portal = ae),
            (L.Profiler = G),
            (L.StrictMode = ce),
            (L.Suspense = Q),
            (L.SuspenseList = ue),
            (L.isAsyncMode = g),
            (L.isConcurrentMode = x),
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
            (L.isSuspense = b),
            (L.isSuspenseList = ne),
            (L.isValidElementType = R),
            (L.typeOf = m);
        })()),
    L
  );
}
process.env.NODE_ENV === 'production' ? (mr.exports = Rt()) : (mr.exports = At());
var Gr = mr.exports;
const Pt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Mt(e) {
  const r = `${e}`.match(Pt);
  return (r && r[1]) || '';
}
function En(e, r = '') {
  return e.displayName || e.name || Mt(e) || r;
}
function Kr(e, r, n) {
  const t = En(r);
  return e.displayName || (t !== '' ? `${n}(${t})` : n);
}
function It(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return En(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Gr.ForwardRef:
          return Kr(e, e.render, 'ForwardRef');
        case Gr.Memo:
          return Kr(e, e.type, 'memo');
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
function wn(e, r) {
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
                n[t][s] = wn(o[s], a[s]);
              }));
      } else n[t] === void 0 && (n[t] = e[t]);
    }),
    n
  );
}
function Bt(e, r, n = void 0) {
  const t = {};
  return (
    Object.keys(e).forEach(
      // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
      // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
      (o) => {
        t[o] = e[o]
          .reduce((a, s) => {
            if (s) {
              const c = r(s);
              c !== '' && a.push(c), n && n[s] && a.push(n[s]);
            }
            return a;
          }, [])
          .join(' ');
      },
    ),
    t
  );
}
const Wr = (e) => e,
  Dt = () => {
    let e = Wr;
    return {
      configure(r) {
        e = r;
      },
      generate(r) {
        return e(r);
      },
      reset() {
        e = Wr;
      },
    };
  },
  jt = Dt(),
  zt = jt,
  Vt = {
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
function xr(e, r, n = 'Mui') {
  const t = Vt[r];
  return t ? `${n}-${t}` : `${zt.generate(e)}-${r}`;
}
function Lt(e, r, n = 'Mui') {
  const t = {};
  return (
    r.forEach((o) => {
      t[o] = xr(e, o, n);
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
function Tn(e) {
  var r,
    n,
    t = '';
  if (typeof e == 'string' || typeof e == 'number') t += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++) e[r] && (n = Tn(e[r])) && (t && (t += ' '), (t += n));
    else for (r in e) e[r] && (t && (t += ' '), (t += r));
  return t;
}
function Ft() {
  for (var e, r, n = 0, t = ''; n < arguments.length; )
    (e = arguments[n++]) && (r = Tn(e)) && (t && (t += ' '), (t += r));
  return t;
}
const Ht = ['values', 'unit', 'step'],
  Ut = (e) => {
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
function Jt(e) {
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
    o = ge(e, Ht),
    a = Ut(r),
    s = Object.keys(a);
  function c(l) {
    return `@media (min-width:${typeof r[l] == 'number' ? r[l] : l}${n})`;
  }
  function u(l) {
    return `@media (max-width:${(typeof r[l] == 'number' ? r[l] : l) - t / 100}${n})`;
  }
  function i(l, y) {
    const v = s.indexOf(y);
    return `@media (min-width:${typeof r[l] == 'number' ? r[l] : l}${n}) and (max-width:${
      (v !== -1 && typeof r[s[v]] == 'number' ? r[s[v]] : y) - t / 100
    }${n})`;
  }
  function f(l) {
    return s.indexOf(l) + 1 < s.length ? i(l, s[s.indexOf(l) + 1]) : c(l);
  }
  function h(l) {
    const y = s.indexOf(l);
    return y === 0
      ? c(s[1])
      : y === s.length - 1
      ? u(s[y])
      : i(l, s[s.indexOf(l) + 1]).replace('@media', '@media not all and');
  }
  return A(
    {
      keys: s,
      values: a,
      up: c,
      down: u,
      between: i,
      only: f,
      not: h,
      unit: n,
    },
    o,
  );
}
const Gt = {
    borderRadius: 4,
  },
  Kt = Gt,
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
  qr = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${kr[e]}px)`,
  };
function me(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || qr;
    return r.reduce((s, c, u) => ((s[a.up(a.keys[u])] = n(r[u])), s), {});
  }
  if (typeof r == 'object') {
    const a = t.breakpoints || qr;
    return Object.keys(r).reduce((s, c) => {
      if (Object.keys(a.values || kr).indexOf(c) !== -1) {
        const u = a.up(c);
        s[u] = n(r[c], c);
      } else {
        const u = c;
        s[u] = r[u];
      }
      return s;
    }, {});
  }
  return n(r);
}
function qt(e = {}) {
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
function Xt(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function qe(e, r, n = !0) {
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
    typeof e == 'function' ? (o = e(n)) : Array.isArray(e) ? (o = e[n] || t) : (o = qe(e, n) || t),
    r && (o = r(o, t, e)),
    o
  );
}
function F(e) {
  const { prop: r, cssProperty: n = e.prop, themeKey: t, transform: o } = e,
    a = (s) => {
      if (s[r] == null) return null;
      const c = s[r],
        u = s.theme,
        i = qe(u, t) || {};
      return me(s, c, (h) => {
        let l = We(i, o, h);
        return (
          h === l &&
            typeof h == 'string' &&
            (l = We(i, o, `${r}${h === 'default' ? '' : he(h)}`, h)),
          n === !1
            ? l
            : {
                [n]: l,
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
function Yt(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const Zt = {
    m: 'margin',
    p: 'padding',
  },
  Qt = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  Xr = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  eo = Yt((e) => {
    if (e.length > 2)
      if (Xr[e]) e = Xr[e];
      else return [e];
    const [r, n] = e.split(''),
      t = Zt[r],
      o = Qt[n] || '';
    return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
  }),
  Xe = [
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
  Ye = [
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
  ro = [...Xe, ...Ye];
function He(e, r, n, t) {
  var o;
  const a = (o = qe(e, r, !1)) != null ? o : n;
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
function Cn(e) {
  return He(e, 'spacing', 8, 'spacing');
}
function Ue(e, r) {
  if (typeof r == 'string' || r == null) return r;
  const n = Math.abs(r),
    t = e(n);
  return r >= 0 ? t : typeof t == 'number' ? -t : `-${t}`;
}
function no(e, r) {
  return (n) => e.reduce((t, o) => ((t[o] = Ue(r, n)), t), {});
}
function to(e, r, n, t) {
  if (r.indexOf(n) === -1) return null;
  const o = eo(n),
    a = no(o, t),
    s = e[n];
  return me(e, s, a);
}
function _n(e, r) {
  const n = Cn(e.theme);
  return Object.keys(e)
    .map((t) => to(e, r, t, n))
    .reduce(ze, {});
}
function K(e) {
  return _n(e, Xe);
}
K.propTypes =
  process.env.NODE_ENV !== 'production' ? Xe.reduce((e, r) => ((e[r] = ye), e), {}) : {};
K.filterProps = Xe;
function W(e) {
  return _n(e, Ye);
}
W.propTypes =
  process.env.NODE_ENV !== 'production' ? Ye.reduce((e, r) => ((e[r] = ye), e), {}) : {};
W.filterProps = Ye;
process.env.NODE_ENV !== 'production' && ro.reduce((e, r) => ((e[r] = ye), e), {});
function oo(e = 8) {
  if (e.mui) return e;
  const r = Cn({
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
function Ze(...e) {
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
function le(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const ao = F({
    prop: 'border',
    themeKey: 'borders',
    transform: le,
  }),
  so = F({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: le,
  }),
  io = F({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: le,
  }),
  co = F({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: le,
  }),
  lo = F({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: le,
  }),
  uo = F({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  fo = F({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  po = F({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  ho = F({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  mo = F({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  Qe = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const r = He(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        n = (t) => ({
          borderRadius: Ue(r, t),
        });
      return me(e, e.borderRadius, n);
    }
    return null;
  };
Qe.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: ye,
      }
    : {};
Qe.filterProps = ['borderRadius'];
Ze(ao, so, io, co, lo, uo, fo, po, ho, mo, Qe);
const er = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = He(e.theme, 'spacing', 8, 'gap'),
      n = (t) => ({
        gap: Ue(r, t),
      });
    return me(e, e.gap, n);
  }
  return null;
};
er.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: ye,
      }
    : {};
er.filterProps = ['gap'];
const rr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = He(e.theme, 'spacing', 8, 'columnGap'),
      n = (t) => ({
        columnGap: Ue(r, t),
      });
    return me(e, e.columnGap, n);
  }
  return null;
};
rr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: ye,
      }
    : {};
rr.filterProps = ['columnGap'];
const nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = He(e.theme, 'spacing', 8, 'rowGap'),
      n = (t) => ({
        rowGap: Ue(r, t),
      });
    return me(e, e.rowGap, n);
  }
  return null;
};
nr.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: ye,
      }
    : {};
nr.filterProps = ['rowGap'];
const go = F({
    prop: 'gridColumn',
  }),
  bo = F({
    prop: 'gridRow',
  }),
  yo = F({
    prop: 'gridAutoFlow',
  }),
  vo = F({
    prop: 'gridAutoColumns',
  }),
  xo = F({
    prop: 'gridAutoRows',
  }),
  ko = F({
    prop: 'gridTemplateColumns',
  }),
  So = F({
    prop: 'gridTemplateRows',
  }),
  No = F({
    prop: 'gridTemplateAreas',
  }),
  Eo = F({
    prop: 'gridArea',
  });
Ze(er, rr, nr, go, bo, yo, vo, xo, ko, So, No, Eo);
function Ae(e, r) {
  return r === 'grey' ? r : e;
}
const wo = F({
    prop: 'color',
    themeKey: 'palette',
    transform: Ae,
  }),
  To = F({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  }),
  Co = F({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  });
Ze(wo, To, Co);
function ee(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const _o = F({
    prop: 'width',
    transform: ee,
  }),
  Sr = (e) => {
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
Sr.filterProps = ['maxWidth'];
const Oo = F({
    prop: 'minWidth',
    transform: ee,
  }),
  $o = F({
    prop: 'height',
    transform: ee,
  }),
  Ro = F({
    prop: 'maxHeight',
    transform: ee,
  }),
  Ao = F({
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
const Po = F({
  prop: 'boxSizing',
});
Ze(_o, Sr, Oo, $o, Ro, Ao, Po);
const Mo = {
    // borders
    border: {
      themeKey: 'borders',
      transform: le,
    },
    borderTop: {
      themeKey: 'borders',
      transform: le,
    },
    borderRight: {
      themeKey: 'borders',
      transform: le,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: le,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: le,
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
      style: Qe,
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
      style: W,
    },
    pt: {
      style: W,
    },
    pr: {
      style: W,
    },
    pb: {
      style: W,
    },
    pl: {
      style: W,
    },
    px: {
      style: W,
    },
    py: {
      style: W,
    },
    padding: {
      style: W,
    },
    paddingTop: {
      style: W,
    },
    paddingRight: {
      style: W,
    },
    paddingBottom: {
      style: W,
    },
    paddingLeft: {
      style: W,
    },
    paddingX: {
      style: W,
    },
    paddingY: {
      style: W,
    },
    paddingInline: {
      style: W,
    },
    paddingInlineStart: {
      style: W,
    },
    paddingInlineEnd: {
      style: W,
    },
    paddingBlock: {
      style: W,
    },
    paddingBlockStart: {
      style: W,
    },
    paddingBlockEnd: {
      style: W,
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
      style: er,
    },
    rowGap: {
      style: nr,
    },
    columnGap: {
      style: rr,
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
      style: Sr,
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
  Nr = Mo;
function Io(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []),
    n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function Bo(e, r) {
  return typeof e == 'function' ? e(r) : e;
}
function Do() {
  function e(n, t, o, a) {
    const s = {
        [n]: t,
        theme: o,
      },
      c = a[n];
    if (!c)
      return {
        [n]: t,
      };
    const { cssProperty: u = n, themeKey: i, transform: f, style: h } = c;
    if (t == null) return null;
    if (i === 'typography' && t === 'inherit')
      return {
        [n]: t,
      };
    const l = qe(o, i) || {};
    return h
      ? h(s)
      : me(s, t, (v) => {
          let p = We(l, f, v);
          return (
            v === p &&
              typeof v == 'string' &&
              (p = We(l, f, `${n}${v === 'default' ? '' : he(v)}`, v)),
            u === !1
              ? p
              : {
                  [u]: p,
                }
          );
        });
  }
  function r(n) {
    var t;
    const { sx: o, theme: a = {} } = n || {};
    if (!o) return null;
    const s = (t = a.unstable_sxConfig) != null ? t : Nr;
    function c(u) {
      let i = u;
      if (typeof u == 'function') i = u(a);
      else if (typeof u != 'object') return u;
      if (!i) return null;
      const f = qt(a.breakpoints),
        h = Object.keys(f);
      let l = f;
      return (
        Object.keys(i).forEach((y) => {
          const v = Bo(i[y], a);
          if (v != null)
            if (typeof v == 'object')
              if (s[y]) l = ze(l, e(y, v, a, s));
              else {
                const p = me(
                  {
                    theme: a,
                  },
                  v,
                  (d) => ({
                    [y]: d,
                  }),
                );
                Io(p, v)
                  ? (l[y] = r({
                      sx: v,
                      theme: a,
                    }))
                  : (l = ze(l, p));
              }
            else l = ze(l, e(y, v, a, s));
        }),
        Xt(h, l)
      );
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return r;
}
const On = Do();
On.filterProps = ['sx'];
const Er = On,
  jo = ['breakpoints', 'palette', 'spacing', 'shape'];
function wr(e = {}, ...r) {
  const { breakpoints: n = {}, palette: t = {}, spacing: o, shape: a = {} } = e,
    s = ge(e, jo),
    c = Jt(n),
    u = oo(o);
  let i = pe(
    {
      breakpoints: c,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: A(
        {
          mode: 'light',
        },
        t,
      ),
      spacing: u,
      shape: A({}, Kt, a),
    },
    s,
  );
  return (
    (i = r.reduce((f, h) => pe(f, h), i)),
    (i.unstable_sxConfig = A({}, Nr, s == null ? void 0 : s.unstable_sxConfig)),
    (i.unstable_sx = function (h) {
      return Er({
        sx: h,
        theme: this,
      });
    }),
    i
  );
}
function zo(e) {
  return Object.keys(e).length === 0;
}
function Vo(e = null) {
  const r = Ve.useContext(Zn);
  return !r || zo(r) ? e : r;
}
const Lo = wr();
function Fo(e = Lo) {
  return Vo(e);
}
const Ho = ['variant'];
function Yr(e) {
  return e.length === 0;
}
function $n(e) {
  const { variant: r } = e,
    n = ge(e, Ho);
  let t = r || '';
  return (
    Object.keys(n)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (t += Yr(t) ? e[o] : he(e[o]))
          : (t += `${Yr(t) ? o : he(o)}${he(e[o].toString())}`);
      }),
    t
  );
}
const Uo = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function Jo(e) {
  return Object.keys(e).length === 0;
}
function Go(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const Ko = (e, r) =>
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
        const a = $n(o.props);
        t[a] = o.style;
      }),
      t
    );
  },
  qo = (e, r, n, t) => {
    var o;
    const { ownerState: a = {} } = e,
      s = [],
      c = n == null || (o = n.components) == null || (o = o[t]) == null ? void 0 : o.variants;
    return (
      c &&
        c.forEach((u) => {
          let i = !0;
          Object.keys(u.props).forEach((f) => {
            a[f] !== u.props[f] && e[f] !== u.props[f] && (i = !1);
          }),
            i && s.push(r[$n(u.props)]);
        }),
      s
    );
  };
function Ke(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Xo = wr(),
  Yo = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function De({ defaultTheme: e, theme: r, themeId: n }) {
  return Jo(r) ? e : r[n] || r;
}
function Zo(e = {}) {
  const {
      themeId: r,
      defaultTheme: n = Xo,
      rootShouldForwardProp: t = Ke,
      slotShouldForwardProp: o = Ke,
    } = e,
    a = (s) =>
      Er(
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
    (s, c = {}) => {
      Qn(s, (R) => R.filter((m) => !(m != null && m.__mui_systemSx)));
      const { name: u, slot: i, skipVariantsResolver: f, skipSx: h, overridesResolver: l } = c,
        y = ge(c, Uo),
        v = f !== void 0 ? f : (i && i !== 'Root') || !1,
        p = h || !1;
      let d;
      process.env.NODE_ENV !== 'production' && u && (d = `${u}-${Yo(i || 'Root')}`);
      let N = Ke;
      i === 'Root' ? (N = t) : i ? (N = o) : Go(s) && (N = void 0);
      const q = Yn(
          s,
          A(
            {
              shouldForwardProp: N,
              label: d,
            },
            y,
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
          u &&
            l &&
            X.push((B) => {
              const Y = De(
                  A({}, B, {
                    defaultTheme: n,
                    themeId: r,
                  }),
                ),
                ie = Ko(u, Y);
              if (ie) {
                const ae = {};
                return (
                  Object.entries(ie).forEach(([G, ce]) => {
                    ae[G] =
                      typeof ce == 'function'
                        ? ce(
                            A({}, B, {
                              theme: Y,
                            }),
                          )
                        : ce;
                  }),
                  l(B, ae)
                );
              }
              return null;
            }),
            u &&
              !v &&
              X.push((B) => {
                const Y = De(
                  A({}, B, {
                    defaultTheme: n,
                    themeId: r,
                  }),
                );
                return qo(B, Wo(u, Y), Y, u);
              }),
            p || X.push(a);
          const se = X.length - m.length;
          if (Array.isArray(R) && se > 0) {
            const B = new Array(se).fill('');
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
          const oe = q(re, ...X);
          if (process.env.NODE_ENV !== 'production') {
            let B;
            u && (B = `${u}${i || ''}`),
              B === void 0 && (B = `Styled(${It(s)})`),
              (oe.displayName = B);
          }
          return s.muiName && (oe.muiName = s.muiName), oe;
        };
      return q.withConfig && (H.withConfig = q.withConfig), H;
    }
  );
}
function Qo(e) {
  const { theme: r, name: n, props: t } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps
    ? t
    : wn(r.components[n].defaultProps, t);
}
function ea({ props: e, name: r, defaultTheme: n, themeId: t }) {
  let o = Fo(n);
  return (
    t && (o = o[t] || o),
    Qo({
      theme: o,
      name: r,
      props: e,
    })
  );
}
function Rn(e, r = 0, n = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < r || e > n) &&
      console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`),
    Math.min(Math.max(r, e), n)
  );
}
function ra(e) {
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
  if (e.charAt(0) === '#') return Me(ra(e));
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
function Tr(e) {
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
function na(e) {
  e = Me(e);
  const { values: r } = e,
    n = r[0],
    t = r[1] / 100,
    o = r[2] / 100,
    a = t * Math.min(o, 1 - o),
    s = (i, f = (i + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let c = 'rgb';
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return (
    e.type === 'hsla' && ((c += 'a'), u.push(r[3])),
    Tr({
      type: c,
      values: u,
    })
  );
}
function Zr(e) {
  e = Me(e);
  let r = e.type === 'hsl' || e.type === 'hsla' ? Me(na(e)).values : e.values;
  return (
    (r = r.map(
      (n) => (
        e.type !== 'color' && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3))
  );
}
function Qr(e, r) {
  const n = Zr(e),
    t = Zr(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function ta(e, r) {
  if (((e = Me(e)), (r = Rn(r)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - r;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - r;
  return Tr(e);
}
function oa(e, r) {
  if (((e = Me(e)), (r = Rn(r)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf('rgb') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * r;
  return Tr(e);
}
function aa(e, r) {
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
const sa = {
    black: '#000',
    white: '#fff',
  },
  Le = sa,
  ia = {
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
  ca = ia,
  la = {
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
  we = la,
  ua = {
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
  Te = ua,
  da = {
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
  je = da,
  fa = {
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
  Ce = fa,
  pa = {
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
  _e = pa,
  ha = {
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
  Oe = ha,
  ma = ['mode', 'contrastThreshold', 'tonalOffset'],
  en = {
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
  fr = {
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
function rn(e, r, n, t) {
  const o = t.light || t,
    a = t.dark || t * 1.5;
  e[r] ||
    (e.hasOwnProperty(n)
      ? (e[r] = e[n])
      : r === 'light'
      ? (e.light = oa(e.main, o))
      : r === 'dark' && (e.dark = ta(e.main, a)));
}
function ga(e = 'light') {
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
function ba(e = 'light') {
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
function ya(e = 'light') {
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
function va(e = 'light') {
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
function ka(e = 'light') {
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
function Sa(e) {
  const { mode: r = 'light', contrastThreshold: n = 3, tonalOffset: t = 0.2 } = e,
    o = ge(e, ma),
    a = e.primary || ga(r),
    s = e.secondary || ba(r),
    c = e.error || ya(r),
    u = e.info || va(r),
    i = e.success || xa(r),
    f = e.warning || ka(r);
  function h(p) {
    const d = Qr(p, fr.text.primary) >= n ? fr.text.primary : en.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const N = Qr(p, d);
      N < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${N}:1 for ${d} on ${p}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return d;
  }
  const l = ({
      color: p,
      name: d,
      mainShade: N = 500,
      lightShade: q = 300,
      darkShade: H = 700,
    }) => {
      if (((p = A({}, p)), !p.main && p[N] && (p.main = p[N]), !p.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`
            : Pe(11, d ? ` (${d})` : '', N),
        );
      if (typeof p.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(p.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Pe(12, d ? ` (${d})` : '', JSON.stringify(p.main)),
        );
      return (
        rn(p, 'light', q, t), rn(p, 'dark', H, t), p.contrastText || (p.contrastText = h(p.main)), p
      );
    },
    y = {
      dark: fr,
      light: en,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)),
    pe(
      A(
        {
          // A collection of common colors.
          common: A({}, Le),
          // prevent mutable object.
          // The palette mode, can be light or dark.
          mode: r,
          // The colors used to represent primary interface elements for a user.
          primary: l({
            color: a,
            name: 'primary',
          }),
          // The colors used to represent secondary interface elements for a user.
          secondary: l({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          // The colors used to represent interface elements that the user should be made aware of.
          error: l({
            color: c,
            name: 'error',
          }),
          // The colors used to represent potentially dangerous actions or important messages.
          warning: l({
            color: f,
            name: 'warning',
          }),
          // The colors used to present information to the user that is neutral and not necessarily important.
          info: l({
            color: u,
            name: 'info',
          }),
          // The colors used to indicate the successful completion of an action that user triggered.
          success: l({
            color: i,
            name: 'success',
          }),
          // The grey colors.
          grey: ca,
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: n,
          // Takes a background color and returns the text color that maximizes the contrast.
          getContrastText: h,
          // Generate a rich color object.
          augmentColor: l,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: t,
        },
        y[r],
      ),
      o,
    )
  );
}
const Na = [
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
function Ea(e) {
  return Math.round(e * 1e5) / 1e5;
}
const nn = {
    textTransform: 'uppercase',
  },
  tn = '"Roboto", "Helvetica", "Arial", sans-serif';
function wa(e, r) {
  const n = typeof r == 'function' ? r(e) : r,
    {
      fontFamily: t = tn,
      // The default font size of the Material Specification.
      fontSize: o = 14,
      // px
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: c = 500,
      fontWeightBold: u = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize: i = 16,
      // Apply the CSS properties to all the variants.
      allVariants: f,
      pxToRem: h,
    } = n,
    l = ge(n, Na);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof i != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const y = o / 14,
    v = h || ((N) => `${(N / i) * y}rem`),
    p = (N, q, H, R, m) =>
      A(
        {
          fontFamily: t,
          fontWeight: N,
          fontSize: v(q),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: H,
        },
        t === tn
          ? {
              letterSpacing: `${Ea(R / q)}em`,
            }
          : {},
        m,
        f,
      ),
    d = {
      h1: p(a, 96, 1.167, -1.5),
      h2: p(a, 60, 1.2, -0.5),
      h3: p(s, 48, 1.167, 0),
      h4: p(s, 34, 1.235, 0.25),
      h5: p(s, 24, 1.334, 0),
      h6: p(c, 20, 1.6, 0.15),
      subtitle1: p(s, 16, 1.75, 0.15),
      subtitle2: p(c, 14, 1.57, 0.1),
      body1: p(s, 16, 1.5, 0.15),
      body2: p(s, 14, 1.43, 0.15),
      button: p(c, 14, 1.75, 0.4, nn),
      caption: p(s, 12, 1.66, 0.4),
      overline: p(s, 12, 2.66, 1, nn),
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
        htmlFontSize: i,
        pxToRem: v,
        fontFamily: t,
        fontSize: o,
        fontWeightLight: a,
        fontWeightRegular: s,
        fontWeightMedium: c,
        fontWeightBold: u,
      },
      d,
    ),
    l,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const Ta = 0.2,
  Ca = 0.14,
  _a = 0.12;
function J(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ta})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ca})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${_a})`,
  ].join(',');
}
const Oa = [
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
  $a = Oa,
  Ra = ['duration', 'easing', 'delay'],
  Aa = {
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
  Pa = {
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
function on(e) {
  return `${Math.round(e)}ms`;
}
function Ma(e) {
  if (!e) return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Ia(e) {
  const r = A({}, Aa, e.easing),
    n = A({}, Pa, e.duration);
  return A(
    {
      getAutoHeightDuration: Ma,
      create: (o = ['all'], a = {}) => {
        const { duration: s = n.standard, easing: c = r.easeInOut, delay: u = 0 } = a,
          i = ge(a, Ra);
        if (process.env.NODE_ENV !== 'production') {
          const f = (l) => typeof l == 'string',
            h = (l) => !isNaN(parseFloat(l));
          !f(o) &&
            !Array.isArray(o) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !h(s) &&
              !f(s) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${s}.`,
              ),
            f(c) || console.error('MUI: Argument "easing" must be a string.'),
            !h(u) && !f(u) && console.error('MUI: Argument "delay" must be a number or a string.'),
            typeof a != 'object' &&
              console.error(
                [
                  'MUI: Secong argument of transition.create must be an object.',
                  "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`",
                ].join(`
`),
              ),
            Object.keys(i).length !== 0 &&
              console.error(`MUI: Unrecognized argument(s) [${Object.keys(i).join(',')}].`);
        }
        return (Array.isArray(o) ? o : [o])
          .map(
            (f) =>
              `${f} ${typeof s == 'string' ? s : on(s)} ${c} ${typeof u == 'string' ? u : on(u)}`,
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
const Ba = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Da = Ba,
  ja = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function za(e = {}, ...r) {
  const { mixins: n = {}, palette: t = {}, transitions: o = {}, typography: a = {} } = e,
    s = ge(e, ja);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Pe(18),
    );
  const c = Sa(t),
    u = wr(e);
  let i = pe(u, {
    mixins: aa(u.breakpoints, n),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: $a.slice(),
    typography: wa(c, a),
    transitions: Ia(o),
    zIndex: A({}, Da),
  });
  if (
    ((i = pe(i, s)), (i = r.reduce((f, h) => pe(f, h), i)), process.env.NODE_ENV !== 'production')
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
      h = (l, y) => {
        let v;
        for (v in l) {
          const p = l[v];
          if (f.indexOf(v) !== -1 && Object.keys(p).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const d = xr('', v);
              console.error(
                [
                  `MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(l, null, 2),
                  '',
                  `Instead, you need to use the '&.${d}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${d}`]: p,
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
            l[v] = {};
          }
        }
      };
    Object.keys(i.components).forEach((l) => {
      const y = i.components[l].styleOverrides;
      y && l.indexOf('Mui') === 0 && h(y, l);
    });
  }
  return (
    (i.unstable_sxConfig = A({}, Nr, s == null ? void 0 : s.unstable_sxConfig)),
    (i.unstable_sx = function (h) {
      return Er({
        sx: h,
        theme: this,
      });
    }),
    i
  );
}
const Va = za(),
  An = Va,
  Pn = '$$material';
function La({ props: e, name: r }) {
  return ea({
    props: e,
    name: r,
    defaultTheme: An,
    themeId: Pn,
  });
}
const Fa = (e) => Ke(e) && e !== 'classes',
  Ha = Zo({
    themeId: Pn,
    defaultTheme: An,
    rootShouldForwardProp: Fa,
  }),
  Ua = Ha;
function Ja(e) {
  return xr('MuiSvgIcon', e);
}
Lt('MuiSvgIcon', [
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
const Ga = [
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
  Ka = (e) => {
    const { color: r, fontSize: n, classes: t } = e,
      o = {
        root: ['root', r !== 'inherit' && `color${he(r)}`, `fontSize${he(n)}`],
      };
    return Bt(o, Ja, t);
  },
  Wa = Ua('svg', {
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
    var n, t, o, a, s, c, u, i, f, h, l, y, v;
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
          ((c = e.typography) == null || (u = c.pxToRem) == null ? void 0 : u.call(c, 24)) ||
          '1.5rem',
        large:
          ((i = e.typography) == null || (f = i.pxToRem) == null ? void 0 : f.call(i, 35)) ||
          '2.1875rem',
      }[r.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (h = (l = (e.vars || e).palette) == null || (l = l[r.color]) == null ? void 0 : l.main) !=
        null
          ? h
          : {
              action:
                (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.active,
              disabled:
                (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
              inherit: void 0,
            }[r.color],
    };
  }),
  Cr = /* @__PURE__ */ Ve.forwardRef(function (r, n) {
    const t = La({
        props: r,
        name: 'MuiSvgIcon',
      }),
      {
        children: o,
        className: a,
        color: s = 'inherit',
        component: c = 'svg',
        fontSize: u = 'medium',
        htmlColor: i,
        inheritViewBox: f = !1,
        titleAccess: h,
        viewBox: l = '0 0 24 24',
      } = t,
      y = ge(t, Ga),
      v = /* @__PURE__ */ Ve.isValidElement(o) && o.type === 'svg',
      p = A({}, t, {
        color: s,
        component: c,
        fontSize: u,
        instanceFontSize: r.fontSize,
        inheritViewBox: f,
        viewBox: l,
        hasSvgAsChild: v,
      }),
      d = {};
    f || (d.viewBox = l);
    const N = Ka(p);
    return /* @__PURE__ */ Fe(
      Wa,
      A(
        {
          as: c,
          className: Ft(N.root, a),
          focusable: 'false',
          color: i,
          'aria-hidden': h ? void 0 : !0,
          role: h ? 'img' : void 0,
          ref: n,
        },
        d,
        y,
        v && o.props,
        {
          ownerState: p,
          children: [
            v ? o.props.children : o,
            h
              ? /* @__PURE__ */ C('title', {
                  children: h,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Cr.propTypes = {
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
Cr.muiName = 'SvgIcon';
const an = Cr;
function qa(e, r) {
  function n(t, o) {
    return /* @__PURE__ */ C(
      an,
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
    (n.muiName = an.muiName),
    /* @__PURE__ */ Ve.memo(/* @__PURE__ */ Ve.forwardRef(n))
  );
}
const Xa = qa(
  /* @__PURE__ */ C('path', {
    d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  }),
  'Menu',
);
function ls({ menu: e, dataHandler: r, commandHandler: n, className: t, children: o }) {
  const [a, s] = tr(!1),
    [c, u] = tr(!1),
    i = or(() => {
      a && s(!1), u(!1);
    }, [a]),
    f = or((d) => {
      d.stopPropagation(),
        s((N) => {
          const q = !N;
          return q && d.shiftKey && u(!0), q;
        });
    }, []),
    h = Kn(null),
    [l, y] = tr(0);
  Wn(() => {
    a && h.current && y(h.current.clientHeight);
  }, [a]);
  const v = or((d) => (i(), n(d)), [n, i]);
  let p = e;
  return (
    !p && r && (p = r(c)),
    /* @__PURE__ */ C('div', {
      ref: h,
      style: { position: 'relative' },
      children: /* @__PURE__ */ C(Hn, {
        position: 'static',
        children: /* @__PURE__ */ Fe(Un, {
          className: `papi-toolbar ${t ?? ''}`,
          variant: 'dense',
          children: [
            p
              ? /* @__PURE__ */ C(Jn, {
                  edge: 'start',
                  className: `papi-menuButton ${t ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: f,
                  children: /* @__PURE__ */ C(Xa, {}),
                })
              : null,
            o ? /* @__PURE__ */ C('div', { className: 'papi-menu-children', children: o }) : null,
            p
              ? /* @__PURE__ */ C(Gn, {
                  className: `papi-menu-drawer ${t ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: a,
                  onClose: i,
                  PaperProps: {
                    className: 'papi-menu-drawer-paper',
                    style: {
                      top: l,
                    },
                  },
                  children: /* @__PURE__ */ C(ot, { commandHandler: v, columns: p.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
function Ya(e, r = 'top') {
  if (!e || typeof document > 'u') return;
  const n = document.head || document.querySelector('head'),
    t = n.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    r === 'top' && t ? n.insertBefore(o, t) : n.appendChild(o);
}
Ya(
  `.papi-checkbox {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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

.papi-menu-drawer-paper {
  height: fit-content !important;
}

.papi-menu-children {
  padding: 10px;
  position: relative;
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
  ot as GridMenu,
  $e as LabelPosition,
  nt as MenuItem,
  os as RefSelector,
  as as Slider,
  ss as Snackbar,
  is as Switch,
  cs as Table,
  pr as TextField,
  ls as Toolbar,
};
//# sourceMappingURL=index.es.js.map
