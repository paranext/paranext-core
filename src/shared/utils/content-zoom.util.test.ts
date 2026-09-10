import { describe, expect, it } from 'vitest';
import {
  adjustZoomFactor,
  buildContentZoomMemoryKey,
  clampZoom,
  formatZoomPercent,
  isValidContentZoomAreaId,
  isValidZoomFactor,
  MAIN_CONTENT_ZOOM_AREA,
  parseContentZoomMemoryKey,
  roundZoom,
  ZOOM_STEP,
} from './content-zoom.util';

describe('content-zoom.util', () => {
  it('steps by 0.1 and rounds away float noise', () => {
    expect(ZOOM_STEP).toBe(0.1);
    expect(adjustZoomFactor(1.1, 1)).toBe(1.2);
    expect(adjustZoomFactor(1.2, -1)).toBe(1.1);
  });

  it('clamps to the shared range', () => {
    expect(clampZoom(0.2)).toBe(0.5);
    expect(clampZoom(9)).toBe(3);
    expect(adjustZoomFactor(3, 1)).toBe(3);
    expect(adjustZoomFactor(0.5, -1)).toBe(0.5);
  });

  it('rounds to one decimal', () => {
    expect(roundZoom(1.2000000000000002)).toBe(1.2);
    expect(roundZoom(0.75)).toBe(0.8);
  });

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
  });
});
