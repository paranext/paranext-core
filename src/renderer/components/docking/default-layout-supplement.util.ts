import { deepClone, type InterfaceMode } from 'platform-bible-utils';
import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock';
import { TAB_TYPE_WEBVIEW, type SavedTabInfo } from '@shared/models/docking-framework.model';
import { mintFreshWebViewIdInTab } from './mint-web-view-ids.util';
import type { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

function isBoxData(node: BoxData | PanelData): node is BoxData {
  return 'children' in node && Array.isArray(node.children);
}

/**
 * The web view type a tab contributes, or `undefined` for a tab that contributes none.
 *
 * Gated on `tabType`, matching `mintFreshWebViewIdInTab`, so that every question this file asks
 * about web view types is the same question the id mint asks. A tab that merely carries a
 * `data.webViewType` without being typed as a web view — which a hand-edited supplement file can
 * produce — contributes no web view of that type, and counting it would let it stand in for one: as
 * an already-present entry, as an anchor panel, or as an ordering target.
 */
function webViewTypeOf(tab: TabData): string | undefined {
  // Layout data files store SavedTabInfo under each tab; read its tabType and data.webViewType.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const savedTab = tab as unknown as SavedTabInfo;
  if (savedTab.tabType !== TAB_TYPE_WEBVIEW) return undefined;
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = savedTab.data as { webViewType?: string } | undefined;
  return data?.webViewType;
}

/**
 * Depth-first walk of a dock box tree, calling `visitPanel` on each leaf panel and returning the
 * first panel it yields (return `undefined` to keep looking). Backs both the anchor lookup and the
 * id collection below.
 *
 * Not reusing `findTabGroupById` (platform-dock-layout-storage.util.ts) is deliberate: it matches
 * by panel id, not by contained web view type, and importing it here would form an import cycle.
 */
function findPanel(
  box: BoxData,
  visitPanel: (panel: PanelData) => PanelData | undefined,
): PanelData | undefined {
  return box.children.reduce<PanelData | undefined>(
    (found, child) =>
      found ?? (isBoxData(child) ? findPanel(child, visitPanel) : visitPanel(child)),
    undefined,
  );
}

function findPanelByWebViewType(box: BoxData, anchor: string): PanelData | undefined {
  return findPanel(box, (panel) =>
    (panel.tabs ?? []).some((t) => webViewTypeOf(t) === anchor) ? panel : undefined,
  );
}

/**
 * Collect the `webViewType` of every web view tab under `box`, across every panel. A web view
 * materialized from a baked layout gets a freshly minted id (see `mintFreshWebViewIds`), so a tab's
 * id is not a stable way to recognize "this supplement entry is already in the layout" across
 * reloads — its `webViewType` is: the supplement entries are singletons by design (one Scripture
 * Text Grid tab, not several), so type identity is exactly what "already present" means here. A tab
 * `webViewTypeOf` answers `undefined` for contributes no type and needs a different identity — see
 * `collectTabIds`.
 */
function collectWebViewTypes(box: BoxData, types: Set<string>): void {
  findPanel(box, (panel) => {
    (panel.tabs ?? []).forEach((t) => {
      // `webViewTypeOf` answers `undefined` for a tab that is not typed as a web view, so a
      // mislabeled tab contributes nothing here — see its doc for why that matters.
      const type = webViewTypeOf(t);
      if (type) types.add(type);
    });
    return undefined;
  });
}

/**
 * Collect the `id` of every tab under `box`, across every panel. Backs dedup for a supplement entry
 * whose tab is not a web view: `mintFreshWebViewIdInTab` mints a fresh id only for a web view tab
 * and copies any other tab through unchanged, so such an entry's baked id IS the id its
 * materialized tab keeps on every reload — stable in exactly the way a web view tab's id is not,
 * which is what makes it a sound identity for these entries and only these.
 *
 * The condition is the tab's own `tabType`, matching the mint's, rather than whether it declares a
 * `data.webViewType`. Those two agree for every well-formed entry and diverge for one malformed
 * shape — a tab typed as a web view that declares no type — where keying on the declaration would
 * hand that tab an id the mint has already replaced.
 */
function collectTabIds(box: BoxData, ids: Set<string>): void {
  findPanel(box, (panel) => {
    (panel.tabs ?? []).forEach((t) => {
      if (t.id) ids.add(t.id);
    });
    return undefined;
  });
}

/**
 * Filter supplement entries down to those enabled for the current build. An entry with no
 * `flagSetting` is always included; an entry with a `flagSetting` is included only if `getFlag`
 * resolves that key to boolean `true`.
 *
 * A `getFlag` that rejects (e.g. the setting has not been contributed yet, or its extension is
 * disabled) is treated as "disabled" for that one entry and reported via `onFlagError`, so a single
 * bad flag can never reject the whole batch and take down layout loading. Side effects (the
 * settings read and logging) are injected, keeping this pure and unit-testable without the renderer
 * service graph.
 */
export async function filterEnabledSupplementEntries(
  entries: DefaultLayoutSupplementEntry[],
  getFlag: (flagSetting: string) => Promise<unknown>,
  onFlagError?: (entry: DefaultLayoutSupplementEntry, error: unknown) => void,
): Promise<DefaultLayoutSupplementEntry[]> {
  // Vanilla Platform.Bible ships an empty supplement. Bail out before any flag reads so the common
  // case does no work and never risks a rejected `getFlag`.
  if (entries.length === 0) return [];
  const resolved = await Promise.all(
    entries.map(async (entry) => {
      if (!entry.flagSetting) return entry;
      try {
        const value = await getFlag(entry.flagSetting);
        return value === true ? entry : undefined;
      } catch (error) {
        onFlagError?.(entry, error);
        return undefined;
      }
    }),
  );
  return resolved.filter((e): e is DefaultLayoutSupplementEntry => e !== undefined);
}

/**
 * The entry's tab as it should appear in `interfaceMode`'s layout, as far as pinning goes.
 *
 * An entry's `isClosable: false` declares "pinned into Simple mode's fixed layout" — the same thing
 * every tab in `simple-layout.data.ts` declares, and load-bearing for the same two reasons:
 * `loadWebViewTab` seeds `TabInfo.isClosable` from the saved data, and `getTabGroup` reads it to
 * route the tab to its column's rc-dock group from the very first render rather than after the
 * provider's async round-trip.
 *
 * Neither reason holds in Power mode, and carrying the value there is actively wrong: `getGroups`
 * registers the column groups in Simple mode only, so a non-closable tab whose `webViewType` is in
 * `FIXED_LAYOUT_WEBVIEW_GROUPS` would point at an unregistered group name — rc-dock's unknown-group
 * fallback — until the provider's response replaced it, and it would render with no close button in
 * a mode where every tab closes freely. So Power mode gets `true`, matching what every dual-mode
 * provider computes for itself (`isClosable: interfaceMode === 'power'`).
 *
 * An entry that declares no `isClosable` at all is left untouched in both modes: it never asked to
 * be pinned, and rc-dock already treats the absent value as closable.
 */
function withPinningForMode(tab: SavedTabInfo, isSimpleMode: boolean): SavedTabInfo {
  // Tab data is `unknown` in the shared model; the supplement JSON stores a WebViewDefinition there.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = tab.data as { isClosable?: boolean } | undefined;
  if (isSimpleMode || data?.isClosable === undefined) return tab;
  return { ...tab, data: { ...data, isClosable: true } };
}

/**
 * Add each supplement entry's tab to the panel containing its `anchorWebViewType` — appended last,
 * or before the tab named by the entry's `insertBeforeWebViewType` when that tab is in the panel.
 * Pure and idempotent: returns a deep clone, never mutates `baseLayout`, and skips an entry that is
 * already present — a web view tab recognized by its `webViewType` and any other tab by its own
 * `id` (see `collectTabIds`) — or whose anchor is absent. An entry typed as a web view that
 * declares no `webViewType` has neither identity, so it is skipped and reported rather than merged;
 * see the `onPlacementAnomaly` parameter. `entries` should already be filtered by any `flagSetting`
 * (see {@link filterEnabledSupplementEntries} and the caller in `web-view.service-shard.ts`).
 *
 * `interfaceMode` is required rather than inferred because this merge runs against both modes'
 * layouts — Simple mode's build-baked one and Power mode's persisted one — while a supplement entry
 * describes a tab's place in Simple mode's fixed columns. Two of an entry's properties are
 * therefore Simple-mode-only, and applying them to a Power-mode layout produces a tab in a group
 * rc-dock never registered and a warning about an ordering that mode does not have:
 * `insertBeforeWebViewType` (see {@link DefaultLayoutSupplementEntry.insertBeforeWebViewType}) and
 * the tab's `isClosable: false` pin (see {@link withPinningForMode}).
 *
 * @param baseLayout Layout to merge into; never mutated.
 * @param entries Supplement entries to merge, already filtered by `flagSetting`.
 * @param interfaceMode Mode whose layout `baseLayout` is, which decides whether each entry's
 *   Simple-mode-only ordering and pinning apply.
 * @param onPlacementAnomaly Called when an entry could not be handled as written, which for a
 *   hand-edited supplement file usually means a typo. Two cases, and they differ by mode: an
 *   `insertBeforeWebViewType` that could not be resolved, reported in Simple mode only, since
 *   appending is Power mode's documented behavior rather than a fallback there; and an entry typed
 *   as a web view that declares no `webViewType`, reported in both modes and skipped, since it is
 *   malformed in both.
 */
export function mergeDefaultLayoutSupplement(
  baseLayout: LayoutBase,
  entries: DefaultLayoutSupplementEntry[],
  interfaceMode: InterfaceMode,
  onPlacementAnomaly?: (entry: DefaultLayoutSupplementEntry, message: string) => void,
): LayoutBase {
  const isSimpleMode = interfaceMode === 'simple';
  const layout: LayoutBase = deepClone(baseLayout);
  if (!layout.dockbox) return layout;
  // dockbox is a BoxData at runtime; LayoutBase types it as the rc-dock union
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockbox = layout.dockbox as BoxData;
  const existingWebViewTypes = new Set<string>();
  const existingTabIds = new Set<string>();
  // Dedup across every box, not just the dockbox: rc-dock keeps floated/windowed/maximized tabs in
  // sibling boxes. A supplement tab the user moved out of the dockbox still exists, so scanning only
  // the dockbox would re-inject a duplicate that grows on each load and corrupts the saved layout.
  [dockbox, layout.floatbox, layout.windowbox, layout.maxbox].forEach((box) => {
    if (!box) return;
    // The optional box is a BoxData at runtime when present; LayoutBase types them as the rc-dock union.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const typedBox = box as BoxData;
    collectWebViewTypes(typedBox, existingWebViewTypes);
    collectTabIds(typedBox, existingTabIds);
  });

  entries.forEach((entry) => {
    // entry.tab is a SavedTabInfo; webViewTypeOf reads the same `data.webViewType` shape off either
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entryWebViewType = webViewTypeOf(entry.tab as unknown as TabData);
    // The tab type decides which identity dedup can use, because the tab type is what decides
    // whether the id survives: `mintFreshWebViewIdInTab` re-mints a web view tab's id on every
    // materialization and copies any other tab through unchanged. So a web view tab is recognized
    // by its `webViewType` (see `collectWebViewTypes`) and any other tab by its own `id` (see
    // `collectTabIds`). Keying this on `data.webViewType` instead would ask a different question
    // than the mint answers, and the two disagree for both malformed shapes a hand-edit can produce
    // — the one handled just below, and its mirror (a tab that declares a type without being typed
    // as a web view), which is why the record-back at the end of this loop branches the same way.
    const isWebViewTab = entry.tab.tabType === TAB_TYPE_WEBVIEW;
    if (isWebViewTab) {
      if (!entryWebViewType) {
        // Neither identity is available: the id is re-minted on every load and there is no type to
        // match on, so nothing can ever recognize this tab as already present. Merging it would
        // append it again on every load, and Power mode persists the merged layout, so the saved
        // layout would grow without bound and collect duplicate ids with it. Refusing the entry
        // costs one absent tab in a hand-edited file; merging it corrupts the layout on disk.
        onPlacementAnomaly?.(
          entry,
          `webViewType is missing on a tab typed as a web view, so it has no identity that survives a reload; skipping it rather than appending it again on every load`,
        );
        return;
      }
      if (existingWebViewTypes.has(entryWebViewType)) return;
    } else if (existingTabIds.has(entry.tab.id)) return;
    const panel = findPanelByWebViewType(dockbox, entry.anchorWebViewType);
    if (!panel) return;
    const tabs = panel.tabs ?? [];
    // Simple mode is the only mode with an order to be relative to, so the request is only honored
    // (and only reported on below) there. Leaving it at -1 in Power mode is the append path.
    const insertAt =
      isSimpleMode && entry.insertBeforeWebViewType
        ? tabs.findIndex((t) => webViewTypeOf(t) === entry.insertBeforeWebViewType)
        : -1;
    // Materializing a supplement entry mints it a fresh id, the same as any other baked-constant tab
    // (see `mintFreshWebViewIds`) — the JSON's id is that tab's slot identity, not a runtime one.
    // Our SavedTabInfo satisfies rc-dock TabData at runtime; the generic union prevents direct assign
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const tab = mintFreshWebViewIdInTab(
      withPinningForMode(entry.tab, isSimpleMode),
    ) as unknown as TabData;
    // Appending is the right fallback, but it is indistinguishable from a successful placement once
    // it has happened, and the two ways to reach it are not equally benign. An entry that asked to
    // be placed before a specific tab and did not find it has a stale or misspelled webViewType —
    // the JSON is hand-edited and reaches this code as an untyped property access, so a typo
    // compiles, lints, and silently reorders the column. Report it; "no request" stays silent, as
    // does Power mode, where appending is what the contract says happens and a warning would fire on
    // every load of a correct layout — noise in the channel that exists to surface the typo.
    if (isSimpleMode && entry.insertBeforeWebViewType && insertAt < 0)
      onPlacementAnomaly?.(
        entry,
        `insertBeforeWebViewType '${entry.insertBeforeWebViewType}' was not found in the panel anchored by '${entry.anchorWebViewType}'; appending '${webViewTypeOf(tab)}' last instead`,
      );
    // Inserting at the head would change which tab the column opens on, not just the order: rc-dock
    // falls back to `tabs[0].id` for a panel with no `activeId` (Algorithm.js), and no panel in the
    // Simple-mode layout sets one. Pin the incumbent first tab as `activeId` before it stops being
    // first, so a supplement tab can take the leftmost position without also taking over as the
    // column's default view — an entry that wants to be the default should say so, not acquire it as
    // a side effect of ordering. Only the head insert can do this, so nothing else is touched.
    if (insertAt === 0 && panel.activeId === undefined && tabs[0]?.id) panel.activeId = tabs[0].id;
    // `findIndex` returning -1 covers both "no `insertBeforeWebViewType`" and "that tab isn't in this
    // panel" — both mean append.
    panel.tabs =
      insertAt < 0 ? [...tabs, tab] : [...tabs.slice(0, insertAt), tab, ...tabs.slice(insertAt)];
    // Record whichever identity the check above looks up, branching the same way it does. Recording
    // under a different key than the check reads is how a duplicate survives: the entry never lands
    // in the set the next occurrence is tested against, and it contributes an identity it does not
    // actually have, which can suppress a later entry that genuinely does.
    //
    // A tab that is not a web view passes through the mint unchanged, so the id it declared is the
    // id its materialized tab keeps, and that id is what the check looks up. On the web view branch
    // `entryWebViewType` is always set — the guard above returned for a web view tab without one —
    // but that narrowing does not reach this far, so it is re-tested rather than asserted away.
    if (!isWebViewTab) existingTabIds.add(entry.tab.id);
    else if (entryWebViewType) existingWebViewTypes.add(entryWebViewType);
  });

  return layout;
}
