import { parseShortcutKeycaps } from './keyboard-shortcut-keycaps.util';

// How one key combination splits into keycaps is `getShortcutKeycaps`' job, and its edge cases are
// tested beside it in platform-bible-react (`shortcut-keys.component.test.tsx`). This file covers
// only what the catalog adds on top: alternatives and the no-equivalent marker.
describe('parseShortcutKeycaps', () => {
  it('keeps a single combination as one alternative', () => {
    expect(parseShortcutKeycaps('⌥⇧⌘L')).toEqual({ kind: 'combo', alternatives: ['⌥⇧⌘L'] });
    expect(parseShortcutKeycaps('Ctrl++')).toEqual({ kind: 'combo', alternatives: ['Ctrl++'] });
    expect(parseShortcutKeycaps('F12')).toEqual({ kind: 'combo', alternatives: ['F12'] });
  });

  it('gives each alternative its own entry, in the order listed', () => {
    expect(parseShortcutKeycaps('Ctrl+Y / Ctrl+Shift+Z')).toEqual({
      kind: 'combo',
      alternatives: ['Ctrl+Y', 'Ctrl+Shift+Z'],
    });
    expect(parseShortcutKeycaps('↑ / ↓ / ← / →')).toEqual({
      kind: 'combo',
      alternatives: ['↑', '↓', '←', '→'],
    });
    expect(parseShortcutKeycaps('⌃⇥ / ⌘⇧]')).toEqual({
      kind: 'combo',
      alternatives: ['⌃⇥', '⌘⇧]'],
    });
    expect(parseShortcutKeycaps('Shift+F10 / Menu')).toEqual({
      kind: 'combo',
      alternatives: ['Shift+F10', 'Menu'],
    });
  });

  it('signals that the no-equivalent marker is not a shortcut', () => {
    expect(parseShortcutKeycaps('— (no equivalent)')).toEqual({
      kind: 'no-equivalent',
      text: '— (no equivalent)',
    });
  });
});
