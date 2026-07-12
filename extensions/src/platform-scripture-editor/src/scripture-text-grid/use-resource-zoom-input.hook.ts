import type React from 'react';
import { useEffect } from 'react';

export type ResourceZoomInputOptions = {
  /** The grid container the listeners attach to. */
  containerRef: React.RefObject<HTMLElement | null>;
  adjustZoom: (resourceId: string, deltaSteps: number) => void;
  resetZoom: (resourceId: string) => void;
  /** The last-interacted resource, used when keyboard focus is not inside a cell. */
  getFallbackResourceId: () => string | undefined;
};

/** Walks up from an element to the nearest `[data-resource-id]`, returning its value. */
export function resolveResourceIdFromElement(
  element: Element | null | undefined,
): string | undefined {
  const host = element?.closest<HTMLElement>('[data-resource-id]');
  return host?.dataset.resourceId;
}

function hasZoomModifier(event: WheelEvent | KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey;
}

/**
 * Wires the Ctrl/Cmd+wheel and Ctrl/Cmd +/-/0 zoom chords onto the grid container. Listeners are
 * capture-phase so they run before any inner handler; `wheel` is non-passive so it can
 * `preventDefault()` the browser's page-zoom gesture. The grid runs inside a WebView iframe, so
 * these events never reach the renderer's tab-zoom listeners (separate window).
 */
export function useResourceZoomInput({
  containerRef,
  adjustZoom,
  resetZoom,
  getFallbackResourceId,
}: ResourceZoomInputOptions): void {
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
      adjustZoom(resourceId, event.deltaY < 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || !hasZoomModifier(event)) return;
      const isZoomIn = !event.shiftKey && (event.key === '=' || event.key === '+');
      const isZoomOut = !event.shiftKey && event.key === '-';
      const isReset = event.key === '0';
      if (!isZoomIn && !isZoomOut && !isReset) return;

      const resourceId =
        resolveResourceIdFromElement(container.ownerDocument.activeElement) ??
        getFallbackResourceId();
      if (!resourceId) return;
      event.preventDefault();
      event.stopPropagation();
      if (isZoomIn) adjustZoom(resourceId, 1);
      else if (isZoomOut) adjustZoom(resourceId, -1);
      else resetZoom(resourceId);
    };

    container.addEventListener('wheel', onWheel, { capture: true, passive: false });
    container.addEventListener('keydown', onKeyDown, true);
    return () => {
      container.removeEventListener('wheel', onWheel, true);
      container.removeEventListener('keydown', onKeyDown, true);
    };
  }, [containerRef, adjustZoom, resetZoom, getFallbackResourceId]);
}

export default useResourceZoomInput;
