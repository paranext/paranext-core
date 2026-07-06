import { SavedTabInfo } from '@shared/models/docking-framework.model';

/** One tab contributed to the default layout by a product build. */
export interface DefaultLayoutSupplementEntry {
  /**
   * `webViewType` of an existing tab in the base layout. The supplement tab is appended to the
   * panel that already contains a tab of this type. If no such panel exists, the entry is skipped.
   */
  anchorWebViewType: string;
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
