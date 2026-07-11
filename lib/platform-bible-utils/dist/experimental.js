import { x as h } from "./scripture-util-BiADhCws.js";
import { a9 as I, aa as V, ab as T } from "./scripture-util-BiADhCws.js";
import { Canon as f } from "@sillsdev/scripture";
function N(n, r) {
  return (r == null ? void 0 : r.getEndChapter(n)) ?? h(f.bookIdToNumber(n));
}
function c(n, r, t) {
  const e = f.bookIdToNumber(n);
  let o, u = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((m) => {
    const s = f.bookIdToNumber(m);
    (t === "next" ? s > e && s < u : s < e && s > u) && (o = m, u = s);
  }), o;
}
function g(n, r, t) {
  const { book: e, chapterNum: o } = n;
  if (r.includes(e) && o > 1)
    return { book: e, chapterNum: o - 1, verseNum: 1 };
  const u = c(e, r, "previous");
  if (u)
    return {
      book: u,
      chapterNum: Math.max(N(u, t), 1),
      verseNum: 1
    };
}
function k(n, r, t) {
  const { book: e, chapterNum: o } = n;
  if (r.includes(e) && o < N(e, t))
    return { book: e, chapterNum: o + 1, verseNum: 1 };
  const u = c(e, r, "next");
  if (u)
    return { book: u, chapterNum: 1, verseNum: 1 };
}
function d(n, r) {
  const t = c(n.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function B(n, r) {
  const t = c(n.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function C(n, r, t) {
  const { book: e, chapterNum: o, verseNum: u } = n;
  if (r === void 0 || r.includes(e)) {
    if (u > 1) return { book: e, chapterNum: o, verseNum: u - 1 };
    if (u === 1 && o === 1) return { book: e, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: e, chapterNum: o, verseNum: 0 };
    if (o > 1) {
      const v = t.getEndVerse(e, o - 1);
      return { book: e, chapterNum: o - 1, verseNum: Math.max(v ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const s = c(e, r, "previous");
  if (!s) return;
  const i = Math.max(N(s, t), 1), p = t == null ? void 0 : t.getEndVerse(s, i);
  return { book: s, chapterNum: i, verseNum: Math.max(p ?? 1, 1) };
}
function E(n, r, t) {
  const { book: e, chapterNum: o, verseNum: u } = n;
  if (r === void 0 || r.includes(e)) {
    const i = t == null ? void 0 : t.getEndVerse(e, o);
    return i === void 0 || u < i ? { book: e, chapterNum: o, verseNum: u + 1 } : o < N(e, t) ? { book: e, chapterNum: o + 1, verseNum: 1 } : k(n, r ?? [], t);
  }
  const s = c(e, r, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
export {
  I as BOOKS_PRESENT_DEFAULT,
  V as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  c as findAdjacentPresentBook,
  T as getBookIdsFromBooksPresent,
  B as getNextBookRef,
  k as getNextChapterRef,
  E as getNextVerseRef,
  d as getPreviousBookRef,
  g as getPreviousChapterRef,
  C as getPreviousVerseRef
};
//# sourceMappingURL=experimental.js.map
