import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageStrings, LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import CommentList from './comment-list.component';
import { sampleComments, verseTextConflictReplacementSample } from './comment-sample.data';
import { AddCommentToThreadOptions } from './comment-list.types';
import { ConflictResolution, ConflictResolutionOptions } from './conflict-note-card.types';

const commentListLocalizedStrings: LanguageStrings = {
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
  '%conflict_note_outcome_replaced%':
    'Replaced the changes that Paratext ACCEPTED with the changes that Paratext REJECTED',
  '%conflict_note_outcome_merged%':
    'Merged the changes that Paratext ACCEPTED with the changes that Paratext REJECTED',
};

const mockAssignableUsers: string[] = ['', 'Team', 'Alice', 'Bob', 'Charlie', 'Current User'];

type CommentListStoryProps = {
  initialThreads: LegacyCommentThread[];
  canUserAddCommentToThread?: boolean;
  canUserAssignThreadCallback?: (threadId: string) => Promise<boolean>;
  canUserResolveThreadCallback?: (threadId: string) => Promise<boolean>;
  canUserEditOrDeleteCommentCallback?: (commentId: string) => Promise<boolean>;
  getConflictResolutionOptionsCallback?: (threadId: string) => Promise<ConflictResolutionOptions>;
};

function CommentListStory({
  initialThreads,
  canUserAddCommentToThread = true,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  canUserEditOrDeleteCommentCallback,
  getConflictResolutionOptionsCallback,
}: CommentListStoryProps) {
  const [threads, setThreads] = useState<LegacyCommentThread[]>(initialThreads);

  const handleAddCommentToThread = async (
    options: AddCommentToThreadOptions,
  ): Promise<string | undefined> => {
    const { threadId, contents, status, assignedUser } = options;
    console.log(`Adding comment to thread ${threadId}`, { contents, status, assignedUser });

    let newCommentId: string | undefined;

    // Find the thread and add the comment
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          newCommentId = `${thread.id}-${Date.now()}`;

          // Determine the status for the new comment
          // If explicitly provided, use it; otherwise check if thread is resolved
          let commentStatus = status;
          if (!commentStatus && thread.status === 'Resolved') {
            commentStatus = 'Todo';
          }

          const newComment: LegacyComment = {
            id: newCommentId,
            user: 'Current User',
            date: new Date().toISOString(),
            contents: contents ?? '',
            deleted: false,
            hideInTextWindow: false,
            language: 'en',
            isRead: false,
            startPosition: 0,
            selectedText: '',
            contextBefore: '',
            contextAfter: '',
            thread: thread.id,
            verseRef: thread.verseRef,
            ...(commentStatus && { status: commentStatus }),
            ...(assignedUser !== undefined && { assignedUser }),
          };
          return {
            ...thread,
            comments: [...thread.comments, newComment],
            ...(commentStatus && { status: commentStatus }),
            ...(assignedUser !== undefined && { assignedUser }),
          };
        }
        return thread;
      }),
    );

    return newCommentId;
  };

  // Mocks PT9's SaveEdits: on resolve, append a Resolved reply describing the outcome (by the
  // current user) AND flip the thread to Resolved — mirroring the resolution comment the backend
  // writes when a conflict is resolved. This is story-only state, NOT backend behavior: production
  // runs this through the comments data provider's resolveConflict.
  const handleResolveConflict = async (
    threadId: string,
    resolution: ConflictResolution,
  ): Promise<boolean> => {
    console.log(`Resolving conflict ${threadId} as ${resolution}`);
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id !== threadId) return thread;
        const resolutionReply: LegacyComment = {
          id: `${thread.id}-${Date.now()}`,
          user: 'Current User',
          date: new Date().toISOString(),
          contents:
            resolution === 'accept'
              ? 'Resolved: kept the current text.'
              : 'Resolved: replaced with the other change.',
          deleted: false,
          hideInTextWindow: false,
          language: 'en',
          isRead: false,
          startPosition: 0,
          selectedText: '',
          thread: thread.id,
          verseRef: thread.verseRef,
          status: 'Resolved',
          // Mirror the backend: a reject writes the losing side and records 'replaced' on the
          // resolution comment; an accept writes nothing and records no action.
          ...(resolution === 'reject' && { conflictResolutionAction: 'replaced' }),
        };
        return {
          ...thread,
          comments: [...thread.comments, resolutionReply],
          status: 'Resolved',
        };
      }),
    );
    return true;
  };

  const handleUpdateComment = async (commentId: string, contents: string): Promise<boolean> => {
    console.log(`Updating comment id ${commentId} with contents: ${contents}`);

    let commentFound = false;

    // Find the comment and update its contents
    setThreads((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id === commentId) {
            commentFound = true;
            return {
              ...comment,
              contents,
            };
          }
          return comment;
        }),
      })),
    );

    return commentFound;
  };

  // This mock function simulates deleting a comment by setting its 'deleted' flag to true.
  // In reality Paratext 9 actually removes the comment from the project instead of using this flag.
  // The implementation can be found in `RemoveComment` on the `CommentManager` class in `ParatextData`
  const handleDeleteComment = async (commentId: string): Promise<boolean> => {
    console.log(`Deleting comment id ${commentId}`);

    let commentFound = false;

    // Find the comment and mark it as deleted, then remove threads where all comments are deleted
    setThreads((prevThreads) =>
      prevThreads
        .map((thread) => ({
          ...thread,
          comments: thread.comments.map((comment) => {
            if (comment.id === commentId) {
              commentFound = true;
              return {
                ...comment,
                deleted: true,
              };
            }
            return comment;
          }),
        }))
        .filter((thread) => thread.comments.some((comment) => !comment.deleted)),
    );

    return commentFound;
  };

  // Default permission callback for edit/delete - only allow for current user's comments
  // and only if the comment is the last (most recent) in the thread
  const defaultCanUserEditOrDeleteCallback = useMemo(() => {
    return async (commentId: string): Promise<boolean> => {
      console.log(`Checking if user can edit/delete comment ${commentId}`);
      const thread = threads.find((t) => t.comments.some((c) => c.id === commentId && !c.deleted));
      if (!thread) return false;

      const activeComments = thread.comments.filter((c) => !c.deleted);
      const lastComment = activeComments[activeComments.length - 1];
      if (!lastComment || lastComment.id !== commentId) return false;

      return lastComment.user === 'Current User';
    };
  }, [threads]);

  // Default callback for read status change
  const threadReadStatusChangeCallback = useMemo(() => {
    return async (threadId: string, markRead: boolean): Promise<boolean> => {
      console.log(`Marking thread ${threadId} as ${markRead ? 'read' : 'unread'}`);
      return true;
    };
  }, []);

  return (
    <CommentList
      threads={threads}
      localizedStrings={commentListLocalizedStrings}
      currentUser="Current User"
      handleAddCommentToThread={handleAddCommentToThread}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
      handleReadStatusChange={threadReadStatusChangeCallback}
      assignableUsers={mockAssignableUsers}
      canUserAddCommentToThread={canUserAddCommentToThread}
      canUserAssignThreadCallback={canUserAssignThreadCallback}
      canUserResolveThreadCallback={canUserResolveThreadCallback}
      canUserEditOrDeleteCommentCallback={
        canUserEditOrDeleteCommentCallback ?? defaultCanUserEditOrDeleteCallback
      }
      handleResolveConflict={handleResolveConflict}
      getConflictResolutionOptionsCallback={
        getConflictResolutionOptionsCallback ?? (async () => 'acceptOrReject')
      }
    />
  );
}

const meta: Meta<typeof CommentList> = {
  title: 'Advanced/CommentList',
  component: CommentList,
  tags: ['autodocs', 'test'],
  argTypes: {
    threads: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CommentListStory>;

// Hand-written discussion replies (clearly sample text) hanging off the captured conflict's thread
// id, with later dates and plain contents: a teammate asks which side to keep, and the assignee
// (the current user) answers. Mirrors the pattern in comment-thread.stories.tsx.
const conflictDiscussionReplies: LegacyComment[] = [
  {
    id: 'conflict-replacement/Grace Hill/2011-08-17T09:12:00.0000000-04:00',
    thread: 'conflict-replacement',
    user: 'Grace Hill',
    verseRef: 'MAT 2:1',
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
    thread: 'conflict-replacement',
    user: 'Current User',
    verseRef: 'MAT 2:1',
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

// A COMPLETE conflict thread: the captured verseText conflict as the first comment, assigned to the
// wrapper's current user (so the "Assigned to Current User" badge shows), followed by the
// hand-written discussion replies above.
const unresolvedConflictThread: LegacyCommentThread = {
  id: 'conflict-replacement',
  comments: [verseTextConflictReplacementSample, ...conflictDiscussionReplies],
  status: 'Todo',
  type: 'Conflict',
  assignedUser: 'Current User',
  modifiedDate: '2011-08-17T10:03:00.0000000-04:00',
  verseRef: 'MAT 2:1',
  isSpellingNote: false,
  isBTNote: false,
  isConsultantNote: false,
  isRead: false,
};

export const Default: Story = {
  render: () => (
    <CommentListStory
      initialThreads={sampleComments}
      canUserAssignThreadCallback={async (threadId) => {
        console.log(`Checking if user can assign thread ${threadId}`);
        return true;
      }}
      canUserResolveThreadCallback={async (threadId) => {
        console.log(`Checking if user can resolve thread ${threadId}`);
        return true;
      }}
      canUserEditOrDeleteCommentCallback={async () => {
        console.log(`Checking if user can edit/delete comment`);
        return true;
      }}
    />
  ),
};

/** Story demonstrating restricted permissions - user cannot add comments, assign, or resolve */
export const RestrictedPermissions: Story = {
  render: () => (
    <CommentListStory
      initialThreads={sampleComments}
      canUserAddCommentToThread={false}
      canUserAssignThreadCallback={async () => false}
      canUserResolveThreadCallback={async () => false}
      canUserEditOrDeleteCommentCallback={async () => false}
    />
  ),
};

/**
 * Story demonstrating automatic assignee pre-selection.
 *
 * The comment list remembers the last user explicitly assigned when adding a comment. The next new
 * comment in any thread will automatically pre-select that assignee in the dropdown.
 *
 * **To see this feature in action:**
 *
 * 1. Expand any thread and open the reply box
 * 2. Use the assign dropdown to select a user (e.g. "Alice")
 * 3. Submit the comment
 * 4. Expand a **different** thread and open its reply box
 * 5. The assign dropdown will already show "Alice" pre-selected
 */
export const AssigneePreselection: Story = {
  render: () => (
    <CommentListStory
      initialThreads={sampleComments}
      canUserAssignThreadCallback={async (threadId) => {
        console.log(`Checking if user can assign thread ${threadId}`);
        return true;
      }}
      canUserResolveThreadCallback={async (threadId) => {
        console.log(`Checking if user can resolve thread ${threadId}`);
        return true;
      }}
      canUserEditOrDeleteCommentCallback={async () => true}
    />
  ),
};

/**
 * A comment list containing a COMPLETE unresolved verseText merge conflict thread:
 *
 * - The first comment is the captured conflict sample (`verseTextConflictReplacementSample`),
 *   rendered by the ConflictNoteCard.
 * - The thread is assigned to the current user, so the "Assigned to Current User" badge shows.
 * - Two hand-written discussion replies follow (a teammate asks which side is right; the assignee
 *   answers).
 *
 * Expand it to see the ConflictNoteCard. Clicking Resolve appends a Resolved reply describing the
 * outcome (contents vary by resolution — accept vs. reject) AND flips the thread to Resolved
 * (read-only card, dimmed row). That appended reply MOCKS the resolution comment PT9's SaveEdits
 * writes in production; here the wrapper fakes it in local state — it is NOT backend behavior.
 */
export const WithUnresolvedConflict: Story = {
  render: () => <CommentListStory initialThreads={[unresolvedConflictThread, ...sampleComments]} />,
};

/**
 * The conflict's verse was edited after the merge: only Accept is offered (Reject disabled). Reuses
 * the same complete thread as WithUnresolvedConflict so the stale case shows the full discussion
 * too.
 */
export const WithStaleConflict: Story = {
  render: () => (
    <CommentListStory
      initialThreads={[unresolvedConflictThread, ...sampleComments]}
      getConflictResolutionOptionsCallback={async () => 'accept'}
    />
  ),
};
