// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type { WebViewProps } from '@papi/core';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockReload, mockInventoryState, snapshotHandlers, NO_ITEMS } = vi.hoisted(() => {
  const inventoryState: { error: string | undefined } = { error: undefined };
  // Stable, as the real hook's state is: the web view resets its occurrences on every new list
  const noItems: unknown[] = [];
  return {
    mockReload: vi.fn(),
    NO_ITEMS: noItems,
    mockInventoryState: inventoryState,
    snapshotHandlers: new Set<(snapshot: unknown) => void>(),
  };
});

vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
  network: {
    getNetworkEvent: vi.fn(() => (handler: (snapshot: unknown) => void) => {
      snapshotHandlers.add(handler);
      return () => snapshotHandlers.delete(handler);
    }),
  },
}));

vi.mock('@papi/frontend/react', () => ({
  // Echo each key back as its own value, as the real hook does before it resolves, except for the
  // keys whose text the test reads
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(
      keys.map((key) => [
        key,
        key === '%webView_inventory_waitingForSync%' ? 'Waiting for the sync.' : key,
      ]),
    ),
  ],
  useProjectData: () => ({ MarkerNames: () => [[], vi.fn()] }),
  useProjectSetting: () => ['', vi.fn()],
  useData: () => ({ LocalizedStrings: () => [{}, vi.fn(), false] }),
}));

vi.mock('./hooks/use-inventory', () => ({
  useInventory: () => ({
    inventoryItems: NO_ITEMS,
    isLoading: false,
    error: mockInventoryState.error,
    getItemOccurrences: vi.fn(),
    cleanup: vi.fn(async () => {}),
    reload: mockReload,
  }),
}));

// The table itself is not under test: show the text it would put in an empty table
vi.mock('./checks/inventories/character-inventory.component', () => ({
  CHARACTER_INVENTORY_STRING_KEYS: [],
  CharacterInventory: ({ localizedStrings }: { localizedStrings: Record<string, string> }) => (
    <div data-testid="empty-text">{localizedStrings['%webView_inventory_no_results%']}</div>
  ),
}));

const SYNC_REFUSAL = 'Cannot build the inventory while the project syncs (SR_EDIT_BLOCKED)';

function renderInventory() {
  // Import after the mocks: the web view assigns itself to global.webViewComponent
  const InventoryWebView = global.webViewComponent;
  return render(
    <InventoryWebView
      {
        // The literal supplies only the props the web view reads
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ...({
          projectId: 'P1',
          useWebViewState: (key: string, defaultValue: unknown) => [
            key === 'webViewType' ? 'platformScripture.characterInventory' : defaultValue,
            vi.fn(),
          ],
          useWebViewScrollGroupScrRef: () => [{ book: 'GEN', chapterNum: 1, verseNum: 1 }, vi.fn()],
        } as unknown as WebViewProps)
      }
    />,
  );
}

function emitSnapshot(snapshot: unknown) {
  act(() => {
    snapshotHandlers.forEach((handler) => handler(snapshot));
  });
}

describe('inventory web view while an automatic sync runs', () => {
  beforeEach(async () => {
    mockReload.mockClear();
    snapshotHandlers.clear();
    mockInventoryState.error = undefined;
    await import('./inventory.web-view');
  });

  it('says the inventory waits for the sync instead of reporting no results', () => {
    mockInventoryState.error = SYNC_REFUSAL;
    renderInventory();

    expect(screen.getByTestId('empty-text')).toHaveTextContent('Waiting for the sync.');
  });

  it('keeps the no-results text for a load that failed for another reason', () => {
    mockInventoryState.error = 'The inventory data provider fell over';
    renderInventory();

    expect(screen.getByTestId('empty-text')).toHaveTextContent('%webView_inventory_no_results%');
  });

  it('reloads when a snapshot no longer blocks the project', () => {
    mockInventoryState.error = SYNC_REFUSAL;
    renderInventory();

    emitSnapshot({ isBlocking: false, projectIds: [] });

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('reloads when the sync that ended was on another project', () => {
    mockInventoryState.error = SYNC_REFUSAL;
    renderInventory();

    emitSnapshot({ isBlocking: true, projectIds: ['OTHER'] });

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('does not reload while a snapshot still blocks the project', () => {
    mockInventoryState.error = SYNC_REFUSAL;
    renderInventory();

    emitSnapshot({ isBlocking: true, projectIds: ['P1'] });

    expect(mockReload).not.toHaveBeenCalled();
  });

  it('ignores a malformed snapshot', () => {
    mockInventoryState.error = SYNC_REFUSAL;
    renderInventory();

    emitSnapshot(undefined);
    emitSnapshot({ isBlocking: 'no' });

    expect(mockReload).not.toHaveBeenCalled();
  });

  it('does not reload when the last load was not refused by the sync', () => {
    renderInventory();

    emitSnapshot({ isBlocking: false, projectIds: [] });

    expect(mockReload).not.toHaveBeenCalled();
  });
});
