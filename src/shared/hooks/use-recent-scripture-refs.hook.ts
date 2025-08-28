import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEffect, useState } from 'react';
import { recentScriptureRefsUtil } from '@shared/utils/recent-scripture-refs.util';

/**
 * Custom hook that provides synchronized recent scripture references across all components. This
 * hook automatically syncs with localStorage changes from other components.
 */
export function useRecentScriptureRefs() {
  const [recentScriptureRefs, setRecentScriptureRefs] = useState<SerializedVerseRef[]>(() =>
    recentScriptureRefsUtil.getRecentScriptureRefs(),
  );

  useEffect(() => {
    // Handle storage events from other windows/tabs
    // The 'storage' event is fired when localStorage is modified in another window/tab,
    // allowing us to keep recent searches synchronized across multiple instances of the app
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === recentScriptureRefsUtil.storageKey && event.newValue) {
        try {
          const newRefs = JSON.parse(event.newValue);
          setRecentScriptureRefs(newRefs);
        } catch {
          // If parsing fails, just reload from localStorage
          setRecentScriptureRefs(recentScriptureRefsUtil.getRecentScriptureRefs());
        }
      }
    };

    // Handle custom events from the same window/tab
    // Custom events are needed because 'storage' events don't fire within the same window/tab
    const handleCustomEvent = (event: Event) => {
      if (event instanceof CustomEvent) {
        setRecentScriptureRefs(event.detail);
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(recentScriptureRefsUtil.changedEventName, handleCustomEvent);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(recentScriptureRefsUtil.changedEventName, handleCustomEvent);
    };
  }, []);

  /** Update recent scripture references and notify all components */
  const updateRecentScriptureRefs = (refs: SerializedVerseRef[]) => {
    setRecentScriptureRefs(refs);
    recentScriptureRefsUtil.setRecentScriptureRefs(refs);
  };

  return {
    recentScriptureRefs,
    setRecentScriptureRefs: updateRecentScriptureRefs,
  };
}
