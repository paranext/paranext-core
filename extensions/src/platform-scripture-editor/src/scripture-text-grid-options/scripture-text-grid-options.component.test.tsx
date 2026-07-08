// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { DblResourceReference } from 'platform-scripture';
import {
  ScriptureTextGridOptions,
  SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS,
} from './scripture-text-grid-options.component';
import type {
  ScriptureTextGridOptionsProps,
  ViewOptionsTextEntry,
} from './scripture-text-grid-options.types';

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
  SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS.map((key) => [key, key]),
);
// Human-readable overrides for the strings the tests assert on.
STRINGS['%webView_scriptureTextGrid_viewOptions_viewHeader%'] = 'VIEW';
STRINGS['%webView_scriptureTextGrid_viewOptions_verse%'] = 'Verse';
STRINGS['%webView_scriptureTextGrid_viewOptions_chapter%'] = 'Chapter';
STRINGS['%webView_scriptureTextGrid_viewOptions_comingSoon%'] = 'Coming soon';
STRINGS['%webView_scriptureTextGrid_viewOptions_textsHeader%'] = 'TEXTS';
STRINGS['%webView_scriptureTextGrid_viewOptions_getResources%'] = 'Get Resources';
STRINGS['%webView_scriptureTextGrid_viewOptions_removeFromList%'] =
  'Remove {resourceName} from list';
STRINGS['%webView_scriptureTextGrid_viewOptions_installing%'] = 'Installing {resourceName}…';

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

function renderComponent(overrides?: Partial<ScriptureTextGridOptionsProps>) {
  const props: ScriptureTextGridOptionsProps = {
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
  render(<ScriptureTextGridOptions {...props} />);
  return props;
}

afterEach(() => vi.clearAllMocks());

describe('ScriptureTextGridOptions — VIEW toggle', () => {
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

describe('ScriptureTextGridOptions — TEXTS list', () => {
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

describe('ScriptureTextGridOptions — Get Resources', () => {
  it('fires onGetResources when the button is clicked', () => {
    const props = renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Get Resources' }));
    expect(props.onGetResources).toHaveBeenCalledTimes(1);
  });
});
