import { w as h } from "./scripture-util-CbNDIqV0.js";
import { a8 as I, a9 as V, aa as T } from "./scripture-util-CbNDIqV0.js";
import { Canon as N } from "@sillsdev/scripture";
function f(n, e) {
  return (e == null ? void 0 : e.getEndChapter(n)) ?? h(N.bookIdToNumber(n));
}
function c(n, e, r) {
  const t = N.bookIdToNumber(n);
  let o, u = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((m) => {
    const s = N.bookIdToNumber(m);
    (r === "next" ? s > t && s < u : s < t && s > u) && (o = m, u = s);
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
  const s = c(t, e, "previous");
  if (!s) return;
  const i = Math.max(f(s, r), 1), p = r == null ? void 0 : r.getEndVerse(s, i);
  return { book: s, chapterNum: i, verseNum: Math.max(p ?? 1, 1) };
}
function E(n, e, r) {
  const { book: t, chapterNum: o, verseNum: u } = n;
  if (e === void 0 || e.includes(t)) {
    const i = r == null ? void 0 : r.getEndVerse(t, o);
    return i === void 0 || u < i ? { book: t, chapterNum: o, verseNum: u + 1 } : k(n, e ?? [], r);
  }
  const s = c(t, e, "next");
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
  g as getPreviousBookRef,
  d as getPreviousChapterRef,
  C as getPreviousVerseRef
};
//# sourceMappingURL=experimental.js.map
