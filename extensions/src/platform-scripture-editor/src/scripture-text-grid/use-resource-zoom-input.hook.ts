import type React from 'react';
import { useEffect } from 'react';

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
 * renderer's tab-zoom listeners (separate window).
 *
 * NOTE: Keyboard zoom (Ctrl/Cmd +/-/0) is deferred pending PT-4143. The main-process
 * before-input-event handler in main.ts claims those chords for window zoom before the WebView
 * iframe sees them, so the keyboard path cannot function correctly until PT-4143 makes that handler
 * focus-aware. Zoom ships three working paths: right-click context menu, hover/touch kebab, and
 * Ctrl/Cmd+wheel.
 */
export function useResourceZoomInput({ containerRef, adjustZoom }: ResourceZoomInputOptions): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const onWheel = (event: WheelEvent) => {
      if (!hasZoomModifier(event)) return;
      // Prevent the OS/browser page zoom even if no cell resolves, so Ctrl+wheel never desyncs.
      event.preventDefault();
      event.stopPropagation();
      const resourceId = resolveResourceIdFromElement(
        event.target instanceof Element ? event.target : undefined,
      );
      if (!resourceId) return;
      adjustZoom?.(resourceId, event.deltaY < 0 ? 1 : -1);
    };

    container.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel, true);
    };
  }, [containerRef, adjustZoom]);
}

export default useResourceZoomInput;
