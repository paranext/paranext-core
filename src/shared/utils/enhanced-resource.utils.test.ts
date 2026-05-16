import { describe, expect, test } from 'vitest';
import {
  ENHANCED_RESOURCE_PROTOCOL_NAME,
  getMimeTypeForImageId,
  parseEnhancedResourceUri,
} from '@shared/utils/enhanced-resource.utils';

describe('enhanced-resource.utils / parseEnhancedResourceUri', () => {
  test('parses a thumbnail image URI with no query string', () => {
    const parsed = parseEnhancedResourceUri('papi-er://images/Dromedary');
    expect(parsed).toEqual({
      pathType: 'images',
      imageId: 'Dromedary',
      size: 'thumbnail',
    });
  });
});

describe('enhanced-resource.utils / constants', () => {
  test('ENHANCED_RESOURCE_PROTOCOL_NAME is "papi-er"', () => {
    expect(ENHANCED_RESOURCE_PROTOCOL_NAME).toBe('papi-er');
  });
});

describe('enhanced-resource.utils / parseEnhancedResourceUri edge cases', () => {
  test('size=full query string produces size="full"', () => {
    const parsed = parseEnhancedResourceUri('papi-er://images/Dromedary?size=full');
    expect(parsed.size).toBe('full');
  });

  test('size=thumbnail query string is equivalent to no query string', () => {
    const parsed = parseEnhancedResourceUri('papi-er://images/Dromedary?size=thumbnail');
    expect(parsed.size).toBe('thumbnail');
  });

  test('throws on missing scheme', () => {
    expect(() => parseEnhancedResourceUri('http://images/Dromedary')).toThrow(
      /Invalid papi-er URI/,
    );
  });

  test('throws on missing pathType slash', () => {
    expect(() => parseEnhancedResourceUri('papi-er://Dromedary')).toThrow(/Invalid papi-er URI/);
  });

  test('throws on unknown pathType', () => {
    expect(() => parseEnhancedResourceUri('papi-er://audio/clip.wav')).toThrow(
      /unsupported pathType/,
    );
  });

  test('throws on empty imageId', () => {
    expect(() => parseEnhancedResourceUri('papi-er://images/')).toThrow(/empty imageId/);
  });

  test('throws on unknown size value', () => {
    expect(() => parseEnhancedResourceUri('papi-er://images/Dromedary?size=medium')).toThrow(
      /unknown size/,
    );
  });

  test('preserves imageIds that include dots (extensions)', () => {
    const parsed = parseEnhancedResourceUri('papi-er://images/Dromedary.jpg');
    expect(parsed.imageId).toBe('Dromedary.jpg');
  });
});

// FN-030: encode <-> decode round-trip. The renderer URL builder
// (buildPapiErImageUrl in enhanced-resource.web-view.tsx) calls
// encodeURIComponent(imageId); parseEnhancedResourceUri must invert that so the
// C# MediaService.FetchImageBytes lookup sees the original imageId. Real marble
// data contains IDs with `:`, spaces, parens, etc.
describe('enhanced-resource.utils / parseEnhancedResourceUri imageId URL-decoding (FN-030)', () => {
  test.each([
    ['Fauna:2.2b', 'images with `:` in id (marble Fauna collection)'],
    ['304, Temple Mount', 'images with `,` and space in id'],
    ['Ark (top view)', 'images with `(`, `)` and spaces'],
    ['100% Wool', 'images with `%` in id'],
    ['a/b/c', 'imageIds with `/` (must not be confused with path separators)'],
    ['name?with=query', 'imageIds with `?` and `=` (must not collide with query parsing)'],
    ["O'Brien", "imageIds with `'`"],
    ['héllo+wörld', 'imageIds with non-ASCII and `+`'],
  ])('round-trips imageId %j (%s)', (originalId) => {
    const encoded = encodeURIComponent(originalId);
    const uri = `papi-er://images/${encoded}`;
    const parsed = parseEnhancedResourceUri(uri);
    expect(parsed.imageId).toBe(originalId);
    expect(parsed.size).toBe('thumbnail');
  });

  test('round-trips imageId with special chars combined with size=full query', () => {
    const originalId = 'Fauna:2.2b';
    const uri = `papi-er://images/${encodeURIComponent(originalId)}?size=full`;
    const parsed = parseEnhancedResourceUri(uri);
    expect(parsed.imageId).toBe(originalId);
    expect(parsed.size).toBe('full');
  });

  test('throws "Invalid papi-er URI" on malformed percent-encoding', () => {
    // lone `%` not followed by two hex digits triggers URIError from decodeURIComponent
    expect(() => parseEnhancedResourceUri('papi-er://images/bad%ZZpercent')).toThrow(
      /Invalid papi-er URI - malformed percent-encoding/,
    );
  });

  test('still accepts unencoded alphanumeric imageIds (back-compat)', () => {
    const parsed = parseEnhancedResourceUri('papi-er://images/ATL-0906_new_testament_world');
    expect(parsed.imageId).toBe('ATL-0906_new_testament_world');
  });
});

describe('enhanced-resource.utils / getMimeTypeForImageId', () => {
  test.each([
    ['Dromedary.jpg', 'image/jpeg'],
    ['Dromedary.jpeg', 'image/jpeg'],
    ['Dromedary.png', 'image/png'],
    ['Dromedary.gif', 'image/gif'],
    ['Dromedary.svg', 'image/svg+xml'],
    ['Dromedary.webp', 'image/webp'],
    ['Dromedary.BMP', 'image/bmp'],
  ])('maps %s to %s', (imageId, expected) => {
    expect(getMimeTypeForImageId(imageId)).toBe(expected);
  });

  test('falls back to application/octet-stream for unknown extensions', () => {
    expect(getMimeTypeForImageId('Dromedary.xyz')).toBe('application/octet-stream');
  });

  test('falls back to application/octet-stream when no extension', () => {
    expect(getMimeTypeForImageId('Dromedary')).toBe('application/octet-stream');
  });
});
