import { useEffect, useRef, useState } from 'react';

/**
 * Thread ids the `'unsaved'` preset should show, frozen at the moment the preset is (most recently)
 * entered and only ever grown -- never shrunk -- while it stays active.
 *
 * Filtering the visible thread list by the LIVE draft map (`thread.id in drafts`) unmounts a
 * thread's `CommentThread` -- and the Lexical editor holding the user's caret -- the instant its
 * draft empties: select-all + delete, or a successful submit that clears the editor. Freezing
 * membership at entry, and only ever adding to it while the preset stays active, keeps every thread
 * the user is mid-edit-in mounted for as long as they stay on this preset.
 *
 * @param preset The currently active filter preset value, compared against `'unsaved'`. Typed as
 *   `string` rather than `CommentPreset` so this hook stays free of the filters domain model -- it
 *   only ever needs to recognize the one preset value it cares about.
 * @param draftThreadIds Ids of the threads that currently have a draft. Must be a value the caller
 *   keeps referentially stable across renders that don't actually change it (e.g. via `useMemo(()
 *   => Object.keys(drafts), [drafts])`), since a fresh array every render would re-run the
 *   entry/grow effect below on every render regardless of whether anything changed.
 * @returns The frozen, grow-only membership set to filter the visible thread list by while `preset
 *   === 'unsaved'`. Meaningless for any other preset -- callers should not filter by it outside the
 *   `'unsaved'` preset, since this set is not maintained for any other selection.
 */
export function useUnsavedPresetThreadIds(
  preset: string,
  draftThreadIds: readonly string[],
): ReadonlySet<string> {
  const [memberIds, setMemberIds] = useState<ReadonlySet<string>>(() => new Set(draftThreadIds));
  // Tracks the preset value as of the PREVIOUS run of the effect below, so "just switched to
  // 'unsaved' from something else" (re-snapshot) can be told apart from "was already on
  // 'unsaved' last render too" (grow-only union).
  const previousPresetRef = useRef(preset);

  useEffect(() => {
    const enteringUnsaved = preset === 'unsaved' && previousPresetRef.current !== 'unsaved';
    previousPresetRef.current = preset;
    // Not on (or just entering) the 'unsaved' preset: nothing to maintain right now. The set is
    // left as-is rather than cleared, so the NEXT entry's "still active" branch (which only runs
    // once `enteringUnsaved` has already re-snapshotted this render) never observes a stale
    // mid-transition value -- re-snapshotting is handled entirely by the `enteringUnsaved` branch.
    if (!enteringUnsaved && preset !== 'unsaved') return;

    setMemberIds((prevMemberIds) => {
      if (enteringUnsaved) {
        // Always re-snapshot from the CURRENT draft state on every entry -- including a
        // switch-away-and-back -- so a stale membership set from a previous session on this
        // preset never lingers and a draft emptied while away is not resurrected.
        return new Set(draftThreadIds);
      }
      // Still active: grow-only union, so a thread that gains a draft while the preset stays
      // active is also shown, without ever dropping one whose draft has since emptied.
      const missingIds = draftThreadIds.filter((id) => !prevMemberIds.has(id));
      return missingIds.length === 0 ? prevMemberIds : new Set([...prevMemberIds, ...missingIds]);
    });
  }, [preset, draftThreadIds]);

  return memberIds;
}
