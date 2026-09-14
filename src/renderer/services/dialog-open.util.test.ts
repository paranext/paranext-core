import { describe, expect, it, vi, beforeEach } from 'vitest';

const mockHasAnyDialogRequest = vi.fn();
vi.mock('@renderer/services/dialog.service-shard', () => ({
  hasAnyDialogRequest: mockHasAnyDialogRequest,
}));

const mockHasOverlayOfType = vi.fn();
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  hasOverlayOfType: mockHasOverlayOfType,
}));

describe('dialog-open.util', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHasAnyDialogRequest.mockReturnValue(false);
    mockHasOverlayOfType.mockReturnValue(false);
  });

  it('returns false when neither source reports a dialog', async () => {
    const { isAnyDialogOpen } = await import('./dialog-open.util');
    expect(isAnyDialogOpen()).toBe(false);
  });

  it('returns true when the dialog shard reports a live request', async () => {
    mockHasAnyDialogRequest.mockReturnValue(true);
    const { isAnyDialogOpen } = await import('./dialog-open.util');
    expect(isAnyDialogOpen()).toBe(true);
  });

  it('returns true when a modal overlay exists', async () => {
    mockHasOverlayOfType.mockReturnValue(true);
    const { isAnyDialogOpen } = await import('./dialog-open.util');
    expect(isAnyDialogOpen()).toBe(true);
    expect(mockHasOverlayOfType).toHaveBeenCalledWith('modalDialog');
  });
});
