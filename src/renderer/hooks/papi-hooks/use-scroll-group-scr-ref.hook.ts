import {
  getScrRefSourceProjectIdSync,
  getScrRefSync,
  onDidUpdateScrRef,
  setScrRefSync,
} from '@renderer/services/scroll-group.service-host';
import { useProjectDataProvider } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEvent } from 'platform-bible-react';
import { compareScrRefs, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Minimal surface of `IVersificationProjectDataProvider` needed for reference conversion. Declared
 * locally because papi-dts compilation excludes extension typeRoots (the full type lives in
 * `platform-scripture.d.ts`).
 */
type VersificationPdp = {
  mapVerseRefBetweenProjects(
    verseRef: SerializedVerseRef,
    sourceProjectId: string | undefined,
    targetProjectId: string,
  ): Promise<SerializedVerseRef>;
};

function extractScrollGroupId(scrollGroupScrRef: ScrollGroupScrRef): ScrollGroupId | undefined {
  return typeof scrollGroupScrRef === 'number' ? scrollGroupScrRef : undefined;
}
function extractScrRef(scrollGroupScrRef: ScrollGroupScrRef): SerializedVerseRef {
  return typeof scrollGroupScrRef === 'number'
    ? getScrRefSync(scrollGroupScrRef)
    : scrollGroupScrRef;
}
function extractSourceProjectId(
  scrollGroupScrRef: ScrollGroupScrRef,
  projectId: string | undefined,
): string | undefined {
  // Following a group: the source is whichever project last set the group's ref.
  // Independent ref (object): it is the web view's own ref, so the source is this project.
  return typeof scrollGroupScrRef === 'number'
    ? getScrRefSourceProjectIdSync(scrollGroupScrRef)
    : projectId;
}

/**
 * React hook for working with a {@link ScrollGroupScrRef}. Returns a value and a function to set the
 * value for both the SerializedVerseRef and the {@link ScrollGroupId} for the provided
 * `scrollGroupScrRef`. Use similarly to `useState`.
 *
 * @param scrollGroupScrRef {@link ScrollGroupScrRef} representing a scroll group and/or Scripture
 *   reference. Defaults to 0 meaning synced with scroll group 0 (A in English)
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param setScrollGroupScrRef Function to run to set `scrollGroupScrRef`. Should return `true` if
 *   actually updated any properties; `false` otherwise
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that updating this parameter will not cause a new
 *   callback to be returned. However, because this is just used when needed and doesn't have any
 *   reason to render changes, this has no adverse effect on the functionality of this hook. It will
 *   always set using the latest value of this callback
 * @param projectId Optional project id for the consuming web view. When provided, the returned
 *   `scrRef` is converted into this project's versification for display. `setScrRef` stamps the
 *   scroll group with this project as the source.
 * @returns `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`
 *
 *   - `scrRef`: The current value for the Scripture reference this `scrollGroupScrRef` represents,
 *       converted into `projectId`'s versification when a `projectId` is provided
 *   - `setScrRef`: Function to use to update the Scripture reference this `scrollGroupScrRef`
 *       represents. If it is synced to a scroll group, sets the scroll group's Scripture reference
 *   - `scrollGroupId`: The current value for the scroll group this `scrollGroupScrRef` is synced with.
 *       If not synced to a scroll group, this is `undefined`
 *   - `setScrollGroupId`: Function to use to update the scroll group with which this
 *       `scrollGroupScrRef` is synced
 */
export function useScrollGroupScrRef(
  scrollGroupScrRef: ScrollGroupScrRef | undefined,
  setScrollGroupScrRef: (scrollGroupScrRef: ScrollGroupScrRef) => boolean,
  projectId?: string,
): [
  scrRef: SerializedVerseRef,
  setScrRef: (newScrRef: SerializedVerseRef) => void,
  scrollGroupId: ScrollGroupId | undefined,
  setScrollGroupId: (newScrollGroupId: ScrollGroupId | undefined) => void,
] {
  // Default scroll group is 0
  const scrollGroupScrRefDefaulted = scrollGroupScrRef ?? 0;

  // Use setScrollGroupScrRef as a ref so it doesn't update dependency arrays
  const setScrollGroupScrRefRef = useRef(setScrollGroupScrRef);
  setScrollGroupScrRefRef.current = setScrollGroupScrRef;

  const scrollGroupIdLocalRef = useRef(extractScrollGroupId(scrollGroupScrRefDefaulted));
  const [scrollGroupIdLocal, setScrollGroupIdLocal] = useState(scrollGroupIdLocalRef.current);
  const [scrRefLocal, setScrRefLocal] = useState(() => extractScrRef(scrollGroupScrRefDefaulted));
  const setScrRefLocalIfDifferent = useCallback((updatedScrRef: SerializedVerseRef) => {
    setScrRefLocal((currentScrRef) => {
      if (compareScrRefs(currentScrRef, updatedScrRef) !== 0) return updatedScrRef;
      return currentScrRef;
    });
  }, []);

  const [sourceProjectIdLocal, setSourceProjectIdLocal] = useState(() =>
    extractSourceProjectId(scrollGroupScrRefDefaulted, projectId),
  );

  // If the prop changes meaning the scroll group changes or the independent scrRef changes, update
  useEffect(() => {
    const updatedScrollGroupId = extractScrollGroupId(scrollGroupScrRefDefaulted);
    const updatedScrRef = extractScrRef(scrollGroupScrRefDefaulted);

    scrollGroupIdLocalRef.current = updatedScrollGroupId;
    setScrollGroupIdLocal(updatedScrollGroupId);

    setScrRefLocalIfDifferent(updatedScrRef);
    setSourceProjectIdLocal(extractSourceProjectId(scrollGroupScrRefDefaulted, projectId));
  }, [scrollGroupScrRefDefaulted, setScrRefLocalIfDifferent, projectId]);

  // If the scrRef value changes while we're on a selected scroll group, update
  useEvent(
    onDidUpdateScrRef,
    useCallback(
      ({ scrRef: updatedScrRef, scrollGroupId: scrollGroupToUpdate, sourceProjectId }) => {
        if (scrollGroupToUpdate === scrollGroupIdLocalRef.current) {
          setScrRefLocalIfDifferent(updatedScrRef);
          setSourceProjectIdLocal(sourceProjectId);
        }
      },
      [setScrRefLocalIfDifferent],
    ),
  );

  // Change the scrRef and update ours if successful
  const setScrRef = useCallback(
    (newScrRef: SerializedVerseRef) => {
      // If we are synced to a scroll group, set it. If it didn't change, return
      if (
        scrollGroupIdLocalRef.current !== undefined &&
        !setScrRefSync(scrollGroupIdLocalRef.current, newScrRef, projectId)
      )
        return;

      // If we aren't synced with a scroll group, update the web view definition with the new scrRef
      // Otherwise, manually update our scr ref
      if (scrollGroupIdLocalRef.current === undefined) setScrollGroupScrRefRef.current(newScrRef);
      else setScrRefLocalIfDifferent(newScrRef);
    },
    [setScrRefLocalIfDifferent, projectId],
  );

  // Change the scroll group and update ours if successful
  const setScrollGroupId = useCallback(
    (newScrollGroupId: ScrollGroupId | undefined) => {
      if (
        !setScrollGroupScrRefRef.current(
          newScrollGroupId === undefined ? scrRefLocal : newScrollGroupId,
        )
      )
        return;

      scrollGroupIdLocalRef.current = newScrollGroupId;
    },
    [scrRefLocal],
  );

  // Convert the followed (raw) ref into this consumer's project versification for display only.
  type UseVersificationPdp = (
    projectInterface: string,
    projectId: string | undefined,
  ) => VersificationPdp | undefined;
  // 'platformScripture.Versification' is registered by an extension; papi-dts compilation excludes
  // extension typeRoots so the literal is not assignable to ProjectInterface there.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const versificationPdp = (useProjectDataProvider as unknown as UseVersificationPdp)(
    'platformScripture.Versification',
    projectId,
  );
  const [convertedScrRef, setConvertedScrRef] = useState(scrRefLocal);

  useEffect(() => {
    // Pass-through when we have no target project, no PDP yet, or source === target.
    if (!projectId || !versificationPdp || sourceProjectIdLocal === projectId) {
      setConvertedScrRef(scrRefLocal);
      return undefined;
    }
    let cancelled = false;
    versificationPdp
      .mapVerseRefBetweenProjects(scrRefLocal, sourceProjectIdLocal, projectId)
      .then((converted) => {
        if (!cancelled) setConvertedScrRef(converted);
        return undefined;
      })
      .catch(() => {
        if (!cancelled) setConvertedScrRef(scrRefLocal); // pass-through on error
      });
    return () => {
      cancelled = true; // stale-result guard
    };
  }, [versificationPdp, projectId, scrRefLocal, sourceProjectIdLocal]);

  return [convertedScrRef, setScrRef, scrollGroupIdLocal, setScrollGroupId];
}

export default useScrollGroupScrRef;
