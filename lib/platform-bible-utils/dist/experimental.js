import { z as h, r as g, g as I, I as _, a3 as a, a6 as S } from "./scripture-util-CIj33un0.js";
import { ae as J, af as Z, ag as X, ah as $ } from "./scripture-util-CIj33un0.js";
import { Canon as m } from "@sillsdev/scripture";
function d(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? h(m.bookIdToNumber(e));
}
function u(e, r, t) {
  const n = m.bookIdToNumber(e);
  let o, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((f) => {
    const c = m.bookIdToNumber(f);
    (t === "next" ? c > n && c < i : c < n && c > i) && (o = f, i = c);
  }), o;
}
function v(e, r, t) {
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
function k(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o < d(n, t))
    return { book: n, chapterNum: o + 1, verseNum: 1 };
  const i = u(n, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function B(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function O(e, r) {
  const t = u(e.book, r, "next");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function x(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    if (i > 1) return { book: n, chapterNum: o, verseNum: i - 1 };
    if (i === 1 && o === 1) return { book: n, chapterNum: 1, verseNum: 0 };
    if (!t) return { book: n, chapterNum: o, verseNum: 0 };
    if (o > 1) {
      const y = t.getEndVerse(n, o - 1);
      return { book: n, chapterNum: o - 1, verseNum: Math.max(y ?? 1, 1) };
    }
  }
  if (r === void 0) return;
  const c = u(n, r, "previous");
  if (!c) return;
  const s = Math.max(d(c, t), 1), E = t == null ? void 0 : t.getEndVerse(c, s);
  return { book: c, chapterNum: s, verseNum: Math.max(E ?? 1, 1) };
}
function T(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    const s = t == null ? void 0 : t.getEndVerse(n, o);
    return s === void 0 || i < s ? { book: n, chapterNum: o, verseNum: i + 1 } : o < d(n, t) ? { book: n, chapterNum: o + 1, verseNum: 1 } : k(e, r ?? [], t);
  }
  const c = u(n, r, "next");
  if (c)
    return { book: c, chapterNum: 1, verseNum: 1 };
}
function M(e, r) {
  return e === (r === "rtl" ? "left" : "right") ? "forward" : "back";
}
const L = "navigableProjectIds";
function V(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "string");
}
function N(e) {
  return e == null ? !0 : Array.isArray(e) && e.every((r) => typeof r == "string");
}
function Y(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : N("projectIds" in e ? e.projectIds : void 0) && N("resourceIds" in e ? e.resourceIds : void 0);
}
const C = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function D(e) {
  return e === void 0 ? C : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : [],
    resourceIds: e.isSyncing ? e.resourceIds ?? [] : []
  };
}
const w = 3e4;
function U(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
const b = "paratextBibleSendReceive.requestSync", K = "paratextBibleSendReceive.cancelSyncPrompt", R = " (SR_REMOVED)", p = "(SYNC_BUSY)";
function z(e) {
  return g(I(e).trimEnd(), p);
}
function F(e) {
  const r = e.trimEnd();
  return g(r, p) ? a(r, 0, S(r) - S(p)).trimEnd() : e;
}
function Q(e) {
  return _(I(e), R);
}
function W(e) {
  return typeof e != "object" || !e ? !1 : N("waitingProjectIds" in e ? e.waitingProjectIds : void 0) && N("runningProjectIds" in e ? e.runningProjectIds : void 0);
}
const P = Object.freeze({
  waitingProjectIds: Object.freeze([]),
  runningProjectIds: Object.freeze([])
});
function G(e) {
  return e === void 0 ? P : {
    waitingProjectIds: e.waitingProjectIds ?? [],
    runningProjectIds: e.runningProjectIds ?? []
  };
}
export {
  J as ALL_BOOK_IDS,
  Z as BOOKS_PRESENT_DEFAULT,
  K as CANCEL_SYNC_PROMPT_COMMAND,
  X as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  C as IDLE_SYNC_ACTIVITY,
  P as IDLE_SYNC_QUEUE,
  L as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  b as REQUEST_SYNC_COMMAND,
  w as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  p as SYNC_BUSY_MARKER,
  R as SYNC_REQUEST_REMOVED_MARKER,
  u as findAdjacentPresentBook,
  $ as getBookIdsFromBooksPresent,
  O as getNextBookRef,
  k as getNextChapterRef,
  T as getNextVerseRef,
  B as getPreviousBookRef,
  v as getPreviousChapterRef,
  x as getPreviousVerseRef,
  V as isNavigableProjectIds,
  Y as isSyncActivitySnapshot,
  z as isSyncBusyError,
  W as isSyncQueueSnapshot,
  Q as isSyncRequestRemovedError,
  M as resolveReferenceHistoryDirection,
  U as shouldRecheckSyncActivity,
  D as toSyncActivity,
  G as toSyncQueue,
  F as withoutSyncBusyMarker
};
//# sourceMappingURL=experimental.js.map
