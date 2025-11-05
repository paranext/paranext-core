import { CommentList, Label, Skeleton } from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { WebViewProps } from '@papi/core';
import { sampleComments } from './comment-sample-data';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%no_comments%',
  '%comment_thread_single_reply%',
  '%comment_thread_multiple_replies%',
  '%comment_assigned_to%',
  '%comment_date_today%',
  '%comment_date_yesterday%',
  '%comment_replyOrAssign%',
];

global.webViewComponent = function ChecksSidePanelWebView({
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [areThreadsLoading, setAreThreadsLoading] = useState<boolean>(false);

  const unresolvedThreadsForScrRef = useMemo(() => {
    setAreThreadsLoading(true);
    const scrRefString = `${scrRef.book} ${scrRef.chapterNum}:${scrRef.verseNum}`;
    const filteredThreads = sampleComments.filter((thread) => scrRefString === thread.verseRef);
    setAreThreadsLoading(false);
    return filteredThreads;
  }, [scrRef]);

  if (unresolvedThreadsForScrRef.length === 0) {
    return (
      <div className="tw-m-4 tw-flex tw-justify-center">
        <Label>{localizedStrings['%no_comments%']}</Label>
      </div>
    );
  }

  if (areThreadsLoading) {
    <div className="tw-bg-muted tw-flex-1 tw-p-2 tw-space-y-4">
      {[...Array(10)].map((_, index) => (
        <Skeleton
          // There are no other unique identifiers for these items
          // eslint-disable-next-line react/no-array-index-key
          key={`comment-thread-skeleton-${index}`}
          className="tw-h-48 tw-w-full"
        />
      ))}
    </div>;
  }

  return (
    <div className="tw-bg-muted">
      <CommentList threads={unresolvedThreadsForScrRef} localizedStrings={localizedStrings} />
    </div>
  );
};
