import { getReplaceUnavailableReason } from './replace-availability.util';

describe('getReplaceUnavailableReason', () => {
  it('returns undefined when the project is writable and the replacement changes no structure', () => {
    expect(getReplaceUnavailableReason(false, false, false)).toBeUndefined();
    expect(getReplaceUnavailableReason(false, true, false)).toBeUndefined();
    expect(getReplaceUnavailableReason(false, false, true)).toBeUndefined();
  });

  it('reports readOnly for a read-only project', () => {
    expect(getReplaceUnavailableReason(true, false, false)).toBe('readOnly');
  });

  it('reports structureChangingMarker only while protection is active AND the replacement changes structure', () => {
    expect(getReplaceUnavailableReason(false, true, true)).toBe('structureChangingMarker');
  });

  it('prefers readOnly over structureChangingMarker when both apply', () => {
    // A read-only project rejects every replacement, so naming the marker problem would send the
    // user off to fix a replacement that still could not be applied afterward.
    expect(getReplaceUnavailableReason(true, true, true)).toBe('readOnly');
  });
});
