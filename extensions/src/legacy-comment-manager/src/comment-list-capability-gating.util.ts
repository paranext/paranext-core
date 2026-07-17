/**
 * Pure gating decision behind the comment list's write-affordance capability props (PT-4214 Stage
 * U). Extracted from `comment-list.web-view.tsx` so the deny-while-blocked / pass-through-when-not
 * decision is unit-testable without mounting the full web view (which needs a live PDP, project
 * data subscription, and papi frontend — none of which are available to this extension's plain
 * `vitest` `node` environment).
 *
 * Platform-bible-react's `CommentList` exposes no `disabled`/`readOnly` prop; these four capability
 * props ARE its mechanism for hiding/disabling the reply box, assign, resolve, and edit/delete, so
 * gating them here is the real disable path — not a cosmetic no-op. The web view's write handlers
 * additionally catch the backend write-gate rejection as defense-in-depth (see
 * `sync-edit-blocked.util.ts`).
 */

/** The comment list's four write-affordance capability props, ungated. */
export type CommentWriteCapabilities = {
  /** Whether the current user can add a comment to any thread. */
  canUserAddCommentToThread: boolean;
  /** Whether the current user can assign the given thread. */
  canUserAssignThreadCallback: (threadId: string) => Promise<boolean>;
  /** Whether the current user can resolve/reopen the given thread. */
  canUserResolveThreadCallback: (threadId: string) => Promise<boolean>;
  /** Whether the current user can edit or delete the given comment. */
  canUserEditOrDeleteCommentCallback: (commentId: string) => Promise<boolean>;
};

/**
 * Gates `capabilities` for this render: while `isSyncBlocked` is true, every capability denies —
 * the boolean is forced to `false` and each async callback resolves `false` WITHOUT invoking the
 * original (no PDP round-trip is made; the answer is definitionally "no" until the sync ends).
 *
 * While not blocked, `capabilities` is returned unchanged — the very same object and function
 * references — so the caller (and any memoization keyed on the originals' identity) is unaffected
 * when this project isn't sync-blocked.
 *
 * @param isSyncBlocked Whether this project's automatic Send/Receive currently blocks edits.
 * @param capabilities The ungated capability props to gate.
 * @returns The gated capability props.
 */
export function gateCommentWriteCapabilities(
  isSyncBlocked: boolean,
  capabilities: CommentWriteCapabilities,
): CommentWriteCapabilities {
  if (!isSyncBlocked) return capabilities;
  return {
    canUserAddCommentToThread: false,
    canUserAssignThreadCallback: async () => false,
    canUserResolveThreadCallback: async () => false,
    canUserEditOrDeleteCommentCallback: async () => false,
  };
}
