import { getReplaceUnavailableReason } from './replace-availability.util';

/** Writable project, structure protection off, replacement that changes no structure. */
const availableConditions = {
  isReadOnly: false,
  isStructureProtected: false,
  isReplacementStructureChanging: false,
};

describe('getReplaceUnavailableReason', () => {
  it('returns undefined when the project is writable and the replacement changes no structure', () => {
    expect(getReplaceUnavailableReason(availableConditions)).toBeUndefined();
    // Protection on, but the replacement carries no marker for it to reject.
    expect(
      getReplaceUnavailableReason({ ...availableConditions, isStructureProtected: true }),
    ).toBeUndefined();
    // Replacement carries a marker, but nothing is protecting the structure from it.
    expect(
      getReplaceUnavailableReason({ ...availableConditions, isReplacementStructureChanging: true }),
    ).toBeUndefined();
  });

  it('reports readOnly for a read-only project', () => {
    expect(getReplaceUnavailableReason({ ...availableConditions, isReadOnly: true })).toBe(
      'readOnly',
    );
  });

  it('reports structureChangingMarker only while protection is active AND the replacement changes structure', () => {
    expect(
      getReplaceUnavailableReason({
        ...availableConditions,
        isStructureProtected: true,
        isReplacementStructureChanging: true,
      }),
    ).toBe('structureChangingMarker');
  });

  it('prefers readOnly over structureChangingMarker when both apply', () => {
    // A read-only project rejects every replacement, so naming the marker problem would send the
    // user off to fix a replacement that still could not be applied afterward.
    expect(
      getReplaceUnavailableReason({
        isReadOnly: true,
        isStructureProtected: true,
        isReplacementStructureChanging: true,
      }),
    ).toBe('readOnly');
  });
});
