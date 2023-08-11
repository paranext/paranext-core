'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const N = require('react/jsx-runtime'),
  Q = require('@mui/material'),
  ie = require('react'),
  Or = require('react-data-grid'),
  fr = require('@mui/styled-engine');
function Bn(e) {
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
const Fe = Bn(ie);
function Se({
  id: e,
  isDisabled: r = !1,
  className: n,
  onClick: t,
  onContextMenu: o,
  children: a,
}) {
  return N.jsx(Q.Button, {
    id: e,
    disabled: r,
    className: `papi-button ${n ?? ''}`,
    onClick: t,
    onContextMenu: o,
    children: a,
  });
}
var Ee = ((e) => (
  (e.After = 'after'), (e.Before = 'before'), (e.Above = 'above'), (e.Below = 'below'), e
))(Ee || {});
function ln({
  id: e,
  isChecked: r,
  labelText: n = '',
  labelPosition: t = Ee.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: c = !1,
  className: u,
  onChange: i,
}) {
  const f = N.jsx(Q.Checkbox, {
    id: e,
    checked: r,
    indeterminate: o,
    defaultChecked: a,
    disabled: s,
    className: `papi-checkbox ${c ? 'error' : ''} ${u ?? ''}`,
    onChange: i,
  });
  let p;
  if (n) {
    const l = t === Ee.Before || t === Ee.Above,
      v = N.jsx('span', {
        className: `papi-checkbox-label ${c ? 'error' : ''} ${u ?? ''}`,
        children: n,
      }),
      b = t === Ee.Before || t === Ee.After,
      h = b ? v : N.jsx('div', { children: v }),
      d = b ? f : N.jsx('div', { children: f });
    p = N.jsxs(Q.FormLabel, {
      className: `papi-checkbox ${t.toString()}`,
      disabled: s,
      error: c,
      children: [l && h, d, !l && h],
    });
  } else p = f;
  return p;
}
function un({
  id: e,
  title: r,
  isDisabled: n = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: s,
  options: c = [],
  className: u,
  value: i,
  onChange: f,
  onFocus: p,
  onBlur: l,
  checkIsOptionEqualToValue: v,
}) {
  return N.jsx(Q.Autocomplete, {
    id: e,
    disablePortal: !0,
    disabled: n,
    disableClearable: !t,
    fullWidth: a,
    options: c,
    className: `papi-combo-box ${o ? 'error' : ''} ${u ?? ''}`,
    value: i,
    onChange: f,
    onFocus: p,
    onBlur: l,
    isOptionEqualToValue: v,
    renderInput: (b) =>
      N.jsx(Q.TextField, {
        ...b,
        error: o,
        fullWidth: a,
        disabled: n,
        label: r,
        style: { width: s },
      }),
  });
}
function dn(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: c = !1,
    focusVisibleClassName: u,
    id: i,
  } = e;
  return N.jsx(Q.MenuItem, {
    autoFocus: t,
    className: o,
    dense: a,
    disableGutters: s,
    divider: c,
    focusVisibleClassName: u,
    onClick: r,
    id: i,
    children: n,
  });
}
function Dn({ commandHandler: e, name: r, className: n, items: t, id: o }) {
  return N.jsxs(Q.Grid, {
    id: o,
    item: !0,
    xs: 'auto',
    className: `papi-menu-column ${n ?? ''}`,
    children: [
      N.jsx('h3', { className: `papi-menu ${n ?? ''}`, children: r }),
      t.map((a, s) =>
        N.jsx(
          dn,
          {
            className: `papi-menu-item ${a.className}`,
            onClick: () => {
              e(a);
            },
            ...a,
          },
          s,
        ),
      ),
    ],
  });
}
function fn({ commandHandler: e, className: r, columns: n, id: t }) {
  return N.jsx(Q.Grid, {
    container: !0,
    spacing: 0,
    className: `papi-multi-column-menu ${r ?? ''}`,
    columns: n.length,
    id: t,
    children: n.map((o, a) =>
      N.jsx(Dn, { commandHandler: e, name: o.name, className: r, items: o.items }, a),
    ),
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
  pn = [
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
function gr(e) {
  return Be(e) > 0;
}
function Ln(e) {
  const r = typeof e == 'string' ? Be(e) : e;
  return r >= 40 && r <= 66;
}
function Fn(e) {
  return (typeof e == 'string' ? Be(e) : e) <= 39;
}
function hn(e) {
  return e <= 66;
}
function Hn(e) {
  const r = typeof e == 'string' ? Be(e) : e;
  return bn(r) && !hn(r);
}
function* Un() {
  for (let e = 1; e <= we.length; e++) yield e;
}
const Gn = 1,
  mn = we.length;
function Jn() {
  return ['XXA', 'XXB', 'XXC', 'XXD', 'XXE', 'XXF', 'XXG'];
}
function br(e, r = '***') {
  const n = e - 1;
  return n < 0 || n >= we.length ? r : we[n];
}
function gn(e) {
  return e <= 0 || e > mn ? '******' : pn[e - 1];
}
function qn(e) {
  return gn(Be(e));
}
function bn(e) {
  const r = typeof e == 'number' ? br(e) : e;
  return gr(r) && !mr.includes(r);
}
function Kn(e) {
  const r = typeof e == 'number' ? br(e) : e;
  return gr(r) && mr.includes(r);
}
function Wn(e) {
  return pn[e - 1].includes('*obsolete*');
}
function Xn() {
  const e = {};
  for (let r = 0; r < we.length; r++) e[we[r]] = r + 1;
  return e;
}
const ce = {
  allBookIds: we,
  nonCanonicalIds: mr,
  bookIdToNumber: Be,
  isBookIdValid: gr,
  isBookNT: Ln,
  isBookOT: Fn,
  isBookOTNT: hn,
  isBookDC: Hn,
  allBookNumbers: Un,
  firstBook: Gn,
  lastBook: mn,
  extraBooks: Jn,
  bookNumberToId: br,
  bookNumberToEnglishName: gn,
  bookIdToEnglishName: qn,
  isCanonical: bn,
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
let oe = Ne;
R(oe, 'Original', new Ne(ve.Original)),
  R(oe, 'Septuagint', new Ne(ve.Septuagint)),
  R(oe, 'Vulgate', new Ne(ve.Vulgate)),
  R(oe, 'English', new Ne(ve.English)),
  R(oe, 'RussianProtestant', new Ne(ve.RussianProtestant)),
  R(oe, 'RussianOrthodox', new Ne(ve.RussianOrthodox));
function Rr(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++) e = e.split(r[t]).join(n);
  return e.split(n);
}
var yn = ((e) => (
  (e[(e.Valid = 0)] = 'Valid'),
  (e[(e.UnknownVersification = 1)] = 'UnknownVersification'),
  (e[(e.OutOfRange = 2)] = 'OutOfRange'),
  (e[(e.VerseOutOfOrder = 3)] = 'VerseOutOfOrder'),
  (e[(e.VerseRepeated = 4)] = 'VerseRepeated'),
  e
))(yn || {});
const _ = class {
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
          s = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == 'number') {
        const a = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(a),
          (this._verseNum = r % _.chapterDigitShifter),
          (this._chapterNum = Math.floor((r % _.bookDigitShifter) / _.chapterDigitShifter)),
          (this._bookNum = Math.floor(r / _.bookDigitShifter));
      } else if (n == null)
        if (r != null && r instanceof _) {
          const a = r;
          (this._bookNum = a.bookNum),
            (this._chapterNum = a.chapterNum),
            (this._verseNum = a.verseNum),
            (this._verse = a.verse),
            (this.versification = a.versification);
        } else {
          if (r == null) return;
          const a = r instanceof oe ? r : _.defaultVersification;
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
          (this.versification = o ?? _.defaultVersification);
      else throw new Error('VerseRef constructor not supported.');
    else throw new Error('VerseRef constructor not supported.');
  }
  static parse(r, n = _.defaultVersification) {
    const t = new _(n);
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
      return (n = _.parse(r)), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof De) return (n = new _()), { success: !1, verseRef: n };
      throw t;
    }
  }
  static getBBBCCCVVV(r, n, t) {
    return (
      (r % _.bcvMaxValue) * _.bookDigitShifter +
      (n >= 0 ? (n % _.bcvMaxValue) * _.chapterDigitShifter : 0) +
      (t >= 0 ? t % _.bcvMaxValue : 0)
    );
  }
  static tryGetVerseNum(r) {
    let n;
    if (!r) return (n = -1), { success: !0, vNum: n };
    n = 0;
    let t;
    for (let o = 0; o < r.length; o++) {
      if (((t = r[o]), t < '0' || t > '9')) return o === 0 && (n = -1), { success: !1, vNum: n };
      if (((n = n * 10 + +t - +'0'), n > _.bcvMaxValue)) return (n = -1), { success: !1, vNum: n };
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
      (this._verse.includes(_.verseRangeSeparator) ||
        this._verse.includes(_.verseSequenceIndicator))
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
    const { success: n, vNum: t } = _.tryGetVerseNum(r);
    (this._verse = n ? void 0 : r.replace(this.rtlMark, '')),
      (this._verseNum = t),
      !(this._verseNum >= 0) && ({ vNum: this._verseNum } = _.tryGetVerseNum(this._verse));
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
    this.versification = this.versification != null ? new oe(r) : void 0;
  }
  get valid() {
    return this.validStatus === 0;
  }
  get validStatus() {
    return this.validateVerse(_.verseRangeSeparators, _.verseSequenceIndicators);
  }
  get BBBCCC() {
    return _.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  get BBBCCCVVV() {
    return _.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new oe(ve[s]);
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
      !_.isVerseParseable(t[1])
    )
      throw new De('Invalid reference : ' + r);
    this.updateInternal(n[0], t[0], t[1]);
  }
  simplify() {
    this._verse = void 0;
  }
  clone() {
    return new _(this);
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
  allVerses(r = !1, n = _.verseRangeSeparators, t = _.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0) return [this.clone()];
    const o = [],
      a = Rr(this._verse, t);
    for (const s of a.map((c) => Rr(c, n))) {
      const c = this.clone();
      c.verse = s[0];
      const u = c.verseNum;
      if ((o.push(c), s.length > 1)) {
        const i = this.clone();
        if (((i.verse = s[1]), !r))
          for (let f = u + 1; f < i.verseNum; f++) {
            const p = new _(this._bookNum, this._chapterNum, f, this.versification);
            this.isExcluded || o.push(p);
          }
        o.push(i);
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
  setEmpty(r = _.defaultVersification) {
    (this._bookNum = 0), (this._chapterNum = -1), (this._verse = void 0), (this.versification = r);
  }
  updateInternal(r, n, t) {
    (this.bookNum = ce.bookIdToNumber(r)), (this.chapter = n), (this.verse = t);
  }
};
let he = _;
R(he, 'defaultVersification', oe.English),
  R(he, 'verseRangeSeparator', '-'),
  R(he, 'verseSequenceIndicator', ','),
  R(he, 'verseRangeSeparators', [_.verseRangeSeparator]),
  R(he, 'verseSequenceIndicators', [_.verseSequenceIndicator]),
  R(he, 'chapterDigitShifter', 1e3),
  R(he, 'bookDigitShifter', _.chapterDigitShifter * _.chapterDigitShifter),
  R(he, 'bcvMaxValue', _.chapterDigitShifter - 1),
  R(he, 'ValidStatusType', yn);
class De extends Error {}
const vn = [
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
function $r() {
  return ce.allBookIds.map((e) => ({ bookId: e, label: ce.bookIdToEnglishName(e) }));
}
function Ar(e) {
  return { bookId: ce.bookNumberToId(e), label: ce.bookNumberToEnglishName(e) };
}
const xn = 1,
  Yn = vn.length - 1,
  kn = 1,
  Sn = 1,
  Nn = (e) => {
    var r;
    return ((r = vn[e]) == null ? void 0 : r.chapters) ?? -1;
  },
  Pr = (e, r) => ({
    bookNum: Math.max(xn, Math.min(e.bookNum + r, Yn)),
    chapterNum: 1,
    verseNum: 1,
  }),
  Mr = (e, r) => ({
    ...e,
    chapterNum: Math.min(Math.max(kn, e.chapterNum + r), Nn(e.bookNum)),
    verseNum: 1,
  }),
  Ir = (e, r) => ({ ...e, verseNum: Math.max(Sn, e.verseNum + r) });
function We({
  variant: e = 'outlined',
  id: r,
  isDisabled: n = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: c,
  isRequired: u = !1,
  className: i,
  defaultValue: f,
  value: p,
  onChange: l,
  onFocus: v,
  onBlur: b,
}) {
  return N.jsx(Q.TextField, {
    variant: e,
    id: r,
    disabled: n,
    error: t,
    fullWidth: o,
    helperText: a,
    label: s,
    placeholder: c,
    required: u,
    className: `papi-textfield ${i ?? ''}`,
    defaultValue: f,
    value: p,
    onChange: l,
    onFocus: v,
    onBlur: b,
  });
}
function Zn(e, r) {
  return e.bookId === r.bookId && e.label === r.label;
}
function Qn({ scrRef: e, handleSubmit: r, id: n }) {
  const [t, o] = ie.useState(Ar(e.bookNum)),
    a = (i) => {
      o(Ar(i.bookNum)), r(i);
    },
    s = (i, f) => {
      const l = { bookNum: ce.bookIdToNumber(f.bookId), chapterNum: 1, verseNum: 1 };
      a(l);
    },
    c = (i) => {
      r({ ...e, chapterNum: +i.target.value });
    },
    u = (i) => {
      r({ ...e, verseNum: +i.target.value });
    };
  return N.jsxs('div', {
    id: n,
    children: [
      N.jsx(un, {
        title: 'Book',
        className: 'papi-ref-selector book',
        options: $r(),
        onChange: s,
        value: t,
        isClearable: !1,
        width: 200,
        checkIsOptionEqualToValue: Zn,
      }),
      N.jsx(Se, { onClick: () => a(Pr(e, -1)), isDisabled: e.bookNum <= xn, children: '<' }),
      N.jsx(Se, {
        onClick: () => a(Pr(e, 1)),
        isDisabled: e.bookNum >= $r().length,
        children: '>',
      }),
      N.jsx(We, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Chapter',
        value: e.chapterNum,
        onChange: c,
      }),
      N.jsx(Se, { onClick: () => r(Mr(e, -1)), isDisabled: e.chapterNum <= kn, children: '<' }),
      N.jsx(Se, {
        onClick: () => r(Mr(e, 1)),
        isDisabled: e.chapterNum >= Nn(e.bookNum),
        children: '>',
      }),
      N.jsx(We, {
        className: 'papi-ref-selector chapter-verse',
        label: 'Verse',
        value: e.verseNum,
        onChange: u,
      }),
      N.jsx(Se, { onClick: () => r(Ir(e, -1)), isDisabled: e.verseNum <= Sn, children: '<' }),
      N.jsx(Se, { onClick: () => r(Ir(e, 1)), children: '>' }),
    ],
  });
}
function et({
  id: e,
  isDisabled: r = !1,
  orientation: n = 'horizontal',
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: s = !1,
  defaultValue: c,
  valueLabelDisplay: u = 'off',
  className: i,
  onChange: f,
  onChangeCommitted: p,
}) {
  return N.jsx(Q.Slider, {
    id: e,
    disabled: r,
    orientation: n,
    min: t,
    max: o,
    step: a,
    marks: s,
    defaultValue: c,
    valueLabelDisplay: u,
    className: `papi-slider ${n} ${i ?? ''}`,
    onChange: f,
    onChangeCommitted: p,
  });
}
function rt({
  autoHideDuration: e = null,
  id: r,
  isOpen: n = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: 'bottom', horizontal: 'left' },
  ContentProps: s = { action: '', message: '', className: `papi-snackbar ${t ?? ''}` },
  children: c,
}) {
  return N.jsx(Q.Snackbar, {
    autoHideDuration: e,
    className: `papi-snackbar ${t ?? ''}`,
    open: n,
    onClose: o,
    anchorOrigin: a,
    ContentProps: s,
    id: r,
    children: c,
  });
}
function nt({
  id: e,
  isChecked: r,
  isDisabled: n = !1,
  hasError: t = !1,
  className: o,
  onChange: a,
}) {
  return N.jsx(Q.Switch, {
    id: e,
    checked: r,
    disabled: n,
    className: `papi-switch ${t ? 'error' : ''} ${o ?? ''}`,
    onChange: a,
  });
}
function jr({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return N.jsx(We, { defaultValue: r[n.key], onChange: t });
}
const tt = ({ onChange: e, disabled: r, checked: n, ...t }) => {
  function o(a) {
    e(a.target.checked, a.nativeEvent.shiftKey);
  }
  return N.jsx(ln, { ...t, isChecked: n, isDisabled: r, onChange: o });
};
function ot({
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
  selectColumnWidth: p = 50,
  rowKeyGetter: l,
  rowHeight: v = 35,
  headerRowHeight: b = 35,
  selectedRows: h,
  onSelectedRowsChange: d,
  onRowsChange: S,
  onCellClick: W,
  onCellDoubleClick: j,
  onCellContextMenu: $,
  onCellKeyDown: m,
  direction: X = 'ltr',
  enableVirtualization: ne = !0,
  onCopy: le,
  onPaste: ae,
  onScroll: B,
  className: Y,
}) {
  const ue = ie.useMemo(() => {
    const se = e.map((J) =>
      typeof J.editable == 'function'
        ? { ...J, editable: (ee) => !!J.editable(ee), renderEditCell: J.renderEditCell || jr }
        : J.editable && !J.renderEditCell
        ? { ...J, renderEditCell: jr }
        : J.renderEditCell && !J.editable
        ? { ...J, editable: !1 }
        : J,
    );
    return f ? [{ ...Or.SelectColumn, minWidth: p }, ...se] : se;
  }, [f, e]);
  return N.jsx(Or, {
    columns: ue,
    defaultColumnOptions: { width: o, minWidth: a, maxWidth: s, sortable: c, resizable: u },
    sortColumns: r,
    onSortColumnsChange: n,
    onColumnResize: t,
    rows: i,
    rowKeyGetter: l,
    rowHeight: v,
    headerRowHeight: b,
    selectedRows: h,
    onSelectedRowsChange: d,
    onRowsChange: S,
    onCellClick: W,
    onCellDoubleClick: j,
    onCellContextMenu: $,
    onCellKeyDown: m,
    direction: X,
    enableVirtualization: ne,
    onCopy: le,
    onPaste: ae,
    onScroll: B,
    renderers: { renderCheckbox: tt },
    className: Y ?? 'rdg-light',
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
function En(e) {
  if (!Pe(e)) return e;
  const r = {};
  return (
    Object.keys(e).forEach((n) => {
      r[n] = En(e[n]);
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
            ? (t[o] = Pe(r[o]) ? En(r[o]) : r[o])
            : (t[o] = r[o]));
      }),
    t
  );
}
function at(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var pr = { exports: {} },
  qe = { exports: {} },
  z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Br;
function st() {
  if (Br) return z;
  Br = 1;
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
    p = e ? Symbol.for('react.suspense') : 60113,
    l = e ? Symbol.for('react.suspense_list') : 60120,
    v = e ? Symbol.for('react.memo') : 60115,
    b = e ? Symbol.for('react.lazy') : 60116,
    h = e ? Symbol.for('react.block') : 60121,
    d = e ? Symbol.for('react.fundamental') : 60117,
    S = e ? Symbol.for('react.responder') : 60118,
    W = e ? Symbol.for('react.scope') : 60119;
  function j(m) {
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
            case p:
              return m;
            default:
              switch (((m = m && m.$$typeof), m)) {
                case c:
                case f:
                case b:
                case v:
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
    return j(m) === i;
  }
  return (
    (z.AsyncMode = u),
    (z.ConcurrentMode = i),
    (z.ContextConsumer = c),
    (z.ContextProvider = s),
    (z.Element = r),
    (z.ForwardRef = f),
    (z.Fragment = t),
    (z.Lazy = b),
    (z.Memo = v),
    (z.Portal = n),
    (z.Profiler = a),
    (z.StrictMode = o),
    (z.Suspense = p),
    (z.isAsyncMode = function (m) {
      return $(m) || j(m) === u;
    }),
    (z.isConcurrentMode = $),
    (z.isContextConsumer = function (m) {
      return j(m) === c;
    }),
    (z.isContextProvider = function (m) {
      return j(m) === s;
    }),
    (z.isElement = function (m) {
      return typeof m == 'object' && m !== null && m.$$typeof === r;
    }),
    (z.isForwardRef = function (m) {
      return j(m) === f;
    }),
    (z.isFragment = function (m) {
      return j(m) === t;
    }),
    (z.isLazy = function (m) {
      return j(m) === b;
    }),
    (z.isMemo = function (m) {
      return j(m) === v;
    }),
    (z.isPortal = function (m) {
      return j(m) === n;
    }),
    (z.isProfiler = function (m) {
      return j(m) === a;
    }),
    (z.isStrictMode = function (m) {
      return j(m) === o;
    }),
    (z.isSuspense = function (m) {
      return j(m) === p;
    }),
    (z.isValidElementType = function (m) {
      return (
        typeof m == 'string' ||
        typeof m == 'function' ||
        m === t ||
        m === i ||
        m === a ||
        m === o ||
        m === p ||
        m === l ||
        (typeof m == 'object' &&
          m !== null &&
          (m.$$typeof === b ||
            m.$$typeof === v ||
            m.$$typeof === s ||
            m.$$typeof === c ||
            m.$$typeof === f ||
            m.$$typeof === d ||
            m.$$typeof === S ||
            m.$$typeof === W ||
            m.$$typeof === h))
      );
    }),
    (z.typeOf = j),
    z
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
 */ var Dr;
function it() {
  return (
    Dr ||
      ((Dr = 1),
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
            p = e ? Symbol.for('react.suspense') : 60113,
            l = e ? Symbol.for('react.suspense_list') : 60120,
            v = e ? Symbol.for('react.memo') : 60115,
            b = e ? Symbol.for('react.lazy') : 60116,
            h = e ? Symbol.for('react.block') : 60121,
            d = e ? Symbol.for('react.fundamental') : 60117,
            S = e ? Symbol.for('react.responder') : 60118,
            W = e ? Symbol.for('react.scope') : 60119;
          function j(y) {
            return (
              typeof y == 'string' ||
              typeof y == 'function' ||
              y === t ||
              y === i ||
              y === a ||
              y === o ||
              y === p ||
              y === l ||
              (typeof y == 'object' &&
                y !== null &&
                (y.$$typeof === b ||
                  y.$$typeof === v ||
                  y.$$typeof === s ||
                  y.$$typeof === c ||
                  y.$$typeof === f ||
                  y.$$typeof === d ||
                  y.$$typeof === S ||
                  y.$$typeof === W ||
                  y.$$typeof === h))
            );
          }
          function $(y) {
            if (typeof y == 'object' && y !== null) {
              var te = y.$$typeof;
              switch (te) {
                case r:
                  var k = y.type;
                  switch (k) {
                    case u:
                    case i:
                    case t:
                    case a:
                    case o:
                    case p:
                      return k;
                    default:
                      var Ce = k && k.$$typeof;
                      switch (Ce) {
                        case c:
                        case f:
                        case b:
                        case v:
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
          var m = u,
            X = i,
            ne = c,
            le = s,
            ae = r,
            B = f,
            Y = t,
            ue = b,
            se = v,
            J = n,
            de = a,
            ee = o,
            pe = p,
            ke = !1;
          function Te(y) {
            return (
              ke ||
                ((ke = !0),
                console.warn(
                  'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.',
                )),
              g(y) || $(y) === u
            );
          }
          function g(y) {
            return $(y) === i;
          }
          function x(y) {
            return $(y) === c;
          }
          function O(y) {
            return $(y) === s;
          }
          function T(y) {
            return typeof y == 'object' && y !== null && y.$$typeof === r;
          }
          function E(y) {
            return $(y) === f;
          }
          function P(y) {
            return $(y) === t;
          }
          function w(y) {
            return $(y) === b;
          }
          function C(y) {
            return $(y) === v;
          }
          function M(y) {
            return $(y) === n;
          }
          function D(y) {
            return $(y) === a;
          }
          function I(y) {
            return $(y) === o;
          }
          function Z(y) {
            return $(y) === p;
          }
          (V.AsyncMode = m),
            (V.ConcurrentMode = X),
            (V.ContextConsumer = ne),
            (V.ContextProvider = le),
            (V.Element = ae),
            (V.ForwardRef = B),
            (V.Fragment = Y),
            (V.Lazy = ue),
            (V.Memo = se),
            (V.Portal = J),
            (V.Profiler = de),
            (V.StrictMode = ee),
            (V.Suspense = pe),
            (V.isAsyncMode = Te),
            (V.isConcurrentMode = g),
            (V.isContextConsumer = x),
            (V.isContextProvider = O),
            (V.isElement = T),
            (V.isForwardRef = E),
            (V.isFragment = P),
            (V.isLazy = w),
            (V.isMemo = C),
            (V.isPortal = M),
            (V.isProfiler = D),
            (V.isStrictMode = I),
            (V.isSuspense = Z),
            (V.isValidElementType = j),
            (V.typeOf = $);
        })()),
    V
  );
}
var zr;
function wn() {
  return (
    zr ||
      ((zr = 1), process.env.NODE_ENV === 'production' ? (qe.exports = st()) : (qe.exports = it())),
    qe.exports
  );
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var ar, Vr;
function ct() {
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
    (ar = o()
      ? Object.assign
      : function (a, s) {
          for (var c, u = t(a), i, f = 1; f < arguments.length; f++) {
            c = Object(arguments[f]);
            for (var p in c) r.call(c, p) && (u[p] = c[p]);
            if (e) {
              i = e(c);
              for (var l = 0; l < i.length; l++) n.call(c, i[l]) && (u[i[l]] = c[i[l]]);
            }
          }
          return u;
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
function Tn() {
  return Fr || ((Fr = 1), (ir = Function.call.bind(Object.prototype.hasOwnProperty))), ir;
}
var cr, Hr;
function lt() {
  if (Hr) return cr;
  Hr = 1;
  var e = function () {};
  if (process.env.NODE_ENV !== 'production') {
    var r = yr(),
      n = {},
      t = Tn();
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
          var p;
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
            p = a[f](s, f, u, c, null, r);
          } catch (b) {
            p = b;
          }
          if (
            (p &&
              !(p instanceof Error) &&
              e(
                (u || 'React class') +
                  ': type specification of ' +
                  c +
                  ' `' +
                  f +
                  '` is invalid; the type checker function must return `null` or an `Error` but returned a ' +
                  typeof p +
                  '. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).',
              ),
            p instanceof Error && !(p.message in n))
          ) {
            n[p.message] = !0;
            var v = i ? i() : '';
            e('Failed ' + c + ' type: ' + p.message + (v ?? ''));
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
function ut() {
  if (Ur) return lr;
  Ur = 1;
  var e = wn(),
    r = ct(),
    n = yr(),
    t = Tn(),
    o = lt(),
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
    (lr = function (c, u) {
      var i = typeof Symbol == 'function' && Symbol.iterator,
        f = '@@iterator';
      function p(g) {
        var x = g && ((i && g[i]) || g[f]);
        if (typeof x == 'function') return x;
      }
      var l = '<<anonymous>>',
        v = {
          array: S('array'),
          bigint: S('bigint'),
          bool: S('boolean'),
          func: S('function'),
          number: S('number'),
          object: S('object'),
          string: S('string'),
          symbol: S('symbol'),
          any: W(),
          arrayOf: j,
          element: $(),
          elementType: m(),
          instanceOf: X,
          node: B(),
          objectOf: le,
          oneOf: ne,
          oneOfType: ae,
          shape: ue,
          exact: se,
        };
      function b(g, x) {
        return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
      }
      function h(g, x) {
        (this.message = g), (this.data = x && typeof x == 'object' ? x : {}), (this.stack = '');
      }
      h.prototype = Error.prototype;
      function d(g) {
        if (process.env.NODE_ENV !== 'production')
          var x = {},
            O = 0;
        function T(P, w, C, M, D, I, Z) {
          if (((M = M || l), (I = I || C), Z !== n)) {
            if (u) {
              var y = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((y.name = 'Invariant Violation'), y);
            } else if (process.env.NODE_ENV !== 'production' && typeof console < 'u') {
              var te = M + ':' + C;
              !x[te] &&
                O < 3 &&
                (a(
                  'You are manually calling a React.PropTypes validation function for the `' +
                    I +
                    '` prop on `' +
                    M +
                    '`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.',
                ),
                (x[te] = !0),
                O++);
            }
          }
          return w[C] == null
            ? P
              ? w[C] === null
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
            : g(w, C, M, D, I);
        }
        var E = T.bind(null, !1);
        return (E.isRequired = T.bind(null, !0)), E;
      }
      function S(g) {
        function x(O, T, E, P, w, C) {
          var M = O[T],
            D = ee(M);
          if (D !== g) {
            var I = pe(M);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + I + '` supplied to `' + E + '`, expected ') +
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
      function j(g) {
        function x(O, T, E, P, w) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                w +
                '` of component `' +
                E +
                '` has invalid PropType notation inside arrayOf.',
            );
          var C = O[T];
          if (!Array.isArray(C)) {
            var M = ee(C);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + E + '`, expected an array.'),
            );
          }
          for (var D = 0; D < C.length; D++) {
            var I = g(C, D, E, P, w + '[' + D + ']', n);
            if (I instanceof Error) return I;
          }
          return null;
        }
        return d(x);
      }
      function $() {
        function g(x, O, T, E, P) {
          var w = x[O];
          if (!c(w)) {
            var C = ee(w);
            return new h(
              'Invalid ' +
                E +
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
        function g(x, O, T, E, P) {
          var w = x[O];
          if (!e.isValidElementType(w)) {
            var C = ee(w);
            return new h(
              'Invalid ' +
                E +
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
        function x(O, T, E, P, w) {
          if (!(O[T] instanceof g)) {
            var C = g.name || l,
              M = Te(O[T]);
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + E + '`, expected ') +
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
        function x(O, T, E, P, w) {
          for (var C = O[T], M = 0; M < g.length; M++) if (b(C, g[M])) return null;
          var D = JSON.stringify(g, function (Z, y) {
            var te = pe(y);
            return te === 'symbol' ? String(y) : y;
          });
          return new h(
            'Invalid ' +
              P +
              ' `' +
              w +
              '` of value `' +
              String(C) +
              '` ' +
              ('supplied to `' + E + '`, expected one of ' + D + '.'),
          );
        }
        return d(x);
      }
      function le(g) {
        function x(O, T, E, P, w) {
          if (typeof g != 'function')
            return new h(
              'Property `' +
                w +
                '` of component `' +
                E +
                '` has invalid PropType notation inside objectOf.',
            );
          var C = O[T],
            M = ee(C);
          if (M !== 'object')
            return new h(
              'Invalid ' +
                P +
                ' `' +
                w +
                '` of type ' +
                ('`' + M + '` supplied to `' + E + '`, expected an object.'),
            );
          for (var D in C)
            if (t(C, D)) {
              var I = g(C, D, E, P, w + '.' + D, n);
              if (I instanceof Error) return I;
            }
          return null;
        }
        return d(x);
      }
      function ae(g) {
        if (!Array.isArray(g))
          return (
            process.env.NODE_ENV !== 'production' &&
              a('Invalid argument supplied to oneOfType, expected an instance of array.'),
            s
          );
        for (var x = 0; x < g.length; x++) {
          var O = g[x];
          if (typeof O != 'function')
            return (
              a(
                'Invalid argument supplied to oneOfType. Expected an array of check functions, but received ' +
                  ke(O) +
                  ' at index ' +
                  x +
                  '.',
              ),
              s
            );
        }
        function T(E, P, w, C, M) {
          for (var D = [], I = 0; I < g.length; I++) {
            var Z = g[I],
              y = Z(E, P, w, C, M, n);
            if (y == null) return null;
            y.data && t(y.data, 'expectedType') && D.push(y.data.expectedType);
          }
          var te = D.length > 0 ? ', expected one of type [' + D.join(', ') + ']' : '';
          return new h('Invalid ' + C + ' `' + M + '` supplied to ' + ('`' + w + '`' + te + '.'));
        }
        return d(T);
      }
      function B() {
        function g(x, O, T, E, P) {
          return J(x[O])
            ? null
            : new h(
                'Invalid ' +
                  E +
                  ' `' +
                  P +
                  '` supplied to ' +
                  ('`' + T + '`, expected a ReactNode.'),
              );
        }
        return d(g);
      }
      function Y(g, x, O, T, E) {
        return new h(
          (g || 'React class') +
            ': ' +
            x +
            ' type `' +
            O +
            '.' +
            T +
            '` is invalid; it must be a function, usually from the `prop-types` package, but received `' +
            E +
            '`.',
        );
      }
      function ue(g) {
        function x(O, T, E, P, w) {
          var C = O[T],
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
                ('supplied to `' + E + '`, expected `object`.'),
            );
          for (var D in g) {
            var I = g[D];
            if (typeof I != 'function') return Y(E, P, w, D, pe(I));
            var Z = I(C, D, E, P, w + '.' + D, n);
            if (Z) return Z;
          }
          return null;
        }
        return d(x);
      }
      function se(g) {
        function x(O, T, E, P, w) {
          var C = O[T],
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
                ('supplied to `' + E + '`, expected `object`.'),
            );
          var D = r({}, O[T], g);
          for (var I in D) {
            var Z = g[I];
            if (t(g, I) && typeof Z != 'function') return Y(E, P, w, I, pe(Z));
            if (!Z)
              return new h(
                'Invalid ' +
                  P +
                  ' `' +
                  w +
                  '` key `' +
                  I +
                  '` supplied to `' +
                  E +
                  '`.\nBad object: ' +
                  JSON.stringify(O[T], null, '  ') +
                  `
Valid keys: ` +
                  JSON.stringify(Object.keys(g), null, '  '),
              );
            var y = Z(C, I, E, P, w + '.' + I, n);
            if (y) return y;
          }
          return null;
        }
        return d(x);
      }
      function J(g) {
        switch (typeof g) {
          case 'number':
          case 'string':
          case 'undefined':
            return !0;
          case 'boolean':
            return !g;
          case 'object':
            if (Array.isArray(g)) return g.every(J);
            if (g === null || c(g)) return !0;
            var x = p(g);
            if (x) {
              var O = x.call(g),
                T;
              if (x !== g.entries) {
                for (; !(T = O.next()).done; ) if (!J(T.value)) return !1;
              } else
                for (; !(T = O.next()).done; ) {
                  var E = T.value;
                  if (E && !J(E[1])) return !1;
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
        return !g.constructor || !g.constructor.name ? l : g.constructor.name;
      }
      return (
        (v.checkPropTypes = o), (v.resetWarningCache = o.resetWarningCache), (v.PropTypes = v), v
      );
    }),
    lr
  );
}
var ur, Gr;
function dt() {
  if (Gr) return ur;
  Gr = 1;
  var e = yr();
  function r() {}
  function n() {}
  return (
    (n.resetWarningCache = r),
    (ur = function () {
      function t(s, c, u, i, f, p) {
        if (p !== e) {
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
    ur
  );
}
if (process.env.NODE_ENV !== 'production') {
  var ft = wn(),
    pt = !0;
  pr.exports = ut()(ft.isElement, pt);
} else pr.exports = dt()();
var ht = pr.exports;
const U = at(ht);
function Ie(e) {
  let r = 'https://mui.com/production-error/?code=' + e;
  for (let n = 1; n < arguments.length; n += 1) r += '&args[]=' + encodeURIComponent(arguments[n]);
  return 'Minified MUI error #' + e + '; visit ' + r + ' for the full message.';
}
var hr = { exports: {} },
  L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jr;
function mt() {
  if (Jr) return L;
  Jr = 1;
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
    p = Symbol.for('react.memo'),
    l = Symbol.for('react.lazy'),
    v = Symbol.for('react.offscreen'),
    b;
  b = Symbol.for('react.module.reference');
  function h(d) {
    if (typeof d == 'object' && d !== null) {
      var S = d.$$typeof;
      switch (S) {
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
                case p:
                case a:
                  return d;
                default:
                  return S;
              }
          }
        case r:
          return S;
      }
    }
  }
  return (
    (L.ContextConsumer = s),
    (L.ContextProvider = a),
    (L.Element = e),
    (L.ForwardRef = u),
    (L.Fragment = n),
    (L.Lazy = l),
    (L.Memo = p),
    (L.Portal = r),
    (L.Profiler = o),
    (L.StrictMode = t),
    (L.Suspense = i),
    (L.SuspenseList = f),
    (L.isAsyncMode = function () {
      return !1;
    }),
    (L.isConcurrentMode = function () {
      return !1;
    }),
    (L.isContextConsumer = function (d) {
      return h(d) === s;
    }),
    (L.isContextProvider = function (d) {
      return h(d) === a;
    }),
    (L.isElement = function (d) {
      return typeof d == 'object' && d !== null && d.$$typeof === e;
    }),
    (L.isForwardRef = function (d) {
      return h(d) === u;
    }),
    (L.isFragment = function (d) {
      return h(d) === n;
    }),
    (L.isLazy = function (d) {
      return h(d) === l;
    }),
    (L.isMemo = function (d) {
      return h(d) === p;
    }),
    (L.isPortal = function (d) {
      return h(d) === r;
    }),
    (L.isProfiler = function (d) {
      return h(d) === o;
    }),
    (L.isStrictMode = function (d) {
      return h(d) === t;
    }),
    (L.isSuspense = function (d) {
      return h(d) === i;
    }),
    (L.isSuspenseList = function (d) {
      return h(d) === f;
    }),
    (L.isValidElementType = function (d) {
      return (
        typeof d == 'string' ||
        typeof d == 'function' ||
        d === n ||
        d === o ||
        d === t ||
        d === i ||
        d === f ||
        d === v ||
        (typeof d == 'object' &&
          d !== null &&
          (d.$$typeof === l ||
            d.$$typeof === p ||
            d.$$typeof === a ||
            d.$$typeof === s ||
            d.$$typeof === u ||
            d.$$typeof === b ||
            d.getModuleId !== void 0))
      );
    }),
    (L.typeOf = h),
    L
  );
}
var F = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qr;
function gt() {
  return (
    qr ||
      ((qr = 1),
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
            p = Symbol.for('react.memo'),
            l = Symbol.for('react.lazy'),
            v = Symbol.for('react.offscreen'),
            b = !1,
            h = !1,
            d = !1,
            S = !1,
            W = !1,
            j;
          j = Symbol.for('react.module.reference');
          function $(k) {
            return !!(
              typeof k == 'string' ||
              typeof k == 'function' ||
              k === n ||
              k === o ||
              W ||
              k === t ||
              k === i ||
              k === f ||
              S ||
              k === v ||
              b ||
              h ||
              d ||
              (typeof k == 'object' &&
                k !== null &&
                (k.$$typeof === l ||
                  k.$$typeof === p ||
                  k.$$typeof === a ||
                  k.$$typeof === s ||
                  k.$$typeof === u ||
                  k.$$typeof === j ||
                  k.getModuleId !== void 0))
            );
          }
          function m(k) {
            if (typeof k == 'object' && k !== null) {
              var Ce = k.$$typeof;
              switch (Ce) {
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
                      var Cr = Je && Je.$$typeof;
                      switch (Cr) {
                        case c:
                        case s:
                        case u:
                        case l:
                        case p:
                        case a:
                          return Cr;
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
            ae = u,
            B = n,
            Y = l,
            ue = p,
            se = r,
            J = o,
            de = t,
            ee = i,
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
          function O(k) {
            return m(k) === s;
          }
          function T(k) {
            return m(k) === a;
          }
          function E(k) {
            return typeof k == 'object' && k !== null && k.$$typeof === e;
          }
          function P(k) {
            return m(k) === u;
          }
          function w(k) {
            return m(k) === n;
          }
          function C(k) {
            return m(k) === l;
          }
          function M(k) {
            return m(k) === p;
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
          function y(k) {
            return m(k) === i;
          }
          function te(k) {
            return m(k) === f;
          }
          (F.ContextConsumer = X),
            (F.ContextProvider = ne),
            (F.Element = le),
            (F.ForwardRef = ae),
            (F.Fragment = B),
            (F.Lazy = Y),
            (F.Memo = ue),
            (F.Portal = se),
            (F.Profiler = J),
            (F.StrictMode = de),
            (F.Suspense = ee),
            (F.SuspenseList = pe),
            (F.isAsyncMode = g),
            (F.isConcurrentMode = x),
            (F.isContextConsumer = O),
            (F.isContextProvider = T),
            (F.isElement = E),
            (F.isForwardRef = P),
            (F.isFragment = w),
            (F.isLazy = C),
            (F.isMemo = M),
            (F.isPortal = D),
            (F.isProfiler = I),
            (F.isStrictMode = Z),
            (F.isSuspense = y),
            (F.isSuspenseList = te),
            (F.isValidElementType = $),
            (F.typeOf = m);
        })()),
    F
  );
}
process.env.NODE_ENV === 'production' ? (hr.exports = mt()) : (hr.exports = gt());
var Kr = hr.exports;
const bt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function yt(e) {
  const r = `${e}`.match(bt);
  return (r && r[1]) || '';
}
function Cn(e, r = '') {
  return e.displayName || e.name || yt(e) || r;
}
function Wr(e, r, n) {
  const t = Cn(r);
  return e.displayName || (t !== '' ? `${n}(${t})` : n);
}
function vt(e) {
  if (e != null) {
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return Cn(e, 'Component');
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Kr.ForwardRef:
          return Wr(e, e.render, 'ForwardRef');
        case Kr.Memo:
          return Wr(e, e.type, 'memo');
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
function On(e, r) {
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
                n[t][s] = On(o[s], a[s]);
              }));
      } else n[t] === void 0 && (n[t] = e[t]);
    }),
    n
  );
}
function xt(e, r, n = void 0) {
  const t = {};
  return (
    Object.keys(e).forEach((o) => {
      t[o] = e[o]
        .reduce((a, s) => {
          if (s) {
            const c = r(s);
            c !== '' && a.push(c), n && n[s] && a.push(n[s]);
          }
          return a;
        }, [])
        .join(' ');
    }),
    t
  );
}
const Xr = (e) => e,
  kt = () => {
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
  St = kt(),
  Nt = St,
  Et = {
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
  const t = Et[r];
  return t ? `${n}-${t}` : `${Nt.generate(e)}-${r}`;
}
function wt(e, r, n = 'Mui') {
  const t = {};
  return (
    r.forEach((o) => {
      t[o] = vr(e, o, n);
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
function Tt() {
  for (var e, r, n = 0, t = ''; n < arguments.length; )
    (e = arguments[n++]) && (r = _n(e)) && (t && (t += ' '), (t += r));
  return t;
}
const Ct = ['values', 'unit', 'step'],
  Ot = (e) => {
    const r = Object.keys(e).map((n) => ({ key: n, val: e[n] })) || [];
    return r.sort((n, t) => n.val - t.val), r.reduce((n, t) => A({}, n, { [t.key]: t.val }), {});
  };
function _t(e) {
  const {
      values: r = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: n = 'px',
      step: t = 5,
    } = e,
    o = ye(e, Ct),
    a = Ot(r),
    s = Object.keys(a);
  function c(l) {
    return `@media (min-width:${typeof r[l] == 'number' ? r[l] : l}${n})`;
  }
  function u(l) {
    return `@media (max-width:${(typeof r[l] == 'number' ? r[l] : l) - t / 100}${n})`;
  }
  function i(l, v) {
    const b = s.indexOf(v);
    return `@media (min-width:${typeof r[l] == 'number' ? r[l] : l}${n}) and (max-width:${
      (b !== -1 && typeof r[s[b]] == 'number' ? r[s[b]] : v) - t / 100
    }${n})`;
  }
  function f(l) {
    return s.indexOf(l) + 1 < s.length ? i(l, s[s.indexOf(l) + 1]) : c(l);
  }
  function p(l) {
    const v = s.indexOf(l);
    return v === 0
      ? c(s[1])
      : v === s.length - 1
      ? u(s[v])
      : i(l, s[s.indexOf(l) + 1]).replace('@media', '@media not all and');
  }
  return A({ keys: s, values: a, up: c, down: u, between: i, only: f, not: p, unit: n }, o);
}
const Rt = { borderRadius: 4 },
  $t = Rt,
  At =
    process.env.NODE_ENV !== 'production'
      ? U.oneOfType([U.number, U.string, U.object, U.array])
      : {},
  xe = At;
function Le(e, r) {
  return r ? me(e, r, { clone: !1 }) : e;
}
const xr = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  Yr = { keys: ['xs', 'sm', 'md', 'lg', 'xl'], up: (e) => `@media (min-width:${xr[e]}px)` };
function be(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || Yr;
    return r.reduce((s, c, u) => ((s[a.up(a.keys[u])] = n(r[u])), s), {});
  }
  if (typeof r == 'object') {
    const a = t.breakpoints || Yr;
    return Object.keys(r).reduce((s, c) => {
      if (Object.keys(a.values || xr).indexOf(c) !== -1) {
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
function Pt(e = {}) {
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
function Mt(e, r) {
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
function H(e) {
  const { prop: r, cssProperty: n = e.prop, themeKey: t, transform: o } = e,
    a = (s) => {
      if (s[r] == null) return null;
      const c = s[r],
        u = s.theme,
        i = Ye(u, t) || {};
      return be(s, c, (p) => {
        let l = Xe(i, o, p);
        return (
          p === l &&
            typeof p == 'string' &&
            (l = Xe(i, o, `${r}${p === 'default' ? '' : ge(p)}`, p)),
          n === !1 ? l : { [n]: l }
        );
      });
    };
  return (
    (a.propTypes = process.env.NODE_ENV !== 'production' ? { [r]: xe } : {}),
    (a.filterProps = [r]),
    a
  );
}
function It(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const jt = { m: 'margin', p: 'padding' },
  Bt = { t: 'Top', r: 'Right', b: 'Bottom', l: 'Left', x: ['Left', 'Right'], y: ['Top', 'Bottom'] },
  Zr = { marginX: 'mx', marginY: 'my', paddingX: 'px', paddingY: 'py' },
  Dt = It((e) => {
    if (e.length > 2)
      if (Zr[e]) e = Zr[e];
      else return [e];
    const [r, n] = e.split(''),
      t = jt[r],
      o = Bt[n] || '';
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
  zt = [...Ze, ...Qe];
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
function Rn(e) {
  return Ue(e, 'spacing', 8, 'spacing');
}
function Ge(e, r) {
  if (typeof r == 'string' || r == null) return r;
  const n = Math.abs(r),
    t = e(n);
  return r >= 0 ? t : typeof t == 'number' ? -t : `-${t}`;
}
function Vt(e, r) {
  return (n) => e.reduce((t, o) => ((t[o] = Ge(r, n)), t), {});
}
function Lt(e, r, n, t) {
  if (r.indexOf(n) === -1) return null;
  const o = Dt(n),
    a = Vt(o, t),
    s = e[n];
  return be(e, s, a);
}
function $n(e, r) {
  const n = Rn(e.theme);
  return Object.keys(e)
    .map((t) => Lt(e, r, t, n))
    .reduce(Le, {});
}
function q(e) {
  return $n(e, Ze);
}
q.propTypes =
  process.env.NODE_ENV !== 'production' ? Ze.reduce((e, r) => ((e[r] = xe), e), {}) : {};
q.filterProps = Ze;
function K(e) {
  return $n(e, Qe);
}
K.propTypes =
  process.env.NODE_ENV !== 'production' ? Qe.reduce((e, r) => ((e[r] = xe), e), {}) : {};
K.filterProps = Qe;
process.env.NODE_ENV !== 'production' && zt.reduce((e, r) => ((e[r] = xe), e), {});
function Ft(e = 8) {
  if (e.mui) return e;
  const r = Rn({ spacing: e }),
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
const Ht = H({ prop: 'border', themeKey: 'borders', transform: fe }),
  Ut = H({ prop: 'borderTop', themeKey: 'borders', transform: fe }),
  Gt = H({ prop: 'borderRight', themeKey: 'borders', transform: fe }),
  Jt = H({ prop: 'borderBottom', themeKey: 'borders', transform: fe }),
  qt = H({ prop: 'borderLeft', themeKey: 'borders', transform: fe }),
  Kt = H({ prop: 'borderColor', themeKey: 'palette' }),
  Wt = H({ prop: 'borderTopColor', themeKey: 'palette' }),
  Xt = H({ prop: 'borderRightColor', themeKey: 'palette' }),
  Yt = H({ prop: 'borderBottomColor', themeKey: 'palette' }),
  Zt = H({ prop: 'borderLeftColor', themeKey: 'palette' }),
  rr = (e) => {
    if (e.borderRadius !== void 0 && e.borderRadius !== null) {
      const r = Ue(e.theme, 'shape.borderRadius', 4, 'borderRadius'),
        n = (t) => ({ borderRadius: Ge(r, t) });
      return be(e, e.borderRadius, n);
    }
    return null;
  };
rr.propTypes = process.env.NODE_ENV !== 'production' ? { borderRadius: xe } : {};
rr.filterProps = ['borderRadius'];
er(Ht, Ut, Gt, Jt, qt, Kt, Wt, Xt, Yt, Zt, rr);
const nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'gap'),
      n = (t) => ({ gap: Ge(r, t) });
    return be(e, e.gap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== 'production' ? { gap: xe } : {};
nr.filterProps = ['gap'];
const tr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'columnGap'),
      n = (t) => ({ columnGap: Ge(r, t) });
    return be(e, e.columnGap, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== 'production' ? { columnGap: xe } : {};
tr.filterProps = ['columnGap'];
const or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = Ue(e.theme, 'spacing', 8, 'rowGap'),
      n = (t) => ({ rowGap: Ge(r, t) });
    return be(e, e.rowGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: xe } : {};
or.filterProps = ['rowGap'];
const Qt = H({ prop: 'gridColumn' }),
  eo = H({ prop: 'gridRow' }),
  ro = H({ prop: 'gridAutoFlow' }),
  no = H({ prop: 'gridAutoColumns' }),
  to = H({ prop: 'gridAutoRows' }),
  oo = H({ prop: 'gridTemplateColumns' }),
  ao = H({ prop: 'gridTemplateRows' }),
  so = H({ prop: 'gridTemplateAreas' }),
  io = H({ prop: 'gridArea' });
er(nr, tr, or, Qt, eo, ro, no, to, oo, ao, so, io);
function Me(e, r) {
  return r === 'grey' ? r : e;
}
const co = H({ prop: 'color', themeKey: 'palette', transform: Me }),
  lo = H({ prop: 'bgcolor', cssProperty: 'backgroundColor', themeKey: 'palette', transform: Me }),
  uo = H({ prop: 'backgroundColor', themeKey: 'palette', transform: Me });
er(co, lo, uo);
function re(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const fo = H({ prop: 'width', transform: re }),
  kr = (e) => {
    if (e.maxWidth !== void 0 && e.maxWidth !== null) {
      const r = (n) => {
        var t;
        return {
          maxWidth:
            ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null
              ? void 0
              : t[n]) ||
            xr[n] ||
            re(n),
        };
      };
      return be(e, e.maxWidth, r);
    }
    return null;
  };
kr.filterProps = ['maxWidth'];
const po = H({ prop: 'minWidth', transform: re }),
  ho = H({ prop: 'height', transform: re }),
  mo = H({ prop: 'maxHeight', transform: re }),
  go = H({ prop: 'minHeight', transform: re });
H({ prop: 'size', cssProperty: 'width', transform: re });
H({ prop: 'size', cssProperty: 'height', transform: re });
const bo = H({ prop: 'boxSizing' });
er(fo, kr, po, ho, mo, go, bo);
const yo = {
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
    m: { style: q },
    mt: { style: q },
    mr: { style: q },
    mb: { style: q },
    ml: { style: q },
    mx: { style: q },
    my: { style: q },
    margin: { style: q },
    marginTop: { style: q },
    marginRight: { style: q },
    marginBottom: { style: q },
    marginLeft: { style: q },
    marginX: { style: q },
    marginY: { style: q },
    marginInline: { style: q },
    marginInlineStart: { style: q },
    marginInlineEnd: { style: q },
    marginBlock: { style: q },
    marginBlockStart: { style: q },
    marginBlockEnd: { style: q },
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
    maxWidth: { style: kr },
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
  Sr = yo;
function vo(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []),
    n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function xo(e, r) {
  return typeof e == 'function' ? e(r) : e;
}
function ko() {
  function e(n, t, o, a) {
    const s = { [n]: t, theme: o },
      c = a[n];
    if (!c) return { [n]: t };
    const { cssProperty: u = n, themeKey: i, transform: f, style: p } = c;
    if (t == null) return null;
    if (i === 'typography' && t === 'inherit') return { [n]: t };
    const l = Ye(o, i) || {};
    return p
      ? p(s)
      : be(s, t, (b) => {
          let h = Xe(l, f, b);
          return (
            b === h &&
              typeof b == 'string' &&
              (h = Xe(l, f, `${n}${b === 'default' ? '' : ge(b)}`, b)),
            u === !1 ? h : { [u]: h }
          );
        });
  }
  function r(n) {
    var t;
    const { sx: o, theme: a = {} } = n || {};
    if (!o) return null;
    const s = (t = a.unstable_sxConfig) != null ? t : Sr;
    function c(u) {
      let i = u;
      if (typeof u == 'function') i = u(a);
      else if (typeof u != 'object') return u;
      if (!i) return null;
      const f = Pt(a.breakpoints),
        p = Object.keys(f);
      let l = f;
      return (
        Object.keys(i).forEach((v) => {
          const b = xo(i[v], a);
          if (b != null)
            if (typeof b == 'object')
              if (s[v]) l = Le(l, e(v, b, a, s));
              else {
                const h = be({ theme: a }, b, (d) => ({ [v]: d }));
                vo(h, b) ? (l[v] = r({ sx: b, theme: a })) : (l = Le(l, h));
              }
            else l = Le(l, e(v, b, a, s));
        }),
        Mt(p, l)
      );
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return r;
}
const An = ko();
An.filterProps = ['sx'];
const Nr = An,
  So = ['breakpoints', 'palette', 'spacing', 'shape'];
function Er(e = {}, ...r) {
  const { breakpoints: n = {}, palette: t = {}, spacing: o, shape: a = {} } = e,
    s = ye(e, So),
    c = _t(n),
    u = Ft(o);
  let i = me(
    {
      breakpoints: c,
      direction: 'ltr',
      components: {},
      palette: A({ mode: 'light' }, t),
      spacing: u,
      shape: A({}, $t, a),
    },
    s,
  );
  return (
    (i = r.reduce((f, p) => me(f, p), i)),
    (i.unstable_sxConfig = A({}, Sr, s == null ? void 0 : s.unstable_sxConfig)),
    (i.unstable_sx = function (p) {
      return Nr({ sx: p, theme: this });
    }),
    i
  );
}
function No(e) {
  return Object.keys(e).length === 0;
}
function Eo(e = null) {
  const r = Fe.useContext(fr.ThemeContext);
  return !r || No(r) ? e : r;
}
const wo = Er();
function To(e = wo) {
  return Eo(e);
}
const Co = ['variant'];
function Qr(e) {
  return e.length === 0;
}
function Pn(e) {
  const { variant: r } = e,
    n = ye(e, Co);
  let t = r || '';
  return (
    Object.keys(n)
      .sort()
      .forEach((o) => {
        o === 'color'
          ? (t += Qr(t) ? e[o] : ge(e[o]))
          : (t += `${Qr(t) ? o : ge(o)}${ge(e[o].toString())}`);
      }),
    t
  );
}
const Oo = ['name', 'slot', 'skipVariantsResolver', 'skipSx', 'overridesResolver'];
function _o(e) {
  return Object.keys(e).length === 0;
}
function Ro(e) {
  return typeof e == 'string' && e.charCodeAt(0) > 96;
}
const $o = (e, r) =>
    r.components && r.components[e] && r.components[e].styleOverrides
      ? r.components[e].styleOverrides
      : null,
  Ao = (e, r) => {
    let n = [];
    r &&
      r.components &&
      r.components[e] &&
      r.components[e].variants &&
      (n = r.components[e].variants);
    const t = {};
    return (
      n.forEach((o) => {
        const a = Pn(o.props);
        t[a] = o.style;
      }),
      t
    );
  },
  Po = (e, r, n, t) => {
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
            i && s.push(r[Pn(u.props)]);
        }),
      s
    );
  };
function Ke(e) {
  return e !== 'ownerState' && e !== 'theme' && e !== 'sx' && e !== 'as';
}
const Mo = Er(),
  Io = (e) => e.charAt(0).toLowerCase() + e.slice(1);
function ze({ defaultTheme: e, theme: r, themeId: n }) {
  return _o(r) ? e : r[n] || r;
}
function jo(e = {}) {
  const {
      themeId: r,
      defaultTheme: n = Mo,
      rootShouldForwardProp: t = Ke,
      slotShouldForwardProp: o = Ke,
    } = e,
    a = (s) => Nr(A({}, s, { theme: ze(A({}, s, { defaultTheme: n, themeId: r })) }));
  return (
    (a.__mui_systemSx = !0),
    (s, c = {}) => {
      fr.internal_processStyles(s, ($) => $.filter((m) => !(m != null && m.__mui_systemSx)));
      const { name: u, slot: i, skipVariantsResolver: f, skipSx: p, overridesResolver: l } = c,
        v = ye(c, Oo),
        b = f !== void 0 ? f : (i && i !== 'Root') || !1,
        h = p || !1;
      let d;
      process.env.NODE_ENV !== 'production' && u && (d = `${u}-${Io(i || 'Root')}`);
      let S = Ke;
      i === 'Root' ? (S = t) : i ? (S = o) : Ro(s) && (S = void 0);
      const W = fr(s, A({ shouldForwardProp: S, label: d }, v)),
        j = ($, ...m) => {
          const X = m
            ? m.map((B) =>
                typeof B == 'function' && B.__emotion_real !== B
                  ? (Y) => B(A({}, Y, { theme: ze(A({}, Y, { defaultTheme: n, themeId: r })) }))
                  : B,
              )
            : [];
          let ne = $;
          u &&
            l &&
            X.push((B) => {
              const Y = ze(A({}, B, { defaultTheme: n, themeId: r })),
                ue = $o(u, Y);
              if (ue) {
                const se = {};
                return (
                  Object.entries(ue).forEach(([J, de]) => {
                    se[J] = typeof de == 'function' ? de(A({}, B, { theme: Y })) : de;
                  }),
                  l(B, se)
                );
              }
              return null;
            }),
            u &&
              !b &&
              X.push((B) => {
                const Y = ze(A({}, B, { defaultTheme: n, themeId: r }));
                return Po(B, Ao(u, Y), Y, u);
              }),
            h || X.push(a);
          const le = X.length - m.length;
          if (Array.isArray($) && le > 0) {
            const B = new Array(le).fill('');
            (ne = [...$, ...B]), (ne.raw = [...$.raw, ...B]);
          } else
            typeof $ == 'function' &&
              $.__emotion_real !== $ &&
              (ne = (B) => $(A({}, B, { theme: ze(A({}, B, { defaultTheme: n, themeId: r })) })));
          const ae = W(ne, ...X);
          if (process.env.NODE_ENV !== 'production') {
            let B;
            u && (B = `${u}${i || ''}`),
              B === void 0 && (B = `Styled(${vt(s)})`),
              (ae.displayName = B);
          }
          return s.muiName && (ae.muiName = s.muiName), ae;
        };
      return W.withConfig && (j.withConfig = W.withConfig), j;
    }
  );
}
function Bo(e) {
  const { theme: r, name: n, props: t } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps
    ? t
    : On(r.components[n].defaultProps, t);
}
function Do({ props: e, name: r, defaultTheme: n, themeId: t }) {
  let o = To(n);
  return t && (o = o[t] || o), Bo({ theme: o, name: r, props: e });
}
function Mn(e, r = 0, n = 1) {
  return (
    process.env.NODE_ENV !== 'production' &&
      (e < r || e > n) &&
      console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`),
    Math.min(Math.max(r, e), n)
  );
}
function zo(e) {
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
  if (e.charAt(0) === '#') return je(zo(e));
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
function Vo(e) {
  e = je(e);
  const { values: r } = e,
    n = r[0],
    t = r[1] / 100,
    o = r[2] / 100,
    a = t * Math.min(o, 1 - o),
    s = (i, f = (i + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let c = 'rgb';
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === 'hsla' && ((c += 'a'), u.push(r[3])), wr({ type: c, values: u });
}
function en(e) {
  e = je(e);
  let r = e.type === 'hsl' || e.type === 'hsla' ? je(Vo(e)).values : e.values;
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
function Lo(e, r) {
  if (((e = je(e)), (r = Mn(r)), e.type.indexOf('hsl') !== -1)) e.values[2] *= 1 - r;
  else if (e.type.indexOf('rgb') !== -1 || e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - r;
  return wr(e);
}
function Fo(e, r) {
  if (((e = je(e)), (r = Mn(r)), e.type.indexOf('hsl') !== -1))
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf('rgb') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf('color') !== -1)
    for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * r;
  return wr(e);
}
function Ho(e, r) {
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
const Uo = { black: '#000', white: '#fff' },
  He = Uo,
  Go = {
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
  Jo = Go,
  qo = {
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
  Oe = qo,
  Ko = {
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
  _e = Ko,
  Wo = {
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
  Ve = Wo,
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
  Re = Xo,
  Yo = {
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
  $e = Yo,
  Zo = {
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
  Ae = Zo,
  Qo = ['mode', 'contrastThreshold', 'tonalOffset'],
  nn = {
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
function tn(e, r, n, t) {
  const o = t.light || t,
    a = t.dark || t * 1.5;
  e[r] ||
    (e.hasOwnProperty(n)
      ? (e[r] = e[n])
      : r === 'light'
      ? (e.light = Fo(e.main, o))
      : r === 'dark' && (e.dark = Lo(e.main, a)));
}
function ea(e = 'light') {
  return e === 'dark'
    ? { main: Re[200], light: Re[50], dark: Re[400] }
    : { main: Re[700], light: Re[400], dark: Re[800] };
}
function ra(e = 'light') {
  return e === 'dark'
    ? { main: Oe[200], light: Oe[50], dark: Oe[400] }
    : { main: Oe[500], light: Oe[300], dark: Oe[700] };
}
function na(e = 'light') {
  return e === 'dark'
    ? { main: _e[500], light: _e[300], dark: _e[700] }
    : { main: _e[700], light: _e[400], dark: _e[800] };
}
function ta(e = 'light') {
  return e === 'dark'
    ? { main: $e[400], light: $e[300], dark: $e[700] }
    : { main: $e[700], light: $e[500], dark: $e[900] };
}
function oa(e = 'light') {
  return e === 'dark'
    ? { main: Ae[400], light: Ae[300], dark: Ae[700] }
    : { main: Ae[800], light: Ae[500], dark: Ae[900] };
}
function aa(e = 'light') {
  return e === 'dark'
    ? { main: Ve[400], light: Ve[300], dark: Ve[700] }
    : { main: '#ed6c02', light: Ve[500], dark: Ve[900] };
}
function sa(e) {
  const { mode: r = 'light', contrastThreshold: n = 3, tonalOffset: t = 0.2 } = e,
    o = ye(e, Qo),
    a = e.primary || ea(r),
    s = e.secondary || ra(r),
    c = e.error || na(r),
    u = e.info || ta(r),
    i = e.success || oa(r),
    f = e.warning || aa(r);
  function p(h) {
    const d = rn(h, dr.text.primary) >= n ? dr.text.primary : nn.text.primary;
    if (process.env.NODE_ENV !== 'production') {
      const S = rn(h, d);
      S < 3 &&
        console.error(
          [
            `MUI: The contrast ratio of ${S}:1 for ${d} on ${h}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join(`
`),
        );
    }
    return d;
  }
  const l = ({
      color: h,
      name: d,
      mainShade: S = 500,
      lightShade: W = 300,
      darkShade: j = 700,
    }) => {
      if (((h = A({}, h)), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty('main')))
        throw new Error(
          process.env.NODE_ENV !== 'production'
            ? `MUI: The color${d ? ` (${d})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`
            : Ie(11, d ? ` (${d})` : '', S),
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
        tn(h, 'light', W, t), tn(h, 'dark', j, t), h.contrastText || (h.contrastText = p(h.main)), h
      );
    },
    v = { dark: dr, light: nn };
  return (
    process.env.NODE_ENV !== 'production' &&
      (v[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)),
    me(
      A(
        {
          common: A({}, He),
          mode: r,
          primary: l({ color: a, name: 'primary' }),
          secondary: l({
            color: s,
            name: 'secondary',
            mainShade: 'A400',
            lightShade: 'A200',
            darkShade: 'A700',
          }),
          error: l({ color: c, name: 'error' }),
          warning: l({ color: f, name: 'warning' }),
          info: l({ color: u, name: 'info' }),
          success: l({ color: i, name: 'success' }),
          grey: Jo,
          contrastThreshold: n,
          getContrastText: p,
          augmentColor: l,
          tonalOffset: t,
        },
        v[r],
      ),
      o,
    )
  );
}
const ia = [
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
function ca(e) {
  return Math.round(e * 1e5) / 1e5;
}
const on = { textTransform: 'uppercase' },
  an = '"Roboto", "Helvetica", "Arial", sans-serif';
function la(e, r) {
  const n = typeof r == 'function' ? r(e) : r,
    {
      fontFamily: t = an,
      fontSize: o = 14,
      fontWeightLight: a = 300,
      fontWeightRegular: s = 400,
      fontWeightMedium: c = 500,
      fontWeightBold: u = 700,
      htmlFontSize: i = 16,
      allVariants: f,
      pxToRem: p,
    } = n,
    l = ye(n, ia);
  process.env.NODE_ENV !== 'production' &&
    (typeof o != 'number' && console.error('MUI: `fontSize` is required to be a number.'),
    typeof i != 'number' && console.error('MUI: `htmlFontSize` is required to be a number.'));
  const v = o / 14,
    b = p || ((S) => `${(S / i) * v}rem`),
    h = (S, W, j, $, m) =>
      A(
        { fontFamily: t, fontWeight: S, fontSize: b(W), lineHeight: j },
        t === an ? { letterSpacing: `${ca($ / W)}em` } : {},
        m,
        f,
      ),
    d = {
      h1: h(a, 96, 1.167, -1.5),
      h2: h(a, 60, 1.2, -0.5),
      h3: h(s, 48, 1.167, 0),
      h4: h(s, 34, 1.235, 0.25),
      h5: h(s, 24, 1.334, 0),
      h6: h(c, 20, 1.6, 0.15),
      subtitle1: h(s, 16, 1.75, 0.15),
      subtitle2: h(c, 14, 1.57, 0.1),
      body1: h(s, 16, 1.5, 0.15),
      body2: h(s, 14, 1.43, 0.15),
      button: h(c, 14, 1.75, 0.4, on),
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
  return me(
    A(
      {
        htmlFontSize: i,
        pxToRem: b,
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
    { clone: !1 },
  );
}
const ua = 0.2,
  da = 0.14,
  fa = 0.12;
function G(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ua})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${da})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${fa})`,
  ].join(',');
}
const pa = [
    'none',
    G(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
    G(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
    G(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
    G(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    G(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    G(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    G(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    G(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    G(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    G(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    G(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    G(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    G(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    G(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    G(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    G(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    G(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    G(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    G(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    G(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    G(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    G(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    G(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    G(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
  ],
  ha = pa,
  ma = ['duration', 'easing', 'delay'],
  ga = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  ba = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  };
function sn(e) {
  return `${Math.round(e)}ms`;
}
function ya(e) {
  if (!e) return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function va(e) {
  const r = A({}, ga, e.easing),
    n = A({}, ba, e.duration);
  return A(
    {
      getAutoHeightDuration: ya,
      create: (o = ['all'], a = {}) => {
        const { duration: s = n.standard, easing: c = r.easeInOut, delay: u = 0 } = a,
          i = ye(a, ma);
        if (process.env.NODE_ENV !== 'production') {
          const f = (l) => typeof l == 'string',
            p = (l) => !isNaN(parseFloat(l));
          !f(o) &&
            !Array.isArray(o) &&
            console.error('MUI: Argument "props" must be a string or Array.'),
            !p(s) &&
              !f(s) &&
              console.error(
                `MUI: Argument "duration" must be a number or a string but found ${s}.`,
              ),
            f(c) || console.error('MUI: Argument "easing" must be a string.'),
            !p(u) && !f(u) && console.error('MUI: Argument "delay" must be a number or a string.'),
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
              `${f} ${typeof s == 'string' ? s : sn(s)} ${c} ${typeof u == 'string' ? u : sn(u)}`,
          )
          .join(',');
      },
    },
    e,
    { easing: r, duration: n },
  );
}
const xa = {
    mobileStepper: 1e3,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  ka = xa,
  Sa = ['breakpoints', 'mixins', 'spacing', 'palette', 'transitions', 'typography', 'shape'];
function Na(e = {}, ...r) {
  const { mixins: n = {}, palette: t = {}, transitions: o = {}, typography: a = {} } = e,
    s = ye(e, Sa);
  if (e.vars)
    throw new Error(
      process.env.NODE_ENV !== 'production'
        ? 'MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.'
        : Ie(18),
    );
  const c = sa(t),
    u = Er(e);
  let i = me(u, {
    mixins: Ho(u.breakpoints, n),
    palette: c,
    shadows: ha.slice(),
    typography: la(c, a),
    transitions: va(o),
    zIndex: A({}, ka),
  });
  if (
    ((i = me(i, s)), (i = r.reduce((f, p) => me(f, p), i)), process.env.NODE_ENV !== 'production')
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
      p = (l, v) => {
        let b;
        for (b in l) {
          const h = l[b];
          if (f.indexOf(b) !== -1 && Object.keys(h).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
              const d = vr('', b);
              console.error(
                [
                  `MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`,
                  'You can not override it like this: ',
                  JSON.stringify(l, null, 2),
                  '',
                  `Instead, you need to use the '&.${d}' syntax:`,
                  JSON.stringify({ root: { [`&.${d}`]: h } }, null, 2),
                  '',
                  'https://mui.com/r/state-classes-guide',
                ].join(`
`),
              );
            }
            l[b] = {};
          }
        }
      };
    Object.keys(i.components).forEach((l) => {
      const v = i.components[l].styleOverrides;
      v && l.indexOf('Mui') === 0 && p(v, l);
    });
  }
  return (
    (i.unstable_sxConfig = A({}, Sr, s == null ? void 0 : s.unstable_sxConfig)),
    (i.unstable_sx = function (p) {
      return Nr({ sx: p, theme: this });
    }),
    i
  );
}
const Ea = Na(),
  In = Ea,
  jn = '$$material';
function wa({ props: e, name: r }) {
  return Do({ props: e, name: r, defaultTheme: In, themeId: jn });
}
const Ta = (e) => Ke(e) && e !== 'classes',
  Ca = jo({ themeId: jn, defaultTheme: In, rootShouldForwardProp: Ta }),
  Oa = Ca;
function _a(e) {
  return vr('MuiSvgIcon', e);
}
wt('MuiSvgIcon', [
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
const Ra = [
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
  $a = (e) => {
    const { color: r, fontSize: n, classes: t } = e,
      o = { root: ['root', r !== 'inherit' && `color${ge(r)}`, `fontSize${ge(n)}`] };
    return xt(o, _a, t);
  },
  Aa = Oa('svg', {
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
    var n, t, o, a, s, c, u, i, f, p, l, v, b;
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
          ((c = e.typography) == null || (u = c.pxToRem) == null ? void 0 : u.call(c, 24)) ||
          '1.5rem',
        large:
          ((i = e.typography) == null || (f = i.pxToRem) == null ? void 0 : f.call(i, 35)) ||
          '2.1875rem',
      }[r.fontSize],
      color:
        (p = (l = (e.vars || e).palette) == null || (l = l[r.color]) == null ? void 0 : l.main) !=
        null
          ? p
          : {
              action:
                (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
              disabled:
                (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
              inherit: void 0,
            }[r.color],
    };
  }),
  Tr = Fe.forwardRef(function (r, n) {
    const t = wa({ props: r, name: 'MuiSvgIcon' }),
      {
        children: o,
        className: a,
        color: s = 'inherit',
        component: c = 'svg',
        fontSize: u = 'medium',
        htmlColor: i,
        inheritViewBox: f = !1,
        titleAccess: p,
        viewBox: l = '0 0 24 24',
      } = t,
      v = ye(t, Ra),
      b = Fe.isValidElement(o) && o.type === 'svg',
      h = A({}, t, {
        color: s,
        component: c,
        fontSize: u,
        instanceFontSize: r.fontSize,
        inheritViewBox: f,
        viewBox: l,
        hasSvgAsChild: b,
      }),
      d = {};
    f || (d.viewBox = l);
    const S = $a(h);
    return N.jsxs(
      Aa,
      A(
        {
          as: c,
          className: Tt(S.root, a),
          focusable: 'false',
          color: i,
          'aria-hidden': p ? void 0 : !0,
          role: p ? 'img' : void 0,
          ref: n,
        },
        d,
        v,
        b && o.props,
        {
          ownerState: h,
          children: [b ? o.props.children : o, p ? N.jsx('title', { children: p }) : null],
        },
      ),
    );
  });
process.env.NODE_ENV !== 'production' &&
  (Tr.propTypes = {
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
Tr.muiName = 'SvgIcon';
const cn = Tr;
function Pa(e, r) {
  function n(t, o) {
    return N.jsx(cn, A({ 'data-testid': `${r}Icon`, ref: o }, t, { children: e }));
  }
  return (
    process.env.NODE_ENV !== 'production' && (n.displayName = `${r}Icon`),
    (n.muiName = cn.muiName),
    Fe.memo(Fe.forwardRef(n))
  );
}
const Ma = Pa(N.jsx('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' }), 'Menu');
function Ia({ menu: e, dataHandler: r, commandHandler: n, className: t, id: o, children: a }) {
  const [s, c] = ie.useState(!1),
    [u, i] = ie.useState(!1),
    f = ie.useCallback(() => {
      s && c(!1), i(!1);
    }, [s]),
    p = ie.useCallback((S) => {
      S.stopPropagation(),
        c((W) => {
          const j = !W;
          return j && S.shiftKey && i(!0), j;
        });
    }, []),
    l = ie.useRef(null),
    [v, b] = ie.useState(0);
  ie.useEffect(() => {
    s && l.current && b(l.current.clientHeight);
  }, [s]);
  const h = ie.useCallback((S) => (f(), n(S)), [n, f]);
  let d = e;
  return (
    !d && r && (d = r(u)),
    N.jsx('div', {
      ref: l,
      style: { position: 'relative' },
      children: N.jsx(Q.AppBar, {
        position: 'static',
        id: o,
        children: N.jsxs(Q.Toolbar, {
          className: `papi-toolbar ${t ?? ''}`,
          variant: 'dense',
          children: [
            d
              ? N.jsx(Q.IconButton, {
                  edge: 'start',
                  className: `papi-menuButton ${t ?? ''}`,
                  color: 'inherit',
                  'aria-label': 'open drawer',
                  onClick: p,
                  children: N.jsx(Ma, {}),
                })
              : null,
            a ? N.jsx('div', { className: 'papi-menu-children', children: a }) : null,
            d
              ? N.jsx(Q.Drawer, {
                  className: `papi-menu-drawer ${t ?? ''}`,
                  anchor: 'left',
                  variant: 'persistent',
                  open: s,
                  onClose: f,
                  PaperProps: { className: 'papi-menu-drawer-paper', style: { top: v } },
                  children: N.jsx(fn, { commandHandler: h, columns: d.columns }),
                })
              : null,
          ],
        }),
      }),
    })
  );
}
exports.Button = Se;
exports.Checkbox = ln;
exports.ComboBox = un;
exports.GridMenu = fn;
exports.LabelPosition = Ee;
exports.MenuItem = dn;
exports.RefSelector = Qn;
exports.Slider = et;
exports.Snackbar = rt;
exports.Switch = nt;
exports.Table = ot;
exports.TextField = We;
exports.Toolbar = Ia;
function ja(e, r = 'top') {
  if (!e || typeof document > 'u') return;
  const n = document.head || document.querySelector('head'),
    t = n.querySelector(':first-child'),
    o = document.createElement('style');
  o.appendChild(document.createTextNode(e)),
    r === 'top' && t ? n.insertBefore(o, t) : n.appendChild(o);
}
ja(
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

.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
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
