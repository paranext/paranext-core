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

/**
 * CSS custom property (set on the zone element) holding how far the zone's start edge is pulled
 * back, via `margin-inline-start`, to cover the last tab's trailing half during a drag. See
 * {@link claimLastTabOverlap}.
 */
const OVERLAP_PROPERTY = '--tab-bar-drop-zone-overlap';
/**
 * CSS custom property (set on the zone element) holding the inner indicator's inset from the zone's
 * own (overlap-widened) start edge, so the visible indicator still starts at the last tab's
 * trailing edge rather than at the zone's covered-over start. See {@link claimLastTabOverlap}.
 */
const INDICATOR_INSET_PROPERTY = '--tab-bar-drop-zone-indicator-inset';

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

/** Restores `zone` to its resting size, undoing whatever {@link claimLastTabOverlap} last set. */
function clearLastTabOverlap(zone: HTMLElement): void {
  zone.removeAttribute('data-dragging');
  zone.style.removeProperty(OVERLAP_PROPERTY);
  zone.style.removeProperty(INDICATOR_INSET_PROPERTY);
}

/**
 * Widens `zone` backward, over its tab bar's last tab's trailing half, for the duration of a drag.
 *
 * Rc-dock's own per-tab handler (`TabCache.onDragOver` in `node_modules/rc-dock/src/DockTabs.tsx`)
 * is registered on the whole tab, and picks `after-tab` whenever the pointer is past the tab's
 * midpoint — so that trailing half already accepts a drop; only the indicator rc-dock draws for it
 * is a fixed 30px wide, centered on the tab's edge (`DockLayout.setDropRect`'s `after-tab` case, in
 * `node_modules/rc-dock/src/DockLayout.tsx`). And rc-dock's hit-testing (`DragManager`'s `_onMove`)
 * always defers to whichever registered element paints topmost under the pointer, walking up from
 * there. So painting this zone over that half during a drag is the only way to present a single
 * drop target there without extending the rc-dock patch (`patches/rc-dock+3.3.2.patch`): a negative
 * `margin-inline-start` (driven by {@link OVERLAP_PROPERTY}, set in the stylesheet) pulls the zone's
 * own start edge back to the last tab's midpoint, while its end edge still meets the "+" button —
 * see the stylesheet for the paired {@link INDICATOR_INSET_PROPERTY} rule that keeps the visible
 * indicator confined to the last tab's trailing edge through the "+", rather than growing to cover
 * the tab itself.
 */
function claimLastTabOverlap(zone: HTMLElement): void {
  const tabs = zone.closest('.dock-nav')?.querySelectorAll<HTMLElement>('.dock-nav-list .dock-tab');
  const lastTab = tabs?.[tabs.length - 1];
  if (!lastTab) return;

  clearLastTabOverlap(zone);

  const tabRect = lastTab.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();
  const tabMidpoint = tabRect.left + tabRect.width / 2;
  const isRtl = getComputedStyle(zone).direction === 'rtl';
  // On a bar crowded enough to show the overflow dropdown, `lastTab` (the last tab in DOM order) is
  // clipped past the bar's visible end, so this clamps to 0 and the widening below is a no-op — that
  // is correct, not a defect: in that state the zone itself has no width (`.dock-nav-wrap` has
  // absorbed the bar's whole remainder), so rc-dock's own per-tab target on the last VISIBLE tab is
  // the only drop target present there.
  const overlap = Math.max(0, isRtl ? tabMidpoint - zoneRect.right : zoneRect.left - tabMidpoint);
  const indicatorInset = Math.max(0, tabRect.width / 2);

  zone.style.setProperty(OVERLAP_PROPERTY, `${overlap}px`);
  zone.style.setProperty(INDICATOR_INSET_PROPERTY, `${indicatorInset}px`);
  zone.setAttribute('data-dragging', '');
}

/**
 * Invisible strip that fills the tab bar's empty remainder — from the last tab's trailing edge to
 * the end of the bar — so a dragged tab or floating tab group can be dropped there to append it to
 * `panelData`, as a single continuous target instead of two separate ones (this zone, plus
 * rc-dock's own `after-tab` drop target, which already covers the last tab's trailing half —
 * `getDropDirection` in `node_modules/rc-dock/src/DockTabs.tsx`). While a drag is in progress, it
 * also claims that trailing half for itself; see {@link claimLastTabOverlap}.
 *
 * Rendered as a flex sibling of the "+" button inside `.dock-extra-content` (see `getGroups` in
 * `platform-dock-layout-positioning.util.ts`), not inside `.dock-nav-wrap`/`.dock-nav-list`. Its
 * width comes entirely from flexbox (`.dock-layout-wrapper.component.scss`'s TAB-BAR region), so
 * rc-tabs' own overflow measurement — which only reads `.dock-nav-wrap`/`.dock-nav-list` sizes,
 * never `.dock-extra-content` — can't be affected by it, and this element never forces a tab into
 * the overflow dropdown that would otherwise fit.
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
    if (!source || !indicatorRef.current) {
      state.reject();
      return;
    }
    // The inner indicator element, not the zone itself: `setDropRect` reads its target's own
    // `getBoundingClientRect()` to size the global drop-indicator overlay, and the zone's own box
    // is widened to cover the last tab during a drag (see `claimLastTabOverlap`) — passing it here
    // would show that overlay spanning over the tab instead of just the last-tab-to-"+" strip.
    context.setDropRect(indicatorRef.current, 'middle', dropRectSource);
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

  // Claim/release the last-tab overlap for the duration of any drag, tab or otherwise, that rc-dock
  // starts in this dock. rc-dock calls every listener registered via `addDragStateListener` with the
  // drag's data scope at drag start (`createDraggingElement` in
  // `node_modules/rc-dock/src/dragdrop/DragManager.ts`) and with `null` at drag end
  // (`destroyDraggingElement`, same file) — a divider drag carries neither `tab` nor `panel` data for
  // this dock, so it's excluded here the same way it already is from `resolveTabBarDropZoneSource`.
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
