// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { DblResourceReference } from 'platform-scripture';
import {
  ResourceCollectionOptions,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
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
STRINGS['%webView_scriptureTextGrid_viewOptions_comingSoon%'] = 'Coming soon';
STRINGS['%webView_scriptureTextGrid_viewOptions_textsHeader%'] = 'Texts';
STRINGS['%webView_scriptureTextGrid_viewOptions_getResources%'] = 'Get resources…';
STRINGS['%webView_scriptureTextGrid_viewOptions_removeFromList%'] =
  'Remove {resourceName} from list';
STRINGS['%webView_scriptureTextGrid_viewOptions_adminSharedLock%'] = 'Shared by administrator';
STRINGS['%webView_scriptureTextGrid_viewOptions_installing%'] = 'Installing {resourceName}…';
STRINGS['%webView_scriptureTextGrid_viewOptions_emptyState_prompt%'] =
  'No texts added yet. Use {getResourcesLabel} to add them.';

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
  it('renders Verse selected and Chapter disabled with a "coming soon" hint by default', () => {
    renderComponent({ viewMode: 'verse', isChapterEnabled: false });
    const verse = screen.getByRole('radio', { name: 'Verse' });
    const chapter = screen.getByRole('radio', { name: /Chapter/ });
    expect(verse).toHaveAttribute('data-state', 'on');
    expect(chapter).toBeDisabled();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });

  it('enables Chapter and hides the "coming soon" hint when isChapterEnabled is true', () => {
    renderComponent({ isChapterEnabled: true });
    expect(screen.getByRole('radio', { name: /Chapter/ })).toBeEnabled();
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument();
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
});

describe('ResourceCollectionOptions — TEXTS list', () => {
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
        row('a2', 'Opted-out Admin', { isUserRemovable: false }),
      ],
    });
    expect(screen.getByRole('button', { name: 'Remove My Text from list' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Remove Opted-out Admin from list' }),
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
});

describe('ResourceCollectionOptions — Get Resources', () => {
  it('fires onGetResources when the button is clicked', () => {
    const props = renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Get resources…' }));
    expect(props.onGetResources).toHaveBeenCalledTimes(1);
  });
});

describe('ResourceCollectionOptions — disabled (no project/PDP bound)', () => {
  it('disables Get Resources, checkboxes, and the remove control when disabled', () => {
    renderComponent({
      disabled: true,
      bottom: [row('u1', 'My Text', { isUserRemovable: true })],
    });
    expect(screen.getByRole('button', { name: 'Get resources…' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'My Text' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove My Text from list' })).toBeDisabled();
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
});

describe('ResourceCollectionOptions locked-admin indicator', () => {
  it('shows a lock (not a remove button) on the admin-shared row', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [row('b', 'My NIV', { isUserRemovable: true })],
    });
    expect(screen.getByLabelText('Shared by administrator')).toBeInTheDocument();
    // Admin row has no "Remove ... from list" control.
    expect(screen.queryByLabelText('Remove Admin ESV from list')).not.toBeInTheDocument();
  });

  it('shows a remove button (not a lock) on the user row', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [row('b', 'My NIV', { isUserRemovable: true })],
    });
    expect(screen.getByLabelText('Remove My NIV from list')).toBeInTheDocument();
    expect(screen.queryByLabelText('Shared by administrator')).toBeInTheDocument(); // from admin row only
  });

  it('the lock is not a focusable/tab-stop button', () => {
    renderComponent({
      top: [row('a', 'Admin ESV', { isAdminLocked: true, isUserRemovable: false })],
      bottom: [],
    });
    const lock = screen.getByLabelText('Shared by administrator');
    expect(lock.tagName).not.toBe('BUTTON');
  });
});
