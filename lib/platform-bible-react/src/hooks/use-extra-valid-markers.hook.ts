import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { collectUsjMarkers } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Collects the markers a USJ document actually uses, for passing to a read-only editor as
 * `nodes.extraValidMarkers` so it doesn't warn "Unexpected <kind> marker" for non-built-in markers
 * (e.g. handbook/commentary markers like `\pn`, `\jmp`). The set is scoped per-resource to the
 * displayed USJ — never a global list — and is additive, so listing built-in markers is a harmless
 * no-op.
 *
 * The returned array keeps a **stable identity as long as the SET of markers doesn't change**, even
 * across new `usj` object identities (every fetch produces a fresh `usj` object). This matters
 * because editor `options` are typically memoized on this array: a churning identity would rebuild
 * `options` on every fetch and force the editor to reconcile its Lexical config (a full
 * re-serialize when `view` is part of those options, and — for panes that apply external annotation
 * marks — the destruction of every applied mark). Keying on the sorted marker VALUE avoids that
 * churn; sorting makes the key depend only on the set, not first-seen order, and order does not
 * affect marker validity so this is behavior-neutral for the editor.
 *
 * Intentionally returns every marker the resource uses — appropriate for a read-only panel where
 * `extraValidMarkers` only silences a warn-only diagnostic. See `collectUsjMarkers` for the
 * every-marker trade-off.
 *
 * @param usj The USJ being displayed, or `undefined` while it is still loading.
 * @returns The extra valid markers, with a stable array identity while the marker set is unchanged.
 *   Empty when `usj` is `undefined` or uses no markers.
 */
export function useExtraValidMarkers(usj: Usj | undefined): string[] {
  // Key on the sorted marker set as a single string so the identity below only changes when the SET
  // of markers changes, not on every new `usj` object.
  const markersKey = useMemo(() => collectUsjMarkers(usj).slice().sort().join(' '), [usj]);
  return useMemo(() => (markersKey ? markersKey.split(' ') : []), [markersKey]);
}

export default useExtraValidMarkers;
