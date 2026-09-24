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

/**
 * Reads the copyright notice a project needs: `undefined` when it needs none, or its notice cannot
 * be read.
 *
 * The underlying subscription keeps its previous project's value until the new one arrives, so a
 * caller whose project can change must key the component that calls this by the project id.
 */
export function useCopyrightNotice(
  projectId: string | undefined,
): ShowableCopyrightNotice | undefined {
  const [noticePossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.copyrightNotice',
    NO_NOTICE,
  );

  return useMemo(() => {
    if (!projectId) return undefined;
    if (isPlatformError(noticePossiblyError)) {
      logger.warn(`Could not read the copyright notice: ${getErrorMessage(noticePossiblyError)}`);
      return undefined;
    }
    return isShowableCopyrightNotice(noticePossiblyError) ? noticePossiblyError : undefined;
  }, [projectId, noticePossiblyError]);
}
