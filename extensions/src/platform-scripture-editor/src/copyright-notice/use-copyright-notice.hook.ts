import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import type { CopyrightNotice } from 'platform-scripture';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';
import {
  isShowableCopyrightNotice,
  type ShowableCopyrightNotice,
} from './copyright-notice-message.utils';

const NO_NOTICE: CopyrightNotice = { kind: 'none' };

export type ProjectCopyrightNoticeInfo = {
  /** `undefined` when the project needs no notice, or its notice cannot be read */
  notice: ShowableCopyrightNotice | undefined;
  name: string;
  fullName: string;
};

/** Reads the copyright notice a project needs, with the names the notice shows */
export function useCopyrightNotice(projectId: string | undefined): ProjectCopyrightNoticeInfo {
  const [noticePossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.copyrightNotice',
    NO_NOTICE,
  );
  const [namePossiblyError] = useProjectSetting(projectId, 'platform.name', '');
  const [fullNamePossiblyError] = useProjectSetting(projectId, 'platform.fullName', '');

  const notice = useMemo(() => {
    if (isPlatformError(noticePossiblyError)) {
      logger.warn(`Could not read the copyright notice: ${getErrorMessage(noticePossiblyError)}`);
      return undefined;
    }
    return isShowableCopyrightNotice(noticePossiblyError) ? noticePossiblyError : undefined;
  }, [noticePossiblyError]);

  return {
    notice: projectId ? notice : undefined,
    name: isPlatformError(namePossiblyError) ? '' : namePossiblyError,
    fullName: isPlatformError(fullNamePossiblyError) ? '' : fullNamePossiblyError,
  };
}
