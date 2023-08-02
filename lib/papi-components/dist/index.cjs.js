'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const S = require('react/jsx-runtime'),
  Q = require('@mui/material'),
  oe = require('react'),
  Cr = require('react-data-grid'),
  jn = require('@emotion/react'),
  Bn = require('@emotion/styled');
function Dn(e) {
  const r = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const n in e)
      if (n !== 'default') {
        const t = Object.getOwnPropertyDescriptor(e, n);
        Object.defineProperty(r, n, t.get ? t : { enumerable: !0, get: () => e[n] });
      }
  }
  return (r.default = e), Object.freeze(r);
}
const Fe = Dn(oe);
function Se({ isDisabled: e = !1, className: r, onClick: n, onContextMenu: t, children: o }) {
  return S.jsx(Q.Button, {
    disabled: e,
    className: `papi-button ${r ?? ''}`,
    onClick: n,
    onContextMenu: t,
    children: o,
  });
}
var Ee = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Ee || {});
function cn({
  isChecked: e,
  labelText: r = '',
  labelPosition: n = Ee.After,
  isIndeterminate: t = !1,
  isDefaultChecked: o,
  isDisabled: a = !1,
  hasError: s = !1,
  className: i,
  onChange: c,
}) {
  const l = S.jsx(Q.Checkbox, {
    checked: e,
    indeterminate: t,
    defaultChecked: o,
    disabled: a,
    className: `papi-checkbox ${s ? 'error' : ''} ${i ?? ''}`,
    onChange: c,
  });
  let f;
  if (r) {
    const p = n === Ee.Before || n === Ee.Above,
      u = S.jsx('span', {
        className: `papi-checkbox-label ${s ? 'error' : ''} ${i ?? ''}`,
        children: r,
      }),
      b = n === Ee.Before || n === Ee.After,
      y = b ? u : S.jsx('div', { children: u }),
      h = b ? l : S.jsx('div', { children: l });
    f = S.jsxs(Q.FormLabel, {
      className: `papi-checkbox ${n.toString()}`,
      disabled: a,
      error: s,
      children: [p && y, h, !p && y],
    });
  } else f = l;
  return f;
}
function ln({
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
  return S.jsx(Q.Autocomplete, {
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
      S.jsx(Q.TextField, {
        ...b,
        error: t,
        fullWidth: o,
        disabled: r,
        label: e,
        style: { width: a },
      }),
  });
}
var zn = Object.defineProperty,
  Vn = (e, r, n) =>
    r in e ? zn(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[r] = n),
  R = (e, r, n) => (Vn(e, typeof r != 'symbol' ? r + '' : r, n), n);
const we = [
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
    '1ES',
    '2ES',
    'MAN',
    'PS2',
    'ODA',
    'PSS',
    'JSA',
    'JDB',
    'TBS',
    'SST',
    'DNT',
    'BLT',
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
    '3ES',
    'EZA',
    '5EZ',
    '6EZ',
    'INT',
    'CNC',
    'GLO',
    'TDX',
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
    'REP',
    '4BA',
    'LAO',
  ],
  hr = [
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
  _r = Xn();
function Be(e, r = !0) {
  return r && (e = e.toUpperCase()), e in _r ? _r[e] : 0;
}
function mr(e) {
  return Be(e) > 0;
}
function Ln(e) {
  const r = typeof e == 'string' ? Be(e) : e;
  return r >= 40 && r <= 66;
}
function Fn(e) {
  return (typeof e == 'string' ? Be(e) : e) <= 39;
}
function dn(e) {
  return e <= 66;
}
function Hn(e) {
  const r = typeof e == 'string' ? Be(e) : e;
  return hn(r) && !dn(r);
}
function* Un() {
  for (let e = 1; e <= we.length; e++) yield e;
}
const qn = 1,
  fn = we.length;
function Gn() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function gr(e, r = '***') {
  const n = e - 1;
  return n < 0 || n >= we.length ? r : we[n];
}
function pn(e) {
  return e <= 0 || e > fn ? '******' : un[e - 1];
}
function Jn(e) {
  return pn(Be(e));
}
function hn(e) {
  const r = typeof e == 'number' ? gr(e) : e;
  return mr(r) && !hr.includes(r);
}
function Kn(e) {
  const r = typeof e == 'number' ? gr(e) : e;
  return mr(r) && hr.includes(r);
}
function Wn(e) {
  return un[e - 1].includes('*obsolete*');
}
function Xn() {
  const e = {};
  for (let r = 0; r < we.length; r++) e[we[r]] = r + 1;
  return e;
}
const ce = {
  allBookIds: we,
  nonCanonicalIds: hr,
  bookIdToNumber: Be,
  isBookIdValid: mr,
  isBookNT: Ln,
  isBookOT: Fn,
  isBookOTNT: dn,
  isBookDC: Hn,
  allBookNumbers: Un,
  firstBook: qn,
  lastBook: fn,
  extraBooks: Gn,
  bookNumberToId: gr,
  bookNumberToEnglishName: pn,
  bookIdToEnglishName: Jn,
  isCanonical: hn,
  isExtraMaterial: Kn,
  isObsolete: Wn,
};
var ve = ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(ve || {});
const Ne = class {
  constructor(e) {
    if (
      (R(this, 'name'),
      R(this, 'fullPath'),
      R(this, 'isPresent'),
      R(this, 'hasVerseSegments'),
      R(this, 'isCustomized'),
      R(this, 'baseVersification'),
      R(this, 'scriptureBooks'),
      R(this, '_type'),
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
let ae = Ne;
R(ae, 'Original', new Ne(ve.Original)),
  R(ae, 'Septuagint', new Ne(ve.Septuagint)),
  R(ae, 'Vulgate', new Ne(ve.Vulgate)),
  R(ae, 'English', new Ne(ve.English)),
  R(ae, 'RussianProtestant', new Ne(ve.RussianProtestant)),
  R(ae, 'RussianOrthodox', new Ne(ve.RussianOrthodox));
function Or(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++) e = e.split(r[t]).join(n);
  return e.split(n);
}
var mn = ((e) => (
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
      (R(this, 'firstChapter'),
      R(this, 'lastChapter'),
      R(this, 'lastVerse'),
      R(this, 'hasSegmentsDefined'),
      R(this, 'text'),
      R(this, 'BBBCCCVVVS'),
      R(this, 'longHashCode'),
      R(this, 'versification'),
      R(this, 'rtlMark', '‏'),
      R(this, '_bookNum', 0),
      R(this, '_chapterNum', 0),
      R(this, '_verseNum', 0),
      R(this, '_verse'),
      t == null && o == null)
    )
      if (r != null && typeof r == 'string') {
        const a = r,
          s = n != null && n instanceof ae ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == 'number') {
        const a = n != null && n instanceof ae ? n : void 0;
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
          const a = r instanceof ae ? r : O.defaultVersification;
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
  static parse(r, n = O.defaultVersification) {
    const t = new O(n);
    return t.parse(r), t;
  }
  static isVerseParseable(r) {
    return (
      r.length > 0 &&
      '0123456789'.includes(r[0]) &&
      !r.endsWith(this.verseRangeSeparator) &&
      !r.endsWith(this.verseSequenceIndicator)
    );
  }
  static tryParse(r) {
    let n;
    try {
      return (n = O.parse(r)), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof De) return (n = new O()), { success: !1, verseRef: n };
      throw t;
    }
  }
  static getBBBCCCVVV(r, n, t) {
    return (
      (r % O.bcvMaxValue) * O.bookDigitShifter +
      (n >= 0 ? (n % O.bcvMaxValue) * O.chapterDigitShifter : 0) +
      (t >= 0 ? t % O.bcvMaxValue : 0)
    );
  }
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
  get isDefault() {
    return (
      this.bookNum === 0 &&
      this.chapterNum === 0 &&
      this.verseNum === 0 &&
      this.versification == null
    );
  }
  get hasMultiple() {
    return (
      this._verse != null &&
      (this._verse.includes(O.verseRangeSeparator) ||
        this._verse.includes(O.verseSequenceIndicator))
    );
  }
  get book() {
    return ce.bookNumberToId(this.bookNum, '');
  }
  set book(r) {
    this.bookNum = ce.bookIdToNumber(r);
  }
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(r) {
    const n = +r;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
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
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(r) {
    if (r <= 0 || r > ce.lastBook)
      throw new De('BookNum must be greater than zero and less than or equal to last book');
    this._bookNum = r;
  }
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(r) {
    this.chapterNum = r;
  }
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(r) {
    this._verseNum = r;
  }
  get versificationStr() {
    var r;
    return (r = this.versification) == null ? void 0 : r.name;
  }
  set versificationStr(r) {
    this.versification = this.versification != null ? new ae(r) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(O.verseRangeSeparators, O.verseSequenceIndicators);
  }
  get BBBCCC() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(r) {
    if (((r = r.replace(this.rtlMark, '')), r.includes('/'))) {
      const a = r.split('/');
      if (((r = a[0]), a.length > 1))
        try {
          const s = +a[1].trim();
          this.versification = new ae(ve[s]);
        } catch {
          throw new De('Invalid reference : ' + r);
        }
    }
    const n = r.trim().split(' ');
    if (n.length !== 2) throw new De('Invalid reference : ' + r);
    const t = n[1].split(':'),
      o = +t[0];
    if (
      t.length !== 2 ||
      ce.bookIdToNumber(n[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !O.isVerseParseable(t[1])
    )
      throw new De('Invalid reference : ' + r);
    this.updateInternal(n[0], t[0], t[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new O(this);
  }
  toString() {
    const r = this.book;
    return r === '' ? '' : `${r} ${this.chapter}:${this.verse}`;
  }
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
  allVerses(r = !1, n = O.verseRangeSeparators, t = O.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      a = Or(this._verse, t);
    for (const s of a.map((i) => Or(i, n))) {
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
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > ce.lastBook
      ? 2
      : 0;
  }
  setEmpty(r = O.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = r);
  }
  updateInternal(r, n, t) {
    (this.bookNum = ce.bookIdToNumber(r)), (this.chapter = n), (this.verse = t);
  }
};
let he = O;
R(he, 'defaultVersification', ae.English),
  R(he, 'verseRangeSeparator', '-'),
  R(he, 'verseSequenceIndicator', ','),
  R(he, 'verseRangeSeparators', [O.verseRangeSeparator]),
  R(he, 'verseSequenceIndicators', [O.verseSequenceIndicator]),
  R(he, 'chapterDigitShifter', 1e3),
  R(he, 'bookDigitShifter', O.chapterDigitShifter * O.chapterDigitShifter),
  R(he, 'bcvMaxValue', O.chapterDigitShifter - 1),
  R(he, 'ValidStatusType', mn);
class De extends Error {}
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
function Rr() {
  return ce.allBookIds.map((e) => ({ bookId: e, label: ce.bookIdToEnglishName(e) }));
}
function $r(e) {
  return { bookId: ce.bookNumberToId(e), label: ce.bookNumberToEnglishName(e) };
}
const bn = 1,
  Yn = gn.length - 1,
  yn = 1,
  vn = 1,
  xn = (e) => {
    var r;
    return ((r = gn[e]) == null ? void 0 : r.chapters) ?? -1;
  },
  Ar = (e, r) => ({
    bookNum: Math.max(bn, Math.min(e.bookNum + r, Yn)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Pr = (e, r) => ({
    ...e,
    chapterNum: Math.min(Math.max(yn, e.chapterNum + r), xn(e.bookNum)),
    verseNum: 1,
  }),
  Mr = (e, r) => ({ ...e, verseNum: Math.max(vn, e.verseNum + r) });
function We({
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
  return S.jsx(Q.TextField, {
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
function Zn(e, r) {
  return e.bookId === r.bookId && e.label === r.label;
}
function Qn({ scrRef: e, handleSubmit: r }) {
  const [n, t] = oe.useState($r(e.bookNum)),
    o = (c) => {
      t($r(c.bookNum)), r(c);
    },
    a = (c, l) => {
      const p = { bookNum: ce.bookIdToNumber(l.bookId), chapterNum: 1, verseNum: 1 };
      o(p);
    },
    s = (c) => {
      r({ ...e, chapterNum: +c.target.value });
    },
    i = (c) => {
      r({ ...e, verseNum: +c.target.value });
    };
  return S.jsxs(S.Fragment, {
    children: [
      S.jsx(ln, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: Rr(),
        onChange: a,
        value: n,
        isClearable: !1,
        width: 200,
        checkIsOptionEqualToValue: Zn,
      }),
      S.jsx(Se, { onClick: () => o(Ar(e, -1)), isDisabled: e.bookNum <= bn, children: '<' }),
      S.jsx(Se, {
        onClick: () => o(Ar(e, 1)),
        isDisabled: e.bookNum >= Rr().length,
        children: '>',
      }),
      S.jsx(We, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: s,
      }),
      S.jsx(Se, { onClick: () => r(Pr(e, -1)), isDisabled: e.chapterNum <= yn, children: '<' }),
      S.jsx(Se, {
        onClick: () => r(Pr(e, 1)),
        isDisabled: e.chapterNum >= xn(e.bookNum),
        children: '>',
      }),
      S.jsx(We, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: i,
      }),
      S.jsx(Se, { onClick: () => r(Mr(e, -1)), isDisabled: e.verseNum <= vn, children: '<' }),
      S.jsx(Se, { onClick: () => r(Mr(e, 1)), children: '>' }),
    ],
  });
}
function et({
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
  return S.jsx(Q.Slider, {
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
function rt({ isChecked: e, isDisabled: r = !1, hasError: n = !1, className: t, onChange: o }) {
  return S.jsx(Q.Switch, {
    checked: e,
    disabled: r,
    className: `papi-switch ${n ? 'error' : ''} ${t ?? ''}`,
    onChange: o,
  });
}
function nt({
  autoHideDuration: e = null,
  isOpen: r = !1,
  className: n,
  onClose: t,
  anchorOrigin: o = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: a = { action: '', message: '', className: `papi-snackbar ${n ?? ''}` },
  children: s,
}) {
  return S.jsx(Q.Snackbar, {
    autoHideDuration: e,
    className: `papi-snackbar ${n ?? ''}`,
    open: r,
    onClose: t,
    anchorOrigin: o,
    ContentProps: a,
    children: s,
  });
}
function kn(e) {
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
  return S.jsx(Q.MenuItem, {
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
function Ir({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return S.jsx(We, { defaultValue: r[n.key], onChange: t });
}
const tt = ({ onChange: e, disabled: r, checked: n, ...t }) => {
  function o(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return S.jsx(cn, { ...t, isChecked: n, isDisabled: r, onChange: o });
};
function ot({
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
  onRowsChange: E,
  onCellClick: W,
  onCellDoubleClick: H,
  onCellContextMenu: $,
  onCellKeyDown: m,
  direction: X = 'ltr',
  enableVirtualization: ne = !0,
  onCopy: le,
  onPaste: se,
  onScroll: j,
  className: Y,
}) {
  const ue = oe.useMemo(() => {
    const ie = e.map((G) =>
      typeof G.editable == 'function'
        ? { ...G, editable: (ee) => !!G.editable(ee), renderEditCell: G.renderEditCell || Ir }
        : G.editable && !G.renderEditCell
        ? { ...G, renderEditCell: Ir }
        : G.renderEditCell && !G.editable
        ? { ...G, editable: !1 }
        : G,
    );
    return f ? [{ ...Cr.SelectColumn, minWidth: p }, ...ie] : ie;
  }, [f, e]);
  return S.jsx(Cr, {
    columns: ue,
    defaultColumnOptions: { width: o, minWidth: a, maxWidth: s, sortable: i, resizable: c },
    sortColumns: r,
    onSortColumnsChange: n,
    onColumnResize: t,
    rows: l,
    rowKeyGetter: u,
    rowHeight: b,
    headerRowHeight: y,
    selectedRows: h,
    onSelectedRowsChange: d,
    onRowsChange: E,
    onCellClick: W,
    onCellDoubleClick: H,
    onCellContextMenu: $,
    onCellKeyDown: m,
    direction: X,
    enableVirtualization: ne,
    onCopy: le,
    onPaste: se,
    onScroll: j,
    renderers: { renderCheckbox: tt },
    className: `${Y ?? 'rdg-light'}`,
  });
}
function at({ commandHandler: e, name: r, className: n, items: t }) {
  return S.jsxs(Q.Grid, {
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${n ?? ''}`,
    children: [
      S.jsx('h3', { className: `papi-menu ${n ?? ''}`, children: r }),
      t.map((o, a) =>
        S.jsx(
          kn,
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
function Sn({ commandHandler: e, className: r, columns: n }) {
  return S.jsx(Q.Grid, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${r ?? ''}`,
    columns: n.length,
    children: n.map((t) =>
      S.jsx(at, { commandHandler: e, name: t.name, className: r, items: t.items }),
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
function Pe(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function Nn(e) {
  if (!Pe(e)) return e;
  const r = {};
  return (
    Object.keys(e).forEach((n) => {
      r[n] = Nn(e[n]);
    }),
    r
  );
}
function me(e, r, n = { clone: !0 }) {
  const t = n.clone ? A({}, e) : e;
  return (
    Pe(e) &&
      Pe(r) &&
      Object.keys(r).forEach((o) => {
        o !== '__proto__' &&
          (Pe(r[o]) && o in e && Pe(e[o])
            ? (t[o] = me(e[o], r[o], n))
            : n.clone
            ? (t[o] = Pe(r[o]) ? Nn(r[o]) : r[o])
            : (t[o] = r[o]));
      }),
    t
  );
}
function st(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var fr = { exports: {} },
  Je = { exports: {} },
  D = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jr;
function it() {
  if (jr) return D;
  jr = 1;
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
    E = e ? Symbol.for('react.responder') : 60118,
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
  function $(m) {
    return H(m) === l;
  }
  return (
    (D.AsyncMode = c),
    (D.ConcurrentMode = l),
    (D.ContextConsumer = i),
    (D.ContextProvider = s),
    (D.Element = r),
    (D.ForwardRef = f),
    (D.Fragment = t),
    (D.Lazy = y),
    (D.Memo = b),
    (D.Portal = n),
    (D.Profiler = a),
    (D.StrictMode = o),
    (D.Suspense = p),
    (D.isAsyncMode = function (m) {
      return $(m) || H(m) === c;
    }),
    (D.isConcurrentMode = $),
    (D.isContextConsumer = function (m) {
      return H(m) === i;
    }),
    (D.isContextProvider = function (m) {
      return H(m) === s;
    }),
    (D.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === r;
    }),
    (D.isForwardRef = function (m) {
      return H(m) === f;
    }),
    (D.isFragment = function (m) {
      return H(m) === t;
    }),
    (D.isLazy = function (m) {
      return H(m) === y;
    }),
    (D.isMemo = function (m) {
      return H(m) === b;
    }),
    (D.isPortal = function (m) {
      return H(m) === n;
    }),
    (D.isProfiler = function (m) {
      return H(m) === a;
    }),
    (D.isStrictMode = function (m) {
      return H(m) === o;
    }),
    (D.isSuspense = function (m) {
      return H(m) === p;
    }),
    (D.isValidElementType = function (m) {
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
            m.$$typeof === E ||
            m.$$typeof === W ||
            m.$$typeof === h))
      );
    }),
    (D.typeOf = H),
    D
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
 */ var Br;
function ct() {
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
            E = e ? Symbol.for('react.responder') : 60118,
            W = e ? Symbol.for('react.scope') : 60119;
          function H(v) {
            return (
              typeof v == 'string' ||
              typeof v == 'function' ||
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
                  v.$$typeof === E ||
                  v.$$typeof === W ||
                  v.$$typeof === h))
            );
          }
          function $(v) {
            if (typeof v == 'object' && v !== null) {
              var te = v.$$typeof;
              switch (te) {
                case r:
                  var k = v.type;
                  switch (k) {
                    case c:
                    case l:
                    case t:
                    case a:
                    case o:
                    case p:
                      return k;
                    default:
                      var Ce = k && k.$$typeof;
                      switch (Ce) {
                        case i:
                        case f:
                        case y:
                        case b:
                        case s:
                          return Ce;
                        default:
                          return te;
                      }
                  }
                case n:
                  return te;
              }
            }
          }
          var m = c,
            X = l,
            ne = i,
            le = s,
            se = r,
            j = f,
            Y = t,
            ue = y,
            ie = b,
            G = n,
            de = a,
            ee = o,
            pe = p,
            ke = !1;
          function Te(v) {
            return (
              ke ||
                ((ke = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              g(v) || $(v) === c
            );
          }
          function g(v) {
            return $(v) === l;
          }
          function x(v) {
            return $(v) === i;
          }
          function _(v) {
            return $(v) === s;
          }
          function T(v) {
            return typeof v == 'object' && v !== null && v.$$typeof === r;
          }
          function N(v) {
            return $(v) === f;
          }
          function P(v) {
            return $(v) === t;
          }
          function w(v) {
            return $(v) === y;
          }
          function C(v) {
            return $(v) === b;
          }
          function M(v) {
            return $(v) === n;
          }
          function B(v) {
            return $(v) === a;
          }
          function I(v) {
            return $(v) === o;
          }
          function Z(v) {
            return $(v) === p;
          }
          (z.AsyncMode = m),
            (z.ConcurrentMode = X),
            (z.ContextConsumer = ne),
            (z.ContextProvider = le),
            (z.Element = se),
            (z.ForwardRef = j),
            (z.Fragment = Y),
            (z.Lazy = ue),
            (z.Memo = ie),
            (z.Portal = G),
            (z.Profiler = de),
            (z.StrictMode = ee),
            (z.Suspense = pe),
            (z.isAsyncMode = Te),
            (z.isConcurrentMode = g),
            (z.isContextConsumer = x),
            (z.isContextProvider = _),
            (z.isElement = T),
            (z.isForwardRef = N),
            (z.isFragment = P),
            (z.isLazy = w),
            (z.isMemo = C),
            (z.isPortal = M),
            (z.isProfiler = B),
            (z.isStrictMode = I),
            (z.isSuspense = Z),
            (z.isValidElementType = H),
            (z.typeOf = $);
        })()),
    z
  );
}
var Dr;
function En() {
  return (
    Dr ||
      ((Dr = 1), process.env.NODE_ENV === 'production' ? (Je.exports = it()) : (Je.exports = ct())),
    Je.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var ar, zr;
function lt() {
  if (zr) return ar;
  zr = 1;
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
var sr, Vr;
function br() {
  if (Vr) return sr;
  Vr = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (sr = e), sr;
}
var ir, Lr;
function wn() {
  return Lr || ((Lr = 1), (ir = Function.call.bind(Object.prototype.hasOwnProperty))), ir;
}
var cr, Fr;
function ut() {
  if (Fr) return cr;
  Fr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var r = br(),
      n = {},
      t = wn();
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
var lr, Hr;
function dt() {
  if (Hr) return lr;
  Hr = 1;
  var e = En(),
    r = lt(),
    n = br(),
    t = wn(),
    o = ut(),
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
        var x = g && ((l && g[l]) || g[f]);
        if (typeof x == 'function') return x;
      }
      var u = '<<anonymous>>',
        b = {
          array: E('array'),
          bigint: E('bigint'),
          bool: E('boolean'),
          func: E('function'),
          number: E('number'),
          object: E('object'),
          string: E('string'),
          symbol: E('symbol'),
          any: W(),
          arrayOf: H,
          element: $(),
          elementType: m(),
          instanceOf: X,
          node: j(),
          objectOf: le,
          oneOf: ne,
          oneOfType: se,
          shape: ue,
          exact: ie,
        };
      function y(g, x) {
        return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
      }
      function h(g, x) {
        (this.message = g), (this.data = x && typeof x == 'object' ? x : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function d(g) {
        if (process.env.NODE_ENV !== 'production')
          var x = {},
            _ = 0;
        function T(P, w, C, M, B, I, Z) {
          if (((M = M || u), (I = I || C), Z !== n)) {
            if (c) {
              var v = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((v.name = 'Invariant Violation'), v);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var te = M + ':' + C;
              !x[te] &&
                _ < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    I +
                    '` prop on `' +
                    M +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (x[te] = !0),
                _++);
            }
          }
          return w[C] == null
            ? P
              ? w[C] === null
                ? new h(
                    'The ' +
                      B +
                      ' `' +
                      I +
                      '` is marked as required ' +
                      ('in `' + M + '`, but its value is `null`.'),
                  )
                : new h(
                    'The ' +
                      B +
                      ' `' +
                      I +
                      '` is marked as required in ' +
                      ('`' + M + '`, but its value is `undefined`.'),
                  )
              : null
            : g(w, C, M, B, I);
        }
        var N = T.bind(null, !1);
        return (N.isRequired = T.bind(null, !0)), N;
      }
      function E(g) {
        function x(_, T, N, P, w, C) {
          var M = _[T],
            B = ee(M);
          if (B !== g) {
            var I = pe(M);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + I + '` supplied to `' + N + '`, expected ') +
                ('`' + g + '`.'),
              { expectedType: g },
            );
          }
          return null;
        }
        return d(x);
      }
      function W() {
        return d(s);
      }
      function H(g) {
        function x(_, T, N, P, w) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                w +
                '` of component `' +
                N +
                '` has invalid PropType notation inside arrayOf.',
            );
          var C = _[T];
          if (!Array.isArray(C)) {
            var M = ee(C);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + N + '`, expected an array.'),
            );
          }
          for (var B = 0; B < C.length; B++) {
            var I = g(C, B, N, P, w + '[' + B + ']', n);
            if (I instanceof Error) return I;
          }
          return null;
        }
        return d(x);
      }
      function $() {
        function g(x, _, T, N, P) {
          var w = x[_];
          if (!i(w)) {
            var C = ee(w);
            return new h(
              'Invalid ' +
                N +
                ' `' +
                P +
                '` of type ' +
                ('`' + C + '` supplied to `' + T + '`, expected a single ReactElement.'),
            );
          }
          return null;
        }
        return d(g);
      }
      function m() {
        function g(x, _, T, N, P) {
          var w = x[_];
          if (!e.isValidElementType(w)) {
            var C = ee(w);
            return new h(
              'Invalid ' +
                N +
                ' `' +
                P +
                '` of type ' +
                ('`' + C + '` supplied to `' + T + '`, expected a single ReactElement type.'),
            );
          }
          return null;
        }
        return d(g);
      }
      function X(g) {
        function x(_, T, N, P, w) {
          if (!(_[T] instanceof g)) {
            var C = g.name || u,
              M = Te(_[T]);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + N + '`, expected ') +
                ('instance of `' + C + '`.'),
            );
          }
          return null;
        }
        return d(x);
      }
      function ne(g) {
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
        function x(_, T, N, P, w) {
          for (var C = _[T], M = 0; M < g.length; M++) if (y(C, g[M])) return null;
          var B = JSON.stringify(g, function (Z, v) {
            var te = pe(v);
            return te === 'symbol' ? String(v) : v;
          });
          return new h(
            'Invalid ' +
              P +
              ' `' +
              w +
              '` of value `' +
              String(C) +
              '` ' +
              ('supplied to `' + N + '`, expected one of ' + B + '.'),
          );
        }
        return d(x);
      }
      function le(g) {
        function x(_, T, N, P, w) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                w +
                '` of component `' +
                N +
                '` has invalid PropType notation inside objectOf.',
            );
          var C = _[T],
            M = ee(C);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + N + '`, expected an object.'),
            );
          for (var B in C)
            if (t(C, B)) {
              var I = g(C, B, N, P, w + '.' + B, n);
              if (I instanceof Error) return I;
            }
          return null;
        }
        return d(x);
      }
      function se(g) {
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
                  ke(_) +
                  ' at index ' +
                  x +
                  '.',
              ),
              s
            );
        }
        function T(N, P, w, C, M) {
          for (var B = [], I = 0; I < g.length; I++) {
            var Z = g[I],
              v = Z(N, P, w, C, M, n);
            if (v == null) return null;
            v.data && t(v.data, 'expectedType') && B.push(v.data.expectedType);
          }
          var te = B.length > 0 ? ', expected one of type [' + B.join(', ') + ']' : '';
          return new h('Invalid ' + C + ' `' + M + '` supplied to ' + ('`' + w + '`' + te + '.'));
        }
        return d(T);
      }
      function j() {
        function g(x, _, T, N, P) {
          return G(x[_])
            ? null
            : new h(
                'Invalid ' +
                  N +
                  ' `' +
                  P +
                  '` supplied to ' +
                  ('`' + T + '`, expected a ReactNode.'),
              );
        }
        return d(g);
      }
      function Y(g, x, _, T, N) {
        return new h(
          (g || 'React class') +
            ': ' +
            x +
            ' type `' +
            _ +
            '.' +
            T +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            N +
            '`.',
        );
      }
      function ue(g) {
        function x(_, T, N, P, w) {
          var C = _[T],
            M = ee(C);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type `' +
                M +
                '` ' +
                ('supplied to `' + N + '`, expected `object`.'),
            );
          for (var B in g) {
            var I = g[B];
            if (typeof I != 'function') return Y(N, P, w, B, pe(I));
            var Z = I(C, B, N, P, w + '.' + B, n);
            if (Z) return Z;
          }
          return null;
        }
        return d(x);
      }
      function ie(g) {
        function x(_, T, N, P, w) {
          var C = _[T],
            M = ee(C);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type `' +
                M +
                '` ' +
                ('supplied to `' + N + '`, expected `object`.'),
            );
          var B = r({}, _[T], g);
          for (var I in B) {
            var Z = g[I];
            if (t(g, I) && typeof Z != 'function') return Y(N, P, w, I, pe(Z));
            if (!Z)
              return new h(
                'Invalid ' +
                  P +
                  ' `' +
                  w +
                  '` key `' +
                  I +
                  '` supplied to `' +
                  N +
                  '`.\nBad object: ' +
                  JSON.stringify(_[T], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(g), null, '  '),
              );
            var v = Z(C, I, N, P, w + '.' + I, n);
            if (v) return v;
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
            if (g === null || i(g)) return !0;
            var x = p(g);
            if (x) {
              var _ = x.call(g),
                T;
              if (x !== g.entries) {
                for (; !(T = _.next()).done; ) if (!G(T.value)) return !1;
              } else
                for (; !(T = _.next()).done; ) {
                  var N = T.value;
                  if (N && !G(N[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function de(g, x) {
        return g === 'symbol'
          ? !0
          : x
          ? x['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && x instanceof Symbol)
          : !1;
      }
      function ee(g) {
        var x = typeof g;
        return Array.isArray(g)
          ? 'array'
          : g instanceof RegExp
          ? 'object'
          : de(x, g)
          ? 'symbol'
          : x;
      }
      function pe(g) {
        if (typeof g > 'u' || g === null) return '' + g;
        var x = ee(g);
        if (x === 'object') {
          if (g instanceof Date) return 'date';
          if (g instanceof RegExp) return 'regexp';
        }
        return x;
      }
      function ke(g) {
        var x = pe(g);
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
      function Te(g) {
        return !g.constructor || !g.constructor.name ? u : g.constructor.name;
      }
      return (
        (b.checkPropTypes = o), (b.resetWarningCache = o.resetWarningCache), (b.PropTypes = b), b
      );
    }),
    lr
  );
}
var ur, Ur;
function ft() {
  if (Ur) return ur;
  Ur = 1;
  var e = br();
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
  var pt = En(),
    ht = !0;
  fr.exports = dt()(pt.isElement, ht);
} else fr.exports = ft()();
var mt = fr.exports;
const U = st(mt);
function Ie(e) {
  let r = 'https://mui.com/production-error/?code=' + e;
  for (let n = 1; n < arguments.length; n += 1) r += '&args[]=' + encodeURIComponent(arguments[n]);
  return 'Minified MUI error #' + e + '; visit ' + r + ' for the full message.';
}
var pr = { exports: {} },
  V = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qr;
function gt() {
  if (qr) return V;
  qr = 1;
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
      var E = d.$$typeof;
      switch (E) {
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
                  return E;
              }
          }
        case r:
          return E;
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
 */ var Gr;
function bt() {
  return (
    Gr ||
      ((Gr = 1),
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
            E = !1,
            W = !1,
            H;
          H = Symbol.for('react.module.reference');
          function $(k) {
            return !!(
              typeof k == 'string' ||
              typeof k == 'function' ||
              k === n ||
              k === o ||
              W ||
              k === t ||
              k === l ||
              k === f ||
              E ||
              k === b ||
              y ||
              h ||
              d ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === u ||
                  k.$$typeof === p ||
                  k.$$typeof === a ||
                  k.$$typeof === s ||
                  k.$$typeof === c ||
                  k.$$typeof === H ||
                  k.getModuleId !== void 0))
            );
          }
          function m(k) {
            if (typeof k == 'object' && k !== null) {
              var Ce = k.$$typeof;
              switch (Ce) {
                case e:
                  var Ge = k.type;
                  switch (Ge) {
                    case n:
                    case o:
                    case t:
                    case l:
                    case f:
                      return Ge;
                    default:
                      var Tr = Ge && Ge.$$typeof;
                      switch (Tr) {
                        case i:
                        case s:
                        case c:
                        case u:
                        case p:
                        case a:
                          return Tr;
                        default:
                          return Ce;
                      }
                  }
                case r:
                  return Ce;
              }
            }
          }
          var X = s,
            ne = a,
            le = e,
            se = c,
            j = n,
            Y = u,
            ue = p,
            ie = r,
            G = o,
            de = t,
            ee = l,
            pe = f,
            ke = !1,
            Te = !1;
          function g(k) {
            return (
              ke ||
                ((ke = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function x(k) {
            return (
              Te ||
                ((Te = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function _(k) {
            return m(k) === s;
          }
          function T(k) {
            return m(k) === a;
          }
          function N(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === e;
          }
          function P(k) {
            return m(k) === c;
          }
          function w(k) {
            return m(k) === n;
          }
          function C(k) {
            return m(k) === u;
          }
          function M(k) {
            return m(k) === p;
          }
          function B(k) {
            return m(k) === r;
          }
          function I(k) {
            return m(k) === o;
          }
          function Z(k) {
            return m(k) === t;
          }
          function v(k) {
            return m(k) === l;
          }
          function te(k) {
            return m(k) === f;
          }
          (L.ContextConsumer = X),
            (L.ContextProvider = ne),
            (L.Element = le),
            (L.ForwardRef = se),
            (L.Fragment = j),
            (L.Lazy = Y),
            (L.Memo = ue),
            (L.Portal = ie),
            (L.Profiler = G),
            (L.StrictMode = de),
            (L.Suspense = ee),
            (L.SuspenseList = pe),
            (L.isAsyncMode = g),
            (L.isConcurrentMode = x),
            (L.isContextConsumer = _),
            (L.isContextProvider = T),
            (L.isElement = N),
            (L.isForwardRef = P),
            (L.isFragment = w),
            (L.isLazy = C),
            (L.isMemo = M),
            (L.isPortal = B),
            (L.isProfiler = I),
            (L.isStrictMode = Z),
            (L.isSuspense = v),
            (L.isSuspenseList = te),
            (L.isValidElementType = $),
            (L.typeOf = m);
        })()),
    L
  );
}
process.env.NODE_ENV === 'production' ? (pr.exports = gt()) : (pr.exports = bt());
var Jr = pr.exports;
const yt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function vt(e) {
  const r = `${e}`.match(yt);
  return (r && r[1]) || '';
}
function Tn(e, r = '') {
  return e.displayName || e.name || vt(e) || r;
}
function Kr(e, r, n) {
  const t = Tn(r);
  return e.displayName || (t !== '' ? `${n}(${t})` : n);
}
function xt(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Tn(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Jr.ForwardRef:
          return Kr(e, e.render, 'ForwardRef');
        case Jr.Memo:
          return Kr(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function ge(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Ie(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Cn(e, r) {
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
                n[t][s] = Cn(o[s], a[s]);
              }));
      } else n[t] === void 0 && (n[t] = e[t]);
    }),
    n
  );
}
function kt(e, r, n = void 0) {
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = e[o]
        .reduce((a, s) => {
          if (s) {
            const i = r(s);
            i !== '' && a.push(i), n && n[s] && a.push(n[s]);
          }
          return a;
        }, [])
        .join(' ');
    }),
    t
  );
}
const Wr = (e) => e,
  St = () => {
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
  Nt = St(),
  Et = Nt,
  wt = {
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
function yr(e, r, n = 'Mui') {
  const t = wt[r];
  return t ? `${n}-${t}` : `${Et.generate(e)}-${r}`;
}
function Tt(e, r, n = 'Mui') {
  const t = {};
  return (
    r.forEach((o) => {
      t[o] = yr(e, o, n);
    }),
    t
  );
}
function ye(e, r) {
  if (e == null) return {};
  var n = {},
    t = Object.keys(e),
    o,
    a;
  for (a = 0; a < t.length; a++) (o = t[a]), !(r.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function _n(e) {
  var r,
    n,
    t = '';
  if (typeof e == 'string' || typeof e == 'number') t += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++) e[r] && (n = _n(e[r])) && (t && (t += ' '), (t += n));
    else for (r in e) e[r] && (t && (t += ' '), (t += r));
  return t;
}
function Ct() {
  for (var e, r, n = 0, t = ''; n < arguments.length; )
    (e = arguments[n++]) && (r = _n(e)) && (t && (t += ' '), (t += r));
  return t;
}
/**
 * @mui/styled-engine v5.13.2
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function _t(e, r) {
  const n = Bn(e, r);
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
const Ot = (e, r) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = r(e.__emotion_styles));
  },
  Rt = ['values', 'unit', 'step'],
  $t = (e) => {
    const r = Object.keys(e).map((n) => ({ key: n, val: e[n] })) || [];
    return r.sort((n, t) => n.val - t.val), r.reduce((n, t) => A({}, n, { [t.key]: t.val }), {});
  };
function At(e) {
  const {
      values: r = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: n = 'px',
      step: t = 5,
    } = e,
    o = ye(e, Rt),
    a = $t(r),
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
  return A({ keys: s, values: a, up: i, down: c, between: l, only: f, not: p, unit: n }, o);
}
const Pt = { borderRadius: 4 },
  Mt = Pt,
  It =
    process.env.NODE_ENV !== 'production'
      ? U.oneOfType([U.number, U.string, U.object, U.array])
      : {},
  xe = It;
function Le(e, r) {
  return r ? me(e, r, { clone: !1 }) : e;
}
const vr = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  Xr = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${vr[e]}px)` };
function be(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || Xr;
    return r.reduce((s, i, c) => ((s[a.up(a.keys[c])] = n(r[c])), s), {});
  }
  if (typeof r == 'object') {
    const a = t.breakpoints || Xr;
    return Object.keys(r).reduce((s, i) => {
      if (Object.keys(a.values || vr).indexOf(i) !== -1) {
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
function jt(e = {}) {
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
function Bt(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function Ye(e, r, n = !0) {
  if (!r || typeof r != 'string') return null;
  if (e && e.vars && n) {
    const t = `vars.${r}`.split('.').reduce((o, a) => (o && o[a] ? o[a] : null), e);
    if (t != null) return t;
  }
  return r.split('.').reduce((t, o) => (t && t[o] != null ? t[o] : null), e);
}
function Xe(e, r, n, t = n) {
  let o;
  return (
    typeof e == 'function' ? (o = e(n)) : Array.isArray(e) ? (o = e[n] || t) : (o = Ye(e, n) || t),
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
        l = Ye(c, t) || {};
      return be(s, i, (p) => {
        let u = Xe(l, o, p);
        return (
          p === u &&
            typeof p == 'string' &&
            (u = Xe(l, o, `${r}${p === 'default' ? '' : ge(p)}`, p)),
          n === !1 ? u : { [n]: u }
        );
      });
    };
  return (
    (a.propTypes = process.env.NODE_ENV !== 'production' ? { [r]: xe } : {}),
    (a.filterProps = [r]),
    a
  );
}
function Dt(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const zt = { m: 'margin', p: 'padding' },
  Vt = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  Yr = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Lt = Dt((e) => {
    if (e.length > 2)
      if (Yr[e]) e = Yr[e];
      else return [e];
    const [r, n] = e.split(''),
      t = zt[r],
      o = Vt[n] || '';
    return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
  }),
  Ze = [
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
  Qe = [
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
  Ft = [...Ze, ...Qe];
function Ue(e, r, n, t) {
  var o;
  const a = (o = Ye(e, r, !1)) != null ? o : n;
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
function On(e) {
  return Ue(e, 'spacing', 8, 'spacing');
}
function qe(e, r) {
  if (typeof r == 'string' || r == null) return r;
  const n = Math.abs(r),
    t = e(n);
  return r >= 0 ? t : typeof t == 'number' ? -t : `-${t}`;
}
function Ht(e, r) {
  return (n) => e.reduce((t, o) => ((t[o] = qe(r, n)), t), {});
}
function Ut(e, r, n, t) {
  if (r.indexOf(n) === -1) return null;
  const o = Lt(n),
    a = Ht(o, t),
    s = e[n];
  return be(e, s, a);
}
function Rn(e, r) {
  const n = On(e.theme);
  return Object.keys(e)
    .map((t) => Ut(e, r, t, n))
    .reduce(Le, {});
}
function J(e) {
  return Rn(e, Ze);
}
J.propTypes =
  process.env.NODE_ENV !== 'production' ? Ze.reduce((e, r) => ((e[r] = xe), e), {}) : {};
J.filterProps = Ze;
function K(e) {
  return Rn(e, Qe);
}
K.propTypes =
  process.env.NODE_ENV !== 'production' ? Qe.reduce((e, r) => ((e[r] = xe), e), {}) : {};
K.filterProps = Qe;
process.env.NODE_ENV !== 'production' && Ft.reduce((e, r) => ((e[r] = xe), e), {});
function qt(e = 8) {
  if (e.mui) return e;
  const r = On({ spacing: e }),
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
function er(...e) {
  const r = e.reduce(
      (t, o) => (
        o.filterProps.forEach((a) => {
          t[a] = o;
        }),
        t
      ),
      {},
    ),
    n = (t) => Object.keys(t).reduce((o, a) => (r[a] ? Le(o, r[a](t)) : o), {});
  return (
    (n.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((t, o) => Object.assign(t, o.propTypes), {})
        : {}),
    (n.filterProps = e.reduce((t, o) => t.concat(o.filterProps), [])),
    n
  );
}
function fe(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const Gt = F({ prop: 'border', themeKey: 'borders', transform: fe }),
  Jt = F({ prop: 'borderTop', themeKey: 'borders', transform: fe }),
  Kt = F({ prop: 'borderRight', themeKey: 'borders', transform: fe }),
  Wt = F({ prop: 'borderBottom', themeKey: 'borders', transform: fe }),
  Xt = F({ prop: 'borderLeft', themeKey: 'borders', transform: fe }),
  Yt = F({ prop: 'borderColor', themeKey: 'palette' }),
  Zt = F({ prop: 'borderTopColor', themeKey: 'palette' }),
  Qt = F({ prop: 'borderRightColor', themeKey: 'palette' }),
  eo = F({ prop: 'borderBottomColor', themeKey: 'palette' }),
  ro = F({ prop: 'borderLeftColor', themeKey: 'palette' }),
  rr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const r = Ue(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        n = (t) => ({ borderRadius: qe(r, t) });
      return be(e, e.borderRadius, n);
    }
    return null;
  };
rr.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: xe } : {};
rr.filterProps = ['borderRadius'];
er(Gt, Jt, Kt, Wt, Xt, Yt, Zt, Qt, eo, ro, rr);
const nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'gap'),
      n = (t) => ({ gap: qe(r, t) });
    return be(e, e.gap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== 'production' ? { gap: xe } : {};
nr.filterProps = ['gap'];
const tr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'columnGap'),
      n = (t) => ({ columnGap: qe(r, t) });
    return be(e, e.columnGap, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: xe } : {};
tr.filterProps = ['columnGap'];
const or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'rowGap'),
      n = (t) => ({ rowGap: qe(r, t) });
    return be(e, e.rowGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: xe } : {};
or.filterProps = ['rowGap'];
const no = F({ prop: 'gridColumn' }),
  to = F({ prop: 'gridRow' }),
  oo = F({ prop: 'gridAutoFlow' }),
  ao = F({ prop: 'gridAutoColumns' }),
  so = F({ prop: 'gridAutoRows' }),
  io = F({ prop: 'gridTemplateColumns' }),
  co = F({ prop: 'gridTemplateRows' }),
  lo = F({ prop: 'gridTemplateAreas' }),
  uo = F({ prop: 'gridArea' });
er(nr, tr, or, no, to, oo, ao, so, io, co, lo, uo);
function Me(e, r) {
  return r === 'grey' ? r : e;
}
const fo = F({ prop: 'color', themeKey: 'palette', transform: Me }),
  po = F({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Me }),
  ho = F({ prop: 'backgroundColor', themeKey: 'palette', transform: Me });
er(fo, po, ho);
function re(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const mo = F({ prop: 'width', transform: re }),
  xr = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const r = (n) => {
        var t;
        return {
          maxWidth:
            ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null
              ? void 0
              : t[n]) ||
            vr[n] ||
            re(n),
        };
      };
      return be(e, e.maxWidth, r);
    }
    return null;
  };
xr.filterProps = ['maxWidth'];
const go = F({ prop: 'minWidth', transform: re }),
  bo = F({ prop: 'height', transform: re }),
  yo = F({ prop: 'maxHeight', transform: re }),
  vo = F({ prop: 'minHeight', transform: re });
F({ prop: 'size', cssProperty: 'width', transform: re });
F({ prop: 'size', cssProperty: 'height', transform: re });
const xo = F({ prop: 'boxSizing' });
er(mo, xr, go, bo, yo, vo, xo);
const ko = {
    border: { themeKey: 'borders', transform: fe },
    borderTop: { themeKey: 'borders', transform: fe },
    borderRight: { themeKey: 'borders', transform: fe },
    borderBottom: { themeKey: 'borders', transform: fe },
    borderLeft: { themeKey: 'borders', transform: fe },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: rr },
    color: { themeKey: 'palette', transform: Me },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: Me },
    backgroundColor: { themeKey: 'palette', transform: Me },
    p: { style: K },
    pt: { style: K },
    pr: { style: K },
    pb: { style: K },
    pl: { style: K },
    px: { style: K },
    py: { style: K },
    padding: { style: K },
    paddingTop: { style: K },
    paddingRight: { style: K },
    paddingBottom: { style: K },
    paddingLeft: { style: K },
    paddingX: { style: K },
    paddingY: { style: K },
    paddingInline: { style: K },
    paddingInlineStart: { style: K },
    paddingInlineEnd: { style: K },
    paddingBlock: { style: K },
    paddingBlockStart: { style: K },
    paddingBlockEnd: { style: K },
    m: { style: J },
    mt: { style: J },
    mr: { style: J },
    mb: { style: J },
    ml: { style: J },
    mx: { style: J },
    my: { style: J },
    margin: { style: J },
    marginTop: { style: J },
    marginRight: { style: J },
    marginBottom: { style: J },
    marginLeft: { style: J },
    marginX: { style: J },
    marginY: { style: J },
    marginInline: { style: J },
    marginInlineStart: { style: J },
    marginInlineEnd: { style: J },
    marginBlock: { style: J },
    marginBlockStart: { style: J },
    marginBlockEnd: { style: J },
    displayPrint: { cssProperty: !1, transform: (e) => ({ '@media print': { display: e } }) },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
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
    gap: { style: nr },
    rowGap: { style: or },
    columnGap: { style: tr },
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: { themeKey: 'zIndex' },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: { themeKey: 'shadows' },
    width: { transform: re },
    maxWidth: { style: xr },
    minWidth: { transform: re },
    height: { transform: re },
    maxHeight: { transform: re },
    minHeight: { transform: re },
    boxSizing: {},
    fontFamily: { themeKey: 'typography' },
    fontSize: { themeKey: 'typography' },
    fontStyle: { themeKey: 'typography' },
    fontWeight: { themeKey: 'typography' },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: { cssProperty: !1, themeKey: 'typography' },
  },
  kr = ko;
function So(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []),
    n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function No(e, r) {
  return typeof e == 'function' ? e(r) : e;
}
function Eo() {
  function e(n, t, o, a) {
    const s = { [n]: t, theme: o },
      i = a[n];
    if (!i) return { [n]: t };
    const { cssProperty: c = n, themeKey: l, transform: f, style: p } = i;
    if (t == null) return null;
    if (l === 'typography' && t === 'inherit') return { [n]: t };
    const u = Ye(o, l) || {};
    return p
      ? p(s)
      : be(s, t, (y) => {
          let h = Xe(u, f, y);
          return (
            y === h &&
              typeof y == 'string' &&
              (h = Xe(u, f, `${n}${y === 'default' ? '' : ge(y)}`, y)),
            c === !1 ? h : { [c]: h }
          );
        });
  }
  function r(n) {
    var t;
    const { sx: o, theme: a = {} } = n || {};
    if (!o) return null;
    const s = (t = a.unstable_sxConfig) != null ? t : kr;
    function i(c) {
      let l = c;
      if (typeof c == 'function') l = c(a);
      else if (typeof c != 'object') return c;
      if (!l) return null;
      const f = jt(a.breakpoints),
        p = Object.keys(f);
      let u = f;
      return (
        Object.keys(l).forEach((b) => {
          const y = No(l[b], a);
          if (y != null)
            if (typeof y == 'object')
              if (s[b]) u = Le(u, e(b, y, a, s));
              else {
                const h = be({ theme: a }, y, (d) => ({ [b]: d }));
                So(h, y) ? (u[b] = r({ sx: y, theme: a })) : (u = Le(u, h));
              }
            else u = Le(u, e(b, y, a, s));
        }),
        Bt(p, u)
      );
    }
    return Array.isArray(o) ? o.map(i) : i(o);
  }
  return r;
}
const $n = Eo();
$n.filterProps = ['sx'];
const Sr = $n,
  wo = ['breakpoints', 'palette', 'spacing', 'shape'];
function Nr(e = {}, ...r) {
  const { breakpoints: n = {}, palette: t = {}, spacing: o, shape: a = {} } = e,
    s = ye(e, wo),
    i = At(n),
    c = qt(o);
  let l = me(
    {
      breakpoints: i,
      direction: 'ltr',
      components: {},
      palette: A({ mode: 'light' }, t),
      spacing: c,
      shape: A({}, Mt, a),
    },
    s,
  );
  return (
    (l = r.reduce((f, p) => me(f, p), l)),
    (l.unstable_sxConfig = A({}, kr, s == null ? void 0 : s.unstable_sxConfig)),
    (l.unstable_sx = function (p) {
      return Sr({ sx: p, theme: this });
    }),
    l
  );
}
function To(e) {
  return Object.keys(e).length === 0;
}
function Co(e = null) {
  const r = Fe.useContext(jn.ThemeContext);
  return !r || To(r) ? e : r;
}
const _o = Nr();
function Oo(e = _o) {
  return Co(e);
}
const Ro = ['variant'];
function Zr(e) {
  return e.length === 0;
}
function An(e) {
  const { variant: r } = e,
    n = ye(e, Ro);
  let t = r || '';
  return (
    Object.keys(n)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (t += Zr(t) ? e[o] : ge(e[o]))
          : (t += `${Zr(t) ? o : ge(o)}${ge(e[o].toString())}`);
      }),
    t
  );
}
const $o = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function Ao(e) {
  return Object.keys(e).length === 0;
}
function Po(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const Mo = (e, r) =>
    r.components && r.components[e] && r.components[e].styleOverrides
      ? r.components[e].styleOverrides
      : null,
  Io = (e, r) => {
    let n = [];
    r &&
      r.components &&
      r.components[e] &&
      r.components[e].variants &&
      (n = r.components[e].variants);
    const t = {};
    return (
      n.forEach((o) => {
        const a = An(o.props);
        t[a] = o.style;
      }),
      t
    );
  },
  jo = (e, r, n, t) => {
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
            l && s.push(r[An(c.props)]);
        }),
      s
    );
  };
function Ke(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Bo = Nr(),
  Do = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function ze({ defaultTheme: e, theme: r, themeId: n }) {
  return Ao(r) ? e : r[n] || r;
}
function zo(e = {}) {
  const {
      themeId: r,
      defaultTheme: n = Bo,
      rootShouldForwardProp: t = Ke,
      slotShouldForwardProp: o = Ke,
    } = e,
    a = (s) => Sr(A({}, s, { theme: ze(A({}, s, { defaultTheme: n, themeId: r })) }));
  return (
    (a.__mui_systemSx = !0),
    (s, i = {}) => {
      Ot(s, ($) => $.filter((m) => !(m != null && m.__mui_systemSx)));
      const { name: c, slot: l, skipVariantsResolver: f, skipSx: p, overridesResolver: u } = i,
        b = ye(i, $o),
        y = f !== void 0 ? f : (l && l !== 'Root') || !1,
        h = p || !1;
      let d;
      process.env.NODE_ENV !== 'production' && c && (d = `${c}-${Do(l || 'Root')}`);
      let E = Ke;
      l === 'Root' ? (E = t) : l ? (E = o) : Po(s) && (E = void 0);
      const W = _t(s, A({ shouldForwardProp: E, label: d }, b)),
        H = ($, ...m) => {
          const X = m
            ? m.map((j) =>
                typeof j == 'function' && j.__emotion_real !== j
                  ? (Y) => j(A({}, Y, { theme: ze(A({}, Y, { defaultTheme: n, themeId: r })) }))
                  : j,
              )
            : [];
          let ne = $;
          c &&
            u &&
            X.push((j) => {
              const Y = ze(A({}, j, { defaultTheme: n, themeId: r })),
                ue = Mo(c, Y);
              if (ue) {
                const ie = {};
                return (
                  Object.entries(ue).forEach(([G, de]) => {
                    ie[G] = typeof de == 'function' ? de(A({}, j, { theme: Y })) : de;
                  }),
                  u(j, ie)
                );
              }
              return null;
            }),
            c &&
              !y &&
              X.push((j) => {
                const Y = ze(A({}, j, { defaultTheme: n, themeId: r }));
                return jo(j, Io(c, Y), Y, c);
              }),
            h || X.push(a);
          const le = X.length - m.length;
          if (Array.isArray($) && le > 0) {
            const j = new Array(le).fill('');
            (ne = [...$, ...j]), (ne.raw = [...$.raw, ...j]);
          } else
            typeof $ == 'function' &&
              $.__emotion_real !== $ &&
              (ne = (j) => $(A({}, j, { theme: ze(A({}, j, { defaultTheme: n, themeId: r })) })));
          const se = W(ne, ...X);
          if (process.env.NODE_ENV !== 'production') {
            let j;
            c && (j = `${c}${l || ''}`),
              j === void 0 && (j = `Styled(${xt(s)})`),
              (se.displayName = j);
          }
          return s.muiName && (se.muiName = s.muiName), se;
        };
      return W.withConfig && (H.withConfig = W.withConfig), H;
    }
  );
}
function Vo(e) {
  const { theme: r, name: n, props: t } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps
    ? t
    : Cn(r.components[n].defaultProps, t);
}
function Lo({ props: e, name: r, defaultTheme: n, themeId: t }) {
  let o = Oo(n);
  return t && (o = o[t] || o), Vo({ theme: o, name: r, props: e });
}
function Pn(e, r = 0, n = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < r || e > n) &&
      console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`),
    Math.min(Math.max(r, e), n)
  );
}
function Fo(e) {
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
function je(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return je(Fo(e));
  const r = e.indexOf('('),
    n = e.substring(0, r);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(n) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Ie(9, e),
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
          : Ie(10, o),
      );
  } else t = t.split(',');
  return (t = t.map((a) => parseFloat(a))), { type: n, values: t, colorSpace: o };
}
function Er(e) {
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
function Ho(e) {
  e = je(e);
  const { values: r } = e,
    n = r[0],
    t = r[1] / 100,
    o = r[2] / 100,
    a = t * Math.min(o, 1 - o),
    s = (l, f = (l + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let i = 'rgb';
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((i += 'a'), c.push(r[3])), Er({ type: i, values: c });
}
function Qr(e) {
  e = je(e);
  let r = e.type === 'hsl' || e.type === 'hsla' ? je(Ho(e)).values : e.values;
  return (
    (r = r.map(
      (n) => (
        e.type !== 'color' && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3))
  );
}
function en(e, r) {
  const n = Qr(e),
    t = Qr(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function Uo(e, r) {
  if (((e = je(e)), (r = Pn(r)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - r;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - r;
  return Er(e);
}
function qo(e, r) {
  if (((e = je(e)), (r = Pn(r)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf('rgb') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * r;
  return Er(e);
}
function Go(e, r) {
  return A(
    {
      toolbar: {
        minHeight: 56,
        [e.up('xs')]: { '@media (orientation: landscape)': { minHeight: 48 } },
        [e.up('sm')]: { minHeight: 64 },
      },
    },
    r,
  );
}
const Jo = { black: '#000', white: '#fff' },
  He = Jo,
  Ko = {
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
  Wo = Ko,
  Xo = {
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
  _e = Xo,
  Yo = {
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
  Oe = Yo,
  Zo = {
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
  Ve = Zo,
  Qo = {
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
  Re = Qo,
  ea = {
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
  $e = ea,
  ra = {
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
  Ae = ra,
  na = ['mode', 'contrastThreshold', 'tonalOffset'],
  rn = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: He.white, default: He.white },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  dr = {
    text: {
      primary: He.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
    action: {
      active: He.white,
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
function nn(e, r, n, t) {
  const o = t.light || t,
    a = t.dark || t * 1.5;
  e[r] ||
    (e.hasOwnProperty(n)
      ? (e[r] = e[n])
      : r === 'light'
      ? (e.light = qo(e.main, o))
      : r === 'dark' && (e.dark = Uo(e.main, a)));
}
function ta(e = 'light') {
  return e === 'dark'
    ? { main: Re[200], light: Re[50], dark: Re[400] }
    : { main: Re[700], light: Re[400], dark: Re[800] };
}
function oa(e = 'light') {
  return e === 'dark'
    ? { main: _e[200], light: _e[50], dark: _e[400] }
    : { main: _e[500], light: _e[300], dark: _e[700] };
}
function aa(e = 'light') {
  return e === 'dark'
    ? { main: Oe[500], light: Oe[300], dark: Oe[700] }
    : { main: Oe[700], light: Oe[400], dark: Oe[800] };
}
function sa(e = 'light') {
  return e === 'dark'
    ? { main: $e[400], light: $e[300], dark: $e[700] }
    : { main: $e[700], light: $e[500], dark: $e[900] };
}
function ia(e = 'light') {
  return e === 'dark'
    ? { main: Ae[400], light: Ae[300], dark: Ae[700] }
    : { main: Ae[800], light: Ae[500], dark: Ae[900] };
}
function ca(e = 'light') {
  return e === 'dark'
    ? { main: Ve[400], light: Ve[300], dark: Ve[700] }
    : { main: '#ed6c02', light: Ve[500], dark: Ve[900] };
}
function la(e) {
  const { mode: r = 'light', contrastThreshold: n = 3, tonalOffset: t = 0.2 } = e,
    o = ye(e, na),
    a = e.primary || ta(r),
    s = e.secondary || oa(r),
    i = e.error || aa(r),
    c = e.info || sa(r),
    l = e.success || ia(r),
    f = e.warning || ca(r);
  function p(h) {
    const d = en(h, dr.text.primary) >= n ? dr.text.primary : rn.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const E = en(h, d);
      E < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${E}:1 for ${d} on ${h}`,
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
      mainShade: E = 500,
      lightShade: W = 300,
      darkShade: H = 700,
    }) => {
      if (((h = A({}, h)), !h.main && h[E] && (h.main = h[E]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`
            : Ie(11, d ? ` (${d})` : '', E),
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
            : Ie(12, d ? ` (${d})` : '', JSON.stringify(h.main)),
        );
      return (
        nn(h, 'light', W, t), nn(h, 'dark', H, t), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    b = { dark: dr, light: rn };
  return (
    process.env.NODE_ENV !== 'production' &&
      (b[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)),
    me(
      A(
        {
          common: A({}, He),
          mode: r,
          primary: u({ color: a, name: 'primary' }),
          secondary: u({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          error: u({ color: i, name: 'error' }),
          warning: u({ color: f, name: 'warning' }),
          info: u({ color: c, name: 'info' }),
          success: u({ color: l, name: 'success' }),
          grey: Wo,
          contrastThreshold: n,
          getContrastText: p,
          augmentColor: u,
          tonalOffset: t,
        },
        b[r],
      ),
      o,
    )
  );
}
const ua = [
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
function da(e) {
  return Math.round(e * 1e5) / 1e5;
}
const tn = { textTransform: 'uppercase' },
  on = '"Roboto", "Helvetica", "Arial", sans-serif';
function fa(e, r) {
  const n = typeof r == 'function' ? r(e) : r,
    {
      fontFamily: t = on,
      fontSize: o = 14,
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: i = 500,
      fontWeightBold: c = 700,
      htmlFontSize: l = 16,
      allVariants: f,
      pxToRem: p,
    } = n,
    u = ye(n, ua);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof l != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const b = o / 14,
    y = p || ((E) => `${(E / l) * b}rem`),
    h = (E, W, H, $, m) =>
      A(
        { fontFamily: t, fontWeight: E, fontSize: y(W), lineHeight: H },
        t === on ? { letterSpacing: `${da($ / W)}em` } : {},
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
      button: h(i, 14, 1.75, 0.4, tn),
      caption: h(s, 12, 1.66, 0.4),
      overline: h(s, 12, 2.66, 1, tn),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return me(
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
    { clone: !1 },
  );
}
const pa = 0.2,
  ha = 0.14,
  ma = 0.12;
function q(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${pa})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ha})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ma})`,
  ].join(',');
}
const ga = [
    'none',
    q(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    q(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    q(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    q(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    q(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    q(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    q(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    q(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    q(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    q(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    q(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    q(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    q(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    q(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    q(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    q(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    q(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    q(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    q(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    q(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    q(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    q(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    q(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    q(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  ba = ga,
  ya = ['duration', 'easing', 'delay'],
  va = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  xa = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function an(e) {
  return `${Math.round(e)}ms`;
}
function ka(e) {
  if (!e) return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Sa(e) {
  const r = A({}, va, e.easing),
    n = A({}, xa, e.duration);
  return A(
    {
      getAutoHeightDuration: ka,
      create: (o = ['all'], a = {}) => {
        const { duration: s = n.standard, easing: i = r.easeInOut, delay: c = 0 } = a,
          l = ye(a, ya);
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
              `${f} ${typeof s == 'string' ? s : an(s)} ${i} ${typeof c == 'string' ? c : an(c)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: r, duration: n },
  );
}
const Na = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Ea = Na,
  wa = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Ta(e = {}, ...r) {
  const { mixins: n = {}, palette: t = {}, transitions: o = {}, typography: a = {} } = e,
    s = ye(e, wa);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Ie(18),
    );
  const i = la(t),
    c = Nr(e);
  let l = me(c, {
    mixins: Go(c.breakpoints, n),
    palette: i,
    shadows: ba.slice(),
    typography: fa(i, a),
    transitions: Sa(o),
    zIndex: A({}, Ea),
  });
  if (
    ((l = me(l, s)), (l = r.reduce((f, p) => me(f, p), l)), process.env.NODE_ENV !== 'production')
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
              const d = yr('', y);
              console.error(
                [
                  `MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(u, null, 2),
                  '',
                  `Instead, you need to use the '&.${d}' syntax:`,
                  JSON.stringify({ root: { [`&.${d}`]: h } }, null, 2),
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
    (l.unstable_sxConfig = A({}, kr, s == null ? void 0 : s.unstable_sxConfig)),
    (l.unstable_sx = function (p) {
      return Sr({ sx: p, theme: this });
    }),
    l
  );
}
const Ca = Ta(),
  Mn = Ca,
  In = '$$material';
function _a({ props: e, name: r }) {
  return Lo({ props: e, name: r, defaultTheme: Mn, themeId: In });
}
const Oa = (e) => Ke(e) && e !== 'classes',
  Ra = zo({ themeId: In, defaultTheme: Mn, rootShouldForwardProp: Oa }),
  $a = Ra;
function Aa(e) {
  return yr('MuiSvgIcon', e);
}
Tt('MuiSvgIcon', [
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
const Pa = [
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
  Ma = (e) => {
    const { color: r, fontSize: n, classes: t } = e,
      o = { root: ['root', r !== 'inherit' && `color${ge(r)}`, `fontSize${ge(n)}`] };
    return kt(o, Aa, t);
  },
  Ia = $a('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, r) => {
      const { ownerState: n } = e;
      return [
        r.root,
        n.color !== 'inherit' && r[`color${ge(n.color)}`],
        r[`fontSize${ge(n.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: r }) => {
    var n, t, o, a, s, i, c, l, f, p, u, b, y;
    return {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
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
  wr = Fe.forwardRef(function (r, n) {
    const t = _a({ props: r, name: 'MuiSvgIcon' }),
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
      b = ye(t, Pa),
      y = Fe.isValidElement(o) && o.type === 'svg',
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
    const E = Ma(h);
    return S.jsxs(
      Ia,
      A(
        {
          as: i,
          className: Ct(E.root, a),
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
          children: [y ? o.props.children : o, p ? S.jsx('title', { children: p }) : null],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (wr.propTypes = {
    children: U.node,
    classes: U.object,
    className: U.string,
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
    component: U.elementType,
    fontSize: U.oneOfType([U.oneOf(['inherit', 'large', 'medium', 'small']), U.string]),
    htmlColor: U.string,
    inheritViewBox: U.bool,
    shapeRendering: U.string,
    sx: U.oneOfType([U.arrayOf(U.oneOfType([U.func, U.object, U.bool])), U.func, U.object]),
    titleAccess: U.string,
    viewBox: U.string,
  });
wr.muiName = 'SvgIcon';
const sn = wr;
function ja(e, r) {
  function n(t, o) {
    return S.jsx(sn, A({ 'data-testid': `${r}Icon`, ref: o }, t, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (n.displayName = `${r}Icon`),
    (n.muiName = sn.muiName),
    Fe.memo(Fe.forwardRef(n))
  );
}
const Ba = ja(S.jsx('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' }), 'Menu');
function Da(e) {
  const [r, n] = oe.useState(!1),
    [t, o] = oe.useState(!1),
    a = oe.useCallback(() => {
      r && n(!1), o(!1);
    }, [r, n]),
    s = oe.useCallback(
      (y) => {
        y.stopPropagation(),
          n((h) => {
            const d = !h;
            return d && y.shiftKey && o(!0), d;
          });
      },
      [n, o],
    ),
    i = oe.useRef(null),
    c = oe.useRef(null),
    l = oe.useRef(null),
    [f, p] = oe.useState(0);
  oe.useEffect(() => {
    var y;
    r && i.current && p((y = i.current) == null ? void 0 : y.clientHeight);
  }, [r, i.current]);
  function u(y) {
    return a(), e.commandHandler(y);
  }
  let b = e.menu;
  return (
    !b && e.dataHandler && (b = e.dataHandler(t)),
    S.jsx('div', {
      ref: i,
      style: { position: 'relative' },
      children: S.jsx(Q.AppBar, {
        position: 'static',
        children: S.jsxs(Q.Toolbar, {
          className: `papi-toolbar ${e.className ?? ''}`,
          ref: c,
          variant: 'dense',
          children: [
            b
              ? S.jsx(Q.IconButton, {
                  edge: 'start',
                  className: `papi-menuButton ${e.className ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: s,
                  children: S.jsx(Ba, {}),
                })
              : null,
            e.children
              ? S.jsx('div', { ref: l, style: { padding: 10 }, children: e.children })
              : null,
            b
              ? S.jsx(Q.Drawer, {
                  className: `papi-menu-drawer ${e.className ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: r,
                  onClose: a,
                  PaperProps: { style: { top: f, height: 'fit-content' } },
                  children: S.jsx(Sn, { commandHandler: u, columns: b.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
exports.Button = Se;
exports.Checkbox = cn;
exports.ComboBox = ln;
exports.GridMenu = Sn;
exports.LabelPosition = Ee;
exports.MenuItem = kn;
exports.RefSelector = Qn;
exports.Slider = et;
exports.Snackbar = nt;
exports.Switch = rt;
exports.Table = ot;
exports.TextField = We;
exports.Toolbar = Da;
function za(e, r = 'top') {
  if (!e || typeof document > 'u') return;
  const n = document.head || document.querySelector('head'),
    t = n.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    r === 'top' && t ? n.insertBefore(o, t) : n.appendChild(o);
}
za(
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
//# sourceMappingURL=index.cjs.js.map
