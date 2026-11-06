import { MarkerCategoryType, MarkerType } from './usfm-marker.model';
import { isBlockMarker, isCharacterMarker, isParagraphMarker, usfmMarkers } from './usfm-markers';

describe('isBlockMarker', () => {
  it('treats paragraph-type markers as block markers', () => {
    expect(isBlockMarker('p')).toBe(true);
    expect(isBlockMarker('mt')).toBe(true);
    expect(isBlockMarker('q')).toBe(true);
    expect(isBlockMarker('q1')).toBe(true);
    expect(isBlockMarker('b')).toBe(true);
    expect(isBlockMarker('s1')).toBe(true);
    expect(isBlockMarker('pm')).toBe(true);
  });

  it('treats verse and chapter markers as block markers', () => {
    expect(isBlockMarker('v')).toBe(true);
    expect(isBlockMarker('c')).toBe(true);
  });

  it('does not treat inline/character markers as block markers', () => {
    expect(isBlockMarker('f')).toBe(false);
    expect(isBlockMarker('x')).toBe(false);
    expect(isBlockMarker('bd')).toBe(false);
    expect(isBlockMarker('add')).toBe(false);
    expect(isBlockMarker('w')).toBe(false);
    expect(isBlockMarker('nd')).toBe(false);
  });

  it('returns false for empty and unknown markers', () => {
    expect(isBlockMarker('')).toBe(false);
    expect(isBlockMarker('notamarker')).toBe(false);
  });
});

describe('isCharacterMarker', () => {
  it('treats character-style markers as character markers', () => {
    expect(isCharacterMarker('nd')).toBe(true);
    expect(isCharacterMarker('add')).toBe(true);
    expect(isCharacterMarker('wj')).toBe(true);
    expect(isCharacterMarker('bd')).toBe(true);
    expect(isCharacterMarker('it')).toBe(true);
    expect(isCharacterMarker('k')).toBe(true);
  });

  // `v`, `va`, `vp`, and `ca` are chapter/verse numbering markers typed `MarkerType.Character` even
  // though they are structure markers, so a naive type check would offer them as character styles.
  // `va`, `vp`, and `ca` all have `hasEndMarker: true`, so their `DivisionMarks` category is the
  // only thing separating them from genuine character markers.
  it('does not treat chapter and verse numbering markers as character markers', () => {
    expect(isCharacterMarker('v')).toBe(false);
    expect(isCharacterMarker('va')).toBe(false);
    expect(isCharacterMarker('vp')).toBe(false);
    expect(isCharacterMarker('ca')).toBe(false);
  });

  it('does not treat block markers as character markers', () => {
    expect(isCharacterMarker('p')).toBe(false);
    expect(isCharacterMarker('q')).toBe(false);
    expect(isCharacterMarker('c')).toBe(false);
  });

  it('does not treat note markers as character markers', () => {
    expect(isCharacterMarker('f')).toBe(false);
    expect(isCharacterMarker('fe')).toBe(false);
    expect(isCharacterMarker('x')).toBe(false);
  });

  it('returns false for empty and unknown markers', () => {
    expect(isCharacterMarker('')).toBe(false);
    expect(isCharacterMarker('notamarker')).toBe(false);
  });
});

describe('isCharacterMarker and isBlockMarker invariants', () => {
  // Guards the numbering-marker exclusion: drop it and `v` satisfies both predicates, since
  // `isBlockMarker` special-cases `v` as a block marker. Note what this does NOT establish —
  // character markers being exempt from structure protection comes from the character-marker menu
  // never setting `isDisallowed`, not from anything asserted here.
  it('never classifies a marker as both a character marker and a block marker', () => {
    const markersClassifiedAsBoth = Object.keys(usfmMarkers).filter(
      (marker) => isCharacterMarker(marker) && isBlockMarker(marker),
    );

    expect(markersClassifiedAsBoth).toEqual([]);
  });

  // Code that removes or replaces a character marker relies on it having a closing marker, so this
  // holds the data to that shape. It is not a substitute for the numbering-marker exclusion above:
  // `va`, `vp`, and `ca` have end markers too, so only their category rules them out.
  it('only accepts markers that have an end marker', () => {
    const markersWithoutEndMarker = Object.keys(usfmMarkers).filter(
      (marker) => isCharacterMarker(marker) && !usfmMarkers[marker].hasEndMarker,
    );

    expect(markersWithoutEndMarker).toEqual([]);
  });

  // The one direction the tests above cannot see. `isCharacterMarker` excludes numbering markers by
  // their `DivisionMarks` category rather than by name, which rests on `DivisionMarks` being a
  // closed structural category: chapter and verse numbering, never body-text styling. That bet
  // fails silently — a genuine character marker filed under `DivisionMarks` is simply rejected, so
  // it never enters either filter above, both still pass, and the marker just disappears from the
  // menu with no error. Pinning the intersection turns that drift into a failure here, where the
  // exclusion is decided. A new numbering marker means adding it below; a styling marker showing up
  // in this list means the category rule no longer holds and the exclusion needs rethinking.
  it('excludes exactly the chapter and verse numbering markers by category', () => {
    const divisionMarkCharacterMarkers = Object.keys(usfmMarkers).filter(
      (marker) =>
        usfmMarkers[marker].type === MarkerType.Character &&
        usfmMarkers[marker].category === MarkerCategoryType.DivisionMarks,
    );

    expect(divisionMarkCharacterMarkers.sort()).toEqual(['ca', 'v', 'va', 'vp']);
  });
});

describe('isParagraphMarker', () => {
  it('treats paragraph-type markers as paragraph markers regardless of category', () => {
    expect(isParagraphMarker('p')).toBe(true); // discourse paragraphs
    expect(isParagraphMarker('ipi')).toBe(true);
    expect(isParagraphMarker('li2')).toBe(true); // list entry
    expect(isParagraphMarker('mt')).toBe(true); // book titles
    expect(isParagraphMarker('mt1')).toBe(true);
    expect(isParagraphMarker('s')).toBe(true); // section headings
    expect(isParagraphMarker('s1')).toBe(true);
    expect(isParagraphMarker('q')).toBe(true); // poetry lines
    expect(isParagraphMarker('q3')).toBe(true);
    expect(isParagraphMarker('lh')).toBe(true); // list heading
    expect(isParagraphMarker('b')).toBe(true); // line break
    expect(isParagraphMarker('h')).toBe(true); // page header metadata
    expect(isParagraphMarker('h1')).toBe(true); // Deprecated
    expect(isParagraphMarker('cl')).toBe(true); // Publishing metadata
    expect(isParagraphMarker('cp')).toBe(true); // Published chapter identifier
    expect(isParagraphMarker('id')).toBe(true); // book identifier
    expect(isParagraphMarker('c')).toBe(true); // chapter number
    expect(isParagraphMarker('usfm')).toBe(true); // File metadata
    expect(isParagraphMarker('ide')).toBe(true); // File metadata
  });

  it('does not treat character-style markers as paragraph markers', () => {
    expect(isParagraphMarker('v')).toBe(false); // Character, special-cased by isBlockMarker only
    expect(isParagraphMarker('vp')).toBe(false);
    expect(isParagraphMarker('nd')).toBe(false);
    expect(isParagraphMarker('qs')).toBe(false);
    expect(isParagraphMarker('qac')).toBe(false);
    expect(isParagraphMarker('f')).toBe(false);
    expect(isParagraphMarker('ca')).toBe(false);
  });

  it('returns false for empty and unknown markers', () => {
    expect(isParagraphMarker('')).toBe(false);
    expect(isParagraphMarker('notamarker')).toBe(false);
  });
});
