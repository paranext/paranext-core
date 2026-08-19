import { describe, it, expect } from 'vitest';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';

/** Defaults describing a resolved list, an arrived catalog, and one matching configured item. */
const READY = {
  listStatus: 'ready',
  isCatalogReady: true,
  hasCatalogError: false,
  configuredCount: 1,
  matchingCount: 1,
} as const;

describe('getResourcePanelReadiness', () => {
  it('reports loading while the configured list is still resolving', () => {
    expect(getResourcePanelReadiness({ ...READY, listStatus: 'loading' })).toBe('loading');
  });

  it('reports error when the configured list could not be read', () => {
    expect(getResourcePanelReadiness({ ...READY, listStatus: 'error' })).toBe('error');
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
        isCatalogReady: false,
        configuredCount: 0,
        matchingCount: 0,
      }),
    ).toBe('empty');
  });

  it('reports empty when the catalog has arrived and nothing matches this panel', () => {
    expect(getResourcePanelReadiness({ ...READY, matchingCount: 0 })).toBe('empty');
  });

  it('reports configured when the resolved list has matching items', () => {
    expect(getResourcePanelReadiness({ ...READY, configuredCount: 2, matchingCount: 2 })).toBe(
      'configured',
    );
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
        isCatalogReady: false,
        hasCatalogError: true,
        configuredCount: 0,
        matchingCount: 0,
      }),
    ).toBe('empty');
  });

  it('prefers the settings error over a catalog error, reporting the more fundamental failure', () => {
    expect(
      getResourcePanelReadiness({
        ...READY,
        listStatus: 'error',
        isCatalogReady: false,
        hasCatalogError: true,
      }),
    ).toBe('error');
  });
});
