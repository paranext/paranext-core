import { isValidContextKey, isValidContextKeyValue } from './context-keys.model';

describe('isValidContextKey', () => {
  it('accepts keys with two or more word/hyphen segments', () => {
    expect(isValidContextKey('myExtension.someProperty')).toBe(true);
    expect(isValidContextKey('platformScripture.project.abc-123.isEditable')).toBe(true);
    expect(isValidContextKey('a.b')).toBe(true);
    expect(isValidContextKey('my-ext.some_property')).toBe(true);
    expect(isValidContextKey('platform.3d.enabled')).toBe(true);
  });

  it('rejects keys with fewer than two segments', () => {
    expect(isValidContextKey('singleSegment')).toBe(false);
    expect(isValidContextKey('')).toBe(false);
  });

  it('rejects keys with empty or invalid segments', () => {
    expect(isValidContextKey('a..b')).toBe(false);
    expect(isValidContextKey('.a.b')).toBe(false);
    expect(isValidContextKey('a.b.')).toBe(false);
    expect(isValidContextKey('a.b c.d')).toBe(false);
    expect(isValidContextKey('a.{b}.c')).toBe(false);
    expect(isValidContextKey("a.b'c")).toBe(false);
  });
});

describe('isValidContextKeyValue', () => {
  it('accepts strings, numbers, and booleans', () => {
    expect(isValidContextKeyValue('text')).toBe(true);
    expect(isValidContextKeyValue('')).toBe(true);
    expect(isValidContextKeyValue(0)).toBe(true);
    expect(isValidContextKeyValue(3.5)).toBe(true);
    expect(isValidContextKeyValue(false)).toBe(true);
  });

  it('rejects objects, arrays, null, and undefined', () => {
    expect(isValidContextKeyValue({})).toBe(false);
    expect(isValidContextKeyValue([])).toBe(false);
    // Intentionally testing null input to verify the value check correctly rejects it
    // eslint-disable-next-line no-null/no-null
    expect(isValidContextKeyValue(null)).toBe(false);
    expect(isValidContextKeyValue(undefined)).toBe(false);
  });
});
