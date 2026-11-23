import { z as h, s as I, g as S, I as _, a3 as j, a6 as p } from "./scripture-util-yYRG547K.js";
import { ae as J, af as Z, ag as X, ah as $ } from "./scripture-util-yYRG547K.js";
import { Canon as m } from "@sillsdev/scripture";
function N(e, r) {
  return (r == null ? void 0 : r.getEndChapter(e)) ?? h(m.bookIdToNumber(e));
}
function u(e, r, t) {
  const n = m.bookIdToNumber(e);
  let o, i = t === "next" ? 1 / 0 : -1 / 0;
  return r.forEach((d) => {
    const s = m.bookIdToNumber(d);
    (t === "next" ? s > n && s < i : s < n && s > i) && (o = d, i = s);
  }), o;
}
function O(e, r, t) {
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
function P(e, r, t) {
  const { book: n, chapterNum: o } = e;
  if (r.includes(n) && o < N(n, t))
    return { book: n, chapterNum: o + 1, verseNum: 1 };
  const i = u(n, r, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function v(e, r) {
  const t = u(e.book, r, "previous");
  if (t)
    return { book: t, chapterNum: 1, verseNum: 1 };
}
function B(e, r) {
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
  const s = u(n, r, "previous");
  if (!s) return;
  const c = Math.max(N(s, t), 1), E = t == null ? void 0 : t.getEndVerse(s, c);
  return { book: s, chapterNum: c, verseNum: Math.max(E ?? 1, 1) };
}
function T(e, r, t) {
  const { book: n, chapterNum: o, verseNum: i } = e;
  if (r === void 0 || r.includes(n)) {
    const c = t == null ? void 0 : t.getEndVerse(n, o);
    return c === void 0 || i < c ? { book: n, chapterNum: o, verseNum: i + 1 } : o < N(n, t) ? { book: n, chapterNum: o + 1, verseNum: 1 } : P(e, r ?? [], t);
  }
  const s = u(n, r, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function M(e, r) {
  return e === (r === "rtl" ? "left" : "right") ? "forward" : "back";
}
const L = "navigableProjectIds";
function V(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "string");
}
function f(e) {
  return e == null ? !0 : Array.isArray(e) && e.every((r) => typeof r == "string");
}
function Y(e) {
  return typeof e != "object" || !e || !("isSyncing" in e) || typeof e.isSyncing != "boolean" ? !1 : f("projectIds" in e ? e.projectIds : void 0) && f("resourceIds" in e ? e.resourceIds : void 0);
}
const a = Object.freeze({
  isSyncing: !1,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function D(e) {
  return e === void 0 ? a : {
    isSyncing: e.isSyncing,
    projectIds: e.isSyncing ? e.projectIds ?? [] : [],
    resourceIds: e.isSyncing ? e.resourceIds ?? [] : []
  };
}
const b = 3e4;
function w(e) {
  return (e == null ? void 0 : e.isSyncing) === !0;
}
const U = "paratextBibleSendReceive.requestSync", z = "paratextBibleSendReceive.cancelSyncPrompt", k = " (SR_REMOVED)", g = "(SYNC_BUSY)";
function K(e) {
  return I(S(e).trimEnd(), g);
}
function F(e) {
  const r = e.trimEnd();
  return I(r, g) ? j(r, 0, p(r) - p(g)).trimEnd() : e;
}
function Q(e) {
  return _(S(e), k);
}
function W(e) {
  return typeof e != "object" || !e ? !1 : f("waitingProjectIds" in e ? e.waitingProjectIds : void 0) && f("sendingProjectIds" in e ? e.sendingProjectIds : void 0) && f("runningProjectIds" in e ? e.runningProjectIds : void 0);
}
const C = Object.freeze({
  waitingProjectIds: Object.freeze([]),
  sendingProjectIds: Object.freeze([]),
  runningProjectIds: Object.freeze([])
});
function G(e) {
  return e === void 0 ? C : {
    waitingProjectIds: e.waitingProjectIds ?? [],
    sendingProjectIds: e.sendingProjectIds ?? [],
    runningProjectIds: e.runningProjectIds ?? []
  };
}
export {
  J as ALL_BOOK_IDS,
  Z as BOOKS_PRESENT_DEFAULT,
  z as CANCEL_SYNC_PROMPT_COMMAND,
  X as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  a as IDLE_SYNC_ACTIVITY,
  C as IDLE_SYNC_QUEUE,
  L as NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  U as REQUEST_SYNC_COMMAND,
  b as SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  g as SYNC_BUSY_MARKER,
  k as SYNC_REQUEST_REMOVED_MARKER,
  u as findAdjacentPresentBook,
  $ as getBookIdsFromBooksPresent,
  B as getNextBookRef,
  P as getNextChapterRef,
  T as getNextVerseRef,
  v as getPreviousBookRef,
  O as getPreviousChapterRef,
  x as getPreviousVerseRef,
  V as isNavigableProjectIds,
  Y as isSyncActivitySnapshot,
  K as isSyncBusyError,
  W as isSyncQueueSnapshot,
  Q as isSyncRequestRemovedError,
  M as resolveReferenceHistoryDirection,
  w as shouldRecheckSyncActivity,
  D as toSyncActivity,
  G as toSyncQueue,
  F as withoutSyncBusyMarker
};
//# sourceMappingURL=experimental.js.map
