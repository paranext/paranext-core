// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { CommentListPanel, CommentListPanelProps } from './comment-list.component';
import { DEFAULT_COMMENT_FILTERS, DEFAULT_SCOPE_FILTER } from './comment-list-filters.model';

// Radix Select scrolls its highlighted item into view on open and checks pointer capture on
// pointerdown; jsdom implements neither. cmdk uses ResizeObserver, which jsdom also doesn't
// provide.
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  global.ResizeObserver = class {
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
});

const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';
const SYNC_BLOCKED_NOTICE_TEXT = 'Editing is paused while this project syncs.';
const PRESET_ARIA = 'Filter comments';
const SCOPE_ARIA = 'Filter by scope';

// Every lookup below has a real value: the toolbar now renders both dropdowns' options directly, so
// a blank string would make the selection/option assertions below pass vacuously.
const STRINGS: LanguageStrings = {
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
  '%comment_filter_aria_preset%': PRESET_ARIA,
  '%comment_filter_aria_scope%': SCOPE_ARIA,
  '%comment_filter_preset_all%': 'All comments',
  '%comment_filter_preset_unresolved_assigned_to_me%': 'Unresolved, assigned to me',
  '%comment_filter_preset_unresolved%': 'Unresolved',
  '%comment_filter_preset_unread_assigned_to_me%': 'Unread, assigned to me',
  '%comment_filter_preset_unread%': 'Unread',
  '%comment_filter_preset_unread_and_unresolved%': 'Unread and unresolved',
  '%comment_filter_preset_resolved%': 'Resolved',
  '%comment_filter_preset_unsaved%': 'Unsaved notes',
  '%comment_filter_preset_conflict%': 'Conflicts',
  '%comment_filter_scope_all_books%': 'All books',
  '%comment_filter_scope_current_book%': 'Current book',
  '%comment_filter_scope_current_chapter%': 'Current chapter',
  '%comment_filter_scope_current_verse%': 'Current verse',
};

/**
 * Renders CommentListPanel with an empty thread list. This keeps the render lean — the empty-state
 * branch skips platform-bible-react's full CommentList tree — while still exercising the toolbar
 * and the sync-blocked notice above it, which render regardless of the list content.
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
      scopeFilter={DEFAULT_SCOPE_FILTER}
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
  it('renders the preset and scope dropdowns directly in the toolbar', () => {
    renderPanel();
    expect(screen.getByRole('combobox', { name: PRESET_ARIA })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: SCOPE_ARIA })).toBeInTheDocument();
    // No collapsed trigger: the options are visible without opening anything.
    expect(screen.queryByRole('button', { name: /filters/i })).not.toBeInTheDocument();
  });

  it('shows the current selection as each dropdown’s value', () => {
    renderPanel({ filters: { preset: 'unread' }, scopeFilter: 'current-verse' });
    expect(screen.getByRole('combobox', { name: PRESET_ARIA })).toHaveTextContent('Unread');
    expect(screen.getByRole('combobox', { name: SCOPE_ARIA })).toHaveTextContent('Current verse');
  });

  it('reports a preset change through onFiltersChange', async () => {
    const onFiltersChange = vi.fn();
    renderPanel({ onFiltersChange });

    await userEvent.click(screen.getByRole('combobox', { name: PRESET_ARIA }));
    await userEvent.click(screen.getByRole('option', { name: 'Resolved' }));

    expect(onFiltersChange).toHaveBeenCalledWith({ preset: 'resolved' });
  });

  it('disables the unsaved preset until draft tracking exists', async () => {
    renderPanel();
    await userEvent.click(screen.getByRole('combobox', { name: PRESET_ARIA }));
    expect(screen.getByRole('option', { name: 'Unsaved notes' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });
});
