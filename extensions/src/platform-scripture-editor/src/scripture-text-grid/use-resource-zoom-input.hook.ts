import type React from 'react';
import { useEffect } from 'react';
import { createContentZoomWheelReader } from 'platform-bible-utils';

export type ResourceZoomInputOptions = {
  /** The grid container the listeners attach to. */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Applies a zoom delta (in steps; +1 = zoom in, −1 = zoom out) to the resource resolved from the
   * wheel event's target. Optional — when omitted (no zoom controller) the wheel gesture is still
   * caught and the page-zoom default is suppressed, but no factor changes.
   */
  adjustZoom?: (resourceId: string, deltaSteps: number) => void;
};

/** Walks up from an element to the nearest `[data-resource-id]`, returning its value. */
export function resolveResourceIdFromElement(
  element: Element | null | undefined,
): string | undefined {
  const host = element?.closest<HTMLElement>('[data-resource-id]');
  return host?.dataset.resourceId;
}

function hasZoomModifier(event: WheelEvent): boolean {
  return event.ctrlKey || event.metaKey;
}

/**
 * Wires Ctrl/Cmd+wheel zoom onto the grid container. The listener is capture-phase so it runs
 * before any inner handler; `wheel` is non-passive so it can `preventDefault()` the browser's
 * page-zoom gesture. The grid runs inside a WebView iframe, so these events never reach the
 * renderer's tab-zoom listeners (separate window). A wheel is read as mouse-notch steps or as
 * trackpad-pinch travel by the shared {@link createContentZoomWheelReader}, so a pinch inside a
 * resource cell moves that resource through its zoom range at the same rate the pane-level zoom
 * moves a whole pane.
 *
 * NOTE: Keyboard zoom (Ctrl/Cmd +/-/0) aimed at a single resource is deferred pending PT-4143.
 * These chords reach the WebView iframe — `main.ts`'s `before-input-event` handlers do not claim
 * them — where they are claimed by the platform's own pane-level content-zoom handler
 * (`web-view-content-zoom.bootstrap-script.ts`), which has no notion of a resource cell. So today
 * they zoom the whole pane rather than the focused resource. Zoom ships three working paths:
 * right-click context menu, hover/touch kebab, and Ctrl/Cmd+wheel.
 */
export function useResourceZoomInput({ containerRef, adjustZoom }: ResourceZoomInputOptions): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reader = createContentZoomWheelReader();

    const onWheel = (event: WheelEvent) => {
      if (!hasZoomModifier(event)) return;
      // Prevent the OS/browser page zoom even if no cell resolves, so Ctrl+wheel never desyncs, and
      // keep the pane-level handler from also acting on a gesture aimed at one resource.
      event.preventDefault();
      event.stopPropagation();
      const resourceId = resolveResourceIdFromElement(
        event.target instanceof Element ? event.target : undefined,
      );
      if (!resourceId) return;
      const steps = reader.read(event, resourceId);
      if (steps !== 0) adjustZoom?.(resourceId, steps);
    };

    container.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel, true);
      reader.dispose();
    };
  }, [containerRef, adjustZoom]);
}

export default useResourceZoomInput;
