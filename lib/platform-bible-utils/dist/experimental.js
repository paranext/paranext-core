import { x as a } from "./scripture-util-CtZM3RsL.js";
import { ab as T, ac as V, ad as y, ae as L } from "./scripture-util-CtZM3RsL.js";
import { Canon as N } from "@sillsdev/scripture";
function f(o, e) {
  return (e == null ? void 0 : e.getEndChapter(o)) ?? a(N.bookIdToNumber(o));
}
function c(o, e, r) {
  const t = N.bookIdToNumber(o);
  let n, u = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((m) => {
    const i = N.bookIdToNumber(m);
    (r === "next" ? i > t && i < u : i < t && i > u) && (n = m, u = i);
  }), n;
}
function x(o, e, r) {
  const { book: t, chapterNum: n } = o;
  if (e.includes(t) && n > 1)
    return { book: t, chapterNum: n - 1, verseNum: 1 };
  const u = c(t, e, "previous");
  if (u)
    return {
      book: u,
      chapterNum: Math.max(f(u, r), 1),
      verseNum: 1
    };
}
function h(o, e, r) {
  const { book: t, chapterNum: n } = o;
  if (e.includes(t) && n < f(t, r))
    return { book: t, chapterNum: n + 1, verseNum: 1 };
  const u = c(t, e, "next");
  if (u)
    return { book: u, chapterNum: 1, verseNum: 1 };
}
function g(o, e) {
  const r = c(o.book, e, "previous");
  if (r)
    return { book: r, chapterNum: 1, verseNum: 1 };
}
function E(o, e) {
  const r = c(o.book, e, "next");
  if (r)
    return { book: r, chapterNum: 1, verseNum: 1 };
}
function B(o, e, r) {
  const { book: t, chapterNum: n, verseNum: u } = o;
  if (e === void 0 || e.includes(t)) {
    if (u > 1) return { book: t, chapterNum: n, verseNum: u - 1 };
    if (u === 1 && n === 1) return { book: t, chapterNum: 1, verseNum: 0 };
    if (!r) return { book: t, chapterNum: n, verseNum: 0 };
    if (n > 1) {
      const v = r.getEndVerse(t, n - 1);
      return { book: t, chapterNum: n - 1, verseNum: Math.max(v ?? 1, 1) };
    }
  }
  if (e === void 0) return;
  const i = c(t, e, "previous");
  if (!i) return;
  const s = Math.max(f(i, r), 1), p = r == null ? void 0 : r.getEndVerse(i, s);
  return { book: i, chapterNum: s, verseNum: Math.max(p ?? 1, 1) };
}
function I(o, e, r) {
  const { book: t, chapterNum: n, verseNum: u } = o;
  if (e === void 0 || e.includes(t)) {
    const s = r == null ? void 0 : r.getEndVerse(t, n);
    return s === void 0 || u < s ? { book: t, chapterNum: n, verseNum: u + 1 } : n < f(t, r) ? { book: t, chapterNum: n + 1, verseNum: 1 } : h(o, e ?? [], r);
  }
  const i = c(t, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function P(o, e) {
  return o === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const _ = "navigableProjectIds";
function C(o) {
  return Array.isArray(o) && o.every((e) => typeof e == "string");
}
export {
  T as ALL_BOOK_IDS,
  V as BOOKS_PRESENT_DEFAULT,
  y as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  _ as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  c as findAdjacentPresentBook,
  L as getBookIdsFromBooksPresent,
  E as getNextBookRef,
  h as getNextChapterRef,
  I as getNextVerseRef,
  g as getPreviousBookRef,
  x as getPreviousChapterRef,
  B as getPreviousVerseRef,
  C as isNavigableProjectIds,
  P as resolveReferenceHistoryDirection
};
//# sourceMappingURL=experimental.js.map
