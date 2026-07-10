import { x as h } from "./scripture-util-BiADhCws.js";
import { a9 as V, aa as T, ab as L } from "./scripture-util-BiADhCws.js";
import { Canon as N } from "@sillsdev/scripture";
function f(n, e) {
  return (e == null ? void 0 : e.getEndChapter(n)) ?? h(N.bookIdToNumber(n));
}
function c(n, e, r) {
  const t = N.bookIdToNumber(n);
  let o, u = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((m) => {
    const i = N.bookIdToNumber(m);
    (r === "next" ? i > t && i < u : i < t && i > u) && (o = m, u = i);
  }), o;
}
function d(n, e, r) {
  const { book: t, chapterNum: o } = n;
  if (e.includes(t) && o > 1)
    return { book: t, chapterNum: o - 1, verseNum: 1 };
  const u = c(t, e, "previous");
  if (u)
    return {
      book: u,
      chapterNum: Math.max(f(u, r), 1),
      verseNum: 1
    };
}
function k(n, e, r) {
  const { book: t, chapterNum: o } = n;
  if (e.includes(t) && o < f(t, r))
    return { book: t, chapterNum: o + 1, verseNum: 1 };
  const u = c(t, e, "next");
  if (u)
    return { book: u, chapterNum: 1, verseNum: 1 };
}
function g(n, e) {
  const r = c(n.book, e, "previous");
  if (r)
    return { book: r, chapterNum: 1, verseNum: 1 };
}
function B(n, e) {
  const r = c(n.book, e, "next");
  if (r)
    return { book: r, chapterNum: 1, verseNum: 1 };
}
function C(n, e, r) {
  const { book: t, chapterNum: o, verseNum: u } = n;
  if (e === void 0 || e.includes(t)) {
    if (u > 1) return { book: t, chapterNum: o, verseNum: u - 1 };
    if (u === 1 && o === 1) return { book: t, chapterNum: 1, verseNum: 0 };
    if (!r) return { book: t, chapterNum: o, verseNum: 0 };
    if (o > 1) {
      const v = r.getEndVerse(t, o - 1);
      return { book: t, chapterNum: o - 1, verseNum: Math.max(v ?? 1, 1) };
    }
  }
  if (e === void 0) return;
  const i = c(t, e, "previous");
  if (!i) return;
  const s = Math.max(f(i, r), 1), p = r == null ? void 0 : r.getEndVerse(i, s);
  return { book: i, chapterNum: s, verseNum: Math.max(p ?? 1, 1) };
}
function E(n, e, r) {
  const { book: t, chapterNum: o, verseNum: u } = n;
  if (e === void 0 || e.includes(t)) {
    const s = r == null ? void 0 : r.getEndVerse(t, o);
    return s === void 0 || u < s ? { book: t, chapterNum: o, verseNum: u + 1 } : o < f(t, r) ? { book: t, chapterNum: o + 1, verseNum: 1 } : k(n, e ?? [], r);
  }
  const i = c(t, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function P(n, e) {
  return n === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
export {
  V as BOOKS_PRESENT_DEFAULT,
  T as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  c as findAdjacentPresentBook,
  L as getBookIdsFromBooksPresent,
  B as getNextBookRef,
  k as getNextChapterRef,
  E as getNextVerseRef,
  g as getPreviousBookRef,
  d as getPreviousChapterRef,
  C as getPreviousVerseRef,
  P as resolveReferenceHistoryDirection
};
//# sourceMappingURL=experimental.js.map
