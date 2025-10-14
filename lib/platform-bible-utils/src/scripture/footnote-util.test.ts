import { describe, it, expect } from 'vitest';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import {
  getDefaultCallerSequence,
  getNthCaller,
  getFormatCallerFunction,
  extractFootnotesFromUsjContent,
} from './footnote-util';
import { usjMat1 } from './footnote-util-test.usj.data';

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

describe('extractFootnotesFromUsjContent', () => {
  it('should return an empty array if there are no notes', () => {
    const content: MarkerContent = { type: 'text', marker: 'p', content: ['Some text'] };

    const result = extractFootnotesFromUsjContent([content]);
    expect(result).toEqual([]);
  });

  it('should handle nodes with undefined or string content', () => {
    const note: MarkerObject = { type: 'note', marker: 'f', content: undefined };
    const content: MarkerContent = {
      type: 'paragraph',
      marker: 'q',
      content: ['Evil men seek my life', { type: 'text', marker: 'add', content: undefined }, note],
    };

    const result = extractFootnotesFromUsjContent([content]);
    expect(result).toEqual([note]);
  });

  it('should extract a single note at the top level', () => {
    const note: MarkerObject = { type: 'note', marker: 'x', content: [] };
    const content: MarkerContent = note;

    const result = extractFootnotesFromUsjContent([content]);
    expect(result).toEqual([note]);
  });

  it('should extract nested notes', () => {
    const note1: MarkerObject = { type: 'note', marker: 'fe', content: [] };
    const note2: MarkerObject = { type: 'note', marker: 'f', content: [] };
    const content: MarkerContent = {
      type: 'para',
      marker: 'p',
      content: [
        {
          type: 'verse',
          marker: 'v',
          number: '1',
          content: [
            { type: 'text', marker: 't', content: ['Hello '] },
            note1,
            {
              type: 'wj',
              marker: 'wj',
              content: [note2],
            },
          ],
        },
      ],
    };

    const result = extractFootnotesFromUsjContent([content]);
    expect(result).toEqual([note1, note2]);
  });

  it('should ignore non-note markers', () => {
    const paraWithVerse12 = usjMat1.content.find(
      (node) =>
        typeof node === 'object' &&
        node.type === 'para' &&
        node.content?.some(
          (c) =>
            typeof c === 'object' && c.type === 'verse' && c.marker === 'v' && c.number === '12',
        ),
    );

    if (!paraWithVerse12) throw new Error('Paragraph with verse 12 not found');

    const result = extractFootnotesFromUsjContent([paraWithVerse12]);
    expect(result).toEqual([]);
  });
});
