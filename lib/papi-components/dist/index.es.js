import { jsx as R, jsxs as ze, Fragment as Ar } from 'react/jsx-runtime';
import {
  Button as Pr,
  FormLabel as Mr,
  Checkbox as Ir,
  Autocomplete as Br,
  TextField as ar,
  MenuItem as Dr,
  Grid as ir,
  Slider as Vr,
  Snackbar as jr,
  Switch as Lr,
  AppBar as Fr,
  Toolbar as zr,
  IconButton as Ur,
  Drawer as Hr,
} from '@mui/material';
import * as Le from 'react';
import { useState as Ge, useCallback as ot, useRef as Jr, useEffect as Kr } from 'react';
import { ThemeContext as Gr } from '@emotion/react';
import Xr from '@emotion/styled';
function xe({ isDisabled: e = !1, className: t, onClick: r, onContextMenu: n, children: o }) {
  return /* @__PURE__ */ R(Pr, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: r,
    onContextMenu: n,
    children: o,
  });
}
var $e = /* @__PURE__ */ ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))($e || {});
function Zs({
  isChecked: e,
  labelText: t = '',
  labelPosition: r = $e.After,
  isIndeterminate: n = !1,
  isDefaultChecked: o,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: i,
}) {
  const c = /* @__PURE__ */ R(Ir, {
    checked: e,
    indeterminate: n,
    defaultChecked: o,
    disabled: s,
    className: `papi-checkbox ${a ? 'error' : ''} ${u ?? ''}`,
    onChange: i,
  });
  let d;
  if (t) {
    const h = r === $e.Before || r === $e.Above,
      l = /* @__PURE__ */ R('span', {
        className: `papi-checkbox-label ${a ? 'error' : ''} ${u ?? ''}`,
        children: t,
      }),
      b = r === $e.Before || r === $e.After,
      v = b ? l : /* @__PURE__ */ R('div', { children: l }),
      p = b ? c : /* @__PURE__ */ R('div', { children: c });
    d = /* @__PURE__ */ ze(Mr, {
      className: `papi-checkbox ${r.toString()}`,
      disabled: s,
      error: a,
      children: [h && v, p, !h && v],
    });
  } else d = c;
  return d;
}
function qr({
  title: e,
  isDisabled: t = !1,
  isClearable: r = !0,
  hasError: n = !1,
  isFullWidth: o = !1,
  width: s,
  options: a = [],
  className: u,
  value: i,
  onChange: c,
  onFocus: d,
  onBlur: h,
  checkIsOptionEqualToValue: l,
}) {
  return /* @__PURE__ */ R(Br, {
    disablePortal: !0,
    disabled: t,
    disableClearable: !r,
    fullWidth: o,
    options: a,
    className: `papi-combo-box ${n ? 'error' : ''} ${u ?? ''}`,
    value: i,
    onChange: c,
    onFocus: d,
    onBlur: h,
    isOptionEqualToValue: l,
    renderInput: (b) =>
      /* @__PURE__ */ R(ar, {
        ...b,
        error: n,
        fullWidth: o,
        disabled: t,
        label: e,
        style: { width: s },
      }),
  });
}
function Wr(e) {
  const {
    onClick: t,
    name: r,
    hasAutoFocus: n = !1,
    className: o,
    isDense: s = !0,
    hasDisabledGutters: a = !1,
    hasDivider: u = !1,
    focusVisibleClassName: i,
  } = e;
  return /* @__PURE__ */ R(Dr, {
    autoFocus: n,
    className: o,
    dense: s,
    disableGutters: a,
    divider: u,
    focusVisibleClassName: i,
    onClick: t,
    children: r,
  });
}
function Yr({ commandHandler: e, name: t, className: r, items: n }) {
  return /* @__PURE__ */ ze(ir, {
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${r ?? ''}`,
    children: [
      /* @__PURE__ */ R('h3', { className: `papi-menu ${r ?? ''}`, children: t }),
      n.map((o, s) =>
        /* @__PURE__ */ R(
          Wr,
          {
            className: `papi-menu-item ${o.className}`,
            onClick: () => {
              e(o);
            },
            ...o,
          },
          s,
        ),
      ),
    ],
  });
}
function Zr({ commandHandler: e, className: t, columns: r }) {
  return /* @__PURE__ */ R(ir, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${t ?? ''}`,
    columns: r.length,
    children: r.map((n) =>
      /* @__PURE__ */ R(Yr, {
        commandHandler: e,
        name: n.name,
        className: t,
        items: n.items,
      }),
    ),
  });
}
var Qr = Object.defineProperty,
  en = (e, t, r) =>
    t in e ? Qr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r),
  w = (e, t, r) => (en(e, typeof t != 'symbol' ? t + '' : t, r), r);
const Ee = [
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
  ht = [
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
  cr = [
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
  Ot = fn();
function Ie(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Ot ? Ot[e] : 0;
}
function mt(e) {
  return Ie(e) > 0;
}
function tn(e) {
  const t = typeof e == 'string' ? Ie(e) : e;
  return t >= 40 && t <= 66;
}
function rn(e) {
  return (typeof e == 'string' ? Ie(e) : e) <= 39;
}
function ur(e) {
  return e <= 66;
}
function nn(e) {
  const t = typeof e == 'string' ? Ie(e) : e;
  return dr(t) && !ur(t);
}
function* on() {
  for (let e = 1; e <= Ee.length; e++) yield e;
}
const sn = 1,
  lr = Ee.length;
function an() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function gt(e, t = '***') {
  const r = e - 1;
  return r < 0 || r >= Ee.length ? t : Ee[r];
}
function fr(e) {
  return e <= 0 || e > lr ? '******' : cr[e - 1];
}
function cn(e) {
  return fr(Ie(e));
}
function dr(e) {
  const t = typeof e == 'number' ? gt(e) : e;
  return mt(t) && !ht.includes(t);
}
function un(e) {
  const t = typeof e == 'number' ? gt(e) : e;
  return mt(t) && ht.includes(t);
}
function ln(e) {
  return cr[e - 1].includes('*obsolete*');
}
function fn() {
  const e = {};
  for (let t = 0; t < Ee.length; t++) e[Ee[t]] = t + 1;
  return e;
}
const re = {
  allBookIds: Ee,
  nonCanonicalIds: ht,
  bookIdToNumber: Ie,
  isBookIdValid: mt,
  isBookNT: tn,
  isBookOT: rn,
  isBookOTNT: ur,
  isBookDC: nn,
  allBookNumbers: on,
  firstBook: sn,
  lastBook: lr,
  extraBooks: an,
  bookNumberToId: gt,
  bookNumberToEnglishName: fr,
  bookIdToEnglishName: cn,
  isCanonical: dr,
  isExtraMaterial: un,
  isObsolete: ln,
};
var ye = /* @__PURE__ */ ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(ye || {});
const Ne = class {
  // private versInfo: Versification;
  constructor(e) {
    if (
      (w(this, 'name'),
      w(this, 'fullPath'),
      w(this, 'isPresent'),
      w(this, 'hasVerseSegments'),
      w(this, 'isCustomized'),
      w(this, 'baseVersification'),
      w(this, 'scriptureBooks'),
      w(this, '_type'),
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
let te = Ne;
w(te, 'Original', new Ne(ye.Original)),
  w(te, 'Septuagint', new Ne(ye.Septuagint)),
  w(te, 'Vulgate', new Ne(ye.Vulgate)),
  w(te, 'English', new Ne(ye.English)),
  w(te, 'RussianProtestant', new Ne(ye.RussianProtestant)),
  w(te, 'RussianOrthodox', new Ne(ye.RussianOrthodox));
function Ct(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++) e = e.split(t[n]).join(r);
  return e.split(r);
}
var pr = /* @__PURE__ */ ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(pr || {});
const C = class {
  constructor(t, r, n, o) {
    if (
      (w(this, 'firstChapter'),
      w(this, 'lastChapter'),
      w(this, 'lastVerse'),
      w(this, 'hasSegmentsDefined'),
      w(this, 'text'),
      w(this, 'BBBCCCVVVS'),
      w(this, 'longHashCode'),
      w(this, 'versification'),
      w(this, 'rtlMark', '‏'),
      w(this, '_bookNum', 0),
      w(this, '_chapterNum', 0),
      w(this, '_verseNum', 0),
      w(this, '_verse'),
      n == null && o == null)
    )
      if (t != null && typeof t == 'string') {
        const s = t,
          a = r != null && r instanceof te ? r : void 0;
        this.setEmpty(a), this.parse(s);
      } else if (t != null && typeof t == 'number') {
        const s = r != null && r instanceof te ? r : void 0;
        this.setEmpty(s),
          (this._verseNum = t % C.chapterDigitShifter),
          (this._chapterNum = Math.floor((t % C.bookDigitShifter) / C.chapterDigitShifter)),
          (this._bookNum = Math.floor(t / C.bookDigitShifter));
      } else if (r == null)
        if (t != null && t instanceof C) {
          const s = t;
          (this._bookNum = s.bookNum),
            (this._chapterNum = s.chapterNum),
            (this._verseNum = s.verseNum),
            (this._verse = s.verse),
            (this.versification = s.versification);
        } else {
          if (t == null) return;
          const s = t instanceof te ? t : C.defaultVersification;
          this.setEmpty(s);
        }
      else throw new Error('VerseRef constructor not supported.');
    else if (t != null && r != null && n != null)
      if (typeof t == 'string' && typeof r == 'string' && typeof n == 'string')
        this.setEmpty(o), this.updateInternal(t, r, n);
      else if (typeof t == 'number' && typeof r == 'number' && typeof n == 'number')
        (this._bookNum = t),
          (this._chapterNum = r),
          (this._verseNum = n),
          (this.versification = o ?? C.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, r = C.defaultVersification) {
    const n = new C(r);
    return n.parse(t), n;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(t) {
    return (
      t.length > 0 &&
      '0123456789'.includes(t[0]) &&
      !t.endsWith(this.verseRangeSeparator) &&
      !t.endsWith(this.verseSequenceIndicator)
    );
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
      return (r = C.parse(t)), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof Be) return (r = new C()), { success: !1, verseRef: r };
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
    return (
      (t % C.bcvMaxValue) * C.bookDigitShifter +
      (r >= 0 ? (r % C.bcvMaxValue) * C.chapterDigitShifter : 0) +
      (n >= 0 ? n % C.bcvMaxValue : 0)
    );
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(t) {
    let r;
    if (!t) return (r = -1), { success: !0, vNum: r };
    r = 0;
    let n;
    for (let o = 0; o < t.length; o++) {
      if (((n = t[o]), n < '0' || n > '9')) return o === 0 && (r = -1), { success: !1, vNum: r };
      if (((r = r * 10 + +n - +'0'), r > C.bcvMaxValue)) return (r = -1), { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
      (this._verse.includes(C.verseRangeSeparator) ||
        this._verse.includes(C.verseSequenceIndicator))
    );
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return re.bookNumberToId(this.bookNum, '');
  }
  set book(t) {
    this.bookNum = re.bookIdToNumber(t);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
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
    return this._verse != null
      ? this._verse
      : this.isDefault || this._verseNum < 0
      ? ''
      : this._verseNum.toString();
  }
  set verse(t) {
    const { success: r, vNum: n } = C.tryGetVerseNum(t);
    (this._verse = r ? void 0 : t.replace(this.rtlMark, '')),
      (this._verseNum = n),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = C.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > re.lastBook)
      throw new Be('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new te(t) : void 0;
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
    return this.validateVerse(C.verseRangeSeparators, C.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return C.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return C.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
    if (((t = t.replace(this.rtlMark, '')), t.includes('/'))) {
      const s = t.split('/');
      if (((t = s[0]), s.length > 1))
        try {
          const a = +s[1].trim();
          this.versification = new te(ye[a]);
        } catch {
          throw new Be('Invalid reference : ' + t);
        }
    }
    const r = t.trim().split(' ');
    if (r.length !== 2) throw new Be('Invalid reference : ' + t);
    const n = r[1].split(':'),
      o = +n[0];
    if (
      n.length !== 2 ||
      re.bookIdToNumber(r[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !C.isVerseParseable(n[1])
    )
      throw new Be('Invalid reference : ' + t);
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
    return new C(this);
  }
  toString() {
    const t = this.book;
    return t === '' ? '' : `${t} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(t) {
    return (
      t._bookNum === this._bookNum &&
      t._chapterNum === this._chapterNum &&
      t._verseNum === this._verseNum &&
      t._verse === this._verse &&
      t.versification != null &&
      this.versification != null &&
      t.versification.equals(this.versification)
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
  allVerses(t = !1, r = C.verseRangeSeparators, n = C.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      s = Ct(this._verse, n);
    for (const a of s.map((u) => Ct(u, r))) {
      const u = this.clone();
      u.verse = a[0];
      const i = u.verseNum;
      if ((o.push(u), a.length > 1)) {
        const c = this.clone();
        if (((c.verse = a[1]), !t))
          for (let d = i + 1; d < c.verseNum; d++) {
            const h = new C(this._bookNum, this._chapterNum, d, this.versification);
            this.isExcluded || o.push(h);
          }
        o.push(c);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(t, r) {
    if (!this.verse) return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, t, r)) {
      const s = o.internalValid;
      if (s !== 0) return s;
      const a = o.BBBCCCVVV;
      if (n > a) return 3;
      if (n === a) return 4;
      n = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > re.lastBook
      ? 2
      : 0;
  }
  setEmpty(t = C.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = t);
  }
  updateInternal(t, r, n) {
    (this.bookNum = re.bookIdToNumber(t)), (this.chapter = r), (this.verse = n);
  }
};
let ue = C;
w(ue, 'defaultVersification', te.English),
  w(ue, 'verseRangeSeparator', '-'),
  w(ue, 'verseSequenceIndicator', ','),
  w(ue, 'verseRangeSeparators', [C.verseRangeSeparator]),
  w(ue, 'verseSequenceIndicators', [C.verseSequenceIndicator]),
  w(ue, 'chapterDigitShifter', 1e3),
  w(ue, 'bookDigitShifter', C.chapterDigitShifter * C.chapterDigitShifter),
  w(ue, 'bcvMaxValue', C.chapterDigitShifter - 1)
  /**
   * The valid status of the VerseRef.
   */,
  w(ue, 'ValidStatusType', pr);
class Be extends Error {}
const hr = [
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
function wt() {
  return re.allBookIds.map((e) => ({
    bookId: e,
    label: re.bookIdToEnglishName(e),
  }));
}
function $t(e) {
  return {
    bookId: re.bookNumberToId(e),
    label: re.bookNumberToEnglishName(e),
  };
}
const mr = 1,
  dn = hr.length - 1,
  gr = 1,
  yr = 1,
  br = (e) => {
    var t;
    return ((t = hr[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  Rt = (e, t) => ({
    bookNum: Math.max(mr, Math.min(e.bookNum + t, dn)),
    chapterNum: 1,
    verseNum: 1,
  }),
  At = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(gr, e.chapterNum + t), br(e.bookNum)),
    verseNum: 1,
  }),
  Pt = (e, t) => ({
    ...e,
    verseNum: Math.max(yr, e.verseNum + t),
  });
function Mt({
  variant: e = 'outlined',
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: s,
  placeholder: a,
  isRequired: u = !1,
  className: i,
  defaultValue: c,
  value: d,
  onChange: h,
  onFocus: l,
  onBlur: b,
}) {
  return /* @__PURE__ */ R(ar, {
    variant: e,
    disabled: t,
    error: r,
    fullWidth: n,
    helperText: o,
    label: s,
    placeholder: a,
    required: u,
    className: `papi-textfield ${i ?? ''}`,
    defaultValue: c,
    value: d,
    onChange: h,
    onFocus: l,
    onBlur: b,
  });
}
function pn(e, t) {
  return e.bookId === t.bookId && e.label === t.label;
}
function ea({ scrRef: e, handleSubmit: t }) {
  const [r, n] = Ge($t(e.bookNum)),
    o = (i) => {
      n($t(i.bookNum)), t(i);
    },
    s = (i, c) => {
      const h = { bookNum: re.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
      o(h);
    },
    a = (i) => {
      t({ ...e, chapterNum: +i.target.value });
    },
    u = (i) => {
      t({ ...e, verseNum: +i.target.value });
    };
  return /* @__PURE__ */ ze(Ar, {
    children: [
      /* @__PURE__ */ R(qr, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: wt(),
        onChange: s,
        value: r,
        isClearable: !1,
        width: 200,
        checkIsOptionEqualToValue: pn,
      }),
      /* @__PURE__ */ R(xe, {
        onClick: () => o(Rt(e, -1)),
        isDisabled: e.bookNum <= mr,
        children: '<',
      }),
      /* @__PURE__ */ R(xe, {
        onClick: () => o(Rt(e, 1)),
        isDisabled: e.bookNum >= wt().length,
        children: '>',
      }),
      /* @__PURE__ */ R(Mt, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: a,
      }),
      /* @__PURE__ */ R(xe, {
        onClick: () => t(At(e, -1)),
        isDisabled: e.chapterNum <= gr,
        children: '<',
      }),
      /* @__PURE__ */ R(xe, {
        onClick: () => t(At(e, 1)),
        isDisabled: e.chapterNum >= br(e.bookNum),
        children: '>',
      }),
      /* @__PURE__ */ R(Mt, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: u,
      }),
      /* @__PURE__ */ R(xe, {
        onClick: () => t(Pt(e, -1)),
        isDisabled: e.verseNum <= yr,
        children: '<',
      }),
      /* @__PURE__ */ R(xe, { onClick: () => t(Pt(e, 1)), children: '>' }),
    ],
  });
}
function ta({
  isDisabled: e = !1,
  orientation: t = 'horizontal',
  min: r = 0,
  max: n = 100,
  step: o = 1,
  showMarks: s = !1,
  defaultValue: a,
  valueLabelDisplay: u = 'off',
  className: i,
  onChange: c,
  onChangeCommitted: d,
}) {
  return /* @__PURE__ */ R(Vr, {
    disabled: e,
    orientation: t,
    min: r,
    max: n,
    step: o,
    marks: s,
    defaultValue: a,
    valueLabelDisplay: u,
    className: `papi-slider ${t} ${i ?? ''}`,
    onChange: c,
    onChangeCommitted: d,
  });
}
function ra({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: r,
  onClose: n,
  anchorOrigin: o = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: s = {
    action: '',
    message: '',
    className: `papi-snackbar ${r ?? ''}`,
  },
  children: a,
}) {
  return /* @__PURE__ */ R(jr, {
    autoHideDuration: e,
    className: `papi-snackbar ${r ?? ''}`,
    open: t,
    onClose: n,
    anchorOrigin: o,
    ContentProps: s,
    children: a,
  });
}
function na({ isChecked: e, isDisabled: t = !1, hasError: r = !1, className: n, onChange: o }) {
  return /* @__PURE__ */ R(Lr, {
    checked: e,
    disabled: t,
    className: `papi-switch ${r ? 'error' : ''} ${n ?? ''}`,
    onChange: o,
  });
}
function $() {
  return (
    ($ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    $.apply(this, arguments)
  );
}
function Re(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function vr(e) {
  if (!Re(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((r) => {
      t[r] = vr(e[r]);
    }),
    t
  );
}
function le(
  e,
  t,
  r = {
    clone: !0,
  },
) {
  const n = r.clone ? $({}, e) : e;
  return (
    Re(e) &&
      Re(t) &&
      Object.keys(t).forEach((o) => {
        o !== '__proto__' &&
          (Re(t[o]) && o in e && Re(e[o])
            ? (n[o] = le(e[o], t[o], r))
            : r.clone
            ? (n[o] = Re(t[o]) ? vr(t[o]) : t[o])
            : (n[o] = t[o]));
      }),
    n
  );
}
function hn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var dt = { exports: {} },
  Ke = { exports: {} },
  D = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function mn() {
  if (It) return D;
  It = 1;
  var e = typeof Symbol == 'function' && Symbol.for,
    t = e ? Symbol.for('react.element') : 60103,
    r = e ? Symbol.for('react.portal') : 60106,
    n = e ? Symbol.for('react.fragment') : 60107,
    o = e ? Symbol.for('react.strict_mode') : 60108,
    s = e ? Symbol.for('react.profiler') : 60114,
    a = e ? Symbol.for('react.provider') : 60109,
    u = e ? Symbol.for('react.context') : 60110,
    i = e ? Symbol.for('react.async_mode') : 60111,
    c = e ? Symbol.for('react.concurrent_mode') : 60111,
    d = e ? Symbol.for('react.forward_ref') : 60112,
    h = e ? Symbol.for('react.suspense') : 60113,
    l = e ? Symbol.for('react.suspense_list') : 60120,
    b = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    p = e ? Symbol.for('react.block') : 60121,
    f = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    X = e ? Symbol.for('react.scope') : 60119;
  function H(g) {
    if (typeof g == 'object' && g !== null) {
      var W = g.$$typeof;
      switch (W) {
        case t:
          switch (((g = g.type), g)) {
            case i:
            case c:
            case n:
            case s:
            case o:
            case h:
              return g;
            default:
              switch (((g = g && g.$$typeof), g)) {
                case u:
                case d:
                case v:
                case b:
                case a:
                  return g;
                default:
                  return W;
              }
          }
        case r:
          return W;
      }
    }
  }
  function I(g) {
    return H(g) === c;
  }
  return (
    (D.AsyncMode = i),
    (D.ConcurrentMode = c),
    (D.ContextConsumer = u),
    (D.ContextProvider = a),
    (D.Element = t),
    (D.ForwardRef = d),
    (D.Fragment = n),
    (D.Lazy = v),
    (D.Memo = b),
    (D.Portal = r),
    (D.Profiler = s),
    (D.StrictMode = o),
    (D.Suspense = h),
    (D.isAsyncMode = function (g) {
      return I(g) || H(g) === i;
    }),
    (D.isConcurrentMode = I),
    (D.isContextConsumer = function (g) {
      return H(g) === u;
    }),
    (D.isContextProvider = function (g) {
      return H(g) === a;
    }),
    (D.isElement = function (g) {
      return typeof g == 'object' && g !== null && g.$$typeof === t;
    }),
    (D.isForwardRef = function (g) {
      return H(g) === d;
    }),
    (D.isFragment = function (g) {
      return H(g) === n;
    }),
    (D.isLazy = function (g) {
      return H(g) === v;
    }),
    (D.isMemo = function (g) {
      return H(g) === b;
    }),
    (D.isPortal = function (g) {
      return H(g) === r;
    }),
    (D.isProfiler = function (g) {
      return H(g) === s;
    }),
    (D.isStrictMode = function (g) {
      return H(g) === o;
    }),
    (D.isSuspense = function (g) {
      return H(g) === h;
    }),
    (D.isValidElementType = function (g) {
      return (
        typeof g == 'string' ||
        typeof g == 'function' ||
        g === n ||
        g === c ||
        g === s ||
        g === o ||
        g === h ||
        g === l ||
        (typeof g == 'object' &&
          g !== null &&
          (g.$$typeof === v ||
            g.$$typeof === b ||
            g.$$typeof === a ||
            g.$$typeof === u ||
            g.$$typeof === d ||
            g.$$typeof === f ||
            g.$$typeof === T ||
            g.$$typeof === X ||
            g.$$typeof === p))
      );
    }),
    (D.typeOf = H),
    D
  );
}
var V = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bt;
function gn() {
  return (
    Bt ||
      ((Bt = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = typeof Symbol == 'function' && Symbol.for,
            t = e ? Symbol.for('react.element') : 60103,
            r = e ? Symbol.for('react.portal') : 60106,
            n = e ? Symbol.for('react.fragment') : 60107,
            o = e ? Symbol.for('react.strict_mode') : 60108,
            s = e ? Symbol.for('react.profiler') : 60114,
            a = e ? Symbol.for('react.provider') : 60109,
            u = e ? Symbol.for('react.context') : 60110,
            i = e ? Symbol.for('react.async_mode') : 60111,
            c = e ? Symbol.for('react.concurrent_mode') : 60111,
            d = e ? Symbol.for('react.forward_ref') : 60112,
            h = e ? Symbol.for('react.suspense') : 60113,
            l = e ? Symbol.for('react.suspense_list') : 60120,
            b = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            p = e ? Symbol.for('react.block') : 60121,
            f = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            X = e ? Symbol.for('react.scope') : 60119;
          function H(y) {
            return (
              typeof y == 'string' ||
              typeof y == 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
              y === n ||
              y === c ||
              y === s ||
              y === o ||
              y === h ||
              y === l ||
              (typeof y == 'object' &&
                y !== null &&
                (y.$$typeof === v ||
                  y.$$typeof === b ||
                  y.$$typeof === a ||
                  y.$$typeof === u ||
                  y.$$typeof === d ||
                  y.$$typeof === f ||
                  y.$$typeof === T ||
                  y.$$typeof === X ||
                  y.$$typeof === p))
            );
          }
          function I(y) {
            if (typeof y == 'object' && y !== null) {
              var ee = y.$$typeof;
              switch (ee) {
                case t:
                  var E = y.type;
                  switch (E) {
                    case i:
                    case c:
                    case n:
                    case s:
                    case o:
                    case h:
                      return E;
                    default:
                      var Te = E && E.$$typeof;
                      switch (Te) {
                        case u:
                        case d:
                        case v:
                        case b:
                        case a:
                          return Te;
                        default:
                          return ee;
                      }
                  }
                case r:
                  return ee;
              }
            }
          }
          var g = i,
            W = c,
            ne = u,
            he = a,
            ae = t,
            z = d,
            Y = n,
            me = v,
            ge = b,
            oe = r,
            ie = s,
            Q = o,
            ce = h,
            ve = !1;
          function Se(y) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              m(y) || I(y) === i
            );
          }
          function m(y) {
            return I(y) === c;
          }
          function N(y) {
            return I(y) === u;
          }
          function O(y) {
            return I(y) === a;
          }
          function k(y) {
            return typeof y == 'object' && y !== null && y.$$typeof === t;
          }
          function S(y) {
            return I(y) === d;
          }
          function A(y) {
            return I(y) === n;
          }
          function x(y) {
            return I(y) === v;
          }
          function _(y) {
            return I(y) === b;
          }
          function P(y) {
            return I(y) === r;
          }
          function B(y) {
            return I(y) === s;
          }
          function M(y) {
            return I(y) === o;
          }
          function q(y) {
            return I(y) === h;
          }
          (V.AsyncMode = g),
            (V.ConcurrentMode = W),
            (V.ContextConsumer = ne),
            (V.ContextProvider = he),
            (V.Element = ae),
            (V.ForwardRef = z),
            (V.Fragment = Y),
            (V.Lazy = me),
            (V.Memo = ge),
            (V.Portal = oe),
            (V.Profiler = ie),
            (V.StrictMode = Q),
            (V.Suspense = ce),
            (V.isAsyncMode = Se),
            (V.isConcurrentMode = m),
            (V.isContextConsumer = N),
            (V.isContextProvider = O),
            (V.isElement = k),
            (V.isForwardRef = S),
            (V.isFragment = A),
            (V.isLazy = x),
            (V.isMemo = _),
            (V.isPortal = P),
            (V.isProfiler = B),
            (V.isStrictMode = M),
            (V.isSuspense = q),
            (V.isValidElementType = H),
            (V.typeOf = I);
        })()),
    V
  );
}
var Dt;
function Nr() {
  return (
    Dt ||
      ((Dt = 1), process.env.NODE_ENV === 'production' ? (Ke.exports = mn()) : (Ke.exports = gn())),
    Ke.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var st, Vt;
function yn() {
  if (Vt) return st;
  Vt = 1;
  var e = Object.getOwnPropertySymbols,
    t = Object.prototype.hasOwnProperty,
    r = Object.prototype.propertyIsEnumerable;
  function n(s) {
    if (s == null) throw new TypeError('Object.assign cannot be called with null or undefined');
    return Object(s);
  }
  function o() {
    try {
      if (!Object.assign) return !1;
      var s = new String('abc');
      if (((s[5] = 'de'), Object.getOwnPropertyNames(s)[0] === '5')) return !1;
      for (var a = {}, u = 0; u < 10; u++) a['_' + String.fromCharCode(u)] = u;
      var i = Object.getOwnPropertyNames(a).map(function (d) {
        return a[d];
      });
      if (i.join('') !== '0123456789') return !1;
      var c = {};
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (d) {
          c[d] = d;
        }),
        Object.keys(Object.assign({}, c)).join('') === 'abcdefghijklmnopqrst'
      );
    } catch {
      return !1;
    }
  }
  return (
    (st = o()
      ? Object.assign
      : function (s, a) {
          for (var u, i = n(s), c, d = 1; d < arguments.length; d++) {
            u = Object(arguments[d]);
            for (var h in u) t.call(u, h) && (i[h] = u[h]);
            if (e) {
              c = e(u);
              for (var l = 0; l < c.length; l++) r.call(u, c[l]) && (i[c[l]] = u[c[l]]);
            }
          }
          return i;
        }),
    st
  );
}
var at, jt;
function yt() {
  if (jt) return at;
  jt = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (at = e), at;
}
var it, Lt;
function Er() {
  return Lt || ((Lt = 1), (it = Function.call.bind(Object.prototype.hasOwnProperty))), it;
}
var ct, Ft;
function bn() {
  if (Ft) return ct;
  Ft = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = yt(),
      r = {},
      n = Er();
    e = function (s) {
      var a = 'Warning: ' + s;
      typeof console < 'u' && console.error(a);
      try {
        throw new Error(a);
      } catch {}
    };
  }
  function o(s, a, u, i, c) {
    if (process.env.NODE_ENV !== 'production') {
      for (var d in s)
        if (n(s, d)) {
          var h;
          try {
            if (typeof s[d] != 'function') {
              var l = Error(
                (i || 'React class') +
                  ': ' +
                  u +
                  ' type `' +
                  d +
                  '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
                  typeof s[d] +
                  '`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.',
              );
              throw ((l.name = 'Invariant Violation'), l);
            }
            h = s[d](a, d, i, u, null, t);
          } catch (v) {
            h = v;
          }
          if (
            (h &&
              !(h instanceof Error) &&
              e(
                (i || 'React class') +
                  ': type specification of ' +
                  u +
                  ' `' +
                  d +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof h +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            h instanceof Error && !(h.message in r))
          ) {
            r[h.message] = !0;
            var b = c ? c() : '';
            e('Failed ' + u + ' type: ' + h.message + (b ?? ''));
          }
        }
    }
  }
  return (
    (o.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (r = {});
    }),
    (ct = o),
    ct
  );
}
var ut, zt;
function vn() {
  if (zt) return ut;
  zt = 1;
  var e = Nr(),
    t = yn(),
    r = yt(),
    n = Er(),
    o = bn(),
    s = function () {};
  process.env.NODE_ENV !== 'production' &&
    (s = function (u) {
      var i = 'Warning: ' + u;
      typeof console < 'u' && console.error(i);
      try {
        throw new Error(i);
      } catch {}
    });
  function a() {
    return null;
  }
  return (
    (ut = function (u, i) {
      var c = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function h(m) {
        var N = m && ((c && m[c]) || m[d]);
        if (typeof N == 'function') return N;
      }
      var l = '<<anonymous>>',
        b = {
          array: T('array'),
          bigint: T('bigint'),
          bool: T('boolean'),
          func: T('function'),
          number: T('number'),
          object: T('object'),
          string: T('string'),
          symbol: T('symbol'),
          any: X(),
          arrayOf: H,
          element: I(),
          elementType: g(),
          instanceOf: W,
          node: z(),
          objectOf: he,
          oneOf: ne,
          oneOfType: ae,
          shape: me,
          exact: ge,
        };
      function v(m, N) {
        return m === N ? m !== 0 || 1 / m === 1 / N : m !== m && N !== N;
      }
      function p(m, N) {
        (this.message = m), (this.data = N && typeof N == 'object' ? N : {}), (this.stack = '');
      }
      p.prototype = Error.prototype;
      function f(m) {
        if (process.env.NODE_ENV !== 'production')
          var N = {},
            O = 0;
        function k(A, x, _, P, B, M, q) {
          if (((P = P || l), (M = M || _), q !== r)) {
            if (i) {
              var y = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((y.name = 'Invariant Violation'), y);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var ee = P + ':' + _;
              !N[ee] && // Avoid spamming the console because they are often not actionable except for lib authors
                O < 3 &&
                (s(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    M +
                    '` prop on `' +
                    P +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (N[ee] = !0),
                O++);
            }
          }
          return x[_] == null
            ? A
              ? x[_] === null
                ? new p(
                    'The ' +
                      B +
                      ' `' +
                      M +
                      '` is marked as required ' +
                      ('in `' + P + '`, but its value is `null`.'),
                  )
                : new p(
                    'The ' +
                      B +
                      ' `' +
                      M +
                      '` is marked as required in ' +
                      ('`' + P + '`, but its value is `undefined`.'),
                  )
              : null
            : m(x, _, P, B, M);
        }
        var S = k.bind(null, !1);
        return (S.isRequired = k.bind(null, !0)), S;
      }
      function T(m) {
        function N(O, k, S, A, x, _) {
          var P = O[k],
            B = Q(P);
          if (B !== m) {
            var M = ce(P);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type ' +
                ('`' + M + '` supplied to `' + S + '`, expected ') +
                ('`' + m + '`.'),
              { expectedType: m },
            );
          }
          return null;
        }
        return f(N);
      }
      function X() {
        return f(a);
      }
      function H(m) {
        function N(O, k, S, A, x) {
          if (typeof m != 'function')
            return new p(
              'Property `' +
                x +
                '` of component `' +
                S +
                '` has invalid PropType notation inside arrayOf.',
            );
          var _ = O[k];
          if (!Array.isArray(_)) {
            var P = Q(_);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type ' +
                ('`' + P + '` supplied to `' + S + '`, expected an array.'),
            );
          }
          for (var B = 0; B < _.length; B++) {
            var M = m(_, B, S, A, x + '[' + B + ']', r);
            if (M instanceof Error) return M;
          }
          return null;
        }
        return f(N);
      }
      function I() {
        function m(N, O, k, S, A) {
          var x = N[O];
          if (!u(x)) {
            var _ = Q(x);
            return new p(
              'Invalid ' +
                S +
                ' `' +
                A +
                '` of type ' +
                ('`' + _ + '` supplied to `' + k + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return f(m);
      }
      function g() {
        function m(N, O, k, S, A) {
          var x = N[O];
          if (!e.isValidElementType(x)) {
            var _ = Q(x);
            return new p(
              'Invalid ' +
                S +
                ' `' +
                A +
                '` of type ' +
                ('`' + _ + '` supplied to `' + k + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return f(m);
      }
      function W(m) {
        function N(O, k, S, A, x) {
          if (!(O[k] instanceof m)) {
            var _ = m.name || l,
              P = Se(O[k]);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type ' +
                ('`' + P + '` supplied to `' + S + '`, expected ') +
                ('instance of `' + _ + '`.'),
            );
          }
          return null;
        }
        return f(N);
      }
      function ne(m) {
        if (!Array.isArray(m))
          return (
            process.env.NODE_ENV !== 'production' &&
              (arguments.length > 1
                ? s(
                    'Invalid arguments supplied to oneOf, expected an array, got ' +
                      arguments.length +
                      ' arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).',
                  )
                : s('Invalid argument supplied to oneOf, expected an array.')),
            a
          );
        function N(O, k, S, A, x) {
          for (var _ = O[k], P = 0; P < m.length; P++) if (v(_, m[P])) return null;
          var B = JSON.stringify(m, function (q, y) {
            var ee = ce(y);
            return ee === 'symbol' ? String(y) : y;
          });
          return new p(
            'Invalid ' +
              A +
              ' `' +
              x +
              '` of value `' +
              String(_) +
              '` ' +
              ('supplied to `' + S + '`, expected one of ' + B + '.'),
          );
        }
        return f(N);
      }
      function he(m) {
        function N(O, k, S, A, x) {
          if (typeof m != 'function')
            return new p(
              'Property `' +
                x +
                '` of component `' +
                S +
                '` has invalid PropType notation inside objectOf.',
            );
          var _ = O[k],
            P = Q(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type ' +
                ('`' + P + '` supplied to `' + S + '`, expected an object.'),
            );
          for (var B in _)
            if (n(_, B)) {
              var M = m(_, B, S, A, x + '.' + B, r);
              if (M instanceof Error) return M;
            }
          return null;
        }
        return f(N);
      }
      function ae(m) {
        if (!Array.isArray(m))
          return (
            process.env.NODE_ENV !== 'production' &&
              s('Invalid argument supplied to oneOfType, expected an instance of array.'),
            a
          );
        for (var N = 0; N < m.length; N++) {
          var O = m[N];
          if (typeof O != 'function')
            return (
              s(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ve(O) +
                  ' at index ' +
                  N +
                  '.',
              ),
              a
            );
        }
        function k(S, A, x, _, P) {
          for (var B = [], M = 0; M < m.length; M++) {
            var q = m[M],
              y = q(S, A, x, _, P, r);
            if (y == null) return null;
            y.data && n(y.data, 'expectedType') && B.push(y.data.expectedType);
          }
          var ee = B.length > 0 ? ', expected one of type [' + B.join(', ') + ']' : '';
          return new p('Invalid ' + _ + ' `' + P + '` supplied to ' + ('`' + x + '`' + ee + '.'));
        }
        return f(k);
      }
      function z() {
        function m(N, O, k, S, A) {
          return oe(N[O])
            ? null
            : new p(
                'Invalid ' +
                  S +
                  ' `' +
                  A +
                  '` supplied to ' +
                  ('`' + k + '`, expected a ReactNode.'),
              );
        }
        return f(m);
      }
      function Y(m, N, O, k, S) {
        return new p(
          (m || 'React class') +
            ': ' +
            N +
            ' type `' +
            O +
            '.' +
            k +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            S +
            '`.',
        );
      }
      function me(m) {
        function N(O, k, S, A, x) {
          var _ = O[k],
            P = Q(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type `' +
                P +
                '` ' +
                ('supplied to `' + S + '`, expected `object`.'),
            );
          for (var B in m) {
            var M = m[B];
            if (typeof M != 'function') return Y(S, A, x, B, ce(M));
            var q = M(_, B, S, A, x + '.' + B, r);
            if (q) return q;
          }
          return null;
        }
        return f(N);
      }
      function ge(m) {
        function N(O, k, S, A, x) {
          var _ = O[k],
            P = Q(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                x +
                '` of type `' +
                P +
                '` ' +
                ('supplied to `' + S + '`, expected `object`.'),
            );
          var B = t({}, O[k], m);
          for (var M in B) {
            var q = m[M];
            if (n(m, M) && typeof q != 'function') return Y(S, A, x, M, ce(q));
            if (!q)
              return new p(
                'Invalid ' +
                  A +
                  ' `' +
                  x +
                  '` key `' +
                  M +
                  '` supplied to `' +
                  S +
                  '`.\nBad object: ' +
                  JSON.stringify(O[k], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(m), null, '  '),
              );
            var y = q(_, M, S, A, x + '.' + M, r);
            if (y) return y;
          }
          return null;
        }
        return f(N);
      }
      function oe(m) {
        switch (typeof m) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !m;
          case 'object':
            if (Array.isArray(m)) return m.every(oe);
            if (m === null || u(m)) return !0;
            var N = h(m);
            if (N) {
              var O = N.call(m),
                k;
              if (N !== m.entries) {
                for (; !(k = O.next()).done; ) if (!oe(k.value)) return !1;
              } else
                for (; !(k = O.next()).done; ) {
                  var S = k.value;
                  if (S && !oe(S[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function ie(m, N) {
        return m === 'symbol'
          ? !0
          : N
          ? N['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && N instanceof Symbol)
          : !1;
      }
      function Q(m) {
        var N = typeof m;
        return Array.isArray(m)
          ? 'array'
          : m instanceof RegExp
          ? 'object'
          : ie(N, m)
          ? 'symbol'
          : N;
      }
      function ce(m) {
        if (typeof m > 'u' || m === null) return '' + m;
        var N = Q(m);
        if (N === 'object') {
          if (m instanceof Date) return 'date';
          if (m instanceof RegExp) return 'regexp';
        }
        return N;
      }
      function ve(m) {
        var N = ce(m);
        switch (N) {
          case 'array':
          case 'object':
            return 'an ' + N;
          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + N;
          default:
            return N;
        }
      }
      function Se(m) {
        return !m.constructor || !m.constructor.name ? l : m.constructor.name;
      }
      return (
        (b.checkPropTypes = o), (b.resetWarningCache = o.resetWarningCache), (b.PropTypes = b), b
      );
    }),
    ut
  );
}
var lt, Ut;
function Nn() {
  if (Ut) return lt;
  Ut = 1;
  var e = yt();
  function t() {}
  function r() {}
  return (
    (r.resetWarningCache = t),
    (lt = function () {
      function n(a, u, i, c, d, h) {
        if (h !== e) {
          var l = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
          );
          throw ((l.name = 'Invariant Violation'), l);
        }
      }
      n.isRequired = n;
      function o() {
        return n;
      }
      var s = {
        array: n,
        bigint: n,
        bool: n,
        func: n,
        number: n,
        object: n,
        string: n,
        symbol: n,
        any: n,
        arrayOf: o,
        element: n,
        elementType: n,
        instanceOf: o,
        node: n,
        objectOf: o,
        oneOf: o,
        oneOfType: o,
        shape: o,
        exact: o,
        checkPropTypes: r,
        resetWarningCache: t,
      };
      return (s.PropTypes = s), s;
    }),
    lt
  );
}
if (process.env.NODE_ENV !== 'production') {
  var En = Nr(),
    Sn = !0;
  dt.exports = vn()(En.isElement, Sn);
} else dt.exports = Nn()();
var Tn = dt.exports;
const U = /* @__PURE__ */ hn(Tn);
function Pe(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let r = 1; r < arguments.length; r += 1) t += '&args[]=' + encodeURIComponent(arguments[r]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var pt = { exports: {} },
  j = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ht;
function xn() {
  if (Ht) return j;
  Ht = 1;
  var e = Symbol.for('react.element'),
    t = Symbol.for('react.portal'),
    r = Symbol.for('react.fragment'),
    n = Symbol.for('react.strict_mode'),
    o = Symbol.for('react.profiler'),
    s = Symbol.for('react.provider'),
    a = Symbol.for('react.context'),
    u = Symbol.for('react.server_context'),
    i = Symbol.for('react.forward_ref'),
    c = Symbol.for('react.suspense'),
    d = Symbol.for('react.suspense_list'),
    h = Symbol.for('react.memo'),
    l = Symbol.for('react.lazy'),
    b = Symbol.for('react.offscreen'),
    v;
  v = Symbol.for('react.module.reference');
  function p(f) {
    if (typeof f == 'object' && f !== null) {
      var T = f.$$typeof;
      switch (T) {
        case e:
          switch (((f = f.type), f)) {
            case r:
            case o:
            case n:
            case c:
            case d:
              return f;
            default:
              switch (((f = f && f.$$typeof), f)) {
                case u:
                case a:
                case i:
                case l:
                case h:
                case s:
                  return f;
                default:
                  return T;
              }
          }
        case t:
          return T;
      }
    }
  }
  return (
    (j.ContextConsumer = a),
    (j.ContextProvider = s),
    (j.Element = e),
    (j.ForwardRef = i),
    (j.Fragment = r),
    (j.Lazy = l),
    (j.Memo = h),
    (j.Portal = t),
    (j.Profiler = o),
    (j.StrictMode = n),
    (j.Suspense = c),
    (j.SuspenseList = d),
    (j.isAsyncMode = function () {
      return !1;
    }),
    (j.isConcurrentMode = function () {
      return !1;
    }),
    (j.isContextConsumer = function (f) {
      return p(f) === a;
    }),
    (j.isContextProvider = function (f) {
      return p(f) === s;
    }),
    (j.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (j.isForwardRef = function (f) {
      return p(f) === i;
    }),
    (j.isFragment = function (f) {
      return p(f) === r;
    }),
    (j.isLazy = function (f) {
      return p(f) === l;
    }),
    (j.isMemo = function (f) {
      return p(f) === h;
    }),
    (j.isPortal = function (f) {
      return p(f) === t;
    }),
    (j.isProfiler = function (f) {
      return p(f) === o;
    }),
    (j.isStrictMode = function (f) {
      return p(f) === n;
    }),
    (j.isSuspense = function (f) {
      return p(f) === c;
    }),
    (j.isSuspenseList = function (f) {
      return p(f) === d;
    }),
    (j.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === o ||
        f === n ||
        f === c ||
        f === d ||
        f === b ||
        (typeof f == 'object' &&
          f !== null &&
          (f.$$typeof === l ||
            f.$$typeof === h ||
            f.$$typeof === s ||
            f.$$typeof === a ||
            f.$$typeof === i ||
            f.$$typeof === v ||
            f.getModuleId !== void 0))
      );
    }),
    (j.typeOf = p),
    j
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
var Jt;
function kn() {
  return (
    Jt ||
      ((Jt = 1),
      process.env.NODE_ENV !== 'production' &&
        (function () {
          var e = Symbol.for('react.element'),
            t = Symbol.for('react.portal'),
            r = Symbol.for('react.fragment'),
            n = Symbol.for('react.strict_mode'),
            o = Symbol.for('react.profiler'),
            s = Symbol.for('react.provider'),
            a = Symbol.for('react.context'),
            u = Symbol.for('react.server_context'),
            i = Symbol.for('react.forward_ref'),
            c = Symbol.for('react.suspense'),
            d = Symbol.for('react.suspense_list'),
            h = Symbol.for('react.memo'),
            l = Symbol.for('react.lazy'),
            b = Symbol.for('react.offscreen'),
            v = !1,
            p = !1,
            f = !1,
            T = !1,
            X = !1,
            H;
          H = Symbol.for('react.module.reference');
          function I(E) {
            return !!(
              typeof E == 'string' ||
              typeof E == 'function' ||
              E === r ||
              E === o ||
              X ||
              E === n ||
              E === c ||
              E === d ||
              T ||
              E === b ||
              v ||
              p ||
              f ||
              (typeof E == 'object' &&
                E !== null &&
                (E.$$typeof === l ||
                  E.$$typeof === h ||
                  E.$$typeof === s ||
                  E.$$typeof === a ||
                  E.$$typeof === i || // This needs to include all possible module reference object
                  // types supported by any Flight configuration anywhere since
                  // we don't know which Flight build this will end up being used
                  // with.
                  E.$$typeof === H ||
                  E.getModuleId !== void 0))
            );
          }
          function g(E) {
            if (typeof E == 'object' && E !== null) {
              var Te = E.$$typeof;
              switch (Te) {
                case e:
                  var Je = E.type;
                  switch (Je) {
                    case r:
                    case o:
                    case n:
                    case c:
                    case d:
                      return Je;
                    default:
                      var _t = Je && Je.$$typeof;
                      switch (_t) {
                        case u:
                        case a:
                        case i:
                        case l:
                        case h:
                        case s:
                          return _t;
                        default:
                          return Te;
                      }
                  }
                case t:
                  return Te;
              }
            }
          }
          var W = a,
            ne = s,
            he = e,
            ae = i,
            z = r,
            Y = l,
            me = h,
            ge = t,
            oe = o,
            ie = n,
            Q = c,
            ce = d,
            ve = !1,
            Se = !1;
          function m(E) {
            return (
              ve ||
                ((ve = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function N(E) {
            return (
              Se ||
                ((Se = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function O(E) {
            return g(E) === a;
          }
          function k(E) {
            return g(E) === s;
          }
          function S(E) {
            return typeof E == 'object' && E !== null && E.$$typeof === e;
          }
          function A(E) {
            return g(E) === i;
          }
          function x(E) {
            return g(E) === r;
          }
          function _(E) {
            return g(E) === l;
          }
          function P(E) {
            return g(E) === h;
          }
          function B(E) {
            return g(E) === t;
          }
          function M(E) {
            return g(E) === o;
          }
          function q(E) {
            return g(E) === n;
          }
          function y(E) {
            return g(E) === c;
          }
          function ee(E) {
            return g(E) === d;
          }
          (L.ContextConsumer = W),
            (L.ContextProvider = ne),
            (L.Element = he),
            (L.ForwardRef = ae),
            (L.Fragment = z),
            (L.Lazy = Y),
            (L.Memo = me),
            (L.Portal = ge),
            (L.Profiler = oe),
            (L.StrictMode = ie),
            (L.Suspense = Q),
            (L.SuspenseList = ce),
            (L.isAsyncMode = m),
            (L.isConcurrentMode = N),
            (L.isContextConsumer = O),
            (L.isContextProvider = k),
            (L.isElement = S),
            (L.isForwardRef = A),
            (L.isFragment = x),
            (L.isLazy = _),
            (L.isMemo = P),
            (L.isPortal = B),
            (L.isProfiler = M),
            (L.isStrictMode = q),
            (L.isSuspense = y),
            (L.isSuspenseList = ee),
            (L.isValidElementType = I),
            (L.typeOf = g);
        })()),
    L
  );
}
process.env.NODE_ENV === 'production' ? (pt.exports = xn()) : (pt.exports = kn());
var Kt = pt.exports;
const _n = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function On(e) {
  const t = `${e}`.match(_n);
  return (t && t[1]) || '';
}
function Sr(e, t = '') {
  return e.displayName || e.name || On(e) || t;
}
function Gt(e, t, r) {
  const n = Sr(t);
  return e.displayName || (n !== '' ? `${r}(${n})` : r);
}
function Cn(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Sr(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Kt.ForwardRef:
          return Gt(e, e.render, 'ForwardRef');
        case Kt.Memo:
          return Gt(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function fe(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Pe(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Tr(e, t) {
  const r = $({}, t);
  return (
    Object.keys(e).forEach((n) => {
      if (n.toString().match(/^(components|slots)$/)) r[n] = $({}, e[n], r[n]);
      else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
        const o = e[n] || {},
          s = t[n];
        (r[n] = {}),
          !s || !Object.keys(s)
            ? (r[n] = o)
            : !o || !Object.keys(o)
            ? (r[n] = s)
            : ((r[n] = $({}, s)),
              Object.keys(o).forEach((a) => {
                r[n][a] = Tr(o[a], s[a]);
              }));
      } else r[n] === void 0 && (r[n] = e[n]);
    }),
    r
  );
}
function wn(e, t, r = void 0) {
  const n = {};
  return (
    Object.keys(e).forEach(
      // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
      // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
      (o) => {
        n[o] = e[o]
          .reduce((s, a) => {
            if (a) {
              const u = t(a);
              u !== '' && s.push(u), r && r[a] && s.push(r[a]);
            }
            return s;
          }, [])
          .join(' ');
      },
    ),
    n
  );
}
const Xt = (e) => e,
  $n = () => {
    let e = Xt;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = Xt;
      },
    };
  },
  Rn = $n(),
  An = Rn,
  Pn = {
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
function bt(e, t, r = 'Mui') {
  const n = Pn[t];
  return n ? `${r}-${n}` : `${An.generate(e)}-${t}`;
}
function Mn(e, t, r = 'Mui') {
  const n = {};
  return (
    t.forEach((o) => {
      n[o] = bt(e, o, r);
    }),
    n
  );
}
function pe(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    s;
  for (s = 0; s < n.length; s++) (o = n[s]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function xr(e) {
  var t,
    r,
    n = '';
  if (typeof e == 'string' || typeof e == 'number') n += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (r = xr(e[t])) && (n && (n += ' '), (n += r));
    else for (t in e) e[t] && (n && (n += ' '), (n += t));
  return n;
}
function In() {
  for (var e, t, r = 0, n = ''; r < arguments.length; )
    (e = arguments[r++]) && (t = xr(e)) && (n && (n += ' '), (n += t));
  return n;
}
/**
 * @mui/styled-engine v5.13.2
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Bn(e, t) {
  const r = Xr(e, t);
  return process.env.NODE_ENV !== 'production'
    ? (...n) => {
        const o = typeof e == 'string' ? `"${e}"` : 'component';
        return (
          n.length === 0
            ? console.error(
                [
                  `MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`,
                  'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
                ].join(`
`),
              )
            : n.some((s) => s === void 0) &&
              console.error(
                `MUI: the styled(${o})(...args) API requires all its args to be defined.`,
              ),
          r(...n)
        );
      }
    : r;
}
const Dn = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  Vn = ['values', 'unit', 'step'],
  jn = (e) => {
    const t =
      Object.keys(e).map((r) => ({
        key: r,
        val: e[r],
      })) || [];
    return (
      t.sort((r, n) => r.val - n.val),
      t.reduce(
        (r, n) =>
          $({}, r, {
            [n.key]: n.val,
          }),
        {},
      )
    );
  };
function Ln(e) {
  const {
      // The breakpoint **start** at this value.
      // For instance with the first breakpoint xs: [xs, sm).
      values: t = {
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
      unit: r = 'px',
      step: n = 5,
    } = e,
    o = pe(e, Vn),
    s = jn(t),
    a = Object.keys(s);
  function u(l) {
    return `@media (min-width:${typeof t[l] == 'number' ? t[l] : l}${r})`;
  }
  function i(l) {
    return `@media (max-width:${(typeof t[l] == 'number' ? t[l] : l) - n / 100}${r})`;
  }
  function c(l, b) {
    const v = a.indexOf(b);
    return `@media (min-width:${typeof t[l] == 'number' ? t[l] : l}${r}) and (max-width:${
      (v !== -1 && typeof t[a[v]] == 'number' ? t[a[v]] : b) - n / 100
    }${r})`;
  }
  function d(l) {
    return a.indexOf(l) + 1 < a.length ? c(l, a[a.indexOf(l) + 1]) : u(l);
  }
  function h(l) {
    const b = a.indexOf(l);
    return b === 0
      ? u(a[1])
      : b === a.length - 1
      ? i(a[b])
      : c(l, a[a.indexOf(l) + 1]).replace('@media', '@media not all and');
  }
  return $(
    {
      keys: a,
      values: s,
      up: u,
      down: i,
      between: c,
      only: d,
      not: h,
      unit: r,
    },
    o,
  );
}
const Fn = {
    borderRadius: 4,
  },
  zn = Fn,
  Un =
    process.env.NODE_ENV !== 'production'
      ? U.oneOfType([U.number, U.string, U.object, U.array])
      : {},
  be = Un;
function je(e, t) {
  return t
    ? le(e, t, {
        clone: !1,
        // No need to clone deep, it's way faster.
      })
    : e;
}
const vt = {
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
  qt = {
    // Sorted ASC by size. That's important.
    // It can't be configured as it's used statically for propTypes.
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: (e) => `@media (min-width:${vt[e]}px)`,
  };
function de(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const s = n.breakpoints || qt;
    return t.reduce((a, u, i) => ((a[s.up(s.keys[i])] = r(t[i])), a), {});
  }
  if (typeof t == 'object') {
    const s = n.breakpoints || qt;
    return Object.keys(t).reduce((a, u) => {
      if (Object.keys(s.values || vt).indexOf(u) !== -1) {
        const i = s.up(u);
        a[i] = r(t[u], u);
      } else {
        const i = u;
        a[i] = t[i];
      }
      return a;
    }, {});
  }
  return r(t);
}
function Hn(e = {}) {
  var t;
  return (
    ((t = e.keys) == null
      ? void 0
      : t.reduce((n, o) => {
          const s = e.up(o);
          return (n[s] = {}), n;
        }, {})) || {}
  );
}
function Jn(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function We(e, t, r = !0) {
  if (!t || typeof t != 'string') return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split('.').reduce((o, s) => (o && o[s] ? o[s] : null), e);
    if (n != null) return n;
  }
  return t.split('.').reduce((n, o) => (n && n[o] != null ? n[o] : null), e);
}
function qe(e, t, r, n = r) {
  let o;
  return (
    typeof e == 'function' ? (o = e(r)) : Array.isArray(e) ? (o = e[r] || n) : (o = We(e, r) || n),
    t && (o = t(o, n, e)),
    o
  );
}
function F(e) {
  const { prop: t, cssProperty: r = e.prop, themeKey: n, transform: o } = e,
    s = (a) => {
      if (a[t] == null) return null;
      const u = a[t],
        i = a.theme,
        c = We(i, n) || {};
      return de(a, u, (h) => {
        let l = qe(c, o, h);
        return (
          h === l &&
            typeof h == 'string' &&
            (l = qe(c, o, `${t}${h === 'default' ? '' : fe(h)}`, h)),
          r === !1
            ? l
            : {
                [r]: l,
              }
        );
      });
    };
  return (
    (s.propTypes =
      process.env.NODE_ENV !== 'production'
        ? {
            [t]: be,
          }
        : {}),
    (s.filterProps = [t]),
    s
  );
}
function Kn(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const Gn = {
    m: 'margin',
    p: 'padding',
  },
  Xn = {
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
  },
  Wt = {
    marginX: 'mx',
    marginY: 'my',
    paddingX: 'px',
    paddingY: 'py',
  },
  qn = Kn((e) => {
    if (e.length > 2)
      if (Wt[e]) e = Wt[e];
      else return [e];
    const [t, r] = e.split(''),
      n = Gn[t],
      o = Xn[r] || '';
    return Array.isArray(o) ? o.map((s) => n + s) : [n + o];
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
  Wn = [...Ye, ...Ze];
function Ue(e, t, r, n) {
  var o;
  const s = (o = We(e, t, !1)) != null ? o : r;
  return typeof s == 'number'
    ? (a) =>
        typeof a == 'string'
          ? a
          : (process.env.NODE_ENV !== 'production' &&
              typeof a != 'number' &&
              console.error(`MUI: Expected ${n} argument to be a number or a string, got ${a}.`),
            s * a)
    : Array.isArray(s)
    ? (a) =>
        typeof a == 'string'
          ? a
          : (process.env.NODE_ENV !== 'production' &&
              (Number.isInteger(a)
                ? a > s.length - 1 &&
                  console.error(
                    [
                      `MUI: The value provided (${a}) overflows.`,
                      `The supported values are: ${JSON.stringify(s)}.`,
                      `${a} > ${s.length - 1}, you need to add the missing values.`,
                    ].join(`
`),
                  )
                : console.error(
                    [
                      `MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`,
                    ].join(`
`),
                  )),
            s[a])
    : typeof s == 'function'
    ? s
    : (process.env.NODE_ENV !== 'production' &&
        console.error(
          [
            `MUI: The \`theme.${t}\` value (${s}) is invalid.`,
            'It should be a number, an array or a function.',
          ].join(`
`),
        ),
      () => {});
}
function kr(e) {
  return Ue(e, 'spacing', 8, 'spacing');
}
function He(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const r = Math.abs(t),
    n = e(r);
  return t >= 0 ? n : typeof n == 'number' ? -n : `-${n}`;
}
function Yn(e, t) {
  return (r) => e.reduce((n, o) => ((n[o] = He(t, r)), n), {});
}
function Zn(e, t, r, n) {
  if (t.indexOf(r) === -1) return null;
  const o = qn(r),
    s = Yn(o, n),
    a = e[r];
  return de(e, a, s);
}
function _r(e, t) {
  const r = kr(e.theme);
  return Object.keys(e)
    .map((n) => Zn(e, t, n, r))
    .reduce(je, {});
}
function K(e) {
  return _r(e, Ye);
}
K.propTypes =
  process.env.NODE_ENV !== 'production' ? Ye.reduce((e, t) => ((e[t] = be), e), {}) : {};
K.filterProps = Ye;
function G(e) {
  return _r(e, Ze);
}
G.propTypes =
  process.env.NODE_ENV !== 'production' ? Ze.reduce((e, t) => ((e[t] = be), e), {}) : {};
G.filterProps = Ze;
process.env.NODE_ENV !== 'production' && Wn.reduce((e, t) => ((e[t] = be), e), {});
function Qn(e = 8) {
  if (e.mui) return e;
  const t = kr({
      spacing: e,
    }),
    r = (...n) => (
      process.env.NODE_ENV !== 'production' &&
        (n.length <= 4 ||
          console.error(
            `MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`,
          )),
      (n.length === 0 ? [1] : n)
        .map((s) => {
          const a = t(s);
          return typeof a == 'number' ? `${a}px` : a;
        })
        .join(' ')
    );
  return (r.mui = !0), r;
}
function Qe(...e) {
  const t = e.reduce(
      (n, o) => (
        o.filterProps.forEach((s) => {
          n[s] = o;
        }),
        n
      ),
      {},
    ),
    r = (n) => Object.keys(n).reduce((o, s) => (t[s] ? je(o, t[s](n)) : o), {});
  return (
    (r.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((n, o) => Object.assign(n, o.propTypes), {})
        : {}),
    (r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), [])),
    r
  );
}
function se(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const eo = F({
    prop: 'border',
    themeKey: 'borders',
    transform: se,
  }),
  to = F({
    prop: 'borderTop',
    themeKey: 'borders',
    transform: se,
  }),
  ro = F({
    prop: 'borderRight',
    themeKey: 'borders',
    transform: se,
  }),
  no = F({
    prop: 'borderBottom',
    themeKey: 'borders',
    transform: se,
  }),
  oo = F({
    prop: 'borderLeft',
    themeKey: 'borders',
    transform: se,
  }),
  so = F({
    prop: 'borderColor',
    themeKey: 'palette',
  }),
  ao = F({
    prop: 'borderTopColor',
    themeKey: 'palette',
  }),
  io = F({
    prop: 'borderRightColor',
    themeKey: 'palette',
  }),
  co = F({
    prop: 'borderBottomColor',
    themeKey: 'palette',
  }),
  uo = F({
    prop: 'borderLeftColor',
    themeKey: 'palette',
  }),
  et = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = Ue(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        r = (n) => ({
          borderRadius: He(t, n),
        });
      return de(e, e.borderRadius, r);
    }
    return null;
  };
et.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        borderRadius: be,
      }
    : {};
et.filterProps = ['borderRadius'];
Qe(eo, to, ro, no, oo, so, ao, io, co, uo, et);
const tt = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Ue(e.theme, 'spacing', 8, 'gap'),
      r = (n) => ({
        gap: He(t, n),
      });
    return de(e, e.gap, r);
  }
  return null;
};
tt.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        gap: be,
      }
    : {};
tt.filterProps = ['gap'];
const rt = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Ue(e.theme, 'spacing', 8, 'columnGap'),
      r = (n) => ({
        columnGap: He(t, n),
      });
    return de(e, e.columnGap, r);
  }
  return null;
};
rt.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        columnGap: be,
      }
    : {};
rt.filterProps = ['columnGap'];
const nt = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Ue(e.theme, 'spacing', 8, 'rowGap'),
      r = (n) => ({
        rowGap: He(t, n),
      });
    return de(e, e.rowGap, r);
  }
  return null;
};
nt.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        rowGap: be,
      }
    : {};
nt.filterProps = ['rowGap'];
const lo = F({
    prop: 'gridColumn',
  }),
  fo = F({
    prop: 'gridRow',
  }),
  po = F({
    prop: 'gridAutoFlow',
  }),
  ho = F({
    prop: 'gridAutoColumns',
  }),
  mo = F({
    prop: 'gridAutoRows',
  }),
  go = F({
    prop: 'gridTemplateColumns',
  }),
  yo = F({
    prop: 'gridTemplateRows',
  }),
  bo = F({
    prop: 'gridTemplateAreas',
  }),
  vo = F({
    prop: 'gridArea',
  });
Qe(tt, rt, nt, lo, fo, po, ho, mo, go, yo, bo, vo);
function Ae(e, t) {
  return t === 'grey' ? t : e;
}
const No = F({
    prop: 'color',
    themeKey: 'palette',
    transform: Ae,
  }),
  Eo = F({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  }),
  So = F({
    prop: 'backgroundColor',
    themeKey: 'palette',
    transform: Ae,
  });
Qe(No, Eo, So);
function Z(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const To = F({
    prop: 'width',
    transform: Z,
  }),
  Nt = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const t = (r) => {
        var n;
        return {
          maxWidth:
            ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null
              ? void 0
              : n[r]) ||
            vt[r] ||
            Z(r),
        };
      };
      return de(e, e.maxWidth, t);
    }
    return null;
  };
Nt.filterProps = ['maxWidth'];
const xo = F({
    prop: 'minWidth',
    transform: Z,
  }),
  ko = F({
    prop: 'height',
    transform: Z,
  }),
  _o = F({
    prop: 'maxHeight',
    transform: Z,
  }),
  Oo = F({
    prop: 'minHeight',
    transform: Z,
  });
F({
  prop: 'size',
  cssProperty: 'width',
  transform: Z,
});
F({
  prop: 'size',
  cssProperty: 'height',
  transform: Z,
});
const Co = F({
  prop: 'boxSizing',
});
Qe(To, Nt, xo, ko, _o, Oo, Co);
const wo = {
    // borders
    border: {
      themeKey: 'borders',
      transform: se,
    },
    borderTop: {
      themeKey: 'borders',
      transform: se,
    },
    borderRight: {
      themeKey: 'borders',
      transform: se,
    },
    borderBottom: {
      themeKey: 'borders',
      transform: se,
    },
    borderLeft: {
      themeKey: 'borders',
      transform: se,
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
      style: et,
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
      style: G,
    },
    pt: {
      style: G,
    },
    pr: {
      style: G,
    },
    pb: {
      style: G,
    },
    pl: {
      style: G,
    },
    px: {
      style: G,
    },
    py: {
      style: G,
    },
    padding: {
      style: G,
    },
    paddingTop: {
      style: G,
    },
    paddingRight: {
      style: G,
    },
    paddingBottom: {
      style: G,
    },
    paddingLeft: {
      style: G,
    },
    paddingX: {
      style: G,
    },
    paddingY: {
      style: G,
    },
    paddingInline: {
      style: G,
    },
    paddingInlineStart: {
      style: G,
    },
    paddingInlineEnd: {
      style: G,
    },
    paddingBlock: {
      style: G,
    },
    paddingBlockStart: {
      style: G,
    },
    paddingBlockEnd: {
      style: G,
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
      style: tt,
    },
    rowGap: {
      style: nt,
    },
    columnGap: {
      style: rt,
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
      transform: Z,
    },
    maxWidth: {
      style: Nt,
    },
    minWidth: {
      transform: Z,
    },
    height: {
      transform: Z,
    },
    maxHeight: {
      transform: Z,
    },
    minHeight: {
      transform: Z,
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
  Et = wo;
function $o(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []),
    r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Ro(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Ao() {
  function e(r, n, o, s) {
    const a = {
        [r]: n,
        theme: o,
      },
      u = s[r];
    if (!u)
      return {
        [r]: n,
      };
    const { cssProperty: i = r, themeKey: c, transform: d, style: h } = u;
    if (n == null) return null;
    if (c === 'typography' && n === 'inherit')
      return {
        [r]: n,
      };
    const l = We(o, c) || {};
    return h
      ? h(a)
      : de(a, n, (v) => {
          let p = qe(l, d, v);
          return (
            v === p &&
              typeof v == 'string' &&
              (p = qe(l, d, `${r}${v === 'default' ? '' : fe(v)}`, v)),
            i === !1
              ? p
              : {
                  [i]: p,
                }
          );
        });
  }
  function t(r) {
    var n;
    const { sx: o, theme: s = {} } = r || {};
    if (!o) return null;
    const a = (n = s.unstable_sxConfig) != null ? n : Et;
    function u(i) {
      let c = i;
      if (typeof i == 'function') c = i(s);
      else if (typeof i != 'object') return i;
      if (!c) return null;
      const d = Hn(s.breakpoints),
        h = Object.keys(d);
      let l = d;
      return (
        Object.keys(c).forEach((b) => {
          const v = Ro(c[b], s);
          if (v != null)
            if (typeof v == 'object')
              if (a[b]) l = je(l, e(b, v, s, a));
              else {
                const p = de(
                  {
                    theme: s,
                  },
                  v,
                  (f) => ({
                    [b]: f,
                  }),
                );
                $o(p, v)
                  ? (l[b] = t({
                      sx: v,
                      theme: s,
                    }))
                  : (l = je(l, p));
              }
            else l = je(l, e(b, v, s, a));
        }),
        Jn(h, l)
      );
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return t;
}
const Or = Ao();
Or.filterProps = ['sx'];
const St = Or,
  Po = ['breakpoints', 'palette', 'spacing', 'shape'];
function Tt(e = {}, ...t) {
  const { breakpoints: r = {}, palette: n = {}, spacing: o, shape: s = {} } = e,
    a = pe(e, Po),
    u = Ln(r),
    i = Qn(o);
  let c = le(
    {
      breakpoints: u,
      direction: 'ltr',
      components: {},
      // Inject component definitions.
      palette: $(
        {
          mode: 'light',
        },
        n,
      ),
      spacing: i,
      shape: $({}, zn, s),
    },
    a,
  );
  return (
    (c = t.reduce((d, h) => le(d, h), c)),
    (c.unstable_sxConfig = $({}, Et, a == null ? void 0 : a.unstable_sxConfig)),
    (c.unstable_sx = function (h) {
      return St({
        sx: h,
        theme: this,
      });
    }),
    c
  );
}
function Mo(e) {
  return Object.keys(e).length === 0;
}
function Io(e = null) {
  const t = Le.useContext(Gr);
  return !t || Mo(t) ? e : t;
}
const Bo = Tt();
function Do(e = Bo) {
  return Io(e);
}
const Vo = ['variant'];
function Yt(e) {
  return e.length === 0;
}
function Cr(e) {
  const { variant: t } = e,
    r = pe(e, Vo);
  let n = t || '';
  return (
    Object.keys(r)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (n += Yt(n) ? e[o] : fe(e[o]))
          : (n += `${Yt(n) ? o : fe(o)}${fe(e[o].toString())}`);
      }),
    n
  );
}
const jo = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function Lo(e) {
  return Object.keys(e).length === 0;
}
function Fo(e) {
  return (
    typeof e == 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    e.charCodeAt(0) > 96
  );
}
const zo = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Uo = (e, t) => {
    let r = [];
    t &&
      t.components &&
      t.components[e] &&
      t.components[e].variants &&
      (r = t.components[e].variants);
    const n = {};
    return (
      r.forEach((o) => {
        const s = Cr(o.props);
        n[s] = o.style;
      }),
      n
    );
  },
  Ho = (e, t, r, n) => {
    var o;
    const { ownerState: s = {} } = e,
      a = [],
      u = r == null || (o = r.components) == null || (o = o[n]) == null ? void 0 : o.variants;
    return (
      u &&
        u.forEach((i) => {
          let c = !0;
          Object.keys(i.props).forEach((d) => {
            s[d] !== i.props[d] && e[d] !== i.props[d] && (c = !1);
          }),
            c && a.push(t[Cr(i.props)]);
        }),
      a
    );
  };
function Xe(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Jo = Tt(),
  Ko = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function De({ defaultTheme: e, theme: t, themeId: r }) {
  return Lo(t) ? e : t[r] || t;
}
function Go(e = {}) {
  const {
      themeId: t,
      defaultTheme: r = Jo,
      rootShouldForwardProp: n = Xe,
      slotShouldForwardProp: o = Xe,
    } = e,
    s = (a) =>
      St(
        $({}, a, {
          theme: De(
            $({}, a, {
              defaultTheme: r,
              themeId: t,
            }),
          ),
        }),
      );
  return (
    (s.__mui_systemSx = !0),
    (a, u = {}) => {
      Dn(a, (I) => I.filter((g) => !(g != null && g.__mui_systemSx)));
      const { name: i, slot: c, skipVariantsResolver: d, skipSx: h, overridesResolver: l } = u,
        b = pe(u, jo),
        v = d !== void 0 ? d : (c && c !== 'Root') || !1,
        p = h || !1;
      let f;
      process.env.NODE_ENV !== 'production' && i && (f = `${i}-${Ko(c || 'Root')}`);
      let T = Xe;
      c === 'Root' ? (T = n) : c ? (T = o) : Fo(a) && (T = void 0);
      const X = Bn(
          a,
          $(
            {
              shouldForwardProp: T,
              label: f,
            },
            b,
          ),
        ),
        H = (I, ...g) => {
          const W = g
            ? g.map((z) =>
                typeof z == 'function' && z.__emotion_real !== z
                  ? (Y) =>
                      z(
                        $({}, Y, {
                          theme: De(
                            $({}, Y, {
                              defaultTheme: r,
                              themeId: t,
                            }),
                          ),
                        }),
                      )
                  : z,
              )
            : [];
          let ne = I;
          i &&
            l &&
            W.push((z) => {
              const Y = De(
                  $({}, z, {
                    defaultTheme: r,
                    themeId: t,
                  }),
                ),
                me = zo(i, Y);
              if (me) {
                const ge = {};
                return (
                  Object.entries(me).forEach(([oe, ie]) => {
                    ge[oe] =
                      typeof ie == 'function'
                        ? ie(
                            $({}, z, {
                              theme: Y,
                            }),
                          )
                        : ie;
                  }),
                  l(z, ge)
                );
              }
              return null;
            }),
            i &&
              !v &&
              W.push((z) => {
                const Y = De(
                  $({}, z, {
                    defaultTheme: r,
                    themeId: t,
                  }),
                );
                return Ho(z, Uo(i, Y), Y, i);
              }),
            p || W.push(s);
          const he = W.length - g.length;
          if (Array.isArray(I) && he > 0) {
            const z = new Array(he).fill('');
            (ne = [...I, ...z]), (ne.raw = [...I.raw, ...z]);
          } else
            typeof I == 'function' && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
              // component stays as a function. This condition makes sure that we do not interpolate functions
              // which are basically components used as a selectors.
              I.__emotion_real !== I &&
              (ne = (z) =>
                I(
                  $({}, z, {
                    theme: De(
                      $({}, z, {
                        defaultTheme: r,
                        themeId: t,
                      }),
                    ),
                  }),
                ));
          const ae = X(ne, ...W);
          if (process.env.NODE_ENV !== 'production') {
            let z;
            i && (z = `${i}${c || ''}`),
              z === void 0 && (z = `Styled(${Cn(a)})`),
              (ae.displayName = z);
          }
          return a.muiName && (ae.muiName = a.muiName), ae;
        };
      return X.withConfig && (H.withConfig = X.withConfig), H;
    }
  );
}
function Xo(e) {
  const { theme: t, name: r, props: n } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps
    ? n
    : Tr(t.components[r].defaultProps, n);
}
function qo({ props: e, name: t, defaultTheme: r, themeId: n }) {
  let o = Do(r);
  return (
    n && (o = o[n] || o),
    Xo({
      theme: o,
      name: t,
      props: e,
    })
  );
}
function wr(e, t = 0, r = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > r) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),
    Math.min(Math.max(t, e), r)
  );
}
function Wo(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, 'g');
  let r = e.match(t);
  return (
    r && r[0].length === 1 && (r = r.map((n) => n + n)),
    r
      ? `rgb${r.length === 4 ? 'a' : ''}(${r
          .map((n, o) =>
            o < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1e3) / 1e3,
          )
          .join(', ')})`
      : ''
  );
}
function Me(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return Me(Wo(e));
  const t = e.indexOf('('),
    r = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(r) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Pe(9, e),
    );
  let n = e.substring(t + 1, e.length - 1),
    o;
  if (r === 'color') {
    if (
      ((n = n.split(' ')),
      (o = n.shift()),
      n.length === 4 && n[3].charAt(0) === '/' && (n[3] = n[3].slice(1)),
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(o) === -1)
    )
      throw new Error(
        process.env.NODE_ENV !== 'production'
          ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
          : Pe(10, o),
      );
  } else n = n.split(',');
  return (
    (n = n.map((s) => parseFloat(s))),
    {
      type: r,
      values: n,
      colorSpace: o,
    }
  );
}
function xt(e) {
  const { type: t, colorSpace: r } = e;
  let { values: n } = e;
  return (
    t.indexOf('rgb') !== -1
      ? (n = n.map((o, s) => (s < 3 ? parseInt(o, 10) : o)))
      : t.indexOf('hsl') !== -1 && ((n[1] = `${n[1]}%`), (n[2] = `${n[2]}%`)),
    t.indexOf('color') !== -1 ? (n = `${r} ${n.join(' ')}`) : (n = `${n.join(', ')}`),
    `${t}(${n})`
  );
}
function Yo(e) {
  e = Me(e);
  const { values: t } = e,
    r = t[0],
    n = t[1] / 100,
    o = t[2] / 100,
    s = n * Math.min(o, 1 - o),
    a = (c, d = (c + r / 30) % 12) => o - s * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let u = 'rgb';
  const i = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return (
    e.type === 'hsla' && ((u += 'a'), i.push(t[3])),
    xt({
      type: u,
      values: i,
    })
  );
}
function Zt(e) {
  e = Me(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? Me(Yo(e)).values : e.values;
  return (
    (t = t.map(
      (r) => (
        e.type !== 'color' && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Qt(e, t) {
  const r = Zt(e),
    n = Zt(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Zo(e, t) {
  if (((e = Me(e)), (t = wr(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] *= 1 - t;
  return xt(e);
}
function Qo(e, t) {
  if (((e = Me(e)), (t = wr(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] += (1 - e.values[r]) * t;
  return xt(e);
}
function es(e, t) {
  return $(
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
    t,
  );
}
const ts = {
    black: '#000',
    white: '#fff',
  },
  Fe = ts,
  rs = {
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
  ns = rs,
  os = {
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
  ke = os,
  ss = {
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
  _e = ss,
  as = {
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
  Ve = as,
  is = {
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
  Oe = is,
  cs = {
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
  Ce = cs,
  us = {
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
  we = us,
  ls = ['mode', 'contrastThreshold', 'tonalOffset'],
  er = {
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
      paper: Fe.white,
      default: Fe.white,
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
  ft = {
    text: {
      primary: Fe.white,
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
      active: Fe.white,
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
function tr(e, t, r, n) {
  const o = n.light || n,
    s = n.dark || n * 1.5;
  e[t] ||
    (e.hasOwnProperty(r)
      ? (e[t] = e[r])
      : t === 'light'
      ? (e.light = Qo(e.main, o))
      : t === 'dark' && (e.dark = Zo(e.main, s)));
}
function fs(e = 'light') {
  return e === 'dark'
    ? {
        main: Oe[200],
        light: Oe[50],
        dark: Oe[400],
      }
    : {
        main: Oe[700],
        light: Oe[400],
        dark: Oe[800],
      };
}
function ds(e = 'light') {
  return e === 'dark'
    ? {
        main: ke[200],
        light: ke[50],
        dark: ke[400],
      }
    : {
        main: ke[500],
        light: ke[300],
        dark: ke[700],
      };
}
function ps(e = 'light') {
  return e === 'dark'
    ? {
        main: _e[500],
        light: _e[300],
        dark: _e[700],
      }
    : {
        main: _e[700],
        light: _e[400],
        dark: _e[800],
      };
}
function hs(e = 'light') {
  return e === 'dark'
    ? {
        main: Ce[400],
        light: Ce[300],
        dark: Ce[700],
      }
    : {
        main: Ce[700],
        light: Ce[500],
        dark: Ce[900],
      };
}
function ms(e = 'light') {
  return e === 'dark'
    ? {
        main: we[400],
        light: we[300],
        dark: we[700],
      }
    : {
        main: we[800],
        light: we[500],
        dark: we[900],
      };
}
function gs(e = 'light') {
  return e === 'dark'
    ? {
        main: Ve[400],
        light: Ve[300],
        dark: Ve[700],
      }
    : {
        main: '#ed6c02',
        // closest to orange[800] that pass 3:1.
        light: Ve[500],
        dark: Ve[900],
      };
}
function ys(e) {
  const { mode: t = 'light', contrastThreshold: r = 3, tonalOffset: n = 0.2 } = e,
    o = pe(e, ls),
    s = e.primary || fs(t),
    a = e.secondary || ds(t),
    u = e.error || ps(t),
    i = e.info || hs(t),
    c = e.success || ms(t),
    d = e.warning || gs(t);
  function h(p) {
    const f = Qt(p, ft.text.primary) >= r ? ft.text.primary : er.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const T = Qt(p, f);
      T < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${T}:1 for ${f} on ${p}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return f;
  }
  const l = ({
      color: p,
      name: f,
      mainShade: T = 500,
      lightShade: X = 300,
      darkShade: H = 700,
    }) => {
      if (((p = $({}, p)), !p.main && p[T] && (p.main = p[T]), !p.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`
            : Pe(11, f ? ` (${f})` : '', T),
        );
      if (typeof p.main != 'string')
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(p.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`
            : Pe(12, f ? ` (${f})` : '', JSON.stringify(p.main)),
        );
      return (
        tr(p, 'light', X, n), tr(p, 'dark', H, n), p.contrastText || (p.contrastText = h(p.main)), p
      );
    },
    b = {
      dark: ft,
      light: er,
    };
  return (
    process.env.NODE_ENV !== 'production' &&
      (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    le(
      $(
        {
          // A collection of common colors.
          common: $({}, Fe),
          // prevent mutable object.
          // The palette mode, can be light or dark.
          mode: t,
          // The colors used to represent primary interface elements for a user.
          primary: l({
            color: s,
            name: 'primary',
          }),
          // The colors used to represent secondary interface elements for a user.
          secondary: l({
            color: a,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          // The colors used to represent interface elements that the user should be made aware of.
          error: l({
            color: u,
            name: 'error',
          }),
          // The colors used to represent potentially dangerous actions or important messages.
          warning: l({
            color: d,
            name: 'warning',
          }),
          // The colors used to present information to the user that is neutral and not necessarily important.
          info: l({
            color: i,
            name: 'info',
          }),
          // The colors used to indicate the successful completion of an action that user triggered.
          success: l({
            color: c,
            name: 'success',
          }),
          // The grey colors.
          grey: ns,
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: r,
          // Takes a background color and returns the text color that maximizes the contrast.
          getContrastText: h,
          // Generate a rich color object.
          augmentColor: l,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: n,
        },
        b[t],
      ),
      o,
    )
  );
}
const bs = [
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
function vs(e) {
  return Math.round(e * 1e5) / 1e5;
}
const rr = {
    textTransform: 'uppercase',
  },
  nr = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ns(e, t) {
  const r = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: n = nr,
      // The default font size of the Material Specification.
      fontSize: o = 14,
      // px
      fontWeightLight: s = 300,
      fontWeightRegular: a = 400,
      fontWeightMedium: u = 500,
      fontWeightBold: i = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize: c = 16,
      // Apply the CSS properties to all the variants.
      allVariants: d,
      pxToRem: h,
    } = r,
    l = pe(r, bs);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof c != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const b = o / 14,
    v = h || ((T) => `${(T / c) * b}rem`),
    p = (T, X, H, I, g) =>
      $(
        {
          fontFamily: n,
          fontWeight: T,
          fontSize: v(X),
          // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
          lineHeight: H,
        },
        n === nr
          ? {
              letterSpacing: `${vs(I / X)}em`,
            }
          : {},
        g,
        d,
      ),
    f = {
      h1: p(s, 96, 1.167, -1.5),
      h2: p(s, 60, 1.2, -0.5),
      h3: p(a, 48, 1.167, 0),
      h4: p(a, 34, 1.235, 0.25),
      h5: p(a, 24, 1.334, 0),
      h6: p(u, 20, 1.6, 0.15),
      subtitle1: p(a, 16, 1.75, 0.15),
      subtitle2: p(u, 14, 1.57, 0.1),
      body1: p(a, 16, 1.5, 0.15),
      body2: p(a, 14, 1.43, 0.15),
      button: p(u, 14, 1.75, 0.4, rr),
      caption: p(a, 12, 1.66, 0.4),
      overline: p(a, 12, 2.66, 1, rr),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return le(
    $(
      {
        htmlFontSize: c,
        pxToRem: v,
        fontFamily: n,
        fontSize: o,
        fontWeightLight: s,
        fontWeightRegular: a,
        fontWeightMedium: u,
        fontWeightBold: i,
      },
      f,
    ),
    l,
    {
      clone: !1,
      // No need to clone deep
    },
  );
}
const Es = 0.2,
  Ss = 0.14,
  Ts = 0.12;
function J(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Es})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ss})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ts})`,
  ].join(',');
}
const xs = [
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
  ks = xs,
  _s = ['duration', 'easing', 'delay'],
  Os = {
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
  Cs = {
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
function or(e) {
  return `${Math.round(e)}ms`;
}
function ws(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function $s(e) {
  const t = $({}, Os, e.easing),
    r = $({}, Cs, e.duration);
  return $(
    {
      getAutoHeightDuration: ws,
      create: (o = ['all'], s = {}) => {
        const { duration: a = r.standard, easing: u = t.easeInOut, delay: i = 0 } = s,
          c = pe(s, _s);
        if (process.env.NODE_ENV !== 'production') {
          const d = (l) => typeof l == 'string',
            h = (l) => !isNaN(parseFloat(l));
          !d(o) &&
            !Array.isArray(o) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !h(a) &&
              !d(a) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${a}.`,
              ),
            d(u) || console.error('MUI: Argument "easing" must be a string.'),
            !h(i) && !d(i) && console.error('MUI: Argument "delay" must be a number or a string.'),
            typeof s != 'object' &&
              console.error(
                [
                  'MUI: Secong argument of transition.create must be an object.',
                  "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`",
                ].join(`
`),
              ),
            Object.keys(c).length !== 0 &&
              console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(',')}].`);
        }
        return (Array.isArray(o) ? o : [o])
          .map(
            (d) =>
              `${d} ${typeof a == 'string' ? a : or(a)} ${u} ${typeof i == 'string' ? i : or(i)}`,
          )
          .join(',');
      },
    },
    e,
    {
      easing: t,
      duration: r,
    },
  );
}
const Rs = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  As = Rs,
  Ps = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Ms(e = {}, ...t) {
  const { mixins: r = {}, palette: n = {}, transitions: o = {}, typography: s = {} } = e,
    a = pe(e, Ps);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Pe(18),
    );
  const u = ys(n),
    i = Tt(e);
  let c = le(i, {
    mixins: es(i.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ks.slice(),
    typography: Ns(u, s),
    transitions: $s(o),
    zIndex: $({}, As),
  });
  if (
    ((c = le(c, a)), (c = t.reduce((d, h) => le(d, h), c)), process.env.NODE_ENV !== 'production')
  ) {
    const d = [
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
      h = (l, b) => {
        let v;
        for (v in l) {
          const p = l[v];
          if (d.indexOf(v) !== -1 && Object.keys(p).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const f = bt('', v);
              console.error(
                [
                  `MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(l, null, 2),
                  '',
                  `Instead, you need to use the '&.${f}' syntax:`,
                  JSON.stringify(
                    {
                      root: {
                        [`&.${f}`]: p,
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
    Object.keys(c.components).forEach((l) => {
      const b = c.components[l].styleOverrides;
      b && l.indexOf('Mui') === 0 && h(b, l);
    });
  }
  return (
    (c.unstable_sxConfig = $({}, Et, a == null ? void 0 : a.unstable_sxConfig)),
    (c.unstable_sx = function (h) {
      return St({
        sx: h,
        theme: this,
      });
    }),
    c
  );
}
const Is = Ms(),
  $r = Is,
  Rr = '$$material';
function Bs({ props: e, name: t }) {
  return qo({
    props: e,
    name: t,
    defaultTheme: $r,
    themeId: Rr,
  });
}
const Ds = (e) => Xe(e) && e !== 'classes',
  Vs = Go({
    themeId: Rr,
    defaultTheme: $r,
    rootShouldForwardProp: Ds,
  }),
  js = Vs;
function Ls(e) {
  return bt('MuiSvgIcon', e);
}
Mn('MuiSvgIcon', [
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
const Fs = [
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
  zs = (e) => {
    const { color: t, fontSize: r, classes: n } = e,
      o = {
        root: ['root', t !== 'inherit' && `color${fe(t)}`, `fontSize${fe(r)}`],
      };
    return wn(o, Ls, n);
  },
  Us = js('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: r } = e;
      return [
        t.root,
        r.color !== 'inherit' && t[`color${fe(r.color)}`],
        t[`fontSize${fe(r.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var r, n, o, s, a, u, i, c, d, h, l, b, v;
    return {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      // the <svg> will define the property that has `currentColor`
      // e.g. heroicons uses fill="none" and stroke="currentColor"
      fill: t.hasSvgAsChild ? void 0 : 'currentColor',
      flexShrink: 0,
      transition:
        (r = e.transitions) == null || (n = r.create) == null
          ? void 0
          : n.call(r, 'fill', {
              duration:
                (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter,
            }),
      fontSize: {
        inherit: 'inherit',
        small:
          ((s = e.typography) == null || (a = s.pxToRem) == null ? void 0 : a.call(s, 20)) ||
          '1.25rem',
        medium:
          ((u = e.typography) == null || (i = u.pxToRem) == null ? void 0 : i.call(u, 24)) ||
          '1.5rem',
        large:
          ((c = e.typography) == null || (d = c.pxToRem) == null ? void 0 : d.call(c, 35)) ||
          '2.1875rem',
      }[t.fontSize],
      // TODO v5 deprecate, v6 remove for sx
      color:
        (h = (l = (e.vars || e).palette) == null || (l = l[t.color]) == null ? void 0 : l.main) !=
        null
          ? h
          : {
              action:
                (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
              disabled:
                (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  kt = /* @__PURE__ */ Le.forwardRef(function (t, r) {
    const n = Bs({
        props: t,
        name: 'MuiSvgIcon',
      }),
      {
        children: o,
        className: s,
        color: a = 'inherit',
        component: u = 'svg',
        fontSize: i = 'medium',
        htmlColor: c,
        inheritViewBox: d = !1,
        titleAccess: h,
        viewBox: l = '0 0 24 24',
      } = n,
      b = pe(n, Fs),
      v = /* @__PURE__ */ Le.isValidElement(o) && o.type === 'svg',
      p = $({}, n, {
        color: a,
        component: u,
        fontSize: i,
        instanceFontSize: t.fontSize,
        inheritViewBox: d,
        viewBox: l,
        hasSvgAsChild: v,
      }),
      f = {};
    d || (f.viewBox = l);
    const T = zs(p);
    return /* @__PURE__ */ ze(
      Us,
      $(
        {
          as: u,
          className: In(T.root, s),
          focusable: 'false',
          color: c,
          'aria-hidden': h ? void 0 : !0,
          role: h ? 'img' : void 0,
          ref: r,
        },
        f,
        b,
        v && o.props,
        {
          ownerState: p,
          children: [
            v ? o.props.children : o,
            h
              ? /* @__PURE__ */ R('title', {
                  children: h,
                })
              : null,
          ],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (kt.propTypes = {
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
kt.muiName = 'SvgIcon';
const sr = kt;
function Hs(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ R(
      sr,
      $(
        {
          'data-testid': `${t}Icon`,
          ref: o,
        },
        n,
        {
          children: e,
        },
      ),
    );
  }
  return (
    process.env.NODE_ENV !== 'production' && (r.displayName = `${t}Icon`),
    (r.muiName = sr.muiName),
    /* @__PURE__ */ Le.memo(/* @__PURE__ */ Le.forwardRef(r))
  );
}
const Js = Hs(
  /* @__PURE__ */ R('path', {
    d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  }),
  'Menu',
);
function oa({ menu: e, dataHandler: t, commandHandler: r, className: n, children: o }) {
  const [s, a] = Ge(!1),
    [u, i] = Ge(!1),
    c = ot(() => {
      s && a(!1), i(!1);
    }, [s]),
    d = ot((f) => {
      f.stopPropagation(),
        a((T) => {
          const X = !T;
          return X && f.shiftKey && i(!0), X;
        });
    }, []),
    h = Jr(null),
    [l, b] = Ge(0);
  Kr(() => {
    s && h.current && b(h.current.clientHeight);
  }, [s]);
  const v = ot((f) => (c(), r(f)), [r, c]);
  let p = e;
  return (
    !p && t && (p = t(u)),
    /* @__PURE__ */ R('div', {
      ref: h,
      style: { position: 'relative' },
      children: /* @__PURE__ */ R(Fr, {
        position: 'static',
        children: /* @__PURE__ */ ze(zr, {
          className: `papi-toolbar ${n ?? ''}`,
          variant: 'dense',
          children: [
            p
              ? /* @__PURE__ */ R(Ur, {
                  edge: 'start',
                  className: `papi-menuButton ${n ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: d,
                  children: /* @__PURE__ */ R(Js, {}),
                })
              : null,
            o ? /* @__PURE__ */ R('div', { className: 'papi-menu-children', children: o }) : null,
            p
              ? /* @__PURE__ */ R(Hr, {
                  className: `papi-menu-drawer ${n ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: s,
                  onClose: c,
                  PaperProps: {
                    className: 'papi-menu-drawer-paper',
                    style: {
                      top: l,
                    },
                  },
                  children: /* @__PURE__ */ R(Zr, { commandHandler: v, columns: p.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
function Ks(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const r = document.head || document.querySelector('head'),
    n = r.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    t === 'top' && n ? r.insertBefore(o, n) : r.appendChild(o);
}
Ks(
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
`,
  'top',
);
export {
  xe as Button,
  Zs as Checkbox,
  qr as ComboBox,
  Zr as GridMenu,
  $e as LabelPosition,
  Wr as MenuItem,
  ea as RefSelector,
  ta as Slider,
  ra as Snackbar,
  na as Switch,
  Mt as TextField,
  oa as Toolbar,
};
//# sourceMappingURL=index.es.js.map
