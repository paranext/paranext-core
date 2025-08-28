import { SerializedVerseRef } from '@sillsdev/scripture';
import { compareScrRefs } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

// Recent Scripture Refs Utility Constants and Functions
const RECENT_SCRIPTURE_REFS_LOCAL_STORAGE_KEY = 'recent-scripture-refs';
const RECENT_SCRIPTURE_REFS_SYNC_EVENT = 'recent-scripture-refs-sync';

const MAX_ITEMS = 15;

/** Get recent scripture references from localStorage */
function getRecentScriptureRefs(): SerializedVerseRef[] {
  const recentScriptureRefsStr = localStorage.getItem(RECENT_SCRIPTURE_REFS_LOCAL_STORAGE_KEY);
  if (!recentScriptureRefsStr) return [];
  try {
    return JSON.parse(recentScriptureRefsStr);
  } catch {
    return [];
  }
}

/** Set recent scripture references in localStorage and dispatch sync event */
function setRecentScriptureRefs(recentScriptureRefs: SerializedVerseRef[]): void {
  localStorage.setItem(
    RECENT_SCRIPTURE_REFS_LOCAL_STORAGE_KEY,
    JSON.stringify(recentScriptureRefs),
  );
  // Dispatch custom event for same-tab sync
  const customEvent = new CustomEvent(RECENT_SCRIPTURE_REFS_SYNC_EVENT, {
    detail: recentScriptureRefs,
  });
  window.dispatchEvent(customEvent);
}

/**
 * Custom hook that provides synchronized recent scripture references across all components. This
 * hook automatically syncs with localStorage changes from other components.
 */
export default function useRecentScriptureRefs() {
  const [recentScriptureRefs, setRecentScriptureRefsState] = useState<SerializedVerseRef[]>(() =>
    getRecentScriptureRefs(),
  );

  useEffect(() => {
    // Handle storage events from other windows/tabs
    // The 'storage' event is fired when localStorage is modified in another window/tab,
    // allowing us to keep recent searches synchronized across multiple instances of the app
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === RECENT_SCRIPTURE_REFS_LOCAL_STORAGE_KEY && event.newValue) {
        try {
          const updatedRefs: SerializedVerseRef[] = JSON.parse(event.newValue);
          setRecentScriptureRefsState(updatedRefs);
        } catch {
          // If parsing fails, refresh from localStorage
          setRecentScriptureRefsState(getRecentScriptureRefs());
        }
      }
    };

    // Handle custom events from the same window/tab
    // This ensures synchronization when multiple components modify recent searches
    // within the same window instance
    const handleCustomEvent = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        setRecentScriptureRefsState(event.detail);
      }
    };

    // Set up event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(RECENT_SCRIPTURE_REFS_SYNC_EVENT, handleCustomEvent);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(RECENT_SCRIPTURE_REFS_SYNC_EVENT, handleCustomEvent);
    };
  }, []);

  /** Update recent scripture references and notify all components */
  const updateRecentScriptureRefs = (refs: SerializedVerseRef[]) => {
    setRecentScriptureRefsState(refs);
    setRecentScriptureRefs(refs);
  };

  /** Add a new scripture reference to recent searches (deduplicates and maintains order) */
  const addRecentScriptureRef = (newRef: SerializedVerseRef) => {
    // Remove the reference if it already exists (to avoid duplicates)
    const recentSearchesWithoutCurrent = recentScriptureRefs.filter(
      (existingRef) => compareScrRefs(existingRef, newRef) !== 0,
    );
    // Add the new reference at the beginning and limit the total number
    const updatedRecentSearches = [newRef, ...recentSearchesWithoutCurrent.slice(0, MAX_ITEMS - 1)];
    updateRecentScriptureRefs(updatedRecentSearches);
  };

  return {
    recentScriptureRefs,
    addRecentScriptureRef,
  };
}
