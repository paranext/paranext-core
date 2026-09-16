import { describe, expect, it, vi, beforeEach } from 'vitest';

const mockHasOverlayOfType = vi.fn();
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  hasOverlayOfType: mockHasOverlayOfType,
}));

const mockHasAnyDialogRequest = vi.fn();
vi.mock('@renderer/services/dialog.service-shard', () => ({
  hasAnyDialogRequest: mockHasAnyDialogRequest,
}));

describe('modal-overlay-open.util', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHasOverlayOfType.mockReturnValue(false);
    mockHasAnyDialogRequest.mockReturnValue(false);
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

  it('does not count a docked, non-modal dialog request the user keeps working behind', async () => {
    mockHasAnyDialogRequest.mockReturnValue(true);
    const { isModalOverlayOpen } = await import('./modal-overlay-open.util');
    expect(isModalOverlayOpen()).toBe(false);
  });
});
