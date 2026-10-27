// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { DblResourceReference } from 'platform-scripture';
import {
  ResourceCollectionOptions,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  RESOURCE_COLLECTION_VIEW_MODES,
  isResourceCollectionViewMode,
} from './resource-collection-options.component';
import type {
  ResourceCollectionOptionsProps,
  ViewOptionsTextEntry,
} from './resource-collection-options.types';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip/Popover wire
// ResizeObservers. A no-op stub keeps the render path from throwing.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // A vi.fn factory satisfies ResizeObserver's runtime contract but not its structural type; the
    // cast through unknown is the standard adapter (same pattern as structure-protection-button.test).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

const STRINGS: Record<string, string> = Object.fromEntries(
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS.map((key) => [key, key]),
);
// Human-readable overrides for the strings the tests assert on.
STRINGS['%webView_scriptureTextGrid_viewOptions_viewHeader%'] = 'View';
STRINGS['%webView_scriptureTextGrid_viewOptions_verse%'] = 'Verse';
STRINGS['%webView_scriptureTextGrid_viewOptions_chapter%'] = 'Chapter';
STRINGS['%webView_scriptureTextGrid_viewOptions_grid%'] = 'Grid';
STRINGS['%webView_scriptureTextGrid_viewOptions_chapterNotYetAvailable%'] =
  'Chapter view is not yet available.';
STRINGS['%webView_scriptureTextGrid_viewOptions_textsHeader%'] = 'Texts';
STRINGS['%webView_scriptureTextGrid_viewOptions_getResources%'] = 'Get resources…';
STRINGS['%webView_scriptureTextGrid_viewOptions_teamSharedLock%'] = 'Shared by your team';
STRINGS['%webView_scriptureTextGrid_viewOptions_removeFromList%'] =
  'Remove {resourceName} from list';
STRINGS['%webView_scriptureTextGrid_viewOptions_removeFromListHint%'] =
  'Removing a text takes it off your list on every tab.';
STRINGS['%webView_scriptureTextGrid_viewOptions_installing%'] = 'Installing {resourceName}…';
STRINGS['%webView_scriptureTextGrid_viewOptions_emptyState_prompt%'] =
  'No texts added yet. Use {getResourcesLabel} to add them.';
STRINGS['%webView_scriptureTextGrid_viewOptions_teamResourcesHeader%'] = 'Team resources';
STRINGS['%webView_scriptureTextGrid_viewOptions_userResourcesHeader%'] = 'User resources';

const ref = (id: string, name: string): DblResourceReference => ({
  type: 'dblResource',
  name,
  id,
});

const row = (
  id: string,
  name: string,
  overrides?: Partial<ViewOptionsTextEntry>,
): ViewOptionsTextEntry => ({
  reference: ref(id, name),
  checked: true,
  isAdminLocked: false,
  isUserRemovable: false,
  ...overrides,
});

function renderComponent(overrides?: Partial<ResourceCollectionOptionsProps>) {
  const props: ResourceCollectionOptionsProps = {
    viewMode: 'verse',
    onViewModeChange: vi.fn(),
    isChapterEnabled: false,
    top: [],
    bottom: [],
    onCheckedChange: vi.fn(),
    onRemoveFromList: vi.fn(),
    onGetResources: vi.fn(),
    localizedStrings: STRINGS,
    ...overrides,
  };
  render(<ResourceCollectionOptions {...props} />);
  return props;
}

afterEach(() => vi.clearAllMocks());

describe('ResourceCollectionOptions — VIEW toggle', () => {
  it('renders Verse selected and Chapter disabled with a "not yet available" hint by default', () => {
    renderComponent({ viewMode: 'verse', isChapterEnabled: false });
    const verse = screen.getByRole('radio', { name: 'Verse' });
    const chapter = screen.getByRole('radio', { name: /Chapter/ });
    expect(verse).toHaveAttribute('data-state', 'on');
    expect(chapter).toBeDisabled();
    // The hint renders after the whole toggle group rather than beside the item it describes, so
    // it has to name the mode itself — Grid sits between it and the disabled Chapter item.
    expect(screen.getByText('Chapter view is not yet available.')).toBeInTheDocument();
  });

  it('enables Chapter and hides the "not yet available" hint when isChapterEnabled is true', () => {
    renderComponent({ isChapterEnabled: true });
    expect(screen.getByRole('radio', { name: /Chapter/ })).toBeEnabled();
    expect(screen.queryByText('Chapter view is not yet available.')).not.toBeInTheDocument();
  });

  it('fires onViewModeChange when a different mode is picked', () => {
    const props = renderComponent({ viewMode: 'verse', isChapterEnabled: true });
    fireEvent.click(screen.getByRole('radio', { name: /Chapter/ }));
    expect(props.onViewModeChange).toHaveBeenCalledWith('chapter');
  });

  it('does not fire onViewModeChange when Chapter is disabled', () => {
    const props = renderComponent({ viewMode: 'verse', isChapterEnabled: false });
    fireEvent.click(screen.getByRole('radio', { name: /Chapter/ }));
    expect(props.onViewModeChange).not.toHaveBeenCalled();
  });

  it('offers Grid as a third mode and reports it as `aligned`', () => {
    // The label is "Grid"; the value stays `aligned` because the whole surface is the Scripture
    // Text Grid, so `viewMode === 'grid'` inside it would not say which grid.
    const props = renderComponent({ viewMode: 'verse', isChapterEnabled: true });
    fireEvent.click(screen.getByRole('radio', { name: 'Grid' }));
    expect(props.onViewModeChange).toHaveBeenCalledWith('aligned');
  });

  it('shows Grid as the selected mode when it is active', () => {
    renderComponent({ viewMode: 'aligned', isChapterEnabled: true });
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('data-state', 'on');
  });
});

describe('isResourceCollectionViewMode', () => {
  it.each([...RESOURCE_COLLECTION_VIEW_MODES])('accepts %s', (mode) => {
    expect(isResourceCollectionViewMode(mode)).toBe(true);
  });

  // The chosen mode is persisted per web view, so a saved layout can outlive the build that wrote
  // it and name a mode this one cannot render. Callers coerce through this rather than handing an
  // unrenderable mode to the grid.
  it.each([undefined, '', 'grid', 'parallel', 0, {}])('rejects %o', (value) => {
    expect(isResourceCollectionViewMode(value)).toBe(false);
  });
});

describe('ResourceCollectionOptions — TEXTS list', () => {
  // Per UX: admin-chosen resources always stay visible in the top grouping of View Options — a user
  // can never remove them from the list. But a user may still hide an admin resource from the grid
  // (e.g. to save space) by unchecking it. So admin (top) rows render WITH a checkbox (hide/show)
  // but WITHOUT a remove (✕) control (can't be dropped from the list).
  it('renders admin (top) rows with checkboxes and no remove control', () => {
    renderComponent({
      top: [row('a1', 'Admin Text', { isAdminLocked: true, checked: true })],
    });
    expect(screen.getByRole('checkbox', { name: 'Admin Text' })).toBeChecked();
    expect(screen.queryByRole('button', { name: /Remove Admin Text/ })).not.toBeInTheDocument();
  });

  it('renders the remove (X) control only on user-removable bottom rows', () => {
    renderComponent({
      bottom: [
        row('u1', 'My Text', { isUserRemovable: true }),
        row('a2', 'Downloaded Text', { isUserRemovable: false }),
      ],
    });
    expect(screen.getByRole('button', { name: 'Remove My Text from list' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Remove Downloaded Text from list' }),
    ).not.toBeInTheDocument();
  });

  it('fires onCheckedChange with the resource id and next checked state', () => {
    const props = renderComponent({
      bottom: [row('u1', 'My Text', { isUserRemovable: true, checked: true })],
    });
    fireEvent.click(screen.getByRole('checkbox', { name: 'My Text' }));
    expect(props.onCheckedChange).toHaveBeenCalledWith('u1', false);
  });

  it('fires onRemoveFromList with the resource id', () => {
    const props = renderComponent({
      bottom: [row('u1', 'My Text', { isUserRemovable: true })],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Remove My Text from list' }));
    expect(props.onRemoveFromList).toHaveBeenCalledWith('u1');
  });

  it('shows an "Installing {name}…" row for pending installs', () => {
    renderComponent({ installingResourceNames: ['New Resource'] });
    expect(screen.getByText('Installing New Resource…')).toBeInTheDocument();
  });

  // The ✕ removes from the list the Bible texts and Commentaries tabs read too, which nothing on
  // the row says.
  it('says what removing does, and describes each remove control with it', () => {
    renderComponent({ bottom: [row('u1', 'My Text', { isUserRemovable: true })] });
    expect(
      screen.getByRole('button', { name: 'Remove My Text from list' }),
    ).toHaveAccessibleDescription('Removing a text takes it off your list on every tab.');
  });

  it('says nothing about removing when no row can be removed', () => {
    renderComponent({ top: [row('a1', 'Admin Text', { isAdminLocked: true })] });
    // Positive control: the list rendered, so the missing hint is a real answer.
    expect(screen.getByRole('checkbox', { name: 'Admin Text' })).toBeInTheDocument();
    expect(
      screen.queryByText('Removing a text takes it off your list on every tab.'),
    ).not.toBeInTheDocument();
  });
});

describe("ResourceCollectionOptions — team resources and the user's own", () => {
  const TEAM_ROW = row('a1', 'Admin Text', { isAdminLocked: true });
  const USER_ROW = row('u1', 'My Text', { isUserRemovable: true });

  it("groups the team's resources above the user's own", () => {
    renderComponent({ top: [TEAM_ROW], bottom: [USER_ROW] });

    const teamGroup = screen.getByRole('group', { name: 'Team resources' });
    const userGroup = screen.getByRole('group', { name: 'User resources' });
    expect(within(teamGroup).getByRole('checkbox', { name: 'Admin Text' })).toBeInTheDocument();
    expect(within(teamGroup).queryByRole('checkbox', { name: 'My Text' })).toBeNull();
    expect(within(userGroup).getByRole('checkbox', { name: 'My Text' })).toBeInTheDocument();
    expect(
      // compareDocumentPosition reports its answer as bit flags
      // eslint-disable-next-line no-bitwise
      teamGroup.compareDocumentPosition(userGroup) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('keeps a single unlabeled list when the team shared nothing', () => {
    renderComponent({ bottom: [USER_ROW], installingResourceNames: ['New Resource'] });

    // Positive control: the rows themselves are on screen, so the absent headings are a real answer.
    expect(screen.getByRole('checkbox', { name: 'My Text' })).toBeInTheDocument();
    // By name: the VIEW toggle is itself a `group`.
    expect(screen.queryByRole('group', { name: 'Team resources' })).toBeNull();
    expect(screen.queryByRole('group', { name: 'User resources' })).toBeNull();
    expect(screen.queryByText('Team resources')).toBeNull();
    expect(screen.queryByText('User resources')).toBeNull();
  });

  it('lists every row as one plain list when ungrouped, with no headings or locks', () => {
    renderComponent({ top: [TEAM_ROW], bottom: [USER_ROW], isGrouped: false });

    // Positive control: both rows are on screen, team row first, so the absences are real answers.
    const teamBox = screen.getByRole('checkbox', { name: 'Admin Text' });
    const userBox = screen.getByRole('checkbox', { name: 'My Text' });
    expect(
      // compareDocumentPosition reports its answer as bit flags
      // eslint-disable-next-line no-bitwise
      teamBox.compareDocumentPosition(userBox) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.queryByText('Team resources')).toBeNull();
    expect(screen.queryByText('User resources')).toBeNull();
    expect(screen.queryByLabelText('Shared by your team')).toBeNull();
    // Still the team's: unchecking is the only control, with no ✕ to remove it.
    expect(screen.queryByLabelText('Remove Admin Text from list')).toBeNull();
    expect(screen.getByLabelText('Remove My Text from list')).toBeInTheDocument();
  });

  it("labels only the team group when every row is the team's", () => {
    renderComponent({ top: [TEAM_ROW] });

    expect(screen.getByRole('group', { name: 'Team resources' })).toBeInTheDocument();
    expect(screen.queryByText('User resources')).toBeNull();
  });

  it("files a resource being installed under the user's own, even when it is the only one", () => {
    renderComponent({ top: [TEAM_ROW], installingResourceNames: ['New Resource'] });

    expect(
      within(screen.getByRole('group', { name: 'User resources' })).getByText(
        'Installing New Resource…',
      ),
    ).toBeInTheDocument();
  });

  it('keeps the lock on team rows inside the group', () => {
    renderComponent({ top: [TEAM_ROW], bottom: [USER_ROW] });

    expect(
      within(screen.getByRole('group', { name: 'Team resources' })).getByRole('img', {
        name: 'Shared by your team',
      }),
    ).toBeInTheDocument();
  });
});

describe('ResourceCollectionOptions — Get Resources', () => {
  it('fires onGetResources when the button is clicked, with no arguments', () => {
    const props = renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Get resources…' }));
    expect(props.onGetResources).toHaveBeenCalledTimes(1);
    // Verify no React event is forwarded — passing the event over the PAPI websocket causes a
    // circular-JSON error that silently drops the dialog-open RPC payload.
    expect(props.onGetResources).toHaveBeenCalledWith();
  });
});

describe('ResourceCollectionOptions — disabled (no project/PDP bound)', () => {
  it('disables the checkboxes and the remove control, but not Get Resources, when disabled', () => {
    renderComponent({
      disabled: true,
      bottom: [row('u1', 'My Text', { isUserRemovable: true })],
    });
    expect(screen.getByRole('button', { name: 'Get resources…' })).toBeEnabled();
    expect(screen.getByRole('checkbox', { name: 'My Text' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove My Text from list' })).toBeDisabled();
  });

  // A button that renders enabled but whose handler is gated would still pass the enabled check
  // above, so assert the callback actually fires.
  it('fires onGetResources when the button is clicked while disabled', () => {
    const props = renderComponent({
      disabled: true,
      bottom: [row('u1', 'My Text', { isUserRemovable: true })],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Get resources…' }));
    expect(props.onGetResources).toHaveBeenCalledTimes(1);
    expect(props.onGetResources).toHaveBeenCalledWith();
  });

  it('shows the disabled message when disabled', () => {
    renderComponent({ disabled: true, disabledMessage: 'No project selected.' });
    expect(screen.getByText('No project selected.')).toBeInTheDocument();
  });

  it('does not show the disabled message when enabled', () => {
    renderComponent({ disabled: false, disabledMessage: 'No project selected.' });
    expect(screen.queryByText('No project selected.')).not.toBeInTheDocument();
  });
});

describe('ResourceCollectionOptions — empty TEXTS list', () => {
  it('shows the empty-texts prompt with the Get Resources label interpolated (ellipsis dropped)', () => {
    renderComponent({ top: [], bottom: [], installingResourceNames: [] });
    // The button label is 'Get resources…'; embedded mid-sentence the trailing ellipsis is dropped.
    expect(
      screen.getByText('No texts added yet. Use Get resources to add them.'),
    ).toBeInTheDocument();
  });

  // A localizer may end the label with any of several trailing-ellipsis forms; each should be
  // stripped when the label is embedded mid-sentence in the prompt.
  it.each([
    ['three-ASCII-dot fallback', 'Get resources...'],
    ['CJK double ellipsis', 'Get resources……'],
    ['ellipsis with trailing space', 'Get resources… '],
    ['ellipsis with trailing full-width space', 'Get resources…　'],
  ])('drops the trailing ellipsis from the interpolated label (%s)', (_label, getResources) => {
    renderComponent({
      top: [],
      bottom: [],
      installingResourceNames: [],
      localizedStrings: {
        ...STRINGS,
        '%webView_scriptureTextGrid_viewOptions_getResources%': getResources,
      },
    });
    expect(
      screen.getByText('No texts added yet. Use Get resources to add them.'),
    ).toBeInTheDocument();
  });

  it('hides the empty-texts prompt when a user (bottom) row is present', () => {
    renderComponent({ bottom: [row('u1', 'My Text', { isUserRemovable: true })] });
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });

  it('hides the empty-texts prompt when only an admin (top) row is present', () => {
    renderComponent({ top: [row('a1', 'Admin Text', { isAdminLocked: true })] });
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });

  it('hides the empty-texts prompt while an install is pending', () => {
    renderComponent({ installingResourceNames: ['New Resource'] });
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });

  it('shows the disabled message, not the empty prompt, when disabled with a message', () => {
    renderComponent({ disabled: true, disabledMessage: 'No project selected.' });
    expect(screen.getByText('No project selected.')).toBeInTheDocument();
    expect(screen.queryByText(/No texts added yet/)).not.toBeInTheDocument();
  });
});

describe('ResourceCollectionOptions — truncated names', () => {
  it('exposes the full name via a title attribute so truncation stays readable', () => {
    const longName = 'A Very Long Digital Bible Library Resource Display Name';
    renderComponent({ bottom: [row('u1', longName)] });
    expect(screen.getByText(longName)).toHaveAttribute('title', longName);
  });

  it('renders the short name and long name when longName is set', () => {
    renderComponent({
      bottom: [row('niv', 'NIV', { longName: 'New International Version' })],
    });
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.getByText('— New International Version')).toBeInTheDocument();
  });

  it('exposes the full "short — long" label via the title attribute', () => {
    renderComponent({
      bottom: [row('niv', 'NIV', { longName: 'New International Version' })],
    });
    expect(screen.getByTitle('NIV — New International Version')).toBeInTheDocument();
  });

  it('renders only the short name (no separator) when longName is absent', () => {
    renderComponent({ bottom: [row('niv', 'NIV')] });
    expect(screen.getByText('NIV')).toBeInTheDocument();
    expect(screen.queryByText(/—/)).not.toBeInTheDocument();
  });
});

describe('ResourceCollectionOptions locked-admin indicator', () => {
  it('shows a lock (not a remove button) on the admin-shared row', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [row('b', 'My NIV', { isUserRemovable: true })],
    });
    expect(screen.getByLabelText('Shared by your team')).toBeInTheDocument();
    // Admin row has no "Remove ... from list" control.
    expect(screen.queryByLabelText('Remove Admin ESV from list')).not.toBeInTheDocument();
  });

  it('shows a remove button (not a lock) on the user row', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [row('b', 'My NIV', { isUserRemovable: true })],
    });
    expect(screen.getByLabelText('Remove My NIV from list')).toBeInTheDocument();
  });

  it('shows neither a lock nor a remove control on a downloaded row', () => {
    // Downloaded rows land in the bottom section: not the team's (isAdminLocked false) and not
    // user-removable. They must show no lock and no remove (✕) control.
    renderComponent({
      bottom: [row('a2', 'Downloaded Text', { isAdminLocked: false, isUserRemovable: false })],
    });
    expect(screen.queryByLabelText('Shared by your team')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Downloaded Text from list')).not.toBeInTheDocument();
  });

  it('the lock is not a focusable/tab-stop button', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [],
    });
    const lock = screen.getByLabelText('Shared by your team');
    expect(lock.tagName).not.toBe('BUTTON');
  });
});
