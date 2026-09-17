import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

const mockHasOverlayOfType = vi.fn();
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  hasOverlayOfType: mockHasOverlayOfType,
}));

// The subject deliberately does NOT import this module: a docked PAPI dialog is a non-modal tab the
// user keeps working behind, so it must not stop content zoom — a dialog that did would take zoom
// away window-wide for as long as it stayed docked. Mocking it here is what makes that regression
// visible: put a `hasAnyDialogRequest() ||` term back into the predicate and this file turns red.
vi.mock('@renderer/services/dialog.service-shard', () => ({
  hasAnyDialogRequest: () => true,
  hasDialogRequest: () => true,
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

  it('counts a full-screen overlay that bypasses the overlay store', async () => {
    const { registerWindowBlockingOverlay, resetWindowBlockingOverlays } = await import(
      '@renderer/services/window-blocking-overlay-store'
    );
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    const unregister = registerWindowBlockingOverlay();
    try {
      expect(isModalOverlayOpen()).toBe(true);
    } finally {
      unregister();
      resetWindowBlockingOverlays();
    }
  });

  it('a docked non-modal dialog request does not count', async () => {
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    expect(isModalOverlayOpen()).toBe(false);
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
