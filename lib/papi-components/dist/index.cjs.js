'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const i = require('react/jsx-runtime'),
  k = require('@mui/material'),
  D = require('react'),
  A = require('react-data-grid');
function y({ isDisabled: e = !1, className: n, onClick: r, onContextMenu: o, children: t }) {
  return i.jsx(k.Button, {
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
function j({
  isChecked: e,
  labelText: n = '',
  labelPosition: r = C.After,
  isIndeterminate: o = !1,
  isDefaultChecked: t,
  isDisabled: l = !1,
  hasError: c = !1,
  className: d,
  onChange: h,
}) {
  const u = i.jsx(k.Checkbox, {
    checked: e,
    indeterminate: o,
    defaultChecked: t,
    disabled: l,
    className: `papi-checkbox ${c ? 'error' : ''} ${d ?? ''}`,
    onChange: h,
  });
  let p;
  if (n) {
    const f = r === C.Before || r === C.Above,
      v = i.jsx('span', {
        className: `papi-checkbox-label ${c ? 'error' : ''} ${d ?? ''}`,
        children: n,
      }),
      S = r === C.Before || r === C.After,
      _ = S ? v : i.jsx('div', { children: v }),
      I = S ? u : i.jsx('div', { children: u });
    p = i.jsxs(k.FormLabel, {
      className: `papi-checkbox ${r.toString()}`,
      disabled: l,
      error: c,
      children: [f && _, I, !f && _],
    });
  } else p = u;
  return p;
}
function L({
  title: e,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: t = !1,
  width: l,
  options: c = [],
  className: d,
  value: h,
  onChange: u,
  onFocus: p,
  onBlur: f,
}) {
  return i.jsx(k.Autocomplete, {
    disablePortal: !0,
    disabled: n,
    disableClearable: !r,
    fullWidth: t,
    options: c,
    className: `papi-combo-box ${o ? 'error' : ''} ${d ?? ''}`,
    value: h,
    onChange: u,
    onFocus: p,
    onBlur: f,
    renderInput: (v) =>
      i.jsx(k.TextField, {
        ...v,
        error: o,
        fullWidth: t,
        disabled: n,
        label: e,
        style: { width: l },
      }),
  });
}
var ce = Object.defineProperty,
  he = (e, n, r) =>
    n in e ? ce(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[n] = r),
  a = (e, n, r) => (he(e, typeof n != 'symbol' ? n + '' : n, r), r);
const E = class {
  static bookIdToNumber(e, n = !0) {
    return n && (e = e.toUpperCase()), e in this.bookNumbers ? this.bookNumbers[e] : 0;
  }
  static bookNumberToId(e, n = '***') {
    const r = e - 1;
    return r < 0 || r >= E.allBookIds.length ? n : E.allBookIds[r];
  }
  static bookNumberToEnglishName(e) {
    return e <= 0 || e > this.lastBook ? '******' : E.allBookEnglishNames[e - 1];
  }
  static bookIdToEnglishName(e) {
    return this.bookNumberToEnglishName(this.bookIdToNumber(e));
  }
  static isObsolete(e) {
    return this.allBookEnglishNames[e - 1].includes('*obsolete*');
  }
  static createBookNumbers() {
    const e = {};
    for (let n = 0; n < this.allBookIds.length; n++) e[this.allBookIds[n]] = n + 1;
    return e;
  }
};
let b = E;
a(b, 'allBookIds', [
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
]),
  a(b, 'nonCanonicalIds', [
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
  ]),
  a(b, 'firstBook', 1),
  a(b, 'lastBook', E.allBookIds.length),
  a(b, 'allBookEnglishNames', [
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
  ]),
  a(b, 'bookNumbers', E.createBookNumbers());
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
      (a(this, 'name'),
      a(this, 'fullPath'),
      a(this, 'isPresent'),
      a(this, 'hasVerseSegments'),
      a(this, 'isCustomized'),
      a(this, 'baseVersification'),
      a(this, 'scriptureBooks'),
      a(this, '_type'),
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
let m = w;
a(m, 'Original', new w(x.Original)),
  a(m, 'Septuagint', new w(x.Septuagint)),
  a(m, 'Vulgate', new w(x.Vulgate)),
  a(m, 'English', new w(x.English)),
  a(m, 'RussianProtestant', new w(x.RussianProtestant)),
  a(m, 'RussianOrthodox', new w(x.RussianOrthodox));
function O(e, n) {
  const r = n[0];
  for (let o = 1; o < n.length; o++) e = e.split(n[o]).join(r);
  return e.split(r);
}
var G = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(G || {});
const s = class {
  constructor(e, n, r, o) {
    if (
      (a(this, 'firstChapter'),
      a(this, 'lastChapter'),
      a(this, 'lastVerse'),
      a(this, 'hasSegmentsDefined'),
      a(this, 'text'),
      a(this, 'BBBCCCVVVS'),
      a(this, 'longHashCode'),
      a(this, 'versification'),
      a(this, 'rtlMark', '‏'),
      a(this, '_bookNum', 0),
      a(this, '_chapterNum', 0),
      a(this, '_verseNum', 0),
      a(this, '_verse'),
      r == null && o == null)
    )
      if (e != null && typeof e == 'string') {
        const t = e,
          l = n != null && n instanceof m ? n : void 0;
        this.setEmpty(l), this.parse(t);
      } else if (n == null)
        if (e != null && e instanceof s) {
          const t = e;
          (this._bookNum = t.bookNum),
            (this._chapterNum = t.chapterNum),
            (this._verseNum = t.verseNum),
            (this._verse = t.verse),
            (this.versification = t.versification);
        } else {
          if (e == null) return;
          const t = e instanceof m ? e : s.defaultVersification;
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
          (this.versification = o ?? s.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(e, n = s.defaultVersification) {
    const r = new s(n);
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
      return (n = s.parse(e)), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof B) return (n = new s()), { success: !1, verseRef: n };
      throw r;
    }
  }
  static getBBBCCCVVV(e, n, r) {
    return (
      (e % s.bcvMaxValue) * s.bookDigitShifter +
      (n >= 0 ? (n % s.bcvMaxValue) * s.chapterDigitShifter : 0) +
      (r >= 0 ? r % s.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(e) {
    let n;
    if (!e) return (n = -1), { success: !0, vNum: n };
    n = 0;
    let r;
    for (let o = 0; o < e.length; o++) {
      if (((r = e[o]), r < '0' || r > '9')) return o === 0 && (n = -1), { success: !1, vNum: n };
      if (((n = n * 10 + +r - +'0'), n > s.bcvMaxValue)) return (n = -1), { success: !1, vNum: n };
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
      (this._verse.includes(s.verseRangeSeparator) ||
        this._verse.includes(s.verseSequenceIndicator))
    );
  }
  get book() {
    return b.bookNumberToId(this.bookNum, '');
  }
  set book(e) {
    this.bookNum = b.bookIdToNumber(e);
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
    const { success: n, vNum: r } = s.tryGetVerseNum(e);
    (this._verse = n ? void 0 : e.replace(this.rtlMark, '')),
      (this._verseNum = r),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = s.tryGetVerseNum(this._verse));
  }
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > b.lastBook)
      throw new B('BookNum must be greater than zero and less than or equal to last book');
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
    this.versification = this.versification != null ? new m(e) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(s.verseRangeSeparators, s.verseSequenceIndicators);
  }
  get BBBCCC() {
    return s.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return s.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(e) {
    if (((e = e.replace(this.rtlMark, '')), e.includes('/'))) {
      const t = e.split('/');
      if (((e = t[0]), t.length > 1))
        try {
          const l = +t[1].trim();
          this.versification = new m(x[l]);
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
      b.bookIdToNumber(n[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !s.isVerseParseable(r[1])
    )
      throw new B('Invalid reference : ' + e);
    this.updateInternal(n[0], r[0], r[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new s(this);
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
  allVerses(e = !1, n = s.verseRangeSeparators, r = s.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      t = O(this._verse, r);
    for (const l of t.map((c) => O(c, n))) {
      const c = this.clone();
      c.verse = l[0];
      const d = c.verseNum;
      if ((o.push(c), l.length > 1)) {
        const h = this.clone();
        if (((h.verse = l[1]), !e))
          for (let u = d + 1; u < h.verseNum; u++) {
            const p = new s(this._bookNum, this._chapterNum, u, this.versification);
            this.isExcluded || o.push(p);
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
      const l = o.BBBCCCVVV;
      if (r > l) return 3;
      if (r === l) return 4;
      r = l;
    }
    return 0;
  }
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > b.lastBook
      ? 2
      : 0;
  }
  setEmpty(e = s.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = e);
  }
  updateInternal(e, n, r) {
    (this.bookNum = b.bookIdToNumber(e)), (this.chapter = n), (this.verse = r);
  }
};
let N = s;
a(N, 'defaultVersification', m.English),
  a(N, 'verseRangeSeparator', '-'),
  a(N, 'verseSequenceIndicator', ','),
  a(N, 'verseRangeSeparators', [s.verseRangeSeparator]),
  a(N, 'verseSequenceIndicators', [s.verseSequenceIndicator]),
  a(N, 'chapterDigitShifter', 1e3),
  a(N, 'bookDigitShifter', s.chapterDigitShifter * s.chapterDigitShifter),
  a(N, 'bcvMaxValue', s.chapterDigitShifter - 1),
  a(N, 'ValidStatusType', G);
class B extends Error {}
const X = [
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
function V() {
  return b.allBookIds.map((e) => ({ bookId: e, label: b.bookIdToEnglishName(e) }));
}
function R(e) {
  return { bookId: b.bookNumberToId(e), label: b.bookNumberToEnglishName(e) };
}
const q = 1,
  de = X.length - 1,
  F = 1,
  U = 1,
  K = (e) => {
    var n;
    return ((n = X[e]) == null ? void 0 : n.chapters) ?? -1;
  },
  J = (e, n) => ({ bookNum: Math.max(q, Math.min(e.bookNum + n, de)), chapterNum: 1, verseNum: 1 }),
  z = (e, n) => ({
    ...e,
    chapterNum: Math.min(Math.max(F, e.chapterNum + n), K(e.bookNum)),
    verseNum: 1,
  }),
  H = (e, n) => ({ ...e, verseNum: Math.max(U, e.verseNum + n) });
function T({
  variant: e = 'outlined',
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: t,
  label: l,
  placeholder: c,
  isRequired: d = !1,
  className: h,
  defaultValue: u,
  value: p,
  onChange: f,
  onFocus: v,
  onBlur: S,
}) {
  return i.jsx(k.TextField, {
    variant: e,
    disabled: n,
    error: r,
    fullWidth: o,
    helperText: t,
    label: l,
    placeholder: c,
    required: d,
    className: `papi-textfield ${h ?? ''}`,
    defaultValue: u,
    value: p,
    onChange: f,
    onFocus: v,
    onBlur: S,
  });
}
function ue({ scrRef: e, handleSubmit: n }) {
  const [r, o] = D.useState(R(e.bookNum)),
    t = (h) => {
      o(R(h.bookNum)), n(h);
    },
    l = (h, u) => {
      const f = { bookNum: b.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
      t(f);
    },
    c = (h) => {
      n({ ...e, chapterNum: +h.target.value });
    },
    d = (h) => {
      n({ ...e, verseNum: +h.target.value });
    };
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx(L, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: V(),
        onChange: l,
        value: r,
        isClearable: !1,
        width: 200,
      }),
      i.jsx(y, { onClick: () => t(J(e, -1)), isDisabled: e.bookNum <= q, children: '<' }),
      i.jsx(y, { onClick: () => t(J(e, 1)), isDisabled: e.bookNum >= V().length, children: '>' }),
      i.jsx(T, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: c,
      }),
      i.jsx(y, { onClick: () => n(z(e, -1)), isDisabled: e.chapterNum <= F, children: '<' }),
      i.jsx(y, {
        onClick: () => n(z(e, 1)),
        isDisabled: e.chapterNum >= K(e.bookNum),
        children: '>',
      }),
      i.jsx(T, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: d,
      }),
      i.jsx(y, { onClick: () => n(H(e, -1)), isDisabled: e.verseNum <= U, children: '<' }),
      i.jsx(y, { onClick: () => n(H(e, 1)), children: '>' }),
    ],
  });
}
function be({
  isDisabled: e = !1,
  orientation: n = 'horizontal',
  min: r = 0,
  max: o = 100,
  step: t = 1,
  showMarks: l = !1,
  defaultValue: c,
  valueLabelDisplay: d = 'off',
  className: h,
  onChange: u,
  onChangeCommitted: p,
}) {
  return i.jsx(k.Slider, {
    disabled: e,
    orientation: n,
    min: r,
    max: o,
    step: t,
    marks: l,
    defaultValue: c,
    valueLabelDisplay: d,
    className: `papi-slider ${n} ${h ?? ''}`,
    onChange: u,
    onChangeCommitted: p,
  });
}
function pe({ isChecked: e, isDisabled: n = !1, hasError: r = !1, className: o, onChange: t }) {
  return i.jsx(k.Switch, {
    checked: e,
    disabled: n,
    className: `papi-switch ${r ? 'error' : ''} ${o ?? ''}`,
    onChange: t,
  });
}
function ge({
  autoHideDuration: e = null,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: t = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: l = { action: '', message: '', className: `papi-snackbar ${r ?? ''}` },
  children: c,
}) {
  return i.jsx(k.Snackbar, {
    autoHideDuration: e,
    className: `papi-snackbar ${r ?? ''}`,
    open: n,
    onClose: o,
    anchorOrigin: t,
    ContentProps: l,
    children: c,
  });
}
function me({
  hasAutoFocus: e = !1,
  className: n,
  isDense: r = !1,
  hasDisabledGutters: o = !1,
  hasDivider: t = !1,
  focusVisibleClassName: l,
  onClick: c,
  children: d,
}) {
  return i.jsx(k.MenuItem, {
    autoFocus: e,
    className: n,
    dense: r,
    disableGutters: o,
    divider: t,
    focusVisibleClassName: l,
    onClick: c,
    children: d,
  });
}
function P({ onRowChange: e, row: n, column: r }) {
  const o = (t) => {
    e({ ...n, [r.key]: t.target.value });
  };
  return i.jsx(T, { defaultValue: n[r.key], onChange: o });
}
const fe = ({ onChange: e, disabled: n, checked: r, ...o }) => {
  function t(l) {
    e(l.target.checked, l.nativeEvent.shiftKey);
  }
  return i.jsx(j, { ...o, isChecked: r, isDisabled: n, onChange: t });
};
function ke({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: o,
  defaultColumnWidth: t,
  defaultColumnMinWidth: l,
  defaultColumnMaxWidth: c,
  defaultColumnSortable: d = !0,
  defaultColumnResizable: h = !0,
  rows: u,
  enableSelectColumn: p,
  selectColumnWidth: f = 50,
  rowKeyGetter: v,
  rowHeight: S = 35,
  headerRowHeight: _ = 35,
  selectedRows: I,
  onSelectedRowsChange: $,
  onRowsChange: Z,
  onCellClick: W,
  onCellDoubleClick: Q,
  onCellContextMenu: Y,
  onCellKeyDown: ee,
  direction: ne = 'ltr',
  enableVirtualization: re = !0,
  onCopy: oe,
  onPaste: te,
  onScroll: ae,
  className: se,
}) {
  const le = D.useMemo(() => {
    const M = e.map((g) =>
      typeof g.editable == 'function'
        ? { ...g, editable: (ie) => !!g.editable(ie), renderEditCell: g.renderEditCell || P }
        : g.editable && !g.renderEditCell
        ? { ...g, renderEditCell: P }
        : g.renderEditCell && !g.editable
        ? { ...g, editable: !1 }
        : g,
    );
    return p ? [{ ...A.SelectColumn, minWidth: f }, ...M] : M;
  }, [p, e]);
  return i.jsx(A, {
    columns: le,
    defaultColumnOptions: { width: t, minWidth: l, maxWidth: c, sortable: d, resizable: h },
    sortColumns: n,
    onSortColumnsChange: r,
    onColumnResize: o,
    rows: u,
    rowKeyGetter: v,
    rowHeight: S,
    headerRowHeight: _,
    selectedRows: I,
    onSelectedRowsChange: $,
    onRowsChange: Z,
    onCellClick: W,
    onCellDoubleClick: Q,
    onCellContextMenu: Y,
    onCellKeyDown: ee,
    direction: ne,
    enableVirtualization: re,
    onCopy: oe,
    onPaste: te,
    onScroll: ae,
    renderers: { renderCheckbox: fe },
    className: `${se ?? 'rdg-light'}`,
  });
}
exports.Button = y;
exports.Checkbox = j;
exports.ComboBox = L;
exports.LabelPosition = C;
exports.MenuItem = me;
exports.RefSelector = ue;
exports.Slider = be;
exports.Snackbar = ge;
exports.Switch = pe;
exports.Table = ke;
exports.TextField = T;
function Ne(e, n = 'top') {
  if (!e || typeof document > 'u') return;
  const r = document.head || document.querySelector('head'),
    o = r.querySelector(':first-child'),
    t = document.createElement('style');
  t.appendChild(document.createTextNode(e)),
    n === 'top' && o ? r.insertBefore(t, o) : r.appendChild(t);
}
Ne(
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-33 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-33 {
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

    .c1wupbe7-0-0-beta-33[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-33 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

.c1730fa47-0-0-beta-33 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-33 {
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

.cojpd0n7-0-0-beta-33 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-33 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-33:checked + .cwsfieb7-0-0-beta-33 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-33:focus + .cwsfieb7-0-0-beta-33 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-33 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-33 .cwsfieb7-0-0-beta-33 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-33 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-33 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-33 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-33 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-33:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-33 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-33 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-33:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-33[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-33[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-33 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
  }

@layer rdg.FocusSink {
    .r1qymf1z7-0-0-beta-33::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-33:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-33 > .c1wupbe7-0-0-beta-33:not(:last-child):not(.c1730fa47-0-0-beta-33) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-33 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-33:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-33 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-33 {
    touch-action: none
}

    .celq7o97-0-0-beta-33::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-33 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-33 > .cd0kgiy7-0-0-beta-33 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-33 {
    background-color: #ccccff
}
  }

@layer rdg.Cell {

.c1bmg16t7-0-0-beta-33 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-33.ccpfvsn7-0-0-beta-33 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-33 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-33 > path {
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
      .r104f42s7-0-0-beta-33 *,
      .r104f42s7-0-0-beta-33 *::before,
      .r104f42s7-0-0-beta-33 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-33 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      contain: strict;
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
      .r104f42s7-0-0-beta-33::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-33.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-33.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-33:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-33 {
    user-select: none
}

    .v7ly7s7-0-0-beta-33 .r1otpg647-0-0-beta-33 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-33 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-33 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-33 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      position: sticky;
    }
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-33 > .cd0kgiy7-0-0-beta-33 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
    .b1odhhml7-0-0-beta-33 > .c1wupbe7-0-0-beta-33 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-33 {
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

    .tlmcuo07-0-0-beta-33:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-33::placeholder {
      color: #999;
      opacity: 1;
    }
  }

`,
  'top',
);
//# sourceMappingURL=index.cjs.js.map
