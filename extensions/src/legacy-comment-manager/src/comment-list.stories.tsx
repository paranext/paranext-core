import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { COMMENT_LIST_STRING_KEYS } from 'platform-bible-react';
import type { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../.storybook/story.utils';
import {
  CommentListPanel,
  CommentListPanelProps,
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS,
} from './comment-list.component';
import {
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  ScopeFilter,
  SCOPE_FILTER_CURRENT_CHAPTER,
  TEAM_ASSIGNED_USER,
  UNFILTERED,
} from './comment-list-filters.model';

/**
 * `CommentListPanel` is the presentational half of the legacy comment-list web view: a comment /
 * scope filter toolbar above the comment list, with loading and empty states. The web view supplies
 * the threads and the PAPI-backed callbacks; the filters are controlled because the web view uses
 * them to query threads.
 */

const localizedStrings = getLocalizedStrings([
  ...Array.from(COMMENT_LIST_STRING_KEYS),
  ...COMMENT_LIST_PANEL_EXTRA_STRING_KEYS,
]);

const CURRENT_USER = 'Current User';

const makeComment = (
  overrides: Partial<LegacyComment> & Pick<LegacyComment, 'id'>,
): LegacyComment => ({
  user: 'Alice',
  date: '2024-01-02T09:30:00.0000000-00:00',
  contents: 'We should double-check this rendering against the source text.',
  deleted: false,
  hideInTextWindow: false,
  language: 'en',
  isRead: true,
  startPosition: 0,
  thread: overrides.thread ?? 'thread-1',
  verseRef: overrides.verseRef ?? 'GEN 1:1',
  ...overrides,
});

const sampleThreads: LegacyCommentThread[] = [
  {
    id: 'thread-1',
    verseRef: 'GEN 1:1',
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-02T10:00:00.0000000-00:00',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: false,
    assignedUser: CURRENT_USER,
    comments: [
      makeComment({ id: 'c1', thread: 'thread-1', verseRef: 'GEN 1:1' }),
      makeComment({
        id: 'c2',
        thread: 'thread-1',
        verseRef: 'GEN 1:1',
        user: 'Bob',
        contents: 'Good catch — I will update the draft.',
        date: '2024-01-02T10:00:00.0000000-00:00',
      }),
    ],
  },
  {
    id: 'thread-2',
    verseRef: 'GEN 1:3',
    status: 'Resolved',
    type: 'Normal',
    modifiedDate: '2024-01-03T14:15:00.0000000-00:00',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: true,
    comments: [
      makeComment({
        id: 'c3',
        thread: 'thread-2',
        verseRef: 'GEN 1:3',
        user: 'Charlie',
        contents: 'Resolved in the latest send/receive.',
        status: 'Resolved',
      }),
    ],
  },
  // In a different chapter (GEN 2) so the "current chapter" scope filter visibly removes it.
  {
    id: 'thread-3',
    verseRef: 'GEN 2:7',
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-04T08:00:00.0000000-00:00',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: false,
    assignedUser: CURRENT_USER,
    comments: [
      makeComment({
        id: 'c4',
        thread: 'thread-3',
        verseRef: 'GEN 2:7',
        user: 'Dana',
        contents: 'Should this be "formed" or "created"?',
        isRead: false,
      }),
    ],
  },
];

/** A long thread list (GEN 1:1–30) for the Scrollable story, enough to overflow the panel. */
const manyThreads: LegacyCommentThread[] = Array.from({ length: 30 }, (_, index) => {
  const verse = index + 1;
  const id = `scroll-thread-${verse}`;
  const verseRef = `GEN 1:${verse}`;
  return {
    id,
    verseRef,
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-02T10:00:00.0000000-00:00',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: false,
    comments: [makeComment({ id: `${id}-c1`, thread: id, verseRef })],
  };
});

/** The "current chapter" the scope filter narrows to in these stories (GEN 1). */
const STORY_SCR_REF = { book: 'GEN', chapterNum: 1 };

/**
 * Mirrors the web view's comment-thread selector: the panel renders already-filtered threads, so
 * here we derive the visible threads from the toolbar filters the same way the web view's PDP query
 * would — the orthogonal resolved/read/type/assignment axes AND'd with the current-chapter scope.
 */
function filterThreads(
  threads: LegacyCommentThread[],
  filters: CommentFilters,
  scopeFilter: ScopeFilter,
  currentUser: string,
): LegacyCommentThread[] {
  return threads.filter((thread) => {
    if (scopeFilter === SCOPE_FILTER_CURRENT_CHAPTER) {
      const chapterPrefix = `${STORY_SCR_REF.book} ${STORY_SCR_REF.chapterNum}:`;
      if (!thread.verseRef?.startsWith(chapterPrefix)) return false;
    }
    if (filters.resolved === 'unresolved' && thread.status === 'Resolved') return false;
    if (filters.resolved === 'resolved' && thread.status !== 'Resolved') return false;
    if (filters.read === 'unread' && thread.isRead) return false;
    if (filters.read === 'read' && !thread.isRead) return false;
    if (filters.type === 'conflicts' && thread.type !== 'Conflict') return false;
    if (filters.type === 'comments' && thread.type !== 'Normal') return false;
    if (filters.assignment === 'assigned-to-me' && thread.assignedUser !== currentUser)
      return false;
    if (filters.assignment === 'team' && thread.assignedUser !== TEAM_ASSIGNED_USER) return false;
    // "Unassigned" = no assignee. Sample threads omit `assignedUser` (undefined); real threads carry
    // the empty-string UNASSIGNED_USER sentinel. Both are falsy.
    if (filters.assignment === 'unassigned' && thread.assignedUser) return false;
    return true;
  });
}

const resolveTrue = () => Promise.resolve(true);

const meta: Meta<typeof CommentListPanel> = {
  title: 'Bundled Extensions/legacy-comment-manager/CommentListPanel',
  component: CommentListPanel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CommentListPanel>;

type DecoratorConfig = {
  isLoading?: boolean;
  threads?: LegacyCommentThread[];
  initialFilters?: Partial<CommentFilters>;
  canScopeToCurrentChapter?: boolean;
  /**
   * Render the panel with no bounding-height ancestor, reproducing the real web view where nothing
   * sets a height on `html`/`body`/`#root` so `tw:h-full` collapses to `auto` and the document is
   * the scroll container. This is the layout in which `tw:sticky` is load-bearing; a bounded
   * ancestor (the default `tw:h-screen` wrapper) instead makes the inner list the scroller, where
   * the toolbar is trivially always visible with or without `sticky`.
   */
  unbounded?: boolean;
};

/**
 * Wires the controlled filters and the selected-thread state to local state, and backs the comment
 * writes with a thin in-memory store so add/edit/delete/read changes reflect in the UI (like the
 * real app). Navigating to the editor is announced via `alertCommand` (different UI).
 */
function createDecorator(config: DecoratorConfig) {
  return function CommentListPanelDecorator(
    Story: (update?: { args: CommentListPanelProps }) => ReactElement,
  ) {
    const [filters, setFilters] = useState<CommentFilters>({
      ...DEFAULT_COMMENT_FILTERS,
      ...config.initialFilters,
    });
    const [scopeFilter, setScopeFilter] = useState<ScopeFilter>(UNFILTERED);
    const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(undefined);
    const [threads, setThreads] = useState<LegacyCommentThread[]>(config.threads ?? sampleThreads);

    // The panel renders already-filtered threads (the web view filters via its query), so derive the
    // visible list from the toolbar filters here.
    const displayedThreads = filterThreads(threads, filters, scopeFilter, CURRENT_USER);

    return (
      // A bounded height (default) makes the inner list the scroller; `unbounded` drops it so the
      // document scrolls, reproducing the real web view where `tw:sticky` is what pins the toolbar.
      <div className={config.unbounded ? undefined : 'tw:h-screen'}>
        <Story
          args={{
            localizedStrings,
            isLoading: config.isLoading ?? false,
            threads: displayedThreads,
            currentUser: CURRENT_USER,
            filters,
            onFiltersChange: setFilters,
            scopeFilter,
            onScopeFilterChange: setScopeFilter,
            canScopeToCurrentChapter: config.canScopeToCurrentChapter,
            assignableUsers: ['', 'Alice', 'Bob', 'Charlie', CURRENT_USER],
            canUserAddCommentToThread: true,
            canUserAssignThreadCallback: resolveTrue,
            canUserResolveThreadCallback: resolveTrue,
            canUserEditOrDeleteCommentCallback: resolveTrue,
            handleAddCommentToThread: (options) => {
              const newCommentId = `${options.threadId}-${Date.now()}`;
              setThreads((prev) =>
                prev.map((thread) =>
                  thread.id === options.threadId
                    ? {
                        ...thread,
                        comments: [
                          ...thread.comments,
                          makeComment({
                            id: newCommentId,
                            thread: thread.id,
                            verseRef: thread.verseRef,
                            user: CURRENT_USER,
                            contents: options.contents ?? '',
                            isRead: false,
                            ...(options.status && { status: options.status }),
                            ...(options.assignedUser !== undefined && {
                              assignedUser: options.assignedUser,
                            }),
                          }),
                        ],
                        ...(options.status && { status: options.status }),
                        ...(options.assignedUser !== undefined && {
                          assignedUser: options.assignedUser,
                        }),
                      }
                    : thread,
                ),
              );
              return Promise.resolve(newCommentId);
            },
            handleUpdateComment: (commentId, contents) => {
              setThreads((prev) =>
                prev.map((thread) => ({
                  ...thread,
                  comments: thread.comments.map((comment) =>
                    comment.id === commentId ? { ...comment, contents } : comment,
                  ),
                })),
              );
              return Promise.resolve(true);
            },
            handleDeleteComment: (commentId) => {
              setThreads((prev) =>
                prev
                  .map((thread) => ({
                    ...thread,
                    comments: thread.comments.map((comment) =>
                      comment.id === commentId ? { ...comment, deleted: true } : comment,
                    ),
                  }))
                  .filter((thread) => thread.comments.some((comment) => !comment.deleted)),
              );
              return Promise.resolve(true);
            },
            handleReadStatusChange: (threadId, markAsRead) => {
              setThreads((prev) =>
                prev.map((thread) =>
                  thread.id === threadId ? { ...thread, isRead: markAsRead } : thread,
                ),
              );
              return Promise.resolve(true);
            },
            selectedThreadId,
            onSelectedThreadChange: setSelectedThreadId,
            onVerseRefClick: (thread) =>
              alertCommand('platformScriptureEditor.selectRange', { verseRef: thread.verseRef }),
          }}
        />
      </div>
    );
  };
}

/** A populated, unfiltered list with an open and a resolved thread. */
export const Populated: Story = {
  decorators: [createDecorator({})],
};

/**
 * A long list that overflows the panel: the comments scroll while the filter toolbar stays pinned
 * at the top. Rendered `unbounded` (no bounding-height ancestor) so the document scrolls — the same
 * scroll model as the real web view, where `tw:sticky` is what keeps the toolbar visible. Delete
 * the `tw:sticky tw:top-0 tw:z-10` classes on the toolbar and this story visibly regresses (the
 * toolbar scrolls out of view), which is the whole point of PT-4070.
 */
export const Scrollable: Story = {
  decorators: [createDecorator({ threads: manyThreads, unbounded: true })],
};

/** Threads are still loading — show skeletons. */
export const Loading: Story = {
  decorators: [createDecorator({ isLoading: true })],
};

/** No comments exist at all (both filters unset) — shows the "no comments" message. */
export const Empty: Story = {
  decorators: [createDecorator({ threads: [] })],
};

/** No comments match the active filter — shows the "no comments match filter" message. */
export const EmptyFiltered: Story = {
  decorators: [createDecorator({ threads: [], initialFilters: { type: 'conflicts' } })],
};

/**
 * A list with no current chapter to follow (e.g. a cross-project open from the Send/Receive results
 * link): the scope dropdown omits "current chapter" and offers only "all books".
 */
export const NoCurrentChapter: Story = {
  decorators: [createDecorator({ canScopeToCurrentChapter: false })],
};
