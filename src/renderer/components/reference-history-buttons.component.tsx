import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  getReferenceHistorySync,
  navigateReferenceHistorySync,
  onDidChangeReferenceHistory,
} from '@renderer/services/scroll-group.service-host';
import { ReferenceHistory } from '@shared/services/scroll-group.service-model';
import { formatScrRef, ScrollGroupId } from 'platform-bible-utils';
import {
  NAVIGATION_HISTORY_BUTTONS_STRING_KEYS,
  NavigationHistoryButtons,
  NavigationHistoryItem,
} from 'platform-bible-react/experimental';
import { useEvent } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const LOCALIZED_STRING_KEYS = [...NAVIGATION_HISTORY_BUTTONS_STRING_KEYS];

export type ReferenceHistoryButtonsProps = {
  /** Scroll group whose reference history to display and navigate */
  scrollGroupId: ScrollGroupId;
};

/**
 * Toolbar back/forward reference-history buttons wired to the scroll group service. Labels use
 * `formatScrRef(_, 'English')` to match the adjacent BookChapterControl's recent-searches
 * rendering.
 */
export function ReferenceHistoryButtons({ scrollGroupId }: ReferenceHistoryButtonsProps) {
  const [history, setHistory] = useState<ReferenceHistory>(() =>
    getReferenceHistorySync(scrollGroupId),
  );
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // The useState lazy initializer above only runs once, on mount, so a later change to which
  // scroll group we're displaying needs an explicit re-sync.
  useEffect(() => {
    setHistory(getReferenceHistorySync(scrollGroupId));
  }, [scrollGroupId]);

  // Keep history current as it changes for this scroll group specifically. Other scroll groups'
  // updates are ignored so this component only re-renders for changes that affect it.
  useEvent(
    onDidChangeReferenceHistory,
    useCallback(
      (update) => {
        if (update.scrollGroupId === scrollGroupId) setHistory(update.history);
      },
      [scrollGroupId],
    ),
  );

  // TODO (localization): labels hardcode `formatScrRef(_, 'English')`, so book names do not
  // localize — matching the adjacent BookChapterControl's still-English recent-searches list.
  // Localizing these (and the many other `formatScrRef(_, 'English')` sites across the app) is
  // bigger-picture work to tackle together; when BookChapterControl gains localized book names,
  // thread them through to these labels too.
  const backItems: NavigationHistoryItem[] = useMemo(
    () =>
      history.back.map((entry, i) => ({
        label: formatScrRef(entry.scrRef, 'English'),
        offset: -(i + 1),
      })),
    [history],
  );
  const forwardItems: NavigationHistoryItem[] = useMemo(
    () =>
      history.forward.map((entry, i) => ({
        label: formatScrRef(entry.scrRef, 'English'),
        offset: i + 1,
      })),
    [history],
  );

  const handleNavigate = useCallback(
    (offset: number) => {
      navigateReferenceHistorySync(scrollGroupId, offset);
    },
    [scrollGroupId],
  );

  return (
    <NavigationHistoryButtons
      canGoBack={history.back.length > 0}
      canGoForward={history.forward.length > 0}
      backItems={backItems}
      forwardItems={forwardItems}
      onNavigate={handleNavigate}
      localizedStrings={localizedStrings}
      className="tw:h-8"
    />
  );
}

export default ReferenceHistoryButtons;
