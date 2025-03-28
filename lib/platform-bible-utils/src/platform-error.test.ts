import { describe, it, expect } from 'vitest';
import { newPlatformError, isPlatformError, PLATFORM_ERROR_VERSION } from './platform-error';

describe('newPlatformError', () => {
  it('should return an empty PlatformError when no argument is provided', () => {
    const error = newPlatformError();
    expect(error).toEqual({ message: '', platformErrorVersion: PLATFORM_ERROR_VERSION });
  });

  it('should return a PlatformError with the provided message when a string is provided', () => {
    const message = 'An error occurred';
    const error = newPlatformError(message);
    expect(error).toEqual({ message, platformErrorVersion: PLATFORM_ERROR_VERSION });
  });

  it('should return a PlatformError with the provided object when an object with a message is provided', () => {
    const errorObj = { message: 'An error occurred', stack: 'stack trace' };
    const error = newPlatformError(errorObj);
    expect(error).toEqual({ ...errorObj, platformErrorVersion: PLATFORM_ERROR_VERSION });
  });

  it('should return a PlatformError with cause when an object without a message is provided', () => {
    const errorObj = { code: 500 };
    const error = newPlatformError(errorObj);
    expect(error).toEqual({
      cause: errorObj,
      message: '',
      platformErrorVersion: PLATFORM_ERROR_VERSION,
    });
  });

  it('should return a PlatformError with the provided message when an Error object is provided', () => {
    const errorObj = new Error('An error occurred');
    const error = newPlatformError(errorObj);
    expect(error.message).toEqual(errorObj.message);
    expect(error.platformErrorVersion).toEqual(PLATFORM_ERROR_VERSION);
    expect(error.stack).toEqual(errorObj.stack);
    expect(Object.keys(Object.getOwnPropertyDescriptors(error)).length).toEqual(
      Object.keys(Object.getOwnPropertyDescriptors(errorObj)).length + 1,
    );
  });
});

describe('newPlatformError JSON.stringify', () => {
  it('should include platformErrorVersion and message when no argument is provided', () => {
    const error = newPlatformError();
    const json = JSON.stringify(error);
    expect(json).toContain('"platformErrorVersion":1');
    expect(json).toContain('"message":""');
  });

  it('should include platformErrorVersion and message when a string is provided', () => {
    const error = newPlatformError('An error occurred');
    const json = JSON.stringify(error);
    expect(json).toContain('"platformErrorVersion":1');
    expect(json).toContain('"message":"An error occurred"');
  });

  it('should include platformErrorVersion and message when an object with a message is provided', () => {
    const errorObj = { message: 'An error occurred', stack: 'stack trace' };
    const error = newPlatformError(errorObj);
    const json = JSON.stringify(error);
    expect(json).toContain('"platformErrorVersion":1');
    expect(json).toContain('"message":"An error occurred"');
  });

  it('should include platformErrorVersion and message when an object without a message is provided', () => {
    const errorObj = { code: 500 };
    const error = newPlatformError(errorObj);
    const json = JSON.stringify(error);
    expect(json).toContain('"platformErrorVersion":1');
    expect(json).toContain('"message":""');
  });

  it('should include platformErrorVersion and message when an Error object is provided', () => {
    const errorObj = new Error('An error occurred');
    const error = newPlatformError(errorObj);
    const json = JSON.stringify(error);
    expect(json).toContain('"platformErrorVersion":1');
    expect(json).toContain('"message":"An error occurred"');
  });
});

describe('isPlatformError', () => {
  it('should return true for a valid PlatformError', () => {
    const error = { message: 'An error occurred', platformErrorVersion: PLATFORM_ERROR_VERSION };
    expect(isPlatformError(error)).toBe(true);
  });

  it('should return false for an invalid PlatformError', () => {
    const error = { message: 'An error occurred' };
    expect(isPlatformError(error)).toBe(false);
  });

  it('should return false for a non-object value', () => {
    expect(isPlatformError('error')).toBe(false);
    // eslint-disable-next-line no-null/no-null
    expect(isPlatformError(null)).toBe(false);
    expect(isPlatformError(undefined)).toBe(false);
    expect(isPlatformError([])).toBe(false);
    expect(isPlatformError(1)).toBe(false);
  });
});
