import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import { LegacyComment, LegacyCommentThread } from 'platform-bible-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';
import { ContentZoomTextProvider } from '@/context/content-zoom-text.context';
import { CommentItem } from './comment-item.component';
import { CommentThread } from './comment-thread.component';
import { DiffHtml } from './conflict-diff';

const MARKER = '[data-platform-content-zoom-root]';

beforeAll(() => {
  // Radix primitives used by the card's buttons read these; jsdom implements none of them.
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class {
      // jsdom stub: intentionally no `this` usage
      // eslint-disable-next-line @typescript-eslint/class-methods-use-this
      observe() {}
      // jsdom stub: intentionally no `this` usage
      // eslint-disable-next-line @typescript-eslint/class-methods-use-this
      unobserve() {}
      // jsdom stub: intentionally no `this` usage
      // eslint-disable-next-line @typescript-eslint/class-methods-use-this
      disconnect() {}
    };
  }
  if (!Element.prototype.hasPointerCapture) Element.prototype.hasPointerCapture = () => false;
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
});

const localizedStrings = {
  '%comment_aria_mark_as_read%': 'Mark as read',
  '%comment_aria_mark_as_unread%': 'Mark as unread',
  '%comment_aria_resolve_thread%': 'Resolve thread',
  '%comment_dateAtTime%': '{date} at {time}',
  '%comment_date_today%': 'today',
  '%comment_date_yesterday%': 'yesterday',
  '%comment_replyOrAssign%': 'Reply or assign with @',
  '%comment_thread_multiple_replies%': '{count} replies',
  '%comment_thread_single_reply%': '1 reply',
};

const comment: LegacyComment = {
  id: 'c1',
  user: 'Alice Ann',
  date: '2024-01-01T00:00:00.000Z',
  contents: '<p>BODY TEXT</p>',
  deleted: false,
  hideInTextWindow: false,
  language: 'en',
  isRead: true,
  startPosition: 0,
  selectedText: 'SELECTED',
  contextBefore: 'BEFORE ',
  contextAfter: ' AFTER',
  thread: 't1',
  verseRef: 'GEN 1:1',
};

const thread: LegacyCommentThread = {
  id: 't1',
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

function withProvider(children: ReactNode) {
  return (
    <TooltipProvider>
      <ContentZoomTextProvider>{children}</ContentZoomTextProvider>
    </TooltipProvider>
  );
}

function threadElement() {
  return (
    <CommentThread
      comments={[comment]}
      localizedStrings={localizedStrings}
      currentUser="Current User"
      handleSelectThread={vi.fn()}
      threadId="t1"
      thread={thread}
      threadStatus="Todo"
      verseRef="GEN 1:1"
      onVerseRefClick={vi.fn()}
      isRead
      handleAddCommentToThread={vi.fn().mockResolvedValue('id')}
      handleUpdateComment={vi.fn().mockResolvedValue(true)}
      handleDeleteComment={vi.fn().mockResolvedValue(true)}
      canUserResolveThreadCallback={async () => true}
    />
  );
}

describe('comment cards mark their project text only inside a ContentZoomTextProvider', () => {
  it('marks a comment body, and not the author, date, avatar or buttons', () => {
    const { container } = render(
      withProvider(<CommentItem comment={comment} localizedStrings={localizedStrings} />),
    );
    const marked = Array.from(container.querySelectorAll(MARKER));
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe('BODY TEXT');
    expect(marked[0].contains(screen.getByText('Alice Ann'))).toBe(false);
    expect(marked[0].contains(screen.getByText('AA'))).toBe(false);
  });

  it('marks the thread’s scripture snippet and body, never the verse-reference button or the card controls', async () => {
    const { container } = render(withProvider(threadElement()));
    // The resolve permission arrives asynchronously; wait for it so its state update settles.
    await screen.findByRole('button', { name: 'Resolve thread' });
    const marked = Array.from(container.querySelectorAll(MARKER));
    expect(marked.map((element) => element.textContent)).toEqual([
      'BEFORE SELECTED AFTER',
      'BODY TEXT',
    ]);
    const markedHolds = (element: Element) => marked.some((m) => m.contains(element));
    expect(markedHolds(screen.getByRole('button', { name: 'Mark as unread' }))).toBe(false);
    expect(markedHolds(screen.getByText('GEN 1:1'))).toBe(false);
    expect(markedHolds(screen.getByRole('option'))).toBe(false);
  });

  it('marks the conflict diff', () => {
    const { container } = render(withProvider(<DiffHtml html="<p>town <s>village</s></p>" />));
    const marked = container.querySelectorAll(MARKER);
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe('town village');
  });

  it('marks nothing without a provider', async () => {
    const { container } = render(
      <TooltipProvider>
        {threadElement()}
        <DiffHtml html="<p>town</p>" />
      </TooltipProvider>,
    );
    await screen.findByRole('button', { name: 'Resolve thread' });
    expect(container.querySelectorAll(MARKER)).toHaveLength(0);
  });
});
