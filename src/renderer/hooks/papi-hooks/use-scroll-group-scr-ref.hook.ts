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
 * A resolved (async) conversion tagged with the reactive inputs it was computed for. The tag lets
 * the render decide whether the result is still current — i.e. matches the verse, source project,
 * and versification generation on screen right now — or is a leftover from an earlier phase that
 * must not be displayed. `ref` is the value to show: the converted reference on success, or the raw
 * source-frame reference on a best-effort failure.
 */
type ConversionResult = {
  scrRef: SerializedVerseRef;
  sourceProjectId: string | undefined;
  /**
   * The conversion TARGET — this consumer's project. Part of the tag because a target change must
   * invalidate a prior result, otherwise a conversion into the old target's versification would
   * show.
   */
  projectId: string | undefined;
  versificationGeneration: number;
  ref: SerializedVerseRef;
};

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
 * @returns `[scrRef, setScrRef, scrollGroupId, setScrollGroupId, sourceProjectId]`
 *
 *   - `scrRef`: The current value for the Scripture reference this `scrollGroupScrRef` represents,
 *       converted into `projectId`'s versification when a `projectId` is provided
 *   - `setScrRef`: Function to use to update the Scripture reference this `scrollGroupScrRef`
 *       represents. If it is synced to a scroll group, sets the scroll group's Scripture reference
 *   - `scrollGroupId`: The current value for the scroll group this `scrollGroupScrRef` is synced with.
 *       If not synced to a scroll group, this is `undefined`
 *   - `setScrollGroupId`: Function to use to update the scroll group with which this
 *       `scrollGroupScrRef` is synced
 *   - `sourceProjectId`: The id of the project that last set this scroll group's reference (the source
 *       frame of `scrRef`); this web view's own `projectId` when not synced to a scroll group.
 *       `undefined` when unknown
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
  sourceProjectId: string | undefined,
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
  // The result is tagged with the reactive inputs it was computed for (scrRef, source project,
  // versification generation) so the render can tell a still-current result from a leftover of an
  // earlier phase. `sourceProjectIdLocal` is a dependency (and gates the early return) so a
  // source-only change — a same-numbered ref set by a different-versification project, which leaves
  // `scrRefLocal`'s identity unchanged because compareScrRefs is versification-blind — still
  // recreates this factory and re-runs the conversion against the new source project.
  const convertScrRef = useCallback(async (): Promise<ConversionResult> => {
    // The inputs this conversion is for — must mirror this callback's full dependency set so the
    // currency check below can detect a change to ANY of them (verse, source, target, versification
    // generation). `versificationGeneration` is included (not just a dep) so a mid-session
    // versification change both re-runs the conversion AND is reflected in the tag, and exhaustive-deps
    // sees every reactive input read directly — no invalidation-token disable needed.
    const inputs = {
      scrRef: scrRefLocal,
      sourceProjectId: sourceProjectIdLocal,
      projectId,
      versificationGeneration,
    };
    // Same gate as `isConversionRequired`, inlined so react-hooks/exhaustive-deps sees the real
    // reactive inputs (`projectId`, `sourceProjectIdLocal`) directly and narrows `projectId`.
    if (!projectId || sourceProjectIdLocal === projectId) return { ...inputs, ref: scrRefLocal };
    try {
      return {
        ...inputs,
        ref: await getScrRefForProject(scrollGroupIdLocalRef.current, projectId),
      };
    } catch {
      // Best-effort: show the raw source-frame ref on failure (getScrRefForProject already logs and
      // does not cache, so this is retried on the next navigation).
      return { ...inputs, ref: scrRefLocal };
    }
  }, [projectId, scrRefLocal, sourceProjectIdLocal, versificationGeneration]);

  // Synchronously-known conversion (a cached result, or the raw ref) used ONLY as the cold-start
  // display before anything has been shown — once a verse has been displayed, an in-flight
  // conversion lingers on that last-displayed verse instead (see below). This makes a REVISITED verse
  // (already cached) display converted with no flash on first render. Memoized so getScrRefForProjectSync
  // (which serializes for the cache key) is not called on every render.
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
  const [converted] = usePromise<ConversionResult | undefined>(
    isConversionRequired ? convertScrRef : undefined,
    undefined,
    { preserveValue: true },
  );

  // The last reference actually shown, so an in-flight conversion can LINGER on it rather than flash
  // the raw source-frame ref. This is the verse that was on screen — not usePromise's frozen internal
  // value, which after a source-swap can be a conversion from an earlier phase (a backward jump).
  const lastDisplayedRef = useRef<SerializedVerseRef | undefined>(undefined);

  // The resolved conversion IFF it is for the inputs on screen RIGHT NOW, else undefined. scrRefLocal
  // is reference-stable per verse (see setScrRefLocalIfDifferent), so `===` distinguishes verse
  // changes; source project, target project, and versification generation cover the same-numbers
  // re-conversion triggers. The `converted &&` also narrows it to non-undefined for `.ref`.
  const currentConversionRef =
    converted &&
    converted.scrRef === scrRefLocal &&
    converted.sourceProjectId === sourceProjectIdLocal &&
    converted.projectId === projectId &&
    converted.versificationGeneration === versificationGeneration
      ? converted.ref
      : undefined;

  // The value to show while a conversion is required: the resolved conversion once it is current
  // (the converted ref on success, the raw ref on failure — see convertScrRef); otherwise linger on
  // the last-displayed verse while the conversion is in flight, falling back to the sync seed only at
  // cold start (nothing displayed yet). Sluggish-but-stable beats flashing a wrong-versification verse.
  const convertedDisplay = currentConversionRef ?? lastDisplayedRef.current ?? conversionSeed;
  // Our own ref when no conversion is needed; otherwise the converted/lingered value above.
  const displayScrRef = isConversionRequired ? convertedDisplay : scrRefLocal;

  useEffect(() => {
    lastDisplayedRef.current = displayScrRef;
  }, [displayScrRef]);

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

      // On detaching (undefined), seed the now-independent ref with what we are DISPLAYING
      // (`displayScrRef`) — WYSIWYG. In the common case that is the reference converted into this
      // project's versification (resolved, or lingered from the last-displayed verse — both
      // correctly framed), not the raw group ref in the source project's frame, so no async
      // correction is needed. Residual (accepted, not fixed with an async re-seed): if the
      // conversion is genuinely FAILING (see convertScrRef's catch), `displayScrRef` is the raw
      // source-frame ref, so detaching persists an unconverted reference. That is the honest
      // best-effort — when the conversion cannot succeed, the raw ref is the only value available and
      // a re-seed would fail identically — and it is recoverable by navigating.
      if (!setScrollGroupScrRefRef.current(displayScrRef)) return;
      scrollGroupIdLocalRef.current = undefined;
    },
    [displayScrRef],
  );

  return [displayScrRef, setScrRef, scrollGroupIdLocal, setScrollGroupId, sourceProjectIdLocal];
}

export default useScrollGroupScrRef;
