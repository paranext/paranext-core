import { describe, expect, it } from 'vitest';
import {
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_ABOVE_POPOVER,
} from '@/components/z-index';

describe('z-index scale', () => {
  // Radix portals a dropdown opened inside a popover to `document.body` instead of nesting it, so
  // the two are stacking SIBLINGS of each other and `PopoverContent`'s own Z_INDEX_ABOVE_DOCK
  // competes directly with the dropdown's. This ordering is the whole reason the constant exists;
  // losing it puts the footnote editor's note-type and caller dropdowns behind the popover they
  // belong to, which is what happened when Z_INDEX_ABOVE_DOCK was raised from 250 to 600 and
  // nothing pinned relative to it followed.
  it('keeps content portalled out of a popover above the popover layer', () => {
    expect(Z_INDEX_ABOVE_POPOVER).toBeGreaterThan(Z_INDEX_ABOVE_DOCK);
  });

  // The first-run wizard gates the entire app at startup; nothing may cover it.
  it('keeps the first-run gate above everything else', () => {
    expect(Z_INDEX_FIRST_RUN).toBeGreaterThan(Z_INDEX_ABOVE_POPOVER);
  });
});
