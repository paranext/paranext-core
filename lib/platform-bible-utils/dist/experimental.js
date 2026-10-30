import { z as g } from "./scripture-util-Bjt1HtZv.js";
import { ae as z, af as K, ag as Y, ah as b } from "./scripture-util-Bjt1HtZv.js";
import { Canon as m } from "@sillsdev/scripture";
function N(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? g(m.bookIdToNumber(e));
}
function u(e, r, t) {
  const n = m.bookIdToNumber(e);
  let o, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((f) => {
    const s = m.bookIdToNumber(f);
    (t === "next" ? s > n && s < i : s < n && s > i) && (o = f, i = s);
  }), o;
}
function E(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o > 1)
    return { book: n, chapterNum: o - 1, verseNum: 1 };
  const i = u(n, r, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(N(i, t), 1),
      verseNum: 1
    };
}
function y(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o < N(n, t))
    return { book: n, chapterNum: o + 1, verseNum: 1 };
  const i = u(n, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function j(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function P(e, r) {
  const t = u(e.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function _(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    if (i > 1) return { book: n, chapterNum: o, verseNum: i - 1 };
    if (i === 1 && o === 1) return { book: n, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: n, chapterNum: o, verseNum: 0 };
    if (o > 1) {
      const I = t.getEndVerse(n, o - 1);
      return { book: n, chapterNum: o - 1, verseNum: Math.max(I ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const s = u(n, r, "previous");
  if (!s) return;
  const c = Math.max(N(s, t), 1), d = t == null ? void 0 : t.getEndVerse(s, c);
  return { book: s, chapterNum: c, verseNum: Math.max(d ?? 1, 1) };
}
function A(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    const c = t == null ? void 0 : t.getEndVerse(n, o);
    return c === void 0 || i < c ? { book: n, chapterNum: o, verseNum: i + 1 } : o < N(n, t) ? { book: n, chapterNum: o + 1, verseNum: 1 } : y(e, r ?? [], t);
  }
  const s = u(n, r, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function v(e, r) {
  return e === (r === "rtl" ? "left" : "right") ? "forward" : "back";
}
const C = "navigableProjectIds";
function x(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "string");
}
function T(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : p("projectIds" in e ? e.projectIds : void 0) && p("resourceIds" in e ? e.resourceIds : void 0);
}
function p(e) {
  return e == null ? !0 : Array.isArray(e) && e.every((r) => typeof r == "string");
}
const h = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function B(e) {
  return e === void 0 ? h : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : [],
    resourceIds: e.isSyncing ? e.resourceIds ?? [] : []
  };
}
const O = 3e4;
function R(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
function L(e) {
  return typeof e != "object" || !e ? !1 : !("waitingProjectIds" in e) || e.waitingProjectIds === void 0 || // The wire may send null for an absent list, so null has to be compared against
  // eslint-disable-next-line no-null/no-null
  e.waitingProjectIds === null ? !0 : Array.isArray(e.waitingProjectIds) && e.waitingProjectIds.every((r) => typeof r == "string");
}
const k = Object.freeze({
  waitingProjectIds: Object.freeze([])
});
function V(e) {
  return e === void 0 ? k : { waitingProjectIds: e.waitingProjectIds ?? [] };
}
export {
  z as ALL_BOOK_IDS,
  K as BOOKS_PRESENT_DEFAULT,
  Y as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  h as IDLE_SYNC_ACTIVITY,
  k as IDLE_SYNC_QUEUE,
  C as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  O as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  u as findAdjacentPresentBook,
  b as getBookIdsFromBooksPresent,
  P as getNextBookRef,
  y as getNextChapterRef,
  A as getNextVerseRef,
  j as getPreviousBookRef,
  E as getPreviousChapterRef,
  _ as getPreviousVerseRef,
  x as isNavigableProjectIds,
  T as isSyncActivitySnapshot,
  L as isSyncQueueSnapshot,
  v as resolveReferenceHistoryDirection,
  R as shouldRecheckSyncActivity,
  B as toSyncActivity,
  V as toSyncQueue
};
//# sourceMappingURL=experimental.js.map
