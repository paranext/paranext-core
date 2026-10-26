import type { WebViewProps } from '@papi/core';
import { LanguageStrings } from 'platform-bible-utils';
import { useEffect } from 'react';
import { CopyrightNoticeBanner } from './copyright-notice-banner.component';
import { useCopyrightNotice } from './use-copyright-notice.hook';

export type ProjectCopyrightNoticeProps = {
  /** The project whose text the pane shows */
  projectId: string | undefined;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
  /** The pane's web view state, where the dismissal is kept */
  useWebViewState: WebViewProps['useWebViewState'];
};

type NoticeForProjectProps = {
  projectId: string;
  localizedStrings: LanguageStrings;
  isDismissed: boolean;
  onDismiss: () => void;
};

function NoticeForProject({
  projectId,
  localizedStrings,
  isDismissed,
  onDismiss,
}: NoticeForProjectProps) {
  const notice = useCopyrightNotice(projectId);
  if (!notice || isDismissed) return undefined;
  return (
    <CopyrightNoticeBanner
      notice={notice}
      localizedStrings={localizedStrings}
      onDismiss={onDismiss}
    />
  );
}

/**
 * Shows the copyright notice banner for the project a pane is showing, if it needs one.
 *
 * As in Paratext 9, which keeps one dismissal per window and clears it when the window's text
 * changes, a pane remembers only the text whose notice was dismissed: switching to another text and
 * back shows the first text's notice again. The dismissal survives the pane being reopened.
 */
export function ProjectCopyrightNotice({
  projectId,
  localizedStrings,
  useWebViewState,
}: ProjectCopyrightNoticeProps) {
  const [dismissedFor, setDismissedFor, resetDismissedFor] = useWebViewState<string | undefined>(
    'copyrightNoticeDismissedFor',
    undefined,
  );

  // A pane that briefly has no text (while it loads) has not changed text
  const hasOtherTextDismissed =
    projectId !== undefined && dismissedFor !== undefined && dismissedFor !== projectId;
  useEffect(() => {
    if (hasOtherTextDismissed) resetDismissedFor();
  }, [hasOtherTextDismissed, resetDismissedFor]);

  if (!projectId) return undefined;

  return (
    // Keyed so a newly shown text never shows or dismisses the previous text's notice while its own
    // is on its way
    <NoticeForProject
      key={projectId}
      projectId={projectId}
      localizedStrings={localizedStrings}
      isDismissed={dismissedFor === projectId}
      onDismiss={() => setDismissedFor(projectId)}
    />
  );
}

export default ProjectCopyrightNotice;
