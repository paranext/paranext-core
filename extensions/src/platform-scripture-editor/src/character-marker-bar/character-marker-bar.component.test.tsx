// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// cmdk (inside MarkerMenu) instantiates a ResizeObserver and schedules scrollTo/scrollIntoView;
// jsdom ships none. Same shim the shipped control test uses.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const mockMode = { isPowerMode: false };
vi.mock('../use-is-power-mode.hook', () => ({ useIsPowerMode: () => mockMode.isPowerMode }));

// Imported after the mock so CharacterMarkerToolbar picks up the mocked useIsPowerMode.
// eslint-disable-next-line import/first
import { CharacterMarkerBar } from './character-marker-bar.component';

const STRINGS = {
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%': 'Character marker',
  '%webView_platformScriptureEditor_characterMarkerControl_mixed%': '(mixed)',
  '%webView_platformScriptureEditor_characterMarkerControl_none%': '(none)',
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%':
    'No character markers are available here.',
  '%webView_platformScriptureEditor_characterMarkerMenu_searchPlaceholder%':
    'Search to add a character style.',
  '%webView_platformScriptureEditor_syncEditBlocked_banner%': 'Editing paused',
};

// A selection that reports two different json paths reads as `(mixed)` via the hook's O(1) check;
// one path reads as not-mixed. The mutable holder lets a test change the selection and assert the
// label follows, which is the staleness the selection-version hook exists to prevent.
type TestSelection = { start: { jsonPath: string }; end?: { jsonPath: string } };

const selectionHolder: { current: TestSelection } = {
  current: { start: { jsonPath: '$.content[0]' } },
};

function renderBar() {
  return render(
    <CharacterMarkerBar
      // The ref needs to start out with null for it to work as an element ref
      // eslint-disable-next-line no-null/no-null
      editorRef={{ current: null }}
      getSelection={() => selectionHolder.current}
      blockMarker="p"
      contextMarker="bd"
      isSyncBlocked={false}
      localizedStrings={STRINGS}
    />,
  );
}

afterEach(() => {
  mockMode.isPowerMode = false;
  selectionHolder.current = { start: { jsonPath: '$.content[0]' } };
});

describe('CharacterMarkerBar', () => {
  it('shows the bare marker code, not the marker plus its localized name', () => {
    renderBar();
    // The compact trigger: this wrapper omits `currentMarkerLabel`, which is what fits the bar in
    // a 5em gutter with ZERO changes to the shipped control. The full name is in the popover list.
    expect(screen.getByRole('button', { name: /Character marker: bd$/ })).toBeInTheDocument();
    expect(screen.queryByText(/bd - /)).not.toBeInTheDocument();
  });

  it('refreshes the label when the selection changes', () => {
    renderBar();
    expect(screen.getByRole('button', { name: /Character marker: bd$/ })).toBeInTheDocument();

    // A selection spanning two json paths is `(mixed)`. Without the selection-version signal
    // nothing re-renders on a caret move and the label would stay stale at `bd`.
    selectionHolder.current = {
      start: { jsonPath: '$.content[0]' },
      end: { jsonPath: '$.content[3]' },
    };
    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(screen.getByRole('button', { name: /Character marker: \(mixed\)/ })).toBeInTheDocument();
  });

  it('renders nothing in Power mode', () => {
    mockMode.isPowerMode = true;
    renderBar();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
