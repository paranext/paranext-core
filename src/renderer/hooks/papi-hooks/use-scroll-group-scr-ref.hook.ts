import {
  getScrRefForProject,
  getScrRefForProjectSync,
  getScrRefSourceProjectIdSync,
  getScrRefSync,
  onDidChangeVersification,
  onDidUpdateScrRef,
  setScrRefSync,
} from '@renderer/services/scroll-group.service-host';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEvent, usePromise } from 'platform-bible-react';
import { compareScrRefs, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

  // Bump a generation counter when any tracked project's versification changes mid-session so every
  // consumer re-runs its conversion once (see scroll-group.service-host emit). Blunt by design:
  // versification changes are rare and deliberate.
  const [versificationGeneration, setVersificationGeneration] = useState(0);
  useEvent(
    onDidChangeVersification,
    useCallback(() => setVersificationGeneration((generation) => generation + 1), []),
  );

  // Whether the followed ref needs converting into this consumer's project versification for
  // display. False when there is no target project or the source project already matches it. This gate
  // is load-bearing: it is ALSO what keeps an independent (object) ref — whose source is this project
  // (see extractSourceProjectId) — from ever calling getScrRefForProject with an undefined scroll
  // group id, which the host would coerce to group 0 and convert the wrong group's reference.
  // `!!projectId` (not `Boolean(projectId)`) so the value is a true boolean AND TypeScript still
  // narrows `projectId` to `string` at the guarded getScrRefForProject / getScrRefForProjectSync call
  // sites below — `Boolean(...)` is an opaque call that would drop that narrowing.
  const isConversionRequired = !!projectId && sourceProjectIdLocal !== projectId;

  // Convert the followed (raw) ref into this consumer's project versification for display only,
  // falling back to the raw ref if conversion fails. Only invoked by usePromise when a conversion is
  // needed (see the `undefined` factory below), so `projectId` is defined when this actually runs.
  // `sourceProjectIdLocal` is a dependency (and gates the early return) so a source-only change — a
  // same-numbered ref set by a different-versification project, which leaves `scrRefLocal`'s identity
  // unchanged because compareScrRefs is versification-blind — still recreates this factory and
  // re-runs the conversion against the new source project.
  const convertScrRef = useCallback(async () => {
    // Same gate as `isConversionRequired`, inlined so react-hooks/exhaustive-deps sees the real
    // reactive inputs (`projectId`, `sourceProjectIdLocal`) directly. Referencing the derived
    // `isConversionRequired` const instead makes the rule demand it be listed — and then demand
    // `sourceProjectIdLocal` be REMOVED as redundant, which would drop the source-only re-conversion
    // this factory depends on (see the comment above).
    if (!projectId || sourceProjectIdLocal === projectId) return scrRefLocal;
    try {
      return await getScrRefForProject(scrollGroupIdLocalRef.current, projectId);
    } catch {
      return scrRefLocal;
    }
    // versificationGeneration is an intentional invalidation token (bumped on a mid-session
    // versification change) so this factory's identity changes and usePromise re-runs the conversion.
    // It is deliberately not read in the body; exhaustive-deps cannot model an invalidation token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, scrRefLocal, sourceProjectIdLocal, versificationGeneration]);

  // Seed with the synchronously-known conversion (a cached result, or the raw ref) so a revisited
  // verse displays correctly with no flash. `preserveValue: true` keeps the PREVIOUS converted verse
  // on screen while a fresh conversion is in flight, rather than resetting to the raw source-frame
  // seed. Trade-off (deliberate): on an uncached forward move, a differently-versified follower
  // briefly lags on the previous verse instead of flashing the wrong-versification verse — judged the
  // less jarring transient for readers, and moot once cached. Memoized so the cache-key serialization
  // inside getScrRefForProjectSync runs once per verse change rather than on every render.
  // `sourceProjectIdLocal` is a dependency so a source-only change — a same-numbered ref set by a
  // different-versification project, which leaves `scrRefLocal`'s identity unchanged because
  // compareScrRefs is versification-blind — still recomputes the seed, consistent with
  // `convertScrRef` above.
  const conversionSeed = useMemo(
    () =>
      isConversionRequired
        ? getScrRefForProjectSync(scrollGroupIdLocalRef.current, projectId)
        : scrRefLocal,
    // Two dependencies here are intentionally not read in the memo body — exhaustive-deps cannot
    // model either:
    // - `sourceProjectIdLocal`: a source-only change (see comment above) leaves every other dep
    //   unchanged, so without this the seed would silently keep the previous source's frame.
    // - `versificationGeneration`: an invalidation token bumped on a mid-session versification
    //   change, so this memo recomputes the seed from the (now-updated) sync cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isConversionRequired, projectId, scrRefLocal, sourceProjectIdLocal, versificationGeneration],
  );
  const [convertedScrRef] = usePromise(
    isConversionRequired ? convertScrRef : undefined,
    conversionSeed,
    { preserveValue: true },
  );

  const displayScrRef = isConversionRequired ? convertedScrRef : scrRefLocal;

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
      if (newScrollGroupId !== undefined) {
        if (!setScrollGroupScrRefRef.current(newScrollGroupId)) return;
        scrollGroupIdLocalRef.current = newScrollGroupId;
        return;
      }

      // On detaching (undefined), seed the now-independent ref with what we are DISPLAYING — the
      // reference converted into this project's versification (from cache when available), not the
      // raw group ref in the source project's frame. No async correction is needed: a followed
      // verse's conversion has already resolved (and cached) by the time the user can operate the
      // scroll-group selector, so `displayScrRef` here is already the converted value. In the
      // (unreachable) case where a detach races the conversion round-trip, the pane simply keeps the
      // verse it was displaying — recoverable by navigating, no persisted write.
      if (!setScrollGroupScrRefRef.current(displayScrRef)) return;
      scrollGroupIdLocalRef.current = undefined;
    },
    [displayScrRef],
  );

  return [displayScrRef, setScrRef, scrollGroupIdLocal, setScrollGroupId];
}

export default useScrollGroupScrRef;
