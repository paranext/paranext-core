import type { WebViewProps } from '@papi/core';
import { LanguageStrings } from 'platform-bible-utils';
import { useCallback } from 'react';
import { CopyrightNoticeBanner } from './copyright-notice-banner.component';
import { openExternalUrl } from './open-external-url.util';
import { useCopyrightNotice } from './use-copyright-notice.hook';

/** Projects whose notice was dismissed in this pane, keyed by project id */
type DismissedCopyrightNotices = Record<string, true>;

const NO_DISMISSALS: DismissedCopyrightNotices = {};

export type ProjectCopyrightNoticeProps = {
  /** The project whose text the pane shows */
  projectId: string | undefined;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
  /** The pane's web view state, where dismissals are kept */
  useWebViewState: WebViewProps['useWebViewState'];
};

/**
 * Shows the copyright notice banner for the project a pane is showing, if it needs one.
 *
 * A dismissal is kept per pane and per project, as Paratext 9 keeps it per window: a pane that
 * switches to another text shows that text's notice, and switching back does not bring back a
 * notice already dismissed there.
 */
export function ProjectCopyrightNotice({
  projectId,
  localizedStrings,
  useWebViewState,
}: ProjectCopyrightNoticeProps) {
  const { notice, name, fullName } = useCopyrightNotice(projectId);
  const [dismissedNotices, setDismissedNotices] = useWebViewState<DismissedCopyrightNotices>(
    'copyrightNoticeDismissedFor',
    NO_DISMISSALS,
  );

  const dismiss = useCallback(() => {
    if (projectId) setDismissedNotices({ ...dismissedNotices, [projectId]: true });
  }, [dismissedNotices, projectId, setDismissedNotices]);

  if (!projectId || !notice || dismissedNotices[projectId]) return undefined;

  return (
    <CopyrightNoticeBanner
      notice={notice}
      name={name}
      fullName={fullName}
      localizedStrings={localizedStrings}
      onDismiss={dismiss}
      onOpenUrl={openExternalUrl}
    />
  );
}

export default ProjectCopyrightNotice;
