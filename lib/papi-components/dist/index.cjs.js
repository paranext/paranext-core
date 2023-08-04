'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const x = require('react/jsx-runtime'),
  W = require('@mui/material'),
  ae = require('react'),
  Ar = require('@emotion/react'),
  Pr = require('@emotion/styled');
function Mr(e) {
  const t = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const r in e)
      if (r !== 'default') {
        const n = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(t, r, n.get ? n : { enumerable: !0, get: () => e[r] });
      }
  }
  return (t.default = e), Object.freeze(t);
}
const ze = Mr(ae);
function Ee({ isDisabled: e = !1, className: t, onClick: r, onContextMenu: n, children: o }) {
  return x.jsx(W.Button, {
    disabled: e,
    className: `papi-button ${t ?? ''}`,
    onClick: r,
    onContextMenu: n,
    children: o,
  });
}
var Te = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Te || {});
function Ir({
  isChecked: e,
  labelText: t = '',
  labelPosition: r = Te.After,
  isIndeterminate: n = !1,
  isDefaultChecked: o,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: i,
}) {
  const c = x.jsx(W.Checkbox, {
    checked: e,
    indeterminate: n,
    defaultChecked: o,
    disabled: s,
    className: `papi-checkbox ${a ? 'error' : ''} ${u ?? ''}`,
    onChange: i,
  });
  let d;
  if (t) {
    const h = r === Te.Before || r === Te.Above,
      l = x.jsx('span', {
        className: `papi-checkbox-label ${a ? 'error' : ''} ${u ?? ''}`,
        children: t,
      }),
      y = r === Te.Before || r === Te.After,
      v = y ? l : x.jsx('div', { children: l }),
      p = y ? c : x.jsx('div', { children: c });
    d = x.jsxs(W.FormLabel, {
      className: `papi-checkbox ${r.toString()}`,
      disabled: s,
      error: a,
      children: [h && v, p, !h && v],
    });
  } else d = c;
  return d;
}
function sr({
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
  return x.jsx(W.Autocomplete, {
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
    renderInput: (y) =>
      x.jsx(W.TextField, {
        ...y,
        error: n,
        fullWidth: o,
        disabled: t,
        label: e,
        style: { width: s },
      }),
  });
}
function ar(e) {
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
  return x.jsx(W.MenuItem, {
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
function jr({ commandHandler: e, name: t, className: r, items: n }) {
  return x.jsxs(W.Grid, {
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${r ?? ''}`,
    children: [
      x.jsx('h3', { className: `papi-menu ${r ?? ''}`, children: t }),
      n.map((o, s) =>
        x.jsx(
          ar,
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
function ir({ commandHandler: e, className: t, columns: r }) {
  return x.jsx(W.Grid, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${t ?? ''}`,
    columns: r.length,
    children: r.map((n) =>
      x.jsx(jr, { commandHandler: e, name: n.name, className: t, items: n.items }),
    ),
  });
}
var Br = Object.defineProperty,
  Dr = (e, t, r) =>
    t in e ? Br(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r),
  $ = (e, t, r) => (Dr(e, typeof t != 'symbol' ? t + '' : t, r), r);
const Oe = [
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
  _t = Kr();
function Be(e, t = !0) {
  return t && (e = e.toUpperCase()), e in _t ? _t[e] : 0;
}
function mt(e) {
  return Be(e) > 0;
}
function Vr(e) {
  const t = typeof e == 'string' ? Be(e) : e;
  return t >= 40 && t <= 66;
}
function Lr(e) {
  return (typeof e == 'string' ? Be(e) : e) <= 39;
}
function ur(e) {
  return e <= 66;
}
function Fr(e) {
  const t = typeof e == 'string' ? Be(e) : e;
  return dr(t) && !ur(t);
}
function* zr() {
  for (let e = 1; e <= Oe.length; e++) yield e;
}
const Ur = 1,
  lr = Oe.length;
function Hr() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function gt(e, t = '***') {
  const r = e - 1;
  return r < 0 || r >= Oe.length ? t : Oe[r];
}
function fr(e) {
  return e <= 0 || e > lr ? '******' : cr[e - 1];
}
function Jr(e) {
  return fr(Be(e));
}
function dr(e) {
  const t = typeof e == 'number' ? gt(e) : e;
  return mt(t) && !ht.includes(t);
}
function Gr(e) {
  const t = typeof e == 'number' ? gt(e) : e;
  return mt(t) && ht.includes(t);
}
function qr(e) {
  return cr[e - 1].includes('*obsolete*');
}
function Kr() {
  const e = {};
  for (let t = 0; t < Oe.length; t++) e[Oe[t]] = t + 1;
  return e;
}
const ne = {
  allBookIds: Oe,
  nonCanonicalIds: ht,
  bookIdToNumber: Be,
  isBookIdValid: mt,
  isBookNT: Vr,
  isBookOT: Lr,
  isBookOTNT: ur,
  isBookDC: Fr,
  allBookNumbers: zr,
  firstBook: Ur,
  lastBook: lr,
  extraBooks: Hr,
  bookNumberToId: gt,
  bookNumberToEnglishName: fr,
  bookIdToEnglishName: Jr,
  isCanonical: dr,
  isExtraMaterial: Gr,
  isObsolete: qr,
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
const xe = class {
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
let re = xe;
$(re, 'Original', new xe(ve.Original)),
  $(re, 'Septuagint', new xe(ve.Septuagint)),
  $(re, 'Vulgate', new xe(ve.Vulgate)),
  $(re, 'English', new xe(ve.English)),
  $(re, 'RussianProtestant', new xe(ve.RussianProtestant)),
  $(re, 'RussianOrthodox', new xe(ve.RussianOrthodox));
function Ct(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++) e = e.split(t[n]).join(r);
  return e.split(r);
}
var pr = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(pr || {});
const w = class {
  constructor(t, r, n, o) {
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
      n == null && o == null)
    )
      if (t != null && typeof t == 'string') {
        const s = t,
          a = r != null && r instanceof re ? r : void 0;
        this.setEmpty(a), this.parse(s);
      } else if (t != null && typeof t == 'number') {
        const s = r != null && r instanceof re ? r : void 0;
        this.setEmpty(s),
          (this._verseNum = t % w.chapterDigitShifter),
          (this._chapterNum = Math.floor((t % w.bookDigitShifter) / w.chapterDigitShifter)),
          (this._bookNum = Math.floor(t / w.bookDigitShifter));
      } else if (r == null)
        if (t != null && t instanceof w) {
          const s = t;
          (this._bookNum = s.bookNum),
            (this._chapterNum = s.chapterNum),
            (this._verseNum = s.verseNum),
            (this._verse = s.verse),
            (this.versification = s.versification);
        } else {
          if (t == null) return;
          const s = t instanceof re ? t : w.defaultVersification;
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
          (this.versification = o ?? w.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(t, r = w.defaultVersification) {
    const n = new w(r);
    return n.parse(t), n;
  }
  static isVerseParseable(t) {
    return (
      t.length > 0 &&
      '0123456789'.includes(t[0]) &&
      !t.endsWith(this.verseRangeSeparator) &&
      !t.endsWith(this.verseSequenceIndicator)
    );
  }
  static tryParse(t) {
    let r;
    try {
      return (r = w.parse(t)), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof De) return (r = new w()), { success: !1, verseRef: r };
      throw n;
    }
  }
  static getBBBCCCVVV(t, r, n) {
    return (
      (t % w.bcvMaxValue) * w.bookDigitShifter +
      (r >= 0 ? (r % w.bcvMaxValue) * w.chapterDigitShifter : 0) +
      (n >= 0 ? n % w.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(t) {
    let r;
    if (!t) return (r = -1), { success: !0, vNum: r };
    r = 0;
    let n;
    for (let o = 0; o < t.length; o++) {
      if (((n = t[o]), n < '0' || n > '9')) return o === 0 && (r = -1), { success: !1, vNum: r };
      if (((r = r * 10 + +n - +'0'), r > w.bcvMaxValue)) return (r = -1), { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
      (this._verse.includes(w.verseRangeSeparator) ||
        this._verse.includes(w.verseSequenceIndicator))
    );
  }
  get book() {
    return ne.bookNumberToId(this.bookNum, '');
  }
  set book(t) {
    this.bookNum = ne.bookIdToNumber(t);
  }
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? '' : this._chapterNum.toString();
  }
  set chapter(t) {
    const r = +t;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  get verse() {
    return this._verse != null
      ? this._verse
      : this.isDefault || this._verseNum < 0
      ? ''
      : this._verseNum.toString();
  }
  set verse(t) {
    const { success: r, vNum: n } = w.tryGetVerseNum(t);
    (this._verse = r ? void 0 : t.replace(this.rtlMark, '')),
      (this._verseNum = n),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = w.tryGetVerseNum(this._verse));
  }
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ne.lastBook)
      throw new De('BookNum must be greater than zero and less than or equal to last book');
    this._bookNum = t;
  }
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(t) {
    this.chapterNum = t;
  }
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(t) {
    this._verseNum = t;
  }
  get versificationStr() {
    var t;
    return (t = this.versification) == null ? void 0 : t.name;
  }
  set versificationStr(t) {
    this.versification = this.versification != null ? new re(t) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(w.verseRangeSeparators, w.verseSequenceIndicators);
  }
  get BBBCCC() {
    return w.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return w.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  get isExcluded() {
    return !1;
  }
  parse(t) {
    if (((t = t.replace(this.rtlMark, '')), t.includes('/'))) {
      const s = t.split('/');
      if (((t = s[0]), s.length > 1))
        try {
          const a = +s[1].trim();
          this.versification = new re(ve[a]);
        } catch {
          throw new De('Invalid reference : ' + t);
        }
    }
    const r = t.trim().split(' ');
    if (r.length !== 2) throw new De('Invalid reference : ' + t);
    const n = r[1].split(':'),
      o = +n[0];
    if (
      n.length !== 2 ||
      ne.bookIdToNumber(r[0]) === 0 ||
      !Number.isInteger(o) ||
      o < 0 ||
      !w.isVerseParseable(n[1])
    )
      throw new De('Invalid reference : ' + t);
    this.updateInternal(r[0], n[0], n[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new w(this);
  }
  toString() {
    const t = this.book;
    return t === '' ? '' : `${t} ${this.chapter}:${this.verse}`;
  }
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
  allVerses(t = !1, r = w.verseRangeSeparators, n = w.verseSequenceIndicators) {
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
            const h = new w(this._bookNum, this._chapterNum, d, this.versification);
            this.isExcluded || o.push(h);
          }
        o.push(c);
      }
    }
    return o;
  }
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
  get internalValid() {
    return this.versification == null
      ? 1
      : this._bookNum <= 0 || this._bookNum > ne.lastBook
      ? 2
      : 0;
  }
  setEmpty(t = w.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = t);
  }
  updateInternal(t, r, n) {
    (this.bookNum = ne.bookIdToNumber(t)), (this.chapter = r), (this.verse = n);
  }
};
let fe = w;
$(fe, 'defaultVersification', re.English),
  $(fe, 'verseRangeSeparator', '-'),
  $(fe, 'verseSequenceIndicator', ','),
  $(fe, 'verseRangeSeparators', [w.verseRangeSeparator]),
  $(fe, 'verseSequenceIndicators', [w.verseSequenceIndicator]),
  $(fe, 'chapterDigitShifter', 1e3),
  $(fe, 'bookDigitShifter', w.chapterDigitShifter * w.chapterDigitShifter),
  $(fe, 'bcvMaxValue', w.chapterDigitShifter - 1),
  $(fe, 'ValidStatusType', pr);
class De extends Error {}
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
  return ne.allBookIds.map((e) => ({ bookId: e, label: ne.bookIdToEnglishName(e) }));
}
function $t(e) {
  return { bookId: ne.bookNumberToId(e), label: ne.bookNumberToEnglishName(e) };
}
const mr = 1,
  Xr = hr.length - 1,
  gr = 1,
  br = 1,
  yr = (e) => {
    var t;
    return ((t = hr[e]) == null ? void 0 : t.chapters) ?? -1;
  },
  Rt = (e, t) => ({
    bookNum: Math.max(mr, Math.min(e.bookNum + t, Xr)),
    chapterNum: 1,
    verseNum: 1,
  }),
  At = (e, t) => ({
    ...e,
    chapterNum: Math.min(Math.max(gr, e.chapterNum + t), yr(e.bookNum)),
    verseNum: 1,
  }),
  Pt = (e, t) => ({ ...e, verseNum: Math.max(br, e.verseNum + t) });
function ft({
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
  onBlur: y,
}) {
  return x.jsx(W.TextField, {
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
    onBlur: y,
  });
}
function Wr(e, t) {
  return e.bookId === t.bookId && e.label === t.label;
}
function Yr({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ae.useState($t(e.bookNum)),
    o = (i) => {
      n($t(i.bookNum)), t(i);
    },
    s = (i, c) => {
      const h = { bookNum: ne.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
      o(h);
    },
    a = (i) => {
      t({ ...e, chapterNum: +i.target.value });
    },
    u = (i) => {
      t({ ...e, verseNum: +i.target.value });
    };
  return x.jsxs(x.Fragment, {
    children: [
      x.jsx(sr, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: wt(),
        onChange: s,
        value: r,
        isClearable: !1,
        width: 200,
        checkIsOptionEqualToValue: Wr,
      }),
      x.jsx(Ee, { onClick: () => o(Rt(e, -1)), isDisabled: e.bookNum <= mr, children: '<' }),
      x.jsx(Ee, {
        onClick: () => o(Rt(e, 1)),
        isDisabled: e.bookNum >= wt().length,
        children: '>',
      }),
      x.jsx(ft, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: a,
      }),
      x.jsx(Ee, { onClick: () => t(At(e, -1)), isDisabled: e.chapterNum <= gr, children: '<' }),
      x.jsx(Ee, {
        onClick: () => t(At(e, 1)),
        isDisabled: e.chapterNum >= yr(e.bookNum),
        children: '>',
      }),
      x.jsx(ft, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: u,
      }),
      x.jsx(Ee, { onClick: () => t(Pt(e, -1)), isDisabled: e.verseNum <= br, children: '<' }),
      x.jsx(Ee, { onClick: () => t(Pt(e, 1)), children: '>' }),
    ],
  });
}
function Zr({
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
  return x.jsx(W.Slider, {
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
function Qr({
  autoHideDuration: e = null,
  isOpen: t = !1,
  className: r,
  onClose: n,
  anchorOrigin: o = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: s = { action: '', message: '', className: `papi-snackbar ${r ?? ''}` },
  children: a,
}) {
  return x.jsx(W.Snackbar, {
    autoHideDuration: e,
    className: `papi-snackbar ${r ?? ''}`,
    open: t,
    onClose: n,
    anchorOrigin: o,
    ContentProps: s,
    children: a,
  });
}
function en({ isChecked: e, isDisabled: t = !1, hasError: r = !1, className: n, onChange: o }) {
  return x.jsx(W.Switch, {
    checked: e,
    disabled: t,
    className: `papi-switch ${r ? 'error' : ''} ${n ?? ''}`,
    onChange: o,
  });
}
function R() {
  return (
    (R = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    R.apply(this, arguments)
  );
}
function Pe(e) {
  return e !== null && typeof e == 'object' && e.constructor === Object;
}
function vr(e) {
  if (!Pe(e)) return e;
  const t = {};
  return (
    Object.keys(e).forEach((r) => {
      t[r] = vr(e[r]);
    }),
    t
  );
}
function de(e, t, r = { clone: !0 }) {
  const n = r.clone ? R({}, e) : e;
  return (
    Pe(e) &&
      Pe(t) &&
      Object.keys(t).forEach((o) => {
        o !== '__proto__' &&
          (Pe(t[o]) && o in e && Pe(e[o])
            ? (n[o] = de(e[o], t[o], r))
            : r.clone
            ? (n[o] = Pe(t[o]) ? vr(t[o]) : t[o])
            : (n[o] = t[o]));
      }),
    n
  );
}
function tn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var dt = { exports: {} },
  qe = { exports: {} },
  B = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mt;
function rn() {
  if (Mt) return B;
  Mt = 1;
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
    y = e ? Symbol.for('react.memo') : 60115,
    v = e ? Symbol.for('react.lazy') : 60116,
    p = e ? Symbol.for('react.block') : 60121,
    f = e ? Symbol.for('react.fundamental') : 60117,
    T = e ? Symbol.for('react.responder') : 60118,
    K = e ? Symbol.for('react.scope') : 60119;
  function H(g) {
    if (typeof g == 'object' && g !== null) {
      var Y = g.$$typeof;
      switch (Y) {
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
                case y:
                case a:
                  return g;
                default:
                  return Y;
              }
          }
        case r:
          return Y;
      }
    }
  }
  function I(g) {
    return H(g) === c;
  }
  return (
    (B.AsyncMode = i),
    (B.ConcurrentMode = c),
    (B.ContextConsumer = u),
    (B.ContextProvider = a),
    (B.Element = t),
    (B.ForwardRef = d),
    (B.Fragment = n),
    (B.Lazy = v),
    (B.Memo = y),
    (B.Portal = r),
    (B.Profiler = s),
    (B.StrictMode = o),
    (B.Suspense = h),
    (B.isAsyncMode = function (g) {
      return I(g) || H(g) === i;
    }),
    (B.isConcurrentMode = I),
    (B.isContextConsumer = function (g) {
      return H(g) === u;
    }),
    (B.isContextProvider = function (g) {
      return H(g) === a;
    }),
    (B.isElement = function (g) {
      return typeof g == 'object' && g !== null && g.$$typeof === t;
    }),
    (B.isForwardRef = function (g) {
      return H(g) === d;
    }),
    (B.isFragment = function (g) {
      return H(g) === n;
    }),
    (B.isLazy = function (g) {
      return H(g) === v;
    }),
    (B.isMemo = function (g) {
      return H(g) === y;
    }),
    (B.isPortal = function (g) {
      return H(g) === r;
    }),
    (B.isProfiler = function (g) {
      return H(g) === s;
    }),
    (B.isStrictMode = function (g) {
      return H(g) === o;
    }),
    (B.isSuspense = function (g) {
      return H(g) === h;
    }),
    (B.isValidElementType = function (g) {
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
            g.$$typeof === y ||
            g.$$typeof === a ||
            g.$$typeof === u ||
            g.$$typeof === d ||
            g.$$typeof === f ||
            g.$$typeof === T ||
            g.$$typeof === K ||
            g.$$typeof === p))
      );
    }),
    (B.typeOf = H),
    B
  );
}
var D = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var It;
function nn() {
  return (
    It ||
      ((It = 1),
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
            y = e ? Symbol.for('react.memo') : 60115,
            v = e ? Symbol.for('react.lazy') : 60116,
            p = e ? Symbol.for('react.block') : 60121,
            f = e ? Symbol.for('react.fundamental') : 60117,
            T = e ? Symbol.for('react.responder') : 60118,
            K = e ? Symbol.for('react.scope') : 60119;
          function H(b) {
            return (
              typeof b == 'string' ||
              typeof b == 'function' ||
              b === n ||
              b === c ||
              b === s ||
              b === o ||
              b === h ||
              b === l ||
              (typeof b == 'object' &&
                b !== null &&
                (b.$$typeof === v ||
                  b.$$typeof === y ||
                  b.$$typeof === a ||
                  b.$$typeof === u ||
                  b.$$typeof === d ||
                  b.$$typeof === f ||
                  b.$$typeof === T ||
                  b.$$typeof === K ||
                  b.$$typeof === p))
            );
          }
          function I(b) {
            if (typeof b == 'object' && b !== null) {
              var te = b.$$typeof;
              switch (te) {
                case t:
                  var S = b.type;
                  switch (S) {
                    case i:
                    case c:
                    case n:
                    case s:
                    case o:
                    case h:
                      return S;
                    default:
                      var _e = S && S.$$typeof;
                      switch (_e) {
                        case u:
                        case d:
                        case v:
                        case y:
                        case a:
                          return _e;
                        default:
                          return te;
                      }
                  }
                case r:
                  return te;
              }
            }
          }
          var g = i,
            Y = c,
            oe = u,
            ge = a,
            ce = t,
            z = d,
            Z = n,
            be = v,
            ye = y,
            se = r,
            ue = s,
            ee = o,
            le = h,
            Se = !1;
          function ke(b) {
            return (
              Se ||
                ((Se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              m(b) || I(b) === i
            );
          }
          function m(b) {
            return I(b) === c;
          }
          function N(b) {
            return I(b) === u;
          }
          function C(b) {
            return I(b) === a;
          }
          function k(b) {
            return typeof b == 'object' && b !== null && b.$$typeof === t;
          }
          function E(b) {
            return I(b) === d;
          }
          function A(b) {
            return I(b) === n;
          }
          function O(b) {
            return I(b) === v;
          }
          function _(b) {
            return I(b) === y;
          }
          function P(b) {
            return I(b) === r;
          }
          function j(b) {
            return I(b) === s;
          }
          function M(b) {
            return I(b) === o;
          }
          function X(b) {
            return I(b) === h;
          }
          (D.AsyncMode = g),
            (D.ConcurrentMode = Y),
            (D.ContextConsumer = oe),
            (D.ContextProvider = ge),
            (D.Element = ce),
            (D.ForwardRef = z),
            (D.Fragment = Z),
            (D.Lazy = be),
            (D.Memo = ye),
            (D.Portal = se),
            (D.Profiler = ue),
            (D.StrictMode = ee),
            (D.Suspense = le),
            (D.isAsyncMode = ke),
            (D.isConcurrentMode = m),
            (D.isContextConsumer = N),
            (D.isContextProvider = C),
            (D.isElement = k),
            (D.isForwardRef = E),
            (D.isFragment = A),
            (D.isLazy = O),
            (D.isMemo = _),
            (D.isPortal = P),
            (D.isProfiler = j),
            (D.isStrictMode = M),
            (D.isSuspense = X),
            (D.isValidElementType = H),
            (D.typeOf = I);
        })()),
    D
  );
}
var jt;
function Nr() {
  return (
    jt ||
      ((jt = 1), process.env.NODE_ENV === 'production' ? (qe.exports = rn()) : (qe.exports = nn())),
    qe.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var ot, Bt;
function on() {
  if (Bt) return ot;
  Bt = 1;
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
    (ot = o()
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
    ot
  );
}
var st, Dt;
function bt() {
  if (Dt) return st;
  Dt = 1;
  var e = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  return (st = e), st;
}
var at, Vt;
function Sr() {
  return Vt || ((Vt = 1), (at = Function.call.bind(Object.prototype.hasOwnProperty))), at;
}
var it, Lt;
function sn() {
  if (Lt) return it;
  Lt = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var t = bt(),
      r = {},
      n = Sr();
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
            var y = c ? c() : '';
            e('Failed ' + u + ' type: ' + h.message + (y ?? ''));
          }
        }
    }
  }
  return (
    (o.resetWarningCache = function () {
      process.env.NODE_ENV !== 'production' && (r = {});
    }),
    (it = o),
    it
  );
}
var ct, Ft;
function an() {
  if (Ft) return ct;
  Ft = 1;
  var e = Nr(),
    t = on(),
    r = bt(),
    n = Sr(),
    o = sn(),
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
    (ct = function (u, i) {
      var c = typeof Symbol == 'function' && Symbol.iterator,
        d = '@@iterator';
      function h(m) {
        var N = m && ((c && m[c]) || m[d]);
        if (typeof N == 'function') return N;
      }
      var l = '<<anonymous>>',
        y = {
          array: T('array'),
          bigint: T('bigint'),
          bool: T('boolean'),
          func: T('function'),
          number: T('number'),
          object: T('object'),
          string: T('string'),
          symbol: T('symbol'),
          any: K(),
          arrayOf: H,
          element: I(),
          elementType: g(),
          instanceOf: Y,
          node: z(),
          objectOf: ge,
          oneOf: oe,
          oneOfType: ce,
          shape: be,
          exact: ye,
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
            C = 0;
        function k(A, O, _, P, j, M, X) {
          if (((P = P || l), (M = M || _), X !== r)) {
            if (i) {
              var b = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((b.name = 'Invariant Violation'), b);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var te = P + ':' + _;
              !N[te] &&
                C < 3 &&
                (s(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    M +
                    '` prop on `' +
                    P +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (N[te] = !0),
                C++);
            }
          }
          return O[_] == null
            ? A
              ? O[_] === null
                ? new p(
                    'The ' +
                      j +
                      ' `' +
                      M +
                      '` is marked as required ' +
                      ('in `' + P + '`, but its value is `null`.'),
                  )
                : new p(
                    'The ' +
                      j +
                      ' `' +
                      M +
                      '` is marked as required in ' +
                      ('`' + P + '`, but its value is `undefined`.'),
                  )
              : null
            : m(O, _, P, j, M);
        }
        var E = k.bind(null, !1);
        return (E.isRequired = k.bind(null, !0)), E;
      }
      function T(m) {
        function N(C, k, E, A, O, _) {
          var P = C[k],
            j = ee(P);
          if (j !== m) {
            var M = le(P);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type ' +
                ('`' + M + '` supplied to `' + E + '`, expected ') +
                ('`' + m + '`.'),
              { expectedType: m },
            );
          }
          return null;
        }
        return f(N);
      }
      function K() {
        return f(a);
      }
      function H(m) {
        function N(C, k, E, A, O) {
          if (typeof m != 'function')
            return new p(
              'Property `' +
                O +
                '` of component `' +
                E +
                '` has invalid PropType notation inside arrayOf.',
            );
          var _ = C[k];
          if (!Array.isArray(_)) {
            var P = ee(_);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type ' +
                ('`' + P + '` supplied to `' + E + '`, expected an array.'),
            );
          }
          for (var j = 0; j < _.length; j++) {
            var M = m(_, j, E, A, O + '[' + j + ']', r);
            if (M instanceof Error) return M;
          }
          return null;
        }
        return f(N);
      }
      function I() {
        function m(N, C, k, E, A) {
          var O = N[C];
          if (!u(O)) {
            var _ = ee(O);
            return new p(
              'Invalid ' +
                E +
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
        function m(N, C, k, E, A) {
          var O = N[C];
          if (!e.isValidElementType(O)) {
            var _ = ee(O);
            return new p(
              'Invalid ' +
                E +
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
      function Y(m) {
        function N(C, k, E, A, O) {
          if (!(C[k] instanceof m)) {
            var _ = m.name || l,
              P = ke(C[k]);
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type ' +
                ('`' + P + '` supplied to `' + E + '`, expected ') +
                ('instance of `' + _ + '`.'),
            );
          }
          return null;
        }
        return f(N);
      }
      function oe(m) {
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
        function N(C, k, E, A, O) {
          for (var _ = C[k], P = 0; P < m.length; P++) if (v(_, m[P])) return null;
          var j = JSON.stringify(m, function (X, b) {
            var te = le(b);
            return te === 'symbol' ? String(b) : b;
          });
          return new p(
            'Invalid ' +
              A +
              ' `' +
              O +
              '` of value `' +
              String(_) +
              '` ' +
              ('supplied to `' + E + '`, expected one of ' + j + '.'),
          );
        }
        return f(N);
      }
      function ge(m) {
        function N(C, k, E, A, O) {
          if (typeof m != 'function')
            return new p(
              'Property `' +
                O +
                '` of component `' +
                E +
                '` has invalid PropType notation inside objectOf.',
            );
          var _ = C[k],
            P = ee(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type ' +
                ('`' + P + '` supplied to `' + E + '`, expected an object.'),
            );
          for (var j in _)
            if (n(_, j)) {
              var M = m(_, j, E, A, O + '.' + j, r);
              if (M instanceof Error) return M;
            }
          return null;
        }
        return f(N);
      }
      function ce(m) {
        if (!Array.isArray(m))
          return (
            process.env.NODE_ENV !== 'production' &&
              s('Invalid argument supplied to oneOfType, expected an instance of array.'),
            a
          );
        for (var N = 0; N < m.length; N++) {
          var C = m[N];
          if (typeof C != 'function')
            return (
              s(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  Se(C) +
                  ' at index ' +
                  N +
                  '.',
              ),
              a
            );
        }
        function k(E, A, O, _, P) {
          for (var j = [], M = 0; M < m.length; M++) {
            var X = m[M],
              b = X(E, A, O, _, P, r);
            if (b == null) return null;
            b.data && n(b.data, 'expectedType') && j.push(b.data.expectedType);
          }
          var te = j.length > 0 ? ', expected one of type [' + j.join(', ') + ']' : '';
          return new p('Invalid ' + _ + ' `' + P + '` supplied to ' + ('`' + O + '`' + te + '.'));
        }
        return f(k);
      }
      function z() {
        function m(N, C, k, E, A) {
          return se(N[C])
            ? null
            : new p(
                'Invalid ' +
                  E +
                  ' `' +
                  A +
                  '` supplied to ' +
                  ('`' + k + '`, expected a ReactNode.'),
              );
        }
        return f(m);
      }
      function Z(m, N, C, k, E) {
        return new p(
          (m || 'React class') +
            ': ' +
            N +
            ' type `' +
            C +
            '.' +
            k +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            E +
            '`.',
        );
      }
      function be(m) {
        function N(C, k, E, A, O) {
          var _ = C[k],
            P = ee(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type `' +
                P +
                '` ' +
                ('supplied to `' + E + '`, expected `object`.'),
            );
          for (var j in m) {
            var M = m[j];
            if (typeof M != 'function') return Z(E, A, O, j, le(M));
            var X = M(_, j, E, A, O + '.' + j, r);
            if (X) return X;
          }
          return null;
        }
        return f(N);
      }
      function ye(m) {
        function N(C, k, E, A, O) {
          var _ = C[k],
            P = ee(_);
          if (P !== 'object')
            return new p(
              'Invalid ' +
                A +
                ' `' +
                O +
                '` of type `' +
                P +
                '` ' +
                ('supplied to `' + E + '`, expected `object`.'),
            );
          var j = t({}, C[k], m);
          for (var M in j) {
            var X = m[M];
            if (n(m, M) && typeof X != 'function') return Z(E, A, O, M, le(X));
            if (!X)
              return new p(
                'Invalid ' +
                  A +
                  ' `' +
                  O +
                  '` key `' +
                  M +
                  '` supplied to `' +
                  E +
                  '`.\nBad object: ' +
                  JSON.stringify(C[k], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(m), null, '  '),
              );
            var b = X(_, M, E, A, O + '.' + M, r);
            if (b) return b;
          }
          return null;
        }
        return f(N);
      }
      function se(m) {
        switch (typeof m) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !m;
          case 'object':
            if (Array.isArray(m)) return m.every(se);
            if (m === null || u(m)) return !0;
            var N = h(m);
            if (N) {
              var C = N.call(m),
                k;
              if (N !== m.entries) {
                for (; !(k = C.next()).done; ) if (!se(k.value)) return !1;
              } else
                for (; !(k = C.next()).done; ) {
                  var E = k.value;
                  if (E && !se(E[1])) return !1;
                }
            } else return !1;
            return !0;
          default:
            return !1;
        }
      }
      function ue(m, N) {
        return m === 'symbol'
          ? !0
          : N
          ? N['@@toStringTag'] === 'Symbol' || (typeof Symbol == 'function' && N instanceof Symbol)
          : !1;
      }
      function ee(m) {
        var N = typeof m;
        return Array.isArray(m)
          ? 'array'
          : m instanceof RegExp
          ? 'object'
          : ue(N, m)
          ? 'symbol'
          : N;
      }
      function le(m) {
        if (typeof m > 'u' || m === null) return '' + m;
        var N = ee(m);
        if (N === 'object') {
          if (m instanceof Date) return 'date';
          if (m instanceof RegExp) return 'regexp';
        }
        return N;
      }
      function Se(m) {
        var N = le(m);
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
      function ke(m) {
        return !m.constructor || !m.constructor.name ? l : m.constructor.name;
      }
      return (
        (y.checkPropTypes = o), (y.resetWarningCache = o.resetWarningCache), (y.PropTypes = y), y
      );
    }),
    ct
  );
}
var ut, zt;
function cn() {
  if (zt) return ut;
  zt = 1;
  var e = bt();
  function t() {}
  function r() {}
  return (
    (r.resetWarningCache = t),
    (ut = function () {
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
    ut
  );
}
if (process.env.NODE_ENV !== 'production') {
  var un = Nr(),
    ln = !0;
  dt.exports = an()(un.isElement, ln);
} else dt.exports = cn()();
var fn = dt.exports;
const U = tn(fn);
function Ie(e) {
  let t = 'https://mui.com/production-error/?code=' + e;
  for (let r = 1; r < arguments.length; r += 1) t += '&args[]=' + encodeURIComponent(arguments[r]);
  return 'Minified MUI error #' + e + '; visit ' + t + ' for the full message.';
}
var pt = { exports: {} },
  V = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ut;
function dn() {
  if (Ut) return V;
  Ut = 1;
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
    y = Symbol.for('react.offscreen'),
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
    (V.ContextConsumer = a),
    (V.ContextProvider = s),
    (V.Element = e),
    (V.ForwardRef = i),
    (V.Fragment = r),
    (V.Lazy = l),
    (V.Memo = h),
    (V.Portal = t),
    (V.Profiler = o),
    (V.StrictMode = n),
    (V.Suspense = c),
    (V.SuspenseList = d),
    (V.isAsyncMode = function () {
      return !1;
    }),
    (V.isConcurrentMode = function () {
      return !1;
    }),
    (V.isContextConsumer = function (f) {
      return p(f) === a;
    }),
    (V.isContextProvider = function (f) {
      return p(f) === s;
    }),
    (V.isElement = function (f) {
      return typeof f == 'object' && f !== null && f.$$typeof === e;
    }),
    (V.isForwardRef = function (f) {
      return p(f) === i;
    }),
    (V.isFragment = function (f) {
      return p(f) === r;
    }),
    (V.isLazy = function (f) {
      return p(f) === l;
    }),
    (V.isMemo = function (f) {
      return p(f) === h;
    }),
    (V.isPortal = function (f) {
      return p(f) === t;
    }),
    (V.isProfiler = function (f) {
      return p(f) === o;
    }),
    (V.isStrictMode = function (f) {
      return p(f) === n;
    }),
    (V.isSuspense = function (f) {
      return p(f) === c;
    }),
    (V.isSuspenseList = function (f) {
      return p(f) === d;
    }),
    (V.isValidElementType = function (f) {
      return (
        typeof f == 'string' ||
        typeof f == 'function' ||
        f === r ||
        f === o ||
        f === n ||
        f === c ||
        f === d ||
        f === y ||
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
 */ var Ht;
function pn() {
  return (
    Ht ||
      ((Ht = 1),
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
            y = Symbol.for('react.offscreen'),
            v = !1,
            p = !1,
            f = !1,
            T = !1,
            K = !1,
            H;
          H = Symbol.for('react.module.reference');
          function I(S) {
            return !!(
              typeof S == 'string' ||
              typeof S == 'function' ||
              S === r ||
              S === o ||
              K ||
              S === n ||
              S === c ||
              S === d ||
              T ||
              S === y ||
              v ||
              p ||
              f ||
              (typeof S == 'object' &&
                S !== null &&
                (S.$$typeof === l ||
                  S.$$typeof === h ||
                  S.$$typeof === s ||
                  S.$$typeof === a ||
                  S.$$typeof === i ||
                  S.$$typeof === H ||
                  S.getModuleId !== void 0))
            );
          }
          function g(S) {
            if (typeof S == 'object' && S !== null) {
              var _e = S.$$typeof;
              switch (_e) {
                case e:
                  var Ge = S.type;
                  switch (Ge) {
                    case r:
                    case o:
                    case n:
                    case c:
                    case d:
                      return Ge;
                    default:
                      var kt = Ge && Ge.$$typeof;
                      switch (kt) {
                        case u:
                        case a:
                        case i:
                        case l:
                        case h:
                        case s:
                          return kt;
                        default:
                          return _e;
                      }
                  }
                case t:
                  return _e;
              }
            }
          }
          var Y = a,
            oe = s,
            ge = e,
            ce = i,
            z = r,
            Z = l,
            be = h,
            ye = t,
            se = o,
            ue = n,
            ee = c,
            le = d,
            Se = !1,
            ke = !1;
          function m(S) {
            return (
              Se ||
                ((Se = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function N(S) {
            return (
              ke ||
                ((ke = !0),
                console.warn(
                  'The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.',
                )),
              !1
            );
          }
          function C(S) {
            return g(S) === a;
          }
          function k(S) {
            return g(S) === s;
          }
          function E(S) {
            return typeof S == 'object' && S !== null && S.$$typeof === e;
          }
          function A(S) {
            return g(S) === i;
          }
          function O(S) {
            return g(S) === r;
          }
          function _(S) {
            return g(S) === l;
          }
          function P(S) {
            return g(S) === h;
          }
          function j(S) {
            return g(S) === t;
          }
          function M(S) {
            return g(S) === o;
          }
          function X(S) {
            return g(S) === n;
          }
          function b(S) {
            return g(S) === c;
          }
          function te(S) {
            return g(S) === d;
          }
          (L.ContextConsumer = Y),
            (L.ContextProvider = oe),
            (L.Element = ge),
            (L.ForwardRef = ce),
            (L.Fragment = z),
            (L.Lazy = Z),
            (L.Memo = be),
            (L.Portal = ye),
            (L.Profiler = se),
            (L.StrictMode = ue),
            (L.Suspense = ee),
            (L.SuspenseList = le),
            (L.isAsyncMode = m),
            (L.isConcurrentMode = N),
            (L.isContextConsumer = C),
            (L.isContextProvider = k),
            (L.isElement = E),
            (L.isForwardRef = A),
            (L.isFragment = O),
            (L.isLazy = _),
            (L.isMemo = P),
            (L.isPortal = j),
            (L.isProfiler = M),
            (L.isStrictMode = X),
            (L.isSuspense = b),
            (L.isSuspenseList = te),
            (L.isValidElementType = I),
            (L.typeOf = g);
        })()),
    L
  );
}
process.env.NODE_ENV === 'production' ? (pt.exports = dn()) : (pt.exports = pn());
var Jt = pt.exports;
const hn = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function mn(e) {
  const t = `${e}`.match(hn);
  return (t && t[1]) || '';
}
function Er(e, t = '') {
  return e.displayName || e.name || mn(e) || t;
}
function Gt(e, t, r) {
  const n = Er(t);
  return e.displayName || (n !== '' ? `${r}(${n})` : r);
}
function gn(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Er(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Jt.ForwardRef:
          return Gt(e, e.render, 'ForwardRef');
        case Jt.Memo:
          return Gt(e, e.type, 'memo');
        default:
          return;
      }
  }
}
function pe(e) {
  if (typeof e != 'string')
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `capitalize(string)` expects a string argument.'
        : Ie(7),
    );
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function xr(e, t) {
  const r = R({}, t);
  return (
    Object.keys(e).forEach((n) => {
      if (n.toString().match(/^(components|slots)$/)) r[n] = R({}, e[n], r[n]);
      else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
        const o = e[n] || {},
          s = t[n];
        (r[n] = {}),
          !s || !Object.keys(s)
            ? (r[n] = o)
            : !o || !Object.keys(o)
            ? (r[n] = s)
            : ((r[n] = R({}, s)),
              Object.keys(o).forEach((a) => {
                r[n][a] = xr(o[a], s[a]);
              }));
      } else r[n] === void 0 && (r[n] = e[n]);
    }),
    r
  );
}
function bn(e, t, r = void 0) {
  const n = {};
  return (
    Object.keys(e).forEach((o) => {
      n[o] = e[o]
        .reduce((s, a) => {
          if (a) {
            const u = t(a);
            u !== '' && s.push(u), r && r[a] && s.push(r[a]);
          }
          return s;
        }, [])
        .join(' ');
    }),
    n
  );
}
const qt = (e) => e,
  yn = () => {
    let e = qt;
    return {
      configure(t) {
        e = t;
      },
      generate(t) {
        return e(t);
      },
      reset() {
        e = qt;
      },
    };
  },
  vn = yn(),
  Nn = vn,
  Sn = {
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
function yt(e, t, r = 'Mui') {
  const n = Sn[t];
  return n ? `${r}-${n}` : `${Nn.generate(e)}-${t}`;
}
function En(e, t, r = 'Mui') {
  const n = {};
  return (
    t.forEach((o) => {
      n[o] = yt(e, o, r);
    }),
    n
  );
}
function me(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    s;
  for (s = 0; s < n.length; s++) (o = n[s]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function Tr(e) {
  var t,
    r,
    n = '';
  if (typeof e == 'string' || typeof e == 'number') n += e;
  else if (typeof e == 'object')
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++) e[t] && (r = Tr(e[t])) && (n && (n += ' '), (n += r));
    else for (t in e) e[t] && (n && (n += ' '), (n += t));
  return n;
}
function xn() {
  for (var e, t, r = 0, n = ''; r < arguments.length; )
    (e = arguments[r++]) && (t = Tr(e)) && (n && (n += ' '), (n += t));
  return n;
}
/**
 * @mui/styled-engine v5.13.2
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function Tn(e, t) {
  const r = Pr(e, t);
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
const On = (e, t) => {
    Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
  },
  kn = ['values', 'unit', 'step'],
  _n = (e) => {
    const t = Object.keys(e).map((r) => ({ key: r, val: e[r] })) || [];
    return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => R({}, r, { [n.key]: n.val }), {});
  };
function Cn(e) {
  const {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: r = 'px',
      step: n = 5,
    } = e,
    o = me(e, kn),
    s = _n(t),
    a = Object.keys(s);
  function u(l) {
    return `@media (min-width:${typeof t[l] == 'number' ? t[l] : l}${r})`;
  }
  function i(l) {
    return `@media (max-width:${(typeof t[l] == 'number' ? t[l] : l) - n / 100}${r})`;
  }
  function c(l, y) {
    const v = a.indexOf(y);
    return `@media (min-width:${typeof t[l] == 'number' ? t[l] : l}${r}) and (max-width:${
      (v !== -1 && typeof t[a[v]] == 'number' ? t[a[v]] : y) - n / 100
    }${r})`;
  }
  function d(l) {
    return a.indexOf(l) + 1 < a.length ? c(l, a[a.indexOf(l) + 1]) : u(l);
  }
  function h(l) {
    const y = a.indexOf(l);
    return y === 0
      ? u(a[1])
      : y === a.length - 1
      ? i(a[y])
      : c(l, a[a.indexOf(l) + 1]).replace('@media', '@media not all and');
  }
  return R({ keys: a, values: s, up: u, down: i, between: c, only: d, not: h, unit: r }, o);
}
const wn = { borderRadius: 4 },
  $n = wn,
  Rn =
    process.env.NODE_ENV !== 'production'
      ? U.oneOfType([U.number, U.string, U.object, U.array])
      : {},
  Ne = Rn;
function Fe(e, t) {
  return t ? de(e, t, { clone: !1 }) : e;
}
const vt = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  Kt = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${vt[e]}px)` };
function he(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const s = n.breakpoints || Kt;
    return t.reduce((a, u, i) => ((a[s.up(s.keys[i])] = r(t[i])), a), {});
  }
  if (typeof t == 'object') {
    const s = n.breakpoints || Kt;
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
function An(e = {}) {
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
function Pn(e, t) {
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
function Xe(e, t, r, n = r) {
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
      return he(a, u, (h) => {
        let l = Xe(c, o, h);
        return (
          h === l &&
            typeof h == 'string' &&
            (l = Xe(c, o, `${t}${h === 'default' ? '' : pe(h)}`, h)),
          r === !1 ? l : { [r]: l }
        );
      });
    };
  return (
    (s.propTypes = process.env.NODE_ENV !== 'production' ? { [t]: Ne } : {}),
    (s.filterProps = [t]),
    s
  );
}
function Mn(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const In = { m: 'margin', p: 'padding' },
  jn = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  Xt = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Bn = Mn((e) => {
    if (e.length > 2)
      if (Xt[e]) e = Xt[e];
      else return [e];
    const [t, r] = e.split(''),
      n = In[t],
      o = jn[r] || '';
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
  Dn = [...Ye, ...Ze];
function He(e, t, r, n) {
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
function Or(e) {
  return He(e, 'spacing', 8, 'spacing');
}
function Je(e, t) {
  if (typeof t == 'string' || t == null) return t;
  const r = Math.abs(t),
    n = e(r);
  return t >= 0 ? n : typeof n == 'number' ? -n : `-${n}`;
}
function Vn(e, t) {
  return (r) => e.reduce((n, o) => ((n[o] = Je(t, r)), n), {});
}
function Ln(e, t, r, n) {
  if (t.indexOf(r) === -1) return null;
  const o = Bn(r),
    s = Vn(o, n),
    a = e[r];
  return he(e, a, s);
}
function kr(e, t) {
  const r = Or(e.theme);
  return Object.keys(e)
    .map((n) => Ln(e, t, n, r))
    .reduce(Fe, {});
}
function G(e) {
  return kr(e, Ye);
}
G.propTypes =
  process.env.NODE_ENV !== 'production' ? Ye.reduce((e, t) => ((e[t] = Ne), e), {}) : {};
G.filterProps = Ye;
function q(e) {
  return kr(e, Ze);
}
q.propTypes =
  process.env.NODE_ENV !== 'production' ? Ze.reduce((e, t) => ((e[t] = Ne), e), {}) : {};
q.filterProps = Ze;
process.env.NODE_ENV !== 'production' && Dn.reduce((e, t) => ((e[t] = Ne), e), {});
function Fn(e = 8) {
  if (e.mui) return e;
  const t = Or({ spacing: e }),
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
    r = (n) => Object.keys(n).reduce((o, s) => (t[s] ? Fe(o, t[s](n)) : o), {});
  return (
    (r.propTypes =
      process.env.NODE_ENV !== 'production'
        ? e.reduce((n, o) => Object.assign(n, o.propTypes), {})
        : {}),
    (r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), [])),
    r
  );
}
function ie(e) {
  return typeof e != 'number' ? e : `${e}px solid`;
}
const zn = F({ prop: 'border', themeKey: 'borders', transform: ie }),
  Un = F({ prop: 'borderTop', themeKey: 'borders', transform: ie }),
  Hn = F({ prop: 'borderRight', themeKey: 'borders', transform: ie }),
  Jn = F({ prop: 'borderBottom', themeKey: 'borders', transform: ie }),
  Gn = F({ prop: 'borderLeft', themeKey: 'borders', transform: ie }),
  qn = F({ prop: 'borderColor', themeKey: 'palette' }),
  Kn = F({ prop: 'borderTopColor', themeKey: 'palette' }),
  Xn = F({ prop: 'borderRightColor', themeKey: 'palette' }),
  Wn = F({ prop: 'borderBottomColor', themeKey: 'palette' }),
  Yn = F({ prop: 'borderLeftColor', themeKey: 'palette' }),
  et = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const t = He(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        r = (n) => ({ borderRadius: Je(t, n) });
      return he(e, e.borderRadius, r);
    }
    return null;
  };
et.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: Ne } : {};
et.filterProps = ['borderRadius'];
Qe(zn, Un, Hn, Jn, Gn, qn, Kn, Xn, Wn, Yn, et);
const tt = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = He(e.theme, 'spacing', 8, 'gap'),
      r = (n) => ({ gap: Je(t, n) });
    return he(e, e.gap, r);
  }
  return null;
};
tt.propTypes = process.env.NODE_ENV !== 'production' ? { gap: Ne } : {};
tt.filterProps = ['gap'];
const rt = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = He(e.theme, 'spacing', 8, 'columnGap'),
      r = (n) => ({ columnGap: Je(t, n) });
    return he(e, e.columnGap, r);
  }
  return null;
};
rt.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: Ne } : {};
rt.filterProps = ['columnGap'];
const nt = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = He(e.theme, 'spacing', 8, 'rowGap'),
      r = (n) => ({ rowGap: Je(t, n) });
    return he(e, e.rowGap, r);
  }
  return null;
};
nt.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: Ne } : {};
nt.filterProps = ['rowGap'];
const Zn = F({ prop: 'gridColumn' }),
  Qn = F({ prop: 'gridRow' }),
  eo = F({ prop: 'gridAutoFlow' }),
  to = F({ prop: 'gridAutoColumns' }),
  ro = F({ prop: 'gridAutoRows' }),
  no = F({ prop: 'gridTemplateColumns' }),
  oo = F({ prop: 'gridTemplateRows' }),
  so = F({ prop: 'gridTemplateAreas' }),
  ao = F({ prop: 'gridArea' });
Qe(tt, rt, nt, Zn, Qn, eo, to, ro, no, oo, so, ao);
function Me(e, t) {
  return t === 'grey' ? t : e;
}
const io = F({ prop: 'color', themeKey: 'palette', transform: Me }),
  co = F({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Me }),
  uo = F({ prop: 'backgroundColor', themeKey: 'palette', transform: Me });
Qe(io, co, uo);
function Q(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const lo = F({ prop: 'width', transform: Q }),
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
            Q(r),
        };
      };
      return he(e, e.maxWidth, t);
    }
    return null;
  };
Nt.filterProps = ['maxWidth'];
const fo = F({ prop: 'minWidth', transform: Q }),
  po = F({ prop: 'height', transform: Q }),
  ho = F({ prop: 'maxHeight', transform: Q }),
  mo = F({ prop: 'minHeight', transform: Q });
F({ prop: 'size', cssProperty: 'width', transform: Q });
F({ prop: 'size', cssProperty: 'height', transform: Q });
const go = F({ prop: 'boxSizing' });
Qe(lo, Nt, fo, po, ho, mo, go);
const bo = {
    border: { themeKey: 'borders', transform: ie },
    borderTop: { themeKey: 'borders', transform: ie },
    borderRight: { themeKey: 'borders', transform: ie },
    borderBottom: { themeKey: 'borders', transform: ie },
    borderLeft: { themeKey: 'borders', transform: ie },
    borderColor: { themeKey: 'palette' },
    borderTopColor: { themeKey: 'palette' },
    borderRightColor: { themeKey: 'palette' },
    borderBottomColor: { themeKey: 'palette' },
    borderLeftColor: { themeKey: 'palette' },
    borderRadius: { themeKey: 'shape.borderRadius', style: et },
    color: { themeKey: 'palette', transform: Me },
    bgcolor: { themeKey: 'palette', cssProperty: 'backgroundColor', transform: Me },
    backgroundColor: { themeKey: 'palette', transform: Me },
    p: { style: q },
    pt: { style: q },
    pr: { style: q },
    pb: { style: q },
    pl: { style: q },
    px: { style: q },
    py: { style: q },
    padding: { style: q },
    paddingTop: { style: q },
    paddingRight: { style: q },
    paddingBottom: { style: q },
    paddingLeft: { style: q },
    paddingX: { style: q },
    paddingY: { style: q },
    paddingInline: { style: q },
    paddingInlineStart: { style: q },
    paddingInlineEnd: { style: q },
    paddingBlock: { style: q },
    paddingBlockStart: { style: q },
    paddingBlockEnd: { style: q },
    m: { style: G },
    mt: { style: G },
    mr: { style: G },
    mb: { style: G },
    ml: { style: G },
    mx: { style: G },
    my: { style: G },
    margin: { style: G },
    marginTop: { style: G },
    marginRight: { style: G },
    marginBottom: { style: G },
    marginLeft: { style: G },
    marginX: { style: G },
    marginY: { style: G },
    marginInline: { style: G },
    marginInlineStart: { style: G },
    marginInlineEnd: { style: G },
    marginBlock: { style: G },
    marginBlockStart: { style: G },
    marginBlockEnd: { style: G },
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
    gap: { style: tt },
    rowGap: { style: nt },
    columnGap: { style: rt },
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
    width: { transform: Q },
    maxWidth: { style: Nt },
    minWidth: { transform: Q },
    height: { transform: Q },
    maxHeight: { transform: Q },
    minHeight: { transform: Q },
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
  St = bo;
function yo(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []),
    r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function vo(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function No() {
  function e(r, n, o, s) {
    const a = { [r]: n, theme: o },
      u = s[r];
    if (!u) return { [r]: n };
    const { cssProperty: i = r, themeKey: c, transform: d, style: h } = u;
    if (n == null) return null;
    if (c === 'typography' && n === 'inherit') return { [r]: n };
    const l = We(o, c) || {};
    return h
      ? h(a)
      : he(a, n, (v) => {
          let p = Xe(l, d, v);
          return (
            v === p &&
              typeof v == 'string' &&
              (p = Xe(l, d, `${r}${v === 'default' ? '' : pe(v)}`, v)),
            i === !1 ? p : { [i]: p }
          );
        });
  }
  function t(r) {
    var n;
    const { sx: o, theme: s = {} } = r || {};
    if (!o) return null;
    const a = (n = s.unstable_sxConfig) != null ? n : St;
    function u(i) {
      let c = i;
      if (typeof i == 'function') c = i(s);
      else if (typeof i != 'object') return i;
      if (!c) return null;
      const d = An(s.breakpoints),
        h = Object.keys(d);
      let l = d;
      return (
        Object.keys(c).forEach((y) => {
          const v = vo(c[y], s);
          if (v != null)
            if (typeof v == 'object')
              if (a[y]) l = Fe(l, e(y, v, s, a));
              else {
                const p = he({ theme: s }, v, (f) => ({ [y]: f }));
                yo(p, v) ? (l[y] = t({ sx: v, theme: s })) : (l = Fe(l, p));
              }
            else l = Fe(l, e(y, v, s, a));
        }),
        Pn(h, l)
      );
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return t;
}
const _r = No();
_r.filterProps = ['sx'];
const Et = _r,
  So = ['breakpoints', 'palette', 'spacing', 'shape'];
function xt(e = {}, ...t) {
  const { breakpoints: r = {}, palette: n = {}, spacing: o, shape: s = {} } = e,
    a = me(e, So),
    u = Cn(r),
    i = Fn(o);
  let c = de(
    {
      breakpoints: u,
      direction: 'ltr',
      components: {},
      palette: R({ mode: 'light' }, n),
      spacing: i,
      shape: R({}, $n, s),
    },
    a,
  );
  return (
    (c = t.reduce((d, h) => de(d, h), c)),
    (c.unstable_sxConfig = R({}, St, a == null ? void 0 : a.unstable_sxConfig)),
    (c.unstable_sx = function (h) {
      return Et({ sx: h, theme: this });
    }),
    c
  );
}
function Eo(e) {
  return Object.keys(e).length === 0;
}
function xo(e = null) {
  const t = ze.useContext(Ar.ThemeContext);
  return !t || Eo(t) ? e : t;
}
const To = xt();
function Oo(e = To) {
  return xo(e);
}
const ko = ['variant'];
function Wt(e) {
  return e.length === 0;
}
function Cr(e) {
  const { variant: t } = e,
    r = me(e, ko);
  let n = t || '';
  return (
    Object.keys(r)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (n += Wt(n) ? e[o] : pe(e[o]))
          : (n += `${Wt(n) ? o : pe(o)}${pe(e[o].toString())}`);
      }),
    n
  );
}
const _o = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function Co(e) {
  return Object.keys(e).length === 0;
}
function wo(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const $o = (e, t) =>
    t.components && t.components[e] && t.components[e].styleOverrides
      ? t.components[e].styleOverrides
      : null,
  Ro = (e, t) => {
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
  Ao = (e, t, r, n) => {
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
function Ke(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Po = xt(),
  Mo = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function Ve({ defaultTheme: e, theme: t, themeId: r }) {
  return Co(t) ? e : t[r] || t;
}
function Io(e = {}) {
  const {
      themeId: t,
      defaultTheme: r = Po,
      rootShouldForwardProp: n = Ke,
      slotShouldForwardProp: o = Ke,
    } = e,
    s = (a) => Et(R({}, a, { theme: Ve(R({}, a, { defaultTheme: r, themeId: t })) }));
  return (
    (s.__mui_systemSx = !0),
    (a, u = {}) => {
      On(a, (I) => I.filter((g) => !(g != null && g.__mui_systemSx)));
      const { name: i, slot: c, skipVariantsResolver: d, skipSx: h, overridesResolver: l } = u,
        y = me(u, _o),
        v = d !== void 0 ? d : (c && c !== 'Root') || !1,
        p = h || !1;
      let f;
      process.env.NODE_ENV !== 'production' && i && (f = `${i}-${Mo(c || 'Root')}`);
      let T = Ke;
      c === 'Root' ? (T = n) : c ? (T = o) : wo(a) && (T = void 0);
      const K = Tn(a, R({ shouldForwardProp: T, label: f }, y)),
        H = (I, ...g) => {
          const Y = g
            ? g.map((z) =>
                typeof z == 'function' && z.__emotion_real !== z
                  ? (Z) => z(R({}, Z, { theme: Ve(R({}, Z, { defaultTheme: r, themeId: t })) }))
                  : z,
              )
            : [];
          let oe = I;
          i &&
            l &&
            Y.push((z) => {
              const Z = Ve(R({}, z, { defaultTheme: r, themeId: t })),
                be = $o(i, Z);
              if (be) {
                const ye = {};
                return (
                  Object.entries(be).forEach(([se, ue]) => {
                    ye[se] = typeof ue == 'function' ? ue(R({}, z, { theme: Z })) : ue;
                  }),
                  l(z, ye)
                );
              }
              return null;
            }),
            i &&
              !v &&
              Y.push((z) => {
                const Z = Ve(R({}, z, { defaultTheme: r, themeId: t }));
                return Ao(z, Ro(i, Z), Z, i);
              }),
            p || Y.push(s);
          const ge = Y.length - g.length;
          if (Array.isArray(I) && ge > 0) {
            const z = new Array(ge).fill('');
            (oe = [...I, ...z]), (oe.raw = [...I.raw, ...z]);
          } else
            typeof I == 'function' &&
              I.__emotion_real !== I &&
              (oe = (z) => I(R({}, z, { theme: Ve(R({}, z, { defaultTheme: r, themeId: t })) })));
          const ce = K(oe, ...Y);
          if (process.env.NODE_ENV !== 'production') {
            let z;
            i && (z = `${i}${c || ''}`),
              z === void 0 && (z = `Styled(${gn(a)})`),
              (ce.displayName = z);
          }
          return a.muiName && (ce.muiName = a.muiName), ce;
        };
      return K.withConfig && (H.withConfig = K.withConfig), H;
    }
  );
}
function jo(e) {
  const { theme: t, name: r, props: n } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps
    ? n
    : xr(t.components[r].defaultProps, n);
}
function Bo({ props: e, name: t, defaultTheme: r, themeId: n }) {
  let o = Oo(r);
  return n && (o = o[n] || o), jo({ theme: o, name: t, props: e });
}
function wr(e, t = 0, r = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < t || e > r) &&
      console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),
    Math.min(Math.max(t, e), r)
  );
}
function Do(e) {
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
function je(e) {
  if (e.type) return e;
  if (e.charAt(0) === '#') return je(Do(e));
  const t = e.indexOf('('),
    r = e.substring(0, t);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(r) === -1)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
        : Ie(9, e),
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
          : Ie(10, o),
      );
  } else n = n.split(',');
  return (n = n.map((s) => parseFloat(s))), { type: r, values: n, colorSpace: o };
}
function Tt(e) {
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
function Vo(e) {
  e = je(e);
  const { values: t } = e,
    r = t[0],
    n = t[1] / 100,
    o = t[2] / 100,
    s = n * Math.min(o, 1 - o),
    a = (c, d = (c + r / 30) % 12) => o - s * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let u = 'rgb';
  const i = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === 'hsla' && ((u += 'a'), i.push(t[3])), Tt({ type: u, values: i });
}
function Yt(e) {
  e = je(e);
  let t = e.type === 'hsl' || e.type === 'hsla' ? je(Vo(e)).values : e.values;
  return (
    (t = t.map(
      (r) => (
        e.type !== 'color' && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4
      ),
    )),
    Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3))
  );
}
function Zt(e, t) {
  const r = Yt(e),
    n = Yt(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Lo(e, t) {
  if (((e = je(e)), (t = wr(t)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - t;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] *= 1 - t;
  return Tt(e);
}
function Fo(e, t) {
  if (((e = je(e)), (t = wr(t)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf('rgb') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf('color') !== -1)
    for (let r = 0; r < 3; r += 1) e.values[r] += (1 - e.values[r]) * t;
  return Tt(e);
}
function zo(e, t) {
  return R(
    {
      toolbar: {
        minHeight: 56,
        [e.up('xs')]: { '@media (orientation: landscape)': { minHeight: 48 } },
        [e.up('sm')]: { minHeight: 64 },
      },
    },
    t,
  );
}
const Uo = { black: '#000', white: '#fff' },
  Ue = Uo,
  Ho = {
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
  Jo = Ho,
  Go = {
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
  Ce = Go,
  qo = {
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
  we = qo,
  Ko = {
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
  Le = Ko,
  Xo = {
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
  $e = Xo,
  Wo = {
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
  Re = Wo,
  Yo = {
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
  Ae = Yo,
  Zo = ['mode', 'contrastThreshold', 'tonalOffset'],
  Qt = {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: { paper: Ue.white, default: Ue.white },
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
  lt = {
    text: {
      primary: Ue.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: { paper: '#121212', default: '#121212' },
    action: {
      active: Ue.white,
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
function er(e, t, r, n) {
  const o = n.light || n,
    s = n.dark || n * 1.5;
  e[t] ||
    (e.hasOwnProperty(r)
      ? (e[t] = e[r])
      : t === 'light'
      ? (e.light = Fo(e.main, o))
      : t === 'dark' && (e.dark = Lo(e.main, s)));
}
function Qo(e = 'light') {
  return e === 'dark'
    ? { main: $e[200], light: $e[50], dark: $e[400] }
    : { main: $e[700], light: $e[400], dark: $e[800] };
}
function es(e = 'light') {
  return e === 'dark'
    ? { main: Ce[200], light: Ce[50], dark: Ce[400] }
    : { main: Ce[500], light: Ce[300], dark: Ce[700] };
}
function ts(e = 'light') {
  return e === 'dark'
    ? { main: we[500], light: we[300], dark: we[700] }
    : { main: we[700], light: we[400], dark: we[800] };
}
function rs(e = 'light') {
  return e === 'dark'
    ? { main: Re[400], light: Re[300], dark: Re[700] }
    : { main: Re[700], light: Re[500], dark: Re[900] };
}
function ns(e = 'light') {
  return e === 'dark'
    ? { main: Ae[400], light: Ae[300], dark: Ae[700] }
    : { main: Ae[800], light: Ae[500], dark: Ae[900] };
}
function os(e = 'light') {
  return e === 'dark'
    ? { main: Le[400], light: Le[300], dark: Le[700] }
    : { main: '#ed6c02', light: Le[500], dark: Le[900] };
}
function ss(e) {
  const { mode: t = 'light', contrastThreshold: r = 3, tonalOffset: n = 0.2 } = e,
    o = me(e, Zo),
    s = e.primary || Qo(t),
    a = e.secondary || es(t),
    u = e.error || ts(t),
    i = e.info || rs(t),
    c = e.success || ns(t),
    d = e.warning || os(t);
  function h(p) {
    const f = Zt(p, lt.text.primary) >= r ? lt.text.primary : Qt.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const T = Zt(p, f);
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
      lightShade: K = 300,
      darkShade: H = 700,
    }) => {
      if (((p = R({}, p)), !p.main && p[T] && (p.main = p[T]), !p.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${f ? ` (${f})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`
            : Ie(11, f ? ` (${f})` : '', T),
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
            : Ie(12, f ? ` (${f})` : '', JSON.stringify(p.main)),
        );
      return (
        er(p, 'light', K, n), er(p, 'dark', H, n), p.contrastText || (p.contrastText = h(p.main)), p
      );
    },
    y = { dark: lt, light: Qt };
  return (
    process.env.NODE_ENV !== 'production' &&
      (y[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)),
    de(
      R(
        {
          common: R({}, Ue),
          mode: t,
          primary: l({ color: s, name: 'primary' }),
          secondary: l({
            color: a,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          error: l({ color: u, name: 'error' }),
          warning: l({ color: d, name: 'warning' }),
          info: l({ color: i, name: 'info' }),
          success: l({ color: c, name: 'success' }),
          grey: Jo,
          contrastThreshold: r,
          getContrastText: h,
          augmentColor: l,
          tonalOffset: n,
        },
        y[t],
      ),
      o,
    )
  );
}
const as = [
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
function is(e) {
  return Math.round(e * 1e5) / 1e5;
}
const tr = { textTransform: 'uppercase' },
  rr = '"Roboto", "Helvetica", "Arial", sans-serif';
function cs(e, t) {
  const r = typeof t == 'function' ? t(e) : t,
    {
      fontFamily: n = rr,
      fontSize: o = 14,
      fontWeightLight: s = 300,
      fontWeightRegular: a = 400,
      fontWeightMedium: u = 500,
      fontWeightBold: i = 700,
      htmlFontSize: c = 16,
      allVariants: d,
      pxToRem: h,
    } = r,
    l = me(r, as);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof c != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const y = o / 14,
    v = h || ((T) => `${(T / c) * y}rem`),
    p = (T, K, H, I, g) =>
      R(
        { fontFamily: n, fontWeight: T, fontSize: v(K), lineHeight: H },
        n === rr ? { letterSpacing: `${is(I / K)}em` } : {},
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
      button: p(u, 14, 1.75, 0.4, tr),
      caption: p(a, 12, 1.66, 0.4),
      overline: p(a, 12, 2.66, 1, tr),
      inherit: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    };
  return de(
    R(
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
    { clone: !1 },
  );
}
const us = 0.2,
  ls = 0.14,
  fs = 0.12;
function J(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${us})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ls})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${fs})`,
  ].join(',');
}
const ds = [
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
  ps = ds,
  hs = ['duration', 'easing', 'delay'],
  ms = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  gs = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function nr(e) {
  return `${Math.round(e)}ms`;
}
function bs(e) {
  if (!e) return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function ys(e) {
  const t = R({}, ms, e.easing),
    r = R({}, gs, e.duration);
  return R(
    {
      getAutoHeightDuration: bs,
      create: (o = ['all'], s = {}) => {
        const { duration: a = r.standard, easing: u = t.easeInOut, delay: i = 0 } = s,
          c = me(s, hs);
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
              `${d} ${typeof a == 'string' ? a : nr(a)} ${u} ${typeof i == 'string' ? i : nr(i)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: t, duration: r },
  );
}
const vs = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  Ns = vs,
  Ss = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Es(e = {}, ...t) {
  const { mixins: r = {}, palette: n = {}, transitions: o = {}, typography: s = {} } = e,
    a = me(e, Ss);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Ie(18),
    );
  const u = ss(n),
    i = xt(e);
  let c = de(i, {
    mixins: zo(i.breakpoints, r),
    palette: u,
    shadows: ps.slice(),
    typography: cs(u, s),
    transitions: ys(o),
    zIndex: R({}, Ns),
  });
  if (
    ((c = de(c, a)), (c = t.reduce((d, h) => de(d, h), c)), process.env.NODE_ENV !== 'production')
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
      h = (l, y) => {
        let v;
        for (v in l) {
          const p = l[v];
          if (d.indexOf(v) !== -1 && Object.keys(p).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const f = yt('', v);
              console.error(
                [
                  `MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(l, null, 2),
                  '',
                  `Instead, you need to use the '&.${f}' syntax:`,
                  JSON.stringify({ root: { [`&.${f}`]: p } }, null, 2),
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
      const y = c.components[l].styleOverrides;
      y && l.indexOf('Mui') === 0 && h(y, l);
    });
  }
  return (
    (c.unstable_sxConfig = R({}, St, a == null ? void 0 : a.unstable_sxConfig)),
    (c.unstable_sx = function (h) {
      return Et({ sx: h, theme: this });
    }),
    c
  );
}
const xs = Es(),
  $r = xs,
  Rr = '$$material';
function Ts({ props: e, name: t }) {
  return Bo({ props: e, name: t, defaultTheme: $r, themeId: Rr });
}
const Os = (e) => Ke(e) && e !== 'classes',
  ks = Io({ themeId: Rr, defaultTheme: $r, rootShouldForwardProp: Os }),
  _s = ks;
function Cs(e) {
  return yt('MuiSvgIcon', e);
}
En('MuiSvgIcon', [
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
const ws = [
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
  $s = (e) => {
    const { color: t, fontSize: r, classes: n } = e,
      o = { root: ['root', t !== 'inherit' && `color${pe(t)}`, `fontSize${pe(r)}`] };
    return bn(o, Cs, n);
  },
  Rs = _s('svg', {
    name: 'MuiSvgIcon',
    slot: 'Root',
    overridesResolver: (e, t) => {
      const { ownerState: r } = e;
      return [
        t.root,
        r.color !== 'inherit' && t[`color${pe(r.color)}`],
        t[`fontSize${pe(r.fontSize)}`],
      ];
    },
  })(({ theme: e, ownerState: t }) => {
    var r, n, o, s, a, u, i, c, d, h, l, y, v;
    return {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
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
      color:
        (h = (l = (e.vars || e).palette) == null || (l = l[t.color]) == null ? void 0 : l.main) !=
        null
          ? h
          : {
              action:
                (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.active,
              disabled:
                (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
              inherit: void 0,
            }[t.color],
    };
  }),
  Ot = ze.forwardRef(function (t, r) {
    const n = Ts({ props: t, name: 'MuiSvgIcon' }),
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
      y = me(n, ws),
      v = ze.isValidElement(o) && o.type === 'svg',
      p = R({}, n, {
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
    const T = $s(p);
    return x.jsxs(
      Rs,
      R(
        {
          as: u,
          className: xn(T.root, s),
          focusable: 'false',
          color: c,
          'aria-hidden': h ? void 0 : !0,
          role: h ? 'img' : void 0,
          ref: r,
        },
        f,
        y,
        v && o.props,
        {
          ownerState: p,
          children: [v ? o.props.children : o, h ? x.jsx('title', { children: h }) : null],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Ot.propTypes = {
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
Ot.muiName = 'SvgIcon';
const or = Ot;
function As(e, t) {
  function r(n, o) {
    return x.jsx(or, R({ 'data-testid': `${t}Icon`, ref: o }, n, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (r.displayName = `${t}Icon`),
    (r.muiName = or.muiName),
    ze.memo(ze.forwardRef(r))
  );
}
const Ps = As(x.jsx('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' }), 'Menu');
function Ms({ menu: e, dataHandler: t, commandHandler: r, className: n, children: o }) {
  const [s, a] = ae.useState(!1),
    [u, i] = ae.useState(!1),
    c = ae.useCallback(() => {
      s && a(!1), i(!1);
    }, [s]),
    d = ae.useCallback((f) => {
      f.stopPropagation(),
        a((T) => {
          const K = !T;
          return K && f.shiftKey && i(!0), K;
        });
    }, []),
    h = ae.useRef(null),
    [l, y] = ae.useState(0);
  ae.useEffect(() => {
    s && h.current && y(h.current.clientHeight);
  }, [s]);
  const v = ae.useCallback((f) => (c(), r(f)), [r, c]);
  let p = e;
  return (
    !p && t && (p = t(u)),
    x.jsx('div', {
      ref: h,
      style: { position: 'relative' },
      children: x.jsx(W.AppBar, {
        position: 'static',
        children: x.jsxs(W.Toolbar, {
          className: `papi-toolbar ${n ?? ''}`,
          variant: 'dense',
          children: [
            p
              ? x.jsx(W.IconButton, {
                  edge: 'start',
                  className: `papi-menuButton ${n ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: d,
                  children: x.jsx(Ps, {}),
                })
              : null,
            o ? x.jsx('div', { className: 'papi-menu-children', children: o }) : null,
            p
              ? x.jsx(W.Drawer, {
                  className: `papi-menu-drawer ${n ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: s,
                  onClose: c,
                  PaperProps: { className: 'papi-menu-drawer-paper', style: { top: l } },
                  children: x.jsx(ir, { commandHandler: v, columns: p.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
exports.Button = Ee;
exports.Checkbox = Ir;
exports.ComboBox = sr;
exports.GridMenu = ir;
exports.LabelPosition = Te;
exports.MenuItem = ar;
exports.RefSelector = Yr;
exports.Slider = Zr;
exports.Snackbar = Qr;
exports.Switch = en;
exports.TextField = ft;
exports.Toolbar = Ms;
function Is(e, t = 'top') {
  if (!e || typeof document > 'u') return;
  const r = document.head || document.querySelector('head'),
    n = r.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    t === 'top' && n ? r.insertBefore(o, n) : r.appendChild(o);
}
Is(
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
  position: relative;
  width: 100%;
}

.papi-menu-drawer-paper {
  height: fit-content !important;
}

.papi-menu-children {
  padding: 10px;
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
`,
  'top',
);
//# sourceMappingURL=index.cjs.js.map
