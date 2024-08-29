import {
  getScrRefSync,
  onDidUpdateScrRef,
  setScrRefSync,
} from '@renderer/services/scroll-group.service-host';
import { ScrollGroup, ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { useEvent } from 'platform-bible-react';
import { compareScrRefs, ScriptureReference } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

function extractScrollGroup(scrollGroupScrRef: ScrollGroupScrRef): ScrollGroup | undefined {
  return typeof scrollGroupScrRef === 'number' ? scrollGroupScrRef : undefined;
}
function extractScrRef(scrollGroupScrRef: ScrollGroupScrRef): ScriptureReference {
  return typeof scrollGroupScrRef === 'number'
    ? getScrRefSync(scrollGroupScrRef)
    : scrollGroupScrRef;
}

/**
 * React hook for working with a {@link ScrollGroupScrRef}. Returns a value and a function to set the
 * value for both the {@link ScriptureReference} and the {@link ScrollGroup} for the provided
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
 * @returns `[scrRef, setScrRef, scrollGroup, setScrollGroup]`
 *
 *   - `scrRef`: The current value for the Scripture reference this `scrollGroupScrRef` represents
 *   - `setScrRef`: Function to use to update the Scripture reference this `scrollGroupScrRef`
 *       represents. If it is synced to a scroll group, sets the scroll group's Scripture reference
 *   - `scrollGroup`: The current value for the scroll group this `scrollGroupScrRef` is synced with. If
 *       not synced to a scroll group, this is `undefined`
 *   - `setScrollGroup`: Function to use to update the scroll group with which this `scrollGroupScrRef`
 *       is synced
 */
export default function useScrollGroupScrRef(
  scrollGroupScrRef: ScrollGroupScrRef | undefined,
  setScrollGroupScrRef: (scrollGroupScrRef: ScrollGroupScrRef) => boolean,
): [
  scrRef: ScriptureReference,
  setScrRef: (newScrRef: ScriptureReference) => void,
  scrollGroup: ScrollGroup | undefined,
  setScrollGroup: (newScrollGroup: ScrollGroup | undefined) => void,
] {
  // Default scroll group is 0
  const scrollGroupScrRefDefaulted = scrollGroupScrRef ?? 0;

  // Use setScrollGroupScrRef as a ref so it doesn't update dependency arrays
  const setScrollGroupScrRefRef = useRef(setScrollGroupScrRef);
  setScrollGroupScrRefRef.current = setScrollGroupScrRef;

  const scrollGroupRef = useRef(extractScrollGroup(scrollGroupScrRefDefaulted));
  const [scrollGroup, setScrollGroupLocal] = useState(scrollGroupRef.current);
  const [scrRefLocal, setScrRefLocal] = useState(() => extractScrRef(scrollGroupScrRefDefaulted));
  const setScrRefLocalIfDifferent = useCallback((updatedScrRef: ScriptureReference) => {
    setScrRefLocal((currentScrRef) => {
      if (compareScrRefs(currentScrRef, updatedScrRef) !== 0) return updatedScrRef;
      return currentScrRef;
    });
  }, []);

  // If the prop changes meaning the scroll group changes or the independent scrRef changes, update
  useEffect(() => {
    const updatedScrollGroup = extractScrollGroup(scrollGroupScrRefDefaulted);
    const updatedScrRef = extractScrRef(scrollGroupScrRefDefaulted);

    scrollGroupRef.current = updatedScrollGroup;
    setScrollGroupLocal(updatedScrollGroup);

    setScrRefLocalIfDifferent(updatedScrRef);
  }, [scrollGroupScrRefDefaulted, setScrRefLocalIfDifferent]);

  // If the scrRef value changes while we're on a selected scroll group, update
  useEvent(
    onDidUpdateScrRef,
    useCallback(
      ({ scrRef: updatedScrRef, scrollGroup: scrollGroupToUpdate }) => {
        if (scrollGroupToUpdate === scrollGroupRef.current)
          setScrRefLocalIfDifferent(updatedScrRef);
      },
      [setScrRefLocalIfDifferent],
    ),
  );

  // Change the scrRef and update ours if successful
  const setScrRef = useCallback(
    (newScrRef: ScriptureReference) => {
      // If we are synced to a scroll group, set it. If it didn't change, return
      if (scrollGroupRef.current !== undefined && !setScrRefSync(scrollGroupRef.current, newScrRef))
        return;

      // If we aren't synced with a scroll group, update the web view definition with the new scrRef
      // Otherwise, manually update our scr ref
      if (scrollGroupRef.current === undefined) setScrollGroupScrRefRef.current(newScrRef);
      else setScrRefLocalIfDifferent(newScrRef);
    },
    [setScrRefLocalIfDifferent],
  );

  // Change the scroll group and update ours if successful
  const setScrollGroup = useCallback(
    (newScrollGroup: ScrollGroup | undefined) => {
      if (
        !setScrollGroupScrRefRef.current(
          newScrollGroup === undefined ? scrRefLocal : newScrollGroup,
        )
      )
        return;

      scrollGroupRef.current = newScrollGroup;
    },
    [scrRefLocal],
  );

  return [scrRefLocal, setScrRef, scrollGroup, setScrollGroup];
}
