import { describe, expect, it } from 'vitest';
import { getGridBodyState, type ScriptureTextGridBodyStateInput } from './grid-body-state.utils';

const SETTLED_EMPTY: ScriptureTextGridBodyStateInput = {
  hasRows: false,
  hasSources: true,
  hasCatalogError: false,
  isLoading: false,
};

describe('getGridBodyState', () => {
  it('shows the grid when there are rows', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, hasRows: true })).toBe('grid');
  });

  it('shows the grid while anything is still loading, rather than a premature message', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, isLoading: true })).toBe('grid');
  });

  it('shows the pick prompt when the sources arrived holding nothing', () => {
    expect(getGridBodyState(SETTLED_EMPTY)).toBe('empty');
  });

  it('reports the catalog failure instead of the pick prompt', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, hasCatalogError: true })).toBe('catalogError');
  });

  it('reports the catalog failure even before the sources arrive', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, hasSources: false, hasCatalogError: true })).toBe(
      'catalogError',
    );
  });

  it('keeps the grid, not the pick prompt, while the sources are absent and nothing failed', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, hasSources: false })).toBe('grid');
  });

  it('does not report a catalog failure once rows resolved from it are on screen', () => {
    expect(getGridBodyState({ ...SETTLED_EMPTY, hasRows: true, hasCatalogError: true })).toBe(
      'grid',
    );
  });
});
