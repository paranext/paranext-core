import { afterEach, describe, expect, test, vi } from 'vitest';
import { persistDirection, readDirection } from './dir-helper.util';

// A detached iframe's `window.localStorage` reports `null`, and some sandboxed iframes throw when
// the property is accessed at all - both must leave `readDirection`/`persistDirection` unable to
// throw, since they run during render inside every web view. See dir-helper.util.ts.
const originalLocalStorage = globalThis.localStorage;

afterEach(() => {
  vi.unstubAllGlobals();
  // The throwing-getter test below defines a property directly on `globalThis`, which
  // `vi.unstubAllGlobals` does not reach - restore the descriptor by hand so later tests (in this
  // file and any that share the worker) see the real `localStorage` again.
  Object.defineProperty(globalThis, 'localStorage', {
    value: originalLocalStorage,
    configurable: true,
    writable: true,
  });
  originalLocalStorage.clear();
});

describe('readDirection', () => {
  test('returns "ltr" when localStorage is null (detached iframe)', () => {
    // A detached iframe's `window.localStorage` is `null`, not `undefined` - null IS the value
    // this test must reproduce.
    // eslint-disable-next-line no-null/no-null
    vi.stubGlobal('localStorage', null);
    expect(readDirection()).toBe('ltr');
  });

  test('returns "ltr" when accessing localStorage throws (sandboxed iframe)', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      get() {
        throw new DOMException('Access is denied for this document', 'SecurityError');
      },
      configurable: true,
    });
    expect(readDirection()).toBe('ltr');
  });

  test('returns "rtl" when storage holds "rtl"', () => {
    persistDirection('rtl');
    expect(readDirection()).toBe('rtl');
  });
});

describe('persistDirection', () => {
  test('does not throw when localStorage is null (detached iframe)', () => {
    // A detached iframe's `window.localStorage` is `null`, not `undefined` - null IS the value
    // this test must reproduce.
    // eslint-disable-next-line no-null/no-null
    vi.stubGlobal('localStorage', null);
    expect(() => persistDirection('rtl')).not.toThrow();
  });

  test('does not throw when accessing localStorage throws (sandboxed iframe)', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      get() {
        throw new DOMException('Access is denied for this document', 'SecurityError');
      },
      configurable: true,
    });
    expect(() => persistDirection('rtl')).not.toThrow();
  });
});
