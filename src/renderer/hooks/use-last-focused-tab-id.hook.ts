import {
  getLastFocusedTabId,
  onDidChangeLastFocusedTabId,
} from '@renderer/services/window.service-host';
import { useEvent } from 'platform-bible-react';
import { useState } from 'react';

/**
 * Returns the id of the tab or web view that most recently had focus (regardless of whether it is
 * scripture-navigable), updating whenever it changes. Retained when focus moves outside all tabs.
 * `undefined` when no tab has ever been focused.
 */
export function useLastFocusedTabId(): string | undefined {
  const [lastFocusedTabId, setLastFocusedTabId] = useState<string | undefined>(() =>
    getLastFocusedTabId(),
  );
  useEvent(onDidChangeLastFocusedTabId, setLastFocusedTabId);
  return lastFocusedTabId;
}

export default useLastFocusedTabId;
