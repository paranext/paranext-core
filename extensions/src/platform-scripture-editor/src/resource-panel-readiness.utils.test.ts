import { describe, it, expect } from 'vitest';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';

/** A `ready` state carrying `count` configured items. */
function readyWith(count: number): EffectiveResourceReferenceListState {
  const list: EffectiveResourceReferenceList = {
    dataVersion: '1.0.0',
    items: Array.from({ length: count }, (_unused, index) => ({
      type: 'project' as const,
      name: `Project ${index}`,
      id: `id-${index}`,
      source: 'admin' as const,
    })),
  };

  return { status: 'ready', list };
}

/** A resolved list, an arrived catalog, and one matching configured item. */
const READY = {
  listState: readyWith(1),
  isCatalogReady: true,
  hasCatalogError: false,
  matchingCount: 1,
};

describe('getResourcePanelReadiness', () => {
  it('reports loading while the configured list is still resolving', () => {
    expect(getResourcePanelReadiness({ ...READY, listState: { status: 'loading' } })).toBe(
      'loading',
    );
  });

  it('reports error when the configured list could not be read', () => {
    expect(getResourcePanelReadiness({ ...READY, listState: { status: 'error' } })).toBe('error');
  });

  it('reports loading while the catalog has not arrived and something is configured', () => {
    // The regression this guards: a configured DBL resource matches nothing until the catalog
    // lands, so deciding "empty" here showed a premature empty state for the whole fetch.
    expect(getResourcePanelReadiness({ ...READY, isCatalogReady: false, matchingCount: 0 })).toBe(
      'loading',
    );
  });

  it('reports empty without waiting for the catalog when nothing is configured at all', () => {
    // Whether anything is configured does not depend on the catalog — only whether a configured
    // item matches this panel does. Spinning here would delay the pick prompt for no reason.
    expect(
      getResourcePanelReadiness({
        ...READY,
        listState: readyWith(0),
        isCatalogReady: false,
        matchingCount: 0,
      }),
    ).toBe('empty');
  });

  it('reports empty when the catalog has arrived and nothing matches this panel', () => {
    expect(getResourcePanelReadiness({ ...READY, matchingCount: 0 })).toBe('empty');
  });

  it('reports configured when the resolved list has matching items', () => {
    expect(getResourcePanelReadiness({ ...READY, listState: readyWith(2), matchingCount: 2 })).toBe(
      'configured',
    );
  });

  it('treats every configured item as matching when the panel does not filter', () => {
    // The Model Text panel omits `matchingCount` because it shows the first configured item
    // whatever its type; the count must then fall back to the configured total rather than zero.
    expect(
      getResourcePanelReadiness({
        listState: readyWith(1),
        isCatalogReady: true,
        hasCatalogError: false,
      }),
    ).toBe('configured');
  });

  it('reports a catalog error rather than spinning when the catalog fetch failed', () => {
    // Without this the panel waits forever on a catalog that will never arrive.
    expect(
      getResourcePanelReadiness({
        ...READY,
        isCatalogReady: false,
        hasCatalogError: true,
        matchingCount: 0,
      }),
    ).toBe('catalogError');
  });

  it('reports empty rather than a catalog error when nothing is configured', () => {
    // With nothing configured the catalog is irrelevant, so a failure to load it is not worth
    // reporting — the pick prompt is still the correct and actionable answer.
    expect(
      getResourcePanelReadiness({
        ...READY,
        listState: readyWith(0),
        isCatalogReady: false,
        hasCatalogError: true,
        matchingCount: 0,
      }),
    ).toBe('empty');
  });

  it('prefers the settings error over a catalog error, reporting the more fundamental failure', () => {
    expect(
      getResourcePanelReadiness({
        ...READY,
        listState: { status: 'error' },
        isCatalogReady: false,
        hasCatalogError: true,
      }),
    ).toBe('error');
  });
});
