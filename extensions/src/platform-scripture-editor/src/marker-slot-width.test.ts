import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

/**
 * The paragraph-style trigger reserves a fixed, monospace slot for the USFM marker. Its width is
 * written twice and has to stay in step:
 *
 * - `MARKER_SLOT_CHARACTERS`, which decides when a marker is too long and the tooltip has to carry
 *   the real one, and
 * - A `tw:w-[Nch]` literal on the slot itself, which decides how much actually fits.
 *
 * Tailwind extracts class names statically, so the literal cannot be interpolated from the constant
 * — an interpolated `tw:w-[${n}ch]` silently emits no rule at all. Reading the source is therefore
 * the only way to hold the two together. Let them drift and the mismatch is invisible: the slot
 * simply clips a marker the code believes fits, with no ellipsis to show for it.
 */
const WEB_VIEW_PATH = join(__dirname, 'platform-scripture-editor.web-view.tsx');

describe('paragraph-style marker slot', () => {
  it('sizes the slot to the same character count the overflow check uses', () => {
    const source = readFileSync(WEB_VIEW_PATH, 'utf8');

    const declaredCharacters = source.match(/const MARKER_SLOT_CHARACTERS = (\d+);/)?.[1];
    const slotWidths = [...source.matchAll(/tw:w-\[(\d+)ch\]/g)].map((match) => match[1]);

    expect(declaredCharacters).toBeDefined();
    // If the slot literal is ever renamed or removed, this catches it rather than passing vacuously
    // on an empty list.
    expect(slotWidths.length).toBeGreaterThan(0);
    slotWidths.forEach((width) => {
      expect(width).toBe(declaredCharacters);
    });
  });
});
