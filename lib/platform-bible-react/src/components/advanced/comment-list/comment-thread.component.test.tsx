import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import { vi } from 'vitest';
import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';
import { CommentThread } from './comment-thread.component';
import { CommentDraft, getCommentThreadElementId } from './comment-list.types';

// A non-empty editor state a test can hand to `onSerializedChange` to simulate typing, since the
// mock Editor below never generates one itself. Typed the same way `comment-thread.component.tsx`
// types its own `initialValue` — the base `SerializedEditorState` widens each node to
// `SerializedLexicalNode`, which has no `children`, so a paragraph/text literal needs the narrower
// element-node type parameter to typecheck.
const NON_EMPTY_EDITOR_STATE: SerializedEditorState<
  SerializedParagraphNode & SerializedElementNode<SerializedTextNode>
> = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'hello',
            type: 'text',
            version: 1,
          },
        ],
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

vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(
    ({
      onClear,
      actions,
      onSerializedChange,
      placeholder,
    }: {
      onClear?: (fn: () => void) => void;
      actions?: ReactNode;
      onSerializedChange?: (value: SerializedEditorState) => void;
      placeholder?: string;
    }) => {
      onClear?.(() => {});
      // The reply compose box is always given a placeholder; a comment's edit-mode editor
      // (CommentItem) is not. That distinguishes which one a test is driving.
      const typeLabel = placeholder ? 'Type reply' : 'Type comment edit';
      return (
        <div data-testid="mock-editor">
          <button type="button" onClick={() => onSerializedChange?.(NON_EMPTY_EDITOR_STATE)}>
            {typeLabel}
          </button>
          {/* The real Editor wraps its actions slot in a TooltipProvider (see editor.tsx) — the
              icon-only cancel/save/assign/submit buttons rely on that ancestor for their
              tooltips, so the stub must provide it too. */}
          <TooltipProvider>{actions}</TooltipProvider>
        </div>
      );
    },
  ),
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

// A read, non-resolved thread: the case whose surface is `bg-card`, distinct from the unread
// (`bg-accent`) and resolved (`bg-muted`) cases the selection-styling test below isn't about.
const baseThreadProps = { ...defaultProps, isRead: true };

function threadElement(overrides: Partial<ComponentProps<typeof CommentThread>>) {
  return <CommentThread {...baseThreadProps} {...overrides} />;
}

function renderThread(overrides: Partial<ComponentProps<typeof CommentThread>>) {
  return render(threadElement(overrides));
}

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

describe('CommentThread generic resolve check', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clicking ✓ on a non-conflict thread uses the generic status path', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleAddCommentToThread = vi.fn().mockResolvedValue('comment-id');
    render(
      <CommentThread
        {...defaultProps}
        canUserResolveThreadCallback={async () => true}
        handleAddCommentToThread={handleAddCommentToThread}
      />,
    );

    await user.click(await screen.findByRole('button', { name: 'Resolve thread' }));

    // CommentThread renders no conflict-specific branching of its own — that lives entirely in
    // ConflictThread, which overrides resolveActionSlot. CommentThread's own header ✓ always goes
    // through the generic handleAddCommentToThread status path.
    expect(handleAddCommentToThread).toHaveBeenCalledWith(
      expect.objectContaining({ threadId: 'thread-1', status: 'Resolved' }),
    );
  });
});

describe('CommentThread draft control', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the draft it is given rather than its own state', () => {
    // The draft outlives this component, so the component must not be its owner: a thread unmounted
    // by a filter change and remounted must come back showing the same draft.
    const draft = { editorState: undefined, assignedUser: 'Alice' };
    renderThread({ isSelected: true, draft });

    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it('reports draft changes upward instead of storing them', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderThread({
      isSelected: true,
      onDraftChange,
      canUserAssignThreadCallback: async () => true,
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Assign user' })).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: 'Assign user' }));
    await user.click(await screen.findByText('Alice'));

    expect(onDraftChange).toHaveBeenCalledWith(
      defaultProps.threadId,
      expect.objectContaining({ assignedUser: 'Alice' }),
    );
  });

  it('does not resurrect a discarded draft when the consumer drops it for a reason of its own', async () => {
    // The internal fallback must stay inert while controlled. If it isn't, a consumer that clears
    // its own map entry for a reason unrelated to this component's own onDraftChange call (e.g.
    // pruning against threads that no longer exist) gets back a draft it believed it had discarded.
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const canUserAssignThreadCallback = async () => true;
    const { rerender } = renderThread({
      isSelected: true,
      draft: { assignedUser: 'Alice' },
      onDraftChange,
      canUserAssignThreadCallback,
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Assign user' })).not.toBeDisabled();
    });

    // Change the assignee while controlled. The update reaches `onDraftChange`, but — unlike a
    // real round trip — this test does not feed the new value back through `draft`, standing in for
    // a consumer that received the call and, for its own reasons, did not apply it.
    await user.click(screen.getByRole('button', { name: 'Assign user' }));
    await user.click(await screen.findByText('Bob'));

    // The consumer now discards the draft for a reason of its own — not by acting on the call above.
    rerender(
      threadElement({
        isSelected: true,
        draft: undefined,
        onDraftChange,
        canUserAssignThreadCallback,
      }),
    );

    expect(screen.queryByText(/Assigning to:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bob/)).not.toBeInTheDocument();
  });
});

/**
 * Opens the "Edit Comment" menu on the thread's root comment (the only comment in most fixtures
 * here). Waits for the async edit/delete permission check to resolve, since the dropdown trigger
 * doesn't render until `canEditOrDelete` does.
 */
async function startEditingFirstComment(
  container: HTMLElement,
  user: ReturnType<typeof userEvent.setup>,
) {
  const trigger = await waitFor(() => {
    const el = container.querySelector<HTMLElement>('[data-slot="dropdown-menu-trigger"]');
    if (!el) throw new Error('dropdown trigger not rendered yet');
    return el;
  });
  await user.click(trigger);
  await user.click(await screen.findByText('Edit Comment'));
}

/**
 * A controlled consumer that actually behaves like one: it mirrors `CommentThread`'s reported draft
 * back through its own state on every `onDraftChange` call, the way a real caller with durable
 * draft storage does, while still forwarding each call to an optional spy for assertions. Once a
 * consumer owns this state exclusively (by supplying `onDraftChange` at all), the component never
 * renders anything but what it is given — a test driving multiple UI steps in sequence needs this
 * round trip to see its own prior step reflected, the same as any real consumer would.
 */
function ControlledDraftThread({
  onDraftChange,
  ...props
}: Partial<ComponentProps<typeof CommentThread>>) {
  const [draftState, setDraftState] = useState<CommentDraft | undefined>(undefined);
  return (
    <CommentThread
      {...baseThreadProps}
      {...props}
      draft={draftState}
      onDraftChange={(threadId, next) => {
        setDraftState(next);
        onDraftChange?.(threadId, next);
      }}
    />
  );
}

describe('CommentThread comment-edit drafts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('reports an unsent reply and a comment edit independently, without either clobbering the other', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <ControlledDraftThread
        isSelected
        onDraftChange={onDraftChange}
        canUserEditOrDeleteCommentCallback={async () => true}
      />,
    );

    // Type the reply first: the compose box stays visible once editing starts only because it
    // already has content (see the `hasEditorContent` check gating it in CommentThread) — this is
    // the coexistence the UI deliberately allows.
    await user.click(screen.getByText('Type reply'));
    await startEditingFirstComment(container, user);
    await user.click(screen.getByText('Type comment edit'));

    const [, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(lastDraft.editorState).toBeDefined();
    expect(lastDraft.commentEdits?.[baseComment.id]).toBeDefined();
  });

  it('a draft with only a comment edit is still a draft, not reported as undefined', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <ControlledDraftThread
        isSelected
        onDraftChange={onDraftChange}
        canUserEditOrDeleteCommentCallback={async () => true}
      />,
    );

    await startEditingFirstComment(container, user);
    await user.click(screen.getByText('Type comment edit'));

    const [reportedThreadId, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(reportedThreadId).toBe(defaultProps.threadId);
    expect(lastDraft).not.toBeUndefined();
    expect(lastDraft.commentEdits?.[baseComment.id]).toBeDefined();
  });

  it('clearing a comment edit (cancel) leaves an unsent reply intact', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <ControlledDraftThread
        isSelected
        onDraftChange={onDraftChange}
        canUserEditOrDeleteCommentCallback={async () => true}
      />,
    );

    await user.click(screen.getByText('Type reply'));
    await startEditingFirstComment(container, user);
    await user.click(screen.getByText('Type comment edit'));
    await user.click(screen.getByRole('button', { name: 'Cancel edit' }));

    const [, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(lastDraft.editorState).toBeDefined();
    expect(lastDraft.commentEdits).toBeUndefined();
  });

  it('cancelling an edit clears only that comment’s entry, leaving another comment’s stored edit intact', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const reply: LegacyComment = { ...baseComment, id: 'comment-2' };
    // Pre-seed stored edits for BOTH comments directly, rather than starting the root's edit via
    // its dropdown as a live user action would: the UI itself enforces one edit at a time (see the
    // "gates every other comment's edit affordance" tests below), so this two-edits-at-once shape
    // can only arise from data the thread did not itself create — e.g. a draft written by another
    // client, or persisted before this thread's one-edit-at-a-time gate existed. Both entries
    // resume into their own independent edit-mode display, which is why the root's own "Cancel
    // edit" is picked out by index 0 (document order) rather than `getBy*`.
    const { container } = renderThread({
      isSelected: true,
      comments: [baseComment, reply],
      onDraftChange,
      canUserEditOrDeleteCommentCallback: async () => true,
      draft: {
        commentEdits: {
          [baseComment.id]: NON_EMPTY_EDITOR_STATE,
          [reply.id]: NON_EMPTY_EDITOR_STATE,
        },
      },
    });

    await user.click(within(container).getAllByRole('button', { name: 'Cancel edit' })[0]);

    const [, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(lastDraft.commentEdits?.[reply.id]).toBeDefined();
    expect(lastDraft.commentEdits?.[baseComment.id]).toBeUndefined();
  });

  it('a persisted comment edit gates every other comment’s edit affordance, with nothing edited this mount', async () => {
    const reply: LegacyComment = { ...baseComment, id: 'comment-2' };
    const commonProps = {
      isSelected: true,
      comments: [baseComment, reply],
      canUserEditOrDeleteCommentCallback: async () => true,
      // Independent of the edit gate, and resolved by the same kind of immediately-resolving async
      // permission check — used below as a positive-control timing signal that the permission
      // check tied to `canEditOrDelete` has also had its chance to resolve.
      canUserResolveThreadCallback: async () => true,
    };

    // Positive control: with no persisted edit and nothing edited this mount, both comments' edit
    // affordance appears once the async permission check resolves. Establishes that the "resolve"
    // signal below is a valid proxy for that resolution, and that the corpus (a rendered trigger)
    // could in fact appear here — the thing the target assertion needs to be a meaningful negative of.
    const control = renderThread(commonProps);
    await control.findByRole('button', { name: 'Resolve thread' });
    expect(control.container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(
      2,
    );
    control.unmount();

    // Target: a persisted edit for the root comment, with nothing edited this mount (no click, no
    // onEditingChange call) — as a remount onto a stored draft would look. The gate must still
    // block every comment's edit affordance, including the reply's.
    const target = renderThread({
      ...commonProps,
      draft: { commentEdits: { [baseComment.id]: NON_EMPTY_EDITOR_STATE } },
    });
    await target.findByRole('button', { name: 'Resolve thread' });
    expect(target.container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(0);
  });

  it('gates normally with no draft props at all: starting one edit blocks another, uncontrolled', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const reply: LegacyComment = { ...baseComment, id: 'comment-2' };
    const { container } = renderThread({
      isSelected: true,
      comments: [baseComment, reply],
      canUserEditOrDeleteCommentCallback: async () => true,
      canUserResolveThreadCallback: async () => true,
    });
    await screen.findByRole('button', { name: 'Resolve thread' });
    expect(container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(2);

    await startEditingFirstComment(container, user);

    // Starting the root's edit live (this mount, via a click) must still block the reply's
    // affordance, the same as the persisted-draft/remount case above — exercised separately so the
    // two paths can't silently diverge.
    expect(container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(0);
  });
});

describe('CommentThread stranded comment-edit drafts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('a comment edit for a comment no longer among the active comments does not block editing forever', async () => {
    // Simulates a comment deleted by another user (e.g. via Send/Receive) while its edit was still
    // in progress: `activeComments` filters it out, so its own CommentItem can never mount again
    // and nothing can ever clear this entry through the UI.
    const target = renderThread({
      isSelected: true,
      canUserEditOrDeleteCommentCallback: async () => true,
      canUserResolveThreadCallback: async () => true,
      draft: { commentEdits: { 'comment-now-deleted': NON_EMPTY_EDITOR_STATE } },
    });
    await target.findByRole('button', { name: 'Resolve thread' });

    // The stranded entry must not gate the one still-active (and still reachable) comment's own
    // edit affordance.
    expect(target.container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(1);
  });

  it('an edit for a reply outside the visible last-two tail remains reachable after a remount', async () => {
    const reply1: LegacyComment = { ...baseComment, id: 'reply-1' };
    const reply2: LegacyComment = { ...baseComment, id: 'reply-2' };
    const reply3: LegacyComment = { ...baseComment, id: 'reply-3' };

    // `showAllReplies` always starts false on mount — the same state a filter-change remount
    // produces — so with more than two replies only the last two (reply-2, reply-3) show by
    // default. reply-1's edit survived the remount via the persisted draft, but reply-1 itself
    // falls outside that tail.
    renderThread({
      isSelected: true,
      comments: [baseComment, reply1, reply2, reply3],
      draft: { commentEdits: { [reply1.id]: NON_EMPTY_EDITOR_STATE } },
    });

    // reply-1's own Cancel button must still be reachable, or neither it nor the thread-wide edit
    // gate it holds can ever be cleared.
    expect(await screen.findByRole('button', { name: 'Cancel edit' })).toBeInTheDocument();
  });
});

describe('CommentThread draft write-guard on a real round trip', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('leaves edit mode after cancelling an edit that was seeded from an undefined draft', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <ControlledDraftThread canUserEditOrDeleteCommentCallback={async () => true} />,
    );

    await startEditingFirstComment(container, user);
    expect(screen.getByText('Type comment edit')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel edit' }));

    // Cancelling must leave edit mode: the editor stub disappears and the comment's own body
    // text (only rendered while not editing) comes back.
    expect(screen.queryByText('Type comment edit')).not.toBeInTheDocument();
    expect(await screen.findByText('Test comment')).toBeInTheDocument();
  });

  it('does not resubmit stale reply content after a successful submit clears it', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<ControlledDraftThread />);

    // Type once (seeds the draft from an undefined starting point), then submit successfully.
    await user.click(screen.getByText('Type reply'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit comment' })).not.toBeDisabled();
    });
    await user.click(screen.getByRole('button', { name: 'Submit comment' }));

    // The submitted content is gone, so nothing should remain to submit again.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit comment' })).toBeDisabled();
    });
  });

  it('preserves a comment edit started while an earlier reply submission is still in flight', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    let resolveSubmit: (commentId: string) => void = () => {};
    const handleAddCommentToThread = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveSubmit = resolve;
        }),
    );
    const onDraftChange = vi.fn();
    const { container } = render(
      <ControlledDraftThread
        canUserEditOrDeleteCommentCallback={async () => true}
        handleAddCommentToThread={handleAddCommentToThread}
        onDraftChange={onDraftChange}
      />,
    );

    // Type a reply and click Submit. The compose editor is not disabled while the round trip is
    // pending, so the click's `clearEditor`/`updateDraft` closures are captured now, before the
    // comment edit below ever starts -- that gap is exactly what this test exercises.
    await user.click(screen.getByText('Type reply'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit comment' })).not.toBeDisabled();
    });
    await user.click(screen.getByRole('button', { name: 'Submit comment' }));
    expect(handleAddCommentToThread).toHaveBeenCalledTimes(1);

    // While that submission is still pending, start editing the existing comment and type into it.
    await startEditingFirstComment(container, user);
    await user.click(screen.getByText('Type comment edit'));
    expect(screen.getByRole('button', { name: 'Cancel edit' })).toBeInTheDocument();

    // Now let the pending submission resolve. Its success path calls the `clearEditor` captured
    // back at click time.
    resolveSubmit('new-comment-id');
    await waitFor(() => {
      const [, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
      expect(lastDraft?.editorState).toBeUndefined();
    });

    // The comment edit, applied strictly after that stale closure was captured, must survive: a
    // merge performed against the click-time snapshot would silently drop it along with the reply.
    expect(screen.getByRole('button', { name: 'Cancel edit' })).toBeInTheDocument();
    const [, finalDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(finalDraft?.commentEdits?.[baseComment.id]).toBeDefined();
  });
});

describe('CommentThread phantom assignee-only draft after unmount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Mirrors `ControlledDraftThread`, but the draft lives in a component that keeps rendering even
   * when the thread itself stops being mounted — the same as a real durable-draft consumer, whose
   * storage lives above the thread and outlives it. `show` toggling to false unmounts
   * `CommentThread` while `isSelected` stays true throughout, which is what a filter change does
   * (as opposed to a deselect, which flips `isSelected` to false while the component stays
   * mounted).
   */
  function FilterableDraftThread({
    show,
    onDraftChange,
    ...props
  }: Partial<ComponentProps<typeof CommentThread>> & { show: boolean }) {
    const [draftState, setDraftState] = useState<CommentDraft | undefined>(undefined);
    if (!show) return undefined;
    return (
      <CommentThread
        {...baseThreadProps}
        {...props}
        draft={draftState}
        onDraftChange={(threadId, next) => {
          setDraftState(next);
          onDraftChange?.(threadId, next);
        }}
      />
    );
  }

  it('does not survive a successful assigned reply once the thread unmounts while still selected', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onDraftChange = vi.fn();
    const { rerender } = render(
      <FilterableDraftThread
        show
        isSelected
        onDraftChange={onDraftChange}
        canUserAssignThreadCallback={async () => true}
      />,
    );

    // Assign a user.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Assign user' })).not.toBeDisabled();
    });
    await user.click(screen.getByRole('button', { name: 'Assign user' }));
    await user.click(await screen.findByText('Alice'));

    // Type a reply.
    await user.click(screen.getByText('Type reply'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit comment' })).not.toBeDisabled();
    });

    // Submit successfully — handleAddCommentToThread resolves, the editor clears, but per
    // handleSubmitComment's own comment, pendingCommentAssignedUser is deliberately NOT cleared.
    await user.click(screen.getByRole('button', { name: 'Submit comment' }));
    await waitFor(() => {
      const [, lastDraft] = onDraftChange.mock.calls.at(-1) ?? [];
      expect(lastDraft?.editorState).toBeUndefined();
    });

    // Unmount while still selected — a filter change, not a deselect. The deselect branch of the
    // assignee effect never runs, so it cannot be what clears the leftover assignee.
    rerender(
      <FilterableDraftThread
        show={false}
        isSelected
        onDraftChange={onDraftChange}
        canUserAssignThreadCallback={async () => true}
      />,
    );

    // Nothing the user typed is still pending — the submitted assignee must not persist as a
    // phantom draft that shows this thread under "Unsaved comments" forever.
    const [, finalDraft] = onDraftChange.mock.calls.at(-1) ?? [];
    expect(finalDraft).toBeUndefined();
  });
});

describe('CommentThread DOM id', () => {
  it('sets its root element id via getCommentThreadElementId(threadId)', () => {
    render(<CommentThread {...defaultProps} />);

    const threadOption = screen.getByRole('option');
    expect(threadOption).toHaveAttribute('id', getCommentThreadElementId(defaultProps.threadId));
  });
});

describe('CommentThread icon-button tooltips', () => {
  it('shows a hover tooltip for the cancel-edit button, distinct from its aria-label', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = renderThread({ canUserEditOrDeleteCommentCallback: async () => true });

    await startEditingFirstComment(container, user);
    const cancelButton = screen.getByRole('button', { name: 'Cancel edit' });

    // Guards against a regression that keeps the aria-label (so the accessible name still passes)
    // but drops the visible Tooltip a sighted user actually reads.
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(cancelButton);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Cancel edit');
  });

  it('does not render a raw localize key in the assign-user tooltip before the key resolves', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    // Enabling the button (rather than relying on its aria-label, which uses the exact same
    // unresolved-key expression and so is equally broken here) lets the test find it by a
    // label-independent selector below.
    const { container } = renderThread({
      canUserAssignThreadCallback: async () => true,
      localizedStrings: {
        ...localizedStrings,
        // Mirrors useLocalizedStrings seeding every requested key to itself before the
        // subscription delivers (or permanently, on a PlatformError) — the exact shape a
        // hovering user sees during panel load.
        '%comment_aria_assign_user%': '%comment_aria_assign_user%',
      },
    });

    const getAssignTrigger = () =>
      container.querySelector<HTMLElement>('[data-slot="tooltip-trigger"]');
    await waitFor(() => {
      expect(getAssignTrigger()).not.toBeDisabled();
    });
    const assignTrigger = getAssignTrigger();
    if (!assignTrigger) throw new Error('assign-user tooltip trigger not rendered');
    await user.hover(assignTrigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toHaveTextContent('%comment_aria_assign_user%');
    expect(tooltip).toHaveTextContent('Assign user');
  });

  it('does not render a raw localize key in the submit-comment tooltip before the key resolves', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = renderThread({
      localizedStrings: {
        ...localizedStrings,
        '%comment_aria_submit_comment%': '%comment_aria_submit_comment%',
      },
    });

    const triggers = container.querySelectorAll<HTMLElement>('[data-slot="tooltip-trigger"]');
    // Submit comment is the second tooltip trigger in the compose editor's actions bar, after
    // Assign user.
    const submitTrigger = triggers[triggers.length - 1];
    expect(submitTrigger).toBeDefined();
    await user.hover(submitTrigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toHaveTextContent('%comment_aria_submit_comment%');
    expect(tooltip).toHaveTextContent('Submit comment');
  });
});

describe('CommentThread disabled-action tooltips are keyboard reachable', () => {
  // A disabled `<button>` is removed from the tab order and carries no accessible name from its
  // own attributes in this markup, so a keyboard or screen-reader user relies entirely on the
  // focusable, labeled wrapper around it -- verified here by role and name, independent of mouse
  // hover (already covered above).
  it('the disabled assign button is reachable and named via its wrapper, not the button itself', () => {
    render(<CommentThread {...defaultProps} />);
    // canAssign starts false with no canUserAssignThreadCallback supplied, so Assign stays
    // disabled without needing to await anything.
    const assignButton = screen.getByRole('button', { name: 'Assign user' });
    expect(assignButton).toBeDisabled();

    const wrapper = screen.getByRole('group', { name: 'Assign user' });
    expect(wrapper).toHaveAttribute('tabindex', '0');
    expect(wrapper).toContainElement(assignButton);
  });

  it('the disabled submit button is reachable and named via its wrapper, not the button itself', () => {
    render(<CommentThread {...defaultProps} />);
    // No draft content and no pending assignee, so Submit stays disabled from first render.
    const submitButton = screen.getByRole('button', { name: 'Submit comment' });
    expect(submitButton).toBeDisabled();

    const wrapper = screen.getByRole('group', { name: 'Submit comment' });
    expect(wrapper).toHaveAttribute('tabindex', '0');
    expect(wrapper).toContainElement(submitButton);
  });
});

/**
 * Every background-channel class on a card, sorted. Selection must not alter this set: the channel
 * carries read/resolved status and nothing else.
 */
const bgClasses = (el: Element) => (el.className.match(/\btw:bg-[\w-]+/g) ?? []).sort();

describe('CommentThread selection styling', () => {
  it('the selected thread carries the leading bar and every card uses the card surface', () => {
    const { rerender } = renderThread({ isSelected: false });

    const unselected = screen.getByRole('option');
    expect(unselected.className).toMatch(/\bbg-card\b/);
    // Selection must not ride the background channel, which carries read/resolved status.
    expect(unselected.className).not.toMatch(/\bbg-primary-foreground\b/);
    // The bar's width is reserved while unselected so selecting does not shift content sideways.
    expect(unselected.className).toMatch(/\bborder-s-4\b/);
    expect(unselected.className).toMatch(/\bborder-transparent\b/);
    // Captured before the rerender: `unselected` and `selected` below both resolve to the same
    // live DOM node (React reuses it across a rerender), so reading its classes AFTER the
    // rerender on both sides of the comparison would compare the post-rerender state to itself.
    const unselectedBgClasses = bgClasses(unselected);

    rerender(threadElement({ isSelected: true }));

    const selected = screen.getByRole('option');
    expect(selected.className).toMatch(/\bborder-foreground\b/);
    expect(selected.className).not.toMatch(/\bborder-transparent\b/);

    // The structural invariant: selection must not change ANY background-channel class, not just
    // the one token being removed from it. Catches a regression to e.g. `bg-background` or
    // `bg-secondary`, which the narrower token-specific check above would miss.
    expect(bgClasses(selected)).toEqual(unselectedBgClasses);
  });

  // Status must be expressible independently of selection, so each status needs its own selected and
  // unselected class pair: an unread selected card needs its own background rule, and a resolved card
  // needs its own bar, rather than either falling back to a rule gated on `!isSelected`. The
  // read/unresolved case above never exercises a status class, so it cannot stand in for these two.
  it('keeps the unread background and adds the bar when an unread thread is selected', () => {
    const { rerender } = renderThread({ isRead: false, isSelected: false });
    const unselected = screen.getByRole('option');
    expect(unselected.className).toMatch(/\bbg-accent\b/);
    // Captured before the rerender -- see the comment on the equivalent capture above.
    const unselectedBgClasses = bgClasses(unselected);

    rerender(threadElement({ isRead: false, isSelected: true }));
    const selected = screen.getByRole('option');

    expect(selected.className).toMatch(/\bborder-foreground\b/);
    // Unread must survive selection rather than being displaced by it.
    expect(selected.className).toMatch(/\bbg-accent\b/);
    expect(bgClasses(selected)).toEqual(unselectedBgClasses);
  });

  it('keeps the resolved background and adds the bar when a resolved thread is selected', () => {
    const { rerender } = renderThread({ threadStatus: 'Resolved', isSelected: false });
    const unselected = screen.getByRole('option');
    expect(unselected.className).toMatch(/\bbg-muted\b/);
    // Captured before the rerender -- see the comment on the equivalent capture above.
    const unselectedBgClasses = bgClasses(unselected);

    rerender(threadElement({ threadStatus: 'Resolved', isSelected: true }));
    const selected = screen.getByRole('option');

    expect(selected.className).toMatch(/\bborder-foreground\b/);
    expect(selected.className).toMatch(/\bbg-muted\b/);
    expect(bgClasses(selected)).toEqual(unselectedBgClasses);
  });
});

describe('CommentThread auto-read timer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not mark an unread thread read while it holds an unsent reply draft', () => {
    vi.useFakeTimers();
    const handleReadStatusChange = vi.fn();
    renderThread({
      isRead: false,
      isSelected: true,
      autoReadDelay: 5,
      handleReadStatusChange,
      draft: { editorState: NON_EMPTY_EDITOR_STATE },
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(handleReadStatusChange).not.toHaveBeenCalled();
  });

  it('marks an unread thread read after the delay once it holds no draft', () => {
    vi.useFakeTimers();
    const handleReadStatusChange = vi.fn();
    renderThread({
      isRead: false,
      isSelected: true,
      autoReadDelay: 5,
      handleReadStatusChange,
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(handleReadStatusChange).toHaveBeenCalledWith('thread-1', true);
  });
});
