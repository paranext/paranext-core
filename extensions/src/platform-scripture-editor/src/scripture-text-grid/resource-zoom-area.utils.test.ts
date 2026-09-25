import { describe, expect, it } from 'vitest';
import {
  RESOURCE_ZOOM_AREA_PREFIX,
  TEXT_COLLECTION_ZOOM_AREA,
  toResourceZoomAreaId,
  resourceZoomAreaOf,
} from './resource-zoom-area.utils';

/** The platform's rule for a well-formed zoom area id (`CONTENT_ZOOM_AREA_ID_PATTERN` in core). */
const AREA_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

describe('toResourceZoomAreaId', () => {
  it('prefixes a project id, which is already lower-case hex', () => {
    expect(toResourceZoomAreaId('a1b2c3d4e5f60718')).toBe('resource-a1b2c3d4e5f60718');
  });

  it('lower-cases an upper-case id', () => {
    expect(toResourceZoomAreaId('ABCDEF0123')).toBe('resource-abcdef0123');
  });

  it('gives a DBL entry UID that starts with a digit a leading letter through the prefix', () => {
    expect(toResourceZoomAreaId('2880c78491b2f8ce')).toBe('resource-2880c78491b2f8ce');
  });

  it('replaces every character outside [a-z0-9-] with a hyphen', () => {
    expect(toResourceZoomAreaId('My_Res.v2')).toBe('resource-my-res-v2');
    expect(toResourceZoomAreaId('ελληνικά2')).toBe(`resource-${'-'.repeat(8)}2`);
  });

  it.each(['', '日本語', '___', '-'])(
    'yields no area id for %j, which has no [a-z0-9] character to keep',
    (resourceId) => {
      expect(toResourceZoomAreaId(resourceId)).toBeUndefined();
    },
  );

  it('only ever yields ids the platform accepts, never the reserved one', () => {
    const ids = ['a1b2', 'ABCDEF', '2880c784', 'My_Res.v2', 'default', 'x', '9'];
    ids.forEach((resourceId) => {
      const areaId = toResourceZoomAreaId(resourceId);
      expect(areaId).toMatch(AREA_ID_PATTERN);
      expect(areaId).not.toBe('default');
      expect(areaId?.startsWith(RESOURCE_ZOOM_AREA_PREFIX)).toBe(true);
    });
  });

  it('names the shared fallback area `text-collection`', () => {
    expect(TEXT_COLLECTION_ZOOM_AREA).toBe('text-collection');
    expect(TEXT_COLLECTION_ZOOM_AREA).toMatch(AREA_ID_PATTERN);
  });
});

describe('resourceZoomAreaOf', () => {
  it('is the resource’s own area when its id yields one', () => {
    expect(resourceZoomAreaOf('ABC-1')).toBe('resource-abc-1');
  });

  it('is the shared fallback area when its id yields none', () => {
    expect(resourceZoomAreaOf('日本語')).toBe(TEXT_COLLECTION_ZOOM_AREA);
  });
});
