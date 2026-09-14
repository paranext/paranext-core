// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { CommentListPanel, CommentListPanelProps } from './comment-list.component';
import { DEFAULT_COMMENT_FILTERS, UNFILTERED } from './comment-list-filters.model';

// Radix Select scrolls its highlighted item into view on open and checks pointer capture on
// pointerdown; jsdom implements neither.
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
});

const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing is paused while this project syncs.';
const FILTERS_LABEL = 'Filters';

// Every lookup below has a real value: the filter toolbar is now collapsed behind a popover whose
// trigger, chips, and rows are exercised by name/text in the tests below, so a blank string would
// make those assertions pass vacuously. Values otherwise match the production English strings in
// contributions/localizedStrings.json.
const STRINGS: LanguageStrings = {
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
  '%comment_filter_button%': FILTERS_LABEL,
  '%comment_filter_chip_clear%': 'Clear {axis} filter',
  '%comment_filter_axis_resolved%': 'Resolved status',
  '%comment_filter_axis_read%': 'Read status',
  '%comment_filter_axis_type%': 'Note type',
  '%comment_filter_axis_assignment%': 'Assignment',
  '%comment_filter_axis_author%': 'Author',
  '%comment_filter_axis_date%': 'Date',
  '%comment_filter_axis_scope%': 'Scope',
  '%comment_filter_aria_resolved%': 'Filter by resolved status',
  '%comment_filter_resolved_all%': 'All resolved statuses',
  '%comment_filter_resolved_unresolved%': 'Unresolved',
  '%comment_filter_date_last_7_days%': 'Last 7 days',
  '%comment_filter_type_all%': 'All types',
  '%comment_filter_author_all%': 'All authors',
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

describe('CommentListPanel filter toolbar', () => {
  it('renders one filters trigger rather than a row of dropdowns', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: FILTERS_LABEL })).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('shows a chip only for axes that are not at their default', () => {
    renderPanel({
      filters: { ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved', date: 'last-7-days' },
    });

    expect(screen.getByText('Unresolved')).toBeInTheDocument();
    expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    // Axes still at their default must not produce chips, or a fresh list shows seven of them.
    expect(screen.queryByText('All types')).not.toBeInTheDocument();
    expect(screen.queryByText('All authors')).not.toBeInTheDocument();
  });

  it('clears an axis back to its default when its chip is dismissed', async () => {
    const onFiltersChange = vi.fn();
    renderPanel({
      filters: { ...DEFAULT_COMMENT_FILTERS, resolved: 'unresolved' },
      onFiltersChange,
    });

    await userEvent.click(screen.getByRole('button', { name: 'Clear Resolved status filter' }));

    expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ resolved: 'all' }));
  });

  it('adds no plain-text search and no sort control', () => {
    // The PRD excludes both. A test keeps a well-meaning follow-up from adding them.
    renderPanel();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sort/i })).not.toBeInTheDocument();
  });

  it('keeps the filters popover open and applies the change when a nested axis Select is used', async () => {
    // The filters popover nests a Radix Select per closed-union axis. Radix's dismiss-on-outside-
    // click reads a click by DOM containment; a Select's own portal renders outside the popover's
    // content unless re-contained (see the `filtersPopoverContentEl` wiring in the component), so
    // this both exercises the popover staying keyboard/mouse operable AND guards against a
    // regression where selecting an axis value silently closes the whole popover.
    const onFiltersChange = vi.fn();
    renderPanel({ onFiltersChange });

    await userEvent.click(screen.getByRole('button', { name: FILTERS_LABEL }));
    await userEvent.click(screen.getByRole('combobox', { name: 'Filter by resolved status' }));
    await userEvent.click(await screen.findByRole('option', { name: 'Unresolved' }));

    expect(onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ resolved: 'unresolved' }),
    );
    // A row further down the popover is still mounted, proving the popover itself never closed.
    expect(screen.getByText('Read status')).toBeInTheDocument();
  });
});
