import { vi } from 'vitest';
import { BoxData, LayoutBase, PanelData } from 'rc-dock';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { simpleLayout } from './simple-layout.data';
import { applyProjectIdToTabs, buildSimpleLayoutForProject } from './simple-layout.builder';
import defaultLayoutSupplement from './default-layout-supplement.json';
import { mergeDefaultLayoutSupplement } from './default-layout-supplement.util';
import { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';
import {
  getTabGroup,
  HEADLESS_GROUP,
  TAB_GROUP,
  TAB_GROUP_RESOURCES,
} from './platform-dock-layout-positioning.util';

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

/** Returns the saved tabs of a column's single panel, in the order they appear. */
function columnTabs(layout: LayoutBase, columnIndex: number): SavedTabInfo[] {
  // Narrowing rc-dock's generic union to the concrete shape this layout uses.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const column = (layout.dockbox as BoxData).children[columnIndex] as BoxData;
  const panel = column.children[0] as PanelData;
  return panel.tabs as unknown as SavedTabInfo[];
  /* eslint-enable no-type-assertion/no-type-assertion */
}

/** Returns the webViewTypes of a column's single panel, in the order they appear. */
function columnWebViewTypes(layout: LayoutBase, columnIndex: number): (string | undefined)[] {
  return columnTabs(layout, columnIndex).map(webViewTypeOf);
}

/**
 * The `TabInfo` the dock layout would build for a saved layout tab, as far as `getTabGroup` reads
 * it: the group is decided by `isClosable` plus the web view type, so those are the two fields that
 * have to survive from the saved data.
 */
function toTabInfo(tab: SavedTabInfo): TabInfo {
  // Tab data is `unknown` in the shared model; layout and supplement tabs store a WebViewDefinition.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = tab.data as { webViewType?: string; isClosable?: boolean } | undefined;
  return {
    id: tab.id,
    tabType: tab.tabType,
    tabTitle: 'Test',
    content: undefined,
    isClosable: data?.isClosable,
    data: { id: tab.id, webViewType: data?.webViewType },
  };
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

const EDITOR_MENUS_PATH = resolve(
  __dirname,
  '../../../../extensions/src/platform-scripture-editor/contributions/menus.json',
);

/**
 * The tab each Simple TOOLS item brings to the front. Kept by hand because the menu names a command
 * and the layout names a web view type. A new third-column tab fails this test until it gets a
 * TOOLS item and an entry here.
 */
const TAB_FOR_COMMAND: Record<string, string> = {
  'platformScriptureEditor.showBibleTextsPanel': 'platformScriptureEditor.bibleTexts',
  'platformScriptureEditor.showCommentariesPanel': 'platformScriptureEditor.commentaries',
  'legacyCommentManager.showCommentListPanel': 'legacyCommentManager.commentListPanel',
  'platformScriptureEditor.showTextCollectionPanel': 'platformScriptureEditor.scriptureTextGrid',
  'platformScripture.openFind': 'platformScripture.find',
};

type MenuItemJson = {
  group: string;
  order: number;
  command?: string;
  hiddenInterfaceModes?: string[];
};

/**
 * Whether a group's items render under a column. Restates `isGroupUnderColumnOrSubMenu` in
 * `lib/platform-bible-react/src/components/advanced/menus/menu.util.ts`, which the package does not
 * export, so keep the two in sync: a group belongs to a column when it names that column, or when
 * it is keyed the same as the column.
 */
function isGroupUnderColumn(groupKey: string, group: { column?: string }, columnKey: string) {
  return group.column === columnKey || groupKey === columnKey;
}

/** The TOOLS section's commands, read straight off the raw menu JSON, in the order they are served. */
function simpleToolsCommands(): string[] {
  const menus = JSON.parse(readFileSync(EDITOR_MENUS_PATH, 'utf8'));
  const { topMenu } = menus.webViewMenus['platformScriptureEditor.react'];
  const {
    groups,
    items,
  }: {
    groups: Record<string, { column?: string; order: number }>;
    items: MenuItemJson[];
  } = topMenu;
  return Object.entries(groups)
    .filter(([groupKey, group]) =>
      isGroupUnderColumn(groupKey, group, 'platformScriptureEditor.simpleTools'),
    )
    .sort(([, a], [, b]) => a.order - b.order)
    .flatMap(([groupKey]) =>
      items
        .filter((item) => item.group === groupKey && !item.hiddenInterfaceModes?.includes('simple'))
        .sort((a, b) => a.order - b.order)
        .flatMap((item) => (item.command ? [item.command] : [])),
    );
}

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

  it('every pinned tab is confined to its column group', () => {
    // FIXED_LAYOUT_WEBVIEW_GROUPS claims to be "kept in sync" with these two files by hand, and
    // nothing enforced it. The failure is silent by construction: a pinned webViewType missing from
    // the map falls back to TAB_GROUP, which IS registered in simple mode, so no error surfaces —
    // the tab just becomes draggable across columns, defeating the confinement the map exists to
    // provide.
    const merged = mergeDefaultLayoutSupplement(simpleLayout, supplementEntries, 'simple');
    const expectedGroups = [HEADLESS_GROUP, HEADLESS_GROUP, TAB_GROUP_RESOURCES];

    [0, 1, 2].forEach((columnIndex) => {
      columnTabs(merged, columnIndex).forEach((tab) => {
        // Read from the merged layout rather than forced: pinned tabs are exactly the non-closable
        // ones, so a tab that lost its pin would land in TAB_GROUP here and fail, which is the point.
        expect(getTabGroup(toTabInfo(tab))).toBe(expectedGroups[columnIndex]);
      });
    });
  });

  it('every pinned webViewType still exists in the extension that provides it', () => {
    // Core cannot import extension source, so these webViewTypes are bare string literals in the
    // layout data — four of them predate this column's Find tab. Renaming a provider's webViewType
    // is a pure-rename refactor inside its own extension: it type-checks, it lints, and Simple mode
    // silently loses that tab, because a saved tab with no registered provider just fails to load.
    // Reading the extension source is the same technique the SCRIPTURE_EDITOR_WEBVIEW_TYPE drift
    // guard uses (web-view.model.test.ts); matching on the literal rather than a constant name keeps
    // it working across the several differently-named (and mostly non-exported) constants these six
    // types are declared under.
    const extensionSourceDirs: Record<string, string> = {
      platformScripture: 'extensions/src/platform-scripture/src',
      platformScriptureEditor: 'extensions/src/platform-scripture-editor/src',
      legacyCommentManager: 'extensions/src/legacy-comment-manager/src',
    };

    /**
     * Every production .ts/.tsx source file under `dir`, skipping generated build output and
     * tests/stories. Excluding those matters: a test fixture or story that hard-codes the same
     * webViewType string would otherwise vouch for a constant production code no longer declares,
     * turning this guard into a false negative.
     */
    function sourceFilesIn(dir: string): string[] {
      return readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
        const full = resolve(dir, dirent.name);
        if (dirent.isDirectory()) return dirent.name === 'temp-build' ? [] : sourceFilesIn(full);
        if (/\.(test|stories)\.tsx?$/.test(dirent.name)) return [];
        return /\.tsx?$/.test(dirent.name) ? [full] : [];
      });
    }

    const merged = mergeDefaultLayoutSupplement(simpleLayout, supplementEntries, 'simple');
    const pinnedTypes = [0, 1, 2].flatMap((index) => columnWebViewTypes(merged, index));
    expect(pinnedTypes.length).toBeGreaterThan(0);

    // Collected rather than asserted per type so a failure names every missing one at once.
    const undeclared = pinnedTypes.filter((webViewType) => {
      const extensionName = webViewType?.split('.')[0] ?? '';
      const sourceDir = extensionSourceDirs[extensionName];
      // An unrecognized prefix means a new extension started contributing a pinned tab without
      // being added here, which would silently skip the check for it.
      expect(sourceDir).toBeDefined();

      // Vitest runs with the repo root as cwd.
      return !sourceFilesIn(resolve(process.cwd(), sourceDir)).some((file) =>
        readFileSync(file, 'utf8').includes(`'${webViewType}'`),
      );
    });

    expect(undeclared).toEqual([]);
  });

  it('merging the real supplement puts Text Collection before Find', () => {
    const merged = mergeDefaultLayoutSupplement(simpleLayout, supplementEntries, 'simple');

    expect(columnWebViewTypes(merged, 2)).toEqual([
      'platformScriptureEditor.bibleTexts',
      'platformScriptureEditor.commentaries',
      'legacyCommentManager.commentListPanel',
      'platformScriptureEditor.scriptureTextGrid',
      'platformScripture.find',
    ]);
  });

  /**
   * TOOLS follows the Simple design's order rather than the tabs' order (the served order is pinned
   * in `menu-data.service-host.scripture-editor-menu.test.ts`), so this compares the two as sets.
   */
  it('gives every third-column tab a TOOLS item in the Simple Project menu, and no item a missing tab', () => {
    const merged = mergeDefaultLayoutSupplement(simpleLayout, supplementEntries, 'simple');
    const mappedTabs = simpleToolsCommands().map((command) => TAB_FOR_COMMAND[command]);
    // An unmapped command maps to undefined; fail on it here rather than as an unexplained set
    // mismatch below
    mappedTabs.forEach((tab) => expect(tab).toBeDefined());
    expect(mappedTabs).toHaveLength(new Set(mappedTabs).size);
    expect(new Set(mappedTabs)).toEqual(new Set(columnWebViewTypes(merged, 2)));
  });

  it('the real supplement leaves nothing Simple-mode-only behind in a power-mode merge', () => {
    // The shipped entry's two Simple-mode-only properties are what this asserts, so the layout it is
    // merged into only has to contain the anchor — there is no power-mode layout fixture to use
    // instead, because a power-mode layout is whatever the user arranged. `isClosable: false` would
    // route the tab to TAB_GROUP_RESOURCES, a group `getGroups(true)` never registers, and the
    // ordering request names a tab that only Simple mode's fixed layout has.
    const anomalies: string[] = [];
    const merged = mergeDefaultLayoutSupplement(
      simpleLayout,
      supplementEntries,
      'power',
      (_entry, message) => anomalies.push(message),
    );

    expect(anomalies).toEqual([]);
    const pinnedInPowerMode = [0, 1, 2]
      .flatMap((index) => columnTabs(merged, index))
      .filter((tab) => supplementEntries.some((entry) => entry.tab.id === tab.id))
      .filter((tab) => getTabGroup(toTabInfo(tab)) !== TAB_GROUP);
    expect(pinnedInPowerMode).toEqual([]);
  });

  it('reports a placement anomaly instead of silently appending when the target is missing', () => {
    const anomalies: string[] = [];
    const brokenEntries = supplementEntries.map((entry) => ({
      ...entry,
      insertBeforeWebViewType: 'platformScripture.findTypo',
    }));

    const merged = mergeDefaultLayoutSupplement(
      simpleLayout,
      brokenEntries,
      'simple',
      (_entry, message) => anomalies.push(message),
    );

    expect(anomalies).toHaveLength(brokenEntries.length);
    expect(anomalies[0]).toContain('platformScripture.findTypo');
    // Still appended — the fallback is intentional; it just is no longer silent.
    expect(columnWebViewTypes(merged, 2).at(-1)).toBe('platformScriptureEditor.scriptureTextGrid');
  });

  it('bakes the project id into the merged supplement tab, not just the static tabs', () => {
    // Runs the bake over the entries actually shipped in `default-layout-supplement.json`, so a
    // new entry whose tab the bake cannot reach (no `data` payload) fails here rather than in the
    // app. The bake itself is covered by `simple-layout.builder.test.ts`.
    const merged = mergeDefaultLayoutSupplement(
      buildSimpleLayoutForProject('proj-1').layout,
      supplementEntries,
      'simple',
    );

    const baked = applyProjectIdToTabs(merged, 'proj-1');

    columnTabs(baked, 2).forEach((tab) => {
      // Narrow only the field we read.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((tab.data as { projectId?: string }).projectId).toBe('proj-1');
    });
    const gridTab = columnTabs(baked, 2).find(
      (tab) => webViewTypeOf(tab) === 'platformScriptureEditor.scriptureTextGrid',
    );
    expect(gridTab).toBeDefined();
  });
});
