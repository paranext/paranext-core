import { describe, it, expect } from 'vitest';
import {
  selectScriptureTextGridTitle,
  TEXT_COLLECTION_THRESHOLD,
} from './scripture-text-grid.utils';

const TITLES = { single: 'Scripture text', multiple: 'Text Collection' };

describe('selectScriptureTextGridTitle', () => {
  it('returns the single-cell title for 0 displayed cells', () => {
    expect(selectScriptureTextGridTitle(0, TITLES)).toBe(TITLES.single);
  });

  it('returns the single-cell title for 1 displayed cell (just below the threshold)', () => {
    expect(selectScriptureTextGridTitle(1, TITLES)).toBe(TITLES.single);
  });

  it('returns the multiple-cell title at the threshold (2 displayed cells)', () => {
    expect(selectScriptureTextGridTitle(TEXT_COLLECTION_THRESHOLD, TITLES)).toBe(TITLES.multiple);
  });

  it('returns the multiple-cell title above the threshold (3 displayed cells)', () => {
    expect(selectScriptureTextGridTitle(3, TITLES)).toBe(TITLES.multiple);
  });
});
