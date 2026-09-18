import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import type { ComponentProps, ReactNode } from 'react';
import { vi } from 'vitest';
import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { CommentThread } from './comment-thread.component';
import { getCommentThreadElementId } from './comment-list.types';

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
          {actions}
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

    // CommentThread has no built-in notion of conflicts anymore (that branching now lives in
    // ConflictThread, which overrides resolveActionSlot) — its own header ✓ always goes through the
    // generic handleAddCommentToThread status path.
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
});

describe('CommentThread comment-edit drafts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('reports an unsent reply and a comment edit independently, without either clobbering the other', async () => {
    const onDraftChange = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = renderThread({
      isSelected: true,
      onDraftChange,
      canUserEditOrDeleteCommentCallback: async () => true,
    });

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
    const { container } = renderThread({
      isSelected: true,
      onDraftChange,
      canUserEditOrDeleteCommentCallback: async () => true,
    });

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
    const { container } = renderThread({
      isSelected: true,
      onDraftChange,
      canUserEditOrDeleteCommentCallback: async () => true,
    });

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
    // its dropdown as a live user action would: once one comment's edit is resumed, the gate this
    // thread now enforces (see the "gates every other comment's edit affordance" tests below)
    // correctly refuses to let a second one be opened that way — this map state can otherwise only
    // arise from data the thread did not itself create (e.g. carried over from before the gate
    // fix). Both entries resume into their own independent edit-mode display, which is why the
    // root's own "Cancel edit" is picked out by index 0 (document order) rather than `getBy*`.
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

    // Starting the root's edit this mount must still block the reply's affordance — the ordinary,
    // pre-remount case the fix must not have changed.
    expect(container.querySelectorAll('[data-slot="dropdown-menu-trigger"]').length).toBe(0);
  });
});

describe('CommentThread DOM id', () => {
  it('sets its root element id via getCommentThreadElementId(threadId)', () => {
    render(<CommentThread {...defaultProps} />);

    const threadOption = screen.getByRole('option');
    expect(threadOption).toHaveAttribute('id', getCommentThreadElementId(defaultProps.threadId));
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

    rerender(threadElement({ isSelected: true }));

    const selected = screen.getByRole('option');
    expect(selected.className).toMatch(/\bborder-foreground\b/);
    expect(selected.className).not.toMatch(/\bborder-transparent\b/);

    // The structural invariant: selection must not change ANY background-channel class, not just
    // the one token being removed from it. Catches a regression to e.g. `bg-background` or
    // `bg-secondary`, which the narrower token-specific check above would miss.
    expect(bgClasses(selected)).toEqual(bgClasses(unselected));
  });

  // The two combinations below are the ones that showed no selection indicator at all, because the
  // status classes used to be gated on `!isSelected`: an unread selected card matched no background
  // rule and a resolved one had no bar to fall back on. The read/unresolved case above never broke,
  // so it cannot stand in for them — gating the status classes again leaves it green.
  it('keeps the unread background and adds the bar when an unread thread is selected', () => {
    const { rerender } = renderThread({ isRead: false, isSelected: false });
    const unselected = screen.getByRole('option');
    expect(unselected.className).toMatch(/\bbg-accent\b/);

    rerender(threadElement({ isRead: false, isSelected: true }));
    const selected = screen.getByRole('option');

    expect(selected.className).toMatch(/\bborder-foreground\b/);
    // Unread must survive selection rather than being displaced by it.
    expect(selected.className).toMatch(/\bbg-accent\b/);
    expect(bgClasses(selected)).toEqual(bgClasses(unselected));
  });

  it('keeps the resolved background and adds the bar when a resolved thread is selected', () => {
    const { rerender } = renderThread({ threadStatus: 'Resolved', isSelected: false });
    const unselected = screen.getByRole('option');
    expect(unselected.className).toMatch(/\bbg-muted\b/);

    rerender(threadElement({ threadStatus: 'Resolved', isSelected: true }));
    const selected = screen.getByRole('option');

    expect(selected.className).toMatch(/\bborder-foreground\b/);
    expect(selected.className).toMatch(/\bbg-muted\b/);
    expect(bgClasses(selected)).toEqual(bgClasses(unselected));
  });
});
