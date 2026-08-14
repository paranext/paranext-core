import { SavedTabInfo } from '@shared/models/docking-framework.model';

/** One tab contributed to the default layout by a product build. */
export interface DefaultLayoutSupplementEntry {
  /**
   * `webViewType` of an existing tab in the base layout. The supplement tab is appended to the
   * panel that already contains a tab of this type. If no such panel exists, the entry is skipped.
   */
  anchorWebViewType: string;
  /**
   * Optional `webViewType` of a tab in the anchor's panel that the supplement tab must be inserted
   * _before_, instead of being appended last. Lets the base layout keep a tab pinned at the end of
   * its panel even though supplement tabs are merged in afterward. Ignored (falls back to
   * appending) when no tab of this type is in the panel.
   */
  insertBeforeWebViewType?: string;
  /** The tab to add, in the same `SavedTabInfo` shape the layout data files use. */
  tab: SavedTabInfo;
  /**
   * Optional setting key. When present, the entry is included only if the setting resolves to
   * `true`. Lets a runtime feature flag gate a build-baked layout tab.
   */
  flagSetting?: string;
}

/** Product-specific additions to the default layout. Empty in vanilla builds. */
export interface DefaultLayoutSupplement {
  tabs: DefaultLayoutSupplementEntry[];
}
