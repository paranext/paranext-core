import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LegacyComment } from 'platform-bible-utils';
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';
import type { ReactNode } from 'react';
import { vi } from 'vitest';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';
import { focusContentEditable } from '@/components/advanced/editor/editor-utils';
import { CommentItem } from './comment-item.component';

// CommentItem imports the Lexical Editor at module scope (only rendered while editing). Stub it so
// these non-editing render tests don't pull in the full editor setup, matching the thread tests.
// The stub still renders `actions` (wrapped in a TooltipProvider, matching the real Editor — see
// editor.tsx) so the Save/Cancel tooltip buttons render for the editing-mode tests below.
vi.mock('@/components/advanced/editor/editor', () => ({
  Editor: vi.fn(({ actions }: { actions?: ReactNode }) => (
    <div data-testid="mock-editor">
      <TooltipProvider>{actions}</TooltipProvider>
    </div>
  )),
}));

// Spy on the real focusContentEditable so tests can assert whether CommentItem's 300ms
// dropdown-close focus workaround actually ran, without needing a real contenteditable element.
vi.mock('@/components/advanced/editor/editor-utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components/advanced/editor/editor-utils')>();
  return {
    ...actual,
    focusContentEditable: vi.fn(actual.focusContentEditable),
  };
});

// jsdom doesn't implement ResizeObserver, hasPointerCapture, or scrollIntoView, all of which
// Radix's Tooltip/Popover primitives use — needed once the editing-mode actions (with their
// tooltips) render. No-op stubs are enough for these tests, matching comment-thread's setup.
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

// A non-empty editor state to hand in as a restored/persisted `draftEditorState`, typed the same
// way comment-thread.component.tsx types its own `initialValue` — see that file for why the
// narrower element-node type parameter is needed for a paragraph/text literal to typecheck.
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

const OUTCOME_USED_OTHER = 'Used the other change instead of the current text.';
const OUTCOME_COMBINED = 'Combined both changes.';

const localizedStrings = {
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_status_resolved%': 'Marked as resolved',
  '%conflict_note_outcome_used_other%': OUTCOME_USED_OTHER,
  '%conflict_note_outcome_combined%': OUTCOME_COMBINED,
  '%comment_editComment%': 'Edit Comment',
  '%comment_deleteComment%': 'Delete Comment',
  '%comment_aria_cancel_edit%': 'Cancel edit',
  '%comment_aria_save_edit%': 'Save edit',
};

const baseComment: LegacyComment = {
  id: 'c1',
  user: 'Alice Ann',
  date: '2024-01-01T00:00:00.000Z',
  contents: '<p>ORDINARY BODY</p>',
  deleted: false,
  hideInTextWindow: false,
  language: 'en',
  isRead: true,
  startPosition: 0,
  selectedText: '',
  thread: 't1',
  verseRef: 'GEN 1:1',
};

test("renders the 'used the other change' outcome line when conflictResolutionAction is 'replaced' and the body is empty", () => {
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'replaced',
        // A platform-created resolution comment carries an empty body — the outcome line stands in.
        contents: '<blockquote></blockquote>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_USED_OTHER)).toBeInTheDocument();
});

test('renders a resolution comment’s typed body (not the outcome line) when it carries text', () => {
  // A resolution synced from PT9 can carry both a resolver-typed note and the action. PT9 shows the
  // text, so it must not be discarded for the synthesized outcome banner.
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'replaced',
        contents: '<p>Resolver note that must remain visible</p>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText('Resolver note that must remain visible')).toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_USED_OTHER)).not.toBeInTheDocument();
});

test("renders the 'combined' outcome line when conflictResolutionAction is 'merged' and the body is empty", () => {
  render(
    <CommentItem
      comment={{
        ...baseComment,
        status: 'Resolved',
        conflictResolutionAction: 'merged',
        contents: '<blockquote></blockquote>',
      }}
      localizedStrings={localizedStrings}
    />,
  );
  expect(screen.getByText(OUTCOME_COMBINED)).toBeInTheDocument();
});

test('renders the contents body (no outcome line) when conflictResolutionAction is absent', () => {
  render(<CommentItem comment={baseComment} localizedStrings={localizedStrings} />);
  expect(screen.getByText('ORDINARY BODY')).toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_USED_OTHER)).not.toBeInTheDocument();
  expect(screen.queryByText(OUTCOME_COMBINED)).not.toBeInTheDocument();
});

test('has no space-y on the item root, which would add dead margin on a flex row', () => {
  const { container } = render(
    <CommentItem comment={baseComment} localizedStrings={localizedStrings} />,
  );

  // `space-y-*` emits margin-top on siblings; on this flex-row with items-baseline, that shows up
  // as dead space between the avatar and text and breaks their baseline alignment.
  expect(container.firstElementChild?.className).not.toMatch(/\bspace-y-/);
});

test('keeps content order and nesting inside a comment unchanged', () => {
  const { container } = render(
    <CommentItem comment={baseComment} localizedStrings={localizedStrings} />,
  );

  const root = container.firstElementChild;
  expect(root).not.toBeNull();
  // Avatar first, then the text column — the layout must not reorder or re-nest either element.
  const [avatar, column] = Array.from(root?.children ?? []);
  expect(avatar?.textContent).toBe('AA');
  expect(column?.textContent).toContain('Alice Ann');
  expect(column?.textContent).toContain('ORDINARY BODY');
});

describe('CommentItem restored edit on a collapsed card', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('shows the comment text, not an open editor, when a restored edit exists but the card is collapsed', () => {
    // A draft persists across a thread collapsing (e.g. the panel closing and reopening). The root
    // CommentItem always mounts regardless of selection, so a collapsed card must still show its
    // comment text rather than the editor for that stale edit.
    render(
      <CommentItem
        comment={baseComment}
        localizedStrings={localizedStrings}
        isThreadExpanded={false}
        draftEditorState={NON_EMPTY_EDITOR_STATE}
      />,
    );

    expect(screen.getByText('ORDINARY BODY')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-editor')).not.toBeInTheDocument();
  });

  test('does not steal focus when a restored edit is already active on mount', () => {
    vi.useFakeTimers();
    render(
      <CommentItem
        comment={baseComment}
        localizedStrings={localizedStrings}
        isThreadExpanded
        draftEditorState={NON_EMPTY_EDITOR_STATE}
      />,
    );

    // The dropdown-close workaround waits 300ms before focusing; give it plenty of margin.
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(focusContentEditable).not.toHaveBeenCalled();
  });
});

describe('CommentItem editing an empty-bodied comment', () => {
  test('opens edit mode for an empty-bodied comment instead of throwing', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    // A platform-created conflict-resolution comment carries an empty body (see
    // `hasResolutionBodyText`); this reproduces that shape directly, without conflictResolutionAction,
    // to isolate the empty-body edit path.
    const { container } = render(
      <CommentItem
        comment={{ ...baseComment, contents: '' }}
        localizedStrings={localizedStrings}
        isThreadExpanded
        canEditOrDelete
      />,
    );

    const trigger = container.querySelector<HTMLElement>('[data-slot="dropdown-menu-trigger"]');
    if (!trigger) throw new Error('dropdown trigger not rendered');
    await user.click(trigger);
    await user.click(await screen.findByText('Edit Comment'));

    expect(await screen.findByTestId('mock-editor')).toBeInTheDocument();
  });
});

describe('CommentItem icon-button tooltips', () => {
  test('does not render a raw localize key in the cancel-edit tooltip before the key resolves', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <CommentItem
        comment={baseComment}
        // Mirrors useLocalizedStrings seeding every requested key to itself before the
        // subscription delivers (or permanently, on a PlatformError) — the exact shape a
        // hovering user sees during panel load.
        localizedStrings={{
          ...localizedStrings,
          '%comment_aria_cancel_edit%': '%comment_aria_cancel_edit%',
        }}
        isThreadExpanded
        draftEditorState={NON_EMPTY_EDITOR_STATE}
      />,
    );

    const cancelTrigger = container.querySelectorAll('[data-slot="tooltip-trigger"]')[0];
    expect(cancelTrigger).toBeDefined();
    await user.hover(cancelTrigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toHaveTextContent('%comment_aria_cancel_edit%');
    expect(tooltip).toHaveTextContent('Cancel edit');
  });

  test('does not render a raw localize key in the save-edit tooltip before the key resolves', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(
      <CommentItem
        comment={baseComment}
        localizedStrings={{
          ...localizedStrings,
          '%comment_aria_save_edit%': '%comment_aria_save_edit%',
        }}
        isThreadExpanded
        draftEditorState={NON_EMPTY_EDITOR_STATE}
      />,
    );

    const saveTrigger = container.querySelectorAll('[data-slot="tooltip-trigger"]')[1];
    expect(saveTrigger).toBeDefined();
    await user.hover(saveTrigger);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toHaveTextContent('%comment_aria_save_edit%');
    expect(tooltip).toHaveTextContent('Save edit');
  });
});
