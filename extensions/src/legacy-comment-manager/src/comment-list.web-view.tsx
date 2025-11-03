import { CommentList } from 'platform-bible-react';
import { sampleComments } from './comment-sample-data';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%no_comments%',
  '%comment_thread_single_reply%',
  '%comment_thread_multiple_replies%',
  '%comment_assigned_to%',
  '%comment_date_today%',
  '%comment_date_yesterday%',
  '%comment_replyOrAssign%',
];

global.webViewComponent = function ChecksSidePanelWebView() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // TODO: Filter 'Done' out too?
  const unresolvedComments = useMemo(
    () => sampleComments.filter((thread) => thread.status !== 'Resolved'),
    [],
  );

  return (
    <div className="tw-bg-muted">
      <CommentList threads={unresolvedComments} localizedStrings={localizedStrings} />
    </div>
  );
};
