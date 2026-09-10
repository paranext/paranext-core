import { SavedTabInfo } from '@shared/models/docking-framework.model';

/** One tab contributed to the default layout by a product build. */
export interface DefaultLayoutSupplementEntry {
  /**
   * `webViewType` of an existing tab in the base layout. The supplement tab joins the panel that
   * already contains a tab of this type — appended last, or at the position
   * {@link DefaultLayoutSupplementEntry.insertBeforeWebViewType} names. If no such panel exists, the
   * entry is skipped.
   */
  anchorWebViewType: string;
  /**
   * Optional `webViewType` of a tab in the anchor's panel that the supplement tab must be inserted
   * _before_, instead of being appended last. Lets the base layout keep a tab pinned at the end of
   * its panel even though supplement tabs are merged in afterward.
   *
   * **Simple mode only.** Ordering describes Simple mode's fixed columns, whose membership and
   * sequence are part of the layout's contract. Power mode has no fixed layout — its panels hold
   * whatever the user opened and arranged — so there is no position to be relative to, and the tab
   * is appended.
   *
   * Within Simple mode, falls back to appending when no tab of this type is in the panel, which is
   * reported as a placement anomaly rather than applied silently — an unresolvable target is far
   * more often a typo or a renamed `webViewType` than a deliberate "put it last". Power mode's
   * append is the documented behavior rather than a fallback, so it reports nothing.
   */
  insertBeforeWebViewType?: string;
  /**
   * The tab to add, in the same `SavedTabInfo` shape the layout data files use.
   *
   * `data.isClosable: false` here means "pinned into Simple mode's fixed layout", matching what
   * `simple-layout.data.ts` declares for every static tab. It is applied only when merging into the
   * Simple-mode layout; a Power-mode merge rewrites it to `true`, because nothing is pinned there
   * and a non-closable tab would be routed to an rc-dock group Power mode never registers (see
   * `getTabGroup` / `getGroups` in `platform-dock-layout-positioning.util.ts`).
   */
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
