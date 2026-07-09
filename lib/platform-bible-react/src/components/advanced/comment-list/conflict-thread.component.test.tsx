import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { ConflictThread } from './conflict-thread.component';
import { CommentThreadProps, ConflictResolutionCallbacks } from './comment-list.types';
import { ConflictResolutionOptions } from './conflict-note-card.types';
import { verseTextConflictComment, verseTextConflictMergeSample } from './comment-sample.data';

vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(() => <div data-testid="mock-editor" />),
}));

// jsdom lacks ResizeObserver/hasPointerCapture/scrollIntoView, which the card's Radix RadioGroup and
// Tooltip use.
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
  if (!Element.prototype.hasPointerCapture) Element.prototype.hasPointerCapture = () => false;
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

const localizedStrings = {
  '%comment_aria_resolve_thread%': 'Resolve thread',
  '%comment_aria_mark_as_read%': 'Mark as read',
  '%comment_aria_mark_as_unread%': 'Mark as unread',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_status_resolved%': 'Marked as resolved',
  '%comment_status_todo%': 'Re-opened',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
};

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

type RenderOverrides = Partial<CommentThreadProps> & {
  resolve?: ConflictResolutionCallbacks['resolve'];
  getOptions?: ConflictResolutionCallbacks['getOptions'];
};

const renderConflict = (overrides: RenderOverrides = {}) => {
  const { resolve, getOptions, ...rest } = overrides;
  const conflictResolution: ConflictResolutionCallbacks = {
    resolve: resolve ?? vi.fn().mockResolvedValue(true),
    getOptions: getOptions ?? (async (): Promise<ConflictResolutionOptions> => 'acceptOrReject'),
  };
  return render(
    <ConflictThread
      comments={conflictThread.comments}
      localizedStrings={localizedStrings}
      currentUser="Current User"
      isSelected
      threadId="conflict-sample"
      thread={conflictThread}
      threadStatus="Todo"
      handleSelectThread={vi.fn()}
      handleAddCommentToThread={vi.fn().mockResolvedValue('comment-id')}
      handleUpdateComment={vi.fn().mockResolvedValue(true)}
      handleDeleteComment={vi.fn().mockResolvedValue(true)}
      conflictResolution={conflictResolution}
      {...rest}
    />,
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders the ConflictNoteCard when selected and options load', async () => {
  renderConflict({ getOptions: async () => 'acceptOrReject' });
  expect(await screen.findByRole('radio', { name: 'Keep the current text' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save and resolve' })).toBeInTheDocument();
});

test('collapsed conflict shows the status-aware summary, not the resolution card', () => {
  renderConflict({ isSelected: false });
  expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  // The collapsed diff preview renders through the shared coloring (inserted "small").
  expect(document.querySelector('u')).toHaveTextContent('small');
});

test('resolve flow calls resolve() and locks the controls on success', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const resolve = vi.fn().mockResolvedValue(true);
  renderConflict({ resolve, getOptions: async () => 'acceptOrReject' });
  await user.click(await screen.findByRole('radio', { name: 'Use the other change' }));
  await user.click(screen.getByRole('button', { name: 'Save and resolve' }));
  expect(resolve).toHaveBeenCalledWith('conflict-sample', 'reject');
  // Locked after success: the option cards disappear (read-only) pending the data refresh.
  await vi.waitFor(() => expect(screen.queryByRole('radio')).not.toBeInTheDocument());
});

// Required coverage: the resolve check must NOT show when the conflict isn't resolvable ('none'),
// so a non-assignee/unresolvable conflict never offers a ✓ that would throw server-side.
test('no resolve check is shown when the conflict is not resolvable (options none)', async () => {
  renderConflict({
    canUserResolveThreadCallback: async () => true,
    getOptions: async () => 'none',
  });
  // Card is present (read-only), but no resolve ✓ in the header.
  await screen.findByText(/Conflicting changes were made/);
  expect(screen.queryByRole('button', { name: 'Resolve thread' })).not.toBeInTheDocument();
});

// Required coverage: after a successful reject, the read-only card shows the REJECTED result
// immediately (optimistic outcome), never flashing the accepted text before the status refreshes.
test('resolving reject shows the rejected side immediately, never the accepted text', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  renderConflict({
    resolve: vi.fn().mockResolvedValue(true),
    getOptions: async () => 'acceptOrReject',
  });
  await user.click(await screen.findByRole('radio', { name: 'Use the other change' }));
  await user.click(screen.getByRole('button', { name: 'Save and resolve' }));
  expect(
    await screen.findByText(verseTextConflictComment.rejectedResultText ?? ''),
  ).toBeInTheDocument();
  expect(screen.queryByText(verseTextConflictComment.resultText ?? '')).not.toBeInTheDocument();
});

test('a non-verseText conflict keeps the CommentItem chrome instead of the bare card', () => {
  const nonVerseTextConflict: LegacyComment = {
    ...verseTextConflictComment,
    conflictType: 'invalidVerses',
  };
  renderConflict({
    comments: [nonVerseTextConflict],
    thread: { ...conflictThread, comments: [nonVerseTextConflict] },
  });
  // No resolution radios (not the verseText card); the standard comment chrome renders instead.
  expect(screen.queryByRole('radio')).not.toBeInTheDocument();
});

test('does not crash when a Conflict thread has no active (non-deleted) comments', () => {
  // isVerseTextConflictNote is derived from `firstComment`, which is the first *non-deleted*
  // comment, so an all-deleted Conflict thread has `firstComment === undefined`. Rendering must not
  // throw while deriving the resolution state.
  const deletedConflictComment: LegacyComment = { ...verseTextConflictComment, deleted: true };
  expect(() =>
    renderConflict({
      thread: { ...conflictThread, comments: [deletedConflictComment] },
      comments: [deletedConflictComment],
    }),
  ).not.toThrow();
});

test('a fast double-click on the resolve check fires resolve only once while the first call is in flight', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  let settleResolve: (value: boolean) => void = () => {};
  const resolve = vi.fn(
    () =>
      new Promise<boolean>((_resolve) => {
        settleResolve = _resolve;
      }),
  );
  renderConflict({ resolve, getOptions: async () => 'acceptOrReject' });

  const resolveButton = await screen.findByRole('button', { name: 'Resolve thread' });
  await user.click(resolveButton);
  // The first call is still pending (isResolving), so the button is now disabled — a second click
  // must not fire a second resolve('accept') call.
  expect(resolveButton).toBeDisabled();
  await user.click(resolveButton);
  expect(resolve).toHaveBeenCalledTimes(1);

  settleResolve(true);
  // On success the check disappears entirely (conflictOptions -> 'none'), confirming the pending
  // call was allowed to complete cleanly.
  await waitFor(() =>
    expect(screen.queryByRole('button', { name: 'Resolve thread' })).not.toBeInTheDocument(),
  );
});

test('clicking the resolve check on an expanded resolvable conflict calls resolve with accept', async () => {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const resolve = vi.fn().mockResolvedValue(true);
  renderConflict({ resolve, getOptions: async () => 'acceptOrReject' });
  await user.click(await screen.findByRole('button', { name: 'Resolve thread' }));
  // The header ✓ always routes to resolve('accept') regardless of any selection state in the
  // (unrelated) resolution card.
  expect(resolve).toHaveBeenCalledWith('conflict-sample', 'accept');
});

// A resolution reply (empty body) appended after the conflict comment. conflictResolutionAction
// drives what the read-only card's Result shows: 'replaced' -> reject, absent -> accept, 'merged' ->
// merged.
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
  renderConflict({
    thread: resolvedThread,
    comments: resolvedThread.comments,
    threadStatus: 'Resolved',
    getOptions: async () => 'none',
  });
  // Derivation maps 'replaced' -> 'reject', so the card's Result is the rejected side.
  expect(
    await screen.findByText(verseTextConflictComment.rejectedResultText ?? ''),
  ).toBeInTheDocument();
  expect(screen.queryByText(verseTextConflictComment.resultText ?? '')).not.toBeInTheDocument();
});

test('resolved-without-action thread shows the accepted side in the read-only card', async () => {
  const resolvedThread: LegacyCommentThread = {
    ...conflictThread,
    comments: [verseTextConflictComment, resolutionReply()],
    status: 'Resolved',
  };
  renderConflict({
    thread: resolvedThread,
    comments: resolvedThread.comments,
    threadStatus: 'Resolved',
    getOptions: async () => 'none',
  });
  // No action recorded + Resolved -> derivation returns 'accept', so the Result is the accepted side.
  expect(await screen.findByText(verseTextConflictComment.resultText ?? '')).toBeInTheDocument();
  expect(
    screen.queryByText(verseTextConflictComment.rejectedResultText ?? ''),
  ).not.toBeInTheDocument();
});

test("resolved-by-merge thread ('merged') shows the merged text in the read-only card and the resolution reply's 'combined' banner", async () => {
  // Unlike the resolutionReply() calls above (which ride the 'conflict-sample' thread of
  // verseTextConflictComment), this exercises verseTextConflictMergeSample — the only sample with a
  // mergedText "combine both changes" preview — so the reply's thread id and the ConflictThread's
  // threadId are both overridden to match.
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
  renderConflict({
    threadId: verseTextConflictMergeSample.thread,
    thread: resolvedThread,
    comments: resolvedThread.comments,
    threadStatus: 'Resolved',
    getOptions: async () => 'none',
  });
  // Derivation maps 'merged' -> 'merged', so the card's read-only Result region shows the merged
  // verse text (with its diff markup) instead of being hidden.
  await screen.findByText(/royal/);
  expect(document.querySelector('u')).toBeInTheDocument();
  // The outcome itself is stated in prose by the resolution reply's CommentItem banner, not on the
  // card (asserts the thread-level wiring between the two, each of which is also unit-tested in
  // isolation).
  expect(screen.getByText('Combined both changes.')).toBeInTheDocument();
});

test('collapsed resolved conflict shows the outcome sentence, not the stale note diff', () => {
  const resolvedThread: LegacyCommentThread = {
    ...conflictThread,
    comments: [verseTextConflictComment, resolutionReply('replaced')],
    status: 'Resolved',
  };
  renderConflict({
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

// A plain reply (not a resolution reply) appended after the conflict comment, used to exercise the
// conditional gap between the conflict card and its replies.
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
  const { container } = renderConflict({
    thread: threadWithReply,
    comments: threadWithReply.comments,
    getOptions: async () => 'acceptOrReject',
  });

  await screen.findByRole('radio', { name: 'Keep the current text' });
  expect(container.querySelector('[data-slot="root-content-reply-gap"]')).toBeInTheDocument();
});

test('omits the spacer when the selected conflict thread has no replies', async () => {
  const { container } = renderConflict({ getOptions: async () => 'acceptOrReject' });

  await screen.findByRole('radio', { name: 'Keep the current text' });
  expect(container.querySelector('[data-slot="root-content-reply-gap"]')).not.toBeInTheDocument();
});
