import { describe, expect, it } from 'vitest';
import {
  isValidExtensionIdentifier,
  isCamelCase,
  getExtensionName,
  suggestFix,
} from './naming-patterns';

describe('isCamelCase', () => {
  it('accepts valid camelCase strings', () => {
    expect(isCamelCase('hello')).toBe(true);
    expect(isCamelCase('helloWorld')).toBe(true);
    expect(isCamelCase('platformScripture')).toBe(true);
    expect(isCamelCase('openFind')).toBe(true);
    expect(isCamelCase('helloRock3')).toBe(true);
  });

  it('rejects PascalCase', () => {
    expect(isCamelCase('Hello')).toBe(false);
    expect(isCamelCase('HelloWorld')).toBe(false);
  });

  it('rejects kebab-case', () => {
    expect(isCamelCase('hello-world')).toBe(false);
  });

  it('rejects snake_case', () => {
    expect(isCamelCase('hello_world')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isCamelCase('')).toBe(false);
  });
});

describe('isValidExtensionIdentifier', () => {
  it('accepts valid extension identifiers', () => {
    expect(isValidExtensionIdentifier('platformScripture.openFind')).toBe(true);
    expect(isValidExtensionIdentifier('helloRock3.helloRock3')).toBe(true);
    expect(isValidExtensionIdentifier('myExtension.doThing')).toBe(true);
  });

  it('rejects PascalCase parts', () => {
    expect(isValidExtensionIdentifier('PlatformScripture.OpenFind')).toBe(false);
    expect(isValidExtensionIdentifier('myExtension.DoThing')).toBe(false);
  });

  it('rejects kebab-case parts', () => {
    expect(isValidExtensionIdentifier('platform-scripture.open-find')).toBe(false);
  });

  it('rejects identifiers without a dot', () => {
    expect(isValidExtensionIdentifier('noDotHere')).toBe(false);
  });

  it('rejects identifiers with multiple dots', () => {
    expect(isValidExtensionIdentifier('too.many.dots')).toBe(false);
  });
});

describe('getExtensionName', () => {
  it('extracts extension name from valid identifiers', () => {
    expect(getExtensionName('platformScripture.openFind')).toBe('platformScripture');
  });

  it('returns null for identifiers without a dot', () => {
    expect(getExtensionName('noDot')).toBeNull();
  });

  it('returns null for identifiers with multiple dots', () => {
    expect(getExtensionName('too.many.dots')).toBeNull();
  });
});

describe('suggestFix', () => {
  it('converts PascalCase to camelCase', () => {
    expect(suggestFix('PlatformScripture.OpenFind')).toBe('platformScripture.openFind');
  });

  it('strips non-alphanumeric characters', () => {
    expect(suggestFix('platform-scripture.open-find')).toBe('platformscripture.openfind');
  });

  it('returns input unchanged if no dot separator', () => {
    expect(suggestFix('noDotHere')).toBe('noDotHere');
  });
});
