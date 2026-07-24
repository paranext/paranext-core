// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { CommentListPanel, CommentListPanelProps } from './comment-list.component';
import { DEFAULT_COMMENT_FILTERS, UNFILTERED } from './comment-list-filters.model';

const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing is paused while this project syncs.';

// Only the notice's own key needs a real value; every other lookup (toolbar aria-labels, dropdown
// option labels) is exercised elsewhere (e.g. comment-list.stories.tsx) and simply renders blank
// here, which is harmless for this notice-focused test.
const STRINGS: LanguageStrings = {
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
};

/**
 * Renders CommentListPanel with an empty thread list. This keeps the render lean — the empty-state
 * branch skips platform-bible-react's full CommentList tree (comment-list.component.tsx ~222-231) —
 * while still exercising the toolbar and the sync-blocked notice above it (~256-268), which render
 * regardless of the list content.
 */
function renderPanel(overrides: Partial<CommentListPanelProps> = {}) {
  render(
    <CommentListPanel
      localizedStrings={STRINGS}
      isLoading={false}
      threads={[]}
      currentUser="Tester"
      filters={DEFAULT_COMMENT_FILTERS}
      onFiltersChange={vi.fn()}
      scopeFilter={UNFILTERED}
      onScopeFilterChange={vi.fn()}
      handleAddCommentToThread={vi.fn()}
      handleUpdateComment={vi.fn()}
      handleDeleteComment={vi.fn()}
      handleReadStatusChange={vi.fn()}
      {...overrides}
    />,
  );
}

describe('CommentListPanel sync-blocked notice', () => {
  it('renders the notice when isSyncBlocked is true', () => {
    renderPanel({ isSyncBlocked: true });
    expect(screen.getByRole('status')).toHaveTextContent(SYNC_BLOCKED_NOTICE_TEXT);
  });

  it('omits the notice when isSyncBlocked is false', () => {
    renderPanel({ isSyncBlocked: false });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('omits the notice when isSyncBlocked is not passed (defaults to false)', () => {
    renderPanel();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
