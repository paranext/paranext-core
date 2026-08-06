// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkerMenuItem } from 'platform-bible-react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// cmdk instantiates a ResizeObserver and schedules scrollTo/scrollIntoView; jsdom ships none.
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

// Mutable mock so one test can flip interface mode and assert both directions.
const mockMode = { isPowerMode: false };
vi.mock('./use-is-power-mode.hook', () => ({
  useIsPowerMode: () => mockMode.isPowerMode,
}));

// Imported after the mock so the component picks up the mocked `useIsPowerMode`.
// eslint-disable-next-line import/first
import {
  CharacterMarkerControl,
  CharacterMarkerToolbar,
} from './character-marker-control.component';

const STRINGS = {
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%': 'Character marker',
  '%webView_platformScriptureEditor_characterMarkerControl_mixed%': '(mixed)',
  '%webView_platformScriptureEditor_characterMarkerControl_none%': '(none)',
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%':
    'No character markers are available here.',
  '%webView_platformScriptureEditor_characterMarkerMenu_searchPlaceholder%':
    'Search to add a character style.',
  '%webView_platformScriptureEditor_syncEditBlocked_banner%':
    'Editing paused — Send/Receive in progress',
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

const ITEMS: MarkerMenuItem[] = [
  { marker: 'bd', title: 'Bold', selectionState: 'partial', action: vi.fn() },
  { marker: 'it', title: 'Italic', selectionState: 'none', action: vi.fn() },
];

function renderControl(overrides: Partial<Parameters<typeof CharacterMarkerControl>[0]> = {}) {
  return render(
    <CharacterMarkerToolbar>
      <CharacterMarkerControl
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={vi.fn()}
        onClose={vi.fn()}
        localizedStrings={STRINGS}
        {...overrides}
      />
    </CharacterMarkerToolbar>,
  );
}

afterEach(() => {
  vi.clearAllMocks();
  mockMode.isPowerMode = false;
});

describe('CharacterMarkerControl — trigger label', () => {
  it('shows the marker and its description when one applies', () => {
    renderControl({ currentMarker: 'bd', currentMarkerLabel: 'Bold' });
    expect(screen.getByRole('button')).toHaveTextContent('bd - Bold');
  });

  it('shows (mixed) when the selection is not homogeneous', () => {
    renderControl({ isMixed: true, currentMarker: 'bd', currentMarkerLabel: 'Bold' });
    expect(screen.getByRole('button')).toHaveTextContent('(mixed)');
    expect(screen.getByRole('button')).not.toHaveTextContent('Bold');
  });

  it('shows (none) when no character marker applies', () => {
    renderControl();
    expect(screen.getByRole('button')).toHaveTextContent('(none)');
  });

  it('includes the current label in the accessible name, not just the static description', () => {
    // The visible label is the control's only readout of the current marker, so the accessible
    // name must include it too (WCAG 2.5.3, label-in-name) — a screen-reader user must hear
    // "Character marker: bd - Bold", not just "Character marker".
    renderControl({ currentMarker: 'bd', currentMarkerLabel: 'Bold' });
    expect(screen.getByRole('button', { name: 'Character marker: bd - Bold' })).toBeInTheDocument();
  });

  it('renders no visible label but keeps the value in the accessible name when isLabelHidden', () => {
    renderControl({ currentMarker: 'bd', isLabelHidden: true });

    // The accessible name is the ONLY readout of the value once the label is gone, so it must still
    // carry it — this assertion is load-bearing, not incidental.
    const trigger = screen.getByRole('button', { name: 'Character marker: bd' });
    expect(trigger).toBeInTheDocument();
    // `bd` must not appear as rendered text anywhere in the trigger.
    expect(trigger).not.toHaveTextContent('bd');
  });

  it('renders the visible label by default', () => {
    renderControl({ currentMarker: 'bd' });

    expect(screen.getByRole('button', { name: 'Character marker: bd' })).toHaveTextContent('bd');
  });
});

describe('CharacterMarkerControl — disabled states', () => {
  it('disables the button and surfaces the sync tooltip text while sync-blocked', () => {
    renderControl({ isSyncBlocked: true });

    expect(screen.getByRole('button')).toBeDisabled();
    // The wrapper carries the explanation because a disabled button cannot host its own tooltip.
    expect(screen.getByLabelText('Editing paused — Send/Receive in progress')).toBeInTheDocument();
  });

  it('disables the button with the no-markers tooltip when the item list is empty', () => {
    renderControl({ markerMenuItems: [] });

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByLabelText('No character markers are available here.')).toBeInTheDocument();
  });
});

describe('CharacterMarkerControl — tooltip', () => {
  it('shows the current marker in a tooltip when the label is hidden', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        isLabelHidden
      />,
    );

    await user.hover(screen.getByRole('button', { name: 'Character marker: bd' }));

    // Radix renders the tooltip content into a portal with role="tooltip".
    expect(await screen.findByRole('tooltip')).toHaveTextContent('bd');
  });

  it('does not announce the value a second time through the tooltip', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        currentMarkerLabel="Bold"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        isLabelHidden
      />,
    );

    await user.hover(screen.getByRole('button', { name: 'Character marker: bd - Bold' }));
    // The tooltip is showing, so Radix has wired its visually-hidden copy up as the trigger
    // wrapper's `aria-describedby` — which is exactly the second announcement being suppressed.
    expect(await screen.findByRole('tooltip')).toHaveTextContent('bd - Bold');

    // The accessible name is the single readout; the tooltip is the visual channel only. Without
    // `aria-hidden` on the tooltip's text this description reads 'bd - Bold', duplicating the name.
    const tooltipTrigger = document.querySelector('[data-slot="tooltip-trigger"]');
    if (!tooltipTrigger) throw new Error('expected a tooltip trigger');
    expect(tooltipTrigger).toHaveAccessibleDescription('');
  });

  it('shows no tooltip when the label is visible and the control is enabled', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
      />,
    );

    await user.hover(screen.getByRole('button', { name: 'Character marker: bd' }));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('CharacterMarkerControl — menu', () => {
  it('opens the popover, focuses the search input, and fires onOpen', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onOpen = vi.fn();
    renderControl({ onOpen });

    await user.click(screen.getByRole('button'));

    expect(onOpen).toHaveBeenCalledTimes(1);
    const search = screen.getByPlaceholderText('Search to add a character style.');
    expect(search).toHaveFocus();
  });

  it('passes each item selection state through to the menu rows', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderControl();

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('option', { name: /Bold/ })).toHaveAttribute('aria-checked', 'mixed');
    expect(screen.getByRole('option', { name: /Italic/ })).toHaveAttribute('aria-checked', 'false');
  });

  it('fires the item action on selection', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    renderControl({
      markerMenuItems: [{ marker: 'bd', title: 'Bold', selectionState: 'none', action }],
    });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: /Bold/ }));

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('is operable by keyboard alone and fires onClose when the popover closes', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onClose = vi.fn();
    renderControl({ onClose });

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByPlaceholderText('Search to add a character style.')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('opens the menu inline-start of the trigger when menuAlign is end', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        menuAlign="end"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Character marker: bd' }));

    const content = await screen.findByRole('dialog');
    expect(content).toHaveAttribute('data-align', 'end');
  });

  it('defaults the menu to align start', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Character marker: bd' }));

    expect(await screen.findByRole('dialog')).toHaveAttribute('data-align', 'start');
  });

  it('resolves the menu alignment against menuDirection when one is given', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        menuAlign="end"
        menuDirection="rtl"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Character marker: bd' }));

    // floating-ui mirrors start/end from the PORTALED content's own direction, and the portal target
    // (`document.body`) inherits none in this app — so this attribute is the only thing that makes
    // `align="end"` logical rather than physical.
    expect(await screen.findByRole('dialog')).toHaveAttribute('dir', 'rtl');
  });

  it('leaves the popover its own direction default when no menuDirection is given', async () => {
    const user = userEvent.setup();
    render(
      <CharacterMarkerControl
        currentMarker="bd"
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={ITEMS}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        menuAlign="end"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Character marker: bd' }));

    // `dir` is spread conditionally, not passed as `dir={undefined}`: PopoverContent's own
    // `readDirection()` value would otherwise be blanked out for every consumer that passes nothing.
    expect(await screen.findByRole('dialog')).toHaveAttribute('dir', 'ltr');
  });
});

describe('CharacterMarkerToolbar', () => {
  it('renders nothing in Power mode and everything in Simple mode', () => {
    mockMode.isPowerMode = true;
    const { unmount } = renderControl();
    // Absent from the tree, not merely hidden — a hidden control would still affect layout.
    expect(screen.queryByRole('button')).toBeNull();
    unmount();

    mockMode.isPowerMode = false;
    renderControl();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders additional slot children without any change to the control', () => {
    // U1: a second action button must be addable without editing this component's internals.
    render(
      <CharacterMarkerToolbar>
        <CharacterMarkerControl
          isMixed={false}
          isSyncBlocked={false}
          markerMenuItems={ITEMS}
          onOpen={vi.fn()}
          onClose={vi.fn()}
          localizedStrings={STRINGS}
        />
        <button type="button">Second action</button>
      </CharacterMarkerToolbar>,
    );

    expect(screen.getByRole('button', { name: 'Second action' })).toBeInTheDocument();
  });
});
