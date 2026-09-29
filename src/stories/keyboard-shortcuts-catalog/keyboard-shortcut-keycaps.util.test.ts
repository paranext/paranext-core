import { parseShortcutKeycaps } from './keyboard-shortcut-keycaps.util';

/** The keycaps of a single-group result, for the cases where only the split matters. */
function keycapsOf(keys: string): string[] {
  const parsed = parseShortcutKeycaps(keys);
  if (parsed.kind !== 'combo') throw new Error(`Expected a combo for ${keys}`);
  expect(parsed.groups).toHaveLength(1);
  return parsed.groups[0].keycaps;
}

describe('parseShortcutKeycaps', () => {
  describe('macOS combos', () => {
    it('keeps a function key whole after a modifier', () => {
      expect(keycapsOf('⌘F8')).toEqual(['⌘', 'F8']);
      expect(keycapsOf('⌘F9')).toEqual(['⌘', 'F9']);
    });

    it('keeps a spelled-out key whole after a modifier', () => {
      expect(keycapsOf('⌃Space')).toEqual(['⌃', 'Space']);
    });

    it('splits a stack of modifiers into one keycap each', () => {
      expect(keycapsOf('⌥⇧⌘L')).toEqual(['⌥', '⇧', '⌘', 'L']);
      expect(keycapsOf('⌘⌥↑')).toEqual(['⌘', '⌥', '↑']);
      expect(keycapsOf('⌃⇧T')).toEqual(['⌃', '⇧', 'T']);
    });

    it('treats a literal character after a modifier as one keycap', () => {
      expect(keycapsOf('⌘]')).toEqual(['⌘', ']']);
      expect(keycapsOf('⌘[')).toEqual(['⌘', '[']);
      expect(keycapsOf('⌘+')).toEqual(['⌘', '+']);
      expect(keycapsOf('⌘-')).toEqual(['⌘', '-']);
      expect(keycapsOf('⌘0')).toEqual(['⌘', '0']);
    });

    it('handles a symbol key with no other key', () => {
      expect(keycapsOf('⌥')).toEqual(['⌥']);
      expect(keycapsOf('⌫')).toEqual(['⌫']);
      expect(keycapsOf('⎋')).toEqual(['⎋']);
      expect(keycapsOf('⇧⇥')).toEqual(['⇧', '⇥']);
    });

    it('reports macOS combos as adjacent, with no separator', () => {
      const parsed = parseShortcutKeycaps('⌥⌘M');
      if (parsed.kind !== 'combo') throw new Error('Expected a combo');
      expect(parsed.groups[0].separator).toBe('');
    });
  });

  describe('Windows and Linux combos', () => {
    it('splits on the joining plus', () => {
      expect(keycapsOf('Ctrl+Shift+N')).toEqual(['Ctrl', 'Shift', 'N']);
      expect(keycapsOf('Ctrl+PageDown')).toEqual(['Ctrl', 'PageDown']);
      expect(keycapsOf('Alt+←')).toEqual(['Alt', '←']);
    });

    it('treats a trailing plus as the key rather than a separator', () => {
      expect(keycapsOf('Ctrl++')).toEqual(['Ctrl', '+']);
    });

    it('treats a trailing minus as the key', () => {
      expect(keycapsOf('Ctrl+-')).toEqual(['Ctrl', '-']);
    });

    it('reports Windows and Linux combos as plus-joined', () => {
      const parsed = parseShortcutKeycaps('Ctrl+Z');
      if (parsed.kind !== 'combo') throw new Error('Expected a combo');
      expect(parsed.groups[0].separator).toBe('+');
    });
  });

  describe('single keys', () => {
    it('keeps a function key as one keycap with no modifier', () => {
      expect(keycapsOf('F12')).toEqual(['F12']);
      expect(keycapsOf('F7')).toEqual(['F7']);
      expect(keycapsOf('F8')).toEqual(['F8']);
      expect(keycapsOf('F9')).toEqual(['F9']);
    });

    it('keeps a lone literal character as one keycap', () => {
      expect(keycapsOf('\\')).toEqual(['\\']);
      expect(keycapsOf('*')).toEqual(['*']);
    });

    it('keeps a lone spelled-out key as one keycap', () => {
      expect(keycapsOf('Alt')).toEqual(['Alt']);
      expect(keycapsOf('Backspace')).toEqual(['Backspace']);
    });
  });

  describe('alternatives', () => {
    it('gives each alternative its own group', () => {
      expect(parseShortcutKeycaps('Ctrl+Y / Ctrl+Shift+Z')).toEqual({
        kind: 'combo',
        groups: [
          { keycaps: ['Ctrl', 'Y'], separator: '+' },
          { keycaps: ['Ctrl', 'Shift', 'Z'], separator: '+' },
        ],
      });
    });

    it('handles four single-key alternatives', () => {
      const parsed = parseShortcutKeycaps('↑ / ↓ / ← / →');
      if (parsed.kind !== 'combo') throw new Error('Expected a combo');
      expect(parsed.groups.map((group) => group.keycaps)).toEqual([['↑'], ['↓'], ['←'], ['→']]);
    });

    it('handles macOS alternatives', () => {
      expect(parseShortcutKeycaps('⌃⇥ / ⌘⇧]')).toEqual({
        kind: 'combo',
        groups: [
          { keycaps: ['⌃', '⇥'], separator: '' },
          { keycaps: ['⌘', '⇧', ']'], separator: '' },
        ],
      });
      expect(parseShortcutKeycaps('⏎ / ␣')).toEqual({
        kind: 'combo',
        groups: [
          { keycaps: ['⏎'], separator: '' },
          { keycaps: ['␣'], separator: '' },
        ],
      });
    });

    it('handles a combo alternative next to a single-key alternative', () => {
      const parsed = parseShortcutKeycaps('Shift+F10 / Menu');
      if (parsed.kind !== 'combo') throw new Error('Expected a combo');
      expect(parsed.groups.map((group) => group.keycaps)).toEqual([['Shift', 'F10'], ['Menu']]);
    });

    it('handles three single-key alternatives', () => {
      const parsed = parseShortcutKeycaps('Up / Down / Backspace');
      if (parsed.kind !== 'combo') throw new Error('Expected a combo');
      expect(parsed.groups.map((group) => group.keycaps)).toEqual([
        ['Up'],
        ['Down'],
        ['Backspace'],
      ]);
    });
  });

  describe('no equivalent', () => {
    it('signals that the marker is not a shortcut', () => {
      expect(parseShortcutKeycaps('— (no equivalent)')).toEqual({
        kind: 'no-equivalent',
        text: '— (no equivalent)',
      });
    });
  });
});
