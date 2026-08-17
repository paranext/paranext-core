import { vi } from 'vitest';
import { BoxData, LayoutBase, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { simpleLayout } from './simple-layout.data';
import defaultLayoutSupplement from './default-layout-supplement.json';
import { mergeDefaultLayoutSupplement } from './default-layout-supplement.util';
import { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

/**
 * These tests deliberately use the REAL `simple-layout.data.ts` and the REAL
 * `default-layout-supplement.json` together, because the shipped Column 3 order is a product of the
 * two and neither file's own tests can see it. `default-layout-supplement.util.test.ts` builds
 * synthetic entries and a synthetic layout; `web-view.service-host.test.ts` — the only place that
 * imports the real JSON — mocks it away. So the ordering that Simple mode actually ships was
 * untested from every direction, while the merge silently appends whenever an
 * `insertBeforeWebViewType` does not resolve. A rename on either side would have moved Text
 * Collection after Find with the whole suite green.
 */

/** Reads the webViewType of a saved tab in the layout data. */
function webViewTypeOf(tab: unknown): string | undefined {
  // Tabs are SavedTabInfo at runtime even though rc-dock types them as TabData.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = (tab as SavedTabInfo).data as { webViewType?: string } | undefined;
  return data?.webViewType;
}

/** Returns the webViewTypes of a column's single panel, in the order they appear. */
function columnWebViewTypes(layout: LayoutBase, columnIndex: number): (string | undefined)[] {
  // Narrowing rc-dock's generic union to the concrete shape this layout uses.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const column = (layout.dockbox as BoxData).children[columnIndex] as BoxData;
  const panel = column.children[0] as PanelData;
  /* eslint-enable no-type-assertion/no-type-assertion */
  return panel.tabs.map(webViewTypeOf);
}

/** Every webViewType anywhere in the static layout. */
function allWebViewTypes(layout: LayoutBase): (string | undefined)[] {
  // Narrowing rc-dock's generic dockbox union to BoxData to walk its columns.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (layout.dockbox as BoxData).children.flatMap((_, index) =>
    columnWebViewTypes(layout, index),
  );
}

const supplementEntries: DefaultLayoutSupplementEntry[] =
  // The JSON is a plain module import with no excess-property checking against the entry type; this
  // assertion is what the production import in web-view.service-host.ts does implicitly.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  defaultLayoutSupplement.tabs as unknown as DefaultLayoutSupplementEntry[];

describe('shipped Simple-mode Column 3 order', () => {
  it('the static layout lists Column 3 in the shipped order', () => {
    // Order-sensitive on purpose: `toHaveLength` and `toContain` both pass under any permutation,
    // so they cannot catch a reordering — which is the specific regression this column has already
    // had once.
    expect(columnWebViewTypes(simpleLayout, 2)).toEqual([
      'platformScriptureEditor.bibleTexts',
      'platformScriptureEditor.commentaries',
      'legacyCommentManager.commentListPanel',
      'platformScripture.find',
    ]);
  });

  it('every supplement entry anchors to a webViewType that exists in the static layout', () => {
    const present = new Set(allWebViewTypes(simpleLayout));
    supplementEntries.forEach((entry) => {
      expect(present).toContain(entry.anchorWebViewType);
    });
  });

  it('every supplement entry uses only recognized keys', () => {
    // A misspelled key is the failure mode the value-based checks below cannot see: it makes the
    // property simply absent, which reads as "this entry never asked to be placed anywhere" and
    // appends silently. TypeScript does not catch it either — the JSON reaches the merge as an
    // untyped module import, so there is no excess-property check anywhere in the real path.
    const recognizedKeys = new Set([
      'anchorWebViewType',
      'insertBeforeWebViewType',
      'flagSetting',
      'tab',
    ]);
    defaultLayoutSupplement.tabs.forEach((entry) => {
      Object.keys(entry).forEach((key) => expect(recognizedKeys).toContain(key));
    });
  });

  it('every supplement entry insertBeforeWebViewType resolves inside its anchor panel', () => {
    // The failure this guards is silent: an unresolvable `insertBeforeWebViewType` — a typo, or a
    // renamed webViewType on either side — appends instead, which looks identical to success in the
    // merged layout.
    supplementEntries.forEach((entry) => {
      if (!entry.insertBeforeWebViewType) return;
      const anchorColumnTypes = [0, 1, 2]
        .map((index) => columnWebViewTypes(simpleLayout, index))
        .find((types) => types.includes(entry.anchorWebViewType));
      expect(anchorColumnTypes).toBeDefined();
      expect(anchorColumnTypes).toContain(entry.insertBeforeWebViewType);
    });
  });

  it('merging the real supplement puts Text Collection before Find', () => {
    const merged = mergeDefaultLayoutSupplement(simpleLayout, supplementEntries);

    expect(columnWebViewTypes(merged, 2)).toEqual([
      'platformScriptureEditor.bibleTexts',
      'platformScriptureEditor.commentaries',
      'legacyCommentManager.commentListPanel',
      'platformScriptureEditor.scriptureTextGrid',
      'platformScripture.find',
    ]);
  });

  it('reports a placement anomaly instead of silently appending when the target is missing', () => {
    const anomalies: string[] = [];
    const brokenEntries = supplementEntries.map((entry) => ({
      ...entry,
      insertBeforeWebViewType: 'platformScripture.findTypo',
    }));

    const merged = mergeDefaultLayoutSupplement(simpleLayout, brokenEntries, (_entry, message) =>
      anomalies.push(message),
    );

    expect(anomalies).toHaveLength(brokenEntries.length);
    expect(anomalies[0]).toContain('platformScripture.findTypo');
    // Still appended — the fallback is intentional; it just is no longer silent.
    expect(columnWebViewTypes(merged, 2).at(-1)).toBe('platformScriptureEditor.scriptureTextGrid');
  });
});
