import { describe, expect, it } from 'vitest';
import type { ProjectReference, ResourceReferenceList } from 'platform-scripture';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';
import {
  applyCellOrder,
  getOrderedScriptureTextGridContents,
  moveId,
  pruneCellOrder,
  reconcileCellOrder,
  reorderShownIds,
} from './scripture-text-grid-order.utils';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';

const ref = (id: string) => ({ id });

describe('applyCellOrder', () => {
  it('sorts refs by their index in order', () => {
    const result = applyCellOrder([ref('a'), ref('b'), ref('c')], ['c', 'a', 'b']);
    expect(result.map((r) => r.id)).toEqual(['c', 'a', 'b']);
  });

  it('appends refs not present in order, keeping their incoming order', () => {
    const result = applyCellOrder([ref('a'), ref('new'), ref('b')], ['b', 'a']);
    expect(result.map((r) => r.id)).toEqual(['b', 'a', 'new']);
  });

  it('returns incoming order when order is empty', () => {
    const result = applyCellOrder([ref('a'), ref('b')], []);
    expect(result.map((r) => r.id)).toEqual(['a', 'b']);
  });
});

describe('reorderShownIds', () => {
  it('re-slots shown ids while hidden ids keep their positions (keep-the-slot)', () => {
    // order has a hidden id H between two shown ids; drag B before A.
    const result = reorderShownIds(['a', 'h', 'b'], ['b', 'a']);
    expect(result).toEqual(['b', 'h', 'a']);
  });

  it('appends a brand-new shown id not already in order', () => {
    const result = reorderShownIds(['a', 'b'], ['a', 'c', 'b']);
    expect(result).toEqual(['a', 'c', 'b']);
  });

  it('reorders a simple all-shown list', () => {
    expect(reorderShownIds(['a', 'b'], ['b', 'a'])).toEqual(['b', 'a']);
  });
});

describe('pruneCellOrder', () => {
  it('drops ids no longer known', () => {
    expect(pruneCellOrder(['a', 'gone', 'b'], ['a', 'b'])).toEqual(['a', 'b']);
  });

  it('keeps order otherwise unchanged', () => {
    expect(pruneCellOrder(['a', 'b'], ['a', 'b', 'c'])).toEqual(['a', 'b']);
  });
});

describe('reconcileCellOrder', () => {
  it('returns undefined when every id is still known (nothing to drop)', () => {
    expect(reconcileCellOrder(['a', 'b'], ['a', 'b', 'c'])).toBeUndefined();
  });

  it('returns the pruned array when an id has left', () => {
    expect(reconcileCellOrder(['a', 'gone', 'b'], ['a', 'b'])).toEqual(['a', 'b']);
  });

  it('returns undefined for an empty order', () => {
    expect(reconcileCellOrder([], ['a', 'b'])).toBeUndefined();
  });
});

describe('moveId', () => {
  it('moves the dragged id to the target id position', () => {
    expect(moveId(['a', 'b', 'c'], 'c', 'a')).toEqual(['c', 'a', 'b']);
  });

  it('moves forward correctly', () => {
    expect(moveId(['a', 'b', 'c'], 'a', 'c')).toEqual(['b', 'c', 'a']);
  });

  it('returns the list unchanged when dragged and target are the same', () => {
    expect(moveId(['a', 'b'], 'a', 'a')).toEqual(['a', 'b']);
  });

  it('returns the list unchanged when an id is absent', () => {
    expect(moveId(['a', 'b'], 'x', 'a')).toEqual(['a', 'b']);
  });
});

// #region getOrderedScriptureTextGridContents composition fixtures

const project = (id: string, overrides?: Partial<ProjectReference>): ProjectReference => ({
  type: 'project',
  name: `Project ${id}`,
  id,
  ...overrides,
});

const list = (items: ProjectReference[] = []): ResourceReferenceList => ({
  dataVersion: CURRENT_DATA_VERSION,
  items,
});

const makeSources = (overrides?: Partial<TextCollectionSources>): TextCollectionSources => ({
  adminReferenced: list(),
  userReferenced: list(),
  overlay: {},
  order: [],
  ...overrides,
});

// #endregion

describe('getOrderedScriptureTextGridContents', () => {
  it('reorders the selector output by sources.order', () => {
    // Natural selector order is ['a', 'b'] (referenced-list order); order reverses it to ['b', 'a'].
    const sources = makeSources({
      adminReferenced: list([
        project('a', { isInTextCollection: true }),
        project('b', { isInTextCollection: true }),
      ]),
      order: ['b', 'a'],
    });
    const result = getOrderedScriptureTextGridContents(sources);
    expect(result.map((r) => r.id)).toEqual(['b', 'a']);
  });

  it('returns natural selector order when order is empty', () => {
    const sources = makeSources({
      adminReferenced: list([
        project('a', { isInTextCollection: true }),
        project('b', { isInTextCollection: true }),
      ]),
      order: [],
    });
    const result = getOrderedScriptureTextGridContents(sources);
    expect(result.map((r) => r.id)).toEqual(['a', 'b']);
  });
});
