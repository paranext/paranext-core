import { useEffect, useRef, useState } from 'react';

/**
 * Thread ids a preset that needs frozen, grow-only membership should show, frozen at the moment
 * such a preset is (most recently) entered and only ever grown -- never shrunk -- while it stays
 * active.
 *
 * Two unrelated preset families share this shape, each for its own reason:
 *
 * - The `'unsaved'` preset: filtering the visible thread list by the LIVE draft map (`thread.id in
 *   drafts`) unmounts a thread's `CommentThread` -- and the Lexical editor holding the user's caret
 *   -- the instant its draft empties: select-all + delete, or a successful submit that clears the
 *   editor.
 * - The `'unread'`, `'unread-and-unresolved'` and `'unread-assigned-to-me'` presets: a thread is
 *   marked read ~5 seconds after selection, and filtering by the LIVE read state unmounts the very
 *   card the user just opened to read, taking their scroll position with it, through no action of
 *   their own.
 *
 * Freezing membership at entry, and only ever adding to it while a tracked preset stays active,
 * keeps every thread the user is mid-edit-in, or has just read, mounted for as long as they stay on
 * that preset. A side effect of this is intended, not accidental: a thread read during the visit
 * stays listed under an unread preset until the user leaves it, exactly as an unsaved thread stays
 * listed after its draft empties.
 *
 * @param preset The currently active filter preset value. Typed as `string` rather than
 *   `CommentPreset` so this hook stays free of the filters domain model -- it only ever needs to
 *   compare it for equality and test it against `isTrackedPreset`.
 * @param isTrackedPreset Whether `preset` is one this hook should maintain frozen, grow-only
 *   membership for. Passed as a plain boolean (e.g. `trackedPresets.has(preset)`) rather than a
 *   `Set` itself, so the caller's choice of tracked presets never has to be a referentially stable
 *   value for the effect below to depend on correctly.
 * @param memberThreadIds Ids of the threads that currently belong under `preset` by its own
 *   untracked, live definition -- the drafted thread ids for `'unsaved'`, or the unread thread ids
 *   for an unread preset. Must be a value the caller keeps referentially stable across renders that
 *   don't actually change it (e.g. via `useMemo`), since a fresh array every render would re-run
 *   the entry/grow effect below on every render regardless of whether anything changed.
 * @returns The frozen, grow-only membership set to filter the visible thread list by while `preset`
 *   is a tracked preset. Meaningless for any other preset -- callers should not filter by it
 *   outside the presets they pass as tracked, since this set is not maintained for any other
 *   selection.
 */
export function useFrozenPresetThreadIds(
  preset: string,
  isTrackedPreset: boolean,
  memberThreadIds: readonly string[],
): ReadonlySet<string> {
  const [memberIds, setMemberIds] = useState<ReadonlySet<string>>(
    () => new Set(isTrackedPreset ? memberThreadIds : []),
  );
  // Tracks the preset value as of the PREVIOUS run of the effect below, so "just switched to a
  // tracked preset from something else (or from a DIFFERENT tracked preset)" (re-snapshot) can be
  // told apart from "was already active on this exact preset last render too" (grow-only union).
  const previousPresetRef = useRef(preset);

  useEffect(() => {
    const entering = isTrackedPreset && previousPresetRef.current !== preset;
    previousPresetRef.current = preset;
    // Not on (or just entering) a tracked preset: nothing to maintain right now. The set is left
    // as-is rather than cleared, so the NEXT entry's "still active" branch (which only runs once
    // `entering` has already re-snapshotted this render) never observes a stale mid-transition
    // value -- re-snapshotting is handled entirely by the `entering` branch.
    if (!entering && !isTrackedPreset) return;

    setMemberIds((prevMemberIds) => {
      if (entering) {
        // Always re-snapshot from the CURRENT live membership on every entry -- including a
        // switch-away-and-back, or a switch between two different tracked presets -- so a stale
        // membership set from a previous session never lingers and a member lost while away is not
        // resurrected.
        return new Set(memberThreadIds);
      }
      // Still active: grow-only union, so a thread that newly belongs while the preset stays active
      // is also shown, without ever dropping one that no longer does.
      const missingIds = memberThreadIds.filter((id) => !prevMemberIds.has(id));
      return missingIds.length === 0 ? prevMemberIds : new Set([...prevMemberIds, ...missingIds]);
    });
  }, [preset, isTrackedPreset, memberThreadIds]);

  return memberIds;
}
