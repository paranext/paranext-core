import { describe, it, expect } from 'vitest';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { getDefaultCallerSequence, getNthCaller, getFormatCallerFunction } from './footnote-util';

describe('Caller Utilities', () => {
  describe('getDefaultCallerSequence', () => {
    it('returns 26 lowercase letters', () => {
      const seq = getDefaultCallerSequence();
      expect(seq).toHaveLength(26);
      expect(seq[0]).toBe('a');
      expect(seq[25]).toBe('z');
    });
  });

  describe('getNthCaller', () => {
    it('returns correct caller from default sequence', () => {
      expect(getNthCaller(0)).toBe('a');
      expect(getNthCaller(25)).toBe('z');
      expect(getNthCaller(26)).toBe('a'); // wraps around
      expect(getNthCaller(27)).toBe('b');
    });

    it('returns correct caller from custom array', () => {
      const custom = ['α', 'β', 'γ'];
      expect(getNthCaller(0, custom)).toBe('α');
      expect(getNthCaller(3, custom)).toBe('α'); // wraps around
      expect(getNthCaller(4, custom)).toBe('β');
    });
  });

  describe('getFormatCallerFunction', () => {
    const footnotes: MarkerObject[] = [
      { marker: 'f', caller: '+', content: [], type: 'note' },
      { marker: 'f', caller: '-', content: [], type: 'note' },
      { marker: 'f', caller: '+', content: [], type: 'note' },
      { marker: 'f', caller: 'x', content: [], type: 'note' },
    ];

    it('generates stable sequence for "+" callers', () => {
      const fn = getFormatCallerFunction(footnotes, undefined);

      expect(fn('+', 0)).toBe('a');
      expect(fn('-', 1)).toBeUndefined();
      expect(fn('+', 2)).toBe('b'); // second "+" gets next letter
      expect(fn('x', 3)).toBe('x');
      // The following calls are "out-of-range" since no such footnote was in the original list used
      // to build the function.
      expect(fn('-', 2)).toBeUndefined();
      expect(fn('+', 4)).toBe('?');
      expect(fn('*', 0)).toBe('*');
    });

    it('works with custom caller array', () => {
      const custom = ['α', 'β', 'γ'];
      const fn = getFormatCallerFunction(footnotes, custom);

      expect(fn('+', 0)).toBe('α');
      expect(fn('+', 2)).toBe('β');
      expect(fn('-', 1)).toBeUndefined();
      expect(fn('x', 3)).toBe('x');
    });

    it('returns undefined for "-" callers and passes through others', () => {
      const fn = getFormatCallerFunction(footnotes, undefined);
      expect(fn('-', 0)).toBeUndefined();
      expect(fn('x', 0)).toBe('x');
    });
  });
});
