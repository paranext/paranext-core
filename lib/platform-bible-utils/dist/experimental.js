import { z as a, r as y, g as S, I as k, a3 as _, a6 as p } from "./scripture-util-CIj33un0.js";
import { ae as q, af as J, ag as Z, ah as $ } from "./scripture-util-CIj33un0.js";
import { Canon as m } from "@sillsdev/scripture";
function d(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? a(m.bookIdToNumber(e));
}
function u(e, r, t) {
  const n = m.bookIdToNumber(e);
  let o, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((f) => {
    const s = m.bookIdToNumber(f);
    (t === "next" ? s > n && s < i : s < n && s > i) && (o = f, i = s);
  }), o;
}
function B(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o > 1)
    return { book: n, chapterNum: o - 1, verseNum: 1 };
  const i = u(n, r, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(d(i, t), 1),
      verseNum: 1
    };
}
function j(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o < d(n, t))
    return { book: n, chapterNum: o + 1, verseNum: 1 };
  const i = u(n, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function O(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function x(e, r) {
  const t = u(e.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function T(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    if (i > 1) return { book: n, chapterNum: o, verseNum: i - 1 };
    if (i === 1 && o === 1) return { book: n, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: n, chapterNum: o, verseNum: 0 };
    if (o > 1) {
      const h = t.getEndVerse(n, o - 1);
      return { book: n, chapterNum: o - 1, verseNum: Math.max(h ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const s = u(n, r, "previous");
  if (!s) return;
  const c = Math.max(d(s, t), 1), E = t == null ? void 0 : t.getEndVerse(s, c);
  return { book: s, chapterNum: c, verseNum: Math.max(E ?? 1, 1) };
}
function L(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    const c = t == null ? void 0 : t.getEndVerse(n, o);
    return c === void 0 || i < c ? { book: n, chapterNum: o, verseNum: i + 1 } : o < d(n, t) ? { book: n, chapterNum: o + 1, verseNum: 1 } : j(e, r ?? [], t);
  }
  const s = u(n, r, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function V(e, r) {
  return e === (r === "rtl" ? "left" : "right") ? "forward" : "back";
}
const M = "navigableProjectIds";
function Y(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "string");
}
function D(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : g("projectIds" in e ? e.projectIds : void 0) && g("resourceIds" in e ? e.resourceIds : void 0);
}
function g(e) {
  return e == null ? !0 : Array.isArray(e) && e.every((r) => typeof r == "string");
}
const P = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function w(e) {
  return e === void 0 ? P : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : [],
    resourceIds: e.isSyncing ? e.resourceIds ?? [] : []
  };
}
const K = 3e4;
function U(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
const R = " (SR_REMOVED)", N = "(SYNC_BUSY)";
function z(e) {
  return y(S(e).trimEnd(), N);
}
function b(e) {
  const r = e.trimEnd();
  return y(r, N) ? _(r, 0, p(r) - p(N)).trimEnd() : e;
}
function F(e) {
  return k(S(e), R);
}
function Q(e) {
  return typeof e != "object" || !e ? !1 : I("waitingProjectIds" in e ? e.waitingProjectIds : void 0) && I("runningProjectIds" in e ? e.runningProjectIds : void 0);
}
function I(e) {
  return e == null ? !0 : Array.isArray(e) && e.every((r) => typeof r == "string");
}
const v = Object.freeze({
  waitingProjectIds: Object.freeze([]),
  runningProjectIds: Object.freeze([])
});
function W(e) {
  return e === void 0 ? v : {
    waitingProjectIds: e.waitingProjectIds ?? [],
    runningProjectIds: e.runningProjectIds ?? []
  };
}
export {
  q as ALL_BOOK_IDS,
  J as BOOKS_PRESENT_DEFAULT,
  Z as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  P as IDLE_SYNC_ACTIVITY,
  v as IDLE_SYNC_QUEUE,
  M as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  K as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  N as SYNC_BUSY_MARKER,
  R as SYNC_REQUEST_REMOVED_MARKER,
  u as findAdjacentPresentBook,
  $ as getBookIdsFromBooksPresent,
  x as getNextBookRef,
  j as getNextChapterRef,
  L as getNextVerseRef,
  O as getPreviousBookRef,
  B as getPreviousChapterRef,
  T as getPreviousVerseRef,
  Y as isNavigableProjectIds,
  D as isSyncActivitySnapshot,
  z as isSyncBusyError,
  Q as isSyncQueueSnapshot,
  F as isSyncRequestRemovedError,
  V as resolveReferenceHistoryDirection,
  U as shouldRecheckSyncActivity,
  w as toSyncActivity,
  W as toSyncQueue,
  b as withoutSyncBusyMarker
};
//# sourceMappingURL=experimental.js.map
