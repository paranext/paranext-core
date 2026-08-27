import { describe, expect, it } from 'vitest';
import {
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_FOOTNOTE_EDITOR,
} from '@/components/z-index';

describe('z-index scale', () => {
  // The footnote editor's note-type and caller dropdowns are Radix dropdowns, which portal to
  // `document.body` instead of nesting inside the popover that hosts them. That makes them
  // stacking SIBLINGS of `PopoverContent` (which stamps Z_INDEX_ABOVE_DOCK on itself), so an open
  // dropdown renders behind its own popover whenever this ordering is lost — the symptom that
  // returns every time the popover's layer is raised without this one following.
  it('keeps the footnote editor above the popover layer it renders inside', () => {
    expect(Z_INDEX_FOOTNOTE_EDITOR).toBeGreaterThan(Z_INDEX_ABOVE_DOCK);
  });

  // The first-run wizard gates the entire app at startup; nothing may cover it.
  it('keeps the first-run gate above the footnote editor', () => {
    expect(Z_INDEX_FIRST_RUN).toBeGreaterThan(Z_INDEX_FOOTNOTE_EDITOR);
  });
});
