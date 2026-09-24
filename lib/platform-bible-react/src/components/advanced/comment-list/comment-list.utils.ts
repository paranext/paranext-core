import { isMacOs } from '@/utils/platform.util';
import { LanguageStrings, LegacyComment, LocalizeKey } from 'platform-bible-utils';
import { KeyboardEvent } from 'react';
import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import { CommentDraft } from './comment-list.types';
import { ConflictResolutionOutcome, VERSE_TEXT_CONFLICT } from './conflict-note-card.types';

/**
 * Whether a thread's in-progress comment edits map has any entries. Centralized because the
 * question — is there at least one edit in progress — is asked both while updating the map and
 * while deciding whether the containing draft is empty.
 */
export function hasCommentEdits(
  commentEdits: Readonly<Record<string, SerializedEditorState>> | undefined,
): boolean {
  return commentEdits !== undefined && Object.keys(commentEdits).length > 0;
}

/**
 * A draft is empty only when none of its three parts carry anything: no unsent reply, no pending
 * assignee, and no in-progress edit to an existing comment. Centralized so every writer reports
 * emptiness the same way — get it wrong in one direction and a real draft is lost, in the other an
 * empty entry reads as a draft forever.
 */
export function isCommentDraftEmpty(draft: CommentDraft): boolean {
  return (
    draft.editorState === undefined &&
    draft.assignedUser === undefined &&
    !hasCommentEdits(draft.commentEdits)
  );
}

/**
 * Tailwind classes that render note-body HTML (PT9 blockquote/prose markup) the way note contents
 * are displayed across the comment list. Shared so every consumer stays in lockstep — a change to
 * the blockquote/prose treatment here reaches all of them. Callers compose their own extras on top
 * via `cn()`: CommentItem adds `tw:items-start tw:gap-2` + line-clamp; conflict-diff's
 * `DIFF_HTML_CLASSES` (shared by ConflictNoteCard and ConflictThreadSummary) adds its `<u>`/`<s>`
 * diff coloring.
 */
export const COMMENT_BODY_PROSE_CLASSES = [
  'tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground',
  'tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground',
  'tw:prose-quoteless',
].join(' ');

/**
 * True when the note is a verseText merge conflict - the only conflict type whose root note carries
 * discrete accept/reject/merge diff+result text and drives the ConflictNoteCard. Gated on
 * `conflictType` ALONE (not `resultText`): an empty-result verseText conflict must still render the
 * resolve UI, or it would be unresolvable, because the backend blocks resolving a verseText
 * conflict through a plain status change.
 */
export function isVerseTextConflictNote(comment: LegacyComment | undefined): boolean {
  return comment?.conflictType === VERSE_TEXT_CONFLICT;
}

/**
 * Maps a resolution comment's {@link LegacyComment.conflictResolutionAction} to the outcome it
 * represents. The single source for this classification, shared by the read-only card, the
 * collapsed summary (via useConflictResolution), and CommentItem's resolution banner so they cannot
 * drift:
 *
 * - `'replaced'` → `'reject'` (the rejected side was written into the verse)
 * - `'merged'` → `'merged'` (both changes combined)
 * - Absent → `'accept'` (accepted, no text written)
 */
export function actionToOutcome(
  action: LegacyComment['conflictResolutionAction'],
): ConflictResolutionOutcome {
  if (action === 'replaced') return 'reject';
  if (action === 'merged') return 'merged';
  return 'accept';
}

/**
 * Gets the display name for an assigned user, with localized names for special values.
 *
 * @param user - The user identifier (empty string for unassigned, 'Team' for team)
 * @param localizedStrings - The localized strings to use for display names
 * @returns The display name for the user
 */
export function getAssignedUserDisplayName(
  user: string,
  localizedStrings: LanguageStrings,
): string {
  if (user === '') {
    return localizedStrings['%comment_assign_unassigned%'] ?? 'Unassigned';
  }
  if (user === 'Team') {
    return localizedStrings['%comment_assign_team%'] ?? 'Team';
  }
  return user;
}

/**
 * Checks if the Ctrl+Enter (or Cmd+Enter on Mac) keyboard shortcut was pressed
 *
 * Used for submitting comments in the CommentEditor component
 *
 * @param event OnKeyDownCapture event
 * @returns `true` if Ctrl+Enter or Cmd+Enter was pressed, otherwise `false`
 */
export function didPressCtrlOrCmdEnter(event: KeyboardEvent): boolean {
  const isMac = isMacOs();
  return event.key === 'Enter' && ((isMac && event.metaKey) || (!isMac && event.ctrlKey));
}

/**
 * Resolves a localize key against `localizedStrings`, falling back when the key has not actually
 * resolved to translated text. `useLocalizedStrings` seeds every requested key to itself and
 * returns that seed both before the subscription delivers and permanently on a `PlatformError`, so
 * `localizedStrings[key] ?? fallback` can never catch that case — the value is a truthy string
 * equal to the key, not `undefined`. Centralized so every visible (non-aria-label) localized string
 * in this component tree resolves the same way.
 *
 * @param key The localize key to look up.
 * @param localizedStrings The localized strings to resolve `key` against.
 * @param fallback English text to show while `key` has not resolved to anything else.
 * @returns The resolved string, or `fallback` when `key` is missing or still unresolved.
 */
export function localizeOrFallback(
  key: LocalizeKey,
  localizedStrings: LanguageStrings,
  fallback: string,
): string {
  const value = localizedStrings[key];
  return value === undefined || value === key ? fallback : value;
}

/**
 * An empty Lexical editor state — the starting point for entering edit mode on a comment with no
 * existing text (e.g. a platform-created conflict-resolution comment, whose body is empty by
 * design; see `hasResolutionBodyText` in comment-item.component.tsx). `htmlToEditorState` rejects
 * empty HTML outright, so entering edit mode on an empty-bodied comment has to start from this
 * state instead of parsing the (empty) HTML.
 */
export const EMPTY_EDITOR_STATE: SerializedEditorState<
  SerializedParagraphNode & SerializedElementNode<SerializedTextNode>
> = {
  root: {
    children: [
      {
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};
