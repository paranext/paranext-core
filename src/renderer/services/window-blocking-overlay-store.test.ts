import { afterEach, describe, expect, it } from 'vitest';
import {
  isWindowBlockedByOverlay,
  registerWindowBlockingOverlay,
  resetWindowBlockingOverlays,
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
});
