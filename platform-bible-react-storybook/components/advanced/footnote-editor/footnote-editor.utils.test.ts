import { describe, expect, it } from 'vitest';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MutableRefObject } from 'react';
import { generateInlineMarkerMenuListItems } from './footnote-editor.utils';

// The editor is only reached through `insertMarker`, inside an `action` these tests never invoke —
// stubbing the rest of `EditorRef` would add nothing to what is being asserted.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const editorRef: MutableRefObject<EditorRef | null> = { current: {} as EditorRef };

/** The markers the menu would offer for a caret in `parentMarker` inside a `noteMarker` note. */
function markersOffered(parentMarker?: string, noteMarker?: string): (string | undefined)[] {
  return generateInlineMarkerMenuListItems(editorRef, () => {}, {}, parentMarker, noteMarker).map(
    (item) => item.marker,
  );
}

describe('generateInlineMarkerMenuListItems', () => {
  it('offers nothing outside a marker, or in a plain paragraph', () => {
    expect(markersOffered(undefined, 'f')).toEqual([]);
    expect(markersOffered('p', 'f')).toEqual([]);
  });

  it('offers the note’s markers when the caret’s own marker defines none', () => {
    // `\ft` (and every other note character run) has no children of its own, so without the
    // fallback the menu would be empty exactly where the caret is put when a note opens.
    expect(markersOffered('ft', 'f')).toContain('fq');
  });

  it('takes the markers from the note being edited, not a fixed note type', () => {
    // `\xo` belongs to `\x` alone — `\f` offers only `\xt` from the cross-reference group — so this
    // can only pass if the enclosing note's own marker is what is consulted.
    expect(markersOffered('xt', 'x')).toContain('xo');
    expect(markersOffered('xt', 'f')).not.toContain('xo');
  });

  it('prefers the caret’s own marker when it defines children', () => {
    expect(markersOffered('f', 'x')).toContain('fr');
  });

  it('offers nothing when neither the caret’s marker nor the note defines children', () => {
    expect(markersOffered('ft', undefined)).toEqual([]);
  });
});
