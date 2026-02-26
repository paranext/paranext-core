import { describe, it, expect } from 'vitest';
import { validatePairsString } from './matched-pairs-inventory.utils';

describe('validatePairsString', () => {
  it('should accept an empty string', () => {
    expect(validatePairsString('')).toEqual({ valid: true });
  });

  it('should accept whitespace-only string', () => {
    expect(validatePairsString('   ')).toEqual({ valid: true });
  });

  it('should accept a single valid pair', () => {
    expect(validatePairsString('(/)')).toEqual({ valid: true });
  });

  it('should accept a pair with closing character', () => {
    expect(validatePairsString('(/)')).toEqual({ valid: true });
  });

  it('should accept multiple valid pairs separated by spaces', () => {
    expect(validatePairsString('(/) [/] {/}')).toEqual({ valid: true });
  });

  it('should accept Unicode punctuation pairs', () => {
    expect(validatePairsString('\u201C/\u201D')).toEqual({ valid: true });
  });

  it('should accept emoji-like single characters', () => {
    expect(validatePairsString('\u00AB/\u00BB')).toEqual({ valid: true });
  });

  it('should reject a pair without separator', () => {
    const result = validatePairsString('ab');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid Pair');
  });

  it('should reject a pair with empty left side', () => {
    const result = validatePairsString('/b');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid Pair');
  });

  it('should reject a pair with empty right side', () => {
    const result = validatePairsString('a/');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid Pair');
  });

  it('should reject multi-character punctuation on left (VAL-002)', () => {
    const result = validatePairsString('ab/)');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Multiple character');
  });

  it('should reject multi-character punctuation on right (VAL-002)', () => {
    const result = validatePairsString('(/ab');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Multiple character');
  });

  it('should reject when any pair in a list is invalid', () => {
    const result = validatePairsString('(/) invalid [/]');
    expect(result.valid).toBe(false);
  });

  it('should accept tab-separated pairs', () => {
    expect(validatePairsString('(/)\t[/]')).toEqual({ valid: true });
  });
});
