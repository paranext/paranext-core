import { isPlatformError, PlatformError } from 'platform-bible-utils';
import type { CheckRunnerCheckDetails, ICheckAggregatorService } from 'platform-scripture';
import { useEffect, useState } from 'react';
import {
  buildChecksInfo,
  CheckInfo,
  defaultCheckRunnerCheckDetails,
} from './checks-side-panel.utils';

/**
 * Looks up the setup status of every available check for the project, so the check type filter can
 * label the checks that need setup or do not apply. The list is empty until the lookups finish and
 * whenever there is no project, no check runner or no list of checks yet.
 *
 * @param checkAggregator Where to look up each check's setup status; undefined while it loads
 * @param projectId The project to look the setup status up for
 * @param availableChecks The checks to look up; the placeholder list `useData` returns while
 *   loading counts as no list yet
 * @param getLocalizedCheckDescription Gives the name to show for a check
 * @param refreshKey Changing it looks every check up again while the old labels stay in place, for
 *   a change to the project that can alter a check's setup status
 */
export function useChecksInfo(
  checkAggregator: Pick<ICheckAggregatorService, 'lookUpCheckSetupStatus'> | undefined,
  projectId: string | undefined,
  availableChecks: CheckRunnerCheckDetails[] | PlatformError,
  getLocalizedCheckDescription: (checkId: string) => string,
  refreshKey: number,
): CheckInfo[] {
  const [checksInfo, setChecksInfo] = useState<CheckInfo[]>([]);

  useEffect(() => {
    if (
      !checkAggregator ||
      !projectId ||
      isPlatformError(availableChecks) ||
      availableChecks.length === 0 ||
      availableChecks[0] === defaultCheckRunnerCheckDetails
    ) {
      setChecksInfo([]);
      return;
    }

    // Set false by the cleanup, so a lookup that resolves after its inputs changed is dropped
    let isCurrent = true;

    const fetchChecksInfo = async () => {
      const newChecksInfo = await buildChecksInfo(
        availableChecks,
        (checkId) => checkAggregator.lookUpCheckSetupStatus(checkId, projectId),
        getLocalizedCheckDescription,
      );
      if (isCurrent) setChecksInfo(newChecksInfo);
    };

    fetchChecksInfo();

    return () => {
      isCurrent = false;
    };
  }, [checkAggregator, projectId, availableChecks, getLocalizedCheckDescription, refreshKey]);

  return checksInfo;
}
