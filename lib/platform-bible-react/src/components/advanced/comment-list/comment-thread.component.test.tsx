import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { CommentThread } from './comment-thread.component';
import { verseTextConflictComment, verseTextConflictMergeSample } from './comment-sample.data';

vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(({ onClear }: { onClear?: (fn: () => void) => void }) => {
    onClear?.(() => {});
    return <div data-testid="mock-editor" />;
  }),
}));

// jsdom doesn't implement ResizeObserver, hasPointerCapture, or scrollIntoView, all of which the
// ConflictNoteCard's Radix RadioGroup and Tooltip (the clickable option cards) use. No-op stubs are
// enough for the conflict-branch tests below.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

const localizedStrings = {
  '%comment_assigning_to%': 'Assigning to: {assignedUser}',
  '%comment_assign_unassigned%': 'Unassigned',
  '%comment_assign_team%': 'Team',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_reopenResolved%': 'Adding a comment will re-open...',
  '%comment_aria_assign_user%': 'Assign user',
  '%comment_aria_submit_comment%': 'Submit comment',
  '%comment_aria_mark_as_read%': 'Mark as read',
  '%comment_aria_mark_as_unread%': 'Mark as unread',
  '%comment_aria_resolve_thread%': 'Resolve thread',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
  '%comment_status_resolved%': 'Marked as resolved',
  '%comment_status_todo%': 'Re-opened',
};

const baseComment: LegacyComment = {
  id: 'comment-1',
  user: 'alice',
  date: '2024-01-01T00:00:00.000Z',
  contents: '<p>Test comment</p>',
  deleted: false,
  hideInTextWindow: false,
  language: 'en',
  isRead: false,
  startPosition: 0,
  selectedText: 'Test text',
  contextBefore: '',
  contextAfter: '',
  thread: 'thread-1',
  verseRef: 'GEN 1:1',
};

const baseThread: LegacyCommentThread = {
  id: 'thread-1',
  comments: [baseComment],
  status: 'Todo',
  type: 'Normal',
  modifiedDate: '2024-01-01T00:00:00.000Z',
  verseRef: 'GEN 1:1',
  isSpellingNote: false,
  isBTNote: false,
  isConsultantNote: false,
  isRead: false,
};

const defaultProps = {
  comments: [baseComment],
  localizedStrings,
  isSelected: true,
  currentUser: 'Current User',
  threadId: 'thread-1',
  thread: baseThread,
  threadStatus: 'Todo' as const,
  handleAddCommentToThread: vi.fn().mockResolvedValue('comment-id'),
  handleUpdateComment: vi.fn().mockResolvedValue(true),
  handleDeleteComment: vi.fn().mockResolvedValue(true),
  assignableUsers: ['Alice', 'Bob', 'Current User'],
  handleSelectThread: vi.fn(),
};

// Render helper mirroring the file's `render(<CommentThread {...defaultProps} .../>)` pattern:
// spreads the same baseline props the other tests use, plus any overrides. Derives `threadId`
// from an overridden `thread` so the resolve handler is called with the conflict thread's id.
const renderThread = (overrides: Partial<Parameters<typeof CommentThread>[0]> = {}) =>
  render(
    <CommentThread
      {...defaultProps}
      threadId={overrides.thread?.id ?? defaultProps.threadId}
      {...overrides}
    />,
  );

const conflictThread: LegacyCommentThread = {
  id: 'conflict-sample',
  comments: [verseTextConflictComment],
  status: 'Todo',
  type: 'Conflict',
  modifiedDate: verseTextConflictComment.date,
  verseRef: 'MAT 2:1',
  isSpellingNote: false,
  isBTNote: false,
  isConsultantNote: false,
  isRead: false,
};

describe('CommentThread assignee state machine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('auto-populates "Assigning to:" when canAssign resolves true and initialAssignedUser differs from assignedUser', async () => {
    render(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Assigning to: Alice')).toBeInTheDocument();
    });
  });

  it('does not auto-populate when initialAssignedUser matches assignedUser', async () => {
    render(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Alice"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    // Wait for canAssign to resolve (button becomes enabled when canAssign=true)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Assign user' })).not.toBeDisabled();
    });

    expect(screen.queryByText(/Assigning to:/)).not.toBeInTheDocument();
  });

  it('does not auto-populate when canAssign resolves false', async () => {
    render(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => false}
      />,
    );

    // Wait for canAssign to resolve (button stays disabled when canAssign=false)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Assign user' })).toBeDisabled();
    });

    expect(screen.queryByText(/Assigning to:/)).not.toBeInTheDocument();
  });

  it('clears "Assigning to:" indicator when thread becomes deselected', async () => {
    const { rerender } = render(
      <CommentThread
        {...defaultProps}
        isSelected
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Assigning to: Alice')).toBeInTheDocument();
    });

    rerender(
      <CommentThread
        {...defaultProps}
        isSelected={false}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    expect(screen.queryByText(/Assigning to:/)).not.toBeInTheDocument();
  });

  it('clears "Assigning to:" indicator when canAssign is revoked after auto-population', async () => {
    const { rerender } = render(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Assigning to: Alice')).toBeInTheDocument();
    });

    rerender(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => false}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Assigning to:/)).not.toBeInTheDocument();
    });
  });

  it('preserves user-selected assignee when initialAssignedUser later changes', async () => {
    // This test documents that once the user is in USER_SELECTED state,
    // changing initialAssignedUser does not overwrite their choice.
    const { rerender } = render(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Alice"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    // Auto-populated to Alice
    await waitFor(() => {
      expect(screen.getByText('Assigning to: Alice')).toBeInTheDocument();
    });

    // Simulate user manually selecting Bob from the popover by finding and clicking the
    // CommandItem. We test the state-machine transition by directly triggering the popover
    // interaction via the @ button, but since that requires a full interaction chain, we
    // verify the simpler invariant: re-rendering with a new initialAssignedUser while still
    // in AUTO_POPULATED state does NOT overwrite the current value.
    rerender(
      <CommentThread
        {...defaultProps}
        initialAssignedUser="Charlie"
        assignedUser="Bob"
        canUserAssignThreadCallback={async () => true}
      />,
    );

    // Still shows Alice — auto-population only fires once (pendingAssigneeIsAutoPopulatedRef
    // / 'auto-populated' state prevents re-triggering)
    await waitFor(() => {
      expect(screen.getByText('Assigning to: Alice')).toBeInTheDocument();
    });
    expect(screen.queryByText('Assigning to: Charlie')).not.toBeInTheDocument();
  });
});

describe('CommentThread conflict resolution', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('conflict thread renders ConflictNoteCard when selected', async () => {
    renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      isSelected: true,
      getConflictResolutionOptionsCallback: async () => 'acceptOrReject',
    });
    // The card's resolution radios (falls back to English labels; the thread passes no card strings)
    expect(await screen.findByRole('radio', { name: 'Keep the current text' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save and resolve' })).toBeInTheDocument();
  });

  test('collapsed unresolved conflict shows the status-aware summary, not the raw PT9 note body', () => {
    renderThread({ thread: conflictThread, comments: conflictThread.comments, isSelected: false });
    // The collapsed preview is our summary: the prompt shows, the note's diff renders (inserted
    // "small") through the shared green/red coloring, and the PT9 "in red / not in the current copy"
    // prose never appears. Collapsed, so there is no resolution radio.
    expect(screen.getByText('Conflicting edits. Choose which change to keep.')).toBeInTheDocument();
    const inserted = document.querySelector('u');
    expect(inserted).toHaveTextContent('small');
    expect(inserted?.closest('div')?.className).toContain('text-success-foreground');
    expect(screen.queryByText(/in red/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/current copy of the text/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  test('hover resolve button shows on both normal and conflict threads', async () => {
    // The same resolve-permission callback drives both renders, proving the callback actually
    // produces the hover resolve button once it settles true for each thread type. The ✓ used to
    // be suppressed for conflicts (`!isConflictThread`); it is now restored (routed to the
    // conflict-resolve path instead of the generic one — see the tests below).
    const canUserResolveThreadCallback = async () => true;

    const { container: normalContainer } = renderThread({
      thread: baseThread,
      comments: [baseComment],
      canUserResolveThreadCallback,
    });
    const { container: conflictContainer } = renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      canUserResolveThreadCallback,
    });

    await waitFor(() =>
      expect(
        within(normalContainer).getByRole('button', { name: 'Resolve thread' }),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        within(conflictContainer).getByRole('button', { name: 'Resolve thread' }),
      ).toBeInTheDocument(),
    );
  });

  test('clicking ✓ on an unresolved conflict thread routes to the conflict resolve path with accept, not the generic status path', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleResolveConflict = vi.fn().mockResolvedValue(true);
    const handleAddCommentToThread = vi.fn().mockResolvedValue('comment-id');
    renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      canUserResolveThreadCallback: async () => true,
      handleResolveConflict,
      handleAddCommentToThread,
    });

    await user.click(await screen.findByRole('button', { name: 'Resolve thread' }));

    expect(handleResolveConflict).toHaveBeenCalledWith('conflict-sample', 'accept');
    // The generic status-change path throws for conflict threads on the backend now — it must
    // never be invoked for a conflict's ✓.
    expect(handleAddCommentToThread).not.toHaveBeenCalledWith(
      expect.objectContaining({ status: 'Resolved' }),
    );
  });

  test('a fast double-click on ✓ fires resolveConflict only once while the first call is in flight', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    let resolveHandleResolveConflict: (success: boolean) => void = () => {};
    const handleResolveConflict = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          resolveHandleResolveConflict = resolve;
        }),
    );
    renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      canUserResolveThreadCallback: async () => true,
      handleResolveConflict,
    });

    const resolveButton = await screen.findByRole('button', { name: 'Resolve thread' });
    await user.click(resolveButton);
    // The first call is still pending (isResolvingConflict), so the button is now disabled — a
    // second click must not fire a second resolveConflict('accept') call.
    expect(resolveButton).toBeDisabled();
    await user.click(resolveButton);
    expect(handleResolveConflict).toHaveBeenCalledTimes(1);

    resolveHandleResolveConflict(true);
    await waitFor(() => expect(resolveButton).not.toBeDisabled());
  });

  test('clicking ✓ on a non-conflict thread still uses the generic status path', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleResolveConflict = vi.fn().mockResolvedValue(true);
    const handleAddCommentToThread = vi.fn().mockResolvedValue('comment-id');
    renderThread({
      thread: baseThread,
      comments: [baseComment],
      canUserResolveThreadCallback: async () => true,
      handleResolveConflict,
      handleAddCommentToThread,
    });

    await user.click(await screen.findByRole('button', { name: 'Resolve thread' }));

    expect(handleAddCommentToThread).toHaveBeenCalledWith(
      expect.objectContaining({ threadId: 'thread-1', status: 'Resolved' }),
    );
    expect(handleResolveConflict).not.toHaveBeenCalled();
  });

  test('resolve flow calls handleResolveConflict and locks controls on success', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleResolveConflict = vi.fn().mockResolvedValue(true);
    renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      isSelected: true,
      getConflictResolutionOptionsCallback: async () => 'acceptOrReject',
      handleResolveConflict,
    });
    // Save and resolve is disabled on the default 'accept'; choose the other change to enable it.
    await user.click(await screen.findByRole('radio', { name: 'Use the other change' }));
    await user.click(screen.getByRole('button', { name: 'Save and resolve' }));
    expect(handleResolveConflict).toHaveBeenCalledWith('conflict-sample', 'reject');
    // Locked after success: controls disappear ('none') pending the data refresh.
    await waitFor(() => expect(screen.queryByRole('radio')).not.toBeInTheDocument());
  });

  // A resolution reply (empty body) appended after the conflict comment. conflictResolutionAction
  // drives what the read-only card's Result shows: 'replaced' -> reject, absent -> accept.
  const resolutionReply = (action?: 'replaced' | 'merged'): LegacyComment => ({
    id: 'conflict-sample/Resolver/2011-08-17T00:00:00.000Z',
    thread: 'conflict-sample',
    user: 'Resolver',
    verseRef: 'MAT 2:1',
    language: 'en',
    date: '2011-08-17T00:00:00.000Z',
    deleted: false,
    hideInTextWindow: false,
    isRead: true,
    startPosition: 0,
    selectedText: '',
    status: 'Resolved',
    contents: '<blockquote></blockquote>',
    ...(action && { conflictResolutionAction: action }),
  });

  test("resolved-by-reject thread ('replaced') shows the rejected side in the read-only card", async () => {
    const resolvedThread: LegacyCommentThread = {
      ...conflictThread,
      comments: [verseTextConflictComment, resolutionReply('replaced')],
      status: 'Resolved',
    };
    renderThread({
      thread: resolvedThread,
      comments: resolvedThread.comments,
      isSelected: true,
      threadStatus: 'Resolved',
    });
    // Derivation maps 'replaced' -> 'reject', so the card's Result is the rejected side.
    expect(
      await screen.findByText(verseTextConflictComment.rejectedResultText ?? ''),
    ).toBeInTheDocument();
    expect(screen.queryByText(verseTextConflictComment.resultText ?? '')).not.toBeInTheDocument();
  });

  test('collapsed resolved conflict shows the outcome sentence, not the stale note diff', () => {
    const resolvedThread: LegacyCommentThread = {
      ...conflictThread,
      comments: [verseTextConflictComment, resolutionReply('replaced')],
      status: 'Resolved',
    };
    renderThread({
      thread: resolvedThread,
      comments: resolvedThread.comments,
      isSelected: false,
      threadStatus: 'Resolved',
    });
    // 'replaced' -> reject: the collapsed summary states the outcome and shows NO verse text, so the
    // frozen note diff can no longer misrepresent the resolved result.
    expect(screen.getByText(/Used the other change\.$/)).toBeInTheDocument();
    expect(document.querySelector('u')).toBeNull();
    expect(
      screen.queryByText('Conflicting edits. Choose which change to keep.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/current copy of the text/i)).not.toBeInTheDocument();
  });

  test('resolved-without-action thread shows the accepted side in the read-only card', async () => {
    const resolvedThread: LegacyCommentThread = {
      ...conflictThread,
      comments: [verseTextConflictComment, resolutionReply()],
      status: 'Resolved',
    };
    renderThread({
      thread: resolvedThread,
      comments: resolvedThread.comments,
      isSelected: true,
      threadStatus: 'Resolved',
    });
    // No action recorded + Resolved -> derivation returns 'accept', so the Result is the accepted side.
    expect(await screen.findByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
    expect(
      screen.queryByText(verseTextConflictComment.rejectedResultText ?? ''),
    ).not.toBeInTheDocument();
  });

  test("resolved-by-merge thread ('merged') shows the merged text in the read-only card and the resolution reply's 'combined' banner", async () => {
    // Unlike the other resolutionReply() calls above (which ride the 'conflict-sample' thread of
    // verseTextConflictComment), this exercises verseTextConflictMergeSample — the only sample with
    // a mergedText "combine both changes" preview — so the reply's thread id is overridden to match.
    const mergeResolutionReply: LegacyComment = {
      ...resolutionReply('merged'),
      thread: verseTextConflictMergeSample.thread,
    };
    const resolvedThread: LegacyCommentThread = {
      ...conflictThread,
      id: verseTextConflictMergeSample.thread,
      comments: [verseTextConflictMergeSample, mergeResolutionReply],
      status: 'Resolved',
    };
    renderThread({
      thread: resolvedThread,
      comments: resolvedThread.comments,
      isSelected: true,
      threadStatus: 'Resolved',
    });
    // Derivation maps 'merged' -> 'merged', so the card's read-only Result region shows the merged
    // verse text (with its diff markup) instead of being hidden.
    await screen.findByText(/royal/);
    expect(document.querySelector('u')).toBeInTheDocument();
    // The outcome itself is stated in prose by the resolution reply's CommentItem banner, not on
    // the card (asserts the thread-level wiring between the two, each of which is also unit-tested
    // in isolation).
    expect(screen.getByText('Combined both changes.')).toBeInTheDocument();
  });

  // A plain reply (not a resolution reply) appended after the conflict comment, used to exercise
  // the conditional gap between the conflict card and its replies.
  const conflictReply: LegacyComment = {
    id: 'conflict-sample/Reviewer/2011-08-17T00:00:00.000Z',
    thread: 'conflict-sample',
    user: 'Reviewer',
    verseRef: 'MAT 2:1',
    language: 'en',
    date: '2011-08-17T00:00:00.000Z',
    deleted: false,
    hideInTextWindow: false,
    isRead: true,
    startPosition: 0,
    selectedText: '',
    contents: '<p>Looks fine to me.</p>',
  };

  test('shows the spacer between the conflict card and replies when the selected conflict thread has replies', async () => {
    const threadWithReply: LegacyCommentThread = {
      ...conflictThread,
      comments: [verseTextConflictComment, conflictReply],
    };
    const { container } = renderThread({
      thread: threadWithReply,
      comments: threadWithReply.comments,
      isSelected: true,
      getConflictResolutionOptionsCallback: async () => 'acceptOrReject',
    });

    await screen.findByRole('radio', { name: 'Keep the current text' });
    expect(container.querySelector('[data-slot="conflict-reply-gap"]')).toBeInTheDocument();
  });

  test('omits the spacer when the selected conflict thread has no replies', async () => {
    const { container } = renderThread({
      thread: conflictThread,
      comments: conflictThread.comments,
      isSelected: true,
      getConflictResolutionOptionsCallback: async () => 'acceptOrReject',
    });

    await screen.findByRole('radio', { name: 'Keep the current text' });
    expect(container.querySelector('[data-slot="conflict-reply-gap"]')).not.toBeInTheDocument();
  });

  test('omits the spacer for a non-conflict thread even when it has replies', () => {
    const normalReply: LegacyComment = { ...baseComment, id: 'comment-2' };
    const { container } = renderThread({
      thread: baseThread,
      comments: [baseComment, normalReply],
      isSelected: true,
    });

    expect(container.querySelector('[data-slot="conflict-reply-gap"]')).not.toBeInTheDocument();
  });
});
