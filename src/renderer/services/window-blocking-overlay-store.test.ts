import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  isWindowBlockedByOverlay,
  registerWindowBlockingOverlay,
  resetWindowBlockingOverlays,
  subscribeToWindowBlockingOverlays,
} from './window-blocking-overlay-store';

describe('window-blocking-overlay-store', () => {
  afterEach(() => resetWindowBlockingOverlays());

  it('reports unblocked with nothing registered', () => {
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  it('reports blocked while one overlay is registered', () => {
    registerWindowBlockingOverlay();
    expect(isWindowBlockedByOverlay()).toBe(true);
  });

  it('reports unblocked once every overlay has unregistered', () => {
    const first = registerWindowBlockingOverlay();
    const second = registerWindowBlockingOverlay();
    first();
    expect(isWindowBlockedByOverlay()).toBe(true);
    second();
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  it('ignores a second unregister from the same overlay', () => {
    const first = registerWindowBlockingOverlay();
    registerWindowBlockingOverlay();
    first();
    first();
    expect(isWindowBlockedByOverlay()).toBe(true);
  });

  it('notifies subscribers on each transition', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToWindowBlockingOverlays(listener);
    const unregister = registerWindowBlockingOverlay();
    expect(listener).toHaveBeenCalledTimes(1);
    unregister();
    expect(listener).toHaveBeenCalledTimes(2);
    unregister();
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
  });
});
