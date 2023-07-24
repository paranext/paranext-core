'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const l = require('react/jsx-runtime'),
  k = require('@mui/material'),
  q = require('react'),
  J = require('react-data-grid');
function y({ isDisabled: e = !1, className: n, onClick: r, onContextMenu: o, children: t }) {
  return l.jsx(k.Button, {
    disabled: e,
    className: `papi-button ${n ?? ''}`,
    onClick: r,
    onContextMenu: o,
    children: t,
  });
}
var C = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(C || {});
function F({
  isChecked: e,
  labelText: n = '',
  labelPosition: r = C.After,
  isIndeterminate: o = !1,
  isDefaultChecked: t,
  isDisabled: i = !1,
  hasError: c = !1,
  className: u,
  onChange: h,
}) {
  const d = l.jsx(k.Checkbox, {
    checked: e,
    indeterminate: o,
    defaultChecked: t,
    disabled: i,
    className: `papi-checkbox ${c ? 'error' : ''} ${u ?? ''}`,
    onChange: h,
  });
  let b;
  if (n) {
    const f = r === C.Before || r === C.Above,
      v = l.jsx('span', {
        className: `papi-checkbox-label ${c ? 'error' : ''} ${u ?? ''}`,
        children: n,
      }),
      E = r === C.Before || r === C.After,
      T = E ? v : l.jsx('div', { children: v }),
      O = E ? d : l.jsx('div', { children: d });
    b = l.jsxs(k.FormLabel, {
      className: `papi-checkbox ${r.toString()}`,
      disabled: i,
      error: c,
      children: [f && T, O, !f && T],
    });
  } else b = d;
  return b;
}
function U({
  title: e,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: t = !1,
  width: i,
  options: c = [],
  className: u,
  value: h,
  onChange: d,
  onFocus: b,
  onBlur: f,
}) {
  return l.jsx(k.Autocomplete, {
    disablePortal: !0,
    disabled: n,
    disableClearable: !r,
    fullWidth: t,
    options: c,
    className: `papi-combo-box ${o ? 'error' : ''} ${u ?? ''}`,
    value: h,
    onChange: d,
    onFocus: b,
    onBlur: f,
    renderInput: (v) =>
      l.jsx(k.TextField, {
        ...v,
        error: o,
        fullWidth: t,
        disabled: n,
        label: e,
        style: { width: i },
      }),
  });
}
var Ne = Object.defineProperty,
  ve = (e, n, r) =>
    n in e ? Ne(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r),
  s = (e, n, r) => (ve(e, typeof n != 'symbol' ? n + '' : n, r), r);
const S = [
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
  A = [
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
  K = [
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
  z = Me();
function B(e, n = !0) {
  return n && (e = e.toUpperCase()), e in z ? z[e] : 0;
}
function V(e) {
  return B(e) > 0;
}
function xe(e) {
  const n = typeof e == 'string' ? B(e) : e;
  return n >= 40 && n <= 66;
}
function ye(e) {
  return (typeof e == 'string' ? B(e) : e) <= 39;
}
function $(e) {
  return e <= 66;
}
function we(e) {
  const n = typeof e == 'string' ? B(e) : e;
  return Q(n) && !$(n);
}
function* Ce() {
  for (let e = 1; e <= S.length; e++) yield e;
}
const Se = 1,
  Z = S.length;
function Ee() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function I(e, n = '***') {
  const r = e - 1;
  return r < 0 || r >= S.length ? n : S[r];
}
function W(e) {
  return e <= 0 || e > Z ? '******' : K[e - 1];
}
function Be(e) {
  return W(B(e));
}
function Q(e) {
  const n = typeof e == 'number' ? I(e) : e;
  return V(n) && !A.includes(n);
}
function _e(e) {
  const n = typeof e == 'number' ? I(e) : e;
  return V(n) && A.includes(n);
}
function Te(e) {
  return K[e - 1].includes('*obsolete*');
}
function Me() {
  const e = {};
  for (let n = 0; n < S.length; n++) e[S[n]] = n + 1;
  return e;
}
const m = {
  allBookIds: S,
  nonCanonicalIds: A,
  bookIdToNumber: B,
  isBookIdValid: V,
  isBookNT: xe,
  isBookOT: ye,
  isBookOTNT: $,
  isBookDC: we,
  allBookNumbers: Ce,
  firstBook: Se,
  lastBook: Z,
  extraBooks: Ee,
  bookNumberToId: I,
  bookNumberToEnglishName: W,
  bookIdToEnglishName: Be,
  isCanonical: Q,
  isExtraMaterial: _e,
  isObsolete: Te,
};
var x = ((e) => (
  (e[(e.Unknown = 0)] = 'Unknown'),
  (e[(e.Original = 1)] = 'Original'),
  (e[(e.Septuagint = 2)] = 'Septuagint'),
  (e[(e.Vulgate = 3)] = 'Vulgate'),
  (e[(e.English = 4)] = 'English'),
  (e[(e.RussianProtestant = 5)] = 'RussianProtestant'),
  (e[(e.RussianOrthodox = 6)] = 'RussianOrthodox'),
  e
))(x || {});
const w = class {
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
let p = w;
s(p, 'Original', new w(x.Original)),
  s(p, 'Septuagint', new w(x.Septuagint)),
  s(p, 'Vulgate', new w(x.Vulgate)),
  s(p, 'English', new w(x.English)),
  s(p, 'RussianProtestant', new w(x.RussianProtestant)),
  s(p, 'RussianOrthodox', new w(x.RussianOrthodox));
function D(e, n) {
  const r = n[0];
  for (let o = 1; o < n.length; o++) e = e.split(n[o]).join(r);
  return e.split(r);
}
var Y = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(Y || {});
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
          i = n != null && n instanceof p ? n : void 0;
        this.setEmpty(i), this.parse(t);
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
  static parse(e, n = a.defaultVersification) {
    const r = new a(n);
    return r.parse(e), r;
  }
  static isVerseParseable(e) {
    return (
      e.length > 0 &&
      '0123456789'.includes(e[0]) &&
      !e.endsWith(this.verseRangeSeparator) &&
      !e.endsWith(this.verseSequenceIndicator)
    );
  }
  static tryParse(e) {
    let n;
    try {
      return (n = a.parse(e)), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof _) return (n = new a()), { success: !1, verseRef: n };
      throw r;
    }
  }
  static getBBBCCCVVV(e, n, r) {
    return (
      (e % a.bcvMaxValue) * a.bookDigitShifter +
      (n >= 0 ? (n % a.bcvMaxValue) * a.chapterDigitShifter : 0) +
      (r >= 0 ? r % a.bcvMaxValue : 0)
    );
  }
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
      (this._verse.includes(a.verseRangeSeparator) ||
        this._verse.includes(a.verseSequenceIndicator))
    );
  }
  get book() {
    return m.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = m.bookIdToNumber(e);
  }
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
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
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > m.lastBook)
      throw new _('BookNum must be greater than zero and less than or equal to last book');
    this._bookNum = e;
  }
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new p(e) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(a.verseRangeSeparators, a.verseSequenceIndicators);
  }
  get BBBCCC() {
    return a.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return a.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(e) {
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const t = e.split('/');
      if (((e = t[0]), t.length > 1))
        try {
          const i = +t[1].trim();
          this.versification = new p(x[i]);
        } catch {
          throw new _('Invalid reference : ' + e);
        }
    }
    const n = e.trim().split(' ');
    if (n.length !== 2) throw new _('Invalid reference : ' + e);
    const r = n[1].split(':'),
      o = +r[0];
    if (
      r.length !== 2 ||
      m.bookIdToNumber(n[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !a.isVerseParseable(r[1])
    )
      throw new _('Invalid reference : ' + e);
    this.updateInternal(n[0], r[0], r[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new a(this);
  }
  toString() {
    const e = this.book;
    return e === '' ? '' : `${e} ${this.chapter}:${this.verse}`;
  }
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
  allVerses(e = !1, n = a.verseRangeSeparators, r = a.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      t = D(this._verse, r);
    for (const i of t.map((c) => D(c, n))) {
      const c = this.clone();
      c.verse = i[0];
      const u = c.verseNum;
      if ((o.push(c), i.length > 1)) {
        const h = this.clone();
        if (((h.verse = i[1]), !e))
          for (let d = u + 1; d < h.verseNum; d++) {
            const b = new a(this._bookNum, this._chapterNum, d, this.versification);
            this.isExcluded || o.push(b);
          }
        o.push(h);
      }
    }
    return o;
  }
  validateVerse(e, n) {
    if (!this.verse) return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const t = o.internalValid;
      if (t !== 0) return t;
      const i = o.BBBCCCVVV;
      if (r > i) return 3;
      if (r === i) return 4;
      r = i;
    }
    return 0;
  }
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > m.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = a.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, n, r) {
    (this.bookNum = m.bookIdToNumber(e)), (this.chapter = n), (this.verse = r);
  }
};
let N = a;
s(N, 'defaultVersification', p.English),
  s(N, 'verseRangeSeparator', '-'),
  s(N, 'verseSequenceIndicator', ','),
  s(N, 'verseRangeSeparators', [a.verseRangeSeparator]),
  s(N, 'verseSequenceIndicators', [a.verseSequenceIndicator]),
  s(N, 'chapterDigitShifter', 1e3),
  s(N, 'bookDigitShifter', a.chapterDigitShifter * a.chapterDigitShifter),
  s(N, 'bcvMaxValue', a.chapterDigitShifter - 1),
  s(N, 'ValidStatusType', Y);
class _ extends Error {}
const ee = [
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
function H() {
  return m.allBookIds.map((e) => ({ bookId: e, label: m.bookIdToEnglishName(e) }));
}
function P(e) {
  return { bookId: m.bookNumberToId(e), label: m.bookNumberToEnglishName(e) };
}
const ne = 1,
  Oe = ee.length - 1,
  re = 1,
  oe = 1,
  te = (e) => {
    var n;
    return ((n = ee[e]) == null ? void 0 : n.chapters) ?? -1;
  },
  X = (e, n) => ({
    bookNum: Math.max(ne, Math.min(e.bookNum + n, Oe)),
    chapterNum: 1,
    verseNum: 1,
  }),
  j = (e, n) => ({
    ...e,
    chapterNum: Math.min(Math.max(re, e.chapterNum + n), te(e.bookNum)),
    verseNum: 1,
  }),
  L = (e, n) => ({ ...e, verseNum: Math.max(oe, e.verseNum + n) });
function M({
  variant: e = 'outlined',
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: t,
  label: i,
  placeholder: c,
  isRequired: u = !1,
  className: h,
  defaultValue: d,
  value: b,
  onChange: f,
  onFocus: v,
  onBlur: E,
}) {
  return l.jsx(k.TextField, {
    variant: e,
    disabled: n,
    error: r,
    fullWidth: o,
    helperText: t,
    label: i,
    placeholder: c,
    required: u,
    className: `papi-textfield ${h ?? ''}`,
    defaultValue: d,
    value: b,
    onChange: f,
    onFocus: v,
    onBlur: E,
  });
}
function Ae({ scrRef: e, handleSubmit: n }) {
  const [r, o] = q.useState(P(e.bookNum)),
    t = (h) => {
      o(P(h.bookNum)), n(h);
    },
    i = (h, d) => {
      const f = { bookNum: m.bookIdToNumber(d.bookId), chapterNum: 1, verseNum: 1 };
      t(f);
    },
    c = (h) => {
      n({ ...e, chapterNum: +h.target.value });
    },
    u = (h) => {
      n({ ...e, verseNum: +h.target.value });
    };
  return l.jsxs(l.Fragment, {
    children: [
      l.jsx(U, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: H(),
        onChange: i,
        value: r,
        isClearable: !1,
        width: 200,
      }),
      l.jsx(y, { onClick: () => t(X(e, -1)), isDisabled: e.bookNum <= ne, children: '<' }),
      l.jsx(y, { onClick: () => t(X(e, 1)), isDisabled: e.bookNum >= H().length, children: '>' }),
      l.jsx(M, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: c,
      }),
      l.jsx(y, { onClick: () => n(j(e, -1)), isDisabled: e.chapterNum <= re, children: '<' }),
      l.jsx(y, {
        onClick: () => n(j(e, 1)),
        isDisabled: e.chapterNum >= te(e.bookNum),
        children: '>',
      }),
      l.jsx(M, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: u,
      }),
      l.jsx(y, { onClick: () => n(L(e, -1)), isDisabled: e.verseNum <= oe, children: '<' }),
      l.jsx(y, { onClick: () => n(L(e, 1)), children: '>' }),
    ],
  });
}
function Ve({
  isDisabled: e = !1,
  orientation: n = 'horizontal',
  min: r = 0,
  max: o = 100,
  step: t = 1,
  showMarks: i = !1,
  defaultValue: c,
  valueLabelDisplay: u = 'off',
  className: h,
  onChange: d,
  onChangeCommitted: b,
}) {
  return l.jsx(k.Slider, {
    disabled: e,
    orientation: n,
    min: r,
    max: o,
    step: t,
    marks: i,
    defaultValue: c,
    valueLabelDisplay: u,
    className: `papi-slider ${n} ${h ?? ''}`,
    onChange: d,
    onChangeCommitted: b,
  });
}
function Ie({ isChecked: e, isDisabled: n = !1, hasError: r = !1, className: o, onChange: t }) {
  return l.jsx(k.Switch, {
    checked: e,
    disabled: n,
    className: `papi-switch ${r ? 'error' : ''} ${o ?? ''}`,
    onChange: t,
  });
}
function Re({
  autoHideDuration: e = null,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: t = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: i = { action: '', message: '', className: `papi-snackbar ${r ?? ''}` },
  children: c,
}) {
  return l.jsx(k.Snackbar, {
    autoHideDuration: e,
    className: `papi-snackbar ${r ?? ''}`,
    open: n,
    onClose: o,
    anchorOrigin: t,
    ContentProps: i,
    children: c,
  });
}
function Je({
  hasAutoFocus: e = !1,
  className: n,
  isDense: r = !1,
  hasDisabledGutters: o = !1,
  hasDivider: t = !1,
  focusVisibleClassName: i,
  onClick: c,
  children: u,
}) {
  return l.jsx(k.MenuItem, {
    autoFocus: e,
    className: n,
    dense: r,
    disableGutters: o,
    divider: t,
    focusVisibleClassName: i,
    onClick: c,
    children: u,
  });
}
function G({ onRowChange: e, row: n, column: r }) {
  const o = (t) => {
    e({ ...n, [r.key]: t.target.value });
  };
  return l.jsx(M, { defaultValue: n[r.key], onChange: o });
}
const ze = ({ onChange: e, disabled: n, checked: r, ...o }) => {
  function t(i) {
    e(i.target.checked, i.nativeEvent.shiftKey);
  }
  return l.jsx(F, { ...o, isChecked: r, isDisabled: n, onChange: t });
};
function De({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: o,
  defaultColumnWidth: t,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: c,
  defaultColumnSortable: u = !0,
  defaultColumnResizable: h = !0,
  rows: d,
  enableSelectColumn: b,
  selectColumnWidth: f = 50,
  rowKeyGetter: v,
  rowHeight: E = 35,
  headerRowHeight: T = 35,
  selectedRows: O,
  onSelectedRowsChange: ae,
  onRowsChange: se,
  onCellClick: ie,
  onCellDoubleClick: le,
  onCellContextMenu: ce,
  onCellKeyDown: he,
  direction: ue = 'ltr',
  enableVirtualization: de = !0,
  onCopy: be,
  onPaste: pe,
  onScroll: ge,
  className: me,
}) {
  const fe = q.useMemo(() => {
    const R = e.map((g) =>
      typeof g.editable == 'function'
        ? { ...g, editable: (ke) => !!g.editable(ke), renderEditCell: g.renderEditCell || G }
        : g.editable && !g.renderEditCell
        ? { ...g, renderEditCell: G }
        : g.renderEditCell && !g.editable
        ? { ...g, editable: !1 }
        : g,
    );
    return b ? [{ ...J.SelectColumn, minWidth: f }, ...R] : R;
  }, [b, e]);
  return l.jsx(J, {
    columns: fe,
    defaultColumnOptions: { width: t, minWidth: i, maxWidth: c, sortable: u, resizable: h },
    sortColumns: n,
    onSortColumnsChange: r,
    onColumnResize: o,
    rows: d,
    rowKeyGetter: v,
    rowHeight: E,
    headerRowHeight: T,
    selectedRows: O,
    onSelectedRowsChange: ae,
    onRowsChange: se,
    onCellClick: ie,
    onCellDoubleClick: le,
    onCellContextMenu: ce,
    onCellKeyDown: he,
    direction: ue,
    enableVirtualization: de,
    onCopy: be,
    onPaste: pe,
    onScroll: ge,
    renderers: { renderCheckbox: ze },
    className: `${me ?? 'rdg-light'}`,
  });
}
exports.Button = y;
exports.Checkbox = F;
exports.ComboBox = U;
exports.LabelPosition = C;
exports.MenuItem = Je;
exports.RefSelector = Ae;
exports.Slider = Ve;
exports.Snackbar = Re;
exports.Switch = Ie;
exports.Table = De;
exports.TextField = M;
function He(e, n = 'top') {
  if (!e || typeof document > 'u') return;
  const r = document.head || document.querySelector('head'),
    o = r.querySelector(':first-child'),
    t = document.createElement('style');
  t.appendChild(document.createTextNode(e)),
    n === 'top' && o ? r.insertBefore(t, o) : r.appendChild(t);
}
He(
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
