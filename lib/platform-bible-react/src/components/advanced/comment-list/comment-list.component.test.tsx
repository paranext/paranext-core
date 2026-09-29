import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { vi } from 'vitest';
import { LanguageStrings, LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';
import CommentList from './comment-list.component';
import { CommentDraft, getCommentThreadElementId } from './comment-list.types';

// A non-empty editor state a test can hand to `onSerializedChange` to simulate typing, mirroring
// comment-thread.component.test.tsx's fixture.
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
    }: {
      onClear?: (fn: () => void) => void;
      actions?: ReactNode;
      onSerializedChange?: (value: SerializedEditorState) => void;
    }) => {
      onClear?.(() => {});
      return (
        <div data-testid="mock-editor">
          <button type="button" onClick={() => onSerializedChange?.(NON_EMPTY_EDITOR_STATE)}>
            Type reply
          </button>
          <TooltipProvider>{actions}</TooltipProvider>
        </div>
      );
    },
  ),
}));

// `getCommentThreadElementId` runs unconditionally near the top of every actual CommentThread
// render (it sets the thread's root element id) and nowhere else — spying on it, rather than on
// the memoized component reference directly, measures "did this thread's render body actually
// run" regardless of how the memoization is implemented, so this test keeps working even if
// `CommentThread` is refactored away from `memo(...)` later.
vi.mock('./comment-list.types', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./comment-list.types')>();
  return {
    ...actual,
    getCommentThreadElementId: vi.fn(actual.getCommentThreadElementId),
  };
});

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

const localizedStrings: LanguageStrings = {
  '%comment_assigning_to%': 'Assigning to: {assignedUser}',
  '%comment_assign_unassigned%': 'Unassigned',
  '%comment_assign_team%': 'Team',
  '%comment_assigned_to%': 'Assigned to {assignedUser}',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_reopenResolved%': 'Adding a comment will re-open...',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_editComment%': 'Edit Comment',
  '%comment_status_resolved%': 'Marked as resolved',
  '%comment_status_todo%': 'Re-opened',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
};

function makeThread(id: string): LegacyCommentThread {
  const comment: LegacyComment = {
    id: `${id}-comment-1`,
    user: 'alice',
    date: '2024-01-01T00:00:00.000Z',
    contents: `<p>Comment for ${id}</p>`,
    deleted: false,
    hideInTextWindow: false,
    language: 'en',
    isRead: true,
    startPosition: 0,
    selectedText: 'Test text',
    contextBefore: '',
    contextAfter: '',
    thread: id,
    verseRef: 'GEN 1:1',
  };
  return {
    id,
    comments: [comment],
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-01T00:00:00.000Z',
    verseRef: 'GEN 1:1',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: true,
  };
}

const threads: LegacyCommentThread[] = [
  makeThread('thread-1'),
  makeThread('thread-2'),
  makeThread('thread-3'),
];

// Hoisted, not created inline in the harness below: a real consumer wires these through
// `useCallback` (see `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`), so a
// stable reference here is what makes this a faithful test of `CommentList`'s own re-render
// behavior rather than an artifact of the test harness re-creating its own props every render.
const handleAddCommentToThread = vi.fn().mockResolvedValue('comment-id');
const handleUpdateComment = vi.fn().mockResolvedValue(true);
const handleDeleteComment = vi.fn().mockResolvedValue(true);
const handleReadStatusChange = vi.fn().mockResolvedValue(true);

/**
 * A controlled consumer that mirrors `CommentList`'s reported draft back through its own state on
 * every `onDraftChange` call, the same round trip `useCommentDrafts` performs in the real comments
 * panel — a keystroke into one thread's draft re-renders this harness, and so re-renders
 * `CommentList` with a brand-new `drafts` object, which is exactly the widened blast radius this
 * test is checking.
 */
function DraftsHarness() {
  const [drafts, setDrafts] = useState<Record<string, CommentDraft>>({});
  const onDraftChange = useCallback((threadId: string, draft: CommentDraft | undefined) => {
    setDrafts((prev) => {
      if (draft === undefined) {
        const rest = { ...prev };
        delete rest[threadId];
        return rest;
      }
      return { ...prev, [threadId]: draft };
    });
  }, []);
  return (
    <CommentList
      threads={threads}
      currentUser="Current User"
      localizedStrings={localizedStrings}
      handleAddCommentToThread={handleAddCommentToThread}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
      handleReadStatusChange={handleReadStatusChange}
      drafts={drafts}
      onDraftChange={onDraftChange}
    />
  );
}

describe('CommentList re-render blast radius', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('typing a reply in one thread does not re-render the other threads', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DraftsHarness />);

    const getCommentThreadElementIdMock = vi.mocked(getCommentThreadElementId);
    // Clear the mount-time calls (every thread renders once on first mount); only the calls
    // triggered by the keystroke below are of interest.
    getCommentThreadElementIdMock.mockClear();

    const thread1 = document.getElementById('thread-1');
    if (!thread1) throw new Error('thread-1 root not rendered');
    // Select (expand) the thread first -- the main compose editor only renders while a thread is
    // selected. This click itself reaches CommentList's own `expandedThreadIds` state, not
    // `drafts`, so it is not part of what this test measures; only the keystroke below is.
    await user.click(thread1);
    getCommentThreadElementIdMock.mockClear();

    await user.click(within(thread1).getByText('Type reply'));

    // The keystroke reaches CommentList's own state (via onDraftChange -> setDrafts) and back down
    // as a new `drafts` prop, so give React a chance to actually commit the re-render before
    // reading the spy.
    await waitFor(() => {
      expect(getCommentThreadElementIdMock).toHaveBeenCalled();
    });

    const rerenderedThreadIds = getCommentThreadElementIdMock.mock.calls.map((call) => call[0]);
    expect(rerenderedThreadIds).toContain('thread-1');
    expect(rerenderedThreadIds).not.toContain('thread-2');
    expect(rerenderedThreadIds).not.toContain('thread-3');
  });

  it('sanity check: all three threads do render on first mount', () => {
    render(<DraftsHarness />);
    expect(screen.getAllByText(/Comment for thread-/)).toHaveLength(3);
  });
});
