import { describe, it, expect } from 'vitest';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import {
  canPublishResourcePanelProjectIds,
  canResolveResourceSelection,
  getResourcePanelReadiness,
} from './resource-panel-readiness.utils';
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

describe('canPublishResourcePanelProjectIds', () => {
  it('allows publishing once the list and the catalog have both arrived', () => {
    expect(canPublishResourcePanelProjectIds(readyWith(1), true)).toBe(true);
  });

  it('allows publishing a resolved but empty list', () => {
    // Nothing configured is a real answer: the panel displays no project, and saying so is correct.
    expect(canPublishResourcePanelProjectIds(readyWith(0), true)).toBe(true);
  });

  it('withholds publishing while the list is still resolving', () => {
    expect(canPublishResourcePanelProjectIds({ status: 'loading' }, true)).toBe(false);
  });

  it('withholds publishing while the catalog has not arrived', () => {
    // The configured resource cannot be resolved to a project id yet, so "nothing displayed" and
    // "not known yet" are indistinguishable — publishing would wipe a correct persisted list.
    expect(canPublishResourcePanelProjectIds(readyWith(1), false)).toBe(false);
  });

  it('withholds publishing when the list could not be read', () => {
    expect(canPublishResourcePanelProjectIds({ status: 'error' }, true)).toBe(false);
  });
});

describe('canResolveResourceSelection', () => {
  const SETTLED = { listState: readyWith(1), isCatalogReady: true, hasCatalogError: false };

  it('allows resolving once the list and the catalog have both arrived', () => {
    expect(canResolveResourceSelection(SETTLED)).toBe(true);
  });

  it('withholds resolving while the catalog is still arriving', () => {
    // A configured resource whose catalog entry has not landed is absent from the filtered rows,
    // so auto-correct would persist a fallback over the user's pick.
    expect(canResolveResourceSelection({ ...SETTLED, isCatalogReady: false })).toBe(false);
  });

  it('withholds resolving while the configured list is still resolving', () => {
    expect(canResolveResourceSelection({ ...SETTLED, listState: { status: 'loading' } })).toBe(
      false,
    );
  });

  it('allows resolving once the catalog has definitively FAILED', () => {
    // Distinct from `canPublishResourcePanelProjectIds`, which waits for a catalog that arrived.
    // `isCatalogReady` stays false for the rest of the session after a failure, so waiting for it
    // here would strand the panel: locally-downloaded rows still arrive and are still selectable,
    // and withholding selection would leave the panel with no resource, hence a permanent spinner
    // with no reachable retry.
    expect(
      canResolveResourceSelection({ ...SETTLED, isCatalogReady: false, hasCatalogError: true }),
    ).toBe(true);
  });

  it('withholds resolving until the panel rows have been built', () => {
    // This panel unions in locally-downloaded resources, a third source the other panel lacks.
    expect(canResolveResourceSelection({ ...SETTLED, arePanelRowsReady: false })).toBe(false);
  });

  it('withholds resolving when the configured list could not be read', () => {
    expect(canResolveResourceSelection({ ...SETTLED, listState: { status: 'error' } })).toBe(false);
  });
});
