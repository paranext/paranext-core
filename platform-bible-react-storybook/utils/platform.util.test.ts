import { afterEach, describe, expect, test } from 'vitest';
import { isMacOs, isWindows } from './platform.util';

const originalUserAgent = navigator.userAgent;

function setUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, configurable: true });
}

afterEach(() => {
  setUserAgent(originalUserAgent);
});

describe('isMacOs', () => {
  test('returns true for a macOS Chrome user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isMacOs()).toBe(true);
  });

  test('returns true for an Electron macOS user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) paranext-core/1.0.0 Chrome/120.0.0.0 Electron/30.0.0 Safari/537.36',
    );
    expect(isMacOs()).toBe(true);
  });

  test('matches case-insensitively', () => {
    setUserAgent('mozilla/5.0 (macintosh; intel mac os x 10_15_7)');
    expect(isMacOs()).toBe(true);
  });

  test('returns false for a Windows user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isMacOs()).toBe(false);
  });

  test('returns false for a Linux user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isMacOs()).toBe(false);
  });

  test('returns false for an Android user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    );
    expect(isMacOs()).toBe(false);
  });

  test('returns false for an empty user agent', () => {
    setUserAgent('');
    expect(isMacOs()).toBe(false);
  });
});

describe('isWindows', () => {
  test('returns true for a Windows user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isWindows()).toBe(true);
  });

  test('returns true for an Electron Windows user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) paranext-core/1.0.0 Chrome/120.0.0.0 Electron/30.0.0 Safari/537.36',
    );
    expect(isWindows()).toBe(true);
  });

  test('matches case-insensitively', () => {
    setUserAgent('mozilla/5.0 (windows nt 10.0; win64; x64)');
    expect(isWindows()).toBe(true);
  });

  test('returns false for a macOS user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isWindows()).toBe(false);
  });

  test('returns false for a Linux user agent', () => {
    setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    expect(isWindows()).toBe(false);
  });

  test('returns false for an empty user agent', () => {
    setUserAgent('');
    expect(isWindows()).toBe(false);
  });
});
