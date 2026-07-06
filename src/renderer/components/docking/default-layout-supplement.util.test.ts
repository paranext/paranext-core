import { BoxData, LayoutBase, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import {
  filterEnabledSupplementEntries,
  mergeDefaultLayoutSupplement,
} from './default-layout-supplement.util';
import { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

function baseLayout(): LayoutBase {
  // Narrowing this object literal to LayoutBase; the literal's nested shape satisfies the type.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const layout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          children: [
            {
              tabs: [
                {
                  id: 'anchor-tab',
                  tabType: 'webView',
                  data: { webViewType: 'platformScriptureEditor.bibleTexts', id: 'anchor-tab' },
                },
              ],
            },
          ],
        },
      ],
    },
  } as unknown as LayoutBase;
  /* eslint-enable no-type-assertion/no-type-assertion */
  return layout;
}

const gridEntry: DefaultLayoutSupplementEntry = {
  anchorWebViewType: 'platformScriptureEditor.bibleTexts',
  tab: {
    id: 'scripture-text-grid-tab',
    tabType: 'webView',
    data: {
      webViewType: 'platformScriptureEditor.scriptureTextGrid',
      id: 'scripture-text-grid-tab',
      contentType: 'react',
      state: {},
    },
  },
};

function tabsInFirstPanel(layout: LayoutBase): SavedTabInfo[] {
  // Traversing the known-fixed layout shape used in tests; casts match the actual runtime structure.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const col = (layout.dockbox as BoxData).children[0] as BoxData;
  const panel = col.children[0] as PanelData;
  return panel.tabs as unknown as SavedTabInfo[];
  /* eslint-enable no-type-assertion/no-type-assertion */
}

describe('mergeDefaultLayoutSupplement', () => {
  it('appends the supplement tab to the panel containing the anchor', () => {
    const merged = mergeDefaultLayoutSupplement(baseLayout(), [gridEntry]);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual([
      'anchor-tab',
      'scripture-text-grid-tab',
    ]);
  });
  it('does not mutate the input layout', () => {
    const input = baseLayout();
    mergeDefaultLayoutSupplement(input, [gridEntry]);
    expect(tabsInFirstPanel(input).map((t) => t.id)).toEqual(['anchor-tab']);
  });
  it('is idempotent: does not add a tab whose id already exists', () => {
    const once = mergeDefaultLayoutSupplement(baseLayout(), [gridEntry]);
    const twice = mergeDefaultLayoutSupplement(once, [gridEntry]);
    expect(tabsInFirstPanel(twice).map((t) => t.id)).toEqual([
      'anchor-tab',
      'scripture-text-grid-tab',
    ]);
  });
  it('does not re-inject a supplement tab that the user has floated out of the dockbox', () => {
    // rc-dock moves a floated tab into `floatbox`, a sibling of `dockbox`. Dedup must see it there,
    // otherwise every subsequent load re-appends a duplicate-id copy into the dockbox anchor and
    // corrupts the persisted layout.
    const layout = baseLayout();
    // The test layout is a known-fixed shape; casting the literal to rc-dock's box types matches the
    // runtime structure (mirrors `baseLayout` / `tabsInFirstPanel` above).
    /* eslint-disable no-type-assertion/no-type-assertion */
    (layout as unknown as { floatbox: BoxData }).floatbox = {
      mode: 'float',
      children: [
        {
          tabs: [
            {
              id: 'scripture-text-grid-tab',
              tabType: 'webView',
              data: {
                webViewType: 'platformScriptureEditor.scriptureTextGrid',
                id: 'scripture-text-grid-tab',
              },
            },
          ],
        },
      ],
    } as unknown as BoxData;
    /* eslint-enable no-type-assertion/no-type-assertion */

    const merged = mergeDefaultLayoutSupplement(layout, [gridEntry]);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual(['anchor-tab']);
  });
  it('skips an entry whose anchor webViewType is not present', () => {
    const orphan: DefaultLayoutSupplementEntry = {
      ...gridEntry,
      anchorWebViewType: 'does.not.exist',
    };
    const merged = mergeDefaultLayoutSupplement(baseLayout(), [orphan]);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual(['anchor-tab']);
  });
  it('returns the layout unchanged for an empty supplement', () => {
    const merged = mergeDefaultLayoutSupplement(baseLayout(), []);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual(['anchor-tab']);
  });
});

/** Build a minimal flagged/unflagged supplement entry (tab id mirrors its webViewType). */
function flagEntry(id: string, flagSetting?: string): DefaultLayoutSupplementEntry {
  return {
    anchorWebViewType: 'anchor.type',
    tab: { id, tabType: 'webView', data: { webViewType: id } },
    flagSetting,
  };
}

describe('filterEnabledSupplementEntries', () => {
  it('returns [] and reads no flags when there are no entries (the vanilla case)', async () => {
    const readKeys: string[] = [];
    const getFlag = async (key: string) => {
      readKeys.push(key);
      return true;
    };
    expect(await filterEnabledSupplementEntries([], getFlag)).toEqual([]);
    expect(readKeys).toEqual([]);
  });

  it('always includes an entry with no flagSetting, without reading any flag', async () => {
    const readKeys: string[] = [];
    const getFlag = async (key: string) => {
      readKeys.push(key);
      return true;
    };
    const e = flagEntry('no-flag');
    expect(await filterEnabledSupplementEntries([e], getFlag)).toEqual([e]);
    expect(readKeys).toEqual([]);
  });

  it('includes a flagged entry only when its flag resolves to boolean true', async () => {
    const on = flagEntry('on', 'flag.on');
    const off = flagEntry('off', 'flag.off');
    // Truthy but not === true — must be treated as disabled.
    const truthy = flagEntry('truthy', 'flag.truthy');
    const getFlag = async (key: string) => {
      if (key === 'flag.on') return true;
      if (key === 'flag.off') return false;
      return 'true';
    };
    expect(await filterEnabledSupplementEntries([on, off, truthy], getFlag)).toEqual([on]);
  });

  it('skips an entry whose flag read rejects and reports it, without dropping the others', async () => {
    const good = flagEntry('good', 'flag.good');
    const bad = flagEntry('bad', 'flag.bad');
    const error = new Error('No setting exists for key flag.bad');
    const getFlag = async (key: string) => {
      if (key === 'flag.bad') throw error;
      return true;
    };
    const reported: Array<{ entry: DefaultLayoutSupplementEntry; error: unknown }> = [];
    const onFlagError = (entry: DefaultLayoutSupplementEntry, err: unknown) =>
      reported.push({ entry, error: err });

    expect(await filterEnabledSupplementEntries([good, bad], getFlag, onFlagError)).toEqual([good]);
    expect(reported).toEqual([{ entry: bad, error }]);
  });

  it('does not reject when a flag read fails and no onFlagError is provided', async () => {
    const bad = flagEntry('bad', 'flag.bad');
    const getFlag = async () => {
      throw new Error('boom');
    };
    await expect(filterEnabledSupplementEntries([bad], getFlag)).resolves.toEqual([]);
  });

  it('preserves the original entry order', async () => {
    const a = flagEntry('a', 'flag.a');
    const b = flagEntry('b');
    const c = flagEntry('c', 'flag.c');
    const getFlag = async () => true;
    expect(await filterEnabledSupplementEntries([a, b, c], getFlag)).toEqual([a, b, c]);
  });
});
