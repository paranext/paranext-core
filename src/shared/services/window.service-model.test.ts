import { afterEach, describe, expect, it } from 'vitest';
import { windowServiceObjectToProxy } from '@shared/services/window.service-model';

describe('windowServiceObjectToProxy.getWindowId', () => {
  afterEach(() => {
    globalThis.windowId = undefined;
  });

  it('returns the current globalThis.windowId', () => {
    globalThis.windowId = 'abc-123';

    expect(windowServiceObjectToProxy.getWindowId()).toBe('abc-123');
  });

  it('returns undefined when globalThis.windowId is undefined (the extension-host case)', () => {
    globalThis.windowId = undefined;

    expect(windowServiceObjectToProxy.getWindowId()).toBeUndefined();
  });

  it('is synchronous: the return value is a string, not a promise', () => {
    globalThis.windowId = 'abc-123';

    const result = windowServiceObjectToProxy.getWindowId();

    expect(typeof result).toBe('string');
    expect(result).not.toBeInstanceOf(Promise);
  });
});
