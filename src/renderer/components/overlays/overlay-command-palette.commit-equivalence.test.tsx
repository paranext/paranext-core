/**
 * Committed equals highlighted, end to end.
 *
 * A palette commit is resolved twice over, by two pieces of code that never see each other's
 * answer: the component decides which item to show as selected from the list it rendered, and
 * `commitCommandPaletteSelection` decides which item to resolve from the overlay store. Nothing
 * structural forces those to agree — they agree only because both sides run `filterPaletteItems`
 * over the same items with the same mode and search fields, and clamp the same driving index. When
 * they disagree, the user watches one marker highlight and a different marker land in the
 * document.
 *
 * The suites in `overlay-command-palette.component.test.tsx` and `overlay.service-host.test.ts` pin
 * each side's own behavior. These tests pin the AGREEMENT: drive a gesture, read the item the
 * palette is visibly showing as selected, commit through the real host, and require the resolved id
 * to be that item. A change to either side's filtering, ranking, or index handling that re-opens
 * the gap fails here even when both sides' own unit tests still pass.
 */

import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  CommandPaletteItem,
  CommandPaletteRequest,
  OverlayEntry,
} from '../../services/overlays/overlay.service-model';
import {
  getOverlays,
  getOverlayById,
  clearAllOverlays,
} from '../../services/overlays/overlay-store';
import { OverlayCommandPalette } from './overlay-command-palette.component';

// The store-connected component resolves LocalizeKeys via useLocalizedStrings; an empty map makes
// every value fall back to its raw text, so tests assert against the literal item labels.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
}));

vi.mock('./../../services/overlays/overlay-validation', () => ({
  validateCommandPaletteRequest: vi.fn(),
  validateContextMenuItems: vi.fn(),
  validatePopoverRequest: vi.fn(),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(() => Promise.resolve()),
}));

vi.mock('./../../services/overlays/overlay-coordinates', () => ({
  translateCoordinates: vi.fn((_, position) => position),
  clampToViewport: vi.fn((position) => position),
  isWebViewVisible: vi.fn(() => true),
  getWebViewIframe: vi.fn(() => undefined),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: { getWebViewMenu: vi.fn() },
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: {
    getFocus: vi.fn(() => Promise.resolve({ focusType: 'webView', id: 'test-webview' })),
    setFocus: vi.fn(() => Promise.resolve()),
    subscribeFocus: vi.fn(() => Promise.resolve(vi.fn())),
  },
}));

vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedStrings: vi.fn(() => Promise.resolve({})) },
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => () => () => {}),
}));

// Import the service after its mocks are set up
// eslint-disable-next-line import/first
import { overlayService, resetDebounceState } from '../../services/overlays/overlay.service-host';

const WEB_VIEW_ID = 'test-webview';

beforeAll(() => {
  // Radix Popover uses ResizeObserver internally; jsdom doesn't provide it.
  global.ResizeObserver = class {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}

    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}

    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
  // cmdk calls scrollIntoView, which jsdom doesn't implement
  Element.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  resetDebounceState();
  clearAllOverlays();
});

/**
 * The live command-palette entry from the overlay store — the same object the real overlay host
 * renders from, and the same state `commitCommandPaletteSelection` resolves against.
 */
function currentPaletteEntry(): Extract<OverlayEntry, { type: 'commandPalette' }> {
  const overlay = getOverlayById(getOverlays()[0].id);
  if (!overlay || overlay.type !== 'commandPalette')
    throw new Error('no command palette overlay in the store');
  return overlay;
}

/** Everything an option renders as text, in render order, so a rendered option identifies its item. */
function optionTextOf(item: CommandPaletteItem): string {
  return `${item.label}${item.description ?? ''}${item.badge ?? ''}`;
}

/**
 * The id of the item the palette is currently showing as selected. Both modes mark the selected
 * option with `aria-selected` — cmdk does it for active palettes, `PassivePaletteItem` for passive
 * ones — so this reads what the user can see regardless of which mode drove the highlight.
 */
function highlightedItemId(items: CommandPaletteItem[]): string {
  const highlighted = screen
    .getAllByRole('option')
    .filter((option) => option.getAttribute('aria-selected') === 'true');
  expect(highlighted).toHaveLength(1);
  const text = highlighted[0].textContent ?? '';
  const item = items.find((candidate) => optionTextOf(candidate) === text);
  if (!item) throw new Error(`no item renders as ${JSON.stringify(text)}`);
  return item.id;
}

/** Commits through the real host and returns the id it resolved. */
async function commitAndGetId(promise: Promise<string | undefined>): Promise<string> {
  await overlayService.commitCommandPaletteSelection(WEB_VIEW_ID);
  const committedId = await promise;
  if (!committedId) throw new Error('commit resolved without an item id');
  return committedId;
}

describe('command palette: the committed item is the highlighted item', () => {
  describe('passive mode (the editor’s `\\` marker palette — host drives every keystroke)', () => {
    // Labels are bare markers and the context order puts prefix-mates ahead of the exact match,
    // which is the shape that produced the original "typed \f, got \fk" report.
    const markerRequest: CommandPaletteRequest = {
      items: [
        { id: 'fk', label: 'fk' },
        { id: 'fq', label: 'fq' },
        { id: 'fr', label: 'fr' },
        { id: 'ft', label: 'ft' },
        { id: 'f', label: 'f' },
      ],
      passive: true,
      searchFields: ['label'],
    };

    it('agrees on the exact match a filter ranks first, ahead of its prefix-mates', async () => {
      const promise = overlayService.showCommandPalette(markerRequest, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { filterText: 'f' });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const shown = highlightedItemId(markerRequest.items);

      expect(shown).toBe('f');
      expect(await commitAndGetId(promise)).toBe(shown);
    });

    it('agrees after an arrow move down the filtered list', async () => {
      const promise = overlayService.showCommandPalette(markerRequest, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { filterText: 'f' });
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { moveSelection: 2 });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const shown = highlightedItemId(markerRequest.items);

      expect(await commitAndGetId(promise)).toBe(shown);
    });

    it('agrees when a move runs past the end of the filtered list and clamps', async () => {
      const promise = overlayService.showCommandPalette(markerRequest, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { filterText: 'fr' });
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { moveSelection: 9 });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const shown = highlightedItemId(markerRequest.items);

      expect(shown).toBe('fr');
      expect(await commitAndGetId(promise)).toBe(shown);
    });

    // The dangerous order: an arrow-key index left over from the old list, then a new filter that
    // re-ranks. Clamping alone would leave the highlight on whatever now sits at that position.
    it('agrees when a new filter re-ranks the list under a carried-over index', async () => {
      const promise = overlayService.showCommandPalette(markerRequest, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { moveSelection: 3 });
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { filterText: 'f' });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const shown = highlightedItemId(markerRequest.items);

      expect(await commitAndGetId(promise)).toBe(shown);
    });

    it('agrees on a filter that narrows to a single item', async () => {
      const promise = overlayService.showCommandPalette(markerRequest, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { filterText: 'ft' });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const shown = highlightedItemId(markerRequest.items);

      expect(shown).toBe('ft');
      expect(await commitAndGetId(promise)).toBe(shown);
    });

    // The one place the two answers may differ, and it is a guard rather than a wrong-marker bug:
    // a commit never resolves a DISABLED item, so when the highlight rests on one it steps forward
    // to the next enabled item (specified on `IOverlayService.commitCommandPaletteSelection`).
    // Passive arrow movement, unlike cmdk's in active mode, does not skip disabled items, so the
    // highlight CAN rest there. Pinned so the exception stays visible: no palette supplies disabled
    // items today, and one that starts to should be measured against this rather than surprised by
    // it.
    it('steps past a DISABLED highlighted item rather than committing it (the one exception)', async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'a', label: 'Alpha' },
          { id: 'b', label: 'Bravo', disabled: true },
          { id: 'c', label: 'Charlie' },
        ],
        passive: true,
      };
      const promise = overlayService.showCommandPalette(request, WEB_VIEW_ID);
      await overlayService.updateCommandPalette(WEB_VIEW_ID, { moveSelection: 1 });

      render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);

      expect(highlightedItemId(request.items)).toBe('b');
      expect(await commitAndGetId(promise)).toBe('c');
    });
  });

  describe('active mode (the app’s host palette — the palette’s own input takes the keystrokes)', () => {
    // Containment matching: commit-through-the-store parity is the CONTAINMENT regime's contract.
    // A default (fuzzy) palette lets cmdk own filtering/highlight, and its commits go through the
    // palette UI (click/Enter/Space on the highlighted item), never through
    // commitCommandPaletteSelection's store resolution.
    const commandRequest: CommandPaletteRequest = {
      disableFuzzyMatching: true,
      items: [
        { id: 'open', label: 'Open File', description: 'Open an existing file' },
        { id: 'save', label: 'Save File', description: 'Write the file to disk' },
        { id: 'close', label: 'Close Tab', description: 'Close the current tab' },
      ],
    };

    /**
     * Renders the store-connected palette and returns a `type` that drives its own input, then
     * re-renders from the store the input's mirror just wrote — the round trip a forwarded commit
     * depends on.
     */
    function renderConnected() {
      const { rerender } = render(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      const syncFromStore = () =>
        rerender(<OverlayCommandPalette overlay={currentPaletteEntry()} />);
      return {
        type: (text: string) => {
          fireEvent.change(screen.getByRole('combobox'), { target: { value: text } });
          syncFromStore();
        },
        arrowDown: (times: number) => {
          for (let i = 0; i < times; i += 1)
            fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
          syncFromStore();
        },
      };
    }

    it('agrees on the top match of a typed filter', async () => {
      const promise = overlayService.showCommandPalette(commandRequest, WEB_VIEW_ID);
      const palette = renderConnected();

      palette.type('File');
      const shown = highlightedItemId(commandRequest.items);

      expect(await commitAndGetId(promise)).toBe(shown);
    });

    it('agrees after arrowing down within a typed filter', async () => {
      const promise = overlayService.showCommandPalette(commandRequest, WEB_VIEW_ID);
      const palette = renderConnected();

      palette.type('File');
      palette.arrowDown(1);
      const shown = highlightedItemId(commandRequest.items);

      expect(await commitAndGetId(promise)).toBe(shown);
    });

    // Description containment is what buried exact marker matches. The fixture is built so that
    // honoring the opt-in CHANGES WHICH ITEM the arrow lands on: "paragraph" hits one item's label
    // and the other's description, so a side that ignores searchFields has a two-item list where
    // the other has one — and the move down resolves differently on each.
    it("agrees under searchFields: ['label'], where description hits are excluded", async () => {
      const request: CommandPaletteRequest = {
        items: [
          { id: 'p', label: 'Paragraph (p)', description: 'Normal body text' },
          { id: 'm', label: 'Margin (m)', description: 'Flush-left paragraph' },
        ],
        searchFields: ['label'],
      };
      const promise = overlayService.showCommandPalette(request, WEB_VIEW_ID);
      const palette = renderConnected();

      palette.type('paragraph');
      palette.arrowDown(1);
      const shown = highlightedItemId(request.items);

      expect(shown).toBe('p');
      expect(await commitAndGetId(promise)).toBe(shown);
    });

    it('agrees when the filter is retyped and the list re-ranks under a moved index', async () => {
      const promise = overlayService.showCommandPalette(commandRequest, WEB_VIEW_ID);
      const palette = renderConnected();

      palette.type('File');
      palette.arrowDown(1);
      palette.type('Tab');
      const shown = highlightedItemId(commandRequest.items);

      expect(shown).toBe('close');
      expect(await commitAndGetId(promise)).toBe(shown);
    });
  });
});
