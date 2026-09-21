import { useEffect, useRef } from 'react';
import {
  addDragStateListener,
  DockContext,
  DragDropDiv,
  DragState,
  PanelData,
  removeDragStateListener,
} from 'rc-dock';
import { resolveTabBarDropZoneSource } from './tab-bar-drop-zone.util';
import './tab-bar-drop-zone.component.scss';

export interface TabBarDropZoneProps {
  panelData: PanelData;
  context: DockContext;
}

/** Attribute set on the zone element while a drag is in progress. */
export const TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE = 'data-dragging';

/**
 * CSS custom property (set on the zone element) holding how far the zone's drag-time `::before` hit
 * area reaches backward from the zone's start edge, over the last tab's trailing half. See
 * {@link claimLastTabOverlap}.
 */
const OVERLAP_PROPERTY = '--tab-bar-drop-zone-overlap';
/**
 * CSS custom property (set on the zone element) holding how far the inner indicator reaches
 * backward from the zone's start edge, so the visible indicator starts at the last tab's trailing
 * edge rather than after the gap that follows it — and further still, into the tab itself, when the
 * zone is too narrow to draw a legible indicator on its own. See {@link claimLastTabOverlap}.
 */
const INDICATOR_LEAD_PROPERTY = '--tab-bar-drop-zone-indicator-lead';
/**
 * Legible target width, in px, that `claimLastTabOverlap` widens the indicator's backward lead
 * toward on a narrow zone — capped at the overlap (see {@link claimLastTabOverlap}) so the indicator
 * never reaches back further than the region that actually hit-tests to the zone. This is a target
 * for how wide the indicator is drawn, not a gate on whether a drop is accepted; see
 * {@link MIN_VISIBLE_INDICATOR_WIDTH} for that. Matches rc-dock's own hard-coded 30px width for an
 * after-tab drop's indicator (`DockLayout.tsx`'s `after-tab` case: `width = 30`), so the two read
 * as the same size whenever the target is reached — nothing mechanically ties this to
 * `$panel-button-size`; the two happening to share a value is coincidence, not a dependency.
 */
const MIN_DRAWN_INDICATOR_WIDTH = 30;
/**
 * Narrowest width, in px, `onDragOver` treats as a visible indicator; below this,
 * `.dock-drop-indicator`'s ring shadow would still paint around a rect with nothing to show, so the
 * zone rejects instead. This is the only accept/reject gate `onDragOver` applies — deliberately
 * independent of {@link MIN_DRAWN_INDICATOR_WIDTH}, so an indicator that reads as legible but falls
 * short of that larger target is still accepted rather than rejected. `claimLastTabOverlap` claims
 * the last tab's trailing half only when doing so leaves the indicator at or above this width, so
 * the zone claiming a region and `onDragOver` accepting a drop there always agree.
 */
const MIN_VISIBLE_INDICATOR_WIDTH = 1;

/**
 * Clears a zone's claimed drop indicator. rc-dock's own `.d.ts` types `setDropRect`'s `element`
 * param as non-nullable `HTMLElement`, but its own `DockDropSquare`
 * (`node_modules/rc-dock/src/DockDropLayer.tsx`) calls `setDropRect(null, 'remove', this)` to clear
 * its indicator — direction `'remove'` doesn't read `element` at all. This mirrors that established
 * clearing call, centralizing the resulting type-declaration mismatch in one place.
 */
function clearDropRect(context: DockContext, source: unknown): void {
  // @ts-expect-error ts(2345) - see this function's TSDoc: rc-dock's own runtime usage passes
  // `null` here, its `.d.ts` just doesn't say so.
  // eslint-disable-next-line no-null/no-null -- required by rc-dock's own `setDropRect` contract
  context.setDropRect(null, 'remove', source);
}

/** Ends `zone`'s drag-time state, undoing whatever {@link claimLastTabOverlap} last set. */
function clearLastTabOverlap(zone: HTMLElement): void {
  zone.removeAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
  zone.style.removeProperty(OVERLAP_PROPERTY);
  zone.style.removeProperty(INDICATOR_LEAD_PROPERTY);
}

/**
 * Extends `zone`'s hit area backward, over its tab bar's last tab's trailing half, for the duration
 * of a drag.
 *
 * Rc-dock's own per-tab handler (`TabCache.onDragOver` in `node_modules/rc-dock/src/DockTabs.tsx`)
 * is registered on the whole tab, and picks `after-tab` whenever the pointer is past the tab's
 * midpoint — so that trailing half already accepts a drop; only the indicator rc-dock draws for it
 * is a fixed 30px wide, centered on the tab's edge (`DockLayout.setDropRect`'s `after-tab` case, in
 * `node_modules/rc-dock/src/DockLayout.tsx`). And rc-dock's hit-testing (`DragManager`'s `_onMove`)
 * always defers to whichever registered element paints topmost under the pointer, walking up from
 * there. So painting this zone over that half during a drag is the only way to present a single
 * drop target there without extending the rc-dock patch (`patches/rc-dock+3.3.2.patch`).
 *
 * Both extensions are absolutely positioned (the zone's `::before`, sized by
 * {@link OVERLAP_PROPERTY}, and the inner indicator, led backward by
 * {@link INDICATOR_LEAD_PROPERTY}), so writing them never changes the zone's own box or the bar's
 * flex layout, and the rects read here are the same before and after a previous claim. The overlap
 * reaches back to the last tab's midpoint; the indicator reaches back at least to the tab's
 * trailing edge, and further still toward {@link MIN_DRAWN_INDICATOR_WIDTH} when the zone's own
 * width would otherwise draw a hairline — but never further back than the overlap itself, since the
 * drawn indicator must stay inside the region that actually hit-tests to the zone.
 *
 * Invariant: this function claims the tab's trailing half if and only if `onDragOver` then accepts
 * a drop there (see {@link MIN_VISIBLE_INDICATOR_WIDTH}). The tab is covered whenever the zone
 * starts at or after its trailing edge AND the resulting indicator, after the cap above, is still
 * visible; on a last tab too narrow for even the capped lead to reach a visible width, the claim is
 * refused entirely rather than covering a region `onDragOver` would then reject. Otherwise (a
 * crowded bar clips the last tab under the zone's own box, leaving no valid direction to extend
 * backward from) the zone leaves the tab uncovered, and rc-dock's own per-tab handler takes the
 * drop there instead.
 */
function claimLastTabOverlap(zone: HTMLElement): void {
  const tabs = zone.closest('.dock-nav')?.querySelectorAll<HTMLElement>('.dock-nav-list .dock-tab');
  const lastTab = tabs?.[tabs.length - 1];
  if (!lastTab) return;

  const tabRect = lastTab.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();
  const tabMidpoint = tabRect.left + tabRect.width / 2;
  const isRtl = getComputedStyle(zone).direction === 'rtl';
  const gapToTab = isRtl ? tabRect.left - zoneRect.right : zoneRect.left - tabRect.right;
  // A negative gap is the crowded-bar case: once the row is scrolled all the way to fit, the last
  // tab's trailing edge sits at or past the zone's own start (the tab list only starts after
  // `.dock-nav-wrap`'s inline padding) — not an anomalous layout. This branch is load-bearing for
  // that case: without it, the widening below would draw a legible indicator over a region with no
  // valid backward direction to reach from, letting a crowded bar accept drops it should refuse.
  const isClipped = gapToTab < 0;
  const naturalIndicatorLead = Math.max(0, gapToTab);
  // How far back the region that actually hit-tests to the zone would reach, if claimed: to the
  // last tab's midpoint. Computed before the widened lead below, which is capped against it. Left
  // unguarded by `isClipped`: `claims` below already excludes the clipped case from both consumers
  // of this value (`overlap` and, transitively, `indicatorLead`), so its value there is unused.
  const overlapToMidpoint = Math.max(
    0,
    isRtl ? tabMidpoint - zoneRect.right : zoneRect.left - tabMidpoint,
  );
  // Widen the lead toward the legible target width, capped at the overlap so the drawn indicator
  // never reaches back further than the region that actually hit-tests to the zone.
  const widenedIndicatorLead = Math.min(
    Math.max(naturalIndicatorLead, MIN_DRAWN_INDICATOR_WIDTH - zoneRect.width),
    overlapToMidpoint,
  );
  // Claim the tab's trailing half only when the resulting indicator is still visible — otherwise
  // the claimed hit area would extend over a region `onDragOver` then rejects, exactly the dead spot
  // this mechanism exists to avoid (see this function's own TSDoc). On a last tab too narrow for
  // even the capped lead to reach a visible width, refuse the claim entirely and leave the tab to
  // rc-dock's own per-tab handler, rather than covering a region that can't accept a drop.
  const claims = !isClipped && zoneRect.width + widenedIndicatorLead >= MIN_VISIBLE_INDICATOR_WIDTH;
  const overlap = claims ? overlapToMidpoint : 0;
  const indicatorLead = claims ? widenedIndicatorLead : naturalIndicatorLead;

  zone.style.setProperty(OVERLAP_PROPERTY, `${overlap}px`);
  zone.style.setProperty(INDICATOR_LEAD_PROPERTY, `${indicatorLead}px`);
  zone.setAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE, '');
}

/**
 * Invisible drop target in a tab bar's empty remainder: a dragged tab or tab group dropped there is
 * appended to `panelData`. At rest it fills the bar's remainder after the "+" button; mid-drag,
 * once "+" has moved to the bar's end, it spans from the last tab's trailing edge to the bar's end,
 * as a single continuous target instead of two separate ones (this zone, plus rc-dock's own
 * `after-tab` drop target, which already covers the last tab's trailing half — `getDropDirection`
 * in `node_modules/rc-dock/src/DockTabs.tsx`). While a drag is in progress, it also claims that
 * trailing half for itself; see {@link claimLastTabOverlap}.
 *
 * Rendered as a flex sibling of the "+" button inside `.dock-extra-content` (see `getGroups` in
 * `platform-dock-layout-positioning.util.ts`), not inside `.dock-nav-wrap`/`.dock-nav-list`. It
 * can't push a tab into the overflow dropdown — see the `.platform-tab-bar-drop-zone` comment in
 * `tab-bar-drop-zone.component.scss` for why.
 */
export function TabBarDropZone({ panelData, context }: TabBarDropZoneProps) {
  // React starts refs as null
  // eslint-disable-next-line no-null/no-null
  const zoneRef = useRef<HTMLDivElement | null>(null);
  // React starts refs as null
  // eslint-disable-next-line no-null/no-null
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  // Stable identity for `DockContext.setDropRect`'s `source` param, which distinguishes this
  // zone's own indicator claim from another drop target's when clearing it — the same role `this`
  // plays in rc-dock's own `DockDropSquare`.
  const dropRectSource = useRef({}).current;

  const onDragOver = (state: DragState) => {
    const source = resolveTabBarDropZoneSource(context, panelData);
    const indicator = indicatorRef.current;
    // An indicator with no visible width has nothing to show, and `.dock-drop-indicator`'s ring
    // shadow would still paint around it, so this zone takes no drop there. Deliberately gated on
    // `MIN_VISIBLE_INDICATOR_WIDTH`, not `MIN_DRAWN_INDICATOR_WIDTH`: `claimLastTabOverlap` only
    // claims the last tab's trailing half when doing so keeps the indicator at or above this
    // (smaller) width, so whenever it claims, this check accepts.
    if (
      !source ||
      !indicator ||
      indicator.getBoundingClientRect().width < MIN_VISIBLE_INDICATOR_WIDTH
    ) {
      state.reject();
      return;
    }
    // The inner indicator element, not the zone itself: `setDropRect` sizes the global
    // drop-indicator overlay from its target's `getBoundingClientRect()`, and only the indicator
    // starts at the last tab's trailing edge (see `claimLastTabOverlap`); the zone starts after the
    // gap, and its `::before` hit area, which covers the tab's trailing half, has no rect of its own.
    context.setDropRect(indicator, 'middle', dropRectSource);
    state.accept('');
  };

  const onDragLeave = () => {
    clearDropRect(context, dropRectSource);
  };

  const onDrop = () => {
    const source = resolveTabBarDropZoneSource(context, panelData);
    if (!source) return;
    context.dockMove(source, panelData, 'middle');
  };

  // Clear a claimed indicator if this zone unmounts mid-drag (e.g. the panel it belongs to is
  // removed), matching `DockDropSquare.componentWillUnmount`.
  useEffect(() => () => clearDropRect(context, dropRectSource), [context, dropRectSource]);

  // Claims the last-tab overlap for any drag rc-dock starts in this dock that carries tab or panel
  // data (a divider drag carries neither). This is deliberately broader than what `onDragOver`
  // accepts, but mostly coincides with it — a different group, or a drop that would be a no-op, is
  // rejected by both. Two cases are stricter here than in rc-dock's own `TabCache.onDragOver`,
  // which never checks `tabLocked` and accepts a tab with no `group` against a group-less target:
  // on a group configured that way, this claim covers the tab's trailing half with a hit area that
  // then refuses a drop rc-dock's own per-tab handler would have taken, since rc-dock hit-tests
  // whichever registered element paints topmost under the pointer. The claim only positions
  // absolutely placed hit areas, so it cannot change the bar's layout.
  //
  // Ordering dependency: the zone's rect is measured here on the assumption that "+" has already slid
  // to the bar's end (the `body:has(> .dragging-layer.dock-style-platform-bible)` rule in
  // dock-layout-wrapper.component.scss). That holds only because rc-dock's `createDraggingElement`
  // (node_modules/rc-dock/src/dragdrop/DragManager.ts) appends `.dragging-layer` to <body> before it
  // calls these listeners, and `getBoundingClientRect` flushes that style change. If an upgrade
  // swapped those steps, the zone would be measured with "+" still ahead of it, and the backward
  // extension would reach one button plus gap too far, over the last tab's leading half. The two
  // signals cannot disagree in this app: every tab or panel drag in this dock carries a
  // `platform-bible` group class.
  //
  // rc-dock calls these listeners with the drag's scope at drag start and with `null` at drag end
  // (`destroyDraggingElement`, same file), including on drop and Escape.
  useEffect(() => {
    const dockId = context.getDockId();
    const onDragStateChange = (scope: unknown) => {
      const zone = zoneRef.current;
      if (!zone) return;
      if (!scope) {
        clearLastTabOverlap(zone);
        return;
      }
      if (!DragState.getData('tab', dockId) && !DragState.getData('panel', dockId)) return;
      claimLastTabOverlap(zone);
    };
    addDragStateListener(onDragStateChange);
    return () => removeDragStateListener(onDragStateChange);
  }, [context]);

  return (
    <DragDropDiv
      getRef={zoneRef}
      className="platform-tab-bar-drop-zone"
      aria-hidden="true"
      onDragOverT={onDragOver}
      onDragLeaveT={onDragLeave}
      onDropT={onDrop}
    >
      <div ref={indicatorRef} className="platform-tab-bar-drop-zone-indicator" />
    </DragDropDiv>
  );
}

export default TabBarDropZone;
