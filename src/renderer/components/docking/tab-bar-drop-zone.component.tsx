import { useEffect, useRef } from 'react';
import { DockContext, DragDropDiv, DragState, PanelData } from 'rc-dock';
import { resolveTabBarDropZoneSource } from './tab-bar-drop-zone.util';
import './tab-bar-drop-zone.component.scss';

export interface TabBarDropZoneProps {
  panelData: PanelData;
  context: DockContext;
}

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

/**
 * Invisible strip that fills the tab bar's empty remainder — from the end of the "+" new-tab button
 * to the end of the bar — so a dragged tab or floating tab group can be dropped there to append it
 * to `panelData`, instead of only the ~30px `before-tab`/`after-tab` strip at the edge of the last
 * tab (`getDropDirection` in `node_modules/rc-dock/src/DockTabs.tsx`).
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
  // Stable identity for `DockContext.setDropRect`'s `source` param, which distinguishes this
  // zone's own indicator claim from another drop target's when clearing it — the same role `this`
  // plays in rc-dock's own `DockDropSquare`.
  const dropRectSource = useRef({}).current;

  const onDragOver = (state: DragState) => {
    const source = resolveTabBarDropZoneSource(context, panelData);
    if (!source || !zoneRef.current) {
      state.reject();
      return;
    }
    context.setDropRect(zoneRef.current, 'middle', dropRectSource);
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

  return (
    <DragDropDiv
      getRef={zoneRef}
      className="platform-tab-bar-drop-zone"
      aria-hidden="true"
      onDragOverT={onDragOver}
      onDragLeaveT={onDragLeave}
      onDropT={onDrop}
    />
  );
}

export default TabBarDropZone;
