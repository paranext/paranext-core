import { z as I } from "./scripture-util-Bjt1HtZv.js";
import { ae as D, af as z, ag as K, ah as Y } from "./scripture-util-Bjt1HtZv.js";
import { Canon as m } from "@sillsdev/scripture";
function N(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? I(m.bookIdToNumber(e));
}
function u(e, r, t) {
  const o = m.bookIdToNumber(e);
  let n, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((f) => {
    const s = m.bookIdToNumber(f);
    (t === "next" ? s > o && s < i : s < o && s > i) && (n = f, i = s);
  }), n;
}
function j(e, r, t) {
  const { book: o, chapterNum: n } = e;
  if (r.includes(o) && n > 1)
    return { book: o, chapterNum: n - 1, verseNum: 1 };
  const i = u(o, r, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(N(i, t), 1),
      verseNum: 1
    };
}
function g(e, r, t) {
  const { book: o, chapterNum: n } = e;
  if (r.includes(o) && n < N(o, t))
    return { book: o, chapterNum: n + 1, verseNum: 1 };
  const i = u(o, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function E(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function a(e, r) {
  const t = u(e.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function P(e, r, t) {
  const { book: o, chapterNum: n, verseNum: i } = e;
  if (r === void 0 || r.includes(o)) {
    if (i > 1) return { book: o, chapterNum: n, verseNum: i - 1 };
    if (i === 1 && n === 1) return { book: o, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: o, chapterNum: n, verseNum: 0 };
    if (n > 1) {
      const d = t.getEndVerse(o, n - 1);
      return { book: o, chapterNum: n - 1, verseNum: Math.max(d ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const s = u(o, r, "previous");
  if (!s) return;
  const c = Math.max(N(s, t), 1), p = t == null ? void 0 : t.getEndVerse(s, c);
  return { book: s, chapterNum: c, verseNum: Math.max(p ?? 1, 1) };
}
function _(e, r, t) {
  const { book: o, chapterNum: n, verseNum: i } = e;
  if (r === void 0 || r.includes(o)) {
    const c = t == null ? void 0 : t.getEndVerse(o, n);
    return c === void 0 || i < c ? { book: o, chapterNum: n, verseNum: i + 1 } : n < N(o, t) ? { book: o, chapterNum: n + 1, verseNum: 1 } : g(e, r ?? [], t);
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
function v(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : !("projectIds" in e) || e.projectIds === void 0 || e.projectIds === null ? !0 : Array.isArray(e.projectIds) && e.projectIds.every((r) => typeof r == "string");
}
const y = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function T(e) {
  return e === void 0 ? y : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : [],
    resourceIds: e.isSyncing ? e.resourceIds ?? [] : []
  };
}
const B = 3e4;
function R(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
function O(e) {
  return typeof e != "object" || !e ? !1 : !("waitingProjectIds" in e) || e.waitingProjectIds === void 0 || // The wire may send null for an absent list, so null has to be compared against
  // eslint-disable-next-line no-null/no-null
  e.waitingProjectIds === null ? !0 : Array.isArray(e.waitingProjectIds) && e.waitingProjectIds.every((r) => typeof r == "string");
}
const h = Object.freeze({
  waitingProjectIds: Object.freeze([])
});
function V(e) {
  return e === void 0 ? h : { waitingProjectIds: e.waitingProjectIds ?? [] };
}
export {
  D as ALL_BOOK_IDS,
  z as BOOKS_PRESENT_DEFAULT,
  K as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  y as IDLE_SYNC_ACTIVITY,
  h as IDLE_SYNC_QUEUE,
  C as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  B as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  u as findAdjacentPresentBook,
  Y as getBookIdsFromBooksPresent,
  a as getNextBookRef,
  g as getNextChapterRef,
  _ as getNextVerseRef,
  E as getPreviousBookRef,
  j as getPreviousChapterRef,
  P as getPreviousVerseRef,
  x as isNavigableProjectIds,
  v as isSyncActivitySnapshot,
  O as isSyncQueueSnapshot,
  A as resolveReferenceHistoryDirection,
  R as shouldRecheckSyncActivity,
  T as toSyncActivity,
  V as toSyncQueue
};
//# sourceMappingURL=experimental.js.map
