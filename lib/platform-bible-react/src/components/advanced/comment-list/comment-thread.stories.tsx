import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CommentStatus,
  CommentType,
  LanguageStrings,
  LegacyComment,
  LegacyCommentThread,
} from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { CommentThread } from './comment-thread.component';
import { verseTextConflictReplacementSample } from './comment-sample.data';
import { AddCommentToThreadOptions } from './comment-list.types';
import { ConflictResolution, ConflictResolutionOptions } from './conflict-note-card.types';

// Combined map: the CommentList comment_* keys plus the ConflictNoteCard conflict_note_* keys, so
// both the thread chrome and the conflict card render fully localized. Mirrors the map in
// comment-list.stories.tsx.
const localizedStrings: LanguageStrings = {
  '%comment_assign_team%': 'Team',
  '%comment_assign_unassigned%': 'Unassigned',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_assigning_to%': 'Assigning to: {assignedUser}',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
  '%comment_reopenResolved%': 'Adding a comment will re-open this discussion...',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_status_resolved%': 'Marked as resolved',
  '%comment_status_todo%': 'Re-opened',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%conflict_note_description_verseText%': 'Conflicting changes were made to the verse text.',
  '%conflict_note_choose_label%': 'Choose:',
  '%conflict_note_choose_aria_label%': 'Choose resolution',
  '%conflict_note_accept%': 'Accept',
  '%conflict_note_reject%': 'Reject',
  '%conflict_note_rejected_label%': 'Rejected',
  '%conflict_note_accepted_label%': 'Accepted',
  '%conflict_note_result_label%': 'Result',
  '%conflict_note_resolve%': 'Resolve',
  '%conflict_note_stale_notice%':
    'The verse has been edited since this conflict was recorded, so rejecting is no longer available. Accept keeps the current text.',
  '%conflict_note_outcome_used_other%': 'Used the other change instead of the current text.',
  '%conflict_note_outcome_combined%': 'Combined both changes.',
};

const CURRENT_USER = 'Current User';
const VERSE_REF = 'MAT 2:1';
// The captured conflict sample's thread id — every reply must share it so they land on one thread.
const THREAD_ID = verseTextConflictReplacementSample.thread;

const mockAssignableUsers: string[] = ['', 'Team', 'Grace Hill', 'Tim Steenwyk', CURRENT_USER];

// Hand-written discussion replies (clearly sample text) that hang off the same thread id as the
// captured conflict, with later dates than the conflict comment: a teammate asks which side is
// right, and the assignee (the current user) answers.
const discussionReplies: LegacyComment[] = [
  {
    id: 'conflict-replacement/Grace Hill/2011-08-17T09:12:00.0000000-04:00',
    thread: THREAD_ID,
    user: 'Grace Hill',
    verseRef: VERSE_REF,
    language: 'en',
    date: '2011-08-17T09:12:00.0000000-04:00',
    deleted: false,
    hideInTextWindow: false,
    isRead: false,
    startPosition: 0,
    selectedText: '',
    contents: 'Which side is right here — do we keep "city" or go back to "village"?',
  },
  {
    id: 'conflict-replacement/Current User/2011-08-17T10:03:00.0000000-04:00',
    thread: THREAD_ID,
    user: CURRENT_USER,
    verseRef: VERSE_REF,
    language: 'en',
    date: '2011-08-17T10:03:00.0000000-04:00',
    deleted: false,
    hideInTextWindow: false,
    isRead: false,
    startPosition: 0,
    selectedText: '',
    contents: 'The team agreed on "city", so let us accept that side (keep the current text).',
  },
];

// A plain normal (non-conflict) thread — a note plus one reply — for the Default contrast anchor.
// Shares the wrapper's thread id and verse ref so the same wrapper drives it unchanged.
const normalThreadComments: LegacyComment[] = [
  {
    id: 'conflict-replacement/Grace Hill/2011-08-15T08:00:00.0000000-04:00',
    thread: THREAD_ID,
    user: 'Grace Hill',
    verseRef: VERSE_REF,
    language: 'en',
    date: '2011-08-15T08:00:00.0000000-04:00',
    deleted: false,
    hideInTextWindow: false,
    isRead: false,
    startPosition: 0,
    selectedText: '',
    contents: 'Should "king" be capitalized here, or stay lowercase like the rest of the chapter?',
  },
  {
    id: 'conflict-replacement/Tim Steenwyk/2011-08-15T09:30:00.0000000-04:00',
    thread: THREAD_ID,
    user: 'Tim Steenwyk',
    verseRef: VERSE_REF,
    language: 'en',
    date: '2011-08-15T09:30:00.0000000-04:00',
    deleted: false,
    hideInTextWindow: false,
    isRead: false,
    startPosition: 0,
    selectedText: '',
    contents: 'Lowercase is consistent with the rest of the chapter — let us keep it as is.',
  },
];

// A pre-existing resolution reply for the already-resolved variant, resolved by REJECT. In
// production PT9's SaveEdits appends a Resolved comment like this when a conflict is resolved and
// records conflictResolutionAction: 'replaced' for a reject; here it is a static sample. The action
// makes CommentItem render the localized outcome line (instead of the empty body) and makes the
// read-only card show the rejected-side Result.
const preExistingResolutionReply: LegacyComment = {
  id: 'conflict-replacement/Current User/2011-08-17T10:45:00.0000000-04:00',
  thread: THREAD_ID,
  user: CURRENT_USER,
  verseRef: VERSE_REF,
  language: 'en',
  date: '2011-08-17T10:45:00.0000000-04:00',
  deleted: false,
  hideInTextWindow: false,
  isRead: true,
  startPosition: 0,
  selectedText: '',
  status: 'Resolved',
  // Empty body, as the real resolution comment has — the outcome line is rendered from the action.
  contents: "<blockquote lang='en' style='text-align:left'></blockquote>",
  conflictResolutionAction: 'replaced',
};

type CommentThreadStoryProps = {
  /** Comments the thread starts with (first entry is the conflict, the rest are replies). */
  initialComments: LegacyComment[];
  /** Thread status the story starts in. */
  initialStatus: CommentStatus;
  /** Thread type; defaults to 'Conflict'. The Default story passes 'Normal' for a contrast anchor. */
  threadType?: CommentType;
  /** Overrides which resolution actions are offered; defaults to the fully-available case. */
  getConflictResolutionOptionsCallback?: (threadId: string) => Promise<ConflictResolutionOptions>;
};

/**
 * Stateful wrapper mirroring CommentListStory's setState idiom, scoped to a single conflict thread.
 * Holds the comments, the thread status, and which thread is selected so the reply editor, resolve
 * flow, and read/expand state all behave like the real CommentList would drive them.
 */
function CommentThreadStory({
  initialComments,
  initialStatus,
  threadType = 'Conflict',
  getConflictResolutionOptionsCallback,
}: CommentThreadStoryProps) {
  const [comments, setComments] = useState<LegacyComment[]>(initialComments);
  const [status, setStatus] = useState<CommentStatus>(initialStatus);
  // Start expanded so the card, replies, and reply editor are all visible immediately.
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(THREAD_ID);

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId((current) => (current === threadId ? undefined : threadId));
  };

  const handleAddCommentToThread = async (
    options: AddCommentToThreadOptions,
  ): Promise<string | undefined> => {
    const { contents, status: newStatus } = options;
    const newCommentId = `${THREAD_ID}/${CURRENT_USER}/${new Date().toISOString()}`;
    const newComment: LegacyComment = {
      id: newCommentId,
      thread: THREAD_ID,
      user: CURRENT_USER,
      verseRef: VERSE_REF,
      language: 'en',
      date: new Date().toISOString(),
      deleted: false,
      hideInTextWindow: false,
      isRead: false,
      startPosition: 0,
      selectedText: '',
      contents: contents ?? '',
      ...(newStatus && { status: newStatus }),
    };
    setComments((prev) => [...prev, newComment]);
    if (newStatus) setStatus(newStatus);
    return newCommentId;
  };

  // Mocks PT9's SaveEdits: on resolve, append a Resolved reply describing the outcome (by the
  // current user) AND flip the thread to Resolved. This is story-only state, NOT backend behavior —
  // production runs this through the comments data provider's resolveConflict.
  const handleResolveConflict = async (
    _threadId: string,
    resolution: ConflictResolution,
  ): Promise<boolean> => {
    const resolutionReply: LegacyComment = {
      id: `${THREAD_ID}/${CURRENT_USER}/${new Date().toISOString()}`,
      thread: THREAD_ID,
      user: CURRENT_USER,
      verseRef: VERSE_REF,
      language: 'en',
      date: new Date().toISOString(),
      deleted: false,
      hideInTextWindow: false,
      isRead: false,
      startPosition: 0,
      selectedText: '',
      status: 'Resolved',
      contents:
        resolution === 'accept'
          ? 'Resolved: kept the current text.'
          : 'Resolved: replaced with the other change.',
      // Mirror the backend: a reject writes the losing side and records 'replaced' on the
      // resolution comment (which makes CommentItem render the outcome line and the card show the
      // rejected-side Result); an accept writes nothing and records no action.
      ...(resolution === 'reject' && { conflictResolutionAction: 'replaced' }),
    };
    setComments((prev) => [...prev, resolutionReply]);
    setStatus('Resolved');
    return true;
  };

  const handleUpdateComment = async (commentId: string, contents: string): Promise<boolean> => {
    let commentFound = false;
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          commentFound = true;
          return { ...comment, contents };
        }
        return comment;
      }),
    );
    return commentFound;
  };

  const handleDeleteComment = async (commentId: string): Promise<boolean> => {
    let commentFound = false;
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          commentFound = true;
          return { ...comment, deleted: true };
        }
        return comment;
      }),
    );
    return commentFound;
  };

  // Allow edit/delete only for the current user's most recent (non-deleted) comment.
  const canUserEditOrDeleteCommentCallback = useMemo(
    () =>
      async (commentId: string): Promise<boolean> => {
        const active = comments.filter((comment) => !comment.deleted);
        const last = active[active.length - 1];
        return !!last && last.id === commentId && last.user === CURRENT_USER;
      },
    [comments],
  );

  const thread: LegacyCommentThread = useMemo(
    () => ({
      id: THREAD_ID,
      comments,
      status,
      type: threadType,
      assignedUser: CURRENT_USER,
      modifiedDate: comments[comments.length - 1]?.date ?? verseTextConflictReplacementSample.date,
      verseRef: VERSE_REF,
      isSpellingNote: false,
      isBTNote: false,
      isConsultantNote: false,
      isRead: false,
    }),
    [comments, status, threadType],
  );

  return (
    <div className="tw:max-w-md tw:rounded-md tw:border">
      <CommentThread
        comments={comments}
        localizedStrings={localizedStrings}
        currentUser={CURRENT_USER}
        isSelected={selectedThreadId === THREAD_ID}
        verseRef={VERSE_REF}
        assignedUser={CURRENT_USER}
        handleSelectThread={handleSelectThread}
        threadId={THREAD_ID}
        thread={thread}
        threadStatus={status}
        handleAddCommentToThread={handleAddCommentToThread}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
        handleReadStatusChange={(threadId, markRead) => {
          console.log(`Marking thread ${threadId} as ${markRead ? 'read' : 'unread'}`);
        }}
        assignableUsers={mockAssignableUsers}
        canUserAddCommentToThread
        canUserAssignThreadCallback={async () => true}
        canUserResolveThreadCallback={async () => true}
        canUserEditOrDeleteCommentCallback={canUserEditOrDeleteCommentCallback}
        isRead={false}
        handleResolveConflict={handleResolveConflict}
        getConflictResolutionOptionsCallback={
          getConflictResolutionOptionsCallback ?? (async () => 'acceptOrReject')
        }
      />
    </div>
  );
}

const meta: Meta<typeof CommentThread> = {
  title: 'Advanced/CommentThread',
  component: CommentThread,
  tags: ['autodocs', 'test'],
};

export default meta;

type Story = StoryObj<typeof CommentThreadStory>;

/**
 * A normal (type 'Normal') discussion thread with one reply, rendered by the same wrapper — a
 * visual contrast anchor beside the three conflict stories below. No ConflictNoteCard here: the
 * thread renders ordinary comment items and the standard resolve controls.
 */
export const Default: Story = {
  render: () => (
    <CommentThreadStory
      initialComments={normalThreadComments}
      initialStatus="Todo"
      threadType="Normal"
    />
  ),
};

/**
 * A COMPLETE verseText conflict thread as it looks in production, expanded by default:
 *
 * - The first comment is the captured conflict sample (`verseTextConflictReplacementSample`),
 *   rendered by the ConflictNoteCard with struck-red "town" and green "village"/"city".
 * - The thread is assigned to the current user, so the "Assigned to Current User" badge shows.
 * - Two hand-written discussion replies follow (a teammate asks which side is right; the assignee
 *   answers), and the reply editor at the bottom genuinely appends new replies.
 *
 * Clicking Resolve is interactive: it appends a Resolved reply describing the outcome (by the
 * current user) and flips the thread to Resolved, so the card locks into its read-only state. That
 * appended reply is a MOCK of the resolution comment PT9's SaveEdits writes in production — this
 * story fakes it in local state; it is NOT backend behavior (the real flow goes through the
 * comments data provider's resolveConflict).
 */
export const CompleteConflictThread: Story = {
  render: () => (
    <CommentThreadStory
      initialComments={[verseTextConflictReplacementSample, ...discussionReplies]}
      initialStatus="Todo"
    />
  ),
};

/**
 * The same thread already Resolved by REJECT, including the pre-existing resolution reply (which
 * carries conflictResolutionAction: 'replaced'). The ConflictNoteCard renders read-only (selector
 * and Resolve button hidden) and its Result shows the rejected side ("village"), while the
 * resolution reply renders the localized outcome line ("Used the other change...") instead of an
 * empty body. The full discussion stays visible.
 */
export const ResolvedConflictThread: Story = {
  render: () => (
    <CommentThreadStory
      initialComments={[
        verseTextConflictReplacementSample,
        ...discussionReplies,
        preExistingResolutionReply,
      ]}
      initialStatus="Resolved"
    />
  ),
};

/**
 * The conflict's verse was edited after the merge (stale): the options callback returns 'accept',
 * so Reject is disabled with an explanation tooltip while the full thread context stays visible.
 */
export const StaleConflictThread: Story = {
  render: () => (
    <CommentThreadStory
      initialComments={[verseTextConflictReplacementSample, ...discussionReplies]}
      initialStatus="Todo"
      getConflictResolutionOptionsCallback={async () => 'accept'}
    />
  ),
};
