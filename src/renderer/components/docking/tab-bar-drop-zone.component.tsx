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
 * edge rather than after the gap that follows it. See {@link claimLastTabOverlap}.
 */
const INDICATOR_LEAD_PROPERTY = '--tab-bar-drop-zone-indicator-lead';

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
 * reaches back to the last tab's midpoint; the indicator only reaches back to the tab's trailing
 * edge, and never further than the overlap. When the zone already starts before that edge (a
 * crowded bar clips the last tab under the zone) the indicator doesn't lead at all, and when it
 * starts before the midpoint nothing is covered.
 */
function claimLastTabOverlap(zone: HTMLElement): void {
  const tabs = zone.closest('.dock-nav')?.querySelectorAll<HTMLElement>('.dock-nav-list .dock-tab');
  const lastTab = tabs?.[tabs.length - 1];
  if (!lastTab) return;

  const tabRect = lastTab.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();
  const tabMidpoint = tabRect.left + tabRect.width / 2;
  const isRtl = getComputedStyle(zone).direction === 'rtl';
  const overlap = Math.max(0, isRtl ? tabMidpoint - zoneRect.right : zoneRect.left - tabMidpoint);
  const gapAfterTab = Math.max(
    0,
    isRtl ? tabRect.left - zoneRect.right : zoneRect.left - tabRect.right,
  );
  const indicatorLead = Math.min(overlap, gapAfterTab);

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
 * can't push a tab into the overflow dropdown: rc-tabs measures `.dock-nav-wrap`, whose width does
 * depend on its flex sibling `.dock-extra-content`, but the zone's `flex: 1 0 0; min-width: 0`
 * (`tab-bar-drop-zone.component.scss`) gives it no flex base size, so it only takes space nothing
 * else needs, and its drag-time extensions are absolutely positioned, so they add none.
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
    // A zero-width indicator (a zone squeezed to nothing on a crowded bar, with no gap to lead back
    // over) has nothing visible to show, and `.dock-drop-indicator`'s ring shadow would still paint
    // around it, so leave the drop to whatever lies beneath.
    if (!source || !indicator || indicator.getBoundingClientRect().width < 1) {
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
  // accepts: every drag the resolver rejects here is one rc-dock's own `TabCache.onDragOver` also
  // rejects for that tab (another group, or the tab/panel being dragged itself), so covering the
  // tab's trailing half never hides a drop rc-dock would have taken. The claim only positions
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
