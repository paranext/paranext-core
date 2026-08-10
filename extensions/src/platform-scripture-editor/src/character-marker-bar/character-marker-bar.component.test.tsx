// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const removeCharacterMarker = vi.fn();
vi.mock('./use-remove-character-marker.hook', () => ({
  useRemoveCharacterMarker: () => removeCharacterMarker,
}));

// Imported after the mock so CharacterMarkerToolbar picks up the mocked useIsPowerMode.
// eslint-disable-next-line import/first
import { CharacterMarkerBar } from './character-marker-bar.component';

const STRINGS = {
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%': 'Character marker',
  // The separators are localized rather than concatenated in code, so the accessible name and the
  // visible label both come out of these patterns. Values match `contributions/localizedStrings.json`.
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%': '{name}: {value}',
  '%webView_platformScriptureEditor_characterMarkerControl_label_format%':
    '{marker} - {description}',
  '%webView_platformScriptureEditor_characterMarkerControl_mixed%': '(mixed)',
  '%webView_platformScriptureEditor_characterMarkerControl_none%': '(none)',
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%':
    'No character markers are available here.',
  // Lives in `platform-bible-react` beside its `_insert`/`_paragraph` siblings, not in this
  // extension — all three fill the same shared `MarkerMenu` search field.
  '%markerMenu_searchPlaceholder_character%': 'Search character markers',
  '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%': 'Remove character marker',
  '%webView_platformScriptureEditor_syncEditBlocked_banner%': 'Editing paused',
  // `usfmMarkers.bd.description`. The editor web view loads every marker description (see
  // EDITOR_LOCALIZED_STRINGS), so the bar really does have this string available at runtime.
  '%markerMenu_marker_bd_description%': 'Bold',
};

// A selection that reports two different json paths reads as `(mixed)` via the hook's O(1) check;
// one path reads as not-mixed. The mutable holder lets a test change the selection and assert the
// label follows, which is the staleness the selection-version hook exists to prevent.
type TestSelection = { start: { jsonPath: string }; end?: { jsonPath: string } };

const selectionHolder: { current: TestSelection } = {
  current: { start: { jsonPath: '$.content[0]' } },
};

function renderBar(overrides: Partial<Parameters<typeof CharacterMarkerBar>[0]> = {}) {
  return render(
    <CharacterMarkerBar
      // The ref needs to start out with null for it to work as an element ref
      // eslint-disable-next-line no-null/no-null
      editorRef={{ current: null }}
      getSelection={() => selectionHolder.current}
      blockMarker="p"
      contextMarker="bd"
      isSyncBlocked={false}
      textDirection="ltr"
      localizedStrings={STRINGS}
      {...overrides}
    />,
  );
}

afterEach(() => {
  mockMode.isPowerMode = false;
  selectionHolder.current = { start: { jsonPath: '$.content[0]' } };
});

describe('CharacterMarkerBar', () => {
  it('carries the marker AND its localized name in the accessible name', () => {
    renderBar();
    // The trigger is icon-only, so the accessible name (and the tooltip that mirrors it) is the whole
    // readout — and the tooltip is `max-w-xs`, with room for the full name. Passing the bare code
    // would make a screen-reader user and a sighted user both hear/see only `bd`.
    expect(screen.getByRole('button', { name: 'Character marker: bd - Bold' })).toBeInTheDocument();
    // Still no VISIBLE label — the 64px gutter has no room for one.
    expect(screen.queryByText(/bd - /)).not.toBeInTheDocument();
  });

  it('refreshes the label when the selection changes', () => {
    renderBar();
    expect(screen.getByRole('button', { name: 'Character marker: bd - Bold' })).toBeInTheDocument();

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

  it('renders the trigger icon-only', () => {
    renderBar();

    const trigger = screen.getByRole('button', { name: /Character marker/ });
    // The 64px gutter has no slack for a label, so the mount hides it. Asserted through the
    // rendered trigger rather than by spying on props, so it stays true if the prop is renamed.
    expect(trigger).not.toHaveTextContent('bd');
    expect(trigger).toHaveAccessibleName('Character marker: bd - Bold');
    // The reservation fits the chrome with zero slack, so the trigger clips rather than spilling
    // inline-start over project text — a structural guarantee, not arithmetic.
    expect(trigger).toHaveClass('tw:overflow-hidden');
  });

  it('opens its menu inline-start of the trigger', async () => {
    const user = userEvent.setup();
    renderBar();

    await user.click(screen.getByRole('button', { name: /Character marker/ }));

    // The trigger sits on the text column's trailing edge with no room inline-end of it for the
    // menu, so the mount passes menuAlign="end" — pinned here rather than left to
    // character-marker-control.component.test.tsx's own default/end coverage, since the mount's
    // *choice* of "end" (as opposed to the control's default "start") is the behavior this bar
    // owns.
    expect(await screen.findByRole('dialog')).toHaveAttribute('data-align', 'end');
  });

  it("hands the project's text direction to the menu so align='end' mirrors in RTL", async () => {
    const user = userEvent.setup();
    renderBar({ textDirection: 'rtl' });

    await user.click(screen.getByRole('button', { name: /Character marker/ }));

    // The menu portals to `document.body`, outside the only element this app gives a `dir`, so it
    // inherits no direction and `align="end"` would resolve PHYSICALLY — pinning a 200px menu to the
    // right in an RTL project, off the iframe's inline-start edge. Only an explicit `dir` mirrors it.
    expect(await screen.findByRole('dialog')).toHaveAttribute('dir', 'rtl');
  });

  it('offers a remove row that calls the removal action', async () => {
    // `contextMarker: 'nd'` is the caret sitting inside an existing \nd run — the single-marker
    // case, so the menu offers "Remove character marker".
    const user = userEvent.setup();
    renderBar({ contextMarker: 'nd' });

    await user.click(screen.getByRole('button'));
    await user.click(await screen.findByText('Remove character marker'));

    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
  });
});
