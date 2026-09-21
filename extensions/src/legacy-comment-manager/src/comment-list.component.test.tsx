// @vitest-environment jsdom

import { readFileSync } from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
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

type LocalizedStringsFile = {
  localizedStrings: Record<string, Record<string, string>>;
};

/**
 * The shipped English strings, read from the contribution the extension actually loads. The panel
 * looks its labels up by key, so a test that retyped them would keep passing while the shipped
 * wording drifted away from what it asserts.
 */
function readEnglishStrings(): Record<string, string> {
  const file: LocalizedStringsFile = JSON.parse(
    readFileSync(path.resolve(__dirname, '../contributions/localizedStrings.json'), 'utf-8'),
  );
  return file.localizedStrings.en;
}

const EN_STRINGS = readEnglishStrings();

const PRESET_ARIA = EN_STRINGS['%comment_filter_aria_preset%'];
const SCOPE_ARIA = EN_STRINGS['%comment_filter_aria_scope%'];

// The toolbar renders both dropdowns' options directly, so a key that resolved to a blank string
// would make the selection and option assertions below pass vacuously. `localized-strings.test.ts`
// holds the line that every key this panel requests is non-empty in each shipped language.
const STRINGS: LanguageStrings = {
  ...EN_STRINGS,
  // Deliberately overridden rather than read: this assertion names the text it expects, and the
  // notice is the one string here whose exact wording the test is making a claim about.
  [SYNC_BLOCKED_NOTICE_KEY]: SYNC_BLOCKED_NOTICE_TEXT,
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

describe('CommentListPanel empty state', () => {
  it('shows the generic empty message when no filters are active', () => {
    renderPanel(); // default filters: preset 'all', scope 'all-books'
    expect(screen.getByText(EN_STRINGS['%no_comments%'])).toBeInTheDocument();
    expect(screen.queryByText(EN_STRINGS['%no_comments_match_filter%'])).not.toBeInTheDocument();
  });

  it('shows the filtered-empty message when the unsaved preset has nothing drafted', () => {
    // Selectable for the first time as of this preset's enablement, so an empty result under it is a
    // newly reachable case: nothing was ever typed, so `threads` (already narrowed to drafted threads
    // by the web view) is empty. It must read as "nothing matches the filter", not as "no comments at
    // all" -- the two carry different implications for what the user should do next.
    renderPanel({ filters: { preset: 'unsaved' } });
    expect(screen.getByText(EN_STRINGS['%no_comments_match_filter%'])).toBeInTheDocument();
    expect(screen.queryByText(EN_STRINGS['%no_comments%'])).not.toBeInTheDocument();
  });
});

describe('CommentListPanel current-user-unavailable state', () => {
  it('shows the explanatory message instead of skeletons when loading is also true', () => {
    // currentUserNameUnavailable must win over isLoading: the whole point is that the panel stops
    // showing skeletons once the fetch is known to have failed, rather than leaving both states
    // simultaneously true and never reaching the explanatory message.
    renderPanel({ isLoading: true, currentUserNameUnavailable: true });
    expect(
      screen.getByText(EN_STRINGS['%comment_filter_current_user_unavailable%']),
    ).toBeInTheDocument();
  });

  it('shows the explanatory message instead of the empty state', () => {
    renderPanel({ isLoading: false, threads: [], currentUserNameUnavailable: true });
    expect(
      screen.getByText(EN_STRINGS['%comment_filter_current_user_unavailable%']),
    ).toBeInTheDocument();
    expect(screen.queryByText(EN_STRINGS['%no_comments%'])).not.toBeInTheDocument();
  });

  it('calls the retry callback when the retry button is clicked', async () => {
    const onRetry = vi.fn();
    renderPanel({ currentUserNameUnavailable: true, onRetryFetchCurrentUserName: onRetry });

    await userEvent.click(
      screen.getByRole('button', { name: EN_STRINGS['%comment_filter_retry_current_user%'] }),
    );

    expect(onRetry).toHaveBeenCalled();
  });

  it('omits the retry button when no retry callback is provided', () => {
    renderPanel({ currentUserNameUnavailable: true });
    expect(
      screen.queryByRole('button', { name: EN_STRINGS['%comment_filter_retry_current_user%'] }),
    ).not.toBeInTheDocument();
  });

  it('does not show the message when currentUserNameUnavailable is false (default)', () => {
    renderPanel();
    expect(
      screen.queryByText(EN_STRINGS['%comment_filter_current_user_unavailable%']),
    ).not.toBeInTheDocument();
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

  it('offers the unsaved preset as a selectable option', async () => {
    // Draft tracking now exists (see use-comment-drafts.hook.ts / the web view's unsaved-preset
    // filtering), so this preset is a normal, enabled option like any other -- unlike every other
    // preset here, this one specifically regressed to disabled once already, so assert the option is
    // enabled rather than merely present.
    const onFiltersChange = vi.fn();
    renderPanel({ onFiltersChange });

    await userEvent.click(screen.getByRole('combobox', { name: PRESET_ARIA }));
    const unsavedOption = screen.getByRole('option', {
      name: EN_STRINGS['%comment_filter_preset_unsaved%'],
    });
    expect(unsavedOption).not.toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(unsavedOption);
    expect(onFiltersChange).toHaveBeenCalledWith({ preset: 'unsaved' });
  });

  it('offers exactly the preset and scope dropdowns and no other filter control', () => {
    // The PRD excludes free-text search over comments and any sort control. Asserting the toolbar's
    // full contents catches an addition whatever it is called and whatever locale it renders in,
    // where naming the forbidden roles would only catch the spellings we happened to predict.
    renderPanel();

    const toolbar = screen.getByTestId('comment-preset-filter').closest('div');
    if (!toolbar) throw new Error('expected the preset dropdown to sit in a toolbar container');

    expect(within(toolbar).getAllByRole('combobox')).toHaveLength(2);
    expect(within(toolbar).queryByRole('textbox')).not.toBeInTheDocument();
    expect(within(toolbar).queryByRole('searchbox')).not.toBeInTheDocument();
    expect(within(toolbar).queryByRole('button')).not.toBeInTheDocument();
  });
});
