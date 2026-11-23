import { z as getChaptersForBook, s as endsWith, g as getErrorMessage, I as includes, a3 as slice, a6 as stringLength } from "./scripture-util.js";
import { ae, af, ag, ah } from "./scripture-util.js";
import { Canon } from "@sillsdev/scripture";
function getEndChapterWithFallback(book, bounds) {
  return (bounds == null ? void 0 : bounds.getEndChapter(book)) ?? getChaptersForBook(Canon.bookIdToNumber(book));
}
function findAdjacentPresentBook(book, availableBooks, direction) {
  const bookNum = Canon.bookIdToNumber(book);
  let closestBook;
  let closestBookNum = direction === "next" ? Infinity : -Infinity;
  availableBooks.forEach((candidate) => {
    const candidateNum = Canon.bookIdToNumber(candidate);
    const isCloser = direction === "next" ? candidateNum > bookNum && candidateNum < closestBookNum : candidateNum < bookNum && candidateNum > closestBookNum;
    if (isCloser) {
      closestBook = candidate;
      closestBookNum = candidateNum;
    }
  });
  return closestBook;
}
function getPreviousChapterRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum > 1)
    return { book, chapterNum: chapterNum - 1, verseNum: 1 };
  const previousBook = findAdjacentPresentBook(book, availableBooks, "previous");
  if (!previousBook) return void 0;
  return {
    book: previousBook,
    chapterNum: Math.max(getEndChapterWithFallback(previousBook, bounds), 1),
    verseNum: 1
  };
}
function getNextChapterRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum < getEndChapterWithFallback(book, bounds))
    return { book, chapterNum: chapterNum + 1, verseNum: 1 };
  const nextBook = findAdjacentPresentBook(book, availableBooks, "next");
  if (!nextBook) return void 0;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
function getPreviousBookRef(scrRef, availableBooks) {
  const previousBook = findAdjacentPresentBook(scrRef.book, availableBooks, "previous");
  if (!previousBook) return void 0;
  return { book: previousBook, chapterNum: 1, verseNum: 1 };
}
function getNextBookRef(scrRef, availableBooks) {
  const nextBook = findAdjacentPresentBook(scrRef.book, availableBooks, "next");
  if (!nextBook) return void 0;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
function getPreviousVerseRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum, verseNum } = scrRef;
  const isBookPresent = availableBooks === void 0 || availableBooks.includes(book);
  if (isBookPresent) {
    if (verseNum > 1) return { book, chapterNum, verseNum: verseNum - 1 };
    if (verseNum === 1 && chapterNum === 1) return { book, chapterNum: 1, verseNum: 0 };
    if (!bounds) return { book, chapterNum, verseNum: 0 };
    if (chapterNum > 1) {
      const endVerse2 = bounds.getEndVerse(book, chapterNum - 1);
      return { book, chapterNum: chapterNum - 1, verseNum: Math.max(endVerse2 ?? 1, 1) };
    }
  }
  if (availableBooks === void 0) return void 0;
  const previousBook = findAdjacentPresentBook(book, availableBooks, "previous");
  if (!previousBook) return void 0;
  const endChapter = Math.max(getEndChapterWithFallback(previousBook, bounds), 1);
  const endVerse = bounds == null ? void 0 : bounds.getEndVerse(previousBook, endChapter);
  return { book: previousBook, chapterNum: endChapter, verseNum: Math.max(endVerse ?? 1, 1) };
}
function getNextVerseRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum, verseNum } = scrRef;
  const isBookPresent = availableBooks === void 0 || availableBooks.includes(book);
  if (isBookPresent) {
    const endVerse = bounds == null ? void 0 : bounds.getEndVerse(book, chapterNum);
    if (endVerse === void 0 || verseNum < endVerse)
      return { book, chapterNum, verseNum: verseNum + 1 };
    if (chapterNum < getEndChapterWithFallback(book, bounds))
      return { book, chapterNum: chapterNum + 1, verseNum: 1 };
    return getNextChapterRef(scrRef, availableBooks ?? [], bounds);
  }
  const nextBook = findAdjacentPresentBook(book, availableBooks, "next");
  if (!nextBook) return void 0;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
function resolveReferenceHistoryDirection(physicalDirection, interfaceDirection) {
  const forwardKey = interfaceDirection === "rtl" ? "left" : "right";
  return physicalDirection === forwardKey ? "forward" : "back";
}
const NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY = "navigableProjectIds";
function isNavigableProjectIds(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}
function isOptionalStringList(list) {
  if (list === void 0 || list === null) return true;
  return Array.isArray(list) && list.every((id) => typeof id === "string");
}
function isSyncActivitySnapshot(value) {
  if (typeof value !== "object" || !value) return false;
  if (!("isSyncing" in value) || typeof value.isSyncing !== "boolean") return false;
  return isOptionalStringList("projectIds" in value ? value.projectIds : void 0) && isOptionalStringList("resourceIds" in value ? value.resourceIds : void 0);
}
const IDLE_SYNC_ACTIVITY = Object.freeze({
  isSyncing: false,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([])
});
function toSyncActivity(value) {
  if (value === void 0) return IDLE_SYNC_ACTIVITY;
  return {
    isSyncing: value.isSyncing,
    projectIds: value.isSyncing ? value.projectIds ?? [] : [],
    resourceIds: value.isSyncing ? value.resourceIds ?? [] : []
  };
}
const SYNC_ACTIVITY_RECHECK_INTERVAL_MS = 3e4;
function shouldRecheckSyncActivity(value) {
  return (value == null ? void 0 : value.isSyncing) === true;
}
const REQUEST_SYNC_COMMAND = "paratextBibleSendReceive.requestSync";
const CANCEL_SYNC_PROMPT_COMMAND = "paratextBibleSendReceive.cancelSyncPrompt";
const SYNC_REQUEST_REMOVED_MARKER = " (SR_REMOVED)";
const SYNC_BUSY_MARKER = "(SYNC_BUSY)";
function isSyncBusyError(error) {
  return endsWith(getErrorMessage(error).trimEnd(), SYNC_BUSY_MARKER);
}
function withoutSyncBusyMarker(message) {
  const trimmed = message.trimEnd();
  if (!endsWith(trimmed, SYNC_BUSY_MARKER)) return message;
  return slice(trimmed, 0, stringLength(trimmed) - stringLength(SYNC_BUSY_MARKER)).trimEnd();
}
function isSyncRequestRemovedError(error) {
  return includes(getErrorMessage(error), SYNC_REQUEST_REMOVED_MARKER);
}
function isSyncQueueSnapshot(value) {
  if (typeof value !== "object" || !value) return false;
  return isOptionalStringList("waitingProjectIds" in value ? value.waitingProjectIds : void 0) && isOptionalStringList("sendingProjectIds" in value ? value.sendingProjectIds : void 0) && isOptionalStringList("runningProjectIds" in value ? value.runningProjectIds : void 0);
}
const IDLE_SYNC_QUEUE = Object.freeze({
  waitingProjectIds: Object.freeze([]),
  sendingProjectIds: Object.freeze([]),
  runningProjectIds: Object.freeze([])
});
function toSyncQueue(value) {
  if (value === void 0) return IDLE_SYNC_QUEUE;
  return {
    waitingProjectIds: value.waitingProjectIds ?? [],
    sendingProjectIds: value.sendingProjectIds ?? [],
    runningProjectIds: value.runningProjectIds ?? []
  };
}
export {
  ae as ALL_BOOK_IDS,
  af as BOOKS_PRESENT_DEFAULT,
  CANCEL_SYNC_PROMPT_COMMAND,
  ag as DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  IDLE_SYNC_ACTIVITY,
  IDLE_SYNC_QUEUE,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
  REQUEST_SYNC_COMMAND,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  SYNC_BUSY_MARKER,
  SYNC_REQUEST_REMOVED_MARKER,
  findAdjacentPresentBook,
  ah as getBookIdsFromBooksPresent,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  isNavigableProjectIds,
  isSyncActivitySnapshot,
  isSyncBusyError,
  isSyncQueueSnapshot,
  isSyncRequestRemovedError,
  resolveReferenceHistoryDirection,
  shouldRecheckSyncActivity,
  toSyncActivity,
  toSyncQueue,
  withoutSyncBusyMarker
};
//# sourceMappingURL=experimental.js.map
