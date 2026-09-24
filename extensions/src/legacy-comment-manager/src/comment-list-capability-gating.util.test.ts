import { describe, expect, it, vi } from 'vitest';
import {
  CommentWriteCapabilities,
  gateCommentWriteCapabilities,
} from './comment-list-capability-gating.util';

/** Builds a fresh set of "always allow" capabilities, with spies so calls can be asserted. */
function allowingCapabilities(): CommentWriteCapabilities {
  return {
    canUserAddCommentToThread: true,
    canUserAssignThreadCallback: vi.fn(async () => true),
    canUserResolveThreadCallback: vi.fn(async () => true),
    canUserEditOrDeleteCommentCallback: vi.fn(async () => true),
  };
}

describe('gateCommentWriteCapabilities', () => {
  describe('not blocked', () => {
    it('returns the exact same object (no wrapping) when isSyncBlocked is false', () => {
      const capabilities = allowingCapabilities();
      expect(gateCommentWriteCapabilities(false, capabilities)).toBe(capabilities);
    });

    it('passes the boolean capability through unchanged', async () => {
      const capabilities = allowingCapabilities();
      const gated = gateCommentWriteCapabilities(false, capabilities);
      expect(gated.canUserAddCommentToThread).toBe(true);
    });

    it('the async capabilities delegate to (are) the original callbacks', async () => {
      const capabilities = allowingCapabilities();
      const gated = gateCommentWriteCapabilities(false, capabilities);

      // Literally the same function references — a real delegation, not a lookalike wrapper.
      expect(gated.canUserAssignThreadCallback).toBe(capabilities.canUserAssignThreadCallback);
      expect(gated.canUserResolveThreadCallback).toBe(capabilities.canUserResolveThreadCallback);
      expect(gated.canUserEditOrDeleteCommentCallback).toBe(
        capabilities.canUserEditOrDeleteCommentCallback,
      );

      await expect(gated.canUserAssignThreadCallback('thread-1')).resolves.toBe(true);
      await expect(gated.canUserResolveThreadCallback('thread-1')).resolves.toBe(true);
      await expect(gated.canUserEditOrDeleteCommentCallback('comment-1')).resolves.toBe(true);
      expect(capabilities.canUserAssignThreadCallback).toHaveBeenCalledWith('thread-1');
      expect(capabilities.canUserResolveThreadCallback).toHaveBeenCalledWith('thread-1');
      expect(capabilities.canUserEditOrDeleteCommentCallback).toHaveBeenCalledWith('comment-1');
    });
  });

  describe('blocked', () => {
    it('denies the boolean capability regardless of the original value', () => {
      const capabilities = allowingCapabilities();
      const gated = gateCommentWriteCapabilities(true, capabilities);
      expect(gated.canUserAddCommentToThread).toBe(false);
    });

    it('every async capability resolves false without invoking the original', async () => {
      const capabilities = allowingCapabilities();
      const gated = gateCommentWriteCapabilities(true, capabilities);

      await expect(gated.canUserAssignThreadCallback('thread-1')).resolves.toBe(false);
      await expect(gated.canUserResolveThreadCallback('thread-1')).resolves.toBe(false);
      await expect(gated.canUserEditOrDeleteCommentCallback('comment-1')).resolves.toBe(false);

      // No PDP round-trip should occur while blocked — the answer is definitionally "no".
      expect(capabilities.canUserAssignThreadCallback).not.toHaveBeenCalled();
      expect(capabilities.canUserResolveThreadCallback).not.toHaveBeenCalled();
      expect(capabilities.canUserEditOrDeleteCommentCallback).not.toHaveBeenCalled();
    });

    it('denies even when the original would reject', async () => {
      const capabilities: CommentWriteCapabilities = {
        canUserAddCommentToThread: true,
        canUserAssignThreadCallback: vi.fn(async () => {
          throw new Error('PDP unavailable');
        }),
        canUserResolveThreadCallback: vi.fn(async () => true),
        canUserEditOrDeleteCommentCallback: vi.fn(async () => true),
      };
      const gated = gateCommentWriteCapabilities(true, capabilities);
      await expect(gated.canUserAssignThreadCallback('thread-1')).resolves.toBe(false);
    });
  });
});
