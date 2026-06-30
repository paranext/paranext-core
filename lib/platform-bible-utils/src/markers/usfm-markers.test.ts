import { isBlockMarker } from './usfm-markers';

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
