// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { CommentListPanel, CommentListPanelProps } from './comment-list.component';
import { DEFAULT_COMMENT_FILTERS, UNFILTERED } from './comment-list-filters.model';

const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing is paused while this project syncs.';

// Only the notice's own key and the empty-list message need real values; every other lookup
// (toolbar aria-labels, dropdown option labels) is exercised elsewhere (e.g.
// comment-list.stories.tsx) and simply renders blank here, which is harmless for these tests.
const STRINGS: LanguageStrings = {
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
  '%no_comments%': 'No comments',
};

/**
 * Renders CommentListPanel with an empty thread list. This keeps the render lean — the empty-state
 * branch skips platform-bible-react's full CommentList tree (comment-list.component.tsx ~222-231) —
 * while still exercising the toolbar and the sync-blocked notice above it (~256-268), which render
 * regardless of the list content.
 */
function renderPanel(overrides: Partial<CommentListPanelProps> = {}) {
  return render(
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

describe('CommentListPanel content zoom area', () => {
  it('exposes exactly one content zoom marker', () => {
    const { container } = renderPanel();
    expect(container.querySelectorAll('[data-platform-content-zoom-root]')).toHaveLength(1);
  });

  it("marks it as the view's main area (empty attribute value)", () => {
    const { container } = renderPanel();
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.getAttribute('data-platform-content-zoom-root')).toBe('');
  });

  it("keeps the list container's layout classes", () => {
    const { container } = renderPanel();
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.className).toContain('tw:flex-1');
    expect(marker?.className).toContain('tw:overflow-auto');
  });

  it('leaves the filter toolbar outside the zoom area', () => {
    const { container } = renderPanel();
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.contains(screen.getByTestId('comment-scope-filter'))).toBe(false);
  });

  it('leaves the sync-blocked notice outside the zoom area', () => {
    const { container } = renderPanel({ isSyncBlocked: true });
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.contains(screen.getByRole('status'))).toBe(false);
  });

  it('keeps the empty-state message inside the zoom area', () => {
    const { container } = renderPanel({ threads: [] });
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.textContent).toBe('No comments');
  });

  it('keeps loading skeletons inside the zoom area', () => {
    const { container } = renderPanel({ isLoading: true });
    const marker = container.querySelector('[data-platform-content-zoom-root]');
    expect(marker?.querySelectorAll('[data-slot="skeleton"], .tw\\:h-48').length).toBeGreaterThan(
      0,
    );
  });
});
