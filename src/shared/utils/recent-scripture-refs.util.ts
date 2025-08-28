import { SerializedVerseRef } from '@sillsdev/scripture';

const RECENT_SCRIPTURE_REFS_KEY = 'recent-scripture-references';
const RECENT_SCRIPTURE_REFS_CHANGED_EVENT = 'recent-scripture-refs-changed';

/**
 * Utility functions for managing recent scripture references in localStorage. This provides a
 * centralized way to manage recent scripture references across the app.
 */
export const recentScriptureRefsUtil = {
  /** Get recent scripture references from localStorage */
  getRecentScriptureRefs(): SerializedVerseRef[] {
    try {
      const stored = localStorage.getItem(RECENT_SCRIPTURE_REFS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save recent scripture references to localStorage This will trigger storage events to notify
   * other components
   */
  setRecentScriptureRefs(refs: SerializedVerseRef[]): void {
    localStorage.setItem(RECENT_SCRIPTURE_REFS_KEY, JSON.stringify(refs));
    // Dispatch a custom event to notify components about the change
    // This is needed for same-window/same-tab synchronization since storage events
    // only fire for other windows by default
    window.dispatchEvent(
      new CustomEvent(RECENT_SCRIPTURE_REFS_CHANGED_EVENT, {
        detail: refs,
      }),
    );
  },

  /** Check if two scripture references are equal */
  areScriptureRefsEqual(a: SerializedVerseRef, b: SerializedVerseRef): boolean {
    return a.book === b.book && a.chapterNum === b.chapterNum && a.verseNum === b.verseNum;
  },

  /** The key used in localStorage for recent scripture references */
  storageKey: RECENT_SCRIPTURE_REFS_KEY,

  /** The name of the custom event dispatched when recent scripture references change */
  changedEventName: RECENT_SCRIPTURE_REFS_CHANGED_EVENT,
};
