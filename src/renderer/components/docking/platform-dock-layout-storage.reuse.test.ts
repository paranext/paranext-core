import { vi } from 'vitest';
import DockLayout from 'rc-dock';
import { anything, instance, mock, when } from 'ts-mockito';
import { WebViewDefinition } from '@shared/models/web-view.model';
import { findFirstWebViewDefinitionByType } from './platform-dock-layout-storage.util';

// Same file-level mock set as `platform-dock-layout-storage.util.test.ts` — this file imports the
// same module, which still needs its whole dependency graph stubbed to import cleanly.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

describe("findFirstWebViewDefinitionByType()'s project filter", () => {
  let localMockDockLayout: DockLayout;

  beforeEach(() => {
    localMockDockLayout = mock(DockLayout);
  });

  /**
   * Simulates rc-dock's `find(callback, Filter.AnyTab)` behavior: iterate items, return the first
   * one for which `callback` returns true, otherwise undefined. Mirrors the helper of the same name
   * in `platform-dock-layout-storage.util.test.ts`.
   */
  function whenFindReturnsFirstMatch(items: unknown[]) {
    when(localMockDockLayout.find(anything(), anything())).thenCall(
      (callback: (item: unknown) => boolean) => items.find((item) => callback(item)),
    );
  }

  /** Fixture web view tab entry of `TargetType`, scoped to the given project */
  function tabFor(id: string, projectId: string) {
    // Intentionally constructing a partial test fixture that only includes fields relevant to this
    // filter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const webViewDef = {
      id,
      webViewType: 'TargetType',
      projectId,
    } as unknown as WebViewDefinition;
    return { id, title: id, tabType: 'webView', data: webViewDef };
  }

  it('matches type and project together', () => {
    whenFindReturnsFirstMatch([tabFor('wv-a', 'A'), tabFor('wv-b', 'B')]);

    const found = findFirstWebViewDefinitionByType(
      instance(localMockDockLayout),
      'TargetType',
      'A',
    );

    expect(found?.id).toBe('wv-a');
  });

  it('a project mismatch is not a match', () => {
    whenFindReturnsFirstMatch([tabFor('wv-b', 'B')]);

    expect(
      findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType', 'A'),
    ).toBeUndefined();
  });

  it('no project filter matches any project', () => {
    whenFindReturnsFirstMatch([tabFor('wv-a', 'A')]);

    const found = findFirstWebViewDefinitionByType(instance(localMockDockLayout), 'TargetType');

    expect(found?.id).toBe('wv-a');
  });
});
