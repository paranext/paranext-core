import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

const mockHasOverlayOfType = vi.fn();
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  hasOverlayOfType: mockHasOverlayOfType,
}));

describe('modal-overlay-open.util', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHasOverlayOfType.mockReturnValue(false);
  });

  it('returns false when no overlay is open', async () => {
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    expect(isModalOverlayOpen()).toBe(false);
  });

  it('returns true when a modal dialog overlay exists', async () => {
    mockHasOverlayOfType.mockImplementation((type: string) => type === 'modalDialog');
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    expect(isModalOverlayOpen()).toBe(true);
  });

  it('counts the command palette, which takes the window’s keys the same way', async () => {
    mockHasOverlayOfType.mockImplementation((type: string) => type === 'commandPalette');
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    expect(isModalOverlayOpen()).toBe(true);
  });

  // Runs against the real overlay store instead of the mock above. A docked PAPI dialog request
  // registers nothing in the overlay store at all (it lives in dialog.service-shard's own
  // `dialogRequests` map), so the only way to prove "a non-modal entry doesn't count" is to seed the
  // real store with a genuinely different overlay TYPE and confirm the type filter, not just "is the
  // store non-empty", is what `isModalOverlayOpen` is built on. Mocking `hasOverlayOfType` per type
  // (as the tests above do) can't catch a regression that drops the type check — e.g. "any overlay
  // present" — since the mock IS the type check.
  describe('against the real overlay store', () => {
    beforeEach(() => {
      vi.doUnmock('@renderer/services/overlays/overlay-store');
      vi.resetModules();
    });

    afterEach(async () => {
      const { clearAllOverlays } = await import('@renderer/services/overlays/overlay-store');
      clearAllOverlays();
      vi.doMock('@renderer/services/overlays/overlay-store', () => ({
        hasOverlayOfType: mockHasOverlayOfType,
      }));
      vi.resetModules();
    });

    it('does not count a non-modal overlay entry', async () => {
      const { addOverlay } = await import('@renderer/services/overlays/overlay-store');
      const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
      // Stands in for any non-modal, non-command-palette overlay type — a context menu, a popover,
      // or (if this ever changes) a docked dialog. What matters is that its type is neither
      // 'modalDialog' nor 'commandPalette'.
      addOverlay({
        type: 'contextMenu',
        id: 'non-modal-overlay',
        webViewId: 'webview-1',
        items: [{ type: 'item', id: 'item1', label: 'Test Item' }],
        position: { x: 0, y: 0 },
        resolve: vi.fn(),
        reject: vi.fn(),
      });
      expect(isModalOverlayOpen()).toBe(false);
    });
  });
});
