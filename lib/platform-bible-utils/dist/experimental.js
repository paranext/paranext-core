import { z as d } from "./scripture-util-CIj33un0.js";
import { ae as L, af as O, ag as D, ah as K } from "./scripture-util-CIj33un0.js";
import { Canon as N } from "@sillsdev/scripture";
function m(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? d(N.bookIdToNumber(e));
}
function u(e, r, t) {
  const o = N.bookIdToNumber(e);
  let n, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((f) => {
    const s = N.bookIdToNumber(f);
    (t === "next" ? s > o && s < i : s < o && s > i) && (n = f, i = s);
  }), n;
}
function v(e, r, t) {
  const { book: o, chapterNum: n } = e;
  if (r.includes(o) && n > 1)
    return { book: o, chapterNum: n - 1, verseNum: 1 };
  const i = u(o, r, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(m(i, t), 1),
      verseNum: 1
    };
}
function k(e, r, t) {
  const { book: o, chapterNum: n } = e;
  if (r.includes(o) && n < m(o, t))
    return { book: o, chapterNum: n + 1, verseNum: 1 };
  const i = u(o, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function S(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function E(e, r) {
  const t = u(e.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function a(e, r, t) {
  const { book: o, chapterNum: n, verseNum: i } = e;
  if (r === void 0 || r.includes(o)) {
    if (i > 1) return { book: o, chapterNum: n, verseNum: i - 1 };
    if (i === 1 && n === 1) return { book: o, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: o, chapterNum: n, verseNum: 0 };
    if (n > 1) {
      const h = t.getEndVerse(o, n - 1);
      return { book: o, chapterNum: n - 1, verseNum: Math.max(h ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const s = u(o, r, "previous");
  if (!s) return;
  const c = Math.max(m(s, t), 1), p = t == null ? void 0 : t.getEndVerse(s, c);
  return { book: s, chapterNum: c, verseNum: Math.max(p ?? 1, 1) };
}
function _(e, r, t) {
  const { book: o, chapterNum: n, verseNum: i } = e;
  if (r === void 0 || r.includes(o)) {
    const c = t == null ? void 0 : t.getEndVerse(o, n);
    return c === void 0 || i < c ? { book: o, chapterNum: n, verseNum: i + 1 } : n < m(o, t) ? { book: o, chapterNum: n + 1, verseNum: 1 } : k(e, r ?? [], t);
  }
  const s = u(o, r, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function A(e, r) {
  return e === (r === "rtl" ? "left" : "right") ? "forward" : "back";
}
const C = "navigableProjectIds";
function x(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "string");
}
function T(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : !("projectIds" in e) || e.projectIds === void 0 || e.projectIds === null ? !0 : Array.isArray(e.projectIds) && e.projectIds.every((r) => typeof r == "string");
}
const y = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([])
});
function j(e) {
  return e === void 0 ? y : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : []
  };
}
const B = 3e4;
function P(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
export {
  L as ALL_BOOK_IDS,
  O as BOOKS_PRESENT_DEFAULT,
  D as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  y as IDLE_SYNC_ACTIVITY,
  C as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  B as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  u as findAdjacentPresentBook,
  K as getBookIdsFromBooksPresent,
  E as getNextBookRef,
  k as getNextChapterRef,
  _ as getNextVerseRef,
  S as getPreviousBookRef,
  v as getPreviousChapterRef,
  a as getPreviousVerseRef,
  x as isNavigableProjectIds,
  T as isSyncActivitySnapshot,
  A as resolveReferenceHistoryDirection,
  P as shouldRecheckSyncActivity,
  j as toSyncActivity
};
//# sourceMappingURL=experimental.js.map
