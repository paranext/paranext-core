import { describe, expect, it } from 'vitest';
import {
  CONTENT_ZOOM_AREA_ID_PATTERN,
  getContentZoomCssVariable,
  RESERVED_CONTENT_ZOOM_AREA_ID,
} from '@shared/models/content-zoom.model';
import {
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  MAIN_CONTENT_ZOOM_AREA,
} from '@shared/models/web-view.model';
import {
  buildContentZoomMemoryKey,
  formatZoomPercent,
  isValidContentZoomAreaId,
  isValidZoomFactor,
  parseContentZoomMemoryKey,
} from './content-zoom.util';

describe('content-zoom.util', () => {
  it('formats as a percentage with a thin space', () => {
    expect(formatZoomPercent(1)).toBe('100 %');
    expect(formatZoomPercent(1.2)).toBe('120 %');
    expect(formatZoomPercent(0.5)).toBe('50 %');
  });

  it('accepts only finite numbers inside the range', () => {
    expect(isValidZoomFactor(1)).toBe(true);
    expect(isValidZoomFactor(0.5)).toBe(true);
    expect(isValidZoomFactor(3)).toBe(true);
    expect(isValidZoomFactor(3.1)).toBe(false);
    expect(isValidZoomFactor(Number.NaN)).toBe(false);
    expect(isValidZoomFactor('1')).toBe(false);
    expect(isValidZoomFactor(undefined)).toBe(false);
  });

  it('accepts only lower-case area ids that start with a letter', () => {
    expect(MAIN_CONTENT_ZOOM_AREA).toBe('main');
    expect(isValidContentZoomAreaId('main')).toBe(true);
    expect(isValidContentZoomAreaId('footnotes')).toBe(true);
    expect(isValidContentZoomAreaId('side-bar2')).toBe(true);
    expect(isValidContentZoomAreaId('Main')).toBe(false);
    expect(isValidContentZoomAreaId('')).toBe(false);
    expect(isValidContentZoomAreaId('a:b')).toBe(false);
    expect(isValidContentZoomAreaId(3)).toBe(false);
  });

  it('rejects the reserved area id, whose variable is the pane-wide default', () => {
    expect(RESERVED_CONTENT_ZOOM_AREA_ID).toBe('default');
    expect(getContentZoomCssVariable(RESERVED_CONTENT_ZOOM_AREA_ID)).toBe(
      CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
    );
    // The raw pattern still matches it; only the predicate rules it out
    expect(CONTENT_ZOOM_AREA_ID_PATTERN.test(RESERVED_CONTENT_ZOOM_AREA_ID)).toBe(true);
    expect(isValidContentZoomAreaId(RESERVED_CONTENT_ZOOM_AREA_ID)).toBe(false);
    expect(() =>
      buildContentZoomMemoryKey('editor', 'abc123', RESERVED_CONTENT_ZOOM_AREA_ID),
    ).toThrow();
    expect(
      parseContentZoomMemoryKey(`editor:abc123:${RESERVED_CONTENT_ZOOM_AREA_ID}`),
    ).toBeUndefined();
  });

  it('builds memory keys as kind:identity:area and parses them back, keeping colons inside the identity', () => {
    expect(buildContentZoomMemoryKey('editor', 'abc123', 'main')).toBe('editor:abc123:main');
    expect(buildContentZoomMemoryKey('notes', 'p1', 'footnotes')).toBe('notes:p1:footnotes');
    expect(parseContentZoomMemoryKey('editor:abc123:main')).toEqual({
      kind: 'editor',
      identity: 'abc123',
      areaId: 'main',
    });
    expect(parseContentZoomMemoryKey('resource:res:with:colons:main')).toEqual({
      kind: 'resource',
      identity: 'res:with:colons',
      areaId: 'main',
    });
    expect(parseContentZoomMemoryKey('editor:abc123')).toBeUndefined();
    expect(parseContentZoomMemoryKey('other:abc123:main')).toBeUndefined();
    expect(parseContentZoomMemoryKey('editor:abc123:Main')).toBeUndefined();
    expect(parseContentZoomMemoryKey('editor::main')).toBeUndefined();
    // Every declared kind parses, including the hyphenated ones; a kind no declaration uses does not.
    expect(parseContentZoomMemoryKey('word-list:PROJ:main')).toEqual({
      kind: 'word-list',
      identity: 'PROJ',
      areaId: 'main',
    });
    expect(parseContentZoomMemoryKey('compare-versions:PROJ:main')?.kind).toBe('compare-versions');
    expect(parseContentZoomMemoryKey('inventory:PROJ:main')?.kind).toBe('inventory');
  });

  it('rejects an identity or area id that parseContentZoomMemoryKey could not round-trip', () => {
    expect(() => buildContentZoomMemoryKey('editor', '', 'main')).toThrow();
    expect(() => buildContentZoomMemoryKey('editor', 'abc123', 'Main')).toThrow();
    expect(() => buildContentZoomMemoryKey('editor', 'abc123', '')).toThrow();
  });
});
